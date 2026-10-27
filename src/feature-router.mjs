// Two-pass deterministic router: pass 1 asks the model for a purely PERCEPTUAL feature
// checklist of the scene (what's there — no judgment, no defect hunting); a deterministic
// rule table in code (RULES) then decides which focused pass-2 checks fire. The applicability
// judgment lives here, versioned and auditable, not in the model.
//
// This system is purely ADDITIVE on top of the always-on v1 core roles (src/roles.mjs) —
// nothing here gates or replaces them. Triggered checks can afford aggressive, narrow prompts
// precisely because they only run when their subject matter is confirmed present, so the
// global-dampener problem from the v2r1-full run (confound checklist suppressing real recall
// everywhere) doesn't apply: each check carries only the confound guidance relevant to its
// own domain.
//
// Rules are derived from DEFECT CLASSES observed across the 47-defect ground truth — the
// trigger vocabulary is generic scene features any future video could have (a mirror, a pour,
// a countable group of objects), never clip identities. Growing the library = adding classes.
//
// Supersedes the earlier scene-classifier.mjs draft (kept for reference).

const OUTPUT_CONTRACT = `
OUTPUT FORMAT — respond with ONLY a single JSON object, no markdown fences, no prose before or after:
{
  "ledger": [
    // one entry per entity/moment you tracked, as a short string
  ],
  "findings": [
    {
      "timestamp": "mm:ss",
      "entity": "what is affected",
      "invariant_violated": "short name of the rule that was broken",
      "description": "precise description of what changed and why it is unexplained",
      "severity": "minor" | "moderate" | "severe",
      "confidence": 0.0-1.0
    }
  ]
}
If you find no violations, return "findings": [] — an empty list is a valid and expected answer.
Do NOT pad the findings list. Only report violations you can tie to specific visual evidence.`;

// ---------------------------------------------------------------------------
// Pass 1: perceptual feature checklist
// ---------------------------------------------------------------------------
// Every question is observational ("is X visible?"), never evaluative ("should X be
// checked?"). Booleans, small enums, and counts only — maximum parse reliability from a
// flaky model. If you add a field here, add a matching line to the prompt AND a default
// in normalizeFeatures().

export const FEATURE_PROMPT = `You are a scene-inventory assistant. Watch the video and fill in a factual checklist about what it contains. You are NOT looking for defects, errors, or anything wrong — only reporting what is observably present. Answer every field.

OUTPUT FORMAT — respond with ONLY a single JSON object, no markdown fences, no prose before or after:
{
  "people_count": <number of distinct people visible at any point>,
  "animals_present": true|false,
  "vehicle_present": true|false,
  "vehicle_seen_multiple_moments": true|false,      // the same vehicle visible at two or more separate moments
  "mirror_present": true|false,                     // a true fixed mirror (wall/studio/bathroom) — NOT windows, screens, puddles
  "reflective_surfaces_present": true|false,        // windows, glass, screens, water that show reflections (even if no true mirror)
  "liquid_or_granular_transfer": true|false,        // anything poured, tipped, or transferred between containers (liquid, olives, marbles, grain...)
  "countable_object_group": true|false,             // a visible group of similar countable objects (cups, coins, blocks, balls, fruit...)
  "hands_manipulating_small_objects": true|false,   // close-up hand activity: picking up, placing, covering, exchanging small items
  "legible_text_present": "none"|"once"|"multiple", // readable text (signs, screens, labels, plates): never / at one moment / at two+ separate moments
  "spoken_dialogue": true|false,                    // intelligible speech or narration on the audio track (false if no audio or only music/SFX)
  "camera_has_cuts": true|false,                    // at least one hard cut / shot change (not just continuous camera movement)
  "camera_motion": "static"|"handheld"|"tracking"|"orbit",  // dominant camera behavior; "orbit" = camera circles around a subject
  "setting": "interior"|"exterior"|"both",
  "windows_or_doorways_visible": true|false,        // openings that show a connected space (another room, outdoors)
  "person_contacts_furniture_or_fixtures": true|false,  // someone sits on / leans on / reaches through / stands against furniture, counters, vehicles, walls
  "notable_entities": ["short strings: each distinct person, animal, vehicle, and notable prop"]
}
Base every answer on what is visibly (or audibly) present. If genuinely uncertain about a boolean, answer true (it is cheaper to run an unnecessary check than to skip a needed one).`;

const FEATURE_DEFAULTS = {
  people_count: 1,
  animals_present: true,
  vehicle_present: true,
  vehicle_seen_multiple_moments: true,
  mirror_present: true,
  reflective_surfaces_present: true,
  liquid_or_granular_transfer: true,
  countable_object_group: true,
  hands_manipulating_small_objects: true,
  legible_text_present: 'multiple',
  spoken_dialogue: true,
  camera_has_cuts: true,
  camera_motion: 'tracking',
  setting: 'both',
  windows_or_doorways_visible: true,
  person_contacts_furniture_or_fixtures: true,
  notable_entities: [],
};

function coerceBool(v, fallback) {
  if (typeof v === 'boolean') return v;
  if (typeof v === 'string') {
    const t = v.trim().toLowerCase();
    if (t === 'true' || t === 'yes') return true;
    if (t === 'false' || t === 'no') return false;
  }
  return fallback;
}

/**
 * Parse + normalize the pass-1 checklist. FAILS OPEN: on any parse failure, or for any
 * missing/malformed field, defaults are the values that trigger the MOST checks (see
 * FEATURE_DEFAULTS) — an unnecessary check is cheaper than a silently skipped one. The
 * raw text should still be logged to the manifest by the runner for auditability.
 */
export function parseFeatures(text) {
  const failOpen = { ...FEATURE_DEFAULTS };
  if (!text) return { ok: false, error: 'empty response', features: failOpen };
  const cleaned = text.replace(/```(?:json)?/g, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1) return { ok: false, error: 'no JSON object found', features: failOpen };
  try {
    const raw = JSON.parse(cleaned.slice(start, end + 1));
    const f = { ...FEATURE_DEFAULTS };
    if (Number.isFinite(Number(raw.people_count))) f.people_count = Number(raw.people_count);
    for (const k of ['animals_present','vehicle_present','vehicle_seen_multiple_moments','mirror_present','reflective_surfaces_present','liquid_or_granular_transfer','countable_object_group','hands_manipulating_small_objects','spoken_dialogue','camera_has_cuts','windows_or_doorways_visible','person_contacts_furniture_or_fixtures']) {
      f[k] = coerceBool(raw[k], FEATURE_DEFAULTS[k]);
    }
    if (['none','once','multiple'].includes(raw.legible_text_present)) f.legible_text_present = raw.legible_text_present;
    if (['static','handheld','tracking','orbit'].includes(raw.camera_motion)) f.camera_motion = raw.camera_motion;
    if (['interior','exterior','both'].includes(raw.setting)) f.setting = raw.setting;
    if (Array.isArray(raw.notable_entities)) f.notable_entities = raw.notable_entities.filter((e) => typeof e === 'string');
    return { ok: true, features: f };
  } catch (err) {
    return { ok: false, error: `JSON parse failed: ${err.message}`, features: failOpen };
  }
}

// ---------------------------------------------------------------------------
// The deterministic rule table
// ---------------------------------------------------------------------------
// Each rule: id, when(features) => boolean, and the check role (id/name/prompt) that fires.
// Prompts are aggressive within their narrow domain (subject matter is confirmed present),
// and carry only the confound guidance relevant to that domain.

export const RULES = [
  {
    id: 'mirror-pose-consistency',
    when: (f) => f.mirror_present,
    role: {
      id: 'mirror-pose-consistency',
      name: 'Mirror Pose Consistency Check',
      prompt: `A true mirror is present in this video (confirmed by a prior inventory pass — but verify yourself; if there is in fact no true mirror, only windows/screens/incidental glass, report zero findings and say so in your ledger). You are a forensic mirror-consistency checker. At every moment the mirror and the real subject are both visible, compare them directly:
- the reflection must show the subject's CURRENT pose at the same instant, mirrored left-right — never a pose, limb position, prop position, or action the real body isn't doing right then
- the reflection must move in sync with the subject — no lag, no independent motion
- a prop held by the subject must appear in the reflection as the same kind of object, held at the mirrored position
- clothing, tattoos, and accessories must appear on the mirrored side of the reflected body
Confounds to rule out: viewing-angle geometry can shift what part of the room a mirror shows, but it can never change the subject's pose; motion blur is not a pose mismatch — compare sharp frames.
Do NOT report reflections in windows or screens; only the true mirror is in scope.

TASK: Ledger = each moment mirror + subject are simultaneously visible, with the pose of each. Then report every mismatch between subject and reflection at a shared instant.
${OUTPUT_CONTRACT}`,
    },
  },
  {
    id: 'pour-conservation',
    when: (f) => f.liquid_or_granular_transfer,
    role: {
      id: 'pour-conservation',
      name: 'Pour & Transfer Conservation Check',
      prompt: `This video contains material being poured or transferred between containers (confirmed by a prior inventory pass). You are a forensic conservation checker for exactly that transfer. Track every container involved, moment by moment:
- conservation: the amount leaving a source must plausibly equal the amount arriving at the destination — material cannot appear that never left a source, and a poured amount cannot exceed what the source held
- source contents: the color/type of material arriving must match what was visible in the source (contents cannot change kind or color mid-air)
- container identity: each container must remain the same object throughout — same shape, material, size, and hardware; a container cannot become a different vessel between shots
- fill-level monotonicity: a destination being filled can only rise (and a source being emptied only fall) unless a visible action explains a reversal
- refill without cause: an emptied container cannot be full again later with no visible refill
Confounds to rule out: a camera cut may hide a legitimate action (note it as lower confidence rather than certainty); perspective can distort apparent fill level — compare like-for-like angles when possible; material can be hidden beneath other material in an opaque container.

TASK: Ledger = each container: its identity, contents, and fill level at every moment it is visible. Then report every conservation, identity, or fill-level violation.
${OUTPUT_CONTRACT}`,
    },
  },
  {
    id: 'count-stability',
    when: (f) => f.countable_object_group,
    role: {
      id: 'count-stability',
      name: 'Object Count Stability Check',
      prompt: `This video contains a visible group of similar countable objects (confirmed by a prior inventory pass — cups, coins, blocks, balls, fruit, or similar). You are a forensic count checker for exactly those groups. For each group of similar objects:
- count them at every moment the group is clearly visible, and track the count over time
- a count may only change through a visible cause: an object visibly added, removed, carried off-screen, or destroyed
- an object may only transform into a DIFFERENT KIND of object if a visible mechanism explains it — one kind of object becoming another kind with no cause is a defect even in a performance
- occlusion is not disappearance: an object hidden behind a hand or another object still exists; only report a count change confirmed after the occluder moves away
Special case — deliberate magic/sleight-of-hand performances: a performer making the count of the SAME kind of object go up or down (multiplying coins, vanishing balls) is the trick itself; do not report it as a defect. DO still report: counts of objects the performer is NOT manipulating changing on their own, and any object changing into a different KIND of object.
Confounds to rule out: motion blur can smear one object into looking like two — count on sharp frames; objects at the frame edge may be cropped, not absent.

TASK: Ledger = each countable group: kind, count at each clearly-visible moment, and the visible cause of every count change. Then report every unexplained count change or kind-transformation.
${OUTPUT_CONTRACT}`,
    },
  },
  {
    id: 'possession-tracking',
    when: (f) => f.hands_manipulating_small_objects,
    role: {
      id: 'possession-tracking',
      name: 'Hand-Object Possession Tracking Check',
      prompt: `This video contains close-up hand activity with small objects (confirmed by a prior inventory pass). You are a forensic possession tracker. Follow every small object that a hand touches, moment by moment:
- continuous chain of custody: at every moment, each tracked object is in a specific hand, on a specific surface, inside a specific container, or has visibly exited the frame — there must be no moment where an object's location is unaccounted for AND it later reappears somewhere it could not have reached
- placement persistence: an object placed somewhere stays there until something visibly moves it
- transfer completeness: when an object passes between hands or into a container, the object that arrives must be the same object that left (same kind, same appearance)
- an object placed INTO a container must be inside that container when the container is next opened/shown, not somewhere else with no visible cause
Confounds to rule out: sleight-of-hand performances intentionally hide transfers — for a deliberate performance, only report physically impossible outcomes (an object visibly in two places at once, an object becoming a different kind of object, or an outcome inconsistent even WITH concealed palming), not merely concealed moves; brief occlusion by fingers is normal handling.

TASK: Ledger = each manipulated object: its custody chain (hand → surface → container...) with timestamps. Then report every custody break or impossible outcome.
${OUTPUT_CONTRACT}`,
    },
  },
  {
    id: 'text-stability',
    when: (f) => f.legible_text_present !== 'none',
    role: {
      id: 'text-stability',
      name: 'On-Screen Text Legibility & Stability Check',
      prompt: `This video contains readable on-screen text (confirmed by a prior inventory pass — signs, screens, labels, plates, or similar). You are a forensic text checker with two jobs:
1. LEGIBILITY: any text rendered large and steady enough that a viewer would expect to read it must be actual, coherent text — garbled glyphs, non-words in a context demanding real words, or self-contradictory text (a menu of gibberish, a nonsense license plate format) is a defect. Text genuinely too small/angled/brief to read is NOT a defect.
2. STABILITY: the SAME text element must read identically every time it is legible — characters may not change between moments unless a visible action changes them (typing, a sign being swapped, a page turning). Only compare two moments where the text is clearly legible in both.
Confounds to rule out: motion blur and compression can smear real text — judge legibility on the sharpest available frame; stylized/decorative lettering in a language you don't recognize is not automatically gibberish; partial occlusion changes what's visible, not what's written.

TASK: Ledger = each distinct text element: where it appears, its sharpest reading at each legible moment. Then report every garbled-text defect and every unexplained change between legible readings.
${OUTPUT_CONTRACT}`,
    },
  },
  {
    id: 'vehicle-identity',
    when: (f) => f.vehicle_present && f.vehicle_seen_multiple_moments,
    role: {
      id: 'vehicle-identity',
      name: 'Vehicle Identity & Hardware Continuity Check',
      prompt: `This video shows the same vehicle at multiple separate moments (confirmed by a prior inventory pass). You are a forensic vehicle-identity checker. For each vehicle shown more than once:
- identity: body type, color, and configuration must match every appearance — a vehicle cannot become a different make, color, or configuration between sightings unless a swap is visibly shown or clearly implied by elapsed story time AND another vehicle
- markings: plates, badges, decals, and livery must read/appear the same at every legible sighting
- attached hardware: mirrors, antennae, racks, and similar fixed components must stay in the same configuration absent a visible cause
- position: a parked vehicle stays where it was parked unless driving/moving is shown or plausible off-screen time explains it
Confounds to rule out: lighting and reflections shift apparent paint color — require a body-type/configuration difference or a legible marking mismatch, not color alone; camera angle changes apparent geometry; do not flag a marking you cannot clearly read at both compared moments.

TASK: Ledger = each recurring vehicle: identity/markings/hardware at each sighting. Then report every unexplained identity, marking, hardware, or position discontinuity.
${OUTPUT_CONTRACT}`,
    },
  },
  {
    id: 'audio-visual-claims',
    when: (f) => f.spoken_dialogue,
    role: {
      id: 'audio-visual-claims',
      name: 'Audio-Visual Claim Consistency Check',
      prompt: `This video has spoken dialogue or narration (confirmed by a prior inventory pass — but if the audio track is actually absent or unintelligible to you, report zero findings and say so in your ledger). You are a forensic audio-visual consistency checker:
- every specific, checkable claim the speech makes about the visible scene — a count, color, name, position, or state of something shown on camera — must match what the visuals show at the relevant moment
- do NOT flag vague, figurative, or off-screen references; only concrete claims about visible things
- do NOT flag lip-sync, voice quality, or audio timing — out of scope
- also note (as a finding) speech that is prominently garbled/non-language in a context clearly meant to be intelligible dialogue

TASK: Ledger = every specific checkable claim in the speech, with timestamp and the visual evidence for/against it. Then report every claim the visuals contradict.
${OUTPUT_CONTRACT}`,
    },
  },
  {
    id: 'cross-cut-placement',
    when: (f) => f.camera_has_cuts && f.people_count >= 1,
    role: {
      id: 'cross-cut-placement',
      name: 'Cross-Cut Character Placement Check',
      prompt: `This video contains camera cuts and at least one person (confirmed by a prior inventory pass). You are a forensic cross-cut placement checker. Your method is mandatory and sequential:
STEP 1 — SHOT LIST: list every distinct shot as "shot N: mm:ss-mm:ss, camera position/framing".
STEP 2 — FIXED ANCHORS: pick 2-4 fixed scene features visible across most shots (counter, doorway, furniture).
STEP 3 — PER-SHOT STATE: for each person, per shot: present? which side of each anchor? facing which way? mid-action?
STEP 4 — DIFF each shot against the previous one (and any earlier shot showing the same moment from another angle). Flag:
- a person present just before a cut missing just after (or vice versa) with no exit/entry and insufficient elapsed time
- a person on the opposite side of an anchor with no visible crossing
- a person's body overlapping/passing through fixed geometry (sitting THROUGH a counter, walking through furniture) rather than at/against it
- the same person visible in two places at once, or a duplicate instance of a person
- an action started by one hand/person continuing after the cut as a different hand/person
Confounds to rule out: a cut with clearly implied elapsed time legitimately relocates people; camera reversal (180° cuts) mirrors screen-side without moving anyone — anchor to fixed features, not screen-left/right.

TASK: Ledger = the shot list + per-shot placement table. Then report every diff violation.
${OUTPUT_CONTRACT}`,
    },
  },
  {
    id: 'layout-connectivity',
    when: (f) => f.windows_or_doorways_visible || f.setting === 'both',
    role: {
      id: 'layout-connectivity',
      name: 'Space Layout & Connectivity Check',
      prompt: `This video shows connected spaces — doorways, windows, or both an interior and exterior of the same place (confirmed by a prior inventory pass). You are a forensic layout checker:
- build the implied floor plan: which rooms/spaces connect through which openings, and what should be visible through each opening from each side
- every traversal (a person walking from one space to another) must be consistent with that floor plan — a route cannot lead somewhere the established layout makes impossible (a bedroom door opening into a second copy of the kitchen, an entrance on a wall that has no door from outside)
- what is visible THROUGH an opening must match the established far side (the view out a window must be the established exterior; a doorway must show the room it connects to)
- furniture/fixture arrangements must make functional sense for the space they're in — furniture arranged as though serving a different kind of object than is actually present (seating tucked under something that is not a table, fixtures oriented to serve a wall) is a defect
Confounds to rule out: an unseen off-screen connection can explain a surprising route — flag impossibility, not mere surprise; wide-angle lenses distort apparent room geometry; a renovation/scene change across a clear time skip is not a defect.

TASK: Ledger = the implied floor plan: spaces, openings, what each opening shows, each traversal. Then report every connectivity or functional-arrangement violation.
${OUTPUT_CONTRACT}`,
    },
  },
  {
    id: 'environment-response',
    when: (f) => f.setting !== 'interior' || f.camera_motion === 'orbit' || f.camera_motion === 'tracking',
    role: {
      id: 'environment-response',
      name: 'Environment Physical Response Check',
      prompt: `This video shows a subject in a larger environment with implied physical forces — motion, wind, gravity, weather (confirmed by a prior inventory pass). You are a forensic environment-response checker:
- a physical influence must affect everything it should: wind that moves hair must also move other light things exposed to it (loose clothing, foliage, flags); motion that streams one element back must affect comparable elements equally
- an effect must have a visible or plausible cause: hair/clothing streaming implies airflow from somewhere — moving vehicle, wind, fan; if the implied cause is contradicted (rigid foliage, a limp flag, a stationary vehicle), the effect is unexplained
- environmental elements must respond consistently over time: the same wind cannot animate an element in one shot and leave it inert in the next equivalent shot
Confounds to rule out: materials differ (hair responds to less wind than a branch does) — compare like materials; gusts are intermittent — judge across several seconds, not single frames; camera motion creates apparent background motion — anchor judgments to object deformation (bending, fluttering), not screen displacement.

TASK: Ledger = each implied physical influence: its evidence, what it should affect, what it does/doesn't affect. Then report every inconsistent or cause-less environmental response.
${OUTPUT_CONTRACT}`,
    },
  },
];

/** Apply the rule table to a parsed feature set. Returns the fired rules' roles. */
export function routeChecks(features) {
  return RULES.filter((r) => r.when(features)).map((r) => r.role);
}
