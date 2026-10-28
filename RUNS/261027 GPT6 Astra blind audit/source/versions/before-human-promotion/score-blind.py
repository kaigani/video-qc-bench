"""Score frozen blind predictions using explicit, reviewable parent adjudications.

Does not modify benchmark truth, historical matches, or frozen predictions.
"""
from pathlib import Path
from collections import Counter
from datetime import datetime, timezone
import csv
import hashlib
import json

RUN = Path(__file__).resolve().parent.parent
ROOT = RUN.parent.parent
OUT = ROOT/'DELIVERABLES'/'261027 Astra QC Review'
WEIGHTS = {'P0':8,'P1':5,'P2':3,'P3':2,'P4':1}
truth = json.loads((RUN/'source/ground-truth__ground-truth.json').read_text())
by_id = {d['id']:d for d in truth['defects']}
findings = json.loads((RUN/'source/findings-index.json').read_text())
receipt = json.loads((RUN/'blind-output/freeze-receipt.json').read_text())
verified = Counter()
for group in ['predictions','original_responses','invocation_prompts','delegation_receipts','frozen_routing','run_metadata']:
    for f in receipt[group]:
        p = RUN/'blind-output'/f['path']
        assert hashlib.sha256(p.read_bytes()).hexdigest() == f['sha256'], str(p)
        verified[group] += 1

decisions = {}
def mark(numbers, classification, rationale):
    for n in numbers:
        fid = f'F{n:03}'
        assert fid not in decisions, fid
        decisions[fid] = {'classification': classification, 'rationale': rationale}

mark([1,33,61,86], 'TP:LONG-6', 'Correctly identifies the man embedded in the counter in the frontal seated shot around 36–44s. Existing compound label is matched by its counter-intersection component.')
mark([3,5,35,63,88], 'TP:LONG-11', 'Two separately moving, matching waitresses occupy the opaque room space in the same final shot; this is not the earlier window reflection.')
mark([2,7,37,91], 'EXTRA:mug-merge', 'Two mugs at 72.5s collapse into one by 73–74s; waitress withdraws empty hand. Evidence supports a new object-conservation candidate, distinct from LONG-14 (mug position). Neutral pending human confirmation.')
mark([4,6,9,34,36,62,65,87,90], 'EXTRA:counter-return', 'Visible passage through solid counter at 112–113s, but in the return direction after rising. LONG-8 describes the earlier approach to sit beside the man. Strict event matching gives no existing-label credit; recommend human decision on extending LONG-8 rather than adding duplicate credit.')
mark([8,64,89], 'EXTRA:hatch-kitchen', 'The same rear serving hatch changes from extractor/cooking station to blue-panel/worktop arrangement in the 36–44s shot, and returns afterward. Distinct from LONG-4 exterior/interior mismatch. Neutral pending human confirmation.')
mark([10,11,39,40,66,68,93,94], 'TP:MARB-1', 'Matches duplicated red-ball inventory or non-spherical morphing described by MARB-1. Opening, pickup and later stirring frames support these observations.')
mark([12], 'TP:CUPS-1', 'Identifies the coin moving from inside to outside the cup wall/rim during continuous handling, the labeled event.')
mark([13], 'TP:MIRR-1', 'Identifies simultaneous direct/reflected grooming contact-position mismatch. It does not also earn MIRR-2 credit for implement morphing.')
mark([14,46,73,99], 'TP:PHON-1', 'Garbled text is independently sufficient under the existing compound PHON-1 label; no extra credit for the unreported gesture component.')
mark(list(range(15,28))+list(range(48,60))+list(range(74,85))+list(range(100,110)), 'TP:BLOC-1', 'Existing matches.json precedent explicitly accepts block multiplication, color changes AND numeral transformations as BLOC-1. Preserve that broad matching convention and award only one unique eight-point credit, regardless of how many findings repeat it. Digit-only findings are not new truth defects.')
mark([28], 'TP:APPL-3', 'Correctly identifies the unnaturally turquoise fruit already labeled APPL-3.')
mark([29], 'FP', 'The central exposed skin at the cuff can be the wrist/back of the same hand whose fingers wrap around the opposite upper arm. The distant fingers belong to the other hand. No independent third hand is established; 6–7s original frames permit ordinary crossed-arm anatomy.')
mark([30,31,32,60,85,110], 'TP:CAR-1', 'Correctly identifies the torso extending through the windshield/hood geometry ahead of the side-window opening. No additional CAR labels are inferred.')
mark([38,92], 'TP:LONG-13', 'Correctly identifies the tall pale sleeper cab becoming a short green cab with box body at departure.')
mark([41,43,69,71,95,97], 'TP:DANC-1', 'DANC-1 is the general mirror-pose mismatch label, especially but not exclusively feet. Arm elevation/held-elbow mismatch qualifies; DANC-3 remains reserved for the explicit front/behind-pelvis contradiction.')
mark([42,70,96], 'TP:DANC-3', 'Explicitly identifies the hand behind the real pelvis but in front of the reflected pelvis at about 5.25–5.5s.')
mark([44,72,98], 'TP:HOME-2', 'Correctly locates both dining chairs against/under the foot of the bed. Does not receive HOME-1 connectivity credit.')
mark([45], 'TP:CUPS-2', 'Correctly identifies the coin-to-cup transformation by the performer’s other hand around 6.5–7s, rather than merely a magic count change.')
mark([47], 'TP:OLIV-2', 'Green olive enters the receiver around 0.25s but is absent from the empty base in intervening frames, before the later dark olive arrives. This is a concrete source/arrival conservation failure covered by OLIV-2. No additional OLIV-1 credit is inferred from color.')
mark([67], 'FP', 'The purported red-ball disappearance after return is not established independently of hand occlusion: at 5.125–5.25s the hand still overlaps part of the bowl. This is narrower than the other well-supported duplication findings. Conservative penalty; accepting it as MARB-1 would raise only the net score by one, without new detection credit.')

assert len(findings) == len(decisions) == 110
for f in findings:
    f.update(decisions[f['id']])
    if f['classification'].startswith('TP:'):
        d = by_id[f['classification'][3:]]
        assert f['video'] == d['video']+'.mp4', f

def score(selected):
    hits = sorted({f['classification'][3:] for f in selected if f['classification'].startswith('TP:')})
    count = Counter(f['classification'].split(':')[0] for f in selected)
    detection = sum(WEIGHTS[by_id[d]['priority']] for d in hits)
    return {'detection':detection, 'maximum_detection':141, 'score':detection-count['FP'],
            'defects_found':len(hits), 'total_defects':48, 'tp_findings':count['TP'],
            'fp_findings':count['FP'], 'extra_findings':count['EXTRA'],
            'total_findings':len(selected), 'detected_ids':hits,
            'weighted_recall_percent':round(detection/141*100,2),
            'defect_recall_percent':round(len(hits)/48*100,2),
            'extra_classes':dict(Counter(f['classification'][6:] for f in selected if f['classification'].startswith('EXTRA:')))}

sets = {name:[f for f in findings if f['run']==name] for name in ['core','router-s1','router-s2','router-s3']}
sets['router-union']=[f for f in findings if f['run'].startswith('router-')]
sets['combined']=findings
sets['generalist-only']=[f for f in sets['core'] if f['role']=='baseline-generalist']
scores={k:score(v) for k,v in sets.items()}
per_video=[]
for v in sorted({d['video'] for d in truth['defects']}):
    subset=[f for f in findings if f['video']==v+'.mp4']
    s=score(subset)
    s.update(video=v,available_defects=sum(d['video']==v for d in truth['defects']),available_weight=sum(WEIGHTS[d['priority']] for d in truth['defects'] if d['video']==v))
    per_video.append(s)
core_ids=set(scores['core']['detected_ids']); router_ids=set(scores['router-union']['detected_ids'])
missed=[d for d in truth['defects'] if d['id'] not in scores['combined']['detected_ids']]
summary={
    'status':'complete; assistant-adjudicated, pending human review of EXTRA candidates and disputed matches',
    'adjudicator':'parent GPT-6 Astra; knows frozen answer key; not an independent human judge',
    'protocol':'v1 six-role core x1 + deterministic feature routing x3, independent fresh contexts',
    'model':'gpt-6-astra','reasoning_effort':'high','service_tier':'default',
    'frozen_at':receipt['frozen_at'],'adjudicated_at':datetime.now(timezone.utc).isoformat(),
    'freeze_verification':dict(verified),'scores':scores,'per_video':per_video,
    'router_added_ids':sorted(router_ids-core_ids),'core_only_ids':sorted(core_ids-router_ids),
    'missed_defects':missed,
    'sensitivity':{
        'all_16_extra_findings_rejected_as_fp':scores['combined']['score']-scores['combined']['extra_findings'],
        'counter_return_accepted_as_LONG_8':scores['combined']['score']+3,
        'F067_accepted_as_MARB_1':scores['combined']['score']+1,
        'both_changes':scores['combined']['score']+4,
        'note':'Sensitivity scenarios are adjudication choices, not statistical confidence intervals. No new-label weights have been added.'},
    'limits':receipt['limitations'],
    'public_leaderboard_modified':False,'ground_truth_modified':False,
}
(RUN/'adjudications.json').write_text(json.dumps({'policy':'Unique existing-defect credit, one point per FP finding including repeats, EXTRA neutral pending human adjudication. Strict event matching; broad BLOC-1 precedent retained. No new defects promoted.','findings':findings},indent=2))
(RUN/'scores.json').write_text(json.dumps(summary,indent=2))
(OUT/'Scores.json').write_text(json.dumps(summary,indent=2))
(OUT/'Adjudications.json').write_text((RUN/'adjudications.json').read_text())
with (OUT/'Findings.csv').open('w',newline='') as fp:
    fields=['id','run','video','role','timestamp','confidence','classification','description','rationale','raw_file']
    writer=csv.DictWriter(fp,fieldnames=fields);writer.writeheader()
    for f in findings:
        writer.writerow({**{k:f[k] for k in ['id','run','video','role','classification','rationale']},'timestamp':f['finding']['timestamp'],'confidence':f['finding']['confidence'],'description':f['finding']['description'],'raw_file':f['file']})
print(json.dumps({k:{a:b for a,b in v.items() if a not in ['detected_ids','extra_classes']} for k,v in scores.items()},indent=2))
print('Router additions:',summary['router_added_ids'])
print('Sensitivity:',summary['sensitivity'])
