"""Freeze completed run metadata and hash unchanged predictions."""
import pathlib,json,hashlib,datetime
B=pathlib.Path('/tmp/video-qc-opus55-blind-261028');O=B/'output'
def read(p):return json.loads(pathlib.Path(p).read_text())
def write(p,x):pathlib.Path(p).write_text(json.dumps(x,indent=2)+'\n')
def sha(p):return hashlib.sha256(pathlib.Path(p).read_bytes()).hexdigest()
def entry(p):return {'path':str(pathlib.Path(p).relative_to(O)),'sha256':sha(p),'bytes':pathlib.Path(p).stat().st_size}
assert not (O/'freeze-receipt.json').exists(),'Already frozen; do not overwrite'
m=read(O/'manifest.json');v=read(O/'source/validation.json'); media=read(O/'source/extraction.json');jobs=m['tasks']
assert v['passed'] and all(j['status']=='completed' and j['provider_status']=='completed' for j in jobs)
raws=sorted(pathlib.Path(j['raw_path']) for j in jobs)
actual=sorted([*(O/'pass1').glob('*.json'),*[x for s in [1,2,3] for k in ['core','router'] for x in (O/f'{k}-s{s}/raw').glob('*.json')]])
assert raws==actual,'Unexpected or missing prediction files'
for j in jobs:assert sha(j['raw_path'])==j['prediction_sha256']
media_index=[]
for e in media:
 clip=pathlib.Path(e['video']).stem;folder=O/'source/media'/clip
 shared={pathlib.Path(x['file']) for x in e['frames']}|{pathlib.Path(x) for x in e['sheets']}
 additional=sorted(x for x in folder.rglob('*') if x.is_file() and x.suffix.lower() in ['.jpg','.jpeg','.png','.wav','.mp3','.mp4'] and x not in shared)
 media_index.append({'video':e['video'],'shared_frames':len(e['frames']),'shared_contact_sheets':len(e['sheets']),'uniform_fps':e['uniform_fps'],'additional_extracted_assets':[entry(x) for x in additional]})
write(O/'source/media-assets-index.json',{'scope':'Available media assets, not an audit of individual tool reads.','clips':media_index})
frozen=datetime.datetime.now(datetime.timezone.utc).isoformat()
m['status']='frozen';m['completed_at']=m['updated_at'];m['frozen_at']=frozen
m['validation_path']=str(O/'source/validation.json');m['freeze_receipt_path']=str(O/'freeze-receipt.json')
m['summary']={'completed':len(jobs),'core':v['core'],'inventories':v['feature'],'router':v['router'],'core_per_sample':v['core_per_sample'],'router_per_sample':v['router_per_sample'],'triggered_clip_role_checks':sum(v['triggered_roles_per_clip'].values()),'audio_role_calls_unassessed':v['audio_checks_unassessed'],'retries':len(m.get('incidents',[]))}
m['evaluation_policy']={'scored':False,'deduplicated':False,'adjudicated':False,'prediction_payloads_amended':False,'additional_evaluation_passes':False,'original_role_prompts_unchanged':True,'routing_function_unchanged':True,'fresh_context_delegation':'App-owned independent delegated task per invocation (T3 delegate_task, Claude Opus 5.5, effort high); sibling outputs were not supplied in task prompts.'}
m['media_adaptations']=['Frame fallback: timestamped JPEG contact sheets viewed with the Read tool rather than native-video input.','Thirteen short clips sampled at 4 fps; clip-01 sampled at 1 fps plus detected shot-boundary frames. Identical sampling to the 261027 GPT-6 Astra blind run.','Audio unassessed; spoken_dialogue=true triggers the audio role on every clip.','Shared contact sheets have at most 640x360 pixels per frame; native-resolution JPEGs and the MP4 were available for optional denser inspection. Individual tool reads were not audited.','Input container metadata stripped (decoded streams identical).']
m['limitations'] += ['Sparse visual sampling may miss events between sampled frames, especially the long clip at 1 fps.','Fresh delegated prompts restricted source access, but the filesystem was not sandboxed per task and tool reads were not independently audited.']
write(O/'manifest.json',m)
predictions=[entry(x) for x in raws]
(O/'SHA256SUMS').write_text(''.join(x['sha256']+'  '+x['path']+'\n' for x in predictions))
receipt={'status':'frozen','frozen_at':frozen,'scope':'All original evaluator payloads and metadata-wrapped predictions; no scoring or semantic review.','model':m['model'],'providerInstanceId':m['providerInstanceId'],'options':m['options'],'concurrency_limit':m['concurrency_limit'],'counts':m['summary'],'input_hashes':{'protocol.json':sha(B/'protocol.json'),'route.mjs':sha(B/'route.mjs'),**{str(pathlib.Path(e['video_path']).relative_to(B)):sha(e['video_path']) for e in media}},'predictions':predictions,'original_responses':[entry(j['response_path']) for j in sorted(jobs,key=lambda j:j['key'])],'invocation_prompts':[entry(j['prompt_path']) for j in sorted(jobs,key=lambda j:j['key'])],'delegation_receipts':[entry(O/'source/delegations'/f"{j['key']}.json") for j in sorted(jobs,key=lambda j:j['key'])],'frozen_routing':[entry(x) for x in sorted((O/'source').glob('clip-*__routing.json'))],'incidents':m.get('incidents',[]),'limitations':m['limitations'],'media_adaptations':m['media_adaptations'],'protocol_deviations':m['protocol_deviations']}
write(O/'freeze-receipt.json',receipt)
print(json.dumps({'status':'frozen','prediction_files':len(predictions),'freeze_receipt_sha256':sha(O/'freeze-receipt.json')},indent=2))
