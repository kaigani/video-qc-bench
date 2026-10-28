import pathlib,json,datetime,hashlib,sys,subprocess
B=pathlib.Path('/tmp/video-qc-astra-blind-261027');O=B/'output'; P=json.loads((B/'protocol.json').read_text())
def write(p,obj):
 t=p.with_suffix(p.suffix+'.tmp');t.write_text(json.dumps(obj,indent=2));t.replace(p)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def makejob(m,role,prompt,kind,sample):
 clip=pathlib.Path(m['video']).stem; key=f'{kind}__{clip}__{role}__s{sample}'
 raw=O/('pass1' if kind=='feature' else ('core/raw' if kind=='core' else f'router-s{sample}/raw'))/(clip+'.json' if kind=='feature' else f'{clip}__{role}.json')
 response=O/'source/responses'/f'{key}.json'
 neutral=f'''\n\nMEDIA AND TOOL INSTRUCTIONS (neutral):\nYour only assigned video is {m['video_path']}. Work solely under {B}. Do not inspect the inherited project cwd, other videos, protocol, benchmark documents, prior evaluations, or sibling predictions. No web search. Do not delegate.\nNative video input and honest audio perception/transcription are unavailable in this harness. Actual visual input is timestamped extracted JPEG frames. Audio is UNASSESSED, not absent: do not invent hearing audio or infer speech absence. For scene inventory, spoken_dialogue must be true because uncertain booleans fail open. For an audio-only role, follow its instruction to return empty findings with an audio-unassessed reason in ledger.\nSampling: {m['uniform_fps']} fps uniformly; {'additional detected shot boundary frames included' if m['shot_boundary_sampling'] else 'short-clip uniform sampling'}. Inspect all supplied contact sheets using view_image (return tool images to vision with image(...) when using functions.exec), in chronological order. Each sheet contains six timestamped frames, at most 640x360 per thumbnail. The full-resolution originals and timestamp mapping are in {O/'source/media'/clip/'extraction.json'}. You may inspect individual original frames using view_image, and extract denser frames from your assigned MP4 with ffmpeg if needed; put any additional media only in {O/'source/media'/clip/key}. Inspect images, not just file metadata.\nContact sheets:\n'''+ '\n'.join(m['sheets'])+f'''\nWrite your single strict JSON object, matching the role's exact ledger/findings contract (or the feature-inventory object for the inventory role), to {response}. This is your sole prediction output path. Do not read or write other prediction files. Do not perform a second evaluation, self-verification pass, or retraction pass. Return that JSON object as your final answer as well.\n'''
 task=prompt+neutral
 pp=O/'source/prompts'/f'{key}.txt'; pp.write_text(task)
 return {'key':key,'video':m['video'],'role':role,'sample':sample,'kind':kind,'prompt_path':str(pp),'response_path':str(response),'raw_path':str(raw),'status':'pending','taskId':None,'actual_input_modality':m['actual_input_modality'],'audio_assessed':False}
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
cmd=sys.argv[1]; manifest=json.loads((O/'manifest.json').read_text()); media=json.loads((O/'source/extraction.json').read_text())
if cmd=='init':
 if not manifest['tasks']:
  for m in media:manifest['tasks'].append(makejob(m,'feature-inventory',P['feature_prompt'],'feature',1))
  for m in media:
   for r in P['core_roles']:manifest['tasks'].append(makejob(m,r['id'],r['prompt'],'core',1))
 manifest['status']='running'
if cmd in ['refresh','init']:
 for j in manifest['tasks']:
  receipt=O/'source/delegations'/f"{j['key']}.json"
  if receipt.exists():
   r=json.loads(receipt.read_text());j['taskId']=r.get('taskId');j['provider_status']=r.get('status');j['delegation']=r
   if j['status']=='pending':j['status']='running'
   if r.get('status') in ['failed','cancelled','interrupted']:j['status']='failed';j['error']=r.get('summary')
  if j['status']=='parse_error' and j.get('provider_status')=='completed':
   j['previous_parse_error']=j.get('error'); j['status']='running'
  if j['status'] not in ['completed'] and j.get('provider_status')=='completed' and pathlib.Path(j['response_path']).exists():
   try:
    payload=json.loads(pathlib.Path(j['response_path']).read_text())
    if not isinstance(payload,dict):raise ValueError('expected object')
    if j['kind']!='feature':
     if not isinstance(payload.get('ledger'),list) or not all(isinstance(x,str) for x in payload['ledger']):raise ValueError('invalid ledger')
     if not isinstance(payload.get('findings'),list):raise ValueError('invalid findings')
     for f in payload['findings']:
      if not all(k in f for k in ['timestamp','entity','invariant_violated','description','severity','confidence']):raise ValueError('missing finding field')
    raw=dict(payload);raw.update({'video':j['video'],'role':j['role'],'sample':j['sample'],'model':manifest['model'],'options':manifest['options'],'providerInstanceId':'codex','actual_input_modality':j['actual_input_modality'],'audio_assessed':False,'taskId':j['taskId'],'parse_status':'valid','error_status':None})
    write(pathlib.Path(j['raw_path']),raw);j['status']='completed';j['prediction_sha256']=sha(pathlib.Path(j['raw_path']))
   except Exception as e:j['status']='parse_error';j['error']=str(e)
 for j in list(manifest['tasks']):
  if j['kind']=='feature' and j['status']=='completed' and not j.get('routed'):
   f=json.loads(pathlib.Path(j['response_path']).read_text());n=normalize(f)
   route=subprocess.run(['node','--input-type=module','-e',"import {route} from './route.mjs'; console.log(JSON.stringify(route(JSON.parse(process.argv[1]))))",json.dumps(n)],cwd=B,capture_output=True,text=True,check=True)
   selected=json.loads(route.stdout);m=next(m for m in media if m['video']==j['video'])
   freeze={'video':j['video'],'original_inventory_sha256':sha(pathlib.Path(j['response_path'])),'normalized_features':n,'triggered_roles':selected,'normalization':'Uncertain/missing booleans true; unavailable speech true; missing categorical/count fields trigger relevant checks.','frozen_at':datetime.datetime.now(datetime.timezone.utc).isoformat()}
   write(O/'source'/f"{pathlib.Path(j['video']).stem}__routing.json",freeze)
   for s in [1,2,3]:
    for r in P['routed_roles']:
     if r['id'] in selected:manifest['tasks'].append(makejob(m,r['id'],r['prompt'],'router',s))
   j['routed']=True;j['triggered_roles']=selected
manifest['counts']={k:sum(j['status']==k for j in manifest['tasks']) for k in ['pending','running','completed','failed','parse_error']}
manifest['counts_by_kind']={kind:{k:sum(j['status']==k and j['kind']==kind for j in manifest['tasks']) for k in ['pending','running','completed','failed','parse_error']} for kind in ['core','feature','router']}
manifest['updated_at']=datetime.datetime.now(datetime.timezone.utc).isoformat();write(O/'manifest.json',manifest)
if cmd=='queue':print(json.dumps([dict(j,task=pathlib.Path(j['prompt_path']).read_text()) for j in [x for x in manifest['tasks'] if x['status']=='pending'][:4]]))
else:print(json.dumps(manifest['counts_by_kind']))
