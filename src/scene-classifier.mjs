// Two-pass adaptive role selection — DRAFT, not yet wired into run-benchmark.mjs.
//
// Design: pass 1 makes one cheap call per video that (a) inventories entities/activities
// and (b) decides, from a FIXED superset we provide, which niche/conditional defect
// categories are even applicable to this scene. Pass 2 then runs ALWAYS_ON_ROLE_IDS on every
// video PLUS only the conditional roles pass 1 flagged as applicable. Pass 1 never invents new
// categories — it only selects from CONDITIONAL_CATEGORIES below, to keep the gating auditable
// and to avoid drifting into open-ended "just look for anything weird" territory (that's
// already the baseline-generalist role's job).
//
// Why gate only these NICHE categories and not everything else: a false-negative in pass-1
// classification silently skips whatever it gates. ALWAYS_ON_ROLE_IDS below (the 6 v1 roles
// plus structural-plausibility and object-category-continuity from roles-experimental.mjs)
// apply to virtually any scene with people or objects, so gating them buys little and risks a
// lot — they run unconditionally regardless of what pass 1 says. multi-shot-continuity was
// originally drafted as conditional too but got promoted to always-on after review: most clips
// in this test set contain at least one hard cut, a weak model triaging "hard cut vs. fast pan"
// is exactly the kind of judgment pass-1 will get wrong, and gating it risks silently skipping
// coverage on the clips that most need it. What's left below is genuinely niche: a mirror,
// a featured vehicle, checkable spoken claims, or text that persists long enough to re-read.
//
// Failure policy: if pass 1 errors or fails to parse, FAIL OPEN — treat every conditional
// category as applicable and run them all. Ox Alpha is free, so gating buys nothing but speed;
// losing coverage to a parser hiccup is a worse trade than a handful of wasted calls. The
// run-benchmark.mjs wiring must log the full pass-1 JSON (entities/setting/activity/categories)
// into manifest.json per video, whether or not parsing succeeded — a gating false-negative is
// unauditable without it.

export const ALWAYS_ON_ROLE_IDS = [
  'baseline-generalist',
  'character-continuity',
  'object-persistence-state',
  'contact-interaction-kinematics',
  'spatial-topology-occlusion',
  'causal-temporal-sequence',
  'structural-plausibility',
  'object-category-continuity',
  'multi-shot-continuity',
];

const OUTPUT_CONTRACT = `
OUTPUT FORMAT — respond with ONLY a single JSON object, no markdown fences, no prose before or after:
{
  "ledger": [
    // one entry per entity/shot/element you tracked, as a short string
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
Do NOT pad the findings list. Only report violations you can tie to specific visual evidence.
CONFIDENCE CALIBRATION: confidence should estimate the probability a careful human reviewer,
looking at the same frames, would confirm this as a real defect. Reserve confidence above 0.9
for violations verifiable by comparing two single paused frames side by side.`;

const CONFOUNDS = `
INNOCENT EXPLANATIONS — rule each of these out before reporting a finding in your domain:
- motion blur is not morphing or vanishing; only report a transformation if you can point to a SHARP frame showing the changed state
- a camera cut or angle change is not scene mutation by itself; only report if the same moment in time is shown two incompatible ways
- something leaving the frame is not the same as it disappearing; check whether it could plausibly still exist off-screen
- reflections in windows, phone screens, or other incidental glass are not required to match exactly and are NOT in scope for you — only the specific subject matter named for your role is
- wide-angle/fisheye lens distortion is not background morphing
- an obvious magic/sleight-of-hand performance is allowed to make counts of the SAME kind of object go up or down — that is the performer's trick, not a defect`;

// ---------------------------------------------------------------------------
// Pass 1: scene classifier
// ---------------------------------------------------------------------------

export function buildClassifierPrompt() {
  const categoryList = CONDITIONAL_CATEGORIES.map(
    (c, i) => `${i + 1}. id="${c.id}" — ${c.trigger}`
  ).join('\n');

  return `You are a scene-triage assistant preparing a video for a battery of forensic defect checks. You do NOT look for defects yourself. Your only job is to (a) inventory what's actually in the scene, and (b) decide which of a FIXED list of specialist checks are worth running, based on whether their subject matter is even present.

STEP 1 — INVENTORY: list the distinct entities (people, animals, vehicles, notable props), the setting/location, and the main activity taking place.

STEP 2 — CATEGORY APPLICABILITY: for EACH of the following specialist categories, decide whether its trigger condition is met anywhere in the video. Do not guess generously — only mark a category applicable if you can point to the specific entity/moment that satisfies its trigger. Do not invent categories outside this list.
${categoryList}

OUTPUT FORMAT — respond with ONLY a single JSON object, no markdown fences, no prose before or after:
{
  "entities": ["short strings, one per distinct person/animal/vehicle/notable prop"],
  "setting": "one short phrase",
  "activity": "one short phrase describing what's happening",
  "categories": [
    {"id": "<category id from the list above>", "applicable": true | false, "evidence": "the specific entity/moment that does or doesn't satisfy the trigger, one sentence"}
  ]
}
Include an entry in "categories" for every id in the list above, in the same order, even if applicable is false.`;
}

// ---------------------------------------------------------------------------
// Always-on extra: multi-shot-continuity (promoted out of the conditional set — see note
// above). Reuses the existing cut-continuity prompt from roles-experimental.mjs verbatim.
// Exported separately so run-benchmark.mjs wiring can merge it into the always-on role list
// alongside the roles-v2.mjs / roles-experimental.mjs roles named in ALWAYS_ON_ROLE_IDS.
// ---------------------------------------------------------------------------

export const MULTI_SHOT_CONTINUITY_ROLE = {
  id: 'multi-shot-continuity',
  name: 'Cross-Cut Scene Continuity Observer',
  prompt: `You are a forensic continuity observer specialized in videos with MULTIPLE SHOTS or camera cuts. Your method is mandatory and sequential.

STEP 1 — SHOT LIST: list every distinct shot/camera setup as "shot N: mm:ss-mm:ss, camera position/framing description". A shot ends whenever the camera cuts, the framing changes abruptly, or the angle changes. If the whole video is one continuous shot with no cuts, say so and skip to reporting zero findings.

STEP 2 — FIXED ANCHORS: identify 2-4 fixed, non-moving scene features that appear across most shots to use as a stable reference frame.

STEP 3 — PER-SHOT STATE: for each character present anywhere in the video, and for each shot, record: is this character present (yes/no)? which side of each fixed anchor are they on? which direction are they facing? which hand/arm is performing any action continuing from the previous shot?

STEP 4 — DIFF: compare every shot to the shot immediately before it. Flag any of:
- a character present just before a cut is missing just after it (or vice versa) with no visible exit/entry and not enough elapsed time to explain it
- a character is on the opposite side of a fixed anchor than the last shot placed them, with no visible crossing
- a character's body overlaps with / passes through a fixed piece of scene geometry in a way that isn't physically possible
- an action performed by one hand/person continues, after the cut, as if performed by a different hand/person
${CONFOUNDS}

OUT OF SCOPE — do not report these (other specialists handle them): object physical states, lighting/time-of-day, cause-effect timing, anything within a single continuous shot with no cut.

TASK: Produce your ledger as the shot list plus per-shot character table. Then report every diff violation from step 4.
${OUTPUT_CONTRACT}`,
};

// ---------------------------------------------------------------------------
// Pass 2: conditional (niche/gated) roles
// ---------------------------------------------------------------------------
// mirror-reflection reuses the existing reflection-consistency role prompt from
// roles-experimental.mjs, WITH its self-gate restored (see note below) — it already
// validated well in the Round 1 exp-r1 test (caught a genuine mirror pose mismatch).
// The other three are new drafts, same style: ledger-first, CONFOUNDS, strict OUT OF SCOPE.

export const CONDITIONAL_CATEGORIES = [
  {
    id: 'mirror-reflection',
    name: 'Mirror Reflection Consistency Observer',
    trigger: 'a true fixed mirror (studio, wall, bedroom, etc.) is visible anywhere, reflecting a subject also visible on camera — NOT windows, phone/TV screens, puddles, or other incidental reflective surfaces',
    prompt: `You are a forensic mirror-consistency observer. FIRST, determine: does this video contain an actual MIRROR — a framed or fixed reflective surface clearly presented as a mirror? Windows, glass storefronts, puddles, phone/TV screens, and other incidental reflective surfaces do NOT count. Pass-1 triage flagged this video as likely containing one, but verify it yourself — if there is no true mirror, report zero findings and say so in your ledger; do not search for anything else. This self-check is a deliberate safety net: if pass-1 triage was wrong, you are the last line of defense against false positives here.

If there IS a true mirror: at every moment the mirror is visible along with the real body/subject it should be reflecting, compare them:
- a mirror reflects the subject's CURRENT pose in real time, mirrored left-right (what's on the subject's right appears on the left in the reflection) — the reflection cannot show a pose, limb position, or action the real body isn't doing at that same instant
- the reflection must update in sync with the real subject — no lag, no independent motion
${CONFOUNDS}
- only flag a mismatch in POSE or LIMB POSITION between the real body and its reflection at the same instant — do not flag the reflection merely "facing the wrong way" as a whole, only a specific limb/pose disagreement you can point to in both the real and reflected image at once

OUT OF SCOPE — do not report these (other specialists handle them): anything not involving a true mirror, character wardrobe, object states, lighting.

TASK: Ledger = one line stating whether a true mirror is present, and if so, the moments where mirror + real subject are both visible. Then report every pose/limb mismatch between real and reflected subject at a shared instant.
${OUTPUT_CONTRACT}`,
  },
  {
    id: 'vehicle-continuity',
    name: 'Vehicle Identity & Marking Continuity Observer',
    trigger: 'a specific vehicle (car, truck, motorcycle, etc.) appears on screen at more than one distinct moment, whether it is the main subject or a recurring background element',
    prompt: `You are a forensic vehicle-continuity observer. The ONLY thing you track is a vehicle's identity and fixed markings across every moment it appears:
- identity: make/body-type, color, and configuration (e.g. cab type, number of trailer units) must be the same vehicle every time it's shown, unless a cut explicitly shows it being swapped, driven away and replaced, etc.
- fixed markings: license plates, badges/emblems, decals, and livery text must read the same characters/design every time they are legible — a marking that is legible at two different moments must match, not merely look "similar"
- fixed small hardware (mirrors, antennae, and similarly attached components) should not relocate or change configuration between moments with no visible cause (being folded/unfolded by a visible action is fine)
${CONFOUNDS}
- do NOT flag a marking you can't fully read at both compared moments — partial, angled, or motion-blurred text is not evidence of a mismatch, only two clearly legible readings that disagree
- do NOT flag ordinary parking-position changes, angle changes from camera movement, or reflections/glare on the paint or glass

OUT OF SCOPE — do not report these (other specialists handle them): people inside/around the vehicle, road/environment geometry, non-vehicle objects, causal timing of vehicle motion.

TASK: Ledger: for the featured vehicle, its established identity/markings at first clear sighting → each subsequent moment it's visible → what's the same, what's changed. Then report every unexplained identity or marking mismatch.
${OUTPUT_CONTRACT}`,
  },
  {
    id: 'audio-dialogue-consistency',
    name: 'Audio-Visual Consistency Observer',
    trigger: 'the video has an audio track with intelligible spoken dialogue or narration (a perceptual check — leave the judgment of whether any claim is checkable to the specialist role itself)',
    prompt: `You are a forensic audio-visual consistency observer. The ONLY thing you check is whether intelligible spoken dialogue/narration makes a specific factual claim about the visible scene that the visuals then contradict.
- a spoken claim about a count, color, name, location, or state of something (e.g. a stated color, quantity, or which side something is on) must match what is actually shown on screen at the relevant moment
- do NOT flag dialogue that is vague, figurative, or about something never shown on camera
- do NOT flag mismatches in lip-sync, voice quality, or timing/delay between speech and mouth movement — that is not in scope for you
${CONFOUNDS}

OUT OF SCOPE — do not report these (other specialists handle them): anything not tied to a specific spoken factual claim, lip-sync/timing, non-dialogue sound effects, music.

TASK: Ledger: list every specific, checkable factual claim made in spoken dialogue/narration, with its timestamp. Then report every claim that the visible scene contradicts.
${OUTPUT_CONTRACT}`,
  },
  {
    id: 'on-screen-text-tracking',
    name: 'On-Screen Text Temporal Stability Observer',
    trigger: 'the same piece of on-screen text (a UI element, sign, label, or display) is shown legibly at more than one distinct moment, making it possible to compare whether it stayed the same',
    prompt: `You are a forensic text-stability observer. The ONLY thing you track is whether the SAME piece of on-screen text — a UI element, sign, label, price tag, or display — reads identically every time it is legible.
- once a specific string of text/digits is legible at one moment, it must read the same characters at every later moment it is legible again, unless a visible action changes it (someone types, a sign is replaced, a page turns)
- do NOT flag text that is illegible, too small, or too angled at one of the compared moments — you need two clearly legible readings that disagree
- do NOT flag stylistic rendering differences (font weight, slight jitter) that don't change what the text actually says
${CONFOUNDS}

OUT OF SCOPE — do not report these (other specialists handle them): whether text is legible at all (that's structural-plausibility's job for a single moment), non-text visual elements, spoken audio.

TASK: Ledger: for each distinct piece of on-screen text, its first legible reading → each subsequent legible reading → do they match. Then report every unexplained mismatch between two legible readings of the same text element.
${OUTPUT_CONTRACT}`,
  },
];

export function getConditionalRole(id) {
  const role = CONDITIONAL_CATEGORIES.find((c) => c.id === id);
  if (!role) throw new Error(`Unknown conditional category "${id}". Known: ${CONDITIONAL_CATEGORIES.map((c) => c.id).join(', ')}`);
  return role;
}

// ---------------------------------------------------------------------------
// Pass-1 output parsing
// ---------------------------------------------------------------------------

const KNOWN_CATEGORY_IDS = new Set(CONDITIONAL_CATEGORIES.map((c) => c.id));

function coerceBool(v) {
  if (typeof v === 'boolean') return v;
  if (typeof v === 'string') return v.trim().toLowerCase() === 'true';
  return false;
}

/**
 * Leniently extract the pass-1 classification JSON from model output.
 * Fails open by design: any category the model omits, misnames, or expresses ambiguously
 * resolves to "applicable" so pass-2 runs it rather than silently skipping coverage. Ox Alpha
 * is free, so gating buys speed, not money — losing coverage to a parsing hiccup is the worse
 * trade. Call-site failure policy (pass-1 erroring/timing out entirely) is the same: treat as
 * if every category came back applicable.
 */
export function parseClassification(text) {
  if (!text) return { ok: false, error: 'empty response', applicableIds: new Set(KNOWN_CATEGORY_IDS) };
  const cleaned = text.replace(/```(?:json)?/g, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1) return { ok: false, error: 'no JSON object found', applicableIds: new Set(KNOWN_CATEGORY_IDS) };
  try {
    const obj = JSON.parse(cleaned.slice(start, end + 1));
    if (!Array.isArray(obj.categories)) return { ok: false, error: 'no categories array', applicableIds: new Set(KNOWN_CATEGORY_IDS) };
    const seen = new Map(
      obj.categories.filter((c) => c && KNOWN_CATEGORY_IDS.has(c.id)).map((c) => [c.id, coerceBool(c.applicable)])
    );
    // fail-open per-category too: any known category the model never mentioned defaults to applicable
    const applicableIds = new Set(
      [...KNOWN_CATEGORY_IDS].filter((id) => (seen.has(id) ? seen.get(id) : true))
    );
    return { ok: true, entities: obj.entities ?? [], setting: obj.setting ?? '', activity: obj.activity ?? '', categories: obj.categories, applicableIds };
  } catch (err) {
    return { ok: false, error: `JSON parse failed: ${err.message}`, applicableIds: new Set(KNOWN_CATEGORY_IDS) };
  }
}
