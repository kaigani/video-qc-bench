from pathlib import Path
import base64
import html
import json
from datetime import datetime, timezone

RUN = Path(__file__).resolve().parent.parent
ROOT = RUN.parent.parent
OUT = ROOT / 'DELIVERABLES' / '261027 Astra QC Review'
OUT.mkdir(parents=True, exist_ok=True)

coverage = [
    ('_long-scene', '15 / 57', 'Counter/body geometry, character placement, duplicate waitress, props, lighting and meal chronology are already represented. Overview sampled every 4 seconds; selected original-resolution frames checked. Brief events between samples are not exhaustively audited.'),
    ('child-marbles', '1 / 3', 'Red-ball duplication and changing ball geometry are covered by MARB-1. No separate additional defect established.'),
    ('dancer-mirror', '4 / 12', 'Pose mismatch, tattoo changes, hand in front/behind, and extra reflected door are already in the current truth.'),
    ('dialogue', '1 / 2', 'No additional visual defect established. The audio claim is in the structured truth; audio was not independently heard in this audit.'),
    ('home-tour', '2 / 8', 'Kitchen connectivity and chairs at the foot of the bed are already covered. Do not count the microwave in the second kitchen as a separate defect.'),
    ('man-cups', '5 / 12', 'Count/state changes, double tie and extra-finger annotation are already covered. Deliberate sleight of hand must not itself count as a defect.'),
    ('man-in-mirror', '2 / 2', 'Reflected action mismatch and changing grooming implement are already covered.'),
    ('phone', '1 / 2', 'Garbled UI and lack of response already belong to PHON-1. No additional defect established.'),
    ('pouring-olives', '4 / 6', 'Source-vessel and transfer defects are covered. The receiving jar’s side protrusion is visible at the start and end; rejected as a new hardware-appearance claim.'),
    ('skateboarder', '2 / 4', 'Malformed underside/wheel arrangement is visible in the 2.0s frame and is already SKAT-1. Foot-state problems are already SKAT-2.'),
    ('watchmaker', '1 / 1', 'The later winding motion is already within WATC-1. The tweezers move down out of frame around 4s; that is insufficient evidence of disappearance.'),
    ('weird-blocks', '1 / 8', 'Multiplication and color changes are already BLOC-1. A 3→6 face change near 7.75s occurs during a turn; without resolving face rotation, it is not a defensible extra text defect.'),
    ('woman-apple', '4 / 10', 'Apple support/disappearance, unnatural fruit colors and background glyphs are already covered. Do not reintroduce the previously rejected umbrella claim.'),
    ('woman-car', '5 / 14', 'Body/hood geometry, plate, road, airflow and wiper annotations already exist. No separate additional defect established.'),
]

audit = {
    'created_utc': datetime.now(timezone.utc).isoformat(),
    'status': 'visual audit complete; independent blind batch and adjudication pending',
    'ground_truth_defects': 48, 'maximum_weighted_detection': 141,
    'new_defects_recommended_for_immediate_promotion': [],
    'method': 'Non-blind parent audit of original videos via timestamped extracted frames: 2fps for 13 shorts, 0.25fps overview for long clip, selected full-resolution frames and dense follow-ups. No native motion playback or independent audio perception. This is an evidence review, not proof that no other defects exist.',
    'coverage': [{'video': a, 'defects_and_weight': b, 'assessment': c} for a,b,c in coverage],
    'ground_truth_unchanged': True,
    'blind_protocol': 'One independent core evaluation per video × six roles; separate feature inventory; deterministic router; three independent evaluations per triggered check; union score; no global confounds or verification pass.',
    'blind_limitations': [
        'GPT-6 Astra high reasoning, default service tier, Codex harness.',
        'Actual input is timestamped image frames with optional denser inspection, not native video.',
        'Audio currently unassessed, not evidence of silence.',
        'Fresh task contexts and restricted-path instructions; shared filesystem is not an OS-enforced blind sandbox.',
        'Existing v2 prompts were developed from this benchmark and include dataset-informed examples. Blind access to labels is not equivalent to an unseen holdout benchmark.',
        'Three router samples are not three independent complete benchmark replications.',
    ],
}
(RUN/'audit.json').write_text(json.dumps(audit,indent=2))

def img(name):
    p = RUN/'source'/'audit-frames'/name
    return 'data:image/jpeg;base64,'+base64.b64encode(p.read_bytes()).decode()

rows=''.join('<tr><td>'+html.escape(a)+'</td><td>'+b+'</td><td>'+html.escape(c)+'</td></tr>' for a,b,c in coverage)
page='''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Astra QC review — 27 October 2026</title>
<style>:root{color-scheme:light dark;font-family:system-ui,sans-serif;line-height:1.55}body{max-width:1040px;margin:32px auto;padding:0 20px}h1,h2{line-height:1.2}h1{font-size:30px}h2{margin-top:36px;font-size:21px}.muted{opacity:.7}.note{padding:18px;border:1px solid #8886;border-radius:12px}table{border-collapse:collapse;width:100%;font-size:14px}td,th{text-align:left;border-bottom:1px solid #8885;padding:12px 8px;vertical-align:top}td:first-child{white-space:nowrap}img{max-width:100%;height:auto;border-radius:8px}summary{cursor:pointer;font-weight:600;margin:16px 0}.grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}figure{margin:0}figcaption{font-size:14px;margin-top:8px}@media(max-width:650px){.grid{grid-template-columns:1fr}table{font-size:12px}td{padding:8px 4px}td:first-child{white-space:normal}}@media print{details{display:block}summary{display:none}}</style>
<h1>Video QC: annotation audit and blind Astra evaluation</h1><p class="muted">27 October 2026 · audit complete; blind evaluation in progress</p>
<p><strong>I would not promote another defect into the current 48-item ground truth on the evidence reviewed so far.</strong> Most apparent additions are already covered by existing labels, or are not sufficiently distinguishable from rotation, occlusion or deliberate performance. This is a sampled visual audit, not an exhaustive claim that the videos contain no other defects.</p>
<div class="note"><strong>No Astra score yet.</strong> The independent blind v2 batch is running. Scores will be calculated only after predictions are frozen. Existing ground truth, adjudications and the public leaderboard remain unchanged.</div>
<h2>The answer key has advanced beyond the original human-review file</h2>
<p>The original Markdown review lists 36 defects; the structured truth now contains <strong>48 defects worth 141 points</strong>. The extra 12 include model-prompted, human-confirmed observations. Examples include the double tie and extra-finger annotation in <em>man-cups</em>, duplicate reflected door in <em>dancer-mirror</em>, meal chronology in the diner, and the audio claim in <em>dialogue</em>. Those are not new discoveries from this run.</p>
<p><em>Dialogue</em> remains a visual false-positive control, but it is not an audio-clean clip under the current truth: DIAL-1 is worth two points. This audit has not independently listened to that audio.</p>
<h2>Per-video review</h2><p class="muted">Middle column: ground-truth defect count / available severity weight. These are answer-key totals, not Astra detections.</p>
<table><thead><tr><th>Video</th><th>Truth</th><th>Assessment</th></tr></thead><tbody>'''+rows+'''</tbody></table>
<h2>Evidence and rejected additions</h2><div class="grid"><figure><img src="'''+img('skateboarder-002.00.jpg')+'''" alt="Skateboard underside at 2 seconds"><figcaption><strong>Already SKAT-1:</strong> the malformed wheel/truck configuration is visible at 2.0 seconds. It is useful evidence for the existing label, not another defect.</figcaption></figure><figure><img src="'''+img('_long-scene-112.00.jpg')+'''" alt="Diner at 112 seconds"><figcaption><strong>Already LONG-11:</strong> the second waitress instance appears behind the foreground waitress at 112 seconds.</figcaption></figure></div>
<details><summary>Why I did not add a new block-digit defect</summary><img src="'''+img('blocks-turn-dense.jpg')+'''" alt="Frame-by-frame block turn"><p>The rightmost block changes from showing 3 to showing 6 near 7.75s. Its orientation also changes, and a 3 is visible on its side afterward. A digit-only claim has not ruled out rotation. The multiplication and color transformations remain covered by BLOC-1.</p></details>
<details><summary>Why I did not add receiving-jar hardware or vanishing tweezers</summary><div class="grid"><figure><img src="'''+img('olive-jar.jpg')+'''" alt="Receiving jar over time"><figcaption>The side protrusion exists from the first frame; it does not newly appear during pouring.</figcaption></figure><figure><img src="'''+img('watch-tool.jpg')+'''" alt="Watchmaker hand and tool sequence"><figcaption>The tweezers move below the image around 4s, permitting an ordinary set-down. Later winding is already included in WATC-1.</figcaption></figure></div></details>
<h2>Scoring issues to resolve separately from this run</h2>
<ol><li><strong>Clarify ambiguous labels.</strong> OLIV-1 explicitly permits dark olives being hidden below green ones. LONG-5 says the man seems to bring his own cup, which alone is not a physical impossibility. Preserve their current scores here, but require timestamped evidence and an explicit reason these count as defects for future benchmark revisions.</li>
<li><strong>Make units of credit explicit.</strong> Several labels combine multiple observations: LONG-6 combines counter intersection and a missing woman; PHON-1 combines text corruption and unresponsive UI. The scorer currently maps each finding to one defect ID. Define which component suffices for a match, and how a single finding describing two separate defects is handled, before changing adjudication rules.</li>
<li><strong>Separate detection from reporting discipline.</strong> Detection counts each truth defect once; each false-positive finding costs one point, including repeated claims across samples. More sampling can increase recall and lower the final score simultaneously. Report both axes and the component runs.</li>
<li><strong>Do not treat corroboration as confirmation.</strong> Repeated model claims can share a bias. Any new candidate remains neutral pending evidence and human adjudication, rather than automatically receiving truth credit.</li>
<li><strong>Freeze priorities and denominators.</strong> DANC-4’s description still says its P3 priority awaits KT confirmation. The diner contributes 57/141 points (40.4%), so a few diner labels strongly affect rankings.</li></ol>
<h2>Blind v2 run: exact architecture and limits</h2>
<p>GPT-6 Astra, <strong>high reasoning</strong>, default service tier. The six unchanged core roles run independently for each clip (84 evaluations). A separate perceptual inventory determines the routed checks; its decisions are frozen and reused across <strong>three independent samples</strong>. The resulting union receives unique defect credit and a one-point penalty per false-positive finding. No rejected global-confound prompt and no self-verification pass.</p>
<p>The evaluator received opaque video names, generic protocol prompts and a clean conversation, without the answer key or prior outputs. This is procedural blinding on a shared filesystem, not an OS-enforced security boundary. The existing v2 router was developed from this dataset and contains dataset-informed examples; therefore the evaluation is blind to the labels, but is not evidence of performance on an unseen holdout set.</p>
<p><strong>Actual media input is extracted frames, with optional denser inspection.</strong> Native video/audio API entries have different input affordances. Audio is currently unassessed. Retain the official 141-point denominator and explicitly identify the missed/unassessed audio component; a supplemental visual-only denominator is 139. A full statistical claim about Astra’s run-to-run variance would require repeated complete runs, not merely the three routed samples.</p>
<p class="muted">Audit method: 2fps contact sheets for all 13 short clips; 4-second overview sampling of the long clip; original-resolution follow-ups and a 24fps local sequence where needed. No independent audio playback. Supporting frames, reference snapshots, delegation receipt and machine-readable audit are retained in RUNS/261027 GPT6 Astra blind audit/. The blind predictions have not been used to form this parent audit.</p>
</html>'''
(OUT/'Audit.html').write_text(page)
print(OUT/'Audit.html')
