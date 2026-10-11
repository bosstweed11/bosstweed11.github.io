let xt;if(typeof process<"u"&&process.versions?.node){const s=["node","fs"].join(":"),e=`${["node","fs"].join(":")}/promises`,[t,i]=await Promise.all([import(s),import(e)]);xt={existsSync:r=>t.existsSync(r),readFile:r=>i.readFile(r),open:(r,n)=>i.open(r,n),mkdir:async r=>{await i.mkdir(r,{recursive:!0})},rename:(r,n)=>i.rename(r,n),unlink:r=>i.unlink(r)}}function rr(s){return xt?.existsSync(s)??!1}function wh(s){return xt?xt.readFile(s):Promise.reject(new Error("Filesystem assets are unavailable"))}let _h=0;async function Ih(s,e){if(!xt)return Promise.reject(new Error("Filesystem assets are unavailable"));const t=Math.max(s.lastIndexOf("/"),s.lastIndexOf("\\"));if(t>0&&await xt.mkdir(s.slice(0,t)),!e)return xt.open(s,"r+");const i=Date.now();let r="",n;for(let a=0;a<100&&!n;a++){r=`${s}.tmp.${i}.${_h++}`;try{n=await xt.open(r,"wx")}catch{}}if(!n)throw new Error(`Unable to create sibling temporary for '${s}'`);let o=!0;return{write:(a,c,l,u)=>n.write(a,c,l,u),close:async()=>{if(o){o=!1,await n.close();try{await xt.rename(r,s)}catch(a){try{await xt.unlink(r)}catch{}throw a}}}}}function wu(){return typeof process<"u"&&typeof process.cwd=="function"?process.cwd():""}class rt{objects;constructor(...e){this.objects=[...e]}get empty(){return this.objects.length===0}get(e){return this.objects.find(t=>t instanceof e)}getDebugString(){return this.objects.map(e=>e.constructor.name).join(", ")}equals(e){return this.objects.length===e.objects.length&&this.objects.every((t,i)=>{const r=e.objects[i];return t===r?!0:!r||t.constructor!==r.constructor?!1:t.equals?.call(t,r)??!1})}}class Es{constructor(e){this.resolver=e}}class Bs{searchPath;constructor(e=[]){this.searchPath=e.filter(t=>t!=="").map(t=>Ah(t))}equals(e){return this.searchPath.length===e.searchPath.length&&this.searchPath.every((t,i)=>t===e.searchPath[i])}}function Ah(s){if(s.startsWith("/")||/^[a-zA-Z]:[\\/]/.test(s))return ma(s);const e=wu();return ma(e?`${e}/${s}`:s)}function ma(s){const e=s.startsWith("/"),t=/^[a-zA-Z]:/.exec(s)?.[0]??"",i=[];for(const r of s.replaceAll("\\","/").replace(/^[a-zA-Z]:/,"").split("/"))!r||r==="."||(r===".."&&i.length>0?i.pop():i.push(r));return`${t}${e?"/":""}${i.join("/")}`}class Th{async getDetachedAsset(){return new _u(new Uint8Array(await this.getBuffer()))}}class _u extends Th{constructor(e){super(),this.bytes=e}getSize(){return this.bytes.byteLength}async getBuffer(){return this.bytes}async read(e,t){return t<0||e<0||t+e>this.bytes.byteLength?new Uint8Array:this.bytes.slice(t,t+e)}}class fe{_path;constructor(e=""){this._path=e instanceof fe?e._path:e}getPathString(){return this._path}get valid(){return this._path.length>0}_str(e){return e instanceof fe?e._path:e}equals(e){return this._path===this._str(e)}notEquals(e){return this._path!==this._str(e)}lt(e){return this._path<this._str(e)}le(e){return this._path<=this._str(e)}gt(e){return this._path>this._str(e)}ge(e){return this._path>=this._str(e)}toString(){return this._path}repr(){return this._path?`Ar.ResolvedPath('${this._path}')`:"Ar.ResolvedPath()"}get hash(){return this._path}}class Dh{constructor(e="",t="",i=void 0){this.version=e,this.assetName=t,this.resolverInfo=i}}class xh{constructor(e=void 0){this.time=e}get valid(){return this.time!==void 0}equals(e){return this.time===e.time}notEquals(e){return!this.equals(e)}toString(){return this.valid?`Ar.Timestamp(${this.time})`:"Ar.Timestamp()"}}class kh{}var Wi=(s=>(s.Update="update",s.Replace="replace",s))(Wi||{});const Ch={contexts:[],caches:[]},Bh=[];let jn;const ga=globalThis.AsyncContext;if(ga?.Variable){const s=new ga.Variable({name:"Ar resolver state"});jn={getStore:()=>s.get(),run:(e,t)=>s.run(e,t)}}else if(typeof process<"u"&&process.versions?.node){const e=await import(["node","async_hooks"].join(":"));jn=new e.AsyncLocalStorage}function Iu(){return jn?.getStore()??Bh.at(-1)??Ch}function Nh(s){const e=Iu().contexts;for(let t=e.length-1;t>=0;t--)if(e[t].resolver===s)return e[t].context}function Eh(s){const e=Iu().caches;for(let t=e.length-1;t>=0;t--)if(e[t].resolver===s)return e[t].data}function Oh(s){return Nh(s)??new rt}var Or;(s=>{class e{constructor(i){this.affectsContext=i}}s.ResolverChanged=e})(Or||(Or={}));const Hn=new Set;function Au(s){return Hn.add(s),()=>Hn.delete(s)}function Tu(s){for(const e of Hn)e(s)}function Lh(s){return s.length===0||s[s.length-1]!=="]"?s.length:s.length-1}function Zr(s,e){let t=1;for(let i=e-1;i>=0;i--){const r=s[i];if(r==="["||r==="]"){if(i-1>=0&&s[i-1]==="\\")continue;if(t+=r==="["?-1:1,t===0)return i}}return s.length}function Fh(s){if(s.length===0)return s;let e=s.length;if(s[s.length-1]==="]"){const i=Zr(s,s.length-1);i!==s.length&&(e=i)}return s.slice(0,e).replaceAll("[","\\[").replaceAll("]","\\]")+s.slice(e)}function Mh(s){if(s.length===0)return s;let e=s.length;if(s[s.length-1]==="]"){const i=Zr(s,s.length-1);i!==s.length&&(e=i)}return s.slice(0,e).replaceAll("\\[","[").replaceAll("\\]","]")+s.slice(e)}function Du(s){return s.length>0&&s[s.length-1]==="]"&&Zr(s,s.length-1)!==s.length}function $h(s){let e=0;for(;e<s.length&&s[e]==="";)e++;if(e>=s.length)return"";let t=s[e++],i=t.length;if(t[t.length-1]==="]"){let r=0;for(;r<t.length&&t[t.length-1-r]==="]";)r++;i=t.length-r}for(;e<s.length;e++){const r=s[e];if(r==="")continue;const n="["+Fh(r)+"]";t=t.slice(0,i)+n+t.slice(i),i+=n.length-1}return t}function Rh(s){const e=Lh(s);if(e===s.length)return[s,""];const t=Zr(s,e);if(t===s.length)return[s,""];const i=s.slice(0,t),r=Mh(s.slice(t+1,e));return[i,r]}var Vh={};class xu{createIdentifier(e,t=new fe){return t.valid?ui(t.toString(),e):kt(e)}isContextDependentPath(e){return!1}createDefaultContext(){return new rt}createDefaultContextForAsset(e){return this.createDefaultContext()}createContextFromString(e,t){return new rt}createContextFromStrings(e){for(const[t,i]of e)if(t==="")return this.createContextFromString(i);return new rt}createIdentifierForNewAsset(e,t=new fe){return this.createIdentifier(e,t)}resolveForNewAsset(e,t=this.getCurrentContext()){return this.resolve(e,t)}getCurrentContext(){return Oh(this)}getExtension(e){const i=fs(e)?.innerPath??e,r=i.lastIndexOf("/"),n=i.lastIndexOf(".");return n>r?i.slice(n+1):""}getAssetInfo(e,t){return new Dh}getModificationTimestamp(e,t){return new xh}async openAssetForWrite(e,t=Wi.Update){}canWriteAssetToPath(e){return!1}beginCacheScope(e){return e??new Map}endCacheScope(e){}refreshContext(e){Tu(new Or.ResolverChanged(t=>t.equals(e)))}}class Gh extends xu{static setDefaultSearchPath(e){const t=new Bs(e);t.equals(un)||(un=t,Tu(new Or.ResolverChanged(i=>i.get(Bs)!==void 0)))}createDefaultContextForAsset(e){return e?new rt(new Bs([zo(Us(e))])):new rt(new Bs)}createContextFromString(e,t){if(t!==void 0&&e!=="")return new rt;const r=(t??e).split(ku()).filter(Boolean);return new rt(new Bs(r))}async resolve(e,t=this.getCurrentContext()){const i=t.get(Es)?.resolver;if(i&&i!==this)return i.resolve(e,t);const r=Eh(this);if(r instanceof Map){const n=r.get(e);if(n instanceof fe)return n;const o=this._resolve(e,t);return r.set(e,o),o}return this._resolve(e,t)}createIdentifier(e,t=new fe){const i=this.getCurrentContext().get(Es)?.resolver;if(i&&i!==this)return i.createIdentifier(e,t);if(!e)return"";if(!t.valid)return kt(e);const r=ui(t.toString(),e);return dn(e)&&!rr(Us(r))?kt(e):kt(r)}createIdentifierForNewAsset(e,t=new fe){return e?qn(e)?t.valid?kt(ui(t.toString(),e)):Us(e):kt(e):""}resolveForNewAsset(e,t=this.getCurrentContext()){const i=t.get(Es)?.resolver;return i&&i!==this?i.resolveForNewAsset(e,t):Promise.resolve(new fe(e?Us(e):""))}async openAssetForWrite(e,t=Wi.Update){if(this.canWriteAssetToPath(e))try{const i=await Ih(e.toString(),t===Wi.Replace);return new Uh(i)}catch{return}}canWriteAssetToPath(e){return e.valid&&!Du(e.toString())}isContextDependentPath(e){const t=this.getCurrentContext().get(Es)?.resolver;return t?t.isContextDependentPath(e):dn(e)}async openAsset(e,t=this.getCurrentContext()){const i=t.get(Es)?.resolver;if(i&&i!==this)return i.openAsset(e,t);try{return new _u(new Uint8Array(await wh(e.toString())))}catch{return}}_resolve(e,t){if(!e)return new fe;if(!qn(e)){const n=Us(e);return rr(n)?new fe(n):new fe}const i=Us(e);if(rr(i))return new fe(i);if(!dn(e))return new fe;const r=t.get(Bs);for(const n of[r,un])if(n)for(const o of n.searchPath){const a=kt(`${o}/${e}`);if(rr(a))return new fe(a)}return new fe}}class Uh extends kh{constructor(e){super(),this.handle=e}async write(e,t){return this.handle?(await this.handle.write(e,0,e.byteLength,t)).bytesWritten:0}async close(){if(!this.handle)return!1;const e=this.handle;return this.handle=void 0,await e.close(),!0}}let un=new Bs((typeof process<"u"?Vh.PXR_AR_DEFAULT_SEARCH_PATH:void 0)?.split(ku())??[]);function ku(){return typeof process<"u"&&process.platform==="win32"?";":":"}function qn(s){return s!==""&&!Qr(s)}function dn(s){return qn(s)&&!s.startsWith("./")&&!s.startsWith("../")}function Us(s){if(Qr(s))return kt(s);const e=wu();return kt(e?`${e}/${s}`:s)}const ya=new Map([["ArDefaultResolver",()=>new Gh]]);let Wh="ArDefaultResolver",hn;const Sa=new Set;function Qs(){return hn||(hn=(ya.get(Wh)??ya.get("ArDefaultResolver"))()),hn}function zh(s){return Sa.add(s),()=>Sa.delete(s)}function fs(s){if(!Du(s))return null;const[e,t]=Rh(s);return{packagePath:e,innerPath:t}}function ki(s,e){return $h([s,e])}function zo(s){const e=s.lastIndexOf("/");return e>=0?s.slice(0,e):"."}function Qr(s){return s.startsWith("/")||/^[a-zA-Z]:[\\/]/.test(s)||/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(s)}function Kn(s){const e=[];for(const t of s.split("/"))t===""||t==="."||(t===".."&&e.length&&e.at(-1)!==".."?e.pop():e.push(t));return e.join("/")}function kt(s){const e=/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.exec(s);if(e){const t=s.slice(e[0].length),i=t.indexOf("/");return i<0?s:e[0]+t.slice(0,i+1)+Kn(t.slice(i+1))}return(s.startsWith("/")?"/":"")+Kn(s)}function jh(s,e){if(Qr(e))return e;const t=zo(s);return kt(t==="."?e:`${t}/${e}`)}function ui(s,e){if(!e)return"";const t=e.replace(/^@/,"").replace(/@$/,"").trim(),i=fs(s);if(i&&!Qr(t)){const r=zo(i.innerPath),n=r==="."||r===i.innerPath?t:`${r}/${t}`;return ki(i.packagePath,Kn(n))}return jh(s,t)}function Hh(s){let e=ba.get(s);return e||(e=new rt(new Es(new Kh(s))),ba.set(s,e)),e}let qh=0;const ba=new WeakMap;class Kh extends xu{constructor(e){super(),this.implementation=e}prefix=`usd-ts-host-context:${++qh}:`;createIdentifier(e,t=new fe){return this.implementation.createIdentifier(e,t)}isContextDependentPath(){return!0}async resolve(e,t){const i=await this.implementation.resolve(e,new rt);return i.valid?new fe(this.prefix+encodeURIComponent(i.toString())):i}async openAsset(e,t){const i=e.toString(),r=i.startsWith(this.prefix)?new fe(decodeURIComponent(i.slice(this.prefix.length))):e;return this.implementation.openAsset(r,new rt)}}function Pa(s,e){return e.get(Es)?.resolver??s}const Xn=new WeakMap;function va(s){if(s)return Xn.get(s)?.current}async function Yn(s,e,t){if(!s)return await t();let i=Xn.get(s);i||(i={current:void 0,installations:[]},Xn.set(s,i));const r={};i.installations.length===0&&(i.current?i.base=i.current:delete i.base),i.installations.push({token:r,context:e}),i.current=e;try{return await t()}finally{const n=i.installations.findIndex(o=>o.token===r);n>=0&&i.installations.splice(n,1),i.current=i.installations.at(-1)?.context??i.base,i.installations.length===0&&delete i.base}}function di(s=""){return s}(s=>{s.Empty="";function e(t){return t.length===0}s.IsEmpty=e})(di||(di={}));class ${static#s=new Map;static#t=new $("TfRoot");static#i=new $("");#r;#n=!1;#e=[];#o=[];#a=new Map;constructor(e){this.#r=e}static GetUnknownType(){return $.#i}static GetRoot(){return $.#t}static FindByName(e){return $.#t.#a.get(e)??$.#s.get(e)??$.#i}FindDerivedByName(e){const t=this.#a.get(e);if(t)return t;const i=$.#s.get(e);return i&&i.IsA(this)?i:$.#i}static Declare(e,t){let i=$.#s.get(e);return i||(i=new $(e),$.#s.set(e,i),i._setBases([])),t!==void 0&&i._setBases(t),i}static Define(e,t){const i=$.Declare(e,t??[]);return i.#n=!0,i}AddAlias(e,t){if($.#s.get(t)?.IsA(e))throw new Error(`type alias '${t}' collides beneath ${e.GetTypeName()}`);const r=e.#a.get(t);if(r&&r!==this)throw new Error(`type alias '${t}' is already registered`);e.#a.set(t,this)}GetAliases(e){const t=[];for(const[i,r]of this.#a)r===e&&t.push(i);return t}GetTypeName(){return this.#r}IsUnknown(){return this===$.#i}IsRoot(){return this===$.#t}IsDefined(){return this.#n}IsA(e){return this.IsUnknown()||e.IsUnknown()?!1:this._ancestorsInclusive().has(e)}GetBaseTypes(){return[...this.#e]}GetDirectlyDerivedTypes(){return[...this.#o]}GetAllAncestorTypes(){const e=[];return this.IsUnknown()||this._appendAncestors(e),e}GetAllDerivedTypes(){const e=new Set,t=[...this.#o];for(;t.length;){const i=t.pop();e.has(i)||(e.add(i),t.push(...i.#o))}return[...e]}_appendAncestors(e){const t=this.#e;if(t.length<=1){e.push(this),t.length===1&&t[0]._appendAncestors(e);return}const i=[[this],[...t]];for(const r of t){const n=[];r._appendAncestors(n),i.push(n)}if(!$._mergeAncestors(i,e))throw new Error(`inconsistent inheritance hierarchy for ${this.#r}`)}static _mergeAncestors(e,t){for(;;){let i,r=!1;for(const n of e){if(n.length===0)continue;r=!0;const o=n[0];let a=!1;for(const c of e)if(!(c.length<=1)&&c.indexOf(o,1)!==-1){a=!0;break}if(!a){i=o;break}}if(i===void 0)return!r;t.push(i);for(const n of e)n.length&&n[0]===i&&n.shift()}}_ancestorsInclusive(){const e=new Set,t=[this];for(;t.length;){const i=t.pop();e.has(i)||(e.add(i),t.push(...i.#e))}return e}_setBases(e){for(const i of this.#e){const r=i.#o.indexOf(this);r>=0&&i.#o.splice(r,1)}if(this===$.#t||this===$.#i){this.#e=[];return}const t=e.length?[...e]:[$.#t];this.#e=t;for(const i of t)i.#o.includes(this)||i.#o.push(this)}}const pn=4,Xh=5,wa=12,fn=15,ri=15,Yh=2113929216,Cu=12,Bu=1<<Cu,nr=6;function Zh(s){return s+Math.floor(s/255)+16}function mn(s){return Math.imul(s,2654435761)>>>32-Cu&Bu-1}function yi(s,e){return(s[e]|s[e+1]<<8|s[e+2]<<16|s[e+3]<<24)>>>0}function _a(s){const e=s.length,t=new Uint8Array(e+Math.floor(e/255)+16);let i=0;if(e<wa)return Ia(s,0,e,t,i);const r=new Int32Array(Bu).fill(-1),n=e-wa,o=e-Xh;let a=0,c=0;r[mn(yi(s,c))]=c,c++;let l=1<<nr;for(;c<=n;){let u=-1,d=1,h=l>>nr;for(;!(c>n);){const P=mn(yi(s,c)),w=r[P];if(r[P]=c,w>=0&&w<c&&c-w<=65535&&yi(s,w)===yi(s,c)){u=w;break}c+=d,d=++h>>nr}if(u<0)break;for(;c>a&&u>0&&s[c-1]===s[u-1];)c--,u--;const m=c-a,p=i++;if(m>=ri){t[p]=ri<<4;let P=m-ri;for(;P>=255;)t[i++]=255,P-=255;t[i++]=P}else t[p]=m<<4;for(let P=0;P<m;P++)t[i++]=s[a+P];const y=c-u;t[i++]=y&255,t[i++]=y>>8&255;let f=c+pn,g=u+pn;for(;f<o&&s[f]===s[g];)f++,g++;const b=f-c-pn;if(b>=fn){t[p]|=fn;let P=b-fn;for(;P>=255;)t[i++]=255,P-=255;t[i++]=P}else t[p]|=b;if(c=f,a=c,c>n)break;r[mn(yi(s,c-2))]=c-2,l=1<<nr}return Ia(s,a,e,t,i)}function Ia(s,e,t,i,r){const n=t-e;if(n>=ri){i[r++]=ri<<4;let o=n-ri;for(;o>=255;)i[r++]=255,o-=255;i[r++]=o}else i[r++]=n<<4;for(let o=0;o<n;o++)i[r++]=s[e+o];return i.subarray(0,r)}function Aa(s,e){const t=new Uint8Array(e);let i=0,r=0;for(;i<s.length;){const n=s[i++];let o=n>>4&15;if(o===15){let u;do u=s[i++],o+=u;while(u===255)}if(t.set(s.subarray(i,i+o),r),i+=o,r+=o,i>=s.length)break;const a=s[i]|s[i+1]<<8;i+=2;let c=(n&15)+4;if(c-4===15){let u;do u=s[i++],c+=u;while(u===255)}let l=r-a;for(let u=0;u<c;u++)t[r++]=t[l++]}return t.subarray(0,r)}function Zn(s){return Qh(s,Yh)}function Qh(s,e){const t=s.length;if(t===0)return new Uint8Array([0,0]);if(t<=e){const h=_a(s),m=new Uint8Array(1+h.length);return m[0]=0,m.set(h,1),m}const i=Math.floor(t/e),r=t%e,n=i+(r?1:0),o=[];let a=1,c=0;const l=h=>{const m=_a(s.subarray(c,c+h)),p=new Uint8Array(4);p[0]=m.length&255,p[1]=m.length>>8&255,p[2]=m.length>>16&255,p[3]=m.length>>>24&255,o.push(p,m),a+=4+m.length,c+=h};for(let h=0;h<i;h++)l(e);r&&l(r);const u=new Uint8Array(a);u[0]=n;let d=1;for(const h of o)u.set(h,d),d+=h.length;return u}function Qn(s,e){const t=s[0];if(t===0)return Aa(s.subarray(1),e);let i=1;const r=new Uint8Array(e);let n=0;for(let o=0;o<t;o++){const a=s[i]|s[i+1]<<8|s[i+2]<<16|s[i+3]*16777216;i+=4;const c=Aa(s.subarray(i,i+a),e-n);r.set(c,n),n+=c.length,i+=a}return r.subarray(0,n)}const Ta=new TextEncoder;function be(s,e){return e<s.length?s[e]:0}function Ye(s){return s>=48&&s<=57}function Da(s){const e=s&-33;return e>=65&&e<=90}function gn(s,e,t,i,r){for(;e<t&&be(s,e)===be(i,r);)e++,r++;return[e,r]}function Ot(s,e){const t=Ta.encode(s),i=Ta.encode(e),r=t.length,n=i.length,o=r,a=n;let c=0,l=0,u=Math.min(r,n);if([c,l]=gn(t,c,u,i,l),c===u&&r===n)return!1;let d,h;for(;c!==u;){d=be(t,c),h=be(i,l);const m=d<128&&h<128,p=(d&-33)!==(h&-33),y=d>=64&&h>=64;if(m&&p&&y)return(d+5&31)<(h+5&31);if(Ye(d)||Ye(h))if(Ye(d)&&Ye(h)){let f=c,g=l,S=c,b=l;for(;f!==0&&Ye(be(t,f-1));)f--;for(;g!==0&&Ye(be(i,g-1));)g--;for(;S!==o&&Ye(be(t,S));)S++;for(;b!==a&&Ye(be(i,b));)b++;for(;f!==S&&be(t,f)===48;)f++;for(;g!==b&&be(i,g)===48;)g++;for(;f!==S&&g!==b&&Ye(be(t,f))&&be(t,f)===be(i,g);)f++,g++;if(f===S!=(g===b))return f===S&&g!==b;if(f!==S&&g!==b){const P=be(t,f),w=be(i,g),_=S-f,v=b-g;return _!==v?_<v:P<w}c=S,l=b,u=c+Math.min(o-c,a-l)}else{if(c===0)return d<h;const f=be(t,c-1);return Ye(f)?Ye(h):Ye(d)}else{if(!Da(d)||!Da(h))return d<h;c++,l++}[c,l]=gn(t,c,u,i,l)}return c!==o||l!==a?c===o:([c,l]=gn(t,0,Math.min(r,n),i,0),d=be(t,c),h=be(i,l),h===48||d!==48&&d<h)}function Jh(s){return s>=65&&s<=90||s>=97&&s<=122}function xa(s){return s>=48&&s<=57}function ep(s){if(s.length===0||xa(s.charCodeAt(0)))return!1;for(let e=0;e<s.length;e++){const t=s.charCodeAt(e);if(!(Jh(t)||xa(t)||t===95))return!1}return!0}function Jr(s,e){return Ot(s,e)?-1:Ot(e,s)?1:0}var J=(s=>(s[s.ValueBlock=0]="ValueBlock",s[s.Held=1]="Held",s[s.Linear=2]="Linear",s[s.Curve=3]="Curve",s))(J||{}),Be=(s=>(s[s.Bezier=0]="Bezier",s[s.Hermite=1]="Hermite",s))(Be||{}),X=(s=>(s[s.ValueBlock=0]="ValueBlock",s[s.Held=1]="Held",s[s.Linear=2]="Linear",s[s.Sloped=3]="Sloped",s[s.LoopRepeat=4]="LoopRepeat",s[s.LoopReset=5]="LoopReset",s[s.LoopOscillate=6]="LoopOscillate",s))(X||{}),Nu=(s=>(s[s.PreExtrap=0]="PreExtrap",s[s.PreExtrapLoop=1]="PreExtrapLoop",s[s.InnerLoopPreEcho=2]="InnerLoopPreEcho",s[s.InnerLoopProto=3]="InnerLoopProto",s[s.InnerLoopPostEcho=4]="InnerLoopPostEcho",s[s.KnotInterp=5]="KnotInterp",s[s.PostExtrap=6]="PostExtrap",s[s.PostExtrapLoop=7]="PostExtrapLoop",s))(Nu||{}),et=(s=>(s[s.None=0]="None",s[s.Custom=1]="Custom",s[s.AutoEase=2]="AutoEase",s))(et||{}),Li=(s=>(s[s.None=0]="None",s[s.Contain=1]="Contain",s[s.KeepRatio=2]="KeepRatio",s[s.KeepStart=3]="KeepStart",s))(Li||{});class us{constructor(e=0,t=0,i=0,r=0,n=0){this.protoStart=e,this.protoEnd=t,this.numPreLoops=i,this.numPostLoops=r,this.valueOffset=n}GetPrototypeInterval(){return[this.protoStart,this.protoEnd]}GetLoopedInterval(){const e=Math.max(0,this.protoEnd-this.protoStart);return[this.protoStart-Math.max(0,this.numPreLoops)*e,this.protoEnd+Math.max(0,this.numPostLoops)*e]}}class Ht{constructor(e=1,t=0,i){this.mode=e,this.slope=t,this.loopBoundaryTime=i}loopBoundaryTime;IsLooping(){return this.mode>=4}}class Eu{polylines=[]}class ka extends Eu{sources=[]}class Vs{#s=0;#t=J.Held;#i=Be.Bezier;#r=!1;#n=0;#e=0;#o=0;#a=0;#c=0;#l=0;#u=et.None;#h=et.None;#d={};valueType;constructor(e=$.Declare("double")){if(e instanceof $){this.valueType=e;return}const t=e;this.valueType=$.Declare(t.typeName??"double"),t.curveType!==void 0&&(this.#i=t.curveType),t.time!==void 0&&(this.#s=t.time),t.nextInterp!==void 0&&(this.#t=t.nextInterp),t.value!==void 0&&(this.#n=t.value),t.preValue!==void 0&&(this.#r=!0,this.#e=t.preValue),t.customData!==void 0&&(this.#d=structuredClone(t.customData)),t.preTanWidth!==void 0&&(this.#o=t.preTanWidth),t.preTanSlope!==void 0&&(this.#c=t.preTanSlope),t.postTanWidth!==void 0&&(this.#a=t.postTanWidth),t.postTanSlope!==void 0&&(this.#l=t.postTanSlope),t.preTanAlgorithm!==void 0&&(this.#u=t.preTanAlgorithm),t.postTanAlgorithm!==void 0&&(this.#h=t.postTanAlgorithm)}clone(){const e=new Vs(this.valueType);return e.#s=this.#s,e.#t=this.#t,e.#i=this.#i,e.#r=this.#r,e.#n=this.#n,e.#e=this.#e,e.#o=this.#o,e.#a=this.#a,e.#c=this.#c,e.#l=this.#l,e.#u=this.#u,e.#h=this.#h,e.#d=structuredClone(this.#d),e}equals(e){return JSON.stringify(this.toJSON())===JSON.stringify(e.toJSON())}toJSON(){return[this.#s,this.#t,this.#r,this.#n,this.GetPreValue(),this.#o,this.#a,this.#c,this.#l,this.#u,this.#h,this.#d]}GetValueType(){return this.valueType}GetValueTypeName(){return this.valueType.GetTypeName()}GetTime(){return this.#s}GetNextInterpolation(){return this.#t}GetCurveType(){return this.#i}IsDualValued(){return this.#r}GetValue(){return this.#n}GetPreValue(){return this.#r?this.#e:this.#n}GetPreTanWidth(){return this.#o}GetPostTanWidth(){return this.#a}GetPreTanSlope(){return this.#c}GetPostTanSlope(){return this.#l}GetPreTanAlgorithm(){return this.#u}GetPostTanAlgorithm(){return this.#h}GetCustomData(){return structuredClone(this.#d)}SetTime(e){return Number.isFinite(e)?(this.#s=e,!0):!1}SetNextInterpolation(e){return this.#t=e,!0}SetCurveType(e){return this.#i=e,!0}SetValue(e){return Number.isFinite(e)?(this.#n=e,!0):!1}SetPreValue(e){return Number.isFinite(e)?(this.#r=!0,this.#e=e,!0):!1}ClearPreValue(){this.#r=!1}SetPreTanWidth(e){return e<0||!Number.isFinite(e)?!1:(this.#o=e,!0)}SetPostTanWidth(e){return e<0||!Number.isFinite(e)?!1:(this.#a=e,!0)}SetPreTanSlope(e){return Number.isFinite(e)?(this.#c=e,!0):!1}SetPostTanSlope(e){return Number.isFinite(e)?(this.#l=e,!0):!1}SetPreTanAlgorithm(e){return this.#u=e,!0}SetPostTanAlgorithm(e){return this.#h=e,!0}SetCustomData(e){return this.#d=structuredClone(e),!0}SetCustomDataByKey(e,t){return this.#d[e]=structuredClone(t),!0}GetCustomDataByKey(e){return structuredClone(this.#d[e])}UpdateTangents(e,t,i=Be.Bezier){const r=a=>{const c=a?this.#u:this.#h,l=a?e:t;if(!l)return c!==et.AutoEase;if(c!==et.AutoEase){if(i===Be.Hermite){const m=Math.abs(l.GetTime()-this.#s)/3;a?this.#o=m:this.#a=m}return!0}const u=!e||!t||this.#r||this.#t===J.ValueBlock||e.GetNextInterpolation()===J.ValueBlock;let d=0;if(!u){const m=(this.#n-e.GetValue())/(this.#s-e.GetTime()),p=(t.GetPreValue()-this.#n)/(t.GetTime()-this.#s);if(m*p>0){const f=(this.#s-e.GetTime())/(t.GetTime()-e.GetTime())-.5,g=.5+f*(.5+2*f*f);d=(1-g)*m+g*p,d=p>0?Math.min(d,3*p,3*m):Math.max(d,3*p,3*m)}}const h=Math.abs(l.GetTime()-this.#s)/3;return a?(this.#c=d,this.#o=h):(this.#l=d,this.#a=h),!0},n=r(!0),o=r(!1);return n||o}}class Rt extends Array{static get[Symbol.species](){return Array}has(e){return this.some(t=>t.GetTime()===e)}get(e){return this.find(t=>t.GetTime()===e)}set(e,t){t.SetTime(e);const i=this.findIndex(r=>r.GetTime()===e);return i>=0?this.splice(i,1,t):this.push(t),this.sort((r,n)=>r.GetTime()-n.GetTime()),this}}let Si=Li.KeepRatio;class Ce{#s=!1;#t=Be.Bezier;#i=new Ht;#r=new Ht;#n=new us;#e=new Rt;valueType;constructor(e=$.Declare("double")){this.valueType=typeof e=="string"?$.Declare(e):e}clone(){const e=new Ce(this.valueType);return e.#s=this.#s,e.#t=this.#t,e.#i=Jt(this.#i),e.#r=Jt(this.#r),e.#n=yn(this.#n),e.#e=new Rt(...this.#e.map(t=>t.clone())),e}GetValueType(){return this.valueType}GetValueTypeName(){return this.valueType.GetTypeName()}IsTimeValued(){return this.#s}GetCurveType(){return this.#t}GetPreExtrapolation(){return Jt(this.#i)}GetPostExtrapolation(){return Jt(this.#r)}GetInnerLoopParams(){return yn(this.#n)}GetKnots(e){const t=e?this.#e.filter(i=>Sn(e,i.GetTime())):this.#e;return new Rt(...t.map(i=>i.clone()))}GetKnot(e){return this.#e.get(e)?.clone()}SetTimeValued(e){this.#s=e}SetCurveType(e){this.#t=e,this.#p()}SetPreExtrapolation(e){this.#i=Jt(e)}SetPostExtrapolation(e){this.#r=Jt(e)}SetInnerLoopParams(e){this.#n=yn(e)}SetKnots(e){this.#e=new Rt(...e.map(t=>t.clone()).sort(Ca)),this.#p()}SetKnot(e){this.#e.get(e.GetTime()),this.#e.set(e.GetTime(),e.clone()),this.#p(),this.AdjustRegressiveTangents();const t=this.#e.findIndex(i=>i.GetTime()===e.GetTime());return[this.#e[Math.max(0,t-1)]?.GetTime()??e.GetTime(),this.#e[Math.min(this.#e.length-1,t+1)]?.GetTime()??e.GetTime()]}RemoveKnot(e){const t=this.#e.findIndex(i=>i.GetTime()===e);t>=0&&this.#e.splice(t,1),this.#p()}ClearKnots(){this.#e=new Rt}IsPreExtrapolationValid(){return this.#d(this.#i)}IsPostExtrapolationValid(){return this.#d(this.#r)}IsEmpty(){return this.#e.length===0}HasValueBlocks(){return this.#i.mode===X.ValueBlock||this.#r.mode===X.ValueBlock||this.#e.some(e=>e.GetNextInterpolation()===J.ValueBlock)}HasLoops(){return this.HasInnerLoops()||this.HasExtrapolatingLoops()}HasInnerLoops(){const e=this.#n;return e.protoEnd>e.protoStart&&this.#e.has(e.protoStart)&&(e.numPreLoops>0||e.numPostLoops>0)}HasExtrapolatingLoops(){return this.#i.IsLooping()||this.#r.IsLooping()}HasValueBlockAtTime(e){return this.Eval(e)===void 0}DoSidesDiffer(e){return this.EvalPreValue(e)!==this.Eval(e)}static IsSupportedValueType(e){const t=typeof e=="string"?e:e.GetTypeName();return["double","float","GfHalf","GfTimeCode"].includes(t)}static GetAntiRegressionAuthoringMode(){return Si}GetAntiRegressionAuthoringMode(){return Si}Eval(e){return this.#o(e,!1,!1,!1)}EvalPreValue(e){return this.#o(e,!0,!1,!1)}EvalHeld(e){return this.#o(e,!1,!1,!0)}EvalPreValueHeld(e){return this.#o(e,!0,!1,!0)}EvalDerivative(e){return this.#o(e,!1,!0,!1)}EvalPreDerivative(e){return this.#o(e,!0,!0,!1)}#o(e,t,i,r){if(!Number.isFinite(e)||this.#e.length===0)return;const n=this.#u(e,t);if(n){const h=this.#h(n.time,n.pre,i,r);return h===void 0||i?h:h+n.valueOffset}const o=this.#e[0],a=this.#e[this.#e.length-1];if(e<o.GetTime()||t&&e===o.GetTime())return this.#c(this.#i,e,!0,i,r);if(e>a.GetTime())return this.#c(this.#r,e,!1,i,r);const c=this.#e.findIndex(h=>h.GetTime()===e);if(c>=0){const h=this.#e[c];return t?c===0?this.#c(this.#i,e,!0,i,r):i?r?0:_s(this.#e[c-1],h,1,this.#t):h.GetPreValue():c===this.#e.length-1&&this.#r.mode===X.ValueBlock?void 0:i?r?0:c===this.#e.length-1?this.#a():_s(h,this.#e[c+1],0,this.#t):h.GetValue()}let l=1;for(;this.#e[l].GetTime()<e;)l++;const u=this.#e[l-1],d=this.#e[l];return r?u.GetNextInterpolation()===J.ValueBlock?void 0:u.GetValue():i?np(u,d,e,this.#t):rp(u,d,e,this.#t)}#a(){const e=this.#r;if(e.mode!==X.ValueBlock)return e.mode===X.Held?0:e.mode===X.Sloped?e.slope:this.#e.length<2?0:_s(this.#e[this.#e.length-2],this.#e[this.#e.length-1],1,this.#t)}#c(e,t,i,r,n){const o=i?this.#e[0]:this.#e[this.#e.length-1];if(e.mode===X.ValueBlock)return;if(e.IsLooping()&&this.#e.length>1){const l=this.#l(e,t,i);if(!l)return;const u=this.#o(l.time,l.pre,r,n);return u===void 0?void 0:r?l.reverse?-u:u:u+l.valueOffset}if(r)return n||e.mode===X.Held||this.#e.length<2?0:e.mode===X.Sloped?e.slope:i?_s(this.#e[0],this.#e[1],0,this.#t):_s(this.#e[this.#e.length-2],o,1,this.#t);const a=i?o.GetPreValue():o.GetValue();if(n||e.mode===X.Held||this.#e.length<2)return a;const c=e.mode===X.Sloped?e.slope:i?_s(this.#e[0],this.#e[1],0,this.#t)??0:_s(this.#e[this.#e.length-2],o,1,this.#t)??0;return a+c*(t-o.GetTime())}#l(e,t,i){const r=this.#e[0],n=this.#e[this.#e.length-1];let o=r.GetTime(),a=n.GetTime();if(e.loopBoundaryTime!==void 0){if(!this.#e.has(e.loopBoundaryTime))return;i?o=e.loopBoundaryTime:a=e.loopBoundaryTime}const c=a-o;if(c<=0)return{time:i?o:a,pre:!1,valueOffset:0,reverse:!1};const l=Math.floor((t-o)/c);let u=t-l*c;u<o&&(u+=c);const d=e.mode===X.LoopOscillate&&Math.abs(l)%2===1;d&&(u=o+a-u);const h=(this.#o(a,!0,!1,!1)??0)-(this.#o(o,!1,!1,!1)??0),m=e.mode===X.LoopRepeat?l*h:0;return{time:u,pre:d,valueOffset:m,reverse:d}}#u(e,t){if(!this.HasInnerLoops())return;const i=this.#n,r=i.protoEnd-i.protoStart,n=i.protoStart-i.numPreLoops*r,o=i.protoEnd+i.numPostLoops*r;if(e<n||e>o)return;let a=Math.floor((e-i.protoStart)/r);e===o&&!t&&a--;const c=e-a*r;return{time:c,pre:t&&c===i.protoStart,valueOffset:a*i.valueOffset}}#h(e,t,i,r){const n=this.#n,o=this.clone();o.#n=new us,o.#e=new Rt(...o.#e.filter(l=>l.GetTime()>=n.protoStart&&l.GetTime()<n.protoEnd));const a=o.#e.get(n.protoStart);if(!a)return;const c=a.clone();return c.SetTime(n.protoEnd),c.SetValue(a.GetValue()+n.valueOffset),a.IsDualValued()&&c.SetPreValue(a.GetPreValue()+n.valueOffset),o.#e.set(n.protoEnd,c),o.#o(e,t,i,r)}CanBreakdown(e){if(!Number.isFinite(e))return{value:!1,reason:"Time is not finite"};if(this.#e.has(e))return{value:!1,reason:"A knot already exists at the requested time"};if(this.#i.IsLooping()||this.#r.IsLooping()){const t=this.#e[0]?.GetTime()??0,i=this.#e[this.#e.length-1]?.GetTime()??0;if(e<t||e>i)return{value:!1,reason:"Cannot break down extrapolating loops"}}return{value:this.Eval(e)!==void 0,reason:this.Eval(e)===void 0?"No value at requested time":""}}Breakdown(e){if(!this.CanBreakdown(e).value)return;const t=this.Eval(e),i=this.EvalDerivative(e)??0,r=this.EvalPreDerivative(e)??i,n=this.#e.findIndex(l=>l.GetTime()>e),o=n>0?this.#e[n-1]:void 0,a=n>=0?this.#e[n]:void 0,c=new Vs(this.valueType);return c.SetTime(e),c.SetValue(t),c.SetNextInterpolation(o?.GetNextInterpolation()??J.Held),c.SetPreTanSlope(r),c.SetPostTanSlope(i),o&&c.SetPreTanWidth((e-o.GetTime())/3),a&&c.SetPostTanWidth((a.GetTime()-e)/3),this.SetKnot(c)}Sample(e,t,i,r,n=!1){if(e.IsEmpty?.()||t===0||r<0)return;const o=n?new ka:new Eu,a=[],c=(u,d,h)=>{const m=this.Eval(u),p=this.Eval(d);if(m===void 0||p===void 0)return;const y=(u+d)/2,f=this.Eval(y);if(f===void 0)return;const g=(m+p)/2;h<20&&Math.abs((f-g)*i)>r?(c(u,y,h+1),c(y,d,h+1)):((a.length===0||a.at(-1)[0]!==u)&&a.push([u*t,m*i]),a.push([d*t,p*i]))},l=[e.GetMin(),...this.#e.map(u=>u.GetTime()).filter(u=>u>e.GetMin()&&u<e.GetMax()),e.GetMax()];for(let u=0;u+1<l.length;u++)c(l[u],l[u+1],0);return o.polylines.push(a),o instanceof ka&&o.sources.push(Nu.KnotInterp),o}HasRegressiveTangents(){return this.#t!==Be.Bezier?!1:this.#e.some((e,t)=>{const i=this.#e[t+1];return i?Jn(e.GetPostTanWidth(),i.GetPreTanWidth(),i.GetTime()-e.GetTime()):!1})}AdjustRegressiveTangents(){if(this.#t!==Be.Bezier||Si===Li.None)return!1;let e=!1;for(let t=0;t+1<this.#e.length;t++){const i=this.#e[t],r=this.#e[t+1],n=r.GetTime()-i.GetTime();let o=i.GetPostTanWidth(),a=r.GetPreTanWidth();if(Jn(o,a,n)){if(Si===Li.Contain)o=Math.min(o,n),a=Math.min(a,n);else if(Si===Li.KeepStart)a=Math.max(0,n-o);else{const c=n/(o+a);o*=c,a*=c}i.SetPostTanWidth(o),r.SetPreTanWidth(a),e=!0}}return e}GetTimeScaled(e,t){if(e===0)return new Ce;const i=this.clone(),r=i.#e.map(o=>{const a=o.clone();a.SetTime(o.GetTime()*e+t);const c=Math.abs(e);return a.SetPreTanWidth(o.GetPreTanWidth()*c),a.SetPostTanWidth(o.GetPostTanWidth()*c),a.SetPreTanSlope(o.GetPreTanSlope()/e),a.SetPostTanSlope(o.GetPostTanSlope()/e),a}).sort(Ca);i.#e=new Rt(...r);const n=i.#n;return n.protoStart=n.protoStart*e+t,n.protoEnd=n.protoEnd*e+t,n.protoStart>n.protoEnd&&([n.protoStart,n.protoEnd]=[n.protoEnd,n.protoStart]),i.#i.slope/=e,i.#r.slope/=e,e<0&&([i.#i,i.#r]=[i.#r,i.#i]),i}GetTruncated(e,t=new Ht(X.Held),i=new Ht(X.Held)){if(e.IsEmpty?.())return new Ce;const r=this.clone(),n=e.GetMin(),o=e.GetMax();return Number.isFinite(n)&&!r.#e.has(n)&&r.Eval(n)!==void 0&&r.Breakdown(n),Number.isFinite(o)&&!r.#e.has(o)&&r.Eval(o)!==void 0&&r.Breakdown(o),r.#e=new Rt(...r.#e.filter(a=>Sn(e,a.GetTime()))),r.#i=Jt(t),r.#r=Jt(i),r.#n=new us,r}GetKnotsWithInnerLoopsBaked(){if(!this.HasInnerLoops())return this.GetKnots();const e=this.#n,t=e.protoEnd-e.protoStart,i=new Rt;for(const o of this.#e)(o.GetTime()<e.protoStart-e.numPreLoops*t||o.GetTime()>e.protoEnd+e.numPostLoops*t)&&i.push(o.clone());const r=this.#e.filter(o=>o.GetTime()>=e.protoStart&&o.GetTime()<e.protoEnd);for(let o=-e.numPreLoops;o<=e.numPostLoops;o++)for(const a of r){const c=a.clone();c.SetTime(a.GetTime()+o*t),c.SetValue(a.GetValue()+o*e.valueOffset),a.IsDualValued()&&c.SetPreValue(a.GetPreValue()+o*e.valueOffset),i.set(c.GetTime(),c)}const n=this.#e.get(e.protoStart);if(n){const o=e.numPostLoops+1,a=n.clone();a.SetTime(e.protoStart+o*t),a.SetValue(n.GetValue()+o*e.valueOffset),n.IsDualValued()&&a.SetPreValue(n.GetPreValue()+o*e.valueOffset),i.set(a.GetTime(),a)}return i}BakeInnerLoops(){return this.HasInnerLoops()?(this.#e=this.GetKnotsWithInnerLoopsBaked(),this.#n=new us,!0):!1}GetKnotsWithLoopsBaked(e){const t=this.GetKnotsWithInnerLoopsBaked(),i=Math.max(.001,(e.GetMax()-e.GetMin())/100);for(let r=e.GetMin();r<=e.GetMax();r+=i){if(this.Eval(r)===void 0)continue;const n=new Vs(this.valueType);n.SetTime(r),n.SetValue(this.Eval(r)),n.SetNextInterpolation(J.Linear),t.set(r,n)}return t}Diff(e,t){const r=[...new Set([...this.#e.map(n=>n.GetTime()),...e.#e.map(n=>n.GetTime())])].filter(n=>(!t||Sn(t,n))&&(this.Eval(n)!==e.Eval(n)||this.EvalPreValue(n)!==e.EvalPreValue(n)));return r.length?[Math.min(...r),Math.max(...r)]:void 0}static Concatenate(e){const t=e.filter(r=>!r.IsEmpty());if(!t.length)return new Ce;const i=new Ce(t[0].valueType);i.#i=t[0].GetPreExtrapolation(),i.#r=t.at(-1).GetPostExtrapolation();for(const r of t){if(r.GetValueTypeName()!==i.GetValueTypeName()||r.HasInnerLoops())return new Ce;for(const n of r.#e)i.#e.set(n.GetTime(),n.clone())}return i}#d(e){return e.loopBoundaryTime===void 0||this.#e.has(e.loopBoundaryTime)}#p(){for(let e=0;e<this.#e.length;e++)this.#e[e].UpdateTangents(this.#e[e-1],this.#e[e+1],this.#t)}}function Jt(s){return new Ht(s.mode,s.slope,s.loopBoundaryTime)}function yn(s){return new us(s.protoStart,s.protoEnd,s.numPreLoops,s.numPostLoops,s.valueOffset)}function Ca(s,e){return s.GetTime()-e.GetTime()}function Sn(s,e){return(e>s.GetMin()||e===s.GetMin()&&(s.IsMinClosed?.()??!0))&&(e<s.GetMax()||e===s.GetMax()&&(s.IsMaxClosed?.()??!0))}function jo(s,e){return(e.GetPreValue()-s.GetValue())/(e.GetTime()-s.GetTime())}function bn(s,e,t,i){return{a:-s+3*e-3*t+i,b:3*s-6*e+3*t,c:-3*s+3*e,d:s}}function tp(s,e){return e*(e*(e*s.a+s.b)+s.c)+s.d}function Ba(s,e){return e*(3*s.a*e+2*s.b)+s.c}function sp(s){const e=p=>p.reduce((y,f)=>Math.abs(f-.5)<Math.abs(y-.5)?f:y);if(Math.abs(s.a)<=1e-10){if(Math.abs(s.b)<=1e-10)return Math.abs(s.c)<=1e-10?0:-s.d/s.c;const p=Math.sqrt(s.c*s.c-4*s.b*s.d);return e([(-s.c-p)/(2*s.b),(-s.c+p)/(2*s.b)])}const i=s.b/s.a,r=s.c/s.a,n=s.d/s.a,a=(3*r-i*i)/3/3,c=a*a*a,l=(2*i*i*i-9*i*r+27*n)/27,u=l/2,d=u*u+c,h=i/3;if(d<0){const p=Math.sqrt(-c),y=Math.acos(Math.max(-1,Math.min(1,-l/(2*p)))),f=2*Math.cbrt(p);return e([f*Math.cos(y/3)-h,f*Math.cos((y+2*Math.PI)/3)-h,f*Math.cos((y+4*Math.PI)/3)-h])}if(d===0){const p=-Math.cbrt(u);return e([2*p-h,-p-h])}const m=Math.sqrt(d);return Math.cbrt(m-u)-Math.cbrt(m+u)-h}function ip(s,e){const t=e.GetTime()-s.GetTime();let i=s.GetPostTanWidth(),r=e.GetPreTanWidth();if(Jn(i,r,t)){const n=t/(i+r);i*=n,r*=n}return[i,r]}function Jn(s,e,t){return s+e>t&&s+e>0}function Ou(s,e,t){const[i,r]=ip(s,e),n=bn(s.GetTime(),s.GetTime()+i,e.GetTime()-r,e.GetTime()),o=bn(s.GetValue(),s.GetValue()+i*s.GetPostTanSlope(),e.GetPreValue()-r*e.GetPreTanSlope(),e.GetPreValue()),a=bn(s.GetTime()-t,s.GetTime()+i-t,e.GetTime()-r-t,e.GetTime()-t);return{t:Math.max(0,Math.min(1,sp(a))),x:n,y:o}}function rp(s,e,t,i){switch(s.GetNextInterpolation()){case J.ValueBlock:return;case J.Held:return s.GetValue();case J.Linear:return s.GetValue()+jo(s,e)*(t-s.GetTime())}const r=e.GetTime()-s.GetTime();if(i===Be.Hermite){const o=(t-s.GetTime())/r,a=o*o,c=a*o;return(2*c-3*a+1)*s.GetValue()+(c-2*a+o)*s.GetPostTanSlope()*r+(-2*c+3*a)*e.GetPreValue()+(c-a)*e.GetPreTanSlope()*r}const n=Ou(s,e,t);return tp(n.y,n.t)}function np(s,e,t,i){if(s.GetNextInterpolation()===J.ValueBlock)return;if(s.GetNextInterpolation()===J.Held)return 0;if(s.GetNextInterpolation()===J.Linear)return jo(s,e);const r=e.GetTime()-s.GetTime();if(i===Be.Hermite){const a=(t-s.GetTime())/r,c=a*a;return((6*c-6*a)*s.GetValue()+(3*c-4*a+1)*s.GetPostTanSlope()*r+(-6*c+6*a)*e.GetPreValue()+(3*c-2*a)*e.GetPreTanSlope()*r)/r}const n=Ou(s,e,t),o=Ba(n.x,n.t);return o===0?0:Ba(n.y,n.t)/o}function _s(s,e,t,i){if(s.GetNextInterpolation()!==J.ValueBlock)return s.GetNextInterpolation()===J.Held?0:s.GetNextInterpolation()===J.Linear?jo(s,e):t===0?s.GetPostTanSlope():e.GetPreTanSlope()}class op{#s=0;#t;constructor(e){this.#t=new DataView(e.buffer,e.byteOffset,e.byteLength)}get remaining(){return this.#t.byteLength-this.#s}u8(){return this.#t.getUint8(this.#s++)}u16(){const e=this.#t.getUint16(this.#s,!0);return this.#s+=2,e}u32(){const e=this.#t.getUint32(this.#s,!0);return this.#s+=4,e}i32(){const e=this.#t.getInt32(this.#s,!0);return this.#s+=4,e}f32(){const e=this.#t.getFloat32(this.#s,!0);return this.#s+=4,e}f64(){const e=this.#t.getFloat64(this.#s,!0);return this.#s+=8,e}}function ap(s){const e=(s&32768)<<16;let t=s>>10&31,i=s&1023,r;if(t===0)if(i===0)r=e;else{for(t=1;!(i&1024);)i<<=1,t--;i&=1023,r=e|t+112<<23|i<<13}else t===31?r=e|2139095040|i<<13:r=e|t+112<<23|i<<13;const n=new ArrayBuffer(4),o=new DataView(n);return o.setUint32(0,r,!0),o.getFloat32(0,!0)}class cp{static CreateSplineFromBinaryData(e,t){if(e.byteLength===0)return new Ce;const i=new op(e),r=i.u8(),n=r&15;if(n!==1&&n!==2)throw new Error(`Unknown spline data version ${n}`);const o=(r&48)>>4,c=["double","double","float","GfHalf"][o];if(c===void 0)throw new Error("Bad spline type descriptor");const l=$.Declare(c),u=new Ce(l);u.SetTimeValued(!!(r&64));const d=(r&128)>>7;u.SetCurveType(d);const h=i.u8(),m=h&7,p=(h&24)>>3;u.SetPreExtrapolation(new Ht(m,m===X.Sloped?i.f64():0)),u.SetPostExtrapolation(new Ht(p,p===X.Sloped?i.f64():0)),h&64&&u.SetInnerLoopParams(new us(i.f64(),i.f64(),i.i32(),i.i32(),i.f64()));const y=()=>{if(o===1)return i.f64();if(o===2)return i.f32();if(o===3)return ap(i.u16());throw new Error("Cannot read knots for an untyped spline")},f=[];{let g=i.u32();for(;g-- >0;){const S=i.u8(),b=new Vs(l);if(b.SetNextInterpolation((S&6)>>1),b.SetCurveType((S&8)>>3),b.SetTime(i.f64()),b.SetValue(y()),S&1&&b.SetPreValue(y()),d!==Be.Hermite&&(b.SetPreTanWidth(i.f64()),b.SetPostTanWidth(i.f64())),b.SetPreTanSlope(y()),b.SetPostTanSlope(y()),n>1){const P=i.u8();b.SetPreTanAlgorithm(P&15),b.SetPostTanAlgorithm(P>>4)}b.SetCustomData(t.get(b.GetTime())??{}),f.push(b)}}if(i.remaining!==0)throw new Error(`Unread spline data: ${i.remaining} bytes`);return u.SetKnots(f),u}}class Xt{#s;#t;#i;constructor(e="",t=""){typeof e=="string"?(this.#s=e,this.#t="",this.#i=t):(this.#s=e.authoredPath??"",this.#t=e.evaluatedPath??"",this.#i=e.resolvedPath??"")}getAuthoredPath(){return this.#s}getEvaluatedPath(){return this.#t}getAssetPath(){return this.#t||this.#s}getResolvedPath(){return this.#i}equals(e){return e instanceof Xt&&e.#s===this.#s&&e.#t===this.#t&&e.#i===this.#i}}class pe{equals(e){return e instanceof pe}toString(){return"Sdf.ValueBlock()"}}class tt{equals(e){return e instanceof tt}toString(){return"Sdf.AnimationBlock()"}}class Lu{constructor(e,t){this.value=e,this.typeName=t}}const zi=new Map([["customData",{typeName:"dictionary",appliesTo:new Set(["prims","attributes","relationships"])}],["assetInfo",{typeName:"dictionary",appliesTo:new Set(["prims"])}],["customLayerData",{typeName:"dictionary",appliesTo:new Set(["layers"])}],["int_single",{typeName:"int",appliesTo:new Set(["layers"])}],["string_single",{typeName:"string",appliesTo:new Set(["layers"])}],["prefix",{typeName:"string",appliesTo:new Set(["prims"])}]]),bs=new WeakMap,lp=new WeakMap,up=new WeakMap;function Fu(s,e){bs.set(s,e)}function Ho(s){return bs.get(s)}function dp(s,e){lp.set(s,e)}function Na(s,e){up.set(s,e)}function hp(s,e){const t=bs.get(s);t&&bs.set(e,t)}function Mu(s,e){if(!Lr(s))return s;const t=bs.get(s),i={};for(const[r,n]of Object.entries(s)){const o=Mu(n,e);i[r]=t?.get(r)?e(o,t.get(r)):o}return t&&bs.set(i,t),i}function pp(s){for(const e of s){const t=e.GetMetadata().SdfMetadata;if(Lr(t))for(const[i,r]of Object.entries(t)){if(zi.has(i)||!Lr(r))continue;const n=r.type;if(typeof n!="string")continue;const o=r.appliesTo,a=typeof o=="string"?new Set([o]):Array.isArray(o)?new Set(o.filter(u=>typeof u=="string")):void 0,c=Object.fromEntries(Object.entries(r).filter(([u])=>u!=="type"&&u!=="default"&&u!=="appliesTo")),l={typeName:n,..."default"in r?{fallback:r.default}:{},...Object.keys(c).length?{info:c}:{},...a?.size?{appliesTo:a}:{}};zi.set(i,l)}}}class fp{constructor(e,t){this.name=e,this._definition=t}getTypeName(){return this._definition.typeName}getFallback(){return this._definition.fallback}getInfo(){return this._definition.info??{}}}class $u{static _instance=new $u;static getInstance(){return this._instance}isValidFieldForSpec(e,t){return en(e,t)!==void 0}getFallback(e){return zi.get(e)?.fallback}getFieldDefinition(e){const t=zi.get(e);return t?new fp(e,t):void 0}}function en(s,e){const t=zi.get(s);if(!t)return;if(!t.appliesTo)return t.typeName;const i=e==="layer"?"layers":e==="prim"?"prims":e==="attribute"?"attributes":e==="relationship"?"relationships":"variants";if(t.appliesTo.has(i)||(e==="attribute"||e==="relationship")&&t.appliesTo.has("properties")||e==="variant"&&t.appliesTo.has("prims"))return t.typeName}function Ru(s,e,t){if(e==="timecode")return typeof s=="number"?t(s):s;if(e==="timecode[]")return Array.isArray(s)?s.map(n=>typeof n=="number"?t(n):n):s;if(e!=="dictionary"||!Lr(s))return s;const i=bs.get(s),r={};for(const[n,o]of Object.entries(s))r[n]=Ru(o,i?.get(n),t);return i&&bs.set(r,i),r}function Lr(s){return typeof s=="object"&&s!==null&&!Array.isArray(s)}function mp(s){const e={};for(const t of s.getSpecPaths()){const i={};for(const r of s.getFieldNames(t))i[r]={value:s.getField(t,r)};e[t]=i}return e}function gp(s){const e=mp(s),t=["#usda 1.0"],i=Sp(e);if(i.length>0){t.push("(");for(const o of i)t.push(o);t.push(")")}const r=e["/"]?.primOrder?.value;Array.isArray(r)&&r.length>1&&(t.push(""),t.push(`reorder rootPrims = [${r.map(o=>se(o,!1)).join(", ")}]`));const n=e["/"]?.primChildren?.value??[];for(const o of n)t.push(""),ju(e,`/${o}`,t,0);return t.push("",""),t.join(`
`)}const yp=new Set(["specifier","typeName","primChildren","primOrder","properties","comment","subLayerOffsets","layerRelocates","relocates"]);function Sp(s){const e=s["/"];if(!e)return[];const t=[],i=e.comment?.value;typeof i=="string"&&i!==""&&t.push(`    ${se(i)}`);const r=e.layerRelocates?.value??e.relocates?.value;if(r&&typeof r=="object"){const o=Array.isArray(r)?r.filter(a=>Array.isArray(a)&&a.length===2&&typeof a[0]=="string"&&typeof a[1]=="string"):Object.entries(r).filter(a=>typeof a[1]=="string");o.length===0?t.push("    relocates = {}"):t.push(["    relocates = {",...o.map(([a,c],l)=>`        <${a}>: <${c}>${l+1<o.length?",":""}`),"    }"].join(`
`))}const n=Object.keys(e).filter(o=>!yp.has(o)).sort();for(const o of n){const a=e[o]?.value;if(a!==void 0)if(o==="subLayers"){const c=a;if(!Array.isArray(c)||c.length===0)continue;const l=e.subLayerOffsets?.value??[];t.push("    subLayers = ["),c.forEach((u,d)=>{const h=l[d],m=h&&(h.offset!==0||h.scale!==1)?` ${Vu(h)}`:"";t.push(`        @${u}@${m}${d<c.length-1?",":""}`)}),t.push("    ]")}else o==="doc"?t.push(`    doc = ${se(String(a))}`):Zi(a)?t.push(...Uu(o,a,1)):typeof a=="string"?t.push(`    ${o} = ${se(a)}`):typeof a=="number"?t.push(`    ${o} = ${St(a)}`):typeof a=="boolean"&&t.push(`    ${o} = ${a}`)}return t}function Vu(s){const e=[];return s.offset!==0&&e.push(`offset = ${St(s.offset)}`),s.scale!==1&&e.push(`scale = ${St(s.scale)}`),`(${e.join("; ")})`}function bp(s){let e="";s.assetPath&&(e+=`@${s.assetPath}@`),s.primPath&&(e+=`<${s.primPath}>`);const t=s.layerOffset;return t&&(t.offset!==0||t.scale!==1)&&(e+=` ${Vu(t)}`),e}function bi(s,e,t,i=!1){const r=[],n=(o,a)=>{if(!a||a.length===0)return;const c=a.map(t),l=i&&c.length===1?c[0]:c.length>1&&o===""&&s!=="apiSchemas"&&s!=="variantSets"?`[
${c.map((u,d)=>`\0    ${u}${d+1<c.length?",":""}`).join(`
`)}
\0]`:`[${c.join(", ")}]`;r.push(`${o}${s} = ${l}`)};return e.isExplicit?n("",e.explicitItems):(n("delete ",e.deletedItems),n("add ",e._sdfAddedItems),n("prepend ",e.prependedItems),n("append ",e.appendedItems?.filter(o=>!(e._sdfAddedItems??[]).some(a=>JSON.stringify(a)===JSON.stringify(o)))),n("reorder ",e.orderedItems)),r}function Zi(s){return s!==null&&typeof s=="object"&&!Array.isArray(s)&&Object.getPrototypeOf(s)===Object.prototype}function Gu(s,e,t,i){const r=ot(t),n=/^[A-Za-z_][A-Za-z0-9_]*$/.test(s)?s:se(s,!1);if(Zi(e)){const o=[`${r}dictionary ${n} = {`],a=Ho(e);for(const c of Object.keys(e).sort())o.push(...Gu(c,e[c],t+1,a?.get(c)));return o.push(`${r}}`),o}if(e instanceof Xt)return[`${r}asset ${n} = ${ni(e.getAssetPath())}`];if(i==="asset"&&typeof e=="string")return[`${r}asset ${n} = ${ni(e)}`];if(i==="asset[]"&&Array.isArray(e))return[`${r}asset[] ${n} = [${e.map(o=>ni(o instanceof Xt?o.getAssetPath():String(o))).join(", ")}]`];if(i==="double2[]"&&Array.isArray(e))return[`${r}double2[] ${n} = [${e.map(o=>`(${o.map(a=>St(Number(a))).join(", ")})`).join(", ")}]`];if(i==="double"&&typeof e=="number")return[`${r}double ${n} = ${St(e)}`];if(i==="token"&&typeof e=="string")return[`${r}token ${n} = ${se(e,!1)}`];if(typeof e=="string")return[`${r}string ${n} = ${se(e)}`];if(typeof e=="boolean")return[`${r}bool ${n} = ${e?"1":"0"}`];if(typeof e=="bigint")return[`${r}int64 ${n} = ${e}`];if(typeof e=="number")return[`${r}${Number.isInteger(e)?"int":"double"} ${n} = ${St(e)}`];if(Array.isArray(e)){if(e.every(o=>typeof o=="string"))return[`${r}token[] ${n} = [${e.map(o=>se(o,!1)).join(", ")}]`];if(e.every(o=>typeof o=="number")){const o=e.every(a=>Number.isInteger(a))?"int[]":"double[]";return[`${r}${o} ${n} = [${e.map(a=>St(a)).join(", ")}]`]}}return[`${r}string ${n} = ${se(String(e))}`]}function Uu(s,e,t){const i=ot(t),r=[`${i}${s} = {`],n=Ho(e);for(const o of Object.keys(e).sort())r.push(...Gu(o,e[o],t+1,n?.get(o)));return r.push(`${i}}`),r}const Pp=new Set(["specifier","typeName","primChildren","properties","primOrder","propertyOrder","variantSetChildren","comment","relocates"]);function Wu(s){const e=[],t=s.comment?.value;typeof t=="string"&&t!==""&&e.push(se(t));const i=Object.keys(s).filter(r=>!Pp.has(r)&&s[r]?.value!==void 0).sort((r,n)=>Jr(r,n));for(const r of i){const n=s[r].value;switch(r){case"apiSchemas":case"clipSets":e.push(...bi(r,n,o=>se(o,!1)));break;case"inheritPaths":e.push(...bi("inherits",n,o=>`<${o}>`));break;case"specializes":e.push(...bi("specializes",n,o=>`<${o}>`));break;case"references":case"payload":e.push(...bi(r,n,bp,!0));break;case"variantSetNames":e.push(...bi("variantSets",n,o=>se(o,!1)));break;case"variantSelection":{const o=n;if(Zi(o)&&Object.keys(o).length>0){e.push("variants = {");for(const[a,c]of Object.entries(o)){const l=Array.isArray(c)?c[0]:c;typeof l=="string"&&e.push(`    string ${a} = ${se(l,!1)}`)}e.push("}")}break}case"doc":e.push(`doc = ${se(String(n))}`);break;default:e.push(...zu(r,n));break}}if(s.variantSetNames?.value===void 0){const r=s.variantSetChildren?.value;Array.isArray(r)&&r.length>0&&e.push(`prepend variantSets = [${r.map(n=>se(n,!1)).join(", ")}]`)}return e}function zu(s,e){return Zi(e)?Uu(s,e,0):typeof e=="boolean"?[`${s} = ${e}`]:s==="permission"&&(e==="public"||e==="private")?[`${s} = ${e}`]:typeof e=="string"?[`${s} = ${se(e)}`]:typeof e=="number"?[`${s} = ${St(e)}`]:typeof e=="bigint"?[`${s} = ${e}`]:Array.isArray(e)?[`${s} = [${e.map(t=>typeof t=="string"?se(t,!1):qt(t)).join(", ")}]`]:[]}function ju(s,e,t,i){const r=s[e];if(!r)return;const n=r.specifier?.value??"def",o=r.typeName?.value,a=e.lastIndexOf("/"),c=e.lastIndexOf("}"),l=e.slice(Math.max(a,c)+1),u=ot(i);let d=n;o&&(d+=` ${o}`),d+=` "${l}"`;const h=Wu(r);if(h.length>0){t.push(`${u}${d} (`);for(const m of h)qo(t,m,i+1);t.push(`${u})`)}else t.push(`${u}${d}`);t.push(`${u}{`),Hu(s,e,r,t,i),t.push(`${u}}`)}function Hu(s,e,t,i,r){const n=ot(r+1),o=t.propertyOrder?.value;Array.isArray(o)&&o.length>1&&i.push(`${n}reorder properties = [${o.map(d=>se(d,!1)).join(", ")}]`);const a=t.primOrder?.value;Array.isArray(a)&&a.length>1&&i.push(`${n}reorder nameChildren = [${a.map(d=>se(d,!1)).join(", ")}]`);const c=(t.properties?.value??[]).slice().sort((d,h)=>{const m=Jr(d,h);return m!==0?m:Ea(s[`${e}.${d}`])-Ea(s[`${e}.${h}`])});for(const d of c){const h=s[`${e}.${d}`];h&&_p(h,d,i,r+1)}const l=t.primChildren?.value??[];l.length>0&&c.length>0&&i.push(""),l.forEach((d,h)=>{h>0&&i.push(""),ju(s,`${e==="/"?"":e}${e.endsWith("}")?"":"/"}${d}`,i,r+1)});const u=t.variantSetChildren?.value??[];for(const d of u){const m=s[`${e}{${d}=}`]?.variantChildren?.value??[];if(m.length===0)continue;i[i.length-1]!==""&&c.length>0&&i.push("");const p=ot(r+1);i.push(`${p}variantSet "${d}" = {`);for(const y of m){const f=`${e}{${d}=${y}}`,g=s[f],S=ot(r+2);if(!g){i.push(`${S}"${y}" {`,`${S}}`);continue}const b=Wu(g);if(b.length>0){i.push(`${S}"${y}" (`);for(const P of b)qo(i,P,r+3);i.push(`${S})`),i.push(`${S}{`)}else i.push(`${S}"${y}" {`);Hu(s,f,g,i,r+2),(g.primChildren?.value??[]).length>0&&i.push(""),i.push(`${S}}`)}i.push(`${p}}`)}}function Ea(s){return s?.typeName?.value==="rel"?1:0}const vp=new Set(["typeName","default","timeSamples","connectionPaths","targetPaths","custom","variability","spline","comment"]);function wp(s){const e=[],t=s.comment?.value;typeof t=="string"&&t!==""&&e.push(se(t));const i=Object.keys(s).filter(r=>!vp.has(r)&&s[r]?.value!==void 0).sort((r,n)=>Jr(r,n));for(const r of i){const n=s[r].value;r==="doc"?e.push(`doc = ${se(String(n))}`):e.push(...zu(r,n))}return e}function qo(s,e,t){const[i,...r]=e.split(`
`);s.push(`${ot(t)}${i}`);for(const n of r)s.push(n.startsWith("\0")?`${ot(t)}${n.slice(1)}`:n)}function Oa(s,e,t,i){if(t.length===0){s.push(e);return}s.push(`${e} (`);for(const r of t)qo(s,r,i+1);s.push(`${ot(i)})`)}function _p(s,e,t,i){const r=ot(i),n=s.typeName?.value,o=wp(s),a=s.custom?.value===!0?"custom ":"";if(n==="rel"){const b=s.targetPaths?.value,P=Array.isArray(b)?b:b&&typeof b=="object"?[...b.prependedItems??[],...b.explicitItems??[],...b.appendedItems??[]].filter(v=>!(b.deletedItems??[]).includes(v)):[],w=b!==void 0&&!Array.isArray(b)&&(b.prependedItems?.length??0)===0&&(b.explicitItems?.length??0)===0&&(b.appendedItems?.length??0)===0&&(b.deletedItems?.length??0)===0;let _;P.length===0?_=w?`${r}${a}rel ${e} = None`:`${r}${a}rel ${e}`:P.length===1?_=`${r}${a}rel ${e} = <${P[0]}>`:_=`${r}${a}rel ${e} = [
`+P.map(v=>`${ot(i+1)}<${v}>,`).join(`
`)+`
${r}]`,Oa(t,_,o,i);return}const c=n?.startsWith("uniform "),l=c?n.slice(8):n,u=c||s.variability?.value==="uniform",d=`${a}${u?"uniform ":""}`,h=s.default?.value,m="default"in s,p=s.timeSamples?.value,y=Array.isArray(p)?p:p&&typeof p=="object"?Object.entries(p).map(([b,P])=>[Number(b),P]):[],f=s.connectionPaths?.value,g=s.spline?.value,S=f==null?[]:typeof f=="string"?[f]:f;if(o.length>0||m||a!==""||S.length===0&&y.length===0){const b=l??Ra(h);let P=`${r}${d}${b} ${e}`;m&&(P+=` = ${qt(h,b)}`),Oa(t,P,o,i)}if(y.length>0){const b=l??Ra(y[0]?.[1]);t.push(`${r}${u?"uniform ":""}${b} ${e}.timeSamples = {`);for(const[P,w]of y)t.push(`${r}    ${Sr(P)}: ${qt(w,b)},`);t.push(`${r}}`)}if(g instanceof Ce){const b=l??g.GetValueType().GetTypeName();t.push(`${r}${u?"uniform ":""}${b} ${e}.spline = {`),t.push(...Ip(g,b,i+1)),t.push(`${r}}`)}if(S.length>0){const b=l??"token",P=S.length===1?`<${S[0]}>`:`[${S.map(w=>`<${w}>`).join(", ")}]`;t.push(`${r}${u?"uniform ":""}${b} ${e}.connect = ${P}`)}}function Ip(s,e,t){const i=[],r=ot(t),n=s.GetKnots().slice().sort((d,h)=>d.GetTime()-h.GetTime()),o=s.GetCurveType();(o===Be.Hermite||n.some(d=>d.GetNextInterpolation()===J.Curve))&&i.push(`${r}${o===Be.Hermite?"hermite":"bezier"},`);const a=d=>{switch(d){case X.ValueBlock:return"none";case X.Linear:return"linear";case X.Sloped:return"sloped";case X.LoopRepeat:return"loopRepeat";case X.LoopReset:return"loopReset";case X.LoopOscillate:return"loopOscillate";default:return"held"}},c=(d,h)=>{if(h.mode===X.Held&&h.slope===0)return;const m=h.mode===X.Sloped?`(${qt(h.slope,e)})`:"";i.push(`${r}${d}: ${a(h.mode)}${m},`)};c("pre",s.GetPreExtrapolation()),c("post",s.GetPostExtrapolation());const l=s.GetInnerLoopParams();(l.protoStart!==0||l.protoEnd!==0||l.numPreLoops!==0||l.numPostLoops!==0||l.valueOffset!==0)&&i.push(`${r}loop: (${Sr(l.protoStart)}, ${Sr(l.protoEnd)}, ${l.numPreLoops}, ${l.numPostLoops}, ${qt(l.valueOffset,e)}),`);let u=J.Curve;for(const d of n){let h=`${r}${Sr(d.GetTime())}: `;if(d.IsDualValued()&&(h+=`${qt(d.GetPreValue(),e)} & `),h+=qt(d.GetValue(),e),u===J.Curve&&(h+=`; pre ${La(o,d.GetPreTanWidth(),d.GetPreTanSlope(),d.GetPreTanAlgorithm(),e)}`),u=d.GetNextInterpolation(),u===J.Curve)h+=`; post curve ${La(o,d.GetPostTanWidth(),d.GetPostTanSlope(),d.GetPostTanAlgorithm(),e)}`;else{const p=u===J.ValueBlock?"none":u===J.Linear?"linear":"held";h+=`; post ${p}`}const m=d.GetCustomData();Object.keys(m).length>0&&(h+=`; ${qu(m)}`),i.push(`${h},`)}return i}function La(s,e,t,i,r){const n=s===Be.Bezier?[St(e),qt(t,r)]:[qt(t,r)];return i!==et.None&&n.push(i===et.AutoEase?"autoEase":"custom"),`(${n.join(", ")})`}function qu(s){return`{ ${Object.keys(s).sort().map(t=>{const i=s[t],r=/^[A-Za-z_][A-Za-z0-9_]*$/.test(t)?t:se(t,!1);return Zi(i)?`dictionary ${r} = ${qu(i)}`:i instanceof Xt?`asset ${r} = ${ni(i.getAssetPath())}`:typeof i=="string"?`string ${r} = ${se(i)}`:typeof i=="boolean"?`bool ${r} = ${i?"1":"0"}`:typeof i=="number"?`${Number.isInteger(i)?"int":"double"} ${r} = ${St(i)}`:`string ${r} = ${se(String(i))}`}).join("; ")} }`}function Fa(s){return!!(/^(double|float|half|int|uint)[234]$/.test(s)||/^(point|normal|vector|color)[234][fdh]?$/.test(s)||/^texCoord[234][fdh]$/.test(s)||/^quat[fdh]$/.test(s))}function Ma(s){return/^matrix[234]d$/.test(s)||s==="frame4d"}function $a(s){return s==="asset"}function Ap(s){return!!(s==="float"||s==="half"||/^(float|half)[234]$/.test(s)||/^(point|normal|vector|color|texCoord)[234][fh]$/.test(s)||/^quat[fh]$/.test(s))}function Ra(s){if(s==null)return"token";if(typeof s=="boolean")return"bool";if(typeof s=="string")return"string";if(typeof s=="number")return Number.isInteger(s)?"int":"float";if(Array.isArray(s)){if(s.length===0)return"float[]";const e=s[0];if(Array.isArray(e))return`float${e.length}[]`;if(typeof e=="string")return"string[]";if(typeof e=="boolean")return"bool[]";if(typeof e=="number")return s.every(t=>Number.isInteger(t))?"int[]":"float[]"}return"token"}function qt(s,e){const t=e?e.endsWith("[]")?e.slice(0,-2):e:void 0,i=t?Ap(t):!1;return Ku(s,e,i)}function Ku(s,e,t){if(s instanceof pe)return"None";if(s instanceof tt)return"AnimationBlock";if(s==null)return"None";if(typeof s=="boolean")return s?"1":"0";if(typeof s=="number")return St(s,t);if(typeof s=="bigint")return s.toString();const i=e?e.endsWith("[]")?e.slice(0,-2):e:void 0;if(typeof s=="string")return i&&$a(i)?ni(s):se(s);const r=n=>Ku(n,void 0,t);if(Array.isArray(s)){if(s.length===0)return"[]";if(e&&i){if(e.endsWith("[]"))return Fa(i)?`[${s.map(c=>Array.isArray(c)?`(${c.map(r).join(", ")})`:r(c)).join(", ")}]`:Ma(i)?`[${s.map(c=>Va(c,r)).join(", ")}]`:$a(i)?`[${s.map(a=>typeof a=="string"?ni(a):r(a)).join(", ")}]`:`[${s.map(r).join(", ")}]`;if(Fa(i))return`(${s.map(r).join(", ")})`;if(Ma(i))return Va(s,r)}const n=s[0];return Array.isArray(n)?`[${s.map(a=>`(${a.map(r).join(", ")})`).join(", ")}]`:`[${s.map(r).join(", ")}]`}return String(s)}function Va(s,e){return`( ${s.map(t=>`(${t.map(e).join(", ")})`).join(", ")} )`}function ni(s){return s.includes("@")?`@@@${s.replace(/@@@/g,"\\@@@")}@@@`:`@${s}@`}function se(s,e=!0){let t='"';s.includes('"')&&!s.includes("'")&&(t="'");const i=e&&s.includes(`
`);let r=i?t+t+t:t;for(const n of s)if(n===`
`)r+=i?`
`:"\\n";else if(n==="\r")r+="\\r";else if(n==="	")r+="\\t";else if(n==="\\")r+="\\\\";else if(n===t)r+="\\"+t;else{const o=n.codePointAt(0);o>=32&&o<=126?r+=n:o<32||o===127?r+=`\\x${o.toString(16).padStart(2,"0")}`:r+=n}return r+=i?t+t+t:t,r}function Tp(s){const e=Math.fround(s);for(let t=1;t<=9;t++){const i=Number(e.toPrecision(t));if(Math.fround(i)===e)return eo(i.toString())}return eo(e.toString())}function eo(s){return s.replace("e+","e")}function St(s,e=!1){if(Number.isNaN(s))return"nan";if(!Number.isFinite(s))return s>0?"inf":"-inf";if(Number.isInteger(s))return`${s}`;const t=e?Tp(s):eo(String(s));return t.includes(".")||t.includes("e")?t:`${t}.0`}function Sr(s){return Number.isInteger(s)?`${s}`:String(s)}function ot(s){return"    ".repeat(s)}class Js{constructor(e,t){this.raw=e,this.value=t}valueOf(){return this.value}}function tn(s){return s instanceof Js?s.value:Array.isArray(s)?s.map(tn):s}function Dp(s){switch(s){case"bool":return"bool";case"int":case"uint":return"int";case"int64":case"uint64":return"int64";case"float":case"double":case"half":case"timecode":return"float";case"string":return"string";case"token":return"token";case"asset":return"asset";default:return"unknown"}}function xp(s){switch(s){case"int":return"int";case"float":case"double":case"half":return"float";case"point":case"normal":case"vector":case"color":case"texCoord":return"float";default:return"unknown"}}function kp(s){if(s==="frame4d")return{kind:"matrix",dim:4,scalar:"float"};const e=/^matrix([234])d$/.exec(s);if(e)return{kind:"matrix",dim:parseInt(e[1],10),scalar:"float"};if(/^quat[fdh]$/.test(s))return{kind:"quat",dim:4,scalar:"float"};let t=/^(float|double|half|int)([234])$/.exec(s);if(t)return{kind:"vec",dim:parseInt(t[2],10),scalar:xp(t[1])};if(t=/^(point|normal|vector|color|texCoord)([234])[fdh]?$/.exec(s),t)return{kind:"vec",dim:parseInt(t[2],10),scalar:"float"};const i=Dp(s);return i!=="unknown"?{kind:"scalar",dim:1,scalar:i}:null}function or(s,e){if(s==null)return s;switch(e){case"bool":return s instanceof Js?s.value!==0:typeof s=="boolean"?s:typeof s=="number"?s!==0:s==="true"||s==="True"?!0:s==="false"||s==="False"?!1:s;case"int":if(s instanceof Js)return Math.trunc(s.value);if(typeof s=="number")return Math.trunc(s);if(typeof s=="string"){const t=Number(s);return Number.isFinite(t)?Math.trunc(t):s}return typeof s=="bigint"?Number(s):s;case"int64":if(s instanceof Js)try{return BigInt(s.raw)}catch{return BigInt(Math.trunc(s.value))}if(typeof s=="bigint")return s;if(typeof s=="number")return BigInt(Math.trunc(s));if(typeof s=="string")try{return BigInt(s)}catch{return s}return s;case"float":if(s instanceof Js)return s.value;if(typeof s=="number")return s;if(typeof s=="string"){const t=Number(s);return Number.isFinite(t)||s==="inf"||s==="-inf"||s==="nan"?t:s}return typeof s=="bigint"?Number(s):s;case"string":case"token":case"asset":return s;default:return s}}function br(s){if(!Array.isArray(s))return[s];const e=[];for(const t of s)Array.isArray(t)?e.push(...br(t)):e.push(t);return e}function Pn(s,e){if(s==null)return s;switch(e.kind){case"scalar":return or(s,e.scalar);case"vec":return br(s).map(i=>or(i,e.scalar));case"quat":return br(s).map(i=>or(i,"float"));case"matrix":{const t=br(s).map(n=>or(n,"float")),i=e.dim;if(t.length<i*i)return t;const r=[];for(let n=0;n<i;n++)r.push(t.slice(n*i,n*i+i));return r}default:return s}}function to(s,e){if(s==null||!e)return s;let t=e;(t.startsWith("uniform ")||t.startsWith("varying "))&&(t=t.slice(8));const i=t.endsWith("[]"),r=i?t.slice(0,-2):t,n=kp(r);return n?i?Array.isArray(s)?s.map(o=>Pn(o,n)):[Pn(s,n)]:Pn(s,n):tn(s)}const ne={Point:"Point",Normal:"Normal",Vector:"Vector",Color:"Color",Frame:"Frame",Group:"Group",TextureCoordinate:"TextureCoordinate"};function Cp(s){return{name:s.name,type:s.type,cppTypeName:s.cppTypeName??s.type,role:s.role??"",dimensions:s.dimensions??[],isArray:!1,isScalar:!0}}function Bp(s){const e={name:`${s.name}[]`,type:`${s.type}[]`,cppTypeName:`VtArray<${s.cppTypeName}>`,role:s.role,dimensions:s.dimensions,isArray:!0,isScalar:!1,scalarType:s};return{scalar:{...s,arrayType:e},array:e}}function O(s){const e=Cp(s);return s.noArrays?{scalar:e}:Bp(e)}const Ga=O({name:"bool",type:"bool"}),Ua=O({name:"uchar",type:"uchar",cppTypeName:"unsigned char"}),Wa=O({name:"int",type:"int"}),za=O({name:"uint",type:"uint",cppTypeName:"unsigned int"}),ja=O({name:"int64",type:"int64",cppTypeName:"int64_t"}),Ha=O({name:"uint64",type:"uint64",cppTypeName:"uint64_t"}),qa=O({name:"half",type:"half",cppTypeName:"GfHalf"}),Ka=O({name:"float",type:"float"}),Xa=O({name:"double",type:"double"}),Ya=O({name:"timecode",type:"timecode",cppTypeName:"SdfTimeCode"}),Za=O({name:"string",type:"string",cppTypeName:"std::string"}),Qa=O({name:"token",type:"token",cppTypeName:"TfToken"}),Ja=O({name:"asset",type:"asset",cppTypeName:"SdfAssetPath"}),Np=O({name:"opaque",type:"opaque",cppTypeName:"SdfOpaqueValue",noArrays:!0}),Ep=O({name:"group",type:"opaque",cppTypeName:"SdfOpaqueValue",role:ne.Group,noArrays:!0}),ec=O({name:"pathExpression",type:"pathExpression",cppTypeName:"SdfPathExpression"}),tc=O({name:"double2",type:"GfVec2d",dimensions:[2]}),sc=O({name:"double3",type:"GfVec3d",dimensions:[3]}),ic=O({name:"double4",type:"GfVec4d",dimensions:[4]}),rc=O({name:"float2",type:"GfVec2f",dimensions:[2]}),nc=O({name:"float3",type:"GfVec3f",dimensions:[3]}),oc=O({name:"float4",type:"GfVec4f",dimensions:[4]}),ac=O({name:"half2",type:"GfVec2h",dimensions:[2]}),cc=O({name:"half3",type:"GfVec3h",dimensions:[3]}),lc=O({name:"half4",type:"GfVec4h",dimensions:[4]}),uc=O({name:"int2",type:"GfVec2i",dimensions:[2]}),dc=O({name:"int3",type:"GfVec3i",dimensions:[3]}),hc=O({name:"int4",type:"GfVec4i",dimensions:[4]}),pc=O({name:"point3h",type:"GfVec3h",role:ne.Point,dimensions:[3]}),fc=O({name:"point3f",type:"GfVec3f",role:ne.Point,dimensions:[3]}),mc=O({name:"point3d",type:"GfVec3d",role:ne.Point,dimensions:[3]}),gc=O({name:"vector3h",type:"GfVec3h",role:ne.Vector,dimensions:[3]}),yc=O({name:"vector3f",type:"GfVec3f",role:ne.Vector,dimensions:[3]}),Sc=O({name:"vector3d",type:"GfVec3d",role:ne.Vector,dimensions:[3]}),bc=O({name:"normal3h",type:"GfVec3h",role:ne.Normal,dimensions:[3]}),Pc=O({name:"normal3f",type:"GfVec3f",role:ne.Normal,dimensions:[3]}),vc=O({name:"normal3d",type:"GfVec3d",role:ne.Normal,dimensions:[3]}),wc=O({name:"color3h",type:"GfVec3h",role:ne.Color,dimensions:[3]}),_c=O({name:"color3f",type:"GfVec3f",role:ne.Color,dimensions:[3]}),Ic=O({name:"color3d",type:"GfVec3d",role:ne.Color,dimensions:[3]}),Ac=O({name:"color4h",type:"GfVec4h",role:ne.Color,dimensions:[4]}),Tc=O({name:"color4f",type:"GfVec4f",role:ne.Color,dimensions:[4]}),Dc=O({name:"color4d",type:"GfVec4d",role:ne.Color,dimensions:[4]}),xc=O({name:"quath",type:"GfQuath",dimensions:[4]}),kc=O({name:"quatf",type:"GfQuatf",dimensions:[4]}),Cc=O({name:"quatd",type:"GfQuatd",dimensions:[4]}),Bc=O({name:"matrix2d",type:"GfMatrix2d",dimensions:[2,2]}),Nc=O({name:"matrix3d",type:"GfMatrix3d",dimensions:[3,3]}),Ec=O({name:"matrix4d",type:"GfMatrix4d",dimensions:[4,4]}),Oc=O({name:"frame4d",type:"GfMatrix4d",role:ne.Frame,dimensions:[4,4]}),Lc=O({name:"texCoord2f",type:"GfVec2f",role:ne.TextureCoordinate,dimensions:[2]}),Fc=O({name:"texCoord2d",type:"GfVec2d",role:ne.TextureCoordinate,dimensions:[2]}),Mc=O({name:"texCoord2h",type:"GfVec2h",role:ne.TextureCoordinate,dimensions:[2]}),$c=O({name:"texCoord3f",type:"GfVec3f",role:ne.TextureCoordinate,dimensions:[3]}),Rc=O({name:"texCoord3d",type:"GfVec3d",role:ne.TextureCoordinate,dimensions:[3]}),Vc=O({name:"texCoord3h",type:"GfVec3h",role:ne.TextureCoordinate,dimensions:[3]}),Op={Bool:Ga.scalar,UChar:Ua.scalar,Int:Wa.scalar,UInt:za.scalar,Int64:ja.scalar,UInt64:Ha.scalar,Half:qa.scalar,Float:Ka.scalar,Double:Xa.scalar,TimeCode:Ya.scalar,String:Za.scalar,Token:Qa.scalar,Asset:Ja.scalar,Int2:uc.scalar,Int3:dc.scalar,Int4:hc.scalar,Half2:ac.scalar,Half3:cc.scalar,Half4:lc.scalar,Float2:rc.scalar,Float3:nc.scalar,Float4:oc.scalar,Double2:tc.scalar,Double3:sc.scalar,Double4:ic.scalar,Point3h:pc.scalar,Point3f:fc.scalar,Point3d:mc.scalar,Vector3h:gc.scalar,Vector3f:yc.scalar,Vector3d:Sc.scalar,Normal3h:bc.scalar,Normal3f:Pc.scalar,Normal3d:vc.scalar,Color3h:wc.scalar,Color3f:_c.scalar,Color3d:Ic.scalar,Color4h:Ac.scalar,Color4f:Tc.scalar,Color4d:Dc.scalar,Quath:xc.scalar,Quatf:kc.scalar,Quatd:Cc.scalar,Matrix2d:Bc.scalar,Matrix3d:Nc.scalar,Matrix4d:Ec.scalar,Frame4d:Oc.scalar,TexCoord2h:Mc.scalar,TexCoord2f:Lc.scalar,TexCoord2d:Fc.scalar,TexCoord3h:Vc.scalar,TexCoord3f:$c.scalar,TexCoord3d:Rc.scalar,Opaque:Np.scalar,Group:Ep.scalar,PathExpression:ec.scalar,BoolArray:Ga.array,UCharArray:Ua.array,IntArray:Wa.array,UIntArray:za.array,Int64Array:ja.array,UInt64Array:Ha.array,HalfArray:qa.array,FloatArray:Ka.array,DoubleArray:Xa.array,TimeCodeArray:Ya.array,StringArray:Za.array,TokenArray:Qa.array,AssetArray:Ja.array,Int2Array:uc.array,Int3Array:dc.array,Int4Array:hc.array,Half2Array:ac.array,Half3Array:cc.array,Half4Array:lc.array,Float2Array:rc.array,Float3Array:nc.array,Float4Array:oc.array,Double2Array:tc.array,Double3Array:sc.array,Double4Array:ic.array,Point3hArray:pc.array,Point3fArray:fc.array,Point3dArray:mc.array,Vector3hArray:gc.array,Vector3fArray:yc.array,Vector3dArray:Sc.array,Normal3hArray:bc.array,Normal3fArray:Pc.array,Normal3dArray:vc.array,Color3hArray:wc.array,Color3fArray:_c.array,Color3dArray:Ic.array,Color4hArray:Ac.array,Color4fArray:Tc.array,Color4dArray:Dc.array,QuathArray:xc.array,QuatfArray:kc.array,QuatdArray:Cc.array,Matrix2dArray:Bc.array,Matrix3dArray:Nc.array,Matrix4dArray:Ec.array,Frame4dArray:Oc.array,TexCoord2hArray:Mc.array,TexCoord2fArray:Lc.array,TexCoord2dArray:Fc.array,TexCoord3hArray:Vc.array,TexCoord3fArray:$c.array,TexCoord3dArray:Rc.array,PathExpressionArray:ec.array},Lp=new Map(Object.values(Op).map(s=>[s.name,s]));function Fp(s){return Lp.get(s)}function Xu(s={}){return s.equals?s.equals:s.key?(e,t)=>Object.is(s.key(e),s.key(t)):Object.is}function Pr(s,e,t){return s.some(i=>t(i,e))}function vr(s,e){const t=[];for(const i of s)Pr(t,i,e)||t.push(i);return t}function Mp(s){return"isExplicit"in s||"explicitItems"in s||"deletedItems"in s||"prependedItems"in s||"appendedItems"in s||"orderedItems"in s}function Ft(s){if(s==null)return null;if(Array.isArray(s))return{isExplicit:!0,explicitItems:[...s],deletedItems:[],prependedItems:[],appendedItems:[],orderedItems:[]};if(typeof s!="object")return{isExplicit:!0,explicitItems:[s],deletedItems:[],prependedItems:[],appendedItems:[],orderedItems:[]};if(!Mp(s))return null;const e=s;return{isExplicit:e.isExplicit??e.explicitItems!==void 0,explicitItems:[...e.explicitItems??[]],deletedItems:[...e.deletedItems??[]],prependedItems:[...e.prependedItems??[]],appendedItems:[...e.appendedItems??[]],orderedItems:[...e.orderedItems??[]]}}function Yu(s,e,t={}){const i=Xu(t),r=vr(e,i);if(r.length===0||s.length===0)return[...s];const n=[...s],o=[];for(const a of r){const c=n.findIndex(u=>i(u,a));if(c<0)continue;let l=c+1;for(;l<n.length&&!r.some(u=>i(u,n[l]));)l++;o.push(...n.splice(c,l-c))}return[...n,...o]}function Ps(s,e,t={}){const i=Xu(t),r=Ft(e);if(r.isExplicit)return vr(r.explicitItems,i);let n=s.filter(c=>!Pr(r.deletedItems,c,i));const o=vr(r.prependedItems,i),a=vr(r.appendedItems,i);return n=[...o,...n.filter(c=>!Pr(o,c,i))],n=[...n.filter(c=>!Pr(a,c,i)),...a],Yu(n,r.orderedItems,t)}function Zu(s,e={}){let t=[];for(let i=s.length-1;i>=0;i--)t=Ps(t,s[i],e);return t}function vs(s){return s.length>2&&s[0]==="`"&&s[s.length-1]==="`"}function Ko(s){if(s===null)return!0;const e=typeof s;return e==="string"||e==="boolean"?!0:e==="number"?Number.isInteger(s):Array.isArray(s)?s.every(Ko):!1}function Qu(s){return s==null?"None":Array.isArray(s)?"list":typeof s}const Xo=s=>({value:s,errors:[]}),so=()=>({value:void 0,errors:[]}),oi=s=>({value:void 0,errors:s});class $p{constructor(e){this.variables=e}requested=new Set;stack=[];getVariable(e){if(this.stack.includes(e)){const i=this.stack.map(r=>`'${r}'`).join(", ");return[oi([`Encountered circular variable substitutions: [${i}, '${e}']`]),!0]}if(this.requested.add(e),!Object.prototype.hasOwnProperty.call(this.variables,e))return[so(),!1];const t=this.variables[e];if(!Ko(t))return[oi([`Variable '${e}' has unsupported type ${Qu(t)}`]),!0];if(typeof t=="string"&&vs(t)){const i=ed(t);if(i.node){this.stack.push(e);try{return[i.node.evaluate(this),!0]}finally{this.stack.pop()}}else return i.errors.length?[oi(i.errors.map(r=>`${r} (in variable '${e}')`)),!0]:[so(),!0]}return[Xo(t),!0]}}class Rp{constructor(e){this.parts=e}evaluate(e){let t="";for(const i of this.parts){if(!i.isVariable){t+=i.content;continue}const r=i.content,[n,o]=e.getVariable(r);if(!o)t+=`\${${r}}`;else if(n.value!==void 0&&n.value!==null)if(typeof n.value=="string")t+=n.value;else return oi([`String value required for substituting variable '${r}', got ${Qu(n.value)}.`]);else if(n.errors.length)return oi(n.errors)}return Xo(t)}}class Vp{constructor(e){this.varName=e}evaluate(e){const[t,i]=e.getVariable(this.varName);return i?t:oi([`No value for variable '${this.varName}'`])}}class vn{constructor(e){this.value=e}evaluate(){return Xo(this.value)}}class Gp{evaluate(){return so()}}function Ju(s,e){let t=e,i="";if(t>=s.length||!/[A-Za-z_]/.test(s[t]))return null;for(;t<s.length&&/[A-Za-z0-9_]/.test(s[t]);)i+=s[t++];return s[t]!=="}"?null:{name:i,next:t+1}}function Up(s,e,t){const i=[];let r="",n=t;const o=()=>{r&&(i.push({isVariable:!1,content:r}),r="")};for(;n<s.length;){const a=s[n];if(a===e)return o(),{node:new Rp(i),errors:[],next:n+1};if(a==="\\"){const c=s[n+1];if(c==="`"||c==="$"||c==="\\"||c===e){r+=c,n+=2;continue}r+=a,n+=1;continue}if(a==="$"&&s[n+1]==="{"){const c=Ju(s,n+2);if(!c)return{node:null,errors:[s.indexOf("}",n+2)<0?`Missing ending '}' at character ${s.length}`:"Variables must be a C identifier"],next:n};o(),i.push({isVariable:!0,content:c.name}),n=c.next;continue}r+=a,n+=1}return{node:null,errors:[`Missing ending ${e}`],next:n}}function Wp(s){const e=s.trim();if(e.length===0)return{node:null,errors:["Empty expression"]};const t=e[0];if(t==='"'||t==="'"){const i=Up(e,t,1);return i.node?i.next!==e.length?{node:null,errors:["Invalid string contents"]}:{node:i.node,errors:[]}:{node:null,errors:i.errors}}if(t==="$"&&e[1]==="{"){const i=Ju(e,2);return!i||i.next!==e.length?{node:null,errors:["Variables must be a C identifier"]}:{node:new Vp(i.name),errors:[]}}return e==="None"||e==="none"?{node:new Gp,errors:[]}:e==="True"||e==="true"?{node:new vn(!0),errors:[]}:e==="False"||e==="false"?{node:new vn(!1),errors:[]}:/^-?[0-9]+$/.test(e)?{node:new vn(Number(e)),errors:[]}:{node:null,errors:[`Unsupported or malformed expression: \`${s}\``]}}function ed(s){return vs(s)?Wp(s.slice(1,-1)):{node:null,errors:["Expressions must begin with '`'"]}}class zp{constructor(e){this.expr=e;const t=ed(e);this.node=t.node,this.parseErrors=t.errors}node;parseErrors;static isExpression(e){return vs(e)}static isValidVariableType(e){return Ko(e)}isValid(){return this.node!==null}getString(){return this.expr}getErrors(){return[...this.parseErrors]}evaluate(e){if(!this.node)return{value:void 0,errors:[...this.parseErrors],usedVariables:[]};const t=new $p(e),i=this.node.evaluate(t);return{value:i.errors.length?void 0:i.value,errors:i.errors,usedVariables:[...t.requested]}}}function Qi(s,e){return new zp(s).evaluate(e)}const ds={offset:0,scale:1};function qe(s,e){return e*s.scale+s.offset}function Mt(s,e){return{offset:s.offset+s.scale*e.offset,scale:s.scale*e.scale}}function Yo(s){return s.scale===0?null:{offset:-s.offset/s.scale,scale:1/s.scale}}function wn(s){return s.offset===0&&s.scale===1}function jp(s,e){return s.offset===e.offset&&s.scale===e.scale}const Hp=67324752,qp=33639248,Kp=101010256;class hs{constructor(e,t){this._bytes=e,this._entries=t}static isZip(e){return e.length>=4&&e[0]===80&&e[1]===75&&e[2]===3&&e[3]===4}static fromBytes(e){const t=new DataView(e.buffer,e.byteOffset,e.byteLength);let i=-1;for(let l=e.length-22;l>=0&&l>=e.length-22-65535;l--)if(t.getUint32(l,!0)===Kp){i=l;break}if(i<0)throw new Error("UsdZipFile: end-of-central-directory record not found");const r=t.getUint16(i+10,!0),n=t.getUint32(i+16,!0),o=new Map;let a=n;const c=new TextDecoder;for(let l=0;l<r;l++){if(t.getUint32(a,!0)!==qp)throw new Error("UsdZipFile: malformed central directory");const u=t.getUint16(a+10,!0),d=t.getUint32(a+20,!0),h=t.getUint32(a+24,!0),m=t.getUint16(a+28,!0),p=t.getUint16(a+30,!0),y=t.getUint16(a+32,!0),f=t.getUint32(a+42,!0),g=c.decode(e.subarray(a+46,a+46+m));if(t.getUint32(f,!0)!==Hp)throw new Error(`UsdZipFile: bad local header for '${g}'`);const S=t.getUint16(f+26,!0),b=t.getUint16(f+28,!0),P=f+30+S+b;o.set(g,{name:g,compressionMethod:u,compressedSize:d,uncompressedSize:h,dataOffset:P}),a+=46+m+p+y}return new hs(e,o)}get entryNames(){return[...this._entries.keys()]}has(e){return this._entries.has(e)}getEntry(e){return this._entries.get(e)}getFileNames(){return[...this._entries.keys()]}defaultLayerName(){for(const e of this._entries.keys())if(/\.(usd|usda|usdc)$/i.test(e))return e}async extract(e){const t=this._entries.get(e);if(!t)throw new Error(`UsdZipFile: no entry '${e}'`);const i=this._bytes.subarray(t.dataOffset,t.dataOffset+t.compressedSize);if(t.compressionMethod===0)return i;if(t.compressionMethod===8){if(typeof DecompressionStream>"u")throw new Error(`UsdZipFile: '${e}' is deflate-compressed and DecompressionStream is unavailable`);const r=new Blob([i]).stream().pipeThrough(new DecompressionStream("deflate-raw"));return new Uint8Array(await new Response(r).arrayBuffer())}throw new Error(`UsdZipFile: unsupported compression method ${t.compressionMethod} for '${e}'`)}}(()=>{const s=new Uint32Array(256);for(let e=0;e<256;e++){let t=e;for(let i=0;i<8;i++)t=t&1?3988292384^t>>>1:t>>>1;s[e]=t>>>0}return s})();class Xp{_layer=null;isDirty(){return this._IsDirty()}markCurrentStateAsClean(){this._MarkCurrentStateAsClean()}markCurrentStateAsDirty(){this._MarkCurrentStateAsDirty()}_setLayer(e){this._layer=e,this._OnSetLayer(e)}setField(e,t,i){this._OnSetField(e,t,i)}setTimeSample(e,t,i){this._OnSetTimeSample(e,t,i)}createSpec(e,t){this._OnCreateSpec(e,t)}deleteSpec(e){this._OnDeleteSpec(e)}pushChild(e,t,i){this._OnPushChild(e,t,i)}popChild(e,t,i){this._OnPopChild(e,t,i)}_GetLayer(){return this._layer}_IsDirty(){return!1}_MarkCurrentStateAsClean(){}_MarkCurrentStateAsDirty(){}_OnSetLayer(e){}_OnSetField(e,t,i){}_OnSetTimeSample(e,t,i){}_OnCreateSpec(e,t){}_OnDeleteSpec(e){}_OnPushChild(e,t,i){}_OnPopChild(e,t,i){}}class Yp extends Xp{_dirty=!1;_IsDirty(){return this._dirty}_MarkCurrentStateAsClean(){this._dirty=!1}_MarkCurrentStateAsDirty(){this._dirty=!0}_OnSetField(){this._dirty=!0}_OnSetTimeSample(){this._dirty=!0}_OnCreateSpec(){this._dirty=!0}_OnDeleteSpec(){this._dirty=!0}_OnPushChild(){this._dirty=!0}_OnPopChild(){this._dirty=!0}}function Gt(s){return s!==null&&typeof s=="object"&&!Array.isArray(s)&&Object.getPrototypeOf(s)===Object.prototype}function _n(s){return s.split(":").filter(Boolean)}function Fi(s){const e=Object.fromEntries(Object.entries(s).map(([i,r])=>[i,Array.isArray(r)?r.map(ms):Gt(r)?Fi(r):r]));hp(s,e);const t=Object.getOwnPropertyDescriptor(s,"_sdfAddedItems")?.value;return Array.isArray(t)&&Object.defineProperty(e,"_sdfAddedItems",{value:t.map(ms),configurable:!0,enumerable:!1,writable:!0}),e}function ms(s){return Array.isArray(s)?s.map(ms):Gt(s)?Fi(s):s instanceof Map?new Map([...s].map(([e,t])=>[e,ms(t)])):s instanceof Set?new Set([...s].map(ms)):s}function Mi(s,e){if(Object.is(s,e))return!0;if(Array.isArray(s)&&Array.isArray(e))return s.length===e.length&&s.every((t,i)=>Mi(t,e[i]));if(s instanceof Map&&e instanceof Map)return s.size===e.size&&[...s].every(([t,i])=>e.has(t)&&Mi(i,e.get(t)));if(s instanceof Set&&e instanceof Set)return s.size===e.size&&[...s].every(t=>e.has(t));if(s!==null&&e!==null&&typeof s=="object"&&typeof e=="object"){if(Object.getPrototypeOf(s)!==Object.getPrototypeOf(e))return!1;const t=Object.keys(s),i=Object.keys(e);return t.length===i.length&&t.every(r=>Object.prototype.hasOwnProperty.call(e,r)&&Mi(s[r],e[r]))}return!1}class Zp{_visitDepth=0;isDetached(){return!this.streamsData()}isEmpty(){let e=!0;return this.visitSpecs({visitSpec:()=>(e=!1,!1),done:()=>{}}),e}copyFrom(e){this._requireMutable(),e!==this&&e.visitSpecs({visitSpec:(t,i)=>{this.createSpec(i,t.getSpecType(i));for(const r of t.list(i))this.set(i,r,ms(t.get(i,r))),this.setValueTypeName(i,r,t.getValueTypeName(i,r));return!0},done:()=>{}})}equals(e){const t=[],i=[];if(this.visitSpecs({visitSpec:(n,o)=>(t.push(o),!0),done:()=>{}}),e.visitSpecs({visitSpec:(n,o)=>(i.push(o),!0),done:()=>{}}),t.length!==i.length)return!1;const r=new Set(i);for(const n of t){if(!r.has(n)||this.getSpecType(n)!==e.getSpecType(n))return!1;const o=this.list(n),a=e.list(n);if(o.length!==a.length)return!1;const c=new Set(a);if(!o.every(l=>c.has(l)&&this.getValueTypeName(n,l)===e.getValueTypeName(n,l)&&Mi(this.get(n,l),e.get(n,l))))return!1}return!0}createSpec(e,t){this._requireMutable(),this._createSpec(e,t)}eraseSpec(e){this._requireMutable(),this._eraseSpec(e)}moveSpec(e,t){this._requireMutable(),this._moveSpec(e,t)}hasSpecAndField(e,t){const i=this.getSpecType(e),r=i!=="unknown"&&this.has(e,t);return r?{specType:i,hasField:r,value:this.get(e,t)}:{specType:i,hasField:r}}set(e,t,i){this._requireMutable(),i===void 0?this._erase(e,t):this._set(e,t,i)}erase(e,t){this._requireMutable(),this._erase(e,t)}visitSpecs(e){this._visitDepth++;try{this._visitSpecs(e),e.done(this)}finally{this._visitDepth--}}hasDictKey(e,t,i){return this.getDictValueByKey(e,t,i)!==void 0}getDictValueByKey(e,t,i){let r=this.get(e,t);for(const n of _n(i)){if(!Gt(r)||!Object.prototype.hasOwnProperty.call(r,n))return;r=r[n]}return r}setDictValueByKey(e,t,i,r){if(r===void 0){this.eraseDictValueByKey(e,t,i);return}const n=this.get(e,t),o=Gt(n)?Fi(n):{},a=_n(i);if(a.length===0)return;let c=o;for(const l of a.slice(0,-1)){const u=c[l];c=c[l]=Gt(u)?Fi(u):{}}c[a.at(-1)]=r,this.set(e,t,o)}eraseDictValueByKey(e,t,i){const r=this.get(e,t);if(!Gt(r))return;const n=Fi(r),o=_n(i);if(o.length===0)return;const a=[];let c=n;for(const l of o.slice(0,-1)){const u=c[l];if(!Gt(u))return;a.push([c,l]),c=u}if(Object.prototype.hasOwnProperty.call(c,o.at(-1))){delete c[o.at(-1)];for(let l=a.length-1;l>=0;--l){const[u,d]=a[l],h=u[d];Gt(h)&&Object.keys(h).length===0&&delete u[d]}Object.keys(n).length===0?this.erase(e,t):this.set(e,t,n)}}listDictKeys(e,t,i){const r=i?this.getDictValueByKey(e,t,i):this.get(e,t);return Gt(r)?Object.keys(r):[]}getPreviousTimeSampleForPath(e,t){const i=this.getBracketingTimeSamplesForPath(e,t);if(!i||t<i[0])return;if(t!==i[0])return i[0];const r=this.getBracketingTimeSamplesForPath(e,Qp(t));return!r||r[0]===t?void 0:r[0]}setTimeSample(e,t,i){this._requireMutable(),i===void 0?this._eraseTimeSample(e,t):this._setTimeSample(e,t,i)}eraseTimeSample(e,t){this._requireMutable(),this._eraseTimeSample(e,t)}_requireMutable(){if(this._visitDepth!==0)throw new Error("SdfAbstractData may not be modified during spec visitation")}}function Qp(s){if(Number.isNaN(s)||s===-1/0)return s;if(s===0)return-Number.MIN_VALUE;const e=new ArrayBuffer(8),t=new DataView(e);t.setFloat64(0,s);let i=t.getBigUint64(0);return i=s>0?i-1n:i+1n,t.setBigUint64(0,i),t.getFloat64(0)}function ar(s){return(s instanceof Map?[...s.entries()]:Array.isArray(s)?s.filter(t=>Array.isArray(t)&&t.length>=2):s!==null&&typeof s=="object"?Object.entries(s):[]).map(([t,i])=>[Number(t),i]).filter(([t])=>Number.isFinite(t)).sort(([t],[i])=>t-i)}function Gc(s,e){if(s.length===0)return;if(e<=s[0])return[s[0],s[0]];const t=s.at(-1);if(e>=t)return[t,t];const i=s.findIndex(n=>n>=e),r=s[i];return r===e?[r,r]:[s[i-1],r]}class Ci extends Zp{_data=new Map;streamsData(){return!1}isDetached(){return!0}hasSpec(e){return this._data.has(e)}getSpecType(e){return this._data.get(e)?.specType??"unknown"}has(e,t){return this._data.get(e)?.fields.has(t)??!1}get(e,t){return ms(this._data.get(e)?.fields.get(t))}getValueTypeName(e,t){return this._data.get(e)?.valueTypeNames.get(t)}setValueTypeName(e,t,i){const r=this._data.get(e);r&&(i===void 0?r.valueTypeNames.delete(t):r.valueTypeNames.set(t,i))}list(e){return[...this._data.get(e)?.fields.keys()??[]]}listAllTimeSamples(){const e=new Set;for(const t of this._data.keys())for(const i of this.listTimeSamplesForPath(t))e.add(i);return[...e].sort((t,i)=>t-i)}listTimeSamplesForPath(e){return ar(this.get(e,"timeSamples")).map(([t])=>t)}getBracketingTimeSamples(e){return Gc(this.listAllTimeSamples(),e)}getNumTimeSamplesForPath(e){return this.listTimeSamplesForPath(e).length}getBracketingTimeSamplesForPath(e,t){return Gc(this.listTimeSamplesForPath(e),t)}getPreviousTimeSampleForPath(e,t){const i=this.listTimeSamplesForPath(e);for(let r=i.length-1;r>=0;--r)if(i[r]<t)return i[r]}queryTimeSample(e,t){return ar(this.get(e,"timeSamples")).find(([i])=>i===t)?.[1]}_createSpec(e,t){if(t==="unknown")return;const i=this._data.get(e);i?i.specType=t:this._data.set(e,{specType:t,fields:new Map,valueTypeNames:new Map})}_eraseSpec(e){this._data.delete(e)}_moveSpec(e,t){const i=this._data.get(e);!i||this._data.has(t)||(this._data.set(t,i),this._data.delete(e))}_set(e,t,i){const r=this._data.get(e);r?.fields.set(t,ms(i)),r?.valueTypeNames.delete(t)}_erase(e,t){const i=this._data.get(e);i?.fields.delete(t),i?.valueTypeNames.delete(t)}_visitSpecs(e){for(const t of this._data.keys())if(!e.visitSpec(this,t))break}_setTimeSample(e,t,i){if(!this._data.has(e))return;const r=ar(this.get(e,"timeSamples")).filter(([n])=>n!==t);r.push([t,i]),r.sort(([n],[o])=>n-o),this._set(e,"timeSamples",r)}_eraseTimeSample(e,t){const i=ar(this.get(e,"timeSamples")).filter(([r])=>r!==t);i.length===0?this._erase(e,"timeSamples"):this._set(e,"timeSamples",i)}}const Jp="/",In=".",ef="[",tf="]",Fr="/",Mr=".";class st{kind;parent;isAbsolute;elementCount;containsVariantSelection;name;variantSet;variant;targetPath;constructor(e){this.kind=e.kind,this.parent=e.parent,this.isAbsolute=e.isAbsolute,this.elementCount=e.parent?e.parent.elementCount+1:0,this.containsVariantSelection=(e.parent?.containsVariantSelection??!1)||e.kind==="variant",this.name=e.name??"",this.variantSet=e.variantSet??"",this.variant=e.variant??"",this.targetPath=e.targetPath??null}element(){switch(this.kind){case"root":return this.isAbsolute?Fr:Mr;case"prim":{const e=this.parent;return(e!==null&&(e.kind==="variant"||e.kind==="root"&&!e.isAbsolute)?"":Jp)+this.name}case"variant":return`{${this.variantSet}=${this.variant}}`;case"property":return In+this.name;case"relationalAttribute":return In+this.name;case"target":return ef+this.targetPath.pathString+tf;case"expression":return In+"expression"}}}const wr=new st({kind:"root",parent:null,isAbsolute:!0}),io=new st({kind:"root",parent:null,isAbsolute:!1});class N{_node;_str;constructor(e){this._node=e}static emptyPath=new N(null);static absoluteRootPath=new N(wr);static reflexiveRelativePath=new N(io);static fromString(e){return td(e)??N.emptyPath}static _wrap(e){return e===null?N.emptyPath:e===wr?N.absoluteRootPath:e===io?N.reflexiveRelativePath:new N(e)}isEmpty(){return this._node===null}isAbsolutePath(){return this._node?.isAbsolute??!1}isAbsoluteRootPath(){return this._node===wr}get pathElementCount(){return this._node?.elementCount??0}isPrimPath(){const e=this._node;return e!==null&&(e.kind==="prim"||e.kind==="root"&&!e.isAbsolute)}isPrimVariantSelectionPath(){return this._node?.kind==="variant"}isPrimOrPrimVariantSelectionPath(){const e=this._node;return e!==null&&(e.kind==="prim"||e.kind==="variant"||e.kind==="root"&&e.isAbsolute)}isRootPrimPath(){const e=this._node;return e!==null&&e.kind==="prim"&&e.isAbsolute&&e.elementCount===1}isPropertyPath(){return this._node?.kind==="property"||this._node?.kind==="relationalAttribute"}isPrimPropertyPath(){return this._node?.kind==="property"}isTargetPath(){return this._node?.kind==="target"}containsPrimVariantSelection(){return this._node?.containsVariantSelection??!1}get name(){const e=this._node;return e===null?"":e.kind==="root"?e.isAbsolute?Fr:Mr:e.kind==="variant"?e.variant:e.name}getVariantSelection(){const e=this._node;return e&&e.kind==="variant"?[e.variantSet,e.variant]:["",""]}getTargetPath(){const e=this._node;return e&&e.kind==="target"?e.targetPath:N.emptyPath}getParentPath(){return this._node===null?N.emptyPath:N._wrap(this._node.parent)}reapplyVariantSelectionsOnto(e){if(e.isEmpty()||!this.containsPrimVariantSelection())return e;const t=new Map;for(let o=this;o._node!==null&&!o.isAbsoluteRootPath();o=o.getParentPath())o.isPrimVariantSelectionPath()&&t.set(o.getParentPath().stripAllVariantSelections().pathString,o.getVariantSelection());const i=e.stripAllVariantSelections(),r=[];for(let o=i;o._node!==null&&!o.isAbsoluteRootPath();o=o.getParentPath())r.unshift(o.name);let n=i.isAbsolutePath()?N.absoluteRootPath:N.reflexiveRelativePath;for(const o of r){n=n.appendChild(o);const a=t.get(n.stripAllVariantSelections().pathString);a!==void 0&&(n=n.appendVariantSelection(a[0],a[1]))}return n}getPrimPath(){let e=this._node;for(;e!==null&&e.kind!=="prim"&&e.kind!=="root";)e=e.parent;return e===null||e.kind==="root"?N.emptyPath:N._wrap(e)}stripAllVariantSelections(){if(this._node===null||!this._node.containsVariantSelection)return this;const e=[];for(let i=this._node;i!==null;i=i.parent)i.kind!=="variant"&&e.push(i);e.reverse();let t=null;for(const i of e)t=i.kind==="root"?i:Uc(i,t);return N._wrap(t)}appendChild(e){const t=this._node;if(t===null)throw new Error("cannot append a child to the empty path");return N._wrap(new st({kind:"prim",parent:t,isAbsolute:t.isAbsolute,name:e}))}appendVariantSelection(e,t){const i=this._node;if(i===null)throw new Error("cannot append a variant selection to the empty path");return N._wrap(new st({kind:"variant",parent:i,isAbsolute:i.isAbsolute,variantSet:e,variant:t}))}appendProperty(e){const t=this._node;if(t===null)throw new Error("cannot append a property to the empty path");return N._wrap(new st({kind:"property",parent:t,isAbsolute:t.isAbsolute,name:e}))}appendTarget(e){const t=this._node;if(t===null)throw new Error("cannot append a target to the empty path");return N._wrap(new st({kind:"target",parent:t,isAbsolute:t.isAbsolute,targetPath:e}))}hasPrefix(e){if(e.isEmpty()||this.isEmpty())return!1;const t=e.pathElementCount;let i=this._node;for(;i!==null&&i.elementCount>t;)i=i.parent;return i!==null&&N._wrap(i).pathString===e.pathString}replacePrefix(e,t){if(this.isEmpty()||e.isEmpty()||t.isEmpty())return this;if(!this.hasPrefix(e))return this;if(this.pathString===e.pathString)return t;const i=e.pathElementCount,r=[];for(let o=this._node;o!==null&&o.elementCount>i;o=o.parent)r.push(o);r.reverse();let n=t._node;for(const o of r)n=Uc(o,n);return N._wrap(n)}getCommonPrefix(e){if(this.isEmpty()||e.isEmpty())return N.emptyPath;let t=this._node,i=e._node;for(;t!==null&&i!==null&&t.elementCount>i.elementCount;)t=t.parent;for(;t!==null&&i!==null&&i.elementCount>t.elementCount;)i=i.parent;for(;t!==null&&i!==null&&N._wrap(t).pathString!==N._wrap(i).pathString;)t=t.parent,i=i.parent;return N._wrap(t)}get pathString(){if(this._str!==void 0)return this._str;const e=this._node;if(e===null)return this._str="";if(e.parent===null)return this._str=e.isAbsolute?Fr:Mr;const t=[];for(let i=e;i!==null&&i.parent!==null;i=i.parent)t.push(i.element());return t.reverse(),this._str=t.join("")}toString(){return this.pathString}equals(e){return this.pathString===e.pathString}}function Uc(s,e){return new st({kind:s.kind,parent:e,isAbsolute:e?.isAbsolute??s.isAbsolute,name:s.name,variantSet:s.variantSet,variant:s.variant,targetPath:s.targetPath})}function td(s){if(s==="")return N.emptyPath;if(s===Fr)return N.absoluteRootPath;if(s===Mr)return N.reflexiveRelativePath;const e=s[0]==="/";let t=e?wr:io,i=0;const r=o=>/[A-Za-z0-9_]/.test(o),n=o=>{const a=i;for(;i<s.length&&o(s[i]);)i++;return s.slice(a,i)};for(;i<s.length;){const o=s[i];if(o==="/"){i++;const a=n(r);if(a==="")return null;t=new st({kind:"prim",parent:t,isAbsolute:e,name:a})}else if(o==="{"){const a=s.indexOf("}",i),c=s.indexOf("=",i);if(a<0||c<0||c>a)return null;t=new st({kind:"variant",parent:t,isAbsolute:e,variantSet:s.slice(i+1,c),variant:s.slice(c+1,a)}),i=a+1}else if(o==="."){i++;const a=n(l=>r(l)||l===":");if(a===""||t.kind==="property"||t.kind==="relationalAttribute"||t.kind==="expression")return null;const c=t.kind==="target"?"relationalAttribute":"property";t=new st({kind:c,parent:t,isAbsolute:e,name:a})}else if(o==="["){const a=s.lastIndexOf("]");if(a<0)return null;const c=td(s.slice(i+1,a));if(c===null||c.isEmpty())return null;t=new st({kind:"target",parent:t,isAbsolute:e,targetPath:c}),i=a+1}else if(r(o))t=new st({kind:"prim",parent:t,isAbsolute:e,name:n(r)});else return null}return N._wrap(t)}class sf{constructor(e,t){this._layer=e,this._path=t}getLayer(){return this._layer}getPath(){return N.fromString(this._path)}getSpecType(){return this._layer.getSpecType(this._path)}isDormant(){return!this._layer.hasSpec(this._path)}listInfoKeys(){return this._layer.getFieldNames(this._path)}hasInfo(e){return this._layer.getFieldNames(this._path).includes(e)}getInfo(e){return this._layer.getField(this._path,e)}setInfo(e,t){this._layer.setField(this._path,e,t)}clearInfo(e){this._layer.eraseField(this._path,e)}equals(e){return this._layer===e._layer&&this._path===e._path}}class rf{#s=new Map;AddToCollection(e,t){if(t.length===0)return;const i=this.#s.get(e);i?i.push(...t):this.#s.set(e,[...t])}Iterate(e){this.#t(e,!1)}ReverseIterate(e){this.#t(e,!0)}GetThreadIds(){return[...this.#s.keys()]}GetEvents(e){return this.#s.get(e)??[]}get empty(){return this.#s.size===0}#t(e,t){e.OnBeginCollection();const i=[...this.#s];t&&i.reverse();for(const[r,n]of i){e.OnBeginThread(r);const o=t?[...n].reverse():n;for(const a of o)e.AcceptsCategory(a.category)&&e.OnEvent(r,a.key,a);e.OnEndThread(r)}e.OnEndCollection()}}var xe=(s=>(s.Unknown="Unknown",s.Begin="Begin",s.End="End",s.Timespan="Timespan",s.Marker="Marker",s.CounterDelta="CounterDelta",s.CounterValue="CounterValue",s.ScopeData="ScopeData",s))(xe||{});class Re{key;type;time;startTime;laneId;eventId;parentEventId;parentIsExplicit;value;data;category;constructor(e){this.key=e.key,this.type=e.type,this.time=e.time,this.startTime=e.startTime,this.laneId=e.laneId,this.eventId=e.eventId,this.parentEventId=e.parentEventId,this.parentIsExplicit=e.parentIsExplicit??!1,this.value=e.value,this.data=e.data,this.category=e.category??0}GetKey(){return this.key}GetTimeStamp(){return this.time}GetStartTimeStamp(){return this.startTime??this.time}GetEndTimeStamp(){return this.time}GetTimeSpanStamps(){return[this.GetStartTimeStamp(),this.GetEndTimeStamp()]}GetCounterValue(){return this.value??0}GetCategory(){return this.category}GetType(){return this.type}}const ve="Main Thread";function Ve(){return globalThis.performance?.now()??Date.now()}class at{static#s;#t=!1;#i=1;#r=new Map;#n=new Map;constructor(){}static GetInstance(){return at.#s??=new at}get enabled(){return this.#t}set enabled(e){this.SetEnabled(e)}static IsEnabled(){return at.GetInstance().#t}SetEnabled(e){this.#t=e}GetLabel(){return"TraceRegistry global collector"}BeginEvent(e,t=0){return this.#t?this._BeginEvent(e,ve,void 0,Ve(),!0,t).time:0}EndEvent(e){return this.#t?this._EndEvent(e,ve,void 0,Ve()):0}BeginEventAtTime(e,t,i=0){this.#t&&this._BeginEvent(e,ve,void 0,t,!0,i)}EndEventAtTime(e,t){this.#t&&this._EndEvent(e,ve,void 0,t)}Scope(e,t,i,r=0){if(!this.#t)return;const n=this.#i++;this.#e(ve,new Re({key:e,type:xe.Timespan,time:i,startTime:t,laneId:ve,eventId:n,parentIsExplicit:!1,category:r}))}MarkerEvent(e,t=0){if(!this.#t)return 0;const i=Ve();return this.#e(ve,new Re({key:e,type:xe.Marker,time:i,laneId:ve,category:t})),i}MarkerEventAtTime(e,t,i=0){this.#t&&this.#e(ve,new Re({key:e,type:xe.Marker,time:t,laneId:ve,category:i}))}RecordCounterDelta(e,t,i=0){this.#t&&this.#e(ve,new Re({key:e,type:xe.CounterDelta,time:Ve(),laneId:ve,value:t,category:i}))}RecordCounterValue(e,t,i=0){this.#t&&this.#e(ve,new Re({key:e,type:xe.CounterValue,time:Ve(),laneId:ve,value:t,category:i}))}StoreData(e,t){if(!this.#t)return;const i=this.#n.get(ve)?.at(-1)?.eventId;this.#e(ve,new Re({key:e,type:xe.ScopeData,time:Ve(),laneId:ve,eventId:i,data:t}))}Clear(){this.#r.clear(),this.#n.clear()}CreateCollection(){const e=new rf;for(const[t,i]of this.#r)e.AddToCollection(t,i);return this.#r=new Map,e}_BeginEvent(e,t,i,r=Ve(),n=!0,o=0){const a=this.#n.get(t)??[],c=n?i??a.at(-1)?.eventId:i,l={eventId:this.#i++,parentEventId:c,laneId:t,key:e,category:o};return a.push(l),this.#n.set(t,a),this.#e(t,new Re({key:e,type:xe.Begin,time:r,laneId:t,eventId:l.eventId,parentEventId:l.parentEventId,parentIsExplicit:!0,category:o})),{...l,time:r}}_EndEvent(e,t,i,r=Ve()){const n=this.#n.get(t)??[],o=i===void 0?n.length-1:n.findIndex(c=>c.eventId===i);if(o<0)return this.#e(t,new Re({key:e,type:xe.End,time:r,laneId:t,category:0})),r;const a=n[o];return a&&(n.splice(o,1),this.#e(t,new Re({key:e,type:xe.End,time:r,laneId:t,eventId:a.eventId,parentEventId:a.parentEventId,parentIsExplicit:!0,category:a.category}))),r}_MarkerEvent(e,t,i=Ve()){return this.#t?(this.#e(t,new Re({key:e,type:xe.Marker,time:i,laneId:t})),i):0}_RecordCounter(e,t,i,r,n=Ve()){this.#t&&this.#e(r,new Re({key:e,type:i?xe.CounterDelta:xe.CounterValue,time:n,laneId:r,value:t}))}_BeginTimespan(e,t,i,r=Ve(),n=0){const o=this.#n.get(t)??[],a={eventId:this.#i++,parentEventId:i,laneId:t,key:e,category:n};return o.push(a),this.#n.set(t,o),{...a,time:r}}_EndTimespan(e,t=Ve()){const i=this.#n.get(e.laneId)??[],r=i.findIndex(n=>n.eventId===e.eventId);r>=0&&i.splice(r,1),this.#e(e.laneId,new Re({key:e.key,type:xe.Timespan,time:t,startTime:e.time,laneId:e.laneId,eventId:e.eventId,parentEventId:e.parentEventId,parentIsExplicit:!0,category:e.category}))}_StoreData(e,t,i){this.#t&&this.#e(e.laneId,new Re({key:t,type:xe.ScopeData,time:Ve(),laneId:e.laneId,eventId:e.eventId,data:i}))}#e(e,t){const i=this.#r.get(e);i?i.push(t):this.#r.set(e,[t])}}let nf=1;function Ji(s=`lane-${nf++}`){return{laneId:s}}async function hi(s,e,t,i=at.GetInstance()){if(!i.enabled)return await t(s);const r=i._BeginTimespan(e,s.laneId,s.spanId),n={laneId:s.laneId,spanId:r.eventId};try{return await t(n)}finally{i._EndTimespan(r)}}function ji(s,e,t,i=at.GetInstance()){if(!i.enabled)return t(s);const r=i._BeginTimespan(e,s.laneId,s.spanId),n={laneId:s.laneId,spanId:r.eventId};try{return t(n)}finally{i._EndTimespan(r)}}function _e(s,e,t){s.spanId!==void 0&&at.GetInstance()._StoreData({laneId:s.laneId,eventId:s.spanId},e,t)}class ue{constructor(e,t){this.value=e,this.constant=t}static MakeConstant(e){return new ue(e,!0)}static MakeVarying(e){return new ue(e,!1)}GetValue(){return this.value}IsConstant(){return this.constant}Not(){return new ue(!this.value,this.constant)}static And(e,t){const i=e.value,r=t.value,n=e.constant,o=t.constant;return n&&o||!i&&n||!r&&o?ue.MakeConstant(i&&r):ue.MakeVarying(i&&r)}static Or(e,t){const i=e.value,r=t.value,n=e.constant,o=t.constant;return n&&o||i&&n||r&&o?ue.MakeConstant(i||r):ue.MakeVarying(i||r)}}function Xs(s,e){switch(s.op){case"call":return e(s.call);case"not":return Xs(s.operand,e).Not();case"and":return ue.And(Xs(s.left,e),Xs(s.right,e));case"or":return ue.Or(Xs(s.left,e),Xs(s.right,e))}}const of=new Set(["and","or","not","true","false"]);function af(s){return/[A-Za-z_]/.test(s)}function ro(s){return/[A-Za-z0-9_]/.test(s)}function cf(s){return ro(s)||"~!@#$%^&*-+=|\\.?/".includes(s)}class lf{constructor(e){this.s=e}pos=0;parse(){if(this.skipBlanks(),this.pos>=this.s.length)return null;const e=this.parseOr();return this.skipBlanks(),e===null||this.pos!==this.s.length?null:e}skipBlanks(){for(;this.pos<this.s.length&&(this.s[this.pos]===" "||this.s[this.pos]==="	");)this.pos++}matchKeyword(e){if(this.s.startsWith(e,this.pos)){const t=this.s[this.pos+e.length]??"";if(t===""||!ro(t))return this.pos+=e.length,!0}return!1}parseOr(){let e=this.parseAnd();if(e===null)return null;for(;;){const t=this.pos;if(this.skipBlanks(),!this.matchKeyword("or")){this.pos=t;break}this.skipBlanks();const i=this.parseAnd();if(i===null){this.pos=t;break}e={op:"or",left:e,right:i}}return e}parseAnd(){let e=this.parseFactor();if(e===null)return null;for(;;){const t=this.pos;if(this.skipBlanks(),this.matchKeyword("and")){this.skipBlanks();const i=this.parseFactor();if(i===null){this.pos=t;break}e={op:"and",left:e,right:i};continue}if(this.pos>t){const i=this.parseFactor();if(i!==null){e={op:"and",left:e,right:i};continue}}this.pos=t;break}return e}parseFactor(){let e=0;for(;;){const r=this.pos;if(this.skipBlanks(),!this.matchKeyword("not")){this.pos=r;break}e++}const t=this.parseCall();if(t===null)return null;let i=t;for(let r=0;r<e;r++)i={op:"not",operand:i};return i}parseCall(){this.skipBlanks();const e=this.parseFuncName();if(e===null)return null;const t=[];if(this.s[this.pos]===":")for(this.pos++,t.push({argName:"",value:this.parseArgVal()});this.s[this.pos]===",";)this.pos++,t.push({argName:"",value:this.parseArgVal()});return{op:"call",call:{funcName:e,args:t}}}parseFuncName(){const e=this.pos;if(this.pos>=this.s.length||!af(this.s[this.pos]))return null;let t=this.s[this.pos];for(this.pos++;this.pos<this.s.length&&ro(this.s[this.pos]);)t+=this.s[this.pos],this.pos++;return of.has(t)?(this.pos=e,null):t}parseArgVal(){const e=this.s[this.pos]??"";if(e==='"'||e==="'")return{type:"string",value:this.parseQuoted(e)};const t=this.pos;for(;this.pos<this.s.length&&cf(this.s[this.pos]);)this.pos++;const i=this.s.slice(t,this.pos);return i==="true"?{type:"bool",value:!0}:i==="false"?{type:"bool",value:!1}:/^-?[0-9]+$/.test(i)?{type:"int",value:parseInt(i,10)}:/^-?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/.test(i)&&/[.eE]/.test(i)?{type:"double",value:parseFloat(i)}:{type:"string",value:i}}parseQuoted(e){this.pos++;let t="";for(;this.pos<this.s.length;){const i=this.s[this.pos];if(i===e)return this.pos++,t;if(i==="\\"){const r=this.s[this.pos+1]??"";t+=r,this.pos+=2;continue}t+=i,this.pos++}return t}}function uf(s){return new lf(s).parse()}function df(s){let e="^";for(const t of s)t==="*"?e+=".*":t==="?"?e+=".":e+=t.replace(/[.+^${}()|[\]\\]/g,"\\$&");return e+="$",new RegExp(e)}class $r{_text;constructor(e){this._text=e instanceof N?e.pathString:e??""}static Everything(){return new $r("//")}static EveryDescendant(){return new $r(".//")}isEmpty(){return this._text===""}getText(){return this._text}toString(){return this._text}hasTrailingStretch(){return this._text.endsWith("//")}hasLeadingStretch(){return this._text.startsWith("//")}isProperty(){const e=this._text.lastIndexOf("/");return this._text.slice(e+1).includes(".")}getPrefix(){if(!this._text)return N.emptyPath;if(this._text.startsWith("//"))return N.absoluteRootPath;if(this._text.startsWith(".//"))return N.reflexiveRelativePath;const e=this._text.search(/[/]{2}|[*?{]/);let t=e<0?this._text:this._text.slice(0,e);return this.isProperty()&&(t=t.slice(0,t.lastIndexOf("."))),t=t.replace(/\/$/,""),N.fromString(t||(this._text.startsWith("/")?"/":"."))}setPrefix(e){const t=this.getPrefix().pathString,i=this._text.slice(t==="."?1:t.length);return this._text=e.isAbsoluteRootPath()&&i.startsWith("//")?i:`${e.pathString}${i}`,this}canAppendChild(e){return!this.isProperty()}appendChild(e){return this.canAppendChild(e)?e?(this._text?this._text.endsWith("//")||this._text.endsWith("/")?this._text+=e:this._text==="."?this._text=e:this._text+=`/${e}`:this._text=e,this):this.appendStretchIfPossible():this}canAppendProperty(e){return!this.isProperty()}appendProperty(e){return!this.canAppendProperty(e)||!e?this:(this.hasTrailingStretch()&&(this._text+="*"),this._text+=`.${e}`,this)}appendStretchIfPossible(){return this.isProperty()||this.hasTrailingStretch()?this:(this._text?this._text==="/"?this._text="//":this._text+="//":this._text=".//",this)}removeTrailingStretch(){return this.hasTrailingStretch()&&(this._text=this._text.slice(0,-2),this._text==="."&&(this._text=""),this._text===""&&(this._text="/")),this}removeTrailingComponent(){return this.isProperty()?this._text=this._text.slice(0,this._text.lastIndexOf(".")):this._text.endsWith("//*")?this._text=this._text.slice(0,-1):this.hasTrailingStretch()&&(this._text=this._text.slice(0,-2)),this}}class W{_components=[];_predPrograms=[];_empty=!0;_text="";_logic;_impliedUnion=!1;_left;_right;_reference;constructor(e){e===void 0||e===""||(this._text=e.trim(),this._parse(this._text))}static Everything(){return new W("//")}static EveryDescendant(){return new W(".//")}static Nothing(){return new W}static WeakerRef(){return new W("%_")}static MakeAtom(e){return e instanceof $r?new W(e.getText()):e instanceof N?new W(e.pathString):new W(`%${e.path.isEmpty()?"":`${e.path.pathString}:`}${e.name}`)}static MakeComplement(e){return e.isEmpty()?W.Everything():e._isEverything()?W.Nothing():e._logic==="complement"?new W(e._right?.getText()):new W(`~(${e.getText()})`)}static MakeOp(e,t,i){if(e==="difference"&&(t.isEmpty()||i.isEmpty()||t._isEverything()||i._isEverything()))return W.MakeOp("intersection",t,W.MakeComplement(i));if(t.isEmpty())return e==="intersection"?W.Nothing():i;if(i.isEmpty())return e==="intersection"?W.Nothing():t;if(t._isEverything())return e==="intersection"?i:W.Everything();if(i._isEverything())return e==="intersection"?t:W.Everything();const r=e==="intersection"?"&":e==="difference"?"-":e==="union"?"+":"";return new W(r?`(${t.getText()}) ${r} (${i.getText()})`:`(${t.getText()}) (${i.getText()})`)}isEmpty(){return this._empty}_isEverything(){return this._text==="//"&&this._logic===void 0&&this._reference===void 0&&!this._empty}getText(){return this._text}get text(){return this._text}toString(){return this.getText()}getParseError(){return this._empty&&this._text?"Invalid path expression":""}isAbsolute(){return this._reference?!0:this._logic==="complement"?this._right?.isAbsolute()??!0:this._logic?(this._left?.isAbsolute()??!0)&&(this._right?.isAbsolute()??!0):this._text.startsWith("/")}containsExpressionReferences(){return this._reference!==void 0||(this._left?.containsExpressionReferences()??!1)||(this._right?.containsExpressionReferences()??!1)}containsWeakerExpressionReference(){return this._reference?.name==="_"||(this._left?.containsWeakerExpressionReference()??!1)||(this._right?.containsWeakerExpressionReference()??!1)}isComplete(){return!this.containsExpressionReferences()&&this.isAbsolute()}makeAbsolute(e){return this.mapAtoms(t=>t.startsWith("/")||t.startsWith("%")?t:t.startsWith(".//")?`${e.pathString}${t.slice(1)}`:t==="."?e.pathString:mf(t,e))}replacePrefix(e,t){return this.mapAtoms(i=>i===e.pathString||i.startsWith(`${e.pathString}/`)||i.startsWith(`${e.pathString}.`)?t.pathString+i.slice(e.pathString.length):i)}mapPaths(e){return this.mapAtoms(t=>{if(t.startsWith("%")||t.startsWith("//"))return t;const i=N.fromString(t);return i.isEmpty()?t:e(i).pathString})}resolveReferences(e){if(this._reference)return e(this._reference);if(this._logic==="complement")return new W(`~(${this._right.resolveReferences(e).getText()})`);if(this._logic){const t=this._logic==="union"?"+":this._logic==="intersection"?"&":"-",i=this._impliedUnion?" ":` ${t} `;return new W(`${this._left.resolveReferences(e).getText()}${i}${this._right.resolveReferences(e).getText()}`)}return new W(this._text)}composeOver(e){return this.resolveReferences(t=>t.name==="_"?e:new W(`%${t.path.isEmpty()?"":t.path.pathString+":"}${t.name}`))}mapAtoms(e){if(this._reference)return new W(this._text);if(this._logic==="complement")return new W(`~(${this._right.mapAtoms(e).getText()})`);if(this._logic){const t=this._logic==="union"?"+":this._logic==="intersection"?"&":"-",i=this._impliedUnion?" ":` ${t} `;return new W(`${this._left.mapAtoms(e).getText()}${i}${this._right.mapAtoms(e).getText()}`)}return new W(e(this._text))}_addPredicate(e){const t=uf(e);return t===null?-1:(this._predPrograms.push(t),this._predPrograms.length-1)}_parse(e){const t=hf(e);if(t!==e){this._text=t,this._parse(t);return}const i=pf(e);if(i){this._logic=i.op,this._impliedUnion=i.implied,this._left=new W(i.left),this._right=new W(i.right);const c=this._left._predPrograms.length;this._right._offsetPredicateIndices(c),this._predPrograms=[...this._left._predPrograms,...this._right._predPrograms],this._empty=this._left.isEmpty()||this._right.isEmpty();return}if(e.startsWith("~")){this._logic="complement",this._right=new W(e.slice(1).trim()),this._predPrograms=[...this._right._predPrograms],this._empty=this._right.isEmpty();return}if(e.startsWith("%")){const c=/^%(?:(.*):)?([A-Za-z_][A-Za-z0-9_:]*)$/.exec(e);if(!c)return;this._reference={path:c[1]?N.fromString(c[1]):N.fromString(""),name:c[2]},this._empty=!1;return}const r=[];let n=0;const o=e.length,a=()=>{let c=n;for(;n<o&&e[n]!=="/"&&e[n]!=="{";)n++;const l=e.slice(c,n);let u=-1;if(e[n]==="{"){const d=Wc(e,n);if(d<0||(u=this._addPredicate(e.slice(n+1,d)),u<0))return!1;n=d+1}return r.push({stretch:!1,text:l,regex:/[*?]/.test(l)?df(l):void 0,predicateIndex:u}),!0};for(;n<o;)if(e[n]==="/"){if(e[n+1]==="/"){const c={stretch:!0,text:"",regex:void 0,predicateIndex:-1};if(r.push(c),n+=2,e[n]==="{"){const l=Wc(e,n);if(l<0||(c.predicateIndex=this._addPredicate(e.slice(n+1,l)),c.predicateIndex<0))return;n=l+1}continue}if(n++,!a())return}else if(!a())return;r.length!==0&&(this._components=r,this._empty=!1)}_offsetPredicateIndices(e){if(e!==0){for(const t of this._components)t.predicateIndex!==-1&&(t.predicateIndex+=e);this._left?._offsetPredicateIndices(e),this._right?._offsetPredicateIndices(e)}}get _stretchEnd(){const e=this._components[this._components.length-1];return e!==void 0&&e.stretch}Match(e,t){if(this._empty)return ue.MakeConstant(!1);if(this._reference)return ue.MakeVarying(!1);if(this._logic==="complement")return this._right.Match(e,t).Not();if(this._logic){const n=this._left.Match(e,t),o=this._right.Match(e,t);return this._logic==="intersection"?ue.And(n,o):this._logic==="difference"?ue.And(n,o.Not()):ue.Or(n,o)}const i=ff(e);return this._matchFrom(0,0,i,t)?this._stretchEnd?ue.MakeConstant(!0):ue.MakeVarying(!0):this._descendantCanMatch(i)?ue.MakeVarying(!1):ue.MakeConstant(!1)}_matchFrom(e,t,i,r){if(e===this._components.length)return t===i.length;const n=this._components[e];if(n.stretch){for(let a=t;a<=i.length;a++){if(n.predicateIndex!==-1){const c=zc(i,a);if(!r(n.predicateIndex,c).value)continue}if(this._matchFrom(e+1,a,i,r))return!0}return!1}if(t>=i.length)return!1;const o=i[t];if(n.regex){if(!n.regex.test(o))return!1}else if(n.text!==""&&n.text!==o)return!1;if(n.predicateIndex!==-1){const a=zc(i,t+1);if(!r(n.predicateIndex,a).value)return!1}return this._matchFrom(e+1,t+1,i,r)}_descendantCanMatch(e){let t=0;for(const i of this._components){if(i.stretch||t>=e.length||i.regex||i.predicateIndex!==-1)return!0;if(i.text!==""&&i.text!==e[t])return!1;t++}return!1}EvalPredicate(e,t){const i=this._predPrograms[e];return i===void 0?ue.MakeVarying(!1):Xs(i,t)}}class Le{constructor(e){this.text=e,this._expression=new W(e)}_expression;composeOver(e){return new Le(this._expression.composeOver(new W(e.text)).getText())}makeAbsolute(e){return new Le(this._expression.makeAbsolute(e).getText())}mapPaths(e){return new Le(this._expression.mapPaths(e).getText())}}function hf(s){if(!s.startsWith("(")||!s.endsWith(")"))return s;let e=0;for(let t=0;t<s.length;t++)if(s[t]==="("?e++:s[t]===")"&&e--,e===0&&t!==s.length-1)return s;return e===0?s.slice(1,-1).trim():s}function pf(s){const e=o=>{let a=0,c=0,l="";for(let u=s.length-1;u>=0;u--){const d=s[u];if(l){d===l&&s[u-1]!=="\\"&&(l="");continue}if(d==='"'||d==="'"){l=d;continue}if(d===")"){a++;continue}if(d==="("){a--;continue}if(d==="}"){c++;continue}if(d==="{"){c--;continue}if(!(a||c)){if(!/\s/.test(d)&&o.includes(d))return{index:u,op:d==="&"?"intersection":d==="-"?"difference":"union",whitespace:!1};if(o.includes(" ")&&/\s/.test(d)){let h=u;for(;h>0&&/\s/.test(s[h-1]);)h--;const m=s.slice(0,h).trim(),p=s.slice(u+1).trim();if(m&&p&&!/[+&\-~]$/.test(m)&&!/^[+&\-]/.test(p))return{index:h,op:"union",whitespace:!0};u=h}}}},t=e("+- ")??e("&");if(!t)return;const i=t.whitespace?s.slice(t.index).search(/\S/)+t.index:t.index+1,r=s.slice(0,t.index).trim(),n=s.slice(i).trim();return r&&n?{left:r,right:n,op:t.op,implied:t.whitespace}:void 0}function Wc(s,e){let t=e+1,i="";for(;t<s.length;){const r=s[t];if(i){if(r==="\\"){t+=2;continue}r===i&&(i=""),t++;continue}if(r==='"'||r==="'"){i=r,t++;continue}if(r==="}")return t;t++}return-1}function ff(s){return s.isAbsoluteRootPath()||s.isEmpty()?[]:s.pathString.split("/").filter(e=>e.length>0)}function zc(s,e){return N.fromString("/"+s.slice(0,e).join("/"))}function mf(s,e){const t=s.indexOf("//"),i=t<0?s:s.slice(0,t),r=t<0?"":s.slice(t),n=e.pathString.split("/").filter(Boolean),o=i.replace(/^\.\//,"").split("/");for(const a of o)!a||a==="."||(a===".."?n.pop():n.push(a));return`/${n.join("/")}${r}`}const gf=0,yf=1,Sf=2;function bf(s,e,t=4){if(e===0)return[];let i=0;function r(p){let y=0;for(let g=0;g<p;g++)y|=s[i+g]<<g*8;if(i+=p,p===4)return y|0;const f=p*8;return y&1<<f-1&&(y|=~((1<<f)-1)),y}const n=r(t),o=Math.floor((e*2+7)/8),a=i;i+=o;const c=t>>2,l=t>>1,u=new Array(e);let d=0,h=a,m=0;for(let p=0;p<e;p++){m>=8&&(h++,m=0);const y=s[h]>>m&3;m+=2;let f;y===gf?f=n:y===yf?f=r(c||1):y===Sf?f=r(l||1):f=r(t),d+=f,u[p]=d}return u}function Pf(s){const e=s.length;if(e===0)return new Uint8Array(0);const t=4,i=1,r=2,n=new Array(e);for(let y=0;y<e;y++)n[y]=s[y]-(y>0?s[y-1]:0)|0;let o=0,a=0;const c=new Map;for(const y of n){const f=(c.get(y)??0)+1;c.set(y,f),f>a?(o=y,a=f):f===a&&y>o&&(o=y)}const l=Math.ceil(e*2/8),u=new Uint8Array(l),d=[];function h(y,f){for(let g=0;g<f;g++)d.push(y>>g*8&255)}for(let y=0;y<e;y++){const f=n[y];let g;f===o?g=0:f>=-128&&f<=127?(g=1,h(f,i)):f>=-32768&&f<=32767?(g=2,h(f,r)):(g=3,h(f,t)),u[y*2>>3]|=g<<(y*2&7)}const m=new Uint8Array(t+l+d.length);return new DataView(m.buffer).setInt32(0,o,!0),m.set(u,t),m.set(new Uint8Array(d),t+l),m}function ht(s){return Zn(Pf(s))}const jc=16;function vf(s,e=4){if(s===0)return 0;const t=Math.floor((s*2+7)/8),i=e+t+s*e;return Zh(i)+1}const I={Bool:1,UChar:2,Int:3,UInt:4,Int64:5,UInt64:6,Half:7,Float:8,Double:9,String:10,Token:11,AssetPath:12,Matrix2d:13,Matrix3d:14,Matrix4d:15,Quatd:16,Quatf:17,Quath:18,Vec2d:19,Vec2f:20,Vec2h:21,Vec2i:22,Vec3d:23,Vec3f:24,Vec3h:25,Vec3i:26,Vec4d:27,Vec4f:28,Vec4h:29,Vec4i:30,Dictionary:31,TokenListOp:32,StringListOp:33,PathListOp:34,ReferenceListOp:35,IntListOp:36,Int64ListOp:37,UIntListOp:38,UInt64ListOp:39,PathVector:40,TokenVector:41,Specifier:42,Permission:43,Variability:44,VariantSelectionMap:45,TimeSamples:46,Payload:47,DoubleVector:48,LayerOffsetVector:49,StringVector:50,ValueBlock:51,Value:52,UnregisteredValue:53,UnregisteredValueListOp:54,PayloadListOp:55,TimeCode:56,PathExpression:57,Relocates:58,Spline:59,AnimationBlock:60},wf={[I.Bool]:"bool",[I.UChar]:"uchar",[I.Int]:"int",[I.UInt]:"uint",[I.Int64]:"int64",[I.UInt64]:"uint64",[I.Half]:"half",[I.Float]:"float",[I.Double]:"double",[I.String]:"string",[I.Token]:"token",[I.AssetPath]:"asset",[I.Matrix2d]:"matrix2d",[I.Matrix3d]:"matrix3d",[I.Matrix4d]:"matrix4d",[I.Quatd]:"quatd",[I.Quatf]:"quatf",[I.Quath]:"quath",[I.Vec2d]:"double2",[I.Vec2f]:"float2",[I.Vec2h]:"half2",[I.Vec2i]:"int2",[I.Vec3d]:"double3",[I.Vec3f]:"float3",[I.Vec3h]:"half3",[I.Vec3i]:"int3",[I.Vec4d]:"double4",[I.Vec4f]:"float4",[I.Vec4h]:"half4",[I.Vec4i]:"int4",[I.Dictionary]:"dictionary",[I.TimeCode]:"timecode"},Fe=128,sd=64,Rr=32,_f=16;let Hc=new Set;function If(s){Hc.has(s)||(Hc.add(s),console.warn(`usdc: ${s} values are not supported yet; treating as unauthored`))}class qc{pos=0;view;bytes;constructor(e){this.bytes=e,this.view=new DataView(e.buffer,e.byteOffset,e.byteLength)}seek(e){this.pos=e}u8(){return this.view.getUint8(this.pos++)}u16(){const e=this.view.getUint16(this.pos,!0);return this.pos+=2,e}u32(){const e=this.view.getUint32(this.pos,!0);return this.pos+=4,e}i32(){const e=this.view.getInt32(this.pos,!0);return this.pos+=4,e}u64n(){const e=this.view.getUint32(this.pos,!0),t=this.view.getUint32(this.pos+4,!0);return this.pos+=8,BigInt(t)<<32n|BigInt(e)}u64(){return Number(this.u64n())}i64n(){const e=this.view.getUint32(this.pos,!0),t=this.view.getInt32(this.pos+4,!0);return this.pos+=8,BigInt(t)<<32n|BigInt(e)}f32(){const e=this.view.getFloat32(this.pos,!0);return this.pos+=4,e}f64(){const e=this.view.getFloat64(this.pos,!0);return this.pos+=8,e}bytes_n(e){const t=this.bytes.subarray(this.pos,this.pos+e);return this.pos+=e,t}ascii(e){const t=this.bytes_n(e);let i="";for(let r=0;r<e&&t[r]!==0;r++)i+=String.fromCharCode(t[r]);return i}}function ei(s){let t=(s&32767)<<13;const i=260046848&t;if(t+=112<<23,i===260046848)t+=112<<23;else if(i===0){t+=1<<23;const n=new ArrayBuffer(4);new DataView(n).setUint32(0,t,!0);let o=new DataView(n).getFloat32(0,!0);const a=new ArrayBuffer(4);new DataView(a).setUint32(0,113<<23,!0),o-=new DataView(a).getFloat32(0,!0);const c=new ArrayBuffer(4);new DataView(c).setFloat32(0,o,!0),t=new DataView(c).getUint32(0,!0)}t|=(s&32768)<<16;const r=new ArrayBuffer(4);return new DataView(r).setUint32(0,t,!0),new DataView(r).getFloat32(0,!0)}function Af(s,e){const t=s.u64(),i=s.bytes_n(t);return Qn(i,e)}function pt(s,e,t=4){const i=vf(e,t),r=Af(s,i);return bf(r,e,t)}function Gs(s){const e=s.u8(),t=s.u8(),i=s.u8(),r=s.u8(),n=s.u8(),o=s.u8(),a=s.u8(),c=s.u8(),l=!!(c&Fe),u=!!(c&sd),d=!!(c&Rr),h=!!(c&_f),m=(e|t<<8|i<<16|r<<24)>>>0,p=n|o<<8,y=m+p*4294967296;return{typeId:a,isArray:l,isInlined:u,isCompressed:d,isArrayEdit:h,payloadLo:m,payloadOffset:y}}function Ct(s,e,t,i){if(e.isInlined){const o=e.payloadLo;if(t===8)return BigInt(i?o|0:o>>>0);if(i){if(t===4)return o|0;if(t===1)return(o&255)<<24>>24}else{if(t===4)return o>>>0;if(t===1)return o&255}return o}if(!e.payloadOffset)return[];if(s.seek(e.payloadOffset),!e.isArray)return t===8?i?s.i64n():s.u64n():t===4?i?s.i32():s.u32():t===1?s.u8():i?s.i32():s.u32();const r=s.u64();if(t===8){const o=[];for(let a=0;a<r;a++)o.push(i?s.i64n():s.u64n());return o}if(e.isCompressed)return pt(s,r,t);const n=[];for(let o=0;o<r;o++)t===4?n.push(i?s.i32():s.u32()):t===1?n.push(s.u8()):n.push(i?s.i32():s.u32());return n}function Tf(s,e,t){const i=t===I.Double||t===I.TimeCode,r=t===I.Half;if(e.isInlined){const a=new ArrayBuffer(4);new DataView(a).setUint32(0,e.payloadLo,!0);const c=new DataView(a).getFloat32(0,!0);return r?ei(e.payloadLo&65535):c}if(!e.payloadOffset)return 0;if(s.seek(e.payloadOffset),!e.isArray)return i?s.f64():r?ei(s.u16()):s.f32();const n=s.u64();if(!e.isCompressed){const a=[];for(let c=0;c<n;c++)i?a.push(s.f64()):r?a.push(ei(s.u16())):a.push(s.f32());return a}const o=String.fromCharCode(s.u8());if(o==="i")return pt(s,n,4).map(c=>c);if(o==="t"){const a=s.u32(),c=[];for(let u=0;u<a;u++)i?c.push(s.f64()):r?c.push(ei(s.u16())):c.push(s.f32());return pt(s,n,4).map(u=>c[u])}return[]}function Df(s,e,t){const i=Object.entries(I).find(([,f])=>f===t)?.[0]??"";let r,n=0;const o=i[i.length-1]?.toLowerCase();if(i.startsWith("Quat"))r=4;else if(i.startsWith("Vec"))r=parseInt(i.slice(3,4));else if(i.startsWith("Matrix"))n=parseInt(i.slice(6,7)),r=n*n;else throw new Error(`Unknown math type: ${i}`);const a=o==="d",c=o==="h",l=o==="i";function u(){return a?s.f64():c?ei(s.u16()):l?s.i32():s.f32()}function d(f){const g=[];for(let S=0;S<f;S++)g.push(u());return g}function h(f,g){const S=[];for(let b=0;b<g;b++)S.push(f.slice(b*g,b*g+g));return S}const m=i.startsWith("Quat"),p=f=>m?[f[3],f[0],f[1],f[2]]:f;if(e.isInlined){const f=c&&r===2?2:1,g=n||r,S=[];e.payloadLo&255,e.payloadLo>>8&255,e.payloadLo>>16&255,e.payloadLo>>24&255,e.payloadOffset>0&&e.payloadLo>>0&255;const b=[e.payloadLo&255,e.payloadLo>>8&255,e.payloadLo>>16&255,e.payloadLo>>24&255];for(let P=0;P<g;P++){const w=P*f;if(c&&f===2){const _=b[w]|b[w+1]<<8;S.push(ei(_))}else{const _=b[w];S.push(_>=128?_-256:_)}}if(n){const P=[];for(let w=0;w<n;w++){const _=new Array(n).fill(0);_[w]=S[w],P.push(_)}return P}return p(S)}if(s.seek(e.payloadOffset),e.isArray){const f=s.u64(),g=[];for(let S=0;S<f;S++){const b=d(r);g.push(n?h(b,n):p(b))}return g}const y=d(r);return n?h(y,n):p(y)}function xf(s,e,t){const i=Ct(s,e,4,!1);return e.isArray?i.map(r=>t[r]):t[i]}function kf(s,e,t){const i=Ct(s,e,4,!1);return e.isArray?i.map(r=>t[r]):t[i]}function Cf(s,e,t,i){if(e.isArray)return Ct(s,e,4,!1).map(o=>i[o]);if(e.isInlined)return t[e.payloadLo];const r=Ct(s,e,4,!1);return i[r]}function no(s,e,t,i,r,n){let o;e?o=t:o=s.u64();const a={},c=new Map;for(let l=0;l<o;l++){const u=s.u32(),d=r[u],h=s.pos,m=Number(s.i64n()),p=h+m;s.seek(p);const y=Gs(s),f=s.pos;a[d]=pi(s,y,i,r,n);const g=wf[y.typeId];g&&c.set(d,`${g}${y.isArray?"[]":""}`),s.seek(f)}return Fu(a,c),a}function Bf(s,e,t,i,r){s.seek(e.payloadOffset);const n=s.u8(),o=!!(n&1),a=!!(n&2),c=!!(n&4),l=!!(n&8),u=!!(n&16),d=!!(n&32),h=!!(n&64);let m=null,p=[],y=[],f=[],g=[];function S(){const P=s.u64(),w=[];for(let _=0;_<P;_++){let v;switch(e.typeId){case I.TokenListOp:v=t[s.u32()];break;case I.StringListOp:v=i[s.u32()];break;case I.PathListOp:v=r[s.u32()];break;case I.ReferenceListOp:case I.PayloadListOp:{const A=s.u32(),T=s.u32(),E=s.f64(),k=s.f64();e.typeId===I.ReferenceListOp&&s.u64(),v={assetPath:i[A]??"",primPath:r[T]??"",layerOffset:{offset:E,scale:k}};break}case I.IntListOp:v=s.i32();break;case I.UIntListOp:v=s.u32();break;case I.Int64ListOp:v=s.i64n();break;case I.UInt64ListOp:v=s.u64n();break;default:s.u64(),v=null}w.push(v)}return w}a?m=S():o&&(m=[]),c&&(p=S()),d&&(y=S()),h&&(f=S()),l&&(g=S()),u&&S(),p.length&&f.length===0&&(f=p);const b={isExplicit:m!==null,explicitItems:m??[],prependedItems:y,appendedItems:f,deletedItems:g};return p.length&&Object.defineProperty(b,"_sdfAddedItems",{value:p,configurable:!0,enumerable:!1,writable:!0}),b}function Nf(s,e,t,i,r){const n=e.payloadOffset;s.seek(n);const o=s.pos,a=Number(s.i64n());s.seek(o+a);const c=Gs(s),l=s.pos,u=Number(s.i64n()),d=pi(s,c,t,i,r);s.seek(l+u);const h=s.u64(),m=[];for(let p=0;p<h;p++){const y=Gs(s),f=s.pos,g=pi(s,y,t,i,r);s.seek(f),m.push([d[p],{typeId:y.typeId,isArray:y.isArray,isInlined:y.isInlined,isCompressed:y.isCompressed,payload:y.payloadLo,value:g}])}return m}function Ef(s,e,t,i,r){s.seek(e.payloadOffset);const n=s.u64();if(e.typeId===I.DoubleVector){const c=[];for(let l=0;l<n;l++)c.push(s.f64());return c}if(e.typeId===I.LayerOffsetVector){const c=[];for(let l=0;l<n;l++)c.push({offset:s.f64(),scale:s.f64()});return c}const o=[];for(let c=0;c<n;c++)o.push(s.u32());let a;return e.typeId===I.PathVector?a=r:e.typeId===I.StringVector?a=i:a=t,o.map(c=>a[c])}function Of(s,e,t){s.seek(e.payloadOffset);const i=s.u64(),r={};for(let n=0;n<i;n++){const o=t[s.u32()],a=t[s.u32()];r[o]=a}return r}function Lf(s,e,t){if(!e.payloadOffset)return{};s.seek(e.payloadOffset);const i=s.u64(),r={};for(let n=0;n<i;n++){const o=t[s.u32()],a=t[s.u32()];r[o]=a}return r}function Ff(s,e,t,i,r){s.seek(e.payloadOffset);const n=s.u64(),o=s.bytes_n(n),a=new Map,c=s.u64();for(let l=0;l<c;l++){const u=s.f64();a.set(u,no(s,!1,0,t,i,r))}return cp.CreateSplineFromBinaryData(o,a)}function pi(s,e,t,i,r,n=[]){const{typeId:o,isArray:a,isInlined:c,isCompressed:l,payloadLo:u,payloadOffset:d}=e;if(e.isArrayEdit)return If("VtArrayEdit (crate >= 0.14)"),null;switch(o){case I.ValueBlock:return new pe;case I.AnimationBlock:return new tt;case I.Spline:return Ff(s,e,t,i,r);case I.Bool:if(c)return!!u;if(!d)return[];if(s.seek(d),!a)return!!s.u8();{const h=s.u64(),m=[];for(let p=0;p<h;p++)m.push(!!s.u8());return m}case I.UChar:return Ct(s,e,1,!1);case I.Int:return Ct(s,e,4,!0);case I.UInt:return Ct(s,e,4,!1);case I.Int64:return Ct(s,e,8,!0);case I.UInt64:return Ct(s,e,8,!1);case I.Half:case I.Float:case I.Double:case I.TimeCode:return Tf(s,e,o);case I.String:return xf(s,e,i);case I.Token:return kf(s,e,t);case I.AssetPath:case I.PathExpression:return Cf(s,e,t,i);case I.Dictionary:return c?no(s,!0,u,t,i,r):(s.seek(d),no(s,!1,0,t,i,r));case I.Specifier:case I.Permission:case I.Variability:return Ct(s,e,4,!0);case I.Quatd:case I.Quatf:case I.Quath:case I.Vec2d:case I.Vec2f:case I.Vec2h:case I.Vec2i:case I.Vec3d:case I.Vec3f:case I.Vec3h:case I.Vec3i:case I.Vec4d:case I.Vec4f:case I.Vec4h:case I.Vec4i:case I.Matrix2d:case I.Matrix3d:case I.Matrix4d:return Df(s,e,o);case I.TokenListOp:case I.StringListOp:case I.PathListOp:case I.ReferenceListOp:case I.IntListOp:case I.Int64ListOp:case I.UIntListOp:case I.UInt64ListOp:case I.PayloadListOp:case I.UnregisteredValueListOp:return Bf(s,e,t,i,n);case I.TimeSamples:return Nf(s,e,t,i,r);case I.PathVector:case I.TokenVector:case I.DoubleVector:case I.LayerOffsetVector:case I.StringVector:return Ef(s,e,t,i,n);case I.VariantSelectionMap:return Of(s,e,i);case I.Relocates:return Lf(s,e,n);case I.Value:{if(!d)return null;s.seek(d);const h=Gs(s);return pi(s,h,t,i,r,n)}case I.UnregisteredValue:{s.seek(d);const h=Number(s.i64n()),m=d+h;s.seek(m);const p=Gs(s);return pi(s,p,t,i,r,n)}case I.Payload:{if(!d)return null;s.seek(d);const h=s.u32(),m=s.u32(),p=s.f64(),y=s.f64();return{assetPath:i[h]??"",primPath:n[m]??"",layerOffset:{offset:p,scale:y}}}default:return null}}function Mf(s,e,t,i,r){const n=new Array(s);function o(a,c){let l=a,u=c,d=!1,h=!1,m=!0;for(;m||d||h;){m=!1;const p=e[l];if(!u)u="/",n[p]="/";else{const y=t[l],f=y<0,g=r[Math.abs(y)];n[p]=(u==="/"?"":u)+(f?".":"/")+g}d=i[l]>0||i[l]===-1,h=i[l]>=0,d&&(h&&o(l+i[l],u),u=n[p]),l++}}return s>0&&o(0,""),n}function $f(s){const e=new qc(s),t=e.ascii(8);if(t!=="PXR-USDC")throw new Error(`Not a USDC file: ${t}`);const i=e.u8(),r=e.u8(),n=e.u8();if(e.bytes_n(5),i!==0||r>15||r===0&&n<1)throw new Error(`Unsupported USDC version: ${i}.${r}.${n}`);const o=e.u64();e.u64(),e.seek(o);const a=e.u64(),c={};for(let y=0;y<a;y++){const f=e.ascii(16),g=e.u64(),S=e.u64();c[f]={offset:g,size:S}}let l=[di("")];if(c.TOKENS){const{offset:y}=c.TOKENS;e.seek(y);const f=e.u64();let g;if(r<4)g=e.bytes_n(e.u64());else{const b=e.u64(),P=e.u64();g=Qn(e.bytes_n(P),b)}l=new TextDecoder().decode(g).split("\0").slice(0,f).map(b=>di(b))}let u=[];if(c.STRINGS){const{offset:y}=c.STRINGS;e.seek(y);const f=e.u64();for(let g=0;g<f;g++)u.push(l[e.u32()])}const d=[];if(c.FIELDS){const{offset:y}=c.FIELDS;e.seek(y);const f=e.u64();if(r<4)for(let g=0;g<f;g++){e.u32();const S=e.u32();d.push({tokenIdx:S,rep:Gs(e)})}else{const g=pt(e,f,4),S=e.u64(),b=e.bytes_n(S),P=Qn(b,f*8),w=new qc(P);for(let _=0;_<f;_++){const v=Gs(w);d.push({tokenIdx:g[_],rep:v})}}}let h=[];if(c.FIELDSETS){const{offset:y}=c.FIELDSETS;e.seek(y);const f=e.u64();h=r<4?Array.from({length:f},()=>e.u32()):pt(e,f,4)}let m=[];if(c.PATHS){const{offset:y}=c.PATHS;e.seek(y);const f=e.u64();if(r<4){m=new Array(f);const g=S=>{let b=!1,P=!1;do{r===0&&e.u32();const w=e.u32(),_=e.u32(),v=e.u8();e.bytes_n(3);const A=S===""?"/":`${S==="/"?"":S}${v&4?".":"/"}${l[_]}`;if(m[w]=A,b=!!(v&1),P=!!(v&2),b&&P){const T=Number(e.i64n());g(A),e.seek(T)}else b&&(S=A)}while(b||P)};g("")}else{const g=e.u64(),S=pt(e,g,4),b=pt(e,g,4),P=pt(e,g,4);m=Mf(f,S,b,P,l)}m=m.map(g=>g.replace(/\/\{/g,"{").replace(/\}\//g,"}"))}const p={};if(c.SPECS){const{offset:y}=c.SPECS;e.seek(y);const f=e.u64();let g,S,b;if(r<4){g=[],S=[],b=[];for(let v=0;v<f;v++)r===0&&e.u32(),g.push(e.u32()),S.push(e.u32()),b.push(e.u32())}else g=pt(e,f,4),S=pt(e,f,4),b=pt(e,f,4);const P=6;let w=null;for(let v=0;v<f;v++){const A=m[g[v]],T=S[v],E=b[v],k={};for(let D=T;D<h.length;D++){const L=h[D];if(L<0||L===4294967295)break;const{tokenIdx:V,rep:M}=d[L],ge=l[V];let ie;try{ie=pi(e,M,l,u,s,m)}catch(z){w===null&&(w=z),ie=void 0}k[ge]={typeId:M.typeId,isArray:M.isArray,isInlined:M.isInlined,isCompressed:M.isCompressed,payload:M.payloadLo,value:ie}}const B={form:E,fields:k,...k};p[A]=B}const _=v=>/^[A-Za-z_][A-Za-z0-9_]*$/.test(v);for(const[v,A]of Object.entries(p)){if(A.form!==P)continue;const T=A.primChildren?.value;if(!Array.isArray(T))continue;const E=new Set;for(const k of T){const B=k==null?"":String(k),D=v==="/"?`/${B}`:`${v}${v.endsWith("}")?"":"/"}${B}`;if(!_(B)||!(D in p))throw new Error(`Invalid child identifier '${B}' found on parent '${v}'`);if(E.has(B))throw new Error(`Duplicate child identifier '${B}' found on parent '${v}'`);E.add(B)}}if(w!==null)throw w}return p}const Is={IsExplicit:1,HasExplicitItems:2,HasAddedItems:4,HasDeletedItems:8,HasOrderedItems:16,HasPrependedItems:32,HasAppendedItems:64},cr={Attribute:1,Prim:6,PseudoRoot:7,Relationship:8};class es{_buf=[];get pos(){return this._buf.length}u8(e){return this._buf.push(e&255),this}u16(e){return this.u8(e).u8(e>>8)}u32(e){return this.u16(e&65535).u16(e>>>16&65535)}u64(e){return this.u32(e>>>0),this.u32(Math.floor(e/4294967296)>>>0),this}f32(e){const t=new ArrayBuffer(4);return new DataView(t).setFloat32(0,e,!0),this.bytes(new Uint8Array(t))}f64(e){const t=new ArrayBuffer(8);return new DataView(t).setFloat64(0,e,!0),this.bytes(new Uint8Array(t))}bytes(e){for(const t of e)this._buf.push(t);return this}ascii(e,t){for(let i=0;i<t;i++)this._buf.push(i<e.length?e.charCodeAt(i):0);return this}patchU64(e,t){const i=t>>>0,r=Math.floor(t/4294967296)>>>0;for(let n=0;n<4;n++)this._buf[e+n]=i>>n*8&255;for(let n=0;n<4;n++)this._buf[e+4+n]=r>>n*8&255;return this}toUint8Array(){return new Uint8Array(this._buf)}}class Rf{_map=new Map;intern(e){const t=di(e),i=this._map.get(t);if(i!==void 0)return i;const r=this._map.size;return this._map.set(t,r),r}get(e){return this._map.get(di(e))??0}get tokens(){return[...this._map.keys()]}}class Vf{constructor(e){this._tok=e}_map=new Map;_tokenIdxs=[];intern(e){const t=this._map.get(e);if(t!==void 0)return t;const i=this._tokenIdxs.length;return this._map.set(e,i),this._tokenIdxs.push(this._tok.intern(e)),i}get tokenIndices(){return this._tokenIdxs}}function id(s,e,t){const i=new Uint8Array(8);i[0]=t&255,i[1]=t>>>8&255,i[2]=t>>>16&255,i[3]=t>>>24&255;const r=Math.floor(t/4294967296)>>>0;return i[4]=r&255,i[5]=r>>8&255,i[6]=s&255,i[7]=e&255,i}function Te(s,e){return id(s,sd,e>>>0)}function Z(s,e,t){return id(s,e,t)}function Gf(s){const e=s.startsWith("uniform "),t=e?s.slice(8):s,i=t.endsWith("[]"),r=i?t.slice(0,-2):t;let n;switch(r){case"bool":n=I.Bool;break;case"int":case"uint":n=I.Int;break;case"float":n=I.Float;break;case"double":n=I.Double;break;case"token":n=I.Token;break;case"string":n=I.String;break;case"asset":n=I.String;break;case"double3":case"point3d":case"normal3d":case"vector3d":case"color3d":n=I.Vec3d;break;case"float3":case"point3f":case"normal3f":case"vector3f":case"color3f":case"texCoord2f":case"texCoord3f":n=I.Vec3f;break;case"quatf":case"quath":n=I.Quatf;break;case"quatd":n=I.Quatd;break;case"matrix4d":case"frame4d":n=I.Matrix4d;break;default:n=I.Token;break}return{typeId:n,isArray:i,isUniform:e}}function Uf(s,e,t,i,r){if(e.every(h=>h>=-2147483648&&h<=2147483647&&(h|0)===h)){const h=ht(e.map(m=>m|0));return i.u8(105),i.u64(h.length).bytes(h),Z(s,Fe|Rr,r)}const c=Math.min(Math.floor(e.length/4),1024),l=[],u=[];let d=!1;for(const h of e){let m=l.indexOf(h);if(m===-1&&(m=l.length),u.push(m),m===l.length)if(l.length!==c)l.push(h);else{d=!0;break}}if(!d&&l.length>0){i.u8(116),i.u32(l.length);for(const m of l)t?i.f64(m):i.f32(m);const h=ht(u.map(m=>m|0));return i.u64(h.length).bytes(h),Z(s,Fe|Rr,r)}return null}function rd(s,e,t,i,r,n){const{typeId:o,isArray:a}=Gf(s);if(o===I.Bool&&!a)return Te(I.Bool,e?1:0);if(o===I.Token&&!a)return Te(I.Token,t.intern(String(e)));if(o===I.String&&!a)return Te(I.String,i.intern(String(e)));if(o===I.String&&a){const c=e.map(String),l=n+r.pos;r.u64(c.length);for(const u of c)r.u32(i.intern(u));return Z(I.String,Fe,l)}if(o===I.Token&&a){const c=e,l=n+r.pos;r.u64(c.length);for(const u of c)r.u32(t.intern(u));return Z(I.Token,Fe,l)}if(o===I.Int&&a){const c=e,l=n+r.pos;if(r.u64(c.length),c.length>=jc){const u=ht(c.map(d=>d|0));return r.u64(u.length).bytes(u),Z(I.Int,Fe|Rr,l)}for(const u of c)r.u32(u>>>0);return Z(I.Int,Fe,l)}if(o===I.Vec3d&&!a){const[c,l,u]=e,d=n+r.pos;return r.f64(c??0).f64(l??0).f64(u??0),Z(I.Vec3d,0,d)}if(o===I.Vec3f&&!a){const[c,l,u]=e,d=n+r.pos;return r.f32(c??0).f32(l??0).f32(u??0),Z(I.Vec3f,0,d)}if(o===I.Vec3f&&a){const c=e,l=n+r.pos;r.u64(c.length);for(const u of c)r.f32(u[0]??0).f32(u[1]??0).f32(u[2]??0);return Z(I.Vec3f,Fe,l)}if(o===I.Vec3d&&a){const c=e,l=n+r.pos;r.u64(c.length);for(const u of c)r.f64(u[0]??0).f64(u[1]??0).f64(u[2]??0);return Z(I.Vec3d,Fe,l)}if(o===I.Float&&!a){const c=new ArrayBuffer(4);return new DataView(c).setFloat32(0,Number(e),!0),Te(I.Float,new DataView(c).getUint32(0,!0))}if(o===I.Double&&!a){const c=n+r.pos;return r.f64(Number(e)),Z(I.Double,0,c)}if((o===I.Float||o===I.Double)&&a){const c=e.map(Number),l=n+r.pos,u=o===I.Double;if(r.u64(c.length),c.length>=jc){const d=Uf(o,c,u,r,l);if(d)return d}for(const d of c)u?r.f64(d):r.f32(d);return Z(o,Fe,l)}if(o===I.Int&&!a)return Te(I.Int,e|0);if(o===I.Quatf||o===I.Quatd){const c=o===I.Quatd,l=d=>{const h=[d[1]??0,d[2]??0,d[3]??0,d[0]??0];for(const m of h)c?r.f64(m):r.f32(m)},u=n+r.pos;if(a){const d=e;r.u64(d.length);for(const h of d)l(h);return Z(o,Fe,u)}return l(e),Z(o,0,u)}if(o===I.Matrix4d){const c=u=>{const d=Array.isArray(u[0])?u.flat():u;for(let h=0;h<16;h++)r.f64(d[h]??0)},l=n+r.pos;if(a){const u=e;r.u64(u.length);for(const d of u)c(d);return Z(I.Matrix4d,Fe,l)}return c(e),Z(I.Matrix4d,0,l)}return Te(I.Token,t.intern(String(e)))}function Wf(s,e,t,i,r,n){const o=e.map(([,l])=>rd(s,l,t,i,r,n)),a=n+r.pos;r.u64(e.length);for(const[l]of e)r.f64(l);const c=n+r.pos;r.u64(8),r.bytes(Z(I.DoubleVector,0,a)),r.u64(8),r.u64(e.length);for(const l of o)r.bytes(l);return Z(I.TimeSamples,0,c)}function zf(s){return s==="def"||s===0?0:s==="over"||s===1?1:s==="class"||s===2?2:0}function jf(s,e){for(const t of["","primChildren","properties","specifier","typeName","variability","default","custom","timeSamples"])e.intern(t);for(const[t,i]of Object.entries(s)){for(const c of t.split(/[\/.]/).filter(Boolean))e.intern(c);if(!i)continue;const r=i.typeName?.value;r&&e.intern(r.startsWith("uniform ")?r.slice(8):r);const n=i.default?.value;if(typeof n=="string"&&e.intern(n),Array.isArray(n)&&typeof n[0]=="string")for(const c of n)e.intern(c);const o=i.primChildren?.value;if(o)for(const c of o)e.intern(c);const a=i.properties?.value;if(a)for(const c of a)e.intern(c)}}function Hf(s){const e=[];for(const t of ad(s))if(typeof t=="string")t.startsWith("/")&&e.push(t);else if(t&&typeof t=="object"&&"primPath"in t){const i=t.primPath;i&&i.startsWith("/")&&e.push(i)}return e}function qf(s){for(const e of Object.values(s))for(const t of["references","payload"])for(const i of ad(e[t]?.value))if(i&&typeof i=="object"&&"primPath"in i&&!i.primPath)return!0;return!1}function Kf(s){const e=new Map,t=(r,n)=>{const o=e.get(r)??[];o.includes(n)||(o.push(n),e.set(r,o))},i=r=>{const n=r.split("/").filter(Boolean);let o="/";for(const a of n){const c=nd(o,a);s[c]||t(o,a),o=c}};for(const r of Object.values(s))if(r)for(const n of["references","payload","inheritPaths","specializes","targetPaths","connectionPaths"])for(const o of Hf(r[n]?.value))i(o);return e}function nd(s,e){return s==="/"?`/${e}`:`${s}/${e}`}function oo(s,e,t){const i=[],r=s[e],n=r?.properties?.value;if(n)for(const c of n)i.push({path:`${e==="/"?"":e}.${c}`,name:c,isProp:!0});const o=new Set,a=r?.primChildren?.value;if(a)for(const c of a)o.add(c);for(const c of t.get(e)??[])o.add(c);for(const c of o)i.push({path:nd(e,c),name:c,isProp:!1});return i}function od(s,e,t){let i=1;for(const r of oo(s,e,t))i+=r.isProp?1:od(s,r.path,t);return i}function Xf(s,e,t){const i=[],r=new Map,n=[],o=[];i.push("/"),r.set("/",0),n.push(0);const a=oo(s,"/",t);if(a.length===0)return o.push(-2),{dfsPaths:i,pathToIdx:r,elementTokenIndices:n,jumps:o};o.push(-1);function c(l){for(let u=0;u<l.length;u++){const{path:d,name:h,isProp:m}=l[u],p=u===l.length-1,y=i.length;i.push(d),r.set(d,y),n.push(m?-e.get(h):e.get(h));const f=oo(s,d,t),g=f.length>0;let S;if(g&&p)S=-1;else if(g&&!p){let b=0;for(const P of f)b+=P.isProp?1:od(s,P.path,t);S=1+b}else!g&&p?S=-2:S=0;o.push(S),g&&c(f)}}return c(a),{dfsPaths:i,pathToIdx:r,elementTokenIndices:n,jumps:o}}function Ws(s){const e={isExplicit:!1,explicit:[],added:[],prepended:[],appended:[],deleted:[],ordered:[]};if(s==null)return null;if(Array.isArray(s))return s.length===0?null:{...e,prepended:s};if(typeof s=="object"&&"isExplicit"in s){const t=s,i={isExplicit:!!t.isExplicit,explicit:t.explicitItems??[],added:t._sdfAddedItems??[],prepended:t.prependedItems??[],appended:t.appendedItems??[],deleted:t.deletedItems??[],ordered:t.orderedItems??[]};return i.isExplicit||i.explicit.length||i.added.length||i.prepended.length||i.appended.length||i.deleted.length||i.ordered.length?i:null}return typeof s=="string"?{...e,prepended:[s]}:null}function Zo(s,e,t){let i=0;s.isExplicit&&(i|=Is.IsExplicit),s.explicit.length&&(i|=Is.HasExplicitItems),s.added.length&&(i|=Is.HasAddedItems),s.prepended.length&&(i|=Is.HasPrependedItems),s.appended.length&&(i|=Is.HasAppendedItems),s.deleted.length&&(i|=Is.HasDeletedItems),s.ordered.length&&(i|=Is.HasOrderedItems),e.u8(i),s.explicit.length&&t(s.explicit),s.added.length&&t(s.added),s.prepended.length&&t(s.prepended),s.appended.length&&t(s.appended),s.deleted.length&&t(s.deleted),s.ordered.length&&t(s.ordered)}function An(s,e,t,i){const r=i+t.pos,n=o=>o.map(a=>e.get(a)).filter(a=>a!==void 0);return Zo(s,t,o=>{const a=n(o);t.u64(a.length);for(const c of a)t.u32(c)}),Z(I.PathListOp,0,r)}function Kc(s,e,t,i){const r=i+t.pos;return Zo(s,t,n=>{t.u64(n.length);for(const o of n)t.u32(e.intern(o))}),Z(I.TokenListOp,0,r)}function Yf(s,e,t,i,r,n){const o=n+r.pos;return Zo(s,r,a=>{r.u64(a.length);for(const c of a){const l=c.assetPath??"",u=c.primPath??"",d=c.layerOffset??{offset:0,scale:1};r.u32(t.intern(l)),r.u32(u?i.get(u)??0:i.get("")??0),r.f64(d.offset).f64(d.scale),e&&r.u64(0)}}),Z(e?I.ReferenceListOp:I.PayloadListOp,0,o)}function Zf(s,e,t,i){const r=i+t.pos;t.u64(s.length);for(const n of s)t.u32(e.intern(n));return Z(I.StringVector,Fe,r)}function Qf(s,e,t){const i=t+e.pos;e.u64(s.length);for(const r of s)e.f64(r.offset).f64(r.scale);return Z(I.LayerOffsetVector,Fe,i)}function Jf(s,e,t,i){const r=Object.entries(s),n=i+t.pos;t.u64(r.length);for(const[o,a]of r){const c=Array.isArray(a)?a[0]??"":a;t.u32(e.intern(o)),t.u32(e.intern(c))}return Z(I.VariantSelectionMap,0,n)}function em(s,e,t){const i=t+e.pos;return e.f64(s),Z(I.Double,0,i)}function ad(s){if(Array.isArray(s))return s;if(s!==null&&typeof s=="object"&&"isExplicit"in s){const e=s;return e.isExplicit?[...e.explicitItems]:[...e.prependedItems,...e.appendedItems]}return typeof s=="string"?[s]:[]}function tm(s,e,t,i,r,n,o){const a=e[s];if(!a)return[];const c=[],l=s==="/",u=!l&&s.includes(".");if(u&&a.typeName?.value==="rel"){c.push({tokenIdx:t.intern("custom"),rep:Te(I.Bool,0)}),c.push({tokenIdx:t.intern("variability"),rep:Te(I.Variability,1)});const d=Ws(a.targetPaths?.value);return d&&c.push({tokenIdx:t.intern("targetPaths"),rep:An(d,o,r,n)}),c}if(u){const d=a.typeName?.value;c.push({tokenIdx:t.intern("custom"),rep:Te(I.Bool,0)});const h=Ws(a.connectionPaths?.value);if(h&&c.push({tokenIdx:t.intern("connectionPaths"),rep:An(h,o,r,n)}),d){const y=d.startsWith("uniform "),f=y?d.slice(8):d;c.push({tokenIdx:t.intern("typeName"),rep:Te(I.Token,t.intern(f))}),c.push({tokenIdx:t.intern("variability"),rep:Te(I.Variability,y?1:0)})}const m=a.default?.value;m!==void 0&&d&&c.push({tokenIdx:t.intern("default"),rep:rd(d,m,t,i,r,n)});const p=a.timeSamples?.value;p&&p.length>0&&d&&c.push({tokenIdx:t.intern("timeSamples"),rep:Wf(d,p,t,i,r,n)})}else{if(l){for(const y of["defaultPrim","upAxis"]){const f=a[y]?.value;typeof f=="string"&&c.push({tokenIdx:t.intern(y),rep:Te(I.Token,t.intern(f))})}for(const y of["metersPerUnit","startTimeCode","endTimeCode","timeCodesPerSecond","framesPerSecond"]){const f=a[y]?.value;typeof f=="number"&&c.push({tokenIdx:t.intern(y),rep:em(f,r,n)})}const p=a.subLayers?.value;if(p&&p.length>0){c.push({tokenIdx:t.intern("subLayers"),rep:Zf(p,i,r,n)});const y=a.subLayerOffsets?.value,f=p.map((g,S)=>y?.[S]??{offset:0,scale:1});c.push({tokenIdx:t.intern("subLayerOffsets"),rep:Qf(f,r,n)})}}else{c.push({tokenIdx:t.intern("specifier"),rep:Te(I.Specifier,zf(a.specifier?.value))});for(const b of["active","instanceable"]){const P=a[b]?.value;P!==void 0&&c.push({tokenIdx:t.intern(b),rep:Te(I.Bool,P?1:0)})}const p=a.kind?.value;typeof p=="string"&&c.push({tokenIdx:t.intern("kind"),rep:Te(I.Token,t.intern(p))});const y=Ws(a.apiSchemas?.value);y&&c.push({tokenIdx:t.intern("apiSchemas"),rep:Kc(y,t,r,n)});for(const b of["references","payload"]){const P=Ws(a[b]?.value);P&&c.push({tokenIdx:t.intern(b),rep:Yf(P,b==="references",i,o,r,n)})}for(const b of["inheritPaths","specializes"]){const P=Ws(a[b]?.value);P&&c.push({tokenIdx:t.intern(b),rep:An(P,o,r,n)})}const f=Ws(a.variantSetNames?.value);f&&c.push({tokenIdx:t.intern("variantSetNames"),rep:Kc(f,t,r,n)});const g=a.variantSetChildren?.value;if(g&&g.length>0){const b=n+r.pos;r.u64(g.length);for(const P of g)r.u32(t.intern(P));c.push({tokenIdx:t.intern("variantSetChildren"),rep:Z(I.TokenVector,0,b)})}const S=a.variantSelection?.value;S&&typeof S=="object"&&Object.keys(S).length>0&&c.push({tokenIdx:t.intern("variantSelection"),rep:Jf(S,i,r,n)})}const d=a.typeName?.value;d&&c.push({tokenIdx:t.intern("typeName"),rep:Te(I.Token,t.intern(d))});const h=a.primChildren?.value;if(h&&h.length>0){const p=n+r.pos;r.u64(h.length);for(const y of h)r.u32(t.intern(y));c.push({tokenIdx:t.intern("primChildren"),rep:Z(I.TokenVector,0,p)})}const m=a.properties?.value;if(m&&m.length>0){const p=n+r.pos;r.u64(m.length);for(const y of m)r.u32(t.intern(y));c.push({tokenIdx:t.intern("properties"),rep:Z(I.TokenVector,0,p)})}}return c}function sm(s){const e={};for(const G of s.getSpecPaths()){const Ie={};for(const vt of s.getFieldNames(G))Ie[vt]={value:s.getField(G,vt)};e[G]=Ie}const t=32,i=new Rf;jf(e,i);const r=new Vf(i),n=Kf(e);for(const G of n.values())for(const Ie of G)i.intern(Ie);const{dfsPaths:o,pathToIdx:a,elementTokenIndices:c,jumps:l}=Xf(e,i,n),u=o.length,d=o.map((G,Ie)=>Ie);let h=u;qf(e)&&(a.set("",u),h=u+1);const m=new es,p=t,y=[],f=[],g=[],S=[],b=[];for(const G of o){if(!e[G])continue;const Ie=G==="/",vt=!Ie&&G.includes("."),ln=vt&&e[G]?.typeName?.value==="rel",Sh=Ie?cr.PseudoRoot:ln?cr.Relationship:vt?cr.Attribute:cr.Prim,bh=tm(G,e,i,r,m,p,a),Ph=b.length;for(const vh of bh)b.push(y.length),y.push(vh);b.push(-1),f.push(G),g.push(Sh),S.push(Ph)}const P=i.tokens,w=new TextEncoder,_=P.map(G=>{const Ie=w.encode(G),vt=new Uint8Array(Ie.length+1);return vt.set(Ie),vt}),v=_.reduce((G,Ie)=>G+Ie.length,0),A=new Uint8Array(v);let T=0;for(const G of _)A.set(G,T),T+=G.length;const E=Zn(A),k=new es;k.u64(P.length).u64(v).u64(E.length).bytes(E);const B=r.tokenIndices,D=new es;D.u64(B.length);for(const G of B)D.u32(G);const L=y.map(G=>G.tokenIdx),V=ht(L),M=new Uint8Array(y.length*8);for(let G=0;G<y.length;G++)M.set(y[G].rep,G*8);const ge=Zn(M),ie=new es;ie.u64(y.length),ie.u64(V.length).bytes(V),ie.u64(ge.length).bytes(ge);const z=ht(b),H=new es;H.u64(b.length),H.u64(z.length).bytes(z);const de=ht(d),ye=ht(c),ce=ht(l),re=new es;re.u64(h).u64(u),re.u64(de.length).bytes(de),re.u64(ye.length).bytes(ye),re.u64(ce.length).bytes(ce);const te=f.map(G=>a.get(G)??0),lt=S,ut=g,$t=f.length,q=ht(te),ws=ht(lt),De=ht(ut),dt=new es;dt.u64($t),dt.u64(q.length).bytes(q),dt.u64(ws.length).bytes(ws),dt.u64(De.length).bytes(De);const Se=new es;Se.ascii("PXR-USDC",8),Se.u8(0).u8(8).u8(0),Se.ascii("",5);const gh=Se.pos;Se.u64(0),Se.u64(0),Se.bytes(m.toUint8Array());const ir=[["TOKENS",k.toUint8Array()],["STRINGS",D.toUint8Array()],["FIELDS",ie.toUint8Array()],["FIELDSETS",H.toUint8Array()],["PATHS",re.toUint8Array()],["SPECS",dt.toUint8Array()]],fa=[];for(const[,G]of ir)fa.push({offset:Se.pos,size:G.length}),Se.bytes(G);const yh=Se.pos;Se.patchU64(gh,yh),Se.u64(ir.length);for(let G=0;G<ir.length;G++){const[Ie]=ir[G],{offset:vt,size:ln}=fa[G];Se.ascii(Ie,16).u64(vt).u64(ln)}return Se.toUint8Array()}const im={1:"attribute",2:"connection",3:"expression",4:"mapper",5:"mapperArg",6:"prim",7:"pseudoRoot",8:"relationship",9:"relationshipTarget",10:"variant",11:"variantSet"},rm=new Set(["comment","documentation","subLayers","subLayerOffsets","defaultPrim","startTimeCode","endTimeCode","timeCodesPerSecond","framesPerSecond","startFrame","endFrame","framePrecision","metersPerUnit","upAxis","expressionVariables","owner","sessionOwner","hasOwnedSubLayers","primChildren","primOrder","relocates","layerRelocates","colorConfiguration","colorManagementSystem","fallbackPrimTypes"]);function Xc(s,e){const t=e.form===void 0?void 0:im[e.form];if(t)return t;if(s==="/")return"pseudoRoot";if(/\{[^}=]+=[^}]*\}$/.test(s))return/=\}$/.test(s)?"variantSet":"variant";const i=s.lastIndexOf("/");if(s.indexOf(".",i)>=0){const r=e.typeName?.value,n=e.targetPaths?.value;return r==="rel"||n!==void 0?"relationship":"attribute"}return"prim"}function nm(s){return(s instanceof Map?[...s]:Array.isArray(s)?s.filter(t=>Array.isArray(t)&&t.length>=2):s!==null&&typeof s=="object"?Object.entries(s):[]).map(([t,i])=>[Number(t),i!==null&&typeof i=="object"&&"typeId"in i&&"value"in i?i.value:i]).filter(([t])=>Number.isFinite(t)).sort(([t],[i])=>t-i)}function om(s){const e=s.replace(/\[\]$/,"");return e==="float"||e==="quatf"||/^(?:color|point|normal|vector|texCoord)[234]f$/.test(e)}function _r(s,e){return om(e)?typeof s=="number"?Math.fround(s):Array.isArray(s)?s.map(t=>_r(t,e)):s:s}function am(s){if(!(s instanceof Ce))return s;const t=s.GetValueType().GetTypeName()==="float";for(const i of s.GetKnots()){if(i.GetPreTanWidth()<0||i.GetPostTanWidth()<0)throw new Error("Cannot set negative tangent width");if(t){if([i.GetValue(),i.GetPreValue()].some(n=>!Number.isFinite(Math.fround(n))))throw new Error("Cannot set undefined float spline value");i.SetValue(Math.fround(i.GetValue())),i.IsDualValued()&&i.SetPreValue(Math.fround(i.GetPreValue())),i.SetPreTanSlope(Math.fround(i.GetPreTanSlope())),i.SetPostTanSlope(Math.fround(i.GetPostTanSlope()))}}return s}function cm(s){return s===null||typeof s!="object"||!s._sdfExplicitEmpty?s:{...s,isExplicit:!0}}function cd(s){const e=new Ci;for(const[t,i]of Object.entries(s)){const r=Xc(t,i);e.createSpec(t,r);const n=i.typeName?.value,o=typeof n=="string"?n:"";for(const[a,c]of Object.entries(i)){if(a==="form"||a==="fields")continue;const l=c,u=l?.value;if(u===void 0)continue;const d=u,h=a==="specifier"&&typeof d=="number"?["def","over","class"][d]:a==="variability"&&typeof d=="number"?["varying","uniform"][d]:d;if(!(a==="typeName"&&h==="__AnyType__")&&!(t==="/"&&!rm.has(a)&&en(a,"layer")===void 0)){if(a==="timeSamples")e.set(t,a,nm(d).map(([m,p])=>[m,_r(p,o)]));else{const m=cm(h);e.set(t,a,a==="default"?_r(m,o):a==="spline"?am(m):a==="customData"?Mu(m,_r):a==="documentation"&&typeof m=="string"?m.replace(/\\(['"\\])/g,"$1"):m)}l?.valueTypeName&&e.setValueTypeName(t,a,l.valueTypeName)}}r==="variant"&&!e.has(t,"specifier")&&e.set(t,"specifier","over"),r==="relationship"&&!e.has(t,"variability")&&e.set(t,"variability","uniform")}for(const[t,i]of Object.entries(s)){if(Xc(t,i)!=="prim")continue;const r=e.get(t,"variantSetNames"),n=[...new Set([...r?.explicitItems??[],...r?.prependedItems??[],...r?.appendedItems??[]].filter(o=>typeof o=="string"))];if(n.length!==0){e.set(t,"variantSetChildren",n);for(const o of n){const a=`${t}{${o}=}`;e.hasSpec(a)||e.createSpec(a,"variantSet")}}}return e}function lm(s){const e=s instanceof Lu?s:void 0,t=e?.value??s;return{typeId:0,isArray:Array.isArray(t),isInlined:!1,isCompressed:!1,payload:0,value:t,...e?{valueTypeName:e.typeName}:{}}}function $s(s,e,t){const i={};for(const[r,n]of Object.entries(t))i[r]=lm(n);s[e]={form:0,fields:i,...i}}function um(s,e){s.need("{");const t=e==="timecode"?"double":e;if(s.peek()==="}"){s.need("}");const h=new Ce($.Declare(t));return h.SetTimeValued(e==="timecode"),Na(h,{preExtrapolationAuthored:!1,postExtrapolationAuthored:!1,knots:new Map}),h}const i=s.peekWord(),n=(i==="hermite"||i==="bezier"?s.word():"bezier")==="hermite"?Be.Hermite:Be.Bezier;s.eat(",");const o=new Ce($.Declare(t));o.SetTimeValued(e==="timecode"),o.SetCurveType(n);const a=[],c=new Map,l=new Map;let u=!1,d=!1;for(;!s.eof()&&s.peek()!=="}";){const h=s.peekWord();if(h==="pre"||h==="post"){s.word(),s.need(":");const b=s.word(),P=b==="sloped"?X.Sloped:b==="linear"?X.Linear:b==="none"?X.ValueBlock:X.Held;let w=0;s.eat("(")&&(w=s.number(),s.need(")"));const _=new Ht(P,w);h==="pre"?(u=!0,o.SetPreExtrapolation(_)):(d=!0,o.SetPostExtrapolation(_)),s.eat(",");continue}if(h==="loop"){s.word(),s.need(":"),s.need("(");const b=[];for(let P=0;P<5;P++)b.push(s.number()),P<4&&s.need(",");s.need(")"),o.SetInnerLoopParams(new us(...b)),s.eat(",");continue}const m=new Vs(o.GetValueType());m.SetCurveType(n),m.SetNextInterpolation(J.Held),m.SetTime(s.number()),s.need(":");let p=s.number();s.eat("&")&&(m.SetPreValue(p),p=s.number()),m.SetValue(p);let y=0,f=0,g=0,S=0;for(;s.eat(";");){if(s.peek()==="{"){const T=$e(s);if(T&&typeof T=="object"&&!Array.isArray(T)){const E=Ho(T);E&&c.set(m.GetTime(),E),m.SetCustomData(T)}continue}const b=s.word();let P="";b==="post"&&s.peek()!=="("&&(P=s.word());let w=0,_=0,v=0,A=0;if(s.eat("(")){const T=s.number();let E=et.None;if(s.eat(",")){const k=s.peekWord();if(k==="autoEase"||k==="custom")E=s.word()==="autoEase"?et.AutoEase:et.Custom,_=T,A=T;else{const B=s.number();w=T,_=B,A=T,v=B,s.eat(",")&&(E=s.word()==="autoEase"?et.AutoEase:et.Custom)}}else _=T,A=T;s.need(")"),b==="pre"?m.SetPreTanAlgorithm(E):m.SetPostTanAlgorithm(E)}b==="pre"?(f=v,y=A,m.SetPreTanWidth(w),m.SetPreTanSlope(_)):(S=v,g=A,m.SetPostTanWidth(w),m.SetPostTanSlope(_),m.SetNextInterpolation(P==="none"?J.ValueBlock:P==="held"?J.Held:P==="linear"?J.Linear:J.Curve))}l.set(m.GetTime(),{dualValued:m.IsDualValued(),preTangentSlope:y,preTangentWidth:f,postTangentSlope:g,postTangentWidth:S}),a.push(m),s.eat(",")}return s.need("}"),o.SetKnots(a),c.size&&dp(o,c),Na(o,{preExtrapolationAuthored:u,postExtrapolationAuthored:d,knots:l}),o}class dm{constructor(e,t=""){this.sourceName=t,this.src=e}src;pos=0;eof(){return this.pos>=this.src.length}at(e=0){return this.src[this.pos+e]??""}ws(){for(;!this.eof();){const e=this.at();if(e===" "||e==="	"||e==="\r"||e===`
`)this.pos++;else if(e==="#")for(;!this.eof()&&this.at()!==`
`;)this.pos++;else if(e==="/"&&this.at(1)==="*")for(this.pos+=2;!this.eof();){if(this.at()==="*"&&this.at(1)==="/"){this.pos+=2;break}this.pos++}else break}}peek(){return this.ws(),this.at()}word(){this.ws();let e="";for(;!this.eof()&&/[a-zA-Z0-9_]/.test(this.at());)e+=this.src[this.pos++];return e}peekWord(){const e=this.pos;this.ws();let t="",i=this.pos;for(;i<this.src.length&&/[a-zA-Z0-9_]/.test(this.src[i]);)t+=this.src[i++];return this.pos=e,t}ident(){this.ws();let e="";for(;!this.eof()&&/[a-zA-Z0-9_:]/.test(this.at());)e+=this.src[this.pos++];return e.replace(/:+$/,"")}eat(e){return this.ws(),this.src.startsWith(e,this.pos)?(this.pos+=e.length,!0):!1}need(e){if(!this.eat(e))throw new Error(`Expected '${e}' at ${this.pos}, got: '${this.src.slice(this.pos,this.pos+30)}'`)}expectedListOperand(e){this.ws();const t=this.src.slice(0,this.pos).split(/\r?\n/),i=t.length,r=(t.at(-1)?.length??0)+1;let n=this.at();if(n==="@"){const a=this.src.indexOf("@",this.pos+1);n=a<0?this.src.slice(this.pos):this.src.slice(this.pos,a+1)}else n=this.src.slice(this.pos).match(/^[^\s,;)]+/)?.[0]??n;const o=this.sourceName?`${this.sourceName}:`:"";throw new Error(`${o}${i}:${r}: Expected None or [ at '${n}' in <${e}>`)}string(){this.ws();const e=this.at();if(e!=='"'&&e!=="'")throw new Error(`Expected string at ${this.pos}`);const t=e+e+e;if(this.src.startsWith(t,this.pos)){this.pos+=3;let r="";for(;!this.eof();){if(this.src.startsWith(t,this.pos)){this.pos+=3;break}const n=this.src[this.pos];n==="\\"?(this.pos++,r+=this.readEscape()):(r+=n,this.pos++)}return r}this.pos++;let i="";for(;!this.eof();){const r=this.src[this.pos];if(r===e){this.pos++;break}r==="\\"?(this.pos++,i+=this.readEscape()):(i+=r,this.pos++)}return i}readEscape(){const e=this.src[this.pos++]??"";switch(e){case"n":return`
`;case"t":return"	";case"r":return"\r";case"\\":return"\\";case'"':return'"';case"'":return"'";case"x":{const t=/^[0-9a-fA-F]{1,2}/.exec(this.src.slice(this.pos,this.pos+2));return t?(this.pos+=t[0].length,String.fromCharCode(parseInt(t[0],16))):"\\x"}default:return"\\"+e}}rawNumber(){this.ws();let e="",t=!0;if((this.at()==="-"||this.at()==="+")&&(e+=this.src[this.pos++]),/[0-9]/.test(this.at()))for(;!this.eof()&&/[0-9]/.test(this.at());)e+=this.src[this.pos++];if(this.at()==="."&&/[0-9]/.test(this.at(1)))for(t=!1,e+=this.src[this.pos++];!this.eof()&&/[0-9]/.test(this.at());)e+=this.src[this.pos++];if(this.at()==="e"||this.at()==="E")for(t=!1,e+=this.src[this.pos++],(this.at()==="+"||this.at()==="-")&&(e+=this.src[this.pos++]);!this.eof()&&/[0-9]/.test(this.at());)e+=this.src[this.pos++];return{raw:e,value:parseFloat(e),isInt:t}}number(){return this.rawNumber().value}asset(){if(this.need("@"),this.at()==="@"&&this.at(1)==="@"){this.pos+=2;const t=this.src.indexOf("@@@",this.pos),i=t<0?"":this.src.slice(this.pos,t);return t>=0&&(this.pos=t+3),i}let e="";for(;!this.eof()&&this.at()!=="@";)e+=this.src[this.pos++];return this.eof()||this.pos++,e}path(){this.need("<");let e="";for(;!this.eof()&&this.at()!==">";)e+=this.src[this.pos++];return this.pos++,e}skipBlock(){this.need("{");let e=1;for(;!this.eof()&&e>0;){const t=this.src[this.pos];if(t==="{")e++,this.pos++;else if(t==="}")e--,this.pos++;else if(t==='"'||t==="'"){const i=t,r=i+i+i;if(this.src.startsWith(r,this.pos)){this.pos+=3;const n=this.src.indexOf(r,this.pos);this.pos=n<0?this.src.length:n+3}else{for(this.pos++;!this.eof()&&this.src[this.pos]!==i;)this.src[this.pos]==="\\"&&this.pos++,this.pos++;this.pos++}}else if(t==="#")for(;!this.eof()&&this.src[this.pos]!==`
`;)this.pos++;else if(t==="/"&&this.src[this.pos+1]==="*"){this.pos+=2;const i=this.src.indexOf("*/",this.pos);this.pos=i<0?this.src.length:i+2}else if(t==="@")if(this.pos++,this.src[this.pos]==="@"&&this.src[this.pos+1]==="@"){this.pos+=2;const i=this.src.indexOf("@@@",this.pos);this.pos=i<0?this.src.length:i+3}else{for(;!this.eof()&&this.src[this.pos]!=="@";)this.pos++;this.eof()||this.pos++}else this.pos++}}skipParen(){this.need("(");let e=1;for(;!this.eof()&&e>0;){const t=this.src[this.pos];if(t==="(")e++,this.pos++;else if(t===")")e--,this.pos++;else if(t==='"'||t==="'"){const i=t,r=i+i+i;if(this.src.startsWith(r,this.pos)){this.pos+=3;const n=this.src.indexOf(r,this.pos);this.pos=n<0?this.src.length:n+3}else{for(this.pos++;!this.eof()&&this.src[this.pos]!==i;)this.src[this.pos]==="\\"&&this.pos++,this.pos++;this.pos++}}else if(t==="#")for(;!this.eof()&&this.src[this.pos]!==`
`;)this.pos++;else if(t==="/"&&this.src[this.pos+1]==="*"){this.pos+=2;const i=this.src.indexOf("*/",this.pos);this.pos=i<0?this.src.length:i+2}else this.pos++}}skipBracket(){this.need("[");let e=1;for(;!this.eof()&&e>0;){const t=this.src[this.pos];if(t==="[")e++,this.pos++;else if(t==="]")e--,this.pos++;else if(t==='"'||t==="'"){const i=t,r=i+i+i;if(this.src.startsWith(r,this.pos)){this.pos+=3;const n=this.src.indexOf(r,this.pos);this.pos=n<0?this.src.length:n+3}else{for(this.pos++;!this.eof()&&this.src[this.pos]!==i;)this.src[this.pos]==="\\"&&this.pos++,this.pos++;this.pos++}}else if(t==="#")for(;!this.eof()&&this.src[this.pos]!==`
`;)this.pos++;else this.pos++}}}function $e(s){s.ws();const e=s.peek();if(!e)return null;if(s.src.startsWith("None",s.pos)&&!/[a-zA-Z0-9_]/.test(s.src[s.pos+4]??""))return s.pos+=4,null;if(e==='"'||e==="'")return s.string();if(e==="("){s.need("(");const t=[];for(;s.peek()!==")"&&!s.eof()&&(t.length>0&&s.eat(","),s.ws(),s.peek()!==")");)t.push($e(s));return s.need(")"),t}if(e==="["){s.need("[");const t=[];for(;s.peek()!=="]"&&!s.eof()&&(t.length>0&&s.eat(","),s.ws(),s.peek()!=="]");)t.push($e(s));return s.need("]"),t}if(e==="@")return s.asset();if(e==="<")return s.path();if(e==="{")return hm(s);if((e==="-"||e==="+")&&/[a-zA-Z_]/.test(s.at(1))){const t=e==="-"?-1:1;s.pos++;const i=s.word();return i==="inf"||i==="Inf"||i==="INF"?t*(1/0):i==="nan"||i==="NaN"?t*NaN:`${e}${i}`}if(e==="-"||e==="+"||/[0-9]/.test(e)||e==="."&&/[0-9]/.test(s.at(1))){const t=s.rawNumber();return t.isInt?new Js(t.raw,t.value):t.value}if(/[a-zA-Z_]/.test(e)){s.pos;const t=s.word();return t==="true"||t==="True"?!0:t==="false"||t==="False"?!1:t==="None"?null:t==="edit"&&s.peek()==="["?(s.skipBracket(),null):t==="inf"||t==="Inf"||t==="INF"?1/0:t==="nan"||t==="NaN"?NaN:t}return s.pos++,null}function Qo(s,e,t){const i=s.peek(),r=s.peekWord(),n=i==='"'||i==="'"?"string":i==="@"?"asset":i==="<"?"path":i==="{"?"dictionary":r==="true"||r==="True"||r==="false"||r==="False"?"bool":r==="inf"||r==="Inf"||r==="INF"||r==="nan"||r==="NaN"?"double":/[-+0-9.]/.test(i)?/[.eE]/.test(s.src.slice(s.pos).match(/^[^\s,;)\]}]+/)?.[0]??"")?"double":"int":r?"token":void 0,o=tn($e(s));return en(e,t)===void 0&&n?new Lu(o,n):o}function hm(s){s.need("{");const e={},t=new Map;for(;!s.eof()&&s.peek()!=="}"&&(s.ws(),s.peek()!=="}");){if(s.peek()==='"'||s.peek()==="'"){s.string(),s.eat(";");continue}const i=s.word();if(!i){s.pos++;continue}if(s.ws(),s.peek()==="}")break;const r=s.eat("[]"),n=s.ident();if(!n){s.pos++;continue}if(s.eat("=")){const o=$e(s),a=r?`${i}[]`:i;e[n]=i==="dictionary"?o:to(o,a),t.set(n,a)}s.eat(";")}return s.need("}"),Fu(e,t),e}function ld(s){const e={};for(s.need("{");!s.eof()&&s.peek()!=="}"&&(s.ws(),s.peek()!=="}");){if(s.peek()==='"'||s.peek()==="'"){s.string(),s.eat(",");continue}if(s.peek()===","){s.pos++;continue}if(s.peek()!=="<"){s.pos++;continue}const t=s.path();s.ws(),s.eat(":"),s.ws();const i=s.peek()==="<"?s.path():"";t&&!(t in e)&&(e[t]=i),s.eat(",")}return s.need("}"),e}function pm(s){s.need("{");const e={};for(;!s.eof()&&s.peek()!=="}"&&(s.ws(),s.peek()!=="}");){s.src.slice(s.pos);const t=s.number();s.eat(":");const i=$e(s);e[String(t)]=i,s.eat(",")}return s.need("}"),e}function os(){return{isExplicit:!1,explicitItems:[],prependedItems:[],appendedItems:[],deletedItems:[],orderedItems:[]}}function as(s,e,t){const i=()=>{s.isExplicit=!1,s.explicitItems.length=0,delete s._sdfAddedItems,s.prependedItems.length=0,s.appendedItems.length=0,s.deletedItems.length=0,s.orderedItems.length=0,delete s._sdfExplicitEmpty};if(!e){i(),t.length>0?(s.isExplicit=!0,s.explicitItems.push(...t)):Object.defineProperty(s,"_sdfExplicitEmpty",{value:!0,configurable:!0,enumerable:!1});return}if(s.isExplicit&&i(),delete s._sdfExplicitEmpty,e==="prepend")s.prependedItems.push(...t);else if(e==="add"){const r=s._sdfAddedItems??[];r.push(...t),Object.defineProperty(s,"_sdfAddedItems",{value:r,configurable:!0,enumerable:!1,writable:!0}),s.appendedItems.push(...t)}else e==="append"?s.appendedItems.push(...t):e==="delete"?s.deletedItems.push(...t):e==="reorder"&&s.orderedItems.push(...t)}function fm(s){s.ws();let e="",t="",i=!1;s.peek()==="@"&&(e=s.asset()),s.peek()==="<"&&(t=s.path(),i=!0);const r={offset:0,scale:1};if(s.peek()==="("){for(s.need("(");!s.eof()&&s.peek()!==")";){const n=s.word();if(s.eat("="))if(n==="offset"||n==="scale"){const o=s.number();n==="offset"?r.offset=o:r.scale=o}else $e(s);s.eat(";"),s.eat(",")}s.need(")")}return!e&&!t&&!i?null:{assetPath:e,primPath:t,layerOffset:r}}function Yc(s,e){if(s.ws(),s.src.startsWith("None",s.pos)&&!/[a-zA-Z0-9_]/.test(s.src[s.pos+4]??""))return s.pos+=4,[];if(s.peek()==="["){s.need("[");const i=[];for(;!s.eof()&&s.peek()!=="]";){const r=e(s);if(r!==null&&i.push(r),!s.eat(","))break}return s.need("]"),i}const t=e(s);return t===null?[]:[t]}function ud(s,e){if(s.ws(),s.src.startsWith("None",s.pos)&&!/[a-zA-Z0-9_]/.test(s.src[s.pos+4]??""))return s.pos+=4,[];s.peek()!=="["&&s.expectedListOperand(e);const t=tn($e(s));return Array.isArray(t)?t:[]}const dd=new Set(["prepend","append","add","delete","reorder"]);function hd(s,e){const t={};for(s.need("(");!s.eof()&&s.peek()!==")";){if(s.peek()==='"'||s.peek()==="'"){t.comment=s.string(),s.eat(";");continue}let i="",r=s.ident();if(dd.has(r)&&(i=r,r=s.ident()),!r){s.pos++;continue}if(r==="references"||r==="payload"){s.need("=");const n=Yc(s,fm),o=t[r]??=os();as(o,i,n)}else if(r==="inherits"||r==="specializes"){s.need("=");const n=Yc(s,c=>c.peek()!=="<"?null:c.path()),o=r==="inherits"?"inheritPaths":"specializes",a=t[o]??=os();as(a,i,n)}else if(r==="variantSets"){s.need("=");const n=$e(s),o=typeof n=="string"?[n]:Array.isArray(n)?n.filter(c=>typeof c=="string"):[],a=t.variantSetNames??=os();as(a,i,o)}else if(r==="variants"){s.need("="),s.need("{");const n=t.variantSelection??{};for(;!s.eof()&&s.peek()!=="}";){s.word();const o=s.ident()||(s.peek()==='"'?s.string():"");if(!o){s.pos++;continue}s.need("="),n[o]=[s.string()],s.eat(";")}s.need("}"),t.variantSelection=n}else if(r==="apiSchemas"||r==="clipSets"){s.need("=");const n=$e(s),o=typeof n=="string"?[n]:Array.isArray(n)?n.filter(c=>typeof c=="string"):[],a=t[r]??=os();as(a,i,o)}else if(r==="relocates")s.need("="),t.relocates=ld(s);else if(s.eat("=")){const n=i?ud(s,e):Qo(s,r,"prim");if(i){const o=t[r]??=os();as(o,i,n)}else t[r]=n}s.eat(";")}return s.need(")"),t}function pd(s,e,t,i){const r=s.word();s.ws();let n="";s.peek()!=='"'&&s.peek()!=="'"&&(n=s.word(),s.ws());const o=s.string(),a=t==="/"?`/${o}`:`${t}${t.endsWith("}")?"":"/"}${o}`;let c={};s.peek()==="("&&(c=hd(s,a));const l=[],u=[],d=new Set,h=[],m={};for(s.need("{");!s.eof()&&s.peek()!=="}";)fd(s,e,a,l,u,m,h,d),s.eat(";");s.need("}"),u.sort((y,f)=>{const g=S=>{const b=e[`${a}.${S}`]?.fields;return!d.has(S)&&b&&("connectionPaths"in b||"timeSamples"in b)?1:0};return g(y)-g(f)});const p={specifier:r,...c};n&&(p.typeName=n),l.length>0&&(p.primChildren=l),u.length>0&&(p.properties=u),h.length>0&&(p.variantSetChildren=h),m.primOrder&&(p.primOrder=m.primOrder),m.propertyOrder&&(p.propertyOrder=m.propertyOrder),$s(e,a,p),i.push(o)}function fd(s,e,t,i,r,n={},o=[],a=new Set){s.ws();const c=s.peek();if(!c||c==="}")return;if(c==='"'||c==="'"){s.string();return}if(c===";"){s.pos++;return}let l=!1,u="",d=s.peekWord();if(d==="reorder"){s.word();const _=s.word();if(_!=="nameChildren"&&_!=="properties")throw new Error(`reorder must target nameChildren or properties at ${s.pos}, got '${_}'`);s.need("=");const v=$e(s),A=typeof v=="string"?[v]:Array.isArray(v)?v.filter(T=>typeof T=="string"):[];_==="nameChildren"?n.primOrder=A:n.propertyOrder=A;return}let h="";if((d==="delete"||d==="append"||d==="prepend"||d==="add")&&(h=s.word(),d=s.peekWord()),d==="custom"&&(s.word(),l=!0,d=s.peekWord()),d==="uniform"?(s.word(),u="uniform",d=s.peekWord()):d==="varying"&&(s.word(),u="varying",d=s.peekWord()),d==="def"||d==="over"||d==="class"){pd(s,e,t,i);return}if(d==="variantSet"){s.word();const _=s.string();s.eat("="),mm(s,e,t,_),o.includes(_)||o.push(_);return}if(d==="rel"){s.word();const _=s.ident();if(!_)return;s.ws(),s.peek()==="."&&(s.pos++,s.word());let v,A=h!=="";if(s.peek()==="="){s.pos++,A=!0;const D=$e(s);typeof D=="string"?v=[D]:Array.isArray(D)?v=D.filter(L=>typeof L=="string"):v=[]}const T=`${t}.${_}`;let E={};s.peek()==="("&&(E=Zc(s,"relationship",T));const k={},B=e[T];if(B)for(const[D,L]of Object.entries(B.fields))k[D]=L.value;if(Object.assign(k,{...E,typeName:"rel",...l?{custom:!0}:{}}),A){const D=(v??[]).filter(Boolean).map(L=>Qc(t,L));if(h===""&&D.length>0)k.targetPaths=D;else{const L=os();as(L,h,D),v?.length===0&&h===""&&(L.isExplicit=!1);const V=k.targetPaths;if(V&&typeof V=="object"&&!Array.isArray(V)&&"isExplicit"in V&&!L.isExplicit){const M=V;k.targetPaths={isExplicit:M.isExplicit,explicitItems:[...M.explicitItems],prependedItems:[...M.prependedItems,...L.prependedItems],appendedItems:[...M.appendedItems,...L.appendedItems],deletedItems:[...M.deletedItems,...L.deletedItems]}}else k.targetPaths=L}}$s(e,T,k),a.add(_),r.includes(_)||r.push(_);return}if(!d)throw new Error(`Expected prim or property declaration at ${s.pos}, got: '${s.src.slice(s.pos,s.pos+30)}'`);const m=s.word();if(!m)throw new Error(`Expected type name at ${s.pos}, got: '${s.src.slice(s.pos,s.pos+30)}'`);s.ws();let p=!1;s.peek()==="["&&s.at(1)==="]"&&(s.pos+=2,p=!0),s.ws();const y=s.ident();if(!y)throw new Error(`Expected property name after type '${m}' at ${s.pos}`);s.ws();let f="";s.peek()==="."&&(s.pos++,f=s.word());let g;if(s.peek()==="=")if(s.pos++,s.ws(),f==="spline"){const _=s.pos;try{g=um(s,p?`${m}[]`:m)}catch{s.pos=_,s.skipBlock(),g=null}}else f!=="timeSamples"&&f!=="connect"&&s.peek()==="{"&&f?(s.skipBlock(),g=null):f==="timeSamples"?g=pm(s):g=$e(s);const S=`${t}.${y}`;let b={};s.peek()==="("&&(b=Zc(s,"attribute",S));const P=p?`${m}[]`:m,w={...b,typeName:P};if(l&&(w.custom=!0),u&&(w.variability=u),f==="timeSamples"&&g!==void 0)if(g&&typeof g=="object"){const _={};for(const[v,A]of Object.entries(g))_[v]=A===null?new pe:to(A,P);w.timeSamples=_}else w.timeSamples=g;else if(f==="spline")g instanceof Ce&&(w.spline=g);else if(f==="connect"){const _=(Array.isArray(g)?g:[g]).filter(v=>typeof v=="string").map(v=>Qc(t,v));if(h){const v=os();as(v,h,_),w.connectionPaths=v}else w.connectionPaths=Array.isArray(g)?_:_[0]??null}else f===""&&g!==void 0&&(w.default=g===null?new pe:g==="AnimationBlock"?new tt:to(g,P));if(e[S]){const _=e[S],v={};for(const A of Object.keys(_.fields))v[A]=_.fields[A].value;Object.assign(v,w),$s(e,S,v)}else $s(e,S,w);r.includes(y)||r.push(y),f===""&&a.add(y)}function Zc(s,e,t){const i={};for(s.need("(");!s.eof()&&s.peek()!==")";){if(s.peek()==='"'||s.peek()==="'"){i.comment=s.string(),s.eat(";");continue}let r="",n=s.ident();if(dd.has(n)&&(r=n,n=s.ident()),!n){s.pos++;continue}if(s.eat("=")){const o=r?ud(s,t):Qo(s,n,e);if(r){const a=os();as(a,r,o),i[n]=a}else i[n]=o}s.eat(";")}return s.need(")"),i}function Qc(s,e){if(e.startsWith("/"))return e;const t=s.split("/").filter(Boolean);for(const i of e.split("/"))!i||i==="."||(i===".."?t.pop():t.push(i));return`/${t.join("/")}`}function mm(s,e,t,i){s.need("{");const r=[];for(;!s.eof()&&s.peek()!=="}";){if(s.peek()!=='"'&&s.peek()!=="'"){s.pos++;continue}const n=s.string();r.push(n);const o=`${t}{${i}=${n}}`;let a={};s.peek()==="("&&(a=hd(s,o));const c=[],l=[],u=new Set,d=[],h={};for(s.need("{");!s.eof()&&s.peek()!=="}";)fd(s,e,o,c,l,h,d,u),s.eat(";");s.need("}");const m={...a};c.length>0&&(m.primChildren=c),l.length>0&&(m.properties=l),d.length>0&&(m.variantSetChildren=d),h.primOrder&&(m.primOrder=h.primOrder),h.propertyOrder&&(m.propertyOrder=h.propertyOrder),$s(e,o,m)}s.need("}"),$s(e,`${t}{${i}=}`,{variantChildren:r})}function gm(s){s.need("(");const e={};for(;!s.eof()&&s.peek()!==")"&&(s.ws(),s.peek()!==")");){if(s.peek()==='"'||s.peek()==="'"){e.comment=s.string(),s.eat(";");continue}const t=s.pos,i=s.peekWord();(i==="delete"||i==="append"||i==="prepend")&&s.word();const r=s.ident();if(!r){s.pos=t+1;continue}if(r==="subLayers"&&s.eat("=")){const n=[],o=[];for(s.need("[");!s.eof()&&s.peek()!=="]";){if(s.peek()!=="@"){s.pos++;continue}n.push(s.asset());const a={offset:0,scale:1};if(s.peek()==="("){for(s.need("(");!s.eof()&&s.peek()!==")";){const c=s.word();if(s.eat("=")){const l=s.number();c==="offset"?a.offset=l:c==="scale"&&(a.scale=l)}s.eat(";"),s.eat(",")}s.need(")")}o.push(a),s.eat(",")}s.need("]"),e.subLayers=n,o.some(a=>a.offset!==0||a.scale!==1)&&(e.subLayerOffsets=o)}else if(r==="relocates"&&s.eat("="))e.layerRelocates=ld(s);else if(s.eat("="))try{const n=r==="doc"?"documentation":r;e[n]=Qo(s,n,"layer")}catch{}s.eat(";")}return s.need(")"),e}function ym(s,e=""){const t=new dm(s,e),i={};for(;!t.eof()&&(t.at()===" "||t.at()==="	"||t.at()==="\r"||t.at()===`
`);)t.pos++;if(!t.src.startsWith("#usda",t.pos)&&!t.src.startsWith("#sdf 1.4.32",t.pos))throw new Error("Not a USDA file: missing #usda header");for(;!t.eof()&&t.at()!==`
`&&t.at()!=="\r";)t.pos++;const r={};t.peek()==="("&&Object.assign(r,gm(t));const n=[];let o;for(;!t.eof()&&(t.ws(),!t.eof());){const c=t.peek();if(c==='"'||c==="'"){t.string(),t.eat(";");continue}if(c===";"){t.pos++;continue}const l=t.peekWord();if(l==="def"||l==="over"||l==="class")pd(t,i,"/",n);else if(l==="reorder"){t.word();const u=t.word();if(u!=="rootPrims")throw new Error(`top-level reorder must target rootPrims at ${t.pos}, got '${u}'`);t.need("=");const d=$e(t);o=typeof d=="string"?[d]:Array.isArray(d)?d.filter(h=>typeof h=="string"):[]}else if(l==="variantSet")t.word(),t.string(),t.eat("="),t.skipBlock();else{if(l)throw new Error(`Unexpected top-level statement '${l}' at ${t.pos}`);t.pos++}t.eat(";")}const a={...r};return n.length>0&&(a.primChildren=n),o&&(a.primOrder=o),$s(i,"/",a),i}async function $i(s,e,t){return s?hi(s,e,t):at.IsEnabled()?hi(Ji(),e,t):await t(void 0)}function Ke(s,e,t){return s?ji(s,e,t):at.IsEnabled()?ji(Ji(),e,t):t(void 0)}class mt{static typeName="SdfFileFormat";capabilities={reading:!0,writing:!1,editing:!1};getExternalAssetDependencies(e){return[]}static findByExtension(e,t){return Ke(t,"usd-ts:SdfFileFormat.findByExtension",()=>wm(e))}}class ao extends mt{static typeName="SdfUsdaFileFormat";formatId="usda";extensions=["usda"];capabilities={reading:!0,writing:!0,editing:!0};read(e,t,i,r){Ke(r,"usd-ts:SdfUsdaFileFormat.read",n=>{t._setDataFromFileFormat(yd(e,n,t.filePath))})}}class Jo extends mt{static typeName="SdfUsdcFileFormat";formatId="usdc";extensions=["usdc"];capabilities={reading:!0,writing:!0,editing:!0};read(e,t,i,r){Ke(r,"usd-ts:SdfUsdcFileFormat.read",n=>{t._setDataFromFileFormat(Jc(e,n))})}_readFromAsset(e,t,i){Ke(i,"usd-ts:SdfUsdcFileFormat.readFromAsset",r=>{t._setDataFromFileFormat(Jc(e,r))})}writeToBytes(e){return sm(e)}}class Sm extends mt{static typeName="SdfUsdFileFormat";formatId="usd";extensions=["usd"];capabilities={reading:!0,writing:!0,editing:!0};usdc=new Jo;read(e,t,i,r){Ke(r,"usd-ts:SdfUsdFileFormat.read",n=>{Am(e)?this.usdc._readFromAsset(e,t,n):t._setDataFromFileFormat(yd(e,n,t.filePath))})}}class bm extends mt{static typeName="SdfUsdzFileFormat";formatId="usdz";extensions=["usdz"];capabilities={reading:!0,writing:!1,editing:!1}}const md=new Map,gd=s=>s.replace(/^\./,"").toLowerCase();function Pm(s){for(const e of s.extensions)md.set(gd(e),s)}for(const s of[new ao,new Jo,new Sm,new bm])Pm(s);function vm(s){let e=s.split(":SDF_FORMAT_ARGS:",1)[0];for(let i=fs(e);i;i=fs(e))e=i.innerPath;const t=e.lastIndexOf(".");return t<0?"":gd(e.slice(t+1))}function wm(s){return md.get(vm(s))}function _m(s){return mt.findByExtension(s)}const Im=_m;function Am(s){return s[0]===80&&s[1]===88&&s[2]===82&&s[3]===45}function Jc(s,e){return Ke(e,"usd-ts:parseCrate",()=>cd($f(s)))}function yd(s,e,t=""){const i=new TextDecoder().decode(s),r=/^\s*(#(?:usda|sdf)\s+[^\s]+)/.exec(i)?.[1];if(!r)throw new Error("Not a USDA file: missing #usda header");if(!r.startsWith("#usda 1.0")&&!r.startsWith("#sdf 1.4.32"))throw new Error(`Unable to parse layer version from '${r?.split(/\s+/,2)[1]??""}'.`);if(r.startsWith("#usda ")){const n=r.slice(6),o=/^(\d+)\.(\d+)(?:\.(\d+))?$/.exec(n);if(!o||o.slice(1).some(a=>a!==void 0&&Number(a)>255))throw new Error(`Unable to parse layer version from '${n}'.`)}if(/\b(?:add|append|prepend|delete|reorder)\s+[^=\r\n]*\.connect\s*=\s*None\b/.test(i))throw new Error("Setting connection paths to None is only allowed for explicit connection paths");return Ke(e,"usd-ts:parseUsda",()=>cd(ym(i,t)))}const Sd=new Map;Au(()=>Sd.clear());function Tm(s,e){Sd.set(s,e)}const co=":SDF_FORMAT_ARGS:";function Tt(s){const e=s.indexOf(co);if(e<0)return{assetPath:s,args:new Map};const t=new Map;for(const i of s.slice(e+co.length).split("&")){if(!i)continue;const r=i.indexOf("="),n=decodeURIComponent(r<0?i:i.slice(0,r)),o=decodeURIComponent(r<0?"":i.slice(r+1));t.set(n,o)}return{assetPath:s.slice(0,e),args:t}}function Vr(s,e){if(e.size===0)return s;const t=[...e].sort(([i],[r])=>i.localeCompare(r)).map(([i,r])=>`${encodeURIComponent(i)}=${encodeURIComponent(r)}`).join("&");return`${s}${co}${t}`}class Dm{byIdentifier=new Map;byResolvedPath=new Map;inFlight=new Map;finalizer=new FinalizationRegistry(e=>this.erase(e));clear(){this.byIdentifier.clear(),this.byResolvedPath.clear(),this.inFlight.clear()}findIn(e,t,i,r){return Ke(i,r,()=>{const n=e.get(t);if(n)for(const o of n){const a=o.layer.deref();if(a)return a;this.erase(o)}})}find(e,t,i,r){return Ke(r,"usd-ts:LayerRegistry.find",n=>(i?this.findIn(this.byIdentifier,e,n,"usd-ts:LayerRegistry.findByIdentifier"):void 0)??this.findIn(this.byResolvedPath,t,n,"usd-ts:LayerRegistry.findByResolvedPath"))}async findOrOpen(e,t,i,r,n){return $i(n,"usd-ts:LayerRegistry.findOrOpen",async o=>{const a=this.find(e,t,i,o);if(a)return a;const c=t||e,l=this.inFlight.get(c);if(l)return l;const u=r(o).then(d=>{const h=this.find(e,t,i,o);return h||(this.insert(d,e,t,o),d)}).finally(()=>{this.inFlight.get(c)===u&&this.inFlight.delete(c)});return this.inFlight.set(c,u),u})}insert(e,t,i,r){Ke(r,"usd-ts:LayerRegistry.insert",()=>{const n={layer:new WeakRef(e),identifier:t,resolvedIdentifier:i};this.add(this.byIdentifier,t,n),this.add(this.byResolvedPath,i,n),this.finalizer.register(e,n,n)})}add(e,t,i){let r=e.get(t);r||e.set(t,r=new Set),r.add(i)}erase(e){this.remove(this.byIdentifier,e.identifier,e),this.remove(this.byResolvedPath,e.resolvedIdentifier,e),this.finalizer.unregister(e)}remove(e,t,i){const r=e.get(t);r&&(r.delete(i),r.size===0&&e.delete(t))}}const lo=new Dm;zh(()=>lo.clear());class Gr{_includeAll=!1;_included=[];_excluded=[];includeAll(){return this._includeAll=!0,this._included=[],this}include(e){return this._included=[...new Set([...this._included,...e])].sort(),this}exclude(e){return this._excluded=[...new Set([...this._excluded,...e])].sort(),this}includedAll(){return this._includeAll}getIncluded(){return[...this._included]}getExcluded(){return[...this._excluded]}isIncluded(e){if(!this._includeAll&&this._included.length===0||e.startsWith("anon:"))return!1;const t=Tt(e).assetPath;return(this._includeAll||this._included.some(r=>t.includes(r)))&&!this._excluded.some(r=>t.includes(r))}clone(){const e=new Gr;return this._includeAll?e.includeAll():e.include(this._included),e.exclude(this._excluded)}}const xm=new Set(["primChildren","properties","variantSetChildren","variantChildren"]),km=new Set(["specifier"]),el=new Set(["custom","variability","typeName"]);async function bd(s,e){const t=fs(e);if(!t)return s.extract(e);const i=await s.extract(t.packagePath);if(!hs.isZip(i))throw new Error(`Layer.findOrOpen: '${t.packagePath}' is not a package`);return bd(hs.fromBytes(i),t.innerPath)}async function tl(s,e,t,i){return $i(i,"usd-ts:sdfResolvePath",r=>(r&&_e(r,"assetPath",e),s.resolve(e,t)))}function uo(s,e){if(typeof e!="string")return s;const t=e.replace(/\[\]$/,"");return t==="float"||t==="quatf"||/^(?:float[234]|(?:color|point|normal|vector|texCoord)[234]f)$/.test(t)?typeof s=="number"?Math.fround(s):Array.isArray(s)?s.map(r=>uo(r,e)):s:s}class Y{constructor(e,t,i,r=t.isDetached(),n=e){this.filePath=e,this._resolverContext=i,this._isDetached=r,this.resolvedPath=n,this._data=t,this._stateDelegate._setLayer(this)}static DetachedLayerRules=Gr;static _detachedLayerRules=new Gr;static _anonymousSequence=0;_data;_specHandles=new Map;_stateDelegate=new Yp;get identifier(){return this.filePath}get realPath(){return this.resolvedPath}_setDataFromFileFormat(e){this._data=e}setStateDelegate(e){this._stateDelegate._setLayer(null),this._stateDelegate=e,e._setLayer(this)}getStateDelegate(){return this._stateDelegate}isDirty(){return this._stateDelegate.isDirty()}markCurrentStateAsClean(){this._stateDelegate.markCurrentStateAsClean()}static fromBytes(e,t){return Y._fromBytes(e,t,void 0)}static _fromBytes(e,t,i,r){return Ke(i,"usd-ts:Layer.fromBytes",n=>Y._read(e,t,n,r))}static _read(e,t,i,r,n,o=t){return Ke(i,"usd-ts:Layer.read",a=>{const c=n??mt.findByExtension(t,a)??new ao,l=new Ci;l.createSpec("/","pseudoRoot"),l.set("/","specifier","def");const u=e.length>=8&&new TextDecoder().decode(e.subarray(0,8))==="PXR-USDC",d=new Y(t,l,r,!u||Y._detachedLayerRules.isIncluded(t),o);return c.read?.(e,d,Tt(t).args,a),d.markCurrentStateAsClean(),d})}static async findOrOpen(e,t,i){return t??=Qs(),i??=t.getCurrentContext(),t=Pa(t,i),$i(va(i),"usd-ts:Layer.findOrOpen",r=>Y._findOrOpen(e,t,i,r))}static find(e){return lo.find(e,"",!0)}static async _findOrOpen(e,t,i,r){r&&_e(r,"identifier",e);const n=await $i(r,"usd-ts:Layer.computeInfoToFindOrOpenLayer",async o=>{const{assetPath:a,args:c}=Tt(e),l=fs(a),u=l?.packagePath??a,d=t.createIdentifier(u),h=l?ki(d,l.innerPath):d,m=Vr(h,c),p=await tl(t,u,i,o);if(!p.valid)throw new Error(`Could not resolve layer: ${e}`);const y=l?ki(p.toString(),l.innerPath):p.toString(),f=Vr(y,c),g=mt.findByExtension(y,o);if(!g)throw new Error(`Could not determine file format for resolved layer: ${y}`);return{assetToResolve:u,fileFormat:g,identifier:m,packagePath:l,registryIdentifier:m,registryResolvedIdentifier:f,resolvedPath:p,trustIdentifier:!t.isContextDependentPath(u)}});return lo.findOrOpen(n.registryIdentifier,n.registryResolvedIdentifier,n.trustIdentifier,async o=>$i(o,"usd-ts:Layer.openLayer",async a=>{const{assetToResolve:c,fileFormat:l,identifier:u,packagePath:d,resolvedPath:h}=n,m=await t.openAsset(h,i);if(!m)throw new Error(`Could not open layer: ${h}`);let p=await m.getBuffer();if(d){if(!hs.isZip(p))throw new Error(`Layer.findOrOpen: '${c}' is not a package`);p=await bd(hs.fromBytes(p),d.innerPath)}if(hs.isZip(p)){const y=hs.fromBytes(p);Tm(u,y);const f=y.defaultLayerName();if(!f)throw new Error(`Layer.findOrOpen: '${e}' contains no usd layer`);const g=await y.extract(f);return Y._read(g,ki(u,f),a,i,void 0,ki(Tt(n.registryResolvedIdentifier).assetPath,f))}return Y._read(p,u,a,i,l,n.registryResolvedIdentifier)}),r)}static open(e,t,i){return Y.findOrOpen(e,t,i)}static createInMemory(e,t){const i=typeof t=="string"?new TextEncoder().encode(t):t;if(typeof t=="string"){const r=mt.findByExtension(e),n=r&&!["usd","usda","usdc"].includes(r.formatId)?r:new ao;return Y._read(i,e,void 0,void 0,n)}return Y.fromBytes(i,e)}static createAnonymous(e=""){const t=e.replace(/^anon:(?:\/\/)?/,"");return Y._createEmpty(`anon:${++Y._anonymousSequence}:${t}`)}static _createEmpty(e){const t=new Ci;return t.createSpec("/","pseudoRoot"),t.set("/","specifier","def"),new Y(e,t)}getDisplayName(){const e=/^anon:\d+:(.*)$/.exec(this.filePath);if(e)return e[1];const{assetPath:t}=Tt(this.filePath),i=t.lastIndexOf("/");return i<0?t:t.slice(i+1)}resolveAsset(e){const t=this._resolverContext?va(this._resolverContext):void 0;return Ke(t,"usd-ts:Layer.resolveAsset",i=>(i&&_e(i,"assetPath",e),ui(this.filePath,e)))}getField(e,t){return this._data.get(e,t)}_getFieldValueTypeName(e,t){return this._data.getValueTypeName(e,t)}getPreviousTimeSampleForPath(e,t){return this._data.getPreviousTimeSampleForPath(e,t)}getFieldNames(e){return this._data.list(e)}getSpecPaths(){const e=[];return this._data.visitSpecs({visitSpec:(t,i)=>(e.push(i),!0),done:()=>{}}),e}hasSpec(e){return this._data.hasSpec(e)}getSpecType(e){return this._data.getSpecType(e)}getObjectAtPath(e){const t=typeof e=="string"?e:e.pathString;if(!this._data.hasSpec(t))return;let i=this._specHandles.get(t);return i||(i=new sf(this,t),this._specHandles.set(t,i)),i}streamsData(){return this._data.streamsData()}isDetached(){return this._isDetached}static setDetachedLayerRules(e){Y._detachedLayerRules=e.clone()}static getDetachedLayerRules(){return Y._detachedLayerRules.clone()}static isIncludedByDetachedLayerRules(e){return Y._detachedLayerRules.isIncluded(e)}listAllTimeSamples(){return this._data.listAllTimeSamples()}listTimeSamplesForPath(e){return this._data.listTimeSamplesForPath(e)}getBracketingTimeSamplesForPath(e,t){return this._data.getBracketingTimeSamplesForPath(e,t)}queryTimeSample(e,t){return this._data.queryTimeSample(e,t)}transferContent(e){if(e===this)return;const t=new Ci;t.copyFrom(e._data),this._replaceData(t)}definePrimSpec(e,t,i="def"){const r=e.split("/").filter(Boolean);for(let n=0;n<r.length;n++){const o=n===0?"/":"/"+r.slice(0,n).join("/"),a=r[n],c="/"+r.slice(0,n+1).join("/");this._addPrimChild(o,a),n<r.length-1&&(this._data.has(c,"specifier")||this._setField(c,"specifier","def"))}t&&this._setField(e,"typeName",t),this._setField(e,"specifier",i)}setAttrDefault(e,t,i){this._setField(`${e}.${t}`,"default",i),this._addProperty(e,t)}setAttrTimeSample(e,t,i,r){const n=`${e}.${t}`;r=uo(r,this.getField(n,"typeName"));const o=this._notifyCreateSpec(n,"attribute");this._stateDelegate.setTimeSample(n,i,r);const a=this.getField(n,"timeSamples");this._data.setTimeSample(n,i,r);const c=this.getField(n,"timeSamples");this._notifyDidChange({kind:"timeSample",path:n,fieldName:"timeSamples",oldValue:a,newValue:c}),o&&this._notifyDidChange({kind:"specAdded",path:n,specType:o,inert:!0}),this._addProperty(e,t)}setAttrCustom(e,t,i){this._setField(`${e}.${t}`,"custom",i),this._addProperty(e,t)}declareProperty(e,t,i){this._setField(`${e}.${t}`,"typeName",i),this._addProperty(e,t)}setRelTargets(e,t,i){const r=`${e}.${t}`;this._setField(r,"typeName","rel"),this._setField(r,"targetPaths",i),this._addProperty(e,t)}setAttrConnections(e,t,i){this._setField(`${e}.${t}`,"connectionPaths",i),this._addProperty(e,t)}setField(e,t,i){this._setField(e,t,i)}eraseField(e,t){if(!this._data.has(e,t))return;this._stateDelegate.setField(e,t,void 0);const i=this._data.get(e,t);this._data.erase(e,t),this._notifyDidChange({kind:"field",path:e,fieldName:t,oldValue:i,newValue:void 0})}_deleteSpec(e){if(!this._data.hasSpec(e))return;this._stateDelegate.deleteSpec(e);const t=e.lastIndexOf("."),i=e.lastIndexOf("/");if(e.indexOf("{")===-1){const[l,u,d]=t>i?[e.slice(0,t),"properties",e.slice(t+1)]:[e.slice(0,i)||"/","primChildren",e.slice(i+1)],h=this._data.get(l,u);Array.isArray(h)&&this._data.set(l,u,h.filter(m=>m!==d))}const r=e==="/"?"/":`${e}/`,n=`${e}.`,o=`${e}{`,c=[e,...this.getSpecPaths().filter(l=>l.startsWith(r)||l.startsWith(n)||l.startsWith(o))].map(l=>({path:l,specType:this._specTypeForPath(l),inert:this._isInertSpec(l)}));for(const{path:l}of c)this._data.eraseSpec(l);c.sort((l,u)=>u.path.length-l.path.length||l.path.localeCompare(u.path));for(const{path:l,specType:u,inert:d}of c)this._notifyDidChange({kind:"specRemoved",path:l,specType:u,inert:d})}_didChangeListeners=new Set;_registerDidChangeListener(e){return this._didChangeListeners.add(e),()=>this._didChangeListeners.delete(e)}_notifyDidChange(e){for(const t of this._didChangeListeners)t(e)}_notifyCreateSpec(e,t){if(this._data.hasSpec(e))return;const i=t??this._specTypeForPath(e);return this._stateDelegate.createSpec(e,i),this._data.createSpec(e,i),i}_specTypeForPath(e){const t=e.lastIndexOf("/");return e==="/"?"pseudoRoot":/\{[^}=]+=\}$/.test(e)?"variantSet":/\{[^}=]+=[^}]+\}$/.test(e)?"variant":e.indexOf(".",t)>=0?"attribute":"prim"}_isInertSpec(e){if(!this._data.hasSpec(e))return!0;const t=this._data.list(e);if(t.length===0)return!0;if(this._data.get(e,"custom")===!0)return!1;const i=this._data.getSpecType(e),r=i==="attribute"||i==="relationship";if(!r){const o=this._data.get(e,"specifier");if(o==="def"||o==="class")return!1;const a=this._data.get(e,"typeName");if(a!=null&&a!=="")return!1}const n=r?el:km;for(const o of t)if(!(!r&&xm.has(o))&&!n.has(o))return!1;return!0}_replaceData(e){const t=c=>{const l=[];return c.visitSpecs({visitSpec:(u,d)=>(l.push(d),!0),done:()=>{}}),l},i=new Set(t(this._data)),r=new Set(t(e)),n=[],o=[],a=[];for(const c of i){const l=this._data.getSpecType(c);(!r.has(c)||e.getSpecType(c)!==l)&&(n.push({path:c,specType:l,inert:this._isInertSpec(c)}),this._stateDelegate.deleteSpec(c))}for(const c of r){const l=e.getSpecType(c),u=i.has(c)&&this._data.getSpecType(c)!==l;(!i.has(c)||u)&&(o.push({path:c,specType:l}),this._stateDelegate.createSpec(c,l));const d=u||!i.has(c)?[]:this._data.list(c),h=new Set([...d,...e.list(c)]);for(const m of h){const p=d.includes(m)?this._data.get(c,m):void 0,y=e.get(c,m);Mi(p,y)||(a.push({path:c,fieldName:m,oldValue:p,newValue:y}),this._stateDelegate.setField(c,m,y))}}for(const c of i)if(!r.has(c))for(const l of this._data.list(c)){const u=this._data.get(c,l);a.push({path:c,fieldName:l,oldValue:u,newValue:void 0}),this._stateDelegate.setField(c,l,void 0)}this._data=e;for(const c of n)this._notifyDidChange({kind:"specRemoved",...c});for(const c of o)this._notifyDidChange({kind:"specAdded",...c,inert:this._isInertSpec(c.path)});for(const c of a)this._notifyDidChange({kind:"field",...c})}_writeField(e,t,i,r="field"){const n=this._data.get(e,t);this._data.set(e,t,i),this._notifyDidChange({kind:r,path:e,fieldName:t,oldValue:n,newValue:i})}_setField(e,t,i,r){t==="default"&&(i=uo(i,this._data.get(e,"typeName")));const n=r??(t==="targetPaths"||t==="typeName"&&i==="rel"?"relationship":void 0),o=this._notifyCreateSpec(e,n);if(this._stateDelegate.setField(e,t,i),this._writeField(e,t,i),o){const a=o==="attribute"||o==="relationship"?el.has(t):this._isInertSpec(e);this._notifyDidChange({kind:"specAdded",path:e,specType:o,inert:a})}}_addPrimChild(e,t){const i=this._notifyCreateSpec(e),r=this._data.get(e,"primChildren")??[];if(!r.includes(t)){this._stateDelegate.pushChild(e,"primChildren",t);const n=[...r,t];this._data.set(e,"primChildren",n),this._notifyDidChange({kind:"field",path:e,fieldName:"primChildren",oldValue:r,newValue:n})}i&&this._notifyDidChange({kind:"specAdded",path:e,specType:i,inert:this._isInertSpec(e)})}_addProperty(e,t){const i=this._notifyCreateSpec(e),r=this._data.get(e,"properties")??[];if(!r.includes(t)){this._stateDelegate.pushChild(e,"properties",t);const n=[...r,t];this._data.set(e,"properties",n),this._notifyDidChange({kind:"field",path:e,fieldName:"properties",oldValue:r,newValue:n})}i&&this._notifyDidChange({kind:"specAdded",path:e,specType:i,inert:this._isInertSpec(e)})}toUsda(){return gp(this)}toUsdc(){return new Jo().writeToBytes(this)}async export(e,t){const i=Tt(e).assetPath.split(".").pop()?.toLowerCase(),r=t,n=typeof r?.get=="function"?r.get("format"):t?.format,o=i==="usda"||i==="usd"&&n==="usda"?new TextEncoder().encode(this.toUsda()):i==="usd"||i==="usdc"?this.toUsdc():void 0;if(!o)return!1;const a=Qs(),c=a.createIdentifierForNewAsset(e),l=await a.resolveForNewAsset(c),u=await a.openAssetForWrite(l,Wi.Replace);if(!u)return!1;try{let d=0;for(;d<o.byteLength;){const h=await u.write(o.subarray(d),d);if(h<=0)return!1;d+=h}return!0}finally{await u.close()}}async save(){if(this.filePath.startsWith("anon:")||fs(this.filePath))return!1;const e=await this.export(Tt(this.filePath).assetPath);return e&&this.markCurrentStateAsClean(),e}async reload(){if(this.filePath.startsWith("anon:")||fs(this.filePath))return!1;const e=Pa(Qs(),this._resolverContext??Qs().getCurrentContext()),t=this._resolverContext??e.getCurrentContext(),i=await tl(e,this.filePath,t,void 0);if(!i.valid)return!1;const r=await e.openAsset(i,t);if(!r)return!1;const n=await r.getBuffer(),o=mt.findByExtension(i.toString());if(!o?.read)return!1;const a=new Ci;a.createSpec("/","pseudoRoot"),a.set("/","specifier","def");const c=n.length>=8&&new TextDecoder().decode(n.subarray(0,8))==="PXR-USDC",l=new Y(this.filePath,a,t,!c||Y._detachedLayerRules.isIncluded(this.filePath),i.toString());return o.read(n,l,Tt(this.filePath).args),this._replaceData(l._data),this._isDetached=l._isDetached,this.markCurrentStateAsClean(),!0}getFileFormat(){return mt.findByExtension(this.filePath)}getExternalAssetDependencies(){return mt.findByExtension(this.filePath)?.getExternalAssetDependencies(this)??[]}}function ho(s,e,t){const i=e??Qs(),r=t??(e?Hh(e):i.getCurrentContext());return Y.findOrOpen(s,i,r)}const Cm=1,Bm=new Set(["half","float","double","timecode","matrix2d","matrix3d","matrix4d","double2","float2","half2","double3","float3","half3","double4","float4","half4","quatd","quatf","quath","point3h","point3f","point3d","vector3h","vector3f","vector3d","normal3h","normal3f","normal3d","color3h","color3f","color3d","color4h","color4f","color4d","texCoord2h","texCoord2f","texCoord2d","texCoord3h","texCoord3f","texCoord3d"]);function Nm(s){if(!s)return!1;const e=s.endsWith("[]")?s.slice(0,-2):s;return Bm.has(e)}function Em(s){return s==="held"||s===0}function sl(s,e,t,i={offset:0,scale:1}){if(!s)return;const r=Yo(i);if(!r)return;const n=qe(r,e),o=t?s.EvalPreValue(n):s.Eval(n);return o!==void 0&&s.IsTimeValued()?qe(i,o):o}function Om(s,e={offset:0,scale:1}){if(!s)return;const t=new Ce(s.GetValueType());t.SetTimeValued(s.IsTimeValued()),t.SetCurveType(s.GetCurveType());const{offset:i,scale:r}=e,n=r>0,o=c=>new Ht(c.mode,n&&c.mode===X.Sloped?c.slope/r:c.slope);t.SetPreExtrapolation(o(s.GetPreExtrapolation())),t.SetPostExtrapolation(o(s.GetPostExtrapolation()));const a=s.GetInnerLoopParams();return t.SetInnerLoopParams(n&&a.protoEnd>a.protoStart?new us(a.protoStart*r+i,a.protoEnd*r+i,a.numPreLoops,a.numPostLoops,a.valueOffset):a),t.SetKnots(s.GetKnots().map(c=>{const l=new Vs(c.GetValueType());l.SetCurveType(c.GetCurveType()),l.SetNextInterpolation(c.GetNextInterpolation()),l.SetTime(n?c.GetTime()*r+i:c.GetTime());const u=d=>n&&s.IsTimeValued()?d*r+i:d;return l.SetValue(u(c.GetValue())),c.IsDualValued()&&l.SetPreValue(u(c.GetPreValue())),l.SetPreTanWidth(n?c.GetPreTanWidth()*r:c.GetPreTanWidth()),l.SetPostTanWidth(n?c.GetPostTanWidth()*r:c.GetPostTanWidth()),l.SetPreTanSlope(n?c.GetPreTanSlope()/r:c.GetPreTanSlope()),l.SetPostTanSlope(n?c.GetPostTanSlope()/r:c.GetPostTanSlope()),l.SetPreTanAlgorithm(c.GetPreTanAlgorithm()),l.SetPostTanAlgorithm(c.GetPostTanAlgorithm()),l.SetCustomData(c.GetCustomData()),l})),t}function Pd(s,e,t){const i=new Array(s.length);for(let r=0;r<s.length;r++){const n=s[r],o=e[r];if(typeof n=="number"&&typeof o=="number")i[r]=n+(o-n)*t;else if(Array.isArray(n)&&Array.isArray(o)&&n.length===o.length){const a=Pd(n,o,t);if(a===null)return null;i[r]=a}else return null}return i}function Ir(s){const e=new DataView(new ArrayBuffer(4));e.setFloat32(0,Math.fround(s));const t=e.getUint32(0),i=t>>>16&32768,r=t>>>23&255,n=t&8388607;let o;if(r===255)o=i|31744|(n?512:0);else{const u=r-127+15;if(u>=31)o=i|31744;else if(u<=0)if(u<-10)o=i;else{const d=n|8388608,h=14-u;let m=d>>>h;const p=d&(1<<h)-1,y=1<<h-1;(p>y||p===y&&m&1)&&m++,o=i|m}else{let d=u<<10|n>>>13;const h=n&8191;(h>4096||h===4096&&d&1)&&d++,o=i|d}}const a=o>>>10&31,c=o&1023,l=o&32768?-1:1;return a===0?l*2**-14*(c/1024):a===31?c?NaN:l*(1/0):l*2**(a-15)*(1+c/1024)}function po(s,e){if(!e)return s;const t=e.replace(/\[\]$/,""),i=t==="half"||t==="quath"||/^(?:color|point|normal|vector|texCoord)[234]h$/.test(t)?Ir:t==="float"||t==="quatf"||/^(?:color|point|normal|vector|texCoord)[234]f$/.test(t)?Math.fround:void 0;return i?typeof s=="number"?i(s):Array.isArray(s)?s.map(r=>po(r,e)):s:s}function il(s,e,t,i){if(!Array.isArray(s)||!Array.isArray(e)||s.length!==4||e.length!==4||!s.every(d=>typeof d=="number")||!e.every(d=>typeof d=="number"))return null;const r=s,n=e;let o=r.reduce((d,h,m)=>d+h*n[m],0),a=!1;o<0&&(o=-o,a=!0);const c=i==="quath"?Ir:i==="quatf"?Math.fround:d=>d;let l,u;if(1-o>1e-5){const d=i==="quath"?Ir(Math.acos(o)):Math.acos(o),h=i==="quath"?Ir(Math.sin(d)):Math.sin(d);l=Math.sin((1-t)*d)/h,u=Math.sin(t*d)/h}else l=1-t,u=t;return a&&(u=-u),r.map((d,h)=>c(c(d*l)+c(n[h]*u)))}function Lm(s,e,t,i){const r=i.endsWith("[]")?i.slice(0,-2):i;if(!r.startsWith("quat"))return null;if(!i.endsWith("[]"))return il(s,e,t,r);if(!Array.isArray(s)||!Array.isArray(e)||s.length!==e.length)return null;const n=[];for(let o=0;o<s.length;o++){const a=il(s[o],e[o],t,r);if(a===null)return null;n.push(a)}return n}function fi(s,e,t,i=!1,r){const n=[...s].sort(([p],[y])=>p-y);if(e<=n[0][0])return n[0][1];if(e>n[n.length-1][0])return n[n.length-1][1];const o=n.find(([p])=>p===e);if(o&&!i)return o[1];let a=0,c=n.length-1;for(;a<c-1;){const p=a+c>>1;n[p][0]<e||n[p][0]===e&&!i?a=p:c=p}const[l,u]=n[a],[d,h]=n[c];if(u instanceof pe)return;if(h instanceof pe||Em(t)||r!==void 0&&!Nm(r))return u;const m=(e-l)/(d-l);if(r?.startsWith("quat")){const p=Lm(u,h,m,r);return p!==null?p:u}if(typeof u=="number"&&typeof h=="number")return po(u+(h-u)*m,r);if(Array.isArray(u)&&Array.isArray(h)&&u.length===h.length){const p=Pd(u,h,m);if(p!==null)return po(p,r)}return u}const Fm=new WeakMap;function Mm(s,e){Fm.get(s)?.(e)}class $m{#s;#t;constructor(e,t){this.#s=e,this.#t=t}GetName(){return this.#s.Name}Load(){return!0}IsLoaded(){return!0}IsPythonModule(){return this.#s.Type==="python"}GetPath(){return this.#s.LibraryPath??this.#s.Root??""}GetResourcePath(){return this.#s.ResourcePath??""}GetDependencies(){return this.#s.Info?.PluginDependencies??{}}MakeResourcePath(e){if(e.startsWith("/"))return e;const t=this.GetResourcePath().replace(/\/+$/,"");return t?`${t}/${e}`:e}FindPluginResource(e){return this.HasResource(e)?this.MakeResourcePath(e):""}IsResource(){return this.#s.Type==="resource"}GetMetadata(){return this.#s.Info??{}}GetMetadataForType(e){return this.#n()[e.GetTypeName()]??{}}DeclaresType(e,t=!1){if(e.IsUnknown())return!1;for(const i of Object.keys(this.#n())){const r=$.FindByName(i);if(t?r.IsA(e):r===e)return!0}return!1}HasResource(e){return Object.prototype.hasOwnProperty.call(this.#t,e)}async GetResource(e){const t=this.#t[e];if(t===void 0)throw new Error(`@pxr/plug: plugin '${this.GetName()}' has no resource '${e}'`);return typeof t=="string"?t:t()}_GetResourceSync(e){const t=this.#t[e];return typeof t=="string"?t:void 0}_declareTypes(){const e=[];for(const[t,i]of Object.entries(this.#n())){if(typeof i!="object"||i===null)continue;const r=i;e.push(this.#i(t,r))}return e}#i(e,t){const i=Array.isArray(t.bases)?t.bases.filter(a=>typeof a=="string").map(a=>$.Declare(a)):[],r=$.Declare(e);return r.GetBaseTypes().some(a=>!a.IsRoot())||$.Declare(e,i),this.#r(r,t),r}#r(e,t){const i=t.alias;if(!(typeof i!="object"||i===null))for(const[r,n]of Object.entries(i)){if(typeof n!="string")continue;const o=$.Declare(r);e.AddAlias(o,n)}}#n(){return this.#s.Info?.Types??{}}}class Ne{static#s;#t=new Map;#i=new Map;#r=new Set;constructor(){}static GetInstance(){return Ne.#s??=new Ne}RegisterPlugins(e,t){const i=[];for(const r of e.Plugins??[]){if(typeof r?.Name!="string"||r.Name===""||this.#t.has(r.Name))continue;const n=new $m(r,t?.[r.Name]??{});this.#t.set(r.Name,n),i.push(n)}for(const r of i)for(const n of r._declareTypes())this.#i.has(n)||this.#i.set(n,r);if(i.length>0)for(const r of[...this.#r])r([...i]);return i}GetPluginForType(e){return e.IsUnknown()?null:this.#i.get(e)??null}GetPluginWithName(e){return this.#t.get(e)??null}GetAllPlugins(){return[...this.#t.values()]}static GetAllDerivedTypes(e){return e.GetAllDerivedTypes()}GetMetadataForType(e){return this.GetPluginForType(e)?.GetMetadataForType(e)??{}}AddDidRegisterPluginsListener(e){return this.#r.add(e),()=>{this.#r.delete(e)}}}const Rm={Plugins:[{Info:{Profiles:{Capabilities:{usd:{docstring:"Root capability for the USD taxonomy.",name:"USD",style:"core",subgraph:"Foundation"},"usd.core":{docstring:"Capabilities introduced by the pxr/usd/usd library.",name:"usd library",predecessors:["usd"],style:"core",subgraph:"Foundation"},"usd.core.colorspace":{docstring:"Authoring and resolution of color space opinions on prims and attributes via UsdColorSpaceAPI / UsdColorSpaceDefinitionAPI.",name:"Color Space",predecessors:["usd.core"],style:"core",subgraph:"Foundation"},"usd.core.fileformat":{docstring:"File formats allow more file types to be referenced.",name:"File Format",predecessors:["usd.core"],style:"core",subgraph:"Foundation"}}},SdfMetadata:{apiSchemas:{appliesTo:"prims",type:"tokenlistop"},fallbackPrimTypes:{appliesTo:["layers"],type:"dictionary"}},Types:{UsdAPISchemaBase:{alias:{UsdSchemaBase:"APISchemaBase"},autoGenerated:!0,bases:["UsdSchemaBase"],schemaIdentifier:"APISchemaBase",schemaKind:"abstractBase"},UsdClipsAPI:{alias:{UsdSchemaBase:"ClipsAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ClipsAPI",schemaKind:"nonAppliedAPI"},UsdCollectionAPI:{alias:{UsdSchemaBase:"CollectionAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"CollectionAPI",schemaKind:"multipleApplyAPI"},UsdColorSpaceAPI:{alias:{UsdSchemaBase:"ColorSpaceAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],impliesCapabilities:["usd.core.colorspace"],schemaIdentifier:"ColorSpaceAPI",schemaKind:"singleApplyAPI"},UsdColorSpaceDefinitionAPI:{alias:{UsdSchemaBase:"ColorSpaceDefinitionAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],impliesCapabilities:["usd.core.colorspace"],schemaIdentifier:"ColorSpaceDefinitionAPI",schemaKind:"multipleApplyAPI"},UsdModelAPI:{alias:{UsdSchemaBase:"ModelAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ModelAPI",schemaKind:"nonAppliedAPI"},UsdSchemaBase:{alias:{UsdSchemaBase:"SchemaBase"},schemaKind:"abstractBase"},UsdTyped:{alias:{UsdSchemaBase:"Typed"},autoGenerated:!0,bases:["UsdSchemaBase"],schemaIdentifier:"Typed",schemaKind:"abstractBase"}}},LibraryPath:"@PLUG_INFO_LIBRARY_PATH@",Name:"usd",ResourcePath:"@PLUG_INFO_RESOURCE_PATH@",Root:"@PLUG_INFO_ROOT@",Type:"library"}]},Vm=`#usda 1.0
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

`;Ne.GetInstance().RegisterPlugins(Rm,{usd:{"generatedSchema.usda":Vm}});function fo(s,e){return`${s}\0${e}`}const mo=new Set(["form","fields"]);function Qe(s){return s.path.lastIndexOf(".")<=s.path.lastIndexOf("/")?"prim":s.layer.getField(s.path,"typeName")==="rel"?"relationship":"attribute"}function Dt(s,e){const t=Qe(s);if(t==="relationship"&&e==="typeName")return;const i=s.layer.getField(s.path,e);if(i!==void 0)return i;if(t!=="prim"){if(e==="custom")return!1;if(e==="variability")return t==="relationship"?"uniform":"varying"}}function Gm(s,e){return Dt(s,e)!==void 0}function Bi(s){const e=Qe(s),t=[];for(const i of s.layer.getFieldNames(s.path))mo.has(i)||C.isDisallowedField(i)||e==="relationship"&&i==="typeName"||t.push(i);return e!=="prim"&&(t.includes("custom")||t.push("custom"),t.includes("variability")||t.push("variability")),t}function bt(s){return typeof s=="object"&&s!==null&&!Array.isArray(s)&&!("isExplicit"in s)}function sn(s,e){const t={...e};for(const[i,r]of Object.entries(s)){const n=t[i];t[i]=bt(r)&&bt(n)?sn(r,n):r}return t}function go(s,e){let t=s;for(const i of e.split(":")){if(!bt(t))return;t=t[i]}return t}class ti{_name;_lap;constructor(e="",t=null){this._name=e,this._lap=t}_requireLap(){if(!this._lap)throw new Error(`UsdPrimDefinition.Property('${this._name}'): accessed data on an invalid property definition`);return this._lap}isValid(){return this._lap!==null}getName(){return this._name}isAttribute(){return this._lap!==null&&Qe(this._lap)==="attribute"}isRelationship(){return this._lap!==null&&Qe(this._lap)==="relationship"}getSpecType(){return Qe(this._requireLap())}listMetadataFields(){return Bi(this._requireLap())}getMetadata(e){const t=this._requireLap();if(!C.isDisallowedField(e))return Dt(t,e)}getMetadataByDictKey(e,t){const i=this._requireLap();if(!C.isDisallowedField(e))return go(i.layer.getField(i.path,e),t)}getVariability(){return Dt(this._requireLap(),"variability")}getDocumentation(){const e=this._requireLap(),t=go(e.layer.getField(e.path,"customData"),"userDocBrief");if(typeof t=="string")return t;const i=e.layer.getField(e.path,"documentation");return typeof i=="string"?i:""}}class rl extends ti{getTypeName(){return Fp(this.getTypeNameToken())}getTypeNameToken(){const e=this._requireLap(),t=e.layer.getField(e.path,"typeName");return typeof t=="string"?t:""}getFallbackValue(){const e=this._requireLap();return e.layer.getField(e.path,"default")}}class nl extends ti{}class ps{_primLap=null;_propMap=new Map;_appliedAPISchemas=[];_properties=[];_locallyDefinedPropertyNames=[];_composedPropertyLayer=null;getPropertyNames(){return[...this._properties]}getLocallyDefinedPropertyNames(){return[...this._locallyDefinedPropertyNames]}getAppliedAPISchemas(){return[...this._appliedAPISchemas]}getSpecType(e){const t=this.getPropertyDefinition(e);return t.isValid()?t.getSpecType():""}hasProperty(e){return e!==""&&this._propMap.has(e)}getAttributeFallbackValue(e){const t=this._propMap.get(e);if(!(!t||e===""))return t.layer.getField(t.path,"default")}getMetadataField(e,t){if(C.isDisallowedField(e))return;if(t===void 0){const r=this._propMap.get("");return r?Dt(r,e):void 0}const i=this.getPropertyDefinition(t);return i.isValid()?i.getMetadata(e):void 0}listMetadataFields(e){if(e===void 0){const i=this._propMap.get("");return i?Bi(i):[]}const t=this.getPropertyDefinition(e);return t.isValid()?t.listMetadataFields():[]}getDocumentation(){return this._primLap?new ti("",this._primLap).getDocumentation():""}getPropertyDocumentation(e){const t=this.getPropertyDefinition(e);return t.isValid()?t.getDocumentation():""}static Property=ti;static Attribute=rl;static Relationship=nl;getPropertyDefinition(e){return e===""?new ti(""):new ti(e,this._propMap.get(e)??null)}getAttributeDefinition(e){const t=e===""?null:this._propMap.get(e)??null;return new rl(e,t&&Qe(t)==="attribute"?t:null)}getRelationshipDefinition(e){const t=e===""?null:this._propMap.get(e)??null;return new nl(e,t&&Qe(t)==="relationship"?t:null)}getMetadataByDictKey(e,t,i){if(C.isDisallowedField(e))return;const r=i===void 0?this._propMap.get(""):i!==""?this._propMap.get(i):void 0;if(r)return go(r.layer.getField(r.path,e),t)}flattenTo(e,t,i){return e instanceof Y?this._flattenToLayer(e,t??"",i??"over"):this._flattenToPrim(e,t)}_flattenToLayer(e,t,i){if(!t.startsWith("/")||t==="/")return!1;if(new Set(e.getSpecPaths()).has(t)){const o=e.getField(t,"properties")??[];for(const a of o)e._deleteSpec(`${t}.${a}`);for(const a of[...e.getFieldNames(t)])mo.has(a)||C.isDisallowedField(a)||e.eraseField(t,a)}else{const o=t.split("/").filter(Boolean);for(let a=0;a<o.length;a++){const c="/"+o.slice(0,a+1).join("/"),l=a===0?"/":"/"+o.slice(0,a).join("/"),u=a===o.length-1;e.getSpecPaths().includes(c)||e.setField(c,"specifier",u?i:"over");const d=e.getField(l,"primChildren")??[];d.includes(o[a])||e.setField(l,"primChildren",[...d,o[a]])}}for(const o of this._properties){const a=this._propMap.get(o);if(!a)continue;const c=`${t}.${o}`,l=Qe(a)==="relationship";for(const u of a.layer.getFieldNames(a.path))mo.has(u)||l&&u==="typeName"||e.setField(c,u,a.layer.getField(a.path,u));e.getField(c,"custom")===void 0&&e.setField(c,"custom",!1),e.getField(c,"variability")===void 0&&e.setField(c,"variability",l?"uniform":"varying")}this._properties.length>0&&e.setField(t,"properties",[...this._properties]);for(const o of this.listMetadataFields()){const a=this.getMetadataField(o);a!==void 0&&e.setField(t,o,a)}e.setField(t,"apiSchemas",{isExplicit:!0,explicitItems:[...this._appliedAPISchemas],deletedItems:[],prependedItems:[],appendedItems:[],orderedItems:[]});const n=this.getDocumentation();return n!==""?e.setField(t,"documentation",n):e.eraseField(t,"documentation"),!0}_flattenToPrim(e,t){let i,r;if(t!==void 0)i=e.path,r=t;else{const a=e.path,c=a.lastIndexOf("/");i=c<=0?"/":a.slice(0,c),r=a.slice(c+1)}const n=i==="/"?`/${r}`:`${i}/${r}`,o=e.getStage();return this._flattenToLayer(o.getEditTarget().getLayer(),n,"over")?o._primHandle(n):null}_copy(){const e=new ps;return e._primLap=this._primLap,e._propMap=new Map(this._propMap),e._appliedAPISchemas=[...this._appliedAPISchemas],e._properties=[...this._properties],e._locallyDefinedPropertyNames=[...this._locallyDefinedPropertyNames],e._composedPropertyLayer=this._composedPropertyLayer,e}_replaceWith(e){this._primLap=e._primLap,this._propMap=new Map(e._propMap),this._appliedAPISchemas=[...e._appliedAPISchemas],this._properties=[...e._properties],this._locallyDefinedPropertyNames=[...e._locallyDefinedPropertyNames],this._composedPropertyLayer=e._composedPropertyLayer}_initializeForTypedSchema(e,t,i){this._primLap={layer:e,path:t},this._mapSchematicsPropertyPaths(i)&&this._propMap.set("",this._primLap),this._applyPropertyOrder()}_initializeForAPISchema(e,t,i,r){this._appliedAPISchemas=[e],this._primLap={layer:t,path:i};const[,n]=C.getTypeNameAndInstance(e);this._mapSchematicsPropertyPaths(r)&&n===""&&this._propMap.set("",this._primLap),this._applyPropertyOrder()}_mapSchematicsPropertyPaths(e){const t=this._primLap,i=t.layer.getField(t.path,"properties");if(!i)return t.layer.getSpecPaths().includes(t.path);for(const r of i)e.includes(r)||this._propMap.has(r)||(this._propMap.set(r,{layer:t.layer,path:`${t.path}.${r}`}),this._properties.push(r));return!0}_applyPropertyOrder(){const e=this.getMetadataField("propertyOrder");if(!Array.isArray(e)||e.length===0)return;const t=new Set(this._properties),i=[],r=new Set;for(const n of e)t.has(n)&&!r.has(n)&&(i.push(n),r.add(n));i.length!==0&&(this._properties=[...i,...this._properties.filter(n=>!r.has(n))])}_composePropertiesFromPrimDef(e){for(const[t,i]of e._propMap)this._addOrComposeProperty(t,i);this._sortAndOrderProperties()}_composePropertiesFromPrimDefInstance(e,t){for(const[i,r]of e._propMap){const n=C.makeMultipleApplyNameInstance(i,t);this._addOrComposeProperty(n,r)}this._sortAndOrderProperties()}_sortAndOrderProperties(){this._properties.sort((e,t)=>Ot(e,t)?-1:Ot(t,e)?1:0),this._applyPropertyOrder()}_addOrComposeProperty(e,t){if(e===""&&!this._propMap.has("")){const n=this._createComposedPrimOrPropertyIfNeeded("",null,t);n&&this._propMap.set("",n);return}const i=this._propMap.get(e);if(i===void 0){this._propMap.set(e,t),e!==""&&this._properties.push(e);return}const r=this._createComposedPrimOrPropertyIfNeeded(e,i,t);r&&this._propMap.set(e,r)}_findOrCreateSpecForComposition(e,t){const i="/ComposedProperties",r=e===""?i:`${i}.${e}`;if(this._composedPropertyLayer){if(e!==""&&this._composedPropertyLayer.getSpecPaths().includes(r))return{layer:this._composedPropertyLayer,path:r}}else this._composedPropertyLayer=Y.createAnonymous("anon:schema-composed-properties");const n=this._composedPropertyLayer;if(n.getSpecPaths().includes(i)||n.setField(i,"specifier","def"),!t)return{layer:n,path:e===""?i:r};const o=Qe(t),a=o==="prim"?i:r;o==="attribute"?n.setField(a,"typeName",t.layer.getField(t.path,"typeName")):o==="relationship"&&n.setField(a,"typeName","rel");for(const c of Bi(t)){const l=Dt(t,c);l!==void 0&&n.setField(a,c,l)}return{layer:n,path:a}}_createComposedPrimOrPropertyIfNeeded(e,t,i){if(t&&!ps._propertyTypesMatch(t,i))return null;const r=Qe(i)==="prim"?["documentation"]:["custom","documentation"];let n=null;for(const o of Bi(i)){let a=Dt(i,o);const c=o==="propertyOrder"||bt(a);if(!(!c&&t&&Gm(t,o))&&!r.includes(o)){if(t&&c){const l=Dt(t,o);if(l!==void 0)if(Array.isArray(l)&&Array.isArray(a)){const u=[...l],d=new Set(u);for(const h of a)d.has(h)||(d.add(h),u.push(h));a=u}else bt(l)&&bt(a)&&(a=sn(l,a))}if(!n&&(n=this._findOrCreateSpecForComposition(e,t),!n))return null;n.layer.setField(n.path,o,a)}}return n}static _propertyTypesMatch(e,t){const i=Qe(e),r=Qe(t);return i==="prim"||r==="prim"?i===r:i!==r?!1:i==="attribute"?e.layer.getField(e.path,"typeName")===t.layer.getField(t.path,"typeName"):!0}_composeOverAndReplaceExistingProperty(e,t,i){const r=this._propMap.get(e);if(!r)return;const n={layer:t,path:`${i}.${e}`};if(!t.getSpecPaths().includes(n.path)||!ps._propertyTypesMatch(n,r))return;for(const a of Bi(r)){if(n.layer.getField(n.path,a)!==void 0)continue;const c=Dt(r,a);c!==void 0&&t.setField(n.path,a,c)}const o=Dt(r,"variability");Dt(n,"variability")!==o&&t.setField(n.path,"variability",o),this._propMap.set(e,n)}_composeWeakerAPIPrimDefinition(e,t,i){const r=o=>{const a=this._appliedAPISchemas.length,c=[];for(const l of o){const[u,d]=C.getTypeNameAndInstance(l),h=C.findSchemaInfo(u);if(!h)continue;const m=fo(h.family,d),p=i.get(m);if(p===void 0)i.set(m,h.version),this._appliedAPISchemas.push(l),c.push(m);else if(p!==h.version){this._appliedAPISchemas.length=a;for(const y of c)i.delete(y);return!1}}return!0},n=e._appliedAPISchemas;if(t===""){if(!r(n))return!1;this._composePropertiesFromPrimDef(e)}else{const o=n.map(a=>C.makeMultipleApplyNameInstance(a,t));if(!r(o))return!1;this._composePropertiesFromPrimDefInstance(e,t)}return!0}}const Ri="__INSTANCE_NAME__";function ol(s){if(s.length<2)return-1;let e=s.length-1;if(!/[0-9]/.test(s[e]))return-1;for(;--e>=0;){if(s[e]==="_")return e;if(!/[0-9]/.test(s[e]))return-1}return-1}function lr(s,e){return s===""?e:e===""?s:`${s}:${e}`}function Tn(s){let e=0;for(;e<s.length;){let t=s.indexOf(":",e);if(t===-1&&(t=s.length),t-e===Ri.length&&s.startsWith(Ri,e))return e;e=t+1}return-1}const Um=new Set(["abstractBase","abstractTyped","concreteTyped","nonAppliedAPI","singleApplyAPI","multipleApplyAPI"]);function Wm(s){const e=s.schemaKind;return typeof e=="string"&&Um.has(e)?e:"invalid"}function Pi(s,e){const t=s[e];return Array.isArray(t)?t.filter(i=>typeof i=="string"):[]}const zm=new Set(["inheritPaths","payload","references","specializes","variantSelection","variantSetNames","customData","active","instanceable","timeSamples","spline","connectionPaths","targetPaths","specifier","connectionChildren","expressionChildren","mapperArgChildren","mapperChildren","primChildren","properties","targetChildren","variantChildren","variantSetChildren","clips","clipSets","kind"]);function jm(s){const e=Ft(s);return e?Ps([],e):[]}function Hm(s){s.length<2||s.sort((e,t)=>Ot(t,e)?-1:Ot(e,t)?1:0)}function al(s,e){const t=s.getField(e,"customData");if(typeof t!="object"||t===null)return[];const i=t.apiSchemaOverridePropertyNames;return Array.isArray(i)?i.filter(r=>typeof r=="string"):[]}const As={NotBuilding:0,Building:1,Complete:2};class C{static#s=null;#t=new Map;#i=new Map;#r=new Map;#n=new Map;#e=new Map;#o=new Map;#a=new Map;#c=new Map;#l=new Map;#u={};#h=new ps;#d=new Map;#p=new Set;constructor(){}static getInstance(){if(!C.#s){const e=new C;C.#s=e;const t=Ne.GetInstance();e.#g(t.GetAllPlugins()),t.AddDidRegisterPluginsListener(i=>{e.#g(i)})}return C.#s}static parseSchemaFamilyAndVersionFromIdentifier(e){const t=ol(e);return t===-1?[e,0]:[e.slice(0,t),parseInt(e.slice(t+1),10)]}static makeSchemaIdentifierForFamilyAndVersion(e,t){return t===0?e:`${e}_${t}`}static isAllowedSchemaFamily(e){return ep(e)&&ol(e)===-1}static isAllowedSchemaIdentifier(e){const t=C.parseSchemaFamilyAndVersionFromIdentifier(e);if(!t)return!1;const[i,r]=t;return C.isAllowedSchemaFamily(i)&&C.makeSchemaIdentifierForFamilyAndVersion(i,r)===e}static findSchemaInfo(e){const t=C.getInstance();return typeof e=="string"?t.#i.get(e)??null:t.#t.get(e)??null}static findSchemaInfoInFamily(e,t){return C.isAllowedSchemaFamily(e)?C.findSchemaInfo(C.makeSchemaIdentifierForFamilyAndVersion(e,t)):null}static findSchemaInfosInFamily(e,t,i){const r=C.getInstance().#r.get(e);if(!r)return[];if(t===void 0)return[...r];switch(i??"all"){case"all":return[...r];case"greaterThan":return r.filter(n=>n.version>t);case"greaterThanOrEqual":return r.filter(n=>n.version>=t);case"lessThan":return r.filter(n=>n.version<t);case"lessThanOrEqual":return r.filter(n=>n.version<=t)}}static getSchemaTypeName(e){return C.findSchemaInfo(e)?.identifier??""}static getTypeFromSchemaTypeName(e){return C.findSchemaInfo(e)?.type??$.GetUnknownType()}static getConcreteSchemaTypeName(e){const t=C.findSchemaInfo(e);return t&&t.kind==="concreteTyped"?t.identifier:""}static getConcreteTypeFromSchemaTypeName(e){const t=C.findSchemaInfo(e);return t&&t.kind==="concreteTyped"?t.type:$.GetUnknownType()}static getAPISchemaTypeName(e){const t=C.findSchemaInfo(e);return t&&C.#m(t.kind)?t.identifier:""}static getAPITypeFromSchemaTypeName(e){const t=C.findSchemaInfo(e);return t&&C.#m(t.kind)?t.type:$.GetUnknownType()}static getTypeFromName(e){return $.FindByName("UsdSchemaBase").FindDerivedByName(e)}static#m(e){return e==="singleApplyAPI"||e==="multipleApplyAPI"||e==="nonAppliedAPI"}static#f(e){return C.findSchemaInfo(e)?.kind??"invalid"}static getSchemaKind(e){return C.#f(e)}static isConcrete(e){return C.#f(e)==="concreteTyped"}static isAbstract(e){const t=C.#f(e);return t==="abstractTyped"||t==="abstractBase"}static isTyped(e){return(typeof e=="string"?C.getTypeFromSchemaTypeName(e):e).IsA($.FindByName("UsdTyped"))}static isAppliedAPISchema(e){const t=C.#f(e);return t==="singleApplyAPI"||t==="multipleApplyAPI"}static isMultipleApplyAPISchema(e){return C.#f(e)==="multipleApplyAPI"}static getTypeNameAndInstance(e){const t=e.indexOf(":");return t===-1?[e,""]:[e.slice(0,t),e.slice(t+1)]}static makeMultipleApplyNameTemplate(e,t){return lr(lr(e,Ri),t)}static makeMultipleApplyNameInstance(e,t){const i=Tn(e);return i===-1?e:e.slice(0,i)+t+e.slice(i+Ri.length)}static getMultipleApplyNameTemplateBaseName(e){const t=Tn(e);if(t===-1)return e;const i=t+Ri.length+1;return i>=e.length?"":e.slice(i)}static isMultipleApplyNameTemplate(e){return Tn(e)!==-1}static isAllowedAPISchemaInstanceName(e,t){if(t===""||!C.isMultipleApplyAPISchema(e))return!1;const i=C.getInstance(),r=i.#o.get(e);if(r&&r.size>0&&!r.has(t))return!1;const n=i.findAppliedAPIPrimDefinition(e);if(!n)return!1;const o=t.split(":");if(o.length===0||o.some(c=>c===""))return!1;const a=o[o.length-1];for(const c of n.getPropertyNames())if(a===C.getMultipleApplyNameTemplateBaseName(c))return!1;return!0}static getAPISchemaCanOnlyApplyToTypeNames(e,t){const i=C.getInstance().#e;if(t!==void 0&&t!==""){const r=i.get(lr(e,t));if(r)return[...r]}return[...i.get(e)??[]]}static getAutoApplyAPISchemas(){return new Map([...C.getInstance().#n].map(([e,t])=>[e,[...t]]))}static isDisallowedField(e){return zm.has(e)}findConcretePrimDefinition(e){return this.#a.get(e)??null}findAbstractPrimDefinition(e){return this.#c.get(e)??null}findAppliedAPIPrimDefinition(e){return this.#l.get(e)?.primDef??null}getEmptyPrimDefinition(){return this.#h}buildComposedPrimDefinition(e,t){if(t.length===0)throw new Error("UsdSchemaRegistry.buildComposedPrimDefinition without applied API schemas is not allowed — use findConcretePrimDefinition instead.");const i=C.isConcrete(e)?this.findConcretePrimDefinition(e):this.findAbstractPrimDefinition(e),r=i?i._copy():new ps,n=new Map;for(const o of r._appliedAPISchemas){const[a,c]=C.getTypeNameAndInstance(o),l=C.findSchemaInfo(a);l&&n.set(fo(l.family,c),l.version)}return this.#b(r,t,n),r}getFallbackPrimTypes(){return Object.fromEntries(Object.entries(this.#u).map(([e,t])=>[e,[...t]]))}#g(e){const t=e.filter(r=>!this.#p.has(r.GetName()));if(t.length===0)return;for(const r of t)this.#p.add(r.GetName());const i=this.#v(t);this.#w(t,i),this.#P()}#P(){const e=new Map(this.#a),t=new Map(this.#c),i=new Map(this.#l);this.#a.clear(),this.#c.clear(),this.#l.clear(),this.#u={},this.#I([...this.#t.values()]);const r=(n,o)=>{for(const[a,c]of n){const l=o.get(a);l&&(l._replaceWith(c),n.set(a,l))}};r(this.#a,e),r(this.#c,t);for(const[n,o]of this.#l){const a=i.get(n);a&&(a.primDef._replaceWith(o.primDef),this.#l.set(n,{primDef:a.primDef,applyExpectsInstanceName:o.applyExpectsInstanceName}))}}#v(e){const t=$.FindByName("UsdSchemaBase"),i=[];for(const r of e){const n=r.GetMetadata().Types;if(!(typeof n!="object"||n===null))for(const o of Object.keys(n)){const a=$.FindByName(o);if(a.IsUnknown()||!(a===t||a.IsA(t))||this.#t.has(a))continue;const c=r.GetMetadataForType(a);if(Object.keys(c).length===0)continue;let l=typeof c.schemaIdentifier=="string"?c.schemaIdentifier:"";if(l===""){const f=t.GetAliases(a);f.length===1&&(l=f[0])}if(l===""||this.#i.has(l))continue;const u=Wm(c),[d,h]=C.parseSchemaFamilyAndVersionFromIdentifier(l),m={identifier:l,type:a,family:d,version:h,kind:u};this.#t.set(a,m),this.#i.set(l,m);let p=this.#r.get(d);p||this.#r.set(d,p=[]);let y=p.findIndex(f=>f.version<h);y===-1&&(y=p.length),p.splice(y,0,m),i.push(m)}}return i}#w(e,t){for(const i of t){if(i.kind!=="singleApplyAPI"&&i.kind!=="multipleApplyAPI")continue;const r=Ne.GetInstance().GetPluginForType(i.type);if(!r)continue;const n=r.GetMetadataForType(i.type),o=Pi(n,"apiSchemaCanOnlyApplyTo");if(o.length>0&&this.#e.set(i.identifier,o),i.kind==="singleApplyAPI"){const a=Pi(n,"apiSchemaAutoApplyTo");a.length>0&&this.#n.set(i.identifier,a)}else{const a=Pi(n,"apiSchemaAllowedInstanceNames");if(a.length>0){let l=this.#o.get(i.identifier);l||this.#o.set(i.identifier,l=new Set);for(const u of a)l.add(u)}const c=n.apiSchemaInstances;if(typeof c=="object"&&c!==null)for(const[l,u]of Object.entries(c)){if(typeof u!="object"||u===null)continue;const d=Pi(u,"apiSchemaCanOnlyApplyTo");d.length>0&&this.#e.set(lr(i.identifier,l),d)}}}for(const i of e){const r=i.GetMetadata().AutoApplyAPISchemas;if(!(typeof r!="object"||r===null))for(const[n,o]of Object.entries(r)){if(typeof o!="object"||o===null)continue;const a=Pi(o,"apiSchemaAutoApplyTo");if(a.length===0)continue;const c=this.#n.get(n);c?c.push(...a):this.#n.set(n,a)}}}#_(){const e=new Map;for(const[t,i]of this.#n){const r=new Set;for(const n of i){const o=this.#i.get(n);if(o&&!r.has(o.type)){r.add(o.type);for(const a of o.type.GetAllDerivedTypes())r.add(a)}}for(const n of r){let o=e.get(n);o||e.set(n,o=[]),o.push(t)}}for(const t of e.values())Hm(t);return e}#I(e){const t=this.#_(),i=new Map,r=[],n=[],o=new Set;for(const a of e){if(!(a.kind==="abstractTyped"||a.kind==="concreteTyped"||a.kind==="multipleApplyAPI"||a.kind==="singleApplyAPI"))continue;const l=this.#A(a.type);o.add(l),a.kind==="abstractTyped"?r.push({info:a,layer:l}):a.kind==="concreteTyped"?n.push({info:a,layer:l}):i.set(a.identifier,{info:a,layer:l,primDef:null,buildStatus:As.NotBuilding})}for(const a of o){const c=a.getField("/","fallbackPrimTypes");if(!(typeof c!="object"||c===null))for(const[l,u]of Object.entries(c))Array.isArray(u)&&(l in this.#u||(this.#u[l]=u.filter(d=>typeof d=="string")))}for(const[a,c]of i)this.#S(c,i,t),this.#l.set(a,{primDef:c.primDef,applyExpectsInstanceName:c.info.kind==="multipleApplyAPI"});for(const{info:a,layer:c}of[...r,...n]){const l=`/${a.identifier}`,u=al(c,l),d=new ps;d._initializeForTypedSchema(c,l,u),d._locallyDefinedPropertyNames=[...d._properties,...u];const h=this.#y(c,l,a,t);h.length>0&&this.#b(d,h,new Map);for(const m of u)d._composeOverAndReplaceExistingProperty(m,c,l);a.kind==="abstractTyped"?this.#c.set(a.identifier,d):this.#a.set(a.identifier,d)}for(const{info:a}of[...r,...n]){const c=a.kind==="abstractTyped"?this.#c.get(a.identifier):this.#a.get(a.identifier);c._locallyDefinedPropertyNames=this.#T(c,a.identifier)}}#A(e){const t=Ne.GetInstance().GetPluginForType(e);if(!t)return Y.createAnonymous("anon:generatedSchema:unowned");const i=this.#d.get(t);if(i)return i;const r=t._GetResourceSync("generatedSchema.usda");let n=null;if(r!==void 0)try{n=Y.createInMemory(`anon:${t.GetName()}:generatedSchema.usda`,r)}catch{n=null}return n??=Y.createAnonymous(`anon:${t.GetName()}:generatedSchema.usda`),this.#d.set(t,n),n}#y(e,t,i,r){let n=jm(e.getField(t,"apiSchemas"));const o=r.get(i.type);if(o&&(n=[...n,...o]),n.length===0)return n;const a=i.kind==="multipleApplyAPI";return n.filter(c=>C.isMultipleApplyNameTemplate(c)===a)}#S(e,t,i){if(e.buildStatus===As.Complete)return!0;e.buildStatus=As.Building;const{info:r,layer:n}=e,o=`/${r.identifier}`,a=al(n,o),c=r.kind==="multipleApplyAPI"?C.makeMultipleApplyNameTemplate(r.identifier,""):r.identifier,l=new ps;l._initializeForAPISchema(c,n,o,a),l._locallyDefinedPropertyNames=[...l._properties,...a],e.primDef=l;const u=this.#y(n,o,r,i);if(u.length===0)return e.buildStatus=As.Complete,!0;const d=new Map;d.set(fo(r.family,""),r.version);let h=!1;for(const m of u){const[p,y]=C.getTypeNameAndInstance(m),f=t.get(p);if(f){if(f.buildStatus===As.Building){h=!0;continue}this.#S(f,t,i)||(h=!0),l._composeWeakerAPIPrimDefinition(f.primDef,y,d);continue}const g=this.#l.get(p);g&&l._composeWeakerAPIPrimDefinition(g.primDef,y,d)}for(const m of a)l._composeOverAndReplaceExistingProperty(m,n,o);return h?(e.buildStatus=As.NotBuilding,!1):(e.buildStatus=As.Complete,!0)}#b(e,t,i){for(const r of t){const[n,o]=C.getTypeNameAndInstance(r),a=this.#l.get(n);if(!a)continue;const c=o!=="";a.applyExpectsInstanceName===c&&e._composeWeakerAPIPrimDefinition(a.primDef,o,i)}}#T(e,t){const i=e._locallyDefinedPropertyNames,r=C.getTypeFromSchemaTypeName(t);if(r.IsUnknown())return i;const n=$.FindByName("UsdTyped"),o=new Set;for(const a of r.GetBaseTypes()){if(a===n)continue;const c=this.#t.get(a);if(!c)continue;const l=c.kind==="concreteTyped"?this.findConcretePrimDefinition(c.identifier):this.findAbstractPrimDefinition(c.identifier);if(l)for(const u of l.getPropertyNames())o.add(u)}return o.size===0?i:i.filter(a=>!o.has(a))}}class ft{static#s=new Map;static#t=null;static{Ne.GetInstance().AddDidRegisterPluginsListener(()=>{for(const[e,t]of ft.#s)t.#e.IsUnknown()?ft.#s.delete(e):t.#a=null})}#i;#r;#n;#e=$.GetUnknownType();#o="";#a=null;constructor(e,t,i){this.#i=e,this.#r=t,this.#n=[...i];const r=n=>{if(n==="")return!1;const o=C.getConcreteTypeFromSchemaTypeName(n);return o.IsUnknown()||(this.#e=o,this.#o=n),!0};r(this.#r)||r(this.#i)}getTypeName(){return this.#i}getAppliedAPISchemas(){return[...this.#n]}getSchemaType(){return this.#e}getSchemaTypeName(){return this.#o}getPrimDefinition(){if(this.#a)return this.#a;const e=C.getInstance();return this.#a=this.#n.length===0?e.findConcretePrimDefinition(this.#o)??e.getEmptyPrimDefinition():e.buildComposedPrimDefinition(this.#o,this.#n),this.#a}static getEmptyPrimType(){return ft.#t??=new ft("","",[])}static _findOrCreatePrimTypeInfo(e,t,i){if(e===""&&t===""&&i.length===0)return ft.getEmptyPrimType();const r=[e,t,...i].join("\0");let n=ft.#s.get(r);return n||(n=new ft(e,t,i),ft.#s.set(r,n)),n}}class qm{constructor(e,t,i){this._stage=e,this._primPath=t,this.name=i}setTargets(e){this._stage._setRelTargets(this._primPath,this.name,e)}addTarget(e){const t=this.getTargets();t.includes(e)||this.setTargets([...t,e])}getTargets(){return this._stage.get(`${this._primPath}.${this.name}`)?.getTargets()??[]}getMetadata(e){return this._stage.get(`${this._primPath}.${this.name}`)?.getMetadata(e)}setMetadata(e,t){return this._stage._setPropertyMetadata(this._primPath,this.name,e,t),!0}}const cl={offset:0,scale:1};class ll{constructor(e,t,i){this._stage=e,this._primPath=t,this._field=i}async addReference(e,t=""){const i=this._stage.getEditTarget().getLayer(),r=i.getField(this._primPath,this._field),n=r?{...r,prependedItems:[...r.prependedItems]}:{isExplicit:!1,explicitItems:[],prependedItems:[],appendedItems:[],deletedItems:[]};n.prependedItems.push({assetPath:e,primPath:t,layerOffset:{...cl}}),await this._stage._ownAuthoringAsync(async()=>{i.setField(this._primPath,this._field,n),await this._stage._recomposeForEdit()})}async setReferences(e){const t=this._stage.getEditTarget().getLayer(),i=e.map(r=>({assetPath:r.assetPath,primPath:r.primPath??"",layerOffset:r.layerOffset?{...r.layerOffset}:{...cl}}));await this._stage._ownAuthoringAsync(async()=>{t.setField(this._primPath,this._field,{isExplicit:!0,explicitItems:i,prependedItems:[],appendedItems:[],deletedItems:[]}),await this._stage._recomposeForEdit()})}async clear(){const e=this._stage.getEditTarget().getLayer();await this._stage._ownAuthoringAsync(async()=>{e.setField(this._primPath,this._field,{isExplicit:!0,explicitItems:[],prependedItems:[],appendedItems:[],deletedItems:[]}),await this._stage._recomposeForEdit()})}}class Km{constructor(e,t){this._stage=e,this._primPath=t}async setSpecializes(e){const t=this._stage.getEditTarget().getLayer();await this._stage._ownAuthoringAsync(async()=>{t.setField(this._primPath,"specializes",{isExplicit:!0,explicitItems:[...e],prependedItems:[],appendedItems:[],deletedItems:[]}),await this._stage._recomposeForEdit()})}async clearSpecializes(){const e=this._stage.getEditTarget().getLayer();await this._stage._ownAuthoringAsync(async()=>{e.setField(this._primPath,"specializes",{isExplicit:!0,explicitItems:[],prependedItems:[],appendedItems:[],deletedItems:[]}),await this._stage._recomposeForEdit()})}getSpecializes(){const e=this._stage.getEditTarget().getLayer().getField(this._primPath,"specializes");return e?e.isExplicit?[...e.explicitItems]:[...e.prependedItems,...e.appendedItems]:[]}}const Ee=Object.freeze({Soft:"soft",Hard:"hard",Minimum:"minimum",Maximum:"maximum"});function vd(s){return s!==null&&typeof s=="object"&&!Array.isArray(s)}function Dn(s){return vd(s)?structuredClone(s):{}}function ul(s,e){return s===void 0||e===void 0?!0:Array.isArray(s)||Array.isArray(e)?Array.isArray(s)&&Array.isArray(e):typeof s==typeof e}class dl{constructor(e,t={},i={},r=""){this.success=e,this.invalidValuesDict=t,this.conformedSubDict=i,this.errorString=r}}class Xm{constructor(e,t=""){this._attr=e,this._subDictKey=t}isValid(){return this._attr!==void 0&&this._subDictKey.length>0}getAttribute(){return this._attr}getSubDictKey(){return this._subDictKey}_limitsDict(){return Dn(this._attr?.getMetadata("limits"))}_subDict(){const e=this._limitsDict()[this._subDictKey];return Dn(e)}_writeSubDict(e){if(!this.isValid())return!1;const t=this._limitsDict();return e===void 0||Object.keys(e).length===0?delete t[this._subDictKey]:t[this._subDictKey]=e,Object.keys(t).length===0?this._attr._clearMetadata("limits"):this._attr.setMetadata("limits",t),!0}hasAuthored(e){const t=this._subDict();return e===void 0?Object.keys(t).length>0:Object.prototype.hasOwnProperty.call(t,e)}clear(e){if(!this.isValid())return!1;if(e===void 0)return this._writeSubDict(void 0);const t=this._subDict();return delete t[e],this._writeSubDict(t)}hasAuthoredMinimum(){return this.hasAuthored(Ee.Minimum)}clearMinimum(){return this.clear(Ee.Minimum)}hasAuthoredMaximum(){return this.hasAuthored(Ee.Maximum)}clearMaximum(){return this.clear(Ee.Maximum)}validate(e){if(!this.isValid()||!vd(e))return new dl(!1,{},{},"Invalid attribute limits");const t=this._attr.get(),i={};for(const n of[Ee.Minimum,Ee.Maximum])n in e&&!ul(t,e[n])&&(i[n]=e[n]);const r=Object.keys(i).length===0;return new dl(r,i,r?structuredClone(e):{},r?"":`Invalid limits values for <${this._attr.primPath}.${this._attr.name}>`)}set(e,t){if(typeof e!="string"){const r=this.validate(e);return r.success&&this._writeSubDict(Dn(r.conformedSubDict))}if(!this.isValid()||e.length===0||(e===Ee.Minimum||e===Ee.Maximum)&&!ul(this._attr.get(),t))return!1;const i=this._subDict();return i[e]=structuredClone(t),this._writeSubDict(i)}get(e){return this._subDict()[e]}getOr(e,t){const i=this.get(e);return i===void 0?t:i}getMinimum(){return this.get(Ee.Minimum)}getMinimumOr(e){return this.getOr(Ee.Minimum,e)}setMinimum(e){return this.set(Ee.Minimum,e)}getMaximum(){return this.get(Ee.Maximum)}getMaximumOr(e){return this.getOr(Ee.Maximum,e)}setMaximum(e){return this.set(Ee.Maximum,e)}}const Ym="backOfPrependList",yo=new WeakMap,Vi=new WeakMap;function Ur(s){const e=s.lastIndexOf("/");return e<=0?"/":s.slice(0,e)}function Ar(s){const e=new Map;for(const t of s.keys()){if(t==="/"||t.includes("."))continue;const i=Ur(t);let r=e.get(i);r||e.set(i,r=[]),r.push(t)}return e}function Zm(s){return yo.get(s)??0}function wd(s){const e=Vi.get(s)??Ar(s),t=new Set;for(const[i,r]of e){const n=r.filter(o=>s.has(o)&&Ur(o)===i);e.set(i,n);for(const o of n)t.add(o)}for(const i of s.keys()){if(i==="/"||i.includes(".")||t.has(i))continue;const r=Ur(i);let n=e.get(r);n||e.set(r,n=[]),n.push(i),t.add(i)}return Vi.set(s,e),e}class Qm{nodes=new Map;_generation=0;constructor(e){for(const[t,i]of e)this.nodes.set(t,i);yo.set(this.nodes,this._generation),Vi.set(this.nodes,Ar(e))}get generation(){return this._generation}replaceAll(e){this.nodes.clear();for(const[t,i]of e)this.nodes.set(t,i);Vi.set(this.nodes,Ar(e)),this.markStructureChanged()}replaceSubtrees(e,t){if(t.length===0)return;if(t.includes("/")){this.replaceAll(e);return}const i=o=>t.some(a=>o===a||o.startsWith(`${a}/`)||o.startsWith(`${a}.`)),r=new Map([...wd(this.nodes)].map(([o,a])=>[o,[...a]])),n=Ar(e);for(const o of[...this.nodes.keys()])i(o)&&this.nodes.delete(o);for(const[o,a]of e)i(o)&&this.nodes.set(o,a);for(const o of t){for(const l of[...r.keys()])(l===o||l.startsWith(`${o}/`))&&r.delete(l);for(const[l,u]of n)(l===o||l.startsWith(`${o}/`))&&r.set(l,[...u]);const a=Ur(o);let c=r.get(a)??[];this.nodes.has(o)?c.includes(o)||(c=[...c,o]):c=c.filter(l=>l!==o),r.set(a,c)}Vi.set(this.nodes,r),this.markStructureChanged()}replacePrims(e,t){if(t.length===0)return;const i=r=>t.some(n=>r===n||r.startsWith(`${n}.`));for(const r of[...this.nodes.keys()])i(r)&&this.nodes.delete(r);for(const[r,n]of e)i(r)&&this.nodes.set(r,n);this.markStructureChanged()}markStructureChanged(){this._generation+=1,yo.set(this.nodes,this._generation)}}const vi=N.absoluteRootPath,So=N.emptyPath;function Lt(s){return s.pathElementCount}function ea(s,e){return e.isEmpty()||s.isEmpty()?!1:e.isAbsoluteRootPath()?s.isAbsolutePath():s.hasPrefix(e)}function Ts(s){return s.getParentPath()}function ur(s){return s.name}function hl(s){return s.isAbsoluteRootPath()}function Gi(s,e){return s.pathString===e.pathString}function pl(s,e){const t=Lt(s[0]),i=Lt(e[0]);if(t!==i)return t-i;const r=s[0].pathString,n=e[0].pathString;return r<n?-1:r>n?1:0}function bo(s,e,t){return t.isEmpty()?So:s.replacePrefix(e,t)}function Po(s,e){let t=-1,i=-1;for(let r=0;r<e.length;r++)if(ea(s,e[r][0])){const n=Lt(e[r][0]);n>i&&(i=n,t=r)}return t}function _d(s,e,t=0){let i=-1,r=t;for(let n=0;n<e.length;n++){const o=Lt(e[n][1]);o>=r&&ea(s,e[n][1])&&(r=o,i=n)}return i}function vo(s,e,t,i){const r=t<0?0:Lt(i?e[t][0]:e[t][1]),n=i?Jm(s,e,r):_d(s,e,r);return n!==-1&&n!==t}function Jm(s,e,t){let i=-1,r=t-1;for(let n=0;n<e.length;n++){const o=Lt(e[n][0]);o>=t&&o>r&&ea(s,e[n][0])&&(r=o,i=n)}return i}function eg(s,e){const t=s[e][0],i=s[e][1];if(i.isEmpty()){const u=Po(Ts(t),s);if(u===-1||s[u][1].isEmpty())return!0;const d=bo(t,s[u][0],s[u][1]);return vo(d,s,u,!1)}if(ur(t)!==ur(i))return!1;const n=Po(Ts(t),s);if(n===-1||s[n][1].isEmpty())return!1;const o=s[n][0],a=s[n][1];if(hl(o)&&hl(a)&&Gi(t,i))return!0;if(Lt(i)-Lt(a)!==Lt(t)-Lt(o))return!1;let c=Ts(t),l=Ts(i);for(;!Gi(c,o);){if(ur(c)!==ur(l))return!1;c=Ts(c),l=Ts(l)}return Gi(a,l)?!vo(Ts(i),s,n,!1):!1}function tg(s){const e=s.slice();for(let i=0;i<e.length;)eg(e,i)?e.splice(i,1):i++;let t=!1;return e.length>0&&e[0][0].isAbsoluteRootPath()&&e[0][1].isAbsoluteRootPath()&&(e.shift(),t=!0),{pairs:e,hasRootIdentity:t}}function fl(s){return typeof s=="string"?N.fromString(s):s}class j{_pairs;_hasRootIdentity;_offset;constructor(e,t,i){this._pairs=e,this._hasRootIdentity=t,this._offset=i}static _fromCanonical(e,t,i){return new j(e,t,i)}static _build(e,t){const i=e.slice().sort(pl),{pairs:r,hasRootIdentity:n}=tg(i);return new j(r,n,t)}static create(e,t=ds){const r=[...e instanceof Map?[...e.entries()]:e].map(([n,o])=>[fl(n),fl(o)]);return j._build(r,t)}static identity(){return new j([],!0,ds)}static null(){return new j([],!1,ds)}isNull(){return this._pairs.length===0&&!this._hasRootIdentity&&wn(this._offset)}isIdentity(){return this.isIdentityPathMapping()&&wn(this._offset)}isIdentityPathMapping(){return this._hasRootIdentity&&this._pairs.length===0}hasRootIdentity(){return this._hasRootIdentity}getTimeOffset(){return this._offset}getSourceToTargetMap(){const e=new Map;this._hasRootIdentity&&e.set(vi.pathString,vi.pathString);for(const[t,i]of this._pairs)e.set(t.pathString,i.pathString);return e}_map(e,t){if(e.containsPrimVariantSelection()){const i=this._mapNoVariants(e.stripAllVariantSelections(),t);return i.isEmpty()?i:e.reapplyVariantSelectionsOnto(i)}return this._mapNoVariants(e,t)}_mapNoVariants(e,t){const i=t?_d(e,this._pairs):Po(e,this._pairs);let r;return i===-1?r=this._hasRootIdentity?e:So:t?r=bo(e,this._pairs[i][1],this._pairs[i][0]):r=bo(e,this._pairs[i][0],this._pairs[i][1]),r.isEmpty()?r:vo(r,this._pairs,i,t)?So:r}mapSourceToTarget(e){return this._map(e,!1)}mapTargetToSource(e){return this._map(e,!0)}compose(e){if(this.isIdentity())return e;if(e.isIdentity())return this;const t=[],i=new Set;this._hasRootIdentity&&e._hasRootIdentity&&(t.push([vi,vi]),i.add(vi.pathString));for(const[r,n]of e._pairs)t.push([r,this.mapSourceToTarget(n)]),i.add(r.pathString);for(const[r,n]of this._pairs){const o=e.mapTargetToSource(r);o.isEmpty()||i.has(o.pathString)||(i.add(o.pathString),t.push([o,n]))}return j._build(t,Mt(this._offset,e._offset))}composeOffset(e){return new j(this._pairs,this._hasRootIdentity,Mt(this._offset,e))}getInverse(){const e=this._pairs.map(([i,r])=>[r,i]);e.sort(pl);const t=Yo(this._offset)??ds;return j._fromCanonical(e,this._hasRootIdentity,t)}static impliedClass(e,t){if(e.isIdentity())return t;const i=e.compose(t.compose(e.getInverse()));return new j(i._pairs,!0,i._offset)}addRootIdentity(){return this._hasRootIdentity?this:new j(this._pairs,!0,this._offset)}equals(e){if(this._hasRootIdentity!==e._hasRootIdentity||!jp(this._offset,e._offset)||this._pairs.length!==e._pairs.length)return!1;for(let t=0;t<this._pairs.length;t++)if(!Gi(this._pairs[t][0],e._pairs[t][0])||!Gi(this._pairs[t][1],e._pairs[t][1]))return!1;return!0}toString(){const e=[...this.getSourceToTargetMap()].map(([t,i])=>`${t} -> ${i||"(block)"}`);return wn(this._offset)||e.push(`offset=${this._offset.offset} scale=${this._offset.scale}`),`{ ${e.join(", ")} }`}}function Id(s){return s.addRootIdentity()}function sg(s,e,t,i){switch(s){case 4:return!0;case 1:return!1;case 0:return i.hasRootIdentity();case 3:return!!(e&&e.alwaysHasIdentity&&t&&t.alwaysHasIdentity);case 5:return!0;default:return!!(e&&e.alwaysHasIdentity)||!!(t&&t.alwaysHasIdentity)}}function ig(s,e,t,i){const r=e?e.id:"-",n=t?t.id:"-",o=s===0?i.toString():"";return`${s}|${r}|${n}|${o}`}let rg=0;class gt{id;op;arg1;arg2;constant;alwaysHasIdentity;_cachedValue=null;_valueForVariable=j.null();dependents=new Set;static _registry=new Map;constructor(e,t,i,r){this.id=rg++,this.op=e,this.arg1=t,this.arg2=i,this.constant=r,this.alwaysHasIdentity=sg(e,t,i,r),t&&t.dependents.add(this),i&&i.dependents.add(this)}static create(e,t=null,i=null,r=j.null()){if(e!==1){const n=ig(e,t,i,r),o=gt._registry.get(n);if(o)return o;const a=new gt(e,t,i,r);return gt._registry.set(n,a),a}return new gt(e,t,i,r)}evaluate(){if(this._cachedValue!==null)return this._cachedValue;const e=this._evaluateUncached();return this._cachedValue=e,e}_evaluateUncached(){switch(this.op){case 0:return this.constant;case 1:return this._valueForVariable;case 2:return this.arg1.evaluate().getInverse();case 3:return this.arg1.evaluate().compose(this.arg2.evaluate());case 4:return Id(this.arg1.evaluate());case 5:return j.impliedClass(this.arg1.evaluate(),this.arg2.evaluate());default:throw new Error("PcpMapExpression: unhandled op")}}_invalidate(){if(this._cachedValue!==null){this._cachedValue=null;for(const e of this.dependents)e._invalidate()}}setValueForVariable(e){if(this.op!==1)throw new Error("PcpMapExpression: cannot set value for non-variable");if(!this._valueForVariable.equals(e)){this._valueForVariable=e,this._cachedValue=null;for(const t of this.dependents)t._invalidateExternal()}}_invalidateExternal(){this._invalidate()}getValueForVariable(){return this._valueForVariable}}class ng{constructor(e){this._node=e}getValue(){return this._node.getValueForVariable()}setValue(e){this._node.setValueForVariable(e)}getExpression(){return we._fromNode(this._node)}}class we{_node;constructor(e){this._node=e}static _fromNode(e){return new we(e)}static null(){return new we(null)}evaluate(){return this._node?this._node.evaluate():j.null()}isNull(){return this._node===null}static identity(){return we.constant(j.identity())}static constant(e){return new we(gt.create(0,null,null,e))}static newVariable(e){const t=gt.create(1),i=new ng(t);return i.setValue(e),i}isConstantIdentity(){return this._node!==null&&this._node.op===0&&this._node.constant.isIdentity()}compose(e){return this.isConstantIdentity()?e:e.isConstantIdentity()?this:this._node.op===0&&e._node.op===0?we.constant(this.evaluate().compose(e.evaluate())):new we(gt.create(3,this._node,e._node))}inverse(){return this.isConstantIdentity()?this:this._node.op===0?we.constant(this.evaluate().getInverse()):new we(gt.create(2,this._node))}addRootIdentity(){return this.isConstantIdentity()?this:this._node.op===0?we.constant(Id(this.evaluate())):this._node.alwaysHasIdentity?new we(this._node):new we(gt.create(4,this._node))}static impliedClass(e,t){return e.isConstantIdentity()?t:e._node.op===0&&t._node.op===0?we.constant(j.impliedClass(e.evaluate(),t.evaluate())):new we(gt.create(5,e._node,t._node))}isIdentity(){return this.evaluate().isIdentity()}mapSourceToTarget(e){return this.evaluate().mapSourceToTarget(N.fromString(e)).pathString}mapTargetToSource(e){return this.evaluate().mapTargetToSource(N.fromString(e)).pathString}}var x=(s=>(s[s.Root=0]="Root",s[s.Inherit=1]="Inherit",s[s.Variant=2]="Variant",s[s.Relocate=3]="Relocate",s[s.Reference=4]="Reference",s[s.Payload=5]="Payload",s[s.Specialize=6]="Specialize",s))(x||{});function Ad(s){return s===1}function gs(s){return s===6}function cs(s){return s===1||s===6}function F(s){return s.pathString}function og(s,e,t){return{rootLayer:s,...e?{sessionLayer:e}:{}}}function Yt(s){return`${s.rootLayer.filePath}\0${s.sessionLayer?.filePath??""}\0${s.expressionVariablesOverrideSource?.getKey()??"<root>"}`}function Pe(s,e){return{layerStack:s,path:e}}class ag{constructor(e,t){this.layerStack=e,this.path=t}equals(e){return this.layerStack===e.layerStack&&this.path.pathString===e.path.pathString}toString(){return`${wo(this.layerStack.identifier)}<${this.path.pathString}>`}}function wo(s){let e=`@${s.rootLayer.filePath}@`;return s.sessionLayer&&(e+=`,@${s.sessionLayer.filePath}@`),e}var Tr=(s=>(s[s.ArcCycle=0]="ArcCycle",s[s.ArcPermissionDenied=1]="ArcPermissionDenied",s[s.ArcToProhibitedChild=2]="ArcToProhibitedChild",s[s.IndexCapacityExceeded=3]="IndexCapacityExceeded",s[s.ArcCapacityExceeded=4]="ArcCapacityExceeded",s[s.ArcNamespaceDepthCapacityExceeded=5]="ArcNamespaceDepthCapacityExceeded",s[s.InconsistentPropertyType=6]="InconsistentPropertyType",s[s.InconsistentAttributeType=7]="InconsistentAttributeType",s[s.InconsistentAttributeVariability=8]="InconsistentAttributeVariability",s[s.InternalAssetPath=9]="InternalAssetPath",s[s.InvalidPrimPath=10]="InvalidPrimPath",s[s.InvalidAssetPath=11]="InvalidAssetPath",s[s.InvalidInstanceTargetPath=12]="InvalidInstanceTargetPath",s[s.InvalidExternalTargetPath=13]="InvalidExternalTargetPath",s[s.InvalidTargetPath=14]="InvalidTargetPath",s[s.InvalidReferenceOffset=15]="InvalidReferenceOffset",s[s.InvalidSublayerOffset=16]="InvalidSublayerOffset",s[s.InvalidSublayerOwnership=17]="InvalidSublayerOwnership",s[s.InvalidSublayerPath=18]="InvalidSublayerPath",s[s.InvalidVariantSelection=19]="InvalidVariantSelection",s[s.MutedAssetPath=20]="MutedAssetPath",s[s.InvalidAuthoredRelocation=21]="InvalidAuthoredRelocation",s[s.InvalidConflictingRelocation=22]="InvalidConflictingRelocation",s[s.InvalidSameTargetRelocations=23]="InvalidSameTargetRelocations",s[s.OpinionAtRelocationSource=24]="OpinionAtRelocationSource",s[s.PrimPermissionDenied=25]="PrimPermissionDenied",s[s.PropertyPermissionDenied=26]="PropertyPermissionDenied",s[s.SublayerCycle=27]="SublayerCycle",s[s.TargetPermissionDenied=28]="TargetPermissionDenied",s[s.UnresolvedPrimPath=29]="UnresolvedPrimPath",s[s.VariableExpressionError=30]="VariableExpressionError",s))(Tr||{});class Pt{constructor(){}toString(){return this.message}}var Ni=(s=>(s[s.TargetIsConflictSource=0]="TargetIsConflictSource",s[s.SourceIsConflictTarget=1]="SourceIsConflictTarget",s[s.TargetIsConflictSourceDescendant=2]="TargetIsConflictSourceDescendant",s[s.SourceIsConflictSourceDescendant=3]="SourceIsConflictSourceDescendant",s))(Ni||{});class cg extends Pt{}class lg extends Pt{}class ug extends Pt{}class dg extends Pt{}class hg extends Pt{}class pg extends hg{}class fg extends Pt{}class ta extends Pt{}class mg extends ta{}class gg extends ta{}class yg extends ta{}class Sg extends Pt{}class bg extends Pt{}class Pg extends Pt{}class vg extends Pt{}function Xe(s,e){return Object.assign(Object.create(s),e)}function wg(s){return`@${s.rootLayer.filePath}@`+(s.sessionLayer?`,@${s.sessionLayer.filePath}@`:"")}function Dr(s){return`${wg(s.layerStack)}<${s.path}>`}function Wr(s,e){return`@${s?.filePath??"<expired>"}@<${e}>`}const sa={[x.Root]:"root",[x.Inherit]:"inherit",[x.Relocate]:"relocate",[x.Variant]:"variant",[x.Reference]:"reference",[x.Payload]:"payload",[x.Specialize]:"specialize"};function _g(s){let e=`Cycle detected:
`;for(let t=0;t<s.length;t++){const i=s[t];if(t>0)if(t+1<s.length)switch(i.arcType){case x.Inherit:e+=`inherits from:
`;break;case x.Relocate:e+=`is relocated from:
`;break;case x.Variant:e+=`uses variant:
`;break;case x.Reference:e+=`references:
`;break;case x.Payload:e+=`gets payload from:
`;break;default:e+=`refers to:
`;break}else switch(e+="CANNOT ",i.arcType){case x.Inherit:e+=`inherit from:
`;break;case x.Relocate:e+=`be relocated from:
`;break;case x.Variant:e+=`use variant:
`;break;case x.Reference:e+=`reference:
`;break;case x.Payload:e+=`get payload from:
`;break;default:e+=`refer to:
`;break}e+=`${Dr(i.site)}
`,t>0&&t+1<s.length&&(e+="which ")}return Xe(cg.prototype,{errorType:0,rootSite:s[0].site,cycle:s,message:e})}function Ig(s){return Xe(Pg.prototype,{errorType:29,...s,message:`Unresolved ${sa[s.arcType]} prim path ${Wr(s.targetLayer,s.unresolvedPath)} introduced by ${Wr(s.sourceLayer,s.site.path)}`})}function xn(s){const e={[x.Root]:"refer to",[x.Inherit]:"inherit from",[x.Relocate]:"be relocated from",[x.Variant]:"use variant",[x.Reference]:"reference",[x.Payload]:"get payload from",[x.Specialize]:"refer to"};return Xe(lg.prototype,{errorType:2,...s,message:`${Dr(s.site)}
CANNOT ${e[s.arcType]}:
${Dr(s.targetSite)}
which is a prohibited child of its parent because it would require allowing opinions from the source of a relocation at ${Dr(s.relocationSourceSite)}.`})}function Ag(s){return Xe(pg.prototype,{errorType:11,...s,message:`Could not open asset @${s.resolvedAssetPath}@ for ${sa[s.arcType]} introduced by ${Wr(s.sourceLayer,s.site.path)}`+(s.messages?` -- ${s.messages}`:"")+"."})}function ml(s){return Xe(dg.prototype,{errorType:10,...s,message:`Invalid ${sa[s.arcType]} path <${s.primPath}> introduced by ${Wr(s.sourceLayer,s.site.path)}-- must be an absolute prim path with no variant selections.`})}function Tg(s){const e=t=>t==="attribute"?"an attribute":"a relationship";return Xe(ug.prototype,{errorType:6,...s,message:`The property <${s.rootSite.path}> has inconsistent spec types.  The defining spec is @${s.definingLayerIdentifier}@<${s.definingSpecPath}> and is ${e(s.definingSpecType)} spec.  The conflicting spec is @${s.conflictingLayerIdentifier}@<${s.conflictingSpecPath}> and is ${e(s.conflictingSpecType)} spec.  The conflicting spec will be ignored.`})}function Td(s){const e=s.sourcePath==="/"?`in @${s.sourceLayer.filePath}@`:`at ${s.sourcePath} in @${s.sourceLayer.filePath}@`;return Xe(vg.prototype,{errorType:30,...s,message:`Error evaluating expression ${s.expression.slice(0,32)} for ${s.context} ${e}: ${s.expressionError}`})}function Dg(s){return Xe(bg.prototype,{errorType:27,...s,message:`Sublayer hierarchy with root layer @${s.layer.filePath}@ has cycles. Detected when layer @${s.sublayer.filePath}@ was seen in the layer stack for the second time.`})}function xg(s){return Xe(fg.prototype,{errorType:17,...s,message:`The following sublayers for layer @${s.layer.filePath}@ have the same owner '${s.owner}': `+s.sublayers.map(e=>`@${e.filePath}@`).join(", ")})}function kg(s){return Xe(mg.prototype,{errorType:21,...s,message:`Relocation from <${s.sourcePath}> to <${s.targetPath}> authored at @${s.layer.filePath}@<${s.owningPath}> is invalid and will be ignored: `+s.messages})}const Cg={0:"The target of a relocate cannot be the source of another relocate in the same layer stack.",1:"The source of a relocate cannot be the target of another relocate in the same layer stack.",2:"The target of a relocate cannot be a descendant of the source of another relocate.",3:"The source of a relocate cannot be a descendant of the source of another relocate."};function Bg(s){return Xe(gg.prototype,{errorType:22,...s,message:`Relocation from <${s.sourcePath}> to <${s.targetPath}> authored at @${s.layer.filePath}@<${s.owningPath}> conflicts with another relocation from <${s.conflictSourcePath}> to <${s.conflictTargetPath}> authored at @${s.conflictLayer.filePath}@<${s.conflictOwningPath}> and will be ignored: `+Cg[s.conflictReason]})}function Ng(s){const e=s.sources.map(t=>`relocation from <${t.sourcePath}> authored at @${t.layer.filePath}@<${t.owningPath}>`).join("; ");return Xe(yg.prototype,{errorType:23,...s,message:`The path <${s.targetPath}> is the target of multiple relocations from different sources. The following relocates to this target are invalid and will be ignored: ${e}.`})}function Eg(s){return Xe(Sg.prototype,{errorType:24,...s,message:`The layer @${s.layer.filePath}@ has an invalid opinion at the relocation source path <${s.path}>, which will be ignored.`})}async function ia(s,e,t,i=s.current){return i?hi(i,e,t):await t(void 0)}function Og(s,e,t,i=s.current){return i?ji(i,e,t):t(void 0)}function ra(s,e,t){s&&_e(s,e,t)}function ss(s){const e=s.lastIndexOf("/");return e<=0?"/":s.slice(0,e)}function gl(s,e){return s===e||e.startsWith(s+"/")}function Lg(s,e,t){return s===e?t:s.startsWith(e+"/")?t+s.slice(e.length):s}async function _o(s,e,t,i,r,n,o,a,c,l){n.push({layer:s,offset:t});const u=s.getField("/","subLayers");if(!u||u.length===0)return;const d=s.getField("/","subLayerOffsets")??[],h=new Map(r).set(s.filePath,s),m=[];for(let p=0;p<u.length;p++){let y=u[p];if(vs(y)){const v=Qi(y,o);if(v.errors.length>0&&l.push(Td({rootSite:{...c,path:""},expression:y,expressionError:v.errors.join("; "),context:"sublayer",sourceLayer:s,sourcePath:"/"})),typeof v.value!="string"||v.value==="")continue;y=v.value}const f=s.resolveAsset(y);if(!f)continue;const g=h.get(f);if(g!==void 0){l.push(Dg({rootSite:c,layer:s,sublayer:g}));continue}const S=await e(f);if(!S)continue;const b=Io(S),P=d[p]??ds,w=i===b?P:{offset:P.offset,scale:P.scale*i/b},_=Mt(t,w);m.push({layer:S,offset:_,tcps:b})}if(a&&s.getField("/","hasOwnedSubLayers")===!0){const p=f=>f.layer.getField("/","owner")===a;m.sort((f,g)=>Number(p(g))-Number(p(f)));const y=m.filter(p).map(f=>f.layer);y.length>1&&l.push(xg({rootSite:c,owner:a,layer:s,sublayers:y}))}for(const p of m)await _o(p.layer,e,p.offset,p.tcps,h,n,o,a,c,l)}function Io(s){const e=s.getField("/","timeCodesPerSecond");if(typeof e=="number")return e;const t=s.getField("/","framesPerSecond");return typeof t=="number"?t:24}function Fg(s,e){const t=n=>n.startsWith("/")?n.includes("{")?"Relocates cannot have any variant selections.":n.includes(".")?"Only prims can be relocated.":null:"Relocates must use absolute paths.";if(!s)return"Relocates source paths cannot be empty.";const i=t(s);if(i!==null)return i;if(ss(s)==="/")return"Root prims cannot be the source of a relocate.";if(!e)return null;const r=t(e);return r!==null?r:s===e?"The target of a relocate cannot be the same as its source.":gl(s,e)?"The target of a relocate cannot be a descendant of its source.":gl(e,s)?"The target of a relocate cannot be an ancestor of its source.":null}function Mg(s,e,t){const i=new Map,r=new Map,n=[],o=(y,f,g,S)=>{const b=f??"",P=Fg(y,b);if(P!==null){t.push(kg({rootSite:e,sourcePath:y,targetPath:b,layer:g,owningPath:S,messages:P}));return}if(i.has(y))return;i.set(y,b),r.set(y,{layer:g,owningPath:S});const w=ss(y);w!=="/"&&!n.includes(w)&&n.push(w)},a=(y,f)=>f.startsWith("/")?f:`${y==="/"?"":y}/${f}`;for(const{layer:y}of s){const f=y.getField("/","layerRelocates");if(f){const g=Array.isArray(f)?f:Object.entries(f);for(const[S,b]of g)o(S,b,y,"/")}for(const g of y.getSpecPaths()){const S=y.getField(g,"relocates");if(!S)continue;const b=Array.isArray(S)?S:Object.entries(S);for(const[P,w]of b)o(a(g,P),w&&a(g,w),y,g)}}{const y=new Map,f=new Set,g=new Map,S=[],b=w=>r.get(w),P=(w,_,v)=>{const A=b(w),T=b(_);S.push(Bg({rootSite:e,sourcePath:w,targetPath:i.get(w),layer:A.layer,owningPath:A.owningPath,conflictSourcePath:_,conflictTargetPath:i.get(_),conflictLayer:T.layer,conflictOwningPath:T.owningPath,conflictReason:v}))};for(const[w,_]of[...i].sort(([v],[A])=>v.localeCompare(A))){if(_){const v=y.get(_);if(v!==void 0){f.add(v),f.add(w);let A=g.get(_);A||g.set(_,A=new Set([v])),A.add(w)}else y.set(_,w);i.has(_)&&(f.add(w),f.add(_),P(w,_,Ni.TargetIsConflictSource),P(_,w,Ni.SourceIsConflictTarget));for(let A=ss(_);A!=="/";A=ss(A))i.has(A)&&(f.add(w),P(w,A,Ni.TargetIsConflictSourceDescendant))}for(let v=ss(w);v!=="/"&&ss(v)!=="/";v=ss(v))i.has(v)&&(f.add(w),P(w,v,Ni.SourceIsConflictSourceDescendant))}for(const[w,_]of[...g].sort(([v],[A])=>v.localeCompare(A)))t.push(Ng({rootSite:{...e,path:""},targetPath:w,sources:[..._].sort().map(v=>({sourcePath:v,...b(v)}))}));S.sort((w,_)=>w.sourcePath.localeCompare(_.sourcePath)||w.conflictReason-_.conflictReason||w.conflictSourcePath.localeCompare(_.conflictSourcePath)),t.push(...S);for(const w of f)i.delete(w)}const c=new Map(i),l=new Map;for(const[y,f]of i)f&&l.set(f,y);const u=l,d=new Map,h=y=>{const f=d.get(y);if(f!==void 0)return f;d.set(y,y);for(let g=y;g!=="/";g=ss(g)){const S=u.get(g);if(S!==void 0){d.set(y,Lg(y,g,h(S)));break}}return d.get(y)},m=new Map,p=new Map;for(const[y,f]of i){if(!f)continue;const g=h(y);m.set(g,f),p.set(f,g)}return{combinedS2T:m,combinedT2S:p,incrementalS2T:c,incrementalT2S:l,primPaths:n}}function yl(s,e){return s===e||s.startsWith(e+"/")}function $g(s,e){const t=new Map,i=new Set;for(const[r,n]of s.relocatesSourceToTarget)yl(r,e)&&n&&(t.set(r,n),i.add(n));for(const[r,n]of s.incrementalRelocatesSourceToTarget)yl(r,e)&&n&&(i.has(n)||(i.add(n),t.set(r,n)));return t.set("/","/"),j.create(t)}function Rg(s){const e=new Map;return t=>{if(!s.hasRelocates)return we.null();let i=e.get(t);return i||(i=we.newVariable($g(s,t)),e.set(t,i)),i.getExpression()}}async function Sl(s,e,t,i){return ia(i,"usd-ts:computePcpLayerStack",async r=>(ra(r,"rootLayer",s.filePath),Vg(s,e,t,i,r)))}async function Vg(s,e,t,i,r){const n=s.getField("/","expressionVariables")??{},o=t?t.getField("/","expressionVariables")??{}:{},a={...n,...o},c=t?String(t.getField("/","sessionOwner")??""):"",l=og(s,t),u=Pe(l,"/"),d=[],h=[],m=Io(s),p=t?Io(t):m,f=t!==void 0&&(typeof t.getField("/","timeCodesPerSecond")=="number"||s.getField("/","timeCodesPerSecond")===void 0&&typeof t.getField("/","framesPerSecond")=="number")?p:m;t&&await _o(t,e,{offset:0,scale:f/p},p,new Map,h,a,c,u,d),await _o(s,e,{offset:0,scale:f/m},m,new Map,h,a,c,u,d);const g=Og(i,"usd-ts:computeRelocations",()=>Mg(h,u,d),r),S={identifier:l,timeCodesPerSecond:f,layers:h,ownExpressionVariables:a,relocatesSourceToTarget:g.combinedS2T,relocatesTargetToSource:g.combinedT2S,incrementalRelocatesSourceToTarget:g.incrementalS2T,incrementalRelocatesTargetToSource:g.incrementalT2S,pathsToPrimsWithRelocates:g.primPaths,hasRelocates:g.incrementalS2T.size>0,localErrors:d,getExpressionForRelocatesAtPath:void 0},b=Rg(S);return S.getExpressionForRelocatesAtPath=b,S}function bl(s,e){return e?{...s,...e}:s}class Gg{#s=new Map;isEmpty(){return this.#s.size===0}appendDependencyData(e){e.forEachDependency((t,i)=>{this.addDependencies(t,i)})}addDependencies(e,t){const i=[...t];if(i.length===0)return;let r=this.#s.get(e);r||(r=new Set,this.#s.set(e,r));for(const n of i)r.add(n)}forEachDependency(e){for(const[t,i]of this.#s)e(t,i)}getDependenciesForLayerStack(e){return this.#s.get(e)}}function Ug(s){return s.stripAllVariantSelections().pathElementCount}let Wg=0;class ai{id;arcType;layerStack;path;mapToParent;mapToRoot;parent;children;_origin;siblingNum;namespaceDepth;inert;specContributionRestrictedDepth;culled;elided;propagatedSpecializes;_isDueToAncestor;_hasTransitiveDirectDependency;siblingNumAtOrigin;expressionVars;constructor(e){this.id=Wg++,this.arcType=e.arcType,this.layerStack=e.layerStack,this.path=e.path,this.mapToParent=e.mapToParent,this.mapToRoot=e.mapToRoot,this.parent=e.parent,this.children=[],this._origin=e.origin??null,this.siblingNum=e.siblingNum??0,this.siblingNumAtOrigin=e.siblingNumAtOrigin??0,this.namespaceDepth=e.namespaceDepth??0,this.inert=e.inert??!1,this.specContributionRestrictedDepth=0,this.culled=!1,this.elided=!1,this.propagatedSpecializes=!1,this._isDueToAncestor=!1,this._hasTransitiveDirectDependency=!0,this.expressionVars=e.layerStack.ownExpressionVariables}isRootNode(){return this.parent===null}get origin(){return this._origin??this.parent}set origin(e){this._origin=e===this.parent?null:e}get site(){return new ag(this.layerStack,this.path)}get hasSpecs(){return this.layerStack.layers.some(({layer:e})=>e.hasSpec(F(this.path)))}get isInert(){return this.inert}get isCulled(){return this.culled}get isRestricted(){return!1}get permission(){return"Public"}get hasSymmetry(){return!1}getRootNode(){let e=this;for(;e.parent!==null;)e=e.parent;return e}getOriginNode(){return this.origin}getOriginRootNode(){let e=this;for(;e.origin!==e.parent&&e.origin!==null;)e=e.origin;return e}getDepthBelowIntroduction(){return yt(this)}getPathAtIntroduction(){return Zt(this)}getIntroPath(){if(this.parent===null)return N.absoluteRootPath;let e=this.parent.path;for(let t=this.getDepthBelowIntroduction();t>0;t--){for(;e.isPrimVariantSelectionPath();)e=e.getParentPath();e=e.getParentPath()}return e}isDueToAncestor(){return this._isDueToAncestor||this.arcType===x.Specialize&&this.origin!==this.parent&&this.origin?.isDueToAncestor()===!0}setIsDueToAncestor(e){this._isDueToAncestor=e}hasTransitiveDirectDependency(){if(this._hasTransitiveDirectDependency||this.parent?.parent!==null&&this.parent?.hasTransitiveDirectDependency()===!0)return!0;for(let e=this.parent;e!==null&&e.parent!==null;e=e.parent)if(!e.isDueToAncestor())return!0;return!1}setHasTransitiveDirectDependency(e){this._hasTransitiveDirectDependency=e}hasTransitiveAncestralDependency(){for(let e=this;e!==null;e=e.parent)if(e.isDueToAncestor())return!0;return!1}canContributeSpecs(){return!this.inert&&!this.culled}getSpecContributionRestrictedDepth(){return this.specContributionRestrictedDepth}appendChildName(e){this.path=this.path.appendChild(e);for(const t of this.children)t.appendChildName(e)}appendVariantSelectionToSites(e,t,i){const r=i??this.path;this.path.hasPrefix(r)&&(this.path=this.path.appendVariantSelection(e,t));for(const n of this.children)n.appendVariantSelectionToSites(e,t,r)}clone(e){const t=new Map,i=this._cloneInto(e,t);for(const[r,n]of t)n._origin=r._origin===null?null:t.get(r._origin)??r._origin;return i}_cloneInto(e,t){const i=new ai({arcType:this.arcType,layerStack:this.layerStack,path:this.path,mapToParent:this.mapToParent,mapToRoot:this.mapToRoot,parent:e,origin:this._origin,siblingNum:this.siblingNum,namespaceDepth:this.namespaceDepth,siblingNumAtOrigin:this.siblingNumAtOrigin,inert:this.inert});return i.elided=this.elided,i.propagatedSpecializes=this.propagatedSpecializes,i._isDueToAncestor=this._isDueToAncestor,i._hasTransitiveDirectDependency=this._hasTransitiveDirectDependency,i.expressionVars=this.expressionVars,i.specContributionRestrictedDepth=this.specContributionRestrictedDepth,t.set(this,i),i.children=this.children.map(r=>r._cloneInto(i,t)),i}}function zg(s){const e=t=>{t.setIsDueToAncestor(!0),t.setHasTransitiveDirectDependency(!1);for(const i of t.children)e(i)};for(const t of s.children)e(t)}function Ei(s){s.elided=!0;for(const e of s.children)Ei(e)}function nt(s){return s.origin??s.parent}function si(s,e){return s.path.pathString===e.path.pathString&&Yt(s.layerStack.identifier)===Yt(e.layerStack.identifier)}function mi(s){if(!gs(s.arcType)||s.parent===null||s.parent.parent!==null)return!1;const e=nt(s);return e!==null&&si(s,e)}function kn(s){if(!gs(s.arcType))return null;const e=Oi(s);for(const t of e.children)if(!(t.arcType<x.Specialize)&&nt(t)===s&&mi(t))return t;return null}function Cn(s){return nt(s)}function jg(s,e){return si(s,e)}function Pl(s){let e=s,t=0;for(;nt(e)!==e.parent;){const i=nt(e);if(i===null)break;e=i,t++}return[e,t]}function Hg(s,e){const t=(i,r)=>{let n=i;for(;n!==null;){if(n===r)return!0;n=mi(n)?nt(n):n.parent}return!1};return t(s,e)||t(e,s)}function xr(s,e,t){if(s===e)return-1;if(s===t)return 1;for(const i of s.children){const r=xr(i,e,t);if(r!==0)return r}return 0}function Oi(s){let e=s;for(;e.parent!==null;)e=e.parent;return e}function Dd(s){let e=s,t=null;if(mi(e)){const r=nt(e);r!==null&&(e=r)}const i=yt(e);for(;cs(e.arcType)&&yt(e)===i&&e.parent!==null;)if(t=e,e=e.parent,mi(e)){const r=nt(e);r!==null&&(e=r)}return[e,t]}function qg(s){let e=s;for(;cs(e.arcType);){const[t,i]=Dd(e);if(t===e)break;if(e=t,cs(t.arcType)){const r=Zt(t);if(i!==null&&(i.path.pathString===r.pathString||i.path.hasPrefix(r)))break}}return e}function vl(s){let[e]=Dd(s);for(;e.arcType===x.Relocate&&e.parent!==null;)e=e.parent;return e.namespaceDepth}function wl(s,e){if(s===e)return 0;if(s.arcType!==e.arcType)return s.arcType-e.arcType;if(gs(s.arcType)){const[t,i]=Pl(s),[r,n]=Pl(e);if(!Hg(t,r)){if(s.namespaceDepth>e.namespaceDepth)return-1;if(s.namespaceDepth<e.namespaceDepth)return 1}const o=nt(s),a=nt(e),c=o===s.parent,l=a===e.parent;if(o===a){if(!c&&!l){const u=o!==null&&!si(s,o),d=a!==null&&!si(e,a);return u&&!d?-1:!u&&d?1:0}}else{if(t!==r)return xr(Oi(s),t,r);const u=c?0:vl(o),d=l?0:vl(a);if(u<d)return-1;if(d<u)return 1;if(i>n)return-1;if(n>i)return 1;const h=Yt(Oi(s).layerStack.identifier),m=Yt(s.layerStack.identifier),p=Yt(e.layerStack.identifier);if(m===h&&p===h&&!c&&!l){const y=o!==null&&!si(s,o),f=a!==null&&!si(e,a);if(y&&!f)return-1;if(!y&&f)return 1}return xr(Oi(s),o,a)}}else{if(s.namespaceDepth>e.namespaceDepth)return-1;if(s.namespaceDepth<e.namespaceDepth)return 1;const t=nt(s),i=nt(e);if(t!==i&&t!==null&&i!==null){const r=xr(Oi(s),t,i);if(r<0)return-1;if(r>0)return 1}}return s.siblingNumAtOrigin<e.siblingNumAtOrigin?-1:s.siblingNumAtOrigin>e.siblingNumAtOrigin?1:0}function*ct(s){if(!(s.culled||s.elided)){yield s;for(const e of s.children)yield*ct(e)}}function Kg(s,e,t=s.getRootNode()){if(s.getRootNode()!==e.getRootNode()||s===e)return 0;for(const i of ct(t)){if(i===s)return-1;if(i===e)return 1}return s.id-e.id}function xd(s){if(s.elided)return s.culled=!0,!1;const e=!s.inert&&s.layerStack.layers.some(({layer:n})=>n.hasSpec(F(s.path)));let t=!1;for(const n of s.children)xd(n)&&(t=!0);const i=s.parent!==null&&yt(s)===0,r=e||t||i;return s.culled=!r&&s.parent!==null,r}function Ns(s,e){s.mapToRoot=e.compose(s.mapToParent);for(const t of s.children)Ns(t,s.mapToRoot)}function zs(s,e){const t=new ai({arcType:e.arcType,layerStack:e.layerStack,path:e.path,mapToParent:e.mapToParent,mapToRoot:s.mapToRoot.compose(e.mapToParent),parent:s,origin:e.origin??null,siblingNum:s.children.length,siblingNumAtOrigin:e.siblingNumAtOrigin??0,namespaceDepth:e.namespaceDepth??0,inert:e.inert??!1});return is(s,t),t}function is(s,e){const t=s.children;if(t.length===0||wl(e,t[t.length-1])>=0){t.push(e);return}for(let i=0;i<t.length;i++)if(wl(e,t[i])<0){t.splice(i,0,e);return}t.push(e)}function yt(s){return s.parent===null?0:Ug(s.parent.path)-s.namespaceDepth}function Zt(s){let e=s.path;for(let t=yt(s);t>0;t--){for(;e.isPrimVariantSelectionPath();)e=e.getParentPath();e=e.getParentPath()}return e}function Xg(s){let e=s;for(;e.parent!==null;)e=e.parent;return e}function kd(s,e){if(s.parent===null)return[e,s];let t=s,i=e.stripAllVariantSelections();const r=s.mapToRoot.mapSourceToTarget(i);if(!r.isEmpty())t=Xg(s),i=r;else for(;t.parent!==null;){const o=t.mapToParent.mapSourceToTarget(i);if(o.isEmpty())break;t=t.parent,i=o}const n=Zt(t);return n.containsPrimVariantSelection()&&(i=i.replacePrefix(n.stripAllVariantSelections(),n)),[i,t]}function Cd(s,e,t){const i=s.parent===null?e:s.mapToRoot.mapSourceToTarget(e);return i.isEmpty()?N.emptyPath:t.parent===null?i:t.mapToRoot.mapTargetToSource(i)}function Ao(s){if(typeof s!="object"||s===null||Array.isArray(s))return!1;const e=Object.getPrototypeOf(s);return e===Object.prototype||e===null}function Bn(s){return N.fromString(s.replace(/\/\{/g,"{").replace(/\}\//g,"}"))}function Bd(s,e){for(const[t,i]of Object.entries(e)){const r=s[t];Ao(r)&&Ao(i)?Bd(r,i):t in s||(s[t]=i)}}class Yg{constructor(e,t,i,r,n=0,o=null){this.parentNode=e,this.pathInNode=t,this.composedFieldNames=i,this.composedAttributeNames=r,this.arcNum=n,this.previousFrame=o}futurePayloadIsStrongerThan(e){return x.Payload!==e.arcType?x.Payload<e.arcType:this.parentNode.namespaceDepth!==e.namespaceDepth?this.parentNode.namespaceDepth>e.namespaceDepth:this.arcNum<e.siblingNumAtOrigin}composeInSubtree(e,t,i,r,n,o){const a=i===void 0?F(t):`${F(t)}.${i}`;let c=!1;for(const{layer:l}of e.layerStack.layers){let u=l.getField(a,r);if(u===void 0)continue;const d=h=>{const m=h.getAuthoredPath();let p=h.getEvaluatedPath();if(!p&&vs(m)){const f=Qi(m,e.expressionVars);typeof f.value=="string"&&(p=f.value)}const y=p||h.getAssetPath();return new Xt({authoredPath:m,evaluatedPath:p,resolvedPath:y?l.resolveAsset(y):""})};if(u instanceof Xt?u=d(u):Array.isArray(u)&&u.every(h=>h instanceof Xt)&&(u=u.map(d)),o(u),c=!0,n)return!0}for(const l of e.children){if(l.inert||l.culled||l.elided)continue;if(e===this.parentNode&&this.futurePayloadIsStrongerThan(l))return c;let u=l.mapToParent.mapTargetToSource(t.stripAllVariantSelections());if(u.isEmpty())continue;const d=Zt(l);d.containsPrimVariantSelection()&&(u=u.replacePrefix(d.stripAllVariantSelections(),d));const h=this.composeInSubtree(l,u,i,r,n,o);if(c||=h,n&&h)return!0}return c}composeFromAncestors(e,t,i,r,n,o,a){const[c,l]=kd(e,t);let u=!1;if(l.parent===null&&i!==null){const d=i.mapToParent.mapSourceToTarget(c.stripAllVariantSelections());if(!d.isEmpty()&&(u=this.composeFromAncestors(i.parentNode,d,i.previousFrame,r,n,o,a),o&&u))return!0}return this.composeInSubtree(l,c,r,n,o,a)||u}composeValue(e){this.composedFieldNames.add(e);let t,i;return this.composeFromAncestors(this.parentNode,Bn(this.pathInNode),this.previousFrame,void 0,e,!1,r=>{Ao(r)?(i??={},Bd(i,r)):t===void 0&&(t=r)}),i??t}composeValueStack(e){this.composedFieldNames.add(e);const t=[];return this.composeFromAncestors(this.parentNode,Bn(this.pathInNode),this.previousFrame,void 0,e,!1,i=>t.push(i)),t}composeAttributeDefaultValue(e){this.composedAttributeNames.add(e);let t;return this.composeFromAncestors(this.parentNode,Bn(this.pathInNode),this.previousFrame,e,"default",!0,i=>{t=i}),t}}class Nd{dependencyContexts=[];relevantFieldNames=new Set;relevantAttributeNames=new Set;constructor(e){e&&this.appendDependencyData(e)}isEmpty(){return this.dependencyContexts.length===0}addDependencyContext(e,t,i,r){this.dependencyContexts.push({fileFormat:e,dependencyContextData:t});for(const n of i)this.relevantFieldNames.add(n);for(const n of r)this.relevantAttributeNames.add(n)}appendDependencyData(e){for(const t of e.dependencyContexts)this.dependencyContexts.push(t);for(const t of e.relevantFieldNames)this.relevantFieldNames.add(t);for(const t of e.relevantAttributeNames)this.relevantAttributeNames.add(t)}getRelevantFieldNames(){return this.relevantFieldNames}getRelevantAttributeNames(){return this.relevantAttributeNames}canFieldChangeAffectFileFormatArguments(e,t,i){return this.relevantFieldNames.has(e)?this.dependencyContexts.some(({fileFormat:r,dependencyContextData:n})=>{const o=r.canFieldChangeAffectFileFormatArguments;return o===void 0||o.call(r,e,t,i,n)}):!1}canAttributeDefaultValueChangeAffectFileFormatArguments(e,t,i){return this.relevantAttributeNames.has(e)?this.dependencyContexts.some(({fileFormat:r,dependencyContextData:n})=>{const o=r.canAttributeDefaultValueChangeAffectFileFormatArguments;return o===void 0||o.call(r,e,t,i,n)}):!1}}function Zg(s){const e=r=>({assetPath:r.assetPath??"",primPath:r.primPath??"",layerOffset:r.layerOffset??ds}),t=Ft(s)??{isExplicit:!0,explicitItems:[s],deletedItems:[],prependedItems:[],appendedItems:[],orderedItems:[]},i=r=>r.map(e);return{isExplicit:t.isExplicit,explicitItems:i(t.explicitItems),deletedItems:i(t.deletedItems),prependedItems:i(t.prependedItems),appendedItems:i(t.appendedItems),orderedItems:i(t.orderedItems)}}const Nn=s=>`${s._resolvedAssetPath??s.assetPath}|${s.primPath}|${s.layerOffset.offset}|${s.layerOffset.scale}`;function Ed(s,e,t,i,r){const n=c=>{if(!vs(c))return c;const l=Qi(c,i);for(const u of l.usedVariables)r?.add(u);return typeof l.value=="string"?l.value:c};let o=[];const a=new Map;for(let c=s.layers.length-1;c>=0;c--){const l=s.layers[c],u=l.layer,d=u.getField(e,t);if(d==null)continue;const h=f=>{if(!f.assetPath)return f;const g=n(f.assetPath);return{...f,assetPath:g,_resolvedAssetPath:u.resolveAsset(g)}},m=f=>(a.set(Nn(f),l),f),p=Zg(d),y={isExplicit:p.isExplicit,explicitItems:p.explicitItems.map(h).map(m),prependedItems:p.prependedItems.map(h).map(m),appendedItems:p.appendedItems.map(h).map(m),deletedItems:p.deletedItems.map(h),orderedItems:p.orderedItems.map(h)};o=Ps(o,y,{key:Nn})}return o.map(c=>{const l=a.get(Nn(c));return l?c.assetPath?{...c,layerOffset:Mt(l.offset,c.layerOffset),sourceLayer:l.layer}:{...c,sourceLayer:l.layer}:c})}function Qg(s,e,t={},i){return Ed(s,e,"references",t,i)}function zr(s,e,t={},i){return Ed(s,e,"payload",t,i)}function Od(s,e,t){const i=o=>{if(o.startsWith("/"))return o;const a=e.split("/").filter(Boolean);for(const c of o.split("/"))if(!(!c||c==="."))if(c===".."){if(a.length===0)return"";a.pop()}else a.push(c);return`/${a.join("/")}`},r=o=>Array.isArray(o)?o.filter(a=>typeof a=="string").map(i):[];let n=[];for(let o=s.layers.length-1;o>=0;o--){const a=s.layers[o].layer.getField(e,t);if(a==null)continue;const c=Ft(a);c&&(n=Ps(n,{...c,explicitItems:r(c.explicitItems),deletedItems:r(c.deletedItems),prependedItems:r(c.prependedItems),appendedItems:r(c.appendedItems),orderedItems:r(c.orderedItems)}))}return n}function Jg(s,e){return Od(s,e,"inheritPaths")}function ey(s,e){return Od(s,e,"specializes")}function _l(s,e){let t=[];for(let r=s.layers.length-1;r>=0;r--){const n=s.layers[r].layer.getField(e,"variantSetNames");if(n==null)continue;const o=Ft(n);o&&(t=Ps(t,o))}const i=new Set(t);for(const{layer:r}of s.layers){const n=r.getField(e,"variantSetChildren");for(const o of n??[])i.has(o)||(i.add(o),t.push(o))}return t}function Il(s,e,t){const i=new Set;for(const{layer:r}of s.layers){const n=r.getField(`${e}{${t}=}`,"variantChildren");if(n)for(const o of n)i.add(o)}return i}function Ld(s,e,t,i,r,n="/",o){if(!vs(s))return s;const a=Qi(s,e);for(const c of a.usedVariables)o?.add(c);return a.errors.length>0&&t&&i&&r&&t.push(Td({rootSite:{...i,path:""},expression:s,expressionError:a.errors.join("; "),context:"variant",sourceLayer:r,sourcePath:n})),a.errors.length===0&&typeof a.value=="string"?a.value:void 0}function ty(s,e,t,i={},r,n,o){for(const{layer:a}of s.layers){const l=a.getField(e,"variantSelection")?.[t]?.[0];if(l===void 0)continue;const u=Ld(l,i,r,n,a,e,o);if(u!==void 0)return u}}function sy(s,e,t={}){const i={};for(const{layer:r}of s.layers){const n=r.getField(e,"variantSelection");if(n)for(const[o,a]of Object.entries(n)){if(o in i||a?.[0]===void 0)continue;const c=Ld(a[0],t);c!==void 0&&(i[o]=c)}}return i}function iy(s,e,t=[]){const i=new Set(t),r=[...t];for(let n=s.layers.length-1;n>=0;n--){const{layer:o}=s.layers[n],a=o.getField(e,"primChildren");if(a)for(const l of a)i.has(l)||(i.add(l),r.push(l));const c=o.getField(e,"primOrder");if(c?.length){const l=Yu(r,c);r.splice(0,r.length,...l)}}return r}function Ui(s,e){for(const{layer:t}of s.layers)if(t.hasSpec(e))return!0;return!1}function ry(s){if(!s.inert)return!0;if(s.arcType===x.Specialize){if(s.parent!==s.getRootNode()||s.origin!==s.parent)return!1}else if(s.arcType===x.Inherit&&s.origin!==s.parent)return!1;return!0}function ny(s){if(s.arcType===x.Root)return 1;let e=0;if(s.inert){if(!ry(s))return 0;e|=16}const t=s.hasTransitiveDirectDependency(),i=s.hasTransitiveAncestralDependency();return t?e|=i?4:2:i&&(e|=8),e&16||(e|=32),e}function oy(s){const e=[];return s===0&&e.push("none"),s===1&&e.push("root"),s&2&&e.push("purely-direct"),s&4&&e.push("partly-direct"),s&8&&e.push("ancestral"),s&16&&e.push("virtual"),s&32&&e.push("non-virtual"),e.sort().join(", ")}const ay={[x.Root]:"root",[x.Inherit]:"inherit",[x.Variant]:"variant",[x.Relocate]:"relocate",[x.Reference]:"reference",[x.Payload]:"payload",[x.Specialize]:"specialize"};function js(s){return s?"TRUE":"FALSE"}function cy(s){const e=s.replaceAll("\\","/");return e.slice(e.lastIndexOf("/")+1)}function ly(s){const e=[],t=s.getTimeOffset();(t.offset!==0||t.scale!==1)&&e.push(`SdfLayerOffset(offset = ${t.offset}; scale = ${t.scale})`);for(const[i,r]of s.getSourceToTargetMap())e.push(`${i} -> ${r}`);return e.join(`
`)}function Al(s){return ly(s).replaceAll(`
`,`
        `)}function uy(s,e=!0,t=!0){if(!s.isValid())return"";const i=[],r=a=>{if(!(a.elided||a.culled&&!a.hasSpecs)){i.push(a);for(const c of a.children)r(c)}};r(s.rootNode);const n=new Map(i.map((a,c)=>[a,c])),o=a=>{const c=a.parent;let l=`Node ${n.get(a)??0}:
`;l+=`    Parent node:              ${c?n.get(c):"NONE"}
`,l+=`    Type:                     ${ay[a.arcType]}
`,l+=`    DependencyType:           ${oy(ny(a))}
`,l+=`    Source path:              <${a.path.pathString}>
`,l+=`    Source layer stack:       ${wo(a.layerStack.identifier)}
`,l+=`    Target path:              <${c?c.path.pathString:"NONE"}>
`,l+=`    Target layer stack:       ${c?wo(c.layerStack.identifier):"NONE"}
`,a.origin!==c&&(l+=`    Origin node:              ${a.origin?n.get(a.origin):0}
`,l+=`    Sibling # at origin:      ${a.siblingNumAtOrigin}
`),t&&(l+=`    Map to parent:
        ${Al(a.mapToParent)}
`,l+=`    Map to root:
        ${Al(a.mapToRoot)}
`),l+=`    Namespace depth:          ${a.namespaceDepth}
`,l+=`    Depth below introduction: ${a.getDepthBelowIntroduction()}
`,l+=`    Is due to ancestor:       ${js(a.isDueToAncestor())}
`,l+=`    Permission:               ${a.permission}
`,l+=`    Is restricted:            ${js(a.isRestricted)}
`,l+=`    Is inert:                 ${js(a.isInert)}
`,l+=`    Contribute specs:         ${js(a.canContributeSpecs())}
`;const u=a.getSpecContributionRestrictedDepth()||(a.isInert?a.namespaceDepth:0);if(l+=`        Restricted at depth:  ${u}
`,l+=`    Has specs:                ${js(a.hasSpecs)}
`,l+=`    Has symmetry:             ${js(a.hasSymmetry)}
`,a.hasSpecs&&a.canContributeSpecs()){l+=`    Prim stack:
`;for(const{layer:d}of a.layerStack.layers)d.hasSpec(F(a.path))&&(l+=`      <${a.path.pathString}> ${cy(d.filePath)} - @${d.filePath}@
`)}for(const d of a.children)n.has(d)&&(l+=o(d));return l+=`
`,l};return`${o(s.rootNode)}
`}function rn(s){return s.hasTransitiveDirectDependency()&&!s.inert&&!s.culled&&Ui(s.layerStack,F(s.path))}function*dy(s){yield[s,!1];function*e(t){if(t.culled)return;const i=rn(t);yield[t,i];for(const r of t.children)yield*e(r)}for(const t of s.children)yield*e(t)}function na(s){let e=!1;for(const[,t]of dy(s))if(t){e=!0;break}if(!e)return!1;for(const t of ct(s))if(!(t.inert||t.culled))for(const{layer:i}of t.layerStack.layers){const r=i.getField(F(t.path),"instanceable");if(r!==void 0)return r===!0}return!1}function hy(s){const e=(t,i)=>{if(!t.culled&&!(!i&&rn(t))){t.inert=!0;for(const r of t.children)e(r,!1)}};e(s,!0)}function py(s){return typeof s=="object"&&s!==null&&typeof s.composeFieldsForFileFormatArguments=="function"}function dr(s){for(let e=s;e!==null;e=e.previousFrame)if(e.skipDuplicateNodes)return!0;return!1}function je(s){return Yt(s.identifier)}function rs(s){let e=s;for(;e.parent!==null;)e=e.parent;return e}function Tl(s,e){return e.isAbsoluteRootPath()?!0:s.pathString===e.pathString||s.hasPrefix(e)}function Fd(s,e,t){return e.isAbsoluteRootPath()&&t.isAbsoluteRootPath()?s:s.replacePrefix(e,t)}function To(s,e){return`${s}::${e.pathString}`}function fy(s){return To(je(s.layerStack),s.path)}class my extends Set{constructor(e){super(),this.outputs=e}sitesByGraph=new Map;registerSubtree(e,t=e){let i=this.sitesByGraph.get(e);i||(i=new Map,this.sitesByGraph.set(e,i));const r=fy(t);let n=i.get(r);n||(n=new Set,i.set(r,n)),n.add(t);for(const o of t.children)this.registerSubtree(e,o)}hasSite(e,t,i){return(this.sitesByGraph.get(e)?.get(To(t,i))?.size??0)>0}hasContributingSite(e,t,i){return[...this.sitesByGraph.get(e)?.get(To(t,i))??[]].some(r=>!r.inert&&!r.culled&&!r.elided)}rejectDuplicateArc(e,t,i,r){let n=i,o=e,a=r;for(;o!==null;){const c=rs(o);if(this.hasContributingSite(c,t,n))return!0;if(a===null)break;n=Fd(a.requestedPath,c.path,n),o=a.parentNode,a=a.previousFrame}return!1}}class Et{primIndex=new Md;allErrors=[];dynamicFileFormatDependency=new Nd;expressionVariablesDependency=new Gg;culledDependencies=[];payloadState=Et.PayloadState.NoPayload;setPayloadState(e){this.payloadState===Et.PayloadState.NoPayload&&(this.payloadState=e)}}function Dl(s,e){return`${s.id}:${e}`}function gy(s){return s===7||s===6||s===14||s===15||s===16||s===9||s===10||s===11}function xl(s,e){for(let t=e.parent;t!==null;t=t.parent)if(t===s)return!0;return!1}function yy(s,e,t){if(s.type!==e.type)return s.type-e.type;if(s.node===e.node)return 0;if(s.type===7){if(xl(s.node,e.node))return 1;if(xl(e.node,s.node))return-1}const i=t(s.node,e.node);return i!==0?i:s.node.id-e.node.id}class oa{tasks=[];done=new Set;cmp;root;processed=0;static MAX_TASKS=2e6;constructor(e,t){this.root=e,this.cmp=t}add(e,t){const i=Dl(e,t);return this.done.has(i)&&!gy(t)||this.tasks.some(r=>r.node===e&&r.type===t)?!1:(this.tasks.push({type:t,node:e}),!0)}addTasksForNode(e){!e.inert&&!e.culled&&(this.add(e,0),this.add(e,2),this.add(e,3),this.add(e,17),this.add(e,12),this.add(e,4),this.add(e,5),this.add(e,14),this.add(e,9)),this.add(e,1),this.armPostStructuralTasks()}armPostStructuralTasks(){this.add(this.root,6)}addTasksForSubtree(e){this.addTasksForNode(e);for(const t of e.children)this.addTasksForSubtree(t)}retryVariantTasks(){for(const e of this.tasks)e.type===16?this.add(e.node,14):e.type===11&&this.add(e.node,9)}armVariantsForGraph(e){this.add(e,14),this.add(e,9);for(const t of e.children)this.armVariantsForGraph(t)}pop(){if(this.tasks.length===0)return null;if(++this.processed>oa.MAX_TASKS)throw new Error("PcpTaskQueue exceeded task cap — a task is being re-issued (non-terminating build).");let e=0;for(let i=1;i<this.tasks.length;i++)yy(this.tasks[i],this.tasks[e],this.cmp)<0&&(e=i);const[t]=this.tasks.splice(e,1);return this.done.add(Dl(t.node,t.type)),t}}const Ys=N.absoluteRootPath;function Sy(s){let e=s;for(;!e.isEmpty();){if(e.isPrimVariantSelectionPath())return e.getVariantSelection();e=e.getParentPath()}return null}const by=new Set([0,2,3,4,5]);function kl(s,e,t,i=null){let r=t,n=s,o=i;for(;n!==null;){for(let c=n;c!==null;c=c.parent)if(je(c.layerStack)===e&&(Tl(c.path,r)||Tl(r,c.path)))return!0;if(o===null)break;const a=rs(n).path;r=Fd(o.requestedPath,a,r),n=o.parentNode,o=o.previousFrame}return!1}function wt(s){return Pe(s.layerStack.identifier,s.path.pathString)}function Cl(s,e,t,i,r){const n=[];let o=s,a=e;for(;o!==null;){const c=o.arcType!==x.Root?o.arcType:a!==null?a.arcType:o.arcType;n.push({site:Pe(o.layerStack.identifier,o.path.pathString),arcType:c}),o.parent!==null?o=o.parent:a!==null?(o=a.parentNode,a=a.previousFrame):o=null}return n.reverse(),n.push({site:Pe(i.identifier,r.pathString),arcType:t}),_g(n)}function En(s){for(const e of ct(s))if(!(e.inert||!e.layerStack.hasRelocates)&&e.layerStack.incrementalRelocatesSourceToTarget.has(e.path.pathString))return!0;return!1}function Py(s){for(const e of ct(s))if(!e.inert&&e.layerStack.hasRelocates&&e.layerStack.incrementalRelocatesSourceToTarget.has(e.path.pathString))return e}function vy(s){return s.layerStack.hasRelocates&&s.layerStack.incrementalRelocatesSourceToTarget.has(s.path.pathString)}function Hs(s){const e=s.getParentPath();return e.isEmpty()?Ys:e}function wy(s){return s.name}function le(s){return s.stripAllVariantSelections().pathElementCount}function Bl(s,e,t){const i=t.stripAllVariantSelections(),r=e.layerStack.getExpressionForRelocatesAtPath(i.pathString);return r.isNull()?s:r.evaluate().compose(s)}function _y(s,e){if(s.arcType!==x.Variant)return e;const t=Zt(s),i=t.stripAllVariantSelections();return e.replacePrefix(i,t)}function Iy(s,e,t){const i=e.stripAllVariantSelections();for(const r of ct(s)){if(r.arcType!==x.Variant)continue;const n=Zt(r),o=Sy(n);if(!o||o[0]!==t)continue;const a=r===s?i:Cd(s,i,r);if(!a.isEmpty()&&n.stripAllVariantSelections().pathString===a.stripAllVariantSelections().pathString)return o[1]}}function Ay(s,e,t,i,r,n){const o=e.stripAllVariantSelections();for(const a of ct(s)){let c=a===s?o:Cd(s,o,a);if(c.isEmpty())continue;c=c.stripAllVariantSelections();const l=new Set,u=ty(a.layerStack,F(_y(a,c)),t,a.expressionVars,i,r,l);if(n.expressionVariablesDependency.addDependencies(a.layerStack,l),u!==void 0)return u}}function Nl(s,e,t,i,r,n){const[o,a]=kd(s,e);if(o.isEmpty())return;const c=Iy(a,o,t);return c!==void 0?c:Ay(a,o,t,i,r,n)}class jr{constructor(e,t,i,r,n){this.payloadIncluded=i,this.payloadInclusionSource=r,this.traceContext=n,this.rootLayerStack=e,this.opener=t,this.layerStackRegistry.set(Yt(e.identifier),e)}opener;rootLayerStack;layerStackRegistry=new Map;static async create(e,t,i,r=()=>!0,n="includeSet",o={current:void 0}){const a=await Sl(e,t,i,o);return new jr(a,t,r,n,o)}getLayerStack(){return this.rootLayerStack}variantFallbacks={};setVariantFallbacks(e){this.variantFallbacks=e,this.treeCache.clear(),this.treeErrors.clear()}invalidateBuildState(){this.treeCache.clear(),this.treeErrors.clear()}getVariantFallbacks(){return this.variantFallbacks}async layerStackFor(e){const t=Yt({rootLayer:e}),i=this.layerStackRegistry.get(t);if(i)return i;const r=await Sl(e,this.opener,void 0,this.traceContext);return this.layerStackRegistry.set(t,r),r}async buildPrimIndex(e,t=this.traceContext.current){return ia(this.traceContext,"usd-ts:PcpPrimIndexer.buildPrimIndex",async i=>(ra(i,"primPath",e),this._buildPrimIndex(e)),t)}async _buildPrimIndex(e){const t=N.fromString(e),i=new Et,n=(await this.buildNodeTree(this.rootLayerStack,t,new my(i))).clone(null);xd(n);const o=a=>{if(a.culled&&!a.isRootNode()){let c=N.emptyPath;if(a.arcType===x.Relocate){let l=a.parent;for(;l?.arcType===x.Relocate;)l=l.parent;c=l?.path??N.emptyPath}i.culledDependencies.push({arcType:a.arcType,layerStack:a.layerStack,sitePath:a.path,unrelocatedSitePath:c,mapToRoot:a.mapToRoot})}for(const c of a.children)o(c)};if(o(n),En(n)){n.inert=!0;for(const a of n.children)Ei(a)}return i.primIndex=new Md(n,e,i.allErrors),i}treeCache=new Map;treeErrors=new Map;refSourceLayers=new WeakMap;async buildNodeTree(e,t,i,r=null){const n=i.outputs,o=`${je(e)}::${t.pathString}`;if(r===null){const p=this.treeCache.get(o);if(p)return n.allErrors.push(...this.treeErrors.get(o)??[]),p}if(i.has(o))return new ai({arcType:x.Root,layerStack:e,path:t,mapToParent:j.identity(),mapToRoot:j.identity(),parent:null});i.add(o);const a=n.allErrors.length;let c;if(t.isAbsoluteRootPath()||t.isPrimVariantSelectionPath())c=new ai({arcType:x.Root,layerStack:e,path:t,mapToParent:j.identity(),mapToRoot:j.identity(),parent:null});else{const p=n.allErrors.length,y=await this.buildNodeTree(e,Hs(t),i,r);if(r===null){const g=n.allErrors.splice(p);n.allErrors.push(...g.filter(S=>S.errorType!==Tr.ArcCycle&&S.errorType!==Tr.OpinionAtRelocationSource))}const f=na(y);c=y.clone(null),f&&hy(c),c.appendChildName(wy(t)),zg(c)}r!==null&&r.directNodeShouldContributeSpecs===!1&&r.requestedPath.pathString===t.pathString&&(c.inert=!0,c.specContributionRestrictedDepth=le(t));const l=r!==null&&r.arcType!==x.Relocate&&vy(c);if(!t.isPrimVariantSelectionPath()&&(l||En(c))){const p=r!==null?Py(c):void 0;r!==null&&p&&!c.path.containsPrimVariantSelection()&&!p.path.containsPrimVariantSelection()&&n.allErrors.push(xn({rootSite:wt(rs(r.parentNode)),site:Pe(r.parentNode.layerStack.identifier,r.parentNode.path.pathString),targetSite:Pe(c.layerStack.identifier,r.requestedPath.pathString),relocationSourceSite:Pe(p.layerStack.identifier,p.path.pathString),arcType:r.arcType})),c.inert=!0;for(const y of c.children)Ei(y);return i.delete(o),r===null&&(this.treeCache.set(o,c),this.treeErrors.set(o,n.allErrors.slice(a))),c}i.registerSubtree(c);const u=new oa(c,(p,y)=>Kg(p,y,c));u.addTasksForSubtree(c);const d=[],h=[];let m=u.pop();for(;m!==null;){const p=m.node;if(!p.elided){switch(m.type){case 0:await this.evalRelocations(p,c,i,r,h);break;case 1:this.evalImpliedRelocations(p,u,i);break;case 2:await this.evalRefOrPayload(p,x.Reference,d,i,r,c,h);break;case 3:await this.evalRefOrPayload(p,x.Payload,d,i,r,c,h,"static");break;case 4:await this.evalClassArc(p,c,x.Inherit,i,r,h);break;case 5:await this.evalClassArc(p,c,x.Specialize,i,r,h);break;case 14:if(r===null){const y=this.evalVariants(p,d,i,!1);y.added&&(u.armPostStructuralTasks(),u.armVariantsForGraph(c)),y.unresolved&&u.add(p,15)}break;case 9:if(r===null){const y=await this.evalAncestralVariants(p,c,i,r,h,!1);y.added&&(u.armPostStructuralTasks(),u.armVariantsForGraph(c)),y.unresolved&&u.add(p,10)}break;case 15:r===null&&this.evalVariants(p,d,i,!0).added&&(u.armPostStructuralTasks(),u.armVariantsForGraph(c));break;case 10:r===null&&(await this.evalAncestralVariants(p,c,i,r,h,!0)).added&&(u.armPostStructuralTasks(),u.armVariantsForGraph(c));break;case 17:await this.evalRefOrPayload(p,x.Payload,d,i,r,c,h,"dynamic");break;case 12:await this.evalAncestralDynamicPayloads(p,d,i,r,c,h);break;case 6:r===null&&await this.evalImpliedSpecializes(c,c,i,r,u)&&(u.armPostStructuralTasks(),u.armVariantsForGraph(c));break;case 7:await this.evalImpliedClassesAtNode(p,c,i,r,u)&&(u.armPostStructuralTasks(),u.armVariantsForGraph(c));break;case 16:case 11:break;case 18:this.evalUnresolvedPrimPathError(p,c,n);break}for(const y of d)u.addTasksForNode(y),this.armImpliedClassTasks(y,u),r===null&&(y.arcType===x.Reference||y.arcType===x.Payload)&&u.add(y,18);d.length=0;for(const y of h)if(y.arcType===x.Relocate&&u.add(y,1),this.armImpliedClassTasks(y,u),r===null)for(const f of ct(y))(f.arcType===x.Reference||f.arcType===x.Payload)&&u.add(f,18);h.length=0,r===null&&by.has(m.type)&&u.armVariantsForGraph(c)}m=u.pop()}if(!t.isPrimVariantSelectionPath()&&En(c)){c.inert=!0;for(const p of c.children)Ei(p)}return i.delete(o),r===null&&(this.treeCache.set(o,c),this.treeErrors.set(o,n.allErrors.slice(a))),c}async evalImpliedSpecializes(e,t,i,r,n){return this.findSpecializesToPropagateToRoot(e,t,i,r,n)}async findSpecializesToPropagateToRoot(e,t,i,r,n){let o=!1;if(this.isRelocatesPlaceholderImpliedArc(e))return!1;gs(e.arcType)&&!mi(e)&&await this.propagateNodeToRoot(e,t,i,r,n)&&(o=!0);for(const a of[...e.children])await this.findSpecializesToPropagateToRoot(a,t,i,r,n)&&(o=!0);return o}isRelocatesPlaceholderImpliedArc(e){const t=e.parent;return t===null?!1:Cn(e)!==t&&t.arcType===x.Relocate&&jg(e,t)}async propagateNodeToRoot(e,t,i,r,n){const o=je(e.layerStack);if(t.children.find(d=>d.arcType===x.Specialize&&d.path.pathString===e.path.pathString&&je(d.layerStack)===o)||i.rejectDuplicateArc(t,o,e.path,r))return!1;const c=le(e.path)>1,l=e.mapToRoot;let u;if(c){const d={previousFrame:r,requestedPath:e.path,parentNode:t,mapToParent:l,arcType:x.Specialize,skipDuplicateNodes:!0};u=(await this.buildNodeTree(e.layerStack,e.path,i,d)).clone(t),u.arcType=x.Specialize,u.mapToParent=l,u.origin=e,u.siblingNumAtOrigin=e.siblingNumAtOrigin,u.namespaceDepth=le(t.path),u.inert=!1,u.propagatedSpecializes=!0,Ns(u,t.mapToRoot),is(t,u),i.registerSubtree(t,u),this.armImpliedClassTasks(u,n)}else u=new ai({arcType:x.Specialize,layerStack:e.layerStack,path:e.path,mapToParent:l,mapToRoot:t.mapToRoot.compose(l),parent:t,origin:e,siblingNumAtOrigin:e.siblingNumAtOrigin,namespaceDepth:le(t.path),inert:!1}),u.propagatedSpecializes=!0,is(t,u),i.registerSubtree(t,u),await this.evalNodeArcs(u,t,i,r,n),this.armImpliedClassTasks(u,n);return!0}async evalImpliedClassesAtNode(e,t,i,r,n){if(e.parent===null||mi(e)||!this.nodeIsInGraph(e,t)||!this.hasClassBasedChild(e))return!1;const o=e.mapToParent.addRootIdentity();return this.evalImpliedClassTree(e.parent,e,o,!0,t,i,r,n)}nodeIsInGraph(e,t){let i=e;for(;i.parent!==null;){if(!i.parent.children.includes(i))return!1;i=i.parent}return i===t}armImpliedClassTasks(e,t){cs(e.arcType)?t.add(qg(e),7):this.hasClassBasedChild(e)&&t.add(e,7)}hasClassBasedChild(e){return(kn(e)??e).children.some(i=>cs(i.arcType))}async evalImpliedClassTree(e,t,i,r,n,o,a,c){if(e.arcType===x.Relocate){const d=e.mapToParent.addRootIdentity().compose(i);return c.add(e,7),e.parent===null?!1:await this.evalImpliedClassTree(e.parent,t,d,r,n,o,a,c)}const l=kn(t)??t;let u=!1;for(const d of[...l.children]){if(!cs(d.arcType)||r&&cs(t.arcType)&&yt(t)===yt(d))continue;const h=j.impliedClass(i,d.mapToParent),m=h.mapTargetToSource(e.path);let p=e.children.find(y=>!y.propagatedSpecializes&&Cn(y)===d)??null;if(p===null&&!m.isEmpty()&&(p=await this.addClassBasedArc(d.arcType,e,d,h,d.siblingNumAtOrigin,d,n,o,a,c),p!==null&&(u=!0)),p!==null&&this.hasClassBasedChild(d)){const y=kn(p)??p;await this.evalImpliedClassTree(y,d,i,!1,n,o,a,c)&&(u=!0)}}return u}async addClassBasedArc(e,t,i,r,n,o,a,c,l,u){const d=r.mapTargetToSource(t.path);if(d.isEmpty())return null;const h=je(t.layerStack),m=je(o.layerStack),p=d.pathString===o.path.pathString&&h===m,f=(t.parent===null&&l!==null?l.arcType:t.arcType)===x.Relocate?t.children.find(w=>w.arcType===e&&w.mapToParent.equals(r)&&yt(Cn(w)??w)===yt(i)):t.children.find(w=>w.path.pathString===d.pathString&&je(w.layerStack)===h);if(f)return gs(e)&&t.parent===null&&l===null?null:f;if(gs(e)&&(t.parent!==null||l!==null)){const _=zs(t,{arcType:e,layerStack:t.layerStack,path:d,mapToParent:r,origin:i,siblingNumAtOrigin:n,namespaceDepth:le(t.path),inert:!0});return c.registerSubtree(a,_),l===null&&!this.isRelocatesPlaceholderImpliedArc(_)&&(await this.propagateNodeToRoot(_,a,c,l,u)||this.armImpliedClassTasks(_,u)),_}const g=d.pathString!==t.path.pathString&&!p;if((g||dr(l))&&c.rejectDuplicateArc(t,h,d,l))return null;const b=g&&!t.inert;let P;if(b&&le(d)>1){const w={previousFrame:l,requestedPath:d,parentNode:t,mapToParent:r,arcType:e,skipDuplicateNodes:!0};P=(await this.buildNodeTree(t.layerStack,d,c,w)).clone(t),P.arcType=e,P.mapToParent=r,P.origin=i,P.siblingNumAtOrigin=n,P.namespaceDepth=le(t.path),P.inert=!1,Ns(P,t.mapToRoot),is(t,P),c.registerSubtree(a,P)}else P=zs(t,{arcType:e,layerStack:t.layerStack,path:d,mapToParent:r,origin:i,siblingNumAtOrigin:n,namespaceDepth:le(t.path),inert:!b}),b||(P.specContributionRestrictedDepth=1),c.registerSubtree(a,P),b&&await this.evalNodeArcs(P,a,c,l,u);return this.armImpliedClassTasks(P,u),P}async evalNodeArcs(e,t,i,r,n){const o=[e],a=[];for(;o.length>0;){const c=o.shift();await this.evalRelocations(c,t,i,r,a),await this.evalRefOrPayload(c,x.Reference,o,i,r,t,a),await this.evalRefOrPayload(c,x.Payload,o,i,r,t,a),await this.evalClassArc(c,t,x.Inherit,i,r,a),await this.evalClassArc(c,t,x.Specialize,i,r,a);for(const l of a)this.armImpliedClassTasks(l,n);a.length=0}}async evalRelocations(e,t,i,r,n){const o=e.layerStack;if(!o.hasRelocates)return;const a=o.incrementalRelocatesTargetToSource.get(e.path.pathString);if(a===void 0||a===e.path.pathString)return;const c=N.fromString(a);for(const h of e.children)h.arcType!==x.Variant&&Ei(h);const l={previousFrame:r,requestedPath:c,parentNode:e,mapToParent:j.identity(),arcType:x.Relocate,skipDuplicateNodes:!1,directNodeShouldContributeSpecs:!1},u=(await this.buildNodeTree(o,c,i,l)).clone(e);u.arcType=x.Relocate,u.mapToParent=j.identity(),u.origin=e,u.namespaceDepth=le(e.path),u.inert=!0,Ns(u,e.mapToRoot),is(e,u),i.registerSubtree(t,u),n.push(u);const d=F(c);for(const{layer:h}of o.layers)if(h.hasSpec(d)){const m=r!==null&&r.requestedPath.pathString===e.path.pathString&&le(e.path)===1?rs(r.parentNode):rs(e);i.outputs.allErrors.push(Eg({rootSite:wt(m),layer:h,path:a}))}}evalImpliedRelocations(e,t,i){if(e.arcType!==x.Relocate||e.isDueToAncestor())return;const r=e.parent;if(r===null)return;const n=r.parent;if(n===null)return;const o=r.mapToParent.mapSourceToTarget(e.path);if(o.isEmpty()||n.children.some(c=>c.arcType===x.Relocate&&c.path.pathString===o.pathString))return;const a=zs(n,{arcType:x.Relocate,layerStack:n.layerStack,path:o,mapToParent:j.identity(),origin:e,namespaceDepth:le(n.path),inert:!0});i.registerSubtree(rs(n),a),t.addTasksForNode(a)}async evalClassArc(e,t,i,r,n,o){const a=i===x.Inherit?Jg(e.layerStack,F(e.path)):ey(e.layerStack,F(e.path));if(a.length!==0)for(let c=0;c<a.length;c++){const l=a[c],u=l.startsWith("/")?N.fromString(l):e.path.appendChild(l);if(!u.isPrimPath()||u.containsPrimVariantSelection()){r.outputs.allErrors.push(ml({rootSite:wt(t),site:Pe(e.layerStack.identifier,e.path.pathString),primPath:l,sourceLayer:void 0,arcType:i}));continue}if(kl(e,je(e.layerStack),u,n)){r.outputs.allErrors.push(Cl(e,n,i,e.layerStack,u));continue}if(e.layerStack.hasRelocates&&e.layerStack.incrementalRelocatesSourceToTarget.has(u.pathString)){t.path.containsPrimVariantSelection()||r.outputs.allErrors.push(xn({rootSite:wt(t),site:Pe(e.layerStack.identifier,e.path.pathString),targetSite:Pe(e.layerStack.identifier,u.pathString),relocationSourceSite:Pe(e.layerStack.identifier,u.pathString),arcType:i}));continue}const d=j.create([[Ys,Ys],[u,e.path.stripAllVariantSelections()]]),h=d.mapTargetToSource(e.path),m=h.isEmpty()?u:h,p=Bl(d,e,e.path);if(dr(n)&&r.rejectDuplicateArc(e,je(e.layerStack),m,n))continue;if(i===x.Specialize&&(e.parent!==null||n!==null)){const g=zs(e,{arcType:x.Specialize,layerStack:e.layerStack,path:m,mapToParent:p,origin:e,siblingNumAtOrigin:c,namespaceDepth:le(e.path),inert:!0});r.registerSubtree(t,g);continue}const y={previousFrame:n,requestedPath:m,parentNode:e,arcType:i,mapToParent:p,skipDuplicateNodes:!0},f=(await this.buildNodeTree(e.layerStack,m,r,y)).clone(e);f.arcType=i,f.mapToParent=p,f.origin=e,f.namespaceDepth=le(e.path),f.siblingNumAtOrigin=c,Ns(f,e.mapToRoot),is(e,f),r.registerSubtree(t,f),o.push(f)}}evalVariants(e,t,i,r){if(e.inert)return{added:!1,unresolved:!1};let n=!1,o=!1;const a=e.path.stripAllVariantSelections(),c=_l(e.layerStack,F(e.path));for(let l=0;l<c.length;l++){const u=c[l];let d=Nl(e,a,u,i.outputs.allErrors,wt(rs(e)),i.outputs);if(d===void 0&&r){const p=Il(e.layerStack,F(a),u);d=(this.variantFallbacks[u]??[]).find(y=>p.has(y))}if(d===void 0){o=!0;continue}const h=e.path.appendVariantSelection(u,d);if(e.children.some(p=>p.arcType===x.Variant&&p.path.pathString===h.pathString)||!Ui(e.layerStack,F(h)))continue;const m=zs(e,{arcType:x.Variant,layerStack:e.layerStack,path:h,mapToParent:j.identity(),origin:e,namespaceDepth:le(e.path),siblingNumAtOrigin:l});i.registerSubtree(rs(e),m),t.push(m),n=!0}return{added:n,unresolved:o}}async evalAncestralVariants(e,t,i,r,n,o){let a=!1,c=!1,l=Hs(e.path);for(;!l.isAbsoluteRootPath()&&le(l)>=1&&!l.containsPrimVariantSelection();){if(e.specContributionRestrictedDepth!==0&&e.specContributionRestrictedDepth<=le(l)){l=Hs(l);continue}const u=_l(e.layerStack,F(l));for(let d=0;d<u.length;d++){const h=u[d];let m=Nl(e,l,h,i.outputs.allErrors,wt(t),i.outputs);if(m===void 0&&o){const P=Il(e.layerStack,F(l),h);m=(this.variantFallbacks[h]??[]).find(w=>P.has(w))}if(m===void 0){c=!0;continue}const p=l.appendVariantSelection(h,m);if(e.path.hasPrefix(p))continue;const y=e.path.replacePrefix(l,p),f=je(e.layerStack);if(i.hasSite(t,f,y)||!Ui(e.layerStack,F(p)))continue;let g=!1;for(let P=e;P?.parent!==null;P=P.parent)if(cs(P.arcType)&&yt(P)===0&&!P.inert){g=!0;break}if(g||=dr(r),g&&i.rejectDuplicateArc(e,f,y,r))continue;const S={previousFrame:r,requestedPath:y,parentNode:e,mapToParent:j.identity(),arcType:x.Variant,skipDuplicateNodes:g},b=(await this.buildNodeTree(e.layerStack,y,i,S)).clone(e);b.arcType=x.Variant,b.mapToParent=j.identity(),b.origin=e,b.namespaceDepth=le(l),b.siblingNumAtOrigin=d,Ns(b,e.mapToRoot),is(e,b),i.registerSubtree(t,b),n.push(b),a=!0}l=Hs(l)}return{added:a,unresolved:c}}evalUnresolvedPrimPathError(e,t,i){for(const l of ct(e)){const u=yt(l)===0?l.path:Zt(l);if(Ui(l.layerStack,F(u)))return}const r=e.parent,n=Zt(e),o=e.mapToParent.mapSourceToTarget(n),a=o.isEmpty()?r?.path??e.path:o,c=Pe((r??e).layerStack.identifier,a.pathString);i.allErrors.some(l=>l.errorType===Tr.ArcToProhibitedChild)||i.allErrors.push(Ig({rootSite:wt(t),site:c,sourceLayer:this.refSourceLayers.get(e),targetLayer:e.layerStack.identifier.rootLayer,unresolvedPath:n.pathString,arcType:e.arcType}))}async evalRefOrPayload(e,t,i,r,n,o,a,c="static",l=F(e.path)){const u=new Set,d=t===x.Reference?Qg(e.layerStack,l,e.expressionVars,u):zr(e.layerStack,l,e.expressionVars,u);if(r.outputs.expressionVariablesDependency.addDependencies(e.layerStack,u),d.length===0)return;const h=N.fromString(l.replace(/\/\{/g,"{").replace(/\}\//g,"}")),m=e.mapToRoot.mapSourceToTarget(h),p=(m.isEmpty()?o.path:m).stripAllVariantSelections().pathString;if(t===x.Payload&&!this.payloadIncluded(p)){r.outputs.setPayloadState(this.payloadInclusionSource==="predicate"?Et.PayloadState.ExcludedByPredicate:Et.PayloadState.ExcludedByIncludeSet);return}t===x.Payload&&r.outputs.setPayloadState(this.payloadInclusionSource==="predicate"?Et.PayloadState.IncludedByPredicate:Et.PayloadState.IncludedByIncludeSet);const y=Ys.pathString;for(const[f,g]of d.entries()){if(t===x.Payload&&c==="dynamic"&&!g.assetPath)continue;if(g.primPath){const B=N.fromString(g.primPath);if(!B.isAbsolutePath()||!B.isPrimPath()||B.containsPrimVariantSelection()){r.outputs.allErrors.push(ml({rootSite:wt(o),site:Pe(e.layerStack.identifier,e.path.pathString),primPath:g.primPath,sourceLayer:g.sourceLayer,arcType:t}));continue}}let S,b,P=g.layerOffset;if(g.assetPath){const B=Tt(g.assetPath),D=Tt(g._resolvedAssetPath??B.assetPath).assetPath,L=Im(D),V=t===x.Payload&&py(L)?L:void 0;if(t===x.Payload&&c==="dynamic"!=(V!==void 0))continue;let M=Vr(D,B.args);if(V){const H=new Map(B.args),de=new Set,ye=new Set,ce=new Yg(e,l,de,ye,f,n),re=V.composeFieldsForFileFormatArguments(B.assetPath,ce,H);M=Vr(D,H),r.outputs.dynamicFileFormatDependency.addDependencyContext(V,re,de,ye)}const ge=await this.opener(M);if(!ge){r.outputs.allErrors.push(Ag({rootSite:wt(o),site:Pe(e.layerStack.identifier,e.path.pathString),targetPath:g.primPath,assetPath:B.assetPath,resolvedAssetPath:D,sourceLayer:g.sourceLayer,arcType:t,messages:""}));continue}S=await this.layerStackFor(ge);const ie=g.sourceLayer?Ty(g.sourceLayer):e.layerStack.timeCodesPerSecond;ie!==S.timeCodesPerSecond&&(P={offset:P.offset,scale:P.scale*ie/S.timeCodesPerSecond});const z=ge.getField(y,"defaultPrim");b=g.primPath||(z?`/${z}`:y)}else if(g.primPath)S=e.layerStack,b=g.primPath;else{const B=e.layerStack.layers.map(D=>D.layer.getField(y,"defaultPrim")).find(D=>D!==void 0);if(!B)continue;S=e.layerStack,b=`/${B}`}let w=N.fromString(b);const _=N.fromString(l.replace(/\/\{/g,"{").replace(/}\//g,"}")).stripAllVariantSelections(),v=e.path.stripAllVariantSelections();if(v.pathString!==_.pathString&&v.hasPrefix(_)){const B=v.pathString.slice(_.pathString.length);w=N.fromString(w.isAbsoluteRootPath()?B||"/":`${w.pathString}${B}`)}if(kl(e,je(S),w,n)){r.outputs.allErrors.push(Cl(e,n,t,S,w));continue}if(S.hasRelocates&&S.incrementalRelocatesSourceToTarget.has(w.pathString)){o.path.containsPrimVariantSelection()||r.outputs.allErrors.push(xn({rootSite:wt(o),site:Pe(e.layerStack.identifier,e.path.pathString),targetSite:Pe(S.identifier,w.pathString),relocationSourceSite:Pe(S.identifier,w.pathString),arcType:t}));continue}if(dr(n)&&r.rejectDuplicateArc(e,je(S),w,n))continue;const T=!g.assetPath?[[Ys,Ys],[w,e.path.stripAllVariantSelections()]]:[[w,e.path.stripAllVariantSelections()]],E=Bl(j.create(T,P),e,e.path);if(le(w)>1){const B={previousFrame:n,requestedPath:w,parentNode:e,arcType:t,mapToParent:E,skipDuplicateNodes:!1},D=(await this.buildNodeTree(S,w,r,B)).clone(e);D.arcType=t,D.mapToParent=E,D.origin=e,g.sourceLayer&&this.refSourceLayers.set(D,g.sourceLayer),D.namespaceDepth=le(e.path),D.expressionVars=bl(S.ownExpressionVariables,e.expressionVars),Ns(D,e.mapToRoot),is(e,D),r.registerSubtree(o,D),a.push(D);continue}const k=zs(e,{arcType:t,layerStack:S,path:w,mapToParent:E,origin:e,namespaceDepth:le(e.path)});r.registerSubtree(o,k),g.sourceLayer&&this.refSourceLayers.set(k,g.sourceLayer),k.expressionVars=bl(S.ownExpressionVariables,e.expressionVars),i.push(k)}}async evalAncestralDynamicPayloads(e,t,i,r,n,o){for(let a=Hs(e.path);!a.isAbsoluteRootPath()&&!(!(e.specContributionRestrictedDepth!==0&&e.specContributionRestrictedDepth<=le(a))&&(await this.evalRefOrPayload(e,x.Payload,t,i,r,n,o,"dynamic",F(a)),a.isPrimVariantSelectionPath()));a=Hs(a));}}function Ty(s){const e=s.getField("/","timeCodesPerSecond");if(typeof e=="number")return e;const t=s.getField("/","framesPerSecond");return typeof t=="number"?t:24}(s=>{(e=>{e.NoPayload="noPayload",e.IncludedByIncludeSet="includedByIncludeSet",e.ExcludedByIncludeSet="excludedByIncludeSet",e.IncludedByPredicate="includedByPredicate",e.ExcludedByPredicate="excludedByPredicate"})(s.PayloadState||(s.PayloadState={}))})(Et||(Et={}));class Md{_rootNode;path;localErrors;constructor(e,t="",i=[]){this._rootNode=e,this.path=t,this.localErrors=i}isValid(){return this._rootNode!==void 0}get rootNode(){if(!this._rootNode)throw new Error("Invalid PcpPrimIndex has no root node");return this._rootNode}dumpToString(e=!0,t=!0){return uy(this,e,t)}*getNodeRange(){this._rootNode&&(yield*ct(this._rootNode))}composePrimStack(){const e=[];let t=-1;for(const i of this.getNodeRange()){if(t++,i.inert)continue;const r=i.mapToRoot.getTimeOffset();for(let n=0;n<i.layerStack.layers.length;n++){const{layer:o,offset:a}=i.layerStack.layers[n];o.hasSpec(F(i.path))&&e.push({layer:o,path:i.path,arcType:i.arcType,offset:Mt(r,a),nodeIndex:t,layerIndex:n})}}return e}composePropertyStack(e,t={}){const i=[];let r=-1;for(const c of this.getNodeRange()){if(r++,c.inert)continue;const l=c.path.appendProperty(e),u=F(l),d=c.mapToRoot.getTimeOffset();for(let h=0;h<c.layerStack.layers.length;h++){const{layer:m,offset:p}=c.layerStack.layers[h];m.hasSpec(u)&&i.push({layer:m,path:l,arcType:c.arcType,offset:Mt(d,p),nodeIndex:r,layerIndex:h})}}if(!t.validatePropertyTypes)return i;const n=i[0];if(!n)return i;const o=n.layer.getSpecType(F(n.path)),a=[n];for(const c of i.slice(1)){const l=c.layer.getSpecType(F(c.path));if(l===o){a.push(c);continue}this.localErrors.push(Tg({rootSite:Pe(this.rootNode.layerStack.identifier,this.rootNode.path.appendProperty(e).pathString),definingLayerIdentifier:n.layer.filePath,definingSpecPath:n.path.pathString,definingSpecType:o,conflictingLayerIdentifier:c.layer.filePath,conflictingSpecPath:c.path.pathString,conflictingSpecType:l}))}return a}hasSpecs(){for(const e of this.getNodeRange())if(!e.inert&&Ui(e.layerStack,F(e.path)))return!0;return!1}computePrimChildNames(e){const t=[],i=this._rootNode,r=i!==void 0&&na(i),n=d=>{if(!(d.culled||d.elided)){for(let h=d.children.length-1;h>=0;h--)n(d.children[h]);!d.inert&&(!r||!d.isRootNode()&&rn(d))&&t.push(d)}};i&&n(i);const o=d=>{const h=d.lastIndexOf("/");return h<=0?"/":d.slice(0,h)},a=d=>d.slice(d.lastIndexOf("/")+1),c=new Set,l=new Set,u=[];for(const d of t){const h=new Map,m=new Set;for(const[f,g]of d.layerStack.incrementalRelocatesSourceToTarget){if(o(f)!==d.path.pathString)continue;const S=a(f);c.add(S),o(g)===d.path.pathString?h.set(S,a(g)):m.add(S)}if(h.size||m.size){const f=[];for(const g of u){const S=h.get(g);S!==void 0?(l.delete(g),l.has(S)||(l.add(S),f.push(S))):m.has(g)?l.delete(g):f.push(g)}u.splice(0,u.length,...f)}const p=[];for(const[f,g]of d.layerStack.incrementalRelocatesTargetToSource)if(o(f)===d.path.pathString&&o(g)!==d.path.pathString){const S=a(f);l.has(S)||p.push(S)}p.sort();for(const f of p)l.add(f),u.push(f);const y=iy(d.layerStack,F(d.path),u);u.splice(0,u.length,...y),l.clear();for(const f of u)l.add(f)}for(const d of c)e?.add(d);return u.filter(d=>!c.has(d))}computePrimPropertyNames(){const e=[],t=n=>{if(!n.culled){for(let o=n.children.length-1;o>=0;o--)t(n.children[o]);n.inert||e.push(n)}};this._rootNode&&t(this._rootNode);const i=new Set,r=[];for(const n of e){const o=F(n.path);for(let a=n.layerStack.layers.length-1;a>=0;a--){const c=n.layerStack.layers[a].layer.getField(o,"properties");for(const l of c??[])i.has(l)||(i.add(l),r.push(l))}}return r}}const Fs=new WeakMap;class Hr{constructor(e,t,i,r,n=new Set,o=()=>!0,a="includeSet",c={current:void 0}){this.indexer=e,this.rootLayer=t,this.opener=i,this.sessionLayer=r,this.includedPayloads=n,this.includePayloadForIndexing=o,this.payloadInclusionSource=a,Fs.set(this,c)}variantFallbacks={};primIndexes=new Map;dynamicFileFormatDependencies=new Map;expressionVariablesDependencies=new Map;culledDependencies=new Map;inFlightIndexes=new Map;dependenciesByLayer=new Map;virtualDependenciesByLayer=new Map;sitesByPrimIndex=new Map;generation=0;rebuilding=null;computationObserver;static async create(e,t,i,r){return Hr._create(e,t,i,r)}static async _create(e,t,i,r,n){const o=new Set,a={current:n},c=r?u=>{const d=r(u);return d?o.add(u):o.delete(u),d}:u=>o.has(u),l=r?"predicate":"includeSet";return new Hr(await jr.create(e,t,i,c,l,a),e,t,i,o,c,l,a)}getLayerStack(){return this.indexer.getLayerStack()}setComputationObserver(e){this.computationObserver=e}recordComputationEvent(e,t){this.computationObserver?.(e,t)}setVariantFallbacks(e){Ly(this.variantFallbacks,e)||(this.variantFallbacks=Ll(e),this.generation++,this.clearRetainedPrimIndexes(),this.inFlightIndexes.clear(),this.indexer.setVariantFallbacks(e))}getVariantFallbacks(){return Ll(this.variantFallbacks)}findPrimIndex(e){return this.primIndexes.get(e)}hasAnyDynamicFileFormatArgumentFieldDependencies(){for(const e of this.dynamicFileFormatDependencies.values())if(e.getRelevantFieldNames().size>0)return!0;return!1}hasAnyDynamicFileFormatArgumentAttributeDependencies(){for(const e of this.dynamicFileFormatDependencies.values())if(e.getRelevantAttributeNames().size>0)return!0;return!1}isPossibleDynamicFileFormatArgumentField(e){for(const t of this.dynamicFileFormatDependencies.values())if(t.getRelevantFieldNames().has(e))return!0;return!1}isPossibleDynamicFileFormatArgumentAttribute(e){for(const t of this.dynamicFileFormatDependencies.values())if(t.getRelevantAttributeNames().has(e))return!0;return!1}getDynamicFileFormatArgumentDependencyData(e){return new Nd(this.dynamicFileFormatDependencies.get(e))}findDynamicFileFormatArgumentDependents(e,t,i,r,n,o){const a=new Set,c=new Set(this.findSiteDependencies(e,t).map(l=>l.indexPath));for(const l of c){const u=this.dynamicFileFormatDependencies.get(l);u&&(r!==void 0&&u.canAttributeDefaultValueChangeAffectFileFormatArguments(r,n,o)||i!==void 0&&u.canFieldChangeAffectFileFormatArguments(i,n,o))&&a.add(l)}return[...a]}forEachPrimIndex(e){for(const t of this.primIndexes.values())e(t)}findPayloadPaths(e="/"){const t=new Set;for(const[i,r]of this.primIndexes)if(kr(i,e)){for(const n of r.getNodeRange())if(!(n.culled||n.elided)&&zr(n.layerStack,F(n.path),n.expressionVars).length!==0){t.add(i);break}}return[...t].sort()}isPayloadIncluded(e){return this.includedPayloads.has(e)}getIncludedPayloadPaths(){return[...this.includedPayloads].sort()}requestPayloads(e,t,i){const r=new Set(e),n=new Set;for(const o of r)this.includedPayloads.has(o)||(this.includedPayloads.add(o),n.add(o));for(const o of t)r.has(o)||!this.includedPayloads.delete(o)||n.add(o);if(i)for(const o of n)i.didChangeSignificantlyAtPath(o);else this.invalidatePrimIndexes(n,!0)}forEachLayerUsed(e){for(const t of this.dependenciesByLayer.keys())e(t)}getLayersUsedByPrimIndex(e){return[...new Set((this.sitesByPrimIndex.get(e)??[]).filter(i=>!i.virtual).map(i=>i.layer))]}findPrimIndexPathsUsingLayer(e){const t=new Set;for(const i of this.dependenciesByLayer.get(e)?.values()??[])for(const r of i)t.add(r);return[...t].sort()}findSiteDependencies(e,t,i={}){const r=new Map;for(const[n,o]of this.dependenciesByLayer.get(e)??[])if(!(n!==t&&!(i.recurseOnSite&&Ol(n,t)))){for(const a of o)if(r.set(`${a}\0${n}`,{indexPath:a,sitePath:n}),!!i.recurseOnIndex)for(const c of this.primIndexes.keys())c!==a&&kr(c,a)&&r.set(`${c}\0${n}`,{indexPath:c,sitePath:n})}if(i.includeVirtual){for(const[n,o]of this.virtualDependenciesByLayer.get(e)??[])if(!(n!==t&&!(i.recurseOnSite&&Ol(n,t)))){for(const[a,c]of o)if(!r.has(`${a}\0${n}`))for(const l of c)r.set(`${a}\0${n}\0${l}`,{indexPath:a,sitePath:n,rootMappedSitePath:l})}}return[...r.values()].sort((n,o)=>n.indexPath.localeCompare(o.indexPath)||n.sitePath.localeCompare(o.sitePath))}async computePrimIndex(e){return this._computePrimIndex(e)}async computePrimIndexesInParallel(e,t,i){let r=typeof e=="string"?[e]:[...e];const n=[];for(;r.length>0;){const o=[...new Set(r)];r=[];const a=await Promise.all(o.map(c=>this.computePrimIndex(c)));for(let c=0;c<a.length;c++){let l=a[c];const u=o[c];n.push(...l.localErrors);const d=[...l.getNodeRange()].some(m=>zr(m.layerStack,F(m.path),m.expressionVars).length>0);!this.isPayloadIncluded(u)&&d&&i(u)&&(this.requestPayloads([u],[]),l=await this.computePrimIndex(u),n.push(...l.localErrors));const h=l.computePrimChildNames();t(l,h)&&r.push(...h.map(m=>u==="/"?`/${m}`:`${u}/${m}`))}}return n}async _computePrimIndex(e,t=Fs.get(this)?.current){this.recordComputationEvent("primIndexRequest",e),this.rebuilding&&await this.rebuilding;const i=this.primIndexes.get(e);if(i)return i;const r=this.inFlightIndexes.get(e);if(r)return r;const n=this.generation,o=this.indexer;this.recordComputationEvent("primIndexCompute",e);const a=Fs.get(this)??{current:void 0};let c;return c=ia(a,"usd-ts:PcpCache.computePrimIndex",async l=>(ra(l,"primPath",e),o.buildPrimIndex(e,l)),t).then(l=>{const u=l.primIndex;return this.generation===n&&this.indexer===o&&this.retainPrimIndex(e,u,l.dynamicFileFormatDependency,l.expressionVariablesDependency,l.culledDependencies),u}).finally(()=>{this.inFlightIndexes.get(e)===c&&this.inFlightIndexes.delete(e)}),this.inFlightIndexes.set(e,c),c}invalidatePrimIndexes(e,t=!1){const i=[...new Set(e)];if(i.length!==0){++this.generation,this.inFlightIndexes.clear(),this.indexer.invalidateBuildState();for(const r of[...this.primIndexes.keys()])i.some(n=>r===n||t&&kr(r,n))&&this.removePrimIndexDependencies(r)}}async invalidateAll(e=!1){const t=this.indexer.getLayerStack(),i=e?new Map(this.primIndexes):new Map;++this.generation,this.clearRetainedPrimIndexes(),this.inFlightIndexes.clear();let r;r=jr.create(this.rootLayer,this.opener,this.sessionLayer,this.includePayloadForIndexing,this.payloadInclusionSource,Fs.get(this)).then(a=>{this.rebuilding===r&&(a.setVariantFallbacks(this.variantFallbacks),this.indexer=a)}),this.rebuilding=r;try{await r}finally{this.rebuilding===r&&(this.rebuilding=null)}const n=Cy(t,this.indexer.getLayerStack());if(!e)return n;const o=new Set(n.namespaceRoots);for(const[a,c]of i){const l=await this.computePrimIndex(a);By(c,l)||o.add(a)}return Vd(o),{...n,namespaceRoots:[...o].sort()}}retainPrimIndex(e,t,i,r,n){this.removePrimIndexDependencies(e),this.primIndexes.set(e,t),i.isEmpty()||this.dynamicFileFormatDependencies.set(e,i),r.isEmpty()||this.expressionVariablesDependencies.set(e,r),n.length>0&&this.culledDependencies.set(e,n);const o=[],a=new Map,c=(l,u)=>{const d=u||l.culled||l.elided,h=F(l.path),m=d?l.mapToRoot.mapSourceToTarget(l.path).pathString:void 0;for(const{layer:p}of l.layerStack.layers){let y=a.get(p);y||(y=new Map,a.set(p,y));const f=y.get(h);if(d){if(f===!1)continue;f===void 0&&(y.set(h,!0),o.push({layer:p,sitePath:h,virtual:!0}));let g=this.virtualDependenciesByLayer.get(p);g||(g=new Map,this.virtualDependenciesByLayer.set(p,g));let S=g.get(h);S||(S=new Map,g.set(h,S));let b=S.get(e);b||(b=new Set,S.set(e,b)),b.add(m??h)}else{if(f===!1)continue;y.set(h,!1),o.push({layer:p,sitePath:h,virtual:!1});let g=this.dependenciesByLayer.get(p);g||(g=new Map,this.dependenciesByLayer.set(p,g));let S=g.get(h);S||(S=new Set,g.set(h,S)),S.add(e)}}for(const p of l.children)c(p,d)};c(t.rootNode,!1),this.sitesByPrimIndex.set(e,o)}removePrimIndexDependencies(e){for(const{layer:t,sitePath:i,virtual:r}of this.sitesByPrimIndex.get(e)??[])if(r){const n=this.virtualDependenciesByLayer.get(t),o=n?.get(i);o?.delete(e),o?.size===0&&n?.delete(i),n?.size===0&&this.virtualDependenciesByLayer.delete(t)}else{const n=this.dependenciesByLayer.get(t),o=n?.get(i);o?.delete(e),o?.size===0&&n?.delete(i),n?.size===0&&this.dependenciesByLayer.delete(t)}this.sitesByPrimIndex.delete(e),this.dynamicFileFormatDependencies.delete(e),this.expressionVariablesDependencies.delete(e),this.culledDependencies.delete(e),this.primIndexes.delete(e)}clearRetainedPrimIndexes(){this.primIndexes.clear(),this.dynamicFileFormatDependencies.clear(),this.expressionVariablesDependencies.clear(),this.culledDependencies.clear(),this.dependenciesByLayer.clear(),this.virtualDependenciesByLayer.clear(),this.sitesByPrimIndex.clear()}}function Dy(s,e,t,i,r){return Hr._create(s,e,t,i,r)}function $d(s){return Fs.get(s)?.current}function xy(s,e){const t=Fs.get(s);t&&(t.current=e)}async function Rd(s,e,t){const i=Fs.get(s);if(!i)return await t();const r={},n=i.installations??=[];n.length===0&&(i.current?i.base=i.current:delete i.base),n.push({token:r,context:e}),i.current=e;try{return await t()}finally{const o=n.findIndex(a=>a.token===r);o>=0&&n.splice(o,1),i.current=n.at(-1)?.context??i.base,n.length===0&&delete i.base}}function ky(s,e,t){return s._computePrimIndex(e,t)}function Cy(s,e){const t=s.layers.map(l=>l.layer),i=e.layers.map(l=>l.layer),r=new Set(t),n=new Set(i),o=[...t.filter(l=>!n.has(l)),...i.filter(l=>!r.has(l))],a=new Set;for(const l of o)for(const u of l.getSpecPaths()){if(u==="/")continue;const d=Ey(u);(u.includes(".")||Ny(l,u))&&a.add(d)}Vd(a);const c=new Set;if(o.length===0&&!Oy(t,i)){const l=new Set;for(const u of[...t,...i])for(const d of u.getSpecPaths())d.includes(".")&&l.add(d);for(const u of l)El(t,u)!==El(i,u)&&c.add(u)}return{namespaceRoots:[...a].sort(),changedValuePaths:[...c].sort(),rootLayerStackChanged:o.length>0}}function By(s,e){const t=[...s.getNodeRange()],i=[...e.getNodeRange()];return t.length===i.length&&t.every((r,n)=>{const o=i[n],a=r.layerStack.layers.map(l=>l.layer),c=o.layerStack.layers.map(l=>l.layer);return r.arcType===o.arcType&&r.path.pathString===o.path.pathString&&a.length===c.length&&a.every((l,u)=>l===c[u])})}function Ny(s,e){return s.getField(e,"specifier")!=="over"?!0:s.getFieldNames(e).some(t=>t!=="specifier"&&t!=="primChildren"&&t!=="properties")}function Ey(s){const e=s.indexOf(".",s.lastIndexOf("/"));return e<0?s:s.slice(0,e)}function Oy(s,e){return s.length===e.length&&s.every((t,i)=>t===e[i])}function El(s,e){return s.find(t=>t.hasSpec(e))}function Vd(s){const e=[];for(const t of[...s].sort((i,r)=>i.length-r.length||i.localeCompare(r)))e.some(i=>kr(t,i))||e.push(t);s.clear();for(const t of e)s.add(t)}function kr(s,e){return s===e||s.startsWith(e==="/"?"/":`${e}/`)}function Ol(s,e){return s===e||e==="/"||s.startsWith(`${e}/`)||s.startsWith(`${e}.`)||s.startsWith(`${e}{`)}function Ll(s){return Object.fromEntries(Object.entries(s).map(([e,t])=>[e,[...t]]))}function Ly(s,e){const t=Object.keys(s),i=Object.keys(e);return t.length===i.length&&t.every(r=>{const n=s[r],o=e[r];return o!==void 0&&n?.length===o.length&&n.every((a,c)=>a===o[c])})}function Fy(s){const e=[],t=[...ct(s)].some(r=>r.arcType===x.Payload),i=r=>{if(r.culled)return;const n=rn(r);if(n&&e.push(r),!(n&&!t))for(const o of r.children)i(o)};for(const r of s.children)i(r);return e}function Gd(s){if(!na(s))return null;const e=[];for(const r of Fy(s)){const n=r.mapToRoot.getTimeOffset(),o=`${Yt(r.layerStack.identifier)}:${r.path.pathString}`;e.push(`${x[r.arcType]}|${o}|${n.offset},${n.scale}`)}const t={};for(const r of ct(s)){if(r.inert||r.culled)continue;const n=sy(r.layerStack,F(r.path),r.expressionVars);for(const[o,a]of Object.entries(n))o in t||(t[o]=a)}const i=Object.keys(t).sort().map(r=>`${r}=${t[r]}`);return`Arcs:${e.join(";")}|Variants:${i.join(";")}`}const My=new Set(["subLayers","subLayerOffsets","owner","sessionOwner","hasOwnedSubLayers","timeCodesPerSecond","expressionVariables","layerRelocates"]),$y=new Set(["defaultPrim","references","payload","inheritPaths","specializes","variantSelection","variantSetNames","variantSetChildren","variantChildren","relocates","instanceable","permission","fallbackPrimTypes"]),Ry=new Set(["connectionPaths","targetPaths"]);function Vy(s,e){if(e.kind==="specAdded"||e.kind==="specRemoved")return{layer:s,path:e.path,kind:"spec",specAdded:e.kind==="specAdded",specInert:e.inert??!0,specIsProperty:e.specType==="attribute"||e.specType==="relationship"};let t;return e.fieldName==="primChildren"||e.fieldName==="properties"?t="bookkeeping":e.fieldName==="framesPerSecond"?t="layerMetadata":e.fieldName&&My.has(e.fieldName)?t="layerStack":e.fieldName==="clips"||e.fieldName==="clipSets"?t=e.oldValue===void 0!=(e.newValue===void 0)?"significant":"value":e.fieldName&&$y.has(e.fieldName)?t="significant":e.fieldName&&Ry.has(e.fieldName)?t="target":t="value",e.fieldName===void 0?{layer:s,path:e.path,kind:t}:{layer:s,path:e.path,fieldName:e.fieldName,kind:t,oldValue:e.oldValue,newValue:e.newValue}}class Ud{didChangeSignificantly=new Set;didChangeSpecs=new Set;didChangePrims=new Set;didChangeTargets=new Set;didChangeValues=new Set;didChangeLayerMetadata=new Set;didChangeLayerStackFields=new Set;didChangeLayerStackNamespace=new Set;didChangeLayerStackValues=new Set;didMaybeChangeLayers=!1}class wi{changes=new Ud;assetResolverChanged=!1;didChange(e,t){for(const i of t)this.classify(e,i);this.optimize()}didChangeSignificantly(e,t,i){this.classify(e,{layer:t,path:i,kind:"significant"}),this.optimize()}didChangeSignificantlyAtPath(e){this.changes.didChangeSignificantly.add(e),this.optimize()}didChangeAssetResolver(e){this.assetResolverChanged=!0}getCacheChanges(){return this.optimize(),this.changes}isEmpty(){const e=this.getCacheChanges();return e.didChangeSignificantly.size===0&&e.didChangeSpecs.size===0&&e.didChangePrims.size===0&&e.didChangeTargets.size===0&&e.didChangeValues.size===0&&e.didChangeLayerMetadata.size===0&&!e.didMaybeChangeLayers}async apply(e){const t=this.getCacheChanges();if(this.assetResolverChanged){const r=await e.invalidateAll(!0);r.rootLayerStackChanged&&t.didChangeSignificantly.add("/");for(const n of r.namespaceRoots)t.didChangeSignificantly.add(n);for(const n of r.changedValuePaths)t.didChangeValues.add(n);return}if(t.didMaybeChangeLayers){const r=await e.invalidateAll();for(const n of r.namespaceRoots)t.didChangeLayerStackNamespace.add(n);for(const n of r.changedValuePaths)t.didChangeLayerStackValues.add(n);return}e.invalidatePrimIndexes(t.didChangeSignificantly,!0),e.invalidatePrimIndexes(t.didChangePrims,!1);const i=[];for(const r of t.didChangeSpecs){const n=_i(r),o=e.findPrimIndex(n);o&&!o.hasSpecs()&&i.push(n)}e.invalidatePrimIndexes(i,!1)}classify(e,t){const i=_i(t.path);if(t.kind==="bookkeeping")return;if(t.kind==="layerMetadata"){(e.getLayerStack().layers.some(l=>l.layer===t.layer)||e.findPrimIndexPathsUsingLayer(t.layer).length>0)&&this.changes.didChangeLayerMetadata.add(t.path);return}if(t.kind==="layerStack"){(e.getLayerStack().layers.some(l=>l.layer===t.layer)||e.findPrimIndexPathsUsingLayer(t.layer).length>0)&&(this.changes.didMaybeChangeLayers=!0,t.fieldName&&this.changes.didChangeLayerStackFields.add(t.fieldName));return}if(t.kind==="significant"){const c=e.findSiteDependencies(t.layer,i,{recurseOnSite:!0,recurseOnIndex:!0});for(const l of c)this.changes.didChangeSignificantly.add(l.indexPath);return}if(t.kind==="spec"){this.classifySpecChange(e,t);return}const r=t.path.indexOf("."),n=r>=0&&t.fieldName==="default"?t.path.slice(r+1):void 0,o=e.findDynamicFileFormatArgumentDependents(t.layer,i,n===void 0?t.fieldName:void 0,n,t.oldValue,t.newValue);if(o.length>0){for(const c of o)this.changes.didChangeSignificantly.add(c);return}const a=e.findSiteDependencies(t.layer,i);for(const c of a){const l=Ml(t.path,i,c.indexPath);t.kind==="value"?this.changes.didChangeValues.add(l):this.changes.didChangeTargets.add(l)}}classifySpecChange(e,t){const i=t.specAdded===!0,r=_i(t.path),n=new Set,o=e.findSiteDependencies(t.layer,r,{includeVirtual:!0});for(const a of o)a.rootMappedSitePath!==void 0&&n.add(a.rootMappedSitePath),n.add(a.indexPath);for(let a=Fl(r);a!=="/";){const c=e.findSiteDependencies(t.layer,a,{recurseOnSite:!0,includeVirtual:!0});if(c.length>0){for(const l of c){const u=l.sitePath.slice(a.length),d=l.rootMappedSitePath??l.indexPath;if(u.length>0&&!d.endsWith(u))continue;const h=u.length>0?d.slice(0,d.length-u.length):d;n.add(Ml(t.path,a,h))}break}a=Fl(a)}e.getLayerStack().layers.some(a=>a.layer===t.layer)&&n.add(r);for(const a of n)this.didChangeSpecsAt(e,a,t,i)}didChangeSpecsAt(e,t,i,r){if(i.specIsProperty===!0)return;if(i.specInert!==!0){this.changes.didChangeSignificantly.add(_i(t));return}const n=e.findPrimIndex(t);if(n){if(r?Uy(n,i.layer,i.path):!0){if(!r&&!n.hasSpecs()){this.changes.didChangeSignificantly.add(t);return}const a=Gy(n,i.layer,i.path);if(a){if(Gd(n.rootNode)!==null&&Wy(a,i.layer,i.path,r)){this.changes.didChangeSignificantly.add(t);return}}else if(r){this.changes.didChangePrims.add(t);return}this.changes.didChangeSpecs.add(t);return}if(r){this.changes.didChangeSignificantly.add(t);return}this.changes.didChangeSpecs.add(t);return}if(r){this.changes.didChangeSignificantly.add(t);return}this.changes.didChangeSpecs.add(t)}optimize(){zy(this.changes.didChangeSignificantly);const e=t=>[...this.changes.didChangeSignificantly].some(i=>Wd(t,i));for(const t of[this.changes.didChangeSpecs,this.changes.didChangePrims,this.changes.didChangeTargets,this.changes.didChangeValues])for(const i of t)e(_i(i))&&t.delete(i)}}function Gy(s,e,t){for(const i of s.getNodeRange())if(!(i.inert||i.culled||i.elided)&&i.path.pathString===t&&i.layerStack.layers.some(r=>r.layer===e))return i}function Uy(s,e,t){for(const i of s.getNodeRange()){if(i.inert)continue;const r=F(i.path);for(const n of i.layerStack.layers)if(n.layer.hasSpec(r)&&!(n.layer===e&&i.path.pathString===t))return!0}return!1}function Wy(s,e,t,i){const r=F(s.path);if(i){for(const n of s.layerStack.layers)if(n.layer.hasSpec(r)&&!(n.layer===e&&s.path.pathString===t))return!1;return!0}return!s.layerStack.layers.some(n=>n.layer.hasSpec(r))}function _i(s){const e=s.lastIndexOf("/"),t=s.indexOf(".",e);return t<0?s:s.slice(0,t)}function Fl(s){if(s==="/")return"/";const e=s.lastIndexOf("/");return e<=0?"/":s.slice(0,e)}function Ml(s,e,t){const i=s.slice(e.length);return t==="/"&&i.startsWith("/")?i:`${t}${i}`}function Wd(s,e){return s===e||s.startsWith(e==="/"?"/":`${e}/`)}function zy(s){const e=[];for(const t of[...s].sort((i,r)=>i.length-r.length||i.localeCompare(r)))e.some(i=>Wd(t,i))||e.push(t);s.clear();for(const t of e)s.add(t)}function jy(s){if(s.assetPaths?.length||!s.templateAssetPath)return s;const e=s.templateAssetPath.match(/(#+)(?=[^#]*$)/);if(!e)return s;const t=Number(s.templateStartTime??0),i=Number(s.templateEndTime??t),r=Number(s.templateStride??1);if(r<=0)return s;const n=e[1].length,o=[],a=[],c=[];for(let l=t,u=0;l<=i;l+=r,u++){const d=Number.isInteger(l)?String(l).padStart(n,"0"):String(l);o.push(s.templateAssetPath.slice(0,e.index)+d+s.templateAssetPath.slice(e.index+n)),a.push([l+Number(s.templateActiveOffset??0),u]),c.push([l,l])}return{...s,assetPaths:o,active:a,times:c}}const Do=new WeakMap;function Hy(s){Do.delete(s)}function qy(s){let e=Do.get(s);return e===void 0&&(e=s.getSpecPaths().some(t=>s.getField(t,"clips")!==void 0||s.getField(t,"clipSets")!==void 0),Do.set(s,e)),e}function Ky(s){const e=[];let t=s;for(;t!==""&&t!=="/"&&(e.push(t),t=t.slice(0,t.lastIndexOf("/"))||"/",t!=="/"););return e}function xo(s,e){if(e===void 0)return s;if(s===void 0)return e;if(typeof s=="object"&&s!==null&&!Array.isArray(s)&&typeof e=="object"&&e!==null&&!Array.isArray(e)){const t={...s};for(const[i,r]of Object.entries(e))t[i]=xo(t[i],r);return t}return e}function hr(s,e){return!s||e.offset===0&&e.scale===1?s:s.map(([t,i])=>[qe(e,t),i])}function zd(s){const e=new Map;let t=-1;for(const r of s.getNodeRange()){if(t++,r.inert)continue;const n=F(r.path);let o=null;const a=r.layerStack.layers,c=r.mapToRoot.getTimeOffset(),l=new Map;let u=[];for(let d=a.length-1;d>=0;d--){const h=a[d],m=h.layer;if(!qy(m))continue;o??=Ky(n);const p=Mt(c,h.offset),y=[];for(let f=o.length-1;f>=0;f--){const g=o[f],S=m.getField(g,"clips");if(S){const P=n.slice(g.length);for(const[w,_]of Object.entries(S)){const v={..._};if(v.assetPaths?.length||v.templateAssetPath){const k=l.get(w),B={layer:m,layerStack:r.layerStack,primPath:g,layerIdx:d,nodeIdx:t,tail:P,offset:p};k?k.anchor=B:l.set(w,{def:{},anchor:B})}const A=hr(v.active,p);A&&(v.active=A);const T=hr(v.times,p);T&&(v.times=T);const E=l.get(w)??{def:{}};E.def=xo(E.def,v),l.set(w,E),y.push(w)}}const b=m.getField(g,"clipSets");if(y.length>0&&f===0&&(u=Ps(u,{appendedItems:[...new Set(y)].sort()})),b!==void 0){const P=Ft(b);P&&(u=Ps(u,P))}}}for(const[d,h]of l){const m=u.indexOf(d);if(m<0)continue;let p=e.get(d);p||(p={def:{},layerStackOrder:m},e.set(d,p)),!p.anchor&&h.anchor&&(p.anchor=h.anchor,p.layerStackOrder=m),p.def=xo(h.def,p.def)}}const i=[];for(const[r,n]of e){if(!n.anchor)continue;let o=n.def;if(!o.assetPaths?.length&&o.templateAssetPath){const a=jy(o);if(a!==o){o={...a};const c=hr(a.active,n.anchor.offset);c&&(o.active=c);const l=hr(a.times,n.anchor.offset);l&&(o.times=l)}}i.push({name:r,def:o,anchorLayer:n.anchor.layer,sourceLayerStack:n.anchor.layerStack,sourcePrimPath:n.anchor.primPath,indexOfLayerWhereAssetPathsFound:n.anchor.layerIdx,tail:n.anchor.tail,position:[n.anchor.nodeIdx,n.anchor.layerIdx],layerStackOrder:n.layerStackOrder,timeOffset:n.anchor.offset})}if(i.length!==0)return i.sort((r,n)=>r.position[0]-n.position[0]||r.sourcePrimPath.localeCompare(n.sourcePrimPath)||r.layerStackOrder-n.layerStackOrder||(r.name<n.name?-1:1)),i}function Xy(s,e,t=!1){if(s.length===0)return e;if(s.length===1)return s[0][1]+(e-s[0][0]);if(e<=s[0][0])return s[0][1];if(e>=s[s.length-1][0])return s[s.length-1][1];for(let i=s.length-2;i>=0;i--){const[r,n]=s[i],[o,a]=s[i+1];if(o!==r&&!(t&&e===r&&i>0&&s[i-1][0]===r)&&(e>=r||i===0))return n+(e-r)/(o-r)*(a-n)}return e}function jd(s,e){if(s.length===0)return 0;let t=s[0][1];for(const[i,r]of s)if(i<=e)t=r;else break;return t}function er(s){return Array.isArray(s)?s:typeof s=="object"&&s!==null?Object.entries(s).map(([e,t])=>[Number(e),t]).sort(([e],[t])=>e-t):[]}function Yy(s){return typeof s=="object"&&s!==null&&"value"in s?s.value:s}function ko(s,e,t,i=!1,r){if(s.interpolateMissingClipValues){const n=tr(s).map(o=>[o,qr(s,o,t,!1,r)]).filter(o=>o[1]!==void 0);if(n.length>0)return fi(n,e,t,i,r)}return qr(s,e,t,i,r)}function Zy(s,e,t,i){if(s.length===0)return e;if(s.length===1)return s[0][0]+e-s[0][1];for(let r=s.length-2;r>=0;r--){const[n,o]=s[r],[a,c]=s[r+1];if(!(a===n||c===o)&&!(i&&t===n&&r>0&&s[r-1][0]===n)&&(t>=n||r===0))return n+(e-o)/(c-o)*(a-n)}return e}function qr(s,e,t,i=!1,r){const n=s.layers[jd(s.active,e)];if(!n)return s.manifestDefault;const o=er(n.getField(s.attrPath,"timeSamples"));if(o.length===0)return s.manifestDefault;const a=Xy(s.times,e,i),c=[...o].sort(([d],[h])=>d-h);if(a>c[c.length-1][0]){const d=tr(s),h=[...d].reverse().find(y=>y<=e),m=d.find(y=>y>e),p=m!==void 0&&s.times.some((y,f)=>f+1<s.times.length&&y[0]===m&&s.times[f+1][0]===m);if(h!==void 0&&m!==void 0&&!p){const y=qr(s,h,t,!1,r),f=qr(s,m,t,!1,r);if(y!==void 0&&f!==void 0)return fi([[h,y],[m,f]],e,t,i,r)}}const l=c.map(([d,h])=>[d,Qy(s,Yy(h),Zy(s.times,d,e,i),d)]);return fi(l,a,t,i,r)}function Qy(s,e,t,i){return s.valueIsTimeCode?typeof e=="number"?e+t-i:Array.isArray(e)?e.map(r=>typeof r=="number"?r+t-i:r):e:e}function tr(s){const e=new Set,t=s.active.length>0?s.active:[[0,0]];for(let i=0;i<t.length;i++){const r=t[i][0],n=t[i+1]?.[0]??1/0,o=s.layers[t[i][1]];if(!o)continue;const a=er(o.getField(s.attrPath,"timeSamples")).map(([l])=>l),c=s.manifestBlockedTimes.has(r);if(!(s.interpolateMissingClipValues&&s.manifestDefault===void 0&&(c||a.length===0))){if(e.add(r),s.times.length===0){for(const l of a)r<=l&&l<n&&e.add(l);continue}for(const l of a)for(let u=0;u+1<s.times.length;u++){const[d,h]=s.times[u],[m,p]=s.times[u+1];if(d===m||h===p||l<Math.min(h,p)||l>Math.max(h,p))continue;const y=d+(l-h)/(p-h)*(m-d);r<=y&&y<n&&e.add(y)}for(const[l]of s.times)r<=l&&l<n&&e.add(l)}}return[...e].sort((i,r)=>i-r)}function Jy(s,e,t,i){if(!s||i.length===0)return!1;const r=`${e}${t}.`,n=s.getSpecPaths().filter(o=>o.startsWith(r));return n.length===0?!1:n.every(o=>{const a=new Set(er(s.getField(o,"timeSamples")).filter(([,c])=>c instanceof pe||c===null||c===void 0).map(([c])=>c));return i.every(c=>a.has(c))})}async function aa(s,e){const t=zd(s);if(!t)return;const i=[];for(const{name:r,def:n,anchorLayer:o,tail:a,position:c,timeOffset:l}of t){if(!n.primPath||!n.assetPaths||n.assetPaths.length===0)continue;let u=null;if(n.manifestAssetPath){const p=o.resolveAsset(n.manifestAssetPath);u=p?await e(p):null}const d=n.active??[[qe(l,0),0]],h=n.times?.length?n.times:l.offset!==0||l.scale!==1?[[l.offset,0],[l.offset+l.scale,1]]:[],m=[];for(let p=0;p<n.assetPaths.length;p++){const y=d.filter(([,g])=>g===p).map(([g])=>g);if(n.interpolateMissingClipValues===!0&&Jy(u,n.primPath,a,y)){m.push(null);continue}const f=o.resolveAsset(n.assetPaths[p]);m.push(f?await e(f):null)}i.push({name:r,primPath:n.primPath,active:d,times:h,layers:m,manifest:u,tail:a,position:c,interpolateMissingClipValues:n.interpolateMissingClipValues===!0})}return i.length>0?i:void 0}function eS(s,e){return s.manifest?s.manifest.hasSpec(e):s.layers.some(t=>{const i=t?.getField(e,"timeSamples");return i!=null})}function Hd(s,e){const t=[];for(const i of e){const r=`${i.primPath}${i.tail}.${s}`;if(!eS(i,r))continue;const n=i.manifest?.getField(r,"default"),o=new Set(er(i.manifest?.getField(r,"timeSamples")).filter(([,a])=>a instanceof pe||a===null||a===void 0).map(([a])=>a));t.push({position:i.position,attrPath:r,active:i.active,times:i.times,layers:i.layers,interpolateMissingClipValues:i.interpolateMissingClipValues,manifestDefault:n,manifestBlockedTimes:o,valueIsTimeCode:["timecode","timecode[]"].includes(String(i.manifest?.getField(r,"typeName")))||i.layers.some(a=>["timecode","timecode[]"].includes(String(a?.getField(r,"typeName"))))})}return t.length>0?t:void 0}function tS(s,e,t){const i=Hd(s,[e])?.[0];if(!i)return[];const r=tr(i);if(r.length===0)return[];const n=[...r].reverse().find(c=>c<=t)??r[0],o=r.find(c=>c>=t)??r[r.length-1],a=[];for(const c of n===o?[n]:[n,o]){const l=e.layers[jd(e.active,c)],d=er(l?.getField(i.attrPath,"timeSamples")).length>0?l:e.manifest;!d||!d.hasSpec(i.attrPath)||a.some(h=>h.layer===d)||a.push({layer:d,specPath:i.attrPath,position:e.position})}return a}var Cr=(s=>(s[s.None=0]="None",s[s.Fallback=1]="Fallback",s[s.Default=2]="Default",s[s.TimeSamples=3]="TimeSamples",s[s.ValueClips=4]="ValueClips",s[s.Spline=5]="Spline",s))(Cr||{});const sS={none:0,fallback:1,default:2,timeSamples:3,valueClips:4,spline:5},ca=new WeakMap,qd=()=>({source:"none",valueIsBlocked:!1}),Ds=s=>ca.get(s)??qd();class iS{constructor(){ca.set(this,qd())}getSource(){return sS[Ds(this).source]}hasAuthoredValueOpinion(){return this.hasAuthoredValue()||this.valueIsBlocked()}hasAuthoredValue(){const e=Ds(this);return e.source==="default"||e.source==="timeSamples"||e.source==="valueClips"||e.source==="spline"}getNode(){return Ds(this).node}valueIsBlocked(){return Ds(this).valueIsBlocked}valueSourceMightBeTimeVarying(){const e=Ds(this);return e.source==="timeSamples"||e.source==="valueClips"||e.source==="spline"||this.getNextWeakerInfo()?.valueSourceMightBeTimeVarying()===!0}hasNextWeakerInfo(){return Ds(this).nextWeaker!==void 0}getNextWeakerInfo(){const e=Ds(this).nextWeaker;return e?Br(e):void 0}}function Br(s){const e=new iS;return ca.set(e,s),e}const Ge=Object.freeze({model:"model",component:"component",group:"group",assembly:"assembly",subcomponent:"subcomponent"});class la{static#s;#t=new Map;constructor(){this.#i(Ge.subcomponent,""),this.#i(Ge.model,""),this.#i(Ge.component,Ge.model),this.#i(Ge.group,Ge.model),this.#i(Ge.assembly,Ge.group);for(const e of Ne.GetInstance().GetAllPlugins()){const t=e.GetMetadata().Kinds;if(!(!t||typeof t!="object"||Array.isArray(t)))for(const[i,r]of Object.entries(t)){if(!r||typeof r!="object"||Array.isArray(r))continue;const n=r.baseKind;this.#i(i,typeof n=="string"?n:"")}}}#i(e,t){!/^[A-Za-z_][A-Za-z0-9_]*$/.test(e)||this.#t.has(e)||this.#t.set(e,t)}static GetInstance(){return this.#s??=new la}static HasKind(e){return this.GetInstance().#t.has(e)}static GetBaseKind(e){return this.GetInstance().#t.get(e)??""}static IsA(e,t){if(e===t)return!0;const i=new Set;let r=e;for(;!i.has(r);){if(i.add(r),r=this.GetInstance().#t.get(r)??"",r===t)return!0;if(r==="")return!1}return!1}static GetAllKinds(){return[...this.GetInstance().#t.keys()]}static IsModel(e){return this.IsA(e,Ge.model)}static IsGroup(e){return this.IsA(e,Ge.group)}static IsAssembly(e){return this.IsA(e,Ge.assembly)}static IsComponent(e){return this.IsA(e,Ge.component)}static IsSubComponent(e){return this.IsA(e,Ge.subcomponent)}}function rS(s){return typeof s=="number"?{time:s,isPreTime:!1}:s.IsDefault()?{time:"default",isPreTime:!1}:{time:s.GetValue(),isPreTime:s.IsPreTime()}}class Kt{constructor(e=()=>!0,t=!1){this._evaluate=e,this.includeInstanceProxies=t}evaluate(e){if(!e)throw new Error("Cannot evaluate a prim predicate on an invalid prim");return this._evaluate(e)}and(e){const t=Hi(e);return new Kt(i=>this.evaluate(i)&&t.evaluate(i),this.includeInstanceProxies||t.includeInstanceProxies)}or(e){const t=Hi(e);return new Kt(i=>this.evaluate(i)||t.evaluate(i),this.includeInstanceProxies||t.includeInstanceProxies)}not(){return new Kt(e=>!this.evaluate(e),this.includeInstanceProxies)}traverseInstanceProxies(e=!0){return new Kt(this._evaluate,e)}}function Hi(s){return s instanceof Kt?s:new Kt(s)}const nn=s=>new Kt(s),nS=nn(s=>s.isActive),oS=nn(s=>s.isLoaded),aS=nn(s=>s.isAbstract),cS=nn(s=>s.isDefined),$l=new Kt,Co=nS.and(cS).and(oS).and(aS.not());function Kd(s,e){if(e.kind==="multipleApplyAPI"){const t=`${e.identifier}:`;return s.some(i=>i.startsWith(t))}return e.kind==="singleApplyAPI"?s.includes(e.identifier):!1}function Xd(s,e,t){return e.kind!=="multipleApplyAPI"?!1:s.includes(`${e.identifier}:${t}`)}function xs(s,e,t){if(typeof s!="string"){const n=C.findSchemaInfo(s);return n?C.findSchemaInfosInFamily(n.family,n.version,t):[]}if(e===void 0&&t===void 0)return C.findSchemaInfosInFamily(s);if(e!==void 0)return C.findSchemaInfosInFamily(s,e,t);const i=C.findSchemaInfo(s);if(i)return C.findSchemaInfosInFamily(i.family,i.version,t);const r=C.parseSchemaFamilyAndVersionFromIdentifier(s);return r?C.findSchemaInfosInFamily(r[0],r[1],t):[]}const lS=new Set(["all","greaterThan","greaterThanOrEqual","lessThan","lessThanOrEqual"]);function uS(s){return typeof s=="string"&&lS.has(s)}function Rl(s,e){for(const t of e)if(s.IsA(t.type))return t;return null}function Vl(s,e,t){if(s.length===0)return null;if(t!==void 0&&t==="")throw new Error("Instance name must be non-empty");for(const i of e)if(t===void 0?Kd(s,i):Xd(s,i,t))return i;return null}function pr(s,e){return la.IsA(s,e)}const Gl=new WeakMap;function Bo(s){const e=Gl.get(s),t=Zm(s);if(e&&e.generation===t&&e.size===s.size)return e.index;const i=new Map([...wd(s)].map(([o,a])=>[o,[...a]])),r=new Map;for(const o of s.keys()){if(o==="/")continue;const a=o.indexOf(".");if(a>=0){const c=a===0?"/":o.slice(0,a);let l=r.get(c);l||r.set(c,l=[]),l.push(o.slice(a+1))}}const n={children:i,attrs:r};return Gl.set(s,{generation:t,size:s.size,index:n}),n}class ls{constructor(e,t,i,r){this._nodes=e,this.path=t,this._stage=r,this._dataPath=i??t}_dataPath;getStage(){if(!this._stage)throw new Error(`Prim <${this.path}>: this handle carries no stage (not fetched via Stage.getPrim)`);return this._stage}_getStage(){return this._stage}get typeName(){return this._nodes.get(this._dataPath)?.fields.typeName??""}get _fields(){return this._nodes.get(this._dataPath)?.fields}_getMetadataValueTypeName(e){return this._stage?._resolvePrimFieldTypeName(this._dataPath,e)}getPrimTypeInfo(){const e=this._nodes.get(this._dataPath)?.fields;if(!e)return ft.getEmptyPrimType();const t=e.typeName??"",i=this._stage?._getAuthoredAppliedSchemas(this._dataPath)??e.apiSchemas,r=Array.isArray(i)?i:[],n=this._nodes.get("/")?.fields.__fallbackPrimTypes,o=t!==""?n?.[t]??"":"";return ft._findOrCreatePrimTypeInfo(t,o,r)}getPrimDefinition(){return this.getPrimTypeInfo().getPrimDefinition()}getAppliedSchemas(){return this.getPrimDefinition().getAppliedAPISchemas()}isA(e,t){const i=typeof e=="string"&&t!==void 0?C.findSchemaInfoInFamily(e,t):C.findSchemaInfo(e);return i?this.getPrimTypeInfo().getSchemaType().IsA(i.type):!1}isInFamily(e,t,i){const r=typeof t=="number"?xs(e,t,i):xs(e,void 0,t);return Rl(this.getPrimTypeInfo().getSchemaType(),r)!==null}getVersionIfIsInFamily(e){return Rl(this.getPrimTypeInfo().getSchemaType(),xs(e))?.version}hasAPI(e,t,i){let r,n;if(typeof e=="string"&&typeof t=="number")r=C.findSchemaInfoInFamily(e,t),n=i;else if(typeof e=="string"){n=typeof t=="string"?t:void 0;let a=e;if(n===void 0){const c=a.indexOf(":");c!==-1&&(n=a.slice(c+1),a=a.slice(0,c))}r=C.findSchemaInfo(a)}else r=C.findSchemaInfo(e),n=typeof t=="string"?t:void 0;if(!r)return!1;const o=this.getAppliedSchemas();return o.length===0?!1:n===void 0?Kd(o,r):Xd(o,r,n)}hasAPIInFamily(e,t,i,r){let n,o;return typeof t=="number"?(n=xs(e,t,i),o=r):uS(t)?(n=xs(e,void 0,t),o=i):(n=xs(e),o=t),Vl(this.getAppliedSchemas(),n,o)!==null}getVersionIfHasAPIInFamily(e,t){return Vl(this.getAppliedSchemas(),xs(e),t)?.version}get isActive(){for(const e of this._ancestorPaths())if(this._nodes.get(e)?.fields.active===!1)return!1;return!0}get isDefined(){for(const e of this._ancestorPaths()){const t=this._nodes.get(e)?.fields.specifier;if(!/^\/__Prototype_\d+$/.test(e)&&t!=="def"&&t!=="class")return!1}return!0}get isAbstract(){return this._ancestorPaths().some(e=>this._nodes.get(e)?.fields.specifier==="class")}get isLoaded(){return this._stage?._isPrimLoaded(this._dataPath)??!0}hasDefiningSpecifier(){const e=this._nodes.get(this._dataPath)?.fields.specifier;return e==="def"||e==="class"}hasClassSpecifier(){return this._stage?._hasClassSpecifier(this.path)??this._nodes.get(this._dataPath)?.fields.specifier==="class"}getFilteredChildren(e){if(!this._stage)return[];const t=Hi(e),i=t.includeInstanceProxies||this.isInstanceProxy();return this._stage.getAllChildPrimPaths(this.path,{instanceProxies:i}).map(r=>this._stage.getPrim(r)).filter(r=>r!==void 0&&t.evaluate(r))}getChildren(){return this.getFilteredChildren(Co)}getAllChildren(){return this.getFilteredChildren($l)}getFilteredDescendants(e){const t=Hi(e),i=[],r=n=>{for(const o of n.getFilteredChildren(t))i.push(o),r(o)};return r(this),i}getDescendants(){return this.getFilteredDescendants(Co)}getAllDescendants(){return this.getFilteredDescendants($l)}_ancestorPaths(){const e=[];let t=this._dataPath;for(;t!=="/";){e.push(t);const i=t.lastIndexOf("/");t=i<=0?"/":t.slice(0,i)}return e}getMetadata(e){const t=e.startsWith("__")?void 0:this._stage?._resolvePrimMetadata(this._dataPath,e)??this._nodes.get(this._dataPath)?.fields[e],i=this.getPrimDefinition().getMetadataField(e);return t===void 0?i:bt(t)&&bt(i)?sn(t,i):t}setMetadata(e,t){return this._stage?(this._stage._setPrimMetadata(this.path,e,t),!0):!1}clearMetadata(e){return this._stage?(this._stage._clearPrimMetadata(this.path,e),!0):!1}getKind(){const e=this.getMetadata("kind");return typeof e=="string"?e:""}setKind(e){return this.setMetadata("kind",e)}isKind(e,t="modelHierarchy"){return t!=="none"&&t!=="KindValidationNone"&&pr(e,"model")&&!this.isModel()?!1:pr(this.getKind(),e)}isModel(){if(!pr(this.getKind(),"model"))return!1;const e=this.path.lastIndexOf("/"),t=e<=0?"/":this.path.slice(0,e);return t==="/"?!0:this._stage?.getPrim(t)?.isGroup()??!1}isGroup(){return this.isModel()&&pr(this.getKind(),"group")}get attrNames(){return[...Bo(this._nodes).attrs.get(this._dataPath)??[]]}getAttr(e){const t=this._dataPath==="/"?`.${e}`:`${this._dataPath}.${e}`,i={name:e,def:()=>this.getPrimDefinition()};if(this._nodes.get(t))return new ci(this._nodes,t,i,this._stage,this._dataPath,e,this.path);if(this._nodes.has(this._dataPath))return new ci(this._nodes,t,i,this._stage,this._dataPath,e,this.path);if(this._stage)return new ci(this._nodes,t,i,this._stage,this._dataPath,e,this.path)}findAllAttributeConnectionPaths(e={}){if(!this._stage)return[];const t=e.traversalPredicate==="allPrims",i=new Set,r=new Set,n=(l,u)=>l===u||l.startsWith(`${u}/`)||l.startsWith(`${u}.`),o=l=>{const u=l.indexOf(".");return u<0?l:l.slice(0,u)},a=l=>{if(i.has(l))return;const u=this._stage.getPrim(l);if(u){i.add(l);for(const d of u.attrNames){const h=u.getAttr(d);if(!(!h||h.isRelationship)&&!(e.predicate&&!e.predicate(h)))for(const m of h.getConnections())r.add(m),e.recurseOnSources&&!n(m,this.path)&&c(o(m))}}},c=l=>{const u=[l];for(;u.length>0;){const d=u.pop();a(d);const h=t?this._stage.getAllChildPrimPaths(d):this._stage.getChildPrimPaths(d);for(let m=h.length-1;m>=0;--m)u.push(h[m])}};return c(this.path),[...r].sort()}getPropertyNames(){const e=new Set(this.getPrimDefinition().getPropertyNames());for(const o of this.attrNames)e.add(o);if(e.size===0)return[];const t=[...e].sort((o,a)=>Ot(o,a)?-1:Ot(a,o)?1:0),i=this.getMetadata("propertyOrder");if(!Array.isArray(i)||i.length===0)return t;const r=[],n=new Set;for(const o of i)e.has(o)&&!n.has(o)&&(r.push(o),n.add(o));return[...r,...t.filter(o=>!n.has(o))]}getAllMetadata(){const e=new Set;for(const i of Object.keys(this._fields??{}))i.startsWith("__")||e.add(i);for(const i of this.getPrimDefinition().listMetadataFields())e.add(i);const t={};for(const i of[...e].sort((r,n)=>Ot(r,n)?-1:Ot(n,r)?1:0)){const r=this.getMetadata(i);r!==void 0&&(t[i]=r)}return t}getAllAuthoredMetadata(){if(this._stage)return this._stage._getAllAuthoredPrimMetadata(this._dataPath);const e={};for(const[t,i]of Object.entries(this._fields??{}))!t.startsWith("__")&&i!==void 0&&(e[t]=i);return e}hasAuthoredMetadata(e){return!e.startsWith("__")&&e in this.getAllAuthoredMetadata()}setTypeName(e){this.getStage()._setPrimTypeName(this.path,e)}attr(e){return this.getAttr(e)}createAttr(e,t){const i=this.attr(e);return t!==void 0&&i.set(t),i}rel(e){return new qm(this.getStage(),this.path,e)}createRel(e,t){const i=this.rel(e);return i.setTargets(t??[]),i}getReferences(){return new ll(this.getStage(),this.path,"references")}getPayloads(){return new ll(this.getStage(),this.path,"payload")}getSpecializes(){return new Km(this.getStage(),this.path)}async setActive(e){const t=this.getStage();await t._ownAuthoringAsync(async()=>{t.getEditTarget().getLayer().setField(this.path,"active",e),await t._recomposeForEdit()})}addAppliedSchema(e){this.getStage().applyAPI(this.path,e)}_resolveAppliedSchemaArgs(e,t,i,r){let n,o;if(typeof t!="string")n=C.findSchemaInfo(t),o=typeof i=="string"?i:void 0;else if(typeof i=="number")n=C.findSchemaInfoInFamily(t,i),o=r;else{o=i;let a=t;if(o===void 0){const c=a.indexOf(":");c!==-1&&(o=a.slice(c+1),a=a.slice(0,c))}n=C.findSchemaInfo(a)}if(!n)throw new Error(`${e}: Cannot find a valid schema for '${String(t)}'`);return{info:n,instance:o}}_isValidApplyToTarget(e,t){const i=C.getAPISchemaCanOnlyApplyToTypeNames(e.identifier,t);if(i.length===0)return!0;const r=this.getPrimTypeInfo().getSchemaType();if(!r.IsUnknown())for(const n of i){const o=C.getTypeFromSchemaTypeName(n);if(r.IsA(o))return!0}return!1}canApplyAPI(e,t,i){const{info:r,instance:n}=this._resolveAppliedSchemaArgs("CanApplyAPI",e,t,i);if(n===void 0){if(r.kind!=="singleApplyAPI")throw new Error(`CanApplyAPI: Provided schema type ${r.identifier} is not a single-apply API schema.`);return this._isValidApplyToTarget(r,"")}if(r.kind!=="multipleApplyAPI")throw new Error(`CanApplyAPI: Provided schema type ${r.identifier} is not a multiple-apply API schema.`);if(n==="")throw new Error(`CanApplyAPI: for multiple apply API schema ${r.identifier}, a non-empty instance name must be provided.`);return C.isAllowedAPISchemaInstanceName(r.identifier,n)?this._isValidApplyToTarget(r,n):!1}applyAPI(e,t,i){const{info:r,instance:n}=this._resolveAppliedSchemaArgs("ApplyAPI",e,t,i);if(n===void 0){if(r.kind!=="singleApplyAPI")throw new Error(`ApplyAPI: Provided schema type ${r.identifier} is not a single-apply API schema.`);return this.getStage().applyAPI(this.path,r.identifier),!0}if(r.kind!=="multipleApplyAPI")throw new Error(`ApplyAPI: Provided schema type ${r.identifier} is not a multiple-apply API schema.`);if(n==="")throw new Error(`ApplyAPI: for multiple apply API schema ${r.identifier}, a non-empty instance name must be provided.`);return this.getStage().applyAPI(this.path,`${r.identifier}:${n}`),!0}removeAPI(e,t,i){const{info:r,instance:n}=this._resolveAppliedSchemaArgs("RemoveAPI",e,t,i);if(n===void 0){if(r.kind!=="singleApplyAPI")throw new Error(`RemoveAPI: Provided schema type ${r.identifier} is not a single-apply API schema.`);return this.getStage().removeAppliedSchema(this.path,r.identifier),!0}if(r.kind!=="multipleApplyAPI")throw new Error(`RemoveAPI: Provided schema type ${r.identifier} is not a multiple-apply API schema.`);if(n==="")throw new Error(`RemoveAPI: for multiple apply API schema ${r.identifier}, a non-empty instance name must be provided.`);return this.getStage().removeAppliedSchema(this.path,`${r.identifier}:${n}`),!0}isInstance(){return this._nodes.get(this._dataPath)?.fields.__prototypePath!==void 0}getPrototype(){const e=this._nodes.get(this._dataPath)?.fields.__prototypePath;if(!(e===void 0||!this._nodes.has(e)))return new ls(this._nodes,e,void 0,this._stage)}isInstanceable(){return this._nodes.get(this._dataPath)?.fields.instanceable===!0}isInstanceProxy(){return this._dataPath!==this.path}getPrimInPrototype(){if(this.isInstanceProxy())return new ls(this._nodes,this._dataPath,void 0,this._stage)}isPrototype(){return/^\/__Prototype_\d+$/.test(this.path)}isInPrototype(){return/^\/__Prototype_\d+([/.]|$)/.test(this._dataPath)&&!this.isInstanceProxy()}}class ci{constructor(e,t,i,r,n,o,a){this._nodes=e,this._path=t,this._fallbackSource=i,this._queryProvider=r,this._dataPrimPath=n,this._propertyName=o,this._resultPrimPath=a}get node(){return this._nodes.get(this._path)??{fields:{}}}_getStage(){return this._queryProvider}_getPrimPath(){if(this._dataPrimPath!==void 0)return this._dataPrimPath;const e=this._path.indexOf(".");return e<0?this._path:this._path.slice(0,e)}_getName(){if(this._propertyName!==void 0)return this._propertyName;const e=this._path.indexOf(".");return e<0?"":this._path.slice(e+1)}flattenTo(e,t){if(!this._queryProvider)throw new Error(`Cannot flatten invalid property <${this._path}>`);return this._queryProvider._flattenProperty(this,e,t)}getPropertyStack(e="default"){return this._queryProvider?this._queryProvider.getPropertyStack(`${this._getPrimPath()}.${this._getName()}`,e):[]}getPropertyStackWithLayerOffsets(e="default"){return this._queryProvider?this._queryProvider.getPropertyStackWithLayerOffsets(`${this._getPrimPath()}.${this._getName()}`,e):[]}#s(){return this._fallbackSource?.def()?.getAttributeFallbackValue(this._fallbackSource.name)}hasFallbackValue(){return this.#s()!==void 0}getFallbackValue(){return this.#s()}#t(e){if(!(!this._queryProvider||this._dataPrimPath===void 0||this._propertyName===void 0))return this._queryProvider._resolveAttribute(this._dataPrimPath,this._propertyName,e,()=>this.#s())}getValue(){const e=this.#t("default");if(e)return e.valueIsBlocked?void 0:e.value;if("default"in this.node.fields){const t=this.node.fields.default;return t instanceof pe||t instanceof tt?void 0:t}return this.#s()}hasAuthoredValue(){const e=this.#t(void 0);return e?Br(e).hasAuthoredValue():"default"in this.node.fields||(this.node.timeSamples?.length??0)>0}hasAuthoredValueOpinion(){const e=this.#t(void 0);return e?Br(e).hasAuthoredValueOpinion():this.hasAuthoredValue()}hasValue(){const e=this.#t(void 0);return e?e.source!=="none"||e.valueIsBlocked:this.getValue()!==void 0}getResolveInfo(e){const t=this.#t(e)??{source:this.getValue()===void 0?"none":"default",value:this.getValue(),valueIsBlocked:!1};return Br(t)}get typeName(){return this.getField("typeName")??""}get isRelationship(){return this.typeName==="rel"}isCustom(){return!this._queryProvider||this._dataPrimPath===void 0||this._propertyName===void 0?this.node.fields.custom===!0:this._queryProvider._isPropertyCustom(this._dataPrimPath,this._propertyName)}getField(e){return e==="spline"?this.getSpline():this._queryProvider&&this._dataPrimPath!==void 0&&this._propertyName!==void 0?this._queryProvider._resolvePropertyField(this._dataPrimPath,this._propertyName,e):this.node.fields[e]}_getMetadataValueTypeName(e){if(!(!this._queryProvider||this._dataPrimPath===void 0||this._propertyName===void 0))return this._queryProvider._resolvePropertyFieldTypeName(this._dataPrimPath,this._propertyName,e)}setMetadata(e,t){return!this._queryProvider||this._dataPrimPath===void 0||this._propertyName===void 0?!1:(this._queryProvider._setPropertyMetadata(this._dataPrimPath,this._propertyName,e,t),!0)}getConnections(){if(this._queryProvider&&this._dataPrimPath!==void 0&&this._propertyName!==void 0)return this._queryProvider._resolvePropertyPaths(this._dataPrimPath,this._propertyName,"connectionPaths",this._resultPrimPath)??[];const e=this.node.fields.connectionPaths;return typeof e=="string"?[e]:Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}getTargets(){if(this._queryProvider&&this._dataPrimPath!==void 0&&this._propertyName!==void 0)return this._queryProvider._resolvePropertyPaths(this._dataPrimPath,this._propertyName,"targetPaths",this._resultPrimPath)??[];const e=this.node.fields.targetPaths;return typeof e=="string"?[e]:Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}getDefaultValue(){const e=this.#t("default");if(e)return e.valueIsBlocked?void 0:e.value;if("default"in this.node.fields){const t=this.node.fields.default;return t instanceof pe||t instanceof tt?void 0:t}return this.#s()}getDefaultValueResult(){const e=this.#t("default");return e?.source==="default"?{source:"authored",value:e.value}:e?{source:"fallback",value:e.value??null}:"default"in this.node.fields?{source:"authored",value:this.node.fields.default}:{source:"fallback",value:this.#s()??null}}getTimeSampleKeys(){const e=this.#t(void 0);return e?(e.timeSamples??[]).map(([t])=>t).sort((t,i)=>t-i):this.node.clips?.length?tr(this.node.clips[0]):(this.node.timeSamples??[]).map(([t])=>t).sort((t,i)=>t-i)}hasSpline(){return this.#t(void 0)?.source==="spline"}getSpline(){const e=this.#t(void 0);return e?.source==="spline"?Om(e.spline,e.layerToStageOffset):void 0}getTimeSamplesInInterval(e){const t=e.GetMin(),i=e.GetMax();return this.getTimeSampleKeys().filter(r=>(r>t||r===t&&e.IsMinClosed())&&(r<i||r===i&&e.IsMaxClosed()))}static getUnionedTimeSamples(e){return[...new Set(e.flatMap(t=>t.getTimeSampleKeys()))].sort((t,i)=>t-i)}static getUnionedTimeSamplesInInterval(e,t){return[...new Set(e.flatMap(i=>i.getTimeSamplesInInterval(t)))].sort((i,r)=>i-r)}getBracketingTimeSamples(e){const t=this.getTimeSampleKeys();if(t.length===0)return[];const i=[...t].reverse().find(n=>n<=e)??t[0],r=t.find(n=>n>=e)??t[t.length-1];return[i,r]}getValueAtTime(e,t){const{time:i,isPreTime:r}=rS(e);if(i==="default")return this.getValue();const n=this.#t(i);if(n){if(n.valueIsBlocked)return;if(n.source==="spline")return sl(n.spline,i,r,n.layerToStageOffset);if(n.source==="timeSamples"){if(n.valueEvaluator)return n.valueEvaluator(i,r);const l=fi(n.timeSamples??[],i,t?.interpolation??n.interpolation,r,n.typeName);return l instanceof pe?void 0:l}return n.source==="valueClips"&&r&&n.valueEvaluator?n.valueEvaluator(i,!0):n.value}if(this.node.clips)for(const l of this.node.clips){const u=ko(l,i,t?.interpolation,!1,this.typeName);if(u!==void 0)return u}const o=this.node.fields.spline;if(o)return sl(o,i,r);const a=this.node.timeSamples;if(!a||a.length===0)return this.getValue();const c=fi(a,i,t?.interpolation,r,this.typeName);return c instanceof pe?void 0:c}getStage(){const e=this._getStage();if(!e)throw new Error(`Attribute <${this._path}>: this handle carries no stage`);return e}get primPath(){return this._resultPrimPath??this._getPrimPath()}get name(){return this._getName()}_rejectOpaqueValue(e){if(!(e instanceof pe||e instanceof tt)&&this.typeName==="opaque")throw new Error(`Cannot author opaque-valued attribute <${this.primPath}.${this.name}>`)}set(e){this._rejectOpaqueValue(e),this.getStage()._setAttrDefault(this.primPath,this.name,e)}setTimeSample(e,t){if(t instanceof tt)throw new Error("SdfAnimationBlock can only be authored at the default time");this._rejectOpaqueValue(t),this.getStage()._setAttrTimeSample(this.primPath,this.name,e,t)}connect(e){this.getStage()._setAttrConnections(this.primPath,this.name,[e])}setConnections(e){this.getStage()._setAttrConnections(this.primPath,this.name,e)}addConnection(e,t=Ym){return this.getStage()._addAttrConnection(this.primPath,this.name,e,t),!0}removeConnection(e){return this.getStage()._removeAttrConnection(this.primPath,this.name,e),!0}clearConnections(){return this.getStage()._clearAttrConnections(this.primPath,this.name),!0}hasColorSpace(){return typeof this.getField("colorSpace")=="string"}getColorSpace(){const e=this.getField("colorSpace");return typeof e=="string"?e:""}setColorSpace(e){return this.setMetadata("colorSpace",e)}getMetadata(e){return this.getField(e)}getAllAuthoredMetadata(){const t=this.getStage()._getAllAuthoredPropertyMetadata(this._getPrimPath(),this._getName(),this);return t.custom??=!1,this.isRelationship||(t.typeName??=this.typeName,t.variability??=this.getField("variability")??"varying"),t}getAllMetadata(){const e=this.getAllAuthoredMetadata(),t=this._fallbackSource?.def()?.getPropertyDefinition(this._getName());if(!t?.isValid())return e;const i={};for(const r of t.listMetadataFields()){const n=t.getMetadata(r);n!==void 0&&(i[r]=n)}for(const[r,n]of Object.entries(e)){const o=i[r];i[r]=bt(n)&&bt(o)?sn(n,o):n}return i}hasMetadata(e){return this.getMetadata(e)!==void 0}hasAuthoredMetadata(e){return this.getStage()._hasAuthoredPropertyMetadata(this.primPath,this.name,e)}clearMetadata(e){return this.getStage()._clearPropertyField(this.primPath,this.name,e),!0}_clearMetadata(e){this.getStage()._clearPropertyField(this.primPath,this.name,e)}getLimits(e){return new Xm(this,e)}getSoftLimits(){return this.getLimits("soft")}getHardLimits(){return this.getLimits("hard")}clear(){return this.getStage()._replaceAttrValueOpinions(this.primPath,this.name),!0}block(){this.getStage()._replaceAttrValueOpinions(this.primPath,this.name,new pe)}blockAnimation(){this.getStage()._replaceAttrValueOpinions(this.primPath,this.name,new tt)}setSpline(e){if(this.typeName!=="double"&&this.typeName!=="float"&&this.typeName!=="half"&&this.typeName!=="timecode")throw new Error(`Spline on attribute '${this.name}' is incompatible with type '${this.typeName}'`);return this.setMetadata("spline",e)}get(){return this.getValue()}}class Ut{#s;#t;constructor(e,t){if(this.#s=e,!e)this.#t=j.identity();else if(t&&"mapToRoot"in t){const i=t,r=i.layerStack.layers.find(n=>n.layer===e)?.offset??ds;this.#t=i.mapToRoot.composeOffset(r)}else{const i=t??ds;this.#t=j.create([["/","/"]],i)}}isNull(){return this.#s===void 0}isValid(){return this.#s!==void 0}getLayer(){return this.#s}getMapFunction(){return this.#t}mapToSpecPath(e){return this.#t.mapTargetToSource(N.fromString(e)).pathString}composeOver(e){const t=this.#s??e.#s,i=new Ut(t);return i.#t=this.#t.compose(e.#t),i}}class Ul{constructor(e,t,i){this._stage=e,this._primPath=t,this.name=i}getVariantNames(){return this._stage._variantNames(this._primPath,this.name)}getVariantSelection(){return this._stage._variantSelection(this._primPath,this.name)}async addVariant(e){const t=this._stage.getEditTarget().getLayer(),i=`${this._primPath}{${this.name}=}`,r=t.getField(i,"variantChildren")??[];await this._stage._ownAuthoringAsync(async()=>{r.includes(e)||t.setField(i,"variantChildren",[...r,e]),await this._stage._recomposeForEdit(this._primPath)})}async setVariantSelection(e){const t=this._stage.getEditTarget().getLayer(),i=t.getField(this._primPath,"variantSelection"),r=i&&typeof i=="object"?{...i}:{};e===""?delete r[this.name]:r[this.name]=[e],await this._stage._ownAuthoringAsync(async()=>{t.setField(this._primPath,"variantSelection",r),await this._stage._recomposeForEdit(this._primPath)})}}class dS{constructor(e,t){this._stage=e,this._primPath=t}getNames(){return this._stage._variantSetNames(this._primPath)}hasVariantSet(e){return this.getNames().includes(e)}async addVariantSet(e){const t=this._stage.getEditTarget().getLayer(),i=t.getField(this._primPath,"variantSetChildren")??[];return await this._stage._ownAuthoringAsync(async()=>{if(!i.includes(e)){t.setField(this._primPath,"variantSetChildren",[...i,e]);const r=`${this._primPath}{${e}=}`;t.getField(r,"variantChildren")===void 0&&t.setField(r,"variantChildren",[])}await this._stage._recomposeForEdit()}),new Ul(this._stage,this._primPath,e)}getVariantSet(e){return new Ul(this._stage,this._primPath,e)}getAllVariantSelections(){const e={};for(const t of this.getNames()){const i=this._stage._variantSelection(this._primPath,t);i&&(e[t]=i)}return e}}function Yd(s,e){const t={...s};return Object.defineProperties(t,{getPrimResyncType:{enumerable:!1,value(i){if(!s.resyncedPaths.includes(i))return"Invalid";if(!e)return"Other";if(!e.newPath)return i===e.oldPath?"Delete":"Other";if(i!==e.oldPath&&i!==e.newPath)return"Other";const r=e.oldPath.slice(0,e.oldPath.lastIndexOf("/"))||"/",n=e.newPath.slice(0,e.newPath.lastIndexOf("/"))||"/",o=e.oldPath.slice(e.oldPath.lastIndexOf("/")+1),a=e.newPath.slice(e.newPath.lastIndexOf("/")+1),c=i===e.oldPath?"Source":"Destination";return r!==n&&o!==a?`RenameAndReparent${c}`:r!==n?`Reparent${c}`:`Rename${c}`}},getAssociatedPath:{enumerable:!1,value(i){if(e?.newPath){if(i===e.oldPath)return e.newPath;if(i===e.newPath)return e.oldPath}}}}),t}function Wl(s){return JSON.stringify(s.fields)+"\0"+JSON.stringify(s.timeSamples??null)}function Ms(s){const e=s.indexOf(".");return e<0?s:s.slice(0,e)}function hS(s,e){const t=new Set,i=new Set;for(const[o,a]of s){const c=e.get(o);c?Wl(a)!==Wl(c)&&i.add(o):t.add(Ms(o))}for(const o of e.keys())s.has(o)||t.add(Ms(o));const r=[];for(const o of[...t].sort())r.some(a=>o===a||o.startsWith(`${a}/`))||r.push(o);const n=[...i].filter(o=>{const a=Ms(o);return!r.some(c=>a===c||a.startsWith(`${c}/`))});return Yd({resyncedPaths:r,changedInfoOnlyPaths:n})}const fr={0:"local",1:"inherit",2:"variant",3:"relocate",4:"reference",5:"payload",6:"specialize"};function On(s){if(s==null)return;let e;if(Array.isArray(s))e=s;else if(typeof s=="object")e=Object.entries(s).map(([t,i])=>[Number(t),i]).sort(([t],[i])=>t-i);else return;if(e.length!==0)return e.map(([t,i])=>{const r=typeof i=="object"&&i!==null&&"value"in i?i.value:i;return[t,r]})}async function zl(s,e){if(!at.IsEnabled())return e(void 0);const t=Ji();return hi(t,"usd-ts:Stage.open",i=>(_e(i,"filePath",s),e(i)))}async function on(s,e,t){return s?hi(s,e,t):await t(void 0)}function pS(s,e,t){return s?ji(s,e,t):t(void 0)}function Ln(s,e){return at.IsEnabled()?ji(Ji(),s,e):e(void 0)}async function jl(s,e){return at.IsEnabled()?hi(Ji(),s,e):await e(void 0)}const No=new WeakMap,fS=s=>No.get(s)?.current,mS=/^\/__Prototype_\d+$/;function Fn(s){return mS.test(s)}function Nr(s){return/^\/__Prototype_\d+([/.]|$)/.test(s)}const gS={instanceToProto:new Map,protoToSource:new Map},yS=(s,e)=>s===e||e==="/"||s.startsWith(`${e}/`),SS=s=>{const e=s.lastIndexOf("/");return e<=0?"/":s.slice(0,e)},mr=(s,e,t)=>s===e||s.startsWith(`${e}/`)?t+s.slice(e.length):s;class qi{instanceKeyToPrototype=new Map;prototypeToInstanceKey=new Map;prototypeToSource=new Map;prototypeToPrimIndexes=new Map;primIndexToPrototype=new Map;pendingAddedPrimIndexes=new Map;pendingRemovedPrimIndexes=new Map;lastPrototypeIndex=0;registerInstancePrimIndex(e,t){let i=this.pendingAddedPrimIndexes.get(t);i||(i=new Set,this.pendingAddedPrimIndexes.set(t,i)),i.add(e);const r=this.instanceKeyToPrototype.get(t);return r===void 0?i.size===1:this.prototypeToSource.get(r)===e}unregisterInstancePrimIndexesUnder(e){for(const[t,i]of this.primIndexToPrototype){if(!yS(t,e))continue;const r=this.prototypeToInstanceKey.get(i);if(r===void 0)continue;let n=this.pendingRemovedPrimIndexes.get(r);n||(n=new Set,this.pendingRemovedPrimIndexes.set(r,n)),n.add(t)}}processChanges(){return pS(fS(this),"usd-ts:UsdInstanceCache.processChanges",e=>(e&&(_e(e,"pendingAddedKeys",this.pendingAddedPrimIndexes.size),_e(e,"pendingRemovedKeys",this.pendingRemovedPrimIndexes.size)),this._processChanges()))}_processChanges(){const e={newPrototypePrims:[],newPrototypePrimIndexes:[],changedPrototypePrims:[],changedPrototypePrimIndexes:[],deadPrototypePrims:[]},t=new Set;for(const[r,n]of this.pendingRemovedPrimIndexes){const o=this.pendingAddedPrimIndexes.get(r)??new Set,a=[...n].filter(d=>!o.has(d)),c=this.instanceKeyToPrototype.get(r);if(c===void 0)continue;const l=this.prototypeToPrimIndexes.get(c)??[],u=this.prototypeToSource.get(c);for(const d of a){const h=l.indexOf(d);h>=0&&l.splice(h,1),this.primIndexToPrototype.delete(d)}u!==void 0&&a.includes(u)&&(this.prototypeToSource.delete(c),l.length>0&&(l.sort(),this.prototypeToSource.set(c,l[0]),t.add(c))),this.prototypeToPrimIndexes.set(c,l)}const i=[...this.pendingAddedPrimIndexes.entries()].sort((r,n)=>{const o=[...r[1]][0]??"",a=[...n[1]][0]??"";return a.split("/").length-o.split("/").length||o.localeCompare(a)});for(const[r,n]of i){const o=[...n][0],a=[...n].sort();let c=this.instanceKeyToPrototype.get(r);c===void 0?(c=`/__Prototype_${++this.lastPrototypeIndex}`,this.instanceKeyToPrototype.set(r,c),this.prototypeToInstanceKey.set(c,r),this.prototypeToSource.set(c,o),this.prototypeToPrimIndexes.set(c,[]),e.newPrototypePrims.push(c),e.newPrototypePrimIndexes.push(o)):this.prototypeToSource.has(c)||(this.prototypeToSource.set(c,o),t.add(c));const l=this.prototypeToPrimIndexes.get(c)??[];for(const u of a)this.primIndexToPrototype.set(u,c),l.includes(u)||l.push(u);l.sort(),this.prototypeToPrimIndexes.set(c,l)}for(const r of t){const n=this.prototypeToSource.get(r);n!==void 0&&(e.changedPrototypePrims.push(r),e.changedPrototypePrimIndexes.push(n))}for(const r of this.pendingRemovedPrimIndexes.keys()){const n=this.instanceKeyToPrototype.get(r);n!==void 0&&((this.prototypeToPrimIndexes.get(n)??[]).length>0||(e.deadPrototypePrims.push(n),this.instanceKeyToPrototype.delete(r),this.prototypeToInstanceKey.delete(n),this.prototypeToSource.delete(n),this.prototypeToPrimIndexes.delete(n)))}return this.pendingAddedPrimIndexes.clear(),this.pendingRemovedPrimIndexes.clear(),e}getInstancingInfo(){return{instanceToProto:new Map(this.primIndexToPrototype),protoToSource:new Map(this.prototypeToSource)}}getPrototypeForInstanceablePrimIndexPath(e){return this.primIndexToPrototype.get(e)}getPrimsInPrototypesUsingPrimIndexPath(e){const t=[];let i=e;for(;i!=="/";){const r=this._findInstanceAtOrAbove(i);if(!r)break;const[n,o]=r,a=this.prototypeToSource.get(o);if(a===void 0||((i===a||i.startsWith(`${a}/`))&&t.push(mr(e,a,o)),n!==i))break;i=SS(n)}return[...new Set(t)]}isPathDescendantToAnInstance(e){return this._findStrictInstanceAncestor(e)!==void 0}getPathInPrototypeForInstancePath(e){let t=e;if(Nr(e)){const r=[...this.prototypeToSource.keys()].filter(n=>e===n||e.startsWith(`${n}/`)).sort((n,o)=>o.length-n.length)[0];if(r===void 0)return;t=mr(e,r,this.prototypeToSource.get(r))}let i=t;for(;i!==void 0;){const r=this._findStrictInstanceAncestor(i);if(!r)break;const[n,o]=r,a=this.prototypeToSource.get(o);if(a===void 0)break;if(n===a)return mr(i,n,o);i=mr(i,n,a)}}getMostAncestralInstancePath(e){return[...this.primIndexToPrototype.keys()].filter(t=>e.startsWith(`${t}/`)).sort((t,i)=>t.length-i.length)[0]}_findInstanceAtOrAbove(e){const t=[...this.primIndexToPrototype.keys()].filter(i=>e===i||e.startsWith(`${i}/`)).sort((i,r)=>r.length-i.length)[0];return t===void 0?void 0:[t,this.primIndexToPrototype.get(t)]}_findStrictInstanceAncestor(e){const t=[...this.primIndexToPrototype.keys()].filter(i=>e.startsWith(`${i}/`)).sort((i,r)=>r.length-i.length)[0];return t===void 0?void 0:[t,this.primIndexToPrototype.get(t)]}}function Zd(s,e){let t=No.get(s);t||(t={current:void 0,installations:[]},No.set(s,t));const i={};return t.installations.length===0&&(t.current?t.base=t.current:delete t.base),t.installations.push({token:i,context:e}),t.current=e,{holder:t,token:i}}function Qd(s,e){const t=s.installations.findIndex(i=>i.token===e);t>=0&&s.installations.splice(t,1),s.current=s.installations.at(-1)?.context??s.base,s.installations.length===0&&delete s.base}function bS(s,e,t){const{holder:i,token:r}=Zd(s,e);try{return t()}finally{Qd(i,r)}}async function PS(s,e,t){const{holder:i,token:r}=Zd(s,e);try{return await t()}finally{Qd(i,r)}}const Ii=(s,e)=>{const t=s<0?s+e:s;return t>=0&&t<e?t:void 0},Hl=(s,e)=>{if(s==="end")return e;const t=s<0?s+e:s;return t>=0&&t<=e?t:void 0},ql=(s,e)=>{if(e!==void 0)return e;const t=s[0];return typeof t=="string"?"":typeof t=="boolean"?!1:0};class jt{#s;constructor(e=[]){this.#s=[...e]}IsIdentity(){return this.#s.length===0}GetLiterals(){return this.#s.flatMap(e=>"value"in e?[e.value]:[])}GetMutableLiterals(){return[...this.GetLiterals()]}StreamCustom(e=String){return this.#s.map(t=>{const i=Object.entries(t).filter(([r])=>r!=="kind").map(([r,n])=>`${r}=${r==="value"?e(n):String(n)}`);return`${t.kind}(${i.join(", ")})`}).join("; ")}_serialization(){return this.#s}_transformLiterals(e){return new jt(this.#s.map(t=>"value"in t?{...t,value:e(t.value)}:"fill"in t&&t.fill!==void 0?{...t,fill:e(t.fill)}:t))}equals(e){return this.#s.length!==e.#s.length?!1:this.#s.every((t,i)=>{const r=e.#s[i];if(!r||t.kind!==r.kind)return!1;const n=t,o=r,a=Object.keys(n);return a.length===Object.keys(o).length&&a.every(c=>n[c]===o[c])})}ComposeOver(e){if(e instanceof jt)return new jt([...e.#s,...this.#s]);const t=[...e];for(const i of this.#s)switch(i.kind){case"write":{const r=Ii(i.index,t.length);r!==void 0&&(t[r]=i.value);break}case"writeRef":{const r=Ii(i.source,t.length),n=Ii(i.destination,t.length);r!==void 0&&n!==void 0&&(t[n]=t[r]);break}case"insert":{const r=Hl(i.index,t.length);r!==void 0&&t.splice(r,0,i.value);break}case"insertRef":{const r=Ii(i.source,t.length),n=Hl(i.destination,t.length);r!==void 0&&n!==void 0&&t.splice(n,0,t[r]);break}case"erase":{const r=Ii(i.index,t.length);r!==void 0&&t.splice(r,1);break}case"minSize":{if(i.size<0||t.length>=i.size)break;const r=ql(t,i.fill);for(;t.length<i.size;)t.push(r);break}case"setSize":{if(i.size<0)break;if(t.length>i.size)t.length=i.size;else{const r=ql(t,i.fill);for(;t.length<i.size;)t.push(r)}break}case"maxSize":i.size>=0&&t.length>i.size&&(t.length=i.size);break}return t}}const Oe=s=>$.Define(s),vS={bool:Oe("bool"),uchar:Oe("uchar"),short:Oe("short"),ushort:Oe("ushort"),int:Oe("int"),uint:Oe("uint"),int64:Oe("int64"),uint64:Oe("uint64"),half:Oe("half"),float:Oe("float"),double:Oe("double"),string:Oe("string"),token:Oe("token"),dictionary:Oe("VtDictionary")};Object.values(vS);function an(s,e){return s==="/"?`.${e}`:`${s}.${e}`}const wS=()=>({source:"none",valueIsBlocked:!1});function*Eo(s,e){let t=-1;for(const i of s.getNodeRange()){if(t++,i.inert)continue;const r=F(i.path.appendProperty(e));for(let n=0;n<i.layerStack.layers.length;n++){const{layer:o,offset:a}=i.layerStack.layers[n];yield{nodeIndex:t,layerIndex:n,node:i,layer:o,specPath:r,layerToStageOffset:Mt(i.mapToRoot.getTimeOffset(),a)}}}}function _S(s,e,t,i=[]){let r=!1;const n=[],o=[...Eo(s,e)].some(u=>u.layer.getField(u.specPath,"typeName")==="pathExpression"),a=(u,d,h)=>{if(!o||typeof u!="string")return u;const m=h.lastIndexOf("."),p=N.fromString(m<0?h:h.slice(0,m)),y=new Le(u).makeAbsolute(p);return d.mapToRoot.mapSourceToTarget(d.path).isEmpty()?new Le(""):y.mapPaths(g=>d.mapToRoot.mapSourceToTarget(g))},c=u=>u instanceof jt||u instanceof Le,l=()=>{for(let g=0;g+1<n.length;g++)n[g].nextWeaker=n[g+1];const u=g=>{let S;for(const b of g)if(S instanceof jt)if(b instanceof jt)S=S.ComposeOver(b);else return Array.isArray(b)?S.ComposeOver(b):S.ComposeOver([]);else if(S instanceof Le)if(b instanceof Le)S=S.composeOver(b);else return S.composeOver(new Le("")).text;else if(b instanceof jt)S=b;else if(b instanceof Le)S=b;else return b;return S instanceof jt?S.ComposeOver([]):S instanceof Le?S.composeOver(new Le("")).text:S},d=[...new Set(n.flatMap(g=>g.source==="timeSamples"?(g.timeSamples??[]).map(([S])=>S):[]))].sort((g,S)=>g-S),h=(g,S)=>{let b=g[0]?.[1];for(const[P,w]of g){if(P>S)break;b=w}return b},m=d.map(g=>[g,u(n.map(S=>S.source==="timeSamples"?h(S.timeSamples??[],g):S.value))]),p=(g,S)=>{for(const b of n){if(b.source!=="timeSamples")continue;const P=b.timeSamples??[],w=h(P,g),_=h(P,S);if(w!==_)return c(w)&&c(_)}return!1},y=(g,S)=>{if(m.length===0)return u(n.map(v=>v.value));if(g<=m[0][0])return m[0][1];if(g>m[m.length-1][0])return m[m.length-1][1];const b=m.findIndex(([v])=>v===g);if(b>=0&&!S)return m[b][1];let P=b>=0?b:1;if(b<0)for(;m[P][0]<g;)P++;const w=m[P-1],_=m[P];return p(w[0],_[0])?w[1]:fi([w,_],g,void 0,S)},f=n[0];return f.valueEvaluator=y,typeof t=="number"?f.value=y(t,!1):(t==="default"||m.length===0)&&(f.value=y(0,!1)),f};for(const{nodeIndex:u,layerIndex:d,node:h,layer:m,specPath:p,layerToStageOffset:y}of Eo(s,e)){if(t!=="default"&&!r){const g=m.getField(p,"timeSamples");if(g!=null){const b=DS(g);if(b.length>0){const P={source:"timeSamples",valueIsBlocked:!1,timeSamples:b.map(([w,_])=>[qe(y,w),a(xS(_),h,p)]),layer:m,specPath:p,layerToStageOffset:y,node:h};if(n.length>0||P.timeSamples.some(([,w])=>c(w))){if(n.push(P),!P.timeSamples.some(([,w])=>c(w)))return l();continue}return P}}const S=m.getField(p,"spline");if(S!=null)return{source:"spline",spline:S,valueIsBlocked:!1,layer:m,specPath:p,layerToStageOffset:y,node:h}}const f=a(m.getField(p,"default"),h,p);if(f!==void 0){if(f instanceof tt){r=!0;continue}if(f instanceof pe||f===null)return n.length>0?l():{source:"none",valueIsBlocked:!0,layer:m,specPath:p,layerToStageOffset:y,node:h};if(c(f)){const g={source:"default",value:f,valueIsBlocked:!1,layer:m,specPath:p,layerToStageOffset:y,node:h};n.push(g);continue}return n.length>0&&(Array.isArray(f)||f instanceof Le)?(n.push({source:"default",value:f,valueIsBlocked:!1,layer:m,specPath:p,layerToStageOffset:y,node:h}),l()):{source:"default",value:f,valueIsBlocked:!1,layer:m,specPath:p,layerToStageOffset:y,node:h}}if(t!=="default"&&!r)for(const g of i){if(g.position[0]!==u||g.position[1]!==d)continue;const S=g.resolve(t);if(S)return S}}return n.length>0?l():wS()}function It(s,e){return Oo(s,e)?.value}function Oo(s,e){for(const t of s.getNodeRange()){if(t.inert)continue;const i=F(t.path);for(const{layer:r,offset:n}of t.layerStack.layers){const o=r.getField(i,e);if(o!=null)return{value:o,layer:r,specPath:i,layerToStageOffset:Mt(t.mapToRoot.getTimeOffset(),n),node:t}}}}function IS(s){const e=new Set;for(const a of s.getNodeRange())if(!a.inert)for(const{layer:c}of a.layerStack.layers){const l=c.getField(F(a.path),"properties");if(l)for(const u of l)e.add(u)}const t=[...e].sort(Jr),i=It(s,"propertyOrder");if(!Array.isArray(i)||i.length===0)return t;const r=new Set(t),n=i.filter((a,c)=>r.has(a)&&i.indexOf(a)===c),o=new Set(n);return[...n,...t.filter(a=>!o.has(a))]}function Er(s,e,t){return Lo(s,e,t)?.value}function Kl(s,e,t){const i=[...s.getNodeRange()];for(let r=i.length-1;r>=0;--r){const n=i[r];if(n.inert)continue;const o=an(F(n.path),e);for(let a=n.layerStack.layers.length-1;a>=0;--a){const c=n.layerStack.layers[a].layer,l=c.getField(o,t);if(l!=null)return l;if(c.hasSpec(o))return t==="custom"?!1:c.getSpecType(o)==="relationship"?"uniform":"varying"}}}function AS(s,e){const t=[...s.getNodeRange()];for(let i=t.length-1;i>=0;--i){const r=t[i];if(r.inert)continue;const n=an(F(r.path),e);for(let o=r.layerStack.layers.length-1;o>=0;--o)if(r.layerStack.layers[o].layer.getField(n,"custom")===!0)return!0}return!1}function Lo(s,e,t){for(const i of s.getNodeRange()){if(i.inert)continue;const r=an(F(i.path),e);for(const{layer:n,offset:o}of i.layerStack.layers){const a=n.getField(r,t);if(a!=null)return{value:a,layer:n,specPath:r,layerToStageOffset:Mt(i.mapToRoot.getTimeOffset(),o),node:i}}}}function Jd(s){let e=!1;for(const t of s.getNodeRange()){if(t.inert)continue;const i=F(t.path);for(const{layer:r}of t.layerStack.layers){const n=r.getField(i,"specifier");if(n==="def"||n===0)return"def";if(n==="class"||n===2){let o=!1;for(let a=t;a!==null;a=a.parent)if(Ad(a.arcType)&&!a.isDueToAncestor()){o=!0;break}if(!o)return"class";e=!0}}}return e?"class":"over"}function eh(s,e){const t=[];e:for(const i of s.getNodeRange()){if(i.inert)continue;const r=F(i.path);for(const{layer:n}of i.layerStack.layers){const o=Ft(n.getField(r,e));if(o!==null&&(t.push(o),o.isExplicit))break e}}return Zu(t)}function TS(s,e,t,i,r=n=>n){let n=[],o=!1;for(const a of[...s.getNodeRange()].reverse()){if(a.inert)continue;const c=an(F(a.path),e);for(let l=a.layerStack.layers.length-1;l>=0;l--){const{layer:u}=a.layerStack.layers[l],d=u.getField(c,t);if(d==null)continue;const h=Ft(d);if(h===null)continue;const m=(p,y)=>p.flatMap(f=>{const g=N.fromString(f),S=a.mapToRoot.mapSourceToTarget(g);if(S.isEmpty())return[];if(y&&i&&Ad(a.arcType)){const b=Zt(a);if(!g.hasPrefix(b)){const P=a.mapToRoot.mapSourceToTarget(b);if(!P.isEmpty()&&S.hasPrefix(P))return[]}}return[r(S.pathString)]});n=Ps(n,{isExplicit:h.isExplicit,explicitItems:m(h.explicitItems,!0),prependedItems:m(h.prependedItems,!0),appendedItems:m(h.appendedItems,!0),deletedItems:m(h.deletedItems,!1),orderedItems:m(h.orderedItems,!0)}),o=!0}}return o?n:void 0}function DS(s){return Array.isArray(s)?s:typeof s=="object"&&s!==null?Object.entries(s).map(([e,t])=>[Number(e),t]).sort(([e],[t])=>e-t):[]}function xS(s){return typeof s=="object"&&s!==null&&"value"in s?s.value:s}const oe={All:"all",Only:"only",None:"none"},ks=(s,e)=>s===e||e==="/"||s.startsWith(`${e}/`),Mn=(s,e)=>s[0]<e[0]?-1:s[0]>e[0]?1:0;class ys{static AllRule=oe.All;static OnlyRule=oe.Only;static NoneRule=oe.None;rules=[];constructor(e=!0){e||this.rules.push(["/",oe.None])}static loadAll(){return new ys}static loadNone(){return new ys(!1)}clone(){const e=new ys;return e.setRules(this.rules),e}getRules(){return this.rules.map(([e,t])=>[e,t])}setRules(e){this.rules=e.map(([t,i])=>[t,i]).sort(Mn)}addRule(e,t){const i=this.rules.findIndex(([r])=>r===e);i>=0?this.rules[i]=[e,t]:this.rules.push([e,t]),this.rules.sort(Mn)}loadWithDescendants(e){this.replaceSubtree(e,oe.All)}loadWithoutDescendants(e){this.replaceSubtree(e,oe.Only)}unload(e){this.replaceSubtree(e,oe.None)}loadAndUnload(e,t,i="withDescendants"){for(const r of t)this.unload(r);for(const r of e)i==="withDescendants"?this.loadWithDescendants(r):this.loadWithoutDescendants(r)}minimize(){const e=[];for(const t of this.rules){let i=oe.All,r=-1;for(const[n,o]of e)n.length>r&&ks(t[0],n)&&(i=o,r=n.length);t[1]!==i&&e.push(t)}this.rules=e}isLoaded(e){return this.getEffectiveRuleForPath(e)!==oe.None}isLoadedWithAllDescendants(e){const t=this.longestPrefix(e);return t&&t[1]!==oe.All?!1:this.rules.filter(([i])=>ks(i,e)).every(([,i])=>i===oe.All)}isLoadedWithNoDescendants(e){return this.rules.find(([i])=>i===e)?.[1]!==oe.Only?!1:!this.rules.some(([i,r])=>i!==e&&ks(i,e)&&r!==oe.None)}getEffectiveRuleForPath(e){const t=this.longestPrefix(e);if(!t||t[1]===oe.All)return oe.All;if(t[0]===e&&t[1]===oe.Only)return oe.Only;const i=this.rules.filter(([r])=>r!==e&&ks(r,e));for(let r=0;r<i.length;){const[n,o]=i[r];if(o===oe.All||o===oe.Only)return oe.Only;for(r++;r<i.length&&ks(i[r][0],n);)r++}return oe.None}equals(e){return JSON.stringify(this.rules)===JSON.stringify(e.rules)}isIncluded(e){return this.isLoaded(e)}include(e){const t=JSON.stringify(this.rules);return this.loadWithDescendants(e),t!==JSON.stringify(this.rules)}exclude(e){const t=JSON.stringify(this.rules);return this.unload(e),t!==JSON.stringify(this.rules)}replaceSubtree(e,t){this.rules=this.rules.filter(([i])=>!ks(i,e)),this.rules.push([e,t]),this.rules.sort(Mn)}longestPrefix(e){let t;for(const i of this.rules)ks(e,i[0])&&(!t||i[0].length>t[0].length)&&(t=i);return t}}class li{paths=[];static all(){return new li(["/"])}constructor(e=[]){for(const t of e)this.add(t)}add(e){if(!e.startsWith("/")||e.includes("."))throw new Error(`Population mask paths must be absolute prim paths; got <${e}>`);this.paths.some(t=>Cs(e,t))||(this.paths=[...this.paths.filter(t=>!Cs(t,e)),e].sort())}getPaths(){return this.paths}isEmpty(){return this.paths.length===0}includes(e){return this.paths.some(t=>Cs(e,t)||Cs(t,e))}includesSubtree(e){return this.paths.some(t=>Cs(e,t))}getIncludedChildNames(e){if(this.includesSubtree(e))return{all:!0,names:[]};const t=e==="/"?"/":`${e}/`,i=new Set;for(const r of this.paths){if(!r.startsWith(t))continue;const n=r.slice(t.length),o=n.indexOf("/");i.add(o<0?n:n.slice(0,o))}return{all:!1,names:[...i].sort()}}equals(e){return this.paths.length===e.paths.length&&this.paths.every((t,i)=>t===e.paths[i])}getUnion(e){const t=new li(this.paths);if(typeof e=="string")t.add(e);else for(const i of e.paths)t.add(i);return t}getIntersection(e){const t=new li;for(const i of this.paths)for(const r of e.paths)Cs(i,r)?t.add(i):Cs(r,i)&&t.add(r);return t}includesMask(e){return this.getUnion(e).equals(this)}}function Cs(s,e){return s===e||e==="/"||s.startsWith(`${e}/`)}function cn(s,e,t){const i=Gd(s.rootNode);if(i===null)return null;const r=BS(s),n=e?NS(s.path,e):"",o=t?JSON.stringify(ES(s.path,t).getPaths()):"all";return`${i}\0clips=${r}\0load=${n}\0mask=${o}`}let kS=0;const Xl=new WeakMap;function CS(s){let e=Xl.get(s);return e===void 0&&(e=++kS,Xl.set(s,e)),e}function BS(s){const e=zd(s);return e?e.map(t=>`${t.name}|ls${CS(t.sourceLayerStack)}|${t.sourcePrimPath}|li${t.indexOfLayerWhereAssetPathsFound}|${JSON.stringify(t.def)}|${t.timeOffset.offset}:${t.timeOffset.scale}`).join(";"):""}function NS(s,e){const t=e.getEffectiveRuleForPath(s),i=`${s}/`,r=[["/",t]];for(const[o,a]of e.getRules())o!==s&&o.startsWith(i)&&r.push([`/${o.slice(i.length)}`,a]);const n=new ys;return n.setRules(r),n.minimize(),JSON.stringify(n.getRules())}function ES(s,e){const t=`${s}/`,i=[];for(const r of e.getPaths())r===s?i.push("/"):r.startsWith(t)&&i.push(`/${r.slice(t.length)}`);return new li(i)}function Fo(s,e,t,i){return async r=>{if(!r||e.has(r))return null;try{const n=await ho(r,t,i);return s?.add(n),n}catch{return null}}}const OS=["typeName"];function gi(s,e,t,i,r){r?.recordComputationEvent("materialization",t);const n=It(s,"active"),o=n===void 0?!0:!!n,a={};a.specifier=Jd(s);const c=It(s,"typeName");c!==void 0&&(a.typeName=c),n!==void 0&&(a.active=o);const l=It(s,"instanceable");l!==void 0&&(a.instanceable=!!l);const u=It(s,"kind");u!==void 0&&(a.kind=u);const d=It(s,"assetInfo");d!==void 0&&(a.assetInfo=d);const h=It(s,"clips");h!==void 0&&(a.clips=h);const m=It(s,"clipSets");m!==void 0&&(a.clipSets=m);const p=It(s,"propertyOrder");p!==void 0&&(a.propertyOrder=p);const y=It(s,"sdrMetadata");y!==void 0&&(a.sdrMetadata=y);const f=eh(s,"apiSchemas");if(f.length>0&&(a.apiSchemas=f),i!==void 0&&(a.__prototypePath=i),e.set(t,{fields:a}),!o)return!1;for(const g of IS(s)){const S=`${t==="/"?"":t}.${g}`,b={};for(const P of OS){const w=Er(s,g,P);w!==void 0&&(b[P]=w)}e.set(S,{fields:b})}return!0}function LS(s,e,t,i){gi(s,e,t,i)}async function FS(s,e,t,i,r,n){const o=new Set;return await aa(s,async c=>{const l=await i(c);return l&&o.add(l),l}),gi(s,e,t,n,r),o}const it=(s,e)=>s==="/"?`/${e}`:`${s}/${e}`;async function MS(s,e=new qi,t=r=>cn(r),i){return on($d(s),"usd-ts:discoverStageNamespace",r=>(r&&_e(r,"rootPath","/"),$S(s,e,t,i,r)))}async function $S(s,e,t,i,r){const n=new Map,o=new Map;e.unregisterInstancePrimIndexesUnder("/");const a=async u=>{s.recordComputationEvent("namespaceDiscovery",u);const d=await ky(s,u,r);let h=d.computePrimChildNames();if(i){const m=i.getIncludedChildNames(u);m.all||(h=h.filter(p=>m.names.includes(p)))}if(n.set(u,h),u!=="/"){const m=t(d);if(m!==null&&(o.set(u,m),!e.registerInstancePrimIndex(u,m)&&!u.startsWith("/Flattened_Prototype_")))return}for(const m of h)await a(it(u,m))};await a("/");const c={newPrototypePrims:[],newPrototypePrimIndexes:[],changedPrototypePrims:[],changedPrototypePrimIndexes:[],deadPrototypePrims:[]},l=async()=>{const u=bS(e,r,()=>e.processChanges());if(c.newPrototypePrims.push(...u.newPrototypePrims),c.newPrototypePrimIndexes.push(...u.newPrototypePrimIndexes),c.changedPrototypePrims.push(...u.changedPrototypePrims),c.changedPrototypePrimIndexes.push(...u.changedPrototypePrimIndexes),c.deadPrototypePrims.push(...u.deadPrototypePrims),u.changedPrototypePrimIndexes.length!==0){for(const d of u.changedPrototypePrimIndexes)await a(d);await l()}};return await l(),{cache:s,childrenByPrim:n,instanceKeys:o,instancing:e.getInstancingInfo(),instanceChanges:c}}async function RS(s,e,t=r=>cn(r),i){const r=new Map,n=new Map,o=async a=>{s.recordComputationEvent("namespaceDiscovery",a);const c=await s.computePrimIndex(a);let l=c.computePrimChildNames();if(!c.hasSpecs()&&l.length===0)return;if(i&&!i.includesSubtree(a)){const d=i.getIncludedChildNames(a);d.all||(l=l.filter(h=>d.names.includes(h)))}r.set(a,l);const u=t(c);u!==null&&n.set(a,u);for(const d of l)await o(it(a,d))};for(const a of e)await o(a);return{cache:s,childrenByPrim:r,instanceKeys:n}}async function VS(s,e,t,i,r=new Map){const{cache:n,childrenByPrim:o}=s,a=new Map,c=new Map,l=new Map;for(const h of o.keys()){n.recordComputationEvent("usdDependencyResolution",h);const m=n.findPrimIndex(h),p=new Set,f=await aa(m,async g=>{const S=await t(g);return S&&p.add(S),S});f&&c.set(h,f),p.size>0&&l.set(h,p)}const u=h=>{const m=n.findPrimIndex(h);if(!m||!o.has(h))return;const p=i.get(h);if(!(!gi(m,a,h,p,n)||p!==void 0))for(const f of o.get(h)??[])u(it(h,f))};for(const h of e)u(h);const d=(h,m)=>{const p=n.findPrimIndex(h);if(!p||p.composePrimStack().length===0)return;const y=i.get(h);if(y!==void 0&&i.set(m,y),!(!gi(p,a,m,y,n)||y!==void 0))for(const g of o.get(h)??[])d(it(h,g),it(m,g))};for(const[h,m]of r){a.set(h,{fields:{}});for(const p of o.get(m)??[])d(it(m,p),it(h,p))}return{nodes:a,usdDependenciesByPrim:l,clipSetsByPrim:c}}async function GS(s,e,t=new qi){const i=$d(s.cache);return on(i,"usd-ts:materializeStageNodes",r=>(r&&_e(r,"primIndexCount",s.childrenByPrim.size),US(s,e,t)))}async function US(s,e,t){const{cache:i,childrenByPrim:r}=s,n=new Map,{instanceToProto:o,protoToSource:a}=s.instancing??t.getInstancingInfo(),c=new Map,l=new Map;for(const h of r.keys()){if(h==="/")continue;i.recordComputationEvent("usdDependencyResolution",h);const m=i.findPrimIndex(h)??await i.computePrimIndex(h),p=new Set,f=await aa(m,async g=>{const S=await e(g);return S&&p.add(S),S});f&&c.set(h,f),p.size>0&&l.set(h,p)}n.set("/",{fields:{}});const u=h=>{const m=i.findPrimIndex(h);if(!m)return;const p=o.get(h);if(!(!gi(m,n,h,p,i)||p!==void 0))for(const f of r.get(h)??[])u(it(h,f))};for(const h of r.get("/")??[])u(`/${h}`);const d=(h,m)=>{const p=i.findPrimIndex(h);if(!p||p.composePrimStack().length===0)return;const y=o.get(h);if(y!==void 0&&o.set(m,y),!(!gi(p,n,m,y,i)||y!==void 0))for(const g of r.get(h)??[])d(it(h,g),it(m,g))};for(const[h,m]of a){n.set(h,{fields:{}});for(const p of r.get(m)??[])d(it(m,p),it(h,p))}return{nodes:n,instancing:{instanceToProto:o,protoToSource:a},usdDependenciesByPrim:l,clipSetsByPrim:c}}async function WS(s,e,t,i,r,n,o,a,c,l,u,d){const m=Fo(new Set,e,t,i),p=o??await Dy(s,m,r,c,d);return o||xy(p,void 0),Yn(i,d,()=>Rd(p,d,async()=>{p.setVariantFallbacks(n);const y=a??new qi,f=await MS(p,y,l,u),{nodes:g,instancing:S,usdDependenciesByPrim:b,clipSetsByPrim:P}=await GS(f,m,y),w=new Map;for(const[v,A]of b)w.set(v,new Set(A));const _=new Set;_.add(s),r&&_.add(r),p.forEachLayerUsed(v=>_.add(v));for(const v of w.values())for(const A of v)_.add(A);return{nodes:g,instancing:S,dependencies:_,usdDependenciesByPrim:w,clipSetsByPrim:P,cache:p}}))}function zS(){pp(Ne.GetInstance().GetAllPlugins())}function th(s,e){return zS(),en(s,e)}function gr(s,e,t,i){return Ru(s,th(e,t),i)}function Mo(s){return s==="typeName"||s==="apiSchemas"?"typeInfo":s==="active"||s==="kind"||s==="specifier"||s==="clips"||s==="clipSets"?"recompose":"infoOnly"}function $n(s,e=[]){const t=new Set,i=s.didMaybeChangeLayers&&s.didChangeLayerStackFields.size===1&&s.didChangeLayerStackFields.has("subLayers");if(s.didMaybeChangeLayers&&!i&&t.add("/"),i)for(const p of s.didChangeLayerStackNamespace)t.add(p);for(const p of s.didChangeSignificantly)t.add(p);for(const p of s.didChangePrims)t.add(p);const r=new Set,n=new Set,o=new Set;for(const p of e){if((p.kind==="specAdded"||p.kind==="specRemoved")&&p.path.includes(".")){o.add(p.path);continue}if(p.path.includes(".")||p.kind!=="field"||p.fieldName===void 0)continue;const y=Mo(p.fieldName);y==="typeInfo"?n.add(p.path):y==="recompose"&&r.add(p.path)}for(const p of r)t.add(p);for(const p of n)t.add(p);for(const p of o)t.add(p);const a=Zl(t),c=new Set;for(const p of s.didChangeSignificantly)c.add(p);for(const p of s.didChangeSpecs)c.add(Yl(p));for(const p of s.didChangePrims)c.add(p);for(const p of r)c.add(p);const l=Zl(c),u=p=>s.didMaybeChangeLayers&&!i||l.some(y=>$o(p,y)),d=p=>a.some(y=>$o(p,y)),h=[...new Set([...s.didChangeSpecs,...s.didChangeValues,...s.didChangeTargets,...s.didChangeLayerMetadata,...s.didChangeLayerStackValues,...i?["/"]:[]])].filter(p=>!d(p)).sort(),m=[...new Set([...s.didChangeValues,...s.didChangeTargets,...o,...n].filter(p=>!u(p)).map(Yl))].sort();return{populationSubtreeRoots:l,propertyRematerializations:m,stageMetadataChanges:[...s.didChangeLayerMetadata].sort(),layerStackChanges:[...s.didChangeLayerStackFields].sort(),prototypeActions:[],fullPopulationRequired:s.didMaybeChangeLayers,noticeResyncPaths:a,noticeInfoOnlyPaths:h}}function Yl(s){const e=s.lastIndexOf("/"),t=s.indexOf(".",e);return t<0?s:s.slice(0,t)}function $o(s,e){return s===e||e==="/"||s.startsWith(`${e}/`)||s.startsWith(`${e}.`)}function Zl(s){const e=[];for(const t of[...s].sort((i,r)=>i.length-r.length||i.localeCompare(r)))e.some(i=>$o(t,i))||e.push(t);return e.sort()}function jS(s,e,t){return s===e?t:s.startsWith(`${e}/`)||s.startsWith(`${e}.`)?t+s.slice(e.length):s}const Wt={Local:0,Inherit:1,Variant:2,Relocate:3,Reference:4,Payload:5,Specialize:6},HS={[x.Root]:Wt.Local,[x.Inherit]:Wt.Inherit,[x.Variant]:Wt.Variant,[x.Relocate]:Wt.Relocate,[x.Reference]:Wt.Reference,[x.Payload]:Wt.Payload,[x.Specialize]:Wt.Specialize};function Ql(s,e){return s.layer.getField(s.sourcePath,e)}async function Jl(s,e,t,i,r,n={},o,a,c,l,u){return on(u,"usd-ts:composeScene",async d=>{const{nodes:h,instancing:m,dependencies:p,usdDependenciesByPrim:y,clipSetsByPrim:f,cache:g}=await WS(s,e,t,i,r,n,o,a,S=>c?.isIncluded(S)??!0,S=>cn(S,c,l),l,d);return{nodes:h,instancing:m,dependencies:p,usdDependenciesByPrim:y,clipSetsByPrim:f,cache:g}})}let eu=null;function qS(){const s={};for(const e of Ne.GetInstance().GetAllPlugins()){const t=e.GetMetadata().UsdVariantFallbacks;if(t!==void 0&&!(typeof t!="object"||t===null||Array.isArray(t)))for(const[i,r]of Object.entries(t)){if(!Array.isArray(r))continue;const n=r.filter(o=>typeof o=="string");n.length>0&&(s[i]=n)}}return s}const tu=s=>Object.fromEntries(Object.entries(s).map(([e,t])=>[e,[...t]]));function KS(s){const e=new Set;let t=s;for(;t&&!e.has(t);){if(e.add(t),gs(t.arcType))return!0;t=t.origin===t?null:t.origin}return!1}class ns{_population;_primLoadFlags=new Map;_instanceCache;_loadRules;get nodes(){return this._population.nodes}_editTarget;_editTargetContext;rootLayerPath;_initialStartTimeCode;_initialEndTimeCode;_initialTimeCodesPerSecond;_initialFramesPerSecond;_interpolationType=Cm;constructor(e,t=null,i="",r,n=new qi,o=new ys(!0)){this._population=new Qm(e),this._instanceCache=n,this._loadRules=o,this._editTarget=t,this._editTargetContext=t?new Ut(t):null,this.rootLayerPath=i,this._initialStartTimeCode=r?.start,this._initialEndTimeCode=r?.end,this._initialTimeCodesPerSecond=r?.tps,this._initialFramesPerSecond=r?.fps,this._composeAndCacheLoadFlags()}_populationMask;getPopulationMask(){return this._populationMask??li.all()}async setPopulationMask(e){this._populationMask=e;const t=this._pcpCache;if(t){const r=new wi;r.didChangeSignificantlyAtPath("/"),await r.apply(t)}const i={populationSubtreeRoots:["/"],propertyRematerializations:[],stageMetadataChanges:[],layerStackChanges:[],prototypeActions:[],fullPopulationRequired:!0,noticeResyncPaths:["/"],noticeInfoOnlyPaths:[]};await this._recompose(!1,i)}_numericLayerMetadata(e,t){const i=e?.getField("/",t);return typeof i=="number"?i:void 0}_numericRootMetadata(e){return this._numericLayerMetadata(this._rootLayer??this._editTarget,e)}_numericSessionMetadata(e){return this._numericLayerMetadata(this._sessionLayer,e)}get startTimeCode(){return this._rootLayer??this._editTarget?this._numericSessionMetadata("startTimeCode")??this._numericRootMetadata("startTimeCode"):this._initialStartTimeCode}get endTimeCode(){return this._rootLayer??this._editTarget?this._numericSessionMetadata("endTimeCode")??this._numericRootMetadata("endTimeCode"):this._initialEndTimeCode}get timeCodesPerSecond(){return this._rootLayer??this._editTarget?this._numericSessionMetadata("timeCodesPerSecond")??this._numericRootMetadata("timeCodesPerSecond")??this._numericSessionMetadata("framesPerSecond")??this._numericRootMetadata("framesPerSecond")??24:this._initialTimeCodesPerSecond??this._initialFramesPerSecond??24}getFramesPerSecond(){return this._rootLayer??this._editTarget?this._numericSessionMetadata("framesPerSecond")??this._numericRootMetadata("framesPerSecond")??24:this._initialFramesPerSecond??24}setInterpolationType(e){if(this._interpolationType===e)return;this._interpolationType=e;const t=this._withNamespaceEditMethods({resyncedPaths:["/"],changedInfoOnlyPaths:[]});for(const i of this._changeListeners)i(t)}getInterpolationType(){return this._interpolationType}hasAuthoredTimeRange(){const e=t=>this._numericLayerMetadata(t,"startTimeCode")!==void 0&&this._numericLayerMetadata(t,"endTimeCode")!==void 0;return e(this._sessionLayer)||e(this._rootLayer??this._editTarget)}static getGlobalVariantFallbacks(){return tu(eu??=qS())}static setGlobalVariantFallbacks(e){eu=tu(e)}_variantFallbacks=ns.getGlobalVariantFallbacks();static async open(e,t){return zl(e,i=>ns._open(e,t,i))}static async openMasked(e,t,i){const r=typeof e=="string"?e:e.filePath;return zl(r,n=>ns._open(e,i,n,t))}static async _open(e,t,i,r){const n=Qs(),o=t?.resolverContext,a=o??new rt,c=typeof e=="string"?await Yn(a,i,()=>ho(e,n,a)):e,l=o||typeof e!="string"?void 0:await n.resolve(e,a),u=o??n.createDefaultContextForAsset(l?.toString()||c.filePath),d=t?.sessionLayerPath?await Yn(u,i,()=>ho(t.sessionLayerPath,n,u)):Y.createAnonymous("anon:session"),h=ns.getGlobalVariantFallbacks(),m=new Set,p=new qi,y=new ys(t?.loadPayloads!==!1),{nodes:f,instancing:g,dependencies:S,usdDependenciesByPrim:b,clipSetsByPrim:P,cache:w}=await Jl(c,m,n,u,d,h,void 0,p,y,r,i),_=A=>{const T=c.getField("/",A);return typeof T=="number"?T:void 0},v=new ns(f,c,c.filePath,{start:_("startTimeCode"),end:_("endTimeCode"),tps:_("timeCodesPerSecond"),fps:_("framesPerSecond")},p,y);return r&&(v._populationMask=r),v._rootLayer=c,v._sessionLayer=d,v._variantFallbacks=h,v._instancing=g,v._resolver=n,v._resolverContext=u,v._usedLayers=S,v._usdDependenciesByPrim=b,v._clipSetsByPrim=P,v._pcpCache=w,v._muted=m,v._composeAndCacheLoadFlags(),v._refreshFallbackPrimTypes(v.nodes),v._subscribeRegistryLayers(),v._subscribeResolverChanges(),v}_rootLayer=null;_muted=new Set;_resolver;_resolverContext;get _arResolver(){return this._resolver}get _arResolverContext(){return this._resolverContext}_usedLayers=new Set;_mutedLayerPropertyPaths=new Map;_usdDependenciesByPrim=new Map;_clipSetsByPrim=new Map;_pcpCache=null;_canonicalLayerId(e){return this._rootLayer?.resolveAsset(e)||e}getMutedLayers(){return[...this._muted]}isLayerMuted(e){return this._muted.has(this._canonicalLayerId(e))}async muteLayer(e){await this.muteAndUnmuteLayers([e],[])}async unmuteLayer(e){await this.muteAndUnmuteLayers([],[e])}async load(e="/",t="withDescendants"){if(!this._isValidLoadPath(e))throw new Error(`Cannot load unknown prim <${e}>`);await this.loadAndUnload([e],[],t)}async unload(e="/"){await this.loadAndUnload([],[e])}async loadAndUnload(e,t,i="withDescendants"){const r=[...new Set(e)],n=[...new Set(t)];for(const d of r)if(!this._isValidLoadPath(d))throw new Error(`Cannot load unknown prim <${d}>`);if(n.length===0&&r.every(d=>i==="withDescendants"?this._loadRules.isLoadedWithAllDescendants(d):this._loadRules.isLoadedWithNoDescendants(d))||r.length===0&&n.every(d=>this._loadRules.getEffectiveRuleForPath(d)===ys.NoneRule))return;const o=new Set(r),a=new Set(n),c=this._loadRules.clone();if(this._loadRules.loadAndUnload(o,a,i),this._loadRules.equals(c))return;for(const d of[...o]){let h=d;for(;;){const m=h.lastIndexOf("/");if(m<0)break;const p=m===0?"/":h.slice(0,m);if(this.getPrim(p)?.isLoaded){d!==h&&o.add(h);break}if(p==="/")break;h=p}}const l=[],u=[...o,...a].map(d=>this._instanceCache.getMostAncestralInstancePath(d)??d);for(const d of u.sort((h,m)=>h.length-m.length||h.localeCompare(m)))l.some(h=>d===h||h==="/"||d.startsWith(`${h}/`))||l.push(d);await this._applyPayloadLoadRules(l)}getLoadSet(){return[...this._pcpCache?.getIncludedPayloadPaths()??[]].filter(e=>this.nodes.has(e))}findLoadable(e="/"){return[...this._pcpCache?.findPayloadPaths(e)??[]]}_isPrimLoaded(e){return this._primLoadFlags.get(e)?.loaded??!1}_composeAndCacheLoadFlags(e=["/"]){if(e.length===0)return;const t=(o,a)=>o==="/"||a===o||a.startsWith(`${o}/`),i=[...new Set(e)].filter(o=>!e.some(a=>a!==o&&t(a,o)));for(const o of this._primLoadFlags.keys())i.some(a=>t(a,o))&&this._primLoadFlags.delete(o);const r=Bo(this.nodes).children,n=o=>{const a=this.nodes.get(o);if(!a)return;const c=o.lastIndexOf("/"),l=c<=0?"/":o.slice(0,c);if(o==="/"||Fn(o))this._primLoadFlags.set(o,{active:!0,hasPayload:!1,loaded:!0});else{this._primLoadFlags.has(l)||n(l);const u=this._primLoadFlags.get(l),d=a.fields.active!==!1&&(u?.active??!0),h=this._getPrimQuerySource(o),m=h!==void 0&&[...h.index.getNodeRange()].some(y=>!y.culled&&!y.elided&&zr(y.layerStack,F(y.path),y.expressionVars).length>0),p=d&&(m?this._pcpCache.isPayloadIncluded(h.sourcePrimPath):u?.loaded??!0);this._primLoadFlags.set(o,{active:d,hasPayload:m,loaded:p})}};for(const o of i){const a=[o];for(;a.length>0;){const c=a.pop();if(n(c),this.nodes.has(c))for(const l of r.get(c)??[])a.push(l)}}}_hasClassSpecifier(e){let t=e;for(const[o,a]of this._instancing.protoToSource)if(e===o||e.startsWith(`${o}/`)){t=a+e.slice(o.length);break}const i=this._pcpCache?.findPrimIndex(t);if(!i)return this.nodes.get(e)?.fields.specifier==="class";const r=[...i.getNodeRange()];let n=!1;for(const o of i.composePrimStack()){const a=o.layer.getField(F(o.path),"specifier");if(a==="def"||a===0)return!1;if(a!=="class"&&a!==2)continue;let c=r[o.nodeIndex]??null,l=!1;for(;c;){if(c.arcType===x.Inherit&&!c.isDueToAncestor){l=!0;break}c=c.parent}if(!l)return!0;n=!0}return n}getLoadRules(){return this._loadRules.clone()}async setLoadRules(e){if(this._loadRules.equals(e))return;this._loadRules.setRules(e.getRules());const t=this._pcpCache;if(!t)return;const i=new wi;i.didChangeSignificantlyAtPath("/"),await i.apply(t);const r={populationSubtreeRoots:["/"],propertyRematerializations:[],stageMetadataChanges:[],layerStackChanges:[],prototypeActions:[],fullPopulationRequired:!0,noticeResyncPaths:["/"],noticeInfoOnlyPaths:[]};await this._recompose(!1,r)}async _applyPayloadLoadRules(e){const t=this._pcpCache;if(!t||e.length===0)return;const i=new wi,r=t.getIncludedPayloadPaths().filter(o=>e.some(a=>o===a||a==="/"||o.startsWith(`${a}/`)));t.requestPayloads([],r,i);for(const o of e)i.didChangeSignificantlyAtPath(o);await i.apply(t);const n={populationSubtreeRoots:[...e],propertyRematerializations:[],stageMetadataChanges:[],layerStackChanges:[],prototypeActions:[],fullPopulationRequired:!1,noticeResyncPaths:[...e],noticeInfoOnlyPaths:[]};await this._recomposeSubtrees(n)||await this._recompose(!1,n)}_isValidLoadPath(e){if(e==="/"||this.getPrim(e))return!0;let t=e;for(;t.includes("/");){if(t=t.slice(0,t.lastIndexOf("/"))||"/",t==="/")return!1;if(this.getPrim(t))return!0}return!1}async muteAndUnmuteLayers(e,t){const i=e.map(c=>this._canonicalLayerId(c)),r=t.map(c=>this._canonicalLayerId(c));if(this._rootLayer&&i.includes(this.rootLayerPath))throw new Error(`Cannot mute the stage's root layer: ${this.rootLayerPath}`);const n=new Set;for(const c of this._usedLayers){const l=this._canonicalLayerId(c.filePath);i.includes(l)&&(n.add(c),this._mutedLayerPropertyPaths.set(l,this._propertyPathsAffectedByLayers(new Set([c]))))}const o=this._propertyPathsAffectedByLayers(n);for(const c of r){const l=this._mutedLayerPropertyPaths.get(c);if(l)for(const u of l)o.add(u)}let a=!1;for(const c of r)this._muted.delete(c)&&(a=!0);for(const c of i)this._muted.has(c)||(this._muted.add(c),a=!0);if(a){for(const c of o)this._pendingChanges.add(c);await this._recompose();for(const c of r)this._muted.has(c)||this._mutedLayerPropertyPaths.delete(c)}}_propertyPathsAffectedByLayers(e){const t=new Set,i=this._pcpCache;if(!i)return t;const r=new Set(i.getLayerStack().layers.map(n=>n.layer));for(const n of e)for(const o of n.getSpecPaths()){const a=o.indexOf("["),c=a<0?o:o.slice(0,a);if(!c.includes("."))continue;const l=Ms(c),u=c.slice(l.length);for(const d of i.findSiteDependencies(n,l))t.add(d.indexPath==="/"&&u.startsWith("/")?u:`${d.indexPath}${u}`);r.has(n)&&t.add(c)}return t}async _recompose(e=!0,t){return jl("usd-ts:Stage.recompose",i=>this._recomposeImpl(e,t,i))}async _recomposeInTraceContext(e,t,i){return on(i,"usd-ts:Stage.recompose",r=>this._recomposeImpl(e,t,r))}async _recomposeImpl(e,t,i){const r=this._rootLayer??this._editTarget;if(!r)return;const n=new Map(this.nodes);e&&this._pcpCache&&await this._pcpCache.invalidateAll();const{nodes:o,instancing:a,dependencies:c,usdDependenciesByPrim:l,clipSetsByPrim:u,cache:d}=await Jl(r,this._muted,this._resolver,this._resolverContext,this._sessionLayer??void 0,this._variantFallbacks,this._pcpCache??void 0,this._instanceCache,this._loadRules,this._populationMask,i);this._population.replaceAll(o),this._instancing=a,this._usedLayers=c,this._usdDependenciesByPrim=l,this._clipSetsByPrim=u,this._pcpCache=d,this._composeAndCacheLoadFlags(),this._subscribeRegistryLayers();const h=this._refreshFallbackPrimTypes(this.nodes),m=this._pendingResyncs,p=this._pendingChanges;if(this._pendingResyncs=new Set,this._pendingChanges=new Set,t){this._emitChangePlanNotice(this._mergeAuthoredNoticePaths(t,[...m],[...p]));return}if(this._changeListeners.size>0){const y=hS(n,this.nodes),f=new Set([...y.resyncedPaths,...m]);h&&f.add("/");const g=(P,w)=>w===P||w.startsWith(P==="/"?"/":`${P}/`),S=[];for(const P of[...f].sort())S.some(w=>g(w,P))||S.push(P);const b=[...new Set([...y.changedInfoOnlyPaths,...p])].filter(P=>!S.some(w=>g(w,Ms(P))));if(S.length>0||b.length>0){const P=this._withNamespaceEditMethods({resyncedPaths:S,changedInfoOnlyPaths:b});for(const w of this._changeListeners)w(P)}}}async _recomposeSubtrees(e){const t=this._rootLayer??this._editTarget,i=this._pcpCache;if(!t||!i||e.populationSubtreeRoots.includes("/"))return!1;const r=[...new Set(e.populationSubtreeRoots.map(b=>this._instanceCache.getMostAncestralInstancePath(b)??b))];for(const b of r)this._instanceCache.unregisterInstancePrimIndexesUnder(b);const n=await RS(i,r,b=>cn(b,this._loadRules,this._populationMask),this._populationMask),o=new Set;for(const[b,P]of n.instanceKeys)this._instanceCache.registerInstancePrimIndex(b,P)&&o.add(b);const a=this._instanceCache.processChanges(),c=this._instanceCache.getInstancingInfo(),l=new Map;for(let b=0;b<a.newPrototypePrims.length;b++)l.set(a.newPrototypePrims[b],a.newPrototypePrimIndexes[b]);for(let b=0;b<a.changedPrototypePrims.length;b++){const P=a.changedPrototypePrimIndexes[b];n.childrenByPrim.has(P)&&l.set(a.changedPrototypePrims[b],P)}for(const b of o){const P=this._instanceCache.getPrototypeForInstanceablePrimIndexPath(b);P!==void 0&&l.set(P,b)}const u=Fo(void 0,this._muted,this._resolver,this._resolverContext),{nodes:d,usdDependenciesByPrim:h,clipSetsByPrim:m}=await VS(n,r,u,c.instanceToProto,l),p=[...a.newPrototypePrims,...l.keys(),...a.deadPrototypePrims],y=[...new Set([...r,...p])],f=b=>y.some(P=>b===P||P==="/"||b.startsWith(`${P}/`));this._population.replaceSubtrees(d,y);for(const b of[...this._usdDependenciesByPrim.keys()])f(b)&&this._usdDependenciesByPrim.delete(b);for(const[b,P]of h)this._usdDependenciesByPrim.set(b,new Set(P));for(const b of[...this._clipSetsByPrim.keys()])f(b)&&this._clipSetsByPrim.delete(b);for(const[b,P]of m)this._clipSetsByPrim.set(b,P);this._instancing=c,this._composeAndCacheLoadFlags(y),this._rebuildUsedLayersFromRetainedDependencies(),this._refreshFallbackPrimTypes(this.nodes);const g=[...this._pendingResyncs],S=[...this._pendingChanges];return this._pendingResyncs=new Set,this._pendingChanges=new Set,this._emitChangePlanNotice(this._mergeAuthoredNoticePaths(e,g,S),[...a.newPrototypePrims,...a.deadPrototypePrims]),!0}_emitChangePlanNotice(e,t=[]){const i=this._resolvedAssetPathsResyncPending;if(this._resolvedAssetPathsResyncPending=!1,this._changeListeners.size===0)return;const r=c=>{const l=[];for(const u of c){const d=u.indexOf(".",u.lastIndexOf("/")),h=d<0?u:u.slice(0,d);if(!this._instanceCache.isPathDescendantToAnInstance(h)){l.push(u);continue}for(const m of this._instanceCache.getPrimsInPrototypesUsingPrimIndexPath(h))l.push(m+u.slice(h.length))}return l},n=[];for(const c of[...new Set([...r(e.noticeResyncPaths),...t])].sort((l,u)=>l.length-u.length||l.localeCompare(u)))n.some(l=>c===l||l==="/"||c.startsWith(`${l}/`)||c.startsWith(`${l}.`))||n.push(c);n.sort();const o=[...new Set(r(e.noticeInfoOnlyPaths))].filter(c=>!n.some(l=>c===l||l==="/"||c.startsWith(`${l}/`)||c.startsWith(`${l}.`))).sort();if(n.length===0&&o.length===0&&!i)return;const a=this._withNamespaceEditMethods({resyncedPaths:n,changedInfoOnlyPaths:[...o],...i?{resolvedAssetPathsResyncedPaths:n.includes("/")?[]:["/"]}:{}});for(const c of this._changeListeners)c(a)}_mergeAuthoredNoticePaths(e,t,i){const r=e.noticeResyncPaths.filter(n=>!t.some(o=>o!==n&&(o.startsWith(`${n}/`)||o.startsWith(`${n}.`))));return{...e,noticeResyncPaths:[...r,...t],noticeInfoOnlyPaths:[...e.noticeInfoOnlyPaths,...i]}}_populatedPathsForPrimIndexPath(e){return this._instanceCache.isPathDescendantToAnInstance(e)?this._instanceCache.getPrimsInPrototypesUsingPrimIndexPath(e):[e]}_fallbackPrimTypesJson="null";_refreshFallbackPrimTypes(e){const i=(this._rootLayer??this._editTarget)?.getField("/","fallbackPrimTypes"),r=JSON.stringify(i??null),n=r!==this._fallbackPrimTypesJson;this._fallbackPrimTypesJson=r;const o={};if(i!==null&&typeof i=="object"&&!Array.isArray(i)){for(const[c,l]of Object.entries(i))if(C.getConcreteTypeFromSchemaTypeName(c).IsUnknown()&&Array.isArray(l)){for(const u of l)if(typeof u=="string"&&!C.getConcreteTypeFromSchemaTypeName(u).IsUnknown()){o[c]=u;break}}}const a=e.get("/");return a&&(Object.keys(o).length>0?a.fields.__fallbackPrimTypes=o:delete a.fields.__fallbackPrimTypes),n}_changeListeners=new Set;_pendingChanges=new Set;_pendingResyncs=new Set;_pendingNamespaceEdit;_expectNamespaceEdit(e,t){this._pendingNamespaceEdit={oldPath:e,newPath:t}}_withNamespaceEditMethods(e){const t=this._pendingNamespaceEdit;return this._pendingNamespaceEdit=void 0,Yd(e,t)}onObjectsChanged(e){return this._changeListeners.add(e),()=>{this._changeListeners.delete(e)}}getVariantSets(e){return new dS(this,e)}get _composedNodes(){return this.nodes}_sortedSpecsFor(e){if(this._pcpCache){const t=this._pcpCache.findPrimIndex(e);if(t)return t.composePrimStack().map(r=>({layer:r.layer,sourcePath:F(r.path),arc:[HS[r.arcType]??Wt.Local],offset:{offset:r.offset.offset,scale:r.offset.scale}}));const i=[];for(const r of this.getLayerStack(!0))r.getFieldNames(e).length>0&&i.push({layer:r,sourcePath:e,arc:[Wt.Local],offset:{offset:0,scale:1}});return i}return[]}_variantSetNames(e){const t=[];for(const i of this._sortedSpecsFor(e)){const r=Ql(i,"variantSetChildren");if(Array.isArray(r))for(const n of r)t.includes(n)||t.push(n)}return t}_variantNames(e,t){const i=[];for(const r of this._sortedSpecsFor(e)){const n=`${r.sourcePath==="/"?"":r.sourcePath}{${t}=}`,o=r.layer.getField(n,"variantChildren");if(Array.isArray(o))for(const a of o)i.includes(a)||i.push(a)}return i}_variantSelection(e,t){const i=this._pcpCache?.findPrimIndex(e);if(i){for(const r of i.getNodeRange())if(r.arcType===x.Variant){const[n,o]=r.path.getVariantSelection();if(n===t)return o}return""}for(const r of this._sortedSpecsFor(e)){const o=Ql(r,"variantSelection")?.[t];if(o!==void 0)return Array.isArray(o)?o[0]??"":o}return""}_batchDepth=0;_batchDirty=!1;async changeBlock(e){this._batchDepth+=1;try{return await e()}finally{this._batchDepth-=1,this._batchDepth===0&&this._batchDirty&&(this._batchDirty=!1,await this._recompose())}}async _recomposeForEdit(e){if(e&&this._pendingResyncs.add(e),this._batchDepth>0){this._batchDirty=!0;return}await this._recompose()}_layerSubscriptions=new Map;_suppressLayerNotices=0;_changesPending=!1;_changeFlush=null;_pendingLayerChanges=new Map;_resolverChangePending=!1;_resolvedAssetPathsResyncPending=!1;_subscribeResolverChanges(){const e=new WeakRef(this);Au(t=>{const i=e.deref();!i||!t.affectsContext(i._resolverContext)||(i._resolverChangePending=!0,i._resolvedAssetPathsResyncPending=!0,i._scheduleRecompose())})}_subscribeRegistryLayers(){const e=new Set;this._rootLayer?e.add(this._rootLayer):this._editTarget&&e.add(this._editTarget),this._sessionLayer&&e.add(this._sessionLayer);for(const t of this._usedLayers)e.add(t);for(const[t,i]of this._layerSubscriptions)e.has(t)||(i(),this._layerSubscriptions.delete(t));for(const t of e)this._layerSubscriptions.has(t)||this._layerSubscriptions.set(t,t._registerDidChangeListener(i=>{this._onLayerDidChange(t,i)}))}_onLayerDidChange(e,t){if((t.fieldName==="clips"||t.fieldName==="clipSets")&&Hy(e),this._suppressLayerNotices>0)return;const i=this._pendingLayerChanges.get(e);i?i.push(t):this._pendingLayerChanges.set(e,[t]),this._scheduleRecompose()}_scheduleRecompose(){if(this._changesPending=!0,this._changeFlush)return;const e=Promise.resolve().then(()=>jl("usd-ts:Stage.processChanges",t=>{const i=()=>this._drainLayerChanges(t);if(!t)return i();const r=()=>PS(this._instanceCache,t,i);return this._pcpCache?Rd(this._pcpCache,t,r):r()}));this._changeFlush=e,e.then(()=>this._finishChangeFlush(e),()=>this._finishChangeFlush(e))}_finishChangeFlush(e){this._changeFlush===e&&(this._changeFlush=null,this._changesPending&&this._scheduleRecompose())}async _drainLayerChanges(e){for(;this._changesPending;){this._changesPending=!1;const t=this._pendingLayerChanges;this._pendingLayerChanges=new Map,this._resolverChangePending&&(this._resolverChangePending=!1,await this._processResolverChange(e)),t.size>0&&await this._processLayerChanges(t,e)}}async _processResolverChange(e){const t=this._pcpCache;if(!t)return;const i=new wi;i.didChangeAssetResolver(t),await i.apply(t);const r=$n(i.getCacheChanges());if(r.populationSubtreeRoots.length>0){if(await this._recomposeSubtrees(r))return;await this._recomposeInTraceContext(!1,r,e);return}this._emitChangePlanNotice(r)}async _processLayerChanges(e,t){const i=this._pcpCache;if(!i&&e.size>0){const d=new Ud,h=[];for(const[p,y]of e)for(const f of y)f.fieldName==="primChildren"||f.fieldName==="properties"||(h.push({path:f.path,kind:f.kind,...f.fieldName===void 0?{}:{fieldName:f.fieldName},layer:p,specPath:f.path}),(f.kind==="field"||f.kind==="timeSample")&&(f.fieldName==="connectionPaths"||f.fieldName==="targetPaths"?d.didChangeTargets.add(f.path):d.didChangeValues.add(f.path)));const m=$n(d,h);await this._recomposeInTraceContext(!0,m,t);return}if(!i||e.size===0){await this._recomposeInTraceContext(!0,void 0,t);return}const r=new wi,n=this._mapUsdLayerChanges(i,e);for(const[d,h]of e)r.didChange(i,h.map(m=>Vy(d,m)));for(const d of n)d.kind==="field"&&d.fieldName==="active"&&r.didChangeSignificantlyAtPath(d.path);if(r.isEmpty()&&n.length===0){await this._recomposeInTraceContext(!0,void 0,t);return}const o=r.getCacheChanges();await r.apply(i);const a=$n(o,n);if(a.fullPopulationRequired||a.prototypeActions.length>0){await this._recomposeInTraceContext(!1,a,t);return}if(a.populationSubtreeRoots.length>0){if(await this._recomposeSubtrees(a))return;await this._recomposeInTraceContext(!1,void 0,t);return}const c=a.propertyRematerializations.filter(d=>a.noticeResyncPaths.some(h=>h.includes(".")&&Ms(h)===d)||a.noticeInfoOnlyPaths.includes(d));if(c.length>0){const d=Fo(void 0,this._muted,this._resolver,this._resolverContext),h=new Map,m=[];for(const p of c){const y=i.findPrimIndex(p);if(y)for(const f of this._populatedPathsForPrimIndexPath(p))m.push(f),await FS(y,h,f,d,i,this._instancing.instanceToProto.get(p))}this._population.replacePrims(h,m),this._composeAndCacheLoadFlags(m)}const l=[...this._pendingResyncs],u=[...this._pendingChanges];this._pendingResyncs=new Set,this._pendingChanges=new Set,this._emitChangePlanNotice(this._mergeAuthoredNoticePaths(a,l,u))}_mapUsdLayerChanges(e,t){const i=[];for(const[r,n]of t){const o=new Set,a=new Set(n.filter(l=>l.kind==="specAdded"&&l.inert).map(l=>l.path)),c=e.getLayerStack().layers.some(l=>l.layer===r);for(const l of n){if(l.fieldName==="specifier"&&l.oldValue===void 0&&l.newValue==="over"&&a.has(l.path))continue;const u=Ms(l.path),d=new Set;for(const h of e.findSiteDependencies(r,u)){const m=l.path.slice(u.length);d.add(h.indexPath==="/"&&m.startsWith("/")?m:`${h.indexPath}${m}`)}c&&d.add(l.path);for(const h of d){const m=`${l.kind}\0${h}\0${l.fieldName??""}`;o.has(m)||(o.add(m),i.push({path:h,kind:l.kind,...l.fieldName===void 0?{}:{fieldName:l.fieldName},layer:r,specPath:l.path}))}}}return i}_rebuildUsedLayersFromRetainedDependencies(){const e=new Set;this._rootLayer?e.add(this._rootLayer):this._editTarget&&e.add(this._editTarget),this._sessionLayer&&e.add(this._sessionLayer),this._pcpCache?.forEachLayerUsed(t=>e.add(t));for(const t of this._usdDependenciesByPrim.values())for(const i of t)e.add(i);this._usedLayers=e,this._subscribeRegistryLayers()}async flushChanges(){for(;this._changesPending||this._changeFlush;)this._changeFlush||this._scheduleRecompose(),await this._changeFlush}async _interim_flushChanges(){await this.flushChanges()}_ownAuthoring(e){if(this._pcpCache)return e();this._suppressLayerNotices+=1;try{return e()}finally{this._suppressLayerNotices-=1}}async _ownAuthoringAsync(e){this._suppressLayerNotices+=1;try{return await e()}finally{this._suppressLayerNotices-=1}}getSubLayerPaths(){const e=this._rootLayer?.getField("/","subLayers");return Array.isArray(e)?[...e]:[]}getSubLayerOffsets(){const e=this._rootLayer?.getField("/","subLayerOffsets");return Array.isArray(e)?[...e]:[]}_instancing=gS;getPrimStack(e){const t=new Set(["specifier","primChildren","properties","form","fields"]),i=(r,n)=>Object.fromEntries(r.getFieldNames(n).filter(o=>!t.has(o)).map(o=>[o,r.getField(n,o)]));if(this._pcpCache){const r=this._getPrimQuerySource(e)?.index;return r?r.composePrimStack().map(n=>({layerIdentifier:n.layer.filePath,specPath:n.path.pathString,arc:fr[n.arcType]??"local",offset:{offset:n.offset.offset,scale:n.offset.scale},metadata:i(n.layer,n.path.pathString)})):[]}return this._sortedSpecsFor(e).map(r=>({layerIdentifier:r.layer.filePath,specPath:r.sourcePath,arc:fr[r.arc[0]??0]??"local",offset:{offset:r.offset.offset,scale:r.offset.scale},metadata:i(r.layer,r.sourcePath)}))}getPropertyStack(e,t="default"){return this.getPropertyStackWithLayerOffsets(e,t).map(({offset:i,...r})=>r)}getPropertyStackWithLayerOffsets(e,t="default"){return Ln("usd-ts:Stage.getPropertyStack",i=>{i&&(_e(i,"propertyPath",e),_e(i,"time",t));const r=this._getPropertyStackWithLayerOffsets(e,t);return i&&_e(i,"specCount",r.length),r})}_getPropertyStackWithLayerOffsets(e,t){const i=e.indexOf(".");if(i<=0)return[];const r=e.slice(0,i),n=e.slice(i+1);if(this._pcpCache){const o=this._getPrimQuerySource(r);if(!o)return[];const{index:a,sourcePrimPath:c}=o,l=a.composePropertyStack(n),u=new Map;for(const m of l)u.set(`${m.nodeIndex}:${m.layerIndex}`,m);const d=new Map;if(typeof t=="number")for(const m of this._clipSetsByPrim.get(c)??[]){const p=tS(n,m,t);if(p.length===0)continue;const y=`${m.position[0]}:${m.position[1]}`;d.set(y,[...d.get(y)??[],...p])}const h=[];for(const{nodeIndex:m,layerIndex:p,node:y,layerToStageOffset:f}of Eo(a,n)){const g=u.get(`${m}:${p}`);g&&h.push({layerIdentifier:g.layer.filePath,specPath:g.path.pathString,arc:fr[g.arcType]??"local",offset:{offset:g.offset.offset,scale:g.offset.scale},value:g.layer.getField(g.path.pathString,"default"),timeSamples:On(g.layer.getField(g.path.pathString,"timeSamples"))});for(const S of d.get(`${m}:${p}`)??[]){const b=S.layer;h.push({layerIdentifier:S.layer.filePath,specPath:S.specPath,arc:fr[y.arcType]??"local",offset:{offset:f.offset,scale:f.scale},value:b.getField(S.specPath,"default"),timeSamples:On(b.getField(S.specPath,"timeSamples"))})}}return h}return[]}getPrimIndex(e){return this._pcpCache?.findPrimIndex(e)}_getPrimQuerySource(e){const t=this._instanceCache.getPathInPrototypeForInstancePath(e);t!==void 0&&(e=t);for(const[r,n]of this._instancing.protoToSource)if(e===r||e.startsWith(`${r}/`)){const o=n+e.slice(r.length),a=this._pcpCache?.findPrimIndex(o);return a?{index:a,sourcePrimPath:o,sourceRootPath:n,dataRootPath:r}:void 0}const i=this._pcpCache?.findPrimIndex(e);return i?{index:i,sourcePrimPath:e,sourceRootPath:e,dataRootPath:e}:void 0}_resolveAttribute(e,t,i,r){return Ln("usd-ts:Stage.resolveAttributeValue",n=>{const o=`${e==="/"?"":e}.${t}`;n&&(_e(n,"propertyPath",o),_e(n,"time",i??"resolveInfo"));const a=this._resolveAttributeImpl(e,t,i,r);return n&&(_e(n,"source",a.source),_e(n,"valueIsBlocked",a.valueIsBlocked)),a})}_resolveAttributeImpl(e,t,i,r){const n=`${e==="/"?"":e}.${t}`;Mm(this,{kind:"valueResolution",path:n});const o=this.nodes.get(n),a=o?.fields.typeName,c=(g,S=a)=>({...g,...S!==void 0?{typeName:S}:{},interpolation:this._interpolationType}),l=this._getPrimQuerySource(e);if(!l){const g=o;if(i!=="default"&&g?.timeSamples?.length)return c({source:"timeSamples",timeSamples:g.timeSamples,valueIsBlocked:!1});if(i!=="default"){const b=g?.fields.spline;if(b)return c({source:"spline",spline:b,valueIsBlocked:!1})}if(g&&"default"in g.fields){const b=g.fields.default;if(b instanceof pe||b===null){const P=r();return c(P===void 0?{source:"none",valueIsBlocked:!0}:{source:"fallback",value:P,valueIsBlocked:!0})}return c(b instanceof tt?{source:"none",valueIsBlocked:!1}:{source:"default",value:b,valueIsBlocked:!1})}const S=r();return c(S===void 0?{source:"none",valueIsBlocked:!1}:{source:"fallback",value:S,valueIsBlocked:!1})}const{index:u,sourcePrimPath:d}=l,h=this._clipSetsByPrim.get(d),m=h?Hd(t,h):void 0,p=Er(u,t,"typeName"),y=_S(u,t,i,m?.map(g=>({position:g.position,resolve:S=>{const b=tr(g),P=S===void 0?void 0:ko(g,S,this._interpolationType,!1,p);if(!(P===void 0&&b.length===0))return{source:"valueClips",value:P,valueIsBlocked:!1,valueEvaluator:(w,_)=>ko(g,w,this._interpolationType,_,p),node:[...u.getNodeRange()][g.position[0]],timeSamples:b.map(w=>[w,void 0])}}}))??[]);if(y.source!=="none")return this._transformAttributeValue(u,t,y);const f=r();return c(f===void 0?y:{source:"fallback",value:f,valueIsBlocked:y.valueIsBlocked},p)}_transformAttributeValue(e,t,i){const r=Er(e,t,"typeName"),n=a=>{if(r==="asset"||r==="asset[]"){const c=l=>{if(typeof l!="string"||!vs(l))return l;let u="";if(i.node){const h=Qi(l,i.node.expressionVars);typeof h.value=="string"&&(u=h.value)}const d=u||l;return new Xt({authoredPath:l,evaluatedPath:u,resolvedPath:i.layer?.resolveAsset(d)??""})};return Array.isArray(a)?a.map(c):c(a)}if((r==="timecode"||r==="timecode[]")&&i.layerToStageOffset){if(typeof a=="number")return qe(i.layerToStageOffset,a);if(Array.isArray(a))return a.map(c=>typeof c=="number"?qe(i.layerToStageOffset,c):c)}return a},o={...i,...typeof r=="string"?{typeName:r}:{},interpolation:this._interpolationType};return i.value!==void 0&&(o.value=n(i.value)),i.valueEvaluator&&(o.valueEvaluator=(a,c)=>n(i.valueEvaluator(a,c))),i.timeSamples&&(o.timeSamples=i.timeSamples.map(([a,c])=>[a,n(c)])),o}_resolvePropertyField(e,t,i){const r=this._getPrimQuerySource(e);if(r){if(i==="custom")return this.getPrim(e)?.getPrimDefinition().getPropertyDefinition(t)?.isValid()?!1:Kl(r.index,t,i);if(i==="variability")return Kl(r.index,t,i);if(i==="typeName"){const c=r.index.composePropertyStack(t)[0],l=c?F(c.path):void 0;if(c&&l&&(c.layer.getSpecType(l)==="relationship"||c.layer.getField(l,"targetPaths")!==void 0))return"rel"}const n=Lo(r.index,t,i);if(!n)return;const o=Er(r.index,t,"typeName");if(i!=="default"&&i!=="timeSamples"){const c=o==="rel"?"relationship":"attribute";return gr(n.value,i,c,l=>qe(n.layerToStageOffset,l))}const a=c=>{if((o==="timecode"||o==="timecode[]")&&n.layerToStageOffset){if(typeof c=="number")return qe(n.layerToStageOffset,c);if(Array.isArray(c))return c.map(l=>typeof l=="number"?qe(n.layerToStageOffset,l):l)}return c};return i==="default"?a(n.value):Object.fromEntries((On(n.value)??[]).map(([c,l])=>[qe(n.layerToStageOffset,c),a(l)]))}return this.nodes.get(`${e}.${t}`)?.fields[i]}_isPropertyCustom(e,t){if(this.getPrim(e)?.getPrimDefinition().getPropertyDefinition(t)?.isValid())return!1;const r=this._getPrimQuerySource(e);return r?AS(r.index,t):this.nodes.get(`${e}.${t}`)?.fields.custom===!0}_resolvePropertyFieldTypeName(e,t,i){const r=this._getPrimQuerySource(e);if(!r)return;const n=Lo(r.index,t,i);return n?.layer._getFieldValueTypeName(n.specPath,i)}_resolvePrimMetadata(e,t){const i=this._getPrimQuerySource(e);if(!i)return this.nodes.get(e)?.fields[t];if(t==="specifier")return Jd(i.index);const r=Oo(i.index,t);if(r)return gr(r.value,t,"prim",n=>qe(r.layerToStageOffset,n))}_resolvePrimFieldTypeName(e,t){const i=this._getPrimQuerySource(e);if(!i)return;const r=Oo(i.index,t);return r?.layer._getFieldValueTypeName(r.specPath,t)}_resolvePropertyPaths(e,t,i,r=e){const n=this._getPrimQuerySource(e);if(n){const a=e.slice(n.dataRootPath.length),c=a&&r.endsWith(a)?r.slice(0,-a.length):r,l=d=>d===n.sourceRootPath||d.startsWith(`${n.sourceRootPath}/`)||d.startsWith(`${n.sourceRootPath}.`)?c+d.slice(n.sourceRootPath.length):d,u=TS(n.index,t,i,this._pcpCache??void 0,l);if(u!==void 0)return u}const o=this.nodes.get(`${e}.${t}`)?.fields[i];return typeof o=="string"?[o]:Array.isArray(o)?o.filter(a=>typeof a=="string"):void 0}_flattenProperty(e,t,i){const r=e._getPrimPath(),n=e._getName();if(!n)throw new Error("Cannot flatten invalid property");let o,a,c=n;if(t instanceof ls?(o=t.getStage(),a=t.path,i!==void 0&&(c=i)):t instanceof ci&&(o=t.getStage(),a=t.primPath,c=t.name),!o||!a||!o.getPrim(a))throw new Error(`Cannot flatten property <${r}.${n}> to invalid destination`);const l=e.isRelationship,u=`${a}.${c}`,d=o.get(u);if(d&&d.typeName&&d.isRelationship!==l)throw new Error(`Cannot flatten <${r}.${n}> to <${u}>: properties have different types`);const h=e.typeName;if(!l&&!h)throw new Error(`Cannot flatten attribute <${r}.${n}> with unknown type`);const m=this._getFlattenPropertyMetadata(r,n,e),p=l?e.getTargets():[],y=l?[]:e.getConnections(),f=l?void 0:e.getResolveInfo("default"),g=l?void 0:e.getValue(),S=l?void 0:e.getResolveInfo(),b=S?.getSource()===Cr.Spline?e.getSpline():void 0,P=S?.valueSourceMightBeTimeVarying()&&!b?e.getTimeSampleKeys().map(v=>{const A=e.getResolveInfo(v);return[v,A.valueIsBlocked()?new pe:e.getValueAtTime(v)]}):[],w=v=>jS(v,r,a);if(o===this&&r===a&&n===c||o._clearPropertySpecForFlatten(a,c),o.declareProperty(a,c,l?"rel":h),l)o._setRelTargets(a,c,p.map(w));else{const v=o._primHandle(a).attr(c);v.clear(),f?.valueIsBlocked()?o._setAttrDefault(a,c,new pe):(f?.getSource()===Cr.Default||f?.getSource()===Cr.Fallback)&&o._setAttrDefault(a,c,g),b&&v.setSpline(b);for(const[A,T]of P)v.setTimeSample(A,T);v.setConnections(y.map(w))}for(const[v,A]of Object.entries(m))o._setPropertyMetadata(a,c,v,A);return o.get(u)}_clearPropertySpecForFlatten(e,t){if(!this._editTarget)throw new Error("Stage is read-only");const i=`${e}.${t}`,r=this._mapEditSpecPath(i);this._ownAuthoring(()=>this._editTarget._deleteSpec(r)),this.nodes.delete(i)}_getFlattenPropertyMetadata(e,t,i){const r=new Set,n=this._getPrimQuerySource(e);if(n)for(const c of n.index.getNodeRange()){if(c.inert)continue;const l=F(c.path),u=`${l==="/"?"":l}.${t}`;for(const{layer:d}of c.layerStack.layers)for(const h of d.getFieldNames(u))r.add(h)}else for(const c of Object.keys(this.nodes.get(`${e}.${t}`)?.fields??{}))r.add(c);const o=new Set(["default","timeSamples","spline","typeName","connectionPaths","targetPaths"]),a={};for(const c of r){if(o.has(c)||c.startsWith("__"))continue;const l=i.getField(c);l!==void 0&&(a[c]=l)}return a}_getAllAuthoredPropertyMetadata(e,t,i){return this._getFlattenPropertyMetadata(e,t,i)}_getFlattenPrimMetadata(e){const t=new Set;let i="unknown";const r=Fn(e)?void 0:this._getPrimQuerySource(e);if(r)for(const o of r.index.getNodeRange()){if(o.inert)continue;const a=F(o.path);for(const{layer:c}of o.layerStack.layers){i==="unknown"&&(i=c.getSpecType(a));for(const l of c.getFieldNames(a))t.add(l)}}else for(const o of Object.keys(this.nodes.get(e)?.fields??{}))t.add(o);i==="prim"&&t.add("specifier");const n={};for(const o of t){if(o.startsWith("__"))continue;const a=this._resolvePrimMetadata(e,o);a!==void 0&&(n[o]=a)}return n}_getAllAuthoredPrimMetadata(e){return this._getFlattenPrimMetadata(e)}_getAuthoredAppliedSchemas(e){const t=this._getPrimQuerySource(e);return t?eh(t.index,"apiSchemas"):void 0}getSpecializeArcTargets(e){const t=this._pcpCache?.findPrimIndex(e);if(!t)return[];const i=[];for(const r of t.getNodeRange()){if(!gs(r.arcType)||r.parent!==t.rootNode||r.mapToParent.mapSourceToTarget(N.absoluteRootPath).isEmpty())continue;let n=null;const o=new Set;for(let c=r.origin;c&&!o.has(c);c=c.origin===c?null:c.origin)if(o.add(c),c.arcType===x.Reference){n=c;break}const a=(n??t.rootNode).mapToRoot.mapSourceToTarget(r.path);i.push(a.isEmpty()?r.path.pathString:a.pathString)}return i}isStrongestConnectionFromSpecializes(e){const t=e.indexOf(".");if(t<=0)return!1;const i=e.slice(0,t),r=e.slice(t+1),n=this._pcpCache?.findPrimIndex(i);if(!n)return!1;for(const o of n.getNodeRange()){if(o.inert)continue;const a=F(o.path.appendProperty(r));for(const{layer:c}of o.layerStack.layers){const l=c.getField(a,"connectionPaths");if(Array.isArray(l)&&l.length>0)return KS(o)}}return!1}async setSubLayerPaths(e,t){if(!this._rootLayer)throw new Error("Stage has no root layer (in-memory authoring stage)");this._rootLayer.setField("/","subLayers",[...e]),t&&this._rootLayer.setField("/","subLayerOffsets",[...t]),await this.flushChanges()}async insertSubLayer(e,t=0){const i=this.getSubLayerPaths(),r=Math.max(0,Math.min(t,i.length));i.splice(r,0,e),await this.setSubLayerPaths(i)}async removeSubLayer(e){const t=this.getSubLayerPaths();e<0||e>=t.length||(t.splice(e,1),await this.setSubLayerPaths(t))}static createNew(){const e=Y.createAnonymous(),t=new Map;t.set("/",{fields:{}});const i=new ns(t,e);return i._refreshFallbackPrimTypes(i.nodes),i._subscribeRegistryLayers(),i}getEditTarget(){return this._editTargetContext??new Ut}getEditTargetForLocalLayer(e){const t=this._pcpCache?.getLayerStack().layers;if(typeof e=="number"){const r=t?.[e];if(!r)throw new Error(`Local layer index ${e} is out of range`);return new Ut(r.layer,r.offset)}const i=t?.find(r=>r.layer===e);if(i)return new Ut(e,i.offset);if(this.getLayerStack(!0).includes(e))return new Ut(e);throw new Error("Layer is not in the stage local layer stack")}getRootLayer(){if(!this._rootLayer&&this._editTarget)return this._editTarget;if(!this._rootLayer)throw new Error("Stage has no root layer");return this._rootLayer}_sessionLayer=null;getSessionLayer(){if(!this._sessionLayer)throw new Error("Stage has no session layer (in-memory authoring stage)");return this._sessionLayer}hasSessionLayer(){return this._sessionLayer!==null}getUsedLayers(){if(this._usedLayers.size>0)return[...this._usedLayers];const e=[];return this._rootLayer?e.push(this._rootLayer):this._editTarget&&e.push(this._editTarget),this._sessionLayer&&!e.includes(this._sessionLayer)&&e.push(this._sessionLayer),e}getLayerStack(e=!0){const t=[],i=r=>{r&&!t.includes(r)&&t.push(r)};if(!this._rootLayer)return i(this._editTarget),t;if(this._pcpCache){for(const{layer:r}of this._pcpCache.getLayerStack().layers){const n=r;!e&&n===this._sessionLayer||i(n)}return t}return e&&i(this._sessionLayer),i(this._rootLayer),t}setEditTarget(e){const t=e instanceof Ut?e:new Ut(e),i=t.getLayer();if(!i)throw new Error("setEditTarget: invalid edit target");if(t.getMapFunction().isIdentity()&&i!==this._editTarget&&!this.getLayerStack(!0).includes(i))throw new Error("setEditTarget: layer is not in the stage's local layer stack");this._editTarget=i,this._editTargetContext=t}_notifyAuthored(e,t=[]){if(this._composeAndCacheLoadFlags(t.filter(r=>!r.includes("."))),this._pcpCache){for(const r of e)this._pendingChanges.add(r);for(const r of t)this._pendingResyncs.add(r);return}if(this._changeListeners.size===0||e.length===0&&t.length===0)return;const i=this._withNamespaceEditMethods({resyncedPaths:t,changedInfoOnlyPaths:e});for(const r of this._changeListeners)r(i)}_ensureEditSpec(e){if(!this._editTarget)throw new Error("Stage is read-only");const t=this._mapEditSpecPath(e);if(this._editTarget.getField(t,"specifier")!==void 0)return;const i=t.split("/").filter(Boolean),r=i.map((n,o)=>"/"+i.slice(0,o+1).join("/")).filter(n=>this._editTarget.getField(n,"specifier")===void 0);this._ownAuthoring(()=>{for(const n of r)this._editTarget.definePrimSpec(n,void 0,"over")})}_mapEditSpecPath(e){const t=this._editTargetContext?.mapToSpecPath(e)??e;if(!t)throw new Error(`Cannot map <${e}> to the current edit target`);return t}_mapEditTime(e){const t=this._editTargetContext?.getMapFunction().getTimeOffset();if(!t)return e;const i=Yo(t);if(!i)throw new Error("Current edit target has a non-invertible time offset");return qe(i,e)}_mapEditValue(e,t){return t==="timecode"&&typeof e=="number"?this._mapEditTime(e):t==="timecode[]"&&Array.isArray(e)?e.map(i=>typeof i=="number"?this._mapEditTime(i):i):e}_mapEditProperty(e,t){const i=this._mapEditSpecPath(`${e}.${t}`),r=i.lastIndexOf(".");if(r<0)throw new Error(`Edit target did not map a property path for <${e}.${t}>`);return{primPath:i.slice(0,r),propertyName:i.slice(r+1),propertyPath:i}}_reflattenPrim(e,t=!1){if(this._pcpCache){const i=this._pcpCache.findPrimIndex(e);return this._scheduleRecompose(),i?(t||LS(i,this.nodes,e,this._instancing.instanceToProto.get(e)),!0):!1}return!1}_validateAuthoringTarget(e){const t=e.split(".")[0];if(Nr(t))throw new Error(`Cannot author to <${e}>: prototype prims are read-only`);let i=t;for(;i.lastIndexOf("/")>0;)if(i=i.slice(0,i.lastIndexOf("/")),this.nodes.get(i)?.fields.__prototypePath!==void 0)throw new Error(`Cannot author to <${e}>: descendants of instance <${i}> are instance proxies and read-only`)}definePrim(e,t){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);const i=this.nodes.get(e),r=i?.fields.specifier;if(i&&(r==="def"||r==="class")&&(!t||i.fields.typeName===t))return this._primHandle(e);const n=this._mapEditSpecPath(e);if(this._ownAuthoring(()=>this._editTarget.definePrimSpec(n,t)),this._ensureEditSpec(e),!this._reflattenPrim(e)){const o=e.split("/").filter(Boolean);for(let c=0;c<o.length-1;c++){const l="/"+o.slice(0,c+1).join("/");this.nodes.has(l)||this.nodes.set(l,{fields:{specifier:"def"}})}const a=this.nodes.get(e)??{fields:{}};a.fields.specifier="def",t&&(a.fields.typeName=t),this.nodes.set(e,a)}return this._notifyAuthored([],[e]),this._primHandle(e)}has(e){return this.nodes.has(e)}getPrim(e){if(this.nodes.has(e))return new ls(this.nodes,e,void 0,this);const t=this._resolveInstanceProxy(e);if(t!==void 0)return new ls(this.nodes,e,t,this)}_primHandle(e){return new ls(this.nodes,e,void 0,this)}_resolveInstanceProxy(e){let t=e;for(;;){const i=t.lastIndexOf("/");if(i<=0)return;t=t.slice(0,i);const r=this.nodes.get(t);if(!r)continue;const n=r.fields.__prototypePath;if(n===void 0)return;const o=n+e.slice(t.length);return this.nodes.has(o)?o:this._resolveInstanceProxy(o)}}getPrototypes(){const e=[];for(const t of this._instancing.protoToSource.keys())this.nodes.has(t)&&e.push(new ls(this.nodes,t,void 0,this));return e}getInstances(e){const t=[];for(const[i,r]of this.nodes)r.fields.__prototypePath===e&&t.push(i);return t.sort()}get(e){const t=this.nodes.get(e),i=e.indexOf("."),r=i>0?{name:e.slice(i+1),def:()=>this.getPrim(e.slice(0,i))?.getPrimDefinition()}:void 0;if(t)return new ci(this.nodes,e,r,this,i>0?e.slice(0,i):void 0,i>0?e.slice(i+1):void 0);if(i>0&&this.nodes.has(e.slice(0,i))){const n=e.slice(i+1);if(this.getPrim(e.slice(0,i))?.getPrimDefinition()?.getPropertyNames().includes(n))return new ci(this.nodes,e,r,this,e.slice(0,i),n)}}traverse(e=Co){const t=this,i=Hi(e);return function*(){const r=[...t.getAllChildPrimPaths("/")].reverse();for(;r.length>0;){const n=r.pop(),o=t.getPrim(n);if(!o||!i.evaluate(o))continue;yield n;const a=t.getAllChildPrimPaths(n,{instanceProxies:i.includeInstanceProxies});for(let c=a.length-1;c>=0;c--)r.push(a[c])}}()}traverseAll(){const e=this;return function*(){const t=[...e.getAllChildPrimPaths("/")].reverse();for(;t.length>0;){const i=t.pop();yield i;const r=e.getAllChildPrimPaths(i);for(let n=r.length-1;n>=0;n--)t.push(r[n])}}()}getChildPrimPaths(e,t){return this._getChildPrimPaths(e,t,!1)}getAllChildPrimPaths(e,t){return this._getChildPrimPaths(e,t,!0)}_getChildPrimPaths(e,t,i){const r=this.nodes.get(e),n=r===void 0&&t?.instanceProxies?this._resolveInstanceProxy(e):void 0,o=r?.fields.__prototypePath??n;if(o!==void 0||n!==void 0){if(!t?.instanceProxies)return[];const l=o!==void 0&&r!==void 0?o:n;return this._getChildPrimPaths(l,t,i).map(u=>e+u.slice(l.length))}const a=Bo(this.nodes).children.get(e);if(!a)return[];const c=i?[...a]:a.filter(l=>{const u=this.getPrim(l);return u!==void 0&&u.isActive&&u.isDefined&&u.isLoaded&&!u.isAbstract});return e==="/"?c.filter(l=>!Nr(l)):c}flatten(){return Ln("usd-ts:Stage.flatten",e=>(e&&_e(e,"stageNodeCount",this.nodes.size),this._flatten()))}_flatten(){const e=Y.createAnonymous("anon:flattened"),t=this._rootLayer??this._editTarget;if(t)for(const c of["defaultPrim","upAxis","metersPerUnit","startTimeCode","endTimeCode","timeCodesPerSecond","framesPerSecond"]){const l=t.getField("/",c);l!==void 0&&e.setField("/",c,l)}const i=c=>c.replace(/^\/__Prototype_(\d+)/,"/Flattened_Prototype_$1"),r=new Map,n=[];for(const c of this.nodes.keys()){if(c==="/")continue;const l=c.indexOf(".");if(l<0)n.push(c);else{const u=c.slice(0,l);(r.get(u)??r.set(u,[]).get(u)).push(c.slice(l+1))}}const o=new Set(n);n.length=0;const a=c=>{if(o.delete(c)){n.push(c);for(const l of this.getAllChildPrimPaths(c))a(l)}};for(const c of this.getPrototypes())a(c.path);for(const c of this.getAllChildPrimPaths("/"))a(c);for(const c of o)n.push(c);for(const c of n){const l=this.nodes.get(c),u=i(c),d=l.fields.specifier;e.definePrimSpec(u,l.fields.typeName,Fn(c)?"over":d==="class"||d==="over"?d:"def");const h=new Set(["specifier","typeName","primChildren","properties","primOrder","inheritPaths","specializes","references","payload","apiSchemas","variantSetChildren","variantSetNames","variantSelection","relocates","clips","clipSets"]),m=this._getFlattenPrimMetadata(c);for(const[f,g]of Object.entries(m))f.startsWith("__")||h.has(f)||g===void 0||e.setField(u,f,g);const p=l.fields.apiSchemas;p!==void 0&&p.length>0&&e.setField(u,"apiSchemas",{isExplicit:!0,explicitItems:[...p],prependedItems:[],appendedItems:[],deletedItems:[]});const y=l.fields.__prototypePath;if(y!==void 0){const f={assetPath:"",primPath:i(y),layerOffset:{offset:0,scale:1}},g={isExplicit:!1,explicitItems:[],prependedItems:[],deletedItems:[],appendedItems:[f]};Object.defineProperty(g,"_sdfAddedItems",{value:g.appendedItems,configurable:!0,enumerable:!1,writable:!0}),e.setField(u,"references",g)}for(const f of r.get(c)??[]){const g=this.getPrim(c)?.getAttr(f);if(!g)continue;if(g.isRelationship){const P=g.getTargets().map(i);e.setRelTargets(u,f,P)}else{g.typeName&&e.declareProperty(u,f,g.typeName);const P=g.getConnections();P.length>0&&e.setAttrConnections(u,f,P.map(i));const w=g.getTimeSampleKeys();for(const v of w){const A=g.getValueAtTime(v);A!==void 0&&e.setAttrTimeSample(u,f,v,A)}const _=g.getValue();_!==void 0&&e.setAttrDefault(u,f,_)}const S=new Set(["specifier","typeName","default","timeSamples","targetPaths","connectionPaths"]),b=this._getFlattenPropertyMetadata(c,f,g);for(const[P,w]of Object.entries(b))P.startsWith("__")||S.has(P)||w===void 0||e.setField(`${u}.${f}`,P,w)}}return e}exportToUsda(){if(!this._editTarget)throw new Error("Stage has no edit target");return this._editTarget.toUsda()}exportToUsdc(){if(!this._editTarget)throw new Error("Stage has no edit target");return this._editTarget.toUsdc()}async save(){return this.getRootLayer().save()}async reload(){const e=this.getUsedLayers().filter(t=>!t.filePath.startsWith("anon:"));for(const t of e)await t.reload();await this._recomposeForEdit("/")}async export(e){return this.flatten().export(e)}setMetadata(e,t){return this.getRootLayer().setField("/",e,t),!0}getMetadata(e){return this.getRootLayer().getField("/",e)}hasMetadata(e){return this.getRootLayer().getField("/",e)!==void 0}clearMetadata(e){return this.getRootLayer().eraseField("/",e),!0}writeFallbackPrimTypes(){const e=C.getInstance().getFallbackPrimTypes();if(Object.keys(e).length===0)return;const t=this.getMetadata("fallbackPrimTypes"),i=bt(t)?{...e,...t}:{...e};this._suppressLayerNotices+=1;try{this.setMetadata("fallbackPrimTypes",i)}finally{this._suppressLayerNotices-=1}if(this._fallbackPrimTypesJson=JSON.stringify(i),this._changeListeners.size>0){const r=this._withNamespaceEditMethods({resyncedPaths:[],changedInfoOnlyPaths:["/"]});for(const n of this._changeListeners)n(r)}}setDefaultPrim(e){const t=e.path.split("/").filter(Boolean)[0];if(!t||e.path!==`/${t}`)throw new Error(`setDefaultPrim: defaultPrim must be a root-level prim, got <${e.path}>`);this.getRootLayer().setField("/","defaultPrim",t)}getDefaultPrim(){const e=this.getRootLayer().getField("/","defaultPrim");if(!(typeof e!="string"||e.length===0))return this.getPrim(`/${e}`)}hasDefaultPrim(){const e=this.getRootLayer().getField("/","defaultPrim");return typeof e=="string"&&e.length>0}clearDefaultPrim(){this.getRootLayer().eraseField("/","defaultPrim")}_setPropertyMetadata(e,t,i,r){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);const n=`${e}.${t}`,o=this._mapEditSpecPath(n),a=this.get(n)?.typeName,c=a==="rel"?"relationship":"attribute",l=i==="default"?this._mapEditValue(r,a):th(i,c)===void 0?r:gr(r,i,c,u=>this._mapEditTime(u));if(this._ownAuthoring(()=>this._editTarget.setField(o,i,l)),this._ensureEditSpec(e),!this._reflattenPrim(e,!0)){const u=this.nodes.get(n)??{fields:{}};u.fields[i]=r,this.nodes.set(n,u)}this._notifyAuthored([n])}_hasAuthoredPropertyMetadata(e,t,i){if(!this._editTarget)return!1;const r=this._mapEditSpecPath(`${e}.${t}`);return this._editTarget.getField(r,i)!==void 0}_clearPropertyField(e,t,i){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);const r=`${e}.${t}`,n=this._mapEditSpecPath(r);if(this._ownAuthoring(()=>this._editTarget.eraseField(n,i)),this._ensureEditSpec(e),!this._reflattenPrim(e,!0)){const o=this.nodes.get(r);o&&delete o.fields[i]}this._notifyAuthored([r])}_replaceAttrValueOpinions(e,t,i){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);const r=`${e}.${t}`,n=this.get(r)?.typeName,o=this._mapEditProperty(e,t);if(this._ownAuthoring(()=>{this._editTarget.eraseField(o.propertyPath,"default"),this._editTarget.eraseField(o.propertyPath,"timeSamples"),this._editTarget.eraseField(o.propertyPath,"spline"),i!==void 0&&(n&&n!=="rel"&&this._editTarget.getField(o.propertyPath,"typeName")===void 0&&this._editTarget.setField(o.propertyPath,"typeName",n),this._editTarget.setAttrDefault(o.primPath,o.propertyName,this._mapEditValue(i,n)))}),this._ensureEditSpec(e),!this._reflattenPrim(e,!0)){const a=this.nodes.get(r)??{fields:{}};delete a.fields.default,delete a.fields.spline,delete a.timeSamples,n&&(a.fields.typeName=n),i!==void 0&&(a.fields.default=i),this.nodes.set(r,a)}this._notifyAuthored([r])}_setAttrDefault(e,t,i){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);const r=`${e}.${t}`,n=this.get(r)?.typeName,o=this._mapEditProperty(e,t);if(this._ownAuthoring(()=>{n&&n!=="rel"&&this._editTarget.getField(o.propertyPath,"typeName")===void 0&&this._editTarget.setField(o.propertyPath,"typeName",n),this._editTarget.setAttrDefault(o.primPath,o.propertyName,this._mapEditValue(i,n))}),this._ensureEditSpec(e),!this._reflattenPrim(e,!0)){const a=this.nodes.get(r)??{fields:{}};a.fields.default=i,this.nodes.set(r,a)}this._notifyAuthored([r])}_setAttrConnections(e,t,i){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);for(const l of i)this._validateConnectionTarget(l);const r=this._mapEditProperty(e,t),n=i.map(l=>this._mapEditSpecPath(l));this._ownAuthoring(()=>this._editTarget.setAttrConnections(r.primPath,r.propertyName,n));const o=`${e}.${t}`;this._ensureEditSpec(e);const a=this._reflattenPrim(e,!0),c=this.nodes.get(o)??{fields:{}};a||(c.fields.connectionPaths=i),this.nodes.set(o,c),this._notifyAuthored([o])}_editAttrConnectionList(e,t,i){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);const r=this._mapEditProperty(e,t);this._ownAuthoring(()=>{const o=Ft(this._editTarget.getField(r.propertyPath,"connectionPaths"))??{isExplicit:!1,explicitItems:[],deletedItems:[],prependedItems:[],appendedItems:[],orderedItems:[]},a=i(o);a===void 0?this._editTarget.eraseField(r.propertyPath,"connectionPaths"):this._editTarget.setField(r.propertyPath,"connectionPaths",a)}),this._ensureEditSpec(e),this._reflattenPrim(e,!0);const n=`${e}.${t}`;this.nodes.has(n)||this.nodes.set(n,{fields:{}}),this._notifyAuthored([n])}_addAttrConnection(e,t,i,r){this._validateConnectionTarget(i);const n=this._mapEditSpecPath(i);this._editAttrConnectionList(e,t,o=>{const a=[...o.explicitItems],c=[...o.prependedItems],l=[...o.appendedItems],u=o.deletedItems.filter(p=>p!==n),d=p=>{const y=p.indexOf(n);y>=0&&p.splice(y,1)};d(a),d(c),d(l);const h=r==="frontOfPrependList"||r==="frontOfAppendList",m=o.isExplicit?a:r==="frontOfPrependList"||r==="backOfPrependList"?c:l;return h?m.unshift(n):m.push(n),{isExplicit:o.isExplicit,explicitItems:a,deletedItems:u,prependedItems:c,appendedItems:l,orderedItems:[...o.orderedItems]}})}_removeAttrConnection(e,t,i){this._validateConnectionTarget(i);const r=this._mapEditSpecPath(i);this._editAttrConnectionList(e,t,n=>n.isExplicit?{...n,explicitItems:n.explicitItems.filter(o=>o!==r)}:{...n,prependedItems:n.prependedItems.filter(o=>o!==r),appendedItems:n.appendedItems.filter(o=>o!==r),deletedItems:[...n.deletedItems.filter(o=>o!==r),r]})}_clearAttrConnections(e,t){this._editAttrConnectionList(e,t,()=>{})}_validateConnectionTarget(e){if(Nr(e))throw new Error(`Cannot author connection to prototype object <${e}>`)}declareProperty(e,t,i){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);const r=this._mapEditProperty(e,t);this._ownAuthoring(()=>this._editTarget.declareProperty(r.primPath,r.propertyName,i));const n=`${e}.${t}`,o=this.nodes.get(n)??{fields:{}};o.fields.typeName=i,this.nodes.set(n,o)}setPropertyField(e,t,i){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);const r=this._mapEditSpecPath(e);this._ownAuthoring(()=>this._editTarget.setField(r,t,i));const n=this.nodes.get(e)??{fields:{}};n.fields[t]=i,this.nodes.set(e,n)}applyAPI(e,t){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);const i=this._mapEditSpecPath(e);this._ownAuthoring(()=>{const r=this._editTarget.getField(i,"apiSchemas");if(r?.isExplicit){if(r.explicitItems.includes(t))return;this._editTarget.setField(i,"apiSchemas",{...r,explicitItems:[...r.explicitItems,t]});return}const n=r?[...r.prependedItems]:[],o=r?[...r.appendedItems]:[];if(n.includes(t)||o.includes(t))return;const a=r?{...r,prependedItems:[...n,t]}:{isExplicit:!1,explicitItems:[],prependedItems:[t],appendedItems:[],deletedItems:[]};this._editTarget.setField(i,"apiSchemas",a)}),this._ensureEditSpec(e),this._reflattenPrim(e)||this._recomposeAuthoredApiSchemasDirect(e),this._notifyAuthored([],[e])}getAppliedSchemas(e){return this.getPrim(e)?.getAppliedSchemas()??[]}removeAppliedSchema(e,t){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);const i=this._mapEditSpecPath(e);this._ownAuthoring(()=>{const r=this._editTarget.getField(i,"apiSchemas")??{isExplicit:!1,explicitItems:[],prependedItems:[],appendedItems:[],deletedItems:[]},n=r.isExplicit?{...r,explicitItems:r.explicitItems.filter(o=>o!==t)}:{...r,prependedItems:r.prependedItems.filter(o=>o!==t),appendedItems:r.appendedItems.filter(o=>o!==t),deletedItems:r.deletedItems.includes(t)?[...r.deletedItems]:[...r.deletedItems,t]};this._editTarget.setField(i,"apiSchemas",n)}),this._ensureEditSpec(e),this._reflattenPrim(e)||this._recomposeAuthoredApiSchemasDirect(e),this._notifyAuthored([],[e])}_recomposeAuthoredApiSchemasDirect(e){const t=[];for(const n of this.getLayerStack(!0)){const o=Ft(n.getField(e,"apiSchemas"));if(o!==null&&(t.push(o),o.isExplicit))break}const i=Zu(t),r=this.nodes.get(e)??{fields:{}};i.length>0?r.fields.apiSchemas=i:delete r.fields.apiSchemas,this.nodes.set(e,r)}_setPrimTypeName(e,t){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);const i=this._mapEditSpecPath(e);if(this._ownAuthoring(()=>this._editTarget.setField(i,"typeName",t)),this._ensureEditSpec(e),!this._reflattenPrim(e)){const r=this.nodes.get(e)??{fields:{}};t!==""?r.fields.typeName=t:delete r.fields.typeName,this.nodes.set(e,r)}this._notifyAuthored([],[e])}_setPrimMetadata(e,t,i){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);const r=this._mapEditSpecPath(e),n=gr(i,t,"prim",o=>this._mapEditTime(o));if(this._ownAuthoring(()=>this._editTarget.setField(r,t,n)),this._ensureEditSpec(e),!this._reflattenPrim(e)){const o=this.nodes.get(e)??{fields:{}};o.fields[t]=i,this.nodes.set(e,o)}Mo(t)==="infoOnly"?this._notifyAuthored([e]):this._notifyAuthored([],[e])}_clearPrimMetadata(e,t){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);const i=this._mapEditSpecPath(e);if(this._ownAuthoring(()=>this._editTarget.eraseField(i,t)),this._ensureEditSpec(e),!this._reflattenPrim(e)){const r=this.nodes.get(e);r&&delete r.fields[t]}Mo(t)==="infoOnly"?this._notifyAuthored([e]):this._notifyAuthored([],[e])}_setRelTargets(e,t,i){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);const r=this._mapEditProperty(e,t),n=i.map(c=>this._mapEditSpecPath(c));this._ownAuthoring(()=>this._editTarget.setRelTargets(r.primPath,r.propertyName,n));const o=`${e}.${t}`;if(this._ensureEditSpec(e),!this._reflattenPrim(e,!0)||!this.nodes.has(o)){const c=this.nodes.get(o)??{fields:{}};c.fields.typeName="rel",c.fields.targetPaths=i,this.nodes.set(o,c)}this._notifyAuthored([o])}_setAttrTimeSample(e,t,i,r){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);const n=`${e}.${t}`,o=this.get(n)?.typeName,a=this._mapEditProperty(e,t);if(this._ownAuthoring(()=>this._editTarget.setAttrTimeSample(a.primPath,a.propertyName,this._mapEditTime(i),this._mapEditValue(r,o))),this._ensureEditSpec(e),!this._reflattenPrim(e,!0)){const c=this.nodes.get(n)??{fields:{}},l=(c.timeSamples??[]).filter(([u])=>u!==i);l.push([i,r]),l.sort(([u],[d])=>u-d),c.timeSamples=l,this.nodes.set(n,c)}this._notifyAuthored([n])}}class sr{_prim;_stage;_hasPrim;constructor(e,t){this._prim=e,this._stage=t,this._hasPrim=e!==void 0}get path(){return this._hasPrim?this._prim.path:""}get prim(){return this._prim}get stage(){return this._stage}isConcrete(){return this._schemaKind()==="concreteTyped"}isTyped(){const e=this._schemaKind();return e==="abstractTyped"||e==="concreteTyped"}isAppliedAPISchema(){const e=this._schemaKind();return e==="singleApplyAPI"||e==="multipleApplyAPI"}isValid(){return this._hasPrim&&this._stage.has(this._prim.path)}_schemaKind(){const e=this.constructor;return e.typeName?C.findSchemaInfo(e.typeName)?.kind??"invalid":"invalid"}_attr(e,t){if(!this._hasPrim)throw new Error("Cannot access an attribute on an invalid schema");return this._stage.declareProperty(this._prim.path,e,t),this._prim.attr(e)}_rel(e){if(!this._hasPrim)throw new Error("Cannot access a relationship on an invalid schema");return this._prim.rel(e)}}class XS extends sr{static typeName="APISchemaBase";static getSchemaAttributeNames(e=!0){return[]}}const Ss=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];function K(s,e){const t=new Array(16);for(let i=0;i<4;i++)for(let r=0;r<4;r++)t[i*4+r]=s[i*4+0]*e[r]+s[i*4+1]*e[4+r]+s[i*4+2]*e[8+r]+s[i*4+3]*e[12+r];return t}function yr(s,e,t){return[1,0,0,0,0,1,0,0,0,0,1,0,s,e,t,1]}function Ai(s,e,t){return[s,0,0,0,0,e,0,0,0,0,t,0,0,0,0,1]}function Ue(s){const e=s*Math.PI/180,t=Math.cos(e),i=Math.sin(e);return[1,0,0,0,0,t,i,0,0,-i,t,0,0,0,0,1]}function We(s){const e=s*Math.PI/180,t=Math.cos(e),i=Math.sin(e);return[t,0,-i,0,0,1,0,0,i,0,t,0,0,0,0,1]}function ze(s){const e=s*Math.PI/180,t=Math.cos(e),i=Math.sin(e);return[t,i,0,0,-i,t,0,0,0,0,1,0,0,0,0,1]}function Ro(s,e,t,i){const r=e+e,n=t+t,o=i+i,a=e*r,c=e*n,l=e*o,u=t*n,d=t*o,h=i*o,m=s*r,p=s*n,y=s*o;return[1-(u+h),c+y,l-p,0,c-y,1-(a+h),d+m,0,l+p,d-m,1-(a+u),0,0,0,0,1]}const Rn=34028234663852886e22;function ua(s,e=0){const t=s[0],i=s[1],r=s[4],n=s[5],o=s[8],a=s[9],c=s[12],l=s[13];let u=t*n-r*i,d=t*a-o*i,h=t*l-c*i,m=r*a-o*n,p=r*l-c*n,y=o*l-c*a;const f=s[2],g=s[3],S=s[6],b=s[7],P=s[10],w=s[11],_=s[14],v=s[15],A=f*m-S*d+P*u,T=S*h-_*u-f*p,E=f*y-P*h+_*d,k=P*p-_*m-S*y,B=b*d-w*u-g*m,D=g*p-b*h+v*u,L=w*h-v*d-g*y,V=b*y-w*p+v*m;u=f*b-S*g,d=f*w-P*g,h=f*v-_*g,m=S*w-P*b,p=S*v-_*b,y=P*v-_*w;const M=n*d-a*u-i*m,ge=i*p-n*h+l*u,ie=a*h-l*d-i*y,z=n*y-a*p+l*m,H=t*m-r*d+o*u,de=r*h-c*u-t*p,ye=t*y-o*h+c*d,ce=o*p-c*m-r*y,re=c*M+o*ge+r*ie+t*z;if(Math.abs(re)>e){const te=1/re;return[z*te,ie*te,ge*te,M*te,ce*te,ye*te,de*te,H*te,V*te,L*te,D*te,B*te,k*te,E*te,T*te,A*te]}return[Rn,0,0,0,0,Rn,0,0,0,0,Rn,0,0,0,0,1]}function YS(s,e,t,i){return[e*s[0]+t*s[4]+i*s[8]+s[12],e*s[1]+t*s[5]+i*s[9]+s[13],e*s[2]+t*s[6]+i*s[10]+s[14]]}function ZS(s){const e=[];let t=s;for(;t&&(e.push(t),t!=="/");){const i=t.lastIndexOf("/");t=i<=0?"/":t.slice(0,i)}return e}class Ki{constructor(e,t){this._ruleMap=e,this._expressionMatch=t}getAsPathExpansionRuleMap(){return new Map(this._ruleMap)}equals(e){if(!this.usesPathExpansionRuleMap()||!e.usesPathExpansionRuleMap())return!1;const t=e.getAsPathExpansionRuleMap();return this._ruleMap.size===t.size&&[...this._ruleMap].every(([i,r])=>t.get(i)===r)}hash(){return JSON.stringify([...this._ruleMap].sort(([e],[t])=>e.localeCompare(t)))}hasExcludes(){return[...this._ruleMap.values()].includes("exclude")}usesPathExpansionRuleMap(){return this._expressionMatch===void 0}static compute(e,t){const i=`collection:${t}:`,r=e.getAttr(`${i}expansionRule`)?.getValue(),n=r==="explicitOnly"||r==="expandPrimsAndProperties"?r:"expandPrims",o=new Map;for(const a of e.getAttr(`${i}includes`)?.getTargets()??[])o.set(a,n);e.getAttr(`${i}includeRoot`)?.getValue()===!0&&o.set("/",n);for(const a of e.getAttr(`${i}excludes`)?.getTargets()??[])o.set(a,"exclude");return new Ki(o)}isPathIncluded(e){if(!e.startsWith("/"))throw new Error(`IsPathIncluded: path <${e}> is not absolute`);if(this._expressionMatch)return this._expressionMatch(e);for(const t of ZS(e.includes(".")?e.slice(0,e.indexOf(".")):e)){const i=this._ruleMap.get(t);if(i!==void 0){if(i==="exclude")return!1;if(i==="expandPrimsAndProperties")return!0;if(e.includes(".")&&i==="expandPrims")return!1;if(i!=="explicitOnly"||t===e)return!0}}return!1}}const sh=["expansionRule","includeRoot","membershipExpression","mode"],QS=["collection","excludes",...sh,"includes"];class ae extends XS{constructor(e,t,i,r=!1){super(e,t),this._name=i,this._includeRootFallback=r}static typeName="CollectionAPI";getName(){return this._name}_property(e){return e?`collection:${this._name}:${e}`:`collection:${this._name}`}_attrFor(e,t){return this._attr(this._property(e),t)}_createAttr(e,t,i){const r=this._attrFor(e,t);return i!==void 0&&r.set(i),r}static getSchemaAttributeNames(e=!0,t){const i=t??"__INSTANCE_NAME__";return[...sh.map(r=>`collection:${i}:${r}`),`collection:${i}`]}static get(e,t){if("getStage"in e)return new ae(e,e.getStage(),t);const i=".collection:",r=t.lastIndexOf(i),n=r<0?t:t.slice(0,r),o=r<0?"":t.slice(r+i.length);return new ae(e.has(n)?e._primHandle(n):void 0,e,o)}static getAll(e){const t=`${ae.typeName}:`;return e.getAppliedSchemas().filter(i=>i.startsWith(t)).map(i=>new ae(e,e.getStage(),i.slice(t.length)))}static getCollection(e,t){return"getStage"in e,ae.get(e,t)}static getNamedCollectionPath(e,t){return`${e.path}.collection:${t}`}static getAllCollections(e){return ae.getAll(e)}static isSchemaPropertyBaseName(e){return e===""||QS.filter(t=>t!=="collection").includes(e)}static isCollectionAPIPath(e){return e.includes(".collection:")}static canContainPropertyName(e){return e==="collection"||e.startsWith("collection:")}static canApply(e,t){return e.canApplyAPI(ae.typeName,t)}static apply(e,t){return e.applyAPI(ae.typeName,t),new ae(e,e.getStage(),t)}isValid(){return super.isValid()&&this.prim.hasAPI(ae.typeName,this._name)}getCollectionPath(){return ae.getNamedCollectionPath(this.prim,this._name)}getExpansionRuleAttr(){return this._attrFor("expansionRule","uniform token")}createExpansionRuleAttr(e){return this._createAttr("expansionRule","uniform token",e)}getIncludeRootAttr(){return this._attrFor("includeRoot","uniform bool")}createIncludeRootAttr(e){return this._createAttr("includeRoot","uniform bool",e)}getMembershipExpressionAttr(){return this._attrFor("membershipExpression","uniform pathExpression")}createMembershipExpressionAttr(e){return this._createAttr("membershipExpression","uniform pathExpression",e)}getModeAttr(){return this._attrFor("mode","uniform token")}createModeAttr(e){return this._createAttr("mode","uniform token",e)}getCollectionAttr(){return this._attr(this._property(),"uniform opaque")}createCollectionAttr(e){const t=this.getCollectionAttr();return e!==void 0&&t.set(e),t}getIncludesRel(){return this._rel(this._property("includes"))}createIncludesRel(){return this.getIncludesRel()}getExcludesRel(){return this._rel(this._property("excludes"))}createExcludesRel(){return this.getExcludesRel()}_expansionRule(){const e=this.getExpansionRuleAttr().get();return e==="explicitOnly"||e==="expandPrimsAndProperties"?e:"expandPrims"}_includeRoot(){const e=this.getIncludeRootAttr();return e.hasAuthoredValue()?e.get()===!0:this._includeRootFallback}_computeRuleMap(e){const t=`${this.prim.path}:${this._name}`;if(e.has(t))return new Map;e.add(t);const i=new Map,r=this._expansionRule();for(const n of this.getIncludesRel().getTargets())if(ae.isCollectionAPIPath(n)){const o=ae.get(this.stage,n);for(const[a,c]of o._computeRuleMap(e))i.set(a,c)}else i.set(n,r);this._includeRoot()&&i.set("/",r);for(const n of this.getExcludesRel().getTargets())i.set(n,"exclude");return e.delete(t),i}computeMembershipQuery(){if(this.isInExpressionMode()){const e=this._resolveMembershipExpression(new Set);return new Ki(new Map,e?t=>e.Match(N.fromString(t),()=>ue.MakeVarying(!0)).GetValue():()=>!1)}return new Ki(this._computeRuleMap(new Set))}static computeMembershipQuery(e){return e.computeMembershipQuery()}computeIncludedPaths(){return ae.computeIncludedPaths(this.computeMembershipQuery(),this.stage)}computeIncludedObjects(){return this.computeIncludedPaths()}static computeIncludedPaths(e,t){const i=[];for(const r of t.traverse()){e.isPathIncluded(r)&&i.push(r);for(const n of t.getPrim(r)?.attrNames??[]){const o=`${r}.${n}`;e.isPathIncluded(o)&&i.push(o)}}return i}static computeIncludedObjects(e,t){return ae.computeIncludedPaths(e,t)}includePath(e){return this.computeMembershipQuery().isPathIncluded(e)?!0:e==="/"?(this.createIncludeRootAttr(!0),!0):(this.getExcludesRel().setTargets(this.getExcludesRel().getTargets().filter(t=>t!==e)),this.getIncludesRel().addTarget(e),!0)}excludePath(e){return e==="/"?(this.createIncludeRootAttr(!1),!0):(this.getIncludesRel().setTargets(this.getIncludesRel().getTargets().filter(t=>t!==e)),this.getExcludesRel().addTarget(e),!0)}hasNoIncludedPaths(){const e=this.getMembershipExpressionAttr().get();return this.getIncludesRel().getTargets().length===0&&!this._includeRoot()&&(e==null||e==="")}isInRelationshipsMode(){const e=this.getModeAttr().get();return e==="relationship"?!0:e==="expression"?!1:this._includeRoot()||this.getIncludesRel().getTargets().length>0||this.getExcludesRel().getTargets().length>0}isInExpressionMode(){return!this.isInRelationshipsMode()}_resolveMembershipExpression(e){const t=`${this.prim.path}:${this._name}`;if(e.has(t))return W.Nothing();const i=this.getMembershipExpressionAttr().get(),r=i instanceof W?i:typeof i=="string"?new W(i):void 0;if(!r)return;e.add(t);const n=r.resolveReferences(o=>{const a=o.path.isEmpty()?this.prim.path:o.path.pathString;return ae.get(this.stage,`${a}.collection:${o.name}`)._resolveMembershipExpression(e)??W.Nothing()});return e.delete(t),n}resolveCompleteMembershipExpression(){return this._resolveMembershipExpression(new Set)?.getText()}validate(){const e=this.getExpansionRuleAttr().get();return(e===void 0||e==="explicitOnly"||e==="expandPrims"||e==="expandPrimsAndProperties")&&!this._containsCycle(new Set,new Set)}_containsCycle(e,t){const i=`${this.prim.path}:${this._name}`;if(t.has(i))return!0;if(e.has(i))return!1;e.add(i),t.add(i);for(const r of this.getIncludesRel().getTargets())if(ae.isCollectionAPIPath(r)&&ae.get(this.stage,r)._containsCycle(e,t))return!0;return t.delete(i),!1}resetCollection(){return this.getIncludesRel().setTargets([]),this.getExcludesRel().setTargets([]),this.getMembershipExpressionAttr().clear(),!0}blockCollection(){return this.getIncludesRel().setTargets([]),this.getExcludesRel().setTargets([]),this.getMembershipExpressionAttr().set(null),!0}}const JS={Plugins:[{Info:{SdfMetadata:{constraintTargetIdentifier:{appliesTo:["attributes"],default:"",documentation:"Unique identifier within a model's namespace for an matrix-valued attribute representing a constraint target",type:"token"},elementSize:{appliesTo:["attributes"],default:1,displayGroup:"Primvars",documentation:"The number of values in a primvar's value array that must be aggregated for each element on the primitive.",type:"int"},inactiveIds:{appliesTo:["prims"],type:"int64listop"},interpolation:{appliesTo:["attributes"],default:"constant",displayGroup:"Primvars",documentation:"How a primvar interpolates across a primitive; equivalent to RenderMan's 'class specifier'",type:"token"},metersPerUnit:{appliesTo:["layers"],default:.01,displayGroup:"Stage",type:"double"},unauthoredValuesIndex:{appliesTo:["attributes"],default:-1,displayGroup:"Primvars",documentation:"The index that represents unauthored values in the indices array of an indexed primvar.",type:"int"},upAxis:{appliesTo:["layers"],default:"Y",displayGroup:"Stage",type:"token"}},Types:{UsdGeomBackPlateAPI:{alias:{UsdSchemaBase:"BackPlateAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"BackPlateAPI",schemaKind:"multipleApplyAPI"},UsdGeomBasisCurves:{alias:{UsdSchemaBase:"BasisCurves"},autoGenerated:!0,bases:["UsdGeomCurves"],schemaIdentifier:"BasisCurves",schemaKind:"concreteTyped"},UsdGeomBoundable:{alias:{UsdSchemaBase:"Boundable"},autoGenerated:!0,bases:["UsdGeomXformable"],schemaIdentifier:"Boundable",schemaKind:"abstractTyped"},UsdGeomCamera:{alias:{UsdSchemaBase:"Camera"},autoGenerated:!0,bases:["UsdGeomXformable"],schemaIdentifier:"Camera",schemaKind:"concreteTyped"},UsdGeomCapsule:{alias:{UsdSchemaBase:"Capsule"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Capsule",schemaKind:"concreteTyped"},UsdGeomCapsule_1:{alias:{UsdSchemaBase:"Capsule_1"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Capsule_1",schemaKind:"concreteTyped"},UsdGeomCone:{alias:{UsdSchemaBase:"Cone"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Cone",schemaKind:"concreteTyped"},UsdGeomCube:{alias:{UsdSchemaBase:"Cube"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Cube",schemaKind:"concreteTyped"},UsdGeomCurves:{alias:{UsdSchemaBase:"Curves"},autoGenerated:!0,bases:["UsdGeomPointBased"],implementsComputeExtent:!0,schemaIdentifier:"Curves",schemaKind:"abstractTyped"},UsdGeomCylinder:{alias:{UsdSchemaBase:"Cylinder"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Cylinder",schemaKind:"concreteTyped"},UsdGeomCylinder_1:{alias:{UsdSchemaBase:"Cylinder_1"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Cylinder_1",schemaKind:"concreteTyped"},UsdGeomGprim:{alias:{UsdSchemaBase:"Gprim"},autoGenerated:!0,bases:["UsdGeomBoundable"],schemaIdentifier:"Gprim",schemaKind:"abstractTyped"},UsdGeomHermiteCurves:{alias:{UsdSchemaBase:"HermiteCurves"},autoGenerated:!0,bases:["UsdGeomCurves"],schemaIdentifier:"HermiteCurves",schemaKind:"concreteTyped"},UsdGeomImageable:{alias:{UsdSchemaBase:"Imageable"},autoGenerated:!0,bases:["UsdTyped"],schemaIdentifier:"Imageable",schemaKind:"abstractTyped"},UsdGeomMesh:{alias:{UsdSchemaBase:"Mesh"},autoGenerated:!0,bases:["UsdGeomPointBased"],schemaIdentifier:"Mesh",schemaKind:"concreteTyped"},UsdGeomModelAPI:{alias:{UsdSchemaBase:"GeomModelAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"GeomModelAPI",schemaKind:"singleApplyAPI"},UsdGeomMotionAPI:{alias:{UsdSchemaBase:"MotionAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"MotionAPI",schemaKind:"singleApplyAPI"},UsdGeomNurbsCurves:{alias:{UsdSchemaBase:"NurbsCurves"},autoGenerated:!0,bases:["UsdGeomCurves"],schemaIdentifier:"NurbsCurves",schemaKind:"concreteTyped"},UsdGeomNurbsPatch:{alias:{UsdSchemaBase:"NurbsPatch"},autoGenerated:!0,bases:["UsdGeomPointBased"],schemaIdentifier:"NurbsPatch",schemaKind:"concreteTyped"},UsdGeomPlane:{alias:{UsdSchemaBase:"Plane"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Plane",schemaKind:"concreteTyped"},UsdGeomPointBased:{alias:{UsdSchemaBase:"PointBased"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"PointBased",schemaKind:"abstractTyped"},UsdGeomPointInstancer:{alias:{UsdSchemaBase:"PointInstancer"},autoGenerated:!0,bases:["UsdGeomBoundable"],implementsComputeExtent:!0,schemaIdentifier:"PointInstancer",schemaKind:"concreteTyped"},UsdGeomPoints:{alias:{UsdSchemaBase:"Points"},autoGenerated:!0,bases:["UsdGeomPointBased"],implementsComputeExtent:!0,schemaIdentifier:"Points",schemaKind:"concreteTyped"},UsdGeomPrimvarsAPI:{alias:{UsdSchemaBase:"PrimvarsAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"PrimvarsAPI",schemaKind:"nonAppliedAPI"},UsdGeomScope:{alias:{UsdSchemaBase:"Scope"},autoGenerated:!0,bases:["UsdGeomImageable"],schemaIdentifier:"Scope",schemaKind:"concreteTyped"},UsdGeomSphere:{alias:{UsdSchemaBase:"Sphere"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Sphere",schemaKind:"concreteTyped"},UsdGeomSubset:{alias:{UsdSchemaBase:"GeomSubset"},autoGenerated:!0,bases:["UsdTyped"],schemaIdentifier:"GeomSubset",schemaKind:"concreteTyped"},UsdGeomTetMesh:{alias:{UsdSchemaBase:"TetMesh"},autoGenerated:!0,bases:["UsdGeomPointBased"],schemaIdentifier:"TetMesh",schemaKind:"concreteTyped"},UsdGeomVisibilityAPI:{alias:{UsdSchemaBase:"VisibilityAPI"},apiSchemaCanOnlyApplyTo:["Imageable"],autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"VisibilityAPI",schemaKind:"singleApplyAPI"},UsdGeomXform:{alias:{UsdSchemaBase:"Xform"},autoGenerated:!0,bases:["UsdGeomXformable"],schemaIdentifier:"Xform",schemaKind:"concreteTyped"},UsdGeomXformCommonAPI:{alias:{UsdSchemaBase:"XformCommonAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"XformCommonAPI",schemaKind:"nonAppliedAPI"},UsdGeomXformable:{alias:{UsdSchemaBase:"Xformable"},autoGenerated:!0,bases:["UsdGeomImageable"],schemaIdentifier:"Xformable",schemaKind:"abstractTyped"}}},LibraryPath:"@PLUG_INFO_LIBRARY_PATH@",Name:"usdGeom",ResourcePath:"@PLUG_INFO_RESOURCE_PATH@",Root:"@PLUG_INFO_ROOT@",Type:"library"}]},eb=`#usda 1.0
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

`;Ne.GetInstance().RegisterPlugins(JS,{usdGeom:{"generatedSchema.usda":eb}});function R(s,e,t){const i=s.getAttr(e);if(i)return t!==void 0?i.getValueAtTime(t):i.getValue()}function ih(s,e,t){const i=s.getAttr(e);if(!(!i||!i.hasAuthoredValue()))return t!==void 0?i.getValueAtTime(t):i.getValue()}function Ti(s){if(s==null)return null;if(s instanceof Float32Array)return s;if(Array.isArray(s)&&s.length>0){if(Array.isArray(s[0])){const e=[];for(const t of s)for(const i of t)e.push(i);return new Float32Array(e)}return new Float32Array(s.map(Number))}return null}function su(s){return s==null?null:s instanceof Int32Array?s:Array.isArray(s)?new Int32Array(s.map(Number)):null}function tb(s){if(!Array.isArray(s)||s.length<2)return null;const e=Array.isArray(s[0])?s[0]:[Number(s[0]),0,0],t=Array.isArray(s[1])?s[1]:[Number(s[1]),0,0];return[[Math.fround(Number(e[0]??0)),Math.fround(Number(e[1]??0)),Math.fround(Number(e[2]??0))],[Math.fround(Number(t[0]??0)),Math.fround(Number(t[1]??0)),Math.fround(Number(t[2]??0))]]}function ke(s,e){return typeof s=="number"?s:e}function Xi(s,e){return typeof s=="string"?s:e}function sb(s,e){return typeof s=="boolean"?s:e}function ts(s){return Array.isArray(s)&&s.length>=3?[Number(s[0]),Number(s[1]),Number(s[2])]:[0,0,0]}function Vt(s){return typeof s=="number"?s:Array.isArray(s)&&typeof s[0]=="number"?s[0]:0}function rh(s){if(Array.isArray(s)&&s.length>=4){const e=Number(s[0]),t=Number(s[1]),i=Number(s[2]),r=Number(s[3]);return[e,t,i,r]}return[1,0,0,0]}function ib(s){if(Array.isArray(s)&&s.length===4&&Array.isArray(s[0])){const e=[];for(const t of s)for(const i of t)e.push(Number(i));return e}return Array.isArray(s)&&s.length===16?s.map(Number):null}const rb=["default","render","proxy","guide"];function Vn(s){if(s==="/"||!s.startsWith("/"))return null;const e=s.lastIndexOf("/");return e===0?"/":s.slice(0,e)}class Me extends sr{getVisibilityAttr(){return this._attr("visibility","token")}getPurposeAttr(){return this._attr("purpose","uniform token")}makeInvisible(){this.getVisibilityAttr().set("invisible")}makeVisible(){Me.getVisibility(this._prim)==="invisible"&&this.getVisibilityAttr().set("inherited");let e=!1;const t=i=>{const r=Vn(i);if(!r)return;t(r);const n=this._stage.getPrim(r);if(!n?.isA("Imageable"))return;const o=new Me(this._stage._primHandle(r),this._stage);if(Me.getVisibility(n)==="invisible"&&(o.getVisibilityAttr().set("inherited"),e=!0),!!e)for(const a of this._stage.getAllChildPrimPaths(r)){if(a===i)continue;this._stage.getPrim(a)?.isA("Imageable")&&new Me(this._stage._primHandle(a),this._stage).getVisibilityAttr().set("invisible")}};t(this._prim.path)}static getVisibility(e,t){return Xi(R(e,"visibility",t),"inherited")}static getPurpose(e){return Xi(R(e,"purpose"),"default")}static computeVisibility(e,t,i){let r=t;for(;r&&r!=="/";){const n=e.getPrim(r);if(n&&Me.getVisibility(n,i)==="invisible")return"invisible";r=Vn(r)}return"inherited"}static computePurpose(e,t){let i=t;for(;i&&i!=="/";){const r=e.getPrim(i),n=r?ih(r,"purpose"):void 0;if(typeof n=="string"&&rb.includes(n))return n;i=Vn(i)}return"default"}}class nh extends Me{addTranslateOp(e){return this._addOp(e?`xformOp:translate:${e}`:"xformOp:translate","double3")}addTranslateXOp(e){return this._addOp(e?`xformOp:translateX:${e}`:"xformOp:translateX","double")}addTranslateYOp(e){return this._addOp(e?`xformOp:translateY:${e}`:"xformOp:translateY","double")}addTranslateZOp(e){return this._addOp(e?`xformOp:translateZ:${e}`:"xformOp:translateZ","double")}addScaleOp(e){return this._addOp(e?`xformOp:scale:${e}`:"xformOp:scale","float3")}addScaleXOp(e){return this._addOp(e?`xformOp:scaleX:${e}`:"xformOp:scaleX","float")}addScaleYOp(e){return this._addOp(e?`xformOp:scaleY:${e}`:"xformOp:scaleY","float")}addScaleZOp(e){return this._addOp(e?`xformOp:scaleZ:${e}`:"xformOp:scaleZ","float")}addRotateXYZOp(e){return this._addOp(e?`xformOp:rotateXYZ:${e}`:"xformOp:rotateXYZ","float3")}addRotateXZYOp(e){return this._addOp(e?`xformOp:rotateXZY:${e}`:"xformOp:rotateXZY","float3")}addRotateYXZOp(e){return this._addOp(e?`xformOp:rotateYXZ:${e}`:"xformOp:rotateYXZ","float3")}addRotateYZXOp(e){return this._addOp(e?`xformOp:rotateYZX:${e}`:"xformOp:rotateYZX","float3")}addRotateZXYOp(e){return this._addOp(e?`xformOp:rotateZXY:${e}`:"xformOp:rotateZXY","float3")}addRotateZYXOp(e){return this._addOp(e?`xformOp:rotateZYX:${e}`:"xformOp:rotateZYX","float3")}addRotateXOp(e){return this._addOp(e?`xformOp:rotateX:${e}`:"xformOp:rotateX","float")}addRotateYOp(e){return this._addOp(e?`xformOp:rotateY:${e}`:"xformOp:rotateY","float")}addRotateZOp(e){return this._addOp(e?`xformOp:rotateZ:${e}`:"xformOp:rotateZ","float")}addOrientOp(e){return this._addOp(e?`xformOp:orient:${e}`:"xformOp:orient","quatf")}addTransformOp(e){return this._addOp(e?`xformOp:transform:${e}`:"xformOp:transform","matrix4d")}_addOp(e,t){const i=this._attr(e,t);return this._appendXformOp(e),i}_appendXformOp(e){const t=this._stage.getEditTarget().getLayer(),i=`${this._prim.path}.xformOpOrder`;t.setField(i,"typeName","uniform token[]");const r=t.getField(i,"default")??[];r.includes(e)||this._prim.attr("xformOpOrder").set([...r,e])}}function nb(s,e,t){switch(s){case"translate":{const[i,r,n]=ts(e);return yr(t?-i:i,t?-r:r,t?-n:n)}case"translateX":return yr(Vt(e)*(t?-1:1),0,0);case"translateY":return yr(0,Vt(e)*(t?-1:1),0);case"translateZ":return yr(0,0,Vt(e)*(t?-1:1));case"scale":{const[i,r,n]=ts(e);return t?Ai(1/i,1/r,1/n):Ai(i,r,n)}case"scaleX":{const i=Vt(e);return Ai(t?1/i:i,1,1)}case"scaleY":{const i=Vt(e);return Ai(1,t?1/i:i,1)}case"scaleZ":{const i=Vt(e);return Ai(1,1,t?1/i:i)}case"rotateX":return Ue(Vt(e)*(t?-1:1));case"rotateY":return We(Vt(e)*(t?-1:1));case"rotateZ":return ze(Vt(e)*(t?-1:1));case"rotateXYZ":{const[i,r,n]=ts(e);return t?K(ze(-n),K(We(-r),Ue(-i))):K(Ue(i),K(We(r),ze(n)))}case"rotateXZY":{const[i,r,n]=ts(e);return t?K(We(-r),K(ze(-n),Ue(-i))):K(Ue(i),K(ze(n),We(r)))}case"rotateYXZ":{const[i,r,n]=ts(e);return t?K(ze(-n),K(Ue(-i),We(-r))):K(We(r),K(Ue(i),ze(n)))}case"rotateYZX":{const[i,r,n]=ts(e);return t?K(Ue(-i),K(ze(-n),We(-r))):K(We(r),K(ze(n),Ue(i)))}case"rotateZXY":{const[i,r,n]=ts(e);return t?K(We(-r),K(Ue(-i),ze(-n))):K(ze(n),K(Ue(i),We(r)))}case"rotateZYX":{const[i,r,n]=ts(e);return t?K(Ue(-i),K(We(-r),ze(-n))):K(ze(n),K(We(r),Ue(i)))}case"orient":{const[i,r,n,o]=rh(e);return t?Ro(i,-r,-n,-o):Ro(i,r,n,o)}case"transform":{const i=ib(e),r=i||[...Ss];return t?ua(r):r}default:return[...Ss]}}function oh(s,e){const t=R(s,"xformOpOrder",e),i=Array.isArray(t)?t:[];let r=[...Ss],n=!1;for(let o=i.length-1;o>=0;o--){const a=i[o];if(a==="!resetXformStack!"){n=!0;break}const c=a.startsWith("!invert!"),l=c?a.slice(8):a,u=l.split(":")[1]??"",d=R(s,l,e);if(d===void 0)continue;const h=nb(u,d,c);r=K(r,h)}return{matrix:r,resetsXformStack:n}}const ob=new Map;function ab(s,e){const[t,i]=s,n=[[t[0],t[1],t[2]],[t[0],t[1],i[2]],[t[0],i[1],t[2]],[t[0],i[1],i[2]],[i[0],t[1],t[2]],[i[0],t[1],i[2]],[i[0],i[1],t[2]],[i[0],i[1],i[2]]].map(o=>YS(e,o[0],o[1],o[2]));return[[Math.min(...n.map(o=>o[0])),Math.min(...n.map(o=>o[1])),Math.min(...n.map(o=>o[2]))],[Math.max(...n.map(o=>o[0])),Math.max(...n.map(o=>o[1])),Math.max(...n.map(o=>o[2]))]]}function iu(s){return[s[0].map(Math.fround),s[1].map(Math.fround)]}function qs(s,e,t){const i=[s,s,s];return i[t==="X"?0:t==="Y"?1:2]=e,[[-i[0],-i[1],-i[2]],[i[0],i[1],i[2]]]}class Os extends nh{getExtentAttr(){return this._attr("extent","float3[]")}static getExtent(e,t){return tb(ih(e,"extent",t))}static computeExtentFromPlugins(e,t,i){const r=ob.get(e.typeName);if(r){const a=r(e,t,i);return a?iu(a):null}const n=Xi(R(e,"axis"),"Z");let o;switch(e.typeName){case"Sphere":{const a=ke(R(e,"radius",t),1);o=qs(a,a,"Z");break}case"Cube":{const a=ke(R(e,"size",t),2)/2;o=qs(a,a,"Z");break}case"Cone":case"Cylinder":{const a=ke(R(e,"radius",t),1),c=ke(R(e,"height",t),2)/2;o=qs(a,c,n);break}case"Capsule":{const a=ke(R(e,"radius",t),.5),c=ke(R(e,"height",t),1)/2;o=qs(a,c+a,n);break}case"Cylinder_1":{const a=Math.max(ke(R(e,"radiusTop",t),1),ke(R(e,"radiusBottom",t),1)),c=ke(R(e,"height",t),2)/2;o=qs(a,c,n);break}case"Capsule_1":{const a=ke(R(e,"radiusTop",t),.5),c=ke(R(e,"radiusBottom",t),.5),l=ke(R(e,"height",t),1)/2,u=Math.max(a,c);o=qs(u,l+u,n);break}case"BasisCurves":case"HermiteCurves":case"NurbsCurves":{const a=Ti(R(e,"points",t));if(!a)return null;o=Os._pointExtent(a);const c=Ti(R(e,"widths",t));let l=0;if(c)for(const d of c)l=Math.max(l,d);const u=l*.5;o=[[o[0][0]-u,o[0][1]-u,o[0][2]-u],[o[1][0]+u,o[1][1]+u,o[1][2]+u]];break}case"Points":{const a=Ti(R(e,"points",t));if(!a)return null;const c=Ti(R(e,"widths",t));if(!c){o=Os._pointExtent(a);break}if(a.length!==c.length*3)return null;let l=Number.POSITIVE_INFINITY,u=Number.POSITIVE_INFINITY,d=Number.POSITIVE_INFINITY,h=Number.NEGATIVE_INFINITY,m=Number.NEGATIVE_INFINITY,p=Number.NEGATIVE_INFINITY;for(let y=0;y<c.length;y++){const f=c[y]*.5,g=y*3;l=Math.min(l,a[g]-f),u=Math.min(u,a[g+1]-f),d=Math.min(d,a[g+2]-f),h=Math.max(h,a[g]+f),m=Math.max(m,a[g+1]+f),p=Math.max(p,a[g+2]+f)}o=[[l,u,d],[h,m,p]];break}case"Mesh":case"NurbsPatch":case"TetMesh":{const a=Ti(R(e,"points",t));if(!a)return null;o=Os._pointExtent(a);break}default:return null}return iu(i?ab(o,i):o)}static _pointExtent(e){let t=Number.POSITIVE_INFINITY,i=Number.POSITIVE_INFINITY,r=Number.POSITIVE_INFINITY,n=Number.NEGATIVE_INFINITY,o=Number.NEGATIVE_INFINITY,a=Number.NEGATIVE_INFINITY;for(let c=0;c+2<e.length;c+=3)t=Math.min(t,e[c]),i=Math.min(i,e[c+1]),r=Math.min(r,e[c+2]),n=Math.max(n,e[c]),o=Math.max(o,e[c+1]),a=Math.max(a,e[c+2]);return[[t,i,r],[n,o,a]]}static computeExtent(e,t){return Os.getExtent(e,t)??Os.computeExtentFromPlugins(e,t)}}class ee extends sr{static typeName="GeomSubset";static define(e,t){const i=e.definePrim(t,ee.typeName);return new ee(i,e)}static createGeomSubset(e,t,i,r,n,o=""){const a=ee.define(e,`${t}/${i}`);return a.getElementTypeAttr().set(r),a.getIndicesAttr().set(n),o&&a.getFamilyNameAttr().set(o),a}getElementTypeAttr(){return this._attr("elementType","uniform token")}getIndicesAttr(){return this._attr("indices","int[]")}getFamilyNameAttr(){return this._attr("familyName","uniform token")}static familyTypeAttrName(e){return`subsetFamily:${e}:familyType`}static is(e){return e.typeName===ee.typeName}static getElementType(e){return Xi(R(e,"elementType"),"face")}static getIndices(e,t){return su(R(e,"indices",t))??new Int32Array}static getFamilyName(e){return Xi(R(e,"familyName"),"")}static getAllGeomSubsets(e,t,i){const r=[];for(const n of e.getChildPrimPaths(t)){const o=e.getPrim(n);!o||!ee.is(o)||i&&ee.getElementType(o)!==i||r.push(o)}return r}static getGeomSubsets(e,t,i="",r=""){const n=[];for(const o of e.getChildPrimPaths(t)){const a=e.getPrim(o);!a||!ee.is(a)||i&&ee.getElementType(a)!==i||r&&ee.getFamilyName(a)!==r||n.push(a)}return n}static setFamilyType(e,t,i,r){new ee(e.definePrim(t),e)._attr(ee.familyTypeAttrName(i),"uniform token").set(r)}static getFamilyType(e,t,i){const r=e.getPrim(t);if(!r)return"unrestricted";const n=R(r,ee.familyTypeAttrName(i));return typeof n=="string"&&n?n:"unrestricted"}static getElementCount(e,t,i,r){if(i==="face"){const n=e.getPrim(t);if(!n)return 0;const o=su(R(n,"faceVertexCounts",r));return o?o.length:0}return 0}static validateFamily(e,t,i,r){const n=ee.getGeomSubsets(e,t,"",r),o=ee.getFamilyType(e,t,r);for(const c of n){const l=ee.getElementType(c);if(l!==i)return{valid:!1,reason:`GeomSubset at path <${c.path}> has elementType '${l}', which does not match '${i}'.`}}const a=ee.getElementCount(e,t,i);return a===0?{valid:!1,reason:`Unable to determine element count for geom <${t}>.`}:ee.validateSubsets(n,a,o)}static validateSubsets(e,t,i){if(i==="unrestricted")return{valid:!0,reason:""};const r=new Set;for(const n of e)for(const o of ee.getIndices(n)){if(o<0||o>=t)return{valid:!1,reason:`index ${o} is out of range [0, ${t})`};if(r.has(o))return{valid:!1,reason:`index ${o} appears in multiple subsets`};r.add(o)}return i==="partition"&&r.size!==t?{valid:!1,reason:`partition covers ${r.size} of ${t} elements`}:{valid:!0,reason:""}}}function ru(s){if(s==="/"||!s.startsWith("/"))return null;const e=s.lastIndexOf("/");return e===0?"/":s.slice(0,e)}class ah{constructor(e,t){this._stage=e,this._time=t}_cache=new Map;get time(){return this._time}setTime(e){e!==this._time&&(this._time=e,this._cache.clear())}clear(){this._cache.clear()}getLocalTransformation(e){const t=this._stage.getPrim(e);return t?oh(t,this._time):{matrix:[...Ss],resetsXformStack:!1}}getLocalToWorldTransform(e){const t=this._cache.get(e);if(t)return t;const{matrix:i,resetsXformStack:r}=this.getLocalTransformation(e);let n;const o=ru(e);return r||!o||o==="/"?n=i:n=K(i,this.getLocalToWorldTransform(o)),this._cache.set(e,n),n}getParentToWorldTransform(e){const t=ru(e);return!t||t==="/"?[...Ss]:this.getLocalToWorldTransform(t)}}class he extends Os{static typeName="PointInstancer";static define(e,t){const i=e.definePrim(t,he.typeName);return new he(i,e)}static is(e){return e.typeName===he.typeName}getProtoIndicesAttr(){return this._attr("protoIndices","int[]")}getIdsAttr(){return this._attr("ids","int64[]")}getPositionsAttr(){return this._attr("positions","point3f[]")}getOrientationsAttr(){return this._attr("orientations","quath[]")}getOrientationsfAttr(){return this._attr("orientationsf","quatf[]")}getScalesAttr(){return this._attr("scales","float3[]")}getVelocitiesAttr(){return this._attr("velocities","vector3f[]")}getAccelerationsAttr(){return this._attr("accelerations","vector3f[]")}getAngularVelocitiesAttr(){return this._attr("angularVelocities","vector3f[]")}getInvisibleIdsAttr(){return this._attr("invisibleIds","int64[]")}createPrototypesRel(){return this.prim.createRel("prototypes",[])}static getProtoIndices(e,t){const i=R(e,"protoIndices",t);return Array.isArray(i)?i.map(Number):[]}static getPositions(e,t){const i=R(e,"positions",t);return Array.isArray(i)?i:[]}static getOrientations(e,t){const i=R(e,"orientations",t);return Array.isArray(i)?i.map(r=>rh(r)):[]}static getScales(e,t){const i=R(e,"scales",t);return Array.isArray(i)?i:[]}static getVelocities(e,t){const i=R(e,"velocities",t);return Array.isArray(i)?i:[]}static getAccelerations(e,t){const i=R(e,"accelerations",t);return Array.isArray(i)?i:[]}static getInvisibleIds(e,t){const i=R(e,"invisibleIds",t);return Array.isArray(i)?i.map(Number):[]}static getIds(e,t){const i=R(e,"ids",t);return Array.isArray(i)?i.map(Number):[]}static getPrototypes(e){return e.getAttr("prototypes")?.getTargets()??[]}static computeMask(e,t){const i=he.getIds(e,t),r=i.length>0?i.length:he.getProtoIndices(e,t).length,n=new Set(he.getInvisibleIds(e,t)),o=new Array(r);for(let a=0;a<r;a++){const c=i.length>0?i[a]:a;o[a]=!n.has(c)}return o}static computeInstanceTransforms(e,t={}){const{time:i,includeProtoXform:r=!1,stage:n,applyMask:o=!0}=t,a=he.getProtoIndices(e,i),c=he.getPositions(e,i),l=he.getOrientations(e,i),u=he.getScales(e,i),d=o?he.computeMask(e,i):null,h=a.length;if(c.length!==h)return{xforms:[],protoIndices:[]};if(l.length>0&&l.length!==h)return{xforms:[],protoIndices:[]};if(u.length>0&&u.length!==h)return{xforms:[],protoIndices:[]};let m=null;r&&n&&(m=he.getPrototypes(e).map(g=>{const S=n.getPrim(g);return S?oh(S,i).matrix:[...Ss]}));const p=[],y=[];for(let f=0;f<h;f++){if(d&&!d[f])continue;let g=[...Ss];const S=u[f];S&&(g[0]=S[0]??1,g[5]=S[1]??1,g[10]=S[2]??1);const b=l[f];if(b){const _=Ro(b[0],b[1],b[2],b[3]);g=S?K(g,_):_}const P=c[f];g[12]=P[0]??0,g[13]=P[1]??0,g[14]=P[2]??0;const w=a[f];m&&(g=K(m[w]??[...Ss],g)),p.push(g),y.push(w)}return{xforms:p,protoIndices:y}}}const cb="Y",lb=1;function ub(s){const e=s.getMetadata("upAxis");return e==="Y"||e==="Z"?e:cb}function db(s){const e=s.getMetadata("metersPerUnit");return typeof e=="number"?e:lb}const hb={Plugins:[{Info:{SdfMetadata:{bindMaterialAs:{appliesTo:["relationships"],displayGroup:"Shading",documentation:"Metadata authored on collection-based material binding relationship to indicate the strength of the binding relative to bindings authored on descendant prims.",type:"token"},connectability:{appliesTo:["attributes"],default:"full",displayGroup:"Shading",documentation:`Metadata authored on UsdShadeInput's to specify what they can be connected to. Can be either "full" or "interfaceOnly". "full" implies that  the input can be connected to any other input or output.  "interfaceOnly" implies that the input can only connect to a NodeGraph Input (which represents an interface override, not a render-time dataflow connection), or another Input whose connectability is also "interfaceOnly".`,type:"token"},outputName:{appliesTo:["relationships"],displayGroup:"deprecated",type:"token"},renderType:{appliesTo:["properties"],displayGroup:"Rendering",type:"token"},sdrMetadata:{appliesTo:["prims","attributes"],displayGroup:"Shading",type:"dictionary"}},Types:{UsdShadeConnectableAPI:{alias:{UsdSchemaBase:"ConnectableAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ConnectableAPI",schemaKind:"nonAppliedAPI"},UsdShadeCoordSysAPI:{alias:{UsdSchemaBase:"CoordSysAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"CoordSysAPI",schemaKind:"multipleApplyAPI"},UsdShadeMaterial:{alias:{UsdSchemaBase:"Material"},autoGenerated:!0,bases:["UsdShadeNodeGraph"],providesUsdShadeConnectableAPIBehavior:!0,schemaIdentifier:"Material",schemaKind:"concreteTyped"},UsdShadeMaterialBindingAPI:{alias:{UsdSchemaBase:"MaterialBindingAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"MaterialBindingAPI",schemaKind:"singleApplyAPI"},UsdShadeNodeDefAPI:{alias:{UsdSchemaBase:"NodeDefAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"NodeDefAPI",schemaKind:"singleApplyAPI"},UsdShadeNodeGraph:{alias:{UsdSchemaBase:"NodeGraph"},autoGenerated:!0,bases:["UsdTyped"],providesUsdShadeConnectableAPIBehavior:!0,schemaIdentifier:"NodeGraph",schemaKind:"concreteTyped"},UsdShadeShader:{alias:{UsdSchemaBase:"Shader"},autoGenerated:!0,bases:["UsdTyped"],providesUsdShadeConnectableAPIBehavior:!0,schemaIdentifier:"Shader",schemaKind:"concreteTyped"},UsdShadeShaderDefParserPlugin:{bases:["SdrParserPlugin"],displayName:"USD-based shader definition parser plugin"}}},LibraryPath:"@PLUG_INFO_LIBRARY_PATH@",Name:"usdShade",ResourcePath:"@PLUG_INFO_RESOURCE_PATH@",Root:"@PLUG_INFO_ROOT@",Type:"library"}]},pb=`#usda 1.0
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

`;Ne.GetInstance().RegisterPlugins(hb,{usdShade:{"generatedSchema.usda":pb}});const fb={isContainer:!1,requiresEncapsulation:!0,nodeType:"basic",outputsAreConnectable:!1},mb={isContainer:!0,requiresEncapsulation:!0,nodeType:"basic",outputsAreConnectable:!0},gb={isContainer:!0,requiresEncapsulation:!0,nodeType:"derivedContainer",outputsAreConnectable:!0};function Kr(s){switch(s?.typeName){case"Shader":return fb;case"NodeGraph":return mb;case"Material":return gb;default:return null}}function Ls(s){const e=s.lastIndexOf("/");return e<=0?"/":s.slice(0,e)}function Vo(s,e){return Kr(s.getPrim(e))?.isContainer??!1}function Go(s,e){const t=s.get(e)?.getField("connectability");return typeof t=="string"&&t.length>0?t:"full"}function Qt(s){const e=s.lastIndexOf(".");if(e<=0)return null;const t=s.slice(0,e),i=s.slice(e+1);return i.startsWith("outputs:")?{primPath:t,name:i.slice(8),sourceType:"output"}:i.startsWith("inputs:")?{primPath:t,name:i.slice(7),sourceType:"input"}:{primPath:t,name:i,sourceType:"output"}}function Rs(s){const e=s.sourceType==="input"?"inputs:":"outputs:";return`${s.primPath}.${e}${s.name}`}function Xr(s){return Qt(typeof s=="string"?s:s.fullPath)}function nu(s,e,t){return Vo(s,t)?Ls(e)!==t?{canConnect:!1,reason:`Encapsulation check failed - input source prim '${t}' is not the closest ancestor container of '${e}'.`}:{canConnect:!0}:{canConnect:!1,reason:`Encapsulation check failed - prim '${t}' owning the input source is not a container.`}}function yb(s,e,t,i){return i==="derivedContainer"?Vo(s,e)?Ls(t)!==e?{canConnect:!1,reason:`Encapsulation check failed - output source's prim '${t}' is not an immediate descendent of the input's prim '${e}'.`}:{canConnect:!0}:{canConnect:!1,reason:`Encapsulation check failed - prim '${e}' owning the input is not a container.`}:Vo(s,Ls(e))?Ls(e)!==Ls(t)?{canConnect:!1,reason:`Encapsulation check failed - input's prim '${e}' and source's prim '${t}' are not contained by the same container prim.`}:{canConnect:!0}:{canConnect:!1,reason:`Encapsulation check failed - immediate ancestor '${Ls(e)}' of the input's prim is not a container.`}}function ou(s,e,t){const i=Qt(e);if(!i)return{canConnect:!1,reason:`Invalid input: ${e}`};const r=i.primPath,n=Kr(s.getPrim(r));if(!n)return{canConnect:!1,reason:`Prim '${r}' owning the input is not connectable.`};const o=t.primPath,a=s.getPrim(o);if(!a)return{canConnect:!1,reason:`Invalid source: ${Rs(t)}`};if(!Kr(a))return{canConnect:!1,reason:`Prim '${o}' owning the source is not connectable.`};const l=n.requiresEncapsulation,u=Go(s,e);return u==="full"?t.sourceType==="input"?l?nu(s,r,o):{canConnect:!0}:l?yb(s,r,o,n.nodeType):{canConnect:!0}:u==="interfaceOnly"?t.sourceType==="input"?Go(s,Rs(t))==="interfaceOnly"?l?nu(s,r,o):{canConnect:!0}:{canConnect:!1,reason:"Input connectability is 'interfaceOnly' and source does not have 'interfaceOnly' connectability."}:{canConnect:!1,reason:"Input connectability is 'interfaceOnly' but source is not an input."}:{canConnect:!1,reason:"Input connectability is unspecified."}}function au(s,e,t){const i=Qt(e);if(!i)return{canConnect:!1,reason:`Invalid output: ${e}`};const r=i.primPath,n=Kr(s.getPrim(r));if(!n)return{canConnect:!1,reason:`Prim '${r}' owning the output is not connectable.`};if(!n.outputsAreConnectable)return{canConnect:!1,reason:`Outputs of prim '${r}' are not connectable.`};const o=t.primPath;if(!s.getPrim(o))return{canConnect:!1,reason:`Invalid source: ${Rs(t)}`};const a=n.requiresEncapsulation;return t.sourceType==="input"?n.nodeType==="derivedContainer"?{canConnect:!1,reason:`Encapsulation check failed - passthrough usage is not allowed for output prim '${r}'.`}:o!==r?{canConnect:!1,reason:`Encapsulation check failed - output '${e}' and input source '${Rs(t)}' must be encapsulated by the same container prim.`}:{canConnect:!0}:a&&Ls(o)!==r?{canConnect:!1,reason:`Encapsulation check failed - prim owning the output '${e}' is not an immediate descendent of the prim owning the source '${Rs(t)}'.`}:{canConnect:!0}}class cu{constructor(e,t){this._prim=e,this.name=t}get attrName(){return`inputs:${this.name}`}get fullPath(){return`${this._prim.path}.${this.attrName}`}get attr(){return this._prim.attr(this.attrName)}set(e){this.attr.set(e)}get(){return this.attr.get()}setConnectability(e){this._prim.getStage().setPropertyField(this.fullPath,"connectability",e)}getConnectability(){return Go(this._prim.getStage(),this.fullPath)}canConnect(e){const t=Xr(e);return t?ou(this._prim.getStage(),this.fullPath,t):{canConnect:!1,reason:"Invalid source."}}connectToSource(e){const t=Xr(e);return!t||!ou(this._prim.getStage(),this.fullPath,t).canConnect?!1:(this.attr.connect(Rs(t)),!0)}disconnectSource(){this.attr.setConnections([])}getConnectedSource(){const e=this.attr.getConnections();return e.length>0?Qt(e[0]):null}hasConnectedSource(){return this.getConnectedSource()!==null}getValueProducingAttributes(e=!1){return ch(this._prim.getStage(),this.fullPath,e)}}class lu{constructor(e,t){this._prim=e,this.name=t}get attrName(){return`outputs:${this.name}`}get fullPath(){return`${this._prim.path}.${this.attrName}`}get attr(){return this._prim.attr(this.attrName)}canConnect(e){const t=Xr(e);return t?au(this._prim.getStage(),this.fullPath,t):{canConnect:!1,reason:"Invalid source."}}connectToSource(e){const t=Xr(e);return!t||!au(this._prim.getStage(),this.fullPath,t).canConnect?!1:(this.attr.connect(Rs(t)),!0)}getConnectedSource(){const e=this.attr.getConnections();return e.length>0?Qt(e[0]):null}getValueProducingAttributes(e=!1){return ch(this._prim.getStage(),this.fullPath,e)}}class da extends sr{createInput(e,t){return this._attr(`inputs:${e}`,t),new cu(this._prim,e)}createOutput(e,t="token"){return this._attr(`outputs:${e}`,t),new lu(this._prim,e)}getInput(e){return new cu(this._prim,e)}getOutput(e){return new lu(this._prim,e)}}function Uo(s){return s.attrNames.filter(e=>e.startsWith("inputs:")).map(e=>e.slice(7)).sort()}function Sb(s){return s.attrNames.filter(e=>e.startsWith("outputs:")).map(e=>e.slice(8)).sort()}function uu(s,e,t=32){let i=e,r=null;for(let n=0;n<t;n++){const a=s.get(i)?.getConnections()??[];if(a.length===0)return r;const c=Qt(a[0]);if(!c)return r;r=c,i=a[0]}return r}function ch(s,e,t=!1){const i=(r,n)=>{if(n.has(r))return[];const o=s.get(r);if(!o)return[];const a=o.getConnections();if(a.length>0){n.add(r);const u=a.flatMap(d=>i(d,n));return n.delete(r),u}const c=Qt(r);if(!c)return[];if(t&&(c.sourceType!=="output"||s.getPrim(c.primPath)?.typeName!=="Shader"))return[];if(c.sourceType==="input"&&o.getValue()===void 0)return[];const l=r.lastIndexOf(".");return[s._primHandle(r.slice(0,l)).attr(r.slice(l+1))]};return i(e,new Set)}class Je extends da{static typeName="Shader";static define(e,t){const i=e.definePrim(t,Je.typeName);return new Je(i,e)}getIdAttr(){return this._attr("info:id","uniform token")}getImplementationSourceAttr(){return this._attr("info:implementationSource","uniform token")}setShaderId(e){this.getIdAttr().set(e)}getShaderId(){const e=this.getIdAttr().get();return typeof e=="string"?e:void 0}setSourceAsset(e,t="universal"){this._attr(`info:${t}:sourceAsset`,"uniform asset").set(e),this.getImplementationSourceAttr().set("sourceAsset")}getSourceAsset(e="universal"){const t=this._stage.getPrim(this.path);return Je.getSourceAsset(t,e)??(e==="universal"?void 0:Je.getSourceAsset(t,"universal")??void 0)}setSourceCode(e,t="universal"){this._attr(`info:${t}:sourceCode`,"uniform string").set(e),this.getImplementationSourceAttr().set("sourceCode")}getSourceCode(e="universal"){const t=i=>{const r=this._stage.getPrim(this.path)?.getAttr(`info:${i}:sourceCode`)?.getValue();return typeof r=="string"?r:void 0};return t(e)??(e==="universal"?void 0:t("universal"))}setSourceAssetSubIdentifier(e,t="universal"){this._attr(`info:${t}:sourceAsset:subIdentifier`,"uniform token").set(e),this.getImplementationSourceAttr().set("sourceAsset")}getSourceAssetSubIdentifier(e="universal"){const t=i=>{const r=this._stage.getPrim(this.path)?.getAttr(`info:${i}:sourceAsset:subIdentifier`)?.getValue();return typeof r=="string"?r:void 0};return t(e)??(e==="universal"?void 0:t("universal"))}getImplementationSource(){return Je.getImplementationSource(this._stage.getPrim(this.path))}static is(e){return e.typeName===Je.typeName}static getImplementationSource(e){const t=e.getAttr("info:implementationSource")?.getValue();return typeof t=="string"&&t.length>0?t:"id"}static getSourceAsset(e,t){const i=e.getAttr(`info:${t}:sourceAsset`)?.getValue();return typeof i=="string"?i:i&&typeof i=="object"&&typeof i.path=="string"?i.path:null}static getShaderId(e){const t=e.getAttr("info:id")?.getValue();return typeof t=="string"?t:""}static getInputValue(e,t,i){const r=e.getAttr(`inputs:${t}`);if(r)return i!==void 0?r.getValueAtTime(i):r.getValue()}}function bb(s){return s==="Shader"||s==="NodeGraph"||s==="Material"}function du(s){return s==="NodeGraph"||s==="Material"}class Ze extends da{static typeName="NodeGraph";static define(e,t){const i=e.definePrim(t,Ze.typeName);return new Ze(i,e)}static is(e){return e.typeName===Ze.typeName}static _descendants(e,t){const i=[],r=n=>{for(const o of e.getChildPrimPaths(n))i.push(o),r(o)};return r(t),i}static _computeNonTransitive(e,t){const i=new Map,r=e.getPrim(t);if(r)for(const n of Uo(r))i.set(n,[]);for(const n of Ze._descendants(e,t)){const o=e.getPrim(n);if(!(!o||!bb(o.typeName)))for(const a of Uo(o)){const c=e.get(`${n}.inputs:${a}`)?.getConnections()??[];for(const l of c){const u=Qt(l);if(u&&u.sourceType==="input"&&u.primPath===t){const d=i.get(u.name);d&&d.push({primPath:n,name:a})}}}}return i}static _recursiveNodeGraphConsumers(e,t,i){for(const r of t.values())for(const n of r){const o=e.getPrim(n.primPath);if(o&&du(o.typeName)&&!i.has(n.primPath)){const a=Ze._computeNonTransitive(e,n.primPath);i.set(n.primPath,a),Ze._recursiveNodeGraphConsumers(e,a,i)}}}static _resolveConsumers(e,t,i,r){const n=e.getPrim(t.primPath);if(!n||!du(n.typeName)){r.push(t);return}const o=i.get(t.primPath);if(!o){r.push(t);return}const a=o.get(t.name);if(a===void 0){r.push(t);return}if(a.length===0)r.push(t);else for(const c of a)Ze._resolveConsumers(e,c,i,r)}computeInterfaceInputConsumersMap(e=!1){const t=Ze._computeNonTransitive(this._stage,this.path);if(!e)return t;const i=new Map;if(Ze._recursiveNodeGraphConsumers(this._stage,t,i),i.size===0)return t;const r=new Map;for(const[n,o]of t){const a=[];for(const c of o)Ze._resolveConsumers(this._stage,c,i,a);r.set(n,a)}return r}}class Bt extends Ze{static typeName="Material";static define(e,t){const i=e.definePrim(t,Bt.typeName);return new Bt(i,e)}createSurfaceOutput(){return this.createOutput("surface","token")}createDisplacementOutput(){return this.createOutput("displacement","token")}createVolumeOutput(){return this.createOutput("volume","token")}getSurfaceOutput(){return this.getOutput("surface")}static is(e){return e.typeName===Bt.typeName}static computeSurfaceSource(e,t){return uu(e,`${t}.outputs:surface`)}static computeDisplacementSource(e,t){return uu(e,`${t}.outputs:displacement`)}async setBaseMaterialPath(e){const t=this._prim.getSpecializes();if(!e){await t.clearSpecializes();return}await t.setSpecializes([e])}async setBaseMaterial(e){await this.setBaseMaterialPath(e.path)}async clearBaseMaterial(){await this.setBaseMaterialPath("")}getBaseMaterialPath(){const e=this._stage.getSpecializeArcTargets(this.path);for(const t of e){const i=this._stage.getPrim(t);if(i&&Bt.is(i))return t}if(e.length===0)for(const t of this._prim.getSpecializes().getSpecializes()){const i=this._stage.getPrim(t);if(i&&Bt.is(i))return t}return null}getBaseMaterial(){const e=this.getBaseMaterialPath();return e?new Bt(this._stage._primHandle(e),this._stage):null}hasBaseMaterial(){return this.getBaseMaterialPath()!==null}}const Yr="material:binding",zt="",Pb="MaterialBindingAPI",hu="material:binding:collection",Di="materialBind";function pu(s){if(s==="/"||!s.startsWith("/"))return null;const e=s.lastIndexOf("/");return e===0?"/":s.slice(0,e)}function fu(s){return s===zt?Yr:`${Yr}:${s}`}function mu(s){return s===zt?hu:`${hu}:${s}`}function Gn(s){return s.startsWith("/")&&!s.includes(".")}class Nt extends sr{static apply(e){return e.addAppliedSchema(Pb),new Nt(e,e.getStage())}bind(e,t="weakerThanDescendants",i=zt){const r=typeof e=="string"?e:e.path,n=fu(i);this._rel(n).setTargets([r]),t!=="weakerThanDescendants"&&this._stage.setPropertyField(`${this._prim.path}.${n}`,"bindMaterialAs",t)}bindCollection(e,t,i,r="weakerThanDescendants",n=zt){const o=typeof i=="string"?i:i.path,a=`${mu(n)}:${e}`;this._rel(a).setTargets([t,o]),r!=="weakerThanDescendants"&&this._stage.setPropertyField(`${this._prim.path}.${a}`,"bindMaterialAs",r)}unbind(){this._rel(Yr).setTargets([])}createMaterialBindSubset(e,t,i="face"){const r=this._prim.path,n=ee.createGeomSubset(this._stage,r,e,i,t,Di);return ee.getFamilyType(this._stage,r,Di)==="unrestricted"&&this.setMaterialBindSubsetsFamilyType("nonOverlapping"),n}getMaterialBindSubsets(){return ee.getGeomSubsets(this._stage,this._prim.path,"",Di)}getMaterialBindSubsetsFamilyType(){return ee.getFamilyType(this._stage,this._prim.path,Di)}setMaterialBindSubsetsFamilyType(e){return e==="unrestricted"?!1:(ee.setFamilyType(this._stage,this._prim.path,Di,e),!0)}static getDirectBinding(e){const i=e.getAttr(Yr)?.getTargets()??[];return i.length>0?i[0]:null}static getBindingStrength(e,t){return e.get(t)?.getField("bindMaterialAs")==="strongerThanDescendants"?"strongerThanDescendants":"weakerThanDescendants"}static _directBindingForPurpose(e,t){const i=fu(t),r=e.getAttr(i)?.getTargets()??[];return r.length===1&&Gn(r[0])?{relName:i,materialPath:r[0]}:null}static _collectionBindingsForPurpose(e,t){const i=mu(t),r=[];for(const n of e.attrNames){if(n===i||!n.startsWith(`${i}:`)||t===zt&&n.slice(i.length+1).includes(":"))continue;const o=e.getAttr(n)?.getTargets()??[];if(o.length!==2)continue;const a=Gn(o[0]),c=Gn(o[1]);if(a===c)continue;const l=a?o[0]:o[1],u=a?o[1]:o[0];r.push({relName:n,collectionPath:u,materialPath:l})}return r}static computeBoundMaterial(e,t,i=zt){const r=i===zt?[zt]:[i,zt];for(const n of r){const o=Nt._computeForPurpose(e,t,n);if(o)return o}return null}static _computeForPurpose(e,t,i){const r=new Map;let n=null,o=null,a=!1,c=t;for(;c&&c!=="/";){const u=e.getPrim(c);if(!u){c=pu(c);continue}const d=Nt._directBindingForPurpose(u,i);if(d){const m=`${c}.${d.relName}`,p=Nt.getBindingStrength(e,m);(!a||p==="strongerThanDescendants")&&(a=!0,n={materialPath:d.materialPath,bindingRelPath:m},o=c)}const h=Nt._collectionBindingsForPurpose(u,i);for(const m of h){const p=m.collectionPath.indexOf(".");if(p<0)continue;const y=m.collectionPath.slice(0,p),f=m.collectionPath.slice(p+1),g=/^collection:([^:]+)/.exec(f);if(!g)continue;const S=g[1],b=e.getPrim(y);if(!b)continue;let P=r.get(m.collectionPath);if(P||(P=Ki.compute(b,S),r.set(m.collectionPath,P)),P.isPathIncluded(t)){const w=`${c}.${m.relName}`,_=Nt.getBindingStrength(e,w);if(!a||o===c||_==="strongerThanDescendants"){a=!0,n={materialPath:m.materialPath,bindingRelPath:w},o=c;break}}}c=pu(c)}if(!a||!n)return null;const l=e.getPrim(n.materialPath);return!l||!Bt.is(l)?null:n}}const vb={Plugins:[{Info:{Types:{UsdLuxBoundableLightBase:{alias:{UsdSchemaBase:"BoundableLightBase"},autoGenerated:!0,bases:["UsdGeomBoundable"],schemaIdentifier:"BoundableLightBase",schemaKind:"abstractTyped"},UsdLuxCylinderLight:{alias:{UsdSchemaBase:"CylinderLight"},autoGenerated:!0,bases:["UsdLuxBoundableLightBase"],implementsComputeExtent:!0,schemaIdentifier:"CylinderLight",schemaKind:"concreteTyped"},UsdLuxDiskLight:{alias:{UsdSchemaBase:"DiskLight"},autoGenerated:!0,bases:["UsdLuxBoundableLightBase"],implementsComputeExtent:!0,schemaIdentifier:"DiskLight",schemaKind:"concreteTyped"},UsdLuxDistantLight:{alias:{UsdSchemaBase:"DistantLight"},autoGenerated:!0,bases:["UsdLuxNonboundableLightBase"],schemaIdentifier:"DistantLight",schemaKind:"concreteTyped"},UsdLuxDomeLight:{alias:{UsdSchemaBase:"DomeLight"},autoGenerated:!0,bases:["UsdLuxNonboundableLightBase"],schemaIdentifier:"DomeLight",schemaKind:"concreteTyped"},UsdLuxDomeLight_1:{alias:{UsdSchemaBase:"DomeLight_1"},autoGenerated:!0,bases:["UsdLuxNonboundableLightBase"],schemaIdentifier:"DomeLight_1",schemaKind:"concreteTyped"},UsdLuxGeometryLight:{alias:{UsdSchemaBase:"GeometryLight"},autoGenerated:!0,bases:["UsdLuxNonboundableLightBase"],schemaIdentifier:"GeometryLight",schemaKind:"concreteTyped"},UsdLuxLightAPI:{alias:{UsdSchemaBase:"LightAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],providesUsdShadeConnectableAPIBehavior:!0,schemaIdentifier:"LightAPI",schemaKind:"singleApplyAPI"},UsdLuxLightFilter:{alias:{UsdSchemaBase:"LightFilter"},autoGenerated:!0,bases:["UsdGeomXformable"],providesUsdShadeConnectableAPIBehavior:!0,schemaIdentifier:"LightFilter",schemaKind:"concreteTyped"},UsdLuxLightListAPI:{alias:{UsdSchemaBase:"LightListAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"LightListAPI",schemaKind:"singleApplyAPI"},UsdLuxListAPI:{alias:{UsdSchemaBase:"ListAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ListAPI",schemaKind:"singleApplyAPI"},UsdLuxMeshLightAPI:{alias:{UsdSchemaBase:"MeshLightAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"MeshLightAPI",schemaKind:"singleApplyAPI"},UsdLuxNonboundableLightBase:{alias:{UsdSchemaBase:"NonboundableLightBase"},autoGenerated:!0,bases:["UsdGeomXformable"],schemaIdentifier:"NonboundableLightBase",schemaKind:"abstractTyped"},UsdLuxPluginLight:{alias:{UsdSchemaBase:"PluginLight"},autoGenerated:!0,bases:["UsdGeomXformable"],schemaIdentifier:"PluginLight",schemaKind:"concreteTyped"},UsdLuxPluginLightFilter:{alias:{UsdSchemaBase:"PluginLightFilter"},autoGenerated:!0,bases:["UsdLuxLightFilter"],schemaIdentifier:"PluginLightFilter",schemaKind:"concreteTyped"},UsdLuxPortalLight:{alias:{UsdSchemaBase:"PortalLight"},autoGenerated:!0,bases:["UsdLuxBoundableLightBase"],implementsComputeExtent:!0,schemaIdentifier:"PortalLight",schemaKind:"concreteTyped"},UsdLuxRectLight:{alias:{UsdSchemaBase:"RectLight"},autoGenerated:!0,bases:["UsdLuxBoundableLightBase"],implementsComputeExtent:!0,schemaIdentifier:"RectLight",schemaKind:"concreteTyped"},UsdLuxShadowAPI:{alias:{UsdSchemaBase:"ShadowAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ShadowAPI",schemaKind:"singleApplyAPI"},UsdLuxShapingAPI:{alias:{UsdSchemaBase:"ShapingAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ShapingAPI",schemaKind:"singleApplyAPI"},UsdLuxSphereLight:{alias:{UsdSchemaBase:"SphereLight"},autoGenerated:!0,bases:["UsdLuxBoundableLightBase"],implementsComputeExtent:!0,schemaIdentifier:"SphereLight",schemaKind:"concreteTyped"},UsdLuxVolumeLightAPI:{alias:{UsdSchemaBase:"VolumeLightAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"VolumeLightAPI",schemaKind:"singleApplyAPI"},UsdLux_DiscoveryPlugin:{bases:["SdrDiscoveryPlugin"]},UsdLux_LightDefParserPlugin:{bases:["SdrParserPlugin"]}}},LibraryPath:"@PLUG_INFO_LIBRARY_PATH@",Name:"usdLux",ResourcePath:"@PLUG_INFO_RESOURCE_PATH@",Root:"@PLUG_INFO_ROOT@",Type:"library"}]},wb=`#usda 1.0
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

`;Ne.GetInstance().RegisterPlugins(vb,{usdLux:{"generatedSchema.usda":wb}});const xi=[[1,.02749,0],[1,.02749,0],[1,.149664,0],[1,.256644,.008095],[1,.372033,.06745],[1,.476725,.153601],[1,.570376,.259196],[1,.65348,.377155],[1,.726878,.501606],[1,.791543,.62805],[1,.848462,.753228],[1,.898581,.874905],[1,.942771,.991642],[.906947,.890456,1],[.828247,.841838,1],[.765791,.801896,1],[.715255,.768579,1],[.673683,.740423,1],[.638992,.716359,1],[.609681,.695588,1],[.609681,.695588,1],[.609681,.695588,1]],Ae=[[-.5,1.5,-1.5,.5],[1,-2.5,2,-.5],[-.5,0,.5,0],[0,1,0,0]];function _b(s,e,t){return s*.2126+e*.7152+t*.0722}function Ib(s){const e=xi.length,t=Math.min(Math.max((s-1e3)/9e3,0),1),i=e-4,r=t*i,n=Math.min(Math.floor(r),i-1),o=r-n,a=[];for(let l=0;l<3;l++){const u=xi[n][l],d=xi[n+1][l],h=xi[n+2][l],m=xi[n+3][l],p=Ae[0][0]*u+Ae[0][1]*d+Ae[0][2]*h+Ae[0][3]*m,y=Ae[1][0]*u+Ae[1][1]*d+Ae[1][2]*h+Ae[1][3]*m,f=Ae[2][0]*u+Ae[2][1]*d+Ae[2][2]*h+Ae[2][3]*m,g=Ae[3][0]*u+Ae[3][1]*d+Ae[3][2]*h+Ae[3][3]*m;a.push(((p*o+y)*o+f)*o+g)}const c=_b(a[0],a[1],a[2])||1;return[Math.max(a[0]/c,0),Math.max(a[1]/c,0),Math.max(a[2]/c,0)]}function Ab(s,e){return Array.isArray(s)&&s.length>=3?[Number(s[0]),Number(s[1]),Number(s[2])]:e}function _t(s,e){return e!==void 0&&s.set(e),s}class He extends nh{static typeName="LightAPI";static get(e,t){return new He(e.has(t)?e._primHandle(t):void 0,e)}static canApply(e){return e.canApplyAPI(He.typeName)}static apply(e){return e.applyAPI(He.typeName),new He(e,e.getStage())}getIntensityAttr(){return this._attr("inputs:intensity","float")}getExposureAttr(){return this._attr("inputs:exposure","float")}getColorAttr(){return this._attr("inputs:color","color3f")}getEnableColorTemperatureAttr(){return this._attr("inputs:enableColorTemperature","bool")}getColorTemperatureAttr(){return this._attr("inputs:colorTemperature","float")}getNormalizeAttr(){return this._attr("inputs:normalize","bool")}getDiffuseAttr(){return this._attr("inputs:diffuse","float")}getSpecularAttr(){return this._attr("inputs:specular","float")}getFiltersRel(){return this._rel("light:filters")}createFiltersRel(){return this._rel("light:filters")}getShaderIdAttr(){return this._attr("light:shaderId","uniform token")}getMaterialSyncModeAttr(){return this._attr("light:materialSyncMode","uniform token")}createIntensityAttr(e){return _t(this.getIntensityAttr(),e)}createExposureAttr(e){return _t(this.getExposureAttr(),e)}createColorAttr(e){return _t(this.getColorAttr(),e)}createEnableColorTemperatureAttr(e){return _t(this.getEnableColorTemperatureAttr(),e)}createColorTemperatureAttr(e){return _t(this.getColorTemperatureAttr(),e)}createNormalizeAttr(e){return _t(this.getNormalizeAttr(),e)}createDiffuseAttr(e){return _t(this.getDiffuseAttr(),e)}createSpecularAttr(e){return _t(this.getSpecularAttr(),e)}createShaderIdAttr(e){return _t(this.getShaderIdAttr(),e)}createMaterialSyncModeAttr(e){return _t(this.getMaterialSyncModeAttr(),e)}static getSchemaAttributeNames(){return["light:shaderId","light:materialSyncMode","inputs:intensity","inputs:exposure","inputs:diffuse","inputs:specular","inputs:normalize","inputs:color","inputs:enableColorTemperature","inputs:colorTemperature"]}connectableAPI(){return new da(this._prim,this._stage)}createInput(e,t){return this.connectableAPI().createInput(e,t)}getInput(e){return this.connectableAPI().getInput(e)}getInputs(){return Uo(this._stage.getPrim(this.path)).map(e=>this.getInput(e))}createOutput(e,t){return this.connectableAPI().createOutput(e,t)}getOutput(e){return this.connectableAPI().getOutput(e)}getOutputs(){return Sb(this._stage.getPrim(this.path)).map(e=>this.getOutput(e))}getShaderIdAttrForRenderContext(e){return this._attr(e?`${e}:light:shaderId`:"light:shaderId","uniform token")}getShaderId(e=[]){for(const i of e){const r=this.getShaderIdAttrForRenderContext(i).get();if(typeof r=="string"&&r)return r}const t=this.getShaderIdAttr().get();return typeof t=="string"?t:""}getLightLinkCollectionAPI(){return new ae(this._prim,this._stage,"lightLink",!0)}getShadowLinkCollectionAPI(){return new ae(this._prim,this._stage,"shadowLink",!0)}static INTENSITY_FALLBACK={DistantLight:5e4};static getIntensity(e,t){const i=He.INTENSITY_FALLBACK[e.typeName]??1;return ke(R(e,"inputs:intensity",t),i)}static getExposure(e,t){return ke(R(e,"inputs:exposure",t),0)}static getColor(e,t){return Ab(R(e,"inputs:color",t),[1,1,1])}static getEnableColorTemperature(e){return sb(R(e,"inputs:enableColorTemperature"),!1)}static getColorTemperature(e,t){return ke(R(e,"inputs:colorTemperature",t),6500)}static computeBaseEmission(e,t){let i=He.getColor(e,t);if(He.getEnableColorTemperature(e)){const n=Ib(He.getColorTemperature(e,t));i=[i[0]*n[0],i[1]*n[1],i[2]*n[2]]}const r=He.getIntensity(e,t)*Math.pow(2,He.getExposure(e,t));return{color:i,intensity:r}}}function lh(s,e){const t=a=>{const c=s.getAttr(a);return e===void 0?c?.getValue():c?.getValueAtTime(e)},i=t("inputs:width")??1,r=t("inputs:height")??1,n=t("inputs:normalize")??!1;if(typeof i!="number"||typeof r!="number"||!Number.isFinite(i)||!Number.isFinite(r)||i<=0||r<=0||typeof n!="boolean")throw Error("RectLight requires positive finite width/height and boolean normalize");const o=[];for(const a of["inputs:texture:file","inputs:shaping:cone:angle","inputs:shaping:cone:softness","inputs:shaping:focus","inputs:shaping:ies:file","inputs:diffuse","inputs:specular"]){const c=t(a);c!==void 0&&c!==""&&!((a==="inputs:diffuse"||a==="inputs:specular")&&c===1)&&o.push(a)}s.rel("light:filters").getTargets().length&&o.push("light:filters");for(const a of["lightLink","shadowLink"])(t(`collection:${a}:includeRoot`)===!1||s.rel(`collection:${a}:includes`).getTargets().length||s.rel(`collection:${a}:excludes`).getTargets().length)&&o.push(`collection:${a}`);for(const a of["intensity","exposure","color","width","height","normalize"])s.getAttr(`inputs:${a}`)?.getConnections().length&&o.push(`connected inputs:${a}`);return{width:i,height:r,normalize:n,unsupported:o}}function Tb(s,e=16,t=24){const i=[],r=[];for(let c=0;c<=e;c++){const l=c/e*Math.PI,u=Math.sin(l),d=Math.cos(l);for(let h=0;h<=t;h++){const m=h/t*2*Math.PI,p=u*Math.cos(m),y=u*Math.sin(m),f=d;r.push([p,y,f]),i.push([p*s,y*s,f*s])}}const n=[],o=[],a=t+1;for(let c=0;c<e;c++)for(let l=0;l<t;l++){const u=c*a+l,d=u+a;n.push(4),o.push(u,d,d+1,u+1)}return{points:i,normals:r,faceVertexCounts:n,faceVertexIndices:o}}function U(s,e,t){const i=s?.getAttr(e);return t===void 0?i?.getValue():i?.getValueAtTime(t)}function Q(s,e){s.push(e)}function uh(s){if(typeof s=="string")return s;if(s&&typeof s=="object"){const e=s;if(typeof e.path=="string")return e.path;if(typeof e.assetPath=="string")return e.assetPath}}function gu(s,e){return Array.isArray(s)&&s.length>=2&&s.slice(0,2).every(Number.isFinite)?[Number(s[0]),Number(s[1])]:e}const Db=new Set(["black","clamp","repeat","mirror","useMetadata"]);function xb(s,e,t,i,r,n){const o=e.getAttr(`inputs:${t}`)?.getConnections()[0];if(!o)return;const a=o.lastIndexOf("."),c=a>0?o.slice(0,a):o,l=a>0?o.slice(a+1).replace(/^outputs:/,""):"rgb",u=s.getPrim(c);if(!u||Je.getShaderId(u)!=="UsdUVTexture"){Q(r,{severity:"warning",code:"UNSUPPORTED_MATERIAL",path:i,typeName:"Mesh",message:`Surface input ${t} is not connected to UsdUVTexture at ${i}`});return}const d=uh(U(u,"inputs:file",n));if(!d){Q(r,{severity:"error",code:"INVALID_MATERIAL",path:i,typeName:"Mesh",message:`UsdUVTexture has no valid file asset at ${c}`});return}let h="st",m=[1,1],p=[0,0],y=u.getAttr("inputs:st")?.getConnections()[0];for(let b=0;y&&b<4;b++){const P=y.slice(0,y.lastIndexOf(".")),w=s.getPrim(P),_=w?Je.getShaderId(w):"";if(w&&_==="UsdTransform2d"){m=gu(U(w,"inputs:scale",n),m),p=gu(U(w,"inputs:translation",n),p);const v=U(w,"inputs:rotation",n);typeof v=="number"&&v!==0&&Q(r,{severity:"warning",code:"UNSUPPORTED_MATERIAL",path:i,typeName:"Mesh",message:`UsdTransform2d rotation is unsupported at ${P}`}),y=w.getAttr("inputs:in")?.getConnections()[0]}else if(w&&_==="UsdPrimvarReader_float2"){const v=U(w,"inputs:varname",n);typeof v=="string"&&v.length>0&&(h=v);break}else break}const f=b=>{const P=U(u,`inputs:${b}`,n);return typeof P=="string"&&Db.has(P)?P:"useMetadata"},g=U(u,"inputs:sourceColorSpace",n);h!=="st"&&Q(r,{severity:"warning",code:"UNSUPPORTED_MATERIAL",path:i,typeName:"Mesh",message:`Texture uses unsupported UV primvar "${h}" at ${c}`});const S=s.getPropertyStack(`${c}.inputs:file`)[0]?.layerIdentifier??s.rootLayerPath;return{assetPath:d,resolvedPath:ui(S,d),sourceColorSpace:g==="sRGB"||g==="raw"?g:"auto",wrapS:f("wrapS"),wrapT:f("wrapT"),sourceOutput:l,uvPrimvar:h,uvScale:m,uvTranslation:p}}function kb(s,e,t,i){const r=Nt.computeBoundMaterial(s,e);if(!r){(s.getPrim(e)?.getAttr("material:binding")?.getTargets()??[]).length>0&&Q(t,{severity:"warning",code:"UNSUPPORTED_MATERIAL",path:e,typeName:"Mesh",message:`Material binding could not be resolved at ${e}`});return}const n=Bt.computeSurfaceSource(s,r.materialPath);if(!n){Q(t,{severity:"warning",code:"UNSUPPORTED_MATERIAL",path:e,typeName:"Mesh",message:`Bound material has no supported surface output at ${e}`});return}const o=s.getPrim(n.primPath),a=o?Je.getShaderId(o):void 0;if(!o||a!=="UsdPreviewSurface"){Q(t,{severity:"warning",code:"UNSUPPORTED_MATERIAL",path:e,typeName:"Mesh",message:`Unsupported surface shader "${a??"missing"}" at ${n.primPath}`});return}const c=U(o,"inputs:diffuseColor",i),l=U(o,"inputs:roughness",i),u=U(o,"inputs:metallic",i),d=U(o,"inputs:opacity",i),h=U(o,"inputs:emissiveColor",i),m=U(o,"inputs:ior",i),p=h===void 0||Array.isArray(h)&&h.length===3&&h.every(Number.isFinite),y=m===void 0||Number.isFinite(m)&&m>0,f=["diffuseColor","roughness","metallic","opacity","normal"].map(_=>[_,xb(s,o,_,e,t,i)]).filter(_=>_[1]!==void 0),g=Object.fromEntries(f),S=Array.isArray(c)&&c.length>=3&&c.slice(0,3).every(Number.isFinite),b=l===void 0||Number.isFinite(l),P=u===void 0||Number.isFinite(u),w=d===void 0||Number.isFinite(d);return(!S&&c!==void 0||!b||!P||!w||!p||!y)&&Q(t,{severity:"error",code:"INVALID_MATERIAL",path:e,typeName:"Mesh",message:`UsdPreviewSurface has non-finite or malformed inputs at ${n.primPath}`}),{diffuseColor:S?[...c]:[.18,.18,.18],emissiveColor:p&&h?[...h]:[0,0,0],ior:y&&m!==void 0?m:1.5,...b&&l!==void 0?{roughness:l}:{},...P&&u!==void 0?{metallic:u}:{},...w&&d!==void 0?{opacity:d}:{},...f.length>0?{textures:g}:{}}}function Cb(s,e,t,i){const r=U(s.getPrim(e),"primvars:displayColor",i);if(!(!r||r.length===0)){if(!Array.isArray(r[0])||r[0].length<3||!r[0].slice(0,3).every(Number.isFinite)){Q(t,{severity:"error",code:"INVALID_MATERIAL",path:e,typeName:"Mesh",message:`Malformed primvars:displayColor at ${e}`});return}return{diffuseColor:[...r[0]]}}}function ha(s,e,t,i){return kb(s,e,t,i)??Cb(s,e,t,i)}function Bb(s,e){return s.getPrim(e)?.getAttr("doubleSided")?.getValue()}class Nb extends Error{diagnostics;constructor(e){super(`USD bake failed with ${e.length} diagnostic${e.length===1?"":"s"}`),this.name="BakeError",this.diagnostics=e}}const Eb=new Set(["","Xform","Scope","Material","Shader","NodeGraph","GeomSubset"]);function Un(s){return Array.isArray(s)?s.map(e=>Array.isArray(e)?[...e]:[]).filter(e=>e.length>=3):[]}function At(s){return Array.isArray(s)||ArrayBuffer.isView(s)?Array.from(s,Number):[]}function Ob(s,e,t,i,r,n,o){const a=U(s,"primvars:st",o);if(a===void 0)return;const c=Array.isArray(a)?a.filter(Array.isArray).map(f=>[...f]):[],l=new Set(["constant","uniform","varying","vertex","faceVarying"]),u=s.getAttr("primvars:st")?.getField("interpolation"),d=U(s,"primvars:st:interpolation",o),h=typeof u=="string"&&l.has(u)?u:typeof d=="string"&&l.has(d)?d:"vertex",m=At(U(s,"primvars:st:indices",o)),p=h==="constant"?1:h==="uniform"?i:h==="faceVarying"?r:t;if(c.length===0||c.some(f=>f.length<2||!Yi(f.slice(0,2)))||m.length>0&&(m.length!==p||m.some(f=>!Number.isInteger(f)||f<0||f>=c.length))||m.length===0&&c.length!==p){Q(n,{severity:"error",code:"INVALID_UVS",path:e,typeName:"Mesh",message:`primvars:st has invalid values, indices, or interpolation cardinality at ${e}`});return}return{name:"st",values:c,...m.length>0?{indices:m}:{},interpolation:h}}function Yi(s){return s.every(Number.isFinite)}function Ks(s,e,t){return typeof s=="string"&&e.includes(s)?s:t}function Lb(s,e,t,i,r){const n=[],o=new Set;for(const a of ee.getGeomSubsets(s,e,"face","materialBind")){const c=Array.from(ee.getIndices(a,r)),l=c.some(d=>!Number.isInteger(d)||d<0||d>=t||o.has(d)),u=ha(s,a.path,i,r);if(l||!u){Q(i,{severity:"error",code:"INVALID_MATERIAL_SUBSET",path:a.path,typeName:"GeomSubset",message:`Material subset has invalid, overlapping, or unbound faces at ${a.path}`});continue}c.forEach(d=>o.add(d)),n.push({path:a.path,faceIndices:c,material:u})}return n}function yu(s,e){return s===e||s.startsWith(`${e}/`)}function Fb(s,e,t,i="vertex"){const{points:r,faceVertexCounts:n,faceVertexIndices:o,normals:a}=e,c=r.length===0||n.length===0||n.some(d=>!Number.isInteger(d)||d<3)||n.reduce((d,h)=>d+h,0)!==o.length||o.some(d=>!Number.isInteger(d)||d<0||d>=r.length);c&&Q(t,{severity:"error",code:"INVALID_MESH_TOPOLOGY",path:s,typeName:"Mesh",message:`Invalid face topology or point indices at ${s}`});const l=r.some(d=>d.length<3||!Yi(d.slice(0,3)));l&&Q(t,{severity:"error",code:"INVALID_MESH_VALUE",path:s,typeName:"Mesh",message:`Mesh contains malformed or non-finite points at ${s}`});const u=i==="constant"?1:i==="uniform"?n.length:i==="faceVarying"?o.length:r.length;return a&&(a.some(d=>d.length<3||!Yi(d.slice(0,3)))||a.length!==u)&&(Q(t,{severity:"error",code:"INVALID_NORMALS",path:s,typeName:"Mesh",message:`Normals must be finite and have vertex or face-varying cardinality at ${s}`}),delete e.normals),!c&&!l}function Mb(s,e={}){const t=e.root??"/",i=e.time,r=e.unsupported??"diagnostic",n=new ah(s,i),o=[],a=[],c=[],l=[],u=[...s.traverse()].filter(f=>!f.slice(f.lastIndexOf("/")+1).includes(".")).sort();for(const f of u){if(t!=="/"&&!(f===t||f.startsWith(`${t}/`)))continue;const g=s.getPrim(f);if(!g)continue;if(g.typeName==="DistantLight"||g.typeName==="DomeLight"||g.typeName==="RectLight"){const{color:z,intensity:H}=He.computeBaseEmission(g,i),de=[...n.getLocalToWorldTransform(f)];if(![...z,H,...de].every(Number.isFinite))Q(l,{severity:"error",code:"INVALID_LIGHT",path:f,typeName:g.typeName,message:`Light emission or transform contains non-finite values at ${f}`});else{const ye={path:f,color:[...z],intensity:H,worldMatrix:de,visible:Me.computeVisibility(s,f,i)!=="invisible"};if(g.typeName==="RectLight")try{if(H<0||z.some(re=>re<0))throw new Error("RectLight emission must be nonnegative");const ce=lh(g,i);ce.unsupported.length&&Q(l,{severity:"warning",code:"UNSUPPORTED_LIGHT_FEATURE",path:f,typeName:g.typeName,message:`RectLight profile does not evaluate ${ce.unsupported.join(", ")}`}),a.push({...ye,type:"rect",...ce})}catch(ce){Q(l,{severity:"error",code:"INVALID_LIGHT",path:f,typeName:g.typeName,message:String(ce)})}else if(g.typeName==="DistantLight")a.push({...ye,type:"distant"});else{const ce=new Set(["automatic","latlong","mirroredBall","angular","cubeMapVerticalCross"]),re=U(g,"inputs:texture:format",i),te=typeof re=="string"&&ce.has(re)?re:"automatic",lt=uh(U(g,"inputs:texture:file",i));let ut;if(lt){const $t=s.getPropertyStack(`${f}.inputs:texture:file`)[0]?.layerIdentifier??s.rootLayerPath;ut={assetPath:lt,resolvedPath:ui($t,lt)},Q(l,{severity:e.unsupported==="error"?"error":"warning",code:"UNSUPPORTED_DOME_TEXTURE",path:f,typeName:g.typeName,message:`Textured DomeLight IBL is unsupported at ${f}; textureless emission remains available`})}a.push({...ye,type:"dome",textureFormat:te,...ut?{textureAsset:ut}:{}})}}continue}if(g.typeName==="PointInstancer"){const z=he.getPrototypes(g),H=he.getProtoIndices(g,i),de=he.getPositions(g,i);if(z.length===0&&H.length===0&&de.length===0)continue;const ye=he.getOrientations(g,i),ce=he.getScales(g,i),re=["velocities","accelerations","angularVelocities"].some(De=>At(U(g,De,i)).length>0),te=he.computeInstanceTransforms(g,{time:i,applyMask:!0,includeProtoXform:!0,stage:s}),lt=H.find(De=>!Number.isInteger(De)||De<0||De>=z.length),ut=z.length===0?"(no targets)":z.find(De=>!s.getPrim(De)),$t=z.find(De=>s.getPrim(De)!==void 0&&!u.some(dt=>yu(dt,De)&&s.getPrim(dt)?.typeName==="Mesh")),q=de.length!==H.length||ye.length>0&&ye.length!==H.length||ce.length>0&&ce.length!==H.length;if(re&&Q(l,{severity:"warning",code:"POINT_INSTANCER_UNSUPPORTED_MOTION",path:f,typeName:g.typeName,message:`Velocity-based PointInstancer motion is unsupported at ${f}`}),ut!==void 0?Q(l,{severity:"error",code:"POINT_INSTANCER_MISSING_PROTOTYPE",path:f,typeName:g.typeName,message:`PointInstancer has a missing prototype target (${ut})`}):$t!==void 0?Q(l,{severity:"error",code:"POINT_INSTANCER_UNSUPPORTED_PROTOTYPE",path:f,typeName:g.typeName,message:`PointInstancer prototype subtree contains no Mesh (${$t})`}):q?Q(l,{severity:"error",code:"POINT_INSTANCER_INCONSISTENT_ARRAYS",path:f,typeName:g.typeName,message:`PointInstancer arrays have inconsistent lengths at ${f}`}):lt!==void 0&&Q(l,{severity:"error",code:"POINT_INSTANCER_INVALID_INDEX",path:f,typeName:g.typeName,message:`PointInstancer has invalid prototype index (${lt}) at ${f}`}),!(ut!==void 0||$t!==void 0||q||lt!==void 0)){const De=n.getLocalToWorldTransform(f),dt=te.xforms.map(Se=>[...K(Se,De)]);dt.some(Se=>!Yi(Se))?Q(l,{severity:"error",code:"INVALID_TRANSFORM",path:f,typeName:g.typeName,message:`PointInstancer produced a non-finite transform at ${f}`}):c.push({path:f,prototypes:[...z],protoIndices:[...te.protoIndices],instanceWorldMatrices:dt,visible:Me.computeVisibility(s,f,i)!=="invisible"})}continue}let S,b="none",P="rightHanded",w=[],_="edgeAndCorner",v="cornersPlus1",A="catmullClark",T=[],E=[],k=[],B=[],D=[],L;if(g.typeName==="Mesh"){const z=Un(U(g,"primvars:normals",i)),H=z.length>0?z:Un(U(g,"normals",i));S={points:Un(U(g,"points",i)),faceVertexCounts:At(U(g,"faceVertexCounts",i)),faceVertexIndices:At(U(g,"faceVertexIndices",i)),...H.length>0?{normals:H}:{}};const de=Ob(g,f,S.points.length,S.faceVertexCounts.length,S.faceVertexIndices.length,l,i);de&&(S.uvs=de);const ce=g.getAttr(z.length>0?"primvars:normals":"normals")?.getField("interpolation"),re=H.length===S.points.length?"vertex":H.length===S.faceVertexIndices.length?"faceVarying":H.length===S.faceVertexCounts.length?"uniform":H.length===1?"constant":"vertex";L=Ks(ce,["constant","uniform","varying","vertex","faceVarying"],re),b=Ks(U(g,"subdivisionScheme"),["catmullClark","none","loop","bilinear"],"catmullClark"),P=Ks(U(g,"orientation"),["rightHanded","leftHanded"],"rightHanded"),w=At(U(g,"holeIndices",i)),_=Ks(U(g,"interpolateBoundary"),["none","edgeOnly","edgeAndCorner"],"edgeAndCorner"),v=Ks(U(g,"faceVaryingLinearInterpolation"),["none","cornersOnly","cornersPlus1","cornersPlus2","boundaries","all"],"cornersPlus1"),A=Ks(U(g,"triangleSubdivisionRule"),["catmullClark","smooth"],"catmullClark"),T=At(U(g,"creaseIndices",i)),E=At(U(g,"creaseLengths",i)),k=At(U(g,"creaseSharpnesses",i)),B=At(U(g,"cornerIndices",i)),D=At(U(g,"cornerSharpnesses",i));const te=S.faceVertexCounts.length,lt=E.reduce((q,ws)=>q+Math.max(0,ws-1),0),ut=E.some(q=>!Number.isInteger(q)||q<2)||E.reduce((q,ws)=>q+ws,0)!==T.length||T.some(q=>!Number.isInteger(q)||q<0||q>=S.points.length)||![0,E.length,lt].includes(k.length)||k.some(q=>!Number.isFinite(q)||q<0)||B.length!==D.length||B.some(q=>!Number.isInteger(q)||q<0||q>=S.points.length)||D.some(q=>!Number.isFinite(q)||q<0),$t=b==="loop"&&S.faceVertexCounts.some(q=>q!==3);(w.some(q=>!Number.isInteger(q)||q<0||q>=te)||ut||$t)&&(Q(l,{severity:"error",code:"INVALID_MESH_TOPOLOGY",path:f,typeName:"Mesh",message:`Mesh has invalid holes, subdivision tags, or Loop faces at ${f}`}),S=void 0),S&&!Fb(f,S,l,L)&&(S=void 0)}else if(g.typeName==="Sphere"){const z=U(g,"radius",i)??1;!Number.isFinite(z)||z<=0?Q(l,{severity:"error",code:"INVALID_MESH_VALUE",path:f,typeName:g.typeName,message:`Sphere radius must be finite and positive at ${f}`}):S=Tb(z)}if(!S){g.typeName!=="Mesh"&&g.typeName!=="Sphere"&&!Eb.has(g.typeName)&&l.push({severity:e.unsupported==="error"?"error":"warning",code:"UNSUPPORTED_PRIM_TYPE",path:f,typeName:g.typeName,message:`Unsupported USD prim type "${g.typeName}" at ${f}`});continue}const V=[...n.getLocalToWorldTransform(f)];if(!Yi(V)){Q(l,{severity:"error",code:"INVALID_TRANSFORM",path:f,typeName:g.typeName,message:`Prim has a non-finite world transform at ${f}`});continue}const M=ha(s,f,l,i),ge=g.typeName==="Mesh"?Lb(s,f,S.faceVertexCounts.length,l,i):[],ie=Bb(s,f);o.push({path:f,sourceType:g.typeName,...S,...M?{material:M}:{},...ge.length>0?{materialSubsets:ge}:{},...L?{normalsInterpolation:L}:{},subdivisionScheme:b,orientation:P,holeIndices:w,interpolateBoundary:_,faceVaryingLinearInterpolation:v,triangleSubdivisionRule:A,creaseIndices:T,creaseLengths:E,creaseSharpnesses:k,cornerIndices:B,cornerSharpnesses:D,...ie!==void 0?{doubleSided:ie}:{},worldMatrix:V,visible:Me.computeVisibility(s,f,i)!=="invisible"})}const h=[...new Set(c.flatMap(f=>f.prototypes))].sort().map(f=>{const g=ua(n.getLocalToWorldTransform(f));return{path:f,components:o.filter(S=>yu(S.path,f)).map(S=>({meshPath:S.path,prototypeRelativeMatrix:[...K(S.worldMatrix,g)],visible:S.visible}))}}),m=new Set(h.filter(f=>f.components.length===0).map(f=>f.path));for(const f of c)for(const g of f.prototypes)m.has(g)&&Q(l,{severity:"error",code:"POINT_INSTANCER_UNSUPPORTED_PROTOTYPE",path:f.path,typeName:"PointInstancer",message:`PointInstancer prototype has no valid baked meshes (${g})`});const p=c.filter(f=>f.prototypes.every(g=>!m.has(g))),y=h.filter(f=>!m.has(f.path));if(e.unsupported==="error")for(const f of l)f.code.includes("UNSUPPORTED")&&(f.severity="error");if(l.sort((f,g)=>f.path.localeCompare(g.path)||f.code.localeCompare(g.code)||f.message.localeCompare(g.message)),e.unsupported==="error"&&l.some(f=>f.severity==="error"))throw new Nb(l);return{compilation:{root:t,...i!==void 0?{time:i}:{},unsupported:r},stage:{upAxis:ub(s),metersPerUnit:db(s),timeCodesPerSecond:s.timeCodesPerSecond,...s.startTimeCode!==void 0?{startTimeCode:s.startTimeCode}:{},...s.endTimeCode!==void 0?{endTimeCode:s.endTimeCode}:{}},meshes:o,lights:a,prototypes:y,pointInstancers:p,diagnostics:l}}const $b=["inputs:width","inputs:height","inputs:normalize","inputs:intensity","inputs:color","inputs:exposure","inputs:colorTemperature","inputs:enableColorTemperature"],Rb=["protoIndices","ids","positions","orientations","scales","invisibleIds"];function Zs(s,e,t){const i=s.getPrim(e)?.getAttr(t);return!!i&&i.getTimeSampleKeys().length>0}function Vb(s,e){const t=s.getPrim(e)?.getAttr("xformOpOrder")?.getValue();return t?t.some(i=>!i.startsWith("!")&&Zs(s,e,i)):!1}function Gb(s,e,t){const i=s.getPrim(e)?.getAttr("primvars:displayColor")?.getValueAtTime(t);if(!Array.isArray(i)||!Array.isArray(i[0]))return;const r=i[0].slice(0,3);if(!(r.length<3||!r.every(n=>typeof n=="number"&&Number.isFinite(n))))return r}function Ub(s,e,t){const i=s.getPrim(e)?.getAttr("primvars:displayOpacity")?.getValueAtTime(t),r=Array.isArray(i)?i[0]:i;return typeof r=="number"&&Number.isFinite(r)?r:void 0}function Wb(s,e,t,i={}){const r=new Set(i.forceDynamic??[]),n=new Set(i.forceMaterial??[]),o=(A,T)=>A===T||A.startsWith(`${T}/`),a=[],c=[],l=[],u=[];for(const A of t){if(A.slice(A.lastIndexOf("/")+1).includes("."))continue;const T=r.has(A);(T||Vb(s,A))&&a.push(A),(T||Zs(s,A,"visibility"))&&c.push(A),(T||Zs(s,A,"primvars:displayColor"))&&l.push(A),(T||Zs(s,A,"primvars:displayOpacity"))&&u.push(A)}const d=new Set,h=new Set,m=new Set,p=new Set,y=new Set;for(const A of e.meshes)a.some(T=>o(A.path,T))&&d.add(A.path),c.some(T=>o(A.path,T))&&h.add(A.path),l.includes(A.path)&&m.add(A.path),u.includes(A.path)&&p.add(A.path),n.has(A.path)&&y.add(A.path);const f=[...new Set([...d,...h,...m,...p,...y])],g=e.lights.filter(A=>r.has(A.path)||$b.some(T=>Zs(s,A.path,T))||a.some(T=>o(A.path,T))||c.some(T=>o(A.path,T))).map(A=>A.path),S=new Map(e.lights.map(A=>[A.path,A])),b=e.pointInstancers.filter(A=>r.has(A.path)||Rb.some(T=>Zs(s,A.path,T))||a.some(T=>o(A.path,T)||A.prototypes.some(E=>o(E,T)||o(T,E)))||c.some(T=>o(A.path,T)||A.prototypes.some(E=>o(E,T)||o(T,E)))),P=b.map(A=>A.path),w=new Map(b.map(A=>[A.path,A])),_=new Map(e.prototypes.map(A=>[A.path,A])),v=new ah(s);return{meshPaths:f,lightPaths:g,pointInstancerPaths:P,sample(A){v.setTime(A),r.size>0&&v.clear();const T=f.map(D=>{const L=m.has(D)?Gb(s,D,A):void 0,V=p.has(D)?Ub(s,D,A):void 0,M=y.has(D)?ha(s,D,[],A):void 0;return{path:D,...d.has(D)?{worldMatrix:v.getLocalToWorldTransform(D)}:{},...h.has(D)?{visible:Me.computeVisibility(s,D,A)!=="invisible"}:{},...L?{displayColor:L}:{},...V!==void 0?{displayOpacity:V}:{},...M?{material:M}:{}}}),E=g.map(D=>{const{color:L,intensity:V}=He.computeBaseEmission(s.getPrim(D),A);return{path:D,type:S.get(D).type,color:L,intensity:V,...S.get(D).type==="rect"?lh(s.getPrim(D),A):{},worldMatrix:v.getLocalToWorldTransform(D),visible:Me.computeVisibility(s,D,A)!=="invisible"}}),k=[],B=[];for(const D of P){const L=s.getPrim(D),V=w.get(D);if(!L){B.push({path:D,code:"INVALID_POINT_INSTANCER",message:`PointInstancer no longer exists at ${D}`});continue}const M=he.computeInstanceTransforms(L,{time:A,applyMask:!0,includeProtoXform:!0,stage:s});if(M.protoIndices.length!==V.protoIndices.length||M.protoIndices.some((H,de)=>H!==V.protoIndices[de])){B.push({path:D,code:"POINT_INSTANCER_TOPOLOGY_CHANGED",message:`PointInstancer instance count, mask, or prototype assignment changed at ${D}`});continue}const ie=v.getLocalToWorldTransform(D),z=V.prototypes.flatMap((H,de)=>{const ye=_.get(H);if(!ye)return[];const ce=ua(v.getLocalToWorldTransform(H));return ye.components.map(re=>({prototypeIndex:de,meshPath:re.meshPath,prototypeRelativeMatrix:[...K(v.getLocalToWorldTransform(re.meshPath),ce)],visible:Me.computeVisibility(s,re.meshPath,A)!=="invisible"}))});k.push({path:D,protoIndices:[...M.protoIndices],instanceWorldMatrices:M.xforms.map(H=>[...K(H,ie)]),prototypeComponents:z,visible:Me.computeVisibility(s,D,A)!=="invisible"})}return{meshes:T,lights:E,pointInstancers:k,rebakeReasons:B}}}}const zb={Plugins:[{Info:{SdfMetadata:{weight:{appliesTo:["attributes"],default:0,displayGroup:"BlendShape",documentation:"The weight value at which an inbeteen shape is applied.",type:"float"}},Types:{UsdSkelAnimation:{alias:{UsdSchemaBase:"SkelAnimation"},autoGenerated:!0,bases:["UsdTyped"],schemaIdentifier:"SkelAnimation",schemaKind:"concreteTyped"},UsdSkelBindingAPI:{alias:{UsdSchemaBase:"SkelBindingAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"SkelBindingAPI",schemaKind:"singleApplyAPI"},UsdSkelBlendShape:{alias:{UsdSchemaBase:"BlendShape"},autoGenerated:!0,bases:["UsdTyped"],schemaIdentifier:"BlendShape",schemaKind:"concreteTyped"},UsdSkelRoot:{alias:{UsdSchemaBase:"SkelRoot"},autoGenerated:!0,bases:["UsdGeomBoundable"],implementsComputeExtent:!0,schemaIdentifier:"SkelRoot",schemaKind:"concreteTyped"},UsdSkelSkeleton:{alias:{UsdSchemaBase:"Skeleton"},autoGenerated:!0,bases:["UsdGeomBoundable"],implementsComputeExtent:!0,schemaIdentifier:"Skeleton",schemaKind:"concreteTyped"}}},LibraryPath:"@PLUG_INFO_LIBRARY_PATH@",Name:"usdSkel",ResourcePath:"@PLUG_INFO_RESOURCE_PATH@",Root:"@PLUG_INFO_ROOT@",Type:"library"}]},jb=`#usda 1.0
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

`;Ne.GetInstance().RegisterPlugins(zb,{usdSkel:{"generatedSchema.usda":jb}});const Wn=s=>s.split(".")[0];function zn(s){const e=[];for(let t=s;t&&t!=="/";t=t.slice(0,t.lastIndexOf("/")))e.push(t);return e}const Hb=s=>s==="xformOpOrder"||s.startsWith("xformOp:")||s==="visibility"||s==="primvars:displayColor"||s==="primvars:displayOpacity"||["protoIndices","ids","positions","orientations","scales","invisibleIds"].includes(s)||/^inputs:(file|wrapS|wrapT|sourceColorSpace|scale|bias|fallback|translation|rotation|width|height|normalize|intensity|color|exposure|colorTemperature|enableColorTemperature|diffuseColor|roughness|metallic|opacity|emissiveColor|ior)$/.test(s);function qb(s,e){const t=Kb(s,e);let i=t.next();for(;!i.done;)i=t.next();return i.value}function*Kb(s,e){const t=new Map,i=new Map,r=new Set,n=new Map,o=new Set,a=new Set,c=new Set,l=new Set;let u=!1,d=0;const h=()=>JSON.stringify([s.getMetadata("upAxis"),s.getMetadata("metersPerUnit")]),m=h(),p=()=>{if(u)throw new Error("Dynamics index disposed")},y=(_,v)=>Wb(s,_.graph,_.paths,{...v?{forceDynamic:_.paths}:{},forceMaterial:_.graph.meshes.filter(()=>v||[..._.materialPaths].some(A=>{const T=s.getPrim(A);return T?.getPropertyNames().some(E=>T.getAttr(E)?.getTimeSampleKeys().length)})).map(A=>A.path)}),f=_=>{const v=s.getPrim(_);return JSON.stringify([_,v?.typeName,v?.getPropertyNames().flatMap(A=>{const T=v.getAttr(A),E=T?.getConnections()??[],k=T?.getTargets()??[];return E.length||k.length?[[A,E,k]]:[]})])};function g(_){const v=t.get(_);v.binding=y(v,!1);const A=v.binding;A.meshPaths.length||A.lightPaths.length||A.pointInstancerPaths.length?a.add(_):a.delete(_),d++}function S(_,v){const A=new Set(zn(_)),T=new Set;for(const D of v.pointInstancers)for(const L of D.prototypes){for(const V of zn(L))A.add(V);for(const V of e.prototypes.find(M=>M.path===L)?.components??[])for(const M of zn(V.meshPath))A.add(M)}for(const D of v.meshes.flatMap(L=>[{path:L.path,subset:!1},...(L.materialSubsets??[]).map(V=>({path:V.path,subset:!0}))])){D.subset&&r.add(D.path);const L=Nt.computeBoundMaterial(s,D.path),V=L?[L.materialPath]:[];for(;V.length;){const M=V.pop();if(D.subset){r.add(M);const ie=s.getPrim(M);ie?.getPropertyNames().some(z=>ie.getAttr(z)?.getTimeSampleKeys().length)&&l.add(M)}if(T.has(M))continue;T.add(M),A.add(M);const ge=s.getPrim(M);for(const ie of ge?.getPropertyNames()??[])for(const z of ge?.getAttr(ie)?.getConnections()??[])V.push(Wn(z))}}const E=new Set(v.pointInstancers.flatMap(D=>D.prototypes)),B={graph:{...e,...v,prototypes:e.prototypes.filter(D=>E.has(D.path))},paths:[...A],materialPaths:T,binding:void 0,hadMaterial:!!v.meshes[0]?.material,hadOpacity:v.meshes.some(D=>s.getPrim(D.path)?.getAttr("primvars:displayOpacity")?.getValue()!==void 0)};t.set(_,B);for(const D of A)n.has(D)||n.set(D,f(D)),i.has(D)||i.set(D,new Set),i.get(D).add(_);g(_)}for(const _ of e.meshes)S(_.path,{meshes:[_],lights:[],pointInstancers:[]}),yield;for(const _ of e.lights)S(_.path,{meshes:[],lights:[_],pointInstancers:[]}),yield;for(const _ of e.pointInstancers)S(_.path,{meshes:[],lights:[],pointInstancers:[_]}),yield;function b(_){p();for(const v of _.resyncedPaths??[])v.includes(".")?P(v):l.add(v);for(const v of _.changedPaths??[])P(v)}function P(_){if(r.has(Wn(_))){l.add(_);return}const v=_.indexOf(".");if(v>=0&&!Hb(_.slice(v+1))){const T=_.slice(v+1);if(T.includes(":")&&!/^(xformOp|primvars|inputs|outputs|material|collection|skel|coordSys|info):/.test(T))return;l.add(_);return}if(_==="/"){h()!==m&&l.add(_);return}const A=Wn(_);i.has(A)&&o.add(A);for(const T of i.get(A)??[])c.add(T)}const w=s.onObjectsChanged(_=>b({changedPaths:_.changedInfoOnlyPaths,resyncedPaths:[..._.resyncedPaths,..._.resolvedAssetPathsResyncedPaths??[]]}));return{invalidate:b,get meshPaths(){return[...a].filter(_=>t.get(_).graph.meshes.length).sort()},get lightPaths(){return[...a].filter(_=>t.get(_).graph.lights.length).sort()},get pointInstancerPaths(){return[...a].filter(_=>t.get(_).graph.pointInstancers.length).sort()},get stats(){return{entries:t.size,dependencies:i.size,animated:a.size,dirty:c.size,refreshed:d}},sample(_){if(p(),!Number.isFinite(_))throw new Error("Sample time must be finite");const v={meshes:[],lights:[],pointInstancers:[],rebakeReasons:[]};for(const A of o)f(A)!==n.get(A)&&l.add(A);if(l.size)return v.rebakeReasons=[...l].sort().map(A=>({path:A,code:"GRAPH_REBAKE_REQUIRED",message:"Stage structure or unsupported property changed; dispose this index and install a fresh bake and index before rendering."})),v;for(const A of new Set([...a,...c])){const T=t.get(A),E=(c.has(A)?y(T,!0):T.binding).sample(_),k=E.meshes[0];if(c.has(A)&&k){if(T.hadMaterial&&!k.material||T.hadOpacity&&k.displayOpacity===void 0)return l.add(A),{meshes:[],lights:[],pointInstancers:[],rebakeReasons:[{path:A,code:"GRAPH_REBAKE_REQUIRED",message:"A removed material/display value requires a fresh graph to clear adapter state."}]};T.hadMaterial=!!k.material,T.hadOpacity=k.displayOpacity!==void 0}k?.material&&(T.hadMaterial=!0),k?.displayOpacity!==void 0&&(T.hadOpacity=!0),v.meshes.push(...E.meshes),v.lights.push(...E.lights),v.pointInstancers.push(...E.pointInstancers),v.rebakeReasons.push(...E.rebakeReasons),c.has(A)&&g(A)}return c.clear(),o.clear(),v.meshes.sort((A,T)=>A.path.localeCompare(T.path)),v.lights.sort((A,T)=>A.path.localeCompare(T.path)),v.pointInstancers.sort((A,T)=>A.path.localeCompare(T.path)),v},dispose(){u||(u=!0,w(),t.clear(),i.clear(),n.clear(),o.clear(),r.clear(),a.clear(),c.clear(),l.clear())}}}const Xb=96,dh=65,hh="/World/Effects/CameraMotion",Su=["pink","red","orange","yellow","green","teal","blue","purple","black","white"];function bu(s){return performance.now()-s}function ii(s){return`/World/Pieces/Slot_${String(s).padStart(2,"0")}`}function Wo(s){return`/World/Effects/Particles/Particle_${String(s).padStart(2,"0")}`}function ph(s){return`${ii(s)}/PowerGlow`}function fh(s){return[s.x-3,s.y-3,0]}function mh(s){return[s.x-3,s.y-3,.2]}function pa(s){return`/Balls/${Su[Math.min(Math.max(s,0),Su.length-1)]}.png`}function me(s,e){s.block(),s.set(e)}function Pu(s,e){me(s.translate,fh(e.position)),me(s.scale,[e.scale,e.scale,e.scale]),me(s.visibility,e.present?"inherited":"invisible"),me(s.opacity,[e.opacity]),me(s.textureFile,pa(e.color)),me(s.powerGlowVisibility,e.present&&e.hasPowerUp?"inherited":"invisible"),me(s.powerGlowOpacity,[e.present&&e.hasPowerUp?e.opacity:0])}function Yb(s,e,t){const i=e.states[0]?.state;if(!i)return;const r=p=>e.states.slice(1).some(y=>p(y.state,i)),n=r((p,y)=>p.position.x!==y.position.x||p.position.y!==y.position.y),o=r((p,y)=>p.scale!==y.scale),a=r((p,y)=>p.present!==y.present),c=r((p,y)=>p.opacity!==y.opacity),l=r((p,y)=>p.color!==y.color),u=p=>p.present&&p.hasPowerUp,d=p=>u(p)?p.opacity:0,h=r((p,y)=>u(p)!==u(y)),m=r((p,y)=>d(p)!==d(y));for(const p of e.states){const{time:y,state:f}=p;n&&t(s.translate,y,fh(f.position)),o&&t(s.scale,y,[f.scale,f.scale,f.scale]),a&&t(s.visibility,y,f.present?"inherited":"invisible"),c&&t(s.opacity,y,[f.opacity]),l&&t(s.textureFile,y,pa(f.color)),h&&t(s.powerGlowVisibility,y,u(f)?"inherited":"invisible"),m&&t(s.powerGlowOpacity,y,[d(f)])}}function vu(s,e){me(s.translate,mh(e.position)),me(s.scale,[e.scale,e.scale,1]),me(s.visibility,e.present?"inherited":"invisible"),me(s.displayColor,[e.color]),me(s.opacity,[e.opacity])}function Zb(s,e,t,i){i(s.translate,e,mh(t.position)),i(s.scale,e,[t.scale,t.scale,1]),i(s.visibility,e,t.present?"inherited":"invisible"),i(s.displayColor,e,[t.color]),i(s.opacity,e,[t.opacity])}function Qb(s){const e=s.definePrim("/World/Board/Tiles","Mesh"),t=[],i=[],r=[],n=.465;for(let o=0;o<7;o++)for(let a=0;a<7;a++){const c=a-3,l=o-3,u=t.length;t.push([c-n,l-n,-.46],[c+n,l-n,-.46],[c+n,l+n,-.46],[c-n,l+n,-.46]),i.push(4),r.push(u,u+1,u+2,u+3)}e.attr("subdivisionScheme").set("none"),e.attr("points").set(t),e.attr("faceVertexCounts").set(i),e.attr("faceVertexIndices").set(r),e.attr("primvars:displayColor").set([[.075,.078,.09]])}function Jb(){const s=ns.createNew();s.setMetadata("upAxis","Y"),s.setMetadata("metersPerUnit",1),s.setMetadata("timeCodesPerSecond",24),s.setMetadata("startTimeCode",0),s.setMetadata("endTimeCode",1);const e=s.definePrim("/World","Xform");s.setDefaultPrim(e),e.attr("merge:rulesSource").set("merge iOS/MergeGameEngine.swift"),e.attr("merge:runtime").set("usd-runtime-ts persistent value loop"),e.attr("merge:screen").set("play"),s.definePrim("/World/Board","Xform"),Qb(s),s.definePrim("/World/Looks","Scope"),s.definePrim("/World/Pieces","Xform");const t=[],i=24,r=[],n=[];for(let p=0;p<i;p++){const y=p/i*Math.PI*2;r.push([Math.cos(y)*.47,Math.sin(y)*.47,.08]),r.push([Math.cos(y)*.4,Math.sin(y)*.4,.08]);const f=(p+1)%i;n.push(p*2,f*2,f*2+1,p*2+1)}for(let p=0;p<dh;p++){const y=ii(p),f=`Slot_${String(p).padStart(2,"0")}`,g=s.definePrim(y,"Mesh");g.attr("subdivisionScheme").set("none"),g.attr("points").set([[-.47,-.47,0],[.47,-.47,0],[.47,.47,0],[-.47,.47,0]]),g.attr("faceVertexCounts").set([4]),g.attr("faceVertexIndices").set([0,1,2,3]);const S=g.attr("primvars:st");S.set([[0,0],[1,0],[1,1],[0,1]]),S.setMetadata("interpolation","vertex"),g.attr("doubleSided").set(!0),g.attr("merge:renderTreatment").set("unlit-native-sprite");const b=Bt.define(s,`/World/Looks/${f}`),P=Je.define(s,`/World/Looks/${f}/Surface`);P.setShaderId("UsdPreviewSurface"),P.createInput("roughness","float").set(1),P.createInput("metallic","float").set(0);const w=Je.define(s,`/World/Looks/${f}/BallTexture`);w.setShaderId("UsdUVTexture");const _=w.createInput("file","asset");_.set(pa(0)),w.createInput("sourceColorSpace","token").set("sRGB"),w.createInput("wrapS","token").set("clamp"),w.createInput("wrapT","token").set("clamp"),P.createInput("diffuseColor","color3f").connectToSource(w.createOutput("rgb","float3")),P.createInput("opacity","float").connectToSource(w.createOutput("a","float")),b.createSurfaceOutput().connectToSource(P.createOutput("surface")),Nt.apply(g).bind(b);const v=g.attr("xformOp:translate"),A=g.attr("xformOp:scale"),T=g.attr("visibility"),E=g.attr("primvars:displayOpacity"),k=g.attr("merge:pieceID");v.set([-20,-20,0]),A.set([1,1,1]),T.set("invisible"),E.set([0]),k.set("unassigned"),g.attr("xformOpOrder").set(["xformOp:translate","xformOp:scale"]);const B=s.definePrim(ph(p),"Mesh");B.attr("subdivisionScheme").set("none"),B.attr("points").set(r),B.attr("faceVertexCounts").set(Array(i).fill(4)),B.attr("faceVertexIndices").set(n),B.attr("doubleSided").set(!0),B.attr("primvars:displayColor").set([[1,.84,0]]),B.attr("merge:renderTreatment").set("unlit-power-glow");const D=B.attr("visibility"),L=B.attr("primvars:displayOpacity");D.set("invisible"),L.set([0]),t.push({path:y,translate:v,scale:A,visibility:T,opacity:E,textureFile:_.attr,pieceID:k,powerGlowVisibility:D,powerGlowOpacity:L})}s.definePrim("/World/Effects","Xform"),s.definePrim("/World/Effects/Particles","Xform");const o=[],a=12,c=[[0,0,0]];for(let p=0;p<a;p++){const y=p/a*Math.PI*2;c.push([Math.cos(y),Math.sin(y),0])}const l=Array.from({length:a},(p,y)=>[0,y+1,(y+1)%a+1]).flat();for(let p=0;p<Xb;p++){const y=Wo(p),f=s.definePrim(y,"Mesh");f.attr("subdivisionScheme").set("none"),f.attr("points").set(c),f.attr("faceVertexCounts").set(Array(a).fill(3)),f.attr("faceVertexIndices").set(l),f.attr("doubleSided").set(!0),f.attr("merge:renderTreatment").set("unlit-particle");const g=f.attr("xformOp:translate"),S=f.attr("xformOp:scale"),b=f.attr("visibility"),P=f.attr("primvars:displayColor"),w=f.attr("primvars:displayOpacity");g.set([-20,-20,.2]),S.set([.04,.04,1]),b.set("invisible"),P.set([[1,1,1]]),w.set([0]),f.attr("xformOpOrder").set(["xformOp:translate","xformOp:scale"]),o.push({path:y,translate:g,scale:S,visibility:b,displayColor:P,opacity:w})}const u=s.definePrim(hh,"Mesh");u.attr("subdivisionScheme").set("none"),u.attr("points").set([[0,0,0],[.001,0,0],[0,.001,0]]),u.attr("faceVertexCounts").set([3]),u.attr("faceVertexIndices").set([0,1,2]),u.attr("visibility").set("invisible"),u.attr("merge:effect").set("cameraShake");const d={translate:u.attr("xformOp:translate")};d.translate.set([0,0,0]),u.attr("xformOpOrder").set(["xformOp:translate"]);const h=s.definePrim("/World/FillLight","DomeLight");h.attr("inputs:color").set([1,1,1]),h.attr("inputs:intensity").set(1.35);const m=s.definePrim("/World/KeyLight","DistantLight");return m.attr("inputs:color").set([1,.96,.92]),m.attr("inputs:intensity").set(.2),m.attr("xformOp:rotateX").set(-24),m.attr("xformOp:rotateY").set(-18),m.attr("xformOpOrder").set(["xformOp:rotateX","xformOp:rotateY"]),{stage:s,slots:t,particles:o,camera:d}}function eP(){const s=performance.now(),{stage:e,slots:t,particles:i,camera:r}=Jb(),n=bu(s),o=new Map;let a={startTimeCode:0,endTimeCode:1,segments:[],piecePaths:[],particlePaths:[]},c=new Set;const l=new Set,u=(p,y,f)=>{p.setTimeSample(y,f),l.add(p)},d=()=>{const p=e.getRootLayer();for(const y of l)p.eraseField(`${y._getPrimPath()}.${y._getName()}`,"timeSamples");l.clear()},h=p=>{const y=new Set(p.tracks.map(g=>g.id));for(const[g]of o)y.has(g)||o.delete(g);const f=new Set(o.values());for(const g of y){if(o.has(g))continue;const S=t.findIndex((b,P)=>!f.has(P));if(S<0)throw new Error(`USD piece pool exhausted (${dh} slots)`);o.set(g,S),f.add(S)}return new Map([...o].filter(([g])=>y.has(g)))};return{stage:e,createMs:n,author:p=>{const y=performance.now();d();const f=new Set(o.values()),g=h(p),S=new Set(g.values()),b=new Set(p.particles.map(k=>k.slot)),P=new Set(p.tracks.filter(k=>new Set(k.states.map(B=>B.state.color)).size>1).map(k=>g.get(k.id)));for(const k of f){const B=t[k];S.has(k)||(Pu(B,{present:!1,color:0,hasPowerUp:!1,position:{x:-17,y:-17},scale:.04,opacity:0}),me(B.pieceID,"unassigned"))}for(const k of p.tracks){const B=t[g.get(k.id)],D=k.states[0]?.state;D&&(Pu(B,D),me(B.pieceID,k.id),p.segments[0]?.kind!=="ready"&&Yb(B,k,u))}for(const k of c)b.has(k)||vu(i[k],{present:!1,color:[1,1,1],position:{x:-17,y:-17},scale:.04,opacity:0});for(const k of p.particles){const B=i[k.slot],D=k.states[0]?.state;if(!(!B||!D)){vu(B,D);for(const L of k.states)Zb(B,L.time,L.state,u)}}if(me(r.translate,[0,0,0]),p.camera.some(k=>k.offset[0]!==0||k.offset[1]!==0))for(const k of p.camera)u(r.translate,k.time,[k.offset[0],k.offset[1],0]);e.setMetadata("startTimeCode",p.startTimeCode),e.setMetadata("endTimeCode",p.endTimeCode);const w=e.getPrim("/World");me(w.attr("merge:score"),p.final.score),me(w.attr("merge:level"),p.final.currentLevel),me(w.attr("merge:timeline"),p.segments.map(k=>`${k.kind}:${k.start}-${k.end}`).join(", "));const _=[...new Set([...f,...S])].map(ii),v=[...new Set([...f,...S])].map(ph),A=[...new Set([...c,...b])].map(Wo),T=[..._,...v,...A,hh],E=[...S].map(ii);return c=b,a={startTimeCode:p.startTimeCode,endTimeCode:p.endTimeCode,segments:p.segments,piecePaths:[...g.values()].map(ii),particlePaths:[...b].map(Wo)},{authored:a,changedPaths:T,activePaths:E,materialPaths:[...P].map(ii),authorMs:bu(y)}},get authored(){return a},setScreen(p){me(e.getPrim("/World").attr("merge:screen"),p)},inspect(){return{source:e.exportToUsda(),prims:[...e.traverse()].filter(p=>!p.slice(p.lastIndexOf("/")+1).includes(".")).map(p=>({path:p,typeName:e.getPrim(p)?.typeName??""}))}}}}function tP(){let s,e,t=0,i=0,r=Promise.resolve(),n={createMs:0,bakeMs:0,indexMs:0,lastAuthorMs:0};async function o(a){const c=performance.now(),l={id:a.id,generation:a.generation,revision:i,workerMs:0};try{if(a.type==="prepare"){if(s)throw new Error("Worker already prepared");t=a.generation,s=eP();const u=s.author(a.timeline);await s.stage.flushChanges();const d=performance.now(),h=Mb(s.stage,{root:"/World",time:a.time}),m=performance.now()-d,p=performance.now();e=qb(s.stage,h),n={createMs:s.createMs,bakeMs:m,indexMs:performance.now()-p,lastAuthorMs:u.authorMs},e.invalidate({changedPaths:h.meshes.map(y=>y.path)}),l.graph=h,i=a.revision}else{if(!s||!e||t!==a.generation)throw new Error("Inactive Merge generation");if(a.type==="author"||a.type==="screen"){if(a.revision!==i+1)throw new Error("Out-of-order Merge author revision");if(a.type==="author"){const u=performance.now(),d=s.author(a.timeline);await s.stage.flushChanges(),e.invalidate({changedPaths:d.changedPaths}),n.lastAuthorMs=performance.now()-u}else s.setScreen(a.screen),await s.stage.flushChanges();i=a.revision}else if(a.revision!==i)throw new Error("Stale Merge read revision")}if(!s||!e)throw new Error("Merge not prepared");if("time"in a){if(l.sample=e.sample(a.time),l.sample.rebakeReasons.length)throw new Error("Merge stage requires a fresh bake: "+JSON.stringify(l.sample.rebakeReasons));l.time=a.time}a.type==="inspect"&&(l.inspection={...s.inspect(),revision:i,authored:s.authored}),l.revision=i,l.authored=s.authored,l.stats=e.stats,l.timing={...n}}catch(u){l.error=u instanceof Error?u.message:String(u)}return l.workerMs=performance.now()-c,l}return{handle(a){const c=r.then(()=>o(a));return r=c.then(()=>{},()=>{}),c},dispose(){e?.dispose(),e=void 0,s=void 0}}}const sP=tP();self.onmessage=s=>{sP.handle(s.data).then(e=>self.postMessage(e))};self.postMessage({id:0,generation:0,revision:0,workerMs:0});
