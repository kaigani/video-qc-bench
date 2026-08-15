// Cross-model comparison: findings per video × role for every run in results/.
// Usage: node src/compare.mjs [run-id ...]   (defaults to all runs)
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { PROJECT_ROOT } from './openrouter.mjs';
import { ROLES } from './roles.mjs';

const RESULTS_DIR = join(PROJECT_ROOT, 'results');

const runIds = process.argv.slice(2).length
  ? process.argv.slice(2)
  : readdirSync(RESULTS_DIR).filter((d) => existsSync(join(RESULTS_DIR, d, 'manifest.json'))).sort();

const runs = runIds.map((runId) => {
  const manifest = JSON.parse(readFileSync(join(RESULTS_DIR, runId, 'manifest.json'), 'utf8'));
  const results = readdirSync(join(RESULTS_DIR, runId, 'raw'))
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(readFileSync(join(RESULTS_DIR, runId, 'raw', f), 'utf8')));
  const label = manifest.model.replace(/^~/, '').replace(/^(google|qwen)\//, '');
  return { runId, label, manifest, results };
});

const roleIds = ROLES.map((r) => r.id);
const videos = [...new Set(runs.flatMap((r) => r.results.map((x) => x.video.replace('.mp4', ''))))].sort();

const count = (run, video, role) => {
  const res = run.results.find((x) => x.video.replace('.mp4', '') === video && x.role === role);
  if (!res) return '?';
  if (!res.parseOk) return '!';
  return res.findings.length;
};

const lines = [];
lines.push('# Model comparison: findings per video × role');
lines.push('');
lines.push(`Cell format: ${runs.map((r) => r.label).join(' / ')}. Runs: ${runs.map((r) => `${r.label} (${r.runId})`).join(', ')}.`);
lines.push('');
lines.push(`| Video | ${roleIds.map((r) => r.replace(/-/g, ' ')).join(' | ')} | total |`);
lines.push(`|---|${roleIds.map(() => '---').join('|')}|---|`);
const totals = runs.map(() => 0);
for (const video of videos) {
  const cells = roleIds.map((role) => runs.map((run) => count(run, video, role)).join(' / '));
  const rowTotals = runs.map((run) =>
    roleIds.reduce((a, role) => a + (typeof count(run, video, role) === 'number' ? count(run, video, role) : 0), 0)
  );
  rowTotals.forEach((t, i) => (totals[i] += t));
  lines.push(`| ${video} | ${cells.join(' | ')} | **${rowTotals.join(' / ')}** |`);
}
lines.push(`| **TOTAL** | ${roleIds.map(() => '').join(' | ')} | **${totals.join(' / ')}** |`);
lines.push('');
lines.push('## Run stats');
lines.push('');
lines.push('| Run | Model | Reasoning | Calls | Errors | Cost |');
lines.push('|---|---|---|---|---|---|');
for (const run of runs) {
  const calls = Object.values(run.manifest.calls);
  const errors = calls.filter((c) => c.status === 'error').length;
  const cost = run.manifest.totalCost != null ? `$${run.manifest.totalCost.toFixed(2)}` : 'n/a';
  lines.push(`| ${run.runId} | ${run.manifest.model} | ${run.manifest.reasoning ? 'yes' : 'no'} | ${run.results.length} | ${errors} | ${cost} |`);
}
lines.push('');
lines.push('Notes:');
lines.push('- `!` = response did not parse; `?` = call missing.');
lines.push('- qwen3.8-max `_long-scene` used a 7.0MB compressed variant (Alibaba 10MB request cap); gemini-3.6-flash used the original 11.3MB file; gemini-pro-latest used the 8.7MB re-compressed file now in `00 test videos/`.');
lines.push('- qwen3.8-max contact-interaction role used reworded prompt ("clip through" vs "penetration") after Alibaba content-filter rejections; gemini-3.6-flash used the original wording; gemini-pro-latest used the reworded prompt.');
lines.push("- Verdict classification pending in each run's review.md.");

const outPath = join(RESULTS_DIR, 'comparison.md');
writeFileSync(outPath, lines.join('\n'));
console.log(`Wrote ${outPath} (${runs.length} runs, ${videos.length} videos)`);
