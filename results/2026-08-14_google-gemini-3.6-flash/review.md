# Video QC Review — 2026-08-14_google-gemini-3.6-flash

Model: `google/gemini-3.6-flash`  |  Run started: 2026-08-14T18:52:19.837Z

For each finding, fill in **Verdict** with one of: `defect` (real, correctly identified), `false-positive`, `duplicate` (same defect as another row), `partial` (real defect, wrong description/time).

## Summary: findings per role

| Video | BASELINE generalist | character continuity | object persistence state | contact interaction kinematics | spatial topology occlusion | causal temporal sequence |
|---|---|---|---|---|---|---|
| _long-scene | 2 | 1 | 0 | 1 | 1 | 0 |
| child-marbles | 0 | 0 | 0 | 0 | 0 | 0 |
| dancer-mirror | 0 | 0 | 0 | 0 | 0 | 0 |
| dialogue | 0 | 0 | 0 | 0 | 0 | 0 |
| home-tour | 1 | 0 | 0 | 0 | 2 | 0 |
| man-cups | 0 | 0 | 0 | 0 | 0 | 0 |
| man-in-mirror | 0 | 0 | 2 | 0 | 0 | 0 |
| phone | 2 | 0 | 0 | 0 | 0 | 0 |
| pouring-olives | 1 | 0 | 2 | 0 | 0 | 1 |
| skateboarder | 0 | 0 | 0 | 0 | 0 | 0 |
| watchmaker | 0 | 0 | 0 | 0 | 0 | 0 |
| weird-blocks | 0 | 0 | 2 | 0 | 0 | 0 |
| woman-apple | 1 | 0 | 1 | 0 | 0 | 0 |
| woman-car | 1 | 0 | 0 | 0 | 0 | 0 |

**Totals:** 84 calls, 278,485 tokens, $0.5255. Errors: 0.

## _long-scene

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:41 | truck | visual inconsistency | The truck parked outside the diner changes from a white semi-truck at the beginning of the video (00:00) to a dark green truck. | moderate | 0.95 |  |
| 2 | 01:52 | waitress | character duplication | When the waitress stands up from the counter stool to walk behind the counter, a second identical clone of the waitress is already standing in the background near the kitchen pass-through. | severe | 0.98 |  |

### Character Continuity Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:52 | Waitress | multi-character consistency | As the waitress gets up from her stool at the counter and walks toward the back room, a second identical waitress in the exact same uniform and hairstyle is already standing behind the back counter working, duplicating the character on screen simultaneously. | severe | 1 |  |

### Object Persistence & Physical State Observer

_No findings._

### Contact, Interaction & Body Mechanics Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:51 | Waitress | penetration | As the waitress stands up from the counter stool in the foreground, a duplicate figure of the waitress simultaneously appears behind the counter wiping the surface and then merges into her path. | moderate | 0.95 |  |

### Spatial Topology & Occlusion Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:41 | waitress reflection and truck trailer surface | depth ordering & occlusion | The reflection of the waitress is incorrectly rendered onto the exterior side panel of the truck trailer parked outside the window. As the man walks outside toward the truck, he occludes the reflection, showing that the reflection layer was improperly placed in 3D depth behind the man on the truck body rather than on the foreground window pane. | moderate | 0.95 |  |

KT: False positive

### Causal & Temporal Sequence Observer

_No findings._

## child-marbles

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

## dancer-mirror

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

## dialogue

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

## home-tour

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:08 | kitchen layout and microwave | spatial_inconsistency | When the woman walks back into the kitchen, a built-in microwave hood appears directly above the stove on the left wall, whereas in the opening kitchen shot (00:00-00:01) the microwave was sitting on the opposite countertop and there was no microwave installed above the stove. | moderate | 0.95 |  |

KT: Partially correct, bigger issue is that the house layout doesn't work so there are two kitchens which don't make logical sense

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

_No findings._

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:08 | hallway wall and doorway topology | connectivity | At 00:07, looking through the bedroom doorway, the corridor straight ahead and to the left is bounded by hallway walls featuring framed artwork. As the camera advances through the door at 00:08–00:09, the left hallway wall disappears and connects directly into kitchen cabinetry and appliances. | moderate | 0.9 |  |
| 2 | 00:09 | kitchen layout and appliances | scene layout | The kitchen counter layout along the left wall is altered when re-entering the space. At 00:01, the left side contains a window over a sink and a red kettle next to the stove. At 00:09, the left side wall features an over-the-range microwave mounted directly above the stove, replacing the window and sink layout shown earlier. | moderate | 0.95 |  |

KT: Correct, but misses the problem with the navigation not being sensible

### Causal & Temporal Sequence Observer

_No findings._

## man-cups

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

## man-in-mirror

### Generalist QC Baseline

_No findings._

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:02 | toothbrush / comb | identity_and_persistence | The white toothbrush held in the man's right hand spontaneously transforms into a dark comb as he raises his hand to his hair without picking up another object. | severe | 1 |  |
| 2 | 00:04 | comb / toothbrush | identity_and_persistence | The dark comb transforms back into the white toothbrush as he lowers his hand back down from his hair to his mouth. | severe | 1 |  |

KT: Partially correct, there is morphing with the comb and it does appear to be darker, but the analysis overstates the change

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

_No findings._

## phone

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | red container in background | object_disappearance | The red bag/container held by the person walking in the background abruptly disappears from their right hand between 00:01 and 00:02. | moderate | 0.95 |  |
| 2 | 00:03 | smartphone screen text | text_morphing | The digital text and UI elements on the phone screen warp, morph, and generate random symbols ('Ā742', 'AZ-12', 'x2') unnaturally, indicating AI generation artifacting. | moderate | 0.95 |  |

KT: #1 is a false positive. The red object does not disappear and it is in her left hand. It is eventually obscured by the mobile phone in the foreground and the woman exits out of view. #2 is correct.

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

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | olives | color_consistency | Green olives poured from a container containing exclusively green olives spontaneously transform into dark purple olives upon falling into the jar. | severe | 0.95 |  |

KT: Partially correct, the olive color is not consistent, but you can see that he is pouring both green and dark purple olives.

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | olives / small glass container 1 | spontaneous generation | The transparent glass cup contains exclusively bright green olives, but as it is poured into the jar, dark purple/black olives unexpectedly appear in the pouring stream and land in the jar. | severe | 0.98 |  |
| 2 | 00:07 | olives / small glass container 2 | spontaneous generation | The second transparent glass cup shows only green olives inside, but when poured, dark purple/black olives emerge from the container alongside green olives. | severe | 0.98 |  |

KT: Both are partially correct, the clip does give the appearance of newly generated olives especially for the second pour, I would call this moderate over severe.

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | falling olives stream | effect_without_cause | Dark purple olives spontaneously appear in mid-air and inside the jar while pouring from a glass container that contains only bright green olives. | moderate | 0.95 |  |

KT: Partially correct, I agree with moderate.

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

_No findings._

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:02 | green block at position 3 | physical_state_change | The green block at position 3 changes its visible number from '2' (at 00:01) to '3' (at 00:02) without being rotated or touched, then reverts back to '2' at 00:03. | moderate | 0.95 |  |
| 2 | 00:03 | numbered blocks sequence | spontaneous_generation | Additional numbered blocks (orange '2', beige '2', light blue '3', green '5', green '2', blue '6') spontaneously materialize on the table one by one as the end block is pulled, without being placed by a hand. | severe | 0.98 |  |

KT: Correct.

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
| 1 | 00:04 | fruit display on the left | color_consistency | The green fruits in the foreground crate on the left abruptly shift to an unnatural bright cyan/blue color, and adjacent trays morph into vibrant purple fruits, indicating a generative video inconsistency. | severe | 0.95 |  |

KT: Mostly correct, except the trays are not morphing - the new trays are revealed with the motion of the scene, but the fruit is unnaturally cyan and purple.

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:08 | red apple | identity & persistence | The red apple held prominently in the central woman's hands vanishes between 00:07 and 00:08 as the camera rotates to her side, leaving both of her hands grasping only the umbrella handle with no visible action explaining the apple's disappearance. | severe | 0.95 |  |

KT: Correct- but missing an important issue, the bigger issue is that her hand is not logically holding the apple, the apple is stuck to her closed hand.

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

_No findings._

## woman-car

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:03 | car and driver | unexplained physical motion | The vehicle seamlessly transitions from stationary to moving at high speed (as indicated by yellow road lines moving past), while the woman remains folded-arm over the driver's window with no one controlling the vehicle. | severe | 0.95 |  |

KT: This is the wrong analysis, the camera is moving not the car. It points to a severe problem correcly, but does not identify the correct error.

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
