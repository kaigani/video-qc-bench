import pathlib,json,subprocess,hashlib,datetime,math,re
from PIL import Image,ImageDraw
B=pathlib.Path('/tmp/video-qc-astra-blind-261027'); O=B/'output'
def run(args):return subprocess.run(args,capture_output=True,text=True,check=True)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
metadata=[]
for v in sorted((B/'inputs').glob('*.mp4')):
 d=O/'source/media'/v.stem; d.mkdir(exist_ok=True)
 probe=json.loads(run(['ffprobe','-v','quiet','-show_format','-show_streams','-of','json',str(v)]).stdout)
 (d/'probe.json').write_text(json.dumps(probe,indent=2))
 dur=float(probe['format']['duration']); fps=4 if dur<=30 else 1
 run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(v),'-vf',f'fps={fps}','-q:v','2',str(d/'frame-%05d.jpg')])
 frames=[{'file':str(p),'timestamp_seconds':i/fps,'kind':'uniform'} for i,p in enumerate(sorted(d.glob('frame-*.jpg')))]
 if dur>30:
  cut=run(['ffmpeg','-hide_banner','-i',str(v),'-vf',"select='gt(scene,0.25)',showinfo",'-an','-f','null','-'])
  (d/'shot_detection.log').write_text(cut.stderr)
  times=[float(x) for x in re.findall(r'pts_time:([0-9.]+)',cut.stderr)]
  for i,t in enumerate(times):
   for side,offset in [('before',-1/24),('after',0)]:
    ts=max(0,t+offset); p=d/f'cut-{i:03d}-{side}.jpg'
    run(['ffmpeg','-hide_banner','-loglevel','error','-y','-ss',str(ts),'-i',str(v),'-frames:v','1','-q:v','2',str(p)])
    frames.append({'file':str(p),'timestamp_seconds':ts,'kind':'shot_boundary_'+side})
 frames.sort(key=lambda x:x['timestamp_seconds'])
 sheets=[]
 for idx in range(0,len(frames),6):
  group=frames[idx:idx+6]; canvas=Image.new('RGB',(1280,3*390),(24,24,24)); draw=ImageDraw.Draw(canvas)
  for k,f in enumerate(group):
   im=Image.open(f['file']); im.thumbnail((640,360)); x=(k%2)*640; y=(k//2)*390
   canvas.paste(im,(x,y+25)); t=f['timestamp_seconds']; draw.text((x+8,y+5),f'{int(t//60):02}:{t%60:06.3f} | {pathlib.Path(f["file"]).name}',fill='white')
  p=d/f'sheet-{idx//6+1:03d}.jpg'; canvas.save(p,quality=93); sheets.append(str(p))
 m={'video':v.name,'video_path':str(v),'sha256':sha(v),'duration_seconds':dur,'uniform_fps':fps,'frames':frames,'sheets':sheets,'actual_input_modality':'timestamped JPEG frames via view_image, grouped six per contact sheet; original video available for denser extraction','audio_stream_present':any(s['codec_type']=='audio' for s in probe['streams']),'audio_assessed':False,'shot_boundary_sampling':dur>30,'sheet_thumbnail_max_pixels':[640,360],'full_resolution_frames_available':True}
 (d/'extraction.json').write_text(json.dumps(m,indent=2)); metadata.append(m)
 print(v.name,len(frames),'frames',len(sheets),'sheets',flush=True)
(O/'source/extraction.json').write_text(json.dumps(metadata,indent=2))
manifest={'status':'prepared','created_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'protocol_sha256':sha(B/'protocol.json'),'route_sha256':sha(B/'route.mjs'),'model':'gpt-6-astra','providerInstanceId':'codex','options':{'reasoningEffort':'high','serviceTier':'default'},'concurrency_limit':4,'core_expected':84,'feature_expected':14,'router_samples':3,'tasks':[],'limitations':['No native video input: timestamped extracted frames are the actual perceptual input, unlike native-video API benchmarking.','No available audio perception/transcription tool; audio unassessed for all clips; spoken_dialogue is fail-open true.','Contact sheets use 640x360 maximum thumbnails, with original-resolution individual frames and original video available for denser inspection.'],'protocol_deviations':[]}
(O/'manifest.json').write_text(json.dumps(manifest,indent=2))
