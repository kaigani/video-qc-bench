# Video QC Review — 2026-08-14_qwen-qwen3.8-max

Model: `qwen/qwen3.8-max`  |  Run started: 2026-08-14T20:41:30.710Z

For each finding, fill in **Verdict** with one of: `defect` (real, correctly identified), `false-positive`, `duplicate` (same defect as another row), `partial` (real defect, wrong description/time).

## Summary: findings per role

| Video | BASELINE generalist | character continuity | object persistence state | contact interaction kinematics | spatial topology occlusion | causal temporal sequence |
|---|---|---|---|---|---|---|
| _long-scene | 6 | 3 | 1 | 0 | 1 | 2 |
| child-marbles | 3 | 0 | 2 | 0 | 0 | 0 |
| dancer-mirror | 1 | 0 | 0 | 0 | 0 | 0 |
| dialogue | 0 | 0 | 1 | 0 | 0 | 0 |
| home-tour | 0 | 0 | 0 | 0 | 1 | 0 |
| man-cups | 3 | 0 | 2 | 0 | 0 | 0 |
| man-in-mirror | 0 | 0 | 0 | 0 | 0 | 0 |
| phone | 0 | 0 | 0 | 0 | 0 | 0 |
| pouring-olives | 0 | 0 | 0 | 0 | 0 | 0 |
| skateboarder | 0 | 0 | 0 | 0 | 0 | 0 |
| watchmaker | 0 | 0 | 0 | 0 | 0 | 0 |
| weird-blocks | 3 | 0 | 4 | 0 | 0 | 0 |
| woman-apple | 7 | 0 | 1 | 1 | 0 | 0 |
| woman-car | 2 | 0 | 1 | 0 | 0 | 0 |

**Totals:** 84 calls, 1,291,002 tokens, $4.4163. Errors: 0.

## _long-scene

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:11 | diner interior window light | day/night continuity | Interior shots 00:11-00:18 show the left window blown out with bright daylight, yet they are sandwiched between the dark night exterior (00:00-00:10) and the dark blue night interior that follows (00:19+); the ambient light level is inconsistent with the established time of night. | minor | 0.55 |  |
| 2 | 00:20 | male customer | entrance blocking | The man is first visible as a silhouette walking inside the kitchen pass-through window, then emerges into the dining room from the kitchen side. A customer should enter through the front glass door seen in the exterior shots; the kitchen is not a customer entrance. | minor | 0.7 |  |
| 3 | 00:37 | breakfast plate | temporal order / food continuity | At night (00:33-00:44) the man already has a plated meal (fried egg plus a thick wedge of crusty toast) in front of him, yet at 01:10, now in morning light, the waitress is shown serving him the plate for the first time, and the toast shape differs (flat slice vs thick wedge). The meal exists before it is served. | moderate | 0.75 |  |
| 4 | 01:39 | cash close-up | prop legibility | The banknote is a garbled $100-style bill: portrait, seal and numerals are present but the printed text is illegible AI-style gibberish and the layout does not match real currency, which is noticeable in a tight close-up. | minor | 0.6 |  |
| 5 | 01:41 | truck | vehicle continuity | The opening night shots feature a white aerodynamic semi parked outside with running exhaust, implying it is the customer's truck. At 01:41 the man walks out to a completely different vehicle - a dark green conventional-cab box truck - and the white semi is gone. No arrival/departure of either truck is shown to explain the swap. | moderate | 0.85 |  |
| 6 | 01:52 | waitress | character duplication | Two copies of the waitress are visible simultaneously for several seconds: one rises from the counter stool and walks behind the counter while another identical waitress wipes the counter in the background. Only a single waitress was established throughout the video, so this reads as a temporal ghosting/duplication artifact rather than a second character. | moderate | 0.7 |  |

### Character Continuity Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:52 | waitress | single-instance character duplication | Within one continuous shot, two instances of the waitress appear simultaneously: a semi-transparent copy wiping the counter near the kitchen pass and a solid copy rising from the stool and working at the coffee station on the right. Both move independently for ~5 seconds (01:52-01:57) before merging into one figure, which is too long for a dissolve and is not explained by any cut; the same character occupies two places at once. | severe | 0.75 |  |
| 2 | 00:52 | male customer | presence across cut | The dawn cutaway (00:52-00:59) shows the counter and stools completely empty, yet the man was seated at the counter in the preceding shot (00:45-00:51, visible in background) and is seated again at the same counter in the following shot (01:00). No exit or movement is shown to account for his absence in the intervening shot. | moderate | 0.6 |  |
| 3 | 01:36 | waitress and male customer | presence across cut | The counter is shown entirely empty at 01:36-01:37 even though the previous shot (01:27-01:35) has both characters seated together at the counter and the next shot (01:38) has the man's hands placing cash beside his mug at that counter. Both characters vanish and reappear with no on-screen movement to explain it. | moderate | 0.55 |  |

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:41 | parked semi truck | object identity / no uncaused transformation | The truck parked outside at night (0:00-0:10) is a white tractor with a white box trailer; the truck the man walks to at sunrise (1:41-1:50) is a dark green tractor with a green trailer and white stripe. The narrative framing (driver arrives at night, leaves in morning) implies one persistent vehicle, yet no shot shows the white truck departing or a green truck arriving, so the parked truck's identity changes without any visible cause. Alternative explanation (two different trucks swapping during the night ellipsis) is possible but unseen. | moderate | 0.6 |  |

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:52 | waitress | single-instance consistency (one person in two places at once) | In a single continuous shot, one instance of the waitress rises from the stool and moves behind the right side of the counter while a second, identical instance (same bun, blue shirt, white apron, same wiping action) is simultaneously visible in the background at the kitchen pass. The two copies coexist from 01:52-01:56 and the background copy fades/merges away by 01:58. No second identically-dressed character was ever established, and one person cannot occupy two positions in the same viewpoint. | severe | 0.8 |  |

### Causal & Temporal Sequence Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 0:11 | diner interior ambient light (left windows) | light change without cause | The interior shot 0:11-0:18 shows bright, blown-out daylight through the left windows, although the preceding exterior (0:00-0:10) and the following interior (0:19 onward) are the same night/dusk with the OPEN neon lit and dark blue sky. No switch, source change, or in-shot time transition accounts for the jump to daylight and back to night within an otherwise continuous night sequence. | minor | 0.55 |  |
| 2 | 1:52 | waitress | temporal flow (single forward timeline per shot) | In one continuous shot (1:51-1:58) the waitress exists as two simultaneous semi-transparent instances for about six seconds: one rises from the stool and walks behind the counter while another independently wipes the mid-counter. Motion branches into two concurrent timelines instead of one continuous forward flow; the superimposition persists far longer than a normal dissolve and the duplicated action has no cause within the scene. | moderate | 0.6 |  |

## child-marbles

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:02 | red balls | object-count continuity | At 00:01 the child holds one red ball over a bowl containing exactly one red (total 2 red). After the cut at 00:02 the child still holds one red ball, yet the bowl now contains two reds and an additional red is visible at the table edge, raising the visible red count from 2 to 3+ with no shown transfer of balls into the bowl or onto the table. | moderate | 0.6 |  |
| 2 | 00:03 | red ball in bowl | object permanence | At 00:02 the bowl held two reds plus one red in the child's hand. At 00:03, with both hands empty or merely touching balls over the bowl, only one red is present in the bowl; the surplus red balls vanish without any visible removal action, and the bowl total drops from 9 to 7-8. | moderate | 0.55 |  |
| 3 | 00:08 | green/red ball during stirring | object-color continuity | During the near-continuous stirring shot (00:06-00:09) the bowl's settled composition at 00:05 was 1 red / 3 yellow / 3 green. By 00:08 the visible set is 2 red / 3 yellow / 2 green, i.e. one green ball appears to have turned red mid-stir with no exchange of balls. | moderate | 0.5 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:02 | red ball / bowl ball count | count persistence (no unexplained appearance) | At 00:01 the bowl holds 7 balls (1 red) while the child holds 1 red in both hands. At 00:02 the bowl holds 8 balls including 2 reds while the child still holds a red ball; no visible action placed an additional red ball into the bowl, so one red ball appears unexplained. | moderate | 0.72 |  |
| 2 | 00:04 | held red ball | object persistence (no unexplained disappearance) | The red ball held at 00:02 is gone by 00:03 (right hand enters bowl empty), yet at 00:04-00:05 the bowl contains only 8 balls (2 reds) instead of 9; the held red is not visible in the bowl or on the table, i.e., it vanishes without a visible placement or transfer. | moderate | 0.6 |  |

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

_No findings._

## dancer-mirror

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | white cup at mirror baseboard | object permanence / continuity | At 0:00 the floor at the base of the mirror (left of the reflected dancer) is empty, but from 0:01 onward a white disposable cup sits there and remains for the rest of the clip. No person enters the frame or the mirror reflection to place it, so the prop appears unexplained; this indicates a hidden jump cut or continuity error between the first second and the remainder of the take. | minor | 0.6 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

_No findings._

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

_No findings._

## dialogue

### Generalist QC Baseline

_No findings._

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:09 | navy coat on brass hook | object identity/appearance persistence | In the frontal views (00:00-00:07) the coat hanging on the hook is uniformly dark navy with no markings on any edge. At 00:09, the same coat on the same hook (same door, verified by hook and door paneling) displays a broad white diagonal stripe across the sleeve and a white band at the hem. No person approached or handled the coat, and a band this wide would have been visible on the coat's silhouette in the earlier frontal views, so the change cannot be attributed to viewpoint; the prop's appearance changed without a visible cause. | moderate | 0.7 |  |

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

_No findings._

## home-tour

### Generalist QC Baseline

_No findings._

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

_No findings._

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:09 | kitchen appliance wall | scene layout consistency | In the opening shots the galley kitchen has the stove with a stainless range hood on the left wall and a standalone countertop microwave on the opposite right wall. In the final shot looking back into the same kitchen (same door with curtained window at the end, same cabinet wood), the left wall now shows the microwave built into the upper cabinetry directly above the stove, the range hood is gone, and open shelving appears in the upper cabinets. Two appliances established on opposite walls are now stacked on one wall with no camera-position explanation. | moderate | 0.7 |  |

### Causal & Temporal Sequence Observer

_No findings._

## man-cups

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | hands of the person at the table | two-hands-per-person anatomy | At 00:01-00:02 a pair of hands rests at the top of the frame (one showing the white shirt cuff) while a third hand simultaneously enters from the lower left to manipulate the front cup. Only one person (the man in the blue suit) is seated at the table, and only two hands are shown before and after, leaving the third hand unexplained. | moderate | 0.65 |  |
| 2 | 00:03 | coin resting on middle cup | object identity/color continuity | The large embossed gold coin sitting on the middle cup from 00:00-00:02 appears as a silver/white coin at 00:03, although neither hand touched that cup in the interim; the metal color change is unexplained. | minor | 0.4 |  |
| 3 | 00:06 | man's neckwear | plausible costume | Once the man's upper body is visible (00:05-00:09) he wears both a black bow tie at the collar and a red necktie hanging down simultaneously, an implausible combination that reads as a generation artifact rather than intentional styling. | minor | 0.5 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:05 | cup set / fourth cup | object persistence (count) | Four cups occupy the mat from 00:00-00:03. At 00:04-00:05 only three cups remain on the fully visible mat and no hand is shown carrying or removing a cup; at 00:06 a fourth cup is present again in the row although no hand was ever seen placing an additional cup. The cup vanishes and reappears without any visible cause. | moderate | 0.7 |  |
| 2 | 00:03 | token resting on middle cup | identity/state consistency | The token covering the middle cup shows a gold face with dark emblem at 00:00-00:02 but reads silver-white at 00:03. During that interval neither hand contacted the middle cup (one hand lifted the coin from the front-left cup, the other picked up a loose mat coin), so the token's appearance changed with no visible swapping action. | moderate | 0.55 |  |

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

_No findings._

## man-in-mirror

### Generalist QC Baseline

_No findings._

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

_No findings._

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

_No findings._

## phone

### Generalist QC Baseline

_No findings._

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

_No findings._

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

_No findings._

## pouring-olives

### Generalist QC Baseline

_No findings._

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

_No findings._

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

_No findings._

## skateboarder

### Generalist QC Baseline

_No findings._

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

_No findings._

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

_No findings._

## watchmaker

### Generalist QC Baseline

_No findings._

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

_No findings._

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

_No findings._

## weird-blocks

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | leftmost block (position 1) | object color constancy | At 0:00 the hand is setting down a green '2' block at the left end. At 0:01 the leftmost block is a blue '2' while the hand is simultaneously placing a different blue '3' block in the middle. The green block is never lifted, carried away, or exchanged on camera, so its body color changes from green to blue unexplained. | moderate | 0.85 |  |
| 2 | 00:04 | fourth block | object color constancy | At 0:03 the hand is placing a green block (faces showing '2' and '3') into slot 4. At 0:04 slot 4 is occupied by an orange '2' block while the hand is already placing the fifth block. The green block was never removed or swapped, so its body color changes from green to orange unexplained. | moderate | 0.85 |  |
| 3 | 00:05 | fifth block | object color constancy | While being placed at 0:04 the fifth block reads as the same saturated blue as blocks 1, 2 and 8; once settled (0:05 onward) it is a distinctly paler light-blue under the same lighting that leaves the other blue blocks saturated. Possible genuine shade mismatch, though lighting/blur on the tilted block could contribute. | minor | 0.55 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | slot1 block (leftmost) | object identity/color persistence | The leftmost cube is green with face '2' at 00:00 but blue with face '2' at 00:01. The hand never leaves the block and no swap is visible; rotating a block cannot change its body color, and the original green cube never reappears. | moderate | 0.7 |  |
| 2 | 00:04 | slot4 block | object identity/color persistence | The fourth cube is placed as a green cube (faces '2'/'3') at 00:03, yet at 00:04 it sits settled as an orange cube '2'. The hand had moved on to place the next block; no action touches slot4 in between, so the color change has no visible cause. | severe | 0.85 |  |
| 3 | 00:05 | slot5 block | object identity/color persistence | The fifth cube is placed at 00:04 as a saturated blue matching slots 1-2, but at 00:05 it appears as a distinctly paler light-blue cube while remaining settled and untouched. Lighting is constant across the row, so the hue shift is unexplained. | minor | 0.6 |  |
| 4 | 00:06 | slot6 block | object identity/color persistence | At 00:05 the hand holds a blue cube '3' for the sixth slot; at 00:06 the settled sixth cube is green with face '5'. A rotation could change the visible number but not the body color, and the hand performed no further action on that slot before fetching the next block. | severe | 0.85 |  |

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

_No findings._

## woman-apple

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:06 | blue umbrella | object support / gravity | From 00:06 to 00:08 both of the woman's hands are occupied with the apple (right hand open beside it) and no hand contacts the shaft; at 00:07 the shaft ends in mid-air at chin height with a black tip while the canopy stays perfectly stable overhead, i.e. the umbrella is effectively floating. | moderate | 0.75 |  |
| 2 | 00:06 | umbrella shaft | spatial continuity | The shaft passes in front of the woman's face at 00:04-00:05, is behind her head/shoulder at 00:06 with no arm or body movement to explain the jump, and is in front again at 00:07. | moderate | 0.7 |  |
| 3 | 00:08 | red apple | object identity / color consistency | The held object is consistently a red apple from 00:00-00:07, but at 00:08 it renders as a white/pale object in her clasped hands, and by 00:09 the apple is gone entirely with no action of putting it down, eating it, or handing it off. | moderate | 0.7 |  |
| 4 | 00:04 | produce crates | real-world plausibility | Crates of teal/blue round fruit appear at the left stall at 00:04-00:06 and again on the right at 00:08; no naturally teal or blue apples/tomatoes exist, indicating hallucinated produce coloration. | moderate | 0.8 |  |
| 5 | 00:00 | hanging price sign | text legibility | The white sign at top left shows a '6' surrounded by nonsensical garbled glyphs that form no real word, a typical generated-text artifact, visible through 00:02. | minor | 0.75 |  |
| 6 | 00:07 | protagonist face | anatomy / artifact-free render | A thin white horizontal spike protrudes from the bridge of the woman's nose at 00:07, an anatomically impossible artifact lasting about one frame. | minor | 0.6 |  |
| 7 | 00:08 | background man in blue shirt | facial anatomy consistency | The passing man's glasses are warped and melt into his face; the frame and temple do not connect to his ear, appearing as a smeared rendering artifact. | minor | 0.6 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:08 | red apple | object persistence | At 00:07 the red apple is clearly visible cradled in the woman's cupped hands. At 00:08 both hands are visible clasped together and empty, and at 00:09 the one visible hand grips only the umbrella handle; the apple never reappears. No frame shows it being eaten, dropped, handed off, or placed anywhere, so its disappearance is unexplained. | severe | 0.8 |  |

### Contact, Interaction & Body Mechanics Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:06 | blue umbrella / subject's hands | weight without support (missing grip contact) | After the apple moves to the left hand (~00:05), both hands cup the apple at 00:06-00:07 and no fingers wrap the umbrella shaft; the shaft terminates at the back of the hands and by 00:07 ends in mid-air above the hands with a visible gap. Despite zero supporting contact, the canopy stays rigidly overhead and translates in sync with the subject's gait, i.e. the umbrella moves as if held without contact being established. A grip is only re-established ~00:08 when the hands clasp the shaft. | moderate | 0.75 |  |

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

_No findings._

## woman-car

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | front license plate | text/object consistency | The last visible character of the red plate text changes shape between the 0.2s and 1.2s frames (reads as '7' then as '9') with identical plate framing and no occlusion, i.e. the printed glyphs are not stable frame to frame. | minor | 0.6 |  |
| 2 | 00:05 | woman / vehicle control | driving plausibility | From ~00:05 the woman's hair streams backward indicating substantial relative airflow (vehicle moving at speed), yet she occupies the driver's position of a left-hand-drive car (steering wheel rim visible behind her on the car's left side) while leaning out the window with both arms crossed and no hands on the wheel; no other occupant is visible in a driving position, so a moving car is uncontrolled. | moderate | 0.65 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | front license plate | object identity / state persistence | The plate reads 'STEG7' in the 0:00 frame but 'STEG9' at 0:01; the plate was never touched, occluded, or replaced, so the final character morphing between consecutive frames is an unexplained state change. | minor | 0.6 |  |

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

_No findings._
