// Score each benchmark run against the human-baseline ground truth.
//
// Scoring model:
//   detection = sum of priority weights over UNIQUE baseline defects the model found (any role)
//   penalty   = FP_PENALTY per false-positive finding
//   score     = detection - penalty
// EXTRA findings (plausible defects not in the human baseline) are neutral:
// no credit, no penalty; they are listed for human adjudication.
//
// Usage: node src/score.mjs [--fp-penalty 1]
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PROJECT_ROOT } from './openrouter.mjs';
import { ROLES } from './roles.mjs';

const WEIGHTS = { P0: 8, P1: 5, P2: 3, P3: 2, P4: 1 };
const argIdx = process.argv.indexOf('--fp-penalty');
const FP_PENALTY = argIdx > -1 ? Number(process.argv[argIdx + 1]) : 1;

const GT = JSON.parse(readFileSync(join(PROJECT_ROOT, 'ground-truth/ground-truth.json'), 'utf8'));
const MATCHES = JSON.parse(readFileSync(join(PROJECT_ROOT, 'ground-truth/matches.json'), 'utf8'));
const RUNS = MATCHES._runs;
const defectById = new Map(GT.defects.map((d) => [d.id, d]));
const maxScore = GT.defects.reduce((a, d) => a + WEIGHTS[d.priority], 0);

// Collect all findings per run and join with classifications.
const models = {};
for (const [label, runId] of Object.entries(RUNS)) {
  const rawDir = join(PROJECT_ROOT, 'results', runId, 'raw');
  const findings = [];
  for (const f of readdirSync(rawDir).filter((x) => x.endsWith('.json'))) {
    const d = JSON.parse(readFileSync(join(rawDir, f), 'utf8'));
    (d.findings ?? []).forEach((fi, i) => {
      const key = `${label}|${d.video.replace('.mp4', '')}|${d.role}|${i}`;
      const cls = MATCHES[key];
      if (!cls) throw new Error(`Unclassified finding: ${key}`);
      findings.push({ key, video: d.video.replace('.mp4', ''), role: d.role, cls, finding: fi });
    });
  }
  models[label] = { runId, findings };
}

// Score each model.
const lines = [];
lines.push('# Benchmark scores vs human baseline');
lines.push('');
lines.push(`Ground truth: ${GT.defects.length} defects from \`review-human-baseline.md\` (weights P0=${WEIGHTS.P0}, P1=${WEIGHTS.P1}, P2=${WEIGHTS.P2}, P3=${WEIGHTS.P3}, P4=${WEIGHTS.P4}; max detection = ${maxScore}). FP penalty = ${FP_PENALTY} per false-positive finding. EXTRA findings (plausible, not in baseline) are neutral and listed at the bottom for adjudication.`);
lines.push('');
lines.push('## Leaderboard');
lines.push('');
lines.push('| Model | Score | Detection | Defects found | FP findings | TP findings | EXTRA | Precision* |');
lines.push('|---|---|---|---|---|---|---|---|');

const summary = {};
for (const [label, m] of Object.entries(models)) {
  const tpDefects = new Set(m.findings.filter((f) => f.cls.startsWith('TP:')).map((f) => f.cls.slice(3)));
  const detection = [...tpDefects].reduce((a, id) => a + WEIGHTS[defectById.get(id).priority], 0);
  const fp = m.findings.filter((f) => f.cls === 'FP').length;
  const tp = m.findings.filter((f) => f.cls.startsWith('TP:')).length;
  const extra = m.findings.filter((f) => f.cls.startsWith('EXTRA:')).length;
  const score = detection - FP_PENALTY * fp;
  const precision = m.findings.length ? ((tp + extra) / m.findings.length) : 1;
  summary[label] = { tpDefects, detection, fp, tp, extra, score, total: m.findings.length };
  lines.push(`| ${label} | **${score}** | ${detection}/${maxScore} | ${tpDefects.size}/${GT.defects.length} | ${fp} | ${tp} | ${extra} | ${(precision * 100).toFixed(0)}% |`);
}
lines.push('');
lines.push('*Precision counts TP+EXTRA findings as non-noise.');
lines.push('');

// Defect coverage matrix.
lines.push('## Defect coverage (which model found which baseline defect)');
lines.push('');
const labels = Object.keys(models);
lines.push(`| Defect | Prio | ${labels.join(' | ')} | Description |`);
lines.push(`|---|---|${labels.map(() => '---').join('|')}|---|`);
for (const d of GT.defects) {
  const cells = labels.map((l) => (summary[l].tpDefects.has(d.id) ? '✓' : '·'));
  lines.push(`| ${d.id} | ${d.priority} | ${cells.join(' | ')} | ${d.description.slice(0, 90)} |`);
}
lines.push('');
const missedByAll = GT.defects.filter((d) => !labels.some((l) => summary[l].tpDefects.has(d.id)));
lines.push(`**Missed by every model (${missedByAll.length}):** ${missedByAll.map((d) => `${d.id} (${d.priority})`).join(', ') || 'none'}`);
lines.push('');

// Per-role contribution: which roles produced TP findings, per model.
lines.push('## Role contribution (TP findings / total findings per role)');
lines.push('');
lines.push(`| Role | ${labels.join(' | ')} |`);
lines.push(`|---|${labels.map(() => '---').join('|')}|`);
for (const role of ROLES.map((r) => r.id)) {
  const cells = labels.map((l) => {
    const rf = models[l].findings.filter((f) => f.role === role);
    const tp = rf.filter((f) => f.cls.startsWith('TP:')).length;
    const fpc = rf.filter((f) => f.cls === 'FP').length;
    return rf.length ? `${tp}tp/${fpc}fp/${rf.length}` : '—';
  });
  lines.push(`| ${role} | ${cells.join(' | ')} |`);
}
lines.push('');

// Unique-role credit: defects only a specialist (non-baseline role) caught, per model.
lines.push('## Specialist vs generalist detection (per model: defects found only by specialists / only by baseline / by both)');
lines.push('');
for (const l of labels) {
  const byBaseline = new Set(models[l].findings.filter((f) => f.cls.startsWith('TP:') && f.role === 'baseline-generalist').map((f) => f.cls.slice(3)));
  const bySpecialist = new Set(models[l].findings.filter((f) => f.cls.startsWith('TP:') && f.role !== 'baseline-generalist').map((f) => f.cls.slice(3)));
  const onlySpec = [...bySpecialist].filter((id) => !byBaseline.has(id));
  const onlyBase = [...byBaseline].filter((id) => !bySpecialist.has(id));
  const both = [...bySpecialist].filter((id) => byBaseline.has(id));
  lines.push(`- **${l}**: specialists-only [${onlySpec.join(', ') || '—'}], baseline-only [${onlyBase.join(', ') || '—'}], both [${both.join(', ') || '—'}]`);
}
lines.push('');

// FP detail.
lines.push('## False positives (penalized findings)');
lines.push('');
for (const l of labels) {
  const fps = models[l].findings.filter((f) => f.cls === 'FP');
  if (!fps.length) { lines.push(`- **${l}**: none`); continue; }
  lines.push(`- **${l}** (${fps.length}):`);
  for (const f of fps) lines.push(`  - ${f.video} / ${f.role} @${f.finding.timestamp}: ${String(f.finding.description ?? '').slice(0, 130)}`);
}
lines.push('');

// EXTRA adjudication list.
lines.push('## EXTRA findings awaiting human adjudication (plausible defects not in the baseline)');
lines.push('');
lines.push('If confirmed, these should be added to ground-truth.json and rescored; if rejected, reclassify as FP in matches.json.');
lines.push('');
for (const [slug, desc] of Object.entries(MATCHES._extras)) {
  const hits = labels.flatMap((l) => models[l].findings.filter((f) => f.cls === `EXTRA:${slug}`).map((f) => l));
  const byModel = [...new Set(hits)].map((l) => `${l}×${hits.filter((x) => x === l).length}`).join(', ');
  lines.push(`- **${slug}** (${byModel}): ${desc}`);
}
lines.push('');

const outPath = join(PROJECT_ROOT, 'results', 'scores.md');
writeFileSync(outPath, lines.join('\n'));
console.log(lines.slice(0, 20).join('\n'));
console.log(`\nWrote ${outPath}`);
