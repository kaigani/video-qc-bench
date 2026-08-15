# Benchmark scores vs human baseline

Ground truth: 36 defects from `review-human-baseline.md` (weights P0=8, P1=5, P2=3, P3=2, P4=1; max detection = 116). FP penalty = 2 per false-positive finding. EXTRA findings (plausible, not in baseline) are neutral and listed at the bottom for adjudication.

## Leaderboard

| Model | Score | Detection | Defects found | FP findings | TP findings | EXTRA | Precision* |
|---|---|---|---|---|---|---|---|
| flash | **27** | 27/116 | 7/36 | 0 | 16 | 5 | 100% |
| qwen | **30** | 40/116 | 10/36 | 5 | 28 | 12 | 89% |
| pro | **7** | 69/116 | 20/36 | 31 | 60 | 23 | 73% |
| gemma | **22** | 24/116 | 8/36 | 1 | 25 | 8 | 97% |
| pegasus | **1** | 1/116 | 1/36 | 0 | 1 | 1 | 100% |

*Precision counts TP+EXTRA findings as non-noise.

## Defect coverage (which model found which baseline defect)

| Defect | Prio | flash | qwen | pro | gemma | pegasus | Description |
|---|---|---|---|---|---|---|---|
| LONG-1 | P2 | · | ✓ | · | · | · | Time of day changes after the first cut from dark to light |
| LONG-2 | P3 | · | · | · | · | · | Shifts back to earlier time of day as the man enters |
| LONG-3 | P3 | · | ✓ | · | · | · | Man enters from what seems like the kitchen of the diner |
| LONG-4 | P4 | · | · | ✓ | · | · | 'Open' sign / interior layout doesn't match the exterior establishing shot |
| LONG-5 | P4 | · | · | · | · | · | Man seems to bring his own cup for the coffee |
| LONG-6 | P0 | · | · | · | · | · | Man sitting clipping through the counter as he faces camera; woman is missing |
| LONG-7 | P1 | · | · | · | · | · | Man shifts to opposite end of the counter |
| LONG-8 | P2 | · | · | · | · | · | Woman crosses through the counter to sit next to him |
| LONG-9 | P1 | · | · | · | · | · | Woman changes to the opposite side of him on the reverse shot |
| LONG-10 | P0 | · | · | ✓ | · | · | Man's hand leaves tip and another of his hands takes it |
| LONG-11 | P0 | ✓ | ✓ | ✓ | · | · | Two instances of the same woman in the diner |
| MARB-1 | P2 | · | ✓ | ✓ | ✓ | · | Red ball duplicates when picked up (2 red -> 3 red); heavy morphing while stirring, up to  |
| DANC-1 | P2 | · | · | ✓ | · | · | Mirrored pose does not match the in-room pose, especially foot position |
| DANC-2 | P3 | · | · | ✓ | · | · | Shoulder tattoo morphs as she raises her arm |
| DANC-3 | P1 | · | · | ✓ | · | · | At 00:05 reflection shows hand in front, in-room shows hand behind her back |
| HOME-1 | P1 | ✓ | ✓ | ✓ | ✓ | · | Implausible interior layout: walking the length of the kitchen through a bedroom reveals a |
| HOME-2 | P2 | · | · | · | · | · | Bedroom has two chairs tucked under the foot of the bed as if the bed is a table |
| CUPS-1 | P3 | · | · | ✓ | ✓ | · | Coin placed into a cup moves to the outside of the cup |
| CUPS-2 | P2 | · | · | · | · | · | Other hand places a coin on the table and the coin changes into a cup (appearance of 5 cup |
| CUPS-3 | P2 | · | ✓ | ✓ | · | · | Shot starts with 4 cups, implies 5, ends with 3 visible; gold coins in center of table dis |
| MIRR-1 | P4 | · | · | ✓ | · | · | Mirror reflection of hair-brushing does not match in-room action (0:04 in-room hand over e |
| MIRR-2 | P4 | ✓ | · | ✓ | · | · | The brush object itself morphs and changes |
| PHON-1 | P3 | ✓ | · | ✓ | · | · | Screen contains garbled text and hand gestures have no effect on the screen UI |
| OLIV-1 | P4 | ✓ | · | ✓ | ✓ | · | Dark purple olives not visible at start (could feasibly be underneath the green) |
| OLIV-2 | P4 | · | · | ✓ | · | · | Amount poured from first container exceeds what arrives in the jar |
| OLIV-3 | P3 | · | · | · | · | · | First container (bowl) becomes a small bottle when set down |
| OLIV-4 | P3 | · | · | · | · | · | Second batch of olives gathers into his hand unnaturally and a container appears around th |
| SKAT-1 | P2 | · | · | · | · | · | First jump reveals board underside with only two wheels, unnaturally placed |
| SKAT-2 | P4 | · | · | ✓ | · | · | Feet morph together and switch position on the turn |
| WATC-1 | P4 | · | · | ✓ | ✓ | ✓ | Small details on the watch morph slightly; winding/spinning action seems unusual |
| BLOC-1 | P0 | ✓ | ✓ | ✓ | ✓ | · | Two green blocks become 8 multicolored blocks |
| APPL-1 | P1 | · | ✓ | ✓ | · | · | Apple held unnaturally: closed hand plus clapping hand, nothing holding it up |
| APPL-2 | P3 | ✓ | ✓ | · | ✓ | · | Apple disappears after she passes in front of the camera (seen from behind) |
| CAR-1 | P0 | · | · | ✓ | · | · | Woman's torso pokes out of the hood in front of the windshield (primary defect) |
| CAR-2 | P4 | · | ✓ | · | · | · | License plate number is garbled |
| CAR-3 | P3 | · | · | · | ✓ | · | Road topology nonsensical: poles in the middle of the road, lane lines morph |

**Missed by every model (11):** LONG-2 (P3), LONG-5 (P4), LONG-6 (P0), LONG-7 (P1), LONG-8 (P2), LONG-9 (P1), HOME-2 (P2), CUPS-2 (P2), OLIV-3 (P3), OLIV-4 (P3), SKAT-1 (P2)

## Role contribution (TP findings / total findings per role)

| Role | flash | qwen | pro | gemma | pegasus |
|---|---|---|---|---|---|
| baseline-generalist | 4tp/0fp/8 | 13tp/4fp/25 | 10tp/10fp/22 | 12tp/1fp/19 | 0tp/0fp/1 |
| character-continuity | 1tp/0fp/1 | 1tp/0fp/3 | 4tp/7fp/15 | 0tp/0fp/2 | — |
| object-persistence-state | 7tp/0fp/7 | 9tp/1fp/12 | 20tp/5fp/28 | 5tp/0fp/5 | 1tp/0fp/1 |
| contact-interaction-kinematics | 1tp/0fp/1 | 1tp/0fp/1 | 7tp/4fp/16 | 4tp/0fp/4 | — |
| spatial-topology-occlusion | 2tp/0fp/3 | 2tp/0fp/2 | 8tp/5fp/18 | 1tp/0fp/1 | — |
| causal-temporal-sequence | 1tp/0fp/1 | 2tp/0fp/2 | 11tp/0fp/15 | 3tp/0fp/3 | — |

## Specialist vs generalist detection (per model: defects found only by specialists / only by baseline / by both)

- **flash**: specialists-only [MIRR-2, BLOC-1, APPL-2], baseline-only [PHON-1], both [LONG-11, HOME-1, OLIV-1]
- **qwen**: specialists-only [HOME-1, CUPS-3], baseline-only [LONG-3], both [LONG-1, LONG-11, MARB-1, BLOC-1, APPL-1, APPL-2, CAR-2]
- **pro**: specialists-only [LONG-11, LONG-10, LONG-4, DANC-1, DANC-2, HOME-1, CUPS-1, CUPS-3, PHON-1, OLIV-2, SKAT-2], baseline-only [DANC-3], both [MARB-1, MIRR-2, MIRR-1, OLIV-1, WATC-1, BLOC-1, APPL-1, CAR-1]
- **gemma**: specialists-only [—], baseline-only [MARB-1, CUPS-1, CAR-3], both [HOME-1, OLIV-1, WATC-1, BLOC-1, APPL-2]
- **pegasus**: specialists-only [WATC-1], baseline-only [—], both [—]

## False positives (penalized findings)

- **flash**: none
- **qwen** (5):
  - dancer-mirror / baseline-generalist @00:01: At 0:00 the floor at the base of the mirror (left of the reflected dancer) is empty, but from 0:01 onward a white disposable cup s
  - dialogue / object-persistence-state @00:09: In the frontal views (00:00-00:07) the coat hanging on the hook is uniformly dark navy with no markings on any edge. At 00:09, the
  - man-cups / baseline-generalist @00:06: Once the man's upper body is visible (00:05-00:09) he wears both a black bow tie at the collar and a red necktie hanging down simu
  - woman-apple / baseline-generalist @00:07: A thin white horizontal spike protrudes from the bridge of the woman's nose at 00:07, an anatomically impossible artifact lasting 
  - woman-apple / baseline-generalist @00:08: The passing man's glasses are warped and melt into his face; the frame and temple do not connect to his ear, appearing as a smeare
- **pro** (31):
  - _long-scene / baseline-generalist @00:27: Coffee pours out of the glass carafe, but the top half of the carafe is completely transparent and empty, while a solid black mass
  - _long-scene / contact-interaction-kinematics @01:50: The woman reaches for the white mug on the counter, but her fingers form a loose shape next to it rather than wrapping around the 
  - _long-scene / object-persistence-state @01:50: The mug was left on the counter next to the money. In the wide shot at 01:50, the counter in front of the man's seat is bare and t
  - _long-scene / object-persistence-state @01:50: The man's plate of food was on the counter in front of him. At 01:50, the plate is no longer on the counter, having vanished witho
  - child-marbles / spatial-topology-occlusion @00:00: In the initial shot, the background visible beyond the paving stones is a flat edge of dirt or grass. After the cut to a wider ang
  - dialogue / baseline-generalist @00:07: In the initial shot, the blue shirt is hanging on the left side of the room, while the framed picture is on the right side. When t
  - dialogue / baseline-generalist @00:07: A brass intercom panel suddenly appears on the wall to the left of the door when the camera angle changes, which was not visible i
  - dialogue / object-persistence-state @00:07: In the first shot, the blue jacket is hanging on a hook to the left of the wooden doors. After the camera cut, the jacket is sudde
  - dialogue / object-persistence-state @00:07: The small brass plate that was on the wall to the left of the framed picture in the first shot vanishes completely after the cut, 
  - dialogue / spatial-topology-occlusion @00:07: Upon the camera cut when the man turns, the entire geometry of the room changes. The blue garment (previously on the viewer's left
  - home-tour / baseline-generalist @00:01: The image within the framed picture on the right wall shifts and changes shape, appearing to move, as the woman's shadow passes ov
  - home-tour / baseline-generalist @00:08: As the woman walks back toward the kitchen, the framed picture visible through the doorway morphs significantly; the image becomes
  - home-tour / character-continuity @00:02: A large blue dangle earring is visible on her left ear when she turns her head, which was not present in the earlier profile view.
  - home-tour / character-continuity @00:03: The dress suddenly features gathered, slightly puffed seams on the shoulders, and her hair appears noticeably curlier and shorter.
  - home-tour / character-continuity @00:05: The gathered seams on the dress shoulders disappear between cuts, reverting to smooth shoulders.
  - home-tour / character-continuity @00:06: A distinct V-shaped seam or yoke appears on the upper back of the dress.
  - home-tour / character-continuity @00:08: The seam detail on the upper back of the dress changes from V-shaped to a straight horizontal line.
  - man-cups / baseline-generalist @00:00: The hand holding the coin on the left side of the screen clearly has at least six fingers, with multiple thumb-like digits visible
  - man-cups / spatial-topology-occlusion @00:02: The center of the tablecloth changes from a light green circular pattern to a solid red surface as the camera pulls back.
  - phone / baseline-generalist @00:06: An extra, disconnected thumb suddenly appears on the lower left side of the phone screen and then slides down out of frame.
  - phone / character-continuity @00:00: The background person transitions from being midway down the stairs to several feet away on the flat pavement in a fraction of a s
  - phone / contact-interaction-kinematics @00:07: As the right thumb moves to tap the bottom right portion of the screen, the thumb appears to clip through the solid black edge/bez
  - pouring-olives / character-continuity @00:03: A watch with a light blue band suddenly appears on the person's left wrist as they reach towards the bowls on the right, whereas t
  - pouring-olives / contact-interaction-kinematics @00:01: As the olives settle at the bottom of the large jar, they fail to behave as solid rigid bodies, visibly clipping into and merging 
  - skateboarder / baseline-generalist @00:01: The skateboarder's left shoe changes from red to black/dark grey while he is mid-air doing the first trick, and then reverts to re
  - skateboarder / contact-interaction-kinematics @00:02: As the skateboard completes its rotation during the flip trick, the nose of the board passes directly through the heel area of the
  - woman-apple / spatial-topology-occlusion @00:03: The distinct group of people in the background right, including a man in a green shirt and a woman in a red shirt, dissolve and va
  - woman-apple / spatial-topology-occlusion @00:05: As the camera moves along the path, the physical architecture of the stalls on the left morphs from tiered structural displays to 
  - woman-car / baseline-generalist @00:03: The fingers on the woman's visible hand, resting on her arm, are deformed and merged together into an unnatural, blob-like shape.
  - woman-car / baseline-generalist @00:02: The car's antenna vanishes, and the hood ornament morphs in shape and shifts position on the hood as the camera pans.
  - woman-car / object-persistence-state @00:02: The windshield wiper on the right side of the car spontaneously relocates its base and flips its direction. Initially, the base is
- **gemma** (1):
  - dialogue / baseline-generalist @00:01: The man's facial expressions jump abruptly and discontinuously between talking, shouting, and a smug smile without smooth transiti
- **pegasus**: none

## EXTRA findings awaiting human adjudication (plausible defects not in the baseline)

If confirmed, these should be added to ground-truth.json and rescored; if rejected, reclassify as FP in matches.json.

- **truck-swap** (flash×1, qwen×2, pro×1, gemma×1, pegasus×1): White semi at open becomes green box truck at departure (flash, qwen x2, pro, gemma, pegasus)
- **truck-reflection** (flash×1, pro×1): Waitress reflection wrongly rendered on truck trailer side (flash, pro)
- **meal-before-served** (qwen×1, gemma×1): Man has plated meal at night before waitress serves it in the morning (qwen, gemma)
- **garbled-banknote** (qwen×1): Close-up $100 bill printed text is AI-gibberish (qwen only; matches garbled-text class human validated as CAR-2)
- **empty-counter** (qwen×2): Counter cutaways empty while characters were seated on both sides of the cut (qwen x2)
- **third-hand** (qwen×1, pro×1): Extra/third hand appears at the cups table (qwen, pro)
- **coin-appearance** (qwen×2, gemma×1): Coin/token changes gold->silver and coins shift on the mat (qwen x2, gemma)
- **cup-arrangement** (pro×2): Cups snap from triangle to straight row without manipulation (pro x2)
- **boomerang-loop** (pro×1): man-in-mirror motion is a looped few frames played forward/back (pro; consistent with hand-teleport cluster)
- **audio-desync** (pro×1): Scratching sound doesn't match visible strokes (pro; audio claim, easy for human to verify)
- **hand-teleport** (pro×2, gemma×4): Grooming hand/tool teleports cheek->head->cheek instantly (pro x2, gemma x4)
- **hand-jumpcuts** (pro×3): Child's hands teleport across cuts around the bowl (pro x3)
- **red-bag-vanish** (flash×1, pro×2): Background pedestrian's red bag vanishes from their hand (flash, pro x2)
- **rim-clipping** (pro×4): Poured olives render in front of receiving jar's near rim, wrong depth order (pro x4)
- **board-vanish** (pro×2): Skateboard dissolves under rider at landing (pro x2)
- **background-morph** (pro×2): Skatepark trees/light poles morph and vanish between tricks (pro x2)
- **fruit-color** (flash×1, qwen×1): Market fruit turns unnatural cyan/teal (flash, qwen)
- **garbled-sign** (qwen×1): Market sign shows garbled glyphs (qwen; garbled-text class)
- **driverless-motion** (flash×1, qwen×1): Car moves at speed with the only occupant leaning out the window, nobody driving (flash, qwen)
- **wind-inconsistency** (pro×1, gemma×1): Wind blows hair violently but vegetation/antenna unaffected (gemma, pro)
