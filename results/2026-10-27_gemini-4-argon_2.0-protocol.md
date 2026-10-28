# Gemini 4 Argon — full 2.0 protocol (2026-10-27)

Model: `google/gemini-4-argon` via OpenRouter, pinned to **Google AI Studio's flex tier**
(`--provider google-ai-studio/flex`: half price, $1 / $5 per 1M input/output tokens, normal sync
API) with `--reasoning --reasoning-effort high`. Protocol: v1 harness × 3 samples + feature router
× 3 samples (pass-1 routing shared from router-s1). 410 calls, all succeeded on the first pass.
Total cost **$5.29** (v1 runs $1.05 / $1.02 / $1.08; router runs $0.71 / $0.70 / $0.64 + $0.10 pass-1).
Scored against the 50-defect ground truth (including the Astra-surfaced LONG-16/17 and the LONG-8
return-crossing extension, approved by KT 2026-10-27).

Runs: `2026-10-27_gemini-4-argon` (v1 s1, **the leaderboard entry**), `_v1-s2`, `_v1-s3`,
`_router-s1`, `_router-s2`, `_router-s3`. Every finding is classified in each run's
`classifications.json`; the leaderboard run is also in `ground-truth/matches.json` as `argon`.

```bash
R=2026-10-27_gemini-4-argon
node src/score-union.mjs v1-N3=$R,${R}_v1-s2,${R}_v1-s3 router-x3=${R}_router-s1,${R}_router-s2,${R}_router-s3 \
  full-2.0=$R,${R}_v1-s2,${R}_v1-s3,${R}_router-s1,${R}_router-s2,${R}_router-s3
```

## Results (recall-first)

| Configuration | Defects found | Detection | FP per sample | Legacy score |
|---|---|---|---|---|
| v1 s1 (**leaderboard entry**) | 27/50 | 92/147 | 26 | 66 |
| v1 s2 / s3 | 24 / 25 | 84 / 88 | 24 / 26 | 60 / 62 |
| router s1 / s2 / s3 | 22 / 22 / 23 | 86 / 77 / 81 | 11 / 9 / 5 | 75 / 68 / 76 |
| v1 ×3 union | 29/50 | 98/147 | 25.3 | — |
| router ×3 union | 27/50 | 99/147 | 8.3 | — |
| **full 2.0 union (6 samples)** | **33/50** | **113/147** | 16.8 | — |

Previous bests: single leaderboard run, Gemini Pro 24/50 · 70/147; any union, Gemini Pro's 09-04
v1+router union at 30/48. GPT-6 Astra's blind frame-assisted 2.0 run: 18/50 · 71/147.

**Found (33):** APPL-1, APPL-2, APPL-3, BLOC-1, CAR-1, CAR-4, CUPS-1, CUPS-3, CUPS-4, DANC-1, DIAL-1,
HOME-1, HOME-2, LONG-3, LONG-6, LONG-7, LONG-8, LONG-9, LONG-10, LONG-11, LONG-12, LONG-13, LONG-14,
LONG-15, LONG-16, MARB-1, MIRR-1, MIRR-2, OLIV-1, OLIV-2, OLIV-3, OLIV-4, PHON-1.

**First time any leaderboard system found them:** LONG-6 (P0, man clips through the counter; the
claim even notes the waitress is missing), LONG-10 (P0, tip hands from opposite sides), LONG-7 (P1),
LONG-9 (P1, seating flips on the reverse angle), HOME-2 (P2, chairs under the bed; 3/3 router samples),
and LONG-16 (newly confirmed mug merge). Every P0 in the ground truth is now found by some sample.

**Still missed (17):** LONG-1, LONG-2, LONG-4, LONG-5, LONG-17, DANC-2, DANC-3, DANC-4, CUPS-2,
CUPS-5, SKAT-1, SKAT-2, WATC-1, CAR-2, CAR-3, CAR-5, APPL-4. These are mostly small-detail or
morph defects (tattoo, plate text, wipers, watch details), not scene-logic ones.

## Observations

1. **Step change in scene-level reasoning.** The `_long-scene` defects that defeated every earlier
   model (counter clipping, seat swaps on reverse shots, the duplicate waitress, the tip-hand
   handover, the walk through the counter) were found repeatedly and with precise shot-by-shot
   reasoning, usually in 4–6 of 6 samples. That's the clip KT kept as the unscaffolded capability test.
2. **The router layer is again the precise one:** 8.3 FP per sample vs 25.3 for v1, with
   near-identical union recall (27 vs 29 defects). Router-s3 alone: 23 defects with 5 FPs.
3. **Recall saturates fast.** Each sample finds 22–27 defects; the six-sample union adds only 6–11 on
   top of any single sample. Unlike weaker models, Argon's single run already captures most of what
   it can see.
4. **Its FPs concentrate in known trap classes:** cut/cutaway misreads in `_long-scene` (empty-counter
   beats, teleports across cuts), bill-morph and garbled-text claims, the `dialogue` clip's
   background, skateboard blur, and coin-inflation at man-cups. Under the recall-first view these are
   cheap to dismiss.
5. **Operational:** `reasoning: {enabled: true}` alone produced 0 reasoning tokens on Argon;
   `reasoning_effort: high` engaged ~1.4K reasoning tokens per call. OpenRouter's `:batch` variant can't
   take base64 video (batch API needs public YouTube URLs), so flex is the only half-price route.
   Argon's introductory pricing reportedly doubles on 2026-12-01.

## Review queue for KT

**Extras: new claims corroborated across ≥2 separate runs (neutral until you rule):**
- `dancer-arm-flip-0002`: the in-room dancer snaps into a horizontally mirrored pose around
  00:01.6–00:02.4 and snaps back. **Frame-verified by Claude:** the raised arm jumps from her right
  shoulder to her left between 1.625 s and 1.875 s. 5 of 6 samples.
- `back-wall-doorway-vs-window` (`_long-scene`): medium shots show a door frame and poster left of the
  pass-through; wide shots of the same wall show booths and a window with an OPEN sign. 4 of 6 samples.
- `apple-frozen-background` (woman-apple): right-side pedestrians and the stall stay frozen like a still
  plate while foreground walkers move; a vendor vanishes, and a passer-by is erased at the plate edge.
  All 3 v1 samples. (Note: you previously rejected background-pedestrian claims on the phone clip.)
- `home-tour-phantom-hand`: a distorted flesh-coloured hand or forearm flickers beside the woman's hip at ~00:08.
  2 of 3 v1 samples.
- `parked-car-flickers-in-window` (`_long-scene`): a light vehicle appears and disappears outside the
  far-left window between the wide shots. Router s2 and s3.
- `mirror-reflection-face-morph` (man-in-mirror): the reflection's face morphs as he tilts his head at
  00:02–00:03. v1 s2 and s3.
- `mirror-brush-clips-face` (man-in-mirror): the tool clips into the lip or chin. v1 s2 and s3.
  (Close to the clipping/micro-morph classes you usually reject.)
- `phone-top-vanishes` (phone): the top of the phone vanishes as it tilts at 00:09. v1 s2 and s3.

**Lenient TP mappings worth a glance:**
- **LONG-12**: claims are "carafe upright and its level never drops while it pours" rather than the
  ground truth's "top half transparent, black mass at bottom". Same carafe, different symptom.
- **OLIV-2** (v1-s2 only): "more olives accumulate than visibly fall", which is the *opposite* direction to
  your "poured amount exceeds what arrives". Mapped as the same conservation mismatch.
- **LONG-14**: "second mug vanishes at 01:52", mapped like Pro's earlier "mug disappears at 01:50".
- **LONG-7** (router-s3): inferred from the barstool count changing around the man.
- **DANC-1** (router mirror checks): these describe the 00:02 arm flip as a reflection mismatch. If you
  accept the arm flip as its own defect, these may belong there instead.
- **CUPS-3**: includes "the coins filling the centre cup vanish at 00:03 without being touched".
  Nemotron 3.5's "coins inside cups gone after shuffling" was kept FP as a magic-trick move.
