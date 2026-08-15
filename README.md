# Video QC Bench

Can video language models find continuity and physics defects in AI-generated video?

This benchmark runs each video-capable model as **five specialist forensic observers plus a
generalist baseline** — separate API passes with narrowly-scoped ontologies (object persistence,
character continuity, contact & kinematics, spatial topology, causal order) — over 14 test clips
containing known defects, then scores the findings against a human reviewer's defect baseline.

**📊 Live report: [GitHub Pages site](https://kaigani.github.io/video-qc-bench/)** (rendered from `docs/`)

## Why specialist roles?

Generic "find any issues with this video" prompts are too broad: models surface only salient
defects and miss subtle impossibilities between frames. Constraining each pass to a narrow
ontology of what is *allowed to change over time* — and requiring an invariant ledger before any
findings — produces measurably different (and per-model, diagnostic) results. See the
[report](https://kaigani.github.io/video-qc-bench/) for the specialist-vs-baseline breakdown.

## Results snapshot (August 2026)

| System | Score | Detection | Defects found | FPs | Run cost |
|---|---|---|---|---|---|
| Gemini Pro Latest (reasoning) | **38** | 69/116 | 20/36 | 31 | $2.15 |
| Qwen 3.8 Max (reasoning) | **36** | 40/116 | 10/36 | 4 | $4.42 |
| Gemini 3.6 Flash | **27** | 27/116 | 7/36 | 0 | $0.53 |
| Gemma 4 31B (reasoning) | **23** | 24/116 | 8/36 | 1 | $0.11 |
| TwelveLabs Pegasus 1.5 | **1** | 1/116 | 1/36 | 0 | ~$0.58 |

Score = severity-weighted credit for human-baseline defects found (P0=8 … P4=1) − 1 per
false-positive finding. Full matrices, cost/detection chart, and per-role breakdowns in the report.

## Repo layout

```
00 test videos/          the 14 test clips (13 × 10s + one 2-minute scene)
review-human-baseline.md human reviewer's defect audit (ground truth source)
ground-truth/            structured ground truth + adjudication of all 216 model findings
src/
  roles.mjs              the 6 role prompts (invariant-ledger + strict-JSON contract)
  run-benchmark.mjs      runner: videos × roles → OpenRouter (or TwelveLabs) → results/
  openrouter.mjs         OpenRouter client (base64 video, retry, usage capture)
  twelvelabs.mjs         TwelveLabs Pegasus sync-analyze client
  score.mjs              scores runs against ground truth → results/scores.md
  report.mjs             per-run human-review report (review.md)
  compare.mjs            cross-run findings matrix (comparison.md)
  build-site.mjs         regenerates docs/data.js for the Pages report
results/<run-id>/        manifest + raw per-call JSON for each benchmark run
docs/                    the GitHub Pages report (static, no dependencies)
```

## Running it

```bash
# .env in repo root:
#   OPENROUTER_API_KEY=sk-or-...
#   TWELVELABS_API_KEY=tlk_...   (only for pegasus runs)

node src/run-benchmark.mjs --model google/gemini-3.6-flash            # full run
node src/run-benchmark.mjs --model qwen/qwen3.8-max --reasoning       # with reasoning
node src/run-benchmark.mjs --model twelvelabs/pegasus1.5              # specialist service
node src/run-benchmark.mjs --videos man-cups --roles character-continuity  # targeted

node src/report.mjs                # review.md for the latest run
node src/score.mjs [--fp-penalty 2]
node src/compare.mjs
node src/build-site.mjs            # refresh docs/data.js
```

Runs are resumable: completed video×role calls are skipped on re-invocation.

## Method notes & caveats

- Ground truth is a human visual audit (P0 = clip-ruining … P4 = minor). One clip (`dialogue`)
  is deliberately defect-free as a false-positive trap.
- All 216 findings were adjudicated against the baseline (by Claude, with frame-level
  verification via extracted contact sheets): true positive, plausible **extra** (neutral,
  awaiting human confirmation — see the report), or penalized false positive.
- Provider quirks encountered and worked around: Alibaba's content filter rejected a prompt
  containing the word "penetration" (reworded to "clip through"); Alibaba caps request bodies
  at 10MB (the 2-minute clip was recompressed to fit); OpenRouter occasionally returned
  HTTP 200 with empty content when a provider dropped the video (detected + retried).
