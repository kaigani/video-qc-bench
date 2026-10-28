# Reasoning-mode run (Ox Alpha) — scratch notes

Not part of the public leaderboard. `--reasoning` enabled, v1 core roles, single sample.

## Result vs non-reasoning v1 baseline
- Reasoning: 14 unique defects, detection 38, FP 14, **score 24**
- v1 (non-reasoning): 15 unique defects, detection 39, FP 11, **score 28**
- Reasoning alone is not an upgrade — comparable raw detection, but more inventive/less
  disciplined: several single-occurrence claims with no ground-truth match (vanishing cloth,
  bill fanning into a stack, ceiling panels going dark, man staring at camera, background
  chair artifacts, wheel-color drift).

## Methodology note — IMPORTANT
Reasoning and non-reasoning mode are NOT interchangeable samples of the same distribution —
they surface **different defect classes**, not just noisier/cleaner versions of the same list.
Reasoning found 5 defects v1 never did (LONG-3, MARB-1, OLIV-2, OLIV-3, CAR-2) while *missing*
6 things v1 caught (LONG-15, DANC-2, MIRR-2, OLIV-4, PHON-1, WATC-1). This isn't just the usual
run-to-run stochasticity we've documented elsewhere (same prompt, same mode, different sample)
— switching modes changes what the model attends to. Implication: when comparing model
detection rates or deciding "has this model found defect X," always record and compare within
the same reasoning setting; do not treat a reasoning-mode run and a non-reasoning run of the
same model as equivalent/poolable samples without flagging the mode. For union-sampling
strategies (like the 3x router ensemble), reasoning mode is a genuinely distinct methodology to
add to the union, not a substitute for more non-reasoning samples.

## Operational
- First-pass success rate ~86% (72/84), much higher than non-reasoning's typical 20-35%.
- Latency ~11 min/call (up to 741s), completion tokens ~10-26k vs ~1-3k non-reasoning.
- Empty-response failures resolve fast (11-19s) — cheap to retry despite slow successes.
