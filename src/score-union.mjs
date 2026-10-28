// Union-score a group of runs (2.0 protocol: v1 N=3 + router ×3) from per-run
// results/<run>/classifications.json files (keys "<video>|<role>|<findingIndex>",
// values TP:<id> / EXTRA:<slug> / FP — same vocabulary as ground-truth/matches.json).
//
// Usage: node src/score-union.mjs <label>=<run>[,<run>...] [<label>=...] [--fp-penalty N]
//   e.g. node src/score-union.mjs v1=a,b,c router=d,e,f all=a,b,c,d,e,f
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { PROJECT_ROOT } from './openrouter.mjs';

const WEIGHTS = { P0: 8, P1: 5, P2: 3, P3: 2, P4: 1 };
const GT = JSON.parse(readFileSync(join(PROJECT_ROOT, 'ground-truth/ground-truth.json'), 'utf8'));
const byId = new Map(GT.defects.map((d) => [d.id, d]));
const maxDet = GT.defects.reduce((a, d) => a + WEIGHTS[d.priority], 0);

const argv = process.argv.slice(2);
let penalty = 1;
const groups = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === '--fp-penalty') penalty = Number(argv[++i]);
  else { const [label, runs] = argv[i].split('='); groups.push({ label, runs: runs.split(',') }); }
}

function loadRun(runId) {
  const dir = join(PROJECT_ROOT, 'results', runId);
  const clsPath = join(dir, 'classifications.json');
  if (!existsSync(clsPath)) throw new Error(`${runId}: no classifications.json`);
  const cls = JSON.parse(readFileSync(clsPath, 'utf8'));
  const out = [];
  for (const f of readdirSync(join(dir, 'raw')).filter((x) => x.endsWith('.json'))) {
    const d = JSON.parse(readFileSync(join(dir, 'raw', f), 'utf8'));
    (d.findings ?? []).forEach((_, i) => {
      const key = `${d.video.replace('.mp4', '')}|${d.role}|${i}`;
      if (!(key in cls)) throw new Error(`${runId}: unclassified finding ${key}`);
      out.push(cls[key]);
    });
  }
  return out;
}

console.log(`| Group | Runs | Defects | Detection | FP per sample | FP total | Legacy score |\n|---|---|---|---|---|---|---|`);
for (const g of groups) {
  const all = g.runs.flatMap(loadRun);
  const ids = new Set(all.filter((c) => c.startsWith('TP:')).map((c) => c.slice(3)));
  const det = [...ids].reduce((a, id) => a + WEIGHTS[byId.get(id).priority], 0);
  const fp = all.filter((c) => c === 'FP').length;
  console.log(`| ${g.label} | ${g.runs.length} | **${ids.size}/${GT.defects.length}** | **${det}/${maxDet}** | ${(fp / g.runs.length).toFixed(1)} | ${fp} | ${det - penalty * fp} |`);
  console.log(`|  | defects: ${[...ids].sort().join(', ')} | | | | | |`);
}
