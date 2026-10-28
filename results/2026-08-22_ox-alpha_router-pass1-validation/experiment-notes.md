# Round 3: two-pass deterministic router — validation run (Ox Alpha)

Scratch experiment — NOT part of the public leaderboard pipeline.

## Architecture tested
Pass 1: one perceptual feature-checklist call per video (src/feature-router.mjs FEATURE_PROMPT).
Deterministic rule table routes 10 conditional checks; pass 2 runs only the routed checks.
Additive layer on top of the always-on v1 core roles (which were NOT rerun here — union scoring
uses the existing v1 baseline run 2026-08-21_ox-alpha).

## Pass-1 checklist accuracy (14/14 videos)
- Field accuracy 67/73 (92%) vs hand-built expected-features.json.
- **Zero needed checks missed** — every check required to catch a clip's known defect classes
  fired on every clip. All 6 field errors were harmless or over-triggering.
- Efficiency: mean ~4.3/10 checks fired per video (60 pass-2 calls total vs 140 if always-on).

## Pass-2 results (58/60 calls returned, 2 lost to persistent provider errors)
18 findings; 17 map to confirmed TP classes, 1 FP → **~94% precision** (v1 baseline run: 70%).

| Check | TP-class findings | Notes |
|---|---|---|
| vehicle-identity (_long-scene) | LONG-13 @ conf 0.95 | Exactly as designed |
| layout-connectivity (_long-scene) | LONG-13, LONG-4 | |
| cross-cut-placement (_long-scene) | LONG-13 | |
| environment-response (_long-scene) | LONG-13 (as exhaust/idle continuity) | off-domain drift |
| pour-conservation (_long-scene) | LONG-13 | off-domain drift (a pour check reporting a truck) |
| layout-connectivity (dancer-mirror) | DANC-1 class | off-domain (mirror finding from layout check) |
| pour-conservation (pouring-olives) | OLIV-1, OLIV-4 | |
| cross-cut-placement (pouring-olives) | **OLIV-2** | **NEW vs v1 ox-alpha run** (+1 defect, P4) |
| possession-tracking (weird-blocks) | BLOC-1 ×4 | |
| environment-response (woman-car) | CAR-4 ×2 | |
| environment-response (woman-apple) | 1 FP (umbrella-but-no-rain; single-run, not in GT) | |

## What worked
- Pass-1 perceptual triage is reliable (the architecture's core bet held).
- Precision of routed checks is excellent; the woman-car mirror false-trigger was neutralized by
  the mirror check's self-gate (0 findings) — defense-in-depth worked.
- One genuinely new defect vs the v1 core run (OLIV-2).

## What didn't
- In-domain stochastic misses persist: the dedicated mirror checks found nothing on either
  mirror clip this run (DANC-1 was instead caught off-domain; MIRR-1/2 missed entirely);
  text-stability missed PHON-1 (phone garble); count-stability missed CUPS-3 and MARB-1.
  The narrow prompts do not overcome the model's perception ceiling — catches remain
  run-to-run stochastic on this flaky model.
- audio-visual-claims found nothing on `dialogue` (DIAL-1 red-door). Consistent with the
  suspicion that the provider drops the audio track — needs a direct probe before investing
  further in audio checks.
- Off-domain drift: 3 of 17 TP findings came from checks reporting outside their stated domain.
  Harmless here (still TPs) but shows scope boundaries are advisory to this model.

## Union score (v1 core run + routed checks, informal)
v1: 15/47 defects, detection 39, 11 FP → score 28.
Union: 16/47 defects (+OLIV-2), detection 40, 12 FP → score 28 (wash on score, but coverage +1
and the added layer is high-precision; on a less FP-prone core this layering would be net-positive).

## Verdict
Architecture validated; single-run gains modest. The obvious next lever is exploiting the
stochasticity: routed checks are cheap and targeted, so N repeated runs of the same check
(union of catches) should lift recall materially — e.g. mirror checks caught DANC-1 in the
exp-r1 round but not this one; two more repeats would likely recover it and MIRR-1/2.
