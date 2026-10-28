"""Freeze completed run metadata and hash unchanged predictions."""
import pathlib,json,hashlib,datetime,collections
B=pathlib.Path('/tmp/video-qc-astra-blind-261027');O=B/'output'
def read(p):return json.loads(pathlib.Path(p).read_text())
def write(p,x):pathlib.Path(p).write_text(json.dumps(x,indent=2)+'\n')
def sha(p):return hashlib.sha256(pathlib.Path(p).read_bytes()).hexdigest()
def entry(p):return {'path':str(pathlib.Path(p).relative_to(O)),'sha256':sha(p),'bytes':pathlib.Path(p).stat().st_size}
assert not (O/'freeze-receipt.json').exists(),'Already frozen; do not overwrite'
m=read(O/'manifest.json');v=read(O/'source/validation.json'); media=read(O/'source/extraction.json');jobs=m['tasks']
assert v['passed'] and len(jobs)==311 and all(j['status']=='completed' and j['provider_status']=='completed' for j in jobs)
raws=sorted(pathlib.Path(j['raw_path']) for j in jobs)
actual=sorted(list((O/'core/raw').glob('*.json'))+list((O/'pass1').glob('*.json'))+list((O/'router-s1/raw').glob('*.json'))+list((O/'router-s2/raw').glob('*.json'))+list((O/'router-s3/raw').glob('*.json')))
assert raws==actual,'Unexpected or missing prediction files'
for j in jobs:assert sha(j['raw_path'])==j['prediction_sha256']
# Record extracted assets without asserting that every available frame was opened.
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
m['summary']={'completed':311,'failed':0,'parse_errors':0,'core':84,'inventories':14,'triggered_clip_role_checks':71,'routed_samples':3,'routed_calls':213,'routed_calls_per_sample':71,'unique_task_ids':311,'audio_role_calls_unassessed':42}
m['evaluation_policy']={'scored':False,'deduplicated':False,'adjudicated':False,'prediction_payloads_amended':False,'additional_evaluation_passes':False,'original_role_prompts_unchanged':True,'routing_function_unchanged':True,'fresh_context_delegation':'App-owned independent delegated task per invocation; sibling outputs were not supplied in task prompts.'}
m['media_adaptations']=['Allowed frame fallback used: timestamped JPEG contact sheets via view_image rather than native-video input.','Thirteen short clips sampled at 4 fps; clip-01 sampled at 1 fps plus detected shot-boundary frames. These samples cannot guarantee coverage of every between-frame event.','All clips contain audio streams, but no honest audio-perception/transcription capability was available. Audio remained unassessed; spoken_dialogue=true triggered all 42 audio-role calls.','Shared contact sheets have at most 640x360 pixels per frame; native-resolution extracted JPEGs and the assigned MP4 were available for optional denser inspection. Individual tool reads were not independently audited.','Timestamp labels are nominal ffmpeg sampling times; exact source-frame selection is quantized.']
m['limitations'] += ['Sparse visual sampling may miss events between sampled frames, especially the long clip at 1 fps; contact-sheet input is not equivalent to native-video perception.','Fresh delegated prompts restricted source access, but the shared filesystem was not sandboxed per task and tool-read access was not independently audited.']
m['processing_incidents_path']=str(O/'source/processing-incidents.json')
# Historical parser incident remains documented; do not leave stale current-error metadata.
for j in jobs:
 if j.get('error') and j['status']=='completed':
  j.setdefault('resolved_processing_error',j['error']);j.pop('error',None)
write(O/'manifest.json',m)
predictions=[entry(x) for x in raws]
(O/'SHA256SUMS').write_text(''.join(x['sha256']+'  '+x['path']+'\n' for x in predictions))
receipt={'status':'frozen','frozen_at':frozen,'scope':'All original evaluator payloads and required metadata-wrapped predictions; no scoring or semantic review.','model':m['model'],'providerInstanceId':m['providerInstanceId'],'options':m['options'],'concurrency_limit':m['concurrency_limit'],'counts':m['summary'],'input_hashes':{'protocol.json':sha(B/'protocol.json'),'route.mjs':sha(B/'route.mjs'),**{str(pathlib.Path(e['video_path']).relative_to(B)):sha(e['video_path']) for e in media}},'predictions':predictions,'original_responses':[entry(j['response_path']) for j in sorted(jobs,key=lambda j:j['key'])],'invocation_prompts':[entry(j['prompt_path']) for j in sorted(jobs,key=lambda j:j['key'])],'delegation_receipts':[entry(O/'source/delegations'/f"{j['key']}.json") for j in sorted(jobs,key=lambda j:j['key'])],'frozen_routing':[entry(x) for x in sorted((O/'source').glob('clip-*__routing.json'))],'run_metadata':[entry(O/'manifest.json'),entry(O/'SHA256SUMS'),entry(O/'source/validation.json'),entry(O/'source/extraction.json'),entry(O/'source/media-assets-index.json'),entry(O/'source/processing-incidents.json')],'limitations':m['limitations'],'media_adaptations':m['media_adaptations'],'protocol_deviations':m['protocol_deviations']}
write(O/'freeze-receipt.json',receipt)
print(json.dumps({'status':'frozen','prediction_files':len(predictions),'shared_frames':sum(x['shared_frames'] for x in media_index),'shared_contact_sheets':sum(x['shared_contact_sheets'] for x in media_index),'manifest':str(O/'manifest.json'),'freeze_receipt':str(O/'freeze-receipt.json'),'freeze_receipt_sha256':sha(O/'freeze-receipt.json')},indent=2))
