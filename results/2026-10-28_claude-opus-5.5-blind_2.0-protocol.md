# Claude Opus 5.5: blind frame-assisted agent run, full 2.0 protocol (2026-10-28)

Model: `claude-opus-5-5` (effort high) via T3 Code delegated tasks. A fresh top-level dispatcher thread
in a scratch folder, with no project memory, handed each of the 482 calls to its own fresh Opus 5.5 task.
Calls were 14 scene inventories, core ×3 (252), and router ×3 (216). The protocol, role prompts, router,
opaque clip IDs (`clip-01`…`clip-14`), frame sampling, and contact sheets are identical to the
2026-10-27 GPT-6 Astra blind run. Only the model and the core sample count (3 vs Astra's 1) differ.
Frozen predictions, receipts, runbook, and scripts are in `RUNS/261028 Opus 5.5 blind run/`; the
standard per-sample runs are `results/2026-10-28_claude-opus-5.5-blind_{core,router}-s{1,2,3}/`.

Like Astra, this is an **agent evaluation on extracted frames**, not a native-video API run. The input
was 4 fps for the 10 s clips and 1 fps plus shot-boundary frames for the 2-minute scene. Audio was
unassessed, so DIAL-1 is unreachable. It is not on the native-video leaderboard.

```bash
R=2026-10-28_claude-opus-5.5-blind
node src/score-union.mjs core-x3=${R}_core-s1,${R}_core-s2,${R}_core-s3 \
  router-x3=${R}_router-s1,${R}_router-s2,${R}_router-s3 \
  full-2.0=${R}_core-s1,${R}_core-s2,${R}_core-s3,${R}_router-s1,${R}_router-s2,${R}_router-s3
```

## Results (recall-first)

| Configuration | Defects found | Detection | FP per sample | Legacy score |
|---|---|---|---|---|
| core s1 / s2 / s3 | 28 / 27 / 32 | 91 / 89 / 101 | 46 / 39 / 40 | 45 / 50 / 61 |
| router s1 / s2 / s3 | 24 / 23 / 27 | 77 / 77 / 87 | 7 / 8 / 13 | 70 / 69 / 74 |
| core ×3 union | 34/50 | 106/147 | 41.7 | — |
| router ×3 union | 29/50 | 92/147 | 9.3 | — |
| **full 2.0 union (6 samples)** | **35/50** | **109/147** | 25.5 | — |
| Astra-equivalent (core s1 + router ×3) | 32/50 | 100/147 | 18.5 | — |

Comparisons:

| System | Single run (defects · detection) | Six-sample union (defects · detection) |
|---|---|---|
| Gemini 4 Argon (native video and audio) | 27/50 · 92/147 | 33/50 · 113/147 |
| GPT-6 Astra (same frames; core ×1 + router ×3) | — | 18/50 · 71/147, with 2 FPs total |

Opus 5.5's six-sample union finds the most defects of any configuration on this benchmark (35/50).
Its detection is 4 points below Argon's because it misses LONG-10 (P0) and APPL-1 (P1).

**Found (35):**
- `_long-scene`: LONG-1, LONG-3, LONG-4, LONG-6, LONG-7, LONG-8, LONG-9, LONG-11, LONG-12, LONG-13, LONG-16
- APPL-2, APPL-3, BLOC-1, CAR-1, CAR-2, CAR-3, CAR-4
- CUPS-1, CUPS-3, CUPS-4, DANC-1, DANC-3, DANC-4, HOME-1, HOME-2, MARB-1
- MIRR-1, MIRR-2, OLIV-1, OLIV-2, OLIV-3, OLIV-4, PHON-1, WATC-1

**First time any model found it:** **DANC-4**, the mirror showing two exit doors where the room has
one (KT-discovered). It was found in 3 of 6 samples: core-s2, router-s1 and router-s3. **LONG-1**
(time of day: the 00:10 close shot shows daylight in the window while it is night outside) had only
been found once before, and Opus found it in 4 of 6 samples. **CAR-2** (garbled plate) had been found
by 2 systems before; Opus found it in all 6 samples.

**Missed (15):**
- `_long-scene`: LONG-2, LONG-5, LONG-10 (P0), LONG-14, LONG-15, LONG-17
- APPL-1 (P1), APPL-4, CAR-5, CUPS-2, CUPS-5, DANC-2, SKAT-1, SKAT-2
- DIAL-1 (audio, not assessed)

Across every run on the benchmark, only **LONG-2, LONG-5 and SKAT-1** have now never been found.

## Observations

1. **On the same frames, Opus 5.5 recalls about twice what Astra did.** Astra's union found 18/50
   (71/147); the Astra-equivalent Opus configuration found 32/50 (100/147). Opus's core layer is far
   noisier, though: about 40 FPs per sample against Astra's 1. The two runs were adjudicated
   differently, which makes some of that gap unreliable. Astra's findings were adjudicated in its own
   audit (`RUNS/261027 GPT6 Astra blind audit/`). Opus's were adjudicated by Claude subagents using
   KT's rules and earlier models' labels, so part of the FP gap may be adjudication style rather
   than model behaviour.
2. **The router is again the precise layer.** It averages 9.3 FPs per sample against 41.7 for core, at
   29 vs 34 defects in the union. Router-s3 alone found 27 defects with 13 FPs.
3. **Frame sampling caps the long scene.** Opus found 11 of 17 `_long-scene` defects. Its misses are
   brief events between the 1 fps samples: the tip handover (LONG-10), the mug disappearing (LONG-14),
   and the kitchen-hatch change (LONG-17). The 10-second clips at 4 fps fared better: every defect in
   olives, marbles, blocks and phone was found, plus all of woman-car except the wiper relocation.
4. **Its FPs cluster in the usual traps.** About half are from the generalist role (55 of 153):
   - the `dialogue` clip (11 of 11 findings);
   - coin inscriptions and palming on man-cups;
   - wardrobe and photo swaps on home-tour;
   - stirring blur on child-marbles;
   - reflection and bill-text claims on `_long-scene`.
5. **Operational:** the run used the Claude subscription, not API credit, and hit the 5-hour usage limit
   four times. It took about 22.5 hours of wall clock, of which about 6 hours was active dispatching.
   Eleven calls were cut off by the limit and retried. 89 timestamps used fractional seconds
   (`MM:SS.ff`) and 9 used `SS:cc` (e.g. `06:75` = 6.75 s). Both were accepted after freezing as a
   logged validator amendment; no prediction was changed.
6. **Blinding:** the dispatcher and every evaluator ran outside the repo, with only the opaque packet
   and instructions forbidding access elsewhere. That rests on instructions, not an OS sandbox, as for
   Astra. The input MP4s had their container metadata stripped, because `home-tour` embeds its
   generation prompt in the file tags ("…the floor plan must remain physically possible"). Astra's
   packet still carried those tags, and its `probe.json` files recorded them.

## Review queue for KT

**Extras: new claims corroborated in ≥2 samples (neutral until you rule; frame-checked by the classifier):**
- `phone-screen-sunpatch-flicker` (6 of 6 samples): the hard-edged sunlit patch on the phone screen jumps
  and blinks on and off between consecutive frames while the phone, hands and lighting stay still. It
  was confirmed at 24 fps around 6.4–7.4 s.
- `skate-floaty-airtime` (6 of 6): the first flat-ground trick hangs in the air for about 1.6–1.8 s at
  near-constant height. The run-up plays at normal speed, so it isn't a slow-motion beat.
- `skate-deck-underside-color` (core ×3): during the first trick the truck side of the deck goes black,
  then wood, then dark. This is the same moment as **SKAT-1** (underside shows only two wheels); you
  may want to merge it into SKAT-1 or reject it.
- `pour-cup-refills-after-empty` (4 of 6): the glass pouring cup is visibly empty from 8.5 to 9.5 s,
  then shows a green olive at 9.75 s. That is the last frame, at the frame edge.
- `steel-bowl-olives-regrow` (router ×3): after the scoop, about 1–2 green olives in the steel bowl
  become about 5 with nothing added. The camera angle shifts at about 6 s.
- `home-tour-cardigan-becomes-crewneck` (core ×3): an open V-neck cardigan becomes a closed crew-neck top
  in one continuous take. This sits near your rejected wardrobe micro-morph class, but the whole
  garment changes.
- `skate-green-face-blob` (core-s1 ×2, core-s2): a green glowing blob sits on the skater's eye and
  cheek at 0.5–1.0 s and moves with his face. It could be a lens flare, since the sun is next to his
  head.
- `truck-exhaust-plumes-opposite-directions` (router-s1, s3): in the opening exterior, the dark plume
  drifts up-left while a pale ground-level cloud drifts right. Weak and low-salience.

**Lenient TP mappings worth a glance:**
- **WATC-1** (core-s1 ×3, core-s3): rings jumping fingers at 4.75–5.5 s. This follows Pro's earlier
  TP for "new ring with a stone appears" at 00:04. It's a stretch for "watch details morph".
- **HOME-1**: 13 of 23 findings are lenient. The main one is the hallway's blue-flower painting
  reappearing on the bedroom side of the doorway. Argon's version was TP and Ox Alpha's was FP; I
  followed Argon.
- **LONG-7 / LONG-4**: geography mismatches on the 00:45 reverse angle went to LONG-7, and the view
  through the windows not matching the establishing shot went to LONG-4. Both follow earlier models'
  labels.
- **LONG-12**: "the carafe level never drops while pouring" (Argon precedent).
- **DANC-1**: the reflected arm trails the real arm by about 0.2 s during the first raise. Earlier
  upper-body mismatch claims were labelled DANC-1.
- **MIRR-2**: the razor vanishes from the real hand at 9 s while the mirror still shows it.
- **CUPS-3**: the cups re-forming from a diamond into a straight row (Argon precedent).

**FPs you might overturn:** seven router `text-stability` claims of pseudo-lettering on the coins
(man-cups). They're FP for now because the lettering is tiny and soft. If coin text should count like
the confirmed garbled diner-sign class, they would become extras.

Full per-finding labels, the classifier packets, and their notes are in
`RUNS/261028 Opus 5.5 blind run/adjudication-detail.json` and `source/adjudication-packets/`.
