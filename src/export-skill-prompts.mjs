// Export the benchmarked prompts (v1 core roles + feature router) to the global video-qc skill,
// so the production skill runs exactly the prompts this benchmark measured.
//
// Usage: node src/export-skill-prompts.mjs [out.json]
//   default out: ~/.claude/skills/video-qc/scripts/prompts.json
// The skill's Python router mirrors RULES' `when` conditions; the `when` source is exported
// alongside each rule so a mismatch is visible in review.
import { writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { ROLES } from './roles.mjs';
import { FEATURE_PROMPT, RULES } from './feature-router.mjs';
import { PROJECT_ROOT } from './openrouter.mjs';

const out = process.argv[2] ?? join(homedir(), '.claude/skills/video-qc/scripts/prompts.json');
let commit = null;
try { commit = execSync('git rev-parse --short HEAD', { cwd: PROJECT_ROOT }).toString().trim(); } catch {}

const data = {
  source: 'https://github.com/kaigani/video-qc-bench (src/roles.mjs, src/feature-router.mjs)',
  source_commit: commit,
  exported: new Date().toISOString(),
  feature_prompt: FEATURE_PROMPT,
  core_roles: ROLES.map(({ id, name, prompt }) => ({ id, name, prompt })),
  router_checks: RULES.map((r) => ({ id: r.id, name: r.role.name, when: r.when.toString(), prompt: r.role.prompt })),
};
writeFileSync(out, JSON.stringify(data, null, 1) + '\n');
console.log(`wrote ${out}: ${data.core_roles.length} core roles, ${data.router_checks.length} router checks (commit ${commit})`);
