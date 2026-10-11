let Yt;if(typeof process<"u"&&process.versions?.node){const i=["node","fs"].join(":"),e=`${["node","fs"].join(":")}/promises`,[t,s]=await Promise.all([import(i),import(e)]);Yt={existsSync:n=>t.existsSync(n),readFile:n=>s.readFile(n),open:(n,r)=>s.open(n,r),mkdir:async n=>{await s.mkdir(n,{recursive:!0})},rename:(n,r)=>s.rename(n,r),unlink:n=>s.unlink(n)}}function ir(i){return Yt?.existsSync(i)??!1}function Ff(i){return Yt?Yt.readFile(i):Promise.reject(new Error("Filesystem assets are unavailable"))}let Gf=0;async function $f(i,e){if(!Yt)return Promise.reject(new Error("Filesystem assets are unavailable"));const t=Math.max(i.lastIndexOf("/"),i.lastIndexOf("\\"));if(t>0&&await Yt.mkdir(i.slice(0,t)),!e)return Yt.open(i,"r+");const s=Date.now();let n="",r;for(let a=0;a<100&&!r;a++){n=`${i}.tmp.${s}.${Gf++}`;try{r=await Yt.open(n,"wx")}catch{}}if(!r)throw new Error(`Unable to create sibling temporary for '${i}'`);let o=!0;return{write:(a,c,l,u)=>r.write(a,c,l,u),close:async()=>{if(o){o=!1,await r.close();try{await Yt.rename(n,i)}catch(a){try{await Yt.unlink(n)}catch{}throw a}}}}}function gd(){return typeof process<"u"&&typeof process.cwd=="function"?process.cwd():""}class bt{objects;constructor(...e){this.objects=[...e]}get empty(){return this.objects.length===0}get(e){return this.objects.find(t=>t instanceof e)}getDebugString(){return this.objects.map(e=>e.constructor.name).join(", ")}equals(e){return this.objects.length===e.objects.length&&this.objects.every((t,s)=>{const n=e.objects[s];return t===n?!0:!n||t.constructor!==n.constructor?!1:t.equals?.call(t,n)??!1})}}class ui{constructor(e){this.resolver=e}}class ci{searchPath;constructor(e=[]){this.searchPath=e.filter(t=>t!=="").map(t=>Lf(t))}equals(e){return this.searchPath.length===e.searchPath.length&&this.searchPath.every((t,s)=>t===e.searchPath[s])}}function Lf(i){if(i.startsWith("/")||/^[a-zA-Z]:[\\/]/.test(i))return Wc(i);const e=gd();return Wc(e?`${e}/${i}`:i)}function Wc(i){const e=i.startsWith("/"),t=/^[a-zA-Z]:/.exec(i)?.[0]??"",s=[];for(const n of i.replaceAll("\\","/").replace(/^[a-zA-Z]:/,"").split("/"))!n||n==="."||(n===".."&&s.length>0?s.pop():s.push(n));return`${t}${e?"/":""}${s.join("/")}`}class Vf{async getDetachedAsset(){return new yd(new Uint8Array(await this.getBuffer()))}}class yd extends Vf{constructor(e){super(),this.bytes=e}getSize(){return this.bytes.byteLength}async getBuffer(){return this.bytes}async read(e,t){return t<0||e<0||t+e>this.bytes.byteLength?new Uint8Array:this.bytes.slice(t,t+e)}}class we{_path;constructor(e=""){this._path=e instanceof we?e._path:e}getPathString(){return this._path}get valid(){return this._path.length>0}_str(e){return e instanceof we?e._path:e}equals(e){return this._path===this._str(e)}notEquals(e){return this._path!==this._str(e)}lt(e){return this._path<this._str(e)}le(e){return this._path<=this._str(e)}gt(e){return this._path>this._str(e)}ge(e){return this._path>=this._str(e)}toString(){return this._path}repr(){return this._path?`Ar.ResolvedPath('${this._path}')`:"Ar.ResolvedPath()"}get hash(){return this._path}}class Uf{constructor(e="",t="",s=void 0){this.version=e,this.assetName=t,this.resolverInfo=s}}class zf{constructor(e=void 0){this.time=e}get valid(){return this.time!==void 0}equals(e){return this.time===e.time}notEquals(e){return!this.equals(e)}toString(){return this.valid?`Ar.Timestamp(${this.time})`:"Ar.Timestamp()"}}class jf{}var Ln=(i=>(i.Update="update",i.Replace="replace",i))(Ln||{});const Wf={contexts:[],caches:[]},qf=[];let ma;const qc=globalThis.AsyncContext;if(qc?.Variable){const i=new qc.Variable({name:"Ar resolver state"});ma={getStore:()=>i.get(),run:(e,t)=>i.run(e,t)}}else if(typeof process<"u"&&process.versions?.node){const e=await import(["node","async_hooks"].join(":"));ma=new e.AsyncLocalStorage}function _d(){return ma?.getStore()??qf.at(-1)??Wf}function Hf(i){const e=_d().contexts;for(let t=e.length-1;t>=0;t--)if(e[t].resolver===i)return e[t].context}function Kf(i){const e=_d().caches;for(let t=e.length-1;t>=0;t--)if(e[t].resolver===i)return e[t].data}function Zf(i){return Hf(i)??new bt}var $r;(i=>{class e{constructor(s){this.affectsContext=s}}i.ResolverChanged=e})($r||($r={}));const ga=new Set;function Sd(i){return ga.add(i),()=>ga.delete(i)}function Pd(i){for(const e of ga)e(i)}function Yf(i){return i.length===0||i[i.length-1]!=="]"?i.length:i.length-1}function co(i,e){let t=1;for(let s=e-1;s>=0;s--){const n=i[s];if(n==="["||n==="]"){if(s-1>=0&&i[s-1]==="\\")continue;if(t+=n==="["?-1:1,t===0)return s}}return i.length}function Xf(i){if(i.length===0)return i;let e=i.length;if(i[i.length-1]==="]"){const s=co(i,i.length-1);s!==i.length&&(e=s)}return i.slice(0,e).replaceAll("[","\\[").replaceAll("]","\\]")+i.slice(e)}function Qf(i){if(i.length===0)return i;let e=i.length;if(i[i.length-1]==="]"){const s=co(i,i.length-1);s!==i.length&&(e=s)}return i.slice(0,e).replaceAll("\\[","[").replaceAll("\\]","]")+i.slice(e)}function wd(i){return i.length>0&&i[i.length-1]==="]"&&co(i,i.length-1)!==i.length}function Jf(i){let e=0;for(;e<i.length&&i[e]==="";)e++;if(e>=i.length)return"";let t=i[e++],s=t.length;if(t[t.length-1]==="]"){let n=0;for(;n<t.length&&t[t.length-1-n]==="]";)n++;s=t.length-n}for(;e<i.length;e++){const n=i[e];if(n==="")continue;const r="["+Xf(n)+"]";t=t.slice(0,s)+r+t.slice(s),s+=r.length-1}return t}function em(i){const e=Yf(i);if(e===i.length)return[i,""];const t=co(i,e);if(t===i.length)return[i,""];const s=i.slice(0,t),n=Qf(i.slice(t+1,e));return[s,n]}var tm={};class bd{createIdentifier(e,t=new we){return t.valid?Yi(t.toString(),e):Xt(e)}isContextDependentPath(e){return!1}createDefaultContext(){return new bt}createDefaultContextForAsset(e){return this.createDefaultContext()}createContextFromString(e,t){return new bt}createContextFromStrings(e){for(const[t,s]of e)if(t==="")return this.createContextFromString(s);return new bt}createIdentifierForNewAsset(e,t=new we){return this.createIdentifier(e,t)}resolveForNewAsset(e,t=this.getCurrentContext()){return this.resolve(e,t)}getCurrentContext(){return Zf(this)}getExtension(e){const s=zs(e)?.innerPath??e,n=s.lastIndexOf("/"),r=s.lastIndexOf(".");return r>n?s.slice(r+1):""}getAssetInfo(e,t){return new Uf}getModificationTimestamp(e,t){return new zf}async openAssetForWrite(e,t=Ln.Update){}canWriteAssetToPath(e){return!1}beginCacheScope(e){return e??new Map}endCacheScope(e){}refreshContext(e){Pd(new $r.ResolverChanged(t=>t.equals(e)))}}class sm extends bd{static setDefaultSearchPath(e){const t=new ci(e);t.equals(vo)||(vo=t,Pd(new $r.ResolverChanged(s=>s.get(ci)!==void 0)))}createDefaultContextForAsset(e){return e?new bt(new ci([gc(bi(e))])):new bt(new ci)}createContextFromString(e,t){if(t!==void 0&&e!=="")return new bt;const n=(t??e).split(vd()).filter(Boolean);return new bt(new ci(n))}async resolve(e,t=this.getCurrentContext()){const s=t.get(ui)?.resolver;if(s&&s!==this)return s.resolve(e,t);const n=Kf(this);if(n instanceof Map){const r=n.get(e);if(r instanceof we)return r;const o=this._resolve(e,t);return n.set(e,o),o}return this._resolve(e,t)}createIdentifier(e,t=new we){const s=this.getCurrentContext().get(ui)?.resolver;if(s&&s!==this)return s.createIdentifier(e,t);if(!e)return"";if(!t.valid)return Xt(e);const n=Yi(t.toString(),e);return Io(e)&&!ir(bi(n))?Xt(e):Xt(n)}createIdentifierForNewAsset(e,t=new we){return e?ya(e)?t.valid?Xt(Yi(t.toString(),e)):bi(e):Xt(e):""}resolveForNewAsset(e,t=this.getCurrentContext()){const s=t.get(ui)?.resolver;return s&&s!==this?s.resolveForNewAsset(e,t):Promise.resolve(new we(e?bi(e):""))}async openAssetForWrite(e,t=Ln.Update){if(this.canWriteAssetToPath(e))try{const s=await $f(e.toString(),t===Ln.Replace);return new im(s)}catch{return}}canWriteAssetToPath(e){return e.valid&&!wd(e.toString())}isContextDependentPath(e){const t=this.getCurrentContext().get(ui)?.resolver;return t?t.isContextDependentPath(e):Io(e)}async openAsset(e,t=this.getCurrentContext()){const s=t.get(ui)?.resolver;if(s&&s!==this)return s.openAsset(e,t);try{return new yd(new Uint8Array(await Ff(e.toString())))}catch{return}}_resolve(e,t){if(!e)return new we;if(!ya(e)){const r=bi(e);return ir(r)?new we(r):new we}const s=bi(e);if(ir(s))return new we(s);if(!Io(e))return new we;const n=t.get(ci);for(const r of[n,vo])if(r)for(const o of r.searchPath){const a=Xt(`${o}/${e}`);if(ir(a))return new we(a)}return new we}}class im extends jf{constructor(e){super(),this.handle=e}async write(e,t){return this.handle?(await this.handle.write(e,0,e.byteLength,t)).bytesWritten:0}async close(){if(!this.handle)return!1;const e=this.handle;return this.handle=void 0,await e.close(),!0}}let vo=new ci((typeof process<"u"?tm.PXR_AR_DEFAULT_SEARCH_PATH:void 0)?.split(vd())??[]);function vd(){return typeof process<"u"&&process.platform==="win32"?";":":"}function ya(i){return i!==""&&!lo(i)}function Io(i){return ya(i)&&!i.startsWith("./")&&!i.startsWith("../")}function bi(i){if(lo(i))return Xt(i);const e=gd();return Xt(e?`${e}/${i}`:i)}const Hc=new Map([["ArDefaultResolver",()=>new sm]]);let nm="ArDefaultResolver",Ao;const Kc=new Set;function Ei(){return Ao||(Ao=(Hc.get(nm)??Hc.get("ArDefaultResolver"))()),Ao}function rm(i){return Kc.add(i),()=>Kc.delete(i)}function zs(i){if(!wd(i))return null;const[e,t]=em(i);return{packagePath:e,innerPath:t}}function Pn(i,e){return Jf([i,e])}function gc(i){const e=i.lastIndexOf("/");return e>=0?i.slice(0,e):"."}function lo(i){return i.startsWith("/")||/^[a-zA-Z]:[\\/]/.test(i)||/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(i)}function _a(i){const e=[];for(const t of i.split("/"))t===""||t==="."||(t===".."&&e.length&&e.at(-1)!==".."?e.pop():e.push(t));return e.join("/")}function Xt(i){const e=/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.exec(i);if(e){const t=i.slice(e[0].length),s=t.indexOf("/");return s<0?i:e[0]+t.slice(0,s+1)+_a(t.slice(s+1))}return(i.startsWith("/")?"/":"")+_a(i)}function om(i,e){if(lo(e))return e;const t=gc(i);return Xt(t==="."?e:`${t}/${e}`)}function Yi(i,e){if(!e)return"";const t=e.replace(/^@/,"").replace(/@$/,"").trim(),s=zs(i);if(s&&!lo(t)){const n=gc(s.innerPath),r=n==="."||n===s.innerPath?t:`${n}/${t}`;return Pn(s.packagePath,_a(r))}return om(i,t)}function am(i){let e=Zc.get(i);return e||(e=new bt(new ui(new lm(i))),Zc.set(i,e)),e}let cm=0;const Zc=new WeakMap;class lm extends bd{constructor(e){super(),this.implementation=e}prefix=`usd-ts-host-context:${++cm}:`;createIdentifier(e,t=new we){return this.implementation.createIdentifier(e,t)}isContextDependentPath(){return!0}async resolve(e,t){const s=await this.implementation.resolve(e,new bt);return s.valid?new we(this.prefix+encodeURIComponent(s.toString())):s}async openAsset(e,t){const s=e.toString(),n=s.startsWith(this.prefix)?new we(decodeURIComponent(s.slice(this.prefix.length))):e;return this.implementation.openAsset(n,new bt)}}function Yc(i,e){return e.get(ui)?.resolver??i}const Sa=new WeakMap;function Xc(i){if(i)return Sa.get(i)?.current}async function Pa(i,e,t){if(!i)return await t();let s=Sa.get(i);s||(s={current:void 0,installations:[]},Sa.set(i,s));const n={};s.installations.length===0&&(s.current?s.base=s.current:delete s.base),s.installations.push({token:n,context:e}),s.current=e;try{return await t()}finally{const r=s.installations.findIndex(o=>o.token===n);r>=0&&s.installations.splice(r,1),s.current=s.installations.at(-1)?.context??s.base,s.installations.length===0&&delete s.base}}function yi(i=""){return i}(i=>{i.Empty="";function e(t){return t.length===0}i.IsEmpty=e})(yi||(yi={}));function um(i){const e=i;return Object.defineProperty(e,"allTokens",{value:Object.values(i).map(yi),enumerable:!1,writable:!1,configurable:!1}),e}class L{static#s=new Map;static#t=new L("TfRoot");static#i=new L("");#n;#r=!1;#e=[];#o=[];#a=new Map;constructor(e){this.#n=e}static GetUnknownType(){return L.#i}static GetRoot(){return L.#t}static FindByName(e){return L.#t.#a.get(e)??L.#s.get(e)??L.#i}FindDerivedByName(e){const t=this.#a.get(e);if(t)return t;const s=L.#s.get(e);return s&&s.IsA(this)?s:L.#i}static Declare(e,t){let s=L.#s.get(e);return s||(s=new L(e),L.#s.set(e,s),s._setBases([])),t!==void 0&&s._setBases(t),s}static Define(e,t){const s=L.Declare(e,t??[]);return s.#r=!0,s}AddAlias(e,t){if(L.#s.get(t)?.IsA(e))throw new Error(`type alias '${t}' collides beneath ${e.GetTypeName()}`);const n=e.#a.get(t);if(n&&n!==this)throw new Error(`type alias '${t}' is already registered`);e.#a.set(t,this)}GetAliases(e){const t=[];for(const[s,n]of this.#a)n===e&&t.push(s);return t}GetTypeName(){return this.#n}IsUnknown(){return this===L.#i}IsRoot(){return this===L.#t}IsDefined(){return this.#r}IsA(e){return this.IsUnknown()||e.IsUnknown()?!1:this._ancestorsInclusive().has(e)}GetBaseTypes(){return[...this.#e]}GetDirectlyDerivedTypes(){return[...this.#o]}GetAllAncestorTypes(){const e=[];return this.IsUnknown()||this._appendAncestors(e),e}GetAllDerivedTypes(){const e=new Set,t=[...this.#o];for(;t.length;){const s=t.pop();e.has(s)||(e.add(s),t.push(...s.#o))}return[...e]}_appendAncestors(e){const t=this.#e;if(t.length<=1){e.push(this),t.length===1&&t[0]._appendAncestors(e);return}const s=[[this],[...t]];for(const n of t){const r=[];n._appendAncestors(r),s.push(r)}if(!L._mergeAncestors(s,e))throw new Error(`inconsistent inheritance hierarchy for ${this.#n}`)}static _mergeAncestors(e,t){for(;;){let s,n=!1;for(const r of e){if(r.length===0)continue;n=!0;const o=r[0];let a=!1;for(const c of e)if(!(c.length<=1)&&c.indexOf(o,1)!==-1){a=!0;break}if(!a){s=o;break}}if(s===void 0)return!n;t.push(s);for(const r of e)r.length&&r[0]===s&&r.shift()}}_ancestorsInclusive(){const e=new Set,t=[this];for(;t.length;){const s=t.pop();e.has(s)||(e.add(s),t.push(...s.#e))}return e}_setBases(e){for(const s of this.#e){const n=s.#o.indexOf(this);n>=0&&s.#o.splice(n,1)}if(this===L.#t||this===L.#i){this.#e=[];return}const t=e.length?[...e]:[L.#t];this.#e=t;for(const s of t)s.#o.includes(this)||s.#o.push(this)}}const To=4,hm=5,Qc=12,xo=15,Li=15,dm=2113929216,Id=12,Ad=1<<Id,nr=6;function pm(i){return i+Math.floor(i/255)+16}function Do(i){return Math.imul(i,2654435761)>>>32-Id&Ad-1}function on(i,e){return(i[e]|i[e+1]<<8|i[e+2]<<16|i[e+3]<<24)>>>0}function Jc(i){const e=i.length,t=new Uint8Array(e+Math.floor(e/255)+16);let s=0;if(e<Qc)return el(i,0,e,t,s);const n=new Int32Array(Ad).fill(-1),r=e-Qc,o=e-hm;let a=0,c=0;n[Do(on(i,c))]=c,c++;let l=1<<nr;for(;c<=r;){let u=-1,h=1,d=l>>nr;for(;!(c>r);){const P=Do(on(i,c)),w=n[P];if(n[P]=c,w>=0&&w<c&&c-w<=65535&&on(i,w)===on(i,c)){u=w;break}c+=h,h=++d>>nr}if(u<0)break;for(;c>a&&u>0&&i[c-1]===i[u-1];)c--,u--;const f=c-a,p=s++;if(f>=Li){t[p]=Li<<4;let P=f-Li;for(;P>=255;)t[s++]=255,P-=255;t[s++]=P}else t[p]=f<<4;for(let P=0;P<f;P++)t[s++]=i[a+P];const y=c-u;t[s++]=y&255,t[s++]=y>>8&255;let m=c+To,g=u+To;for(;m<o&&i[m]===i[g];)m++,g++;const _=m-c-To;if(_>=xo){t[p]|=xo;let P=_-xo;for(;P>=255;)t[s++]=255,P-=255;t[s++]=P}else t[p]|=_;if(c=m,a=c,c>r)break;n[Do(on(i,c-2))]=c-2,l=1<<nr}return el(i,a,e,t,s)}function el(i,e,t,s,n){const r=t-e;if(r>=Li){s[n++]=Li<<4;let o=r-Li;for(;o>=255;)s[n++]=255,o-=255;s[n++]=o}else s[n++]=r<<4;for(let o=0;o<r;o++)s[n++]=i[e+o];return s.subarray(0,n)}function tl(i,e){const t=new Uint8Array(e);let s=0,n=0;for(;s<i.length;){const r=i[s++];let o=r>>4&15;if(o===15){let u;do u=i[s++],o+=u;while(u===255)}if(t.set(i.subarray(s,s+o),n),s+=o,n+=o,s>=i.length)break;const a=i[s]|i[s+1]<<8;s+=2;let c=(r&15)+4;if(c-4===15){let u;do u=i[s++],c+=u;while(u===255)}let l=n-a;for(let u=0;u<c;u++)t[n++]=t[l++]}return t.subarray(0,n)}function wa(i){return fm(i,dm)}function fm(i,e){const t=i.length;if(t===0)return new Uint8Array([0,0]);if(t<=e){const d=Jc(i),f=new Uint8Array(1+d.length);return f[0]=0,f.set(d,1),f}const s=Math.floor(t/e),n=t%e,r=s+(n?1:0),o=[];let a=1,c=0;const l=d=>{const f=Jc(i.subarray(c,c+d)),p=new Uint8Array(4);p[0]=f.length&255,p[1]=f.length>>8&255,p[2]=f.length>>16&255,p[3]=f.length>>>24&255,o.push(p,f),a+=4+f.length,c+=d};for(let d=0;d<s;d++)l(e);n&&l(n);const u=new Uint8Array(a);u[0]=r;let h=1;for(const d of o)u.set(d,h),h+=d.length;return u}function ba(i,e){const t=i[0];if(t===0)return tl(i.subarray(1),e);let s=1;const n=new Uint8Array(e);let r=0;for(let o=0;o<t;o++){const a=i[s]|i[s+1]<<8|i[s+2]<<16|i[s+3]*16777216;s+=4;const c=tl(i.subarray(s,s+a),e-r);n.set(c,r),r+=c.length,s+=a}return n.subarray(0,r)}const sl=new TextEncoder;function xe(i,e){return e<i.length?i[e]:0}function dt(i){return i>=48&&i<=57}function il(i){const e=i&-33;return e>=65&&e<=90}function ko(i,e,t,s,n){for(;e<t&&xe(i,e)===xe(s,n);)e++,n++;return[e,n]}function is(i,e){const t=sl.encode(i),s=sl.encode(e),n=t.length,r=s.length,o=n,a=r;let c=0,l=0,u=Math.min(n,r);if([c,l]=ko(t,c,u,s,l),c===u&&n===r)return!1;let h,d;for(;c!==u;){h=xe(t,c),d=xe(s,l);const f=h<128&&d<128,p=(h&-33)!==(d&-33),y=h>=64&&d>=64;if(f&&p&&y)return(h+5&31)<(d+5&31);if(dt(h)||dt(d))if(dt(h)&&dt(d)){let m=c,g=l,S=c,_=l;for(;m!==0&&dt(xe(t,m-1));)m--;for(;g!==0&&dt(xe(s,g-1));)g--;for(;S!==o&&dt(xe(t,S));)S++;for(;_!==a&&dt(xe(s,_));)_++;for(;m!==S&&xe(t,m)===48;)m++;for(;g!==_&&xe(s,g)===48;)g++;for(;m!==S&&g!==_&&dt(xe(t,m))&&xe(t,m)===xe(s,g);)m++,g++;if(m===S!=(g===_))return m===S&&g!==_;if(m!==S&&g!==_){const P=xe(t,m),w=xe(s,g),v=S-m,b=_-g;return v!==b?v<b:P<w}c=S,l=_,u=c+Math.min(o-c,a-l)}else{if(c===0)return h<d;const m=xe(t,c-1);return dt(m)?dt(d):dt(h)}else{if(!il(h)||!il(d))return h<d;c++,l++}[c,l]=ko(t,c,u,s,l)}return c!==o||l!==a?c===o:([c,l]=ko(t,0,Math.min(n,r),s,0),h=xe(t,c),d=xe(s,l),d===48||h!==48&&h<d)}function mm(i){return i>=65&&i<=90||i>=97&&i<=122}function nl(i){return i>=48&&i<=57}function gm(i){if(i.length===0||nl(i.charCodeAt(0)))return!1;for(let e=0;e<i.length;e++){const t=i.charCodeAt(e);if(!(mm(t)||nl(t)||t===95))return!1}return!0}function uo(i,e){return is(i,e)?-1:is(e,i)?1:0}new TextEncoder;class Vn extends globalThis.Error{commentary;diagnosticType;context;code;codeString;quiet;#s;constructor(e,t="RuntimeError",s={},n=t,r=String(n),o,a=!1){super(e),this.commentary=e,this.diagnosticType=t,this.context=s,this.code=n,this.codeString=r,this.#s=o,this.quiet=a}GetContext(){return this.context}GetSourceFileName(){return this.context.file??""}GetSourceLineNumber(){return this.context.line??0}GetSourceFunction(){return this.context.prettyFunction??this.context.function??""}GetCommentary(){return this.commentary}AugmentCommentary(e){this.commentary=this.commentary?`${this.commentary}
${e}`:e}GetDiagnosticCode(){return this.code}GetDiagnosticCodeAsString(){return this.codeString}GetInfo(){return this.#s}SetInfo(e){this.#s=e}GetQuiet(){return this.quiet}IsFatal(){return this.diagnosticType==="FatalError"}IsCodingError(){return this.diagnosticType==="CodingError"}}class Co extends Vn{constructor(e,t="RuntimeError",s={}){super(e,t,s)}GetErrorCode(){return this.GetDiagnosticCode()}GetErrorCodeAsString(){return this.GetDiagnosticCodeAsString()}}class rl extends Vn{constructor(e,t={}){super(e,"Warning",t)}}class ol extends Vn{constructor(e,t={}){super(e,"Status",t)}}class Td{static#s=new Td;#t=[];#i=[];#n=[];#r=!1;static GetInstance(){return this.#s}static GetCodeName(e){return String(e)}static FormatDiagnostic(e,t,s){return`${t.file?`${t.file}:${t.line??0}: `:""}${s}`}AddDelegate(e){this.#t.push(e)}RemoveDelegate(e){for(let t=this.#t.length-1;t>=0;t--)this.#t[t]===e&&this.#t.splice(t,1)}SetQuiet(e){this.#r=e}GetErrorBegin(){return 0}GetErrorEnd(){return this.#i.length}EraseError(e){return this.#i.splice(e,1),e}EraseRange(e,t){return this.#i.splice(e,t-e),e}AppendError(e){this.#i.push(e)}PostError(e){const t=e instanceof Co?e:new Co(typeof e=="string"?e:e.GetCommentary(),e instanceof Vn?e.diagnosticType:void 0,e instanceof Vn?e.context:void 0);this.#i.push(t),this.#e(t,s=>s.IssueError(t))}PostWarning(e){const t=e instanceof rl?e:new rl(typeof e=="string"?e:e.GetCommentary());this.#e(t,s=>s.IssueWarning(t))}PostStatus(e){const t=e instanceof ol?e:new ol(typeof e=="string"?e:e.GetCommentary());this.#e(t,s=>s.IssueStatus(t))}PostFatal(e,t){for(const s of this.#t)s.IssueFatalError?.(e,t);throw new Co(t,"FatalError",e)}HasActiveErrorMark(){return!1}_PushTrap(e){this.#n.push(e)}_PopTrap(e){const t=this.#n.lastIndexOf(e);t>=0&&this.#n.splice(t,1)}#e(e,t){const s=this.#n.at(-1);if(s){s._Capture(e);return}if(this.#t.length)for(const n of[...this.#t])t(n);else!this.#r&&!e.GetQuiet()&&globalThis.console.warn(e.GetCommentary())}}const No=new Map,rr=new Set;class xd{static#s=new xd;static GetInstance(){return this.#s}static Add(e,t){const s=No.get(e)??[];s.push(t),No.set(e,s),rr.has(e)&&t()}SubscribeTo(e){if(!rr.has(e)){rr.add(e);for(const t of No.get(e)??[])t()}}UnsubscribeFrom(e){rr.delete(e)}RunUnloadersAtExit(){}}var ne=(i=>(i[i.ValueBlock=0]="ValueBlock",i[i.Held=1]="Held",i[i.Linear=2]="Linear",i[i.Curve=3]="Curve",i))(ne||{}),Ue=(i=>(i[i.Bezier=0]="Bezier",i[i.Hermite=1]="Hermite",i))(Ue||{}),Q=(i=>(i[i.ValueBlock=0]="ValueBlock",i[i.Held=1]="Held",i[i.Linear=2]="Linear",i[i.Sloped=3]="Sloped",i[i.LoopRepeat=4]="LoopRepeat",i[i.LoopReset=5]="LoopReset",i[i.LoopOscillate=6]="LoopOscillate",i))(Q||{}),Dd=(i=>(i[i.PreExtrap=0]="PreExtrap",i[i.PreExtrapLoop=1]="PreExtrapLoop",i[i.InnerLoopPreEcho=2]="InnerLoopPreEcho",i[i.InnerLoopProto=3]="InnerLoopProto",i[i.InnerLoopPostEcho=4]="InnerLoopPostEcho",i[i.KnotInterp=5]="KnotInterp",i[i.PostExtrap=6]="PostExtrap",i[i.PostExtrapLoop=7]="PostExtrapLoop",i))(Dd||{}),_t=(i=>(i[i.None=0]="None",i[i.Custom=1]="Custom",i[i.AutoEase=2]="AutoEase",i))(_t||{}),kn=(i=>(i[i.None=0]="None",i[i.Contain=1]="Contain",i[i.KeepRatio=2]="KeepRatio",i[i.KeepStart=3]="KeepStart",i))(kn||{});class $s{constructor(e=0,t=0,s=0,n=0,r=0){this.protoStart=e,this.protoEnd=t,this.numPreLoops=s,this.numPostLoops=n,this.valueOffset=r}GetPrototypeInterval(){return[this.protoStart,this.protoEnd]}GetLoopedInterval(){const e=Math.max(0,this.protoEnd-this.protoStart);return[this.protoStart-Math.max(0,this.numPreLoops)*e,this.protoEnd+Math.max(0,this.numPostLoops)*e]}}class ys{constructor(e=1,t=0,s){this.mode=e,this.slope=t,this.loopBoundaryTime=s}loopBoundaryTime;IsLooping(){return this.mode>=4}}class kd{polylines=[]}class al extends kd{sources=[]}class _i{#s=0;#t=ne.Held;#i=Ue.Bezier;#n=!1;#r=0;#e=0;#o=0;#a=0;#c=0;#l=0;#u=_t.None;#d=_t.None;#h={};valueType;constructor(e=L.Declare("double")){if(e instanceof L){this.valueType=e;return}const t=e;this.valueType=L.Declare(t.typeName??"double"),t.curveType!==void 0&&(this.#i=t.curveType),t.time!==void 0&&(this.#s=t.time),t.nextInterp!==void 0&&(this.#t=t.nextInterp),t.value!==void 0&&(this.#r=t.value),t.preValue!==void 0&&(this.#n=!0,this.#e=t.preValue),t.customData!==void 0&&(this.#h=structuredClone(t.customData)),t.preTanWidth!==void 0&&(this.#o=t.preTanWidth),t.preTanSlope!==void 0&&(this.#c=t.preTanSlope),t.postTanWidth!==void 0&&(this.#a=t.postTanWidth),t.postTanSlope!==void 0&&(this.#l=t.postTanSlope),t.preTanAlgorithm!==void 0&&(this.#u=t.preTanAlgorithm),t.postTanAlgorithm!==void 0&&(this.#d=t.postTanAlgorithm)}clone(){const e=new _i(this.valueType);return e.#s=this.#s,e.#t=this.#t,e.#i=this.#i,e.#n=this.#n,e.#r=this.#r,e.#e=this.#e,e.#o=this.#o,e.#a=this.#a,e.#c=this.#c,e.#l=this.#l,e.#u=this.#u,e.#d=this.#d,e.#h=structuredClone(this.#h),e}equals(e){return JSON.stringify(this.toJSON())===JSON.stringify(e.toJSON())}toJSON(){return[this.#s,this.#t,this.#n,this.#r,this.GetPreValue(),this.#o,this.#a,this.#c,this.#l,this.#u,this.#d,this.#h]}GetValueType(){return this.valueType}GetValueTypeName(){return this.valueType.GetTypeName()}GetTime(){return this.#s}GetNextInterpolation(){return this.#t}GetCurveType(){return this.#i}IsDualValued(){return this.#n}GetValue(){return this.#r}GetPreValue(){return this.#n?this.#e:this.#r}GetPreTanWidth(){return this.#o}GetPostTanWidth(){return this.#a}GetPreTanSlope(){return this.#c}GetPostTanSlope(){return this.#l}GetPreTanAlgorithm(){return this.#u}GetPostTanAlgorithm(){return this.#d}GetCustomData(){return structuredClone(this.#h)}SetTime(e){return Number.isFinite(e)?(this.#s=e,!0):!1}SetNextInterpolation(e){return this.#t=e,!0}SetCurveType(e){return this.#i=e,!0}SetValue(e){return Number.isFinite(e)?(this.#r=e,!0):!1}SetPreValue(e){return Number.isFinite(e)?(this.#n=!0,this.#e=e,!0):!1}ClearPreValue(){this.#n=!1}SetPreTanWidth(e){return e<0||!Number.isFinite(e)?!1:(this.#o=e,!0)}SetPostTanWidth(e){return e<0||!Number.isFinite(e)?!1:(this.#a=e,!0)}SetPreTanSlope(e){return Number.isFinite(e)?(this.#c=e,!0):!1}SetPostTanSlope(e){return Number.isFinite(e)?(this.#l=e,!0):!1}SetPreTanAlgorithm(e){return this.#u=e,!0}SetPostTanAlgorithm(e){return this.#d=e,!0}SetCustomData(e){return this.#h=structuredClone(e),!0}SetCustomDataByKey(e,t){return this.#h[e]=structuredClone(t),!0}GetCustomDataByKey(e){return structuredClone(this.#h[e])}UpdateTangents(e,t,s=Ue.Bezier){const n=a=>{const c=a?this.#u:this.#d,l=a?e:t;if(!l)return c!==_t.AutoEase;if(c!==_t.AutoEase){if(s===Ue.Hermite){const f=Math.abs(l.GetTime()-this.#s)/3;a?this.#o=f:this.#a=f}return!0}const u=!e||!t||this.#n||this.#t===ne.ValueBlock||e.GetNextInterpolation()===ne.ValueBlock;let h=0;if(!u){const f=(this.#r-e.GetValue())/(this.#s-e.GetTime()),p=(t.GetPreValue()-this.#r)/(t.GetTime()-this.#s);if(f*p>0){const m=(this.#s-e.GetTime())/(t.GetTime()-e.GetTime())-.5,g=.5+m*(.5+2*m*m);h=(1-g)*f+g*p,h=p>0?Math.min(h,3*p,3*f):Math.max(h,3*p,3*f)}}const d=Math.abs(l.GetTime()-this.#s)/3;return a?(this.#c=h,this.#o=d):(this.#l=h,this.#a=d),!0},r=n(!0),o=n(!1);return r||o}}class ls extends Array{static get[Symbol.species](){return Array}has(e){return this.some(t=>t.GetTime()===e)}get(e){return this.find(t=>t.GetTime()===e)}set(e,t){t.SetTime(e);const s=this.findIndex(n=>n.GetTime()===e);return s>=0?this.splice(s,1,t):this.push(t),this.sort((n,r)=>n.GetTime()-r.GetTime()),this}}let an=kn.KeepRatio;class Ve{#s=!1;#t=Ue.Bezier;#i=new ys;#n=new ys;#r=new $s;#e=new ls;valueType;constructor(e=L.Declare("double")){this.valueType=typeof e=="string"?L.Declare(e):e}clone(){const e=new Ve(this.valueType);return e.#s=this.#s,e.#t=this.#t,e.#i=Is(this.#i),e.#n=Is(this.#n),e.#r=Mo(this.#r),e.#e=new ls(...this.#e.map(t=>t.clone())),e}GetValueType(){return this.valueType}GetValueTypeName(){return this.valueType.GetTypeName()}IsTimeValued(){return this.#s}GetCurveType(){return this.#t}GetPreExtrapolation(){return Is(this.#i)}GetPostExtrapolation(){return Is(this.#n)}GetInnerLoopParams(){return Mo(this.#r)}GetKnots(e){const t=e?this.#e.filter(s=>Eo(e,s.GetTime())):this.#e;return new ls(...t.map(s=>s.clone()))}GetKnot(e){return this.#e.get(e)?.clone()}SetTimeValued(e){this.#s=e}SetCurveType(e){this.#t=e,this.#p()}SetPreExtrapolation(e){this.#i=Is(e)}SetPostExtrapolation(e){this.#n=Is(e)}SetInnerLoopParams(e){this.#r=Mo(e)}SetKnots(e){this.#e=new ls(...e.map(t=>t.clone()).sort(cl)),this.#p()}SetKnot(e){this.#e.get(e.GetTime()),this.#e.set(e.GetTime(),e.clone()),this.#p(),this.AdjustRegressiveTangents();const t=this.#e.findIndex(s=>s.GetTime()===e.GetTime());return[this.#e[Math.max(0,t-1)]?.GetTime()??e.GetTime(),this.#e[Math.min(this.#e.length-1,t+1)]?.GetTime()??e.GetTime()]}RemoveKnot(e){const t=this.#e.findIndex(s=>s.GetTime()===e);t>=0&&this.#e.splice(t,1),this.#p()}ClearKnots(){this.#e=new ls}IsPreExtrapolationValid(){return this.#h(this.#i)}IsPostExtrapolationValid(){return this.#h(this.#n)}IsEmpty(){return this.#e.length===0}HasValueBlocks(){return this.#i.mode===Q.ValueBlock||this.#n.mode===Q.ValueBlock||this.#e.some(e=>e.GetNextInterpolation()===ne.ValueBlock)}HasLoops(){return this.HasInnerLoops()||this.HasExtrapolatingLoops()}HasInnerLoops(){const e=this.#r;return e.protoEnd>e.protoStart&&this.#e.has(e.protoStart)&&(e.numPreLoops>0||e.numPostLoops>0)}HasExtrapolatingLoops(){return this.#i.IsLooping()||this.#n.IsLooping()}HasValueBlockAtTime(e){return this.Eval(e)===void 0}DoSidesDiffer(e){return this.EvalPreValue(e)!==this.Eval(e)}static IsSupportedValueType(e){const t=typeof e=="string"?e:e.GetTypeName();return["double","float","GfHalf","GfTimeCode"].includes(t)}static GetAntiRegressionAuthoringMode(){return an}GetAntiRegressionAuthoringMode(){return an}Eval(e){return this.#o(e,!1,!1,!1)}EvalPreValue(e){return this.#o(e,!0,!1,!1)}EvalHeld(e){return this.#o(e,!1,!1,!0)}EvalPreValueHeld(e){return this.#o(e,!0,!1,!0)}EvalDerivative(e){return this.#o(e,!1,!0,!1)}EvalPreDerivative(e){return this.#o(e,!0,!0,!1)}#o(e,t,s,n){if(!Number.isFinite(e)||this.#e.length===0)return;const r=this.#u(e,t);if(r){const d=this.#d(r.time,r.pre,s,n);return d===void 0||s?d:d+r.valueOffset}const o=this.#e[0],a=this.#e[this.#e.length-1];if(e<o.GetTime()||t&&e===o.GetTime())return this.#c(this.#i,e,!0,s,n);if(e>a.GetTime())return this.#c(this.#n,e,!1,s,n);const c=this.#e.findIndex(d=>d.GetTime()===e);if(c>=0){const d=this.#e[c];return t?c===0?this.#c(this.#i,e,!0,s,n):s?n?0:Xs(this.#e[c-1],d,1,this.#t):d.GetPreValue():c===this.#e.length-1&&this.#n.mode===Q.ValueBlock?void 0:s?n?0:c===this.#e.length-1?this.#a():Xs(d,this.#e[c+1],0,this.#t):d.GetValue()}let l=1;for(;this.#e[l].GetTime()<e;)l++;const u=this.#e[l-1],h=this.#e[l];return n?u.GetNextInterpolation()===ne.ValueBlock?void 0:u.GetValue():s?wm(u,h,e,this.#t):Pm(u,h,e,this.#t)}#a(){const e=this.#n;if(e.mode!==Q.ValueBlock)return e.mode===Q.Held?0:e.mode===Q.Sloped?e.slope:this.#e.length<2?0:Xs(this.#e[this.#e.length-2],this.#e[this.#e.length-1],1,this.#t)}#c(e,t,s,n,r){const o=s?this.#e[0]:this.#e[this.#e.length-1];if(e.mode===Q.ValueBlock)return;if(e.IsLooping()&&this.#e.length>1){const l=this.#l(e,t,s);if(!l)return;const u=this.#o(l.time,l.pre,n,r);return u===void 0?void 0:n?l.reverse?-u:u:u+l.valueOffset}if(n)return r||e.mode===Q.Held||this.#e.length<2?0:e.mode===Q.Sloped?e.slope:s?Xs(this.#e[0],this.#e[1],0,this.#t):Xs(this.#e[this.#e.length-2],o,1,this.#t);const a=s?o.GetPreValue():o.GetValue();if(r||e.mode===Q.Held||this.#e.length<2)return a;const c=e.mode===Q.Sloped?e.slope:s?Xs(this.#e[0],this.#e[1],0,this.#t)??0:Xs(this.#e[this.#e.length-2],o,1,this.#t)??0;return a+c*(t-o.GetTime())}#l(e,t,s){const n=this.#e[0],r=this.#e[this.#e.length-1];let o=n.GetTime(),a=r.GetTime();if(e.loopBoundaryTime!==void 0){if(!this.#e.has(e.loopBoundaryTime))return;s?o=e.loopBoundaryTime:a=e.loopBoundaryTime}const c=a-o;if(c<=0)return{time:s?o:a,pre:!1,valueOffset:0,reverse:!1};const l=Math.floor((t-o)/c);let u=t-l*c;u<o&&(u+=c);const h=e.mode===Q.LoopOscillate&&Math.abs(l)%2===1;h&&(u=o+a-u);const d=(this.#o(a,!0,!1,!1)??0)-(this.#o(o,!1,!1,!1)??0),f=e.mode===Q.LoopRepeat?l*d:0;return{time:u,pre:h,valueOffset:f,reverse:h}}#u(e,t){if(!this.HasInnerLoops())return;const s=this.#r,n=s.protoEnd-s.protoStart,r=s.protoStart-s.numPreLoops*n,o=s.protoEnd+s.numPostLoops*n;if(e<r||e>o)return;let a=Math.floor((e-s.protoStart)/n);e===o&&!t&&a--;const c=e-a*n;return{time:c,pre:t&&c===s.protoStart,valueOffset:a*s.valueOffset}}#d(e,t,s,n){const r=this.#r,o=this.clone();o.#r=new $s,o.#e=new ls(...o.#e.filter(l=>l.GetTime()>=r.protoStart&&l.GetTime()<r.protoEnd));const a=o.#e.get(r.protoStart);if(!a)return;const c=a.clone();return c.SetTime(r.protoEnd),c.SetValue(a.GetValue()+r.valueOffset),a.IsDualValued()&&c.SetPreValue(a.GetPreValue()+r.valueOffset),o.#e.set(r.protoEnd,c),o.#o(e,t,s,n)}CanBreakdown(e){if(!Number.isFinite(e))return{value:!1,reason:"Time is not finite"};if(this.#e.has(e))return{value:!1,reason:"A knot already exists at the requested time"};if(this.#i.IsLooping()||this.#n.IsLooping()){const t=this.#e[0]?.GetTime()??0,s=this.#e[this.#e.length-1]?.GetTime()??0;if(e<t||e>s)return{value:!1,reason:"Cannot break down extrapolating loops"}}return{value:this.Eval(e)!==void 0,reason:this.Eval(e)===void 0?"No value at requested time":""}}Breakdown(e){if(!this.CanBreakdown(e).value)return;const t=this.Eval(e),s=this.EvalDerivative(e)??0,n=this.EvalPreDerivative(e)??s,r=this.#e.findIndex(l=>l.GetTime()>e),o=r>0?this.#e[r-1]:void 0,a=r>=0?this.#e[r]:void 0,c=new _i(this.valueType);return c.SetTime(e),c.SetValue(t),c.SetNextInterpolation(o?.GetNextInterpolation()??ne.Held),c.SetPreTanSlope(n),c.SetPostTanSlope(s),o&&c.SetPreTanWidth((e-o.GetTime())/3),a&&c.SetPostTanWidth((a.GetTime()-e)/3),this.SetKnot(c)}Sample(e,t,s,n,r=!1){if(e.IsEmpty?.()||t===0||n<0)return;const o=r?new al:new kd,a=[],c=(u,h,d)=>{const f=this.Eval(u),p=this.Eval(h);if(f===void 0||p===void 0)return;const y=(u+h)/2,m=this.Eval(y);if(m===void 0)return;const g=(f+p)/2;d<20&&Math.abs((m-g)*s)>n?(c(u,y,d+1),c(y,h,d+1)):((a.length===0||a.at(-1)[0]!==u)&&a.push([u*t,f*s]),a.push([h*t,p*s]))},l=[e.GetMin(),...this.#e.map(u=>u.GetTime()).filter(u=>u>e.GetMin()&&u<e.GetMax()),e.GetMax()];for(let u=0;u+1<l.length;u++)c(l[u],l[u+1],0);return o.polylines.push(a),o instanceof al&&o.sources.push(Dd.KnotInterp),o}HasRegressiveTangents(){return this.#t!==Ue.Bezier?!1:this.#e.some((e,t)=>{const s=this.#e[t+1];return s?va(e.GetPostTanWidth(),s.GetPreTanWidth(),s.GetTime()-e.GetTime()):!1})}AdjustRegressiveTangents(){if(this.#t!==Ue.Bezier||an===kn.None)return!1;let e=!1;for(let t=0;t+1<this.#e.length;t++){const s=this.#e[t],n=this.#e[t+1],r=n.GetTime()-s.GetTime();let o=s.GetPostTanWidth(),a=n.GetPreTanWidth();if(va(o,a,r)){if(an===kn.Contain)o=Math.min(o,r),a=Math.min(a,r);else if(an===kn.KeepStart)a=Math.max(0,r-o);else{const c=r/(o+a);o*=c,a*=c}s.SetPostTanWidth(o),n.SetPreTanWidth(a),e=!0}}return e}GetTimeScaled(e,t){if(e===0)return new Ve;const s=this.clone(),n=s.#e.map(o=>{const a=o.clone();a.SetTime(o.GetTime()*e+t);const c=Math.abs(e);return a.SetPreTanWidth(o.GetPreTanWidth()*c),a.SetPostTanWidth(o.GetPostTanWidth()*c),a.SetPreTanSlope(o.GetPreTanSlope()/e),a.SetPostTanSlope(o.GetPostTanSlope()/e),a}).sort(cl);s.#e=new ls(...n);const r=s.#r;return r.protoStart=r.protoStart*e+t,r.protoEnd=r.protoEnd*e+t,r.protoStart>r.protoEnd&&([r.protoStart,r.protoEnd]=[r.protoEnd,r.protoStart]),s.#i.slope/=e,s.#n.slope/=e,e<0&&([s.#i,s.#n]=[s.#n,s.#i]),s}GetTruncated(e,t=new ys(Q.Held),s=new ys(Q.Held)){if(e.IsEmpty?.())return new Ve;const n=this.clone(),r=e.GetMin(),o=e.GetMax();return Number.isFinite(r)&&!n.#e.has(r)&&n.Eval(r)!==void 0&&n.Breakdown(r),Number.isFinite(o)&&!n.#e.has(o)&&n.Eval(o)!==void 0&&n.Breakdown(o),n.#e=new ls(...n.#e.filter(a=>Eo(e,a.GetTime()))),n.#i=Is(t),n.#n=Is(s),n.#r=new $s,n}GetKnotsWithInnerLoopsBaked(){if(!this.HasInnerLoops())return this.GetKnots();const e=this.#r,t=e.protoEnd-e.protoStart,s=new ls;for(const o of this.#e)(o.GetTime()<e.protoStart-e.numPreLoops*t||o.GetTime()>e.protoEnd+e.numPostLoops*t)&&s.push(o.clone());const n=this.#e.filter(o=>o.GetTime()>=e.protoStart&&o.GetTime()<e.protoEnd);for(let o=-e.numPreLoops;o<=e.numPostLoops;o++)for(const a of n){const c=a.clone();c.SetTime(a.GetTime()+o*t),c.SetValue(a.GetValue()+o*e.valueOffset),a.IsDualValued()&&c.SetPreValue(a.GetPreValue()+o*e.valueOffset),s.set(c.GetTime(),c)}const r=this.#e.get(e.protoStart);if(r){const o=e.numPostLoops+1,a=r.clone();a.SetTime(e.protoStart+o*t),a.SetValue(r.GetValue()+o*e.valueOffset),r.IsDualValued()&&a.SetPreValue(r.GetPreValue()+o*e.valueOffset),s.set(a.GetTime(),a)}return s}BakeInnerLoops(){return this.HasInnerLoops()?(this.#e=this.GetKnotsWithInnerLoopsBaked(),this.#r=new $s,!0):!1}GetKnotsWithLoopsBaked(e){const t=this.GetKnotsWithInnerLoopsBaked(),s=Math.max(.001,(e.GetMax()-e.GetMin())/100);for(let n=e.GetMin();n<=e.GetMax();n+=s){if(this.Eval(n)===void 0)continue;const r=new _i(this.valueType);r.SetTime(n),r.SetValue(this.Eval(n)),r.SetNextInterpolation(ne.Linear),t.set(n,r)}return t}Diff(e,t){const n=[...new Set([...this.#e.map(r=>r.GetTime()),...e.#e.map(r=>r.GetTime())])].filter(r=>(!t||Eo(t,r))&&(this.Eval(r)!==e.Eval(r)||this.EvalPreValue(r)!==e.EvalPreValue(r)));return n.length?[Math.min(...n),Math.max(...n)]:void 0}static Concatenate(e){const t=e.filter(n=>!n.IsEmpty());if(!t.length)return new Ve;const s=new Ve(t[0].valueType);s.#i=t[0].GetPreExtrapolation(),s.#n=t.at(-1).GetPostExtrapolation();for(const n of t){if(n.GetValueTypeName()!==s.GetValueTypeName()||n.HasInnerLoops())return new Ve;for(const r of n.#e)s.#e.set(r.GetTime(),r.clone())}return s}#h(e){return e.loopBoundaryTime===void 0||this.#e.has(e.loopBoundaryTime)}#p(){for(let e=0;e<this.#e.length;e++)this.#e[e].UpdateTangents(this.#e[e-1],this.#e[e+1],this.#t)}}function Is(i){return new ys(i.mode,i.slope,i.loopBoundaryTime)}function Mo(i){return new $s(i.protoStart,i.protoEnd,i.numPreLoops,i.numPostLoops,i.valueOffset)}function cl(i,e){return i.GetTime()-e.GetTime()}function Eo(i,e){return(e>i.GetMin()||e===i.GetMin()&&(i.IsMinClosed?.()??!0))&&(e<i.GetMax()||e===i.GetMax()&&(i.IsMaxClosed?.()??!0))}function yc(i,e){return(e.GetPreValue()-i.GetValue())/(e.GetTime()-i.GetTime())}function Bo(i,e,t,s){return{a:-i+3*e-3*t+s,b:3*i-6*e+3*t,c:-3*i+3*e,d:i}}function ym(i,e){return e*(e*(e*i.a+i.b)+i.c)+i.d}function ll(i,e){return e*(3*i.a*e+2*i.b)+i.c}function _m(i){const e=p=>p.reduce((y,m)=>Math.abs(m-.5)<Math.abs(y-.5)?m:y);if(Math.abs(i.a)<=1e-10){if(Math.abs(i.b)<=1e-10)return Math.abs(i.c)<=1e-10?0:-i.d/i.c;const p=Math.sqrt(i.c*i.c-4*i.b*i.d);return e([(-i.c-p)/(2*i.b),(-i.c+p)/(2*i.b)])}const s=i.b/i.a,n=i.c/i.a,r=i.d/i.a,a=(3*n-s*s)/3/3,c=a*a*a,l=(2*s*s*s-9*s*n+27*r)/27,u=l/2,h=u*u+c,d=s/3;if(h<0){const p=Math.sqrt(-c),y=Math.acos(Math.max(-1,Math.min(1,-l/(2*p)))),m=2*Math.cbrt(p);return e([m*Math.cos(y/3)-d,m*Math.cos((y+2*Math.PI)/3)-d,m*Math.cos((y+4*Math.PI)/3)-d])}if(h===0){const p=-Math.cbrt(u);return e([2*p-d,-p-d])}const f=Math.sqrt(h);return Math.cbrt(f-u)-Math.cbrt(f+u)-d}function Sm(i,e){const t=e.GetTime()-i.GetTime();let s=i.GetPostTanWidth(),n=e.GetPreTanWidth();if(va(s,n,t)){const r=t/(s+n);s*=r,n*=r}return[s,n]}function va(i,e,t){return i+e>t&&i+e>0}function Cd(i,e,t){const[s,n]=Sm(i,e),r=Bo(i.GetTime(),i.GetTime()+s,e.GetTime()-n,e.GetTime()),o=Bo(i.GetValue(),i.GetValue()+s*i.GetPostTanSlope(),e.GetPreValue()-n*e.GetPreTanSlope(),e.GetPreValue()),a=Bo(i.GetTime()-t,i.GetTime()+s-t,e.GetTime()-n-t,e.GetTime()-t);return{t:Math.max(0,Math.min(1,_m(a))),x:r,y:o}}function Pm(i,e,t,s){switch(i.GetNextInterpolation()){case ne.ValueBlock:return;case ne.Held:return i.GetValue();case ne.Linear:return i.GetValue()+yc(i,e)*(t-i.GetTime())}const n=e.GetTime()-i.GetTime();if(s===Ue.Hermite){const o=(t-i.GetTime())/n,a=o*o,c=a*o;return(2*c-3*a+1)*i.GetValue()+(c-2*a+o)*i.GetPostTanSlope()*n+(-2*c+3*a)*e.GetPreValue()+(c-a)*e.GetPreTanSlope()*n}const r=Cd(i,e,t);return ym(r.y,r.t)}function wm(i,e,t,s){if(i.GetNextInterpolation()===ne.ValueBlock)return;if(i.GetNextInterpolation()===ne.Held)return 0;if(i.GetNextInterpolation()===ne.Linear)return yc(i,e);const n=e.GetTime()-i.GetTime();if(s===Ue.Hermite){const a=(t-i.GetTime())/n,c=a*a;return((6*c-6*a)*i.GetValue()+(3*c-4*a+1)*i.GetPostTanSlope()*n+(-6*c+6*a)*e.GetPreValue()+(3*c-2*a)*e.GetPreTanSlope()*n)/n}const r=Cd(i,e,t),o=ll(r.x,r.t);return o===0?0:ll(r.y,r.t)/o}function Xs(i,e,t,s){if(i.GetNextInterpolation()!==ne.ValueBlock)return i.GetNextInterpolation()===ne.Held?0:i.GetNextInterpolation()===ne.Linear?yc(i,e):t===0?i.GetPostTanSlope():e.GetPreTanSlope()}class bm{#s=0;#t;constructor(e){this.#t=new DataView(e.buffer,e.byteOffset,e.byteLength)}get remaining(){return this.#t.byteLength-this.#s}u8(){return this.#t.getUint8(this.#s++)}u16(){const e=this.#t.getUint16(this.#s,!0);return this.#s+=2,e}u32(){const e=this.#t.getUint32(this.#s,!0);return this.#s+=4,e}i32(){const e=this.#t.getInt32(this.#s,!0);return this.#s+=4,e}f32(){const e=this.#t.getFloat32(this.#s,!0);return this.#s+=4,e}f64(){const e=this.#t.getFloat64(this.#s,!0);return this.#s+=8,e}}function vm(i){const e=(i&32768)<<16;let t=i>>10&31,s=i&1023,n;if(t===0)if(s===0)n=e;else{for(t=1;!(s&1024);)s<<=1,t--;s&=1023,n=e|t+112<<23|s<<13}else t===31?n=e|2139095040|s<<13:n=e|t+112<<23|s<<13;const r=new ArrayBuffer(4),o=new DataView(r);return o.setUint32(0,n,!0),o.getFloat32(0,!0)}class Im{static CreateSplineFromBinaryData(e,t){if(e.byteLength===0)return new Ve;const s=new bm(e),n=s.u8(),r=n&15;if(r!==1&&r!==2)throw new Error(`Unknown spline data version ${r}`);const o=(n&48)>>4,c=["double","double","float","GfHalf"][o];if(c===void 0)throw new Error("Bad spline type descriptor");const l=L.Declare(c),u=new Ve(l);u.SetTimeValued(!!(n&64));const h=(n&128)>>7;u.SetCurveType(h);const d=s.u8(),f=d&7,p=(d&24)>>3;u.SetPreExtrapolation(new ys(f,f===Q.Sloped?s.f64():0)),u.SetPostExtrapolation(new ys(p,p===Q.Sloped?s.f64():0)),d&64&&u.SetInnerLoopParams(new $s(s.f64(),s.f64(),s.i32(),s.i32(),s.f64()));const y=()=>{if(o===1)return s.f64();if(o===2)return s.f32();if(o===3)return vm(s.u16());throw new Error("Cannot read knots for an untyped spline")},m=[];{let g=s.u32();for(;g-- >0;){const S=s.u8(),_=new _i(l);if(_.SetNextInterpolation((S&6)>>1),_.SetCurveType((S&8)>>3),_.SetTime(s.f64()),_.SetValue(y()),S&1&&_.SetPreValue(y()),h!==Ue.Hermite&&(_.SetPreTanWidth(s.f64()),_.SetPostTanWidth(s.f64())),_.SetPreTanSlope(y()),_.SetPostTanSlope(y()),r>1){const P=s.u8();_.SetPreTanAlgorithm(P&15),_.SetPostTanAlgorithm(P>>4)}_.SetCustomData(t.get(_.GetTime())??{}),m.push(_)}}if(s.remaining!==0)throw new Error(`Unread spline data: ${s.remaining} bytes`);return u.SetKnots(m),u}}class Ps{#s;#t;#i;constructor(e="",t=""){typeof e=="string"?(this.#s=e,this.#t="",this.#i=t):(this.#s=e.authoredPath??"",this.#t=e.evaluatedPath??"",this.#i=e.resolvedPath??"")}getAuthoredPath(){return this.#s}getEvaluatedPath(){return this.#t}getAssetPath(){return this.#t||this.#s}getResolvedPath(){return this.#i}equals(e){return e instanceof Ps&&e.#s===this.#s&&e.#t===this.#t&&e.#i===this.#i}}class Pe{equals(e){return e instanceof Pe}toString(){return"Sdf.ValueBlock()"}}class St{equals(e){return e instanceof St}toString(){return"Sdf.AnimationBlock()"}}class Nd{constructor(e,t){this.value=e,this.typeName=t}}const Un=new Map([["customData",{typeName:"dictionary",appliesTo:new Set(["prims","attributes","relationships"])}],["assetInfo",{typeName:"dictionary",appliesTo:new Set(["prims"])}],["customLayerData",{typeName:"dictionary",appliesTo:new Set(["layers"])}],["int_single",{typeName:"int",appliesTo:new Set(["layers"])}],["string_single",{typeName:"string",appliesTo:new Set(["layers"])}],["prefix",{typeName:"string",appliesTo:new Set(["prims"])}]]),Hs=new WeakMap,Am=new WeakMap,Tm=new WeakMap;function Md(i,e){Hs.set(i,e)}function _c(i){return Hs.get(i)}function xm(i,e){Am.set(i,e)}function ul(i,e){Tm.set(i,e)}function Dm(i,e){const t=Hs.get(i);t&&Hs.set(e,t)}function Ed(i,e){if(!Lr(i))return i;const t=Hs.get(i),s={};for(const[n,r]of Object.entries(i)){const o=Ed(r,e);s[n]=t?.get(n)?e(o,t.get(n)):o}return t&&Hs.set(s,t),s}function km(i){for(const e of i){const t=e.GetMetadata().SdfMetadata;if(Lr(t))for(const[s,n]of Object.entries(t)){if(Un.has(s)||!Lr(n))continue;const r=n.type;if(typeof r!="string")continue;const o=n.appliesTo,a=typeof o=="string"?new Set([o]):Array.isArray(o)?new Set(o.filter(u=>typeof u=="string")):void 0,c=Object.fromEntries(Object.entries(n).filter(([u])=>u!=="type"&&u!=="default"&&u!=="appliesTo")),l={typeName:r,..."default"in n?{fallback:n.default}:{},...Object.keys(c).length?{info:c}:{},...a?.size?{appliesTo:a}:{}};Un.set(s,l)}}}class Cm{constructor(e,t){this.name=e,this._definition=t}getTypeName(){return this._definition.typeName}getFallback(){return this._definition.fallback}getInfo(){return this._definition.info??{}}}class Bd{static _instance=new Bd;static getInstance(){return this._instance}isValidFieldForSpec(e,t){return ho(e,t)!==void 0}getFallback(e){return Un.get(e)?.fallback}getFieldDefinition(e){const t=Un.get(e);return t?new Cm(e,t):void 0}}function ho(i,e){const t=Un.get(i);if(!t)return;if(!t.appliesTo)return t.typeName;const s=e==="layer"?"layers":e==="prim"?"prims":e==="attribute"?"attributes":e==="relationship"?"relationships":"variants";if(t.appliesTo.has(s)||(e==="attribute"||e==="relationship")&&t.appliesTo.has("properties")||e==="variant"&&t.appliesTo.has("prims"))return t.typeName}function Od(i,e,t){if(e==="timecode")return typeof i=="number"?t(i):i;if(e==="timecode[]")return Array.isArray(i)?i.map(r=>typeof r=="number"?t(r):r):i;if(e!=="dictionary"||!Lr(i))return i;const s=Hs.get(i),n={};for(const[r,o]of Object.entries(i))n[r]=Od(o,s?.get(r),t);return s&&Hs.set(n,s),n}function Lr(i){return typeof i=="object"&&i!==null&&!Array.isArray(i)}function Nm(i){const e={};for(const t of i.getSpecPaths()){const s={};for(const n of i.getFieldNames(t))s[n]={value:i.getField(t,n)};e[t]=s}return e}function Mm(i){const e=Nm(i),t=["#usda 1.0"],s=Bm(e);if(s.length>0){t.push("(");for(const o of s)t.push(o);t.push(")")}const n=e["/"]?.primOrder?.value;Array.isArray(n)&&n.length>1&&(t.push(""),t.push(`reorder rootPrims = [${n.map(o=>ae(o,!1)).join(", ")}]`));const r=e["/"]?.primChildren?.value??[];for(const o of r)t.push(""),Vd(e,`/${o}`,t,0);return t.push("",""),t.join(`
`)}const Em=new Set(["specifier","typeName","primChildren","primOrder","properties","comment","subLayerOffsets","layerRelocates","relocates"]);function Bm(i){const e=i["/"];if(!e)return[];const t=[],s=e.comment?.value;typeof s=="string"&&s!==""&&t.push(`    ${ae(s)}`);const n=e.layerRelocates?.value??e.relocates?.value;if(n&&typeof n=="object"){const o=Array.isArray(n)?n.filter(a=>Array.isArray(a)&&a.length===2&&typeof a[0]=="string"&&typeof a[1]=="string"):Object.entries(n).filter(a=>typeof a[1]=="string");o.length===0?t.push("    relocates = {}"):t.push(["    relocates = {",...o.map(([a,c],l)=>`        <${a}>: <${c}>${l+1<o.length?",":""}`),"    }"].join(`
`))}const r=Object.keys(e).filter(o=>!Em.has(o)).sort();for(const o of r){const a=e[o]?.value;if(a!==void 0)if(o==="subLayers"){const c=a;if(!Array.isArray(c)||c.length===0)continue;const l=e.subLayerOffsets?.value??[];t.push("    subLayers = ["),c.forEach((u,h)=>{const d=l[h],f=d&&(d.offset!==0||d.scale!==1)?` ${Rd(d)}`:"";t.push(`        @${u}@${f}${h<c.length-1?",":""}`)}),t.push("    ]")}else o==="doc"?t.push(`    doc = ${ae(String(a))}`):Yn(a)?t.push(...Gd(o,a,1)):typeof a=="string"?t.push(`    ${o} = ${ae(a)}`):typeof a=="number"?t.push(`    ${o} = ${$t(a)}`):typeof a=="boolean"&&t.push(`    ${o} = ${a}`)}return t}function Rd(i){const e=[];return i.offset!==0&&e.push(`offset = ${$t(i.offset)}`),i.scale!==1&&e.push(`scale = ${$t(i.scale)}`),`(${e.join("; ")})`}function Om(i){let e="";i.assetPath&&(e+=`@${i.assetPath}@`),i.primPath&&(e+=`<${i.primPath}>`);const t=i.layerOffset;return t&&(t.offset!==0||t.scale!==1)&&(e+=` ${Rd(t)}`),e}function cn(i,e,t,s=!1){const n=[],r=(o,a)=>{if(!a||a.length===0)return;const c=a.map(t),l=s&&c.length===1?c[0]:c.length>1&&o===""&&i!=="apiSchemas"&&i!=="variantSets"?`[
${c.map((u,h)=>`\0    ${u}${h+1<c.length?",":""}`).join(`
`)}
\0]`:`[${c.join(", ")}]`;n.push(`${o}${i} = ${l}`)};return e.isExplicit?r("",e.explicitItems):(r("delete ",e.deletedItems),r("add ",e._sdfAddedItems),r("prepend ",e.prependedItems),r("append ",e.appendedItems?.filter(o=>!(e._sdfAddedItems??[]).some(a=>JSON.stringify(a)===JSON.stringify(o)))),r("reorder ",e.orderedItems)),n}function Yn(i){return i!==null&&typeof i=="object"&&!Array.isArray(i)&&Object.getPrototypeOf(i)===Object.prototype}function Fd(i,e,t,s){const n=It(t),r=/^[A-Za-z_][A-Za-z0-9_]*$/.test(i)?i:ae(i,!1);if(Yn(e)){const o=[`${n}dictionary ${r} = {`],a=_c(e);for(const c of Object.keys(e).sort())o.push(...Fd(c,e[c],t+1,a?.get(c)));return o.push(`${n}}`),o}if(e instanceof Ps)return[`${n}asset ${r} = ${Vi(e.getAssetPath())}`];if(s==="asset"&&typeof e=="string")return[`${n}asset ${r} = ${Vi(e)}`];if(s==="asset[]"&&Array.isArray(e))return[`${n}asset[] ${r} = [${e.map(o=>Vi(o instanceof Ps?o.getAssetPath():String(o))).join(", ")}]`];if(s==="double2[]"&&Array.isArray(e))return[`${n}double2[] ${r} = [${e.map(o=>`(${o.map(a=>$t(Number(a))).join(", ")})`).join(", ")}]`];if(s==="double"&&typeof e=="number")return[`${n}double ${r} = ${$t(e)}`];if(s==="token"&&typeof e=="string")return[`${n}token ${r} = ${ae(e,!1)}`];if(typeof e=="string")return[`${n}string ${r} = ${ae(e)}`];if(typeof e=="boolean")return[`${n}bool ${r} = ${e?"1":"0"}`];if(typeof e=="bigint")return[`${n}int64 ${r} = ${e}`];if(typeof e=="number")return[`${n}${Number.isInteger(e)?"int":"double"} ${r} = ${$t(e)}`];if(Array.isArray(e)){if(e.every(o=>typeof o=="string"))return[`${n}token[] ${r} = [${e.map(o=>ae(o,!1)).join(", ")}]`];if(e.every(o=>typeof o=="number")){const o=e.every(a=>Number.isInteger(a))?"int[]":"double[]";return[`${n}${o} ${r} = [${e.map(a=>$t(a)).join(", ")}]`]}}return[`${n}string ${r} = ${ae(String(e))}`]}function Gd(i,e,t){const s=It(t),n=[`${s}${i} = {`],r=_c(e);for(const o of Object.keys(e).sort())n.push(...Fd(o,e[o],t+1,r?.get(o)));return n.push(`${s}}`),n}const Rm=new Set(["specifier","typeName","primChildren","properties","primOrder","propertyOrder","variantSetChildren","comment","relocates"]);function $d(i){const e=[],t=i.comment?.value;typeof t=="string"&&t!==""&&e.push(ae(t));const s=Object.keys(i).filter(n=>!Rm.has(n)&&i[n]?.value!==void 0).sort((n,r)=>uo(n,r));for(const n of s){const r=i[n].value;switch(n){case"apiSchemas":case"clipSets":e.push(...cn(n,r,o=>ae(o,!1)));break;case"inheritPaths":e.push(...cn("inherits",r,o=>`<${o}>`));break;case"specializes":e.push(...cn("specializes",r,o=>`<${o}>`));break;case"references":case"payload":e.push(...cn(n,r,Om,!0));break;case"variantSetNames":e.push(...cn("variantSets",r,o=>ae(o,!1)));break;case"variantSelection":{const o=r;if(Yn(o)&&Object.keys(o).length>0){e.push("variants = {");for(const[a,c]of Object.entries(o)){const l=Array.isArray(c)?c[0]:c;typeof l=="string"&&e.push(`    string ${a} = ${ae(l,!1)}`)}e.push("}")}break}case"doc":e.push(`doc = ${ae(String(r))}`);break;default:e.push(...Ld(n,r));break}}if(i.variantSetNames?.value===void 0){const n=i.variantSetChildren?.value;Array.isArray(n)&&n.length>0&&e.push(`prepend variantSets = [${n.map(r=>ae(r,!1)).join(", ")}]`)}return e}function Ld(i,e){return Yn(e)?Gd(i,e,0):typeof e=="boolean"?[`${i} = ${e}`]:i==="permission"&&(e==="public"||e==="private")?[`${i} = ${e}`]:typeof e=="string"?[`${i} = ${ae(e)}`]:typeof e=="number"?[`${i} = ${$t(e)}`]:typeof e=="bigint"?[`${i} = ${e}`]:Array.isArray(e)?[`${i} = [${e.map(t=>typeof t=="string"?ae(t,!1):_s(t)).join(", ")}]`]:[]}function Vd(i,e,t,s){const n=i[e];if(!n)return;const r=n.specifier?.value??"def",o=n.typeName?.value,a=e.lastIndexOf("/"),c=e.lastIndexOf("}"),l=e.slice(Math.max(a,c)+1),u=It(s);let h=r;o&&(h+=` ${o}`),h+=` "${l}"`;const d=$d(n);if(d.length>0){t.push(`${u}${h} (`);for(const f of d)Sc(t,f,s+1);t.push(`${u})`)}else t.push(`${u}${h}`);t.push(`${u}{`),Ud(i,e,n,t,s),t.push(`${u}}`)}function Ud(i,e,t,s,n){const r=It(n+1),o=t.propertyOrder?.value;Array.isArray(o)&&o.length>1&&s.push(`${r}reorder properties = [${o.map(h=>ae(h,!1)).join(", ")}]`);const a=t.primOrder?.value;Array.isArray(a)&&a.length>1&&s.push(`${r}reorder nameChildren = [${a.map(h=>ae(h,!1)).join(", ")}]`);const c=(t.properties?.value??[]).slice().sort((h,d)=>{const f=uo(h,d);return f!==0?f:hl(i[`${e}.${h}`])-hl(i[`${e}.${d}`])});for(const h of c){const d=i[`${e}.${h}`];d&&$m(d,h,s,n+1)}const l=t.primChildren?.value??[];l.length>0&&c.length>0&&s.push(""),l.forEach((h,d)=>{d>0&&s.push(""),Vd(i,`${e==="/"?"":e}${e.endsWith("}")?"":"/"}${h}`,s,n+1)});const u=t.variantSetChildren?.value??[];for(const h of u){const f=i[`${e}{${h}=}`]?.variantChildren?.value??[];if(f.length===0)continue;s[s.length-1]!==""&&c.length>0&&s.push("");const p=It(n+1);s.push(`${p}variantSet "${h}" = {`);for(const y of f){const m=`${e}{${h}=${y}}`,g=i[m],S=It(n+2);if(!g){s.push(`${S}"${y}" {`,`${S}}`);continue}const _=$d(g);if(_.length>0){s.push(`${S}"${y}" (`);for(const P of _)Sc(s,P,n+3);s.push(`${S})`),s.push(`${S}{`)}else s.push(`${S}"${y}" {`);Ud(i,m,g,s,n+2),(g.primChildren?.value??[]).length>0&&s.push(""),s.push(`${S}}`)}s.push(`${p}}`)}}function hl(i){return i?.typeName?.value==="rel"?1:0}const Fm=new Set(["typeName","default","timeSamples","connectionPaths","targetPaths","custom","variability","spline","comment"]);function Gm(i){const e=[],t=i.comment?.value;typeof t=="string"&&t!==""&&e.push(ae(t));const s=Object.keys(i).filter(n=>!Fm.has(n)&&i[n]?.value!==void 0).sort((n,r)=>uo(n,r));for(const n of s){const r=i[n].value;n==="doc"?e.push(`doc = ${ae(String(r))}`):e.push(...Ld(n,r))}return e}function Sc(i,e,t){const[s,...n]=e.split(`
`);i.push(`${It(t)}${s}`);for(const r of n)i.push(r.startsWith("\0")?`${It(t)}${r.slice(1)}`:r)}function dl(i,e,t,s){if(t.length===0){i.push(e);return}i.push(`${e} (`);for(const n of t)Sc(i,n,s+1);i.push(`${It(s)})`)}function $m(i,e,t,s){const n=It(s),r=i.typeName?.value,o=Gm(i),a=i.custom?.value===!0?"custom ":"";if(r==="rel"){const _=i.targetPaths?.value,P=Array.isArray(_)?_:_&&typeof _=="object"?[..._.prependedItems??[],..._.explicitItems??[],..._.appendedItems??[]].filter(b=>!(_.deletedItems??[]).includes(b)):[],w=_!==void 0&&!Array.isArray(_)&&(_.prependedItems?.length??0)===0&&(_.explicitItems?.length??0)===0&&(_.appendedItems?.length??0)===0&&(_.deletedItems?.length??0)===0;let v;P.length===0?v=w?`${n}${a}rel ${e} = None`:`${n}${a}rel ${e}`:P.length===1?v=`${n}${a}rel ${e} = <${P[0]}>`:v=`${n}${a}rel ${e} = [
`+P.map(b=>`${It(s+1)}<${b}>,`).join(`
`)+`
${n}]`,dl(t,v,o,s);return}const c=r?.startsWith("uniform "),l=c?r.slice(8):r,u=c||i.variability?.value==="uniform",h=`${a}${u?"uniform ":""}`,d=i.default?.value,f="default"in i,p=i.timeSamples?.value,y=Array.isArray(p)?p:p&&typeof p=="object"?Object.entries(p).map(([_,P])=>[Number(_),P]):[],m=i.connectionPaths?.value,g=i.spline?.value,S=m==null?[]:typeof m=="string"?[m]:m;if(o.length>0||f||a!==""||S.length===0&&y.length===0){const _=l??yl(d);let P=`${n}${h}${_} ${e}`;f&&(P+=` = ${_s(d,_)}`),dl(t,P,o,s)}if(y.length>0){const _=l??yl(y[0]?.[1]);t.push(`${n}${u?"uniform ":""}${_} ${e}.timeSamples = {`);for(const[P,w]of y)t.push(`${n}    ${vr(P)}: ${_s(w,_)},`);t.push(`${n}}`)}if(g instanceof Ve){const _=l??g.GetValueType().GetTypeName();t.push(`${n}${u?"uniform ":""}${_} ${e}.spline = {`),t.push(...Lm(g,_,s+1)),t.push(`${n}}`)}if(S.length>0){const _=l??"token",P=S.length===1?`<${S[0]}>`:`[${S.map(w=>`<${w}>`).join(", ")}]`;t.push(`${n}${u?"uniform ":""}${_} ${e}.connect = ${P}`)}}function Lm(i,e,t){const s=[],n=It(t),r=i.GetKnots().slice().sort((h,d)=>h.GetTime()-d.GetTime()),o=i.GetCurveType();(o===Ue.Hermite||r.some(h=>h.GetNextInterpolation()===ne.Curve))&&s.push(`${n}${o===Ue.Hermite?"hermite":"bezier"},`);const a=h=>{switch(h){case Q.ValueBlock:return"none";case Q.Linear:return"linear";case Q.Sloped:return"sloped";case Q.LoopRepeat:return"loopRepeat";case Q.LoopReset:return"loopReset";case Q.LoopOscillate:return"loopOscillate";default:return"held"}},c=(h,d)=>{if(d.mode===Q.Held&&d.slope===0)return;const f=d.mode===Q.Sloped?`(${_s(d.slope,e)})`:"";s.push(`${n}${h}: ${a(d.mode)}${f},`)};c("pre",i.GetPreExtrapolation()),c("post",i.GetPostExtrapolation());const l=i.GetInnerLoopParams();(l.protoStart!==0||l.protoEnd!==0||l.numPreLoops!==0||l.numPostLoops!==0||l.valueOffset!==0)&&s.push(`${n}loop: (${vr(l.protoStart)}, ${vr(l.protoEnd)}, ${l.numPreLoops}, ${l.numPostLoops}, ${_s(l.valueOffset,e)}),`);let u=ne.Curve;for(const h of r){let d=`${n}${vr(h.GetTime())}: `;if(h.IsDualValued()&&(d+=`${_s(h.GetPreValue(),e)} & `),d+=_s(h.GetValue(),e),u===ne.Curve&&(d+=`; pre ${pl(o,h.GetPreTanWidth(),h.GetPreTanSlope(),h.GetPreTanAlgorithm(),e)}`),u=h.GetNextInterpolation(),u===ne.Curve)d+=`; post curve ${pl(o,h.GetPostTanWidth(),h.GetPostTanSlope(),h.GetPostTanAlgorithm(),e)}`;else{const p=u===ne.ValueBlock?"none":u===ne.Linear?"linear":"held";d+=`; post ${p}`}const f=h.GetCustomData();Object.keys(f).length>0&&(d+=`; ${zd(f)}`),s.push(`${d},`)}return s}function pl(i,e,t,s,n){const r=i===Ue.Bezier?[$t(e),_s(t,n)]:[_s(t,n)];return s!==_t.None&&r.push(s===_t.AutoEase?"autoEase":"custom"),`(${r.join(", ")})`}function zd(i){return`{ ${Object.keys(i).sort().map(t=>{const s=i[t],n=/^[A-Za-z_][A-Za-z0-9_]*$/.test(t)?t:ae(t,!1);return Yn(s)?`dictionary ${n} = ${zd(s)}`:s instanceof Ps?`asset ${n} = ${Vi(s.getAssetPath())}`:typeof s=="string"?`string ${n} = ${ae(s)}`:typeof s=="boolean"?`bool ${n} = ${s?"1":"0"}`:typeof s=="number"?`${Number.isInteger(s)?"int":"double"} ${n} = ${$t(s)}`:`string ${n} = ${ae(String(s))}`}).join("; ")} }`}function fl(i){return!!(/^(double|float|half|int|uint)[234]$/.test(i)||/^(point|normal|vector|color)[234][fdh]?$/.test(i)||/^texCoord[234][fdh]$/.test(i)||/^quat[fdh]$/.test(i))}function ml(i){return/^matrix[234]d$/.test(i)||i==="frame4d"}function gl(i){return i==="asset"}function Vm(i){return!!(i==="float"||i==="half"||/^(float|half)[234]$/.test(i)||/^(point|normal|vector|color|texCoord)[234][fh]$/.test(i)||/^quat[fh]$/.test(i))}function yl(i){if(i==null)return"token";if(typeof i=="boolean")return"bool";if(typeof i=="string")return"string";if(typeof i=="number")return Number.isInteger(i)?"int":"float";if(Array.isArray(i)){if(i.length===0)return"float[]";const e=i[0];if(Array.isArray(e))return`float${e.length}[]`;if(typeof e=="string")return"string[]";if(typeof e=="boolean")return"bool[]";if(typeof e=="number")return i.every(t=>Number.isInteger(t))?"int[]":"float[]"}return"token"}function _s(i,e){const t=e?e.endsWith("[]")?e.slice(0,-2):e:void 0,s=t?Vm(t):!1;return jd(i,e,s)}function jd(i,e,t){if(i instanceof Pe)return"None";if(i instanceof St)return"AnimationBlock";if(i==null)return"None";if(typeof i=="boolean")return i?"1":"0";if(typeof i=="number")return $t(i,t);if(typeof i=="bigint")return i.toString();const s=e?e.endsWith("[]")?e.slice(0,-2):e:void 0;if(typeof i=="string")return s&&gl(s)?Vi(i):ae(i);const n=r=>jd(r,void 0,t);if(Array.isArray(i)){if(i.length===0)return"[]";if(e&&s){if(e.endsWith("[]"))return fl(s)?`[${i.map(c=>Array.isArray(c)?`(${c.map(n).join(", ")})`:n(c)).join(", ")}]`:ml(s)?`[${i.map(c=>_l(c,n)).join(", ")}]`:gl(s)?`[${i.map(a=>typeof a=="string"?Vi(a):n(a)).join(", ")}]`:`[${i.map(n).join(", ")}]`;if(fl(s))return`(${i.map(n).join(", ")})`;if(ml(s))return _l(i,n)}const r=i[0];return Array.isArray(r)?`[${i.map(a=>`(${a.map(n).join(", ")})`).join(", ")}]`:`[${i.map(n).join(", ")}]`}return String(i)}function _l(i,e){return`( ${i.map(t=>`(${t.map(e).join(", ")})`).join(", ")} )`}function Vi(i){return i.includes("@")?`@@@${i.replace(/@@@/g,"\\@@@")}@@@`:`@${i}@`}function ae(i,e=!0){let t='"';i.includes('"')&&!i.includes("'")&&(t="'");const s=e&&i.includes(`
`);let n=s?t+t+t:t;for(const r of i)if(r===`
`)n+=s?`
`:"\\n";else if(r==="\r")n+="\\r";else if(r==="	")n+="\\t";else if(r==="\\")n+="\\\\";else if(r===t)n+="\\"+t;else{const o=r.codePointAt(0);o>=32&&o<=126?n+=r:o<32||o===127?n+=`\\x${o.toString(16).padStart(2,"0")}`:n+=r}return n+=s?t+t+t:t,n}function Um(i){const e=Math.fround(i);for(let t=1;t<=9;t++){const s=Number(e.toPrecision(t));if(Math.fround(s)===e)return Ia(s.toString())}return Ia(e.toString())}function Ia(i){return i.replace("e+","e")}function $t(i,e=!1){if(Number.isNaN(i))return"nan";if(!Number.isFinite(i))return i>0?"inf":"-inf";if(Number.isInteger(i))return`${i}`;const t=e?Um(i):Ia(String(i));return t.includes(".")||t.includes("e")?t:`${t}.0`}function vr(i){return Number.isInteger(i)?`${i}`:String(i)}function It(i){return"    ".repeat(i)}class Bi{constructor(e,t){this.raw=e,this.value=t}valueOf(){return this.value}}function po(i){return i instanceof Bi?i.value:Array.isArray(i)?i.map(po):i}function zm(i){switch(i){case"bool":return"bool";case"int":case"uint":return"int";case"int64":case"uint64":return"int64";case"float":case"double":case"half":case"timecode":return"float";case"string":return"string";case"token":return"token";case"asset":return"asset";default:return"unknown"}}function jm(i){switch(i){case"int":return"int";case"float":case"double":case"half":return"float";case"point":case"normal":case"vector":case"color":case"texCoord":return"float";default:return"unknown"}}function Wm(i){if(i==="frame4d")return{kind:"matrix",dim:4,scalar:"float"};const e=/^matrix([234])d$/.exec(i);if(e)return{kind:"matrix",dim:parseInt(e[1],10),scalar:"float"};if(/^quat[fdh]$/.test(i))return{kind:"quat",dim:4,scalar:"float"};let t=/^(float|double|half|int)([234])$/.exec(i);if(t)return{kind:"vec",dim:parseInt(t[2],10),scalar:jm(t[1])};if(t=/^(point|normal|vector|color|texCoord)([234])[fdh]?$/.exec(i),t)return{kind:"vec",dim:parseInt(t[2],10),scalar:"float"};const s=zm(i);return s!=="unknown"?{kind:"scalar",dim:1,scalar:s}:null}function or(i,e){if(i==null)return i;switch(e){case"bool":return i instanceof Bi?i.value!==0:typeof i=="boolean"?i:typeof i=="number"?i!==0:i==="true"||i==="True"?!0:i==="false"||i==="False"?!1:i;case"int":if(i instanceof Bi)return Math.trunc(i.value);if(typeof i=="number")return Math.trunc(i);if(typeof i=="string"){const t=Number(i);return Number.isFinite(t)?Math.trunc(t):i}return typeof i=="bigint"?Number(i):i;case"int64":if(i instanceof Bi)try{return BigInt(i.raw)}catch{return BigInt(Math.trunc(i.value))}if(typeof i=="bigint")return i;if(typeof i=="number")return BigInt(Math.trunc(i));if(typeof i=="string")try{return BigInt(i)}catch{return i}return i;case"float":if(i instanceof Bi)return i.value;if(typeof i=="number")return i;if(typeof i=="string"){const t=Number(i);return Number.isFinite(t)||i==="inf"||i==="-inf"||i==="nan"?t:i}return typeof i=="bigint"?Number(i):i;case"string":case"token":case"asset":return i;default:return i}}function Ir(i){if(!Array.isArray(i))return[i];const e=[];for(const t of i)Array.isArray(t)?e.push(...Ir(t)):e.push(t);return e}function Oo(i,e){if(i==null)return i;switch(e.kind){case"scalar":return or(i,e.scalar);case"vec":return Ir(i).map(s=>or(s,e.scalar));case"quat":return Ir(i).map(s=>or(s,"float"));case"matrix":{const t=Ir(i).map(r=>or(r,"float")),s=e.dim;if(t.length<s*s)return t;const n=[];for(let r=0;r<s;r++)n.push(t.slice(r*s,r*s+s));return n}default:return i}}function Aa(i,e){if(i==null||!e)return i;let t=e;(t.startsWith("uniform ")||t.startsWith("varying "))&&(t=t.slice(8));const s=t.endsWith("[]"),n=s?t.slice(0,-2):t,r=Wm(n);return r?s?Array.isArray(i)?i.map(o=>Oo(o,r)):[Oo(i,r)]:Oo(i,r):po(i)}const he={Point:"Point",Normal:"Normal",Vector:"Vector",Color:"Color",Frame:"Frame",Group:"Group",TextureCoordinate:"TextureCoordinate"};function qm(i){return{name:i.name,type:i.type,cppTypeName:i.cppTypeName??i.type,role:i.role??"",dimensions:i.dimensions??[],isArray:!1,isScalar:!0}}function Hm(i){const e={name:`${i.name}[]`,type:`${i.type}[]`,cppTypeName:`VtArray<${i.cppTypeName}>`,role:i.role,dimensions:i.dimensions,isArray:!0,isScalar:!1,scalarType:i};return{scalar:{...i,arrayType:e},array:e}}function O(i){const e=qm(i);return i.noArrays?{scalar:e}:Hm(e)}const Sl=O({name:"bool",type:"bool"}),Pl=O({name:"uchar",type:"uchar",cppTypeName:"unsigned char"}),wl=O({name:"int",type:"int"}),bl=O({name:"uint",type:"uint",cppTypeName:"unsigned int"}),vl=O({name:"int64",type:"int64",cppTypeName:"int64_t"}),Il=O({name:"uint64",type:"uint64",cppTypeName:"uint64_t"}),Al=O({name:"half",type:"half",cppTypeName:"GfHalf"}),Tl=O({name:"float",type:"float"}),xl=O({name:"double",type:"double"}),Dl=O({name:"timecode",type:"timecode",cppTypeName:"SdfTimeCode"}),kl=O({name:"string",type:"string",cppTypeName:"std::string"}),Cl=O({name:"token",type:"token",cppTypeName:"TfToken"}),Nl=O({name:"asset",type:"asset",cppTypeName:"SdfAssetPath"}),Km=O({name:"opaque",type:"opaque",cppTypeName:"SdfOpaqueValue",noArrays:!0}),Zm=O({name:"group",type:"opaque",cppTypeName:"SdfOpaqueValue",role:he.Group,noArrays:!0}),Ml=O({name:"pathExpression",type:"pathExpression",cppTypeName:"SdfPathExpression"}),El=O({name:"double2",type:"GfVec2d",dimensions:[2]}),Bl=O({name:"double3",type:"GfVec3d",dimensions:[3]}),Ol=O({name:"double4",type:"GfVec4d",dimensions:[4]}),Rl=O({name:"float2",type:"GfVec2f",dimensions:[2]}),Fl=O({name:"float3",type:"GfVec3f",dimensions:[3]}),Gl=O({name:"float4",type:"GfVec4f",dimensions:[4]}),$l=O({name:"half2",type:"GfVec2h",dimensions:[2]}),Ll=O({name:"half3",type:"GfVec3h",dimensions:[3]}),Vl=O({name:"half4",type:"GfVec4h",dimensions:[4]}),Ul=O({name:"int2",type:"GfVec2i",dimensions:[2]}),zl=O({name:"int3",type:"GfVec3i",dimensions:[3]}),jl=O({name:"int4",type:"GfVec4i",dimensions:[4]}),Wl=O({name:"point3h",type:"GfVec3h",role:he.Point,dimensions:[3]}),ql=O({name:"point3f",type:"GfVec3f",role:he.Point,dimensions:[3]}),Hl=O({name:"point3d",type:"GfVec3d",role:he.Point,dimensions:[3]}),Kl=O({name:"vector3h",type:"GfVec3h",role:he.Vector,dimensions:[3]}),Zl=O({name:"vector3f",type:"GfVec3f",role:he.Vector,dimensions:[3]}),Yl=O({name:"vector3d",type:"GfVec3d",role:he.Vector,dimensions:[3]}),Xl=O({name:"normal3h",type:"GfVec3h",role:he.Normal,dimensions:[3]}),Ql=O({name:"normal3f",type:"GfVec3f",role:he.Normal,dimensions:[3]}),Jl=O({name:"normal3d",type:"GfVec3d",role:he.Normal,dimensions:[3]}),eu=O({name:"color3h",type:"GfVec3h",role:he.Color,dimensions:[3]}),tu=O({name:"color3f",type:"GfVec3f",role:he.Color,dimensions:[3]}),su=O({name:"color3d",type:"GfVec3d",role:he.Color,dimensions:[3]}),iu=O({name:"color4h",type:"GfVec4h",role:he.Color,dimensions:[4]}),nu=O({name:"color4f",type:"GfVec4f",role:he.Color,dimensions:[4]}),ru=O({name:"color4d",type:"GfVec4d",role:he.Color,dimensions:[4]}),ou=O({name:"quath",type:"GfQuath",dimensions:[4]}),au=O({name:"quatf",type:"GfQuatf",dimensions:[4]}),cu=O({name:"quatd",type:"GfQuatd",dimensions:[4]}),lu=O({name:"matrix2d",type:"GfMatrix2d",dimensions:[2,2]}),uu=O({name:"matrix3d",type:"GfMatrix3d",dimensions:[3,3]}),hu=O({name:"matrix4d",type:"GfMatrix4d",dimensions:[4,4]}),du=O({name:"frame4d",type:"GfMatrix4d",role:he.Frame,dimensions:[4,4]}),pu=O({name:"texCoord2f",type:"GfVec2f",role:he.TextureCoordinate,dimensions:[2]}),fu=O({name:"texCoord2d",type:"GfVec2d",role:he.TextureCoordinate,dimensions:[2]}),mu=O({name:"texCoord2h",type:"GfVec2h",role:he.TextureCoordinate,dimensions:[2]}),gu=O({name:"texCoord3f",type:"GfVec3f",role:he.TextureCoordinate,dimensions:[3]}),yu=O({name:"texCoord3d",type:"GfVec3d",role:he.TextureCoordinate,dimensions:[3]}),_u=O({name:"texCoord3h",type:"GfVec3h",role:he.TextureCoordinate,dimensions:[3]}),Ym={Bool:Sl.scalar,UChar:Pl.scalar,Int:wl.scalar,UInt:bl.scalar,Int64:vl.scalar,UInt64:Il.scalar,Half:Al.scalar,Float:Tl.scalar,Double:xl.scalar,TimeCode:Dl.scalar,String:kl.scalar,Token:Cl.scalar,Asset:Nl.scalar,Int2:Ul.scalar,Int3:zl.scalar,Int4:jl.scalar,Half2:$l.scalar,Half3:Ll.scalar,Half4:Vl.scalar,Float2:Rl.scalar,Float3:Fl.scalar,Float4:Gl.scalar,Double2:El.scalar,Double3:Bl.scalar,Double4:Ol.scalar,Point3h:Wl.scalar,Point3f:ql.scalar,Point3d:Hl.scalar,Vector3h:Kl.scalar,Vector3f:Zl.scalar,Vector3d:Yl.scalar,Normal3h:Xl.scalar,Normal3f:Ql.scalar,Normal3d:Jl.scalar,Color3h:eu.scalar,Color3f:tu.scalar,Color3d:su.scalar,Color4h:iu.scalar,Color4f:nu.scalar,Color4d:ru.scalar,Quath:ou.scalar,Quatf:au.scalar,Quatd:cu.scalar,Matrix2d:lu.scalar,Matrix3d:uu.scalar,Matrix4d:hu.scalar,Frame4d:du.scalar,TexCoord2h:mu.scalar,TexCoord2f:pu.scalar,TexCoord2d:fu.scalar,TexCoord3h:_u.scalar,TexCoord3f:gu.scalar,TexCoord3d:yu.scalar,Opaque:Km.scalar,Group:Zm.scalar,PathExpression:Ml.scalar,BoolArray:Sl.array,UCharArray:Pl.array,IntArray:wl.array,UIntArray:bl.array,Int64Array:vl.array,UInt64Array:Il.array,HalfArray:Al.array,FloatArray:Tl.array,DoubleArray:xl.array,TimeCodeArray:Dl.array,StringArray:kl.array,TokenArray:Cl.array,AssetArray:Nl.array,Int2Array:Ul.array,Int3Array:zl.array,Int4Array:jl.array,Half2Array:$l.array,Half3Array:Ll.array,Half4Array:Vl.array,Float2Array:Rl.array,Float3Array:Fl.array,Float4Array:Gl.array,Double2Array:El.array,Double3Array:Bl.array,Double4Array:Ol.array,Point3hArray:Wl.array,Point3fArray:ql.array,Point3dArray:Hl.array,Vector3hArray:Kl.array,Vector3fArray:Zl.array,Vector3dArray:Yl.array,Normal3hArray:Xl.array,Normal3fArray:Ql.array,Normal3dArray:Jl.array,Color3hArray:eu.array,Color3fArray:tu.array,Color3dArray:su.array,Color4hArray:iu.array,Color4fArray:nu.array,Color4dArray:ru.array,QuathArray:ou.array,QuatfArray:au.array,QuatdArray:cu.array,Matrix2dArray:lu.array,Matrix3dArray:uu.array,Matrix4dArray:hu.array,Frame4dArray:du.array,TexCoord2hArray:mu.array,TexCoord2fArray:pu.array,TexCoord2dArray:fu.array,TexCoord3hArray:_u.array,TexCoord3fArray:gu.array,TexCoord3dArray:yu.array,PathExpressionArray:Ml.array},Xm=new Map(Object.values(Ym).map(i=>[i.name,i]));function Qm(i){return Xm.get(i)}function Wd(i={}){return i.equals?i.equals:i.key?(e,t)=>Object.is(i.key(e),i.key(t)):Object.is}function Ar(i,e,t){return i.some(s=>t(s,e))}function Tr(i,e){const t=[];for(const s of i)Ar(t,s,e)||t.push(s);return t}function Jm(i){return"isExplicit"in i||"explicitItems"in i||"deletedItems"in i||"prependedItems"in i||"appendedItems"in i||"orderedItems"in i}function rs(i){if(i==null)return null;if(Array.isArray(i))return{isExplicit:!0,explicitItems:[...i],deletedItems:[],prependedItems:[],appendedItems:[],orderedItems:[]};if(typeof i!="object")return{isExplicit:!0,explicitItems:[i],deletedItems:[],prependedItems:[],appendedItems:[],orderedItems:[]};if(!Jm(i))return null;const e=i;return{isExplicit:e.isExplicit??e.explicitItems!==void 0,explicitItems:[...e.explicitItems??[]],deletedItems:[...e.deletedItems??[]],prependedItems:[...e.prependedItems??[]],appendedItems:[...e.appendedItems??[]],orderedItems:[...e.orderedItems??[]]}}function qd(i,e,t={}){const s=Wd(t),n=Tr(e,s);if(n.length===0||i.length===0)return[...i];const r=[...i],o=[];for(const a of n){const c=r.findIndex(u=>s(u,a));if(c<0)continue;let l=c+1;for(;l<r.length&&!n.some(u=>s(u,r[l]));)l++;o.push(...r.splice(c,l-c))}return[...r,...o]}function Ks(i,e,t={}){const s=Wd(t),n=rs(e);if(n.isExplicit)return Tr(n.explicitItems,s);let r=i.filter(c=>!Ar(n.deletedItems,c,s));const o=Tr(n.prependedItems,s),a=Tr(n.appendedItems,s);return r=[...o,...r.filter(c=>!Ar(o,c,s))],r=[...r.filter(c=>!Ar(a,c,s)),...a],qd(r,n.orderedItems,t)}function Hd(i,e={}){let t=[];for(let s=i.length-1;s>=0;s--)t=Ks(t,i[s],e);return t}function Zs(i){return i.length>2&&i[0]==="`"&&i[i.length-1]==="`"}function Pc(i){if(i===null)return!0;const e=typeof i;return e==="string"||e==="boolean"?!0:e==="number"?Number.isInteger(i):Array.isArray(i)?i.every(Pc):!1}function Kd(i){return i==null?"None":Array.isArray(i)?"list":typeof i}const wc=i=>({value:i,errors:[]}),Ta=()=>({value:void 0,errors:[]}),Ui=i=>({value:void 0,errors:i});class eg{constructor(e){this.variables=e}requested=new Set;stack=[];getVariable(e){if(this.stack.includes(e)){const s=this.stack.map(n=>`'${n}'`).join(", ");return[Ui([`Encountered circular variable substitutions: [${s}, '${e}']`]),!0]}if(this.requested.add(e),!Object.prototype.hasOwnProperty.call(this.variables,e))return[Ta(),!1];const t=this.variables[e];if(!Pc(t))return[Ui([`Variable '${e}' has unsupported type ${Kd(t)}`]),!0];if(typeof t=="string"&&Zs(t)){const s=Yd(t);if(s.node){this.stack.push(e);try{return[s.node.evaluate(this),!0]}finally{this.stack.pop()}}else return s.errors.length?[Ui(s.errors.map(n=>`${n} (in variable '${e}')`)),!0]:[Ta(),!0]}return[wc(t),!0]}}class tg{constructor(e){this.parts=e}evaluate(e){let t="";for(const s of this.parts){if(!s.isVariable){t+=s.content;continue}const n=s.content,[r,o]=e.getVariable(n);if(!o)t+=`\${${n}}`;else if(r.value!==void 0&&r.value!==null)if(typeof r.value=="string")t+=r.value;else return Ui([`String value required for substituting variable '${n}', got ${Kd(r.value)}.`]);else if(r.errors.length)return Ui(r.errors)}return wc(t)}}class sg{constructor(e){this.varName=e}evaluate(e){const[t,s]=e.getVariable(this.varName);return s?t:Ui([`No value for variable '${this.varName}'`])}}class Ro{constructor(e){this.value=e}evaluate(){return wc(this.value)}}class ig{evaluate(){return Ta()}}function Zd(i,e){let t=e,s="";if(t>=i.length||!/[A-Za-z_]/.test(i[t]))return null;for(;t<i.length&&/[A-Za-z0-9_]/.test(i[t]);)s+=i[t++];return i[t]!=="}"?null:{name:s,next:t+1}}function ng(i,e,t){const s=[];let n="",r=t;const o=()=>{n&&(s.push({isVariable:!1,content:n}),n="")};for(;r<i.length;){const a=i[r];if(a===e)return o(),{node:new tg(s),errors:[],next:r+1};if(a==="\\"){const c=i[r+1];if(c==="`"||c==="$"||c==="\\"||c===e){n+=c,r+=2;continue}n+=a,r+=1;continue}if(a==="$"&&i[r+1]==="{"){const c=Zd(i,r+2);if(!c)return{node:null,errors:[i.indexOf("}",r+2)<0?`Missing ending '}' at character ${i.length}`:"Variables must be a C identifier"],next:r};o(),s.push({isVariable:!0,content:c.name}),r=c.next;continue}n+=a,r+=1}return{node:null,errors:[`Missing ending ${e}`],next:r}}function rg(i){const e=i.trim();if(e.length===0)return{node:null,errors:["Empty expression"]};const t=e[0];if(t==='"'||t==="'"){const s=ng(e,t,1);return s.node?s.next!==e.length?{node:null,errors:["Invalid string contents"]}:{node:s.node,errors:[]}:{node:null,errors:s.errors}}if(t==="$"&&e[1]==="{"){const s=Zd(e,2);return!s||s.next!==e.length?{node:null,errors:["Variables must be a C identifier"]}:{node:new sg(s.name),errors:[]}}return e==="None"||e==="none"?{node:new ig,errors:[]}:e==="True"||e==="true"?{node:new Ro(!0),errors:[]}:e==="False"||e==="false"?{node:new Ro(!1),errors:[]}:/^-?[0-9]+$/.test(e)?{node:new Ro(Number(e)),errors:[]}:{node:null,errors:[`Unsupported or malformed expression: \`${i}\``]}}function Yd(i){return Zs(i)?rg(i.slice(1,-1)):{node:null,errors:["Expressions must begin with '`'"]}}class og{constructor(e){this.expr=e;const t=Yd(e);this.node=t.node,this.parseErrors=t.errors}node;parseErrors;static isExpression(e){return Zs(e)}static isValidVariableType(e){return Pc(e)}isValid(){return this.node!==null}getString(){return this.expr}getErrors(){return[...this.parseErrors]}evaluate(e){if(!this.node)return{value:void 0,errors:[...this.parseErrors],usedVariables:[]};const t=new eg(e),s=this.node.evaluate(t);return{value:s.errors.length?void 0:s.value,errors:s.errors,usedVariables:[...t.requested]}}}function Xn(i,e){return new og(i).evaluate(e)}const Ls={offset:0,scale:1};function lt(i,e){return e*i.scale+i.offset}function os(i,e){return{offset:i.offset+i.scale*e.offset,scale:i.scale*e.scale}}function bc(i){return i.scale===0?null:{offset:-i.offset/i.scale,scale:1/i.scale}}function Fo(i){return i.offset===0&&i.scale===1}function ag(i,e){return i.offset===e.offset&&i.scale===e.scale}const cg=67324752,lg=33639248,ug=101010256;class Vs{constructor(e,t){this._bytes=e,this._entries=t}static isZip(e){return e.length>=4&&e[0]===80&&e[1]===75&&e[2]===3&&e[3]===4}static fromBytes(e){const t=new DataView(e.buffer,e.byteOffset,e.byteLength);let s=-1;for(let l=e.length-22;l>=0&&l>=e.length-22-65535;l--)if(t.getUint32(l,!0)===ug){s=l;break}if(s<0)throw new Error("UsdZipFile: end-of-central-directory record not found");const n=t.getUint16(s+10,!0),r=t.getUint32(s+16,!0),o=new Map;let a=r;const c=new TextDecoder;for(let l=0;l<n;l++){if(t.getUint32(a,!0)!==lg)throw new Error("UsdZipFile: malformed central directory");const u=t.getUint16(a+10,!0),h=t.getUint32(a+20,!0),d=t.getUint32(a+24,!0),f=t.getUint16(a+28,!0),p=t.getUint16(a+30,!0),y=t.getUint16(a+32,!0),m=t.getUint32(a+42,!0),g=c.decode(e.subarray(a+46,a+46+f));if(t.getUint32(m,!0)!==cg)throw new Error(`UsdZipFile: bad local header for '${g}'`);const S=t.getUint16(m+26,!0),_=t.getUint16(m+28,!0),P=m+30+S+_;o.set(g,{name:g,compressionMethod:u,compressedSize:h,uncompressedSize:d,dataOffset:P}),a+=46+f+p+y}return new Vs(e,o)}get entryNames(){return[...this._entries.keys()]}has(e){return this._entries.has(e)}getEntry(e){return this._entries.get(e)}getFileNames(){return[...this._entries.keys()]}defaultLayerName(){for(const e of this._entries.keys())if(/\.(usd|usda|usdc)$/i.test(e))return e}async extract(e){const t=this._entries.get(e);if(!t)throw new Error(`UsdZipFile: no entry '${e}'`);const s=this._bytes.subarray(t.dataOffset,t.dataOffset+t.compressedSize);if(t.compressionMethod===0)return s;if(t.compressionMethod===8){if(typeof DecompressionStream>"u")throw new Error(`UsdZipFile: '${e}' is deflate-compressed and DecompressionStream is unavailable`);const n=new Blob([s]).stream().pipeThrough(new DecompressionStream("deflate-raw"));return new Uint8Array(await new Response(n).arrayBuffer())}throw new Error(`UsdZipFile: unsupported compression method ${t.compressionMethod} for '${e}'`)}}(()=>{const i=new Uint32Array(256);for(let e=0;e<256;e++){let t=e;for(let s=0;s<8;s++)t=t&1?3988292384^t>>>1:t>>>1;i[e]=t>>>0}return i})();class hg{_layer=null;isDirty(){return this._IsDirty()}markCurrentStateAsClean(){this._MarkCurrentStateAsClean()}markCurrentStateAsDirty(){this._MarkCurrentStateAsDirty()}_setLayer(e){this._layer=e,this._OnSetLayer(e)}setField(e,t,s){this._OnSetField(e,t,s)}setTimeSample(e,t,s){this._OnSetTimeSample(e,t,s)}createSpec(e,t){this._OnCreateSpec(e,t)}deleteSpec(e){this._OnDeleteSpec(e)}pushChild(e,t,s){this._OnPushChild(e,t,s)}popChild(e,t,s){this._OnPopChild(e,t,s)}_GetLayer(){return this._layer}_IsDirty(){return!1}_MarkCurrentStateAsClean(){}_MarkCurrentStateAsDirty(){}_OnSetLayer(e){}_OnSetField(e,t,s){}_OnSetTimeSample(e,t,s){}_OnCreateSpec(e,t){}_OnDeleteSpec(e){}_OnPushChild(e,t,s){}_OnPopChild(e,t,s){}}class dg extends hg{_dirty=!1;_IsDirty(){return this._dirty}_MarkCurrentStateAsClean(){this._dirty=!1}_MarkCurrentStateAsDirty(){this._dirty=!0}_OnSetField(){this._dirty=!0}_OnSetTimeSample(){this._dirty=!0}_OnCreateSpec(){this._dirty=!0}_OnDeleteSpec(){this._dirty=!0}_OnPushChild(){this._dirty=!0}_OnPopChild(){this._dirty=!0}}function hs(i){return i!==null&&typeof i=="object"&&!Array.isArray(i)&&Object.getPrototypeOf(i)===Object.prototype}function Go(i){return i.split(":").filter(Boolean)}function Cn(i){const e=Object.fromEntries(Object.entries(i).map(([s,n])=>[s,Array.isArray(n)?n.map(js):hs(n)?Cn(n):n]));Dm(i,e);const t=Object.getOwnPropertyDescriptor(i,"_sdfAddedItems")?.value;return Array.isArray(t)&&Object.defineProperty(e,"_sdfAddedItems",{value:t.map(js),configurable:!0,enumerable:!1,writable:!0}),e}function js(i){return Array.isArray(i)?i.map(js):hs(i)?Cn(i):i instanceof Map?new Map([...i].map(([e,t])=>[e,js(t)])):i instanceof Set?new Set([...i].map(js)):i}function Nn(i,e){if(Object.is(i,e))return!0;if(Array.isArray(i)&&Array.isArray(e))return i.length===e.length&&i.every((t,s)=>Nn(t,e[s]));if(i instanceof Map&&e instanceof Map)return i.size===e.size&&[...i].every(([t,s])=>e.has(t)&&Nn(s,e.get(t)));if(i instanceof Set&&e instanceof Set)return i.size===e.size&&[...i].every(t=>e.has(t));if(i!==null&&e!==null&&typeof i=="object"&&typeof e=="object"){if(Object.getPrototypeOf(i)!==Object.getPrototypeOf(e))return!1;const t=Object.keys(i),s=Object.keys(e);return t.length===s.length&&t.every(n=>Object.prototype.hasOwnProperty.call(e,n)&&Nn(i[n],e[n]))}return!1}class pg{_visitDepth=0;isDetached(){return!this.streamsData()}isEmpty(){let e=!0;return this.visitSpecs({visitSpec:()=>(e=!1,!1),done:()=>{}}),e}copyFrom(e){this._requireMutable(),e!==this&&e.visitSpecs({visitSpec:(t,s)=>{this.createSpec(s,t.getSpecType(s));for(const n of t.list(s))this.set(s,n,js(t.get(s,n))),this.setValueTypeName(s,n,t.getValueTypeName(s,n));return!0},done:()=>{}})}equals(e){const t=[],s=[];if(this.visitSpecs({visitSpec:(r,o)=>(t.push(o),!0),done:()=>{}}),e.visitSpecs({visitSpec:(r,o)=>(s.push(o),!0),done:()=>{}}),t.length!==s.length)return!1;const n=new Set(s);for(const r of t){if(!n.has(r)||this.getSpecType(r)!==e.getSpecType(r))return!1;const o=this.list(r),a=e.list(r);if(o.length!==a.length)return!1;const c=new Set(a);if(!o.every(l=>c.has(l)&&this.getValueTypeName(r,l)===e.getValueTypeName(r,l)&&Nn(this.get(r,l),e.get(r,l))))return!1}return!0}createSpec(e,t){this._requireMutable(),this._createSpec(e,t)}eraseSpec(e){this._requireMutable(),this._eraseSpec(e)}moveSpec(e,t){this._requireMutable(),this._moveSpec(e,t)}hasSpecAndField(e,t){const s=this.getSpecType(e),n=s!=="unknown"&&this.has(e,t);return n?{specType:s,hasField:n,value:this.get(e,t)}:{specType:s,hasField:n}}set(e,t,s){this._requireMutable(),s===void 0?this._erase(e,t):this._set(e,t,s)}erase(e,t){this._requireMutable(),this._erase(e,t)}visitSpecs(e){this._visitDepth++;try{this._visitSpecs(e),e.done(this)}finally{this._visitDepth--}}hasDictKey(e,t,s){return this.getDictValueByKey(e,t,s)!==void 0}getDictValueByKey(e,t,s){let n=this.get(e,t);for(const r of Go(s)){if(!hs(n)||!Object.prototype.hasOwnProperty.call(n,r))return;n=n[r]}return n}setDictValueByKey(e,t,s,n){if(n===void 0){this.eraseDictValueByKey(e,t,s);return}const r=this.get(e,t),o=hs(r)?Cn(r):{},a=Go(s);if(a.length===0)return;let c=o;for(const l of a.slice(0,-1)){const u=c[l];c=c[l]=hs(u)?Cn(u):{}}c[a.at(-1)]=n,this.set(e,t,o)}eraseDictValueByKey(e,t,s){const n=this.get(e,t);if(!hs(n))return;const r=Cn(n),o=Go(s);if(o.length===0)return;const a=[];let c=r;for(const l of o.slice(0,-1)){const u=c[l];if(!hs(u))return;a.push([c,l]),c=u}if(Object.prototype.hasOwnProperty.call(c,o.at(-1))){delete c[o.at(-1)];for(let l=a.length-1;l>=0;--l){const[u,h]=a[l],d=u[h];hs(d)&&Object.keys(d).length===0&&delete u[h]}Object.keys(r).length===0?this.erase(e,t):this.set(e,t,r)}}listDictKeys(e,t,s){const n=s?this.getDictValueByKey(e,t,s):this.get(e,t);return hs(n)?Object.keys(n):[]}getPreviousTimeSampleForPath(e,t){const s=this.getBracketingTimeSamplesForPath(e,t);if(!s||t<s[0])return;if(t!==s[0])return s[0];const n=this.getBracketingTimeSamplesForPath(e,fg(t));return!n||n[0]===t?void 0:n[0]}setTimeSample(e,t,s){this._requireMutable(),s===void 0?this._eraseTimeSample(e,t):this._setTimeSample(e,t,s)}eraseTimeSample(e,t){this._requireMutable(),this._eraseTimeSample(e,t)}_requireMutable(){if(this._visitDepth!==0)throw new Error("SdfAbstractData may not be modified during spec visitation")}}function fg(i){if(Number.isNaN(i)||i===-1/0)return i;if(i===0)return-Number.MIN_VALUE;const e=new ArrayBuffer(8),t=new DataView(e);t.setFloat64(0,i);let s=t.getBigUint64(0);return s=i>0?s-1n:s+1n,t.setBigUint64(0,s),t.getFloat64(0)}function ar(i){return(i instanceof Map?[...i.entries()]:Array.isArray(i)?i.filter(t=>Array.isArray(t)&&t.length>=2):i!==null&&typeof i=="object"?Object.entries(i):[]).map(([t,s])=>[Number(t),s]).filter(([t])=>Number.isFinite(t)).sort(([t],[s])=>t-s)}function Su(i,e){if(i.length===0)return;if(e<=i[0])return[i[0],i[0]];const t=i.at(-1);if(e>=t)return[t,t];const s=i.findIndex(r=>r>=e),n=i[s];return n===e?[n,n]:[i[s-1],n]}class wn extends pg{_data=new Map;streamsData(){return!1}isDetached(){return!0}hasSpec(e){return this._data.has(e)}getSpecType(e){return this._data.get(e)?.specType??"unknown"}has(e,t){return this._data.get(e)?.fields.has(t)??!1}get(e,t){return js(this._data.get(e)?.fields.get(t))}getValueTypeName(e,t){return this._data.get(e)?.valueTypeNames.get(t)}setValueTypeName(e,t,s){const n=this._data.get(e);n&&(s===void 0?n.valueTypeNames.delete(t):n.valueTypeNames.set(t,s))}list(e){return[...this._data.get(e)?.fields.keys()??[]]}listAllTimeSamples(){const e=new Set;for(const t of this._data.keys())for(const s of this.listTimeSamplesForPath(t))e.add(s);return[...e].sort((t,s)=>t-s)}listTimeSamplesForPath(e){return ar(this.get(e,"timeSamples")).map(([t])=>t)}getBracketingTimeSamples(e){return Su(this.listAllTimeSamples(),e)}getNumTimeSamplesForPath(e){return this.listTimeSamplesForPath(e).length}getBracketingTimeSamplesForPath(e,t){return Su(this.listTimeSamplesForPath(e),t)}getPreviousTimeSampleForPath(e,t){const s=this.listTimeSamplesForPath(e);for(let n=s.length-1;n>=0;--n)if(s[n]<t)return s[n]}queryTimeSample(e,t){return ar(this.get(e,"timeSamples")).find(([s])=>s===t)?.[1]}_createSpec(e,t){if(t==="unknown")return;const s=this._data.get(e);s?s.specType=t:this._data.set(e,{specType:t,fields:new Map,valueTypeNames:new Map})}_eraseSpec(e){this._data.delete(e)}_moveSpec(e,t){const s=this._data.get(e);!s||this._data.has(t)||(this._data.set(t,s),this._data.delete(e))}_set(e,t,s){const n=this._data.get(e);n?.fields.set(t,js(s)),n?.valueTypeNames.delete(t)}_erase(e,t){const s=this._data.get(e);s?.fields.delete(t),s?.valueTypeNames.delete(t)}_visitSpecs(e){for(const t of this._data.keys())if(!e.visitSpec(this,t))break}_setTimeSample(e,t,s){if(!this._data.has(e))return;const n=ar(this.get(e,"timeSamples")).filter(([r])=>r!==t);n.push([t,s]),n.sort(([r],[o])=>r-o),this._set(e,"timeSamples",n)}_eraseTimeSample(e,t){const s=ar(this.get(e,"timeSamples")).filter(([n])=>n!==t);s.length===0?this._erase(e,"timeSamples"):this._set(e,"timeSamples",s)}}const mg="/",$o=".",gg="[",yg="]",Vr="/",Ur=".";class Pt{kind;parent;isAbsolute;elementCount;containsVariantSelection;name;variantSet;variant;targetPath;constructor(e){this.kind=e.kind,this.parent=e.parent,this.isAbsolute=e.isAbsolute,this.elementCount=e.parent?e.parent.elementCount+1:0,this.containsVariantSelection=(e.parent?.containsVariantSelection??!1)||e.kind==="variant",this.name=e.name??"",this.variantSet=e.variantSet??"",this.variant=e.variant??"",this.targetPath=e.targetPath??null}element(){switch(this.kind){case"root":return this.isAbsolute?Vr:Ur;case"prim":{const e=this.parent;return(e!==null&&(e.kind==="variant"||e.kind==="root"&&!e.isAbsolute)?"":mg)+this.name}case"variant":return`{${this.variantSet}=${this.variant}}`;case"property":return $o+this.name;case"relationalAttribute":return $o+this.name;case"target":return gg+this.targetPath.pathString+yg;case"expression":return $o+"expression"}}}const xr=new Pt({kind:"root",parent:null,isAbsolute:!0}),xa=new Pt({kind:"root",parent:null,isAbsolute:!1});class B{_node;_str;constructor(e){this._node=e}static emptyPath=new B(null);static absoluteRootPath=new B(xr);static reflexiveRelativePath=new B(xa);static fromString(e){return Xd(e)??B.emptyPath}static _wrap(e){return e===null?B.emptyPath:e===xr?B.absoluteRootPath:e===xa?B.reflexiveRelativePath:new B(e)}isEmpty(){return this._node===null}isAbsolutePath(){return this._node?.isAbsolute??!1}isAbsoluteRootPath(){return this._node===xr}get pathElementCount(){return this._node?.elementCount??0}isPrimPath(){const e=this._node;return e!==null&&(e.kind==="prim"||e.kind==="root"&&!e.isAbsolute)}isPrimVariantSelectionPath(){return this._node?.kind==="variant"}isPrimOrPrimVariantSelectionPath(){const e=this._node;return e!==null&&(e.kind==="prim"||e.kind==="variant"||e.kind==="root"&&e.isAbsolute)}isRootPrimPath(){const e=this._node;return e!==null&&e.kind==="prim"&&e.isAbsolute&&e.elementCount===1}isPropertyPath(){return this._node?.kind==="property"||this._node?.kind==="relationalAttribute"}isPrimPropertyPath(){return this._node?.kind==="property"}isTargetPath(){return this._node?.kind==="target"}containsPrimVariantSelection(){return this._node?.containsVariantSelection??!1}get name(){const e=this._node;return e===null?"":e.kind==="root"?e.isAbsolute?Vr:Ur:e.kind==="variant"?e.variant:e.name}getVariantSelection(){const e=this._node;return e&&e.kind==="variant"?[e.variantSet,e.variant]:["",""]}getTargetPath(){const e=this._node;return e&&e.kind==="target"?e.targetPath:B.emptyPath}getParentPath(){return this._node===null?B.emptyPath:B._wrap(this._node.parent)}reapplyVariantSelectionsOnto(e){if(e.isEmpty()||!this.containsPrimVariantSelection())return e;const t=new Map;for(let o=this;o._node!==null&&!o.isAbsoluteRootPath();o=o.getParentPath())o.isPrimVariantSelectionPath()&&t.set(o.getParentPath().stripAllVariantSelections().pathString,o.getVariantSelection());const s=e.stripAllVariantSelections(),n=[];for(let o=s;o._node!==null&&!o.isAbsoluteRootPath();o=o.getParentPath())n.unshift(o.name);let r=s.isAbsolutePath()?B.absoluteRootPath:B.reflexiveRelativePath;for(const o of n){r=r.appendChild(o);const a=t.get(r.stripAllVariantSelections().pathString);a!==void 0&&(r=r.appendVariantSelection(a[0],a[1]))}return r}getPrimPath(){let e=this._node;for(;e!==null&&e.kind!=="prim"&&e.kind!=="root";)e=e.parent;return e===null||e.kind==="root"?B.emptyPath:B._wrap(e)}stripAllVariantSelections(){if(this._node===null||!this._node.containsVariantSelection)return this;const e=[];for(let s=this._node;s!==null;s=s.parent)s.kind!=="variant"&&e.push(s);e.reverse();let t=null;for(const s of e)t=s.kind==="root"?s:Pu(s,t);return B._wrap(t)}appendChild(e){const t=this._node;if(t===null)throw new Error("cannot append a child to the empty path");return B._wrap(new Pt({kind:"prim",parent:t,isAbsolute:t.isAbsolute,name:e}))}appendVariantSelection(e,t){const s=this._node;if(s===null)throw new Error("cannot append a variant selection to the empty path");return B._wrap(new Pt({kind:"variant",parent:s,isAbsolute:s.isAbsolute,variantSet:e,variant:t}))}appendProperty(e){const t=this._node;if(t===null)throw new Error("cannot append a property to the empty path");return B._wrap(new Pt({kind:"property",parent:t,isAbsolute:t.isAbsolute,name:e}))}appendTarget(e){const t=this._node;if(t===null)throw new Error("cannot append a target to the empty path");return B._wrap(new Pt({kind:"target",parent:t,isAbsolute:t.isAbsolute,targetPath:e}))}hasPrefix(e){if(e.isEmpty()||this.isEmpty())return!1;const t=e.pathElementCount;let s=this._node;for(;s!==null&&s.elementCount>t;)s=s.parent;return s!==null&&B._wrap(s).pathString===e.pathString}replacePrefix(e,t){if(this.isEmpty()||e.isEmpty()||t.isEmpty())return this;if(!this.hasPrefix(e))return this;if(this.pathString===e.pathString)return t;const s=e.pathElementCount,n=[];for(let o=this._node;o!==null&&o.elementCount>s;o=o.parent)n.push(o);n.reverse();let r=t._node;for(const o of n)r=Pu(o,r);return B._wrap(r)}getCommonPrefix(e){if(this.isEmpty()||e.isEmpty())return B.emptyPath;let t=this._node,s=e._node;for(;t!==null&&s!==null&&t.elementCount>s.elementCount;)t=t.parent;for(;t!==null&&s!==null&&s.elementCount>t.elementCount;)s=s.parent;for(;t!==null&&s!==null&&B._wrap(t).pathString!==B._wrap(s).pathString;)t=t.parent,s=s.parent;return B._wrap(t)}get pathString(){if(this._str!==void 0)return this._str;const e=this._node;if(e===null)return this._str="";if(e.parent===null)return this._str=e.isAbsolute?Vr:Ur;const t=[];for(let s=e;s!==null&&s.parent!==null;s=s.parent)t.push(s.element());return t.reverse(),this._str=t.join("")}toString(){return this.pathString}equals(e){return this.pathString===e.pathString}}function Pu(i,e){return new Pt({kind:i.kind,parent:e,isAbsolute:e?.isAbsolute??i.isAbsolute,name:i.name,variantSet:i.variantSet,variant:i.variant,targetPath:i.targetPath})}function Xd(i){if(i==="")return B.emptyPath;if(i===Vr)return B.absoluteRootPath;if(i===Ur)return B.reflexiveRelativePath;const e=i[0]==="/";let t=e?xr:xa,s=0;const n=o=>/[A-Za-z0-9_]/.test(o),r=o=>{const a=s;for(;s<i.length&&o(i[s]);)s++;return i.slice(a,s)};for(;s<i.length;){const o=i[s];if(o==="/"){s++;const a=r(n);if(a==="")return null;t=new Pt({kind:"prim",parent:t,isAbsolute:e,name:a})}else if(o==="{"){const a=i.indexOf("}",s),c=i.indexOf("=",s);if(a<0||c<0||c>a)return null;t=new Pt({kind:"variant",parent:t,isAbsolute:e,variantSet:i.slice(s+1,c),variant:i.slice(c+1,a)}),s=a+1}else if(o==="."){s++;const a=r(l=>n(l)||l===":");if(a===""||t.kind==="property"||t.kind==="relationalAttribute"||t.kind==="expression")return null;const c=t.kind==="target"?"relationalAttribute":"property";t=new Pt({kind:c,parent:t,isAbsolute:e,name:a})}else if(o==="["){const a=i.lastIndexOf("]");if(a<0)return null;const c=Xd(i.slice(s+1,a));if(c===null||c.isEmpty())return null;t=new Pt({kind:"target",parent:t,isAbsolute:e,targetPath:c}),s=a+1}else if(n(o))t=new Pt({kind:"prim",parent:t,isAbsolute:e,name:r(n)});else return null}return B._wrap(t)}class _g{constructor(e,t){this._layer=e,this._path=t}getLayer(){return this._layer}getPath(){return B.fromString(this._path)}getSpecType(){return this._layer.getSpecType(this._path)}isDormant(){return!this._layer.hasSpec(this._path)}listInfoKeys(){return this._layer.getFieldNames(this._path)}hasInfo(e){return this._layer.getFieldNames(this._path).includes(e)}getInfo(e){return this._layer.getField(this._path,e)}setInfo(e,t){this._layer.setField(this._path,e,t)}clearInfo(e){this._layer.eraseField(this._path,e)}equals(e){return this._layer===e._layer&&this._path===e._path}}class Sg{#s=new Map;AddToCollection(e,t){if(t.length===0)return;const s=this.#s.get(e);s?s.push(...t):this.#s.set(e,[...t])}Iterate(e){this.#t(e,!1)}ReverseIterate(e){this.#t(e,!0)}GetThreadIds(){return[...this.#s.keys()]}GetEvents(e){return this.#s.get(e)??[]}get empty(){return this.#s.size===0}#t(e,t){e.OnBeginCollection();const s=[...this.#s];t&&s.reverse();for(const[n,r]of s){e.OnBeginThread(n);const o=t?[...r].reverse():r;for(const a of o)e.AcceptsCategory(a.category)&&e.OnEvent(n,a.key,a);e.OnEndThread(n)}e.OnEndCollection()}}var Ge=(i=>(i.Unknown="Unknown",i.Begin="Begin",i.End="End",i.Timespan="Timespan",i.Marker="Marker",i.CounterDelta="CounterDelta",i.CounterValue="CounterValue",i.ScopeData="ScopeData",i))(Ge||{});class Je{key;type;time;startTime;laneId;eventId;parentEventId;parentIsExplicit;value;data;category;constructor(e){this.key=e.key,this.type=e.type,this.time=e.time,this.startTime=e.startTime,this.laneId=e.laneId,this.eventId=e.eventId,this.parentEventId=e.parentEventId,this.parentIsExplicit=e.parentIsExplicit??!1,this.value=e.value,this.data=e.data,this.category=e.category??0}GetKey(){return this.key}GetTimeStamp(){return this.time}GetStartTimeStamp(){return this.startTime??this.time}GetEndTimeStamp(){return this.time}GetTimeSpanStamps(){return[this.GetStartTimeStamp(),this.GetEndTimeStamp()]}GetCounterValue(){return this.value??0}GetCategory(){return this.category}GetType(){return this.type}}const ke="Main Thread";function et(){return globalThis.performance?.now()??Date.now()}class At{static#s;#t=!1;#i=1;#n=new Map;#r=new Map;constructor(){}static GetInstance(){return At.#s??=new At}get enabled(){return this.#t}set enabled(e){this.SetEnabled(e)}static IsEnabled(){return At.GetInstance().#t}SetEnabled(e){this.#t=e}GetLabel(){return"TraceRegistry global collector"}BeginEvent(e,t=0){return this.#t?this._BeginEvent(e,ke,void 0,et(),!0,t).time:0}EndEvent(e){return this.#t?this._EndEvent(e,ke,void 0,et()):0}BeginEventAtTime(e,t,s=0){this.#t&&this._BeginEvent(e,ke,void 0,t,!0,s)}EndEventAtTime(e,t){this.#t&&this._EndEvent(e,ke,void 0,t)}Scope(e,t,s,n=0){if(!this.#t)return;const r=this.#i++;this.#e(ke,new Je({key:e,type:Ge.Timespan,time:s,startTime:t,laneId:ke,eventId:r,parentIsExplicit:!1,category:n}))}MarkerEvent(e,t=0){if(!this.#t)return 0;const s=et();return this.#e(ke,new Je({key:e,type:Ge.Marker,time:s,laneId:ke,category:t})),s}MarkerEventAtTime(e,t,s=0){this.#t&&this.#e(ke,new Je({key:e,type:Ge.Marker,time:t,laneId:ke,category:s}))}RecordCounterDelta(e,t,s=0){this.#t&&this.#e(ke,new Je({key:e,type:Ge.CounterDelta,time:et(),laneId:ke,value:t,category:s}))}RecordCounterValue(e,t,s=0){this.#t&&this.#e(ke,new Je({key:e,type:Ge.CounterValue,time:et(),laneId:ke,value:t,category:s}))}StoreData(e,t){if(!this.#t)return;const s=this.#r.get(ke)?.at(-1)?.eventId;this.#e(ke,new Je({key:e,type:Ge.ScopeData,time:et(),laneId:ke,eventId:s,data:t}))}Clear(){this.#n.clear(),this.#r.clear()}CreateCollection(){const e=new Sg;for(const[t,s]of this.#n)e.AddToCollection(t,s);return this.#n=new Map,e}_BeginEvent(e,t,s,n=et(),r=!0,o=0){const a=this.#r.get(t)??[],c=r?s??a.at(-1)?.eventId:s,l={eventId:this.#i++,parentEventId:c,laneId:t,key:e,category:o};return a.push(l),this.#r.set(t,a),this.#e(t,new Je({key:e,type:Ge.Begin,time:n,laneId:t,eventId:l.eventId,parentEventId:l.parentEventId,parentIsExplicit:!0,category:o})),{...l,time:n}}_EndEvent(e,t,s,n=et()){const r=this.#r.get(t)??[],o=s===void 0?r.length-1:r.findIndex(c=>c.eventId===s);if(o<0)return this.#e(t,new Je({key:e,type:Ge.End,time:n,laneId:t,category:0})),n;const a=r[o];return a&&(r.splice(o,1),this.#e(t,new Je({key:e,type:Ge.End,time:n,laneId:t,eventId:a.eventId,parentEventId:a.parentEventId,parentIsExplicit:!0,category:a.category}))),n}_MarkerEvent(e,t,s=et()){return this.#t?(this.#e(t,new Je({key:e,type:Ge.Marker,time:s,laneId:t})),s):0}_RecordCounter(e,t,s,n,r=et()){this.#t&&this.#e(n,new Je({key:e,type:s?Ge.CounterDelta:Ge.CounterValue,time:r,laneId:n,value:t}))}_BeginTimespan(e,t,s,n=et(),r=0){const o=this.#r.get(t)??[],a={eventId:this.#i++,parentEventId:s,laneId:t,key:e,category:r};return o.push(a),this.#r.set(t,o),{...a,time:n}}_EndTimespan(e,t=et()){const s=this.#r.get(e.laneId)??[],n=s.findIndex(r=>r.eventId===e.eventId);n>=0&&s.splice(n,1),this.#e(e.laneId,new Je({key:e.key,type:Ge.Timespan,time:t,startTime:e.time,laneId:e.laneId,eventId:e.eventId,parentEventId:e.parentEventId,parentIsExplicit:!0,category:e.category}))}_StoreData(e,t,s){this.#t&&this.#e(e.laneId,new Je({key:t,type:Ge.ScopeData,time:et(),laneId:e.laneId,eventId:e.eventId,data:s}))}#e(e,t){const s=this.#n.get(e);s?s.push(t):this.#n.set(e,[t])}}let Pg=1;function Qn(i=`lane-${Pg++}`){return{laneId:i}}async function Xi(i,e,t,s=At.GetInstance()){if(!s.enabled)return await t(i);const n=s._BeginTimespan(e,i.laneId,i.spanId),r={laneId:i.laneId,spanId:n.eventId};try{return await t(r)}finally{s._EndTimespan(n)}}function zn(i,e,t,s=At.GetInstance()){if(!s.enabled)return t(i);const n=s._BeginTimespan(e,i.laneId,i.spanId),r={laneId:i.laneId,spanId:n.eventId};try{return t(r)}finally{s._EndTimespan(n)}}function Me(i,e,t){i.spanId!==void 0&&At.GetInstance()._StoreData({laneId:i.laneId,eventId:i.spanId},e,t)}class ge{constructor(e,t){this.value=e,this.constant=t}static MakeConstant(e){return new ge(e,!0)}static MakeVarying(e){return new ge(e,!1)}GetValue(){return this.value}IsConstant(){return this.constant}Not(){return new ge(!this.value,this.constant)}static And(e,t){const s=e.value,n=t.value,r=e.constant,o=t.constant;return r&&o||!s&&r||!n&&o?ge.MakeConstant(s&&n):ge.MakeVarying(s&&n)}static Or(e,t){const s=e.value,n=t.value,r=e.constant,o=t.constant;return r&&o||s&&r||n&&o?ge.MakeConstant(s||n):ge.MakeVarying(s||n)}}function ki(i,e){switch(i.op){case"call":return e(i.call);case"not":return ki(i.operand,e).Not();case"and":return ge.And(ki(i.left,e),ki(i.right,e));case"or":return ge.Or(ki(i.left,e),ki(i.right,e))}}const wg=new Set(["and","or","not","true","false"]);function bg(i){return/[A-Za-z_]/.test(i)}function Da(i){return/[A-Za-z0-9_]/.test(i)}function vg(i){return Da(i)||"~!@#$%^&*-+=|\\.?/".includes(i)}class Ig{constructor(e){this.s=e}pos=0;parse(){if(this.skipBlanks(),this.pos>=this.s.length)return null;const e=this.parseOr();return this.skipBlanks(),e===null||this.pos!==this.s.length?null:e}skipBlanks(){for(;this.pos<this.s.length&&(this.s[this.pos]===" "||this.s[this.pos]==="	");)this.pos++}matchKeyword(e){if(this.s.startsWith(e,this.pos)){const t=this.s[this.pos+e.length]??"";if(t===""||!Da(t))return this.pos+=e.length,!0}return!1}parseOr(){let e=this.parseAnd();if(e===null)return null;for(;;){const t=this.pos;if(this.skipBlanks(),!this.matchKeyword("or")){this.pos=t;break}this.skipBlanks();const s=this.parseAnd();if(s===null){this.pos=t;break}e={op:"or",left:e,right:s}}return e}parseAnd(){let e=this.parseFactor();if(e===null)return null;for(;;){const t=this.pos;if(this.skipBlanks(),this.matchKeyword("and")){this.skipBlanks();const s=this.parseFactor();if(s===null){this.pos=t;break}e={op:"and",left:e,right:s};continue}if(this.pos>t){const s=this.parseFactor();if(s!==null){e={op:"and",left:e,right:s};continue}}this.pos=t;break}return e}parseFactor(){let e=0;for(;;){const n=this.pos;if(this.skipBlanks(),!this.matchKeyword("not")){this.pos=n;break}e++}const t=this.parseCall();if(t===null)return null;let s=t;for(let n=0;n<e;n++)s={op:"not",operand:s};return s}parseCall(){this.skipBlanks();const e=this.parseFuncName();if(e===null)return null;const t=[];if(this.s[this.pos]===":")for(this.pos++,t.push({argName:"",value:this.parseArgVal()});this.s[this.pos]===",";)this.pos++,t.push({argName:"",value:this.parseArgVal()});return{op:"call",call:{funcName:e,args:t}}}parseFuncName(){const e=this.pos;if(this.pos>=this.s.length||!bg(this.s[this.pos]))return null;let t=this.s[this.pos];for(this.pos++;this.pos<this.s.length&&Da(this.s[this.pos]);)t+=this.s[this.pos],this.pos++;return wg.has(t)?(this.pos=e,null):t}parseArgVal(){const e=this.s[this.pos]??"";if(e==='"'||e==="'")return{type:"string",value:this.parseQuoted(e)};const t=this.pos;for(;this.pos<this.s.length&&vg(this.s[this.pos]);)this.pos++;const s=this.s.slice(t,this.pos);return s==="true"?{type:"bool",value:!0}:s==="false"?{type:"bool",value:!1}:/^-?[0-9]+$/.test(s)?{type:"int",value:parseInt(s,10)}:/^-?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/.test(s)&&/[.eE]/.test(s)?{type:"double",value:parseFloat(s)}:{type:"string",value:s}}parseQuoted(e){this.pos++;let t="";for(;this.pos<this.s.length;){const s=this.s[this.pos];if(s===e)return this.pos++,t;if(s==="\\"){const n=this.s[this.pos+1]??"";t+=n,this.pos+=2;continue}t+=s,this.pos++}return t}}function Ag(i){return new Ig(i).parse()}function Tg(i){let e="^";for(const t of i)t==="*"?e+=".*":t==="?"?e+=".":e+=t.replace(/[.+^${}()|[\]\\]/g,"\\$&");return e+="$",new RegExp(e)}class zr{_text;constructor(e){this._text=e instanceof B?e.pathString:e??""}static Everything(){return new zr("//")}static EveryDescendant(){return new zr(".//")}isEmpty(){return this._text===""}getText(){return this._text}toString(){return this._text}hasTrailingStretch(){return this._text.endsWith("//")}hasLeadingStretch(){return this._text.startsWith("//")}isProperty(){const e=this._text.lastIndexOf("/");return this._text.slice(e+1).includes(".")}getPrefix(){if(!this._text)return B.emptyPath;if(this._text.startsWith("//"))return B.absoluteRootPath;if(this._text.startsWith(".//"))return B.reflexiveRelativePath;const e=this._text.search(/[/]{2}|[*?{]/);let t=e<0?this._text:this._text.slice(0,e);return this.isProperty()&&(t=t.slice(0,t.lastIndexOf("."))),t=t.replace(/\/$/,""),B.fromString(t||(this._text.startsWith("/")?"/":"."))}setPrefix(e){const t=this.getPrefix().pathString,s=this._text.slice(t==="."?1:t.length);return this._text=e.isAbsoluteRootPath()&&s.startsWith("//")?s:`${e.pathString}${s}`,this}canAppendChild(e){return!this.isProperty()}appendChild(e){return this.canAppendChild(e)?e?(this._text?this._text.endsWith("//")||this._text.endsWith("/")?this._text+=e:this._text==="."?this._text=e:this._text+=`/${e}`:this._text=e,this):this.appendStretchIfPossible():this}canAppendProperty(e){return!this.isProperty()}appendProperty(e){return!this.canAppendProperty(e)||!e?this:(this.hasTrailingStretch()&&(this._text+="*"),this._text+=`.${e}`,this)}appendStretchIfPossible(){return this.isProperty()||this.hasTrailingStretch()?this:(this._text?this._text==="/"?this._text="//":this._text+="//":this._text=".//",this)}removeTrailingStretch(){return this.hasTrailingStretch()&&(this._text=this._text.slice(0,-2),this._text==="."&&(this._text=""),this._text===""&&(this._text="/")),this}removeTrailingComponent(){return this.isProperty()?this._text=this._text.slice(0,this._text.lastIndexOf(".")):this._text.endsWith("//*")?this._text=this._text.slice(0,-1):this.hasTrailingStretch()&&(this._text=this._text.slice(0,-2)),this}}class W{_components=[];_predPrograms=[];_empty=!0;_text="";_logic;_impliedUnion=!1;_left;_right;_reference;constructor(e){e===void 0||e===""||(this._text=e.trim(),this._parse(this._text))}static Everything(){return new W("//")}static EveryDescendant(){return new W(".//")}static Nothing(){return new W}static WeakerRef(){return new W("%_")}static MakeAtom(e){return e instanceof zr?new W(e.getText()):e instanceof B?new W(e.pathString):new W(`%${e.path.isEmpty()?"":`${e.path.pathString}:`}${e.name}`)}static MakeComplement(e){return e.isEmpty()?W.Everything():e._isEverything()?W.Nothing():e._logic==="complement"?new W(e._right?.getText()):new W(`~(${e.getText()})`)}static MakeOp(e,t,s){if(e==="difference"&&(t.isEmpty()||s.isEmpty()||t._isEverything()||s._isEverything()))return W.MakeOp("intersection",t,W.MakeComplement(s));if(t.isEmpty())return e==="intersection"?W.Nothing():s;if(s.isEmpty())return e==="intersection"?W.Nothing():t;if(t._isEverything())return e==="intersection"?s:W.Everything();if(s._isEverything())return e==="intersection"?t:W.Everything();const n=e==="intersection"?"&":e==="difference"?"-":e==="union"?"+":"";return new W(n?`(${t.getText()}) ${n} (${s.getText()})`:`(${t.getText()}) (${s.getText()})`)}isEmpty(){return this._empty}_isEverything(){return this._text==="//"&&this._logic===void 0&&this._reference===void 0&&!this._empty}getText(){return this._text}get text(){return this._text}toString(){return this.getText()}getParseError(){return this._empty&&this._text?"Invalid path expression":""}isAbsolute(){return this._reference?!0:this._logic==="complement"?this._right?.isAbsolute()??!0:this._logic?(this._left?.isAbsolute()??!0)&&(this._right?.isAbsolute()??!0):this._text.startsWith("/")}containsExpressionReferences(){return this._reference!==void 0||(this._left?.containsExpressionReferences()??!1)||(this._right?.containsExpressionReferences()??!1)}containsWeakerExpressionReference(){return this._reference?.name==="_"||(this._left?.containsWeakerExpressionReference()??!1)||(this._right?.containsWeakerExpressionReference()??!1)}isComplete(){return!this.containsExpressionReferences()&&this.isAbsolute()}makeAbsolute(e){return this.mapAtoms(t=>t.startsWith("/")||t.startsWith("%")?t:t.startsWith(".//")?`${e.pathString}${t.slice(1)}`:t==="."?e.pathString:Cg(t,e))}replacePrefix(e,t){return this.mapAtoms(s=>s===e.pathString||s.startsWith(`${e.pathString}/`)||s.startsWith(`${e.pathString}.`)?t.pathString+s.slice(e.pathString.length):s)}mapPaths(e){return this.mapAtoms(t=>{if(t.startsWith("%")||t.startsWith("//"))return t;const s=B.fromString(t);return s.isEmpty()?t:e(s).pathString})}resolveReferences(e){if(this._reference)return e(this._reference);if(this._logic==="complement")return new W(`~(${this._right.resolveReferences(e).getText()})`);if(this._logic){const t=this._logic==="union"?"+":this._logic==="intersection"?"&":"-",s=this._impliedUnion?" ":` ${t} `;return new W(`${this._left.resolveReferences(e).getText()}${s}${this._right.resolveReferences(e).getText()}`)}return new W(this._text)}composeOver(e){return this.resolveReferences(t=>t.name==="_"?e:new W(`%${t.path.isEmpty()?"":t.path.pathString+":"}${t.name}`))}mapAtoms(e){if(this._reference)return new W(this._text);if(this._logic==="complement")return new W(`~(${this._right.mapAtoms(e).getText()})`);if(this._logic){const t=this._logic==="union"?"+":this._logic==="intersection"?"&":"-",s=this._impliedUnion?" ":` ${t} `;return new W(`${this._left.mapAtoms(e).getText()}${s}${this._right.mapAtoms(e).getText()}`)}return new W(e(this._text))}_addPredicate(e){const t=Ag(e);return t===null?-1:(this._predPrograms.push(t),this._predPrograms.length-1)}_parse(e){const t=xg(e);if(t!==e){this._text=t,this._parse(t);return}const s=Dg(e);if(s){this._logic=s.op,this._impliedUnion=s.implied,this._left=new W(s.left),this._right=new W(s.right);const c=this._left._predPrograms.length;this._right._offsetPredicateIndices(c),this._predPrograms=[...this._left._predPrograms,...this._right._predPrograms],this._empty=this._left.isEmpty()||this._right.isEmpty();return}if(e.startsWith("~")){this._logic="complement",this._right=new W(e.slice(1).trim()),this._predPrograms=[...this._right._predPrograms],this._empty=this._right.isEmpty();return}if(e.startsWith("%")){const c=/^%(?:(.*):)?([A-Za-z_][A-Za-z0-9_:]*)$/.exec(e);if(!c)return;this._reference={path:c[1]?B.fromString(c[1]):B.fromString(""),name:c[2]},this._empty=!1;return}const n=[];let r=0;const o=e.length,a=()=>{let c=r;for(;r<o&&e[r]!=="/"&&e[r]!=="{";)r++;const l=e.slice(c,r);let u=-1;if(e[r]==="{"){const h=wu(e,r);if(h<0||(u=this._addPredicate(e.slice(r+1,h)),u<0))return!1;r=h+1}return n.push({stretch:!1,text:l,regex:/[*?]/.test(l)?Tg(l):void 0,predicateIndex:u}),!0};for(;r<o;)if(e[r]==="/"){if(e[r+1]==="/"){const c={stretch:!0,text:"",regex:void 0,predicateIndex:-1};if(n.push(c),r+=2,e[r]==="{"){const l=wu(e,r);if(l<0||(c.predicateIndex=this._addPredicate(e.slice(r+1,l)),c.predicateIndex<0))return;r=l+1}continue}if(r++,!a())return}else if(!a())return;n.length!==0&&(this._components=n,this._empty=!1)}_offsetPredicateIndices(e){if(e!==0){for(const t of this._components)t.predicateIndex!==-1&&(t.predicateIndex+=e);this._left?._offsetPredicateIndices(e),this._right?._offsetPredicateIndices(e)}}get _stretchEnd(){const e=this._components[this._components.length-1];return e!==void 0&&e.stretch}Match(e,t){if(this._empty)return ge.MakeConstant(!1);if(this._reference)return ge.MakeVarying(!1);if(this._logic==="complement")return this._right.Match(e,t).Not();if(this._logic){const r=this._left.Match(e,t),o=this._right.Match(e,t);return this._logic==="intersection"?ge.And(r,o):this._logic==="difference"?ge.And(r,o.Not()):ge.Or(r,o)}const s=kg(e);return this._matchFrom(0,0,s,t)?this._stretchEnd?ge.MakeConstant(!0):ge.MakeVarying(!0):this._descendantCanMatch(s)?ge.MakeVarying(!1):ge.MakeConstant(!1)}_matchFrom(e,t,s,n){if(e===this._components.length)return t===s.length;const r=this._components[e];if(r.stretch){for(let a=t;a<=s.length;a++){if(r.predicateIndex!==-1){const c=bu(s,a);if(!n(r.predicateIndex,c).value)continue}if(this._matchFrom(e+1,a,s,n))return!0}return!1}if(t>=s.length)return!1;const o=s[t];if(r.regex){if(!r.regex.test(o))return!1}else if(r.text!==""&&r.text!==o)return!1;if(r.predicateIndex!==-1){const a=bu(s,t+1);if(!n(r.predicateIndex,a).value)return!1}return this._matchFrom(e+1,t+1,s,n)}_descendantCanMatch(e){let t=0;for(const s of this._components){if(s.stretch||t>=e.length||s.regex||s.predicateIndex!==-1)return!0;if(s.text!==""&&s.text!==e[t])return!1;t++}return!1}EvalPredicate(e,t){const s=this._predPrograms[e];return s===void 0?ge.MakeVarying(!1):ki(s,t)}}class He{constructor(e){this.text=e,this._expression=new W(e)}_expression;composeOver(e){return new He(this._expression.composeOver(new W(e.text)).getText())}makeAbsolute(e){return new He(this._expression.makeAbsolute(e).getText())}mapPaths(e){return new He(this._expression.mapPaths(e).getText())}}function xg(i){if(!i.startsWith("(")||!i.endsWith(")"))return i;let e=0;for(let t=0;t<i.length;t++)if(i[t]==="("?e++:i[t]===")"&&e--,e===0&&t!==i.length-1)return i;return e===0?i.slice(1,-1).trim():i}function Dg(i){const e=o=>{let a=0,c=0,l="";for(let u=i.length-1;u>=0;u--){const h=i[u];if(l){h===l&&i[u-1]!=="\\"&&(l="");continue}if(h==='"'||h==="'"){l=h;continue}if(h===")"){a++;continue}if(h==="("){a--;continue}if(h==="}"){c++;continue}if(h==="{"){c--;continue}if(!(a||c)){if(!/\s/.test(h)&&o.includes(h))return{index:u,op:h==="&"?"intersection":h==="-"?"difference":"union",whitespace:!1};if(o.includes(" ")&&/\s/.test(h)){let d=u;for(;d>0&&/\s/.test(i[d-1]);)d--;const f=i.slice(0,d).trim(),p=i.slice(u+1).trim();if(f&&p&&!/[+&\-~]$/.test(f)&&!/^[+&\-]/.test(p))return{index:d,op:"union",whitespace:!0};u=d}}}},t=e("+- ")??e("&");if(!t)return;const s=t.whitespace?i.slice(t.index).search(/\S/)+t.index:t.index+1,n=i.slice(0,t.index).trim(),r=i.slice(s).trim();return n&&r?{left:n,right:r,op:t.op,implied:t.whitespace}:void 0}function wu(i,e){let t=e+1,s="";for(;t<i.length;){const n=i[t];if(s){if(n==="\\"){t+=2;continue}n===s&&(s=""),t++;continue}if(n==='"'||n==="'"){s=n,t++;continue}if(n==="}")return t;t++}return-1}function kg(i){return i.isAbsoluteRootPath()||i.isEmpty()?[]:i.pathString.split("/").filter(e=>e.length>0)}function bu(i,e){return B.fromString("/"+i.slice(0,e).join("/"))}function Cg(i,e){const t=i.indexOf("//"),s=t<0?i:i.slice(0,t),n=t<0?"":i.slice(t),r=e.pathString.split("/").filter(Boolean),o=s.replace(/^\.\//,"").split("/");for(const a of o)!a||a==="."||(a===".."?r.pop():r.push(a));return`/${r.join("/")}${n}`}const Ng=0,Mg=1,Eg=2;function Bg(i,e,t=4){if(e===0)return[];let s=0;function n(p){let y=0;for(let g=0;g<p;g++)y|=i[s+g]<<g*8;if(s+=p,p===4)return y|0;const m=p*8;return y&1<<m-1&&(y|=~((1<<m)-1)),y}const r=n(t),o=Math.floor((e*2+7)/8),a=s;s+=o;const c=t>>2,l=t>>1,u=new Array(e);let h=0,d=a,f=0;for(let p=0;p<e;p++){f>=8&&(d++,f=0);const y=i[d]>>f&3;f+=2;let m;y===Ng?m=r:y===Mg?m=n(c||1):y===Eg?m=n(l||1):m=n(t),h+=m,u[p]=h}return u}function Og(i){const e=i.length;if(e===0)return new Uint8Array(0);const t=4,s=1,n=2,r=new Array(e);for(let y=0;y<e;y++)r[y]=i[y]-(y>0?i[y-1]:0)|0;let o=0,a=0;const c=new Map;for(const y of r){const m=(c.get(y)??0)+1;c.set(y,m),m>a?(o=y,a=m):m===a&&y>o&&(o=y)}const l=Math.ceil(e*2/8),u=new Uint8Array(l),h=[];function d(y,m){for(let g=0;g<m;g++)h.push(y>>g*8&255)}for(let y=0;y<e;y++){const m=r[y];let g;m===o?g=0:m>=-128&&m<=127?(g=1,d(m,s)):m>=-32768&&m<=32767?(g=2,d(m,n)):(g=3,d(m,t)),u[y*2>>3]|=g<<(y*2&7)}const f=new Uint8Array(t+l+h.length);return new DataView(f.buffer).setInt32(0,o,!0),f.set(u,t),f.set(new Uint8Array(h),t+l),f}function Mt(i){return wa(Og(i))}const vu=16;function Rg(i,e=4){if(i===0)return 0;const t=Math.floor((i*2+7)/8),s=e+t+i*e;return pm(s)+1}const A={Bool:1,UChar:2,Int:3,UInt:4,Int64:5,UInt64:6,Half:7,Float:8,Double:9,String:10,Token:11,AssetPath:12,Matrix2d:13,Matrix3d:14,Matrix4d:15,Quatd:16,Quatf:17,Quath:18,Vec2d:19,Vec2f:20,Vec2h:21,Vec2i:22,Vec3d:23,Vec3f:24,Vec3h:25,Vec3i:26,Vec4d:27,Vec4f:28,Vec4h:29,Vec4i:30,Dictionary:31,TokenListOp:32,StringListOp:33,PathListOp:34,ReferenceListOp:35,IntListOp:36,Int64ListOp:37,UIntListOp:38,UInt64ListOp:39,PathVector:40,TokenVector:41,Specifier:42,Permission:43,Variability:44,VariantSelectionMap:45,TimeSamples:46,Payload:47,DoubleVector:48,LayerOffsetVector:49,StringVector:50,ValueBlock:51,Value:52,UnregisteredValue:53,UnregisteredValueListOp:54,PayloadListOp:55,TimeCode:56,PathExpression:57,Relocates:58,Spline:59,AnimationBlock:60},Fg={[A.Bool]:"bool",[A.UChar]:"uchar",[A.Int]:"int",[A.UInt]:"uint",[A.Int64]:"int64",[A.UInt64]:"uint64",[A.Half]:"half",[A.Float]:"float",[A.Double]:"double",[A.String]:"string",[A.Token]:"token",[A.AssetPath]:"asset",[A.Matrix2d]:"matrix2d",[A.Matrix3d]:"matrix3d",[A.Matrix4d]:"matrix4d",[A.Quatd]:"quatd",[A.Quatf]:"quatf",[A.Quath]:"quath",[A.Vec2d]:"double2",[A.Vec2f]:"float2",[A.Vec2h]:"half2",[A.Vec2i]:"int2",[A.Vec3d]:"double3",[A.Vec3f]:"float3",[A.Vec3h]:"half3",[A.Vec3i]:"int3",[A.Vec4d]:"double4",[A.Vec4f]:"float4",[A.Vec4h]:"half4",[A.Vec4i]:"int4",[A.Dictionary]:"dictionary",[A.TimeCode]:"timecode"},Ke=128,Qd=64,jr=32,Gg=16;let Iu=new Set;function $g(i){Iu.has(i)||(Iu.add(i),console.warn(`usdc: ${i} values are not supported yet; treating as unauthored`))}class Au{pos=0;view;bytes;constructor(e){this.bytes=e,this.view=new DataView(e.buffer,e.byteOffset,e.byteLength)}seek(e){this.pos=e}u8(){return this.view.getUint8(this.pos++)}u16(){const e=this.view.getUint16(this.pos,!0);return this.pos+=2,e}u32(){const e=this.view.getUint32(this.pos,!0);return this.pos+=4,e}i32(){const e=this.view.getInt32(this.pos,!0);return this.pos+=4,e}u64n(){const e=this.view.getUint32(this.pos,!0),t=this.view.getUint32(this.pos+4,!0);return this.pos+=8,BigInt(t)<<32n|BigInt(e)}u64(){return Number(this.u64n())}i64n(){const e=this.view.getUint32(this.pos,!0),t=this.view.getInt32(this.pos+4,!0);return this.pos+=8,BigInt(t)<<32n|BigInt(e)}f32(){const e=this.view.getFloat32(this.pos,!0);return this.pos+=4,e}f64(){const e=this.view.getFloat64(this.pos,!0);return this.pos+=8,e}bytes_n(e){const t=this.bytes.subarray(this.pos,this.pos+e);return this.pos+=e,t}ascii(e){const t=this.bytes_n(e);let s="";for(let n=0;n<e&&t[n]!==0;n++)s+=String.fromCharCode(t[n]);return s}}function Oi(i){let t=(i&32767)<<13;const s=260046848&t;if(t+=112<<23,s===260046848)t+=112<<23;else if(s===0){t+=1<<23;const r=new ArrayBuffer(4);new DataView(r).setUint32(0,t,!0);let o=new DataView(r).getFloat32(0,!0);const a=new ArrayBuffer(4);new DataView(a).setUint32(0,113<<23,!0),o-=new DataView(a).getFloat32(0,!0);const c=new ArrayBuffer(4);new DataView(c).setFloat32(0,o,!0),t=new DataView(c).getUint32(0,!0)}t|=(i&32768)<<16;const n=new ArrayBuffer(4);return new DataView(n).setUint32(0,t,!0),new DataView(n).getFloat32(0,!0)}function Lg(i,e){const t=i.u64(),s=i.bytes_n(t);return ba(s,e)}function Et(i,e,t=4){const s=Rg(e,t),n=Lg(i,s);return Bg(n,e,t)}function Si(i){const e=i.u8(),t=i.u8(),s=i.u8(),n=i.u8(),r=i.u8(),o=i.u8(),a=i.u8(),c=i.u8(),l=!!(c&Ke),u=!!(c&Qd),h=!!(c&jr),d=!!(c&Gg),f=(e|t<<8|s<<16|n<<24)>>>0,p=r|o<<8,y=f+p*4294967296;return{typeId:a,isArray:l,isInlined:u,isCompressed:h,isArrayEdit:d,payloadLo:f,payloadOffset:y}}function Qt(i,e,t,s){if(e.isInlined){const o=e.payloadLo;if(t===8)return BigInt(s?o|0:o>>>0);if(s){if(t===4)return o|0;if(t===1)return(o&255)<<24>>24}else{if(t===4)return o>>>0;if(t===1)return o&255}return o}if(!e.payloadOffset)return[];if(i.seek(e.payloadOffset),!e.isArray)return t===8?s?i.i64n():i.u64n():t===4?s?i.i32():i.u32():t===1?i.u8():s?i.i32():i.u32();const n=i.u64();if(t===8){const o=[];for(let a=0;a<n;a++)o.push(s?i.i64n():i.u64n());return o}if(e.isCompressed)return Et(i,n,t);const r=[];for(let o=0;o<n;o++)t===4?r.push(s?i.i32():i.u32()):t===1?r.push(i.u8()):r.push(s?i.i32():i.u32());return r}function Vg(i,e,t){const s=t===A.Double||t===A.TimeCode,n=t===A.Half;if(e.isInlined){const a=new ArrayBuffer(4);new DataView(a).setUint32(0,e.payloadLo,!0);const c=new DataView(a).getFloat32(0,!0);return n?Oi(e.payloadLo&65535):c}if(!e.payloadOffset)return 0;if(i.seek(e.payloadOffset),!e.isArray)return s?i.f64():n?Oi(i.u16()):i.f32();const r=i.u64();if(!e.isCompressed){const a=[];for(let c=0;c<r;c++)s?a.push(i.f64()):n?a.push(Oi(i.u16())):a.push(i.f32());return a}const o=String.fromCharCode(i.u8());if(o==="i")return Et(i,r,4).map(c=>c);if(o==="t"){const a=i.u32(),c=[];for(let u=0;u<a;u++)s?c.push(i.f64()):n?c.push(Oi(i.u16())):c.push(i.f32());return Et(i,r,4).map(u=>c[u])}return[]}function Ug(i,e,t){const s=Object.entries(A).find(([,m])=>m===t)?.[0]??"";let n,r=0;const o=s[s.length-1]?.toLowerCase();if(s.startsWith("Quat"))n=4;else if(s.startsWith("Vec"))n=parseInt(s.slice(3,4));else if(s.startsWith("Matrix"))r=parseInt(s.slice(6,7)),n=r*r;else throw new Error(`Unknown math type: ${s}`);const a=o==="d",c=o==="h",l=o==="i";function u(){return a?i.f64():c?Oi(i.u16()):l?i.i32():i.f32()}function h(m){const g=[];for(let S=0;S<m;S++)g.push(u());return g}function d(m,g){const S=[];for(let _=0;_<g;_++)S.push(m.slice(_*g,_*g+g));return S}const f=s.startsWith("Quat"),p=m=>f?[m[3],m[0],m[1],m[2]]:m;if(e.isInlined){const m=c&&n===2?2:1,g=r||n,S=[];e.payloadLo&255,e.payloadLo>>8&255,e.payloadLo>>16&255,e.payloadLo>>24&255,e.payloadOffset>0&&e.payloadLo>>0&255;const _=[e.payloadLo&255,e.payloadLo>>8&255,e.payloadLo>>16&255,e.payloadLo>>24&255];for(let P=0;P<g;P++){const w=P*m;if(c&&m===2){const v=_[w]|_[w+1]<<8;S.push(Oi(v))}else{const v=_[w];S.push(v>=128?v-256:v)}}if(r){const P=[];for(let w=0;w<r;w++){const v=new Array(r).fill(0);v[w]=S[w],P.push(v)}return P}return p(S)}if(i.seek(e.payloadOffset),e.isArray){const m=i.u64(),g=[];for(let S=0;S<m;S++){const _=h(n);g.push(r?d(_,r):p(_))}return g}const y=h(n);return r?d(y,r):p(y)}function zg(i,e,t){const s=Qt(i,e,4,!1);return e.isArray?s.map(n=>t[n]):t[s]}function jg(i,e,t){const s=Qt(i,e,4,!1);return e.isArray?s.map(n=>t[n]):t[s]}function Wg(i,e,t,s){if(e.isArray)return Qt(i,e,4,!1).map(o=>s[o]);if(e.isInlined)return t[e.payloadLo];const n=Qt(i,e,4,!1);return s[n]}function ka(i,e,t,s,n,r){let o;e?o=t:o=i.u64();const a={},c=new Map;for(let l=0;l<o;l++){const u=i.u32(),h=n[u],d=i.pos,f=Number(i.i64n()),p=d+f;i.seek(p);const y=Si(i),m=i.pos;a[h]=Qi(i,y,s,n,r);const g=Fg[y.typeId];g&&c.set(h,`${g}${y.isArray?"[]":""}`),i.seek(m)}return Md(a,c),a}function qg(i,e,t,s,n){i.seek(e.payloadOffset);const r=i.u8(),o=!!(r&1),a=!!(r&2),c=!!(r&4),l=!!(r&8),u=!!(r&16),h=!!(r&32),d=!!(r&64);let f=null,p=[],y=[],m=[],g=[];function S(){const P=i.u64(),w=[];for(let v=0;v<P;v++){let b;switch(e.typeId){case A.TokenListOp:b=t[i.u32()];break;case A.StringListOp:b=s[i.u32()];break;case A.PathListOp:b=n[i.u32()];break;case A.ReferenceListOp:case A.PayloadListOp:{const I=i.u32(),T=i.u32(),E=i.f64(),D=i.f64();e.typeId===A.ReferenceListOp&&i.u64(),b={assetPath:s[I]??"",primPath:n[T]??"",layerOffset:{offset:E,scale:D}};break}case A.IntListOp:b=i.i32();break;case A.UIntListOp:b=i.u32();break;case A.Int64ListOp:b=i.i64n();break;case A.UInt64ListOp:b=i.u64n();break;default:i.u64(),b=null}w.push(b)}return w}a?f=S():o&&(f=[]),c&&(p=S()),h&&(y=S()),d&&(m=S()),l&&(g=S()),u&&S(),p.length&&m.length===0&&(m=p);const _={isExplicit:f!==null,explicitItems:f??[],prependedItems:y,appendedItems:m,deletedItems:g};return p.length&&Object.defineProperty(_,"_sdfAddedItems",{value:p,configurable:!0,enumerable:!1,writable:!0}),_}function Hg(i,e,t,s,n){const r=e.payloadOffset;i.seek(r);const o=i.pos,a=Number(i.i64n());i.seek(o+a);const c=Si(i),l=i.pos,u=Number(i.i64n()),h=Qi(i,c,t,s,n);i.seek(l+u);const d=i.u64(),f=[];for(let p=0;p<d;p++){const y=Si(i),m=i.pos,g=Qi(i,y,t,s,n);i.seek(m),f.push([h[p],{typeId:y.typeId,isArray:y.isArray,isInlined:y.isInlined,isCompressed:y.isCompressed,payload:y.payloadLo,value:g}])}return f}function Kg(i,e,t,s,n){i.seek(e.payloadOffset);const r=i.u64();if(e.typeId===A.DoubleVector){const c=[];for(let l=0;l<r;l++)c.push(i.f64());return c}if(e.typeId===A.LayerOffsetVector){const c=[];for(let l=0;l<r;l++)c.push({offset:i.f64(),scale:i.f64()});return c}const o=[];for(let c=0;c<r;c++)o.push(i.u32());let a;return e.typeId===A.PathVector?a=n:e.typeId===A.StringVector?a=s:a=t,o.map(c=>a[c])}function Zg(i,e,t){i.seek(e.payloadOffset);const s=i.u64(),n={};for(let r=0;r<s;r++){const o=t[i.u32()],a=t[i.u32()];n[o]=a}return n}function Yg(i,e,t){if(!e.payloadOffset)return{};i.seek(e.payloadOffset);const s=i.u64(),n={};for(let r=0;r<s;r++){const o=t[i.u32()],a=t[i.u32()];n[o]=a}return n}function Xg(i,e,t,s,n){i.seek(e.payloadOffset);const r=i.u64(),o=i.bytes_n(r),a=new Map,c=i.u64();for(let l=0;l<c;l++){const u=i.f64();a.set(u,ka(i,!1,0,t,s,n))}return Im.CreateSplineFromBinaryData(o,a)}function Qi(i,e,t,s,n,r=[]){const{typeId:o,isArray:a,isInlined:c,isCompressed:l,payloadLo:u,payloadOffset:h}=e;if(e.isArrayEdit)return $g("VtArrayEdit (crate >= 0.14)"),null;switch(o){case A.ValueBlock:return new Pe;case A.AnimationBlock:return new St;case A.Spline:return Xg(i,e,t,s,n);case A.Bool:if(c)return!!u;if(!h)return[];if(i.seek(h),!a)return!!i.u8();{const d=i.u64(),f=[];for(let p=0;p<d;p++)f.push(!!i.u8());return f}case A.UChar:return Qt(i,e,1,!1);case A.Int:return Qt(i,e,4,!0);case A.UInt:return Qt(i,e,4,!1);case A.Int64:return Qt(i,e,8,!0);case A.UInt64:return Qt(i,e,8,!1);case A.Half:case A.Float:case A.Double:case A.TimeCode:return Vg(i,e,o);case A.String:return zg(i,e,s);case A.Token:return jg(i,e,t);case A.AssetPath:case A.PathExpression:return Wg(i,e,t,s);case A.Dictionary:return c?ka(i,!0,u,t,s,n):(i.seek(h),ka(i,!1,0,t,s,n));case A.Specifier:case A.Permission:case A.Variability:return Qt(i,e,4,!0);case A.Quatd:case A.Quatf:case A.Quath:case A.Vec2d:case A.Vec2f:case A.Vec2h:case A.Vec2i:case A.Vec3d:case A.Vec3f:case A.Vec3h:case A.Vec3i:case A.Vec4d:case A.Vec4f:case A.Vec4h:case A.Vec4i:case A.Matrix2d:case A.Matrix3d:case A.Matrix4d:return Ug(i,e,o);case A.TokenListOp:case A.StringListOp:case A.PathListOp:case A.ReferenceListOp:case A.IntListOp:case A.Int64ListOp:case A.UIntListOp:case A.UInt64ListOp:case A.PayloadListOp:case A.UnregisteredValueListOp:return qg(i,e,t,s,r);case A.TimeSamples:return Hg(i,e,t,s,n);case A.PathVector:case A.TokenVector:case A.DoubleVector:case A.LayerOffsetVector:case A.StringVector:return Kg(i,e,t,s,r);case A.VariantSelectionMap:return Zg(i,e,s);case A.Relocates:return Yg(i,e,r);case A.Value:{if(!h)return null;i.seek(h);const d=Si(i);return Qi(i,d,t,s,n,r)}case A.UnregisteredValue:{i.seek(h);const d=Number(i.i64n()),f=h+d;i.seek(f);const p=Si(i);return Qi(i,p,t,s,n,r)}case A.Payload:{if(!h)return null;i.seek(h);const d=i.u32(),f=i.u32(),p=i.f64(),y=i.f64();return{assetPath:s[d]??"",primPath:r[f]??"",layerOffset:{offset:p,scale:y}}}default:return null}}function Qg(i,e,t,s,n){const r=new Array(i);function o(a,c){let l=a,u=c,h=!1,d=!1,f=!0;for(;f||h||d;){f=!1;const p=e[l];if(!u)u="/",r[p]="/";else{const y=t[l],m=y<0,g=n[Math.abs(y)];r[p]=(u==="/"?"":u)+(m?".":"/")+g}h=s[l]>0||s[l]===-1,d=s[l]>=0,h&&(d&&o(l+s[l],u),u=r[p]),l++}}return i>0&&o(0,""),r}function Jg(i){const e=new Au(i),t=e.ascii(8);if(t!=="PXR-USDC")throw new Error(`Not a USDC file: ${t}`);const s=e.u8(),n=e.u8(),r=e.u8();if(e.bytes_n(5),s!==0||n>15||n===0&&r<1)throw new Error(`Unsupported USDC version: ${s}.${n}.${r}`);const o=e.u64();e.u64(),e.seek(o);const a=e.u64(),c={};for(let y=0;y<a;y++){const m=e.ascii(16),g=e.u64(),S=e.u64();c[m]={offset:g,size:S}}let l=[yi("")];if(c.TOKENS){const{offset:y}=c.TOKENS;e.seek(y);const m=e.u64();let g;if(n<4)g=e.bytes_n(e.u64());else{const _=e.u64(),P=e.u64();g=ba(e.bytes_n(P),_)}l=new TextDecoder().decode(g).split("\0").slice(0,m).map(_=>yi(_))}let u=[];if(c.STRINGS){const{offset:y}=c.STRINGS;e.seek(y);const m=e.u64();for(let g=0;g<m;g++)u.push(l[e.u32()])}const h=[];if(c.FIELDS){const{offset:y}=c.FIELDS;e.seek(y);const m=e.u64();if(n<4)for(let g=0;g<m;g++){e.u32();const S=e.u32();h.push({tokenIdx:S,rep:Si(e)})}else{const g=Et(e,m,4),S=e.u64(),_=e.bytes_n(S),P=ba(_,m*8),w=new Au(P);for(let v=0;v<m;v++){const b=Si(w);h.push({tokenIdx:g[v],rep:b})}}}let d=[];if(c.FIELDSETS){const{offset:y}=c.FIELDSETS;e.seek(y);const m=e.u64();d=n<4?Array.from({length:m},()=>e.u32()):Et(e,m,4)}let f=[];if(c.PATHS){const{offset:y}=c.PATHS;e.seek(y);const m=e.u64();if(n<4){f=new Array(m);const g=S=>{let _=!1,P=!1;do{n===0&&e.u32();const w=e.u32(),v=e.u32(),b=e.u8();e.bytes_n(3);const I=S===""?"/":`${S==="/"?"":S}${b&4?".":"/"}${l[v]}`;if(f[w]=I,_=!!(b&1),P=!!(b&2),_&&P){const T=Number(e.i64n());g(I),e.seek(T)}else _&&(S=I)}while(_||P)};g("")}else{const g=e.u64(),S=Et(e,g,4),_=Et(e,g,4),P=Et(e,g,4);f=Qg(m,S,_,P,l)}f=f.map(g=>g.replace(/\/\{/g,"{").replace(/\}\//g,"}"))}const p={};if(c.SPECS){const{offset:y}=c.SPECS;e.seek(y);const m=e.u64();let g,S,_;if(n<4){g=[],S=[],_=[];for(let b=0;b<m;b++)n===0&&e.u32(),g.push(e.u32()),S.push(e.u32()),_.push(e.u32())}else g=Et(e,m,4),S=Et(e,m,4),_=Et(e,m,4);const P=6;let w=null;for(let b=0;b<m;b++){const I=f[g[b]],T=S[b],E=_[b],D={};for(let x=T;x<d.length;x++){const R=d[x];if(R<0||R===4294967295)break;const{tokenIdx:U,rep:$}=h[R],Ie=l[U];let le;try{le=Qi(e,$,l,u,i,f)}catch(q){w===null&&(w=q),le=void 0}D[Ie]={typeId:$.typeId,isArray:$.isArray,isInlined:$.isInlined,isCompressed:$.isCompressed,payload:$.payloadLo,value:le}}const N={form:E,fields:D,...D};p[I]=N}const v=b=>/^[A-Za-z_][A-Za-z0-9_]*$/.test(b);for(const[b,I]of Object.entries(p)){if(I.form!==P)continue;const T=I.primChildren?.value;if(!Array.isArray(T))continue;const E=new Set;for(const D of T){const N=D==null?"":String(D),x=b==="/"?`/${N}`:`${b}${b.endsWith("}")?"":"/"}${N}`;if(!v(N)||!(x in p))throw new Error(`Invalid child identifier '${N}' found on parent '${b}'`);if(E.has(N))throw new Error(`Duplicate child identifier '${N}' found on parent '${b}'`);E.add(N)}}if(w!==null)throw w}return p}const Qs={IsExplicit:1,HasExplicitItems:2,HasAddedItems:4,HasDeletedItems:8,HasOrderedItems:16,HasPrependedItems:32,HasAppendedItems:64},cr={Attribute:1,Prim:6,PseudoRoot:7,Relationship:8};class As{_buf=[];get pos(){return this._buf.length}u8(e){return this._buf.push(e&255),this}u16(e){return this.u8(e).u8(e>>8)}u32(e){return this.u16(e&65535).u16(e>>>16&65535)}u64(e){return this.u32(e>>>0),this.u32(Math.floor(e/4294967296)>>>0),this}f32(e){const t=new ArrayBuffer(4);return new DataView(t).setFloat32(0,e,!0),this.bytes(new Uint8Array(t))}f64(e){const t=new ArrayBuffer(8);return new DataView(t).setFloat64(0,e,!0),this.bytes(new Uint8Array(t))}bytes(e){for(const t of e)this._buf.push(t);return this}ascii(e,t){for(let s=0;s<t;s++)this._buf.push(s<e.length?e.charCodeAt(s):0);return this}patchU64(e,t){const s=t>>>0,n=Math.floor(t/4294967296)>>>0;for(let r=0;r<4;r++)this._buf[e+r]=s>>r*8&255;for(let r=0;r<4;r++)this._buf[e+4+r]=n>>r*8&255;return this}toUint8Array(){return new Uint8Array(this._buf)}}class ey{_map=new Map;intern(e){const t=yi(e),s=this._map.get(t);if(s!==void 0)return s;const n=this._map.size;return this._map.set(t,n),n}get(e){return this._map.get(yi(e))??0}get tokens(){return[...this._map.keys()]}}class ty{constructor(e){this._tok=e}_map=new Map;_tokenIdxs=[];intern(e){const t=this._map.get(e);if(t!==void 0)return t;const s=this._tokenIdxs.length;return this._map.set(e,s),this._tokenIdxs.push(this._tok.intern(e)),s}get tokenIndices(){return this._tokenIdxs}}function Jd(i,e,t){const s=new Uint8Array(8);s[0]=t&255,s[1]=t>>>8&255,s[2]=t>>>16&255,s[3]=t>>>24&255;const n=Math.floor(t/4294967296)>>>0;return s[4]=n&255,s[5]=n>>8&255,s[6]=i&255,s[7]=e&255,s}function Re(i,e){return Jd(i,Qd,e>>>0)}function se(i,e,t){return Jd(i,e,t)}function sy(i){const e=i.startsWith("uniform "),t=e?i.slice(8):i,s=t.endsWith("[]"),n=s?t.slice(0,-2):t;let r;switch(n){case"bool":r=A.Bool;break;case"int":case"uint":r=A.Int;break;case"float":r=A.Float;break;case"double":r=A.Double;break;case"token":r=A.Token;break;case"string":r=A.String;break;case"asset":r=A.String;break;case"double3":case"point3d":case"normal3d":case"vector3d":case"color3d":r=A.Vec3d;break;case"float3":case"point3f":case"normal3f":case"vector3f":case"color3f":case"texCoord2f":case"texCoord3f":r=A.Vec3f;break;case"quatf":case"quath":r=A.Quatf;break;case"quatd":r=A.Quatd;break;case"matrix4d":case"frame4d":r=A.Matrix4d;break;default:r=A.Token;break}return{typeId:r,isArray:s,isUniform:e}}function iy(i,e,t,s,n){if(e.every(d=>d>=-2147483648&&d<=2147483647&&(d|0)===d)){const d=Mt(e.map(f=>f|0));return s.u8(105),s.u64(d.length).bytes(d),se(i,Ke|jr,n)}const c=Math.min(Math.floor(e.length/4),1024),l=[],u=[];let h=!1;for(const d of e){let f=l.indexOf(d);if(f===-1&&(f=l.length),u.push(f),f===l.length)if(l.length!==c)l.push(d);else{h=!0;break}}if(!h&&l.length>0){s.u8(116),s.u32(l.length);for(const f of l)t?s.f64(f):s.f32(f);const d=Mt(u.map(f=>f|0));return s.u64(d.length).bytes(d),se(i,Ke|jr,n)}return null}function ep(i,e,t,s,n,r){const{typeId:o,isArray:a}=sy(i);if(o===A.Bool&&!a)return Re(A.Bool,e?1:0);if(o===A.Token&&!a)return Re(A.Token,t.intern(String(e)));if(o===A.String&&!a)return Re(A.String,s.intern(String(e)));if(o===A.String&&a){const c=e.map(String),l=r+n.pos;n.u64(c.length);for(const u of c)n.u32(s.intern(u));return se(A.String,Ke,l)}if(o===A.Token&&a){const c=e,l=r+n.pos;n.u64(c.length);for(const u of c)n.u32(t.intern(u));return se(A.Token,Ke,l)}if(o===A.Int&&a){const c=e,l=r+n.pos;if(n.u64(c.length),c.length>=vu){const u=Mt(c.map(h=>h|0));return n.u64(u.length).bytes(u),se(A.Int,Ke|jr,l)}for(const u of c)n.u32(u>>>0);return se(A.Int,Ke,l)}if(o===A.Vec3d&&!a){const[c,l,u]=e,h=r+n.pos;return n.f64(c??0).f64(l??0).f64(u??0),se(A.Vec3d,0,h)}if(o===A.Vec3f&&!a){const[c,l,u]=e,h=r+n.pos;return n.f32(c??0).f32(l??0).f32(u??0),se(A.Vec3f,0,h)}if(o===A.Vec3f&&a){const c=e,l=r+n.pos;n.u64(c.length);for(const u of c)n.f32(u[0]??0).f32(u[1]??0).f32(u[2]??0);return se(A.Vec3f,Ke,l)}if(o===A.Vec3d&&a){const c=e,l=r+n.pos;n.u64(c.length);for(const u of c)n.f64(u[0]??0).f64(u[1]??0).f64(u[2]??0);return se(A.Vec3d,Ke,l)}if(o===A.Float&&!a){const c=new ArrayBuffer(4);return new DataView(c).setFloat32(0,Number(e),!0),Re(A.Float,new DataView(c).getUint32(0,!0))}if(o===A.Double&&!a){const c=r+n.pos;return n.f64(Number(e)),se(A.Double,0,c)}if((o===A.Float||o===A.Double)&&a){const c=e.map(Number),l=r+n.pos,u=o===A.Double;if(n.u64(c.length),c.length>=vu){const h=iy(o,c,u,n,l);if(h)return h}for(const h of c)u?n.f64(h):n.f32(h);return se(o,Ke,l)}if(o===A.Int&&!a)return Re(A.Int,e|0);if(o===A.Quatf||o===A.Quatd){const c=o===A.Quatd,l=h=>{const d=[h[1]??0,h[2]??0,h[3]??0,h[0]??0];for(const f of d)c?n.f64(f):n.f32(f)},u=r+n.pos;if(a){const h=e;n.u64(h.length);for(const d of h)l(d);return se(o,Ke,u)}return l(e),se(o,0,u)}if(o===A.Matrix4d){const c=u=>{const h=Array.isArray(u[0])?u.flat():u;for(let d=0;d<16;d++)n.f64(h[d]??0)},l=r+n.pos;if(a){const u=e;n.u64(u.length);for(const h of u)c(h);return se(A.Matrix4d,Ke,l)}return c(e),se(A.Matrix4d,0,l)}return Re(A.Token,t.intern(String(e)))}function ny(i,e,t,s,n,r){const o=e.map(([,l])=>ep(i,l,t,s,n,r)),a=r+n.pos;n.u64(e.length);for(const[l]of e)n.f64(l);const c=r+n.pos;n.u64(8),n.bytes(se(A.DoubleVector,0,a)),n.u64(8),n.u64(e.length);for(const l of o)n.bytes(l);return se(A.TimeSamples,0,c)}function ry(i){return i==="def"||i===0?0:i==="over"||i===1?1:i==="class"||i===2?2:0}function oy(i,e){for(const t of["","primChildren","properties","specifier","typeName","variability","default","custom","timeSamples"])e.intern(t);for(const[t,s]of Object.entries(i)){for(const c of t.split(/[\/.]/).filter(Boolean))e.intern(c);if(!s)continue;const n=s.typeName?.value;n&&e.intern(n.startsWith("uniform ")?n.slice(8):n);const r=s.default?.value;if(typeof r=="string"&&e.intern(r),Array.isArray(r)&&typeof r[0]=="string")for(const c of r)e.intern(c);const o=s.primChildren?.value;if(o)for(const c of o)e.intern(c);const a=s.properties?.value;if(a)for(const c of a)e.intern(c)}}function ay(i){const e=[];for(const t of ip(i))if(typeof t=="string")t.startsWith("/")&&e.push(t);else if(t&&typeof t=="object"&&"primPath"in t){const s=t.primPath;s&&s.startsWith("/")&&e.push(s)}return e}function cy(i){for(const e of Object.values(i))for(const t of["references","payload"])for(const s of ip(e[t]?.value))if(s&&typeof s=="object"&&"primPath"in s&&!s.primPath)return!0;return!1}function ly(i){const e=new Map,t=(n,r)=>{const o=e.get(n)??[];o.includes(r)||(o.push(r),e.set(n,o))},s=n=>{const r=n.split("/").filter(Boolean);let o="/";for(const a of r){const c=tp(o,a);i[c]||t(o,a),o=c}};for(const n of Object.values(i))if(n)for(const r of["references","payload","inheritPaths","specializes","targetPaths","connectionPaths"])for(const o of ay(n[r]?.value))s(o);return e}function tp(i,e){return i==="/"?`/${e}`:`${i}/${e}`}function Ca(i,e,t){const s=[],n=i[e],r=n?.properties?.value;if(r)for(const c of r)s.push({path:`${e==="/"?"":e}.${c}`,name:c,isProp:!0});const o=new Set,a=n?.primChildren?.value;if(a)for(const c of a)o.add(c);for(const c of t.get(e)??[])o.add(c);for(const c of o)s.push({path:tp(e,c),name:c,isProp:!1});return s}function sp(i,e,t){let s=1;for(const n of Ca(i,e,t))s+=n.isProp?1:sp(i,n.path,t);return s}function uy(i,e,t){const s=[],n=new Map,r=[],o=[];s.push("/"),n.set("/",0),r.push(0);const a=Ca(i,"/",t);if(a.length===0)return o.push(-2),{dfsPaths:s,pathToIdx:n,elementTokenIndices:r,jumps:o};o.push(-1);function c(l){for(let u=0;u<l.length;u++){const{path:h,name:d,isProp:f}=l[u],p=u===l.length-1,y=s.length;s.push(h),n.set(h,y),r.push(f?-e.get(d):e.get(d));const m=Ca(i,h,t),g=m.length>0;let S;if(g&&p)S=-1;else if(g&&!p){let _=0;for(const P of m)_+=P.isProp?1:sp(i,P.path,t);S=1+_}else!g&&p?S=-2:S=0;o.push(S),g&&c(m)}}return c(a),{dfsPaths:s,pathToIdx:n,elementTokenIndices:r,jumps:o}}function vi(i){const e={isExplicit:!1,explicit:[],added:[],prepended:[],appended:[],deleted:[],ordered:[]};if(i==null)return null;if(Array.isArray(i))return i.length===0?null:{...e,prepended:i};if(typeof i=="object"&&"isExplicit"in i){const t=i,s={isExplicit:!!t.isExplicit,explicit:t.explicitItems??[],added:t._sdfAddedItems??[],prepended:t.prependedItems??[],appended:t.appendedItems??[],deleted:t.deletedItems??[],ordered:t.orderedItems??[]};return s.isExplicit||s.explicit.length||s.added.length||s.prepended.length||s.appended.length||s.deleted.length||s.ordered.length?s:null}return typeof i=="string"?{...e,prepended:[i]}:null}function vc(i,e,t){let s=0;i.isExplicit&&(s|=Qs.IsExplicit),i.explicit.length&&(s|=Qs.HasExplicitItems),i.added.length&&(s|=Qs.HasAddedItems),i.prepended.length&&(s|=Qs.HasPrependedItems),i.appended.length&&(s|=Qs.HasAppendedItems),i.deleted.length&&(s|=Qs.HasDeletedItems),i.ordered.length&&(s|=Qs.HasOrderedItems),e.u8(s),i.explicit.length&&t(i.explicit),i.added.length&&t(i.added),i.prepended.length&&t(i.prepended),i.appended.length&&t(i.appended),i.deleted.length&&t(i.deleted),i.ordered.length&&t(i.ordered)}function Lo(i,e,t,s){const n=s+t.pos,r=o=>o.map(a=>e.get(a)).filter(a=>a!==void 0);return vc(i,t,o=>{const a=r(o);t.u64(a.length);for(const c of a)t.u32(c)}),se(A.PathListOp,0,n)}function Tu(i,e,t,s){const n=s+t.pos;return vc(i,t,r=>{t.u64(r.length);for(const o of r)t.u32(e.intern(o))}),se(A.TokenListOp,0,n)}function hy(i,e,t,s,n,r){const o=r+n.pos;return vc(i,n,a=>{n.u64(a.length);for(const c of a){const l=c.assetPath??"",u=c.primPath??"",h=c.layerOffset??{offset:0,scale:1};n.u32(t.intern(l)),n.u32(u?s.get(u)??0:s.get("")??0),n.f64(h.offset).f64(h.scale),e&&n.u64(0)}}),se(e?A.ReferenceListOp:A.PayloadListOp,0,o)}function dy(i,e,t,s){const n=s+t.pos;t.u64(i.length);for(const r of i)t.u32(e.intern(r));return se(A.StringVector,Ke,n)}function py(i,e,t){const s=t+e.pos;e.u64(i.length);for(const n of i)e.f64(n.offset).f64(n.scale);return se(A.LayerOffsetVector,Ke,s)}function fy(i,e,t,s){const n=Object.entries(i),r=s+t.pos;t.u64(n.length);for(const[o,a]of n){const c=Array.isArray(a)?a[0]??"":a;t.u32(e.intern(o)),t.u32(e.intern(c))}return se(A.VariantSelectionMap,0,r)}function my(i,e,t){const s=t+e.pos;return e.f64(i),se(A.Double,0,s)}function ip(i){if(Array.isArray(i))return i;if(i!==null&&typeof i=="object"&&"isExplicit"in i){const e=i;return e.isExplicit?[...e.explicitItems]:[...e.prependedItems,...e.appendedItems]}return typeof i=="string"?[i]:[]}function gy(i,e,t,s,n,r,o){const a=e[i];if(!a)return[];const c=[],l=i==="/",u=!l&&i.includes(".");if(u&&a.typeName?.value==="rel"){c.push({tokenIdx:t.intern("custom"),rep:Re(A.Bool,0)}),c.push({tokenIdx:t.intern("variability"),rep:Re(A.Variability,1)});const h=vi(a.targetPaths?.value);return h&&c.push({tokenIdx:t.intern("targetPaths"),rep:Lo(h,o,n,r)}),c}if(u){const h=a.typeName?.value;c.push({tokenIdx:t.intern("custom"),rep:Re(A.Bool,0)});const d=vi(a.connectionPaths?.value);if(d&&c.push({tokenIdx:t.intern("connectionPaths"),rep:Lo(d,o,n,r)}),h){const y=h.startsWith("uniform "),m=y?h.slice(8):h;c.push({tokenIdx:t.intern("typeName"),rep:Re(A.Token,t.intern(m))}),c.push({tokenIdx:t.intern("variability"),rep:Re(A.Variability,y?1:0)})}const f=a.default?.value;f!==void 0&&h&&c.push({tokenIdx:t.intern("default"),rep:ep(h,f,t,s,n,r)});const p=a.timeSamples?.value;p&&p.length>0&&h&&c.push({tokenIdx:t.intern("timeSamples"),rep:ny(h,p,t,s,n,r)})}else{if(l){for(const y of["defaultPrim","upAxis"]){const m=a[y]?.value;typeof m=="string"&&c.push({tokenIdx:t.intern(y),rep:Re(A.Token,t.intern(m))})}for(const y of["metersPerUnit","startTimeCode","endTimeCode","timeCodesPerSecond","framesPerSecond"]){const m=a[y]?.value;typeof m=="number"&&c.push({tokenIdx:t.intern(y),rep:my(m,n,r)})}const p=a.subLayers?.value;if(p&&p.length>0){c.push({tokenIdx:t.intern("subLayers"),rep:dy(p,s,n,r)});const y=a.subLayerOffsets?.value,m=p.map((g,S)=>y?.[S]??{offset:0,scale:1});c.push({tokenIdx:t.intern("subLayerOffsets"),rep:py(m,n,r)})}}else{c.push({tokenIdx:t.intern("specifier"),rep:Re(A.Specifier,ry(a.specifier?.value))});for(const _ of["active","instanceable"]){const P=a[_]?.value;P!==void 0&&c.push({tokenIdx:t.intern(_),rep:Re(A.Bool,P?1:0)})}const p=a.kind?.value;typeof p=="string"&&c.push({tokenIdx:t.intern("kind"),rep:Re(A.Token,t.intern(p))});const y=vi(a.apiSchemas?.value);y&&c.push({tokenIdx:t.intern("apiSchemas"),rep:Tu(y,t,n,r)});for(const _ of["references","payload"]){const P=vi(a[_]?.value);P&&c.push({tokenIdx:t.intern(_),rep:hy(P,_==="references",s,o,n,r)})}for(const _ of["inheritPaths","specializes"]){const P=vi(a[_]?.value);P&&c.push({tokenIdx:t.intern(_),rep:Lo(P,o,n,r)})}const m=vi(a.variantSetNames?.value);m&&c.push({tokenIdx:t.intern("variantSetNames"),rep:Tu(m,t,n,r)});const g=a.variantSetChildren?.value;if(g&&g.length>0){const _=r+n.pos;n.u64(g.length);for(const P of g)n.u32(t.intern(P));c.push({tokenIdx:t.intern("variantSetChildren"),rep:se(A.TokenVector,0,_)})}const S=a.variantSelection?.value;S&&typeof S=="object"&&Object.keys(S).length>0&&c.push({tokenIdx:t.intern("variantSelection"),rep:fy(S,s,n,r)})}const h=a.typeName?.value;h&&c.push({tokenIdx:t.intern("typeName"),rep:Re(A.Token,t.intern(h))});const d=a.primChildren?.value;if(d&&d.length>0){const p=r+n.pos;n.u64(d.length);for(const y of d)n.u32(t.intern(y));c.push({tokenIdx:t.intern("primChildren"),rep:se(A.TokenVector,0,p)})}const f=a.properties?.value;if(f&&f.length>0){const p=r+n.pos;n.u64(f.length);for(const y of f)n.u32(t.intern(y));c.push({tokenIdx:t.intern("properties"),rep:se(A.TokenVector,0,p)})}}return c}function yy(i){const e={};for(const z of i.getSpecPaths()){const Be={};for(const Ut of i.getFieldNames(z))Be[Ut]={value:i.getField(z,Ut)};e[z]=Be}const t=32,s=new ey;oy(e,s);const n=new ty(s),r=ly(e);for(const z of r.values())for(const Be of z)s.intern(Be);const{dfsPaths:o,pathToIdx:a,elementTokenIndices:c,jumps:l}=uy(e,s,r),u=o.length,h=o.map((z,Be)=>Be);let d=u;cy(e)&&(a.set("",u),d=u+1);const f=new As,p=t,y=[],m=[],g=[],S=[],_=[];for(const z of o){if(!e[z])continue;const Be=z==="/",Ut=!Be&&z.includes("."),bo=Ut&&e[z]?.typeName?.value==="rel",Ef=Be?cr.PseudoRoot:bo?cr.Relationship:Ut?cr.Attribute:cr.Prim,Bf=gy(z,e,s,n,f,p,a),Of=_.length;for(const Rf of Bf)_.push(y.length),y.push(Rf);_.push(-1),m.push(z),g.push(Ef),S.push(Of)}const P=s.tokens,w=new TextEncoder,v=P.map(z=>{const Be=w.encode(z),Ut=new Uint8Array(Be.length+1);return Ut.set(Be),Ut}),b=v.reduce((z,Be)=>z+Be.length,0),I=new Uint8Array(b);let T=0;for(const z of v)I.set(z,T),T+=z.length;const E=wa(I),D=new As;D.u64(P.length).u64(b).u64(E.length).bytes(E);const N=n.tokenIndices,x=new As;x.u64(N.length);for(const z of N)x.u32(z);const R=y.map(z=>z.tokenIdx),U=Mt(R),$=new Uint8Array(y.length*8);for(let z=0;z<y.length;z++)$.set(y[z].rep,z*8);const Ie=wa($),le=new As;le.u64(y.length),le.u64(U.length).bytes(U),le.u64(Ie.length).bytes(Ie);const q=Mt(_),Z=new As;Z.u64(_.length),Z.u64(q.length).bytes(q);const ye=Mt(h),Ae=Mt(c),fe=Mt(l),ue=new As;ue.u64(d).u64(u),ue.u64(ye.length).bytes(ye),ue.u64(Ae.length).bytes(Ae),ue.u64(fe.length).bytes(fe);const oe=m.map(z=>a.get(z)??0),Dt=S,kt=g,cs=m.length,Y=Mt(oe),Ys=Mt(Dt),Fe=Mt(kt),Ct=new As;Ct.u64(cs),Ct.u64(Y.length).bytes(Y),Ct.u64(Ys.length).bytes(Ys),Ct.u64(Fe.length).bytes(Fe);const Te=new As;Te.ascii("PXR-USDC",8),Te.u8(0).u8(8).u8(0),Te.ascii("",5);const Nf=Te.pos;Te.u64(0),Te.u64(0),Te.bytes(f.toUint8Array());const sr=[["TOKENS",D.toUint8Array()],["STRINGS",x.toUint8Array()],["FIELDS",le.toUint8Array()],["FIELDSETS",Z.toUint8Array()],["PATHS",ue.toUint8Array()],["SPECS",Ct.toUint8Array()]],jc=[];for(const[,z]of sr)jc.push({offset:Te.pos,size:z.length}),Te.bytes(z);const Mf=Te.pos;Te.patchU64(Nf,Mf),Te.u64(sr.length);for(let z=0;z<sr.length;z++){const[Be]=sr[z],{offset:Ut,size:bo}=jc[z];Te.ascii(Be,16).u64(Ut).u64(bo)}return Te.toUint8Array()}const _y={1:"attribute",2:"connection",3:"expression",4:"mapper",5:"mapperArg",6:"prim",7:"pseudoRoot",8:"relationship",9:"relationshipTarget",10:"variant",11:"variantSet"},Sy=new Set(["comment","documentation","subLayers","subLayerOffsets","defaultPrim","startTimeCode","endTimeCode","timeCodesPerSecond","framesPerSecond","startFrame","endFrame","framePrecision","metersPerUnit","upAxis","expressionVariables","owner","sessionOwner","hasOwnedSubLayers","primChildren","primOrder","relocates","layerRelocates","colorConfiguration","colorManagementSystem","fallbackPrimTypes"]);function xu(i,e){const t=e.form===void 0?void 0:_y[e.form];if(t)return t;if(i==="/")return"pseudoRoot";if(/\{[^}=]+=[^}]*\}$/.test(i))return/=\}$/.test(i)?"variantSet":"variant";const s=i.lastIndexOf("/");if(i.indexOf(".",s)>=0){const n=e.typeName?.value,r=e.targetPaths?.value;return n==="rel"||r!==void 0?"relationship":"attribute"}return"prim"}function Py(i){return(i instanceof Map?[...i]:Array.isArray(i)?i.filter(t=>Array.isArray(t)&&t.length>=2):i!==null&&typeof i=="object"?Object.entries(i):[]).map(([t,s])=>[Number(t),s!==null&&typeof s=="object"&&"typeId"in s&&"value"in s?s.value:s]).filter(([t])=>Number.isFinite(t)).sort(([t],[s])=>t-s)}function wy(i){const e=i.replace(/\[\]$/,"");return e==="float"||e==="quatf"||/^(?:color|point|normal|vector|texCoord)[234]f$/.test(e)}function Dr(i,e){return wy(e)?typeof i=="number"?Math.fround(i):Array.isArray(i)?i.map(t=>Dr(t,e)):i:i}function by(i){if(!(i instanceof Ve))return i;const t=i.GetValueType().GetTypeName()==="float";for(const s of i.GetKnots()){if(s.GetPreTanWidth()<0||s.GetPostTanWidth()<0)throw new Error("Cannot set negative tangent width");if(t){if([s.GetValue(),s.GetPreValue()].some(r=>!Number.isFinite(Math.fround(r))))throw new Error("Cannot set undefined float spline value");s.SetValue(Math.fround(s.GetValue())),s.IsDualValued()&&s.SetPreValue(Math.fround(s.GetPreValue())),s.SetPreTanSlope(Math.fround(s.GetPreTanSlope())),s.SetPostTanSlope(Math.fround(s.GetPostTanSlope()))}}return i}function vy(i){return i===null||typeof i!="object"||!i._sdfExplicitEmpty?i:{...i,isExplicit:!0}}function np(i){const e=new wn;for(const[t,s]of Object.entries(i)){const n=xu(t,s);e.createSpec(t,n);const r=s.typeName?.value,o=typeof r=="string"?r:"";for(const[a,c]of Object.entries(s)){if(a==="form"||a==="fields")continue;const l=c,u=l?.value;if(u===void 0)continue;const h=u,d=a==="specifier"&&typeof h=="number"?["def","over","class"][h]:a==="variability"&&typeof h=="number"?["varying","uniform"][h]:h;if(!(a==="typeName"&&d==="__AnyType__")&&!(t==="/"&&!Sy.has(a)&&ho(a,"layer")===void 0)){if(a==="timeSamples")e.set(t,a,Py(h).map(([f,p])=>[f,Dr(p,o)]));else{const f=vy(d);e.set(t,a,a==="default"?Dr(f,o):a==="spline"?by(f):a==="customData"?Ed(f,Dr):a==="documentation"&&typeof f=="string"?f.replace(/\\(['"\\])/g,"$1"):f)}l?.valueTypeName&&e.setValueTypeName(t,a,l.valueTypeName)}}n==="variant"&&!e.has(t,"specifier")&&e.set(t,"specifier","over"),n==="relationship"&&!e.has(t,"variability")&&e.set(t,"variability","uniform")}for(const[t,s]of Object.entries(i)){if(xu(t,s)!=="prim")continue;const n=e.get(t,"variantSetNames"),r=[...new Set([...n?.explicitItems??[],...n?.prependedItems??[],...n?.appendedItems??[]].filter(o=>typeof o=="string"))];if(r.length!==0){e.set(t,"variantSetChildren",r);for(const o of r){const a=`${t}{${o}=}`;e.hasSpec(a)||e.createSpec(a,"variantSet")}}}return e}function Iy(i){const e=i instanceof Nd?i:void 0,t=e?.value??i;return{typeId:0,isArray:Array.isArray(t),isInlined:!1,isCompressed:!1,payload:0,value:t,...e?{valueTypeName:e.typeName}:{}}}function fi(i,e,t){const s={};for(const[n,r]of Object.entries(t))s[n]=Iy(r);i[e]={form:0,fields:s,...s}}function Ay(i,e){i.need("{");const t=e==="timecode"?"double":e;if(i.peek()==="}"){i.need("}");const d=new Ve(L.Declare(t));return d.SetTimeValued(e==="timecode"),ul(d,{preExtrapolationAuthored:!1,postExtrapolationAuthored:!1,knots:new Map}),d}const s=i.peekWord(),r=(s==="hermite"||s==="bezier"?i.word():"bezier")==="hermite"?Ue.Hermite:Ue.Bezier;i.eat(",");const o=new Ve(L.Declare(t));o.SetTimeValued(e==="timecode"),o.SetCurveType(r);const a=[],c=new Map,l=new Map;let u=!1,h=!1;for(;!i.eof()&&i.peek()!=="}";){const d=i.peekWord();if(d==="pre"||d==="post"){i.word(),i.need(":");const _=i.word(),P=_==="sloped"?Q.Sloped:_==="linear"?Q.Linear:_==="none"?Q.ValueBlock:Q.Held;let w=0;i.eat("(")&&(w=i.number(),i.need(")"));const v=new ys(P,w);d==="pre"?(u=!0,o.SetPreExtrapolation(v)):(h=!0,o.SetPostExtrapolation(v)),i.eat(",");continue}if(d==="loop"){i.word(),i.need(":"),i.need("(");const _=[];for(let P=0;P<5;P++)_.push(i.number()),P<4&&i.need(",");i.need(")"),o.SetInnerLoopParams(new $s(..._)),i.eat(",");continue}const f=new _i(o.GetValueType());f.SetCurveType(r),f.SetNextInterpolation(ne.Held),f.SetTime(i.number()),i.need(":");let p=i.number();i.eat("&")&&(f.SetPreValue(p),p=i.number()),f.SetValue(p);let y=0,m=0,g=0,S=0;for(;i.eat(";");){if(i.peek()==="{"){const T=Qe(i);if(T&&typeof T=="object"&&!Array.isArray(T)){const E=_c(T);E&&c.set(f.GetTime(),E),f.SetCustomData(T)}continue}const _=i.word();let P="";_==="post"&&i.peek()!=="("&&(P=i.word());let w=0,v=0,b=0,I=0;if(i.eat("(")){const T=i.number();let E=_t.None;if(i.eat(",")){const D=i.peekWord();if(D==="autoEase"||D==="custom")E=i.word()==="autoEase"?_t.AutoEase:_t.Custom,v=T,I=T;else{const N=i.number();w=T,v=N,I=T,b=N,i.eat(",")&&(E=i.word()==="autoEase"?_t.AutoEase:_t.Custom)}}else v=T,I=T;i.need(")"),_==="pre"?f.SetPreTanAlgorithm(E):f.SetPostTanAlgorithm(E)}_==="pre"?(m=b,y=I,f.SetPreTanWidth(w),f.SetPreTanSlope(v)):(S=b,g=I,f.SetPostTanWidth(w),f.SetPostTanSlope(v),f.SetNextInterpolation(P==="none"?ne.ValueBlock:P==="held"?ne.Held:P==="linear"?ne.Linear:ne.Curve))}l.set(f.GetTime(),{dualValued:f.IsDualValued(),preTangentSlope:y,preTangentWidth:m,postTangentSlope:g,postTangentWidth:S}),a.push(f),i.eat(",")}return i.need("}"),o.SetKnots(a),c.size&&xm(o,c),ul(o,{preExtrapolationAuthored:u,postExtrapolationAuthored:h,knots:l}),o}class Ty{constructor(e,t=""){this.sourceName=t,this.src=e}src;pos=0;eof(){return this.pos>=this.src.length}at(e=0){return this.src[this.pos+e]??""}ws(){for(;!this.eof();){const e=this.at();if(e===" "||e==="	"||e==="\r"||e===`
`)this.pos++;else if(e==="#")for(;!this.eof()&&this.at()!==`
`;)this.pos++;else if(e==="/"&&this.at(1)==="*")for(this.pos+=2;!this.eof();){if(this.at()==="*"&&this.at(1)==="/"){this.pos+=2;break}this.pos++}else break}}peek(){return this.ws(),this.at()}word(){this.ws();let e="";for(;!this.eof()&&/[a-zA-Z0-9_]/.test(this.at());)e+=this.src[this.pos++];return e}peekWord(){const e=this.pos;this.ws();let t="",s=this.pos;for(;s<this.src.length&&/[a-zA-Z0-9_]/.test(this.src[s]);)t+=this.src[s++];return this.pos=e,t}ident(){this.ws();let e="";for(;!this.eof()&&/[a-zA-Z0-9_:]/.test(this.at());)e+=this.src[this.pos++];return e.replace(/:+$/,"")}eat(e){return this.ws(),this.src.startsWith(e,this.pos)?(this.pos+=e.length,!0):!1}need(e){if(!this.eat(e))throw new Error(`Expected '${e}' at ${this.pos}, got: '${this.src.slice(this.pos,this.pos+30)}'`)}expectedListOperand(e){this.ws();const t=this.src.slice(0,this.pos).split(/\r?\n/),s=t.length,n=(t.at(-1)?.length??0)+1;let r=this.at();if(r==="@"){const a=this.src.indexOf("@",this.pos+1);r=a<0?this.src.slice(this.pos):this.src.slice(this.pos,a+1)}else r=this.src.slice(this.pos).match(/^[^\s,;)]+/)?.[0]??r;const o=this.sourceName?`${this.sourceName}:`:"";throw new Error(`${o}${s}:${n}: Expected None or [ at '${r}' in <${e}>`)}string(){this.ws();const e=this.at();if(e!=='"'&&e!=="'")throw new Error(`Expected string at ${this.pos}`);const t=e+e+e;if(this.src.startsWith(t,this.pos)){this.pos+=3;let n="";for(;!this.eof();){if(this.src.startsWith(t,this.pos)){this.pos+=3;break}const r=this.src[this.pos];r==="\\"?(this.pos++,n+=this.readEscape()):(n+=r,this.pos++)}return n}this.pos++;let s="";for(;!this.eof();){const n=this.src[this.pos];if(n===e){this.pos++;break}n==="\\"?(this.pos++,s+=this.readEscape()):(s+=n,this.pos++)}return s}readEscape(){const e=this.src[this.pos++]??"";switch(e){case"n":return`
`;case"t":return"	";case"r":return"\r";case"\\":return"\\";case'"':return'"';case"'":return"'";case"x":{const t=/^[0-9a-fA-F]{1,2}/.exec(this.src.slice(this.pos,this.pos+2));return t?(this.pos+=t[0].length,String.fromCharCode(parseInt(t[0],16))):"\\x"}default:return"\\"+e}}rawNumber(){this.ws();let e="",t=!0;if((this.at()==="-"||this.at()==="+")&&(e+=this.src[this.pos++]),/[0-9]/.test(this.at()))for(;!this.eof()&&/[0-9]/.test(this.at());)e+=this.src[this.pos++];if(this.at()==="."&&/[0-9]/.test(this.at(1)))for(t=!1,e+=this.src[this.pos++];!this.eof()&&/[0-9]/.test(this.at());)e+=this.src[this.pos++];if(this.at()==="e"||this.at()==="E")for(t=!1,e+=this.src[this.pos++],(this.at()==="+"||this.at()==="-")&&(e+=this.src[this.pos++]);!this.eof()&&/[0-9]/.test(this.at());)e+=this.src[this.pos++];return{raw:e,value:parseFloat(e),isInt:t}}number(){return this.rawNumber().value}asset(){if(this.need("@"),this.at()==="@"&&this.at(1)==="@"){this.pos+=2;const t=this.src.indexOf("@@@",this.pos),s=t<0?"":this.src.slice(this.pos,t);return t>=0&&(this.pos=t+3),s}let e="";for(;!this.eof()&&this.at()!=="@";)e+=this.src[this.pos++];return this.eof()||this.pos++,e}path(){this.need("<");let e="";for(;!this.eof()&&this.at()!==">";)e+=this.src[this.pos++];return this.pos++,e}skipBlock(){this.need("{");let e=1;for(;!this.eof()&&e>0;){const t=this.src[this.pos];if(t==="{")e++,this.pos++;else if(t==="}")e--,this.pos++;else if(t==='"'||t==="'"){const s=t,n=s+s+s;if(this.src.startsWith(n,this.pos)){this.pos+=3;const r=this.src.indexOf(n,this.pos);this.pos=r<0?this.src.length:r+3}else{for(this.pos++;!this.eof()&&this.src[this.pos]!==s;)this.src[this.pos]==="\\"&&this.pos++,this.pos++;this.pos++}}else if(t==="#")for(;!this.eof()&&this.src[this.pos]!==`
`;)this.pos++;else if(t==="/"&&this.src[this.pos+1]==="*"){this.pos+=2;const s=this.src.indexOf("*/",this.pos);this.pos=s<0?this.src.length:s+2}else if(t==="@")if(this.pos++,this.src[this.pos]==="@"&&this.src[this.pos+1]==="@"){this.pos+=2;const s=this.src.indexOf("@@@",this.pos);this.pos=s<0?this.src.length:s+3}else{for(;!this.eof()&&this.src[this.pos]!=="@";)this.pos++;this.eof()||this.pos++}else this.pos++}}skipParen(){this.need("(");let e=1;for(;!this.eof()&&e>0;){const t=this.src[this.pos];if(t==="(")e++,this.pos++;else if(t===")")e--,this.pos++;else if(t==='"'||t==="'"){const s=t,n=s+s+s;if(this.src.startsWith(n,this.pos)){this.pos+=3;const r=this.src.indexOf(n,this.pos);this.pos=r<0?this.src.length:r+3}else{for(this.pos++;!this.eof()&&this.src[this.pos]!==s;)this.src[this.pos]==="\\"&&this.pos++,this.pos++;this.pos++}}else if(t==="#")for(;!this.eof()&&this.src[this.pos]!==`
`;)this.pos++;else if(t==="/"&&this.src[this.pos+1]==="*"){this.pos+=2;const s=this.src.indexOf("*/",this.pos);this.pos=s<0?this.src.length:s+2}else this.pos++}}skipBracket(){this.need("[");let e=1;for(;!this.eof()&&e>0;){const t=this.src[this.pos];if(t==="[")e++,this.pos++;else if(t==="]")e--,this.pos++;else if(t==='"'||t==="'"){const s=t,n=s+s+s;if(this.src.startsWith(n,this.pos)){this.pos+=3;const r=this.src.indexOf(n,this.pos);this.pos=r<0?this.src.length:r+3}else{for(this.pos++;!this.eof()&&this.src[this.pos]!==s;)this.src[this.pos]==="\\"&&this.pos++,this.pos++;this.pos++}}else if(t==="#")for(;!this.eof()&&this.src[this.pos]!==`
`;)this.pos++;else this.pos++}}}function Qe(i){i.ws();const e=i.peek();if(!e)return null;if(i.src.startsWith("None",i.pos)&&!/[a-zA-Z0-9_]/.test(i.src[i.pos+4]??""))return i.pos+=4,null;if(e==='"'||e==="'")return i.string();if(e==="("){i.need("(");const t=[];for(;i.peek()!==")"&&!i.eof()&&(t.length>0&&i.eat(","),i.ws(),i.peek()!==")");)t.push(Qe(i));return i.need(")"),t}if(e==="["){i.need("[");const t=[];for(;i.peek()!=="]"&&!i.eof()&&(t.length>0&&i.eat(","),i.ws(),i.peek()!=="]");)t.push(Qe(i));return i.need("]"),t}if(e==="@")return i.asset();if(e==="<")return i.path();if(e==="{")return xy(i);if((e==="-"||e==="+")&&/[a-zA-Z_]/.test(i.at(1))){const t=e==="-"?-1:1;i.pos++;const s=i.word();return s==="inf"||s==="Inf"||s==="INF"?t*(1/0):s==="nan"||s==="NaN"?t*NaN:`${e}${s}`}if(e==="-"||e==="+"||/[0-9]/.test(e)||e==="."&&/[0-9]/.test(i.at(1))){const t=i.rawNumber();return t.isInt?new Bi(t.raw,t.value):t.value}if(/[a-zA-Z_]/.test(e)){i.pos;const t=i.word();return t==="true"||t==="True"?!0:t==="false"||t==="False"?!1:t==="None"?null:t==="edit"&&i.peek()==="["?(i.skipBracket(),null):t==="inf"||t==="Inf"||t==="INF"?1/0:t==="nan"||t==="NaN"?NaN:t}return i.pos++,null}function Ic(i,e,t){const s=i.peek(),n=i.peekWord(),r=s==='"'||s==="'"?"string":s==="@"?"asset":s==="<"?"path":s==="{"?"dictionary":n==="true"||n==="True"||n==="false"||n==="False"?"bool":n==="inf"||n==="Inf"||n==="INF"||n==="nan"||n==="NaN"?"double":/[-+0-9.]/.test(s)?/[.eE]/.test(i.src.slice(i.pos).match(/^[^\s,;)\]}]+/)?.[0]??"")?"double":"int":n?"token":void 0,o=po(Qe(i));return ho(e,t)===void 0&&r?new Nd(o,r):o}function xy(i){i.need("{");const e={},t=new Map;for(;!i.eof()&&i.peek()!=="}"&&(i.ws(),i.peek()!=="}");){if(i.peek()==='"'||i.peek()==="'"){i.string(),i.eat(";");continue}const s=i.word();if(!s){i.pos++;continue}if(i.ws(),i.peek()==="}")break;const n=i.eat("[]"),r=i.ident();if(!r){i.pos++;continue}if(i.eat("=")){const o=Qe(i),a=n?`${s}[]`:s;e[r]=s==="dictionary"?o:Aa(o,a),t.set(r,a)}i.eat(";")}return i.need("}"),Md(e,t),e}function rp(i){const e={};for(i.need("{");!i.eof()&&i.peek()!=="}"&&(i.ws(),i.peek()!=="}");){if(i.peek()==='"'||i.peek()==="'"){i.string(),i.eat(",");continue}if(i.peek()===","){i.pos++;continue}if(i.peek()!=="<"){i.pos++;continue}const t=i.path();i.ws(),i.eat(":"),i.ws();const s=i.peek()==="<"?i.path():"";t&&!(t in e)&&(e[t]=s),i.eat(",")}return i.need("}"),e}function Dy(i){i.need("{");const e={};for(;!i.eof()&&i.peek()!=="}"&&(i.ws(),i.peek()!=="}");){i.src.slice(i.pos);const t=i.number();i.eat(":");const s=Qe(i);e[String(t)]=s,i.eat(",")}return i.need("}"),e}function Bs(){return{isExplicit:!1,explicitItems:[],prependedItems:[],appendedItems:[],deletedItems:[],orderedItems:[]}}function Os(i,e,t){const s=()=>{i.isExplicit=!1,i.explicitItems.length=0,delete i._sdfAddedItems,i.prependedItems.length=0,i.appendedItems.length=0,i.deletedItems.length=0,i.orderedItems.length=0,delete i._sdfExplicitEmpty};if(!e){s(),t.length>0?(i.isExplicit=!0,i.explicitItems.push(...t)):Object.defineProperty(i,"_sdfExplicitEmpty",{value:!0,configurable:!0,enumerable:!1});return}if(i.isExplicit&&s(),delete i._sdfExplicitEmpty,e==="prepend")i.prependedItems.push(...t);else if(e==="add"){const n=i._sdfAddedItems??[];n.push(...t),Object.defineProperty(i,"_sdfAddedItems",{value:n,configurable:!0,enumerable:!1,writable:!0}),i.appendedItems.push(...t)}else e==="append"?i.appendedItems.push(...t):e==="delete"?i.deletedItems.push(...t):e==="reorder"&&i.orderedItems.push(...t)}function ky(i){i.ws();let e="",t="",s=!1;i.peek()==="@"&&(e=i.asset()),i.peek()==="<"&&(t=i.path(),s=!0);const n={offset:0,scale:1};if(i.peek()==="("){for(i.need("(");!i.eof()&&i.peek()!==")";){const r=i.word();if(i.eat("="))if(r==="offset"||r==="scale"){const o=i.number();r==="offset"?n.offset=o:n.scale=o}else Qe(i);i.eat(";"),i.eat(",")}i.need(")")}return!e&&!t&&!s?null:{assetPath:e,primPath:t,layerOffset:n}}function Du(i,e){if(i.ws(),i.src.startsWith("None",i.pos)&&!/[a-zA-Z0-9_]/.test(i.src[i.pos+4]??""))return i.pos+=4,[];if(i.peek()==="["){i.need("[");const s=[];for(;!i.eof()&&i.peek()!=="]";){const n=e(i);if(n!==null&&s.push(n),!i.eat(","))break}return i.need("]"),s}const t=e(i);return t===null?[]:[t]}function op(i,e){if(i.ws(),i.src.startsWith("None",i.pos)&&!/[a-zA-Z0-9_]/.test(i.src[i.pos+4]??""))return i.pos+=4,[];i.peek()!=="["&&i.expectedListOperand(e);const t=po(Qe(i));return Array.isArray(t)?t:[]}const ap=new Set(["prepend","append","add","delete","reorder"]);function cp(i,e){const t={};for(i.need("(");!i.eof()&&i.peek()!==")";){if(i.peek()==='"'||i.peek()==="'"){t.comment=i.string(),i.eat(";");continue}let s="",n=i.ident();if(ap.has(n)&&(s=n,n=i.ident()),!n){i.pos++;continue}if(n==="references"||n==="payload"){i.need("=");const r=Du(i,ky),o=t[n]??=Bs();Os(o,s,r)}else if(n==="inherits"||n==="specializes"){i.need("=");const r=Du(i,c=>c.peek()!=="<"?null:c.path()),o=n==="inherits"?"inheritPaths":"specializes",a=t[o]??=Bs();Os(a,s,r)}else if(n==="variantSets"){i.need("=");const r=Qe(i),o=typeof r=="string"?[r]:Array.isArray(r)?r.filter(c=>typeof c=="string"):[],a=t.variantSetNames??=Bs();Os(a,s,o)}else if(n==="variants"){i.need("="),i.need("{");const r=t.variantSelection??{};for(;!i.eof()&&i.peek()!=="}";){i.word();const o=i.ident()||(i.peek()==='"'?i.string():"");if(!o){i.pos++;continue}i.need("="),r[o]=[i.string()],i.eat(";")}i.need("}"),t.variantSelection=r}else if(n==="apiSchemas"||n==="clipSets"){i.need("=");const r=Qe(i),o=typeof r=="string"?[r]:Array.isArray(r)?r.filter(c=>typeof c=="string"):[],a=t[n]??=Bs();Os(a,s,o)}else if(n==="relocates")i.need("="),t.relocates=rp(i);else if(i.eat("=")){const r=s?op(i,e):Ic(i,n,"prim");if(s){const o=t[n]??=Bs();Os(o,s,r)}else t[n]=r}i.eat(";")}return i.need(")"),t}function lp(i,e,t,s){const n=i.word();i.ws();let r="";i.peek()!=='"'&&i.peek()!=="'"&&(r=i.word(),i.ws());const o=i.string(),a=t==="/"?`/${o}`:`${t}${t.endsWith("}")?"":"/"}${o}`;let c={};i.peek()==="("&&(c=cp(i,a));const l=[],u=[],h=new Set,d=[],f={};for(i.need("{");!i.eof()&&i.peek()!=="}";)up(i,e,a,l,u,f,d,h),i.eat(";");i.need("}"),u.sort((y,m)=>{const g=S=>{const _=e[`${a}.${S}`]?.fields;return!h.has(S)&&_&&("connectionPaths"in _||"timeSamples"in _)?1:0};return g(y)-g(m)});const p={specifier:n,...c};r&&(p.typeName=r),l.length>0&&(p.primChildren=l),u.length>0&&(p.properties=u),d.length>0&&(p.variantSetChildren=d),f.primOrder&&(p.primOrder=f.primOrder),f.propertyOrder&&(p.propertyOrder=f.propertyOrder),fi(e,a,p),s.push(o)}function up(i,e,t,s,n,r={},o=[],a=new Set){i.ws();const c=i.peek();if(!c||c==="}")return;if(c==='"'||c==="'"){i.string();return}if(c===";"){i.pos++;return}let l=!1,u="",h=i.peekWord();if(h==="reorder"){i.word();const v=i.word();if(v!=="nameChildren"&&v!=="properties")throw new Error(`reorder must target nameChildren or properties at ${i.pos}, got '${v}'`);i.need("=");const b=Qe(i),I=typeof b=="string"?[b]:Array.isArray(b)?b.filter(T=>typeof T=="string"):[];v==="nameChildren"?r.primOrder=I:r.propertyOrder=I;return}let d="";if((h==="delete"||h==="append"||h==="prepend"||h==="add")&&(d=i.word(),h=i.peekWord()),h==="custom"&&(i.word(),l=!0,h=i.peekWord()),h==="uniform"?(i.word(),u="uniform",h=i.peekWord()):h==="varying"&&(i.word(),u="varying",h=i.peekWord()),h==="def"||h==="over"||h==="class"){lp(i,e,t,s);return}if(h==="variantSet"){i.word();const v=i.string();i.eat("="),Cy(i,e,t,v),o.includes(v)||o.push(v);return}if(h==="rel"){i.word();const v=i.ident();if(!v)return;i.ws(),i.peek()==="."&&(i.pos++,i.word());let b,I=d!=="";if(i.peek()==="="){i.pos++,I=!0;const x=Qe(i);typeof x=="string"?b=[x]:Array.isArray(x)?b=x.filter(R=>typeof R=="string"):b=[]}const T=`${t}.${v}`;let E={};i.peek()==="("&&(E=ku(i,"relationship",T));const D={},N=e[T];if(N)for(const[x,R]of Object.entries(N.fields))D[x]=R.value;if(Object.assign(D,{...E,typeName:"rel",...l?{custom:!0}:{}}),I){const x=(b??[]).filter(Boolean).map(R=>Cu(t,R));if(d===""&&x.length>0)D.targetPaths=x;else{const R=Bs();Os(R,d,x),b?.length===0&&d===""&&(R.isExplicit=!1);const U=D.targetPaths;if(U&&typeof U=="object"&&!Array.isArray(U)&&"isExplicit"in U&&!R.isExplicit){const $=U;D.targetPaths={isExplicit:$.isExplicit,explicitItems:[...$.explicitItems],prependedItems:[...$.prependedItems,...R.prependedItems],appendedItems:[...$.appendedItems,...R.appendedItems],deletedItems:[...$.deletedItems,...R.deletedItems]}}else D.targetPaths=R}}fi(e,T,D),a.add(v),n.includes(v)||n.push(v);return}if(!h)throw new Error(`Expected prim or property declaration at ${i.pos}, got: '${i.src.slice(i.pos,i.pos+30)}'`);const f=i.word();if(!f)throw new Error(`Expected type name at ${i.pos}, got: '${i.src.slice(i.pos,i.pos+30)}'`);i.ws();let p=!1;i.peek()==="["&&i.at(1)==="]"&&(i.pos+=2,p=!0),i.ws();const y=i.ident();if(!y)throw new Error(`Expected property name after type '${f}' at ${i.pos}`);i.ws();let m="";i.peek()==="."&&(i.pos++,m=i.word());let g;if(i.peek()==="=")if(i.pos++,i.ws(),m==="spline"){const v=i.pos;try{g=Ay(i,p?`${f}[]`:f)}catch{i.pos=v,i.skipBlock(),g=null}}else m!=="timeSamples"&&m!=="connect"&&i.peek()==="{"&&m?(i.skipBlock(),g=null):m==="timeSamples"?g=Dy(i):g=Qe(i);const S=`${t}.${y}`;let _={};i.peek()==="("&&(_=ku(i,"attribute",S));const P=p?`${f}[]`:f,w={..._,typeName:P};if(l&&(w.custom=!0),u&&(w.variability=u),m==="timeSamples"&&g!==void 0)if(g&&typeof g=="object"){const v={};for(const[b,I]of Object.entries(g))v[b]=I===null?new Pe:Aa(I,P);w.timeSamples=v}else w.timeSamples=g;else if(m==="spline")g instanceof Ve&&(w.spline=g);else if(m==="connect"){const v=(Array.isArray(g)?g:[g]).filter(b=>typeof b=="string").map(b=>Cu(t,b));if(d){const b=Bs();Os(b,d,v),w.connectionPaths=b}else w.connectionPaths=Array.isArray(g)?v:v[0]??null}else m===""&&g!==void 0&&(w.default=g===null?new Pe:g==="AnimationBlock"?new St:Aa(g,P));if(e[S]){const v=e[S],b={};for(const I of Object.keys(v.fields))b[I]=v.fields[I].value;Object.assign(b,w),fi(e,S,b)}else fi(e,S,w);n.includes(y)||n.push(y),m===""&&a.add(y)}function ku(i,e,t){const s={};for(i.need("(");!i.eof()&&i.peek()!==")";){if(i.peek()==='"'||i.peek()==="'"){s.comment=i.string(),i.eat(";");continue}let n="",r=i.ident();if(ap.has(r)&&(n=r,r=i.ident()),!r){i.pos++;continue}if(i.eat("=")){const o=n?op(i,t):Ic(i,r,e);if(n){const a=Bs();Os(a,n,o),s[r]=a}else s[r]=o}i.eat(";")}return i.need(")"),s}function Cu(i,e){if(e.startsWith("/"))return e;const t=i.split("/").filter(Boolean);for(const s of e.split("/"))!s||s==="."||(s===".."?t.pop():t.push(s));return`/${t.join("/")}`}function Cy(i,e,t,s){i.need("{");const n=[];for(;!i.eof()&&i.peek()!=="}";){if(i.peek()!=='"'&&i.peek()!=="'"){i.pos++;continue}const r=i.string();n.push(r);const o=`${t}{${s}=${r}}`;let a={};i.peek()==="("&&(a=cp(i,o));const c=[],l=[],u=new Set,h=[],d={};for(i.need("{");!i.eof()&&i.peek()!=="}";)up(i,e,o,c,l,d,h,u),i.eat(";");i.need("}");const f={...a};c.length>0&&(f.primChildren=c),l.length>0&&(f.properties=l),h.length>0&&(f.variantSetChildren=h),d.primOrder&&(f.primOrder=d.primOrder),d.propertyOrder&&(f.propertyOrder=d.propertyOrder),fi(e,o,f)}i.need("}"),fi(e,`${t}{${s}=}`,{variantChildren:n})}function Ny(i){i.need("(");const e={};for(;!i.eof()&&i.peek()!==")"&&(i.ws(),i.peek()!==")");){if(i.peek()==='"'||i.peek()==="'"){e.comment=i.string(),i.eat(";");continue}const t=i.pos,s=i.peekWord();(s==="delete"||s==="append"||s==="prepend")&&i.word();const n=i.ident();if(!n){i.pos=t+1;continue}if(n==="subLayers"&&i.eat("=")){const r=[],o=[];for(i.need("[");!i.eof()&&i.peek()!=="]";){if(i.peek()!=="@"){i.pos++;continue}r.push(i.asset());const a={offset:0,scale:1};if(i.peek()==="("){for(i.need("(");!i.eof()&&i.peek()!==")";){const c=i.word();if(i.eat("=")){const l=i.number();c==="offset"?a.offset=l:c==="scale"&&(a.scale=l)}i.eat(";"),i.eat(",")}i.need(")")}o.push(a),i.eat(",")}i.need("]"),e.subLayers=r,o.some(a=>a.offset!==0||a.scale!==1)&&(e.subLayerOffsets=o)}else if(n==="relocates"&&i.eat("="))e.layerRelocates=rp(i);else if(i.eat("="))try{const r=n==="doc"?"documentation":n;e[r]=Ic(i,r,"layer")}catch{}i.eat(";")}return i.need(")"),e}function My(i,e=""){const t=new Ty(i,e),s={};for(;!t.eof()&&(t.at()===" "||t.at()==="	"||t.at()==="\r"||t.at()===`
`);)t.pos++;if(!t.src.startsWith("#usda",t.pos)&&!t.src.startsWith("#sdf 1.4.32",t.pos))throw new Error("Not a USDA file: missing #usda header");for(;!t.eof()&&t.at()!==`
`&&t.at()!=="\r";)t.pos++;const n={};t.peek()==="("&&Object.assign(n,Ny(t));const r=[];let o;for(;!t.eof()&&(t.ws(),!t.eof());){const c=t.peek();if(c==='"'||c==="'"){t.string(),t.eat(";");continue}if(c===";"){t.pos++;continue}const l=t.peekWord();if(l==="def"||l==="over"||l==="class")lp(t,s,"/",r);else if(l==="reorder"){t.word();const u=t.word();if(u!=="rootPrims")throw new Error(`top-level reorder must target rootPrims at ${t.pos}, got '${u}'`);t.need("=");const h=Qe(t);o=typeof h=="string"?[h]:Array.isArray(h)?h.filter(d=>typeof d=="string"):[]}else if(l==="variantSet")t.word(),t.string(),t.eat("="),t.skipBlock();else{if(l)throw new Error(`Unexpected top-level statement '${l}' at ${t.pos}`);t.pos++}t.eat(";")}const a={...n};return r.length>0&&(a.primChildren=r),o&&(a.primOrder=o),fi(s,"/",a),s}async function Mn(i,e,t){return i?Xi(i,e,t):At.IsEnabled()?Xi(Qn(),e,t):await t(void 0)}function ut(i,e,t){return i?zn(i,e,t):At.IsEnabled()?zn(Qn(),e,t):t(void 0)}class Rt{static typeName="SdfFileFormat";capabilities={reading:!0,writing:!1,editing:!1};getExternalAssetDependencies(e){return[]}static findByExtension(e,t){return ut(t,"usd-ts:SdfFileFormat.findByExtension",()=>Fy(e))}}class Na extends Rt{static typeName="SdfUsdaFileFormat";formatId="usda";extensions=["usda"];capabilities={reading:!0,writing:!0,editing:!0};read(e,t,s,n){ut(n,"usd-ts:SdfUsdaFileFormat.read",r=>{t._setDataFromFileFormat(pp(e,r,t.filePath))})}}class Ac extends Rt{static typeName="SdfUsdcFileFormat";formatId="usdc";extensions=["usdc"];capabilities={reading:!0,writing:!0,editing:!0};read(e,t,s,n){ut(n,"usd-ts:SdfUsdcFileFormat.read",r=>{t._setDataFromFileFormat(Nu(e,r))})}_readFromAsset(e,t,s){ut(s,"usd-ts:SdfUsdcFileFormat.readFromAsset",n=>{t._setDataFromFileFormat(Nu(e,n))})}writeToBytes(e){return yy(e)}}class Ey extends Rt{static typeName="SdfUsdFileFormat";formatId="usd";extensions=["usd"];capabilities={reading:!0,writing:!0,editing:!0};usdc=new Ac;read(e,t,s,n){ut(n,"usd-ts:SdfUsdFileFormat.read",r=>{Ly(e)?this.usdc._readFromAsset(e,t,r):t._setDataFromFileFormat(pp(e,r,t.filePath))})}}class By extends Rt{static typeName="SdfUsdzFileFormat";formatId="usdz";extensions=["usdz"];capabilities={reading:!0,writing:!1,editing:!1}}const hp=new Map,dp=i=>i.replace(/^\./,"").toLowerCase();function Oy(i){for(const e of i.extensions)hp.set(dp(e),i)}for(const i of[new Na,new Ac,new Ey,new By])Oy(i);function Ry(i){let e=i.split(":SDF_FORMAT_ARGS:",1)[0];for(let s=zs(e);s;s=zs(e))e=s.innerPath;const t=e.lastIndexOf(".");return t<0?"":dp(e.slice(t+1))}function Fy(i){return hp.get(Ry(i))}function Gy(i){return Rt.findByExtension(i)}const $y=Gy;function Ly(i){return i[0]===80&&i[1]===88&&i[2]===82&&i[3]===45}function Nu(i,e){return ut(e,"usd-ts:parseCrate",()=>np(Jg(i)))}function pp(i,e,t=""){const s=new TextDecoder().decode(i),n=/^\s*(#(?:usda|sdf)\s+[^\s]+)/.exec(s)?.[1];if(!n)throw new Error("Not a USDA file: missing #usda header");if(!n.startsWith("#usda 1.0")&&!n.startsWith("#sdf 1.4.32"))throw new Error(`Unable to parse layer version from '${n?.split(/\s+/,2)[1]??""}'.`);if(n.startsWith("#usda ")){const r=n.slice(6),o=/^(\d+)\.(\d+)(?:\.(\d+))?$/.exec(r);if(!o||o.slice(1).some(a=>a!==void 0&&Number(a)>255))throw new Error(`Unable to parse layer version from '${r}'.`)}if(/\b(?:add|append|prepend|delete|reorder)\s+[^=\r\n]*\.connect\s*=\s*None\b/.test(s))throw new Error("Setting connection paths to None is only allowed for explicit connection paths");return ut(e,"usd-ts:parseUsda",()=>np(My(s,t)))}const fp=new Map;Sd(()=>fp.clear());function Vy(i,e){fp.set(i,e)}const Ma=":SDF_FORMAT_ARGS:";function Kt(i){const e=i.indexOf(Ma);if(e<0)return{assetPath:i,args:new Map};const t=new Map;for(const s of i.slice(e+Ma.length).split("&")){if(!s)continue;const n=s.indexOf("="),r=decodeURIComponent(n<0?s:s.slice(0,n)),o=decodeURIComponent(n<0?"":s.slice(n+1));t.set(r,o)}return{assetPath:i.slice(0,e),args:t}}function Wr(i,e){if(e.size===0)return i;const t=[...e].sort(([s],[n])=>s.localeCompare(n)).map(([s,n])=>`${encodeURIComponent(s)}=${encodeURIComponent(n)}`).join("&");return`${i}${Ma}${t}`}class Uy{byIdentifier=new Map;byResolvedPath=new Map;inFlight=new Map;finalizer=new FinalizationRegistry(e=>this.erase(e));clear(){this.byIdentifier.clear(),this.byResolvedPath.clear(),this.inFlight.clear()}findIn(e,t,s,n){return ut(s,n,()=>{const r=e.get(t);if(r)for(const o of r){const a=o.layer.deref();if(a)return a;this.erase(o)}})}find(e,t,s,n){return ut(n,"usd-ts:LayerRegistry.find",r=>(s?this.findIn(this.byIdentifier,e,r,"usd-ts:LayerRegistry.findByIdentifier"):void 0)??this.findIn(this.byResolvedPath,t,r,"usd-ts:LayerRegistry.findByResolvedPath"))}async findOrOpen(e,t,s,n,r){return Mn(r,"usd-ts:LayerRegistry.findOrOpen",async o=>{const a=this.find(e,t,s,o);if(a)return a;const c=t||e,l=this.inFlight.get(c);if(l)return l;const u=n(o).then(h=>{const d=this.find(e,t,s,o);return d||(this.insert(h,e,t,o),h)}).finally(()=>{this.inFlight.get(c)===u&&this.inFlight.delete(c)});return this.inFlight.set(c,u),u})}insert(e,t,s,n){ut(n,"usd-ts:LayerRegistry.insert",()=>{const r={layer:new WeakRef(e),identifier:t,resolvedIdentifier:s};this.add(this.byIdentifier,t,r),this.add(this.byResolvedPath,s,r),this.finalizer.register(e,r,r)})}add(e,t,s){let n=e.get(t);n||e.set(t,n=new Set),n.add(s)}erase(e){this.remove(this.byIdentifier,e.identifier,e),this.remove(this.byResolvedPath,e.resolvedIdentifier,e),this.finalizer.unregister(e)}remove(e,t,s){const n=e.get(t);n&&(n.delete(s),n.size===0&&e.delete(t))}}const Ea=new Uy;rm(()=>Ea.clear());class qr{_includeAll=!1;_included=[];_excluded=[];includeAll(){return this._includeAll=!0,this._included=[],this}include(e){return this._included=[...new Set([...this._included,...e])].sort(),this}exclude(e){return this._excluded=[...new Set([...this._excluded,...e])].sort(),this}includedAll(){return this._includeAll}getIncluded(){return[...this._included]}getExcluded(){return[...this._excluded]}isIncluded(e){if(!this._includeAll&&this._included.length===0||e.startsWith("anon:"))return!1;const t=Kt(e).assetPath;return(this._includeAll||this._included.some(n=>t.includes(n)))&&!this._excluded.some(n=>t.includes(n))}clone(){const e=new qr;return this._includeAll?e.includeAll():e.include(this._included),e.exclude(this._excluded)}}const zy=new Set(["primChildren","properties","variantSetChildren","variantChildren"]),jy=new Set(["specifier"]),Mu=new Set(["custom","variability","typeName"]);async function mp(i,e){const t=zs(e);if(!t)return i.extract(e);const s=await i.extract(t.packagePath);if(!Vs.isZip(s))throw new Error(`Layer.findOrOpen: '${t.packagePath}' is not a package`);return mp(Vs.fromBytes(s),t.innerPath)}async function Eu(i,e,t,s){return Mn(s,"usd-ts:sdfResolvePath",n=>(n&&Me(n,"assetPath",e),i.resolve(e,t)))}function Ba(i,e){if(typeof e!="string")return i;const t=e.replace(/\[\]$/,"");return t==="float"||t==="quatf"||/^(?:float[234]|(?:color|point|normal|vector|texCoord)[234]f)$/.test(t)?typeof i=="number"?Math.fround(i):Array.isArray(i)?i.map(n=>Ba(n,e)):i:i}class te{constructor(e,t,s,n=t.isDetached(),r=e){this.filePath=e,this._resolverContext=s,this._isDetached=n,this.resolvedPath=r,this._data=t,this._stateDelegate._setLayer(this)}static DetachedLayerRules=qr;static _detachedLayerRules=new qr;static _anonymousSequence=0;_data;_specHandles=new Map;_stateDelegate=new dg;get identifier(){return this.filePath}get realPath(){return this.resolvedPath}_setDataFromFileFormat(e){this._data=e}setStateDelegate(e){this._stateDelegate._setLayer(null),this._stateDelegate=e,e._setLayer(this)}getStateDelegate(){return this._stateDelegate}isDirty(){return this._stateDelegate.isDirty()}markCurrentStateAsClean(){this._stateDelegate.markCurrentStateAsClean()}static fromBytes(e,t){return te._fromBytes(e,t,void 0)}static _fromBytes(e,t,s,n){return ut(s,"usd-ts:Layer.fromBytes",r=>te._read(e,t,r,n))}static _read(e,t,s,n,r,o=t){return ut(s,"usd-ts:Layer.read",a=>{const c=r??Rt.findByExtension(t,a)??new Na,l=new wn;l.createSpec("/","pseudoRoot"),l.set("/","specifier","def");const u=e.length>=8&&new TextDecoder().decode(e.subarray(0,8))==="PXR-USDC",h=new te(t,l,n,!u||te._detachedLayerRules.isIncluded(t),o);return c.read?.(e,h,Kt(t).args,a),h.markCurrentStateAsClean(),h})}static async findOrOpen(e,t,s){return t??=Ei(),s??=t.getCurrentContext(),t=Yc(t,s),Mn(Xc(s),"usd-ts:Layer.findOrOpen",n=>te._findOrOpen(e,t,s,n))}static find(e){return Ea.find(e,"",!0)}static async _findOrOpen(e,t,s,n){n&&Me(n,"identifier",e);const r=await Mn(n,"usd-ts:Layer.computeInfoToFindOrOpenLayer",async o=>{const{assetPath:a,args:c}=Kt(e),l=zs(a),u=l?.packagePath??a,h=t.createIdentifier(u),d=l?Pn(h,l.innerPath):h,f=Wr(d,c),p=await Eu(t,u,s,o);if(!p.valid)throw new Error(`Could not resolve layer: ${e}`);const y=l?Pn(p.toString(),l.innerPath):p.toString(),m=Wr(y,c),g=Rt.findByExtension(y,o);if(!g)throw new Error(`Could not determine file format for resolved layer: ${y}`);return{assetToResolve:u,fileFormat:g,identifier:f,packagePath:l,registryIdentifier:f,registryResolvedIdentifier:m,resolvedPath:p,trustIdentifier:!t.isContextDependentPath(u)}});return Ea.findOrOpen(r.registryIdentifier,r.registryResolvedIdentifier,r.trustIdentifier,async o=>Mn(o,"usd-ts:Layer.openLayer",async a=>{const{assetToResolve:c,fileFormat:l,identifier:u,packagePath:h,resolvedPath:d}=r,f=await t.openAsset(d,s);if(!f)throw new Error(`Could not open layer: ${d}`);let p=await f.getBuffer();if(h){if(!Vs.isZip(p))throw new Error(`Layer.findOrOpen: '${c}' is not a package`);p=await mp(Vs.fromBytes(p),h.innerPath)}if(Vs.isZip(p)){const y=Vs.fromBytes(p);Vy(u,y);const m=y.defaultLayerName();if(!m)throw new Error(`Layer.findOrOpen: '${e}' contains no usd layer`);const g=await y.extract(m);return te._read(g,Pn(u,m),a,s,void 0,Pn(Kt(r.registryResolvedIdentifier).assetPath,m))}return te._read(p,u,a,s,l,r.registryResolvedIdentifier)}),n)}static open(e,t,s){return te.findOrOpen(e,t,s)}static createInMemory(e,t){const s=typeof t=="string"?new TextEncoder().encode(t):t;if(typeof t=="string"){const n=Rt.findByExtension(e),r=n&&!["usd","usda","usdc"].includes(n.formatId)?n:new Na;return te._read(s,e,void 0,void 0,r)}return te.fromBytes(s,e)}static createAnonymous(e=""){const t=e.replace(/^anon:(?:\/\/)?/,"");return te._createEmpty(`anon:${++te._anonymousSequence}:${t}`)}static _createEmpty(e){const t=new wn;return t.createSpec("/","pseudoRoot"),t.set("/","specifier","def"),new te(e,t)}getDisplayName(){const e=/^anon:\d+:(.*)$/.exec(this.filePath);if(e)return e[1];const{assetPath:t}=Kt(this.filePath),s=t.lastIndexOf("/");return s<0?t:t.slice(s+1)}resolveAsset(e){const t=this._resolverContext?Xc(this._resolverContext):void 0;return ut(t,"usd-ts:Layer.resolveAsset",s=>(s&&Me(s,"assetPath",e),Yi(this.filePath,e)))}getField(e,t){return this._data.get(e,t)}_getFieldValueTypeName(e,t){return this._data.getValueTypeName(e,t)}getPreviousTimeSampleForPath(e,t){return this._data.getPreviousTimeSampleForPath(e,t)}getFieldNames(e){return this._data.list(e)}getSpecPaths(){const e=[];return this._data.visitSpecs({visitSpec:(t,s)=>(e.push(s),!0),done:()=>{}}),e}hasSpec(e){return this._data.hasSpec(e)}getSpecType(e){return this._data.getSpecType(e)}getObjectAtPath(e){const t=typeof e=="string"?e:e.pathString;if(!this._data.hasSpec(t))return;let s=this._specHandles.get(t);return s||(s=new _g(this,t),this._specHandles.set(t,s)),s}streamsData(){return this._data.streamsData()}isDetached(){return this._isDetached}static setDetachedLayerRules(e){te._detachedLayerRules=e.clone()}static getDetachedLayerRules(){return te._detachedLayerRules.clone()}static isIncludedByDetachedLayerRules(e){return te._detachedLayerRules.isIncluded(e)}listAllTimeSamples(){return this._data.listAllTimeSamples()}listTimeSamplesForPath(e){return this._data.listTimeSamplesForPath(e)}getBracketingTimeSamplesForPath(e,t){return this._data.getBracketingTimeSamplesForPath(e,t)}queryTimeSample(e,t){return this._data.queryTimeSample(e,t)}transferContent(e){if(e===this)return;const t=new wn;t.copyFrom(e._data),this._replaceData(t)}definePrimSpec(e,t,s="def"){const n=e.split("/").filter(Boolean);for(let r=0;r<n.length;r++){const o=r===0?"/":"/"+n.slice(0,r).join("/"),a=n[r],c="/"+n.slice(0,r+1).join("/");this._addPrimChild(o,a),r<n.length-1&&(this._data.has(c,"specifier")||this._setField(c,"specifier","def"))}t&&this._setField(e,"typeName",t),this._setField(e,"specifier",s)}setAttrDefault(e,t,s){this._setField(`${e}.${t}`,"default",s),this._addProperty(e,t)}setAttrTimeSample(e,t,s,n){const r=`${e}.${t}`;n=Ba(n,this.getField(r,"typeName"));const o=this._notifyCreateSpec(r,"attribute");this._stateDelegate.setTimeSample(r,s,n);const a=this.getField(r,"timeSamples");this._data.setTimeSample(r,s,n);const c=this.getField(r,"timeSamples");this._notifyDidChange({kind:"timeSample",path:r,fieldName:"timeSamples",oldValue:a,newValue:c}),o&&this._notifyDidChange({kind:"specAdded",path:r,specType:o,inert:!0}),this._addProperty(e,t)}setAttrCustom(e,t,s){this._setField(`${e}.${t}`,"custom",s),this._addProperty(e,t)}declareProperty(e,t,s){this._setField(`${e}.${t}`,"typeName",s),this._addProperty(e,t)}setRelTargets(e,t,s){const n=`${e}.${t}`;this._setField(n,"typeName","rel"),this._setField(n,"targetPaths",s),this._addProperty(e,t)}setAttrConnections(e,t,s){this._setField(`${e}.${t}`,"connectionPaths",s),this._addProperty(e,t)}setField(e,t,s){this._setField(e,t,s)}eraseField(e,t){if(!this._data.has(e,t))return;this._stateDelegate.setField(e,t,void 0);const s=this._data.get(e,t);this._data.erase(e,t),this._notifyDidChange({kind:"field",path:e,fieldName:t,oldValue:s,newValue:void 0})}_deleteSpec(e){if(!this._data.hasSpec(e))return;this._stateDelegate.deleteSpec(e);const t=e.lastIndexOf("."),s=e.lastIndexOf("/");if(e.indexOf("{")===-1){const[l,u,h]=t>s?[e.slice(0,t),"properties",e.slice(t+1)]:[e.slice(0,s)||"/","primChildren",e.slice(s+1)],d=this._data.get(l,u);Array.isArray(d)&&this._data.set(l,u,d.filter(f=>f!==h))}const n=e==="/"?"/":`${e}/`,r=`${e}.`,o=`${e}{`,c=[e,...this.getSpecPaths().filter(l=>l.startsWith(n)||l.startsWith(r)||l.startsWith(o))].map(l=>({path:l,specType:this._specTypeForPath(l),inert:this._isInertSpec(l)}));for(const{path:l}of c)this._data.eraseSpec(l);c.sort((l,u)=>u.path.length-l.path.length||l.path.localeCompare(u.path));for(const{path:l,specType:u,inert:h}of c)this._notifyDidChange({kind:"specRemoved",path:l,specType:u,inert:h})}_didChangeListeners=new Set;_registerDidChangeListener(e){return this._didChangeListeners.add(e),()=>this._didChangeListeners.delete(e)}_notifyDidChange(e){for(const t of this._didChangeListeners)t(e)}_notifyCreateSpec(e,t){if(this._data.hasSpec(e))return;const s=t??this._specTypeForPath(e);return this._stateDelegate.createSpec(e,s),this._data.createSpec(e,s),s}_specTypeForPath(e){const t=e.lastIndexOf("/");return e==="/"?"pseudoRoot":/\{[^}=]+=\}$/.test(e)?"variantSet":/\{[^}=]+=[^}]+\}$/.test(e)?"variant":e.indexOf(".",t)>=0?"attribute":"prim"}_isInertSpec(e){if(!this._data.hasSpec(e))return!0;const t=this._data.list(e);if(t.length===0)return!0;if(this._data.get(e,"custom")===!0)return!1;const s=this._data.getSpecType(e),n=s==="attribute"||s==="relationship";if(!n){const o=this._data.get(e,"specifier");if(o==="def"||o==="class")return!1;const a=this._data.get(e,"typeName");if(a!=null&&a!=="")return!1}const r=n?Mu:jy;for(const o of t)if(!(!n&&zy.has(o))&&!r.has(o))return!1;return!0}_replaceData(e){const t=c=>{const l=[];return c.visitSpecs({visitSpec:(u,h)=>(l.push(h),!0),done:()=>{}}),l},s=new Set(t(this._data)),n=new Set(t(e)),r=[],o=[],a=[];for(const c of s){const l=this._data.getSpecType(c);(!n.has(c)||e.getSpecType(c)!==l)&&(r.push({path:c,specType:l,inert:this._isInertSpec(c)}),this._stateDelegate.deleteSpec(c))}for(const c of n){const l=e.getSpecType(c),u=s.has(c)&&this._data.getSpecType(c)!==l;(!s.has(c)||u)&&(o.push({path:c,specType:l}),this._stateDelegate.createSpec(c,l));const h=u||!s.has(c)?[]:this._data.list(c),d=new Set([...h,...e.list(c)]);for(const f of d){const p=h.includes(f)?this._data.get(c,f):void 0,y=e.get(c,f);Nn(p,y)||(a.push({path:c,fieldName:f,oldValue:p,newValue:y}),this._stateDelegate.setField(c,f,y))}}for(const c of s)if(!n.has(c))for(const l of this._data.list(c)){const u=this._data.get(c,l);a.push({path:c,fieldName:l,oldValue:u,newValue:void 0}),this._stateDelegate.setField(c,l,void 0)}this._data=e;for(const c of r)this._notifyDidChange({kind:"specRemoved",...c});for(const c of o)this._notifyDidChange({kind:"specAdded",...c,inert:this._isInertSpec(c.path)});for(const c of a)this._notifyDidChange({kind:"field",...c})}_writeField(e,t,s,n="field"){const r=this._data.get(e,t);this._data.set(e,t,s),this._notifyDidChange({kind:n,path:e,fieldName:t,oldValue:r,newValue:s})}_setField(e,t,s,n){t==="default"&&(s=Ba(s,this._data.get(e,"typeName")));const r=n??(t==="targetPaths"||t==="typeName"&&s==="rel"?"relationship":void 0),o=this._notifyCreateSpec(e,r);if(this._stateDelegate.setField(e,t,s),this._writeField(e,t,s),o){const a=o==="attribute"||o==="relationship"?Mu.has(t):this._isInertSpec(e);this._notifyDidChange({kind:"specAdded",path:e,specType:o,inert:a})}}_addPrimChild(e,t){const s=this._notifyCreateSpec(e),n=this._data.get(e,"primChildren")??[];if(!n.includes(t)){this._stateDelegate.pushChild(e,"primChildren",t);const r=[...n,t];this._data.set(e,"primChildren",r),this._notifyDidChange({kind:"field",path:e,fieldName:"primChildren",oldValue:n,newValue:r})}s&&this._notifyDidChange({kind:"specAdded",path:e,specType:s,inert:this._isInertSpec(e)})}_addProperty(e,t){const s=this._notifyCreateSpec(e),n=this._data.get(e,"properties")??[];if(!n.includes(t)){this._stateDelegate.pushChild(e,"properties",t);const r=[...n,t];this._data.set(e,"properties",r),this._notifyDidChange({kind:"field",path:e,fieldName:"properties",oldValue:n,newValue:r})}s&&this._notifyDidChange({kind:"specAdded",path:e,specType:s,inert:this._isInertSpec(e)})}toUsda(){return Mm(this)}toUsdc(){return new Ac().writeToBytes(this)}async export(e,t){const s=Kt(e).assetPath.split(".").pop()?.toLowerCase(),n=t,r=typeof n?.get=="function"?n.get("format"):t?.format,o=s==="usda"||s==="usd"&&r==="usda"?new TextEncoder().encode(this.toUsda()):s==="usd"||s==="usdc"?this.toUsdc():void 0;if(!o)return!1;const a=Ei(),c=a.createIdentifierForNewAsset(e),l=await a.resolveForNewAsset(c),u=await a.openAssetForWrite(l,Ln.Replace);if(!u)return!1;try{let h=0;for(;h<o.byteLength;){const d=await u.write(o.subarray(h),h);if(d<=0)return!1;h+=d}return!0}finally{await u.close()}}async save(){if(this.filePath.startsWith("anon:")||zs(this.filePath))return!1;const e=await this.export(Kt(this.filePath).assetPath);return e&&this.markCurrentStateAsClean(),e}async reload(){if(this.filePath.startsWith("anon:")||zs(this.filePath))return!1;const e=Yc(Ei(),this._resolverContext??Ei().getCurrentContext()),t=this._resolverContext??e.getCurrentContext(),s=await Eu(e,this.filePath,t,void 0);if(!s.valid)return!1;const n=await e.openAsset(s,t);if(!n)return!1;const r=await n.getBuffer(),o=Rt.findByExtension(s.toString());if(!o?.read)return!1;const a=new wn;a.createSpec("/","pseudoRoot"),a.set("/","specifier","def");const c=r.length>=8&&new TextDecoder().decode(r.subarray(0,8))==="PXR-USDC",l=new te(this.filePath,a,t,!c||te._detachedLayerRules.isIncluded(this.filePath),s.toString());return o.read(r,l,Kt(this.filePath).args),this._replaceData(l._data),this._isDetached=l._isDetached,this.markCurrentStateAsClean(),!0}getFileFormat(){return Rt.findByExtension(this.filePath)}getExternalAssetDependencies(){return Rt.findByExtension(this.filePath)?.getExternalAssetDependencies(this)??[]}}function Oa(i,e,t){const s=e??Ei(),n=t??(e?am(e):s.getCurrentContext());return te.findOrOpen(i,s,n)}const Wy=1,qy=new Set(["half","float","double","timecode","matrix2d","matrix3d","matrix4d","double2","float2","half2","double3","float3","half3","double4","float4","half4","quatd","quatf","quath","point3h","point3f","point3d","vector3h","vector3f","vector3d","normal3h","normal3f","normal3d","color3h","color3f","color3d","color4h","color4f","color4d","texCoord2h","texCoord2f","texCoord2d","texCoord3h","texCoord3f","texCoord3d"]);function Hy(i){if(!i)return!1;const e=i.endsWith("[]")?i.slice(0,-2):i;return qy.has(e)}function Ky(i){return i==="held"||i===0}function Bu(i,e,t,s={offset:0,scale:1}){if(!i)return;const n=bc(s);if(!n)return;const r=lt(n,e),o=t?i.EvalPreValue(r):i.Eval(r);return o!==void 0&&i.IsTimeValued()?lt(s,o):o}function Zy(i,e={offset:0,scale:1}){if(!i)return;const t=new Ve(i.GetValueType());t.SetTimeValued(i.IsTimeValued()),t.SetCurveType(i.GetCurveType());const{offset:s,scale:n}=e,r=n>0,o=c=>new ys(c.mode,r&&c.mode===Q.Sloped?c.slope/n:c.slope);t.SetPreExtrapolation(o(i.GetPreExtrapolation())),t.SetPostExtrapolation(o(i.GetPostExtrapolation()));const a=i.GetInnerLoopParams();return t.SetInnerLoopParams(r&&a.protoEnd>a.protoStart?new $s(a.protoStart*n+s,a.protoEnd*n+s,a.numPreLoops,a.numPostLoops,a.valueOffset):a),t.SetKnots(i.GetKnots().map(c=>{const l=new _i(c.GetValueType());l.SetCurveType(c.GetCurveType()),l.SetNextInterpolation(c.GetNextInterpolation()),l.SetTime(r?c.GetTime()*n+s:c.GetTime());const u=h=>r&&i.IsTimeValued()?h*n+s:h;return l.SetValue(u(c.GetValue())),c.IsDualValued()&&l.SetPreValue(u(c.GetPreValue())),l.SetPreTanWidth(r?c.GetPreTanWidth()*n:c.GetPreTanWidth()),l.SetPostTanWidth(r?c.GetPostTanWidth()*n:c.GetPostTanWidth()),l.SetPreTanSlope(r?c.GetPreTanSlope()/n:c.GetPreTanSlope()),l.SetPostTanSlope(r?c.GetPostTanSlope()/n:c.GetPostTanSlope()),l.SetPreTanAlgorithm(c.GetPreTanAlgorithm()),l.SetPostTanAlgorithm(c.GetPostTanAlgorithm()),l.SetCustomData(c.GetCustomData()),l})),t}function gp(i,e,t){const s=new Array(i.length);for(let n=0;n<i.length;n++){const r=i[n],o=e[n];if(typeof r=="number"&&typeof o=="number")s[n]=r+(o-r)*t;else if(Array.isArray(r)&&Array.isArray(o)&&r.length===o.length){const a=gp(r,o,t);if(a===null)return null;s[n]=a}else return null}return s}function kr(i){const e=new DataView(new ArrayBuffer(4));e.setFloat32(0,Math.fround(i));const t=e.getUint32(0),s=t>>>16&32768,n=t>>>23&255,r=t&8388607;let o;if(n===255)o=s|31744|(r?512:0);else{const u=n-127+15;if(u>=31)o=s|31744;else if(u<=0)if(u<-10)o=s;else{const h=r|8388608,d=14-u;let f=h>>>d;const p=h&(1<<d)-1,y=1<<d-1;(p>y||p===y&&f&1)&&f++,o=s|f}else{let h=u<<10|r>>>13;const d=r&8191;(d>4096||d===4096&&h&1)&&h++,o=s|h}}const a=o>>>10&31,c=o&1023,l=o&32768?-1:1;return a===0?l*2**-14*(c/1024):a===31?c?NaN:l*(1/0):l*2**(a-15)*(1+c/1024)}function Ra(i,e){if(!e)return i;const t=e.replace(/\[\]$/,""),s=t==="half"||t==="quath"||/^(?:color|point|normal|vector|texCoord)[234]h$/.test(t)?kr:t==="float"||t==="quatf"||/^(?:color|point|normal|vector|texCoord)[234]f$/.test(t)?Math.fround:void 0;return s?typeof i=="number"?s(i):Array.isArray(i)?i.map(n=>Ra(n,e)):i:i}function Ou(i,e,t,s){if(!Array.isArray(i)||!Array.isArray(e)||i.length!==4||e.length!==4||!i.every(h=>typeof h=="number")||!e.every(h=>typeof h=="number"))return null;const n=i,r=e;let o=n.reduce((h,d,f)=>h+d*r[f],0),a=!1;o<0&&(o=-o,a=!0);const c=s==="quath"?kr:s==="quatf"?Math.fround:h=>h;let l,u;if(1-o>1e-5){const h=s==="quath"?kr(Math.acos(o)):Math.acos(o),d=s==="quath"?kr(Math.sin(h)):Math.sin(h);l=Math.sin((1-t)*h)/d,u=Math.sin(t*h)/d}else l=1-t,u=t;return a&&(u=-u),n.map((h,d)=>c(c(h*l)+c(r[d]*u)))}function Yy(i,e,t,s){const n=s.endsWith("[]")?s.slice(0,-2):s;if(!n.startsWith("quat"))return null;if(!s.endsWith("[]"))return Ou(i,e,t,n);if(!Array.isArray(i)||!Array.isArray(e)||i.length!==e.length)return null;const r=[];for(let o=0;o<i.length;o++){const a=Ou(i[o],e[o],t,n);if(a===null)return null;r.push(a)}return r}function Ji(i,e,t,s=!1,n){const r=[...i].sort(([p],[y])=>p-y);if(e<=r[0][0])return r[0][1];if(e>r[r.length-1][0])return r[r.length-1][1];const o=r.find(([p])=>p===e);if(o&&!s)return o[1];let a=0,c=r.length-1;for(;a<c-1;){const p=a+c>>1;r[p][0]<e||r[p][0]===e&&!s?a=p:c=p}const[l,u]=r[a],[h,d]=r[c];if(u instanceof Pe)return;if(d instanceof Pe||Ky(t)||n!==void 0&&!Hy(n))return u;const f=(e-l)/(h-l);if(n?.startsWith("quat")){const p=Yy(u,d,f,n);return p!==null?p:u}if(typeof u=="number"&&typeof d=="number")return Ra(u+(d-u)*f,n);if(Array.isArray(u)&&Array.isArray(d)&&u.length===d.length){const p=gp(u,d,f);if(p!==null)return Ra(p,n)}return u}const Xy=new WeakMap;function Qy(i,e){Xy.get(i)?.(e)}class Jy{#s;#t;constructor(e,t){this.#s=e,this.#t=t}GetName(){return this.#s.Name}Load(){return!0}IsLoaded(){return!0}IsPythonModule(){return this.#s.Type==="python"}GetPath(){return this.#s.LibraryPath??this.#s.Root??""}GetResourcePath(){return this.#s.ResourcePath??""}GetDependencies(){return this.#s.Info?.PluginDependencies??{}}MakeResourcePath(e){if(e.startsWith("/"))return e;const t=this.GetResourcePath().replace(/\/+$/,"");return t?`${t}/${e}`:e}FindPluginResource(e){return this.HasResource(e)?this.MakeResourcePath(e):""}IsResource(){return this.#s.Type==="resource"}GetMetadata(){return this.#s.Info??{}}GetMetadataForType(e){return this.#r()[e.GetTypeName()]??{}}DeclaresType(e,t=!1){if(e.IsUnknown())return!1;for(const s of Object.keys(this.#r())){const n=L.FindByName(s);if(t?n.IsA(e):n===e)return!0}return!1}HasResource(e){return Object.prototype.hasOwnProperty.call(this.#t,e)}async GetResource(e){const t=this.#t[e];if(t===void 0)throw new Error(`@pxr/plug: plugin '${this.GetName()}' has no resource '${e}'`);return typeof t=="string"?t:t()}_GetResourceSync(e){const t=this.#t[e];return typeof t=="string"?t:void 0}_declareTypes(){const e=[];for(const[t,s]of Object.entries(this.#r())){if(typeof s!="object"||s===null)continue;const n=s;e.push(this.#i(t,n))}return e}#i(e,t){const s=Array.isArray(t.bases)?t.bases.filter(a=>typeof a=="string").map(a=>L.Declare(a)):[],n=L.Declare(e);return n.GetBaseTypes().some(a=>!a.IsRoot())||L.Declare(e,s),this.#n(n,t),n}#n(e,t){const s=t.alias;if(!(typeof s!="object"||s===null))for(const[n,r]of Object.entries(s)){if(typeof r!="string")continue;const o=L.Declare(n);e.AddAlias(o,r)}}#r(){return this.#s.Info?.Types??{}}}class ze{static#s;#t=new Map;#i=new Map;#n=new Set;constructor(){}static GetInstance(){return ze.#s??=new ze}RegisterPlugins(e,t){const s=[];for(const n of e.Plugins??[]){if(typeof n?.Name!="string"||n.Name===""||this.#t.has(n.Name))continue;const r=new Jy(n,t?.[n.Name]??{});this.#t.set(n.Name,r),s.push(r)}for(const n of s)for(const r of n._declareTypes())this.#i.has(r)||this.#i.set(r,n);if(s.length>0)for(const n of[...this.#n])n([...s]);return s}GetPluginForType(e){return e.IsUnknown()?null:this.#i.get(e)??null}GetPluginWithName(e){return this.#t.get(e)??null}GetAllPlugins(){return[...this.#t.values()]}static GetAllDerivedTypes(e){return e.GetAllDerivedTypes()}GetMetadataForType(e){return this.GetPluginForType(e)?.GetMetadataForType(e)??{}}AddDidRegisterPluginsListener(e){return this.#n.add(e),()=>{this.#n.delete(e)}}}const e_={Plugins:[{Info:{Profiles:{Capabilities:{usd:{docstring:"Root capability for the USD taxonomy.",name:"USD",style:"core",subgraph:"Foundation"},"usd.core":{docstring:"Capabilities introduced by the pxr/usd/usd library.",name:"usd library",predecessors:["usd"],style:"core",subgraph:"Foundation"},"usd.core.colorspace":{docstring:"Authoring and resolution of color space opinions on prims and attributes via UsdColorSpaceAPI / UsdColorSpaceDefinitionAPI.",name:"Color Space",predecessors:["usd.core"],style:"core",subgraph:"Foundation"},"usd.core.fileformat":{docstring:"File formats allow more file types to be referenced.",name:"File Format",predecessors:["usd.core"],style:"core",subgraph:"Foundation"}}},SdfMetadata:{apiSchemas:{appliesTo:"prims",type:"tokenlistop"},fallbackPrimTypes:{appliesTo:["layers"],type:"dictionary"}},Types:{UsdAPISchemaBase:{alias:{UsdSchemaBase:"APISchemaBase"},autoGenerated:!0,bases:["UsdSchemaBase"],schemaIdentifier:"APISchemaBase",schemaKind:"abstractBase"},UsdClipsAPI:{alias:{UsdSchemaBase:"ClipsAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ClipsAPI",schemaKind:"nonAppliedAPI"},UsdCollectionAPI:{alias:{UsdSchemaBase:"CollectionAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"CollectionAPI",schemaKind:"multipleApplyAPI"},UsdColorSpaceAPI:{alias:{UsdSchemaBase:"ColorSpaceAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],impliesCapabilities:["usd.core.colorspace"],schemaIdentifier:"ColorSpaceAPI",schemaKind:"singleApplyAPI"},UsdColorSpaceDefinitionAPI:{alias:{UsdSchemaBase:"ColorSpaceDefinitionAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],impliesCapabilities:["usd.core.colorspace"],schemaIdentifier:"ColorSpaceDefinitionAPI",schemaKind:"multipleApplyAPI"},UsdModelAPI:{alias:{UsdSchemaBase:"ModelAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ModelAPI",schemaKind:"nonAppliedAPI"},UsdSchemaBase:{alias:{UsdSchemaBase:"SchemaBase"},schemaKind:"abstractBase"},UsdTyped:{alias:{UsdSchemaBase:"Typed"},autoGenerated:!0,bases:["UsdSchemaBase"],schemaIdentifier:"Typed",schemaKind:"abstractBase"}}},LibraryPath:"@PLUG_INFO_LIBRARY_PATH@",Name:"usd",ResourcePath:"@PLUG_INFO_RESOURCE_PATH@",Root:"@PLUG_INFO_ROOT@",Type:"library"}]},t_=`#usda 1.0
(
    "WARNING: THIS FILE IS GENERATED BY usdGenSchema.  DO NOT EDIT."
)

class "Typed" (
    customData = {
        string userDocBrief = '''The base class for all typed schemas (those that can impart a
    typeName to a Prim), and therefore the base class for all
    concrete, instantiable "IsA" schemas.'''
    }
)
{
}

class "APISchemaBase" (
    customData = {
        string userDocBrief = "The base class for all API schemas."
    }
)
{
}

class "ModelAPI" (
    customData = {
        string userDocBrief = """UsdModelAPI is an API schema that provides an interface to a prim's
    model qualities, if it does, in fact, represent the root prim of a model."""
    }
)
{
}

class "ColorSpaceAPI" (
    customData = {
        string userDocBrief = """UsdColorSpaceAPI is an API schema that introduces a \`colorSpace\`
    property for authoring scene referred color space opinions."""
    }
)
{
    uniform token colorSpace:name (
        customData = {
            string userDocBrief = """The color space that applies to attributes with
        unauthored color spaces on this prim and its descendents."""
        }
    )
}

class "ColorSpaceDefinitionAPI" (
    customData = {
        string userDocBrief = """UsdColorSpaceDefinitionAPI is an API schema for defining a custom
    color space."""
    }
)
{
    float2 colorSpaceDefinition:__INSTANCE_NAME__:blueChroma = (0, 0) (
        customData = {
            string userDocBrief = "Blue chromaticity coordinates."
        }
    )
    float colorSpaceDefinition:__INSTANCE_NAME__:gamma = 1 (
        customData = {
            string userDocBrief = "Gamma value of the log section."
        }
    )
    float2 colorSpaceDefinition:__INSTANCE_NAME__:greenChroma = (0, 1) (
        customData = {
            string userDocBrief = "Green chromaticity coordinates."
        }
    )
    float colorSpaceDefinition:__INSTANCE_NAME__:linearBias = 0 (
        customData = {
            string userDocBrief = "Linear bias of the log section."
        }
    )
    uniform token colorSpaceDefinition:__INSTANCE_NAME__:name = "custom" (
        customData = {
            string userDocBrief = "The name of the color space defined on this prim."
        }
    )
    float2 colorSpaceDefinition:__INSTANCE_NAME__:redChroma = (1, 0) (
        customData = {
            string userDocBrief = "Red chromaticity coordinates."
        }
    )
    float2 colorSpaceDefinition:__INSTANCE_NAME__:whitePoint = (0.33333334, 0.33333334) (
        customData = {
            string userDocBrief = "Whitepoint chromaticity coordinates."
        }
    )
}

class "CollectionAPI" (
    customData = {
        string userDocBrief = """A general purpose API schema used to describe a collection of prims
    and properties within a scene."""
    }
)
{
    uniform opaque collection:__INSTANCE_NAME__ (
        customData = {
            string userDocBrief = """This property represents the collection for the purpose of 
        allowing another collection to include it."""
        }
    )
    rel collection:__INSTANCE_NAME__:excludes (
        customData = {
            string userDocBrief = """Specifies a list of targets that are excluded below
        the included paths in this collection."""
        }
    )
    uniform token collection:__INSTANCE_NAME__:expansionRule = "expandPrims" (
        allowedTokens = ["explicitOnly", "expandPrims", "expandPrimsAndProperties"]
        customData = {
            string userDocBrief = """Specifies how the paths that are included in
        the collection must be expanded to determine its members."""
        }
    )
    uniform bool collection:__INSTANCE_NAME__:includeRoot (
        customData = {
            string userDocBrief = """Boolean attribute indicating whether the pseudo-root
        path \`</>\` should be counted as one of the included target
        paths."""
        }
    )
    rel collection:__INSTANCE_NAME__:includes (
        customData = {
            string userDocBrief = "Specifies a list of targets that are included in the collection."
        }
    )
    uniform pathExpression collection:__INSTANCE_NAME__:membershipExpression (
        customData = {
            string userDocBrief = """Specifies a path expression that determines membership in this
        collection."""
        }
    )
    uniform token collection:__INSTANCE_NAME__:mode = "automatic" (
        allowedTokens = ["automatic", "relationship", "expression"]
        customData = {
            string userDocBrief = """Specifies which mode the collection uses to determine
        membership: \`automatic\`, \`relationship\`, or \`expression\`."""
        }
    )
}

class "ClipsAPI" (
    customData = {
        string userDocBrief = """UsdClipsAPI is an API schema that provides an interface to
    a prim's clip metadata."""
    }
)
{
}

`;ze.GetInstance().RegisterPlugins(e_,{usd:{"generatedSchema.usda":t_}});function Fa(i,e){return`${i}\0${e}`}const Ga=new Set(["form","fields"]);function gt(i){return i.path.lastIndexOf(".")<=i.path.lastIndexOf("/")?"prim":i.layer.getField(i.path,"typeName")==="rel"?"relationship":"attribute"}function Zt(i,e){const t=gt(i);if(t==="relationship"&&e==="typeName")return;const s=i.layer.getField(i.path,e);if(s!==void 0)return s;if(t!=="prim"){if(e==="custom")return!1;if(e==="variability")return t==="relationship"?"uniform":"varying"}}function s_(i,e){return Zt(i,e)!==void 0}function bn(i){const e=gt(i),t=[];for(const s of i.layer.getFieldNames(i.path))Ga.has(s)||M.isDisallowedField(s)||e==="relationship"&&s==="typeName"||t.push(s);return e!=="prim"&&(t.includes("custom")||t.push("custom"),t.includes("variability")||t.push("variability")),t}function Lt(i){return typeof i=="object"&&i!==null&&!Array.isArray(i)&&!("isExplicit"in i)}function fo(i,e){const t={...e};for(const[s,n]of Object.entries(i)){const r=t[s];t[s]=Lt(n)&&Lt(r)?fo(n,r):n}return t}function $a(i,e){let t=i;for(const s of e.split(":")){if(!Lt(t))return;t=t[s]}return t}class Ri{_name;_lap;constructor(e="",t=null){this._name=e,this._lap=t}_requireLap(){if(!this._lap)throw new Error(`UsdPrimDefinition.Property('${this._name}'): accessed data on an invalid property definition`);return this._lap}isValid(){return this._lap!==null}getName(){return this._name}isAttribute(){return this._lap!==null&&gt(this._lap)==="attribute"}isRelationship(){return this._lap!==null&&gt(this._lap)==="relationship"}getSpecType(){return gt(this._requireLap())}listMetadataFields(){return bn(this._requireLap())}getMetadata(e){const t=this._requireLap();if(!M.isDisallowedField(e))return Zt(t,e)}getMetadataByDictKey(e,t){const s=this._requireLap();if(!M.isDisallowedField(e))return $a(s.layer.getField(s.path,e),t)}getVariability(){return Zt(this._requireLap(),"variability")}getDocumentation(){const e=this._requireLap(),t=$a(e.layer.getField(e.path,"customData"),"userDocBrief");if(typeof t=="string")return t;const s=e.layer.getField(e.path,"documentation");return typeof s=="string"?s:""}}class Ru extends Ri{getTypeName(){return Qm(this.getTypeNameToken())}getTypeNameToken(){const e=this._requireLap(),t=e.layer.getField(e.path,"typeName");return typeof t=="string"?t:""}getFallbackValue(){const e=this._requireLap();return e.layer.getField(e.path,"default")}}class Fu extends Ri{}class Us{_primLap=null;_propMap=new Map;_appliedAPISchemas=[];_properties=[];_locallyDefinedPropertyNames=[];_composedPropertyLayer=null;getPropertyNames(){return[...this._properties]}getLocallyDefinedPropertyNames(){return[...this._locallyDefinedPropertyNames]}getAppliedAPISchemas(){return[...this._appliedAPISchemas]}getSpecType(e){const t=this.getPropertyDefinition(e);return t.isValid()?t.getSpecType():""}hasProperty(e){return e!==""&&this._propMap.has(e)}getAttributeFallbackValue(e){const t=this._propMap.get(e);if(!(!t||e===""))return t.layer.getField(t.path,"default")}getMetadataField(e,t){if(M.isDisallowedField(e))return;if(t===void 0){const n=this._propMap.get("");return n?Zt(n,e):void 0}const s=this.getPropertyDefinition(t);return s.isValid()?s.getMetadata(e):void 0}listMetadataFields(e){if(e===void 0){const s=this._propMap.get("");return s?bn(s):[]}const t=this.getPropertyDefinition(e);return t.isValid()?t.listMetadataFields():[]}getDocumentation(){return this._primLap?new Ri("",this._primLap).getDocumentation():""}getPropertyDocumentation(e){const t=this.getPropertyDefinition(e);return t.isValid()?t.getDocumentation():""}static Property=Ri;static Attribute=Ru;static Relationship=Fu;getPropertyDefinition(e){return e===""?new Ri(""):new Ri(e,this._propMap.get(e)??null)}getAttributeDefinition(e){const t=e===""?null:this._propMap.get(e)??null;return new Ru(e,t&&gt(t)==="attribute"?t:null)}getRelationshipDefinition(e){const t=e===""?null:this._propMap.get(e)??null;return new Fu(e,t&&gt(t)==="relationship"?t:null)}getMetadataByDictKey(e,t,s){if(M.isDisallowedField(e))return;const n=s===void 0?this._propMap.get(""):s!==""?this._propMap.get(s):void 0;if(n)return $a(n.layer.getField(n.path,e),t)}flattenTo(e,t,s){return e instanceof te?this._flattenToLayer(e,t??"",s??"over"):this._flattenToPrim(e,t)}_flattenToLayer(e,t,s){if(!t.startsWith("/")||t==="/")return!1;if(new Set(e.getSpecPaths()).has(t)){const o=e.getField(t,"properties")??[];for(const a of o)e._deleteSpec(`${t}.${a}`);for(const a of[...e.getFieldNames(t)])Ga.has(a)||M.isDisallowedField(a)||e.eraseField(t,a)}else{const o=t.split("/").filter(Boolean);for(let a=0;a<o.length;a++){const c="/"+o.slice(0,a+1).join("/"),l=a===0?"/":"/"+o.slice(0,a).join("/"),u=a===o.length-1;e.getSpecPaths().includes(c)||e.setField(c,"specifier",u?s:"over");const h=e.getField(l,"primChildren")??[];h.includes(o[a])||e.setField(l,"primChildren",[...h,o[a]])}}for(const o of this._properties){const a=this._propMap.get(o);if(!a)continue;const c=`${t}.${o}`,l=gt(a)==="relationship";for(const u of a.layer.getFieldNames(a.path))Ga.has(u)||l&&u==="typeName"||e.setField(c,u,a.layer.getField(a.path,u));e.getField(c,"custom")===void 0&&e.setField(c,"custom",!1),e.getField(c,"variability")===void 0&&e.setField(c,"variability",l?"uniform":"varying")}this._properties.length>0&&e.setField(t,"properties",[...this._properties]);for(const o of this.listMetadataFields()){const a=this.getMetadataField(o);a!==void 0&&e.setField(t,o,a)}e.setField(t,"apiSchemas",{isExplicit:!0,explicitItems:[...this._appliedAPISchemas],deletedItems:[],prependedItems:[],appendedItems:[],orderedItems:[]});const r=this.getDocumentation();return r!==""?e.setField(t,"documentation",r):e.eraseField(t,"documentation"),!0}_flattenToPrim(e,t){let s,n;if(t!==void 0)s=e.path,n=t;else{const a=e.path,c=a.lastIndexOf("/");s=c<=0?"/":a.slice(0,c),n=a.slice(c+1)}const r=s==="/"?`/${n}`:`${s}/${n}`,o=e.getStage();return this._flattenToLayer(o.getEditTarget().getLayer(),r,"over")?o._primHandle(r):null}_copy(){const e=new Us;return e._primLap=this._primLap,e._propMap=new Map(this._propMap),e._appliedAPISchemas=[...this._appliedAPISchemas],e._properties=[...this._properties],e._locallyDefinedPropertyNames=[...this._locallyDefinedPropertyNames],e._composedPropertyLayer=this._composedPropertyLayer,e}_replaceWith(e){this._primLap=e._primLap,this._propMap=new Map(e._propMap),this._appliedAPISchemas=[...e._appliedAPISchemas],this._properties=[...e._properties],this._locallyDefinedPropertyNames=[...e._locallyDefinedPropertyNames],this._composedPropertyLayer=e._composedPropertyLayer}_initializeForTypedSchema(e,t,s){this._primLap={layer:e,path:t},this._mapSchematicsPropertyPaths(s)&&this._propMap.set("",this._primLap),this._applyPropertyOrder()}_initializeForAPISchema(e,t,s,n){this._appliedAPISchemas=[e],this._primLap={layer:t,path:s};const[,r]=M.getTypeNameAndInstance(e);this._mapSchematicsPropertyPaths(n)&&r===""&&this._propMap.set("",this._primLap),this._applyPropertyOrder()}_mapSchematicsPropertyPaths(e){const t=this._primLap,s=t.layer.getField(t.path,"properties");if(!s)return t.layer.getSpecPaths().includes(t.path);for(const n of s)e.includes(n)||this._propMap.has(n)||(this._propMap.set(n,{layer:t.layer,path:`${t.path}.${n}`}),this._properties.push(n));return!0}_applyPropertyOrder(){const e=this.getMetadataField("propertyOrder");if(!Array.isArray(e)||e.length===0)return;const t=new Set(this._properties),s=[],n=new Set;for(const r of e)t.has(r)&&!n.has(r)&&(s.push(r),n.add(r));s.length!==0&&(this._properties=[...s,...this._properties.filter(r=>!n.has(r))])}_composePropertiesFromPrimDef(e){for(const[t,s]of e._propMap)this._addOrComposeProperty(t,s);this._sortAndOrderProperties()}_composePropertiesFromPrimDefInstance(e,t){for(const[s,n]of e._propMap){const r=M.makeMultipleApplyNameInstance(s,t);this._addOrComposeProperty(r,n)}this._sortAndOrderProperties()}_sortAndOrderProperties(){this._properties.sort((e,t)=>is(e,t)?-1:is(t,e)?1:0),this._applyPropertyOrder()}_addOrComposeProperty(e,t){if(e===""&&!this._propMap.has("")){const r=this._createComposedPrimOrPropertyIfNeeded("",null,t);r&&this._propMap.set("",r);return}const s=this._propMap.get(e);if(s===void 0){this._propMap.set(e,t),e!==""&&this._properties.push(e);return}const n=this._createComposedPrimOrPropertyIfNeeded(e,s,t);n&&this._propMap.set(e,n)}_findOrCreateSpecForComposition(e,t){const s="/ComposedProperties",n=e===""?s:`${s}.${e}`;if(this._composedPropertyLayer){if(e!==""&&this._composedPropertyLayer.getSpecPaths().includes(n))return{layer:this._composedPropertyLayer,path:n}}else this._composedPropertyLayer=te.createAnonymous("anon:schema-composed-properties");const r=this._composedPropertyLayer;if(r.getSpecPaths().includes(s)||r.setField(s,"specifier","def"),!t)return{layer:r,path:e===""?s:n};const o=gt(t),a=o==="prim"?s:n;o==="attribute"?r.setField(a,"typeName",t.layer.getField(t.path,"typeName")):o==="relationship"&&r.setField(a,"typeName","rel");for(const c of bn(t)){const l=Zt(t,c);l!==void 0&&r.setField(a,c,l)}return{layer:r,path:a}}_createComposedPrimOrPropertyIfNeeded(e,t,s){if(t&&!Us._propertyTypesMatch(t,s))return null;const n=gt(s)==="prim"?["documentation"]:["custom","documentation"];let r=null;for(const o of bn(s)){let a=Zt(s,o);const c=o==="propertyOrder"||Lt(a);if(!(!c&&t&&s_(t,o))&&!n.includes(o)){if(t&&c){const l=Zt(t,o);if(l!==void 0)if(Array.isArray(l)&&Array.isArray(a)){const u=[...l],h=new Set(u);for(const d of a)h.has(d)||(h.add(d),u.push(d));a=u}else Lt(l)&&Lt(a)&&(a=fo(l,a))}if(!r&&(r=this._findOrCreateSpecForComposition(e,t),!r))return null;r.layer.setField(r.path,o,a)}}return r}static _propertyTypesMatch(e,t){const s=gt(e),n=gt(t);return s==="prim"||n==="prim"?s===n:s!==n?!1:s==="attribute"?e.layer.getField(e.path,"typeName")===t.layer.getField(t.path,"typeName"):!0}_composeOverAndReplaceExistingProperty(e,t,s){const n=this._propMap.get(e);if(!n)return;const r={layer:t,path:`${s}.${e}`};if(!t.getSpecPaths().includes(r.path)||!Us._propertyTypesMatch(r,n))return;for(const a of bn(n)){if(r.layer.getField(r.path,a)!==void 0)continue;const c=Zt(n,a);c!==void 0&&t.setField(r.path,a,c)}const o=Zt(n,"variability");Zt(r,"variability")!==o&&t.setField(r.path,"variability",o),this._propMap.set(e,r)}_composeWeakerAPIPrimDefinition(e,t,s){const n=o=>{const a=this._appliedAPISchemas.length,c=[];for(const l of o){const[u,h]=M.getTypeNameAndInstance(l),d=M.findSchemaInfo(u);if(!d)continue;const f=Fa(d.family,h),p=s.get(f);if(p===void 0)s.set(f,d.version),this._appliedAPISchemas.push(l),c.push(f);else if(p!==d.version){this._appliedAPISchemas.length=a;for(const y of c)s.delete(y);return!1}}return!0},r=e._appliedAPISchemas;if(t===""){if(!n(r))return!1;this._composePropertiesFromPrimDef(e)}else{const o=r.map(a=>M.makeMultipleApplyNameInstance(a,t));if(!n(o))return!1;this._composePropertiesFromPrimDefInstance(e,t)}return!0}}const En="__INSTANCE_NAME__";function Gu(i){if(i.length<2)return-1;let e=i.length-1;if(!/[0-9]/.test(i[e]))return-1;for(;--e>=0;){if(i[e]==="_")return e;if(!/[0-9]/.test(i[e]))return-1}return-1}function lr(i,e){return i===""?e:e===""?i:`${i}:${e}`}function Vo(i){let e=0;for(;e<i.length;){let t=i.indexOf(":",e);if(t===-1&&(t=i.length),t-e===En.length&&i.startsWith(En,e))return e;e=t+1}return-1}const i_=new Set(["abstractBase","abstractTyped","concreteTyped","nonAppliedAPI","singleApplyAPI","multipleApplyAPI"]);function n_(i){const e=i.schemaKind;return typeof e=="string"&&i_.has(e)?e:"invalid"}function ln(i,e){const t=i[e];return Array.isArray(t)?t.filter(s=>typeof s=="string"):[]}const r_=new Set(["inheritPaths","payload","references","specializes","variantSelection","variantSetNames","customData","active","instanceable","timeSamples","spline","connectionPaths","targetPaths","specifier","connectionChildren","expressionChildren","mapperArgChildren","mapperChildren","primChildren","properties","targetChildren","variantChildren","variantSetChildren","clips","clipSets","kind"]);function o_(i){const e=rs(i);return e?Ks([],e):[]}function a_(i){i.length<2||i.sort((e,t)=>is(t,e)?-1:is(e,t)?1:0)}function $u(i,e){const t=i.getField(e,"customData");if(typeof t!="object"||t===null)return[];const s=t.apiSchemaOverridePropertyNames;return Array.isArray(s)?s.filter(n=>typeof n=="string"):[]}const Js={NotBuilding:0,Building:1,Complete:2};class M{static#s=null;#t=new Map;#i=new Map;#n=new Map;#r=new Map;#e=new Map;#o=new Map;#a=new Map;#c=new Map;#l=new Map;#u={};#d=new Us;#h=new Map;#p=new Set;constructor(){}static getInstance(){if(!M.#s){const e=new M;M.#s=e;const t=ze.GetInstance();e.#g(t.GetAllPlugins()),t.AddDidRegisterPluginsListener(s=>{e.#g(s)})}return M.#s}static parseSchemaFamilyAndVersionFromIdentifier(e){const t=Gu(e);return t===-1?[e,0]:[e.slice(0,t),parseInt(e.slice(t+1),10)]}static makeSchemaIdentifierForFamilyAndVersion(e,t){return t===0?e:`${e}_${t}`}static isAllowedSchemaFamily(e){return gm(e)&&Gu(e)===-1}static isAllowedSchemaIdentifier(e){const t=M.parseSchemaFamilyAndVersionFromIdentifier(e);if(!t)return!1;const[s,n]=t;return M.isAllowedSchemaFamily(s)&&M.makeSchemaIdentifierForFamilyAndVersion(s,n)===e}static findSchemaInfo(e){const t=M.getInstance();return typeof e=="string"?t.#i.get(e)??null:t.#t.get(e)??null}static findSchemaInfoInFamily(e,t){return M.isAllowedSchemaFamily(e)?M.findSchemaInfo(M.makeSchemaIdentifierForFamilyAndVersion(e,t)):null}static findSchemaInfosInFamily(e,t,s){const n=M.getInstance().#n.get(e);if(!n)return[];if(t===void 0)return[...n];switch(s??"all"){case"all":return[...n];case"greaterThan":return n.filter(r=>r.version>t);case"greaterThanOrEqual":return n.filter(r=>r.version>=t);case"lessThan":return n.filter(r=>r.version<t);case"lessThanOrEqual":return n.filter(r=>r.version<=t)}}static getSchemaTypeName(e){return M.findSchemaInfo(e)?.identifier??""}static getTypeFromSchemaTypeName(e){return M.findSchemaInfo(e)?.type??L.GetUnknownType()}static getConcreteSchemaTypeName(e){const t=M.findSchemaInfo(e);return t&&t.kind==="concreteTyped"?t.identifier:""}static getConcreteTypeFromSchemaTypeName(e){const t=M.findSchemaInfo(e);return t&&t.kind==="concreteTyped"?t.type:L.GetUnknownType()}static getAPISchemaTypeName(e){const t=M.findSchemaInfo(e);return t&&M.#m(t.kind)?t.identifier:""}static getAPITypeFromSchemaTypeName(e){const t=M.findSchemaInfo(e);return t&&M.#m(t.kind)?t.type:L.GetUnknownType()}static getTypeFromName(e){return L.FindByName("UsdSchemaBase").FindDerivedByName(e)}static#m(e){return e==="singleApplyAPI"||e==="multipleApplyAPI"||e==="nonAppliedAPI"}static#f(e){return M.findSchemaInfo(e)?.kind??"invalid"}static getSchemaKind(e){return M.#f(e)}static isConcrete(e){return M.#f(e)==="concreteTyped"}static isAbstract(e){const t=M.#f(e);return t==="abstractTyped"||t==="abstractBase"}static isTyped(e){return(typeof e=="string"?M.getTypeFromSchemaTypeName(e):e).IsA(L.FindByName("UsdTyped"))}static isAppliedAPISchema(e){const t=M.#f(e);return t==="singleApplyAPI"||t==="multipleApplyAPI"}static isMultipleApplyAPISchema(e){return M.#f(e)==="multipleApplyAPI"}static getTypeNameAndInstance(e){const t=e.indexOf(":");return t===-1?[e,""]:[e.slice(0,t),e.slice(t+1)]}static makeMultipleApplyNameTemplate(e,t){return lr(lr(e,En),t)}static makeMultipleApplyNameInstance(e,t){const s=Vo(e);return s===-1?e:e.slice(0,s)+t+e.slice(s+En.length)}static getMultipleApplyNameTemplateBaseName(e){const t=Vo(e);if(t===-1)return e;const s=t+En.length+1;return s>=e.length?"":e.slice(s)}static isMultipleApplyNameTemplate(e){return Vo(e)!==-1}static isAllowedAPISchemaInstanceName(e,t){if(t===""||!M.isMultipleApplyAPISchema(e))return!1;const s=M.getInstance(),n=s.#o.get(e);if(n&&n.size>0&&!n.has(t))return!1;const r=s.findAppliedAPIPrimDefinition(e);if(!r)return!1;const o=t.split(":");if(o.length===0||o.some(c=>c===""))return!1;const a=o[o.length-1];for(const c of r.getPropertyNames())if(a===M.getMultipleApplyNameTemplateBaseName(c))return!1;return!0}static getAPISchemaCanOnlyApplyToTypeNames(e,t){const s=M.getInstance().#e;if(t!==void 0&&t!==""){const n=s.get(lr(e,t));if(n)return[...n]}return[...s.get(e)??[]]}static getAutoApplyAPISchemas(){return new Map([...M.getInstance().#r].map(([e,t])=>[e,[...t]]))}static isDisallowedField(e){return r_.has(e)}findConcretePrimDefinition(e){return this.#a.get(e)??null}findAbstractPrimDefinition(e){return this.#c.get(e)??null}findAppliedAPIPrimDefinition(e){return this.#l.get(e)?.primDef??null}getEmptyPrimDefinition(){return this.#d}buildComposedPrimDefinition(e,t){if(t.length===0)throw new Error("UsdSchemaRegistry.buildComposedPrimDefinition without applied API schemas is not allowed — use findConcretePrimDefinition instead.");const s=M.isConcrete(e)?this.findConcretePrimDefinition(e):this.findAbstractPrimDefinition(e),n=s?s._copy():new Us,r=new Map;for(const o of n._appliedAPISchemas){const[a,c]=M.getTypeNameAndInstance(o),l=M.findSchemaInfo(a);l&&r.set(Fa(l.family,c),l.version)}return this.#S(n,t,r),n}getFallbackPrimTypes(){return Object.fromEntries(Object.entries(this.#u).map(([e,t])=>[e,[...t]]))}#g(e){const t=e.filter(n=>!this.#p.has(n.GetName()));if(t.length===0)return;for(const n of t)this.#p.add(n.GetName());const s=this.#w(t);this.#b(t,s),this.#P()}#P(){const e=new Map(this.#a),t=new Map(this.#c),s=new Map(this.#l);this.#a.clear(),this.#c.clear(),this.#l.clear(),this.#u={},this.#I([...this.#t.values()]);const n=(r,o)=>{for(const[a,c]of r){const l=o.get(a);l&&(l._replaceWith(c),r.set(a,l))}};n(this.#a,e),n(this.#c,t);for(const[r,o]of this.#l){const a=s.get(r);a&&(a.primDef._replaceWith(o.primDef),this.#l.set(r,{primDef:a.primDef,applyExpectsInstanceName:o.applyExpectsInstanceName}))}}#w(e){const t=L.FindByName("UsdSchemaBase"),s=[];for(const n of e){const r=n.GetMetadata().Types;if(!(typeof r!="object"||r===null))for(const o of Object.keys(r)){const a=L.FindByName(o);if(a.IsUnknown()||!(a===t||a.IsA(t))||this.#t.has(a))continue;const c=n.GetMetadataForType(a);if(Object.keys(c).length===0)continue;let l=typeof c.schemaIdentifier=="string"?c.schemaIdentifier:"";if(l===""){const m=t.GetAliases(a);m.length===1&&(l=m[0])}if(l===""||this.#i.has(l))continue;const u=n_(c),[h,d]=M.parseSchemaFamilyAndVersionFromIdentifier(l),f={identifier:l,type:a,family:h,version:d,kind:u};this.#t.set(a,f),this.#i.set(l,f);let p=this.#n.get(h);p||this.#n.set(h,p=[]);let y=p.findIndex(m=>m.version<d);y===-1&&(y=p.length),p.splice(y,0,f),s.push(f)}}return s}#b(e,t){for(const s of t){if(s.kind!=="singleApplyAPI"&&s.kind!=="multipleApplyAPI")continue;const n=ze.GetInstance().GetPluginForType(s.type);if(!n)continue;const r=n.GetMetadataForType(s.type),o=ln(r,"apiSchemaCanOnlyApplyTo");if(o.length>0&&this.#e.set(s.identifier,o),s.kind==="singleApplyAPI"){const a=ln(r,"apiSchemaAutoApplyTo");a.length>0&&this.#r.set(s.identifier,a)}else{const a=ln(r,"apiSchemaAllowedInstanceNames");if(a.length>0){let l=this.#o.get(s.identifier);l||this.#o.set(s.identifier,l=new Set);for(const u of a)l.add(u)}const c=r.apiSchemaInstances;if(typeof c=="object"&&c!==null)for(const[l,u]of Object.entries(c)){if(typeof u!="object"||u===null)continue;const h=ln(u,"apiSchemaCanOnlyApplyTo");h.length>0&&this.#e.set(lr(s.identifier,l),h)}}}for(const s of e){const n=s.GetMetadata().AutoApplyAPISchemas;if(!(typeof n!="object"||n===null))for(const[r,o]of Object.entries(n)){if(typeof o!="object"||o===null)continue;const a=ln(o,"apiSchemaAutoApplyTo");if(a.length===0)continue;const c=this.#r.get(r);c?c.push(...a):this.#r.set(r,a)}}}#v(){const e=new Map;for(const[t,s]of this.#r){const n=new Set;for(const r of s){const o=this.#i.get(r);if(o&&!n.has(o.type)){n.add(o.type);for(const a of o.type.GetAllDerivedTypes())n.add(a)}}for(const r of n){let o=e.get(r);o||e.set(r,o=[]),o.push(t)}}for(const t of e.values())a_(t);return e}#I(e){const t=this.#v(),s=new Map,n=[],r=[],o=new Set;for(const a of e){if(!(a.kind==="abstractTyped"||a.kind==="concreteTyped"||a.kind==="multipleApplyAPI"||a.kind==="singleApplyAPI"))continue;const l=this.#A(a.type);o.add(l),a.kind==="abstractTyped"?n.push({info:a,layer:l}):a.kind==="concreteTyped"?r.push({info:a,layer:l}):s.set(a.identifier,{info:a,layer:l,primDef:null,buildStatus:Js.NotBuilding})}for(const a of o){const c=a.getField("/","fallbackPrimTypes");if(!(typeof c!="object"||c===null))for(const[l,u]of Object.entries(c))Array.isArray(u)&&(l in this.#u||(this.#u[l]=u.filter(h=>typeof h=="string")))}for(const[a,c]of s)this.#_(c,s,t),this.#l.set(a,{primDef:c.primDef,applyExpectsInstanceName:c.info.kind==="multipleApplyAPI"});for(const{info:a,layer:c}of[...n,...r]){const l=`/${a.identifier}`,u=$u(c,l),h=new Us;h._initializeForTypedSchema(c,l,u),h._locallyDefinedPropertyNames=[...h._properties,...u];const d=this.#y(c,l,a,t);d.length>0&&this.#S(h,d,new Map);for(const f of u)h._composeOverAndReplaceExistingProperty(f,c,l);a.kind==="abstractTyped"?this.#c.set(a.identifier,h):this.#a.set(a.identifier,h)}for(const{info:a}of[...n,...r]){const c=a.kind==="abstractTyped"?this.#c.get(a.identifier):this.#a.get(a.identifier);c._locallyDefinedPropertyNames=this.#T(c,a.identifier)}}#A(e){const t=ze.GetInstance().GetPluginForType(e);if(!t)return te.createAnonymous("anon:generatedSchema:unowned");const s=this.#h.get(t);if(s)return s;const n=t._GetResourceSync("generatedSchema.usda");let r=null;if(n!==void 0)try{r=te.createInMemory(`anon:${t.GetName()}:generatedSchema.usda`,n)}catch{r=null}return r??=te.createAnonymous(`anon:${t.GetName()}:generatedSchema.usda`),this.#h.set(t,r),r}#y(e,t,s,n){let r=o_(e.getField(t,"apiSchemas"));const o=n.get(s.type);if(o&&(r=[...r,...o]),r.length===0)return r;const a=s.kind==="multipleApplyAPI";return r.filter(c=>M.isMultipleApplyNameTemplate(c)===a)}#_(e,t,s){if(e.buildStatus===Js.Complete)return!0;e.buildStatus=Js.Building;const{info:n,layer:r}=e,o=`/${n.identifier}`,a=$u(r,o),c=n.kind==="multipleApplyAPI"?M.makeMultipleApplyNameTemplate(n.identifier,""):n.identifier,l=new Us;l._initializeForAPISchema(c,r,o,a),l._locallyDefinedPropertyNames=[...l._properties,...a],e.primDef=l;const u=this.#y(r,o,n,s);if(u.length===0)return e.buildStatus=Js.Complete,!0;const h=new Map;h.set(Fa(n.family,""),n.version);let d=!1;for(const f of u){const[p,y]=M.getTypeNameAndInstance(f),m=t.get(p);if(m){if(m.buildStatus===Js.Building){d=!0;continue}this.#_(m,t,s)||(d=!0),l._composeWeakerAPIPrimDefinition(m.primDef,y,h);continue}const g=this.#l.get(p);g&&l._composeWeakerAPIPrimDefinition(g.primDef,y,h)}for(const f of a)l._composeOverAndReplaceExistingProperty(f,r,o);return d?(e.buildStatus=Js.NotBuilding,!1):(e.buildStatus=Js.Complete,!0)}#S(e,t,s){for(const n of t){const[r,o]=M.getTypeNameAndInstance(n),a=this.#l.get(r);if(!a)continue;const c=o!=="";a.applyExpectsInstanceName===c&&e._composeWeakerAPIPrimDefinition(a.primDef,o,s)}}#T(e,t){const s=e._locallyDefinedPropertyNames,n=M.getTypeFromSchemaTypeName(t);if(n.IsUnknown())return s;const r=L.FindByName("UsdTyped"),o=new Set;for(const a of n.GetBaseTypes()){if(a===r)continue;const c=this.#t.get(a);if(!c)continue;const l=c.kind==="concreteTyped"?this.findConcretePrimDefinition(c.identifier):this.findAbstractPrimDefinition(c.identifier);if(l)for(const u of l.getPropertyNames())o.add(u)}return o.size===0?s:s.filter(a=>!o.has(a))}}class Bt{static#s=new Map;static#t=null;static{ze.GetInstance().AddDidRegisterPluginsListener(()=>{for(const[e,t]of Bt.#s)t.#e.IsUnknown()?Bt.#s.delete(e):t.#a=null})}#i;#n;#r;#e=L.GetUnknownType();#o="";#a=null;constructor(e,t,s){this.#i=e,this.#n=t,this.#r=[...s];const n=r=>{if(r==="")return!1;const o=M.getConcreteTypeFromSchemaTypeName(r);return o.IsUnknown()||(this.#e=o,this.#o=r),!0};n(this.#n)||n(this.#i)}getTypeName(){return this.#i}getAppliedAPISchemas(){return[...this.#r]}getSchemaType(){return this.#e}getSchemaTypeName(){return this.#o}getPrimDefinition(){if(this.#a)return this.#a;const e=M.getInstance();return this.#a=this.#r.length===0?e.findConcretePrimDefinition(this.#o)??e.getEmptyPrimDefinition():e.buildComposedPrimDefinition(this.#o,this.#r),this.#a}static getEmptyPrimType(){return Bt.#t??=new Bt("","",[])}static _findOrCreatePrimTypeInfo(e,t,s){if(e===""&&t===""&&s.length===0)return Bt.getEmptyPrimType();const n=[e,t,...s].join("\0");let r=Bt.#s.get(n);return r||(r=new Bt(e,t,s),Bt.#s.set(n,r)),r}}class c_{constructor(e,t,s){this._stage=e,this._primPath=t,this.name=s}setTargets(e){this._stage._setRelTargets(this._primPath,this.name,e)}addTarget(e){const t=this.getTargets();t.includes(e)||this.setTargets([...t,e])}getTargets(){return this._stage.get(`${this._primPath}.${this.name}`)?.getTargets()??[]}getMetadata(e){return this._stage.get(`${this._primPath}.${this.name}`)?.getMetadata(e)}setMetadata(e,t){return this._stage._setPropertyMetadata(this._primPath,this.name,e,t),!0}}const Lu={offset:0,scale:1};class Vu{constructor(e,t,s){this._stage=e,this._primPath=t,this._field=s}async addReference(e,t=""){const s=this._stage.getEditTarget().getLayer(),n=s.getField(this._primPath,this._field),r=n?{...n,prependedItems:[...n.prependedItems]}:{isExplicit:!1,explicitItems:[],prependedItems:[],appendedItems:[],deletedItems:[]};r.prependedItems.push({assetPath:e,primPath:t,layerOffset:{...Lu}}),await this._stage._ownAuthoringAsync(async()=>{s.setField(this._primPath,this._field,r),await this._stage._recomposeForEdit()})}async setReferences(e){const t=this._stage.getEditTarget().getLayer(),s=e.map(n=>({assetPath:n.assetPath,primPath:n.primPath??"",layerOffset:n.layerOffset?{...n.layerOffset}:{...Lu}}));await this._stage._ownAuthoringAsync(async()=>{t.setField(this._primPath,this._field,{isExplicit:!0,explicitItems:s,prependedItems:[],appendedItems:[],deletedItems:[]}),await this._stage._recomposeForEdit()})}async clear(){const e=this._stage.getEditTarget().getLayer();await this._stage._ownAuthoringAsync(async()=>{e.setField(this._primPath,this._field,{isExplicit:!0,explicitItems:[],prependedItems:[],appendedItems:[],deletedItems:[]}),await this._stage._recomposeForEdit()})}}class l_{constructor(e,t){this._stage=e,this._primPath=t}async setSpecializes(e){const t=this._stage.getEditTarget().getLayer();await this._stage._ownAuthoringAsync(async()=>{t.setField(this._primPath,"specializes",{isExplicit:!0,explicitItems:[...e],prependedItems:[],appendedItems:[],deletedItems:[]}),await this._stage._recomposeForEdit()})}async clearSpecializes(){const e=this._stage.getEditTarget().getLayer();await this._stage._ownAuthoringAsync(async()=>{e.setField(this._primPath,"specializes",{isExplicit:!0,explicitItems:[],prependedItems:[],appendedItems:[],deletedItems:[]}),await this._stage._recomposeForEdit()})}getSpecializes(){const e=this._stage.getEditTarget().getLayer().getField(this._primPath,"specializes");return e?e.isExplicit?[...e.explicitItems]:[...e.prependedItems,...e.appendedItems]:[]}}const je=Object.freeze({Soft:"soft",Hard:"hard",Minimum:"minimum",Maximum:"maximum"});function yp(i){return i!==null&&typeof i=="object"&&!Array.isArray(i)}function Uo(i){return yp(i)?structuredClone(i):{}}function Uu(i,e){return i===void 0||e===void 0?!0:Array.isArray(i)||Array.isArray(e)?Array.isArray(i)&&Array.isArray(e):typeof i==typeof e}class zu{constructor(e,t={},s={},n=""){this.success=e,this.invalidValuesDict=t,this.conformedSubDict=s,this.errorString=n}}class u_{constructor(e,t=""){this._attr=e,this._subDictKey=t}isValid(){return this._attr!==void 0&&this._subDictKey.length>0}getAttribute(){return this._attr}getSubDictKey(){return this._subDictKey}_limitsDict(){return Uo(this._attr?.getMetadata("limits"))}_subDict(){const e=this._limitsDict()[this._subDictKey];return Uo(e)}_writeSubDict(e){if(!this.isValid())return!1;const t=this._limitsDict();return e===void 0||Object.keys(e).length===0?delete t[this._subDictKey]:t[this._subDictKey]=e,Object.keys(t).length===0?this._attr._clearMetadata("limits"):this._attr.setMetadata("limits",t),!0}hasAuthored(e){const t=this._subDict();return e===void 0?Object.keys(t).length>0:Object.prototype.hasOwnProperty.call(t,e)}clear(e){if(!this.isValid())return!1;if(e===void 0)return this._writeSubDict(void 0);const t=this._subDict();return delete t[e],this._writeSubDict(t)}hasAuthoredMinimum(){return this.hasAuthored(je.Minimum)}clearMinimum(){return this.clear(je.Minimum)}hasAuthoredMaximum(){return this.hasAuthored(je.Maximum)}clearMaximum(){return this.clear(je.Maximum)}validate(e){if(!this.isValid()||!yp(e))return new zu(!1,{},{},"Invalid attribute limits");const t=this._attr.get(),s={};for(const r of[je.Minimum,je.Maximum])r in e&&!Uu(t,e[r])&&(s[r]=e[r]);const n=Object.keys(s).length===0;return new zu(n,s,n?structuredClone(e):{},n?"":`Invalid limits values for <${this._attr.primPath}.${this._attr.name}>`)}set(e,t){if(typeof e!="string"){const n=this.validate(e);return n.success&&this._writeSubDict(Uo(n.conformedSubDict))}if(!this.isValid()||e.length===0||(e===je.Minimum||e===je.Maximum)&&!Uu(this._attr.get(),t))return!1;const s=this._subDict();return s[e]=structuredClone(t),this._writeSubDict(s)}get(e){return this._subDict()[e]}getOr(e,t){const s=this.get(e);return s===void 0?t:s}getMinimum(){return this.get(je.Minimum)}getMinimumOr(e){return this.getOr(je.Minimum,e)}setMinimum(e){return this.set(je.Minimum,e)}getMaximum(){return this.get(je.Maximum)}getMaximumOr(e){return this.getOr(je.Maximum,e)}setMaximum(e){return this.set(je.Maximum,e)}}const h_="backOfPrependList",La=new WeakMap,Bn=new WeakMap;function Hr(i){const e=i.lastIndexOf("/");return e<=0?"/":i.slice(0,e)}function Cr(i){const e=new Map;for(const t of i.keys()){if(t==="/"||t.includes("."))continue;const s=Hr(t);let n=e.get(s);n||e.set(s,n=[]),n.push(t)}return e}function d_(i){return La.get(i)??0}function _p(i){const e=Bn.get(i)??Cr(i),t=new Set;for(const[s,n]of e){const r=n.filter(o=>i.has(o)&&Hr(o)===s);e.set(s,r);for(const o of r)t.add(o)}for(const s of i.keys()){if(s==="/"||s.includes(".")||t.has(s))continue;const n=Hr(s);let r=e.get(n);r||e.set(n,r=[]),r.push(s),t.add(s)}return Bn.set(i,e),e}class p_{nodes=new Map;_generation=0;constructor(e){for(const[t,s]of e)this.nodes.set(t,s);La.set(this.nodes,this._generation),Bn.set(this.nodes,Cr(e))}get generation(){return this._generation}replaceAll(e){this.nodes.clear();for(const[t,s]of e)this.nodes.set(t,s);Bn.set(this.nodes,Cr(e)),this.markStructureChanged()}replaceSubtrees(e,t){if(t.length===0)return;if(t.includes("/")){this.replaceAll(e);return}const s=o=>t.some(a=>o===a||o.startsWith(`${a}/`)||o.startsWith(`${a}.`)),n=new Map([..._p(this.nodes)].map(([o,a])=>[o,[...a]])),r=Cr(e);for(const o of[...this.nodes.keys()])s(o)&&this.nodes.delete(o);for(const[o,a]of e)s(o)&&this.nodes.set(o,a);for(const o of t){for(const l of[...n.keys()])(l===o||l.startsWith(`${o}/`))&&n.delete(l);for(const[l,u]of r)(l===o||l.startsWith(`${o}/`))&&n.set(l,[...u]);const a=Hr(o);let c=n.get(a)??[];this.nodes.has(o)?c.includes(o)||(c=[...c,o]):c=c.filter(l=>l!==o),n.set(a,c)}Bn.set(this.nodes,n),this.markStructureChanged()}replacePrims(e,t){if(t.length===0)return;const s=n=>t.some(r=>n===r||n.startsWith(`${r}.`));for(const n of[...this.nodes.keys()])s(n)&&this.nodes.delete(n);for(const[n,r]of e)s(n)&&this.nodes.set(n,r);this.markStructureChanged()}markStructureChanged(){this._generation+=1,La.set(this.nodes,this._generation)}}const un=B.absoluteRootPath,Va=B.emptyPath;function ns(i){return i.pathElementCount}function Tc(i,e){return e.isEmpty()||i.isEmpty()?!1:e.isAbsoluteRootPath()?i.isAbsolutePath():i.hasPrefix(e)}function ei(i){return i.getParentPath()}function ur(i){return i.name}function ju(i){return i.isAbsoluteRootPath()}function On(i,e){return i.pathString===e.pathString}function Wu(i,e){const t=ns(i[0]),s=ns(e[0]);if(t!==s)return t-s;const n=i[0].pathString,r=e[0].pathString;return n<r?-1:n>r?1:0}function Ua(i,e,t){return t.isEmpty()?Va:i.replacePrefix(e,t)}function za(i,e){let t=-1,s=-1;for(let n=0;n<e.length;n++)if(Tc(i,e[n][0])){const r=ns(e[n][0]);r>s&&(s=r,t=n)}return t}function Sp(i,e,t=0){let s=-1,n=t;for(let r=0;r<e.length;r++){const o=ns(e[r][1]);o>=n&&Tc(i,e[r][1])&&(n=o,s=r)}return s}function ja(i,e,t,s){const n=t<0?0:ns(s?e[t][0]:e[t][1]),r=s?f_(i,e,n):Sp(i,e,n);return r!==-1&&r!==t}function f_(i,e,t){let s=-1,n=t-1;for(let r=0;r<e.length;r++){const o=ns(e[r][0]);o>=t&&o>n&&Tc(i,e[r][0])&&(n=o,s=r)}return s}function m_(i,e){const t=i[e][0],s=i[e][1];if(s.isEmpty()){const u=za(ei(t),i);if(u===-1||i[u][1].isEmpty())return!0;const h=Ua(t,i[u][0],i[u][1]);return ja(h,i,u,!1)}if(ur(t)!==ur(s))return!1;const r=za(ei(t),i);if(r===-1||i[r][1].isEmpty())return!1;const o=i[r][0],a=i[r][1];if(ju(o)&&ju(a)&&On(t,s))return!0;if(ns(s)-ns(a)!==ns(t)-ns(o))return!1;let c=ei(t),l=ei(s);for(;!On(c,o);){if(ur(c)!==ur(l))return!1;c=ei(c),l=ei(l)}return On(a,l)?!ja(ei(s),i,r,!1):!1}function g_(i){const e=i.slice();for(let s=0;s<e.length;)m_(e,s)?e.splice(s,1):s++;let t=!1;return e.length>0&&e[0][0].isAbsoluteRootPath()&&e[0][1].isAbsoluteRootPath()&&(e.shift(),t=!0),{pairs:e,hasRootIdentity:t}}function qu(i){return typeof i=="string"?B.fromString(i):i}class K{_pairs;_hasRootIdentity;_offset;constructor(e,t,s){this._pairs=e,this._hasRootIdentity=t,this._offset=s}static _fromCanonical(e,t,s){return new K(e,t,s)}static _build(e,t){const s=e.slice().sort(Wu),{pairs:n,hasRootIdentity:r}=g_(s);return new K(n,r,t)}static create(e,t=Ls){const n=[...e instanceof Map?[...e.entries()]:e].map(([r,o])=>[qu(r),qu(o)]);return K._build(n,t)}static identity(){return new K([],!0,Ls)}static null(){return new K([],!1,Ls)}isNull(){return this._pairs.length===0&&!this._hasRootIdentity&&Fo(this._offset)}isIdentity(){return this.isIdentityPathMapping()&&Fo(this._offset)}isIdentityPathMapping(){return this._hasRootIdentity&&this._pairs.length===0}hasRootIdentity(){return this._hasRootIdentity}getTimeOffset(){return this._offset}getSourceToTargetMap(){const e=new Map;this._hasRootIdentity&&e.set(un.pathString,un.pathString);for(const[t,s]of this._pairs)e.set(t.pathString,s.pathString);return e}_map(e,t){if(e.containsPrimVariantSelection()){const s=this._mapNoVariants(e.stripAllVariantSelections(),t);return s.isEmpty()?s:e.reapplyVariantSelectionsOnto(s)}return this._mapNoVariants(e,t)}_mapNoVariants(e,t){const s=t?Sp(e,this._pairs):za(e,this._pairs);let n;return s===-1?n=this._hasRootIdentity?e:Va:t?n=Ua(e,this._pairs[s][1],this._pairs[s][0]):n=Ua(e,this._pairs[s][0],this._pairs[s][1]),n.isEmpty()?n:ja(n,this._pairs,s,t)?Va:n}mapSourceToTarget(e){return this._map(e,!1)}mapTargetToSource(e){return this._map(e,!0)}compose(e){if(this.isIdentity())return e;if(e.isIdentity())return this;const t=[],s=new Set;this._hasRootIdentity&&e._hasRootIdentity&&(t.push([un,un]),s.add(un.pathString));for(const[n,r]of e._pairs)t.push([n,this.mapSourceToTarget(r)]),s.add(n.pathString);for(const[n,r]of this._pairs){const o=e.mapTargetToSource(n);o.isEmpty()||s.has(o.pathString)||(s.add(o.pathString),t.push([o,r]))}return K._build(t,os(this._offset,e._offset))}composeOffset(e){return new K(this._pairs,this._hasRootIdentity,os(this._offset,e))}getInverse(){const e=this._pairs.map(([s,n])=>[n,s]);e.sort(Wu);const t=bc(this._offset)??Ls;return K._fromCanonical(e,this._hasRootIdentity,t)}static impliedClass(e,t){if(e.isIdentity())return t;const s=e.compose(t.compose(e.getInverse()));return new K(s._pairs,!0,s._offset)}addRootIdentity(){return this._hasRootIdentity?this:new K(this._pairs,!0,this._offset)}equals(e){if(this._hasRootIdentity!==e._hasRootIdentity||!ag(this._offset,e._offset)||this._pairs.length!==e._pairs.length)return!1;for(let t=0;t<this._pairs.length;t++)if(!On(this._pairs[t][0],e._pairs[t][0])||!On(this._pairs[t][1],e._pairs[t][1]))return!1;return!0}toString(){const e=[...this.getSourceToTargetMap()].map(([t,s])=>`${t} -> ${s||"(block)"}`);return Fo(this._offset)||e.push(`offset=${this._offset.offset} scale=${this._offset.scale}`),`{ ${e.join(", ")} }`}}function Pp(i){return i.addRootIdentity()}function y_(i,e,t,s){switch(i){case 4:return!0;case 1:return!1;case 0:return s.hasRootIdentity();case 3:return!!(e&&e.alwaysHasIdentity&&t&&t.alwaysHasIdentity);case 5:return!0;default:return!!(e&&e.alwaysHasIdentity)||!!(t&&t.alwaysHasIdentity)}}function __(i,e,t,s){const n=e?e.id:"-",r=t?t.id:"-",o=i===0?s.toString():"";return`${i}|${n}|${r}|${o}`}let S_=0;class Ft{id;op;arg1;arg2;constant;alwaysHasIdentity;_cachedValue=null;_valueForVariable=K.null();dependents=new Set;static _registry=new Map;constructor(e,t,s,n){this.id=S_++,this.op=e,this.arg1=t,this.arg2=s,this.constant=n,this.alwaysHasIdentity=y_(e,t,s,n),t&&t.dependents.add(this),s&&s.dependents.add(this)}static create(e,t=null,s=null,n=K.null()){if(e!==1){const r=__(e,t,s,n),o=Ft._registry.get(r);if(o)return o;const a=new Ft(e,t,s,n);return Ft._registry.set(r,a),a}return new Ft(e,t,s,n)}evaluate(){if(this._cachedValue!==null)return this._cachedValue;const e=this._evaluateUncached();return this._cachedValue=e,e}_evaluateUncached(){switch(this.op){case 0:return this.constant;case 1:return this._valueForVariable;case 2:return this.arg1.evaluate().getInverse();case 3:return this.arg1.evaluate().compose(this.arg2.evaluate());case 4:return Pp(this.arg1.evaluate());case 5:return K.impliedClass(this.arg1.evaluate(),this.arg2.evaluate());default:throw new Error("PcpMapExpression: unhandled op")}}_invalidate(){if(this._cachedValue!==null){this._cachedValue=null;for(const e of this.dependents)e._invalidate()}}setValueForVariable(e){if(this.op!==1)throw new Error("PcpMapExpression: cannot set value for non-variable");if(!this._valueForVariable.equals(e)){this._valueForVariable=e,this._cachedValue=null;for(const t of this.dependents)t._invalidateExternal()}}_invalidateExternal(){this._invalidate()}getValueForVariable(){return this._valueForVariable}}class P_{constructor(e){this._node=e}getValue(){return this._node.getValueForVariable()}setValue(e){this._node.setValueForVariable(e)}getExpression(){return Ce._fromNode(this._node)}}class Ce{_node;constructor(e){this._node=e}static _fromNode(e){return new Ce(e)}static null(){return new Ce(null)}evaluate(){return this._node?this._node.evaluate():K.null()}isNull(){return this._node===null}static identity(){return Ce.constant(K.identity())}static constant(e){return new Ce(Ft.create(0,null,null,e))}static newVariable(e){const t=Ft.create(1),s=new P_(t);return s.setValue(e),s}isConstantIdentity(){return this._node!==null&&this._node.op===0&&this._node.constant.isIdentity()}compose(e){return this.isConstantIdentity()?e:e.isConstantIdentity()?this:this._node.op===0&&e._node.op===0?Ce.constant(this.evaluate().compose(e.evaluate())):new Ce(Ft.create(3,this._node,e._node))}inverse(){return this.isConstantIdentity()?this:this._node.op===0?Ce.constant(this.evaluate().getInverse()):new Ce(Ft.create(2,this._node))}addRootIdentity(){return this.isConstantIdentity()?this:this._node.op===0?Ce.constant(Pp(this.evaluate())):this._node.alwaysHasIdentity?new Ce(this._node):new Ce(Ft.create(4,this._node))}static impliedClass(e,t){return e.isConstantIdentity()?t:e._node.op===0&&t._node.op===0?Ce.constant(K.impliedClass(e.evaluate(),t.evaluate())):new Ce(Ft.create(5,e._node,t._node))}isIdentity(){return this.evaluate().isIdentity()}mapSourceToTarget(e){return this.evaluate().mapSourceToTarget(B.fromString(e)).pathString}mapTargetToSource(e){return this.evaluate().mapTargetToSource(B.fromString(e)).pathString}}var C=(i=>(i[i.Root=0]="Root",i[i.Inherit=1]="Inherit",i[i.Variant=2]="Variant",i[i.Relocate=3]="Relocate",i[i.Reference=4]="Reference",i[i.Payload=5]="Payload",i[i.Specialize=6]="Specialize",i))(C||{});function wp(i){return i===1}function Ws(i){return i===6}function Rs(i){return i===1||i===6}function F(i){return i.pathString}function w_(i,e,t){return{rootLayer:i,...e?{sessionLayer:e}:{}}}function ws(i){return`${i.rootLayer.filePath}\0${i.sessionLayer?.filePath??""}\0${i.expressionVariablesOverrideSource?.getKey()??"<root>"}`}function De(i,e){return{layerStack:i,path:e}}class b_{constructor(e,t){this.layerStack=e,this.path=t}equals(e){return this.layerStack===e.layerStack&&this.path.pathString===e.path.pathString}toString(){return`${Wa(this.layerStack.identifier)}<${this.path.pathString}>`}}function Wa(i){let e=`@${i.rootLayer.filePath}@`;return i.sessionLayer&&(e+=`,@${i.sessionLayer.filePath}@`),e}var Nr=(i=>(i[i.ArcCycle=0]="ArcCycle",i[i.ArcPermissionDenied=1]="ArcPermissionDenied",i[i.ArcToProhibitedChild=2]="ArcToProhibitedChild",i[i.IndexCapacityExceeded=3]="IndexCapacityExceeded",i[i.ArcCapacityExceeded=4]="ArcCapacityExceeded",i[i.ArcNamespaceDepthCapacityExceeded=5]="ArcNamespaceDepthCapacityExceeded",i[i.InconsistentPropertyType=6]="InconsistentPropertyType",i[i.InconsistentAttributeType=7]="InconsistentAttributeType",i[i.InconsistentAttributeVariability=8]="InconsistentAttributeVariability",i[i.InternalAssetPath=9]="InternalAssetPath",i[i.InvalidPrimPath=10]="InvalidPrimPath",i[i.InvalidAssetPath=11]="InvalidAssetPath",i[i.InvalidInstanceTargetPath=12]="InvalidInstanceTargetPath",i[i.InvalidExternalTargetPath=13]="InvalidExternalTargetPath",i[i.InvalidTargetPath=14]="InvalidTargetPath",i[i.InvalidReferenceOffset=15]="InvalidReferenceOffset",i[i.InvalidSublayerOffset=16]="InvalidSublayerOffset",i[i.InvalidSublayerOwnership=17]="InvalidSublayerOwnership",i[i.InvalidSublayerPath=18]="InvalidSublayerPath",i[i.InvalidVariantSelection=19]="InvalidVariantSelection",i[i.MutedAssetPath=20]="MutedAssetPath",i[i.InvalidAuthoredRelocation=21]="InvalidAuthoredRelocation",i[i.InvalidConflictingRelocation=22]="InvalidConflictingRelocation",i[i.InvalidSameTargetRelocations=23]="InvalidSameTargetRelocations",i[i.OpinionAtRelocationSource=24]="OpinionAtRelocationSource",i[i.PrimPermissionDenied=25]="PrimPermissionDenied",i[i.PropertyPermissionDenied=26]="PropertyPermissionDenied",i[i.SublayerCycle=27]="SublayerCycle",i[i.TargetPermissionDenied=28]="TargetPermissionDenied",i[i.UnresolvedPrimPath=29]="UnresolvedPrimPath",i[i.VariableExpressionError=30]="VariableExpressionError",i))(Nr||{});class Vt{constructor(){}toString(){return this.message}}var vn=(i=>(i[i.TargetIsConflictSource=0]="TargetIsConflictSource",i[i.SourceIsConflictTarget=1]="SourceIsConflictTarget",i[i.TargetIsConflictSourceDescendant=2]="TargetIsConflictSourceDescendant",i[i.SourceIsConflictSourceDescendant=3]="SourceIsConflictSourceDescendant",i))(vn||{});class v_ extends Vt{}class I_ extends Vt{}class A_ extends Vt{}class T_ extends Vt{}class x_ extends Vt{}class D_ extends x_{}class k_ extends Vt{}class xc extends Vt{}class C_ extends xc{}class N_ extends xc{}class M_ extends xc{}class E_ extends Vt{}class B_ extends Vt{}class O_ extends Vt{}class R_ extends Vt{}function ht(i,e){return Object.assign(Object.create(i),e)}function F_(i){return`@${i.rootLayer.filePath}@`+(i.sessionLayer?`,@${i.sessionLayer.filePath}@`:"")}function Mr(i){return`${F_(i.layerStack)}<${i.path}>`}function Kr(i,e){return`@${i?.filePath??"<expired>"}@<${e}>`}const Dc={[C.Root]:"root",[C.Inherit]:"inherit",[C.Relocate]:"relocate",[C.Variant]:"variant",[C.Reference]:"reference",[C.Payload]:"payload",[C.Specialize]:"specialize"};function G_(i){let e=`Cycle detected:
`;for(let t=0;t<i.length;t++){const s=i[t];if(t>0)if(t+1<i.length)switch(s.arcType){case C.Inherit:e+=`inherits from:
`;break;case C.Relocate:e+=`is relocated from:
`;break;case C.Variant:e+=`uses variant:
`;break;case C.Reference:e+=`references:
`;break;case C.Payload:e+=`gets payload from:
`;break;default:e+=`refers to:
`;break}else switch(e+="CANNOT ",s.arcType){case C.Inherit:e+=`inherit from:
`;break;case C.Relocate:e+=`be relocated from:
`;break;case C.Variant:e+=`use variant:
`;break;case C.Reference:e+=`reference:
`;break;case C.Payload:e+=`get payload from:
`;break;default:e+=`refer to:
`;break}e+=`${Mr(s.site)}
`,t>0&&t+1<i.length&&(e+="which ")}return ht(v_.prototype,{errorType:0,rootSite:i[0].site,cycle:i,message:e})}function $_(i){return ht(O_.prototype,{errorType:29,...i,message:`Unresolved ${Dc[i.arcType]} prim path ${Kr(i.targetLayer,i.unresolvedPath)} introduced by ${Kr(i.sourceLayer,i.site.path)}`})}function zo(i){const e={[C.Root]:"refer to",[C.Inherit]:"inherit from",[C.Relocate]:"be relocated from",[C.Variant]:"use variant",[C.Reference]:"reference",[C.Payload]:"get payload from",[C.Specialize]:"refer to"};return ht(I_.prototype,{errorType:2,...i,message:`${Mr(i.site)}
CANNOT ${e[i.arcType]}:
${Mr(i.targetSite)}
which is a prohibited child of its parent because it would require allowing opinions from the source of a relocation at ${Mr(i.relocationSourceSite)}.`})}function L_(i){return ht(D_.prototype,{errorType:11,...i,message:`Could not open asset @${i.resolvedAssetPath}@ for ${Dc[i.arcType]} introduced by ${Kr(i.sourceLayer,i.site.path)}`+(i.messages?` -- ${i.messages}`:"")+"."})}function Hu(i){return ht(T_.prototype,{errorType:10,...i,message:`Invalid ${Dc[i.arcType]} path <${i.primPath}> introduced by ${Kr(i.sourceLayer,i.site.path)}-- must be an absolute prim path with no variant selections.`})}function V_(i){const e=t=>t==="attribute"?"an attribute":"a relationship";return ht(A_.prototype,{errorType:6,...i,message:`The property <${i.rootSite.path}> has inconsistent spec types.  The defining spec is @${i.definingLayerIdentifier}@<${i.definingSpecPath}> and is ${e(i.definingSpecType)} spec.  The conflicting spec is @${i.conflictingLayerIdentifier}@<${i.conflictingSpecPath}> and is ${e(i.conflictingSpecType)} spec.  The conflicting spec will be ignored.`})}function bp(i){const e=i.sourcePath==="/"?`in @${i.sourceLayer.filePath}@`:`at ${i.sourcePath} in @${i.sourceLayer.filePath}@`;return ht(R_.prototype,{errorType:30,...i,message:`Error evaluating expression ${i.expression.slice(0,32)} for ${i.context} ${e}: ${i.expressionError}`})}function U_(i){return ht(B_.prototype,{errorType:27,...i,message:`Sublayer hierarchy with root layer @${i.layer.filePath}@ has cycles. Detected when layer @${i.sublayer.filePath}@ was seen in the layer stack for the second time.`})}function z_(i){return ht(k_.prototype,{errorType:17,...i,message:`The following sublayers for layer @${i.layer.filePath}@ have the same owner '${i.owner}': `+i.sublayers.map(e=>`@${e.filePath}@`).join(", ")})}function j_(i){return ht(C_.prototype,{errorType:21,...i,message:`Relocation from <${i.sourcePath}> to <${i.targetPath}> authored at @${i.layer.filePath}@<${i.owningPath}> is invalid and will be ignored: `+i.messages})}const W_={0:"The target of a relocate cannot be the source of another relocate in the same layer stack.",1:"The source of a relocate cannot be the target of another relocate in the same layer stack.",2:"The target of a relocate cannot be a descendant of the source of another relocate.",3:"The source of a relocate cannot be a descendant of the source of another relocate."};function q_(i){return ht(N_.prototype,{errorType:22,...i,message:`Relocation from <${i.sourcePath}> to <${i.targetPath}> authored at @${i.layer.filePath}@<${i.owningPath}> conflicts with another relocation from <${i.conflictSourcePath}> to <${i.conflictTargetPath}> authored at @${i.conflictLayer.filePath}@<${i.conflictOwningPath}> and will be ignored: `+W_[i.conflictReason]})}function H_(i){const e=i.sources.map(t=>`relocation from <${t.sourcePath}> authored at @${t.layer.filePath}@<${t.owningPath}>`).join("; ");return ht(M_.prototype,{errorType:23,...i,message:`The path <${i.targetPath}> is the target of multiple relocations from different sources. The following relocates to this target are invalid and will be ignored: ${e}.`})}function K_(i){return ht(E_.prototype,{errorType:24,...i,message:`The layer @${i.layer.filePath}@ has an invalid opinion at the relocation source path <${i.path}>, which will be ignored.`})}async function kc(i,e,t,s=i.current){return s?Xi(s,e,t):await t(void 0)}function Z_(i,e,t,s=i.current){return s?zn(s,e,t):t(void 0)}function Cc(i,e,t){i&&Me(i,e,t)}function Ds(i){const e=i.lastIndexOf("/");return e<=0?"/":i.slice(0,e)}function Ku(i,e){return i===e||e.startsWith(i+"/")}function Y_(i,e,t){return i===e?t:i.startsWith(e+"/")?t+i.slice(e.length):i}async function qa(i,e,t,s,n,r,o,a,c,l){r.push({layer:i,offset:t});const u=i.getField("/","subLayers");if(!u||u.length===0)return;const h=i.getField("/","subLayerOffsets")??[],d=new Map(n).set(i.filePath,i),f=[];for(let p=0;p<u.length;p++){let y=u[p];if(Zs(y)){const b=Xn(y,o);if(b.errors.length>0&&l.push(bp({rootSite:{...c,path:""},expression:y,expressionError:b.errors.join("; "),context:"sublayer",sourceLayer:i,sourcePath:"/"})),typeof b.value!="string"||b.value==="")continue;y=b.value}const m=i.resolveAsset(y);if(!m)continue;const g=d.get(m);if(g!==void 0){l.push(U_({rootSite:c,layer:i,sublayer:g}));continue}const S=await e(m);if(!S)continue;const _=Ha(S),P=h[p]??Ls,w=s===_?P:{offset:P.offset,scale:P.scale*s/_},v=os(t,w);f.push({layer:S,offset:v,tcps:_})}if(a&&i.getField("/","hasOwnedSubLayers")===!0){const p=m=>m.layer.getField("/","owner")===a;f.sort((m,g)=>Number(p(g))-Number(p(m)));const y=f.filter(p).map(m=>m.layer);y.length>1&&l.push(z_({rootSite:c,owner:a,layer:i,sublayers:y}))}for(const p of f)await qa(p.layer,e,p.offset,p.tcps,d,r,o,a,c,l)}function Ha(i){const e=i.getField("/","timeCodesPerSecond");if(typeof e=="number")return e;const t=i.getField("/","framesPerSecond");return typeof t=="number"?t:24}function X_(i,e){const t=r=>r.startsWith("/")?r.includes("{")?"Relocates cannot have any variant selections.":r.includes(".")?"Only prims can be relocated.":null:"Relocates must use absolute paths.";if(!i)return"Relocates source paths cannot be empty.";const s=t(i);if(s!==null)return s;if(Ds(i)==="/")return"Root prims cannot be the source of a relocate.";if(!e)return null;const n=t(e);return n!==null?n:i===e?"The target of a relocate cannot be the same as its source.":Ku(i,e)?"The target of a relocate cannot be a descendant of its source.":Ku(e,i)?"The target of a relocate cannot be an ancestor of its source.":null}function Q_(i,e,t){const s=new Map,n=new Map,r=[],o=(y,m,g,S)=>{const _=m??"",P=X_(y,_);if(P!==null){t.push(j_({rootSite:e,sourcePath:y,targetPath:_,layer:g,owningPath:S,messages:P}));return}if(s.has(y))return;s.set(y,_),n.set(y,{layer:g,owningPath:S});const w=Ds(y);w!=="/"&&!r.includes(w)&&r.push(w)},a=(y,m)=>m.startsWith("/")?m:`${y==="/"?"":y}/${m}`;for(const{layer:y}of i){const m=y.getField("/","layerRelocates");if(m){const g=Array.isArray(m)?m:Object.entries(m);for(const[S,_]of g)o(S,_,y,"/")}for(const g of y.getSpecPaths()){const S=y.getField(g,"relocates");if(!S)continue;const _=Array.isArray(S)?S:Object.entries(S);for(const[P,w]of _)o(a(g,P),w&&a(g,w),y,g)}}{const y=new Map,m=new Set,g=new Map,S=[],_=w=>n.get(w),P=(w,v,b)=>{const I=_(w),T=_(v);S.push(q_({rootSite:e,sourcePath:w,targetPath:s.get(w),layer:I.layer,owningPath:I.owningPath,conflictSourcePath:v,conflictTargetPath:s.get(v),conflictLayer:T.layer,conflictOwningPath:T.owningPath,conflictReason:b}))};for(const[w,v]of[...s].sort(([b],[I])=>b.localeCompare(I))){if(v){const b=y.get(v);if(b!==void 0){m.add(b),m.add(w);let I=g.get(v);I||g.set(v,I=new Set([b])),I.add(w)}else y.set(v,w);s.has(v)&&(m.add(w),m.add(v),P(w,v,vn.TargetIsConflictSource),P(v,w,vn.SourceIsConflictTarget));for(let I=Ds(v);I!=="/";I=Ds(I))s.has(I)&&(m.add(w),P(w,I,vn.TargetIsConflictSourceDescendant))}for(let b=Ds(w);b!=="/"&&Ds(b)!=="/";b=Ds(b))s.has(b)&&(m.add(w),P(w,b,vn.SourceIsConflictSourceDescendant))}for(const[w,v]of[...g].sort(([b],[I])=>b.localeCompare(I)))t.push(H_({rootSite:{...e,path:""},targetPath:w,sources:[...v].sort().map(b=>({sourcePath:b,..._(b)}))}));S.sort((w,v)=>w.sourcePath.localeCompare(v.sourcePath)||w.conflictReason-v.conflictReason||w.conflictSourcePath.localeCompare(v.conflictSourcePath)),t.push(...S);for(const w of m)s.delete(w)}const c=new Map(s),l=new Map;for(const[y,m]of s)m&&l.set(m,y);const u=l,h=new Map,d=y=>{const m=h.get(y);if(m!==void 0)return m;h.set(y,y);for(let g=y;g!=="/";g=Ds(g)){const S=u.get(g);if(S!==void 0){h.set(y,Y_(y,g,d(S)));break}}return h.get(y)},f=new Map,p=new Map;for(const[y,m]of s){if(!m)continue;const g=d(y);f.set(g,m),p.set(m,g)}return{combinedS2T:f,combinedT2S:p,incrementalS2T:c,incrementalT2S:l,primPaths:r}}function Zu(i,e){return i===e||i.startsWith(e+"/")}function J_(i,e){const t=new Map,s=new Set;for(const[n,r]of i.relocatesSourceToTarget)Zu(n,e)&&r&&(t.set(n,r),s.add(r));for(const[n,r]of i.incrementalRelocatesSourceToTarget)Zu(n,e)&&r&&(s.has(r)||(s.add(r),t.set(n,r)));return t.set("/","/"),K.create(t)}function eS(i){const e=new Map;return t=>{if(!i.hasRelocates)return Ce.null();let s=e.get(t);return s||(s=Ce.newVariable(J_(i,t)),e.set(t,s)),s.getExpression()}}async function Yu(i,e,t,s){return kc(s,"usd-ts:computePcpLayerStack",async n=>(Cc(n,"rootLayer",i.filePath),tS(i,e,t,s,n)))}async function tS(i,e,t,s,n){const r=i.getField("/","expressionVariables")??{},o=t?t.getField("/","expressionVariables")??{}:{},a={...r,...o},c=t?String(t.getField("/","sessionOwner")??""):"",l=w_(i,t),u=De(l,"/"),h=[],d=[],f=Ha(i),p=t?Ha(t):f,m=t!==void 0&&(typeof t.getField("/","timeCodesPerSecond")=="number"||i.getField("/","timeCodesPerSecond")===void 0&&typeof t.getField("/","framesPerSecond")=="number")?p:f;t&&await qa(t,e,{offset:0,scale:m/p},p,new Map,d,a,c,u,h),await qa(i,e,{offset:0,scale:m/f},f,new Map,d,a,c,u,h);const g=Z_(s,"usd-ts:computeRelocations",()=>Q_(d,u,h),n),S={identifier:l,timeCodesPerSecond:m,layers:d,ownExpressionVariables:a,relocatesSourceToTarget:g.combinedS2T,relocatesTargetToSource:g.combinedT2S,incrementalRelocatesSourceToTarget:g.incrementalS2T,incrementalRelocatesTargetToSource:g.incrementalT2S,pathsToPrimsWithRelocates:g.primPaths,hasRelocates:g.incrementalS2T.size>0,localErrors:h,getExpressionForRelocatesAtPath:void 0},_=eS(S);return S.getExpressionForRelocatesAtPath=_,S}function Xu(i,e){return e?{...i,...e}:i}class sS{#s=new Map;isEmpty(){return this.#s.size===0}appendDependencyData(e){e.forEachDependency((t,s)=>{this.addDependencies(t,s)})}addDependencies(e,t){const s=[...t];if(s.length===0)return;let n=this.#s.get(e);n||(n=new Set,this.#s.set(e,n));for(const r of s)n.add(r)}forEachDependency(e){for(const[t,s]of this.#s)e(t,s)}getDependenciesForLayerStack(e){return this.#s.get(e)}}function iS(i){return i.stripAllVariantSelections().pathElementCount}let nS=0;class zi{id;arcType;layerStack;path;mapToParent;mapToRoot;parent;children;_origin;siblingNum;namespaceDepth;inert;specContributionRestrictedDepth;culled;elided;propagatedSpecializes;_isDueToAncestor;_hasTransitiveDirectDependency;siblingNumAtOrigin;expressionVars;constructor(e){this.id=nS++,this.arcType=e.arcType,this.layerStack=e.layerStack,this.path=e.path,this.mapToParent=e.mapToParent,this.mapToRoot=e.mapToRoot,this.parent=e.parent,this.children=[],this._origin=e.origin??null,this.siblingNum=e.siblingNum??0,this.siblingNumAtOrigin=e.siblingNumAtOrigin??0,this.namespaceDepth=e.namespaceDepth??0,this.inert=e.inert??!1,this.specContributionRestrictedDepth=0,this.culled=!1,this.elided=!1,this.propagatedSpecializes=!1,this._isDueToAncestor=!1,this._hasTransitiveDirectDependency=!0,this.expressionVars=e.layerStack.ownExpressionVariables}isRootNode(){return this.parent===null}get origin(){return this._origin??this.parent}set origin(e){this._origin=e===this.parent?null:e}get site(){return new b_(this.layerStack,this.path)}get hasSpecs(){return this.layerStack.layers.some(({layer:e})=>e.hasSpec(F(this.path)))}get isInert(){return this.inert}get isCulled(){return this.culled}get isRestricted(){return!1}get permission(){return"Public"}get hasSymmetry(){return!1}getRootNode(){let e=this;for(;e.parent!==null;)e=e.parent;return e}getOriginNode(){return this.origin}getOriginRootNode(){let e=this;for(;e.origin!==e.parent&&e.origin!==null;)e=e.origin;return e}getDepthBelowIntroduction(){return Gt(this)}getPathAtIntroduction(){return bs(this)}getIntroPath(){if(this.parent===null)return B.absoluteRootPath;let e=this.parent.path;for(let t=this.getDepthBelowIntroduction();t>0;t--){for(;e.isPrimVariantSelectionPath();)e=e.getParentPath();e=e.getParentPath()}return e}isDueToAncestor(){return this._isDueToAncestor||this.arcType===C.Specialize&&this.origin!==this.parent&&this.origin?.isDueToAncestor()===!0}setIsDueToAncestor(e){this._isDueToAncestor=e}hasTransitiveDirectDependency(){if(this._hasTransitiveDirectDependency||this.parent?.parent!==null&&this.parent?.hasTransitiveDirectDependency()===!0)return!0;for(let e=this.parent;e!==null&&e.parent!==null;e=e.parent)if(!e.isDueToAncestor())return!0;return!1}setHasTransitiveDirectDependency(e){this._hasTransitiveDirectDependency=e}hasTransitiveAncestralDependency(){for(let e=this;e!==null;e=e.parent)if(e.isDueToAncestor())return!0;return!1}canContributeSpecs(){return!this.inert&&!this.culled}getSpecContributionRestrictedDepth(){return this.specContributionRestrictedDepth}appendChildName(e){this.path=this.path.appendChild(e);for(const t of this.children)t.appendChildName(e)}appendVariantSelectionToSites(e,t,s){const n=s??this.path;this.path.hasPrefix(n)&&(this.path=this.path.appendVariantSelection(e,t));for(const r of this.children)r.appendVariantSelectionToSites(e,t,n)}clone(e){const t=new Map,s=this._cloneInto(e,t);for(const[n,r]of t)r._origin=n._origin===null?null:t.get(n._origin)??n._origin;return s}_cloneInto(e,t){const s=new zi({arcType:this.arcType,layerStack:this.layerStack,path:this.path,mapToParent:this.mapToParent,mapToRoot:this.mapToRoot,parent:e,origin:this._origin,siblingNum:this.siblingNum,namespaceDepth:this.namespaceDepth,siblingNumAtOrigin:this.siblingNumAtOrigin,inert:this.inert});return s.elided=this.elided,s.propagatedSpecializes=this.propagatedSpecializes,s._isDueToAncestor=this._isDueToAncestor,s._hasTransitiveDirectDependency=this._hasTransitiveDirectDependency,s.expressionVars=this.expressionVars,s.specContributionRestrictedDepth=this.specContributionRestrictedDepth,t.set(this,s),s.children=this.children.map(n=>n._cloneInto(s,t)),s}}function rS(i){const e=t=>{t.setIsDueToAncestor(!0),t.setHasTransitiveDirectDependency(!1);for(const s of t.children)e(s)};for(const t of i.children)e(t)}function In(i){i.elided=!0;for(const e of i.children)In(e)}function vt(i){return i.origin??i.parent}function Fi(i,e){return i.path.pathString===e.path.pathString&&ws(i.layerStack.identifier)===ws(e.layerStack.identifier)}function en(i){if(!Ws(i.arcType)||i.parent===null||i.parent.parent!==null)return!1;const e=vt(i);return e!==null&&Fi(i,e)}function jo(i){if(!Ws(i.arcType))return null;const e=An(i);for(const t of e.children)if(!(t.arcType<C.Specialize)&&vt(t)===i&&en(t))return t;return null}function Wo(i){return vt(i)}function oS(i,e){return Fi(i,e)}function Qu(i){let e=i,t=0;for(;vt(e)!==e.parent;){const s=vt(e);if(s===null)break;e=s,t++}return[e,t]}function aS(i,e){const t=(s,n)=>{let r=s;for(;r!==null;){if(r===n)return!0;r=en(r)?vt(r):r.parent}return!1};return t(i,e)||t(e,i)}function Er(i,e,t){if(i===e)return-1;if(i===t)return 1;for(const s of i.children){const n=Er(s,e,t);if(n!==0)return n}return 0}function An(i){let e=i;for(;e.parent!==null;)e=e.parent;return e}function vp(i){let e=i,t=null;if(en(e)){const n=vt(e);n!==null&&(e=n)}const s=Gt(e);for(;Rs(e.arcType)&&Gt(e)===s&&e.parent!==null;)if(t=e,e=e.parent,en(e)){const n=vt(e);n!==null&&(e=n)}return[e,t]}function cS(i){let e=i;for(;Rs(e.arcType);){const[t,s]=vp(e);if(t===e)break;if(e=t,Rs(t.arcType)){const n=bs(t);if(s!==null&&(s.path.pathString===n.pathString||s.path.hasPrefix(n)))break}}return e}function Ju(i){let[e]=vp(i);for(;e.arcType===C.Relocate&&e.parent!==null;)e=e.parent;return e.namespaceDepth}function eh(i,e){if(i===e)return 0;if(i.arcType!==e.arcType)return i.arcType-e.arcType;if(Ws(i.arcType)){const[t,s]=Qu(i),[n,r]=Qu(e);if(!aS(t,n)){if(i.namespaceDepth>e.namespaceDepth)return-1;if(i.namespaceDepth<e.namespaceDepth)return 1}const o=vt(i),a=vt(e),c=o===i.parent,l=a===e.parent;if(o===a){if(!c&&!l){const u=o!==null&&!Fi(i,o),h=a!==null&&!Fi(e,a);return u&&!h?-1:!u&&h?1:0}}else{if(t!==n)return Er(An(i),t,n);const u=c?0:Ju(o),h=l?0:Ju(a);if(u<h)return-1;if(h<u)return 1;if(s>r)return-1;if(r>s)return 1;const d=ws(An(i).layerStack.identifier),f=ws(i.layerStack.identifier),p=ws(e.layerStack.identifier);if(f===d&&p===d&&!c&&!l){const y=o!==null&&!Fi(i,o),m=a!==null&&!Fi(e,a);if(y&&!m)return-1;if(!y&&m)return 1}return Er(An(i),o,a)}}else{if(i.namespaceDepth>e.namespaceDepth)return-1;if(i.namespaceDepth<e.namespaceDepth)return 1;const t=vt(i),s=vt(e);if(t!==s&&t!==null&&s!==null){const n=Er(An(i),t,s);if(n<0)return-1;if(n>0)return 1}}return i.siblingNumAtOrigin<e.siblingNumAtOrigin?-1:i.siblingNumAtOrigin>e.siblingNumAtOrigin?1:0}function*xt(i){if(!(i.culled||i.elided)){yield i;for(const e of i.children)yield*xt(e)}}function lS(i,e,t=i.getRootNode()){if(i.getRootNode()!==e.getRootNode()||i===e)return 0;for(const s of xt(t)){if(s===i)return-1;if(s===e)return 1}return i.id-e.id}function Ip(i){if(i.elided)return i.culled=!0,!1;const e=!i.inert&&i.layerStack.layers.some(({layer:r})=>r.hasSpec(F(i.path)));let t=!1;for(const r of i.children)Ip(r)&&(t=!0);const s=i.parent!==null&&Gt(i)===0,n=e||t||s;return i.culled=!n&&i.parent!==null,n}function li(i,e){i.mapToRoot=e.compose(i.mapToParent);for(const t of i.children)li(t,i.mapToRoot)}function Ii(i,e){const t=new zi({arcType:e.arcType,layerStack:e.layerStack,path:e.path,mapToParent:e.mapToParent,mapToRoot:i.mapToRoot.compose(e.mapToParent),parent:i,origin:e.origin??null,siblingNum:i.children.length,siblingNumAtOrigin:e.siblingNumAtOrigin??0,namespaceDepth:e.namespaceDepth??0,inert:e.inert??!1});return ks(i,t),t}function ks(i,e){const t=i.children;if(t.length===0||eh(e,t[t.length-1])>=0){t.push(e);return}for(let s=0;s<t.length;s++)if(eh(e,t[s])<0){t.splice(s,0,e);return}t.push(e)}function Gt(i){return i.parent===null?0:iS(i.parent.path)-i.namespaceDepth}function bs(i){let e=i.path;for(let t=Gt(i);t>0;t--){for(;e.isPrimVariantSelectionPath();)e=e.getParentPath();e=e.getParentPath()}return e}function uS(i){let e=i;for(;e.parent!==null;)e=e.parent;return e}function Ap(i,e){if(i.parent===null)return[e,i];let t=i,s=e.stripAllVariantSelections();const n=i.mapToRoot.mapSourceToTarget(s);if(!n.isEmpty())t=uS(i),s=n;else for(;t.parent!==null;){const o=t.mapToParent.mapSourceToTarget(s);if(o.isEmpty())break;t=t.parent,s=o}const r=bs(t);return r.containsPrimVariantSelection()&&(s=s.replacePrefix(r.stripAllVariantSelections(),r)),[s,t]}function Tp(i,e,t){const s=i.parent===null?e:i.mapToRoot.mapSourceToTarget(e);return s.isEmpty()?B.emptyPath:t.parent===null?s:t.mapToRoot.mapTargetToSource(s)}function Ka(i){if(typeof i!="object"||i===null||Array.isArray(i))return!1;const e=Object.getPrototypeOf(i);return e===Object.prototype||e===null}function qo(i){return B.fromString(i.replace(/\/\{/g,"{").replace(/\}\//g,"}"))}function xp(i,e){for(const[t,s]of Object.entries(e)){const n=i[t];Ka(n)&&Ka(s)?xp(n,s):t in i||(i[t]=s)}}class hS{constructor(e,t,s,n,r=0,o=null){this.parentNode=e,this.pathInNode=t,this.composedFieldNames=s,this.composedAttributeNames=n,this.arcNum=r,this.previousFrame=o}futurePayloadIsStrongerThan(e){return C.Payload!==e.arcType?C.Payload<e.arcType:this.parentNode.namespaceDepth!==e.namespaceDepth?this.parentNode.namespaceDepth>e.namespaceDepth:this.arcNum<e.siblingNumAtOrigin}composeInSubtree(e,t,s,n,r,o){const a=s===void 0?F(t):`${F(t)}.${s}`;let c=!1;for(const{layer:l}of e.layerStack.layers){let u=l.getField(a,n);if(u===void 0)continue;const h=d=>{const f=d.getAuthoredPath();let p=d.getEvaluatedPath();if(!p&&Zs(f)){const m=Xn(f,e.expressionVars);typeof m.value=="string"&&(p=m.value)}const y=p||d.getAssetPath();return new Ps({authoredPath:f,evaluatedPath:p,resolvedPath:y?l.resolveAsset(y):""})};if(u instanceof Ps?u=h(u):Array.isArray(u)&&u.every(d=>d instanceof Ps)&&(u=u.map(h)),o(u),c=!0,r)return!0}for(const l of e.children){if(l.inert||l.culled||l.elided)continue;if(e===this.parentNode&&this.futurePayloadIsStrongerThan(l))return c;let u=l.mapToParent.mapTargetToSource(t.stripAllVariantSelections());if(u.isEmpty())continue;const h=bs(l);h.containsPrimVariantSelection()&&(u=u.replacePrefix(h.stripAllVariantSelections(),h));const d=this.composeInSubtree(l,u,s,n,r,o);if(c||=d,r&&d)return!0}return c}composeFromAncestors(e,t,s,n,r,o,a){const[c,l]=Ap(e,t);let u=!1;if(l.parent===null&&s!==null){const h=s.mapToParent.mapSourceToTarget(c.stripAllVariantSelections());if(!h.isEmpty()&&(u=this.composeFromAncestors(s.parentNode,h,s.previousFrame,n,r,o,a),o&&u))return!0}return this.composeInSubtree(l,c,n,r,o,a)||u}composeValue(e){this.composedFieldNames.add(e);let t,s;return this.composeFromAncestors(this.parentNode,qo(this.pathInNode),this.previousFrame,void 0,e,!1,n=>{Ka(n)?(s??={},xp(s,n)):t===void 0&&(t=n)}),s??t}composeValueStack(e){this.composedFieldNames.add(e);const t=[];return this.composeFromAncestors(this.parentNode,qo(this.pathInNode),this.previousFrame,void 0,e,!1,s=>t.push(s)),t}composeAttributeDefaultValue(e){this.composedAttributeNames.add(e);let t;return this.composeFromAncestors(this.parentNode,qo(this.pathInNode),this.previousFrame,e,"default",!0,s=>{t=s}),t}}class Dp{dependencyContexts=[];relevantFieldNames=new Set;relevantAttributeNames=new Set;constructor(e){e&&this.appendDependencyData(e)}isEmpty(){return this.dependencyContexts.length===0}addDependencyContext(e,t,s,n){this.dependencyContexts.push({fileFormat:e,dependencyContextData:t});for(const r of s)this.relevantFieldNames.add(r);for(const r of n)this.relevantAttributeNames.add(r)}appendDependencyData(e){for(const t of e.dependencyContexts)this.dependencyContexts.push(t);for(const t of e.relevantFieldNames)this.relevantFieldNames.add(t);for(const t of e.relevantAttributeNames)this.relevantAttributeNames.add(t)}getRelevantFieldNames(){return this.relevantFieldNames}getRelevantAttributeNames(){return this.relevantAttributeNames}canFieldChangeAffectFileFormatArguments(e,t,s){return this.relevantFieldNames.has(e)?this.dependencyContexts.some(({fileFormat:n,dependencyContextData:r})=>{const o=n.canFieldChangeAffectFileFormatArguments;return o===void 0||o.call(n,e,t,s,r)}):!1}canAttributeDefaultValueChangeAffectFileFormatArguments(e,t,s){return this.relevantAttributeNames.has(e)?this.dependencyContexts.some(({fileFormat:n,dependencyContextData:r})=>{const o=n.canAttributeDefaultValueChangeAffectFileFormatArguments;return o===void 0||o.call(n,e,t,s,r)}):!1}}function dS(i){const e=n=>({assetPath:n.assetPath??"",primPath:n.primPath??"",layerOffset:n.layerOffset??Ls}),t=rs(i)??{isExplicit:!0,explicitItems:[i],deletedItems:[],prependedItems:[],appendedItems:[],orderedItems:[]},s=n=>n.map(e);return{isExplicit:t.isExplicit,explicitItems:s(t.explicitItems),deletedItems:s(t.deletedItems),prependedItems:s(t.prependedItems),appendedItems:s(t.appendedItems),orderedItems:s(t.orderedItems)}}const Ho=i=>`${i._resolvedAssetPath??i.assetPath}|${i.primPath}|${i.layerOffset.offset}|${i.layerOffset.scale}`;function kp(i,e,t,s,n){const r=c=>{if(!Zs(c))return c;const l=Xn(c,s);for(const u of l.usedVariables)n?.add(u);return typeof l.value=="string"?l.value:c};let o=[];const a=new Map;for(let c=i.layers.length-1;c>=0;c--){const l=i.layers[c],u=l.layer,h=u.getField(e,t);if(h==null)continue;const d=m=>{if(!m.assetPath)return m;const g=r(m.assetPath);return{...m,assetPath:g,_resolvedAssetPath:u.resolveAsset(g)}},f=m=>(a.set(Ho(m),l),m),p=dS(h),y={isExplicit:p.isExplicit,explicitItems:p.explicitItems.map(d).map(f),prependedItems:p.prependedItems.map(d).map(f),appendedItems:p.appendedItems.map(d).map(f),deletedItems:p.deletedItems.map(d),orderedItems:p.orderedItems.map(d)};o=Ks(o,y,{key:Ho})}return o.map(c=>{const l=a.get(Ho(c));return l?c.assetPath?{...c,layerOffset:os(l.offset,c.layerOffset),sourceLayer:l.layer}:{...c,sourceLayer:l.layer}:c})}function pS(i,e,t={},s){return kp(i,e,"references",t,s)}function Za(i,e,t={},s){return kp(i,e,"payload",t,s)}function Cp(i,e,t){const s=o=>{if(o.startsWith("/"))return o;const a=e.split("/").filter(Boolean);for(const c of o.split("/"))if(!(!c||c==="."))if(c===".."){if(a.length===0)return"";a.pop()}else a.push(c);return`/${a.join("/")}`},n=o=>Array.isArray(o)?o.filter(a=>typeof a=="string").map(s):[];let r=[];for(let o=i.layers.length-1;o>=0;o--){const a=i.layers[o].layer.getField(e,t);if(a==null)continue;const c=rs(a);c&&(r=Ks(r,{...c,explicitItems:n(c.explicitItems),deletedItems:n(c.deletedItems),prependedItems:n(c.prependedItems),appendedItems:n(c.appendedItems),orderedItems:n(c.orderedItems)}))}return r}function fS(i,e){return Cp(i,e,"inheritPaths")}function mS(i,e){return Cp(i,e,"specializes")}function th(i,e){let t=[];for(let n=i.layers.length-1;n>=0;n--){const r=i.layers[n].layer.getField(e,"variantSetNames");if(r==null)continue;const o=rs(r);o&&(t=Ks(t,o))}const s=new Set(t);for(const{layer:n}of i.layers){const r=n.getField(e,"variantSetChildren");for(const o of r??[])s.has(o)||(s.add(o),t.push(o))}return t}function sh(i,e,t){const s=new Set;for(const{layer:n}of i.layers){const r=n.getField(`${e}{${t}=}`,"variantChildren");if(r)for(const o of r)s.add(o)}return s}function Np(i,e,t,s,n,r="/",o){if(!Zs(i))return i;const a=Xn(i,e);for(const c of a.usedVariables)o?.add(c);return a.errors.length>0&&t&&s&&n&&t.push(bp({rootSite:{...s,path:""},expression:i,expressionError:a.errors.join("; "),context:"variant",sourceLayer:n,sourcePath:r})),a.errors.length===0&&typeof a.value=="string"?a.value:void 0}function gS(i,e,t,s={},n,r,o){for(const{layer:a}of i.layers){const l=a.getField(e,"variantSelection")?.[t]?.[0];if(l===void 0)continue;const u=Np(l,s,n,r,a,e,o);if(u!==void 0)return u}}function yS(i,e,t={}){const s={};for(const{layer:n}of i.layers){const r=n.getField(e,"variantSelection");if(r)for(const[o,a]of Object.entries(r)){if(o in s||a?.[0]===void 0)continue;const c=Np(a[0],t);c!==void 0&&(s[o]=c)}}return s}function _S(i,e,t=[]){const s=new Set(t),n=[...t];for(let r=i.layers.length-1;r>=0;r--){const{layer:o}=i.layers[r],a=o.getField(e,"primChildren");if(a)for(const l of a)s.has(l)||(s.add(l),n.push(l));const c=o.getField(e,"primOrder");if(c?.length){const l=qd(n,c);n.splice(0,n.length,...l)}}return n}function Rn(i,e){for(const{layer:t}of i.layers)if(t.hasSpec(e))return!0;return!1}function SS(i){if(!i.inert)return!0;if(i.arcType===C.Specialize){if(i.parent!==i.getRootNode()||i.origin!==i.parent)return!1}else if(i.arcType===C.Inherit&&i.origin!==i.parent)return!1;return!0}function PS(i){if(i.arcType===C.Root)return 1;let e=0;if(i.inert){if(!SS(i))return 0;e|=16}const t=i.hasTransitiveDirectDependency(),s=i.hasTransitiveAncestralDependency();return t?e|=s?4:2:s&&(e|=8),e&16||(e|=32),e}function wS(i){const e=[];return i===0&&e.push("none"),i===1&&e.push("root"),i&2&&e.push("purely-direct"),i&4&&e.push("partly-direct"),i&8&&e.push("ancestral"),i&16&&e.push("virtual"),i&32&&e.push("non-virtual"),e.sort().join(", ")}const bS={[C.Root]:"root",[C.Inherit]:"inherit",[C.Variant]:"variant",[C.Relocate]:"relocate",[C.Reference]:"reference",[C.Payload]:"payload",[C.Specialize]:"specialize"};function Ai(i){return i?"TRUE":"FALSE"}function vS(i){const e=i.replaceAll("\\","/");return e.slice(e.lastIndexOf("/")+1)}function IS(i){const e=[],t=i.getTimeOffset();(t.offset!==0||t.scale!==1)&&e.push(`SdfLayerOffset(offset = ${t.offset}; scale = ${t.scale})`);for(const[s,n]of i.getSourceToTargetMap())e.push(`${s} -> ${n}`);return e.join(`
`)}function ih(i){return IS(i).replaceAll(`
`,`
        `)}function AS(i,e=!0,t=!0){if(!i.isValid())return"";const s=[],n=a=>{if(!(a.elided||a.culled&&!a.hasSpecs)){s.push(a);for(const c of a.children)n(c)}};n(i.rootNode);const r=new Map(s.map((a,c)=>[a,c])),o=a=>{const c=a.parent;let l=`Node ${r.get(a)??0}:
`;l+=`    Parent node:              ${c?r.get(c):"NONE"}
`,l+=`    Type:                     ${bS[a.arcType]}
`,l+=`    DependencyType:           ${wS(PS(a))}
`,l+=`    Source path:              <${a.path.pathString}>
`,l+=`    Source layer stack:       ${Wa(a.layerStack.identifier)}
`,l+=`    Target path:              <${c?c.path.pathString:"NONE"}>
`,l+=`    Target layer stack:       ${c?Wa(c.layerStack.identifier):"NONE"}
`,a.origin!==c&&(l+=`    Origin node:              ${a.origin?r.get(a.origin):0}
`,l+=`    Sibling # at origin:      ${a.siblingNumAtOrigin}
`),t&&(l+=`    Map to parent:
        ${ih(a.mapToParent)}
`,l+=`    Map to root:
        ${ih(a.mapToRoot)}
`),l+=`    Namespace depth:          ${a.namespaceDepth}
`,l+=`    Depth below introduction: ${a.getDepthBelowIntroduction()}
`,l+=`    Is due to ancestor:       ${Ai(a.isDueToAncestor())}
`,l+=`    Permission:               ${a.permission}
`,l+=`    Is restricted:            ${Ai(a.isRestricted)}
`,l+=`    Is inert:                 ${Ai(a.isInert)}
`,l+=`    Contribute specs:         ${Ai(a.canContributeSpecs())}
`;const u=a.getSpecContributionRestrictedDepth()||(a.isInert?a.namespaceDepth:0);if(l+=`        Restricted at depth:  ${u}
`,l+=`    Has specs:                ${Ai(a.hasSpecs)}
`,l+=`    Has symmetry:             ${Ai(a.hasSymmetry)}
`,a.hasSpecs&&a.canContributeSpecs()){l+=`    Prim stack:
`;for(const{layer:h}of a.layerStack.layers)h.hasSpec(F(a.path))&&(l+=`      <${a.path.pathString}> ${vS(h.filePath)} - @${h.filePath}@
`)}for(const h of a.children)r.has(h)&&(l+=o(h));return l+=`
`,l};return`${o(i.rootNode)}
`}function mo(i){return i.hasTransitiveDirectDependency()&&!i.inert&&!i.culled&&Rn(i.layerStack,F(i.path))}function*TS(i){yield[i,!1];function*e(t){if(t.culled)return;const s=mo(t);yield[t,s];for(const n of t.children)yield*e(n)}for(const t of i.children)yield*e(t)}function Nc(i){let e=!1;for(const[,t]of TS(i))if(t){e=!0;break}if(!e)return!1;for(const t of xt(i))if(!(t.inert||t.culled))for(const{layer:s}of t.layerStack.layers){const n=s.getField(F(t.path),"instanceable");if(n!==void 0)return n===!0}return!1}function xS(i){const e=(t,s)=>{if(!t.culled&&!(!s&&mo(t))){t.inert=!0;for(const n of t.children)e(n,!1)}};e(i,!0)}function DS(i){return typeof i=="object"&&i!==null&&typeof i.composeFieldsForFileFormatArguments=="function"}function hr(i){for(let e=i;e!==null;e=e.previousFrame)if(e.skipDuplicateNodes)return!0;return!1}function rt(i){return ws(i.identifier)}function Ns(i){let e=i;for(;e.parent!==null;)e=e.parent;return e}function nh(i,e){return e.isAbsoluteRootPath()?!0:i.pathString===e.pathString||i.hasPrefix(e)}function Mp(i,e,t){return e.isAbsoluteRootPath()&&t.isAbsoluteRootPath()?i:i.replacePrefix(e,t)}function Ya(i,e){return`${i}::${e.pathString}`}function kS(i){return Ya(rt(i.layerStack),i.path)}class CS extends Set{constructor(e){super(),this.outputs=e}sitesByGraph=new Map;registerSubtree(e,t=e){let s=this.sitesByGraph.get(e);s||(s=new Map,this.sitesByGraph.set(e,s));const n=kS(t);let r=s.get(n);r||(r=new Set,s.set(n,r)),r.add(t);for(const o of t.children)this.registerSubtree(e,o)}hasSite(e,t,s){return(this.sitesByGraph.get(e)?.get(Ya(t,s))?.size??0)>0}hasContributingSite(e,t,s){return[...this.sitesByGraph.get(e)?.get(Ya(t,s))??[]].some(n=>!n.inert&&!n.culled&&!n.elided)}rejectDuplicateArc(e,t,s,n){let r=s,o=e,a=n;for(;o!==null;){const c=Ns(o);if(this.hasContributingSite(c,t,r))return!0;if(a===null)break;r=Mp(a.requestedPath,c.path,r),o=a.parentNode,a=a.previousFrame}return!1}}class ss{primIndex=new Ep;allErrors=[];dynamicFileFormatDependency=new Dp;expressionVariablesDependency=new sS;culledDependencies=[];payloadState=ss.PayloadState.NoPayload;setPayloadState(e){this.payloadState===ss.PayloadState.NoPayload&&(this.payloadState=e)}}function rh(i,e){return`${i.id}:${e}`}function NS(i){return i===7||i===6||i===14||i===15||i===16||i===9||i===10||i===11}function oh(i,e){for(let t=e.parent;t!==null;t=t.parent)if(t===i)return!0;return!1}function MS(i,e,t){if(i.type!==e.type)return i.type-e.type;if(i.node===e.node)return 0;if(i.type===7){if(oh(i.node,e.node))return 1;if(oh(e.node,i.node))return-1}const s=t(i.node,e.node);return s!==0?s:i.node.id-e.node.id}class Mc{tasks=[];done=new Set;cmp;root;processed=0;static MAX_TASKS=2e6;constructor(e,t){this.root=e,this.cmp=t}add(e,t){const s=rh(e,t);return this.done.has(s)&&!NS(t)||this.tasks.some(n=>n.node===e&&n.type===t)?!1:(this.tasks.push({type:t,node:e}),!0)}addTasksForNode(e){!e.inert&&!e.culled&&(this.add(e,0),this.add(e,2),this.add(e,3),this.add(e,17),this.add(e,12),this.add(e,4),this.add(e,5),this.add(e,14),this.add(e,9)),this.add(e,1),this.armPostStructuralTasks()}armPostStructuralTasks(){this.add(this.root,6)}addTasksForSubtree(e){this.addTasksForNode(e);for(const t of e.children)this.addTasksForSubtree(t)}retryVariantTasks(){for(const e of this.tasks)e.type===16?this.add(e.node,14):e.type===11&&this.add(e.node,9)}armVariantsForGraph(e){this.add(e,14),this.add(e,9);for(const t of e.children)this.armVariantsForGraph(t)}pop(){if(this.tasks.length===0)return null;if(++this.processed>Mc.MAX_TASKS)throw new Error("PcpTaskQueue exceeded task cap — a task is being re-issued (non-terminating build).");let e=0;for(let s=1;s<this.tasks.length;s++)MS(this.tasks[s],this.tasks[e],this.cmp)<0&&(e=s);const[t]=this.tasks.splice(e,1);return this.done.add(rh(t.node,t.type)),t}}const Ci=B.absoluteRootPath;function ES(i){let e=i;for(;!e.isEmpty();){if(e.isPrimVariantSelectionPath())return e.getVariantSelection();e=e.getParentPath()}return null}const BS=new Set([0,2,3,4,5]);function ah(i,e,t,s=null){let n=t,r=i,o=s;for(;r!==null;){for(let c=r;c!==null;c=c.parent)if(rt(c.layerStack)===e&&(nh(c.path,n)||nh(n,c.path)))return!0;if(o===null)break;const a=Ns(r).path;n=Mp(o.requestedPath,a,n),r=o.parentNode,o=o.previousFrame}return!1}function zt(i){return De(i.layerStack.identifier,i.path.pathString)}function ch(i,e,t,s,n){const r=[];let o=i,a=e;for(;o!==null;){const c=o.arcType!==C.Root?o.arcType:a!==null?a.arcType:o.arcType;r.push({site:De(o.layerStack.identifier,o.path.pathString),arcType:c}),o.parent!==null?o=o.parent:a!==null?(o=a.parentNode,a=a.previousFrame):o=null}return r.reverse(),r.push({site:De(s.identifier,n.pathString),arcType:t}),G_(r)}function Ko(i){for(const e of xt(i))if(!(e.inert||!e.layerStack.hasRelocates)&&e.layerStack.incrementalRelocatesSourceToTarget.has(e.path.pathString))return!0;return!1}function OS(i){for(const e of xt(i))if(!e.inert&&e.layerStack.hasRelocates&&e.layerStack.incrementalRelocatesSourceToTarget.has(e.path.pathString))return e}function RS(i){return i.layerStack.hasRelocates&&i.layerStack.incrementalRelocatesSourceToTarget.has(i.path.pathString)}function Ti(i){const e=i.getParentPath();return e.isEmpty()?Ci:e}function FS(i){return i.name}function me(i){return i.stripAllVariantSelections().pathElementCount}function lh(i,e,t){const s=t.stripAllVariantSelections(),n=e.layerStack.getExpressionForRelocatesAtPath(s.pathString);return n.isNull()?i:n.evaluate().compose(i)}function GS(i,e){if(i.arcType!==C.Variant)return e;const t=bs(i),s=t.stripAllVariantSelections();return e.replacePrefix(s,t)}function $S(i,e,t){const s=e.stripAllVariantSelections();for(const n of xt(i)){if(n.arcType!==C.Variant)continue;const r=bs(n),o=ES(r);if(!o||o[0]!==t)continue;const a=n===i?s:Tp(i,s,n);if(!a.isEmpty()&&r.stripAllVariantSelections().pathString===a.stripAllVariantSelections().pathString)return o[1]}}function LS(i,e,t,s,n,r){const o=e.stripAllVariantSelections();for(const a of xt(i)){let c=a===i?o:Tp(i,o,a);if(c.isEmpty())continue;c=c.stripAllVariantSelections();const l=new Set,u=gS(a.layerStack,F(GS(a,c)),t,a.expressionVars,s,n,l);if(r.expressionVariablesDependency.addDependencies(a.layerStack,l),u!==void 0)return u}}function uh(i,e,t,s,n,r){const[o,a]=Ap(i,e);if(o.isEmpty())return;const c=$S(a,o,t);return c!==void 0?c:LS(a,o,t,s,n,r)}class Zr{constructor(e,t,s,n,r){this.payloadIncluded=s,this.payloadInclusionSource=n,this.traceContext=r,this.rootLayerStack=e,this.opener=t,this.layerStackRegistry.set(ws(e.identifier),e)}opener;rootLayerStack;layerStackRegistry=new Map;static async create(e,t,s,n=()=>!0,r="includeSet",o={current:void 0}){const a=await Yu(e,t,s,o);return new Zr(a,t,n,r,o)}getLayerStack(){return this.rootLayerStack}variantFallbacks={};setVariantFallbacks(e){this.variantFallbacks=e,this.treeCache.clear(),this.treeErrors.clear()}invalidateBuildState(){this.treeCache.clear(),this.treeErrors.clear()}getVariantFallbacks(){return this.variantFallbacks}async layerStackFor(e){const t=ws({rootLayer:e}),s=this.layerStackRegistry.get(t);if(s)return s;const n=await Yu(e,this.opener,void 0,this.traceContext);return this.layerStackRegistry.set(t,n),n}async buildPrimIndex(e,t=this.traceContext.current){return kc(this.traceContext,"usd-ts:PcpPrimIndexer.buildPrimIndex",async s=>(Cc(s,"primPath",e),this._buildPrimIndex(e)),t)}async _buildPrimIndex(e){const t=B.fromString(e),s=new ss,r=(await this.buildNodeTree(this.rootLayerStack,t,new CS(s))).clone(null);Ip(r);const o=a=>{if(a.culled&&!a.isRootNode()){let c=B.emptyPath;if(a.arcType===C.Relocate){let l=a.parent;for(;l?.arcType===C.Relocate;)l=l.parent;c=l?.path??B.emptyPath}s.culledDependencies.push({arcType:a.arcType,layerStack:a.layerStack,sitePath:a.path,unrelocatedSitePath:c,mapToRoot:a.mapToRoot})}for(const c of a.children)o(c)};if(o(r),Ko(r)){r.inert=!0;for(const a of r.children)In(a)}return s.primIndex=new Ep(r,e,s.allErrors),s}treeCache=new Map;treeErrors=new Map;refSourceLayers=new WeakMap;async buildNodeTree(e,t,s,n=null){const r=s.outputs,o=`${rt(e)}::${t.pathString}`;if(n===null){const p=this.treeCache.get(o);if(p)return r.allErrors.push(...this.treeErrors.get(o)??[]),p}if(s.has(o))return new zi({arcType:C.Root,layerStack:e,path:t,mapToParent:K.identity(),mapToRoot:K.identity(),parent:null});s.add(o);const a=r.allErrors.length;let c;if(t.isAbsoluteRootPath()||t.isPrimVariantSelectionPath())c=new zi({arcType:C.Root,layerStack:e,path:t,mapToParent:K.identity(),mapToRoot:K.identity(),parent:null});else{const p=r.allErrors.length,y=await this.buildNodeTree(e,Ti(t),s,n);if(n===null){const g=r.allErrors.splice(p);r.allErrors.push(...g.filter(S=>S.errorType!==Nr.ArcCycle&&S.errorType!==Nr.OpinionAtRelocationSource))}const m=Nc(y);c=y.clone(null),m&&xS(c),c.appendChildName(FS(t)),rS(c)}n!==null&&n.directNodeShouldContributeSpecs===!1&&n.requestedPath.pathString===t.pathString&&(c.inert=!0,c.specContributionRestrictedDepth=me(t));const l=n!==null&&n.arcType!==C.Relocate&&RS(c);if(!t.isPrimVariantSelectionPath()&&(l||Ko(c))){const p=n!==null?OS(c):void 0;n!==null&&p&&!c.path.containsPrimVariantSelection()&&!p.path.containsPrimVariantSelection()&&r.allErrors.push(zo({rootSite:zt(Ns(n.parentNode)),site:De(n.parentNode.layerStack.identifier,n.parentNode.path.pathString),targetSite:De(c.layerStack.identifier,n.requestedPath.pathString),relocationSourceSite:De(p.layerStack.identifier,p.path.pathString),arcType:n.arcType})),c.inert=!0;for(const y of c.children)In(y);return s.delete(o),n===null&&(this.treeCache.set(o,c),this.treeErrors.set(o,r.allErrors.slice(a))),c}s.registerSubtree(c);const u=new Mc(c,(p,y)=>lS(p,y,c));u.addTasksForSubtree(c);const h=[],d=[];let f=u.pop();for(;f!==null;){const p=f.node;if(!p.elided){switch(f.type){case 0:await this.evalRelocations(p,c,s,n,d);break;case 1:this.evalImpliedRelocations(p,u,s);break;case 2:await this.evalRefOrPayload(p,C.Reference,h,s,n,c,d);break;case 3:await this.evalRefOrPayload(p,C.Payload,h,s,n,c,d,"static");break;case 4:await this.evalClassArc(p,c,C.Inherit,s,n,d);break;case 5:await this.evalClassArc(p,c,C.Specialize,s,n,d);break;case 14:if(n===null){const y=this.evalVariants(p,h,s,!1);y.added&&(u.armPostStructuralTasks(),u.armVariantsForGraph(c)),y.unresolved&&u.add(p,15)}break;case 9:if(n===null){const y=await this.evalAncestralVariants(p,c,s,n,d,!1);y.added&&(u.armPostStructuralTasks(),u.armVariantsForGraph(c)),y.unresolved&&u.add(p,10)}break;case 15:n===null&&this.evalVariants(p,h,s,!0).added&&(u.armPostStructuralTasks(),u.armVariantsForGraph(c));break;case 10:n===null&&(await this.evalAncestralVariants(p,c,s,n,d,!0)).added&&(u.armPostStructuralTasks(),u.armVariantsForGraph(c));break;case 17:await this.evalRefOrPayload(p,C.Payload,h,s,n,c,d,"dynamic");break;case 12:await this.evalAncestralDynamicPayloads(p,h,s,n,c,d);break;case 6:n===null&&await this.evalImpliedSpecializes(c,c,s,n,u)&&(u.armPostStructuralTasks(),u.armVariantsForGraph(c));break;case 7:await this.evalImpliedClassesAtNode(p,c,s,n,u)&&(u.armPostStructuralTasks(),u.armVariantsForGraph(c));break;case 16:case 11:break;case 18:this.evalUnresolvedPrimPathError(p,c,r);break}for(const y of h)u.addTasksForNode(y),this.armImpliedClassTasks(y,u),n===null&&(y.arcType===C.Reference||y.arcType===C.Payload)&&u.add(y,18);h.length=0;for(const y of d)if(y.arcType===C.Relocate&&u.add(y,1),this.armImpliedClassTasks(y,u),n===null)for(const m of xt(y))(m.arcType===C.Reference||m.arcType===C.Payload)&&u.add(m,18);d.length=0,n===null&&BS.has(f.type)&&u.armVariantsForGraph(c)}f=u.pop()}if(!t.isPrimVariantSelectionPath()&&Ko(c)){c.inert=!0;for(const p of c.children)In(p)}return s.delete(o),n===null&&(this.treeCache.set(o,c),this.treeErrors.set(o,r.allErrors.slice(a))),c}async evalImpliedSpecializes(e,t,s,n,r){return this.findSpecializesToPropagateToRoot(e,t,s,n,r)}async findSpecializesToPropagateToRoot(e,t,s,n,r){let o=!1;if(this.isRelocatesPlaceholderImpliedArc(e))return!1;Ws(e.arcType)&&!en(e)&&await this.propagateNodeToRoot(e,t,s,n,r)&&(o=!0);for(const a of[...e.children])await this.findSpecializesToPropagateToRoot(a,t,s,n,r)&&(o=!0);return o}isRelocatesPlaceholderImpliedArc(e){const t=e.parent;return t===null?!1:Wo(e)!==t&&t.arcType===C.Relocate&&oS(e,t)}async propagateNodeToRoot(e,t,s,n,r){const o=rt(e.layerStack);if(t.children.find(h=>h.arcType===C.Specialize&&h.path.pathString===e.path.pathString&&rt(h.layerStack)===o)||s.rejectDuplicateArc(t,o,e.path,n))return!1;const c=me(e.path)>1,l=e.mapToRoot;let u;if(c){const h={previousFrame:n,requestedPath:e.path,parentNode:t,mapToParent:l,arcType:C.Specialize,skipDuplicateNodes:!0};u=(await this.buildNodeTree(e.layerStack,e.path,s,h)).clone(t),u.arcType=C.Specialize,u.mapToParent=l,u.origin=e,u.siblingNumAtOrigin=e.siblingNumAtOrigin,u.namespaceDepth=me(t.path),u.inert=!1,u.propagatedSpecializes=!0,li(u,t.mapToRoot),ks(t,u),s.registerSubtree(t,u),this.armImpliedClassTasks(u,r)}else u=new zi({arcType:C.Specialize,layerStack:e.layerStack,path:e.path,mapToParent:l,mapToRoot:t.mapToRoot.compose(l),parent:t,origin:e,siblingNumAtOrigin:e.siblingNumAtOrigin,namespaceDepth:me(t.path),inert:!1}),u.propagatedSpecializes=!0,ks(t,u),s.registerSubtree(t,u),await this.evalNodeArcs(u,t,s,n,r),this.armImpliedClassTasks(u,r);return!0}async evalImpliedClassesAtNode(e,t,s,n,r){if(e.parent===null||en(e)||!this.nodeIsInGraph(e,t)||!this.hasClassBasedChild(e))return!1;const o=e.mapToParent.addRootIdentity();return this.evalImpliedClassTree(e.parent,e,o,!0,t,s,n,r)}nodeIsInGraph(e,t){let s=e;for(;s.parent!==null;){if(!s.parent.children.includes(s))return!1;s=s.parent}return s===t}armImpliedClassTasks(e,t){Rs(e.arcType)?t.add(cS(e),7):this.hasClassBasedChild(e)&&t.add(e,7)}hasClassBasedChild(e){return(jo(e)??e).children.some(s=>Rs(s.arcType))}async evalImpliedClassTree(e,t,s,n,r,o,a,c){if(e.arcType===C.Relocate){const h=e.mapToParent.addRootIdentity().compose(s);return c.add(e,7),e.parent===null?!1:await this.evalImpliedClassTree(e.parent,t,h,n,r,o,a,c)}const l=jo(t)??t;let u=!1;for(const h of[...l.children]){if(!Rs(h.arcType)||n&&Rs(t.arcType)&&Gt(t)===Gt(h))continue;const d=K.impliedClass(s,h.mapToParent),f=d.mapTargetToSource(e.path);let p=e.children.find(y=>!y.propagatedSpecializes&&Wo(y)===h)??null;if(p===null&&!f.isEmpty()&&(p=await this.addClassBasedArc(h.arcType,e,h,d,h.siblingNumAtOrigin,h,r,o,a,c),p!==null&&(u=!0)),p!==null&&this.hasClassBasedChild(h)){const y=jo(p)??p;await this.evalImpliedClassTree(y,h,s,!1,r,o,a,c)&&(u=!0)}}return u}async addClassBasedArc(e,t,s,n,r,o,a,c,l,u){const h=n.mapTargetToSource(t.path);if(h.isEmpty())return null;const d=rt(t.layerStack),f=rt(o.layerStack),p=h.pathString===o.path.pathString&&d===f,m=(t.parent===null&&l!==null?l.arcType:t.arcType)===C.Relocate?t.children.find(w=>w.arcType===e&&w.mapToParent.equals(n)&&Gt(Wo(w)??w)===Gt(s)):t.children.find(w=>w.path.pathString===h.pathString&&rt(w.layerStack)===d);if(m)return Ws(e)&&t.parent===null&&l===null?null:m;if(Ws(e)&&(t.parent!==null||l!==null)){const v=Ii(t,{arcType:e,layerStack:t.layerStack,path:h,mapToParent:n,origin:s,siblingNumAtOrigin:r,namespaceDepth:me(t.path),inert:!0});return c.registerSubtree(a,v),l===null&&!this.isRelocatesPlaceholderImpliedArc(v)&&(await this.propagateNodeToRoot(v,a,c,l,u)||this.armImpliedClassTasks(v,u)),v}const g=h.pathString!==t.path.pathString&&!p;if((g||hr(l))&&c.rejectDuplicateArc(t,d,h,l))return null;const _=g&&!t.inert;let P;if(_&&me(h)>1){const w={previousFrame:l,requestedPath:h,parentNode:t,mapToParent:n,arcType:e,skipDuplicateNodes:!0};P=(await this.buildNodeTree(t.layerStack,h,c,w)).clone(t),P.arcType=e,P.mapToParent=n,P.origin=s,P.siblingNumAtOrigin=r,P.namespaceDepth=me(t.path),P.inert=!1,li(P,t.mapToRoot),ks(t,P),c.registerSubtree(a,P)}else P=Ii(t,{arcType:e,layerStack:t.layerStack,path:h,mapToParent:n,origin:s,siblingNumAtOrigin:r,namespaceDepth:me(t.path),inert:!_}),_||(P.specContributionRestrictedDepth=1),c.registerSubtree(a,P),_&&await this.evalNodeArcs(P,a,c,l,u);return this.armImpliedClassTasks(P,u),P}async evalNodeArcs(e,t,s,n,r){const o=[e],a=[];for(;o.length>0;){const c=o.shift();await this.evalRelocations(c,t,s,n,a),await this.evalRefOrPayload(c,C.Reference,o,s,n,t,a),await this.evalRefOrPayload(c,C.Payload,o,s,n,t,a),await this.evalClassArc(c,t,C.Inherit,s,n,a),await this.evalClassArc(c,t,C.Specialize,s,n,a);for(const l of a)this.armImpliedClassTasks(l,r);a.length=0}}async evalRelocations(e,t,s,n,r){const o=e.layerStack;if(!o.hasRelocates)return;const a=o.incrementalRelocatesTargetToSource.get(e.path.pathString);if(a===void 0||a===e.path.pathString)return;const c=B.fromString(a);for(const d of e.children)d.arcType!==C.Variant&&In(d);const l={previousFrame:n,requestedPath:c,parentNode:e,mapToParent:K.identity(),arcType:C.Relocate,skipDuplicateNodes:!1,directNodeShouldContributeSpecs:!1},u=(await this.buildNodeTree(o,c,s,l)).clone(e);u.arcType=C.Relocate,u.mapToParent=K.identity(),u.origin=e,u.namespaceDepth=me(e.path),u.inert=!0,li(u,e.mapToRoot),ks(e,u),s.registerSubtree(t,u),r.push(u);const h=F(c);for(const{layer:d}of o.layers)if(d.hasSpec(h)){const f=n!==null&&n.requestedPath.pathString===e.path.pathString&&me(e.path)===1?Ns(n.parentNode):Ns(e);s.outputs.allErrors.push(K_({rootSite:zt(f),layer:d,path:a}))}}evalImpliedRelocations(e,t,s){if(e.arcType!==C.Relocate||e.isDueToAncestor())return;const n=e.parent;if(n===null)return;const r=n.parent;if(r===null)return;const o=n.mapToParent.mapSourceToTarget(e.path);if(o.isEmpty()||r.children.some(c=>c.arcType===C.Relocate&&c.path.pathString===o.pathString))return;const a=Ii(r,{arcType:C.Relocate,layerStack:r.layerStack,path:o,mapToParent:K.identity(),origin:e,namespaceDepth:me(r.path),inert:!0});s.registerSubtree(Ns(r),a),t.addTasksForNode(a)}async evalClassArc(e,t,s,n,r,o){const a=s===C.Inherit?fS(e.layerStack,F(e.path)):mS(e.layerStack,F(e.path));if(a.length!==0)for(let c=0;c<a.length;c++){const l=a[c],u=l.startsWith("/")?B.fromString(l):e.path.appendChild(l);if(!u.isPrimPath()||u.containsPrimVariantSelection()){n.outputs.allErrors.push(Hu({rootSite:zt(t),site:De(e.layerStack.identifier,e.path.pathString),primPath:l,sourceLayer:void 0,arcType:s}));continue}if(ah(e,rt(e.layerStack),u,r)){n.outputs.allErrors.push(ch(e,r,s,e.layerStack,u));continue}if(e.layerStack.hasRelocates&&e.layerStack.incrementalRelocatesSourceToTarget.has(u.pathString)){t.path.containsPrimVariantSelection()||n.outputs.allErrors.push(zo({rootSite:zt(t),site:De(e.layerStack.identifier,e.path.pathString),targetSite:De(e.layerStack.identifier,u.pathString),relocationSourceSite:De(e.layerStack.identifier,u.pathString),arcType:s}));continue}const h=K.create([[Ci,Ci],[u,e.path.stripAllVariantSelections()]]),d=h.mapTargetToSource(e.path),f=d.isEmpty()?u:d,p=lh(h,e,e.path);if(hr(r)&&n.rejectDuplicateArc(e,rt(e.layerStack),f,r))continue;if(s===C.Specialize&&(e.parent!==null||r!==null)){const g=Ii(e,{arcType:C.Specialize,layerStack:e.layerStack,path:f,mapToParent:p,origin:e,siblingNumAtOrigin:c,namespaceDepth:me(e.path),inert:!0});n.registerSubtree(t,g);continue}const y={previousFrame:r,requestedPath:f,parentNode:e,arcType:s,mapToParent:p,skipDuplicateNodes:!0},m=(await this.buildNodeTree(e.layerStack,f,n,y)).clone(e);m.arcType=s,m.mapToParent=p,m.origin=e,m.namespaceDepth=me(e.path),m.siblingNumAtOrigin=c,li(m,e.mapToRoot),ks(e,m),n.registerSubtree(t,m),o.push(m)}}evalVariants(e,t,s,n){if(e.inert)return{added:!1,unresolved:!1};let r=!1,o=!1;const a=e.path.stripAllVariantSelections(),c=th(e.layerStack,F(e.path));for(let l=0;l<c.length;l++){const u=c[l];let h=uh(e,a,u,s.outputs.allErrors,zt(Ns(e)),s.outputs);if(h===void 0&&n){const p=sh(e.layerStack,F(a),u);h=(this.variantFallbacks[u]??[]).find(y=>p.has(y))}if(h===void 0){o=!0;continue}const d=e.path.appendVariantSelection(u,h);if(e.children.some(p=>p.arcType===C.Variant&&p.path.pathString===d.pathString)||!Rn(e.layerStack,F(d)))continue;const f=Ii(e,{arcType:C.Variant,layerStack:e.layerStack,path:d,mapToParent:K.identity(),origin:e,namespaceDepth:me(e.path),siblingNumAtOrigin:l});s.registerSubtree(Ns(e),f),t.push(f),r=!0}return{added:r,unresolved:o}}async evalAncestralVariants(e,t,s,n,r,o){let a=!1,c=!1,l=Ti(e.path);for(;!l.isAbsoluteRootPath()&&me(l)>=1&&!l.containsPrimVariantSelection();){if(e.specContributionRestrictedDepth!==0&&e.specContributionRestrictedDepth<=me(l)){l=Ti(l);continue}const u=th(e.layerStack,F(l));for(let h=0;h<u.length;h++){const d=u[h];let f=uh(e,l,d,s.outputs.allErrors,zt(t),s.outputs);if(f===void 0&&o){const P=sh(e.layerStack,F(l),d);f=(this.variantFallbacks[d]??[]).find(w=>P.has(w))}if(f===void 0){c=!0;continue}const p=l.appendVariantSelection(d,f);if(e.path.hasPrefix(p))continue;const y=e.path.replacePrefix(l,p),m=rt(e.layerStack);if(s.hasSite(t,m,y)||!Rn(e.layerStack,F(p)))continue;let g=!1;for(let P=e;P?.parent!==null;P=P.parent)if(Rs(P.arcType)&&Gt(P)===0&&!P.inert){g=!0;break}if(g||=hr(n),g&&s.rejectDuplicateArc(e,m,y,n))continue;const S={previousFrame:n,requestedPath:y,parentNode:e,mapToParent:K.identity(),arcType:C.Variant,skipDuplicateNodes:g},_=(await this.buildNodeTree(e.layerStack,y,s,S)).clone(e);_.arcType=C.Variant,_.mapToParent=K.identity(),_.origin=e,_.namespaceDepth=me(l),_.siblingNumAtOrigin=h,li(_,e.mapToRoot),ks(e,_),s.registerSubtree(t,_),r.push(_),a=!0}l=Ti(l)}return{added:a,unresolved:c}}evalUnresolvedPrimPathError(e,t,s){for(const l of xt(e)){const u=Gt(l)===0?l.path:bs(l);if(Rn(l.layerStack,F(u)))return}const n=e.parent,r=bs(e),o=e.mapToParent.mapSourceToTarget(r),a=o.isEmpty()?n?.path??e.path:o,c=De((n??e).layerStack.identifier,a.pathString);s.allErrors.some(l=>l.errorType===Nr.ArcToProhibitedChild)||s.allErrors.push($_({rootSite:zt(t),site:c,sourceLayer:this.refSourceLayers.get(e),targetLayer:e.layerStack.identifier.rootLayer,unresolvedPath:r.pathString,arcType:e.arcType}))}async evalRefOrPayload(e,t,s,n,r,o,a,c="static",l=F(e.path)){const u=new Set,h=t===C.Reference?pS(e.layerStack,l,e.expressionVars,u):Za(e.layerStack,l,e.expressionVars,u);if(n.outputs.expressionVariablesDependency.addDependencies(e.layerStack,u),h.length===0)return;const d=B.fromString(l.replace(/\/\{/g,"{").replace(/\}\//g,"}")),f=e.mapToRoot.mapSourceToTarget(d),p=(f.isEmpty()?o.path:f).stripAllVariantSelections().pathString;if(t===C.Payload&&!this.payloadIncluded(p)){n.outputs.setPayloadState(this.payloadInclusionSource==="predicate"?ss.PayloadState.ExcludedByPredicate:ss.PayloadState.ExcludedByIncludeSet);return}t===C.Payload&&n.outputs.setPayloadState(this.payloadInclusionSource==="predicate"?ss.PayloadState.IncludedByPredicate:ss.PayloadState.IncludedByIncludeSet);const y=Ci.pathString;for(const[m,g]of h.entries()){if(t===C.Payload&&c==="dynamic"&&!g.assetPath)continue;if(g.primPath){const N=B.fromString(g.primPath);if(!N.isAbsolutePath()||!N.isPrimPath()||N.containsPrimVariantSelection()){n.outputs.allErrors.push(Hu({rootSite:zt(o),site:De(e.layerStack.identifier,e.path.pathString),primPath:g.primPath,sourceLayer:g.sourceLayer,arcType:t}));continue}}let S,_,P=g.layerOffset;if(g.assetPath){const N=Kt(g.assetPath),x=Kt(g._resolvedAssetPath??N.assetPath).assetPath,R=$y(x),U=t===C.Payload&&DS(R)?R:void 0;if(t===C.Payload&&c==="dynamic"!=(U!==void 0))continue;let $=Wr(x,N.args);if(U){const Z=new Map(N.args),ye=new Set,Ae=new Set,fe=new hS(e,l,ye,Ae,m,r),ue=U.composeFieldsForFileFormatArguments(N.assetPath,fe,Z);$=Wr(x,Z),n.outputs.dynamicFileFormatDependency.addDependencyContext(U,ue,ye,Ae)}const Ie=await this.opener($);if(!Ie){n.outputs.allErrors.push(L_({rootSite:zt(o),site:De(e.layerStack.identifier,e.path.pathString),targetPath:g.primPath,assetPath:N.assetPath,resolvedAssetPath:x,sourceLayer:g.sourceLayer,arcType:t,messages:""}));continue}S=await this.layerStackFor(Ie);const le=g.sourceLayer?VS(g.sourceLayer):e.layerStack.timeCodesPerSecond;le!==S.timeCodesPerSecond&&(P={offset:P.offset,scale:P.scale*le/S.timeCodesPerSecond});const q=Ie.getField(y,"defaultPrim");_=g.primPath||(q?`/${q}`:y)}else if(g.primPath)S=e.layerStack,_=g.primPath;else{const N=e.layerStack.layers.map(x=>x.layer.getField(y,"defaultPrim")).find(x=>x!==void 0);if(!N)continue;S=e.layerStack,_=`/${N}`}let w=B.fromString(_);const v=B.fromString(l.replace(/\/\{/g,"{").replace(/}\//g,"}")).stripAllVariantSelections(),b=e.path.stripAllVariantSelections();if(b.pathString!==v.pathString&&b.hasPrefix(v)){const N=b.pathString.slice(v.pathString.length);w=B.fromString(w.isAbsoluteRootPath()?N||"/":`${w.pathString}${N}`)}if(ah(e,rt(S),w,r)){n.outputs.allErrors.push(ch(e,r,t,S,w));continue}if(S.hasRelocates&&S.incrementalRelocatesSourceToTarget.has(w.pathString)){o.path.containsPrimVariantSelection()||n.outputs.allErrors.push(zo({rootSite:zt(o),site:De(e.layerStack.identifier,e.path.pathString),targetSite:De(S.identifier,w.pathString),relocationSourceSite:De(S.identifier,w.pathString),arcType:t}));continue}if(hr(r)&&n.rejectDuplicateArc(e,rt(S),w,r))continue;const T=!g.assetPath?[[Ci,Ci],[w,e.path.stripAllVariantSelections()]]:[[w,e.path.stripAllVariantSelections()]],E=lh(K.create(T,P),e,e.path);if(me(w)>1){const N={previousFrame:r,requestedPath:w,parentNode:e,arcType:t,mapToParent:E,skipDuplicateNodes:!1},x=(await this.buildNodeTree(S,w,n,N)).clone(e);x.arcType=t,x.mapToParent=E,x.origin=e,g.sourceLayer&&this.refSourceLayers.set(x,g.sourceLayer),x.namespaceDepth=me(e.path),x.expressionVars=Xu(S.ownExpressionVariables,e.expressionVars),li(x,e.mapToRoot),ks(e,x),n.registerSubtree(o,x),a.push(x);continue}const D=Ii(e,{arcType:t,layerStack:S,path:w,mapToParent:E,origin:e,namespaceDepth:me(e.path)});n.registerSubtree(o,D),g.sourceLayer&&this.refSourceLayers.set(D,g.sourceLayer),D.expressionVars=Xu(S.ownExpressionVariables,e.expressionVars),s.push(D)}}async evalAncestralDynamicPayloads(e,t,s,n,r,o){for(let a=Ti(e.path);!a.isAbsoluteRootPath()&&!(!(e.specContributionRestrictedDepth!==0&&e.specContributionRestrictedDepth<=me(a))&&(await this.evalRefOrPayload(e,C.Payload,t,s,n,r,o,"dynamic",F(a)),a.isPrimVariantSelectionPath()));a=Ti(a));}}function VS(i){const e=i.getField("/","timeCodesPerSecond");if(typeof e=="number")return e;const t=i.getField("/","framesPerSecond");return typeof t=="number"?t:24}(i=>{(e=>{e.NoPayload="noPayload",e.IncludedByIncludeSet="includedByIncludeSet",e.ExcludedByIncludeSet="excludedByIncludeSet",e.IncludedByPredicate="includedByPredicate",e.ExcludedByPredicate="excludedByPredicate"})(i.PayloadState||(i.PayloadState={}))})(ss||(ss={}));class Ep{_rootNode;path;localErrors;constructor(e,t="",s=[]){this._rootNode=e,this.path=t,this.localErrors=s}isValid(){return this._rootNode!==void 0}get rootNode(){if(!this._rootNode)throw new Error("Invalid PcpPrimIndex has no root node");return this._rootNode}dumpToString(e=!0,t=!0){return AS(this,e,t)}*getNodeRange(){this._rootNode&&(yield*xt(this._rootNode))}composePrimStack(){const e=[];let t=-1;for(const s of this.getNodeRange()){if(t++,s.inert)continue;const n=s.mapToRoot.getTimeOffset();for(let r=0;r<s.layerStack.layers.length;r++){const{layer:o,offset:a}=s.layerStack.layers[r];o.hasSpec(F(s.path))&&e.push({layer:o,path:s.path,arcType:s.arcType,offset:os(n,a),nodeIndex:t,layerIndex:r})}}return e}composePropertyStack(e,t={}){const s=[];let n=-1;for(const c of this.getNodeRange()){if(n++,c.inert)continue;const l=c.path.appendProperty(e),u=F(l),h=c.mapToRoot.getTimeOffset();for(let d=0;d<c.layerStack.layers.length;d++){const{layer:f,offset:p}=c.layerStack.layers[d];f.hasSpec(u)&&s.push({layer:f,path:l,arcType:c.arcType,offset:os(h,p),nodeIndex:n,layerIndex:d})}}if(!t.validatePropertyTypes)return s;const r=s[0];if(!r)return s;const o=r.layer.getSpecType(F(r.path)),a=[r];for(const c of s.slice(1)){const l=c.layer.getSpecType(F(c.path));if(l===o){a.push(c);continue}this.localErrors.push(V_({rootSite:De(this.rootNode.layerStack.identifier,this.rootNode.path.appendProperty(e).pathString),definingLayerIdentifier:r.layer.filePath,definingSpecPath:r.path.pathString,definingSpecType:o,conflictingLayerIdentifier:c.layer.filePath,conflictingSpecPath:c.path.pathString,conflictingSpecType:l}))}return a}hasSpecs(){for(const e of this.getNodeRange())if(!e.inert&&Rn(e.layerStack,F(e.path)))return!0;return!1}computePrimChildNames(e){const t=[],s=this._rootNode,n=s!==void 0&&Nc(s),r=h=>{if(!(h.culled||h.elided)){for(let d=h.children.length-1;d>=0;d--)r(h.children[d]);!h.inert&&(!n||!h.isRootNode()&&mo(h))&&t.push(h)}};s&&r(s);const o=h=>{const d=h.lastIndexOf("/");return d<=0?"/":h.slice(0,d)},a=h=>h.slice(h.lastIndexOf("/")+1),c=new Set,l=new Set,u=[];for(const h of t){const d=new Map,f=new Set;for(const[m,g]of h.layerStack.incrementalRelocatesSourceToTarget){if(o(m)!==h.path.pathString)continue;const S=a(m);c.add(S),o(g)===h.path.pathString?d.set(S,a(g)):f.add(S)}if(d.size||f.size){const m=[];for(const g of u){const S=d.get(g);S!==void 0?(l.delete(g),l.has(S)||(l.add(S),m.push(S))):f.has(g)?l.delete(g):m.push(g)}u.splice(0,u.length,...m)}const p=[];for(const[m,g]of h.layerStack.incrementalRelocatesTargetToSource)if(o(m)===h.path.pathString&&o(g)!==h.path.pathString){const S=a(m);l.has(S)||p.push(S)}p.sort();for(const m of p)l.add(m),u.push(m);const y=_S(h.layerStack,F(h.path),u);u.splice(0,u.length,...y),l.clear();for(const m of u)l.add(m)}for(const h of c)e?.add(h);return u.filter(h=>!c.has(h))}computePrimPropertyNames(){const e=[],t=r=>{if(!r.culled){for(let o=r.children.length-1;o>=0;o--)t(r.children[o]);r.inert||e.push(r)}};this._rootNode&&t(this._rootNode);const s=new Set,n=[];for(const r of e){const o=F(r.path);for(let a=r.layerStack.layers.length-1;a>=0;a--){const c=r.layerStack.layers[a].layer.getField(o,"properties");for(const l of c??[])s.has(l)||(s.add(l),n.push(l))}}return n}}const di=new WeakMap;class Yr{constructor(e,t,s,n,r=new Set,o=()=>!0,a="includeSet",c={current:void 0}){this.indexer=e,this.rootLayer=t,this.opener=s,this.sessionLayer=n,this.includedPayloads=r,this.includePayloadForIndexing=o,this.payloadInclusionSource=a,di.set(this,c)}variantFallbacks={};primIndexes=new Map;dynamicFileFormatDependencies=new Map;expressionVariablesDependencies=new Map;culledDependencies=new Map;inFlightIndexes=new Map;dependenciesByLayer=new Map;virtualDependenciesByLayer=new Map;sitesByPrimIndex=new Map;generation=0;rebuilding=null;computationObserver;static async create(e,t,s,n){return Yr._create(e,t,s,n)}static async _create(e,t,s,n,r){const o=new Set,a={current:r},c=n?u=>{const h=n(u);return h?o.add(u):o.delete(u),h}:u=>o.has(u),l=n?"predicate":"includeSet";return new Yr(await Zr.create(e,t,s,c,l,a),e,t,s,o,c,l,a)}getLayerStack(){return this.indexer.getLayerStack()}setComputationObserver(e){this.computationObserver=e}recordComputationEvent(e,t){this.computationObserver?.(e,t)}setVariantFallbacks(e){YS(this.variantFallbacks,e)||(this.variantFallbacks=ph(e),this.generation++,this.clearRetainedPrimIndexes(),this.inFlightIndexes.clear(),this.indexer.setVariantFallbacks(e))}getVariantFallbacks(){return ph(this.variantFallbacks)}findPrimIndex(e){return this.primIndexes.get(e)}hasAnyDynamicFileFormatArgumentFieldDependencies(){for(const e of this.dynamicFileFormatDependencies.values())if(e.getRelevantFieldNames().size>0)return!0;return!1}hasAnyDynamicFileFormatArgumentAttributeDependencies(){for(const e of this.dynamicFileFormatDependencies.values())if(e.getRelevantAttributeNames().size>0)return!0;return!1}isPossibleDynamicFileFormatArgumentField(e){for(const t of this.dynamicFileFormatDependencies.values())if(t.getRelevantFieldNames().has(e))return!0;return!1}isPossibleDynamicFileFormatArgumentAttribute(e){for(const t of this.dynamicFileFormatDependencies.values())if(t.getRelevantAttributeNames().has(e))return!0;return!1}getDynamicFileFormatArgumentDependencyData(e){return new Dp(this.dynamicFileFormatDependencies.get(e))}findDynamicFileFormatArgumentDependents(e,t,s,n,r,o){const a=new Set,c=new Set(this.findSiteDependencies(e,t).map(l=>l.indexPath));for(const l of c){const u=this.dynamicFileFormatDependencies.get(l);u&&(n!==void 0&&u.canAttributeDefaultValueChangeAffectFileFormatArguments(n,r,o)||s!==void 0&&u.canFieldChangeAffectFileFormatArguments(s,r,o))&&a.add(l)}return[...a]}forEachPrimIndex(e){for(const t of this.primIndexes.values())e(t)}findPayloadPaths(e="/"){const t=new Set;for(const[s,n]of this.primIndexes)if(Br(s,e)){for(const r of n.getNodeRange())if(!(r.culled||r.elided)&&Za(r.layerStack,F(r.path),r.expressionVars).length!==0){t.add(s);break}}return[...t].sort()}isPayloadIncluded(e){return this.includedPayloads.has(e)}getIncludedPayloadPaths(){return[...this.includedPayloads].sort()}requestPayloads(e,t,s){const n=new Set(e),r=new Set;for(const o of n)this.includedPayloads.has(o)||(this.includedPayloads.add(o),r.add(o));for(const o of t)n.has(o)||!this.includedPayloads.delete(o)||r.add(o);if(s)for(const o of r)s.didChangeSignificantlyAtPath(o);else this.invalidatePrimIndexes(r,!0)}forEachLayerUsed(e){for(const t of this.dependenciesByLayer.keys())e(t)}getLayersUsedByPrimIndex(e){return[...new Set((this.sitesByPrimIndex.get(e)??[]).filter(s=>!s.virtual).map(s=>s.layer))]}findPrimIndexPathsUsingLayer(e){const t=new Set;for(const s of this.dependenciesByLayer.get(e)?.values()??[])for(const n of s)t.add(n);return[...t].sort()}findSiteDependencies(e,t,s={}){const n=new Map;for(const[r,o]of this.dependenciesByLayer.get(e)??[])if(!(r!==t&&!(s.recurseOnSite&&dh(r,t)))){for(const a of o)if(n.set(`${a}\0${r}`,{indexPath:a,sitePath:r}),!!s.recurseOnIndex)for(const c of this.primIndexes.keys())c!==a&&Br(c,a)&&n.set(`${c}\0${r}`,{indexPath:c,sitePath:r})}if(s.includeVirtual){for(const[r,o]of this.virtualDependenciesByLayer.get(e)??[])if(!(r!==t&&!(s.recurseOnSite&&dh(r,t)))){for(const[a,c]of o)if(!n.has(`${a}\0${r}`))for(const l of c)n.set(`${a}\0${r}\0${l}`,{indexPath:a,sitePath:r,rootMappedSitePath:l})}}return[...n.values()].sort((r,o)=>r.indexPath.localeCompare(o.indexPath)||r.sitePath.localeCompare(o.sitePath))}async computePrimIndex(e){return this._computePrimIndex(e)}async computePrimIndexesInParallel(e,t,s){let n=typeof e=="string"?[e]:[...e];const r=[];for(;n.length>0;){const o=[...new Set(n)];n=[];const a=await Promise.all(o.map(c=>this.computePrimIndex(c)));for(let c=0;c<a.length;c++){let l=a[c];const u=o[c];r.push(...l.localErrors);const h=[...l.getNodeRange()].some(f=>Za(f.layerStack,F(f.path),f.expressionVars).length>0);!this.isPayloadIncluded(u)&&h&&s(u)&&(this.requestPayloads([u],[]),l=await this.computePrimIndex(u),r.push(...l.localErrors));const d=l.computePrimChildNames();t(l,d)&&n.push(...d.map(f=>u==="/"?`/${f}`:`${u}/${f}`))}}return r}async _computePrimIndex(e,t=di.get(this)?.current){this.recordComputationEvent("primIndexRequest",e),this.rebuilding&&await this.rebuilding;const s=this.primIndexes.get(e);if(s)return s;const n=this.inFlightIndexes.get(e);if(n)return n;const r=this.generation,o=this.indexer;this.recordComputationEvent("primIndexCompute",e);const a=di.get(this)??{current:void 0};let c;return c=kc(a,"usd-ts:PcpCache.computePrimIndex",async l=>(Cc(l,"primPath",e),o.buildPrimIndex(e,l)),t).then(l=>{const u=l.primIndex;return this.generation===r&&this.indexer===o&&this.retainPrimIndex(e,u,l.dynamicFileFormatDependency,l.expressionVariablesDependency,l.culledDependencies),u}).finally(()=>{this.inFlightIndexes.get(e)===c&&this.inFlightIndexes.delete(e)}),this.inFlightIndexes.set(e,c),c}invalidatePrimIndexes(e,t=!1){const s=[...new Set(e)];if(s.length!==0){++this.generation,this.inFlightIndexes.clear(),this.indexer.invalidateBuildState();for(const n of[...this.primIndexes.keys()])s.some(r=>n===r||t&&Br(n,r))&&this.removePrimIndexDependencies(n)}}async invalidateAll(e=!1){const t=this.indexer.getLayerStack(),s=e?new Map(this.primIndexes):new Map;++this.generation,this.clearRetainedPrimIndexes(),this.inFlightIndexes.clear();let n;n=Zr.create(this.rootLayer,this.opener,this.sessionLayer,this.includePayloadForIndexing,this.payloadInclusionSource,di.get(this)).then(a=>{this.rebuilding===n&&(a.setVariantFallbacks(this.variantFallbacks),this.indexer=a)}),this.rebuilding=n;try{await n}finally{this.rebuilding===n&&(this.rebuilding=null)}const r=WS(t,this.indexer.getLayerStack());if(!e)return r;const o=new Set(r.namespaceRoots);for(const[a,c]of s){const l=await this.computePrimIndex(a);qS(c,l)||o.add(a)}return Rp(o),{...r,namespaceRoots:[...o].sort()}}retainPrimIndex(e,t,s,n,r){this.removePrimIndexDependencies(e),this.primIndexes.set(e,t),s.isEmpty()||this.dynamicFileFormatDependencies.set(e,s),n.isEmpty()||this.expressionVariablesDependencies.set(e,n),r.length>0&&this.culledDependencies.set(e,r);const o=[],a=new Map,c=(l,u)=>{const h=u||l.culled||l.elided,d=F(l.path),f=h?l.mapToRoot.mapSourceToTarget(l.path).pathString:void 0;for(const{layer:p}of l.layerStack.layers){let y=a.get(p);y||(y=new Map,a.set(p,y));const m=y.get(d);if(h){if(m===!1)continue;m===void 0&&(y.set(d,!0),o.push({layer:p,sitePath:d,virtual:!0}));let g=this.virtualDependenciesByLayer.get(p);g||(g=new Map,this.virtualDependenciesByLayer.set(p,g));let S=g.get(d);S||(S=new Map,g.set(d,S));let _=S.get(e);_||(_=new Set,S.set(e,_)),_.add(f??d)}else{if(m===!1)continue;y.set(d,!1),o.push({layer:p,sitePath:d,virtual:!1});let g=this.dependenciesByLayer.get(p);g||(g=new Map,this.dependenciesByLayer.set(p,g));let S=g.get(d);S||(S=new Set,g.set(d,S)),S.add(e)}}for(const p of l.children)c(p,h)};c(t.rootNode,!1),this.sitesByPrimIndex.set(e,o)}removePrimIndexDependencies(e){for(const{layer:t,sitePath:s,virtual:n}of this.sitesByPrimIndex.get(e)??[])if(n){const r=this.virtualDependenciesByLayer.get(t),o=r?.get(s);o?.delete(e),o?.size===0&&r?.delete(s),r?.size===0&&this.virtualDependenciesByLayer.delete(t)}else{const r=this.dependenciesByLayer.get(t),o=r?.get(s);o?.delete(e),o?.size===0&&r?.delete(s),r?.size===0&&this.dependenciesByLayer.delete(t)}this.sitesByPrimIndex.delete(e),this.dynamicFileFormatDependencies.delete(e),this.expressionVariablesDependencies.delete(e),this.culledDependencies.delete(e),this.primIndexes.delete(e)}clearRetainedPrimIndexes(){this.primIndexes.clear(),this.dynamicFileFormatDependencies.clear(),this.expressionVariablesDependencies.clear(),this.culledDependencies.clear(),this.dependenciesByLayer.clear(),this.virtualDependenciesByLayer.clear(),this.sitesByPrimIndex.clear()}}function US(i,e,t,s,n){return Yr._create(i,e,t,s,n)}function Bp(i){return di.get(i)?.current}function zS(i,e){const t=di.get(i);t&&(t.current=e)}async function Op(i,e,t){const s=di.get(i);if(!s)return await t();const n={},r=s.installations??=[];r.length===0&&(s.current?s.base=s.current:delete s.base),r.push({token:n,context:e}),s.current=e;try{return await t()}finally{const o=r.findIndex(a=>a.token===n);o>=0&&r.splice(o,1),s.current=r.at(-1)?.context??s.base,r.length===0&&delete s.base}}function jS(i,e,t){return i._computePrimIndex(e,t)}function WS(i,e){const t=i.layers.map(l=>l.layer),s=e.layers.map(l=>l.layer),n=new Set(t),r=new Set(s),o=[...t.filter(l=>!r.has(l)),...s.filter(l=>!n.has(l))],a=new Set;for(const l of o)for(const u of l.getSpecPaths()){if(u==="/")continue;const h=KS(u);(u.includes(".")||HS(l,u))&&a.add(h)}Rp(a);const c=new Set;if(o.length===0&&!ZS(t,s)){const l=new Set;for(const u of[...t,...s])for(const h of u.getSpecPaths())h.includes(".")&&l.add(h);for(const u of l)hh(t,u)!==hh(s,u)&&c.add(u)}return{namespaceRoots:[...a].sort(),changedValuePaths:[...c].sort(),rootLayerStackChanged:o.length>0}}function qS(i,e){const t=[...i.getNodeRange()],s=[...e.getNodeRange()];return t.length===s.length&&t.every((n,r)=>{const o=s[r],a=n.layerStack.layers.map(l=>l.layer),c=o.layerStack.layers.map(l=>l.layer);return n.arcType===o.arcType&&n.path.pathString===o.path.pathString&&a.length===c.length&&a.every((l,u)=>l===c[u])})}function HS(i,e){return i.getField(e,"specifier")!=="over"?!0:i.getFieldNames(e).some(t=>t!=="specifier"&&t!=="primChildren"&&t!=="properties")}function KS(i){const e=i.indexOf(".",i.lastIndexOf("/"));return e<0?i:i.slice(0,e)}function ZS(i,e){return i.length===e.length&&i.every((t,s)=>t===e[s])}function hh(i,e){return i.find(t=>t.hasSpec(e))}function Rp(i){const e=[];for(const t of[...i].sort((s,n)=>s.length-n.length||s.localeCompare(n)))e.some(s=>Br(t,s))||e.push(t);i.clear();for(const t of e)i.add(t)}function Br(i,e){return i===e||i.startsWith(e==="/"?"/":`${e}/`)}function dh(i,e){return i===e||e==="/"||i.startsWith(`${e}/`)||i.startsWith(`${e}.`)||i.startsWith(`${e}{`)}function ph(i){return Object.fromEntries(Object.entries(i).map(([e,t])=>[e,[...t]]))}function YS(i,e){const t=Object.keys(i),s=Object.keys(e);return t.length===s.length&&t.every(n=>{const r=i[n],o=e[n];return o!==void 0&&r?.length===o.length&&r.every((a,c)=>a===o[c])})}function XS(i){const e=[],t=[...xt(i)].some(n=>n.arcType===C.Payload),s=n=>{if(n.culled)return;const r=mo(n);if(r&&e.push(n),!(r&&!t))for(const o of n.children)s(o)};for(const n of i.children)s(n);return e}function Fp(i){if(!Nc(i))return null;const e=[];for(const n of XS(i)){const r=n.mapToRoot.getTimeOffset(),o=`${ws(n.layerStack.identifier)}:${n.path.pathString}`;e.push(`${C[n.arcType]}|${o}|${r.offset},${r.scale}`)}const t={};for(const n of xt(i)){if(n.inert||n.culled)continue;const r=yS(n.layerStack,F(n.path),n.expressionVars);for(const[o,a]of Object.entries(r))o in t||(t[o]=a)}const s=Object.keys(t).sort().map(n=>`${n}=${t[n]}`);return`Arcs:${e.join(";")}|Variants:${s.join(";")}`}const QS=new Set(["subLayers","subLayerOffsets","owner","sessionOwner","hasOwnedSubLayers","timeCodesPerSecond","expressionVariables","layerRelocates"]),JS=new Set(["defaultPrim","references","payload","inheritPaths","specializes","variantSelection","variantSetNames","variantSetChildren","variantChildren","relocates","instanceable","permission","fallbackPrimTypes"]),e0=new Set(["connectionPaths","targetPaths"]);function t0(i,e){if(e.kind==="specAdded"||e.kind==="specRemoved")return{layer:i,path:e.path,kind:"spec",specAdded:e.kind==="specAdded",specInert:e.inert??!0,specIsProperty:e.specType==="attribute"||e.specType==="relationship"};let t;return e.fieldName==="primChildren"||e.fieldName==="properties"?t="bookkeeping":e.fieldName==="framesPerSecond"?t="layerMetadata":e.fieldName&&QS.has(e.fieldName)?t="layerStack":e.fieldName==="clips"||e.fieldName==="clipSets"?t=e.oldValue===void 0!=(e.newValue===void 0)?"significant":"value":e.fieldName&&JS.has(e.fieldName)?t="significant":e.fieldName&&e0.has(e.fieldName)?t="target":t="value",e.fieldName===void 0?{layer:i,path:e.path,kind:t}:{layer:i,path:e.path,fieldName:e.fieldName,kind:t,oldValue:e.oldValue,newValue:e.newValue}}class Gp{didChangeSignificantly=new Set;didChangeSpecs=new Set;didChangePrims=new Set;didChangeTargets=new Set;didChangeValues=new Set;didChangeLayerMetadata=new Set;didChangeLayerStackFields=new Set;didChangeLayerStackNamespace=new Set;didChangeLayerStackValues=new Set;didMaybeChangeLayers=!1}class hn{changes=new Gp;assetResolverChanged=!1;didChange(e,t){for(const s of t)this.classify(e,s);this.optimize()}didChangeSignificantly(e,t,s){this.classify(e,{layer:t,path:s,kind:"significant"}),this.optimize()}didChangeSignificantlyAtPath(e){this.changes.didChangeSignificantly.add(e),this.optimize()}didChangeAssetResolver(e){this.assetResolverChanged=!0}getCacheChanges(){return this.optimize(),this.changes}isEmpty(){const e=this.getCacheChanges();return e.didChangeSignificantly.size===0&&e.didChangeSpecs.size===0&&e.didChangePrims.size===0&&e.didChangeTargets.size===0&&e.didChangeValues.size===0&&e.didChangeLayerMetadata.size===0&&!e.didMaybeChangeLayers}async apply(e){const t=this.getCacheChanges();if(this.assetResolverChanged){const n=await e.invalidateAll(!0);n.rootLayerStackChanged&&t.didChangeSignificantly.add("/");for(const r of n.namespaceRoots)t.didChangeSignificantly.add(r);for(const r of n.changedValuePaths)t.didChangeValues.add(r);return}if(t.didMaybeChangeLayers){const n=await e.invalidateAll();for(const r of n.namespaceRoots)t.didChangeLayerStackNamespace.add(r);for(const r of n.changedValuePaths)t.didChangeLayerStackValues.add(r);return}e.invalidatePrimIndexes(t.didChangeSignificantly,!0),e.invalidatePrimIndexes(t.didChangePrims,!1);const s=[];for(const n of t.didChangeSpecs){const r=dn(n),o=e.findPrimIndex(r);o&&!o.hasSpecs()&&s.push(r)}e.invalidatePrimIndexes(s,!1)}classify(e,t){const s=dn(t.path);if(t.kind==="bookkeeping")return;if(t.kind==="layerMetadata"){(e.getLayerStack().layers.some(l=>l.layer===t.layer)||e.findPrimIndexPathsUsingLayer(t.layer).length>0)&&this.changes.didChangeLayerMetadata.add(t.path);return}if(t.kind==="layerStack"){(e.getLayerStack().layers.some(l=>l.layer===t.layer)||e.findPrimIndexPathsUsingLayer(t.layer).length>0)&&(this.changes.didMaybeChangeLayers=!0,t.fieldName&&this.changes.didChangeLayerStackFields.add(t.fieldName));return}if(t.kind==="significant"){const c=e.findSiteDependencies(t.layer,s,{recurseOnSite:!0,recurseOnIndex:!0});for(const l of c)this.changes.didChangeSignificantly.add(l.indexPath);return}if(t.kind==="spec"){this.classifySpecChange(e,t);return}const n=t.path.indexOf("."),r=n>=0&&t.fieldName==="default"?t.path.slice(n+1):void 0,o=e.findDynamicFileFormatArgumentDependents(t.layer,s,r===void 0?t.fieldName:void 0,r,t.oldValue,t.newValue);if(o.length>0){for(const c of o)this.changes.didChangeSignificantly.add(c);return}const a=e.findSiteDependencies(t.layer,s);for(const c of a){const l=mh(t.path,s,c.indexPath);t.kind==="value"?this.changes.didChangeValues.add(l):this.changes.didChangeTargets.add(l)}}classifySpecChange(e,t){const s=t.specAdded===!0,n=dn(t.path),r=new Set,o=e.findSiteDependencies(t.layer,n,{includeVirtual:!0});for(const a of o)a.rootMappedSitePath!==void 0&&r.add(a.rootMappedSitePath),r.add(a.indexPath);for(let a=fh(n);a!=="/";){const c=e.findSiteDependencies(t.layer,a,{recurseOnSite:!0,includeVirtual:!0});if(c.length>0){for(const l of c){const u=l.sitePath.slice(a.length),h=l.rootMappedSitePath??l.indexPath;if(u.length>0&&!h.endsWith(u))continue;const d=u.length>0?h.slice(0,h.length-u.length):h;r.add(mh(t.path,a,d))}break}a=fh(a)}e.getLayerStack().layers.some(a=>a.layer===t.layer)&&r.add(n);for(const a of r)this.didChangeSpecsAt(e,a,t,s)}didChangeSpecsAt(e,t,s,n){if(s.specIsProperty===!0)return;if(s.specInert!==!0){this.changes.didChangeSignificantly.add(dn(t));return}const r=e.findPrimIndex(t);if(r){if(n?i0(r,s.layer,s.path):!0){if(!n&&!r.hasSpecs()){this.changes.didChangeSignificantly.add(t);return}const a=s0(r,s.layer,s.path);if(a){if(Fp(r.rootNode)!==null&&n0(a,s.layer,s.path,n)){this.changes.didChangeSignificantly.add(t);return}}else if(n){this.changes.didChangePrims.add(t);return}this.changes.didChangeSpecs.add(t);return}if(n){this.changes.didChangeSignificantly.add(t);return}this.changes.didChangeSpecs.add(t);return}if(n){this.changes.didChangeSignificantly.add(t);return}this.changes.didChangeSpecs.add(t)}optimize(){r0(this.changes.didChangeSignificantly);const e=t=>[...this.changes.didChangeSignificantly].some(s=>$p(t,s));for(const t of[this.changes.didChangeSpecs,this.changes.didChangePrims,this.changes.didChangeTargets,this.changes.didChangeValues])for(const s of t)e(dn(s))&&t.delete(s)}}function s0(i,e,t){for(const s of i.getNodeRange())if(!(s.inert||s.culled||s.elided)&&s.path.pathString===t&&s.layerStack.layers.some(n=>n.layer===e))return s}function i0(i,e,t){for(const s of i.getNodeRange()){if(s.inert)continue;const n=F(s.path);for(const r of s.layerStack.layers)if(r.layer.hasSpec(n)&&!(r.layer===e&&s.path.pathString===t))return!0}return!1}function n0(i,e,t,s){const n=F(i.path);if(s){for(const r of i.layerStack.layers)if(r.layer.hasSpec(n)&&!(r.layer===e&&i.path.pathString===t))return!1;return!0}return!i.layerStack.layers.some(r=>r.layer.hasSpec(n))}function dn(i){const e=i.lastIndexOf("/"),t=i.indexOf(".",e);return t<0?i:i.slice(0,t)}function fh(i){if(i==="/")return"/";const e=i.lastIndexOf("/");return e<=0?"/":i.slice(0,e)}function mh(i,e,t){const s=i.slice(e.length);return t==="/"&&s.startsWith("/")?s:`${t}${s}`}function $p(i,e){return i===e||i.startsWith(e==="/"?"/":`${e}/`)}function r0(i){const e=[];for(const t of[...i].sort((s,n)=>s.length-n.length||s.localeCompare(n)))e.some(s=>$p(t,s))||e.push(t);i.clear();for(const t of e)i.add(t)}function o0(i){if(i.assetPaths?.length||!i.templateAssetPath)return i;const e=i.templateAssetPath.match(/(#+)(?=[^#]*$)/);if(!e)return i;const t=Number(i.templateStartTime??0),s=Number(i.templateEndTime??t),n=Number(i.templateStride??1);if(n<=0)return i;const r=e[1].length,o=[],a=[],c=[];for(let l=t,u=0;l<=s;l+=n,u++){const h=Number.isInteger(l)?String(l).padStart(r,"0"):String(l);o.push(i.templateAssetPath.slice(0,e.index)+h+i.templateAssetPath.slice(e.index+r)),a.push([l+Number(i.templateActiveOffset??0),u]),c.push([l,l])}return{...i,assetPaths:o,active:a,times:c}}const Xa=new WeakMap;function a0(i){Xa.delete(i)}function c0(i){let e=Xa.get(i);return e===void 0&&(e=i.getSpecPaths().some(t=>i.getField(t,"clips")!==void 0||i.getField(t,"clipSets")!==void 0),Xa.set(i,e)),e}function l0(i){const e=[];let t=i;for(;t!==""&&t!=="/"&&(e.push(t),t=t.slice(0,t.lastIndexOf("/"))||"/",t!=="/"););return e}function Qa(i,e){if(e===void 0)return i;if(i===void 0)return e;if(typeof i=="object"&&i!==null&&!Array.isArray(i)&&typeof e=="object"&&e!==null&&!Array.isArray(e)){const t={...i};for(const[s,n]of Object.entries(e))t[s]=Qa(t[s],n);return t}return e}function dr(i,e){return!i||e.offset===0&&e.scale===1?i:i.map(([t,s])=>[lt(e,t),s])}function Lp(i){const e=new Map;let t=-1;for(const n of i.getNodeRange()){if(t++,n.inert)continue;const r=F(n.path);let o=null;const a=n.layerStack.layers,c=n.mapToRoot.getTimeOffset(),l=new Map;let u=[];for(let h=a.length-1;h>=0;h--){const d=a[h],f=d.layer;if(!c0(f))continue;o??=l0(r);const p=os(c,d.offset),y=[];for(let m=o.length-1;m>=0;m--){const g=o[m],S=f.getField(g,"clips");if(S){const P=r.slice(g.length);for(const[w,v]of Object.entries(S)){const b={...v};if(b.assetPaths?.length||b.templateAssetPath){const D=l.get(w),N={layer:f,layerStack:n.layerStack,primPath:g,layerIdx:h,nodeIdx:t,tail:P,offset:p};D?D.anchor=N:l.set(w,{def:{},anchor:N})}const I=dr(b.active,p);I&&(b.active=I);const T=dr(b.times,p);T&&(b.times=T);const E=l.get(w)??{def:{}};E.def=Qa(E.def,b),l.set(w,E),y.push(w)}}const _=f.getField(g,"clipSets");if(y.length>0&&m===0&&(u=Ks(u,{appendedItems:[...new Set(y)].sort()})),_!==void 0){const P=rs(_);P&&(u=Ks(u,P))}}}for(const[h,d]of l){const f=u.indexOf(h);if(f<0)continue;let p=e.get(h);p||(p={def:{},layerStackOrder:f},e.set(h,p)),!p.anchor&&d.anchor&&(p.anchor=d.anchor,p.layerStackOrder=f),p.def=Qa(d.def,p.def)}}const s=[];for(const[n,r]of e){if(!r.anchor)continue;let o=r.def;if(!o.assetPaths?.length&&o.templateAssetPath){const a=o0(o);if(a!==o){o={...a};const c=dr(a.active,r.anchor.offset);c&&(o.active=c);const l=dr(a.times,r.anchor.offset);l&&(o.times=l)}}s.push({name:n,def:o,anchorLayer:r.anchor.layer,sourceLayerStack:r.anchor.layerStack,sourcePrimPath:r.anchor.primPath,indexOfLayerWhereAssetPathsFound:r.anchor.layerIdx,tail:r.anchor.tail,position:[r.anchor.nodeIdx,r.anchor.layerIdx],layerStackOrder:r.layerStackOrder,timeOffset:r.anchor.offset})}if(s.length!==0)return s.sort((n,r)=>n.position[0]-r.position[0]||n.sourcePrimPath.localeCompare(r.sourcePrimPath)||n.layerStackOrder-r.layerStackOrder||(n.name<r.name?-1:1)),s}function u0(i,e,t=!1){if(i.length===0)return e;if(i.length===1)return i[0][1]+(e-i[0][0]);if(e<=i[0][0])return i[0][1];if(e>=i[i.length-1][0])return i[i.length-1][1];for(let s=i.length-2;s>=0;s--){const[n,r]=i[s],[o,a]=i[s+1];if(o!==n&&!(t&&e===n&&s>0&&i[s-1][0]===n)&&(e>=n||s===0))return r+(e-n)/(o-n)*(a-r)}return e}function Vp(i,e){if(i.length===0)return 0;let t=i[0][1];for(const[s,n]of i)if(s<=e)t=n;else break;return t}function Jn(i){return Array.isArray(i)?i:typeof i=="object"&&i!==null?Object.entries(i).map(([e,t])=>[Number(e),t]).sort(([e],[t])=>e-t):[]}function h0(i){return typeof i=="object"&&i!==null&&"value"in i?i.value:i}function Ja(i,e,t,s=!1,n){if(i.interpolateMissingClipValues){const r=er(i).map(o=>[o,Xr(i,o,t,!1,n)]).filter(o=>o[1]!==void 0);if(r.length>0)return Ji(r,e,t,s,n)}return Xr(i,e,t,s,n)}function d0(i,e,t,s){if(i.length===0)return e;if(i.length===1)return i[0][0]+e-i[0][1];for(let n=i.length-2;n>=0;n--){const[r,o]=i[n],[a,c]=i[n+1];if(!(a===r||c===o)&&!(s&&t===r&&n>0&&i[n-1][0]===r)&&(t>=r||n===0))return r+(e-o)/(c-o)*(a-r)}return e}function Xr(i,e,t,s=!1,n){const r=i.layers[Vp(i.active,e)];if(!r)return i.manifestDefault;const o=Jn(r.getField(i.attrPath,"timeSamples"));if(o.length===0)return i.manifestDefault;const a=u0(i.times,e,s),c=[...o].sort(([h],[d])=>h-d);if(a>c[c.length-1][0]){const h=er(i),d=[...h].reverse().find(y=>y<=e),f=h.find(y=>y>e),p=f!==void 0&&i.times.some((y,m)=>m+1<i.times.length&&y[0]===f&&i.times[m+1][0]===f);if(d!==void 0&&f!==void 0&&!p){const y=Xr(i,d,t,!1,n),m=Xr(i,f,t,!1,n);if(y!==void 0&&m!==void 0)return Ji([[d,y],[f,m]],e,t,s,n)}}const l=c.map(([h,d])=>[h,p0(i,h0(d),d0(i.times,h,e,s),h)]);return Ji(l,a,t,s,n)}function p0(i,e,t,s){return i.valueIsTimeCode?typeof e=="number"?e+t-s:Array.isArray(e)?e.map(n=>typeof n=="number"?n+t-s:n):e:e}function er(i){const e=new Set,t=i.active.length>0?i.active:[[0,0]];for(let s=0;s<t.length;s++){const n=t[s][0],r=t[s+1]?.[0]??1/0,o=i.layers[t[s][1]];if(!o)continue;const a=Jn(o.getField(i.attrPath,"timeSamples")).map(([l])=>l),c=i.manifestBlockedTimes.has(n);if(!(i.interpolateMissingClipValues&&i.manifestDefault===void 0&&(c||a.length===0))){if(e.add(n),i.times.length===0){for(const l of a)n<=l&&l<r&&e.add(l);continue}for(const l of a)for(let u=0;u+1<i.times.length;u++){const[h,d]=i.times[u],[f,p]=i.times[u+1];if(h===f||d===p||l<Math.min(d,p)||l>Math.max(d,p))continue;const y=h+(l-d)/(p-d)*(f-h);n<=y&&y<r&&e.add(y)}for(const[l]of i.times)n<=l&&l<r&&e.add(l)}}return[...e].sort((s,n)=>s-n)}function f0(i,e,t,s){if(!i||s.length===0)return!1;const n=`${e}${t}.`,r=i.getSpecPaths().filter(o=>o.startsWith(n));return r.length===0?!1:r.every(o=>{const a=new Set(Jn(i.getField(o,"timeSamples")).filter(([,c])=>c instanceof Pe||c===null||c===void 0).map(([c])=>c));return s.every(c=>a.has(c))})}async function Ec(i,e){const t=Lp(i);if(!t)return;const s=[];for(const{name:n,def:r,anchorLayer:o,tail:a,position:c,timeOffset:l}of t){if(!r.primPath||!r.assetPaths||r.assetPaths.length===0)continue;let u=null;if(r.manifestAssetPath){const p=o.resolveAsset(r.manifestAssetPath);u=p?await e(p):null}const h=r.active??[[lt(l,0),0]],d=r.times?.length?r.times:l.offset!==0||l.scale!==1?[[l.offset,0],[l.offset+l.scale,1]]:[],f=[];for(let p=0;p<r.assetPaths.length;p++){const y=h.filter(([,g])=>g===p).map(([g])=>g);if(r.interpolateMissingClipValues===!0&&f0(u,r.primPath,a,y)){f.push(null);continue}const m=o.resolveAsset(r.assetPaths[p]);f.push(m?await e(m):null)}s.push({name:n,primPath:r.primPath,active:h,times:d,layers:f,manifest:u,tail:a,position:c,interpolateMissingClipValues:r.interpolateMissingClipValues===!0})}return s.length>0?s:void 0}function m0(i,e){return i.manifest?i.manifest.hasSpec(e):i.layers.some(t=>{const s=t?.getField(e,"timeSamples");return s!=null})}function Up(i,e){const t=[];for(const s of e){const n=`${s.primPath}${s.tail}.${i}`;if(!m0(s,n))continue;const r=s.manifest?.getField(n,"default"),o=new Set(Jn(s.manifest?.getField(n,"timeSamples")).filter(([,a])=>a instanceof Pe||a===null||a===void 0).map(([a])=>a));t.push({position:s.position,attrPath:n,active:s.active,times:s.times,layers:s.layers,interpolateMissingClipValues:s.interpolateMissingClipValues,manifestDefault:r,manifestBlockedTimes:o,valueIsTimeCode:["timecode","timecode[]"].includes(String(s.manifest?.getField(n,"typeName")))||s.layers.some(a=>["timecode","timecode[]"].includes(String(a?.getField(n,"typeName"))))})}return t.length>0?t:void 0}function g0(i,e,t){const s=Up(i,[e])?.[0];if(!s)return[];const n=er(s);if(n.length===0)return[];const r=[...n].reverse().find(c=>c<=t)??n[0],o=n.find(c=>c>=t)??n[n.length-1],a=[];for(const c of r===o?[r]:[r,o]){const l=e.layers[Vp(e.active,c)],h=Jn(l?.getField(s.attrPath,"timeSamples")).length>0?l:e.manifest;!h||!h.hasSpec(s.attrPath)||a.some(d=>d.layer===h)||a.push({layer:h,specPath:s.attrPath,position:e.position})}return a}var Or=(i=>(i[i.None=0]="None",i[i.Fallback=1]="Fallback",i[i.Default=2]="Default",i[i.TimeSamples=3]="TimeSamples",i[i.ValueClips=4]="ValueClips",i[i.Spline=5]="Spline",i))(Or||{});const y0={none:0,fallback:1,default:2,timeSamples:3,valueClips:4,spline:5},Bc=new WeakMap,zp=()=>({source:"none",valueIsBlocked:!1}),ti=i=>Bc.get(i)??zp();class _0{constructor(){Bc.set(this,zp())}getSource(){return y0[ti(this).source]}hasAuthoredValueOpinion(){return this.hasAuthoredValue()||this.valueIsBlocked()}hasAuthoredValue(){const e=ti(this);return e.source==="default"||e.source==="timeSamples"||e.source==="valueClips"||e.source==="spline"}getNode(){return ti(this).node}valueIsBlocked(){return ti(this).valueIsBlocked}valueSourceMightBeTimeVarying(){const e=ti(this);return e.source==="timeSamples"||e.source==="valueClips"||e.source==="spline"||this.getNextWeakerInfo()?.valueSourceMightBeTimeVarying()===!0}hasNextWeakerInfo(){return ti(this).nextWeaker!==void 0}getNextWeakerInfo(){const e=ti(this).nextWeaker;return e?Rr(e):void 0}}function Rr(i){const e=new _0;return Bc.set(e,i),e}const tt=Object.freeze({model:"model",component:"component",group:"group",assembly:"assembly",subcomponent:"subcomponent"});class Oc{static#s;#t=new Map;constructor(){this.#i(tt.subcomponent,""),this.#i(tt.model,""),this.#i(tt.component,tt.model),this.#i(tt.group,tt.model),this.#i(tt.assembly,tt.group);for(const e of ze.GetInstance().GetAllPlugins()){const t=e.GetMetadata().Kinds;if(!(!t||typeof t!="object"||Array.isArray(t)))for(const[s,n]of Object.entries(t)){if(!n||typeof n!="object"||Array.isArray(n))continue;const r=n.baseKind;this.#i(s,typeof r=="string"?r:"")}}}#i(e,t){!/^[A-Za-z_][A-Za-z0-9_]*$/.test(e)||this.#t.has(e)||this.#t.set(e,t)}static GetInstance(){return this.#s??=new Oc}static HasKind(e){return this.GetInstance().#t.has(e)}static GetBaseKind(e){return this.GetInstance().#t.get(e)??""}static IsA(e,t){if(e===t)return!0;const s=new Set;let n=e;for(;!s.has(n);){if(s.add(n),n=this.GetInstance().#t.get(n)??"",n===t)return!0;if(n==="")return!1}return!1}static GetAllKinds(){return[...this.GetInstance().#t.keys()]}static IsModel(e){return this.IsA(e,tt.model)}static IsGroup(e){return this.IsA(e,tt.group)}static IsAssembly(e){return this.IsA(e,tt.assembly)}static IsComponent(e){return this.IsA(e,tt.component)}static IsSubComponent(e){return this.IsA(e,tt.subcomponent)}}function S0(i){return typeof i=="number"?{time:i,isPreTime:!1}:i.IsDefault()?{time:"default",isPreTime:!1}:{time:i.GetValue(),isPreTime:i.IsPreTime()}}class Ss{constructor(e=()=>!0,t=!1){this._evaluate=e,this.includeInstanceProxies=t}evaluate(e){if(!e)throw new Error("Cannot evaluate a prim predicate on an invalid prim");return this._evaluate(e)}and(e){const t=jn(e);return new Ss(s=>this.evaluate(s)&&t.evaluate(s),this.includeInstanceProxies||t.includeInstanceProxies)}or(e){const t=jn(e);return new Ss(s=>this.evaluate(s)||t.evaluate(s),this.includeInstanceProxies||t.includeInstanceProxies)}not(){return new Ss(e=>!this.evaluate(e),this.includeInstanceProxies)}traverseInstanceProxies(e=!0){return new Ss(this._evaluate,e)}}function jn(i){return i instanceof Ss?i:new Ss(i)}const go=i=>new Ss(i),P0=go(i=>i.isActive),w0=go(i=>i.isLoaded),b0=go(i=>i.isAbstract),v0=go(i=>i.isDefined),gh=new Ss,ec=P0.and(v0).and(w0).and(b0.not());function jp(i,e){if(e.kind==="multipleApplyAPI"){const t=`${e.identifier}:`;return i.some(s=>s.startsWith(t))}return e.kind==="singleApplyAPI"?i.includes(e.identifier):!1}function Wp(i,e,t){return e.kind!=="multipleApplyAPI"?!1:i.includes(`${e.identifier}:${t}`)}function si(i,e,t){if(typeof i!="string"){const r=M.findSchemaInfo(i);return r?M.findSchemaInfosInFamily(r.family,r.version,t):[]}if(e===void 0&&t===void 0)return M.findSchemaInfosInFamily(i);if(e!==void 0)return M.findSchemaInfosInFamily(i,e,t);const s=M.findSchemaInfo(i);if(s)return M.findSchemaInfosInFamily(s.family,s.version,t);const n=M.parseSchemaFamilyAndVersionFromIdentifier(i);return n?M.findSchemaInfosInFamily(n[0],n[1],t):[]}const I0=new Set(["all","greaterThan","greaterThanOrEqual","lessThan","lessThanOrEqual"]);function A0(i){return typeof i=="string"&&I0.has(i)}function yh(i,e){for(const t of e)if(i.IsA(t.type))return t;return null}function _h(i,e,t){if(i.length===0)return null;if(t!==void 0&&t==="")throw new Error("Instance name must be non-empty");for(const s of e)if(t===void 0?jp(i,s):Wp(i,s,t))return s;return null}function pr(i,e){return Oc.IsA(i,e)}const Sh=new WeakMap;function qp(i){const e=Sh.get(i),t=d_(i);if(e&&e.generation===t&&e.size===i.size)return e.index;const s=new Map([..._p(i)].map(([o,a])=>[o,[...a]])),n=new Map;for(const o of i.keys()){if(o==="/")continue;const a=o.indexOf(".");if(a>=0){const c=a===0?"/":o.slice(0,a);let l=n.get(c);l||n.set(c,l=[]),l.push(o.slice(a+1))}}const r={children:s,attrs:n};return Sh.set(i,{generation:t,size:i.size,index:r}),r}class Fs{constructor(e,t,s,n){this._nodes=e,this.path=t,this._stage=n,this._dataPath=s??t}_dataPath;getStage(){if(!this._stage)throw new Error(`Prim <${this.path}>: this handle carries no stage (not fetched via Stage.getPrim)`);return this._stage}_getStage(){return this._stage}get typeName(){return this._nodes.get(this._dataPath)?.fields.typeName??""}get _fields(){return this._nodes.get(this._dataPath)?.fields}_getMetadataValueTypeName(e){return this._stage?._resolvePrimFieldTypeName(this._dataPath,e)}getPrimTypeInfo(){const e=this._nodes.get(this._dataPath)?.fields;if(!e)return Bt.getEmptyPrimType();const t=e.typeName??"",s=this._stage?._getAuthoredAppliedSchemas(this._dataPath)??e.apiSchemas,n=Array.isArray(s)?s:[],r=this._nodes.get("/")?.fields.__fallbackPrimTypes,o=t!==""?r?.[t]??"":"";return Bt._findOrCreatePrimTypeInfo(t,o,n)}getPrimDefinition(){return this.getPrimTypeInfo().getPrimDefinition()}getAppliedSchemas(){return this.getPrimDefinition().getAppliedAPISchemas()}isA(e,t){const s=typeof e=="string"&&t!==void 0?M.findSchemaInfoInFamily(e,t):M.findSchemaInfo(e);return s?this.getPrimTypeInfo().getSchemaType().IsA(s.type):!1}isInFamily(e,t,s){const n=typeof t=="number"?si(e,t,s):si(e,void 0,t);return yh(this.getPrimTypeInfo().getSchemaType(),n)!==null}getVersionIfIsInFamily(e){return yh(this.getPrimTypeInfo().getSchemaType(),si(e))?.version}hasAPI(e,t,s){let n,r;if(typeof e=="string"&&typeof t=="number")n=M.findSchemaInfoInFamily(e,t),r=s;else if(typeof e=="string"){r=typeof t=="string"?t:void 0;let a=e;if(r===void 0){const c=a.indexOf(":");c!==-1&&(r=a.slice(c+1),a=a.slice(0,c))}n=M.findSchemaInfo(a)}else n=M.findSchemaInfo(e),r=typeof t=="string"?t:void 0;if(!n)return!1;const o=this.getAppliedSchemas();return o.length===0?!1:r===void 0?jp(o,n):Wp(o,n,r)}hasAPIInFamily(e,t,s,n){let r,o;return typeof t=="number"?(r=si(e,t,s),o=n):A0(t)?(r=si(e,void 0,t),o=s):(r=si(e),o=t),_h(this.getAppliedSchemas(),r,o)!==null}getVersionIfHasAPIInFamily(e,t){return _h(this.getAppliedSchemas(),si(e),t)?.version}get isActive(){for(const e of this._ancestorPaths())if(this._nodes.get(e)?.fields.active===!1)return!1;return!0}get isDefined(){for(const e of this._ancestorPaths()){const t=this._nodes.get(e)?.fields.specifier;if(!/^\/__Prototype_\d+$/.test(e)&&t!=="def"&&t!=="class")return!1}return!0}get isAbstract(){return this._ancestorPaths().some(e=>this._nodes.get(e)?.fields.specifier==="class")}get isLoaded(){return this._stage?._isPrimLoaded(this.path)??!0}hasDefiningSpecifier(){const e=this._nodes.get(this._dataPath)?.fields.specifier;return e==="def"||e==="class"}hasClassSpecifier(){return this._stage?._hasClassSpecifier(this.path)??this._nodes.get(this._dataPath)?.fields.specifier==="class"}getFilteredChildren(e){if(!this._stage)return[];const t=jn(e),s=t.includeInstanceProxies||this.isInstanceProxy();return this._stage.getAllChildPrimPaths(this.path,{instanceProxies:s}).map(n=>this._stage.getPrim(n)).filter(n=>n!==void 0&&t.evaluate(n))}getChildren(){return this.getFilteredChildren(ec)}getAllChildren(){return this.getFilteredChildren(gh)}getFilteredDescendants(e){const t=jn(e),s=[],n=r=>{for(const o of r.getFilteredChildren(t))s.push(o),n(o)};return n(this),s}getDescendants(){return this.getFilteredDescendants(ec)}getAllDescendants(){return this.getFilteredDescendants(gh)}_ancestorPaths(){const e=[];let t=this._dataPath;for(;t!=="/";){e.push(t);const s=t.lastIndexOf("/");t=s<=0?"/":t.slice(0,s)}return e}getMetadata(e){const t=e.startsWith("__")?void 0:this._stage?._resolvePrimMetadata(this._dataPath,e)??this._nodes.get(this._dataPath)?.fields[e],s=this.getPrimDefinition().getMetadataField(e);return t===void 0?s:Lt(t)&&Lt(s)?fo(t,s):t}setMetadata(e,t){return this._stage?(this._stage._setPrimMetadata(this.path,e,t),!0):!1}clearMetadata(e){return this._stage?(this._stage._clearPrimMetadata(this.path,e),!0):!1}getKind(){const e=this.getMetadata("kind");return typeof e=="string"?e:""}setKind(e){return this.setMetadata("kind",e)}isKind(e,t="modelHierarchy"){return t!=="none"&&t!=="KindValidationNone"&&pr(e,"model")&&!this.isModel()?!1:pr(this.getKind(),e)}isModel(){if(!pr(this.getKind(),"model"))return!1;const e=this.path.lastIndexOf("/"),t=e<=0?"/":this.path.slice(0,e);return t==="/"?!0:this._stage?.getPrim(t)?.isGroup()??!1}isGroup(){return this.isModel()&&pr(this.getKind(),"group")}get attrNames(){return[...qp(this._nodes).attrs.get(this._dataPath)??[]]}getAttr(e){const t=this._dataPath==="/"?`.${e}`:`${this._dataPath}.${e}`,s={name:e,def:()=>this.getPrimDefinition()};if(this._nodes.get(t))return new ji(this._nodes,t,s,this._stage,this._dataPath,e,this.path);if(this._nodes.has(this._dataPath))return new ji(this._nodes,t,s,this._stage,this._dataPath,e,this.path);if(this._stage)return new ji(this._nodes,t,s,this._stage,this._dataPath,e,this.path)}findAllAttributeConnectionPaths(e={}){if(!this._stage)return[];const t=e.traversalPredicate==="allPrims",s=new Set,n=new Set,r=(l,u)=>l===u||l.startsWith(`${u}/`)||l.startsWith(`${u}.`),o=l=>{const u=l.indexOf(".");return u<0?l:l.slice(0,u)},a=l=>{if(s.has(l))return;const u=this._stage.getPrim(l);if(u){s.add(l);for(const h of u.attrNames){const d=u.getAttr(h);if(!(!d||d.isRelationship)&&!(e.predicate&&!e.predicate(d)))for(const f of d.getConnections())n.add(f),e.recurseOnSources&&!r(f,this.path)&&c(o(f))}}},c=l=>{const u=[l];for(;u.length>0;){const h=u.pop();a(h);const d=t?this._stage.getAllChildPrimPaths(h):this._stage.getChildPrimPaths(h);for(let f=d.length-1;f>=0;--f)u.push(d[f])}};return c(this.path),[...n].sort()}getPropertyNames(){const e=new Set(this.getPrimDefinition().getPropertyNames());for(const o of this.attrNames)e.add(o);if(e.size===0)return[];const t=[...e].sort((o,a)=>is(o,a)?-1:is(a,o)?1:0),s=this.getMetadata("propertyOrder");if(!Array.isArray(s)||s.length===0)return t;const n=[],r=new Set;for(const o of s)e.has(o)&&!r.has(o)&&(n.push(o),r.add(o));return[...n,...t.filter(o=>!r.has(o))]}getAllMetadata(){const e=new Set;for(const s of Object.keys(this._fields??{}))s.startsWith("__")||e.add(s);for(const s of this.getPrimDefinition().listMetadataFields())e.add(s);const t={};for(const s of[...e].sort((n,r)=>is(n,r)?-1:is(r,n)?1:0)){const n=this.getMetadata(s);n!==void 0&&(t[s]=n)}return t}getAllAuthoredMetadata(){if(this._stage)return this._stage._getAllAuthoredPrimMetadata(this._dataPath);const e={};for(const[t,s]of Object.entries(this._fields??{}))!t.startsWith("__")&&s!==void 0&&(e[t]=s);return e}hasAuthoredMetadata(e){return!e.startsWith("__")&&e in this.getAllAuthoredMetadata()}setTypeName(e){this.getStage()._setPrimTypeName(this.path,e)}attr(e){return this.getAttr(e)}createAttr(e,t){const s=this.attr(e);return t!==void 0&&s.set(t),s}rel(e){return new c_(this.getStage(),this.path,e)}createRel(e,t){const s=this.rel(e);return s.setTargets(t??[]),s}getReferences(){return new Vu(this.getStage(),this.path,"references")}getPayloads(){return new Vu(this.getStage(),this.path,"payload")}getSpecializes(){return new l_(this.getStage(),this.path)}async setActive(e){const t=this.getStage();await t._ownAuthoringAsync(async()=>{t.getEditTarget().getLayer().setField(this.path,"active",e),await t._recomposeForEdit()})}addAppliedSchema(e){this.getStage().applyAPI(this.path,e)}_resolveAppliedSchemaArgs(e,t,s,n){let r,o;if(typeof t!="string")r=M.findSchemaInfo(t),o=typeof s=="string"?s:void 0;else if(typeof s=="number")r=M.findSchemaInfoInFamily(t,s),o=n;else{o=s;let a=t;if(o===void 0){const c=a.indexOf(":");c!==-1&&(o=a.slice(c+1),a=a.slice(0,c))}r=M.findSchemaInfo(a)}if(!r)throw new Error(`${e}: Cannot find a valid schema for '${String(t)}'`);return{info:r,instance:o}}_isValidApplyToTarget(e,t){const s=M.getAPISchemaCanOnlyApplyToTypeNames(e.identifier,t);if(s.length===0)return!0;const n=this.getPrimTypeInfo().getSchemaType();if(!n.IsUnknown())for(const r of s){const o=M.getTypeFromSchemaTypeName(r);if(n.IsA(o))return!0}return!1}canApplyAPI(e,t,s){const{info:n,instance:r}=this._resolveAppliedSchemaArgs("CanApplyAPI",e,t,s);if(r===void 0){if(n.kind!=="singleApplyAPI")throw new Error(`CanApplyAPI: Provided schema type ${n.identifier} is not a single-apply API schema.`);return this._isValidApplyToTarget(n,"")}if(n.kind!=="multipleApplyAPI")throw new Error(`CanApplyAPI: Provided schema type ${n.identifier} is not a multiple-apply API schema.`);if(r==="")throw new Error(`CanApplyAPI: for multiple apply API schema ${n.identifier}, a non-empty instance name must be provided.`);return M.isAllowedAPISchemaInstanceName(n.identifier,r)?this._isValidApplyToTarget(n,r):!1}applyAPI(e,t,s){const{info:n,instance:r}=this._resolveAppliedSchemaArgs("ApplyAPI",e,t,s);if(r===void 0){if(n.kind!=="singleApplyAPI")throw new Error(`ApplyAPI: Provided schema type ${n.identifier} is not a single-apply API schema.`);return this.getStage().applyAPI(this.path,n.identifier),!0}if(n.kind!=="multipleApplyAPI")throw new Error(`ApplyAPI: Provided schema type ${n.identifier} is not a multiple-apply API schema.`);if(r==="")throw new Error(`ApplyAPI: for multiple apply API schema ${n.identifier}, a non-empty instance name must be provided.`);return this.getStage().applyAPI(this.path,`${n.identifier}:${r}`),!0}removeAPI(e,t,s){const{info:n,instance:r}=this._resolveAppliedSchemaArgs("RemoveAPI",e,t,s);if(r===void 0){if(n.kind!=="singleApplyAPI")throw new Error(`RemoveAPI: Provided schema type ${n.identifier} is not a single-apply API schema.`);return this.getStage().removeAppliedSchema(this.path,n.identifier),!0}if(n.kind!=="multipleApplyAPI")throw new Error(`RemoveAPI: Provided schema type ${n.identifier} is not a multiple-apply API schema.`);if(r==="")throw new Error(`RemoveAPI: for multiple apply API schema ${n.identifier}, a non-empty instance name must be provided.`);return this.getStage().removeAppliedSchema(this.path,`${n.identifier}:${r}`),!0}isInstance(){return this._nodes.get(this._dataPath)?.fields.__prototypePath!==void 0}getPrototype(){const e=this._nodes.get(this._dataPath)?.fields.__prototypePath;if(!(e===void 0||!this._nodes.has(e)))return new Fs(this._nodes,e,void 0,this._stage)}isInstanceable(){return this._nodes.get(this._dataPath)?.fields.instanceable===!0}isInstanceProxy(){return this._dataPath!==this.path}getPrimInPrototype(){if(this.isInstanceProxy())return new Fs(this._nodes,this._dataPath,void 0,this._stage)}isPrototype(){return/^\/__Prototype_\d+$/.test(this.path)}isInPrototype(){return/^\/__Prototype_\d+([/.]|$)/.test(this._dataPath)&&!this.isInstanceProxy()}}class ji{constructor(e,t,s,n,r,o,a){this._nodes=e,this._path=t,this._fallbackSource=s,this._queryProvider=n,this._dataPrimPath=r,this._propertyName=o,this._resultPrimPath=a}get node(){return this._nodes.get(this._path)??{fields:{}}}_getStage(){return this._queryProvider}_getPrimPath(){if(this._dataPrimPath!==void 0)return this._dataPrimPath;const e=this._path.indexOf(".");return e<0?this._path:this._path.slice(0,e)}_getName(){if(this._propertyName!==void 0)return this._propertyName;const e=this._path.indexOf(".");return e<0?"":this._path.slice(e+1)}flattenTo(e,t){if(!this._queryProvider)throw new Error(`Cannot flatten invalid property <${this._path}>`);return this._queryProvider._flattenProperty(this,e,t)}getPropertyStack(e="default"){return this._queryProvider?this._queryProvider.getPropertyStack(`${this._getPrimPath()}.${this._getName()}`,e):[]}getPropertyStackWithLayerOffsets(e="default"){return this._queryProvider?this._queryProvider.getPropertyStackWithLayerOffsets(`${this._getPrimPath()}.${this._getName()}`,e):[]}#s(){return this._fallbackSource?.def()?.getAttributeFallbackValue(this._fallbackSource.name)}hasFallbackValue(){return this.#s()!==void 0}getFallbackValue(){return this.#s()}#t(e){if(!(!this._queryProvider||this._dataPrimPath===void 0||this._propertyName===void 0))return this._queryProvider._resolveAttribute(this._dataPrimPath,this._propertyName,e,()=>this.#s())}getValue(){const e=this.#t("default");if(e)return e.valueIsBlocked?void 0:e.value;if("default"in this.node.fields){const t=this.node.fields.default;return t instanceof Pe||t instanceof St?void 0:t}return this.#s()}hasAuthoredValue(){const e=this.#t(void 0);return e?Rr(e).hasAuthoredValue():"default"in this.node.fields||(this.node.timeSamples?.length??0)>0}hasAuthoredValueOpinion(){const e=this.#t(void 0);return e?Rr(e).hasAuthoredValueOpinion():this.hasAuthoredValue()}hasValue(){const e=this.#t(void 0);return e?e.source!=="none"||e.valueIsBlocked:this.getValue()!==void 0}getResolveInfo(e){const t=this.#t(e)??{source:this.getValue()===void 0?"none":"default",value:this.getValue(),valueIsBlocked:!1};return Rr(t)}get typeName(){return this.getField("typeName")??""}get isRelationship(){return this.typeName==="rel"}isCustom(){return!this._queryProvider||this._dataPrimPath===void 0||this._propertyName===void 0?this.node.fields.custom===!0:this._queryProvider._isPropertyCustom(this._dataPrimPath,this._propertyName)}getField(e){return e==="spline"?this.getSpline():this._queryProvider&&this._dataPrimPath!==void 0&&this._propertyName!==void 0?this._queryProvider._resolvePropertyField(this._dataPrimPath,this._propertyName,e):this.node.fields[e]}_getMetadataValueTypeName(e){if(!(!this._queryProvider||this._dataPrimPath===void 0||this._propertyName===void 0))return this._queryProvider._resolvePropertyFieldTypeName(this._dataPrimPath,this._propertyName,e)}setMetadata(e,t){return!this._queryProvider||this._dataPrimPath===void 0||this._propertyName===void 0?!1:(this._queryProvider._setPropertyMetadata(this._dataPrimPath,this._propertyName,e,t),!0)}getConnections(){if(this._queryProvider&&this._dataPrimPath!==void 0&&this._propertyName!==void 0)return this._queryProvider._resolvePropertyPaths(this._dataPrimPath,this._propertyName,"connectionPaths",this._resultPrimPath)??[];const e=this.node.fields.connectionPaths;return typeof e=="string"?[e]:Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}getTargets(){if(this._queryProvider&&this._dataPrimPath!==void 0&&this._propertyName!==void 0)return this._queryProvider._resolvePropertyPaths(this._dataPrimPath,this._propertyName,"targetPaths",this._resultPrimPath)??[];const e=this.node.fields.targetPaths;return typeof e=="string"?[e]:Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}getDefaultValue(){const e=this.#t("default");if(e)return e.valueIsBlocked?void 0:e.value;if("default"in this.node.fields){const t=this.node.fields.default;return t instanceof Pe||t instanceof St?void 0:t}return this.#s()}getDefaultValueResult(){const e=this.#t("default");return e?.source==="default"?{source:"authored",value:e.value}:e?{source:"fallback",value:e.value??null}:"default"in this.node.fields?{source:"authored",value:this.node.fields.default}:{source:"fallback",value:this.#s()??null}}getTimeSampleKeys(){const e=this.#t(void 0);return e?(e.timeSamples??[]).map(([t])=>t).sort((t,s)=>t-s):this.node.clips?.length?er(this.node.clips[0]):(this.node.timeSamples??[]).map(([t])=>t).sort((t,s)=>t-s)}hasSpline(){return this.#t(void 0)?.source==="spline"}getSpline(){const e=this.#t(void 0);return e?.source==="spline"?Zy(e.spline,e.layerToStageOffset):void 0}getTimeSamplesInInterval(e){const t=e.GetMin(),s=e.GetMax();return this.getTimeSampleKeys().filter(n=>(n>t||n===t&&e.IsMinClosed())&&(n<s||n===s&&e.IsMaxClosed()))}static getUnionedTimeSamples(e){return[...new Set(e.flatMap(t=>t.getTimeSampleKeys()))].sort((t,s)=>t-s)}static getUnionedTimeSamplesInInterval(e,t){return[...new Set(e.flatMap(s=>s.getTimeSamplesInInterval(t)))].sort((s,n)=>s-n)}getBracketingTimeSamples(e){const t=this.getTimeSampleKeys();if(t.length===0)return[];const s=[...t].reverse().find(r=>r<=e)??t[0],n=t.find(r=>r>=e)??t[t.length-1];return[s,n]}getValueAtTime(e,t){const{time:s,isPreTime:n}=S0(e);if(s==="default")return this.getValue();const r=this.#t(s);if(r){if(r.valueIsBlocked)return;if(r.source==="spline")return Bu(r.spline,s,n,r.layerToStageOffset);if(r.source==="timeSamples"){if(r.valueEvaluator)return r.valueEvaluator(s,n);const l=Ji(r.timeSamples??[],s,t?.interpolation??r.interpolation,n,r.typeName);return l instanceof Pe?void 0:l}return r.source==="valueClips"&&n&&r.valueEvaluator?r.valueEvaluator(s,!0):r.value}if(this.node.clips)for(const l of this.node.clips){const u=Ja(l,s,t?.interpolation,!1,this.typeName);if(u!==void 0)return u}const o=this.node.fields.spline;if(o)return Bu(o,s,n);const a=this.node.timeSamples;if(!a||a.length===0)return this.getValue();const c=Ji(a,s,t?.interpolation,n,this.typeName);return c instanceof Pe?void 0:c}getStage(){const e=this._getStage();if(!e)throw new Error(`Attribute <${this._path}>: this handle carries no stage`);return e}get primPath(){return this._resultPrimPath??this._getPrimPath()}get name(){return this._getName()}_rejectOpaqueValue(e){if(!(e instanceof Pe||e instanceof St)&&this.typeName==="opaque")throw new Error(`Cannot author opaque-valued attribute <${this.primPath}.${this.name}>`)}set(e){this._rejectOpaqueValue(e),this.getStage()._setAttrDefault(this.primPath,this.name,e)}setTimeSample(e,t){if(t instanceof St)throw new Error("SdfAnimationBlock can only be authored at the default time");this._rejectOpaqueValue(t),this.getStage()._setAttrTimeSample(this.primPath,this.name,e,t)}connect(e){this.getStage()._setAttrConnections(this.primPath,this.name,[e])}setConnections(e){this.getStage()._setAttrConnections(this.primPath,this.name,e)}addConnection(e,t=h_){return this.getStage()._addAttrConnection(this.primPath,this.name,e,t),!0}removeConnection(e){return this.getStage()._removeAttrConnection(this.primPath,this.name,e),!0}clearConnections(){return this.getStage()._clearAttrConnections(this.primPath,this.name),!0}hasColorSpace(){return typeof this.getField("colorSpace")=="string"}getColorSpace(){const e=this.getField("colorSpace");return typeof e=="string"?e:""}setColorSpace(e){return this.setMetadata("colorSpace",e)}getMetadata(e){return this.getField(e)}getAllAuthoredMetadata(){const t=this.getStage()._getAllAuthoredPropertyMetadata(this._getPrimPath(),this._getName(),this);return t.custom??=!1,this.isRelationship||(t.typeName??=this.typeName,t.variability??=this.getField("variability")??"varying"),t}getAllMetadata(){const e=this.getAllAuthoredMetadata(),t=this._fallbackSource?.def()?.getPropertyDefinition(this._getName());if(!t?.isValid())return e;const s={};for(const n of t.listMetadataFields()){const r=t.getMetadata(n);r!==void 0&&(s[n]=r)}for(const[n,r]of Object.entries(e)){const o=s[n];s[n]=Lt(r)&&Lt(o)?fo(r,o):r}return s}hasMetadata(e){return this.getMetadata(e)!==void 0}hasAuthoredMetadata(e){return this.getStage()._hasAuthoredPropertyMetadata(this.primPath,this.name,e)}clearMetadata(e){return this.getStage()._clearPropertyField(this.primPath,this.name,e),!0}_clearMetadata(e){this.getStage()._clearPropertyField(this.primPath,this.name,e)}getLimits(e){return new u_(this,e)}getSoftLimits(){return this.getLimits("soft")}getHardLimits(){return this.getLimits("hard")}clear(){return this.getStage()._replaceAttrValueOpinions(this.primPath,this.name),!0}block(){this.getStage()._replaceAttrValueOpinions(this.primPath,this.name,new Pe)}blockAnimation(){this.getStage()._replaceAttrValueOpinions(this.primPath,this.name,new St)}setSpline(e){if(this.typeName!=="double"&&this.typeName!=="float"&&this.typeName!=="half"&&this.typeName!=="timecode")throw new Error(`Spline on attribute '${this.name}' is incompatible with type '${this.typeName}'`);return this.setMetadata("spline",e)}get(){return this.getValue()}}class ds{#s;#t;constructor(e,t){if(this.#s=e,!e)this.#t=K.identity();else if(t&&"mapToRoot"in t){const s=t,n=s.layerStack.layers.find(r=>r.layer===e)?.offset??Ls;this.#t=s.mapToRoot.composeOffset(n)}else{const s=t??Ls;this.#t=K.create([["/","/"]],s)}}isNull(){return this.#s===void 0}isValid(){return this.#s!==void 0}getLayer(){return this.#s}getMapFunction(){return this.#t}mapToSpecPath(e){return this.#t.mapTargetToSource(B.fromString(e)).pathString}composeOver(e){const t=this.#s??e.#s,s=new ds(t);return s.#t=this.#t.compose(e.#t),s}}class Ph{constructor(e,t,s){this._stage=e,this._primPath=t,this.name=s}getVariantNames(){return this._stage._variantNames(this._primPath,this.name)}getVariantSelection(){return this._stage._variantSelection(this._primPath,this.name)}async addVariant(e){const t=this._stage.getEditTarget().getLayer(),s=`${this._primPath}{${this.name}=}`,n=t.getField(s,"variantChildren")??[];await this._stage._ownAuthoringAsync(async()=>{n.includes(e)||t.setField(s,"variantChildren",[...n,e]),await this._stage._recomposeForEdit(this._primPath)})}async setVariantSelection(e){const t=this._stage.getEditTarget().getLayer(),s=t.getField(this._primPath,"variantSelection"),n=s&&typeof s=="object"?{...s}:{};e===""?delete n[this.name]:n[this.name]=[e],await this._stage._ownAuthoringAsync(async()=>{t.setField(this._primPath,"variantSelection",n),await this._stage._recomposeForEdit(this._primPath)})}}class T0{constructor(e,t){this._stage=e,this._primPath=t}getNames(){return this._stage._variantSetNames(this._primPath)}hasVariantSet(e){return this.getNames().includes(e)}async addVariantSet(e){const t=this._stage.getEditTarget().getLayer(),s=t.getField(this._primPath,"variantSetChildren")??[];return await this._stage._ownAuthoringAsync(async()=>{if(!s.includes(e)){t.setField(this._primPath,"variantSetChildren",[...s,e]);const n=`${this._primPath}{${e}=}`;t.getField(n,"variantChildren")===void 0&&t.setField(n,"variantChildren",[])}await this._stage._recomposeForEdit()}),new Ph(this._stage,this._primPath,e)}getVariantSet(e){return new Ph(this._stage,this._primPath,e)}getAllVariantSelections(){const e={};for(const t of this.getNames()){const s=this._stage._variantSelection(this._primPath,t);s&&(e[t]=s)}return e}}function Hp(i,e){const t={...i};return Object.defineProperties(t,{getPrimResyncType:{enumerable:!1,value(s){if(!i.resyncedPaths.includes(s))return"Invalid";if(!e)return"Other";if(!e.newPath)return s===e.oldPath?"Delete":"Other";if(s!==e.oldPath&&s!==e.newPath)return"Other";const n=e.oldPath.slice(0,e.oldPath.lastIndexOf("/"))||"/",r=e.newPath.slice(0,e.newPath.lastIndexOf("/"))||"/",o=e.oldPath.slice(e.oldPath.lastIndexOf("/")+1),a=e.newPath.slice(e.newPath.lastIndexOf("/")+1),c=s===e.oldPath?"Source":"Destination";return n!==r&&o!==a?`RenameAndReparent${c}`:n!==r?`Reparent${c}`:`Rename${c}`}},getAssociatedPath:{enumerable:!1,value(s){if(e?.newPath){if(s===e.oldPath)return e.newPath;if(s===e.newPath)return e.oldPath}}}}),t}function wh(i){return JSON.stringify(i.fields)+"\0"+JSON.stringify(i.timeSamples??null)}function pi(i){const e=i.indexOf(".");return e<0?i:i.slice(0,e)}function x0(i,e){const t=new Set,s=new Set;for(const[o,a]of i){const c=e.get(o);c?wh(a)!==wh(c)&&s.add(o):t.add(pi(o))}for(const o of e.keys())i.has(o)||t.add(pi(o));const n=[];for(const o of[...t].sort())n.some(a=>o===a||o.startsWith(`${a}/`))||n.push(o);const r=[...s].filter(o=>{const a=pi(o);return!n.some(c=>a===c||a.startsWith(`${c}/`))});return Hp({resyncedPaths:n,changedInfoOnlyPaths:r})}const fr={0:"local",1:"inherit",2:"variant",3:"relocate",4:"reference",5:"payload",6:"specialize"};function Zo(i){if(i==null)return;let e;if(Array.isArray(i))e=i;else if(typeof i=="object")e=Object.entries(i).map(([t,s])=>[Number(t),s]).sort(([t],[s])=>t-s);else return;if(e.length!==0)return e.map(([t,s])=>{const n=typeof s=="object"&&s!==null&&"value"in s?s.value:s;return[t,n]})}async function bh(i,e){if(!At.IsEnabled())return e(void 0);const t=Qn();return Xi(t,"usd-ts:Stage.open",s=>(Me(s,"filePath",i),e(s)))}async function yo(i,e,t){return i?Xi(i,e,t):await t(void 0)}function D0(i,e,t){return i?zn(i,e,t):t(void 0)}function Yo(i,e){return At.IsEnabled()?zn(Qn(),i,e):e(void 0)}async function vh(i,e){return At.IsEnabled()?Xi(Qn(),i,e):await e(void 0)}const tc=new WeakMap,k0=i=>tc.get(i)?.current,C0=/^\/__Prototype_\d+$/;function Ih(i){return C0.test(i)}function Fr(i){return/^\/__Prototype_\d+([/.]|$)/.test(i)}const N0={instanceToProto:new Map,protoToSource:new Map},M0=(i,e)=>i===e||e==="/"||i.startsWith(`${e}/`),E0=i=>{const e=i.lastIndexOf("/");return e<=0?"/":i.slice(0,e)},mr=(i,e,t)=>i===e||i.startsWith(`${e}/`)?t+i.slice(e.length):i;class Wn{instanceKeyToPrototype=new Map;prototypeToInstanceKey=new Map;prototypeToSource=new Map;prototypeToPrimIndexes=new Map;primIndexToPrototype=new Map;pendingAddedPrimIndexes=new Map;pendingRemovedPrimIndexes=new Map;lastPrototypeIndex=0;registerInstancePrimIndex(e,t){let s=this.pendingAddedPrimIndexes.get(t);s||(s=new Set,this.pendingAddedPrimIndexes.set(t,s)),s.add(e);const n=this.instanceKeyToPrototype.get(t);return n===void 0?s.size===1:this.prototypeToSource.get(n)===e}unregisterInstancePrimIndexesUnder(e){for(const[t,s]of this.primIndexToPrototype){if(!M0(t,e))continue;const n=this.prototypeToInstanceKey.get(s);if(n===void 0)continue;let r=this.pendingRemovedPrimIndexes.get(n);r||(r=new Set,this.pendingRemovedPrimIndexes.set(n,r)),r.add(t)}}processChanges(){return D0(k0(this),"usd-ts:UsdInstanceCache.processChanges",e=>(e&&(Me(e,"pendingAddedKeys",this.pendingAddedPrimIndexes.size),Me(e,"pendingRemovedKeys",this.pendingRemovedPrimIndexes.size)),this._processChanges()))}_processChanges(){const e={newPrototypePrims:[],newPrototypePrimIndexes:[],changedPrototypePrims:[],changedPrototypePrimIndexes:[],deadPrototypePrims:[]},t=new Set;for(const[n,r]of this.pendingRemovedPrimIndexes){const o=this.pendingAddedPrimIndexes.get(n)??new Set,a=[...r].filter(h=>!o.has(h)),c=this.instanceKeyToPrototype.get(n);if(c===void 0)continue;const l=this.prototypeToPrimIndexes.get(c)??[],u=this.prototypeToSource.get(c);for(const h of a){const d=l.indexOf(h);d>=0&&l.splice(d,1),this.primIndexToPrototype.delete(h)}u!==void 0&&a.includes(u)&&(this.prototypeToSource.delete(c),l.length>0&&(l.sort(),this.prototypeToSource.set(c,l[0]),t.add(c))),this.prototypeToPrimIndexes.set(c,l)}const s=[...this.pendingAddedPrimIndexes.entries()].sort((n,r)=>{const o=[...n[1]][0]??"",a=[...r[1]][0]??"";return a.split("/").length-o.split("/").length||o.localeCompare(a)});for(const[n,r]of s){const o=[...r][0],a=[...r].sort();let c=this.instanceKeyToPrototype.get(n);c===void 0?(c=`/__Prototype_${++this.lastPrototypeIndex}`,this.instanceKeyToPrototype.set(n,c),this.prototypeToInstanceKey.set(c,n),this.prototypeToSource.set(c,o),this.prototypeToPrimIndexes.set(c,[]),e.newPrototypePrims.push(c),e.newPrototypePrimIndexes.push(o)):this.prototypeToSource.has(c)||(this.prototypeToSource.set(c,o),t.add(c));const l=this.prototypeToPrimIndexes.get(c)??[];for(const u of a)this.primIndexToPrototype.set(u,c),l.includes(u)||l.push(u);l.sort(),this.prototypeToPrimIndexes.set(c,l)}for(const n of t){const r=this.prototypeToSource.get(n);r!==void 0&&(e.changedPrototypePrims.push(n),e.changedPrototypePrimIndexes.push(r))}for(const n of this.pendingRemovedPrimIndexes.keys()){const r=this.instanceKeyToPrototype.get(n);r!==void 0&&((this.prototypeToPrimIndexes.get(r)??[]).length>0||(e.deadPrototypePrims.push(r),this.instanceKeyToPrototype.delete(n),this.prototypeToInstanceKey.delete(r),this.prototypeToSource.delete(r),this.prototypeToPrimIndexes.delete(r)))}return this.pendingAddedPrimIndexes.clear(),this.pendingRemovedPrimIndexes.clear(),e}getInstancingInfo(){return{instanceToProto:new Map(this.primIndexToPrototype),protoToSource:new Map(this.prototypeToSource)}}getPrototypeForInstanceablePrimIndexPath(e){return this.primIndexToPrototype.get(e)}getPrimsInPrototypesUsingPrimIndexPath(e){const t=[];let s=e;for(;s!=="/";){const n=this._findInstanceAtOrAbove(s);if(!n)break;const[r,o]=n,a=this.prototypeToSource.get(o);if(a===void 0||((s===a||s.startsWith(`${a}/`))&&t.push(mr(e,a,o)),r!==s))break;s=E0(r)}return[...new Set(t)]}isPathDescendantToAnInstance(e){return this._findStrictInstanceAncestor(e)!==void 0}getPathInPrototypeForInstancePath(e){let t=e;if(Fr(e)){const n=[...this.prototypeToSource.keys()].filter(r=>e===r||e.startsWith(`${r}/`)).sort((r,o)=>o.length-r.length)[0];if(n===void 0)return;t=mr(e,n,this.prototypeToSource.get(n))}let s=t;for(;s!==void 0;){const n=this._findStrictInstanceAncestor(s);if(!n)break;const[r,o]=n,a=this.prototypeToSource.get(o);if(a===void 0)break;if(r===a)return mr(s,r,o);s=mr(s,r,a)}}getMostAncestralInstancePath(e){return[...this.primIndexToPrototype.keys()].filter(t=>e.startsWith(`${t}/`)).sort((t,s)=>t.length-s.length)[0]}_findInstanceAtOrAbove(e){const t=[...this.primIndexToPrototype.keys()].filter(s=>e===s||e.startsWith(`${s}/`)).sort((s,n)=>n.length-s.length)[0];return t===void 0?void 0:[t,this.primIndexToPrototype.get(t)]}_findStrictInstanceAncestor(e){const t=[...this.primIndexToPrototype.keys()].filter(s=>e.startsWith(`${s}/`)).sort((s,n)=>n.length-s.length)[0];return t===void 0?void 0:[t,this.primIndexToPrototype.get(t)]}}function Kp(i,e){let t=tc.get(i);t||(t={current:void 0,installations:[]},tc.set(i,t));const s={};return t.installations.length===0&&(t.current?t.base=t.current:delete t.base),t.installations.push({token:s,context:e}),t.current=e,{holder:t,token:s}}function Zp(i,e){const t=i.installations.findIndex(s=>s.token===e);t>=0&&i.installations.splice(t,1),i.current=i.installations.at(-1)?.context??i.base,i.installations.length===0&&delete i.base}function B0(i,e,t){const{holder:s,token:n}=Kp(i,e);try{return t()}finally{Zp(s,n)}}async function O0(i,e,t){const{holder:s,token:n}=Kp(i,e);try{return await t()}finally{Zp(s,n)}}const pn=(i,e)=>{const t=i<0?i+e:i;return t>=0&&t<e?t:void 0},Ah=(i,e)=>{if(i==="end")return e;const t=i<0?i+e:i;return t>=0&&t<=e?t:void 0},Th=(i,e)=>{if(e!==void 0)return e;const t=i[0];return typeof t=="string"?"":typeof t=="boolean"?!1:0};class ms{#s;constructor(e=[]){this.#s=[...e]}IsIdentity(){return this.#s.length===0}GetLiterals(){return this.#s.flatMap(e=>"value"in e?[e.value]:[])}GetMutableLiterals(){return[...this.GetLiterals()]}StreamCustom(e=String){return this.#s.map(t=>{const s=Object.entries(t).filter(([n])=>n!=="kind").map(([n,r])=>`${n}=${n==="value"?e(r):String(r)}`);return`${t.kind}(${s.join(", ")})`}).join("; ")}_serialization(){return this.#s}_transformLiterals(e){return new ms(this.#s.map(t=>"value"in t?{...t,value:e(t.value)}:"fill"in t&&t.fill!==void 0?{...t,fill:e(t.fill)}:t))}equals(e){return this.#s.length!==e.#s.length?!1:this.#s.every((t,s)=>{const n=e.#s[s];if(!n||t.kind!==n.kind)return!1;const r=t,o=n,a=Object.keys(r);return a.length===Object.keys(o).length&&a.every(c=>r[c]===o[c])})}ComposeOver(e){if(e instanceof ms)return new ms([...e.#s,...this.#s]);const t=[...e];for(const s of this.#s)switch(s.kind){case"write":{const n=pn(s.index,t.length);n!==void 0&&(t[n]=s.value);break}case"writeRef":{const n=pn(s.source,t.length),r=pn(s.destination,t.length);n!==void 0&&r!==void 0&&(t[r]=t[n]);break}case"insert":{const n=Ah(s.index,t.length);n!==void 0&&t.splice(n,0,s.value);break}case"insertRef":{const n=pn(s.source,t.length),r=Ah(s.destination,t.length);n!==void 0&&r!==void 0&&t.splice(r,0,t[n]);break}case"erase":{const n=pn(s.index,t.length);n!==void 0&&t.splice(n,1);break}case"minSize":{if(s.size<0||t.length>=s.size)break;const n=Th(t,s.fill);for(;t.length<s.size;)t.push(n);break}case"setSize":{if(s.size<0)break;if(t.length>s.size)t.length=s.size;else{const n=Th(t,s.fill);for(;t.length<s.size;)t.push(n)}break}case"maxSize":s.size>=0&&t.length>s.size&&(t.length=s.size);break}return t}}const We=i=>L.Define(i),R0={bool:We("bool"),uchar:We("uchar"),short:We("short"),ushort:We("ushort"),int:We("int"),uint:We("uint"),int64:We("int64"),uint64:We("uint64"),half:We("half"),float:We("float"),double:We("double"),string:We("string"),token:We("token"),dictionary:We("VtDictionary")};Object.values(R0);const F0=new Map([["uchar",[0,255]],["short",[-32768,32767]],["ushort",[0,65535]],["int",[-2147483648,2147483647]],["uint",[0,4294967295]],["int64",[Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER]],["uint64",[0,Number.MAX_SAFE_INTEGER]]]);[...F0.keys()];function _o(i,e){return i==="/"?`.${e}`:`${i}.${e}`}const G0=()=>({source:"none",valueIsBlocked:!1});function*sc(i,e){let t=-1;for(const s of i.getNodeRange()){if(t++,s.inert)continue;const n=F(s.path.appendProperty(e));for(let r=0;r<s.layerStack.layers.length;r++){const{layer:o,offset:a}=s.layerStack.layers[r];yield{nodeIndex:t,layerIndex:r,node:s,layer:o,specPath:n,layerToStageOffset:os(s.mapToRoot.getTimeOffset(),a)}}}}function $0(i,e,t,s=[]){let n=!1;const r=[],o=[...sc(i,e)].some(u=>u.layer.getField(u.specPath,"typeName")==="pathExpression"),a=(u,h,d)=>{if(!o||typeof u!="string")return u;const f=d.lastIndexOf("."),p=B.fromString(f<0?d:d.slice(0,f)),y=new He(u).makeAbsolute(p);return h.mapToRoot.mapSourceToTarget(h.path).isEmpty()?new He(""):y.mapPaths(g=>h.mapToRoot.mapSourceToTarget(g))},c=u=>u instanceof ms||u instanceof He,l=()=>{for(let g=0;g+1<r.length;g++)r[g].nextWeaker=r[g+1];const u=g=>{let S;for(const _ of g)if(S instanceof ms)if(_ instanceof ms)S=S.ComposeOver(_);else return Array.isArray(_)?S.ComposeOver(_):S.ComposeOver([]);else if(S instanceof He)if(_ instanceof He)S=S.composeOver(_);else return S.composeOver(new He("")).text;else if(_ instanceof ms)S=_;else if(_ instanceof He)S=_;else return _;return S instanceof ms?S.ComposeOver([]):S instanceof He?S.composeOver(new He("")).text:S},h=[...new Set(r.flatMap(g=>g.source==="timeSamples"?(g.timeSamples??[]).map(([S])=>S):[]))].sort((g,S)=>g-S),d=(g,S)=>{let _=g[0]?.[1];for(const[P,w]of g){if(P>S)break;_=w}return _},f=h.map(g=>[g,u(r.map(S=>S.source==="timeSamples"?d(S.timeSamples??[],g):S.value))]),p=(g,S)=>{for(const _ of r){if(_.source!=="timeSamples")continue;const P=_.timeSamples??[],w=d(P,g),v=d(P,S);if(w!==v)return c(w)&&c(v)}return!1},y=(g,S)=>{if(f.length===0)return u(r.map(b=>b.value));if(g<=f[0][0])return f[0][1];if(g>f[f.length-1][0])return f[f.length-1][1];const _=f.findIndex(([b])=>b===g);if(_>=0&&!S)return f[_][1];let P=_>=0?_:1;if(_<0)for(;f[P][0]<g;)P++;const w=f[P-1],v=f[P];return p(w[0],v[0])?w[1]:Ji([w,v],g,void 0,S)},m=r[0];return m.valueEvaluator=y,typeof t=="number"?m.value=y(t,!1):(t==="default"||f.length===0)&&(m.value=y(0,!1)),m};for(const{nodeIndex:u,layerIndex:h,node:d,layer:f,specPath:p,layerToStageOffset:y}of sc(i,e)){if(t!=="default"&&!n){const g=f.getField(p,"timeSamples");if(g!=null){const _=z0(g);if(_.length>0){const P={source:"timeSamples",valueIsBlocked:!1,timeSamples:_.map(([w,v])=>[lt(y,w),a(j0(v),d,p)]),layer:f,specPath:p,layerToStageOffset:y,node:d};if(r.length>0||P.timeSamples.some(([,w])=>c(w))){if(r.push(P),!P.timeSamples.some(([,w])=>c(w)))return l();continue}return P}}const S=f.getField(p,"spline");if(S!=null)return{source:"spline",spline:S,valueIsBlocked:!1,layer:f,specPath:p,layerToStageOffset:y,node:d}}const m=a(f.getField(p,"default"),d,p);if(m!==void 0){if(m instanceof St){n=!0;continue}if(m instanceof Pe||m===null)return r.length>0?l():{source:"none",valueIsBlocked:!0,layer:f,specPath:p,layerToStageOffset:y,node:d};if(c(m)){const g={source:"default",value:m,valueIsBlocked:!1,layer:f,specPath:p,layerToStageOffset:y,node:d};r.push(g);continue}return r.length>0&&(Array.isArray(m)||m instanceof He)?(r.push({source:"default",value:m,valueIsBlocked:!1,layer:f,specPath:p,layerToStageOffset:y,node:d}),l()):{source:"default",value:m,valueIsBlocked:!1,layer:f,specPath:p,layerToStageOffset:y,node:d}}if(t!=="default"&&!n)for(const g of s){if(g.position[0]!==u||g.position[1]!==h)continue;const S=g.resolve(t);if(S)return S}}return r.length>0?l():G0()}function Wt(i,e){return ic(i,e)?.value}function ic(i,e){for(const t of i.getNodeRange()){if(t.inert)continue;const s=F(t.path);for(const{layer:n,offset:r}of t.layerStack.layers){const o=n.getField(s,e);if(o!=null)return{value:o,layer:n,specPath:s,layerToStageOffset:os(t.mapToRoot.getTimeOffset(),r),node:t}}}}function L0(i){const e=new Set;for(const a of i.getNodeRange())if(!a.inert)for(const{layer:c}of a.layerStack.layers){const l=c.getField(F(a.path),"properties");if(l)for(const u of l)e.add(u)}const t=[...e].sort(uo),s=Wt(i,"propertyOrder");if(!Array.isArray(s)||s.length===0)return t;const n=new Set(t),r=s.filter((a,c)=>n.has(a)&&s.indexOf(a)===c),o=new Set(r);return[...r,...t.filter(a=>!o.has(a))]}function Gr(i,e,t){return nc(i,e,t)?.value}function xh(i,e,t){const s=[...i.getNodeRange()];for(let n=s.length-1;n>=0;--n){const r=s[n];if(r.inert)continue;const o=_o(F(r.path),e);for(let a=r.layerStack.layers.length-1;a>=0;--a){const c=r.layerStack.layers[a].layer,l=c.getField(o,t);if(l!=null)return l;if(c.hasSpec(o))return t==="custom"?!1:c.getSpecType(o)==="relationship"?"uniform":"varying"}}}function V0(i,e){const t=[...i.getNodeRange()];for(let s=t.length-1;s>=0;--s){const n=t[s];if(n.inert)continue;const r=_o(F(n.path),e);for(let o=n.layerStack.layers.length-1;o>=0;--o)if(n.layerStack.layers[o].layer.getField(r,"custom")===!0)return!0}return!1}function nc(i,e,t){for(const s of i.getNodeRange()){if(s.inert)continue;const n=_o(F(s.path),e);for(const{layer:r,offset:o}of s.layerStack.layers){const a=r.getField(n,t);if(a!=null)return{value:a,layer:r,specPath:n,layerToStageOffset:os(s.mapToRoot.getTimeOffset(),o),node:s}}}}function Yp(i){let e=!1;for(const t of i.getNodeRange()){if(t.inert)continue;const s=F(t.path);for(const{layer:n}of t.layerStack.layers){const r=n.getField(s,"specifier");if(r==="def"||r===0)return"def";if(r==="class"||r===2){let o=!1;for(let a=t;a!==null;a=a.parent)if(wp(a.arcType)&&!a.isDueToAncestor()){o=!0;break}if(!o)return"class";e=!0}}}return e?"class":"over"}function Xp(i,e){const t=[];e:for(const s of i.getNodeRange()){if(s.inert)continue;const n=F(s.path);for(const{layer:r}of s.layerStack.layers){const o=rs(r.getField(n,e));if(o!==null&&(t.push(o),o.isExplicit))break e}}return Hd(t)}function U0(i,e,t,s,n=r=>r){let r=[],o=!1;for(const a of[...i.getNodeRange()].reverse()){if(a.inert)continue;const c=_o(F(a.path),e);for(let l=a.layerStack.layers.length-1;l>=0;l--){const{layer:u}=a.layerStack.layers[l],h=u.getField(c,t);if(h==null)continue;const d=rs(h);if(d===null)continue;const f=(p,y)=>p.flatMap(m=>{const g=B.fromString(m),S=a.mapToRoot.mapSourceToTarget(g);if(S.isEmpty())return[];if(y&&s&&wp(a.arcType)){const _=bs(a);if(!g.hasPrefix(_)){const P=a.mapToRoot.mapSourceToTarget(_);if(!P.isEmpty()&&S.hasPrefix(P))return[]}}return[n(S.pathString)]});r=Ks(r,{isExplicit:d.isExplicit,explicitItems:f(d.explicitItems,!0),prependedItems:f(d.prependedItems,!0),appendedItems:f(d.appendedItems,!0),deletedItems:f(d.deletedItems,!1),orderedItems:f(d.orderedItems,!0)}),o=!0}}return o?r:void 0}function z0(i){return Array.isArray(i)?i:typeof i=="object"&&i!==null?Object.entries(i).map(([e,t])=>[Number(e),t]).sort(([e],[t])=>e-t):[]}function j0(i){return typeof i=="object"&&i!==null&&"value"in i?i.value:i}const de={All:"all",Only:"only",None:"none"},ii=(i,e)=>i===e||e==="/"||i.startsWith(`${e}/`),Xo=(i,e)=>i[0]<e[0]?-1:i[0]>e[0]?1:0;class qs{static AllRule=de.All;static OnlyRule=de.Only;static NoneRule=de.None;rules=[];constructor(e=!0){e||this.rules.push(["/",de.None])}static loadAll(){return new qs}static loadNone(){return new qs(!1)}clone(){const e=new qs;return e.setRules(this.rules),e}getRules(){return this.rules.map(([e,t])=>[e,t])}setRules(e){this.rules=e.map(([t,s])=>[t,s]).sort(Xo)}addRule(e,t){const s=this.rules.findIndex(([n])=>n===e);s>=0?this.rules[s]=[e,t]:this.rules.push([e,t]),this.rules.sort(Xo)}loadWithDescendants(e){this.replaceSubtree(e,de.All)}loadWithoutDescendants(e){this.replaceSubtree(e,de.Only)}unload(e){this.replaceSubtree(e,de.None)}loadAndUnload(e,t,s="withDescendants"){for(const n of t)this.unload(n);for(const n of e)s==="withDescendants"?this.loadWithDescendants(n):this.loadWithoutDescendants(n)}minimize(){const e=[];for(const t of this.rules){let s=de.All,n=-1;for(const[r,o]of e)r.length>n&&ii(t[0],r)&&(s=o,n=r.length);t[1]!==s&&e.push(t)}this.rules=e}isLoaded(e){return this.getEffectiveRuleForPath(e)!==de.None}isLoadedWithAllDescendants(e){const t=this.longestPrefix(e);return t&&t[1]!==de.All?!1:this.rules.filter(([s])=>ii(s,e)).every(([,s])=>s===de.All)}isLoadedWithNoDescendants(e){return this.rules.find(([s])=>s===e)?.[1]!==de.Only?!1:!this.rules.some(([s,n])=>s!==e&&ii(s,e)&&n!==de.None)}getEffectiveRuleForPath(e){const t=this.longestPrefix(e);if(!t||t[1]===de.All)return de.All;if(t[0]===e&&t[1]===de.Only)return de.Only;const s=this.rules.filter(([n])=>n!==e&&ii(n,e));for(let n=0;n<s.length;){const[r,o]=s[n];if(o===de.All||o===de.Only)return de.Only;for(n++;n<s.length&&ii(s[n][0],r);)n++}return de.None}equals(e){return JSON.stringify(this.rules)===JSON.stringify(e.rules)}isIncluded(e){return this.isLoaded(e)}include(e){const t=JSON.stringify(this.rules);return this.loadWithDescendants(e),t!==JSON.stringify(this.rules)}exclude(e){const t=JSON.stringify(this.rules);return this.unload(e),t!==JSON.stringify(this.rules)}replaceSubtree(e,t){this.rules=this.rules.filter(([s])=>!ii(s,e)),this.rules.push([e,t]),this.rules.sort(Xo)}longestPrefix(e){let t;for(const s of this.rules)ii(e,s[0])&&(!t||s[0].length>t[0].length)&&(t=s);return t}}class Wi{paths=[];static all(){return new Wi(["/"])}constructor(e=[]){for(const t of e)this.add(t)}add(e){if(!e.startsWith("/")||e.includes("."))throw new Error(`Population mask paths must be absolute prim paths; got <${e}>`);this.paths.some(t=>ni(e,t))||(this.paths=[...this.paths.filter(t=>!ni(t,e)),e].sort())}getPaths(){return this.paths}isEmpty(){return this.paths.length===0}includes(e){return this.paths.some(t=>ni(e,t)||ni(t,e))}includesSubtree(e){return this.paths.some(t=>ni(e,t))}getIncludedChildNames(e){if(this.includesSubtree(e))return{all:!0,names:[]};const t=e==="/"?"/":`${e}/`,s=new Set;for(const n of this.paths){if(!n.startsWith(t))continue;const r=n.slice(t.length),o=r.indexOf("/");s.add(o<0?r:r.slice(0,o))}return{all:!1,names:[...s].sort()}}equals(e){return this.paths.length===e.paths.length&&this.paths.every((t,s)=>t===e.paths[s])}getUnion(e){const t=new Wi(this.paths);if(typeof e=="string")t.add(e);else for(const s of e.paths)t.add(s);return t}getIntersection(e){const t=new Wi;for(const s of this.paths)for(const n of e.paths)ni(s,n)?t.add(s):ni(n,s)&&t.add(n);return t}includesMask(e){return this.getUnion(e).equals(this)}}function ni(i,e){return i===e||e==="/"||i.startsWith(`${e}/`)}function So(i,e,t){const s=Fp(i.rootNode);if(s===null)return null;const n=H0(i),r=e?K0(i.path,e):"",o=t?JSON.stringify(Z0(i.path,t).getPaths()):"all";return`${s}\0clips=${n}\0load=${r}\0mask=${o}`}let W0=0;const Dh=new WeakMap;function q0(i){let e=Dh.get(i);return e===void 0&&(e=++W0,Dh.set(i,e)),e}function H0(i){const e=Lp(i);return e?e.map(t=>`${t.name}|ls${q0(t.sourceLayerStack)}|${t.sourcePrimPath}|li${t.indexOfLayerWhereAssetPathsFound}|${JSON.stringify(t.def)}|${t.timeOffset.offset}:${t.timeOffset.scale}`).join(";"):""}function K0(i,e){const t=e.getEffectiveRuleForPath(i),s=`${i}/`,n=[["/",t]];for(const[o,a]of e.getRules())o!==i&&o.startsWith(s)&&n.push([`/${o.slice(s.length)}`,a]);const r=new qs;return r.setRules(n),r.minimize(),JSON.stringify(r.getRules())}function Z0(i,e){const t=`${i}/`,s=[];for(const n of e.getPaths())n===i?s.push("/"):n.startsWith(t)&&s.push(`/${n.slice(t.length)}`);return new Wi(s)}function rc(i,e,t,s){return async n=>{if(!n||e.has(n))return null;try{const r=await Oa(n,t,s);return i?.add(r),r}catch{return null}}}const Y0=["typeName"];function tn(i,e,t,s,n){n?.recordComputationEvent("materialization",t);const r=Wt(i,"active"),o=r===void 0?!0:!!r,a={};a.specifier=Yp(i);const c=Wt(i,"typeName");c!==void 0&&(a.typeName=c),r!==void 0&&(a.active=o);const l=Wt(i,"instanceable");l!==void 0&&(a.instanceable=!!l);const u=Wt(i,"kind");u!==void 0&&(a.kind=u);const h=Wt(i,"assetInfo");h!==void 0&&(a.assetInfo=h);const d=Wt(i,"clips");d!==void 0&&(a.clips=d);const f=Wt(i,"clipSets");f!==void 0&&(a.clipSets=f);const p=Wt(i,"propertyOrder");p!==void 0&&(a.propertyOrder=p);const y=Wt(i,"sdrMetadata");y!==void 0&&(a.sdrMetadata=y);const m=Xp(i,"apiSchemas");if(m.length>0&&(a.apiSchemas=m),s!==void 0&&(a.__prototypePath=s),e.set(t,{fields:a}),!o)return!1;for(const g of L0(i)){const S=`${t==="/"?"":t}.${g}`,_={};for(const P of Y0){const w=Gr(i,g,P);w!==void 0&&(_[P]=w)}e.set(S,{fields:_})}return!0}function X0(i,e,t,s){tn(i,e,t,s)}async function Q0(i,e,t,s,n,r){const o=new Set;return await Ec(i,async c=>{const l=await s(c);return l&&o.add(l),l}),tn(i,e,t,r,n),o}const wt=(i,e)=>i==="/"?`/${e}`:`${i}/${e}`;async function J0(i,e=new Wn,t=n=>So(n),s){return yo(Bp(i),"usd-ts:discoverStageNamespace",n=>(n&&Me(n,"rootPath","/"),eP(i,e,t,s,n)))}async function eP(i,e,t,s,n){const r=new Map,o=new Map;e.unregisterInstancePrimIndexesUnder("/");const a=async u=>{i.recordComputationEvent("namespaceDiscovery",u);const h=await jS(i,u,n);let d=h.computePrimChildNames();if(s){const f=s.getIncludedChildNames(u);f.all||(d=d.filter(p=>f.names.includes(p)))}if(r.set(u,d),u!=="/"){const f=t(h);if(f!==null&&(o.set(u,f),!e.registerInstancePrimIndex(u,f)&&!u.startsWith("/Flattened_Prototype_")))return}for(const f of d)await a(wt(u,f))};await a("/");const c={newPrototypePrims:[],newPrototypePrimIndexes:[],changedPrototypePrims:[],changedPrototypePrimIndexes:[],deadPrototypePrims:[]},l=async()=>{const u=B0(e,n,()=>e.processChanges());if(c.newPrototypePrims.push(...u.newPrototypePrims),c.newPrototypePrimIndexes.push(...u.newPrototypePrimIndexes),c.changedPrototypePrims.push(...u.changedPrototypePrims),c.changedPrototypePrimIndexes.push(...u.changedPrototypePrimIndexes),c.deadPrototypePrims.push(...u.deadPrototypePrims),u.changedPrototypePrimIndexes.length!==0){for(const h of u.changedPrototypePrimIndexes)await a(h);await l()}};return await l(),{cache:i,childrenByPrim:r,instanceKeys:o,instancing:e.getInstancingInfo(),instanceChanges:c}}async function tP(i,e,t=n=>So(n),s){const n=new Map,r=new Map,o=async a=>{i.recordComputationEvent("namespaceDiscovery",a);const c=await i.computePrimIndex(a);let l=c.computePrimChildNames();if(!c.hasSpecs()&&l.length===0)return;if(s&&!s.includesSubtree(a)){const h=s.getIncludedChildNames(a);h.all||(l=l.filter(d=>h.names.includes(d)))}n.set(a,l);const u=t(c);u!==null&&r.set(a,u);for(const h of l)await o(wt(a,h))};for(const a of e)await o(a);return{cache:i,childrenByPrim:n,instanceKeys:r}}async function sP(i,e,t,s,n=new Map){const{cache:r,childrenByPrim:o}=i,a=new Map,c=new Map,l=new Map;for(const d of o.keys()){r.recordComputationEvent("usdDependencyResolution",d);const f=r.findPrimIndex(d),p=new Set,m=await Ec(f,async g=>{const S=await t(g);return S&&p.add(S),S});m&&c.set(d,m),p.size>0&&l.set(d,p)}const u=d=>{const f=r.findPrimIndex(d);if(!f||!o.has(d))return;const p=s.get(d);if(!(!tn(f,a,d,p,r)||p!==void 0))for(const m of o.get(d)??[])u(wt(d,m))};for(const d of e)u(d);const h=(d,f)=>{const p=r.findPrimIndex(d);if(!p||p.composePrimStack().length===0)return;const y=s.get(d);if(y!==void 0&&s.set(f,y),!(!tn(p,a,f,y,r)||y!==void 0))for(const g of o.get(d)??[])h(wt(d,g),wt(f,g))};for(const[d,f]of n){a.set(d,{fields:{}});for(const p of o.get(f)??[])h(wt(f,p),wt(d,p))}return{nodes:a,usdDependenciesByPrim:l,clipSetsByPrim:c}}async function iP(i,e,t=new Wn){const s=Bp(i.cache);return yo(s,"usd-ts:materializeStageNodes",n=>(n&&Me(n,"primIndexCount",i.childrenByPrim.size),nP(i,e,t)))}async function nP(i,e,t){const{cache:s,childrenByPrim:n}=i,r=new Map,{instanceToProto:o,protoToSource:a}=i.instancing??t.getInstancingInfo(),c=new Map,l=new Map;for(const d of n.keys()){if(d==="/")continue;s.recordComputationEvent("usdDependencyResolution",d);const f=s.findPrimIndex(d)??await s.computePrimIndex(d),p=new Set,m=await Ec(f,async g=>{const S=await e(g);return S&&p.add(S),S});m&&c.set(d,m),p.size>0&&l.set(d,p)}r.set("/",{fields:{}});const u=d=>{const f=s.findPrimIndex(d);if(!f)return;const p=o.get(d);if(!(!tn(f,r,d,p,s)||p!==void 0))for(const m of n.get(d)??[])u(wt(d,m))};for(const d of n.get("/")??[])u(`/${d}`);const h=(d,f)=>{const p=s.findPrimIndex(d);if(!p||p.composePrimStack().length===0)return;const y=o.get(d);if(y!==void 0&&o.set(f,y),!(!tn(p,r,f,y,s)||y!==void 0))for(const g of n.get(d)??[])h(wt(d,g),wt(f,g))};for(const[d,f]of a){r.set(d,{fields:{}});for(const p of n.get(f)??[])h(wt(f,p),wt(d,p))}return{nodes:r,instancing:{instanceToProto:o,protoToSource:a},usdDependenciesByPrim:l,clipSetsByPrim:c}}async function rP(i,e,t,s,n,r,o,a,c,l,u,h){const f=rc(new Set,e,t,s),p=o??await US(i,f,n,c,h);return o||zS(p,void 0),Pa(s,h,()=>Op(p,h,async()=>{p.setVariantFallbacks(r);const y=a??new Wn,m=await J0(p,y,l,u),{nodes:g,instancing:S,usdDependenciesByPrim:_,clipSetsByPrim:P}=await iP(m,f,y),w=new Map;for(const[b,I]of _)w.set(b,new Set(I));const v=new Set;v.add(i),n&&v.add(n),p.forEachLayerUsed(b=>v.add(b));for(const b of w.values())for(const I of b)v.add(I);return{nodes:g,instancing:S,dependencies:v,usdDependenciesByPrim:w,clipSetsByPrim:P,cache:p}}))}function oP(){km(ze.GetInstance().GetAllPlugins())}function Qp(i,e){return oP(),ho(i,e)}function gr(i,e,t,s){return Od(i,Qp(e,t),s)}function oc(i){return i==="typeName"||i==="apiSchemas"?"typeInfo":i==="active"||i==="kind"||i==="specifier"||i==="clips"||i==="clipSets"?"recompose":"infoOnly"}function Qo(i,e=[]){const t=new Set,s=i.didMaybeChangeLayers&&i.didChangeLayerStackFields.size===1&&i.didChangeLayerStackFields.has("subLayers");if(i.didMaybeChangeLayers&&!s&&t.add("/"),s)for(const p of i.didChangeLayerStackNamespace)t.add(p);for(const p of i.didChangeSignificantly)t.add(p);for(const p of i.didChangePrims)t.add(p);const n=new Set,r=new Set,o=new Set;for(const p of e){if((p.kind==="specAdded"||p.kind==="specRemoved")&&p.path.includes(".")){o.add(p.path);continue}if(p.path.includes(".")||p.kind!=="field"||p.fieldName===void 0)continue;const y=oc(p.fieldName);y==="typeInfo"?r.add(p.path):y==="recompose"&&n.add(p.path)}for(const p of n)t.add(p);for(const p of r)t.add(p);for(const p of o)t.add(p);const a=Ch(t),c=new Set;for(const p of i.didChangeSignificantly)c.add(p);for(const p of i.didChangeSpecs)c.add(kh(p));for(const p of i.didChangePrims)c.add(p);for(const p of n)c.add(p);const l=Ch(c),u=p=>i.didMaybeChangeLayers&&!s||l.some(y=>ac(p,y)),h=p=>a.some(y=>ac(p,y)),d=[...new Set([...i.didChangeSpecs,...i.didChangeValues,...i.didChangeTargets,...i.didChangeLayerMetadata,...i.didChangeLayerStackValues,...s?["/"]:[]])].filter(p=>!h(p)).sort(),f=[...new Set([...i.didChangeValues,...i.didChangeTargets,...o,...r].filter(p=>!u(p)).map(kh))].sort();return{populationSubtreeRoots:l,propertyRematerializations:f,stageMetadataChanges:[...i.didChangeLayerMetadata].sort(),layerStackChanges:[...i.didChangeLayerStackFields].sort(),prototypeActions:[],fullPopulationRequired:i.didMaybeChangeLayers,noticeResyncPaths:a,noticeInfoOnlyPaths:d}}function kh(i){const e=i.lastIndexOf("/"),t=i.indexOf(".",e);return t<0?i:i.slice(0,t)}function ac(i,e){return i===e||e==="/"||i.startsWith(`${e}/`)||i.startsWith(`${e}.`)}function Ch(i){const e=[];for(const t of[...i].sort((s,n)=>s.length-n.length||s.localeCompare(n)))e.some(s=>ac(t,s))||e.push(t);return e.sort()}function aP(i,e,t){return i===e?t:i.startsWith(`${e}/`)||i.startsWith(`${e}.`)?t+i.slice(e.length):i}const ps={Local:0,Inherit:1,Variant:2,Relocate:3,Reference:4,Payload:5,Specialize:6},cP={[C.Root]:ps.Local,[C.Inherit]:ps.Inherit,[C.Variant]:ps.Variant,[C.Relocate]:ps.Relocate,[C.Reference]:ps.Reference,[C.Payload]:ps.Payload,[C.Specialize]:ps.Specialize};function Nh(i,e){return i.layer.getField(i.sourcePath,e)}async function Mh(i,e,t,s,n,r={},o,a,c,l,u){return yo(u,"usd-ts:composeScene",async h=>{const{nodes:d,instancing:f,dependencies:p,usdDependenciesByPrim:y,clipSetsByPrim:m,cache:g}=await rP(i,e,t,s,n,r,o,a,S=>c?.isIncluded(S)??!0,S=>So(S,c,l),l,h);return{nodes:d,instancing:f,dependencies:p,usdDependenciesByPrim:y,clipSetsByPrim:m,cache:g}})}let Eh=null;function lP(){const i={};for(const e of ze.GetInstance().GetAllPlugins()){const t=e.GetMetadata().UsdVariantFallbacks;if(t!==void 0&&!(typeof t!="object"||t===null||Array.isArray(t)))for(const[s,n]of Object.entries(t)){if(!Array.isArray(n))continue;const r=n.filter(o=>typeof o=="string");r.length>0&&(i[s]=r)}}return i}const Bh=i=>Object.fromEntries(Object.entries(i).map(([e,t])=>[e,[...t]]));function uP(i){const e=new Set;let t=i;for(;t&&!e.has(t);){if(e.add(t),Ws(t.arcType))return!0;t=t.origin===t?null:t.origin}return!1}class Ms{_population;_instanceCache;_loadRules;get nodes(){return this._population.nodes}_editTarget;_editTargetContext;rootLayerPath;_initialStartTimeCode;_initialEndTimeCode;_initialTimeCodesPerSecond;_initialFramesPerSecond;_interpolationType=Wy;constructor(e,t=null,s="",n,r=new Wn,o=new qs(!0)){this._population=new p_(e),this._instanceCache=r,this._loadRules=o,this._editTarget=t,this._editTargetContext=t?new ds(t):null,this.rootLayerPath=s,this._initialStartTimeCode=n?.start,this._initialEndTimeCode=n?.end,this._initialTimeCodesPerSecond=n?.tps,this._initialFramesPerSecond=n?.fps}_populationMask;getPopulationMask(){return this._populationMask??Wi.all()}async setPopulationMask(e){this._populationMask=e;const t=this._pcpCache;if(t){const n=new hn;n.didChangeSignificantlyAtPath("/"),await n.apply(t)}const s={populationSubtreeRoots:["/"],propertyRematerializations:[],stageMetadataChanges:[],layerStackChanges:[],prototypeActions:[],fullPopulationRequired:!0,noticeResyncPaths:["/"],noticeInfoOnlyPaths:[]};await this._recompose(!1,s)}_numericLayerMetadata(e,t){const s=e?.getField("/",t);return typeof s=="number"?s:void 0}_numericRootMetadata(e){return this._numericLayerMetadata(this._rootLayer??this._editTarget,e)}_numericSessionMetadata(e){return this._numericLayerMetadata(this._sessionLayer,e)}get startTimeCode(){return this._rootLayer??this._editTarget?this._numericSessionMetadata("startTimeCode")??this._numericRootMetadata("startTimeCode"):this._initialStartTimeCode}get endTimeCode(){return this._rootLayer??this._editTarget?this._numericSessionMetadata("endTimeCode")??this._numericRootMetadata("endTimeCode"):this._initialEndTimeCode}get timeCodesPerSecond(){return this._rootLayer??this._editTarget?this._numericSessionMetadata("timeCodesPerSecond")??this._numericRootMetadata("timeCodesPerSecond")??this._numericSessionMetadata("framesPerSecond")??this._numericRootMetadata("framesPerSecond")??24:this._initialTimeCodesPerSecond??this._initialFramesPerSecond??24}getFramesPerSecond(){return this._rootLayer??this._editTarget?this._numericSessionMetadata("framesPerSecond")??this._numericRootMetadata("framesPerSecond")??24:this._initialFramesPerSecond??24}setInterpolationType(e){if(this._interpolationType===e)return;this._interpolationType=e;const t=this._withNamespaceEditMethods({resyncedPaths:["/"],changedInfoOnlyPaths:[]});for(const s of this._changeListeners)s(t)}getInterpolationType(){return this._interpolationType}hasAuthoredTimeRange(){const e=t=>this._numericLayerMetadata(t,"startTimeCode")!==void 0&&this._numericLayerMetadata(t,"endTimeCode")!==void 0;return e(this._sessionLayer)||e(this._rootLayer??this._editTarget)}static getGlobalVariantFallbacks(){return Bh(Eh??=lP())}static setGlobalVariantFallbacks(e){Eh=Bh(e)}_variantFallbacks=Ms.getGlobalVariantFallbacks();static async open(e,t){return bh(e,s=>Ms._open(e,t,s))}static async openMasked(e,t,s){const n=typeof e=="string"?e:e.filePath;return bh(n,r=>Ms._open(e,s,r,t))}static async _open(e,t,s,n){const r=Ei(),o=t?.resolverContext,a=o??new bt,c=typeof e=="string"?await Pa(a,s,()=>Oa(e,r,a)):e,l=o||typeof e!="string"?void 0:await r.resolve(e,a),u=o??r.createDefaultContextForAsset(l?.toString()||c.filePath),h=t?.sessionLayerPath?await Pa(u,s,()=>Oa(t.sessionLayerPath,r,u)):te.createAnonymous("anon:session"),d=Ms.getGlobalVariantFallbacks(),f=new Set,p=new Wn,y=new qs(t?.loadPayloads!==!1),{nodes:m,instancing:g,dependencies:S,usdDependenciesByPrim:_,clipSetsByPrim:P,cache:w}=await Mh(c,f,r,u,h,d,void 0,p,y,n,s),v=I=>{const T=c.getField("/",I);return typeof T=="number"?T:void 0},b=new Ms(m,c,c.filePath,{start:v("startTimeCode"),end:v("endTimeCode"),tps:v("timeCodesPerSecond"),fps:v("framesPerSecond")},p,y);return n&&(b._populationMask=n),b._rootLayer=c,b._sessionLayer=h,b._variantFallbacks=d,b._instancing=g,b._resolver=r,b._resolverContext=u,b._usedLayers=S,b._usdDependenciesByPrim=_,b._clipSetsByPrim=P,b._pcpCache=w,b._muted=f,b._refreshFallbackPrimTypes(b.nodes),b._subscribeRegistryLayers(),b._subscribeResolverChanges(),b}_rootLayer=null;_muted=new Set;_resolver;_resolverContext;get _arResolver(){return this._resolver}get _arResolverContext(){return this._resolverContext}_usedLayers=new Set;_mutedLayerPropertyPaths=new Map;_usdDependenciesByPrim=new Map;_clipSetsByPrim=new Map;_pcpCache=null;_canonicalLayerId(e){return this._rootLayer?.resolveAsset(e)||e}getMutedLayers(){return[...this._muted]}isLayerMuted(e){return this._muted.has(this._canonicalLayerId(e))}async muteLayer(e){await this.muteAndUnmuteLayers([e],[])}async unmuteLayer(e){await this.muteAndUnmuteLayers([],[e])}async load(e="/",t="withDescendants"){if(!this._isValidLoadPath(e))throw new Error(`Cannot load unknown prim <${e}>`);await this.loadAndUnload([e],[],t)}async unload(e="/"){await this.loadAndUnload([],[e])}async loadAndUnload(e,t,s="withDescendants"){const n=[...new Set(e)],r=[...new Set(t)];for(const h of n)if(!this._isValidLoadPath(h))throw new Error(`Cannot load unknown prim <${h}>`);if(r.length===0&&n.every(h=>s==="withDescendants"?this._loadRules.isLoadedWithAllDescendants(h):this._loadRules.isLoadedWithNoDescendants(h))||n.length===0&&r.every(h=>this._loadRules.getEffectiveRuleForPath(h)===qs.NoneRule))return;const o=new Set(n),a=new Set(r),c=this._loadRules.clone();if(this._loadRules.loadAndUnload(o,a,s),this._loadRules.equals(c))return;for(const h of[...o]){let d=h;for(;;){const f=d.lastIndexOf("/");if(f<0)break;const p=f===0?"/":d.slice(0,f);if(this.getPrim(p)&&this._isPrimLoaded(p)){h!==d&&o.add(d);break}if(p==="/")break;d=p}}const l=[],u=[...o,...a].map(h=>this._instanceCache.getMostAncestralInstancePath(h)??h);for(const h of u.sort((d,f)=>d.length-f.length||d.localeCompare(f)))l.some(d=>h===d||d==="/"||h.startsWith(`${d}/`))||l.push(h);await this._applyPayloadLoadRules(l)}getLoadSet(){return[...this._pcpCache?.getIncludedPayloadPaths()??[]].filter(e=>this.nodes.has(e))}findLoadable(e="/"){return[...this._pcpCache?.findPayloadPaths(e)??[]]}_isPrimLoaded(e){const t=this._pcpCache;if(!t)return!0;let s=e;const n=new Set(t.findPayloadPaths("/")),r=new Set(t.getIncludedPayloadPaths());for(;;){if(this.nodes.get(s)?.fields.active===!1)return!1;if(n.has(s))return r.has(s);if(s==="/")return!0;const o=s.lastIndexOf("/");s=o<=0?"/":s.slice(0,o)}}_hasClassSpecifier(e){let t=e;for(const[o,a]of this._instancing.protoToSource)if(e===o||e.startsWith(`${o}/`)){t=a+e.slice(o.length);break}const s=this._pcpCache?.findPrimIndex(t);if(!s)return this.nodes.get(e)?.fields.specifier==="class";const n=[...s.getNodeRange()];let r=!1;for(const o of s.composePrimStack()){const a=o.layer.getField(F(o.path),"specifier");if(a==="def"||a===0)return!1;if(a!=="class"&&a!==2)continue;let c=n[o.nodeIndex]??null,l=!1;for(;c;){if(c.arcType===C.Inherit&&!c.isDueToAncestor){l=!0;break}c=c.parent}if(!l)return!0;r=!0}return r}getLoadRules(){return this._loadRules.clone()}async setLoadRules(e){if(this._loadRules.equals(e))return;this._loadRules.setRules(e.getRules());const t=this._pcpCache;if(!t)return;const s=new hn;s.didChangeSignificantlyAtPath("/"),await s.apply(t);const n={populationSubtreeRoots:["/"],propertyRematerializations:[],stageMetadataChanges:[],layerStackChanges:[],prototypeActions:[],fullPopulationRequired:!0,noticeResyncPaths:["/"],noticeInfoOnlyPaths:[]};await this._recompose(!1,n)}async _applyPayloadLoadRules(e){const t=this._pcpCache;if(!t||e.length===0)return;const s=new hn,n=t.getIncludedPayloadPaths().filter(o=>e.some(a=>o===a||a==="/"||o.startsWith(`${a}/`)));t.requestPayloads([],n,s);for(const o of e)s.didChangeSignificantlyAtPath(o);await s.apply(t);const r={populationSubtreeRoots:[...e],propertyRematerializations:[],stageMetadataChanges:[],layerStackChanges:[],prototypeActions:[],fullPopulationRequired:!1,noticeResyncPaths:[...e],noticeInfoOnlyPaths:[]};await this._recomposeSubtrees(r)||await this._recompose(!1,r)}_isValidLoadPath(e){if(e==="/"||this.getPrim(e))return!0;let t=e;for(;t.includes("/");){if(t=t.slice(0,t.lastIndexOf("/"))||"/",t==="/")return!1;if(this.getPrim(t))return!0}return!1}async muteAndUnmuteLayers(e,t){const s=e.map(c=>this._canonicalLayerId(c)),n=t.map(c=>this._canonicalLayerId(c));if(this._rootLayer&&s.includes(this.rootLayerPath))throw new Error(`Cannot mute the stage's root layer: ${this.rootLayerPath}`);const r=new Set;for(const c of this._usedLayers){const l=this._canonicalLayerId(c.filePath);s.includes(l)&&(r.add(c),this._mutedLayerPropertyPaths.set(l,this._propertyPathsAffectedByLayers(new Set([c]))))}const o=this._propertyPathsAffectedByLayers(r);for(const c of n){const l=this._mutedLayerPropertyPaths.get(c);if(l)for(const u of l)o.add(u)}let a=!1;for(const c of n)this._muted.delete(c)&&(a=!0);for(const c of s)this._muted.has(c)||(this._muted.add(c),a=!0);if(a){for(const c of o)this._pendingChanges.add(c);await this._recompose();for(const c of n)this._muted.has(c)||this._mutedLayerPropertyPaths.delete(c)}}_propertyPathsAffectedByLayers(e){const t=new Set,s=this._pcpCache;if(!s)return t;const n=new Set(s.getLayerStack().layers.map(r=>r.layer));for(const r of e)for(const o of r.getSpecPaths()){const a=o.indexOf("["),c=a<0?o:o.slice(0,a);if(!c.includes("."))continue;const l=pi(c),u=c.slice(l.length);for(const h of s.findSiteDependencies(r,l))t.add(h.indexPath==="/"&&u.startsWith("/")?u:`${h.indexPath}${u}`);n.has(r)&&t.add(c)}return t}async _recompose(e=!0,t){return vh("usd-ts:Stage.recompose",s=>this._recomposeImpl(e,t,s))}async _recomposeInTraceContext(e,t,s){return yo(s,"usd-ts:Stage.recompose",n=>this._recomposeImpl(e,t,n))}async _recomposeImpl(e,t,s){const n=this._rootLayer??this._editTarget;if(!n)return;const r=new Map(this.nodes);e&&this._pcpCache&&await this._pcpCache.invalidateAll();const{nodes:o,instancing:a,dependencies:c,usdDependenciesByPrim:l,clipSetsByPrim:u,cache:h}=await Mh(n,this._muted,this._resolver,this._resolverContext,this._sessionLayer??void 0,this._variantFallbacks,this._pcpCache??void 0,this._instanceCache,this._loadRules,this._populationMask,s);this._population.replaceAll(o),this._instancing=a,this._usedLayers=c,this._usdDependenciesByPrim=l,this._clipSetsByPrim=u,this._pcpCache=h,this._subscribeRegistryLayers();const d=this._refreshFallbackPrimTypes(this.nodes),f=this._pendingResyncs,p=this._pendingChanges;if(this._pendingResyncs=new Set,this._pendingChanges=new Set,t){this._emitChangePlanNotice(this._mergeAuthoredNoticePaths(t,[...f],[...p]));return}if(this._changeListeners.size>0){const y=x0(r,this.nodes),m=new Set([...y.resyncedPaths,...f]);d&&m.add("/");const g=(P,w)=>w===P||w.startsWith(P==="/"?"/":`${P}/`),S=[];for(const P of[...m].sort())S.some(w=>g(w,P))||S.push(P);const _=[...new Set([...y.changedInfoOnlyPaths,...p])].filter(P=>!S.some(w=>g(w,pi(P))));if(S.length>0||_.length>0){const P=this._withNamespaceEditMethods({resyncedPaths:S,changedInfoOnlyPaths:_});for(const w of this._changeListeners)w(P)}}}async _recomposeSubtrees(e){const t=this._rootLayer??this._editTarget,s=this._pcpCache;if(!t||!s||e.populationSubtreeRoots.includes("/"))return!1;const n=[...new Set(e.populationSubtreeRoots.map(_=>this._instanceCache.getMostAncestralInstancePath(_)??_))];for(const _ of n)this._instanceCache.unregisterInstancePrimIndexesUnder(_);const r=await tP(s,n,_=>So(_,this._loadRules,this._populationMask),this._populationMask),o=new Set;for(const[_,P]of r.instanceKeys)this._instanceCache.registerInstancePrimIndex(_,P)&&o.add(_);const a=this._instanceCache.processChanges(),c=this._instanceCache.getInstancingInfo(),l=new Map;for(let _=0;_<a.newPrototypePrims.length;_++)l.set(a.newPrototypePrims[_],a.newPrototypePrimIndexes[_]);for(let _=0;_<a.changedPrototypePrims.length;_++){const P=a.changedPrototypePrimIndexes[_];r.childrenByPrim.has(P)&&l.set(a.changedPrototypePrims[_],P)}for(const _ of o){const P=this._instanceCache.getPrototypeForInstanceablePrimIndexPath(_);P!==void 0&&l.set(P,_)}const u=rc(void 0,this._muted,this._resolver,this._resolverContext),{nodes:h,usdDependenciesByPrim:d,clipSetsByPrim:f}=await sP(r,n,u,c.instanceToProto,l),p=[...a.newPrototypePrims,...l.keys(),...a.deadPrototypePrims],y=[...new Set([...n,...p])],m=_=>y.some(P=>_===P||P==="/"||_.startsWith(`${P}/`));this._population.replaceSubtrees(h,y);for(const _ of[...this._usdDependenciesByPrim.keys()])m(_)&&this._usdDependenciesByPrim.delete(_);for(const[_,P]of d)this._usdDependenciesByPrim.set(_,new Set(P));for(const _ of[...this._clipSetsByPrim.keys()])m(_)&&this._clipSetsByPrim.delete(_);for(const[_,P]of f)this._clipSetsByPrim.set(_,P);this._instancing=c,this._rebuildUsedLayersFromRetainedDependencies(),this._refreshFallbackPrimTypes(this.nodes);const g=[...this._pendingResyncs],S=[...this._pendingChanges];return this._pendingResyncs=new Set,this._pendingChanges=new Set,this._emitChangePlanNotice(this._mergeAuthoredNoticePaths(e,g,S),[...a.newPrototypePrims,...a.deadPrototypePrims]),!0}_emitChangePlanNotice(e,t=[]){const s=this._resolvedAssetPathsResyncPending;if(this._resolvedAssetPathsResyncPending=!1,this._changeListeners.size===0)return;const n=c=>{const l=[];for(const u of c){const h=u.indexOf(".",u.lastIndexOf("/")),d=h<0?u:u.slice(0,h);if(!this._instanceCache.isPathDescendantToAnInstance(d)){l.push(u);continue}for(const f of this._instanceCache.getPrimsInPrototypesUsingPrimIndexPath(d))l.push(f+u.slice(d.length))}return l},r=[];for(const c of[...new Set([...n(e.noticeResyncPaths),...t])].sort((l,u)=>l.length-u.length||l.localeCompare(u)))r.some(l=>c===l||l==="/"||c.startsWith(`${l}/`)||c.startsWith(`${l}.`))||r.push(c);r.sort();const o=[...new Set(n(e.noticeInfoOnlyPaths))].filter(c=>!r.some(l=>c===l||l==="/"||c.startsWith(`${l}/`)||c.startsWith(`${l}.`))).sort();if(r.length===0&&o.length===0&&!s)return;const a=this._withNamespaceEditMethods({resyncedPaths:r,changedInfoOnlyPaths:[...o],...s?{resolvedAssetPathsResyncedPaths:r.includes("/")?[]:["/"]}:{}});for(const c of this._changeListeners)c(a)}_mergeAuthoredNoticePaths(e,t,s){const n=e.noticeResyncPaths.filter(r=>!t.some(o=>o!==r&&(o.startsWith(`${r}/`)||o.startsWith(`${r}.`))));return{...e,noticeResyncPaths:[...n,...t],noticeInfoOnlyPaths:[...e.noticeInfoOnlyPaths,...s]}}_populatedPathsForPrimIndexPath(e){return this._instanceCache.isPathDescendantToAnInstance(e)?this._instanceCache.getPrimsInPrototypesUsingPrimIndexPath(e):[e]}_fallbackPrimTypesJson="null";_refreshFallbackPrimTypes(e){const s=(this._rootLayer??this._editTarget)?.getField("/","fallbackPrimTypes"),n=JSON.stringify(s??null),r=n!==this._fallbackPrimTypesJson;this._fallbackPrimTypesJson=n;const o={};if(s!==null&&typeof s=="object"&&!Array.isArray(s)){for(const[c,l]of Object.entries(s))if(M.getConcreteTypeFromSchemaTypeName(c).IsUnknown()&&Array.isArray(l)){for(const u of l)if(typeof u=="string"&&!M.getConcreteTypeFromSchemaTypeName(u).IsUnknown()){o[c]=u;break}}}const a=e.get("/");return a&&(Object.keys(o).length>0?a.fields.__fallbackPrimTypes=o:delete a.fields.__fallbackPrimTypes),r}_changeListeners=new Set;_pendingChanges=new Set;_pendingResyncs=new Set;_pendingNamespaceEdit;_expectNamespaceEdit(e,t){this._pendingNamespaceEdit={oldPath:e,newPath:t}}_withNamespaceEditMethods(e){const t=this._pendingNamespaceEdit;return this._pendingNamespaceEdit=void 0,Hp(e,t)}onObjectsChanged(e){return this._changeListeners.add(e),()=>{this._changeListeners.delete(e)}}getVariantSets(e){return new T0(this,e)}get _composedNodes(){return this.nodes}_sortedSpecsFor(e){if(this._pcpCache){const t=this._pcpCache.findPrimIndex(e);if(t)return t.composePrimStack().map(n=>({layer:n.layer,sourcePath:F(n.path),arc:[cP[n.arcType]??ps.Local],offset:{offset:n.offset.offset,scale:n.offset.scale}}));const s=[];for(const n of this.getLayerStack(!0))n.getFieldNames(e).length>0&&s.push({layer:n,sourcePath:e,arc:[ps.Local],offset:{offset:0,scale:1}});return s}return[]}_variantSetNames(e){const t=[];for(const s of this._sortedSpecsFor(e)){const n=Nh(s,"variantSetChildren");if(Array.isArray(n))for(const r of n)t.includes(r)||t.push(r)}return t}_variantNames(e,t){const s=[];for(const n of this._sortedSpecsFor(e)){const r=`${n.sourcePath==="/"?"":n.sourcePath}{${t}=}`,o=n.layer.getField(r,"variantChildren");if(Array.isArray(o))for(const a of o)s.includes(a)||s.push(a)}return s}_variantSelection(e,t){const s=this._pcpCache?.findPrimIndex(e);if(s){for(const n of s.getNodeRange())if(n.arcType===C.Variant){const[r,o]=n.path.getVariantSelection();if(r===t)return o}return""}for(const n of this._sortedSpecsFor(e)){const o=Nh(n,"variantSelection")?.[t];if(o!==void 0)return Array.isArray(o)?o[0]??"":o}return""}_batchDepth=0;_batchDirty=!1;async changeBlock(e){this._batchDepth+=1;try{return await e()}finally{this._batchDepth-=1,this._batchDepth===0&&this._batchDirty&&(this._batchDirty=!1,await this._recompose())}}async _recomposeForEdit(e){if(e&&this._pendingResyncs.add(e),this._batchDepth>0){this._batchDirty=!0;return}await this._recompose()}_layerSubscriptions=new Map;_suppressLayerNotices=0;_changesPending=!1;_changeFlush=null;_pendingLayerChanges=new Map;_resolverChangePending=!1;_resolvedAssetPathsResyncPending=!1;_subscribeResolverChanges(){const e=new WeakRef(this);Sd(t=>{const s=e.deref();!s||!t.affectsContext(s._resolverContext)||(s._resolverChangePending=!0,s._resolvedAssetPathsResyncPending=!0,s._scheduleRecompose())})}_subscribeRegistryLayers(){const e=new Set;this._rootLayer?e.add(this._rootLayer):this._editTarget&&e.add(this._editTarget),this._sessionLayer&&e.add(this._sessionLayer);for(const t of this._usedLayers)e.add(t);for(const[t,s]of this._layerSubscriptions)e.has(t)||(s(),this._layerSubscriptions.delete(t));for(const t of e)this._layerSubscriptions.has(t)||this._layerSubscriptions.set(t,t._registerDidChangeListener(s=>{this._onLayerDidChange(t,s)}))}_onLayerDidChange(e,t){if((t.fieldName==="clips"||t.fieldName==="clipSets")&&a0(e),this._suppressLayerNotices>0)return;const s=this._pendingLayerChanges.get(e);s?s.push(t):this._pendingLayerChanges.set(e,[t]),this._scheduleRecompose()}_scheduleRecompose(){if(this._changesPending=!0,this._changeFlush)return;const e=Promise.resolve().then(()=>vh("usd-ts:Stage.processChanges",t=>{const s=()=>this._drainLayerChanges(t);if(!t)return s();const n=()=>O0(this._instanceCache,t,s);return this._pcpCache?Op(this._pcpCache,t,n):n()}));this._changeFlush=e,e.then(()=>this._finishChangeFlush(e),()=>this._finishChangeFlush(e))}_finishChangeFlush(e){this._changeFlush===e&&(this._changeFlush=null,this._changesPending&&this._scheduleRecompose())}async _drainLayerChanges(e){for(;this._changesPending;){this._changesPending=!1;const t=this._pendingLayerChanges;this._pendingLayerChanges=new Map,this._resolverChangePending&&(this._resolverChangePending=!1,await this._processResolverChange(e)),t.size>0&&await this._processLayerChanges(t,e)}}async _processResolverChange(e){const t=this._pcpCache;if(!t)return;const s=new hn;s.didChangeAssetResolver(t),await s.apply(t);const n=Qo(s.getCacheChanges());if(n.populationSubtreeRoots.length>0){if(await this._recomposeSubtrees(n))return;await this._recomposeInTraceContext(!1,n,e);return}this._emitChangePlanNotice(n)}async _processLayerChanges(e,t){const s=this._pcpCache;if(!s&&e.size>0){const h=new Gp,d=[];for(const[p,y]of e)for(const m of y)m.fieldName==="primChildren"||m.fieldName==="properties"||(d.push({path:m.path,kind:m.kind,...m.fieldName===void 0?{}:{fieldName:m.fieldName},layer:p,specPath:m.path}),(m.kind==="field"||m.kind==="timeSample")&&(m.fieldName==="connectionPaths"||m.fieldName==="targetPaths"?h.didChangeTargets.add(m.path):h.didChangeValues.add(m.path)));const f=Qo(h,d);await this._recomposeInTraceContext(!0,f,t);return}if(!s||e.size===0){await this._recomposeInTraceContext(!0,void 0,t);return}const n=new hn,r=this._mapUsdLayerChanges(s,e);for(const[h,d]of e)n.didChange(s,d.map(f=>t0(h,f)));for(const h of r)h.kind==="field"&&h.fieldName==="active"&&n.didChangeSignificantlyAtPath(h.path);if(n.isEmpty()&&r.length===0){await this._recomposeInTraceContext(!0,void 0,t);return}const o=n.getCacheChanges();await n.apply(s);const a=Qo(o,r);if(a.fullPopulationRequired||a.prototypeActions.length>0){await this._recomposeInTraceContext(!1,a,t);return}if(a.populationSubtreeRoots.length>0){if(await this._recomposeSubtrees(a))return;await this._recomposeInTraceContext(!1,void 0,t);return}const c=a.propertyRematerializations.filter(h=>a.noticeResyncPaths.some(d=>d.includes(".")&&pi(d)===h)||a.noticeInfoOnlyPaths.includes(h));if(c.length>0){const h=rc(void 0,this._muted,this._resolver,this._resolverContext),d=new Map,f=[];for(const p of c){const y=s.findPrimIndex(p);if(y)for(const m of this._populatedPathsForPrimIndexPath(p))f.push(m),await Q0(y,d,m,h,s,this._instancing.instanceToProto.get(p))}this._population.replacePrims(d,f)}const l=[...this._pendingResyncs],u=[...this._pendingChanges];this._pendingResyncs=new Set,this._pendingChanges=new Set,this._emitChangePlanNotice(this._mergeAuthoredNoticePaths(a,l,u))}_mapUsdLayerChanges(e,t){const s=[];for(const[n,r]of t){const o=new Set,a=new Set(r.filter(l=>l.kind==="specAdded"&&l.inert).map(l=>l.path)),c=e.getLayerStack().layers.some(l=>l.layer===n);for(const l of r){if(l.fieldName==="specifier"&&l.oldValue===void 0&&l.newValue==="over"&&a.has(l.path))continue;const u=pi(l.path),h=new Set;for(const d of e.findSiteDependencies(n,u)){const f=l.path.slice(u.length);h.add(d.indexPath==="/"&&f.startsWith("/")?f:`${d.indexPath}${f}`)}c&&h.add(l.path);for(const d of h){const f=`${l.kind}\0${d}\0${l.fieldName??""}`;o.has(f)||(o.add(f),s.push({path:d,kind:l.kind,...l.fieldName===void 0?{}:{fieldName:l.fieldName},layer:n,specPath:l.path}))}}}return s}_rebuildUsedLayersFromRetainedDependencies(){const e=new Set;this._rootLayer?e.add(this._rootLayer):this._editTarget&&e.add(this._editTarget),this._sessionLayer&&e.add(this._sessionLayer),this._pcpCache?.forEachLayerUsed(t=>e.add(t));for(const t of this._usdDependenciesByPrim.values())for(const s of t)e.add(s);this._usedLayers=e,this._subscribeRegistryLayers()}async flushChanges(){for(;this._changesPending||this._changeFlush;)this._changeFlush||this._scheduleRecompose(),await this._changeFlush}async _interim_flushChanges(){await this.flushChanges()}_ownAuthoring(e){if(this._pcpCache)return e();this._suppressLayerNotices+=1;try{return e()}finally{this._suppressLayerNotices-=1}}async _ownAuthoringAsync(e){this._suppressLayerNotices+=1;try{return await e()}finally{this._suppressLayerNotices-=1}}getSubLayerPaths(){const e=this._rootLayer?.getField("/","subLayers");return Array.isArray(e)?[...e]:[]}getSubLayerOffsets(){const e=this._rootLayer?.getField("/","subLayerOffsets");return Array.isArray(e)?[...e]:[]}_instancing=N0;getPrimStack(e){const t=new Set(["specifier","primChildren","properties","form","fields"]),s=(n,r)=>Object.fromEntries(n.getFieldNames(r).filter(o=>!t.has(o)).map(o=>[o,n.getField(r,o)]));if(this._pcpCache){const n=this._getPrimQuerySource(e)?.index;return n?n.composePrimStack().map(r=>({layerIdentifier:r.layer.filePath,specPath:r.path.pathString,arc:fr[r.arcType]??"local",offset:{offset:r.offset.offset,scale:r.offset.scale},metadata:s(r.layer,r.path.pathString)})):[]}return this._sortedSpecsFor(e).map(n=>({layerIdentifier:n.layer.filePath,specPath:n.sourcePath,arc:fr[n.arc[0]??0]??"local",offset:{offset:n.offset.offset,scale:n.offset.scale},metadata:s(n.layer,n.sourcePath)}))}getPropertyStack(e,t="default"){return this.getPropertyStackWithLayerOffsets(e,t).map(({offset:s,...n})=>n)}getPropertyStackWithLayerOffsets(e,t="default"){return Yo("usd-ts:Stage.getPropertyStack",s=>{s&&(Me(s,"propertyPath",e),Me(s,"time",t));const n=this._getPropertyStackWithLayerOffsets(e,t);return s&&Me(s,"specCount",n.length),n})}_getPropertyStackWithLayerOffsets(e,t){const s=e.indexOf(".");if(s<=0)return[];const n=e.slice(0,s),r=e.slice(s+1);if(this._pcpCache){const o=this._getPrimQuerySource(n);if(!o)return[];const{index:a,sourcePrimPath:c}=o,l=a.composePropertyStack(r),u=new Map;for(const f of l)u.set(`${f.nodeIndex}:${f.layerIndex}`,f);const h=new Map;if(typeof t=="number")for(const f of this._clipSetsByPrim.get(c)??[]){const p=g0(r,f,t);if(p.length===0)continue;const y=`${f.position[0]}:${f.position[1]}`;h.set(y,[...h.get(y)??[],...p])}const d=[];for(const{nodeIndex:f,layerIndex:p,node:y,layerToStageOffset:m}of sc(a,r)){const g=u.get(`${f}:${p}`);g&&d.push({layerIdentifier:g.layer.filePath,specPath:g.path.pathString,arc:fr[g.arcType]??"local",offset:{offset:g.offset.offset,scale:g.offset.scale},value:g.layer.getField(g.path.pathString,"default"),timeSamples:Zo(g.layer.getField(g.path.pathString,"timeSamples"))});for(const S of h.get(`${f}:${p}`)??[]){const _=S.layer;d.push({layerIdentifier:S.layer.filePath,specPath:S.specPath,arc:fr[y.arcType]??"local",offset:{offset:m.offset,scale:m.scale},value:_.getField(S.specPath,"default"),timeSamples:Zo(_.getField(S.specPath,"timeSamples"))})}}return d}return[]}getPrimIndex(e){return this._pcpCache?.findPrimIndex(e)}_getPrimQuerySource(e){const t=this._instanceCache.getPathInPrototypeForInstancePath(e);t!==void 0&&(e=t);for(const[n,r]of this._instancing.protoToSource)if(e===n||e.startsWith(`${n}/`)){const o=r+e.slice(n.length),a=this._pcpCache?.findPrimIndex(o);return a?{index:a,sourcePrimPath:o,sourceRootPath:r,dataRootPath:n}:void 0}const s=this._pcpCache?.findPrimIndex(e);return s?{index:s,sourcePrimPath:e,sourceRootPath:e,dataRootPath:e}:void 0}_resolveAttribute(e,t,s,n){return Yo("usd-ts:Stage.resolveAttributeValue",r=>{const o=`${e==="/"?"":e}.${t}`;r&&(Me(r,"propertyPath",o),Me(r,"time",s??"resolveInfo"));const a=this._resolveAttributeImpl(e,t,s,n);return r&&(Me(r,"source",a.source),Me(r,"valueIsBlocked",a.valueIsBlocked)),a})}_resolveAttributeImpl(e,t,s,n){const r=`${e==="/"?"":e}.${t}`;Qy(this,{kind:"valueResolution",path:r});const o=this.nodes.get(r),a=o?.fields.typeName,c=(g,S=a)=>({...g,...S!==void 0?{typeName:S}:{},interpolation:this._interpolationType}),l=this._getPrimQuerySource(e);if(!l){const g=o;if(s!=="default"&&g?.timeSamples?.length)return c({source:"timeSamples",timeSamples:g.timeSamples,valueIsBlocked:!1});if(s!=="default"){const _=g?.fields.spline;if(_)return c({source:"spline",spline:_,valueIsBlocked:!1})}if(g&&"default"in g.fields){const _=g.fields.default;if(_ instanceof Pe||_===null){const P=n();return c(P===void 0?{source:"none",valueIsBlocked:!0}:{source:"fallback",value:P,valueIsBlocked:!0})}return c(_ instanceof St?{source:"none",valueIsBlocked:!1}:{source:"default",value:_,valueIsBlocked:!1})}const S=n();return c(S===void 0?{source:"none",valueIsBlocked:!1}:{source:"fallback",value:S,valueIsBlocked:!1})}const{index:u,sourcePrimPath:h}=l,d=this._clipSetsByPrim.get(h),f=d?Up(t,d):void 0,p=Gr(u,t,"typeName"),y=$0(u,t,s,f?.map(g=>({position:g.position,resolve:S=>{const _=er(g),P=S===void 0?void 0:Ja(g,S,this._interpolationType,!1,p);if(!(P===void 0&&_.length===0))return{source:"valueClips",value:P,valueIsBlocked:!1,valueEvaluator:(w,v)=>Ja(g,w,this._interpolationType,v,p),node:[...u.getNodeRange()][g.position[0]],timeSamples:_.map(w=>[w,void 0])}}}))??[]);if(y.source!=="none")return this._transformAttributeValue(u,t,y);const m=n();return c(m===void 0?y:{source:"fallback",value:m,valueIsBlocked:y.valueIsBlocked},p)}_transformAttributeValue(e,t,s){const n=Gr(e,t,"typeName"),r=a=>{if(n==="asset"||n==="asset[]"){const c=l=>{if(typeof l!="string"||!Zs(l))return l;let u="";if(s.node){const d=Xn(l,s.node.expressionVars);typeof d.value=="string"&&(u=d.value)}const h=u||l;return new Ps({authoredPath:l,evaluatedPath:u,resolvedPath:s.layer?.resolveAsset(h)??""})};return Array.isArray(a)?a.map(c):c(a)}if((n==="timecode"||n==="timecode[]")&&s.layerToStageOffset){if(typeof a=="number")return lt(s.layerToStageOffset,a);if(Array.isArray(a))return a.map(c=>typeof c=="number"?lt(s.layerToStageOffset,c):c)}return a},o={...s,...typeof n=="string"?{typeName:n}:{},interpolation:this._interpolationType};return s.value!==void 0&&(o.value=r(s.value)),s.valueEvaluator&&(o.valueEvaluator=(a,c)=>r(s.valueEvaluator(a,c))),s.timeSamples&&(o.timeSamples=s.timeSamples.map(([a,c])=>[a,r(c)])),o}_resolvePropertyField(e,t,s){const n=this._getPrimQuerySource(e);if(n){if(s==="custom")return this.getPrim(e)?.getPrimDefinition().getPropertyDefinition(t)?.isValid()?!1:xh(n.index,t,s);if(s==="variability")return xh(n.index,t,s);if(s==="typeName"){const c=n.index.composePropertyStack(t)[0],l=c?F(c.path):void 0;if(c&&l&&(c.layer.getSpecType(l)==="relationship"||c.layer.getField(l,"targetPaths")!==void 0))return"rel"}const r=nc(n.index,t,s);if(!r)return;const o=Gr(n.index,t,"typeName");if(s!=="default"&&s!=="timeSamples"){const c=o==="rel"?"relationship":"attribute";return gr(r.value,s,c,l=>lt(r.layerToStageOffset,l))}const a=c=>{if((o==="timecode"||o==="timecode[]")&&r.layerToStageOffset){if(typeof c=="number")return lt(r.layerToStageOffset,c);if(Array.isArray(c))return c.map(l=>typeof l=="number"?lt(r.layerToStageOffset,l):l)}return c};return s==="default"?a(r.value):Object.fromEntries((Zo(r.value)??[]).map(([c,l])=>[lt(r.layerToStageOffset,c),a(l)]))}return this.nodes.get(`${e}.${t}`)?.fields[s]}_isPropertyCustom(e,t){if(this.getPrim(e)?.getPrimDefinition().getPropertyDefinition(t)?.isValid())return!1;const n=this._getPrimQuerySource(e);return n?V0(n.index,t):this.nodes.get(`${e}.${t}`)?.fields.custom===!0}_resolvePropertyFieldTypeName(e,t,s){const n=this._getPrimQuerySource(e);if(!n)return;const r=nc(n.index,t,s);return r?.layer._getFieldValueTypeName(r.specPath,s)}_resolvePrimMetadata(e,t){const s=this._getPrimQuerySource(e);if(!s)return this.nodes.get(e)?.fields[t];if(t==="specifier")return Yp(s.index);const n=ic(s.index,t);if(n)return gr(n.value,t,"prim",r=>lt(n.layerToStageOffset,r))}_resolvePrimFieldTypeName(e,t){const s=this._getPrimQuerySource(e);if(!s)return;const n=ic(s.index,t);return n?.layer._getFieldValueTypeName(n.specPath,t)}_resolvePropertyPaths(e,t,s,n=e){const r=this._getPrimQuerySource(e);if(r){const a=e.slice(r.dataRootPath.length),c=a&&n.endsWith(a)?n.slice(0,-a.length):n,l=h=>h===r.sourceRootPath||h.startsWith(`${r.sourceRootPath}/`)||h.startsWith(`${r.sourceRootPath}.`)?c+h.slice(r.sourceRootPath.length):h,u=U0(r.index,t,s,this._pcpCache??void 0,l);if(u!==void 0)return u}const o=this.nodes.get(`${e}.${t}`)?.fields[s];return typeof o=="string"?[o]:Array.isArray(o)?o.filter(a=>typeof a=="string"):void 0}_flattenProperty(e,t,s){const n=e._getPrimPath(),r=e._getName();if(!r)throw new Error("Cannot flatten invalid property");let o,a,c=r;if(t instanceof Fs?(o=t.getStage(),a=t.path,s!==void 0&&(c=s)):t instanceof ji&&(o=t.getStage(),a=t.primPath,c=t.name),!o||!a||!o.getPrim(a))throw new Error(`Cannot flatten property <${n}.${r}> to invalid destination`);const l=e.isRelationship,u=`${a}.${c}`,h=o.get(u);if(h&&h.typeName&&h.isRelationship!==l)throw new Error(`Cannot flatten <${n}.${r}> to <${u}>: properties have different types`);const d=e.typeName;if(!l&&!d)throw new Error(`Cannot flatten attribute <${n}.${r}> with unknown type`);const f=this._getFlattenPropertyMetadata(n,r,e),p=l?e.getTargets():[],y=l?[]:e.getConnections(),m=l?void 0:e.getResolveInfo("default"),g=l?void 0:e.getValue(),S=l?void 0:e.getResolveInfo(),_=S?.getSource()===Or.Spline?e.getSpline():void 0,P=S?.valueSourceMightBeTimeVarying()&&!_?e.getTimeSampleKeys().map(b=>{const I=e.getResolveInfo(b);return[b,I.valueIsBlocked()?new Pe:e.getValueAtTime(b)]}):[],w=b=>aP(b,n,a);if(o===this&&n===a&&r===c||o._clearPropertySpecForFlatten(a,c),o.declareProperty(a,c,l?"rel":d),l)o._setRelTargets(a,c,p.map(w));else{const b=o._primHandle(a).attr(c);b.clear(),m?.valueIsBlocked()?o._setAttrDefault(a,c,new Pe):(m?.getSource()===Or.Default||m?.getSource()===Or.Fallback)&&o._setAttrDefault(a,c,g),_&&b.setSpline(_);for(const[I,T]of P)b.setTimeSample(I,T);b.setConnections(y.map(w))}for(const[b,I]of Object.entries(f))o._setPropertyMetadata(a,c,b,I);return o.get(u)}_clearPropertySpecForFlatten(e,t){if(!this._editTarget)throw new Error("Stage is read-only");const s=`${e}.${t}`,n=this._mapEditSpecPath(s);this._ownAuthoring(()=>this._editTarget._deleteSpec(n)),this.nodes.delete(s)}_getFlattenPropertyMetadata(e,t,s){const n=new Set,r=this._getPrimQuerySource(e);if(r)for(const c of r.index.getNodeRange()){if(c.inert)continue;const l=F(c.path),u=`${l==="/"?"":l}.${t}`;for(const{layer:h}of c.layerStack.layers)for(const d of h.getFieldNames(u))n.add(d)}else for(const c of Object.keys(this.nodes.get(`${e}.${t}`)?.fields??{}))n.add(c);const o=new Set(["default","timeSamples","spline","typeName","connectionPaths","targetPaths"]),a={};for(const c of n){if(o.has(c)||c.startsWith("__"))continue;const l=s.getField(c);l!==void 0&&(a[c]=l)}return a}_getAllAuthoredPropertyMetadata(e,t,s){return this._getFlattenPropertyMetadata(e,t,s)}_getFlattenPrimMetadata(e){const t=new Set;let s="unknown";const n=Ih(e)?void 0:this._getPrimQuerySource(e);if(n)for(const o of n.index.getNodeRange()){if(o.inert)continue;const a=F(o.path);for(const{layer:c}of o.layerStack.layers){s==="unknown"&&(s=c.getSpecType(a));for(const l of c.getFieldNames(a))t.add(l)}}else for(const o of Object.keys(this.nodes.get(e)?.fields??{}))t.add(o);s==="prim"&&t.add("specifier");const r={};for(const o of t){if(o.startsWith("__"))continue;const a=this._resolvePrimMetadata(e,o);a!==void 0&&(r[o]=a)}return r}_getAllAuthoredPrimMetadata(e){return this._getFlattenPrimMetadata(e)}_getAuthoredAppliedSchemas(e){const t=this._getPrimQuerySource(e);return t?Xp(t.index,"apiSchemas"):void 0}getSpecializeArcTargets(e){const t=this._pcpCache?.findPrimIndex(e);if(!t)return[];const s=[];for(const n of t.getNodeRange()){if(!Ws(n.arcType)||n.parent!==t.rootNode||n.mapToParent.mapSourceToTarget(B.absoluteRootPath).isEmpty())continue;let r=null;const o=new Set;for(let c=n.origin;c&&!o.has(c);c=c.origin===c?null:c.origin)if(o.add(c),c.arcType===C.Reference){r=c;break}const a=(r??t.rootNode).mapToRoot.mapSourceToTarget(n.path);s.push(a.isEmpty()?n.path.pathString:a.pathString)}return s}isStrongestConnectionFromSpecializes(e){const t=e.indexOf(".");if(t<=0)return!1;const s=e.slice(0,t),n=e.slice(t+1),r=this._pcpCache?.findPrimIndex(s);if(!r)return!1;for(const o of r.getNodeRange()){if(o.inert)continue;const a=F(o.path.appendProperty(n));for(const{layer:c}of o.layerStack.layers){const l=c.getField(a,"connectionPaths");if(Array.isArray(l)&&l.length>0)return uP(o)}}return!1}async setSubLayerPaths(e,t){if(!this._rootLayer)throw new Error("Stage has no root layer (in-memory authoring stage)");this._rootLayer.setField("/","subLayers",[...e]),t&&this._rootLayer.setField("/","subLayerOffsets",[...t]),await this.flushChanges()}async insertSubLayer(e,t=0){const s=this.getSubLayerPaths(),n=Math.max(0,Math.min(t,s.length));s.splice(n,0,e),await this.setSubLayerPaths(s)}async removeSubLayer(e){const t=this.getSubLayerPaths();e<0||e>=t.length||(t.splice(e,1),await this.setSubLayerPaths(t))}static createNew(){const e=te.createAnonymous(),t=new Map;t.set("/",{fields:{}});const s=new Ms(t,e);return s._refreshFallbackPrimTypes(s.nodes),s._subscribeRegistryLayers(),s}getEditTarget(){return this._editTargetContext??new ds}getEditTargetForLocalLayer(e){const t=this._pcpCache?.getLayerStack().layers;if(typeof e=="number"){const n=t?.[e];if(!n)throw new Error(`Local layer index ${e} is out of range`);return new ds(n.layer,n.offset)}const s=t?.find(n=>n.layer===e);if(s)return new ds(e,s.offset);if(this.getLayerStack(!0).includes(e))return new ds(e);throw new Error("Layer is not in the stage local layer stack")}getRootLayer(){if(!this._rootLayer&&this._editTarget)return this._editTarget;if(!this._rootLayer)throw new Error("Stage has no root layer");return this._rootLayer}_sessionLayer=null;getSessionLayer(){if(!this._sessionLayer)throw new Error("Stage has no session layer (in-memory authoring stage)");return this._sessionLayer}hasSessionLayer(){return this._sessionLayer!==null}getUsedLayers(){if(this._usedLayers.size>0)return[...this._usedLayers];const e=[];return this._rootLayer?e.push(this._rootLayer):this._editTarget&&e.push(this._editTarget),this._sessionLayer&&!e.includes(this._sessionLayer)&&e.push(this._sessionLayer),e}getLayerStack(e=!0){const t=[],s=n=>{n&&!t.includes(n)&&t.push(n)};if(!this._rootLayer)return s(this._editTarget),t;if(this._pcpCache){for(const{layer:n}of this._pcpCache.getLayerStack().layers){const r=n;!e&&r===this._sessionLayer||s(r)}return t}return e&&s(this._sessionLayer),s(this._rootLayer),t}setEditTarget(e){const t=e instanceof ds?e:new ds(e),s=t.getLayer();if(!s)throw new Error("setEditTarget: invalid edit target");if(t.getMapFunction().isIdentity()&&s!==this._editTarget&&!this.getLayerStack(!0).includes(s))throw new Error("setEditTarget: layer is not in the stage's local layer stack");this._editTarget=s,this._editTargetContext=t}_notifyAuthored(e,t=[]){if(this._pcpCache){for(const n of e)this._pendingChanges.add(n);for(const n of t)this._pendingResyncs.add(n);return}if(this._changeListeners.size===0||e.length===0&&t.length===0)return;const s=this._withNamespaceEditMethods({resyncedPaths:t,changedInfoOnlyPaths:e});for(const n of this._changeListeners)n(s)}_ensureEditSpec(e){if(!this._editTarget)throw new Error("Stage is read-only");const t=this._mapEditSpecPath(e);if(this._editTarget.getField(t,"specifier")!==void 0)return;const s=t.split("/").filter(Boolean),n=s.map((r,o)=>"/"+s.slice(0,o+1).join("/")).filter(r=>this._editTarget.getField(r,"specifier")===void 0);this._ownAuthoring(()=>{for(const r of n)this._editTarget.definePrimSpec(r,void 0,"over")})}_mapEditSpecPath(e){const t=this._editTargetContext?.mapToSpecPath(e)??e;if(!t)throw new Error(`Cannot map <${e}> to the current edit target`);return t}_mapEditTime(e){const t=this._editTargetContext?.getMapFunction().getTimeOffset();if(!t)return e;const s=bc(t);if(!s)throw new Error("Current edit target has a non-invertible time offset");return lt(s,e)}_mapEditValue(e,t){return t==="timecode"&&typeof e=="number"?this._mapEditTime(e):t==="timecode[]"&&Array.isArray(e)?e.map(s=>typeof s=="number"?this._mapEditTime(s):s):e}_mapEditProperty(e,t){const s=this._mapEditSpecPath(`${e}.${t}`),n=s.lastIndexOf(".");if(n<0)throw new Error(`Edit target did not map a property path for <${e}.${t}>`);return{primPath:s.slice(0,n),propertyName:s.slice(n+1),propertyPath:s}}_reflattenPrim(e,t=!1){if(this._pcpCache){const s=this._pcpCache.findPrimIndex(e);return this._scheduleRecompose(),s?(t||X0(s,this.nodes,e,this._instancing.instanceToProto.get(e)),!0):!1}return!1}_validateAuthoringTarget(e){const t=e.split(".")[0];if(Fr(t))throw new Error(`Cannot author to <${e}>: prototype prims are read-only`);let s=t;for(;s.lastIndexOf("/")>0;)if(s=s.slice(0,s.lastIndexOf("/")),this.nodes.get(s)?.fields.__prototypePath!==void 0)throw new Error(`Cannot author to <${e}>: descendants of instance <${s}> are instance proxies and read-only`)}definePrim(e,t){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);const s=this.nodes.get(e),n=s?.fields.specifier;if(s&&(n==="def"||n==="class")&&(!t||s.fields.typeName===t))return this._primHandle(e);const r=this._mapEditSpecPath(e);if(this._ownAuthoring(()=>this._editTarget.definePrimSpec(r,t)),this._ensureEditSpec(e),!this._reflattenPrim(e)){const o=e.split("/").filter(Boolean);for(let c=0;c<o.length-1;c++){const l="/"+o.slice(0,c+1).join("/");this.nodes.has(l)||this.nodes.set(l,{fields:{specifier:"def"}})}const a=this.nodes.get(e)??{fields:{}};a.fields.specifier="def",t&&(a.fields.typeName=t),this.nodes.set(e,a)}return this._notifyAuthored([],[e]),this._primHandle(e)}has(e){return this.nodes.has(e)}getPrim(e){if(this.nodes.has(e))return new Fs(this.nodes,e,void 0,this);const t=this._resolveInstanceProxy(e);if(t!==void 0)return new Fs(this.nodes,e,t,this)}_primHandle(e){return new Fs(this.nodes,e,void 0,this)}_resolveInstanceProxy(e){let t=e;for(;;){const s=t.lastIndexOf("/");if(s<=0)return;t=t.slice(0,s);const n=this.nodes.get(t);if(!n)continue;const r=n.fields.__prototypePath;if(r===void 0)return;const o=r+e.slice(t.length);return this.nodes.has(o)?o:this._resolveInstanceProxy(o)}}getPrototypes(){const e=[];for(const t of this._instancing.protoToSource.keys())this.nodes.has(t)&&e.push(new Fs(this.nodes,t,void 0,this));return e}getInstances(e){const t=[];for(const[s,n]of this.nodes)n.fields.__prototypePath===e&&t.push(s);return t.sort()}get(e){const t=this.nodes.get(e),s=e.indexOf("."),n=s>0?{name:e.slice(s+1),def:()=>this.getPrim(e.slice(0,s))?.getPrimDefinition()}:void 0;if(t)return new ji(this.nodes,e,n,this,s>0?e.slice(0,s):void 0,s>0?e.slice(s+1):void 0);if(s>0&&this.nodes.has(e.slice(0,s))){const r=e.slice(s+1);if(this.getPrim(e.slice(0,s))?.getPrimDefinition()?.getPropertyNames().includes(r))return new ji(this.nodes,e,n,this,e.slice(0,s),r)}}traverse(e=ec){const t=this,s=jn(e);return function*(){const n=[...t.getAllChildPrimPaths("/")].reverse();for(;n.length>0;){const r=n.pop(),o=t.getPrim(r);if(!o||!s.evaluate(o))continue;yield r;const a=t.getAllChildPrimPaths(r,{instanceProxies:s.includeInstanceProxies});for(let c=a.length-1;c>=0;c--)n.push(a[c])}}()}traverseAll(){const e=this;return function*(){const t=[...e.getAllChildPrimPaths("/")].reverse();for(;t.length>0;){const s=t.pop();yield s;const n=e.getAllChildPrimPaths(s);for(let r=n.length-1;r>=0;r--)t.push(n[r])}}()}getChildPrimPaths(e,t){return this._getChildPrimPaths(e,t,!1)}getAllChildPrimPaths(e,t){return this._getChildPrimPaths(e,t,!0)}_getChildPrimPaths(e,t,s){const n=this.nodes.get(e),r=n===void 0&&t?.instanceProxies?this._resolveInstanceProxy(e):void 0,o=n?.fields.__prototypePath??r;if(o!==void 0||r!==void 0){if(!t?.instanceProxies)return[];const l=o!==void 0&&n!==void 0?o:r;return this._getChildPrimPaths(l,t,s).map(u=>e+u.slice(l.length))}const a=qp(this.nodes).children.get(e);if(!a)return[];const c=s?[...a]:a.filter(l=>{const u=this.getPrim(l);return u!==void 0&&u.isActive&&u.isDefined&&u.isLoaded&&!u.isAbstract});return e==="/"?c.filter(l=>!Fr(l)):c}flatten(){return Yo("usd-ts:Stage.flatten",e=>(e&&Me(e,"stageNodeCount",this.nodes.size),this._flatten()))}_flatten(){const e=te.createAnonymous("anon:flattened"),t=this._rootLayer??this._editTarget;if(t)for(const c of["defaultPrim","upAxis","metersPerUnit","startTimeCode","endTimeCode","timeCodesPerSecond","framesPerSecond"]){const l=t.getField("/",c);l!==void 0&&e.setField("/",c,l)}const s=c=>c.replace(/^\/__Prototype_(\d+)/,"/Flattened_Prototype_$1"),n=new Map,r=[];for(const c of this.nodes.keys()){if(c==="/")continue;const l=c.indexOf(".");if(l<0)r.push(c);else{const u=c.slice(0,l);(n.get(u)??n.set(u,[]).get(u)).push(c.slice(l+1))}}const o=new Set(r);r.length=0;const a=c=>{if(o.delete(c)){r.push(c);for(const l of this.getAllChildPrimPaths(c))a(l)}};for(const c of this.getPrototypes())a(c.path);for(const c of this.getAllChildPrimPaths("/"))a(c);for(const c of o)r.push(c);for(const c of r){const l=this.nodes.get(c),u=s(c),h=l.fields.specifier;e.definePrimSpec(u,l.fields.typeName,Ih(c)?"over":h==="class"||h==="over"?h:"def");const d=new Set(["specifier","typeName","primChildren","properties","primOrder","inheritPaths","specializes","references","payload","apiSchemas","variantSetChildren","variantSetNames","variantSelection","relocates","clips","clipSets"]),f=this._getFlattenPrimMetadata(c);for(const[m,g]of Object.entries(f))m.startsWith("__")||d.has(m)||g===void 0||e.setField(u,m,g);const p=l.fields.apiSchemas;p!==void 0&&p.length>0&&e.setField(u,"apiSchemas",{isExplicit:!0,explicitItems:[...p],prependedItems:[],appendedItems:[],deletedItems:[]});const y=l.fields.__prototypePath;if(y!==void 0){const m={assetPath:"",primPath:s(y),layerOffset:{offset:0,scale:1}},g={isExplicit:!1,explicitItems:[],prependedItems:[],deletedItems:[],appendedItems:[m]};Object.defineProperty(g,"_sdfAddedItems",{value:g.appendedItems,configurable:!0,enumerable:!1,writable:!0}),e.setField(u,"references",g)}for(const m of n.get(c)??[]){const g=this.getPrim(c)?.getAttr(m);if(!g)continue;if(g.isRelationship){const P=g.getTargets().map(s);e.setRelTargets(u,m,P)}else{g.typeName&&e.declareProperty(u,m,g.typeName);const P=g.getConnections();P.length>0&&e.setAttrConnections(u,m,P.map(s));const w=g.getTimeSampleKeys();for(const b of w){const I=g.getValueAtTime(b);I!==void 0&&e.setAttrTimeSample(u,m,b,I)}const v=g.getValue();v!==void 0&&e.setAttrDefault(u,m,v)}const S=new Set(["specifier","typeName","default","timeSamples","targetPaths","connectionPaths"]),_=this._getFlattenPropertyMetadata(c,m,g);for(const[P,w]of Object.entries(_))P.startsWith("__")||S.has(P)||w===void 0||e.setField(`${u}.${m}`,P,w)}}return e}exportToUsda(){if(!this._editTarget)throw new Error("Stage has no edit target");return this._editTarget.toUsda()}exportToUsdc(){if(!this._editTarget)throw new Error("Stage has no edit target");return this._editTarget.toUsdc()}async save(){return this.getRootLayer().save()}async reload(){const e=this.getUsedLayers().filter(t=>!t.filePath.startsWith("anon:"));for(const t of e)await t.reload();await this._recomposeForEdit("/")}async export(e){return this.flatten().export(e)}setMetadata(e,t){return this.getRootLayer().setField("/",e,t),!0}getMetadata(e){return this.getRootLayer().getField("/",e)}hasMetadata(e){return this.getRootLayer().getField("/",e)!==void 0}clearMetadata(e){return this.getRootLayer().eraseField("/",e),!0}writeFallbackPrimTypes(){const e=M.getInstance().getFallbackPrimTypes();if(Object.keys(e).length===0)return;const t=this.getMetadata("fallbackPrimTypes"),s=Lt(t)?{...e,...t}:{...e};this._suppressLayerNotices+=1;try{this.setMetadata("fallbackPrimTypes",s)}finally{this._suppressLayerNotices-=1}if(this._fallbackPrimTypesJson=JSON.stringify(s),this._changeListeners.size>0){const n=this._withNamespaceEditMethods({resyncedPaths:[],changedInfoOnlyPaths:["/"]});for(const r of this._changeListeners)r(n)}}setDefaultPrim(e){const t=e.path.split("/").filter(Boolean)[0];if(!t||e.path!==`/${t}`)throw new Error(`setDefaultPrim: defaultPrim must be a root-level prim, got <${e.path}>`);this.getRootLayer().setField("/","defaultPrim",t)}getDefaultPrim(){const e=this.getRootLayer().getField("/","defaultPrim");if(!(typeof e!="string"||e.length===0))return this.getPrim(`/${e}`)}hasDefaultPrim(){const e=this.getRootLayer().getField("/","defaultPrim");return typeof e=="string"&&e.length>0}clearDefaultPrim(){this.getRootLayer().eraseField("/","defaultPrim")}_setPropertyMetadata(e,t,s,n){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);const r=`${e}.${t}`,o=this._mapEditSpecPath(r),a=this.get(r)?.typeName,c=a==="rel"?"relationship":"attribute",l=s==="default"?this._mapEditValue(n,a):Qp(s,c)===void 0?n:gr(n,s,c,u=>this._mapEditTime(u));if(this._ownAuthoring(()=>this._editTarget.setField(o,s,l)),this._ensureEditSpec(e),!this._reflattenPrim(e,!0)){const u=this.nodes.get(r)??{fields:{}};u.fields[s]=n,this.nodes.set(r,u)}this._notifyAuthored([r])}_hasAuthoredPropertyMetadata(e,t,s){if(!this._editTarget)return!1;const n=this._mapEditSpecPath(`${e}.${t}`);return this._editTarget.getField(n,s)!==void 0}_clearPropertyField(e,t,s){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);const n=`${e}.${t}`,r=this._mapEditSpecPath(n);if(this._ownAuthoring(()=>this._editTarget.eraseField(r,s)),this._ensureEditSpec(e),!this._reflattenPrim(e,!0)){const o=this.nodes.get(n);o&&delete o.fields[s]}this._notifyAuthored([n])}_replaceAttrValueOpinions(e,t,s){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);const n=`${e}.${t}`,r=this.get(n)?.typeName,o=this._mapEditProperty(e,t);if(this._ownAuthoring(()=>{this._editTarget.eraseField(o.propertyPath,"default"),this._editTarget.eraseField(o.propertyPath,"timeSamples"),this._editTarget.eraseField(o.propertyPath,"spline"),s!==void 0&&(r&&r!=="rel"&&this._editTarget.getField(o.propertyPath,"typeName")===void 0&&this._editTarget.setField(o.propertyPath,"typeName",r),this._editTarget.setAttrDefault(o.primPath,o.propertyName,this._mapEditValue(s,r)))}),this._ensureEditSpec(e),!this._reflattenPrim(e,!0)){const a=this.nodes.get(n)??{fields:{}};delete a.fields.default,delete a.fields.spline,delete a.timeSamples,r&&(a.fields.typeName=r),s!==void 0&&(a.fields.default=s),this.nodes.set(n,a)}this._notifyAuthored([n])}_setAttrDefault(e,t,s){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);const n=`${e}.${t}`,r=this.get(n)?.typeName,o=this._mapEditProperty(e,t);if(this._ownAuthoring(()=>{r&&r!=="rel"&&this._editTarget.getField(o.propertyPath,"typeName")===void 0&&this._editTarget.setField(o.propertyPath,"typeName",r),this._editTarget.setAttrDefault(o.primPath,o.propertyName,this._mapEditValue(s,r))}),this._ensureEditSpec(e),!this._reflattenPrim(e,!0)){const a=this.nodes.get(n)??{fields:{}};a.fields.default=s,this.nodes.set(n,a)}this._notifyAuthored([n])}_setAttrConnections(e,t,s){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);for(const l of s)this._validateConnectionTarget(l);const n=this._mapEditProperty(e,t),r=s.map(l=>this._mapEditSpecPath(l));this._ownAuthoring(()=>this._editTarget.setAttrConnections(n.primPath,n.propertyName,r));const o=`${e}.${t}`;this._ensureEditSpec(e);const a=this._reflattenPrim(e,!0),c=this.nodes.get(o)??{fields:{}};a||(c.fields.connectionPaths=s),this.nodes.set(o,c),this._notifyAuthored([o])}_editAttrConnectionList(e,t,s){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);const n=this._mapEditProperty(e,t);this._ownAuthoring(()=>{const o=rs(this._editTarget.getField(n.propertyPath,"connectionPaths"))??{isExplicit:!1,explicitItems:[],deletedItems:[],prependedItems:[],appendedItems:[],orderedItems:[]},a=s(o);a===void 0?this._editTarget.eraseField(n.propertyPath,"connectionPaths"):this._editTarget.setField(n.propertyPath,"connectionPaths",a)}),this._ensureEditSpec(e),this._reflattenPrim(e,!0);const r=`${e}.${t}`;this.nodes.has(r)||this.nodes.set(r,{fields:{}}),this._notifyAuthored([r])}_addAttrConnection(e,t,s,n){this._validateConnectionTarget(s);const r=this._mapEditSpecPath(s);this._editAttrConnectionList(e,t,o=>{const a=[...o.explicitItems],c=[...o.prependedItems],l=[...o.appendedItems],u=o.deletedItems.filter(p=>p!==r),h=p=>{const y=p.indexOf(r);y>=0&&p.splice(y,1)};h(a),h(c),h(l);const d=n==="frontOfPrependList"||n==="frontOfAppendList",f=o.isExplicit?a:n==="frontOfPrependList"||n==="backOfPrependList"?c:l;return d?f.unshift(r):f.push(r),{isExplicit:o.isExplicit,explicitItems:a,deletedItems:u,prependedItems:c,appendedItems:l,orderedItems:[...o.orderedItems]}})}_removeAttrConnection(e,t,s){this._validateConnectionTarget(s);const n=this._mapEditSpecPath(s);this._editAttrConnectionList(e,t,r=>r.isExplicit?{...r,explicitItems:r.explicitItems.filter(o=>o!==n)}:{...r,prependedItems:r.prependedItems.filter(o=>o!==n),appendedItems:r.appendedItems.filter(o=>o!==n),deletedItems:[...r.deletedItems.filter(o=>o!==n),n]})}_clearAttrConnections(e,t){this._editAttrConnectionList(e,t,()=>{})}_validateConnectionTarget(e){if(Fr(e))throw new Error(`Cannot author connection to prototype object <${e}>`)}declareProperty(e,t,s){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);const n=this._mapEditProperty(e,t);this._ownAuthoring(()=>this._editTarget.declareProperty(n.primPath,n.propertyName,s));const r=`${e}.${t}`,o=this.nodes.get(r)??{fields:{}};o.fields.typeName=s,this.nodes.set(r,o)}setPropertyField(e,t,s){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);const n=this._mapEditSpecPath(e);this._ownAuthoring(()=>this._editTarget.setField(n,t,s));const r=this.nodes.get(e)??{fields:{}};r.fields[t]=s,this.nodes.set(e,r)}applyAPI(e,t){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);const s=this._mapEditSpecPath(e);this._ownAuthoring(()=>{const n=this._editTarget.getField(s,"apiSchemas");if(n?.isExplicit){if(n.explicitItems.includes(t))return;this._editTarget.setField(s,"apiSchemas",{...n,explicitItems:[...n.explicitItems,t]});return}const r=n?[...n.prependedItems]:[],o=n?[...n.appendedItems]:[];if(r.includes(t)||o.includes(t))return;const a=n?{...n,prependedItems:[...r,t]}:{isExplicit:!1,explicitItems:[],prependedItems:[t],appendedItems:[],deletedItems:[]};this._editTarget.setField(s,"apiSchemas",a)}),this._ensureEditSpec(e),this._reflattenPrim(e)||this._recomposeAuthoredApiSchemasDirect(e),this._notifyAuthored([],[e])}getAppliedSchemas(e){return this.getPrim(e)?.getAppliedSchemas()??[]}removeAppliedSchema(e,t){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);const s=this._mapEditSpecPath(e);this._ownAuthoring(()=>{const n=this._editTarget.getField(s,"apiSchemas")??{isExplicit:!1,explicitItems:[],prependedItems:[],appendedItems:[],deletedItems:[]},r=n.isExplicit?{...n,explicitItems:n.explicitItems.filter(o=>o!==t)}:{...n,prependedItems:n.prependedItems.filter(o=>o!==t),appendedItems:n.appendedItems.filter(o=>o!==t),deletedItems:n.deletedItems.includes(t)?[...n.deletedItems]:[...n.deletedItems,t]};this._editTarget.setField(s,"apiSchemas",r)}),this._ensureEditSpec(e),this._reflattenPrim(e)||this._recomposeAuthoredApiSchemasDirect(e),this._notifyAuthored([],[e])}_recomposeAuthoredApiSchemasDirect(e){const t=[];for(const r of this.getLayerStack(!0)){const o=rs(r.getField(e,"apiSchemas"));if(o!==null&&(t.push(o),o.isExplicit))break}const s=Hd(t),n=this.nodes.get(e)??{fields:{}};s.length>0?n.fields.apiSchemas=s:delete n.fields.apiSchemas,this.nodes.set(e,n)}_setPrimTypeName(e,t){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);const s=this._mapEditSpecPath(e);if(this._ownAuthoring(()=>this._editTarget.setField(s,"typeName",t)),this._ensureEditSpec(e),!this._reflattenPrim(e)){const n=this.nodes.get(e)??{fields:{}};t!==""?n.fields.typeName=t:delete n.fields.typeName,this.nodes.set(e,n)}this._notifyAuthored([],[e])}_setPrimMetadata(e,t,s){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);const n=this._mapEditSpecPath(e),r=gr(s,t,"prim",o=>this._mapEditTime(o));if(this._ownAuthoring(()=>this._editTarget.setField(n,t,r)),this._ensureEditSpec(e),!this._reflattenPrim(e)){const o=this.nodes.get(e)??{fields:{}};o.fields[t]=s,this.nodes.set(e,o)}oc(t)==="infoOnly"?this._notifyAuthored([e]):this._notifyAuthored([],[e])}_clearPrimMetadata(e,t){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);const s=this._mapEditSpecPath(e);if(this._ownAuthoring(()=>this._editTarget.eraseField(s,t)),this._ensureEditSpec(e),!this._reflattenPrim(e)){const n=this.nodes.get(e);n&&delete n.fields[t]}oc(t)==="infoOnly"?this._notifyAuthored([e]):this._notifyAuthored([],[e])}_setRelTargets(e,t,s){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);const n=this._mapEditProperty(e,t),r=s.map(c=>this._mapEditSpecPath(c));this._ownAuthoring(()=>this._editTarget.setRelTargets(n.primPath,n.propertyName,r));const o=`${e}.${t}`;if(this._ensureEditSpec(e),!this._reflattenPrim(e,!0)||!this.nodes.has(o)){const c=this.nodes.get(o)??{fields:{}};c.fields.typeName="rel",c.fields.targetPaths=s,this.nodes.set(o,c)}this._notifyAuthored([o])}_setAttrTimeSample(e,t,s,n){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);const r=`${e}.${t}`,o=this.get(r)?.typeName,a=this._mapEditProperty(e,t);if(this._ownAuthoring(()=>this._editTarget.setAttrTimeSample(a.primPath,a.propertyName,this._mapEditTime(s),this._mapEditValue(n,o))),this._ensureEditSpec(e),!this._reflattenPrim(e,!0)){const c=this.nodes.get(r)??{fields:{}},l=(c.timeSamples??[]).filter(([u])=>u!==s);l.push([s,n]),l.sort(([u],[h])=>u-h),c.timeSamples=l,this.nodes.set(r,c)}this._notifyAuthored([r])}}class wi{_prim;_stage;_hasPrim;constructor(e,t){this._prim=e,this._stage=t,this._hasPrim=e!==void 0}get path(){return this._hasPrim?this._prim.path:""}get prim(){return this._prim}get stage(){return this._stage}isConcrete(){return this._schemaKind()==="concreteTyped"}isTyped(){const e=this._schemaKind();return e==="abstractTyped"||e==="concreteTyped"}isAppliedAPISchema(){const e=this._schemaKind();return e==="singleApplyAPI"||e==="multipleApplyAPI"}isValid(){return this._hasPrim&&this._stage.has(this._prim.path)}_schemaKind(){const e=this.constructor;return e.typeName?M.findSchemaInfo(e.typeName)?.kind??"invalid":"invalid"}_attr(e,t){if(!this._hasPrim)throw new Error("Cannot access an attribute on an invalid schema");return this._stage.declareProperty(this._prim.path,e,t),this._prim.attr(e)}_rel(e){if(!this._hasPrim)throw new Error("Cannot access a relationship on an invalid schema");return this._prim.rel(e)}}class hP extends wi{static typeName="APISchemaBase";static getSchemaAttributeNames(e=!0){return[]}}const Tt=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];function V(i,e){const t=new Array(16);for(let s=0;s<4;s++)for(let n=0;n<4;n++)t[s*4+n]=i[s*4+0]*e[n]+i[s*4+1]*e[4+n]+i[s*4+2]*e[8+n]+i[s*4+3]*e[12+n];return t}function yr(i,e,t){return[1,0,0,0,0,1,0,0,0,0,1,0,i,e,t,1]}function fn(i,e,t){return[i,0,0,0,0,e,0,0,0,0,t,0,0,0,0,1]}function st(i){const e=i*Math.PI/180,t=Math.cos(e),s=Math.sin(e);return[1,0,0,0,0,t,s,0,0,-s,t,0,0,0,0,1]}function it(i){const e=i*Math.PI/180,t=Math.cos(e),s=Math.sin(e);return[t,0,-s,0,0,1,0,0,s,0,t,0,0,0,0,1]}function nt(i){const e=i*Math.PI/180,t=Math.cos(e),s=Math.sin(e);return[t,s,0,0,-s,t,0,0,0,0,1,0,0,0,0,1]}function Qr(i,e,t,s){const n=e+e,r=t+t,o=s+s,a=e*n,c=e*r,l=e*o,u=t*r,h=t*o,d=s*o,f=i*n,p=i*r,y=i*o;return[1-(u+d),c+y,l-p,0,c-y,1-(a+d),h+f,0,l+p,h-f,1-(a+u),0,0,0,0,1]}const Jo=34028234663852886e22;function as(i,e=0){const t=i[0],s=i[1],n=i[4],r=i[5],o=i[8],a=i[9],c=i[12],l=i[13];let u=t*r-n*s,h=t*a-o*s,d=t*l-c*s,f=n*a-o*r,p=n*l-c*r,y=o*l-c*a;const m=i[2],g=i[3],S=i[6],_=i[7],P=i[10],w=i[11],v=i[14],b=i[15],I=m*f-S*h+P*u,T=S*d-v*u-m*p,E=m*y-P*d+v*h,D=P*p-v*f-S*y,N=_*h-w*u-g*f,x=g*p-_*d+b*u,R=w*d-b*h-g*y,U=_*y-w*p+b*f;u=m*_-S*g,h=m*w-P*g,d=m*b-v*g,f=S*w-P*_,p=S*b-v*_,y=P*b-v*w;const $=r*h-a*u-s*f,Ie=s*p-r*d+l*u,le=a*d-l*h-s*y,q=r*y-a*p+l*f,Z=t*f-n*h+o*u,ye=n*d-c*u-t*p,Ae=t*y-o*d+c*h,fe=o*p-c*f-n*y,ue=c*$+o*Ie+n*le+t*q;if(Math.abs(ue)>e){const oe=1/ue;return[q*oe,le*oe,Ie*oe,$*oe,fe*oe,Ae*oe,ye*oe,Z*oe,U*oe,R*oe,x*oe,N*oe,D*oe,E*oe,T*oe,I*oe]}return[Jo,0,0,0,0,Jo,0,0,0,0,Jo,0,0,0,0,1]}function sn(i,e,t,s){return[e*i[0]+t*i[4]+s*i[8]+i[12],e*i[1]+t*i[5]+s*i[9]+i[13],e*i[2]+t*i[6]+s*i[10]+i[14]]}const Jp=new Float32Array(1),dP=new Uint32Array(Jp.buffer);function Es(i){Jp[0]=i;const e=dP[0],t=e>>>16&32768,s=e>>>23&255,n=e&8388607;let r;if(s===255)r=t|31744|(n===0?0:512);else{const l=s-127;if(l>15)r=t|31744;else if(l<-14)if(l<-25)r=t;else{const u=n|8388608,h=-l-1;let d=u>>>h;const f=u&(1<<h)-1,p=1<<h-1;(f>p||f===p&&d&1)&&d++,r=t|d}else{let u=n>>>13;const h=n&8191;(h>4096||h===4096&&u&1)&&u++,r=t|l+15<<10|u}}const o=r>>>10&31,a=r&1023,c=o===31?a?NaN:1/0:o===0?a*2**-24:(1+a/1024)*2**(o-15);return t?-c:c}const Pi=1e-10,pP=1e-6;function ri(i){return i instanceof ce?i.data:i}class ce{_data;constructor(e,t){if(this._data=new Array(e).fill(0),t.length!==0){if(t.length===1){const s=t[0];if(typeof s=="number"){for(let r=0;r<e;r++)this._data[r]=s;return}const n=ri(s);if(n.length!==e)throw new TypeError(`GfVec: expected ${e} components, got ${n.length}`);for(let r=0;r<e;r++)this._data[r]=n[r];return}if(t.length!==e)throw new TypeError(`GfVec: expected ${e} arguments, got ${t.length}`);for(let s=0;s<e;s++){const n=t[s];if(typeof n!="number")throw new TypeError("GfVec: explicit constructor takes numbers");this._data[s]=n}}}_round(e){return this.scalarKind==="f"?Math.fround(e):this.scalarKind==="h"?Es(e):this.scalarKind==="i"?Math.trunc(e):e}_sameType(e){const t=this.constructor,s=new t;for(let n=0;n<this.dimension;n++)s._data[n]=s._round(e[n]);return s}get data(){return this._data}get(e){if(e<0&&(e+=this.dimension),e<0||e>=this.dimension)throw new RangeError(`GfVec index ${e} out of range`);return this._data[e]}setComponent(e,t){if(e<0&&(e+=this.dimension),e<0||e>=this.dimension)throw new RangeError(`GfVec index ${e} out of range`);return this._data[e]=this._round(t),this}Set(...e){if(e.length!==this.dimension)throw new TypeError(`Set: expected ${this.dimension} values, got ${e.length}`);for(let t=0;t<this.dimension;t++)this._data[t]=this._round(e[t]);return this}equals(e){const t=ri(e);if(t.length!==this.dimension)return!1;for(let s=0;s<this.dimension;s++)if(this._data[s]!==t[s])return!1;return!0}Add(e){const t=ri(e);return this._sameType(this._data.map((s,n)=>s+t[n]))}Subtract(e){const t=ri(e);return this._sameType(this._data.map((s,n)=>s-t[n]))}GetScaled(e){return this._sameType(this._data.map(t=>t*e))}GetDivided(e){return this.scalarKind==="i"?this._sameType(this._data.map(t=>t/e)):this.GetScaled(1/e)}GetNegated(){return this._sameType(this._data.map(e=>-e))}AddInPlace(e){const t=ri(e);for(let s=0;s<this.dimension;s++)this._data[s]=this._round(this._data[s]+t[s]);return this}SubtractInPlace(e){const t=ri(e);for(let s=0;s<this.dimension;s++)this._data[s]=this._round(this._data[s]-t[s]);return this}ScaleInPlace(e){for(let t=0;t<this.dimension;t++)this._data[t]=this._round(this._data[t]*e);return this}DivideInPlace(e){if(this.scalarKind==="i"){for(let t=0;t<this.dimension;t++)this._data[t]=this._round(this._data[t]/e);return this}return this.ScaleInPlace(1/e)}Dot(e){const t=ri(e);let s=0;for(let n=0;n<this.dimension;n++)s+=this._data[n]*t[n];return this._round(s)}GetDot(e){return this.Dot(e)}GetProjection(e){return e.GetScaled(this.Dot(e))}GetComplement(e){return this.Subtract(this.GetProjection(e))}GetLengthSq(){return this.Dot(this)}GetLength(){return this._round(Math.sqrt(this.GetLengthSq()))}Normalize(e=Pi){const t=this.GetLength();return this.DivideInPlace(t>e?t:e),t}GetNormalized(e=Pi){const t=this._sameType(this._data);return t.Normalize(e),t}toString(){return`(${this._data.join(", ")})`}repr(){return`Gf.${this.constructor.name}(${this._data.join(", ")})`}hash(){return`${this.constructor.name}:${this._data.join(",")}`}static XAxis(){return this.Axis(0)}static YAxis(){return this.Axis(1)}static Axis(e){const t=new this;return e<t.dimension&&t.setComponent(e,1),t}}class ee extends ce{dimension=2;scalarKind="d";constructor(...e){super(2,e)}}class fP extends ce{dimension=2;scalarKind="f";constructor(...e){super(2,e);for(let t=0;t<2;t++)this._data[t]=Math.fround(this._data[t])}}class Rc extends ce{dimension=3;static ZAxis(){return this.Axis(2)}Cross(e){const t=this._data,s=e.data;return this._sameType([t[1]*s[2]-t[2]*s[1],t[2]*s[0]-t[0]*s[2],t[0]*s[1]-t[1]*s[0]])}GetCross(e){return this.Cross(e)}static OrthogonalizeBasis(e,t,s,n,r=pP){let o,a,c;if(n?(e.Normalize(),t.Normalize(),s.Normalize(),o=e.clone(),a=t.clone(),c=s.clone()):(o=e.clone(),a=t.clone(),c=s.clone(),o.Normalize(),a.Normalize(),c.Normalize()),ea(o,a,r)||ea(o,c,r)||ea(a,c,r))return!1;const l=20;let u=0;for(;u<l;++u){let h=e.clone(),d=t.clone(),f=s.clone();h=h.Subtract(a.GetScaled(a.Dot(h))),h=h.Subtract(c.GetScaled(c.Dot(h))),d=d.Subtract(o.GetScaled(o.Dot(d))),d=d.Subtract(c.GetScaled(c.Dot(d))),f=f.Subtract(o.GetScaled(o.Dot(f))),f=f.Subtract(a.GetScaled(a.Dot(f)));const p=e.Add(h).GetScaled(.5),y=t.Add(d).GetScaled(.5),m=s.Add(f).GetScaled(.5);n&&(p.Normalize(),y.Normalize(),m.Normalize());const g=e.Subtract(p),S=t.Subtract(y),_=s.Subtract(m);if(g.Dot(g)+S.Dot(S)+_.Dot(_)<r*r)break;e.copyFrom(p),t.copyFrom(y),s.copyFrom(m),o=e.clone(),a=t.clone(),c=s.clone(),n||(o.Normalize(),a.Normalize(),c.Normalize())}return u<l}BuildOrthonormalFrame(e=Pi){const t=this.GetLength();if(t===0)return[this._sameType([0,0,0]),this._sameType([0,0,0])];const s=this.GetDivided(t);let n=this._sameType([1,0,0]).Cross(s);n.GetLengthSq()<1e-4*1e-4&&(n=this._sameType([0,1,0]).Cross(s)),n.Normalize();const r=s.Cross(n);if(t<e){const o=t/e;return n=n.GetScaled(o),[n,r.GetScaled(o)]}return[n,r]}copyFrom(e){for(let t=0;t<this.dimension;t++)this._data[t]=this._round(e.get(t));return this}clone(){return this._sameType(this._data)}}class k extends Rc{scalarKind="d";constructor(...e){super(3,e)}}class Jt extends Rc{scalarKind="f";constructor(...e){super(3,e);for(let t=0;t<3;t++)this._data[t]=Math.fround(this._data[t])}}class Cs extends Rc{scalarKind="h";constructor(...e){super(3,e);for(let t=0;t<3;t++)this._data[t]=Es(this._data[t])}}class ft extends ce{dimension=4;scalarKind="d";constructor(...e){super(4,e)}static ZAxis(){return this.Axis(2)}static WAxis(){return this.Axis(3)}}class Tn extends ce{dimension=4;scalarKind="f";constructor(...e){super(4,e);for(let t=0;t<4;t++)this._data[t]=Math.fround(this._data[t])}static ZAxis(){return this.Axis(2)}static WAxis(){return this.Axis(3)}}function ef(i,e){const t=i.constructor,s=new t(i);for(let n=0;n<s.dimension;n++)s.setComponent(n,i.get(n)*e.get(n));return s}function Oh(i,e){if(i instanceof ce)return i.data;if(!Array.isArray(i))throw new TypeError(`GfDot: ${e} is not a vector`);for(const t of i)if(typeof t!="number"||Number.isNaN(t))throw new TypeError(`GfDot: ${e} has non-numeric component`);return i}function _e(i,e){const t=Oh(i,"v1"),s=Oh(e,"v2");if(t.length!==s.length)throw new TypeError(`GfDot: dimension mismatch ${t.length} vs ${s.length}`);let n=0;for(let r=0;r<t.length;r++)n+=t[r]*s[r];return n}function ea(i,e,t){const s=i.data,n=e.data;let r=0;for(let o=0;o<s.length;o++)r+=(s[o]-n[o])**2;return r<=t*t}function Rh(i,e){return i.Cross(e)}const mP=34028234663852886e22,gP=1e-10,tf=i=>i>0?1:i<0?-1:0,_r={"2d":ee,"2f":fP,"3d":k,"3f":Jt,"4d":ft,"4f":Tn},mn={d:k,f:Jt};function sf(i){return typeof i=="object"&&i!==null&&"axis"in i&&"angle"in i}function cc(i){return Array.isArray(i)&&i.length===4&&i.every(e=>typeof e=="number")}class Po{_m=[];_round(e){return this.scalarKind==="f"?Math.fround(e):e}_alloc(){this._m=new Array(this.dimension*this.dimension).fill(0)}_idx(e,t){return e*this.dimension+t}_wrap(e){return e<0?e+this.dimension:e}_new(){return new this.constructor}_fromFlat(e){const t=this._new();for(let s=0;s<this._m.length;s++)t._m[s]=t._round(e[s]);return t}_constructCommon(e){const t=this.dimension;if(e.length===0){this.SetIdentity();return}if(e.length===1){const s=e[0];if(typeof s=="number"){this.SetDiagonal(s);return}if(s instanceof Po){for(let n=0;n<t;n++)for(let r=0;r<t;r++)this._m[this._idx(n,r)]=this._round(s.GetElement(n,r));return}if(s instanceof ce){this.SetDiagonal(s);return}throw new TypeError("GfMatrix: unsupported single constructor argument")}if(e.length===t*t){this.Set(...e);return}throw new TypeError(`GfMatrix: expected 0, 1, or ${t*t} arguments, got ${e.length}`)}GetElement(e,t){return this._m[this._idx(this._wrap(e),this._wrap(t))]}SetElement(e,t,s){return this._m[this._idx(this._wrap(e),this._wrap(t))]=this._round(s),this}GetRow(e){const t=this._wrap(e),s=this.dimension,n=[];for(let r=0;r<s;r++)n.push(this._m[this._idx(t,r)]);return new _r[`${s}${this.scalarKind}`](...n)}SetRow(e,t){const s=this._wrap(e),n=this.dimension,r=t instanceof ce?t.data:t;for(let o=0;o<n;o++)this._m[this._idx(s,o)]=this._round(r[o]);return this}GetColumn(e){const t=this._wrap(e),s=this.dimension,n=[];for(let r=0;r<s;r++)n.push(this._m[this._idx(r,t)]);return new _r[`${s}${this.scalarKind}`](...n)}SetColumn(e,t){const s=this._wrap(e),n=this.dimension,r=t instanceof ce?t.data:t;for(let o=0;o<n;o++)this._m[this._idx(o,s)]=this._round(r[o]);return this}GetArray(){return this._m}Set(...e){const t=this.dimension*this.dimension;if(e.length!==t)throw new TypeError(`Set: expected ${t} values, got ${e.length}`);for(let s=0;s<t;s++)this._m[s]=this._round(e[s]);return this}SetIdentity(){return this.SetDiagonal(1)}SetZero(){return this.SetDiagonal(0)}SetDiagonal(e){const t=this.dimension,s=typeof e=="number"?null:e instanceof ce?e.data:e;for(let n=0;n<t;n++)for(let r=0;r<t;r++)this._m[this._idx(n,r)]=n===r?this._round(s?s[n]:e):0;return this}GetTranspose(){const e=this.dimension,t=this._new();for(let s=0;s<e;s++)for(let n=0;n<e;n++)t._m[t._idx(n,s)]=this._m[this._idx(s,n)];return t}equals(e){if(e.dimension!==this.dimension)return!1;for(let t=0;t<this._m.length;t++)if(this._m[t]!==e._m[t])return!1;return!0}GetMultiply(e){const t=this.dimension,s=new Array(t*t).fill(0);for(let n=0;n<t;n++)for(let r=0;r<t;r++){let o=0;for(let a=0;a<t;a++)o+=this._m[this._idx(n,a)]*e._m[e._idx(a,r)];s[this._idx(n,r)]=o}return this._fromFlat(s)}MultiplyInPlace(e){const t=this.GetMultiply(e);return this._m=t._m,this}GetScalarMultiply(e){return this._fromFlat(this._m.map(t=>t*e))}ScalarMultiplyInPlace(e){for(let t=0;t<this._m.length;t++)this._m[t]=this._round(this._m[t]*e);return this}GetAdd(e){return this._fromFlat(this._m.map((t,s)=>t+e._m[s]))}AddInPlace(e){for(let t=0;t<this._m.length;t++)this._m[t]=this._round(this._m[t]+e._m[t]);return this}GetSubtract(e){return this._fromFlat(this._m.map((t,s)=>t-e._m[s]))}SubtractInPlace(e){for(let t=0;t<this._m.length;t++)this._m[t]=this._round(this._m[t]-e._m[t]);return this}GetNegated(){return this._fromFlat(this._m.map(e=>-e))}GetDivide(e){return this.GetMultiply(e.GetInverse())}MultMatrixVec(e){const t=this.dimension,s=e instanceof ce?e.data:e,n=[];for(let r=0;r<t;r++){let o=0;for(let a=0;a<t;a++)o+=s[a]*this._m[this._idx(r,a)];n.push(o)}return new _r[`${t}${this.scalarKind}`](...n)}MultVecMatrix(e){const t=this.dimension,s=e instanceof ce?e.data:e,n=[];for(let r=0;r<t;r++){let o=0;for(let a=0;a<t;a++)o+=s[a]*this._m[this._idx(a,r)];n.push(o)}return new _r[`${t}${this.scalarKind}`](...n)}Contains(e){return this._m.includes(e)}hash(){return`${this.dimension}:${this._m.join(",")}`}toString(){const e=this.dimension,t=[];for(let s=0;s<e;s++){const n=[];for(let r=0;r<e;r++)n.push(this._m[this._idx(s,r)]);t.push(`(${n.join(", ")})`)}return`( ${t.join(", ")} )`}repr(){return`Gf.${this.constructor.name}(${this._m.join(", ")})`}}class Jr extends Po{dimension=3;_construct(e){if(e.length===1){const t=e[0];if(sf(t)){this.SetRotate(t);return}if(cc(t)){this.SetRotate(t);return}}this._constructCommon(e)}GetDeterminant(){const e=this._m;return e[0]*e[4]*e[8]+e[1]*e[5]*e[6]+e[2]*e[3]*e[7]-e[0]*e[5]*e[7]-e[1]*e[3]*e[8]-e[2]*e[4]*e[6]}GetInverse(e=0){const t=this._m,s=t[0],n=t[1],r=t[2],o=t[3],a=t[4],c=t[5],l=t[6],u=t[7],h=t[8],d=-(r*a*l)+n*c*l+r*o*u-s*c*u-n*o*h+s*a*h,f=this._new();if(Math.abs(d)>e){const p=1/d;f._m[0]=f._round((-(c*u)+a*h)*p),f._m[1]=f._round((r*u-n*h)*p),f._m[2]=f._round((-(r*a)+n*c)*p),f._m[3]=f._round((c*l-o*h)*p),f._m[4]=f._round((-(r*l)+s*h)*p),f._m[5]=f._round((r*o-s*c)*p),f._m[6]=f._round((-(a*l)+o*u)*p),f._m[7]=f._round((n*l-s*u)*p),f._m[8]=f._round((-(n*o)+s*a)*p)}else f.SetScale(mP);return f}SetScale(e){const t=this._m;if(typeof e=="number")t[0]=this._round(e),t[1]=0,t[2]=0,t[3]=0,t[4]=this._round(e),t[5]=0,t[6]=0,t[7]=0,t[8]=this._round(e);else{const s=e instanceof ce?e.data:e;t[0]=this._round(s[0]),t[1]=0,t[2]=0,t[3]=0,t[4]=this._round(s[1]),t[5]=0,t[6]=0,t[7]=0,t[8]=this._round(s[2])}return this}_setRotateFromQuat(e,t,s,n){const r=this._m;r[0]=this._round(1-2*(s*s+n*n)),r[1]=this._round(2*(t*s+n*e)),r[2]=this._round(2*(n*t-s*e)),r[3]=this._round(2*(t*s-n*e)),r[4]=this._round(1-2*(n*n+t*t)),r[5]=this._round(2*(s*n+t*e)),r[6]=this._round(2*(n*t+s*e)),r[7]=this._round(2*(s*n-t*e)),r[8]=this._round(1-2*(s*s+t*t))}SetRotate(e){const t=cc(e)?e:cf(e);return this._setRotateFromQuat(t[0],t[1],t[2],t[3]),this}ExtractRotation(){return lf(this._embed4())}ExtractRotationQuaternion(){return tr(this._embed4())}_embed4(){const e=this._m;return[e[0],e[1],e[2],0,e[3],e[4],e[5],0,e[6],e[7],e[8],0,0,0,0,1]}GetHandedness(){return tf(this.GetDeterminant())}IsRightHanded(){return this.GetHandedness()===1}IsLeftHanded(){return this.GetHandedness()===-1}Orthonormalize(){return nf(this._m,this._round.bind(this)),this}GetOrthonormalized(){const e=this._fromFlat(this._m);return e.Orthonormalize(),e}}class yP extends Jr{scalarKind="d";constructor(...e){super(),this._alloc(),this._construct(e)}}class _P extends Jr{scalarKind="f";constructor(...e){super(),this._alloc(),this._construct(e)}}class SP extends Po{dimension=4;_construct(e){if(e.length===2){const[t,s]=e;if(sf(t)||t instanceof Jr){this.SetTransform(t,s);return}}this._constructCommon(e)}GetDeterminant3(){return this._det3(0,1,2,0,1,2)}_det3(e,t,s,n,r,o){const a=(c,l)=>this._m[this._idx(c,l)];return a(e,n)*a(t,r)*a(s,o)+a(e,r)*a(t,o)*a(s,n)+a(e,o)*a(t,n)*a(s,r)-a(e,n)*a(t,o)*a(s,r)-a(e,r)*a(t,n)*a(s,o)-a(e,o)*a(t,r)*a(s,n)}GetDeterminant(){const e=(t,s)=>this._m[this._idx(t,s)];return-e(0,3)*this._det3(1,2,3,0,1,2)+e(1,3)*this._det3(0,2,3,0,1,2)-e(2,3)*this._det3(0,1,3,0,1,2)+e(3,3)*this._det3(0,1,2,0,1,2)}GetInverse(e=0){return this._fromFlat(as(this._m,e))}GetRow3(e){const t=this._wrap(e);return new mn[this.scalarKind](this._m[this._idx(t,0)],this._m[this._idx(t,1)],this._m[this._idx(t,2)])}SetRow3(e,t){const s=this._wrap(e),n=t instanceof ce?t.data:t;return this._m[this._idx(s,0)]=this._round(n[0]),this._m[this._idx(s,1)]=this._round(n[1]),this._m[this._idx(s,2)]=this._round(n[2]),this}SetScale(e){const t=this._m;if(t.fill(0),typeof e=="number")t[0]=this._round(e),t[5]=this._round(e),t[10]=this._round(e);else{const s=e instanceof ce?e.data:e;t[0]=this._round(s[0]),t[5]=this._round(s[1]),t[10]=this._round(s[2])}return t[15]=1,this}SetTranslate(e){const t=e instanceof ce?e.data:e;return this.SetIdentity(),this._m[12]=this._round(t[0]),this._m[13]=this._round(t[1]),this._m[14]=this._round(t[2]),this}SetTranslateOnly(e){const t=e instanceof ce?e.data:e;return this._m[12]=this._round(t[0]),this._m[13]=this._round(t[1]),this._m[14]=this._round(t[2]),this._m[15]=1,this}ExtractTranslation(){return new mn[this.scalarKind](this._m[12],this._m[13],this._m[14])}_setRotateFromQuat(e,t,s,n){const r=this._m;r[0]=this._round(1-2*(s*s+n*n)),r[1]=this._round(2*(t*s+n*e)),r[2]=this._round(2*(n*t-s*e)),r[4]=this._round(2*(t*s-n*e)),r[5]=this._round(1-2*(n*n+t*t)),r[6]=this._round(2*(s*n+t*e)),r[8]=this._round(2*(n*t+s*e)),r[9]=this._round(2*(s*n-t*e)),r[10]=this._round(1-2*(s*s+t*t))}SetRotateOnly(e){if(e instanceof Jr){const s=this._m;for(let n=0;n<3;n++)for(let r=0;r<3;r++)s[this._idx(n,r)]=this._round(e.GetElement(n,r));return this}const t=cc(e)?e:cf(e);return this._setRotateFromQuat(t[0],t[1],t[2],t[3]),this}SetRotate(e){this.SetRotateOnly(e);const t=this._m;return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}SetTransform(e,t){return this.SetRotate(e),this.SetTranslateOnly(t)}ExtractRotation(){return lf(this._m)}ExtractRotationQuat(){return tr(this._m)}ExtractRotationMatrix(){const e=this._m,t=this.scalarKind==="f"?_P:yP;return new t(e[0],e[1],e[2],e[4],e[5],e[6],e[8],e[9],e[10])}SetLookAt(e,t,s){const n=ta(e),r=ta(t),o=ta(s),a=CP(n,r,o);for(let c=0;c<16;c++)this._m[c]=this._round(a[c]);return this}GetHandedness(){return tf(this.GetDeterminant3())}IsRightHanded(){return this.GetHandedness()===1}IsLeftHanded(){return this.GetHandedness()===-1}Orthonormalize(){nf(this._m,this._round.bind(this),4);const e=this._m;return e[15]!==1&&Math.abs(e[15])>gP&&(e[12]=this._round(e[12]/e[15]),e[13]=this._round(e[13]/e[15]),e[14]=this._round(e[14]/e[15]),e[15]=1),this}GetOrthonormalized(){const e=this._fromFlat(this._m);return e.Orthonormalize(),e}Factor(e){const t=e??(this.scalarKind==="f"?1e-5:1e-10),s=EP(this._m,t);return{success:s.nonSingular,scaleOrientation:this._fromFlat(s.rotation),scale:new mn[this.scalarKind](s.scale[0],s.scale[1],s.scale[2]),rotation:this._fromFlat(s.shear),translation:new mn[this.scalarKind](s.translation[0],s.translation[1],s.translation[2]),projection:this._fromFlat(s.perspective)}}RemoveScaleShear(){const e=this.Factor();if(!e.success)return this._fromFlat(this._m);const t=e.rotation.Orthonormalize(),s=this._new().SetTranslate(e.translation);return t.GetMultiply(s)}Transform(e){const t=e.data,s=this._comp(t,0)+this._m[12],n=this._comp(t,1)+this._m[13],r=this._comp(t,2)+this._m[14],o=this._comp(t,3)+this._m[15];return this._mkVec3(e,s/o,n/o,r/o)}TransformDir(e){const t=e.data;return this._mkVec3(e,this._comp(t,0),this._comp(t,1),this._comp(t,2))}TransformAffine(e){const t=e.data;return this._mkVec3(e,this._comp(t,0)+this._m[12],this._comp(t,1)+this._m[13],this._comp(t,2)+this._m[14])}_comp(e,t){return e[0]*this._m[this._idx(0,t)]+e[1]*this._m[this._idx(1,t)]+e[2]*this._m[this._idx(2,t)]}_mkVec3(e,t,s,n){const r=this.scalarKind==="f"&&e.scalarKind==="f"?"f":"d";return new mn[r](t,s,n)}}class be extends SP{scalarKind="d";constructor(...e){super(),this._alloc(),this._construct(e)}}function nf(i,e,t=3){const s=(c,l)=>c*t+l,n=new k(i[s(0,0)],i[s(0,1)],i[s(0,2)]),r=new k(i[s(1,0)],i[s(1,1)],i[s(1,2)]),o=new k(i[s(2,0)],i[s(2,1)],i[s(2,2)]);k.OrthogonalizeBasis(n,r,o,!0);const a=[n,r,o];for(let c=0;c<3;c++)for(let l=0;l<3;l++)i[s(c,l)]=e(a[c].get(l))}function ta(i){const e=i instanceof ce?i.data:i;return[e[0],e[1],e[2]]}function lc(i){return i*(180/Math.PI)}function uc(i){return i*(Math.PI/180)}function Fh(i){return i instanceof ce?_e(i,i):i*i}const wo=1e-10,PP=1e-6,wP=i=>i*Math.PI/180,bP=i=>i/Math.PI*180,rf=(i,e,t)=>i<e?e:i>t?t:i,Ze=(i,e)=>i[0]*e[0]+i[1]*e[1]+i[2]*e[2],Gh=(i,e)=>[i[1]*e[2]-i[2]*e[1],i[2]*e[0]-i[0]*e[2],i[0]*e[1]-i[1]*e[0]],sa=(i,e)=>[i[0]+e[0],i[1]+e[1],i[2]+e[2]],Nt=(i,e)=>[i[0]-e[0],i[1]-e[1],i[2]-e[2]],qt=(i,e)=>[i[0]*e,i[1]*e,i[2]*e],of=i=>Ze(i,i),af=i=>Math.sqrt(of(i));function mt(i,e=wo){const t=af(i),s=t>e?t:e;return[i[0]/s,i[1]/s,i[2]/s]}const ia=(i,e,t)=>of(Nt(i,e))<=t*t,vP=i=>i[0],IP=i=>[i[1],i[2],i[3]];function AP(i,e=wo){const t=Math.sqrt(i[0]*i[0]+i[1]*i[1]+i[2]*i[2]+i[3]*i[3]);return t<e?[1,0,0,0]:[i[0]/t,i[1]/t,i[2]/t,i[3]/t]}function TP(i,e){let t=[i[0],i[1],i[2]];return Math.abs(Ze(t,t)-1)>1e-10&&(t=mt(t)),{axis:t,angle:e}}const hc=()=>({axis:[1,0,0],angle:0});function cf(i){const e=wP(i.angle)/2,t=Math.sin(e),s=Math.cos(e),n=qt(i.axis,t);return AP([s,n[0],n[1],n[2]])}function xP(i){const e=IP(i),t=af(e);if(t>wo){const s=Math.acos(rf(vP(i),-1,1));return TP([e[0]/t,e[1]/t,e[2]/t],2*bP(s))}return hc()}const na=i=>({axis:[i.axis[0],i.axis[1],i.axis[2]],angle:-i.angle}),DP=(i,e)=>i.axis[0]===e.axis[0]&&i.axis[1]===e.axis[1]&&i.axis[2]===e.axis[2]&&i.angle===e.angle,$h=i=>`Gf.Rotation(Gf.Vec3d(${i.axis[0]}, ${i.axis[1]}, ${i.axis[2]}), ${i.angle})`;function Lh(i){return[i[0],i[4],i[8],i[12],i[1],i[5],i[9],i[13],i[2],i[6],i[10],i[14],i[3],i[7],i[11],i[15]]}function kP(i){const e=(t,s)=>i[t*4+s];return e(0,0)*e(1,1)*e(2,2)+e(0,1)*e(1,2)*e(2,0)+e(0,2)*e(1,0)*e(2,1)-e(0,0)*e(1,2)*e(2,1)-e(0,1)*e(1,0)*e(2,2)-e(0,2)*e(1,1)*e(2,0)}function tr(i){const e=(r,o)=>i[r*4+o];let t;e(0,0)>e(1,1)?t=e(0,0)>e(2,2)?0:2:t=e(1,1)>e(2,2)?1:2;const s=[0,0,0];let n;if(e(0,0)+e(1,1)+e(2,2)>e(t,t))n=.5*Math.sqrt(e(0,0)+e(1,1)+e(2,2)+e(3,3)),s[0]=(e(1,2)-e(2,1))/(4*n),s[1]=(e(2,0)-e(0,2))/(4*n),s[2]=(e(0,1)-e(1,0))/(4*n);else{const r=(t+1)%3,o=(t+2)%3,a=.5*Math.sqrt(e(t,t)-e(r,r)-e(o,o)+e(3,3));s[t]=a,s[r]=(e(t,r)+e(r,t))/(4*a),s[o]=(e(o,t)+e(t,o))/(4*a),n=(e(r,o)-e(o,r))/(4*a)}return[rf(n,-1,1),s[0],s[1],s[2]]}const lf=i=>xP(tr(i));function CP(i,e,t){const s=mt(Nt(e,i)),n=mt(Gh(s,t)),r=Gh(n,s);return[n[0],r[0],-s[0],0,n[1],r[1],-s[1],0,n[2],r[2],-s[2],0,-Ze(n,i),-Ze(r,i),Ze(s,i),1]}function NP(i,e,t,s,n=PP){let r=[...i],o=[...e],a=[...t];r=mt(r),o=mt(o),a=mt(a);let c=mt(r),l=mt(o),u=mt(a);if(ia(c,l,n)||ia(c,u,n)||ia(l,u,n))return{tx:r,ty:o,tz:a,converged:!1};const h=20;let d=0;for(;d<h;++d){let f=[...r],p=[...o],y=[...a];f=Nt(f,qt(l,Ze(l,f))),f=Nt(f,qt(u,Ze(u,f))),p=Nt(p,qt(c,Ze(c,p))),p=Nt(p,qt(u,Ze(u,p))),y=Nt(y,qt(c,Ze(c,y))),y=Nt(y,qt(l,Ze(l,y)));let m=qt(sa(r,f),.5),g=qt(sa(o,p),.5),S=qt(sa(a,y),.5);m=mt(m),g=mt(g),S=mt(S);const _=Nt(r,m),P=Nt(o,g),w=Nt(a,S);if(Ze(_,_)+Ze(P,P)+Ze(w,w)<n*n)break;r=m,o=g,a=S,c=r,l=o,u=a}return{tx:r,ty:o,tz:a,converged:d<h}}function uf(i){const e=[i[0],i[1],i[2]],t=[i[4],i[5],i[6]],s=[i[8],i[9],i[10]],{tx:n,ty:r,tz:o}=NP(e,t,s),a=[n[0],n[1],n[2],i[3],r[0],r[1],r[2],i[7],o[0],o[1],o[2],i[11],i[12],i[13],i[14],i[15]];return a[15]!==1&&Math.abs(a[15])>wo&&(a[12]/=a[15],a[13]/=a[15],a[14]/=a[15],a[15]=1),a}function MP(i){const e=[i[0],i[1],i[2],i[4],i[5],i[6],i[8],i[9],i[10]],t=[e[0],e[4],e[8]],s=[[1,0,0],[0,1,0],[0,0,1]],n=[t[0],t[1],t[2]],r=[0,0,0],o=(c,l)=>e[c*3+l],a=(c,l,u)=>{e[c*3+l]=u};for(let c=0;c<50;c++){let l=0;for(let h=0;h<2;h++)for(let d=h+1;d<3;d++)l+=Math.abs(o(h,d));if(l===0)break;const u=c<3?.2*l/(3*3):0;for(let h=0;h<3;h++)for(let d=h+1;d<3;d++){const f=100*Math.abs(o(h,d));if(c>3&&Math.abs(t[h])+f===Math.abs(t[h])&&Math.abs(t[d])+f===Math.abs(t[d]))a(h,d,0);else if(Math.abs(o(h,d))>u){let p=t[d]-t[h],y;if(Math.abs(p)+f===Math.abs(p))y=o(h,d)/p;else{const _=.5*p/o(h,d);y=1/(Math.abs(_)+Math.sqrt(1+_*_)),_<0&&(y=-y)}const m=1/Math.sqrt(1+y*y),g=y*m,S=g/(1+m);p=y*o(h,d),r[h]-=p,r[d]+=p,t[h]-=p,t[d]+=p,a(h,d,0);for(let _=0;_<h;_++){const P=o(_,h),w=o(_,d);a(_,h,P-g*(w+P*S)),a(_,d,w+g*(P-w*S))}for(let _=h+1;_<d;_++){const P=o(h,_),w=o(_,d);a(h,_,P-g*(w+P*S)),a(_,d,w+g*(P-w*S))}for(let _=d+1;_<3;_++){const P=o(h,_),w=o(d,_);a(h,_,P-g*(w+P*S)),a(d,_,w+g*(P-w*S))}for(let _=0;_<3;_++){const P=s[_][h],w=s[_][d];s[_][h]=P-g*(w+P*S),s[_][d]=w+g*(P-w*S)}}}for(let h=0;h<3;h++)n[h]+=r[h],t[h]=n[h],r[h]=0}return{eigenvalues:t,eigenvectors:s}}function EP(i,e=1e-10){const t=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],s=[i[0],i[1],i[2],0,i[4],i[5],i[6],0,i[8],i[9],i[10],0,0,0,0,1],n=[i[12],i[13],i[14]],r=kP(s),o=r<0?-1:1,a=!(r*o<e),c=V(s,Lh(s)),{eigenvalues:l,eigenvectors:u}=MP(c),h=[u[0][0],u[0][1],u[0][2],0,u[1][0],u[1][1],u[1][2],0,u[2][0],u[2][1],u[2][2],0,0,0,0,1],d=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],f=[0,0,0];for(let y=0;y<3;y++)f[y]=l[y]<e?o*e:o*Math.sqrt(l[y]),d[y*4+y]=1/f[y];const p=V(V(V(h,d),Lh(h)),s);return{rotation:h,scale:f,shear:p,translation:n,perspective:t,nonSingular:a}}function BP(i){const h=1/(i[0]*(i[4]*i[8]-i[7]*i[5])-i[3]*(i[1]*i[8]-i[7]*i[2])+i[6]*(i[1]*i[5]-i[4]*i[2])),d=new Array(9);return d[0]=(i[4]*i[8]-i[7]*i[5])*h,d[3]=(i[6]*i[5]-i[3]*i[8])*h,d[6]=(i[3]*i[7]-i[6]*i[4])*h,d[1]=(i[7]*i[2]-i[1]*i[8])*h,d[4]=(i[0]*i[8]-i[6]*i[2])*h,d[7]=(i[6]*i[1]-i[0]*i[7])*h,d[2]=(i[1]*i[5]-i[4]*i[2])*h,d[5]=(i[3]*i[2]-i[0]*i[5])*h,d[8]=(i[0]*i[4]-i[3]*i[1])*h,d}function OP(i){if(i.rgbToXYZ[8]!==0)return;const e=i.linearBias,t=i.gamma;if(t===1?(i.K0=1e9,i.phi=1):e<=0?(i.K0=0,i.phi=1):(i.K0=e/(t-1),i.phi=e/Math.exp(Math.log(t*e/(t+t*e-1-e))*t)/(t-1)),i.whitePoint.x===0)return;const s=[i.redPrimary.x,i.redPrimary.y,1-i.redPrimary.x-i.redPrimary.y],n=[i.greenPrimary.x,i.greenPrimary.y,1-i.greenPrimary.x-i.greenPrimary.y],r=[i.bluePrimary.x,i.bluePrimary.y,1-i.bluePrimary.x-i.bluePrimary.y],o=[i.whitePoint.x,i.whitePoint.y,1-i.whitePoint.x-i.whitePoint.y],a=new Array(9);a[0]=s[0],a[1]=n[0],a[2]=r[0],a[3]=s[1],a[4]=n[1],a[5]=r[1],a[6]=s[2],a[7]=n[2],a[8]=r[2];const c=[o[0]/o[1],o[1]/o[1],o[2]/o[1]],l=BP(a),u=[l[0]*c[0]+l[1]*c[1]+l[2]*c[2],l[3]*c[0]+l[4]*c[1]+l[5]*c[2],l[6]*c[0]+l[7]*c[1]+l[8]*c[2]];a[0]*=u[0],a[1]*=u[1],a[2]*=u[2],a[3]*=u[0],a[4]*=u[1],a[5]*=u[2],a[6]*=u[0],a[7]*=u[1],a[8]*=u[2],i.rgbToXYZ=a}const qe={x:.3127,y:.329},RP=[{descriptiveName:"ACEScg",shortName:"lin_ap1_scene",redPrimary:{x:.71319588766205,y:.29268891446333},greenPrimary:{x:.15950855654178,y:.83878851615096},bluePrimary:{x:.12867299528535,y:.043895571160528},whitePoint:qe,gamma:1,linearBias:0},{descriptiveName:"ACES2065-1",shortName:"lin_ap0_scene",redPrimary:{x:.73485524337371,y:.26422532524554},greenPrimary:{x:-.0061709124786224,y:1.0113149590212864},bluePrimary:{x:.015967559255041,y:-.064235503128551},whitePoint:qe,gamma:1,linearBias:0},{descriptiveName:"Linear Rec.709 (sRGB)",shortName:"lin_rec709_scene",redPrimary:{x:.64,y:.33},greenPrimary:{x:.3,y:.6},bluePrimary:{x:.15,y:.06},whitePoint:qe,gamma:1,linearBias:0},{descriptiveName:"Linear P3-D65",shortName:"lin_p3d65_scene",redPrimary:{x:.68,y:.32},greenPrimary:{x:.265,y:.69},bluePrimary:{x:.15,y:.06},whitePoint:qe,gamma:1,linearBias:0},{descriptiveName:"Linear Rec.2020",shortName:"lin_rec2020_scene",redPrimary:{x:.708,y:.292},greenPrimary:{x:.17,y:.797},bluePrimary:{x:.131,y:.046},whitePoint:qe,gamma:1,linearBias:0},{descriptiveName:"Linear AdobeRGB",shortName:"lin_adobergb_scene",redPrimary:{x:.64,y:.33},greenPrimary:{x:.21,y:.71},bluePrimary:{x:.15,y:.06},whitePoint:qe,gamma:1,linearBias:0},{descriptiveName:"CIE XYZ-D65 - Scene-referred",shortName:"lin_ciexyzd65_scene",redPrimary:{x:1,y:0},greenPrimary:{x:0,y:1},bluePrimary:{x:0,y:0},whitePoint:qe,gamma:1,linearBias:0},{descriptiveName:"sRGB Encoded Rec.709 (sRGB)",shortName:"srgb_rec709_scene",redPrimary:{x:.64,y:.33},greenPrimary:{x:.3,y:.6},bluePrimary:{x:.15,y:.06},whitePoint:qe,gamma:2.4,linearBias:.055},{descriptiveName:"Gamma 2.2 Encoded Rec.709",shortName:"g22_rec709_scene",redPrimary:{x:.64,y:.33},greenPrimary:{x:.3,y:.6},bluePrimary:{x:.15,y:.06},whitePoint:qe,gamma:2.2,linearBias:0},{descriptiveName:"Gamma 1.8 Encoded Rec.709",shortName:"g18_rec709_scene",redPrimary:{x:.64,y:.33},greenPrimary:{x:.3,y:.6},bluePrimary:{x:.15,y:.06},whitePoint:qe,gamma:1.8,linearBias:0},{descriptiveName:"sRGB Encoded AP1",shortName:"srgb_ap1_scene",redPrimary:{x:.71319588766205,y:.29268891446333},greenPrimary:{x:.15950855654178,y:.83878851615096},bluePrimary:{x:.12867299528535,y:.043895571160528},whitePoint:qe,gamma:2.4,linearBias:.055},{descriptiveName:"Gamma 2.2 Encoded AP1",shortName:"g22_ap1_scene",redPrimary:{x:.71319588766205,y:.29268891446333},greenPrimary:{x:.15950855654178,y:.83878851615096},bluePrimary:{x:.12867299528535,y:.043895571160528},whitePoint:qe,gamma:2.2,linearBias:0},{descriptiveName:"sRGB Encoded P3-D65",shortName:"srgb_p3d65_scene",redPrimary:{x:.68,y:.32},greenPrimary:{x:.265,y:.69},bluePrimary:{x:.15,y:.06},whitePoint:qe,gamma:2.4,linearBias:.055},{descriptiveName:"Gamma 2.2 Encoded AdobeRGB",shortName:"g22_adobergb_scene",redPrimary:{x:.64,y:.33},greenPrimary:{x:.21,y:.71},bluePrimary:{x:.15,y:.06},whitePoint:qe,gamma:2.2,linearBias:0},{descriptiveName:"Data",shortName:"data",redPrimary:{x:1,y:0},greenPrimary:{x:0,y:1},bluePrimary:{x:0,y:0},whitePoint:{x:1/3,y:1/3},gamma:1,linearBias:0,identityMatrix:!0},{descriptiveName:"Identity",shortName:"identity",redPrimary:{x:1,y:0},greenPrimary:{x:0,y:1},bluePrimary:{x:0,y:0},whitePoint:{x:1/3,y:1/3},gamma:1,linearBias:0,identityMatrix:!0},{descriptiveName:"Raw",shortName:"raw",redPrimary:{x:1,y:0},greenPrimary:{x:0,y:1},bluePrimary:{x:0,y:0},whitePoint:{x:1/3,y:1/3},gamma:1,linearBias:0,identityMatrix:!0},{descriptiveName:"Unknown",shortName:"unknown",redPrimary:{x:1,y:0},greenPrimary:{x:0,y:1},bluePrimary:{x:0,y:0},whitePoint:{x:1/3,y:1/3},gamma:1,linearBias:0,identityMatrix:!0}];function FP(i){const e={descriptiveName:i.descriptiveName,shortName:i.shortName,redPrimary:{...i.redPrimary},greenPrimary:{...i.greenPrimary},bluePrimary:{...i.bluePrimary},whitePoint:{...i.whitePoint},gamma:i.gamma,linearBias:i.linearBias,K0:0,phi:0,rgbToXYZ:i.identityMatrix?[1,0,0,0,1,0,0,0,1]:[0,0,0,0,0,0,0,0,0]};return OP(e),e}const ra=new Map;for(const i of RP){const e=FP(i);ra.set(i.shortName,e),ra.has(i.descriptiveName)||ra.set(i.descriptiveName,e)}um({LinearAP1:"lin_ap1_scene",LinearAP0:"lin_ap0_scene",LinearRec709:"lin_rec709_scene",LinearP3D65:"lin_p3d65_scene",LinearRec2020:"lin_rec2020_scene",LinearAdobeRGB:"lin_adobergb_scene",LinearCIEXYZD65:"lin_ciexyzd65_scene",SRGBRec709:"srgb_rec709_scene",G22Rec709:"g22_rec709_scene",G18Rec709:"g18_rec709_scene",SRGBAP1:"srgb_ap1_scene",G22AP1:"g22_ap1_scene",SRGBP3D65:"srgb_p3d65_scene",G22AdobeRGB:"g22_adobergb_scene",Identity:"identity",Data:"data",Raw:"raw",Unknown:"unknown",CIEXYZ:"lin_ciexyzd65_scene",LinearDisplayP3:"lin_p3d65_scene"});class nn{_real;_imaginary;constructor(e,t){this._real=e,this._imaginary=t}GetReal(){return this._real}SetReal(e){this._real=this._round(e)}GetImaginary(){return this._imaginary}SetImaginary(e){const t=e instanceof ce?e.data:e;this._imaginary=this._makeVec(t[0],t[1],t[2])}_GetLengthSquared(){return this._round(this._real*this._real+this._imaginary.Dot(this._imaginary))}GetLength(){return this._round(Math.sqrt(this._GetLengthSquared()))}GetNormalized(e=Pi){const t=this._create(this._real,this._cloneVec());return t.Normalize(e),t}Normalize(e=Pi){const t=this.GetLength();return t<e?(this._real=this._round(1),this._imaginary=this._makeVec(0,0,0)):this.DivideInPlace(t),t}GetInverse(){const e=this._GetLengthSquared();return this._create(this._real,this._imaginary.GetNegated()).GetDivided(e)}equals(e){return this._real===e._real&&this._imaginary.equals(e._imaginary)}MultiplyInPlace(e){const t=this._real,s=e._real,n=this._imaginary,r=e._imaginary,o=t*s-n.Dot(r),a=n.data,c=r.data,l=this._makeVec(t*c[0]+s*a[0]+(a[1]*c[2]-a[2]*c[1]),t*c[1]+s*a[1]+(a[2]*c[0]-a[0]*c[2]),t*c[2]+s*a[2]+(a[0]*c[1]-a[1]*c[0]));return this._real=this._round(o),this._imaginary=l,this}GetMultiply(e){return this._create(this._real,this._cloneVec()).MultiplyInPlace(e)}ScaleInPlace(e){return this._real=this._round(this._real*e),this._imaginary=this._makeVec(this._imaginary.get(0)*e,this._imaginary.get(1)*e,this._imaginary.get(2)*e),this}GetScaled(e){return this._create(this._real,this._cloneVec()).ScaleInPlace(e)}DivideInPlace(e){return this._real=this._round(this._real/e),this._imaginary=this._makeVec(this._imaginary.get(0)/e,this._imaginary.get(1)/e,this._imaginary.get(2)/e),this}GetDivided(e){return this._create(this._real,this._cloneVec()).DivideInPlace(e)}AddInPlace(e){return this._real=this._round(this._real+e._real),this._imaginary=this._makeVec(this._imaginary.get(0)+e._imaginary.get(0),this._imaginary.get(1)+e._imaginary.get(1),this._imaginary.get(2)+e._imaginary.get(2)),this}Add(e){return this._create(this._real,this._cloneVec()).AddInPlace(e)}SubtractInPlace(e){return this._real=this._round(this._real-e._real),this._imaginary=this._makeVec(this._imaginary.get(0)-e._imaginary.get(0),this._imaginary.get(1)-e._imaginary.get(1),this._imaginary.get(2)-e._imaginary.get(2)),this}Subtract(e){return this._create(this._real,this._cloneVec()).SubtractInPlace(e)}toString(){return`(${this._real} + ${this._imaginary.toString()})`}hash(){return`${this.constructor.name}:${this._real};${this._imaginary.data.join(",")}`}_cloneVec(){const e=this._imaginary.data;return this._makeVec(e[0],e[1],e[2])}}class Fn extends nn{constructor(e,t){if(e===void 0){super(0,new k(0,0,0));return}if(e instanceof nn){super(e.GetReal(),new k(e.GetImaginary()));return}if(t===void 0){super(e,new k(0,0,0));return}const s=t instanceof ce?t.data:t;super(e,new k(s[0],s[1],s[2]))}_round(e){return e}_makeVec(e,t,s){return new k(e,t,s)}_create(e,t){const s=new Fn;return s._real=e,s._imaginary=t,s}GetImaginary(){return this._imaginary}static GetZero(){return new Fn(0,new k(0,0,0))}static GetIdentity(){return new Fn(1,new k(0,0,0))}}class Fc extends nn{GetConjugate(){return this._create(this._real,this._imaginary.GetNegated())}GetNegated(){return this._create(-this._real,this._imaginary.GetNegated())}Transform(e){const t=this._imaginary.Dot(this._imaginary),s=this._real*this._real,n=this._imaginary,r=n.Dot(e),o=n.data,a=e.data,c=this._makeVec(o[1]*a[2]-o[2]*a[1],o[2]*a[0]-o[0]*a[2],o[0]*a[1]-o[1]*a[0]),l=s+t,u=c.data;return this._makeVec((2*r*o[0]+(s-t)*a[0]+2*this._real*u[0])/l,(2*r*o[1]+(s-t)*a[1]+2*this._real*u[1])/l,(2*r*o[2]+(s-t)*a[2]+2*this._real*u[2])/l)}toString(){const e=this._imaginary.data;return`(${this._real}, ${e[0]}, ${e[1]}, ${e[2]})`}}class Ne extends Fc{constructor(e,t,s,n){if(e===void 0){super(0,new k(0,0,0));return}if(e instanceof nn){super(e.GetReal(),new k(e.GetImaginary()));return}if(t===void 0){super(e,new k(0,0,0));return}if(typeof t=="number"){super(e,new k(t,s,n));return}const r=t instanceof ce?t.data:t;super(e,new k(r[0],r[1],r[2]))}_round(e){return e}_makeVec(e,t,s){return new k(e,t,s)}_create(e,t){const s=new Ne;return s._real=e,s._imaginary=t,s}GetImaginary(){return this._imaginary}static GetZero(){return new Ne(0)}static GetIdentity(){return new Ne(1)}}class Gn extends Fc{constructor(e,t,s,n){if(e===void 0){super(0,new Jt(0,0,0));return}if(e instanceof nn){super(Math.fround(e.GetReal()),new Jt(e.GetImaginary()));return}if(t===void 0){super(Math.fround(e),new Jt(0,0,0));return}if(typeof t=="number"){super(Math.fround(e),new Jt(t,s,n));return}const r=t instanceof ce?t.data:t;super(Math.fround(e),new Jt(r[0],r[1],r[2]))}_round(e){return Math.fround(e)}_makeVec(e,t,s){return new Jt(e,t,s)}_create(e,t){const s=new Gn;return s._real=Math.fround(e),s._imaginary=t,s}GetImaginary(){return this._imaginary}static GetZero(){return new Gn(0)}static GetIdentity(){return new Gn(1)}}class $n extends Fc{constructor(e,t,s,n){if(e===void 0){super(0,new Cs(0,0,0));return}if(e instanceof nn){super(Es(e.GetReal()),new Cs(e.GetImaginary()));return}if(t===void 0){super(Es(e),new Cs(0,0,0));return}if(typeof t=="number"){super(Es(e),new Cs(t,s,n));return}const r=t instanceof ce?t.data:t;super(Es(e),new Cs(r[0],r[1],r[2]))}_round(e){return Es(e)}_makeVec(e,t,s){return new Cs(e,t,s)}_create(e,t){const s=new $n;return s._real=Es(e),s._imaginary=new Cs(t),s}GetImaginary(){return this._imaginary}static GetZero(){return new $n(0)}static GetIdentity(){return new $n(1)}}function Gi(i,e){return i.GetImaginary().Dot(e.GetImaginary())+i.GetReal()*e.GetReal()}function Vh(i){return i instanceof Ne||i instanceof Gn||i instanceof $n||i instanceof Fn}function GP(i){return i instanceof k||i instanceof Jt||i instanceof Cs?i.data:i}class Gc{_real;_dual;constructor(e,t){if(e===void 0){this._real=this._zeroQuat(),this._dual=this._zeroQuat();return}if(e instanceof Gc){this._real=this._convertQuat(e.GetReal()),this._dual=this._convertQuat(e.GetDual());return}if(Vh(e)){if(this._real=this._convertQuat(e),t===void 0){this._dual=this._zeroQuat();return}if(Vh(t)){this._dual=this._convertQuat(t);return}this._dual=this._zeroQuat(),this.SetTranslation(t);return}this._real=this._quatFromReal(e),this._dual=this._zeroQuat()}GetReal(){return this._real}GetDual(){return this._dual}SetReal(e){this._real=this._convertQuat(e)}SetDual(e){this._dual=this._convertQuat(e)}SetTranslation(e){const t=GP(e),s=this._makeVec3(.5*t[0],.5*t[1],.5*t[2]),n=this._quatFromParts(0,s);this._dual=n.GetMultiply(this._real)}GetTranslation(){const e=this._dual.GetReal(),t=this._real.GetReal(),s=this._dual.GetImaginary().data,n=this._real.GetImaginary().data;return this._makeVec3(-2*(e*n[0]-t*s[0]+(s[1]*n[2]-s[2]*n[1])),-2*(e*n[1]-t*s[1]+(s[2]*n[0]-s[0]*n[2])),-2*(e*n[2]-t*s[2]+(s[0]*n[1]-s[1]*n[0])))}GetLength(){const e=this._real.GetLength();return e===0?[0,0]:[e,Gi(this._real,this._dual)/e]}GetNormalized(e=Pi){const t=this._create(this._convertQuat(this._real),this._convertQuat(this._dual));return t.Normalize(e),t}Normalize(e=Pi){const t=this.GetLength(),s=t[0];if(s<e)this._real=this._identityQuat(),this._dual=this._zeroQuat();else{const n=1/s;this._real=this._real.GetScaled(n),this._dual=this._dual.GetScaled(n);const r=Gi(this._real,this._dual);this._dual=this._dual.Subtract(this._real.GetScaled(r))}return t}GetConjugate(){return this._create(this._real.GetConjugate(),this._dual.GetConjugate())}GetInverse(){const e=Gi(this._real,this._real);if(e<=0)return this._create(this._identityQuat(),this._zeroQuat());const t=1/e,s=this.GetConjugate().GetScaled(t),n=s.GetReal(),r=s.GetDual().Subtract(s.GetReal().GetScaled(2*t*Gi(this._real,this._dual)));return this._create(n,r)}equals(e){return this._real.equals(e._real)&&this._dual.equals(e._dual)}GetMultiply(e){const t=this._real.GetMultiply(e._real),s=this._real.GetMultiply(e._dual).Add(this._dual.GetMultiply(e._real));return this._create(t,s)}GetScaled(e){return this._create(this._real.GetScaled(e),this._dual.GetScaled(e))}GetDivided(e){return this.GetScaled(1/e)}Add(e){return this._create(this._real.Add(e._real),this._dual.Add(e._dual))}Subtract(e){return this._create(this._real.Subtract(e._real),this._dual.Subtract(e._dual))}Transform(e){const t=e instanceof k||e instanceof Jt?e:this._makeVec3(e[0],e[1],e[2]),s=this._real.Transform(t).data,n=this.GetTranslation().data;return this._makeVec3(s[0]+n[0],s[1]+n[1],s[2]+n[2])}toString(){return`(${this._real.toString()}, ${this._dual.toString()})`}hash(){return`${this.constructor.name}:${this._real.hash()};${this._dual.hash()}`}}class qi extends Gc{constructor(e,t){super(e,t)}_quatFromReal(e){return new Ne(e)}_quatFromParts(e,t){return new Ne(e,t)}_convertQuat(e){return new Ne(e)}_zeroQuat(){return Ne.GetZero()}_identityQuat(){return Ne.GetIdentity()}_makeVec3(e,t,s){return new k(e,t,s)}_create(e,t){return new qi(e,t)}GetReal(){return this._real}GetDual(){return this._dual}GetTranslation(){return super.GetTranslation()}Transform(e){return super.Transform(e)}static GetZero(){return new qi(Ne.GetZero(),Ne.GetZero())}static GetIdentity(){return new qi(Ne.GetIdentity(),Ne.GetZero())}}const eo=34028234663852886e22;function to(i){return i*i}class Hi{static dimension=1;dimension=1;_min=0;_max=0;_make(e,t){return new this.constructor(e,t)}_initFromArgs(e){if(e.length===0){this.SetEmpty();return}if(e.length===1){const t=e[0];if(t instanceof Hi){this._min=this._round(t.GetMin()),this._max=this._round(t.GetMax());return}throw new TypeError("GfRange1: single-argument ctor expects another range")}this._min=this._round(e[0]),this._max=this._round(e[1])}SetEmpty(){this._min=eo,this._max=-eo}GetMin(){return this._min}GetMax(){return this._max}SetMin(e){this._min=this._round(e)}SetMax(e){this._max=this._round(e)}GetSize(){return this._max-this._min}GetMidpoint(){return .5*this._min+.5*this._max}IsEmpty(){return this._min>this._max}ExtendBy(e){return this.UnionWith(e)}Contains(e){return e instanceof Hi?this.Contains(e._min)&&this.Contains(e._max):e>=this._min&&e<=this._max}IsOutside(e){return e._max<this._min||e._min>this._max}static GetUnion(e,t){return e._make(Math.min(e._min,t._min),Math.max(e._max,t._max))}UnionWith(e){if(e instanceof Hi)e._min<this._min&&(this._min=e._min),e._max>this._max&&(this._max=e._max);else{const t=this._round(e);t<this._min&&(this._min=t),t>this._max&&(this._max=t)}return this}static GetIntersection(e,t){return e._make(Math.max(e._min,t._min),Math.min(e._max,t._max))}IntersectWith(e){return e._min>this._min&&(this._min=e._min),e._max<this._max&&(this._max=e._max),this}GetDistanceSquared(e){let t=0;return e<this._min?t+=to(this._min-e):e>this._max&&(t+=to(e-this._max)),t}GetSum(e){return this._make(this._min+e._min,this._max+e._max)}GetDifference(e){return this._make(this._min-e._max,this._max-e._min)}GetMultiplied(e){return e>0?this._make(this._min*e,this._max*e):this._make(this._max*e,this._min*e)}GetDivided(e){return this.GetMultiplied(1/e)}AddInPlace(e){return this._min=this._round(this._min+e._min),this._max=this._round(this._max+e._max),this}SubtractInPlace(e){return this._min=this._round(this._min-e._max),this._max=this._round(this._max-e._min),this}MultiplyInPlace(e){if(e>0)this._min=this._round(this._min*e),this._max=this._round(this._max*e);else{const t=this._min;this._min=this._round(this._max*e),this._max=this._round(t*e)}return this}DivideInPlace(e){return this.MultiplyInPlace(1/e)}equals(e){return this._min===this._round(e.GetMin())&&this._max===this._round(e.GetMax())}hash(){return`${this._min};${this._max}`}toString(){return`[${this._min}...${this._max}]`}repr(){return`Gf.${this.constructor.name}(${this._min}, ${this._max})`}}class Ni extends Hi{constructor(...e){super(),this._initFromArgs(e)}_round(e){return e}}class oi extends Hi{constructor(...e){super(),this._initFromArgs(e)}_round(e){return Math.fround(e)}}class Ki{_min;_max;get dimension(){return this._min.dimension}_vec(e){return new this._VecCtor(e)}_make(e,t){return new this.constructor(e,t)}_initFromArgs(e){if(e.length===0){this.SetEmpty();return}if(e.length===1){const t=e[0];if(t instanceof Ki){this._min=this._vec(t.GetMin()),this._max=this._vec(t.GetMax());return}throw new TypeError("GfRange: single-argument ctor expects another range")}this._min=this._vec(e[0]),this._max=this._vec(e[1])}_componentwise(e,t,s){const n=e.data,r=t.data;return this._vec(n.map((o,a)=>s(o,r[a])))}SetEmpty(){this._min=new this._VecCtor(eo),this._max=new this._VecCtor(-eo)}GetMin(){return this._min}GetMax(){return this._max}SetMin(e){this._min=this._vec(e)}SetMax(e){this._max=this._vec(e)}GetSize(){return this._max.Subtract(this._min)}GetMidpoint(){return this._min.GetScaled(.5).Add(this._max.GetScaled(.5))}IsEmpty(){const e=this._min.data,t=this._max.data;for(let s=0;s<e.length;s++)if(e[s]>t[s])return!0;return!1}ExtendBy(e){return this.UnionWith(e)}Contains(e){if(e instanceof Ki)return this.Contains(e._min)&&this.Contains(e._max);const t=e.data,s=this._min.data,n=this._max.data;for(let r=0;r<t.length;r++)if(!(t[r]>=s[r]&&t[r]<=n[r]))return!1;return!0}IsOutside(e){const t=e._min.data,s=e._max.data,n=this._min.data,r=this._max.data;for(let o=0;o<n.length;o++)if(s[o]<n[o]||t[o]>r[o])return!0;return!1}static GetUnion(e,t){const s=e._componentwise(e._min,t._min,Math.min),n=e._componentwise(e._max,t._max,Math.max);return e._make(s,n)}UnionWith(e){return e instanceof Ki?(this._min=this._componentwise(this._min,e._min,Math.min),this._max=this._componentwise(this._max,e._max,Math.max)):(this._min=this._componentwise(this._min,e,Math.min),this._max=this._componentwise(this._max,e,Math.max)),this}static GetIntersection(e,t){const s=e._componentwise(e._min,t._min,Math.max),n=e._componentwise(e._max,t._max,Math.min);return e._make(s,n)}IntersectWith(e){return this._min=this._componentwise(this._min,e._min,Math.max),this._max=this._componentwise(this._max,e._max,Math.min),this}GetDistanceSquared(e){let t=0;const s=e.data,n=this._min.data,r=this._max.data;for(let o=0;o<s.length;o++)s[o]<n[o]?t+=to(n[o]-s[o]):s[o]>r[o]&&(t+=to(s[o]-r[o]));return t}GetSum(e){return this._make(this._min.Add(e._min),this._max.Add(e._max))}GetDifference(e){return this._make(this._min.Subtract(e._max),this._max.Subtract(e._min))}GetMultiplied(e){return e>0?this._make(this._min.GetScaled(e),this._max.GetScaled(e)):this._make(this._max.GetScaled(e),this._min.GetScaled(e))}GetDivided(e){return this.GetMultiplied(1/e)}AddInPlace(e){return this._min=this._min.Add(e._min),this._max=this._max.Add(e._max),this}SubtractInPlace(e){return this._min=this._min.Subtract(e._max),this._max=this._max.Subtract(e._min),this}MultiplyInPlace(e){if(e>0)this._min=this._min.GetScaled(e),this._max=this._max.GetScaled(e);else{const t=this._min;this._min=this._max.GetScaled(e),this._max=t.GetScaled(e)}return this}DivideInPlace(e){return this.MultiplyInPlace(1/e)}equals(e){return this._min.equals(this._vec(e.GetMin()))&&this._max.equals(this._vec(e.GetMax()))}hash(){return`${this._min.data.join(",")};${this._max.data.join(",")}`}toString(){return`[${this._min.toString()}...${this._max.toString()}]`}repr(){return`Gf.${this.constructor.name}(${this._min.repr()}, ${this._max.repr()})`}}class $P extends Ki{GetCorner(e){if(e<0||e>3)throw new Error(`Invalid corner ${e} > 3.`);const t=this._min.data,s=this._max.data;return this._vec([(e&1?s:t)[0],(e&2?s:t)[1]])}GetQuadrant(e){if(e<0||e>3)throw new Error(`Invalid quadrant ${e} > 3.`);const t=this.GetCorner(e).data,s=this._min.Add(this._max).GetScaled(.5).data;return this._make(this._vec([Math.min(t[0],s[0]),Math.min(t[1],s[1])]),this._vec([Math.max(t[0],s[0]),Math.max(t[1],s[1])]))}}class Ot extends $P{constructor(...e){super(),this._initFromArgs(e)}get _VecCtor(){return ee}static get unitSquare(){return new Ot(new ee(0,0),new ee(1,1))}}class LP extends Ki{GetCorner(e){if(e<0||e>7)throw new Error(`Invalid corner ${e} > 7.`);const t=this._min.data,s=this._max.data;return this._vec([(e&1?s:t)[0],(e&2?s:t)[1],(e&4?s:t)[2]])}GetOctant(e){if(e<0||e>7)throw new Error(`Invalid octant ${e} > 7.`);const t=this.GetCorner(e).data,s=this._min.Add(this._max).GetScaled(.5).data;return this._make(this._vec([Math.min(t[0],s[0]),Math.min(t[1],s[1]),Math.min(t[2],s[2])]),this._vec([Math.max(t[0],s[0]),Math.max(t[1],s[1]),Math.max(t[2],s[2])]))}}class ct extends LP{constructor(...e){super(),this._initFromArgs(e)}get _VecCtor(){return k}static get unitCube(){return new ct(new k(0,0,0),new k(1,1,1))}}const Uh=1e-13;class ot{_box;_matrix;_inverse;_isDegenerate;_hasZeroAreaPrimitives;constructor(e,t){if(this._box=new ct,this._matrix=new be,this._inverse=new be,this._isDegenerate=!1,this._hasZeroAreaPrimitives=!1,e===void 0){this._matrix.SetIdentity(),this._inverse.SetIdentity();return}if(e instanceof ot){this._box=new ct(e._box),this._matrix=new be(e._matrix),this._inverse=new be(e._inverse),this._isDegenerate=e._isDegenerate,this._hasZeroAreaPrimitives=e._hasZeroAreaPrimitives;return}this._box=new ct(e),t===void 0?(this._matrix.SetIdentity(),this._inverse.SetIdentity()):this._SetMatrices(t)}Set(e,t){return this._box=new ct(e),this._SetMatrices(t),this}SetMatrix(e){return this._SetMatrices(e),this}SetRange(e){return this._box=new ct(e),this}GetRange(){return this._box}GetBox(){return this.GetRange()}GetMatrix(){return this._matrix}GetInverseMatrix(){return this._inverse}SetHasZeroAreaPrimitives(e){return this._hasZeroAreaPrimitives=e,this}HasZeroAreaPrimitives(){return this._hasZeroAreaPrimitives}GetVolume(){if(this._box.IsEmpty())return 0;const e=this._box.GetSize().data;return Math.abs(this._matrix.GetDeterminant3()*e[0]*e[1]*e[2])}Transform(e){return this._SetMatrices(this._matrix.GetMultiply(e)),this}ComputeAlignedRange(){if(this._box.IsEmpty())return new ct(this._box);const e=this._matrix,t=[e.GetElement(3,0),e.GetElement(3,1),e.GetElement(3,2)],s=[t[0],t[1],t[2]],n=[t[0],t[1],t[2]],r=this._box.GetMin().data,o=this._box.GetMax().data;for(let a=0;a<3;a++)for(let c=0;c<3;c++){const l=e.GetElement(c,a),u=r[c]*l,h=o[c]*l;u<h?(s[a]+=u,n[a]+=h):(s[a]+=h,n[a]+=u)}return new ct(new k(...s),new k(...n))}ComputeAlignedBox(){return this.ComputeAlignedRange()}ComputeCentroid(){const e=this.GetRange().GetMax(),t=this.GetRange().GetMin(),s=e.Add(t).GetScaled(.5);return this.GetMatrix().Transform(s)}static Combine(e,t){let s;if(e.GetRange().IsEmpty())s=new ot(t);else if(t.GetRange().IsEmpty())s=new ot(e);else if(e._isDegenerate)t._isDegenerate?s=new ot(ct.GetUnion(e.ComputeAlignedRange(),t.ComputeAlignedRange())):s=ot._CombineInOrder(t,e);else if(t._isDegenerate)s=ot._CombineInOrder(e,t);else{const n=ot._CombineInOrder(e,t),r=ot._CombineInOrder(t,e),o=n.GetVolume(),a=r.GetVolume(),c=Math.max(1e-10,1e-6*Math.abs(Math.max(o,a)));s=Math.abs(o-a)<=c||o<a?n:r}return s.SetHasZeroAreaPrimitives(e.HasZeroAreaPrimitives()||t.HasZeroAreaPrimitives()),s}static _CombineInOrder(e,t){const s=new ot;s._box=new ct(t._box),s._matrix=t._matrix.GetMultiply(e._inverse),s._inverse=e._matrix.GetMultiply(t._inverse);const n=s.ComputeAlignedRange(),r=new ot(e);return r._box.UnionWith(n),r}_SetMatrices(e){this._isDegenerate=!1,this._matrix=new be(e);const t=e.GetDeterminant();this._inverse=e.GetInverse(Uh),Math.abs(t)<=Uh&&(this._isDegenerate=!0,this._inverse.SetIdentity())}equals(e){return this._box.equals(e._box)&&this._matrix.equals(e._matrix)}hash(){return`${this._box.hash()}|${this._matrix.hash()}`}toString(){return`[(${this._box.toString()}) (${this._matrix.toString()}) ${this._hasZeroAreaPrimitives?"true":"false"}]`}repr(){return`Gf.BBox3d(${this._box.repr()}, ${this._matrix.repr()})`}}class $e{_normal;_distance;constructor(e,t,s){if(this._normal=new k(0,0,0),this._distance=0,e!==void 0){if(e instanceof ft){this.SetFromEquation(e);return}if(s!==void 0){this.SetFromPoints(e,t,s);return}if(typeof t=="number"){this.Set(e,t);return}this.SetFromNormalAndPoint(e,t)}}Set(e,t){return this._normal=e.GetNormalized(),this._distance=t,this}SetFromNormalAndPoint(e,t){return this._normal=e.GetNormalized(),this._distance=_e(this._normal,t),this}SetFromPoints(e,t,s){return this._normal=t.Subtract(e).Cross(s.Subtract(e)).GetNormalized(),this._distance=_e(this._normal,e),this}SetFromEquation(e){const t=new k(e.get(0),e.get(1),e.get(2));this._distance=-e.get(3);const s=t.Normalize();return s!==0&&(this._distance/=s),this._normal=t,this}GetNormal(){return this._normal}GetDistanceFromOrigin(){return this._distance}get normal(){return this._normal}get distanceFromOrigin(){return this._distance}GetEquation(){return new ft(this._normal.get(0),this._normal.get(1),this._normal.get(2),-this._distance)}equals(e){return this._normal.equals(e._normal)&&this._distance===e._distance}GetDistance(e){return _e(e,this._normal)-this._distance}Project(e){return e.Subtract(this._normal.GetScaled(this.GetDistance(e)))}Transform(e){const s=e.GetInverse().GetTranspose().MultVecMatrix(this.GetEquation());return this.SetFromEquation(s),this}Reorient(e){return this.GetDistance(e)<0&&(this._normal=this._normal.GetNegated(),this._distance=-this._distance),this}IntersectsPositiveHalfSpace(e){if(e instanceof ct){const t=e;if(t.IsEmpty())return!1;let s=0;const n=t.GetMin().data,r=t.GetMax().data,o=this._normal.data;for(let a=0;a<3;a++){const c=o[a]>=0?r[a]:n[a];s+=o[a]*c}return s>=this._distance}return this.GetDistance(e)>=0}toString(){return`[${this._normal.toString()} ${this._distance}]`}repr(){return`Gf.Plane(${this._normal.repr()}, ${this._distance})`}}class VP{_p0;_dir;constructor(e,t){this._p0=new k,this._dir=new k,e!==void 0&&t!==void 0&&this.Set(e,t)}Set(e,t){return this._p0=new k(e),this._dir=new k(t),this._dir.Normalize()}GetPoint(e){return this._p0.Add(this._dir.GetScaled(e))}GetDirection(){return this._dir}SetDirection(e){this.Set(this.GetPoint(0),e)}GetP0(){return this._p0}FindClosestPoint(e){const s=e.Subtract(this._p0).Dot(this._dir);return{point:this.GetPoint(s),t:s}}equals(e){return this._p0.equals(e._p0)&&this._dir.equals(e._dir)}toString(){return`(point:${this.GetPoint(0).toString()} direction:${this._dir.toString()})`}}const Ts=1e-10,oa=1e-6,xn=i=>Math.abs(i),ai=i=>i*i,UP=i=>Math.sqrt(i),zP=(i,e)=>e<0||Object.is(e,-0)?-i:i,aa=(i,e,t)=>xn(i-e)<t;class Zi{_startPoint;_direction;constructor(e,t){this._startPoint=new k,this._direction=new k,e!==void 0&&t!==void 0&&this.SetPointAndDirection(e,t)}SetPointAndDirection(e,t){this._startPoint=new k(e),this._direction=new k(t)}SetEnds(e,t){this._startPoint=new k(e),this._direction=t.Subtract(e)}GetStartPoint(){return this._startPoint}GetDirection(){return this._direction}get startPoint(){return this._startPoint}set startPoint(e){this._startPoint=new k(e)}get direction(){return this._direction}set direction(e){this._direction=new k(e)}GetPoint(e){return this._startPoint.Add(this._direction.GetScaled(e))}Transform(e){return this._startPoint=e.Transform(this._startPoint),this._direction=e.TransformDir(this._direction),this}FindClosestPoint(e){const t=new VP,s=t.Set(this._startPoint,this._direction);let r=t.FindClosestPoint(e).t;return r<0&&(r=0),{point:t.GetPoint(r),rayDistance:r/s}}equals(e){return this._startPoint.equals(e._startPoint)&&this._direction.equals(e._direction)}toString(){return`[${this._startPoint.toString()} >> ${this._direction.toString()}]`}Intersect(e,t,s,n){if(e instanceof $e)return this._intersectPlane(e);if(e instanceof ct)return this._intersectRange(e);if(e instanceof ot)return this._intersectBBox(e);if(t instanceof k){if(s instanceof k)return this._intersectTriangle(e,t,s,n);const r=s;return n!==void 0?this._intersectCone(e,t,r,n):this._intersectCylinder(e,t,r)}return this._intersectSphere(e,t)}_intersectTriangle(e,t,s,n){const r={hit:!1,distance:0,barycentricCoords:new k(0,0,0),frontFacing:!1},o=n===void 0?1/0:n,a=new $e(e,t,s),c=this._intersectPlane(a);if(!c.hit)return r;const l=c.distance,u=c.frontFacing;if(l>o)return r;const h=a.GetNormal().data,d=xn(h[0]),f=xn(h[1]),p=xn(h[2]);let y,m;d>f&&d>p?(y=1,m=2):f>p?(y=2,m=0):(y=0,m=1);const g=this._startPoint.data,S=this._direction.data,_=e.data,P=t.data,w=s.data,v=g[y]+l*S[y],b=g[m]+l*S[m],I=new ee(v-_[y],b-_[m]).data,T=new ee(P[y]-_[y],P[m]-_[m]).data,E=new ee(w[y]-_[y],w[m]-_[m]).data;let D=(I[1]*T[0]-I[0]*T[1])/(E[1]*T[0]-E[0]*T[1]);if(D<0&&D>-Ts&&(D=0),D<0||D>1)return r;let N=-1;T[1]<-Ts||T[1]>Ts?N=(I[1]-D*E[1])/T[1]:N=(I[0]-D*E[0])/T[0],N<0&&N>-Ts&&(N=0);let x=Math.fround(1-(N+D));return x<0&&x>-Ts&&(x=0),N<0||x<0?r:{hit:!0,distance:l,barycentricCoords:new k(x,N,D),frontFacing:u}}_intersectPlane(e){const t={hit:!1,distance:0,frontFacing:!1},s=_e(this._direction,e.GetNormal());if(s<Ts&&s>-Ts)return t;const n=e.GetNormal().GetScaled(e.GetDistanceFromOrigin()),r=_e(n.Subtract(this._startPoint),e.GetNormal())/s;return r<0?t:{hit:!0,distance:r,frontFacing:s<0}}_intersectRange(e){const t={hit:!1,enterDistance:0,exitDistance:0};if(e.IsEmpty())return t;const s=Number.MAX_VALUE;let n=-s,r=s;const o=this._direction.data,a=this._startPoint.data,c=e.GetMin().data,l=e.GetMax().data;for(let u=0;u<3;u++){let h=o[u];if(xn(h)<Ts){if(a[u]<c[u]||a[u]>l[u])return t;continue}h=1/h;let d=h*(c[u]-a[u]),f=h*(l[u]-a[u]);if(d>f){const p=d;d=f,f=p}d>n&&(n=d),f<r&&(r=f)}return n>r||r<0?t:{hit:!0,enterDistance:n,exitDistance:r}}_intersectBBox(e){const t=new Zi(this._startPoint,this._direction);return t.Transform(e.GetInverseMatrix()),t._intersectRange(e.GetRange())}_intersectSphere(e,t){const s=this._startPoint,n=s.Add(this._direction),r=s.data,o=n.data,a=e.data,c=r[0],l=r[1],u=r[2],h=o[0],d=o[1],f=o[2],p=a[0],y=a[1],m=a[2],g=(h-c)*(h-c)+(d-l)*(d-l)+(f-u)*(f-u),S=2*((h-c)*(c-p)+(d-l)*(l-y)+(f-u)*(u-m)),_=p*p+y*y+m*m+c*c+l*l+u*u-2*(p*c+y*l+m*u)-t*t;return this._solveQuadratic(g,S,_)}_intersectCylinder(e,t,s){const n=t.GetNormalized(),r=this._startPoint.Subtract(e),o=this._direction.Subtract(n.GetScaled(_e(this._direction,n))),a=r.Subtract(n.GetScaled(_e(r,n))),c=_e(o,o),l=2*_e(o,a),u=_e(a,a)-ai(s);return this._solveQuadratic(c,l,u)}_intersectCone(e,t,s,n){const r=t.GetNormalized(),o=e.Add(r.GetScaled(n)),a=this._startPoint.Subtract(o),c=this._direction.Subtract(r.GetScaled(_e(this._direction,r))),l=a.Subtract(r.GetScaled(_e(a,r))),u=_e(this._direction,r),h=_e(a,r),d=ai(n)/(ai(n)+ai(s)),f=1-d,p=d*_e(c,c)-f*ai(u),y=2*(d*_e(c,l)-f*u*h),m=d*_e(l,l)-f*ai(h),g=this._solveQuadratic(p,y,m);if(!g.hit)return{hit:!1,enterDistance:0,exitDistance:0};let S=g.enterDistance,_=g.exitDistance;const P=_e(r,this.GetPoint(S).Subtract(o))<=0,w=_e(r,this.GetPoint(_).Subtract(o))<=0;return!P&&!w?{hit:!1,enterDistance:0,exitDistance:0}:(P?w||(_=S):S=_,{hit:!0,enterDistance:S,exitDistance:_})}_solveQuadratic(e,t,s){const n={hit:!1,enterDistance:0,exitDistance:0};if(aa(e,0,oa)){if(aa(t,0,oa))return n;const l=-s/t;return l<0?n:{hit:!0,enterDistance:l,exitDistance:l}}const r=ai(t)-4*e*s;if(aa(r,0,oa)){const l=-t/(2*e);return l<0?n:{hit:!0,enterDistance:l,exitDistance:l}}if(r<0)return n;const o=-.5*(t+zP(1,t)*UP(r));let a=o/e,c=s/o;if(a>c){const l=a;a=c,c=l}return c>=0?{hit:!0,enterDistance:a,exitDistance:c}:n}}class J{static Orthographic=0;static Perspective=1;_position;_rotation;_window;_nearFar;_viewDistance;_projectionType;_planes=null;constructor(e,t,s,n,r,o=5){if(e===void 0){this._position=new k(0,0,0),this._rotation=hc(),this._window=new Ot(new ee(-1,-1),new ee(1,1)),this._nearFar=new Ni(1,10),this._viewDistance=5,this._projectionType=J.Perspective;return}if(e instanceof J){this._position=new k(e._position),this._rotation={axis:[...e._rotation.axis],angle:e._rotation.angle},this._window=new Ot(e._window),this._nearFar=new Ni(e._nearFar),this._viewDistance=e._viewDistance,this._projectionType=e._projectionType;return}if(e instanceof be){this._window=new Ot(t),this._nearFar=new Ni(s),this._projectionType=n,this._viewDistance=r??5,this._position=new k(0,0,0),this._rotation=hc(),this.SetPositionAndRotationFromMatrix(e);return}this._position=new k(e),this._rotation={axis:[...t.axis],angle:t.angle},this._window=new Ot(s),this._nearFar=new Ni(n),this._projectionType=r,this._viewDistance=o}equals(e){return!(!this._position.equals(e._position)||!DP(this._rotation,e._rotation)||!this._window.equals(e._window)||!this._nearFar.equals(e._nearFar)||this._viewDistance!==e._viewDistance||this._projectionType!==e._projectionType)}hash(){return[this._position.hash(),this._rotation.axis.join(",")+";"+this._rotation.angle,this._window.hash(),this._nearFar.hash(),this._viewDistance,this._projectionType].join("|")}toString(){const e=this._projectionType===J.Perspective?"perspective":"orthographic";return`[${this._position.toString()} ${$h(this._rotation)} ${this._window.toString()} ${this._nearFar.toString()} ${this._viewDistance} ${e}]`}repr(){return`Gf.Frustum(${this._position.repr()}, ${$h(this._rotation)}, ${this._window.repr()}, ${this._nearFar.repr()}, Gf.Frustum.${this._projectionType===J.Perspective?"Perspective":"Orthographic"}, ${this._viewDistance})`}SetPosition(e){this._position=new k(e),this._DirtyFrustumPlanes()}GetPosition(){return this._position}get position(){return this._position}set position(e){this.SetPosition(e)}SetRotation(e){this._rotation={axis:[...e.axis],angle:e.angle},this._DirtyFrustumPlanes()}GetRotation(){return this._rotation}get rotation(){return this._rotation}set rotation(e){this.SetRotation(e)}SetPositionAndRotationFromMatrix(e){let t=new be(e);t.IsRightHanded()||(t=new be(new ft(-1,1,1,1)).GetMultiply(t)),t.Orthonormalize(),this.SetRotation(t.ExtractRotation()),this.SetPosition(t.ExtractTranslation())}SetWindow(e){this._window=new Ot(e),this._DirtyFrustumPlanes()}GetWindow(){return this._window}get window(){return this._window}set window(e){this.SetWindow(e)}static GetReferencePlaneDepth(){return 1}SetNearFar(e){this._nearFar=new Ni(e),this._DirtyFrustumPlanes()}GetNearFar(){return this._nearFar}get nearFar(){return this._nearFar}set nearFar(e){this.SetNearFar(e)}SetViewDistance(e){this._viewDistance=e}GetViewDistance(){return this._viewDistance}get viewDistance(){return this._viewDistance}set viewDistance(e){this._viewDistance=e}SetProjectionType(e){this._projectionType=e,this._DirtyFrustumPlanes()}GetProjectionType(){return this._projectionType}get projectionType(){return this._projectionType}set projectionType(e){this.SetProjectionType(e)}SetPerspective(e,t,s,n,r){typeof t=="boolean"?this._setPerspective(e,t,s,n,r):this._setPerspective(e,!0,t,s,n)}_setPerspective(e,t,s,n,r){this._projectionType=J.Perspective;let o=1,a=1,c=s;c===0&&(c=1),t?(o=Math.tan(uc(e/2))*J.GetReferencePlaneDepth(),a=o*c):(a=Math.tan(uc(e/2))*J.GetReferencePlaneDepth(),o=a/c),this._window.SetMin(new ee(-a,-o)),this._window.SetMax(new ee(a,o)),this._nearFar.SetMin(n),this._nearFar.SetMax(r),this._DirtyFrustumPlanes()}GetPerspective(e){if(this._projectionType!==J.Perspective)return null;const t=this._window.GetSize().data;let s;e?s=2*lc(Math.atan(t[1]/(2*J.GetReferencePlaneDepth()))):s=2*lc(Math.atan(t[0]/(2*J.GetReferencePlaneDepth())));const n=t[0]/t[1],r=this._nearFar.GetMin(),o=this._nearFar.GetMax();return[s,n,r,o]}GetFOV(e=!1){let t=0;if(this.GetProjectionType()===J.Perspective){const s=this.GetPerspective(e);s&&(t=s[0])}return t}SetOrthographic(e,t,s,n,r,o){this._projectionType=J.Orthographic,this._window.SetMin(new ee(e,s)),this._window.SetMax(new ee(t,n)),this._nearFar.SetMin(r),this._nearFar.SetMax(o),this._DirtyFrustumPlanes()}GetOrthographic(){if(this._projectionType!==J.Orthographic)return null;const e=this._window.GetMin().data,t=this._window.GetMax().data;return[e[0],t[0],e[1],t[1],this._nearFar.GetMin(),this._nearFar.GetMax()]}FitToSphere(e,t,s=0){if(this._projectionType===J.Orthographic)this._viewDistance=t+s,this._window=new Ot(new ee(-t,-t),new ee(t,t));else{const n=this.ComputeAspectRatio()>1?1:0,r=this._window.GetMin().data[n],o=this._window.GetMax().data[n];let a;r>0?a=o:o<0||-r>o?a=r:a=o,a<0?a=-a:a===0&&(a=1),this._viewDistance=t*(1/a)*Math.sqrt(Fh(a)+Fh(this._nearFar.GetMin()))}this._nearFar.SetMin(this._viewDistance-(t+s)),this._nearFar.SetMax(this._nearFar.GetMin()+2*(t+s)),this._position=e.Subtract(this.ComputeViewDirection().GetScaled(this._viewDistance)),this._DirtyFrustumPlanes()}Transform(e){const t=new J;t._projectionType=this._projectionType,t._position=e.Transform(this._position);const s=this.ComputeViewDirection(),n=this.ComputeUpVector(),r=e.TransformDir(s),o=e.TransformDir(n),a=r.Normalize();o.Normalize();const c=Rh(r,o);c.Normalize();const l=new be;l.SetIdentity(),l.SetRow3(0,c),l.SetRow3(1,o),l.SetRow3(2,r.GetNegated()),t._rotation=l.ExtractRotation(),t._nearFar=this._nearFar.GetMultiplied(a),t._viewDistance=this._viewDistance*a;const u=this._window.GetMin().data,h=this._window.GetMax().data;let d=this._position.Add(this._rotateDir(this._rotation,new k(u[0],u[1],-1))),f=this._position.Add(this._rotateDir(this._rotation,new k(h[0],h[1],-1)));d=e.Transform(d),f=e.Transform(f),d=d.Subtract(t._position),f=f.Subtract(t._position),d=this._rotateDir(na(t._rotation),d),f=this._rotateDir(na(t._rotation),f),this._projectionType===J.Perspective&&(d=d.GetScaled(1/a),f=f.GetScaled(1/a));const p=d.data,y=f.data;t._window.SetMin(new ee(p[0],p[1])),t._window.SetMax(new ee(y[0],y[1]));const m=t._window.GetMin().data.slice(),g=t._window.GetMax().data.slice();if(m[0]>g[0]){const S=m[0];m[0]=g[0],g[0]=S}if(m[1]>g[1]){const S=m[1];m[1]=g[1],g[1]=S}return t._window.SetMin(new ee(m[0],m[1])),t._window.SetMax(new ee(g[0],g[1])),this._copyFrom(t),this}ComputeViewDirection(){return this._rotateDir(this._rotation,new k(0,0,-1))}ComputeUpVector(){return this._rotateDir(this._rotation,new k(0,1,0))}ComputeViewFrame(){const e=this.ComputeUpVector(),t=this.ComputeViewDirection();return{side:Rh(t,e),up:e,view:t}}ComputeLookAtPoint(){return this._position.Add(this.ComputeViewDirection().GetScaled(this._viewDistance))}ComputeViewMatrix(){const e=new be().SetTranslate(this._position.GetNegated()),t=new be().SetRotate(na(this._rotation));return e.GetMultiply(t)}ComputeViewInverse(){return this.ComputeViewMatrix().GetInverse()}ComputeProjectionMatrix(){const e=new be;e.SetIdentity();const t=this._window.GetMin().data[0],s=this._window.GetMax().data[0],n=this._window.GetMin().data[1],r=this._window.GetMax().data[1],o=this._nearFar.GetMin(),a=this._nearFar.GetMax(),c=s-t,l=r-n,u=a-o;return this._projectionType===J.Orthographic?(e.SetElement(0,0,2/c),e.SetElement(1,1,2/l),e.SetElement(2,2,-2/u),e.SetElement(3,0,-(s+t)/c),e.SetElement(3,1,-(r+n)/l),e.SetElement(3,2,-(a+o)/u)):(e.SetElement(0,0,2/c),e.SetElement(1,1,2/l),e.SetElement(2,2,-(a+o)/u),e.SetElement(2,0,(s+t)/c),e.SetElement(2,1,(r+n)/l),e.SetElement(3,2,-2*o*a/u),e.SetElement(2,3,-1),e.SetElement(3,3,0)),e}ComputeAspectRatio(){const e=this._window.GetSize().data;let t=0;return e[1]!==0&&(t=Math.abs(e[0]/e[1])),t}ComputeCorners(){const e=this._window.GetMin().data,t=this._window.GetMax().data,s=this._nearFar.GetMin(),n=this._nearFar.GetMax(),r=[];this._projectionType===J.Perspective?(r.push(new k(s*e[0],s*e[1],-s)),r.push(new k(s*t[0],s*e[1],-s)),r.push(new k(s*e[0],s*t[1],-s)),r.push(new k(s*t[0],s*t[1],-s)),r.push(new k(n*e[0],n*e[1],-n)),r.push(new k(n*t[0],n*e[1],-n)),r.push(new k(n*e[0],n*t[1],-n)),r.push(new k(n*t[0],n*t[1],-n))):(r.push(new k(e[0],e[1],-s)),r.push(new k(t[0],e[1],-s)),r.push(new k(e[0],t[1],-s)),r.push(new k(t[0],t[1],-s)),r.push(new k(e[0],e[1],-n)),r.push(new k(t[0],e[1],-n)),r.push(new k(e[0],t[1],-n)),r.push(new k(t[0],t[1],-n)));const o=this.ComputeViewInverse();for(let a=0;a<8;a++)r[a]=o.Transform(r[a]);return r}ComputeCornersAtDistance(e){const t=this._window.GetMin().data,s=this._window.GetMax().data,n=[];this._projectionType===J.Perspective?(n.push(new k(e*t[0],e*t[1],-e)),n.push(new k(e*s[0],e*t[1],-e)),n.push(new k(e*t[0],e*s[1],-e)),n.push(new k(e*s[0],e*s[1],-e))):(n.push(new k(t[0],t[1],-e)),n.push(new k(s[0],t[1],-e)),n.push(new k(t[0],s[1],-e)),n.push(new k(s[0],s[1],-e)));const r=this.ComputeViewInverse();for(let o=0;o<4;o++)n[o]=r.Transform(n[o]);return n}ComputeNarrowedFrustum(e,t){if(e instanceof k){const r=this.ComputeViewMatrix().Transform(e).data;if(r[2]>=0)return new J(this);let o=new ee(r[0],r[1]);return this._projectionType===J.Perspective&&(o=o.GetScaled(1/-r[2])),this._ComputeNarrowedFrustumSub(o,t)}const s=hf(e,this._window);return this._ComputeNarrowedFrustumSub(s,t)}_ComputeNarrowedFrustumSub(e,t){const s=new J(this),n=ef(t,this._window.GetSize()).GetScaled(.5),r=e.Subtract(n).data.slice(),o=e.Add(n).data.slice(),a=this._window.GetMin().data,c=this._window.GetMax().data;return r[0]<a[0]&&(r[0]=a[0]),r[1]<a[1]&&(r[1]=a[1]),o[0]>c[0]&&(o[0]=c[0]),o[1]>c[1]&&(o[1]=c[1]),s.SetWindow(new Ot(new ee(r[0],r[1]),new ee(o[0],o[1]))),s}ComputeRay(e){if(e instanceof k){const o=this.ComputeViewMatrix().Transform(e);let a,c;if(this._projectionType===J.Perspective)a=new k(0,0,0),c=o.GetNormalized();else{const d=o.data;a=new k(d[0],d[1],0),c=new k(0,0,-1)}const l=this.ComputeViewInverse(),u=l.Transform(a),h=l.TransformDir(c);return new Zi(u,h)}const t=zh(this._projectionType,this._window,e,this._nearFar.GetMin()),s=this.ComputeViewInverse(),n=s.Transform(t.GetStartPoint()),r=s.TransformDir(t.GetDirection());return new Zi(n,r)}ComputePickRay(e){if(e instanceof k){const s=this.ComputeViewMatrix().Transform(e);let n,r;if(this._projectionType===J.Perspective)n=new k(0,0,0),r=s.GetNormalized();else{const o=s.data;n=new k(o[0],o[1],0),r=new k(0,0,-1)}return this._ComputePickRayOffsetToNearPlane(n,r)}const t=zh(this._projectionType,this._window,e,this._nearFar.GetMin());return this._ComputePickRayOffsetToNearPlane(t.GetStartPoint(),t.GetDirection())}_ComputePickRayOffsetToNearPlane(e,t){const s=e.Add(t.GetScaled(this._nearFar.GetMin())),n=this.ComputeViewInverse(),r=n.Transform(s),o=n.TransformDir(t);return new Zi(r,o)}Intersects(e,t,s){return e instanceof ot?this._intersectsBBox(e):t===void 0?this._intersectsPoint(e):s===void 0?this._intersectsSegment(e,t):this._intersectsTriangle(e,t,s)}ComputePlanes(){return this._CalculateFrustumPlanes(),this._planes.map(e=>new $e(e.GetNormal(),e.GetDistanceFromOrigin()))}_intersectsBBox(e){if(e.GetBox().IsEmpty())return!1;this._CalculateFrustumPlanes();const t=e.GetRange(),s=e.GetInverseMatrix();for(const n of this._planes){const r=new $e(n.GetNormal(),n.GetDistanceFromOrigin());if(r.Transform(s),!r.IntersectsPositiveHalfSpace(t))return!1}return!0}_intersectsPoint(e){this._CalculateFrustumPlanes();for(const t of this._planes)if(!t.IntersectsPositiveHalfSpace(e))return!1;return!0}_intersectsSegment(e,t){this._CalculateFrustumPlanes();const s=this._planes;return this._segmentIntersects(e,gn(s,e),t,gn(s,t))}_intersectsTriangle(e,t,s){this._CalculateFrustumPlanes();const n=this._planes,r=gn(n,e),o=gn(n,t),a=gn(n,s);if(((r|o|a)&63)!==63)return!1;if(r===63||o===63||a===63||this._segmentIntersects(e,r,t,o)||this._segmentIntersects(t,o,s,a)||this._segmentIntersects(s,a,e,r))return!0;let c=4;const l=16,u=32;r&l&&o&l&&a&l&&r&u&&o&u&&a&u&&(c=1);for(let h=0;h<c;h++){const d=h===0?new ee(-1,-1):h===1?new ee(-1,1):h===2?new ee(1,1):new ee(1,-1);if(this.ComputePickRay(d).Intersect(e,t,s).hit)return!0}return!1}_segmentIntersects(e,t,s,n){if(((t|n)&63)!==63)return!1;if(t===63||n===63)return!0;let r=0,o=1;const a=s.Subtract(e),c=this._planes;for(let l=0;l<c.length;l++){const u=c[l],h=1<<l,d=t&h,f=n&h;if(d===f)continue;const p=-u.GetDistance(e)/u.GetNormal().Dot(a);if(d?p<o&&(o=p):p>r&&(r=p),r>o)return!1}return!0}static IntersectsViewVolume(e,t){const s=e.GetRange().GetMin().data,n=e.GetRange().GetMax().data,r=[new ft(s[0],s[1],s[2],1),new ft(s[0],s[1],n[2],1),new ft(s[0],n[1],s[2],1),new ft(s[0],n[1],n[2],1),new ft(n[0],s[1],s[2],1),new ft(n[0],s[1],n[2],1),new ft(n[0],n[1],s[2],1),new ft(n[0],n[1],n[2],1)],o=e.GetMatrix().GetMultiply(t);let a=0;for(let c=0;c<8;c++){const l=o.MultVecMatrix(r[c]).data;let u=0;u=u<<1|(l[0]<l[3]?1:0),u=u<<1|(l[0]>-l[3]?1:0),u=u<<1|(l[1]<l[3]?1:0),u=u<<1|(l[1]>-l[3]?1:0),u=u<<1|(l[2]<l[3]?1:0),u=u<<1|(l[2]>-l[3]?1:0),a|=u}return a===63}_DirtyFrustumPlanes(){this._planes=null}_copyFrom(e){this._position=e._position,this._rotation=e._rotation,this._window=e._window,this._nearFar=e._nearFar,this._viewDistance=e._viewDistance,this._projectionType=e._projectionType,this._planes=null}_rotateDir(e,t){return new be().SetRotate(e).TransformDir(t)}_CalculateFrustumPlanes(){if(this._planes)return;const e=new Array(6),t=this._window.GetMin().data,s=this._window.GetMax().data,n=this._nearFar.GetMin(),r=this._nearFar.GetMax(),o=this.ComputeViewInverse();if(this._projectionType===J.Perspective){let a=new k(0,0,0),c=new k(n*t[0],n*t[1],-n),l=new k(n*s[0],n*t[1],-n),u=new k(n*t[0],n*s[1],-n),h=new k(n*s[0],n*s[1],-n);a=o.Transform(a),c=o.Transform(c),l=o.Transform(l),u=o.Transform(u),h=o.Transform(h),e[0]=new $e(a,c,u),e[1]=new $e(a,h,l),e[2]=new $e(a,l,c),e[3]=new $e(a,u,h),e[4]=new $e(l,c,u)}else{let a=new k(t[0],t[1],-n),c=new k(s[0],t[1],-n),l=new k(t[0],s[1],-n),u=new k(s[0],s[1],-n);a=o.Transform(a),c=o.Transform(c),l=o.Transform(l),u=o.Transform(u);const h=o.TransformDir(new k(0,0,-1));e[0]=new $e(l.Add(h),l,a),e[1]=new $e(c.Add(h),c,u),e[2]=new $e(a.Add(h),a,c),e[3]=new $e(u.Add(h),u,l),e[4]=new $e(c,a,l)}e[5]=new $e(e[4].GetNormal().GetNegated(),-(e[4].GetDistanceFromOrigin()+(r-n))),this._planes=e}}function hf(i,e){const t=new ee(1,1).Add(i).GetScaled(.5);return e.GetMin().Add(ef(t,e.GetSize()))}function zh(i,e,t,s){const n=hf(t,e).data;let r,o;return i===J.Perspective?(r=new k(0,0,0),o=new k(n[0],n[1],-1).GetNormalized()):(r=new k(n[0],n[1],-s),o=new k(0,0,-1)),new Zi(r,o)}function gn(i,e){return(i[0].IntersectsPositiveHalfSpace(e)?1:0)<<0|(i[1].IntersectsPositiveHalfSpace(e)?1:0)<<1|(i[2].IntersectsPositiveHalfSpace(e)?1:0)<<2|(i[3].IntersectsPositiveHalfSpace(e)?1:0)<<3|(i[4].IntersectsPositiveHalfSpace(e)?1:0)<<4|(i[5].IntersectsPositiveHalfSpace(e)?1:0)<<5}const H=Math.fround;class X{static Perspective=0;static Orthographic=1;static FOVHorizontal=0;static FOVVertical=1;static APERTURE_UNIT=.1;static FOCAL_LENGTH_UNIT=.1;static DEFAULT_HORIZONTAL_APERTURE=.825*2.54/X.APERTURE_UNIT;static DEFAULT_VERTICAL_APERTURE=.602*2.54/X.APERTURE_UNIT;_transform;_projection;_horizontalAperture;_verticalAperture;_horizontalApertureOffset;_verticalApertureOffset;_focalLength;_clippingRange;_clippingPlanes;_fStop;_focusDistance;constructor(e,t=X.Perspective,s=X.DEFAULT_HORIZONTAL_APERTURE,n=X.DEFAULT_VERTICAL_APERTURE,r=0,o=0,a=50,c=new oi(1,1e6),l=[],u=0,h=0){if(e instanceof X){this._transform=new be(e._transform),this._projection=e._projection,this._horizontalAperture=e._horizontalAperture,this._verticalAperture=e._verticalAperture,this._horizontalApertureOffset=e._horizontalApertureOffset,this._verticalApertureOffset=e._verticalApertureOffset,this._focalLength=e._focalLength,this._clippingRange=new oi(e._clippingRange),this._clippingPlanes=e._clippingPlanes.map(d=>new Tn(d)),this._fStop=e._fStop,this._focusDistance=e._focusDistance;return}this._transform=e!==void 0?new be(e):new be(1),this._projection=t,this._horizontalAperture=H(s),this._verticalAperture=H(n),this._horizontalApertureOffset=H(r),this._verticalApertureOffset=H(o),this._focalLength=H(a),this._clippingRange=new oi(c),this._clippingPlanes=l.map(d=>new Tn(d)),this._fStop=H(u),this._focusDistance=H(h)}SetTransform(e){this._transform=new be(e)}SetProjection(e){this._projection=e}SetFocalLength(e){this._focalLength=H(e)}SetHorizontalAperture(e){this._horizontalAperture=H(e)}SetVerticalAperture(e){this._verticalAperture=H(e)}SetHorizontalApertureOffset(e){this._horizontalApertureOffset=H(e)}SetVerticalApertureOffset(e){this._verticalApertureOffset=H(e)}SetClippingRange(e){this._clippingRange=new oi(e)}SetClippingPlanes(e){this._clippingPlanes=e.map(t=>new Tn(t))}SetFStop(e){this._fStop=H(e)}SetFocusDistance(e){this._focusDistance=H(e)}SetPerspectiveFromAspectRatioAndFieldOfView(e,t,s,n=X.DEFAULT_HORIZONTAL_APERTURE){this._projection=X.Perspective,this._horizontalAperture=H(n),this._verticalAperture=H(n/(e!==0?e:1));const r=s===X.FOVHorizontal?this._horizontalAperture:this._verticalAperture,o=H(Math.tan(.5*uc(t)));if(o===0){this._focalLength=50;return}this._focalLength=H(r*X.APERTURE_UNIT/(2*o)/X.FOCAL_LENGTH_UNIT)}SetOrthographicFromAspectRatioAndSize(e,t,s){this._projection=X.Orthographic,this._focalLength=50,s===X.FOVHorizontal?(this._horizontalAperture=H(t/X.APERTURE_UNIT),e>0?this._verticalAperture=H(this._horizontalAperture/e):this._verticalAperture=this._horizontalAperture):(this._verticalAperture=H(t/X.APERTURE_UNIT),this._horizontalAperture=H(this._verticalAperture*e))}SetFromViewAndProjectionMatrix(e,t,s=50){this._transform=e.GetInverse(),this._focalLength=H(s);const n=(r,o)=>t.GetElement(r,o);if(n(2,3)<-.5){this._projection=X.Perspective;const r=H(2*s*(X.FOCAL_LENGTH_UNIT/X.APERTURE_UNIT));this._horizontalAperture=H(r/n(0,0)),this._verticalAperture=H(r/n(1,1)),this._horizontalApertureOffset=H(.5*this._horizontalAperture*n(2,0)),this._verticalApertureOffset=H(.5*this._verticalAperture*n(2,1)),this._clippingRange=new oi(n(3,2)/(n(2,2)-1),n(3,2)/(n(2,2)+1))}else{this._projection=X.Orthographic,this._horizontalAperture=H(2/X.APERTURE_UNIT/n(0,0)),this._verticalAperture=H(2/X.APERTURE_UNIT/n(1,1)),this._horizontalApertureOffset=H(-.5*this._horizontalAperture*n(3,0)),this._verticalApertureOffset=H(-.5*this._verticalAperture*n(3,1));const r=1/n(2,2),o=r*n(3,2);this._clippingRange=new oi(o+r,o-r)}}GetTransform(){return new be(this._transform)}GetProjection(){return this._projection}GetHorizontalAperture(){return this._horizontalAperture}GetVerticalAperture(){return this._verticalAperture}GetHorizontalApertureOffset(){return this._horizontalApertureOffset}GetVerticalApertureOffset(){return this._verticalApertureOffset}GetAspectRatio(){return this._verticalAperture===0?0:H(this._horizontalAperture/this._verticalAperture)}GetFocalLength(){return this._focalLength}GetFieldOfView(e){const t=e===X.FOVHorizontal?this._horizontalAperture:this._verticalAperture,s=2*Math.atan(t*X.APERTURE_UNIT/(2*this._focalLength*X.FOCAL_LENGTH_UNIT));return H(lc(s))}GetClippingRange(){return new oi(this._clippingRange)}GetClippingPlanes(){return this._clippingPlanes.map(e=>new Tn(e))}GetFStop(){return this._fStop}GetFocusDistance(){return this._focusDistance}GetFrustum(){const e=this._horizontalAperture/2,t=this._verticalAperture/2,s=new Ot(new ee(-e,-t),new ee(e,t)),n=new ee(this._horizontalApertureOffset,this._verticalApertureOffset);s.AddInPlace(new Ot(n,n)),s.MultiplyInPlace(X.APERTURE_UNIT),this._projection!==X.Orthographic&&this._focalLength!==0&&s.DivideInPlace(this._focalLength*X.FOCAL_LENGTH_UNIT);const r=new Ni(this._clippingRange.GetMin(),this._clippingRange.GetMax()),o=this._projection===X.Orthographic?J.Orthographic:J.Perspective;return new J(this._transform,s,r,o)}equals(e){return this._transform.equals(e._transform)&&this._projection===e._projection&&this._horizontalAperture===e._horizontalAperture&&this._verticalAperture===e._verticalAperture&&this._horizontalApertureOffset===e._horizontalApertureOffset&&this._verticalApertureOffset===e._verticalApertureOffset&&this._focalLength===e._focalLength&&this._clippingRange.equals(e._clippingRange)&&this._clippingPlanesEqual(e._clippingPlanes)&&this._fStop===e._fStop&&this._focusDistance===e._focusDistance}_clippingPlanesEqual(e){if(this._clippingPlanes.length!==e.length)return!1;for(let t=0;t<e.length;t++)if(!this._clippingPlanes[t].equals(e[t]))return!1;return!0}repr(){const e=this._transform.GetArray().join(", "),t=this._projection===X.Perspective?"Gf.Camera.Perspective":"Gf.Camera.Orthographic",s="["+this._clippingPlanes.map(n=>`new Gf.Vec4f(${n.data.join(", ")})`).join(", ")+"]";return`new Gf.Camera(new Gf.Matrix4d(${e}), ${t}, ${this._horizontalAperture}, ${this._verticalAperture}, ${this._horizontalApertureOffset}, ${this._verticalApertureOffset}, ${this._focalLength}, new Gf.Range1f(${this._clippingRange.GetMin()}, ${this._clippingRange.GetMax()}), ${s}, ${this._fStop}, ${this._focusDistance})`}get transform(){return this._transform}set transform(e){this.SetTransform(e)}get projection(){return this._projection}set projection(e){this.SetProjection(e)}get horizontalAperture(){return this._horizontalAperture}set horizontalAperture(e){this.SetHorizontalAperture(e)}get verticalAperture(){return this._verticalAperture}set verticalAperture(e){this.SetVerticalAperture(e)}get horizontalApertureOffset(){return this._horizontalApertureOffset}set horizontalApertureOffset(e){this.SetHorizontalApertureOffset(e)}get verticalApertureOffset(){return this._verticalApertureOffset}set verticalApertureOffset(e){this.SetVerticalApertureOffset(e)}get focalLength(){return this._focalLength}set focalLength(e){this.SetFocalLength(e)}get clippingRange(){return this._clippingRange}set clippingRange(e){this.SetClippingRange(e)}get clippingPlanes(){return this._clippingPlanes}set clippingPlanes(e){this.SetClippingPlanes(e)}get fStop(){return this._fStop}set fStop(e){this.SetFStop(e)}get focusDistance(){return this._focusDistance}set focusDistance(e){this.SetFocusDistance(e)}get aspectRatio(){return this.GetAspectRatio()}get horizontalFieldOfView(){return this.GetFieldOfView(X.FOVHorizontal)}get verticalFieldOfView(){return this.GetFieldOfView(X.FOVVertical)}get frustum(){return this.GetFrustum()}}function jP(i){const e=[];let t=i;for(;t&&(e.push(t),t!=="/");){const s=t.lastIndexOf("/");t=s<=0?"/":t.slice(0,s)}return e}class qn{constructor(e,t){this._ruleMap=e,this._expressionMatch=t}getAsPathExpansionRuleMap(){return new Map(this._ruleMap)}equals(e){if(!this.usesPathExpansionRuleMap()||!e.usesPathExpansionRuleMap())return!1;const t=e.getAsPathExpansionRuleMap();return this._ruleMap.size===t.size&&[...this._ruleMap].every(([s,n])=>t.get(s)===n)}hash(){return JSON.stringify([...this._ruleMap].sort(([e],[t])=>e.localeCompare(t)))}hasExcludes(){return[...this._ruleMap.values()].includes("exclude")}usesPathExpansionRuleMap(){return this._expressionMatch===void 0}static compute(e,t){const s=`collection:${t}:`,n=e.getAttr(`${s}expansionRule`)?.getValue(),r=n==="explicitOnly"||n==="expandPrimsAndProperties"?n:"expandPrims",o=new Map;for(const a of e.getAttr(`${s}includes`)?.getTargets()??[])o.set(a,r);e.getAttr(`${s}includeRoot`)?.getValue()===!0&&o.set("/",r);for(const a of e.getAttr(`${s}excludes`)?.getTargets()??[])o.set(a,"exclude");return new qn(o)}isPathIncluded(e){if(!e.startsWith("/"))throw new Error(`IsPathIncluded: path <${e}> is not absolute`);if(this._expressionMatch)return this._expressionMatch(e);for(const t of jP(e.includes(".")?e.slice(0,e.indexOf(".")):e)){const s=this._ruleMap.get(t);if(s!==void 0){if(s==="exclude")return!1;if(s==="expandPrimsAndProperties")return!0;if(e.includes(".")&&s==="expandPrims")return!1;if(s!=="explicitOnly"||t===e)return!0}}return!1}}const df=["expansionRule","includeRoot","membershipExpression","mode"],WP=["collection","excludes",...df,"includes"];class pe extends hP{constructor(e,t,s,n=!1){super(e,t),this._name=s,this._includeRootFallback=n}static typeName="CollectionAPI";getName(){return this._name}_property(e){return e?`collection:${this._name}:${e}`:`collection:${this._name}`}_attrFor(e,t){return this._attr(this._property(e),t)}_createAttr(e,t,s){const n=this._attrFor(e,t);return s!==void 0&&n.set(s),n}static getSchemaAttributeNames(e=!0,t){const s=t??"__INSTANCE_NAME__";return[...df.map(n=>`collection:${s}:${n}`),`collection:${s}`]}static get(e,t){if("getStage"in e)return new pe(e,e.getStage(),t);const s=".collection:",n=t.lastIndexOf(s),r=n<0?t:t.slice(0,n),o=n<0?"":t.slice(n+s.length);return new pe(e.has(r)?e._primHandle(r):void 0,e,o)}static getAll(e){const t=`${pe.typeName}:`;return e.getAppliedSchemas().filter(s=>s.startsWith(t)).map(s=>new pe(e,e.getStage(),s.slice(t.length)))}static getCollection(e,t){return"getStage"in e,pe.get(e,t)}static getNamedCollectionPath(e,t){return`${e.path}.collection:${t}`}static getAllCollections(e){return pe.getAll(e)}static isSchemaPropertyBaseName(e){return e===""||WP.filter(t=>t!=="collection").includes(e)}static isCollectionAPIPath(e){return e.includes(".collection:")}static canContainPropertyName(e){return e==="collection"||e.startsWith("collection:")}static canApply(e,t){return e.canApplyAPI(pe.typeName,t)}static apply(e,t){return e.applyAPI(pe.typeName,t),new pe(e,e.getStage(),t)}isValid(){return super.isValid()&&this.prim.hasAPI(pe.typeName,this._name)}getCollectionPath(){return pe.getNamedCollectionPath(this.prim,this._name)}getExpansionRuleAttr(){return this._attrFor("expansionRule","uniform token")}createExpansionRuleAttr(e){return this._createAttr("expansionRule","uniform token",e)}getIncludeRootAttr(){return this._attrFor("includeRoot","uniform bool")}createIncludeRootAttr(e){return this._createAttr("includeRoot","uniform bool",e)}getMembershipExpressionAttr(){return this._attrFor("membershipExpression","uniform pathExpression")}createMembershipExpressionAttr(e){return this._createAttr("membershipExpression","uniform pathExpression",e)}getModeAttr(){return this._attrFor("mode","uniform token")}createModeAttr(e){return this._createAttr("mode","uniform token",e)}getCollectionAttr(){return this._attr(this._property(),"uniform opaque")}createCollectionAttr(e){const t=this.getCollectionAttr();return e!==void 0&&t.set(e),t}getIncludesRel(){return this._rel(this._property("includes"))}createIncludesRel(){return this.getIncludesRel()}getExcludesRel(){return this._rel(this._property("excludes"))}createExcludesRel(){return this.getExcludesRel()}_expansionRule(){const e=this.getExpansionRuleAttr().get();return e==="explicitOnly"||e==="expandPrimsAndProperties"?e:"expandPrims"}_includeRoot(){const e=this.getIncludeRootAttr();return e.hasAuthoredValue()?e.get()===!0:this._includeRootFallback}_computeRuleMap(e){const t=`${this.prim.path}:${this._name}`;if(e.has(t))return new Map;e.add(t);const s=new Map,n=this._expansionRule();for(const r of this.getIncludesRel().getTargets())if(pe.isCollectionAPIPath(r)){const o=pe.get(this.stage,r);for(const[a,c]of o._computeRuleMap(e))s.set(a,c)}else s.set(r,n);this._includeRoot()&&s.set("/",n);for(const r of this.getExcludesRel().getTargets())s.set(r,"exclude");return e.delete(t),s}computeMembershipQuery(){if(this.isInExpressionMode()){const e=this._resolveMembershipExpression(new Set);return new qn(new Map,e?t=>e.Match(B.fromString(t),()=>ge.MakeVarying(!0)).GetValue():()=>!1)}return new qn(this._computeRuleMap(new Set))}static computeMembershipQuery(e){return e.computeMembershipQuery()}computeIncludedPaths(){return pe.computeIncludedPaths(this.computeMembershipQuery(),this.stage)}computeIncludedObjects(){return this.computeIncludedPaths()}static computeIncludedPaths(e,t){const s=[];for(const n of t.traverse()){e.isPathIncluded(n)&&s.push(n);for(const r of t.getPrim(n)?.attrNames??[]){const o=`${n}.${r}`;e.isPathIncluded(o)&&s.push(o)}}return s}static computeIncludedObjects(e,t){return pe.computeIncludedPaths(e,t)}includePath(e){return this.computeMembershipQuery().isPathIncluded(e)?!0:e==="/"?(this.createIncludeRootAttr(!0),!0):(this.getExcludesRel().setTargets(this.getExcludesRel().getTargets().filter(t=>t!==e)),this.getIncludesRel().addTarget(e),!0)}excludePath(e){return e==="/"?(this.createIncludeRootAttr(!1),!0):(this.getIncludesRel().setTargets(this.getIncludesRel().getTargets().filter(t=>t!==e)),this.getExcludesRel().addTarget(e),!0)}hasNoIncludedPaths(){const e=this.getMembershipExpressionAttr().get();return this.getIncludesRel().getTargets().length===0&&!this._includeRoot()&&(e==null||e==="")}isInRelationshipsMode(){const e=this.getModeAttr().get();return e==="relationship"?!0:e==="expression"?!1:this._includeRoot()||this.getIncludesRel().getTargets().length>0||this.getExcludesRel().getTargets().length>0}isInExpressionMode(){return!this.isInRelationshipsMode()}_resolveMembershipExpression(e){const t=`${this.prim.path}:${this._name}`;if(e.has(t))return W.Nothing();const s=this.getMembershipExpressionAttr().get(),n=s instanceof W?s:typeof s=="string"?new W(s):void 0;if(!n)return;e.add(t);const r=n.resolveReferences(o=>{const a=o.path.isEmpty()?this.prim.path:o.path.pathString;return pe.get(this.stage,`${a}.collection:${o.name}`)._resolveMembershipExpression(e)??W.Nothing()});return e.delete(t),r}resolveCompleteMembershipExpression(){return this._resolveMembershipExpression(new Set)?.getText()}validate(){const e=this.getExpansionRuleAttr().get();return(e===void 0||e==="explicitOnly"||e==="expandPrims"||e==="expandPrimsAndProperties")&&!this._containsCycle(new Set,new Set)}_containsCycle(e,t){const s=`${this.prim.path}:${this._name}`;if(t.has(s))return!0;if(e.has(s))return!1;e.add(s),t.add(s);for(const n of this.getIncludesRel().getTargets())if(pe.isCollectionAPIPath(n)&&pe.get(this.stage,n)._containsCycle(e,t))return!0;return t.delete(s),!1}resetCollection(){return this.getIncludesRel().setTargets([]),this.getExcludesRel().setTargets([]),this.getMembershipExpressionAttr().clear(),!0}blockCollection(){return this.getIncludesRel().setTargets([]),this.getExcludesRel().setTargets([]),this.getMembershipExpressionAttr().set(null),!0}}M.makeMultipleApplyNameTemplate("","");const qP={Plugins:[{Info:{SdfMetadata:{constraintTargetIdentifier:{appliesTo:["attributes"],default:"",documentation:"Unique identifier within a model's namespace for an matrix-valued attribute representing a constraint target",type:"token"},elementSize:{appliesTo:["attributes"],default:1,displayGroup:"Primvars",documentation:"The number of values in a primvar's value array that must be aggregated for each element on the primitive.",type:"int"},inactiveIds:{appliesTo:["prims"],type:"int64listop"},interpolation:{appliesTo:["attributes"],default:"constant",displayGroup:"Primvars",documentation:"How a primvar interpolates across a primitive; equivalent to RenderMan's 'class specifier'",type:"token"},metersPerUnit:{appliesTo:["layers"],default:.01,displayGroup:"Stage",type:"double"},unauthoredValuesIndex:{appliesTo:["attributes"],default:-1,displayGroup:"Primvars",documentation:"The index that represents unauthored values in the indices array of an indexed primvar.",type:"int"},upAxis:{appliesTo:["layers"],default:"Y",displayGroup:"Stage",type:"token"}},Types:{UsdGeomBackPlateAPI:{alias:{UsdSchemaBase:"BackPlateAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"BackPlateAPI",schemaKind:"multipleApplyAPI"},UsdGeomBasisCurves:{alias:{UsdSchemaBase:"BasisCurves"},autoGenerated:!0,bases:["UsdGeomCurves"],schemaIdentifier:"BasisCurves",schemaKind:"concreteTyped"},UsdGeomBoundable:{alias:{UsdSchemaBase:"Boundable"},autoGenerated:!0,bases:["UsdGeomXformable"],schemaIdentifier:"Boundable",schemaKind:"abstractTyped"},UsdGeomCamera:{alias:{UsdSchemaBase:"Camera"},autoGenerated:!0,bases:["UsdGeomXformable"],schemaIdentifier:"Camera",schemaKind:"concreteTyped"},UsdGeomCapsule:{alias:{UsdSchemaBase:"Capsule"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Capsule",schemaKind:"concreteTyped"},UsdGeomCapsule_1:{alias:{UsdSchemaBase:"Capsule_1"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Capsule_1",schemaKind:"concreteTyped"},UsdGeomCone:{alias:{UsdSchemaBase:"Cone"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Cone",schemaKind:"concreteTyped"},UsdGeomCube:{alias:{UsdSchemaBase:"Cube"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Cube",schemaKind:"concreteTyped"},UsdGeomCurves:{alias:{UsdSchemaBase:"Curves"},autoGenerated:!0,bases:["UsdGeomPointBased"],implementsComputeExtent:!0,schemaIdentifier:"Curves",schemaKind:"abstractTyped"},UsdGeomCylinder:{alias:{UsdSchemaBase:"Cylinder"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Cylinder",schemaKind:"concreteTyped"},UsdGeomCylinder_1:{alias:{UsdSchemaBase:"Cylinder_1"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Cylinder_1",schemaKind:"concreteTyped"},UsdGeomGprim:{alias:{UsdSchemaBase:"Gprim"},autoGenerated:!0,bases:["UsdGeomBoundable"],schemaIdentifier:"Gprim",schemaKind:"abstractTyped"},UsdGeomHermiteCurves:{alias:{UsdSchemaBase:"HermiteCurves"},autoGenerated:!0,bases:["UsdGeomCurves"],schemaIdentifier:"HermiteCurves",schemaKind:"concreteTyped"},UsdGeomImageable:{alias:{UsdSchemaBase:"Imageable"},autoGenerated:!0,bases:["UsdTyped"],schemaIdentifier:"Imageable",schemaKind:"abstractTyped"},UsdGeomMesh:{alias:{UsdSchemaBase:"Mesh"},autoGenerated:!0,bases:["UsdGeomPointBased"],schemaIdentifier:"Mesh",schemaKind:"concreteTyped"},UsdGeomModelAPI:{alias:{UsdSchemaBase:"GeomModelAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"GeomModelAPI",schemaKind:"singleApplyAPI"},UsdGeomMotionAPI:{alias:{UsdSchemaBase:"MotionAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"MotionAPI",schemaKind:"singleApplyAPI"},UsdGeomNurbsCurves:{alias:{UsdSchemaBase:"NurbsCurves"},autoGenerated:!0,bases:["UsdGeomCurves"],schemaIdentifier:"NurbsCurves",schemaKind:"concreteTyped"},UsdGeomNurbsPatch:{alias:{UsdSchemaBase:"NurbsPatch"},autoGenerated:!0,bases:["UsdGeomPointBased"],schemaIdentifier:"NurbsPatch",schemaKind:"concreteTyped"},UsdGeomPlane:{alias:{UsdSchemaBase:"Plane"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Plane",schemaKind:"concreteTyped"},UsdGeomPointBased:{alias:{UsdSchemaBase:"PointBased"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"PointBased",schemaKind:"abstractTyped"},UsdGeomPointInstancer:{alias:{UsdSchemaBase:"PointInstancer"},autoGenerated:!0,bases:["UsdGeomBoundable"],implementsComputeExtent:!0,schemaIdentifier:"PointInstancer",schemaKind:"concreteTyped"},UsdGeomPoints:{alias:{UsdSchemaBase:"Points"},autoGenerated:!0,bases:["UsdGeomPointBased"],implementsComputeExtent:!0,schemaIdentifier:"Points",schemaKind:"concreteTyped"},UsdGeomPrimvarsAPI:{alias:{UsdSchemaBase:"PrimvarsAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"PrimvarsAPI",schemaKind:"nonAppliedAPI"},UsdGeomScope:{alias:{UsdSchemaBase:"Scope"},autoGenerated:!0,bases:["UsdGeomImageable"],schemaIdentifier:"Scope",schemaKind:"concreteTyped"},UsdGeomSphere:{alias:{UsdSchemaBase:"Sphere"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Sphere",schemaKind:"concreteTyped"},UsdGeomSubset:{alias:{UsdSchemaBase:"GeomSubset"},autoGenerated:!0,bases:["UsdTyped"],schemaIdentifier:"GeomSubset",schemaKind:"concreteTyped"},UsdGeomTetMesh:{alias:{UsdSchemaBase:"TetMesh"},autoGenerated:!0,bases:["UsdGeomPointBased"],schemaIdentifier:"TetMesh",schemaKind:"concreteTyped"},UsdGeomVisibilityAPI:{alias:{UsdSchemaBase:"VisibilityAPI"},apiSchemaCanOnlyApplyTo:["Imageable"],autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"VisibilityAPI",schemaKind:"singleApplyAPI"},UsdGeomXform:{alias:{UsdSchemaBase:"Xform"},autoGenerated:!0,bases:["UsdGeomXformable"],schemaIdentifier:"Xform",schemaKind:"concreteTyped"},UsdGeomXformCommonAPI:{alias:{UsdSchemaBase:"XformCommonAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"XformCommonAPI",schemaKind:"nonAppliedAPI"},UsdGeomXformable:{alias:{UsdSchemaBase:"Xformable"},autoGenerated:!0,bases:["UsdGeomImageable"],schemaIdentifier:"Xformable",schemaKind:"abstractTyped"}}},LibraryPath:"@PLUG_INFO_LIBRARY_PATH@",Name:"usdGeom",ResourcePath:"@PLUG_INFO_RESOURCE_PATH@",Root:"@PLUG_INFO_ROOT@",Type:"library"}]},HP=`#usda 1.0
(
    "WARNING: THIS FILE IS GENERATED BY usdGenSchema.  DO NOT EDIT."
)

class "Imageable" (
    customData = {
        string userDocBrief = """Base class for all prims that may require rendering or 
    visualization of some sort."""
    }
)
{
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
}

class "VisibilityAPI" (
    customData = {
        string userDocBrief = """UsdGeomVisibilityAPI introduces properties that can be used to author
    visibility opinions."""
    }
)
{
    uniform token guideVisibility = "invisible" (
        allowedTokens = ["inherited", "invisible", "visible"]
        customData = {
            string userDocBrief = 'This attribute controls visibility for geometry with purpose "guide".'
        }
    )
    uniform token proxyVisibility = "inherited" (
        allowedTokens = ["inherited", "invisible", "visible"]
        customData = {
            string userDocBrief = 'This attribute controls visibility for geometry with purpose "proxy".'
        }
    )
    uniform token renderVisibility = "inherited" (
        allowedTokens = ["inherited", "invisible", "visible"]
        customData = {
            string userDocBrief = '''This attribute controls visibility for geometry with purpose
        "render".'''
        }
    )
}

class "PrimvarsAPI" (
    customData = {
        string userDocBrief = """UsdGeomPrimvarsAPI encodes geometric \\"primitive variables\\",
    as UsdGeomPrimvar, which interpolate across a primitive's topology,
    can override shader inputs, and inherit down namespace."""
    }
)
{
}

class "Xformable" (
    customData = {
        string userDocBrief = """Base class for all transformable prims, which allows arbitrary
    sequences of component affine transformations to be encoded."""
    }
)
{
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class Scope "Scope" (
    customData = {
        string userDocBrief = """Scope is the simplest grouping primitive, and does not carry the
    baggage of transformability."""
    }
)
{
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
}

class Xform "Xform" (
    customData = {
        string userDocBrief = "Concrete prim schema for a transform, which implements Xformable."
    }
)
{
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class "Boundable" (
    customData = {
        string userDocBrief = """Boundable introduces the ability for a prim to persistently
    cache a rectilinear, local-space, extent."""
    }
)
{
    float3[] extent (
        customData = {
            string userDocBrief = """Extent is a three dimensional range measuring the geometric
        extent of the authored gprim in its own local space (i.e."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class "Gprim" (
    customData = {
        string userDocBrief = "Base class for all geometric primitives."
    }
)
{
    uniform bool doubleSided = 0 (
        customData = {
            string userDocBrief = """Although some renderers treat all parametric or polygonal
        surfaces as if they were effectively laminae with outward-facing
        normals on both sides, some renderers derive significant optimizations
        by considering these surfaces to have only a single outward side,
        typically determined by control-point winding order and/or 
        orientation."""
        }
    )
    float3[] extent (
        customData = {
            string userDocBrief = """Extent is a three dimensional range measuring the geometric
        extent of the authored gprim in its own local space (i.e."""
        }
    )
    uniform token orientation = "rightHanded" (
        allowedTokens = ["rightHanded", "leftHanded"]
        customData = {
            string userDocBrief = """Orientation specifies whether the gprim's surface normal 
        should be computed using the right hand rule, or the left hand rule."""
        }
    )
    color3f[] primvars:displayColor (
        customData = {
            string userDocBrief = '''It is useful to have an "official" colorSet that can be used
        as a display or modeling color, even in the absence of any specified
        shader for a gprim.'''
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies opacity, broken
        out as an independent attribute rather than an rgba color, both so that
        each can be independently overridden, and because shaders rarely consume
        rgba parameters."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class Cube "Cube" (
    customData = {
        string userDocBrief = "Defines a primitive rectilinear cube centered at the origin."
    }
)
{
    uniform bool doubleSided = 0 (
        customData = {
            string userDocBrief = """Although some renderers treat all parametric or polygonal
        surfaces as if they were effectively laminae with outward-facing
        normals on both sides, some renderers derive significant optimizations
        by considering these surfaces to have only a single outward side,
        typically determined by control-point winding order and/or 
        orientation."""
        }
    )
    float3[] extent = [(-1, -1, -1), (1, 1, 1)] (
        customData = {
            string userDocBrief = "Extent is re-defined on Cube only to provide a fallback value."
        }
    )
    uniform token orientation = "rightHanded" (
        allowedTokens = ["rightHanded", "leftHanded"]
        customData = {
            string userDocBrief = """Orientation specifies whether the gprim's surface normal 
        should be computed using the right hand rule, or the left hand rule."""
        }
    )
    color3f[] primvars:displayColor (
        customData = {
            string userDocBrief = '''It is useful to have an "official" colorSet that can be used
        as a display or modeling color, even in the absence of any specified
        shader for a gprim.'''
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies opacity, broken
        out as an independent attribute rather than an rgba color, both so that
        each can be independently overridden, and because shaders rarely consume
        rgba parameters."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    double size = 2 (
        customData = {
            string userDocBrief = "Indicates the length of each edge of the cube."
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class Sphere "Sphere" (
    customData = {
        string userDocBrief = "Defines a primitive sphere centered at the origin."
    }
)
{
    uniform bool doubleSided = 0 (
        customData = {
            string userDocBrief = """Although some renderers treat all parametric or polygonal
        surfaces as if they were effectively laminae with outward-facing
        normals on both sides, some renderers derive significant optimizations
        by considering these surfaces to have only a single outward side,
        typically determined by control-point winding order and/or 
        orientation."""
        }
    )
    float3[] extent = [(-1, -1, -1), (1, 1, 1)] (
        customData = {
            string userDocBrief = """Extent is re-defined on Sphere only to provide a fallback
        value."""
        }
    )
    uniform token orientation = "rightHanded" (
        allowedTokens = ["rightHanded", "leftHanded"]
        customData = {
            string userDocBrief = """Orientation specifies whether the gprim's surface normal 
        should be computed using the right hand rule, or the left hand rule."""
        }
    )
    color3f[] primvars:displayColor (
        customData = {
            string userDocBrief = '''It is useful to have an "official" colorSet that can be used
        as a display or modeling color, even in the absence of any specified
        shader for a gprim.'''
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies opacity, broken
        out as an independent attribute rather than an rgba color, both so that
        each can be independently overridden, and because shaders rarely consume
        rgba parameters."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    double radius = 1 (
        customData = {
            string userDocBrief = "Indicates the sphere's radius."
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class Cylinder "Cylinder" (
    customData = {
        string userDocBrief = """Defines a primitive cylinder with closed ends, centered at the 
    origin, whose spine is along the specified axis."""
    }
)
{
    uniform token axis = "Z" (
        allowedTokens = ["X", "Y", "Z"]
        customData = {
            string userDocBrief = "The axis along which the spine of the cylinder is aligned."
        }
    )
    uniform bool doubleSided = 0 (
        customData = {
            string userDocBrief = """Although some renderers treat all parametric or polygonal
        surfaces as if they were effectively laminae with outward-facing
        normals on both sides, some renderers derive significant optimizations
        by considering these surfaces to have only a single outward side,
        typically determined by control-point winding order and/or 
        orientation."""
        }
    )
    float3[] extent = [(-1, -1, -1), (1, 1, 1)] (
        customData = {
            string userDocBrief = """Extent is re-defined on Cylinder only to provide a fallback
        value."""
        }
    )
    double height = 2 (
        customData = {
            string userDocBrief = """The size of the cylinder's spine along the specified
        axis."""
        }
    )
    uniform token orientation = "rightHanded" (
        allowedTokens = ["rightHanded", "leftHanded"]
        customData = {
            string userDocBrief = """Orientation specifies whether the gprim's surface normal 
        should be computed using the right hand rule, or the left hand rule."""
        }
    )
    color3f[] primvars:displayColor (
        customData = {
            string userDocBrief = '''It is useful to have an "official" colorSet that can be used
        as a display or modeling color, even in the absence of any specified
        shader for a gprim.'''
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies opacity, broken
        out as an independent attribute rather than an rgba color, both so that
        each can be independently overridden, and because shaders rarely consume
        rgba parameters."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    double radius = 1 (
        customData = {
            string userDocBrief = "The radius of the cylinder."
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class Capsule "Capsule" (
    customData = {
        string userDocBrief = "Defines a primitive capsule, i.e."
    }
)
{
    uniform token axis = "Z" (
        allowedTokens = ["X", "Y", "Z"]
        customData = {
            string userDocBrief = "The axis along which the spine of the capsule is aligned."
        }
    )
    uniform bool doubleSided = 0 (
        customData = {
            string userDocBrief = """Although some renderers treat all parametric or polygonal
        surfaces as if they were effectively laminae with outward-facing
        normals on both sides, some renderers derive significant optimizations
        by considering these surfaces to have only a single outward side,
        typically determined by control-point winding order and/or 
        orientation."""
        }
    )
    float3[] extent = [(-0.5, -0.5, -1), (0.5, 0.5, 1)] (
        customData = {
            string userDocBrief = """Extent is re-defined on Capsule only to provide a fallback
        value."""
        }
    )
    double height = 1 (
        customData = {
            string userDocBrief = """The length of the capsule's spine along the specified
        axis excluding the size of the two half spheres, i.e."""
        }
    )
    uniform token orientation = "rightHanded" (
        allowedTokens = ["rightHanded", "leftHanded"]
        customData = {
            string userDocBrief = """Orientation specifies whether the gprim's surface normal 
        should be computed using the right hand rule, or the left hand rule."""
        }
    )
    color3f[] primvars:displayColor (
        customData = {
            string userDocBrief = '''It is useful to have an "official" colorSet that can be used
        as a display or modeling color, even in the absence of any specified
        shader for a gprim.'''
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies opacity, broken
        out as an independent attribute rather than an rgba color, both so that
        each can be independently overridden, and because shaders rarely consume
        rgba parameters."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    double radius = 0.5 (
        customData = {
            string userDocBrief = "The radius of the capsule."
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class Cone "Cone" (
    customData = {
        string userDocBrief = """Defines a primitive cone, centered at the origin, whose spine
    is along the specified axis, with the apex of the cone pointing
    in the direction of the positive axis."""
    }
)
{
    uniform token axis = "Z" (
        allowedTokens = ["X", "Y", "Z"]
        customData = {
            string userDocBrief = "The axis along which the spine of the cone is aligned."
        }
    )
    uniform bool doubleSided = 0 (
        customData = {
            string userDocBrief = """Although some renderers treat all parametric or polygonal
        surfaces as if they were effectively laminae with outward-facing
        normals on both sides, some renderers derive significant optimizations
        by considering these surfaces to have only a single outward side,
        typically determined by control-point winding order and/or 
        orientation."""
        }
    )
    float3[] extent = [(-1, -1, -1), (1, 1, 1)] (
        customData = {
            string userDocBrief = """Extent is re-defined on Cone only to provide a fallback
        value."""
        }
    )
    double height = 2 (
        customData = {
            string userDocBrief = """The length of the cone's spine along the specified
        axis."""
        }
    )
    uniform token orientation = "rightHanded" (
        allowedTokens = ["rightHanded", "leftHanded"]
        customData = {
            string userDocBrief = """Orientation specifies whether the gprim's surface normal 
        should be computed using the right hand rule, or the left hand rule."""
        }
    )
    color3f[] primvars:displayColor (
        customData = {
            string userDocBrief = '''It is useful to have an "official" colorSet that can be used
        as a display or modeling color, even in the absence of any specified
        shader for a gprim.'''
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies opacity, broken
        out as an independent attribute rather than an rgba color, both so that
        each can be independently overridden, and because shaders rarely consume
        rgba parameters."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    double radius = 1 (
        customData = {
            string userDocBrief = "The radius of the cone."
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class Cylinder_1 "Cylinder_1" (
    customData = {
        string userDocBrief = """Defines a primitive cylinder with closed ends, centered at the
    origin, whose spine is along the specified axis, with a pair of radii
    describing the size of the end points."""
    }
)
{
    uniform token axis = "Z" (
        allowedTokens = ["X", "Y", "Z"]
        customData = {
            string userDocBrief = "The axis along which the spine of the cylinder is aligned."
        }
    )
    uniform bool doubleSided = 0 (
        customData = {
            string userDocBrief = """Although some renderers treat all parametric or polygonal
        surfaces as if they were effectively laminae with outward-facing
        normals on both sides, some renderers derive significant optimizations
        by considering these surfaces to have only a single outward side,
        typically determined by control-point winding order and/or 
        orientation."""
        }
    )
    float3[] extent = [(-1, -1, -1), (1, 1, 1)] (
        customData = {
            string userDocBrief = """Extent is re-defined on Cylinder only to provide a fallback
        value."""
        }
    )
    double height = 2 (
        customData = {
            string userDocBrief = """The length of the cylinder's spine along the specified
        axis."""
        }
    )
    uniform token orientation = "rightHanded" (
        allowedTokens = ["rightHanded", "leftHanded"]
        customData = {
            string userDocBrief = """Orientation specifies whether the gprim's surface normal 
        should be computed using the right hand rule, or the left hand rule."""
        }
    )
    color3f[] primvars:displayColor (
        customData = {
            string userDocBrief = '''It is useful to have an "official" colorSet that can be used
        as a display or modeling color, even in the absence of any specified
        shader for a gprim.'''
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies opacity, broken
        out as an independent attribute rather than an rgba color, both so that
        each can be independently overridden, and because shaders rarely consume
        rgba parameters."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    double radiusBottom = 1 (
        customData = {
            string userDocBrief = "The radius of the bottom of the cylinder - i.e."
        }
    )
    double radiusTop = 1 (
        customData = {
            string userDocBrief = "The radius of the top of the cylinder - i.e."
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class Capsule_1 "Capsule_1" (
    customData = {
        string userDocBrief = "Defines a primitive capsule, i.e."
    }
)
{
    uniform token axis = "Z" (
        allowedTokens = ["X", "Y", "Z"]
        customData = {
            string userDocBrief = "The axis along which the spine of the capsule is aligned."
        }
    )
    uniform bool doubleSided = 0 (
        customData = {
            string userDocBrief = """Although some renderers treat all parametric or polygonal
        surfaces as if they were effectively laminae with outward-facing
        normals on both sides, some renderers derive significant optimizations
        by considering these surfaces to have only a single outward side,
        typically determined by control-point winding order and/or 
        orientation."""
        }
    )
    float3[] extent = [(-0.5, -0.5, -1), (0.5, 0.5, 1)] (
        customData = {
            string userDocBrief = """Extent is re-defined on Capsule only to provide a fallback
        value."""
        }
    )
    double height = 1 (
        customData = {
            string userDocBrief = """The length of the capsule's spine along the specified
        axis excluding the size of the two half spheres, i.e."""
        }
    )
    uniform token orientation = "rightHanded" (
        allowedTokens = ["rightHanded", "leftHanded"]
        customData = {
            string userDocBrief = """Orientation specifies whether the gprim's surface normal 
        should be computed using the right hand rule, or the left hand rule."""
        }
    )
    color3f[] primvars:displayColor (
        customData = {
            string userDocBrief = '''It is useful to have an "official" colorSet that can be used
        as a display or modeling color, even in the absence of any specified
        shader for a gprim.'''
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies opacity, broken
        out as an independent attribute rather than an rgba color, both so that
        each can be independently overridden, and because shaders rarely consume
        rgba parameters."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    double radiusBottom = 0.5 (
        customData = {
            string userDocBrief = """The radius of the capping sphere at the bottom of the capsule -
        i.e."""
        }
    )
    double radiusTop = 0.5 (
        customData = {
            string userDocBrief = """The radius of the capping sphere at the top of the capsule -
        i.e."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class Plane "Plane" (
    customData = {
        string userDocBrief = """Defines a primitive plane, centered at the origin, and is defined by
    a cardinal axis, width, and length."""
    }
)
{
    uniform token axis = "Z" (
        allowedTokens = ["X", "Y", "Z"]
        customData = {
            string userDocBrief = "The axis along which the surface of the plane is aligned."
        }
    )
    uniform bool doubleSided = 1 (
        customData = {
            string userDocBrief = "Planes are double-sided by default."
        }
    )
    float3[] extent = [(-1, -1, 0), (1, 1, 0)] (
        customData = {
            string userDocBrief = """Extent is re-defined on Plane only to provide a fallback
        value."""
        }
    )
    double length = 2 (
        customData = {
            string userDocBrief = """The length of the plane, which aligns to the y-axis when axis is
        'Z' or 'X', or to the z-axis when axis is 'Y'."""
        }
    )
    uniform token orientation = "rightHanded" (
        allowedTokens = ["rightHanded", "leftHanded"]
        customData = {
            string userDocBrief = """Orientation specifies whether the gprim's surface normal 
        should be computed using the right hand rule, or the left hand rule."""
        }
    )
    color3f[] primvars:displayColor (
        customData = {
            string userDocBrief = '''It is useful to have an "official" colorSet that can be used
        as a display or modeling color, even in the absence of any specified
        shader for a gprim.'''
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies opacity, broken
        out as an independent attribute rather than an rgba color, both so that
        each can be independently overridden, and because shaders rarely consume
        rgba parameters."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    double width = 2 (
        customData = {
            string userDocBrief = """The width of the plane, which aligns to the x-axis when axis is
        'Z' or 'Y', or to the z-axis when axis is 'X'."""
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class "PointBased" (
    customData = {
        string userDocBrief = """Base class for all UsdGeomGprims that possess points,
    providing common attributes such as normals and velocities."""
    }
)
{
    vector3f[] accelerations (
        customData = {
            string userDocBrief = """If provided, 'accelerations' should be used with
        velocities to compute positions between samples for the 'points'
        attribute rather than interpolating between neighboring 'points'
        samples."""
        }
    )
    uniform bool doubleSided = 0 (
        customData = {
            string userDocBrief = """Although some renderers treat all parametric or polygonal
        surfaces as if they were effectively laminae with outward-facing
        normals on both sides, some renderers derive significant optimizations
        by considering these surfaces to have only a single outward side,
        typically determined by control-point winding order and/or 
        orientation."""
        }
    )
    float3[] extent (
        customData = {
            string userDocBrief = """Extent is a three dimensional range measuring the geometric
        extent of the authored gprim in its own local space (i.e."""
        }
    )
    normal3f[] normals (
        customData = {
            string userDocBrief = """Provide an object-space orientation for individual points, 
        which, depending on subclass, may define a surface, curve, or free 
        points."""
        }
    )
    uniform token orientation = "rightHanded" (
        allowedTokens = ["rightHanded", "leftHanded"]
        customData = {
            string userDocBrief = """Orientation specifies whether the gprim's surface normal 
        should be computed using the right hand rule, or the left hand rule."""
        }
    )
    point3f[] points (
        customData = {
            string userDocBrief = """The primary geometry attribute for all PointBased
        primitives, describes points in (local) space."""
        }
    )
    color3f[] primvars:displayColor (
        customData = {
            string userDocBrief = '''It is useful to have an "official" colorSet that can be used
        as a display or modeling color, even in the absence of any specified
        shader for a gprim.'''
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies opacity, broken
        out as an independent attribute rather than an rgba color, both so that
        each can be independently overridden, and because shaders rarely consume
        rgba parameters."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    vector3f[] velocities (
        customData = {
            string userDocBrief = """If provided, 'velocities' should be used by renderers to 

        compute positions between samples for the 'points' attribute, rather
        than interpolating between neighboring 'points' samples."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class Mesh "Mesh" (
    customData = {
        string userDocBrief = "Encodes a mesh with optional subdivision properties and features."
    }
)
{
    vector3f[] accelerations (
        customData = {
            string userDocBrief = """If provided, 'accelerations' should be used with
        velocities to compute positions between samples for the 'points'
        attribute rather than interpolating between neighboring 'points'
        samples."""
        }
    )
    int[] cornerIndices = [] (
        customData = {
            string userDocBrief = """The indices of points for which a corresponding sharpness
        value is specified in _cornerSharpnesses_ (so the size of this array
        must match that of _cornerSharpnesses_)."""
        }
    )
    float[] cornerSharpnesses = [] (
        customData = {
            string userDocBrief = """The sharpness values associated with a corresponding set of
        points specified in _cornerIndices_ (so the size of this array must
        match that of _cornerIndices_)."""
        }
    )
    int[] creaseIndices = [] (
        customData = {
            string userDocBrief = """The indices of points grouped into sets of successive pairs
        that identify edges to be creased."""
        }
    )
    int[] creaseLengths = [] (
        customData = {
            string userDocBrief = """The length of this array specifies the number of creases
        (sets of adjacent sharpened edges) on the mesh."""
        }
    )
    float[] creaseSharpnesses = [] (
        customData = {
            string userDocBrief = "The per-crease or per-edge sharpness values for all creases."
        }
    )
    uniform bool doubleSided = 0 (
        customData = {
            string userDocBrief = """Although some renderers treat all parametric or polygonal
        surfaces as if they were effectively laminae with outward-facing
        normals on both sides, some renderers derive significant optimizations
        by considering these surfaces to have only a single outward side,
        typically determined by control-point winding order and/or 
        orientation."""
        }
    )
    float3[] extent (
        customData = {
            string userDocBrief = """Extent is a three dimensional range measuring the geometric
        extent of the authored gprim in its own local space (i.e."""
        }
    )
    token faceVaryingLinearInterpolation = "cornersPlus1" (
        allowedTokens = ["none", "cornersOnly", "cornersPlus1", "cornersPlus2", "boundaries", "all"]
        customData = {
            string userDocBrief = '''Specifies how elements of a primvar of interpolation type
        "faceVarying" are interpolated for subdivision surfaces.'''
        }
    )
    int[] faceVertexCounts (
        customData = {
            string userDocBrief = """Provides the number of vertices in each face of the mesh, 
        which is also the number of consecutive indices in _faceVertexIndices_
        that define the face."""
        }
    )
    int[] faceVertexIndices (
        customData = {
            string userDocBrief = """Flat list of the index (into the _points_ attribute) of each
        vertex of each face in the mesh."""
        }
    )
    int[] holeIndices = [] (
        customData = {
            string userDocBrief = """The indices of all faces that should be treated as holes,
        i.e."""
        }
    )
    token interpolateBoundary = "edgeAndCorner" (
        allowedTokens = ["none", "edgeOnly", "edgeAndCorner"]
        customData = {
            string userDocBrief = """Specifies how subdivision is applied for faces adjacent to
        boundary edges and boundary points."""
        }
    )
    normal3f[] normals (
        customData = {
            string userDocBrief = """Provide an object-space orientation for individual points, 
        which, depending on subclass, may define a surface, curve, or free 
        points."""
        }
    )
    uniform token orientation = "rightHanded" (
        allowedTokens = ["rightHanded", "leftHanded"]
        customData = {
            string userDocBrief = """Orientation specifies whether the gprim's surface normal 
        should be computed using the right hand rule, or the left hand rule."""
        }
    )
    point3f[] points (
        customData = {
            string userDocBrief = """The primary geometry attribute for all PointBased
        primitives, describes points in (local) space."""
        }
    )
    color3f[] primvars:displayColor (
        customData = {
            string userDocBrief = '''It is useful to have an "official" colorSet that can be used
        as a display or modeling color, even in the absence of any specified
        shader for a gprim.'''
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies opacity, broken
        out as an independent attribute rather than an rgba color, both so that
        each can be independently overridden, and because shaders rarely consume
        rgba parameters."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    uniform token subdivisionScheme = "catmullClark" (
        allowedTokens = ["catmullClark", "loop", "bilinear", "none"]
        customData = {
            string userDocBrief = "The subdivision scheme to be applied to the surface."
        }
    )
    token triangleSubdivisionRule = "catmullClark" (
        allowedTokens = ["catmullClark", "smooth"]
        customData = {
            string userDocBrief = """Specifies an option to the subdivision rules for the
        Catmull-Clark scheme to try and improve undesirable artifacts when
        subdividing triangles."""
        }
    )
    vector3f[] velocities (
        customData = {
            string userDocBrief = """If provided, 'velocities' should be used by renderers to 

        compute positions between samples for the 'points' attribute, rather
        than interpolating between neighboring 'points' samples."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class TetMesh "TetMesh" (
    customData = {
        string userDocBrief = "Encodes a tetrahedral mesh."
    }
)
{
    vector3f[] accelerations (
        customData = {
            string userDocBrief = """If provided, 'accelerations' should be used with
        velocities to compute positions between samples for the 'points'
        attribute rather than interpolating between neighboring 'points'
        samples."""
        }
    )
    uniform bool doubleSided = 0 (
        customData = {
            string userDocBrief = """Although some renderers treat all parametric or polygonal
        surfaces as if they were effectively laminae with outward-facing
        normals on both sides, some renderers derive significant optimizations
        by considering these surfaces to have only a single outward side,
        typically determined by control-point winding order and/or 
        orientation."""
        }
    )
    float3[] extent (
        customData = {
            string userDocBrief = """Extent is a three dimensional range measuring the geometric
        extent of the authored gprim in its own local space (i.e."""
        }
    )
    normal3f[] normals (
        customData = {
            string userDocBrief = """Provide an object-space orientation for individual points, 
        which, depending on subclass, may define a surface, curve, or free 
        points."""
        }
    )
    uniform token orientation = "rightHanded" (
        allowedTokens = ["rightHanded", "leftHanded"]
        customData = {
            string userDocBrief = """Orientation specifies whether the gprim's surface normal 
        should be computed using the right hand rule, or the left hand rule."""
        }
    )
    point3f[] points (
        customData = {
            string userDocBrief = """The primary geometry attribute for all PointBased
        primitives, describes points in (local) space."""
        }
    )
    color3f[] primvars:displayColor (
        customData = {
            string userDocBrief = '''It is useful to have an "official" colorSet that can be used
        as a display or modeling color, even in the absence of any specified
        shader for a gprim.'''
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies opacity, broken
        out as an independent attribute rather than an rgba color, both so that
        each can be independently overridden, and because shaders rarely consume
        rgba parameters."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    int3[] surfaceFaceVertexIndices (
        customData = {
            string userDocBrief = """<b>surfaceFaceVertexIndices</b> defines the triangle
        surface faces indices wrt."""
        }
    )
    int4[] tetVertexIndices (
        customData = {
            string userDocBrief = """Flat list of the index (into the <b>points</b> attribute) of 
        each vertex of each tetrahedron in the mesh."""
        }
    )
    vector3f[] velocities (
        customData = {
            string userDocBrief = """If provided, 'velocities' should be used by renderers to 

        compute positions between samples for the 'points' attribute, rather
        than interpolating between neighboring 'points' samples."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class GeomSubset "GeomSubset" (
    customData = {
        string userDocBrief = "Encodes a subset of a piece of geometry (i.e."
    }
)
{
    uniform token elementType = "face" (
        allowedTokens = ["face", "point", "edge", "segment", "tetrahedron"]
        customData = {
            string userDocBrief = "The type of element that the indices target."
        }
    )
    uniform token familyName = "" (
        customData = {
            string userDocBrief = "The name of the family of subsets that this subset belongs to."
        }
    )
    int[] indices = [] (
        customData = {
            string userDocBrief = """The set of indices identifying elements included in this
        subset."""
        }
    )
}

class NurbsPatch "NurbsPatch" (
    customData = {
        string userDocBrief = """Encodes a rational or polynomial non-uniform B-spline
    surface, with optional trim curves."""
    }
)
{
    vector3f[] accelerations (
        customData = {
            string userDocBrief = """If provided, 'accelerations' should be used with
        velocities to compute positions between samples for the 'points'
        attribute rather than interpolating between neighboring 'points'
        samples."""
        }
    )
    uniform bool doubleSided = 0 (
        customData = {
            string userDocBrief = """Although some renderers treat all parametric or polygonal
        surfaces as if they were effectively laminae with outward-facing
        normals on both sides, some renderers derive significant optimizations
        by considering these surfaces to have only a single outward side,
        typically determined by control-point winding order and/or 
        orientation."""
        }
    )
    float3[] extent (
        customData = {
            string userDocBrief = """Extent is a three dimensional range measuring the geometric
        extent of the authored gprim in its own local space (i.e."""
        }
    )
    normal3f[] normals (
        customData = {
            string userDocBrief = """Provide an object-space orientation for individual points, 
        which, depending on subclass, may define a surface, curve, or free 
        points."""
        }
    )
    uniform token orientation = "rightHanded" (
        allowedTokens = ["rightHanded", "leftHanded"]
        customData = {
            string userDocBrief = """Orientation specifies whether the gprim's surface normal 
        should be computed using the right hand rule, or the left hand rule."""
        }
    )
    point3f[] points (
        customData = {
            string userDocBrief = """The primary geometry attribute for all PointBased
        primitives, describes points in (local) space."""
        }
    )
    double[] pointWeights (
        customData = {
            string userDocBrief = '''Optionally provides "w" components for each control point,
        thus must be the same length as the points attribute.'''
        }
    )
    color3f[] primvars:displayColor (
        customData = {
            string userDocBrief = '''It is useful to have an "official" colorSet that can be used
        as a display or modeling color, even in the absence of any specified
        shader for a gprim.'''
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies opacity, broken
        out as an independent attribute rather than an rgba color, both so that
        each can be independently overridden, and because shaders rarely consume
        rgba parameters."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    int[] trimCurve:counts (
        customData = {
            string userDocBrief = '''Each element specifies how many curves are present in each
        "loop" of the trimCurve, and the length of the array determines how
        many loops the trimCurve contains.'''
        }
    )
    double[] trimCurve:knots (
        customData = {
            string userDocBrief = """Flat list of parametric values for each of the
        nCurves curves."""
        }
    )
    int[] trimCurve:orders (
        customData = {
            string userDocBrief = "Flat list of orders for each of the nCurves curves."
        }
    )
    double3[] trimCurve:points (
        customData = {
            string userDocBrief = """Flat list of homogeneous 2D points (u, v, w) that comprise
        the nCurves curves."""
        }
    )
    double2[] trimCurve:ranges (
        customData = {
            string userDocBrief = """Flat list of minimum and maximum parametric values 
        (as defined by knots) for each of the nCurves curves."""
        }
    )
    int[] trimCurve:vertexCounts (
        customData = {
            string userDocBrief = """Flat list of number of vertices for each of the
         nCurves curves."""
        }
    )
    uniform token uForm = "open" (
        allowedTokens = ["open", "closed", "periodic"]
        customData = {
            string userDocBrief = """Interpret the control grid and knot vectors as representing
        an open, geometrically closed, or geometrically closed and C2 continuous
        surface along the U dimension."""
        }
    )
    double[] uKnots (
        customData = {
            string userDocBrief = "Knot vector for U direction providing U parameterization."
        }
    )
    int uOrder (
        customData = {
            string userDocBrief = "Order in the U direction."
        }
    )
    double2 uRange (
        customData = {
            string userDocBrief = """Provides the minimum and maximum parametric values (as defined
        by uKnots) over which the surface is actually defined."""
        }
    )
    int uVertexCount (
        customData = {
            string userDocBrief = "Number of vertices in the U direction."
        }
    )
    vector3f[] velocities (
        customData = {
            string userDocBrief = """If provided, 'velocities' should be used by renderers to 

        compute positions between samples for the 'points' attribute, rather
        than interpolating between neighboring 'points' samples."""
        }
    )
    uniform token vForm = "open" (
        allowedTokens = ["open", "closed", "periodic"]
        customData = {
            string userDocBrief = """Interpret the control grid and knot vectors as representing
        an open, geometrically closed, or geometrically closed and C2 continuous
        surface along the V dimension."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    double[] vKnots (
        customData = {
            string userDocBrief = "Knot vector for V direction providing U parameterization."
        }
    )
    int vOrder (
        customData = {
            string userDocBrief = "Order in the V direction."
        }
    )
    double2 vRange (
        customData = {
            string userDocBrief = """Provides the minimum and maximum parametric values (as defined
        by vKnots) over which the surface is actually defined."""
        }
    )
    int vVertexCount (
        customData = {
            string userDocBrief = "Number of vertices in the V direction."
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class "Curves" (
    customData = {
        string userDocBrief = """Base class for UsdGeomBasisCurves, UsdGeomNurbsCurves, and
             UsdGeomHermiteCurves."""
    }
)
{
    vector3f[] accelerations (
        customData = {
            string userDocBrief = """If provided, 'accelerations' should be used with
        velocities to compute positions between samples for the 'points'
        attribute rather than interpolating between neighboring 'points'
        samples."""
        }
    )
    int[] curveVertexCounts (
        customData = {
            string userDocBrief = """Curves-derived primitives can represent multiple distinct,
        potentially disconnected curves."""
        }
    )
    uniform bool doubleSided = 0 (
        customData = {
            string userDocBrief = """Although some renderers treat all parametric or polygonal
        surfaces as if they were effectively laminae with outward-facing
        normals on both sides, some renderers derive significant optimizations
        by considering these surfaces to have only a single outward side,
        typically determined by control-point winding order and/or 
        orientation."""
        }
    )
    float3[] extent (
        customData = {
            string userDocBrief = """Extent is a three dimensional range measuring the geometric
        extent of the authored gprim in its own local space (i.e."""
        }
    )
    normal3f[] normals (
        customData = {
            string userDocBrief = """Provide an object-space orientation for individual points, 
        which, depending on subclass, may define a surface, curve, or free 
        points."""
        }
    )
    uniform token orientation = "rightHanded" (
        allowedTokens = ["rightHanded", "leftHanded"]
        customData = {
            string userDocBrief = """Orientation specifies whether the gprim's surface normal 
        should be computed using the right hand rule, or the left hand rule."""
        }
    )
    point3f[] points (
        customData = {
            string userDocBrief = """The primary geometry attribute for all PointBased
        primitives, describes points in (local) space."""
        }
    )
    color3f[] primvars:displayColor (
        customData = {
            string userDocBrief = '''It is useful to have an "official" colorSet that can be used
        as a display or modeling color, even in the absence of any specified
        shader for a gprim.'''
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies opacity, broken
        out as an independent attribute rather than an rgba color, both so that
        each can be independently overridden, and because shaders rarely consume
        rgba parameters."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    vector3f[] velocities (
        customData = {
            string userDocBrief = """If provided, 'velocities' should be used by renderers to 

        compute positions between samples for the 'points' attribute, rather
        than interpolating between neighboring 'points' samples."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    float[] widths (
        customData = {
            string userDocBrief = '''Provides width specification for the curves, whose application
        will depend on whether the curve is oriented (normals are defined for
        it), in which case widths are "ribbon width", or unoriented, in which
        case widths are cylinder width.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class BasisCurves "BasisCurves" (
    customData = {
        string userDocBrief = """BasisCurves are a batched curve representation analogous to the
    classic RIB definition via Basis and Curves statements."""
    }
)
{
    vector3f[] accelerations (
        customData = {
            string userDocBrief = """If provided, 'accelerations' should be used with
        velocities to compute positions between samples for the 'points'
        attribute rather than interpolating between neighboring 'points'
        samples."""
        }
    )
    uniform token basis = "bezier" (
        allowedTokens = ["bezier", "bspline", "catmullRom"]
        customData = {
            string userDocBrief = """The basis specifies the vstep and matrix used for cubic 
        interpolation."""
        }
    )
    int[] curveVertexCounts (
        customData = {
            string userDocBrief = """Curves-derived primitives can represent multiple distinct,
        potentially disconnected curves."""
        }
    )
    uniform bool doubleSided = 0 (
        customData = {
            string userDocBrief = """Although some renderers treat all parametric or polygonal
        surfaces as if they were effectively laminae with outward-facing
        normals on both sides, some renderers derive significant optimizations
        by considering these surfaces to have only a single outward side,
        typically determined by control-point winding order and/or 
        orientation."""
        }
    )
    float3[] extent (
        customData = {
            string userDocBrief = """Extent is a three dimensional range measuring the geometric
        extent of the authored gprim in its own local space (i.e."""
        }
    )
    normal3f[] normals (
        customData = {
            string userDocBrief = """Provide an object-space orientation for individual points, 
        which, depending on subclass, may define a surface, curve, or free 
        points."""
        }
    )
    uniform token orientation = "rightHanded" (
        allowedTokens = ["rightHanded", "leftHanded"]
        customData = {
            string userDocBrief = """Orientation specifies whether the gprim's surface normal 
        should be computed using the right hand rule, or the left hand rule."""
        }
    )
    point3f[] points (
        customData = {
            string userDocBrief = """The primary geometry attribute for all PointBased
        primitives, describes points in (local) space."""
        }
    )
    color3f[] primvars:displayColor (
        customData = {
            string userDocBrief = '''It is useful to have an "official" colorSet that can be used
        as a display or modeling color, even in the absence of any specified
        shader for a gprim.'''
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies opacity, broken
        out as an independent attribute rather than an rgba color, both so that
        each can be independently overridden, and because shaders rarely consume
        rgba parameters."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    uniform token type = "cubic" (
        allowedTokens = ["linear", "cubic"]
        customData = {
            string userDocBrief = "Linear curves interpolate linearly between two vertices."
        }
    )
    vector3f[] velocities (
        customData = {
            string userDocBrief = """If provided, 'velocities' should be used by renderers to 

        compute positions between samples for the 'points' attribute, rather
        than interpolating between neighboring 'points' samples."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    float[] widths (
        customData = {
            string userDocBrief = '''Provides width specification for the curves, whose application
        will depend on whether the curve is oriented (normals are defined for
        it), in which case widths are "ribbon width", or unoriented, in which
        case widths are cylinder width.'''
        }
    )
    uniform token wrap = "nonperiodic" (
        allowedTokens = ["nonperiodic", "periodic", "pinned"]
        customData = {
            string userDocBrief = """If wrap is set to periodic, the curve when rendered will 
        repeat the initial vertices (dependent on the vstep) to close the
        curve."""
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class NurbsCurves "NurbsCurves" (
    customData = {
        string userDocBrief = """This schema is analagous to NURBS Curves in packages like Maya
    and Houdini, often used for interchange of rigging and modeling curves."""
    }
)
{
    vector3f[] accelerations (
        customData = {
            string userDocBrief = """If provided, 'accelerations' should be used with
        velocities to compute positions between samples for the 'points'
        attribute rather than interpolating between neighboring 'points'
        samples."""
        }
    )
    int[] curveVertexCounts (
        customData = {
            string userDocBrief = """Curves-derived primitives can represent multiple distinct,
        potentially disconnected curves."""
        }
    )
    uniform bool doubleSided = 0 (
        customData = {
            string userDocBrief = """Although some renderers treat all parametric or polygonal
        surfaces as if they were effectively laminae with outward-facing
        normals on both sides, some renderers derive significant optimizations
        by considering these surfaces to have only a single outward side,
        typically determined by control-point winding order and/or 
        orientation."""
        }
    )
    float3[] extent (
        customData = {
            string userDocBrief = """Extent is a three dimensional range measuring the geometric
        extent of the authored gprim in its own local space (i.e."""
        }
    )
    double[] knots (
        customData = {
            string userDocBrief = "Knot vector providing curve parameterization."
        }
    )
    normal3f[] normals (
        customData = {
            string userDocBrief = """Provide an object-space orientation for individual points, 
        which, depending on subclass, may define a surface, curve, or free 
        points."""
        }
    )
    int[] order = [] (
        customData = {
            string userDocBrief = "Order of the curve."
        }
    )
    uniform token orientation = "rightHanded" (
        allowedTokens = ["rightHanded", "leftHanded"]
        customData = {
            string userDocBrief = """Orientation specifies whether the gprim's surface normal 
        should be computed using the right hand rule, or the left hand rule."""
        }
    )
    point3f[] points (
        customData = {
            string userDocBrief = """The primary geometry attribute for all PointBased
        primitives, describes points in (local) space."""
        }
    )
    double[] pointWeights (
        customData = {
            string userDocBrief = '''Optionally provides "w" components for each control point,
        thus must be the same length as the points attribute.'''
        }
    )
    color3f[] primvars:displayColor (
        customData = {
            string userDocBrief = '''It is useful to have an "official" colorSet that can be used
        as a display or modeling color, even in the absence of any specified
        shader for a gprim.'''
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies opacity, broken
        out as an independent attribute rather than an rgba color, both so that
        each can be independently overridden, and because shaders rarely consume
        rgba parameters."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    double2[] ranges (
        customData = {
            string userDocBrief = """Provides the minimum and maximum parametric values (as defined
        by knots) over which the curve is actually defined."""
        }
    )
    vector3f[] velocities (
        customData = {
            string userDocBrief = """If provided, 'velocities' should be used by renderers to 

        compute positions between samples for the 'points' attribute, rather
        than interpolating between neighboring 'points' samples."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    float[] widths (
        customData = {
            string userDocBrief = '''Provides width specification for the curves, whose application
        will depend on whether the curve is oriented (normals are defined for
        it), in which case widths are "ribbon width", or unoriented, in which
        case widths are cylinder width.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class Points "Points" (
    customData = {
        string userDocBrief = 'Points are analogous to the <A HREF="https://renderman.pixar.com/resources/RenderMan_20/appnote.18.html">RiPoints spec</A>.'
    }
)
{
    vector3f[] accelerations (
        customData = {
            string userDocBrief = """If provided, 'accelerations' should be used with
        velocities to compute positions between samples for the 'points'
        attribute rather than interpolating between neighboring 'points'
        samples."""
        }
    )
    uniform bool doubleSided = 0 (
        customData = {
            string userDocBrief = """Although some renderers treat all parametric or polygonal
        surfaces as if they were effectively laminae with outward-facing
        normals on both sides, some renderers derive significant optimizations
        by considering these surfaces to have only a single outward side,
        typically determined by control-point winding order and/or 
        orientation."""
        }
    )
    float3[] extent (
        customData = {
            string userDocBrief = """Extent is a three dimensional range measuring the geometric
        extent of the authored gprim in its own local space (i.e."""
        }
    )
    int64[] ids (
        customData = {
            string userDocBrief = """Ids are optional; if authored, the ids array should be the same
                 length as the points array, specifying (at each timesample if
                 point identities are changing) the id of each point."""
        }
    )
    normal3f[] normals (
        customData = {
            string userDocBrief = """Provide an object-space orientation for individual points, 
        which, depending on subclass, may define a surface, curve, or free 
        points."""
        }
    )
    uniform token orientation = "rightHanded" (
        allowedTokens = ["rightHanded", "leftHanded"]
        customData = {
            string userDocBrief = """Orientation specifies whether the gprim's surface normal 
        should be computed using the right hand rule, or the left hand rule."""
        }
    )
    point3f[] points (
        customData = {
            string userDocBrief = """The primary geometry attribute for all PointBased
        primitives, describes points in (local) space."""
        }
    )
    color3f[] primvars:displayColor (
        customData = {
            string userDocBrief = '''It is useful to have an "official" colorSet that can be used
        as a display or modeling color, even in the absence of any specified
        shader for a gprim.'''
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies opacity, broken
        out as an independent attribute rather than an rgba color, both so that
        each can be independently overridden, and because shaders rarely consume
        rgba parameters."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    vector3f[] velocities (
        customData = {
            string userDocBrief = """If provided, 'velocities' should be used by renderers to 

        compute positions between samples for the 'points' attribute, rather
        than interpolating between neighboring 'points' samples."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    float[] widths (
        customData = {
            string userDocBrief = """Widths are defined as the diameter of the points, in 
                 object space."""
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class PointInstancer "PointInstancer" (
    customData = {
        string userDocBrief = """Encodes vectorized instancing of multiple, potentially
    animated, prototypes (object/instance masters), which can be arbitrary
    prims/subtrees on a UsdStage."""
    }
)
{
    vector3f[] accelerations (
        customData = {
            string userDocBrief = """If authored, per-instance 'accelerations' will be used with
        velocities to compute positions between samples for the 'positions'
        attribute rather than interpolating between neighboring 'positions'
        samples."""
        }
    )
    vector3f[] angularVelocities (
        customData = {
            string userDocBrief = """If authored, per-instance angular velocity vector to be used for
      interoplating orientations."""
        }
    )
    float3[] extent (
        customData = {
            string userDocBrief = """Extent is a three dimensional range measuring the geometric
        extent of the authored gprim in its own local space (i.e."""
        }
    )
    int64[] ids (
        customData = {
            string userDocBrief = """Ids are optional; if authored, the ids array should be the same
      length as the protoIndices array, specifying (at each timeSample if
      instance identities are changing) the id of each instance."""
        }
    )
    int64[] invisibleIds = [] (
        customData = {
            string userDocBrief = "A list of id's to make invisible at the evaluation time."
        }
    )
    quath[] orientations (
        customData = {
            string userDocBrief = """If authored, per-instance orientation of each instance about its 
      prototype's origin, represented as a unit length quaternion, which
      allows us to encode it with sufficient precision in a compact GfQuath."""
        }
    )
    quatf[] orientationsf (
        customData = {
            string userDocBrief = """If authored, per-instance orientation of each instance about its 
      prototype's origin, represented as a unit length quaternion, encoded
      as a GfQuatf to support higher precision computations."""
        }
    )
    point3f[] positions (
        customData = {
            string userDocBrief = "<b>Required property</b>."
        }
    )
    int[] protoIndices (
        customData = {
            string userDocBrief = "<b>Required property</b>."
        }
    )
    rel prototypes (
        customData = {
            string userDocBrief = "<b>Required property</b>."
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    float3[] scales (
        customData = {
            string userDocBrief = """If authored, per-instance scale to be applied to 
      each instance, before any rotation is applied."""
        }
    )
    vector3f[] velocities (
        customData = {
            string userDocBrief = """If provided, per-instance 'velocities' will be used to 
       compute positions between samples for the 'positions' attribute,
       rather than interpolating between neighboring 'positions' samples."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class Camera "Camera" (
    customData = {
        string userDocBrief = "Transformable camera."
    }
)
{
    float4[] clippingPlanes = [] (
        customData = {
            string userDocBrief = "Additional, arbitrarily oriented clipping planes."
        }
    )
    float2 clippingRange = (1, 1000000) (
        customData = {
            string userDocBrief = """Near and far clipping distances in scene units; see 
                 ."""
        }
    )
    float exposure = 0 (
        customData = {
            string userDocBrief = "Exposure compensation, as a log base-2 value."
        }
    )
    float exposure:fStop = 1 (
        customData = {
            string userDocBrief = "f-stop of the aperture when calculating exposure."
        }
    )
    float exposure:iso = 100 (
        customData = {
            string userDocBrief = "The speed rating of the sensor or film when calculating exposure."
        }
    )
    float exposure:responsivity = 1 (
        customData = {
            string userDocBrief = """Scalar multiplier representing overall responsivity of the 
                 sensor system to light when calculating exposure."""
        }
    )
    float exposure:time = 1 (
        customData = {
            string userDocBrief = "Time in seconds that the sensor is exposed to light when calculating exposure."
        }
    )
    float focalLength = 50 (
        customData = {
            string userDocBrief = """Perspective focal length in tenths of a scene unit; see 
                 ."""
        }
    )
    float focusDistance = 0 (
        customData = {
            string userDocBrief = """Distance from the camera to the focus plane in scene units; see 
                 ."""
        }
    )
    float fStop = 0 (
        customData = {
            string userDocBrief = "Lens aperture."
        }
    )
    float horizontalAperture = 20.955 (
        customData = {
            string userDocBrief = """Horizontal aperture in tenths of a scene unit; see 
                 \\\\ref UsdGeom_CameraUnits."""
        }
    )
    float horizontalApertureOffset = 0 (
        customData = {
            string userDocBrief = """Horizontal aperture offset in the same units as
                 horizontalAperture."""
        }
    )
    token projection = "perspective" (
        allowedTokens = ["perspective", "orthographic"]
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    double shutter:close = 0 (
        customData = {
            string userDocBrief = """Frame relative shutter close time, analogous comments from
                 shutter:open apply."""
        }
    )
    double shutter:open = 0 (
        customData = {
            string userDocBrief = """Frame relative shutter open time in UsdTimeCode units (negative
                 value indicates that the shutter opens before the current
                 frame time)."""
        }
    )
    uniform token stereoRole = "mono" (
        allowedTokens = ["mono", "left", "right"]
        customData = {
            string userDocBrief = """If different from mono, the camera is intended to be the left
                 or right camera of a stereo setup."""
        }
    )
    float verticalAperture = 15.2908 (
        customData = {
            string userDocBrief = """Vertical aperture in tenths of a scene unit; see 
                 \\\\ref UsdGeom_CameraUnits."""
        }
    )
    float verticalApertureOffset = 0 (
        customData = {
            string userDocBrief = """Vertical aperture offset in the same units as
                 verticalAperture."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class "GeomModelAPI" (
    customData = {
        string userDocBrief = """UsdGeomModelAPI extends the generic UsdModelAPI schema with
    geometry specific concepts such as cached extents for the entire model,
    constraint targets, and geometry-inspired extensions to the payload
    lofting process."""
    }
)
{
    uniform bool model:applyDrawMode = 0 (
        customData = {
            string userDocBrief = """If true, and the resolved value of model:drawMode is
                 non-default, apply an alternate imaging mode to this prim."""
        }
    )
    uniform token model:cardGeometry = "cross" (
        allowedTokens = ["cross", "box", "fromTexture"]
        customData = {
            string userDocBrief = """The geometry to generate for imaging prims inserted for \\\\em
                 cards imaging mode."""
        }
    )
    asset model:cardTextureXNeg (
        customData = {
            string userDocBrief = "In cards imaging mode, the texture applied to the X- quad."
        }
    )
    asset model:cardTextureXPos (
        customData = {
            string userDocBrief = "In cards imaging mode, the texture applied to the X+ quad."
        }
    )
    asset model:cardTextureYNeg (
        customData = {
            string userDocBrief = "In cards imaging mode, the texture applied to the Y- quad."
        }
    )
    asset model:cardTextureYPos (
        customData = {
            string userDocBrief = "In cards imaging mode, the texture applied to the Y+ quad."
        }
    )
    asset model:cardTextureZNeg (
        customData = {
            string userDocBrief = "In cards imaging mode, the texture applied to the Z- quad."
        }
    )
    asset model:cardTextureZPos (
        customData = {
            string userDocBrief = "In cards imaging mode, the texture applied to the Z+ quad."
        }
    )
    uniform token model:cardVisibility = "inherited" (
        allowedTokens = ["full", "simple", "inherited"]
        customData = {
            string userDocBrief = """When using the cards imaging mode, determines if cards
                 in the upAxis direction should be visible."""
        }
    )
    uniform token model:drawMode = "inherited" (
        allowedTokens = ["origin", "bounds", "cards", "default", "inherited"]
        customData = {
            string userDocBrief = """Alternate imaging mode; applied to this prim or child prims
                 where model:applyDrawMode is true, or where the prim
                 has kind component and model:applyDrawMode is not
                 authored."""
        }
    )
    uniform float3 model:drawModeColor = (0.18, 0.18, 0.18) (
        customData = {
            string userDocBrief = """The base color of imaging prims inserted for alternate
                 imaging modes."""
        }
    )
}

class "MotionAPI" (
    customData = {
        string userDocBrief = '''UsdGeomMotionAPI encodes data that can live on any prim that
    may affect computations involving:
    - computed motion for motion blur
    - sampling for motion blur
    
    The "motion:blurScale" attribute allows
    artists to scale the __amount__ of motion blur to be rendered for parts
    of the scene without changing the recorded animation.'''
    }
)
{
    float motion:blurScale = 1 (
        customData = {
            string userDocBrief = """BlurScale is an __inherited__ float attribute that stipulates
        the rendered motion blur (as typically specified via UsdGeomCamera's
        _shutter:open_ and _shutter:close_ properties) should be scaled for
        __all objects__ at and beneath the prim in namespace on which the
        _motion:blurScale_ value is specified."""
        }
    )
    int motion:nonlinearSampleCount = 3 (
        customData = {
            string userDocBrief = """Determines the number of position or transformation samples
        created when motion is described by attributes contributing non-linear
        terms."""
        }
    )
    float motion:velocityScale = 1 (
        customData = {
            string userDocBrief = """\\\\deprecated
        
        VelocityScale is an **inherited** float attribute that
        velocity-based schemas (e.g."""
        }
    )
}

class "XformCommonAPI" (
    customData = {
        string userDocBrief = """This class provides API for authoring and retrieving a standard set
    of component transformations which include a scale, a rotation, a 
    scale-rotate pivot and a translation."""
    }
)
{
}

class HermiteCurves "HermiteCurves" (
    customData = {
        string userDocBrief = """This schema specifies a cubic hermite interpolated curve batch as
    sometimes used for defining guides for animation."""
    }
)
{
    vector3f[] accelerations (
        customData = {
            string userDocBrief = """If provided, 'accelerations' should be used with
        velocities to compute positions between samples for the 'points'
        attribute rather than interpolating between neighboring 'points'
        samples."""
        }
    )
    int[] curveVertexCounts (
        customData = {
            string userDocBrief = """Curves-derived primitives can represent multiple distinct,
        potentially disconnected curves."""
        }
    )
    uniform bool doubleSided = 0 (
        customData = {
            string userDocBrief = """Although some renderers treat all parametric or polygonal
        surfaces as if they were effectively laminae with outward-facing
        normals on both sides, some renderers derive significant optimizations
        by considering these surfaces to have only a single outward side,
        typically determined by control-point winding order and/or 
        orientation."""
        }
    )
    float3[] extent (
        customData = {
            string userDocBrief = """Extent is a three dimensional range measuring the geometric
        extent of the authored gprim in its own local space (i.e."""
        }
    )
    normal3f[] normals (
        customData = {
            string userDocBrief = """Provide an object-space orientation for individual points, 
        which, depending on subclass, may define a surface, curve, or free 
        points."""
        }
    )
    uniform token orientation = "rightHanded" (
        allowedTokens = ["rightHanded", "leftHanded"]
        customData = {
            string userDocBrief = """Orientation specifies whether the gprim's surface normal 
        should be computed using the right hand rule, or the left hand rule."""
        }
    )
    point3f[] points (
        customData = {
            string userDocBrief = """The primary geometry attribute for all PointBased
        primitives, describes points in (local) space."""
        }
    )
    color3f[] primvars:displayColor (
        customData = {
            string userDocBrief = '''It is useful to have an "official" colorSet that can be used
        as a display or modeling color, even in the absence of any specified
        shader for a gprim.'''
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies opacity, broken
        out as an independent attribute rather than an rgba color, both so that
        each can be independently overridden, and because shaders rarely consume
        rgba parameters."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    vector3f[] tangents = [] (
        customData = {
            string userDocBrief = "Defines the outgoing trajectory tangent for each point."
        }
    )
    vector3f[] velocities (
        customData = {
            string userDocBrief = """If provided, 'velocities' should be used by renderers to 

        compute positions between samples for the 'points' attribute, rather
        than interpolating between neighboring 'points' samples."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    float[] widths (
        customData = {
            string userDocBrief = '''Provides width specification for the curves, whose application
        will depend on whether the curve is oriented (normals are defined for
        it), in which case widths are "ribbon width", or unoriented, in which
        case widths are cylinder width.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class "BackPlateAPI" (
    customData = {
        string userDocBrief = "This schema specifies a back plate i.e."
    }
)
{
    asset backPlate:__INSTANCE_NAME__:alpha:image = @@ (
        customData = {
            string userDocBrief = """Asset path to the file containing a texture or sequence of 
        textures."""
        }
    )
    float backPlate:__INSTANCE_NAME__:depth:cameraSpaceOffset = 0
    asset backPlate:__INSTANCE_NAME__:depth:image = @@ (
        customData = {
            string userDocBrief = """Asset path to the file containing a texture or sequence of 
        textures."""
        }
    )
    float backPlate:__INSTANCE_NAME__:depth:minOffset = 0
    float backPlate:__INSTANCE_NAME__:depth:normalizingFactor = 1
    asset backPlate:__INSTANCE_NAME__:image = @@ (
        customData = {
            string userDocBrief = """Asset path to the file containing a texture or sequence of 
        textures."""
        }
    )
    float3 backPlate:__INSTANCE_NAME__:luma:gain = (1, 1, 1)
    float3 backPlate:__INSTANCE_NAME__:luma:gamma = (1, 1, 1)
    float3 backPlate:__INSTANCE_NAME__:luma:lift = (0, 0, 0)
    token backPlate:__INSTANCE_NAME__:plateVisibility = "solo" (
        allowedTokens = ["all", "solo", "mute"]
        customData = {
            string userDocBrief = """Toggles the visibility of the back plate to all cameras, only 
        the owning camera, or no cameras."""
        }
    )
    float3 backPlate:__INSTANCE_NAME__:rotateXYZ:tweak = (0, 0, 0)
    float2 backPlate:__INSTANCE_NAME__:scale:tweak = (1, 1)
    float3 backPlate:__INSTANCE_NAME__:translate:tweak = (0, 0, 0)
}

`;ze.GetInstance().RegisterPlugins(qP,{usdGeom:{"generatedSchema.usda":HP}});function G(i,e,t){const s=i.getAttr(e);if(s)return t!==void 0?s.getValueAtTime(t):s.getValue()}function pf(i,e,t){const s=i.getAttr(e);if(!(!s||!s.hasAuthoredValue()))return t!==void 0?s.getValueAtTime(t):s.getValue()}function yn(i){if(i==null)return null;if(i instanceof Float32Array)return i;if(Array.isArray(i)&&i.length>0){if(Array.isArray(i[0])){const e=[];for(const t of i)for(const s of t)e.push(s);return new Float32Array(e)}return new Float32Array(i.map(Number))}return null}function jh(i){return i==null?null:i instanceof Int32Array?i:Array.isArray(i)?new Int32Array(i.map(Number)):null}function KP(i){if(!Array.isArray(i)||i.length<2)return null;const e=Array.isArray(i[0])?i[0]:[Number(i[0]),0,0],t=Array.isArray(i[1])?i[1]:[Number(i[1]),0,0];return[[Math.fround(Number(e[0]??0)),Math.fround(Number(e[1]??0)),Math.fround(Number(e[2]??0))],[Math.fround(Number(t[0]??0)),Math.fround(Number(t[1]??0)),Math.fround(Number(t[2]??0))]]}function Le(i,e){return typeof i=="number"?i:e}function Hn(i,e){return typeof i=="string"?i:e}function ZP(i,e){return typeof i=="boolean"?i:e}function xs(i){return Array.isArray(i)&&i.length>=3?[Number(i[0]),Number(i[1]),Number(i[2])]:[0,0,0]}function us(i){return typeof i=="number"?i:Array.isArray(i)&&typeof i[0]=="number"?i[0]:0}function $c(i){if(Array.isArray(i)&&i.length>=4){const e=Number(i[0]),t=Number(i[1]),s=Number(i[2]),n=Number(i[3]);return[e,t,s,n]}return[1,0,0,0]}function YP(i){if(Array.isArray(i)&&i.length===4&&Array.isArray(i[0])){const e=[];for(const t of i)for(const s of t)e.push(Number(s));return e}return Array.isArray(i)&&i.length===16?i.map(Number):null}const XP=["default","render","proxy","guide"];function ca(i){if(i==="/"||!i.startsWith("/"))return null;const e=i.lastIndexOf("/");return e===0?"/":i.slice(0,e)}class Xe extends wi{getVisibilityAttr(){return this._attr("visibility","token")}getPurposeAttr(){return this._attr("purpose","uniform token")}makeInvisible(){this.getVisibilityAttr().set("invisible")}makeVisible(){Xe.getVisibility(this._prim)==="invisible"&&this.getVisibilityAttr().set("inherited");let e=!1;const t=s=>{const n=ca(s);if(!n)return;t(n);const r=this._stage.getPrim(n);if(!r?.isA("Imageable"))return;const o=new Xe(this._stage._primHandle(n),this._stage);if(Xe.getVisibility(r)==="invisible"&&(o.getVisibilityAttr().set("inherited"),e=!0),!!e)for(const a of this._stage.getAllChildPrimPaths(n)){if(a===s)continue;this._stage.getPrim(a)?.isA("Imageable")&&new Xe(this._stage._primHandle(a),this._stage).getVisibilityAttr().set("invisible")}};t(this._prim.path)}static getVisibility(e,t){return Hn(G(e,"visibility",t),"inherited")}static getPurpose(e){return Hn(G(e,"purpose"),"default")}static computeVisibility(e,t,s){let n=t;for(;n&&n!=="/";){const r=e.getPrim(n);if(r&&Xe.getVisibility(r,s)==="invisible")return"invisible";n=ca(n)}return"inherited"}static computePurpose(e,t){let s=t;for(;s&&s!=="/";){const n=e.getPrim(s),r=n?pf(n,"purpose"):void 0;if(typeof r=="string"&&XP.includes(r))return r;s=ca(s)}return"default"}}class Lc extends Xe{addTranslateOp(e){return this._addOp(e?`xformOp:translate:${e}`:"xformOp:translate","double3")}addTranslateXOp(e){return this._addOp(e?`xformOp:translateX:${e}`:"xformOp:translateX","double")}addTranslateYOp(e){return this._addOp(e?`xformOp:translateY:${e}`:"xformOp:translateY","double")}addTranslateZOp(e){return this._addOp(e?`xformOp:translateZ:${e}`:"xformOp:translateZ","double")}addScaleOp(e){return this._addOp(e?`xformOp:scale:${e}`:"xformOp:scale","float3")}addScaleXOp(e){return this._addOp(e?`xformOp:scaleX:${e}`:"xformOp:scaleX","float")}addScaleYOp(e){return this._addOp(e?`xformOp:scaleY:${e}`:"xformOp:scaleY","float")}addScaleZOp(e){return this._addOp(e?`xformOp:scaleZ:${e}`:"xformOp:scaleZ","float")}addRotateXYZOp(e){return this._addOp(e?`xformOp:rotateXYZ:${e}`:"xformOp:rotateXYZ","float3")}addRotateXZYOp(e){return this._addOp(e?`xformOp:rotateXZY:${e}`:"xformOp:rotateXZY","float3")}addRotateYXZOp(e){return this._addOp(e?`xformOp:rotateYXZ:${e}`:"xformOp:rotateYXZ","float3")}addRotateYZXOp(e){return this._addOp(e?`xformOp:rotateYZX:${e}`:"xformOp:rotateYZX","float3")}addRotateZXYOp(e){return this._addOp(e?`xformOp:rotateZXY:${e}`:"xformOp:rotateZXY","float3")}addRotateZYXOp(e){return this._addOp(e?`xformOp:rotateZYX:${e}`:"xformOp:rotateZYX","float3")}addRotateXOp(e){return this._addOp(e?`xformOp:rotateX:${e}`:"xformOp:rotateX","float")}addRotateYOp(e){return this._addOp(e?`xformOp:rotateY:${e}`:"xformOp:rotateY","float")}addRotateZOp(e){return this._addOp(e?`xformOp:rotateZ:${e}`:"xformOp:rotateZ","float")}addOrientOp(e){return this._addOp(e?`xformOp:orient:${e}`:"xformOp:orient","quatf")}addTransformOp(e){return this._addOp(e?`xformOp:transform:${e}`:"xformOp:transform","matrix4d")}_addOp(e,t){const s=this._attr(e,t);return this._appendXformOp(e),s}_appendXformOp(e){const t=this._stage.getEditTarget().getLayer(),s=`${this._prim.path}.xformOpOrder`;t.setField(s,"typeName","uniform token[]");const n=t.getField(s,"default")??[];n.includes(e)||this._prim.attr("xformOpOrder").set([...n,e])}}function QP(i,e,t){switch(i){case"translate":{const[s,n,r]=xs(e);return yr(t?-s:s,t?-n:n,t?-r:r)}case"translateX":return yr(us(e)*(t?-1:1),0,0);case"translateY":return yr(0,us(e)*(t?-1:1),0);case"translateZ":return yr(0,0,us(e)*(t?-1:1));case"scale":{const[s,n,r]=xs(e);return t?fn(1/s,1/n,1/r):fn(s,n,r)}case"scaleX":{const s=us(e);return fn(t?1/s:s,1,1)}case"scaleY":{const s=us(e);return fn(1,t?1/s:s,1)}case"scaleZ":{const s=us(e);return fn(1,1,t?1/s:s)}case"rotateX":return st(us(e)*(t?-1:1));case"rotateY":return it(us(e)*(t?-1:1));case"rotateZ":return nt(us(e)*(t?-1:1));case"rotateXYZ":{const[s,n,r]=xs(e);return t?V(nt(-r),V(it(-n),st(-s))):V(st(s),V(it(n),nt(r)))}case"rotateXZY":{const[s,n,r]=xs(e);return t?V(it(-n),V(nt(-r),st(-s))):V(st(s),V(nt(r),it(n)))}case"rotateYXZ":{const[s,n,r]=xs(e);return t?V(nt(-r),V(st(-s),it(-n))):V(it(n),V(st(s),nt(r)))}case"rotateYZX":{const[s,n,r]=xs(e);return t?V(st(-s),V(nt(-r),it(-n))):V(it(n),V(nt(r),st(s)))}case"rotateZXY":{const[s,n,r]=xs(e);return t?V(it(-n),V(st(-s),nt(-r))):V(nt(r),V(st(s),it(n)))}case"rotateZYX":{const[s,n,r]=xs(e);return t?V(st(-s),V(it(-n),nt(-r))):V(nt(r),V(it(n),st(s)))}case"orient":{const[s,n,r,o]=$c(e);return t?Qr(s,-n,-r,-o):Qr(s,n,r,o)}case"transform":{const s=YP(e),n=s||[...Tt];return t?as(n):n}default:return[...Tt]}}function ff(i,e){const t=G(i,"xformOpOrder",e),s=Array.isArray(t)?t:[];let n=[...Tt],r=!1;for(let o=s.length-1;o>=0;o--){const a=s[o];if(a==="!resetXformStack!"){r=!0;break}const c=a.startsWith("!invert!"),l=c?a.slice(8):a,u=l.split(":")[1]??"",h=G(i,l,e);if(h===void 0)continue;const d=QP(u,h,c);n=V(n,d)}return{matrix:n,resetsXformStack:r}}const mf=new Map;function gf(i,e){mf.set(i,e)}function JP(i,e){const[t,s]=i,r=[[t[0],t[1],t[2]],[t[0],t[1],s[2]],[t[0],s[1],t[2]],[t[0],s[1],s[2]],[s[0],t[1],t[2]],[s[0],t[1],s[2]],[s[0],s[1],t[2]],[s[0],s[1],s[2]]].map(o=>sn(e,o[0],o[1],o[2]));return[[Math.min(...r.map(o=>o[0])),Math.min(...r.map(o=>o[1])),Math.min(...r.map(o=>o[2]))],[Math.max(...r.map(o=>o[0])),Math.max(...r.map(o=>o[1])),Math.max(...r.map(o=>o[2]))]]}function Wh(i){return[i[0].map(Math.fround),i[1].map(Math.fround)]}function xi(i,e,t){const s=[i,i,i];return s[t==="X"?0:t==="Y"?1:2]=e,[[-s[0],-s[1],-s[2]],[s[0],s[1],s[2]]]}class Gs extends Lc{getExtentAttr(){return this._attr("extent","float3[]")}static getExtent(e,t){return KP(pf(e,"extent",t))}static computeExtentFromPlugins(e,t,s){const n=mf.get(e.typeName);if(n){const a=n(e,t,s);return a?Wh(a):null}const r=Hn(G(e,"axis"),"Z");let o;switch(e.typeName){case"Sphere":{const a=Le(G(e,"radius",t),1);o=xi(a,a,"Z");break}case"Cube":{const a=Le(G(e,"size",t),2)/2;o=xi(a,a,"Z");break}case"Cone":case"Cylinder":{const a=Le(G(e,"radius",t),1),c=Le(G(e,"height",t),2)/2;o=xi(a,c,r);break}case"Capsule":{const a=Le(G(e,"radius",t),.5),c=Le(G(e,"height",t),1)/2;o=xi(a,c+a,r);break}case"Cylinder_1":{const a=Math.max(Le(G(e,"radiusTop",t),1),Le(G(e,"radiusBottom",t),1)),c=Le(G(e,"height",t),2)/2;o=xi(a,c,r);break}case"Capsule_1":{const a=Le(G(e,"radiusTop",t),.5),c=Le(G(e,"radiusBottom",t),.5),l=Le(G(e,"height",t),1)/2,u=Math.max(a,c);o=xi(u,l+u,r);break}case"BasisCurves":case"HermiteCurves":case"NurbsCurves":{const a=yn(G(e,"points",t));if(!a)return null;o=Gs._pointExtent(a);const c=yn(G(e,"widths",t));let l=0;if(c)for(const h of c)l=Math.max(l,h);const u=l*.5;o=[[o[0][0]-u,o[0][1]-u,o[0][2]-u],[o[1][0]+u,o[1][1]+u,o[1][2]+u]];break}case"Points":{const a=yn(G(e,"points",t));if(!a)return null;const c=yn(G(e,"widths",t));if(!c){o=Gs._pointExtent(a);break}if(a.length!==c.length*3)return null;let l=Number.POSITIVE_INFINITY,u=Number.POSITIVE_INFINITY,h=Number.POSITIVE_INFINITY,d=Number.NEGATIVE_INFINITY,f=Number.NEGATIVE_INFINITY,p=Number.NEGATIVE_INFINITY;for(let y=0;y<c.length;y++){const m=c[y]*.5,g=y*3;l=Math.min(l,a[g]-m),u=Math.min(u,a[g+1]-m),h=Math.min(h,a[g+2]-m),d=Math.max(d,a[g]+m),f=Math.max(f,a[g+1]+m),p=Math.max(p,a[g+2]+m)}o=[[l,u,h],[d,f,p]];break}case"Mesh":case"NurbsPatch":case"TetMesh":{const a=yn(G(e,"points",t));if(!a)return null;o=Gs._pointExtent(a);break}default:return null}return Wh(s?JP(o,s):o)}static _pointExtent(e){let t=Number.POSITIVE_INFINITY,s=Number.POSITIVE_INFINITY,n=Number.POSITIVE_INFINITY,r=Number.NEGATIVE_INFINITY,o=Number.NEGATIVE_INFINITY,a=Number.NEGATIVE_INFINITY;for(let c=0;c+2<e.length;c+=3)t=Math.min(t,e[c]),s=Math.min(s,e[c+1]),n=Math.min(n,e[c+2]),r=Math.max(r,e[c]),o=Math.max(o,e[c+1]),a=Math.max(a,e[c+2]);return[[t,s,n],[r,o,a]]}static computeExtent(e,t){return Gs.getExtent(e,t)??Gs.computeExtentFromPlugins(e,t)}}const yf=new be().SetIdentity();yf.SetElement(2,2,.5);yf.SetElement(3,2,.5);class re extends wi{static typeName="GeomSubset";static define(e,t){const s=e.definePrim(t,re.typeName);return new re(s,e)}static createGeomSubset(e,t,s,n,r,o=""){const a=re.define(e,`${t}/${s}`);return a.getElementTypeAttr().set(n),a.getIndicesAttr().set(r),o&&a.getFamilyNameAttr().set(o),a}getElementTypeAttr(){return this._attr("elementType","uniform token")}getIndicesAttr(){return this._attr("indices","int[]")}getFamilyNameAttr(){return this._attr("familyName","uniform token")}static familyTypeAttrName(e){return`subsetFamily:${e}:familyType`}static is(e){return e.typeName===re.typeName}static getElementType(e){return Hn(G(e,"elementType"),"face")}static getIndices(e,t){return jh(G(e,"indices",t))??new Int32Array}static getFamilyName(e){return Hn(G(e,"familyName"),"")}static getAllGeomSubsets(e,t,s){const n=[];for(const r of e.getChildPrimPaths(t)){const o=e.getPrim(r);!o||!re.is(o)||s&&re.getElementType(o)!==s||n.push(o)}return n}static getGeomSubsets(e,t,s="",n=""){const r=[];for(const o of e.getChildPrimPaths(t)){const a=e.getPrim(o);!a||!re.is(a)||s&&re.getElementType(a)!==s||n&&re.getFamilyName(a)!==n||r.push(a)}return r}static setFamilyType(e,t,s,n){new re(e.definePrim(t),e)._attr(re.familyTypeAttrName(s),"uniform token").set(n)}static getFamilyType(e,t,s){const n=e.getPrim(t);if(!n)return"unrestricted";const r=G(n,re.familyTypeAttrName(s));return typeof r=="string"&&r?r:"unrestricted"}static getElementCount(e,t,s,n){if(s==="face"){const r=e.getPrim(t);if(!r)return 0;const o=jh(G(r,"faceVertexCounts",n));return o?o.length:0}return 0}static validateFamily(e,t,s,n){const r=re.getGeomSubsets(e,t,"",n),o=re.getFamilyType(e,t,n);for(const c of r){const l=re.getElementType(c);if(l!==s)return{valid:!1,reason:`GeomSubset at path <${c.path}> has elementType '${l}', which does not match '${s}'.`}}const a=re.getElementCount(e,t,s);return a===0?{valid:!1,reason:`Unable to determine element count for geom <${t}>.`}:re.validateSubsets(r,a,o)}static validateSubsets(e,t,s){if(s==="unrestricted")return{valid:!0,reason:""};const n=new Set;for(const r of e)for(const o of re.getIndices(r)){if(o<0||o>=t)return{valid:!1,reason:`index ${o} is out of range [0, ${t})`};if(n.has(o))return{valid:!1,reason:`index ${o} appears in multiple subsets`};n.add(o)}return s==="partition"&&n.size!==t?{valid:!1,reason:`partition covers ${n.size} of ${t} elements`}:{valid:!0,reason:""}}}function qh(i){if(i==="/"||!i.startsWith("/"))return null;const e=i.lastIndexOf("/");return e===0?"/":i.slice(0,e)}class _f{constructor(e,t){this._stage=e,this._time=t}_cache=new Map;get time(){return this._time}setTime(e){e!==this._time&&(this._time=e,this._cache.clear())}clear(){this._cache.clear()}getLocalTransformation(e){const t=this._stage.getPrim(e);return t?ff(t,this._time):{matrix:[...Tt],resetsXformStack:!1}}getLocalToWorldTransform(e){const t=this._cache.get(e);if(t)return t;const{matrix:s,resetsXformStack:n}=this.getLocalTransformation(e);let r;const o=qh(e);return n||!o||o==="/"?r=s:r=V(s,this.getLocalToWorldTransform(o)),this._cache.set(e,r),r}getParentToWorldTransform(e){const t=qh(e);return!t||t==="/"?[...Tt]:this.getLocalToWorldTransform(t)}}class Se extends Gs{static typeName="PointInstancer";static define(e,t){const s=e.definePrim(t,Se.typeName);return new Se(s,e)}static is(e){return e.typeName===Se.typeName}getProtoIndicesAttr(){return this._attr("protoIndices","int[]")}getIdsAttr(){return this._attr("ids","int64[]")}getPositionsAttr(){return this._attr("positions","point3f[]")}getOrientationsAttr(){return this._attr("orientations","quath[]")}getOrientationsfAttr(){return this._attr("orientationsf","quatf[]")}getScalesAttr(){return this._attr("scales","float3[]")}getVelocitiesAttr(){return this._attr("velocities","vector3f[]")}getAccelerationsAttr(){return this._attr("accelerations","vector3f[]")}getAngularVelocitiesAttr(){return this._attr("angularVelocities","vector3f[]")}getInvisibleIdsAttr(){return this._attr("invisibleIds","int64[]")}createPrototypesRel(){return this.prim.createRel("prototypes",[])}static getProtoIndices(e,t){const s=G(e,"protoIndices",t);return Array.isArray(s)?s.map(Number):[]}static getPositions(e,t){const s=G(e,"positions",t);return Array.isArray(s)?s:[]}static getOrientations(e,t){const s=G(e,"orientations",t);return Array.isArray(s)?s.map(n=>$c(n)):[]}static getScales(e,t){const s=G(e,"scales",t);return Array.isArray(s)?s:[]}static getVelocities(e,t){const s=G(e,"velocities",t);return Array.isArray(s)?s:[]}static getAccelerations(e,t){const s=G(e,"accelerations",t);return Array.isArray(s)?s:[]}static getInvisibleIds(e,t){const s=G(e,"invisibleIds",t);return Array.isArray(s)?s.map(Number):[]}static getIds(e,t){const s=G(e,"ids",t);return Array.isArray(s)?s.map(Number):[]}static getPrototypes(e){return e.getAttr("prototypes")?.getTargets()??[]}static computeMask(e,t){const s=Se.getIds(e,t),n=s.length>0?s.length:Se.getProtoIndices(e,t).length,r=new Set(Se.getInvisibleIds(e,t)),o=new Array(n);for(let a=0;a<n;a++){const c=s.length>0?s[a]:a;o[a]=!r.has(c)}return o}static computeInstanceTransforms(e,t={}){const{time:s,includeProtoXform:n=!1,stage:r,applyMask:o=!0}=t,a=Se.getProtoIndices(e,s),c=Se.getPositions(e,s),l=Se.getOrientations(e,s),u=Se.getScales(e,s),h=o?Se.computeMask(e,s):null,d=a.length;if(c.length!==d)return{xforms:[],protoIndices:[]};if(l.length>0&&l.length!==d)return{xforms:[],protoIndices:[]};if(u.length>0&&u.length!==d)return{xforms:[],protoIndices:[]};let f=null;n&&r&&(f=Se.getPrototypes(e).map(g=>{const S=r.getPrim(g);return S?ff(S,s).matrix:[...Tt]}));const p=[],y=[];for(let m=0;m<d;m++){if(h&&!h[m])continue;let g=[...Tt];const S=u[m];S&&(g[0]=S[0]??1,g[5]=S[1]??1,g[10]=S[2]??1);const _=l[m];if(_){const v=Qr(_[0],_[1],_[2],_[3]);g=S?V(g,v):v}const P=c[m];g[12]=P[0]??0,g[13]=P[1]??0,g[14]=P[2]??0;const w=a[m];f&&(g=V(f[w]??[...Tt],g)),p.push(g),y.push(w)}return{xforms:p,protoIndices:y}}}const ew="Y",tw=1;function sw(i){const e=i.getMetadata("upAxis");return e==="Y"||e==="Z"?e:ew}function iw(i){const e=i.getMetadata("metersPerUnit");return typeof e=="number"?e:tw}const nw={Plugins:[{Info:{SdfMetadata:{bindMaterialAs:{appliesTo:["relationships"],displayGroup:"Shading",documentation:"Metadata authored on collection-based material binding relationship to indicate the strength of the binding relative to bindings authored on descendant prims.",type:"token"},connectability:{appliesTo:["attributes"],default:"full",displayGroup:"Shading",documentation:`Metadata authored on UsdShadeInput's to specify what they can be connected to. Can be either "full" or "interfaceOnly". "full" implies that  the input can be connected to any other input or output.  "interfaceOnly" implies that the input can only connect to a NodeGraph Input (which represents an interface override, not a render-time dataflow connection), or another Input whose connectability is also "interfaceOnly".`,type:"token"},outputName:{appliesTo:["relationships"],displayGroup:"deprecated",type:"token"},renderType:{appliesTo:["properties"],displayGroup:"Rendering",type:"token"},sdrMetadata:{appliesTo:["prims","attributes"],displayGroup:"Shading",type:"dictionary"}},Types:{UsdShadeConnectableAPI:{alias:{UsdSchemaBase:"ConnectableAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ConnectableAPI",schemaKind:"nonAppliedAPI"},UsdShadeCoordSysAPI:{alias:{UsdSchemaBase:"CoordSysAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"CoordSysAPI",schemaKind:"multipleApplyAPI"},UsdShadeMaterial:{alias:{UsdSchemaBase:"Material"},autoGenerated:!0,bases:["UsdShadeNodeGraph"],providesUsdShadeConnectableAPIBehavior:!0,schemaIdentifier:"Material",schemaKind:"concreteTyped"},UsdShadeMaterialBindingAPI:{alias:{UsdSchemaBase:"MaterialBindingAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"MaterialBindingAPI",schemaKind:"singleApplyAPI"},UsdShadeNodeDefAPI:{alias:{UsdSchemaBase:"NodeDefAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"NodeDefAPI",schemaKind:"singleApplyAPI"},UsdShadeNodeGraph:{alias:{UsdSchemaBase:"NodeGraph"},autoGenerated:!0,bases:["UsdTyped"],providesUsdShadeConnectableAPIBehavior:!0,schemaIdentifier:"NodeGraph",schemaKind:"concreteTyped"},UsdShadeShader:{alias:{UsdSchemaBase:"Shader"},autoGenerated:!0,bases:["UsdTyped"],providesUsdShadeConnectableAPIBehavior:!0,schemaIdentifier:"Shader",schemaKind:"concreteTyped"},UsdShadeShaderDefParserPlugin:{bases:["SdrParserPlugin"],displayName:"USD-based shader definition parser plugin"}}},LibraryPath:"@PLUG_INFO_LIBRARY_PATH@",Name:"usdShade",ResourcePath:"@PLUG_INFO_RESOURCE_PATH@",Root:"@PLUG_INFO_ROOT@",Type:"library"}]},rw=`#usda 1.0
(
    "WARNING: THIS FILE IS GENERATED BY usdGenSchema.  DO NOT EDIT."
)

class NodeGraph "NodeGraph" (
    customData = {
        string userDocBrief = """A node-graph is a container for shading nodes, as well as other 
    node-graphs."""
    }
)
{
}

class Material "Material" (
    customData = {
        string userDocBrief = '''A Material provides a container into which multiple "render contexts"
    can add data that defines a "shading material" for a renderer.'''
    }
)
{
    token outputs:displacement (
        customData = {
            string userDocBrief = '''Represents the universal "displacement" output terminal of a 
        material.'''
        }
        displayGroup = "Outputs"
    )
    token outputs:surface (
        customData = {
            string userDocBrief = '''Represents the universal "surface" output terminal of a
        material.'''
        }
        displayGroup = "Outputs"
    )
    token outputs:volume (
        customData = {
            string userDocBrief = '''Represents the universal "volume" output terminal of a
        material.'''
        }
        displayGroup = "Outputs"
    )
}

class Shader "Shader" (
    apiSchemas = ["NodeDefAPI"]
    customData = {
        string userDocBrief = "Base class for all USD shaders."
    }
)
{
}

class "NodeDefAPI" (
    customData = {
        string userDocBrief = '''UsdShadeNodeDefAPI is an API schema that provides attributes
    for a prim to select a corresponding Shader Node Definition ("Sdr Node"),
    as well as to look up a runtime entry for that shader node in the
    form of an SdrShaderNode.'''
    }
)
{
    uniform token info:id (
        customData = {
            string userDocBrief = """The id is an identifier for the type or purpose of the 
        shader."""
        }
    )
    uniform token info:implementationSource = "id" (
        allowedTokens = ["id", "sourceAsset", "sourceCode"]
        customData = {
            string userDocBrief = """Specifies the attribute that should be consulted to get the 
        shader's implementation or its source code."""
        }
    )
}

class "ConnectableAPI" (
    customData = {
        string userDocBrief = """UsdShadeConnectableAPI is an API schema that provides a common
    interface for creating outputs and making connections between shading 
    parameters and outputs."""
    }
)
{
}

class "MaterialBindingAPI" (
    customData = {
        string userDocBrief = """UsdShadeMaterialBindingAPI is an API schema that provides an 
    interface for binding materials to prims or collections of prims 
    (represented by UsdCollectionAPI objects)."""
    }
)
{
}

class "CoordSysAPI" (
    customData = {
        string userDocBrief = """UsdShadeCoordSysAPI provides a way to designate, name,
    and discover coordinate systems."""
    }
)
{
    rel coordSys:__INSTANCE_NAME__:binding (
        customData = {
            string userDocBrief = "Prim binding expressing the appropriate coordinate systems."
        }
        displayName = "Bound Coordinate System"
    )
}

`;ze.GetInstance().RegisterPlugins(nw,{usdShade:{"generatedSchema.usda":rw}});const ow={isContainer:!1,requiresEncapsulation:!0,nodeType:"basic",outputsAreConnectable:!1},aw={isContainer:!0,requiresEncapsulation:!0,nodeType:"basic",outputsAreConnectable:!0},cw={isContainer:!0,requiresEncapsulation:!0,nodeType:"derivedContainer",outputsAreConnectable:!0};function so(i){switch(i?.typeName){case"Shader":return ow;case"NodeGraph":return aw;case"Material":return cw;default:return null}}function hi(i){const e=i.lastIndexOf("/");return e<=0?"/":i.slice(0,e)}function dc(i,e){return so(i.getPrim(e))?.isContainer??!1}function pc(i,e){const t=i.get(e)?.getField("connectability");return typeof t=="string"&&t.length>0?t:"full"}function vs(i){const e=i.lastIndexOf(".");if(e<=0)return null;const t=i.slice(0,e),s=i.slice(e+1);return s.startsWith("outputs:")?{primPath:t,name:s.slice(8),sourceType:"output"}:s.startsWith("inputs:")?{primPath:t,name:s.slice(7),sourceType:"input"}:{primPath:t,name:s,sourceType:"output"}}function mi(i){const e=i.sourceType==="input"?"inputs:":"outputs:";return`${i.primPath}.${e}${i.name}`}function io(i){return vs(typeof i=="string"?i:i.fullPath)}function Hh(i,e,t){return dc(i,t)?hi(e)!==t?{canConnect:!1,reason:`Encapsulation check failed - input source prim '${t}' is not the closest ancestor container of '${e}'.`}:{canConnect:!0}:{canConnect:!1,reason:`Encapsulation check failed - prim '${t}' owning the input source is not a container.`}}function lw(i,e,t,s){return s==="derivedContainer"?dc(i,e)?hi(t)!==e?{canConnect:!1,reason:`Encapsulation check failed - output source's prim '${t}' is not an immediate descendent of the input's prim '${e}'.`}:{canConnect:!0}:{canConnect:!1,reason:`Encapsulation check failed - prim '${e}' owning the input is not a container.`}:dc(i,hi(e))?hi(e)!==hi(t)?{canConnect:!1,reason:`Encapsulation check failed - input's prim '${e}' and source's prim '${t}' are not contained by the same container prim.`}:{canConnect:!0}:{canConnect:!1,reason:`Encapsulation check failed - immediate ancestor '${hi(e)}' of the input's prim is not a container.`}}function Kh(i,e,t){const s=vs(e);if(!s)return{canConnect:!1,reason:`Invalid input: ${e}`};const n=s.primPath,r=so(i.getPrim(n));if(!r)return{canConnect:!1,reason:`Prim '${n}' owning the input is not connectable.`};const o=t.primPath,a=i.getPrim(o);if(!a)return{canConnect:!1,reason:`Invalid source: ${mi(t)}`};if(!so(a))return{canConnect:!1,reason:`Prim '${o}' owning the source is not connectable.`};const l=r.requiresEncapsulation,u=pc(i,e);return u==="full"?t.sourceType==="input"?l?Hh(i,n,o):{canConnect:!0}:l?lw(i,n,o,r.nodeType):{canConnect:!0}:u==="interfaceOnly"?t.sourceType==="input"?pc(i,mi(t))==="interfaceOnly"?l?Hh(i,n,o):{canConnect:!0}:{canConnect:!1,reason:"Input connectability is 'interfaceOnly' and source does not have 'interfaceOnly' connectability."}:{canConnect:!1,reason:"Input connectability is 'interfaceOnly' but source is not an input."}:{canConnect:!1,reason:"Input connectability is unspecified."}}function Zh(i,e,t){const s=vs(e);if(!s)return{canConnect:!1,reason:`Invalid output: ${e}`};const n=s.primPath,r=so(i.getPrim(n));if(!r)return{canConnect:!1,reason:`Prim '${n}' owning the output is not connectable.`};if(!r.outputsAreConnectable)return{canConnect:!1,reason:`Outputs of prim '${n}' are not connectable.`};const o=t.primPath;if(!i.getPrim(o))return{canConnect:!1,reason:`Invalid source: ${mi(t)}`};const a=r.requiresEncapsulation;return t.sourceType==="input"?r.nodeType==="derivedContainer"?{canConnect:!1,reason:`Encapsulation check failed - passthrough usage is not allowed for output prim '${n}'.`}:o!==n?{canConnect:!1,reason:`Encapsulation check failed - output '${e}' and input source '${mi(t)}' must be encapsulated by the same container prim.`}:{canConnect:!0}:a&&hi(o)!==n?{canConnect:!1,reason:`Encapsulation check failed - prim owning the output '${e}' is not an immediate descendent of the prim owning the source '${mi(t)}'.`}:{canConnect:!0}}class Yh{constructor(e,t){this._prim=e,this.name=t}get attrName(){return`inputs:${this.name}`}get fullPath(){return`${this._prim.path}.${this.attrName}`}get attr(){return this._prim.attr(this.attrName)}set(e){this.attr.set(e)}get(){return this.attr.get()}setConnectability(e){this._prim.getStage().setPropertyField(this.fullPath,"connectability",e)}getConnectability(){return pc(this._prim.getStage(),this.fullPath)}canConnect(e){const t=io(e);return t?Kh(this._prim.getStage(),this.fullPath,t):{canConnect:!1,reason:"Invalid source."}}connectToSource(e){const t=io(e);return!t||!Kh(this._prim.getStage(),this.fullPath,t).canConnect?!1:(this.attr.connect(mi(t)),!0)}disconnectSource(){this.attr.setConnections([])}getConnectedSource(){const e=this.attr.getConnections();return e.length>0?vs(e[0]):null}hasConnectedSource(){return this.getConnectedSource()!==null}getValueProducingAttributes(e=!1){return Sf(this._prim.getStage(),this.fullPath,e)}}class Xh{constructor(e,t){this._prim=e,this.name=t}get attrName(){return`outputs:${this.name}`}get fullPath(){return`${this._prim.path}.${this.attrName}`}get attr(){return this._prim.attr(this.attrName)}canConnect(e){const t=io(e);return t?Zh(this._prim.getStage(),this.fullPath,t):{canConnect:!1,reason:"Invalid source."}}connectToSource(e){const t=io(e);return!t||!Zh(this._prim.getStage(),this.fullPath,t).canConnect?!1:(this.attr.connect(mi(t)),!0)}getConnectedSource(){const e=this.attr.getConnections();return e.length>0?vs(e[0]):null}getValueProducingAttributes(e=!1){return Sf(this._prim.getStage(),this.fullPath,e)}}class Vc extends wi{createInput(e,t){return this._attr(`inputs:${e}`,t),new Yh(this._prim,e)}createOutput(e,t="token"){return this._attr(`outputs:${e}`,t),new Xh(this._prim,e)}getInput(e){return new Yh(this._prim,e)}getOutput(e){return new Xh(this._prim,e)}}function fc(i){return i.attrNames.filter(e=>e.startsWith("inputs:")).map(e=>e.slice(7)).sort()}function uw(i){return i.attrNames.filter(e=>e.startsWith("outputs:")).map(e=>e.slice(8)).sort()}function Qh(i,e,t=32){let s=e,n=null;for(let r=0;r<t;r++){const a=i.get(s)?.getConnections()??[];if(a.length===0)return n;const c=vs(a[0]);if(!c)return n;n=c,s=a[0]}return n}function Sf(i,e,t=!1){const s=(n,r)=>{if(r.has(n))return[];const o=i.get(n);if(!o)return[];const a=o.getConnections();if(a.length>0){r.add(n);const u=a.flatMap(h=>s(h,r));return r.delete(n),u}const c=vs(n);if(!c)return[];if(t&&(c.sourceType!=="output"||i.getPrim(c.primPath)?.typeName!=="Shader"))return[];if(c.sourceType==="input"&&o.getValue()===void 0)return[];const l=n.lastIndexOf(".");return[i._primHandle(n.slice(0,l)).attr(n.slice(l+1))]};return s(e,new Set)}class yt extends Vc{static typeName="Shader";static define(e,t){const s=e.definePrim(t,yt.typeName);return new yt(s,e)}getIdAttr(){return this._attr("info:id","uniform token")}getImplementationSourceAttr(){return this._attr("info:implementationSource","uniform token")}setShaderId(e){this.getIdAttr().set(e)}getShaderId(){const e=this.getIdAttr().get();return typeof e=="string"?e:void 0}setSourceAsset(e,t="universal"){this._attr(`info:${t}:sourceAsset`,"uniform asset").set(e),this.getImplementationSourceAttr().set("sourceAsset")}getSourceAsset(e="universal"){const t=this._stage.getPrim(this.path);return yt.getSourceAsset(t,e)??(e==="universal"?void 0:yt.getSourceAsset(t,"universal")??void 0)}setSourceCode(e,t="universal"){this._attr(`info:${t}:sourceCode`,"uniform string").set(e),this.getImplementationSourceAttr().set("sourceCode")}getSourceCode(e="universal"){const t=s=>{const n=this._stage.getPrim(this.path)?.getAttr(`info:${s}:sourceCode`)?.getValue();return typeof n=="string"?n:void 0};return t(e)??(e==="universal"?void 0:t("universal"))}setSourceAssetSubIdentifier(e,t="universal"){this._attr(`info:${t}:sourceAsset:subIdentifier`,"uniform token").set(e),this.getImplementationSourceAttr().set("sourceAsset")}getSourceAssetSubIdentifier(e="universal"){const t=s=>{const n=this._stage.getPrim(this.path)?.getAttr(`info:${s}:sourceAsset:subIdentifier`)?.getValue();return typeof n=="string"?n:void 0};return t(e)??(e==="universal"?void 0:t("universal"))}getImplementationSource(){return yt.getImplementationSource(this._stage.getPrim(this.path))}static is(e){return e.typeName===yt.typeName}static getImplementationSource(e){const t=e.getAttr("info:implementationSource")?.getValue();return typeof t=="string"&&t.length>0?t:"id"}static getSourceAsset(e,t){const s=e.getAttr(`info:${t}:sourceAsset`)?.getValue();return typeof s=="string"?s:s&&typeof s=="object"&&typeof s.path=="string"?s.path:null}static getShaderId(e){const t=e.getAttr("info:id")?.getValue();return typeof t=="string"?t:""}static getInputValue(e,t,s){const n=e.getAttr(`inputs:${t}`);if(n)return s!==void 0?n.getValueAtTime(s):n.getValue()}}function hw(i){return i==="Shader"||i==="NodeGraph"||i==="Material"}function Jh(i){return i==="NodeGraph"||i==="Material"}class pt extends Vc{static typeName="NodeGraph";static define(e,t){const s=e.definePrim(t,pt.typeName);return new pt(s,e)}static is(e){return e.typeName===pt.typeName}static _descendants(e,t){const s=[],n=r=>{for(const o of e.getChildPrimPaths(r))s.push(o),n(o)};return n(t),s}static _computeNonTransitive(e,t){const s=new Map,n=e.getPrim(t);if(n)for(const r of fc(n))s.set(r,[]);for(const r of pt._descendants(e,t)){const o=e.getPrim(r);if(!(!o||!hw(o.typeName)))for(const a of fc(o)){const c=e.get(`${r}.inputs:${a}`)?.getConnections()??[];for(const l of c){const u=vs(l);if(u&&u.sourceType==="input"&&u.primPath===t){const h=s.get(u.name);h&&h.push({primPath:r,name:a})}}}}return s}static _recursiveNodeGraphConsumers(e,t,s){for(const n of t.values())for(const r of n){const o=e.getPrim(r.primPath);if(o&&Jh(o.typeName)&&!s.has(r.primPath)){const a=pt._computeNonTransitive(e,r.primPath);s.set(r.primPath,a),pt._recursiveNodeGraphConsumers(e,a,s)}}}static _resolveConsumers(e,t,s,n){const r=e.getPrim(t.primPath);if(!r||!Jh(r.typeName)){n.push(t);return}const o=s.get(t.primPath);if(!o){n.push(t);return}const a=o.get(t.name);if(a===void 0){n.push(t);return}if(a.length===0)n.push(t);else for(const c of a)pt._resolveConsumers(e,c,s,n)}computeInterfaceInputConsumersMap(e=!1){const t=pt._computeNonTransitive(this._stage,this.path);if(!e)return t;const s=new Map;if(pt._recursiveNodeGraphConsumers(this._stage,t,s),s.size===0)return t;const n=new Map;for(const[r,o]of t){const a=[];for(const c of o)pt._resolveConsumers(this._stage,c,s,a);n.set(r,a)}return n}}class es extends pt{static typeName="Material";static define(e,t){const s=e.definePrim(t,es.typeName);return new es(s,e)}createSurfaceOutput(){return this.createOutput("surface","token")}createDisplacementOutput(){return this.createOutput("displacement","token")}createVolumeOutput(){return this.createOutput("volume","token")}getSurfaceOutput(){return this.getOutput("surface")}static is(e){return e.typeName===es.typeName}static computeSurfaceSource(e,t){return Qh(e,`${t}.outputs:surface`)}static computeDisplacementSource(e,t){return Qh(e,`${t}.outputs:displacement`)}async setBaseMaterialPath(e){const t=this._prim.getSpecializes();if(!e){await t.clearSpecializes();return}await t.setSpecializes([e])}async setBaseMaterial(e){await this.setBaseMaterialPath(e.path)}async clearBaseMaterial(){await this.setBaseMaterialPath("")}getBaseMaterialPath(){const e=this._stage.getSpecializeArcTargets(this.path);for(const t of e){const s=this._stage.getPrim(t);if(s&&es.is(s))return t}if(e.length===0)for(const t of this._prim.getSpecializes().getSpecializes()){const s=this._stage.getPrim(t);if(s&&es.is(s))return t}return null}getBaseMaterial(){const e=this.getBaseMaterialPath();return e?new es(this._stage._primHandle(e),this._stage):null}hasBaseMaterial(){return this.getBaseMaterialPath()!==null}}const no="material:binding",fs="",dw="MaterialBindingAPI",ed="material:binding:collection",_n="materialBind";function td(i){if(i==="/"||!i.startsWith("/"))return null;const e=i.lastIndexOf("/");return e===0?"/":i.slice(0,e)}function sd(i){return i===fs?no:`${no}:${i}`}function id(i){return i===fs?ed:`${ed}:${i}`}function la(i){return i.startsWith("/")&&!i.includes(".")}class ts extends wi{static apply(e){return e.addAppliedSchema(dw),new ts(e,e.getStage())}bind(e,t="weakerThanDescendants",s=fs){const n=typeof e=="string"?e:e.path,r=sd(s);this._rel(r).setTargets([n]),t!=="weakerThanDescendants"&&this._stage.setPropertyField(`${this._prim.path}.${r}`,"bindMaterialAs",t)}bindCollection(e,t,s,n="weakerThanDescendants",r=fs){const o=typeof s=="string"?s:s.path,a=`${id(r)}:${e}`;this._rel(a).setTargets([t,o]),n!=="weakerThanDescendants"&&this._stage.setPropertyField(`${this._prim.path}.${a}`,"bindMaterialAs",n)}unbind(){this._rel(no).setTargets([])}createMaterialBindSubset(e,t,s="face"){const n=this._prim.path,r=re.createGeomSubset(this._stage,n,e,s,t,_n);return re.getFamilyType(this._stage,n,_n)==="unrestricted"&&this.setMaterialBindSubsetsFamilyType("nonOverlapping"),r}getMaterialBindSubsets(){return re.getGeomSubsets(this._stage,this._prim.path,"",_n)}getMaterialBindSubsetsFamilyType(){return re.getFamilyType(this._stage,this._prim.path,_n)}setMaterialBindSubsetsFamilyType(e){return e==="unrestricted"?!1:(re.setFamilyType(this._stage,this._prim.path,_n,e),!0)}static getDirectBinding(e){const s=e.getAttr(no)?.getTargets()??[];return s.length>0?s[0]:null}static getBindingStrength(e,t){return e.get(t)?.getField("bindMaterialAs")==="strongerThanDescendants"?"strongerThanDescendants":"weakerThanDescendants"}static _directBindingForPurpose(e,t){const s=sd(t),n=e.getAttr(s)?.getTargets()??[];return n.length===1&&la(n[0])?{relName:s,materialPath:n[0]}:null}static _collectionBindingsForPurpose(e,t){const s=id(t),n=[];for(const r of e.attrNames){if(r===s||!r.startsWith(`${s}:`)||t===fs&&r.slice(s.length+1).includes(":"))continue;const o=e.getAttr(r)?.getTargets()??[];if(o.length!==2)continue;const a=la(o[0]),c=la(o[1]);if(a===c)continue;const l=a?o[0]:o[1],u=a?o[1]:o[0];n.push({relName:r,collectionPath:u,materialPath:l})}return n}static computeBoundMaterial(e,t,s=fs){const n=s===fs?[fs]:[s,fs];for(const r of n){const o=ts._computeForPurpose(e,t,r);if(o)return o}return null}static _computeForPurpose(e,t,s){const n=new Map;let r=null,o=null,a=!1,c=t;for(;c&&c!=="/";){const u=e.getPrim(c);if(!u){c=td(c);continue}const h=ts._directBindingForPurpose(u,s);if(h){const f=`${c}.${h.relName}`,p=ts.getBindingStrength(e,f);(!a||p==="strongerThanDescendants")&&(a=!0,r={materialPath:h.materialPath,bindingRelPath:f},o=c)}const d=ts._collectionBindingsForPurpose(u,s);for(const f of d){const p=f.collectionPath.indexOf(".");if(p<0)continue;const y=f.collectionPath.slice(0,p),m=f.collectionPath.slice(p+1),g=/^collection:([^:]+)/.exec(m);if(!g)continue;const S=g[1],_=e.getPrim(y);if(!_)continue;let P=n.get(f.collectionPath);if(P||(P=qn.compute(_,S),n.set(f.collectionPath,P)),P.isPathIncluded(t)){const w=`${c}.${f.relName}`,v=ts.getBindingStrength(e,w);if(!a||o===c||v==="strongerThanDescendants"){a=!0,r={materialPath:f.materialPath,bindingRelPath:w},o=c;break}}}c=td(c)}if(!a||!r)return null;const l=e.getPrim(r.materialPath);return!l||!es.is(l)?null:r}}class nd{constructor(e,t,s){this.keys=e,this.values=t,this.nodes=s}getKeys(){return[...this.keys]}getValues(){return this.values.map(e=>[...e])}getStringifiedValues(){return this.values.map(e=>e.map(t=>t==null?"":String(t)))}getShaderNodesByValues(){return this.nodes.map(e=>[...e])}getAllShaderNodes(){return this.nodes.flat()}}const Sr=(i,e)=>i==null&&e==null?!0:Object.is(i,e);class pw{constructor(e){this.runner=e}selectKeys=[];include=[];exclude=[];custom=[];selectDistinct(e){for(const t of typeof e=="string"?[e]:e)this.selectKeys.includes(t)||this.selectKeys.push(t);return this}nodeValueIs(e,t){return this.include.push(s=>Sr(s.getDataForKey(e),t)),this}nodeValueIsIn(e,t){return this.include.push(s=>t.some(n=>Sr(s.getDataForKey(e),n))),this}nodeHasValueFor(e){return this.include.push(t=>t.getDataForKey(e)!==void 0),this}nodeValueIsNot(e,t){return this.exclude.push(s=>Sr(s.getDataForKey(e),t)),this}nodeValueIsNotIn(e,t){return this.exclude.push(s=>t.some(n=>Sr(s.getDataForKey(e),n))),this}nodeHasNoValueFor(e){return this.exclude.push(t=>t.getDataForKey(e)!==void 0),this}customFilter(e){return this.custom.push(e),this}run(){if(!this.runner)throw new Error("query has no registry");return this.runner(this)}}function fw(i,e){const t=e.filter(n=>i.include.every(r=>r(n))&&!i.exclude.some(r=>r(n))&&i.custom.every(r=>{const o=r(n);if(typeof o!="boolean")throw new TypeError("SdrShaderNodeQuery custom filters must return a boolean");return o}));if(!i.selectKeys.length)return new nd([],[],t.map(n=>[n]));const s=new Map;for(const n of t){const r=i.selectKeys.map(c=>n.getDataForKey(c)),o=JSON.stringify(r),a=s.get(o);a?a.nodes.push(n):s.set(o,{values:r,nodes:[n]})}return new nd([...i.selectKeys],[...s.values()].map(n=>n.values),[...s.values()].map(n=>n.nodes))}class Pf{static instance=new Pf;static getInstance(){return this.instance}results=[];nodes=new Map;parsers=new Map;searchUris=new Set;clear(){this.results.length=0,this.nodes.clear(),this.parsers.clear(),this.searchUris.clear()}setExtraDiscoveryPlugins(e){for(const t of e){for(const s of t.getSearchURIs?.()??[])this.searchUris.add(s);for(const s of t.discoverShaderNodes())this.addDiscoveryResult(s)}}setExtraParserPlugins(e){for(const[t,s]of Array.isArray(e)?e:Object.entries(e))this.parsers.set(t,s)}addDiscoveryResult(e){this.results.some(t=>t.identifier===e.identifier&&t.sourceType===e.sourceType)||this.results.push(e)}getSearchURIs(){return[...this.searchUris]}getShaderNodeIdentifiers(e="",t="defaultOnly"){return this.results.filter(s=>(!e||s.function===e)&&(t==="allVersions"||s.version.isDefault)).map(s=>s.identifier)}getShaderNodeNames(e=""){return[...new Set(this.results.filter(t=>!e||t.function===e).map(t=>t.name))]}getAllShaderNodeSourceTypes(){return[...new Set(this.results.map(e=>e.sourceType))].sort()}getShaderNodeByIdentifier(e){return this._nodesFor(t=>t.identifier===e)[0]}getShaderNodeByIdentifierAndType(e,t){return this._nodesFor(s=>s.identifier===e&&s.sourceType===t)[0]}getShaderNodeByName(e,t="defaultOnly"){return this._nodesFor(s=>s.name===e&&(t==="allVersions"||s.version.isDefault))[0]}getShaderNodesByIdentifier(e){return this._nodesFor(t=>t.identifier===e)}getShaderNodesByName(e,t="defaultOnly"){return this._nodesFor(s=>s.name===e&&(t==="allVersions"||s.version.isDefault))}getShaderNodesByFunction(e="",t="defaultOnly"){return this._nodesFor(s=>(!e||s.function===e)&&(t==="allVersions"||s.version.isDefault))}getShaderNodeByNameAndType(e,t,s="defaultOnly"){return this._nodesFor(n=>n.name===e&&n.sourceType===t&&(s==="allVersions"||n.version.isDefault))[0]}getAllShaderNodes(){return this._nodesFor(()=>!0)}createQuery(){return new pw(e=>this.runQuery(e))}runQuery(e){return fw(e,this.getAllShaderNodes())}_nodesFor(e){const t=[];for(const s of this.results.filter(e)){const n=`${s.identifier}\0${s.sourceType}`;let r=this.nodes.get(n);if(!r){const o=this.parsers.get(s.sourceType)??this.parsers.get(s.discoveryType);if(!o)continue;r=o.parseShaderNode(s),this.nodes.set(n,r)}t.push(r)}return t}}const mw={Plugins:[{Info:{Types:{UsdLuxBoundableLightBase:{alias:{UsdSchemaBase:"BoundableLightBase"},autoGenerated:!0,bases:["UsdGeomBoundable"],schemaIdentifier:"BoundableLightBase",schemaKind:"abstractTyped"},UsdLuxCylinderLight:{alias:{UsdSchemaBase:"CylinderLight"},autoGenerated:!0,bases:["UsdLuxBoundableLightBase"],implementsComputeExtent:!0,schemaIdentifier:"CylinderLight",schemaKind:"concreteTyped"},UsdLuxDiskLight:{alias:{UsdSchemaBase:"DiskLight"},autoGenerated:!0,bases:["UsdLuxBoundableLightBase"],implementsComputeExtent:!0,schemaIdentifier:"DiskLight",schemaKind:"concreteTyped"},UsdLuxDistantLight:{alias:{UsdSchemaBase:"DistantLight"},autoGenerated:!0,bases:["UsdLuxNonboundableLightBase"],schemaIdentifier:"DistantLight",schemaKind:"concreteTyped"},UsdLuxDomeLight:{alias:{UsdSchemaBase:"DomeLight"},autoGenerated:!0,bases:["UsdLuxNonboundableLightBase"],schemaIdentifier:"DomeLight",schemaKind:"concreteTyped"},UsdLuxDomeLight_1:{alias:{UsdSchemaBase:"DomeLight_1"},autoGenerated:!0,bases:["UsdLuxNonboundableLightBase"],schemaIdentifier:"DomeLight_1",schemaKind:"concreteTyped"},UsdLuxGeometryLight:{alias:{UsdSchemaBase:"GeometryLight"},autoGenerated:!0,bases:["UsdLuxNonboundableLightBase"],schemaIdentifier:"GeometryLight",schemaKind:"concreteTyped"},UsdLuxLightAPI:{alias:{UsdSchemaBase:"LightAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],providesUsdShadeConnectableAPIBehavior:!0,schemaIdentifier:"LightAPI",schemaKind:"singleApplyAPI"},UsdLuxLightFilter:{alias:{UsdSchemaBase:"LightFilter"},autoGenerated:!0,bases:["UsdGeomXformable"],providesUsdShadeConnectableAPIBehavior:!0,schemaIdentifier:"LightFilter",schemaKind:"concreteTyped"},UsdLuxLightListAPI:{alias:{UsdSchemaBase:"LightListAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"LightListAPI",schemaKind:"singleApplyAPI"},UsdLuxListAPI:{alias:{UsdSchemaBase:"ListAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ListAPI",schemaKind:"singleApplyAPI"},UsdLuxMeshLightAPI:{alias:{UsdSchemaBase:"MeshLightAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"MeshLightAPI",schemaKind:"singleApplyAPI"},UsdLuxNonboundableLightBase:{alias:{UsdSchemaBase:"NonboundableLightBase"},autoGenerated:!0,bases:["UsdGeomXformable"],schemaIdentifier:"NonboundableLightBase",schemaKind:"abstractTyped"},UsdLuxPluginLight:{alias:{UsdSchemaBase:"PluginLight"},autoGenerated:!0,bases:["UsdGeomXformable"],schemaIdentifier:"PluginLight",schemaKind:"concreteTyped"},UsdLuxPluginLightFilter:{alias:{UsdSchemaBase:"PluginLightFilter"},autoGenerated:!0,bases:["UsdLuxLightFilter"],schemaIdentifier:"PluginLightFilter",schemaKind:"concreteTyped"},UsdLuxPortalLight:{alias:{UsdSchemaBase:"PortalLight"},autoGenerated:!0,bases:["UsdLuxBoundableLightBase"],implementsComputeExtent:!0,schemaIdentifier:"PortalLight",schemaKind:"concreteTyped"},UsdLuxRectLight:{alias:{UsdSchemaBase:"RectLight"},autoGenerated:!0,bases:["UsdLuxBoundableLightBase"],implementsComputeExtent:!0,schemaIdentifier:"RectLight",schemaKind:"concreteTyped"},UsdLuxShadowAPI:{alias:{UsdSchemaBase:"ShadowAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ShadowAPI",schemaKind:"singleApplyAPI"},UsdLuxShapingAPI:{alias:{UsdSchemaBase:"ShapingAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ShapingAPI",schemaKind:"singleApplyAPI"},UsdLuxSphereLight:{alias:{UsdSchemaBase:"SphereLight"},autoGenerated:!0,bases:["UsdLuxBoundableLightBase"],implementsComputeExtent:!0,schemaIdentifier:"SphereLight",schemaKind:"concreteTyped"},UsdLuxVolumeLightAPI:{alias:{UsdSchemaBase:"VolumeLightAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"VolumeLightAPI",schemaKind:"singleApplyAPI"},UsdLux_DiscoveryPlugin:{bases:["SdrDiscoveryPlugin"]},UsdLux_LightDefParserPlugin:{bases:["SdrParserPlugin"]}}},LibraryPath:"@PLUG_INFO_LIBRARY_PATH@",Name:"usdLux",ResourcePath:"@PLUG_INFO_RESOURCE_PATH@",Root:"@PLUG_INFO_ROOT@",Type:"library"}]},gw=`#usda 1.0
(
    "WARNING: THIS FILE IS GENERATED BY usdGenSchema.  DO NOT EDIT."
)

class "LightAPI" (
    apiSchemas = ["CollectionAPI:lightLink", "CollectionAPI:shadowLink"]
    customData = {
        token[] apiSchemaOverridePropertyNames = ["collection:lightLink:includeRoot", "collection:shadowLink:includeRoot"]
        string userDocBrief = "This schema adds light capabilities to a prim."
    }
)
{
    uniform bool collection:lightLink:includeRoot = 1 (
        customData = {
            string userDocBrief = """The 'include root' setting for the
lightLink collection for this light, used when configuring light-linking."""
        }
    )
    uniform bool collection:shadowLink:includeRoot = 1 (
        customData = {
            string userDocBrief = """The 'include root' setting for the
shadowLink collection for this light, used when configuring light-linking."""
        }
    )
    color3f inputs:color = (1, 1, 1) (
        customData = {
            string userDocBrief = """The color of the emitted light, in the
rendering color space."""
        }
        displayGroup = "Basic"
        displayName = "Color"
    )
    float inputs:colorTemperature = 6500 (
        customData = {
            string userDocBrief = """The color temperature of the light, in
degrees Kelvin."""
        }
        displayGroup = "Basic"
        displayName = "Color Temperature"
    )
    float inputs:diffuse = 1 (
        customData = {
            string userDocBrief = """A multiplier for the effect of this light
on the diffuse response of materials."""
        }
        displayGroup = "Refine"
        displayName = "Diffuse Multiplier"
    )
    bool inputs:enableColorTemperature = 0 (
        customData = {
            string userDocBrief = """Controls whether colorTemperature is
used."""
        }
        displayGroup = "Basic"
        displayName = "Enable Color Temperature"
    )
    float inputs:exposure = 0 (
        customData = {
            string userDocBrief = """Exposure setting of the light. Scales
the brightness of the light exponentially."""
        }
        displayGroup = "Basic"
        displayName = "Exposure"
    )
    float inputs:intensity = 1 (
        customData = {
            string userDocBrief = """The base intensity of the light. Scales the
brightness of the light linearly."""
        }
        displayGroup = "Basic"
        displayName = "Intensity"
    )
    bool inputs:normalize = 0 (
        customData = {
            string userDocBrief = """Controls if the light power should be
normalized by the surface area of the light. If enabled, the light power 
remains constant if the light's area or angular size is changed."""
        }
        displayGroup = "Advanced"
        displayName = "Normalize Power"
    )
    float inputs:specular = 1 (
        customData = {
            string userDocBrief = """A multiplier for the effect of this light 
on the specular response of materials."""
        }
        displayGroup = "Refine"
        displayName = "Specular Multiplier"
    )
    rel light:filters (
        customData = {
            string userDocBrief = """The set of light filters, if any, that 
apply to this light."""
        }
    )
    uniform token light:materialSyncMode = "noMaterialResponse" (
        allowedTokens = ["materialGlowTintsLight", "independent", "noMaterialResponse"]
        customData = {
            string userDocBrief = """Specifies the lighting response of a 
material (if any) bound to the prim that has this schema applied."""
        }
        displayGroup = "Geometry"
        displayName = "Material Sync Mode"
    )
    uniform token light:shaderId = "" (
        customData = {
            string userDocBrief = "The shader ID for this light, if any."
        }
        displayGroup = "Internal"
    )
}

class "MeshLightAPI" (
    apiSchemas = ["LightAPI"]
    customData = {
        token[] apiSchemaOverridePropertyNames = ["light:materialSyncMode", "light:shaderId"]
        string userDocBrief = "Applies light behavior to a mesh."
    }
)
{
    uniform token light:materialSyncMode = "materialGlowTintsLight"
    uniform token light:shaderId = "MeshLight"
}

class "VolumeLightAPI" (
    apiSchemas = ["LightAPI"]
    customData = {
        token[] apiSchemaOverridePropertyNames = ["light:materialSyncMode", "light:shaderId"]
        string userDocBrief = "Applies light behavior to a volume."
    }
)
{
    uniform token light:materialSyncMode = "materialGlowTintsLight"
    uniform token light:shaderId = "VolumeLight"
}

class "LightListAPI" (
    customData = {
        string userDocBrief = """Facilitates discovery and publishing of lights
in a scene. Provides a mechanism to create and utilize a cache if needed."""
    }
)
{
    rel lightList (
        customData = {
            string userDocBrief = """A list of relationships to lights, that
describe the light list for a model hierarchy prim with this schema applied.
If empty and used as a cached list, this indicates no lights are present."""
        }
    )
    token lightList:cacheBehavior (
        allowedTokens = ["consumeAndHalt", "consumeAndContinue", "ignore"]
        customData = {
            string userDocBrief = """Controls how the cached light list should
be interpreted: consumeAndHalt, consumeAndContinue, or ignore."""
        }
    )
}

class "ListAPI" (
    customData = {
        string userDocBrief = """Facilitates discovery and publishing of lights
in a scene. This schema is deprecated and LightListAPI should be used instead."""
    }
)
{
    rel lightList (
        customData = {
            string userDocBrief = """A list of relationships to lights, that
describe the light list for a model hierarchy prim with this schema applied.
If empty and used as a cached list, this indicates no lights are present."""
        }
    )
    token lightList:cacheBehavior (
        allowedTokens = ["consumeAndHalt", "consumeAndContinue", "ignore"]
        customData = {
            string userDocBrief = """Controls how the cached light list should
be interpreted: consumeAndHalt, consumeAndContinue, or ignore."""
        }
    )
}

class "ShapingAPI" (
    customData = {
        string userDocBrief = """Controls for shaping a light's emission, such
as light cone angle and falloff."""
    }
)
{
    float inputs:shaping:cone:angle = 90 (
        customData = {
            string userDocBrief = """Specifies the angular limit off the primary 
axis to restrict the light spread, in degrees."""
        }
        displayGroup = "Shaping"
        displayName = "Cone Angle"
    )
    float inputs:shaping:cone:softness = 0 (
        customData = {
            string userDocBrief = """Controls the cutoff softness for the cone 
angle. Typical range is 0 (hard cut-off) to 1.0 (smooth)."""
        }
        displayGroup = "Shaping"
        displayName = "Cone Softness"
    )
    float inputs:shaping:focus = 0 (
        customData = {
            string userDocBrief = """Controls the spread of the light. Higher 
focus values pull light towards the center and narrow the spread."""
        }
        displayGroup = "Shaping"
        displayName = "Emission Focus"
    )
    color3f inputs:shaping:focusTint = (0, 0, 0) (
        customData = {
            string userDocBrief = """Controls the tint of the emission in the
falloff region."""
        }
        displayGroup = "Shaping"
        displayName = "Emission Focus Tint"
    )
    float inputs:shaping:ies:angleScale = 0 (
        customData = {
            string userDocBrief = """Specifies a rescaling of the angular
distribution of the IES profile."""
        }
        displayGroup = "Shaping"
        displayName = "Profile Scale"
    )
    asset inputs:shaping:ies:file (
        customData = {
            string userDocBrief = "Specifies the IES profile file."
        }
        displayGroup = "Shaping"
        displayName = "IES Profile"
    )
    bool inputs:shaping:ies:normalize = 0 (
        customData = {
            string userDocBrief = """Normalizes the IES profile to affect
the shaping of the light while preserving the overall energy output."""
        }
        displayGroup = "Shaping"
        displayName = "Profile Normalization"
    )
}

class "ShadowAPI" (
    customData = {
        string userDocBrief = """Controls to refine a light's shadow casting
behavior. These are non-physical controls."""
    }
)
{
    color3f inputs:shadow:color = (0, 0, 0) (
        customData = {
            string userDocBrief = """Specifies the color of the shadows cast by 
the light"""
        }
        displayGroup = "Shadows"
        displayName = "Shadow Color"
    )
    float inputs:shadow:distance = -1 (
        customData = {
            string userDocBrief = """Specifies the maximum distance, measured
between the occluder and the point on a surface, within which shadows are cast."""
        }
        displayGroup = "Shadows"
        displayName = "Shadow Max Distance"
    )
    bool inputs:shadow:enable = 1 (
        customData = {
            string userDocBrief = """Enables or disables whether the light
casts shadows."""
        }
        displayGroup = "Shadows"
        displayName = "Enable Shadows"
    )
    float inputs:shadow:falloff = -1 (
        customData = {
            string userDocBrief = """Specifies the size of the shadow falloff
zone, within the maximum shadow distance."""
        }
        displayGroup = "Shadows"
        displayName = "Shadow Falloff"
    )
    float inputs:shadow:falloffGamma = 1 (
        customData = {
            string userDocBrief = """Controls the rate of falloff within the
shadow falloff zone specified with \`shadow:falloff\`."""
        }
        displayGroup = "Shadows"
        displayName = "Shadow Falloff Gamma"
    )
}

class LightFilter "LightFilter" (
    apiSchemas = ["CollectionAPI:filterLink"]
    customData = {
        token[] apiSchemaOverridePropertyNames = ["collection:filterLink:includeRoot"]
        string userDocBrief = """A light filter is used to modify the effect
of a light."""
    }
)
{
    uniform bool collection:filterLink:includeRoot = 1 (
        customData = {
            string userDocBrief = """The 'include root' setting for the
filterLink collection, used when configuring light-linking."""
        }
    )
    uniform token lightFilter:shaderId = "" (
        customData = {
            string userDocBrief = """The shader ID for a LightFilter 
(the fallback value is no shader ID)."""
        }
        displayGroup = "Internal"
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class "BoundableLightBase" (
    apiSchemas = ["LightAPI"]
    customData = {
        string userDocBrief = """A base class used by intrinsic lights. Not
intended to be used directly."""
    }
)
{
    float3[] extent (
        customData = {
            string userDocBrief = """Extent is a three dimensional range measuring the geometric
        extent of the authored gprim in its own local space (i.e."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class "NonboundableLightBase" (
    apiSchemas = ["LightAPI"]
    customData = {
        string userDocBrief = """A base class used by intrinsic lights. Not
intended to be used directly."""
    }
)
{
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class DistantLight "DistantLight" (
    apiSchemas = ["LightAPI"]
    customData = {
        token[] apiSchemaOverridePropertyNames = ["inputs:intensity", "light:shaderId"]
        string userDocBrief = '''A light that provides light from
a far distant source, along the -Z axis. Also known as a "directional light".'''
    }
)
{
    float inputs:angle = 0.53 (
        customData = {
            string userDocBrief = """The angular diameter of the light in 
degrees. The fallback value is 0.53. Higher values make the light rays less 
parallel, thereby increasing shadow softness, but also increasing the overall 
amount of light."""
        }
        displayGroup = "Basic"
        displayName = "Angle Extent"
    )
    float inputs:intensity = 50000 (
        customData = {
            string userDocBrief = """Scales the brightness the DistantLight
linearly, with a fallback value of 50000 to approximate sunlight."""
        }
    )
    uniform token light:shaderId = "DistantLight" (
        customData = {
            string userDocBrief = '''The shader ID for a DistantLight 
("DistantLight").'''
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class DiskLight "DiskLight" (
    apiSchemas = ["LightAPI"]
    customData = {
        token[] apiSchemaOverridePropertyNames = ["light:shaderId"]
        string userDocBrief = """A light that emits from one side of a circular
disk (along the -Z axis), centered in the XY plane."""
    }
)
{
    float3[] extent (
        customData = {
            string userDocBrief = """Extent is a three dimensional range measuring the geometric
        extent of the authored gprim in its own local space (i.e."""
        }
    )
    float inputs:radius = 0.5 (
        customData = {
            string userDocBrief = "Specifies the radius of the disk."
        }
        displayGroup = "Geometry"
        displayName = "Radius"
    )
    uniform token light:shaderId = "DiskLight" (
        customData = {
            string userDocBrief = '''The shader ID for a DiskLight 
("DiskLight").'''
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class RectLight "RectLight" (
    apiSchemas = ["LightAPI"]
    customData = {
        token[] apiSchemaOverridePropertyNames = ["light:shaderId"]
        string userDocBrief = """A light that emits from one side of a rectangle
(along the -Z axis), centered in the XY plane."""
    }
)
{
    float3[] extent (
        customData = {
            string userDocBrief = """Extent is a three dimensional range measuring the geometric
        extent of the authored gprim in its own local space (i.e."""
        }
    )
    float inputs:height = 1 (
        customData = {
            string userDocBrief = """Specifies the height of the rectangle in 
the local Y axis."""
        }
        displayGroup = "Geometry"
        displayName = "Height"
    )
    asset inputs:texture:file (
        customData = {
            string userDocBrief = """An optional color texture set on the
rectangle."""
        }
        displayGroup = "Basic"
        displayName = "Color Map"
    )
    float inputs:width = 1 (
        customData = {
            string userDocBrief = """Specifies the width of the rectangle in the 
local X axis."""
        }
        displayGroup = "Geometry"
        displayName = "Width"
    )
    uniform token light:shaderId = "RectLight" (
        customData = {
            string userDocBrief = '''The shader ID for a RectLight 
("RectLight").'''
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class SphereLight "SphereLight" (
    apiSchemas = ["LightAPI"]
    customData = {
        token[] apiSchemaOverridePropertyNames = ["light:shaderId"]
        string userDocBrief = "A light that is emitted outwards from a sphere."
    }
)
{
    float3[] extent (
        customData = {
            string userDocBrief = """Extent is a three dimensional range measuring the geometric
        extent of the authored gprim in its own local space (i.e."""
        }
    )
    float inputs:radius = 0.5 (
        customData = {
            string userDocBrief = "Specifies the radius of the sphere."
        }
        displayGroup = "Geometry"
        displayName = "Radius"
    )
    uniform token light:shaderId = "SphereLight" (
        customData = {
            string userDocBrief = '''The shader ID for a SphereLight 
("SphereLight").'''
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    bool treatAsPoint = 0 (
        customData = {
            string userDocBrief = """Specifies that renderers can treat this
light as a zero-radius point light."""
        }
        displayGroup = "Advanced"
        displayName = "Treat As Point"
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class CylinderLight "CylinderLight" (
    apiSchemas = ["LightAPI"]
    customData = {
        token[] apiSchemaOverridePropertyNames = ["light:shaderId"]
        string userDocBrief = """A light that is emitted outwards from a 
cylinder."""
    }
)
{
    float3[] extent (
        customData = {
            string userDocBrief = """Extent is a three dimensional range measuring the geometric
        extent of the authored gprim in its own local space (i.e."""
        }
    )
    float inputs:length = 1 (
        customData = {
            string userDocBrief = """Specifies the length of the cylinder in
the local X axis."""
        }
        displayGroup = "Geometry"
        displayName = "Length"
    )
    float inputs:radius = 0.5 (
        customData = {
            string userDocBrief = "Specifies the radius of the cylinder."
        }
        displayGroup = "Geometry"
        displayName = "Radius"
    )
    uniform token light:shaderId = "CylinderLight" (
        customData = {
            string userDocBrief = '''The shader ID for a CylinderLight 
("CylinderLight").'''
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    bool treatAsLine = 0 (
        customData = {
            string userDocBrief = """Specifies that renderers can treat this
light as a zero-radius line."""
        }
        displayGroup = "Advanced"
        displayName = "Treat As Line"
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class GeometryLight "GeometryLight" (
    apiSchemas = ["LightAPI"]
    customData = {
        token[] apiSchemaOverridePropertyNames = ["light:shaderId"]
        string userDocBrief = """A light that emits outwards from a geometric
prim. Deprecated, use MeshLight instead."""
    }
)
{
    rel geometry (
        customData = {
            string userDocBrief = """Relationship to the geometry to use as the 
light source."""
        }
    )
    uniform token light:shaderId = "GeometryLight" (
        customData = {
            string userDocBrief = '''The shader ID for a GeometryLight 
("GeometryLight").'''
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class DomeLight "DomeLight" (
    apiSchemas = ["LightAPI"]
    customData = {
        token[] apiSchemaOverridePropertyNames = ["light:shaderId"]
        string userDocBrief = """A light that is emitted inwards from a 
distant external environment such as a sky or a light environment captured in
an HDR image used for Image Based Lighting (IBL)."""
    }
)
{
    float guideRadius = 100000 (
        customData = {
            string userDocBrief = """Specifies the radius of guide geometry to 
use to visualize the dome light."""
        }
        displayGroup = "Guides"
        displayName = "Radius"
    )
    asset inputs:texture:file (
        customData = {
            string userDocBrief = """Specifies the color texture (typically an 
HDR image intended for IBL) used by the DomeLight."""
        }
        displayGroup = "Basic"
        displayName = "Color Map"
    )
    token inputs:texture:format = "automatic" (
        allowedTokens = ["automatic", "latlong", "mirroredBall", "angular", "cubeMapVerticalCross"]
        customData = {
            string userDocBrief = """Specifies the parameterization of the color
texture. Values include: automatic, latlong, mirroredBall, angular, and 
cubeMapVerticalCross."""
        }
        displayGroup = "Basic"
        displayName = "Color Map Format"
    )
    uniform token light:shaderId = "DomeLight" (
        customData = {
            string userDocBrief = '''The shader ID for a DomeLight 
("DomeLight").'''
        }
    )
    rel portals (
        customData = {
            string userDocBrief = "Optional portals to guide light sampling."
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class DomeLight_1 "DomeLight_1" (
    apiSchemas = ["LightAPI"]
    customData = {
        token[] apiSchemaOverridePropertyNames = ["light:shaderId"]
        string userDocBrief = """A light that is emitted inwards from a 
distant external environment such as a sky or a light environment captured in
an HDR image used for Image Based Lighting (IBL). Provides additional control
over the dome's orientation via the poleAxis property."""
    }
)
{
    float guideRadius = 100000 (
        customData = {
            string userDocBrief = """Specifies the radius of guide geometry to 
use to visualize the dome light."""
        }
        displayGroup = "Guides"
        displayName = "Radius"
    )
    asset inputs:texture:file (
        customData = {
            string userDocBrief = """Specifies the color texture (typically an 
HDR image intended for IBL) used by the DomeLight."""
        }
        displayGroup = "Basic"
        displayName = "Color Map"
    )
    token inputs:texture:format = "automatic" (
        allowedTokens = ["automatic", "latlong", "mirroredBall", "angular", "cubeMapVerticalCross"]
        customData = {
            string userDocBrief = """Specifies the parameterization of the color
texture. Values include: automatic, latlong, mirroredBall, angular, and 
cubeMapVerticalCross."""
        }
        displayGroup = "Basic"
        displayName = "Color Map Format"
    )
    uniform token light:shaderId = "DomeLight" (
        customData = {
            string userDocBrief = '''The shader ID for a DomeLight_1 
("DomeLight").'''
        }
    )
    uniform token poleAxis = "scene" (
        allowedTokens = ["scene", "Y", "Z"]
        customData = {
            string userDocBrief = """Specifies the starting alignment of the
dome's top pole."""
        }
        displayGroup = "Advanced"
        displayName = "Pole Axis"
    )
    rel portals (
        customData = {
            string userDocBrief = "Optional portals to guide light sampling."
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class PortalLight "PortalLight" (
    apiSchemas = ["LightAPI"]
    customData = {
        token[] apiSchemaOverridePropertyNames = ["light:shaderId"]
        string userDocBrief = """A rectangular portal in the local XY plane that 
guides sampling of a dome light (DomeLight, DomeLight_1)."""
    }
)
{
    float3[] extent (
        customData = {
            string userDocBrief = """Extent is a three dimensional range measuring the geometric
        extent of the authored gprim in its own local space (i.e."""
        }
    )
    float inputs:height = 1 (
        customData = {
            string userDocBrief = """Specifies the height of the portal 
rectangle in the local Y axis."""
        }
        displayGroup = "Geometry"
        displayName = "Height"
    )
    float inputs:width = 1 (
        customData = {
            string userDocBrief = """Specifies the width of the portal rectangle 
in the local X axis."""
        }
        displayGroup = "Geometry"
        displayName = "Width"
    )
    uniform token light:shaderId = "PortalLight" (
        customData = {
            string userDocBrief = '''The shader ID for a PortalLight 
("PortalLight").'''
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class PluginLight "PluginLight" (
    apiSchemas = ["NodeDefAPI", "LightAPI"]
    customData = {
        string userDocBrief = """A light that provides properties to allow it
to identify an external Sdr shader node."""
    }
)
{
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class PluginLightFilter "PluginLightFilter" (
    apiSchemas = ["NodeDefAPI", "CollectionAPI:filterLink"]
    customData = {
        token[] apiSchemaOverridePropertyNames = ["collection:filterLink:includeRoot"]
        string userDocBrief = """A Light filter that provides properties that allow it to identify an 
    external SdrShadingNode definition, through UsdShadeNodeDefAPI, that can be 
    provided to render delegates without the need to provide a schema 
    definition for the light filter's type."""
    }
)
{
    uniform bool collection:filterLink:includeRoot = 1 (
        customData = {
            string userDocBrief = """The 'include root' setting for the
filterLink collection, used when configuring light-linking."""
        }
    )
    uniform token lightFilter:shaderId = "" (
        customData = {
            string userDocBrief = """The shader ID for a LightFilter 
(the fallback value is no shader ID)."""
        }
        displayGroup = "Internal"
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

`;ze.GetInstance().RegisterPlugins(mw,{usdLux:{"generatedSchema.usda":gw}});const Sn=[[1,.02749,0],[1,.02749,0],[1,.149664,0],[1,.256644,.008095],[1,.372033,.06745],[1,.476725,.153601],[1,.570376,.259196],[1,.65348,.377155],[1,.726878,.501606],[1,.791543,.62805],[1,.848462,.753228],[1,.898581,.874905],[1,.942771,.991642],[.906947,.890456,1],[.828247,.841838,1],[.765791,.801896,1],[.715255,.768579,1],[.673683,.740423,1],[.638992,.716359,1],[.609681,.695588,1],[.609681,.695588,1],[.609681,.695588,1]],Oe=[[-.5,1.5,-1.5,.5],[1,-2.5,2,-.5],[-.5,0,.5,0],[0,1,0,0]];function yw(i,e,t){return i*.2126+e*.7152+t*.0722}function _w(i){const e=Sn.length,t=Math.min(Math.max((i-1e3)/9e3,0),1),s=e-4,n=t*s,r=Math.min(Math.floor(n),s-1),o=n-r,a=[];for(let l=0;l<3;l++){const u=Sn[r][l],h=Sn[r+1][l],d=Sn[r+2][l],f=Sn[r+3][l],p=Oe[0][0]*u+Oe[0][1]*h+Oe[0][2]*d+Oe[0][3]*f,y=Oe[1][0]*u+Oe[1][1]*h+Oe[1][2]*d+Oe[1][3]*f,m=Oe[2][0]*u+Oe[2][1]*h+Oe[2][2]*d+Oe[2][3]*f,g=Oe[3][0]*u+Oe[3][1]*h+Oe[3][2]*d+Oe[3][3]*f;a.push(((p*o+y)*o+m)*o+g)}const c=yw(a[0],a[1],a[2])||1;return[Math.max(a[0]/c,0),Math.max(a[1]/c,0),Math.max(a[2]/c,0)]}function Sw(i,e){return Array.isArray(i)&&i.length>=3?[Number(i[0]),Number(i[1]),Number(i[2])]:e}function jt(i,e){return e!==void 0&&i.set(e),i}class at extends Lc{static typeName="LightAPI";static get(e,t){return new at(e.has(t)?e._primHandle(t):void 0,e)}static canApply(e){return e.canApplyAPI(at.typeName)}static apply(e){return e.applyAPI(at.typeName),new at(e,e.getStage())}getIntensityAttr(){return this._attr("inputs:intensity","float")}getExposureAttr(){return this._attr("inputs:exposure","float")}getColorAttr(){return this._attr("inputs:color","color3f")}getEnableColorTemperatureAttr(){return this._attr("inputs:enableColorTemperature","bool")}getColorTemperatureAttr(){return this._attr("inputs:colorTemperature","float")}getNormalizeAttr(){return this._attr("inputs:normalize","bool")}getDiffuseAttr(){return this._attr("inputs:diffuse","float")}getSpecularAttr(){return this._attr("inputs:specular","float")}getFiltersRel(){return this._rel("light:filters")}createFiltersRel(){return this._rel("light:filters")}getShaderIdAttr(){return this._attr("light:shaderId","uniform token")}getMaterialSyncModeAttr(){return this._attr("light:materialSyncMode","uniform token")}createIntensityAttr(e){return jt(this.getIntensityAttr(),e)}createExposureAttr(e){return jt(this.getExposureAttr(),e)}createColorAttr(e){return jt(this.getColorAttr(),e)}createEnableColorTemperatureAttr(e){return jt(this.getEnableColorTemperatureAttr(),e)}createColorTemperatureAttr(e){return jt(this.getColorTemperatureAttr(),e)}createNormalizeAttr(e){return jt(this.getNormalizeAttr(),e)}createDiffuseAttr(e){return jt(this.getDiffuseAttr(),e)}createSpecularAttr(e){return jt(this.getSpecularAttr(),e)}createShaderIdAttr(e){return jt(this.getShaderIdAttr(),e)}createMaterialSyncModeAttr(e){return jt(this.getMaterialSyncModeAttr(),e)}static getSchemaAttributeNames(){return["light:shaderId","light:materialSyncMode","inputs:intensity","inputs:exposure","inputs:diffuse","inputs:specular","inputs:normalize","inputs:color","inputs:enableColorTemperature","inputs:colorTemperature"]}connectableAPI(){return new Vc(this._prim,this._stage)}createInput(e,t){return this.connectableAPI().createInput(e,t)}getInput(e){return this.connectableAPI().getInput(e)}getInputs(){return fc(this._stage.getPrim(this.path)).map(e=>this.getInput(e))}createOutput(e,t){return this.connectableAPI().createOutput(e,t)}getOutput(e){return this.connectableAPI().getOutput(e)}getOutputs(){return uw(this._stage.getPrim(this.path)).map(e=>this.getOutput(e))}getShaderIdAttrForRenderContext(e){return this._attr(e?`${e}:light:shaderId`:"light:shaderId","uniform token")}getShaderId(e=[]){for(const s of e){const n=this.getShaderIdAttrForRenderContext(s).get();if(typeof n=="string"&&n)return n}const t=this.getShaderIdAttr().get();return typeof t=="string"?t:""}getLightLinkCollectionAPI(){return new pe(this._prim,this._stage,"lightLink",!0)}getShadowLinkCollectionAPI(){return new pe(this._prim,this._stage,"shadowLink",!0)}static INTENSITY_FALLBACK={DistantLight:5e4};static getIntensity(e,t){const s=at.INTENSITY_FALLBACK[e.typeName]??1;return Le(G(e,"inputs:intensity",t),s)}static getExposure(e,t){return Le(G(e,"inputs:exposure",t),0)}static getColor(e,t){return Sw(G(e,"inputs:color",t),[1,1,1])}static getEnableColorTemperature(e){return ZP(G(e,"inputs:enableColorTemperature"),!1)}static getColorTemperature(e,t){return Le(G(e,"inputs:colorTemperature",t),6500)}static computeBaseEmission(e,t){let s=at.getColor(e,t);if(at.getEnableColorTemperature(e)){const r=_w(at.getColorTemperature(e,t));s=[s[0]*r[0],s[1]*r[1],s[2]*r[2]]}const n=at.getIntensity(e,t)*Math.pow(2,at.getExposure(e,t));return{color:s,intensity:n}}}function wf(i,e){const t=a=>{const c=i.getAttr(a);return e===void 0?c?.getValue():c?.getValueAtTime(e)},s=t("inputs:width")??1,n=t("inputs:height")??1,r=t("inputs:normalize")??!1;if(typeof s!="number"||typeof n!="number"||!Number.isFinite(s)||!Number.isFinite(n)||s<=0||n<=0||typeof r!="boolean")throw Error("RectLight requires positive finite width/height and boolean normalize");const o=[];for(const a of["inputs:texture:file","inputs:shaping:cone:angle","inputs:shaping:cone:softness","inputs:shaping:focus","inputs:shaping:ies:file","inputs:diffuse","inputs:specular"]){const c=t(a);c!==void 0&&c!==""&&!((a==="inputs:diffuse"||a==="inputs:specular")&&c===1)&&o.push(a)}i.rel("light:filters").getTargets().length&&o.push("light:filters");for(const a of["lightLink","shadowLink"])(t(`collection:${a}:includeRoot`)===!1||i.rel(`collection:${a}:includes`).getTargets().length||i.rel(`collection:${a}:excludes`).getTargets().length)&&o.push(`collection:${a}`);for(const a of["intensity","exposure","color","width","height","normalize"])i.getAttr(`inputs:${a}`)?.getConnections().length&&o.push(`connected inputs:${a}`);return{width:s,height:n,normalize:r,unsupported:o}}function Pw(i,e=16,t=24){const s=[],n=[];for(let c=0;c<=e;c++){const l=c/e*Math.PI,u=Math.sin(l),h=Math.cos(l);for(let d=0;d<=t;d++){const f=d/t*2*Math.PI,p=u*Math.cos(f),y=u*Math.sin(f),m=h;n.push([p,y,m]),s.push([p*i,y*i,m*i])}}const r=[],o=[],a=t+1;for(let c=0;c<e;c++)for(let l=0;l<t;l++){const u=c*a+l,h=u+a;r.push(4),o.push(u,h,h+1,u+1)}return{points:s,normals:n,faceVertexCounts:r,faceVertexIndices:o}}function j(i,e,t){const s=i?.getAttr(e);return t===void 0?s?.getValue():s?.getValueAtTime(t)}function ie(i,e){i.push(e)}function bf(i){if(typeof i=="string")return i;if(i&&typeof i=="object"){const e=i;if(typeof e.path=="string")return e.path;if(typeof e.assetPath=="string")return e.assetPath}}function rd(i,e){return Array.isArray(i)&&i.length>=2&&i.slice(0,2).every(Number.isFinite)?[Number(i[0]),Number(i[1])]:e}const ww=new Set(["black","clamp","repeat","mirror","useMetadata"]);function bw(i,e,t,s,n,r){const o=e.getAttr(`inputs:${t}`)?.getConnections()[0];if(!o)return;const a=o.lastIndexOf("."),c=a>0?o.slice(0,a):o,l=a>0?o.slice(a+1).replace(/^outputs:/,""):"rgb",u=i.getPrim(c);if(!u||yt.getShaderId(u)!=="UsdUVTexture"){ie(n,{severity:"warning",code:"UNSUPPORTED_MATERIAL",path:s,typeName:"Mesh",message:`Surface input ${t} is not connected to UsdUVTexture at ${s}`});return}const h=bf(j(u,"inputs:file",r));if(!h){ie(n,{severity:"error",code:"INVALID_MATERIAL",path:s,typeName:"Mesh",message:`UsdUVTexture has no valid file asset at ${c}`});return}let d="st",f=[1,1],p=[0,0],y=u.getAttr("inputs:st")?.getConnections()[0];for(let _=0;y&&_<4;_++){const P=y.slice(0,y.lastIndexOf(".")),w=i.getPrim(P),v=w?yt.getShaderId(w):"";if(w&&v==="UsdTransform2d"){f=rd(j(w,"inputs:scale",r),f),p=rd(j(w,"inputs:translation",r),p);const b=j(w,"inputs:rotation",r);typeof b=="number"&&b!==0&&ie(n,{severity:"warning",code:"UNSUPPORTED_MATERIAL",path:s,typeName:"Mesh",message:`UsdTransform2d rotation is unsupported at ${P}`}),y=w.getAttr("inputs:in")?.getConnections()[0]}else if(w&&v==="UsdPrimvarReader_float2"){const b=j(w,"inputs:varname",r);typeof b=="string"&&b.length>0&&(d=b);break}else break}const m=_=>{const P=j(u,`inputs:${_}`,r);return typeof P=="string"&&ww.has(P)?P:"useMetadata"},g=j(u,"inputs:sourceColorSpace",r);d!=="st"&&ie(n,{severity:"warning",code:"UNSUPPORTED_MATERIAL",path:s,typeName:"Mesh",message:`Texture uses unsupported UV primvar "${d}" at ${c}`});const S=i.getPropertyStack(`${c}.inputs:file`)[0]?.layerIdentifier??i.rootLayerPath;return{assetPath:h,resolvedPath:Yi(S,h),sourceColorSpace:g==="sRGB"||g==="raw"?g:"auto",wrapS:m("wrapS"),wrapT:m("wrapT"),sourceOutput:l,uvPrimvar:d,uvScale:f,uvTranslation:p}}function vw(i,e,t,s){const n=ts.computeBoundMaterial(i,e);if(!n){(i.getPrim(e)?.getAttr("material:binding")?.getTargets()??[]).length>0&&ie(t,{severity:"warning",code:"UNSUPPORTED_MATERIAL",path:e,typeName:"Mesh",message:`Material binding could not be resolved at ${e}`});return}const r=es.computeSurfaceSource(i,n.materialPath);if(!r){ie(t,{severity:"warning",code:"UNSUPPORTED_MATERIAL",path:e,typeName:"Mesh",message:`Bound material has no supported surface output at ${e}`});return}const o=i.getPrim(r.primPath),a=o?yt.getShaderId(o):void 0;if(!o||a!=="UsdPreviewSurface"){ie(t,{severity:"warning",code:"UNSUPPORTED_MATERIAL",path:e,typeName:"Mesh",message:`Unsupported surface shader "${a??"missing"}" at ${r.primPath}`});return}const c=j(o,"inputs:diffuseColor",s),l=j(o,"inputs:roughness",s),u=j(o,"inputs:metallic",s),h=j(o,"inputs:opacity",s),d=j(o,"inputs:emissiveColor",s),f=j(o,"inputs:ior",s),p=d===void 0||Array.isArray(d)&&d.length===3&&d.every(Number.isFinite),y=f===void 0||Number.isFinite(f)&&f>0,m=["diffuseColor","roughness","metallic","opacity","normal"].map(v=>[v,bw(i,o,v,e,t,s)]).filter(v=>v[1]!==void 0),g=Object.fromEntries(m),S=Array.isArray(c)&&c.length>=3&&c.slice(0,3).every(Number.isFinite),_=l===void 0||Number.isFinite(l),P=u===void 0||Number.isFinite(u),w=h===void 0||Number.isFinite(h);return(!S&&c!==void 0||!_||!P||!w||!p||!y)&&ie(t,{severity:"error",code:"INVALID_MATERIAL",path:e,typeName:"Mesh",message:`UsdPreviewSurface has non-finite or malformed inputs at ${r.primPath}`}),{diffuseColor:S?[...c]:[.18,.18,.18],emissiveColor:p&&d?[...d]:[0,0,0],ior:y&&f!==void 0?f:1.5,..._&&l!==void 0?{roughness:l}:{},...P&&u!==void 0?{metallic:u}:{},...w&&h!==void 0?{opacity:h}:{},...m.length>0?{textures:g}:{}}}function Iw(i,e,t,s){const n=j(i.getPrim(e),"primvars:displayColor",s);if(!(!n||n.length===0)){if(!Array.isArray(n[0])||n[0].length<3||!n[0].slice(0,3).every(Number.isFinite)){ie(t,{severity:"error",code:"INVALID_MATERIAL",path:e,typeName:"Mesh",message:`Malformed primvars:displayColor at ${e}`});return}return{diffuseColor:[...n[0]]}}}function Uc(i,e,t,s){return vw(i,e,t,s)??Iw(i,e,t,s)}function Aw(i,e){return i.getPrim(e)?.getAttr("doubleSided")?.getValue()}class Tw extends Error{diagnostics;constructor(e){super(`USD bake failed with ${e.length} diagnostic${e.length===1?"":"s"}`),this.name="BakeError",this.diagnostics=e}}const xw=new Set(["","Xform","Scope","Material","Shader","NodeGraph","GeomSubset"]);function ua(i){return Array.isArray(i)?i.map(e=>Array.isArray(e)?[...e]:[]).filter(e=>e.length>=3):[]}function Ht(i){return Array.isArray(i)||ArrayBuffer.isView(i)?Array.from(i,Number):[]}function Dw(i,e,t,s,n,r,o){const a=j(i,"primvars:st",o);if(a===void 0)return;const c=Array.isArray(a)?a.filter(Array.isArray).map(m=>[...m]):[],l=new Set(["constant","uniform","varying","vertex","faceVarying"]),u=i.getAttr("primvars:st")?.getField("interpolation"),h=j(i,"primvars:st:interpolation",o),d=typeof u=="string"&&l.has(u)?u:typeof h=="string"&&l.has(h)?h:"vertex",f=Ht(j(i,"primvars:st:indices",o)),p=d==="constant"?1:d==="uniform"?s:d==="faceVarying"?n:t;if(c.length===0||c.some(m=>m.length<2||!Kn(m.slice(0,2)))||f.length>0&&(f.length!==p||f.some(m=>!Number.isInteger(m)||m<0||m>=c.length))||f.length===0&&c.length!==p){ie(r,{severity:"error",code:"INVALID_UVS",path:e,typeName:"Mesh",message:`primvars:st has invalid values, indices, or interpolation cardinality at ${e}`});return}return{name:"st",values:c,...f.length>0?{indices:f}:{},interpolation:d}}function Kn(i){return i.every(Number.isFinite)}function Di(i,e,t){return typeof i=="string"&&e.includes(i)?i:t}function kw(i,e,t,s,n){const r=[],o=new Set;for(const a of re.getGeomSubsets(i,e,"face","materialBind")){const c=Array.from(re.getIndices(a,n)),l=c.some(h=>!Number.isInteger(h)||h<0||h>=t||o.has(h)),u=Uc(i,a.path,s,n);if(l||!u){ie(s,{severity:"error",code:"INVALID_MATERIAL_SUBSET",path:a.path,typeName:"GeomSubset",message:`Material subset has invalid, overlapping, or unbound faces at ${a.path}`});continue}c.forEach(h=>o.add(h)),r.push({path:a.path,faceIndices:c,material:u})}return r}function od(i,e){return i===e||i.startsWith(`${e}/`)}function Cw(i,e,t,s="vertex"){const{points:n,faceVertexCounts:r,faceVertexIndices:o,normals:a}=e,c=n.length===0||r.length===0||r.some(h=>!Number.isInteger(h)||h<3)||r.reduce((h,d)=>h+d,0)!==o.length||o.some(h=>!Number.isInteger(h)||h<0||h>=n.length);c&&ie(t,{severity:"error",code:"INVALID_MESH_TOPOLOGY",path:i,typeName:"Mesh",message:`Invalid face topology or point indices at ${i}`});const l=n.some(h=>h.length<3||!Kn(h.slice(0,3)));l&&ie(t,{severity:"error",code:"INVALID_MESH_VALUE",path:i,typeName:"Mesh",message:`Mesh contains malformed or non-finite points at ${i}`});const u=s==="constant"?1:s==="uniform"?r.length:s==="faceVarying"?o.length:n.length;return a&&(a.some(h=>h.length<3||!Kn(h.slice(0,3)))||a.length!==u)&&(ie(t,{severity:"error",code:"INVALID_NORMALS",path:i,typeName:"Mesh",message:`Normals must be finite and have vertex or face-varying cardinality at ${i}`}),delete e.normals),!c&&!l}function Nw(i,e={}){const t=e.root??"/",s=e.time,n=e.unsupported??"diagnostic",r=new _f(i,s),o=[],a=[],c=[],l=[],u=[...i.traverse()].filter(m=>!m.slice(m.lastIndexOf("/")+1).includes(".")).sort();for(const m of u){if(t!=="/"&&!(m===t||m.startsWith(`${t}/`)))continue;const g=i.getPrim(m);if(!g)continue;if(g.typeName==="DistantLight"||g.typeName==="DomeLight"||g.typeName==="RectLight"){const{color:q,intensity:Z}=at.computeBaseEmission(g,s),ye=[...r.getLocalToWorldTransform(m)];if(![...q,Z,...ye].every(Number.isFinite))ie(l,{severity:"error",code:"INVALID_LIGHT",path:m,typeName:g.typeName,message:`Light emission or transform contains non-finite values at ${m}`});else{const Ae={path:m,color:[...q],intensity:Z,worldMatrix:ye,visible:Xe.computeVisibility(i,m,s)!=="invisible"};if(g.typeName==="RectLight")try{if(Z<0||q.some(ue=>ue<0))throw new Error("RectLight emission must be nonnegative");const fe=wf(g,s);fe.unsupported.length&&ie(l,{severity:"warning",code:"UNSUPPORTED_LIGHT_FEATURE",path:m,typeName:g.typeName,message:`RectLight profile does not evaluate ${fe.unsupported.join(", ")}`}),a.push({...Ae,type:"rect",...fe})}catch(fe){ie(l,{severity:"error",code:"INVALID_LIGHT",path:m,typeName:g.typeName,message:String(fe)})}else if(g.typeName==="DistantLight")a.push({...Ae,type:"distant"});else{const fe=new Set(["automatic","latlong","mirroredBall","angular","cubeMapVerticalCross"]),ue=j(g,"inputs:texture:format",s),oe=typeof ue=="string"&&fe.has(ue)?ue:"automatic",Dt=bf(j(g,"inputs:texture:file",s));let kt;if(Dt){const cs=i.getPropertyStack(`${m}.inputs:texture:file`)[0]?.layerIdentifier??i.rootLayerPath;kt={assetPath:Dt,resolvedPath:Yi(cs,Dt)},ie(l,{severity:e.unsupported==="error"?"error":"warning",code:"UNSUPPORTED_DOME_TEXTURE",path:m,typeName:g.typeName,message:`Textured DomeLight IBL is unsupported at ${m}; textureless emission remains available`})}a.push({...Ae,type:"dome",textureFormat:oe,...kt?{textureAsset:kt}:{}})}}continue}if(g.typeName==="PointInstancer"){const q=Se.getPrototypes(g),Z=Se.getProtoIndices(g,s),ye=Se.getPositions(g,s);if(q.length===0&&Z.length===0&&ye.length===0)continue;const Ae=Se.getOrientations(g,s),fe=Se.getScales(g,s),ue=["velocities","accelerations","angularVelocities"].some(Fe=>Ht(j(g,Fe,s)).length>0),oe=Se.computeInstanceTransforms(g,{time:s,applyMask:!0,includeProtoXform:!0,stage:i}),Dt=Z.find(Fe=>!Number.isInteger(Fe)||Fe<0||Fe>=q.length),kt=q.length===0?"(no targets)":q.find(Fe=>!i.getPrim(Fe)),cs=q.find(Fe=>i.getPrim(Fe)!==void 0&&!u.some(Ct=>od(Ct,Fe)&&i.getPrim(Ct)?.typeName==="Mesh")),Y=ye.length!==Z.length||Ae.length>0&&Ae.length!==Z.length||fe.length>0&&fe.length!==Z.length;if(ue&&ie(l,{severity:"warning",code:"POINT_INSTANCER_UNSUPPORTED_MOTION",path:m,typeName:g.typeName,message:`Velocity-based PointInstancer motion is unsupported at ${m}`}),kt!==void 0?ie(l,{severity:"error",code:"POINT_INSTANCER_MISSING_PROTOTYPE",path:m,typeName:g.typeName,message:`PointInstancer has a missing prototype target (${kt})`}):cs!==void 0?ie(l,{severity:"error",code:"POINT_INSTANCER_UNSUPPORTED_PROTOTYPE",path:m,typeName:g.typeName,message:`PointInstancer prototype subtree contains no Mesh (${cs})`}):Y?ie(l,{severity:"error",code:"POINT_INSTANCER_INCONSISTENT_ARRAYS",path:m,typeName:g.typeName,message:`PointInstancer arrays have inconsistent lengths at ${m}`}):Dt!==void 0&&ie(l,{severity:"error",code:"POINT_INSTANCER_INVALID_INDEX",path:m,typeName:g.typeName,message:`PointInstancer has invalid prototype index (${Dt}) at ${m}`}),!(kt!==void 0||cs!==void 0||Y||Dt!==void 0)){const Fe=r.getLocalToWorldTransform(m),Ct=oe.xforms.map(Te=>[...V(Te,Fe)]);Ct.some(Te=>!Kn(Te))?ie(l,{severity:"error",code:"INVALID_TRANSFORM",path:m,typeName:g.typeName,message:`PointInstancer produced a non-finite transform at ${m}`}):c.push({path:m,prototypes:[...q],protoIndices:[...oe.protoIndices],instanceWorldMatrices:Ct,visible:Xe.computeVisibility(i,m,s)!=="invisible"})}continue}let S,_="none",P="rightHanded",w=[],v="edgeAndCorner",b="cornersPlus1",I="catmullClark",T=[],E=[],D=[],N=[],x=[],R;if(g.typeName==="Mesh"){const q=ua(j(g,"primvars:normals",s)),Z=q.length>0?q:ua(j(g,"normals",s));S={points:ua(j(g,"points",s)),faceVertexCounts:Ht(j(g,"faceVertexCounts",s)),faceVertexIndices:Ht(j(g,"faceVertexIndices",s)),...Z.length>0?{normals:Z}:{}};const ye=Dw(g,m,S.points.length,S.faceVertexCounts.length,S.faceVertexIndices.length,l,s);ye&&(S.uvs=ye);const fe=g.getAttr(q.length>0?"primvars:normals":"normals")?.getField("interpolation"),ue=Z.length===S.points.length?"vertex":Z.length===S.faceVertexIndices.length?"faceVarying":Z.length===S.faceVertexCounts.length?"uniform":Z.length===1?"constant":"vertex";R=Di(fe,["constant","uniform","varying","vertex","faceVarying"],ue),_=Di(j(g,"subdivisionScheme"),["catmullClark","none","loop","bilinear"],"catmullClark"),P=Di(j(g,"orientation"),["rightHanded","leftHanded"],"rightHanded"),w=Ht(j(g,"holeIndices",s)),v=Di(j(g,"interpolateBoundary"),["none","edgeOnly","edgeAndCorner"],"edgeAndCorner"),b=Di(j(g,"faceVaryingLinearInterpolation"),["none","cornersOnly","cornersPlus1","cornersPlus2","boundaries","all"],"cornersPlus1"),I=Di(j(g,"triangleSubdivisionRule"),["catmullClark","smooth"],"catmullClark"),T=Ht(j(g,"creaseIndices",s)),E=Ht(j(g,"creaseLengths",s)),D=Ht(j(g,"creaseSharpnesses",s)),N=Ht(j(g,"cornerIndices",s)),x=Ht(j(g,"cornerSharpnesses",s));const oe=S.faceVertexCounts.length,Dt=E.reduce((Y,Ys)=>Y+Math.max(0,Ys-1),0),kt=E.some(Y=>!Number.isInteger(Y)||Y<2)||E.reduce((Y,Ys)=>Y+Ys,0)!==T.length||T.some(Y=>!Number.isInteger(Y)||Y<0||Y>=S.points.length)||![0,E.length,Dt].includes(D.length)||D.some(Y=>!Number.isFinite(Y)||Y<0)||N.length!==x.length||N.some(Y=>!Number.isInteger(Y)||Y<0||Y>=S.points.length)||x.some(Y=>!Number.isFinite(Y)||Y<0),cs=_==="loop"&&S.faceVertexCounts.some(Y=>Y!==3);(w.some(Y=>!Number.isInteger(Y)||Y<0||Y>=oe)||kt||cs)&&(ie(l,{severity:"error",code:"INVALID_MESH_TOPOLOGY",path:m,typeName:"Mesh",message:`Mesh has invalid holes, subdivision tags, or Loop faces at ${m}`}),S=void 0),S&&!Cw(m,S,l,R)&&(S=void 0)}else if(g.typeName==="Sphere"){const q=j(g,"radius",s)??1;!Number.isFinite(q)||q<=0?ie(l,{severity:"error",code:"INVALID_MESH_VALUE",path:m,typeName:g.typeName,message:`Sphere radius must be finite and positive at ${m}`}):S=Pw(q)}if(!S){g.typeName!=="Mesh"&&g.typeName!=="Sphere"&&!xw.has(g.typeName)&&l.push({severity:e.unsupported==="error"?"error":"warning",code:"UNSUPPORTED_PRIM_TYPE",path:m,typeName:g.typeName,message:`Unsupported USD prim type "${g.typeName}" at ${m}`});continue}const U=[...r.getLocalToWorldTransform(m)];if(!Kn(U)){ie(l,{severity:"error",code:"INVALID_TRANSFORM",path:m,typeName:g.typeName,message:`Prim has a non-finite world transform at ${m}`});continue}const $=Uc(i,m,l,s),Ie=g.typeName==="Mesh"?kw(i,m,S.faceVertexCounts.length,l,s):[],le=Aw(i,m);o.push({path:m,sourceType:g.typeName,...S,...$?{material:$}:{},...Ie.length>0?{materialSubsets:Ie}:{},...R?{normalsInterpolation:R}:{},subdivisionScheme:_,orientation:P,holeIndices:w,interpolateBoundary:v,faceVaryingLinearInterpolation:b,triangleSubdivisionRule:I,creaseIndices:T,creaseLengths:E,creaseSharpnesses:D,cornerIndices:N,cornerSharpnesses:x,...le!==void 0?{doubleSided:le}:{},worldMatrix:U,visible:Xe.computeVisibility(i,m,s)!=="invisible"})}const d=[...new Set(c.flatMap(m=>m.prototypes))].sort().map(m=>{const g=as(r.getLocalToWorldTransform(m));return{path:m,components:o.filter(S=>od(S.path,m)).map(S=>({meshPath:S.path,prototypeRelativeMatrix:[...V(S.worldMatrix,g)],visible:S.visible}))}}),f=new Set(d.filter(m=>m.components.length===0).map(m=>m.path));for(const m of c)for(const g of m.prototypes)f.has(g)&&ie(l,{severity:"error",code:"POINT_INSTANCER_UNSUPPORTED_PROTOTYPE",path:m.path,typeName:"PointInstancer",message:`PointInstancer prototype has no valid baked meshes (${g})`});const p=c.filter(m=>m.prototypes.every(g=>!f.has(g))),y=d.filter(m=>!f.has(m.path));if(e.unsupported==="error")for(const m of l)m.code.includes("UNSUPPORTED")&&(m.severity="error");if(l.sort((m,g)=>m.path.localeCompare(g.path)||m.code.localeCompare(g.code)||m.message.localeCompare(g.message)),e.unsupported==="error"&&l.some(m=>m.severity==="error"))throw new Tw(l);return{compilation:{root:t,...s!==void 0?{time:s}:{},unsupported:n},stage:{upAxis:sw(i),metersPerUnit:iw(i),timeCodesPerSecond:i.timeCodesPerSecond,...i.startTimeCode!==void 0?{startTimeCode:i.startTimeCode}:{},...i.endTimeCode!==void 0?{endTimeCode:i.endTimeCode}:{}},meshes:o,lights:a,prototypes:y,pointInstancers:p,diagnostics:l}}const Mw=["inputs:width","inputs:height","inputs:normalize","inputs:intensity","inputs:color","inputs:exposure","inputs:colorTemperature","inputs:enableColorTemperature"],Ew=["protoIndices","ids","positions","orientations","scales","invisibleIds"];function Mi(i,e,t){const s=i.getPrim(e)?.getAttr(t);return!!s&&s.getTimeSampleKeys().length>0}function Bw(i,e){const t=i.getPrim(e)?.getAttr("xformOpOrder")?.getValue();return t?t.some(s=>!s.startsWith("!")&&Mi(i,e,s)):!1}function Ow(i,e,t){const s=i.getPrim(e)?.getAttr("primvars:displayColor")?.getValueAtTime(t);if(!Array.isArray(s)||!Array.isArray(s[0]))return;const n=s[0].slice(0,3);if(!(n.length<3||!n.every(r=>typeof r=="number"&&Number.isFinite(r))))return n}function Rw(i,e,t){const s=i.getPrim(e)?.getAttr("primvars:displayOpacity")?.getValueAtTime(t),n=Array.isArray(s)?s[0]:s;return typeof n=="number"&&Number.isFinite(n)?n:void 0}function Fw(i,e,t,s={}){const n=new Set(s.forceDynamic??[]),r=new Set(s.forceMaterial??[]),o=(I,T)=>I===T||I.startsWith(`${T}/`),a=[],c=[],l=[],u=[];for(const I of t){if(I.slice(I.lastIndexOf("/")+1).includes("."))continue;const T=n.has(I);(T||Bw(i,I))&&a.push(I),(T||Mi(i,I,"visibility"))&&c.push(I),(T||Mi(i,I,"primvars:displayColor"))&&l.push(I),(T||Mi(i,I,"primvars:displayOpacity"))&&u.push(I)}const h=new Set,d=new Set,f=new Set,p=new Set,y=new Set;for(const I of e.meshes)a.some(T=>o(I.path,T))&&h.add(I.path),c.some(T=>o(I.path,T))&&d.add(I.path),l.includes(I.path)&&f.add(I.path),u.includes(I.path)&&p.add(I.path),r.has(I.path)&&y.add(I.path);const m=[...new Set([...h,...d,...f,...p,...y])],g=e.lights.filter(I=>n.has(I.path)||Mw.some(T=>Mi(i,I.path,T))||a.some(T=>o(I.path,T))||c.some(T=>o(I.path,T))).map(I=>I.path),S=new Map(e.lights.map(I=>[I.path,I])),_=e.pointInstancers.filter(I=>n.has(I.path)||Ew.some(T=>Mi(i,I.path,T))||a.some(T=>o(I.path,T)||I.prototypes.some(E=>o(E,T)||o(T,E)))||c.some(T=>o(I.path,T)||I.prototypes.some(E=>o(E,T)||o(T,E)))),P=_.map(I=>I.path),w=new Map(_.map(I=>[I.path,I])),v=new Map(e.prototypes.map(I=>[I.path,I])),b=new _f(i);return{meshPaths:m,lightPaths:g,pointInstancerPaths:P,sample(I){b.setTime(I),n.size>0&&b.clear();const T=m.map(x=>{const R=f.has(x)?Ow(i,x,I):void 0,U=p.has(x)?Rw(i,x,I):void 0,$=y.has(x)?Uc(i,x,[],I):void 0;return{path:x,...h.has(x)?{worldMatrix:b.getLocalToWorldTransform(x)}:{},...d.has(x)?{visible:Xe.computeVisibility(i,x,I)!=="invisible"}:{},...R?{displayColor:R}:{},...U!==void 0?{displayOpacity:U}:{},...$?{material:$}:{}}}),E=g.map(x=>{const{color:R,intensity:U}=at.computeBaseEmission(i.getPrim(x),I);return{path:x,type:S.get(x).type,color:R,intensity:U,...S.get(x).type==="rect"?wf(i.getPrim(x),I):{},worldMatrix:b.getLocalToWorldTransform(x),visible:Xe.computeVisibility(i,x,I)!=="invisible"}}),D=[],N=[];for(const x of P){const R=i.getPrim(x),U=w.get(x);if(!R){N.push({path:x,code:"INVALID_POINT_INSTANCER",message:`PointInstancer no longer exists at ${x}`});continue}const $=Se.computeInstanceTransforms(R,{time:I,applyMask:!0,includeProtoXform:!0,stage:i});if($.protoIndices.length!==U.protoIndices.length||$.protoIndices.some((Z,ye)=>Z!==U.protoIndices[ye])){N.push({path:x,code:"POINT_INSTANCER_TOPOLOGY_CHANGED",message:`PointInstancer instance count, mask, or prototype assignment changed at ${x}`});continue}const le=b.getLocalToWorldTransform(x),q=U.prototypes.flatMap((Z,ye)=>{const Ae=v.get(Z);if(!Ae)return[];const fe=as(b.getLocalToWorldTransform(Z));return Ae.components.map(ue=>({prototypeIndex:ye,meshPath:ue.meshPath,prototypeRelativeMatrix:[...V(b.getLocalToWorldTransform(ue.meshPath),fe)],visible:Xe.computeVisibility(i,ue.meshPath,I)!=="invisible"}))});D.push({path:x,protoIndices:[...$.protoIndices],instanceWorldMatrices:$.xforms.map(Z=>[...V(Z,le)]),prototypeComponents:q,visible:Xe.computeVisibility(i,x,I)!=="invisible"})}return{meshes:T,lights:E,pointInstancers:D,rebakeReasons:N}}}}const Gw={Plugins:[{Info:{SdfMetadata:{weight:{appliesTo:["attributes"],default:0,displayGroup:"BlendShape",documentation:"The weight value at which an inbeteen shape is applied.",type:"float"}},Types:{UsdSkelAnimation:{alias:{UsdSchemaBase:"SkelAnimation"},autoGenerated:!0,bases:["UsdTyped"],schemaIdentifier:"SkelAnimation",schemaKind:"concreteTyped"},UsdSkelBindingAPI:{alias:{UsdSchemaBase:"SkelBindingAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"SkelBindingAPI",schemaKind:"singleApplyAPI"},UsdSkelBlendShape:{alias:{UsdSchemaBase:"BlendShape"},autoGenerated:!0,bases:["UsdTyped"],schemaIdentifier:"BlendShape",schemaKind:"concreteTyped"},UsdSkelRoot:{alias:{UsdSchemaBase:"SkelRoot"},autoGenerated:!0,bases:["UsdGeomBoundable"],implementsComputeExtent:!0,schemaIdentifier:"SkelRoot",schemaKind:"concreteTyped"},UsdSkelSkeleton:{alias:{UsdSchemaBase:"Skeleton"},autoGenerated:!0,bases:["UsdGeomBoundable"],implementsComputeExtent:!0,schemaIdentifier:"Skeleton",schemaKind:"concreteTyped"}}},LibraryPath:"@PLUG_INFO_LIBRARY_PATH@",Name:"usdSkel",ResourcePath:"@PLUG_INFO_RESOURCE_PATH@",Root:"@PLUG_INFO_ROOT@",Type:"library"}]},$w=`#usda 1.0
(
    "WARNING: THIS FILE IS GENERATED BY usdGenSchema.  DO NOT EDIT."
)

class SkelRoot "SkelRoot" (
    customData = {
        string userDocBrief = """Boundable prim type used to identify a scope beneath which
    skeletally-posed primitives are defined."""
    }
)
{
    float3[] extent (
        customData = {
            string userDocBrief = """Extent is a three dimensional range measuring the geometric
        extent of the authored gprim in its own local space (i.e."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class Skeleton "Skeleton" (
    customData = {
        string userDocBrief = "Describes a skeleton."
    }
)
{
    uniform matrix4d[] bindTransforms (
        customData = {
            string userDocBrief = """Specifies the bind-pose transforms of each joint in
        **world space**, in the ordering imposed by *joints*."""
        }
    )
    float3[] extent (
        customData = {
            string userDocBrief = """Extent is a three dimensional range measuring the geometric
        extent of the authored gprim in its own local space (i.e."""
        }
    )
    uniform token[] jointNames (
        customData = {
            string userDocBrief = "If authored, provides a unique name per joint."
        }
    )
    uniform token[] joints (
        customData = {
            string userDocBrief = """An array of path tokens identifying the set of joints that make
        up the skeleton, and their order."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = '''The proxyPrim relationship allows us to link a
        prim whose purpose is "render" to its (single target)
        purpose="proxy" prim.'''
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Purpose is a classification of geometry into categories that 
        can each be independently included or excluded from traversals of prims 
        on a stage, such as rendering or bounding-box computation traversals."""
        }
    )
    uniform matrix4d[] restTransforms (
        customData = {
            string userDocBrief = """Specifies the rest-pose transforms of each joint in
        **local space**, in the ordering imposed by *joints*."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = '''Visibility is meant to be the simplest form of "pruning" 
        visibility that is supported by most DCC apps.'''
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation operations in the
        order in which they should be pushed onto a transform stack while
        visiting a UsdStage's prims in a graph traversal that will effect
        the desired positioning for this prim and its descendant prims."""
        }
    )
}

class SkelAnimation "SkelAnimation" (
    customData = {
        string userDocBrief = """Describes a skel animation, where joint animation is stored in a
    vectorized form."""
    }
)
{
    uniform token[] blendShapes (
        customData = {
            string userDocBrief = """Array of tokens identifying which blend shapes this
         animation's data applies to."""
        }
    )
    float[] blendShapeWeights (
        customData = {
            string userDocBrief = "Array of weight values for each blend shape."
        }
    )
    uniform token[] joints (
        customData = {
            string userDocBrief = """Array of tokens identifying which joints this animation's
        data applies to."""
        }
    )
    quatf[] rotations (
        customData = {
            string userDocBrief = """Joint-local unit quaternion rotations of all affected joints, 
        in 32-bit precision."""
        }
    )
    half3[] scales (
        customData = {
            string userDocBrief = """Joint-local scales of all affected joints, in
        16 bit precision."""
        }
    )
    float3[] translations (
        customData = {
            string userDocBrief = "Joint-local translations of all affected joints."
        }
    )
}

class "SkelBindingAPI" (
    customData = {
        string userDocBrief = '''Provides API for authoring and extracting all the skinning-related
    data that lives in the "geometry hierarchy" of prims and models that want
    to be skeletally deformed.'''
    }
)
{
    matrix4d primvars:skel:geomBindTransform (
        customData = {
            string userDocBrief = "Encodes the bind-time world space transforms of the prim."
        }
    )
    int[] primvars:skel:jointIndices (
        customData = {
            string userDocBrief = """Indices into the *joints* attribute of the closest
        (in namespace) bound Skeleton that affect each point of a PointBased
        gprim."""
        }
    )
    float[] primvars:skel:jointWeights (
        customData = {
            string userDocBrief = """Weights for the joints that affect each point of a PointBased
        gprim."""
        }
    )
    uniform token primvars:skel:skinningMethod = "classicLinear" (
        allowedTokens = ["classicLinear", "dualQuaternion"]
        customData = {
            string userDocBrief = "The skinningMethod specifies the skinning method for the prim."
        }
    )
    rel skel:animationSource (
        customData = {
            string userDocBrief = """Animation source to be bound to Skeleton primitives at or
        beneath the location at which this property is defined."""
        }
    )
    uniform token[] skel:blendShapes (
        customData = {
            string userDocBrief = """An array of tokens defining the order onto which blend shape
        weights from an animation source map onto the *skel:blendShapeTargets*
        rel of a binding site."""
        }
    )
    rel skel:blendShapeTargets (
        customData = {
            string userDocBrief = "Ordered list of all target blend shapes."
        }
    )
    uniform token[] skel:joints (
        customData = {
            string userDocBrief = """An (optional) array of tokens defining the list of
        joints to which jointIndices apply."""
        }
    )
    rel skel:skeleton (
        customData = {
            string userDocBrief = """Skeleton to be bound to this prim and its descendents that
        possess a mapping and weighting to the joints of the identified
        Skeleton."""
        }
    )
}

class BlendShape "BlendShape" (
    customData = {
        string userDocBrief = """Describes a target blend shape, possibly containing inbetween
      shapes."""
    }
)
{
    uniform vector3f[] normalOffsets (
        customData = {
            string userDocBrief = "**Required property**."
        }
    )
    uniform vector3f[] offsets (
        customData = {
            string userDocBrief = "**Required property**."
        }
    )
    uniform int[] pointIndices (
        customData = {
            string userDocBrief = "**Optional property**."
        }
    )
}

`;ze.GetInstance().RegisterPlugins(Gw,{usdSkel:{"generatedSchema.usda":$w}});function Lw(i){const e=[];let t=i;for(;;){const s=t.lastIndexOf("/");if(s<=0){s===0&&t.length>1&&e.push("/");break}t=t.slice(0,s),e.push(t)}return e}function Vw(i){const e=new Map;for(let s=0;s<i.length;s++)e.set(i[s],s);const t=new Int32Array(i.length).fill(-1);for(let s=0;s<i.length;s++)for(const n of Lw(i[s])){const r=e.get(n);if(r!==void 0){t[s]=r;break}}return t}class Uw{_parentIndices;constructor(e){e instanceof Int32Array?this._parentIndices=e:e.length>0&&typeof e[0]=="number"?this._parentIndices=new Int32Array(e):this._parentIndices=Vw(e)}get size(){return this._parentIndices.length}getNumJoints(){return this.size}getParentIndices(){return this._parentIndices}getParent(e){return this._parentIndices[e]??-1}isRoot(e){return this.getParent(e)<0}validate(){for(let e=0;e<this.size;e++){const t=this._parentIndices[e];if(t>=0&&t>=e)return t===e?{valid:!1,reason:`Joint ${e} has itself as its parent.`}:{valid:!1,reason:`Joint ${e} has mis-ordered parent ${t}. Joints are expected to be ordered with parent joints always coming before children.`}}return{valid:!0}}}class ro{_targetSize;_offset=0;_flags=0;_indexMap=new Int32Array(0);_mappedCount=0;constructor(e,t){if(typeof e=="number"){this._targetSize=e,this._flags=7;return}const s=e,n=t??[];if(this._targetSize=n.length,s.length===0||n.length===0){this._flags=0;return}const r=n.indexOf(s[0]);if(r>=0&&r+s.length<=n.length){let l=!0;for(let u=0;u<s.length;u++)if(s[u]!==n[r+u]){l=!1;break}if(l){this._offset=r,this._flags=3,r===0&&s.length===n.length&&(this._flags|=4);return}}const o=new Map;for(let l=0;l<n.length;l++)o.set(n[l],l);this._indexMap=new Int32Array(s.length);const a=new Set;let c=0;for(let l=0;l<s.length;l++){const u=o.get(s[l]);u!==void 0?(this._indexMap[l]=u,a.add(u),c++):this._indexMap[l]=-1}if(this._mappedCount=c,c===0){this._flags=0,this._indexMap=new Int32Array(0);return}this._flags=8,c===s.length&&(this._flags|=2),a.size===n.length&&(this._flags|=4)}get size(){return this._targetSize}isIdentity(){return(this._flags&1)!==0&&(this._flags&4)!==0&&this._offset===0}isSparse(){return(this._flags&4)===0}isNull(){return this._flags===0}remap(e,t,s=1,n){if(s<=0)throw new Error(`invalid elementSize ${s}`);const r=new Array(this._targetSize*s);for(let o=0;o<r.length;o++){const a=t?.[o];r[o]=a!==void 0?a:n}if(this.isNull())return r;if(this._flags&1){const o=Math.min(e.length,(this._targetSize-this._offset)*s);for(let a=0;a<o;a++)r[this._offset*s+a]=e[a];return r}for(let o=0;o<this._indexMap.length;o++){const a=this._indexMap[o];if(!(a<0))for(let c=0;c<s;c++){const l=e[o*s+c];l!==void 0&&(r[a*s+c]=l)}}return r}}function vf(i,e,t){const n=[...Qr(e[0],e[1],e[2],e[3])];for(let r=0;r<3;r++)n[0+r]=n[0+r]*(t[0]??1),n[4+r]=n[4+r]*(t[1]??1),n[8+r]=n[8+r]*(t[2]??1);return n[12]=i[0]??0,n[13]=i[1]??0,n[14]=i[2]??0,n}function zw(i,e,t){if(e.length!==i.size)throw new Error(`Size of jointLocalXforms [${e.length}] != number of joints [${i.size}]`);const s=new Array(i.size);for(let n=0;n<i.size;n++){const r=i.getParent(n);if(r>=0){if(r>=n)throw new Error(`Joint ${n} has mis-ordered parent ${r}.`);s[n]=V(e[n],s[r])}else s[n]=e[n]}return s}function ad(i,e){if(e<0)return!1;const t=[...i];i.length=0;for(let s=0;s<e;s++)i.push(...t);return!0}function jw(i,e,t,s,n,r){const o=Math.floor(r.length/3),a=new Float32Array(o*3),c=t.length===n&&o*n!==n;for(let l=0;l<o;l++){const[u,h,d]=sn(i,r[l*3],r[l*3+1],r[l*3+2]);let f=0,p=0,y=0;for(let m=0;m<n;m++){const g=c?m:l*n+m,S=t[g];if(S<0||S>=e.length)throw new Error(`Out of range joint index ${S} at index ${g} (num joints = ${e.length}).`);const _=s[g];if(_===0)continue;const[P,w,v]=sn(e[S],u,h,d);f+=P*_,p+=w*_,y+=v*_}a[l*3]=f,a[l*3+1]=p,a[l*3+2]=y}return a}function Ww(i){const e=uf(i),t=tr(e),s=new qi(new Ne(t[0],t[1],t[2],t[3]),[i[12],i[13],i[14]]),n=[...e];n[12]=i[12],n[13]=i[13],n[14]=i[14];const r=V(i,as(n)),o=[0,1,2,4,5,6,8,9,10].some(a=>Math.abs(r[a]-(a===0||a===5||a===10?1:0))>1e-6);return{dualQuat:s,scale:r,hasScale:o}}function qw(i,e,t,s,n,r){const o=Math.floor(r.length/3),a=new Float32Array(o*3),c=t.length===n&&o>1;if(t.length!==s.length||!c&&t.length!==o*n)throw new Error("Joint influence array size does not match points");const l=e.map(Ww),u=l.some(h=>h.hasScale);for(let h=0;h<o;h++){const d=sn(i,r[h*3],r[h*3+1],r[h*3+2]);let f=-1,p=-1/0;for(let _=0;_<n;_++){const P=c?_:h*n+_,w=t[P];if(w<0||w>=l.length)throw new Error(`Out of range joint index ${w} at index ${P}`);const v=s[P];v>p&&(p=v,f=w)}const y=l[f].dualQuat.GetReal();let m=qi.GetZero();const g=[0,0,0];for(let _=0;_<n;_++){const P=c?_:h*n+_,w=l[t[P]];let v=s[P];if(v!==0){if(u){const b=sn(w.scale,d[0],d[1],d[2]);g[0]+=b[0]*v,g[1]+=b[1]*v,g[2]+=b[2]*v}Gi(w.dualQuat.GetReal(),y)<0&&(v=-v),m=m.Add(w.dualQuat.GetScaled(v))}}m.Normalize();const S=m.Transform(u?g:d).data;a[h*3]=S[0],a[h*3+1]=S[1],a[h*3+2]=S[2]}return a}function cd(i,e,t,s){const n=as(i),r=e*n[0]+t*n[1]+s*n[2],o=e*n[4]+t*n[5]+s*n[6],a=e*n[8]+t*n[9]+s*n[10],c=Math.hypot(r,o,a);return c>0?[r/c,o/c,a/c]:[0,0,0]}function ld(i){const e=as(i);return[e[0],e[4],e[8],0,e[1],e[5],e[9],0,e[2],e[6],e[10],0,0,0,0,1]}function ud(i,e){return[e[0]*i[0]+e[1]*i[4]+e[2]*i[8],e[0]*i[1]+e[1]*i[5]+e[2]*i[9],e[0]*i[2]+e[1]*i[6]+e[2]*i[10]]}function Hw(i,e,t,s,n,r,o){const a=ld(i),c=e.map(f=>{const p=ld(f),y=uf(p),m=tr(y),g=V(p,as(y)),S=[0,1,2,4,5,6,8,9,10].some(_=>Math.abs(g[_]-(_===0||_===5||_===10?1:0))>1e-6);return{quat:new Ne(m[0],m[1],m[2],m[3]),scale:g,hasScale:S}}),l=c.some(f=>f.hasScale),u=Math.floor(r.length/3),h=t.length===n,d=new Float32Array(u*3);for(let f=0;f<u;f++){const p=o?o[f]:f,y=ud(a,[r[f*3],r[f*3+1],r[f*3+2]]);let m=-1,g=-1/0;for(let b=0;b<n;b++){const I=h?b:p*n+b,T=s[I];T>g&&(g=T,m=t[I])}const S=c[m].quat;let _=Ne.GetZero();const P=[0,0,0];for(let b=0;b<n;b++){const I=h?b:p*n+b,T=c[t[I]];let E=s[I];if(E!==0){if(l){const D=ud(T.scale,y);P[0]+=D[0]*E,P[1]+=D[1]*E,P[2]+=D[2]*E}Gi(T.quat,S)<0&&(E=-E),_=_.Add(T.quat.GetScaled(E))}}_.Normalize();const w=_.Transform(new k(...l?P:y)).data,v=Math.hypot(w[0],w[1],w[2]);v>0&&(d[f*3]=w[0]/v,d[f*3+1]=w[1]/v,d[f*3+2]=w[2]/v)}return d}function Kw(i,e,t,s,n,r,o){const a=Math.floor(r.length/3),c=new Float32Array(a*3),l=t.length===n;for(let u=0;u<a;u++){const h=o?o[u]:u,d=cd(i,r[u*3],r[u*3+1],r[u*3+2]);let f=0,p=0,y=0;for(let g=0;g<n;g++){const S=l?g:h*n+g,_=t[S];if(_<0||_>=e.length)throw new Error(`Out of range joint index ${_} at index ${S}`);const P=cd(e[_],...d),w=s[S];f+=P[0]*w,p+=P[1]*w,y+=P[2]*w}const m=Math.hypot(f,p,y);m>0&&(f/=m,p/=m,y/=m),c[u*3]=f,c[u*3+1]=p,c[u*3+2]=y}return c}function Zw(i,e,t,s){if(Math.abs(i)<=1e-6)return!0;const n=Math.floor(s.length/3);if(t.length===0){if(e.length!==n)return!1;for(let r=0;r<n;r++){const o=e[r];s[r*3]=(s[r*3]??0)+o[0]*i,s[r*3+1]=(s[r*3+1]??0)+o[1]*i,s[r*3+2]=(s[r*3+2]??0)+o[2]*i}return!0}if(e.length!==t.length)return!1;for(let r=0;r<t.length;r++){const o=t[r];if(o<0||o>=n)return!1;const a=e[r];s[o*3]=(s[o*3]??0)+a[0]*i,s[o*3+1]=(s[o*3+1]??0)+a[1]*i,s[o*3+2]=(s[o*3+2]??0)+a[2]*i}return!0}function Zn(i,e,t){const s=G(i,e,t);return Array.isArray(s)?s.filter(n=>typeof n=="string"):[]}function oo(i,e,t){const s=G(i,e,t);return Array.isArray(s)?s.map(Number):[]}function rn(i,e,t){const s=G(i,e,t);return Array.isArray(s)?s:[]}function hd(i,e,t){const s=G(i,e,t);return Array.isArray(s)?s.map(n=>Array.isArray(n[0])?n.flat():n):[]}class gi extends Gs{static typeName="Skeleton";static define(e,t){return new gi(e.definePrim(t,gi.typeName),e)}static is(e){return e.typeName===gi.typeName}getJointsAttr(){return this._attr("joints","uniform token[]")}getJointNamesAttr(){return this._attr("jointNames","uniform token[]")}getBindTransformsAttr(){return this._attr("bindTransforms","uniform matrix4d[]")}getRestTransformsAttr(){return this._attr("restTransforms","uniform matrix4d[]")}static getJoints(e){return Zn(e,"joints")}static getBindTransforms(e){return hd(e,"bindTransforms")}static getRestTransforms(e){return hd(e,"restTransforms")}}class Ye extends Lc{static typeName="SkelAnimation";static define(e,t){return new Ye(e.definePrim(t,Ye.typeName),e)}static is(e){return e.typeName===Ye.typeName}getJointsAttr(){return this._attr("joints","uniform token[]")}getTranslationsAttr(){return this._attr("translations","float3[]")}getRotationsAttr(){return this._attr("rotations","quatf[]")}getScalesAttr(){return this._attr("scales","half3[]")}getBlendShapesAttr(){return this._attr("blendShapes","uniform token[]")}getBlendShapeWeightsAttr(){return this._attr("blendShapeWeights","float[]")}static getJoints(e){return Zn(e,"joints")}static getTranslations(e,t){return rn(e,"translations",t)}static getRotations(e,t){const s=G(e,"rotations",t);return Array.isArray(s)?s.map(n=>$c(n)):[]}static getScales(e,t){return rn(e,"scales",t)}static getBlendShapes(e){return Zn(e,"blendShapes")}static getBlendShapeWeights(e,t){return oo(e,"blendShapeWeights",t)}}class Ee extends wi{static apply(e,t){const s=e.definePrim(t);return s.applyAPI("SkelBindingAPI"),new Ee(s,e)}createSkeletonRel(e){return this.prim.createRel("skel:skeleton",[e])}createAnimationSourceRel(e){return this.prim.createRel("skel:animationSource",[e])}getJointIndicesAttr(){return this._attr("primvars:skel:jointIndices","int[]")}getJointWeightsAttr(){return this._attr("primvars:skel:jointWeights","float[]")}getGeomBindTransformAttr(){return this._attr("primvars:skel:geomBindTransform","matrix4d")}getJointsAttr(){return this._attr("skel:joints","uniform token[]")}getSkinningMethodAttr(){return this._attr("primvars:skel:skinningMethod","token")}getBlendShapesAttr(){return this._attr("skel:blendShapes","uniform token[]")}getBlendShapeTargetsRel(){return this._rel("skel:blendShapeTargets")}createJointIndicesPrimvar(e=!0,t=1){const s=this.getJointIndicesAttr();return s.setMetadata("interpolation",e?"constant":"vertex"),s.setMetadata("elementSize",t),s}createJointWeightsPrimvar(e=!0,t=1){const s=this.getJointWeightsAttr();return s.setMetadata("interpolation",e?"constant":"vertex"),s.setMetadata("elementSize",t),s}setRigidJointInfluence(e,t=1){return this.createJointIndicesPrimvar(!0,1).set([e]),this.createJointWeightsPrimvar(!0,1).set([t]),!0}static getSkeletonTarget(e){return e.getAttr("skel:skeleton")?.getTargets()[0]}static getAnimationSourceTarget(e){return e.getAttr("skel:animationSource")?.getTargets()[0]}static getJointIndices(e,t){return oo(e,"primvars:skel:jointIndices",t)}static getJointWeights(e,t){return oo(e,"primvars:skel:jointWeights",t)}static getNumInfluencesPerPoint(e){const t=e.getAttr("primvars:skel:jointIndices")?.getField("elementSize");return typeof t=="number"&&t>0?t:1}static getSkinningMethod(e){let t=e.path;for(;t!=="/";){const s=e.getStage().getPrim(t);if(s){const r=s.getAttr("primvars:skel:skinningMethod");if(r?.hasAuthoredValue())return r.getValue()==="dualQuaternion"?"dualQuaternion":"classicLinear"}const n=t.lastIndexOf("/");t=n<=0?"/":t.slice(0,n)}return"classicLinear"}static getBlendShapeOrder(e){return Zn(e,"skel:blendShapes")}static getBlendShapeTargets(e){return e.getAttr("skel:blendShapeTargets")?.getTargets()??[]}static getGeomBindTransform(e,t){const s=G(e,"primvars:skel:geomBindTransform",t);if(!Array.isArray(s))return;const n=Array.isArray(s[0])?s.flat():s;return n.length===16?n:void 0}static getJointOrder(e){const t=Zn(e,"skel:joints");return t.length>0?t:void 0}}const Dn="inbetweens:",ha=":normalOffsets";class Pr{constructor(e,t){this.prim=e,this.name=t}get attrName(){return this.name}getAttr(){return this.prim.getAttr(this.attrName)}static isInbetween(e){return e.startsWith(Dn)&&!e.endsWith(ha)}getWeight(){const e=this.prim.getAttr(this.attrName)?.getField("weight");return typeof e=="number"?e:void 0}hasAuthoredWeight(){return typeof this.prim.getAttr(this.attrName)?.getField("weight")=="number"}setWeight(e){return this.getAttr().setMetadata("weight",e),!0}getOffsets(){return rn(this.prim,this.attrName)}setOffsets(e){return this.getAttr().set(e),!0}getNormalOffsets(){return rn(this.prim,`${this.attrName}${ha}`)}createNormalOffsetsAttr(e){const t=`${this.attrName}${ha}`;this.prim.getStage().declareProperty(this.prim.path,t,"vector3f[]");const s=this.prim.attr(t);return e!==void 0&&s.set(e),s}setNormalOffsets(e){return this.createNormalOffsetsAttr().set(e),!0}}class gs extends wi{static typeName="BlendShape";static define(e,t){return new gs(e.definePrim(t,gs.typeName),e)}static is(e){return e.typeName===gs.typeName}getOffsetsAttr(){return this._attr("offsets","uniform vector3f[]")}getNormalOffsetsAttr(){return this._attr("normalOffsets","uniform vector3f[]")}getPointIndicesAttr(){return this._attr("pointIndices","uniform int[]")}static getOffsets(e){return rn(e,"offsets")}static getNormalOffsets(e){return rn(e,"normalOffsets")}static getPointIndices(e){return oo(e,"pointIndices")}createInbetween(e){const t=e.startsWith(Dn)?e:`${Dn}${e}`;return this.stage.declareProperty(this.path,t,"uniform point3f[]"),new Pr(this.prim,t)}getInbetween(e){const t=e.startsWith(Dn)?e:`${Dn}${e}`;return this.prim.getAttr(t)?new Pr(this.prim,t):void 0}hasInbetween(e){return this.getInbetween(e)!==void 0}static getInbetweens(e){return e.attrNames.filter(Pr.isInbetween).map(t=>new Pr(e,t))}}const If=1e-6;function wr(i,e,t=If){return Math.abs(i-e)<=t}function da(i){return i.inbetweenIndex>=0}function br(i){return i.weight===0}class Yw{_prim;_subShapes=[];_blendShapes=[];_inbetweens=[];_primaryOffsets=[];_primaryNormalOffsets=[];_pointIndices=[];constructor(e){if(Array.isArray(e)){this._prim=void 0,this._initFromResolved(e);return}const{prim:t,stage:s}=e,r=(t.getAttr("skel:blendShapeTargets")?.getTargets()??[]).map(o=>{const a=s.getPrim(o);if(!a||!gs.is(a))return{offsets:[],inactive:!0};if(!a.isActive)return{offsets:[],inactive:!0};const c=[];for(const l of gs.getInbetweens(a)){const u=l.getWeight();u!==void 0&&c.push({weight:u,offsets:l.getOffsets(),normalOffsets:l.getNormalOffsets()})}return{offsets:gs.getOffsets(a),pointIndices:gs.getPointIndices(a),normalOffsets:gs.getNormalOffsets(a),inbetweens:c}});this._prim=t,this._initFromResolved(r)}_initFromResolved(e){for(let t=0;t<e.length;t++){const s=e[t],n={prim:void 0,firstSubShape:this._subShapes.length,numSubShapes:0};if(this._primaryOffsets[t]=s.offsets??[],this._primaryNormalOffsets[t]=s.normalOffsets??[],this._pointIndices[t]=s.pointIndices??[],s.inactive){this._blendShapes[t]=n;continue}this._subShapes.push({blendShapeIndex:t,inbetweenIndex:-1,weight:1}),this._subShapes.push({blendShapeIndex:t,inbetweenIndex:-1,weight:0});for(const c of s.inbetweens??[]){const l=c.weight;if(wr(l,0)||wr(l,1))continue;const u=this._inbetweens.length;this._subShapes.push({blendShapeIndex:t,inbetweenIndex:u,weight:l}),this._inbetweens.push(c)}n.numSubShapes=this._subShapes.length-n.firstSubShape;const r=n.firstSubShape,o=r+n.numSubShapes,a=this._subShapes.slice(r,o).sort((c,l)=>c.weight-l.weight);for(let c=0;c<a.length;c++)this._subShapes[r+c]=a[c];this._blendShapes[t]=n}}isValid(){return this._prim!==void 0}getPrim(){return this._prim}getNumBlendShapes(){return this._blendShapes.length}getNumSubShapes(){return this._subShapes.length}getBlendShapeIndex(e){return e<this._subShapes.length?this._subShapes[e].blendShapeIndex:0}getInbetween(e){const t=this._subShapes[e];if(t&&da(t))return this._inbetweens[t.inbetweenIndex]}computeBlendShapePointIndices(){return this._blendShapes.map((e,t)=>this._pointIndices[t]??[])}computeSubShapePointOffsets(){return this._subShapes.map(e=>da(e)?this._inbetweens[e.inbetweenIndex].offsets:br(e)?[]:this._primaryOffsets[e.blendShapeIndex]??[])}computeSubShapeNormalOffsets(){return this._subShapes.map(e=>da(e)?this._inbetweens[e.inbetweenIndex].normalOffsets??[]:br(e)?[]:this._primaryNormalOffsets[e.blendShapeIndex]??[])}computeSubShapeWeights(e){if(e.length!==this._blendShapes.length)return null;const t=[],s=[],n=[];for(let r=0;r<e.length;r++){const o=this._blendShapes[r];if(o.numSubShapes<3){if(o.numSubShapes!==2)continue;t.push(e[r]),s.push(r),n.push(o.firstSubShape+1);continue}const a=e[r],c=o.firstSubShape,l=c+o.numSubShapes;let u=l;for(let m=c;m<l;m++)if(a<this._subShapes[m].weight){u=m;break}let h,d;u!==l?u>c?(h=u-1,d=u):(h=c,d=c+1):(h=l-2,d=l-1);const f=this._subShapes[h],p=this._subShapes[d],y=p.weight-f.weight;if(y>If){const m=(a-f.weight)/y;!br(f)&&!wr(m,1)&&(t.push(1-m),s.push(r),n.push(h)),!br(p)&&!wr(m,0)&&(t.push(m),s.push(r),n.push(d))}}return{subShapeWeights:t,blendShapeIndices:s,subShapeIndices:n}}computeFlattenedSubShapeWeights(e){const t=this.computeSubShapeWeights(e);if(!t)return null;const s=new Array(this._subShapes.length).fill(0);for(let n=0;n<t.subShapeWeights.length;n++){const r=t.subShapeIndices[n];r<s.length&&(s[r]=t.subShapeWeights[n])}return s}computeDeformedPoints(e,t,s,n,r,o){if(t.length!==e.length||s.length!==e.length)return!1;for(let a=0;a<e.length;a++){const c=t[a];if(c>=n.length)return!1;const l=s[a];if(l>=r.length)return!1;const u=r[l];if(u.length!==0&&!Zw(e[a],u,n[c],o))return!1}return!0}computeDeformedNormals(e,t,s,n,r,o){if(!this.computeDeformedPoints(e,t,s,n,r,o))return!1;for(let a=0;a+2<o.length;a+=3){const c=o[a],l=o[a+1],u=o[a+2],h=Math.hypot(c,l,u);h>0&&(o[a]=c/h,o[a+1]=l/h,o[a+2]=u/h)}return!0}}class Xw{constructor(e){this.prim=e}getJointOrder(){return Ye.getJoints(this.prim)}getBlendShapeOrder(){return Ye.getBlendShapes(this.prim)}jointTransformsMightBeTimeVarying(){return["translations","rotations","scales"].some(e=>(this.prim.getAttr(e)?.getTimeSampleKeys().length??0)>0)}getJointTransformTimeSamples(){const e=new Set;for(const t of["translations","rotations","scales"])for(const s of this.prim.getAttr(t)?.getTimeSampleKeys()??[])e.add(s);return[...e].sort((t,s)=>t-s)}computeJointLocalTransforms(e){const t=Ye.getTranslations(this.prim,e),s=Ye.getRotations(this.prim,e),n=Ye.getScales(this.prim,e);return s.length===0||t.length>0&&t.length!==s.length||n.length>0&&n.length!==s.length?[]:s.map((r,o)=>vf(t[o]??[0,0,0],r,n[o]??[1,1,1]))}computeBlendShapeWeights(e){return Ye.getBlendShapeWeights(this.prim,e)}}class Af{prim;topology;joints;_restTransforms;_inverseBindTransforms;_animPrim;_animMapper;_animQuery;constructor(e,t){if(this.prim=e,this.joints=gi.getJoints(e),this.topology=new Uw(this.joints),this._restTransforms=gi.getRestTransforms(e),this._inverseBindTransforms=gi.getBindTransforms(e).map(s=>as(s)),this._animPrim=t,this._animQuery=t?new Xw(t):void 0,t){const s=Ye.getJoints(t);this._animMapper=s.length>0?new ro(s,this.joints):new ro(this.joints.length)}}get numJoints(){return this.topology.size}getAnimQuery(){return this._animQuery}hasBindPose(){return this._inverseBindTransforms.length===this.numJoints}hasRestPose(){return this._restTransforms.length===this.numJoints}computeJointLocalTransforms(e,t=!1){const s=this.hasRestPose()?this._restTransforms:new Array(this.numJoints).fill([...Tt]);if(t||!this._animPrim||!this._animMapper)return[...s];const n=Ye.getTranslations(this._animPrim,e),r=Ye.getRotations(this._animPrim,e),o=Ye.getScales(this._animPrim,e);if(r.length===0)return[...s];const a=new Array(r.length);for(let c=0;c<r.length;c++)a[c]=vf(n[c]??[0,0,0],r[c],o[c]??[1,1,1]);return this._animMapper.remap(a,s,1,[...Tt])}computeJointSkelTransforms(e,t=!1){return zw(this.topology,this.computeJointLocalTransforms(e,t))}computeJointRestRelativeTransforms(e){return this.computeJointLocalTransforms(e).map((s,n)=>V(s,as(this._restTransforms[n])))}computeJointWorldTransforms(e,t){return this.computeJointSkelTransforms(t).map(s=>V(s,e))}computeSkinningTransforms(e){if(!this.hasBindPose())throw new Error("Skeleton has no (or mismatched) bindTransforms");return this.computeJointSkelTransforms(e).map((s,n)=>V(this._inverseBindTransforms[n],s))}}class Qw{prim;numInfluencesPerPoint;geomBindTransform;_jointIndices;_jointWeights;_jointMapper;skinningMethod;_interpolation;constructor(e,t){this.prim=e,this._jointIndices=Ee.getJointIndices(e),this._jointWeights=Ee.getJointWeights(e),this.numInfluencesPerPoint=Ee.getNumInfluencesPerPoint(e),this.geomBindTransform=Ee.getGeomBindTransform(e)??[...Tt],this.skinningMethod=Ee.getSkinningMethod(e),this._interpolation=String(e.getAttr("primvars:skel:jointIndices")?.getField("interpolation")??"constant");const s=Ee.getJointOrder(e);this._jointMapper=s?new ro(t,s):null}hasInfluences(){const e=this.prim.getAttr("primvars:skel:jointIndices"),t=this.prim.getAttr("primvars:skel:jointWeights"),s=String(e?.getField("interpolation")??"constant"),n=String(t?.getField("interpolation")??"constant"),r=Number(e?.getField("elementSize")??1),o=Number(t?.getField("elementSize")??1);return this._jointIndices.length>0&&this._jointIndices.length===this._jointWeights.length&&s===n&&["constant","vertex"].includes(s)&&r>0&&r===o}hasJointInfluences(){return this.hasInfluences()}isRigidlyDeformed(){return this._interpolation==="constant"}getNumInfluencesPerComponent(){return this.numInfluencesPerPoint}getSkinningMethod(){return this.skinningMethod}computeJointInfluences(){if(!(!this.hasInfluences()||this._jointIndices.length%this.numInfluencesPerPoint!==0))return[[...this._jointIndices],[...this._jointWeights]]}computeVaryingJointInfluences(e){const t=this.computeJointInfluences();if(!t)return;const[s,n]=t;if(this.isRigidlyDeformed()&&(ad(s,e),ad(n,e)),s.length===e*this.numInfluencesPerPoint)return[s,n]}getInfluences(){return{jointIndices:this._jointIndices,jointWeights:this._jointWeights,numInfluencesPerPoint:this.numInfluencesPerPoint}}remapSkinningXforms(e){return this._jointMapper?this._jointMapper.remap(e,null,1,[...Tt]):e}computeSkinnedPoints(e,t){return(this.skinningMethod==="dualQuaternion"?qw:jw)(this.geomBindTransform,this.remapSkinningXforms(e),this._jointIndices,this._jointWeights,this.numInfluencesPerPoint,t)}computeSkinnedNormals(e,t,s){return(this.skinningMethod==="dualQuaternion"?Hw:Kw)(this.geomBindTransform,this.remapSkinningXforms(e),this._jointIndices,this._jointWeights,this.numInfluencesPerPoint,t,s)}computeExtentsPadding(e){if(e.length===0)return 0;const t=this.prim.getAttr("extent"),s=t?.getTimeSampleKeys()??[],n=s.length>0?t?.getValueAtTime(s[0]):t?.getValue();if(!Array.isArray(n)||n.length!==2||!Array.isArray(n[0])||!Array.isArray(n[1]))return 0;const r=[[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY],[Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY]];for(const h of e)ao(r,[h[12],h[13],h[14]]);const o=n[0],a=n[1],c=[];for(const h of[Number(o[0]),Number(a[0])])for(const d of[Number(o[1]),Number(a[1])])for(const f of[Number(o[2]),Number(a[2])])c.push(h,d,f);const l=[[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY],[Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY]];ao(l,c,this.geomBindTransform);let u=0;for(let h=0;h<3;h++)u=Math.max(u,r[0][h]-l[0][h],l[1][h]-r[1][h]);return u}getBlendShapeOrder(){return Ee.getBlendShapeOrder(this.prim)}hasBlendShapes(){return this.getBlendShapeOrder().length>0&&Ee.getBlendShapeTargets(this.prim).length>0}getBlendShapeMapper(e){return new ro(e,this.getBlendShapeOrder())}getBlendShapeQuery(){return new Yw({prim:this.prim,stage:this.prim.getStage()})}}function Jw(i,e){const t=new Map,s=(n,r,o)=>{const a=i.getPrim(n);if(!a)return;const c=Ee.getSkeletonTarget(a)??r,l=Ee.getAnimationSourceTarget(a)??o;if(c&&(Ee.getJointIndices(a).length>0||Ee.getBlendShapeTargets(a).length>0)){const u=t.get(c)??{skinnedPrimPaths:[]};u.animationPath=u.animationPath??l,u.skinnedPrimPaths.push(n),t.set(c,u)}for(const u of i.getChildPrimPaths(n))s(u,c,l)};return s(e),[...t.entries()].map(([n,r])=>{let o=r.animationPath;if(!o){const a=i.getPrim(n);a&&(o=Ee.getAnimationSourceTarget(a))}return{skeletonPath:n,animationPath:o,skinnedPrimPaths:r.skinnedPrimPaths}})}function ao(i,e,t){for(let s=0;s+2<e.length;s+=3){const n=t?sn(t,e[s],e[s+1],e[s+2]):[e[s],e[s+1],e[s+2]];for(let r=0;r<3;r++)i[0][r]=Math.min(i[0][r],n[r]),i[1][r]=Math.max(i[1][r],n[r])}}const eb=(i,e,t)=>{const s=i.getStage(),n=[[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY],[Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY]];let r=!1;for(const o of Jw(s,i.path)){const a=s.getPrim(o.skeletonPath);if(!a)continue;const c=o.animationPath??Ee.getAnimationSourceTarget(a),l=c?s.getPrim(c):void 0,u=new Af(a,l);if(!u.hasBindPose())continue;const h=u.computeJointSkelTransforms(e),d=u.computeJointSkelTransforms(e,!0),f=h.flatMap(m=>[m[12],m[13],m[14]]);let p=0,y=!1;for(const m of o.skinnedPrimPaths){const g=s.getPrim(m);if(!g)continue;const S=new Qw(g,u.joints);S.hasInfluences()&&(p=Math.max(p,S.computeExtentsPadding(d)),r=!0,y=!0)}if(y){const m=[];for(let g=0;g<f.length;g+=3){const S=f[g],_=f[g+1],P=f[g+2];m.push(S-p,_-p,P-p,S+p,_+p,P+p)}ao(n,m,t)}}return r?n:null},tb=(i,e,t)=>{const s=Ee.getAnimationSourceTarget(i),n=s?i.getStage().getPrim(s):void 0,r=new Af(i,n),o=[[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY],[Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY]],a=r.computeJointSkelTransforms(e).flatMap(c=>[c[12],c[13],c[14]]);return a.length===0?null:(ao(o,a,t),o)};gf("SkelRoot",eb);gf("Skeleton",tb);const pa=i=>i.split(".")[0];function fa(i){const e=[];for(let t=i;t&&t!=="/";t=t.slice(0,t.lastIndexOf("/")))e.push(t);return e}const sb=i=>i==="xformOpOrder"||i.startsWith("xformOp:")||i==="visibility"||i==="primvars:displayColor"||i==="primvars:displayOpacity"||["protoIndices","ids","positions","orientations","scales","invisibleIds"].includes(i)||/^inputs:(file|wrapS|wrapT|sourceColorSpace|scale|bias|fallback|translation|rotation|width|height|normalize|intensity|color|exposure|colorTemperature|enableColorTemperature|diffuseColor|roughness|metallic|opacity|emissiveColor|ior)$/.test(i);function ib(i,e){const t=nb(i,e);let s=t.next();for(;!s.done;)s=t.next();return s.value}function*nb(i,e){const t=new Map,s=new Map,n=new Set,r=new Map,o=new Set,a=new Set,c=new Set,l=new Set;let u=!1,h=0;const d=()=>JSON.stringify([i.getMetadata("upAxis"),i.getMetadata("metersPerUnit")]),f=d(),p=()=>{if(u)throw new Error("Dynamics index disposed")},y=(v,b)=>Fw(i,v.graph,v.paths,{...b?{forceDynamic:v.paths}:{},forceMaterial:v.graph.meshes.filter(()=>b||[...v.materialPaths].some(I=>{const T=i.getPrim(I);return T?.getPropertyNames().some(E=>T.getAttr(E)?.getTimeSampleKeys().length)})).map(I=>I.path)}),m=v=>{const b=i.getPrim(v);return JSON.stringify([v,b?.typeName,b?.getPropertyNames().flatMap(I=>{const T=b.getAttr(I),E=T?.getConnections()??[],D=T?.getTargets()??[];return E.length||D.length?[[I,E,D]]:[]})])};function g(v){const b=t.get(v);b.binding=y(b,!1);const I=b.binding;I.meshPaths.length||I.lightPaths.length||I.pointInstancerPaths.length?a.add(v):a.delete(v),h++}function S(v,b){const I=new Set(fa(v)),T=new Set;for(const x of b.pointInstancers)for(const R of x.prototypes){for(const U of fa(R))I.add(U);for(const U of e.prototypes.find($=>$.path===R)?.components??[])for(const $ of fa(U.meshPath))I.add($)}for(const x of b.meshes.flatMap(R=>[{path:R.path,subset:!1},...(R.materialSubsets??[]).map(U=>({path:U.path,subset:!0}))])){x.subset&&n.add(x.path);const R=ts.computeBoundMaterial(i,x.path),U=R?[R.materialPath]:[];for(;U.length;){const $=U.pop();if(x.subset){n.add($);const le=i.getPrim($);le?.getPropertyNames().some(q=>le.getAttr(q)?.getTimeSampleKeys().length)&&l.add($)}if(T.has($))continue;T.add($),I.add($);const Ie=i.getPrim($);for(const le of Ie?.getPropertyNames()??[])for(const q of Ie?.getAttr(le)?.getConnections()??[])U.push(pa(q))}}const E=new Set(b.pointInstancers.flatMap(x=>x.prototypes)),N={graph:{...e,...b,prototypes:e.prototypes.filter(x=>E.has(x.path))},paths:[...I],materialPaths:T,binding:void 0,hadMaterial:!!b.meshes[0]?.material,hadOpacity:b.meshes.some(x=>i.getPrim(x.path)?.getAttr("primvars:displayOpacity")?.getValue()!==void 0)};t.set(v,N);for(const x of I)r.has(x)||r.set(x,m(x)),s.has(x)||s.set(x,new Set),s.get(x).add(v);g(v)}for(const v of e.meshes)S(v.path,{meshes:[v],lights:[],pointInstancers:[]}),yield;for(const v of e.lights)S(v.path,{meshes:[],lights:[v],pointInstancers:[]}),yield;for(const v of e.pointInstancers)S(v.path,{meshes:[],lights:[],pointInstancers:[v]}),yield;function _(v){p();for(const b of v.resyncedPaths??[])b.includes(".")?P(b):l.add(b);for(const b of v.changedPaths??[])P(b)}function P(v){if(n.has(pa(v))){l.add(v);return}const b=v.indexOf(".");if(b>=0&&!sb(v.slice(b+1))){const T=v.slice(b+1);if(T.includes(":")&&!/^(xformOp|primvars|inputs|outputs|material|collection|skel|coordSys|info):/.test(T))return;l.add(v);return}if(v==="/"){d()!==f&&l.add(v);return}const I=pa(v);s.has(I)&&o.add(I);for(const T of s.get(I)??[])c.add(T)}const w=i.onObjectsChanged(v=>_({changedPaths:v.changedInfoOnlyPaths,resyncedPaths:[...v.resyncedPaths,...v.resolvedAssetPathsResyncedPaths??[]]}));return{invalidate:_,get meshPaths(){return[...a].filter(v=>t.get(v).graph.meshes.length).sort()},get lightPaths(){return[...a].filter(v=>t.get(v).graph.lights.length).sort()},get pointInstancerPaths(){return[...a].filter(v=>t.get(v).graph.pointInstancers.length).sort()},get stats(){return{entries:t.size,dependencies:s.size,animated:a.size,dirty:c.size,refreshed:h}},sample(v){if(p(),!Number.isFinite(v))throw new Error("Sample time must be finite");const b={meshes:[],lights:[],pointInstancers:[],rebakeReasons:[]};for(const I of o)m(I)!==r.get(I)&&l.add(I);if(l.size)return b.rebakeReasons=[...l].sort().map(I=>({path:I,code:"GRAPH_REBAKE_REQUIRED",message:"Stage structure or unsupported property changed; dispose this index and install a fresh bake and index before rendering."})),b;for(const I of new Set([...a,...c])){const T=t.get(I),E=(c.has(I)?y(T,!0):T.binding).sample(v),D=E.meshes[0];if(c.has(I)&&D){if(T.hadMaterial&&!D.material||T.hadOpacity&&D.displayOpacity===void 0)return l.add(I),{meshes:[],lights:[],pointInstancers:[],rebakeReasons:[{path:I,code:"GRAPH_REBAKE_REQUIRED",message:"A removed material/display value requires a fresh graph to clear adapter state."}]};T.hadMaterial=!!D.material,T.hadOpacity=D.displayOpacity!==void 0}D?.material&&(T.hadMaterial=!0),D?.displayOpacity!==void 0&&(T.hadOpacity=!0),b.meshes.push(...E.meshes),b.lights.push(...E.lights),b.pointInstancers.push(...E.pointInstancers),b.rebakeReasons.push(...E.rebakeReasons),c.has(I)&&g(I)}return c.clear(),o.clear(),b.meshes.sort((I,T)=>I.path.localeCompare(T.path)),b.lights.sort((I,T)=>I.path.localeCompare(T.path)),b.pointInstancers.sort((I,T)=>I.path.localeCompare(T.path)),b},dispose(){u||(u=!0,w(),t.clear(),s.clear(),r.clear(),o.clear(),n.clear(),a.clear(),c.clear(),l.clear())}}}const rb=96,Tf=65,xf="/World/Effects/CameraMotion",dd=["pink","red","orange","yellow","green","teal","blue","purple","black","white"];function pd(i){return performance.now()-i}function $i(i){return`/World/Pieces/Slot_${String(i).padStart(2,"0")}`}function mc(i){return`/World/Effects/Particles/Particle_${String(i).padStart(2,"0")}`}function Df(i){return`${$i(i)}/PowerGlow`}function kf(i){return[i.x-3,i.y-3,0]}function Cf(i){return[i.x-3,i.y-3,.2]}function zc(i){return`/Balls/${dd[Math.min(Math.max(i,0),dd.length-1)]}.png`}function ve(i,e){i.block(),i.set(e)}function fd(i,e){ve(i.translate,kf(e.position)),ve(i.scale,[e.scale,e.scale,e.scale]),ve(i.visibility,e.present?"inherited":"invisible"),ve(i.opacity,[e.opacity]),ve(i.textureFile,zc(e.color)),ve(i.powerGlowVisibility,e.present&&e.hasPowerUp?"inherited":"invisible"),ve(i.powerGlowOpacity,[e.present&&e.hasPowerUp?e.opacity:0])}function ob(i,e,t){const s=e.states[0]?.state;if(!s)return;const n=p=>e.states.slice(1).some(y=>p(y.state,s)),r=n((p,y)=>p.position.x!==y.position.x||p.position.y!==y.position.y),o=n((p,y)=>p.scale!==y.scale),a=n((p,y)=>p.present!==y.present),c=n((p,y)=>p.opacity!==y.opacity),l=n((p,y)=>p.color!==y.color),u=p=>p.present&&p.hasPowerUp,h=p=>u(p)?p.opacity:0,d=n((p,y)=>u(p)!==u(y)),f=n((p,y)=>h(p)!==h(y));for(const p of e.states){const{time:y,state:m}=p;r&&t(i.translate,y,kf(m.position)),o&&t(i.scale,y,[m.scale,m.scale,m.scale]),a&&t(i.visibility,y,m.present?"inherited":"invisible"),c&&t(i.opacity,y,[m.opacity]),l&&t(i.textureFile,y,zc(m.color)),d&&t(i.powerGlowVisibility,y,u(m)?"inherited":"invisible"),f&&t(i.powerGlowOpacity,y,[h(m)])}}function md(i,e){ve(i.translate,Cf(e.position)),ve(i.scale,[e.scale,e.scale,1]),ve(i.visibility,e.present?"inherited":"invisible"),ve(i.displayColor,[e.color]),ve(i.opacity,[e.opacity])}function ab(i,e,t,s){s(i.translate,e,Cf(t.position)),s(i.scale,e,[t.scale,t.scale,1]),s(i.visibility,e,t.present?"inherited":"invisible"),s(i.displayColor,e,[t.color]),s(i.opacity,e,[t.opacity])}function cb(i){const e=i.definePrim("/World/Board/Tiles","Mesh"),t=[],s=[],n=[],r=.465;for(let o=0;o<7;o++)for(let a=0;a<7;a++){const c=a-3,l=o-3,u=t.length;t.push([c-r,l-r,-.46],[c+r,l-r,-.46],[c+r,l+r,-.46],[c-r,l+r,-.46]),s.push(4),n.push(u,u+1,u+2,u+3)}e.attr("subdivisionScheme").set("none"),e.attr("points").set(t),e.attr("faceVertexCounts").set(s),e.attr("faceVertexIndices").set(n),e.attr("primvars:displayColor").set([[.075,.078,.09]])}function lb(){const i=Ms.createNew();i.setMetadata("upAxis","Y"),i.setMetadata("metersPerUnit",1),i.setMetadata("timeCodesPerSecond",24),i.setMetadata("startTimeCode",0),i.setMetadata("endTimeCode",1);const e=i.definePrim("/World","Xform");i.setDefaultPrim(e),e.attr("merge:rulesSource").set("merge iOS/MergeGameEngine.swift"),e.attr("merge:runtime").set("usd-runtime-ts persistent value loop"),e.attr("merge:screen").set("play"),i.definePrim("/World/Board","Xform"),cb(i),i.definePrim("/World/Looks","Scope"),i.definePrim("/World/Pieces","Xform");const t=[],s=24,n=[],r=[];for(let p=0;p<s;p++){const y=p/s*Math.PI*2;n.push([Math.cos(y)*.47,Math.sin(y)*.47,.08]),n.push([Math.cos(y)*.4,Math.sin(y)*.4,.08]);const m=(p+1)%s;r.push(p*2,m*2,m*2+1,p*2+1)}for(let p=0;p<Tf;p++){const y=$i(p),m=`Slot_${String(p).padStart(2,"0")}`,g=i.definePrim(y,"Mesh");g.attr("subdivisionScheme").set("none"),g.attr("points").set([[-.47,-.47,0],[.47,-.47,0],[.47,.47,0],[-.47,.47,0]]),g.attr("faceVertexCounts").set([4]),g.attr("faceVertexIndices").set([0,1,2,3]);const S=g.attr("primvars:st");S.set([[0,0],[1,0],[1,1],[0,1]]),S.setMetadata("interpolation","vertex"),g.attr("doubleSided").set(!0),g.attr("merge:renderTreatment").set("unlit-native-sprite");const _=es.define(i,`/World/Looks/${m}`),P=yt.define(i,`/World/Looks/${m}/Surface`);P.setShaderId("UsdPreviewSurface"),P.createInput("roughness","float").set(1),P.createInput("metallic","float").set(0);const w=yt.define(i,`/World/Looks/${m}/BallTexture`);w.setShaderId("UsdUVTexture");const v=w.createInput("file","asset");v.set(zc(0)),w.createInput("sourceColorSpace","token").set("sRGB"),w.createInput("wrapS","token").set("clamp"),w.createInput("wrapT","token").set("clamp"),P.createInput("diffuseColor","color3f").connectToSource(w.createOutput("rgb","float3")),P.createInput("opacity","float").connectToSource(w.createOutput("a","float")),_.createSurfaceOutput().connectToSource(P.createOutput("surface")),ts.apply(g).bind(_);const b=g.attr("xformOp:translate"),I=g.attr("xformOp:scale"),T=g.attr("visibility"),E=g.attr("primvars:displayOpacity"),D=g.attr("merge:pieceID");b.set([-20,-20,0]),I.set([1,1,1]),T.set("invisible"),E.set([0]),D.set("unassigned"),g.attr("xformOpOrder").set(["xformOp:translate","xformOp:scale"]);const N=i.definePrim(Df(p),"Mesh");N.attr("subdivisionScheme").set("none"),N.attr("points").set(n),N.attr("faceVertexCounts").set(Array(s).fill(4)),N.attr("faceVertexIndices").set(r),N.attr("doubleSided").set(!0),N.attr("primvars:displayColor").set([[1,.84,0]]),N.attr("merge:renderTreatment").set("unlit-power-glow");const x=N.attr("visibility"),R=N.attr("primvars:displayOpacity");x.set("invisible"),R.set([0]),t.push({path:y,translate:b,scale:I,visibility:T,opacity:E,textureFile:v.attr,pieceID:D,powerGlowVisibility:x,powerGlowOpacity:R})}i.definePrim("/World/Effects","Xform"),i.definePrim("/World/Effects/Particles","Xform");const o=[],a=12,c=[[0,0,0]];for(let p=0;p<a;p++){const y=p/a*Math.PI*2;c.push([Math.cos(y),Math.sin(y),0])}const l=Array.from({length:a},(p,y)=>[0,y+1,(y+1)%a+1]).flat();for(let p=0;p<rb;p++){const y=mc(p),m=i.definePrim(y,"Mesh");m.attr("subdivisionScheme").set("none"),m.attr("points").set(c),m.attr("faceVertexCounts").set(Array(a).fill(3)),m.attr("faceVertexIndices").set(l),m.attr("doubleSided").set(!0),m.attr("merge:renderTreatment").set("unlit-particle");const g=m.attr("xformOp:translate"),S=m.attr("xformOp:scale"),_=m.attr("visibility"),P=m.attr("primvars:displayColor"),w=m.attr("primvars:displayOpacity");g.set([-20,-20,.2]),S.set([.04,.04,1]),_.set("invisible"),P.set([[1,1,1]]),w.set([0]),m.attr("xformOpOrder").set(["xformOp:translate","xformOp:scale"]),o.push({path:y,translate:g,scale:S,visibility:_,displayColor:P,opacity:w})}const u=i.definePrim(xf,"Mesh");u.attr("subdivisionScheme").set("none"),u.attr("points").set([[0,0,0],[.001,0,0],[0,.001,0]]),u.attr("faceVertexCounts").set([3]),u.attr("faceVertexIndices").set([0,1,2]),u.attr("visibility").set("invisible"),u.attr("merge:effect").set("cameraShake");const h={translate:u.attr("xformOp:translate")};h.translate.set([0,0,0]),u.attr("xformOpOrder").set(["xformOp:translate"]);const d=i.definePrim("/World/FillLight","DomeLight");d.attr("inputs:color").set([1,1,1]),d.attr("inputs:intensity").set(1.35);const f=i.definePrim("/World/KeyLight","DistantLight");return f.attr("inputs:color").set([1,.96,.92]),f.attr("inputs:intensity").set(.2),f.attr("xformOp:rotateX").set(-24),f.attr("xformOp:rotateY").set(-18),f.attr("xformOpOrder").set(["xformOp:rotateX","xformOp:rotateY"]),{stage:i,slots:t,particles:o,camera:h}}function ub(){const i=performance.now(),{stage:e,slots:t,particles:s,camera:n}=lb(),r=pd(i),o=new Map;let a={startTimeCode:0,endTimeCode:1,segments:[],piecePaths:[],particlePaths:[]},c=new Set;const l=new Set,u=(p,y,m)=>{p.setTimeSample(y,m),l.add(p)},h=()=>{const p=e.getRootLayer();for(const y of l)p.eraseField(`${y._getPrimPath()}.${y._getName()}`,"timeSamples");l.clear()},d=p=>{const y=new Set(p.tracks.map(g=>g.id));for(const[g]of o)y.has(g)||o.delete(g);const m=new Set(o.values());for(const g of y){if(o.has(g))continue;const S=t.findIndex((_,P)=>!m.has(P));if(S<0)throw new Error(`USD piece pool exhausted (${Tf} slots)`);o.set(g,S),m.add(S)}return new Map([...o].filter(([g])=>y.has(g)))};return{stage:e,createMs:r,author:p=>{const y=performance.now();h();const m=new Set(o.values()),g=d(p),S=new Set(g.values()),_=new Set(p.particles.map(D=>D.slot)),P=new Set(p.tracks.filter(D=>new Set(D.states.map(N=>N.state.color)).size>1).map(D=>g.get(D.id)));for(const D of m){const N=t[D];S.has(D)||(fd(N,{present:!1,color:0,hasPowerUp:!1,position:{x:-17,y:-17},scale:.04,opacity:0}),ve(N.pieceID,"unassigned"))}for(const D of p.tracks){const N=t[g.get(D.id)],x=D.states[0]?.state;x&&(fd(N,x),ve(N.pieceID,D.id),p.segments[0]?.kind!=="ready"&&ob(N,D,u))}for(const D of c)_.has(D)||md(s[D],{present:!1,color:[1,1,1],position:{x:-17,y:-17},scale:.04,opacity:0});for(const D of p.particles){const N=s[D.slot],x=D.states[0]?.state;if(!(!N||!x)){md(N,x);for(const R of D.states)ab(N,R.time,R.state,u)}}if(ve(n.translate,[0,0,0]),p.camera.some(D=>D.offset[0]!==0||D.offset[1]!==0))for(const D of p.camera)u(n.translate,D.time,[D.offset[0],D.offset[1],0]);e.setMetadata("startTimeCode",p.startTimeCode),e.setMetadata("endTimeCode",p.endTimeCode);const w=e.getPrim("/World");ve(w.attr("merge:score"),p.final.score),ve(w.attr("merge:level"),p.final.currentLevel),ve(w.attr("merge:timeline"),p.segments.map(D=>`${D.kind}:${D.start}-${D.end}`).join(", "));const v=[...new Set([...m,...S])].map($i),b=[...new Set([...m,...S])].map(Df),I=[...new Set([...c,..._])].map(mc),T=[...v,...b,...I,xf],E=[...S].map($i);return c=_,a={startTimeCode:p.startTimeCode,endTimeCode:p.endTimeCode,segments:p.segments,piecePaths:[...g.values()].map($i),particlePaths:[..._].map(mc)},{authored:a,changedPaths:T,activePaths:E,materialPaths:[...P].map($i),authorMs:pd(y)}},get authored(){return a},setScreen(p){ve(e.getPrim("/World").attr("merge:screen"),p)},inspect(){return{source:e.exportToUsda(),prims:[...e.traverse()].filter(p=>!p.slice(p.lastIndexOf("/")+1).includes(".")).map(p=>({path:p,typeName:e.getPrim(p)?.typeName??""}))}}}}function hb(){let i,e,t=0,s=0,n=Promise.resolve(),r={createMs:0,bakeMs:0,indexMs:0,lastAuthorMs:0};async function o(a){const c=performance.now(),l={id:a.id,generation:a.generation,revision:s,workerMs:0};try{if(a.type==="prepare"){if(i)throw new Error("Worker already prepared");t=a.generation,i=ub();const u=i.author(a.timeline);await i.stage.flushChanges();const h=performance.now(),d=Nw(i.stage,{root:"/World",time:a.time}),f=performance.now()-h,p=performance.now();e=ib(i.stage,d),r={createMs:i.createMs,bakeMs:f,indexMs:performance.now()-p,lastAuthorMs:u.authorMs},e.invalidate({changedPaths:d.meshes.map(y=>y.path)}),l.graph=d,s=a.revision}else{if(!i||!e||t!==a.generation)throw new Error("Inactive Merge generation");if(a.type==="author"||a.type==="screen"){if(a.revision!==s+1)throw new Error("Out-of-order Merge author revision");if(a.type==="author"){const u=performance.now(),h=i.author(a.timeline);await i.stage.flushChanges(),e.invalidate({changedPaths:h.changedPaths}),r.lastAuthorMs=performance.now()-u}else i.setScreen(a.screen),await i.stage.flushChanges();s=a.revision}else if(a.revision!==s)throw new Error("Stale Merge read revision")}if(!i||!e)throw new Error("Merge not prepared");if("time"in a){if(l.sample=e.sample(a.time),l.sample.rebakeReasons.length)throw new Error("Merge stage requires a fresh bake: "+JSON.stringify(l.sample.rebakeReasons));l.time=a.time}a.type==="inspect"&&(l.inspection={...i.inspect(),revision:s,authored:i.authored}),l.revision=s,l.authored=i.authored,l.stats=e.stats,l.timing={...r}}catch(u){l.error=u instanceof Error?u.message:String(u)}return l.workerMs=performance.now()-c,l}return{handle(a){const c=n.then(()=>o(a));return n=c.then(()=>{},()=>{}),c},dispose(){e?.dispose(),e=void 0,i=void 0}}}const db=hb();self.onmessage=i=>{db.handle(i.data).then(e=>self.postMessage(e))};self.postMessage({id:0,generation:0,revision:0,workerMs:0});
