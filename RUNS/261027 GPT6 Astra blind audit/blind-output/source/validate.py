"""Structural/provenance audit only; never scores or edits evaluator predictions."""
import pathlib,json,hashlib,datetime,re,collections,subprocess,math
B=pathlib.Path('/tmp/video-qc-astra-blind-261027'); O=B/'output'
def read(p): return json.loads(pathlib.Path(p).read_text())
def sha(p): return hashlib.sha256(pathlib.Path(p).read_bytes()).hexdigest()
def now(): return datetime.datetime.now(datetime.timezone.utc).isoformat()
m=read(O/'manifest.json'); p=read(B/'protocol.json'); media=read(O/'source/extraction.json')
errors=[]; checks=collections.Counter()
def check(ok,label,context=''):
 checks[label]+=1
 if not ok: errors.append({'check':label,'context':context})
check(sha(B/'protocol.json')==m['protocol_sha256'],'protocol_unchanged')
check(sha(B/'route.mjs')==m['route_sha256'],'router_unchanged')
jobs=m['tasks']; check(len(jobs)==311,'total_invocations')
for field in ['key','taskId','prompt_path','response_path','raw_path']:
 check(len({j.get(field) for j in jobs})==len(jobs),'unique_'+field)
core={r['id']:r['prompt'] for r in p['core_roles']}; routed={r['id']:r['prompt'] for r in p['routed_roles']}
expected=set(); routecounts={}; normalized_differences=[]
for e in media:
 video=e['video'];clip=pathlib.Path(video).stem
 check(sha(e['video_path'])==e['sha256'],'input_video_unchanged',video)
 f=next(j for j in jobs if j['kind']=='feature' and j['video']==video)
 r=read(O/'source'/f'{clip}__routing.json'); orig=read(f['response_path'])
 check(sha(f['response_path'])==r['original_inventory_sha256'],'frozen_inventory_unchanged',video)
 selected=json.loads(subprocess.check_output(['node','--input-type=module','-e',"import {route} from './route.mjs'; console.log(JSON.stringify(route(JSON.parse(process.argv[1]))))",json.dumps(r['normalized_features'])],cwd=B,text=True))
 check(selected==r['triggered_roles']==f['triggered_roles'],'deterministic_routing',video)
 routecounts[clip]=len(selected)
 if orig!=r['normalized_features']:normalized_differences.append(video)
 expected.add((video,'feature-inventory','feature',1))
 for role in core:expected.add((video,role,'core',1))
 for s in [1,2,3]:
  for role in selected:expected.add((video,role,'router',s))
check(expected=={(j['video'],j['role'],j['kind'],j['sample']) for j in jobs},'exact_architecture_coverage')
check(sum(routecounts.values())==71,'triggered_role_count')
audio_count=0
for j in jobs:
 key=j['key'];check(j['status']=='completed' and j.get('provider_status')=='completed','completed_terminal_status',key)
 try:
  receipt=read(O/'source/delegations'/f'{key}.json'); payload=read(j['response_path']); raw=read(j['raw_path']); prompt=pathlib.Path(j['prompt_path']).read_text()
 except Exception as ex:
  errors.append({'check':'read_files','context':key,'error':str(ex)});continue
 opts=receipt.get('options',{});opts={v['id']:v['value'] for v in opts} if isinstance(opts,list) else opts
 check(receipt.get('providerInstanceId')=='codex' and receipt.get('model')=='gpt-6-astra' and opts=={'reasoningEffort':'high','serviceTier':'default'},'requested_model_options',key)
 check(receipt.get('status')=='completed' and not receipt.get('hasPendingChildRuns'),'final_provider_receipt',key)
 check(all(raw.get(k)==v for k,v in payload.items()),'unmodified_payload',key)
 check(sha(j['raw_path'])==j.get('prediction_sha256'),'prediction_hash_matches_manifest',key)
 check(raw.get('taskId')==j['taskId'] and raw.get('parse_status')=='valid' and raw.get('error_status') is None and raw.get('audio_assessed') is False,'raw_metadata',key)
 original=p['feature_prompt'] if j['kind']=='feature' else (core if j['kind']=='core' else routed)[j['role']]
 check(prompt.split('\n\nMEDIA AND TOOL INSTRUCTIONS (neutral):',1)[0]==original,'exact_role_prompt',key)
 if j['kind']=='feature':
  boolfields=['animals_present','vehicle_present','vehicle_seen_multiple_moments','mirror_present','reflective_surfaces_present','liquid_or_granular_transfer','countable_object_group','hands_manipulating_small_objects','spoken_dialogue','camera_has_cuts','windows_or_doorways_visible','person_contacts_furniture_or_fixtures']
  check(all(isinstance(payload.get(k),bool) for k in boolfields),'inventory_booleans',key)
  check(isinstance(payload.get('people_count'),(int,float)) and not isinstance(payload.get('people_count'),bool) and payload['people_count']>=0,'inventory_people_count',key)
  for k,values in [('legible_text_present',['none','once','multiple']),('camera_motion',['static','handheld','tracking','orbit']),('setting',['interior','exterior','both'])]:check(payload.get(k) in values,'inventory_'+k,key)
  check(isinstance(payload.get('notable_entities'),list) and all(isinstance(v,str) for v in payload['notable_entities']),'inventory_entities',key)
  check(payload.get('spoken_dialogue') is True,'audio_fail_open_routing',key)
 else:
  check(isinstance(payload.get('ledger'),list) and all(isinstance(v,str) for v in payload['ledger']),'ledger_schema',key)
  check(isinstance(payload.get('findings'),list),'findings_list',key)
  for ix,v in enumerate(payload.get('findings',[])):
   ctx=f'{key}:finding-{ix}'
   check(all(isinstance(v.get(k),str) for k in ['timestamp','entity','invariant_violated','description']),'finding_text_fields',ctx)
   check(bool(re.fullmatch(r'\d{2}:[0-5]\d',v.get('timestamp',''))),'timestamp_mm_ss',ctx)
   check(v.get('severity') in ['minor','moderate','severe'],'severity_enum',ctx)
   c=v.get('confidence');check(isinstance(c,(int,float)) and not isinstance(c,bool) and math.isfinite(c) and 0<=c<=1,'confidence_range',ctx)
  if j['role']=='audio-visual-claims':
   audio_count+=1;check(payload.get('findings')==[] and 'unassessed' in ' '.join(payload.get('ledger',[])).lower(),'audio_limitation_recorded',key)
check(audio_count==42,'audio_role_count')
summary={'audited_at':now(),'scope':'Structural and provenance checks only; no scoring, semantic adjudication, deduplication or prediction amendment.','passed':not errors,'invocations':len(jobs),'core':sum(j['kind']=='core' for j in jobs),'feature':sum(j['kind']=='feature' for j in jobs),'router':sum(j['kind']=='router' for j in jobs),'router_per_sample':dict(collections.Counter(str(j['sample']) for j in jobs if j['kind']=='router')),'triggered_roles_per_clip':routecounts,'audio_checks_unassessed':audio_count,'inventory_normalization_changed_payloads':normalized_differences,'checks':dict(checks),'errors':errors}
(O/'source/validation.json').write_text(json.dumps(summary,indent=2)+'\n')
print(json.dumps(summary,indent=2))
raise SystemExit(0 if not errors else 1)
