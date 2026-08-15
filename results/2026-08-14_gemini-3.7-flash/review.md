# Video QC Review — 2026-08-14_gemini-3.7-flash

Model: `google/gemini-3.7-flash`  |  Run started: 2026-08-15T05:22:33.400Z

For each finding, fill in **Verdict** with one of: `defect` (real, correctly identified), `false-positive`, `duplicate` (same defect as another row), `partial` (real defect, wrong description/time).

## Summary: findings per role

| Video | BASELINE generalist | character continuity | object persistence state | contact interaction kinematics | spatial topology occlusion | causal temporal sequence |
|---|---|---|---|---|---|---|
| _long-scene | 1 | 0 | 0 | 0 | 0 | 0 |
| child-marbles | 0 | 0 | 0 | 0 | 0 | 0 |
| dancer-mirror | 0 | 0 | 0 | 0 | 0 | 0 |
| dialogue | 0 | 0 | 0 | 0 | 0 | 0 |
| home-tour | 0 | 0 | 0 | 0 | 0 | 0 |
| man-cups | 0 | 0 | 0 | 0 | 0 | 0 |
| man-in-mirror | 0 | 0 | 0 | 0 | 0 | 0 |
| phone | 1 | 0 | 0 | 0 | 0 | 0 |
| pouring-olives | 2 | 1 | 2 | 0 | 0 | 0 |
| skateboarder | 0 | 0 | 0 | 0 | 0 | 0 |
| watchmaker | 0 | 0 | 0 | 0 | 0 | 0 |
| weird-blocks | 3 | 0 | 2 | 0 | 0 | 1 |
| woman-apple | 1 | 0 | 1 | 0 | 0 | 0 |
| woman-car | 1 | 0 | 0 | 0 | 0 | 0 |

**Totals:** 84 calls, 217,164 tokens, $0.1477. Errors: 0.

## _long-scene

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:50 | waitress | duplicate character | An identical duplicate of the waitress is visible standing and wiping the counter inside the kitchen pass-through window while the original waitress is still seated at the diner counter and getting up. | severe | 1 |  |

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
| 1 | 00:02 | red bag held by person in background | object permanence | The bright red bag held in the right hand of the person walking down the stairs abruptly disappears from their hand as they reach the bottom of the steps. | moderate | 0.95 |  |

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
| 1 | 00:01 | olives being poured | color_and_matter_inconsistency | Only green olives are visible inside the small jar being poured, but as they fall, dark purple/black olives spontaneously appear mid-air and fill the bottom of the large jar. | severe | 0.95 |  |
| 2 | 00:04 | countertop items in background | object_permanence | Between 00:04 and 00:05, a small glass dropper bottle suddenly appears on the counter next to the metal bowl, while the contents of the metal bowl abruptly change in quantity and color. | moderate | 0.9 |  |

### Character Continuity Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:05 | Man's right wrist accessory | wardrobe consistency | Before the cut at 00:04, the man is wearing a light blue/cyan band on his right wrist. After the cut at 00:05, he is wearing a silver metallic link watch on his right wrist. | moderate | 0.95 |  |

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | olives poured into large glass jar | identity & persistence | The small glass jar contains exclusively bright green olives, but upon pouring into the large jar, numerous dark purple/black olives spontaneously appear and fill the bottom of the large jar. | severe | 0.98 |  |
| 2 | 00:07 | olives poured from small glass jar | identity & persistence | The small jar is filled only with green olives from the bowl, but when poured, dark purple/black olives emerge from the small jar into the large jar. | severe | 0.98 |  |

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
| 1 | 00:00 | green number block on the left | object_rigidity | The green block unnaturally deforms and squishes elastically at the base like rubber instead of maintaining rigid toy block geometry. | minor | 0.85 |  |
| 2 | 00:02 | third green number block | surface_texture_constancy | The green block with numeral '3' mutates its printed number into '2' as another block is pulled out from it. | moderate | 0.95 |  |
| 3 | 00:07 | rightmost blue number block | surface_texture_constancy | The rightmost blue block with numeral '3' spontaneously mutates its printed number to '6'. | moderate | 0.95 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | numbered cube blocks | identity & persistence | Additional numbered blocks spontaneously duplicate and appear in the line as the hand slides the blocks across the table, increasing the total count from 2 blocks to 8 blocks without any external source. | severe | 0.95 |  |
| 2 | 00:07 | rightmost cube block | physical state transitions | The number printed on the front face of the rightmost cube morphs from '3' to '6' without the block being rotated or physically altered. | moderate | 0.9 |  |

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | numbered blocks | effect-without-cause | Additional numbered cubes spontaneously materialize and duplicate behind the block being dragged to the right without a physical source. | severe | 0.95 |  |

## woman-apple

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:04 | produce stall fruits (left foreground) | color_plausibility_and_consistency | The fruits displayed on the left stall shift into unnatural neon cyan-blue and vibrant purple colors, an artifact of generative video synthesis. | moderate | 0.95 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:08 | red fruit (apple/tomato) | object persistence | The red fruit held continuously in the woman's hands vanishes without being dropped, put away, or hidden as the camera moves past her side. | severe | 0.95 |  |

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
| 1 | 00:04 | background road and roadside environment | environmental_inconsistency | Yellow dashed centerline road markings and a row of wooden utility poles suddenly materialize along the background road, which was previously unmarked and devoid of roadside poles. | moderate | 0.95 |  |

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
