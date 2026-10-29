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

## Results snapshot (October 2026, after full adjudication)

Ranked **recall-first**: a missed defect ships, a false positive only costs a reviewer a second look,
so false positives are reported as a separate review-burden column rather than subtracted from the ranking.

| # | System | Defects found | Detection | False positives | Run cost | Legacy score |
|---|---|---|---|---|---|---|
| 1 | Gemini 4 Argon (reasoning: high, flex tier)‡ | **27/50** | **92/147** | 26 | $1.05 | 66 |
| 2 | Gemini Pro Latest (reasoning) | **24/50** | **70/147** | 48 | $2.15 | 22 |
| 3 | Kimi K3 (reasoning) | **21/50** | **55/147** | 18 | $10.83 | 37 |
| 4 | Qwen 3.8 Max (reasoning) | **15/50** | **52/147** | 11 | $4.42 | 41 |
| 5 | Gemini 3.8 Flash | **12/50** | **46/147** | 3 | $0.53 | 43 |
| 6 | Muse Spark 1.2 (reasoning) | **12/50** | **42/147** | 12 | $1.11 | 30 |
| 7 | Seed 2.1 Turbo | **11/50** | **40/147** | 1 | $1.96 | 39 |
| 8 | GLM 5.3 Flash (was Ox Alpha stealth) | **15/50** | **39/147** | 11 | ~$0.33* | 28 |
| 9 | Gemini 3.6 Flash | **9/50** | **34/147** | 3 | $0.53 | 31 |
| 10 | Gemma 4 31B (reasoning) | **11/50** | **33/147** | 6 | $0.11 | 27 |
| 11 | Qwen 3.8 27B (reasoning) | **10/50** | **32/147** | 4 | $1.58 | 28 |
| 12 | Muse Spark 1.3 (reasoning) | **8/50** | **30/147** | 0 | $0.08 | 30 |
| 13 | Nemotron 3.5 Super VL (free, reasoning)† | **8/50** | **25/147** | 16 | $0.00 | 9 |
| 14 | Gemini 3.7 Flash | **7/50** | **25/147** | 3 | $0.15 | 22 |
| 15 | Nemotron 3 Nano (free, reasoning) | **5/50** | **14/147** | 3 | $0.00 | 11 |
| 16 | TwelveLabs Pegasus 1.5 | **2/50** | **6/147** | 0 | ~$0.58 | 6 |

\* Ox Alpha was OpenRouter's anonymized stealth slug for GLM 5.3 Flash (revealed 2026-08-26).
Pricing is $0.15/1M input tokens, $0.50/1M output tokens (cached input reads discounted, often
~$0.03/1M). The stealth run itself was free under a promotional trial (actual cost $0.00); the
figure above is the estimated cost at published pricing applied to the run's actual usage
(664K input / 469K output tokens across 84 calls).

† First model run under the full 2.0 protocol (v1 × 3 samples + feature router × 3 samples;
see `results/2026-10-27_nemotron-3.5-super-vl_2.0-protocol.md`). The row above is the first v1
sample, for comparability; the three identical v1 runs had legacy scores of 9 / 17 / 13. Union across all six
samples: 14/50 defects, 39/147 detection. The provider samples a fixed handful of frames per clip
(same prompt-token count for 10 s and 2 min videos), which drives most of its FPs.

‡ Gemini 4 Argon, run 2026-10-27 under the full 2.0 protocol on Google AI Studio's half-price flex
tier (`--provider google-ai-studio/flex`, `--reasoning-effort high`; plain `reasoning: enabled` gives
no reasoning on this model). The row above is the first v1 sample; the three v1 samples found 27 / 24 / 25
defects. **Union across all six samples: 33/50 defects, 113/147 detection**, the best recall on this
benchmark by a wide margin. Five of those defects had never been found by any leaderboard system
(LONG-6 and LONG-10, both P0; LONG-7 and LONG-9, both P1; HOME-2), plus the newly confirmed LONG-16.
Full 2.0 run cost $5.29. See
`results/2026-10-27_gemini-4-argon_2.0-protocol.md`.

Detection = severity-weighted credit for unique human-baseline defects found (P0=8 … P4=1, max 147);
ties broken by defects found, then fewest false positives. Legacy score = detection − 1 per false-positive
finding (the original single metric, kept for continuity). The ground truth includes 14 defects first surfaced
or prompted by model findings and then human-confirmed (latest: LONG-16 and LONG-17, 2026-10-27). Headline patterns: Gemini 4
Argon leads by a wide margin (27/50, 92/147 in a single run; 33/50 pooled across six); Gemini Pro was the previous
recall leader (24/50, 70/147) at the cost of 48 false positives to review; Kimi K3 is third
on recall with honest confidence calibration; Seed 2.1 Turbo is the precision champion (1 FP) at ~9 min/call;
Gemini 3.8 Flash is the best value (46/147 for $0.53, 3 FPs); and Gemini 3.7 Flash *regresses* against its 3.6
predecessor on this task. Single runs vary by ±7–10 detection points, so adjacent placements are within noise.
Full matrices and charts in the report.

## GPT-6 Astra blind v2 evaluation (27 October 2026)

[Full audit and evidence](DELIVERABLES/261027%20Astra%20QC%20Review/Audit.html).
The frozen agent evaluation uses one six-role core sample and three feature-router samples.
It follows the same recall-first scoring as Nemotron 3.5: unique severity-weighted detection
leads; false positives are a separate review burden; subtraction is a secondary legacy metric.

| Layer | Samples | Detection | Defects | FP/sample | FP total | Legacy score |
|---|---|---|---|---|---|---|
| Core | 1 | 51/147 | 12/50 | 1.0 | 1 | 50 |
| Router union | 3 | 66/147 | 15/50 | 0.3 | 1 | 65 |
| Combined union | 4 | **71/147** | **18/50** | 0.5* | **2** | 69 |

*The combined mean mixes different layers; compare FP burden by layer. Nemotron used three
core samples, so the sampling configurations differ. Astra inspected extracted frames, with
optional denser inspection; audio was unassessed. This is a separate agent evaluation, not a
controlled native-video model ranking. The 311 calls were frozen before grading.

KT confirmed LONG-16 (two mugs merge) and LONG-17 (kitchen behind the hatch changes, including
the poster above), both P2, and extended LONG-8 to the later counter crossing. These contribute
nine additional detection points to Astra; only the two new IDs expand the truth to 50 defects
and 147 points. The poster detail was supplied by KT. Existing published models' long-scene
claims were reviewed; no additional matches were established, so their numerators are unchanged.
Frozen raw predictions and the original 48-label reference remain in
`RUNS/261027 GPT6 Astra blind audit/`; standard per-run classifications are in
`results/2026-10-27_gpt-6-astra-blind_{core,router-s1,router-s2,router-s3}/`.

## Claude Opus 5.5 blind evaluation (28 October 2026)

[Report and review queue](DELIVERABLES/261028%20Opus%205.5%20QC%20Review/Report.md). A
fresh, memory-less dispatcher thread ran the full 2.0 protocol with Opus 5.5 (effort high): core ×3
and router ×3, one fresh delegated task per call, 482 calls. It used the same opaque clips, extracted
frames, contact sheets, prompts and router as the Astra run above. Like Astra, this is an agent
evaluation on still frames with audio unassessed, not a native-video model ranking.

| Layer | Samples | Detection | Defects | FP/sample | FP total |
|---|---|---|---|---|---|
| Core (single samples) | 1 | 89–101/147 | 27–32/50 | 39–46 | — |
| Router (single samples) | 1 | 77–87/147 | 23–27/50 | 7–13 | — |
| Core union | 3 | 106/147 | 34/50 | 41.7 | 125 |
| Router union | 3 | 92/147 | 29/50 | 9.3 | 28 |
| Combined union | 6 | **109/147** | **35/50** | 25.5 | 153 |

35/50 is the most defects found by any configuration on this benchmark. Gemini 4 Argon's six-sample
union found 33/50 but has higher detection (113/147), because Opus misses LONG-10 (P0) and APPL-1 (P1).
Opus is the first system to find DANC-4. On identical frames, its Astra-equivalent configuration
(core ×1 + router ×3) found 32/50 against Astra's 18/50, with far more false positives (74 vs 2).
The two runs were adjudicated by different processes. Eight new claims corroborated across samples
await review. Frozen predictions are in `RUNS/261028 Opus 5.5 blind run/`; per-sample runs are in
`results/2026-10-28_claude-opus-5.5-blind_*`; the writeup is
`results/2026-10-28_claude-opus-5.5-blind_2.0-protocol.md`.

## Repo layout

```
00 test videos/          the 14 test clips (13 × 10s + one 2-minute scene)
review-human-baseline.md human reviewer's defect audit (ground truth source)
ground-truth/            structured ground truth + model-finding adjudications
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
  is visually clean as a false-positive trap; DIAL-1 is an audio defect.
- Model findings are adjudicated against the baseline (with frame-level
  verification via extracted contact sheets): true positive, plausible **extra** (neutral,
  awaiting human confirmation — see the report), or penalized false positive.
- Provider quirks encountered and worked around: Alibaba's content filter rejected a prompt
  containing the word "penetration" (reworded to "clip through"); Alibaba caps request bodies
  at 10MB (the 2-minute clip was recompressed to fit); OpenRouter occasionally returned
  HTTP 200 with empty content when a provider dropped the video (detected + retried); and
  gateway idle timeouts killed long non-streamed generations - fixed by switching the client to
  SSE streaming (stream: true), which recovered every previously-failed call.
