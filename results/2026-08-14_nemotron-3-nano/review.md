# Video QC Review — 2026-08-14_nemotron-3-nano

Model: `nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free`  |  Run started: 2026-08-15T05:22:39.978Z

For each finding, fill in **Verdict** with one of: `defect` (real, correctly identified), `false-positive`, `duplicate` (same defect as another row), `partial` (real defect, wrong description/time).

## Summary: findings per role

| Video | BASELINE generalist | character continuity | object persistence state | contact interaction kinematics | spatial topology occlusion | causal temporal sequence |
|---|---|---|---|---|---|---|
| _long-scene | ⚠ parse | 1 | ⚠ parse | ⚠ parse | ⚠ parse | ⚠ parse |
| child-marbles | 0 | 0 | 0 | 0 | 0 | 0 |
| dancer-mirror | ⚠ parse | 0 | 0 | 0 | 0 | 0 |
| dialogue | 1 | 0 | 0 | 0 | 0 | 0 |
| home-tour | 1 | 0 | 0 | 0 | ⚠ parse | 0 |
| man-cups | ⚠ parse | 0 | 0 | 0 | 0 | 0 |
| man-in-mirror | ⚠ parse | 0 | 0 | 0 | ⚠ parse | 0 |
| phone | 1 | 1 | 2 | 0 | 0 | 0 |
| pouring-olives | 1 | 0 | 0 | 0 | 0 | 0 |
| skateboarder | 0 | 0 | 0 | 0 | 0 | 0 |
| watchmaker | 0 | 0 | 1 | 0 | 0 | 0 |
| weird-blocks | 1 | 2 | 0 | ⚠ parse | 0 | 0 |
| woman-apple | 0 | ⚠ parse | 0 | 0 | 0 | 0 |
| woman-car | 0 | 0 | 0 | 0 | ⚠ parse | 0 |

**Totals:** 84 calls, 1,010,099 tokens, $0.0000. Errors: 0.

## _long-scene

### Generalist QC Baseline

⚠ Response did not parse (no JSON object found). See `raw/_long-scene__baseline-generalist.json`.

### Character Continuity Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:36 | Man | placement_continuity | The man is seated at the counter in the shot at 00:36. Between 00:36 and 00:58, he is not visible in the background (00:44) and the counter appears empty (00:51), yet he is shown sitting again at 00:58 without visible movement of him leaving or returning, indicating a discontinuity in his presence and position. | moderate | 0.9 |  |

### Object Persistence & Physical State Observer

⚠ Response did not parse (no JSON object found). See `raw/_long-scene__object-persistence-state.json`.

### Contact, Interaction & Body Mechanics Observer

⚠ Response did not parse (no JSON object found). See `raw/_long-scene__contact-interaction-kinematics.json`.

### Spatial Topology & Occlusion Observer

⚠ Response did not parse (no JSON object found). See `raw/_long-scene__spatial-topology-occlusion.json`.

### Causal & Temporal Sequence Observer

⚠ Response did not parse (no JSON object found). See `raw/_long-scene__causal-temporal-sequence.json`.

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

⚠ Response did not parse (no JSON object found). See `raw/dancer-mirror__baseline-generalist.json`.

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
| 1 | 00:09 | Door | LockContradiction | The dialogue states the red door is locked, yet the man opens it smoothly without any visible lock interaction, showing a mismatch between spoken claim and visual action. | moderate | 0.96 |  |

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
| 1 | 00:00 | woman | hairstyle continuity | The woman's hairstyle changes from short hair in the first frame to a bun in later frames, indicating a continuity error. | moderate | 0.9 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

_No findings._

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

⚠ Response did not parse (no JSON object found). See `raw/home-tour__spatial-topology-occlusion.json`.

### Causal & Temporal Sequence Observer

_No findings._

## man-cups

### Generalist QC Baseline

⚠ Response did not parse (no JSON object found). See `raw/man-cups__baseline-generalist.json`.

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

⚠ Response did not parse (JSON parse failed: Expected ',' or '}' after property value in JSON at position 698 (line 5 column 595)). See `raw/man-in-mirror__baseline-generalist.json`.

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

_No findings._

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

⚠ Response did not parse (no JSON object found). See `raw/man-in-mirror__spatial-topology-occlusion.json`.

### Causal & Temporal Sequence Observer

_No findings._

## phone

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:05 | smartphone screen | text continuity | The displayed text on the phone screen abruptly changes from 'A742' to 'A7' and 'A2' before reverting, indicating a continuity error. | moderate | 0.95 |  |

### Character Continuity Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:02 | Person with red bag | movement continuity | The person was walking up the stairs (away from camera) and then is seen walking down the stairs (towards camera) without any visible turn or time lapse, indicating an unexplained change in direction. | moderate | 0.9 |  |

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 0.4 | smartphone | VisibleAction | Screen content changes from 'A742' to 'A7/A2' without any visible user interaction such as a tap or swipe. | moderate | 0.8 |  |
| 2 | 1.0 | smartphone | VisibleAction | Screen turns from lit to unlit without any visible button press or other visible action causing the change. | moderate | 0.8 |  |

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
| 1 | 0:02 | jar | unexplained content addition | Dark olives appear in the jar before any visible addition from a bowl that only contained green olives, indicating a missing step or cut. | moderate | 0.9 |  |

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

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:05 | metal tool | persistence | Tool disappears from view between 00:04 and 00:05 with no visible cause, then reappears at 00:08. | moderate | 0.95 |  |

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
| 1 | 00:08 | cubes | number_consistency | In the final lineup shown from 00:08 onwards, the third cube (green) displays the number 2, whereas in the preceding assembly sequence (00:07), it displayed the number 3. | moderate | 0.95 |  |

### Character Continuity Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:08 | hand | position continuity | hand appears at far right in frame 8 then instantly at far left in frame 9 without visible movement across the table | moderate | 0.95 |  |
| 2 | 00:10 | hand | position continuity | hand lifts blue 3 cube at left side then places another blue 3 cube at far right without visible motion | moderate | 0.95 |  |

### Object Persistence & Physical State Observer

_No findings._

### Contact, Interaction & Body Mechanics Observer

⚠ Response did not parse (JSON parse failed: Unexpected token '/', ..."edger": [ // one ent"... is not valid JSON). See `raw/weird-blocks__contact-interaction-kinematics.json`.

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

_No findings._

## woman-apple

### Generalist QC Baseline

_No findings._

### Character Continuity Observer

⚠ Response did not parse (no JSON object found). See `raw/woman-apple__character-continuity.json`.

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

⚠ Response did not parse (no JSON object found). See `raw/woman-car__spatial-topology-occlusion.json`.

### Causal & Temporal Sequence Observer

_No findings._
