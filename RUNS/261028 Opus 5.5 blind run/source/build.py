"""Build per-group adjudication packets for the Opus 5.5 blind run (post-freeze; not blind)."""
import json, pathlib, collections, random
ROOT = pathlib.Path('/Users/kaigani/Documents/PROJECTS/DEVELOPMENT/260705 video qc bench')
B = pathlib.Path('/tmp/video-qc-opus55-blind-261028/output')
OUT = pathlib.Path('/tmp/opus55-adj')
LAYERS = ['core-s1', 'core-s2', 'core-s3', 'router-s1', 'router-s2', 'router-s3']
GROUPS = {
    'g1': ['_long-scene'],
    'g2': ['dancer-mirror', 'man-in-mirror', 'phone'],
    'g3': ['man-cups', 'pouring-olives', 'child-marbles'],
    'g4': ['woman-car', 'woman-apple', 'skateboarder'],
    'g5': ['home-tour', 'watchmaker', 'weird-blocks', 'dialogue'],
}
blind = {x['blind_id']: x['original'].replace('.mp4', '') for x in json.loads((ROOT / 'RUNS/261027 GPT6 Astra blind audit/source/input-map.json').read_text())}
GT = json.loads((ROOT / 'ground-truth/ground-truth.json').read_text())
M = json.loads((ROOT / 'ground-truth/matches.json').read_text())
EXTRAS = M['_extras']

# Prior labelled findings: leaderboard runs (matches.json) + extra Argon/Astra sample runs (classifications.json).
prior = collections.defaultdict(list)  # video -> [(label, run, text)]
def add(video, cls, run, fi):
    prior[video].append((cls, run, f"[{fi.get('timestamp')}] {fi.get('entity')}: {fi.get('description')}"))
for label, run in M['_runs'].items():
    for f in (ROOT / 'results' / run / 'raw').glob('*.json'):
        d = json.loads(f.read_text()); v = d['video'].replace('.mp4', '')
        for i, fi in enumerate(d.get('findings') or []):
            c = M.get(f"{label}|{v}|{d['role']}|{i}")
            if c: add(v, c, label, fi)
for run in ['2026-10-27_gemini-4-argon_v1-s2', '2026-10-27_gemini-4-argon_v1-s3', '2026-10-27_gemini-4-argon_router-s1',
            '2026-10-27_gemini-4-argon_router-s2', '2026-10-27_gemini-4-argon_router-s3',
            '2026-10-27_gpt-6-astra-blind_core', '2026-10-27_gpt-6-astra-blind_router-s1',
            '2026-10-27_gpt-6-astra-blind_router-s2', '2026-10-27_gpt-6-astra-blind_router-s3']:
    C = json.loads((ROOT / 'results' / run / 'classifications.json').read_text())
    short = run.replace('2026-10-27_', '')
    for f in (ROOT / 'results' / run / 'raw').glob('*.json'):
        d = json.loads(f.read_text()); v = d['video'].replace('.mp4', '')
        for i, fi in enumerate(d.get('findings') or []):
            c = C.get(f"{v}|{d['role']}|{i}")
            if c: add(v, c, short, fi)

def prior_sample(video):
    random.seed(video)
    rows = prior[video]; byc = collections.defaultdict(list)
    for r in rows: byc[r[0]].append(r)
    keep = []
    for c, rs in byc.items():
        # prefer recent strong models as exemplars
        rs.sort(key=lambda r: (0 if ('argon' in r[1] or 'astra' in r[1]) else 1))
        keep += rs[:5] if c != 'FP' else rs[:60]
    return sorted(keep, key=lambda r: r[0])

# Opus findings
findings = collections.defaultdict(list)  # video -> [(key, layer, role, text)]
counts = collections.Counter()
for layer in LAYERS:
    for f in sorted((B / layer / 'raw').glob('*.json')):
        d = json.loads(f.read_text()); v = blind[d['video']]
        for i, fi in enumerate(d['findings']):
            key = f"{layer}|{v}|{d['role']}|{i}"
            findings[v].append((key, f"[{fi['timestamp']}] ({fi['severity']}, conf {fi['confidence']}) {fi['entity']}: {fi['description']}"))
            counts[layer] += 1
print(dict(counts), sum(counts.values()))

rules = (pathlib.Path.home() / '.claude/projects/-Users-kaigani-Documents-PROJECTS-DEVELOPMENT-260705-video-qc-bench/memory/video-qc-adjudication-rules.md').read_text().split('---', 2)[2]
blind_rev = {v: k.replace('.mp4', '') for k, v in blind.items()}
for g, vids in GROUPS.items():
    L = [f'# Adjudication packet {g}: {", ".join(vids)}', '', '## Adjudication rules (from the human reviewer, KT)', rules.strip(), '']
    for v in vids:
        L += [f'## Clip `{v}` (frames: {B}/source/media/{blind_rev[v]}/ — sheet-*.jpg contact sheets, frame-*.jpg at {"1 fps + cut-*.jpg shot boundaries" if v == "_long-scene" else "4 fps"}, extraction.json maps files to timestamps; source video {B.parent}/inputs/{blind_rev[v]}.mp4)', '']
        L += ['### Ground-truth defects', '']
        L += [f"- **{d['id']}** ({d['priority']}): {d['description']}" for d in GT['defects'] if d['video'] == v] or ['- none (clean clip)']
        ex = [f'- **{k}**: {t}' for k, t in EXTRAS.items() if t.startswith(v + ':') or t.startswith(v + ' ')]
        if ex: L += ['', '### Pending EXTRA classes already registered (reuse the slug if a finding matches)', ''] + ex
        L += ['', '### Prior labelled findings from other models on this clip (for consistency)', '']
        L += [f'- `{c}` ({r}) {t[:260]}' for c, r, t in prior_sample(v)]
        L += ['', f'### Opus 5.5 findings to classify ({len(findings[v])})', '']
        L += [f'- `{k}` {t}' for k, t in findings[v]]
        L += ['']
    (OUT / f'{g}.md').write_text('\n'.join(L))
    print(g, sum(len(findings[v]) for v in vids), 'findings,', len('\n'.join(L)) // 1000, 'KB')
json.dump({v: [k for k, _ in fs] for v, fs in findings.items()}, open(OUT / 'keys.json', 'w'), indent=1)
