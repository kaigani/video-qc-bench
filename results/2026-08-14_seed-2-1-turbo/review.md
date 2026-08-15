# Video QC Review — 2026-08-14_seed-2-1-turbo

Model: `bytedance-seed/seed-2-1-turbo`  |  Run started: 2026-08-15T05:23:11.563Z

For each finding, fill in **Verdict** with one of: `defect` (real, correctly identified), `false-positive`, `duplicate` (same defect as another row), `partial` (real defect, wrong description/time).

## Summary: findings per role

| Video | BASELINE generalist | character continuity | object persistence state | contact interaction kinematics | spatial topology occlusion | causal temporal sequence |
|---|---|---|---|---|---|---|
| _long-scene | 2 | 1 | 0 | 0 | 0 | 1 |
| child-marbles | 0 | 0 | 1 | 0 | 0 | 0 |
| dancer-mirror | 0 | 0 | 0 | 0 | 0 | 0 |
| dialogue | 0 | 0 | 0 | 0 | 0 | 0 |
| home-tour | 1 | 0 | 0 | 0 | 0 | 0 |
| man-cups | 0 | 0 | 1 | 0 | — | 0 |
| man-in-mirror | 0 | 0 | 2 | 0 | 0 | 0 |
| phone | 0 | 0 | 0 | 0 | 0 | 0 |
| pouring-olives | 1 | 0 | 4 | 0 | 0 | 0 |
| skateboarder | 0 | 0 | 0 | 0 | 0 | 0 |
| watchmaker | 0 | 0 | 0 | 0 | 0 | 0 |
| weird-blocks | 1 | 0 | 6 | 0 | 0 | 0 |
| woman-apple | 1 | 0 | 0 | 0 | 0 | 0 |
| woman-car | 0 | 0 | 0 | 0 | 0 | 0 |

**Totals:** 83 calls, 1,351,154 tokens, $1.9553. Errors: 1 (man-cups__spatial-topology-occlusion).

## _long-scene

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:41 | trucker's semi truck | vehicle continuity | The truck outside the diner changes from a white aerodynamic-cab semi with a dark unstriped trailer (visible at the opening of the video) to a dark green long-hood semi with a green trailer and white horizontal stripe when the man leaves at dawn, with no narrative explanation for the change. | moderate | 0.9 |  |
| 2 | 01:09 | waitress and food plate | implausible character action | The waitress places a full plate of food in front of the customer, then immediately picks it up and carries it away with no visible indication the customer rejected the food or asked for it to be removed, which is inconsistent with normal diner service. | moderate | 0.8 |  |

### Character Continuity Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:52 | Waitress | multi-character consistency / identity duplication | In a continuous wide shot of the diner interior, the waitress is visible in two separate, distinct locations behind the counter at the same time: one in the foreground (near end of the counter, walking toward the kitchen area) and one in the background (far end of the counter, wiping the counter surface). Both figures have identical hair, wardrobe, and build, with no on-screen movement, established second character, or plausible reflection/set feature to explain the duplicate appearance. | severe | 0.95 |  |

### Object Persistence & Physical State Observer

_No findings._

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:52 | second waitress (unaccounted staff member) | effect-without-cause | A second woman in a waitress uniform appears at the front (left) end of the counter behind it at 112s with no visible entry into the frame. The only staff access to the counter area is at the back (right) end, and no person is observed walking the full length of the counter from right to left in the preceding frames of the continuous wide shot. | moderate | 0.85 |  |

## child-marbles

### Generalist QC Baseline

_No findings._

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01.3 | red plastic ball | identity & persistence (no duplication) | Initially 2 red balls are visible inside the glass bowl. When the child lifts one red ball out of the bowl, 2 red balls remain inside the bowl, resulting in 3 total red balls with no visible action adding a red ball to the system. | moderate | 0.9 |  |

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
| 1 | 00:02 | wall decor (framed art, light switch, outlets) | set dressing spatial consistency | The exact same framed artwork, white double light switch, and paired electrical outlets (one brown, one white) appear on a hallway wall, matching the arrangement previously seen on the kitchen wall (with the art horizontally flipped). This identical decor arrangement appears a third time on a bedroom wall later, indicating the same physical set wall is reused for multiple distinct room locations, which is implausible for a real residential space. | moderate | 0.9 |  |

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

## man-cups

### Generalist QC Baseline

_No findings._

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:03 | Gold coin initially inside front-left red metal cup | location & orientation: position changes without visible movement | The front-left cup started with 1 gold coin. After a second coin was visibly placed into the cup and one coin was visibly removed, the cup was observed to be empty. The original coin was no longer present in the cup with no visible removal action, and shortly after appeared in the performer's opposite hand with no visible transfer action. | severe | 0.9 |  |

### Contact, Interaction & Body Mechanics Observer

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
| 1 | 00:02 | handheld grooming tool | identity & persistence | The handheld grooming object transforms from a shaving razor to a comb when the man raises it from his chin to his forehead, with no visible action modifying the object to cause this identity change. | severe | 0.75 |  |
| 2 | 00:04.7 | handheld grooming tool | identity & persistence | The handheld grooming object transforms back from a comb to a razor when the man lowers it from his forehead to his chin, with no visible action causing the identity change. This is also an unexplained reversal of the earlier transformation, which is physically impossible. | severe | 0.75 |  |

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

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | small glass jar / poured olives | source contents consistency | The transparent small jar initially contains only green olives (fully visible at the start of the pour), but dark purple olives fall out into the large jar. These dark olives were not present in the source container, which is physically impossible. | moderate | 0.95 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | dark purple olives in small glass jar 1 | identity & persistence (object appearance) | The first small pouring jar initially contains only green olives (clearly visible through the glass at 0s), yet dark purple olives fall out of it into the large jar during the first pour. No action is shown adding dark olives to the jar. | moderate | 0.95 |  |
| 2 | 00:04 | small glass pouring jar 1 | identity & persistence (object disappearance) | The first small glass jar is visible in the person's hand at 4s, but disappears from view without being placed on any visible surface by 4.7s. No visible action shows the jar being set down. | severe | 0.9 |  |
| 3 | 00:05 | small glass pouring jar 2 | identity & persistence (object appearance) | A small glass jar is pulled out of the stainless steel bowl at ~5s, but the bowl contained only loose green olives at the start of the video and no jar was observed being placed into the bowl. | severe | 0.9 |  |
| 4 | 00:05 | brown oval objects in stainless steel bowl | identity & persistence (object appearance) | Brown oval objects are visible in the stainless steel bowl after the small jar is removed, but these objects were not present in the bowl at the start of the video and no action is shown adding them. | moderate | 0.9 |  |

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
| 1 | 00:01 | number cubes | object count consistency | The total number of cubes increases repeatedly as the hand moves each rightmost cube to the right. A new cube appears in the original position of each moved cube, growing the total from 2 to 8 cubes without any new cubes being introduced from off-screen, which is physically impossible. | severe | 1 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | original left number cube / dark blue '2' cube | identity & persistence (object duplication) | Initial count of number cubes is 2. After the hand moves the original left green cube, 3 cubes are visible. A new dark blue '2' cube appears in the original left position, while the moved cube is now a dark blue '3' cube. One cube was duplicated into two with no visible cause. | severe | 1 |  |
| 2 | 00:03 | original right number cube / green '2' (position 3) cube | identity & persistence (object duplication) | Total cube count was 3 before the hand picked up the rightmost green '2' cube. After moving it right, total count is 4: a new green '2' cube remains in the original rightmost position, while the hand holds the original cube (now showing green '3'). Duplication with no visible cause. | severe | 1 |  |
| 3 | 00:04 | original right number cube / orange '2' cube | identity & persistence (object duplication) | Total cube count was 4 before the hand picked up the rightmost green '3' cube. After moving it right, total count is 5: a new orange '2' cube remains in the original rightmost position, while the hand holds the original cube (now showing light blue '3'). Duplication with no visible cause. | severe | 1 |  |
| 4 | 00:05 | original right number cube / light blue '3' cube | identity & persistence (object duplication) | Total cube count was 5 before the hand picked up the rightmost light blue '3' cube. After moving it right, total count is 6: a new light blue '3' cube remains in the original rightmost position, while the hand holds the original cube (now showing dark blue '3'). Duplication with no visible cause. | severe | 1 |  |
| 5 | 00:06 | original right number cube / green '5' cube | identity & persistence (object duplication) | Total cube count was 6 before the hand picked up the rightmost dark blue '3' cube. After moving it right, total count is 7: a new green '5' cube remains in the original rightmost position, while the hand holds the original cube (now showing green '3'). Duplication with no visible cause. | severe | 1 |  |
| 6 | 00:07 | original right number cube / green '2' (position 7) cube | identity & persistence (object duplication) | Total cube count was 7 before the hand picked up the rightmost green '3' cube. After moving it right, total count is 8: a new green '2' cube remains in the original rightmost position, while the hand holds the original cube (later rotated to dark blue '6'). Duplication with no visible cause. | severe | 1 |  |

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
| 1 | 00:07 | red fruit held by the woman | unexplained object disappearance | The red round fruit (apple/tomato) the woman is holding vanishes from her hand between 0:07 and 0:08. There is no visible motion of her placing the fruit in a pocket, bag, or elsewhere, and both of her hands are subsequently visible gripping the umbrella shaft with no sign of the fruit. | moderate | 0.85 |  |

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

## woman-car

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
