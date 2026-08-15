// Benchmark runner: videos × roles → OpenRouter → results/<run-id>/raw/*.json
//
// Usage:
//   node src/run-benchmark.mjs                       # all videos × all roles, gemini-3.6-flash
//   node src/run-benchmark.mjs --videos man-cups,man-in-mirror --roles character-continuity
//   node src/run-benchmark.mjs --model google/gemini-3.6-flash --run-id my-run
import { readdirSync, mkdirSync, existsSync, writeFileSync, readFileSync } from 'node:fs';
import { join, basename } from 'node:path';
import { PROJECT_ROOT, loadApiKey, encodeVideo, callModel, parseFindings } from './openrouter.mjs';
import { loadTwelveLabsKey, callTwelveLabs } from './twelvelabs.mjs';
import { getRoles } from './roles.mjs';

let VIDEOS_DIR = join(PROJECT_ROOT, '00 test videos');
const RESULTS_DIR = join(PROJECT_ROOT, 'results');
const DEFAULT_MODEL = 'google/gemini-3.6-flash';
const CONCURRENCY = 3;

function parseArgs(argv) {
  const args = { model: DEFAULT_MODEL, videos: null, roles: null, runId: null, force: false, reasoning: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--model') args.model = argv[++i];
    else if (a === '--reasoning') args.reasoning = true;
    else if (a === '--videos-dir') VIDEOS_DIR = argv[++i];
    else if (a === '--videos') args.videos = argv[++i].split(',').map((s) => s.trim());
    else if (a === '--roles') args.roles = argv[++i].split(',').map((s) => s.trim());
    else if (a === '--run-id') args.runId = argv[++i];
    else if (a === '--force') args.force = true;
    else throw new Error(`Unknown argument: ${a}`);
  }
  return args;
}

function listVideos(filter) {
  const all = readdirSync(VIDEOS_DIR).filter((f) => f.endsWith('.mp4')).sort();
  if (!filter) return all;
  return filter.map((name) => {
    const file = all.find((f) => f === name || basename(f, '.mp4') === name);
    if (!file) throw new Error(`Video not found: ${name}. Available: ${all.map((f) => basename(f, '.mp4')).join(', ')}`);
    return file;
  });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const isTwelveLabs = args.model.startsWith('twelvelabs/');
  const apiKey = isTwelveLabs ? loadTwelveLabsKey() : loadApiKey();
  const videos = listVideos(args.videos);
  const roles = getRoles(args.roles);
  const modelSlug = args.model.replace(/[^a-z0-9.-]+/gi, '-');
  const runId = args.runId ?? `${new Date().toISOString().slice(0, 10)}_${modelSlug}`;
  const runDir = join(RESULTS_DIR, runId);
  const rawDir = join(runDir, 'raw');
  mkdirSync(rawDir, { recursive: true });

  const manifestPath = join(runDir, 'manifest.json');
  const manifest = existsSync(manifestPath)
    ? JSON.parse(readFileSync(manifestPath, 'utf8'))
    : { runId, model: args.model, reasoning: args.reasoning, started: new Date().toISOString(), calls: {} };

  // Build task list, skipping completed results unless --force.
  const tasks = [];
  for (const video of videos) {
    for (const role of roles) {
      const key = `${basename(video, '.mp4')}__${role.id}`;
      const outPath = join(rawDir, `${key}.json`);
      if (!args.force && existsSync(outPath)) {
        console.log(`skip (done): ${key}`);
        continue;
      }
      tasks.push({ video, role, key, outPath });
    }
  }
  console.log(`Run ${runId}: ${tasks.length} calls (${videos.length} videos × ${roles.length} roles, minus completed)\n`);

  // Encode each video once, lazily.
  const encoded = new Map();
  async function videoDataUrl(video) {
    if (!encoded.has(video)) encoded.set(video, await encodeVideo(join(VIDEOS_DIR, video)));
    return encoded.get(video);
  }

  let done = 0;
  let failed = 0;
  const queue = [...tasks];
  async function worker() {
    while (queue.length) {
      const task = queue.shift();
      const { video, role, key, outPath } = task;
      try {
        const dataUrl = await videoDataUrl(video);
        const t0 = Date.now();
        const { text, usage, latencyMs } = isTwelveLabs
          ? await callTwelveLabs({
              apiKey,
              model: args.model.replace('twelvelabs/', ''),
              prompt: role.prompt,
              videoDataUrl: dataUrl,
            })
          : await callModel({
              apiKey,
              model: args.model,
              prompt: role.prompt,
              videoDataUrl: dataUrl,
              reasoning: args.reasoning,
            });
        const parsed = parseFindings(text);
        const result = {
          key,
          video,
          role: role.id,
          model: args.model,
          timestamp: new Date().toISOString(),
          latencyMs,
          usage,
          parseOk: parsed.ok,
          parseError: parsed.ok ? null : parsed.error,
          ledger: parsed.ok ? parsed.ledger : null,
          findings: parsed.ok ? parsed.findings : null,
          rawText: text,
        };
        writeFileSync(outPath, JSON.stringify(result, null, 2));
        manifest.calls[key] = {
          status: 'ok',
          findings: parsed.ok ? parsed.findings.length : null,
          parseOk: parsed.ok,
          latencyMs,
          tokens: usage?.total_tokens ?? null,
          cost: usage?.cost ?? null,
        };
        done++;
        const n = parsed.ok ? `${parsed.findings.length} findings` : `PARSE FAIL: ${parsed.error}`;
        console.log(`[${done + failed}/${tasks.length}] ${key} — ${n} (${Math.round((Date.now() - t0) / 1000)}s)`);
      } catch (err) {
        failed++;
        manifest.calls[key] = { status: 'error', error: String(err.message ?? err) };
        console.error(`[${done + failed}/${tasks.length}] ${key} — ERROR: ${err.message}`);
      }
      writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    }
  }

  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, tasks.length) }, worker));

  manifest.finished = new Date().toISOString();
  const costs = Object.values(manifest.calls).map((c) => c.cost).filter((c) => typeof c === 'number');
  manifest.totalCost = costs.reduce((a, b) => a + b, 0);
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log(`\nDone: ${done} ok, ${failed} failed. Total cost: $${manifest.totalCost.toFixed(4)}`);
  console.log(`Results: ${runDir}`);
  if (failed > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
