"""Adapt the frozen Opus 5.5 blind outputs to the per-run results/ format (classifications added later)."""
from pathlib import Path
import hashlib, json, sys

ROOT = Path('/Users/kaigani/Documents/PROJECTS/DEVELOPMENT/260705 video qc bench')
RUN = ROOT / 'RUNS/261028 Opus 5.5 blind run'
mapping = {x['blind_id']: x['original'] for x in json.loads((RUN / 'source/input-map.json').read_text())}
frozen = json.loads((RUN / 'blind-output/manifest.json').read_text())
classes_all = json.loads((RUN / 'adjudications.json').read_text()) if (RUN / 'adjudications.json').exists() else {}
prefix = '2026-10-28_claude-opus-5.5-blind'
for layer in ['core-s1', 'core-s2', 'core-s3', 'router-s1', 'router-s2', 'router-s3']:
    run_id = f'{prefix}_{layer}'
    dest = ROOT / 'results' / run_id
    (dest / 'raw').mkdir(parents=True, exist_ok=True)
    manifest = {'runId': run_id, 'model': 'claude-opus-5-5', 'reasoning': True, 'effort': 'high',
                'started': frozen['created_at'], 'completed': frozen['completed_at'], 'totalCost': None,
                'mode': 'blind-agent-frames', 'calls': {},
                'input_modality': '4fps short clips; 1fps plus shot boundaries long clip; optional denser inspection; no assessed audio',
                'source_manifest': str((RUN / 'blind-output/manifest.json').relative_to(ROOT)),
                'source_freeze_receipt': str((RUN / 'blind-output/freeze-receipt.json').relative_to(ROOT)),
                'sample_configuration': 'core x3 + router x3 (full 2.0 protocol); this directory is one sample',
                'adapter_note': 'Only opaque video identifiers mapped back to original filenames and provenance fields added. Ledger/findings preserved exactly; immutable originals remain at source.'}
    classes = {}
    for src in sorted((RUN / 'blind-output' / layer / 'raw').glob('*.json')):
        original = json.loads(src.read_text()); d = dict(original)
        d['video'] = mapping[original['video']]; d['blind_video'] = original['video']
        d['frozen_source'] = str(src.relative_to(ROOT))
        d['frozen_source_sha256'] = hashlib.sha256(src.read_bytes()).hexdigest()
        v = Path(d['video']).stem; key = f"{v}__{d['role']}"
        d.update(key=key, parseOk=True)
        (dest / 'raw' / f'{key}.json').write_text(json.dumps(d, indent=2) + '\n')
        for i in range(len(d['findings'])):
            k = f"{layer}|{v}|{d['role']}|{i}"
            if classes_all:
                classes[f"{v}|{d['role']}|{i}"] = classes_all[k]
        manifest['calls'][key] = {'status': 'ok', 'findings': len(d['findings']), 'parseOk': True, 'taskId': d['taskId'], 'cost': None}
    (dest / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
    if classes_all:
        (dest / 'classifications.json').write_text(json.dumps(classes, indent=2) + '\n')
    print(run_id, len(manifest['calls']), 'calls,', len(classes), 'classified')
