// Public andrew.beer page: the OpenExec clock on a table, path traced live, with the
// visionOS app's settings (24-hour, timezone, colon blink, digit emission, tube LEDs,
// glass enclosure). The review page (index.html / openexec-app.js) is unchanged.
import {createNixieRenderer} from './generated/pathtracer.js';
const $=id=>document.getElementById(id),canvas=$('clock'),query=new URLSearchParams(location.search);
// CSS-pixel scale capped at maxPixels keeps the tracer near 10 fps; ?scale=2 for Retina.
// ?keep= is how many accumulated frames survive a digit change (0 = full reset).
const scale=Math.max(.25,Math.min(2,Number(query.get('scale'))||1)),keep=Math.max(0,Math.min(64,Math.round(Number(query.get('keep')??1)))),samples=Math.max(1,Math.min(8,Math.round(Number(query.get('spp'))||1))),freeze=!!query.get('freeze'),maxPixels=1_200_000,maxFrames=freeze?2048:256,filter=3;
const worker=new Worker('./generated/openexec.worker.js',{type:'module'}),pending=new Map();let seq=0,renderer,disposed=false;
function call(message){return new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});worker.postMessage({id,...message});});}
worker.onmessage=({data})=>{const p=pending.get(data.id);if(!p)return;pending.delete(data.id);data.error?p.reject(Error(data.error)):p.resolve(data);};
worker.onerror=e=>{for(const p of pending.values())p.reject(Error(e.message));pending.clear();};

// Settings mirror AppModel defaults in the visionOS app.
const defaults={use24:false,timezone:'system',colonBlink:true,emission:1,leds:false,ledHue:.105,enclosure:true};
const settings={...defaults};
try{Object.assign(settings,JSON.parse(localStorage.getItem('nixie.settings')??'{}'));}catch{}
const save=()=>{try{localStorage.setItem('nixie.settings',JSON.stringify(settings));}catch{}};
// Same choices as SettingsView.TimezoneOption.
const zones=[['UTC −12:00 (Baker Island)','Etc/GMT+12'],['UTC −11:00 (Pago Pago)','Pacific/Pago_Pago'],['UTC −10:00 (Honolulu)','Pacific/Honolulu'],['UTC −09:00 (Anchorage)','America/Anchorage'],['UTC −08:00 (Los Angeles)','America/Los_Angeles'],['UTC −07:00 (Denver)','America/Denver'],['UTC −06:00 (Chicago)','America/Chicago'],['UTC −05:00 (New York)','America/New_York'],['UTC −04:00 (Halifax)','America/Halifax'],['UTC −03:00 (São Paulo)','America/Sao_Paulo'],['UTC −02:00 (South Georgia)','Atlantic/South_Georgia'],['UTC −01:00 (Azores)','Atlantic/Azores'],['UTC +00:00 (London)','Europe/London'],['UTC +01:00 (Paris)','Europe/Paris'],['UTC +02:00 (Cairo)','Africa/Cairo'],['UTC +03:00 (Moscow)','Europe/Moscow'],['UTC +04:00 (Dubai)','Asia/Dubai'],['UTC +05:00 (Karachi)','Asia/Karachi'],['UTC +05:30 (Kolkata)','Asia/Kolkata'],['UTC +06:00 (Dhaka)','Asia/Dhaka'],['UTC +07:00 (Bangkok)','Asia/Bangkok'],['UTC +08:00 (Shanghai)','Asia/Shanghai'],['UTC +09:00 (Tokyo)','Asia/Tokyo'],['UTC +09:30 (Adelaide)','Australia/Adelaide'],['UTC +10:00 (Sydney)','Australia/Sydney'],['UTC +11:00 (Noumea)','Pacific/Noumea'],['UTC +12:00 (Auckland)','Pacific/Auckland']];

// The authored input is UTC seconds; passing the zone's wall-clock seconds displays that zone.
function wallSeconds(){
 const now=new Date();
 if(settings.timezone==='system')return now.getHours()*3600+now.getMinutes()*60+now.getSeconds();
 try{const parts=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:settings.timezone,hourCycle:'h23',hour:'2-digit',minute:'2-digit',second:'2-digit'}).formatToParts(now).map(p=>[p.type,+p.value]));return parts.hour*3600+parts.minute*60+parts.second;}
 catch{return now.getUTCHours()*3600+now.getUTCMinutes()*60+now.getUTCSeconds();}
}
let graph,needsReset=true,seconds=wallSeconds(),yaw=0,pitch=.08,distance=1.5,target=[0,.016,0],revision=0,applied=-1,rendering=false,raf=0,frames=0,timer;
const camera=()=>({position:[target[0]+Math.sin(yaw)*Math.cos(pitch)*distance,target[1]+Math.sin(pitch)*distance,target[2]+Math.cos(yaw)*Math.cos(pitch)*distance],target,fov:Math.atan(.16)*360/Math.PI,near:.005,far:10});
// View, settings and size changes restart accumulation; ticking digits only soft-reset in the tracer.
function invalidate(full=true){revision++;frames=0;if(full)needsReset=true;schedule();}
function schedule(){if(!disposed&&!document.hidden&&!raf&&!rendering)raf=requestAnimationFrame(()=>{raf=0;void draw();});}

// Native-only presentation the OpenExec behavior does not author: colon blink, LEDs, enclosure.
function hsv(h,s,v){const f=n=>{const k=(n+h*6)%6;return v-v*s*Math.max(0,Math.min(k,4-k,1));};return [f(5),f(3),f(1)];}
function decorate(sample){
 const byPath=new Map(sample.meshes.map(m=>[m.path,m]));
 const set=(mesh,fields)=>{const entry=byPath.get(mesh.path);if(entry)Object.assign(entry,fields);else{const added={path:mesh.path,...fields};sample.meshes.push(added);byPath.set(mesh.path,added);}};
 const colonLit=!settings.colonBlink||seconds%2===0;
 const led=hsv(settings.ledHue,.9,.9).map(c=>c*4);
 for(const mesh of graph.meshes){
  if(/Colon_Lit\//.test(mesh.path))set(mesh,{visible:colonLit});
  else if(/\/EnclosureHolder\/EnclosureHolder\/Enclosure/.test(mesh.path))set(mesh,{visible:settings.enclosure});
  // The tracer ignores doubleSided, so hide the floor whenever the camera is below it.
  else if(/\/NixieClock\/Floor$/.test(mesh.path))set(mesh,{visible:camera().position[1]>-.11});
  else if(/\/TubeLEDs\//.test(mesh.path))set(mesh,{visible:settings.leds,material:{...mesh.material,emissiveColor:led}});
 }
 return sample;
}
async function draw(){if(disposed||rendering||!renderer)return;rendering=true;try{
 const r=revision;
 if(applied!==r){const result=await call({type:'evaluate',seconds,setting:!settings.use24,intensity:settings.emission});if(disposed)return;await renderer.applySample(decorate(result.sample));applied=r;}
 // The tracer's per-pixel buffers cap a frame near 2.8M pixels; stay well under it.
 const fit=Math.min(scale,Math.sqrt(maxPixels/Math.max(1,canvas.clientWidth*canvas.clientHeight)));
 const width=Math.max(64,Math.round(canvas.clientWidth*fit)),height=Math.max(64,Math.round(canvas.clientHeight*fit));
 await renderer.draw(camera(),{width,height,samples,bounces:6,filter,denoiseMode:'robust',exposure:1,halo:.22,haloRadius:4,haloThreshold:1,reset:needsReset});
 needsReset=false;frames++;$('loading').hidden=true;
}catch(e){$('loading').hidden=false;$('loading').textContent=e.message;frames=maxFrames;applied=revision;console.error(e);}finally{rendering=false;if(!disposed&&(applied!==revision||frames<maxFrames))schedule();}}
function dispose(){disposed=true;clearInterval(timer);cancelAnimationFrame(raf);worker.terminate();renderer?.dispose();for(const p of pending.values())p.reject(Error('Disposed'));pending.clear();}
window.nixieSite={inspect(){return {seconds,settings:{...settings},frames,scale,renderer:renderer?.inspect()};},dispose};

function bindSettings(){
 const tz=$('timezone');tz.append(new Option('System Default','system'),...zones.map(([label,id])=>new Option(label,id)));
 const sync=()=>{$('use24').checked=settings.use24;tz.value=settings.timezone;$('colonBlink').checked=settings.colonBlink;$('emission').value=settings.emission;$('emissionValue').textContent=settings.emission.toFixed(2);$('leds').checked=settings.leds;$('ledHue').value=settings.ledHue;$('ledHueRow').hidden=!settings.leds;$('enclosure').checked=settings.enclosure;};
 const change=(key,value,full=true)=>{settings[key]=value;save();sync();if(key==='timezone')seconds=wallSeconds();invalidate(full);};
 $('use24').onchange=e=>change('use24',e.target.checked);
 tz.onchange=e=>change('timezone',e.target.value);
 $('colonBlink').onchange=e=>change('colonBlink',e.target.checked,false);
 $('emission').oninput=e=>change('emission',+e.target.value);
 $('leds').onchange=e=>change('leds',e.target.checked);
 $('ledHue').oninput=e=>change('ledHue',+e.target.value);
 $('enclosure').onchange=e=>change('enclosure',e.target.checked);
 const toggle=$('settings-toggle'),panel=$('settings');
 toggle.onclick=()=>{panel.hidden=!panel.hidden;toggle.setAttribute('aria-expanded',String(!panel.hidden));};
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden){panel.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.focus();}});
 sync();
}
try{
 bindSettings();
 if(!navigator.gpu)throw Error('This clock is path traced with WebGPU. Open it in a recent Safari or Chrome.');
 const open=await call({type:'open',url:new URL(query.get('room')?'./public/site-room.usda':'./public/site-scene.usda',location.href).href});graph=open.graph;
 const initial=await call({type:'evaluate',seconds,setting:!settings.use24,intensity:settings.emission});
 // MIS samples the glowing digits as lights as well as by bounce, which removes most grain.
 renderer=await createNixieRenderer(canvas,graph,decorate(initial.sample),{lightSampling:'mis',visibilityHistory:keep});
 $('reset').onclick=()=>{yaw=0;pitch=.08;distance=1.5;target=[0,.016,0];invalidate();};
 const hideHint=()=>$('hint').classList.add('gone');setTimeout(hideHint,6000);
 let drag;canvas.onpointerdown=e=>{drag=[e.clientX,e.clientY];canvas.setPointerCapture(e.pointerId);hideHint();};canvas.onpointermove=e=>{if(!drag)return;yaw-=(e.clientX-drag[0])*.006;pitch=Math.max(-.65,Math.min(1,(pitch+(e.clientY-drag[1])*.006)));drag=[e.clientX,e.clientY];invalidate();};canvas.onpointerup=()=>drag=null;canvas.onpointercancel=()=>drag=null;
 canvas.addEventListener('wheel',e=>{e.preventDefault();hideHint();distance=Math.max(.16,Math.min(2.5,distance*Math.exp(e.deltaY*.002)));invalidate();},{passive:false});
 // ?freeze=1 holds the current time so the image can converge fully (for comparison).
 timer=setInterval(()=>{if(!freeze&&!document.hidden){const t=wallSeconds();if(t!==seconds){seconds=t;invalidate(false);}}},200);
 new ResizeObserver(()=>invalidate()).observe(canvas);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden){if(!freeze)seconds=wallSeconds();invalidate();}});window.addEventListener('pagehide',dispose,{once:true});invalidate();
}catch(e){$('loading').textContent=e.message;dispose();console.error(e);}
