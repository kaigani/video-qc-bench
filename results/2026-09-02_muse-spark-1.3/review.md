# Video QC Review — 2026-09-02_muse-spark-1.3

Model: `meta/muse-spark-1.3-contributor`  |  Run started: 2026-09-03T03:19:47.892Z

For each finding, fill in **Verdict** with one of: `defect` (real, correctly identified), `false-positive`, `duplicate` (same defect as another row), `partial` (real defect, wrong description/time).

## Summary: findings per role

| Video | BASELINE generalist | character continuity | object persistence state | contact interaction kinematics | spatial topology occlusion | causal temporal sequence |
|---|---|---|---|---|---|---|
| _long-scene | 2 | 0 | 0 | 0 | 0 | 0 |
| child-marbles | 0 | 0 | 0 | 0 | 0 | 0 |
| dancer-mirror | 0 | 0 | 0 | 0 | 0 | 0 |
| dialogue | 0 | 0 | 0 | 0 | 0 | 0 |
| home-tour | 0 | 0 | 0 | 0 | 0 | 0 |
| man-cups | 0 | 0 | 0 | 0 | 0 | 0 |
| man-in-mirror | 0 | 0 | 0 | 0 | 0 | 0 |
| phone | 1 | 0 | 0 | 0 | 0 | 0 |
| pouring-olives | 0 | 0 | 3 | 0 | 0 | 0 |
| skateboarder | 0 | 0 | 0 | 0 | 0 | 0 |
| watchmaker | 0 | 0 | 0 | 0 | 0 | 0 |
| weird-blocks | 0 | 0 | 2 | 0 | 0 | 0 |
| woman-apple | 1 | 0 | 0 | 0 | 0 | 0 |
| woman-car | 0 | 0 | 0 | 0 | 0 | 0 |

**Totals:** 84 calls, 612,271 tokens, $0.0775. Errors: 0.

## _long-scene

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:41 | parked truck outside diner | object persistence / identity | The vehicle parked left of the diner starts as a white modern semi tractor cab with no trailer emitting vapor at night, but in the daylight exterior it is a dark green vintage single-unit box truck with white stripe and tall exhausts in the same spot, with different cab, color, and cargo box and no explanation. | severe | 0.95 | defect |
| 2 | 01:53 | waitress | person uniqueness | In the final sunlit wide interior, two visually identical waitresses in light-blue shirt, white apron and hair bun are present simultaneously - one in foreground right with back to camera and one in background by the kitchen pass - both wiping the counter. | severe | 0.9 | defect |

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
| 1 | 00:04 | smartphone display | UI text coherence | Screen shows nonsensical fragmentary text: large 'A742' with 'A A' at top, '742' in status area, and 'x2' / 'A2-12' below, with letterforms warping under glare. No recognizable OS/app layout; reads as placeholder AI-generated text rather than a real screen. | moderate | 0.7 | defect |

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

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:05 | stainless steel bowl contents | count persistence | Bowl changes from full of green olives to only a few green olives plus brown pieces with bowl interior exposed, with no visible removal or pouring action causing the loss. | severe | 0.92 | defect |
| 2 | 00:05 | small clear empty bottle | object persistence - unexplained appearance | A small clear bottle appears standing on the white counter to the right of the metal bowl where the counter was previously empty; no hand places it. | moderate | 0.9 | defect |
| 3 | 00:06 | small glass pouring cup contents | count persistence | Cup was emptied into the jar by 00:04, then is held full of green and black olives again at 00:06 with no visible scooping or refilling action shown to explain the increase. | moderate | 0.85 | defect |

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

_No findings._

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | initial left green cube | physical state transition | Green uniform cube showing 2 becomes uniform blue cube showing 2 while hand only rotates it; rotation cannot change uniform color and marking style with no painting or swapping action visible. | severe | 0.9 | defect |
| 2 | 00:01 | second-position blue 3 cube | identity & persistence | A third cube appears between the two initial cubes with no visible carry-in; hand was already on the left cube and does not bring a new cube into frame, count goes 2 to 3 with no cause. | severe | 0.85 | defect |

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
| 1 | 00:08 | red apple | object_permanence | Red apple held in both hands for first ~7s disappears without being eaten, pocketed, handed off or put down; hands are then empty and clasped around umbrella pole in side and rear views. | moderate | 0.92 | defect |

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
