# Video QC Review — 2026-08-14_gemma-4-31b

Model: `google/gemma-4-31b-it`  |  Run started: 2026-08-15T01:05:47.893Z

For each finding, fill in **Verdict** with one of: `defect` (real, correctly identified), `false-positive`, `duplicate` (same defect as another row), `partial` (real defect, wrong description/time).

## Summary: findings per role

| Video | BASELINE generalist | character continuity | object persistence state | contact interaction kinematics | spatial topology occlusion | causal temporal sequence |
|---|---|---|---|---|---|---|
| _long-scene | 2 | 0 | 0 | 0 | 0 | 0 |
| child-marbles | 1 | 0 | 0 | 0 | 0 | 0 |
| dancer-mirror | 0 | 0 | 0 | 0 | 0 | 0 |
| dialogue | 1 | 0 | 0 | 0 | 0 | 0 |
| home-tour | 1 | 0 | 0 | 0 | 1 | 0 |
| man-cups | 2 | 0 | 0 | 0 | 0 | 0 |
| man-in-mirror | 2 | 2 | 0 | 0 | 0 | 0 |
| phone | 0 | 0 | 0 | 0 | 0 | 0 |
| pouring-olives | 1 | 0 | 1 | 0 | 0 | 1 |
| skateboarder | 0 | 0 | 0 | 0 | 0 | 0 |
| watchmaker | 1 | 0 | 1 | 3 | 0 | 1 |
| weird-blocks | 5 | 0 | 2 | 0 | 0 | 0 |
| woman-apple | 1 | 0 | 1 | 1 | 0 | 1 |
| woman-car | 2 | 0 | 0 | 0 | 0 | 0 |

**Totals:** 84 calls, 363,175 tokens, $0.1145. Errors: 0.

## _long-scene

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:09 | Food/Coffee | Continuity | The man is already served and eating breakfast at 00:38, but the waitress is shown serving him the same meal and coffee again at 01:09. | moderate | 1 |  |
| 2 | 01:43 | Truck | Object Consistency | The white semi-truck with a sleeper cab shown at the start (00:00) is replaced by a green box truck when the man departs at 01:43. | severe | 1 |  |

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

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:10 | red balls | object_count | The number of red balls increases from two to at least three during the stirring motion. | moderate | 0.9 |  |

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

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | man | temporal_consistency | The man's facial expressions jump abruptly and discontinuously between talking, shouting, and a smug smile without smooth transitions, creating a glitchy, strobe-like effect. | severe | 1 |  |

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
| 1 | 00:00 | kitchen counter | continuity | The background appliances jump from a microwave to a coffee maker and back to a microwave in successive shots within the first second. | moderate | 1 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

_No findings._

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:09 | Kitchen | scene layout | The kitchen's spatial orientation relative to the hallway is inverted. At 00:00, the character enters the hallway by moving left from the kitchen; upon returning from the bedroom at 00:09, the kitchen is located on the left side of the hallway, whereas it should be on the right based on the established layout. | moderate | 1 |  |

### Causal & Temporal Sequence Observer

_No findings._

## man-cups

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:08 | table coins | spatial_consistency | Coins on the red periphery of the tablecloth shift positions and change appearance spontaneously as the camera zooms out. | moderate | 0.9 |  |
| 2 | 00:09 | coin on table | spatial_consistency | A gold coin located to the right of the copper cups shifts position on the table without being touched. | moderate | 0.8 |  |

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

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | shaver/arm | temporal consistency | The shaver jumps abruptly from the cheek to the temple/forehead area without a smooth transition. | moderate | 1 |  |
| 2 | 00:04 | shaver/arm | temporal consistency | The shaver jumps abruptly from the temple area back down to the cheek. | moderate | 1 |  |

### Character Continuity Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:02 | Man | movement continuity | The grooming tool in the man's hand teleports from his cheek to his eyebrow without any visible transitional movement. | moderate | 1 |  |
| 2 | 00:10 | Man | movement continuity | The grooming tool in the man's hand teleports from his cheek back up to his eyebrow instantly. | moderate | 1 |  |

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

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:02 | olives in jar | object consistency | Purple olives spontaneously appear at the bottom of the jar while the person is pouring exclusively green olives from the source bowl. | moderate | 1 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:00 | Dark Olives | identity & persistence | Dark purple olives spontaneously appear in the glass jar while the person is pouring green olives from a bowl that contains only green olives. | severe | 1 |  |

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | dark purple olives | effect-before-cause | Dark purple olives appear at the bottom of the jar while the user is pouring only green olives; these dark olives are not poured from the bowl until approximately 00:07. | severe | 1 |  |

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

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:04 | small tool | continuity | The tool held in the person's right hand suddenly vanishes in a jump cut, leaving the hand empty without a transition. | moderate | 1 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:04 | probe | identity & persistence | The long metal probe held in the left hand vanishes and is replaced by a significantly shorter metal piece during a fast motion, with no visible action explaining the change in size or identity. | severe | 0.9 |  |

### Contact, Interaction & Body Mechanics Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:03 | Left Hand | contact points | The tool vanishes from the left hand's grip instantly without any visible release movement or trajectory away from the fingers. | severe | 1 |  |
| 2 | 00:04 | Tool | limb mechanics | The tool reappears in the left hand with an abrupt jump in position and a significant change in geometry (from a long rod to a small fragment), violating continuous trajectory. | severe | 1 |  |
| 3 | 00:07 | Tool | limb mechanics | The object held in the left hand exhibits high-frequency jitter and snapping between positions, failing to follow a continuous physical trajectory. | moderate | 0.9 |  |

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:04 | tool | temporal flow | The tool held in the right hand vanishes instantaneously without a continuous motion of being set down or moved out of frame. | moderate | 1 |  |

## weird-blocks

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | blocks | material_consistency | The initial green blocks suddenly change color to blue, and a new blue block appears out of nowhere. | severe | 1 |  |
| 2 | 00:02 | block | value_consistency | The block being placed by the hand instantly changes from the number '2' to '3'. | moderate | 1 |  |
| 3 | 00:03 | block sequence | count_consistency | The total number of blocks and their sequence change inconsistently between frames. | severe | 1 |  |
| 4 | 00:06 | block | entity_persistence | A block with the number '5' suddenly appears in the sequence without being placed. | severe | 1 |  |
| 5 | 00:08 | block | value_consistency | The final block in the sequence instantly changes from the number '3' to '6'. | moderate | 1 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | Leftmost Cube | identity & persistence | The green cube with value '2' transforms into a blue cube with value '3' while being rotated by the hand. | severe | 1 |  |
| 2 | 00:01 | Blue Cube 2 | identity & persistence | A blue cube with value '2' spontaneously appears at the leftmost position of the sequence without being placed by the hand. | severe | 1 |  |

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
| 1 | 00:08 | red apple | object permanence | The red apple held by the woman suddenly disappears from her hand without any physical action explaining its removal. | severe | 1 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:08 | Red apple | identity & persistence | The apple held in the woman's right hand vanishes instantly without any visible action of putting it away, dropping it, or handing it over. | severe | 1 |  |

### Contact, Interaction & Body Mechanics Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:08 | Apple | contact points | The apple held in the woman's right hand vanishes instantly between frames without a visible release motion or being placed into another object. | severe | 1 |  |

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:08 | apple | effect-without-cause | The red apple held by the woman suddenly disappears from her hand without any action or movement to explain its removal. | severe | 1 |  |

## woman-car

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:04 | background | spatial consistency | A paved road with yellow lines suddenly appears to the left of the car, replacing the desert brush present in the opening shots. | severe | 1 |  |
| 2 | 00:05 | woman's hair | environmental consistency | The woman's hair suddenly begins blowing strongly in the wind, despite no corresponding movement in the surrounding vegetation. | moderate | 0.9 |  |

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
