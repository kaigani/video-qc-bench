# Video QC Review — 2026-08-21_ox-alpha

Model: `stealth/ox-alpha`  |  Run started: 2026-08-22T02:08:51.980Z

For each finding, fill in **Verdict** with one of: `defect` (real, correctly identified), `false-positive`, `duplicate` (same defect as another row), `partial` (real defect, wrong description/time).

## Summary: findings per role

| Video | BASELINE generalist | character continuity | object persistence state | contact interaction kinematics | spatial topology occlusion | causal temporal sequence |
|---|---|---|---|---|---|---|
| _long-scene | 2 | 0 | 2 | 0 | 2 | 0 |
| child-marbles | 1 | 0 | 0 | 0 | 0 | 0 |
| dancer-mirror | 1 | 2 | 0 | 0 | 0 | 0 |
| dialogue | 0 | 0 | 0 | 0 | 0 | 0 |
| home-tour | 1 | 0 | 0 | 0 | 0 | 0 |
| man-cups | 3 | 0 | 0 | 0 | 0 | 0 |
| man-in-mirror | 2 | 0 | 0 | 0 | 0 | 0 |
| phone | 3 | 0 | 0 | 0 | 0 | 0 |
| pouring-olives | 3 | 0 | 2 | 0 | 0 | 0 |
| skateboarder | 4 | 0 | 0 | 0 | 0 | 0 |
| watchmaker | 1 | 0 | 0 | 0 | 0 | 0 |
| weird-blocks | 1 | 0 | 0 | 0 | 0 | 1 |
| woman-apple | 2 | 1 | 0 | 1 | 0 | 0 |
| woman-car | 1 | 0 | 0 | 0 | 0 | 1 |

**Totals:** 84 calls, 1,133,238 tokens, $0.0000. Errors: 0.

## _long-scene

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:43 | Truck parked outside the diner | Vehicle continuity | The vehicle outside the diner completely changes. From 00:00-00:10 it is a white conventional semi tractor pulling a dark trailer, parked a noticeable distance from the building in the gravel lot. At 01:43 the truck outside the window is a dark-green Kenworth-style box truck (single-unit, different cab, color, and configuration) parked immediately adjacent to the window, close enough that the man reaches it in a few steps. No explanation is given for the swap or the change in parking position. | severe | 0.95 |  defect (LONG-13) |
| 2 | 01:11 | Breakfast plate served to the trucker | Duplicate action / meal continuity | The man is already shown with the fried-egg-and-bread plate in front of him at the counter from 00:34-00:45 (including a dedicated close-up of the plate). At 01:11-01:18 the waitress places what appears to be the same plated breakfast in front of him again, duplicating the serving of a meal he already has, with no shot of the first plate being cleared or eaten. | moderate | 0.6 |  defect (LONG-15) |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:02 | breakfast plate (toast + fried egg) | object persistence / unexplained removal and duplication | A full plate with thick toast and a fried egg sits in front of the man at 00:38-00:44. In the wide shot at 01:02-01:10 only his coffee mug remains in front of him, with no visible clearing action, and at 01:12-01:14 the waitress places an identical plate of food before him again (then picks it back up at 01:16-01:18). The meal disappears and an identical one is re-served with no intervening visible cause, indicating an unexplained vanishing/duplication of the plate. | moderate | 0.65 |  defect (LONG-15) |
| 2 | 01:43 | truck parked at the diner | identity persistence / impossible transformation | The opening shots (00:00-00:10) show a white conventional semi-tractor with trailer parked beside the diner. When the man exits and walks to his vehicle at 01:43-01:49, it is a dark green cab-over box truck in a different position, with no shot of the lot in between and no visible swap. If this is intended to be the man's same vehicle, its identity, color, and configuration changed without explanation. | moderate | 0.55 |  defect (LONG-13) |

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:43 | Parked truck outside the diner | scene layout / fixed-element continuity | The establishing exterior (00:00-00:10) shows a white conventional semi-tractor hauling a long white trailer parked along the diner's left side. When the man exits (01:43-01:51, seen through the front window), the vehicle is a completely different rig: a dark-green single-unit box truck with a white stripe, parked close and broadside to the window. No shot shows the original semi leaving or the box truck arriving, and the man walks to the box truck as if it is the rig he arrived with. Vehicle type, color, and parked position are all unexplained discontinuities of a major scene element. | severe | 0.9 |  defect (LONG-13) |
| 2 | 00:20 | OPEN neon sign / front window wall | connectivity: backgrounds through openings must match established layout | The exterior establishes exactly one OPEN neon sign, right of the entrance door. Every interior wide shot (00:20, 00:38, 01:02, 01:53) simultaneously shows a correctly reading OPEN sign in one window AND a mirrored/reversed OPEN sign in the adjacent window to its left. A single physical sign cannot present opposite chirality in adjacent panes, and the mirrored instance's position (near the corner window) has no counterpart on the exterior facade, where that glass is plainly visible and shows no neon at 00:00. The duplicated flipped sign persists across all interior wides, indicating a set/geometry error rather than a reflection. | minor | 0.6 |  defect (LONG-4) |

### Causal & Temporal Sequence Observer

_No findings._

## child-marbles

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:04 | decorated egg in silver egg cup, right side of table | object continuity / unexplained duplication | At 00:04 two decorated eggs in silver egg cups are clearly visible on the right side of the table. At 00:00 and 00:02 only one egg cup is present in that region. Between 00:02 and 00:04 the camera framing is nearly static (the bowl and the first egg cup barely shift position), so the second egg cup cannot plausibly have entered the frame from off-screen; it appears with no explanation. | minor | 0.55 |  false-positive |

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
| 1 | 00:00 | Dancer's arm tattoo and its mirror reflection | mirror reflection consistency (left-right flip) | At 00:00 the tattoo is on the dancer's right arm — the arm extended out to her side (viewer-right of her body) — while her hanging left arm appears clean. Her mirror reflection shows the tattoo on the opposite arm: the hanging arm on the viewer-left side of the reflection, while the reflection of the extended arm is clean. In a true mirror the tattoo's reflection must appear on the same image side as the real tattoo. From 00:02 onward the tattoo appears on the left arm in both the dancer and the reflection, and the right-arm marking seen at 00:00 is no longer visible on the subject, making the 00:00 right-arm tattoo and its mismatched reflection an unexplained continuity error. | moderate | 0.6 |  defect (DANC-1) |

### Character Continuity Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:00 | Mirror reflection of the dancer | Mirror pose consistency (reflection must match the live character's current pose) | At 00:00 the dancer's right arm is clearly extended out to her side with the elbow bent (mid-port-de-bras), but her mirror reflection shows both arms hanging straight down at her sides. The reflection corresponds to no state of the dancer and no cut or elapsed time explains the desync; from 2s onward the reflection matches her poses correctly again. | moderate | 0.75 |  defect (DANC-1) |
| 2 | 00:00 | Mirror reflection — tattoo placement (identity chirality) | Identity attribute consistency (mirrored left/right placement) | The dancer's tattoos are on her right arm, which in a mirror must appear on the reflection's left arm (viewer-right side of the reflection figure, as correctly seen at 2s). At 00:00 the ink is visible on the reflection's right arm (viewer-left side of the figure) — the tattoo sits on the wrong limb with no on-screen explanation. | minor | 0.55 |  defect (DANC-2) |

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
| 1 | 00:08 | Framed 'figure with blue flower' painting | duplicate set-dressing / asset reuse | The identical framed artwork (pale-faced figure surrounded by blue petal shapes, dark thin frame, wide white mat) that hangs on the hallway's right wall at 00:02-00:04 reappears at 00:08 inside the bedroom on the wall next to the exit doorway. A single framed painting can only face one side of a wall, so the same artwork asset appears to have been duplicated in two separate rooms rather than being a continuous piece of set dressing. | minor | 0.6 |  false-positive |

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
| 1 | 0:06 | red cups on table | object count continuity | Four cups are clearly present and unoccluded from 0:00 through 0:04 (front-left, center, back-center, right). From 0:06 onward, and clearly at 0:08, only three cups are discernible in the continuous shot; no cup is ever shown being picked up or removed, and at 0:08 no fourth cup is visibly occluded by the dealer's hands. | moderate | 0.55 |  defect (CUPS-3) |
| 2 | 0:04 | gold coin stack in center cup | unexplained object disappearance | At 0:00-0:02 the center cup contains a tall stack of gold coins protruding well above its rim, a distinctive feature. In the same continuous shot, by 0:04-0:06 no cup shows any protruding coin stack, and no action of removing or palming the stack is visible on screen. | moderate | 0.5 |  defect (CUPS-3) |
| 3 | 0:08 | gold coin held by dealer | unexplained object disappearance | At 0:06 the dealer clearly pinches a gold coin above the table next to the right cup. At 0:08 both of his hands appear empty, and no coin is visible on the table surface or in the act of being placed into a cup. | minor | 0.35 |  defect (CUPS-3) |

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
| 1 | 00:00 | Mirror reflection vs. man's razor | Mirror reflection sync | Throughout the shot the reflection shows the straight razor at the upper lip/moustache area, while the actual man is shaving his jaw, chin, or cheek (clearly visible at 00:00, 00:06, and 00:08 where the foreground razor is at chin/jaw level but the reflected razor sits at the lip). At 00:04 the man's hand is up at his temple/hairline, yet the reflection shows the blade at his eyebrow. A real mirror must exactly mirror the subject's pose, so the reflection appears to be from a different take or composited separately. | moderate | 0.85 |  defect (MIRR-1) |
| 2 | 00:00 | Razor prop (foreground vs. reflection) | Prop consistency | The razor the man holds in the foreground has a dark handle, but the razor visible in the mirror reflection has a white/light handle (also with a bluish tint at 00:06), indicating two different razors or takes were used for the subject and his reflection. | minor | 0.55 |  defect (MIRR-2) |

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
| 1 | 0:04 | smartphone screen text | on-screen text stability | The separator in the apartment number renders as a horizontal dash ('A7-42') at 0:04, but as a mid dot ('A7.42') at 0:00, 0:06 and 0:08. The on-screen text is not stable across frames of the same static UI. | minor | 0.55 |  defect (PHON-1) |
| 2 | 0:06 | smartphone screen text | ghosting / character doubling | The large 'A7.42' string shows doubled, overlapping character strokes (a ghosted second 'A' and smeared '7'), indicating the text was regenerated or frame-blended rather than being a static render; it appears cleanly by 0:08. | minor | 0.55 |  defect (PHON-1) |
| 3 | 0:06 | smartphone UI header | legible UI text | Header area displays nonsensical glyph strings '7AZ', 'AA' and 'A.A' (preceded by 'A4'/'A' fragments at 0:04) that do not form coherent UI text, consistent with synthetic text garbling. | minor | 0.5 |  defect (PHON-1) |

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
| 1 | 0:02 | Olives poured from the small glass bowl | Object content/color continuity | At 0:00 the small glass bowl held over the jar visibly contains only green olives, but the olives falling into the jar at 0:02 (and forming the jar's bottom layer at 0:04) include numerous dark purple/black olives that were never visible in the source bowl. | moderate | 0.55 |  defect (OLIV-1) |
| 2 | 0:06 | Person's left wrist | Wardrobe/prop continuity | A silver wristwatch is clearly visible on the person's left wrist from 0:06 through 0:08, but the same wrist is plainly visible and bare at 0:00-0:04 while performing the same pouring action, with no sleeve adjustment shown. | minor | 0.5 |  false-positive |
| 3 | 0:06 | Small glass bowl | Container fill-state continuity | The small glass bowl is nearly empty at 0:04 after being poured into the jar, yet at 0:06 the person is holding it full of green olives again while their other hand is only just reaching for the steel bowl — no refill action is shown to explain the restored contents. | minor | 0.4 |  defect (OLIV-4) |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 0:02 | large glass jar contents (dark-purple olives) | unexplained appearance / count change without visible cause | At 0:00 the jar is empty and the only container being emptied into it (small glass bowl) visibly holds green olives only; at 0:02 the jar already contains several dark-purple olives among the green. No visible action deposits dark olives into the jar; their first appearance is unexplained within the footage (consistent with an elided cut, but not shown). | minor | 0.55 |  defect (OLIV-1) |
| 2 | 0:08 | stainless steel bowl contents | content change without visible cause | From 0:00 to 0:04 the stainless bowl visibly contains only green olives. When it is lifted (0:06) and poured into the jar (0:08), it contains dark-purple olives mixed with green. The person's hands are occupied with the small glass bowl over the jar during 0:04-0:06, and no visible action transfers dark olives into the stainless bowl; the content change is unexplained in the footage. | minor | 0.6 |  defect (OLIV-1) |

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
| 1 | 00:02 | Skater and background | Frame blending / double-exposure ghosting | The frame shows two translucent, overlapping copies of the skater and the background (doubled trees, ledge, and horizon) blended together, indicating a crossfade between mismatched shots or blended frames rather than a clean continuous action shot. | moderate | 0.7 |  false-positive |
| 2 | 00:04 | Skater | Frame blending / ghosting | During the landing, a translucent ghost of the skater's arm and torso is overlaid on his actual position, again showing double-exposure/frame-blend artifacts instead of a single crisp pose. | minor | 0.6 |  false-positive |
| 3 | 00:00 | Small dark object above skater's head | Unexplained floating object | A small dark blob floats just above the skater's head with no visible support; it may be a passing bird, but it reads as a possible rendering/compositing artifact. | minor | 0.35 |  false-positive |
| 4 | 00:08 | Skateboard | Rigid-body geometry | The deck appears to bend/flex sharply in the middle while tilted under the skater's front foot, more than a wooden skateboard deck can plausibly flex; likely a warping or motion-blur distortion artifact. | minor | 0.4 |  false-positive |

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
| 1 | 08:00 | wristwatch on left wrist | object continuity / color consistency | The watch case reads as silver/steel-toned from 00:00 through ~04:00, but at 08:00 the case is distinctly gold/rose-gold toned with a warm dial tint. The surrounding lighting is unchanged (shirt stripes and skin tone consistent), so the color shift is not explained by ambient light and suggests either a shot change or an inconsistent prop. Could alternatively be an extreme reflection-angle effect, hence not higher confidence. | minor | 0.55 |  defect (WATC-1) |

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
| 1 | 00:02 | leftmost cube (digit '2') | object color/identity consistency | At 00:00 the leftmost cube is green with a '3'-like glyph on its right side face, and the hand is pinching its top knob. At 00:02 the same cube in the same position (hand still in contact) is blue, and its side face glyph has changed to a ring/'0'-like shape. No removal or replacement action is shown, so the color and side-face change are unexplained. | moderate | 0.9 |  defect (BLOC-1) |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

_No findings._

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 0:02 | leftmost numbered cube | effect-without-cause | At 0:00 the leftmost cube is green with a plain black '2' and the hand is gripping its top; by 0:02 the same cube in the same spot is blue with a white-outlined '2'. No action of the hand lifting, removing, or replacing the cube is visible, so the color/style change has no observable cause. | moderate | 0.6 |  defect (BLOC-1) |

## woman-apple

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 0:06 | Red fruit held by main woman | Object identity continuity | The fruit starts as a small, spherical, bright red apple/tomato-like fruit with no stem (0:00-0:04). By 0:06 it is noticeably larger and tomato-like with a visible green stem/calyx, and by 0:08 it has become a peach/nectarine-like fruit with a stem, oblong shape, and orange-red coloring. The object smoothly changes size, shape, color, and identity with no action explaining the swap. | moderate | 0.85 |  false-positive |
| 2 | 0:08 | Watch on main woman's wrist | Wardrobe/accessory continuity | From 0:00 through 0:06 the wristwatch is clearly on her left wrist while the fruit is in her right hand. At 0:08, in profile, the watch is visible on the same (right) arm that is holding the fruit. Either the watch switched wrists or the fruit silently switched hands between 0:06 and 0:08; neither transition is shown. | moderate | 0.7 |  false-positive |

### Character Continuity Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:08 | Main woman - red apple / blue umbrella in hands | movement continuity (hand/grip consistency across continuous shot) | From 00:00 to 00:06 the red apple is consistently in her right hand (the wrist with the bracelet) while her left hand (the wrist with the watch) grips the umbrella shaft. At 00:08, in what appears to be one continuous shot with no cut, the apple is in her LEFT hand - the extended wrist clearly shows the watch - implying the umbrella has moved to her right hand. No transfer action is visible in the footage between these points, and she is on screen the entire time, so the swap is unexplained by off-screen time. | minor | 0.6 |  false-positive |

### Object Persistence & Physical State Observer

_No findings._

### Contact, Interaction & Body Mechanics Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 0:06 | red fruit in woman's left hand | missing contact / floating grip | From 0:06 onward the fruit sits directly in front of the woman's open left hand with fingers spread and thumb extended; no finger wraps, pinches, or presses against the fruit, yet it maintains a fixed position relative to the hand as if supported. By 0:08 it clearly hovers above the open palm with a visible gap, with no contact surface explaining its support. | moderate | 0.7 |  defect (APPL-1) |

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

_No findings._

## woman-car

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:02 | hood ornament / car hood | object count persistence | At 00:02 two chrome bullet-shaped ornaments are visible on the hood (one at the front edge, a second further back mid-hood). At 00:00 and again at 00:04 only the single front hood ornament exists, and the mid-hood object never reappears. The extra ornament appears and vanishes with no camera or car movement that could explain it, indicating a generation/duplication artifact. | minor | 0.55 |  false-positive |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

_No findings._

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 0:04 | woman's hair (wind effect) | effect-without-cause / implausible cause-effect delay | Her hair is still at 0:00-0:02, begins lifting at ~0:04, and streams backward strongly by 0:06-0:08, implying sustained road-speed wind. No cause is established for the onset: the car shows no visible acceleration cue (the thin hood antenna remains perfectly rigid and vertical through 0:04, which contradicts highway-speed wind), background motion is confounded by the camera orbit, and her shirt collar barely responds to the same wind that moves her hair. Either the car was moving from the start (wind effect then lags its cause by ~4 seconds) or the car is effectively stationary (wind effect has no cause). | minor | 0.55 |  defect (CAR-4) |
