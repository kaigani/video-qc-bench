# Video QC Review — 2026-08-14_gemini-pro-latest

Model: `~google/gemini-pro-latest`  |  Run started: 2026-08-14T22:20:10.206Z

For each finding, fill in **Verdict** with one of: `defect` (real, correctly identified), `false-positive`, `duplicate` (same defect as another row), `partial` (real defect, wrong description/time).

## Summary: findings per role

| Video | BASELINE generalist | character continuity | object persistence state | contact interaction kinematics | spatial topology occlusion | causal temporal sequence |
|---|---|---|---|---|---|---|
| _long-scene | 3 | 1 | 3 | 1 | 2 | 0 |
| child-marbles | 1 | 3 | 1 | 3 | 1 | 1 |
| dancer-mirror | 1 | 1 | 0 | 1 | 1 | 2 |
| dialogue | 2 | 0 | 2 | 0 | 1 | 0 |
| home-tour | 2 | 5 | 3 | 0 | 2 | 0 |
| man-cups | 1 | 0 | 3 | 1 | 3 | 1 |
| man-in-mirror | 2 | 0 | 2 | 2 | 1 | 2 |
| phone | 1 | 2 | 1 | 1 | 0 | 2 |
| pouring-olives | 2 | 1 | 3 | 3 | 2 | 2 |
| skateboarder | 1 | 1 | 1 | 1 | 2 | 1 |
| watchmaker | 1 | 0 | 1 | 0 | 0 | 0 |
| weird-blocks | 1 | 0 | 4 | 0 | 0 | 2 |
| woman-apple | 1 | 1 | 3 | 2 | 2 | 1 |
| woman-car | 3 | 0 | 1 | 1 | 1 | 1 |

**Totals:** 84 calls, 323,256 tokens, $2.1495. Errors: 0.

## _long-scene

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:27 | coffee pot | Physics/Liquid Dynamics | Coffee pours out of the glass carafe, but the top half of the carafe is completely transparent and empty, while a solid black mass of liquid appears at the bottom. | severe | 0.99 |  |

KT: Correct, I'd call it P3, not severe.

| 2 | 01:41 | truck | Continuity | The truck parked outside the diner has changed from white (as seen in the opening shot at 00:00) to dark green. | severe | 0.99 |  |

KT: Correct, P1

| 3 | 01:41 | truck trailer reflection | Physics/Optics | An oversized, perfectly clear image of the waitress's face appears on the side of the truck trailer. It does not behave like a natural reflection in terms of scale, distortion, or the woman's actual position. | severe | 0.95 |  |

KT: False positive, this is a reflection on the glass not the truck.

### Character Continuity Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:51 | Waitress | character duplication | As the main waitress stands up and walks to the right to clear the counter, a second woman wearing the exact same uniform (blue polo, white apron) and hairstyle walks from right to left in the background kitchen area. | severe | 0.99 |  |

KT: Correct, noted in my review

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:50 | Man's coffee mug | identity & persistence | The mug was left on the counter next to the money. In the wide shot at 01:50, the counter in front of the man's seat is bare and the mug has disappeared. | severe | 0.99 |  |

KT: Patially correct, Mug has moved on counter, P3

| 2 | 01:50 | Man's plate | identity & persistence | The man's plate of food was on the counter in front of him. At 01:50, the plate is no longer on the counter, having vanished without a visible action. | severe | 0.99 |  |

KT: False positive, She takes the plate away, 1:15 (also Gemini's timestamp is off)

| 3 | 01:50 | Money (two bills) | identity & persistence | The man placed the money on the counter at 01:38. In the shot at 01:50, the money is gone from the counter without anyone picking it up. | severe | 0.99 |  |

KT: Not the correct error, the two versions of the man's hand is the error

### Contact, Interaction & Body Mechanics Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 01:50 | woman's right hand and mug | contact points (floating grip) | The woman reaches for the white mug on the counter, but her fingers form a loose shape next to it rather than wrapping around the handle or the body of the cup. The mug lifts into the air, moving in tandem with her hand, despite no physical gripping contact being established. | severe | 0.95 |  |

KT: False positive, there is another issue with her placing the mug as I noted in the review


### Spatial Topology & Occlusion Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:45 | pass-through opposite wall | scene layout | The view looking out from the kitchen pass-through shows a solid wall with an EXIT door behind the booths. Based on the wide shots establishing the room's layout (e.g., 00:19), the wall opposite the counter should be a continuous large window wall. | severe | 0.99 |  |

KT: Correct, noted in my review

| 2 | 01:50 | front door | scene layout | The front door of the diner is missing. In all previous wide shots looking down the counter (e.g., 00:19, 01:00, 01:18), a glass door is clearly visible to the right of the window with the 'OPEN' sign. In this shot, that space is filled by a solid wall panel. | severe | 0.99 |  |

KT: Correct, interior layout problems noted in my review


### Causal & Temporal Sequence Observer

_No findings._

## child-marbles

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:05 | balls in bowl | Solid object physics | When the child's hand begins to spin the balls, the balls lose their solid shapes and merge into a blurry, liquid-like state that defies physics. | severe | 1 |  |

KT: Correct

### Character Continuity Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | Young boy (left hand) | movement continuity | Before the cut, the boy's left hand rests on the rim of the glass bowl. After the cut, it instantly teleports to an elevated position above the bowl, holding a ball alongside his right hand. | moderate | 0.95 |  |
| 2 | 00:02 | Young boy (right hand) | movement continuity | Before the cut, the boy's right hand is resting on the right side of the bowl's rim. After the cut, it instantly appears in mid-air above the center of the bowl. | moderate | 0.95 |  |
| 3 | 00:05 | Young boy (right hand) | movement continuity | Before the cut, the boy's right hand is moving slowly inside the bowl. After the cut, it instantly transitions to a very rapid, blurred swirling motion without any time for acceleration. | moderate | 0.9 |  |

KT: Blurring is a fair observation, the notes don't match my review

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:05 | Colorful balls in bowl | Identity & Persistence | The solid, opaque balls (red, yellow, green) inside the bowl abruptly transform into translucent, hollow, shell-like objects as the child begins to mix them. The original solid objects vanish and are replaced by these new objects without any logical physical transition. | severe | 1 |  |

KT: Seems correct, doesn't name the red ball duplication

### Contact, Interaction & Body Mechanics Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:02 | child's left hand and colored balls | solidity | As the child's left hand reaches into the bowl, the fingers pass directly through the solid structure of the red and green balls. | severe | 0.95 |  |
| 2 | 00:05 | child's left hand and colored balls | solidity | While swirling the balls, the fingers of the child's left hand are completely submerged inside the volume of the solid balls without displacing them. | severe | 0.99 |  |
| 3 | 00:06 | colored balls | solidity | During the swirling motion, the colored balls clip through each other and morph together, losing their solid spherical form. | severe | 0.95 |  |

KT: Mostly correct

### Spatial Topology & Occlusion Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:00 | background environment | scene layout | In the initial shot, the background visible beyond the paving stones is a flat edge of dirt or grass. After the cut to a wider angle at 00:00, the background layout changes entirely, revealing a row of large terracotta pots lined up on a ledge or step that should have been visible in the geometry of the first shot. | severe | 0.95 |  |

KT: False positive, it seems like Gemini is eager to give any positive result even if there is none in this category

### Causal & Temporal Sequence Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:05 | Child's hand and balls | Proportionality & Completion | The rapid, continuous circular motion of the balls does not correspond to the movement of the child's hand. The hand's motion does not impart the correct force or direction to cause this effect, and the fingers appear to morph and dissolve as they pass through the balls, failing to complete a physical interaction. | severe | 0.95 |  |

KT: Correct

## dancer-mirror

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:06 | Reflection woman | Anatomical Integrity | As the woman in the reflection raises her left arm for the second time, her hand is completely missing, leaving her arm to end in a stump. The foreground woman's corresponding hand remains fully intact and visible. | severe | 0.99 |  |

KT: False positive, her hand is raised out of the framing of the shot, which makes sense

### Character Continuity Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:00 | Reflection | Identity | The woman in the foreground has tattoos on her left arm and a bare right arm. Her reflection in the mirror incorrectly shows tattoos on her right arm and a bare left arm. When she raises her bare right arm, the reflection raises a tattooed right arm. | severe | 1 |  |

### Object Persistence & Physical State Observer

_No findings._

### Contact, Interaction & Body Mechanics Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:00 | Reflection Woman | limb mechanics | The foreground woman raises her right arm, but her reflection raises its left arm. A true mirror reflection would show the right arm (the one directly opposite the physical arm) moving. | severe | 0.99 |  |

### Spatial Topology & Occlusion Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:00 | Mirror reflection | impossible geometry | The woman raises her right arm (which has a visible tattoo), but her reflection in the mirror raises its left arm (the arm on the right side of the screen, which has no tattoo). This violates the spatial mapping of a planar mirror, which must reflect the physical movements on the corresponding side. | severe | 1 |  |

### Causal & Temporal Sequence Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:00 | Reflection | Proportionality & direction | The dancer raises her right arm (on the right side of the screen), which should cause the reflection's arm on the right side of the screen to raise. Instead, the reflection raises its left arm (on the left side of the screen). The effect's direction physically mismatches the cause. | severe | 1 |  |
| 2 | 00:02 | Reflection | Proportionality & direction | The dancer turns her head to the right. The reflection reacts by turning its head to its left (the left side of the screen), failing to accurately reflect the direction of the causal movement. | severe | 1 |  |

## dialogue

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:07 | blue shirt | Spatial Continuity | In the initial shot, the blue shirt is hanging on the left side of the room, while the framed picture is on the right side. When the camera angle changes as the man turns, the blue shirt is suddenly hanging on the right side of the screen, directly next to the framed picture. | severe | 0.99 |  |
| 2 | 00:07 | intercom panel | Object Appearance | A brass intercom panel suddenly appears on the wall to the left of the door when the camera angle changes, which was not visible in the initial establishing shot of that area. | moderate | 0.9 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:07 | Blue jacket | location & orientation | In the first shot, the blue jacket is hanging on a hook to the left of the wooden doors. After the camera cut, the jacket is suddenly hanging on a different hook on the right side of the room, immediately next to the framed picture. | severe | 1 |  |
| 2 | 00:07 | Brass plate | identity & persistence | The small brass plate that was on the wall to the left of the framed picture in the first shot vanishes completely after the cut, with its approximate location now occupied by the blue jacket. | moderate | 0.95 |  |

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:07 | Scene layout and background objects | Scene layout consistency | Upon the camera cut when the man turns, the entire geometry of the room changes. The blue garment (previously on the viewer's left) and the framed picture and brass fixture (previously on the viewer's right) are now all located on the wall behind the man. The doors he faces were not geometrically possible given the first shot's layout. | severe | 0.99 |  |

### Causal & Temporal Sequence Observer

_No findings._

## home-tour

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | framed picture (kitchen) | Temporal Consistency | The image within the framed picture on the right wall shifts and changes shape, appearing to move, as the woman's shadow passes over it. | moderate | 0.9 |  |
| 2 | 00:08 | framed picture (kitchen) | Temporal Consistency | As the woman walks back toward the kitchen, the framed picture visible through the doorway morphs significantly; the image becomes abstract and unrecognizable, and the frame distorts. | severe | 0.95 |  |

### Character Continuity Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:02 | Woman | Identity Continuity | A large blue dangle earring is visible on her left ear when she turns her head, which was not present in the earlier profile view. | minor | 0.9 |  |
| 2 | 00:03 | Woman | Identity Continuity | The dress suddenly features gathered, slightly puffed seams on the shoulders, and her hair appears noticeably curlier and shorter. | moderate | 0.95 |  |
| 3 | 00:05 | Woman | Identity Continuity | The gathered seams on the dress shoulders disappear between cuts, reverting to smooth shoulders. | moderate | 0.95 |  |
| 4 | 00:06 | Woman | Identity Continuity | A distinct V-shaped seam or yoke appears on the upper back of the dress. | minor | 0.9 |  |
| 5 | 00:08 | Woman | Identity Continuity | The seam detail on the upper back of the dress changes from V-shaped to a straight horizontal line. | minor | 0.9 |  |

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:07 | Framed picture (Blue Flower) | location & orientation | When the subject first walks down the hallway, the blue flower picture is on the wall to her right. When she turns around and walks back, the picture is still on her right, meaning it has inexplicably moved to the opposite wall. | severe | 0.99 |  |
| 2 | 00:08 | Red kettle | identity & persistence | A red kettle appears on the stove as the subject returns to the kitchen. It was not present on the stove when she initially walked past it at the beginning of the video. | severe | 0.95 |  |
| 3 | 00:09 | Microwave | location & orientation | The microwave was originally resting on the right-hand kitchen counter. When the subject returns to the kitchen, the microwave is now mounted on the wall above the stove on the left side. | severe | 0.98 |  |

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:06 | Scene layout and connectivity | Scene layout consistency | When the woman turns around to exit the bedroom, the hallway she originally walked through has disappeared. The bedroom doorway now opens directly into the kitchen, which has also been repositioned. The spatial relationship between the rooms is completely altered. | severe | 0.99 |  |
| 2 | 00:07 | Wall artwork | Fixed object positioning | The framed picture of the blue flower, initially seen on the wall between the kitchen and the hallway, is now located on the wall to the left of the bedroom doorway as she exits. | moderate | 0.95 |  |

### Causal & Temporal Sequence Observer

_No findings._

## man-cups

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:00 | person's hand | Anatomy consistency | The hand holding the coin on the left side of the screen clearly has at least six fingers, with multiple thumb-like digits visible. | severe | 0.99 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | Coin (Middle Cup Top) | Identity & Persistence | A coin is clearly resting horizontally across the opening of the middle cup. As the right hand drops a new coin into the cup, the resting coin completely vanishes without falling or being moved. | severe | 0.95 |  |
| 2 | 00:03 | All Cups | Location & Orientation | The three cups are initially spaced apart in a loose triangle formation. After a sudden change in camera perspective, the cups are instantly clustered tightly together in a row. | severe | 0.95 |  |
| 3 | 00:06 | Cups | Identity & Persistence | Throughout the beginning of the video, there are exactly three cups. As the camera pans around the table at 00:06, a fourth cup appears in the row. By 00:08, the extra cup has vanished, leaving only three again. | severe | 0.95 |  |

### Contact, Interaction & Body Mechanics Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | Left arm/hands | limb mechanics | As the camera pulls back, two distinct hands are seen emerging from the single left sleeve of the man's blue suit. One hand is holding a coin above the cup, while a second hand is resting near the rim. By 00:03, the upper hand holding the coin disappears completely, leaving only the lower hand. | severe | 0.98 |  |

### Spatial Topology & Occlusion Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:02 | Tablecloth | scene layout | The center of the tablecloth changes from a light green circular pattern to a solid red surface as the camera pulls back. | severe | 1 |  |
| 2 | 00:03 | Three red cups | scene layout | The spatial arrangement of the three cups morphs from a triangular formation into a straight horizontal line as the viewpoint changes, without any physical manipulation. | severe | 1 |  |
| 3 | 00:02 | Coin on cup | scene layout | The coin resting on top of the back-right cup vanishes entirely as the camera pans, without being moved or falling. | moderate | 0.95 |  |

### Causal & Temporal Sequence Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:04 | Coin on table | effect-without-cause | A coin materializes on the table surface next to the leftmost cup and slides outwards. The person's hand is hovering above but does not perform any pushing or dropping action to cause this movement. | moderate | 0.95 |  |

## man-in-mirror

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:00 | handheld tool | Reflection consistency | The object held by the man in the foreground is a white stick, but its reflection in the mirror appears as a blue razor. | severe | 0.99 |  |
| 2 | 00:02 | tool in reflection | Object permanence | The blue razor in the mirror reflection morphs into a black comb as the man brings it to his hair, and then morphs back into a razor when he returns it to his face. | severe | 0.99 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | Comb | Identity & Persistence | As the man raises his hand from his face to his hair, the small clear comb in his hand spontaneously transforms into a larger black comb. There is no visible action to explain swapping the object. | severe | 0.99 |  |
| 2 | 00:04 | Comb | Identity & Persistence | As the man lowers his hand from his hair back to his face, the large black comb spontaneously transforms back into the small clear comb. No swap or object exchange is visible. | severe | 0.99 |  |

### Contact, Interaction & Body Mechanics Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:02 | Man's right arm and hand | continuous limb trajectories | The man's right arm instantly teleports from his cheek to the top of his head without continuous movement, and his fingers snap from a curled grip to a flat pose in a single frame. | severe | 1 |  |
| 2 | 00:04 | Man's right arm and hand | continuous limb trajectories | The man's right arm instantly teleports from the top of his head back down to his cheek, and his hand snaps from a flat pose back to a curled grip in a single frame. | severe | 1 |  |

### Spatial Topology & Occlusion Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:02 | mirror reflection | impossible geometry | The spatial trajectory of the foreground man's hand moves backwards over his head, while the reflection's hand moves downwards across the forehead. The reflection's geometric movement is completely uncoupled from the physical object it reflects. | severe | 1 |  |

### Causal & Temporal Sequence Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:00 | man's right hand and arm | temporal flow | The motion of the hand brushing against the face and hair is created by rapidly looping the same few frames forward and backward (a 'boomerang' effect). This violates the forward flow of time and creates unnatural repeated beats. | severe | 1 |  |
| 2 | 00:00 | audio/visual sync | effect-without-cause | A rapid, continuous scratching/clicking sound effect plays throughout the video, but the frequency and timing of the sound do not match the visual strokes of the object against the man's face or hair. There is no visible cause for the continuous sound. | moderate | 0.9 |  |

## phone

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:06 | Hands holding phone | Anatomical Consistency | An extra, disconnected thumb suddenly appears on the lower left side of the phone screen and then slides down out of frame. | severe | 0.95 |  |

### Character Continuity Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:00 | Background person | Identity (accessories) | The person walking away in the background is initially carrying a large red accessory in their left hand. As they move onto the flat path, the accessory vanishes entirely from their hands without being dropped. | severe | 0.95 |  |
| 2 | 00:00 | Background person | Movement continuity | The background person transitions from being midway down the stairs to several feet away on the flat pavement in a fraction of a second, resulting in a sudden, impossible jump in position. | moderate | 0.9 |  |

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:02 | Red bag | Identity & Persistence | The red bag being carried by the person in the background suddenly vanishes from their hand. There is no visible action of dropping it or handing it off; the object simply ceases to exist. | severe | 0.99 |  |

### Contact, Interaction & Body Mechanics Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:07 | Right thumb and smartphone | Solidity | As the right thumb moves to tap the bottom right portion of the screen, the thumb appears to clip through the solid black edge/bezel of the smartphone. | moderate | 0.9 |  |

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:03 | phone screen text | effect-without-cause | The text and numbers on the phone screen continuously morph, change layout, and update without any corresponding swiping or typing actions from the user. | severe | 0.95 |  |
| 2 | 00:06 | phone screen | cause-without-effect | The user's thumb makes tapping motions on the screen, but the interface does not react to these specific inputs; instead, the text continues its independent morphing. | moderate | 0.85 |  |

## pouring-olives

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | olives being poured | color consistency | The small jar initially contains only green olives, but as they are poured into the large jar, several black/dark purple olives fall out, changing color mid-air. | severe | 1 |  |
| 2 | 00:06 | olives in second jar | color consistency | The second small jar also appears to contain only green olives before being poured, but black olives fall from it into the large jar. | severe | 1 |  |

### Character Continuity Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:03 | Person | Accessory Continuity | A watch with a light blue band suddenly appears on the person's left wrist as they reach towards the bowls on the right, whereas the wrist was clearly bare earlier in the same continuous shot. | severe | 0.95 |  |

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | poured olives (first pour) | identity | The olives in the small jar are uniformly green. As they are poured and fall through the air into the large jar, many of them instantly transform into black/dark purple olives. | severe | 1 |  |
| 2 | 00:04 | olives in large jar | persistence | Across a cut, the volume of olives in the large jar abruptly decreases. The jar goes from being approximately half full at 00:03 to noticeably less full at 00:05, with no visible action of removal. | severe | 1 |  |
| 3 | 00:06 | poured olives (second pour) | identity | During the second pour, the olives inside the small jar are again exclusively green, but transform into a mix of green and black olives as they fall into the large jar. | severe | 1 |  |

### Contact, Interaction & Body Mechanics Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | falling olives / large jar | solidity | The stream of falling olives renders over the top of the large jar's front rim, clipping directly through the solid glass barrier rather than falling behind it into the opening. | severe | 0.95 |  |
| 2 | 00:01 | olives | solidity | As the olives settle at the bottom of the large jar, they fail to behave as solid rigid bodies, visibly clipping into and merging with one another in the pile. | severe | 0.9 |  |
| 3 | 00:06 | falling olives / large jar | solidity | During the second pour, the falling stream of olives again clips through the front glass rim of the large jar instead of passing cleanly through the opening. | severe | 0.95 |  |

### Spatial Topology & Occlusion Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | falling olives | depth ordering & occlusion | As the olives are poured, the stream of falling olives is rendered in front of the near-side rim of the large receiving jar. Since they are falling into the jar's opening, they should be occluded by the front rim. | severe | 0.95 |  |
| 2 | 00:07 | pouring jar and falling olives | depth ordering & occlusion | During the second pour, the bottom edge of the small pouring jar and the falling olives are again rendered overlapping the front rim of the large jar, violating the expected depth ordering for objects entering the opening. | severe | 0.95 |  |

### Causal & Temporal Sequence Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | falling olives | proportionality & completion | The person pours from a jar containing only green olives, but a mixture of green and dark purple/black olives falls out and lands in the larger jar. The effect does not match the cause. | severe | 0.99 |  |
| 2 | 00:06 | falling olives | proportionality & completion | The person pours from a second jar containing only green olives. As the olives fall, a mix of green and dark olives comes out of the jar and lands in the larger container. | severe | 0.99 |  |

## skateboarder

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | Skateboarder's left shoe | Color Consistency | The skateboarder's left shoe changes from red to black/dark grey while he is mid-air doing the first trick, and then reverts to red as he lands. | severe | 0.95 |  |

### Character Continuity Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:08 | Skateboarder | character identity (build) | During the mid-air portion and landing of the second trick, the character's right leg undergoes severe anatomical distortion, with the lower leg bending backward at an impossible angle before reforming upon landing. | severe | 0.99 |  |

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:09 | Skateboard | Identity & Persistence | The skateboard is visible in mid-air during a trick, but as the skater lands, the skateboard completely vanishes from the scene, resulting in the skater landing directly on the concrete. | severe | 0.99 |  |

### Contact, Interaction & Body Mechanics Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:02 | Skateboard and Skater's Right Foot | solidity | As the skateboard completes its rotation during the flip trick, the nose of the board passes directly through the heel area of the skater's right red shoe and green sock. The solid objects intersect without any collision or deflection. | severe | 0.95 |  |

### Spatial Topology & Occlusion Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:02 | Background trees and light poles | scene layout | As the camera tilts up during the first trick, the background trees morph in shape and the light poles on the right disappear, completely altering the established scene layout. | severe | 0.95 |  |
| 2 | 00:07 | Background trees and light poles | scene layout | During the second trick, the pair of light poles visible on the left earlier disappears, and the tree line warps, changing the relative positions of the background elements again. | severe | 0.95 |  |

### Causal & Temporal Sequence Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:08 | Skater landing action | proportionality & completion | The skater initiates a landing motion to land back on the skateboard, but the skateboard completely dissolves from under his right foot. The landing action fails to complete as a physical interaction with the board, instead dissolving into the skater landing directly on the concrete while maintaining a posture as if the board were still present. | severe | 0.95 |  |

## watchmaker

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:04 | ring in left hand | object permanence | A new, simple ring with a stone suddenly materializes in the woman's left hand, resting on top of the original studded ring she was holding. | severe | 1 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:04 | Tweezers / Pin tool | Identity & Persistence | The right hand moves downwards holding tweezers, and a moment later returns holding a completely different thin metal pin tool. There is no visible action or sufficient time to explain the dropping of the tweezers and picking up of the new tool. | severe | 0.95 |  |

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
| 1 | 00:01 | block in hand | Object Constancy | The block held by the hand continuously morphs, changing color and number (e.g., from a green '2' to a blue '3', then a yellow '2', etc.) as it is dragged across the table. | severe | 0.99 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | Trail Blocks | identity & persistence (spontaneous generation) | As the hand drags the green block, a continuous stream of new blocks (blue, green, yellow) spontaneously appears from behind it. | severe | 1 |  |
| 2 | 00:02 | Stationary Green Block | identity & persistence (disappearance) | The green '2' block that was initially stationary on the right side of the table vanishes as the moving block passes through its location. | severe | 0.95 |  |
| 3 | 00:02 | Held Green Block | physical state transitions | The number printed on the green block held by the hand spontaneously changes from '2' to '3' while being dragged. | severe | 1 |  |
| 4 | 00:06 | Held Green Block | physical state transitions | The number printed on the green block held by the hand spontaneously changes from '3' to '6' while being dragged. | severe | 0.95 |  |

### Contact, Interaction & Body Mechanics Observer

_No findings._

### Spatial Topology & Occlusion Observer

_No findings._

### Causal & Temporal Sequence Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | Blocks | effect-without-cause | As the hand moves to the right, new blocks continuously materialize on the table behind it. There is no physical source or container providing these blocks, making their spontaneous appearance an effect without a valid physical cause. | severe | 0.95 |  |
| 2 | 00:08 | Hand | temporal flow | The hand instantaneously teleports from the far right end of the block row to the middle of the row, violating the principle of continuous motion within a single shot. | severe | 0.9 |  |

## woman-apple

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:01 | Umbrella shaft and woman's hands | Solid object intersection | As the woman brings her hands together around the apple, the metal shaft of the umbrella passes directly through her hands and the apple. The umbrella remains upright and floats in position despite not being physically held or supported by her hands. | severe | 0.99 |  |

### Character Continuity Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:05 | Main character's right arm | movement continuity | The character's hands are clasped together holding the apple at chest level. As the camera angle shifts to her side, her right arm is suddenly raised, gripping the umbrella pole at shoulder level without any transitional movement shown. | severe | 0.95 |  |

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:03 | Umbrella | location & orientation | The umbrella's shaft instantaneously teleports from being positioned behind the woman's right shoulder to being in front of her left shoulder without any visible movement. | severe | 0.99 |  |
| 2 | 00:05 | Umbrella | location & orientation | The umbrella's shaft teleports again, instantly moving from the woman's left side back to her right side. | severe | 0.99 |  |
| 3 | 00:07 | Umbrella | ownership & possession | The woman's right hand, which was previously holding the apple along with her left hand, is instantly shown holding the umbrella shaft. The shaft materializes in her grip without being moved there, and its physical thickness noticeably increases. | severe | 0.99 |  |

### Contact, Interaction & Body Mechanics Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:02 | Woman's hands | limb mechanics | An extra hand appears and claps against the woman's left hand (which is holding the apple), while her actual right arm and hand are simultaneously visible holding the umbrella on her right side. | severe | 0.99 |  |
| 2 | 00:06 | Umbrella shaft | solidity | As the woman turns and the camera pans around her, the shaft of the umbrella passes directly through her shoulder and neck area instead of moving around her body. | severe | 0.95 |  |

### Spatial Topology & Occlusion Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:03 | background crowd | scene layout | The distinct group of people in the background right, including a man in a green shirt and a woman in a red shirt, dissolve and vanish into a completely different crowd layout without being occluded or leaving the frame. | severe | 0.95 |  |
| 2 | 00:05 | left market stalls | scene layout | As the camera moves along the path, the physical architecture of the stalls on the left morphs from tiered structural displays to flat tables with purple trays, failing to maintain consistent geometry. | moderate | 0.85 |  |

### Causal & Temporal Sequence Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:00 | Umbrella | effect-without-cause | The umbrella remains elevated and moves synchronously with the woman, but neither of her hands are gripping its shaft to support it (her hands are occupied holding and clapping an apple), providing no physical cause for the umbrella to remain upright. | severe | 0.95 |  |

## woman-car

### Generalist QC Baseline

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:03 | Woman and Car | Solid Object Intersection | The woman's torso visibly intersects and merges with the solid metal of the car's hood and fender, rather than resting on top of it, creating a physical impossibility. | severe | 0.99 |  |
| 2 | 00:03 | Woman's Hand | Anatomical Integrity | The fingers on the woman's visible hand, resting on her arm, are deformed and merged together into an unnatural, blob-like shape. | moderate | 0.95 |  |
| 3 | 00:02 | Car details (Antenna, Hood Ornament) | Temporal Consistency | The car's antenna vanishes, and the hood ornament morphs in shape and shifts position on the hood as the camera pans. | moderate | 0.9 |  |

### Character Continuity Observer

_No findings._

### Object Persistence & Physical State Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:02 | driver's side windshield wiper | location & orientation | The windshield wiper on the right side of the car spontaneously relocates its base and flips its direction. Initially, the base is near the center of the windshield cowl and the blade points to the right, towards the woman. As the camera zooms in, the base appears on the flat hood surface near her elbow, and the blade points to the left, in the opposite direction. | severe | 0.98 |  |

### Contact, Interaction & Body Mechanics Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:00 | Woman's torso | solidity | The woman's torso appears to emerge directly from and clip through the solid metal hood of the car. There is no opening; her body impossibly intersects the solid geometry of the vehicle. | severe | 1 |  |

### Spatial Topology & Occlusion Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:00 | Woman and Car | depth ordering & occlusion | The woman's torso is physically fused with the solid geometry of the car's hood and windshield, emerging from the solid surface rather than through an open window or door. | severe | 0.99 |  |

### Causal & Temporal Sequence Observer

| # | Time | Entity | Invariant | Description | Sev | Conf | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | 00:04 | car antenna | cause-without-effect | A strong wind begins blowing the woman's hair violently backward, indicating significant air resistance from the car's motion. However, the thin metal antenna mounted on the hood right next to her remains completely rigid and is unaffected by the airflow. | moderate | 0.9 |  |
