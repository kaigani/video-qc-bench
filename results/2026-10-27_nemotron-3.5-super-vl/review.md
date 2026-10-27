# Video QC Review — 2026-10-27_nemotron-3.5-super-vl

Model: `nvidia/nemotron-3.5-super-vl:free`  |  Run started: 2026-10-27T22:19:30.945Z

For each finding, fill in **Verdict** with one of: `defect` (real, correctly identified), `false-positive`, `duplicate` (same defect as another row), `partial` (real defect, wrong description/time).

## Summary: findings per role

| Video | BASELINE generalist | character continuity | object persistence state | contact interaction kinematics | spatial topology occlusion | causal temporal sequence |
|---|---|---|---|---|---|---|
| _long-scene | 1 | 0 | 1 | 2 | 1 | 3 |
| child-marbles | 2 | 0 | 0 | 0 | 0 | 0 |
| dancer-mirror | 0 | 0 | 0 | 0 | 0 | 0 |
| dialogue | 1 | 0 | 0 | 0 | 1 | 0 |
| home-tour | 0 | 0 | 0 | 0 | 0 | 0 |
| man-cups | 1 | 0 | 1 | 0 | 0 | 1 |
| man-in-mirror | 1 | 0 | 0 | 0 | 0 | 0 |
| phone | 0 | 0 | 0 | 0 | 0 | 0 |
| pouring-olives | 1 | 0 | 0 | 1 | 1 | 0 |
| skateboarder | 2 | 0 | 0 | 0 | 0 | 0 |
| watchmaker | 0 | 0 | 1 | 0 | 0 | 0 |
| weird-blocks | 0 | 0 | 5 | 0 | 0 | 0 |
| woman-apple | 0 | 0 | 0 | 0 | 1 | 0 |
| woman-car | 2 | 0 | 0 | 0 | 0 | 0 |

**Totals:** 84 calls, 539,446 tokens, $0.0000. Errors: 0.

## _long-scene

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:27 | Truck | Continuity / Object Identity | The semi-truck parked outside the diner changes appearance. In the opening shot (00:00), the cab appears white or light silver. In subsequent shots (00:27, 01:41), the truck is dark green with white stripes. It is implausible for the vehicle to change color without explanation. | moderate | 0.85 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:51 | white ceramic mug (placed by waitress) | object persistence | The white mug placed on the counter by the waitress at 00:06 is absent in subsequent clear shots of that counter section (00:51, 01:38) without a visible action removing it. | moderate | 0.9 |  |

### Contact, Interaction & Body Mechanics Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:28 | Coffee Pot | Contact points | Coffee pot is tilted and pouring liquid, but no hand is visibly gripping or supporting it. | moderate | 0.9 |  |
| 2 | 01:44 | Man | Limb trajectories continuous | Man is seen entering the truck cab at 01:39, then appears walking outside the truck at 01:44 without an intervening exit action. | moderate | 0.9 |  |

### Spatial Topology & Occlusion Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:41 | Semi-truck / Exterior Layout | Layout consistency | At 00:00 the semi-truck is parked to the left of the diner building. At 01:41 the man exits the diner and walks towards a truck positioned to the right of the exit path, and the truck's cab/trailer colors have inverted (white cab/dark trailer vs dark cab/white trailer). | moderate | 0.95 |  |

### Causal & Temporal Sequence Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:42 | Man's hands / Cash | Effect without cause | The man is suddenly holding a fan of cash without retrieving it from his pockets or receiving it from anyone. | moderate | 0.9 |  |
| 2 | 01:36 | Exterior lighting | Light changes only when a switch/source changes | The sky shifts from deep blue twilight to bright golden sunlight abruptly between cuts, implying an unexplained time jump. | moderate | 0.8 |  |
| 3 | 01:36 | Truck | Effect without cause | The truck is seen moving past the window without a preceding shot of the engine starting or a driver entering. | minor | 0.7 |  |

## child-marbles

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:02 | red balls and child's hands | object continuity | Child holds two red balls above the table, then immediately has hands back inside the bowl without visibly depositing the balls. | minor | 0.75 |  |
| 2 | 00:04 | video feed | stable framing | Severe camera shake and motion blur obscures the bowl contents during the shaking action. | minor | 0.9 |  |

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
| 1 | 00:08 | Door and adjacent wall fixtures | Set Continuity | When Sheldon turns to face the door at 00:08, the door appears to be solid wood without glass panels, whereas the door behind him in the opening shots (00:00-00:06) clearly features glass panes near the top. Additionally, a bank of light switches appears on the wall to the left of the door frame at 00:08, which was not visible in the previous framing where only a coat hook was seen on that side. | moderate | 0.85 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

_No findings._

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:08 | Room Layout | Relative positions of fixed objects | The blue coat and picture frame remain on the right side of the frame after the man turns left to face the door. Given the subject's initial orientation and leftward turn, background elements fixed on the right should shift towards the left or behind him, not remain fixed on the right. | moderate | 0.85 |  |

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

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:05 | cups | object consistency | In the close-up shots from 00:00 to 00:04, only three cups are visible on the table. When the camera cuts to the wide shot at 00:05, there are suddenly four cups lined up on the table, indicating a continuity error in the prop setup. | moderate | 0.95 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:06 | Coins inside Red Cups | Object Persistence | Coins visible inside cups at 00:00 are absent inside cups at 00:06 after shuffling, with no visible action to remove them. | severe | 0.9 |  |

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | gold coin | proportionality & completion | The hand holds a coin at 00:00 and moves downward toward the cups, but by 00:01 the coin is no longer visible in the hand or on the table, and has not been seen entering a cup. The initiated action of placing the coin dissolves without completion. | moderate | 0.9 |  |

## man-in-mirror

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:05 | Man shaving | temporal continuity / unique action segments | The video repeats the segment of the man shaving his neck seen at 00:00-00:01, appearing again identically at 00:05-00:09. Additionally, the forehead shaving segment from 00:02-00:04 is repeated at 00:10-00:11, indicating a looping error or redundant editing. | moderate | 0.9 |  |

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

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:05 | container being poured | object continuity | At 00:05, the person abruptly switches from pouring olives out of a small glass jar to pouring them out of a metal bowl without any intervening shot showing him setting down the jar and picking up the bowl. | moderate | 1 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

_No findings._

### Contact, Interaction & Body Mechanics Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:05 | small glass bowl (mixed olives) | missing contact | The bowl appears in the right hand already mid-pour; no frames show the hand making contact or lifting the bowl, jumping from empty hands at 00:04. | moderate | 0.9 |  |

### Spatial Topology & Occlusion Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:05 | Glass Bowl (held at start) | layout consistency | A glass bowl is held in the person's hand at 00:00 while a second glass bowl sits stationary front-right. By 00:05, the stationary glass bowl remains, but the held glass bowl is missing; the metal bowl is now being held instead. The placement or removal of the first glass bowl is unexplained. | moderate | 0.85 |  |

### Causal & Temporal Sequence Observer

_No findings._

## skateboarder

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:04 | skateboarder | temporal continuity | The skateboarder is shown at the peak of a jump in mid-air at 00:03, then instantly appears grounded and riding away at 00:04, skipping the landing phase entirely. | moderate | 0.95 |  |
| 2 | 00:09 | skateboarder | temporal continuity | The skateboarder is shown crouching on the ground preparing to jump at 00:08, then instantly appears high in mid-air at 00:09, skipping the takeoff and ascent phase. | moderate | 0.95 |  |

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

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:04 | metal tweezers | possession continuity | The tweezers held in the right hand are visible at 00:03 but absent at 00:04 with no visible action of placing them down or dropping them. | moderate | 0.75 |  |

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
| 1 | 00:01 | Block held in hand (Block 1) | Identity & Persistence | Object transitions from a green block with face '2' to a blue block showing faces '2' and '3' instantly while being held, with no visible mechanism for color or geometry change. | severe | 0.95 |  |
| 2 | 00:04 | Block at third position (Block 3) | Identity & Persistence | Object changes from a green block with face '3' to a tan block with face '2' between frames 00:03 and 00:04 without visible action causing the transformation. | severe | 0.95 |  |
| 3 | 00:06 | Block at fourth position (Block 4) | Identity & Persistence | Object changes from a light blue block with face '3' to a green block with face '5' between frames 00:05 and 00:06 without visible cause. | severe | 0.95 |  |
| 4 | 00:07 | Leftmost block (Block 1) | Physical State | The leftmost block changes its visible number from '3' to '2' while stationary on the table between frames 00:06 and 00:07, with no hand interaction on that specific block. | moderate | 0.9 |  |
| 5 | 00:10 | Blocks at positions 3 through 6 | Existence & Count | Four blocks (Tan '2', Green '5', Light Blue '2', Light Blue '6') vanish from the table during a hand sweep, leaving only two blocks. No clear removal action (carrying off-screen) is visible to account for their disappearance. | severe | 0.9 |  |

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

_No findings._

## woman-apple

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
| 1 | 00:05 | Man in White Shirt | connectivity | The man in the white t-shirt and grey shorts exits the frame to the left foreground at 00:03-00:04 after passing the camera, but reappears in the background center at 00:05 without traversing the intervening space. | moderate | 0.85 |  |

### Causal & Temporal Sequence Observer

_No findings._

## woman-car

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:04 | road background | environmental continuity | The road surface behind the car abruptly changes from unpaved dirt to paved asphalt with yellow lane markings and a 'SCHOOL' stencil without camera movement justifying the change. | severe | 0.95 |  |
| 2 | 00:04 | woman | motion continuity | The woman's hair transitions instantly from being still to blowing wildly in the wind, suggesting a cut or mismatched wind effects. | moderate | 0.9 |  |

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
