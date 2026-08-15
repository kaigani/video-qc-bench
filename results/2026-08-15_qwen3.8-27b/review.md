# Video QC Review — 2026-08-15_qwen3.8-27b

Model: `qwen/qwen3.8-27b`  |  Run started: 2026-08-15T10:07:06.519Z

For each finding, fill in **Verdict** with one of: `defect` (real, correctly identified), `false-positive`, `duplicate` (same defect as another row), `partial` (real defect, wrong description/time).

## Summary: findings per role

| Video | BASELINE generalist | character continuity | object persistence state | contact interaction kinematics | spatial topology occlusion | causal temporal sequence |
|---|---|---|---|---|---|---|
| _long-scene | 4 | 0 | 0 | 0 | 1 | 0 |
| child-marbles | 0 | 0 | 0 | 0 | 0 | 0 |
| dancer-mirror | 1 | 0 | 0 | 0 | 0 | 0 |
| dialogue | 0 | 0 | 0 | 0 | 0 | 0 |
| home-tour | 2 | 0 | 0 | 0 | 0 | 0 |
| man-cups | 2 | 0 | 0 | 0 | 0 | 0 |
| man-in-mirror | 0 | 0 | 0 | 0 | 0 | 0 |
| phone | 1 | 0 | 0 | 0 | 0 | 0 |
| pouring-olives | 1 | 0 | 0 | 0 | 0 | 0 |
| skateboarder | 1 | 0 | 0 | 0 | 0 | 0 |
| watchmaker | 0 | 0 | 0 | 0 | 0 | 0 |
| weird-blocks | 3 | 0 | 3 | 0 | 0 | 0 |
| woman-apple | 1 | 1 | 1 | 0 | 0 | 0 |
| woman-car | 0 | 0 | 0 | 0 | 0 | 0 |

**Totals:** 84 calls, 1,148,755 tokens, $1.5818. Errors: 0.

## _long-scene

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:41 | semi-truck | vehicle continuity | The customer's truck is a white sleeper cab (no trailer) in the opening exterior shot, but when he walks out at sunset it is a dark green 'SEABOARD' cab paired with a long box trailer. Same story element, entirely different vehicle livery and configuration. | moderate | 0.9 |  |
| 2 | 00:52 | male customer | presence continuity | The diner is shown completely empty at 00:52-00:59 — no customer at the counter — immediately after a shot (00:45-00:51) with him seated in the background and immediately before a shot (01:00) with him seated at the counter again. No exit or re-entry is shown. | moderate | 0.75 |  |
| 3 | 01:10 | breakfast plate | action duplication / prop continuity | The customer is already shown with the full french-toast-and-eggs plate in front of him at 00:33-00:44, yet at 01:10 the waitress is shown placing that same meal in front of him as if serving it for the first time. | minor | 0.7 |  |
| 4 | 01:46 | waitress reflection | reflection consistency | In the window/trailer reflection the waitress appears in a tan/khaki shirt, inconsistent with the light blue uniform she is wearing on camera in the same frame, and her posture in the reflection does not clearly match her actual movement. | minor | 0.5 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

_No findings._

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:19 | entrance door / building connectivity | scene layout consistency (door position) | In the exterior establishing shot (00:00-00:10) the entrance door is set in the middle of the long window wall (the same wall that carries the OPEN neon and the booth-facing windows), with windows on both sides of it. In the interior wide shot at 00:19 the man instead enters through a door on the wall perpendicular to that window wall, positioned beside the kitchen pass-through at the kitchen end. The doorway seen to the right of the pass-through in the 00:11-00:19 counter shot is on the opposite side of the pass-through from the 00:19 doorway. The entrance therefore occupies two different walls in different shots, so the established exterior layout cannot explain the interior doorway used for entry/exit (also reused at 01:41). | moderate | 0.55 |  |

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

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:06 | mirror reflection of dancer's right arm | reflection-pose consistency | At the same instant the real dancer's right arm is extended outward and downward (hand at/below waist level, arm nearly horizontal or drooping), the reflection shows the corresponding arm raised to roughly 45 degrees above horizontal with the hand well above shoulder height. A planar mirror must reproduce the exact pose at the same instant, so the elevation of the reflected arm is inconsistent with the real arm; adjacent frames (00:05 both down, 00:07 both overhead) confirm the two are out of sync at this moment. | moderate | 0.65 |  |

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
| 1 | 00:06 | Hallway wall art (floral portrait / small 'A' frame) | spatial continuity of set dressing | While walking toward the front door (00:01-00:03), the floral portrait and small frame hang on the right-hand wall of the hallway (kitchen/stove on the left). When she exits the bedroom at 00:06-00:08, the camera faces the same front door with the kitchen again on the left, but the identical floral portrait and small frame now hang on the LEFT-hand wall, and the right wall shows different artwork (red/green print, figure print) and a window. The hallway geometry has been mirrored between shots with no camera or character movement to explain it. | moderate | 0.7 |  |
| 2 | 00:09 | Appliance above the kitchen stove | prop/appliance continuity | In the first hallway shots (00:01-00:03) the stove on the left has a stainless pyramid range hood above it, while a separate countertop microwave (with a bowl on top) sits on the counter at 00:00. In the final hallway shot (00:09) the same stove position instead has a boxy over-the-range microwave with a glass door mounted above it, and open wooden shelving above that — a different appliance configuration for the same kitchen location. | minor | 0.55 |  |

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
| 1 | 00:04 | token stack in front-center copper cup | object persistence | From 00:00 to 00:03 the front-center cup clearly holds a stack of two oversized tokens (a gold token with 'GRAND SLAM' engraving on top of a silver one). After the camera cut at 00:04, the corresponding cup in the row is empty and the stack is not visible in any cup, on the table, or in the dealer's hands, even though no action is shown removing it. | moderate | 0.7 |  |
| 2 | 00:04 | loose tokens on the tablecloth | object persistence | The loose tokens visible at 00:02-00:03 (the silver token engraved '20' at bottom-center and the small gold pair at the lower edge) do not reappear after the cut at 00:04; instead a different arrangement of gold tokens is present with no shown cause for the change. | minor | 0.55 |  |

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
| 1 | 00:04 | phone screen text 'A7A2' | on-screen content continuity | The large handwritten 'A7A2' is dark/black at 0:00-0:03, appears in red ink at 0:04-0:05, and is black again at 0:06-0:09. No editing action (tap on a color tool, re-draw) is visible in between, so the ink color flip is unexplained. Relatedly, the top-left label changes from '7AZ' (4.5s) to 'A7AZ' (5.5s) without a visible writing stroke. | minor | 0.55 |  |

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
| 1 | 00:01 | Large glass jar / dark-brown olives | object conservation / continuity | At 00:00 the jar is visibly empty and the small bowl being poured contains only green olives. At 00:01, while a green olive is still falling from the bowl, several dark-brown/purple olives have already appeared at the bottom of the jar. These dark olives were never poured on camera and cannot be accounted for (they sit beneath the still-falling green ones, which also contradicts the pour order if the bowl had contained a mix). | moderate | 0.85 |  |

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

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | skateboard | object duplication | During the first aerial trick, two skateboards are visible simultaneously: one deck with visible trucks/white wheels angled under the skater's rear foot, and a second dark deck (with a visible yellow logo on its graphic side) floating vertically above/beside his front leg. A single rider can only have one board at a time, so one of these decks is an unexplained duplicate. | moderate | 0.65 |  |

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
| 1 | 00:01 | leftmost block | object identity continuity | At 0.0s the leftmost block is green showing '2'; at 1.0s the block in that same position is blue showing '2' (and a blue '3' block has appeared next to it). The green block was never shown being removed or replaced, so its color/identity change is unexplained. | moderate | 0.7 |  |
| 2 | 00:05 | 4th and 5th blocks | object continuity / unexplained appearance | At 4.0s the hand is placing a green '3' block as the 4th block. At 5.0s that position holds an orange '2' block and a new light-blue '3' block appears as the 5th block, although no pickup of the green '3' and no placement of the orange '2' or light-blue '3' are visible in the intervening second. The green '3' simply vanished and the row grew by two blocks. | severe | 0.85 |  |
| 3 | 00:06 | 6th and 7th blocks | object continuity / unexplained appearance | At 5.0s the hand is placing a blue '3' block in the 6th position. At 6.0s that position holds a green '5' block and a green '2' block has appeared as the 7th. The blue '3' was never seen removed, so the color/digit change and the new block are unexplained. | moderate | 0.8 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | leftmost cube (front face '2') | identity/persistence (object transformed) | The leftmost cube is green in the first frame while the hand rests on it, but in the next frame the same cube in the same position is blue with the same '2'/'6' faces. The hand was occupied placing the new blue '3' block, so no swap or recoloring action is visible; the block's color/identity changed unexplained. | moderate | 0.85 |  |
| 2 | 00:04 | fourth cube in the row | identity/persistence (object transformed, count of distinct objects) | At 00:03 the hand is placing a green cube showing '3' into the fourth position. By 00:04 that position holds an orange cube showing '2' while the hand is placing a new blue '3' block at position five. No visible action removed the green '3' or introduced the orange '2'; it changed color and digit in place. | moderate | 0.9 |  |
| 3 | 00:06 | sixth cube in the row | identity/persistence (object transformed, count of distinct objects) | At 00:05 the hand is placing a blue cube showing '3' into the sixth position. By 00:06 that position holds a green cube showing '5' while the hand places a new green '2' at position seven. No visible action accounts for the blue '3' becoming a green '5'. | moderate | 0.9 |  |

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
| 1 | 00:08 | Red apple/tomato held by main woman | object continuity / unexplained disappearance | The red fruit is clearly visible in her hand from 00:00 through 00:07 (prominently at 00:04-00:07). At 00:08 both hands are clasped on the umbrella shaft and the fruit is gone, and it remains absent in the 00:09 back view, where a fruit in her hand would still be visible. No motion shows her pocketing, dropping, or handing it to anyone, so the object simply vanishes. | moderate | 0.8 |  |

### Character Continuity Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:09 | man in light-blue checked shirt | placement between cuts / multi-character consistency | At 00:08 the checked-shirt man is in the left foreground in profile, facing/walking screen-right (toward the aisle), about 1 m from camera. In the next shot (00:09), while static anchors (woman in white tank top on the right, stall lines, main woman) show only a small camera shift to behind her, the same man suddenly appears on the right mid-ground with his back to camera, i.e. heading the opposite direction and several metres farther away. He cannot have crossed the aisle and reversed direction in the sub-second interval, so his placement is inconsistent across the cut. | moderate | 0.65 |  |

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:08 | red apple | identity & persistence (object vanishes) | The red apple is held in the woman's right hand from 00:00 through 00:07. At 00:08-00:09 her right hand is visibly empty, curled around the umbrella shaft beneath her left hand, and no apple is visible from the side or rear view. No visible action (dropping, handing to another person, placing on a surface) accounts for its removal, so the apple's disappearance is unexplained. | severe | 0.7 |  |

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
