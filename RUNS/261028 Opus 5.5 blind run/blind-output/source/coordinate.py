"""Deterministic job ledger for the blind run. The dispatcher never edits predictions.

  python3 coordinate.py init                       create feature + core jobs (idempotent)
  python3 coordinate.py next N                     claim up to N pending jobs; prints one JSON line each
  python3 coordinate.py dispatched KEY TASK_ID     record the delegated task id for a claimed job
  python3 coordinate.py done KEY STATUS            record terminal provider status (completed|failed|cancelled|interrupted)
  python3 coordinate.py unclaim                    return claimed-but-never-dispatched jobs to pending
  python3 coordinate.py retry KEY                  requeue a failed/parse_error job (max 2 retries), logged as an incident
  python3 coordinate.py status                     counts only
"""
import pathlib,json,datetime,hashlib,sys,subprocess
B=pathlib.Path('/tmp/video-qc-opus55-blind-261028');O=B/'output'; P=json.loads((B/'protocol.json').read_text())
MODEL={'providerInstanceId':'claudeAgent','model':'claude-opus-5-5','options':{'effort':'high','fastMode':False}}
CORE_SAMPLES=[1,2,3]; ROUTER_SAMPLES=[1,2,3]
# Dispatch order: inventories, core s1, routed s1-s3, then core s2/s3.
PRIORITY={('feature',1):0,('core',1):1,('router',1):2,('router',2):3,('router',3):4,('core',2):5,('core',3):6}
def now():return datetime.datetime.now(datetime.timezone.utc).isoformat()
def write(p,obj):
 t=p.with_suffix(p.suffix+'.tmp');t.write_text(json.dumps(obj,indent=2));t.replace(p)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def makejob(m,role,prompt,kind,sample):
 clip=pathlib.Path(m['video']).stem; key=f'{kind}__{clip}__{role}__s{sample}'
 raw=O/('pass1' if kind=='feature' else f'{kind}-s{sample}/raw')/(clip+'.json' if kind=='feature' else f'{clip}__{role}.json')
 response=O/'source/responses'/f'{key}.json'
 neutral=f'''\n\nMEDIA AND TOOL INSTRUCTIONS (neutral):\nYour only assigned video is {m['video_path']}. Work solely under {B}. Do not inspect any other directory, other videos, the protocol, other prompt or response files, prior evaluations, or sibling predictions. No web search or web fetch. Do not spawn subagents or delegate.\nNative video input and honest audio perception/transcription are unavailable in this harness. Actual visual input is timestamped extracted JPEG frames. Audio is UNASSESSED, not absent: do not invent hearing audio or infer speech absence. For scene inventory, spoken_dialogue must be true because uncertain booleans fail open. For an audio-only role, follow its instruction to return empty findings with an audio-unassessed reason in ledger.\nSampling: {m['uniform_fps']} fps uniformly; {'additional detected shot boundary frames included' if m['shot_boundary_sampling'] else 'short-clip uniform sampling'}. View every contact sheet listed below with the Read tool, in chronological order. Each sheet contains six timestamped frames, at most 640x360 per thumbnail. The full-resolution originals and timestamp mapping are in {O/'source/media'/clip/'extraction.json'}. You may view individual original frames with the Read tool, and extract denser frames from your assigned MP4 with ffmpeg if needed; put any additional media only in {O/'source/media'/clip/key}. Inspect images, not just file metadata.\nContact sheets:\n'''+ '\n'.join(m['sheets'])+f'''\nWrite your single strict JSON object, matching the role's exact ledger/findings contract (or the feature-inventory object for the inventory role), to {response} using the Write tool. This is your sole prediction output path. Do not read or write other prediction files. Do not perform a second evaluation, self-verification pass, or retraction pass. After writing the file, reply with only: DONE {key}\n'''
 pp=O/'source/prompts'/f'{key}.txt'; pp.write_text(prompt+neutral)
 return {'key':key,'video':m['video'],'role':role,'sample':sample,'kind':kind,'prompt_path':str(pp),'response_path':str(response),'raw_path':str(raw),'status':'pending','taskId':None,'attempts':0,'actual_input_modality':m['actual_input_modality'],'audio_assessed':False}
def normalize(f):
 bools=['animals_present','vehicle_present','vehicle_seen_multiple_moments','mirror_present','reflective_surfaces_present','liquid_or_granular_transfer','countable_object_group','hands_manipulating_small_objects','spoken_dialogue','camera_has_cuts','windows_or_doorways_visible','person_contacts_furniture_or_fixtures']
 n=dict(f)
 for k in bools:
  if not isinstance(n.get(k),bool):n[k]=True
 n['spoken_dialogue']=True
 if not isinstance(n.get('people_count'),(float,int)) or isinstance(n.get('people_count'),bool):n['people_count']=1
 if n.get('legible_text_present') not in ['none','once','multiple']:n['legible_text_present']='multiple'
 if n.get('setting') not in ['interior','exterior','both']:n['setting']='both'
 if n.get('camera_motion') not in ['static','handheld','tracking','orbit']:n['camera_motion']='tracking'
 return n
def parse(j,manifest):
 payload=json.loads(pathlib.Path(j['response_path']).read_text())
 if not isinstance(payload,dict):raise ValueError('expected object')
 if j['kind']!='feature':
  if not isinstance(payload.get('ledger'),list) or not all(isinstance(x,str) for x in payload['ledger']):raise ValueError('invalid ledger')
  if not isinstance(payload.get('findings'),list):raise ValueError('invalid findings')
  for f in payload['findings']:
   if not all(k in f for k in ['timestamp','entity','invariant_violated','description','severity','confidence']):raise ValueError('missing finding field')
 raw=dict(payload);raw.update({'video':j['video'],'role':j['role'],'sample':j['sample'],'model':MODEL['model'],'options':MODEL['options'],'providerInstanceId':MODEL['providerInstanceId'],'actual_input_modality':j['actual_input_modality'],'audio_assessed':False,'taskId':j['taskId'],'parse_status':'valid','error_status':None})
 write(pathlib.Path(j['raw_path']),raw);j['status']='completed';j['prediction_sha256']=sha(pathlib.Path(j['raw_path']))
def find(manifest,key):
 j=next((x for x in manifest['tasks'] if x['key']==key or x.get('taskId')==key),None)
 if not j:sys.exit(f'unknown key {key}')
 return j
cmd=sys.argv[1]; manifest=json.loads((O/'manifest.json').read_text()); media=json.loads((O/'source/extraction.json').read_text())
if cmd=='init' and not manifest['tasks']:
 for m in media:manifest['tasks'].append(makejob(m,'feature-inventory',P['feature_prompt'],'feature',1))
 for s in CORE_SAMPLES:
  for m in media:
   for r in P['core_roles']:manifest['tasks'].append(makejob(m,r['id'],r['prompt'],'core',s))
 manifest['status']='running'
elif cmd=='dispatched':
 j=find(manifest,sys.argv[2]);j['taskId']=sys.argv[3];j['status']='running';j['dispatched_at']=now();j['attempts']+=1
elif cmd=='done':
 j=find(manifest,sys.argv[2]);st=sys.argv[3];j['provider_status']=st;j['finished_at']=now()
 write(O/'source/delegations'/f"{j['key']}.json",{'taskId':j['taskId'],'status':st,**MODEL,'recorded_at':now(),'attempt':j['attempts']})
 if st=='completed':
  try:parse(j,manifest)
  except Exception as e:j['status']='parse_error';j['error']=str(e)
 else:j['status']='failed';j['error']=f'provider status {st}'
elif cmd=='unclaim':
 for j in manifest['tasks']:
  if j['status']=='claimed':j['status']='pending'
elif cmd=='retry':
 j=find(manifest,sys.argv[2])
 if j['status'] not in ['failed','parse_error']:sys.exit('only failed/parse_error jobs can be retried')
 if j['attempts']>=3:sys.exit('retry limit reached; leave as failed')
 manifest['incidents'].append({'at':now(),'key':j['key'],'previous_status':j['status'],'error':j.get('error'),'previous_taskId':j['taskId'],'action':'requeued'})
 j['status']='pending';j['taskId']=None
 p=pathlib.Path(j['response_path'])
 if p.exists():p.rename(p.with_suffix(f".attempt{j['attempts']}.json"))
# Route completed inventories (deterministic, frozen once).
for j in list(manifest['tasks']):
 if j['kind']=='feature' and j['status']=='completed' and not j.get('routed'):
  f=json.loads(pathlib.Path(j['response_path']).read_text());n=normalize(f)
  route=subprocess.run(['node','--input-type=module','-e',"import {route} from './route.mjs'; console.log(JSON.stringify(route(JSON.parse(process.argv[1]))))",json.dumps(n)],cwd=B,capture_output=True,text=True,check=True)
  selected=json.loads(route.stdout);m=next(m for m in media if m['video']==j['video'])
  freeze={'video':j['video'],'original_inventory_sha256':sha(pathlib.Path(j['response_path'])),'normalized_features':n,'triggered_roles':selected,'normalization':'Uncertain/missing booleans true; unavailable speech true; missing categorical/count fields trigger relevant checks.','frozen_at':now()}
  write(O/'source'/f"{pathlib.Path(j['video']).stem}__routing.json",freeze)
  for s in ROUTER_SAMPLES:
   for r in P['routed_roles']:
    if r['id'] in selected:manifest['tasks'].append(makejob(m,r['id'],r['prompt'],'router',s))
  j['routed']=True;j['triggered_roles']=selected
out=None
if cmd=='next':
 n=int(sys.argv[2]); pend=sorted([x for x in manifest['tasks'] if x['status']=='pending'],key=lambda x:(PRIORITY[(x['kind'],x['sample'])],x['key']))
 # Routed jobs only exist once their inventory finished; hold core s2/s3 until every inventory is done so the order stays stable.
 if not all(x['status']=='completed' for x in manifest['tasks'] if x['kind']=='feature'):
  pend=[x for x in pend if not (x['kind']=='core' and x['sample']>1)]
 out=[]
 for j in pend[:n]:
  j['status']='claimed';out.append({'key':j['key'],'clientRequestId':'opus55-blind-261028-'+j['key']+(f"-a{j['attempts']+1}" if j['attempts'] else ''),'task':f"You are an independent evaluator with a fresh context. Use the Read tool to open {j['prompt_path']} and follow its instructions exactly. Work only under {B}."})
ks=['pending','claimed','running','completed','failed','parse_error']
manifest['counts']={k:sum(j['status']==k for j in manifest['tasks']) for k in ks}
manifest['counts_by_kind']={kind:{k:sum(j['status']==k and j['kind']==kind for j in manifest['tasks']) for k in ks} for kind in ['feature','core','router']}
manifest['updated_at']=now();write(O/'manifest.json',manifest)
if out is not None:
 for x in out:print(json.dumps(x))
 if not out:print('NO_PENDING')
print(json.dumps({'counts':manifest['counts'],'in_flight':manifest['counts']['claimed']+manifest['counts']['running'],'inventories_done':sum(1 for j in manifest['tasks'] if j['kind']=='feature' and j['status']=='completed')}))
