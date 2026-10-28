# Video QC Review — 2026-10-27_gemini-4-argon

Model: `google/gemini-4-argon`  |  Run started: 2026-10-28T01:22:26.544Z

For each finding, fill in **Verdict** with one of: `defect` (real, correctly identified), `false-positive`, `duplicate` (same defect as another row), `partial` (real defect, wrong description/time).

## Summary: findings per role

| Video | BASELINE generalist | character continuity | object persistence state | contact interaction kinematics | spatial topology occlusion | causal temporal sequence |
|---|---|---|---|---|---|---|
| _long-scene | 7 | 6 | 7 | 2 | 4 | 0 |
| child-marbles | 0 | 0 | 2 | 0 | 0 | 0 |
| dancer-mirror | 2 | 1 | 0 | 1 | 0 | 0 |
| dialogue | 1 | 0 | 3 | 0 | 1 | 0 |
| home-tour | 2 | 0 | 3 | 0 | 3 | 0 |
| man-cups | 4 | 0 | 3 | 2 | 2 | 3 |
| man-in-mirror | 2 | 0 | 0 | 0 | 0 | 2 |
| phone | 1 | 0 | 1 | 0 | 0 | 0 |
| pouring-olives | 4 | 0 | 4 | 0 | 0 | 1 |
| skateboarder | 3 | 0 | 2 | 0 | 0 | 0 |
| watchmaker | 0 | 0 | 0 | 0 | 0 | 0 |
| weird-blocks | 5 | 0 | 3 | 2 | 0 | 2 |
| woman-apple | 4 | 3 | 0 | 0 | 0 | 1 |
| woman-car | 1 | 0 | 0 | 1 | 1 | 0 |

**Totals:** 84 calls, 368,452 tokens, $1.0474. Errors: 0.

## _long-scene

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:19 | customer | spatial layout consistency | As the sound of an exterior door opening plays, the customer enters the diner by walking out from the doorway behind the counter next to the kitchen pass-through rather than from an entrance in the customer area. | minor | 0.85 |  |
| 2 | 00:28 | coffee carafe | fluid physics | When the waitress pours coffee into the mug, the glass carafe remains nearly horizontal with the liquid level flat and well below the spout, yet a stream of coffee pours straight down through the front of the pot. | moderate | 0.95 |  |
| 3 | 01:00 | plate of egg and toast | temporal and object continuity | At 00:32–00:44 (while it is dark outside), the plate of toast and eggs is already sitting on the counter in front of the man. At 01:00 (after sunrise), the plate has vanished from the counter, and at 01:09 the waitress brings out the same plate to serve him again, which he then declines. | moderate | 0.95 |  |
| 4 | 01:31 | background semi-truck | plausible vehicle motion | Through the window behind the waitress (left of center), a semi-truck on the road moves smoothly from left to right trailer-first, travelling backwards at highway speed. | moderate | 0.92 |  |
| 5 | 01:38 | cash bills | object identity consistency | Two hands enter from opposite sides of the frame to place money on the counter, and as the right hand slides across the bills, the top note morphs from a '1' denomination into a '100' denomination with a distorted portrait. | moderate | 0.96 |  |
| 6 | 01:46 | waitress's window reflection | optical reflection consistency | The waitress's reflection in the window shows her torso and hanging glasses facing toward the camera at an impossible angle relative to her body, and when she lowers her head and turns away at 01:48–01:49, her reflection remains frozen staring straight ahead. | severe | 0.98 |  |
| 7 | 01:51 | waitress | character uniqueness | As the waitress stands up from the stool and walks behind the counter on the right, an identical duplicate of the waitress (same blue shirt, white apron, hair bun, and glasses on a lanyard) materializes in the background near the kitchen window, leaving two copies of her in the scene simultaneously. | severe | 1 |  |

### Character Continuity Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:45 | Customer and Waitress | placement between cuts | From 00:36 to 00:44, the customer is seated at the counter angled toward the camera with the empty kitchen pass-through window visible directly behind him. Across the cut at 00:45, the waitress is suddenly standing at the pass-through window wiping it while the customer is in the background hunched over the counter facing right. | moderate | 0.9 |  |
| 2 | 00:51 | Customer (truck driver) | placement between cuts | The customer is seated at the diner counter prior to 00:51, but in the counter shot from 00:51 to 00:59 he has completely vanished from the stools, only to reappear seated in the exact same spot at the next cut at 01:00. | severe | 0.98 |  |
| 3 | 01:35 | Customer and Waitress | placement between cuts | In 01:27-01:34, both the customer and the waitress are seated side-by-side on the stools at the counter. At the cut at 01:35-01:36, the shot of the counter shows all stools completely empty with both characters gone, before cutting at 01:37 to a close-up of hands still interacting at the counter. | severe | 0.98 |  |
| 4 | 01:38 | Waitress | identity | In the close-up of the counter at 01:38, the second hand entering from the right to pat the customer's hand over the money is a weathered male-looking hand wearing a long-sleeved blue-and-white striped shirt cuff, whereas the waitress wears a short-sleeved light blue polo shirt with bare forearms throughout the scene. | moderate | 0.92 |  |
| 5 | 01:50 | Waitress | placement between cuts | At 01:46-01:49, the waitress is standing upright by the front window on the booth side of the diner watching the customer get into his truck. Across the immediate cut at 01:50, she is suddenly seated on the customer's stool at the counter leaning over the counter surface. | moderate | 0.92 |  |
| 6 | 01:51 | Waitress | multi-character consistency | As the waitress stands up from the stool at 01:51 and walks around the front of the counter to go behind it, a second identical copy of the waitress simultaneously appears behind the counter in the background wiping the surface, leaving two identical waitresses visible together through 01:58. | severe | 1 |  |

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:24 | Glass coffee carafe and wiping cloth | identity & persistence | At 00:21-00:23, the waitress is wiping the bare counter with a cloth in her right hand and no coffee pot is nearby. At 00:24, as she lifts her right hand from the counter, a full glass coffee carafe materializes directly in her hand in place of the cloth. | severe | 0.98 |  |
| 2 | 00:28 | Coffee in glass carafe | physical state transitions | From 00:28 to 00:31, a heavy stream of coffee pours continuously out of the glass carafe into the mug, but the liquid level inside the clear carafe never decreases. | moderate | 0.9 |  |
| 3 | 00:45 | Plate of toast and fried egg | identity & persistence | At 00:36-00:44, the plate of toast and egg sits on the counter directly in front of the man. In the following shots at 00:45-00:50 and 01:00-01:08, the plate has vanished from the counter in front of him without being eaten or cleared, before appearing again with the waitress at 01:09. | severe | 0.95 |  |
| 4 | 01:12 | Two white coffee mugs | identity & persistence | At 01:09-01:12, the man has a white coffee mug on the counter in his left hand while the waitress sets a second white coffee mug down next to it into his right hand. At 01:13-01:14, as the waitress lets go and the man brings his hands together, the two side-by-side mugs merge into a single mug. | severe | 0.99 |  |
| 5 | 01:18 | Plate of toast and fried egg | ownership & possession | At 01:15-01:17, the waitress picks up the untouched plate of food with both hands and walks away with it. On the cut to 01:18, the plate has vanished from her hands (replaced by a coffee mug), vanishes again from the counter in the close angle at 01:27-01:34, and reappears on the counter at 01:50. | moderate | 0.93 |  |
| 6 | 01:41 | Truck outside diner | identity & persistence | In the opening shot at 00:00-00:09, the truck parked outside the diner is a white aerodynamic sleeper semi-cab. When the driver walks back out to his truck at 01:41, it has transformed into a dark green straight box truck with a white stripe. | moderate | 0.9 |  |
| 7 | 01:52 | White coffee mug near condiment station | identity & persistence | At 01:50-01:51, a second white coffee mug is sitting on the counter just to the left of the condiment station while the waitress picks up the first mug and plate. As she walks past at 01:52, the second mug remaining on the counter vanishes into thin air. | severe | 0.96 |  |

### Contact, Interaction & Body Mechanics Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:12 | waitress's coffee mug and customer's coffee mug | solidity (object pass-through and merging) | While the customer holds a white coffee mug on the counter with both hands, the waitress lifts a second white mug with her right hand and brings it into the exact same space; the two solid mugs clip through each other and merge into a single mug within the customer's hands by 01:13. | severe | 0.98 |  |
| 2 | 01:52 | waitress and diner counter | solidity (body clipping through solid structure) | After standing up from a stool on the customer side of the counter at 01:51 and reaching for the mug, the waitress steps forward and walks directly through the solid counter body and stools at 01:52, emerging on the employee side behind the counter at 01:53. | severe | 1 |  |

### Spatial Topology & Occlusion Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:19 | Left wall and booth area of the diner | scene layout | In the interior shot at 00:10 (and repeated at 00:51 and 01:35), the wall immediately to the left of the kitchen pass-through terminates after a short panel into a glass door/window wall right next to the counter aisle. When the camera cuts to a wider shot along the same axis at 00:19, that wall is gone and replaced by a wide dining area containing a row of booths and a window with a neon OPEN sign. | moderate | 0.95 |  |
| 2 | 00:36 | Man at counter | viewpoint consistency | At 00:25, the man sits on a stool midway down the straight section of the counter facing right. After close-ups of the coffee and plate, the wide shot at 00:36 shows him seated at the far foreground curved end of the counter facing the camera, before he is seen back midway down the straight counter in the reverse angle at 00:45 and wide shot at 01:00. | moderate | 0.9 |  |
| 3 | 01:27 | Man and Waitress relative positions | viewpoint consistency | In the wide shot at 01:22-01:26 (looking toward the back kitchen pass-through), the waitress sits down on a stool to the man's left, placing her closer to the back kitchen and the man closer to the front of the diner. When the camera cuts at 01:27 to the reverse angle looking toward the front of the diner (with the front beverage cooler in the background), their relative positions along the counter are inverted: the man is in the foreground (kitchen side) and the waitress is in the background to his right (front entrance side). | severe | 0.98 |  |
| 4 | 01:51 | Waitress and diner counter | depth ordering & occlusion | After standing up from the stool on the customer (left) side of the unbroken counter at 01:51, the waitress walks rightward directly through the solid counter structure at 01:52 to emerge in the service area behind the counter at 01:53. | severe | 0.99 |  |

### Causal & Temporal Sequence Observer

_No findings._

## child-marbles

### Generalist QC Baseline

_No findings._

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | red ball | identity & persistence | At 00:01, the child holds a third red ball above the bowl while two red balls remain stationary inside the bowl (making 9 balls total). At 00:02, as the child lowers his hands, this third red ball vanishes into the center red ball, leaving only 2 red balls (8 balls total) in the bowl. | severe | 0.98 |  |
| 2 | 00:07 | colored balls in bowl | identity & persistence | As the child stirs the balls from 00:06 to 00:09, the balls spontaneously change color and count: from 2 red, 3 green, and 3 yellow balls at 00:05, they shift to 3 red, 1 green, and 2 yellow balls at 00:07, then to only 1 yellow ball and a half-green/half-red ball at 00:08, and by 00:09 the yellow ball on the far right transforms into a red ball. | severe | 0.98 |  |

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
| 1 | 00:02 | Foreground dancer | Anatomical continuity and mirror consistency | The foreground dancer abruptly flips orientation for a brief moment: her raised right arm vanishes and an arm instead extends upward from her left shoulder, while a severed portion of her lowered left arm (with the elbow tattoo) remains visible against her left torso, and her leg stance reverses. Simultaneously, her reflection in the mirror remains unflipped with the viewer-right arm raised. | severe | 0.99 |  |
| 2 | 00:00 | Mirror reflection (legs) | Reflection geometry consistency | The dancer's lower-body stance in the mirror contradicts her actual stance in the foreground (most pronounced at 00:05–00:09). The foreground dancer supports her weight on her right leg (closer to the barre) and extends/points her left foot toward the doors on the left, whereas the reflection supports weight on the leg closer to the doors and extends/points the leg closer to the barre on the right. | severe | 0.95 |  |

### Character Continuity Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:02 | Female dancer | movement and identity continuity | Between 00:01 and 00:03, while raising her right arm with her weight on her right leg, the foreground dancer abruptly snaps at 00:02 into an opposite pose with her left arm raised overhead, right arm down, weight shifted onto her left leg, and her right-shoulder tattoo missing, while her mirror reflection continues to show her right arm raised overhead; at 00:03 she instantaneously snaps back to having her right arm raised and right-shoulder tattoo visible. | severe | 0.99 |  |

### Object Persistence & Physical State Observer

_No findings._

### Contact, Interaction & Body Mechanics Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:02 | dancer's arms and torso | limb mechanics and continuous trajectory | As the dancer holds her right arm overhead at 00:01, her limb configuration snaps impossibly at 00:02: the raised right arm disappears from her right shoulder and an upright arm extends from her left shoulder instead while a segment of her tattooed left forearm remains at her waist, before snapping back to a raised right arm and lowered left arm at 00:03. | severe | 0.98 |  |

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

_No findings._

## dialogue

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:07 | Background wall layout and hanging blue coat | Spatial and object continuity | From 00:00 to 00:07, the man stands to the right of a plain blue coat, with an olive-green wall strip (featuring a mounted wooden box) separating the door behind him from the framed picture on the far right. As the man turns left at 00:07 and his body occludes the background, the right half of the door and the green wall strip with the wooden box vanish completely; by 00:08, the blue coat emerges behind his back with an added white stripe and is now positioned directly adjacent to the framed picture. | severe | 0.98 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:08 | round brass medallion | identity & persistence | The circular ornate brass medallion mounted on the door rail directly above the coat hook vanishes completely as the man turns to his right. | moderate | 0.95 |  |
| 2 | 00:08 | hanging blue jacket | identity & persistence | The solid dark blue jacket hanging on the door hook spontaneously develops a thick white stripe across its lower half without anyone touching it. | moderate | 0.95 |  |
| 3 | 00:08 | framed picture | location & orientation | The framed picture originally hanging on a separate door to the right of the green wall strip shifts onto the previously bare right panel of the door with the coat hook, and its artwork changes from a bird illustration to a symmetrical emblem. | severe | 0.95 |  |

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:08 | back wooden door and right wall layout | scene layout | From 00:00 to 00:07, the panel immediately to the right of the hanging blue coat (behind the man's head) is a plain recessed wooden door panel, followed to the right by the door casing, a narrow green wall strip with a wooden switch box, and a separate door holding a framed picture. When the man turns left and the camera pans left at 00:08-00:09, the layout directly to the right of the blue coat changes: the plain panel behind where his head was now contains a framed picture right next to the coat, the round brass ornament above the coat vanishes, and a glass window pane appears where the doorframe and green wall strip were located. | severe | 0.98 |  |

### Causal & Temporal Sequence Observer

_No findings._

## home-tour

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:07 | house architecture and kitchen layout | spatial and architectural consistency | After the woman turns 90 degrees right from the kitchen into a bedroom at 00:03, she turns left inside the bedroom and walks toward another doorway that impossibly leads back into a mutated version of the same kitchen and hallway. The framed blue-flower artwork from the kitchen wall (00:02) reappears inside the bedroom to the left of this doorway (00:07), and by 00:09 the kitchen layout has changed—a microwave is now mounted above the stove on the left instead of sitting on the right counter as seen at 00:00, and the back hallway configuration is altered. | severe | 0.98 |  |
| 2 | 00:08 | woman's left hip / hand | anatomical consistency | As the woman steps through the doorway at 00:08, a distorted, fleshy hand-like appendage or garbled object briefly materializes and morphs along her left hip. | moderate | 0.93 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:07 | Framed floral collage picture | location & orientation | The framed floral collage picture that hangs on the kitchen wall at 00:00-00:03 unexplainedly appears on the interior bedroom wall to the left of the doorway at 00:07. | moderate | 0.92 |  |
| 2 | 00:08 | Framed wall artwork and tabletop photo beside bedroom doorway | identity & persistence | At 00:06, the framed artwork above the small side table has a wide mat with a small muted center image, and a small horizontal photo sits on the table below it. By 00:08, after the woman passes in front of them, the wall art transforms into a large colorful painting with green and blue shapes, and the tabletop frame changes into a larger arched portrait. | moderate | 0.95 |  |
| 3 | 00:09 | Red kettle and stove range hood / microwave | identity & persistence | At 00:01-00:02, a red kettle sits on the stove beneath a stainless steel range hood (while the microwave sits on the opposite counter at 00:00). At 00:09, the red kettle has vanished from the stove and the range hood above the stove has transformed into a built-in microwave. | severe | 0.96 |  |

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | kitchen right wall and doorway | scene layout | At 00:00, the grey wall with the vertical framed picture terminates immediately to its right at an inside corner with wooden upper cabinets, a tile backsplash, and a counter holding a microwave. As the camera moves forward between 00:01 and 00:03, that cabinet and counter corner disappears from beside the picture, replaced by an extension of the grey wall (with a small horizontal picture and light switch) and a doorway leading into a bedroom. | severe | 0.98 |  |
| 2 | 00:06 | bedroom doorway and wall layout | connectivity | The woman turns 90 degrees right from the kitchen at 00:03 to enter the bedroom, facing the bed on the far wall. At 00:06-00:07, she turns 90 degrees left (rather than turning 180 degrees back toward the doorway she entered) and walks through a doorway on the perpendicular wall that impossibly connects straight back into the kitchen along her original direction of travel. Additionally, the vertical framed picture that was on the kitchen wall at 00:00-00:03 is now hanging inside the bedroom to the left of this doorway at 00:07. | severe | 0.99 |  |
| 3 | 00:09 | kitchen architecture and fixtures | scene layout | When the woman exits the bedroom back into the kitchen at 00:08-00:09, the kitchen's fixed layout has changed compared to 00:00-00:02: a stainless steel microwave is now mounted under the cabinets above the stove on the left, the right side of the hallway opening now has a small framed picture and a window curtain, and the far white door now has exposed glass panes instead of sheer curtains. | severe | 0.98 |  |

### Causal & Temporal Sequence Observer

_No findings._

## man-cups

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:03 | center cup | object permanence | From 00:00 to 00:02, the center cup is filled to the brim with coins, with a large coin clearly visible at the top rim. Between 00:02 and 00:03, the coins inside the cup vanish completely without being touched. | severe | 0.98 |  |
| 2 | 00:04 | coin in man's right hand and front cup | physical plausibility and solidity | As the man lowers the gold coin held in his right hand toward the front cup, the coin clips through the rim and flattens like a decal onto the outside wall of the cup (00:04-00:05), morphs into a larger yellow blob at 00:06, and disappears by 00:07. | severe | 0.99 |  |
| 3 | 00:04 | coin in man's left hand | object permanence and solidity | A gold coin held in the man's left hand at 00:03 vanishes at 00:04 as he grasps the back cup, then a yellow disc-like shape appears fused to the exterior side of that cup at 00:06 before disappearing at 00:07. | moderate | 0.95 |  |
| 4 | 00:06 | man's neckwear | attribute consistency | At 00:05, the man is wearing only a dark bowtie with a white dress shirt visible underneath. At 00:06, a bright red necktie materializes down his chest while the dark bowtie remains at his collar. | moderate | 0.95 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:03 | Coins inside the center cup | identity & persistence | From 00:00 to 00:02, the center cup is filled to the brim with large gold coins. At 00:03, the coins inside the cup vanish completely without anyone touching the cup, leaving the interior empty. | severe | 0.99 |  |
| 2 | 00:04 | Gold coin in right hand and on foreground cup | location & orientation | The gold coin held above the foreground cup at 00:03 phases onto the outer vertical wall of the cup at 00:04–00:06, disappears at 00:07, and reappears between the man's fingers at 00:08–00:09. | severe | 0.96 |  |
| 3 | 00:04 | Gold coin on tabletop in front of foreground cup | identity & persistence | A large gold coin spontaneously appears on the beige tabletop directly in front of the foreground cup at 00:04 in a spot that was visibly empty at 00:00–00:02, without anyone placing it there. | moderate | 0.94 |  |

### Contact, Interaction & Body Mechanics Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:04 | Man's right hand, gold coin, and leftmost cup | solidity and weight support | As the man's right hand lowers the coin toward the cup opening at 00:03, the coin clips through the cup rim at 00:04 and becomes plastered vertically against the outside wall of the cup. From 00:05 to 00:06, his fingers only touch the top rim while the coin remains stuck to the smooth vertical side of the cup with no grip or physical support. | severe | 0.95 |  |
| 2 | 00:05 | Man's left hand, gold coin, and rightmost cup | weight support and contact points | While the man's left fingers rest on the upper back rim of the rightmost cup, a gold coin appears stuck vertically against the front exterior wall of the cup at 00:05-00:06 with no fingers touching or supporting it against gravity. | severe | 0.92 |  |

### Spatial Topology & Occlusion Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:04 | Front-left cup and gold coin (and rightmost cup at 00:06) | depth ordering & occlusion | After the man places a gold coin at the rim of the front-left opaque cup at 00:03, the coin renders directly on top of the nearer opaque exterior wall of the cup from 00:04 to 00:06 rather than being occluded inside the cup; a second coin similarly renders over the opaque front wall of the rightmost cup at 00:06. | moderate | 0.92 |  |
| 2 | 00:07 | Four cups on the tabletop | viewpoint consistency | At 00:05-00:06, the four cups are arranged in a wide colinear row spanning across the beige circle between the man's two hands. As the camera orbits slightly to the right between 00:06 and 00:07, the rightmost cup under his left hand disappears and a fourth cup emerges behind the leftmost cup, shifting the layout into a compact 2x2 cluster that is geometrically incompatible with the previous camera angle. | moderate | 0.88 |  |

### Causal & Temporal Sequence Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | right hand and coin | action completion and temporal flow | The right hand lowers a coin into the front cup at 00:01, but the placement never completes; the coin re-emerges in the fingers at 00:02 and adheres to the outside of the cup at 00:04. | moderate | 0.7 |  |
| 2 | 00:02 | center cup and table coins | effect without cause | The coin resting on the middle cup vanishes and a new coin appears on the felt beside the front cup between 00:02 and 00:03 with no hand contact. | moderate | 0.7 |  |
| 3 | 00:03 | metal cups | effect without cause | Between 00:03 and 00:05, the staggered cups align into a straight row even though the man's hands never push the inner cups. | moderate | 0.65 |  |

## man-in-mirror

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:00 | mirror reflection | reflection consistency | In the foreground, the man's right hand holds the tool tucked low against his jawline and chin, whereas in the mirror reflection the tool is positioned high up directly over his upper lip and mustache. | moderate | 0.92 |  |
| 2 | 00:02 | grooming tool and action | object permanence and action plausibility | The implement in the man's hand morphs from a toothbrush-like stick at his mouth into a tiny comb/razor that he runs across his eyebrow and scalp hair (00:02-00:04), and then holds hovering against his cheek (00:06-00:09), all while continuous tooth-brushing sound effects play. | severe | 0.98 |  |

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
| 1 | 00:00 | mirror reflection | proportionality & synchronous cause-effect | The reflection's hand position and head movements do not match the foreground man's actions in scale, position, or timing. | moderate | 0.7 |  |
| 2 | 00:05 | foreground man and reflection | temporal flow and action completion | Motion resets to the initial pose at 00:05 and then stalls with the brush hovering static in mid-air from 00:06 to 00:09. | moderate | 0.65 |  |

## phone

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:03 | smartphone screen | text and UI consistency | The text and interface elements on the smartphone screen are nonsensical and unstable. The central text starts as 'ƛ742' (00:00–00:02), morphs into 'A̅7·42' surrounded by garbled status bar symbols ('7.42', '4.41', 'A¯A', 'AZ - 12') as focus racks to the screen (00:03–00:07), and then warps into illegible scribbles as the phone tilts down at 00:09. | severe | 0.95 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:02 | red bag | identity & persistence | The bright red bag carried in the left hand of the person walking away in the background vanishes into thin air between 00:01 and 00:02, leaving their visible left hand completely empty without any action of setting it down. | severe | 0.95 |  |

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
| 1 | 00:01 | Olives | Attribute consistency (color change) | The small glass cup held by the person contains only bright green olives at 00:00, but as they drop into the large jar between 00:01 and 00:03, several of the olives inexplicably turn dark purple/black. The same defect occurs with the second cup between 00:06 and 00:09, where green olives turn dark purple in the cup and jar. | severe | 0.98 |  |
| 2 | 00:05 | Person's shirt | Wardrobe continuity | From 00:00 to 00:04, the person's dark blue shirt is buttoned up with no undershirt visible. Across the jump cut at 00:05, the shirt is suddenly unbuttoned and open, revealing a white t-shirt underneath. | moderate | 0.99 |  |
| 3 | 00:05 | Small clear bottle on countertop | Object permanence / continuity | From 00:00 to 00:04, the counter surface immediately to the right of the metal bowl is empty. At 00:05, a small clear bottle with a white top suddenly appears beside the metal bowl. | moderate | 0.99 |  |
| 4 | 00:05 | Large glass jar | Object consistency | From 00:00 to 00:04, the right side of the jar's upper neck has a bare glass lug. At 00:05, a metal wire loop/clasp suddenly appears attached to the right side of the jar's neck. | minor | 0.95 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | Olives | identity & persistence | The small glass cup held by the person contains only bright green olives at 00:00, yet as they fall into the large glass jar (00:01-00:03, and again at 00:07-00:09), many of them transform into dark purple/black olives inside the jar. | severe | 0.98 |  |
| 2 | 00:05 | Small bottle with white cap | identity & persistence | A small clear bottle with a white cap spontaneously appears on the countertop between the metal bowl and the ceramic bowl at 00:05 with no visible action placing it there. | severe | 0.99 |  |
| 3 | 00:05 | Metal bowl contents and small glass cup | physical state transitions | At 00:04 the person briefly reaches toward the metal bowl with one hand while holding the empty glass cup in the other; without any scooping or pouring action, by 00:05 the small glass cup is suddenly full of green olives again while the metal bowl's green olives have vanished and been replaced by a few small brownish remnants. | severe | 0.97 |  |
| 4 | 00:06 | Large glass jar | identity & persistence | The small pointed glass lug/spout on the upper-right neck of the large jar (visible from 00:00 to 00:05) morphs into a larger rounded glass loop handle at 00:06. | moderate | 0.92 |  |

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:04 | man's hands and metal bowl contents | proportionality and action completion | The man initiates a reach into the metal bowl at 00:04, but without completing a scooping or refilling motion, the bowl's contents abruptly deplete at 00:05 while an already-filled glass container emerges in his hands. | moderate | 0.7 |  |

## skateboarder

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | skateboarder's shadow | shadow consistency | Although the sun is directly behind the skateboarder, his shadow on the concrete ramp completely disappears during his jump from 00:01 to 00:03 before suddenly reappearing at 00:04. | moderate | 0.9 |  |
| 2 | 00:03 | skateboard | object permanence and rigidity | As the skateboarder lands, the right half of the skateboard and its front truck vanish/warp out of existence while his right foot touches the ground, before the board reforms intact at 00:04. | severe | 0.98 |  |
| 3 | 00:08 | skateboard | object permanence and structural integrity | During the second jump at 00:08, the left truck and wheels completely disappear from the underside of the airborne skateboard; upon landing at 00:09, the deck severely warps and splits into deformed fragments beneath the skater's feet. | severe | 0.99 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:03 | skateboard | identity & persistence | As the skater lands the first trick, the front half of the skateboard under his left foot disappears, then spontaneously reappears intact by 00:04. | severe | 0.92 |  |
| 2 | 00:08 | skateboard | identity & persistence | While the skateboard is mid-air during the second jump, the left truck and wheels vanish completely from the underside of the deck, and upon landing at 00:09 the deck morphs into two separate, tiny fragments. | severe | 0.98 |  |

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
| 1 | 00:01 | First and second blocks | Object permanence and attribute consistency | The leftmost green '2' block spontaneously changes color to blue while a new blue '3' block materializes out of thin air under the person's fingers. | severe | 1 |  |
| 2 | 00:02 | Third block (green) | Object permanence and attribute consistency | When the hand grabs the green '2' block, its digit morphs into a '3'. At 00:03, the block reverts to a green '2' while splitting to spawn a fourth block (green '3') under the hand. | severe | 1 |  |
| 3 | 00:04 | Fourth and fifth blocks | Object permanence and attribute consistency | The fourth block (previously a green '3') inexplicably changes into a beige '2', while a fifth block (light blue '3') materializes under the hand. | severe | 1 |  |
| 4 | 00:05 | Sixth and seventh blocks | Object permanence and attribute consistency | A sixth block (blue '3') splits out from the fifth block at 00:05, then morphs into a green '5' at 00:06 as a seventh block (green '3') spawns under the hand. | severe | 1 |  |
| 5 | 00:07 | Seventh and eighth blocks | Object permanence and attribute consistency | The seventh block's digit morphs from '3' to '2' as an eighth block (blue '3') spawns under the hand; at 00:08, the eighth block's digit morphs from '3' into '6'. | severe | 1 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | First and second number blocks | identity & persistence | The green '2' block held at position 1 inexplicably changes color into a blue '2' block, while a new blue '3' block spontaneously materializes under the hand at position 2 without the hand bringing any new object into frame. | severe | 0.99 |  |
| 2 | 00:02 | Third and fourth number blocks | identity & persistence | The green '2' block at position 3 morphs its front digit into a '3' at 00:02, then reverts to a green '2' at 00:03 as a fourth block (green '3') spontaneously spawns under the hand. | severe | 0.99 |  |
| 3 | 00:04 | Fourth through eighth number blocks | identity & persistence | As the hand moves rightward from 00:04 to 00:08, four additional blocks spontaneously materialize one by one under the fingers while each previously touched block changes color and digit (green '3' becomes tan '2' at 00:04; blue '3' becomes green '5' at 00:06; green '3' becomes green '2' at 00:07; blue '3' becomes blue '6' at 00:08). | severe | 0.99 |  |

### Contact, Interaction & Body Mechanics Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | Green block on the right | contact points | The standalone green block initially at the second position shifts rightward to the third position to make room for the blue '3' block without the hand making physical contact to push it. | moderate | 0.9 |  |
| 2 | 00:02 | Numbered blocks | solidity | From 00:02 through 00:07, each time the hand grips and twists the rightmost block and pulls it to the right, a second solid block emerges from inside the same physical volume, with the two blocks clipping through each other as they separate. | severe | 0.98 |  |

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | numbered blocks | proportionality and plausible cause-effect | Pulling a block rightward repeatedly causes new blocks to spawn and split off from existing blocks rather than simply moving the grabbed block. | moderate | 0.75 |  |
| 2 | 00:07 | hand | temporal flow | The hand exhibits discontinuous, choppy motion as it jumps from the rightmost block back to the center blocks. | minor | 0.65 |  |

## woman-apple

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | left market stall and vendor | background continuity / compositing wipe | As the woman in the light blue shirt and the man in the white shirt walk from left to right between 00:01 and 00:04, a visible compositing wipe follows them across the left market stall: the vendor in the dark blue shirt, the blue plums, and the red tomatoes disappear and are replaced by a seated man wearing a face mask and crates of orange and teal fruit. | severe | 0.98 |  |
| 2 | 00:01 | background pedestrians on the right | temporal and spatial continuity | The pedestrians on the right side of the aisle (man in green, woman in purple, woman in red) remain completely frozen in a still frame from 00:00 to 00:04 while foreground pedestrians walk past in real time, and then abruptly vanish behind the central woman and the man in the white shirt between 00:04 and 00:06. | severe | 0.98 |  |
| 3 | 00:05 | fruit crates on the left stall | color consistency | The fruit crates and the produce inside them on the left stall unnaturally shift colors across frames—showing teal-dyed fruit in a teal crate next to orange fruit in a purple crate at 00:05, which then abruptly turn entirely bright purple (both crate and fruit) at 00:06. | moderate | 0.95 |  |
| 4 | 00:08 | red object in the central woman's hands | object permanence | The bright red spherical object (ball or apple) held between the central woman's hands from 00:00 to 00:07 abruptly vanishes between 00:07 and 00:08, leaving her hands holding only the umbrella shaft. | severe | 0.99 |  |

### Character Continuity Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | Vendor in dark blue shirt | movement continuity / unexplained disappearance | At 00:00, a vendor in a dark blue t-shirt is standing behind the left produce stall leaning over the tomatoes. By 00:01, before the pedestrian in the light blue shirt even reaches his position to occlude him, he completely vanishes from behind the stall as a static background plate takes over. | severe | 0.95 |  |
| 2 | 00:03 | Woman in light blue t-shirt and Right-side background pedestrians | movement continuity and multi-character consistency | The pedestrians on the right side of the aisle (man in light green t-shirt, woman in purple top, woman in red polo) are frozen in a static split-screen plate from 00:00 to 00:05. When the woman in the light blue t-shirt walks behind the main woman at 00:02, she fails to emerge on the right at 00:03 because the frozen plate masks her out. At 00:04, the mask shifts right, causing the woman in the light blue t-shirt to suddenly appear while the frozen man in the light green t-shirt vanishes in place (followed by the woman in purple vanishing at 00:05). | severe | 0.98 |  |
| 3 | 00:04 | Man in white short-sleeve shirt and glasses | movement continuity / temporary disappearance | At 00:03, the man in the white shirt is walking away directly to the left of the main woman. At 00:04, a static background plate wipes over the left stall and completely erases him before he has passed behind the main woman, leaving him entirely absent from the frame at 00:04 until he suddenly reappears on the right side of the main woman at 00:05. | severe | 0.98 |  |

### Object Persistence & Physical State Observer

_No findings._

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:00 | central woman with umbrella and background pedestrians | temporal flow | The central woman and several background pedestrians remain completely frozen mid-stride throughout the shot while foreground walkers move normally. | moderate | 0.7 |  |

## woman-car

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:00 | woman and station wagon | physical_plausibility_and_object_intersection | The woman is positioned impossibly in the middle of the car's hood and cowl area directly in front of the closed windshield, with her torso emerging straight out of the solid metal hood and engine bay. | severe | 1 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

_No findings._

### Contact, Interaction & Body Mechanics Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:00 | woman's torso and lower body / car fender and cowl | solidity | The woman's upper body emerges directly out of the solid metal cowl/fender area in front of the closed windshield and above the front wheel well, with her torso and lower body completely clipping through the solid structure of the car. | severe | 0.99 |  |

### Spatial Topology & Occlusion Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:00 | Woman and station wagon body | impossible geometry / depth ordering & occlusion | The woman is spatially positioned in front of the windshield, wipers, and driver-side A-pillar, with her crossed arms resting on the hood and her lower torso disappearing directly into the solid metal of the hood and front-left fender rather than emerging from a window or cabin opening. | severe | 0.98 |  |

### Causal & Temporal Sequence Observer

_No findings._
