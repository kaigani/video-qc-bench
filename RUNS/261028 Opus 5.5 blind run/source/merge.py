"""Merge per-group classifications, apply cross-run corroboration to NOVEL claims, write adjudications."""
import json, pathlib, collections
ADJ = pathlib.Path('/tmp/opus55-adj')
RUN = pathlib.Path('/Users/kaigani/Documents/PROJECTS/DEVELOPMENT/260705 video qc bench/RUNS/261028 Opus 5.5 blind run')
keys = json.loads((ADJ / 'keys.json').read_text())
allkeys = {k for ks in keys.values() for k in ks}
classes, novel, lenient, notes = {}, {}, [], {}
for g in ['g1', 'g2', 'g3', 'g4', 'g5']:
    o = json.loads((ADJ / f'{g}.out.json').read_text())
    classes.update(o['classes']); novel.update(o.get('novel', {})); lenient += o.get('lenient', []); notes[g] = o.get('notes', '')
missing = allkeys - set(classes); extra = set(classes) - allkeys
assert not missing and not extra, (sorted(missing)[:10], sorted(extra)[:10])
# corroboration: NOVEL slug reported in >= 2 distinct layers (independent samples) -> EXTRA, else FP
layers = collections.defaultdict(set)
for k, c in classes.items():
    if c.startswith('NOVEL:'): layers[c[6:]].add(k.split('|')[0])
promoted = {s for s, ls in layers.items() if len(ls) >= 2}
final = {}
for k, c in classes.items():
    if c.startswith('NOVEL:'):
        final[k] = f'EXTRA:{c[6:]}' if c[6:] in promoted else 'FP'
    else:
        final[k] = c
out = {'scope': 'Post-freeze adjudication of the Opus 5.5 blind run against ground-truth/ground-truth.json (50 defects).',
       'method': 'Per-clip-group classification by Claude subagents with the reviewer rules and prior labelled findings; NOVEL claims corroborated in >=2 independent samples become EXTRA (neutral, pending KT), others FP.',
       'classes': final, 'raw_classes': classes,
       'novel': {s: {'description': novel.get(s, ''), 'layers': sorted(layers[s]), 'promoted_to_extra': s in promoted} for s in layers},
       'lenient': lenient, 'notes': notes}
(RUN / 'adjudications.json').write_text(json.dumps(final, indent=2) + '\n')
(RUN / 'adjudication-detail.json').write_text(json.dumps(out, indent=2) + '\n')
cnt = collections.Counter(c.split(':')[0] for c in final.values())
print(dict(cnt), len(final))
print('promoted extras:', {s: sorted(layers[s]) for s in promoted})
print('single-run novel -> FP:', sorted(set(layers) - promoted))
