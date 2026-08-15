// Build review.md from a run's raw results: per-video findings grouped by role,
// with a blank classification column for the human review pass.
//
// Usage: node src/report.mjs [run-id]   (defaults to the most recent run)
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import { PROJECT_ROOT } from './openrouter.mjs';
import { ROLES } from './roles.mjs';

const RESULTS_DIR = join(PROJECT_ROOT, 'results');

function latestRunId() {
  const runs = readdirSync(RESULTS_DIR).filter((d) => existsSync(join(RESULTS_DIR, d, 'manifest.json'))).sort();
  if (!runs.length) throw new Error(`No runs found in ${RESULTS_DIR}`);
  return runs[runs.length - 1];
}

function main() {
  const runId = process.argv[2] ?? latestRunId();
  const runDir = join(RESULTS_DIR, runId);
  const rawDir = join(runDir, 'raw');
  const manifest = JSON.parse(readFileSync(join(runDir, 'manifest.json'), 'utf8'));
  const results = readdirSync(rawDir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(readFileSync(join(rawDir, f), 'utf8')));

  const roleName = new Map(ROLES.map((r) => [r.id, r.name]));
  const roleOrder = new Map(ROLES.map((r, i) => [r.id, i]));
  const videos = [...new Set(results.map((r) => r.video))].sort();

  const lines = [];
  lines.push(`# Video QC Review — ${runId}`);
  lines.push('');
  lines.push(`Model: \`${manifest.model}\`  |  Run started: ${manifest.started}`);
  lines.push('');
  lines.push('For each finding, fill in **Verdict** with one of: `defect` (real, correctly identified), `false-positive`, `duplicate` (same defect as another row), `partial` (real defect, wrong description/time).');
  lines.push('');

  // Summary table: findings per role per video.
  const rolesInRun = [...new Set(results.map((r) => r.role))].sort((a, b) => (roleOrder.get(a) ?? 99) - (roleOrder.get(b) ?? 99));
  lines.push('## Summary: findings per role');
  lines.push('');
  lines.push(`| Video | ${rolesInRun.map((r) => r.replace('baseline-', 'BASELINE-').replace(/-/g, ' ')).join(' | ')} |`);
  lines.push(`|---|${rolesInRun.map(() => '---').join('|')}|`);
  for (const video of videos) {
    const cells = rolesInRun.map((roleId) => {
      const res = results.find((r) => r.video === video && r.role === roleId);
      if (!res) return '—';
      if (!res.parseOk) return '⚠ parse';
      return String(res.findings.length);
    });
    lines.push(`| ${basename(video, '.mp4')} | ${cells.join(' | ')} |`);
  }
  lines.push('');
  const totalCost = manifest.totalCost != null ? `$${manifest.totalCost.toFixed(4)}` : 'n/a';
  const totalTokens = Object.values(manifest.calls).reduce((a, c) => a + (c.tokens ?? 0), 0);
  const errors = Object.entries(manifest.calls).filter(([, c]) => c.status === 'error');
  lines.push(`**Totals:** ${results.length} calls, ${totalTokens.toLocaleString()} tokens, ${totalCost}. Errors: ${errors.length}${errors.length ? ' (' + errors.map(([k]) => k).join(', ') + ')' : ''}.`);
  lines.push('');

  // Per-video detail.
  for (const video of videos) {
    lines.push(`## ${basename(video, '.mp4')}`);
    lines.push('');
    for (const roleId of rolesInRun) {
      const res = results.find((r) => r.video === video && r.role === roleId);
      if (!res) continue;
      lines.push(`### ${roleName.get(roleId) ?? roleId}`);
      lines.push('');
      if (!res.parseOk) {
        lines.push(`⚠ Response did not parse (${res.parseError}). See \`raw/${res.key}.json\`.`);
        lines.push('');
        continue;
      }
      if (res.findings.length === 0) {
        lines.push('_No findings._');
        lines.push('');
        continue;
      }
      lines.push('| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |');
      lines.push('|---|---|---|---|---|---|---|---|');
      res.findings.forEach((f, i) => {
        const desc = String(f.description ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
        const entity = String(f.entity ?? '').replace(/\|/g, '\\|');
        const inv = String(f.invariant_violated ?? '').replace(/\|/g, '\\|');
        lines.push(`| ${i + 1} | ${f.timestamp ?? '?'} | ${entity} | ${inv} | ${desc} | ${f.severity ?? '?'} | ${f.confidence ?? '?'} |  |`);
      });
      lines.push('');
    }
  }

  const outPath = join(runDir, 'review.md');
  writeFileSync(outPath, lines.join('\n'));
  console.log(`Wrote ${outPath} (${videos.length} videos, ${results.length} results)`);
}

main();
