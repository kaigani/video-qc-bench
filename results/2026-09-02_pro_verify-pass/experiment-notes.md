# Verify-pass experiment: same-model post-hoc finding verification (Gemini Pro)

Scratch experiment — NOT part of the public leaderboard. Tests roles-v2 plan item 7
("optional verify pass") as a harness feature, using the highest-recall/lowest-precision
v1 system (Gemini Pro, 24/47 defects, 48 FPs, score 22) as the best-case beneficiary.

## Method
`src/verify-findings.mjs`: one call per clip (14 calls, $0.43 total). Each call replays the
full video to Pro (reasoning on, matching its v1 run) together with all findings Pro's v1
run reported on that clip, presented neutrally (no TP/FP labels). The prompt instructs an
adversarial re-check: try to explain each finding away as cut / blur / out-of-frame /
reflection / lens warp / occlusion / time-skip / performance; CONFIRM only if it survives.
Verdicts joined against the frozen classifications in `ground-truth/matches.json`.
All 14 calls parsed OK; 114/114 findings received verdicts.

## Result: FALSIFIED — the model cannot tell its own true findings from its false ones

| | CONFIRM | REJECT | rejection rate |
|---|---|---|---|
| TP findings (66) | 41 | **25** | **38%** |
| FP findings (48) | **34** | 14 | 29% |

The rejection rate on REAL findings is *higher* than on false positives — the filter is
worse than useless, it is mildly anti-correlated with truth. Score impact:

| Configuration | Defects | Detection | FP | Score |
|---|---|---|---|---|
| Pro v1 (all findings) | 24/47 | 70 | 48 | 22 |
| Pro v1 filtered to CONFIRM-only | 16/47 | 57 | 34 | 23 |

+1 score, at the cost of losing 8 real defects (DANC-1, DANC-2, CUPS-5, MIRR-1, MIRR-2,
OLIV-2, SKAT-2, CAR-4). Both mirror-clip defect sets are wiped out: the verifier explains
real mirror/continuity defects away as "jump cuts" — the innocent-explanation menu gives it
a socially acceptable reason to un-see true anomalies, exactly the failure mode of the
global confound checklist (v2r1-full, score 28→18). Skeptical priming suppresses real
recall wherever recall was hard-won.

No confidence rescue: verdict confidences do not separate the confusion cells at all
(mean 0.94–0.98 everywhere, min 0.8) — consistent with Pro's known emit-0.95-on-everything
calibration. No threshold recovers the filter.

## Verdict for the v2 harness
- Same-model self-verification is OUT as a harness feature. Together with the confound
  checklist falsification, the pattern is now clear: **any mechanism that asks the model to
  doubt findings destroys real recall on exactly the findings that were hardest to get.**
- Precision improvements must come from mechanisms that don't re-litigate individual
  findings with the same eyes: deterministic routing (validated), cross-sample corroboration
  (validated — promotes/demotes based on independent reproducibility, not one model's
  second opinion), and trap-class auto-FP rules in adjudication.
- Untested alternative if verification is revisited: a DIFFERENT high-precision model as
  verifier (e.g. Seed 2.1 Turbo, 95% precision in v1) — cross-model rather than self
  verification. Not run in this experiment.
