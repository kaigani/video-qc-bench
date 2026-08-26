# Ox Alpha router ensemble — repeat-sampling experiment (2026-08-22)

> Ox Alpha revealed 2026-08-26 as GLM 5.3 Flash ($0.15/1M input, $0.50/1M output). Runs below
> were free under a promotional trial; see README.md for an estimated-cost figure.

Scratch experiment — NOT part of the public leaderboard. Runs:
`2026-08-22_ox-alpha_router-pass1-validation` (s1), `_router-s2`, `_router-s3`.
Identical routing (pass-1 checklists copied from s1); 60 routed checks × 3 independent
samples = 180 calls, all completed. Adjudicated per the standard rules; cross-SAMPLE
corroboration treated like cross-run corroboration.

## Headline

| Configuration | Unique defects | Detection | FP | Score |
|---|---|---|---|---|
| v1 core roles (baseline run) | 15/47 | 39/139 | 11 | **28** |
| Router layer only, 3-sample union | 13/47 | 36/139 | 4 | 32 |
| **v1 core + router ensemble (union)** | **19/47** | **48/139** | 15 | **33** |
| … + provisional APPL-2 (pending KT) | 20/47 | 50/139 | 15 | 35 |

Four defects the v1 core run NEVER found, added by the router ensemble:
- **HOME-1** (P1, impossible duplicate hallway) — layout-connectivity, s2, a precise
  axial-sightline argument; one of the strongest findings any run has produced
- **CUPS-1** (P3, coin deposited into cup ends up outside/at rim) — pour-conservation, s2
- **CAR-2** (P4, license-plate text unstable "STE097"→"STE197") — text-stability, s2 AND s3
  independently
- **OLIV-2** (P4, jar fill-level drops across cut) — cross-cut-placement, s1

## Sample-by-sample marginal value (diminishing returns visible)
- s1: 8 unique defects
- s2: +4 new (CUPS-1, CUPS-3→router, HOME-1, CAR-2) + APPL-2 provisional
- s3: +0 new (but independently confirmed DANC-1 via the dedicated mirror check — which had
  found nothing in s1 — plus re-confirmed CAR-2, CAR-4, OLIV-1, BLOC-1, LONG-13/15)
N=3 appears near the plateau for this model; a 4th sample would likely add little.

## Stochasticity thesis: confirmed
The same check on the same video catches a defect in one sample and misses it in another
(mirror-pose: 0 findings in s1, both DANC-1 mismatches in s3; man-cups pour-conservation:
0 in s1/s3, CUPS-1+CUPS-3 in s2). Union sampling converts this run-to-run variance into
recall. FP accumulation stayed modest: 4 FPs across all 180 calls (steam-asymmetry,
watch-appears, bill-duplicate-near-LONG-10, dialogue-glasses — the last two are the known
trap classes doing their job).

## Cross-sample corroboration produced one EXTRA
"Umbrella held open but no rain: dry ground, no drops, other pedestrians unprotected"
(woman-apple) appeared independently in ALL THREE samples → reclassified from FP to
**EXTRA:umbrella-no-rain**, pending KT adjudication.

## Provisional / needs KT
- **APPL-2 (partial?)**: s2+s3 possession-tracking both independently report the object in
  her hand at 00:08 is no longer the uniform red apple (s3 explicitly notes a "ghosted red
  round shape at its upper edge"). This is the exact moment/region of APPL-2 (apple
  disappears seen from behind). Provisionally counted as a partial APPL-2 observation in the
  +APPL-2 row above; KT should rule. If confirmed, the v1 run's FP'd "fruit morph" finding
  arguably deserves the same reclassification.
- **Near-LONG-10**: s3 count-stability reports the tip bill duplicating (one placed, two
  present at 1:40). Adjacent to LONG-10 (hand-leaves-tip anomaly) but not the described
  error → kept FP per the "not the correct error" rule; flagged for a KT glance.

## The 11 never-found defects: still never found
Across 180 aggressive, on-target routed calls: CUPS-2, DANC-3, HOME-2, LONG-2/5/6/7/8/9/10,
SKAT-1 — zero catches (the bill finding above is the closest approach). Three independent
samples of narrowly-targeted checks failing on all 11 is strong evidence these sit below
this model's perception ceiling, not that the prompts are wrong. For benchmark purposes:
**the benchmark is not saturated by this model, and the headroom is real.**

## Methodology conclusion
Best current recipe for a cheap/free model: v1 core roles (unmodified — no global confound
dampeners) + feature-routed checks × 3 samples, union-scored with standard adjudication
discipline (trap classes still FP'd, cross-sample corroboration can promote to EXTRA).
Score 28 → 33 (+5, +4 unique defects) entirely from architecture + sampling, zero prompt
overfitting to specific clips. The global-confound v2 experiment (score 18) stands as
evidence that modifying always-on prompts is the wrong lever for this model; additive
routing + sampling is the right one.
