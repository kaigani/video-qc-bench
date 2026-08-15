# Video QC Review — 2026-08-14_kimi-k3

Model: `moonshotai/kimi-k3`  |  Run started: 2026-08-15T05:33:38.547Z

For each finding, fill in **Verdict** with one of: `defect` (real, correctly identified), `false-positive`, `duplicate` (same defect as another row), `partial` (real defect, wrong description/time).

## Summary: findings per role

| Video | BASELINE generalist | character continuity | object persistence state | contact interaction kinematics | spatial topology occlusion | causal temporal sequence |
|---|---|---|---|---|---|---|
| _long-scene | 6 | 2 | 2 | 1 | — | 2 |
| child-marbles | 0 | 0 | 0 | 0 | 0 | 0 |
| dancer-mirror | 0 | 0 | 0 | 0 | 0 | 0 |
| dialogue | 1 | 0 | 0 | 0 | 0 | 0 |
| home-tour | 2 | 0 | 0 | 0 | 0 | 0 |
| man-cups | 3 | 0 | 1 | 2 | 1 | 2 |
| man-in-mirror | 3 | 1 | 0 | 0 | 0 | 0 |
| phone | 2 | 0 | 0 | 0 | 0 | 0 |
| pouring-olives | 4 | 1 | 1 | 1 | 0 | 0 |
| skateboarder | 1 | 0 | 0 | 0 | 0 | 0 |
| watchmaker | 0 | 0 | 0 | 0 | 0 | 0 |
| weird-blocks | 2 | 0 | 5 | 0 | 0 | 0 |
| woman-apple | 4 | 0 | 0 | 1 | 0 | 0 |
| woman-car | 7 | 0 | 1 | 0 | — | 1 |

**Totals:** 82 calls, 2,411,749 tokens, $10.1646. Errors: 2 (_long-scene__spatial-topology-occlusion, woman-car__spatial-topology-occlusion).

## _long-scene

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:19 | OPEN neon sign | sign orientation consistency | The neon OPEN sign reads correctly ('OPEN') when viewed from inside the diner at 00:19 and in all later interior shots, and also reads correctly in the exterior shot at 00:00. A single window-mounted neon sign can only read correctly from one side; one of these views should show it mirrored. | minor | 0.6 |  |
| 2 | 00:20 | male customer | spatial continuity / entrance logic | The trucker customer first appears walking out of a rear doorway behind/next to the counter (back-of-house area) rather than entering through the diner's front door. No entry from outside is shown, and a customer would not emerge from the kitchen/back room. | minor | 0.45 |  |
| 3 | 00:33 | plate of eggs and toast | causal/temporal plausibility | The customer sits down at ~00:24 and coffee is poured at ~00:26-00:31; at 00:33 a fully cooked, steaming plate of fried egg and toast is already on the counter. No order was taken and no cooking occurred — the waitress had only been wiping the counter. Food appears within seconds with no explanation. | minor | 0.5 |  |
| 4 | 01:41 | semi truck | vehicle continuity | The truck parked outside during the entire opening sequence (00:00-00:09) is a white conventional-cab tractor with a white box trailer. When the customer leaves at 01:41, the truck he boards is a dark green Kenworth with a dark trailer bearing a white stripe — a completely different vehicle, with no shot of the first truck leaving or the second arriving. | severe | 0.9 |  |
| 5 | 01:43 | window reflection of customer | reflection physics | As the customer walks away from the window toward the truck (back turned to camera), the glass shows a translucent front-facing image of his face/upper body. A reflection in that glass could only show what is inside the diner, not the face of a man outside walking away — the superimposed face is physically inconsistent. | minor | 0.4 |  |
| 6 | 01:52 | waitress | single-instance of person / duplication | Two copies of the same waitress (identical uniform, apron, hair bun) are visible simultaneously: one stands near the coffee machine on the right while the other wipes the far end of the counter by the window. Over the following seconds the two figures converge and merge into one person near the kitchen pass-through. | moderate | 0.75 |  |

### Character Continuity Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:42 | Trucker (man in brown jacket) | single-instance identity (no duplication) | In one continuous shot through the diner window, as the man walks toward the truck, a semi-transparent second copy of him (face and torso clearly offset behind his body) trails his movement, so the character occupies two positions simultaneously within the same take. There is no in-scene explanation; it reads as a deliberate ghosting/long-exposure effect rather than a tracking error. | minor | 0.55 |  |
| 2 | 01:52 | Waitress | single-instance placement / unexplained disappearance | In a static wide shot the same waitress is visible in two places at once: one instance wipes near the kitchen pass-through at the back while a second, simultaneously visible instance works at the coffee-machine counter on the right. Both instances then converge toward the rear and progressively fade to transparency until no person remains in frame by ~01:58, all within a single held shot. A person cannot be duplicated or dematerialize on camera; unexplained except as a stylized time-lapse/ghost effect. | moderate | 0.6 |  |

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:41 | parked semi truck | identity persistence | The truck established outside the diner in the night sequence (00:00-00:09) has a white cab and white box trailer. When the customer leaves and walks to his truck in daylight, it is a dark green Freightliner cab with a dark green trailer. No action (repaint, swap, departure/arrival of a different rig) accounts for the change, and the narrative implies it is the same vehicle the trucker arrived in. | moderate | 0.6 |  |
| 2 | 00:31 | plate with eggs and toast | unexplained appearance (count/state) | The plate of eggs and toast materializes on the counter with no visible serving action: at 00:26 the counter holds only the mug and rag, and at 00:31 the finished, steaming plate is present. The only on-screen food service occurs later (01:08), when the waitress visibly places a similar plate, meaning the dish effectively exists before it is ever served. | minor | 0.4 |  |

### Contact, Interaction & Body Mechanics Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:52 | waitress (two simultaneous instances) | solidity / body duplication | During the final sunlit cleaning sequence, two figures wearing the same uniform and apron are visible at once: one stands up from the customer-side stool and moves behind the right end of the counter, while a second, already-present figure wipes the far end of the counter near the front window. Over the next ~5 seconds the near figure walks toward the back and the two converge at the kitchen doorway, after which only a single figure remains — the two bodies occupy overlapping space and merge into one with no collision, occlusion, or separation event. A single person cannot be in two places at once, and the merge is an unexplained pass-through/overlap of solid bodies. | moderate | 0.6 |  |

### Causal & Temporal Sequence Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:52 | waitress | temporal flow / action completion (no duplication, no dissolve) | Within one continuous static wide shot, the waitress rises from a counter stool and is simultaneously visible in two locations: one instance walks behind the counter toward the coffee machine while a second, increasingly transparent instance lingers near the kitchen pass-through. Both copies then gradually fade out until the diner is empty (01:56-01:58). A person cannot split into two concurrent instances, and the initiated walking motions neither complete nor are interrupted — they dissolve. | severe | 0.82 |  |
| 2 | 01:41 | window reflection of the man | effect without cause (reflection-source mismatch) | As the man walks away from the diner toward the truck with his back to the glass, the window displays a front-facing image of his face. No source facing the glass exists to produce that reflection — his back is to the window and no one inside matches the image. Possibly an intentional double-exposure stylistic device, but as a reflection it has no physical cause. | minor | 0.55 |  |

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

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:00:00 | man's face / mouth region | facial animation plausibility | Throughout the speech segment the mouth deforms with overly smooth, rubbery transitions while the rest of the face (eyes, brows, jaw, head) remains almost completely static. When the mouth opens wide (notably ~00:00:01.0 and ~00:00:05.0) the interior renders as a flat dark shape lacking coherent tongue/teeth anatomy. This mouth-only articulation decoupled from the rest of the face is characteristic of AI lip-sync/face-reanimation compositing rather than natural speech performance. | moderate | 0.6 |  |

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
| 1 | 00:07 | Framed artwork (figure with blue foliage) | set-dressing duplication | The same large dark-framed print (a figure surrounded by blue leaf shapes), with the same adjacent light-switch arrangement, is visible on the hallway wall outside the kitchen (00:00-00:03) and again inside the bedroom beside the exit doorway (00:07). The walk is continuous and forward, so these are two different walls; the identical artwork appearing in both places is unexplained and suggests reused/duplicated assets. | minor | 0.45 |  |
| 2 | 00:08 | House floor plan (two kitchens) | plausible architecture | A single uninterrupted walk connects two clearly different full kitchens — light-wood cabinets, brick backsplash and a countertop microwave at 00:00, then dark-wood cabinets with an over-range microwave at 00:09 — with the only route between them passing straight through a bedroom. Reaching a second kitchen by walking through a bedroom is an implausible residential layout. | minor | 0.3 |  |

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
| 1 | 00:04 | man's attire | wardrobe plausibility | Once the camera pulls back, the man is clearly wearing a black bow tie at the collar AND a long red necktie hanging down his chest at the same time. Wearing both simultaneously is an implausible, physically inconsistent wardrobe combination that persists through the rest of the clip. | moderate | 0.75 |  |
| 2 | 00:07 | dark object on table | object continuity | A black smartphone/wallet-like object is suddenly lying on the cloth to the right of the cups. Earlier views of the same table area (00:00-00:06) show only coins there, and the man is never seen placing the object down. | minor | 0.5 |  |
| 3 | 00:04 | coin stack inside center cup | object permanence | The center cup clearly contains a stack of gold coins from 00:00 through ~00:03.5. After the man slides the cups around, all cups appear empty (visible dark interiors) and the stack is never shown being removed or placed elsewhere. | minor | 0.4 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:04 | coin stack inside center metal cup (cup B) | physical state transition without visible cause (contents vanish) | The center cup clearly holds a tall stack of ~4-5 embossed coins from 00:00:00 through 00:00:02.5 (top coin face and multiple coin edges visible). By 00:00:04.5 the same cup reads empty as the cups are lined up, yet no hand is ever shown entering that cup, removing the stack, or dumping it; during the disappearance window both hands are visibly occupied with other cups/coins, and no new pile matching the stack appears on the cloth. | moderate | 0.55 |  |

### Contact, Interaction & Body Mechanics Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | coin held by right hand | missing release event | The right hand clearly pinches a coin at 00:00.000-00:00.500; by 00:01.000 the hand is open/loosely curled and the coin is gone, with no visible placement, drop, or transfer to the other hand. Palming could explain it, but the fingers are open enough that concealment is not visually supported. | minor | 0.35 |  |
| 2 | 00:04 | coin inserted into front-left cup | solidity / pass-through | A large gold coin is pushed below the rim into the opaque front-left cup at ~00:03.541. From ~00:04.041 the coin is visible lodged at the rim at an angle, and from 00:04.541 onward a gold disc is clearly rendered on the cup's EXTERIOR side wall (the early cups show plain copper walls). The coin appears to have passed through or fused with the cup wall rather than resting inside. | moderate | 0.5 |  |

### Spatial Topology & Occlusion Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:08 | copper cups on the table | scene layout consistency (object count permanence) | From 00:00 through ~00:07.5 exactly four cups exist and are individually manipulated (front-left, center coin-filled, back-center, right); at 00:07.583 the performer arranges a row of four cups with visible gaps where nothing is hidden, but from 00:08.083 onward the row contains five distinct cups. No hand carries a fifth cup into the scene from off-table during the transition, so the extra cup materializes in the layout without any geometrically accountable action. | moderate | 0.6 |  |

### Causal & Temporal Sequence Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:02 | middle cup's coins | effect-without-cause | The middle cup starts with a stack of coins protruding above its rim (00:00.0–00:02.0). By 00:02.5–00:03.5 the protruding stack is gone and the cup appears nearly empty, yet no hand touches or even approaches that cup during the interval — the left hand is occupied at the front-left cup and the right hand works behind the back cup. Coins cannot lower themselves below the rim unaided. | moderate | 0.55 |  |
| 2 | 00:02 | coin stack extracted from front-left cup | proportionality & completion | The front-left cup's interior is visible at 00:00.0 holding roughly one coin; the hand adds one more coin at 00:01.0. At 00:02.0 the hand withdraws a thick stack of many coins from that same cup — far more than the ~2 coins the cup was shown to contain. The effect (large stack out) is disproportionate to the established contents and the single inserted coin. | moderate | 0.5 |  |

## man-in-mirror

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:04 | mirror reflection | mirror_sync | The real hand holds the razor at the man's right temple/sideburn, while the mirror at the same instant shows the razor held horizontally in front of his nose/upper lip. A reflection must depict the same object at the same position at the same moment. The mismatch recurs at 00:09 (foreground tool at hairline, reflection tool at nose level). | moderate | 0.62 |  |
| 2 | 00:02 | man's hair vs. its reflection | mirror_consistency | As the hand passes the hairline, the foreground hair becomes visibly lifted and volumized, while the reflected hair remains flat and neatly slicked; the two simultaneous views of the same head diverge. Recurs around 00:04 and 00:09. | minor | 0.5 |  |
| 3 | 00:00 | grooming tool | object_identity | The tool reads as a thin dark metallic blade in the foreground hand but as a white cylindrical stick (swab/pencil-like) in the mirror during the opening ~1.5 seconds, then appears as a flat silver blade again by 00:09; the object's form and color are unstable across views. | minor | 0.45 |  |

### Character Continuity Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:09 | Man's mirror reflection | movement continuity / multi-depiction consistency | In the final frame the real man has raised the comb to his right temple/hairline (tip visibly above eye level at the hairline), while the mirror reflection shows the comb held roughly horizontal at nose/mid-face level, lagging behind the real hand position. At every earlier sampled frame the reflection matches the real comb height (e.g., 00:02.041 both at hairline), so this single-frame mismatch is unexplained by the continuous raising motion. Confidence is limited because the reflected comb is small and partially occluded by the hand. | minor | 0.4 |  |

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
| 1 | 00:02 | red bag carried by pedestrian | object permanence | The pedestrian in blue carries a red bag in their left hand through 00:02.041; by 00:02.541 the bag has completely disappeared mid-stride with no visible dropping motion, occlusion, or hand transfer. The object simply ceases to exist between frames. | moderate | 0.72 |  |
| 2 | 00:04 | phone screen top-center text | on-screen text consistency | The small text at the top-center of the phone screen flickers across frames, alternating between readings like '441', '4.41', and '4.44' without any user interaction, indicating unstable rendered text rather than a coherent clock or label. | minor | 0.5 |  |

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
| 1 | 00:01 | olives inside large jar | object shape consistency | Several dark olives in the jar are rendered as elongated vertical capsule/bar shapes rather than round olives. These deformed pieces persist and multiply through the rest of the clip (clearly visible at 00:01.5, 00:03.0, and 00:08.6), inconsistent with the round olives being poured. | moderate | 0.7 |  |
| 2 | 00:06 | stove/oven in background | set continuity | The oven door changes from a solid white panel with a handle (00:00-00:05) to a door with a large dark glass window, and the control panel changes from a single row of knobs to 6 knobs flanking a central digital display. A camera angle shift cannot turn a solid door into a windowed one. | moderate | 0.6 |  |
| 3 | 00:05 | metal bowl contents | object consistency | The metal bowl initially contains only green olives. After the person's hand interacts with it around 00:05.1, the bowl (visible from 00:05.6 onward) contains several brown/tan oval objects alongside the olives, with no shown action that would place them there. | minor | 0.5 |  |
| 4 | 00:00 | first olives entering the jar | color consistency | The olives visible in the source jar and the olive seen falling at 00:00.0 are all green, but the first olive resting at the bottom of the large jar at 00:00.5 is dark purple/black. The color change is not explained by anything visible in frame. | minor | 0.4 |  |

### Character Continuity Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:04 | Person's left wrist (accessory) | identity/accessory continuity | A silver chain bracelet is clearly visible on the person's left wrist from ~00:04.5 onward (reaching to the bowl, then holding the container). In the earlier pouring sequence (00:00.0-00:04.0) the same left wrist and forearm are bare with rolled sleeves and no bracelet is visible. No on-screen action shows the bracelet being put on, and the pouring task is continuous, so its sudden appearance is unexplained. | minor | 0.55 |  |

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:04 | small clear glass bottle | identity & persistence / unexplained appearance | Between 00:04.0 and 00:04.5 a small clear glass bottle materializes on the counter between the metal bowl and the white bowl. The area is visible in the prior frame and contains no bottle, and neither of the person's hands (one holding the small jar, one reaching toward the metal bowl) performs a visible placing action. The bottle then persists untouched for the rest of the clip. | moderate | 0.55 |  |

### Contact, Interaction & Body Mechanics Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:02.041 | dark olives inside large jar | weight & support | A vertical column of dark olives stands roughly 4-5 olives high in the center of the jar, rising well above the surrounding fill level with no lateral support on its upper half. Round, smooth spheres cannot remain stacked in a free-standing vertical tower; the column persists unchanged through 00:04.541 instead of toppling, indicating the objects are holding position without physical support. | moderate | 0.55 |  |

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

_No findings._

## skateboarder

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | skateboarder's feet / skateboard | no ghost/duplicate limbs (frame artifact) | As the skater pops the first trick, a white shoe-shaped blur appears floating above the board between his feet while both red shoes are simultaneously accounted for (one raised on the front foot, one on the board at the back). The rest of the skater's body is crisp in the same frame, so it does not match the global motion characteristics; it reads as a duplicated/ghost foot or a frame-blending artifact rather than ordinary motion blur. | minor | 0.45 |  |

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
| 1 | 00:01 | leftmost number cube (and cube count) | object identity/color permanence + count conservation | At 00:00:00.0-00:00:00.5 the hand grasps the left cube, which is green showing '2'. When next seen resting at 00:00:01.0 it is blue showing '2', while the hand simultaneously holds a second blue '3' cube. The lifted green cube cannot both remain in the hand and be replaced on the table by a different-colored cube, and the scene goes from 2 cubes to 3 with no off-screen exchange shown. A touch cannot recolor a cube green->blue. | severe | 0.8 |  |
| 2 | 00:03 | fourth cube in the row | object color permanence | The cube being placed at the 4th position is light-green showing '3' at ~00:00:03.5, but at 00:00:04.0 the cube resting in that position is orange/yellow showing '2'. Even allowing that a rotation could change the visible digit, it cannot change the body's color from green to orange; the held cube's color is not conserved across the placement. | moderate | 0.62 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | cube pair / left green cube | no duplication; identity persistence | Two cubes at 00:00 become three at 00:01. The hand continuously holds the single left cube and never exits the frame, yet a blue '2' cube is suddenly sitting on the table and the held cube is now a blue '3'. Additionally the original cube's body color changed green→blue with no visible recoloring cause. | severe | 0.9 |  |
| 2 | 00:03 | right green cube | no duplication | Hand rotates the right green cube (face 2→3) at 00:02.5; at 00:03 a green '2' cube rests on the table while the hand still holds a green '3' cube. One cube has become two (count 3→4) with no external source. | severe | 0.9 |  |
| 3 | 00:04 | held cube and new yellow cube | no duplication; no spontaneous transformation | Count rises 4→5: a yellow '2' cube materializes on the table, and the cube in the hand changes body color from green (00:03) through yellowish (00:03.5) to blue (00:04) with no visible cause. | severe | 0.9 |  |
| 4 | 00:05 | rightmost cubes | no duplication; no spontaneous transformation | Count rises 5→6: a light-blue '3' cube is newly placed at the right end while the hand holds yet another cube, and the held cube changes body color blue→green between 00:05.0 and 00:05.5 with no visible cause. | severe | 0.85 |  |
| 5 | 00:06 | cube row (positions 6-8) | no duplication; no spontaneous transformation | Count rises 6→8 across 00:06-00:07: green '5', green '2', and blue '3' cubes appear in succession while the hand always retains a cube, and the held cube again changes green→blue. Overall the clip goes from 2 cubes to 8 with no cube ever fetched from off-screen or introduced from a container. | severe | 0.85 |  |

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
| 1 | 00:08.083 | Red apple in woman's hands | object permanence / continuity | The woman clasps both hands around the apple at ~00:07.5, but by 00:08.1 the apple is gone from her clasped hands with no dropping, pocketing, or handoff motion shown; it remains absent through the end of the clip. | moderate | 0.85 |  |
| 2 | 00:03.541 | Blue umbrella canopy | color consistency | The umbrella canopy shifts from light sky-blue to dark navy around 00:03.5, stays dark through ~00:08.6, then appears light blue again at 00:09.1; the ambient lighting on the subject does not change enough to explain the fabric color flip. | minor | 0.55 |  |
| 3 | 00:04.041 | Fruit in lower-left crates | plausible object appearance | A crate of uniformly teal/cyan-colored round fruit appears at the lower-left stall (also visible at 00:04.5 and 00:05.5); no common produce matches that saturated cyan hue, suggesting a color-generation artifact. | minor | 0.5 |  |
| 4 | 00:00.000 | Hanging sign, upper-left stall | legible text | The white hanging sign shows garbled, non-readable pseudo-text/symbols (persists in multiple frames), a typical text-rendering artifact that would need cleanup for publishable footage. | minor | 0.6 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

_No findings._

### Contact, Interaction & Body Mechanics Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:08.625 | red apple in subject's hand | contact release without release event | The apple is continuously cradled in the subject's right palm with clear finger contact through ~00:07.0. Her hands then clasp around the umbrella shaft, and by 00:08.6 (rear view) both hands are visibly wrapped on the shaft with the apple absent. No dropping motion, transfer to a pocket, or hand-off occurs; the held object simply ceases to exist while grip configuration changes. Partial occlusion by her clasped fingers is possible but the apple (~8 cm red sphere) would likely remain partially visible given the open finger spacing. | moderate | 0.45 |  |

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

_No findings._

## woman-car

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:00 | station wagon interior / rearview mirror | object shape permanence | The object behind the windshield at top-center starts as a large black cross/plus-shaped mass and progressively morphs into a smaller T-shape and then a conventional rectangular rearview mirror by ~00:04, changing size and position with no explanation. | moderate | 0.75 |  |
| 2 | 00:00 | front license plate | text stability | The front plate reads 'STF197' in the opening frame but the trailing digits shift and garble in subsequent frames before the plate exits the frame, indicating unstable generated text. | minor | 0.7 |  |
| 3 | 00:01 | station wagon front fender | prop consistency | The small chrome emblems on the front fender just ahead of the driver's door change in number and arrangement between frames (a single badge vs. two stacked rectangles) before leaving the frame. | minor | 0.55 |  |
| 4 | 00:05 | whip antenna | physics of flexible objects in wind | As the car's apparent speed rises (background streaming, the woman's hair blowing nearly horizontal), the long flexible whip antenna remains perfectly ramrod vertical with no flex or sway, and its base position does not track consistently with the changing camera angle. | minor | 0.45 |  |
| 5 | 00:05 | road lane markings | road geometry consistency | A solid white edge line passes on the driver's (left) side of the car, inboard of the yellow dashed center line; for a left-hand-drive car in the right lane the yellow center line should be the marking nearest the driver's side, so the lane geometry is inverted or the car is inexplicably straddling markings. | minor | 0.4 |  |
| 6 | 00:05 | windshield wipers / hood cowl | prop consistency | The windshield wiper arms change configuration across the zoom, and small unexplained black stubs appear on the hood cowl in later frames that do not correspond to the wipers seen parked at the windshield base in early frames. | minor | 0.5 |  |
| 7 | 00:07 | woman / vehicle control | plausible vehicle operation | With the car clearly traveling at speed, the driver is leaned fully out of the window with both arms crossed on the door and no hands on the steering wheel for an extended period; no mechanism keeps the vehicle controlled (possibly an intentional stylistic choice, but practically implausible). | minor | 0.45 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:00 | object behind windshield (rearview mirror / dark silhouette) | identity & persistence (no unexplained transformation) | At 00:00–00:02 a large dark cross/figure-shaped mass fills the center of the windshield; over the following seconds it shrinks and resolves into a small standard rectangular rearview mirror mounted at the top of the glass. No visible action causes this change in size, shape, or position; the camera zoom alone cannot account for the object's proportions changing relative to the windshield. | moderate | 0.5 |  |

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Causal & Temporal Sequence Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:05 | woman's hair | proportionality & completion (effect scale outpaces its cause) | From 00:03.5 onward the background scrolls at a roughly constant rate, implying constant vehicle speed and therefore constant wind. Yet the hair goes from nearly motionless (00:00-00:04, including frames where the car already appears to be in motion) to fully horizontal streaming by 00:07-00:09, a several-fold increase in wind effect with no corresponding increase in vehicle speed, no gust cue (desert brush stays still), and no acceleration cue on the car body. Either the early calm hair lacks its wind cause or the late escalation lacks a proportional one. | minor | 0.55 |  |
