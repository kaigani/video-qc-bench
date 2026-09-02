# Video QC Review — 2026-09-02_google-gemini-3.8-flash

Model: `google/gemini-3.8-flash`  |  Run started: 2026-09-02T18:16:07.370Z

For each finding, fill in **Verdict** with one of: `defect` (real, correctly identified), `false-positive`, `duplicate` (same defect as another row), `partial` (real defect, wrong description/time).

## Summary: findings per role

| Video | BASELINE generalist | character continuity | object persistence state | contact interaction kinematics | spatial topology occlusion | causal temporal sequence |
|---|---|---|---|---|---|---|
| _long-scene | 2 | 2 | 0 | 0 | 0 | 0 |
| child-marbles | 0 | 0 | 0 | 0 | 0 | 0 |
| dancer-mirror | 0 | 0 | 0 | 0 | 0 | 0 |
| dialogue | 0 | 0 | 0 | 0 | 0 | 0 |
| home-tour | 1 | 0 | 0 | 0 | 1 | 0 |
| man-cups | 2 | 0 | 0 | 0 | 1 | 0 |
| man-in-mirror | 0 | 0 | 0 | 0 | 0 | 0 |
| phone | 2 | 0 | 1 | 0 | 0 | 0 |
| pouring-olives | 2 | 0 | 0 | 0 | 0 | 0 |
| skateboarder | 0 | 0 | 0 | 0 | 0 | 0 |
| watchmaker | 0 | 0 | 0 | 0 | 0 | 0 |
| weird-blocks | 3 | 0 | 3 | 0 | 0 | 0 |
| woman-apple | 1 | 0 | 1 | 1 | 0 | 0 |
| woman-car | 1 | 0 | 0 | 0 | 1 | 0 |

**Totals:** 84 calls, 279,810 tokens, $0.5304. Errors: 0.

## _long-scene

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:41 | semi-truck | appearance inconsistency | Truck switches from a white aerodynamic semi-truck at night to a dark green conventional truck in daylight. | moderate | 0.75 |  |
| 2 | 01:52 | waitress | entity duplication | A second identical waitress appears behind the counter while the first is getting up from the stool. | moderate | 0.82 |  |

### Character Continuity Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:18 | Waitress | placement between cuts | Waitress cuts instantly from standing behind service counter to seated on customer stool beside driver without transit time. | moderate | 0.7 |  |
| 2 | 01:52 | Waitress | identity | A duplicate waitress appears cleaning inside kitchen pass-through while primary waitress walks behind counter. | moderate | 0.74 |  |

### Object Persistence & Physical State Observer

_No findings._

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

_No findings._

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
| 1 | 00:07 | architectural layout | spatial continuity | After woman turns around in bedroom to exit, the doorway leads directly into the original hallway in the initial forward orientation rather than reversing the path. | moderate | 0.75 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

_No findings._

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:07 | bedroom doorway / hallway corridor layout | viewpoint consistency / impossible geometry | At 00:02–00:03, the woman enters the bedroom by turning right off the hallway corridor, where the white exterior door is straight ahead down the hallway. When she turns around to exit the bedroom (00:07–00:09), the bedroom doorway impossibly looks directly toward the exterior door down the full length of the corridor, reorienting the hallway by 90 degrees and looping her back along the kitchen corridor. | severe | 0.95 |  |

### Causal & Temporal Sequence Observer

_No findings._

## man-cups

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:03 | cups on table | object count and appearance consistency | Four mixed metal and paper cups abruptly morph into three uniform bronze cups during camera pullback. | moderate | 0.65 |  |
| 2 | 00:04 | tablecloth pattern | surface pattern persistence | Tablecloth ornamentation and coin arrangement shift and morph unnaturally as the camera retreats. | minor | 0.6 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

_No findings._

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:04 | rear metal cup | object persistence | Four metal cups are clearly present on the table from 00:00 to 00:03 (front-left, center, right, and rear). As the camera pulls back between 00:03 and 00:05, the rear cup vanishes from the tabletop without being touched or removed by either hand, leaving only three cups for the remainder of the clip. | severe | 0.95 |  |

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

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | pedestrian's red bag | object permanence | The red bag carried by the person in the background suddenly vanishes mid-stride. | moderate | 0.82 |  |
| 2 | 00:04 | smartphone screen text | visual artifact | A ghosted duplicate of the digits '42' appears beside the main text and fades away. | minor | 0.74 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:02 | red bag | identity & persistence | The red bag/container carried in the right hand of the walking person in the background disappears completely while the person continues walking with empty hands. | severe | 0.95 |  |

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
| 1 | 00:01 | olives | object appearance / color consistency | Dark purple olives fall out and appear in the jar despite only green olives being inside the transparent pouring container. | moderate | 0.85 |  |
| 2 | 00:07 | olives | object appearance / color consistency | Dark purple olives again materialize during the pour from a container holding only green olives. | moderate | 0.85 |  |

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
| 1 | 00:00 | green number block | rigid body deformation | Block base deforms unrealistically like rubber while being manipulated. | moderate | 0.7 |  |
| 2 | 00:01 | number blocks | object permanence | Additional blocks continuously duplicate and emerge from adjacent blocks as the hand drags them. | moderate | 0.75 |  |
| 3 | 00:02 | block labels and colors | appearance consistency | Block numbers and colors spontaneously morph during movement. | moderate | 0.7 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | left green block 2 and blue blocks | identity & persistence | The leftmost green block with number '2' spontaneously transforms into a blue block with number '2', while an extra blue block with number '3' materializes between it and the adjacent block without physical cause. | severe | 1 |  |
| 2 | 00:02 | green block (position 3) | physical state transitions | The green block's printed numeral spontaneously shifts from '2' to '3' at 00:02, and then reverts to '2' at 00:03 as a new block is pulled away from it. | severe | 0.95 |  |
| 3 | 00:04 | numbered blocks line | identity & persistence | Multiple new numbered blocks (tan '2', blue '3', green '5', green '2', blue '6') duplicate out of thin air / out of adjacent blocks as the hand slides along the table. | severe | 1 |  |

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
| 1 | 00:04 | fruit display on left stall | color realism and plausibility | Produce crates on the lower left display unnatural bright cyan and vivid purple spherical fruits. | moderate | 0.75 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:08 | red tomato | identity & persistence | The red tomato held in the woman's hands disappears between 00:07 and 00:08 without being placed down, dropped, or pocketed, leaving her left hand directly gripping the umbrella shaft instead. | severe | 0.95 |  |

### Contact, Interaction & Body Mechanics Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:04 | umbrella | weight without support | The woman removes her left hand from the umbrella shaft to clap/gesture around the tomato with both hands, leaving the umbrella completely unsupported in mid-air as she continues walking forward until she re-grips it at 00:07. | severe | 0.95 |  |

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

_No findings._

## woman-car

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:03 | road and background environment | environmental consistency | Bright yellow dashed center road markings and a roadside utility pole materialize along the roadway where neither existed in earlier frames. | moderate | 0.82 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

_No findings._

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:04 | utility pole and road markings | scene layout consistency | Between 00:00 and 00:02, the road stretching into the background is fully visible with no roadside structures or painted centerlines. By 00:04, a wooden utility pole and yellow dashed centerlines materialize along the road in areas that were previously established as clear and unmarked. | moderate | 0.95 |  |

### Causal & Temporal Sequence Observer

_No findings._
