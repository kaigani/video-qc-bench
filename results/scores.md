# Benchmark scores vs human baseline

Ground truth: 45 defects from `review-human-baseline.md` (weights P0=8, P1=5, P2=3, P3=2, P4=1; max detection = 136). FP penalty = 1 per false-positive finding. EXTRA findings (plausible, not in baseline) are neutral and listed at the bottom for adjudication.

## Leaderboard

| Model | Score | Detection | Defects found | FP findings | TP findings | EXTRA | Precision* |
|---|---|---|---|---|---|---|---|
| flash | **31** | 34/136 | 9/45 | 3 | 18 | 0 | 86% |
| qwen | **41** | 52/136 | 15/45 | 11 | 34 | 0 | 76% |
| pro | **20** | 69/136 | 23/45 | 49 | 65 | 0 | 57% |
| gemma | **27** | 33/136 | 11/45 | 6 | 28 | 0 | 82% |
| pegasus | **6** | 6/136 | 2/45 | 0 | 2 | 0 | 100% |

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
| LONG-10 | P0 | · | · | · | · | · | Man's hand leaves tip and another of his hands takes it |
| LONG-11 | P0 | ✓ | ✓ | ✓ | · | · | Two instances of the same woman in the diner |
| LONG-12 | P3 | · | · | ✓ | · | · | Coffee pours from a carafe whose top half is transparent/empty; solid black liquid mass at |
| LONG-13 | P1 | ✓ | ✓ | ✓ | ✓ | ✓ | Truck outside changes from white semi (00:00) to dark green box truck at departure (KT-con |
| LONG-14 | P3 | · | · | ✓ | · | · | Man's mug has moved position on the counter without visible cause (KT-confirmed from model |
| MARB-1 | P2 | · | ✓ | ✓ | ✓ | · | Red ball duplicates when picked up (2 red -> 3 red); heavy morphing while stirring, up to  |
| DANC-1 | P2 | · | · | ✓ | · | · | Mirrored pose does not match the in-room pose, especially foot position |
| DANC-2 | P3 | · | · | ✓ | · | · | Shoulder tattoo morphs as she raises her arm |
| DANC-3 | P1 | · | · | · | · | · | At 00:05 reflection shows hand in front, in-room shows hand behind her back |
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
| LONG-15 | P3 | · | ✓ | · | ✓ | · | Man has the plated meal at night (00:33-00:44) before the waitress serves it at dawn (01:1 |
| CUPS-4 | P3 | · | ✓ | · | · | · | Magician wears a black bow tie and a red necktie simultaneously (KT-confirmed 2026-08-14;  |
| CUPS-5 | P3 | · | · | ✓ | · | · | Right hand shows 6 fingers as the camera rotates around it - 5 fingers with no thumb in vi |
| APPL-3 | P3 | ✓ | ✓ | · | · | · | Crates of unnatural teal/cyan fruit at the market stalls (KT-confirmed 2026-08-14; P3 assi |
| APPL-4 | P4 | · | ✓ | · | · | · | Top-left market sign shows garbled glyphs; KT: very low priority, difficult to see (KT-con |
| CAR-4 | P3 | · | · | ✓ | ✓ | · | Hair streams violently in wind while vegetation and antenna are unaffected (KT-confirmed 2 |

**Missed by every model (13):** LONG-2 (P3), LONG-5 (P4), LONG-6 (P0), LONG-7 (P1), LONG-8 (P2), LONG-9 (P1), LONG-10 (P0), DANC-3 (P1), HOME-2 (P2), CUPS-2 (P2), OLIV-3 (P3), OLIV-4 (P3), SKAT-1 (P2)

## Role contribution (TP findings / total findings per role)

| Role | flash | qwen | pro | gemma | pegasus |
|---|---|---|---|---|---|
| baseline-generalist | 6tp/2fp/8 | 18tp/7fp/25 | 12tp/10fp/22 | 15tp/4fp/19 | 1tp/0fp/1 |
| character-continuity | 1tp/0fp/1 | 1tp/2fp/3 | 4tp/11fp/15 | 0tp/2fp/2 | — |
| object-persistence-state | 7tp/0fp/7 | 10tp/2fp/12 | 21tp/7fp/28 | 5tp/0fp/5 | 1tp/0fp/1 |
| contact-interaction-kinematics | 1tp/0fp/1 | 1tp/0fp/1 | 7tp/9fp/16 | 4tp/0fp/4 | — |
| spatial-topology-occlusion | 2tp/1fp/3 | 2tp/0fp/2 | 9tp/9fp/18 | 1tp/0fp/1 | — |
| causal-temporal-sequence | 1tp/0fp/1 | 2tp/0fp/2 | 12tp/3fp/15 | 3tp/0fp/3 | — |

## Specialist vs generalist detection (per model: defects found only by specialists / only by baseline / by both)

- **flash**: specialists-only [MIRR-2, BLOC-1, APPL-2], baseline-only [LONG-13, PHON-1, APPL-3], both [LONG-11, HOME-1, OLIV-1]
- **qwen**: specialists-only [HOME-1, CUPS-3], baseline-only [LONG-3, LONG-15, CUPS-4, APPL-3, APPL-4], both [LONG-1, LONG-11, LONG-13, MARB-1, BLOC-1, APPL-1, APPL-2, CAR-2]
- **pro**: specialists-only [LONG-11, LONG-14, LONG-4, DANC-1, DANC-2, HOME-1, CUPS-1, CUPS-3, PHON-1, OLIV-2, SKAT-2, CAR-4], baseline-only [LONG-12, LONG-13, CUPS-5], both [MARB-1, MIRR-2, MIRR-1, OLIV-1, WATC-1, BLOC-1, APPL-1, CAR-1]
- **gemma**: specialists-only [—], baseline-only [LONG-15, LONG-13, MARB-1, CUPS-1, CAR-3, CAR-4], both [HOME-1, OLIV-1, WATC-1, BLOC-1, APPL-2]
- **pegasus**: specialists-only [WATC-1], baseline-only [LONG-13], both [—]

## False positives (penalized findings)

- **flash** (3):
  - _long-scene / spatial-topology-occlusion @01:41: The reflection of the waitress is incorrectly rendered onto the exterior side panel of the truck trailer parked outside the window
  - phone / baseline-generalist @00:01: The red bag/container held by the person walking in the background abruptly disappears from their right hand between 00:01 and 00:
  - woman-car / baseline-generalist @00:03: The vehicle seamlessly transitions from stationary to moving at high speed (as indicated by yellow road lines moving past), while 
- **qwen** (11):
  - _long-scene / baseline-generalist @01:39: The banknote is a garbled $100-style bill: portrait, seal and numerals are present but the printed text is illegible AI-style gibb
  - _long-scene / character-continuity @00:52: The dawn cutaway (00:52-00:59) shows the counter and stools completely empty, yet the man was seated at the counter in the precedi
  - _long-scene / character-continuity @01:36: The counter is shown entirely empty at 01:36-01:37 even though the previous shot (01:27-01:35) has both characters seated together
  - dancer-mirror / baseline-generalist @00:01: At 0:00 the floor at the base of the mirror (left of the reflected dancer) is empty, but from 0:01 onward a white disposable cup s
  - dialogue / object-persistence-state @00:09: In the frontal views (00:00-00:07) the coat hanging on the hook is uniformly dark navy with no markings on any edge. At 00:09, the
  - man-cups / baseline-generalist @00:01: At 00:01-00:02 a pair of hands rests at the top of the frame (one showing the white shirt cuff) while a third hand simultaneously 
  - man-cups / baseline-generalist @00:03: The large embossed gold coin sitting on the middle cup from 00:00-00:02 appears as a silver/white coin at 00:03, although neither 
  - man-cups / object-persistence-state @00:03: The token covering the middle cup shows a gold face with dark emblem at 00:00-00:02 but reads silver-white at 00:03. During that i
  - woman-apple / baseline-generalist @00:07: A thin white horizontal spike protrudes from the bridge of the woman's nose at 00:07, an anatomically impossible artifact lasting 
  - woman-apple / baseline-generalist @00:08: The passing man's glasses are warped and melt into his face; the frame and temple do not connect to his ear, appearing as a smeare
  - woman-car / baseline-generalist @00:05: From ~00:05 the woman's hair streams backward indicating substantial relative airflow (vehicle moving at speed), yet she occupies 
- **pro** (49):
  - _long-scene / baseline-generalist @01:41: An oversized, perfectly clear image of the waitress's face appears on the side of the truck trailer. It does not behave like a nat
  - _long-scene / contact-interaction-kinematics @01:50: The woman reaches for the white mug on the counter, but her fingers form a loose shape next to it rather than wrapping around the 
  - _long-scene / object-persistence-state @01:50: The man's plate of food was on the counter in front of him. At 01:50, the plate is no longer on the counter, having vanished witho
  - _long-scene / object-persistence-state @01:50: The man placed the money on the counter at 01:38. In the shot at 01:50, the money is gone from the counter without anyone picking 
  - child-marbles / character-continuity @00:01: Before the cut, the boy's left hand rests on the rim of the glass bowl. After the cut, it instantly teleports to an elevated posit
  - child-marbles / character-continuity @00:02: Before the cut, the boy's right hand is resting on the right side of the bowl's rim. After the cut, it instantly appears in mid-ai
  - child-marbles / character-continuity @00:05: Before the cut, the boy's right hand is moving slowly inside the bowl. After the cut, it instantly transitions to a very rapid, bl
  - child-marbles / spatial-topology-occlusion @00:00: In the initial shot, the background visible beyond the paving stones is a flat edge of dirt or grass. After the cut to a wider ang
  - dancer-mirror / baseline-generalist @00:06: As the woman in the reflection raises her left arm for the second time, her hand is completely missing, leaving her arm to end in 
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
  - man-cups / contact-interaction-kinematics @00:01: As the camera pulls back, two distinct hands are seen emerging from the single left sleeve of the man's blue suit. One hand is hol
  - man-cups / spatial-topology-occlusion @00:02: The center of the tablecloth changes from a light green circular pattern to a solid red surface as the camera pulls back.
  - man-in-mirror / causal-temporal-sequence @00:00: The motion of the hand brushing against the face and hair is created by rapidly looping the same few frames forward and backward (
  - man-in-mirror / causal-temporal-sequence @00:00: A rapid, continuous scratching/clicking sound effect plays throughout the video, but the frequency and timing of the sound do not 
  - man-in-mirror / contact-interaction-kinematics @00:02: The man's right arm instantly teleports from his cheek to the top of his head without continuous movement, and his fingers snap fr
  - man-in-mirror / contact-interaction-kinematics @00:04: The man's right arm instantly teleports from the top of his head back down to his cheek, and his hand snaps from a flat pose back 
  - phone / baseline-generalist @00:06: An extra, disconnected thumb suddenly appears on the lower left side of the phone screen and then slides down out of frame.
  - phone / character-continuity @00:00: The person walking away in the background is initially carrying a large red accessory in their left hand. As they move onto the fl
  - phone / character-continuity @00:00: The background person transitions from being midway down the stairs to several feet away on the flat pavement in a fraction of a s
  - phone / contact-interaction-kinematics @00:07: As the right thumb moves to tap the bottom right portion of the screen, the thumb appears to clip through the solid black edge/bez
  - phone / object-persistence-state @00:02: The red bag being carried by the person in the background suddenly vanishes from their hand. There is no visible action of droppin
  - pouring-olives / character-continuity @00:03: A watch with a light blue band suddenly appears on the person's left wrist as they reach towards the bowls on the right, whereas t
  - pouring-olives / contact-interaction-kinematics @00:01: The stream of falling olives renders over the top of the large jar's front rim, clipping directly through the solid glass barrier 
  - pouring-olives / contact-interaction-kinematics @00:01: As the olives settle at the bottom of the large jar, they fail to behave as solid rigid bodies, visibly clipping into and merging 
  - pouring-olives / contact-interaction-kinematics @00:06: During the second pour, the falling stream of olives again clips through the front glass rim of the large jar instead of passing c
  - pouring-olives / spatial-topology-occlusion @00:01: As the olives are poured, the stream of falling olives is rendered in front of the near-side rim of the large receiving jar. Since
  - pouring-olives / spatial-topology-occlusion @00:07: During the second pour, the bottom edge of the small pouring jar and the falling olives are again rendered overlapping the front r
  - skateboarder / baseline-generalist @00:01: The skateboarder's left shoe changes from red to black/dark grey while he is mid-air doing the first trick, and then reverts to re
  - skateboarder / causal-temporal-sequence @00:08: The skater initiates a landing motion to land back on the skateboard, but the skateboard completely dissolves from under his right
  - skateboarder / contact-interaction-kinematics @00:02: As the skateboard completes its rotation during the flip trick, the nose of the board passes directly through the heel area of the
  - skateboarder / object-persistence-state @00:09: The skateboard is visible in mid-air during a trick, but as the skater lands, the skateboard completely vanishes from the scene, r
  - skateboarder / spatial-topology-occlusion @00:02: As the camera tilts up during the first trick, the background trees morph in shape and the light poles on the right disappear, com
  - skateboarder / spatial-topology-occlusion @00:07: During the second trick, the pair of light poles visible on the left earlier disappears, and the tree line warps, changing the rel
  - woman-apple / spatial-topology-occlusion @00:03: The distinct group of people in the background right, including a man in a green shirt and a woman in a red shirt, dissolve and va
  - woman-apple / spatial-topology-occlusion @00:05: As the camera moves along the path, the physical architecture of the stalls on the left morphs from tiered structural displays to 
  - woman-car / baseline-generalist @00:03: The fingers on the woman's visible hand, resting on her arm, are deformed and merged together into an unnatural, blob-like shape.
  - woman-car / baseline-generalist @00:02: The car's antenna vanishes, and the hood ornament morphs in shape and shifts position on the hood as the camera pans.
  - woman-car / object-persistence-state @00:02: The windshield wiper on the right side of the car spontaneously relocates its base and flips its direction. Initially, the base is
- **gemma** (6):
  - dialogue / baseline-generalist @00:01: The man's facial expressions jump abruptly and discontinuously between talking, shouting, and a smug smile without smooth transiti
  - man-cups / baseline-generalist @00:08: Coins on the red periphery of the tablecloth shift positions and change appearance spontaneously as the camera zooms out.
  - man-in-mirror / baseline-generalist @00:01: The shaver jumps abruptly from the cheek to the temple/forehead area without a smooth transition.
  - man-in-mirror / baseline-generalist @00:04: The shaver jumps abruptly from the temple area back down to the cheek.
  - man-in-mirror / character-continuity @00:02: The grooming tool in the man's hand teleports from his cheek to his eyebrow without any visible transitional movement.
  - man-in-mirror / character-continuity @00:10: The grooming tool in the man's hand teleports from his cheek back up to his eyebrow instantly.
- **pegasus**: none

## EXTRA findings awaiting human adjudication (plausible defects not in the baseline)

If confirmed, these should be added to ground-truth.json and rescored; if rejected, reclassify as FP in matches.json.

