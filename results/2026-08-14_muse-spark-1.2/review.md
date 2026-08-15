# Video QC Review — 2026-08-14_muse-spark-1.2

Model: `meta/muse-spark-1.2`  |  Run started: 2026-08-15T04:50:50.141Z

For each finding, fill in **Verdict** with one of: `defect` (real, correctly identified), `false-positive`, `duplicate` (same defect as another row), `partial` (real defect, wrong description/time).

## Summary: findings per role

| Video | BASELINE generalist | character continuity | object persistence state | contact interaction kinematics | spatial topology occlusion | causal temporal sequence |
|---|---|---|---|---|---|---|
| _long-scene | 3 | 1 | 2 | 0 | 2 | 0 |
| child-marbles | 2 | 0 | 0 | 0 | 0 | 0 |
| dancer-mirror | 0 | 0 | 0 | 0 | 0 | 0 |
| dialogue | 1 | 0 | 0 | 0 | 0 | 0 |
| home-tour | 1 | 0 | 0 | 0 | 1 | 0 |
| man-cups | 3 | 0 | 3 | 0 | 0 | 2 |
| man-in-mirror | 2 | 1 | 0 | 0 | 0 | 1 |
| phone | 0 | 0 | 0 | 0 | 0 | 0 |
| pouring-olives | 2 | 0 | 1 | 0 | 0 | 0 |
| skateboarder | 0 | 0 | 0 | 0 | 0 | 0 |
| watchmaker | 0 | 0 | 0 | 0 | 0 | 0 |
| weird-blocks | 1 | 0 | 2 | 0 | 0 | 0 |
| woman-apple | 0 | 0 | 0 | 0 | 0 | 0 |
| woman-car | 0 | 0 | 0 | 0 | 0 | 0 |

**Totals:** 84 calls, 470,137 tokens, $1.1058. Errors: 0.

## _long-scene

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:41 | semi-truck | object permanence / continuity | Truck parked outside at 00:00 is a white cab-over semi emitting steam. At 01:41 the same parking spot viewed through the diner window contains a completely different vehicle: a dark green conventional Kenworth with a white stripe and a green corrugated box trailer. No arrival/departure of a second truck is shown; the same male customer walks to it as if it were his original truck. | severe | 0.98 |  |
| 2 | 01:51 | waitress | human duplication / cloning | At 01:51-01:57 the interior shows two identical waitresses simultaneously. One wipes the pass/counter in the foreground near the kitchen window, another identical woman wipes the counter in the mid-background near the kitchen doorway. Both wear the same light blue shirt, white apron, and hair bun and move independently, a classic AI cloning artifact that resolves as they appear to merge. | severe | 0.96 |  |
| 3 | 01:42 | window reflection / compositing | reflection coherence | View through the diner window at 01:42-01:46 shows the departing green truck with a persistent semi-transparent ghost of the waitress superimposed on the trailer side as the man walks outside. The interior reflection remains fixed on the exterior object while the exterior moves, creating an impossible double-exposure composite rather than a natural window reflection. | moderate | 0.88 |  |

### Character Continuity Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:51 | Waitress | identity_and_placement_continuity | In the sunlit wide shot of the diner interior, the waitress appears as two semi-transparent overlapping instances at once — one wiping near the front of the counter and a second ghosted duplicate near the coffee station/rear of the counter — violating the single-instance identity rule and placement continuity. No on-screen movement or plausible off-screen time explains simultaneous duplication; the effect persists for several seconds as she moves, showing motion trails/ghosting. | severe | 0.96 |  |

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:41 | semi-truck | identity & persistence / transformation | Truck parked outside from 00:00-00:10 is a white cab-over with white box trailer venting steam. At 01:41 viewed through window in same parking position it is a dark green conventional-hood tractor (tall exhaust stacks, different cab shape, white stripe, dark green corrugated trailer). No replacement, repaint, or drive-in was shown; the vehicle has transformed into a different color/model instantly. | severe | 0.98 |  |
| 2 | 00:33 | plate with fried egg and toast | identity & persistence / unexplained appearance and vanishing | Close-up at 00:33 and wide shot at 00:37 show a steaming plate with one sunny-side-up egg and one thick toast slice already on the counter in front of the seated man with no carry/placement action shown. At 00:52 the diner is shown empty from the same angle and the plate (and man/mug) are gone with no clearing action, while condiment caddies and urns remain. At 01:09 the waitress carries an identical plate from the kitchen to offer to the man again, indicating the plate duplicated/vanished and reappeared without visible cause. | moderate | 0.92 |  |

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:50 | waitress (duplicate rendering) | scene layout and depth ordering & occlusion | In the dawn wide shot held from the entrance looking toward the kitchen, two simultaneous instances of the waitress are visible: a solid waitress at the right side of the counter near the coffee equipment and a second semi-transparent duplicate near the kitchen pass-through on the back wall wiping the pass. The same fixed entity occupies two disjoint positions at once and the ghost renders with incorrect occlusion/transparency through the solid counter and back wall, incompatible with single-occupancy layout and proper near-over-far occlusion. | severe | 0.93 |  |
| 2 | 01:41 | truck relative to diner | scene layout | The established exterior at 00:00 shows the truck offset from the building's front corner, angled outward with open space between truck and window wall. When first seen through the interior window wall at 01:41 the truck is parked parallel and immediately abutting the same window wall, filling the panes with its trailer side only ~2m from the glass. The relative position of truck to fixed architecture has changed without an intervening movement, and the background seen through the windows now includes a house/across-street structure not present in the establishing exterior, breaking connectivity between the exterior layout and the background seen through openings. | moderate | 0.78 |  |

### Causal & Temporal Sequence Observer

_No findings._

## child-marbles

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:06 | balls inside bowl | object permanence / count conservation | Bowl starts with 8 distinct balls (2 red, 3 yellow, 3 green). During rapid stirring 00:06-00:09 the visible count increases to ~9-10 with 3-4 reds visible and duplicate translucent instances, with no ball entering from outside the bowl. | moderate | 0.72 |  |
| 2 | 00:07 | child's right hand and balls | solidity / non-interpenetration | During rapid stirring the hand and balls exhibit ghosting and transparency; balls appear semi-transparent, leave motion trails, and clip through fingers and each other instead of maintaining solid boundaries and collisions. | minor | 0.68 |  |

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
| 1 | 00:00 | doors / dialogue | audio-visual consistency | Dialogue states 'The red door is locked. The blue door is open' but all doors visible throughout the clip are brown wood and closed. No red door, no blue door, and no open door is ever visible; the door knocked at 00:08-00:09 is also brown and closed. | moderate | 0.92 |  |

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
| 1 | 00:09 | kitchen microwave / stove wall | Object Permanence / Continuity | At 00:00-00:01 the microwave sits on the right-side countertop and the stove has a stainless range hood with no microwave above it. At 00:09 when the woman returns to the same kitchen from the opposite direction, a silver microwave is now mounted under the cabinets directly above the gas stove, and the countertop microwave is no longer in that configuration. The appliance has teleported/changed mounting without any interaction or cut that explains it. | moderate | 0.88 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

_No findings._

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:09 | Kitchen - range hood / microwave wall | scene layout consistency | At 00:01-00:02 the kitchen's left wall has a stainless range hood over the stove with no microwave above it, while a countertop microwave sits on the right peninsula under cabinets with tile backsplash. At 00:09 the same left wall viewed from the hallway shows an over-range microwave mounted under the cabinets above the stove where the range hood was. Fixed appliances have swapped positions/walls with no in-scene change, breaking layout consistency of furniture/architecture independent of camera angle. | moderate | 0.82 |  |

### Causal & Temporal Sequence Observer

_No findings._

## man-cups

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:02 | gold coin / front cup | object_permanence_and_penetration | Hand appears to push a gold coin into the front cup, but the coin clips through the metallic rim/sidewall and the hand's fingers momentarily merge with the cup edge, then a coin is instantly retrieved from the same cup without a clear grasp-and-lift motion. | moderate | 0.82 |  |
| 2 | 00:03 | loose gold coins on green felt | quantity_conservation | Number of loose gold coins on the green felt increases from 2-3 at start to 5-7 by 00:03-00:04. New coins appear on the felt outside the hands' immediate drop zones with no visible placement or slide-in, indicating spontaneous generation/duplication. | moderate | 0.88 |  |
| 3 | 00:04 | coin balanced on center cup rim | support_and_contact | A coin balanced on the rim of the center cup remains unnaturally fixed in place while nearby hands and cups move, then disappears between frames without being touched, picked up, or falling, violating contact and persistence. | minor | 0.74 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:02 | small gold coins | identity & persistence - count/duplication | Right hand drops a single gold coin into the front cup. In the next moments the total number of gold coins visible on the green felt and in the hands increases by at least one with no visible coin introduced from off-screen, pocket, or sleeve. An object cannot duplicate without a visible source. | moderate | 0.92 |  |
| 2 | 00:04 | small gold coins | location & orientation - unexplained appearance | Two additional gold coins appear on the lower green felt area (near bottom edge) where none were present at 00:00-00:02, with no visible placement action causing them. The hand is occupied manipulating the front cup and the other hand holds a different coin; the new coins simply become visible on the felt. | moderate | 0.88 |  |
| 3 | 00:06 | small gold coins | ownership & possession - unexplained multiplicity | Performer is shown holding a gold coin in each hand simultaneously (left and right) after only one gold coin was tracked in-hand. The second coin appears in the opposite hand without a visible transfer, pick-up, or retrieval, violating conservation of count. | severe | 0.85 |  |

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:02 | Gold coins on green felt - cluster adjacent to front cup | effect-without-cause | Between 00:02 and 00:04 two to three additional gold coins materialize on the green felt immediately around the front cup. At that moment the right hand is occupied inserting a single coin into the front cup and the left hand is visibly holding a single separate coin over the right side; no hand performs a place/drop action over the location where the new coins appear. Effect (appearance of multiple coins) occurs without any preceding cause or contact. | moderate | 0.84 |  |
| 2 | 00:05 | Gold coins on green felt - lower edge of felt | effect-without-cause | At ~00:05-00:06 as the camera widens, at least one additional gold coin appears at the lower edge of the green felt with no hand over that area and no throwing/dropping trajectory preceding it. The total count on the felt jumps from ~5 to ~7 without a visible placement cause, constituting a second instance of coins appearing without cause. | minor | 0.76 |  |

## man-in-mirror

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:03 | man / straight razor | plausible_action/safe_tool_use | Man drags the straight razor across non-shaving areas including the center forehead and directly over the eyelid/eyebrow (00:02-00:04 and again 00:09). No shaving cream, no beard hair in that region, and the blade contacts eyelid skin at a perpendicular angle. This is not a plausible shaving technique and depicts an unsafe, implausible grooming action that would need correction before publication. | moderate | 0.92 |  |
| 2 | 00:00 | shaving process / facial surface | physical_effect_consistency | Throughout 00:00-00:09 the razor repeatedly strokes chin, cheek, nose and forehead with audible scraping but produces no visible effect: no shaving cream/lather present at any time, no hair removal, no skin displacement, no residue on blade. Contact leaves no trace, indicating a simulated action without expected material consequences. | minor | 0.85 |  |

### Character Continuity Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:05 | Man (real body and mirror reflection) | movement_continuity | At ~00:04 the man's hand/razor is at the cheek/jaw completing a downward stroke; at ~00:05 the hand/razor instantly teleports back to the starting chin/philtrum position and restarts the identical chin->forehead->cheek sequence seen at 00:00-00:04. The motion does not continue plausibly across the loop point - action is restarted/skipped without intervening on-screen movement or plausible off-screen time, indicating a hidden loop cut. | moderate | 0.92 |  |

### Object Persistence & Physical State Observer

_No findings._

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:04 | Man/right hand/razor motion | temporal flow - repeated beats / discontinuous motion | After the razor completes a forehead stroke (~00:02-00:04), the hand position abruptly resets to the chin/upper-lip starting position (~00:05) and the entire stroke sequence from 00:00-00:04 (chin -> nose -> forehead) repeats verbatim from 00:05-00:09. There is no continuous travel bridging forehead to chin and time effectively loops backward, constituting repeated beats and a discontinuous cause-effect trajectory. | moderate | 0.84 |  |

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
| 1 | 00:01 | Olives in transit / Large glass jar | Color/Identity Conservation | Olives visible inside the small glass bowl in the hands look uniformly light green, but the stream falling into the jar and the olives accumulating in the jar are a mix of light green and dark purple/black. Dark olives materialize mid-air and in the jar without being visibly present in the source bowl at the start of the pour. | moderate | 0.82 |  |
| 2 | 00:06 | Small glass bowl | Continuity / Quantity Conservation | The small glass bowl was emptied and set down on the white counter at 00:04, then at 00:06 it is again full in the person's hands with no continuous visible transfer. The stainless steel bowl on the counter simultaneously shows a discontinuous drop in contents, indicating a non-continuous refill/teleport rather than a smooth hand-scooped transfer. | minor | 0.62 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:04 | small clear glass bottle with narrow neck | identity & persistence | A small clear glass bottle appears on the white countertop immediately to the right of the stainless steel bowl at ~00:04-00:05. It is absent in all frames from 00:00-00:03 where that countertop area is clearly visible and empty. No hand is seen placing, sliding, or uncovering it; the person's hands are over the central jar at the moment it appears. Unexplained appearance/duplication with no visible cause. | moderate | 0.93 |  |

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
| 1 | 00:01 | cube_1 (leftmost cube) | object_color_persistence | The leftmost cube is green at 00:00 with '2' facing camera. While the hand contacts it, without the cube being removed or replaced, its entire body color switches instantaneously to blue by 00:01, while retaining the same '2' marking and top bolt. Color is an intrinsic material property and should not change from a simple touch/rotation; no new cube is brought in for this position. | moderate | 0.96 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | Cube 1 (leftmost cube) | identity_persistence | Left green cube with 2 front transforms into a blue cube with 2 front (6 side visible) while hand occludes it. No swap or paint action is visible; a green inanimate object cannot become blue on its own. Color identity changes with no visible cause. | severe | 0.96 |  |
| 2 | 00:02 | Cube 3 (original right green 2) | location & orientation | Green 2 cube at right center slides/displaces to the right to make space for the inserted blue 3 cube, without any visible hand contact or push on that cube at that moment. Position changes with no visible cause. | moderate | 0.88 |  |

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
