(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();function Ts(i){return i.startsWith("/")?"/s/merge/"+i.slice(1):i}const Yo="/s/merge/assets/app-store-badge-CVyK0T4N.svg",$o="merge.musicVolume",Ko="merge.effectsVolume",Zh="/Sounds/synthMergeMusic2019052307_1.m4a",Jh=25.6017,Qh=["synthMergeMusic1effect","synthMergeMusic2effect","synthMergeMusic3effect","synthMergeMusic4effect","synthMergeMusic5effect","synthMergeMusic6effect","synthMergeMusic7effect","synthMergeMusic8effect","papercrumble","NotAllowed"];function jo(i,e){const t=localStorage.getItem(i);if(t===null)return e;const n=Number(t);return Number.isFinite(n)?Math.min(1,Math.max(0,n)):e}function Zo(i,e){return i==="menu"?.75:i==="utility"?.5:e?1.2:1}class eu{musicVolume=jo($o,.2);effectsVolume=jo(Ko,.25);context;musicGain;effectsGain;musicSource;urgent=!1;musicContext="menu";buffers=new Map;unlock(){const e=this.ensureGraph();if(e){e.resume(),this.loadBuffer(Zh).then(t=>{if(this.musicSource||this.context!==e)return;const n=e.createBufferSource();n.buffer=t,n.loop=!0,n.loopStart=0,n.loopEnd=Math.min(t.duration,Jh),n.playbackRate.value=Zo(this.musicContext,this.urgent),n.connect(this.musicGain),n.start(),this.musicSource=n}).catch(()=>{});for(const t of Qh)this.loadBuffer(this.effectPath(t)).catch(()=>{})}}setMusicVolume(e){this.musicVolume=Math.min(1,Math.max(0,e)),localStorage.setItem($o,String(this.musicVolume)),this.applyMusicSettings()}setEffectsVolume(e){this.effectsVolume=Math.min(1,Math.max(0,e)),localStorage.setItem(Ko,String(this.effectsVolume)),this.context&&this.effectsGain&&this.effectsGain.gain.setValueAtTime(this.effectsVolume,this.context.currentTime)}reset(){this.setMusicVolume(.2),this.setEffectsVolume(.25)}setUrgent(e){e!==this.urgent&&(this.urgent=e,this.changeMusicRate())}setMusicContext(e){e!==this.musicContext&&(this.musicContext=e,this.changeMusicRate())}changeMusicRate(){const e=this.context,t=this.musicSource,n=this.musicGain;if(!e||!t||!n)return;const s=e.currentTime,r=Zo(this.musicContext,this.urgent);t.playbackRate.value!==r&&(n.gain.cancelScheduledValues(s),n.gain.setValueAtTime(n.gain.value,s),n.gain.linearRampToValueAtTime(0,s+.08),t.playbackRate.setValueAtTime(r,s+.08),n.gain.linearRampToValueAtTime(this.musicVolume,s+.26))}playMerge(e,t=!1){this.playEffect(`synthMergeMusic${Math.min(e+1,8)}effect`,t?.3:1)}playTrash(){this.playEffect("papercrumble")}playNotAllowed(){this.playEffect("NotAllowed")}ensureGraph(){if(this.context)return this.context;if(typeof AudioContext>"u")return;const e=new AudioContext({latencyHint:"interactive"});return this.context=e,this.musicGain=e.createGain(),this.effectsGain=e.createGain(),this.musicGain.gain.value=this.musicVolume,this.effectsGain.gain.value=this.effectsVolume,this.musicGain.connect(e.destination),this.effectsGain.connect(e.destination),e}applyMusicSettings(){this.context&&(this.musicGain?.gain.cancelScheduledValues(this.context.currentTime),this.musicGain?.gain.setValueAtTime(this.musicVolume,this.context.currentTime))}effectPath(e){return`/Sounds/${e}.m4a`}loadBuffer(e){const t=this.buffers.get(e);if(t)return t;const n=this.ensureGraph();if(!n)return Promise.reject(new Error("Web Audio is unavailable"));const s=fetch(Ts(e)).then(r=>{if(!r.ok)throw new Error(`Unable to load audio: ${e}`);return r.arrayBuffer()}).then(r=>n.decodeAudioData(r));return this.buffers.set(e,s),s}playEffect(e,t=1){if(this.effectsVolume===0)return;const n=this.ensureGraph();n&&(n.resume(),this.loadBuffer(this.effectPath(e)).then(s=>{const r=n.createBufferSource();r.buffer=s,r.playbackRate.value=t,r.connect(this.effectsGain),r.start()}).catch(()=>{}))}}class nn{static big=2147483647;static seed=161803398;seedArray=Array(56).fill(0);inext=0;inextp=21;constructor(e){const t=Math.trunc(e),n=t===-2147483648?nn.big:Math.abs(t);let s=nn.seed-n;s<0&&(s+=nn.big),this.seedArray[55]=s;let r=1;for(let a=1;a<55;a++){const o=21*a%55;this.seedArray[o]=r,r=s-r,r<0&&(r+=nn.big),s=this.seedArray[o]}for(let a=0;a<4;a++)for(let o=1;o<56;o++)this.seedArray[o]-=this.seedArray[1+(o+30)%55],this.seedArray[o]<0&&(this.seedArray[o]+=nn.big)}sample(){this.inext++,this.inext>=56&&(this.inext=1),this.inextp++,this.inextp>=56&&(this.inextp=1);let e=this.seedArray[this.inext]-this.seedArray[this.inextp];return e===nn.big&&e--,e<0&&(e+=nn.big),this.seedArray[this.inext]=e,e/nn.big}next(e,t){if(e>t)throw new Error("minimum must be less than or equal to maximum");return Math.trunc(this.sample()*(t-e))+e}}function tu(i,e){return i.x===e.x&&i.y===e.y}function Ds(i){return`${i.x},${i.y}`}class Oe{static width=7;static height=9;static maximumColor=9;board=[];active;nextColors=[0,0];currentLevel=2;score=0;comboCount=0;state="ready";trashAmount=1;shotClockDuration=24;shotClockDropCount=0;shotClockDeadline=new Date;timerDeadline=new Date;mode;random;arrangement=1;shotClockLevel=0;shouldCreatePowerUp=!1;pendingNextTurnDate;shotClockDurations=[24,15,10,5,3,2];nextBallID=1;constructor(e="classic",t=new Date){this.mode=e,this.restart(t)}restart(e=new Date){this.board=Array.from({length:Oe.width},()=>Array(Oe.height).fill(void 0)),this.currentLevel=2,this.score=0,this.comboCount=0,this.trashAmount=1,this.arrangement=1,this.shouldCreatePowerUp=!1,this.pendingNextTurnDate=void 0,this.state="ready",this.nextBallID=1,this.random=new nn(Oe.seed(this.mode,e)),this.mode!=="classic"&&this.generateRandomBoard(),this.nextColors=[this.nextColor(),this.nextColor()],this.createPair(),this.mode==="powerUp"?this.createPowerUp():this.mode==="shotClock"?(this.shotClockLevel=0,this.shotClockDuration=this.shotClockDurations[0],this.shotClockDropCount=0,this.shotClockDeadline=new Date(e.getTime()+this.shotClockDuration*1e3)):this.mode==="timer"&&(this.timerDeadline=new Date(e.getTime()+12e4))}static seed(e,t){const n=t.getUTCFullYear(),s=t.getUTCMonth()+1,r=t.getUTCDate();return+(e==="daily"?`${n}${s}${r}`:`${r}${s}${n}`)}startDrop(){this.state==="ready"&&(this.state="dropping")}hardDrop(){if(this.state!=="ready")return{type:"idle"};for(this.startDrop();;){const e=this.dropStep();if(e.type!=="moved")return e}}moveLeft(){this.move(-1)}moveRight(){this.move(1)}move(e){if(this.state!=="ready"||!this.active)return;const t=this.active.first.position.x+e,n=this.active.second.position.x+e;t<0||t>=Oe.width||n<0||n>=Oe.width||(this.active.first.position.x=t,this.active.second.position.x=n)}rotate(){if(this.state!=="ready"||!this.active)return;const e=this.active;switch(this.arrangement){case 1:e.second.position.y++,e.second.position.x++,this.arrangement=2;break;case 2:e.second.position.y--,e.first.position.x>0?e.first.position.x--:e.second.position.x++,this.arrangement=3;break;case 3:e.first.position.y++,e.first.position.x++,this.arrangement=4;break;default:e.first.position.y--,e.second.position.x>0?e.second.position.x--:e.first.position.x++,this.arrangement=1}}trashCurrent(){return this.mode!=="powerUp"||this.state!=="ready"||this.trashAmount<=0?!1:(this.trashAmount--,this.createPair(),!0)}dropStep(){if(this.state!=="dropping"||!this.active)return{type:"idle"};const e=this.active;let t=!1;return this.canFall(e.first.position,e.second.position)&&(e.first.position.y--,t=!0),this.canFall(e.second.position,e.first.position)&&(e.second.position.y--,t=!0),t?{type:"moved"}:(this.save(e.first),this.save(e.second),this.active=void 0,this.state="resolving",{type:"landed"})}resolveStep(e=new Date){if(this.state!=="resolving")return{type:"idle"};if(this.pendingNextTurnDate){const n=this.pendingNextTurnDate;return this.pendingNextTurnDate=void 0,this.startNextTurn(n)}if(this.settleFully())return{type:"settled"};const t=this.matchGroups();if(t.length>0){const n=this.comboCount;this.comboCount++;const s=[],r=[],a=[];let o=!1,l=!1,h=!1;for(const c of t){const u=c[0];if(!u)continue;const d=this.ballAt(u);if(!d)continue;const f=d.color;h||=f===Oe.maximumColor,r.push({position:{...u},amount:(f+1)*c.length,combo:this.comboCount});const g=f<Oe.maximumColor?f+1:void 0,_=[];for(const p of c){const m=this.ballAt(p);m&&(this.score+=(m.color+1)*this.comboCount,o||=m.hasPowerUp,s.push(m),(m.id!==d.id||g===void 0)&&_.push({id:m.id,position:{...p}}),this.board[p.x][p.y]=void 0)}a.push({sourceID:d.id,sourcePosition:{...u},consumed:_,oldColor:f,...g===void 0?{}:{resultingColor:g}}),f===this.currentLevel&&this.currentLevel<Oe.height&&(l=!0),g!==void 0&&(d.color=g,d.hasPowerUp=!1,this.board[u.x][u.y]=d)}return l&&this.currentLevel++,o&&(this.trashAmount++,this.shouldCreatePowerUp=!0),{type:"merged",resolution:{removed:s,effects:r,visualGroups:a,soundIndex:n,containsWhite:h,gainedPowerUp:o}}}return this.playerHasLost()?(this.state="ended",{type:"gameOver"}):this.comboCount>0?(this.pendingNextTurnDate=e,{type:"resolutionComplete"}):this.startNextTurn(e)}forceGameOver(){this.state="ended"}shotClockRemaining(e=new Date){return Math.round((this.shotClockDeadline.getTime()-e.getTime())/1e3)}timerRemaining(e=new Date){return Math.max(0,(this.timerDeadline.getTime()-e.getTime())/1e3)}get shotClockWillChangeAfterNextDrop(){return this.shotClockDropCount===9&&this.shotClockLevel<this.shotClockDurations.length-1}get musicShouldPitchUp(){let e=0;for(let t=0;t<Oe.height-2;t++)for(let n=0;n<Oe.width;n++)this.board[n][t]||e++;return e<7}snapshot(){const e=[];for(let t=0;t<Oe.height;t++)for(let n=0;n<Oe.width;n++){const s=this.board[n][t];s&&e.push({...s,position:{x:n,y:t},active:!1})}if(this.active)for(const t of[this.active.first,this.active.second])e.push({...t.ball,position:{...t.position},active:!0});return{pieces:e,nextColors:[...this.nextColors],score:this.score,currentLevel:this.currentLevel,comboCount:this.comboCount,state:this.state}}loadTestBoard(e,t=2){if(e.length>Oe.height||e.some(n=>n.length!==Oe.width))throw new Error("invalid board fixture");this.board=Array.from({length:Oe.width},()=>Array(Oe.height).fill(void 0)),e.forEach((n,s)=>n.forEach((r,a)=>{r!==void 0&&(this.board[a][s]=this.makeBall(r))})),this.active=void 0,this.currentLevel=t,this.score=0,this.comboCount=0,this.state="resolving",this.arrangement=1,this.shouldCreatePowerUp=!1,this.pendingNextTurnDate=void 0}startNextTurn(e){return this.createPair(),this.comboCount=0,this.mode==="powerUp"&&this.shouldCreatePowerUp&&(this.createPowerUp(),this.shouldCreatePowerUp=!1),this.mode==="shotClock"&&(this.shotClockDropCount++,this.shotClockDropCount===10&&this.shotClockLevel<this.shotClockDurations.length-1&&(this.shotClockLevel++,this.shotClockDuration=this.shotClockDurations[this.shotClockLevel],this.shotClockDropCount=0),this.shotClockDeadline=new Date(e.getTime()+this.shotClockDuration*1e3)),this.state="ready",{type:"nextTurn"}}nextColor(){return this.random.next(0,this.currentLevel)}makeBall(e,t=!1){return{id:`ball-${this.nextBallID++}`,color:e,hasPowerUp:t}}createPair(){const e=this.nextColors;this.active={first:{ball:this.makeBall(e[0]),position:{x:4,y:7}},second:{ball:this.makeBall(e[1]),position:{x:3,y:7}}},this.nextColors=[this.nextColor(),this.nextColor()],this.arrangement=1}generateRandomBoard(){const e=this.random.next(Oe.height-7,Oe.height-5);this.currentLevel=this.random.next(5,7);for(let t=0;t<=e;t++)for(let n=0;n<Oe.width;n++)for(this.board[n][t]=this.makeBall(this.nextColor());this.matchGroups().length>0;)this.board[n][t].color=this.nextColor()}createPowerUp(){const e=this.board.flat().filter(Boolean).length;if(e===0)return;const t=this.random.next(0,e);let n=0;for(let s=Oe.height-1;s>=0;s--)for(let r=0;r<Oe.width;r++){const a=this.board[r][s];if(a){if(n===t){a.hasPowerUp=!0;return}n++}}}save(e){const{x:t,y:n}=e.position;t>=0&&t<Oe.width&&n>=0&&n<Oe.height&&(this.board[t][n]=e.ball)}canFall(e,t){if(e.y<=0)return!1;for(let n=e.y;n>=1;n--){const s={x:e.x,y:n-1};if(!this.ballAt(s)&&(!t||!tu(s,t)))return!0}return!1}settleOneRow(){let e=!1;for(let t=1;t<Oe.height;t++)for(let n=0;n<Oe.width;n++){const s=this.board[n][t];!s||!this.canFall({x:n,y:t})||(this.board[n][t-1]=s,this.board[n][t]=void 0,e=!0)}return e}settleFully(){let e=!1;for(;this.settleOneRow();)e=!0;return e}playerHasLost(){for(let e=0;e<Oe.width;e++)if(this.board[e][Oe.width])return!0;return!1}ballAt(e){if(!(e.x<0||e.x>=Oe.width||e.y<0||e.y>=Oe.height))return this.board[e.x][e.y]}matchGroups(){const e=[],t=new Set,n=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1}];for(let s=0;s<Oe.height;s++)for(let r=0;r<Oe.width;r++){const a={x:r,y:s};if(t.has(Ds(a)))continue;const o=this.ballAt(a);if(!o)continue;const l=[a],h=[];t.add(Ds(a));for(let c=0;c<l.length;c++){const u=l[c];h.push(u);for(const d of n){const f={x:u.x+d.x,y:u.y+d.y},g=this.ballAt(f);t.has(Ds(f))||!g||g.color!==o.color||(t.add(Ds(f)),l.push(f))}}h.length>=3&&e.push(h)}return e}}const vo="merge.dropSpeed",nu={Slow:2,Normal:1,Fast:.5},ur=["Slow","Normal","Fast"];function iu(i){return nu[i]}function su(i){return ur[(ur.indexOf(i)+1)%ur.length]}function ru(i){return ur.includes(i)?i:"Normal"}const Ut={placementSeconds:.24,gravitySeconds:.2,mergeSeconds:.36,timeCodesPerSecond:24};function au(i,e){const t=new Map(e.pieces.map(n=>[n.id,n]));return i.pieces.reduce((n,s)=>{const r=t.get(s.id);return r?Math.max(n,Math.abs(r.position.y-s.position.y)):n},0)}function Xl(i,e,t){const n=Ut.gravitySeconds/(Oe.width-1);return Math.min(Ut.placementSeconds,n*au(i,e))*iu(t)*Ut.timeCodesPerSecond}function ou(i){const e=Ut.mergeSeconds*.08*Math.min(Math.max(i.soundIndex,0),5);return(Ut.mergeSeconds+e)*Ut.timeCodesPerSecond}function ql(i,e,t,n){let s,r;for(let a=0;a<50;a++){s=i.snapshot();const o=i.resolveStep(t);switch(r=i.snapshot(),o.type){case"settled":e.push({kind:"gravity",from:s,to:r,duration:Xl(s,r,n)});break;case"merged":e.push({kind:"merge",from:s,to:r,duration:ou(o.resolution),resolution:o.resolution});break;case"resolutionComplete":break;case"nextTurn":return e.push({kind:"next-pair",from:s,to:r,duration:.01}),{transitions:e,final:r,gameOver:!1};case"gameOver":return{transitions:e,final:r,gameOver:!0};case"idle":return{transitions:e,final:r,gameOver:i.state==="ended"}}}throw new Error("Merge resolution did not finish within 50 steps")}function cu(i,e=new Date,t="Normal"){if(i.state!=="ready")return{transitions:[],final:i.snapshot(),gameOver:i.state==="ended"};const n=[];let s=i.snapshot();if(i.hardDrop().type!=="landed")return{transitions:n,final:i.snapshot(),gameOver:!1};const a=i.snapshot();return n.push({kind:"drop",from:s,to:a,duration:Xl(s,a,t)}),ql(i,n,e,t)}function lu(i,e=new Date,t="Normal"){return ql(i,[],e,t)}const Ra=96,Jo=[[1,0,.76],[1,0,0],[1,.47,0],[1,1,0],[0,.94,.06],[0,.85,.82],[.02,.24,1],[.62,0,1],[0,0,0],[1,1,1]];function qr(i){return new Map(i.pieces.map(e=>[e.id,e]))}function hu(i,e){for(const t of e){const n=t.pieces.find(s=>s.id===i);if(n)return n}throw new Error(`Missing piece ${i}`)}function Yr(i,e){const t=i??e;return{present:i!==void 0,color:t.color,hasPowerUp:t.hasPowerUp,position:{...t.position},scale:i?1:.04,opacity:i?1:0}}function ds(i,e,t){i.states.set(e,{...t,position:{...t.position}})}function Vi(i,e,t){i.states.set(e,{...t,color:[...t.color],position:{...t.position}})}function Nt(i,e,t){return i+(e-i)*t}function uu(i,e,t){return{present:t<1?i.present:e.present,color:t<1?i.color:e.color,hasPowerUp:t<1?i.hasPowerUp:e.hasPowerUp,position:{x:Nt(i.position.x,e.position.x,t),y:Nt(i.position.y,e.position.y,t)},scale:Nt(i.scale,e.scale,t),opacity:Nt(i.opacity,e.opacity,t)}}function du(i,e,t){return{present:t<1?i.present:e.present,color:[Nt(i.color[0],e.color[0],t),Nt(i.color[1],e.color[1],t),Nt(i.color[2],e.color[2],t)],position:{x:Nt(i.position.x,e.position.x,t),y:Nt(i.position.y,e.position.y,t)},scale:Nt(i.scale,e.scale,t),opacity:Nt(i.opacity,e.opacity,t)}}function Ns(i,e,t,n,s,r=a=>a){for(let a=1;a<=5;a++){const o=a/5;ds(i,Nt(e,t,o),uu(n,s,r(o)))}}function $r(i,e,t,n,s,r){for(let a=1;a<=5;a++){const o=a/5;Vi(i,Nt(e,t,o),du(n,s,r(o)))}}function Qo(i){return[...Jo[Math.min(Math.max(i,0),Jo.length-1)]]}function fu(i,e,t){const n=i.resolution;if(!n)return;const s=Ut.mergeSeconds*Ut.timeCodesPerSecond,r=Math.max(0,i.duration-s),a=s*.25,o=s*.55,l=s*.2,h=e+a,c=h+r,u=c+o,d=u+l,f=Math.max(6,Math.floor(Ra/Math.max(1,n.visualGroups.length)));let g=0;for(const _ of n.visualGroups){const p=[..._.consumed.filter(C=>C.id!==_.sourceID).map(C=>C.position),_.sourcePosition],m=Math.min(56,Math.max(p.length,p.length*5)),M=Math.min(f,m+Math.min(n.soundIndex,5)*18),S=Math.min(5,2**Math.min(Math.max(n.soundIndex,0),5)),T=Qo(_.oldColor),R=Qo(_.resultingColor??_.oldColor);for(let C=0;C<M&&g+C<Ra;C++){const A=t[g+C],b=p[C%p.length],v=.045+C%3*.008,x=C*2.399963+C%p.length*.37,F=(.24+C%4*.055)*S,N={x:b.x+Math.cos(x)*F,y:b.y+Math.sin(x)*F},I={present:!0,color:T,position:{...b},scale:v,opacity:1},G={...I,position:N};if(A.states.size===0&&e>0&&Vi(A,0,{...I,present:!1,opacity:0}),Vi(A,e,I),$r(A,e,h,I,G,W=>1-(1-W)**2),Vi(A,c,G),_.resultingColor!==void 0){const W={present:!0,color:R,position:{..._.sourcePosition},scale:v*.22,opacity:1};$r(A,c,u,G,W,j=>j**2);const B={...W,present:!1,opacity:0};Vi(A,u,B),Vi(A,d,B)}else{const W={present:!1,color:T,position:{x:N.x+Math.cos(x)*F*.65,y:N.y+Math.sin(x)*F*.65},scale:v*.35,opacity:0};$r(A,c,d,G,W,B=>1-(1-B)**2)}}g+=M}}function Hi(i,e=[]){const t=[i,...e.flatMap(c=>[c.from,c.to])],n=[...new Set(t.flatMap(c=>c.pieces.map(u=>u.id)))].sort(),s=new Map(n.map(c=>[c,{id:c,states:new Map}])),r=Array.from({length:Ra},(c,u)=>({slot:u,states:new Map})),a=new Map(n.map(c=>[c,hu(c,t)])),o=[],l=new Map;let h=0;if(e.length===0){const c=qr(i);for(const u of n)ds(s.get(u),0,Yr(c.get(u),a.get(u)));l.set(0,[0,0]),l.set(1,[0,0]),o.push({kind:"ready",start:0,end:1,score:i.score,combo:i.comboCount}),h=1}else for(const c of e){const u=h,d=h+c.duration,f=qr(c.from),g=qr(c.to),_=Ut.mergeSeconds*Ut.timeCodesPerSecond,p=c.kind==="merge"?Math.max(0,c.duration-_):0,m=u+_*.25,M=m+p+_*.55*.65;for(const T of n){const R=s.get(T),C=a.get(T),A=f.get(T),b=g.get(T),v=Yr(A,C),x=Yr(b,C);if(ds(R,u,v),(c.kind==="drop"||c.kind==="gravity")&&A&&b)Ns(R,u,d,v,x,F=>F**2);else if(c.kind==="merge"&&A){const F=c.resolution?.visualGroups.find(I=>I.sourceID===T),N=c.resolution?.visualGroups.some(I=>I.consumed.some(G=>G.id===T));if(F&&F.resultingColor!==void 0&&b){const I={...v,scale:.55,opacity:0};Ns(R,u,m,v,I);const G={...x,scale:.55,opacity:0};ds(R,M,G),Ns(R,M,d,G,x)}else(F||N)&&Ns(R,u,m,v,{...v,present:!1,scale:.55,opacity:0})}ds(R,d,x)}c.kind==="merge"&&fu(c,u,r),l.set(u,[0,0]);const S=c.resolution?.soundIndex??0;if(c.kind==="merge"&&S>=2){const T=Math.min(S,5),C=Ut.mergeSeconds*Ut.timeCodesPerSecond*(.5+(T-2)*.15),A=.145*2**(T-2),b=Math.max(12,Math.ceil(C/Ut.timeCodesPerSecond*60));for(let v=0;v<=b;v++){const x=v/b,F=1-x;l.set(u+C*x,[Math.sin(x*Math.PI*14)*A*F,Math.sin(x*Math.PI*19)*A*.72*F])}}l.set(d,[0,0]),o.push({kind:c.kind,start:u,end:d,score:c.to.score,combo:c.to.comboCount,containsWhite:c.resolution?.containsWhite}),h=d}return{initial:i,final:e.at(-1)?.to??i,startTimeCode:0,endTimeCode:h,segments:o,tracks:[...s.values()].map(c=>({id:c.id,states:[...c.states.entries()].sort(([u],[d])=>u-d).map(([u,d])=>({time:u,state:d}))})),particles:r.filter(c=>c.states.size>0).map(c=>({slot:c.slot,states:[...c.states.entries()].sort(([u],[d])=>u-d).map(([u,d])=>({time:u,state:d}))})),camera:[...l.entries()].sort(([c],[u])=>c-u).map(([c,u])=>({time:c,offset:u}))}}function Yl(i,e){return i.find(t=>e>=t.start&&e<=t.end)??i.at(-1)}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const xo="168",pu=0,ec=1,mu=2,$l=1,gu=2,Sn=3,wn=0,Rt=1,an=2,Hn=0,Ui=1,tc=2,nc=3,ic=4,_u=5,ii=100,vu=101,xu=102,Su=103,Eu=104,Mu=200,yu=201,Tu=202,Cu=203,Pa=204,Ia=205,bu=206,Au=207,wu=208,Fu=209,Ru=210,Pu=211,Iu=212,Lu=213,Vu=214,Du=0,Nu=1,Uu=2,Sr=3,Ou=4,Bu=5,zu=6,Gu=7,Kl=0,Hu=1,ku=2,kn=0,Wu=1,Xu=2,qu=3,jl=4,Yu=5,$u=6,Ku=7,Zl=300,ki=301,Wi=302,La=303,Va=304,Dr=306,Er=1e3,zn=1001,Mr=1002,Ft=1003,ju=1004,Us=1005,Zt=1006,Kr=1007,ri=1008,Fn=1009,Jl=1010,Ql=1011,Ss=1012,So=1013,li=1014,cn=1015,Cs=1016,Eo=1017,Mo=1018,Xi=1020,eh=35902,th=1021,nh=1022,Jt=1023,ih=1024,sh=1025,Oi=1026,qi=1027,yo=1028,To=1029,rh=1030,Co=1031,bo=1033,dr=33776,fr=33777,pr=33778,mr=33779,Da=35840,Na=35841,Ua=35842,Oa=35843,Ba=36196,za=37492,Ga=37496,Ha=37808,ka=37809,Wa=37810,Xa=37811,qa=37812,Ya=37813,$a=37814,Ka=37815,ja=37816,Za=37817,Ja=37818,Qa=37819,eo=37820,to=37821,gr=36492,no=36494,io=36495,ah=36283,so=36284,ro=36285,ao=36286,Zu=3200,Ju=3201,oh=0,Qu=1,Tn="",Gt="srgb",Xn="srgb-linear",Ao="display-p3",Nr="display-p3-linear",yr="linear",et="srgb",Tr="rec709",Cr="p3",mi=7680,sc=519,ed=512,td=513,nd=514,ch=515,id=516,sd=517,rd=518,ad=519,rc=35044,ac="300 es",Cn=2e3,br=2001;class ji{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Et=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],jr=Math.PI/180,oo=180/Math.PI;function bs(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Et[i&255]+Et[i>>8&255]+Et[i>>16&255]+Et[i>>24&255]+"-"+Et[e&255]+Et[e>>8&255]+"-"+Et[e>>16&15|64]+Et[e>>24&255]+"-"+Et[t&63|128]+Et[t>>8&255]+"-"+Et[t>>16&255]+Et[t>>24&255]+Et[n&255]+Et[n>>8&255]+Et[n>>16&255]+Et[n>>24&255]).toLowerCase()}function wt(i,e,t){return Math.max(e,Math.min(t,i))}function od(i,e){return(i%e+e)%e}function Zr(i,e,t){return(1-t)*i+t*e}function ts(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function At(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class We{constructor(e=0,t=0){We.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(wt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Le{constructor(e,t,n,s,r,a,o,l,h){Le.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,h)}set(e,t,n,s,r,a,o,l,h){const c=this.elements;return c[0]=e,c[1]=s,c[2]=o,c[3]=t,c[4]=r,c[5]=l,c[6]=n,c[7]=a,c[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],h=n[1],c=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=s[0],p=s[3],m=s[6],M=s[1],S=s[4],T=s[7],R=s[2],C=s[5],A=s[8];return r[0]=a*_+o*M+l*R,r[3]=a*p+o*S+l*C,r[6]=a*m+o*T+l*A,r[1]=h*_+c*M+u*R,r[4]=h*p+c*S+u*C,r[7]=h*m+c*T+u*A,r[2]=d*_+f*M+g*R,r[5]=d*p+f*S+g*C,r[8]=d*m+f*T+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],h=e[7],c=e[8];return t*a*c-t*o*h-n*r*c+n*o*l+s*r*h-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],h=e[7],c=e[8],u=c*a-o*h,d=o*l-c*r,f=h*r-a*l,g=t*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(s*h-c*n)*_,e[2]=(o*n-s*a)*_,e[3]=d*_,e[4]=(c*t-s*l)*_,e[5]=(s*r-o*t)*_,e[6]=f*_,e[7]=(n*l-h*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),h=Math.sin(r);return this.set(n*l,n*h,-n*(l*a+h*o)+a+e,-s*h,s*l,-s*(-h*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Jr.makeScale(e,t)),this}rotate(e){return this.premultiply(Jr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Jr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Jr=new Le;function lh(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Ar(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function cd(){const i=Ar("canvas");return i.style.display="block",i}const oc={};function ms(i){i in oc||(oc[i]=!0,console.warn(i))}function ld(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const cc=new Le().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),lc=new Le().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ns={[Xn]:{transfer:yr,primaries:Tr,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[Gt]:{transfer:et,primaries:Tr,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Nr]:{transfer:yr,primaries:Cr,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(lc),fromReference:i=>i.applyMatrix3(cc)},[Ao]:{transfer:et,primaries:Cr,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(lc),fromReference:i=>i.applyMatrix3(cc).convertLinearToSRGB()}},hd=new Set([Xn,Nr]),Ke={enabled:!0,_workingColorSpace:Xn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!hd.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=ns[e].toReference,s=ns[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return ns[i].primaries},getTransfer:function(i){return i===Tn?yr:ns[i].transfer},getLuminanceCoefficients:function(i,e=this._workingColorSpace){return i.fromArray(ns[e].luminanceCoefficients)}};function Bi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Qr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let gi;class ud{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{gi===void 0&&(gi=Ar("canvas")),gi.width=e.width,gi.height=e.height;const n=gi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=gi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ar("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Bi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Bi(t[n]/255)*255):t[n]=Bi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let dd=0;class hh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:dd++}),this.uuid=bs(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(ea(s[a].image)):r.push(ea(s[a]))}else r=ea(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function ea(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ud.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let fd=0;class gt extends ji{constructor(e=gt.DEFAULT_IMAGE,t=gt.DEFAULT_MAPPING,n=zn,s=zn,r=Zt,a=ri,o=Jt,l=Fn,h=gt.DEFAULT_ANISOTROPY,c=Tn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:fd++}),this.uuid=bs(),this.name="",this.source=new hh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=h,this.format=o,this.internalFormat=null,this.type=l,this.offset=new We(0,0),this.repeat=new We(1,1),this.center=new We(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Le,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Zl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Er:e.x=e.x-Math.floor(e.x);break;case zn:e.x=e.x<0?0:1;break;case Mr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Er:e.y=e.y-Math.floor(e.y);break;case zn:e.y=e.y<0?0:1;break;case Mr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}gt.DEFAULT_IMAGE=null;gt.DEFAULT_MAPPING=Zl;gt.DEFAULT_ANISOTROPY=1;class dt{constructor(e=0,t=0,n=0,s=1){dt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,h=l[0],c=l[4],u=l[8],d=l[1],f=l[5],g=l[9],_=l[2],p=l[6],m=l[10];if(Math.abs(c-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(c+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+p)<.1&&Math.abs(h+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(h+1)/2,T=(f+1)/2,R=(m+1)/2,C=(c+d)/4,A=(u+_)/4,b=(g+p)/4;return S>T&&S>R?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=C/n,r=A/n):T>R?T<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(T),n=C/s,r=b/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=A/r,s=b/r),this.set(n,s,r,t),this}let M=Math.sqrt((p-g)*(p-g)+(u-_)*(u-_)+(d-c)*(d-c));return Math.abs(M)<.001&&(M=1),this.x=(p-g)/M,this.y=(u-_)/M,this.z=(d-c)/M,this.w=Math.acos((h+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class pd extends ji{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new dt(0,0,e,t),this.scissorTest=!1,this.viewport=new dt(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Zt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new gt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new hh(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class hi extends pd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class uh extends gt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=zn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class md extends gt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=zn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class As{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],h=n[s+1],c=n[s+2],u=n[s+3];const d=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=l,e[t+1]=h,e[t+2]=c,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(u!==_||l!==d||h!==f||c!==g){let p=1-o;const m=l*d+h*f+c*g+u*_,M=m>=0?1:-1,S=1-m*m;if(S>Number.EPSILON){const R=Math.sqrt(S),C=Math.atan2(R,m*M);p=Math.sin(p*C)/R,o=Math.sin(o*C)/R}const T=o*M;if(l=l*p+d*T,h=h*p+f*T,c=c*p+g*T,u=u*p+_*T,p===1-o){const R=1/Math.sqrt(l*l+h*h+c*c+u*u);l*=R,h*=R,c*=R,u*=R}}e[t]=l,e[t+1]=h,e[t+2]=c,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],h=n[s+2],c=n[s+3],u=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+c*u+l*f-h*d,e[t+1]=l*g+c*d+h*u-o*f,e[t+2]=h*g+c*f+o*d-l*u,e[t+3]=c*g-o*u-l*d-h*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,h=o(n/2),c=o(s/2),u=o(r/2),d=l(n/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=d*c*u+h*f*g,this._y=h*f*u-d*c*g,this._z=h*c*g+d*f*u,this._w=h*c*u-d*f*g;break;case"YXZ":this._x=d*c*u+h*f*g,this._y=h*f*u-d*c*g,this._z=h*c*g-d*f*u,this._w=h*c*u+d*f*g;break;case"ZXY":this._x=d*c*u-h*f*g,this._y=h*f*u+d*c*g,this._z=h*c*g+d*f*u,this._w=h*c*u-d*f*g;break;case"ZYX":this._x=d*c*u-h*f*g,this._y=h*f*u+d*c*g,this._z=h*c*g-d*f*u,this._w=h*c*u+d*f*g;break;case"YZX":this._x=d*c*u+h*f*g,this._y=h*f*u+d*c*g,this._z=h*c*g-d*f*u,this._w=h*c*u-d*f*g;break;case"XZY":this._x=d*c*u-h*f*g,this._y=h*f*u-d*c*g,this._z=h*c*g+d*f*u,this._w=h*c*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],h=t[2],c=t[6],u=t[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(c-l)*f,this._y=(r-h)*f,this._z=(a-s)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(c-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+h)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-h)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+c)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-s)/f,this._x=(r+h)/f,this._y=(l+c)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(wt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,h=t._z,c=t._w;return this._x=n*c+a*o+s*h-r*l,this._y=s*c+a*l+r*o-n*h,this._z=r*c+a*h+n*l-s*o,this._w=a*c-n*o-s*l-r*h,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const h=Math.sqrt(l),c=Math.atan2(h,o),u=Math.sin((1-t)*c)/h,d=Math.sin(t*c)/h;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(e=0,t=0,n=0){U.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(hc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(hc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,h=2*(a*s-o*n),c=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+l*h+a*u-o*c,this.y=n+l*c+o*h-r*u,this.z=s+l*u+r*c-a*h,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ta.copy(this).projectOnVector(e),this.sub(ta)}reflect(e){return this.sub(ta.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(wt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ta=new U,hc=new As;class ui{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(qt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(qt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=qt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,qt):qt.fromBufferAttribute(r,a),qt.applyMatrix4(e.matrixWorld),this.expandByPoint(qt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Os.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Os.copy(n.boundingBox)),Os.applyMatrix4(e.matrixWorld),this.union(Os)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,qt),qt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(is),Bs.subVectors(this.max,is),_i.subVectors(e.a,is),vi.subVectors(e.b,is),xi.subVectors(e.c,is),In.subVectors(vi,_i),Ln.subVectors(xi,vi),Yn.subVectors(_i,xi);let t=[0,-In.z,In.y,0,-Ln.z,Ln.y,0,-Yn.z,Yn.y,In.z,0,-In.x,Ln.z,0,-Ln.x,Yn.z,0,-Yn.x,-In.y,In.x,0,-Ln.y,Ln.x,0,-Yn.y,Yn.x,0];return!na(t,_i,vi,xi,Bs)||(t=[1,0,0,0,1,0,0,0,1],!na(t,_i,vi,xi,Bs))?!1:(zs.crossVectors(In,Ln),t=[zs.x,zs.y,zs.z],na(t,_i,vi,xi,Bs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,qt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(qt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(fn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),fn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),fn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),fn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),fn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),fn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),fn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),fn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(fn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const fn=[new U,new U,new U,new U,new U,new U,new U,new U],qt=new U,Os=new ui,_i=new U,vi=new U,xi=new U,In=new U,Ln=new U,Yn=new U,is=new U,Bs=new U,zs=new U,$n=new U;function na(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){$n.fromArray(i,r);const o=s.x*Math.abs($n.x)+s.y*Math.abs($n.y)+s.z*Math.abs($n.z),l=e.dot($n),h=t.dot($n),c=n.dot($n);if(Math.max(-Math.max(l,h,c),Math.min(l,h,c))>o)return!1}return!0}const gd=new ui,ss=new U,ia=new U;class Zi{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):gd.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ss.subVectors(e,this.center);const t=ss.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(ss,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ia.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ss.copy(e.center).add(ia)),this.expandByPoint(ss.copy(e.center).sub(ia))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const pn=new U,sa=new U,Gs=new U,Vn=new U,ra=new U,Hs=new U,aa=new U;class dh{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,pn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=pn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(pn.copy(this.origin).addScaledVector(this.direction,t),pn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){sa.copy(e).add(t).multiplyScalar(.5),Gs.copy(t).sub(e).normalize(),Vn.copy(this.origin).sub(sa);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Gs),o=Vn.dot(this.direction),l=-Vn.dot(Gs),h=Vn.lengthSq(),c=Math.abs(1-a*a);let u,d,f,g;if(c>0)if(u=a*l-o,d=a*o-l,g=r*c,u>=0)if(d>=-g)if(d<=g){const _=1/c;u*=_,d*=_,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+h}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+h;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+h;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+h):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+h):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+h);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+h;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(sa).addScaledVector(Gs,d),f}intersectSphere(e,t){pn.subVectors(e.center,this.origin);const n=pn.dot(this.direction),s=pn.dot(pn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const h=1/this.direction.x,c=1/this.direction.y,u=1/this.direction.z,d=this.origin;return h>=0?(n=(e.min.x-d.x)*h,s=(e.max.x-d.x)*h):(n=(e.max.x-d.x)*h,s=(e.min.x-d.x)*h),c>=0?(r=(e.min.y-d.y)*c,a=(e.max.y-d.y)*c):(r=(e.max.y-d.y)*c,a=(e.min.y-d.y)*c),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,pn)!==null}intersectTriangle(e,t,n,s,r){ra.subVectors(t,e),Hs.subVectors(n,e),aa.crossVectors(ra,Hs);let a=this.direction.dot(aa),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Vn.subVectors(this.origin,e);const l=o*this.direction.dot(Hs.crossVectors(Vn,Hs));if(l<0)return null;const h=o*this.direction.dot(ra.cross(Vn));if(h<0||l+h>a)return null;const c=-o*Vn.dot(aa);return c<0?null:this.at(c/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Qe{constructor(e,t,n,s,r,a,o,l,h,c,u,d,f,g,_,p){Qe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,h,c,u,d,f,g,_,p)}set(e,t,n,s,r,a,o,l,h,c,u,d,f,g,_,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=h,m[6]=c,m[10]=u,m[14]=d,m[3]=f,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Qe().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Si.setFromMatrixColumn(e,0).length(),r=1/Si.setFromMatrixColumn(e,1).length(),a=1/Si.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),h=Math.sin(s),c=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=a*c,f=a*u,g=o*c,_=o*u;t[0]=l*c,t[4]=-l*u,t[8]=h,t[1]=f+g*h,t[5]=d-_*h,t[9]=-o*l,t[2]=_-d*h,t[6]=g+f*h,t[10]=a*l}else if(e.order==="YXZ"){const d=l*c,f=l*u,g=h*c,_=h*u;t[0]=d+_*o,t[4]=g*o-f,t[8]=a*h,t[1]=a*u,t[5]=a*c,t[9]=-o,t[2]=f*o-g,t[6]=_+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*c,f=l*u,g=h*c,_=h*u;t[0]=d-_*o,t[4]=-a*u,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*c,t[9]=_-d*o,t[2]=-a*h,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*c,f=a*u,g=o*c,_=o*u;t[0]=l*c,t[4]=g*h-f,t[8]=d*h+_,t[1]=l*u,t[5]=_*h+d,t[9]=f*h-g,t[2]=-h,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,f=a*h,g=o*l,_=o*h;t[0]=l*c,t[4]=_-d*u,t[8]=g*u+f,t[1]=u,t[5]=a*c,t[9]=-o*c,t[2]=-h*c,t[6]=f*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=a*l,f=a*h,g=o*l,_=o*h;t[0]=l*c,t[4]=-u,t[8]=h*c,t[1]=d*u+_,t[5]=a*c,t[9]=f*u-g,t[2]=g*u-f,t[6]=o*c,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(_d,e,vd)}lookAt(e,t,n){const s=this.elements;return Lt.subVectors(e,t),Lt.lengthSq()===0&&(Lt.z=1),Lt.normalize(),Dn.crossVectors(n,Lt),Dn.lengthSq()===0&&(Math.abs(n.z)===1?Lt.x+=1e-4:Lt.z+=1e-4,Lt.normalize(),Dn.crossVectors(n,Lt)),Dn.normalize(),ks.crossVectors(Lt,Dn),s[0]=Dn.x,s[4]=ks.x,s[8]=Lt.x,s[1]=Dn.y,s[5]=ks.y,s[9]=Lt.y,s[2]=Dn.z,s[6]=ks.z,s[10]=Lt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],h=n[12],c=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],p=n[10],m=n[14],M=n[3],S=n[7],T=n[11],R=n[15],C=s[0],A=s[4],b=s[8],v=s[12],x=s[1],F=s[5],N=s[9],I=s[13],G=s[2],W=s[6],B=s[10],j=s[14],k=s[3],se=s[7],ae=s[11],de=s[15];return r[0]=a*C+o*x+l*G+h*k,r[4]=a*A+o*F+l*W+h*se,r[8]=a*b+o*N+l*B+h*ae,r[12]=a*v+o*I+l*j+h*de,r[1]=c*C+u*x+d*G+f*k,r[5]=c*A+u*F+d*W+f*se,r[9]=c*b+u*N+d*B+f*ae,r[13]=c*v+u*I+d*j+f*de,r[2]=g*C+_*x+p*G+m*k,r[6]=g*A+_*F+p*W+m*se,r[10]=g*b+_*N+p*B+m*ae,r[14]=g*v+_*I+p*j+m*de,r[3]=M*C+S*x+T*G+R*k,r[7]=M*A+S*F+T*W+R*se,r[11]=M*b+S*N+T*B+R*ae,r[15]=M*v+S*I+T*j+R*de,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],h=e[13],c=e[2],u=e[6],d=e[10],f=e[14],g=e[3],_=e[7],p=e[11],m=e[15];return g*(+r*l*u-s*h*u-r*o*d+n*h*d+s*o*f-n*l*f)+_*(+t*l*f-t*h*d+r*a*d-s*a*f+s*h*c-r*l*c)+p*(+t*h*u-t*o*f-r*a*u+n*a*f+r*o*c-n*h*c)+m*(-s*o*c-t*l*u+t*o*d+s*a*u-n*a*d+n*l*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],h=e[7],c=e[8],u=e[9],d=e[10],f=e[11],g=e[12],_=e[13],p=e[14],m=e[15],M=u*p*h-_*d*h+_*l*f-o*p*f-u*l*m+o*d*m,S=g*d*h-c*p*h-g*l*f+a*p*f+c*l*m-a*d*m,T=c*_*h-g*u*h+g*o*f-a*_*f-c*o*m+a*u*m,R=g*u*l-c*_*l-g*o*d+a*_*d+c*o*p-a*u*p,C=t*M+n*S+s*T+r*R;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/C;return e[0]=M*A,e[1]=(_*d*r-u*p*r-_*s*f+n*p*f+u*s*m-n*d*m)*A,e[2]=(o*p*r-_*l*r+_*s*h-n*p*h-o*s*m+n*l*m)*A,e[3]=(u*l*r-o*d*r-u*s*h+n*d*h+o*s*f-n*l*f)*A,e[4]=S*A,e[5]=(c*p*r-g*d*r+g*s*f-t*p*f-c*s*m+t*d*m)*A,e[6]=(g*l*r-a*p*r-g*s*h+t*p*h+a*s*m-t*l*m)*A,e[7]=(a*d*r-c*l*r+c*s*h-t*d*h-a*s*f+t*l*f)*A,e[8]=T*A,e[9]=(g*u*r-c*_*r-g*n*f+t*_*f+c*n*m-t*u*m)*A,e[10]=(a*_*r-g*o*r+g*n*h-t*_*h-a*n*m+t*o*m)*A,e[11]=(c*o*r-a*u*r-c*n*h+t*u*h+a*n*f-t*o*f)*A,e[12]=R*A,e[13]=(c*_*s-g*u*s+g*n*d-t*_*d-c*n*p+t*u*p)*A,e[14]=(g*o*s-a*_*s-g*n*l+t*_*l+a*n*p-t*o*p)*A,e[15]=(a*u*s-c*o*s+c*n*l-t*u*l-a*n*d+t*o*d)*A,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,h=r*a,c=r*o;return this.set(h*a+n,h*o-s*l,h*l+s*o,0,h*o+s*l,c*o+n,c*l-s*a,0,h*l-s*o,c*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,h=r+r,c=a+a,u=o+o,d=r*h,f=r*c,g=r*u,_=a*c,p=a*u,m=o*u,M=l*h,S=l*c,T=l*u,R=n.x,C=n.y,A=n.z;return s[0]=(1-(_+m))*R,s[1]=(f+T)*R,s[2]=(g-S)*R,s[3]=0,s[4]=(f-T)*C,s[5]=(1-(d+m))*C,s[6]=(p+M)*C,s[7]=0,s[8]=(g+S)*A,s[9]=(p-M)*A,s[10]=(1-(d+_))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Si.set(s[0],s[1],s[2]).length();const a=Si.set(s[4],s[5],s[6]).length(),o=Si.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Yt.copy(this);const h=1/r,c=1/a,u=1/o;return Yt.elements[0]*=h,Yt.elements[1]*=h,Yt.elements[2]*=h,Yt.elements[4]*=c,Yt.elements[5]*=c,Yt.elements[6]*=c,Yt.elements[8]*=u,Yt.elements[9]*=u,Yt.elements[10]*=u,t.setFromRotationMatrix(Yt),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=Cn){const l=this.elements,h=2*r/(t-e),c=2*r/(n-s),u=(t+e)/(t-e),d=(n+s)/(n-s);let f,g;if(o===Cn)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===br)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=c,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Cn){const l=this.elements,h=1/(t-e),c=1/(n-s),u=1/(a-r),d=(t+e)*h,f=(n+s)*c;let g,_;if(o===Cn)g=(a+r)*u,_=-2*u;else if(o===br)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*h,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*c,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Si=new U,Yt=new Qe,_d=new U(0,0,0),vd=new U(1,1,1),Dn=new U,ks=new U,Lt=new U,uc=new Qe,dc=new As;class ln{constructor(e=0,t=0,n=0,s=ln.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],h=s[5],c=s[9],u=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(wt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,h),this._z=0);break;case"YXZ":this._x=Math.asin(-wt(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,h)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(wt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,h)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-wt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,h));break;case"YZX":this._z=Math.asin(wt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-c,h),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-wt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,h),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-c,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return uc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(uc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return dc.setFromEuler(this),this.setFromQuaternion(dc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ln.DEFAULT_ORDER="XYZ";class fh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let xd=0;const fc=new U,Ei=new As,mn=new Qe,Ws=new U,rs=new U,Sd=new U,Ed=new As,pc=new U(1,0,0),mc=new U(0,1,0),gc=new U(0,0,1),_c={type:"added"},Md={type:"removed"},Mi={type:"childadded",child:null},oa={type:"childremoved",child:null};class St extends ji{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:xd++}),this.uuid=bs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=St.DEFAULT_UP.clone();const e=new U,t=new ln,n=new As,s=new U(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Qe},normalMatrix:{value:new Le}}),this.matrix=new Qe,this.matrixWorld=new Qe,this.matrixAutoUpdate=St.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new fh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ei.setFromAxisAngle(e,t),this.quaternion.multiply(Ei),this}rotateOnWorldAxis(e,t){return Ei.setFromAxisAngle(e,t),this.quaternion.premultiply(Ei),this}rotateX(e){return this.rotateOnAxis(pc,e)}rotateY(e){return this.rotateOnAxis(mc,e)}rotateZ(e){return this.rotateOnAxis(gc,e)}translateOnAxis(e,t){return fc.copy(e).applyQuaternion(this.quaternion),this.position.add(fc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(pc,e)}translateY(e){return this.translateOnAxis(mc,e)}translateZ(e){return this.translateOnAxis(gc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(mn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ws.copy(e):Ws.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),rs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?mn.lookAt(rs,Ws,this.up):mn.lookAt(Ws,rs,this.up),this.quaternion.setFromRotationMatrix(mn),s&&(mn.extractRotation(s.matrixWorld),Ei.setFromRotationMatrix(mn),this.quaternion.premultiply(Ei.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(_c),Mi.child=e,this.dispatchEvent(Mi),Mi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Md),oa.child=e,this.dispatchEvent(oa),oa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),mn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),mn.multiply(e.parent.matrixWorld)),e.applyMatrix4(mn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(_c),Mi.child=e,this.dispatchEvent(Mi),Mi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rs,e,Sd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rs,Ed,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let h=0,c=l.length;h<c;h++){const u=l[h];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,h=this.material.length;l<h;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),h=a(e.textures),c=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),h.length>0&&(n.textures=h),c.length>0&&(n.images=c),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const h in o){const c=o[h];delete c.metadata,l.push(c)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}St.DEFAULT_UP=new U(0,1,0);St.DEFAULT_MATRIX_AUTO_UPDATE=!0;St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const $t=new U,gn=new U,ca=new U,_n=new U,yi=new U,Ti=new U,vc=new U,la=new U,ha=new U,ua=new U;class on{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),$t.subVectors(e,t),s.cross($t);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){$t.subVectors(s,t),gn.subVectors(n,t),ca.subVectors(e,t);const a=$t.dot($t),o=$t.dot(gn),l=$t.dot(ca),h=gn.dot(gn),c=gn.dot(ca),u=a*h-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(h*l-o*c)*d,g=(a*c-o*l)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,_n)===null?!1:_n.x>=0&&_n.y>=0&&_n.x+_n.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,_n)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,_n.x),l.addScaledVector(a,_n.y),l.addScaledVector(o,_n.z),l)}static isFrontFacing(e,t,n,s){return $t.subVectors(n,t),gn.subVectors(e,t),$t.cross(gn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return $t.subVectors(this.c,this.b),gn.subVectors(this.a,this.b),$t.cross(gn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return on.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return on.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return on.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return on.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return on.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;yi.subVectors(s,n),Ti.subVectors(r,n),la.subVectors(e,n);const l=yi.dot(la),h=Ti.dot(la);if(l<=0&&h<=0)return t.copy(n);ha.subVectors(e,s);const c=yi.dot(ha),u=Ti.dot(ha);if(c>=0&&u<=c)return t.copy(s);const d=l*u-c*h;if(d<=0&&l>=0&&c<=0)return a=l/(l-c),t.copy(n).addScaledVector(yi,a);ua.subVectors(e,r);const f=yi.dot(ua),g=Ti.dot(ua);if(g>=0&&f<=g)return t.copy(r);const _=f*h-l*g;if(_<=0&&h>=0&&g<=0)return o=h/(h-g),t.copy(n).addScaledVector(Ti,o);const p=c*g-f*u;if(p<=0&&u-c>=0&&f-g>=0)return vc.subVectors(r,s),o=(u-c)/(u-c+(f-g)),t.copy(s).addScaledVector(vc,o);const m=1/(p+_+d);return a=_*m,o=d*m,t.copy(n).addScaledVector(yi,a).addScaledVector(Ti,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const ph={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Nn={h:0,s:0,l:0},Xs={h:0,s:0,l:0};function da(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class ze{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Gt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ke.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=Ke.workingColorSpace){if(e=od(e,1),t=wt(t,0,1),n=wt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=da(a,r,e+1/3),this.g=da(a,r,e),this.b=da(a,r,e-1/3)}return Ke.toWorkingColorSpace(this,s),this}setStyle(e,t=Gt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Gt){const n=ph[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Bi(e.r),this.g=Bi(e.g),this.b=Bi(e.b),this}copyLinearToSRGB(e){return this.r=Qr(e.r),this.g=Qr(e.g),this.b=Qr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Gt){return Ke.fromWorkingColorSpace(Mt.copy(this),e),Math.round(wt(Mt.r*255,0,255))*65536+Math.round(wt(Mt.g*255,0,255))*256+Math.round(wt(Mt.b*255,0,255))}getHexString(e=Gt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.fromWorkingColorSpace(Mt.copy(this),t);const n=Mt.r,s=Mt.g,r=Mt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,h;const c=(o+a)/2;if(o===a)l=0,h=0;else{const u=a-o;switch(h=c<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=h,e.l=c,e}getRGB(e,t=Ke.workingColorSpace){return Ke.fromWorkingColorSpace(Mt.copy(this),t),e.r=Mt.r,e.g=Mt.g,e.b=Mt.b,e}getStyle(e=Gt){Ke.fromWorkingColorSpace(Mt.copy(this),e);const t=Mt.r,n=Mt.g,s=Mt.b;return e!==Gt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Nn),this.setHSL(Nn.h+e,Nn.s+t,Nn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Nn),e.getHSL(Xs);const n=Zr(Nn.h,Xs.h,t),s=Zr(Nn.s,Xs.s,t),r=Zr(Nn.l,Xs.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Mt=new ze;ze.NAMES=ph;let yd=0;class Ji extends ji{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:yd++}),this.uuid=bs(),this.name="",this.type="Material",this.blending=Ui,this.side=wn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Pa,this.blendDst=Ia,this.blendEquation=ii,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ze(0,0,0),this.blendAlpha=0,this.depthFunc=Sr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=sc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=mi,this.stencilZFail=mi,this.stencilZPass=mi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ui&&(n.blending=this.blending),this.side!==wn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Pa&&(n.blendSrc=this.blendSrc),this.blendDst!==Ia&&(n.blendDst=this.blendDst),this.blendEquation!==ii&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Sr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==sc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==mi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==mi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==mi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class mh extends Ji{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ln,this.combine=Kl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ht=new U,qs=new We;class en{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=rc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=cn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return ms("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)qs.fromBufferAttribute(this,t),qs.applyMatrix3(e),this.setXY(t,qs.x,qs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ht.fromBufferAttribute(this,t),ht.applyMatrix3(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ht.fromBufferAttribute(this,t),ht.applyMatrix4(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ht.fromBufferAttribute(this,t),ht.applyNormalMatrix(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ht.fromBufferAttribute(this,t),ht.transformDirection(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ts(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=At(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ts(t,this.array)),t}setX(e,t){return this.normalized&&(t=At(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ts(t,this.array)),t}setY(e,t){return this.normalized&&(t=At(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ts(t,this.array)),t}setZ(e,t){return this.normalized&&(t=At(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ts(t,this.array)),t}setW(e,t){return this.normalized&&(t=At(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=At(t,this.array),n=At(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=At(t,this.array),n=At(n,this.array),s=At(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=At(t,this.array),n=At(n,this.array),s=At(s,this.array),r=At(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==rc&&(e.usage=this.usage),e}}class gh extends en{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class _h extends en{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Wt extends en{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Td=0;const zt=new Qe,fa=new St,Ci=new U,Vt=new ui,as=new ui,mt=new U;class Rn extends ji{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Td++}),this.uuid=bs(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(lh(e)?_h:gh)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Le().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return zt.makeRotationFromQuaternion(e),this.applyMatrix4(zt),this}rotateX(e){return zt.makeRotationX(e),this.applyMatrix4(zt),this}rotateY(e){return zt.makeRotationY(e),this.applyMatrix4(zt),this}rotateZ(e){return zt.makeRotationZ(e),this.applyMatrix4(zt),this}translate(e,t,n){return zt.makeTranslation(e,t,n),this.applyMatrix4(zt),this}scale(e,t,n){return zt.makeScale(e,t,n),this.applyMatrix4(zt),this}lookAt(e){return fa.lookAt(e),fa.updateMatrix(),this.applyMatrix4(fa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ci).negate(),this.translate(Ci.x,Ci.y,Ci.z),this}setFromPoints(e){const t=[];for(let n=0,s=e.length;n<s;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Wt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ui);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Vt.setFromBufferAttribute(r),this.morphTargetsRelative?(mt.addVectors(this.boundingBox.min,Vt.min),this.boundingBox.expandByPoint(mt),mt.addVectors(this.boundingBox.max,Vt.max),this.boundingBox.expandByPoint(mt)):(this.boundingBox.expandByPoint(Vt.min),this.boundingBox.expandByPoint(Vt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Zi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){const n=this.boundingSphere.center;if(Vt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];as.setFromBufferAttribute(o),this.morphTargetsRelative?(mt.addVectors(Vt.min,as.min),Vt.expandByPoint(mt),mt.addVectors(Vt.max,as.max),Vt.expandByPoint(mt)):(Vt.expandByPoint(as.min),Vt.expandByPoint(as.max))}Vt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)mt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(mt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let h=0,c=o.count;h<c;h++)mt.fromBufferAttribute(o,h),l&&(Ci.fromBufferAttribute(e,h),mt.add(Ci)),s=Math.max(s,n.distanceToSquared(mt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new en(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let b=0;b<n.count;b++)o[b]=new U,l[b]=new U;const h=new U,c=new U,u=new U,d=new We,f=new We,g=new We,_=new U,p=new U;function m(b,v,x){h.fromBufferAttribute(n,b),c.fromBufferAttribute(n,v),u.fromBufferAttribute(n,x),d.fromBufferAttribute(r,b),f.fromBufferAttribute(r,v),g.fromBufferAttribute(r,x),c.sub(h),u.sub(h),f.sub(d),g.sub(d);const F=1/(f.x*g.y-g.x*f.y);isFinite(F)&&(_.copy(c).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(F),p.copy(u).multiplyScalar(f.x).addScaledVector(c,-g.x).multiplyScalar(F),o[b].add(_),o[v].add(_),o[x].add(_),l[b].add(p),l[v].add(p),l[x].add(p))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let b=0,v=M.length;b<v;++b){const x=M[b],F=x.start,N=x.count;for(let I=F,G=F+N;I<G;I+=3)m(e.getX(I+0),e.getX(I+1),e.getX(I+2))}const S=new U,T=new U,R=new U,C=new U;function A(b){R.fromBufferAttribute(s,b),C.copy(R);const v=o[b];S.copy(v),S.sub(R.multiplyScalar(R.dot(v))).normalize(),T.crossVectors(C,v);const F=T.dot(l[b])<0?-1:1;a.setXYZW(b,S.x,S.y,S.z,F)}for(let b=0,v=M.length;b<v;++b){const x=M[b],F=x.start,N=x.count;for(let I=F,G=F+N;I<G;I+=3)A(e.getX(I+0)),A(e.getX(I+1)),A(e.getX(I+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new en(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new U,r=new U,a=new U,o=new U,l=new U,h=new U,c=new U,u=new U;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),_=e.getX(d+1),p=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,p),c.subVectors(a,r),u.subVectors(s,r),c.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),h.fromBufferAttribute(n,p),o.add(c),l.add(c),h.add(c),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,h.x,h.y,h.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),c.subVectors(a,r),u.subVectors(s,r),c.cross(u),n.setXYZ(d+0,c.x,c.y,c.z),n.setXYZ(d+1,c.x,c.y,c.z),n.setXYZ(d+2,c.x,c.y,c.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)mt.fromBufferAttribute(e,t),mt.normalize(),e.setXYZ(t,mt.x,mt.y,mt.z)}toNonIndexed(){function e(o,l){const h=o.array,c=o.itemSize,u=o.normalized,d=new h.constructor(l.length*c);let f=0,g=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*c;for(let m=0;m<c;m++)d[g++]=h[f++]}return new en(d,c,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Rn,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],h=e(l,n);t.setAttribute(o,h)}const r=this.morphAttributes;for(const o in r){const l=[],h=r[o];for(let c=0,u=h.length;c<u;c++){const d=h[c],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const h=a[o];t.addGroup(h.start,h.count,h.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const h in l)l[h]!==void 0&&(e[h]=l[h]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const h=n[l];e.data.attributes[l]=h.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const h=this.morphAttributes[l],c=[];for(let u=0,d=h.length;u<d;u++){const f=h[u];c.push(f.toJSON(e.data))}c.length>0&&(s[l]=c,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const h in s){const c=s[h];this.setAttribute(h,c.clone(t))}const r=e.morphAttributes;for(const h in r){const c=[],u=r[h];for(let d=0,f=u.length;d<f;d++)c.push(u[d].clone(t));this.morphAttributes[h]=c}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let h=0,c=a.length;h<c;h++){const u=a[h];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const xc=new Qe,Kn=new dh,Ys=new Zi,Sc=new U,bi=new U,Ai=new U,wi=new U,pa=new U,$s=new U,Ks=new We,js=new We,Zs=new We,Ec=new U,Mc=new U,yc=new U,Js=new U,Qs=new U;class xt extends St{constructor(e=new Rn,t=new mh){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){$s.set(0,0,0);for(let l=0,h=r.length;l<h;l++){const c=o[l],u=r[l];c!==0&&(pa.fromBufferAttribute(u,e),a?$s.addScaledVector(pa,c):$s.addScaledVector(pa.sub(t),c))}t.add($s)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ys.copy(n.boundingSphere),Ys.applyMatrix4(r),Kn.copy(e.ray).recast(e.near),!(Ys.containsPoint(Kn.origin)===!1&&(Kn.intersectSphere(Ys,Sc)===null||Kn.origin.distanceToSquared(Sc)>(e.far-e.near)**2))&&(xc.copy(r).invert(),Kn.copy(e.ray).applyMatrix4(xc),!(n.boundingBox!==null&&Kn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Kn)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,h=r.attributes.uv,c=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const p=d[g],m=a[p.materialIndex],M=Math.max(p.start,f.start),S=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let T=M,R=S;T<R;T+=3){const C=o.getX(T),A=o.getX(T+1),b=o.getX(T+2);s=er(this,m,e,n,h,c,u,C,A,b),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){const M=o.getX(p),S=o.getX(p+1),T=o.getX(p+2);s=er(this,a,e,n,h,c,u,M,S,T),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const p=d[g],m=a[p.materialIndex],M=Math.max(p.start,f.start),S=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let T=M,R=S;T<R;T+=3){const C=T,A=T+1,b=T+2;s=er(this,m,e,n,h,c,u,C,A,b),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){const M=p,S=p+1,T=p+2;s=er(this,a,e,n,h,c,u,M,S,T),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}}function Cd(i,e,t,n,s,r,a,o){let l;if(e.side===Rt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===wn,o),l===null)return null;Qs.copy(o),Qs.applyMatrix4(i.matrixWorld);const h=t.ray.origin.distanceTo(Qs);return h<t.near||h>t.far?null:{distance:h,point:Qs.clone(),object:i}}function er(i,e,t,n,s,r,a,o,l,h){i.getVertexPosition(o,bi),i.getVertexPosition(l,Ai),i.getVertexPosition(h,wi);const c=Cd(i,e,t,n,bi,Ai,wi,Js);if(c){s&&(Ks.fromBufferAttribute(s,o),js.fromBufferAttribute(s,l),Zs.fromBufferAttribute(s,h),c.uv=on.getInterpolation(Js,bi,Ai,wi,Ks,js,Zs,new We)),r&&(Ks.fromBufferAttribute(r,o),js.fromBufferAttribute(r,l),Zs.fromBufferAttribute(r,h),c.uv1=on.getInterpolation(Js,bi,Ai,wi,Ks,js,Zs,new We)),a&&(Ec.fromBufferAttribute(a,o),Mc.fromBufferAttribute(a,l),yc.fromBufferAttribute(a,h),c.normal=on.getInterpolation(Js,bi,Ai,wi,Ec,Mc,yc,new U),c.normal.dot(n.direction)>0&&c.normal.multiplyScalar(-1));const u={a:o,b:l,c:h,normal:new U,materialIndex:0};on.getNormal(bi,Ai,wi,u.normal),c.face=u}return c}class ws extends Rn{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],h=[],c=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Wt(h,3)),this.setAttribute("normal",new Wt(c,3)),this.setAttribute("uv",new Wt(u,2));function g(_,p,m,M,S,T,R,C,A,b,v){const x=T/A,F=R/b,N=T/2,I=R/2,G=C/2,W=A+1,B=b+1;let j=0,k=0;const se=new U;for(let ae=0;ae<B;ae++){const de=ae*F-I;for(let Ve=0;Ve<W;Ve++){const Ze=Ve*x-N;se[_]=Ze*M,se[p]=de*S,se[m]=G,h.push(se.x,se.y,se.z),se[_]=0,se[p]=0,se[m]=C>0?1:-1,c.push(se.x,se.y,se.z),u.push(Ve/A),u.push(1-ae/b),j+=1}}for(let ae=0;ae<b;ae++)for(let de=0;de<A;de++){const Ve=d+de+W*ae,Ze=d+de+W*(ae+1),X=d+(de+1)+W*(ae+1),J=d+(de+1)+W*ae;l.push(Ve,Ze,J),l.push(Ze,X,J),k+=6}o.addGroup(f,k,v),f+=k,d+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ws(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Yi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Tt(i){const e={};for(let t=0;t<i.length;t++){const n=Yi(i[t]);for(const s in n)e[s]=n[s]}return e}function bd(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function vh(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ke.workingColorSpace}const Ad={clone:Yi,merge:Tt};var wd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Fd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Wn extends Ji{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=wd,this.fragmentShader=Fd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Yi(e.uniforms),this.uniformsGroups=bd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class xh extends St{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qe,this.projectionMatrix=new Qe,this.projectionMatrixInverse=new Qe,this.coordinateSystem=Cn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Un=new U,Tc=new We,Cc=new We;class Kt extends xh{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=oo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(jr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return oo*2*Math.atan(Math.tan(jr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Un.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Un.x,Un.y).multiplyScalar(-e/Un.z),Un.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Un.x,Un.y).multiplyScalar(-e/Un.z)}getViewSize(e,t){return this.getViewBounds(e,Tc,Cc),t.subVectors(Cc,Tc)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(jr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,h=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/h,s*=a.width/l,n*=a.height/h}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Fi=-90,Ri=1;class Rd extends St{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Kt(Fi,Ri,e,t);s.layers=this.layers,this.add(s);const r=new Kt(Fi,Ri,e,t);r.layers=this.layers,this.add(r);const a=new Kt(Fi,Ri,e,t);a.layers=this.layers,this.add(a);const o=new Kt(Fi,Ri,e,t);o.layers=this.layers,this.add(o);const l=new Kt(Fi,Ri,e,t);l.layers=this.layers,this.add(l);const h=new Kt(Fi,Ri,e,t);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const h of t)this.remove(h);if(e===Cn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===br)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const h of t)this.add(h),h.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,h,c]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,h),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,c),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Sh extends gt{constructor(e,t,n,s,r,a,o,l,h,c){e=e!==void 0?e:[],t=t!==void 0?t:ki,super(e,t,n,s,r,a,o,l,h,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Pd extends hi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Sh(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Zt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new ws(5,5,5),r=new Wn({name:"CubemapFromEquirect",uniforms:Yi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Rt,blending:Hn});r.uniforms.tEquirect.value=t;const a=new xt(s,r),o=t.minFilter;return t.minFilter===ri&&(t.minFilter=Zt),new Rd(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}const ma=new U,Id=new U,Ld=new Le;class ei{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=ma.subVectors(n,t).cross(Id.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ma),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Ld.getNormalMatrix(e),s=this.coplanarPoint(ma).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const jn=new Zi,tr=new U;class wo{constructor(e=new ei,t=new ei,n=new ei,s=new ei,r=new ei,a=new ei){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Cn){const n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],l=s[3],h=s[4],c=s[5],u=s[6],d=s[7],f=s[8],g=s[9],_=s[10],p=s[11],m=s[12],M=s[13],S=s[14],T=s[15];if(n[0].setComponents(l-r,d-h,p-f,T-m).normalize(),n[1].setComponents(l+r,d+h,p+f,T+m).normalize(),n[2].setComponents(l+a,d+c,p+g,T+M).normalize(),n[3].setComponents(l-a,d-c,p-g,T-M).normalize(),n[4].setComponents(l-o,d-u,p-_,T-S).normalize(),t===Cn)n[5].setComponents(l+o,d+u,p+_,T+S).normalize();else if(t===br)n[5].setComponents(o,u,_,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),jn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),jn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(jn)}intersectsSprite(e){return jn.center.set(0,0,0),jn.radius=.7071067811865476,jn.applyMatrix4(e.matrixWorld),this.intersectsSphere(jn)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(tr.x=s.normal.x>0?e.max.x:e.min.x,tr.y=s.normal.y>0?e.max.y:e.min.y,tr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(tr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Eh(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Vd(i){const e=new WeakMap;function t(o,l){const h=o.array,c=o.usage,u=h.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,h,c),o.onUploadCallback();let f;if(h instanceof Float32Array)f=i.FLOAT;else if(h instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(h instanceof Int16Array)f=i.SHORT;else if(h instanceof Uint32Array)f=i.UNSIGNED_INT;else if(h instanceof Int32Array)f=i.INT;else if(h instanceof Int8Array)f=i.BYTE;else if(h instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:d,type:f,bytesPerElement:h.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,h){const c=l.array,u=l._updateRange,d=l.updateRanges;if(i.bindBuffer(h,o),u.count===-1&&d.length===0&&i.bufferSubData(h,0,c),d.length!==0){for(let f=0,g=d.length;f<g;f++){const _=d[f];i.bufferSubData(h,_.start*c.BYTES_PER_ELEMENT,c,_.start,_.count)}l.clearUpdateRanges()}u.count!==-1&&(i.bufferSubData(h,u.offset*c.BYTES_PER_ELEMENT,c,u.offset,u.count),u.count=-1),l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const c=e.get(o);(!c||c.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const h=e.get(o);if(h===void 0)e.set(o,t(o,l));else if(h.version<o.version){if(h.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(h.buffer,o,l),h.version=o.version}}return{get:s,remove:r,update:a}}class Ur extends Rn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),h=o+1,c=l+1,u=e/o,d=t/l,f=[],g=[],_=[],p=[];for(let m=0;m<c;m++){const M=m*d-a;for(let S=0;S<h;S++){const T=S*u-r;g.push(T,-M,0),_.push(0,0,1),p.push(S/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let M=0;M<o;M++){const S=M+h*m,T=M+h*(m+1),R=M+1+h*(m+1),C=M+1+h*m;f.push(S,T,C),f.push(T,R,C)}this.setIndex(f),this.setAttribute("position",new Wt(g,3)),this.setAttribute("normal",new Wt(_,3)),this.setAttribute("uv",new Wt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ur(e.width,e.height,e.widthSegments,e.heightSegments)}}var Dd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Nd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Ud=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Od=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Gd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Hd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,kd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Wd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Xd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,qd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Yd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,$d=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Kd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,jd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Zd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Jd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Qd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ef=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,tf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,nf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,sf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,rf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,af=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,of=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,cf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,lf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,hf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,uf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,df="gl_FragColor = linearToOutputTexel( gl_FragColor );",ff=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,pf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,mf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,gf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,_f=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,vf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,xf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Sf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ef=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Mf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,yf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Tf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Cf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,bf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Af=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,wf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Ff=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Rf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Pf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,If=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Lf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Vf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Df=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Nf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Uf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Of=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Bf=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zf=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Gf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Hf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,kf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Wf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Xf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,qf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Yf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,$f=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Kf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,jf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Jf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,ep=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,tp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,np=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ip=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,sp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,rp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ap=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,op=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,cp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,lp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,hp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,up=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,dp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,fp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,pp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,mp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,gp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_p=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,vp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,xp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Sp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Ep=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Mp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,yp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Tp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Cp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,bp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ap=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,wp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Fp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Rp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Pp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ip=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Lp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Vp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Dp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Np=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Up=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Op=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Hp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,kp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Wp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Xp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,qp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,$p=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Kp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,jp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,em=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,nm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,im=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,am=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,om=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,hm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,um=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,fm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,pm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ie={alphahash_fragment:Dd,alphahash_pars_fragment:Nd,alphamap_fragment:Ud,alphamap_pars_fragment:Od,alphatest_fragment:Bd,alphatest_pars_fragment:zd,aomap_fragment:Gd,aomap_pars_fragment:Hd,batching_pars_vertex:kd,batching_vertex:Wd,begin_vertex:Xd,beginnormal_vertex:qd,bsdfs:Yd,iridescence_fragment:$d,bumpmap_pars_fragment:Kd,clipping_planes_fragment:jd,clipping_planes_pars_fragment:Zd,clipping_planes_pars_vertex:Jd,clipping_planes_vertex:Qd,color_fragment:ef,color_pars_fragment:tf,color_pars_vertex:nf,color_vertex:sf,common:rf,cube_uv_reflection_fragment:af,defaultnormal_vertex:of,displacementmap_pars_vertex:cf,displacementmap_vertex:lf,emissivemap_fragment:hf,emissivemap_pars_fragment:uf,colorspace_fragment:df,colorspace_pars_fragment:ff,envmap_fragment:pf,envmap_common_pars_fragment:mf,envmap_pars_fragment:gf,envmap_pars_vertex:_f,envmap_physical_pars_fragment:wf,envmap_vertex:vf,fog_vertex:xf,fog_pars_vertex:Sf,fog_fragment:Ef,fog_pars_fragment:Mf,gradientmap_pars_fragment:yf,lightmap_pars_fragment:Tf,lights_lambert_fragment:Cf,lights_lambert_pars_fragment:bf,lights_pars_begin:Af,lights_toon_fragment:Ff,lights_toon_pars_fragment:Rf,lights_phong_fragment:Pf,lights_phong_pars_fragment:If,lights_physical_fragment:Lf,lights_physical_pars_fragment:Vf,lights_fragment_begin:Df,lights_fragment_maps:Nf,lights_fragment_end:Uf,logdepthbuf_fragment:Of,logdepthbuf_pars_fragment:Bf,logdepthbuf_pars_vertex:zf,logdepthbuf_vertex:Gf,map_fragment:Hf,map_pars_fragment:kf,map_particle_fragment:Wf,map_particle_pars_fragment:Xf,metalnessmap_fragment:qf,metalnessmap_pars_fragment:Yf,morphinstance_vertex:$f,morphcolor_vertex:Kf,morphnormal_vertex:jf,morphtarget_pars_vertex:Zf,morphtarget_vertex:Jf,normal_fragment_begin:Qf,normal_fragment_maps:ep,normal_pars_fragment:tp,normal_pars_vertex:np,normal_vertex:ip,normalmap_pars_fragment:sp,clearcoat_normal_fragment_begin:rp,clearcoat_normal_fragment_maps:ap,clearcoat_pars_fragment:op,iridescence_pars_fragment:cp,opaque_fragment:lp,packing:hp,premultiplied_alpha_fragment:up,project_vertex:dp,dithering_fragment:fp,dithering_pars_fragment:pp,roughnessmap_fragment:mp,roughnessmap_pars_fragment:gp,shadowmap_pars_fragment:_p,shadowmap_pars_vertex:vp,shadowmap_vertex:xp,shadowmask_pars_fragment:Sp,skinbase_vertex:Ep,skinning_pars_vertex:Mp,skinning_vertex:yp,skinnormal_vertex:Tp,specularmap_fragment:Cp,specularmap_pars_fragment:bp,tonemapping_fragment:Ap,tonemapping_pars_fragment:wp,transmission_fragment:Fp,transmission_pars_fragment:Rp,uv_pars_fragment:Pp,uv_pars_vertex:Ip,uv_vertex:Lp,worldpos_vertex:Vp,background_vert:Dp,background_frag:Np,backgroundCube_vert:Up,backgroundCube_frag:Op,cube_vert:Bp,cube_frag:zp,depth_vert:Gp,depth_frag:Hp,distanceRGBA_vert:kp,distanceRGBA_frag:Wp,equirect_vert:Xp,equirect_frag:qp,linedashed_vert:Yp,linedashed_frag:$p,meshbasic_vert:Kp,meshbasic_frag:jp,meshlambert_vert:Zp,meshlambert_frag:Jp,meshmatcap_vert:Qp,meshmatcap_frag:em,meshnormal_vert:tm,meshnormal_frag:nm,meshphong_vert:im,meshphong_frag:sm,meshphysical_vert:rm,meshphysical_frag:am,meshtoon_vert:om,meshtoon_frag:cm,points_vert:lm,points_frag:hm,shadow_vert:um,shadow_frag:dm,sprite_vert:fm,sprite_frag:pm},ie={common:{diffuse:{value:new ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Le},alphaMap:{value:null},alphaMapTransform:{value:new Le},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Le}},envmap:{envMap:{value:null},envMapRotation:{value:new Le},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Le}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Le}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Le},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Le},normalScale:{value:new We(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Le},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Le}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Le}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Le}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Le},alphaTest:{value:0},uvTransform:{value:new Le}},sprite:{diffuse:{value:new ze(16777215)},opacity:{value:1},center:{value:new We(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Le},alphaMap:{value:null},alphaMapTransform:{value:new Le},alphaTest:{value:0}}},rn={basic:{uniforms:Tt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.fog]),vertexShader:Ie.meshbasic_vert,fragmentShader:Ie.meshbasic_frag},lambert:{uniforms:Tt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new ze(0)}}]),vertexShader:Ie.meshlambert_vert,fragmentShader:Ie.meshlambert_frag},phong:{uniforms:Tt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new ze(0)},specular:{value:new ze(1118481)},shininess:{value:30}}]),vertexShader:Ie.meshphong_vert,fragmentShader:Ie.meshphong_frag},standard:{uniforms:Tt([ie.common,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.roughnessmap,ie.metalnessmap,ie.fog,ie.lights,{emissive:{value:new ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ie.meshphysical_vert,fragmentShader:Ie.meshphysical_frag},toon:{uniforms:Tt([ie.common,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.gradientmap,ie.fog,ie.lights,{emissive:{value:new ze(0)}}]),vertexShader:Ie.meshtoon_vert,fragmentShader:Ie.meshtoon_frag},matcap:{uniforms:Tt([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,{matcap:{value:null}}]),vertexShader:Ie.meshmatcap_vert,fragmentShader:Ie.meshmatcap_frag},points:{uniforms:Tt([ie.points,ie.fog]),vertexShader:Ie.points_vert,fragmentShader:Ie.points_frag},dashed:{uniforms:Tt([ie.common,ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ie.linedashed_vert,fragmentShader:Ie.linedashed_frag},depth:{uniforms:Tt([ie.common,ie.displacementmap]),vertexShader:Ie.depth_vert,fragmentShader:Ie.depth_frag},normal:{uniforms:Tt([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,{opacity:{value:1}}]),vertexShader:Ie.meshnormal_vert,fragmentShader:Ie.meshnormal_frag},sprite:{uniforms:Tt([ie.sprite,ie.fog]),vertexShader:Ie.sprite_vert,fragmentShader:Ie.sprite_frag},background:{uniforms:{uvTransform:{value:new Le},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ie.background_vert,fragmentShader:Ie.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Le}},vertexShader:Ie.backgroundCube_vert,fragmentShader:Ie.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ie.cube_vert,fragmentShader:Ie.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ie.equirect_vert,fragmentShader:Ie.equirect_frag},distanceRGBA:{uniforms:Tt([ie.common,ie.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ie.distanceRGBA_vert,fragmentShader:Ie.distanceRGBA_frag},shadow:{uniforms:Tt([ie.lights,ie.fog,{color:{value:new ze(0)},opacity:{value:1}}]),vertexShader:Ie.shadow_vert,fragmentShader:Ie.shadow_frag}};rn.physical={uniforms:Tt([rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Le},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Le},clearcoatNormalScale:{value:new We(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Le},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Le},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Le},sheen:{value:0},sheenColor:{value:new ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Le},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Le},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Le},transmissionSamplerSize:{value:new We},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Le},attenuationDistance:{value:0},attenuationColor:{value:new ze(0)},specularColor:{value:new ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Le},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Le},anisotropyVector:{value:new We},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Le}}]),vertexShader:Ie.meshphysical_vert,fragmentShader:Ie.meshphysical_frag};const nr={r:0,b:0,g:0},Zn=new ln,mm=new Qe;function gm(i,e,t,n,s,r,a){const o=new ze(0);let l=r===!0?0:1,h,c,u=null,d=0,f=null;function g(M){let S=M.isScene===!0?M.background:null;return S&&S.isTexture&&(S=(M.backgroundBlurriness>0?t:e).get(S)),S}function _(M){let S=!1;const T=g(M);T===null?m(o,l):T&&T.isColor&&(m(T,1),S=!0);const R=i.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function p(M,S){const T=g(S);T&&(T.isCubeTexture||T.mapping===Dr)?(c===void 0&&(c=new xt(new ws(1,1,1),new Wn({name:"BackgroundCubeMaterial",uniforms:Yi(rn.backgroundCube.uniforms),vertexShader:rn.backgroundCube.vertexShader,fragmentShader:rn.backgroundCube.fragmentShader,side:Rt,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(R,C,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(c)),Zn.copy(S.backgroundRotation),Zn.x*=-1,Zn.y*=-1,Zn.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Zn.y*=-1,Zn.z*=-1),c.material.uniforms.envMap.value=T,c.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(mm.makeRotationFromEuler(Zn)),c.material.toneMapped=Ke.getTransfer(T.colorSpace)!==et,(u!==T||d!==T.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=T,d=T.version,f=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):T&&T.isTexture&&(h===void 0&&(h=new xt(new Ur(2,2),new Wn({name:"BackgroundMaterial",uniforms:Yi(rn.background.uniforms),vertexShader:rn.background.vertexShader,fragmentShader:rn.background.fragmentShader,side:wn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(h)),h.material.uniforms.t2D.value=T,h.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,h.material.toneMapped=Ke.getTransfer(T.colorSpace)!==et,T.matrixAutoUpdate===!0&&T.updateMatrix(),h.material.uniforms.uvTransform.value.copy(T.matrix),(u!==T||d!==T.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=T,d=T.version,f=i.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null))}function m(M,S){M.getRGB(nr,vh(i)),n.buffers.color.setClear(nr.r,nr.g,nr.b,S,a)}return{getClearColor:function(){return o},setClearColor:function(M,S=1){o.set(M),l=S,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,m(o,l)},render:_,addToRenderList:p}}function _m(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(x,F,N,I,G){let W=!1;const B=u(I,N,F);r!==B&&(r=B,h(r.object)),W=f(x,I,N,G),W&&g(x,I,N,G),G!==null&&e.update(G,i.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,T(x,F,N,I),G!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function l(){return i.createVertexArray()}function h(x){return i.bindVertexArray(x)}function c(x){return i.deleteVertexArray(x)}function u(x,F,N){const I=N.wireframe===!0;let G=n[x.id];G===void 0&&(G={},n[x.id]=G);let W=G[F.id];W===void 0&&(W={},G[F.id]=W);let B=W[I];return B===void 0&&(B=d(l()),W[I]=B),B}function d(x){const F=[],N=[],I=[];for(let G=0;G<t;G++)F[G]=0,N[G]=0,I[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:N,attributeDivisors:I,object:x,attributes:{},index:null}}function f(x,F,N,I){const G=r.attributes,W=F.attributes;let B=0;const j=N.getAttributes();for(const k in j)if(j[k].location>=0){const ae=G[k];let de=W[k];if(de===void 0&&(k==="instanceMatrix"&&x.instanceMatrix&&(de=x.instanceMatrix),k==="instanceColor"&&x.instanceColor&&(de=x.instanceColor)),ae===void 0||ae.attribute!==de||de&&ae.data!==de.data)return!0;B++}return r.attributesNum!==B||r.index!==I}function g(x,F,N,I){const G={},W=F.attributes;let B=0;const j=N.getAttributes();for(const k in j)if(j[k].location>=0){let ae=W[k];ae===void 0&&(k==="instanceMatrix"&&x.instanceMatrix&&(ae=x.instanceMatrix),k==="instanceColor"&&x.instanceColor&&(ae=x.instanceColor));const de={};de.attribute=ae,ae&&ae.data&&(de.data=ae.data),G[k]=de,B++}r.attributes=G,r.attributesNum=B,r.index=I}function _(){const x=r.newAttributes;for(let F=0,N=x.length;F<N;F++)x[F]=0}function p(x){m(x,0)}function m(x,F){const N=r.newAttributes,I=r.enabledAttributes,G=r.attributeDivisors;N[x]=1,I[x]===0&&(i.enableVertexAttribArray(x),I[x]=1),G[x]!==F&&(i.vertexAttribDivisor(x,F),G[x]=F)}function M(){const x=r.newAttributes,F=r.enabledAttributes;for(let N=0,I=F.length;N<I;N++)F[N]!==x[N]&&(i.disableVertexAttribArray(N),F[N]=0)}function S(x,F,N,I,G,W,B){B===!0?i.vertexAttribIPointer(x,F,N,G,W):i.vertexAttribPointer(x,F,N,I,G,W)}function T(x,F,N,I){_();const G=I.attributes,W=N.getAttributes(),B=F.defaultAttributeValues;for(const j in W){const k=W[j];if(k.location>=0){let se=G[j];if(se===void 0&&(j==="instanceMatrix"&&x.instanceMatrix&&(se=x.instanceMatrix),j==="instanceColor"&&x.instanceColor&&(se=x.instanceColor)),se!==void 0){const ae=se.normalized,de=se.itemSize,Ve=e.get(se);if(Ve===void 0)continue;const Ze=Ve.buffer,X=Ve.type,J=Ve.bytesPerElement,ge=X===i.INT||X===i.UNSIGNED_INT||se.gpuType===So;if(se.isInterleavedBufferAttribute){const he=se.data,Te=he.stride,Fe=se.offset;if(he.isInstancedInterleavedBuffer){for(let Ue=0;Ue<k.locationSize;Ue++)m(k.location+Ue,he.meshPerAttribute);x.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let Ue=0;Ue<k.locationSize;Ue++)p(k.location+Ue);i.bindBuffer(i.ARRAY_BUFFER,Ze);for(let Ue=0;Ue<k.locationSize;Ue++)S(k.location+Ue,de/k.locationSize,X,ae,Te*J,(Fe+de/k.locationSize*Ue)*J,ge)}else{if(se.isInstancedBufferAttribute){for(let he=0;he<k.locationSize;he++)m(k.location+he,se.meshPerAttribute);x.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let he=0;he<k.locationSize;he++)p(k.location+he);i.bindBuffer(i.ARRAY_BUFFER,Ze);for(let he=0;he<k.locationSize;he++)S(k.location+he,de/k.locationSize,X,ae,de*J,de/k.locationSize*he*J,ge)}}else if(B!==void 0){const ae=B[j];if(ae!==void 0)switch(ae.length){case 2:i.vertexAttrib2fv(k.location,ae);break;case 3:i.vertexAttrib3fv(k.location,ae);break;case 4:i.vertexAttrib4fv(k.location,ae);break;default:i.vertexAttrib1fv(k.location,ae)}}}}M()}function R(){b();for(const x in n){const F=n[x];for(const N in F){const I=F[N];for(const G in I)c(I[G].object),delete I[G];delete F[N]}delete n[x]}}function C(x){if(n[x.id]===void 0)return;const F=n[x.id];for(const N in F){const I=F[N];for(const G in I)c(I[G].object),delete I[G];delete F[N]}delete n[x.id]}function A(x){for(const F in n){const N=n[F];if(N[x.id]===void 0)continue;const I=N[x.id];for(const G in I)c(I[G].object),delete I[G];delete N[x.id]}}function b(){v(),a=!0,r!==s&&(r=s,h(r.object))}function v(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:b,resetDefaultState:v,dispose:R,releaseStatesOfGeometry:C,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:p,disableUnusedAttributes:M}}function vm(i,e,t){let n;function s(h){n=h}function r(h,c){i.drawArrays(n,h,c),t.update(c,n,1)}function a(h,c,u){u!==0&&(i.drawArraysInstanced(n,h,c,u),t.update(c,n,u))}function o(h,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,h,0,c,0,u);let f=0;for(let g=0;g<u;g++)f+=c[g];t.update(f,n,1)}function l(h,c,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<h.length;g++)a(h[g],c[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,h,0,c,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=c[_];for(let _=0;_<d.length;_++)t.update(g,n,d[_])}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function xm(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==Jt&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const A=C===Cs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Fn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==cn&&!A)}function l(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=t.precision!==void 0?t.precision:"highp";const c=l(h);c!==h&&(console.warn("THREE.WebGLRenderer:",h,"not supported, using",c,"instead."),h=c);const u=t.logarithmicDepthBuffer===!0,d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),_=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=f>0,R=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:h,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:f,maxTextureSize:g,maxCubemapSize:_,maxAttributes:p,maxVertexUniforms:m,maxVaryings:M,maxFragmentUniforms:S,vertexTextures:T,maxSamples:R}}function Sm(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new ei,o=new Le,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,c(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=c(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,p=u.clipShadows,m=i.get(u);if(!s||g===null||g.length===0||r&&!p)r?c(null):h();else{const M=r?0:n,S=M*4;let T=m.clippingState||null;l.value=T,T=c(g,d,S,f);for(let R=0;R!==S;++R)T[R]=t[R];m.clippingState=T,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function h(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function c(u,d,f,g){const _=u!==null?u.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const m=f+_*4,M=d.matrixWorldInverse;o.getNormalMatrix(M),(p===null||p.length<m)&&(p=new Float32Array(m));for(let S=0,T=f;S!==_;++S,T+=4)a.copy(u[S]).applyMatrix4(M,o),a.normal.toArray(p,T),p[T+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}function Em(i){let e=new WeakMap;function t(a,o){return o===La?a.mapping=ki:o===Va&&(a.mapping=Wi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===La||o===Va)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const h=new Pd(l.height);return h.fromEquirectangularTexture(i,a),e.set(a,h),a.addEventListener("dispose",s),t(h.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Fo extends xh{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=h*this.view.offsetX,a=r+h*this.view.width,o-=c*this.view.offsetY,l=o-c*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Di=4,bc=[.125,.215,.35,.446,.526,.582],si=20,ga=new Fo,Ac=new ze;let _a=null,va=0,xa=0,Sa=!1;const ti=(1+Math.sqrt(5))/2,Pi=1/ti,wc=[new U(-ti,Pi,0),new U(ti,Pi,0),new U(-Pi,0,ti),new U(Pi,0,ti),new U(0,ti,-Pi),new U(0,ti,Pi),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)];class Fc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){_a=this._renderer.getRenderTarget(),va=this._renderer.getActiveCubeFace(),xa=this._renderer.getActiveMipmapLevel(),Sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ic(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Pc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(_a,va,xa),this._renderer.xr.enabled=Sa,e.scissorTest=!1,ir(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ki||e.mapping===Wi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),_a=this._renderer.getRenderTarget(),va=this._renderer.getActiveCubeFace(),xa=this._renderer.getActiveMipmapLevel(),Sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Zt,minFilter:Zt,generateMipmaps:!1,type:Cs,format:Jt,colorSpace:Xn,depthBuffer:!1},s=Rc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Rc(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Mm(r)),this._blurMaterial=ym(r,e,t)}return s}_compileMaterial(e){const t=new xt(this._lodPlanes[0],e);this._renderer.compile(t,ga)}_sceneToCubeUV(e,t,n,s){const o=new Kt(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],c=this._renderer,u=c.autoClear,d=c.toneMapping;c.getClearColor(Ac),c.toneMapping=kn,c.autoClear=!1;const f=new mh({name:"PMREM.Background",side:Rt,depthWrite:!1,depthTest:!1}),g=new xt(new ws,f);let _=!1;const p=e.background;p?p.isColor&&(f.color.copy(p),e.background=null,_=!0):(f.color.copy(Ac),_=!0);for(let m=0;m<6;m++){const M=m%3;M===0?(o.up.set(0,l[m],0),o.lookAt(h[m],0,0)):M===1?(o.up.set(0,0,l[m]),o.lookAt(0,h[m],0)):(o.up.set(0,l[m],0),o.lookAt(0,0,h[m]));const S=this._cubeSize;ir(s,M*S,m>2?S:0,S,S),c.setRenderTarget(s),_&&c.render(g,o),c.render(e,o)}g.geometry.dispose(),g.material.dispose(),c.toneMapping=d,c.autoClear=u,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===ki||e.mapping===Wi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ic()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Pc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new xt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;ir(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,ga)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=wc[(s-r-1)%wc.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,h=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const c=3,u=new xt(this._lodPlanes[s],h),d=h.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*si-1),_=r/g,p=isFinite(r)?1+Math.floor(c*_):si;p>si&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${si}`);const m=[];let M=0;for(let A=0;A<si;++A){const b=A/_,v=Math.exp(-b*b/2);m.push(v),A===0?M+=v:A<p&&(M+=2*v)}for(let A=0;A<m.length;A++)m[A]=m[A]/M;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=m,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:S}=this;d.dTheta.value=g,d.mipInt.value=S-n;const T=this._sizeLods[s],R=3*T*(s>S-Di?s-S+Di:0),C=4*(this._cubeSize-T);ir(t,R,C,3*T,2*T),l.setRenderTarget(t),l.render(u,ga)}}function Mm(i){const e=[],t=[],n=[];let s=i;const r=i-Di+1+bc.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>i-Di?l=bc[a-i+Di-1]:a===0&&(l=0),n.push(l);const h=1/(o-2),c=-h,u=1+h,d=[c,c,u,c,u,u,c,c,u,u,c,u],f=6,g=6,_=3,p=2,m=1,M=new Float32Array(_*g*f),S=new Float32Array(p*g*f),T=new Float32Array(m*g*f);for(let C=0;C<f;C++){const A=C%3*2/3-1,b=C>2?0:-1,v=[A,b,0,A+2/3,b,0,A+2/3,b+1,0,A,b,0,A+2/3,b+1,0,A,b+1,0];M.set(v,_*g*C),S.set(d,p*g*C);const x=[C,C,C,C,C,C];T.set(x,m*g*C)}const R=new Rn;R.setAttribute("position",new en(M,_)),R.setAttribute("uv",new en(S,p)),R.setAttribute("faceIndex",new en(T,m)),e.push(R),s>Di&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Rc(i,e,t){const n=new hi(i,e,t);return n.texture.mapping=Dr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ir(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function ym(i,e,t){const n=new Float32Array(si),s=new U(0,1,0);return new Wn({name:"SphericalGaussianBlur",defines:{n:si,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ro(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Pc(){return new Wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ro(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Ic(){return new Wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ro(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Ro(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Tm(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,h=l===La||l===Va,c=l===ki||l===Wi;if(h||c){let u=e.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new Fc(i)),u=h?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return h&&f&&f.height>0||c&&f&&s(f)?(t===null&&(t=new Fc(i)),u=h?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0;const h=6;for(let c=0;c<h;c++)o[c]!==void 0&&l++;return l===h}function r(o){const l=o.target;l.removeEventListener("dispose",r);const h=e.get(l);h!==void 0&&(e.delete(l),h.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Cm(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&ms("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function bm(i,e,t,n){const s={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let p=0,m=_.length;p<m;p++)e.remove(_[p])}d.removeEventListener("dispose",a),delete s[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)e.update(d[g],i.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const _=f[g];for(let p=0,m=_.length;p<m;p++)e.update(_[p],i.ARRAY_BUFFER)}}function h(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const M=f.array;_=f.version;for(let S=0,T=M.length;S<T;S+=3){const R=M[S+0],C=M[S+1],A=M[S+2];d.push(R,C,C,A,A,R)}}else if(g!==void 0){const M=g.array;_=g.version;for(let S=0,T=M.length/3-1;S<T;S+=3){const R=S+0,C=S+1,A=S+2;d.push(R,C,C,A,A,R)}}else return;const p=new(lh(d)?_h:gh)(d,1);p.version=_;const m=r.get(u);m&&e.remove(m),r.set(u,p)}function c(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&h(u)}else h(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:c}}function Am(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,f){i.drawElements(n,f,r,d*a),t.update(f,n,1)}function h(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*a,g),t.update(f,n,g))}function c(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let p=0;for(let m=0;m<g;m++)p+=f[m];t.update(p,n,1)}function u(d,f,g,_){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<d.length;m++)h(d[m]/a,f[m],_[m]);else{p.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,g);let m=0;for(let M=0;M<g;M++)m+=f[M];for(let M=0;M<_.length;M++)t.update(m,n,_[M])}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=h,this.renderMultiDraw=c,this.renderMultiDrawInstances=u}function wm(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Fm(i,e,t){const n=new WeakMap,s=new dt;function r(a,o,l){const h=a.morphTargetInfluences,c=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=c!==void 0?c.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let v=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",v)};d!==void 0&&d.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let S=0;f===!0&&(S=1),g===!0&&(S=2),_===!0&&(S=3);let T=o.attributes.position.count*S,R=1;T>e.maxTextureSize&&(R=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const C=new Float32Array(T*R*4*u),A=new uh(C,T,R,u);A.type=cn,A.needsUpdate=!0;const b=S*4;for(let x=0;x<u;x++){const F=p[x],N=m[x],I=M[x],G=T*R*4*x;for(let W=0;W<F.count;W++){const B=W*b;f===!0&&(s.fromBufferAttribute(F,W),C[G+B+0]=s.x,C[G+B+1]=s.y,C[G+B+2]=s.z,C[G+B+3]=0),g===!0&&(s.fromBufferAttribute(N,W),C[G+B+4]=s.x,C[G+B+5]=s.y,C[G+B+6]=s.z,C[G+B+7]=0),_===!0&&(s.fromBufferAttribute(I,W),C[G+B+8]=s.x,C[G+B+9]=s.y,C[G+B+10]=s.z,C[G+B+11]=I.itemSize===4?s.w:1)}}d={count:u,texture:A,size:new We(T,R)},n.set(o,d),o.addEventListener("dispose",v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let _=0;_<h.length;_++)f+=h[_];const g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",h)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Rm(i,e,t,n){let s=new WeakMap;function r(l){const h=n.render.frame,c=l.geometry,u=e.get(l,c);if(s.get(u)!==h&&(e.update(u),s.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==h&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,h))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==h&&(d.update(),s.set(d,h))}return u}function a(){s=new WeakMap}function o(l){const h=l.target;h.removeEventListener("dispose",o),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:r,dispose:a}}class Mh extends gt{constructor(e,t,n,s,r,a,o,l,h,c=Oi){if(c!==Oi&&c!==qi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&c===Oi&&(n=li),n===void 0&&c===qi&&(n=Xi),super(null,s,r,a,o,l,c,n,h),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Ft,this.minFilter=l!==void 0?l:Ft,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const yh=new gt,Lc=new Mh(1,1),Th=new uh,Ch=new md,bh=new Sh,Vc=[],Dc=[],Nc=new Float32Array(16),Uc=new Float32Array(9),Oc=new Float32Array(4);function Qi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Vc[s];if(r===void 0&&(r=new Float32Array(s),Vc[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function ft(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function pt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Or(i,e){let t=Dc[e];t===void 0&&(t=new Int32Array(e),Dc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Pm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Im(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;i.uniform2fv(this.addr,e),pt(t,e)}}function Lm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ft(t,e))return;i.uniform3fv(this.addr,e),pt(t,e)}}function Vm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;i.uniform4fv(this.addr,e),pt(t,e)}}function Dm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ft(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,n))return;Oc.set(n),i.uniformMatrix2fv(this.addr,!1,Oc),pt(t,n)}}function Nm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ft(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,n))return;Uc.set(n),i.uniformMatrix3fv(this.addr,!1,Uc),pt(t,n)}}function Um(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ft(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,n))return;Nc.set(n),i.uniformMatrix4fv(this.addr,!1,Nc),pt(t,n)}}function Om(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Bm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;i.uniform2iv(this.addr,e),pt(t,e)}}function zm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ft(t,e))return;i.uniform3iv(this.addr,e),pt(t,e)}}function Gm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;i.uniform4iv(this.addr,e),pt(t,e)}}function Hm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function km(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;i.uniform2uiv(this.addr,e),pt(t,e)}}function Wm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ft(t,e))return;i.uniform3uiv(this.addr,e),pt(t,e)}}function Xm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;i.uniform4uiv(this.addr,e),pt(t,e)}}function qm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Lc.compareFunction=ch,r=Lc):r=yh,t.setTexture2D(e||r,s)}function Ym(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Ch,s)}function $m(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||bh,s)}function Km(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Th,s)}function jm(i){switch(i){case 5126:return Pm;case 35664:return Im;case 35665:return Lm;case 35666:return Vm;case 35674:return Dm;case 35675:return Nm;case 35676:return Um;case 5124:case 35670:return Om;case 35667:case 35671:return Bm;case 35668:case 35672:return zm;case 35669:case 35673:return Gm;case 5125:return Hm;case 36294:return km;case 36295:return Wm;case 36296:return Xm;case 35678:case 36198:case 36298:case 36306:case 35682:return qm;case 35679:case 36299:case 36307:return Ym;case 35680:case 36300:case 36308:case 36293:return $m;case 36289:case 36303:case 36311:case 36292:return Km}}function Zm(i,e){i.uniform1fv(this.addr,e)}function Jm(i,e){const t=Qi(e,this.size,2);i.uniform2fv(this.addr,t)}function Qm(i,e){const t=Qi(e,this.size,3);i.uniform3fv(this.addr,t)}function eg(i,e){const t=Qi(e,this.size,4);i.uniform4fv(this.addr,t)}function tg(i,e){const t=Qi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function ng(i,e){const t=Qi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function ig(i,e){const t=Qi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function sg(i,e){i.uniform1iv(this.addr,e)}function rg(i,e){i.uniform2iv(this.addr,e)}function ag(i,e){i.uniform3iv(this.addr,e)}function og(i,e){i.uniform4iv(this.addr,e)}function cg(i,e){i.uniform1uiv(this.addr,e)}function lg(i,e){i.uniform2uiv(this.addr,e)}function hg(i,e){i.uniform3uiv(this.addr,e)}function ug(i,e){i.uniform4uiv(this.addr,e)}function dg(i,e,t){const n=this.cache,s=e.length,r=Or(t,s);ft(n,r)||(i.uniform1iv(this.addr,r),pt(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||yh,r[a])}function fg(i,e,t){const n=this.cache,s=e.length,r=Or(t,s);ft(n,r)||(i.uniform1iv(this.addr,r),pt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Ch,r[a])}function pg(i,e,t){const n=this.cache,s=e.length,r=Or(t,s);ft(n,r)||(i.uniform1iv(this.addr,r),pt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||bh,r[a])}function mg(i,e,t){const n=this.cache,s=e.length,r=Or(t,s);ft(n,r)||(i.uniform1iv(this.addr,r),pt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Th,r[a])}function gg(i){switch(i){case 5126:return Zm;case 35664:return Jm;case 35665:return Qm;case 35666:return eg;case 35674:return tg;case 35675:return ng;case 35676:return ig;case 5124:case 35670:return sg;case 35667:case 35671:return rg;case 35668:case 35672:return ag;case 35669:case 35673:return og;case 5125:return cg;case 36294:return lg;case 36295:return hg;case 36296:return ug;case 35678:case 36198:case 36298:case 36306:case 35682:return dg;case 35679:case 36299:case 36307:return fg;case 35680:case 36300:case 36308:case 36293:return pg;case 36289:case 36303:case 36311:case 36292:return mg}}class _g{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=jm(t.type)}}class vg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=gg(t.type)}}class xg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Ea=/(\w+)(\])?(\[|\.)?/g;function Bc(i,e){i.seq.push(e),i.map[e.id]=e}function Sg(i,e,t){const n=i.name,s=n.length;for(Ea.lastIndex=0;;){const r=Ea.exec(n),a=Ea.lastIndex;let o=r[1];const l=r[2]==="]",h=r[3];if(l&&(o=o|0),h===void 0||h==="["&&a+2===s){Bc(t,h===void 0?new _g(o,i,e):new vg(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new xg(o),Bc(t,u)),t=u}}}class _r{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);Sg(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function zc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Eg=37297;let Mg=0;function yg(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function Tg(i){const e=Ke.getPrimaries(Ke.workingColorSpace),t=Ke.getPrimaries(i);let n;switch(e===t?n="":e===Cr&&t===Tr?n="LinearDisplayP3ToLinearSRGB":e===Tr&&t===Cr&&(n="LinearSRGBToLinearDisplayP3"),i){case Xn:case Nr:return[n,"LinearTransferOETF"];case Gt:case Ao:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Gc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+yg(i.getShaderSource(e),a)}else return s}function Cg(i,e){const t=Tg(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function bg(i,e){let t;switch(e){case Wu:t="Linear";break;case Xu:t="Reinhard";break;case qu:t="Cineon";break;case jl:t="ACESFilmic";break;case $u:t="AgX";break;case Ku:t="Neutral";break;case Yu:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const sr=new U;function Ag(){Ke.getLuminanceCoefficients(sr);const i=sr.x.toFixed(4),e=sr.y.toFixed(4),t=sr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function wg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fs).join(`
`)}function Fg(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Rg(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function fs(i){return i!==""}function Hc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function kc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Pg=/^[ \t]*#include +<([\w\d./]+)>/gm;function co(i){return i.replace(Pg,Lg)}const Ig=new Map;function Lg(i,e){let t=Ie[e];if(t===void 0){const n=Ig.get(e);if(n!==void 0)t=Ie[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return co(t)}const Vg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Wc(i){return i.replace(Vg,Dg)}function Dg(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Xc(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Ng(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===$l?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===gu?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Sn&&(e="SHADOWMAP_TYPE_VSM"),e}function Ug(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ki:case Wi:e="ENVMAP_TYPE_CUBE";break;case Dr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Og(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Wi:e="ENVMAP_MODE_REFRACTION";break}return e}function Bg(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Kl:e="ENVMAP_BLENDING_MULTIPLY";break;case Hu:e="ENVMAP_BLENDING_MIX";break;case ku:e="ENVMAP_BLENDING_ADD";break}return e}function zg(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Gg(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Ng(t),h=Ug(t),c=Og(t),u=Bg(t),d=zg(t),f=wg(t),g=Fg(r),_=s.createProgram();let p,m,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(fs).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(fs).join(`
`),m.length>0&&(m+=`
`)):(p=[Xc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fs).join(`
`),m=[Xc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==kn?"#define TONE_MAPPING":"",t.toneMapping!==kn?Ie.tonemapping_pars_fragment:"",t.toneMapping!==kn?bg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ie.colorspace_pars_fragment,Cg("linearToOutputTexel",t.outputColorSpace),Ag(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(fs).join(`
`)),a=co(a),a=Hc(a,t),a=kc(a,t),o=co(o),o=Hc(o,t),o=kc(o,t),a=Wc(a),o=Wc(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===ac?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ac?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const S=M+p+a,T=M+m+o,R=zc(s,s.VERTEX_SHADER,S),C=zc(s,s.FRAGMENT_SHADER,T);s.attachShader(_,R),s.attachShader(_,C),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function A(F){if(i.debug.checkShaderErrors){const N=s.getProgramInfoLog(_).trim(),I=s.getShaderInfoLog(R).trim(),G=s.getShaderInfoLog(C).trim();let W=!0,B=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,R,C);else{const j=Gc(s,R,"vertex"),k=Gc(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+N+`
`+j+`
`+k)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(I===""||G==="")&&(B=!1);B&&(F.diagnostics={runnable:W,programLog:N,vertexShader:{log:I,prefix:p},fragmentShader:{log:G,prefix:m}})}s.deleteShader(R),s.deleteShader(C),b=new _r(s,_),v=Rg(s,_)}let b;this.getUniforms=function(){return b===void 0&&A(this),b};let v;this.getAttributes=function(){return v===void 0&&A(this),v};let x=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(_,Eg)),x},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Mg++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=C,this}let Hg=0;class kg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Wg(e),t.set(e,n)),n}}class Wg{constructor(e){this.id=Hg++,this.code=e,this.usedTimes=0}}function Xg(i,e,t,n,s,r,a){const o=new fh,l=new kg,h=new Set,c=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return h.add(v),v===0?"uv":`uv${v}`}function p(v,x,F,N,I){const G=N.fog,W=I.geometry,B=v.isMeshStandardMaterial?N.environment:null,j=(v.isMeshStandardMaterial?t:e).get(v.envMap||B),k=j&&j.mapping===Dr?j.image.height:null,se=g[v.type];v.precision!==null&&(f=s.getMaxPrecision(v.precision),f!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",f,"instead."));const ae=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,de=ae!==void 0?ae.length:0;let Ve=0;W.morphAttributes.position!==void 0&&(Ve=1),W.morphAttributes.normal!==void 0&&(Ve=2),W.morphAttributes.color!==void 0&&(Ve=3);let Ze,X,J,ge;if(se){const Xe=rn[se];Ze=Xe.vertexShader,X=Xe.fragmentShader}else Ze=v.vertexShader,X=v.fragmentShader,l.update(v),J=l.getVertexShaderID(v),ge=l.getFragmentShaderID(v);const he=i.getRenderTarget(),Te=I.isInstancedMesh===!0,Fe=I.isBatchedMesh===!0,Ue=!!v.map,it=!!v.matcap,P=!!j,at=!!v.aoMap,je=!!v.lightMap,Je=!!v.bumpMap,xe=!!v.normalMap,ot=!!v.displacementMap,Ae=!!v.emissiveMap,Re=!!v.metalnessMap,w=!!v.roughnessMap,E=v.anisotropy>0,H=v.clearcoat>0,$=v.dispersion>0,Z=v.iridescence>0,K=v.sheen>0,Ee=v.transmission>0,re=E&&!!v.anisotropyMap,ue=H&&!!v.clearcoatMap,Pe=H&&!!v.clearcoatNormalMap,Q=H&&!!v.clearcoatRoughnessMap,ce=Z&&!!v.iridescenceMap,Ge=Z&&!!v.iridescenceThicknessMap,be=K&&!!v.sheenColorMap,fe=K&&!!v.sheenRoughnessMap,we=!!v.specularMap,De=!!v.specularColorMap,tt=!!v.specularIntensityMap,L=Ee&&!!v.transmissionMap,ee=Ee&&!!v.thicknessMap,q=!!v.gradientMap,Y=!!v.alphaMap,ne=v.alphaTest>0,Me=!!v.alphaHash,He=!!v.extensions;let ct=kn;v.toneMapped&&(he===null||he.isXRRenderTarget===!0)&&(ct=i.toneMapping);const _t={shaderID:se,shaderType:v.type,shaderName:v.name,vertexShader:Ze,fragmentShader:X,defines:v.defines,customVertexShaderID:J,customFragmentShaderID:ge,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:f,batching:Fe,batchingColor:Fe&&I._colorsTexture!==null,instancing:Te,instancingColor:Te&&I.instanceColor!==null,instancingMorph:Te&&I.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:he===null?i.outputColorSpace:he.isXRRenderTarget===!0?he.texture.colorSpace:Xn,alphaToCoverage:!!v.alphaToCoverage,map:Ue,matcap:it,envMap:P,envMapMode:P&&j.mapping,envMapCubeUVHeight:k,aoMap:at,lightMap:je,bumpMap:Je,normalMap:xe,displacementMap:d&&ot,emissiveMap:Ae,normalMapObjectSpace:xe&&v.normalMapType===Qu,normalMapTangentSpace:xe&&v.normalMapType===oh,metalnessMap:Re,roughnessMap:w,anisotropy:E,anisotropyMap:re,clearcoat:H,clearcoatMap:ue,clearcoatNormalMap:Pe,clearcoatRoughnessMap:Q,dispersion:$,iridescence:Z,iridescenceMap:ce,iridescenceThicknessMap:Ge,sheen:K,sheenColorMap:be,sheenRoughnessMap:fe,specularMap:we,specularColorMap:De,specularIntensityMap:tt,transmission:Ee,transmissionMap:L,thicknessMap:ee,gradientMap:q,opaque:v.transparent===!1&&v.blending===Ui&&v.alphaToCoverage===!1,alphaMap:Y,alphaTest:ne,alphaHash:Me,combine:v.combine,mapUv:Ue&&_(v.map.channel),aoMapUv:at&&_(v.aoMap.channel),lightMapUv:je&&_(v.lightMap.channel),bumpMapUv:Je&&_(v.bumpMap.channel),normalMapUv:xe&&_(v.normalMap.channel),displacementMapUv:ot&&_(v.displacementMap.channel),emissiveMapUv:Ae&&_(v.emissiveMap.channel),metalnessMapUv:Re&&_(v.metalnessMap.channel),roughnessMapUv:w&&_(v.roughnessMap.channel),anisotropyMapUv:re&&_(v.anisotropyMap.channel),clearcoatMapUv:ue&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:Pe&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:ce&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:Ge&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:be&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:fe&&_(v.sheenRoughnessMap.channel),specularMapUv:we&&_(v.specularMap.channel),specularColorMapUv:De&&_(v.specularColorMap.channel),specularIntensityMapUv:tt&&_(v.specularIntensityMap.channel),transmissionMapUv:L&&_(v.transmissionMap.channel),thicknessMapUv:ee&&_(v.thicknessMap.channel),alphaMapUv:Y&&_(v.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(xe||E),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!W.attributes.uv&&(Ue||Y),fog:!!G,useFog:v.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:I.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:de,morphTextureStride:Ve,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&F.length>0,shadowMapType:i.shadowMap.type,toneMapping:ct,decodeVideoTexture:Ue&&v.map.isVideoTexture===!0&&Ke.getTransfer(v.map.colorSpace)===et,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===an,flipSided:v.side===Rt,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:He&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(He&&v.extensions.multiDraw===!0||Fe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return _t.vertexUv1s=h.has(1),_t.vertexUv2s=h.has(2),_t.vertexUv3s=h.has(3),h.clear(),_t}function m(v){const x=[];if(v.shaderID?x.push(v.shaderID):(x.push(v.customVertexShaderID),x.push(v.customFragmentShaderID)),v.defines!==void 0)for(const F in v.defines)x.push(F),x.push(v.defines[F]);return v.isRawShaderMaterial===!1&&(M(x,v),S(x,v),x.push(i.outputColorSpace)),x.push(v.customProgramCacheKey),x.join()}function M(v,x){v.push(x.precision),v.push(x.outputColorSpace),v.push(x.envMapMode),v.push(x.envMapCubeUVHeight),v.push(x.mapUv),v.push(x.alphaMapUv),v.push(x.lightMapUv),v.push(x.aoMapUv),v.push(x.bumpMapUv),v.push(x.normalMapUv),v.push(x.displacementMapUv),v.push(x.emissiveMapUv),v.push(x.metalnessMapUv),v.push(x.roughnessMapUv),v.push(x.anisotropyMapUv),v.push(x.clearcoatMapUv),v.push(x.clearcoatNormalMapUv),v.push(x.clearcoatRoughnessMapUv),v.push(x.iridescenceMapUv),v.push(x.iridescenceThicknessMapUv),v.push(x.sheenColorMapUv),v.push(x.sheenRoughnessMapUv),v.push(x.specularMapUv),v.push(x.specularColorMapUv),v.push(x.specularIntensityMapUv),v.push(x.transmissionMapUv),v.push(x.thicknessMapUv),v.push(x.combine),v.push(x.fogExp2),v.push(x.sizeAttenuation),v.push(x.morphTargetsCount),v.push(x.morphAttributeCount),v.push(x.numDirLights),v.push(x.numPointLights),v.push(x.numSpotLights),v.push(x.numSpotLightMaps),v.push(x.numHemiLights),v.push(x.numRectAreaLights),v.push(x.numDirLightShadows),v.push(x.numPointLightShadows),v.push(x.numSpotLightShadows),v.push(x.numSpotLightShadowsWithMaps),v.push(x.numLightProbes),v.push(x.shadowMapType),v.push(x.toneMapping),v.push(x.numClippingPlanes),v.push(x.numClipIntersection),v.push(x.depthPacking)}function S(v,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),v.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.skinning&&o.enable(4),x.morphTargets&&o.enable(5),x.morphNormals&&o.enable(6),x.morphColors&&o.enable(7),x.premultipliedAlpha&&o.enable(8),x.shadowMapEnabled&&o.enable(9),x.doubleSided&&o.enable(10),x.flipSided&&o.enable(11),x.useDepthPacking&&o.enable(12),x.dithering&&o.enable(13),x.transmission&&o.enable(14),x.sheen&&o.enable(15),x.opaque&&o.enable(16),x.pointsUvs&&o.enable(17),x.decodeVideoTexture&&o.enable(18),x.alphaToCoverage&&o.enable(19),v.push(o.mask)}function T(v){const x=g[v.type];let F;if(x){const N=rn[x];F=Ad.clone(N.uniforms)}else F=v.uniforms;return F}function R(v,x){let F;for(let N=0,I=c.length;N<I;N++){const G=c[N];if(G.cacheKey===x){F=G,++F.usedTimes;break}}return F===void 0&&(F=new Gg(i,x,v,r),c.push(F)),F}function C(v){if(--v.usedTimes===0){const x=c.indexOf(v);c[x]=c[c.length-1],c.pop(),v.destroy()}}function A(v){l.remove(v)}function b(){l.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:T,acquireProgram:R,releaseProgram:C,releaseShaderCache:A,programs:c,dispose:b}}function qg(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Yg(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function qc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Yc(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u,d,f,g,_,p){let m=i[e];return m===void 0?(m={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:p},i[e]=m):(m.id=u.id,m.object=u,m.geometry=d,m.material=f,m.groupOrder=g,m.renderOrder=u.renderOrder,m.z=_,m.group=p),e++,m}function o(u,d,f,g,_,p){const m=a(u,d,f,g,_,p);f.transmission>0?n.push(m):f.transparent===!0?s.push(m):t.push(m)}function l(u,d,f,g,_,p){const m=a(u,d,f,g,_,p);f.transmission>0?n.unshift(m):f.transparent===!0?s.unshift(m):t.unshift(m)}function h(u,d){t.length>1&&t.sort(u||Yg),n.length>1&&n.sort(d||qc),s.length>1&&s.sort(d||qc)}function c(){for(let u=e,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:c,sort:h}}function $g(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Yc,i.set(n,[a])):s>=r.length?(a=new Yc,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Kg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new ze};break;case"SpotLight":t={position:new U,direction:new U,color:new ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new ze,groundColor:new ze};break;case"RectAreaLight":t={color:new ze,position:new U,halfWidth:new U,halfHeight:new U};break}return i[e.id]=t,t}}}function jg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Zg=0;function Jg(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Qg(i){const e=new Kg,t=jg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new U);const s=new U,r=new Qe,a=new Qe;function o(h){let c=0,u=0,d=0;for(let v=0;v<9;v++)n.probe[v].set(0,0,0);let f=0,g=0,_=0,p=0,m=0,M=0,S=0,T=0,R=0,C=0,A=0;h.sort(Jg);for(let v=0,x=h.length;v<x;v++){const F=h[v],N=F.color,I=F.intensity,G=F.distance,W=F.shadow&&F.shadow.map?F.shadow.map.texture:null;if(F.isAmbientLight)c+=N.r*I,u+=N.g*I,d+=N.b*I;else if(F.isLightProbe){for(let B=0;B<9;B++)n.probe[B].addScaledVector(F.sh.coefficients[B],I);A++}else if(F.isDirectionalLight){const B=e.get(F);if(B.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){const j=F.shadow,k=t.get(F);k.shadowIntensity=j.intensity,k.shadowBias=j.bias,k.shadowNormalBias=j.normalBias,k.shadowRadius=j.radius,k.shadowMapSize=j.mapSize,n.directionalShadow[f]=k,n.directionalShadowMap[f]=W,n.directionalShadowMatrix[f]=F.shadow.matrix,M++}n.directional[f]=B,f++}else if(F.isSpotLight){const B=e.get(F);B.position.setFromMatrixPosition(F.matrixWorld),B.color.copy(N).multiplyScalar(I),B.distance=G,B.coneCos=Math.cos(F.angle),B.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),B.decay=F.decay,n.spot[_]=B;const j=F.shadow;if(F.map&&(n.spotLightMap[R]=F.map,R++,j.updateMatrices(F),F.castShadow&&C++),n.spotLightMatrix[_]=j.matrix,F.castShadow){const k=t.get(F);k.shadowIntensity=j.intensity,k.shadowBias=j.bias,k.shadowNormalBias=j.normalBias,k.shadowRadius=j.radius,k.shadowMapSize=j.mapSize,n.spotShadow[_]=k,n.spotShadowMap[_]=W,T++}_++}else if(F.isRectAreaLight){const B=e.get(F);B.color.copy(N).multiplyScalar(I),B.halfWidth.set(F.width*.5,0,0),B.halfHeight.set(0,F.height*.5,0),n.rectArea[p]=B,p++}else if(F.isPointLight){const B=e.get(F);if(B.color.copy(F.color).multiplyScalar(F.intensity),B.distance=F.distance,B.decay=F.decay,F.castShadow){const j=F.shadow,k=t.get(F);k.shadowIntensity=j.intensity,k.shadowBias=j.bias,k.shadowNormalBias=j.normalBias,k.shadowRadius=j.radius,k.shadowMapSize=j.mapSize,k.shadowCameraNear=j.camera.near,k.shadowCameraFar=j.camera.far,n.pointShadow[g]=k,n.pointShadowMap[g]=W,n.pointShadowMatrix[g]=F.shadow.matrix,S++}n.point[g]=B,g++}else if(F.isHemisphereLight){const B=e.get(F);B.skyColor.copy(F.color).multiplyScalar(I),B.groundColor.copy(F.groundColor).multiplyScalar(I),n.hemi[m]=B,m++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ie.LTC_FLOAT_1,n.rectAreaLTC2=ie.LTC_FLOAT_2):(n.rectAreaLTC1=ie.LTC_HALF_1,n.rectAreaLTC2=ie.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=u,n.ambient[2]=d;const b=n.hash;(b.directionalLength!==f||b.pointLength!==g||b.spotLength!==_||b.rectAreaLength!==p||b.hemiLength!==m||b.numDirectionalShadows!==M||b.numPointShadows!==S||b.numSpotShadows!==T||b.numSpotMaps!==R||b.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=p,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=T,n.spotShadowMap.length=T,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=T+R-C,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=A,b.directionalLength=f,b.pointLength=g,b.spotLength=_,b.rectAreaLength=p,b.hemiLength=m,b.numDirectionalShadows=M,b.numPointShadows=S,b.numSpotShadows=T,b.numSpotMaps=R,b.numLightProbes=A,n.version=Zg++)}function l(h,c){let u=0,d=0,f=0,g=0,_=0;const p=c.matrixWorldInverse;for(let m=0,M=h.length;m<M;m++){const S=h[m];if(S.isDirectionalLight){const T=n.directional[u];T.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(p),u++}else if(S.isSpotLight){const T=n.spot[f];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(p),T.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(p),f++}else if(S.isRectAreaLight){const T=n.rectArea[g];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(p),a.identity(),r.copy(S.matrixWorld),r.premultiply(p),a.extractRotation(r),T.halfWidth.set(S.width*.5,0,0),T.halfHeight.set(0,S.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),g++}else if(S.isPointLight){const T=n.point[d];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(p),d++}else if(S.isHemisphereLight){const T=n.hemi[_];T.direction.setFromMatrixPosition(S.matrixWorld),T.direction.transformDirection(p),_++}}}return{setup:o,setupView:l,state:n}}function $c(i){const e=new Qg(i),t=[],n=[];function s(c){h.camera=c,t.length=0,n.length=0}function r(c){t.push(c)}function a(c){n.push(c)}function o(){e.setup(t)}function l(c){e.setupView(t,c)}const h={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:h,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function e_(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new $c(i),e.set(s,[o])):r>=a.length?(o=new $c(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}class t_ extends Ji{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Zu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class n_ extends Ji{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const i_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,s_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function r_(i,e,t){let n=new wo;const s=new We,r=new We,a=new dt,o=new t_({depthPacking:Ju}),l=new n_,h={},c=t.maxTextureSize,u={[wn]:Rt,[Rt]:wn,[an]:an},d=new Wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new We},radius:{value:4}},vertexShader:i_,fragmentShader:s_}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Rn;g.setAttribute("position",new en(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new xt(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=$l;let m=this.type;this.render=function(C,A,b){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||C.length===0)return;const v=i.getRenderTarget(),x=i.getActiveCubeFace(),F=i.getActiveMipmapLevel(),N=i.state;N.setBlending(Hn),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const I=m!==Sn&&this.type===Sn,G=m===Sn&&this.type!==Sn;for(let W=0,B=C.length;W<B;W++){const j=C[W],k=j.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);const se=k.getFrameExtents();if(s.multiply(se),r.copy(k.mapSize),(s.x>c||s.y>c)&&(s.x>c&&(r.x=Math.floor(c/se.x),s.x=r.x*se.x,k.mapSize.x=r.x),s.y>c&&(r.y=Math.floor(c/se.y),s.y=r.y*se.y,k.mapSize.y=r.y)),k.map===null||I===!0||G===!0){const de=this.type!==Sn?{minFilter:Ft,magFilter:Ft}:{};k.map!==null&&k.map.dispose(),k.map=new hi(s.x,s.y,de),k.map.texture.name=j.name+".shadowMap",k.camera.updateProjectionMatrix()}i.setRenderTarget(k.map),i.clear();const ae=k.getViewportCount();for(let de=0;de<ae;de++){const Ve=k.getViewport(de);a.set(r.x*Ve.x,r.y*Ve.y,r.x*Ve.z,r.y*Ve.w),N.viewport(a),k.updateMatrices(j,de),n=k.getFrustum(),T(A,b,k.camera,j,this.type)}k.isPointLightShadow!==!0&&this.type===Sn&&M(k,b),k.needsUpdate=!1}m=this.type,p.needsUpdate=!1,i.setRenderTarget(v,x,F)};function M(C,A){const b=e.update(_);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new hi(s.x,s.y)),d.uniforms.shadow_pass.value=C.map.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(A,null,b,d,_,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(A,null,b,f,_,null)}function S(C,A,b,v){let x=null;const F=b.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(F!==void 0)x=F;else if(x=b.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const N=x.uuid,I=A.uuid;let G=h[N];G===void 0&&(G={},h[N]=G);let W=G[I];W===void 0&&(W=x.clone(),G[I]=W,A.addEventListener("dispose",R)),x=W}if(x.visible=A.visible,x.wireframe=A.wireframe,v===Sn?x.side=A.shadowSide!==null?A.shadowSide:A.side:x.side=A.shadowSide!==null?A.shadowSide:u[A.side],x.alphaMap=A.alphaMap,x.alphaTest=A.alphaTest,x.map=A.map,x.clipShadows=A.clipShadows,x.clippingPlanes=A.clippingPlanes,x.clipIntersection=A.clipIntersection,x.displacementMap=A.displacementMap,x.displacementScale=A.displacementScale,x.displacementBias=A.displacementBias,x.wireframeLinewidth=A.wireframeLinewidth,x.linewidth=A.linewidth,b.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const N=i.properties.get(x);N.light=b}return x}function T(C,A,b,v,x){if(C.visible===!1)return;if(C.layers.test(A.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&x===Sn)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,C.matrixWorld);const I=e.update(C),G=C.material;if(Array.isArray(G)){const W=I.groups;for(let B=0,j=W.length;B<j;B++){const k=W[B],se=G[k.materialIndex];if(se&&se.visible){const ae=S(C,se,v,x);C.onBeforeShadow(i,C,A,b,I,ae,k),i.renderBufferDirect(b,null,I,ae,C,k),C.onAfterShadow(i,C,A,b,I,ae,k)}}}else if(G.visible){const W=S(C,G,v,x);C.onBeforeShadow(i,C,A,b,I,W,null),i.renderBufferDirect(b,null,I,W,C,null),C.onAfterShadow(i,C,A,b,I,W,null)}}const N=C.children;for(let I=0,G=N.length;I<G;I++)T(N[I],A,b,v,x)}function R(C){C.target.removeEventListener("dispose",R);for(const b in h){const v=h[b],x=C.target.uuid;x in v&&(v[x].dispose(),delete v[x])}}}function a_(i){function e(){let L=!1;const ee=new dt;let q=null;const Y=new dt(0,0,0,0);return{setMask:function(ne){q!==ne&&!L&&(i.colorMask(ne,ne,ne,ne),q=ne)},setLocked:function(ne){L=ne},setClear:function(ne,Me,He,ct,_t){_t===!0&&(ne*=ct,Me*=ct,He*=ct),ee.set(ne,Me,He,ct),Y.equals(ee)===!1&&(i.clearColor(ne,Me,He,ct),Y.copy(ee))},reset:function(){L=!1,q=null,Y.set(-1,0,0,0)}}}function t(){let L=!1,ee=null,q=null,Y=null;return{setTest:function(ne){ne?ge(i.DEPTH_TEST):he(i.DEPTH_TEST)},setMask:function(ne){ee!==ne&&!L&&(i.depthMask(ne),ee=ne)},setFunc:function(ne){if(q!==ne){switch(ne){case Du:i.depthFunc(i.NEVER);break;case Nu:i.depthFunc(i.ALWAYS);break;case Uu:i.depthFunc(i.LESS);break;case Sr:i.depthFunc(i.LEQUAL);break;case Ou:i.depthFunc(i.EQUAL);break;case Bu:i.depthFunc(i.GEQUAL);break;case zu:i.depthFunc(i.GREATER);break;case Gu:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}q=ne}},setLocked:function(ne){L=ne},setClear:function(ne){Y!==ne&&(i.clearDepth(ne),Y=ne)},reset:function(){L=!1,ee=null,q=null,Y=null}}}function n(){let L=!1,ee=null,q=null,Y=null,ne=null,Me=null,He=null,ct=null,_t=null;return{setTest:function(Xe){L||(Xe?ge(i.STENCIL_TEST):he(i.STENCIL_TEST))},setMask:function(Xe){ee!==Xe&&!L&&(i.stencilMask(Xe),ee=Xe)},setFunc:function(Xe,dn,tn){(q!==Xe||Y!==dn||ne!==tn)&&(i.stencilFunc(Xe,dn,tn),q=Xe,Y=dn,ne=tn)},setOp:function(Xe,dn,tn){(Me!==Xe||He!==dn||ct!==tn)&&(i.stencilOp(Xe,dn,tn),Me=Xe,He=dn,ct=tn)},setLocked:function(Xe){L=Xe},setClear:function(Xe){_t!==Xe&&(i.clearStencil(Xe),_t=Xe)},reset:function(){L=!1,ee=null,q=null,Y=null,ne=null,Me=null,He=null,ct=null,_t=null}}}const s=new e,r=new t,a=new n,o=new WeakMap,l=new WeakMap;let h={},c={},u=new WeakMap,d=[],f=null,g=!1,_=null,p=null,m=null,M=null,S=null,T=null,R=null,C=new ze(0,0,0),A=0,b=!1,v=null,x=null,F=null,N=null,I=null;const G=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,B=0;const j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(j)[1]),W=B>=1):j.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),W=B>=2);let k=null,se={};const ae=i.getParameter(i.SCISSOR_BOX),de=i.getParameter(i.VIEWPORT),Ve=new dt().fromArray(ae),Ze=new dt().fromArray(de);function X(L,ee,q,Y){const ne=new Uint8Array(4),Me=i.createTexture();i.bindTexture(L,Me),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let He=0;He<q;He++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(ee,0,i.RGBA,1,1,Y,0,i.RGBA,i.UNSIGNED_BYTE,ne):i.texImage2D(ee+He,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ne);return Me}const J={};J[i.TEXTURE_2D]=X(i.TEXTURE_2D,i.TEXTURE_2D,1),J[i.TEXTURE_CUBE_MAP]=X(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[i.TEXTURE_2D_ARRAY]=X(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),J[i.TEXTURE_3D]=X(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),a.setClear(0),ge(i.DEPTH_TEST),r.setFunc(Sr),Je(!1),xe(ec),ge(i.CULL_FACE),at(Hn);function ge(L){h[L]!==!0&&(i.enable(L),h[L]=!0)}function he(L){h[L]!==!1&&(i.disable(L),h[L]=!1)}function Te(L,ee){return c[L]!==ee?(i.bindFramebuffer(L,ee),c[L]=ee,L===i.DRAW_FRAMEBUFFER&&(c[i.FRAMEBUFFER]=ee),L===i.FRAMEBUFFER&&(c[i.DRAW_FRAMEBUFFER]=ee),!0):!1}function Fe(L,ee){let q=d,Y=!1;if(L){q=u.get(ee),q===void 0&&(q=[],u.set(ee,q));const ne=L.textures;if(q.length!==ne.length||q[0]!==i.COLOR_ATTACHMENT0){for(let Me=0,He=ne.length;Me<He;Me++)q[Me]=i.COLOR_ATTACHMENT0+Me;q.length=ne.length,Y=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,Y=!0);Y&&i.drawBuffers(q)}function Ue(L){return f!==L?(i.useProgram(L),f=L,!0):!1}const it={[ii]:i.FUNC_ADD,[vu]:i.FUNC_SUBTRACT,[xu]:i.FUNC_REVERSE_SUBTRACT};it[Su]=i.MIN,it[Eu]=i.MAX;const P={[Mu]:i.ZERO,[yu]:i.ONE,[Tu]:i.SRC_COLOR,[Pa]:i.SRC_ALPHA,[Ru]:i.SRC_ALPHA_SATURATE,[wu]:i.DST_COLOR,[bu]:i.DST_ALPHA,[Cu]:i.ONE_MINUS_SRC_COLOR,[Ia]:i.ONE_MINUS_SRC_ALPHA,[Fu]:i.ONE_MINUS_DST_COLOR,[Au]:i.ONE_MINUS_DST_ALPHA,[Pu]:i.CONSTANT_COLOR,[Iu]:i.ONE_MINUS_CONSTANT_COLOR,[Lu]:i.CONSTANT_ALPHA,[Vu]:i.ONE_MINUS_CONSTANT_ALPHA};function at(L,ee,q,Y,ne,Me,He,ct,_t,Xe){if(L===Hn){g===!0&&(he(i.BLEND),g=!1);return}if(g===!1&&(ge(i.BLEND),g=!0),L!==_u){if(L!==_||Xe!==b){if((p!==ii||S!==ii)&&(i.blendEquation(i.FUNC_ADD),p=ii,S=ii),Xe)switch(L){case Ui:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case tc:i.blendFunc(i.ONE,i.ONE);break;case nc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ic:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Ui:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case tc:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case nc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ic:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}m=null,M=null,T=null,R=null,C.set(0,0,0),A=0,_=L,b=Xe}return}ne=ne||ee,Me=Me||q,He=He||Y,(ee!==p||ne!==S)&&(i.blendEquationSeparate(it[ee],it[ne]),p=ee,S=ne),(q!==m||Y!==M||Me!==T||He!==R)&&(i.blendFuncSeparate(P[q],P[Y],P[Me],P[He]),m=q,M=Y,T=Me,R=He),(ct.equals(C)===!1||_t!==A)&&(i.blendColor(ct.r,ct.g,ct.b,_t),C.copy(ct),A=_t),_=L,b=!1}function je(L,ee){L.side===an?he(i.CULL_FACE):ge(i.CULL_FACE);let q=L.side===Rt;ee&&(q=!q),Je(q),L.blending===Ui&&L.transparent===!1?at(Hn):at(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),r.setFunc(L.depthFunc),r.setTest(L.depthTest),r.setMask(L.depthWrite),s.setMask(L.colorWrite);const Y=L.stencilWrite;a.setTest(Y),Y&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Ae(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ge(i.SAMPLE_ALPHA_TO_COVERAGE):he(i.SAMPLE_ALPHA_TO_COVERAGE)}function Je(L){v!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),v=L)}function xe(L){L!==pu?(ge(i.CULL_FACE),L!==x&&(L===ec?i.cullFace(i.BACK):L===mu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):he(i.CULL_FACE),x=L}function ot(L){L!==F&&(W&&i.lineWidth(L),F=L)}function Ae(L,ee,q){L?(ge(i.POLYGON_OFFSET_FILL),(N!==ee||I!==q)&&(i.polygonOffset(ee,q),N=ee,I=q)):he(i.POLYGON_OFFSET_FILL)}function Re(L){L?ge(i.SCISSOR_TEST):he(i.SCISSOR_TEST)}function w(L){L===void 0&&(L=i.TEXTURE0+G-1),k!==L&&(i.activeTexture(L),k=L)}function E(L,ee,q){q===void 0&&(k===null?q=i.TEXTURE0+G-1:q=k);let Y=se[q];Y===void 0&&(Y={type:void 0,texture:void 0},se[q]=Y),(Y.type!==L||Y.texture!==ee)&&(k!==q&&(i.activeTexture(q),k=q),i.bindTexture(L,ee||J[L]),Y.type=L,Y.texture=ee)}function H(){const L=se[k];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function $(){try{i.compressedTexImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Z(){try{i.compressedTexImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function K(){try{i.texSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ee(){try{i.texSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function re(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ue(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Pe(){try{i.texStorage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Q(){try{i.texStorage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ce(){try{i.texImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ge(){try{i.texImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function be(L){Ve.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),Ve.copy(L))}function fe(L){Ze.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),Ze.copy(L))}function we(L,ee){let q=l.get(ee);q===void 0&&(q=new WeakMap,l.set(ee,q));let Y=q.get(L);Y===void 0&&(Y=i.getUniformBlockIndex(ee,L.name),q.set(L,Y))}function De(L,ee){const Y=l.get(ee).get(L);o.get(ee)!==Y&&(i.uniformBlockBinding(ee,Y,L.__bindingPointIndex),o.set(ee,Y))}function tt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},k=null,se={},c={},u=new WeakMap,d=[],f=null,g=!1,_=null,p=null,m=null,M=null,S=null,T=null,R=null,C=new ze(0,0,0),A=0,b=!1,v=null,x=null,F=null,N=null,I=null,Ve.set(0,0,i.canvas.width,i.canvas.height),Ze.set(0,0,i.canvas.width,i.canvas.height),s.reset(),r.reset(),a.reset()}return{buffers:{color:s,depth:r,stencil:a},enable:ge,disable:he,bindFramebuffer:Te,drawBuffers:Fe,useProgram:Ue,setBlending:at,setMaterial:je,setFlipSided:Je,setCullFace:xe,setLineWidth:ot,setPolygonOffset:Ae,setScissorTest:Re,activeTexture:w,bindTexture:E,unbindTexture:H,compressedTexImage2D:$,compressedTexImage3D:Z,texImage2D:ce,texImage3D:Ge,updateUBOMapping:we,uniformBlockBinding:De,texStorage2D:Pe,texStorage3D:Q,texSubImage2D:K,texSubImage3D:Ee,compressedTexSubImage2D:re,compressedTexSubImage3D:ue,scissor:be,viewport:fe,reset:tt}}function Kc(i,e,t,n){const s=o_(n);switch(t){case th:return i*e;case ih:return i*e;case sh:return i*e*2;case yo:return i*e/s.components*s.byteLength;case To:return i*e/s.components*s.byteLength;case rh:return i*e*2/s.components*s.byteLength;case Co:return i*e*2/s.components*s.byteLength;case nh:return i*e*3/s.components*s.byteLength;case Jt:return i*e*4/s.components*s.byteLength;case bo:return i*e*4/s.components*s.byteLength;case dr:case fr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case pr:case mr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Na:case Oa:return Math.max(i,16)*Math.max(e,8)/4;case Da:case Ua:return Math.max(i,8)*Math.max(e,8)/2;case Ba:case za:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ga:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ha:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ka:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Wa:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Xa:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case qa:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Ya:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case $a:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ka:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case ja:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Za:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ja:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Qa:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case eo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case to:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case gr:case no:case io:return Math.ceil(i/4)*Math.ceil(e/4)*16;case ah:case so:return Math.ceil(i/4)*Math.ceil(e/4)*8;case ro:case ao:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function o_(i){switch(i){case Fn:case Jl:return{byteLength:1,components:1};case Ss:case Ql:case Cs:return{byteLength:2,components:1};case Eo:case Mo:return{byteLength:2,components:4};case li:case So:case cn:return{byteLength:4,components:1};case eh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function c_(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new We,c=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,E){return f?new OffscreenCanvas(w,E):Ar("canvas")}function _(w,E,H){let $=1;const Z=Re(w);if((Z.width>H||Z.height>H)&&($=H/Math.max(Z.width,Z.height)),$<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const K=Math.floor($*Z.width),Ee=Math.floor($*Z.height);u===void 0&&(u=g(K,Ee));const re=E?g(K,Ee):u;return re.width=K,re.height=Ee,re.getContext("2d").drawImage(w,0,0,K,Ee),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+K+"x"+Ee+")."),re}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),w;return w}function p(w){return w.generateMipmaps&&w.minFilter!==Ft&&w.minFilter!==Zt}function m(w){i.generateMipmap(w)}function M(w,E,H,$,Z=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let K=E;if(E===i.RED&&(H===i.FLOAT&&(K=i.R32F),H===i.HALF_FLOAT&&(K=i.R16F),H===i.UNSIGNED_BYTE&&(K=i.R8)),E===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&(K=i.R8UI),H===i.UNSIGNED_SHORT&&(K=i.R16UI),H===i.UNSIGNED_INT&&(K=i.R32UI),H===i.BYTE&&(K=i.R8I),H===i.SHORT&&(K=i.R16I),H===i.INT&&(K=i.R32I)),E===i.RG&&(H===i.FLOAT&&(K=i.RG32F),H===i.HALF_FLOAT&&(K=i.RG16F),H===i.UNSIGNED_BYTE&&(K=i.RG8)),E===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&(K=i.RG8UI),H===i.UNSIGNED_SHORT&&(K=i.RG16UI),H===i.UNSIGNED_INT&&(K=i.RG32UI),H===i.BYTE&&(K=i.RG8I),H===i.SHORT&&(K=i.RG16I),H===i.INT&&(K=i.RG32I)),E===i.RGB&&H===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),E===i.RGBA){const Ee=Z?yr:Ke.getTransfer($);H===i.FLOAT&&(K=i.RGBA32F),H===i.HALF_FLOAT&&(K=i.RGBA16F),H===i.UNSIGNED_BYTE&&(K=Ee===et?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function S(w,E){let H;return w?E===null||E===li||E===Xi?H=i.DEPTH24_STENCIL8:E===cn?H=i.DEPTH32F_STENCIL8:E===Ss&&(H=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===li||E===Xi?H=i.DEPTH_COMPONENT24:E===cn?H=i.DEPTH_COMPONENT32F:E===Ss&&(H=i.DEPTH_COMPONENT16),H}function T(w,E){return p(w)===!0||w.isFramebufferTexture&&w.minFilter!==Ft&&w.minFilter!==Zt?Math.log2(Math.max(E.width,E.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?E.mipmaps.length:1}function R(w){const E=w.target;E.removeEventListener("dispose",R),A(E),E.isVideoTexture&&c.delete(E)}function C(w){const E=w.target;E.removeEventListener("dispose",C),v(E)}function A(w){const E=n.get(w);if(E.__webglInit===void 0)return;const H=w.source,$=d.get(H);if($){const Z=$[E.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&b(w),Object.keys($).length===0&&d.delete(H)}n.remove(w)}function b(w){const E=n.get(w);i.deleteTexture(E.__webglTexture);const H=w.source,$=d.get(H);delete $[E.__cacheKey],a.memory.textures--}function v(w){const E=n.get(w);if(w.depthTexture&&w.depthTexture.dispose(),w.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(E.__webglFramebuffer[$]))for(let Z=0;Z<E.__webglFramebuffer[$].length;Z++)i.deleteFramebuffer(E.__webglFramebuffer[$][Z]);else i.deleteFramebuffer(E.__webglFramebuffer[$]);E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer[$])}else{if(Array.isArray(E.__webglFramebuffer))for(let $=0;$<E.__webglFramebuffer.length;$++)i.deleteFramebuffer(E.__webglFramebuffer[$]);else i.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&i.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let $=0;$<E.__webglColorRenderbuffer.length;$++)E.__webglColorRenderbuffer[$]&&i.deleteRenderbuffer(E.__webglColorRenderbuffer[$]);E.__webglDepthRenderbuffer&&i.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const H=w.textures;for(let $=0,Z=H.length;$<Z;$++){const K=n.get(H[$]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),a.memory.textures--),n.remove(H[$])}n.remove(w)}let x=0;function F(){x=0}function N(){const w=x;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),x+=1,w}function I(w){const E=[];return E.push(w.wrapS),E.push(w.wrapT),E.push(w.wrapR||0),E.push(w.magFilter),E.push(w.minFilter),E.push(w.anisotropy),E.push(w.internalFormat),E.push(w.format),E.push(w.type),E.push(w.generateMipmaps),E.push(w.premultiplyAlpha),E.push(w.flipY),E.push(w.unpackAlignment),E.push(w.colorSpace),E.join()}function G(w,E){const H=n.get(w);if(w.isVideoTexture&&ot(w),w.isRenderTargetTexture===!1&&w.version>0&&H.__version!==w.version){const $=w.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ze(H,w,E);return}}t.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+E)}function W(w,E){const H=n.get(w);if(w.version>0&&H.__version!==w.version){Ze(H,w,E);return}t.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+E)}function B(w,E){const H=n.get(w);if(w.version>0&&H.__version!==w.version){Ze(H,w,E);return}t.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+E)}function j(w,E){const H=n.get(w);if(w.version>0&&H.__version!==w.version){X(H,w,E);return}t.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+E)}const k={[Er]:i.REPEAT,[zn]:i.CLAMP_TO_EDGE,[Mr]:i.MIRRORED_REPEAT},se={[Ft]:i.NEAREST,[ju]:i.NEAREST_MIPMAP_NEAREST,[Us]:i.NEAREST_MIPMAP_LINEAR,[Zt]:i.LINEAR,[Kr]:i.LINEAR_MIPMAP_NEAREST,[ri]:i.LINEAR_MIPMAP_LINEAR},ae={[ed]:i.NEVER,[ad]:i.ALWAYS,[td]:i.LESS,[ch]:i.LEQUAL,[nd]:i.EQUAL,[rd]:i.GEQUAL,[id]:i.GREATER,[sd]:i.NOTEQUAL};function de(w,E){if(E.type===cn&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===Zt||E.magFilter===Kr||E.magFilter===Us||E.magFilter===ri||E.minFilter===Zt||E.minFilter===Kr||E.minFilter===Us||E.minFilter===ri)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,k[E.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,k[E.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,k[E.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,se[E.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,se[E.minFilter]),E.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,ae[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Ft||E.minFilter!==Us&&E.minFilter!==ri||E.type===cn&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){const H=e.get("EXT_texture_filter_anisotropic");i.texParameterf(w,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function Ve(w,E){let H=!1;w.__webglInit===void 0&&(w.__webglInit=!0,E.addEventListener("dispose",R));const $=E.source;let Z=d.get($);Z===void 0&&(Z={},d.set($,Z));const K=I(E);if(K!==w.__cacheKey){Z[K]===void 0&&(Z[K]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,H=!0),Z[K].usedTimes++;const Ee=Z[w.__cacheKey];Ee!==void 0&&(Z[w.__cacheKey].usedTimes--,Ee.usedTimes===0&&b(E)),w.__cacheKey=K,w.__webglTexture=Z[K].texture}return H}function Ze(w,E,H){let $=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&($=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&($=i.TEXTURE_3D);const Z=Ve(w,E),K=E.source;t.bindTexture($,w.__webglTexture,i.TEXTURE0+H);const Ee=n.get(K);if(K.version!==Ee.__version||Z===!0){t.activeTexture(i.TEXTURE0+H);const re=Ke.getPrimaries(Ke.workingColorSpace),ue=E.colorSpace===Tn?null:Ke.getPrimaries(E.colorSpace),Pe=E.colorSpace===Tn||re===ue?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe);let Q=_(E.image,!1,s.maxTextureSize);Q=Ae(E,Q);const ce=r.convert(E.format,E.colorSpace),Ge=r.convert(E.type);let be=M(E.internalFormat,ce,Ge,E.colorSpace,E.isVideoTexture);de($,E);let fe;const we=E.mipmaps,De=E.isVideoTexture!==!0,tt=Ee.__version===void 0||Z===!0,L=K.dataReady,ee=T(E,Q);if(E.isDepthTexture)be=S(E.format===qi,E.type),tt&&(De?t.texStorage2D(i.TEXTURE_2D,1,be,Q.width,Q.height):t.texImage2D(i.TEXTURE_2D,0,be,Q.width,Q.height,0,ce,Ge,null));else if(E.isDataTexture)if(we.length>0){De&&tt&&t.texStorage2D(i.TEXTURE_2D,ee,be,we[0].width,we[0].height);for(let q=0,Y=we.length;q<Y;q++)fe=we[q],De?L&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,fe.width,fe.height,ce,Ge,fe.data):t.texImage2D(i.TEXTURE_2D,q,be,fe.width,fe.height,0,ce,Ge,fe.data);E.generateMipmaps=!1}else De?(tt&&t.texStorage2D(i.TEXTURE_2D,ee,be,Q.width,Q.height),L&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Q.width,Q.height,ce,Ge,Q.data)):t.texImage2D(i.TEXTURE_2D,0,be,Q.width,Q.height,0,ce,Ge,Q.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){De&&tt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ee,be,we[0].width,we[0].height,Q.depth);for(let q=0,Y=we.length;q<Y;q++)if(fe=we[q],E.format!==Jt)if(ce!==null)if(De){if(L)if(E.layerUpdates.size>0){const ne=Kc(fe.width,fe.height,E.format,E.type);for(const Me of E.layerUpdates){const He=fe.data.subarray(Me*ne/fe.data.BYTES_PER_ELEMENT,(Me+1)*ne/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,Me,fe.width,fe.height,1,ce,He,0,0)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,fe.width,fe.height,Q.depth,ce,fe.data,0,0)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,be,fe.width,fe.height,Q.depth,0,fe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else De?L&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,fe.width,fe.height,Q.depth,ce,Ge,fe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,q,be,fe.width,fe.height,Q.depth,0,ce,Ge,fe.data)}else{De&&tt&&t.texStorage2D(i.TEXTURE_2D,ee,be,we[0].width,we[0].height);for(let q=0,Y=we.length;q<Y;q++)fe=we[q],E.format!==Jt?ce!==null?De?L&&t.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,fe.width,fe.height,ce,fe.data):t.compressedTexImage2D(i.TEXTURE_2D,q,be,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):De?L&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,fe.width,fe.height,ce,Ge,fe.data):t.texImage2D(i.TEXTURE_2D,q,be,fe.width,fe.height,0,ce,Ge,fe.data)}else if(E.isDataArrayTexture)if(De){if(tt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ee,be,Q.width,Q.height,Q.depth),L)if(E.layerUpdates.size>0){const q=Kc(Q.width,Q.height,E.format,E.type);for(const Y of E.layerUpdates){const ne=Q.data.subarray(Y*q/Q.data.BYTES_PER_ELEMENT,(Y+1)*q/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Y,Q.width,Q.height,1,ce,Ge,ne)}E.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,ce,Ge,Q.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,be,Q.width,Q.height,Q.depth,0,ce,Ge,Q.data);else if(E.isData3DTexture)De?(tt&&t.texStorage3D(i.TEXTURE_3D,ee,be,Q.width,Q.height,Q.depth),L&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,ce,Ge,Q.data)):t.texImage3D(i.TEXTURE_3D,0,be,Q.width,Q.height,Q.depth,0,ce,Ge,Q.data);else if(E.isFramebufferTexture){if(tt)if(De)t.texStorage2D(i.TEXTURE_2D,ee,be,Q.width,Q.height);else{let q=Q.width,Y=Q.height;for(let ne=0;ne<ee;ne++)t.texImage2D(i.TEXTURE_2D,ne,be,q,Y,0,ce,Ge,null),q>>=1,Y>>=1}}else if(we.length>0){if(De&&tt){const q=Re(we[0]);t.texStorage2D(i.TEXTURE_2D,ee,be,q.width,q.height)}for(let q=0,Y=we.length;q<Y;q++)fe=we[q],De?L&&t.texSubImage2D(i.TEXTURE_2D,q,0,0,ce,Ge,fe):t.texImage2D(i.TEXTURE_2D,q,be,ce,Ge,fe);E.generateMipmaps=!1}else if(De){if(tt){const q=Re(Q);t.texStorage2D(i.TEXTURE_2D,ee,be,q.width,q.height)}L&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ce,Ge,Q)}else t.texImage2D(i.TEXTURE_2D,0,be,ce,Ge,Q);p(E)&&m($),Ee.__version=K.version,E.onUpdate&&E.onUpdate(E)}w.__version=E.version}function X(w,E,H){if(E.image.length!==6)return;const $=Ve(w,E),Z=E.source;t.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+H);const K=n.get(Z);if(Z.version!==K.__version||$===!0){t.activeTexture(i.TEXTURE0+H);const Ee=Ke.getPrimaries(Ke.workingColorSpace),re=E.colorSpace===Tn?null:Ke.getPrimaries(E.colorSpace),ue=E.colorSpace===Tn||Ee===re?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);const Pe=E.isCompressedTexture||E.image[0].isCompressedTexture,Q=E.image[0]&&E.image[0].isDataTexture,ce=[];for(let Y=0;Y<6;Y++)!Pe&&!Q?ce[Y]=_(E.image[Y],!0,s.maxCubemapSize):ce[Y]=Q?E.image[Y].image:E.image[Y],ce[Y]=Ae(E,ce[Y]);const Ge=ce[0],be=r.convert(E.format,E.colorSpace),fe=r.convert(E.type),we=M(E.internalFormat,be,fe,E.colorSpace),De=E.isVideoTexture!==!0,tt=K.__version===void 0||$===!0,L=Z.dataReady;let ee=T(E,Ge);de(i.TEXTURE_CUBE_MAP,E);let q;if(Pe){De&&tt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ee,we,Ge.width,Ge.height);for(let Y=0;Y<6;Y++){q=ce[Y].mipmaps;for(let ne=0;ne<q.length;ne++){const Me=q[ne];E.format!==Jt?be!==null?De?L&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ne,0,0,Me.width,Me.height,be,Me.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ne,we,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):De?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ne,0,0,Me.width,Me.height,be,fe,Me.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ne,we,Me.width,Me.height,0,be,fe,Me.data)}}}else{if(q=E.mipmaps,De&&tt){q.length>0&&ee++;const Y=Re(ce[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ee,we,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(Q){De?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,ce[Y].width,ce[Y].height,be,fe,ce[Y].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,we,ce[Y].width,ce[Y].height,0,be,fe,ce[Y].data);for(let ne=0;ne<q.length;ne++){const He=q[ne].image[Y].image;De?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ne+1,0,0,He.width,He.height,be,fe,He.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ne+1,we,He.width,He.height,0,be,fe,He.data)}}else{De?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,be,fe,ce[Y]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,we,be,fe,ce[Y]);for(let ne=0;ne<q.length;ne++){const Me=q[ne];De?L&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ne+1,0,0,be,fe,Me.image[Y]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ne+1,we,be,fe,Me.image[Y])}}}p(E)&&m(i.TEXTURE_CUBE_MAP),K.__version=Z.version,E.onUpdate&&E.onUpdate(E)}w.__version=E.version}function J(w,E,H,$,Z,K){const Ee=r.convert(H.format,H.colorSpace),re=r.convert(H.type),ue=M(H.internalFormat,Ee,re,H.colorSpace);if(!n.get(E).__hasExternalTextures){const Q=Math.max(1,E.width>>K),ce=Math.max(1,E.height>>K);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?t.texImage3D(Z,K,ue,Q,ce,E.depth,0,Ee,re,null):t.texImage2D(Z,K,ue,Q,ce,0,Ee,re,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),xe(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,Z,n.get(H).__webglTexture,0,Je(E)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,$,Z,n.get(H).__webglTexture,K),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ge(w,E,H){if(i.bindRenderbuffer(i.RENDERBUFFER,w),E.depthBuffer){const $=E.depthTexture,Z=$&&$.isDepthTexture?$.type:null,K=S(E.stencilBuffer,Z),Ee=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=Je(E);xe(E)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,re,K,E.width,E.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,re,K,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,K,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ee,i.RENDERBUFFER,w)}else{const $=E.textures;for(let Z=0;Z<$.length;Z++){const K=$[Z],Ee=r.convert(K.format,K.colorSpace),re=r.convert(K.type),ue=M(K.internalFormat,Ee,re,K.colorSpace),Pe=Je(E);H&&xe(E)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Pe,ue,E.width,E.height):xe(E)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Pe,ue,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,ue,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function he(w,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,w),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),G(E.depthTexture,0);const $=n.get(E.depthTexture).__webglTexture,Z=Je(E);if(E.depthTexture.format===Oi)xe(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,$,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,$,0);else if(E.depthTexture.format===qi)xe(E)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,$,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function Te(w){const E=n.get(w),H=w.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==w.depthTexture){const $=w.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),$){const Z=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,$.removeEventListener("dispose",Z)};$.addEventListener("dispose",Z),E.__depthDisposeCallback=Z}E.__boundDepthTexture=$}if(w.depthTexture&&!E.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");he(E.__webglFramebuffer,w)}else if(H){E.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[$]),E.__webglDepthbuffer[$]===void 0)E.__webglDepthbuffer[$]=i.createRenderbuffer(),ge(E.__webglDepthbuffer[$],w,!1);else{const Z=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=E.__webglDepthbuffer[$];i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,K)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=i.createRenderbuffer(),ge(E.__webglDepthbuffer,w,!1);else{const $=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=E.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,Z)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Fe(w,E,H){const $=n.get(w);E!==void 0&&J($.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&Te(w)}function Ue(w){const E=w.texture,H=n.get(w),$=n.get(E);w.addEventListener("dispose",C);const Z=w.textures,K=w.isWebGLCubeRenderTarget===!0,Ee=Z.length>1;if(Ee||($.__webglTexture===void 0&&($.__webglTexture=i.createTexture()),$.__version=E.version,a.memory.textures++),K){H.__webglFramebuffer=[];for(let re=0;re<6;re++)if(E.mipmaps&&E.mipmaps.length>0){H.__webglFramebuffer[re]=[];for(let ue=0;ue<E.mipmaps.length;ue++)H.__webglFramebuffer[re][ue]=i.createFramebuffer()}else H.__webglFramebuffer[re]=i.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){H.__webglFramebuffer=[];for(let re=0;re<E.mipmaps.length;re++)H.__webglFramebuffer[re]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(Ee)for(let re=0,ue=Z.length;re<ue;re++){const Pe=n.get(Z[re]);Pe.__webglTexture===void 0&&(Pe.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&xe(w)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let re=0;re<Z.length;re++){const ue=Z[re];H.__webglColorRenderbuffer[re]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[re]);const Pe=r.convert(ue.format,ue.colorSpace),Q=r.convert(ue.type),ce=M(ue.internalFormat,Pe,Q,ue.colorSpace,w.isXRRenderTarget===!0),Ge=Je(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ge,ce,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.RENDERBUFFER,H.__webglColorRenderbuffer[re])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),ge(H.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),de(i.TEXTURE_CUBE_MAP,E);for(let re=0;re<6;re++)if(E.mipmaps&&E.mipmaps.length>0)for(let ue=0;ue<E.mipmaps.length;ue++)J(H.__webglFramebuffer[re][ue],w,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+re,ue);else J(H.__webglFramebuffer[re],w,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);p(E)&&m(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ee){for(let re=0,ue=Z.length;re<ue;re++){const Pe=Z[re],Q=n.get(Pe);t.bindTexture(i.TEXTURE_2D,Q.__webglTexture),de(i.TEXTURE_2D,Pe),J(H.__webglFramebuffer,w,Pe,i.COLOR_ATTACHMENT0+re,i.TEXTURE_2D,0),p(Pe)&&m(i.TEXTURE_2D)}t.unbindTexture()}else{let re=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(re=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(re,$.__webglTexture),de(re,E),E.mipmaps&&E.mipmaps.length>0)for(let ue=0;ue<E.mipmaps.length;ue++)J(H.__webglFramebuffer[ue],w,E,i.COLOR_ATTACHMENT0,re,ue);else J(H.__webglFramebuffer,w,E,i.COLOR_ATTACHMENT0,re,0);p(E)&&m(re),t.unbindTexture()}w.depthBuffer&&Te(w)}function it(w){const E=w.textures;for(let H=0,$=E.length;H<$;H++){const Z=E[H];if(p(Z)){const K=w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,Ee=n.get(Z).__webglTexture;t.bindTexture(K,Ee),m(K),t.unbindTexture()}}}const P=[],at=[];function je(w){if(w.samples>0){if(xe(w)===!1){const E=w.textures,H=w.width,$=w.height;let Z=i.COLOR_BUFFER_BIT;const K=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ee=n.get(w),re=E.length>1;if(re)for(let ue=0;ue<E.length;ue++)t.bindFramebuffer(i.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ee.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let ue=0;ue<E.length;ue++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),re){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ee.__webglColorRenderbuffer[ue]);const Pe=n.get(E[ue]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Pe,0)}i.blitFramebuffer(0,0,H,$,0,0,H,$,Z,i.NEAREST),l===!0&&(P.length=0,at.length=0,P.push(i.COLOR_ATTACHMENT0+ue),w.depthBuffer&&w.resolveDepthBuffer===!1&&(P.push(K),at.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,at)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,P))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),re)for(let ue=0;ue<E.length;ue++){t.bindFramebuffer(i.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,Ee.__webglColorRenderbuffer[ue]);const Pe=n.get(E[ue]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ee.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.TEXTURE_2D,Pe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const E=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[E])}}}function Je(w){return Math.min(s.maxSamples,w.samples)}function xe(w){const E=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function ot(w){const E=a.render.frame;c.get(w)!==E&&(c.set(w,E),w.update())}function Ae(w,E){const H=w.colorSpace,$=w.format,Z=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||H!==Xn&&H!==Tn&&(Ke.getTransfer(H)===et?($!==Jt||Z!==Fn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),E}function Re(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(h.width=w.naturalWidth||w.width,h.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(h.width=w.displayWidth,h.height=w.displayHeight):(h.width=w.width,h.height=w.height),h}this.allocateTextureUnit=N,this.resetTextureUnits=F,this.setTexture2D=G,this.setTexture2DArray=W,this.setTexture3D=B,this.setTextureCube=j,this.rebindTextures=Fe,this.setupRenderTarget=Ue,this.updateRenderTargetMipmap=it,this.updateMultisampleRenderTarget=je,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=J,this.useMultisampledRTT=xe}function l_(i,e){function t(n,s=Tn){let r;const a=Ke.getTransfer(s);if(n===Fn)return i.UNSIGNED_BYTE;if(n===Eo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Mo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===eh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Jl)return i.BYTE;if(n===Ql)return i.SHORT;if(n===Ss)return i.UNSIGNED_SHORT;if(n===So)return i.INT;if(n===li)return i.UNSIGNED_INT;if(n===cn)return i.FLOAT;if(n===Cs)return i.HALF_FLOAT;if(n===th)return i.ALPHA;if(n===nh)return i.RGB;if(n===Jt)return i.RGBA;if(n===ih)return i.LUMINANCE;if(n===sh)return i.LUMINANCE_ALPHA;if(n===Oi)return i.DEPTH_COMPONENT;if(n===qi)return i.DEPTH_STENCIL;if(n===yo)return i.RED;if(n===To)return i.RED_INTEGER;if(n===rh)return i.RG;if(n===Co)return i.RG_INTEGER;if(n===bo)return i.RGBA_INTEGER;if(n===dr||n===fr||n===pr||n===mr)if(a===et)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===dr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===fr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===pr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===mr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===dr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===fr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===pr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===mr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Da||n===Na||n===Ua||n===Oa)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Da)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Na)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ua)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Oa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ba||n===za||n===Ga)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ba||n===za)return a===et?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ga)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ha||n===ka||n===Wa||n===Xa||n===qa||n===Ya||n===$a||n===Ka||n===ja||n===Za||n===Ja||n===Qa||n===eo||n===to)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ha)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ka)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Wa)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Xa)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===qa)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ya)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===$a)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ka)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ja)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Za)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ja)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Qa)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===eo)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===to)return a===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===gr||n===no||n===io)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===gr)return a===et?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===no)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===io)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ah||n===so||n===ro||n===ao)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===gr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===so)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ro)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ao)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Xi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class h_ extends Kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class ai extends St{constructor(){super(),this.isGroup=!0,this.type="Group"}}const u_={type:"move"};class Ma{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ai,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ai,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ai,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,h=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(h&&e.hand){a=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,n),m=this._getHandJoint(h,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const c=h.joints["index-finger-tip"],u=h.joints["thumb-tip"],d=c.position.distanceTo(u.position),f=.02,g=.005;h.inputState.pinching&&d>f+g?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!h.inputState.pinching&&d<=f-g&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(u_)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),h!==null&&(h.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new ai;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const d_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,f_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class p_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new gt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Wn({vertexShader:d_,fragmentShader:f_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new xt(new Ur(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class m_ extends ji{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,h=null,c=null,u=null,d=null,f=null,g=null;const _=new p_,p=t.getContextAttributes();let m=null,M=null;const S=[],T=[],R=new We;let C=null;const A=new Kt;A.layers.enable(1),A.viewport=new dt;const b=new Kt;b.layers.enable(2),b.viewport=new dt;const v=[A,b],x=new h_;x.layers.enable(1),x.layers.enable(2);let F=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let J=S[X];return J===void 0&&(J=new Ma,S[X]=J),J.getTargetRaySpace()},this.getControllerGrip=function(X){let J=S[X];return J===void 0&&(J=new Ma,S[X]=J),J.getGripSpace()},this.getHand=function(X){let J=S[X];return J===void 0&&(J=new Ma,S[X]=J),J.getHandSpace()};function I(X){const J=T.indexOf(X.inputSource);if(J===-1)return;const ge=S[J];ge!==void 0&&(ge.update(X.inputSource,X.frame,h||a),ge.dispatchEvent({type:X.type,data:X.inputSource}))}function G(){s.removeEventListener("select",I),s.removeEventListener("selectstart",I),s.removeEventListener("selectend",I),s.removeEventListener("squeeze",I),s.removeEventListener("squeezestart",I),s.removeEventListener("squeezeend",I),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",W);for(let X=0;X<S.length;X++){const J=T[X];J!==null&&(T[X]=null,S[X].disconnect(J))}F=null,N=null,_.reset(),e.setRenderTarget(m),f=null,d=null,u=null,s=null,M=null,Ze.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||a},this.setReferenceSpace=function(X){h=X},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",I),s.addEventListener("selectstart",I),s.addEventListener("selectend",I),s.addEventListener("squeeze",I),s.addEventListener("squeezestart",I),s.addEventListener("squeezeend",I),s.addEventListener("end",G),s.addEventListener("inputsourceschange",W),p.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(R),s.renderState.layers===void 0){const J={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,J),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new hi(f.framebufferWidth,f.framebufferHeight,{format:Jt,type:Fn,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let J=null,ge=null,he=null;p.depth&&(he=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,J=p.stencil?qi:Oi,ge=p.stencil?Xi:li);const Te={colorFormat:t.RGBA8,depthFormat:he,scaleFactor:r};u=new XRWebGLBinding(s,t),d=u.createProjectionLayer(Te),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),M=new hi(d.textureWidth,d.textureHeight,{format:Jt,type:Fn,depthTexture:new Mh(d.textureWidth,d.textureHeight,ge,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),h=null,a=await s.requestReferenceSpace(o),Ze.setContext(s),Ze.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function W(X){for(let J=0;J<X.removed.length;J++){const ge=X.removed[J],he=T.indexOf(ge);he>=0&&(T[he]=null,S[he].disconnect(ge))}for(let J=0;J<X.added.length;J++){const ge=X.added[J];let he=T.indexOf(ge);if(he===-1){for(let Fe=0;Fe<S.length;Fe++)if(Fe>=T.length){T.push(ge),he=Fe;break}else if(T[Fe]===null){T[Fe]=ge,he=Fe;break}if(he===-1)break}const Te=S[he];Te&&Te.connect(ge)}}const B=new U,j=new U;function k(X,J,ge){B.setFromMatrixPosition(J.matrixWorld),j.setFromMatrixPosition(ge.matrixWorld);const he=B.distanceTo(j),Te=J.projectionMatrix.elements,Fe=ge.projectionMatrix.elements,Ue=Te[14]/(Te[10]-1),it=Te[14]/(Te[10]+1),P=(Te[9]+1)/Te[5],at=(Te[9]-1)/Te[5],je=(Te[8]-1)/Te[0],Je=(Fe[8]+1)/Fe[0],xe=Ue*je,ot=Ue*Je,Ae=he/(-je+Je),Re=Ae*-je;if(J.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Re),X.translateZ(Ae),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Te[10]===-1)X.projectionMatrix.copy(J.projectionMatrix),X.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const w=Ue+Ae,E=it+Ae,H=xe-Re,$=ot+(he-Re),Z=P*it/E*w,K=at*it/E*w;X.projectionMatrix.makePerspective(H,$,Z,K,w,E),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function se(X,J){J===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(J.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let J=X.near,ge=X.far;_.texture!==null&&(_.depthNear>0&&(J=_.depthNear),_.depthFar>0&&(ge=_.depthFar)),x.near=b.near=A.near=J,x.far=b.far=A.far=ge,(F!==x.near||N!==x.far)&&(s.updateRenderState({depthNear:x.near,depthFar:x.far}),F=x.near,N=x.far);const he=X.parent,Te=x.cameras;se(x,he);for(let Fe=0;Fe<Te.length;Fe++)se(Te[Fe],he);Te.length===2?k(x,A,b):x.projectionMatrix.copy(A.projectionMatrix),ae(X,x,he)};function ae(X,J,ge){ge===null?X.matrix.copy(J.matrixWorld):(X.matrix.copy(ge.matrixWorld),X.matrix.invert(),X.matrix.multiply(J.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(J.projectionMatrix),X.projectionMatrixInverse.copy(J.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=oo*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(X){l=X,d!==null&&(d.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(x)};let de=null;function Ve(X,J){if(c=J.getViewerPose(h||a),g=J,c!==null){const ge=c.views;f!==null&&(e.setRenderTargetFramebuffer(M,f.framebuffer),e.setRenderTarget(M));let he=!1;ge.length!==x.cameras.length&&(x.cameras.length=0,he=!0);for(let Fe=0;Fe<ge.length;Fe++){const Ue=ge[Fe];let it=null;if(f!==null)it=f.getViewport(Ue);else{const at=u.getViewSubImage(d,Ue);it=at.viewport,Fe===0&&(e.setRenderTargetTextures(M,at.colorTexture,d.ignoreDepthValues?void 0:at.depthStencilTexture),e.setRenderTarget(M))}let P=v[Fe];P===void 0&&(P=new Kt,P.layers.enable(Fe),P.viewport=new dt,v[Fe]=P),P.matrix.fromArray(Ue.transform.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale),P.projectionMatrix.fromArray(Ue.projectionMatrix),P.projectionMatrixInverse.copy(P.projectionMatrix).invert(),P.viewport.set(it.x,it.y,it.width,it.height),Fe===0&&(x.matrix.copy(P.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),he===!0&&x.cameras.push(P)}const Te=s.enabledFeatures;if(Te&&Te.includes("depth-sensing")){const Fe=u.getDepthInformation(ge[0]);Fe&&Fe.isValid&&Fe.texture&&_.init(e,Fe,s.renderState)}}for(let ge=0;ge<S.length;ge++){const he=T[ge],Te=S[ge];he!==null&&Te!==void 0&&Te.update(he,J,h||a)}de&&de(X,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),g=null}const Ze=new Eh;Ze.setAnimationLoop(Ve),this.setAnimationLoop=function(X){de=X},this.dispose=function(){}}}const Jn=new ln,g_=new Qe;function __(i,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,vh(i)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,M,S,T){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(p,m):m.isMeshToonMaterial?(r(p,m),u(p,m)):m.isMeshPhongMaterial?(r(p,m),c(p,m)):m.isMeshStandardMaterial?(r(p,m),d(p,m),m.isMeshPhysicalMaterial&&f(p,m,T)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),_(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,M,S):m.isSpriteMaterial?h(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Rt&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Rt&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const M=e.get(m),S=M.envMap,T=M.envMapRotation;S&&(p.envMap.value=S,Jn.copy(T),Jn.x*=-1,Jn.y*=-1,Jn.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Jn.y*=-1,Jn.z*=-1),p.envMapRotation.value.setFromMatrix4(g_.makeRotationFromEuler(Jn)),p.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,M,S){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*M,p.scale.value=S*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,M){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Rt&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=M.texture,p.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){const M=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(M.matrixWorld),p.nearDistance.value=M.shadow.camera.near,p.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function v_(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,S){const T=S.program;n.uniformBlockBinding(M,T)}function h(M,S){let T=s[M.id];T===void 0&&(g(M),T=c(M),s[M.id]=T,M.addEventListener("dispose",p));const R=S.program;n.updateUBOMapping(M,R);const C=e.render.frame;r[M.id]!==C&&(d(M),r[M.id]=C)}function c(M){const S=u();M.__bindingPointIndex=S;const T=i.createBuffer(),R=M.__size,C=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,R,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,T),T}function u(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){const S=s[M.id],T=M.uniforms,R=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let C=0,A=T.length;C<A;C++){const b=Array.isArray(T[C])?T[C]:[T[C]];for(let v=0,x=b.length;v<x;v++){const F=b[v];if(f(F,C,v,R)===!0){const N=F.__offset,I=Array.isArray(F.value)?F.value:[F.value];let G=0;for(let W=0;W<I.length;W++){const B=I[W],j=_(B);typeof B=="number"||typeof B=="boolean"?(F.__data[0]=B,i.bufferSubData(i.UNIFORM_BUFFER,N+G,F.__data)):B.isMatrix3?(F.__data[0]=B.elements[0],F.__data[1]=B.elements[1],F.__data[2]=B.elements[2],F.__data[3]=0,F.__data[4]=B.elements[3],F.__data[5]=B.elements[4],F.__data[6]=B.elements[5],F.__data[7]=0,F.__data[8]=B.elements[6],F.__data[9]=B.elements[7],F.__data[10]=B.elements[8],F.__data[11]=0):(B.toArray(F.__data,G),G+=j.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,N,F.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,S,T,R){const C=M.value,A=S+"_"+T;if(R[A]===void 0)return typeof C=="number"||typeof C=="boolean"?R[A]=C:R[A]=C.clone(),!0;{const b=R[A];if(typeof C=="number"||typeof C=="boolean"){if(b!==C)return R[A]=C,!0}else if(b.equals(C)===!1)return b.copy(C),!0}return!1}function g(M){const S=M.uniforms;let T=0;const R=16;for(let A=0,b=S.length;A<b;A++){const v=Array.isArray(S[A])?S[A]:[S[A]];for(let x=0,F=v.length;x<F;x++){const N=v[x],I=Array.isArray(N.value)?N.value:[N.value];for(let G=0,W=I.length;G<W;G++){const B=I[G],j=_(B),k=T%R,se=k%j.boundary,ae=k+se;T+=se,ae!==0&&R-ae<j.storage&&(T+=R-ae),N.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=T,T+=j.storage}}}const C=T%R;return C>0&&(T+=R-C),M.__size=T,M.__cache={},this}function _(M){const S={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(S.boundary=4,S.storage=4):M.isVector2?(S.boundary=8,S.storage=8):M.isVector3||M.isColor?(S.boundary=16,S.storage=12):M.isVector4?(S.boundary=16,S.storage=16):M.isMatrix3?(S.boundary=48,S.storage=48):M.isMatrix4?(S.boundary=64,S.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),S}function p(M){const S=M.target;S.removeEventListener("dispose",p);const T=a.indexOf(S.__bindingPointIndex);a.splice(T,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function m(){for(const M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:h,dispose:m}}class x_{constructor(e={}){const{canvas:t=cd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:h=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;const f=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const m=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Gt,this.toneMapping=kn,this.toneMappingExposure=1;const S=this;let T=!1,R=0,C=0,A=null,b=-1,v=null;const x=new dt,F=new dt;let N=null;const I=new ze(0);let G=0,W=t.width,B=t.height,j=1,k=null,se=null;const ae=new dt(0,0,W,B),de=new dt(0,0,W,B);let Ve=!1;const Ze=new wo;let X=!1,J=!1;const ge=new Qe,he=new U,Te=new dt,Fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ue=!1;function it(){return A===null?j:1}let P=n;function at(y,V){return t.getContext(y,V)}try{const y={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:h,powerPreference:c,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${xo}`),t.addEventListener("webglcontextlost",q,!1),t.addEventListener("webglcontextrestored",Y,!1),t.addEventListener("webglcontextcreationerror",ne,!1),P===null){const V="webgl2";if(P=at(V,y),P===null)throw at(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let je,Je,xe,ot,Ae,Re,w,E,H,$,Z,K,Ee,re,ue,Pe,Q,ce,Ge,be,fe,we,De,tt;function L(){je=new Cm(P),je.init(),we=new l_(P,je),Je=new xm(P,je,e,we),xe=new a_(P),ot=new wm(P),Ae=new qg,Re=new c_(P,je,xe,Ae,Je,we,ot),w=new Em(S),E=new Tm(S),H=new Vd(P),De=new _m(P,H),$=new bm(P,H,ot,De),Z=new Rm(P,$,H,ot),Ge=new Fm(P,Je,Re),Pe=new Sm(Ae),K=new Xg(S,w,E,je,Je,De,Pe),Ee=new __(S,Ae),re=new $g,ue=new e_(je),ce=new gm(S,w,E,xe,Z,d,l),Q=new r_(S,Z,Je),tt=new v_(P,ot,Je,xe),be=new vm(P,je,ot),fe=new Am(P,je,ot),ot.programs=K.programs,S.capabilities=Je,S.extensions=je,S.properties=Ae,S.renderLists=re,S.shadowMap=Q,S.state=xe,S.info=ot}L();const ee=new m_(S,P);this.xr=ee,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const y=je.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=je.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(y){y!==void 0&&(j=y,this.setSize(W,B,!1))},this.getSize=function(y){return y.set(W,B)},this.setSize=function(y,V,O=!0){if(ee.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=y,B=V,t.width=Math.floor(y*j),t.height=Math.floor(V*j),O===!0&&(t.style.width=y+"px",t.style.height=V+"px"),this.setViewport(0,0,y,V)},this.getDrawingBufferSize=function(y){return y.set(W*j,B*j).floor()},this.setDrawingBufferSize=function(y,V,O){W=y,B=V,j=O,t.width=Math.floor(y*O),t.height=Math.floor(V*O),this.setViewport(0,0,y,V)},this.getCurrentViewport=function(y){return y.copy(x)},this.getViewport=function(y){return y.copy(ae)},this.setViewport=function(y,V,O,z){y.isVector4?ae.set(y.x,y.y,y.z,y.w):ae.set(y,V,O,z),xe.viewport(x.copy(ae).multiplyScalar(j).round())},this.getScissor=function(y){return y.copy(de)},this.setScissor=function(y,V,O,z){y.isVector4?de.set(y.x,y.y,y.z,y.w):de.set(y,V,O,z),xe.scissor(F.copy(de).multiplyScalar(j).round())},this.getScissorTest=function(){return Ve},this.setScissorTest=function(y){xe.setScissorTest(Ve=y)},this.setOpaqueSort=function(y){k=y},this.setTransparentSort=function(y){se=y},this.getClearColor=function(y){return y.copy(ce.getClearColor())},this.setClearColor=function(){ce.setClearColor.apply(ce,arguments)},this.getClearAlpha=function(){return ce.getClearAlpha()},this.setClearAlpha=function(){ce.setClearAlpha.apply(ce,arguments)},this.clear=function(y=!0,V=!0,O=!0){let z=0;if(y){let D=!1;if(A!==null){const te=A.texture.format;D=te===bo||te===Co||te===To}if(D){const te=A.texture.type,oe=te===Fn||te===li||te===Ss||te===Xi||te===Eo||te===Mo,pe=ce.getClearColor(),me=ce.getClearAlpha(),ye=pe.r,Ce=pe.g,_e=pe.b;oe?(f[0]=ye,f[1]=Ce,f[2]=_e,f[3]=me,P.clearBufferuiv(P.COLOR,0,f)):(g[0]=ye,g[1]=Ce,g[2]=_e,g[3]=me,P.clearBufferiv(P.COLOR,0,g))}else z|=P.COLOR_BUFFER_BIT}V&&(z|=P.DEPTH_BUFFER_BIT),O&&(z|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",q,!1),t.removeEventListener("webglcontextrestored",Y,!1),t.removeEventListener("webglcontextcreationerror",ne,!1),re.dispose(),ue.dispose(),Ae.dispose(),w.dispose(),E.dispose(),Z.dispose(),De.dispose(),tt.dispose(),K.dispose(),ee.dispose(),ee.removeEventListener("sessionstart",tn),ee.removeEventListener("sessionend",zo),qn.stop()};function q(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function Y(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const y=ot.autoReset,V=Q.enabled,O=Q.autoUpdate,z=Q.needsUpdate,D=Q.type;L(),ot.autoReset=y,Q.enabled=V,Q.autoUpdate=O,Q.needsUpdate=z,Q.type=D}function ne(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Me(y){const V=y.target;V.removeEventListener("dispose",Me),He(V)}function He(y){ct(y),Ae.remove(y)}function ct(y){const V=Ae.get(y).programs;V!==void 0&&(V.forEach(function(O){K.releaseProgram(O)}),y.isShaderMaterial&&K.releaseShaderCache(y))}this.renderBufferDirect=function(y,V,O,z,D,te){V===null&&(V=Fe);const oe=D.isMesh&&D.matrixWorld.determinant()<0,pe=Yh(y,V,O,z,D);xe.setMaterial(z,oe);let me=O.index,ye=1;if(z.wireframe===!0){if(me=$.getWireframeAttribute(O),me===void 0)return;ye=2}const Ce=O.drawRange,_e=O.attributes.position;let qe=Ce.start*ye,st=(Ce.start+Ce.count)*ye;te!==null&&(qe=Math.max(qe,te.start*ye),st=Math.min(st,(te.start+te.count)*ye)),me!==null?(qe=Math.max(qe,0),st=Math.min(st,me.count)):_e!=null&&(qe=Math.max(qe,0),st=Math.min(st,_e.count));const rt=st-qe;if(rt<0||rt===1/0)return;De.setup(D,z,pe,O,me);let Pt,Ye=be;if(me!==null&&(Pt=H.get(me),Ye=fe,Ye.setIndex(Pt)),D.isMesh)z.wireframe===!0?(xe.setLineWidth(z.wireframeLinewidth*it()),Ye.setMode(P.LINES)):Ye.setMode(P.TRIANGLES);else if(D.isLine){let ve=z.linewidth;ve===void 0&&(ve=1),xe.setLineWidth(ve*it()),D.isLineSegments?Ye.setMode(P.LINES):D.isLineLoop?Ye.setMode(P.LINE_LOOP):Ye.setMode(P.LINE_STRIP)}else D.isPoints?Ye.setMode(P.POINTS):D.isSprite&&Ye.setMode(P.TRIANGLES);if(D.isBatchedMesh)if(D._multiDrawInstances!==null)Ye.renderMultiDrawInstances(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount,D._multiDrawInstances);else if(je.get("WEBGL_multi_draw"))Ye.renderMultiDraw(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount);else{const ve=D._multiDrawStarts,vt=D._multiDrawCounts,$e=D._multiDrawCount,Xt=me?H.get(me).bytesPerElement:1,pi=Ae.get(z).currentProgram.getUniforms();for(let It=0;It<$e;It++)pi.setValue(P,"_gl_DrawID",It),Ye.render(ve[It]/Xt,vt[It])}else if(D.isInstancedMesh)Ye.renderInstances(qe,rt,D.count);else if(O.isInstancedBufferGeometry){const ve=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,vt=Math.min(O.instanceCount,ve);Ye.renderInstances(qe,rt,vt)}else Ye.render(qe,rt)};function _t(y,V,O){y.transparent===!0&&y.side===an&&y.forceSinglePass===!1?(y.side=Rt,y.needsUpdate=!0,Vs(y,V,O),y.side=wn,y.needsUpdate=!0,Vs(y,V,O),y.side=an):Vs(y,V,O)}this.compile=function(y,V,O=null){O===null&&(O=y),p=ue.get(O),p.init(V),M.push(p),O.traverseVisible(function(D){D.isLight&&D.layers.test(V.layers)&&(p.pushLight(D),D.castShadow&&p.pushShadow(D))}),y!==O&&y.traverseVisible(function(D){D.isLight&&D.layers.test(V.layers)&&(p.pushLight(D),D.castShadow&&p.pushShadow(D))}),p.setupLights();const z=new Set;return y.traverse(function(D){const te=D.material;if(te)if(Array.isArray(te))for(let oe=0;oe<te.length;oe++){const pe=te[oe];_t(pe,O,D),z.add(pe)}else _t(te,O,D),z.add(te)}),M.pop(),p=null,z},this.compileAsync=function(y,V,O=null){const z=this.compile(y,V,O);return new Promise(D=>{function te(){if(z.forEach(function(oe){Ae.get(oe).currentProgram.isReady()&&z.delete(oe)}),z.size===0){D(y);return}setTimeout(te,10)}je.get("KHR_parallel_shader_compile")!==null?te():setTimeout(te,10)})};let Xe=null;function dn(y){Xe&&Xe(y)}function tn(){qn.stop()}function zo(){qn.start()}const qn=new Eh;qn.setAnimationLoop(dn),typeof self<"u"&&qn.setContext(self),this.setAnimationLoop=function(y){Xe=y,ee.setAnimationLoop(y),y===null?qn.stop():qn.start()},ee.addEventListener("sessionstart",tn),ee.addEventListener("sessionend",zo),this.render=function(y,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),ee.enabled===!0&&ee.isPresenting===!0&&(ee.cameraAutoUpdate===!0&&ee.updateCamera(V),V=ee.getCamera()),y.isScene===!0&&y.onBeforeRender(S,y,V,A),p=ue.get(y,M.length),p.init(V),M.push(p),ge.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),Ze.setFromProjectionMatrix(ge),J=this.localClippingEnabled,X=Pe.init(this.clippingPlanes,J),_=re.get(y,m.length),_.init(),m.push(_),ee.enabled===!0&&ee.isPresenting===!0){const te=S.xr.getDepthSensingMesh();te!==null&&Hr(te,V,-1/0,S.sortObjects)}Hr(y,V,0,S.sortObjects),_.finish(),S.sortObjects===!0&&_.sort(k,se),Ue=ee.enabled===!1||ee.isPresenting===!1||ee.hasDepthSensing()===!1,Ue&&ce.addToRenderList(_,y),this.info.render.frame++,X===!0&&Pe.beginShadows();const O=p.state.shadowsArray;Q.render(O,y,V),X===!0&&Pe.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=_.opaque,D=_.transmissive;if(p.setupLights(),V.isArrayCamera){const te=V.cameras;if(D.length>0)for(let oe=0,pe=te.length;oe<pe;oe++){const me=te[oe];Ho(z,D,y,me)}Ue&&ce.render(y);for(let oe=0,pe=te.length;oe<pe;oe++){const me=te[oe];Go(_,y,me,me.viewport)}}else D.length>0&&Ho(z,D,y,V),Ue&&ce.render(y),Go(_,y,V);A!==null&&(Re.updateMultisampleRenderTarget(A),Re.updateRenderTargetMipmap(A)),y.isScene===!0&&y.onAfterRender(S,y,V),De.resetDefaultState(),b=-1,v=null,M.pop(),M.length>0?(p=M[M.length-1],X===!0&&Pe.setGlobalState(S.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?_=m[m.length-1]:_=null};function Hr(y,V,O,z){if(y.visible===!1)return;if(y.layers.test(V.layers)){if(y.isGroup)O=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(V);else if(y.isLight)p.pushLight(y),y.castShadow&&p.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||Ze.intersectsSprite(y)){z&&Te.setFromMatrixPosition(y.matrixWorld).applyMatrix4(ge);const oe=Z.update(y),pe=y.material;pe.visible&&_.push(y,oe,pe,O,Te.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||Ze.intersectsObject(y))){const oe=Z.update(y),pe=y.material;if(z&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Te.copy(y.boundingSphere.center)):(oe.boundingSphere===null&&oe.computeBoundingSphere(),Te.copy(oe.boundingSphere.center)),Te.applyMatrix4(y.matrixWorld).applyMatrix4(ge)),Array.isArray(pe)){const me=oe.groups;for(let ye=0,Ce=me.length;ye<Ce;ye++){const _e=me[ye],qe=pe[_e.materialIndex];qe&&qe.visible&&_.push(y,oe,qe,O,Te.z,_e)}}else pe.visible&&_.push(y,oe,pe,O,Te.z,null)}}const te=y.children;for(let oe=0,pe=te.length;oe<pe;oe++)Hr(te[oe],V,O,z)}function Go(y,V,O,z){const D=y.opaque,te=y.transmissive,oe=y.transparent;p.setupLightsView(O),X===!0&&Pe.setGlobalState(S.clippingPlanes,O),z&&xe.viewport(x.copy(z)),D.length>0&&Ls(D,V,O),te.length>0&&Ls(te,V,O),oe.length>0&&Ls(oe,V,O),xe.buffers.depth.setTest(!0),xe.buffers.depth.setMask(!0),xe.buffers.color.setMask(!0),xe.setPolygonOffset(!1)}function Ho(y,V,O,z){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[z.id]===void 0&&(p.state.transmissionRenderTarget[z.id]=new hi(1,1,{generateMipmaps:!0,type:je.has("EXT_color_buffer_half_float")||je.has("EXT_color_buffer_float")?Cs:Fn,minFilter:ri,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ke.workingColorSpace}));const te=p.state.transmissionRenderTarget[z.id],oe=z.viewport||x;te.setSize(oe.z,oe.w);const pe=S.getRenderTarget();S.setRenderTarget(te),S.getClearColor(I),G=S.getClearAlpha(),G<1&&S.setClearColor(16777215,.5),S.clear(),Ue&&ce.render(O);const me=S.toneMapping;S.toneMapping=kn;const ye=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),p.setupLightsView(z),X===!0&&Pe.setGlobalState(S.clippingPlanes,z),Ls(y,O,z),Re.updateMultisampleRenderTarget(te),Re.updateRenderTargetMipmap(te),je.has("WEBGL_multisampled_render_to_texture")===!1){let Ce=!1;for(let _e=0,qe=V.length;_e<qe;_e++){const st=V[_e],rt=st.object,Pt=st.geometry,Ye=st.material,ve=st.group;if(Ye.side===an&&rt.layers.test(z.layers)){const vt=Ye.side;Ye.side=Rt,Ye.needsUpdate=!0,ko(rt,O,z,Pt,Ye,ve),Ye.side=vt,Ye.needsUpdate=!0,Ce=!0}}Ce===!0&&(Re.updateMultisampleRenderTarget(te),Re.updateRenderTargetMipmap(te))}S.setRenderTarget(pe),S.setClearColor(I,G),ye!==void 0&&(z.viewport=ye),S.toneMapping=me}function Ls(y,V,O){const z=V.isScene===!0?V.overrideMaterial:null;for(let D=0,te=y.length;D<te;D++){const oe=y[D],pe=oe.object,me=oe.geometry,ye=z===null?oe.material:z,Ce=oe.group;pe.layers.test(O.layers)&&ko(pe,V,O,me,ye,Ce)}}function ko(y,V,O,z,D,te){y.onBeforeRender(S,V,O,z,D,te),y.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),D.onBeforeRender(S,V,O,z,y,te),D.transparent===!0&&D.side===an&&D.forceSinglePass===!1?(D.side=Rt,D.needsUpdate=!0,S.renderBufferDirect(O,V,z,D,y,te),D.side=wn,D.needsUpdate=!0,S.renderBufferDirect(O,V,z,D,y,te),D.side=an):S.renderBufferDirect(O,V,z,D,y,te),y.onAfterRender(S,V,O,z,D,te)}function Vs(y,V,O){V.isScene!==!0&&(V=Fe);const z=Ae.get(y),D=p.state.lights,te=p.state.shadowsArray,oe=D.state.version,pe=K.getParameters(y,D.state,te,V,O),me=K.getProgramCacheKey(pe);let ye=z.programs;z.environment=y.isMeshStandardMaterial?V.environment:null,z.fog=V.fog,z.envMap=(y.isMeshStandardMaterial?E:w).get(y.envMap||z.environment),z.envMapRotation=z.environment!==null&&y.envMap===null?V.environmentRotation:y.envMapRotation,ye===void 0&&(y.addEventListener("dispose",Me),ye=new Map,z.programs=ye);let Ce=ye.get(me);if(Ce!==void 0){if(z.currentProgram===Ce&&z.lightsStateVersion===oe)return Xo(y,pe),Ce}else pe.uniforms=K.getUniforms(y),y.onBeforeCompile(pe,S),Ce=K.acquireProgram(pe,me),ye.set(me,Ce),z.uniforms=pe.uniforms;const _e=z.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(_e.clippingPlanes=Pe.uniform),Xo(y,pe),z.needsLights=Kh(y),z.lightsStateVersion=oe,z.needsLights&&(_e.ambientLightColor.value=D.state.ambient,_e.lightProbe.value=D.state.probe,_e.directionalLights.value=D.state.directional,_e.directionalLightShadows.value=D.state.directionalShadow,_e.spotLights.value=D.state.spot,_e.spotLightShadows.value=D.state.spotShadow,_e.rectAreaLights.value=D.state.rectArea,_e.ltc_1.value=D.state.rectAreaLTC1,_e.ltc_2.value=D.state.rectAreaLTC2,_e.pointLights.value=D.state.point,_e.pointLightShadows.value=D.state.pointShadow,_e.hemisphereLights.value=D.state.hemi,_e.directionalShadowMap.value=D.state.directionalShadowMap,_e.directionalShadowMatrix.value=D.state.directionalShadowMatrix,_e.spotShadowMap.value=D.state.spotShadowMap,_e.spotLightMatrix.value=D.state.spotLightMatrix,_e.spotLightMap.value=D.state.spotLightMap,_e.pointShadowMap.value=D.state.pointShadowMap,_e.pointShadowMatrix.value=D.state.pointShadowMatrix),z.currentProgram=Ce,z.uniformsList=null,Ce}function Wo(y){if(y.uniformsList===null){const V=y.currentProgram.getUniforms();y.uniformsList=_r.seqWithValue(V.seq,y.uniforms)}return y.uniformsList}function Xo(y,V){const O=Ae.get(y);O.outputColorSpace=V.outputColorSpace,O.batching=V.batching,O.batchingColor=V.batchingColor,O.instancing=V.instancing,O.instancingColor=V.instancingColor,O.instancingMorph=V.instancingMorph,O.skinning=V.skinning,O.morphTargets=V.morphTargets,O.morphNormals=V.morphNormals,O.morphColors=V.morphColors,O.morphTargetsCount=V.morphTargetsCount,O.numClippingPlanes=V.numClippingPlanes,O.numIntersection=V.numClipIntersection,O.vertexAlphas=V.vertexAlphas,O.vertexTangents=V.vertexTangents,O.toneMapping=V.toneMapping}function Yh(y,V,O,z,D){V.isScene!==!0&&(V=Fe),Re.resetTextureUnits();const te=V.fog,oe=z.isMeshStandardMaterial?V.environment:null,pe=A===null?S.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Xn,me=(z.isMeshStandardMaterial?E:w).get(z.envMap||oe),ye=z.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,Ce=!!O.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),_e=!!O.morphAttributes.position,qe=!!O.morphAttributes.normal,st=!!O.morphAttributes.color;let rt=kn;z.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(rt=S.toneMapping);const Pt=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Ye=Pt!==void 0?Pt.length:0,ve=Ae.get(z),vt=p.state.lights;if(X===!0&&(J===!0||y!==v)){const Bt=y===v&&z.id===b;Pe.setState(z,y,Bt)}let $e=!1;z.version===ve.__version?(ve.needsLights&&ve.lightsStateVersion!==vt.state.version||ve.outputColorSpace!==pe||D.isBatchedMesh&&ve.batching===!1||!D.isBatchedMesh&&ve.batching===!0||D.isBatchedMesh&&ve.batchingColor===!0&&D.colorTexture===null||D.isBatchedMesh&&ve.batchingColor===!1&&D.colorTexture!==null||D.isInstancedMesh&&ve.instancing===!1||!D.isInstancedMesh&&ve.instancing===!0||D.isSkinnedMesh&&ve.skinning===!1||!D.isSkinnedMesh&&ve.skinning===!0||D.isInstancedMesh&&ve.instancingColor===!0&&D.instanceColor===null||D.isInstancedMesh&&ve.instancingColor===!1&&D.instanceColor!==null||D.isInstancedMesh&&ve.instancingMorph===!0&&D.morphTexture===null||D.isInstancedMesh&&ve.instancingMorph===!1&&D.morphTexture!==null||ve.envMap!==me||z.fog===!0&&ve.fog!==te||ve.numClippingPlanes!==void 0&&(ve.numClippingPlanes!==Pe.numPlanes||ve.numIntersection!==Pe.numIntersection)||ve.vertexAlphas!==ye||ve.vertexTangents!==Ce||ve.morphTargets!==_e||ve.morphNormals!==qe||ve.morphColors!==st||ve.toneMapping!==rt||ve.morphTargetsCount!==Ye)&&($e=!0):($e=!0,ve.__version=z.version);let Xt=ve.currentProgram;$e===!0&&(Xt=Vs(z,V,D));let pi=!1,It=!1,kr=!1;const lt=Xt.getUniforms(),Pn=ve.uniforms;if(xe.useProgram(Xt.program)&&(pi=!0,It=!0,kr=!0),z.id!==b&&(b=z.id,It=!0),pi||v!==y){lt.setValue(P,"projectionMatrix",y.projectionMatrix),lt.setValue(P,"viewMatrix",y.matrixWorldInverse);const Bt=lt.map.cameraPosition;Bt!==void 0&&Bt.setValue(P,he.setFromMatrixPosition(y.matrixWorld)),Je.logarithmicDepthBuffer&&lt.setValue(P,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&lt.setValue(P,"isOrthographic",y.isOrthographicCamera===!0),v!==y&&(v=y,It=!0,kr=!0)}if(D.isSkinnedMesh){lt.setOptional(P,D,"bindMatrix"),lt.setOptional(P,D,"bindMatrixInverse");const Bt=D.skeleton;Bt&&(Bt.boneTexture===null&&Bt.computeBoneTexture(),lt.setValue(P,"boneTexture",Bt.boneTexture,Re))}D.isBatchedMesh&&(lt.setOptional(P,D,"batchingTexture"),lt.setValue(P,"batchingTexture",D._matricesTexture,Re),lt.setOptional(P,D,"batchingIdTexture"),lt.setValue(P,"batchingIdTexture",D._indirectTexture,Re),lt.setOptional(P,D,"batchingColorTexture"),D._colorsTexture!==null&&lt.setValue(P,"batchingColorTexture",D._colorsTexture,Re));const Wr=O.morphAttributes;if((Wr.position!==void 0||Wr.normal!==void 0||Wr.color!==void 0)&&Ge.update(D,O,Xt),(It||ve.receiveShadow!==D.receiveShadow)&&(ve.receiveShadow=D.receiveShadow,lt.setValue(P,"receiveShadow",D.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(Pn.envMap.value=me,Pn.flipEnvMap.value=me.isCubeTexture&&me.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&V.environment!==null&&(Pn.envMapIntensity.value=V.environmentIntensity),It&&(lt.setValue(P,"toneMappingExposure",S.toneMappingExposure),ve.needsLights&&$h(Pn,kr),te&&z.fog===!0&&Ee.refreshFogUniforms(Pn,te),Ee.refreshMaterialUniforms(Pn,z,j,B,p.state.transmissionRenderTarget[y.id]),_r.upload(P,Wo(ve),Pn,Re)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(_r.upload(P,Wo(ve),Pn,Re),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&lt.setValue(P,"center",D.center),lt.setValue(P,"modelViewMatrix",D.modelViewMatrix),lt.setValue(P,"normalMatrix",D.normalMatrix),lt.setValue(P,"modelMatrix",D.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Bt=z.uniformsGroups;for(let Xr=0,jh=Bt.length;Xr<jh;Xr++){const qo=Bt[Xr];tt.update(qo,Xt),tt.bind(qo,Xt)}}return Xt}function $h(y,V){y.ambientLightColor.needsUpdate=V,y.lightProbe.needsUpdate=V,y.directionalLights.needsUpdate=V,y.directionalLightShadows.needsUpdate=V,y.pointLights.needsUpdate=V,y.pointLightShadows.needsUpdate=V,y.spotLights.needsUpdate=V,y.spotLightShadows.needsUpdate=V,y.rectAreaLights.needsUpdate=V,y.hemisphereLights.needsUpdate=V}function Kh(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(y,V,O){Ae.get(y.texture).__webglTexture=V,Ae.get(y.depthTexture).__webglTexture=O;const z=Ae.get(y);z.__hasExternalTextures=!0,z.__autoAllocateDepthBuffer=O===void 0,z.__autoAllocateDepthBuffer||je.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(y,V){const O=Ae.get(y);O.__webglFramebuffer=V,O.__useDefaultFramebuffer=V===void 0},this.setRenderTarget=function(y,V=0,O=0){A=y,R=V,C=O;let z=!0,D=null,te=!1,oe=!1;if(y){const me=Ae.get(y);if(me.__useDefaultFramebuffer!==void 0)xe.bindFramebuffer(P.FRAMEBUFFER,null),z=!1;else if(me.__webglFramebuffer===void 0)Re.setupRenderTarget(y);else if(me.__hasExternalTextures)Re.rebindTextures(y,Ae.get(y.texture).__webglTexture,Ae.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const _e=y.depthTexture;if(me.__boundDepthTexture!==_e){if(_e!==null&&Ae.has(_e)&&(y.width!==_e.image.width||y.height!==_e.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Re.setupDepthRenderbuffer(y)}}const ye=y.texture;(ye.isData3DTexture||ye.isDataArrayTexture||ye.isCompressedArrayTexture)&&(oe=!0);const Ce=Ae.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Ce[V])?D=Ce[V][O]:D=Ce[V],te=!0):y.samples>0&&Re.useMultisampledRTT(y)===!1?D=Ae.get(y).__webglMultisampledFramebuffer:Array.isArray(Ce)?D=Ce[O]:D=Ce,x.copy(y.viewport),F.copy(y.scissor),N=y.scissorTest}else x.copy(ae).multiplyScalar(j).floor(),F.copy(de).multiplyScalar(j).floor(),N=Ve;if(xe.bindFramebuffer(P.FRAMEBUFFER,D)&&z&&xe.drawBuffers(y,D),xe.viewport(x),xe.scissor(F),xe.setScissorTest(N),te){const me=Ae.get(y.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+V,me.__webglTexture,O)}else if(oe){const me=Ae.get(y.texture),ye=V||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,me.__webglTexture,O||0,ye)}b=-1},this.readRenderTargetPixels=function(y,V,O,z,D,te,oe){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let pe=Ae.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&oe!==void 0&&(pe=pe[oe]),pe){xe.bindFramebuffer(P.FRAMEBUFFER,pe);try{const me=y.texture,ye=me.format,Ce=me.type;if(!Je.textureFormatReadable(ye)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Je.textureTypeReadable(Ce)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=y.width-z&&O>=0&&O<=y.height-D&&P.readPixels(V,O,z,D,we.convert(ye),we.convert(Ce),te)}finally{const me=A!==null?Ae.get(A).__webglFramebuffer:null;xe.bindFramebuffer(P.FRAMEBUFFER,me)}}},this.readRenderTargetPixelsAsync=async function(y,V,O,z,D,te,oe){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let pe=Ae.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&oe!==void 0&&(pe=pe[oe]),pe){xe.bindFramebuffer(P.FRAMEBUFFER,pe);try{const me=y.texture,ye=me.format,Ce=me.type;if(!Je.textureFormatReadable(ye))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Je.textureTypeReadable(Ce))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(V>=0&&V<=y.width-z&&O>=0&&O<=y.height-D){const _e=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,_e),P.bufferData(P.PIXEL_PACK_BUFFER,te.byteLength,P.STREAM_READ),P.readPixels(V,O,z,D,we.convert(ye),we.convert(Ce),0),P.flush();const qe=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);await ld(P,qe,4);try{P.bindBuffer(P.PIXEL_PACK_BUFFER,_e),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,te)}finally{P.deleteBuffer(_e),P.deleteSync(qe)}return te}}finally{const me=A!==null?Ae.get(A).__webglFramebuffer:null;xe.bindFramebuffer(P.FRAMEBUFFER,me)}}},this.copyFramebufferToTexture=function(y,V=null,O=0){y.isTexture!==!0&&(ms("WebGLRenderer: copyFramebufferToTexture function signature has changed."),V=arguments[0]||null,y=arguments[1]);const z=Math.pow(2,-O),D=Math.floor(y.image.width*z),te=Math.floor(y.image.height*z),oe=V!==null?V.x:0,pe=V!==null?V.y:0;Re.setTexture2D(y,0),P.copyTexSubImage2D(P.TEXTURE_2D,O,0,0,oe,pe,D,te),xe.unbindTexture()},this.copyTextureToTexture=function(y,V,O=null,z=null,D=0){y.isTexture!==!0&&(ms("WebGLRenderer: copyTextureToTexture function signature has changed."),z=arguments[0]||null,y=arguments[1],V=arguments[2],D=arguments[3]||0,O=null);let te,oe,pe,me,ye,Ce;O!==null?(te=O.max.x-O.min.x,oe=O.max.y-O.min.y,pe=O.min.x,me=O.min.y):(te=y.image.width,oe=y.image.height,pe=0,me=0),z!==null?(ye=z.x,Ce=z.y):(ye=0,Ce=0);const _e=we.convert(V.format),qe=we.convert(V.type);Re.setTexture2D(V,0),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,V.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,V.unpackAlignment);const st=P.getParameter(P.UNPACK_ROW_LENGTH),rt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Pt=P.getParameter(P.UNPACK_SKIP_PIXELS),Ye=P.getParameter(P.UNPACK_SKIP_ROWS),ve=P.getParameter(P.UNPACK_SKIP_IMAGES),vt=y.isCompressedTexture?y.mipmaps[D]:y.image;P.pixelStorei(P.UNPACK_ROW_LENGTH,vt.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,vt.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,pe),P.pixelStorei(P.UNPACK_SKIP_ROWS,me),y.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,D,ye,Ce,te,oe,_e,qe,vt.data):y.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,D,ye,Ce,vt.width,vt.height,_e,vt.data):P.texSubImage2D(P.TEXTURE_2D,D,ye,Ce,te,oe,_e,qe,vt),P.pixelStorei(P.UNPACK_ROW_LENGTH,st),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,rt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Pt),P.pixelStorei(P.UNPACK_SKIP_ROWS,Ye),P.pixelStorei(P.UNPACK_SKIP_IMAGES,ve),D===0&&V.generateMipmaps&&P.generateMipmap(P.TEXTURE_2D),xe.unbindTexture()},this.copyTextureToTexture3D=function(y,V,O=null,z=null,D=0){y.isTexture!==!0&&(ms("WebGLRenderer: copyTextureToTexture3D function signature has changed."),O=arguments[0]||null,z=arguments[1]||null,y=arguments[2],V=arguments[3],D=arguments[4]||0);let te,oe,pe,me,ye,Ce,_e,qe,st;const rt=y.isCompressedTexture?y.mipmaps[D]:y.image;O!==null?(te=O.max.x-O.min.x,oe=O.max.y-O.min.y,pe=O.max.z-O.min.z,me=O.min.x,ye=O.min.y,Ce=O.min.z):(te=rt.width,oe=rt.height,pe=rt.depth,me=0,ye=0,Ce=0),z!==null?(_e=z.x,qe=z.y,st=z.z):(_e=0,qe=0,st=0);const Pt=we.convert(V.format),Ye=we.convert(V.type);let ve;if(V.isData3DTexture)Re.setTexture3D(V,0),ve=P.TEXTURE_3D;else if(V.isDataArrayTexture||V.isCompressedArrayTexture)Re.setTexture2DArray(V,0),ve=P.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,V.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,V.unpackAlignment);const vt=P.getParameter(P.UNPACK_ROW_LENGTH),$e=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Xt=P.getParameter(P.UNPACK_SKIP_PIXELS),pi=P.getParameter(P.UNPACK_SKIP_ROWS),It=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,rt.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,rt.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,me),P.pixelStorei(P.UNPACK_SKIP_ROWS,ye),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ce),y.isDataTexture||y.isData3DTexture?P.texSubImage3D(ve,D,_e,qe,st,te,oe,pe,Pt,Ye,rt.data):V.isCompressedArrayTexture?P.compressedTexSubImage3D(ve,D,_e,qe,st,te,oe,pe,Pt,rt.data):P.texSubImage3D(ve,D,_e,qe,st,te,oe,pe,Pt,Ye,rt),P.pixelStorei(P.UNPACK_ROW_LENGTH,vt),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,$e),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Xt),P.pixelStorei(P.UNPACK_SKIP_ROWS,pi),P.pixelStorei(P.UNPACK_SKIP_IMAGES,It),D===0&&V.generateMipmaps&&P.generateMipmap(ve),xe.unbindTexture()},this.initRenderTarget=function(y){Ae.get(y).__webglFramebuffer===void 0&&Re.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?Re.setTextureCube(y,0):y.isData3DTexture?Re.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?Re.setTexture2DArray(y,0):Re.setTexture2D(y,0),xe.unbindTexture()},this.resetState=function(){R=0,C=0,A=null,xe.reset(),De.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Ao?"display-p3":"srgb",t.unpackColorSpace=Ke.workingColorSpace===Nr?"display-p3":"srgb"}}class S_ extends St{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ln,this.environmentIntensity=1,this.environmentRotation=new ln,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class E_ extends gt{constructor(e=null,t=1,n=1,s,r,a,o,l,h=Ft,c=Ft,u,d){super(null,a,o,l,h,c,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class jc extends en{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ii=new Qe,Zc=new Qe,rr=[],Jc=new ui,M_=new Qe,os=new xt,cs=new Zi;class Ah extends xt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new jc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,M_)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ui),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ii),Jc.copy(e.boundingBox).applyMatrix4(Ii),this.boundingBox.union(Jc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Zi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ii),cs.copy(e.boundingSphere).applyMatrix4(Ii),this.boundingSphere.union(cs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(os.geometry=this.geometry,os.material=this.material,os.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),cs.copy(this.boundingSphere),cs.applyMatrix4(n),e.ray.intersectsSphere(cs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ii),Zc.multiplyMatrices(n,Ii),os.matrixWorld=Zc,os.raycast(e,rr);for(let a=0,o=rr.length;a<o;a++){const l=rr[a];l.instanceId=r,l.object=this,t.push(l)}rr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new jc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new E_(new Float32Array(s*this.count),s,this.count,yo,cn));const r=this.morphTexture.source.data.data;let a=0;for(let h=0;h<n.length;h++)a+=n[h];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class y_ extends Ji{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ze(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const wr=new U,Fr=new U,Qc=new Qe,ls=new dh,ar=new Zi,ya=new U,el=new U;class T_ extends St{constructor(e=new Rn,t=new y_){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)wr.fromBufferAttribute(t,s-1),Fr.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=wr.distanceTo(Fr);e.setAttribute("lineDistance",new Wt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ar.copy(n.boundingSphere),ar.applyMatrix4(s),ar.radius+=r,e.ray.intersectsSphere(ar)===!1)return;Qc.copy(s).invert(),ls.copy(e.ray).applyMatrix4(Qc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,h=this.isLineSegments?2:1,c=n.index,d=n.attributes.position;if(c!==null){const f=Math.max(0,a.start),g=Math.min(c.count,a.start+a.count);for(let _=f,p=g-1;_<p;_+=h){const m=c.getX(_),M=c.getX(_+1),S=or(this,e,ls,l,m,M);S&&t.push(S)}if(this.isLineLoop){const _=c.getX(g-1),p=c.getX(f),m=or(this,e,ls,l,_,p);m&&t.push(m)}}else{const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let _=f,p=g-1;_<p;_+=h){const m=or(this,e,ls,l,_,_+1);m&&t.push(m)}if(this.isLineLoop){const _=or(this,e,ls,l,g-1,f);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function or(i,e,t,n,s,r){const a=i.geometry.attributes.position;if(wr.fromBufferAttribute(a,s),Fr.fromBufferAttribute(a,r),t.distanceSqToSegment(wr,Fr,ya,el)>n)return;ya.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(ya);if(!(l<e.near||l>e.far))return{distance:l,point:el.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,object:i}}const tl=new U,nl=new U;class C_ extends T_{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)tl.fromBufferAttribute(t,s),nl.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+tl.distanceTo(nl);e.setAttribute("lineDistance",new Wt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class gs extends Ji{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=oh,this.normalScale=new We(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ln,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class wh extends St{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ze(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Ta=new Qe,il=new U,sl=new U;class b_{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new We(512,512),this.map=null,this.mapPass=null,this.matrix=new Qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new wo,this._frameExtents=new We(1,1),this._viewportCount=1,this._viewports=[new dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;il.setFromMatrixPosition(e.matrixWorld),t.position.copy(il),sl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(sl),t.updateMatrixWorld(),Ta.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ta),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ta)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class A_ extends b_{constructor(){super(new Fo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Es extends wh{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.shadow=new A_}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Fh extends wh{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:xo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=xo);const w_="modulepreload",F_=function(i){return"/s/merge/"+i},rl={},R_=function(e,t,n){let s=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),o=a?.nonce||a?.getAttribute("nonce");s=Promise.allSettled(t.map(l=>{if(l=F_(l),l in rl)return;rl[l]=!0;const h=l.endsWith(".css"),c=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${c}`))return;const u=document.createElement("link");if(u.rel=h?"stylesheet":w_,h||(u.as="script"),u.crossOrigin="",u.href=l,o&&u.setAttribute("nonce",o),document.head.appendChild(u),h)return new Promise((d,f)=>{u.addEventListener("load",d),u.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return s.then(a=>{for(const o of a||[])o.status==="rejected"&&r(o.reason);return e().catch(r)})};var An=(i=>(i[i.BILINEAR=0]="BILINEAR",i[i.CATMARK=1]="CATMARK",i[i.LOOP=2]="LOOP",i))(An||{}),Fs=(i=>(i[i.TO_QUADS=0]="TO_QUADS",i[i.TO_TRIS=1]="TO_TRIS",i[i.HYBRID=2]="HYBRID",i))(Fs||{});const P_=[{name:"bilinear",splitType:0,regularFaceSize:4,regularVertexValence:4,localNeighborhood:0},{name:"catmark",splitType:0,regularFaceSize:4,regularVertexValence:4,localNeighborhood:1},{name:"loop",splitType:1,regularFaceSize:3,regularVertexValence:6,localNeighborhood:1}];function hs(i){const e=P_[i];if(e===void 0)throw new Error(`SchemeTypeTraits: unknown scheme ${i}`);return e}const Ms={GetType(i){return i},GetTopologicalSplitType(i){return hs(i).splitType},GetRegularFaceSize(i){return hs(i).regularFaceSize},GetRegularVertexValence(i){return hs(i).regularVertexValence},GetLocalNeighborhoodSize(i){return hs(i).localNeighborhood},GetName(i){return hs(i).name}};var bn=(i=>(i[i.NONE=0]="NONE",i[i.EDGE_ONLY=1]="EDGE_ONLY",i[i.EDGE_AND_CORNER=2]="EDGE_AND_CORNER",i))(bn||{}),Ct=(i=>(i[i.NONE=0]="NONE",i[i.CORNERS_ONLY=1]="CORNERS_ONLY",i[i.CORNERS_PLUS1=2]="CORNERS_PLUS1",i[i.CORNERS_PLUS2=3]="CORNERS_PLUS2",i[i.BOUNDARIES=4]="BOUNDARIES",i[i.ALL=5]="ALL",i))(Ct||{}),lo=(i=>(i[i.UNIFORM=0]="UNIFORM",i[i.CHAIKIN=1]="CHAIKIN",i))(lo||{}),Rr=(i=>(i[i.CATMARK=0]="CATMARK",i[i.SMOOTH=1]="SMOOTH",i))(Rr||{});class Br{_vtxBoundInterp=0;_fvarLinInterp=5;_creasingMethod=0;_triangleSub=0;GetVtxBoundaryInterpolation(){return this._vtxBoundInterp}SetVtxBoundaryInterpolation(e){this._vtxBoundInterp=e}GetFVarLinearInterpolation(){return this._fvarLinInterp}SetFVarLinearInterpolation(e){this._fvarLinInterp=e}GetCreasingMethod(){return this._creasingMethod}SetCreasingMethod(e){this._creasingMethod=e}GetTriangleSubdivision(){return this._triangleSub}SetTriangleSubdivision(e){this._triangleSub=e}}var Ne=(i=>(i[i.UNKNOWN=0]="UNKNOWN",i[i.SMOOTH=1]="SMOOTH",i[i.DART=2]="DART",i[i.CREASE=4]="CREASE",i[i.CORNER=8]="CORNER",i))(Ne||{});const Mn=0,kt=10;function On(i){return i<=Mn}function yn(i){return i>Mn}function oi(i){return i>=kt}function ho(i){return Mn<i&&i<kt}class jt{_options;constructor(e){this._options=e??new Br}IsUniform(){return this._options.GetCreasingMethod()===lo.UNIFORM}SharpenBoundaryEdge(e){return kt}SharpenBoundaryVertex(e){return this._options.GetVtxBoundaryInterpolation()===bn.EDGE_AND_CORNER?kt:e}decrementSharpness(e){return On(e)?Mn:oi(e)?kt:e>1?e-1:Mn}SubdivideUniformSharpness(e){return this.decrementSharpness(e)}SubdivideVertexSharpness(e){return this.decrementSharpness(e)}SubdivideEdgeSharpnessAtVertex(e,t,n){if(this.IsUniform()||t<2)return this.decrementSharpness(e);if(On(e))return Mn;if(oi(e))return kt;let s=0,r=0;for(let a=0;a<t;++a){const o=n[a];ho(o)&&(r++,s+=o)}if(r>1){const a=(s-e)/(r-1);e=.75*e+.25*a}return e-=1,yn(e)?e:Mn}SubdivideEdgeSharpnessesAroundVertex(e,t,n){if(this.IsUniform()||e<2){for(let s=0;s<e;++s)n[s]=this.decrementSharpness(t[s]);return}if(this._options.GetCreasingMethod()===lo.CHAIKIN){let s=0,r=0;for(let a=0;a<e;++a)ho(t[a])&&(r++,s+=t[a]);if(r===0)for(let a=0;a<e;++a)n[a]=t[a];else for(let a=0;a<e;++a){const o=t[a];if(On(o))n[a]=Mn;else if(oi(o))n[a]=kt;else if(r===1)n[a]=this.decrementSharpness(o);else{const l=(s-o)/(r-1);let h=.75*o+.25*l-1;On(h)&&(h=Mn),n[a]=h}}}}DetermineVertexVertexRule(e,t,n){if(yn(e))return 8;let s;if(n===void 0)s=t;else{s=0;for(let r=0;r<t;++r)yn(n[r])&&s++}return s>2?8:1<<s}ComputeFractionalWeightAtVertex(e,t,n,s,r){let a=0,o=0;if(yn(e)&&On(t)&&(a=1,o=e),this.IsUniform()||r===null)for(let h=0;h<n;++h){const c=s[h];yn(c)&&c<=1&&(o+=c,a++)}else for(let h=0;h<n;++h)yn(s[h])&&On(r[h])&&(o+=s[h],a++);if(a===0)return 0;const l=o/a;return l>1?1:l}GetSharpEdgePairOfCrease(e,t,n){for(n[0]=0;On(e[n[0]]);)++n[0];for(n[1]=t-1;On(e[n[1]]);)--n[1]}}class ni{_v=[];_e=[];_f=[];_vCount=0;_eCount=0;_fCount=0;_fForCenters=!1;GetNumVertexWeights(){return this._vCount}GetNumEdgeWeights(){return this._eCount}GetNumFaceWeights(){return this._fCount}SetNumVertexWeights(e){this._vCount=e}SetNumEdgeWeights(e){this._eCount=e}SetNumFaceWeights(e){this._fCount=e}VertexWeight(e){return this._v[e]??0}EdgeWeight(e){return this._e[e]??0}FaceWeight(e){return this._f[e]??0}SetVertexWeight(e,t){this._v[e]=t}SetEdgeWeight(e,t){this._e[e]=t}SetFaceWeight(e,t){this._f[e]=t}AreFaceWeightsForFaceCenters(){return this._fForCenters}SetFaceWeightsForFaceCenters(e){this._fForCenters=e}CombineVertexVertexMasks(e,t,n){n.SetVertexWeight(0,t*n.VertexWeight(0)+e*this.VertexWeight(0));const s=this.GetNumEdgeWeights();if(s)if(n.GetNumEdgeWeights()===0){n.SetNumEdgeWeights(s);for(let a=0;a<s;++a)n.SetEdgeWeight(a,e*this.EdgeWeight(a))}else for(let a=0;a<s;++a)n.SetEdgeWeight(a,t*n.EdgeWeight(a)+e*this.EdgeWeight(a));const r=this.GetNumFaceWeights();if(r)if(n.GetNumFaceWeights()===0){n.SetNumFaceWeights(r),n.SetFaceWeightsForFaceCenters(this.AreFaceWeightsForFaceCenters());for(let a=0;a<r;++a)n.SetFaceWeight(a,e*this.FaceWeight(a))}else for(let a=0;a<r;++a)n.SetFaceWeight(a,t*n.FaceWeight(a)+e*this.FaceWeight(a))}}class I_{_options;constructor(e){this._options=e??new Br}GetOptions(){return this._options}SetOptions(e){this._options=e}assignCreaseMaskForEdge(e,t){t.SetNumVertexWeights(2),t.SetNumEdgeWeights(0),t.SetNumFaceWeights(0),t.SetFaceWeightsForFaceCenters(!1),t.SetVertexWeight(0,.5),t.SetVertexWeight(1,.5)}assignCornerMaskForVertex(e,t){t.SetNumVertexWeights(1),t.SetNumEdgeWeights(0),t.SetNumFaceWeights(0),t.SetFaceWeightsForFaceCenters(!1),t.SetVertexWeight(0,1)}ComputeFaceVertexMask(e,t){const n=e.GetNumVertices();t.SetNumVertexWeights(n),t.SetNumEdgeWeights(0),t.SetNumFaceWeights(0),t.SetFaceWeightsForFaceCenters(!1);const s=1/n;for(let r=0;r<n;++r)t.SetVertexWeight(r,s)}ComputeEdgeVertexMask(e,t,n=Ne.UNKNOWN,s=Ne.UNKNOWN){if(n===Ne.SMOOTH||n===Ne.UNKNOWN&&e.GetSharpness()<=0){this.assignSmoothMaskForEdge(e,t);return}if(s===Ne.CREASE){this.assignCreaseMaskForEdge(e,t);return}if(s===Ne.UNKNOWN){const l=new jt(this._options);let h=!1;if(n===Ne.CREASE)h=!0;else if(e.GetSharpness()>=1)h=!0;else if(l.IsUniform())h=!1;else{const c=[0,0];e.GetChildSharpnesses(l,c),h=c[0]>0&&c[1]>0}if(h){this.assignCreaseMaskForEdge(e,t);return}}this.assignSmoothMaskForEdge(e,t);const r=e.GetSharpness(),a=1-r;t.SetVertexWeight(0,r*.5+a*t.VertexWeight(0)),t.SetVertexWeight(1,r*.5+a*t.VertexWeight(1));const o=t.GetNumFaceWeights();for(let l=0;l<o;++l)t.SetFaceWeight(l,t.FaceWeight(l)*a)}ComputeVertexVertexMask(e,t,n=Ne.UNKNOWN,s=Ne.UNKNOWN){if(n===Ne.SMOOTH||n===Ne.DART){this.assignSmoothMaskForVertex(e,t);return}s===Ne.UNKNOWN&&n!==Ne.UNKNOWN&&(s=n);const r=e.GetNumEdges();let a=null,o=0;if((n===Ne.UNKNOWN||n===Ne.CREASE||n!==s)&&(o=e.GetSharpness(),a=e.GetSharpnessPerEdge(new Array(r).fill(0)),n===Ne.UNKNOWN&&(n=new jt(this._options).DetermineVertexVertexRule(o,r,a))),n===Ne.SMOOTH||n===Ne.DART){this.assignSmoothMaskForVertex(e,t);return}else if(n===Ne.CREASE){const _=[0,0];new jt(this._options).GetSharpEdgePairOfCrease(a,r,_),this.assignCreaseMaskForVertex(e,t,_)}else this.assignCornerMaskForVertex(e,t);if(s===n)return;const h=new jt(this._options),c=e.GetChildSharpnessPerEdge(h,new Array(r).fill(0)),u=e.GetChildSharpness(h);if(s===Ne.UNKNOWN&&(s=h.DetermineVertexVertexRule(u,r,c),s===n))return;const d=new ni;if(s===Ne.SMOOTH||s===Ne.DART)this.assignSmoothMaskForVertex(e,d);else if(s===Ne.CREASE){const _=[0,0];new jt(this._options).GetSharpEdgePairOfCrease(c,r,_),this.assignCreaseMaskForVertex(e,d,_)}else this.assignCornerMaskForVertex(e,d);const f=h.ComputeFractionalWeightAtVertex(o,u,r,a,c),g=1-f;d.CombineVertexVertexMasks(g,f,t)}ComputeVertexLimitMask(e,t,n){if(n===Ne.SMOOTH||n===Ne.DART)this.assignSmoothLimitMask(e,t);else if(n===Ne.CREASE){const s=e.GetSharpnessPerEdge(new Array(e.GetNumEdges()).fill(0)),r=[0,0];new jt(this._options).GetSharpEdgePairOfCrease(s,e.GetNumEdges(),r),this.assignCreaseLimitMask(e,t,r)}else this.assignCornerLimitMask(e,t)}}class L_ extends I_{static GetTopologicalSplitType(){return Fs.TO_QUADS}static GetRegularFaceSize(){return 4}static GetRegularVertexValence(){return 4}static GetLocalNeighborhoodSize(){return 1}static GetType(){return An.CATMARK}assignSmoothMaskForEdge(e,t){const n=e.GetNumFaces();t.SetNumVertexWeights(2),t.SetNumEdgeWeights(0),t.SetNumFaceWeights(n),t.SetFaceWeightsForFaceCenters(!0);let s=!1,r=!1,a=this._options.GetTriangleSubdivision()===Rr.SMOOTH;if(a)if(n===2){const o=[0,0];e.GetNumVerticesPerFace(o),s=o[0]===3,r=o[1]===3,a=s||r}else a=!1;if(a){const c=.5*((s?.47:.25)+(r?.47:.25)),u=.5*(1-2*c);t.SetVertexWeight(0,u),t.SetVertexWeight(1,u),t.SetFaceWeight(0,c),t.SetFaceWeight(1,c)}else if(t.SetVertexWeight(0,.25),t.SetVertexWeight(1,.25),n===2)t.SetFaceWeight(0,.25),t.SetFaceWeight(1,.25);else{const o=.5/n;for(let l=0;l<n;++l)t.SetFaceWeight(l,o)}}assignCreaseMaskForVertex(e,t,n){const s=e.GetNumEdges();t.SetNumVertexWeights(1),t.SetNumEdgeWeights(s),t.SetNumFaceWeights(0),t.SetFaceWeightsForFaceCenters(!1);const r=.75,a=.125;t.SetVertexWeight(0,r);for(let o=0;o<s;++o)t.SetEdgeWeight(o,0);t.SetEdgeWeight(n[0],a),t.SetEdgeWeight(n[1],a)}assignSmoothMaskForVertex(e,t){const n=e.GetNumFaces();t.SetNumVertexWeights(1),t.SetNumEdgeWeights(n),t.SetNumFaceWeights(n),t.SetFaceWeightsForFaceCenters(!0);const s=(n-2)/n,r=1/(n*n),a=r;t.SetVertexWeight(0,s);for(let o=0;o<n;++o)t.SetEdgeWeight(o,a),t.SetFaceWeight(o,r)}assignCornerLimitMask(e,t){t.SetNumVertexWeights(1),t.SetNumEdgeWeights(0),t.SetNumFaceWeights(0),t.SetFaceWeightsForFaceCenters(!1),t.SetVertexWeight(0,1)}assignCreaseLimitMask(e,t,n){const s=e.GetNumEdges();t.SetNumVertexWeights(1),t.SetNumEdgeWeights(s),t.SetNumFaceWeights(0),t.SetFaceWeightsForFaceCenters(!1);const r=2/3,a=1/6;t.SetVertexWeight(0,r);for(let o=0;o<s;++o)t.SetEdgeWeight(o,0);t.SetEdgeWeight(n[0],a),t.SetEdgeWeight(n[1],a)}assignSmoothLimitMask(e,t){const n=e.GetNumFaces();if(n===2){this.assignCornerLimitMask(e,t);return}if(t.SetNumVertexWeights(1),t.SetNumEdgeWeights(n),t.SetNumFaceWeights(n),t.SetFaceWeightsForFaceCenters(!1),n===4){const s=.027777777777777776,r=1/9,a=4/9;t.SetVertexWeight(0,a);for(let o=0;o<4;++o)t.SetEdgeWeight(o,r),t.SetFaceWeight(o,s)}else{const s=n,r=1/(s*(s+5)),a=4*r,o=1-s*(a+r);t.SetVertexWeight(0,o);for(let l=0;l<n;++l)t.SetEdgeWeight(l,a),t.SetFaceWeight(l,r)}}}function V_(i){if(i.creaseIndexPairs&&i.creaseWeights){const e=Array.from(i.creaseIndexPairs),t=Array.from(i.creaseWeights);if(e.length!==t.length*2)throw new Error(`TopologyDescriptor: creaseIndexPairs (${e.length}) must be 2× creaseWeights (${t.length}).`);return{indexPairs:e,weights:t}}if(i.creaseLengths&&i.creaseIndices&&i.creaseSharpnesses){const e=i.creaseLengths,t=i.creaseIndices,n=i.creaseSharpnesses;let s=0;for(let u=0;u<e.length;++u)s+=Math.max(0,e[u]-1);const r=n.length===e.length,a=n.length===s;if(!r&&!a)throw new Error(`TopologyDescriptor: creaseSharpnesses length ${n.length} matches neither per-run (${e.length}) nor per-edge (${s}).`);const o=[],l=[];let h=0,c=0;for(let u=0;u<e.length;++u){const d=e[u];for(let f=0;f<d-1;++f){const g=t[h+f],_=t[h+f+1];o.push(g,_),l.push(r?n[u]:n[c]),c++}h+=d}return{indexPairs:o,weights:l}}return{indexPairs:[],weights:[]}}const sn=-1;function Be(i){return i!==sn}const D_=65535,al=1,ol=2,cl=4,ll=8;class N_{_store;_i;constructor(e,t=0){this._store=e??new Uint8Array(1),this._i=t}get(e){return(this._store[this._i]&e)!==0}set(e,t){const n=this._store[this._i];this._store[this._i]=t?n|e:n&~e}get _mismatch(){return this.get(al)}set _mismatch(e){this.set(al,e)}get _disctsV0(){return this.get(ol)}set _disctsV0(e){this.set(ol,e)}get _disctsV1(){return this.get(cl)}set _disctsV1(e){this.set(cl,e)}get _linear(){return this.get(ll)}set _linear(e){this.set(ll,e)}clear(){this._store[this._i]=0}}const hl=1,ul=2,dl=4,fl=8,pl=16,ml=32,gl=64,_l=128;class Pr{_store;_i;constructor(e,t=0){this._store=e??new Uint8Array(1),this._i=t}get(e){return(this._store[this._i]&e)!==0}set(e,t){const n=this._store[this._i];this._store[this._i]=t?n|e:n&~e}get _mismatch(){return this.get(hl)}set _mismatch(e){this.set(hl,e)}get _xordinary(){return this.get(ul)}set _xordinary(e){this.set(ul,e)}get _nonManifold(){return this.get(dl)}set _nonManifold(e){this.set(dl,e)}get _crease(){return this.get(fl)}set _crease(e){this.set(fl,e)}get _semiSharp(){return this.get(pl)}set _semiSharp(e){this.set(pl,e)}get _depSharp(){return this.get(ml)}set _depSharp(e){this.set(ml,e)}get _infSharpEdges(){return this.get(gl)}set _infSharpEdges(e){this.set(gl,e)}get _infIrregular(){return this.get(_l)}set _infIrregular(e){this.set(_l,e)}clear(){this._store[this._i]=0}clone(){const e=new Pr;return e._store[0]=this._store[this._i],e}isMismatch(){return this._mismatch}isDepSharp(){return this._depSharp}isCrease(){return this._crease}isCorner(){return!this._crease}isSemiSharp(){return this._semiSharp}isInfSharp(){return!this._semiSharp&&!this._crease}hasCreaseEnds(){return this._crease||this._semiSharp}combineWithLevelVTag(e){return this._mismatch&&(this.isCorner()?e._rule=Ne.CORNER:e._rule=Ne.CREASE,this.isCrease()||this.isSemiSharp()?(e._infSharp=!1,e._infSharpCrease=!0,e._corner=!1):(e._infSharp=!0,e._infSharpCrease=!1,e._corner=!this._infIrregular&&!this._infSharpEdges),e._infSharpEdges=!0,e._infIrregular=this._infIrregular,e._boundary=!0,e._xordinary=this._xordinary,e._nonManifold=e._nonManifold||this._nonManifold),e}}class Rh{_startFace=0;_endFace=0}class U_{_size=0;_start=0;_disctsEdgeCount=0;_semiSharpEdgeCount=0;_infSharpEdgeCount=0}class Ph{_level;_options=new Br;_isLinear=!1;_hasLinearBoundaries=!1;_hasDependentSharpness=!1;_valueCount=0;_faceVertValues=new Int32Array(0);_edgeTags=new Uint8Array(0);_vertSiblingCounts=new Int32Array(0);_vertSiblingOffsets=new Int32Array(0);_vertFaceSiblings=new Int32Array(0);_vertValueIndices=new Int32Array(0);_vertValueTags=new Uint8Array(0);_vertValueCreaseEnds=[];constructor(e){this._level=e}getNumValues(){return this._valueCount}isLinear(){return this._isLinear}hasLinearBoundaries(){return this._hasLinearBoundaries}hasSmoothBoundaries(){return!this._hasLinearBoundaries}hasCreaseEnds(){return this.hasSmoothBoundaries()}getOptions(){return this._options}getFaceValues(e){const t=this._level.getOffsetOfFaceVertices(e),n=this._level.getNumFaceVertices(e);return this._faceVertValues.subarray(t,t+n)}getAllFaceValues(){return this._faceVertValues}getNumFaceValuesTotal(){return this._faceVertValues.length}getVertexFaceSiblings(e){const t=this._level.getOffsetOfVertexFaces(e),n=this._level.getNumVertexFaces(e);return this._vertFaceSiblings.subarray(t,t+n)}getNumVertexValues(e){return this._vertSiblingCounts[e]}getVertexValueOffset(e,t=0){return this._vertSiblingOffsets[e]+t}getVertexValue(e,t=0){return this._vertValueIndices[this.getVertexValueOffset(e,t)]}getVertexValues(e){const t=this.getVertexValueOffset(e),n=this.getNumVertexValues(e);return this._vertValueIndices.subarray(t,t+n)}getVertexValueTags(e){const t=this.getVertexValueOffset(e),n=this.getNumVertexValues(e),s=new Array(n);for(let r=0;r<n;++r)s[r]=new Pr(this._vertValueTags,t+r);return s}getVertexValueCreaseEnds(e){const t=this.getVertexValueOffset(e),n=this.getNumVertexValues(e);return this._vertValueCreaseEnds.slice(t,t+n)}getValueTag(e){return new Pr(this._vertValueTags,e)}valueTopologyMatches(e){return!this.getValueTag(e)._mismatch}getEdgeTag(e){return new N_(this._edgeTags,e)}edgeTopologyMatches(e){return!this.getEdgeTag(e)._mismatch}getVertexCreaseEndValues(e,t){const n=this.getVertexValueCreaseEnds(e),s=this._level.getVertexFaces(e),r=this._level.getVertexFaceLocalIndices(e),a=n[t]._startFace,o=n[t]._endFace,l=this.getFaceValues(s[a]),h=this.getFaceValues(s[o]);let c=r[a],u=r[o];return c=c===l.length-1?0:c+1,u=(u||h.length)-1,[l[c],h[u]]}getEdgeFaceValues(e,t){const n=this._level,s=n.getEdgeVertices(e);if(this.getNumVertexValues(s[0])+this.getNumVertexValues(s[1])>2){const r=n.getEdgeFaces(e)[t],a=n.getEdgeFaceLocalIndices(e)[t],o=this.getFaceValues(r),l=[o[a],o[a+1<o.length?a+1:0]];if(s[0]!==n.getFaceVertices(r)[a]){const h=l[0];l[0]=l[1],l[1]=h}return l}return n.getDepth()>0?[this.getVertexValueOffset(s[0]),this.getVertexValueOffset(s[1])]:[this.getVertexValue(s[0]),this.getVertexValue(s[1])]}getVertexEdgeValues(e){const t=this._level,n=t.getVertexEdges(e),s=t.getVertexEdgeLocalIndices(e),r=t.getVertexFaces(e),a=t.getVertexFaceLocalIndices(e),o=t.getVertexTag(e)._boundary,l=!t.getVertexTag(e)._nonManifold,h=t.getDepth()===0,c=new Array(n.length);for(let u=0;u<n.length;++u){const d=n[u],g=t.getEdgeVertices(d)[s[u]?0:1];if(this.getNumVertexValues(g)===1)c[u]=h?this.getVertexValue(g):this.getVertexValueOffset(g);else if(l)if(o&&u===n.length-1){const _=this.getFaceValues(r[u-1]),p=a[u-1]?a[u-1]-1:_.length-1;c[u]=_[p]}else{const _=this.getFaceValues(r[u]),p=a[u]===_.length-1?0:a[u]+1;c[u]=_[p]}else{const _=t.getEdgeFaces(d)[0],p=t.getEdgeFaceLocalIndices(d)[0],m=t.getFaceVertices(_),M=this.getFaceValues(_);c[u]=g===m[p]?M[p]:M[p===M.length-1?0:p+1]}}return c}initializeFaceValuesFromFaceVertices(){this._faceVertValues.set(this._level.getAllFaceVertices())}initializeFaceValuesFromVertexFaceSiblings(){const e=this._level,t=e.getAllFaceVertices();for(let n=0;n<t.length;++n)this._faceVertValues[n]=this.getVertexValueOffset(t[n]);for(let n=0;n<e.getNumVertices();++n)if(this.getNumVertexValues(n)>1){const s=e.getVertexFaces(n),r=e.getVertexFaceLocalIndices(n),a=this.getVertexFaceSiblings(n);for(let o=0;o<s.length;++o)if(a[o]){const h=e.getOffsetOfFaceVertices(s[o])+r[o];this._faceVertValues[h]=this._faceVertValues[h]+a[o]}}}setOptions(e){this._options=e}resizeValues(e){this._valueCount=e}resizeComponents(){this._faceVertValues=new Int32Array(this._level.getNumFaceVerticesTotal()),this._edgeTags=new Uint8Array(this._level.getNumEdges()),this._vertSiblingCounts=new Int32Array(this._level.getNumVertices()),this._vertSiblingOffsets=new Int32Array(this._level.getNumVertices()),this._vertFaceSiblings=new Int32Array(this._level.getNumVertexFacesTotal())}resizeVertexValues(e){this._vertValueIndices=new Int32Array(e),this._vertValueTags=new Uint8Array(e),this.hasCreaseEnds()&&(this._vertValueCreaseEnds=Array.from({length:e},()=>new Rh))}completeTopologyFromFaceValues(e){const t=this._level,n=this._options.GetVtxBoundaryInterpolation(),s=this._options.GetFVarLinearInterpolation();this._isLinear=s===Ct.ALL,this._hasLinearBoundaries=s===Ct.ALL||s===Ct.BOUNDARIES,this._hasDependentSharpness=s===Ct.CORNERS_PLUS1||s===Ct.CORNERS_PLUS2;const r=n!==bn.EDGE_AND_CORNER,a=s!==Ct.NONE,o=r&&a,l=s===Ct.CORNERS_PLUS2,h=l||this._hasLinearBoundaries,c=t.getNumVertices(),u=new Uint8Array(c);this._vertFaceSiblings=new Int32Array(t.getNumVertexFacesTotal());let d=0;for(let f=0;f<c;++f){const g=t.getVertexFaces(f),_=t.getVertexFaceLocalIndices(f),p=new Array(g.length);for(let b=0;b<g.length;++b)p[b]=this._faceVertValues[t.getOffsetOfFaceVertices(g[b])+_[b]];const m=t.getVertexEdges(f),M=t.getVertexEdgeLocalIndices(f),S=!t.getVertexTag(f)._nonManifold,T=t.getVertexTag(f)._boundary;if(S)for(let b=T?1:0;b<g.length;++b){const v=b,x=b?b-1:g.length-1;if(p[v]!==p[x]){const F=m[b],N=t.getEdgeVertices(F);u[N[0]]=1,u[N[1]]=1;const I=this.getEdgeTag(F);I._disctsV0=N[0]===f,I._disctsV1=N[1]===f,I._mismatch=!0,I._linear=this._hasLinearBoundaries}}else if(g.length>0)for(let b=0;b<m.length;++b){const v=m[b],x=t.getEdgeFaces(v);if(x.length<2)continue;const F=t.getEdgeFaceLocalIndices(v),N=t.getEdgeVertices(v),I=M[b];let G=!1,W=0;for(let B=0;!G&&B<x.length;++B){const j=x[B],k=t.getFaceVertices(j),se=this.getFaceValues(j),ae=F[B],de=N[0]!==k[ae]?1:0;let Ve=ae+(I!==de?1:0);Ve===k.length&&(Ve=0),B===0?W=se[Ve]:G=se[Ve]!==W}if(G){u[N[0]]=1,u[N[1]]=1;const B=this.getEdgeTag(v);B._disctsV0=N[0]===f,B._disctsV1=N[1]===f,B._mismatch=!0,B._linear=this._hasLinearBoundaries}}if(T&&!u[f])if(this._hasLinearBoundaries&&g.length>0)if(u[f]=1,S)this.getEdgeTag(m[0])._linear=!0,this.getEdgeTag(m[m.length-1])._linear=!0;else for(let b=0;b<m.length;++b)t.getEdgeTag(m[b])._boundary&&(this.getEdgeTag(m[b])._linear=!0);else g.length===1&&o&&(u[f]=1);let R=1;const C=[p[0]],A=new Array(g.length);A[0]=0;for(let b=1;b<g.length;++b)if(p[b]===p[b-1])A[b]=A[b-1];else{A[b]=R;const v=C.indexOf(p[b]);v===-1?(C.push(p[b]),R++):A[b]=v}if(!S&&!u[f]&&(u[f]=R>1?1:0),this._vertSiblingCounts[f]=R,this._vertSiblingOffsets[f]=d,d+=R,R>1){const b=this.getVertexFaceSiblings(f);for(let v=0;v<g.length;++v)b[v]=A[v]}}this.resizeVertexValues(d);for(let f=0;f<c;++f){const g=t.getVertexFaces(f),_=t.getVertexFaceLocalIndices(f),p=this.getVertexValues(f);if(g.length>0?p[0]=this._faceVertValues[t.getOffsetOfFaceVertices(g[0])+_[0]]:p[0]=0,!u[f])continue;if(p.length>1){const A=this.getVertexFaceSiblings(f);let b=1;for(let v=1;v<g.length;++v)A[v]===b&&(p[b++]=this._faceVertValues[t.getOffsetOfFaceVertices(g[v])+_[v]])}const m=this.getVertexValueTags(f),M=t.getVertexTag(f);let S=this._hasLinearBoundaries||M._infSharp||M._nonManifold||this._hasDependentSharpness&&p.length>2||h&&p.length===1&&!M._boundary;const T=Array.from({length:p.length},()=>new U_);this.gatherValueSpans(f,T);let R=!1;S||this._hasDependentSharpness&&p.length===2&&(S=T[0]._infSharpEdgeCount>0||T[1]._infSharpEdgeCount>0||T[0]._disctsEdgeCount>0||T[1]._disctsEdgeCount>0,l&&(S=S||T[0]._size===1||T[1]._size===1),R=T[0]._semiSharpEdgeCount>0!=T[1]._semiSharpEdgeCount>0);const C=this.hasCreaseEnds()?this.getVertexValueCreaseEnds(f):null;for(let A=0;A<p.length;++A){const b=m[A];b.clear(),b._mismatch=!0;const v=T[A];if(v._disctsEdgeCount>0){b._nonManifold=!0;continue}const x=S||v._infSharpEdgeCount>0||v._size===1&&a;if(v._size===1?b._xordinary=!x:b._xordinary=v._size!==e,b._infSharpEdges=v._infSharpEdgeCount>0,b._infIrregular=v._infSharpEdgeCount>0?v._size-v._infSharpEdgeCount>1:x?v._size>1:b._xordinary,!x&&(v._semiSharpEdgeCount>0||M._semiSharp?b._semiSharp=!0:R?(b._semiSharp=!0,b._depSharp=!0):b._crease=!0,C)){const F=C[A];F._startFace=v._start,A===0&&v._start!==0?F._endFace=v._start+v._size-1-g.length:F._endFace=v._start+v._size-1}}}}gatherValueSpans(e,t){const n=this._level,s=n.getVertexEdges(e),r=n.getVertexFaces(e),a=this.getVertexFaceSiblings(e),o=this.getNumVertexValues(e)===1,l=s.length>r.length;if(n.getVertexTag(e)._nonManifold){const c=this.getVertexValues(e);for(let u=0;u<c.length;++u)t[u]._size=0,t[u]._disctsEdgeCount=1}else if(o&&!l){t[0]._size=0,t[0]._start=0;for(let c=0;c<s.length;++c)if(this.getEdgeTag(s[c])._mismatch)if(t[0]._size>0){t[0]._disctsEdgeCount=1;break}else t[0]._size=r.length,t[0]._start=c;else n.getEdgeTag(s[c])._infSharp?++t[0]._infSharpEdgeCount:n.getEdgeTag(s[c])._semiSharp&&++t[0]._semiSharpEdgeCount;t[0]._size=r.length}else{t[0]._size=1,t[0]._start=0,!l&&a[r.length-1]===0&&(this.getEdgeTag(s[0])._mismatch?++t[0]._disctsEdgeCount:n.getEdgeTag(s[0])._infSharp?++t[0]._infSharpEdgeCount:n.getEdgeTag(s[0])._semiSharp&&++t[0]._semiSharpEdgeCount);for(let c=1;c<r.length;++c){const u=a[c];u===a[c-1]?this.getEdgeTag(s[c])._mismatch?++t[u]._disctsEdgeCount:n.getEdgeTag(s[c])._infSharp?++t[u]._infSharpEdgeCount:n.getEdgeTag(s[c])._semiSharp&&++t[u]._semiSharpEdgeCount:(t[u]._size>0&&++t[u]._disctsEdgeCount,t[u]._start=c),++t[u]._size}a[r.length-1]===0&&!l&&--t[0]._disctsEdgeCount}}}function Ca(i,e){for(let t=0;t<i.length;++t)if(i[t]===e)return t;return i.length}function O_(i,e,t,n){if(i!==e){for(const s of t)if(n[2*s]===e||n[2*s+1]===e)return s}else for(const s of t)if(n[2*s]===n[2*s+1])return s;return sn}class ba{members;constructor(e){this.members=new Array(e);for(let t=0;t<e;++t)this.members[t]=[]}get(e){return this.members[e]}append(e,t){this.members[e].push(t)}appendComponent(){this.members.push([])}finalize(){const e=this.members.length,t=new Int32Array(2*e);let n=0,s=0;for(let o=0;o<e;++o){const l=this.members[o].length;t[2*o]=l,t[2*o+1]=n,n+=l,l>s&&(s=l)}const r=new Int32Array(n);let a=0;for(let o=0;o<e;++o){const l=this.members[o];for(let h=0;h<l.length;++h)r[a++]=l[h]}return{co:t,idx:r,max:s}}}const _s=1,vl=2,xl=4,Sl=8,El=16,Ml=32,yl=64,Tl=128,Cl=256,bl=512,Al=1024,wl=2048,Ir=12,vr=15<<Ir;class Po{_store;_i;constructor(e,t=0){this._store=e??new Uint16Array(1),this._i=t}get(e){return(this._store[this._i]&e)!==0}set(e,t){const n=this._store[this._i];this._store[this._i]=t?n|e:n&~e}get _nonManifold(){return this.get(_s)}set _nonManifold(e){this.set(_s,e)}get _xordinary(){return this.get(vl)}set _xordinary(e){this.set(vl,e)}get _boundary(){return this.get(xl)}set _boundary(e){this.set(xl,e)}get _corner(){return this.get(Sl)}set _corner(e){this.set(Sl,e)}get _infSharp(){return this.get(El)}set _infSharp(e){this.set(El,e)}get _semiSharp(){return this.get(Ml)}set _semiSharp(e){this.set(Ml,e)}get _semiSharpEdges(){return this.get(yl)}set _semiSharpEdges(e){this.set(yl,e)}get _incomplete(){return this.get(Tl)}set _incomplete(e){this.set(Tl,e)}get _incidIrregFace(){return this.get(Cl)}set _incidIrregFace(e){this.set(Cl,e)}get _infSharpEdges(){return this.get(bl)}set _infSharpEdges(e){this.set(bl,e)}get _infSharpCrease(){return this.get(Al)}set _infSharpCrease(e){this.set(Al,e)}get _infIrregular(){return this.get(wl)}set _infIrregular(e){this.set(wl,e)}get _rule(){return(this._store[this._i]&vr)>>Ir}set _rule(e){this._store[this._i]=this._store[this._i]&~vr|e<<Ir&vr}clear(){this._store[this._i]=0}static BitwiseOr(e,t=4){const n=new Po;n._rule=0;for(let s=0;s<t;++s){const r=e[s];n._nonManifold||=r._nonManifold,n._xordinary||=r._xordinary,n._boundary||=r._boundary,n._corner||=r._corner,n._infSharp||=r._infSharp,n._semiSharp||=r._semiSharp,n._semiSharpEdges||=r._semiSharpEdges,n._rule|=r._rule,n._incomplete||=r._incomplete,n._incidIrregFace||=r._incidIrregFace,n._infSharpEdges||=r._infSharpEdges,n._infSharpCrease||=r._infSharpCrease,n._infIrregular||=r._infIrregular}return n}}const vs=1,Fl=2,Rl=4,Pl=8;class Io{_store;_i;constructor(e,t=0){this._store=e??new Uint8Array(1),this._i=t}get(e){return(this._store[this._i]&e)!==0}set(e,t){const n=this._store[this._i];this._store[this._i]=t?n|e:n&~e}get _nonManifold(){return this.get(vs)}set _nonManifold(e){this.set(vs,e)}get _boundary(){return this.get(Fl)}set _boundary(e){this.set(Fl,e)}get _infSharp(){return this.get(Rl)}set _infSharp(e){this.set(Rl,e)}get _semiSharp(){return this.get(Pl)}set _semiSharp(e){this.set(Pl,e)}clear(){this._store[this._i]=0}static BitwiseOr(e,t=4){const n=new Io;for(let s=0;s<t;++s){const r=e[s];n._nonManifold||=r._nonManifold,n._boundary||=r._boundary,n._infSharp||=r._infSharp,n._semiSharp||=r._semiSharp}return n}}const zi=1;class B_{_store;_i;constructor(e,t=0){this._store=e??new Uint8Array(1),this._i=t}get _hole(){return(this._store[this._i]&zi)!==0}set _hole(e){const t=this._store[this._i];this._store[this._i]=e?t|zi:t&~zi}clear(){this._store[this._i]=0}}const Dt=new Int32Array(0);class Il{_faceCount=0;_edgeCount=0;_vertCount=0;_depth=0;_maxEdgeFaces=0;_maxValence=0;_faceVertCountsAndOffsets=Dt;_faceVertIndices=Dt;_faceEdgeIndices=Dt;_faceTags=new Uint8Array(0);_edgeVertIndices=Dt;_edgeFaceCountsAndOffsets=Dt;_edgeFaceIndices=Dt;_edgeFaceLocalIndices=Dt;_edgeSharpness=new Float32Array(0);_edgeTags=new Uint8Array(0);_vertFaceCountsAndOffsets=Dt;_vertFaceIndices=Dt;_vertFaceLocalIndices=Dt;_vertEdgeCountsAndOffsets=Dt;_vertEdgeIndices=Dt;_vertEdgeLocalIndices=Dt;_vertSharpness=new Float32Array(0);_vertTags=new Uint16Array(0);_fvarChannels=[];getDepth(){return this._depth}getNumVertices(){return this._vertCount}getNumFaces(){return this._faceCount}getNumEdges(){return this._edgeCount}getNumFaceVerticesTotal(){return this._faceVertIndices.length}getNumFaceEdgesTotal(){return this._faceEdgeIndices.length}getNumEdgeVerticesTotal(){return this._edgeVertIndices.length}getNumEdgeFacesTotal(){return this._edgeFaceIndices.length}getNumVertexFacesTotal(){return this._vertFaceIndices.length}getNumVertexEdgesTotal(){return this._vertEdgeIndices.length}getMaxValence(){return this._maxValence}getMaxEdgeFaces(){return this._maxEdgeFaces}getNumFaceVertices(e){return this._faceVertCountsAndOffsets[2*e]}getOffsetOfFaceVertices(e){return this._faceVertCountsAndOffsets[2*e+1]}getNumFaceEdges(e){return this.getNumFaceVertices(e)}getOffsetOfFaceEdges(e){return this.getOffsetOfFaceVertices(e)}getNumEdgeVertices(e){return 2}getOffsetOfEdgeVertices(e){return 2*e}getNumEdgeFaces(e){return this._edgeFaceCountsAndOffsets[2*e]}getOffsetOfEdgeFaces(e){return this._edgeFaceCountsAndOffsets[2*e+1]}getNumVertexFaces(e){return this._vertFaceCountsAndOffsets[2*e]}getOffsetOfVertexFaces(e){return this._vertFaceCountsAndOffsets[2*e+1]}getNumVertexEdges(e){return this._vertEdgeCountsAndOffsets[2*e]}getOffsetOfVertexEdges(e){return this._vertEdgeCountsAndOffsets[2*e+1]}getFaceVertices(e){const t=this._faceVertCountsAndOffsets[2*e+1],n=this._faceVertCountsAndOffsets[2*e];return this._faceVertIndices.subarray(t,t+n)}getAllFaceVertices(){return this._faceVertIndices}getFaceEdges(e){const t=this._faceVertCountsAndOffsets[2*e+1],n=this._faceVertCountsAndOffsets[2*e];return this._faceEdgeIndices.subarray(t,t+n)}getEdgeVertices(e){return this._edgeVertIndices.subarray(2*e,2*e+2)}getEdgeFaces(e){const t=this._edgeFaceCountsAndOffsets[2*e+1],n=this._edgeFaceCountsAndOffsets[2*e];return this._edgeFaceIndices.subarray(t,t+n)}getEdgeFaceLocalIndices(e){const t=this._edgeFaceCountsAndOffsets[2*e+1],n=this._edgeFaceCountsAndOffsets[2*e];return this._edgeFaceLocalIndices.subarray(t,t+n)}getVertexFaces(e){const t=this._vertFaceCountsAndOffsets[2*e+1],n=this._vertFaceCountsAndOffsets[2*e];return this._vertFaceIndices.subarray(t,t+n)}getVertexFaceLocalIndices(e){const t=this._vertFaceCountsAndOffsets[2*e+1],n=this._vertFaceCountsAndOffsets[2*e];return this._vertFaceLocalIndices.subarray(t,t+n)}getVertexEdges(e){const t=this._vertEdgeCountsAndOffsets[2*e+1],n=this._vertEdgeCountsAndOffsets[2*e];return this._vertEdgeIndices.subarray(t,t+n)}getVertexEdgeLocalIndices(e){const t=this._vertEdgeCountsAndOffsets[2*e+1],n=this._vertEdgeCountsAndOffsets[2*e];return this._vertEdgeLocalIndices.subarray(t,t+n)}getEdgeSharpness(e){return this._edgeSharpness[e]}setEdgeSharpness(e,t){this._edgeSharpness[e]=t}getVertexSharpness(e){return this._vertSharpness[e]}setVertexSharpness(e,t){this._vertSharpness[e]=t}getVertexRule(e){return(this._vertTags[e]&vr)>>Ir}getVertexTag(e){return new Po(this._vertTags,e)}getEdgeTag(e){return new Io(this._edgeTags,e)}getFaceTag(e){return new B_(this._faceTags,e)}setFaceHole(e,t){const n=this._faceTags[e];this._faceTags[e]=t?n|zi:n&~zi}isFaceHole(e){return(this._faceTags[e]&zi)!==0}setEdgeNonManifold(e,t){const n=this._edgeTags[e];this._edgeTags[e]=t?n|vs:n&~vs}isEdgeNonManifold(e){return(this._edgeTags[e]&vs)!==0}setVertexNonManifold(e,t){const n=this._vertTags[e];this._vertTags[e]=t?n|_s:n&~_s}isVertexNonManifold(e){return(this._vertTags[e]&_s)!==0}getNumFVarChannels(){return this._fvarChannels.length}getFVarLevel(e){return this._fvarChannels[e]}getNumFVarValues(e){return this._fvarChannels[e].getNumValues()}getFaceFVarValues(e,t){return this._fvarChannels[t].getFaceValues(e)}createFVarChannel(e,t){const n=new Ph(this);return n.setOptions(t),n.resizeValues(e),n.resizeComponents(),this._fvarChannels.push(n),this._fvarChannels.length-1}completeFVarChannelTopology(e,t){this._fvarChannels[e].completeTopologyFromFaceValues(t)}resizeFaces(e){this._faceCount=e,this._faceVertCountsAndOffsets=new Int32Array(2*e),this._faceTags=new Uint8Array(e)}resizeFaceVertices(e){this._faceVertIndices=new Int32Array(e)}resizeFaceEdges(e){this._faceEdgeIndices=new Int32Array(e)}resizeEdges(e){this._edgeCount=e,this._edgeFaceCountsAndOffsets=new Int32Array(2*e),this._edgeSharpness=new Float32Array(e),this._edgeTags=new Uint8Array(e)}resizeEdgeVertices(){this._edgeVertIndices=new Int32Array(2*this._edgeCount)}resizeEdgeFaces(e){this._edgeFaceIndices=new Int32Array(e),this._edgeFaceLocalIndices=new Int32Array(e)}resizeVertices(e){this._vertCount=e,this._vertFaceCountsAndOffsets=new Int32Array(2*e),this._vertEdgeCountsAndOffsets=new Int32Array(2*e),this._vertSharpness=new Float32Array(e),this._vertTags=new Uint16Array(e)}resizeVertexFaces(e){this._vertFaceIndices=new Int32Array(e),this._vertFaceLocalIndices=new Int32Array(e)}resizeVertexEdges(e){this._vertEdgeIndices=new Int32Array(e),this._vertEdgeLocalIndices=new Int32Array(e)}setMaxValence(e){this._maxValence=e}resizeFaceVerticesAt(e,t){const n=this._faceVertCountsAndOffsets;n[2*e]=t,n[2*e+1]=e===0?0:n[2*e-2]+n[2*e-1],this._maxValence=Math.max(this._maxValence,t)}resizeEdgeFacesAt(e,t){const n=this._edgeFaceCountsAndOffsets;n[2*e]=t,n[2*e+1]=e===0?0:n[2*e-2]+n[2*e-1],this._maxEdgeFaces=Math.max(this._maxEdgeFaces,t)}trimEdgeFaces(e,t){this._edgeFaceCountsAndOffsets[2*e]=t}resizeVertexFacesAt(e,t){const n=this._vertFaceCountsAndOffsets;n[2*e]=t,n[2*e+1]=e===0?0:n[2*e-2]+n[2*e-1]}trimVertexFaces(e,t){this._vertFaceCountsAndOffsets[2*e]=t}resizeVertexEdgesAt(e,t){const n=this._vertEdgeCountsAndOffsets;n[2*e]=t,n[2*e+1]=e===0?0:n[2*e-2]+n[2*e-1],this._maxValence=Math.max(this._maxValence,t)}trimVertexEdges(e,t){this._vertEdgeCountsAndOffsets[2*e]=t}findEdge(e,t,n){const s=n??this.getVertexEdges(e);if(e!==t)for(let r=0;r<s.length;++r){const a=this.getEdgeVertices(s[r]);if(a[0]===t||a[1]===t)return s[r]}else for(let r=0;r<s.length;++r){const a=this.getEdgeVertices(s[r]);if(a[0]===a[1])return s[r]}return sn}completeTopologyFromFaceVertices(){const e=this.getNumVertices(),t=this.getNumFaces();this._faceEdgeIndices=new Int32Array(this.getNumFaceVerticesTotal());const n=[],s=new ba(0),r=new ba(e),a=new ba(e),o=[];let l=0;for(let d=0;d<t;++d){const f=this.getFaceVertices(d),g=this.getFaceEdges(d),_=f.length;for(let p=0;p<_;++p){const m=f[p],M=f[(p+1)%_];let S;if(m!==M?S=O_(m,M,a.get(m),n):(S=sn,o.push(l)),Be(S)){const T=s.get(S);T[T.length-1]===d?(o.push(S),o.push(l),S=sn):(T.length>1||m===n[2*S])&&o.push(S)}Be(S)||(S=l,l++,n.push(m,M),s.appendComponent(),a.append(m,S),a.append(M,S)),s.append(S,d),r.append(m,d),g[p]=S}}const h=s.finalize(),c=r.finalize(),u=a.finalize();if(this._maxEdgeFaces=h.max,this._maxValence=Math.max(this._maxValence,c.max,u.max),this._maxValence>D_)return!1;this.resizeEdges(l),this._edgeVertIndices=Int32Array.from(n),this._edgeFaceCountsAndOffsets=h.co,this._edgeFaceIndices=h.idx,this._vertFaceCountsAndOffsets=c.co,this._vertFaceIndices=c.idx,this._vertEdgeCountsAndOffsets=u.co,this._vertEdgeIndices=u.idx;for(const d of o){this.setEdgeNonManifold(d,!0);const f=this.getEdgeVertices(d);this.setVertexNonManifold(f[0],!0),this.setVertexNonManifold(f[1],!0)}return this.orientIncidentComponents(),this.populateLocalIndices(),!0}populateLocalIndices(){const e=this.getNumEdges(),t=this.getNumVertices();this._vertFaceLocalIndices=new Int32Array(this._vertFaceIndices.length),this._vertEdgeLocalIndices=new Int32Array(this._vertEdgeIndices.length),this._edgeFaceLocalIndices=new Int32Array(this._edgeFaceIndices.length);for(let n=0;n<t;++n){const s=this.getVertexFaces(n),r=this.getVertexFaceLocalIndices(n);let a=sn;for(let o=0;o<s.length;++o){const l=this.getFaceVertices(s[o]),h=s[o]===a?r[o-1]+1:0;let c=l.length;for(let u=h;u<l.length;++u)if(l[u]===n){c=u;break}r[o]=c,a=s[o]}}for(let n=0;n<t;++n){const s=this.getVertexEdges(n),r=this.getVertexEdgeLocalIndices(n);for(let a=0;a<s.length;++a){const o=this.getEdgeVertices(s[a]);o[0]!==o[1]?r[a]=n===o[1]?1:0:r[a]=a>0&&s[a]===s[a-1]?1:0}this._maxValence=Math.max(this._maxValence,s.length)}for(let n=0;n<e;++n){const s=this.getEdgeFaces(n),r=this.getEdgeFaceLocalIndices(n);let a=sn;for(let o=0;o<s.length;++o){const l=this.getFaceEdges(s[o]),h=s[o]===a?r[o-1]+1:0;let c=l.length;for(let u=h;u<l.length;++u)if(l[u]===n){c=u;break}r[o]=c,a=s[o]}}}orientIncidentComponents(){const e=this.getNumVertices();for(let t=0;t<e;++t){const n=this.getVertexTag(t);n._nonManifold||this.orderVertexFacesAndEdges(t)||(n._nonManifold=!0)}}orderVertexFacesAndEdges(e){const t=this.computeOrderedVertexFacesAndEdges(e);return t===null?!1:(this.getVertexFaces(e).set(t.vFaces),this.getVertexEdges(e).set(t.vEdges),!0)}computeOrderedVertexFacesAndEdges(e){const t=this.getVertexEdges(e),n=this.getVertexFaces(e),s=n.length,r=t.length;if(s===0||r<2||r-s>1)return null;let a=sn,o=sn,l=0;if(r===s)a=n[0],l=Ca(this.getFaceVertices(a),e),o=this.getFaceEdges(a)[l];else for(let g=0;g<r;++g){const _=this.getEdgeFaces(t[g]);if(_.length===1&&(o=t[g],a=_[0],l=Ca(this.getFaceVertices(a),e),o===this.getFaceEdges(a)[l]))break}const h=new Int32Array(s),c=new Int32Array(r);let u=1,d=1;h[0]=a,c[0]=o;const f=o;for(;u<r;){const g=this.getFaceVertices(a),_=this.getFaceEdges(a),p=l,m=p?p-1:g.length-1,M=_[m];if(M===o||M===f)return null;if(c[u++]=M,d<s){const S=this.getEdgeFaces(M);if(S.length===0||S.length===1&&S[0]===a)return null;a=S[S[0]===a?1:0],l=Ca(this.getFaceEdges(a),M),h[d++]=a}o=M}return{vFaces:h,vEdges:c}}}class z_{_refinement;_parentLevel;_parentFVar;_childLevel;_childFVar;_childValueParentSource=new Int32Array(0);constructor(e,t,n){this._refinement=e,this._parentLevel=e.parent(),this._parentFVar=t,this._childLevel=e.child(),this._childFVar=n}getChildValueParentSource(e,t){return this._childValueParentSource[this._childFVar.getVertexValueOffset(e,t)]}applyRefinement(){const e=this._childFVar,t=this._parentFVar;e._options=t._options,e._isLinear=t._isLinear,e._hasLinearBoundaries=t._hasLinearBoundaries,e._hasDependentSharpness=t._hasDependentSharpness,this.estimateAndAllocateChildValues(),this.populateChildValues(),this.trimAndFinalizeChildValues(),this.propagateEdgeTags(),this.propagateValueTags(),e.hasSmoothBoundaries()&&(this.propagateValueCreases(),this.reclassifySemisharpValues()),e.getNumValues()>this._childLevel.getNumVertices()?e.initializeFaceValuesFromVertexFaceSiblings():e.initializeFaceValuesFromFaceVertices()}estimateAndAllocateChildValues(){const e=this._refinement;let t=e.getNumChildVerticesFromFaces();{let n=e.getFirstChildVertexFromEdges();const s=n+e.getNumChildVerticesFromEdges();for(;n<s;++n){const r=e.getChildVertexParentIndex(n);t+=this._parentFVar.edgeTopologyMatches(r)?1:this._parentLevel.getEdgeFaces(r).length}}{let n=e.getFirstChildVertexFromVertices();const s=n+e.getNumChildVerticesFromVertices();for(;n<s;++n)t+=this._parentFVar.getNumVertexValues(e.getChildVertexParentIndex(n))}this._childFVar.resizeComponents(),this._childFVar._vertValueTags=new Uint8Array(t),this._childValueParentSource=new Int32Array(t)}trimAndFinalizeChildValues(){const e=this._childFVar;e._vertValueTags=e._vertValueTags.slice(0,e._valueCount),e.hasSmoothBoundaries()&&(e._vertValueCreaseEnds=Array.from({length:e._valueCount},()=>new Rh)),this._childValueParentSource=this._childValueParentSource.slice(0,e._valueCount),e._vertValueIndices=new Int32Array(e._valueCount);for(let t=0;t<e._valueCount;++t)e._vertValueIndices[t]=t}populateChildValues(){const e=this._refinement;this._childFVar._valueCount=0,e.hasFaceVerticesFirst()?(this.populateChildValuesFromFaceVertices(),this.populateChildValuesFromEdgeVertices(),this.populateChildValuesFromVertexVertices()):(this.populateChildValuesFromVertexVertices(),this.populateChildValuesFromFaceVertices(),this.populateChildValuesFromEdgeVertices())}populateChildValuesFromFaceVertices(){const e=this._refinement,t=this._childFVar;let n=e.getFirstChildVertexFromFaces();const s=n+e.getNumChildVerticesFromFaces();for(;n<s;++n)t._vertSiblingOffsets[n]=t._valueCount,t._vertSiblingCounts[n]=1,t._valueCount++}populateChildValuesFromEdgeVertices(){const e=this._refinement,t=this._childFVar;let n=e.getFirstChildVertexFromEdges();const s=n+e.getNumChildVerticesFromEdges();for(;n<s;++n){const r=e.getChildVertexParentIndex(n);if(t._vertSiblingOffsets[n]=t._valueCount,this._parentFVar.edgeTopologyMatches(r))t._vertSiblingCounts[n]=1,t._valueCount++;else{const a=this.populateChildValuesForEdgeVertex(n,r);t._vertSiblingCounts[n]=a,t._valueCount+=a}}}populateChildValuesFromVertexVertices(){const e=this._refinement,t=this._childFVar;let n=e.getFirstChildVertexFromVertices();const s=n+e.getNumChildVerticesFromVertices();for(;n<s;++n){const r=e.getChildVertexParentIndex(n);if(t._vertSiblingOffsets[n]=t._valueCount,this._parentFVar.valueTopologyMatches(this._parentFVar.getVertexValueOffset(r)))t._vertSiblingCounts[n]=1,t._valueCount++;else{const a=this.populateChildValuesForVertexVertex(n,r);t._vertSiblingCounts[n]=a,t._valueCount+=a}}}populateChildValuesForEdgeVertex(e,t){const n=this._parentLevel.getEdgeFaces(t);if(n.length===1)return 1;const s=n.length,r=this._childFVar.getVertexValueOffset(e);for(let l=0;l<s;++l)this._childValueParentSource[r+l]=l;const a=this._childLevel.getVertexFaces(e),o=this._childFVar.getVertexFaceSiblings(e);for(let l=0;l<o.length;++l){const h=this._refinement.getChildFaceParentFace(a[l]);if(n.length===2)h===n[1]&&(o[l]=1);else for(let c=0;c<n.length;++c)h===n[c]&&(o[l]=c)}return s}populateChildValuesForVertexVertex(e,t){const n=this._parentFVar.getNumVertexValues(t);if(n>1){const s=this._childFVar.getVertexValueOffset(e);for(let o=1;o<n;++o)this._childValueParentSource[s+o]=o;const r=this._parentFVar.getVertexFaceSiblings(t),a=this._childFVar.getVertexFaceSiblings(e);for(let o=0;o<a.length;++o)a[o]=r[o]}return n}propagateEdgeTags(){const e=this._refinement,t=this._childFVar,n=e.getNumChildEdgesFromFaces();for(let s=n;s<this._childLevel.getNumEdges();++s){const r=e.getChildEdgeParentIndex(s);t._edgeTags[s]=this._parentFVar._edgeTags[r]}}propagateValueTags(){const e=this._refinement,t=this._childFVar;{let n=e.getFirstChildVertexFromEdges();const s=n+e.getNumChildVerticesFromEdges(),r=this._parentFVar.hasSmoothBoundaries();for(;n<s;++n){const a=e.getChildVertexParentIndex(n),o=this._parentFVar.getEdgeTag(a);if(!(o._mismatch||o._linear))continue;const l=t.getVertexValueOffset(n),h=t.getNumVertexValues(n);for(let c=0;c<h;++c){const u=t.getValueTag(l+c);u._mismatch=!0,r&&(u._crease=!0)}}}{let n=e.getFirstChildVertexFromVertices();const s=n+e.getNumChildVerticesFromVertices();for(;n<s;++n){const r=e.getChildVertexParentIndex(n),a=this._parentFVar.getVertexValueOffset(r),o=t.getVertexValueOffset(n),l=t.getNumVertexValues(n);for(let h=0;h<l;++h)t._vertValueTags[o+h]=this._parentFVar._vertValueTags[a+h]}}}propagateValueCreases(){const e=this._refinement,t=this._childFVar,n=e.getRegularFaceSize()===4?2:3;{let s=e.getFirstChildVertexFromEdges();const r=s+e.getNumChildVerticesFromEdges();for(;s<r;++s){const a=t.getVertexValueTags(s);if(!a[0].isMismatch()||!e.isChildVertexComplete(s))continue;const o=t.getVertexValueCreaseEnds(s);let l=0,h=l+n-1;for(let c=0;c<a.length;++c)a[c].isInfSharp()||(o[c]._startFace=l,o[c]._endFace=h),l+=n,h+=n}}{let s=e.getFirstChildVertexFromVertices();const r=s+e.getNumChildVerticesFromVertices();for(;s<r;++s){const a=t.getVertexValueTags(s);if(!a[0].isMismatch()||!e.isChildVertexComplete(s))continue;const o=e.getChildVertexParentIndex(s),l=this._parentFVar.getVertexValueCreaseEnds(o),h=t.getVertexValueCreaseEnds(s);for(let c=0;c<a.length;++c)a[c].isInfSharp()||(h[c]._startFace=l[c]._startFace,h[c]._endFace=l[c]._endFace)}}}reclassifySemisharpValues(){const e=this._refinement,t=this._childFVar,n=this._parentFVar._hasDependentSharpness;let s=e.getFirstChildVertexFromVertices();const r=s+e.getNumChildVerticesFromVertices();for(;s<r;++s){const a=t.getVertexValueTags(s);if(!a[0].isMismatch()||!e.isChildVertexComplete(s))continue;const o=e.getChildVertexParentIndex(s),l=this._parentLevel.getVertexTag(o);if(!l._semiSharp&&!l._semiSharpEdges)continue;const h=this._childLevel.getVertexTag(s);if(h._semiSharp||h._infSharp)continue;if(!h._semiSharp&&!h._semiSharpEdges){for(let d=0;d<a.length;++d)a[d]._semiSharp&&(a[d]._semiSharp=!1,a[d]._depSharp=!1,a[d]._crease=!0);continue}const c=t.getVertexValueCreaseEnds(s),u=this._childLevel.getVertexEdges(s);for(let d=0;d<a.length;++d)if(a[d]._semiSharp&&!a[d]._depSharp){const f=c[d]._startFace,g=c[d]._endFace;let _=!1;if(g>f)for(let p=f+1;!_&&p<=g;++p)_=this._childLevel.getEdgeTag(u[p])._semiSharp;else if(f>g){for(let p=f+1;!_&&p<u.length;++p)_=this._childLevel.getEdgeTag(u[p])._semiSharp;for(let p=0;!_&&p<=g;++p)_=this._childLevel.getEdgeTag(u[p])._semiSharp}_||(a[d]._semiSharp=!1,a[d]._depSharp=!1,a[d]._crease=!0)}a.length===2&&n&&(a[0]._depSharp&&!a[1]._semiSharp?a[0]._depSharp=!1:a[1]._depSharp&&!a[0]._semiSharp&&(a[1]._depSharp=!1))}}getFractionalWeight(e,t,n,s){const r=this._parentLevel.getVertexEdges(e),a=this._childLevel.getVertexEdges(n),o=[],l=[],h=this._parentFVar.getVertexValueCreaseEnds(e)[t],c=h._startFace,u=h._endFace;let d=0;if(u>c)for(let f=c+1;f<=u;++f,++d)o[d]=this._parentLevel.getEdgeSharpness(r[f]),l[d]=this._childLevel.getEdgeSharpness(a[f]);else if(c>u){for(let f=c+1;f<r.length;++f,++d)o[d]=this._parentLevel.getEdgeSharpness(r[f]),l[d]=this._childLevel.getEdgeSharpness(a[f]);for(let f=0;f<=u;++f,++d)o[d]=this._parentLevel.getEdgeSharpness(r[f]),l[d]=this._childLevel.getEdgeSharpness(a[f])}return new jt(this._refinement.getOptions()).ComputeFractionalWeightAtVertex(this._parentLevel.getVertexSharpness(e),this._childLevel.getVertexSharpness(n),d,o,l)}}const vn=new Int32Array(0);function xn(i,e){for(let t=0;t<i.length;++t)i[t]=e+t;return i.length}class Ll{_incomplete=!1;_parentType=0;_indexInParent=0}class G_{_parent;_child;_options;_splitType=Fs.TO_QUADS;_regFaceSize=4;_uniform=!0;_faceVertsFirst=!1;_childFaceFromFaceCount=0;_childEdgeFromFaceCount=0;_childEdgeFromEdgeCount=0;_childVertFromFaceCount=0;_childVertFromEdgeCount=0;_childVertFromVertCount=0;_firstChildFaceFromFace=0;_firstChildEdgeFromFace=0;_firstChildEdgeFromEdge=0;_firstChildVertFromFace=0;_firstChildVertFromEdge=0;_firstChildVertFromVert=0;_faceChildFaceIndices=vn;_faceChildEdgeIndices=vn;_edgeChildEdgeIndices=vn;_faceChildVertIndex=vn;_edgeChildVertIndex=vn;_vertChildVertIndex=vn;_childFaceParentIndex=vn;_childEdgeParentIndex=vn;_childVertexParentIndex=vn;_childEdgeTag=[];_childVertexTag=[];constructor(e,t,n){this._parent=e,this._child=t,this._options=n}parent(){return this._parent}child(){return this._child}getSplitType(){return this._splitType}getRegularFaceSize(){return this._regFaceSize}getFaceChildFaces(e){const t=this._parent.getOffsetOfFaceVertices(e),n=this._parent.getNumFaceVertices(e);return this._faceChildFaceIndices.subarray(t,t+n)}getFaceChildEdges(e){const t=this._parent.getOffsetOfFaceVertices(e),n=this._parent.getNumFaceVertices(e);return this._faceChildEdgeIndices.subarray(t,t+n)}getEdgeChildEdges(e){return this._edgeChildEdgeIndices.subarray(e*2,e*2+2)}getFaceChildVertex(e){return this._faceChildVertIndex[e]}getEdgeChildVertex(e){return this._edgeChildVertIndex[e]}getVertexChildVertex(e){return this._vertChildVertIndex[e]}getFirstChildVertexFromFaces(){return this._firstChildVertFromFace}getFirstChildVertexFromEdges(){return this._firstChildVertFromEdge}getFirstChildVertexFromVertices(){return this._firstChildVertFromVert}getNumChildFacesFromFaces(){return this._childFaceFromFaceCount}getNumChildVerticesFromFaces(){return this._childVertFromFaceCount}getNumChildVerticesFromEdges(){return this._childVertFromEdgeCount}getNumChildVerticesFromVertices(){return this._childVertFromVertCount}getNumChildEdgesFromFaces(){return this._childEdgeFromFaceCount}getChildVertexParentIndex(e){return this._childVertexParentIndex[e]}getChildFaceParentFace(e){return this._childFaceParentIndex[e]}getChildEdgeParentIndex(e){return this._childEdgeParentIndex[e]}isChildVertexComplete(e){return!this._childVertexTag[e]._incomplete}hasFaceVerticesFirst(){return this._faceVertsFirst}getOptions(){return this._options}_fvarChannels=[];getNumFVarChannels(){return this._fvarChannels.length}getFVarRefinement(e){return this._fvarChannels[e]}refine(){this.populateParentToChildMapping(),this.initializeChildComponentCounts(),this.populateChildToParentMapping(),this.propagateComponentTags(),this.subdivideTopology(),this.subdivideSharpnessValues(),this._parent.getNumFVarChannels()>0&&this.subdivideFVarChannels()}subdivideFVarChannels(){const e=this._parent.getNumFVarChannels();for(let t=0;t<e;++t){const n=this._parent.getFVarLevel(t),s=new Ph(this._child),r=new z_(this,n,s);r.applyRefinement(),this._child._fvarChannels.push(s),this._fvarChannels.push(r)}}populateParentToChildMapping(){this.allocateParentChildIndices(),this.populateParentChildIndices()}populateParentChildIndices(){this._firstChildFaceFromFace=0,this._childFaceFromFaceCount=xn(this._faceChildFaceIndices,0),this._firstChildEdgeFromFace=0,this._childEdgeFromFaceCount=xn(this._faceChildEdgeIndices,0),this._firstChildEdgeFromEdge=this._childEdgeFromFaceCount,this._childEdgeFromEdgeCount=xn(this._edgeChildEdgeIndices,this._firstChildEdgeFromEdge),this._faceVertsFirst?(this._firstChildVertFromFace=0,this._childVertFromFaceCount=xn(this._faceChildVertIndex,this._firstChildVertFromFace),this._firstChildVertFromEdge=this._firstChildVertFromFace+this._childVertFromFaceCount,this._childVertFromEdgeCount=xn(this._edgeChildVertIndex,this._firstChildVertFromEdge),this._firstChildVertFromVert=this._firstChildVertFromEdge+this._childVertFromEdgeCount,this._childVertFromVertCount=xn(this._vertChildVertIndex,this._firstChildVertFromVert)):(this._firstChildVertFromVert=0,this._childVertFromVertCount=xn(this._vertChildVertIndex,this._firstChildVertFromVert),this._firstChildVertFromFace=this._firstChildVertFromVert+this._childVertFromVertCount,this._childVertFromFaceCount=xn(this._faceChildVertIndex,this._firstChildVertFromFace),this._firstChildVertFromEdge=this._firstChildVertFromFace+this._childVertFromFaceCount,this._childVertFromEdgeCount=xn(this._edgeChildVertIndex,this._firstChildVertFromEdge))}initializeChildComponentCounts(){this._child._faceCount=this._childFaceFromFaceCount,this._child._edgeCount=this._childEdgeFromFaceCount+this._childEdgeFromEdgeCount,this._child._vertCount=this._childVertFromFaceCount+this._childVertFromEdgeCount+this._childVertFromVertCount}subdivideTopology(){this.populateFaceVertexRelation(),this.populateFaceEdgeRelation(),this.populateEdgeVertexRelation(),this.populateEdgeFaceRelation(),this.populateVertexFaceRelation(),this.populateVertexEdgeRelation(),this._child._maxValence=Math.max(this._parent._maxValence,4),this._child._maxValence=Math.max(this._child._maxValence,2+this._parent._maxEdgeFaces)}populateChildToParentMapping(){const e=this._child;this._childFaceParentIndex=new Int32Array(e.getNumFaces());{let t=0;for(let n=0;n<this._parent.getNumFaces();++n){const s=this.getFaceChildFaces(n).length;for(let r=0;r<s;++r)this._childFaceParentIndex[t++]=n}}this._childEdgeParentIndex=new Int32Array(e.getNumEdges()),this._childEdgeTag=Array.from({length:e.getNumEdges()},()=>new Ll);{let t=this._firstChildEdgeFromFace;for(let n=0;n<this._parent.getNumFaces();++n){const s=this.getFaceChildEdges(n);for(let r=0;r<s.length;++r,++t)this._childEdgeParentIndex[t]=n,this._childEdgeTag[t]._indexInParent=r}t=this._firstChildEdgeFromEdge;for(let n=0;n<this._parent.getNumEdges();++n,t+=2)this._childEdgeParentIndex[t]=n,this._childEdgeParentIndex[t+1]=n,this._childEdgeTag[t]._indexInParent=0,this._childEdgeTag[t+1]._indexInParent=1}this._childVertexParentIndex=new Int32Array(e.getNumVertices()),this._childVertexTag=Array.from({length:e.getNumVertices()},()=>new Ll);{let t=this._firstChildVertFromFace;for(let n=0;n<this._parent.getNumFaces();++n,++t)this._childVertexParentIndex[t]=n;t=this._firstChildVertFromEdge;for(let n=0;n<this._parent.getNumEdges();++n,++t)this._childVertexParentIndex[t]=n;t=this._firstChildVertFromVert;for(let n=0;n<this._parent.getNumVertices();++n,++t)this._childVertexParentIndex[t]=n}}propagateComponentTags(){this.populateFaceTagVectors(),this.populateEdgeTagVectors(),this.populateVertexTagVectors()}populateFaceTagVectors(){const e=this._child;e._faceTags=new Uint8Array(e.getNumFaces());for(let t=0;t<e.getNumFaces();++t){const n=this._parent.getFaceTag(this._childFaceParentIndex[t]);e.getFaceTag(t)._hole=n._hole}}populateEdgeTagVectors(){const e=this._child;e._edgeTags=new Uint8Array(e.getNumEdges());const t=this._firstChildEdgeFromEdge,n=t+this._childEdgeFromEdgeCount;for(let s=t;s<n;++s){const r=this._parent.getEdgeTag(this._childEdgeParentIndex[s]),a=e.getEdgeTag(s);a._nonManifold=r._nonManifold,a._boundary=r._boundary,a._infSharp=r._infSharp,a._semiSharp=r._semiSharp}}populateVertexTagVectors(){const e=this._child;e._vertTags=new Uint16Array(e.getNumVertices()),this.populateVertexTagsFromParentFaces(),this.populateVertexTagsFromParentEdges(),this.populateVertexTagsFromParentVertices()}populateVertexTagsFromParentFaces(){if(this._childVertFromFaceCount===0)return;const e=this._child,t=this._firstChildVertFromFace,n=t+this._childVertFromFaceCount,s=this._parent.getDepth()===0;for(let r=t;r<n;++r){const a=e.getVertexTag(r);a._rule=Ne.SMOOTH,s&&this._parent.getNumFaceVertices(this._childVertexParentIndex[r])!==this._regFaceSize&&(a._xordinary=!0)}}populateVertexTagsFromParentEdges(){const e=this._child;for(let t=0;t<this._parent.getNumEdges();++t){const n=this._edgeChildVertIndex[t];if(!Be(n))continue;const s=this._parent.getEdgeTag(t),r=e.getVertexTag(n);r._nonManifold=s._nonManifold,r._boundary=s._boundary,r._semiSharpEdges=s._semiSharp,r._infSharpEdges=s._infSharp,r._infSharpCrease=s._infSharp,r._infIrregular=s._infSharp&&s._nonManifold,r._rule=s._semiSharp||s._infSharp?Ne.CREASE:Ne.SMOOTH}}populateVertexTagsFromParentVertices(){const e=this._child,t=this._firstChildVertFromVert,n=t+this._childVertFromVertCount;for(let s=t;s<n;++s){const r=this._parent.getVertexTag(this._childVertexParentIndex[s]),a=e.getVertexTag(s);a._nonManifold=r._nonManifold,a._xordinary=r._xordinary,a._boundary=r._boundary,a._corner=r._corner,a._infSharp=r._infSharp,a._semiSharp=r._semiSharp,a._semiSharpEdges=r._semiSharpEdges,a._rule=r._rule,a._infSharpEdges=r._infSharpEdges,a._infSharpCrease=r._infSharpCrease,a._infIrregular=r._infIrregular,a._incidIrregFace=!1}}subdivideSharpnessValues(){this.subdivideEdgeSharpness(),this.subdivideVertexSharpness(),this.reclassifySemisharpVertices()}subdivideEdgeSharpness(){const e=new jt(this._options),t=this._child;t._edgeSharpness=new Float32Array(t.getNumEdges());const n=this._firstChildEdgeFromEdge,s=n+this._childEdgeFromEdgeCount;for(let r=n;r<s;++r){const a=t.getEdgeTag(r);if(a._infSharp)t._edgeSharpness[r]=kt;else if(a._semiSharp){const o=this._childEdgeParentIndex[r],l=this._parent.getEdgeSharpness(o);let h;if(e.IsUniform())h=e.SubdivideUniformSharpness(l);else{const u=this._parent.getEdgeVertices(o)[this._childEdgeTag[r]._indexInParent],d=this._parent.getVertexEdges(u),f=[];for(let g=0;g<d.length;++g)f[g]=this._parent.getEdgeSharpness(d[g]);h=e.SubdivideEdgeSharpnessAtVertex(l,d.length,f)}t._edgeSharpness[r]=h,yn(h)||(a._semiSharp=!1)}}}subdivideVertexSharpness(){const e=new jt(this._options),t=this._child;t._vertSharpness=new Float32Array(t.getNumVertices());const n=this._firstChildVertFromVert,s=n+this._childVertFromVertCount;for(let r=n;r<s;++r){const a=t.getVertexTag(r);if(a._infSharp)t._vertSharpness[r]=kt;else if(a._semiSharp){const o=this._childVertexParentIndex[r],l=e.SubdivideVertexSharpness(this._parent.getVertexSharpness(o));t._vertSharpness[r]=l,yn(l)||(a._semiSharp=!1)}}}reclassifySemisharpVertices(){const e=new jt(this._options),t=this._child,n=this._firstChildVertFromEdge,s=n+this._childVertFromEdgeCount;for(let o=n;o<s;++o){const l=t.getVertexTag(o);if(!l._semiSharpEdges)continue;const h=this._childVertexParentIndex[o],c=this.getEdgeChildEdges(h),u=(t.getEdgeTag(c[0])._semiSharp?1:0)+(t.getEdgeTag(c[1])._semiSharp?1:0);l._semiSharpEdges=u>0,l._rule=e.DetermineVertexVertexRule(0,u)}const r=this._firstChildVertFromVert,a=r+this._childVertFromVertCount;for(let o=r;o<a;++o){const l=this._childVertexParentIndex[o],h=this._parent.getVertexTag(l);if(!h._semiSharp&&!h._semiSharpEdges)continue;const c=t.getVertexTag(o),u=h._semiSharp&&!c._semiSharp;if(h._semiSharpEdges||u){let d=0,f=0;const g=t.getVertexEdges(o);for(let _=0;_<g.length;++_){const p=t.getEdgeTag(g[_]);p._infSharp&&d++,p._semiSharp&&f++}c._semiSharpEdges=f>0,!c._semiSharp&&!c._infSharp&&(c._rule=e.DetermineVertexVertexRule(0,d+f))}}}}class H_ extends G_{constructor(e,t,n){super(e,t,n),this._splitType=Fs.TO_QUADS,this._regFaceSize=4}allocateParentChildIndices(){const e=this._parent;this._faceChildFaceIndices=new Int32Array(e._faceVertIndices.length),this._faceChildEdgeIndices=new Int32Array(e._faceEdgeIndices.length),this._edgeChildEdgeIndices=new Int32Array(e._edgeVertIndices.length),this._faceChildVertIndex=new Int32Array(e.getNumFaces()),this._edgeChildVertIndex=new Int32Array(e.getNumEdges()),this._vertChildVertIndex=new Int32Array(e.getNumVertices())}populateFaceVertexRelation(){const e=this._child;e._faceVertCountsAndOffsets.length===0&&this.populateFaceVertexCountsAndOffsets(),e._faceVertIndices=new Int32Array(e.getNumFaces()*4),this.populateFaceVerticesFromParentFaces()}populateFaceVertexCountsAndOffsets(){const e=this._child,t=new Int32Array(e.getNumFaces()*2);for(let n=0;n<e.getNumFaces();++n)t[n*2]=4,t[n*2+1]=n<<2;e._faceVertCountsAndOffsets=t}populateFaceVerticesFromParentFaces(){const e=this._parent,t=this._child;for(let n=0;n<e.getNumFaces();++n){const s=e.getFaceVertices(n),r=e.getFaceEdges(n),a=this.getFaceChildFaces(n),o=s.length;for(let l=0;l<o;++l){const h=a[l];if(!Be(h))continue;const c=l?l-1:o-1,u=this._faceChildVertIndex[n],d=this._edgeChildVertIndex[r[c]],f=this._vertChildVertIndex[s[l]],g=this._edgeChildVertIndex[r[l]],_=t.getFaceVertices(h);if(o===4){const p=c?c-1:3,m=p?p-1:3;_[l]=f,_[m]=g,_[p]=u,_[c]=d}else _[0]=f,_[1]=g,_[2]=u,_[3]=d}}}populateFaceEdgeRelation(){const e=this._child;e._faceVertCountsAndOffsets.length===0&&this.populateFaceVertexCountsAndOffsets(),e._faceEdgeIndices=new Int32Array(e.getNumFaces()*4),this.populateFaceEdgesFromParentFaces()}populateFaceEdgesFromParentFaces(){const e=this._parent,t=this._child;for(let n=0;n<e.getNumFaces();++n){const s=e.getFaceVertices(n),r=e.getFaceEdges(n),a=this.getFaceChildFaces(n),o=this.getFaceChildEdges(n),l=s.length;for(let h=0;h<l;++h){const c=a[h];if(!Be(c))continue;const u=h?h-1:l-1,d=r[u],f=e.getEdgeVertices(d),g=r[h],_=e.getEdgeVertices(g),p=s[h],m=f[0]!==f[1]?f[0]!==p?1:0:1,M=_[0]!==_[1]&&_[0]!==p?1:0,S=this.getEdgeChildEdges(d)[m],T=this.getEdgeChildEdges(g)[M],R=o[u],C=o[h],A=t.getFaceEdges(c);if(l===4){const b=u?u-1:3,v=b?b-1:3;A[h]=T,A[v]=C,A[b]=R,A[u]=S}else A[0]=T,A[1]=C,A[2]=R,A[3]=S}}}populateEdgeVertexRelation(){const e=this._child;e._edgeVertIndices=new Int32Array(e.getNumEdges()*2),this.populateEdgeVerticesFromParentFaces(),this.populateEdgeVerticesFromParentEdges()}populateEdgeVerticesFromParentFaces(){const e=this._parent,t=this._child;for(let n=0;n<e.getNumFaces();++n){const s=e.getFaceEdges(n),r=this.getFaceChildEdges(n);for(let a=0;a<s.length;++a){const o=r[a];if(!Be(o))continue;const l=t.getEdgeVertices(o);l[0]=this._faceChildVertIndex[n],l[1]=this._edgeChildVertIndex[s[a]]}}}populateEdgeVerticesFromParentEdges(){const e=this._parent,t=this._child;for(let n=0;n<e.getNumEdges();++n){const s=e.getEdgeVertices(n),r=this.getEdgeChildEdges(n);for(let a=0;a<2;++a){const o=r[a];if(!Be(o))continue;const l=t.getEdgeVertices(o);l[0]=this._edgeChildVertIndex[n],l[1]=this._vertChildVertIndex[s[a]]}}}populateEdgeFaceRelation(){const e=this._parent,t=this._child,n=e._faceVertIndices.length*2+e._edgeFaceIndices.length*2;t._edgeFaceCountsAndOffsets=new Int32Array(t.getNumEdges()*2),t._edgeFaceIndices=new Int32Array(n),t._edgeFaceLocalIndices=new Int32Array(n),t._maxEdgeFaces=e._maxEdgeFaces,this.populateEdgeFacesFromParentFaces(),this.populateEdgeFacesFromParentEdges()}populateEdgeFacesFromParentFaces(){const e=this._parent,t=this._child;for(let n=0;n<e.getNumFaces();++n){const s=this.getFaceChildFaces(n),r=this.getFaceChildEdges(n),a=s.length;for(let o=0;o<a;++o){const l=r[o];if(!Be(l))continue;t.resizeEdgeFacesAt(l,2);const h=t.getEdgeFaces(l),c=t.getEdgeFaceLocalIndices(l),u=o+1<a?o+1:0;let d=0;Be(s[o])&&(h[d]=s[o],c[d]=a===4?u:1,d++),Be(s[u])&&(h[d]=s[u],c[d]=a===4?u+2&3:2,d++),t.trimEdgeFaces(l,d)}}}populateEdgeFacesFromParentEdges(){const e=this._parent,t=this._child;for(let n=0;n<e.getNumEdges();++n){const s=this.getEdgeChildEdges(n);if(!Be(s[0])&&!Be(s[1]))continue;const r=e.getEdgeFaces(n),a=e.getEdgeFaceLocalIndices(n),o=e.getEdgeVertices(n);for(let l=0;l<2;++l){const h=s[l];if(!Be(h))continue;t.resizeEdgeFacesAt(h,r.length);const c=t.getEdgeFaces(h),u=t.getEdgeFaceLocalIndices(h);let d=0;for(let f=0;f<r.length;++f){const g=r[f],_=a[f],p=e.getFaceVertices(g),m=this.getFaceChildFaces(g),M=o[0]===o[1]?l:p[_]!==o[l]?1:0;let S=_+M;S===m.length&&(S=0),Be(m[S])&&(c[d]=m[S],u[d]=p.length===4?_:M?3:0,d++)}t.trimEdgeFaces(h,d)}}}populateVertexFaceRelation(){const e=this._parent,t=this._child,n=e._faceVertIndices.length+e._edgeFaceIndices.length*2+e._vertFaceIndices.length;t._vertFaceCountsAndOffsets=new Int32Array(t.getNumVertices()*2),t._vertFaceIndices=new Int32Array(n),t._vertFaceLocalIndices=new Int32Array(n),this.getFirstChildVertexFromVertices()===0?(this.populateVertexFacesFromParentVertices(),this.populateVertexFacesFromParentFaces(),this.populateVertexFacesFromParentEdges()):(this.populateVertexFacesFromParentFaces(),this.populateVertexFacesFromParentEdges(),this.populateVertexFacesFromParentVertices())}populateVertexFacesFromParentFaces(){const e=this._parent,t=this._child;for(let n=0;n<e.getNumFaces();++n){const s=this._faceChildVertIndex[n];if(!Be(s))continue;const r=this.getFaceChildFaces(n),a=r.length;t.resizeVertexFacesAt(s,a);const o=t.getVertexFaces(s),l=t.getVertexFaceLocalIndices(s);let h=0;for(let c=0;c<a;++c)Be(r[c])&&(o[h]=r[c],l[h]=a===4?c+2&3:2,h++);t.trimVertexFaces(s,h)}}populateVertexFacesFromParentEdges(){const e=this._parent,t=this._child;for(let n=0;n<e.getNumEdges();++n){const s=this._edgeChildVertIndex[n];if(!Be(s))continue;const r=e.getEdgeFaces(n),a=e.getEdgeFaceLocalIndices(n);t.resizeVertexFacesAt(s,2*r.length);const o=t.getVertexFaces(s),l=t.getVertexFaceLocalIndices(s);let h=0;for(let c=0;c<r.length;++c){const u=r[c],d=a[c],f=this.getFaceChildFaces(u),g=f.length,_=d;let p=d+1;p===f.length&&(p=0),Be(f[p])&&(o[h]=f[p],l[h]=g===4?_:3,h++),Be(f[_])&&(o[h]=f[_],l[h]=g===4?p:1,h++)}t.trimVertexFaces(s,h)}}populateVertexFacesFromParentVertices(){const e=this._parent,t=this._child;for(let n=0;n<e.getNumVertices();++n){const s=this._vertChildVertIndex[n];if(!Be(s))continue;const r=e.getVertexFaces(n),a=e.getVertexFaceLocalIndices(n);t.resizeVertexFacesAt(s,r.length);const o=t.getVertexFaces(s),l=t.getVertexFaceLocalIndices(s);let h=0;for(let c=0;c<r.length;++c){const u=r[c],d=a[c],f=this.getFaceChildFaces(u);if(Be(f[d])){const g=f.length;o[h]=f[d],l[h]=g===4?d:0,h++}}t.trimVertexFaces(s,h)}}populateVertexEdgeRelation(){const e=this._parent,t=this._child,n=e._faceVertIndices.length+e._edgeFaceIndices.length+e.getNumEdges()*2+e._vertEdgeIndices.length;t._vertEdgeCountsAndOffsets=new Int32Array(t.getNumVertices()*2),t._vertEdgeIndices=new Int32Array(n),t._vertEdgeLocalIndices=new Int32Array(n),this.getFirstChildVertexFromVertices()===0?(this.populateVertexEdgesFromParentVertices(),this.populateVertexEdgesFromParentFaces(),this.populateVertexEdgesFromParentEdges()):(this.populateVertexEdgesFromParentFaces(),this.populateVertexEdgesFromParentEdges(),this.populateVertexEdgesFromParentVertices())}populateVertexEdgesFromParentFaces(){const e=this._parent,t=this._child;for(let n=0;n<e.getNumFaces();++n){const s=this._faceChildVertIndex[n];if(!Be(s))continue;const r=e.getFaceVertices(n),a=this.getFaceChildEdges(n);t.resizeVertexEdgesAt(s,r.length);const o=t.getVertexEdges(s),l=t.getVertexEdgeLocalIndices(s);let h=0;for(let c=0;c<r.length;++c){const u=c?c-1:r.length-1;Be(a[u])&&(o[h]=a[u],l[h]=0,h++)}t.trimVertexEdges(s,h)}}populateVertexEdgesFromParentEdges(){const e=this._parent,t=this._child;for(let n=0;n<e.getNumEdges();++n){const s=this._edgeChildVertIndex[n];if(!Be(s))continue;const r=e.getEdgeFaces(n),a=e.getEdgeFaceLocalIndices(n),o=e.getEdgeVertices(n),l=this.getEdgeChildEdges(n);t.resizeVertexEdgesAt(s,r.length+2);const h=t.getVertexEdges(s),c=t.getVertexEdgeLocalIndices(s);let u=0;Be(l[0])&&(h[u]=l[0],c[u]=0,u++),Be(l[1])&&(h[u]=l[1],c[u]=0,u++);for(let d=0;d<r.length;++d){const f=r[d],g=a[d],_=this.getFaceChildEdges(f)[g];Be(_)&&(h[u]=_,c[u]=1,u++,d===0&&u===3&&(o[0]!==o[1]&&e.getFaceVertices(f)[g]===o[0]&&(cr(h,0,1),cr(c,0,1)),cr(h,1,2),cr(c,1,2)))}t.trimVertexEdges(s,u)}}populateVertexEdgesFromParentVertices(){const e=this._parent,t=this._child;for(let n=0;n<e.getNumVertices();++n){const s=this._vertChildVertIndex[n];if(!Be(s))continue;const r=e.getVertexEdges(n),a=e.getVertexEdgeLocalIndices(n);t.resizeVertexEdgesAt(s,r.length);const o=t.getVertexEdges(s),l=t.getVertexEdgeLocalIndices(s);let h=0;for(let c=0;c<r.length;++c){const u=r[c],d=a[c],f=this.getEdgeChildEdges(u)[d];Be(f)&&(o[h]=f,l[h]=1,h++)}t.trimVertexEdges(s,h)}}markSparseFaceChildren(){throw new Error("QuadRefinement: sparse refinement not supported (uniform-only)")}}function cr(i,e,t){const n=i[e];i[e]=i[t],i[t]=n}class k_{_level;constructor(e){this._level=e}GetNumVertices(){return this._level.getNumVertices()}GetNumFaces(){return this._level.getNumFaces()}GetNumEdges(){return this._level.getNumEdges()}GetFaceVertexCounts(){const e=this._level.getNumFaces(),t=new Int32Array(e);for(let n=0;n<e;++n)t[n]=this._level.getNumFaceVertices(n);return t}GetFaceVertexIndices(){return this._level.getAllFaceVertices().slice()}GetFaceVertices(e){return this._level.getFaceVertices(e)}IsFaceHole(e){return this._level.isFaceHole(e)}GetNumFVarChannels(){return this._level.getNumFVarChannels()}GetNumFVarValues(e=0){return this._level.getNumFVarValues(e)}GetFaceFVarValues(e=0){return this._level.getFVarLevel(e).getAllFaceValues().slice()}}class W_{_subdivType;_subdivOptions;_regFaceSize;_levels=[];_refinements=[];_isUniform=!1;_maxLevel=0;_hasHoles=!1;_hasIrregFaces=!1;constructor(e,t){this._subdivType=e,this._subdivOptions=t,this._regFaceSize=Ms.GetRegularFaceSize(e),this._levels.push(new Il)}GetSchemeType(){return this._subdivType}GetSchemeOptions(){return this._subdivOptions}GetMaxLevel(){return this._maxLevel}GetNumLevels(){return this._levels.length}IsUniform(){return this._isUniform}HasHoles(){return this._hasHoles}getLevel(e){const t=this._levels[e];if(t===void 0)throw new Error(`TopologyRefiner: no level ${e}`);return t}getRefinement(e){const t=this._refinements[e];if(t===void 0)throw new Error(`TopologyRefiner: no refinement ${e}`);return t}GetLevel(e){return new k_(this.getLevel(e))}RefineUniform(e){if(this._levels[0].getNumVertices()===0)throw new Error("TopologyRefiner.RefineUniform(): base level is uninitialized.");if(this._refinements.length>0)throw new Error("TopologyRefiner.RefineUniform(): previous refinements already applied.");if(this._isUniform=!0,this._maxLevel=e.refinementLevel,Ms.GetTopologicalSplitType(this._subdivType)!==Fs.TO_QUADS)throw new Error("TopologyRefiner.RefineUniform(): only quad-splitting (Catmark/Bilinear) is implemented.");const n=e.orderVerticesFromFacesFirst??!1;for(let s=1;s<=e.refinementLevel;++s){const r=this.getLevel(s-1),a=new Il;a._depth=s;const o=new H_(r,a,this._subdivOptions);o._faceVertsFirst=n,o.refine(),this._levels.push(a),this._refinements.push(o)}}}const X_={Create(i,e){const t=new W_(e.schemeType,e.schemeOptions);return q_(t,i),t}};function q_(i,e){const t=i.getLevel(0),n=e.numFaces??e.vertsPerFace.length,s=i._regFaceSize;t.resizeFaces(n),t.resizeVertices(e.numVertices);let r=0;for(let c=0;c<n;++c){const u=e.vertsPerFace[c];t.resizeFaceVerticesAt(c,u),r+=u,u!==s&&(i._hasIrregFaces=!0)}t.resizeFaceVertices(r),t.resizeFaceEdges(r);const a=e.isLeftHanded??!1;let o=0;for(let c=0;c<n;++c){const u=t.getFaceVertices(c);if(a){u[0]=e.vertIndicesPerFace[o++];for(let d=u.length-1;d>0;--d)u[d]=e.vertIndicesPerFace[o++]}else for(let d=0;d<u.length;++d)u[d]=e.vertIndicesPerFace[o++]}t.completeTopologyFromFaceVertices();const{indexPairs:l,weights:h}=V_(e);for(let c=0;c<h.length;++c){const u=l[2*c],d=l[2*c+1],f=t.findEdge(u,d);f!==sn&&t.setEdgeSharpness(f,h[c])}if(e.cornerIndices&&e.cornerWeights)for(let c=0;c<e.cornerIndices.length;++c){const u=e.cornerIndices[c];u>=0&&u<t.getNumVertices()&&t.setVertexSharpness(u,e.cornerWeights[c])}if(e.holeIndices)for(let c=0;c<e.holeIndices.length;++c)t.setFaceHole(e.holeIndices[c],!0),i._hasHoles=!0;if(Y_(i),e.fvarChannels&&e.fvarChannels.length>0){const c=Ms.GetRegularVertexValence(i.GetSchemeType())/2|0;for(let u=0;u<e.fvarChannels.length;++u){const d=e.fvarChannels[u],f=t.createFVarChannel(d.numValues,i.GetSchemeOptions());let g=0;for(let _=0;_<n;++_){const p=t.getFaceFVarValues(_,f);if(a){p[0]=d.valueIndices[g++];for(let m=p.length-1;m>0;--m)p[m]=d.valueIndices[g++]}else for(let m=0;m<p.length;++m)p[m]=d.valueIndices[g++]}t.completeFVarChannelTopology(f,c)}}}function Y_(i){const e=i.getLevel(0),t=i.GetSchemeOptions(),n=new jt(t),s=t.GetVtxBoundaryInterpolation()===bn.NONE&&Ms.GetLocalNeighborhoodSize(i.GetSchemeType())>0,r=t.GetVtxBoundaryInterpolation()===bn.EDGE_AND_CORNER,a=!0;if(s)for(let h=0;h<e.getNumVertices();++h){const c=e.getVertexEdges(h),u=e.getVertexFaces(h);if(c.length===u.length&&!e.getVertexTag(h)._nonManifold)continue;let d=!1;for(let f=0;!d&&f<c.length;++f)d=e.getNumEdgeFaces(c[f])===1&&!oi(e.getEdgeSharpness(c[f]));if(d){for(let f=0;f<u.length;++f)e.getFaceTag(u[f])._hole=!0;i._hasHoles=!0}}for(let h=0;h<e.getNumEdges();++h){const c=e.getEdgeTag(h);let u=e.getEdgeSharpness(h);c._boundary=e.getNumEdgeFaces(h)<2,(c._boundary||c._nonManifold&&a)&&(u=kt,e.setEdgeSharpness(h,u)),c._infSharp=oi(u),c._semiSharp=yn(u)&&!c._infSharp}const o=Ms.GetRegularVertexValence(i.GetSchemeType()),l=o/2|0;for(let h=0;h<e.getNumVertices();++h){const c=e.getVertexTag(h);let u=e.getVertexSharpness(h);const d=e.getVertexEdges(h),f=e.getVertexFaces(h);let g=0,_=0,p=0;for(let T=0;T<d.length;++T){const R=e.getEdgeTag(d[T]);R._boundary&&g++,R._infSharp&&_++,R._semiSharp&&p++}const m=_+p,M=f.length===1&&d.length===2;if((M&&r||c._nonManifold&&a&&!oi(u))&&(u=kt,e.setVertexSharpness(h,u)),c._infSharp=oi(u),c._semiSharp=ho(u),c._semiSharpEdges=p>0,c._rule=n.DetermineVertexVertexRule(u,m),c._boundary=g>0,c._corner=M&&c._infSharp,c._nonManifold||c._corner?c._xordinary=!1:c._boundary?c._xordinary=f.length!==l:c._xordinary=f.length!==o,c._incomplete=!1,c._infSharpEdges=_>0,c._infSharpCrease=!1,c._infIrregular=c._infSharp||c._infSharpEdges,c._infSharpEdges){const T=n.DetermineVertexVertexRule(c._infSharp?u:0,_);T===Ne.CREASE?(c._infSharpCrease=!0,!c._xordinary&&!c._nonManifold&&(c._boundary?c._infIrregular=!1:o===4?c._infIrregular=e.getEdgeTag(d[0])._infSharp!==e.getEdgeTag(d[2])._infSharp:o===6&&(c._infIrregular=e.getEdgeTag(d[0])._infSharp!==e.getEdgeTag(d[3])._infSharp||e.getEdgeTag(d[1])._infSharp!==e.getEdgeTag(d[4])._infSharp))):T===Ne.CORNER&&_===d.length&&(d.length>2||c._infSharp)&&(c._infIrregular=!1)}if(i._hasIrregFaces){const T=i._regFaceSize;for(let R=0;R<f.length;++R)if(e.getNumFaceVertices(f[R])!==T){c._incidIrregFace=!0;break}}}}class Vl{_vertCount;constructor(e){this._vertCount=e}GetNumVertices(){return this._vertCount}}class Dl{_level;_eIndex=0;constructor(e){this._level=e}SetIndex(e){this._eIndex=e}GetNumFaces(){return this._level.getNumEdgeFaces(this._eIndex)}GetSharpness(){return this._level.getEdgeSharpness(this._eIndex)}GetChildSharpnesses(e,t){t[0]=t[1]=this.GetSharpness()-1}GetNumVerticesPerFace(e){const t=this._level.getEdgeFaces(this._eIndex);for(let n=0;n<t.length;++n)e[n]=this._level.getNumFaceVertices(t[n])}}class Nl{_parent;_child;_pIndex=0;_cIndex=0;_eCount=0;_fCount=0;constructor(e,t){this._parent=e,this._child=t}SetIndex(e,t){this._pIndex=e,this._cIndex=t,this._eCount=this._parent.getNumVertexEdges(e),this._fCount=this._parent.getNumVertexFaces(e)}GetNumEdges(){return this._eCount}GetNumFaces(){return this._fCount}GetSharpness(){return this._parent.getVertexSharpness(this._pIndex)}GetSharpnessPerEdge(e){const t=this._parent.getVertexEdges(this._pIndex);for(let n=0;n<this._eCount;++n)e[n]=this._parent.getEdgeSharpness(t[n]);return e}GetChildSharpness(e){return this._child.getVertexSharpness(this._cIndex)}GetChildSharpnessPerEdge(e,t){const n=this.GetSharpnessPerEdge(new Array(this._eCount));return e.SubdivideEdgeSharpnessesAroundVertex(this._eCount,n,t),t}}class Ih{_refiner;constructor(e){this._refiner=e}makeScheme(){switch(this._refiner.GetSchemeType()){case An.CATMARK:return new L_(this._refiner.GetSchemeOptions());default:throw new Error("PrimvarRefiner: only Catmull-Clark is implemented (M1).")}}Interpolate(e,t,n,s){const r=this._refiner.getRefinement(e-1),a=this.makeScheme();this.interpFromFaces(r,a,t,n,s),this.interpFromEdges(r,a,t,n,s),this.interpFromVerts(r,a,t,n,s)}interpFromFaces(e,t,n,s,r){const a=e.parent();for(let o=0;o<a.getNumFaces();++o){const l=e.getFaceChildVertex(o);if(!Be(l))continue;const h=a.getFaceVertices(o),c=new ni;t.ComputeFaceVertexMask(new Vl(h.length),c);const u=l*n;for(let d=0;d<n;++d)r[u+d]=0;for(let d=0;d<h.length;++d)ut(r,u,s,h[d]*n,c.VertexWeight(d),n)}}interpFromEdges(e,t,n,s,r){const a=e.parent(),o=e.child(),l=new Dl(a);for(let h=0;h<a.getNumEdges();++h){const c=e.getEdgeChildVertex(h);if(!Be(c))continue;const u=a.getEdgeVertices(h),d=a.getEdgeFaces(h),f=new ni;l.SetIndex(h);const g=a.getEdgeSharpness(h)>0?Ne.CREASE:Ne.SMOOTH,_=o.getVertexRule(c);t.ComputeEdgeVertexMask(l,f,g,_);const p=c*n;for(let m=0;m<n;++m)r[p+m]=0;if(ut(r,p,s,u[0]*n,f.VertexWeight(0),n),ut(r,p,s,u[1]*n,f.VertexWeight(1),n),f.GetNumFaceWeights()>0)for(let m=0;m<d.length;++m)if(f.AreFaceWeightsForFaceCenters()){const M=e.getFaceChildVertex(d[m]);lr(r,p,M*n,f.FaceWeight(m),n)}else{const M=d[m],S=a.getFaceEdges(M),T=a.getFaceVertices(M);let R=0;for(;S[R]!==h;)++R;let C=R+2;C>=T.length&&(C-=T.length),ut(r,p,s,T[C]*n,f.FaceWeight(m),n)}}}interpFromVerts(e,t,n,s,r){const a=e.parent(),o=e.child(),l=new Nl(a,o);for(let h=0;h<a.getNumVertices();++h){const c=e.getVertexChildVertex(h);if(!Be(c))continue;const u=a.getVertexEdges(h),d=a.getVertexFaces(h),f=new ni;l.SetIndex(h,c);const g=a.getVertexRule(h),_=o.getVertexRule(c);t.ComputeVertexVertexMask(l,f,g,_);const p=c*n;for(let m=0;m<n;++m)r[p+m]=0;if(f.GetNumFaceWeights()>0)for(let m=0;m<d.length;++m){const M=e.getFaceChildVertex(d[m]);lr(r,p,M*n,f.FaceWeight(m),n)}if(f.GetNumEdgeWeights()>0)for(let m=0;m<u.length;++m){const M=a.getEdgeVertices(u[m]),S=M[0],T=M[1];ut(r,p,s,(S===h?T:S)*n,f.EdgeWeight(m),n)}ut(r,p,s,h*n,f.VertexWeight(0),n)}}InterpolateFaceVarying(e,t,n,s,r){const a=this._refiner.getRefinement(e-1),o=this.makeScheme();this.interpFVarFromFaces(a,o,t,n,s,r),this.interpFVarFromEdges(a,o,t,n,s,r),this.interpFVarFromVerts(a,o,t,n,s,r)}interpFVarFromFaces(e,t,n,s,r,a){const o=e.parent();if(e.getNumChildVerticesFromFaces()===0)return;const l=o.getFVarLevel(n),h=e.child().getFVarLevel(n);for(let c=0;c<o.getNumFaces();++c){const u=e.getFaceChildVertex(c);if(!Be(u))continue;const d=h.getVertexValueOffset(u),f=l.getFaceValues(c),g=new ni;t.ComputeFaceVertexMask(new Vl(f.length),g);const _=d*s;for(let p=0;p<s;++p)a[_+p]=0;for(let p=0;p<f.length;++p)ut(a,_,r,f[p]*s,g.VertexWeight(p),s)}}interpFVarFromEdges(e,t,n,s,r,a){const o=e.parent(),l=e.child(),h=o.getFVarLevel(n),c=l.getFVarLevel(n),u=e.getFVarRefinement(n),d=h.isLinear(),f=new Dl(o);for(let g=0;g<o.getNumEdges();++g){const _=e.getEdgeChildVertex(g);if(!Be(_))continue;const p=c.getVertexValues(_);if(c.valueTopologyMatches(p[0])){const M=new ni;if(d)M.SetNumVertexWeights(2),M.SetNumEdgeWeights(0),M.SetNumFaceWeights(0),M.SetVertexWeight(0,.5),M.SetVertexWeight(1,.5);else{f.SetIndex(g);const C=o.getEdgeSharpness(g)>0?Ne.CREASE:Ne.SMOOTH,A=l.getVertexRule(_);t.ComputeEdgeVertexMask(f,M,C,A)}const S=h.getEdgeFaceValues(g,0),R=p[0]*s;for(let C=0;C<s;++C)a[R+C]=0;if(ut(a,R,r,S[0]*s,M.VertexWeight(0),s),ut(a,R,r,S[1]*s,M.VertexWeight(1),s),M.GetNumFaceWeights()>0){const C=o.getEdgeFaces(g);for(let A=0;A<C.length;++A)if(M.AreFaceWeightsForFaceCenters()){const b=e.getFaceChildVertex(C[A]),v=c.getVertexValueOffset(b);lr(a,R,v*s,M.FaceWeight(A),s)}else{const b=C[A],v=o.getFaceEdges(b),x=o.getFaceVertices(b);let F=0;for(;v[F]!==g;)++F;let N=F+2;N>=x.length&&(N-=x.length),ut(a,R,r,h.getFaceValues(b)[N]*s,M.FaceWeight(A),s)}}}else for(let M=0;M<p.length;++M){const S=u.getChildValueParentSource(_,M),T=h.getEdgeFaceValues(g,S),R=p[M]*s;for(let C=0;C<s;++C)a[R+C]=0;ut(a,R,r,T[0]*s,.5,s),ut(a,R,r,T[1]*s,.5,s)}}}interpFVarFromVerts(e,t,n,s,r,a){const o=e.parent(),l=e.child(),h=o.getFVarLevel(n),c=l.getFVarLevel(n),u=e.getFVarRefinement(n),d=h.isLinear(),f=new Nl(o,l);for(let g=0;g<o.getNumVertices();++g){const _=e.getVertexChildVertex(g);if(!Be(_))continue;const p=h.getVertexValues(g),m=c.getVertexValues(_),M=c.valueTopologyMatches(m[0]);if(d&&M){const S=m[0]*s;for(let T=0;T<s;++T)a[S+T]=0;ut(a,S,r,p[0]*s,1,s);continue}if(M){const S=new ni;f.SetIndex(g,_);const T=o.getVertexRule(g),R=l.getVertexRule(_);t.ComputeVertexVertexMask(f,S,T,R);const A=m[0]*s;for(let b=0;b<s;++b)a[A+b]=0;if(S.GetNumFaceWeights()>0){const b=o.getVertexFaces(g);for(let v=0;v<b.length;++v){const x=e.getFaceChildVertex(b[v]),F=c.getVertexValueOffset(x);lr(a,A,F*s,S.FaceWeight(v),s)}}if(S.GetNumEdgeWeights()>0){const b=h.getVertexEdgeValues(g);for(let v=0;v<b.length;++v)ut(a,A,r,b[v]*s,S.EdgeWeight(v),s)}ut(a,A,r,p[0]*s,S.VertexWeight(0),s)}else{const S=h.getVertexValueTags(g),T=c.getVertexValueTags(_);for(let R=0;R<m.length;++R){const C=u.getChildValueParentSource(_,R),A=p[C],b=m[R]*s;for(let v=0;v<s;++v)a[b+v]=0;if(d||T[R].isCorner())ut(a,b,r,A*s,1,s);else{const v=h.getVertexCreaseEndValues(g,C);let x=.75,F=.125;if(S[C].isSemiSharp()){const N=S[C].isDepSharp()?u.getFractionalWeight(g,C?0:1,_,R?0:1):u.getFractionalWeight(g,C,_,R),I=1-N;x=I*.75+N,F=I*.125}ut(a,b,r,v[0]*s,F,s),ut(a,b,r,v[1]*s,F,s),ut(a,b,r,A*s,x,s)}}}}}}function ut(i,e,t,n,s,r){for(let a=0;a<r;++a)i[e+a]=i[e+a]+s*t[n+a]}function lr(i,e,t,n,s){for(let r=0;r<s;++r)i[e+r]=i[e+r]+n*i[t+r]}function $_(i){switch(i){case"catmullClark":return An.CATMARK;case"loop":return An.LOOP;case"bilinear":return An.BILINEAR;case"none":default:return null}}function K_(i){switch(i){case"none":return bn.NONE;case"edgeOnly":return bn.EDGE_ONLY;case"edgeAndCorner":return bn.EDGE_AND_CORNER;default:return bn.EDGE_AND_CORNER}}function j_(i){switch(i){case"none":return Ct.NONE;case"cornersOnly":return Ct.CORNERS_ONLY;case"cornersPlus1":return Ct.CORNERS_PLUS1;case"cornersPlus2":return Ct.CORNERS_PLUS2;case"boundaries":return Ct.BOUNDARIES;case"all":return Ct.ALL;default:return Ct.CORNERS_PLUS1}}function Z_(i){return i==="smooth"?Rr.SMOOTH:Rr.CATMARK}function J_(i){const e=new Br;return e.SetVtxBoundaryInterpolation(K_(i.interpolateBoundary)),e.SetFVarLinearInterpolation(j_(i.faceVaryingLinearInterpolation)),e.SetTriangleSubdivision(Z_(i.triangleSubdivisionRule)),e}function Q_(i){if(i.points.length>0)return Math.floor(i.points.length/3);let e=-1;for(const t of i.faceVertexIndices)t>e&&(e=t);return e+1}function ev(i){return{numVertices:Q_(i),vertsPerFace:i.faceVertexCounts,vertIndicesPerFace:i.faceVertexIndices,...i.creaseLengths&&i.creaseLengths.length>0?{creaseLengths:i.creaseLengths,creaseIndices:i.creaseIndices??[],creaseSharpnesses:i.creaseSharpnesses??[]}:{},...i.cornerIndices&&i.cornerIndices.length>0?{cornerIndices:i.cornerIndices,cornerWeights:i.cornerSharpnesses??[]}:{},...i.holeIndices&&i.holeIndices.length>0?{holeIndices:i.holeIndices}:{},...i.fvarPrimvars&&i.fvarPrimvars.length>0?{fvarChannels:i.fvarPrimvars.map(e=>({numValues:Math.floor(e.values.length/e.elementSize),valueIndices:e.valueIndices}))}:{}}}function tv(i,e){if(!e)return{counts:Array.from(i.GetFaceVertexCounts()),indices:Array.from(i.GetFaceVertexIndices())};const t=[],n=[],s=i.GetNumFaces();for(let r=0;r<s;r++){if(i.IsFaceHole(r))continue;const a=i.GetFaceVertices(r);t.push(a.length);for(let o=0;o<a.length;o++)n.push(a[o])}return{counts:t,indices:n}}function Ul(i,e,t,n){const s=new Ih(i);let r=n;for(let a=1;a<=e;a++){const o=new Float32Array(i.GetLevel(a).GetNumVertices()*t);s.Interpolate(a,t,r,o),r=o}return Array.from(r)}function nv(i,e,t,n,s){const r=new Ih(i);let a=s;for(let o=1;o<=e;o++){const l=new Float32Array(i.GetLevel(o).GetNumFVarValues(t)*n);r.InterpolateFaceVarying(o,t,n,a,l),a=l}return Array.from(a)}function xs(i,e,t){const n=new Array(e).fill(0);for(const[s,r]of t)for(let a=0;a<e;a++)n[a]=(n[a]??0)+(i[s*e+a]??0)*r;return n}function iv(i,e,t,n){const s=[...t],r=[],a=[],o=new Map;let l=0;const h=(c,u)=>{const d=c<u?`${c}:${u}`:`${u}:${c}`,f=o.get(d);if(f!==void 0)return f;const g=s.length/n;return s.push(...xs(t,n,[[c,.5],[u,.5]])),o.set(d,g),g};for(const c of i){const u=e.slice(l,l+c);if(l+=c,u.length<3)continue;const d=s.length/n;s.push(...xs(t,n,u.map(f=>[f,1/u.length])));for(let f=0;f<u.length;f++){const g=u[f],_=u[(f+1)%u.length],p=u[(f+u.length-1)%u.length];r.push(4),a.push(g,h(g,_),d,h(p,g))}}return{counts:r,indices:a,values:s}}function sv(i,e,t,n,s){if(i.some(f=>f!==3))return null;const r=new Map,a=new Map;let o=0;for(let f=0;f<i.length;f++){const g=e.slice(o,o+3);o+=3;for(let _=0;_<3;_++){const p=g[_],m=g[(_+1)%3],M=g[(_+2)%3],S=p<m?`${p}:${m}`:`${m}:${p}`,T=r.get(S)??[];T.push(M),r.set(S,T),(a.get(p)??(a.set(p,new Set),a.get(p))).add(m),(a.get(m)??(a.set(m,new Set),a.get(m))).add(p)}}const l=Math.floor(t.length/n),h=[];for(let f=0;f<l;f++){const g=[...a.get(f)??[]],_=g.filter(p=>{const m=f<p?`${f}:${p}`:`${p}:${f}`;return r.get(m)?.length===1});if(_.length>=2&&s)h.push(...t.slice(f*n,(f+1)*n));else if(_.length>=2)h.push(...xs(t,n,[[f,.75],[_[0],.125],[_[1],.125]]));else if(g.length>0){const p=g.length===3?.1875:3/(8*g.length);h.push(...xs(t,n,[[f,1-g.length*p],...g.map(m=>[m,p])]))}else h.push(...t.slice(f*n,(f+1)*n))}const c=new Map;for(const[f,g]of r){const[_,p]=f.split(":").map(Number),m=h.length/n,M=g.length===1?[[_,.5],[p,.5]]:[[_,3/8],[p,3/8],[g[0],1/8],[g[1],1/8]];h.push(...xs(t,n,M)),c.set(f,m)}const u=[],d=[];o=0;for(const f of i){const[g,_,p]=e.slice(o,o+f);o+=f;const m=(R,C)=>c.get(R<C?`${R}:${C}`:`${C}:${R}`),M=m(g,_),S=m(_,p),T=m(p,g);u.push(3,3,3,3),d.push(g,M,T,M,_,S,T,S,p,S,T,M)}return{counts:u,indices:d,values:h}}function rv(i,e){const t=new Set(i.holeIndices??[]),n=h=>{const c=[],u=[];let d=0;for(let f=0;f<i.faceVertexCounts.length;f++){const g=i.faceVertexCounts[f];t.has(f)||(c.push(g),u.push(...h.slice(d,d+g))),d+=g}return{counts:c,indices:u}},s=n(i.faceVertexIndices);let r={counts:s.counts,indices:s.indices,values:[...i.points]},a=(i.vertexPrimvars??[]).map(h=>{const c=n(i.faceVertexIndices);return{primvar:h,level:{counts:c.counts,indices:c.indices,values:[...h.values]}}}),o=(i.fvarPrimvars??[]).map(h=>{const c=n(h.valueIndices);return{primvar:h,level:{counts:c.counts,indices:c.indices,values:[...h.values]}}});const l=(h,c)=>e===An.LOOP?sv(h.counts,h.indices,h.values,c,(i.interpolateBoundary??"edgeAndCorner")==="edgeAndCorner"):iv(h.counts,h.indices,h.values,c);for(let h=0;h<i.level;h++){const c=l(r,3);if(!c)return null;r=c,a=a.map(u=>({...u,level:l(u.level,u.primvar.elementSize)})),o=o.map(u=>({...u,level:l(u.level,u.primvar.elementSize)}))}return{faceVertexCounts:r.counts,faceVertexIndices:r.indices,points:r.values,vertexPrimvars:a.map(({primvar:h,level:c})=>({name:h.name,elementSize:h.elementSize,values:c.values})),fvarPrimvars:o.map(({primvar:h,level:c})=>({name:h.name,elementSize:h.elementSize,values:c.values,valueIndices:c.indices})),level:i.level}}class av{_refiner=null;_level=0;_counts=[];_indices=[];_fvarTopo=[];_sig="";_animating=!1;refine(e,t){const n=$_(e.scheme);if(n===null||e.level<1||e.faceVertexCounts.length===0||e.points.length===0)return null;if(n===An.LOOP||n===An.BILINEAR)return rv(e,n);const s=ov(e),r=t||s!==this._sig;if(r||!this._refiner){r||(this._animating=!0);const c=X_.Create(ev(e),{schemeType:n,schemeOptions:J_(e)});c.RefineUniform({refinementLevel:e.level});const u=c.GetLevel(e.level),{counts:d,indices:f}=tv(u,(e.holeIndices?.length??0)>0);this._refiner=c,this._level=e.level,this._counts=d,this._indices=f,this._fvarTopo=(e.fvarPrimvars??[]).map((g,_)=>({name:g.name,elementSize:g.elementSize,valueIndices:Array.from(u.GetFaceFVarValues(_))})),this._sig=s}const a=Ul(this._refiner,this._level,3,e.points),o=(e.vertexPrimvars??[]).map(c=>({name:c.name,elementSize:c.elementSize,values:Ul(this._refiner,this._level,c.elementSize,c.values)})),l=(e.fvarPrimvars??[]).map((c,u)=>({name:c.name,elementSize:c.elementSize,values:nv(this._refiner,this._level,u,c.elementSize,c.values),valueIndices:this._fvarTopo[u]?.valueIndices??[]})),h={faceVertexCounts:this._counts,faceVertexIndices:this._indices,points:a,fvarPrimvars:l,vertexPrimvars:o,level:this._level};return this._animating||(this._refiner=null),h}}function Qn(i){let e=2166136261;for(const t of i)e^=t|0,e=Math.imul(e,16777619);return`${i.length}:${e>>>0}`}function ov(i){return[i.scheme,i.level,Qn(i.faceVertexCounts),Qn(i.faceVertexIndices),i.interpolateBoundary,i.faceVaryingLinearInterpolation,i.triangleSubdivisionRule,Qn(i.creaseLengths??[]),Qn(i.creaseIndices??[]),(i.creaseSharpnesses??[]).join(","),Qn(i.cornerIndices??[]),(i.cornerSharpnesses??[]).join(","),Qn(i.holeIndices??[]),(i.fvarPrimvars??[]).map(e=>`${e.name}:${e.elementSize}:${Qn(e.valueIndices)}`).join(";")].join("|")}function cv(i,e={}){e.detach&&i.removeFromParent();const t=new Set,n=new Set,s=new Set;return i.traverse(r=>{if(!(r instanceof xt)&&!(r instanceof C_))return;t.add(r.geometry);const a=Array.isArray(r.material)?r.material:[r.material];for(const o of a)if(n.add(o),e.textures!==!1)for(const l of Object.values(o))l instanceof gt&&s.add(l)}),t.forEach(r=>r.dispose()),n.forEach(r=>r.dispose()),s.forEach(r=>r.dispose()),{geometries:t.size,materials:n.size,textures:s.size}}function Lh(i,e){const t=new Array(16).fill(0);for(let n=0;n<4;n++)for(let s=0;s<4;s++)for(let r=0;r<4;r++)t[n*4+s]+=i[n*4+r]*e[r*4+s];return t}function lv(i){const e=[];for(let t=1;t<i-1;t++)e.push([0,t,t+1]);return e}function us(i,e){const t=[];for(let n=0;n<i.length;n+=e)t.push(i.slice(n,n+e));return t}function Ht(i,e){const t=i[0]?.length??0;return Array.from({length:t},(n,s)=>i.reduce((r,a,o)=>r+a[s]*e[o],0))}function hv(i){const e=new Set;let t=0,n=0;for(let s=0;s<i.creaseLengths.length;s++){const r=i.creaseLengths[s],a=i.creaseSharpnesses.length===i.creaseLengths.length?i.creaseSharpnesses[s]:void 0;for(let o=0;o<r-1;o++){const l=a??i.creaseSharpnesses[n+o]??0,h=i.creaseIndices[t+o],c=i.creaseIndices[t+o+1];l>0&&e.add(h<c?`${h},${c}`:`${c},${h}`)}n+=Math.max(0,r-1),t+=r}return e}function Vh(i){if(i.uvs?.interpolation!=="faceVarying")return;let e=0;return i.faceVertexCounts.map(t=>{const n=Array.from({length:t},(s,r)=>{const a=e+r;return[...i.uvs.values[i.uvs.indices?.[a]??a]]});return e+=t,n})}function uv(i){const e=new Map;return i.materialSubsets?.forEach((t,n)=>t.faceIndices.forEach(s=>e.set(s,n))),e}function Lo(i,e){if(!i.materialSubsets)return;const t=uv(i);return i.materialSubsets.map((n,s)=>({...n,faceIndices:e.flatMap((r,a)=>t.get(r)===s?[a]:[])})).filter(n=>n.faceIndices.length>0)}function dv(i,e){if(i.subdivisionScheme!=="loop"||e<1)return i;let t=i.points.map(f=>[...f]),n=[],s=[],r=Vh(i);const a=[];let o=0;const l=new Set(i.holeIndices);for(let f=0;f<i.faceVertexCounts.length;f++){const g=i.faceVertexCounts[f];l.has(f)||(n.push(i.faceVertexIndices.slice(o,o+g)),s.push(f),r&&a.push(r[f])),o+=g}if(r&&(r=a),n.some(f=>f.length!==3))return i;let h=hv(i);const c=new Set(i.cornerIndices.filter((f,g)=>(i.cornerSharpnesses[g]??0)>0));for(let f=0;f<e;f++){const g=new Map,_=Array.from({length:t.length},()=>new Set);for(const[v,x,F]of n)for(const[N,I,G]of[[v,x,F],[x,F,v],[F,v,x]]){const W=N<I?`${N},${I}`:`${I},${N}`,B=g.get(W)??{a:Math.min(N,I),b:Math.max(N,I),opposite:[]};B.opposite.push(G),g.set(W,B),_[N].add(I),_[I].add(N)}const p=Array.from({length:t.length},()=>[]);for(const[v,x]of g)(x.opposite.length===1||h.has(v))&&(p[x.a].push(x.b),p[x.b].push(x.a));const m=t.map((v,x)=>{const F=p[x];if(c.has(x)||F.length>2)return[...v];if(F.length===2)return Ht([v,t[F[0]],t[F[1]]],[.75,.125,.125]);const N=[..._[x]];if(N.length===0)return[...v];const I=N.length===3?3/16:3/(8*N.length);return Ht([v,...N.map(G=>t[G])],[1-N.length*I,...N.map(()=>I)])}),M=new Map,S=new Set,T=[...m];for(const[v,x]of g){const F=x.opposite.length===1||h.has(v),N=F?Ht([t[x.a],t[x.b]],[.5,.5]):Ht([t[x.a],t[x.b],t[x.opposite[0]],t[x.opposite[1]]],[.375,.375,.125,.125]),I=T.length;T.push(N),M.set(v,I),F&&(S.add(`${x.a},${I}`),S.add(`${x.b},${I}`))}const R=(v,x)=>M.get(v<x?`${v},${x}`:`${x},${v}`),C=[],A=[],b=[];for(let v=0;v<n.length;v++){const[x,F,N]=n[v],I=R(x,F),G=R(F,N),W=R(N,x);if(C.push([x,I,W],[F,G,I],[N,W,G],[I,G,W]),A.push(s[v],s[v],s[v],s[v]),r){const[B,j,k]=r[v],se=Ht([B,j],[.5,.5]),ae=Ht([j,k],[.5,.5]),de=Ht([k,B],[.5,.5]);b.push([B,se,de],[j,ae,se],[k,de,ae],[se,ae,de])}}t=T,n=C,s=A,h=S,r&&(r=b)}const u=Lo(i,s),d={...i,points:t,faceVertexCounts:n.map(()=>3),faceVertexIndices:n.flat(),subdivisionScheme:"none",holeIndices:[],...u?{materialSubsets:u}:{},...r?{uvs:{name:i.uvs.name,values:r.flat(),interpolation:"faceVarying"}}:{}};return delete d.normals,delete d.normalsInterpolation,!r&&d.uvs&&delete d.uvs,d}function fv(i,e){if(i.subdivisionScheme!=="bilinear"||e<1)return i;let t=i.points.map(u=>[...u]),n=[],s=[],r=Vh(i);const a=[];let o=0;const l=new Set(i.holeIndices);i.faceVertexCounts.forEach((u,d)=>{l.has(d)||(n.push(i.faceVertexIndices.slice(o,o+u)),s.push(d),r&&a.push(r[d])),o+=u}),r&&(r=a);for(let u=0;u<e;u++){const d=new Map,f=t.map(M=>[...M]),g=(M,S)=>{const T=M<S?`${M},${S}`:`${S},${M}`,R=d.get(T);if(R!==void 0)return R;const C=f.length;return f.push(Ht([t[M],t[S]],[.5,.5])),d.set(T,C),C},_=[],p=[],m=[];n.forEach((M,S)=>{const T=f.length;f.push(Ht(M.map(A=>t[A]),M.map(()=>1/M.length)));const R=r?.[S],C=R&&Ht(R,R.map(()=>1/R.length));M.forEach((A,b)=>{const v=(b+1)%M.length,x=(b+M.length-1)%M.length;_.push([A,g(A,M[v]),T,g(M[x],A)]),p.push(s[S]),R&&C&&m.push([R[b],Ht([R[b],R[v]],[.5,.5]),C,Ht([R[x],R[b]],[.5,.5])])})}),t=f,n=_,s=p,r&&(r=m)}const h=Lo(i,s),c={...i,points:t,faceVertexCounts:n.map(u=>u.length),faceVertexIndices:n.flat(),subdivisionScheme:"none",holeIndices:[],...h?{materialSubsets:h}:{},...r?{uvs:{name:i.uvs.name,values:r.flat(),interpolation:"faceVarying"}}:{}};return delete c.normals,delete c.normalsInterpolation,!r&&c.uvs&&delete c.uvs,c}function pv(i,e){if(i.subdivisionScheme!=="catmullClark"||e<1)return i;const t=[],n=[];i.uvs?.interpolation==="faceVarying"?t.push({name:"st",elementSize:2,values:i.uvs.values.flat(),valueIndices:i.uvs.indices??i.faceVertexIndices.map((g,_)=>_)}):i.uvs&&(i.uvs.interpolation==="vertex"||i.uvs.interpolation==="varying")&&n.push({name:"st",elementSize:2,values:i.uvs.values.flat()}),i.normals?.length&&i.normalsInterpolation==="faceVarying"?t.push({name:"normals",elementSize:3,values:i.normals.flat(),valueIndices:i.faceVertexIndices.map((g,_)=>_)}):i.normals?.length&&(i.normalsInterpolation==="vertex"||i.normalsInterpolation==="varying")&&n.push({name:"normals",elementSize:3,values:i.normals.flat()});const s=new av().refine({faceVertexCounts:i.faceVertexCounts,faceVertexIndices:i.faceVertexIndices,points:i.points.flat(),scheme:i.subdivisionScheme,level:e,interpolateBoundary:i.interpolateBoundary,faceVaryingLinearInterpolation:i.faceVaryingLinearInterpolation,triangleSubdivisionRule:i.triangleSubdivisionRule,creaseIndices:i.creaseIndices,creaseLengths:i.creaseLengths,creaseSharpnesses:i.creaseSharpnesses,cornerIndices:i.cornerIndices,cornerSharpnesses:i.cornerSharpnesses,holeIndices:i.holeIndices,fvarPrimvars:t,vertexPrimvars:n},!0);if(!s)return i;const r=s.fvarPrimvars.find(g=>g.name==="st"),a=s.vertexPrimvars.find(g=>g.name==="st"),o=s.fvarPrimvars.find(g=>g.name==="normals"),l=s.vertexPrimvars.find(g=>g.name==="normals"),h=new Set(i.holeIndices);let c=i.faceVertexCounts.flatMap((g,_)=>h.has(_)?[]:[_]),u=i.faceVertexCounts.filter((g,_)=>!h.has(_));for(let g=0;g<e;g++)c=c.flatMap((_,p)=>Array(u[p]).fill(_)),u=Array(c.length).fill(4);const d=Lo(i,c),f={...i,points:us(s.points,3),faceVertexCounts:s.faceVertexCounts,faceVertexIndices:s.faceVertexIndices,holeIndices:[],subdivisionScheme:"none",...d?{materialSubsets:d}:{},...r?{uvs:{name:"st",values:us(r.values,2),indices:r.valueIndices,interpolation:"faceVarying"}}:a?{uvs:{name:"st",values:us(a.values,2),interpolation:"vertex"}}:{},...o?{normals:us(o.values,3),normalsInterpolation:"faceVarying"}:l?{normals:us(l.values,3),normalsInterpolation:"vertex"}:{}};return!o&&!l&&(delete f.normals,delete f.normalsInterpolation),f}function Dh(i,e=2){const t=fv(pv(dv(i,e),e),e),n=[],s=[],r=[],a=[],o=[],l=new Set(t.holeIndices),h=new Map;t.materialSubsets?.forEach((d,f)=>d.faceIndices.forEach(g=>h.set(g,f+1)));let c=0;for(let d=0;d<t.faceVertexCounts.length;d++){const f=t.faceVertexCounts[d];if(l.has(d)){c+=f;continue}const g=t.faceVertexIndices.slice(c,c+f),_=lv(f).map(([p,m,M])=>t.orientation==="leftHanded"?[p,M,m]:[p,m,M]);for(const[p,m,M]of _){const S=n.length/3;for(const T of[p,m,M]){const R=g[T],C=t.points[R];if(n.push(C[0],C[1],C[2]),s.push(R),t.normals){const A=t.normalsInterpolation==="constant"?0:t.normalsInterpolation==="uniform"?d:t.normalsInterpolation==="faceVarying"?c+T:R,b=t.normals[A];r.push(b[0],b[1],b[2])}if(t.uvs){const A=t.uvs.interpolation==="constant"?0:t.uvs.interpolation==="uniform"?d:t.uvs.interpolation==="faceVarying"?c+T:R,b=t.uvs.indices?.[A]??A,v=t.uvs.values[b];a.push(v[0],v[1])}}o.push([S,3,h.get(d)??0])}c+=f}const u=new Rn;u.userData.sourcePointIndices=s,u.setAttribute("position",new Wt(n,3)),r.length?u.setAttribute("normal",new Wt(r,3)):u.computeVertexNormals(),a.length&&u.setAttribute("uv",new Wt(a,2));for(const[d,f,g]of o)u.addGroup(d,f,g);return u}function Aa(i,e=i.material){const t=new gs({color:new ze(...e?.diffuseColor??[.8,.8,.8]),roughness:e?.roughness??1,metalness:e?.metallic??0,side:i.doubleSided?an:wn,opacity:e?.opacity??1,transparent:(e?.opacity??1)<1||!!e?.textures?.opacity});return t.userData.usdMaterial=e,t}function Nh(i){return i.materialSubsets?.length?[Aa(i),...i.materialSubsets.map(e=>Aa(i,e.material))]:Aa(i)}async function mv(i){if(typeof createImageBitmap!="function"||typeof Blob!="function")throw new Error("The default texture resolver requires Blob and createImageBitmap; inject a TextureResolver in this environment");const{readAsset:e}=await R_(async()=>{const{readAsset:r}=await import("./internal-BLXwJMNQ.js");return{readAsset:r}},[]),t=await e(i.resolvedPath),n=await createImageBitmap(new Blob([t]),{imageOrientation:"flipY",colorSpaceConversion:"none",premultiplyAlpha:"none"}),s=new gt(n);return s.needsUpdate=!0,s}function Ol(i){return i==="repeat"?Er:i==="mirror"?Mr:zn}function Bl(i,e,t){i.wrapS=Ol(e.wrapS),i.wrapT=Ol(e.wrapT),i.repeat.set(...e.uvScale),i.offset.set(...e.uvTranslation),i.colorSpace=t&&e.sourceColorSpace!=="raw"?Gt:Tn,i.needsUpdate=!0}function ps(i){return[i.resolvedPath,i.sourceColorSpace,i.wrapS,i.wrapT,i.uvPrimvar,i.uvScale.join(","),i.uvTranslation.join(",")].join("|")}async function gv(i,e=mv){const t=new Map(i.map(r=>[ps(r),r])),n=new Map,s=new Map;return await Promise.all([...t].map(async([r,a])=>{const o=await e(a),l=o.clone();l.image=o.image,Bl(l,a,!0),n.set(r,l);const h=o.clone();h.image=o.image,Bl(h,a,!1),s.set(r,h)})),{color:n,data:s,dispose(){for(const r of new Set([...n.values(),...s.values()]))r.dispose();n.clear(),s.clear()}}}function _v(i,e={}){const t=new xt(Dh(i,e.subdivisionLevel),Nh(i));return t.name=i.path,t.matrix.fromArray(i.worldMatrix),t.matrixAutoUpdate=!1,t.visible=i.visible,t}function vv(i){return new U(0,0,-1).transformDirection(new Qe().fromArray(i)).normalize()}function Uh(i,e){i.position.copy(vv(e).multiplyScalar(-1)),i.target.position.set(0,0,0)}function xv(i){if(i.type==="rect")throw new Error("UNSUPPORTED_RECT_LIGHT: this adapter does not implement the rectangle profile");const e=i.type==="distant"?new Es(new ze(...i.color),i.intensity):new Fh(new ze(...i.color),i.intensity);return e.name=i.path,e.visible=i.visible,e instanceof Es&&Uh(e,i.worldMatrix),e}function Sv(i,e,t,n={}){const s=new ai;s.name=i.path,s.visible=i.visible;for(let r=0;r<i.prototypes.length;r++){const a=i.prototypes[r],o=e.get(a);if(!o)continue;const l=i.instanceWorldMatrices.filter((h,c)=>i.protoIndices[c]===r);l.length!==0&&o.components.forEach((h,c)=>{const u=t.get(h.meshPath);if(!u)return;const d=new Ah(Dh(u,n.subdivisionLevel),Nh(u),l.length);d.name=`${i.path}#${r}:${c}`,d.matrixAutoUpdate=!1,d.frustumCulled=!1,d.userData.prototypeIndex=r,d.userData.meshPath=h.meshPath,d.userData.prototypeRelativeMatrix=h.prototypeRelativeMatrix,d.visible=h.visible,l.forEach((f,g)=>d.setMatrixAt(g,new Qe().fromArray(Lh(h.prototypeRelativeMatrix,f)))),d.instanceMatrix.needsUpdate=!0,s.add(d)})}return s}function Ev(i,e={}){if(i.lights.some(o=>o.type==="rect"))throw new Error("UNSUPPORTED_RECT_LIGHT: this adapter does not implement the rectangle profile");const t=new ai;i.stage.upAxis==="Z"&&(t.rotation.x=-Math.PI/2),t.userData.usdUpAxis=i.stage.upAxis;const n=new Map(i.meshes.map(o=>[o.path,o])),s=new Map(i.prototypes.map(o=>[o.path,o])),r=i.prototypes.map(o=>o.path),a=o=>r.some(l=>o===l||o.startsWith(`${l}/`));for(const o of i.meshes)a(o.path)||t.add(_v(o,e));for(const o of i.pointInstancers)t.add(Sv(o,s,n,e));for(const o of i.lights){const l=xv(o);t.add(l),l instanceof Es&&t.add(l.target)}return t}function Mv(i){const e=new Map;return i.traverse(t=>{t.name&&e.set(t.name,t)}),e}function yv(i,e,t={}){for(const n of e.meshes){const s=i.get(n.path);if(s){if(n.worldMatrix&&s.matrix.fromArray(n.worldMatrix),n.visible!==void 0&&(s.visible=n.visible),n.displayColor&&s instanceof xt){const r=Array.isArray(s.material)?s.material:[s.material];for(const a of r)a instanceof gs&&a.color.setRGB(...n.displayColor)}if(n.material&&s instanceof xt){const r=Array.isArray(s.material)?s.material:[s.material];for(const a of r){if(!(a instanceof gs))continue;const o=a.map,l=a.alphaMap,h=a.transparent,c=n.material.textures?.diffuseColor,u=n.material.textures?.opacity,d=!!c&&!!u&&u.sourceOutput==="a"&&ps(c)===ps(u);if(c){const _=t.dynamicTextures?.color.get(ps(c));_&&(a.map=_),a.color.setRGB(1,1,1)}else a.map=null,a.color.setRGB(...n.material.diffuseColor);if(u&&!d){const _=t.dynamicTextures?.data.get(ps(u));_&&(a.alphaMap=_)}else a.alphaMap=null;const f=u&&!d&&["r","g","b","a"].includes(u.sourceOutput)?u.sourceOutput:"g";a.userData.usdDynamicOpacityChannel!==f&&(a.userData.usdDynamicOpacityChannel=f,a.onBeforeCompile=_=>{_.fragmentShader=_.fragmentShader.replace("texture2D( alphaMap, vAlphaMapUv ).g",`texture2D( alphaMap, vAlphaMapUv ).${f}`)},a.customProgramCacheKey=()=>`dynamic-opacity:${f}`,a.needsUpdate=!0),a.roughness=n.material.roughness??1,a.metalness=n.material.metallic??0;const g=typeof a.userData.usdDisplayOpacity=="number"?a.userData.usdDisplayOpacity:1;a.opacity=(n.material.opacity??1)*g,a.transparent=a.opacity<1||!!u,a.userData.usdMaterial=n.material,(a.map!==o||a.alphaMap!==l||a.transparent!==h)&&(a.needsUpdate=!0)}}if(n.displayOpacity!==void 0&&s instanceof xt){const r=Array.isArray(s.material)?s.material:[s.material];for(const a of r){if(!(a instanceof gs))continue;const o=a.transparent;a.userData.usdDisplayOpacity=n.displayOpacity;const l=a.userData.usdMaterial?.opacity??1;a.opacity=l*n.displayOpacity,a.transparent=a.opacity<1||!!a.alphaMap||!!a.userData.usdMaterial?.textures?.opacity,a.transparent!==o&&(a.needsUpdate=!0)}}}}for(const n of e.lights){const s=i.get(n.path);if(n.type==="distant"&&!(s instanceof Es)||n.type==="dome"&&!(s instanceof Fh))continue;const r=s;r.color.setRGB(...n.color),r.intensity=n.intensity,r.visible=n.visible,r instanceof Es&&Uh(r,n.worldMatrix)}for(const n of e.pointInstancers){const s=i.get(n.path);if(s instanceof ai&&(n.visible!==void 0&&(s.visible=n.visible),!(!n.instanceWorldMatrices||!n.protoIndices)))for(const r of s.children){if(!(r instanceof Ah))continue;const a=r,o=a.userData.prototypeIndex,l=a.userData.meshPath,h=n.prototypeComponents?.find(d=>d.prototypeIndex===o&&d.meshPath===l),c=h?.prototypeRelativeMatrix??a.userData.prototypeRelativeMatrix;a.userData.prototypeRelativeMatrix=c,h&&(a.visible=h.visible),n.instanceWorldMatrices.filter((d,f)=>n.protoIndices[f]===o).forEach((d,f)=>a.setMatrixAt(f,new Qe().fromArray(Lh(c,d)))),a.instanceMatrix.needsUpdate=!0}}}let Tv=0;const hr=()=>new DOMException("Merge preparation disposed","AbortError");class Cv{constructor(e,t){this.worker=e,this.onCommit=t;const n=performance.now();e.onmessage=s=>{const r=s.data;if(r.id===0&&!this.disposed){this.stats.startupObservedMs=performance.now()-n;return}if(this.disposed||r.generation!==this.generation)return;const a=this.pending.get(r.id);a&&(this.pending.delete(r.id),r.error?a.reject(new Error(r.error)):a.resolve(r))},e.onerror=s=>this.dispose(new Error(s.message||"Merge worker failed"))}generation=++Tv;revision=1;committedRevision=0;id=0;disposed=!1;pending=new Map;authors=Promise.resolve();sampleInFlight=!1;sampleSequence=0;latest;stats={sampleRequests:0,supersededSamples:0,maxPendingSamples:0,lastResponseMs:0,startupObservedMs:0};request(e,t){if(this.disposed)return Promise.reject(hr());const n=performance.now(),s=++this.id;return new Promise((r,a)=>{this.pending.set(s,{resolve:r,reject:a});try{this.worker.postMessage({...e,id:s,generation:this.generation,revision:t})}catch(o){this.pending.delete(s),a(o)}}).then(r=>(this.stats.lastResponseMs=performance.now()-n,r))}prepare(e){return this.request({type:"prepare",timeline:e,time:e.startTimeCode},1).then(t=>(this.committedRevision=t.revision,t))}mutate(e){const t=++this.revision;++this.sampleSequence;const n=this.authors.then(()=>this.request(e,t)).then(s=>(this.committedRevision=s.revision,this.onCommit(s,t===this.revision),s));return this.authors=n.catch(s=>{throw this.dispose(s),s}),this.authors.catch(()=>{}),n}async inspect(){for(;!this.disposed;){await this.authors;const e=this.revision,t=await this.request({type:"inspect"},e);if(e===this.revision)return t}throw hr()}sampleLatest(e){if(this.disposed)return Promise.reject(hr());if(!Number.isFinite(e))return Promise.reject(new Error("Sample time must be finite"));const t=++this.sampleSequence;return new Promise((n,s)=>{this.latest&&(this.latest.resolve(void 0),this.stats.supersededSamples++),this.latest={time:e,sequence:t,resolve:n,reject:s},this.stats.maxPendingSamples=Math.max(this.stats.maxPendingSamples,this.sampleInFlight?2:1),this.pump()})}async pump(){if(this.sampleInFlight||!this.latest||this.disposed)return;this.sampleInFlight=!0;const e=this.latest;this.latest=void 0;try{if(await this.authors,e.sequence!==this.sampleSequence)e.resolve(void 0),this.stats.supersededSamples++;else{const t=this.revision;this.stats.sampleRequests++;const n=await this.request({type:"sample",time:e.time},t);t!==this.revision||e.sequence!==this.sampleSequence?(this.stats.supersededSamples++,e.resolve(void 0)):e.resolve(n)}}catch(t){e.reject(t)}finally{this.sampleInFlight=!1,this.pump()}}dispose(e=hr()){if(!this.disposed){this.disposed=!0,this.worker.terminate(),this.worker.onmessage=null,this.worker.onerror=null;for(const t of this.pending.values())t.reject(e);this.pending.clear(),this.latest?.reject(e),this.latest=void 0}}}const bv="/World/Effects/CameraMotion",uo=["pink","red","orange","yellow","green","teal","blue","purple","black","white"];function Av(i){return`/Balls/${uo[Math.min(Math.max(i,0),uo.length-1)]}.png`}function wv(i){const e=Av(i);return{assetPath:e,resolvedPath:e,sourceColorSpace:"sRGB",wrapS:"clamp",wrapT:"clamp",sourceOutput:"rgb",uvPrimvar:"st",uvScale:[1,1],uvTranslation:[0,0]}}function Fv(i,e){for(const t of e){const n=i.get(t.path);if(!(n instanceof xt)||t.path.endsWith("/PowerGlow")&&!t.displayColor||t.path.startsWith("/World/Pieces/")&&!t.path.endsWith("/PowerGlow")&&!t.material||t.path.startsWith("/World/Effects/Particles/")&&!t.displayColor)continue;const s=Array.isArray(n.material)?n.material:[n.material];for(const r of s)if(r instanceof gs){if(t.path.endsWith("/PowerGlow"))r.emissive.copy(r.color);else if(t.path.startsWith("/World/Pieces/"))r.emissiveMap!==r.map&&(r.emissiveMap=r.map,r.needsUpdate=!0),r.emissive.setRGB(1,1,1);else if(t.path.startsWith("/World/Effects/Particles/"))r.emissive.copy(r.color);else continue;r.color.setRGB(0,0,0),r.toneMapped=!1}}}function Rv(i,e){const t=e.meshes.find(n=>n.path===bv);t?.worldMatrix&&i.position.set(t.worldMatrix[12]??0,t.worldMatrix[13]??0,0)}async function Pv(i,e={}){e.signal?.throwIfAborted();const t=new AbortController;let n,s,r,a=!1,o=0,l=i.startTimeCode,h,c;const u=new Set,d=new Set,f=new Map;let g,_;const p={createMs:0,bakeMs:0,indexMs:0,lastAuthorMs:0,workerResponseMs:0,conversionMs:0,textureMs:0,adapterMs:0,readyMs:0,textures:[]};function m(b,v,x){if(!(a||!n||!r)){if(b.rebakeReasons.length)throw new Error("Merge requires a fresh scene bake");yv(r,b,{dynamicTextures:s}),Fv(r,b.meshes),Rv(n,b),o=v,l=x}}function M(b,v){if(b.sample){for(const x of b.sample.meshes)f.set(x.path,{...f.get(x.path),...x});g=b.sample,_=b.time}!v||a||(h=b.authored,c=b.stats,Object.assign(p,b.timing),g?m({...g,meshes:[...f.values()]},b.revision,b.time??_??l):o=b.revision,f.clear(),g=void 0,_=void 0)}const S=performance.now();e.onPhase?.("worker");const T=new Cv(e.workerFactory?.()??new Worker(new URL("/s/merge/assets/stageWorker-nlwVnMtK.js",import.meta.url),{type:"module"}),M);function R(){if(!a){a=!0,t.abort(),e.signal?.removeEventListener("abort",R),T.dispose(),n&&cv(n,{detach:!0,textures:!1}),s?.dispose();for(const b of d)b.dispose();for(const b of u)b.close();d.clear(),u.clear(),f.clear(),e.onPhase?.("disposed")}}e.signal?.addEventListener("abort",R,{once:!0});function C(){t.signal.throwIfAborted()}async function A(b){const v=performance.now(),x=await fetch(Ts(b.assetPath),{signal:t.signal});if(!x.ok)throw new Error(`Unable to load Merge ball art: ${b.assetPath}`);const F=await x.blob(),N=performance.now()-v,I=performance.now(),G=await createImageBitmap(F,{imageOrientation:"flipY",colorSpaceConversion:"none",premultiplyAlpha:"none"});p.textures.push({asset:b.assetPath,fetchMs:N,decodeMs:performance.now()-I}),a&&(G.close(),C()),u.add(G);const W=new gt(G);return W.needsUpdate=!0,d.add(W),W}try{const b=await T.prepare(i);C(),p.workerResponseMs=performance.now()-S,Object.assign(p,b.timing),h=b.authored,c=b.stats;const v=b.graph;e.onPhase?.("conversion"),C();const x=performance.now();n=Ev(v,{subdivisionLevel:0}),r=Mv(n),p.conversionMs=performance.now()-x,e.onPhase?.("textures"),C();const F=performance.now();if(typeof createImageBitmap=="function"){const N=uo.map((B,j)=>wv(j)),I=await Promise.all(N.map(A));C();const G=new Map(N.map((B,j)=>[B.assetPath,I[j]])),W=await gv(N,async B=>G.get(B.assetPath));a&&(W.dispose(),C()),s=W}return C(),p.textureMs=performance.now()-F,p.adapterMs=p.conversionMs+p.textureMs,m(b.sample,b.revision,b.time),p.readyMs=performance.now()-S,e.onPhase?.("ready"),C(),{root:n,graph:v,objectIndex:r,timing:p,get preparedTextures(){return s?[...s.color.values(),...s.data.values()]:[]},get authored(){return h},get revision(){return T.revision},get committedRevision(){return T.committedRevision},get presentationRevision(){return o},get presentationTime(){return l},get stats(){return{index:c,transport:T.stats}},author(N){return T.mutate({type:"author",timeline:N,time:N.startTimeCode})},setScreen(N){return T.mutate({type:"screen",screen:N})},async sampleLatest(N){const I=await T.sampleLatest(N);if(!(!I||a||I.revision!==T.revision))return c=I.stats,m(I.sample,I.revision,I.time),I},async inspect(){return(await T.inspect()).inspection},dispose:R}}catch(b){throw R(),b}}class Iv{constructor(e,t){this.host=e,this.onPerformance=t,this.renderer=new x_({antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.outputColorSpace=Gt,this.renderer.toneMapping=jl,this.renderer.toneMappingExposure=1.15,this.renderer.domElement.setAttribute("aria-label","USD-rendered Merge board"),this.host.append(this.renderer.domElement),this.camera.position.set(0,1,14),this.camera.lookAt(0,1,0),this.observer=new ResizeObserver(()=>this.resize()),this.observer.observe(e),this.resize()}renderer;scene=new S_;camera=new Fo(-3.7,3.7,4.35,-4.35,.1,100);stage;observer;preparationTiming={textureUploadSubmissionMs:0,compileSubmissionMs:0,firstDrawSubmissionMs:0};previousPresentation=0;reportStarted=0;frameDurations=[];install(e){this.stage&&(this.scene.remove(this.stage.root),this.stage.dispose()),this.stage=e,this.scene.add(e.root);let t=performance.now();for(const n of e.preparedTextures??[])this.renderer.initTexture(n);this.preparationTiming.textureUploadSubmissionMs=performance.now()-t,t=performance.now(),this.renderer.compile(this.scene,this.camera),this.preparationTiming.compileSubmissionMs=performance.now()-t,t=performance.now(),this.present(),this.preparationTiming.firstDrawSubmissionMs=performance.now()-t}destroy(){this.observer.disconnect(),this.stage?.dispose(),this.renderer.dispose()}beginAnimation(){this.previousPresentation=0,this.reportStarted=performance.now(),this.frameDurations=[]}present(e=performance.now()){if(this.previousPresentation>0){const t=e-this.previousPresentation;t>0&&t<100?(this.frameDurations.push(t),this.frameDurations.length>60&&this.frameDurations.shift()):(this.frameDurations=[],this.reportStarted=e)}if(this.previousPresentation=e,this.renderer.render(this.scene,this.camera),this.onPerformance&&e-this.reportStarted>=120&&this.frameDurations.length>0){const t=this.frameDurations.reduce((n,s)=>n+s,0)/this.frameDurations.length;this.onPerformance(1e3/t,t),this.reportStarted=e}}resize(){const e=Math.max(1,this.host.clientWidth),t=Math.max(1,this.host.clientHeight);this.renderer.setSize(e,t,!1);const n=e/t,s=7.4,r=9.2,a=s/r;if(n>a){const o=r*n/2;this.camera.left=-o,this.camera.right=o,this.camera.top=r/2,this.camera.bottom=-r/2}else{const o=s/n/2;this.camera.left=-s/2,this.camera.right=s/2,this.camera.top=o,this.camera.bottom=-o}this.camera.updateProjectionMatrix(),this.present()}}const Oh=["pink","red","orange","yellow","green","teal","blue","purple","black","white"],Lv=Oh.map((i,e)=>`<img src="${Ts(`/Balls/${i}.png`)}" alt="${e+1}" width="36" height="36">`).join(""),Vv=document.querySelector("#app");Vv.innerHTML=`
  <main class="shell">

    <section class="workspace">
      <section class="game-card" aria-label="Merge game">
        <section id="menu-screen" class="menu-screen" aria-label="Merge main menu">
          <h2 class="menu-title">MERGE</h2>
          <div class="menu-choices">
            <button class="menu-choice" data-mode="classic">
              <strong>Classic</strong><span>Empty Board How Long Can You Last?</span>
            </button>
            <button class="menu-choice" data-mode="daily">
              <strong>Daily</strong><span>New Challenge Every Day!</span>
            </button>
            <p id="daily-countdown" class="daily-countdown">00:00:00</p>
            <button id="show-game-modes" class="menu-choice">
              <strong>Game Modes</strong><span>Like Daily but with a twist!</span>
            </button>
          </div>
          <nav class="compact-menu" aria-label="Additional menu options">
            <button id="show-feedback">Feedback</button>
            <div class="app-only-leaderboard">
              <span class="app-only-label">Leaderboard <small>App only</small></span>
              <a class="app-store-badge" href="https://apps.apple.com/us/app/merge-by-bubbl/id1465013487" target="_blank" rel="noopener"><img src="${Yo}" alt="Download on the App Store" height="40"></a>
            </div>
            <button id="show-settings">Settings</button>
          </nav>
          <p id="menu-status" class="menu-status" role="status"></p>
        </section>

        <section id="mode-screen" class="mode-screen" aria-label="Merge game modes" hidden>
          <h2>Game Modes</h2>
          <p>All Game Modes Reset In: <span id="mode-countdown">00:00:00</span></p>
          <div class="mode-choices">
            <button class="menu-choice" data-mode="powerUp">
              <strong>Power Up</strong><span>Like Daily but with a twist!</span>
            </button>
            <button class="menu-choice" data-mode="shotClock">
              <strong>Shot Clock</strong><span>Longer you play, less time to think</span>
            </button>
            <button class="menu-choice" data-mode="timer">
              <strong>Timer</strong><span>Score as much as you can in 2 minutes</span>
            </button>
          </div>
          <button id="modes-menu" class="native-outline-button">Menu</button>
        </section>

        <section id="feedback-screen" class="simple-screen" aria-label="Feedback" hidden>
          <h2>Feedback</h2>
          <p class="thanks">Thank you so much for playing!<br><br>—Andy</p>
          <p>Found a bug or have an idea?<br>Send me an email.</p>
          <a class="menu-choice email-button" href="mailto:me@andrew.beer">
            <strong>Email Andy</strong><span>me@andrew.beer</span>
          </a>
          <button class="native-outline-button return-menu">Menu</button>
        </section>

        <section id="settings-screen" class="simple-screen settings-screen" aria-label="Settings" hidden>
          <h2>Settings</h2>
          <p class="game-center-note">Game Center provides your leaderboard name in the native app.</p>
          <button id="drop-speed" class="native-outline-button drop-speed-setting">Drop Speed: Normal</button>
          <h3>Sound Settings</h3>
          <div class="volume-settings">
            <div class="volume-row">
              <span>Music</span><button id="music-down" aria-label="Lower music volume">−</button>
              <strong id="music-volume">20%</strong><button id="music-up" aria-label="Raise music volume">+</button>
            </div>
            <div class="volume-row">
              <span>Sound FX</span><button id="effects-down" aria-label="Lower sound effects volume">−</button>
              <strong id="effects-volume">25%</strong><button id="effects-up" aria-label="Raise sound effects volume">+</button>
            </div>
          </div>
          <div class="settings-actions">
            <button id="reset-settings" class="native-outline-button">Reset</button>
            <button class="native-outline-button return-menu">Menu</button>
          </div>
        </section>

        <section id="game-over-screen" class="simple-screen game-over-screen" aria-label="Game over" hidden>
          <h2>Game Over</h2>
          <p>Your Score</p>
          <strong id="final-score">0</strong>
          <p class="web-score-note">Score saved locally</p>
          <div class="game-over-actions">
            <button id="play-again" class="menu-choice"><strong>Play Again</strong></button>
            <div class="app-only-leaderboard game-over-leaderboard">
              <span class="app-only-label">Leaderboard <small>App only</small></span>
              <a class="app-store-badge" href="https://apps.apple.com/us/app/merge-by-bubbl/id1465013487" target="_blank" rel="noopener"><img src="${Yo}" alt="Download on the App Store" height="40"></a>
            </div>
            <button class="menu-choice return-menu"><strong>Menu</strong></button>
          </div>
        </section>

        <section id="play-screen" class="play-screen" hidden>
          <div class="game-stats">
            <div><span>Score</span><strong id="score">0</strong></div>
            <div class="help-stat"><button id="show-help">Help</button></div>
            <div class="next-stat"><span>Next</span><div id="next-pieces" class="next-pieces"></div></div>
          </div>
          <div id="viewport" class="viewport">
            <div class="fps-badge" aria-label="Render performance" hidden>
              <strong id="fps-value">— FPS</strong><span id="frame-ms">— ms</span>
            </div>
            <div id="loading" class="loading visible"><span></span>Creating one persistent USD stage</div>
          </div>
          <div class="color-legend" aria-label="Ball color levels">${Lv}</div>
          <p class="keyboard-help">← → &nbsp;Move&nbsp;&nbsp;&nbsp;&nbsp; ↑ &nbsp;Rotate&nbsp;&nbsp;&nbsp;&nbsp; ↓ &nbsp;Place</p>
          <div id="mode-hud" class="mode-hud" hidden>
            <button id="trash" class="trash-control" hidden><img src="${Ts("/Art/TrashCan2.png")}" alt="Discard current pieces"><strong id="trash-amount">1</strong></button>
            <span id="mode-label"></span><strong id="mode-value"></strong>
          </div>
          <button id="menu" class="native-text-button">Menu</button>
          <div id="game-modal" class="game-modal" hidden>
            <div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modal-title">
              <h2 id="modal-title"></h2>
              <div id="modal-content"></div>
              <div id="modal-actions" class="modal-actions"></div>
            </div>
          </div>
        </section>
      </section>

      <aside id="usd-inspector" class="inspector" aria-label="USD stage inspector">
        <div class="inspector-heading">
          <div>
            <p class="eyebrow">Live presentation source · <span id="runtime-status">Choose a mode</span></p>
            <h2>USD Stage</h2>
          </div>
          <div class="inspector-actions">
            <button id="cascade" title="Load and play four successive merges">Merge demo</button>
            <button id="restart" title="Restart the current game">Restart</button>
            <button id="copy-usd" title="Copy USDA source">Copy</button>
            <button id="download-usd" title="Download USDA source">Save .usda</button>
          </div>
        </div>

        <div class="pipeline">
          <div><span>Once</span><strong>create → bake</strong></div>
          <b>›</b>
          <div><span>Game loop</span><strong>USD value samples</strong></div>
          <b>›</b>
          <div><span>Render</span><strong>stable Three objects</strong></div>
        </div>

        <section class="timeline-panel">
          <div class="timeline-title">
            <div><span>USD time code</span><strong id="time-code">0.00</strong></div>
            <div class="timeline-state"><i></i><span id="segment-name">ready</span></div>
          </div>
          <input id="timeline" type="range" min="0" max="1" value="0" step="0.01" aria-label="USD time code" />
          <div class="timeline-footer">
            <span id="timeline-start">0</span>
            <button id="replay">Replay authored timeline</button>
            <span id="timeline-end">1</span>
          </div>
        </section>

        <dl class="stage-metrics">
          <div><dt>Prims</dt><dd id="prim-count">—</dd></div>
          <div><dt>Meshes</dt><dd id="mesh-count">—</dd></div>
          <div><dt>Hot paths</dt><dd id="dynamic-count">—</dd></div>
          <div><dt>USD sample</dt><dd id="sample-cost">—</dd></div>
          <div><dt>Diagnostics</dt><dd id="diagnostic-count">—</dd></div>
        </dl>

        <div class="tabbar" role="tablist">
          <button class="tab active" data-tab="source" role="tab">USDA source</button>
          <button class="tab" data-tab="tree" role="tab">Prim tree</button>
          <span id="stage-size"></span>
        </div>
        <div class="code-panel">
          <pre id="source-view" tabindex="0"></pre>
          <div id="tree-view" class="tree-view" hidden></div>
        </div>
        <p id="pipeline-timing" class="pipeline-timing"></p>
      </aside>
    </section>
  </main>
`;const le=i=>document.querySelector(`#${i}`),Dv=document.querySelector(".shell"),Lr=le("usd-inspector"),Vo=le("menu-screen"),Bh=le("mode-screen"),Do=le("feedback-screen"),No=le("settings-screen"),zh=le("game-over-screen"),Rs=le("play-screen"),Vr=le("menu-status"),Nv=le("score"),Uv=le("next-pieces"),es=le("runtime-status"),Ov=le("loading"),Gn=le("source-view"),Gh=le("tree-view"),Gi=le("timeline"),Bv=le("time-code"),zv=le("segment-name"),zl=le("fps-value"),Gv=le("frame-ms"),Hv=le("mode-hud"),wa=le("mode-label"),Li=le("mode-value"),Gl=le("trash"),kv=le("trash-amount"),ys=le("game-modal"),nt=new eu,Uo=new Iv(le("viewport"),(i,e)=>{zl.textContent=`${Math.round(i)} FPS`,Gv.textContent=`${e.toFixed(1)} ms`,zl.classList.toggle("slow",i<48)}),Wv=[...document.querySelectorAll(".game-card button:not(.unavailable), .inspector-actions button")],Xv=[Vo,Bh,Do,No,zh,Rs];let ke=new Oe("classic"),bt="classic",Se,yt=!1,Bn=0,Hl="",kl=0,fo=0,po=0,mo=!1,Wl=0,Ot=0,Ni,go=0,En;const Qt={phase:"idle",error:void 0,cancelPreparation(){Se||(++Ot,Ni?.abort(),Ni=void 0,Se||(Qt.phase="cancelled",hn(!1)))},async resume(){En&&(go=En.from+(En.to-En.from)*Math.min(1,(performance.now()-En.start)/En.duration)),Se&&await Ki(go,!0)},dispose(){++Bn,En=void 0,++Ot,Ni?.abort(),Ni=void 0,Se?.dispose(),Se=void 0,window.mergeUSD=void 0,Qt.phase="disposed",hn(!1)}};window.mergeLifecycle=Qt;window.addEventListener("pagehide",()=>Qt.dispose());document.addEventListener("visibilitychange",()=>{document.hidden||Qt.resume().catch(un)});function un(i){Qt.dispose(),Qt.phase="failed",Qt.error=i instanceof Error?i.message:String(i),es.textContent="Stage failed",Vr.textContent=`${Qt.error}. Choose a mode to retry.`,di(Vo),hn(!1,"Stage failed")}function qv(i){Lr.hidden=!0,Dv.classList.toggle("inspector-hidden",!0)}qv();function hn(i,e="Ready",t=!1){yt=i,Wv.forEach(n=>{n.disabled=i}),Ov.classList.toggle("visible",t),es.textContent=e,zr()}function Ps(i,e=i.score){zr(),nt.setUrgent(ke.musicShouldPitchUp);const t=`${e}|${i.currentLevel}|${i.nextColors.join(",")}`;t!==Hl&&(Hl=t,Nv.textContent=e.toLocaleString(),Uv.replaceChildren(...[...i.nextColors].reverse().map(n=>{const s=document.createElement("img");return s.src=Ts(`/Balls/${Oh[n]}.png`),s.alt=String(n+1),s.width=42,s.height=42,s})))}function di(i){Xv.forEach(e=>{e.hidden=e!==i}),nt.setMusicContext(i===Rs?"gameplay":i===No||i===Do?"utility":"menu"),ys.hidden=!0}function zr(i=new Date){if(Hv.hidden=bt==="classic"||bt==="daily",Gl.hidden=bt!=="powerUp",wa.textContent="",Li.textContent="",Li.classList.remove("changing"),bt==="powerUp")kv.textContent=String(ke.trashAmount),Gl.disabled=yt||ke.trashAmount<=0;else if(bt==="shotClock")wa.textContent="Shot clock :",Li.textContent=String(Math.max(0,ke.shotClockRemaining(i))),Li.classList.toggle("changing",ke.shotClockWillChangeAfterNextDrop);else if(bt==="timer"){const e=Math.max(0,Math.ceil(ke.timerRemaining(i)));wa.textContent="Time Left :",Li.textContent=`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`,Li.classList.remove("changing")}}function Yv(i){mo||(mo=!0,Gh.replaceChildren(...i.prims.map(e=>{const t=document.createElement("div"),n=Math.max(0,e.path.split("/").length-2);t.style.setProperty("--depth",String(n));const s=document.createElement("strong");s.textContent=e.path.split("/").at(-1)??"/";const r=document.createElement("span");return r.textContent=e.typeName||"Prim",t.append(s,r),t})))}async function $i(i){const e=i.graph.diagnostics.length;if(es.textContent=e===0?"One stage · runtime live":`Live · ${e} diagnostic${e===1?"":"s"}`,Lr.hidden)return;const t=++Wl;Gn.textContent="Reading current USD revision…";const n=await i.inspect().catch(r=>{i===Se&&(Gn.textContent=String(r))});if(!n||t!==Wl||i!==Se||n.revision!==i.revision||Lr.hidden)return;const s=n.authored;Gn.textContent=n.source,Gn.dataset.revision=String(n.revision),Yv(n),Gi.min=String(s.startTimeCode),Gi.max=String(s.endTimeCode),Gi.value=String(s.startTimeCode),le("timeline-start").textContent=String(s.startTimeCode),le("timeline-end").textContent=String(s.endTimeCode),le("prim-count").textContent=String(n.prims.length),le("mesh-count").textContent=String(i.graph.meshes.length),le("dynamic-count").textContent=`${i.stats.index?.animated??0} prims`,le("diagnostic-count").textContent=e===0?"0 · clean":String(e),le("diagnostic-count").classList.toggle("warning",e>0),le("stage-size").textContent=`${(new TextEncoder().encode(n.source).byteLength/1024).toFixed(1)} KB`,le("pipeline-timing").textContent=`one-time: create ${i.timing.createMs.toFixed(1)} ms · bake ${i.timing.bakeMs.toFixed(1)} ms · adapter ${i.timing.adapterMs.toFixed(1)} ms · latest value author ${i.timing.lastAuthorMs.toFixed(1)} ms`}async function Ki(i,e=!1){go=i;const t=Se;if(!t)return;const n=performance.now();let s;try{s=await t.sampleLatest(i)}catch(h){t===Se&&un(h);return}if(!s||t!==Se||s.revision!==t.revision)return;const r=s.sample,a=performance.now()-n;fo+=a,po++,Uo.present();const o=performance.now();if(!e&&o-kl<70)return;kl=o;const l=Yl(Se.authored.segments,i);es.textContent=l?.kind==="ready"?"Ready":`USD · ${l?.kind??"sample"}`,Ps(ke.snapshot(),l?.score??ke.score),!Lr.hidden&&(Gi.value=String(i),Bv.textContent=i.toFixed(2),zv.textContent=l?.kind??"ready",le("sample-cost").textContent=`${(fo/po).toFixed(2)} ms`,le("dynamic-count").textContent=`${r.meshes.length} sampled`)}async function Is(i){const e=Se;if(!e)return;let t;try{t=await e.author(i)}catch(n){if(e!==Se)return;throw n}e!==Se||t.revision!==e.revision||(fo=0,po=0,$i(Se),await Ki(i.startTimeCode,!0))}async function Oo(){if(!Se)return;const i=Se.authored,e=++Bn,t=performance.now(),n=Math.max(1,(i.endTimeCode-i.startTimeCode)/24*1e3);En={start:t,duration:n,from:i.startTimeCode,to:i.endTimeCode};const s=1e3/60;let r=t-s;const a=new Set;if(hn(!0,"Playing USD"),Uo.beginAnimation(),await new Promise(o=>{const l=h=>{if(e!==Bn||!Se)return o();const c=Math.min(1,(h-t)/n);if(c<1&&h-r<s-1){requestAnimationFrame(l);return}r=h;const u=i.startTimeCode+(i.endTimeCode-i.startTimeCode)*c;Ki(u,c===1);const d=Yl(i.segments,u);d?.kind==="merge"&&!a.has(d.start)&&(a.add(d.start),nt.playMerge(Math.max(0,d.combo-1),d.containsWhite)),c<1?requestAnimationFrame(l):o()};requestAnimationFrame(l)}),e===Bn){do await Ki(i.endTimeCode,!0);while(e===Bn&&Se&&(Se.presentationTime!==i.endTimeCode||Se.presentationRevision!==Se.revision));if(e!==Bn||!Se)return;En=void 0,hn(!1,ke.state==="ended"?"Game over":"Ready")}}function Fa(i){if(yt||ke.state!=="ready"||!Se)return;i();const e=ke.snapshot();Is(Hi(e)).catch(un),Ps(e)}async function _o(){if(yt||ke.state!=="ready"||!Se)return;const i=ke.snapshot(),e=cu(ke,new Date,ci);hn(!0,"Authoring USD");const t=Ot;try{if(await Is(Hi(i,e.transitions)),t!==Ot)return;await Oo()}catch(n){t===Ot&&un(n);return}zr(),e.gameOver&&Xh(ke.score)}function $v(){const i=e=>Array.from({length:7},(t,n)=>e[n]);return[i({0:0,1:0,2:0,6:0}),i({1:1,2:1}),i({1:2,2:2}),i({1:3,2:3})]}async function Kv(){if(yt||!Se)return;ke=new Oe("classic"),bt="classic",ke.loadTestBoard($v());const i=ke.snapshot(),e=lu(ke);hn(!0,"Authoring USD");const t=Ot;try{if(await Is(Hi(i,e.transitions)),t!==Ot)return;await Oo()}catch(n){t===Ot&&un(n);return}}le("cascade").addEventListener("click",()=>void Kv());le("restart").addEventListener("click",()=>{yt||!Se||Gr(bt)});function Bo(){yt||(Bn++,nt.setUrgent(!1),Se?.setScreen("menu").then(()=>{Se&&$i(Se)}).catch(un),Se&&$i(Se),di(Vo),Vr.textContent="")}le("modes-menu").addEventListener("click",Bo);le("show-game-modes").addEventListener("click",()=>{yt||di(Bh)});le("show-feedback").addEventListener("click",()=>{yt||(nt.unlock(),di(Do))});let ci=ru(jv());function jv(){try{return localStorage.getItem(vo)}catch{return null}}function Hh(){ci=su(ci);try{localStorage.setItem(vo,ci)}catch{}}function fi(){le("drop-speed").textContent=`Drop Speed: ${ci}`,le("music-volume").textContent=`${Math.round(nt.musicVolume*100)}%`,le("effects-volume").textContent=`${Math.round(nt.effectsVolume*100)}%`}le("show-settings").addEventListener("click",()=>{yt||(nt.unlock(),fi(),di(No))});le("music-down").addEventListener("click",()=>{nt.setMusicVolume(nt.musicVolume-.1),fi()});le("music-up").addEventListener("click",()=>{nt.setMusicVolume(nt.musicVolume+.1),nt.unlock(),fi()});le("effects-down").addEventListener("click",()=>{nt.setEffectsVolume(nt.effectsVolume-.1),fi()});le("effects-up").addEventListener("click",()=>{nt.setEffectsVolume(nt.effectsVolume+.1),nt.playMerge(0),fi()});le("drop-speed").addEventListener("click",()=>{Hh(),fi()});le("reset-settings").addEventListener("click",()=>{nt.reset(),ci="Normal";try{localStorage.removeItem(vo)}catch{}fi()});for(const i of document.querySelectorAll(".return-menu"))i.addEventListener("click",Bo);function xr(){ys.hidden=!0}function kh(i,e,t){le("modal-title").textContent=i,le("modal-content").innerHTML=e,ys.querySelector(".modal-panel").classList.toggle("menu-only",e===""),le("modal-actions").replaceChildren(...t.map(n=>{const s=document.createElement("button");return s.textContent=n.label,s.classList.toggle("compact",n.compact===!0),s.addEventListener("click",n.run),s})),ys.hidden=!1}le("show-help").addEventListener("click",()=>{kh("How to play","Connect 3 or more of the same colors to create a merge. A merge creates the next color at the bottom-most, left-most position.<br><br>← / → — Move<br>↑ — Rotate<br>↓ — Place<br><br>Combos multiply the points from merges they create. The game ends when a color remains above the grid.",[{label:"Back",run:xr}])});function Wh(){kh("Paused","",[{label:"Resume",run:xr},{label:`Drop Speed: ${ci}`,run:()=>{Hh(),Wh()},compact:!0},{label:"Restart",run:()=>{xr(),Gr(bt)}},{label:"Quit",run:()=>{xr(),Bo()}}])}le("menu").addEventListener("click",Wh);le("trash").addEventListener("click",()=>{if(!(yt||!Se))if(ke.trashCurrent()){nt.playTrash();const i=ke.snapshot();Is(Hi(i)).catch(un),Ps(i)}else nt.playNotAllowed()});function Xh(i){nt.setUrgent(!1),localStorage.setItem(`merge.bestScore.${bt}`,String(Math.max(i,Number(localStorage.getItem(`merge.bestScore.${bt}`))||0))),le("final-score").textContent=i.toLocaleString(),Se?.setScreen("menu").then(()=>{Se&&$i(Se)}).catch(un),Se&&$i(Se),di(zh)}le("play-again").addEventListener("click",()=>void Gr(bt));async function Gr(i){if(yt)return;const e=++Ot;Ni=new AbortController,Qt.error=void 0,mo=!1,nt.unlock(),bt=i,localStorage.setItem("merge.gameMode",i),ke=new Oe(i);const t=ke.snapshot();Ps(t),hn(!0,"Creating stage",!1),Vr.textContent=Se?"Preparing game…":"Creating one persistent USD stage…",es.textContent=Se?"Reusing stage…":"Creating stage…";try{if(Se)await Is(Hi(t));else{const n=await Pv(Hi(t),{signal:Ni.signal,onPhase:s=>{e===Ot&&(Qt.phase=s)}});if(e!==Ot){n.dispose();return}Se=n,globalThis.mergeUSD=n,Uo.install(n)}if(await Se.setScreen("play"),e!==Ot)return;$i(Se),await Ki(Se.authored.startTimeCode,!0),di(Rs),Vr.textContent="",hn(!1)}catch(n){e===Ot&&un(n)}}for(const i of document.querySelectorAll(".menu-choice[data-mode]"))i.addEventListener("click",()=>void Gr(i.dataset.mode));le("replay").addEventListener("click",()=>{yt||Oo().catch(un)});Gi.addEventListener("input",()=>{yt||(Bn++,Ki(Number(Gi.value),!0))});document.addEventListener("keydown",i=>{if(Rs.hidden||i.target instanceof HTMLInputElement||i.target instanceof HTMLButtonElement||yt)return;const t={ArrowLeft:()=>Fa(()=>ke.moveLeft()),ArrowRight:()=>Fa(()=>ke.moveRight()),ArrowUp:()=>Fa(()=>ke.rotate()),ArrowDown:()=>void _o()," ":()=>void _o()}[i.key];t&&(i.preventDefault(),t())});function qh(){const i=new Date,e=Date.UTC(i.getUTCFullYear(),i.getUTCMonth(),i.getUTCDate()+1),t=Math.max(0,Math.floor((e-i.getTime())/1e3)),n=String(Math.floor(t/3600)).padStart(2,"0"),s=String(Math.floor(t%3600/60)).padStart(2,"0"),r=String(t%60).padStart(2,"0"),a=`${n}:${s}:${r}`;le("daily-countdown").textContent=a,le("mode-countdown").textContent=a}qh();window.setInterval(qh,1e3);function Zv(){if(Rs.hidden||!ys.hidden)return;const i=new Date;zr(i),!(yt||ke.state==="ended")&&(bt==="shotClock"&&ke.state==="ready"&&ke.shotClockRemaining(i)<=0?_o():bt==="timer"&&ke.timerRemaining(i)<=0&&(ke.forceGameOver(),Xh(ke.score)))}window.setInterval(Zv,200);for(const i of document.querySelectorAll(".tab"))i.addEventListener("click",()=>{document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active",t===i));const e=i.dataset.tab==="source";Gn.hidden=!e,Gh.hidden=e});le("copy-usd").addEventListener("click",async i=>{if(!Se)return;const e=i.currentTarget,t=Se,n=await t.inspect().catch(s=>{Gn.textContent=String(s)});if(!(!n||t!==Se||n.revision!==t.revision)){try{await navigator.clipboard.writeText(n.source)}catch(s){Gn.textContent=String(s);return}e.textContent="Copied",window.setTimeout(()=>{e.textContent="Copy"},1200)}});le("download-usd").addEventListener("click",async()=>{if(!Se)return;const i=Se,e=await i.inspect().catch(s=>{Gn.textContent=String(s)});if(!e||i!==Se||e.revision!==i.revision)return;const t=URL.createObjectURL(new Blob([e.source],{type:"text/plain"})),n=document.createElement("a");n.href=t,n.download="merge-live-stage.usda",n.click(),URL.revokeObjectURL(t)});Ps(ke.snapshot());hn(!1);es.textContent="Choose a mode";
