# Methodology experiments: variance, router A/B validation, verify pass (2026-09-02..04)

Scratch experiments — NOT part of the public leaderboard. Total cost $6.28.
Runs: `2026-09-02_flash36_v1-var-s1/s2/s3`, `2026-09-02_flash36_router-s1/s2/s3`,
`2026-09-02_pro_router-s1/s2/s3`, `2026-09-02_pro_verify-pass`.
Adjudicated per the standard rules (trap classes auto-FP'd, cross-run/cross-sample
corroboration can promote to EXTRA); `matches.json` and the leaderboard untouched.

**KT adjudicated the review queue 2026-09-04** (verdicts folded into the numbers below):
all queued EXTRAs and partials rejected → FP, with two exceptions: (1) the microwave findings
are part of HOME-1 — the second kitchen is a *different* kitchen, so the "relocated" microwave
belongs to the duplicate-kitchen defect → reclassified TP:HOME-1; (2) the dancer exit-sign
findings, while themselves not the correct error, led KT to discover **DANC-4: the mirror
reflection shows two exit doors where only one reflected door should exist** — added to
ground truth (P3 assigned by Claude, pending KT confirmation). Ground truth now 48 defects,
max detection 141; no past system ever found DANC-4, so all leaderboard scores are unchanged
(denominators updated repo-wide). The umbrella claims were a misinterpretation of APPL-1
(the apple should fall).

## Headline results

1. **Single-run leaderboard scores carry roughly ±7-point noise.** Three identical v1 runs of
   Gemini 3.6 Flash scored **40 / 35 / 26** (frozen leaderboard run: 31). Mean ~34, sd ~7,
   range 14. Adjacent leaderboard rankings separated by <7 points are not reliable orderings.
2. **The router + 3-sample-union recipe generalizes beyond Ox Alpha** — validated on both a
   high-precision model (Flash 3.6) and a high-recall/low-precision one (Gemini Pro).
3. **Two of the 11 never-found defects fell this round — to harness architecture, not new
   models**: **HOME-2** (chairs tucked under the bed; Flash router 2/3 samples + Pro 1/3) and
   **DANC-3** (hand behind back vs in front in reflection; Pro router 2/3 samples).
   9 of the 11 remain open (7 in `_long-scene`, untouched by design — that's the test);
   with the new KT-discovered DANC-4, the open never-found set is 10 of 48.
4. **The verify pass (roles-v2 item 7) is falsified** — see
   `2026-09-02_pro_verify-pass/experiment-notes.md`. Same-model self-verification rejects
   real findings at a higher rate (38%) than false ones (29%); no confidence threshold helps.
5. **The audio check works on Gemini models**: DIAL-1 caught in 3/3 Flash router samples and
   3/3 Pro router samples. Its earlier no-show on Ox Alpha was that provider dropping audio,
   not a weak prompt.

## Experiment A — run-to-run variance (3× identical v1 harness, Flash 3.6)

| Run | Defects | Detection | FP | Score |
|---|---|---|---|---|
| frozen 2026-08-14 (leaderboard) | 9/48 | 34 | 3 | 31 |
| v1-var-s1 | 12/48 | 46 | 6 | **40** |
| v1-var-s2 | 10/48 | 37 | 2 | **35** |
| v1-var-s3 | 8/48 | 29 | 3 | **26** |

(s3 includes HOME-1 via its microwave findings per KT's ruling that the second kitchen is a
different kitchen.)

s1 caught LONG-11(P0), CAR-1(P0), DANC-1, MIRR-1, OLIV-3 — none of which the frozen run
found; s3 missed even LONG-13 (the truck swap, caught by nearly every system ever).
Same model ID, same prompts, same videos. Implication for the leaderboard: v1 rankings are
directionally useful at the tier level (40s vs 20s vs single digits) but adjacent placements
(e.g. Muse 30 vs Flash 31, Qwen27B 28 vs Gemma 27) are within noise. Recommendation:
**N=3 union becomes the standard entry protocol for new models** where cost permits, and
the README/leaderboard should carry a variance caveat citing this experiment.

## Experiment B — router-ensemble A/B validation (Flash 3.6 + Gemini Pro)

Identical methodology to the Ox Alpha ensemble: shared pass-1 routing (copied from s1),
3 independent pass-2 samples, union-scored on top of the untouched frozen v1 baseline.
Pro ran with reasoning (matching its v1 baseline); Flash without.

| Configuration | Defects | Detection | FP | Score |
|---|---|---|---|---|
| Flash v1 frozen baseline | 9/48 | 34 | 3 | 31 |
| Flash router layer only, 3-sample union | 11/48 | 39 | **0** | **39** |
| **Flash v1 + router union** | **13/48** | 43 | 3 | **40** |
| Pro v1 frozen baseline | 24/48 | 70 | 48 | 22 |
| Pro router layer only, 3-sample union | 22/48 | 61 | 35 | **26** |
| Pro v1 + router union | **30/48** | **84** | 83 | 1 |

(Pro FP counts include KT's 2026-09-04 rejections of the queued EXTRAs/partials.)

- **Flash**: +9 score, +4 defects (LONG-15, DIAL-1, HOME-2, CAR-4), zero router FPs across
  135 calls. The routed-check layer alone (39) nearly matches Qwen-Max's leaderboard-topping 41.
- **Pro**: the router layer is dramatically better-behaved than Pro's own always-on roles —
  22 defects at 35 FPs (across 3 samples) vs 24 defects at 48 FPs. Router-only scores 26 vs
  the v1 baseline's 22. The full union hits **30/48 defects, the best recall ever recorded on
  this benchmark** (previous best: Pro's own 24), but additive FP accumulation (83) sinks the
  unified score to 1 — the strongest illustration yet that the single scalar conflates
  perception with discipline. A two-axis (detection vs FP) view belongs on the report.
- Same-model consistency: Ox Alpha went 28→33 under this recipe. All three models improve;
  the recipe is now validated as the **v2 harness track** design.
- Router FP texture on Pro: 35 FPs in 3 samples are dominated by known trap classes doing
  their job (diner-window reflections, hood-ornament morphs, mirror-handedness misreads,
  bill claims near LONG-10) — the adjudication rules absorb them cleanly.

## Experiment C — verify pass: falsified

Full writeup in `results/2026-09-02_pro_verify-pass/experiment-notes.md`. Confusion matrix:
TP findings rejected 25/66 (38%), FP findings rejected 14/48 (29%). Score 22→23 while
coverage collapses 24→16 defects. Combined with the v2r1 confound-checklist regression
(28→18), the pattern is settled: **mechanisms that ask the model to doubt findings destroy
real recall on exactly the hardest-won findings.** Precision must come from architecture
(routing, sampling, corroboration, trap-class rules), not from model second-guessing.

## Recommended v2 methodology (for KT sign-off)

1. Keep the v1 single-run leaderboard frozen for comparability; add a variance caveat.
2. Add a **v2 "harnessed" track**: v1 core roles + feature-router × 3 samples, union-scored,
   with reasoning setting matched per model and recorded. New models get both a v1 entry
   (N=3 union where affordable) and optionally a v2-track entry.
3. Report detection and FP count as separate axes alongside the scalar score.
4. No verify pass, no global confound prompts — both falsified.
5. `_long-scene`'s remaining 7 never-found defects (LONG-2/5/6/7/8/9/10) plus CUPS-2 and
   SKAT-1 stay as the open capability frontier; no clip-targeted scaffolding.

## KT review queue — RESOLVED 2026-09-04

All queued items adjudicated by KT:
- **Microwave relocates → part of HOME-1** (the second kitchen is a different kitchen; the
  new microwave belongs to that defect). Findings reclassified TP:HOME-1.
- **Cups token text → rejected** (KT sees no text there). FP.
- **Olive bowl contents → rejected** (contents reflect olives being scooped out). FP.
- **Umbrella unsupported → rejected** — a misinterpretation of the correct defect APPL-1
  (the apple should fall). FP.
- **Dancer exit signage → led to a new ground-truth defect, DANC-4**: the mirror reflection
  shows two exit doors where only one reflected door should exist. The signage-not-mirrored
  observation itself was a fair point but not the defect; model findings stay FP. DANC-4
  added at P3 (Claude-assigned, pending KT confirmation); never found by any system.
- **All remaining partials (LONG-8 approach, HOME-2 mislocalizations, LONG-10 bill claims,
  long-scene garbled-text extras) → rejected.** FP.
