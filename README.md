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

## Results snapshot (August 2026, after full human adjudication)

| System | Score | Detection | Defects found | FPs | Run cost |
|---|---|---|---|---|---|
| Qwen 3.8 Max (reasoning) | **41** | 52/138 | 15/46 | 11 | $4.42 |
| Seed 2.1 Turbo | **39** | 40/138 | 11/46 | 1 | $1.96 |
| Kimi K3 (reasoning) | **39** | 54/138 | 20/46 | 15 | $10.83 |
| Gemini 3.6 Flash | **31** | 34/138 | 9/46 | 3 | $0.53 |
| Muse Spark 1.2 (reasoning) | **30** | 42/138 | 12/46 | 12 | $1.11 |
| Qwen 3.8 27B (reasoning) | **29** | 32/138 | 10/46 | 3 | $1.58 |
| Gemma 4 31B (reasoning) | **27** | 33/138 | 11/46 | 6 | $0.11 |
| Gemini 3.7 Flash | **22** | 25/138 | 7/46 | 3 | $0.15 |
| Gemini Pro Latest (reasoning) | **21** | 69/138 | 23/46 | 48 | $2.15 |
| Nemotron 3 Nano (free, reasoning) | **11** | 14/138 | 5/46 | 3 | $0.00 |
| TwelveLabs Pegasus 1.5 | **6** | 6/138 | 2/46 | 0 | ~$0.58 |

Score = severity-weighted credit for human-baseline defects found (P0=8 … P4=1) − 1 per
false-positive finding. The ground truth includes 10 defects first surfaced by models and then
human-confirmed. Headline patterns: Gemini Pro finds the most real defects (23/46) but its 48
false positives sink it; Seed 2.1 Turbo is the precision champion (1 FP) at ~9 min/call; Kimi K3
pairs the second-best recall with honest confidence calibration; and Gemini 3.7 Flash *regresses*
against its 3.6 predecessor on this task. Full matrices and charts in the report.

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
  HTTP 200 with empty content when a provider dropped the video (detected + retried); and
  gateway idle timeouts killed long non-streamed generations - fixed by switching the client to
  SSE streaming (stream: true), which recovered every previously-failed call.
