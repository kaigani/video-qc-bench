// Two-pass benchmark runner: pass 1 = perceptual feature checklist per video, then a
// deterministic rule table (src/feature-router.mjs) decides which focused pass-2 checks run.
// ADDITIVE system — run alongside (not instead of) the classic run-benchmark.mjs core roles.
//
// Usage:
//   node src/run-two-pass.mjs --model <id> --run-id <id> [--videos a,b] [--pass1-only] [--force-pass1] [--concurrency N] [--reasoning] [--reasoning-effort high] [--provider slug,...]
//
// Results layout (per run-id under results/):
//   pass1/<video>.json          raw checklist call: text, parsed features, parseOk
//   raw/<video>__<check>.json   pass-2 check results (same schema as run-benchmark.mjs raw files)
//   manifest.json               per-video pass1 status + triggered checks, per-call statuses
//
// Resumable: pass-1 files are reused unless --force-pass1; completed pass-2 raw files are
// skipped. Empty/parse-failed pass-1 responses FAIL OPEN (all checks fire) but are recorded
// with parseOk:false so they're auditable and re-runnable.
import { readdirSync, mkdirSync, existsSync, writeFileSync, readFileSync } from 'node:fs';
import { join, basename } from 'node:path';
import { PROJECT_ROOT, loadApiKey, encodeVideo, callModel, parseFindings } from './openrouter.mjs';
import { FEATURE_PROMPT, parseFeatures, routeChecks, RULES } from './feature-router.mjs';

let VIDEOS_DIR = join(PROJECT_ROOT, '00 test videos');
const RESULTS_DIR = join(PROJECT_ROOT, 'results');
let CONCURRENCY = 2;

function parseArgs(argv) {
  const args = { model: null, videos: null, runId: null, pass1Only: false, forcePass1: false, reasoning: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--model') args.model = argv[++i];
    else if (a === '--reasoning') args.reasoning = true;
    else if (a === '--reasoning-effort') args.reasoningEffort = argv[++i];
    else if (a === '--provider') args.provider = argv[++i].split(',').map((s) => s.trim());
    else if (a === '--videos') args.videos = argv[++i].split(',').map((s) => s.trim());
    else if (a === '--videos-dir') VIDEOS_DIR = argv[++i];
    else if (a === '--run-id') args.runId = argv[++i];
    else if (a === '--concurrency') CONCURRENCY = Number(argv[++i]);
    else if (a === '--pass1-only') args.pass1Only = true;
    else if (a === '--force-pass1') args.forcePass1 = true;
    else throw new Error(`Unknown argument: ${a}`);
  }
  if (!args.model) throw new Error('--model is required');
  if (!args.runId) throw new Error('--run-id is required');
  return args;
}

function listVideos(filter) {
  const all = readdirSync(VIDEOS_DIR).filter((f) => f.endsWith('.mp4'));
  if (!filter) return all;
  return filter.map((name) => {
    const match = all.find((f) => basename(f, '.mp4') === name || f === name);
    if (!match) throw new Error(`Video not found: ${name}`);
    return match;
  });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const apiKey = loadApiKey();
  const videos = listVideos(args.videos);

  const runDir = join(RESULTS_DIR, args.runId);
  const pass1Dir = join(runDir, 'pass1');
  const rawDir = join(runDir, 'raw');
  mkdirSync(pass1Dir, { recursive: true });
  mkdirSync(rawDir, { recursive: true });

  const manifestPath = join(runDir, 'manifest.json');
  const manifest = existsSync(manifestPath)
    ? JSON.parse(readFileSync(manifestPath, 'utf8'))
    : { runId: args.runId, model: args.model, mode: 'two-pass', reasoning: args.reasoning, reasoningEffort: args.reasoningEffort ?? null, provider: args.provider ?? null, started: new Date().toISOString(), pass1: {}, calls: {} };
  const saveManifest = () => writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  const encoded = new Map();
  async function videoDataUrl(video) {
    if (!encoded.has(video)) encoded.set(video, await encodeVideo(join(VIDEOS_DIR, video)));
    return encoded.get(video);
  }

  // ---- PASS 1: feature checklist per video (resumable) ----
  const pass1Results = new Map(); // video -> {features, parseOk}
  for (const video of videos) {
    const vid = basename(video, '.mp4');
    const outPath = join(pass1Dir, `${vid}.json`);
    if (!args.forcePass1 && existsSync(outPath)) {
      const prev = JSON.parse(readFileSync(outPath, 'utf8'));
      // reuse only a successful parse; a failed one is worth retrying on resume
      if (prev.parseOk) {
        pass1Results.set(video, prev);
        console.log(`pass1 skip (done): ${vid}`);
        continue;
      }
    }
    try {
      const dataUrl = await videoDataUrl(video);
      const { text, usage, latencyMs } = await callModel({ apiKey, model: args.model, prompt: FEATURE_PROMPT, videoDataUrl: dataUrl, reasoning: args.reasoning, reasoningEffort: args.reasoningEffort ?? null, provider: args.provider });
      const parsed = parseFeatures(text);
      const rec = {
        video: vid,
        model: args.model,
        timestamp: new Date().toISOString(),
        latencyMs,
        usage,
        parseOk: parsed.ok,
        parseError: parsed.ok ? null : parsed.error,
        features: parsed.features,
        rawText: text,
      };
      writeFileSync(outPath, JSON.stringify(rec, null, 2));
      pass1Results.set(video, rec);
      const triggered = routeChecks(parsed.features).map((r) => r.id);
      manifest.pass1[vid] = { status: 'ok', parseOk: parsed.ok, triggered, latencyMs, tokens: usage?.total_tokens ?? null };
      saveManifest();
      console.log(`pass1 [${vid}] parseOk=${parsed.ok} → ${triggered.length}/${RULES.length} checks: ${triggered.join(', ')}`);
    } catch (err) {
      manifest.pass1[vid] = { status: 'error', error: String(err.message ?? err) };
      saveManifest();
      console.error(`pass1 [${vid}] ERROR: ${err.message}`);
    }
  }

  if (args.pass1Only) {
    console.log('\n--pass1-only: stopping before pass 2.');
    return;
  }

  // ---- PASS 2: routed checks (fail open when pass 1 errored entirely) ----
  const tasks = [];
  for (const video of videos) {
    const vid = basename(video, '.mp4');
    const p1 = pass1Results.get(video);
    const roles = p1 ? routeChecks(p1.features) : RULES.map((r) => r.role); // no pass1 at all -> everything
    if (!p1) console.log(`pass2 [${vid}] no pass-1 result — failing open to all ${RULES.length} checks`);
    for (const role of roles) {
      const key = `${vid}__${role.id}`;
      const outPath = join(rawDir, `${key}.json`);
      if (existsSync(outPath)) {
        console.log(`pass2 skip (done): ${key}`);
        continue;
      }
      tasks.push({ video, role, key, outPath });
    }
  }
  console.log(`\nPass 2: ${tasks.length} check calls\n`);

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
        const { text, usage, latencyMs } = await callModel({ apiKey, model: args.model, prompt: role.prompt, videoDataUrl: dataUrl, reasoning: args.reasoning, reasoningEffort: args.reasoningEffort ?? null, provider: args.provider });
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
      saveManifest();
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  const cost = Object.values(manifest.calls).reduce((a, c) => a + (c.cost ?? 0), 0);
  console.log(`\nDone: ${done} ok, ${failed} failed. Total pass-2 cost: $${cost.toFixed(4)}`);
  console.log(`Results: ${runDir}`);
  if (failed > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
