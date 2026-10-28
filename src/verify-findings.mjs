// Post-hoc verify pass (roles-v2 plan item 7, tested as a harness experiment):
// replay each video to a verifier model together with the findings a previous run reported
// on it (presented neutrally — no TP/FP labels), and ask the verifier to adversarially
// reject anything explainable by an innocent visual phenomenon (cut, blur, out-of-frame,
// reflection, lens warp, occlusion, time-skip, intentional performance).
//
// The verdicts are then joined against ground-truth/matches.json to measure the filter's
// value: FPs rejected (good) vs TPs rejected (recall lost), and the re-scored result.
// This experiment does NOT modify matches.json or the leaderboard.
//
// Usage:
//   node src/verify-findings.mjs --source-label pro --model "~google/gemini-pro-latest" \
//     --reasoning --run-id 2026-09-02_pro_verify-pass [--videos a,b] [--concurrency N]
import { readdirSync, mkdirSync, existsSync, writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { PROJECT_ROOT, loadApiKey, encodeVideo, callModel } from './openrouter.mjs';

let VIDEOS_DIR = join(PROJECT_ROOT, '00 test videos');
const RESULTS_DIR = join(PROJECT_ROOT, 'results');
let CONCURRENCY = 2;

function parseArgs(argv) {
  const args = { sourceLabel: null, model: null, runId: null, reasoning: false, videos: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--source-label') args.sourceLabel = argv[++i];
    else if (a === '--model') args.model = argv[++i];
    else if (a === '--run-id') args.runId = argv[++i];
    else if (a === '--reasoning') args.reasoning = true;
    else if (a === '--videos') args.videos = argv[++i].split(',').map((s) => s.trim());
    else if (a === '--videos-dir') VIDEOS_DIR = argv[++i];
    else if (a === '--concurrency') CONCURRENCY = Number(argv[++i]);
    else throw new Error(`Unknown argument: ${a}`);
  }
  if (!args.sourceLabel || !args.model || !args.runId) throw new Error('--source-label, --model, --run-id are required');
  return args;
}

function verifyPrompt(findings) {
  const list = findings
    .map((f, i) => {
      const fi = f.finding;
      return `F${i + 1} [${fi.timestamp ?? '?'}] entity: ${fi.entity ?? '?'} — ${fi.invariant_violated ?? ''}: ${fi.description ?? ''}`;
    })
    .join('\n');
  return `You are a skeptical senior video-QC reviewer. A previous automated reviewer watched this exact video and reported the numbered candidate defects below. Automated reviewers frequently raise false alarms caused by innocent visual phenomena. Your job is to VERIFY each candidate against the video itself.

For EACH candidate, before accepting it, actively try to explain the observation away as one of these innocent causes:
- a camera cut or angle change (not a scene mutation)
- motion blur or compression smear (not morphing, duplication, or vanishing)
- the subject moving out of frame or being cropped by the frame edge (not disappearing)
- a reflection on glass, a window, or a screen behaving like reflections do
- wide-angle / fisheye lens distortion warping geometry
- occlusion — hidden behind a hand, person, or object (still present, not gone)
- a deliberate time-skip or scene transition implying elapsed time
- a deliberate performance (e.g. a magic trick) where the surprising outcome is the point

Re-examine the specific moment referenced by each candidate before deciding. Verdict rules:
- CONFIRM only if the described defect is really there AND survives every innocent explanation — ideally verifiable in a paused frame or by comparing two specific moments.
- REJECT if an innocent explanation accounts for it, if you cannot find the described anomaly at all, or if the description mischaracterizes what actually happens.

CANDIDATES:
${list}

OUTPUT FORMAT — respond with ONLY a single JSON object, no markdown fences, no prose before or after:
{
  "verdicts": [
    { "id": "F1", "verdict": "CONFIRM" | "REJECT", "reason": "what you saw at the referenced moment", "innocent_explanation": "the innocent cause, if REJECT for that reason, else null", "confidence": 0.0-1.0 }
  ]
}
Return exactly one verdict per candidate, in order.`;
}

function parseVerdicts(text, expected) {
  if (!text) return { ok: false, error: 'empty response', verdicts: null };
  const cleaned = text.replace(/```(?:json)?/g, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1) return { ok: false, error: 'no JSON object found', verdicts: null };
  try {
    const raw = JSON.parse(cleaned.slice(start, end + 1));
    if (!Array.isArray(raw.verdicts)) return { ok: false, error: 'no verdicts array', verdicts: null };
    if (raw.verdicts.length !== expected) return { ok: false, error: `expected ${expected} verdicts, got ${raw.verdicts.length}`, verdicts: raw.verdicts };
    return { ok: true, verdicts: raw.verdicts };
  } catch (err) {
    return { ok: false, error: `JSON parse failed: ${err.message}`, verdicts: null };
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const apiKey = loadApiKey();

  const matches = JSON.parse(readFileSync(join(PROJECT_ROOT, 'ground-truth/matches.json'), 'utf8'));
  const sourceRunId = matches._runs[args.sourceLabel];
  if (!sourceRunId) throw new Error(`Unknown source label: ${args.sourceLabel} (known: ${Object.keys(matches._runs).join(', ')})`);

  // Gather the source run's findings per video, keyed exactly like matches.json.
  const rawDir = join(RESULTS_DIR, sourceRunId, 'raw');
  const byVideo = new Map(); // video -> [{key, cls, finding, role, index}]
  for (const f of readdirSync(rawDir).filter((x) => x.endsWith('.json'))) {
    const d = JSON.parse(readFileSync(join(rawDir, f), 'utf8'));
    (d.findings ?? []).forEach((fi, i) => {
      const video = d.video.replace('.mp4', '');
      const key = `${args.sourceLabel}|${video}|${d.role}|${i}`;
      const cls = matches[key] ?? 'UNCLASSIFIED';
      if (!byVideo.has(video)) byVideo.set(video, []);
      byVideo.get(video).push({ key, cls, role: d.role, index: i, finding: fi });
    });
  }

  let videos = [...byVideo.keys()].sort();
  if (args.videos) videos = videos.filter((v) => args.videos.includes(v));

  const runDir = join(RESULTS_DIR, args.runId);
  const rawOut = join(runDir, 'raw');
  mkdirSync(rawOut, { recursive: true });
  const manifestPath = join(runDir, 'manifest.json');
  const manifest = existsSync(manifestPath)
    ? JSON.parse(readFileSync(manifestPath, 'utf8'))
    : { runId: args.runId, mode: 'verify-pass', sourceLabel: args.sourceLabel, sourceRunId, model: args.model, reasoning: args.reasoning, started: new Date().toISOString(), calls: {} };
  const saveManifest = () => writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  const allVideoFiles = readdirSync(VIDEOS_DIR).filter((f) => f.endsWith('.mp4'));

  const queue = videos.filter((vid) => {
    const outPath = join(rawOut, `${vid}.json`);
    if (existsSync(outPath) && JSON.parse(readFileSync(outPath, 'utf8')).parseOk) {
      console.log(`skip (done): ${vid}`);
      return false;
    }
    return true;
  });
  console.log(`Verify pass: ${queue.length} videos, ${queue.reduce((a, v) => a + byVideo.get(v).length, 0)} findings to verify\n`);

  let done = 0;
  async function worker() {
    while (queue.length) {
      const vid = queue.shift();
      const findings = byVideo.get(vid);
      const videoFile = allVideoFiles.find((f) => f.replace('.mp4', '') === vid);
      if (!videoFile) {
        console.error(`video file not found for ${vid}, skipping`);
        continue;
      }
      try {
        const dataUrl = await encodeVideo(join(VIDEOS_DIR, videoFile));
        const t0 = Date.now();
        const { text, usage, latencyMs } = await callModel({ apiKey, model: args.model, prompt: verifyPrompt(findings), videoDataUrl: dataUrl, reasoning: args.reasoning });
        const parsed = parseVerdicts(text, findings.length);
        const rec = {
          video: vid,
          model: args.model,
          timestamp: new Date().toISOString(),
          latencyMs,
          usage,
          parseOk: parsed.ok,
          parseError: parsed.ok ? null : parsed.error,
          candidates: findings.map((f) => ({ key: f.key, cls: f.cls, finding: f.finding })),
          verdicts: parsed.verdicts,
          rawText: text,
        };
        writeFileSync(join(rawOut, `${vid}.json`), JSON.stringify(rec, null, 2));
        manifest.calls[vid] = { status: 'ok', findings: findings.length, parseOk: parsed.ok, latencyMs, tokens: usage?.total_tokens ?? null, cost: usage?.cost ?? null };
        done++;
        console.log(`[${vid}] ${findings.length} candidates — parseOk=${parsed.ok} (${Math.round((Date.now() - t0) / 1000)}s)`);
      } catch (err) {
        manifest.calls[vid] = { status: 'error', error: String(err.message ?? err) };
        console.error(`[${vid}] ERROR: ${err.message}`);
      }
      saveManifest();
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  const cost = Object.values(manifest.calls).reduce((a, c) => a + (c.cost ?? 0), 0);
  console.log(`\nDone. Total cost: $${cost.toFixed(4)}`);
  console.log(`Results: ${runDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
