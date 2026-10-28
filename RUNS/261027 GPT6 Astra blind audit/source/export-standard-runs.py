"""Adapt immutable blind outputs to the existing per-run classification format."""
from pathlib import Path
import hashlib
import json

RUN=Path(__file__).resolve().parent.parent
ROOT=RUN.parent.parent
mapping={x['blind_id']:x['original'] for x in json.loads((RUN/'source/input-map.json').read_text())}
adjudications=json.loads((RUN/'adjudications.json').read_text())['findings']
frozen=json.loads((RUN/'blind-output/manifest.json').read_text())
prefix='2026-10-27_gpt-6-astra-blind'
for layer in ['core','router-s1','router-s2','router-s3']:
    run_id=f'{prefix}_{layer}'
    dest=ROOT/'results'/run_id
    (dest/'raw').mkdir(parents=True,exist_ok=True)
    classes={}
    for f in adjudications:
        if f['run']==layer:
            classes[f"{Path(f['video']).stem}|{f['role']}|{f['index']}"]=f['classification']
    manifest={'runId':run_id,'model':'gpt-6-astra','reasoning':True,'reasoningEffort':'high','serviceTier':'default',
              'started':frozen['created_at'],'completed':frozen['completed_at'],'totalCost':None,
              'mode':'blind-agent-frames','calls':{},'input_modality':'4fps short clips; 1fps plus shot boundaries long clip; optional denser inspection; no assessed audio',
              'source_manifest':str((RUN/'blind-output/manifest.json').relative_to(ROOT)),
              'source_freeze_receipt':str((RUN/'blind-output/freeze-receipt.json').relative_to(ROOT)),
              'sample_configuration':'core x1 + router x3; not the Nemotron core x3 + router x3 sampling configuration',
              'adapter_note':'Only opaque video identifiers mapped back to original filenames and provenance fields added. Ledger/findings preserved exactly; immutable originals remain at source.'}
    for src in sorted((RUN/'blind-output'/layer/'raw').glob('*.json')):
        original=json.loads(src.read_text());d=dict(original)
        d['video']=mapping[original['video']]
        d['blind_video']=original['video']
        d['frozen_source']=str(src.relative_to(ROOT))
        d['frozen_source_sha256']=hashlib.sha256(src.read_bytes()).hexdigest()
        key=f"{Path(d['video']).stem}__{d['role']}"
        d.update(key=key,parseOk=True)
        (dest/'raw'/f'{key}.json').write_text(json.dumps(d,indent=2)+'\n')
        for i in range(len(d['findings'])):
            assert f"{Path(d['video']).stem}|{d['role']}|{i}" in classes
        manifest['calls'][key]={'status':'ok','findings':len(d['findings']),'parseOk':True,'taskId':d['taskId'],'cost':None}
    (dest/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
    (dest/'classifications.json').write_text(json.dumps(classes,indent=2)+'\n')
    print(run_id,len(manifest['calls']),'calls,',len(classes),'classified findings')
