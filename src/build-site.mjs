// Build docs/data.js for the GitHub Pages report from results/ + ground-truth/.
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { PROJECT_ROOT } from './openrouter.mjs';
import { ROLES } from './roles.mjs';

const WEIGHTS = { P0: 8, P1: 5, P2: 3, P3: 2, P4: 1 };
const GT = JSON.parse(readFileSync(join(PROJECT_ROOT, 'ground-truth/ground-truth.json'), 'utf8'));
const MATCHES = JSON.parse(readFileSync(join(PROJECT_ROOT, 'ground-truth/matches.json'), 'utf8'));
const defectById = new Map(GT.defects.map((d) => [d.id, d]));
const maxScore = GT.defects.reduce((a, d) => a + WEIGHTS[d.priority], 0);

// TwelveLabs Pegasus is billed per analyzed video-minute (+output tokens), not via
// OpenRouter usage.cost: $0.021/min + $0.0075/1k output tokens (twelvelabs.io/pricing).
const PEGASUS_PER_MIN = 0.021;
const PEGASUS_PER_1K_OUT = 0.0075;
const VIDEO_MINUTES_PER_ROLE = 249.9 / 60; // 13 shorts + 2-min long scene

// Ox Alpha was OpenRouter's stealth slug for GLM 5.3 Flash (revealed 2026-08-26); the run was
// free under a promotional trial (manifest cost is 0), so estimate at published pricing instead:
// $0.15/1M input tokens, $0.50/1M output tokens (openrouter.ai/z-ai/glm-5.3-flash).
const GLM_5_3_FLASH_PER_1M_IN = 0.15;
const GLM_5_3_FLASH_PER_1M_OUT = 0.50;

const LABELS = {
  flash: 'Gemini 3.6 Flash',
  qwen: 'Qwen 3.8 Max',
  pro: 'Gemini Pro Latest',
  gemma: 'Gemma 4 31B',
  pegasus: 'Pegasus 1.5',
  muse: 'Muse Spark 1.2',
  flash37: 'Gemini 3.7 Flash',
  nemotron: 'Nemotron 3 Nano',
  seed: 'Seed 2.1 Turbo',
  kimi: 'Kimi K3',
  qwen27b: 'Qwen 3.8 27B',
  oxalpha: 'GLM 5.3 Flash (was Ox Alpha)',
  flash38: 'Gemini 3.8 Flash',
};

const models = [];
const roleMatrix = {};
const coverage = GT.defects.map((d) => ({ id: d.id, video: d.video, priority: d.priority, weight: WEIGHTS[d.priority], description: d.description, found: {} }));

for (const [key, runId] of Object.entries(MATCHES._runs)) {
  const runDir = join(PROJECT_ROOT, 'results', runId);
  const manifest = JSON.parse(readFileSync(join(runDir, 'manifest.json'), 'utf8'));
  const findings = [];
  let inputTokens = 0;
  let outputTokens = 0;
  for (const f of readdirSync(join(runDir, 'raw')).filter((x) => x.endsWith('.json'))) {
    const d = JSON.parse(readFileSync(join(runDir, 'raw', f), 'utf8'));
    inputTokens += d.usage?.prompt_tokens ?? 0;
    outputTokens += d.usage?.completion_tokens ?? 0;
    (d.findings ?? []).forEach((fi, i) => {
      const cls = MATCHES[`${key}|${d.video.replace('.mp4', '')}|${d.role}|${i}`];
      findings.push({ video: d.video.replace('.mp4', ''), role: d.role, cls, severity: fi.severity, confidence: fi.confidence });
    });
  }
  const tpDefects = new Set(findings.filter((f) => f.cls?.startsWith('TP:')).map((f) => f.cls.slice(3)));
  for (const c of coverage) c.found[key] = tpDefects.has(c.id);
  const detection = [...tpDefects].reduce((a, id) => a + WEIGHTS[defectById.get(id).priority], 0);
  const tp = findings.filter((f) => f.cls?.startsWith('TP:')).length;
  const extra = findings.filter((f) => f.cls?.startsWith('EXTRA:')).length;
  const fp = findings.filter((f) => f.cls === 'FP').length;
  const latencies = Object.values(manifest.calls).map((c) => c.latencyMs).filter(Boolean);
  const cost = key === 'pegasus'
    ? 6 * VIDEO_MINUTES_PER_ROLE * PEGASUS_PER_MIN + (outputTokens / 1000) * PEGASUS_PER_1K_OUT
    : key === 'oxalpha'
    ? (inputTokens / 1e6) * GLM_5_3_FLASH_PER_1M_IN + (outputTokens / 1e6) * GLM_5_3_FLASH_PER_1M_OUT
    : manifest.totalCost ?? 0;
  models.push({
    key,
    label: LABELS[key] ?? key,
    model: manifest.model,
    reasoning: !!manifest.reasoning,
    detection,
    defectsFound: tpDefects.size,
    tp, extra, fp,
    findings: findings.length,
    cost: Number(cost.toFixed(3)),
    costEstimated: key === 'pegasus' || key === 'oxalpha',
    avgLatencyS: Number((latencies.reduce((a, b) => a + b, 0) / latencies.length / 1000).toFixed(1)),
  });
  roleMatrix[key] = {};
  for (const role of ROLES.map((r) => r.id)) {
    const rf = findings.filter((f) => f.role === role);
    roleMatrix[key][role] = {
      tp: rf.filter((f) => f.cls?.startsWith('TP:')).length,
      fp: rf.filter((f) => f.cls === 'FP').length,
      extra: rf.filter((f) => f.cls?.startsWith('EXTRA:')).length,
      total: rf.length,
      // unique defects this role found that the model's baseline role missed
    };
  }
}

const missedByAll = coverage.filter((c) => !Object.values(c.found).some(Boolean)).map((c) => c.id);
const extras = Object.entries(MATCHES._extras).map(([slug, desc]) => ({ slug, desc }));

const data = {
  generated: '2026-09-02',
  maxScore,
  weights: WEIGHTS,
  defectsTotal: GT.defects.length,
  cleanVideos: GT.clean_videos.map((c) => c.video),
  videos: [...new Set(GT.defects.map((d) => d.video))].concat(GT.clean_videos.map((c) => c.video)).sort(),
  roles: ROLES.map((r) => ({ id: r.id, name: r.name })),
  models,
  coverage,
  roleMatrix,
  missedByAll,
  extras,
};

mkdirSync(join(PROJECT_ROOT, 'docs'), { recursive: true });
writeFileSync(join(PROJECT_ROOT, 'docs', 'data.js'), `// Generated by src/build-site.mjs — do not edit by hand\nconst DATA = ${JSON.stringify(data, null, 1)};\n`);
console.log(`Wrote docs/data.js — ${models.length} models, ${GT.defects.length} defects`);
console.log(models.map((m) => `${m.key}: det ${m.detection}, fp ${m.fp}, cost $${m.cost}`).join('\n'));
