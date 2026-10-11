function Kn(n=""){return n}(t=>{t.Empty="";function e(r){return r.length===0}t.IsEmpty=e})(Kn||={});function Fs(n){let e=n;return Object.defineProperty(e,"allTokens",{value:Object.values(n).map(Kn),enumerable:!1,writable:!1,configurable:!1}),e}var z=class n{static#e=new Map;static#n=new n("TfRoot");static#r=new n("");#i;#s=!1;#t=[];#o=[];#a=new Map;constructor(e){this.#i=e}static GetUnknownType(){return n.#r}static GetRoot(){return n.#n}static FindByName(e){return n.#n.#a.get(e)??n.#e.get(e)??n.#r}FindDerivedByName(e){let t=this.#a.get(e);if(t)return t;let r=n.#e.get(e);return r&&r.IsA(this)?r:n.#r}static Declare(e,t){let r=n.#e.get(e);return r||(r=new n(e),n.#e.set(e,r),r._setBases([])),t!==void 0&&r._setBases(t),r}static Define(e,t){let r=n.Declare(e,t??[]);return r.#s=!0,r}AddAlias(e,t){if(n.#e.get(t)?.IsA(e))throw new Error(`type alias '${t}' collides beneath ${e.GetTypeName()}`);let i=e.#a.get(t);if(i&&i!==this)throw new Error(`type alias '${t}' is already registered`);e.#a.set(t,this)}GetAliases(e){let t=[];for(let[r,i]of this.#a)i===e&&t.push(r);return t}GetTypeName(){return this.#i}IsUnknown(){return this===n.#r}IsRoot(){return this===n.#n}IsDefined(){return this.#s}IsA(e){return this.IsUnknown()||e.IsUnknown()?!1:this._ancestorsInclusive().has(e)}GetBaseTypes(){return[...this.#t]}GetDirectlyDerivedTypes(){return[...this.#o]}GetAllAncestorTypes(){let e=[];return this.IsUnknown()||this._appendAncestors(e),e}GetAllDerivedTypes(){let e=new Set,t=[...this.#o];for(;t.length;){let r=t.pop();e.has(r)||(e.add(r),t.push(...r.#o))}return[...e]}_appendAncestors(e){let t=this.#t;if(t.length<=1){e.push(this),t.length===1&&t[0]._appendAncestors(e);return}let r=[[this],[...t]];for(let i of t){let s=[];i._appendAncestors(s),r.push(s)}if(!n._mergeAncestors(r,e))throw new Error(`inconsistent inheritance hierarchy for ${this.#i}`)}static _mergeAncestors(e,t){for(;;){let r,i=!1;for(let s of e){if(s.length===0)continue;i=!0;let o=s[0],a=!1;for(let c of e)if(!(c.length<=1)&&c.indexOf(o,1)!==-1){a=!0;break}if(!a){r=o;break}}if(r===void 0)return!i;t.push(r);for(let s of e)s.length&&s[0]===r&&s.shift()}}_ancestorsInclusive(){let e=new Set,t=[this];for(;t.length;){let r=t.pop();e.has(r)||(e.add(r),t.push(...r.#t))}return e}_setBases(e){for(let r of this.#t){let i=r.#o.indexOf(this);i>=0&&r.#o.splice(i,1)}if(this===n.#n||this===n.#r){this.#t=[];return}let t=e.length?[...e]:[n.#n];this.#t=t;for(let r of t)r.#o.includes(this)||r.#o.push(this)}};function Ca(n){return n+Math.floor(n/255)+16}function uu(n){return Math.imul(n,2654435761)>>>20&4095}function Bs(n,e){return(n[e]|n[e+1]<<8|n[e+2]<<16|n[e+3]<<24)>>>0}function du(n){let e=n.length,t=new Uint8Array(e+Math.floor(e/255)+16),r=0;if(e<12)return Mf(n,0,e,t,r);let i=new Int32Array(4096).fill(-1),s=e-12,o=e-5,a=0,c=0;i[uu(Bs(n,c))]=c,c++;let l=64;for(;c<=s;){let u=-1,d=1,p=l>>6;for(;!(c>s);){let S=uu(Bs(n,c)),x=i[S];if(i[S]=c,x>=0&&x<c&&c-x<=65535&&Bs(n,x)===Bs(n,c)){u=x;break}c+=d,d=++p>>6}if(u<0)break;for(;c>a&&u>0&&n[c-1]===n[u-1];)c--,u--;let f=c-a,h=r++;if(f>=15){t[h]=240;let S=f-15;for(;S>=255;)t[r++]=255,S-=255;t[r++]=S}else t[h]=f<<4;for(let S=0;S<f;S++)t[r++]=n[a+S];let y=c-u;t[r++]=y&255,t[r++]=y>>8&255;let g=c+4,m=u+4;for(;g<o&&n[g]===n[m];)g++,m++;let b=g-c-4;if(b>=15){t[h]|=15;let S=b-15;for(;S>=255;)t[r++]=255,S-=255;t[r++]=S}else t[h]|=b;if(c=g,a=c,c>s)break;i[uu(Bs(n,c-2))]=c-2,l=64}return Mf(n,a,e,t,r)}function Mf(n,e,t,r,i){let s=t-e;if(s>=15){r[i++]=240;let o=s-15;for(;o>=255;)r[i++]=255,o-=255;r[i++]=o}else r[i++]=s<<4;for(let o=0;o<s;o++)r[i++]=n[e+o];return r.subarray(0,i)}function pu(n,e){let t=new Uint8Array(e),r=0,i=0;for(;r<n.length;){let s=n[r++],o=s>>4&15;if(o===15){let u;do u=n[r++],o+=u;while(u===255)}if(t.set(n.subarray(r,r+o),i),r+=o,i+=o,r>=n.length)break;let a=n[r]|n[r+1]<<8;r+=2;let c=(s&15)+4;if(c-4===15){let u;do u=n[r++],c+=u;while(u===255)}let l=i-a;for(let u=0;u<c;u++)t[i++]=t[l++]}return t.subarray(0,i)}function Gi(n){return mP(n,2113929216)}function mP(n,e){let t=n.length;if(t===0)return new Uint8Array([0,0]);if(t<=e){let p=du(n),f=new Uint8Array(1+p.length);return f[0]=0,f.set(p,1),f}let r=Math.floor(t/e),i=t%e,s=r+(i?1:0),o=[],a=1,c=0,l=p=>{let f=du(n.subarray(c,c+p)),h=new Uint8Array(4);h[0]=f.length&255,h[1]=f.length>>8&255,h[2]=f.length>>16&255,h[3]=f.length>>>24&255,o.push(h,f),a+=4+f.length,c+=p};for(let p=0;p<r;p++)l(e);i&&l(i);let u=new Uint8Array(a);u[0]=s;let d=1;for(let p of o)u.set(p,d),d+=p.length;return u}function Us(n,e){let t=n[0];if(t===0)return pu(n.subarray(1),e);let r=1,i=new Uint8Array(e),s=0;for(let o=0;o<t;o++){let a=n[r]|n[r+1]<<8|n[r+2]<<16|n[r+3]*16777216;r+=4;let c=pu(n.subarray(r,r+a),e-s);i.set(c,s),s+=c.length,r+=a}return i.subarray(0,s)}var Lf=new TextEncoder;function Me(n,e){return e<n.length?n[e]:0}function Ht(n){return n>=48&&n<=57}function Of(n){let e=n&-33;return e>=65&&e<=90}function fu(n,e,t,r,i){for(;e<t&&Me(n,e)===Me(r,i);)e++,i++;return[e,i]}function ht(n,e){let t=Lf.encode(n),r=Lf.encode(e),i=t.length,s=r.length,o=i,a=s,c=0,l=0,u=Math.min(i,s);if([c,l]=fu(t,c,u,r,l),c===u&&i===s)return!1;let d,p;for(;c!==u;){d=Me(t,c),p=Me(r,l);let f=d<128&&p<128,h=(d&-33)!==(p&-33),y=d>=64&&p>=64;if(f&&h&&y)return(d+5&31)<(p+5&31);if(Ht(d)||Ht(p))if(Ht(d)&&Ht(p)){let g=c,m=l,P=c,b=l;for(;g!==0&&Ht(Me(t,g-1));)g--;for(;m!==0&&Ht(Me(r,m-1));)m--;for(;P!==o&&Ht(Me(t,P));)P++;for(;b!==a&&Ht(Me(r,b));)b++;for(;g!==P&&Me(t,g)===48;)g++;for(;m!==b&&Me(r,m)===48;)m++;for(;g!==P&&m!==b&&Ht(Me(t,g))&&Me(t,g)===Me(r,m);)g++,m++;if(g===P!=(m===b))return g===P&&m!==b;if(g!==P&&m!==b){let S=Me(t,g),x=Me(r,m),v=P-g,T=b-m;return v!==T?v<T:S<x}c=P,l=b,u=c+Math.min(o-c,a-l)}else{if(c===0)return d<p;let g=Me(t,c-1);return Ht(g)?Ht(p):Ht(d)}else{if(!Of(d)||!Of(p))return d<p;c++,l++}[c,l]=fu(t,c,u,r,l)}return c!==o||l!==a?c===o:([c,l]=fu(t,0,Math.min(i,s),r,0),d=Me(t,c),p=Me(r,l),p===48||d!==48&&d<p)}function gP(n){return n>=65&&n<=90||n>=97&&n<=122}function Ff(n){return n>=48&&n<=57}function Da(n){if(n.length===0||Ff(n.charCodeAt(0)))return!1;for(let e=0;e<n.length;e++){let t=n.charCodeAt(e);if(!(gP(t)||Ff(t)||t===95))return!1}return!0}var _I=-(2n**63n),II=2n**63n-1n,wI=2n**64n-1n;function Wr(n,e){return ht(n,e)?-1:ht(e,n)?1:0}var CI=new TextEncoder;var Ra=class n{static ReplacementValue=65533;static MaximumValue=1114111;static SurrogateRange=[55296,57343];#e;constructor(e=n.ReplacementValue){this.#e=Number.isInteger(e)&&e>=0&&e<=n.MaximumValue&&(e<55296||e>57343)?e:n.ReplacementValue}AsUInt32(){return this.#e}equals(e){return this.#e===e.#e}toString(){return String.fromCodePoint(this.#e)}},yP=new Ra;var br=class extends globalThis.Error{commentary;diagnosticType;context;code;codeString;quiet;#e;constructor(e,t="RuntimeError",r={},i=t,s=String(i),o,a=!1){super(e),this.commentary=e,this.diagnosticType=t,this.context=r,this.code=i,this.codeString=s,this.#e=o,this.quiet=a}GetContext(){return this.context}GetSourceFileName(){return this.context.file??""}GetSourceLineNumber(){return this.context.line??0}GetSourceFunction(){return this.context.prettyFunction??this.context.function??""}GetCommentary(){return this.commentary}AugmentCommentary(e){this.commentary=this.commentary?`${this.commentary}
${e}`:e}GetDiagnosticCode(){return this.code}GetDiagnosticCodeAsString(){return this.codeString}GetInfo(){return this.#e}SetInfo(e){this.#e=e}GetQuiet(){return this.quiet}IsFatal(){return this.diagnosticType==="FatalError"}IsCodingError(){return this.diagnosticType==="CodingError"}},yr=class extends br{constructor(e,t="RuntimeError",r={}){super(e,t,r)}GetErrorCode(){return this.GetDiagnosticCode()}GetErrorCodeAsString(){return this.GetDiagnosticCodeAsString()}},Kr=class extends br{constructor(e,t={}){super(e,"Warning",t)}},qr=class extends br{constructor(e,t={}){super(e,"Status",t)}},Ea=class n{static#e=new n;#n=[];#r=[];#i=[];#s=!1;static GetInstance(){return this.#e}static GetCodeName(e){return String(e)}static FormatDiagnostic(e,t,r){return`${t.file?`${t.file}:${t.line??0}: `:""}${r}`}AddDelegate(e){this.#n.push(e)}RemoveDelegate(e){for(let t=this.#n.length-1;t>=0;t--)this.#n[t]===e&&this.#n.splice(t,1)}SetQuiet(e){this.#s=e}GetErrorBegin(){return 0}GetErrorEnd(){return this.#r.length}EraseError(e){return this.#r.splice(e,1),e}EraseRange(e,t){return this.#r.splice(e,t-e),e}AppendError(e){this.#r.push(e)}PostError(e){let t=e instanceof yr?e:new yr(typeof e=="string"?e:e.GetCommentary(),e instanceof br?e.diagnosticType:void 0,e instanceof br?e.context:void 0);this.#r.push(t),this.#t(t,r=>r.IssueError(t))}PostWarning(e){let t=e instanceof Kr?e:new Kr(typeof e=="string"?e:e.GetCommentary());this.#t(t,r=>r.IssueWarning(t))}PostStatus(e){let t=e instanceof qr?e:new qr(typeof e=="string"?e:e.GetCommentary());this.#t(t,r=>r.IssueStatus(t))}PostFatal(e,t){for(let r of this.#n)r.IssueFatalError?.(e,t);throw new yr(t,"FatalError",e)}HasActiveErrorMark(){return!1}_PushTrap(e){this.#i.push(e)}_PopTrap(e){let t=this.#i.lastIndexOf(e);t>=0&&this.#i.splice(t,1)}#t(e,t){let r=this.#i.at(-1);if(r){r._Capture(e);return}if(this.#n.length)for(let i of[...this.#n])t(i);else!this.#s&&!e.GetQuiet()&&globalThis.console.warn(e.GetCommentary())}};var BI=globalThis.console;var hu=new Map,Na=new Set,mu=class n{static#e=new n;static GetInstance(){return this.#e}static Add(e,t){let r=hu.get(e)??[];r.push(t),hu.set(e,r),Na.has(e)&&t()}SubscribeTo(e){if(!Na.has(e)){Na.add(e);for(let t of hu.get(e)??[])t()}}UnsubscribeFrom(e){Na.delete(e)}RunUnloadersAtExit(){}};var $s=class{#e;#n;constructor(e,t){this.#e=e,this.#n=t}GetName(){return this.#e.Name}Load(){return!0}IsLoaded(){return!0}IsPythonModule(){return this.#e.Type==="python"}GetPath(){return this.#e.LibraryPath??this.#e.Root??""}GetResourcePath(){return this.#e.ResourcePath??""}GetDependencies(){return this.#e.Info?.PluginDependencies??{}}MakeResourcePath(e){if(e.startsWith("/"))return e;let t=this.GetResourcePath().replace(/\/+$/,"");return t?`${t}/${e}`:e}FindPluginResource(e){return this.HasResource(e)?this.MakeResourcePath(e):""}IsResource(){return this.#e.Type==="resource"}GetMetadata(){return this.#e.Info??{}}GetMetadataForType(e){return this.#s()[e.GetTypeName()]??{}}DeclaresType(e,t=!1){if(e.IsUnknown())return!1;for(let r of Object.keys(this.#s())){let i=z.FindByName(r);if(t?i.IsA(e):i===e)return!0}return!1}HasResource(e){return Object.prototype.hasOwnProperty.call(this.#n,e)}async GetResource(e){let t=this.#n[e];if(t===void 0)throw new Error(`@pxr/plug: plugin '${this.GetName()}' has no resource '${e}'`);return typeof t=="string"?t:t()}_GetResourceSync(e){let t=this.#n[e];return typeof t=="string"?t:void 0}_declareTypes(){let e=[];for(let[t,r]of Object.entries(this.#s())){if(typeof r!="object"||r===null)continue;let i=r;e.push(this.#r(t,i))}return e}#r(e,t){let r=Array.isArray(t.bases)?t.bases.filter(a=>typeof a=="string").map(a=>z.Declare(a)):[],i=z.Declare(e);return i.GetBaseTypes().some(a=>!a.IsRoot())||z.Declare(e,r),this.#i(i,t),i}#i(e,t){let r=t.alias;if(!(typeof r!="object"||r===null))for(let[i,s]of Object.entries(r)){if(typeof s!="string")continue;let o=z.Declare(i);e.AddAlias(o,s)}}#s(){return this.#e.Info?.Types??{}}};var te=class n{static#e;#n=new Map;#r=new Map;#i=new Set;constructor(){}static GetInstance(){return n.#e??=new n}RegisterPlugins(e,t){let r=[];for(let i of e.Plugins??[]){if(typeof i?.Name!="string"||i.Name===""||this.#n.has(i.Name))continue;let s=new $s(i,t?.[i.Name]??{});this.#n.set(i.Name,s),r.push(s)}for(let i of r)for(let s of i._declareTypes())this.#r.has(s)||this.#r.set(s,i);if(r.length>0)for(let i of[...this.#i])i([...r]);return r}GetPluginForType(e){return e.IsUnknown()?null:this.#r.get(e)??null}GetPluginWithName(e){return this.#n.get(e)??null}GetAllPlugins(){return[...this.#n.values()]}static GetAllDerivedTypes(e){return e.GetAllDerivedTypes()}GetMetadataForType(e){return this.GetPluginForType(e)?.GetMetadataForType(e)??{}}AddDidRegisterPluginsListener(e){return this.#i.add(e),()=>{this.#i.delete(e)}}};var Bf={Plugins:[{Info:{Types:{NixieClockSchema:{alias:{UsdSchemaBase:"NixieClock"},bases:["UsdTyped"],schemaIdentifier:"NixieClock",schemaKind:"concreteTyped"},NixieDigitAPI:{bases:["UsdAPISchemaBase"],schemaIdentifier:"NixieDigitAPI",schemaKind:"singleApplyAPI",apiSchemaIsApplied:!0}}},Name:"nixieClockSchema",ResourcePath:".",Type:"resource"}]};var Uf=`#usda 1.0
class NixieClock "NixieClock" {}

class "NixieDigitAPI" (customData = {token apiSchemaType = "singleApply"}) {}
`;var Va=class{computeTime="computeTime";computeValue="computeValue";computeResolvedValue="computeResolvedValue";computePath="computePath"},Et=new Va;var yu=new Map;function Tu(n){return yu.get(n)??[]}var zs=class{constructor(e){this._inputs=e}_output;_hasOutput=!1;GetInputValue(e){let t=this.GetInputValues(e);if(t.length===0)throw new Error(`No value available on input '${e}'.`);return t[0]}GetInputValuePtr(e,t=null){return this.GetInputValues(e)[0]??t}GetInputValues(e){return[...this._inputs.get(e)??[]]}HasInputValue(e){return(this._inputs.get(e)?.length??0)>0}SetOutput(e){this._output=e,this._hasOutput=!0}_GetCallbackResult(e){return this._hasOutput?this._output:e}},Mi=class{constructor(e){this._key=e}InputName(e){return this._key.inputName=e,this}Required(){return this}_Build(){return{...this._key}}},bu=class extends Mi{FallsBackToDispatched(){return this._key.fallsBackToDispatched=!0,this}},Ga=class{constructor(e){this._relationshipName=e}TargetedObjects(e){return new bu({source:"relationshipTargetedObjects",relationshipName:this._relationshipName,computation:e,inputName:e})}},Pu=class{constructor(e){this._attributeName=e}Computation(e){return new Mi({source:"primAttributeComputation",attributeName:this._attributeName,computation:e,inputName:e})}},Su=class{Computation(e){return new Mi({source:"primComputation",computation:e,inputName:e})}AttributeValue(e){return new Mi({source:"primAttributeValue",attributeName:e,inputName:e})}Attribute(e){return new Pu(e)}Relationship(e){return new Ga(e)}};function $f(){return new Su}function Qr(n){return $f().AttributeValue(n)}function Au(n){return new Ga(n)}var xu=class{constructor(e){this._definition=e}Callback(e){return this._definition.callback=e,this}Inputs(...e){return this._definition.inputs.push(...e.map(t=>t._Build())),this}},Hs=class{constructor(e){this._schemaName=e}_add(e,t,r,i){let s={schemaName:this._schemaName,providerKind:e,computationName:t,dispatched:i,inputs:[],...r===void 0?{}:{attributeName:r}},o=yu.get(this._schemaName);return o||yu.set(this._schemaName,o=[]),o.push(s),new xu(s)}PrimComputation(e){return this._add("prim",e,void 0,!1)}AttributeComputation(e,t){return this._add("attribute",t,e,!1)}DispatchedPrimComputation(e){return this._add("prim",e,void 0,!0)}DispatchedAttributeComputation(e){return this._add("attribute",e,void 0,!0)}};function Ma(n,e){e(new Hs(n))}te.GetInstance().RegisterPlugins(Bf,{nixieClockSchema:{"generatedSchema.usda":Uf}});Ma("NixieClock",n=>{n.PrimComputation("nixie:digits").Callback(e=>{let t=e.GetInputValue("nixie:utcSeconds");if(!Number.isFinite(t))throw Error("Non-finite time");let r=(Math.floor(t)%86400+86400)%86400,i=Math.floor(r/3600);return e.GetInputValue("nixie:hour12")&&(i=i%12||12),[i,Math.floor(r/60)%60,r%60].map(s=>String(s).padStart(2,"0")).join("")}).Inputs(Qr("nixie:utcSeconds"),Qr("nixie:hour12")),n.PrimComputation("nixie:emission").Callback(e=>[1,.55,.1].map(t=>t*e.GetInputValue("nixie:intensity"))).Inputs(Qr("nixie:intensity"))});Ma("NixieDigitAPI",n=>{n.PrimComputation("nixie:visibility").Callback(e=>{let t=e.GetInputValue("nixie:digits"),r=e.GetInputValue("nixie:place"),i=e.GetInputValue("nixie:digit");return+t[r]===i?"inherited":"invisible"}).Inputs(Au("nixie:clock").TargetedObjects("nixie:digits"),Qr("nixie:place"),Qr("nixie:digit"))});var pe=class n{_path;constructor(e=""){this._path=e instanceof n?e._path:e}getPathString(){return this._path}get valid(){return this._path.length>0}_str(e){return e instanceof n?e._path:e}equals(e){return this._path===this._str(e)}notEquals(e){return this._path!==this._str(e)}lt(e){return this._path<this._str(e)}le(e){return this._path<=this._str(e)}gt(e){return this._path>this._str(e)}ge(e){return this._path>=this._str(e)}toString(){return this._path}repr(){return this._path?`Ar.ResolvedPath('${this._path}')`:"Ar.ResolvedPath()"}get hash(){return this._path}};function wP(n){return n.length===0||n[n.length-1]!=="]"?n.length:n.length-1}function La(n,e){let t=1;for(let r=e-1;r>=0;r--){let i=n[r];if(i==="["||i==="]"){if(r-1>=0&&n[r-1]==="\\")continue;if(t+=i==="["?-1:1,t===0)return r}}return n.length}function kP(n){if(n.length===0)return n;let e=n.length;if(n[n.length-1]==="]"){let r=La(n,n.length-1);r!==n.length&&(e=r)}return n.slice(0,e).replaceAll("[","\\[").replaceAll("]","\\]")+n.slice(e)}function CP(n){if(n.length===0)return n;let e=n.length;if(n[n.length-1]==="]"){let r=La(n,n.length-1);r!==n.length&&(e=r)}return n.slice(0,e).replaceAll("\\[","[").replaceAll("\\]","]")+n.slice(e)}function Oa(n){return n.length>0&&n[n.length-1]==="]"&&La(n,n.length-1)!==n.length}function vu(n){let e=0;for(;e<n.length&&n[e]==="";)e++;if(e>=n.length)return"";let t=n[e++],r=t.length;if(t[t.length-1]==="]"){let i=0;for(;i<t.length&&t[t.length-1-i]==="]";)i++;r=t.length-i}for(;e<n.length;e++){let i=n[e];if(i==="")continue;let s="["+kP(i)+"]";t=t.slice(0,r)+s+t.slice(r),r+=s.length-1}return t}function _u(n){let e=wP(n);if(e===n.length)return[n,""];let t=La(n,e);if(t===n.length)return[n,""];let r=n.slice(0,t),i=CP(n.slice(t+1,e));return[r,i]}var Li=class{async getDetachedAsset(){return new An(new Uint8Array(await this.getBuffer()))}},An=class extends Li{constructor(t){super();this.bytes=t}getSize(){return this.bytes.byteLength}async getBuffer(){return this.bytes}async read(t,r){return r<0||t<0||r+t>this.bytes.byteLength?new Uint8Array:this.bytes.slice(r,r+t)}};var js=class{constructor(e="",t="",r=void 0){this.version=e;this.assetName=t;this.resolverInfo=r}};var Ws=class{constructor(e=void 0){this.time=e}get valid(){return this.time!==void 0}equals(e){return this.time===e.time}notEquals(e){return!this.equals(e)}toString(){return this.valid?`Ar.Timestamp(${this.time})`:"Ar.Timestamp()"}};var Ks=class{};var qs;(e=>{class n{constructor(r){this.affectsContext=r}}e.ResolverChanged=n})(qs||={});var Iu=new Set;function Oi(n){return Iu.add(n),()=>Iu.delete(n)}function Fa(n){for(let e of Iu)e(n)}var vn;if(typeof process<"u"&&process.versions?.node){let n=["node","fs"].join(":"),e=`${["node","fs"].join(":")}/promises`,[t,r]=await Promise.all([import(n),import(e)]);vn={existsSync:i=>t.existsSync(i),readFile:i=>r.readFile(i),open:(i,s)=>r.open(i,s),mkdir:async i=>{await r.mkdir(i,{recursive:!0})},rename:(i,s)=>r.rename(i,s),unlink:i=>r.unlink(i)}}function Xr(n){return vn?.existsSync(n)??!1}function zf(n){return vn?vn.readFile(n):Promise.reject(new Error("Filesystem assets are unavailable"))}var DP=0;async function Hf(n,e){if(!vn)return Promise.reject(new Error("Filesystem assets are unavailable"));let t=Math.max(n.lastIndexOf("/"),n.lastIndexOf("\\"));if(t>0&&await vn.mkdir(n.slice(0,t)),!e)return vn.open(n,"r+");let r=Date.now(),i="",s;for(let a=0;a<100&&!s;a++){i=`${n}.tmp.${r}.${DP++}`;try{s=await vn.open(i,"wx")}catch{}}if(!s)throw new Error(`Unable to create sibling temporary for '${n}'`);let o=!0;return{write:(a,c,l,u)=>s.write(a,c,l,u),close:async()=>{if(o){o=!1,await s.close();try{await vn.rename(i,n)}catch(a){try{await vn.unlink(i)}catch{}throw a}}}}}function Ba(){return typeof process<"u"&&typeof process.cwd=="function"?process.cwd():""}var Pe=class{objects;constructor(...e){this.objects=[...e]}get empty(){return this.objects.length===0}get(e){return this.objects.find(t=>t instanceof e)}getDebugString(){return this.objects.map(e=>e.constructor.name).join(", ")}equals(e){return this.objects.length===e.objects.length&&this.objects.every((t,r)=>{let i=e.objects[r];return t===i?!0:!i||t.constructor!==i.constructor?!1:t.equals?.call(t,i)??!1})}},jt=class{constructor(e){this.resolver=e}},an=class{searchPath;constructor(e=[]){this.searchPath=e.filter(t=>t!=="").map(t=>RP(t))}equals(e){return this.searchPath.length===e.searchPath.length&&this.searchPath.every((t,r)=>t===e.searchPath[r])}};function RP(n){if(n.startsWith("/")||/^[a-zA-Z]:[\\/]/.test(n))return jf(n);let e=Ba();return jf(e?`${e}/${n}`:n)}function jf(n){let e=n.startsWith("/"),t=/^[a-zA-Z]:/.exec(n)?.[0]??"",r=[];for(let i of n.replaceAll("\\","/").replace(/^[a-zA-Z]:/,"").split("/"))!i||i==="."||(i===".."&&r.length>0?r.pop():r.push(i));return`${t}${e?"/":""}${r.join("/")}`}var EP={contexts:[],caches:[]},NP=[],wu,Wf=globalThis.AsyncContext;if(Wf?.Variable){let n=new Wf.Variable({name:"Ar resolver state"});wu={getStore:()=>n.get(),run:(e,t)=>n.run(e,t)}}else if(typeof process<"u"&&process.versions?.node){let e=await import(["node","async_hooks"].join(":"));wu=new e.AsyncLocalStorage}function Kf(){return wu?.getStore()??NP.at(-1)??EP}function qf(n){let e=Kf().contexts;for(let t=e.length-1;t>=0;t--)if(e[t].resolver===n)return e[t].context}function Qf(n){let e=Kf().caches;for(let t=e.length-1;t>=0;t--)if(e[t].resolver===n)return e[t].data}var ln=class{createIdentifier(e,t=new pe){return t.valid?Nt(t.toString(),e):cn(e)}isContextDependentPath(e){return!1}createDefaultContext(){return new Pe}createDefaultContextForAsset(e){return this.createDefaultContext()}createContextFromString(e,t){return new Pe}createContextFromStrings(e){for(let[t,r]of e)if(t==="")return this.createContextFromString(r);return new Pe}createIdentifierForNewAsset(e,t=new pe){return this.createIdentifier(e,t)}resolveForNewAsset(e,t=this.getCurrentContext()){return this.resolve(e,t)}getCurrentContext(){return Vu(this)}getExtension(e){let r=st(e)?.innerPath??e,i=r.lastIndexOf("/"),s=r.lastIndexOf(".");return s>i?r.slice(s+1):""}getAssetInfo(e,t){return new js}getModificationTimestamp(e,t){return new Ws}async openAssetForWrite(e,t="update"){}canWriteAssetToPath(e){return!1}beginCacheScope(e){return e??new Map}endCacheScope(e){}refreshContext(e){Fa(new qs.ResolverChanged(t=>t.equals(e)))}},Bi=class extends ln{static setDefaultSearchPath(e){let t=new an(e);t.equals(ku)||(ku=t,Fa(new qs.ResolverChanged(r=>r.get(an)!==void 0)))}createDefaultContextForAsset(e){return e?new Pe(new an([$a(Fi(e))])):new Pe(new an)}createContextFromString(e,t){if(t!==void 0&&e!=="")return new Pe;let i=(t??e).split(Jf()).filter(Boolean);return new Pe(new an(i))}async resolve(e,t=this.getCurrentContext()){let r=t.get(jt)?.resolver;if(r&&r!==this)return r.resolve(e,t);let i=Qf(this);if(i instanceof Map){let s=i.get(e);if(s instanceof pe)return s;let o=this._resolve(e,t);return i.set(e,o),o}return this._resolve(e,t)}createIdentifier(e,t=new pe){let r=this.getCurrentContext().get(jt)?.resolver;if(r&&r!==this)return r.createIdentifier(e,t);if(!e)return"";if(!t.valid)return cn(e);let i=Nt(t.toString(),e);return Cu(e)&&!Xr(Fi(i))?cn(e):cn(i)}createIdentifierForNewAsset(e,t=new pe){return e?Eu(e)?t.valid?cn(Nt(t.toString(),e)):Fi(e):cn(e):""}resolveForNewAsset(e,t=this.getCurrentContext()){let r=t.get(jt)?.resolver;return r&&r!==this?r.resolveForNewAsset(e,t):Promise.resolve(new pe(e?Fi(e):""))}async openAssetForWrite(e,t="update"){if(this.canWriteAssetToPath(e))try{let r=await Hf(e.toString(),t==="replace");return new Ru(r)}catch{return}}canWriteAssetToPath(e){return e.valid&&!Oa(e.toString())}isContextDependentPath(e){let t=this.getCurrentContext().get(jt)?.resolver;return t?t.isContextDependentPath(e):Cu(e)}async openAsset(e,t=this.getCurrentContext()){let r=t.get(jt)?.resolver;if(r&&r!==this)return r.openAsset(e,t);try{return new An(new Uint8Array(await zf(e.toString())))}catch{return}}_resolve(e,t){if(!e)return new pe;if(!Eu(e)){let s=Fi(e);return Xr(s)?new pe(s):new pe}let r=Fi(e);if(Xr(r))return new pe(r);if(!Cu(e))return new pe;let i=t.get(an);for(let s of[i,ku])if(s)for(let o of s.searchPath){let a=cn(`${o}/${e}`);if(Xr(a))return new pe(a)}return new pe}},Ru=class extends Ks{constructor(t){super();this.handle=t}async write(t,r){return this.handle?(await this.handle.write(t,0,t.byteLength,r)).bytesWritten:0}async close(){if(!this.handle)return!1;let t=this.handle;return this.handle=void 0,await t.close(),!0}},ku=new an((typeof process<"u"?process.env.PXR_AR_DEFAULT_SEARCH_PATH:void 0)?.split(Jf())??[]);function Jf(){return typeof process<"u"&&process.platform==="win32"?";":":"}function Eu(n){return n!==""&&!Qs(n)}function Cu(n){return Eu(n)&&!n.startsWith("./")&&!n.startsWith("../")}function Fi(n){if(Qs(n))return cn(n);let e=Ba();return cn(e?`${e}/${n}`:n)}var Xf=new Map([["ArDefaultResolver",()=>new Bi]]),VP="ArDefaultResolver",Du,Yf=new Set;function Vt(){return Du||(Du=(Xf.get(VP)??Xf.get("ArDefaultResolver"))()),Du}function Nu(n){return Yf.add(n),()=>Yf.delete(n)}function st(n){if(!Oa(n))return null;let[e,t]=_u(n);return{packagePath:e,innerPath:t}}function _n(n,e){return vu([n,e])}function $a(n){let e=n.lastIndexOf("/");return e>=0?n.slice(0,e):"."}function Qs(n){return n.startsWith("/")||/^[a-zA-Z]:[\\/]/.test(n)||/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(n)}function Ua(n){let e=[];for(let t of n.split("/"))t===""||t==="."||(t===".."&&e.length&&e.at(-1)!==".."?e.pop():e.push(t));return e.join("/")}function cn(n){let e=/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.exec(n);if(e){let t=n.slice(e[0].length),r=t.indexOf("/");return r<0?n:e[0]+t.slice(0,r+1)+Ua(t.slice(r+1))}return(n.startsWith("/")?"/":"")+Ua(n)}function eh(n,e){if(Qs(e))return e;let t=$a(n);return cn(t==="."?e:`${t}/${e}`)}function Nt(n,e){if(!e)return"";let t=e.replace(/^@/,"").replace(/@$/,"").trim(),r=st(n);if(r&&!Qs(t)){let i=$a(r.innerPath),s=i==="."||i===r.innerPath?t:`${i}/${t}`;return _n(r.packagePath,Ua(s))}return eh(n,t)}function Vu(n){return qf(n)??new Pe}var th={Plugins:[{Info:{Profiles:{Capabilities:{usd:{docstring:"Root capability for the USD taxonomy.",name:"USD",style:"core",subgraph:"Foundation"},"usd.core":{docstring:"Capabilities introduced by the pxr/usd/usd library.",name:"usd library",predecessors:["usd"],style:"core",subgraph:"Foundation"},"usd.core.colorspace":{docstring:"Authoring and resolution of color space opinions on prims and attributes via UsdColorSpaceAPI / UsdColorSpaceDefinitionAPI.",name:"Color Space",predecessors:["usd.core"],style:"core",subgraph:"Foundation"},"usd.core.fileformat":{docstring:"File formats allow more file types to be referenced.",name:"File Format",predecessors:["usd.core"],style:"core",subgraph:"Foundation"}}},SdfMetadata:{apiSchemas:{appliesTo:"prims",type:"tokenlistop"},fallbackPrimTypes:{appliesTo:["layers"],type:"dictionary"}},Types:{UsdAPISchemaBase:{alias:{UsdSchemaBase:"APISchemaBase"},autoGenerated:!0,bases:["UsdSchemaBase"],schemaIdentifier:"APISchemaBase",schemaKind:"abstractBase"},UsdClipsAPI:{alias:{UsdSchemaBase:"ClipsAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ClipsAPI",schemaKind:"nonAppliedAPI"},UsdCollectionAPI:{alias:{UsdSchemaBase:"CollectionAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"CollectionAPI",schemaKind:"multipleApplyAPI"},UsdColorSpaceAPI:{alias:{UsdSchemaBase:"ColorSpaceAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],impliesCapabilities:["usd.core.colorspace"],schemaIdentifier:"ColorSpaceAPI",schemaKind:"singleApplyAPI"},UsdColorSpaceDefinitionAPI:{alias:{UsdSchemaBase:"ColorSpaceDefinitionAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],impliesCapabilities:["usd.core.colorspace"],schemaIdentifier:"ColorSpaceDefinitionAPI",schemaKind:"multipleApplyAPI"},UsdModelAPI:{alias:{UsdSchemaBase:"ModelAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ModelAPI",schemaKind:"nonAppliedAPI"},UsdSchemaBase:{alias:{UsdSchemaBase:"SchemaBase"},schemaKind:"abstractBase"},UsdTyped:{alias:{UsdSchemaBase:"Typed"},autoGenerated:!0,bases:["UsdSchemaBase"],schemaIdentifier:"Typed",schemaKind:"abstractBase"}}},LibraryPath:"@PLUG_INFO_LIBRARY_PATH@",Name:"usd",ResourcePath:"@PLUG_INFO_RESOURCE_PATH@",Root:"@PLUG_INFO_ROOT@",Type:"library"}]},nh=`#usda 1.0
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

`;te.GetInstance().RegisterPlugins(th,{usd:{"generatedSchema.usda":nh}});var Xs=new Map([["customData",{typeName:"dictionary",appliesTo:new Set(["prims","attributes","relationships"])}],["assetInfo",{typeName:"dictionary",appliesTo:new Set(["prims"])}],["customLayerData",{typeName:"dictionary",appliesTo:new Set(["layers"])}],["int_single",{typeName:"int",appliesTo:new Set(["layers"])}],["string_single",{typeName:"string",appliesTo:new Set(["layers"])}],["prefix",{typeName:"string",appliesTo:new Set(["prims"])}]]),Pr=new WeakMap,GP=new WeakMap,MP=new WeakMap;function Ys(n,e){Pr.set(n,e)}function Ui(n){return Pr.get(n)}function Mu(n,e){GP.set(n,e)}function ja(n,e){MP.set(n,e)}function Lu(n,e){let t=Pr.get(n);t&&Pr.set(e,t)}function Ou(n,e){if(!Ha(n))return n;let t=Pr.get(n),r={};for(let[i,s]of Object.entries(n)){let o=Ou(s,e);r[i]=t?.get(i)?e(o,t.get(i)):o}return t&&Pr.set(r,t),r}function Fu(n){for(let e of n){let t=e.GetMetadata().SdfMetadata;if(Ha(t))for(let[r,i]of Object.entries(t)){if(Xs.has(r)||!Ha(i))continue;let s=i.type;if(typeof s!="string")continue;let o=i.appliesTo,a=typeof o=="string"?new Set([o]):Array.isArray(o)?new Set(o.filter(u=>typeof u=="string")):void 0,c=Object.fromEntries(Object.entries(i).filter(([u])=>u!=="type"&&u!=="default"&&u!=="appliesTo")),l={typeName:s,..."default"in i?{fallback:i.default}:{},...Object.keys(c).length?{info:c}:{},...a?.size?{appliesTo:a}:{}};Xs.set(r,l)}}}var za=class{constructor(e,t){this.name=e;this._definition=t}getTypeName(){return this._definition.typeName}getFallback(){return this._definition.fallback}getInfo(){return this._definition.info??{}}},Gu=class n{static _instance=new n;static getInstance(){return this._instance}isValidFieldForSpec(e,t){return Sr(e,t)!==void 0}getFallback(e){return Xs.get(e)?.fallback}getFieldDefinition(e){let t=Xs.get(e);return t?new za(e,t):void 0}};function Sr(n,e){let t=Xs.get(n);if(!t)return;if(!t.appliesTo)return t.typeName;let r=e==="layer"?"layers":e==="prim"?"prims":e==="attribute"?"attributes":e==="relationship"?"relationships":"variants";if(t.appliesTo.has(r)||(e==="attribute"||e==="relationship")&&t.appliesTo.has("properties")||e==="variant"&&t.appliesTo.has("prims"))return t.typeName}function Wa(n,e,t){if(e==="timecode")return typeof n=="number"?t(n):n;if(e==="timecode[]")return Array.isArray(n)?n.map(s=>typeof s=="number"?t(s):s):n;if(e!=="dictionary"||!Ha(n))return n;let r=Pr.get(n),i={};for(let[s,o]of Object.entries(n))i[s]=Wa(o,r?.get(s),t);return r&&Pr.set(i,r),i}function Ha(n){return typeof n=="object"&&n!==null&&!Array.isArray(n)}var mt=class{kind;parent;isAbsolute;elementCount;containsVariantSelection;name;variantSet;variant;targetPath;constructor(e){this.kind=e.kind,this.parent=e.parent,this.isAbsolute=e.isAbsolute,this.elementCount=e.parent?e.parent.elementCount+1:0,this.containsVariantSelection=(e.parent?.containsVariantSelection??!1)||e.kind==="variant",this.name=e.name??"",this.variantSet=e.variantSet??"",this.variant=e.variant??"",this.targetPath=e.targetPath??null}element(){switch(this.kind){case"root":return this.isAbsolute?"/":".";case"prim":{let e=this.parent;return(e!==null&&(e.kind==="variant"||e.kind==="root"&&!e.isAbsolute)?"":"/")+this.name}case"variant":return`{${this.variantSet}=${this.variant}}`;case"property":return"."+this.name;case"relationalAttribute":return"."+this.name;case"target":return"["+this.targetPath.pathString+"]";case"expression":return".expression"}}},Ka=new mt({kind:"root",parent:null,isAbsolute:!0}),Bu=new mt({kind:"root",parent:null,isAbsolute:!1}),V=class n{_node;_str;constructor(e){this._node=e}static emptyPath=new n(null);static absoluteRootPath=new n(Ka);static reflexiveRelativePath=new n(Bu);static fromString(e){return ih(e)??n.emptyPath}static _wrap(e){return e===null?n.emptyPath:e===Ka?n.absoluteRootPath:e===Bu?n.reflexiveRelativePath:new n(e)}isEmpty(){return this._node===null}isAbsolutePath(){return this._node?.isAbsolute??!1}isAbsoluteRootPath(){return this._node===Ka}get pathElementCount(){return this._node?.elementCount??0}isPrimPath(){let e=this._node;return e!==null&&(e.kind==="prim"||e.kind==="root"&&!e.isAbsolute)}isPrimVariantSelectionPath(){return this._node?.kind==="variant"}isPrimOrPrimVariantSelectionPath(){let e=this._node;return e!==null&&(e.kind==="prim"||e.kind==="variant"||e.kind==="root"&&e.isAbsolute)}isRootPrimPath(){let e=this._node;return e!==null&&e.kind==="prim"&&e.isAbsolute&&e.elementCount===1}isPropertyPath(){return this._node?.kind==="property"||this._node?.kind==="relationalAttribute"}isPrimPropertyPath(){return this._node?.kind==="property"}isTargetPath(){return this._node?.kind==="target"}containsPrimVariantSelection(){return this._node?.containsVariantSelection??!1}get name(){let e=this._node;return e===null?"":e.kind==="root"?e.isAbsolute?"/":".":e.kind==="variant"?e.variant:e.name}getVariantSelection(){let e=this._node;return e&&e.kind==="variant"?[e.variantSet,e.variant]:["",""]}getTargetPath(){let e=this._node;return e&&e.kind==="target"?e.targetPath:n.emptyPath}getParentPath(){return this._node===null?n.emptyPath:n._wrap(this._node.parent)}reapplyVariantSelectionsOnto(e){if(e.isEmpty()||!this.containsPrimVariantSelection())return e;let t=new Map;for(let o=this;o._node!==null&&!o.isAbsoluteRootPath();o=o.getParentPath())o.isPrimVariantSelectionPath()&&t.set(o.getParentPath().stripAllVariantSelections().pathString,o.getVariantSelection());let r=e.stripAllVariantSelections(),i=[];for(let o=r;o._node!==null&&!o.isAbsoluteRootPath();o=o.getParentPath())i.unshift(o.name);let s=r.isAbsolutePath()?n.absoluteRootPath:n.reflexiveRelativePath;for(let o of i){s=s.appendChild(o);let a=t.get(s.stripAllVariantSelections().pathString);a!==void 0&&(s=s.appendVariantSelection(a[0],a[1]))}return s}getPrimPath(){let e=this._node;for(;e!==null&&e.kind!=="prim"&&e.kind!=="root";)e=e.parent;return e===null||e.kind==="root"?n.emptyPath:n._wrap(e)}stripAllVariantSelections(){if(this._node===null||!this._node.containsVariantSelection)return this;let e=[];for(let r=this._node;r!==null;r=r.parent)r.kind!=="variant"&&e.push(r);e.reverse();let t=null;for(let r of e)t=r.kind==="root"?r:rh(r,t);return n._wrap(t)}appendChild(e){let t=this._node;if(t===null)throw new Error("cannot append a child to the empty path");return n._wrap(new mt({kind:"prim",parent:t,isAbsolute:t.isAbsolute,name:e}))}appendVariantSelection(e,t){let r=this._node;if(r===null)throw new Error("cannot append a variant selection to the empty path");return n._wrap(new mt({kind:"variant",parent:r,isAbsolute:r.isAbsolute,variantSet:e,variant:t}))}appendProperty(e){let t=this._node;if(t===null)throw new Error("cannot append a property to the empty path");return n._wrap(new mt({kind:"property",parent:t,isAbsolute:t.isAbsolute,name:e}))}appendTarget(e){let t=this._node;if(t===null)throw new Error("cannot append a target to the empty path");return n._wrap(new mt({kind:"target",parent:t,isAbsolute:t.isAbsolute,targetPath:e}))}hasPrefix(e){if(e.isEmpty()||this.isEmpty())return!1;let t=e.pathElementCount,r=this._node;for(;r!==null&&r.elementCount>t;)r=r.parent;return r!==null&&n._wrap(r).pathString===e.pathString}replacePrefix(e,t){if(this.isEmpty()||e.isEmpty()||t.isEmpty())return this;if(!this.hasPrefix(e))return this;if(this.pathString===e.pathString)return t;let r=e.pathElementCount,i=[];for(let o=this._node;o!==null&&o.elementCount>r;o=o.parent)i.push(o);i.reverse();let s=t._node;for(let o of i)s=rh(o,s);return n._wrap(s)}getCommonPrefix(e){if(this.isEmpty()||e.isEmpty())return n.emptyPath;let t=this._node,r=e._node;for(;t!==null&&r!==null&&t.elementCount>r.elementCount;)t=t.parent;for(;t!==null&&r!==null&&r.elementCount>t.elementCount;)r=r.parent;for(;t!==null&&r!==null&&n._wrap(t).pathString!==n._wrap(r).pathString;)t=t.parent,r=r.parent;return n._wrap(t)}get pathString(){if(this._str!==void 0)return this._str;let e=this._node;if(e===null)return this._str="";if(e.parent===null)return this._str=e.isAbsolute?"/":".";let t=[];for(let r=e;r!==null&&r.parent!==null;r=r.parent)t.push(r.element());return t.reverse(),this._str=t.join("")}toString(){return this.pathString}equals(e){return this.pathString===e.pathString}};function rh(n,e){return new mt({kind:n.kind,parent:e,isAbsolute:e?.isAbsolute??n.isAbsolute,name:n.name,variantSet:n.variantSet,variant:n.variant,targetPath:n.targetPath})}function ih(n){if(n==="")return V.emptyPath;if(n==="/")return V.absoluteRootPath;if(n===".")return V.reflexiveRelativePath;let e=n[0]==="/",t=e?Ka:Bu,r=0,i=o=>/[A-Za-z0-9_]/.test(o),s=o=>{let a=r;for(;r<n.length&&o(n[r]);)r++;return n.slice(a,r)};for(;r<n.length;){let o=n[r];if(o==="/"){r++;let a=s(i);if(a==="")return null;t=new mt({kind:"prim",parent:t,isAbsolute:e,name:a})}else if(o==="{"){let a=n.indexOf("}",r),c=n.indexOf("=",r);if(a<0||c<0||c>a)return null;t=new mt({kind:"variant",parent:t,isAbsolute:e,variantSet:n.slice(r+1,c),variant:n.slice(c+1,a)}),r=a+1}else if(o==="."){r++;let a=s(l=>i(l)||l===":");if(a===""||t.kind==="property"||t.kind==="relationalAttribute"||t.kind==="expression")return null;let c=t.kind==="target"?"relationalAttribute":"property";t=new mt({kind:c,parent:t,isAbsolute:e,name:a})}else if(o==="["){let a=n.lastIndexOf("]");if(a<0)return null;let c=ih(n.slice(r+1,a));if(c===null||c.isEmpty())return null;t=new mt({kind:"target",parent:t,isAbsolute:e,targetPath:c}),r=a+1}else if(i(o))t=new mt({kind:"prim",parent:t,isAbsolute:e,name:s(i)});else return null}return V._wrap(t)}var Yr=class{#e=new Map;AddToCollection(e,t){if(t.length===0)return;let r=this.#e.get(e);r?r.push(...t):this.#e.set(e,[...t])}Iterate(e){this.#n(e,!1)}ReverseIterate(e){this.#n(e,!0)}GetThreadIds(){return[...this.#e.keys()]}GetEvents(e){return this.#e.get(e)??[]}get empty(){return this.#e.size===0}#n(e,t){e.OnBeginCollection();let r=[...this.#e];t&&r.reverse();for(let[i,s]of r){e.OnBeginThread(i);let o=t?[...s].reverse():s;for(let a of o)e.AcceptsCategory(a.category)&&e.OnEvent(i,a.key,a);e.OnEndThread(i)}e.OnEndCollection()}};var Ie=class{key;type;time;startTime;laneId;eventId;parentEventId;parentIsExplicit;value;data;category;constructor(e){this.key=e.key,this.type=e.type,this.time=e.time,this.startTime=e.startTime,this.laneId=e.laneId,this.eventId=e.eventId,this.parentEventId=e.parentEventId,this.parentIsExplicit=e.parentIsExplicit??!1,this.value=e.value,this.data=e.data,this.category=e.category??0}GetKey(){return this.key}GetTimeStamp(){return this.time}GetStartTimeStamp(){return this.startTime??this.time}GetEndTimeStamp(){return this.time}GetTimeSpanStamps(){return[this.GetStartTimeStamp(),this.GetEndTimeStamp()]}GetCounterValue(){return this.value??0}GetCategory(){return this.category}GetType(){return this.type}};var He="Main Thread";function Gt(){return globalThis.performance?.now()??Date.now()}var Le=class n{static#e;#n=!1;#r=1;#i=new Map;#s=new Map;constructor(){}static GetInstance(){return n.#e??=new n}get enabled(){return this.#n}set enabled(e){this.SetEnabled(e)}static IsEnabled(){return n.GetInstance().#n}SetEnabled(e){this.#n=e}GetLabel(){return"TraceRegistry global collector"}BeginEvent(e,t=0){return this.#n?this._BeginEvent(e,He,void 0,Gt(),!0,t).time:0}EndEvent(e){return this.#n?this._EndEvent(e,He,void 0,Gt()):0}BeginEventAtTime(e,t,r=0){this.#n&&this._BeginEvent(e,He,void 0,t,!0,r)}EndEventAtTime(e,t){this.#n&&this._EndEvent(e,He,void 0,t)}Scope(e,t,r,i=0){if(!this.#n)return;let s=this.#r++;this.#t(He,new Ie({key:e,type:"Timespan",time:r,startTime:t,laneId:He,eventId:s,parentIsExplicit:!1,category:i}))}MarkerEvent(e,t=0){if(!this.#n)return 0;let r=Gt();return this.#t(He,new Ie({key:e,type:"Marker",time:r,laneId:He,category:t})),r}MarkerEventAtTime(e,t,r=0){this.#n&&this.#t(He,new Ie({key:e,type:"Marker",time:t,laneId:He,category:r}))}RecordCounterDelta(e,t,r=0){this.#n&&this.#t(He,new Ie({key:e,type:"CounterDelta",time:Gt(),laneId:He,value:t,category:r}))}RecordCounterValue(e,t,r=0){this.#n&&this.#t(He,new Ie({key:e,type:"CounterValue",time:Gt(),laneId:He,value:t,category:r}))}StoreData(e,t){if(!this.#n)return;let r=this.#s.get(He)?.at(-1)?.eventId;this.#t(He,new Ie({key:e,type:"ScopeData",time:Gt(),laneId:He,eventId:r,data:t}))}Clear(){this.#i.clear(),this.#s.clear()}CreateCollection(){let e=new Yr;for(let[t,r]of this.#i)e.AddToCollection(t,r);return this.#i=new Map,e}_BeginEvent(e,t,r,i=Gt(),s=!0,o=0){let a=this.#s.get(t)??[],c=s?r??a.at(-1)?.eventId:r,l={eventId:this.#r++,parentEventId:c,laneId:t,key:e,category:o};return a.push(l),this.#s.set(t,a),this.#t(t,new Ie({key:e,type:"Begin",time:i,laneId:t,eventId:l.eventId,parentEventId:l.parentEventId,parentIsExplicit:!0,category:o})),{...l,time:i}}_EndEvent(e,t,r,i=Gt()){let s=this.#s.get(t)??[],o=r===void 0?s.length-1:s.findIndex(c=>c.eventId===r);if(o<0)return this.#t(t,new Ie({key:e,type:"End",time:i,laneId:t,category:0})),i;let a=s[o];return a&&(s.splice(o,1),this.#t(t,new Ie({key:e,type:"End",time:i,laneId:t,eventId:a.eventId,parentEventId:a.parentEventId,parentIsExplicit:!0,category:a.category}))),i}_MarkerEvent(e,t,r=Gt()){return this.#n?(this.#t(t,new Ie({key:e,type:"Marker",time:r,laneId:t})),r):0}_RecordCounter(e,t,r,i,s=Gt()){this.#n&&this.#t(i,new Ie({key:e,type:r?"CounterDelta":"CounterValue",time:s,laneId:i,value:t}))}_BeginTimespan(e,t,r,i=Gt(),s=0){let o=this.#s.get(t)??[],a={eventId:this.#r++,parentEventId:r,laneId:t,key:e,category:s};return o.push(a),this.#s.set(t,o),{...a,time:i}}_EndTimespan(e,t=Gt()){let r=this.#s.get(e.laneId)??[],i=r.findIndex(s=>s.eventId===e.eventId);i>=0&&r.splice(i,1),this.#t(e.laneId,new Ie({key:e.key,type:"Timespan",time:t,startTime:e.time,laneId:e.laneId,eventId:e.eventId,parentEventId:e.parentEventId,parentIsExplicit:!0,category:e.category}))}_StoreData(e,t,r){this.#n&&this.#t(e.laneId,new Ie({key:t,type:"ScopeData",time:Gt(),laneId:e.laneId,eventId:e.eventId,data:r}))}#t(e,t){let r=this.#i.get(e);r?r.push(t):this.#i.set(e,[t])}};var LP=1;function xr(n=`lane-${LP++}`){return{laneId:n}}async function In(n,e,t,r=Le.GetInstance()){if(!r.enabled)return await t(n);let i=r._BeginTimespan(e,n.laneId,n.spanId),s={laneId:n.laneId,spanId:i.eventId};try{return await t(s)}finally{r._EndTimespan(i)}}function qn(n,e,t,r=Le.GetInstance()){if(!r.enabled)return t(n);let i=r._BeginTimespan(e,n.laneId,n.spanId),s={laneId:n.laneId,spanId:i.eventId};try{return t(s)}finally{r._EndTimespan(i)}}function fe(n,e,t){n.spanId!==void 0&&Le.GetInstance()._StoreData({laneId:n.laneId,eventId:n.spanId},e,t)}var OP;function Uu(n){OP?.(n)}var je=class n{constructor(e,t){this.value=e;this.constant=t}static MakeConstant(e){return new n(e,!0)}static MakeVarying(e){return new n(e,!1)}GetValue(){return this.value}IsConstant(){return this.constant}Not(){return new n(!this.value,this.constant)}static And(e,t){let r=e.value,i=t.value,s=e.constant,o=t.constant;return s&&o||!r&&s||!i&&o?n.MakeConstant(r&&i):n.MakeVarying(r&&i)}static Or(e,t){let r=e.value,i=t.value,s=e.constant,o=t.constant;return s&&o||r&&s||i&&o?n.MakeConstant(r||i):n.MakeVarying(r||i)}};function $i(n,e){switch(n.op){case"call":return e(n.call);case"not":return $i(n.operand,e).Not();case"and":return je.And($i(n.left,e),$i(n.right,e));case"or":return je.Or($i(n.left,e),$i(n.right,e))}}var FP=new Set(["and","or","not","true","false"]);function BP(n){return/[A-Za-z_]/.test(n)}function $u(n){return/[A-Za-z0-9_]/.test(n)}function UP(n){return $u(n)||"~!@#$%^&*-+=|\\.?/".includes(n)}var zu=class{constructor(e){this.s=e}pos=0;parse(){if(this.skipBlanks(),this.pos>=this.s.length)return null;let e=this.parseOr();return this.skipBlanks(),e===null||this.pos!==this.s.length?null:e}skipBlanks(){for(;this.pos<this.s.length&&(this.s[this.pos]===" "||this.s[this.pos]==="	");)this.pos++}matchKeyword(e){if(this.s.startsWith(e,this.pos)){let t=this.s[this.pos+e.length]??"";if(t===""||!$u(t))return this.pos+=e.length,!0}return!1}parseOr(){let e=this.parseAnd();if(e===null)return null;for(;;){let t=this.pos;if(this.skipBlanks(),!this.matchKeyword("or")){this.pos=t;break}this.skipBlanks();let r=this.parseAnd();if(r===null){this.pos=t;break}e={op:"or",left:e,right:r}}return e}parseAnd(){let e=this.parseFactor();if(e===null)return null;for(;;){let t=this.pos;if(this.skipBlanks(),this.matchKeyword("and")){this.skipBlanks();let r=this.parseFactor();if(r===null){this.pos=t;break}e={op:"and",left:e,right:r};continue}if(this.pos>t){let r=this.parseFactor();if(r!==null){e={op:"and",left:e,right:r};continue}}this.pos=t;break}return e}parseFactor(){let e=0;for(;;){let i=this.pos;if(this.skipBlanks(),!this.matchKeyword("not")){this.pos=i;break}e++}let t=this.parseCall();if(t===null)return null;let r=t;for(let i=0;i<e;i++)r={op:"not",operand:r};return r}parseCall(){this.skipBlanks();let e=this.parseFuncName();if(e===null)return null;let t=[];if(this.s[this.pos]===":")for(this.pos++,t.push({argName:"",value:this.parseArgVal()});this.s[this.pos]===",";)this.pos++,t.push({argName:"",value:this.parseArgVal()});return{op:"call",call:{funcName:e,args:t}}}parseFuncName(){let e=this.pos;if(this.pos>=this.s.length||!BP(this.s[this.pos]))return null;let t=this.s[this.pos];for(this.pos++;this.pos<this.s.length&&$u(this.s[this.pos]);)t+=this.s[this.pos],this.pos++;return FP.has(t)?(this.pos=e,null):t}parseArgVal(){let e=this.s[this.pos]??"";if(e==='"'||e==="'")return{type:"string",value:this.parseQuoted(e)};let t=this.pos;for(;this.pos<this.s.length&&UP(this.s[this.pos]);)this.pos++;let r=this.s.slice(t,this.pos);return r==="true"?{type:"bool",value:!0}:r==="false"?{type:"bool",value:!1}:/^-?[0-9]+$/.test(r)?{type:"int",value:parseInt(r,10)}:/^-?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/.test(r)&&/[.eE]/.test(r)?{type:"double",value:parseFloat(r)}:{type:"string",value:r}}parseQuoted(e){this.pos++;let t="";for(;this.pos<this.s.length;){let r=this.s[this.pos];if(r===e)return this.pos++,t;if(r==="\\"){let i=this.s[this.pos+1]??"";t+=i,this.pos+=2;continue}t+=r,this.pos++}return t}};function $P(n){return new zu(n).parse()}function zP(n){let e="^";for(let t of n)t==="*"?e+=".*":t==="?"?e+=".":e+=t.replace(/[.+^${}()|[\]\\]/g,"\\$&");return e+="$",new RegExp(e)}var qa=class n{_text;constructor(e){this._text=e instanceof V?e.pathString:e??""}static Everything(){return new n("//")}static EveryDescendant(){return new n(".//")}isEmpty(){return this._text===""}getText(){return this._text}toString(){return this._text}hasTrailingStretch(){return this._text.endsWith("//")}hasLeadingStretch(){return this._text.startsWith("//")}isProperty(){let e=this._text.lastIndexOf("/");return this._text.slice(e+1).includes(".")}getPrefix(){if(!this._text)return V.emptyPath;if(this._text.startsWith("//"))return V.absoluteRootPath;if(this._text.startsWith(".//"))return V.reflexiveRelativePath;let e=this._text.search(/[/]{2}|[*?{]/),t=e<0?this._text:this._text.slice(0,e);return this.isProperty()&&(t=t.slice(0,t.lastIndexOf("."))),t=t.replace(/\/$/,""),V.fromString(t||(this._text.startsWith("/")?"/":"."))}setPrefix(e){let t=this.getPrefix().pathString,r=this._text.slice(t==="."?1:t.length);return this._text=e.isAbsoluteRootPath()&&r.startsWith("//")?r:`${e.pathString}${r}`,this}canAppendChild(e){return!this.isProperty()}appendChild(e){return this.canAppendChild(e)?e?(this._text?this._text.endsWith("//")||this._text.endsWith("/")?this._text+=e:this._text==="."?this._text=e:this._text+=`/${e}`:this._text=e,this):this.appendStretchIfPossible():this}canAppendProperty(e){return!this.isProperty()}appendProperty(e){return!this.canAppendProperty(e)||!e?this:(this.hasTrailingStretch()&&(this._text+="*"),this._text+=`.${e}`,this)}appendStretchIfPossible(){return this.isProperty()||this.hasTrailingStretch()?this:(this._text?this._text==="/"?this._text="//":this._text+="//":this._text=".//",this)}removeTrailingStretch(){return this.hasTrailingStretch()&&(this._text=this._text.slice(0,-2),this._text==="."&&(this._text=""),this._text===""&&(this._text="/")),this}removeTrailingComponent(){return this.isProperty()?this._text=this._text.slice(0,this._text.lastIndexOf(".")):this._text.endsWith("//*")?this._text=this._text.slice(0,-1):this.hasTrailingStretch()&&(this._text=this._text.slice(0,-2)),this}},wn=class n{_components=[];_predPrograms=[];_empty=!0;_text="";_logic;_impliedUnion=!1;_left;_right;_reference;constructor(e){Uu("sdf-pathExpression"),!(e===void 0||e==="")&&(this._text=e.trim(),this._parse(this._text))}static Everything(){return new n("//")}static EveryDescendant(){return new n(".//")}static Nothing(){return new n}static WeakerRef(){return new n("%_")}static MakeAtom(e){return e instanceof qa?new n(e.getText()):e instanceof V?new n(e.pathString):new n(`%${e.path.isEmpty()?"":`${e.path.pathString}:`}${e.name}`)}static MakeComplement(e){return e.isEmpty()?n.Everything():e._isEverything()?n.Nothing():e._logic==="complement"?new n(e._right?.getText()):new n(`~(${e.getText()})`)}static MakeOp(e,t,r){if(e==="difference"&&(t.isEmpty()||r.isEmpty()||t._isEverything()||r._isEverything()))return n.MakeOp("intersection",t,n.MakeComplement(r));if(t.isEmpty())return e==="intersection"?n.Nothing():r;if(r.isEmpty())return e==="intersection"?n.Nothing():t;if(t._isEverything())return e==="intersection"?r:n.Everything();if(r._isEverything())return e==="intersection"?t:n.Everything();let i=e==="intersection"?"&":e==="difference"?"-":e==="union"?"+":"";return new n(i?`(${t.getText()}) ${i} (${r.getText()})`:`(${t.getText()}) (${r.getText()})`)}isEmpty(){return this._empty}_isEverything(){return this._text==="//"&&this._logic===void 0&&this._reference===void 0&&!this._empty}getText(){return this._text}get text(){return this._text}toString(){return this.getText()}getParseError(){return this._empty&&this._text?"Invalid path expression":""}isAbsolute(){return this._reference?!0:this._logic==="complement"?this._right?.isAbsolute()??!0:this._logic?(this._left?.isAbsolute()??!0)&&(this._right?.isAbsolute()??!0):this._text.startsWith("/")}containsExpressionReferences(){return this._reference!==void 0||(this._left?.containsExpressionReferences()??!1)||(this._right?.containsExpressionReferences()??!1)}containsWeakerExpressionReference(){return this._reference?.name==="_"||(this._left?.containsWeakerExpressionReference()??!1)||(this._right?.containsWeakerExpressionReference()??!1)}isComplete(){return!this.containsExpressionReferences()&&this.isAbsolute()}makeAbsolute(e){return this.mapAtoms(t=>t.startsWith("/")||t.startsWith("%")?t:t.startsWith(".//")?`${e.pathString}${t.slice(1)}`:t==="."?e.pathString:KP(t,e))}replacePrefix(e,t){return this.mapAtoms(r=>r===e.pathString||r.startsWith(`${e.pathString}/`)||r.startsWith(`${e.pathString}.`)?t.pathString+r.slice(e.pathString.length):r)}mapPaths(e){return this.mapAtoms(t=>{if(t.startsWith("%")||t.startsWith("//"))return t;let r=V.fromString(t);return r.isEmpty()?t:e(r).pathString})}resolveReferences(e){if(this._reference)return e(this._reference);if(this._logic==="complement")return new n(`~(${this._right.resolveReferences(e).getText()})`);if(this._logic){let t=this._logic==="union"?"+":this._logic==="intersection"?"&":"-",r=this._impliedUnion?" ":` ${t} `;return new n(`${this._left.resolveReferences(e).getText()}${r}${this._right.resolveReferences(e).getText()}`)}return new n(this._text)}composeOver(e){return this.resolveReferences(t=>t.name==="_"?e:new n(`%${t.path.isEmpty()?"":t.path.pathString+":"}${t.name}`))}mapAtoms(e){if(this._reference)return new n(this._text);if(this._logic==="complement")return new n(`~(${this._right.mapAtoms(e).getText()})`);if(this._logic){let t=this._logic==="union"?"+":this._logic==="intersection"?"&":"-",r=this._impliedUnion?" ":` ${t} `;return new n(`${this._left.mapAtoms(e).getText()}${r}${this._right.mapAtoms(e).getText()}`)}return new n(e(this._text))}_addPredicate(e){let t=$P(e);return t===null?-1:(this._predPrograms.push(t),this._predPrograms.length-1)}_parse(e){let t=HP(e);if(t!==e){this._text=t,this._parse(t);return}let r=jP(e);if(r){this._logic=r.op,this._impliedUnion=r.implied,this._left=new n(r.left),this._right=new n(r.right);let c=this._left._predPrograms.length;this._right._offsetPredicateIndices(c),this._predPrograms=[...this._left._predPrograms,...this._right._predPrograms],this._empty=this._left.isEmpty()||this._right.isEmpty();return}if(e.startsWith("~")){this._logic="complement",this._right=new n(e.slice(1).trim()),this._predPrograms=[...this._right._predPrograms],this._empty=this._right.isEmpty();return}if(e.startsWith("%")){let c=/^%(?:(.*):)?([A-Za-z_][A-Za-z0-9_:]*)$/.exec(e);if(!c)return;this._reference={path:c[1]?V.fromString(c[1]):V.fromString(""),name:c[2]},this._empty=!1;return}let i=[],s=0,o=e.length,a=()=>{let c=s;for(;s<o&&e[s]!=="/"&&e[s]!=="{";)s++;let l=e.slice(c,s),u=-1;if(e[s]==="{"){let d=oh(e,s);if(d<0||(u=this._addPredicate(e.slice(s+1,d)),u<0))return!1;s=d+1}return i.push({stretch:!1,text:l,regex:/[*?]/.test(l)?zP(l):void 0,predicateIndex:u}),!0};for(;s<o;)if(e[s]==="/"){if(e[s+1]==="/"){let c={stretch:!0,text:"",regex:void 0,predicateIndex:-1};if(i.push(c),s+=2,e[s]==="{"){let l=oh(e,s);if(l<0||(c.predicateIndex=this._addPredicate(e.slice(s+1,l)),c.predicateIndex<0))return;s=l+1}continue}if(s++,!a())return}else if(!a())return;i.length!==0&&(this._components=i,this._empty=!1)}_offsetPredicateIndices(e){if(e!==0){for(let t of this._components)t.predicateIndex!==-1&&(t.predicateIndex+=e);this._left?._offsetPredicateIndices(e),this._right?._offsetPredicateIndices(e)}}get _stretchEnd(){let e=this._components[this._components.length-1];return e!==void 0&&e.stretch}Match(e,t){if(this._empty)return je.MakeConstant(!1);if(this._reference)return je.MakeVarying(!1);if(this._logic==="complement")return this._right.Match(e,t).Not();if(this._logic){let s=this._left.Match(e,t),o=this._right.Match(e,t);return this._logic==="intersection"?je.And(s,o):this._logic==="difference"?je.And(s,o.Not()):je.Or(s,o)}let r=WP(e);return this._matchFrom(0,0,r,t)?this._stretchEnd?je.MakeConstant(!0):je.MakeVarying(!0):this._descendantCanMatch(r)?je.MakeVarying(!1):je.MakeConstant(!1)}_matchFrom(e,t,r,i){if(e===this._components.length)return t===r.length;let s=this._components[e];if(s.stretch){for(let a=t;a<=r.length;a++){if(s.predicateIndex!==-1){let c=ah(r,a);if(!i(s.predicateIndex,c).value)continue}if(this._matchFrom(e+1,a,r,i))return!0}return!1}if(t>=r.length)return!1;let o=r[t];if(s.regex){if(!s.regex.test(o))return!1}else if(s.text!==""&&s.text!==o)return!1;if(s.predicateIndex!==-1){let a=ah(r,t+1);if(!i(s.predicateIndex,a).value)return!1}return this._matchFrom(e+1,t+1,r,i)}_descendantCanMatch(e){let t=0;for(let r of this._components){if(r.stretch||t>=e.length||r.regex||r.predicateIndex!==-1)return!0;if(r.text!==""&&r.text!==e[t])return!1;t++}return!1}EvalPredicate(e,t){let r=this._predPrograms[e];return r===void 0?je.MakeVarying(!1):$i(r,t)}},gt=class n{constructor(e){this.text=e;this._expression=new wn(e)}_expression;composeOver(e){return new n(this._expression.composeOver(new wn(e.text)).getText())}makeAbsolute(e){return new n(this._expression.makeAbsolute(e).getText())}mapPaths(e){return new n(this._expression.mapPaths(e).getText())}};function HP(n){if(!n.startsWith("(")||!n.endsWith(")"))return n;let e=0;for(let t=0;t<n.length;t++)if(n[t]==="("?e++:n[t]===")"&&e--,e===0&&t!==n.length-1)return n;return e===0?n.slice(1,-1).trim():n}function jP(n){let e=o=>{let a=0,c=0,l="";for(let u=n.length-1;u>=0;u--){let d=n[u];if(l){d===l&&n[u-1]!=="\\"&&(l="");continue}if(d==='"'||d==="'"){l=d;continue}if(d===")"){a++;continue}if(d==="("){a--;continue}if(d==="}"){c++;continue}if(d==="{"){c--;continue}if(!(a||c)){if(!/\s/.test(d)&&o.includes(d))return{index:u,op:d==="&"?"intersection":d==="-"?"difference":"union",whitespace:!1};if(o.includes(" ")&&/\s/.test(d)){let p=u;for(;p>0&&/\s/.test(n[p-1]);)p--;let f=n.slice(0,p).trim(),h=n.slice(u+1).trim();if(f&&h&&!/[+&\-~]$/.test(f)&&!/^[+&\-]/.test(h))return{index:p,op:"union",whitespace:!0};u=p}}}},t=e("+- ")??e("&");if(!t)return;let r=t.whitespace?n.slice(t.index).search(/\S/)+t.index:t.index+1,i=n.slice(0,t.index).trim(),s=n.slice(r).trim();return i&&s?{left:i,right:s,op:t.op,implied:t.whitespace}:void 0}function oh(n,e){let t=e+1,r="";for(;t<n.length;){let i=n[t];if(r){if(i==="\\"){t+=2;continue}i===r&&(r=""),t++;continue}if(i==='"'||i==="'"){r=i,t++;continue}if(i==="}")return t;t++}return-1}function WP(n){return n.isAbsoluteRootPath()||n.isEmpty()?[]:n.pathString.split("/").filter(e=>e.length>0)}function ah(n,e){return V.fromString("/"+n.slice(0,e).join("/"))}function KP(n,e){let t=n.indexOf("//"),r=t<0?n:n.slice(0,t),i=t<0?"":n.slice(t),s=e.pathString.split("/").filter(Boolean),o=r.replace(/^\.\//,"").split("/");for(let a of o)!a||a==="."||(a===".."?s.pop():s.push(a));return`/${s.join("/")}${i}`}var Qe=class{constructor(e=0,t=0,r=0,i=0,s=0){this.protoStart=e;this.protoEnd=t;this.numPreLoops=r;this.numPostLoops=i;this.valueOffset=s}GetPrototypeInterval(){return[this.protoStart,this.protoEnd]}GetLoopedInterval(){let e=Math.max(0,this.protoEnd-this.protoStart);return[this.protoStart-Math.max(0,this.numPreLoops)*e,this.protoEnd+Math.max(0,this.numPostLoops)*e]}},We=class{constructor(e=1,t=0,r){this.mode=e;this.slope=t;this.loopBoundaryTime=r}loopBoundaryTime;IsLooping(){return this.mode>=4}},Zr=class{polylines=[]},Jr=class extends Zr{sources=[]};var yt=class n{#e=0;#n=1;#r=0;#i=!1;#s=0;#t=0;#o=0;#a=0;#c=0;#l=0;#u=0;#p=0;#d={};valueType;constructor(e=z.Declare("double")){if(e instanceof z){this.valueType=e;return}let t=e;this.valueType=z.Declare(t.typeName??"double"),t.curveType!==void 0&&(this.#r=t.curveType),t.time!==void 0&&(this.#e=t.time),t.nextInterp!==void 0&&(this.#n=t.nextInterp),t.value!==void 0&&(this.#s=t.value),t.preValue!==void 0&&(this.#i=!0,this.#t=t.preValue),t.customData!==void 0&&(this.#d=structuredClone(t.customData)),t.preTanWidth!==void 0&&(this.#o=t.preTanWidth),t.preTanSlope!==void 0&&(this.#c=t.preTanSlope),t.postTanWidth!==void 0&&(this.#a=t.postTanWidth),t.postTanSlope!==void 0&&(this.#l=t.postTanSlope),t.preTanAlgorithm!==void 0&&(this.#u=t.preTanAlgorithm),t.postTanAlgorithm!==void 0&&(this.#p=t.postTanAlgorithm)}clone(){let e=new n(this.valueType);return e.#e=this.#e,e.#n=this.#n,e.#r=this.#r,e.#i=this.#i,e.#s=this.#s,e.#t=this.#t,e.#o=this.#o,e.#a=this.#a,e.#c=this.#c,e.#l=this.#l,e.#u=this.#u,e.#p=this.#p,e.#d=structuredClone(this.#d),e}equals(e){return JSON.stringify(this.toJSON())===JSON.stringify(e.toJSON())}toJSON(){return[this.#e,this.#n,this.#i,this.#s,this.GetPreValue(),this.#o,this.#a,this.#c,this.#l,this.#u,this.#p,this.#d]}GetValueType(){return this.valueType}GetValueTypeName(){return this.valueType.GetTypeName()}GetTime(){return this.#e}GetNextInterpolation(){return this.#n}GetCurveType(){return this.#r}IsDualValued(){return this.#i}GetValue(){return this.#s}GetPreValue(){return this.#i?this.#t:this.#s}GetPreTanWidth(){return this.#o}GetPostTanWidth(){return this.#a}GetPreTanSlope(){return this.#c}GetPostTanSlope(){return this.#l}GetPreTanAlgorithm(){return this.#u}GetPostTanAlgorithm(){return this.#p}GetCustomData(){return structuredClone(this.#d)}SetTime(e){return Number.isFinite(e)?(this.#e=e,!0):!1}SetNextInterpolation(e){return this.#n=e,!0}SetCurveType(e){return this.#r=e,!0}SetValue(e){return Number.isFinite(e)?(this.#s=e,!0):!1}SetPreValue(e){return Number.isFinite(e)?(this.#i=!0,this.#t=e,!0):!1}ClearPreValue(){this.#i=!1}SetPreTanWidth(e){return e<0||!Number.isFinite(e)?!1:(this.#o=e,!0)}SetPostTanWidth(e){return e<0||!Number.isFinite(e)?!1:(this.#a=e,!0)}SetPreTanSlope(e){return Number.isFinite(e)?(this.#c=e,!0):!1}SetPostTanSlope(e){return Number.isFinite(e)?(this.#l=e,!0):!1}SetPreTanAlgorithm(e){return this.#u=e,!0}SetPostTanAlgorithm(e){return this.#p=e,!0}SetCustomData(e){return this.#d=structuredClone(e),!0}SetCustomDataByKey(e,t){return this.#d[e]=structuredClone(t),!0}GetCustomDataByKey(e){return structuredClone(this.#d[e])}UpdateTangents(e,t,r=0){let i=a=>{let c=a?this.#u:this.#p,l=a?e:t;if(!l)return c!==2;if(c!==2){if(r===1){let f=Math.abs(l.GetTime()-this.#e)/3;a?this.#o=f:this.#a=f}return!0}let u=!e||!t||this.#i||this.#n===0||e.GetNextInterpolation()===0,d=0;if(!u){let f=(this.#s-e.GetValue())/(this.#e-e.GetTime()),h=(t.GetPreValue()-this.#s)/(t.GetTime()-this.#e);if(f*h>0){let g=(this.#e-e.GetTime())/(t.GetTime()-e.GetTime())-.5,m=.5+g*(.5+2*g*g);d=(1-m)*f+m*h,d=h>0?Math.min(d,3*h,3*f):Math.max(d,3*h,3*f)}}let p=Math.abs(l.GetTime()-this.#e)/3;return a?(this.#c=d,this.#o=p):(this.#l=d,this.#a=p),!0},s=i(!0),o=i(!1);return s||o}};var bt=class extends Array{static get[Symbol.species](){return Array}has(e){return this.some(t=>t.GetTime()===e)}get(e){return this.find(t=>t.GetTime()===e)}set(e,t){t.SetTime(e);let r=this.findIndex(i=>i.GetTime()===e);return r>=0?this.splice(r,1,t):this.push(t),this.sort((i,s)=>i.GetTime()-s.GetTime()),this}};var Zs=2,we=class n{#e=!1;#n=0;#r=new We;#i=new We;#s=new Qe;#t=new bt;valueType;constructor(e=z.Declare("double")){this.valueType=typeof e=="string"?z.Declare(e):e}clone(){let e=new n(this.valueType);return e.#e=this.#e,e.#n=this.#n,e.#r=Tr(this.#r),e.#i=Tr(this.#i),e.#s=Hu(this.#s),e.#t=new bt(...this.#t.map(t=>t.clone())),e}GetValueType(){return this.valueType}GetValueTypeName(){return this.valueType.GetTypeName()}IsTimeValued(){return this.#e}GetCurveType(){return this.#n}GetPreExtrapolation(){return Tr(this.#r)}GetPostExtrapolation(){return Tr(this.#i)}GetInnerLoopParams(){return Hu(this.#s)}GetKnots(e){let t=e?this.#t.filter(r=>ju(e,r.GetTime())):this.#t;return new bt(...t.map(r=>r.clone()))}GetKnot(e){return this.#t.get(e)?.clone()}SetTimeValued(e){this.#e=e}SetCurveType(e){this.#n=e,this.#f()}SetPreExtrapolation(e){this.#r=Tr(e)}SetPostExtrapolation(e){this.#i=Tr(e)}SetInnerLoopParams(e){this.#s=Hu(e)}SetKnots(e){this.#t=new bt(...e.map(t=>t.clone()).sort(ch)),this.#f()}SetKnot(e){let t=this.#t.get(e.GetTime());this.#t.set(e.GetTime(),e.clone()),this.#f(),this.AdjustRegressiveTangents();let r=this.#t.findIndex(i=>i.GetTime()===e.GetTime());return[this.#t[Math.max(0,r-1)]?.GetTime()??e.GetTime(),this.#t[Math.min(this.#t.length-1,r+1)]?.GetTime()??e.GetTime()]}RemoveKnot(e){let t=this.#t.findIndex(r=>r.GetTime()===e);t>=0&&this.#t.splice(t,1),this.#f()}ClearKnots(){this.#t=new bt}IsPreExtrapolationValid(){return this.#d(this.#r)}IsPostExtrapolationValid(){return this.#d(this.#i)}IsEmpty(){return this.#t.length===0}HasValueBlocks(){return this.#r.mode===0||this.#i.mode===0||this.#t.some(e=>e.GetNextInterpolation()===0)}HasLoops(){return this.HasInnerLoops()||this.HasExtrapolatingLoops()}HasInnerLoops(){let e=this.#s;return e.protoEnd>e.protoStart&&this.#t.has(e.protoStart)&&(e.numPreLoops>0||e.numPostLoops>0)}HasExtrapolatingLoops(){return this.#r.IsLooping()||this.#i.IsLooping()}HasValueBlockAtTime(e){return this.Eval(e)===void 0}DoSidesDiffer(e){return this.EvalPreValue(e)!==this.Eval(e)}static IsSupportedValueType(e){let t=typeof e=="string"?e:e.GetTypeName();return["double","float","GfHalf","GfTimeCode"].includes(t)}static GetAntiRegressionAuthoringMode(){return Zs}GetAntiRegressionAuthoringMode(){return Zs}Eval(e){return this.#o(e,!1,!1,!1)}EvalPreValue(e){return this.#o(e,!0,!1,!1)}EvalHeld(e){return this.#o(e,!1,!1,!0)}EvalPreValueHeld(e){return this.#o(e,!0,!1,!0)}EvalDerivative(e){return this.#o(e,!1,!0,!1)}EvalPreDerivative(e){return this.#o(e,!0,!0,!1)}#o(e,t,r,i){if(!Number.isFinite(e)||this.#t.length===0)return;let s=this.#u(e,t);if(s){let p=this.#p(s.time,s.pre,r,i);return p===void 0||r?p:p+s.valueOffset}let o=this.#t[0],a=this.#t[this.#t.length-1];if(e<o.GetTime()||t&&e===o.GetTime())return this.#c(this.#r,e,!0,r,i);if(e>a.GetTime())return this.#c(this.#i,e,!1,r,i);let c=this.#t.findIndex(p=>p.GetTime()===e);if(c>=0){let p=this.#t[c];return t?c===0?this.#c(this.#r,e,!0,r,i):r?i?0:ti(this.#t[c-1],p,1,this.#n):p.GetPreValue():c===this.#t.length-1&&this.#i.mode===0?void 0:r?i?0:c===this.#t.length-1?this.#a():ti(p,this.#t[c+1],0,this.#n):p.GetValue()}let l=1;for(;this.#t[l].GetTime()<e;)l++;let u=this.#t[l-1],d=this.#t[l];return i?u.GetNextInterpolation()===0?void 0:u.GetValue():r?ZP(u,d,e,this.#n):YP(u,d,e,this.#n)}#a(){let e=this.#i;if(e.mode!==0)return e.mode===1?0:e.mode===3?e.slope:this.#t.length<2?0:ti(this.#t[this.#t.length-2],this.#t[this.#t.length-1],1,this.#n)}#c(e,t,r,i,s){let o=r?this.#t[0]:this.#t[this.#t.length-1];if(e.mode===0)return;if(e.IsLooping()&&this.#t.length>1){let l=this.#l(e,t,r);if(!l)return;let u=this.#o(l.time,l.pre,i,s);return u===void 0?void 0:i?l.reverse?-u:u:u+l.valueOffset}if(i)return s||e.mode===1||this.#t.length<2?0:e.mode===3?e.slope:r?ti(this.#t[0],this.#t[1],0,this.#n):ti(this.#t[this.#t.length-2],o,1,this.#n);let a=r?o.GetPreValue():o.GetValue();if(s||e.mode===1||this.#t.length<2)return a;let c=e.mode===3?e.slope:r?ti(this.#t[0],this.#t[1],0,this.#n)??0:ti(this.#t[this.#t.length-2],o,1,this.#n)??0;return a+c*(t-o.GetTime())}#l(e,t,r){let i=this.#t[0],s=this.#t[this.#t.length-1],o=i.GetTime(),a=s.GetTime();if(e.loopBoundaryTime!==void 0){if(!this.#t.has(e.loopBoundaryTime))return;r?o=e.loopBoundaryTime:a=e.loopBoundaryTime}let c=a-o;if(c<=0)return{time:r?o:a,pre:!1,valueOffset:0,reverse:!1};let l=Math.floor((t-o)/c),u=t-l*c;u<o&&(u+=c);let d=e.mode===6&&Math.abs(l)%2===1;d&&(u=o+a-u);let p=(this.#o(a,!0,!1,!1)??0)-(this.#o(o,!1,!1,!1)??0),f=e.mode===4?l*p:0;return{time:u,pre:d,valueOffset:f,reverse:d}}#u(e,t){if(!this.HasInnerLoops())return;let r=this.#s,i=r.protoEnd-r.protoStart,s=r.protoStart-r.numPreLoops*i,o=r.protoEnd+r.numPostLoops*i;if(e<s||e>o)return;let a=Math.floor((e-r.protoStart)/i);e===o&&!t&&a--;let c=e-a*i;return{time:c,pre:t&&c===r.protoStart,valueOffset:a*r.valueOffset}}#p(e,t,r,i){let s=this.#s,o=this.clone();o.#s=new Qe,o.#t=new bt(...o.#t.filter(l=>l.GetTime()>=s.protoStart&&l.GetTime()<s.protoEnd));let a=o.#t.get(s.protoStart);if(!a)return;let c=a.clone();return c.SetTime(s.protoEnd),c.SetValue(a.GetValue()+s.valueOffset),a.IsDualValued()&&c.SetPreValue(a.GetPreValue()+s.valueOffset),o.#t.set(s.protoEnd,c),o.#o(e,t,r,i)}CanBreakdown(e){if(!Number.isFinite(e))return{value:!1,reason:"Time is not finite"};if(this.#t.has(e))return{value:!1,reason:"A knot already exists at the requested time"};if(this.#r.IsLooping()||this.#i.IsLooping()){let t=this.#t[0]?.GetTime()??0,r=this.#t[this.#t.length-1]?.GetTime()??0;if(e<t||e>r)return{value:!1,reason:"Cannot break down extrapolating loops"}}return{value:this.Eval(e)!==void 0,reason:this.Eval(e)===void 0?"No value at requested time":""}}Breakdown(e){if(!this.CanBreakdown(e).value)return;let t=this.Eval(e),r=this.EvalDerivative(e)??0,i=this.EvalPreDerivative(e)??r,s=this.#t.findIndex(l=>l.GetTime()>e),o=s>0?this.#t[s-1]:void 0,a=s>=0?this.#t[s]:void 0,c=new yt(this.valueType);return c.SetTime(e),c.SetValue(t),c.SetNextInterpolation(o?.GetNextInterpolation()??1),c.SetPreTanSlope(i),c.SetPostTanSlope(r),o&&c.SetPreTanWidth((e-o.GetTime())/3),a&&c.SetPostTanWidth((a.GetTime()-e)/3),this.SetKnot(c)}Sample(e,t,r,i,s=!1){if(e.IsEmpty?.()||t===0||i<0)return;let o=s?new Jr:new Zr,a=[],c=(u,d,p)=>{let f=this.Eval(u),h=this.Eval(d);if(f===void 0||h===void 0)return;let y=(u+d)/2,g=this.Eval(y);if(g===void 0)return;let m=(f+h)/2;p<20&&Math.abs((g-m)*r)>i?(c(u,y,p+1),c(y,d,p+1)):((a.length===0||a.at(-1)[0]!==u)&&a.push([u*t,f*r]),a.push([d*t,h*r]))},l=[e.GetMin(),...this.#t.map(u=>u.GetTime()).filter(u=>u>e.GetMin()&&u<e.GetMax()),e.GetMax()];for(let u=0;u+1<l.length;u++)c(l[u],l[u+1],0);return o.polylines.push(a),o instanceof Jr&&o.sources.push(5),o}HasRegressiveTangents(){return this.#n!==0?!1:this.#t.some((e,t)=>{let r=this.#t[t+1];return r?Ku(e.GetPostTanWidth(),r.GetPreTanWidth(),r.GetTime()-e.GetTime()):!1})}AdjustRegressiveTangents(){if(this.#n!==0||Zs===0)return!1;let e=!1;for(let t=0;t+1<this.#t.length;t++){let r=this.#t[t],i=this.#t[t+1],s=i.GetTime()-r.GetTime(),o=r.GetPostTanWidth(),a=i.GetPreTanWidth();if(Ku(o,a,s)){if(Zs===1)o=Math.min(o,s),a=Math.min(a,s);else if(Zs===3)a=Math.max(0,s-o);else{let c=s/(o+a);o*=c,a*=c}r.SetPostTanWidth(o),i.SetPreTanWidth(a),e=!0}}return e}GetTimeScaled(e,t){if(e===0)return new n;let r=this.clone(),i=r.#t.map(o=>{let a=o.clone();a.SetTime(o.GetTime()*e+t);let c=Math.abs(e);return a.SetPreTanWidth(o.GetPreTanWidth()*c),a.SetPostTanWidth(o.GetPostTanWidth()*c),a.SetPreTanSlope(o.GetPreTanSlope()/e),a.SetPostTanSlope(o.GetPostTanSlope()/e),a}).sort(ch);r.#t=new bt(...i);let s=r.#s;return s.protoStart=s.protoStart*e+t,s.protoEnd=s.protoEnd*e+t,s.protoStart>s.protoEnd&&([s.protoStart,s.protoEnd]=[s.protoEnd,s.protoStart]),r.#r.slope/=e,r.#i.slope/=e,e<0&&([r.#r,r.#i]=[r.#i,r.#r]),r}GetTruncated(e,t=new We(1),r=new We(1)){if(e.IsEmpty?.())return new n;let i=this.clone(),s=e.GetMin(),o=e.GetMax();return Number.isFinite(s)&&!i.#t.has(s)&&i.Eval(s)!==void 0&&i.Breakdown(s),Number.isFinite(o)&&!i.#t.has(o)&&i.Eval(o)!==void 0&&i.Breakdown(o),i.#t=new bt(...i.#t.filter(a=>ju(e,a.GetTime()))),i.#r=Tr(t),i.#i=Tr(r),i.#s=new Qe,i}GetKnotsWithInnerLoopsBaked(){if(!this.HasInnerLoops())return this.GetKnots();let e=this.#s,t=e.protoEnd-e.protoStart,r=new bt;for(let o of this.#t)(o.GetTime()<e.protoStart-e.numPreLoops*t||o.GetTime()>e.protoEnd+e.numPostLoops*t)&&r.push(o.clone());let i=this.#t.filter(o=>o.GetTime()>=e.protoStart&&o.GetTime()<e.protoEnd);for(let o=-e.numPreLoops;o<=e.numPostLoops;o++)for(let a of i){let c=a.clone();c.SetTime(a.GetTime()+o*t),c.SetValue(a.GetValue()+o*e.valueOffset),a.IsDualValued()&&c.SetPreValue(a.GetPreValue()+o*e.valueOffset),r.set(c.GetTime(),c)}let s=this.#t.get(e.protoStart);if(s){let o=e.numPostLoops+1,a=s.clone();a.SetTime(e.protoStart+o*t),a.SetValue(s.GetValue()+o*e.valueOffset),s.IsDualValued()&&a.SetPreValue(s.GetPreValue()+o*e.valueOffset),r.set(a.GetTime(),a)}return r}BakeInnerLoops(){return this.HasInnerLoops()?(this.#t=this.GetKnotsWithInnerLoopsBaked(),this.#s=new Qe,!0):!1}GetKnotsWithLoopsBaked(e){let t=this.GetKnotsWithInnerLoopsBaked(),r=Math.max(.001,(e.GetMax()-e.GetMin())/100);for(let i=e.GetMin();i<=e.GetMax();i+=r){if(this.Eval(i)===void 0)continue;let s=new yt(this.valueType);s.SetTime(i),s.SetValue(this.Eval(i)),s.SetNextInterpolation(2),t.set(i,s)}return t}Diff(e,t){let i=[...new Set([...this.#t.map(s=>s.GetTime()),...e.#t.map(s=>s.GetTime())])].filter(s=>(!t||ju(t,s))&&(this.Eval(s)!==e.Eval(s)||this.EvalPreValue(s)!==e.EvalPreValue(s)));return i.length?[Math.min(...i),Math.max(...i)]:void 0}static Concatenate(e){let t=e.filter(i=>!i.IsEmpty());if(!t.length)return new n;let r=new n(t[0].valueType);r.#r=t[0].GetPreExtrapolation(),r.#i=t.at(-1).GetPostExtrapolation();for(let i of t){if(i.GetValueTypeName()!==r.GetValueTypeName()||i.HasInnerLoops())return new n;for(let s of i.#t)r.#t.set(s.GetTime(),s.clone())}return r}#d(e){return e.loopBoundaryTime===void 0||this.#t.has(e.loopBoundaryTime)}#f(){for(let e=0;e<this.#t.length;e++)this.#t[e].UpdateTangents(this.#t[e-1],this.#t[e+1],this.#n)}};function Tr(n){return new We(n.mode,n.slope,n.loopBoundaryTime)}function Hu(n){return new Qe(n.protoStart,n.protoEnd,n.numPreLoops,n.numPostLoops,n.valueOffset)}function ch(n,e){return n.GetTime()-e.GetTime()}function ju(n,e){return(e>n.GetMin()||e===n.GetMin()&&(n.IsMinClosed?.()??!0))&&(e<n.GetMax()||e===n.GetMax()&&(n.IsMaxClosed?.()??!0))}function qu(n,e){return(e.GetPreValue()-n.GetValue())/(e.GetTime()-n.GetTime())}function Wu(n,e,t,r){return{a:-n+3*e-3*t+r,b:3*n-6*e+3*t,c:-3*n+3*e,d:n}}function qP(n,e){return e*(e*(e*n.a+n.b)+n.c)+n.d}function lh(n,e){return e*(3*n.a*e+2*n.b)+n.c}function QP(n){let e=h=>h.reduce((y,g)=>Math.abs(g-.5)<Math.abs(y-.5)?g:y);if(Math.abs(n.a)<=1e-10){if(Math.abs(n.b)<=1e-10)return Math.abs(n.c)<=1e-10?0:-n.d/n.c;let h=Math.sqrt(n.c*n.c-4*n.b*n.d);return e([(-n.c-h)/(2*n.b),(-n.c+h)/(2*n.b)])}let r=n.b/n.a,i=n.c/n.a,s=n.d/n.a,a=(3*i-r*r)/3/3,c=a*a*a,l=(2*r*r*r-9*r*i+27*s)/27,u=l/2,d=u*u+c,p=r/3;if(d<0){let h=Math.sqrt(-c),y=Math.acos(Math.max(-1,Math.min(1,-l/(2*h)))),g=2*Math.cbrt(h);return e([g*Math.cos(y/3)-p,g*Math.cos((y+2*Math.PI)/3)-p,g*Math.cos((y+4*Math.PI)/3)-p])}if(d===0){let h=-Math.cbrt(u);return e([2*h-p,-h-p])}let f=Math.sqrt(d);return Math.cbrt(f-u)-Math.cbrt(f+u)-p}function XP(n,e){let t=e.GetTime()-n.GetTime(),r=n.GetPostTanWidth(),i=e.GetPreTanWidth();if(Ku(r,i,t)){let s=t/(r+i);r*=s,i*=s}return[r,i]}function Ku(n,e,t){return n+e>t&&n+e>0}function ph(n,e,t){let[r,i]=XP(n,e),s=Wu(n.GetTime(),n.GetTime()+r,e.GetTime()-i,e.GetTime()),o=Wu(n.GetValue(),n.GetValue()+r*n.GetPostTanSlope(),e.GetPreValue()-i*e.GetPreTanSlope(),e.GetPreValue()),a=Wu(n.GetTime()-t,n.GetTime()+r-t,e.GetTime()-i-t,e.GetTime()-t);return{t:Math.max(0,Math.min(1,QP(a))),x:s,y:o}}function YP(n,e,t,r){switch(n.GetNextInterpolation()){case 0:return;case 1:return n.GetValue();case 2:return n.GetValue()+qu(n,e)*(t-n.GetTime())}let i=e.GetTime()-n.GetTime();if(r===1){let o=(t-n.GetTime())/i,a=o*o,c=a*o;return(2*c-3*a+1)*n.GetValue()+(c-2*a+o)*n.GetPostTanSlope()*i+(-2*c+3*a)*e.GetPreValue()+(c-a)*e.GetPreTanSlope()*i}let s=ph(n,e,t);return qP(s.y,s.t)}function ZP(n,e,t,r){if(n.GetNextInterpolation()===0)return;if(n.GetNextInterpolation()===1)return 0;if(n.GetNextInterpolation()===2)return qu(n,e);let i=e.GetTime()-n.GetTime();if(r===1){let a=(t-n.GetTime())/i,c=a*a;return((6*c-6*a)*n.GetValue()+(3*c-4*a+1)*n.GetPostTanSlope()*i+(-6*c+6*a)*e.GetPreValue()+(3*c-2*a)*e.GetPreTanSlope()*i)/i}let s=ph(n,e,t),o=lh(s.x,s.t);return o===0?0:lh(s.y,s.t)/o}function ti(n,e,t,r){if(n.GetNextInterpolation()!==0)return n.GetNextInterpolation()===1?0:n.GetNextInterpolation()===2?qu(n,e):t===0?n.GetPostTanSlope():e.GetPreTanSlope()}var Qu=class{#e=0;#n;constructor(e){this.#n=new DataView(e.buffer,e.byteOffset,e.byteLength)}get remaining(){return this.#n.byteLength-this.#e}u8(){return this.#n.getUint8(this.#e++)}u16(){let e=this.#n.getUint16(this.#e,!0);return this.#e+=2,e}u32(){let e=this.#n.getUint32(this.#e,!0);return this.#e+=4,e}i32(){let e=this.#n.getInt32(this.#e,!0);return this.#e+=4,e}f32(){let e=this.#n.getFloat32(this.#e,!0);return this.#e+=4,e}f64(){let e=this.#n.getFloat64(this.#e,!0);return this.#e+=8,e}};function JP(n){let e=(n&32768)<<16,t=n>>10&31,r=n&1023,i;if(t===0)if(r===0)i=e;else{for(t=1;(r&1024)===0;)r<<=1,t--;r&=1023,i=e|t+112<<23|r<<13}else t===31?i=e|2139095040|r<<13:i=e|t+112<<23|r<<13;let s=new ArrayBuffer(4),o=new DataView(s);return o.setUint32(0,i,!0),o.getFloat32(0,!0)}var Js=class{static CreateSplineFromBinaryData(e,t){if(e.byteLength===0)return new we;let r=new Qu(e),i=r.u8(),s=i&15;if(s!==1&&s!==2)throw new Error(`Unknown spline data version ${s}`);let o=(i&48)>>4,c=["double","double","float","GfHalf"][o];if(c===void 0)throw new Error("Bad spline type descriptor");let l=z.Declare(c),u=new we(l);u.SetTimeValued(!!(i&64));let d=(i&128)>>7;u.SetCurveType(d);let p=r.u8(),f=p&7,h=(p&24)>>3;u.SetPreExtrapolation(new We(f,f===3?r.f64():0)),u.SetPostExtrapolation(new We(h,h===3?r.f64():0)),p&64&&u.SetInnerLoopParams(new Qe(r.f64(),r.f64(),r.i32(),r.i32(),r.f64()));let y=()=>{if(o===1)return r.f64();if(o===2)return r.f32();if(o===3)return JP(r.u16());throw new Error("Cannot read knots for an untyped spline")},g=[];{let m=r.u32();for(;m-- >0;){let P=r.u8(),b=new yt(l);if(b.SetNextInterpolation((P&6)>>1),b.SetCurveType((P&8)>>3),b.SetTime(r.f64()),b.SetValue(y()),P&1&&b.SetPreValue(y()),d!==1&&(b.SetPreTanWidth(r.f64()),b.SetPostTanWidth(r.f64())),b.SetPreTanSlope(y()),b.SetPostTanSlope(y()),s>1){let S=r.u8();b.SetPreTanAlgorithm(S&15),b.SetPostTanAlgorithm(S>>4)}b.SetCustomData(t.get(b.GetTime())??{}),g.push(b)}}if(r.remaining!==0)throw new Error(`Unread spline data: ${r.remaining} bytes`);return u.SetKnots(g),u}};var zR=Object.freeze({name:"Ts"});var Pt=class n{#e;#n;#r;constructor(e="",t=""){typeof e=="string"?(this.#e=e,this.#n="",this.#r=t):(this.#e=e.authoredPath??"",this.#n=e.evaluatedPath??"",this.#r=e.resolvedPath??"")}getAuthoredPath(){return this.#e}getEvaluatedPath(){return this.#n}getAssetPath(){return this.#n||this.#e}getResolvedPath(){return this.#r}equals(e){return e instanceof n&&e.#e===this.#e&&e.#n===this.#n&&e.#r===this.#r}};var Q=class n{equals(e){return e instanceof n}toString(){return"Sdf.ValueBlock()"}},ke=class n{equals(e){return e instanceof n}toString(){return"Sdf.AnimationBlock()"}},eo=class{constructor(e,t){this.value=e;this.typeName=t}};function NS(n){let e={};for(let t of n.getSpecPaths()){let r={};for(let i of n.getFieldNames(t))r[i]={value:n.getField(t,i)};e[t]=r}return e}function Ya(n){let e=NS(n),t=["#usda 1.0"],r=GS(e);if(r.length>0){t.push("(");for(let o of r)t.push(o);t.push(")")}let i=e["/"]?.primOrder?.value;Array.isArray(i)&&i.length>1&&(t.push(""),t.push(`reorder rootPrims = [${i.map(o=>ue(o,!1)).join(", ")}]`));let s=e["/"]?.primChildren?.value??[];for(let o of s)t.push(""),Ih(e,`/${o}`,t,0);return t.push("",""),t.join(`
`)}var VS=new Set(["specifier","typeName","primChildren","primOrder","properties","comment","subLayerOffsets","layerRelocates","relocates"]);function GS(n){let e=n["/"];if(!e)return[];let t=[],r=e.comment?.value;typeof r=="string"&&r!==""&&t.push(`    ${ue(r)}`);let i=e.layerRelocates?.value??e.relocates?.value;if(i&&typeof i=="object"){let o=Array.isArray(i)?i.filter(a=>Array.isArray(a)&&a.length===2&&typeof a[0]=="string"&&typeof a[1]=="string"):Object.entries(i).filter(a=>typeof a[1]=="string");o.length===0?t.push("    relocates = {}"):t.push(["    relocates = {",...o.map(([a,c],l)=>`        <${a}>: <${c}>${l+1<o.length?",":""}`),"    }"].join(`
`))}let s=Object.keys(e).filter(o=>!VS.has(o)).sort();for(let o of s){let a=e[o]?.value;if(a!==void 0)if(o==="subLayers"){let c=a;if(!Array.isArray(c)||c.length===0)continue;let l=e.subLayerOffsets?.value??[];t.push("    subLayers = ["),c.forEach((u,d)=>{let p=l[d],f=p&&(p.offset!==0||p.scale!==1)?` ${xh(p)}`:"";t.push(`        @${u}@${f}${d<c.length-1?",":""}`)}),t.push("    ]")}else o==="doc"?t.push(`    doc = ${ue(String(a))}`):no(a)?t.push(...Ah(o,a,1)):typeof a=="string"?t.push(`    ${o} = ${ue(a)}`):typeof a=="number"?t.push(`    ${o} = ${un(a)}`):typeof a=="boolean"&&t.push(`    ${o} = ${a}`)}return t}function xh(n){let e=[];return n.offset!==0&&e.push(`offset = ${un(n.offset)}`),n.scale!==1&&e.push(`scale = ${un(n.scale)}`),`(${e.join("; ")})`}function MS(n){let e="";n.assetPath&&(e+=`@${n.assetPath}@`),n.primPath&&(e+=`<${n.primPath}>`);let t=n.layerOffset;return t&&(t.offset!==0||t.scale!==1)&&(e+=` ${xh(t)}`),e}function to(n,e,t,r=!1){let i=[],s=(o,a)=>{if(!a||a.length===0)return;let c=a.map(t),l=r&&c.length===1?c[0]:c.length>1&&o===""&&n!=="apiSchemas"&&n!=="variantSets"?`[
${c.map((u,d)=>`\0    ${u}${d+1<c.length?",":""}`).join(`
`)}
\0]`:`[${c.join(", ")}]`;i.push(`${o}${n} = ${l}`)};return e.isExplicit?s("",e.explicitItems):(s("delete ",e.deletedItems),s("add ",e._sdfAddedItems),s("prepend ",e.prependedItems),s("append ",e.appendedItems?.filter(o=>!(e._sdfAddedItems??[]).some(a=>JSON.stringify(a)===JSON.stringify(o)))),s("reorder ",e.orderedItems)),i}function no(n){return n!==null&&typeof n=="object"&&!Array.isArray(n)&&Object.getPrototypeOf(n)===Object.prototype}function Th(n,e,t,r){let i=Wt(t),s=/^[A-Za-z_][A-Za-z0-9_]*$/.test(n)?n:ue(n,!1);if(no(e)){let o=[`${i}dictionary ${s} = {`],a=Ui(e);for(let c of Object.keys(e).sort())o.push(...Th(c,e[c],t+1,a?.get(c)));return o.push(`${i}}`),o}if(e instanceof Pt)return[`${i}asset ${s} = ${ji(e.getAssetPath())}`];if(r==="asset"&&typeof e=="string")return[`${i}asset ${s} = ${ji(e)}`];if(r==="asset[]"&&Array.isArray(e))return[`${i}asset[] ${s} = [${e.map(o=>ji(o instanceof Pt?o.getAssetPath():String(o))).join(", ")}]`];if(r==="double2[]"&&Array.isArray(e))return[`${i}double2[] ${s} = [${e.map(o=>`(${o.map(a=>un(Number(a))).join(", ")})`).join(", ")}]`];if(r==="double"&&typeof e=="number")return[`${i}double ${s} = ${un(e)}`];if(r==="token"&&typeof e=="string")return[`${i}token ${s} = ${ue(e,!1)}`];if(typeof e=="string")return[`${i}string ${s} = ${ue(e)}`];if(typeof e=="boolean")return[`${i}bool ${s} = ${e?"1":"0"}`];if(typeof e=="bigint")return[`${i}int64 ${s} = ${e}`];if(typeof e=="number")return[`${i}${Number.isInteger(e)?"int":"double"} ${s} = ${un(e)}`];if(Array.isArray(e)){if(e.every(o=>typeof o=="string"))return[`${i}token[] ${s} = [${e.map(o=>ue(o,!1)).join(", ")}]`];if(e.every(o=>typeof o=="number")){let o=e.every(a=>Number.isInteger(a))?"int[]":"double[]";return[`${i}${o} ${s} = [${e.map(a=>un(a)).join(", ")}]`]}}return[`${i}string ${s} = ${ue(String(e))}`]}function Ah(n,e,t){let r=Wt(t),i=[`${r}${n} = {`],s=Ui(e);for(let o of Object.keys(e).sort())i.push(...Th(o,e[o],t+1,s?.get(o)));return i.push(`${r}}`),i}var LS=new Set(["specifier","typeName","primChildren","properties","primOrder","propertyOrder","variantSetChildren","comment","relocates"]);function vh(n){let e=[],t=n.comment?.value;typeof t=="string"&&t!==""&&e.push(ue(t));let r=Object.keys(n).filter(i=>!LS.has(i)&&n[i]?.value!==void 0).sort((i,s)=>Wr(i,s));for(let i of r){let s=n[i].value;switch(i){case"apiSchemas":case"clipSets":e.push(...to(i,s,o=>ue(o,!1)));break;case"inheritPaths":e.push(...to("inherits",s,o=>`<${o}>`));break;case"specializes":e.push(...to("specializes",s,o=>`<${o}>`));break;case"references":case"payload":e.push(...to(i,s,MS,!0));break;case"variantSetNames":e.push(...to("variantSets",s,o=>ue(o,!1)));break;case"variantSelection":{let o=s;if(no(o)&&Object.keys(o).length>0){e.push("variants = {");for(let[a,c]of Object.entries(o)){let l=Array.isArray(c)?c[0]:c;typeof l=="string"&&e.push(`    string ${a} = ${ue(l,!1)}`)}e.push("}")}break}case"doc":e.push(`doc = ${ue(String(s))}`);break;default:e.push(..._h(i,s));break}}if(n.variantSetNames?.value===void 0){let i=n.variantSetChildren?.value;Array.isArray(i)&&i.length>0&&e.push(`prepend variantSets = [${i.map(s=>ue(s,!1)).join(", ")}]`)}return e}function _h(n,e){return no(e)?Ah(n,e,0):typeof e=="boolean"?[`${n} = ${e}`]:n==="permission"&&(e==="public"||e==="private")?[`${n} = ${e}`]:typeof e=="string"?[`${n} = ${ue(e)}`]:typeof e=="number"?[`${n} = ${un(e)}`]:typeof e=="bigint"?[`${n} = ${e}`]:Array.isArray(e)?[`${n} = [${e.map(t=>typeof t=="string"?ue(t,!1):Qn(t)).join(", ")}]`]:[]}function Ih(n,e,t,r){let i=n[e];if(!i)return;let s=i.specifier?.value??"def",o=i.typeName?.value,a=e.lastIndexOf("/"),c=e.lastIndexOf("}"),l=e.slice(Math.max(a,c)+1),u=Wt(r),d=s;o&&(d+=` ${o}`),d+=` "${l}"`;let p=vh(i);if(p.length>0){t.push(`${u}${d} (`);for(let f of p)Yu(t,f,r+1);t.push(`${u})`)}else t.push(`${u}${d}`);t.push(`${u}{`),wh(n,e,i,t,r),t.push(`${u}}`)}function wh(n,e,t,r,i){let s=Wt(i+1),o=t.propertyOrder?.value;Array.isArray(o)&&o.length>1&&r.push(`${s}reorder properties = [${o.map(d=>ue(d,!1)).join(", ")}]`);let a=t.primOrder?.value;Array.isArray(a)&&a.length>1&&r.push(`${s}reorder nameChildren = [${a.map(d=>ue(d,!1)).join(", ")}]`);let c=(t.properties?.value??[]).slice().sort((d,p)=>{let f=Wr(d,p);return f!==0?f:fh(n[`${e}.${d}`])-fh(n[`${e}.${p}`])});for(let d of c){let p=n[`${e}.${d}`];p&&BS(p,d,r,i+1)}let l=t.primChildren?.value??[];l.length>0&&c.length>0&&r.push(""),l.forEach((d,p)=>{p>0&&r.push(""),Ih(n,`${e==="/"?"":e}${e.endsWith("}")?"":"/"}${d}`,r,i+1)});let u=t.variantSetChildren?.value??[];for(let d of u){let f=n[`${e}{${d}=}`]?.variantChildren?.value??[];if(f.length===0)continue;r[r.length-1]!==""&&c.length>0&&r.push("");let h=Wt(i+1);r.push(`${h}variantSet "${d}" = {`);for(let y of f){let g=`${e}{${d}=${y}}`,m=n[g],P=Wt(i+2);if(!m){r.push(`${P}"${y}" {`,`${P}}`);continue}let b=vh(m);if(b.length>0){r.push(`${P}"${y}" (`);for(let S of b)Yu(r,S,i+3);r.push(`${P})`),r.push(`${P}{`)}else r.push(`${P}"${y}" {`);wh(n,g,m,r,i+2),(m.primChildren?.value??[]).length>0&&r.push(""),r.push(`${P}}`)}r.push(`${h}}`)}}function fh(n){return n?.typeName?.value==="rel"?1:0}var OS=new Set(["typeName","default","timeSamples","connectionPaths","targetPaths","custom","variability","spline","comment"]);function FS(n){let e=[],t=n.comment?.value;typeof t=="string"&&t!==""&&e.push(ue(t));let r=Object.keys(n).filter(i=>!OS.has(i)&&n[i]?.value!==void 0).sort((i,s)=>Wr(i,s));for(let i of r){let s=n[i].value;i==="doc"?e.push(`doc = ${ue(String(s))}`):e.push(..._h(i,s))}return e}function Yu(n,e,t){let[r,...i]=e.split(`
`);n.push(`${Wt(t)}${r}`);for(let s of i)n.push(s.startsWith("\0")?`${Wt(t)}${s.slice(1)}`:s)}function hh(n,e,t,r){if(t.length===0){n.push(e);return}n.push(`${e} (`);for(let i of t)Yu(n,i,r+1);n.push(`${Wt(r)})`)}function BS(n,e,t,r){let i=Wt(r),s=n.typeName?.value,o=FS(n),a=n.custom?.value===!0?"custom ":"";if(s==="rel"){let b=n.targetPaths?.value,S=Array.isArray(b)?b:b&&typeof b=="object"?[...b.prependedItems??[],...b.explicitItems??[],...b.appendedItems??[]].filter(T=>!(b.deletedItems??[]).includes(T)):[],x=b!==void 0&&!Array.isArray(b)&&(b.prependedItems?.length??0)===0&&(b.explicitItems?.length??0)===0&&(b.appendedItems?.length??0)===0&&(b.deletedItems?.length??0)===0,v;S.length===0?v=x?`${i}${a}rel ${e} = None`:`${i}${a}rel ${e}`:S.length===1?v=`${i}${a}rel ${e} = <${S[0]}>`:v=`${i}${a}rel ${e} = [
`+S.map(T=>`${Wt(r+1)}<${T}>,`).join(`
`)+`
${i}]`,hh(t,v,o,r);return}let c=s?.startsWith("uniform "),l=c?s.slice(8):s,u=c||n.variability?.value==="uniform",d=`${a}${u?"uniform ":""}`,p=n.default?.value,f="default"in n,h=n.timeSamples?.value,y=Array.isArray(h)?h:h&&typeof h=="object"?Object.entries(h).map(([b,S])=>[Number(b),S]):[],g=n.connectionPaths?.value,m=n.spline?.value,P=g==null?[]:typeof g=="string"?[g]:g;if(o.length>0||f||a!==""||P.length===0&&y.length===0){let b=l??Ph(p),S=`${i}${d}${b} ${e}`;f&&(S+=` = ${Qn(p,b)}`),hh(t,S,o,r)}if(y.length>0){let b=l??Ph(y[0]?.[1]);t.push(`${i}${u?"uniform ":""}${b} ${e}.timeSamples = {`);for(let[S,x]of y)t.push(`${i}    ${Xa(S)}: ${Qn(x,b)},`);t.push(`${i}}`)}if(m instanceof we){let b=l??m.GetValueType().GetTypeName();t.push(`${i}${u?"uniform ":""}${b} ${e}.spline = {`),t.push(...US(m,b,r+1)),t.push(`${i}}`)}if(P.length>0){let b=l??"token",S=P.length===1?`<${P[0]}>`:`[${P.map(x=>`<${x}>`).join(", ")}]`;t.push(`${i}${u?"uniform ":""}${b} ${e}.connect = ${S}`)}}function US(n,e,t){let r=[],i=Wt(t),s=n.GetKnots().slice().sort((d,p)=>d.GetTime()-p.GetTime()),o=n.GetCurveType();(o===1||s.some(d=>d.GetNextInterpolation()===3))&&r.push(`${i}${o===1?"hermite":"bezier"},`);let a=d=>{switch(d){case 0:return"none";case 2:return"linear";case 3:return"sloped";case 4:return"loopRepeat";case 5:return"loopReset";case 6:return"loopOscillate";default:return"held"}},c=(d,p)=>{if(p.mode===1&&p.slope===0)return;let f=p.mode===3?`(${Qn(p.slope,e)})`:"";r.push(`${i}${d}: ${a(p.mode)}${f},`)};c("pre",n.GetPreExtrapolation()),c("post",n.GetPostExtrapolation());let l=n.GetInnerLoopParams();(l.protoStart!==0||l.protoEnd!==0||l.numPreLoops!==0||l.numPostLoops!==0||l.valueOffset!==0)&&r.push(`${i}loop: (${Xa(l.protoStart)}, ${Xa(l.protoEnd)}, ${l.numPreLoops}, ${l.numPostLoops}, ${Qn(l.valueOffset,e)}),`);let u=3;for(let d of s){let p=`${i}${Xa(d.GetTime())}: `;if(d.IsDualValued()&&(p+=`${Qn(d.GetPreValue(),e)} & `),p+=Qn(d.GetValue(),e),u===3&&(p+=`; pre ${mh(o,d.GetPreTanWidth(),d.GetPreTanSlope(),d.GetPreTanAlgorithm(),e)}`),u=d.GetNextInterpolation(),u===3)p+=`; post curve ${mh(o,d.GetPostTanWidth(),d.GetPostTanSlope(),d.GetPostTanAlgorithm(),e)}`;else{let h=u===0?"none":u===2?"linear":"held";p+=`; post ${h}`}let f=d.GetCustomData();Object.keys(f).length>0&&(p+=`; ${kh(f)}`),r.push(`${p},`)}return r}function mh(n,e,t,r,i){let s=n===0?[un(e),Qn(t,i)]:[Qn(t,i)];return r!==0&&s.push(r===2?"autoEase":"custom"),`(${s.join(", ")})`}function kh(n){return`{ ${Object.keys(n).sort().map(t=>{let r=n[t],i=/^[A-Za-z_][A-Za-z0-9_]*$/.test(t)?t:ue(t,!1);return no(r)?`dictionary ${i} = ${kh(r)}`:r instanceof Pt?`asset ${i} = ${ji(r.getAssetPath())}`:typeof r=="string"?`string ${i} = ${ue(r)}`:typeof r=="boolean"?`bool ${i} = ${r?"1":"0"}`:typeof r=="number"?`${Number.isInteger(r)?"int":"double"} ${i} = ${un(r)}`:`string ${i} = ${ue(String(r))}`}).join("; ")} }`}function gh(n){return!!(/^(double|float|half|int|uint)[234]$/.test(n)||/^(point|normal|vector|color)[234][fdh]?$/.test(n)||/^texCoord[234][fdh]$/.test(n)||/^quat[fdh]$/.test(n))}function yh(n){return/^matrix[234]d$/.test(n)||n==="frame4d"}function bh(n){return n==="asset"}function $S(n){return!!(n==="float"||n==="half"||/^(float|half)[234]$/.test(n)||/^(point|normal|vector|color|texCoord)[234][fh]$/.test(n)||/^quat[fh]$/.test(n))}function Ph(n){if(n==null)return"token";if(typeof n=="boolean")return"bool";if(typeof n=="string")return"string";if(typeof n=="number")return Number.isInteger(n)?"int":"float";if(Array.isArray(n)){if(n.length===0)return"float[]";let e=n[0];if(Array.isArray(e))return`float${e.length}[]`;if(typeof e=="string")return"string[]";if(typeof e=="boolean")return"bool[]";if(typeof e=="number")return n.every(t=>Number.isInteger(t))?"int[]":"float[]"}return"token"}function Qn(n,e){let t=e?e.endsWith("[]")?e.slice(0,-2):e:void 0,r=t?$S(t):!1;return Ch(n,e,r)}function Ch(n,e,t){if(n instanceof Q)return"None";if(n instanceof ke)return"AnimationBlock";if(n==null)return"None";if(typeof n=="boolean")return n?"1":"0";if(typeof n=="number")return un(n,t);if(typeof n=="bigint")return n.toString();let r=e?e.endsWith("[]")?e.slice(0,-2):e:void 0;if(typeof n=="string")return r&&bh(r)?ji(n):ue(n);let i=s=>Ch(s,void 0,t);if(Array.isArray(n)){if(n.length===0)return"[]";if(e&&r){if(e.endsWith("[]"))return gh(r)?`[${n.map(c=>Array.isArray(c)?`(${c.map(i).join(", ")})`:i(c)).join(", ")}]`:yh(r)?`[${n.map(c=>Sh(c,i)).join(", ")}]`:bh(r)?`[${n.map(a=>typeof a=="string"?ji(a):i(a)).join(", ")}]`:`[${n.map(i).join(", ")}]`;if(gh(r))return`(${n.map(i).join(", ")})`;if(yh(r))return Sh(n,i)}let s=n[0];return Array.isArray(s)?`[${n.map(a=>`(${a.map(i).join(", ")})`).join(", ")}]`:`[${n.map(i).join(", ")}]`}return String(n)}function Sh(n,e){return`( ${n.map(t=>`(${t.map(e).join(", ")})`).join(", ")} )`}function ji(n){return n.includes("@")?`@@@${n.replace(/@@@/g,"\\@@@")}@@@`:`@${n}@`}function ue(n,e=!0){let t='"';n.includes('"')&&!n.includes("'")&&(t="'");let r=e&&n.includes(`
`),i=r?t+t+t:t;for(let s of n)if(s===`
`)i+=r?`
`:"\\n";else if(s==="\r")i+="\\r";else if(s==="	")i+="\\t";else if(s==="\\")i+="\\\\";else if(s===t)i+="\\"+t;else{let o=s.codePointAt(0);o>=32&&o<=126?i+=s:o<32||o===127?i+=`\\x${o.toString(16).padStart(2,"0")}`:i+=s}return i+=r?t+t+t:t,i}function zS(n){let e=Math.fround(n);for(let t=1;t<=9;t++){let r=Number(e.toPrecision(t));if(Math.fround(r)===e)return Xu(r.toString())}return Xu(e.toString())}function Xu(n){return n.replace("e+","e")}function un(n,e=!1){if(Number.isNaN(n))return"nan";if(!Number.isFinite(n))return n>0?"inf":"-inf";if(Number.isInteger(n))return`${n}`;let t=e?zS(n):Xu(String(n));return t.includes(".")||t.includes("e")?t:`${t}.0`}function Xa(n){return Number.isInteger(n)?`${n}`:String(n)}function Wt(n){return"    ".repeat(n)}function Xn(n){return n!==null&&typeof n=="object"&&!Array.isArray(n)&&Object.getPrototypeOf(n)===Object.prototype}function Zu(n){return n.split(":").filter(Boolean)}function ro(n){let e=Object.fromEntries(Object.entries(n).map(([r,i])=>[r,Array.isArray(i)?i.map(Yn):Xn(i)?ro(i):i]));Lu(n,e);let t=Object.getOwnPropertyDescriptor(n,"_sdfAddedItems")?.value;return Array.isArray(t)&&Object.defineProperty(e,"_sdfAddedItems",{value:t.map(Yn),configurable:!0,enumerable:!1,writable:!0}),e}function Yn(n){return Array.isArray(n)?n.map(Yn):Xn(n)?ro(n):n instanceof Map?new Map([...n].map(([e,t])=>[e,Yn(t)])):n instanceof Set?new Set([...n].map(Yn)):n}function Wi(n,e){if(Object.is(n,e))return!0;if(Array.isArray(n)&&Array.isArray(e))return n.length===e.length&&n.every((t,r)=>Wi(t,e[r]));if(n instanceof Map&&e instanceof Map)return n.size===e.size&&[...n].every(([t,r])=>e.has(t)&&Wi(r,e.get(t)));if(n instanceof Set&&e instanceof Set)return n.size===e.size&&[...n].every(t=>e.has(t));if(n!==null&&e!==null&&typeof n=="object"&&typeof e=="object"){if(Object.getPrototypeOf(n)!==Object.getPrototypeOf(e))return!1;let t=Object.keys(n),r=Object.keys(e);return t.length===r.length&&t.every(i=>Object.prototype.hasOwnProperty.call(e,i)&&Wi(n[i],e[i]))}return!1}var io=class{_visitDepth=0;isDetached(){return!this.streamsData()}isEmpty(){let e=!0;return this.visitSpecs({visitSpec:()=>(e=!1,!1),done:()=>{}}),e}copyFrom(e){this._requireMutable(),e!==this&&e.visitSpecs({visitSpec:(t,r)=>{this.createSpec(r,t.getSpecType(r));for(let i of t.list(r))this.set(r,i,Yn(t.get(r,i))),this.setValueTypeName(r,i,t.getValueTypeName(r,i));return!0},done:()=>{}})}equals(e){let t=[],r=[];if(this.visitSpecs({visitSpec:(s,o)=>(t.push(o),!0),done:()=>{}}),e.visitSpecs({visitSpec:(s,o)=>(r.push(o),!0),done:()=>{}}),t.length!==r.length)return!1;let i=new Set(r);for(let s of t){if(!i.has(s)||this.getSpecType(s)!==e.getSpecType(s))return!1;let o=this.list(s),a=e.list(s);if(o.length!==a.length)return!1;let c=new Set(a);if(!o.every(l=>c.has(l)&&this.getValueTypeName(s,l)===e.getValueTypeName(s,l)&&Wi(this.get(s,l),e.get(s,l))))return!1}return!0}createSpec(e,t){this._requireMutable(),this._createSpec(e,t)}eraseSpec(e){this._requireMutable(),this._eraseSpec(e)}moveSpec(e,t){this._requireMutable(),this._moveSpec(e,t)}hasSpecAndField(e,t){let r=this.getSpecType(e),i=r!=="unknown"&&this.has(e,t);return i?{specType:r,hasField:i,value:this.get(e,t)}:{specType:r,hasField:i}}set(e,t,r){this._requireMutable(),r===void 0?this._erase(e,t):this._set(e,t,r)}erase(e,t){this._requireMutable(),this._erase(e,t)}visitSpecs(e){this._visitDepth++;try{this._visitSpecs(e),e.done(this)}finally{this._visitDepth--}}hasDictKey(e,t,r){return this.getDictValueByKey(e,t,r)!==void 0}getDictValueByKey(e,t,r){let i=this.get(e,t);for(let s of Zu(r)){if(!Xn(i)||!Object.prototype.hasOwnProperty.call(i,s))return;i=i[s]}return i}setDictValueByKey(e,t,r,i){if(i===void 0){this.eraseDictValueByKey(e,t,r);return}let s=this.get(e,t),o=Xn(s)?ro(s):{},a=Zu(r);if(a.length===0)return;let c=o;for(let l of a.slice(0,-1)){let u=c[l];c=c[l]=Xn(u)?ro(u):{}}c[a.at(-1)]=i,this.set(e,t,o)}eraseDictValueByKey(e,t,r){let i=this.get(e,t);if(!Xn(i))return;let s=ro(i),o=Zu(r);if(o.length===0)return;let a=[],c=s;for(let l of o.slice(0,-1)){let u=c[l];if(!Xn(u))return;a.push([c,l]),c=u}if(Object.prototype.hasOwnProperty.call(c,o.at(-1))){delete c[o.at(-1)];for(let l=a.length-1;l>=0;--l){let[u,d]=a[l],p=u[d];Xn(p)&&Object.keys(p).length===0&&delete u[d]}Object.keys(s).length===0?this.erase(e,t):this.set(e,t,s)}}listDictKeys(e,t,r){let i=r?this.getDictValueByKey(e,t,r):this.get(e,t);return Xn(i)?Object.keys(i):[]}getPreviousTimeSampleForPath(e,t){let r=this.getBracketingTimeSamplesForPath(e,t);if(!r||t<r[0])return;if(t!==r[0])return r[0];let i=this.getBracketingTimeSamplesForPath(e,HS(t));return!i||i[0]===t?void 0:i[0]}setTimeSample(e,t,r){this._requireMutable(),r===void 0?this._eraseTimeSample(e,t):this._setTimeSample(e,t,r)}eraseTimeSample(e,t){this._requireMutable(),this._eraseTimeSample(e,t)}_requireMutable(){if(this._visitDepth!==0)throw new Error("SdfAbstractData may not be modified during spec visitation")}};function HS(n){if(Number.isNaN(n)||n===-1/0)return n;if(n===0)return-Number.MIN_VALUE;let e=new ArrayBuffer(8),t=new DataView(e);t.setFloat64(0,n);let r=t.getBigUint64(0);return r=n>0?r-1n:r+1n,t.setBigUint64(0,r),t.getFloat64(0)}function Za(n){return(n instanceof Map?[...n.entries()]:Array.isArray(n)?n.filter(t=>Array.isArray(t)&&t.length>=2):n!==null&&typeof n=="object"?Object.entries(n):[]).map(([t,r])=>[Number(t),r]).filter(([t])=>Number.isFinite(t)).sort(([t],[r])=>t-r)}function Dh(n,e){if(n.length===0)return;if(e<=n[0])return[n[0],n[0]];let t=n.at(-1);if(e>=t)return[t,t];let r=n.findIndex(s=>s>=e),i=n[r];return i===e?[i,i]:[n[r-1],i]}var kn=class extends io{_data=new Map;streamsData(){return!1}isDetached(){return!0}hasSpec(e){return this._data.has(e)}getSpecType(e){return this._data.get(e)?.specType??"unknown"}has(e,t){return this._data.get(e)?.fields.has(t)??!1}get(e,t){return Yn(this._data.get(e)?.fields.get(t))}getValueTypeName(e,t){return this._data.get(e)?.valueTypeNames.get(t)}setValueTypeName(e,t,r){let i=this._data.get(e);i&&(r===void 0?i.valueTypeNames.delete(t):i.valueTypeNames.set(t,r))}list(e){return[...this._data.get(e)?.fields.keys()??[]]}listAllTimeSamples(){let e=new Set;for(let t of this._data.keys())for(let r of this.listTimeSamplesForPath(t))e.add(r);return[...e].sort((t,r)=>t-r)}listTimeSamplesForPath(e){return Za(this.get(e,"timeSamples")).map(([t])=>t)}getBracketingTimeSamples(e){return Dh(this.listAllTimeSamples(),e)}getNumTimeSamplesForPath(e){return this.listTimeSamplesForPath(e).length}getBracketingTimeSamplesForPath(e,t){return Dh(this.listTimeSamplesForPath(e),t)}getPreviousTimeSampleForPath(e,t){let r=this.listTimeSamplesForPath(e);for(let i=r.length-1;i>=0;--i)if(r[i]<t)return r[i]}queryTimeSample(e,t){return Za(this.get(e,"timeSamples")).find(([r])=>r===t)?.[1]}_createSpec(e,t){if(t==="unknown")return;let r=this._data.get(e);r?r.specType=t:this._data.set(e,{specType:t,fields:new Map,valueTypeNames:new Map})}_eraseSpec(e){this._data.delete(e)}_moveSpec(e,t){let r=this._data.get(e);!r||this._data.has(t)||(this._data.set(t,r),this._data.delete(e))}_set(e,t,r){let i=this._data.get(e);i?.fields.set(t,Yn(r)),i?.valueTypeNames.delete(t)}_erase(e,t){let r=this._data.get(e);r?.fields.delete(t),r?.valueTypeNames.delete(t)}_visitSpecs(e){for(let t of this._data.keys())if(!e.visitSpec(this,t))break}_setTimeSample(e,t,r){if(!this._data.has(e))return;let i=Za(this.get(e,"timeSamples")).filter(([s])=>s!==t);i.push([t,r]),i.sort(([s],[o])=>s-o),this._set(e,"timeSamples",i)}_eraseTimeSample(e,t){let r=Za(this.get(e,"timeSamples")).filter(([i])=>i!==t);r.length===0?this._erase(e,"timeSamples"):this._set(e,"timeSamples",r)}};var dn=class n{constructor(e,t){this._bytes=e;this._entries=t}static isZip(e){return e.length>=4&&e[0]===80&&e[1]===75&&e[2]===3&&e[3]===4}static fromBytes(e){let t=new DataView(e.buffer,e.byteOffset,e.byteLength),r=-1;for(let l=e.length-22;l>=0&&l>=e.length-22-65535;l--)if(t.getUint32(l,!0)===101010256){r=l;break}if(r<0)throw new Error("UsdZipFile: end-of-central-directory record not found");let i=t.getUint16(r+10,!0),s=t.getUint32(r+16,!0),o=new Map,a=s,c=new TextDecoder;for(let l=0;l<i;l++){if(t.getUint32(a,!0)!==33639248)throw new Error("UsdZipFile: malformed central directory");let u=t.getUint16(a+10,!0),d=t.getUint32(a+20,!0),p=t.getUint32(a+24,!0),f=t.getUint16(a+28,!0),h=t.getUint16(a+30,!0),y=t.getUint16(a+32,!0),g=t.getUint32(a+42,!0),m=c.decode(e.subarray(a+46,a+46+f));if(t.getUint32(g,!0)!==67324752)throw new Error(`UsdZipFile: bad local header for '${m}'`);let P=t.getUint16(g+26,!0),b=t.getUint16(g+28,!0),S=g+30+P+b;o.set(m,{name:m,compressionMethod:u,compressedSize:d,uncompressedSize:p,dataOffset:S}),a+=46+f+h+y}return new n(e,o)}get entryNames(){return[...this._entries.keys()]}has(e){return this._entries.has(e)}getEntry(e){return this._entries.get(e)}getFileNames(){return[...this._entries.keys()]}defaultLayerName(){for(let e of this._entries.keys())if(/\.(usd|usda|usdc)$/i.test(e))return e}async extract(e){let t=this._entries.get(e);if(!t)throw new Error(`UsdZipFile: no entry '${e}'`);let r=this._bytes.subarray(t.dataOffset,t.dataOffset+t.compressedSize);if(t.compressionMethod===0)return r;if(t.compressionMethod===8){if(typeof DecompressionStream>"u")throw new Error(`UsdZipFile: '${e}' is deflate-compressed and DecompressionStream is unavailable`);let i=new Blob([r]).stream().pipeThrough(new DecompressionStream("deflate-raw"));return new Uint8Array(await new Response(i).arrayBuffer())}throw new Error(`UsdZipFile: unsupported compression method ${t.compressionMethod} for '${e}'`)}},bE=(()=>{let n=new Uint32Array(256);for(let e=0;e<256;e++){let t=e;for(let r=0;r<8;r++)t=t&1?3988292384^t>>>1:t>>>1;n[e]=t>>>0}return n})();var so=class{_layer=null;isDirty(){return this._IsDirty()}markCurrentStateAsClean(){this._MarkCurrentStateAsClean()}markCurrentStateAsDirty(){this._MarkCurrentStateAsDirty()}_setLayer(e){this._layer=e,this._OnSetLayer(e)}setField(e,t,r){this._OnSetField(e,t,r)}setTimeSample(e,t,r){this._OnSetTimeSample(e,t,r)}createSpec(e,t){this._OnCreateSpec(e,t)}deleteSpec(e){this._OnDeleteSpec(e)}pushChild(e,t,r){this._OnPushChild(e,t,r)}popChild(e,t,r){this._OnPopChild(e,t,r)}_GetLayer(){return this._layer}_IsDirty(){return!1}_MarkCurrentStateAsClean(){}_MarkCurrentStateAsDirty(){}_OnSetLayer(e){}_OnSetField(e,t,r){}_OnSetTimeSample(e,t,r){}_OnCreateSpec(e,t){}_OnDeleteSpec(e){}_OnPushChild(e,t,r){}_OnPopChild(e,t,r){}},Ki=class extends so{_dirty=!1;_IsDirty(){return this._dirty}_MarkCurrentStateAsClean(){this._dirty=!1}_MarkCurrentStateAsDirty(){this._dirty=!0}_OnSetField(){this._dirty=!0}_OnSetTimeSample(){this._dirty=!0}_OnCreateSpec(){this._dirty=!0}_OnDeleteSpec(){this._dirty=!0}_OnPushChild(){this._dirty=!0}_OnPopChild(){this._dirty=!0}};function qi(n){let e=Rh.get(n);return e||(e=new Pe(new jt(new Ju(n))),Rh.set(n,e)),e}var qS=0,Rh=new WeakMap,Ju=class extends ln{constructor(t){super();this.implementation=t}prefix=`usd-ts-host-context:${++qS}:`;createIdentifier(t,r=new pe){return this.implementation.createIdentifier(t,r)}isContextDependentPath(){return!0}async resolve(t,r){let i=await this.implementation.resolve(t,new Pe);return i.valid?new pe(this.prefix+encodeURIComponent(i.toString())):i}async openAsset(t,r){let i=t.toString(),s=i.startsWith(this.prefix)?new pe(decodeURIComponent(i.slice(this.prefix.length))):t;return this.implementation.openAsset(s,new Pe)}};function nd(n,e){return e.get(jt)?.resolver??n}var ed=new WeakMap;function rd(n){if(n)return ed.get(n)?.current}async function oo(n,e,t){if(!n)return await t();let r=ed.get(n);r||(r={current:void 0,installations:[]},ed.set(n,r));let i={};r.installations.length===0&&(r.current?r.base=r.current:delete r.base),r.installations.push({token:i,context:e}),r.current=e;try{return await t()}finally{let s=r.installations.findIndex(o=>o.token===i);s>=0&&r.installations.splice(s,1),r.current=r.installations.at(-1)?.context??r.base,r.installations.length===0&&delete r.base}}var QS=0,XS=1,YS=2;function Eh(n,e,t=4){if(e===0)return[];let r=0;function i(h){let y=0;for(let m=0;m<h;m++)y|=n[r+m]<<m*8;if(r+=h,h===4)return y|0;let g=h*8;return y&1<<g-1&&(y|=~((1<<g)-1)),y}let s=i(t),o=Math.floor((e*2+7)/8),a=r;r+=o;let c=t>>2,l=t>>1,u=new Array(e),d=0,p=a,f=0;for(let h=0;h<e;h++){f>=8&&(p++,f=0);let y=n[p]>>f&3;f+=2;let g;y===QS?g=s:y===XS?g=i(c||1):y===YS?g=i(l||1):g=i(t),d+=g,u[h]=d}return u}function ZS(n){let e=n.length;if(e===0)return new Uint8Array(0);let t=4,r=1,i=2,s=new Array(e);for(let y=0;y<e;y++)s[y]=n[y]-(y>0?n[y-1]:0)|0;let o=0,a=0,c=new Map;for(let y of s){let g=(c.get(y)??0)+1;c.set(y,g),g>a?(o=y,a=g):g===a&&y>o&&(o=y)}let l=Math.ceil(e*2/8),u=new Uint8Array(l),d=[];function p(y,g){for(let m=0;m<g;m++)d.push(y>>m*8&255)}for(let y=0;y<e;y++){let g=s[y],m;g===o?m=0:g>=-128&&g<=127?(m=1,p(g,r)):g>=-32768&&g<=32767?(m=2,p(g,i)):(m=3,p(g,t)),u[y*2>>3]|=m<<(y*2&7)}let f=new Uint8Array(t+l+d.length);return new DataView(f.buffer).setInt32(0,o,!0),f.set(u,t),f.set(new Uint8Array(d),t+l),f}function Kt(n){return Gi(ZS(n))}var id=16;function Nh(n,e=4){if(n===0)return 0;let t=Math.floor((n*2+7)/8),r=e+t+n*e;return Ca(r)+1}var A={Bool:1,UChar:2,Int:3,UInt:4,Int64:5,UInt64:6,Half:7,Float:8,Double:9,String:10,Token:11,AssetPath:12,Matrix2d:13,Matrix3d:14,Matrix4d:15,Quatd:16,Quatf:17,Quath:18,Vec2d:19,Vec2f:20,Vec2h:21,Vec2i:22,Vec3d:23,Vec3f:24,Vec3h:25,Vec3i:26,Vec4d:27,Vec4f:28,Vec4h:29,Vec4i:30,Dictionary:31,TokenListOp:32,StringListOp:33,PathListOp:34,ReferenceListOp:35,IntListOp:36,Int64ListOp:37,UIntListOp:38,UInt64ListOp:39,PathVector:40,TokenVector:41,Specifier:42,Permission:43,Variability:44,VariantSelectionMap:45,TimeSamples:46,Payload:47,DoubleVector:48,LayerOffsetVector:49,StringVector:50,ValueBlock:51,Value:52,UnregisteredValue:53,UnregisteredValueListOp:54,PayloadListOp:55,TimeCode:56,PathExpression:57,Relocates:58,Spline:59,AnimationBlock:60},JS={[A.Bool]:"bool",[A.UChar]:"uchar",[A.Int]:"int",[A.UInt]:"uint",[A.Int64]:"int64",[A.UInt64]:"uint64",[A.Half]:"half",[A.Float]:"float",[A.Double]:"double",[A.String]:"string",[A.Token]:"token",[A.AssetPath]:"asset",[A.Matrix2d]:"matrix2d",[A.Matrix3d]:"matrix3d",[A.Matrix4d]:"matrix4d",[A.Quatd]:"quatd",[A.Quatf]:"quatf",[A.Quath]:"quath",[A.Vec2d]:"double2",[A.Vec2f]:"float2",[A.Vec2h]:"half2",[A.Vec2i]:"int2",[A.Vec3d]:"double3",[A.Vec3f]:"float3",[A.Vec3h]:"half3",[A.Vec3i]:"int3",[A.Vec4d]:"double4",[A.Vec4f]:"float4",[A.Vec4h]:"half4",[A.Vec4i]:"int4",[A.Dictionary]:"dictionary",[A.TimeCode]:"timecode"},St=128,Mh=64,ec=32,ex=16,Vh=new Set;function tx(n){Vh.has(n)||(Vh.add(n),console.warn(`usdc: ${n} values are not supported yet; treating as unauthored`))}var tc=class{pos=0;view;bytes;constructor(e){this.bytes=e,this.view=new DataView(e.buffer,e.byteOffset,e.byteLength)}seek(e){this.pos=e}u8(){return this.view.getUint8(this.pos++)}u16(){let e=this.view.getUint16(this.pos,!0);return this.pos+=2,e}u32(){let e=this.view.getUint32(this.pos,!0);return this.pos+=4,e}i32(){let e=this.view.getInt32(this.pos,!0);return this.pos+=4,e}u64n(){let e=this.view.getUint32(this.pos,!0),t=this.view.getUint32(this.pos+4,!0);return this.pos+=8,BigInt(t)<<32n|BigInt(e)}u64(){return Number(this.u64n())}i64n(){let e=this.view.getUint32(this.pos,!0),t=this.view.getInt32(this.pos+4,!0);return this.pos+=8,BigInt(t)<<32n|BigInt(e)}f32(){let e=this.view.getFloat32(this.pos,!0);return this.pos+=4,e}f64(){let e=this.view.getFloat64(this.pos,!0);return this.pos+=8,e}bytes_n(e){let t=this.bytes.subarray(this.pos,this.pos+e);return this.pos+=e,t}ascii(e){let t=this.bytes_n(e),r="";for(let i=0;i<e&&t[i]!==0;i++)r+=String.fromCharCode(t[i]);return r}};function Xi(n){let t=(n&32767)<<13,r=260046848&t;if(t+=112<<23,r===260046848)t+=112<<23;else if(r===0){t+=1<<23;let s=new ArrayBuffer(4);new DataView(s).setUint32(0,t,!0);let o=new DataView(s).getFloat32(0,!0),a=new ArrayBuffer(4);new DataView(a).setUint32(0,113<<23,!0),o-=new DataView(a).getFloat32(0,!0);let c=new ArrayBuffer(4);new DataView(c).setFloat32(0,o,!0),t=new DataView(c).getUint32(0,!0)}t|=(n&32768)<<16;let i=new ArrayBuffer(4);return new DataView(i).setUint32(0,t,!0),new DataView(i).getFloat32(0,!0)}function nx(n,e){let t=n.u64(),r=n.bytes_n(t);return Us(r,e)}function pn(n,e,t=4){let r=Nh(e,t),i=nx(n,r);return Eh(i,e,t)}function ri(n){let e=n.u8(),t=n.u8(),r=n.u8(),i=n.u8(),s=n.u8(),o=n.u8(),a=n.u8(),c=n.u8(),l=!!(c&St),u=!!(c&Mh),d=!!(c&ec),p=!!(c&ex),f=(e|t<<8|r<<16|i<<24)>>>0,h=s|o<<8,y=f+h*4294967296;return{typeId:a,isArray:l,isInlined:u,isCompressed:d,isArrayEdit:p,payloadLo:f,payloadOffset:y}}function Dn(n,e,t,r){if(e.isInlined){let o=e.payloadLo;if(t===8)return BigInt(r?o|0:o>>>0);if(r){if(t===4)return o|0;if(t===1)return(o&255)<<24>>24}else{if(t===4)return o>>>0;if(t===1)return o&255}return o}if(!e.payloadOffset)return[];if(n.seek(e.payloadOffset),!e.isArray)return t===8?r?n.i64n():n.u64n():t===4?r?n.i32():n.u32():t===1?n.u8():r?n.i32():n.u32();let i=n.u64();if(t===8){let o=[];for(let a=0;a<i;a++)o.push(r?n.i64n():n.u64n());return o}if(e.isCompressed)return pn(n,i,t);let s=[];for(let o=0;o<i;o++)t===4?s.push(r?n.i32():n.u32()):t===1?s.push(n.u8()):s.push(r?n.i32():n.u32());return s}function rx(n,e,t){let r=t===A.Double||t===A.TimeCode,i=t===A.Half,s=r?8:i?2:4;if(e.isInlined){let c=new ArrayBuffer(4);new DataView(c).setUint32(0,e.payloadLo,!0);let l=new DataView(c).getFloat32(0,!0);return i?Xi(e.payloadLo&65535):l}if(!e.payloadOffset)return 0;if(n.seek(e.payloadOffset),!e.isArray)return r?n.f64():i?Xi(n.u16()):n.f32();let o=n.u64();if(!e.isCompressed){let c=[];for(let l=0;l<o;l++)r?c.push(n.f64()):i?c.push(Xi(n.u16())):c.push(n.f32());return c}let a=String.fromCharCode(n.u8());if(a==="i")return pn(n,o,4).map(l=>l);if(a==="t"){let c=n.u32(),l=[];for(let d=0;d<c;d++)r?l.push(n.f64()):i?l.push(Xi(n.u16())):l.push(n.f32());return pn(n,o,4).map(d=>l[d])}return[]}function ix(n,e,t){let r=Object.entries(A).find(([,m])=>m===t)?.[0]??"",i,s=0,o=r[r.length-1]?.toLowerCase();if(r.startsWith("Quat"))i=4;else if(r.startsWith("Vec"))i=parseInt(r.slice(3,4));else if(r.startsWith("Matrix"))s=parseInt(r.slice(6,7)),i=s*s;else throw new Error(`Unknown math type: ${r}`);let a=o==="d",c=o==="h",l=o==="i",u=a?8:c?2:4;function d(){return a?n.f64():c?Xi(n.u16()):l?n.i32():n.f32()}function p(m){let P=[];for(let b=0;b<m;b++)P.push(d());return P}function f(m,P){let b=[];for(let S=0;S<P;S++)b.push(m.slice(S*P,S*P+P));return b}let h=r.startsWith("Quat"),y=m=>h?[m[3],m[0],m[1],m[2]]:m;if(e.isInlined){let m=c&&i===2?2:1,P=s||i,b=[],S=[e.payloadLo&255,e.payloadLo>>8&255,e.payloadLo>>16&255,e.payloadLo>>24&255,e.payloadOffset>0?e.payloadLo>>0&255:0,0],x=[e.payloadLo&255,e.payloadLo>>8&255,e.payloadLo>>16&255,e.payloadLo>>24&255];for(let v=0;v<P;v++){let T=v*m;if(c&&m===2){let w=x[T]|x[T+1]<<8;b.push(Xi(w))}else{let w=x[T];b.push(w>=128?w-256:w)}}if(s){let v=[];for(let T=0;T<s;T++){let w=new Array(s).fill(0);w[T]=b[T],v.push(w)}return v}return y(b)}if(n.seek(e.payloadOffset),e.isArray){let m=n.u64(),P=[];for(let b=0;b<m;b++){let S=p(i);P.push(s?f(S,s):y(S))}return P}let g=p(i);return s?f(g,s):y(g)}function sx(n,e,t){let r=Dn(n,e,4,!1);return e.isArray?r.map(i=>t[i]):t[r]}function ox(n,e,t){let r=Dn(n,e,4,!1);return e.isArray?r.map(i=>t[i]):t[r]}function ax(n,e,t,r){if(e.isArray)return Dn(n,e,4,!1).map(o=>r[o]);if(e.isInlined)return t[e.payloadLo];let i=Dn(n,e,4,!1);return r[i]}function od(n,e,t,r,i,s){let o;e?o=t:o=n.u64();let a={},c=new Map;for(let l=0;l<o;l++){let u=n.u32(),d=i[u],p=n.pos,f=Number(n.i64n()),h=p+f;n.seek(h);let y=ri(n),g=n.pos;a[d]=Yi(n,y,r,i,s);let m=JS[y.typeId];m&&c.set(d,`${m}${y.isArray?"[]":""}`),n.seek(g)}return Ys(a,c),a}function cx(n,e,t,r,i){n.seek(e.payloadOffset);let s=n.u8(),o=!!(s&1),a=!!(s&2),c=!!(s&4),l=!!(s&8),u=!!(s&16),d=!!(s&32),p=!!(s&64),f=null,h=[],y=[],g=[],m=[];function P(){let S=n.u64(),x=[];for(let v=0;v<S;v++){let T;switch(e.typeId){case A.TokenListOp:T=t[n.u32()];break;case A.StringListOp:T=r[n.u32()];break;case A.PathListOp:T=i[n.u32()];break;case A.ReferenceListOp:case A.PayloadListOp:{let w=n.u32(),D=n.u32(),G=n.f64(),_=n.f64();e.typeId===A.ReferenceListOp&&n.u64(),T={assetPath:r[w]??"",primPath:i[D]??"",layerOffset:{offset:G,scale:_}};break}case A.IntListOp:T=n.i32();break;case A.UIntListOp:T=n.u32();break;case A.Int64ListOp:T=n.i64n();break;case A.UInt64ListOp:T=n.u64n();break;default:n.u64(),T=null}x.push(T)}return x}a?f=P():o&&(f=[]),c&&(h=P()),d&&(y=P()),p&&(g=P()),l&&(m=P()),u&&P(),h.length&&g.length===0&&(g=h);let b={isExplicit:f!==null,explicitItems:f??[],prependedItems:y,appendedItems:g,deletedItems:m};return h.length&&Object.defineProperty(b,"_sdfAddedItems",{value:h,configurable:!0,enumerable:!1,writable:!0}),b}function lx(n,e,t,r,i){let s=e.payloadOffset;n.seek(s);let o=n.pos,a=Number(n.i64n());n.seek(o+a);let c=ri(n),l=n.pos,u=Number(n.i64n()),d=Yi(n,c,t,r,i);n.seek(l+u);let p=n.u64(),f=[];for(let h=0;h<p;h++){let y=ri(n),g=n.pos,m=Yi(n,y,t,r,i);n.seek(g),f.push([d[h],{typeId:y.typeId,isArray:y.isArray,isInlined:y.isInlined,isCompressed:y.isCompressed,payload:y.payloadLo,value:m}])}return f}function ux(n,e,t,r,i){n.seek(e.payloadOffset);let s=n.u64();if(e.typeId===A.DoubleVector){let c=[];for(let l=0;l<s;l++)c.push(n.f64());return c}if(e.typeId===A.LayerOffsetVector){let c=[];for(let l=0;l<s;l++)c.push({offset:n.f64(),scale:n.f64()});return c}let o=[];for(let c=0;c<s;c++)o.push(n.u32());let a;return e.typeId===A.PathVector?a=i:e.typeId===A.StringVector?a=r:a=t,o.map(c=>a[c])}function dx(n,e,t){n.seek(e.payloadOffset);let r=n.u64(),i={};for(let s=0;s<r;s++){let o=t[n.u32()],a=t[n.u32()];i[o]=a}return i}function px(n,e,t){if(!e.payloadOffset)return{};n.seek(e.payloadOffset);let r=n.u64(),i={};for(let s=0;s<r;s++){let o=t[n.u32()],a=t[n.u32()];i[o]=a}return i}function fx(n,e,t,r,i){n.seek(e.payloadOffset);let s=n.u64(),o=n.bytes_n(s),a=new Map,c=n.u64();for(let l=0;l<c;l++){let u=n.f64();a.set(u,od(n,!1,0,t,r,i))}return Js.CreateSplineFromBinaryData(o,a)}function Yi(n,e,t,r,i,s=[]){let{typeId:o,isArray:a,isInlined:c,isCompressed:l,payloadLo:u,payloadOffset:d}=e;if(e.isArrayEdit)return tx("VtArrayEdit (crate >= 0.14)"),null;switch(o){case A.ValueBlock:return new Q;case A.AnimationBlock:return new ke;case A.Spline:return fx(n,e,t,r,i);case A.Bool:if(c)return!!u;if(!d)return[];if(n.seek(d),!a)return!!n.u8();{let p=n.u64(),f=[];for(let h=0;h<p;h++)f.push(!!n.u8());return f}case A.UChar:return Dn(n,e,1,!1);case A.Int:return Dn(n,e,4,!0);case A.UInt:return Dn(n,e,4,!1);case A.Int64:return Dn(n,e,8,!0);case A.UInt64:return Dn(n,e,8,!1);case A.Half:case A.Float:case A.Double:case A.TimeCode:return rx(n,e,o);case A.String:return sx(n,e,r);case A.Token:return ox(n,e,t);case A.AssetPath:case A.PathExpression:return ax(n,e,t,r);case A.Dictionary:return c?od(n,!0,u,t,r,i):(n.seek(d),od(n,!1,0,t,r,i));case A.Specifier:case A.Permission:case A.Variability:return Dn(n,e,4,!0);case A.Quatd:case A.Quatf:case A.Quath:case A.Vec2d:case A.Vec2f:case A.Vec2h:case A.Vec2i:case A.Vec3d:case A.Vec3f:case A.Vec3h:case A.Vec3i:case A.Vec4d:case A.Vec4f:case A.Vec4h:case A.Vec4i:case A.Matrix2d:case A.Matrix3d:case A.Matrix4d:return ix(n,e,o);case A.TokenListOp:case A.StringListOp:case A.PathListOp:case A.ReferenceListOp:case A.IntListOp:case A.Int64ListOp:case A.UIntListOp:case A.UInt64ListOp:case A.PayloadListOp:case A.UnregisteredValueListOp:return cx(n,e,t,r,s);case A.TimeSamples:return lx(n,e,t,r,i);case A.PathVector:case A.TokenVector:case A.DoubleVector:case A.LayerOffsetVector:case A.StringVector:return ux(n,e,t,r,s);case A.VariantSelectionMap:return dx(n,e,r);case A.Relocates:return px(n,e,s);case A.Value:{if(!d)return null;n.seek(d);let p=ri(n);return Yi(n,p,t,r,i,s)}case A.UnregisteredValue:{n.seek(d);let p=Number(n.i64n()),f=d+p;n.seek(f);let h=ri(n);return Yi(n,h,t,r,i,s)}case A.Payload:{if(!d)return null;n.seek(d);let p=n.u32(),f=n.u32(),h=n.f64(),y=n.f64();return{assetPath:r[p]??"",primPath:s[f]??"",layerOffset:{offset:h,scale:y}}}default:return null}}function hx(n,e,t,r,i){let s=new Array(n);function o(a,c){let l=a,u=c,d=!1,p=!1,f=!0;for(;f||d||p;){f=!1;let h=e[l];if(!u)u="/",s[h]="/";else{let y=t[l],g=y<0,m=i[Math.abs(y)];s[h]=(u==="/"?"":u)+(g?".":"/")+m}d=r[l]>0||r[l]===-1,p=r[l]>=0,d&&(p&&o(l+r[l],u),u=s[h]),l++}}return n>0&&o(0,""),s}function ud(n){let e=new tc(n),t=e.ascii(8);if(t!=="PXR-USDC")throw new Error(`Not a USDC file: ${t}`);let r=e.u8(),i=e.u8(),s=e.u8();if(e.bytes_n(5),r!==0||i>15||i===0&&s<1)throw new Error(`Unsupported USDC version: ${r}.${i}.${s}`);let o=e.u64();e.u64(),e.seek(o);let a=e.u64(),c={};for(let y=0;y<a;y++){let g=e.ascii(16),m=e.u64(),P=e.u64();c[g]={offset:m,size:P}}let l=[Kn("")];if(c.TOKENS){let{offset:y}=c.TOKENS;e.seek(y);let g=e.u64(),m;if(i<4)m=e.bytes_n(e.u64());else{let b=e.u64(),S=e.u64();m=Us(e.bytes_n(S),b)}l=new TextDecoder().decode(m).split("\0").slice(0,g).map(b=>Kn(b))}let u=[];if(c.STRINGS){let{offset:y}=c.STRINGS;e.seek(y);let g=e.u64();for(let m=0;m<g;m++)u.push(l[e.u32()])}let d=[];if(c.FIELDS){let{offset:y}=c.FIELDS;e.seek(y);let g=e.u64();if(i<4)for(let m=0;m<g;m++){e.u32();let P=e.u32();d.push({tokenIdx:P,rep:ri(e)})}else{let m=pn(e,g,4),P=e.u64(),b=e.bytes_n(P),S=Us(b,g*8),x=new tc(S);for(let v=0;v<g;v++){let T=ri(x);d.push({tokenIdx:m[v],rep:T})}}}let p=[];if(c.FIELDSETS){let{offset:y}=c.FIELDSETS;e.seek(y);let g=e.u64();p=i<4?Array.from({length:g},()=>e.u32()):pn(e,g,4)}let f=[];if(c.PATHS){let{offset:y}=c.PATHS;e.seek(y);let g=e.u64();if(i<4){f=new Array(g);let m=P=>{let b=!1,S=!1;do{i===0&&e.u32();let x=e.u32(),v=e.u32(),T=e.u8();e.bytes_n(3);let w=P===""?"/":`${P==="/"?"":P}${T&4?".":"/"}${l[v]}`;if(f[x]=w,b=!!(T&1),S=!!(T&2),b&&S){let D=Number(e.i64n());m(w),e.seek(D)}else b&&(P=w)}while(b||S)};m("")}else{let m=e.u64(),P=pn(e,m,4),b=pn(e,m,4),S=pn(e,m,4);f=hx(g,P,b,S,l)}f=f.map(m=>m.replace(/\/\{/g,"{").replace(/\}\//g,"}"))}let h={};if(c.SPECS){let{offset:y}=c.SPECS;e.seek(y);let g=e.u64(),m,P,b;if(i<4){m=[],P=[],b=[];for(let T=0;T<g;T++)i===0&&e.u32(),m.push(e.u32()),P.push(e.u32()),b.push(e.u32())}else m=pn(e,g,4),P=pn(e,g,4),b=pn(e,g,4);let S=6,x=null;for(let T=0;T<g;T++){let w=f[m[T]],D=P[T],G=b[T],_={};for(let E=D;E<p.length;E++){let q=p[E];if(q<0||q===4294967295)break;let{tokenIdx:ae,rep:se}=d[q],N=l[ae],X;try{X=Yi(e,se,l,u,n,f)}catch(ce){x===null&&(x=ce),X=void 0}_[N]={typeId:se.typeId,isArray:se.isArray,isInlined:se.isInlined,isCompressed:se.isCompressed,payload:se.payloadLo,value:X}}let k={form:G,fields:_,..._};h[w]=k}let v=T=>/^[A-Za-z_][A-Za-z0-9_]*$/.test(T);for(let[T,w]of Object.entries(h)){if(w.form!==S)continue;let D=w.primChildren?.value;if(!Array.isArray(D))continue;let G=new Set;for(let _ of D){let k=_==null?"":String(_),E=T==="/"?`/${k}`:`${T}${T.endsWith("}")?"":"/"}${k}`;if(!v(k)||!(E in h))throw new Error(`Invalid child identifier '${k}' found on parent '${T}'`);if(G.has(k))throw new Error(`Duplicate child identifier '${k}' found on parent '${T}'`);G.add(k)}}if(x!==null)throw x}return h}var ni={IsExplicit:1,HasExplicitItems:2,HasAddedItems:4,HasDeletedItems:8,HasOrderedItems:16,HasPrependedItems:32,HasAppendedItems:64},Ja={Attribute:1,Prim:6,PseudoRoot:7,Relationship:8},Cn=class{_buf=[];get pos(){return this._buf.length}u8(e){return this._buf.push(e&255),this}u16(e){return this.u8(e).u8(e>>8)}u32(e){return this.u16(e&65535).u16(e>>>16&65535)}u64(e){return this.u32(e>>>0),this.u32(Math.floor(e/4294967296)>>>0),this}f32(e){let t=new ArrayBuffer(4);return new DataView(t).setFloat32(0,e,!0),this.bytes(new Uint8Array(t))}f64(e){let t=new ArrayBuffer(8);return new DataView(t).setFloat64(0,e,!0),this.bytes(new Uint8Array(t))}bytes(e){for(let t of e)this._buf.push(t);return this}ascii(e,t){for(let r=0;r<t;r++)this._buf.push(r<e.length?e.charCodeAt(r):0);return this}patchU64(e,t){let r=t>>>0,i=Math.floor(t/4294967296)>>>0;for(let s=0;s<4;s++)this._buf[e+s]=r>>s*8&255;for(let s=0;s<4;s++)this._buf[e+4+s]=i>>s*8&255;return this}toUint8Array(){return new Uint8Array(this._buf)}},ad=class{_map=new Map;intern(e){let t=Kn(e),r=this._map.get(t);if(r!==void 0)return r;let i=this._map.size;return this._map.set(t,i),i}get(e){return this._map.get(Kn(e))??0}get tokens(){return[...this._map.keys()]}},cd=class{constructor(e){this._tok=e}_map=new Map;_tokenIdxs=[];intern(e){let t=this._map.get(e);if(t!==void 0)return t;let r=this._tokenIdxs.length;return this._map.set(e,r),this._tokenIdxs.push(this._tok.intern(e)),r}get tokenIndices(){return this._tokenIdxs}};function Lh(n,e,t){let r=new Uint8Array(8);r[0]=t&255,r[1]=t>>>8&255,r[2]=t>>>16&255,r[3]=t>>>24&255;let i=Math.floor(t/4294967296)>>>0;return r[4]=i&255,r[5]=i>>8&255,r[6]=n&255,r[7]=e&255,r}function Xe(n,e){return Lh(n,Mh,e>>>0)}function oe(n,e,t){return Lh(n,e,t)}function mx(n){let e=n.startsWith("uniform "),t=e?n.slice(8):n,r=t.endsWith("[]"),i=r?t.slice(0,-2):t,s;switch(i){case"bool":s=A.Bool;break;case"int":case"uint":s=A.Int;break;case"float":s=A.Float;break;case"double":s=A.Double;break;case"token":s=A.Token;break;case"string":s=A.String;break;case"asset":s=A.String;break;case"double3":case"point3d":case"normal3d":case"vector3d":case"color3d":s=A.Vec3d;break;case"float3":case"point3f":case"normal3f":case"vector3f":case"color3f":case"texCoord2f":case"texCoord3f":s=A.Vec3f;break;case"quatf":case"quath":s=A.Quatf;break;case"quatd":s=A.Quatd;break;case"matrix4d":case"frame4d":s=A.Matrix4d;break;default:s=A.Token;break}return{typeId:s,isArray:r,isUniform:e}}function gx(n,e,t,r,i){if(e.every(p=>p>=-2147483648&&p<=2147483647&&(p|0)===p)){let p=Kt(e.map(f=>f|0));return r.u8(105),r.u64(p.length).bytes(p),oe(n,St|ec,i)}let c=Math.min(Math.floor(e.length/4),1024),l=[],u=[],d=!1;for(let p of e){let f=l.indexOf(p);if(f===-1&&(f=l.length),u.push(f),f===l.length)if(l.length!==c)l.push(p);else{d=!0;break}}if(!d&&l.length>0){r.u8(116),r.u32(l.length);for(let f of l)t?r.f64(f):r.f32(f);let p=Kt(u.map(f=>f|0));return r.u64(p.length).bytes(p),oe(n,St|ec,i)}return null}function Oh(n,e,t,r,i,s){let{typeId:o,isArray:a}=mx(n);if(o===A.Bool&&!a)return Xe(A.Bool,e?1:0);if(o===A.Token&&!a)return Xe(A.Token,t.intern(String(e)));if(o===A.String&&!a)return Xe(A.String,r.intern(String(e)));if(o===A.String&&a){let c=e.map(String),l=s+i.pos;i.u64(c.length);for(let u of c)i.u32(r.intern(u));return oe(A.String,St,l)}if(o===A.Token&&a){let c=e,l=s+i.pos;i.u64(c.length);for(let u of c)i.u32(t.intern(u));return oe(A.Token,St,l)}if(o===A.Int&&a){let c=e,l=s+i.pos;if(i.u64(c.length),c.length>=id){let u=Kt(c.map(d=>d|0));return i.u64(u.length).bytes(u),oe(A.Int,St|ec,l)}for(let u of c)i.u32(u>>>0);return oe(A.Int,St,l)}if(o===A.Vec3d&&!a){let[c,l,u]=e,d=s+i.pos;return i.f64(c??0).f64(l??0).f64(u??0),oe(A.Vec3d,0,d)}if(o===A.Vec3f&&!a){let[c,l,u]=e,d=s+i.pos;return i.f32(c??0).f32(l??0).f32(u??0),oe(A.Vec3f,0,d)}if(o===A.Vec3f&&a){let c=e,l=s+i.pos;i.u64(c.length);for(let u of c)i.f32(u[0]??0).f32(u[1]??0).f32(u[2]??0);return oe(A.Vec3f,St,l)}if(o===A.Vec3d&&a){let c=e,l=s+i.pos;i.u64(c.length);for(let u of c)i.f64(u[0]??0).f64(u[1]??0).f64(u[2]??0);return oe(A.Vec3d,St,l)}if(o===A.Float&&!a){let c=new ArrayBuffer(4);return new DataView(c).setFloat32(0,Number(e),!0),Xe(A.Float,new DataView(c).getUint32(0,!0))}if(o===A.Double&&!a){let c=s+i.pos;return i.f64(Number(e)),oe(A.Double,0,c)}if((o===A.Float||o===A.Double)&&a){let c=e.map(Number),l=s+i.pos,u=o===A.Double;if(i.u64(c.length),c.length>=id){let d=gx(o,c,u,i,l);if(d)return d}for(let d of c)u?i.f64(d):i.f32(d);return oe(o,St,l)}if(o===A.Int&&!a)return Xe(A.Int,e|0);if(o===A.Quatf||o===A.Quatd){let c=o===A.Quatd,l=d=>{let p=[d[1]??0,d[2]??0,d[3]??0,d[0]??0];for(let f of p)c?i.f64(f):i.f32(f)},u=s+i.pos;if(a){let d=e;i.u64(d.length);for(let p of d)l(p);return oe(o,St,u)}return l(e),oe(o,0,u)}if(o===A.Matrix4d){let c=u=>{let d=Array.isArray(u[0])?u.flat():u;for(let p=0;p<16;p++)i.f64(d[p]??0)},l=s+i.pos;if(a){let u=e;i.u64(u.length);for(let d of u)c(d);return oe(A.Matrix4d,St,l)}return c(e),oe(A.Matrix4d,0,l)}return Xe(A.Token,t.intern(String(e)))}function yx(n,e,t,r,i,s){let o=e.map(([,l])=>Oh(n,l,t,r,i,s)),a=s+i.pos;i.u64(e.length);for(let[l]of e)i.f64(l);let c=s+i.pos;i.u64(8),i.bytes(oe(A.DoubleVector,0,a)),i.u64(8),i.u64(e.length);for(let l of o)i.bytes(l);return oe(A.TimeSamples,0,c)}function bx(n){return n==="def"||n===0?0:n==="over"||n===1?1:n==="class"||n===2?2:0}function Px(n,e){for(let t of["","primChildren","properties","specifier","typeName","variability","default","custom","timeSamples"])e.intern(t);for(let[t,r]of Object.entries(n)){for(let c of t.split(/[\/.]/).filter(Boolean))e.intern(c);if(!r)continue;let i=r.typeName?.value;i&&e.intern(i.startsWith("uniform ")?i.slice(8):i);let s=r.default?.value;if(typeof s=="string"&&e.intern(s),Array.isArray(s)&&typeof s[0]=="string")for(let c of s)e.intern(c);let o=r.primChildren?.value;if(o)for(let c of o)e.intern(c);let a=r.properties?.value;if(a)for(let c of a)e.intern(c)}}function Sx(n){let e=[];for(let t of Uh(n))if(typeof t=="string")t.startsWith("/")&&e.push(t);else if(t&&typeof t=="object"&&"primPath"in t){let r=t.primPath;r&&r.startsWith("/")&&e.push(r)}return e}function xx(n){for(let e of Object.values(n))for(let t of["references","payload"])for(let r of Uh(e[t]?.value))if(r&&typeof r=="object"&&"primPath"in r&&!r.primPath)return!0;return!1}function Tx(n){let e=new Map,t=(i,s)=>{let o=e.get(i)??[];o.includes(s)||(o.push(s),e.set(i,o))},r=i=>{let s=i.split("/").filter(Boolean),o="/";for(let a of s){let c=Fh(o,a);n[c]||t(o,a),o=c}};for(let i of Object.values(n))if(i)for(let s of["references","payload","inheritPaths","specializes","targetPaths","connectionPaths"])for(let o of Sx(i[s]?.value))r(o);return e}function Fh(n,e){return n==="/"?`/${e}`:`${n}/${e}`}function ld(n,e,t){let r=[],i=n[e],s=i?.properties?.value;if(s)for(let c of s)r.push({path:`${e==="/"?"":e}.${c}`,name:c,isProp:!0});let o=new Set,a=i?.primChildren?.value;if(a)for(let c of a)o.add(c);for(let c of t.get(e)??[])o.add(c);for(let c of o)r.push({path:Fh(e,c),name:c,isProp:!1});return r}function Bh(n,e,t){let r=1;for(let i of ld(n,e,t))r+=i.isProp?1:Bh(n,i.path,t);return r}function Ax(n,e,t){let r=[],i=new Map,s=[],o=[];r.push("/"),i.set("/",0),s.push(0);let a=ld(n,"/",t);if(a.length===0)return o.push(-2),{dfsPaths:r,pathToIdx:i,elementTokenIndices:s,jumps:o};o.push(-1);function c(l){for(let u=0;u<l.length;u++){let{path:d,name:p,isProp:f}=l[u],h=u===l.length-1,y=r.length;r.push(d),i.set(d,y),s.push(f?-e.get(p):e.get(p));let g=ld(n,d,t),m=g.length>0,P;if(m&&h)P=-1;else if(m&&!h){let b=0;for(let S of g)b+=S.isProp?1:Bh(n,S.path,t);P=1+b}else!m&&h?P=-2:P=0;o.push(P),m&&c(g)}}return c(a),{dfsPaths:r,pathToIdx:i,elementTokenIndices:s,jumps:o}}function Qi(n){let e={isExplicit:!1,explicit:[],added:[],prepended:[],appended:[],deleted:[],ordered:[]};if(n==null)return null;if(Array.isArray(n))return n.length===0?null:{...e,prepended:n};if(typeof n=="object"&&"isExplicit"in n){let t=n,r={isExplicit:!!t.isExplicit,explicit:t.explicitItems??[],added:t._sdfAddedItems??[],prepended:t.prependedItems??[],appended:t.appendedItems??[],deleted:t.deletedItems??[],ordered:t.orderedItems??[]};return r.isExplicit||r.explicit.length||r.added.length||r.prepended.length||r.appended.length||r.deleted.length||r.ordered.length?r:null}return typeof n=="string"?{...e,prepended:[n]}:null}function dd(n,e,t){let r=0;n.isExplicit&&(r|=ni.IsExplicit),n.explicit.length&&(r|=ni.HasExplicitItems),n.added.length&&(r|=ni.HasAddedItems),n.prepended.length&&(r|=ni.HasPrependedItems),n.appended.length&&(r|=ni.HasAppendedItems),n.deleted.length&&(r|=ni.HasDeletedItems),n.ordered.length&&(r|=ni.HasOrderedItems),e.u8(r),n.explicit.length&&t(n.explicit),n.added.length&&t(n.added),n.prepended.length&&t(n.prepended),n.appended.length&&t(n.appended),n.deleted.length&&t(n.deleted),n.ordered.length&&t(n.ordered)}function sd(n,e,t,r){let i=r+t.pos,s=o=>o.map(a=>e.get(a)).filter(a=>a!==void 0);return dd(n,t,o=>{let a=s(o);t.u64(a.length);for(let c of a)t.u32(c)}),oe(A.PathListOp,0,i)}function Gh(n,e,t,r){let i=r+t.pos;return dd(n,t,s=>{t.u64(s.length);for(let o of s)t.u32(e.intern(o))}),oe(A.TokenListOp,0,i)}function vx(n,e,t,r,i,s){let o=s+i.pos;return dd(n,i,a=>{i.u64(a.length);for(let c of a){let l=c.assetPath??"",u=c.primPath??"",d=c.layerOffset??{offset:0,scale:1};i.u32(t.intern(l)),i.u32(u?r.get(u)??0:r.get("")??0),i.f64(d.offset).f64(d.scale),e&&i.u64(0)}}),oe(e?A.ReferenceListOp:A.PayloadListOp,0,o)}function _x(n,e,t,r){let i=r+t.pos;t.u64(n.length);for(let s of n)t.u32(e.intern(s));return oe(A.StringVector,St,i)}function Ix(n,e,t){let r=t+e.pos;e.u64(n.length);for(let i of n)e.f64(i.offset).f64(i.scale);return oe(A.LayerOffsetVector,St,r)}function wx(n,e,t,r){let i=Object.entries(n),s=r+t.pos;t.u64(i.length);for(let[o,a]of i){let c=Array.isArray(a)?a[0]??"":a;t.u32(e.intern(o)),t.u32(e.intern(c))}return oe(A.VariantSelectionMap,0,s)}function kx(n,e,t){let r=t+e.pos;return e.f64(n),oe(A.Double,0,r)}function Uh(n){if(Array.isArray(n))return n;if(n!==null&&typeof n=="object"&&"isExplicit"in n){let e=n;return e.isExplicit?[...e.explicitItems]:[...e.prependedItems,...e.appendedItems]}return typeof n=="string"?[n]:[]}function Cx(n,e,t,r,i,s,o){let a=e[n];if(!a)return[];let c=[],l=n==="/",u=!l&&n.includes(".");if(u&&a.typeName?.value==="rel"){c.push({tokenIdx:t.intern("custom"),rep:Xe(A.Bool,0)}),c.push({tokenIdx:t.intern("variability"),rep:Xe(A.Variability,1)});let d=Qi(a.targetPaths?.value);return d&&c.push({tokenIdx:t.intern("targetPaths"),rep:sd(d,o,i,s)}),c}if(u){let d=a.typeName?.value;c.push({tokenIdx:t.intern("custom"),rep:Xe(A.Bool,0)});let p=Qi(a.connectionPaths?.value);if(p&&c.push({tokenIdx:t.intern("connectionPaths"),rep:sd(p,o,i,s)}),d){let y=d.startsWith("uniform "),g=y?d.slice(8):d;c.push({tokenIdx:t.intern("typeName"),rep:Xe(A.Token,t.intern(g))}),c.push({tokenIdx:t.intern("variability"),rep:Xe(A.Variability,y?1:0)})}let f=a.default?.value;f!==void 0&&d&&c.push({tokenIdx:t.intern("default"),rep:Oh(d,f,t,r,i,s)});let h=a.timeSamples?.value;h&&h.length>0&&d&&c.push({tokenIdx:t.intern("timeSamples"),rep:yx(d,h,t,r,i,s)})}else{if(l){for(let y of["defaultPrim","upAxis"]){let g=a[y]?.value;typeof g=="string"&&c.push({tokenIdx:t.intern(y),rep:Xe(A.Token,t.intern(g))})}for(let y of["metersPerUnit","startTimeCode","endTimeCode","timeCodesPerSecond","framesPerSecond"]){let g=a[y]?.value;typeof g=="number"&&c.push({tokenIdx:t.intern(y),rep:kx(g,i,s)})}let h=a.subLayers?.value;if(h&&h.length>0){c.push({tokenIdx:t.intern("subLayers"),rep:_x(h,r,i,s)});let y=a.subLayerOffsets?.value,g=h.map((m,P)=>y?.[P]??{offset:0,scale:1});c.push({tokenIdx:t.intern("subLayerOffsets"),rep:Ix(g,i,s)})}}else{c.push({tokenIdx:t.intern("specifier"),rep:Xe(A.Specifier,bx(a.specifier?.value))});for(let b of["active","instanceable"]){let S=a[b]?.value;S!==void 0&&c.push({tokenIdx:t.intern(b),rep:Xe(A.Bool,S?1:0)})}let h=a.kind?.value;typeof h=="string"&&c.push({tokenIdx:t.intern("kind"),rep:Xe(A.Token,t.intern(h))});let y=Qi(a.apiSchemas?.value);y&&c.push({tokenIdx:t.intern("apiSchemas"),rep:Gh(y,t,i,s)});for(let b of["references","payload"]){let S=Qi(a[b]?.value);S&&c.push({tokenIdx:t.intern(b),rep:vx(S,b==="references",r,o,i,s)})}for(let b of["inheritPaths","specializes"]){let S=Qi(a[b]?.value);S&&c.push({tokenIdx:t.intern(b),rep:sd(S,o,i,s)})}let g=Qi(a.variantSetNames?.value);g&&c.push({tokenIdx:t.intern("variantSetNames"),rep:Gh(g,t,i,s)});let m=a.variantSetChildren?.value;if(m&&m.length>0){let b=s+i.pos;i.u64(m.length);for(let S of m)i.u32(t.intern(S));c.push({tokenIdx:t.intern("variantSetChildren"),rep:oe(A.TokenVector,0,b)})}let P=a.variantSelection?.value;P&&typeof P=="object"&&Object.keys(P).length>0&&c.push({tokenIdx:t.intern("variantSelection"),rep:wx(P,r,i,s)})}let d=a.typeName?.value;d&&c.push({tokenIdx:t.intern("typeName"),rep:Xe(A.Token,t.intern(d))});let p=a.primChildren?.value;if(p&&p.length>0){let h=s+i.pos;i.u64(p.length);for(let y of p)i.u32(t.intern(y));c.push({tokenIdx:t.intern("primChildren"),rep:oe(A.TokenVector,0,h)})}let f=a.properties?.value;if(f&&f.length>0){let h=s+i.pos;i.u64(f.length);for(let y of f)i.u32(t.intern(y));c.push({tokenIdx:t.intern("properties"),rep:oe(A.TokenVector,0,h)})}}return c}function $h(n){let e={};for(let $ of n.getSpecPaths()){let qe={};for(let Tn of n.getFieldNames($))qe[Tn]={value:n.getField($,Tn)};e[$]=qe}let t=32,r=new ad;Px(e,r);let i=new cd(r),s=Tx(e);for(let $ of s.values())for(let qe of $)r.intern(qe);let{dfsPaths:o,pathToIdx:a,elementTokenIndices:c,jumps:l}=Ax(e,r,s),u=o.length,d=o.map(($,qe)=>qe),p=u;xx(e)&&(a.set("",u),p=u+1);let f=new Cn,h=t,y=[],g=[],m=[],P=[],b=[];for(let $ of o){if(!e[$])continue;let qe=$==="/",Tn=!qe&&$.includes("."),lu=Tn&&e[$]?.typeName?.value==="rel",uP=qe?Ja.PseudoRoot:lu?Ja.Relationship:Tn?Ja.Attribute:Ja.Prim,dP=Cx($,e,r,i,f,h,a),pP=b.length;for(let fP of dP)b.push(y.length),y.push(fP);b.push(-1),g.push($),m.push(uP),P.push(pP)}let S=r.tokens,x=new TextEncoder,v=S.map($=>{let qe=x.encode($),Tn=new Uint8Array(qe.length+1);return Tn.set(qe),Tn}),T=v.reduce(($,qe)=>$+qe.length,0),w=new Uint8Array(T),D=0;for(let $ of v)w.set($,D),D+=$.length;let G=Gi(w),_=new Cn;_.u64(S.length).u64(T).u64(G.length).bytes(G);let k=i.tokenIndices,E=new Cn;E.u64(k.length);for(let $ of k)E.u32($);let q=y.map($=>$.tokenIdx),ae=Kt(q),se=new Uint8Array(y.length*8);for(let $=0;$<y.length;$++)se.set(y[$].rep,$*8);let N=Gi(se),X=new Cn;X.u64(y.length),X.u64(ae.length).bytes(ae),X.u64(N.length).bytes(N);let ce=Kt(b),U=new Cn;U.u64(b.length),U.u64(ce.length).bytes(ce);let Y=Kt(d),le=Kt(c),de=Kt(l),j=new Cn;j.u64(p).u64(u),j.u64(Y.length).bytes(Y),j.u64(le.length).bytes(le),j.u64(de.length).bytes(de);let H=g.map($=>a.get($)??0),Dt=P,Ke=m,Ve=g.length,Rt=Kt(H),W=Kt(Dt),jr=Kt(Ke),Ge=new Cn;Ge.u64(Ve),Ge.u64(Rt.length).bytes(Rt),Ge.u64(W.length).bytes(W),Ge.u64(jr.length).bytes(jr);let _e=new Cn;_e.ascii("PXR-USDC",8),_e.u8(0).u8(8).u8(0),_e.ascii("",5);let Os=_e.pos;_e.u64(0),_e.u64(0),_e.bytes(f.toUint8Array());let ka=[["TOKENS",_.toUint8Array()],["STRINGS",E.toUint8Array()],["FIELDS",X.toUint8Array()],["FIELDSETS",U.toUint8Array()],["PATHS",j.toUint8Array()],["SPECS",Ge.toUint8Array()]],Gf=[];for(let[,$]of ka)Gf.push({offset:_e.pos,size:$.length}),_e.bytes($);let lP=_e.pos;_e.patchU64(Os,lP),_e.u64(ka.length);for(let $=0;$<ka.length;$++){let[qe]=ka[$],{offset:Tn,size:lu}=Gf[$];_e.ascii(qe,16).u64(Tn).u64(lu)}return _e.toUint8Array()}var Dx={1:"attribute",2:"connection",3:"expression",4:"mapper",5:"mapperArg",6:"prim",7:"pseudoRoot",8:"relationship",9:"relationshipTarget",10:"variant",11:"variantSet"},Rx=new Set(["comment","documentation","subLayers","subLayerOffsets","defaultPrim","startTimeCode","endTimeCode","timeCodesPerSecond","framesPerSecond","startFrame","endFrame","framePrecision","metersPerUnit","upAxis","expressionVariables","owner","sessionOwner","hasOwnedSubLayers","primChildren","primOrder","relocates","layerRelocates","colorConfiguration","colorManagementSystem","fallbackPrimTypes"]);function zh(n,e){let t=e.form===void 0?void 0:Dx[e.form];if(t)return t;if(n==="/")return"pseudoRoot";if(/\{[^}=]+=[^}]*\}$/.test(n))return/=\}$/.test(n)?"variantSet":"variant";let r=n.lastIndexOf("/");if(n.indexOf(".",r)>=0){let i=e.typeName?.value,s=e.targetPaths?.value;return i==="rel"||s!==void 0?"relationship":"attribute"}return"prim"}function Ex(n){return(n instanceof Map?[...n]:Array.isArray(n)?n.filter(t=>Array.isArray(t)&&t.length>=2):n!==null&&typeof n=="object"?Object.entries(n):[]).map(([t,r])=>[Number(t),r!==null&&typeof r=="object"&&"typeId"in r&&"value"in r?r.value:r]).filter(([t])=>Number.isFinite(t)).sort(([t],[r])=>t-r)}function Nx(n){let e=n.replace(/\[\]$/,"");return e==="float"||e==="quatf"||/^(?:color|point|normal|vector|texCoord)[234]f$/.test(e)}function nc(n,e){return Nx(e)?typeof n=="number"?Math.fround(n):Array.isArray(n)?n.map(t=>nc(t,e)):n:n}function Vx(n){if(!(n instanceof we))return n;let t=n.GetValueType().GetTypeName()==="float";for(let r of n.GetKnots()){if(r.GetPreTanWidth()<0||r.GetPostTanWidth()<0)throw new Error("Cannot set negative tangent width");if(t){if([r.GetValue(),r.GetPreValue()].some(s=>!Number.isFinite(Math.fround(s))))throw new Error("Cannot set undefined float spline value");r.SetValue(Math.fround(r.GetValue())),r.IsDualValued()&&r.SetPreValue(Math.fround(r.GetPreValue())),r.SetPreTanSlope(Math.fround(r.GetPreTanSlope())),r.SetPostTanSlope(Math.fround(r.GetPostTanSlope()))}}return n}function Gx(n){return n===null||typeof n!="object"||!n._sdfExplicitEmpty?n:{...n,isExplicit:!0}}function rc(n){let e=new kn;for(let[t,r]of Object.entries(n)){let i=zh(t,r);e.createSpec(t,i);let s=r.typeName?.value,o=typeof s=="string"?s:"";for(let[a,c]of Object.entries(r)){if(a==="form"||a==="fields")continue;let l=c,u=l?.value;if(u===void 0)continue;let d=u,p=a==="specifier"&&typeof d=="number"?["def","over","class"][d]:a==="variability"&&typeof d=="number"?["varying","uniform"][d]:d;if(!(a==="typeName"&&p==="__AnyType__")&&!(t==="/"&&!Rx.has(a)&&Sr(a,"layer")===void 0)){if(a==="timeSamples")e.set(t,a,Ex(d).map(([f,h])=>[f,nc(h,o)]));else{let f=Gx(p);e.set(t,a,a==="default"?nc(f,o):a==="spline"?Vx(f):a==="customData"?Ou(f,nc):a==="documentation"&&typeof f=="string"?f.replace(/\\(['"\\])/g,"$1"):f)}l?.valueTypeName&&e.setValueTypeName(t,a,l.valueTypeName)}}i==="variant"&&!e.has(t,"specifier")&&e.set(t,"specifier","over"),i==="relationship"&&!e.has(t,"variability")&&e.set(t,"variability","uniform")}for(let[t,r]of Object.entries(n)){if(zh(t,r)!=="prim")continue;let i=e.get(t,"variantSetNames"),s=[...new Set([...i?.explicitItems??[],...i?.prependedItems??[],...i?.appendedItems??[]].filter(o=>typeof o=="string"))];if(s.length!==0){e.set(t,"variantSetChildren",s);for(let o of s){let a=`${t}{${o}=}`;e.hasSpec(a)||e.createSpec(a,"variantSet")}}}return e}var Zn=class{constructor(e,t){this.raw=e;this.value=t}valueOf(){return this.value}};function ao(n){return n instanceof Zn?n.value:Array.isArray(n)?n.map(ao):n}function Mx(n){switch(n){case"bool":return"bool";case"int":case"uint":return"int";case"int64":case"uint64":return"int64";case"float":case"double":case"half":case"timecode":return"float";case"string":return"string";case"token":return"token";case"asset":return"asset";default:return"unknown"}}function Lx(n){switch(n){case"int":return"int";case"float":case"double":case"half":return"float";case"point":case"normal":case"vector":case"color":case"texCoord":return"float";default:return"unknown"}}function Ox(n){if(n==="frame4d")return{kind:"matrix",dim:4,scalar:"float"};let e=/^matrix([234])d$/.exec(n);if(e)return{kind:"matrix",dim:parseInt(e[1],10),scalar:"float"};if(/^quat[fdh]$/.test(n))return{kind:"quat",dim:4,scalar:"float"};let t=/^(float|double|half|int)([234])$/.exec(n);if(t)return{kind:"vec",dim:parseInt(t[2],10),scalar:Lx(t[1])};if(t=/^(point|normal|vector|color|texCoord)([234])[fdh]?$/.exec(n),t)return{kind:"vec",dim:parseInt(t[2],10),scalar:"float"};let r=Mx(n);return r!=="unknown"?{kind:"scalar",dim:1,scalar:r}:null}function ic(n,e){if(n==null)return n;switch(e){case"bool":return n instanceof Zn?n.value!==0:typeof n=="boolean"?n:typeof n=="number"?n!==0:n==="true"||n==="True"?!0:n==="false"||n==="False"?!1:n;case"int":if(n instanceof Zn)return Math.trunc(n.value);if(typeof n=="number")return Math.trunc(n);if(typeof n=="string"){let t=Number(n);return Number.isFinite(t)?Math.trunc(t):n}return typeof n=="bigint"?Number(n):n;case"int64":if(n instanceof Zn)try{return BigInt(n.raw)}catch{return BigInt(Math.trunc(n.value))}if(typeof n=="bigint")return n;if(typeof n=="number")return BigInt(Math.trunc(n));if(typeof n=="string")try{return BigInt(n)}catch{return n}return n;case"float":if(n instanceof Zn)return n.value;if(typeof n=="number")return n;if(typeof n=="string"){let t=Number(n);return Number.isFinite(t)||n==="inf"||n==="-inf"||n==="nan"?t:n}return typeof n=="bigint"?Number(n):n;case"string":case"token":case"asset":return n;default:return n}}function sc(n){if(!Array.isArray(n))return[n];let e=[];for(let t of n)Array.isArray(t)?e.push(...sc(t)):e.push(t);return e}function pd(n,e){if(n==null)return n;switch(e.kind){case"scalar":return ic(n,e.scalar);case"vec":return sc(n).map(r=>ic(r,e.scalar));case"quat":return sc(n).map(r=>ic(r,"float"));case"matrix":{let t=sc(n).map(s=>ic(s,"float")),r=e.dim;if(t.length<r*r)return t;let i=[];for(let s=0;s<r;s++)i.push(t.slice(s*r,s*r+r));return i}default:return n}}function co(n,e){if(n==null||!e)return n;let t=e;(t.startsWith("uniform ")||t.startsWith("varying "))&&(t=t.slice(8));let r=t.endsWith("[]"),i=r?t.slice(0,-2):t,s=Ox(i);return s?r?Array.isArray(n)?n.map(o=>pd(o,s)):[pd(n,s)]:pd(n,s):ao(n)}function Fx(n){let e=n instanceof eo?n:void 0,t=e?.value??n;return{typeId:0,isArray:Array.isArray(t),isInlined:!1,isCompressed:!1,payload:0,value:t,...e?{valueTypeName:e.typeName}:{}}}function ii(n,e,t){let r={};for(let[i,s]of Object.entries(t))r[i]=Fx(s);n[e]={form:0,fields:r,...r}}function Bx(n,e){n.need("{");let t=e==="timecode"?"double":e;if(n.peek()==="}"){n.need("}");let p=new we(z.Declare(t));return p.SetTimeValued(e==="timecode"),ja(p,{preExtrapolationAuthored:!1,postExtrapolationAuthored:!1,knots:new Map}),p}let r=n.peekWord(),s=(r==="hermite"||r==="bezier"?n.word():"bezier")==="hermite"?1:0;n.eat(",");let o=new we(z.Declare(t));o.SetTimeValued(e==="timecode"),o.SetCurveType(s);let a=[],c=new Map,l=new Map,u=!1,d=!1;for(;!n.eof()&&n.peek()!=="}";){let p=n.peekWord();if(p==="pre"||p==="post"){n.word(),n.need(":");let b=n.word(),S=b==="sloped"?3:b==="linear"?2:b==="none"?0:1,x=0;n.eat("(")&&(x=n.number(),n.need(")"));let v=new We(S,x);p==="pre"?(u=!0,o.SetPreExtrapolation(v)):(d=!0,o.SetPostExtrapolation(v)),n.eat(",");continue}if(p==="loop"){n.word(),n.need(":"),n.need("(");let b=[];for(let S=0;S<5;S++)b.push(n.number()),S<4&&n.need(",");n.need(")"),o.SetInnerLoopParams(new Qe(...b)),n.eat(",");continue}let f=new yt(o.GetValueType());f.SetCurveType(s),f.SetNextInterpolation(1),f.SetTime(n.number()),n.need(":");let h=n.number();n.eat("&")&&(f.SetPreValue(h),h=n.number()),f.SetValue(h);let y=0,g=0,m=0,P=0;for(;n.eat(";");){if(n.peek()==="{"){let D=xt(n);if(D&&typeof D=="object"&&!Array.isArray(D)){let G=Ui(D);G&&c.set(f.GetTime(),G),f.SetCustomData(D)}continue}let b=n.word(),S="";b==="post"&&n.peek()!=="("&&(S=n.word());let x=0,v=0,T=0,w=0;if(n.eat("(")){let D=n.number(),G=0;if(n.eat(",")){let _=n.peekWord();if(_==="autoEase"||_==="custom")G=n.word()==="autoEase"?2:1,v=D,w=D;else{let k=n.number();x=D,v=k,w=D,T=k,n.eat(",")&&(G=n.word()==="autoEase"?2:1)}}else v=D,w=D;n.need(")"),b==="pre"?f.SetPreTanAlgorithm(G):f.SetPostTanAlgorithm(G)}b==="pre"?(g=T,y=w,f.SetPreTanWidth(x),f.SetPreTanSlope(v)):(P=T,m=w,f.SetPostTanWidth(x),f.SetPostTanSlope(v),f.SetNextInterpolation(S==="none"?0:S==="held"?1:S==="linear"?2:3))}l.set(f.GetTime(),{dualValued:f.IsDualValued(),preTangentSlope:y,preTangentWidth:g,postTangentSlope:m,postTangentWidth:P}),a.push(f),n.eat(",")}return n.need("}"),o.SetKnots(a),c.size&&Mu(o,c),ja(o,{preExtrapolationAuthored:u,postExtrapolationAuthored:d,knots:l}),o}var fd=class{constructor(e,t=""){this.sourceName=t;this.src=e}src;pos=0;eof(){return this.pos>=this.src.length}at(e=0){return this.src[this.pos+e]??""}ws(){for(;!this.eof();){let e=this.at();if(e===" "||e==="	"||e==="\r"||e===`
`)this.pos++;else if(e==="#")for(;!this.eof()&&this.at()!==`
`;)this.pos++;else if(e==="/"&&this.at(1)==="*")for(this.pos+=2;!this.eof();){if(this.at()==="*"&&this.at(1)==="/"){this.pos+=2;break}this.pos++}else break}}peek(){return this.ws(),this.at()}word(){this.ws();let e="";for(;!this.eof()&&/[a-zA-Z0-9_]/.test(this.at());)e+=this.src[this.pos++];return e}peekWord(){let e=this.pos;this.ws();let t="",r=this.pos;for(;r<this.src.length&&/[a-zA-Z0-9_]/.test(this.src[r]);)t+=this.src[r++];return this.pos=e,t}ident(){this.ws();let e="";for(;!this.eof()&&/[a-zA-Z0-9_:]/.test(this.at());)e+=this.src[this.pos++];return e.replace(/:+$/,"")}eat(e){return this.ws(),this.src.startsWith(e,this.pos)?(this.pos+=e.length,!0):!1}need(e){if(!this.eat(e))throw new Error(`Expected '${e}' at ${this.pos}, got: '${this.src.slice(this.pos,this.pos+30)}'`)}expectedListOperand(e){this.ws();let t=this.src.slice(0,this.pos).split(/\r?\n/),r=t.length,i=(t.at(-1)?.length??0)+1,s=this.at();if(s==="@"){let a=this.src.indexOf("@",this.pos+1);s=a<0?this.src.slice(this.pos):this.src.slice(this.pos,a+1)}else s=this.src.slice(this.pos).match(/^[^\s,;)]+/)?.[0]??s;let o=this.sourceName?`${this.sourceName}:`:"";throw new Error(`${o}${r}:${i}: Expected None or [ at '${s}' in <${e}>`)}string(){this.ws();let e=this.at();if(e!=='"'&&e!=="'")throw new Error(`Expected string at ${this.pos}`);let t=e+e+e;if(this.src.startsWith(t,this.pos)){this.pos+=3;let i="";for(;!this.eof();){if(this.src.startsWith(t,this.pos)){this.pos+=3;break}let s=this.src[this.pos];s==="\\"?(this.pos++,i+=this.readEscape()):(i+=s,this.pos++)}return i}this.pos++;let r="";for(;!this.eof();){let i=this.src[this.pos];if(i===e){this.pos++;break}i==="\\"?(this.pos++,r+=this.readEscape()):(r+=i,this.pos++)}return r}readEscape(){let e=this.src[this.pos++]??"";switch(e){case"n":return`
`;case"t":return"	";case"r":return"\r";case"\\":return"\\";case'"':return'"';case"'":return"'";case"x":{let t=/^[0-9a-fA-F]{1,2}/.exec(this.src.slice(this.pos,this.pos+2));return t?(this.pos+=t[0].length,String.fromCharCode(parseInt(t[0],16))):"\\x"}default:return"\\"+e}}rawNumber(){this.ws();let e="",t=!0;if((this.at()==="-"||this.at()==="+")&&(e+=this.src[this.pos++]),/[0-9]/.test(this.at()))for(;!this.eof()&&/[0-9]/.test(this.at());)e+=this.src[this.pos++];if(this.at()==="."&&/[0-9]/.test(this.at(1)))for(t=!1,e+=this.src[this.pos++];!this.eof()&&/[0-9]/.test(this.at());)e+=this.src[this.pos++];if(this.at()==="e"||this.at()==="E")for(t=!1,e+=this.src[this.pos++],(this.at()==="+"||this.at()==="-")&&(e+=this.src[this.pos++]);!this.eof()&&/[0-9]/.test(this.at());)e+=this.src[this.pos++];return{raw:e,value:parseFloat(e),isInt:t}}number(){return this.rawNumber().value}asset(){if(this.need("@"),this.at()==="@"&&this.at(1)==="@"){this.pos+=2;let t=this.src.indexOf("@@@",this.pos),r=t<0?"":this.src.slice(this.pos,t);return t>=0&&(this.pos=t+3),r}let e="";for(;!this.eof()&&this.at()!=="@";)e+=this.src[this.pos++];return this.eof()||this.pos++,e}path(){this.need("<");let e="";for(;!this.eof()&&this.at()!==">";)e+=this.src[this.pos++];return this.pos++,e}skipBlock(){this.need("{");let e=1;for(;!this.eof()&&e>0;){let t=this.src[this.pos];if(t==="{")e++,this.pos++;else if(t==="}")e--,this.pos++;else if(t==='"'||t==="'"){let r=t,i=r+r+r;if(this.src.startsWith(i,this.pos)){this.pos+=3;let s=this.src.indexOf(i,this.pos);this.pos=s<0?this.src.length:s+3}else{for(this.pos++;!this.eof()&&this.src[this.pos]!==r;)this.src[this.pos]==="\\"&&this.pos++,this.pos++;this.pos++}}else if(t==="#")for(;!this.eof()&&this.src[this.pos]!==`
`;)this.pos++;else if(t==="/"&&this.src[this.pos+1]==="*"){this.pos+=2;let r=this.src.indexOf("*/",this.pos);this.pos=r<0?this.src.length:r+2}else if(t==="@")if(this.pos++,this.src[this.pos]==="@"&&this.src[this.pos+1]==="@"){this.pos+=2;let r=this.src.indexOf("@@@",this.pos);this.pos=r<0?this.src.length:r+3}else{for(;!this.eof()&&this.src[this.pos]!=="@";)this.pos++;this.eof()||this.pos++}else this.pos++}}skipParen(){this.need("(");let e=1;for(;!this.eof()&&e>0;){let t=this.src[this.pos];if(t==="(")e++,this.pos++;else if(t===")")e--,this.pos++;else if(t==='"'||t==="'"){let r=t,i=r+r+r;if(this.src.startsWith(i,this.pos)){this.pos+=3;let s=this.src.indexOf(i,this.pos);this.pos=s<0?this.src.length:s+3}else{for(this.pos++;!this.eof()&&this.src[this.pos]!==r;)this.src[this.pos]==="\\"&&this.pos++,this.pos++;this.pos++}}else if(t==="#")for(;!this.eof()&&this.src[this.pos]!==`
`;)this.pos++;else if(t==="/"&&this.src[this.pos+1]==="*"){this.pos+=2;let r=this.src.indexOf("*/",this.pos);this.pos=r<0?this.src.length:r+2}else this.pos++}}skipBracket(){this.need("[");let e=1;for(;!this.eof()&&e>0;){let t=this.src[this.pos];if(t==="[")e++,this.pos++;else if(t==="]")e--,this.pos++;else if(t==='"'||t==="'"){let r=t,i=r+r+r;if(this.src.startsWith(i,this.pos)){this.pos+=3;let s=this.src.indexOf(i,this.pos);this.pos=s<0?this.src.length:s+3}else{for(this.pos++;!this.eof()&&this.src[this.pos]!==r;)this.src[this.pos]==="\\"&&this.pos++,this.pos++;this.pos++}}else if(t==="#")for(;!this.eof()&&this.src[this.pos]!==`
`;)this.pos++;else this.pos++}}};function xt(n){n.ws();let e=n.peek();if(!e)return null;if(n.src.startsWith("None",n.pos)&&!/[a-zA-Z0-9_]/.test(n.src[n.pos+4]??""))return n.pos+=4,null;if(e==='"'||e==="'")return n.string();if(e==="("){n.need("(");let t=[];for(;n.peek()!==")"&&!n.eof()&&(t.length>0&&n.eat(","),n.ws(),n.peek()!==")");)t.push(xt(n));return n.need(")"),t}if(e==="["){n.need("[");let t=[];for(;n.peek()!=="]"&&!n.eof()&&(t.length>0&&n.eat(","),n.ws(),n.peek()!=="]");)t.push(xt(n));return n.need("]"),t}if(e==="@")return n.asset();if(e==="<")return n.path();if(e==="{")return Ux(n);if((e==="-"||e==="+")&&/[a-zA-Z_]/.test(n.at(1))){let t=e==="-"?-1:1;n.pos++;let r=n.word();return r==="inf"||r==="Inf"||r==="INF"?t*(1/0):r==="nan"||r==="NaN"?t*NaN:`${e}${r}`}if(e==="-"||e==="+"||/[0-9]/.test(e)||e==="."&&/[0-9]/.test(n.at(1))){let t=n.rawNumber();return t.isInt?new Zn(t.raw,t.value):t.value}if(/[a-zA-Z_]/.test(e)){let t=n.pos,r=n.word();return r==="true"||r==="True"?!0:r==="false"||r==="False"?!1:r==="None"?null:r==="edit"&&n.peek()==="["?(n.skipBracket(),null):r==="inf"||r==="Inf"||r==="INF"?1/0:r==="nan"||r==="NaN"?NaN:r}return n.pos++,null}function hd(n,e,t){let r=n.peek(),i=n.peekWord(),s=r==='"'||r==="'"?"string":r==="@"?"asset":r==="<"?"path":r==="{"?"dictionary":i==="true"||i==="True"||i==="false"||i==="False"?"bool":i==="inf"||i==="Inf"||i==="INF"||i==="nan"||i==="NaN"?"double":/[-+0-9.]/.test(r)?/[.eE]/.test(n.src.slice(n.pos).match(/^[^\s,;)\]}]+/)?.[0]??"")?"double":"int":i?"token":void 0,o=ao(xt(n));return Sr(e,t)===void 0&&s?new eo(o,s):o}function Ux(n){n.need("{");let e={},t=new Map;for(;!n.eof()&&n.peek()!=="}"&&(n.ws(),n.peek()!=="}");){if(n.peek()==='"'||n.peek()==="'"){n.string(),n.eat(";");continue}let r=n.word();if(!r){n.pos++;continue}if(n.ws(),n.peek()==="}")break;let i=n.eat("[]"),s=n.ident();if(!s){n.pos++;continue}if(n.eat("=")){let o=xt(n),a=i?`${r}[]`:r;e[s]=r==="dictionary"?o:co(o,a),t.set(s,a)}n.eat(";")}return n.need("}"),Ys(e,t),e}function Kh(n){let e={};for(n.need("{");!n.eof()&&n.peek()!=="}"&&(n.ws(),n.peek()!=="}");){if(n.peek()==='"'||n.peek()==="'"){n.string(),n.eat(",");continue}if(n.peek()===","){n.pos++;continue}if(n.peek()!=="<"){n.pos++;continue}let t=n.path();n.ws(),n.eat(":"),n.ws();let r=n.peek()==="<"?n.path():"";t&&!(t in e)&&(e[t]=r),n.eat(",")}return n.need("}"),e}function $x(n){n.need("{");let e={};for(;!n.eof()&&n.peek()!=="}"&&(n.ws(),n.peek()!=="}");){let t=n.src.slice(n.pos),r=n.number();n.eat(":");let i=xt(n);e[String(r)]=i,n.eat(",")}return n.need("}"),e}function Ar(){return{isExplicit:!1,explicitItems:[],prependedItems:[],appendedItems:[],deletedItems:[],orderedItems:[]}}function vr(n,e,t){let r=()=>{n.isExplicit=!1,n.explicitItems.length=0,delete n._sdfAddedItems,n.prependedItems.length=0,n.appendedItems.length=0,n.deletedItems.length=0,n.orderedItems.length=0,delete n._sdfExplicitEmpty};if(!e){r(),t.length>0?(n.isExplicit=!0,n.explicitItems.push(...t)):Object.defineProperty(n,"_sdfExplicitEmpty",{value:!0,configurable:!0,enumerable:!1});return}if(n.isExplicit&&r(),delete n._sdfExplicitEmpty,e==="prepend")n.prependedItems.push(...t);else if(e==="add"){let i=n._sdfAddedItems??[];i.push(...t),Object.defineProperty(n,"_sdfAddedItems",{value:i,configurable:!0,enumerable:!1,writable:!0}),n.appendedItems.push(...t)}else e==="append"?n.appendedItems.push(...t):e==="delete"?n.deletedItems.push(...t):e==="reorder"&&n.orderedItems.push(...t)}function zx(n){n.ws();let e="",t="",r=!1;n.peek()==="@"&&(e=n.asset()),n.peek()==="<"&&(t=n.path(),r=!0);let i={offset:0,scale:1};if(n.peek()==="("){for(n.need("(");!n.eof()&&n.peek()!==")";){let s=n.word();if(n.eat("="))if(s==="offset"||s==="scale"){let o=n.number();s==="offset"?i.offset=o:i.scale=o}else xt(n);n.eat(";"),n.eat(",")}n.need(")")}return!e&&!t&&!r?null:{assetPath:e,primPath:t,layerOffset:i}}function Hh(n,e){if(n.ws(),n.src.startsWith("None",n.pos)&&!/[a-zA-Z0-9_]/.test(n.src[n.pos+4]??""))return n.pos+=4,[];if(n.peek()==="["){n.need("[");let r=[];for(;!n.eof()&&n.peek()!=="]";){let i=e(n);if(i!==null&&r.push(i),!n.eat(","))break}return n.need("]"),r}let t=e(n);return t===null?[]:[t]}function qh(n,e){if(n.ws(),n.src.startsWith("None",n.pos)&&!/[a-zA-Z0-9_]/.test(n.src[n.pos+4]??""))return n.pos+=4,[];n.peek()!=="["&&n.expectedListOperand(e);let t=ao(xt(n));return Array.isArray(t)?t:[]}var Qh=new Set(["prepend","append","add","delete","reorder"]);function Xh(n,e){let t={};for(n.need("(");!n.eof()&&n.peek()!==")";){if(n.peek()==='"'||n.peek()==="'"){t.comment=n.string(),n.eat(";");continue}let r="",i=n.ident();if(Qh.has(i)&&(r=i,i=n.ident()),!i){n.pos++;continue}if(i==="references"||i==="payload"){n.need("=");let s=Hh(n,zx),o=t[i]??=Ar();vr(o,r,s)}else if(i==="inherits"||i==="specializes"){n.need("=");let s=Hh(n,c=>c.peek()!=="<"?null:c.path()),o=i==="inherits"?"inheritPaths":"specializes",a=t[o]??=Ar();vr(a,r,s)}else if(i==="variantSets"){n.need("=");let s=xt(n),o=typeof s=="string"?[s]:Array.isArray(s)?s.filter(c=>typeof c=="string"):[],a=t.variantSetNames??=Ar();vr(a,r,o)}else if(i==="variants"){n.need("="),n.need("{");let s=t.variantSelection??{};for(;!n.eof()&&n.peek()!=="}";){n.word();let o=n.ident()||(n.peek()==='"'?n.string():"");if(!o){n.pos++;continue}n.need("="),s[o]=[n.string()],n.eat(";")}n.need("}"),t.variantSelection=s}else if(i==="apiSchemas"||i==="clipSets"){n.need("=");let s=xt(n),o=typeof s=="string"?[s]:Array.isArray(s)?s.filter(c=>typeof c=="string"):[],a=t[i]??=Ar();vr(a,r,o)}else if(i==="relocates")n.need("="),t.relocates=Kh(n);else if(n.eat("=")){let s=r?qh(n,e):hd(n,i,"prim");if(r){let o=t[i]??=Ar();vr(o,r,s)}else t[i]=s}n.eat(";")}return n.need(")"),t}function Yh(n,e,t,r){let i=n.word();n.ws();let s="";n.peek()!=='"'&&n.peek()!=="'"&&(s=n.word(),n.ws());let o=n.string(),a=t==="/"?`/${o}`:`${t}${t.endsWith("}")?"":"/"}${o}`,c={};n.peek()==="("&&(c=Xh(n,a));let l=[],u=[],d=new Set,p=[],f={};for(n.need("{");!n.eof()&&n.peek()!=="}";)Zh(n,e,a,l,u,f,p,d),n.eat(";");n.need("}"),u.sort((y,g)=>{let m=P=>{let b=e[`${a}.${P}`]?.fields;return!d.has(P)&&b&&("connectionPaths"in b||"timeSamples"in b)?1:0};return m(y)-m(g)});let h={specifier:i,...c};s&&(h.typeName=s),l.length>0&&(h.primChildren=l),u.length>0&&(h.properties=u),p.length>0&&(h.variantSetChildren=p),f.primOrder&&(h.primOrder=f.primOrder),f.propertyOrder&&(h.propertyOrder=f.propertyOrder),ii(e,a,h),r.push(o)}function Zh(n,e,t,r,i,s={},o=[],a=new Set){n.ws();let c=n.peek();if(!c||c==="}")return;if(c==='"'||c==="'"){n.string();return}if(c===";"){n.pos++;return}let l=!1,u="",d=n.peekWord();if(d==="reorder"){n.word();let v=n.word();if(v!=="nameChildren"&&v!=="properties")throw new Error(`reorder must target nameChildren or properties at ${n.pos}, got '${v}'`);n.need("=");let T=xt(n),w=typeof T=="string"?[T]:Array.isArray(T)?T.filter(D=>typeof D=="string"):[];v==="nameChildren"?s.primOrder=w:s.propertyOrder=w;return}let p="";if((d==="delete"||d==="append"||d==="prepend"||d==="add")&&(p=n.word(),d=n.peekWord()),d==="custom"&&(n.word(),l=!0,d=n.peekWord()),d==="uniform"?(n.word(),u="uniform",d=n.peekWord()):d==="varying"&&(n.word(),u="varying",d=n.peekWord()),d==="def"||d==="over"||d==="class"){Yh(n,e,t,r);return}if(d==="variantSet"){n.word();let v=n.string();n.eat("="),Hx(n,e,t,v),o.includes(v)||o.push(v);return}if(d==="rel"){n.word();let v=n.ident();if(!v)return;n.ws(),n.peek()==="."&&(n.pos++,n.word());let T,w=p!=="";if(n.peek()==="="){n.pos++,w=!0;let E=xt(n);typeof E=="string"?T=[E]:Array.isArray(E)?T=E.filter(q=>typeof q=="string"):T=[]}let D=`${t}.${v}`,G={};n.peek()==="("&&(G=jh(n,"relationship",D));let _={},k=e[D];if(k)for(let[E,q]of Object.entries(k.fields))_[E]=q.value;if(Object.assign(_,{...G,typeName:"rel",...l?{custom:!0}:{}}),w){let E=(T??[]).filter(Boolean).map(q=>Wh(t,q));if(p===""&&E.length>0)_.targetPaths=E;else{let q=Ar();vr(q,p,E),T?.length===0&&p===""&&(q.isExplicit=!1);let ae=_.targetPaths;if(ae&&typeof ae=="object"&&!Array.isArray(ae)&&"isExplicit"in ae&&!q.isExplicit){let se=ae;_.targetPaths={isExplicit:se.isExplicit,explicitItems:[...se.explicitItems],prependedItems:[...se.prependedItems,...q.prependedItems],appendedItems:[...se.appendedItems,...q.appendedItems],deletedItems:[...se.deletedItems,...q.deletedItems]}}else _.targetPaths=q}}ii(e,D,_),a.add(v),i.includes(v)||i.push(v);return}if(!d)throw new Error(`Expected prim or property declaration at ${n.pos}, got: '${n.src.slice(n.pos,n.pos+30)}'`);let f=n.word();if(!f)throw new Error(`Expected type name at ${n.pos}, got: '${n.src.slice(n.pos,n.pos+30)}'`);n.ws();let h=!1;n.peek()==="["&&n.at(1)==="]"&&(n.pos+=2,h=!0),n.ws();let y=n.ident();if(!y)throw new Error(`Expected property name after type '${f}' at ${n.pos}`);n.ws();let g="";n.peek()==="."&&(n.pos++,g=n.word());let m;if(n.peek()==="=")if(n.pos++,n.ws(),g==="spline"){let v=n.pos;try{m=Bx(n,h?`${f}[]`:f)}catch{n.pos=v,n.skipBlock(),m=null}}else g!=="timeSamples"&&g!=="connect"&&n.peek()==="{"&&g?(n.skipBlock(),m=null):g==="timeSamples"?m=$x(n):m=xt(n);let P=`${t}.${y}`,b={};n.peek()==="("&&(b=jh(n,"attribute",P));let S=h?`${f}[]`:f,x={...b,typeName:S};if(l&&(x.custom=!0),u&&(x.variability=u),g==="timeSamples"&&m!==void 0)if(m&&typeof m=="object"){let v={};for(let[T,w]of Object.entries(m))v[T]=w===null?new Q:co(w,S);x.timeSamples=v}else x.timeSamples=m;else if(g==="spline")m instanceof we&&(x.spline=m);else if(g==="connect"){let v=(Array.isArray(m)?m:[m]).filter(T=>typeof T=="string").map(T=>Wh(t,T));if(p){let T=Ar();vr(T,p,v),x.connectionPaths=T}else x.connectionPaths=Array.isArray(m)?v:v[0]??null}else g===""&&m!==void 0&&(x.default=m===null?new Q:m==="AnimationBlock"?new ke:co(m,S));if(e[P]){let v=e[P],T={};for(let w of Object.keys(v.fields))T[w]=v.fields[w].value;Object.assign(T,x),ii(e,P,T)}else ii(e,P,x);i.includes(y)||i.push(y),g===""&&a.add(y)}function jh(n,e,t){let r={};for(n.need("(");!n.eof()&&n.peek()!==")";){if(n.peek()==='"'||n.peek()==="'"){r.comment=n.string(),n.eat(";");continue}let i="",s=n.ident();if(Qh.has(s)&&(i=s,s=n.ident()),!s){n.pos++;continue}if(n.eat("=")){let o=i?qh(n,t):hd(n,s,e);if(i){let a=Ar();vr(a,i,o),r[s]=a}else r[s]=o}n.eat(";")}return n.need(")"),r}function Wh(n,e){if(e.startsWith("/"))return e;let t=n.split("/").filter(Boolean);for(let r of e.split("/"))!r||r==="."||(r===".."?t.pop():t.push(r));return`/${t.join("/")}`}function Hx(n,e,t,r){n.need("{");let i=[];for(;!n.eof()&&n.peek()!=="}";){if(n.peek()!=='"'&&n.peek()!=="'"){n.pos++;continue}let s=n.string();i.push(s);let o=`${t}{${r}=${s}}`,a={};n.peek()==="("&&(a=Xh(n,o));let c=[],l=[],u=new Set,d=[],p={};for(n.need("{");!n.eof()&&n.peek()!=="}";)Zh(n,e,o,c,l,p,d,u),n.eat(";");n.need("}");let f={...a};c.length>0&&(f.primChildren=c),l.length>0&&(f.properties=l),d.length>0&&(f.variantSetChildren=d),p.primOrder&&(f.primOrder=p.primOrder),p.propertyOrder&&(f.propertyOrder=p.propertyOrder),ii(e,o,f)}n.need("}"),ii(e,`${t}{${r}=}`,{variantChildren:i})}function jx(n){n.need("(");let e={};for(;!n.eof()&&n.peek()!==")"&&(n.ws(),n.peek()!==")");){if(n.peek()==='"'||n.peek()==="'"){e.comment=n.string(),n.eat(";");continue}let t=n.pos,r=n.peekWord();(r==="delete"||r==="append"||r==="prepend")&&n.word();let i=n.ident();if(!i){n.pos=t+1;continue}if(i==="subLayers"&&n.eat("=")){let s=[],o=[];for(n.need("[");!n.eof()&&n.peek()!=="]";){if(n.peek()!=="@"){n.pos++;continue}s.push(n.asset());let a={offset:0,scale:1};if(n.peek()==="("){for(n.need("(");!n.eof()&&n.peek()!==")";){let c=n.word();if(n.eat("=")){let l=n.number();c==="offset"?a.offset=l:c==="scale"&&(a.scale=l)}n.eat(";"),n.eat(",")}n.need(")")}o.push(a),n.eat(",")}n.need("]"),e.subLayers=s,o.some(a=>a.offset!==0||a.scale!==1)&&(e.subLayerOffsets=o)}else if(i==="relocates"&&n.eat("="))e.layerRelocates=Kh(n);else if(n.eat("="))try{let s=i==="doc"?"documentation":i;e[s]=hd(n,s,"layer")}catch{}n.eat(";")}return n.need(")"),e}function md(n,e=""){let t=new fd(n,e),r={};for(;!t.eof()&&(t.at()===" "||t.at()==="	"||t.at()==="\r"||t.at()===`
`);)t.pos++;if(!t.src.startsWith("#usda",t.pos)&&!t.src.startsWith("#sdf 1.4.32",t.pos))throw new Error("Not a USDA file: missing #usda header");for(;!t.eof()&&t.at()!==`
`&&t.at()!=="\r";)t.pos++;let i={};t.peek()==="("&&Object.assign(i,jx(t));let s=[],o;for(;!t.eof()&&(t.ws(),!t.eof());){let c=t.peek();if(c==='"'||c==="'"){t.string(),t.eat(";");continue}if(c===";"){t.pos++;continue}let l=t.peekWord();if(l==="def"||l==="over"||l==="class")Yh(t,r,"/",s);else if(l==="reorder"){t.word();let u=t.word();if(u!=="rootPrims")throw new Error(`top-level reorder must target rootPrims at ${t.pos}, got '${u}'`);t.need("=");let d=xt(t);o=typeof d=="string"?[d]:Array.isArray(d)?d.filter(p=>typeof p=="string"):[]}else if(l==="variantSet")t.word(),t.string(),t.eat("="),t.skipBlock();else{if(l)throw new Error(`Unexpected top-level statement '${l}' at ${t.pos}`);t.pos++}t.eat(";")}let a={...i};return s.length>0&&(a.primChildren=s),o&&(a.primOrder=o),ii(r,"/",a),r}var Kx=Object.freeze({treeView:"Tree view",inclusive:"inclusive",exclusive:"exclusive",samples:"samples"});async function si(n,e,t){return n?In(n,e,t):Le.IsEnabled()?In(xr(),e,t):await t(void 0)}function Ye(n,e,t){return n?qn(n,e,t):Le.IsEnabled()?qn(xr(),e,t):t(void 0)}var ot=class{static typeName="SdfFileFormat";capabilities={reading:!0,writing:!1,editing:!1};getExternalAssetDependencies(e){return[]}static findByExtension(e,t){return Ye(t,"usd-ts:SdfFileFormat.findByExtension",()=>iT(e))}},oi=class extends ot{static typeName="SdfUsdaFileFormat";formatId="usda";extensions=["usda"];capabilities={reading:!0,writing:!0,editing:!0};read(e,t,r,i){Ye(i,"usd-ts:SdfUsdaFileFormat.read",s=>{t._setDataFromFileFormat(cm(e,s,t.filePath))})}},ai=class extends ot{static typeName="SdfUsdcFileFormat";formatId="usdc";extensions=["usdc"];capabilities={reading:!0,writing:!0,editing:!0};read(e,t,r,i){Ye(i,"usd-ts:SdfUsdcFileFormat.read",s=>{t._setDataFromFileFormat(im(e,s))})}_readFromAsset(e,t,r){Ye(r,"usd-ts:SdfUsdcFileFormat.readFromAsset",i=>{t._setDataFromFileFormat(im(e,i))})}writeToBytes(e){return $h(e)}},oc=class extends ot{static typeName="SdfUsdFileFormat";formatId="usd";extensions=["usd"];capabilities={reading:!0,writing:!0,editing:!0};usdc=new ai;read(e,t,r,i){Ye(i,"usd-ts:SdfUsdFileFormat.read",s=>{oT(e)?this.usdc._readFromAsset(e,t,s):t._setDataFromFileFormat(cm(e,s,t.filePath))})}},ac=class extends ot{static typeName="SdfUsdzFileFormat";formatId="usdz";extensions=["usdz"];capabilities={reading:!0,writing:!1,editing:!1}},sm=new Map,om=n=>n.replace(/^\./,"").toLowerCase();function am(n){for(let e of n.extensions)sm.set(om(e),n)}for(let n of[new oi,new ai,new oc,new ac])am(n);function rT(n){let e=n.split(":SDF_FORMAT_ARGS:",1)[0];for(let r=st(e);r;r=st(e))e=r.innerPath;let t=e.lastIndexOf(".");return t<0?"":om(e.slice(t+1))}function iT(n){return sm.get(rT(n))}function sT(n){return ot.findByExtension(n)}var yd=sT;function oT(n){return n[0]===80&&n[1]===88&&n[2]===82&&n[3]===45}function im(n,e){return Ye(e,"usd-ts:parseCrate",()=>rc(ud(n)))}function cm(n,e,t=""){let r=new TextDecoder().decode(n),i=/^\s*(#(?:usda|sdf)\s+[^\s]+)/.exec(r)?.[1];if(!i)throw new Error("Not a USDA file: missing #usda header");if(!i.startsWith("#usda 1.0")&&!i.startsWith("#sdf 1.4.32"))throw new Error(`Unable to parse layer version from '${i?.split(/\s+/,2)[1]??""}'.`);if(i.startsWith("#usda ")){let s=i.slice(6),o=/^(\d+)\.(\d+)(?:\.(\d+))?$/.exec(s);if(!o||o.slice(1).some(a=>a!==void 0&&Number(a)>255))throw new Error(`Unable to parse layer version from '${s}'.`)}if(/\b(?:add|append|prepend|delete|reorder)\s+[^=\r\n]*\.connect\s*=\s*None\b/.test(r))throw new Error("Setting connection paths to None is only allowed for explicit connection paths");return Ye(e,"usd-ts:parseUsda",()=>rc(md(r,t)))}var lm=new Map;Oi(()=>lm.clear());function um(n,e){lm.set(n,e)}var bd=":SDF_FORMAT_ARGS:";function Mt(n){let e=n.indexOf(bd);if(e<0)return{assetPath:n,args:new Map};let t=new Map;for(let r of n.slice(e+bd.length).split("&")){if(!r)continue;let i=r.indexOf("="),s=decodeURIComponent(i<0?r:r.slice(0,i)),o=decodeURIComponent(i<0?"":r.slice(i+1));t.set(s,o)}return{assetPath:n.slice(0,e),args:t}}function ci(n,e){if(e.size===0)return n;let t=[...e].sort(([r],[i])=>r.localeCompare(i)).map(([r,i])=>`${encodeURIComponent(r)}=${encodeURIComponent(i)}`).join("&");return`${n}${bd}${t}`}var Pd=class{byIdentifier=new Map;byResolvedPath=new Map;inFlight=new Map;finalizer=new FinalizationRegistry(e=>this.erase(e));clear(){this.byIdentifier.clear(),this.byResolvedPath.clear(),this.inFlight.clear()}findIn(e,t,r,i){return Ye(r,i,()=>{let s=e.get(t);if(s)for(let o of s){let a=o.layer.deref();if(a)return a;this.erase(o)}})}find(e,t,r,i){return Ye(i,"usd-ts:LayerRegistry.find",s=>(r?this.findIn(this.byIdentifier,e,s,"usd-ts:LayerRegistry.findByIdentifier"):void 0)??this.findIn(this.byResolvedPath,t,s,"usd-ts:LayerRegistry.findByResolvedPath"))}async findOrOpen(e,t,r,i,s){return si(s,"usd-ts:LayerRegistry.findOrOpen",async o=>{let a=this.find(e,t,r,o);if(a)return a;let c=t||e,l=this.inFlight.get(c);if(l)return l;let u=i(o).then(d=>{let p=this.find(e,t,r,o);return p||(this.insert(d,e,t,o),d)}).finally(()=>{this.inFlight.get(c)===u&&this.inFlight.delete(c)});return this.inFlight.set(c,u),u})}insert(e,t,r,i){Ye(i,"usd-ts:LayerRegistry.insert",()=>{let s={layer:new WeakRef(e),identifier:t,resolvedIdentifier:r};this.add(this.byIdentifier,t,s),this.add(this.byResolvedPath,r,s),this.finalizer.register(e,s,s)})}add(e,t,r){let i=e.get(t);i||e.set(t,i=new Set),i.add(r)}erase(e){this.remove(this.byIdentifier,e.identifier,e),this.remove(this.byResolvedPath,e.resolvedIdentifier,e),this.finalizer.unregister(e)}remove(e,t,r){let i=e.get(t);i&&(i.delete(r),i.size===0&&e.delete(t))}},cc=new Pd;Nu(()=>cc.clear());var Zi=class{constructor(e,t){this._layer=e;this._path=t}getLayer(){return this._layer}getPath(){return V.fromString(this._path)}getSpecType(){return this._layer.getSpecType(this._path)}isDormant(){return!this._layer.hasSpec(this._path)}listInfoKeys(){return this._layer.getFieldNames(this._path)}hasInfo(e){return this._layer.getFieldNames(this._path).includes(e)}getInfo(e){return this._layer.getField(this._path,e)}setInfo(e,t){this._layer.setField(this._path,e,t)}clearInfo(e){this._layer.eraseField(this._path,e)}equals(e){return this._layer===e._layer&&this._path===e._path}};var lo=class n{_includeAll=!1;_included=[];_excluded=[];includeAll(){return this._includeAll=!0,this._included=[],this}include(e){return this._included=[...new Set([...this._included,...e])].sort(),this}exclude(e){return this._excluded=[...new Set([...this._excluded,...e])].sort(),this}includedAll(){return this._includeAll}getIncluded(){return[...this._included]}getExcluded(){return[...this._excluded]}isIncluded(e){if(!this._includeAll&&this._included.length===0||e.startsWith("anon:"))return!1;let t=Mt(e).assetPath;return(this._includeAll||this._included.some(i=>t.includes(i)))&&!this._excluded.some(i=>t.includes(i))}clone(){let e=new n;return this._includeAll?e.includeAll():e.include(this._included),e.exclude(this._excluded)}},aT=new Set(["primChildren","properties","variantSetChildren","variantChildren"]),cT=new Set(["specifier"]),dm=new Set(["custom","variability","typeName"]);async function fm(n,e){let t=st(e);if(!t)return n.extract(e);let r=await n.extract(t.packagePath);if(!dn.isZip(r))throw new Error(`Layer.findOrOpen: '${t.packagePath}' is not a package`);return fm(dn.fromBytes(r),t.innerPath)}async function pm(n,e,t,r){return si(r,"usd-ts:sdfResolvePath",i=>(i&&fe(i,"assetPath",e),n.resolve(e,t)))}function Sd(n,e){if(typeof e!="string")return n;let t=e.replace(/\[\]$/,"");return t==="float"||t==="quatf"||/^(?:float[234]|(?:color|point|normal|vector|texCoord)[234]f)$/.test(t)?typeof n=="number"?Math.fround(n):Array.isArray(n)?n.map(i=>Sd(i,e)):n:n}var lT;var Oe=class n{constructor(e,t,r,i=t.isDetached(),s=e){this.filePath=e;this._resolverContext=r;this._isDetached=i;this.resolvedPath=s;this._data=t,this._stateDelegate._setLayer(this)}static DetachedLayerRules=lo;static _detachedLayerRules=new lo;static{lT=(e,t,r)=>new n(e,t,r)}static _anonymousSequence=0;_data;_specHandles=new Map;_stateDelegate=new Ki;get identifier(){return this.filePath}get realPath(){return this.resolvedPath}_setDataFromFileFormat(e){this._data=e}setStateDelegate(e){this._stateDelegate._setLayer(null),this._stateDelegate=e,e._setLayer(this)}getStateDelegate(){return this._stateDelegate}isDirty(){return this._stateDelegate.isDirty()}markCurrentStateAsClean(){this._stateDelegate.markCurrentStateAsClean()}static fromBytes(e,t){return n._fromBytes(e,t,void 0)}static _fromBytes(e,t,r,i){return Ye(r,"usd-ts:Layer.fromBytes",s=>n._read(e,t,s,i))}static _read(e,t,r,i,s,o=t){return Ye(r,"usd-ts:Layer.read",a=>{let c=s??ot.findByExtension(t,a)??new oi,l=new kn;l.createSpec("/","pseudoRoot"),l.set("/","specifier","def");let u=e.length>=8&&new TextDecoder().decode(e.subarray(0,8))==="PXR-USDC",d=new n(t,l,i,!u||n._detachedLayerRules.isIncluded(t),o);return c.read?.(e,d,Mt(t).args,a),d.markCurrentStateAsClean(),d})}static async findOrOpen(e,t,r){return t??=Vt(),r??=t.getCurrentContext(),t=nd(t,r),si(rd(r),"usd-ts:Layer.findOrOpen",i=>n._findOrOpen(e,t,r,i))}static find(e){return cc.find(e,"",!0)}static async _findOrOpen(e,t,r,i){i&&fe(i,"identifier",e);let s=await si(i,"usd-ts:Layer.computeInfoToFindOrOpenLayer",async o=>{let{assetPath:a,args:c}=Mt(e),l=st(a),u=l?.packagePath??a,d=t.createIdentifier(u),p=l?_n(d,l.innerPath):d,f=ci(p,c),h=await pm(t,u,r,o);if(!h.valid)throw new Error(`Could not resolve layer: ${e}`);let y=l?_n(h.toString(),l.innerPath):h.toString(),g=ci(y,c),m=ot.findByExtension(y,o);if(!m)throw new Error(`Could not determine file format for resolved layer: ${y}`);return{assetToResolve:u,fileFormat:m,identifier:f,packagePath:l,registryIdentifier:f,registryResolvedIdentifier:g,resolvedPath:h,trustIdentifier:!t.isContextDependentPath(u)}});return cc.findOrOpen(s.registryIdentifier,s.registryResolvedIdentifier,s.trustIdentifier,async o=>si(o,"usd-ts:Layer.openLayer",async a=>{let{assetToResolve:c,fileFormat:l,identifier:u,packagePath:d,resolvedPath:p}=s,f=await t.openAsset(p,r);if(!f)throw new Error(`Could not open layer: ${p}`);let h=await f.getBuffer();if(d){if(!dn.isZip(h))throw new Error(`Layer.findOrOpen: '${c}' is not a package`);h=await fm(dn.fromBytes(h),d.innerPath)}if(dn.isZip(h)){let y=dn.fromBytes(h);um(u,y);let g=y.defaultLayerName();if(!g)throw new Error(`Layer.findOrOpen: '${e}' contains no usd layer`);let m=await y.extract(g);return n._read(m,_n(u,g),a,r,void 0,_n(Mt(s.registryResolvedIdentifier).assetPath,g))}return n._read(h,u,a,r,l,s.registryResolvedIdentifier)}),i)}static open(e,t,r){return n.findOrOpen(e,t,r)}static createInMemory(e,t){let r=typeof t=="string"?new TextEncoder().encode(t):t;if(typeof t=="string"){let i=ot.findByExtension(e),s=i&&!["usd","usda","usdc"].includes(i.formatId)?i:new oi;return n._read(r,e,void 0,void 0,s)}return n.fromBytes(r,e)}static createAnonymous(e=""){let t=e.replace(/^anon:(?:\/\/)?/,"");return n._createEmpty(`anon:${++n._anonymousSequence}:${t}`)}static _createEmpty(e){let t=new kn;return t.createSpec("/","pseudoRoot"),t.set("/","specifier","def"),new n(e,t)}getDisplayName(){let e=/^anon:\d+:(.*)$/.exec(this.filePath);if(e)return e[1];let{assetPath:t}=Mt(this.filePath),r=t.lastIndexOf("/");return r<0?t:t.slice(r+1)}resolveAsset(e){let t=this._resolverContext?rd(this._resolverContext):void 0;return Ye(t,"usd-ts:Layer.resolveAsset",r=>(r&&fe(r,"assetPath",e),Nt(this.filePath,e)))}getField(e,t){return this._data.get(e,t)}_getFieldValueTypeName(e,t){return this._data.getValueTypeName(e,t)}getPreviousTimeSampleForPath(e,t){return this._data.getPreviousTimeSampleForPath(e,t)}getFieldNames(e){return this._data.list(e)}getSpecPaths(){let e=[];return this._data.visitSpecs({visitSpec:(t,r)=>(e.push(r),!0),done:()=>{}}),e}hasSpec(e){return this._data.hasSpec(e)}getSpecType(e){return this._data.getSpecType(e)}getObjectAtPath(e){let t=typeof e=="string"?e:e.pathString;if(!this._data.hasSpec(t))return;let r=this._specHandles.get(t);return r||(r=new Zi(this,t),this._specHandles.set(t,r)),r}streamsData(){return this._data.streamsData()}isDetached(){return this._isDetached}static setDetachedLayerRules(e){n._detachedLayerRules=e.clone()}static getDetachedLayerRules(){return n._detachedLayerRules.clone()}static isIncludedByDetachedLayerRules(e){return n._detachedLayerRules.isIncluded(e)}listAllTimeSamples(){return this._data.listAllTimeSamples()}listTimeSamplesForPath(e){return this._data.listTimeSamplesForPath(e)}getBracketingTimeSamplesForPath(e,t){return this._data.getBracketingTimeSamplesForPath(e,t)}queryTimeSample(e,t){return this._data.queryTimeSample(e,t)}transferContent(e){if(e===this)return;let t=new kn;t.copyFrom(e._data),this._replaceData(t)}definePrimSpec(e,t,r="def"){let i=e.split("/").filter(Boolean);for(let s=0;s<i.length;s++){let o=s===0?"/":"/"+i.slice(0,s).join("/"),a=i[s],c="/"+i.slice(0,s+1).join("/");this._addPrimChild(o,a),s<i.length-1&&(this._data.has(c,"specifier")||this._setField(c,"specifier","def"))}t&&this._setField(e,"typeName",t),this._setField(e,"specifier",r)}setAttrDefault(e,t,r){this._setField(`${e}.${t}`,"default",r),this._addProperty(e,t)}setAttrTimeSample(e,t,r,i){let s=`${e}.${t}`;i=Sd(i,this.getField(s,"typeName"));let o=this._notifyCreateSpec(s,"attribute");this._stateDelegate.setTimeSample(s,r,i);let a=this.getField(s,"timeSamples");this._data.setTimeSample(s,r,i);let c=this.getField(s,"timeSamples");this._notifyDidChange({kind:"timeSample",path:s,fieldName:"timeSamples",oldValue:a,newValue:c}),o&&this._notifyDidChange({kind:"specAdded",path:s,specType:o,inert:!0}),this._addProperty(e,t)}setAttrCustom(e,t,r){this._setField(`${e}.${t}`,"custom",r),this._addProperty(e,t)}declareProperty(e,t,r){this._setField(`${e}.${t}`,"typeName",r),this._addProperty(e,t)}setRelTargets(e,t,r){let i=`${e}.${t}`;this._setField(i,"typeName","rel"),this._setField(i,"targetPaths",r),this._addProperty(e,t)}setAttrConnections(e,t,r){this._setField(`${e}.${t}`,"connectionPaths",r),this._addProperty(e,t)}setField(e,t,r){this._setField(e,t,r)}eraseField(e,t){if(!this._data.has(e,t))return;this._stateDelegate.setField(e,t,void 0);let r=this._data.get(e,t);this._data.erase(e,t),this._notifyDidChange({kind:"field",path:e,fieldName:t,oldValue:r,newValue:void 0})}_deleteSpec(e){if(!this._data.hasSpec(e))return;this._stateDelegate.deleteSpec(e);let t=e.lastIndexOf("."),r=e.lastIndexOf("/");if(e.indexOf("{")===-1){let[l,u,d]=t>r?[e.slice(0,t),"properties",e.slice(t+1)]:[e.slice(0,r)||"/","primChildren",e.slice(r+1)],p=this._data.get(l,u);Array.isArray(p)&&this._data.set(l,u,p.filter(f=>f!==d))}let i=e==="/"?"/":`${e}/`,s=`${e}.`,o=`${e}{`,c=[e,...this.getSpecPaths().filter(l=>l.startsWith(i)||l.startsWith(s)||l.startsWith(o))].map(l=>({path:l,specType:this._specTypeForPath(l),inert:this._isInertSpec(l)}));for(let{path:l}of c)this._data.eraseSpec(l);c.sort((l,u)=>u.path.length-l.path.length||l.path.localeCompare(u.path));for(let{path:l,specType:u,inert:d}of c)this._notifyDidChange({kind:"specRemoved",path:l,specType:u,inert:d})}_didChangeListeners=new Set;_registerDidChangeListener(e){return this._didChangeListeners.add(e),()=>this._didChangeListeners.delete(e)}_notifyDidChange(e){for(let t of this._didChangeListeners)t(e)}_notifyCreateSpec(e,t){if(this._data.hasSpec(e))return;let r=t??this._specTypeForPath(e);return this._stateDelegate.createSpec(e,r),this._data.createSpec(e,r),r}_specTypeForPath(e){let t=e.lastIndexOf("/");return e==="/"?"pseudoRoot":/\{[^}=]+=\}$/.test(e)?"variantSet":/\{[^}=]+=[^}]+\}$/.test(e)?"variant":e.indexOf(".",t)>=0?"attribute":"prim"}_isInertSpec(e){if(!this._data.hasSpec(e))return!0;let t=this._data.list(e);if(t.length===0)return!0;if(this._data.get(e,"custom")===!0)return!1;let r=this._data.getSpecType(e),i=r==="attribute"||r==="relationship";if(!i){let o=this._data.get(e,"specifier");if(o==="def"||o==="class")return!1;let a=this._data.get(e,"typeName");if(a!=null&&a!=="")return!1}let s=i?dm:cT;for(let o of t)if(!(!i&&aT.has(o))&&!s.has(o))return!1;return!0}_replaceData(e){let t=c=>{let l=[];return c.visitSpecs({visitSpec:(u,d)=>(l.push(d),!0),done:()=>{}}),l},r=new Set(t(this._data)),i=new Set(t(e)),s=[],o=[],a=[];for(let c of r){let l=this._data.getSpecType(c);(!i.has(c)||e.getSpecType(c)!==l)&&(s.push({path:c,specType:l,inert:this._isInertSpec(c)}),this._stateDelegate.deleteSpec(c))}for(let c of i){let l=e.getSpecType(c),u=r.has(c)&&this._data.getSpecType(c)!==l;(!r.has(c)||u)&&(o.push({path:c,specType:l}),this._stateDelegate.createSpec(c,l));let d=u||!r.has(c)?[]:this._data.list(c),p=new Set([...d,...e.list(c)]);for(let f of p){let h=d.includes(f)?this._data.get(c,f):void 0,y=e.get(c,f);Wi(h,y)||(a.push({path:c,fieldName:f,oldValue:h,newValue:y}),this._stateDelegate.setField(c,f,y))}}for(let c of r)if(!i.has(c))for(let l of this._data.list(c)){let u=this._data.get(c,l);a.push({path:c,fieldName:l,oldValue:u,newValue:void 0}),this._stateDelegate.setField(c,l,void 0)}this._data=e;for(let c of s)this._notifyDidChange({kind:"specRemoved",...c});for(let c of o)this._notifyDidChange({kind:"specAdded",...c,inert:this._isInertSpec(c.path)});for(let c of a)this._notifyDidChange({kind:"field",...c})}_writeField(e,t,r,i="field"){let s=this._data.get(e,t);this._data.set(e,t,r),this._notifyDidChange({kind:i,path:e,fieldName:t,oldValue:s,newValue:r})}_setField(e,t,r,i){t==="default"&&(r=Sd(r,this._data.get(e,"typeName")));let s=i??(t==="targetPaths"||t==="typeName"&&r==="rel"?"relationship":void 0),o=this._notifyCreateSpec(e,s);if(this._stateDelegate.setField(e,t,r),this._writeField(e,t,r),o){let a=o==="attribute"||o==="relationship"?dm.has(t):this._isInertSpec(e);this._notifyDidChange({kind:"specAdded",path:e,specType:o,inert:a})}}_addPrimChild(e,t){let r=this._notifyCreateSpec(e),i=this._data.get(e,"primChildren")??[];if(!i.includes(t)){this._stateDelegate.pushChild(e,"primChildren",t);let s=[...i,t];this._data.set(e,"primChildren",s),this._notifyDidChange({kind:"field",path:e,fieldName:"primChildren",oldValue:i,newValue:s})}r&&this._notifyDidChange({kind:"specAdded",path:e,specType:r,inert:this._isInertSpec(e)})}_addProperty(e,t){let r=this._notifyCreateSpec(e),i=this._data.get(e,"properties")??[];if(!i.includes(t)){this._stateDelegate.pushChild(e,"properties",t);let s=[...i,t];this._data.set(e,"properties",s),this._notifyDidChange({kind:"field",path:e,fieldName:"properties",oldValue:i,newValue:s})}r&&this._notifyDidChange({kind:"specAdded",path:e,specType:r,inert:this._isInertSpec(e)})}toUsda(){return Ya(this)}toUsdc(){return new ai().writeToBytes(this)}async export(e,t){let r=Mt(e).assetPath.split(".").pop()?.toLowerCase(),i=t,s=typeof i?.get=="function"?i.get("format"):t?.format,o=r==="usda"||r==="usd"&&s==="usda"?new TextEncoder().encode(this.toUsda()):r==="usd"||r==="usdc"?this.toUsdc():void 0;if(!o)return!1;let a=Vt(),c=a.createIdentifierForNewAsset(e),l=await a.resolveForNewAsset(c),u=await a.openAssetForWrite(l,"replace");if(!u)return!1;try{let d=0;for(;d<o.byteLength;){let p=await u.write(o.subarray(d),d);if(p<=0)return!1;d+=p}return!0}finally{await u.close()}}async save(){if(this.filePath.startsWith("anon:")||st(this.filePath))return!1;let e=await this.export(Mt(this.filePath).assetPath);return e&&this.markCurrentStateAsClean(),e}async reload(){if(this.filePath.startsWith("anon:")||st(this.filePath))return!1;let e=nd(Vt(),this._resolverContext??Vt().getCurrentContext()),t=this._resolverContext??e.getCurrentContext(),r=await pm(e,this.filePath,t,void 0);if(!r.valid)return!1;let i=await e.openAsset(r,t);if(!i)return!1;let s=await i.getBuffer(),o=ot.findByExtension(r.toString());if(!o?.read)return!1;let a=new kn;a.createSpec("/","pseudoRoot"),a.set("/","specifier","def");let c=s.length>=8&&new TextDecoder().decode(s.subarray(0,8))==="PXR-USDC",l=new n(this.filePath,a,t,!c||n._detachedLayerRules.isIncluded(this.filePath),r.toString());return o.read(s,l,Mt(this.filePath).args),this._replaceData(l._data),this._isDetached=l._isDetached,this.markCurrentStateAsClean(),!0}getFileFormat(){return ot.findByExtension(this.filePath)}getExternalAssetDependencies(){return ot.findByExtension(this.filePath)?.getExternalAssetDependencies(this)??[]}};function Ji(n,e,t){let r=e??Vt(),i=t??(e?qi(e):r.getCurrentContext());return Oe.findOrOpen(n,r,i)}var he={Point:"Point",Normal:"Normal",Vector:"Vector",Color:"Color",Frame:"Frame",Transform:"Transform",PointIndex:"PointIndex",EdgeIndex:"EdgeIndex",FaceIndex:"FaceIndex",Group:"Group",TextureCoordinate:"TextureCoordinate"};function uT(n){return{name:n.name,type:n.type,cppTypeName:n.cppTypeName??n.type,role:n.role??"",dimensions:n.dimensions??[],isArray:!1,isScalar:!0}}function dT(n){let e={name:`${n.name}[]`,type:`${n.type}[]`,cppTypeName:`VtArray<${n.cppTypeName}>`,role:n.role,dimensions:n.dimensions,isArray:!0,isScalar:!1,scalarType:n};return{scalar:{...n,arrayType:e},array:e}}function M(n){let e=uT(n);return n.noArrays?{scalar:e}:dT(e)}var mm=M({name:"bool",type:"bool"}),gm=M({name:"uchar",type:"uchar",cppTypeName:"unsigned char"}),ym=M({name:"int",type:"int"}),bm=M({name:"uint",type:"uint",cppTypeName:"unsigned int"}),Pm=M({name:"int64",type:"int64",cppTypeName:"int64_t"}),Sm=M({name:"uint64",type:"uint64",cppTypeName:"uint64_t"}),xm=M({name:"half",type:"half",cppTypeName:"GfHalf"}),Tm=M({name:"float",type:"float"}),Am=M({name:"double",type:"double"}),vm=M({name:"timecode",type:"timecode",cppTypeName:"SdfTimeCode"}),_m=M({name:"string",type:"string",cppTypeName:"std::string"}),Im=M({name:"token",type:"token",cppTypeName:"TfToken"}),wm=M({name:"asset",type:"asset",cppTypeName:"SdfAssetPath"}),pT=M({name:"opaque",type:"opaque",cppTypeName:"SdfOpaqueValue",noArrays:!0}),fT=M({name:"group",type:"opaque",cppTypeName:"SdfOpaqueValue",role:he.Group,noArrays:!0}),km=M({name:"pathExpression",type:"pathExpression",cppTypeName:"SdfPathExpression"}),Cm=M({name:"double2",type:"GfVec2d",dimensions:[2]}),Dm=M({name:"double3",type:"GfVec3d",dimensions:[3]}),Rm=M({name:"double4",type:"GfVec4d",dimensions:[4]}),Em=M({name:"float2",type:"GfVec2f",dimensions:[2]}),Nm=M({name:"float3",type:"GfVec3f",dimensions:[3]}),Vm=M({name:"float4",type:"GfVec4f",dimensions:[4]}),Gm=M({name:"half2",type:"GfVec2h",dimensions:[2]}),Mm=M({name:"half3",type:"GfVec3h",dimensions:[3]}),Lm=M({name:"half4",type:"GfVec4h",dimensions:[4]}),Om=M({name:"int2",type:"GfVec2i",dimensions:[2]}),Fm=M({name:"int3",type:"GfVec3i",dimensions:[3]}),Bm=M({name:"int4",type:"GfVec4i",dimensions:[4]}),Um=M({name:"point3h",type:"GfVec3h",role:he.Point,dimensions:[3]}),$m=M({name:"point3f",type:"GfVec3f",role:he.Point,dimensions:[3]}),zm=M({name:"point3d",type:"GfVec3d",role:he.Point,dimensions:[3]}),Hm=M({name:"vector3h",type:"GfVec3h",role:he.Vector,dimensions:[3]}),jm=M({name:"vector3f",type:"GfVec3f",role:he.Vector,dimensions:[3]}),Wm=M({name:"vector3d",type:"GfVec3d",role:he.Vector,dimensions:[3]}),Km=M({name:"normal3h",type:"GfVec3h",role:he.Normal,dimensions:[3]}),qm=M({name:"normal3f",type:"GfVec3f",role:he.Normal,dimensions:[3]}),Qm=M({name:"normal3d",type:"GfVec3d",role:he.Normal,dimensions:[3]}),Xm=M({name:"color3h",type:"GfVec3h",role:he.Color,dimensions:[3]}),Ym=M({name:"color3f",type:"GfVec3f",role:he.Color,dimensions:[3]}),Zm=M({name:"color3d",type:"GfVec3d",role:he.Color,dimensions:[3]}),Jm=M({name:"color4h",type:"GfVec4h",role:he.Color,dimensions:[4]}),eg=M({name:"color4f",type:"GfVec4f",role:he.Color,dimensions:[4]}),tg=M({name:"color4d",type:"GfVec4d",role:he.Color,dimensions:[4]}),ng=M({name:"quath",type:"GfQuath",dimensions:[4]}),rg=M({name:"quatf",type:"GfQuatf",dimensions:[4]}),ig=M({name:"quatd",type:"GfQuatd",dimensions:[4]}),sg=M({name:"matrix2d",type:"GfMatrix2d",dimensions:[2,2]}),og=M({name:"matrix3d",type:"GfMatrix3d",dimensions:[3,3]}),ag=M({name:"matrix4d",type:"GfMatrix4d",dimensions:[4,4]}),cg=M({name:"frame4d",type:"GfMatrix4d",role:he.Frame,dimensions:[4,4]}),lg=M({name:"texCoord2f",type:"GfVec2f",role:he.TextureCoordinate,dimensions:[2]}),ug=M({name:"texCoord2d",type:"GfVec2d",role:he.TextureCoordinate,dimensions:[2]}),dg=M({name:"texCoord2h",type:"GfVec2h",role:he.TextureCoordinate,dimensions:[2]}),pg=M({name:"texCoord3f",type:"GfVec3f",role:he.TextureCoordinate,dimensions:[3]}),fg=M({name:"texCoord3d",type:"GfVec3d",role:he.TextureCoordinate,dimensions:[3]}),hg=M({name:"texCoord3h",type:"GfVec3h",role:he.TextureCoordinate,dimensions:[3]}),mg={Bool:mm.scalar,UChar:gm.scalar,Int:ym.scalar,UInt:bm.scalar,Int64:Pm.scalar,UInt64:Sm.scalar,Half:xm.scalar,Float:Tm.scalar,Double:Am.scalar,TimeCode:vm.scalar,String:_m.scalar,Token:Im.scalar,Asset:wm.scalar,Int2:Om.scalar,Int3:Fm.scalar,Int4:Bm.scalar,Half2:Gm.scalar,Half3:Mm.scalar,Half4:Lm.scalar,Float2:Em.scalar,Float3:Nm.scalar,Float4:Vm.scalar,Double2:Cm.scalar,Double3:Dm.scalar,Double4:Rm.scalar,Point3h:Um.scalar,Point3f:$m.scalar,Point3d:zm.scalar,Vector3h:Hm.scalar,Vector3f:jm.scalar,Vector3d:Wm.scalar,Normal3h:Km.scalar,Normal3f:qm.scalar,Normal3d:Qm.scalar,Color3h:Xm.scalar,Color3f:Ym.scalar,Color3d:Zm.scalar,Color4h:Jm.scalar,Color4f:eg.scalar,Color4d:tg.scalar,Quath:ng.scalar,Quatf:rg.scalar,Quatd:ig.scalar,Matrix2d:sg.scalar,Matrix3d:og.scalar,Matrix4d:ag.scalar,Frame4d:cg.scalar,TexCoord2h:dg.scalar,TexCoord2f:lg.scalar,TexCoord2d:ug.scalar,TexCoord3h:hg.scalar,TexCoord3f:pg.scalar,TexCoord3d:fg.scalar,Opaque:pT.scalar,Group:fT.scalar,PathExpression:km.scalar,BoolArray:mm.array,UCharArray:gm.array,IntArray:ym.array,UIntArray:bm.array,Int64Array:Pm.array,UInt64Array:Sm.array,HalfArray:xm.array,FloatArray:Tm.array,DoubleArray:Am.array,TimeCodeArray:vm.array,StringArray:_m.array,TokenArray:Im.array,AssetArray:wm.array,Int2Array:Om.array,Int3Array:Fm.array,Int4Array:Bm.array,Half2Array:Gm.array,Half3Array:Mm.array,Half4Array:Lm.array,Float2Array:Em.array,Float3Array:Nm.array,Float4Array:Vm.array,Double2Array:Cm.array,Double3Array:Dm.array,Double4Array:Rm.array,Point3hArray:Um.array,Point3fArray:$m.array,Point3dArray:zm.array,Vector3hArray:Hm.array,Vector3fArray:jm.array,Vector3dArray:Wm.array,Normal3hArray:Km.array,Normal3fArray:qm.array,Normal3dArray:Qm.array,Color3hArray:Xm.array,Color3fArray:Ym.array,Color3dArray:Zm.array,Color4hArray:Jm.array,Color4fArray:eg.array,Color4dArray:tg.array,QuathArray:ng.array,QuatfArray:rg.array,QuatdArray:ig.array,Matrix2dArray:sg.array,Matrix3dArray:og.array,Matrix4dArray:ag.array,Frame4dArray:cg.array,TexCoord2hArray:dg.array,TexCoord2fArray:lg.array,TexCoord2dArray:ug.array,TexCoord3hArray:hg.array,TexCoord3fArray:pg.array,TexCoord3dArray:fg.array,PathExpressionArray:km.array},hT=new Map(Object.values(mg).map(n=>[n.name,n]));function lc(n){return hT.get(n)}function gg(n={}){return n.equals?n.equals:n.key?(e,t)=>Object.is(n.key(e),n.key(t)):Object.is}function uc(n,e,t){return n.some(r=>t(r,e))}function dc(n,e){let t=[];for(let r of n)uc(t,r,e)||t.push(r);return t}function mT(n){return"isExplicit"in n||"explicitItems"in n||"deletedItems"in n||"prependedItems"in n||"appendedItems"in n||"orderedItems"in n}function Fe(n){if(n==null)return null;if(Array.isArray(n))return{isExplicit:!0,explicitItems:[...n],deletedItems:[],prependedItems:[],appendedItems:[],orderedItems:[]};if(typeof n!="object")return{isExplicit:!0,explicitItems:[n],deletedItems:[],prependedItems:[],appendedItems:[],orderedItems:[]};if(!mT(n))return null;let e=n;return{isExplicit:e.isExplicit??e.explicitItems!==void 0,explicitItems:[...e.explicitItems??[]],deletedItems:[...e.deletedItems??[]],prependedItems:[...e.prependedItems??[]],appendedItems:[...e.appendedItems??[]],orderedItems:[...e.orderedItems??[]]}}function pc(n,e,t={}){let r=gg(t),i=dc(e,r);if(i.length===0||n.length===0)return[...n];let s=[...n],o=[];for(let a of i){let c=s.findIndex(u=>r(u,a));if(c<0)continue;let l=c+1;for(;l<s.length&&!i.some(u=>r(u,s[l]));)l++;o.push(...s.splice(c,l-c))}return[...s,...o]}function Tt(n,e,t={}){let r=gg(t),i=Fe(e);if(i.isExplicit)return dc(i.explicitItems,r);let s=n.filter(c=>!uc(i.deletedItems,c,r)),o=dc(i.prependedItems,r),a=dc(i.appendedItems,r);return s=[...o,...s.filter(c=>!uc(o,c,r))],s=[...s.filter(c=>!uc(a,c,r)),...a],pc(s,i.orderedItems,t)}function es(n,e={}){let t=[];for(let r=n.length-1;r>=0;r--)t=Tt(t,n[r],e);return t}function Lt(n){return n.length>2&&n[0]==="`"&&n[n.length-1]==="`"}function hc(n){if(n===null)return!0;let e=typeof n;return e==="string"||e==="boolean"?!0:e==="number"?Number.isInteger(n):Array.isArray(n)?n.every(hc):!1}function yg(n){return n==null?"None":Array.isArray(n)?"list":typeof n}var Id=n=>({value:n,errors:[]}),xd=()=>({value:void 0,errors:[]}),ts=n=>({value:void 0,errors:n}),Td=class{constructor(e){this.variables=e}requested=new Set;stack=[];getVariable(e){if(this.stack.includes(e)){let r=this.stack.map(i=>`'${i}'`).join(", ");return[ts([`Encountered circular variable substitutions: [${r}, '${e}']`]),!0]}if(this.requested.add(e),!Object.prototype.hasOwnProperty.call(this.variables,e))return[xd(),!1];let t=this.variables[e];if(!hc(t))return[ts([`Variable '${e}' has unsupported type ${yg(t)}`]),!0];if(typeof t=="string"&&Lt(t)){let r=Pg(t);if(r.node){this.stack.push(e);try{return[r.node.evaluate(this),!0]}finally{this.stack.pop()}}else return r.errors.length?[ts(r.errors.map(i=>`${i} (in variable '${e}')`)),!0]:[xd(),!0]}return[Id(t),!0]}},Ad=class{constructor(e){this.parts=e}evaluate(e){let t="";for(let r of this.parts){if(!r.isVariable){t+=r.content;continue}let i=r.content,[s,o]=e.getVariable(i);if(!o)t+=`\${${i}}`;else if(s.value!==void 0&&s.value!==null)if(typeof s.value=="string")t+=s.value;else return ts([`String value required for substituting variable '${i}', got ${yg(s.value)}.`]);else if(s.errors.length)return ts(s.errors)}return Id(t)}},vd=class{constructor(e){this.varName=e}evaluate(e){let[t,r]=e.getVariable(this.varName);return r?t:ts([`No value for variable '${this.varName}'`])}},uo=class{constructor(e){this.value=e}evaluate(){return Id(this.value)}},_d=class{evaluate(){return xd()}};function bg(n,e){let t=e,r="";if(t>=n.length||!/[A-Za-z_]/.test(n[t]))return null;for(;t<n.length&&/[A-Za-z0-9_]/.test(n[t]);)r+=n[t++];return n[t]!=="}"?null:{name:r,next:t+1}}function gT(n,e,t){let r=[],i="",s=t,o=()=>{i&&(r.push({isVariable:!1,content:i}),i="")};for(;s<n.length;){let a=n[s];if(a===e)return o(),{node:new Ad(r),errors:[],next:s+1};if(a==="\\"){let c=n[s+1];if(c==="`"||c==="$"||c==="\\"||c===e){i+=c,s+=2;continue}i+=a,s+=1;continue}if(a==="$"&&n[s+1]==="{"){let c=bg(n,s+2);if(!c)return{node:null,errors:[n.indexOf("}",s+2)<0?`Missing ending '}' at character ${n.length}`:"Variables must be a C identifier"],next:s};o(),r.push({isVariable:!0,content:c.name}),s=c.next;continue}i+=a,s+=1}return{node:null,errors:[`Missing ending ${e}`],next:s}}function yT(n){let e=n.trim();if(e.length===0)return{node:null,errors:["Empty expression"]};let t=e[0];if(t==='"'||t==="'"){let r=gT(e,t,1);return r.node?r.next!==e.length?{node:null,errors:["Invalid string contents"]}:{node:r.node,errors:[]}:{node:null,errors:r.errors}}if(t==="$"&&e[1]==="{"){let r=bg(e,2);return!r||r.next!==e.length?{node:null,errors:["Variables must be a C identifier"]}:{node:new vd(r.name),errors:[]}}return e==="None"||e==="none"?{node:new _d,errors:[]}:e==="True"||e==="true"?{node:new uo(!0),errors:[]}:e==="False"||e==="false"?{node:new uo(!1),errors:[]}:/^-?[0-9]+$/.test(e)?{node:new uo(Number(e)),errors:[]}:{node:null,errors:[`Unsupported or malformed expression: \`${n}\``]}}function Pg(n){return Lt(n)?yT(n.slice(1,-1)):{node:null,errors:["Expressions must begin with '`'"]}}var fc=class{constructor(e){this.expr=e;let t=Pg(e);this.node=t.node,this.parseErrors=t.errors}node;parseErrors;static isExpression(e){return Lt(e)}static isValidVariableType(e){return hc(e)}isValid(){return this.node!==null}getString(){return this.expr}getErrors(){return[...this.parseErrors]}evaluate(e){if(!this.node)return{value:void 0,errors:[...this.parseErrors],usedVariables:[]};let t=new Td(e),r=this.node.evaluate(t);return{value:r.errors.length?void 0:r.value,errors:r.errors,usedVariables:[...t.requested]}}};function Rn(n,e){return new fc(n).evaluate(e)}var At={offset:0,scale:1};function Ce(n,e){return e*n.scale+n.offset}function Be(n,e){return{offset:n.offset+n.scale*e.offset,scale:n.scale*e.scale}}function _r(n){return n.scale===0?null:{offset:-n.offset/n.scale,scale:1/n.scale}}function ns(n){return n.offset===0&&n.scale===1}function mc(n,e){return n.offset===e.offset&&n.scale===e.scale}function gc(n,e){return`${n}\0${e}`}var wd=new Set(["form","fields"]);function qt(n){return n.path.lastIndexOf(".")<=n.path.lastIndexOf("/")?"prim":n.layer.getField(n.path,"typeName")==="rel"?"relationship":"attribute"}function En(n,e){let t=qt(n);if(t==="relationship"&&e==="typeName")return;let r=n.layer.getField(n.path,e);if(r!==void 0)return r;if(t!=="prim"){if(e==="custom")return!1;if(e==="variability")return t==="relationship"?"uniform":"varying"}}function bT(n,e){return En(n,e)!==void 0}function po(n){let e=qt(n),t=[];for(let r of n.layer.getFieldNames(n.path))wd.has(r)||O.isDisallowedField(r)||e==="relationship"&&r==="typeName"||t.push(r);return e!=="prim"&&(t.includes("custom")||t.push("custom"),t.includes("variability")||t.push("variability")),t}function Ot(n){return typeof n=="object"&&n!==null&&!Array.isArray(n)&&!("isExplicit"in n)}function mo(n,e){let t={...e};for(let[r,i]of Object.entries(n)){let s=t[r];t[r]=Ot(i)&&Ot(s)?mo(i,s):i}return t}function kd(n,e){let t=n;for(let r of e.split(":")){if(!Ot(t))return;t=t[r]}return t}var Jn=class{_name;_lap;constructor(e="",t=null){this._name=e,this._lap=t}_requireLap(){if(!this._lap)throw new Error(`UsdPrimDefinition.Property('${this._name}'): accessed data on an invalid property definition`);return this._lap}isValid(){return this._lap!==null}getName(){return this._name}isAttribute(){return this._lap!==null&&qt(this._lap)==="attribute"}isRelationship(){return this._lap!==null&&qt(this._lap)==="relationship"}getSpecType(){return qt(this._requireLap())}listMetadataFields(){return po(this._requireLap())}getMetadata(e){let t=this._requireLap();if(!O.isDisallowedField(e))return En(t,e)}getMetadataByDictKey(e,t){let r=this._requireLap();if(!O.isDisallowedField(e))return kd(r.layer.getField(r.path,e),t)}getVariability(){return En(this._requireLap(),"variability")}getDocumentation(){let e=this._requireLap(),t=kd(e.layer.getField(e.path,"customData"),"userDocBrief");if(typeof t=="string")return t;let r=e.layer.getField(e.path,"documentation");return typeof r=="string"?r:""}},fo=class extends Jn{getTypeName(){return lc(this.getTypeNameToken())}getTypeNameToken(){let e=this._requireLap(),t=e.layer.getField(e.path,"typeName");return typeof t=="string"?t:""}getFallbackValue(){let e=this._requireLap();return e.layer.getField(e.path,"default")}},ho=class extends Jn{},Ir=class n{_primLap=null;_propMap=new Map;_appliedAPISchemas=[];_properties=[];_locallyDefinedPropertyNames=[];_composedPropertyLayer=null;getPropertyNames(){return[...this._properties]}getLocallyDefinedPropertyNames(){return[...this._locallyDefinedPropertyNames]}getAppliedAPISchemas(){return[...this._appliedAPISchemas]}getSpecType(e){let t=this.getPropertyDefinition(e);return t.isValid()?t.getSpecType():""}hasProperty(e){return e!==""&&this._propMap.has(e)}getAttributeFallbackValue(e){let t=this._propMap.get(e);if(!(!t||e===""))return t.layer.getField(t.path,"default")}getMetadataField(e,t){if(O.isDisallowedField(e))return;if(t===void 0){let i=this._propMap.get("");return i?En(i,e):void 0}let r=this.getPropertyDefinition(t);return r.isValid()?r.getMetadata(e):void 0}listMetadataFields(e){if(e===void 0){let r=this._propMap.get("");return r?po(r):[]}let t=this.getPropertyDefinition(e);return t.isValid()?t.listMetadataFields():[]}getDocumentation(){return this._primLap?new Jn("",this._primLap).getDocumentation():""}getPropertyDocumentation(e){let t=this.getPropertyDefinition(e);return t.isValid()?t.getDocumentation():""}static Property=Jn;static Attribute=fo;static Relationship=ho;getPropertyDefinition(e){return e===""?new Jn(""):new Jn(e,this._propMap.get(e)??null)}getAttributeDefinition(e){let t=e===""?null:this._propMap.get(e)??null;return new fo(e,t&&qt(t)==="attribute"?t:null)}getRelationshipDefinition(e){let t=e===""?null:this._propMap.get(e)??null;return new ho(e,t&&qt(t)==="relationship"?t:null)}getMetadataByDictKey(e,t,r){if(O.isDisallowedField(e))return;let i=r===void 0?this._propMap.get(""):r!==""?this._propMap.get(r):void 0;if(i)return kd(i.layer.getField(i.path,e),t)}flattenTo(e,t,r){return e instanceof Oe?this._flattenToLayer(e,t??"",r??"over"):this._flattenToPrim(e,t)}_flattenToLayer(e,t,r){if(!t.startsWith("/")||t==="/")return!1;if(new Set(e.getSpecPaths()).has(t)){let o=e.getField(t,"properties")??[];for(let a of o)e._deleteSpec(`${t}.${a}`);for(let a of[...e.getFieldNames(t)])wd.has(a)||O.isDisallowedField(a)||e.eraseField(t,a)}else{let o=t.split("/").filter(Boolean);for(let a=0;a<o.length;a++){let c="/"+o.slice(0,a+1).join("/"),l=a===0?"/":"/"+o.slice(0,a).join("/"),u=a===o.length-1;e.getSpecPaths().includes(c)||e.setField(c,"specifier",u?r:"over");let d=e.getField(l,"primChildren")??[];d.includes(o[a])||e.setField(l,"primChildren",[...d,o[a]])}}for(let o of this._properties){let a=this._propMap.get(o);if(!a)continue;let c=`${t}.${o}`,l=qt(a)==="relationship";for(let u of a.layer.getFieldNames(a.path))wd.has(u)||l&&u==="typeName"||e.setField(c,u,a.layer.getField(a.path,u));e.getField(c,"custom")===void 0&&e.setField(c,"custom",!1),e.getField(c,"variability")===void 0&&e.setField(c,"variability",l?"uniform":"varying")}this._properties.length>0&&e.setField(t,"properties",[...this._properties]);for(let o of this.listMetadataFields()){let a=this.getMetadataField(o);a!==void 0&&e.setField(t,o,a)}e.setField(t,"apiSchemas",{isExplicit:!0,explicitItems:[...this._appliedAPISchemas],deletedItems:[],prependedItems:[],appendedItems:[],orderedItems:[]});let s=this.getDocumentation();return s!==""?e.setField(t,"documentation",s):e.eraseField(t,"documentation"),!0}_flattenToPrim(e,t){let r,i;if(t!==void 0)r=e.path,i=t;else{let a=e.path,c=a.lastIndexOf("/");r=c<=0?"/":a.slice(0,c),i=a.slice(c+1)}let s=r==="/"?`/${i}`:`${r}/${i}`,o=e.getStage();return this._flattenToLayer(o.getEditTarget().getLayer(),s,"over")?o._primHandle(s):null}_copy(){let e=new n;return e._primLap=this._primLap,e._propMap=new Map(this._propMap),e._appliedAPISchemas=[...this._appliedAPISchemas],e._properties=[...this._properties],e._locallyDefinedPropertyNames=[...this._locallyDefinedPropertyNames],e._composedPropertyLayer=this._composedPropertyLayer,e}_replaceWith(e){this._primLap=e._primLap,this._propMap=new Map(e._propMap),this._appliedAPISchemas=[...e._appliedAPISchemas],this._properties=[...e._properties],this._locallyDefinedPropertyNames=[...e._locallyDefinedPropertyNames],this._composedPropertyLayer=e._composedPropertyLayer}_initializeForTypedSchema(e,t,r){this._primLap={layer:e,path:t},this._mapSchematicsPropertyPaths(r)&&this._propMap.set("",this._primLap),this._applyPropertyOrder()}_initializeForAPISchema(e,t,r,i){this._appliedAPISchemas=[e],this._primLap={layer:t,path:r};let[,s]=O.getTypeNameAndInstance(e);this._mapSchematicsPropertyPaths(i)&&s===""&&this._propMap.set("",this._primLap),this._applyPropertyOrder()}_mapSchematicsPropertyPaths(e){let t=this._primLap,r=t.layer.getField(t.path,"properties");if(!r)return t.layer.getSpecPaths().includes(t.path);for(let i of r)e.includes(i)||this._propMap.has(i)||(this._propMap.set(i,{layer:t.layer,path:`${t.path}.${i}`}),this._properties.push(i));return!0}_applyPropertyOrder(){let e=this.getMetadataField("propertyOrder");if(!Array.isArray(e)||e.length===0)return;let t=new Set(this._properties),r=[],i=new Set;for(let s of e)t.has(s)&&!i.has(s)&&(r.push(s),i.add(s));r.length!==0&&(this._properties=[...r,...this._properties.filter(s=>!i.has(s))])}_composePropertiesFromPrimDef(e){for(let[t,r]of e._propMap)this._addOrComposeProperty(t,r);this._sortAndOrderProperties()}_composePropertiesFromPrimDefInstance(e,t){for(let[r,i]of e._propMap){let s=O.makeMultipleApplyNameInstance(r,t);this._addOrComposeProperty(s,i)}this._sortAndOrderProperties()}_sortAndOrderProperties(){this._properties.sort((e,t)=>ht(e,t)?-1:ht(t,e)?1:0),this._applyPropertyOrder()}_addOrComposeProperty(e,t){if(e===""&&!this._propMap.has("")){let s=this._createComposedPrimOrPropertyIfNeeded("",null,t);s&&this._propMap.set("",s);return}let r=this._propMap.get(e);if(r===void 0){this._propMap.set(e,t),e!==""&&this._properties.push(e);return}let i=this._createComposedPrimOrPropertyIfNeeded(e,r,t);i&&this._propMap.set(e,i)}_findOrCreateSpecForComposition(e,t){let r="/ComposedProperties",i=e===""?r:`${r}.${e}`;if(this._composedPropertyLayer){if(e!==""&&this._composedPropertyLayer.getSpecPaths().includes(i))return{layer:this._composedPropertyLayer,path:i}}else this._composedPropertyLayer=Oe.createAnonymous("anon:schema-composed-properties");let s=this._composedPropertyLayer;if(s.getSpecPaths().includes(r)||s.setField(r,"specifier","def"),!t)return{layer:s,path:e===""?r:i};let o=qt(t),a=o==="prim"?r:i;o==="attribute"?s.setField(a,"typeName",t.layer.getField(t.path,"typeName")):o==="relationship"&&s.setField(a,"typeName","rel");for(let c of po(t)){let l=En(t,c);l!==void 0&&s.setField(a,c,l)}return{layer:s,path:a}}_createComposedPrimOrPropertyIfNeeded(e,t,r){if(t&&!n._propertyTypesMatch(t,r))return null;let i=qt(r)==="prim"?["documentation"]:["custom","documentation"],s=null;for(let o of po(r)){let a=En(r,o),c=o==="propertyOrder"||Ot(a);if(!(!c&&t&&bT(t,o))&&!i.includes(o)){if(t&&c){let l=En(t,o);if(l!==void 0)if(Array.isArray(l)&&Array.isArray(a)){let u=[...l],d=new Set(u);for(let p of a)d.has(p)||(d.add(p),u.push(p));a=u}else Ot(l)&&Ot(a)&&(a=mo(l,a))}if(!s&&(s=this._findOrCreateSpecForComposition(e,t),!s))return null;s.layer.setField(s.path,o,a)}}return s}static _propertyTypesMatch(e,t){let r=qt(e),i=qt(t);return r==="prim"||i==="prim"?r===i:r!==i?!1:r==="attribute"?e.layer.getField(e.path,"typeName")===t.layer.getField(t.path,"typeName"):!0}_composeOverAndReplaceExistingProperty(e,t,r){let i=this._propMap.get(e);if(!i)return;let s={layer:t,path:`${r}.${e}`};if(!t.getSpecPaths().includes(s.path)||!n._propertyTypesMatch(s,i))return;for(let a of po(i)){if(s.layer.getField(s.path,a)!==void 0)continue;let c=En(i,a);c!==void 0&&t.setField(s.path,a,c)}let o=En(i,"variability");En(s,"variability")!==o&&t.setField(s.path,"variability",o),this._propMap.set(e,s)}_composeWeakerAPIPrimDefinition(e,t,r){let i=o=>{let a=this._appliedAPISchemas.length,c=[];for(let l of o){let[u,d]=O.getTypeNameAndInstance(l),p=O.findSchemaInfo(u);if(!p)continue;let f=gc(p.family,d),h=r.get(f);if(h===void 0)r.set(f,p.version),this._appliedAPISchemas.push(l),c.push(f);else if(h!==p.version){this._appliedAPISchemas.length=a;for(let y of c)r.delete(y);return!1}}return!0},s=e._appliedAPISchemas;if(t===""){if(!i(s))return!1;this._composePropertiesFromPrimDef(e)}else{let o=s.map(a=>O.makeMultipleApplyNameInstance(a,t));if(!i(o))return!1;this._composePropertiesFromPrimDefInstance(e,t)}return!0}};var yo="__INSTANCE_NAME__";function Sg(n){if(n.length<2)return-1;let e=n.length-1;if(!/[0-9]/.test(n[e]))return-1;for(;--e>=0;){if(n[e]==="_")return e;if(!/[0-9]/.test(n[e]))return-1}return-1}function yc(n,e){return n===""?e:e===""?n:`${n}:${e}`}function Cd(n){let e=0;for(;e<n.length;){let t=n.indexOf(":",e);if(t===-1&&(t=n.length),t-e===yo.length&&n.startsWith(yo,e))return e;e=t+1}return-1}var PT=new Set(["abstractBase","abstractTyped","concreteTyped","nonAppliedAPI","singleApplyAPI","multipleApplyAPI"]);function ST(n){let e=n.schemaKind;return typeof e=="string"&&PT.has(e)?e:"invalid"}function go(n,e){let t=n[e];return Array.isArray(t)?t.filter(r=>typeof r=="string"):[]}var xT=new Set(["inheritPaths","payload","references","specializes","variantSelection","variantSetNames","customData","active","instanceable","timeSamples","spline","connectionPaths","targetPaths","specifier","connectionChildren","expressionChildren","mapperArgChildren","mapperChildren","primChildren","properties","targetChildren","variantChildren","variantSetChildren","clips","clipSets","kind"]);function TT(n){let e=Fe(n);return e?Tt([],e):[]}function AT(n){n.length<2||n.sort((e,t)=>ht(t,e)?-1:ht(e,t)?1:0)}function xg(n,e){let t=n.getField(e,"customData");if(typeof t!="object"||t===null)return[];let r=t.apiSchemaOverridePropertyNames;return Array.isArray(r)?r.filter(i=>typeof i=="string"):[]}var li={NotBuilding:0,Building:1,Complete:2},O=class n{static#e=null;#n=new Map;#r=new Map;#i=new Map;#s=new Map;#t=new Map;#o=new Map;#a=new Map;#c=new Map;#l=new Map;#u={};#p=new Ir;#d=new Map;#f=new Set;constructor(){}static getInstance(){if(!n.#e){let e=new n;n.#e=e;let t=te.GetInstance();e.#g(t.GetAllPlugins()),t.AddDidRegisterPluginsListener(r=>{e.#g(r)})}return n.#e}static parseSchemaFamilyAndVersionFromIdentifier(e){let t=Sg(e);return t===-1?[e,0]:[e.slice(0,t),parseInt(e.slice(t+1),10)]}static makeSchemaIdentifierForFamilyAndVersion(e,t){return t===0?e:`${e}_${t}`}static isAllowedSchemaFamily(e){return Da(e)&&Sg(e)===-1}static isAllowedSchemaIdentifier(e){let t=n.parseSchemaFamilyAndVersionFromIdentifier(e);if(!t)return!1;let[r,i]=t;return n.isAllowedSchemaFamily(r)&&n.makeSchemaIdentifierForFamilyAndVersion(r,i)===e}static findSchemaInfo(e){let t=n.getInstance();return typeof e=="string"?t.#r.get(e)??null:t.#n.get(e)??null}static findSchemaInfoInFamily(e,t){return n.isAllowedSchemaFamily(e)?n.findSchemaInfo(n.makeSchemaIdentifierForFamilyAndVersion(e,t)):null}static findSchemaInfosInFamily(e,t,r){let i=n.getInstance().#i.get(e);if(!i)return[];if(t===void 0)return[...i];switch(r??"all"){case"all":return[...i];case"greaterThan":return i.filter(s=>s.version>t);case"greaterThanOrEqual":return i.filter(s=>s.version>=t);case"lessThan":return i.filter(s=>s.version<t);case"lessThanOrEqual":return i.filter(s=>s.version<=t)}}static getSchemaTypeName(e){return n.findSchemaInfo(e)?.identifier??""}static getTypeFromSchemaTypeName(e){return n.findSchemaInfo(e)?.type??z.GetUnknownType()}static getConcreteSchemaTypeName(e){let t=n.findSchemaInfo(e);return t&&t.kind==="concreteTyped"?t.identifier:""}static getConcreteTypeFromSchemaTypeName(e){let t=n.findSchemaInfo(e);return t&&t.kind==="concreteTyped"?t.type:z.GetUnknownType()}static getAPISchemaTypeName(e){let t=n.findSchemaInfo(e);return t&&n.#m(t.kind)?t.identifier:""}static getAPITypeFromSchemaTypeName(e){let t=n.findSchemaInfo(e);return t&&n.#m(t.kind)?t.type:z.GetUnknownType()}static getTypeFromName(e){return z.FindByName("UsdSchemaBase").FindDerivedByName(e)}static#m(e){return e==="singleApplyAPI"||e==="multipleApplyAPI"||e==="nonAppliedAPI"}static#h(e){return n.findSchemaInfo(e)?.kind??"invalid"}static getSchemaKind(e){return n.#h(e)}static isConcrete(e){return n.#h(e)==="concreteTyped"}static isAbstract(e){let t=n.#h(e);return t==="abstractTyped"||t==="abstractBase"}static isTyped(e){return(typeof e=="string"?n.getTypeFromSchemaTypeName(e):e).IsA(z.FindByName("UsdTyped"))}static isAppliedAPISchema(e){let t=n.#h(e);return t==="singleApplyAPI"||t==="multipleApplyAPI"}static isMultipleApplyAPISchema(e){return n.#h(e)==="multipleApplyAPI"}static getTypeNameAndInstance(e){let t=e.indexOf(":");return t===-1?[e,""]:[e.slice(0,t),e.slice(t+1)]}static makeMultipleApplyNameTemplate(e,t){return yc(yc(e,yo),t)}static makeMultipleApplyNameInstance(e,t){let r=Cd(e);return r===-1?e:e.slice(0,r)+t+e.slice(r+yo.length)}static getMultipleApplyNameTemplateBaseName(e){let t=Cd(e);if(t===-1)return e;let r=t+yo.length+1;return r>=e.length?"":e.slice(r)}static isMultipleApplyNameTemplate(e){return Cd(e)!==-1}static isAllowedAPISchemaInstanceName(e,t){if(t===""||!n.isMultipleApplyAPISchema(e))return!1;let r=n.getInstance(),i=r.#o.get(e);if(i&&i.size>0&&!i.has(t))return!1;let s=r.findAppliedAPIPrimDefinition(e);if(!s)return!1;let o=t.split(":");if(o.length===0||o.some(c=>c===""))return!1;let a=o[o.length-1];for(let c of s.getPropertyNames())if(a===n.getMultipleApplyNameTemplateBaseName(c))return!1;return!0}static getAPISchemaCanOnlyApplyToTypeNames(e,t){let r=n.getInstance().#t;if(t!==void 0&&t!==""){let i=r.get(yc(e,t));if(i)return[...i]}return[...r.get(e)??[]]}static getAutoApplyAPISchemas(){return new Map([...n.getInstance().#s].map(([e,t])=>[e,[...t]]))}static isDisallowedField(e){return xT.has(e)}findConcretePrimDefinition(e){return this.#a.get(e)??null}findAbstractPrimDefinition(e){return this.#c.get(e)??null}findAppliedAPIPrimDefinition(e){return this.#l.get(e)?.primDef??null}getEmptyPrimDefinition(){return this.#p}buildComposedPrimDefinition(e,t){if(t.length===0)throw new Error("UsdSchemaRegistry.buildComposedPrimDefinition without applied API schemas is not allowed \u2014 use findConcretePrimDefinition instead.");let r=n.isConcrete(e)?this.findConcretePrimDefinition(e):this.findAbstractPrimDefinition(e),i=r?r._copy():new Ir,s=new Map;for(let o of i._appliedAPISchemas){let[a,c]=n.getTypeNameAndInstance(o),l=n.findSchemaInfo(a);l&&s.set(gc(l.family,c),l.version)}return this.#P(i,t,s),i}getFallbackPrimTypes(){return Object.fromEntries(Object.entries(this.#u).map(([e,t])=>[e,[...t]]))}#g(e){let t=e.filter(i=>!this.#f.has(i.GetName()));if(t.length===0)return;for(let i of t)this.#f.add(i.GetName());let r=this.#x(t);this.#T(t,r),this.#S()}#S(){let e=new Map(this.#a),t=new Map(this.#c),r=new Map(this.#l);this.#a.clear(),this.#c.clear(),this.#l.clear(),this.#u={},this.#v([...this.#n.values()]);let i=(s,o)=>{for(let[a,c]of s){let l=o.get(a);l&&(l._replaceWith(c),s.set(a,l))}};i(this.#a,e),i(this.#c,t);for(let[s,o]of this.#l){let a=r.get(s);a&&(a.primDef._replaceWith(o.primDef),this.#l.set(s,{primDef:a.primDef,applyExpectsInstanceName:o.applyExpectsInstanceName}))}}#x(e){let t=z.FindByName("UsdSchemaBase"),r=[];for(let i of e){let s=i.GetMetadata().Types;if(!(typeof s!="object"||s===null))for(let o of Object.keys(s)){let a=z.FindByName(o);if(a.IsUnknown()||!(a===t||a.IsA(t))||this.#n.has(a))continue;let c=i.GetMetadataForType(a);if(Object.keys(c).length===0)continue;let l=typeof c.schemaIdentifier=="string"?c.schemaIdentifier:"";if(l===""){let g=t.GetAliases(a);g.length===1&&(l=g[0])}if(l===""||this.#r.has(l))continue;let u=ST(c),[d,p]=n.parseSchemaFamilyAndVersionFromIdentifier(l),f={identifier:l,type:a,family:d,version:p,kind:u};this.#n.set(a,f),this.#r.set(l,f);let h=this.#i.get(d);h||this.#i.set(d,h=[]);let y=h.findIndex(g=>g.version<p);y===-1&&(y=h.length),h.splice(y,0,f),r.push(f)}}return r}#T(e,t){for(let r of t){if(r.kind!=="singleApplyAPI"&&r.kind!=="multipleApplyAPI")continue;let i=te.GetInstance().GetPluginForType(r.type);if(!i)continue;let s=i.GetMetadataForType(r.type),o=go(s,"apiSchemaCanOnlyApplyTo");if(o.length>0&&this.#t.set(r.identifier,o),r.kind==="singleApplyAPI"){let a=go(s,"apiSchemaAutoApplyTo");a.length>0&&this.#s.set(r.identifier,a)}else{let a=go(s,"apiSchemaAllowedInstanceNames");if(a.length>0){let l=this.#o.get(r.identifier);l||this.#o.set(r.identifier,l=new Set);for(let u of a)l.add(u)}let c=s.apiSchemaInstances;if(typeof c=="object"&&c!==null)for(let[l,u]of Object.entries(c)){if(typeof u!="object"||u===null)continue;let d=go(u,"apiSchemaCanOnlyApplyTo");d.length>0&&this.#t.set(yc(r.identifier,l),d)}}}for(let r of e){let i=r.GetMetadata().AutoApplyAPISchemas;if(!(typeof i!="object"||i===null))for(let[s,o]of Object.entries(i)){if(typeof o!="object"||o===null)continue;let a=go(o,"apiSchemaAutoApplyTo");if(a.length===0)continue;let c=this.#s.get(s);c?c.push(...a):this.#s.set(s,a)}}}#A(){let e=new Map;for(let[t,r]of this.#s){let i=new Set;for(let s of r){let o=this.#r.get(s);if(o&&!i.has(o.type)){i.add(o.type);for(let a of o.type.GetAllDerivedTypes())i.add(a)}}for(let s of i){let o=e.get(s);o||e.set(s,o=[]),o.push(t)}}for(let t of e.values())AT(t);return e}#v(e){let t=this.#A(),r=new Map,i=[],s=[],o=new Set;for(let a of e){if(!(a.kind==="abstractTyped"||a.kind==="concreteTyped"||a.kind==="multipleApplyAPI"||a.kind==="singleApplyAPI"))continue;let l=this.#_(a.type);o.add(l),a.kind==="abstractTyped"?i.push({info:a,layer:l}):a.kind==="concreteTyped"?s.push({info:a,layer:l}):r.set(a.identifier,{info:a,layer:l,primDef:null,buildStatus:li.NotBuilding})}for(let a of o){let c=a.getField("/","fallbackPrimTypes");if(!(typeof c!="object"||c===null))for(let[l,u]of Object.entries(c))Array.isArray(u)&&(l in this.#u||(this.#u[l]=u.filter(d=>typeof d=="string")))}for(let[a,c]of r)this.#b(c,r,t),this.#l.set(a,{primDef:c.primDef,applyExpectsInstanceName:c.info.kind==="multipleApplyAPI"});for(let{info:a,layer:c}of[...i,...s]){let l=`/${a.identifier}`,u=xg(c,l),d=new Ir;d._initializeForTypedSchema(c,l,u),d._locallyDefinedPropertyNames=[...d._properties,...u];let p=this.#y(c,l,a,t);p.length>0&&this.#P(d,p,new Map);for(let f of u)d._composeOverAndReplaceExistingProperty(f,c,l);a.kind==="abstractTyped"?this.#c.set(a.identifier,d):this.#a.set(a.identifier,d)}for(let{info:a}of[...i,...s]){let c=a.kind==="abstractTyped"?this.#c.get(a.identifier):this.#a.get(a.identifier);c._locallyDefinedPropertyNames=this.#I(c,a.identifier)}}#_(e){let t=te.GetInstance().GetPluginForType(e);if(!t)return Oe.createAnonymous("anon:generatedSchema:unowned");let r=this.#d.get(t);if(r)return r;let i=t._GetResourceSync("generatedSchema.usda"),s=null;if(i!==void 0)try{s=Oe.createInMemory(`anon:${t.GetName()}:generatedSchema.usda`,i)}catch{s=null}return s??=Oe.createAnonymous(`anon:${t.GetName()}:generatedSchema.usda`),this.#d.set(t,s),s}#y(e,t,r,i){let s=TT(e.getField(t,"apiSchemas")),o=i.get(r.type);if(o&&(s=[...s,...o]),s.length===0)return s;let a=r.kind==="multipleApplyAPI";return s.filter(c=>n.isMultipleApplyNameTemplate(c)===a)}#b(e,t,r){if(e.buildStatus===li.Complete)return!0;e.buildStatus=li.Building;let{info:i,layer:s}=e,o=`/${i.identifier}`,a=xg(s,o),c=i.kind==="multipleApplyAPI"?n.makeMultipleApplyNameTemplate(i.identifier,""):i.identifier,l=new Ir;l._initializeForAPISchema(c,s,o,a),l._locallyDefinedPropertyNames=[...l._properties,...a],e.primDef=l;let u=this.#y(s,o,i,r);if(u.length===0)return e.buildStatus=li.Complete,!0;let d=new Map;d.set(gc(i.family,""),i.version);let p=!1;for(let f of u){let[h,y]=n.getTypeNameAndInstance(f),g=t.get(h);if(g){if(g.buildStatus===li.Building){p=!0;continue}this.#b(g,t,r)||(p=!0),l._composeWeakerAPIPrimDefinition(g.primDef,y,d);continue}let m=this.#l.get(h);m&&l._composeWeakerAPIPrimDefinition(m.primDef,y,d)}for(let f of a)l._composeOverAndReplaceExistingProperty(f,s,o);return p?(e.buildStatus=li.NotBuilding,!1):(e.buildStatus=li.Complete,!0)}#P(e,t,r){for(let i of t){let[s,o]=n.getTypeNameAndInstance(i),a=this.#l.get(s);if(!a)continue;let c=o!=="";a.applyExpectsInstanceName===c&&e._composeWeakerAPIPrimDefinition(a.primDef,o,r)}}#I(e,t){let r=e._locallyDefinedPropertyNames,i=n.getTypeFromSchemaTypeName(t);if(i.IsUnknown())return r;let s=z.FindByName("UsdTyped"),o=new Set;for(let a of i.GetBaseTypes()){if(a===s)continue;let c=this.#n.get(a);if(!c)continue;let l=c.kind==="concreteTyped"?this.findConcretePrimDefinition(c.identifier):this.findAbstractPrimDefinition(c.identifier);if(l)for(let u of l.getPropertyNames())o.add(u)}return o.size===0?r:r.filter(a=>!o.has(a))}};var rs=class n{static#e=new Map;static#n=null;static{te.GetInstance().AddDidRegisterPluginsListener(()=>{for(let[e,t]of n.#e)t.#t.IsUnknown()?n.#e.delete(e):t.#a=null})}#r;#i;#s;#t=z.GetUnknownType();#o="";#a=null;constructor(e,t,r){this.#r=e,this.#i=t,this.#s=[...r];let i=s=>{if(s==="")return!1;let o=O.getConcreteTypeFromSchemaTypeName(s);return o.IsUnknown()||(this.#t=o,this.#o=s),!0};i(this.#i)||i(this.#r)}getTypeName(){return this.#r}getAppliedAPISchemas(){return[...this.#s]}getSchemaType(){return this.#t}getSchemaTypeName(){return this.#o}getPrimDefinition(){if(this.#a)return this.#a;let e=O.getInstance();return this.#a=this.#s.length===0?e.findConcretePrimDefinition(this.#o)??e.getEmptyPrimDefinition():e.buildComposedPrimDefinition(this.#o,this.#s),this.#a}static getEmptyPrimType(){return n.#n??=new n("","",[])}static _findOrCreatePrimTypeInfo(e,t,r){if(e===""&&t===""&&r.length===0)return n.getEmptyPrimType();let i=[e,t,...r].join("\0"),s=n.#e.get(i);return s||(s=new n(e,t,r),n.#e.set(i,s)),s}};var bo=class{constructor(e,t,r){this._stage=e;this._primPath=t;this.name=r}setTargets(e){this._stage._setRelTargets(this._primPath,this.name,e)}addTarget(e){let t=this.getTargets();t.includes(e)||this.setTargets([...t,e])}getTargets(){return this._stage.get(`${this._primPath}.${this.name}`)?.getTargets()??[]}getMetadata(e){return this._stage.get(`${this._primPath}.${this.name}`)?.getMetadata(e)}setMetadata(e,t){return this._stage._setPropertyMetadata(this._primPath,this.name,e,t),!0}};var Tg={offset:0,scale:1},is=class{constructor(e,t,r){this._stage=e;this._primPath=t;this._field=r}async addReference(e,t=""){let r=this._stage.getEditTarget().getLayer(),i=r.getField(this._primPath,this._field),s=i?{...i,prependedItems:[...i.prependedItems]}:{isExplicit:!1,explicitItems:[],prependedItems:[],appendedItems:[],deletedItems:[]};s.prependedItems.push({assetPath:e,primPath:t,layerOffset:{...Tg}}),await this._stage._ownAuthoringAsync(async()=>{r.setField(this._primPath,this._field,s),await this._stage._recomposeForEdit()})}async setReferences(e){let t=this._stage.getEditTarget().getLayer(),r=e.map(i=>({assetPath:i.assetPath,primPath:i.primPath??"",layerOffset:i.layerOffset?{...i.layerOffset}:{...Tg}}));await this._stage._ownAuthoringAsync(async()=>{t.setField(this._primPath,this._field,{isExplicit:!0,explicitItems:r,prependedItems:[],appendedItems:[],deletedItems:[]}),await this._stage._recomposeForEdit()})}async clear(){let e=this._stage.getEditTarget().getLayer();await this._stage._ownAuthoringAsync(async()=>{e.setField(this._primPath,this._field,{isExplicit:!0,explicitItems:[],prependedItems:[],appendedItems:[],deletedItems:[]}),await this._stage._recomposeForEdit()})}};var Po=class{constructor(e,t){this._stage=e;this._primPath=t}async setSpecializes(e){let t=this._stage.getEditTarget().getLayer();await this._stage._ownAuthoringAsync(async()=>{t.setField(this._primPath,"specializes",{isExplicit:!0,explicitItems:[...e],prependedItems:[],appendedItems:[],deletedItems:[]}),await this._stage._recomposeForEdit()})}async clearSpecializes(){let e=this._stage.getEditTarget().getLayer();await this._stage._ownAuthoringAsync(async()=>{e.setField(this._primPath,"specializes",{isExplicit:!0,explicitItems:[],prependedItems:[],appendedItems:[],deletedItems:[]}),await this._stage._recomposeForEdit()})}getSpecializes(){let e=this._stage.getEditTarget().getLayer().getField(this._primPath,"specializes");return e?e.isExplicit?[...e.explicitItems]:[...e.prependedItems,...e.appendedItems]:[]}};var at=Object.freeze({Soft:"soft",Hard:"hard",Minimum:"minimum",Maximum:"maximum"});function vg(n){return n!==null&&typeof n=="object"&&!Array.isArray(n)}function Dd(n){return vg(n)?structuredClone(n):{}}function Ag(n,e){return n===void 0||e===void 0?!0:Array.isArray(n)||Array.isArray(e)?Array.isArray(n)&&Array.isArray(e):typeof n==typeof e}var So=class{constructor(e,t={},r={},i=""){this.success=e;this.invalidValuesDict=t;this.conformedSubDict=r;this.errorString=i}},xo=class{constructor(e,t=""){this._attr=e;this._subDictKey=t}isValid(){return this._attr!==void 0&&this._subDictKey.length>0}getAttribute(){return this._attr}getSubDictKey(){return this._subDictKey}_limitsDict(){return Dd(this._attr?.getMetadata("limits"))}_subDict(){let e=this._limitsDict()[this._subDictKey];return Dd(e)}_writeSubDict(e){if(!this.isValid())return!1;let t=this._limitsDict();return e===void 0||Object.keys(e).length===0?delete t[this._subDictKey]:t[this._subDictKey]=e,Object.keys(t).length===0?this._attr._clearMetadata("limits"):this._attr.setMetadata("limits",t),!0}hasAuthored(e){let t=this._subDict();return e===void 0?Object.keys(t).length>0:Object.prototype.hasOwnProperty.call(t,e)}clear(e){if(!this.isValid())return!1;if(e===void 0)return this._writeSubDict(void 0);let t=this._subDict();return delete t[e],this._writeSubDict(t)}hasAuthoredMinimum(){return this.hasAuthored(at.Minimum)}clearMinimum(){return this.clear(at.Minimum)}hasAuthoredMaximum(){return this.hasAuthored(at.Maximum)}clearMaximum(){return this.clear(at.Maximum)}validate(e){if(!this.isValid()||!vg(e))return new So(!1,{},{},"Invalid attribute limits");let t=this._attr.get(),r={};for(let s of[at.Minimum,at.Maximum])s in e&&!Ag(t,e[s])&&(r[s]=e[s]);let i=Object.keys(r).length===0;return new So(i,r,i?structuredClone(e):{},i?"":`Invalid limits values for <${this._attr.primPath}.${this._attr.name}>`)}set(e,t){if(typeof e!="string"){let i=this.validate(e);return i.success&&this._writeSubDict(Dd(i.conformedSubDict))}if(!this.isValid()||e.length===0||(e===at.Minimum||e===at.Maximum)&&!Ag(this._attr.get(),t))return!1;let r=this._subDict();return r[e]=structuredClone(t),this._writeSubDict(r)}get(e){return this._subDict()[e]}getOr(e,t){let r=this.get(e);return r===void 0?t:r}getMinimum(){return this.get(at.Minimum)}getMinimumOr(e){return this.getOr(at.Minimum,e)}setMinimum(e){return this.set(at.Minimum,e)}getMaximum(){return this.get(at.Maximum)}getMaximumOr(e){return this.getOr(at.Maximum,e)}setMaximum(e){return this.set(at.Maximum,e)}};var Rd="backOfPrependList";var Ed=new WeakMap,To=new WeakMap;function Pc(n){let e=n.lastIndexOf("/");return e<=0?"/":n.slice(0,e)}function bc(n){let e=new Map;for(let t of n.keys()){if(t==="/"||t.includes("."))continue;let r=Pc(t),i=e.get(r);i||e.set(r,i=[]),i.push(t)}return e}function _g(n){return Ed.get(n)??0}function Nd(n){let e=To.get(n)??bc(n),t=new Set;for(let[r,i]of e){let s=i.filter(o=>n.has(o)&&Pc(o)===r);e.set(r,s);for(let o of s)t.add(o)}for(let r of n.keys()){if(r==="/"||r.includes(".")||t.has(r))continue;let i=Pc(r),s=e.get(i);s||e.set(i,s=[]),s.push(r),t.add(r)}return To.set(n,e),e}var Sc=class{nodes=new Map;_generation=0;constructor(e){for(let[t,r]of e)this.nodes.set(t,r);Ed.set(this.nodes,this._generation),To.set(this.nodes,bc(e))}get generation(){return this._generation}replaceAll(e){this.nodes.clear();for(let[t,r]of e)this.nodes.set(t,r);To.set(this.nodes,bc(e)),this.markStructureChanged()}replaceSubtrees(e,t){if(t.length===0)return;if(t.includes("/")){this.replaceAll(e);return}let r=o=>t.some(a=>o===a||o.startsWith(`${a}/`)||o.startsWith(`${a}.`)),i=new Map([...Nd(this.nodes)].map(([o,a])=>[o,[...a]])),s=bc(e);for(let o of[...this.nodes.keys()])r(o)&&this.nodes.delete(o);for(let[o,a]of e)r(o)&&this.nodes.set(o,a);for(let o of t){for(let l of[...i.keys()])(l===o||l.startsWith(`${o}/`))&&i.delete(l);for(let[l,u]of s)(l===o||l.startsWith(`${o}/`))&&i.set(l,[...u]);let a=Pc(o),c=i.get(a)??[];this.nodes.has(o)?c.includes(o)||(c=[...c,o]):c=c.filter(l=>l!==o),i.set(a,c)}To.set(this.nodes,i),this.markStructureChanged()}replacePrims(e,t){if(t.length===0)return;let r=i=>t.some(s=>i===s||i.startsWith(`${s}.`));for(let i of[...this.nodes.keys()])r(i)&&this.nodes.delete(i);for(let[i,s]of e)r(i)&&this.nodes.set(i,s);this.markStructureChanged()}markStructureChanged(){this._generation+=1,Ed.set(this.nodes,this._generation)}};var Vd=1,vT=new Set(["half","float","double","timecode","matrix2d","matrix3d","matrix4d","double2","float2","half2","double3","float3","half3","double4","float4","half4","quatd","quatf","quath","point3h","point3f","point3d","vector3h","vector3f","vector3d","normal3h","normal3f","normal3d","color3h","color3f","color3d","color4h","color4f","color4d","texCoord2h","texCoord2f","texCoord2d","texCoord3h","texCoord3f","texCoord3d"]);function Ig(n){if(!n)return!1;let e=n.endsWith("[]")?n.slice(0,-2):n;return vT.has(e)}function wg(n){return n==="held"||n===0}function Tc(n,e,t,r={offset:0,scale:1}){if(!n)return;let i=_r(r);if(!i)return;let s=Ce(i,e),o=t?n.EvalPreValue(s):n.Eval(s);return o!==void 0&&n.IsTimeValued()?Ce(r,o):o}function Ac(n,e={offset:0,scale:1}){if(!n)return;let t=new we(n.GetValueType());t.SetTimeValued(n.IsTimeValued()),t.SetCurveType(n.GetCurveType());let{offset:r,scale:i}=e,s=i>0,o=c=>new We(c.mode,s&&c.mode===3?c.slope/i:c.slope);t.SetPreExtrapolation(o(n.GetPreExtrapolation())),t.SetPostExtrapolation(o(n.GetPostExtrapolation()));let a=n.GetInnerLoopParams();return t.SetInnerLoopParams(s&&a.protoEnd>a.protoStart?new Qe(a.protoStart*i+r,a.protoEnd*i+r,a.numPreLoops,a.numPostLoops,a.valueOffset):a),t.SetKnots(n.GetKnots().map(c=>{let l=new yt(c.GetValueType());l.SetCurveType(c.GetCurveType()),l.SetNextInterpolation(c.GetNextInterpolation()),l.SetTime(s?c.GetTime()*i+r:c.GetTime());let u=d=>s&&n.IsTimeValued()?d*i+r:d;return l.SetValue(u(c.GetValue())),c.IsDualValued()&&l.SetPreValue(u(c.GetPreValue())),l.SetPreTanWidth(s?c.GetPreTanWidth()*i:c.GetPreTanWidth()),l.SetPostTanWidth(s?c.GetPostTanWidth()*i:c.GetPostTanWidth()),l.SetPreTanSlope(s?c.GetPreTanSlope()/i:c.GetPreTanSlope()),l.SetPostTanSlope(s?c.GetPostTanSlope()/i:c.GetPostTanSlope()),l.SetPreTanAlgorithm(c.GetPreTanAlgorithm()),l.SetPostTanAlgorithm(c.GetPostTanAlgorithm()),l.SetCustomData(c.GetCustomData()),l})),t}function Cg(n,e,t){let r=new Array(n.length);for(let i=0;i<n.length;i++){let s=n[i],o=e[i];if(typeof s=="number"&&typeof o=="number")r[i]=s+(o-s)*t;else if(Array.isArray(s)&&Array.isArray(o)&&s.length===o.length){let a=Cg(s,o,t);if(a===null)return null;r[i]=a}else return null}return r}function xc(n){let e=new DataView(new ArrayBuffer(4));e.setFloat32(0,Math.fround(n));let t=e.getUint32(0),r=t>>>16&32768,i=t>>>23&255,s=t&8388607,o;if(i===255)o=r|31744|(s?512:0);else{let u=i-127+15;if(u>=31)o=r|31744;else if(u<=0)if(u<-10)o=r;else{let d=s|8388608,p=14-u,f=d>>>p,h=d&(1<<p)-1,y=1<<p-1;(h>y||h===y&&f&1)&&f++,o=r|f}else{let d=u<<10|s>>>13,p=s&8191;(p>4096||p===4096&&d&1)&&d++,o=r|d}}let a=o>>>10&31,c=o&1023,l=o&32768?-1:1;return a===0?l*2**-14*(c/1024):a===31?c?NaN:l*(1/0):l*2**(a-15)*(1+c/1024)}function Gd(n,e){if(!e)return n;let t=e.replace(/\[\]$/,""),r=t==="half"||t==="quath"||/^(?:color|point|normal|vector|texCoord)[234]h$/.test(t)?xc:t==="float"||t==="quatf"||/^(?:color|point|normal|vector|texCoord)[234]f$/.test(t)?Math.fround:void 0;return r?typeof n=="number"?r(n):Array.isArray(n)?n.map(i=>Gd(i,e)):n:n}function kg(n,e,t,r){if(!Array.isArray(n)||!Array.isArray(e)||n.length!==4||e.length!==4||!n.every(d=>typeof d=="number")||!e.every(d=>typeof d=="number"))return null;let i=n,s=e,o=i.reduce((d,p,f)=>d+p*s[f],0),a=!1;o<0&&(o=-o,a=!0);let c=r==="quath"?xc:r==="quatf"?Math.fround:d=>d,l,u;if(1-o>1e-5){let d=r==="quath"?xc(Math.acos(o)):Math.acos(o),p=r==="quath"?xc(Math.sin(d)):Math.sin(d);l=Math.sin((1-t)*d)/p,u=Math.sin(t*d)/p}else l=1-t,u=t;return a&&(u=-u),i.map((d,p)=>c(c(d*l)+c(s[p]*u)))}function _T(n,e,t,r){let i=r.endsWith("[]")?r.slice(0,-2):r;if(!i.startsWith("quat"))return null;if(!r.endsWith("[]"))return kg(n,e,t,i);if(!Array.isArray(n)||!Array.isArray(e)||n.length!==e.length)return null;let s=[];for(let o=0;o<n.length;o++){let a=kg(n[o],e[o],t,i);if(a===null)return null;s.push(a)}return s}function Nn(n,e,t,r=!1,i){let s=[...n].sort(([h],[y])=>h-y);if(e<=s[0][0])return s[0][1];if(e>s[s.length-1][0])return s[s.length-1][1];let o=s.find(([h])=>h===e);if(o&&!r)return o[1];let a=0,c=s.length-1;for(;a<c-1;){let h=a+c>>1;s[h][0]<e||s[h][0]===e&&!r?a=h:c=h}let[l,u]=s[a],[d,p]=s[c];if(u instanceof Q)return;if(p instanceof Q||wg(t)||i!==void 0&&!Ig(i))return u;let f=(e-l)/(d-l);if(i?.startsWith("quat")){let h=_T(u,p,f,i);return h!==null?h:u}if(typeof u=="number"&&typeof p=="number")return Gd(u+(p-u)*f,i);if(Array.isArray(u)&&Array.isArray(p)&&u.length===p.length){let h=Cg(u,p,f);if(h!==null)return Gd(h,i)}return u}var Ao=V.absoluteRootPath,Md=V.emptyPath;function Vn(n){return n.pathElementCount}function Bd(n,e){return e.isEmpty()||n.isEmpty()?!1:e.isAbsoluteRootPath()?n.isAbsolutePath():n.hasPrefix(e)}function ui(n){return n.getParentPath()}function vc(n){return n.name}function Dg(n){return n.isAbsoluteRootPath()}function vo(n,e){return n.pathString===e.pathString}function Rg(n,e){let t=Vn(n[0]),r=Vn(e[0]);if(t!==r)return t-r;let i=n[0].pathString,s=e[0].pathString;return i<s?-1:i>s?1:0}function Ld(n,e,t){return t.isEmpty()?Md:n.replacePrefix(e,t)}function Od(n,e){let t=-1,r=-1;for(let i=0;i<e.length;i++)if(Bd(n,e[i][0])){let s=Vn(e[i][0]);s>r&&(r=s,t=i)}return t}function Ng(n,e,t=0){let r=-1,i=t;for(let s=0;s<e.length;s++){let o=Vn(e[s][1]);o>=i&&Bd(n,e[s][1])&&(i=o,r=s)}return r}function Fd(n,e,t,r){let i=t<0?0:Vn(r?e[t][0]:e[t][1]),s=r?IT(n,e,i):Ng(n,e,i);return s!==-1&&s!==t}function IT(n,e,t){let r=-1,i=t-1;for(let s=0;s<e.length;s++){let o=Vn(e[s][0]);o>=t&&o>i&&Bd(n,e[s][0])&&(i=o,r=s)}return r}function wT(n,e){let t=n[e][0],r=n[e][1];if(r.isEmpty()){let u=Od(ui(t),n);if(u===-1||n[u][1].isEmpty())return!0;let d=Ld(t,n[u][0],n[u][1]);return Fd(d,n,u,!1)}if(vc(t)!==vc(r))return!1;let s=Od(ui(t),n);if(s===-1||n[s][1].isEmpty())return!1;let o=n[s][0],a=n[s][1];if(Dg(o)&&Dg(a)&&vo(t,r))return!0;if(Vn(r)-Vn(a)!==Vn(t)-Vn(o))return!1;let c=ui(t),l=ui(r);for(;!vo(c,o);){if(vc(c)!==vc(l))return!1;c=ui(c),l=ui(l)}return vo(a,l)?!Fd(ui(r),n,s,!1):!1}function kT(n){let e=n.slice();for(let r=0;r<e.length;)wT(e,r)?e.splice(r,1):r++;let t=!1;return e.length>0&&e[0][0].isAbsoluteRootPath()&&e[0][1].isAbsoluteRootPath()&&(e.shift(),t=!0),{pairs:e,hasRootIdentity:t}}function Eg(n){return typeof n=="string"?V.fromString(n):n}var ne=class n{_pairs;_hasRootIdentity;_offset;constructor(e,t,r){this._pairs=e,this._hasRootIdentity=t,this._offset=r}static _fromCanonical(e,t,r){return new n(e,t,r)}static _build(e,t){let r=e.slice().sort(Rg),{pairs:i,hasRootIdentity:s}=kT(r);return new n(i,s,t)}static create(e,t=At){let i=[...e instanceof Map?[...e.entries()]:e].map(([s,o])=>[Eg(s),Eg(o)]);return n._build(i,t)}static identity(){return new n([],!0,At)}static null(){return new n([],!1,At)}isNull(){return this._pairs.length===0&&!this._hasRootIdentity&&ns(this._offset)}isIdentity(){return this.isIdentityPathMapping()&&ns(this._offset)}isIdentityPathMapping(){return this._hasRootIdentity&&this._pairs.length===0}hasRootIdentity(){return this._hasRootIdentity}getTimeOffset(){return this._offset}getSourceToTargetMap(){let e=new Map;this._hasRootIdentity&&e.set(Ao.pathString,Ao.pathString);for(let[t,r]of this._pairs)e.set(t.pathString,r.pathString);return e}_map(e,t){if(e.containsPrimVariantSelection()){let r=this._mapNoVariants(e.stripAllVariantSelections(),t);return r.isEmpty()?r:e.reapplyVariantSelectionsOnto(r)}return this._mapNoVariants(e,t)}_mapNoVariants(e,t){let r=t?Ng(e,this._pairs):Od(e,this._pairs),i;return r===-1?i=this._hasRootIdentity?e:Md:t?i=Ld(e,this._pairs[r][1],this._pairs[r][0]):i=Ld(e,this._pairs[r][0],this._pairs[r][1]),i.isEmpty()?i:Fd(i,this._pairs,r,t)?Md:i}mapSourceToTarget(e){return this._map(e,!1)}mapTargetToSource(e){return this._map(e,!0)}compose(e){if(this.isIdentity())return e;if(e.isIdentity())return this;let t=[],r=new Set;this._hasRootIdentity&&e._hasRootIdentity&&(t.push([Ao,Ao]),r.add(Ao.pathString));for(let[i,s]of e._pairs)t.push([i,this.mapSourceToTarget(s)]),r.add(i.pathString);for(let[i,s]of this._pairs){let o=e.mapTargetToSource(i);o.isEmpty()||r.has(o.pathString)||(r.add(o.pathString),t.push([o,s]))}return n._build(t,Be(this._offset,e._offset))}composeOffset(e){return new n(this._pairs,this._hasRootIdentity,Be(this._offset,e))}getInverse(){let e=this._pairs.map(([r,i])=>[i,r]);e.sort(Rg);let t=_r(this._offset)??At;return n._fromCanonical(e,this._hasRootIdentity,t)}static impliedClass(e,t){if(e.isIdentity())return t;let r=e.compose(t.compose(e.getInverse()));return new n(r._pairs,!0,r._offset)}addRootIdentity(){return this._hasRootIdentity?this:new n(this._pairs,!0,this._offset)}equals(e){if(this._hasRootIdentity!==e._hasRootIdentity||!mc(this._offset,e._offset)||this._pairs.length!==e._pairs.length)return!1;for(let t=0;t<this._pairs.length;t++)if(!vo(this._pairs[t][0],e._pairs[t][0])||!vo(this._pairs[t][1],e._pairs[t][1]))return!1;return!0}toString(){let e=[...this.getSourceToTargetMap()].map(([t,r])=>`${t} -> ${r||"(block)"}`);return ns(this._offset)||e.push(`offset=${this._offset.offset} scale=${this._offset.scale}`),`{ ${e.join(", ")} }`}};function Vg(n){return n.addRootIdentity()}function CT(n,e,t,r){switch(n){case 4:return!0;case 1:return!1;case 0:return r.hasRootIdentity();case 3:return!!(e&&e.alwaysHasIdentity&&t&&t.alwaysHasIdentity);case 5:return!0;default:return!!(e&&e.alwaysHasIdentity)||!!(t&&t.alwaysHasIdentity)}}function DT(n,e,t,r){let i=e?e.id:"-",s=t?t.id:"-",o=n===0?r.toString():"";return`${n}|${i}|${s}|${o}`}var RT=0,wr=class n{id;op;arg1;arg2;constant;alwaysHasIdentity;_cachedValue=null;_valueForVariable=ne.null();dependents=new Set;static _registry=new Map;constructor(e,t,r,i){this.id=RT++,this.op=e,this.arg1=t,this.arg2=r,this.constant=i,this.alwaysHasIdentity=CT(e,t,r,i),t&&t.dependents.add(this),r&&r.dependents.add(this)}static create(e,t=null,r=null,i=ne.null()){if(e!==1){let s=DT(e,t,r,i),o=n._registry.get(s);if(o)return o;let a=new n(e,t,r,i);return n._registry.set(s,a),a}return new n(e,t,r,i)}evaluate(){if(this._cachedValue!==null)return this._cachedValue;let e=this._evaluateUncached();return this._cachedValue=e,e}_evaluateUncached(){switch(this.op){case 0:return this.constant;case 1:return this._valueForVariable;case 2:return this.arg1.evaluate().getInverse();case 3:return this.arg1.evaluate().compose(this.arg2.evaluate());case 4:return Vg(this.arg1.evaluate());case 5:return ne.impliedClass(this.arg1.evaluate(),this.arg2.evaluate());default:throw new Error("PcpMapExpression: unhandled op")}}_invalidate(){if(this._cachedValue!==null){this._cachedValue=null;for(let e of this.dependents)e._invalidate()}}setValueForVariable(e){if(this.op!==1)throw new Error("PcpMapExpression: cannot set value for non-variable");if(!this._valueForVariable.equals(e)){this._valueForVariable=e,this._cachedValue=null;for(let t of this.dependents)t._invalidateExternal()}}_invalidateExternal(){this._invalidate()}getValueForVariable(){return this._valueForVariable}},_c=class{constructor(e){this._node=e}getValue(){return this._node.getValueForVariable()}setValue(e){this._node.setValueForVariable(e)}getExpression(){return kr._fromNode(this._node)}},kr=class n{_node;constructor(e){this._node=e}static _fromNode(e){return new n(e)}static null(){return new n(null)}evaluate(){return this._node?this._node.evaluate():ne.null()}isNull(){return this._node===null}static identity(){return n.constant(ne.identity())}static constant(e){return new n(wr.create(0,null,null,e))}static newVariable(e){let t=wr.create(1),r=new _c(t);return r.setValue(e),r}isConstantIdentity(){return this._node!==null&&this._node.op===0&&this._node.constant.isIdentity()}compose(e){return this.isConstantIdentity()?e:e.isConstantIdentity()?this:this._node.op===0&&e._node.op===0?n.constant(this.evaluate().compose(e.evaluate())):new n(wr.create(3,this._node,e._node))}inverse(){return this.isConstantIdentity()?this:this._node.op===0?n.constant(this.evaluate().getInverse()):new n(wr.create(2,this._node))}addRootIdentity(){return this.isConstantIdentity()?this:this._node.op===0?n.constant(Vg(this.evaluate())):this._node.alwaysHasIdentity?new n(this._node):new n(wr.create(4,this._node))}static impliedClass(e,t){return e.isConstantIdentity()?t:e._node.op===0&&t._node.op===0?n.constant(ne.impliedClass(e.evaluate(),t.evaluate())):new n(wr.create(5,e._node,t._node))}isIdentity(){return this.evaluate().isIdentity()}mapSourceToTarget(e){return this.evaluate().mapSourceToTarget(V.fromString(e)).pathString}mapTargetToSource(e){return this.evaluate().mapTargetToSource(V.fromString(e)).pathString}};var fn=(a=>(a[a.Root=0]="Root",a[a.Inherit=1]="Inherit",a[a.Variant=2]="Variant",a[a.Relocate=3]="Relocate",a[a.Reference=4]="Reference",a[a.Payload=5]="Payload",a[a.Specialize=6]="Specialize",a))(fn||{});function _o(n){return n===1}function Qt(n){return n===6}function hn(n){return n===1||n===6}function R(n){return n.pathString}function Ud(n,e,t){return{rootLayer:n,...e?{sessionLayer:e}:{},...t?{expressionVariablesOverrideSource:t}:{}}}function Ze(n){return`${n.rootLayer.filePath}\0${n.sessionLayer?.filePath??""}\0${n.expressionVariablesOverrideSource?.getKey()??"<root>"}`}function xe(n,e){return{layerStack:n,path:e}}var ss=class{constructor(e,t){this.layerStack=e;this.path=t}equals(e){return this.layerStack===e.layerStack&&this.path.pathString===e.path.pathString}toString(){return`${Ic(this.layerStack.identifier)}<${this.path.pathString}>`}};function Ic(n){let e=`@${n.rootLayer.filePath}@`;return n.sessionLayer&&(e+=`,@${n.sessionLayer.filePath}@`),e}var vt=class{constructor(){}toString(){return this.message}};var kc=class extends vt{};var Cc=class extends vt{};var Dc=class extends vt{};var Rc=class extends vt{},Ec=class extends vt{},Nc=class extends Ec{};var Vc=class extends vt{};var os=class extends vt{},Gc=class extends os{},Mc=class extends os{},Lc=class extends os{},Oc=class extends vt{};var Fc=class extends vt{};var Bc=class extends vt{},Uc=class extends vt{};function Ft(n,e){return Object.assign(Object.create(n),e)}function ET(n){return`@${n.rootLayer.filePath}@`+(n.sessionLayer?`,@${n.sessionLayer.filePath}@`:"")}function wc(n){return`${ET(n.layerStack)}<${n.path}>`}function $c(n,e){return`@${n?.filePath??"<expired>"}@<${e}>`}var zd={0:"root",1:"inherit",3:"relocate",2:"variant",4:"reference",5:"payload",6:"specialize"};function Gg(n){let e=`Cycle detected:
`;for(let t=0;t<n.length;t++){let r=n[t];if(t>0)if(t+1<n.length)switch(r.arcType){case 1:e+=`inherits from:
`;break;case 3:e+=`is relocated from:
`;break;case 2:e+=`uses variant:
`;break;case 4:e+=`references:
`;break;case 5:e+=`gets payload from:
`;break;default:e+=`refers to:
`;break}else switch(e+="CANNOT ",r.arcType){case 1:e+=`inherit from:
`;break;case 3:e+=`be relocated from:
`;break;case 2:e+=`use variant:
`;break;case 4:e+=`reference:
`;break;case 5:e+=`get payload from:
`;break;default:e+=`refer to:
`;break}e+=`${wc(r.site)}
`,t>0&&t+1<n.length&&(e+="which ")}return Ft(kc.prototype,{errorType:0,rootSite:n[0].site,cycle:n,message:e})}function Mg(n){return Ft(Bc.prototype,{errorType:29,...n,message:`Unresolved ${zd[n.arcType]} prim path ${$c(n.targetLayer,n.unresolvedPath)} introduced by ${$c(n.sourceLayer,n.site.path)}`})}function zc(n){let e={0:"refer to",1:"inherit from",3:"be relocated from",2:"use variant",4:"reference",5:"get payload from",6:"refer to"};return Ft(Cc.prototype,{errorType:2,...n,message:`${wc(n.site)}
CANNOT ${e[n.arcType]}:
${wc(n.targetSite)}
which is a prohibited child of its parent because it would require allowing opinions from the source of a relocation at ${wc(n.relocationSourceSite)}.`})}function Lg(n){return Ft(Nc.prototype,{errorType:11,...n,message:`Could not open asset @${n.resolvedAssetPath}@ for ${zd[n.arcType]} introduced by ${$c(n.sourceLayer,n.site.path)}`+(n.messages?` -- ${n.messages}`:"")+"."})}function Hd(n){return Ft(Rc.prototype,{errorType:10,...n,message:`Invalid ${zd[n.arcType]} path <${n.primPath}> introduced by ${$c(n.sourceLayer,n.site.path)}-- must be an absolute prim path with no variant selections.`})}function Og(n){let e=t=>t==="attribute"?"an attribute":"a relationship";return Ft(Dc.prototype,{errorType:6,...n,message:`The property <${n.rootSite.path}> has inconsistent spec types.  The defining spec is @${n.definingLayerIdentifier}@<${n.definingSpecPath}> and is ${e(n.definingSpecType)} spec.  The conflicting spec is @${n.conflictingLayerIdentifier}@<${n.conflictingSpecPath}> and is ${e(n.conflictingSpecType)} spec.  The conflicting spec will be ignored.`})}function Hc(n){let e=n.sourcePath==="/"?`in @${n.sourceLayer.filePath}@`:`at ${n.sourcePath} in @${n.sourceLayer.filePath}@`;return Ft(Uc.prototype,{errorType:30,...n,message:`Error evaluating expression ${n.expression.slice(0,32)} for ${n.context} ${e}: ${n.expressionError}`})}function Fg(n){return Ft(Fc.prototype,{errorType:27,...n,message:`Sublayer hierarchy with root layer @${n.layer.filePath}@ has cycles. Detected when layer @${n.sublayer.filePath}@ was seen in the layer stack for the second time.`})}function Bg(n){return Ft(Vc.prototype,{errorType:17,...n,message:`The following sublayers for layer @${n.layer.filePath}@ have the same owner '${n.owner}': `+n.sublayers.map(e=>`@${e.filePath}@`).join(", ")})}function Ug(n){return Ft(Gc.prototype,{errorType:21,...n,message:`Relocation from <${n.sourcePath}> to <${n.targetPath}> authored at @${n.layer.filePath}@<${n.owningPath}> is invalid and will be ignored: `+n.messages})}var NT={0:"The target of a relocate cannot be the source of another relocate in the same layer stack.",1:"The source of a relocate cannot be the target of another relocate in the same layer stack.",2:"The target of a relocate cannot be a descendant of the source of another relocate.",3:"The source of a relocate cannot be a descendant of the source of another relocate."};function $g(n){return Ft(Mc.prototype,{errorType:22,...n,message:`Relocation from <${n.sourcePath}> to <${n.targetPath}> authored at @${n.layer.filePath}@<${n.owningPath}> conflicts with another relocation from <${n.conflictSourcePath}> to <${n.conflictTargetPath}> authored at @${n.conflictLayer.filePath}@<${n.conflictOwningPath}> and will be ignored: `+NT[n.conflictReason]})}function zg(n){let e=n.sources.map(t=>`relocation from <${t.sourcePath}> authored at @${t.layer.filePath}@<${t.owningPath}>`).join("; ");return Ft(Lc.prototype,{errorType:23,...n,message:`The path <${n.targetPath}> is the target of multiple relocations from different sources. The following relocates to this target are invalid and will be ignored: ${e}.`})}function Hg(n){return Ft(Oc.prototype,{errorType:24,...n,message:`The layer @${n.layer.filePath}@ has an invalid opinion at the relocation source path <${n.path}>, which will be ignored.`})}async function as(n,e,t,r=n.current){return r?In(r,e,t):await t(void 0)}function jg(n,e,t,r=n.current){return r?qn(r,e,t):t(void 0)}function cs(n,e,t){n&&fe(n,e,t)}function Cr(n){let e=n.lastIndexOf("/");return e<=0?"/":n.slice(0,e)}function Wg(n,e){return n===e||e.startsWith(n+"/")}function GT(n,e,t){return n===e?t:n.startsWith(e+"/")?t+n.slice(e.length):n}async function jd(n,e,t,r,i,s,o,a,c,l){s.push({layer:n,offset:t});let u=n.getField("/","subLayers");if(!u||u.length===0)return;let d=n.getField("/","subLayerOffsets")??[],p=new Map(i).set(n.filePath,n),f=[];for(let h=0;h<u.length;h++){let y=u[h];if(Lt(y)){let T=Rn(y,o);if(T.errors.length>0&&l.push(Hc({rootSite:{...c,path:""},expression:y,expressionError:T.errors.join("; "),context:"sublayer",sourceLayer:n,sourcePath:"/"})),typeof T.value!="string"||T.value==="")continue;y=T.value}let g=n.resolveAsset(y);if(!g)continue;let m=p.get(g);if(m!==void 0){l.push(Fg({rootSite:c,layer:n,sublayer:m}));continue}let P=await e(g);if(!P)continue;let b=Wd(P),S=d[h]??At,x=r===b?S:{offset:S.offset,scale:S.scale*r/b},v=Be(t,x);f.push({layer:P,offset:v,tcps:b})}if(a&&n.getField("/","hasOwnedSubLayers")===!0){let h=g=>g.layer.getField("/","owner")===a;f.sort((g,m)=>Number(h(m))-Number(h(g)));let y=f.filter(h).map(g=>g.layer);y.length>1&&l.push(Bg({rootSite:c,owner:a,layer:n,sublayers:y}))}for(let h of f)await jd(h.layer,e,h.offset,h.tcps,p,s,o,a,c,l)}function Wd(n){let e=n.getField("/","timeCodesPerSecond");if(typeof e=="number")return e;let t=n.getField("/","framesPerSecond");return typeof t=="number"?t:24}function MT(n,e){let t=s=>s.startsWith("/")?s.includes("{")?"Relocates cannot have any variant selections.":s.includes(".")?"Only prims can be relocated.":null:"Relocates must use absolute paths.";if(!n)return"Relocates source paths cannot be empty.";let r=t(n);if(r!==null)return r;if(Cr(n)==="/")return"Root prims cannot be the source of a relocate.";if(!e)return null;let i=t(e);return i!==null?i:n===e?"The target of a relocate cannot be the same as its source.":Wg(n,e)?"The target of a relocate cannot be a descendant of its source.":Wg(e,n)?"The target of a relocate cannot be an ancestor of its source.":null}function LT(n,e,t){let r=new Map,i=new Map,s=[],o=(y,g,m,P)=>{let b=g??"",S=MT(y,b);if(S!==null){t.push(Ug({rootSite:e,sourcePath:y,targetPath:b,layer:m,owningPath:P,messages:S}));return}if(r.has(y))return;r.set(y,b),i.set(y,{layer:m,owningPath:P});let x=Cr(y);x!=="/"&&!s.includes(x)&&s.push(x)},a=(y,g)=>g.startsWith("/")?g:`${y==="/"?"":y}/${g}`;for(let{layer:y}of n){let g=y.getField("/","layerRelocates");if(g){let m=Array.isArray(g)?g:Object.entries(g);for(let[P,b]of m)o(P,b,y,"/")}for(let m of y.getSpecPaths()){let P=y.getField(m,"relocates");if(!P)continue;let b=Array.isArray(P)?P:Object.entries(P);for(let[S,x]of b)o(a(m,S),x&&a(m,x),y,m)}}{let y=new Map,g=new Set,m=new Map,P=[],b=x=>i.get(x),S=(x,v,T)=>{let w=b(x),D=b(v);P.push($g({rootSite:e,sourcePath:x,targetPath:r.get(x),layer:w.layer,owningPath:w.owningPath,conflictSourcePath:v,conflictTargetPath:r.get(v),conflictLayer:D.layer,conflictOwningPath:D.owningPath,conflictReason:T}))};for(let[x,v]of[...r].sort(([T],[w])=>T.localeCompare(w))){if(v){let T=y.get(v);if(T!==void 0){g.add(T),g.add(x);let w=m.get(v);w||m.set(v,w=new Set([T])),w.add(x)}else y.set(v,x);r.has(v)&&(g.add(x),g.add(v),S(x,v,0),S(v,x,1));for(let w=Cr(v);w!=="/";w=Cr(w))r.has(w)&&(g.add(x),S(x,w,2))}for(let T=Cr(x);T!=="/"&&Cr(T)!=="/";T=Cr(T))r.has(T)&&(g.add(x),S(x,T,3))}for(let[x,v]of[...m].sort(([T],[w])=>T.localeCompare(w)))t.push(zg({rootSite:{...e,path:""},targetPath:x,sources:[...v].sort().map(T=>({sourcePath:T,...b(T)}))}));P.sort((x,v)=>x.sourcePath.localeCompare(v.sourcePath)||x.conflictReason-v.conflictReason||x.conflictSourcePath.localeCompare(v.conflictSourcePath)),t.push(...P);for(let x of g)r.delete(x)}let c=new Map(r),l=new Map;for(let[y,g]of r)g&&l.set(g,y);let u=l,d=new Map,p=y=>{let g=d.get(y);if(g!==void 0)return g;d.set(y,y);for(let m=y;m!=="/";m=Cr(m)){let P=u.get(m);if(P!==void 0){d.set(y,GT(y,m,p(P)));break}}return d.get(y)},f=new Map,h=new Map;for(let[y,g]of r){if(!g)continue;let m=p(y);f.set(m,g),h.set(g,m)}return{combinedS2T:f,combinedT2S:h,incrementalS2T:c,incrementalT2S:l,primPaths:s}}function Kg(n,e){return n===e||n.startsWith(e+"/")}function OT(n,e){let t=new Map,r=new Set;for(let[i,s]of n.relocatesSourceToTarget)Kg(i,e)&&s&&(t.set(i,s),r.add(s));for(let[i,s]of n.incrementalRelocatesSourceToTarget)Kg(i,e)&&s&&(r.has(s)||(r.add(s),t.set(i,s)));return t.set("/","/"),ne.create(t)}function FT(n){let e=new Map;return t=>{if(!n.hasRelocates)return kr.null();let r=e.get(t);return r||(r=kr.newVariable(OT(n,t)),e.set(t,r)),r.getExpression()}}async function Kd(n,e,t,r){return as(r,"usd-ts:computePcpLayerStack",async i=>(cs(i,"rootLayer",n.filePath),BT(n,e,t,r,i)))}async function BT(n,e,t,r,i){let s=n.getField("/","expressionVariables")??{},o=t?t.getField("/","expressionVariables")??{}:{},a={...s,...o},c=t?String(t.getField("/","sessionOwner")??""):"",l=Ud(n,t),u=xe(l,"/"),d=[],p=[],f=Wd(n),h=t?Wd(t):f,g=t!==void 0&&(typeof t.getField("/","timeCodesPerSecond")=="number"||n.getField("/","timeCodesPerSecond")===void 0&&typeof t.getField("/","framesPerSecond")=="number")?h:f;t&&await jd(t,e,{offset:0,scale:g/h},h,new Map,p,a,c,u,d),await jd(n,e,{offset:0,scale:g/f},f,new Map,p,a,c,u,d);let m=jg(r,"usd-ts:computeRelocations",()=>LT(p,u,d),i),P={identifier:l,timeCodesPerSecond:g,layers:p,ownExpressionVariables:a,relocatesSourceToTarget:m.combinedS2T,relocatesTargetToSource:m.combinedT2S,incrementalRelocatesSourceToTarget:m.incrementalS2T,incrementalRelocatesTargetToSource:m.incrementalT2S,pathsToPrimsWithRelocates:m.primPaths,hasRelocates:m.incrementalS2T.size>0,localErrors:d,getExpressionForRelocatesAtPath:void 0},b=FT(P);return P.getExpressionForRelocatesAtPath=b,P}function qd(n,e){return e?{...n,...e}:n}var Io=class{#e=new Map;isEmpty(){return this.#e.size===0}appendDependencyData(e){e.forEachDependency((t,r)=>{this.addDependencies(t,r)})}addDependencies(e,t){let r=[...t];if(r.length===0)return;let i=this.#e.get(e);i||(i=new Set,this.#e.set(e,i));for(let s of r)i.add(s)}forEachDependency(e){for(let[t,r]of this.#e)e(t,r)}getDependenciesForLayerStack(e){return this.#e.get(e)}};function $T(n){return n.stripAllVariantSelections().pathElementCount}var zT=0,Gn=class n{id;arcType;layerStack;path;mapToParent;mapToRoot;parent;children;_origin;siblingNum;namespaceDepth;inert;specContributionRestrictedDepth;culled;elided;propagatedSpecializes;_isDueToAncestor;_hasTransitiveDirectDependency;siblingNumAtOrigin;expressionVars;constructor(e){this.id=zT++,this.arcType=e.arcType,this.layerStack=e.layerStack,this.path=e.path,this.mapToParent=e.mapToParent,this.mapToRoot=e.mapToRoot,this.parent=e.parent,this.children=[],this._origin=e.origin??null,this.siblingNum=e.siblingNum??0,this.siblingNumAtOrigin=e.siblingNumAtOrigin??0,this.namespaceDepth=e.namespaceDepth??0,this.inert=e.inert??!1,this.specContributionRestrictedDepth=0,this.culled=!1,this.elided=!1,this.propagatedSpecializes=!1,this._isDueToAncestor=!1,this._hasTransitiveDirectDependency=!0,this.expressionVars=e.layerStack.ownExpressionVariables}isRootNode(){return this.parent===null}get origin(){return this._origin??this.parent}set origin(e){this._origin=e===this.parent?null:e}get site(){return new ss(this.layerStack,this.path)}get hasSpecs(){return this.layerStack.layers.some(({layer:e})=>e.hasSpec(R(this.path)))}get isInert(){return this.inert}get isCulled(){return this.culled}get isRestricted(){return!1}get permission(){return"Public"}get hasSymmetry(){return!1}getRootNode(){let e=this;for(;e.parent!==null;)e=e.parent;return e}getOriginNode(){return this.origin}getOriginRootNode(){let e=this;for(;e.origin!==e.parent&&e.origin!==null;)e=e.origin;return e}getDepthBelowIntroduction(){return Yt(this)}getPathAtIntroduction(){return _t(this)}getIntroPath(){if(this.parent===null)return V.absoluteRootPath;let e=this.parent.path;for(let t=this.getDepthBelowIntroduction();t>0;t--){for(;e.isPrimVariantSelectionPath();)e=e.getParentPath();e=e.getParentPath()}return e}isDueToAncestor(){return this._isDueToAncestor||this.arcType===6&&this.origin!==this.parent&&this.origin?.isDueToAncestor()===!0}setIsDueToAncestor(e){this._isDueToAncestor=e}hasTransitiveDirectDependency(){if(this._hasTransitiveDirectDependency||this.parent?.parent!==null&&this.parent?.hasTransitiveDirectDependency()===!0)return!0;for(let e=this.parent;e!==null&&e.parent!==null;e=e.parent)if(!e.isDueToAncestor())return!0;return!1}setHasTransitiveDirectDependency(e){this._hasTransitiveDirectDependency=e}hasTransitiveAncestralDependency(){for(let e=this;e!==null;e=e.parent)if(e.isDueToAncestor())return!0;return!1}canContributeSpecs(){return!this.inert&&!this.culled}getSpecContributionRestrictedDepth(){return this.specContributionRestrictedDepth}appendChildName(e){this.path=this.path.appendChild(e);for(let t of this.children)t.appendChildName(e)}appendVariantSelectionToSites(e,t,r){let i=r??this.path;this.path.hasPrefix(i)&&(this.path=this.path.appendVariantSelection(e,t));for(let s of this.children)s.appendVariantSelectionToSites(e,t,i)}clone(e){let t=new Map,r=this._cloneInto(e,t);for(let[i,s]of t)s._origin=i._origin===null?null:t.get(i._origin)??i._origin;return r}_cloneInto(e,t){let r=new n({arcType:this.arcType,layerStack:this.layerStack,path:this.path,mapToParent:this.mapToParent,mapToRoot:this.mapToRoot,parent:e,origin:this._origin,siblingNum:this.siblingNum,namespaceDepth:this.namespaceDepth,siblingNumAtOrigin:this.siblingNumAtOrigin,inert:this.inert});return r.elided=this.elided,r.propagatedSpecializes=this.propagatedSpecializes,r._isDueToAncestor=this._isDueToAncestor,r._hasTransitiveDirectDependency=this._hasTransitiveDirectDependency,r.expressionVars=this.expressionVars,r.specContributionRestrictedDepth=this.specContributionRestrictedDepth,t.set(this,r),r.children=this.children.map(i=>i._cloneInto(r,t)),r}};function Yg(n){let e=t=>{t.setIsDueToAncestor(!0),t.setHasTransitiveDirectDependency(!1);for(let r of t.children)e(r)};for(let t of n.children)e(t)}function us(n){n.elided=!0;for(let e of n.children)us(e)}function Xt(n){return n.origin??n.parent}function ls(n,e){return n.path.pathString===e.path.pathString&&Ze(n.layerStack.identifier)===Ze(e.layerStack.identifier)}function di(n){if(!Qt(n.arcType)||n.parent===null||n.parent.parent!==null)return!1;let e=Xt(n);return e!==null&&ls(n,e)}function Wc(n){if(!Qt(n.arcType))return null;let e=wo(n);for(let t of e.children)if(!(t.arcType<6)&&Xt(t)===n&&di(t))return t;return null}function Kc(n){return Xt(n)}function Zg(n,e){return ls(n,e)}function qg(n){let e=n,t=0;for(;Xt(e)!==e.parent;){let r=Xt(e);if(r===null)break;e=r,t++}return[e,t]}function HT(n,e){let t=(r,i)=>{let s=r;for(;s!==null;){if(s===i)return!0;s=di(s)?Xt(s):s.parent}return!1};return t(n,e)||t(e,n)}function jc(n,e,t){if(n===e)return-1;if(n===t)return 1;for(let r of n.children){let i=jc(r,e,t);if(i!==0)return i}return 0}function wo(n){let e=n;for(;e.parent!==null;)e=e.parent;return e}function Jg(n){let e=n,t=null;if(di(e)){let i=Xt(e);i!==null&&(e=i)}let r=Yt(e);for(;hn(e.arcType)&&Yt(e)===r&&e.parent!==null;)if(t=e,e=e.parent,di(e)){let i=Xt(e);i!==null&&(e=i)}return[e,t]}function ey(n){let e=n;for(;hn(e.arcType);){let[t,r]=Jg(e);if(t===e)break;if(e=t,hn(t.arcType)){let i=_t(t);if(r!==null&&(r.path.pathString===i.pathString||r.path.hasPrefix(i)))break}}return e}function Qg(n){let[e]=Jg(n);for(;e.arcType===3&&e.parent!==null;)e=e.parent;return e.namespaceDepth}function Xg(n,e){if(n===e)return 0;if(n.arcType!==e.arcType)return n.arcType-e.arcType;if(Qt(n.arcType)){let[t,r]=qg(n),[i,s]=qg(e);if(!HT(t,i)){if(n.namespaceDepth>e.namespaceDepth)return-1;if(n.namespaceDepth<e.namespaceDepth)return 1}let o=Xt(n),a=Xt(e),c=o===n.parent,l=a===e.parent;if(o===a){if(!c&&!l){let u=o!==null&&!ls(n,o),d=a!==null&&!ls(e,a);return u&&!d?-1:!u&&d?1:0}}else{if(t!==i)return jc(wo(n),t,i);let u=c?0:Qg(o),d=l?0:Qg(a);if(u<d)return-1;if(d<u)return 1;if(r>s)return-1;if(s>r)return 1;let p=Ze(wo(n).layerStack.identifier),f=Ze(n.layerStack.identifier),h=Ze(e.layerStack.identifier);if(f===p&&h===p&&!c&&!l){let y=o!==null&&!ls(n,o),g=a!==null&&!ls(e,a);if(y&&!g)return-1;if(!y&&g)return 1}return jc(wo(n),o,a)}}else{if(n.namespaceDepth>e.namespaceDepth)return-1;if(n.namespaceDepth<e.namespaceDepth)return 1;let t=Xt(n),r=Xt(e);if(t!==r&&t!==null&&r!==null){let i=jc(wo(n),t,r);if(i<0)return-1;if(i>0)return 1}}return n.siblingNumAtOrigin<e.siblingNumAtOrigin?-1:n.siblingNumAtOrigin>e.siblingNumAtOrigin?1:0}function*ct(n){if(!(n.culled||n.elided)){yield n;for(let e of n.children)yield*ct(e)}}function Qd(n,e,t=n.getRootNode()){if(n.getRootNode()!==e.getRootNode()||n===e)return 0;for(let r of ct(t)){if(r===n)return-1;if(r===e)return 1}return n.id-e.id}function Xd(n){if(n.elided)return n.culled=!0,!1;let e=!n.inert&&n.layerStack.layers.some(({layer:s})=>s.hasSpec(R(n.path))),t=!1;for(let s of n.children)Xd(s)&&(t=!0);let r=n.parent!==null&&Yt(n)===0,i=e||t||r;return n.culled=!i&&n.parent!==null,i}function Dr(n,e){n.mapToRoot=e.compose(n.mapToParent);for(let t of n.children)Dr(t,n.mapToRoot)}function Rr(n,e){let t=new Gn({arcType:e.arcType,layerStack:e.layerStack,path:e.path,mapToParent:e.mapToParent,mapToRoot:n.mapToRoot.compose(e.mapToParent),parent:n,origin:e.origin??null,siblingNum:n.children.length,siblingNumAtOrigin:e.siblingNumAtOrigin??0,namespaceDepth:e.namespaceDepth??0,inert:e.inert??!1});return er(n,t),t}function er(n,e){let t=n.children;if(t.length===0||Xg(e,t[t.length-1])>=0){t.push(e);return}for(let r=0;r<t.length;r++)if(Xg(e,t[r])<0){t.splice(r,0,e);return}t.push(e)}function Yt(n){return n.parent===null?0:$T(n.parent.path)-n.namespaceDepth}function _t(n){let e=n.path;for(let t=Yt(n);t>0;t--){for(;e.isPrimVariantSelectionPath();)e=e.getParentPath();e=e.getParentPath()}return e}function jT(n){let e=n;for(;e.parent!==null;)e=e.parent;return e}function qc(n,e){if(n.parent===null)return[e,n];let t=n,r=e.stripAllVariantSelections(),i=n.mapToRoot.mapSourceToTarget(r);if(!i.isEmpty())t=jT(n),r=i;else for(;t.parent!==null;){let o=t.mapToParent.mapSourceToTarget(r);if(o.isEmpty())break;t=t.parent,r=o}let s=_t(t);return s.containsPrimVariantSelection()&&(r=r.replacePrefix(s.stripAllVariantSelections(),s)),[r,t]}function Yd(n,e,t){let r=n.parent===null?e:n.mapToRoot.mapSourceToTarget(e);return r.isEmpty()?V.emptyPath:t.parent===null?r:t.mapToRoot.mapTargetToSource(r)}function Jd(n){if(typeof n!="object"||n===null||Array.isArray(n))return!1;let e=Object.getPrototypeOf(n);return e===Object.prototype||e===null}function Zd(n){return V.fromString(n.replace(/\/\{/g,"{").replace(/\}\//g,"}"))}function ty(n,e){for(let[t,r]of Object.entries(e)){let i=n[t];Jd(i)&&Jd(r)?ty(i,r):t in n||(n[t]=r)}}var ko=class{constructor(e,t,r,i,s=0,o=null){this.parentNode=e;this.pathInNode=t;this.composedFieldNames=r;this.composedAttributeNames=i;this.arcNum=s;this.previousFrame=o}futurePayloadIsStrongerThan(e){return 5!==e.arcType?5<e.arcType:this.parentNode.namespaceDepth!==e.namespaceDepth?this.parentNode.namespaceDepth>e.namespaceDepth:this.arcNum<e.siblingNumAtOrigin}composeInSubtree(e,t,r,i,s,o){let a=r===void 0?R(t):`${R(t)}.${r}`,c=!1;for(let{layer:l}of e.layerStack.layers){let u=l.getField(a,i);if(u===void 0)continue;let d=p=>{let f=p.getAuthoredPath(),h=p.getEvaluatedPath();if(!h&&Lt(f)){let g=Rn(f,e.expressionVars);typeof g.value=="string"&&(h=g.value)}let y=h||p.getAssetPath();return new Pt({authoredPath:f,evaluatedPath:h,resolvedPath:y?l.resolveAsset(y):""})};if(u instanceof Pt?u=d(u):Array.isArray(u)&&u.every(p=>p instanceof Pt)&&(u=u.map(d)),o(u),c=!0,s)return!0}for(let l of e.children){if(l.inert||l.culled||l.elided)continue;if(e===this.parentNode&&this.futurePayloadIsStrongerThan(l))return c;let u=l.mapToParent.mapTargetToSource(t.stripAllVariantSelections());if(u.isEmpty())continue;let d=_t(l);d.containsPrimVariantSelection()&&(u=u.replacePrefix(d.stripAllVariantSelections(),d));let p=this.composeInSubtree(l,u,r,i,s,o);if(c||=p,s&&p)return!0}return c}composeFromAncestors(e,t,r,i,s,o,a){let[c,l]=qc(e,t),u=!1;if(l.parent===null&&r!==null){let d=r.mapToParent.mapSourceToTarget(c.stripAllVariantSelections());if(!d.isEmpty()&&(u=this.composeFromAncestors(r.parentNode,d,r.previousFrame,i,s,o,a),o&&u))return!0}return this.composeInSubtree(l,c,i,s,o,a)||u}composeValue(e){this.composedFieldNames.add(e);let t,r;return this.composeFromAncestors(this.parentNode,Zd(this.pathInNode),this.previousFrame,void 0,e,!1,i=>{Jd(i)?(r??={},ty(r,i)):t===void 0&&(t=i)}),r??t}composeValueStack(e){this.composedFieldNames.add(e);let t=[];return this.composeFromAncestors(this.parentNode,Zd(this.pathInNode),this.previousFrame,void 0,e,!1,r=>t.push(r)),t}composeAttributeDefaultValue(e){this.composedAttributeNames.add(e);let t;return this.composeFromAncestors(this.parentNode,Zd(this.pathInNode),this.previousFrame,e,"default",!0,r=>{t=r}),t}};var pi=class{dependencyContexts=[];relevantFieldNames=new Set;relevantAttributeNames=new Set;constructor(e){e&&this.appendDependencyData(e)}isEmpty(){return this.dependencyContexts.length===0}addDependencyContext(e,t,r,i){this.dependencyContexts.push({fileFormat:e,dependencyContextData:t});for(let s of r)this.relevantFieldNames.add(s);for(let s of i)this.relevantAttributeNames.add(s)}appendDependencyData(e){for(let t of e.dependencyContexts)this.dependencyContexts.push(t);for(let t of e.relevantFieldNames)this.relevantFieldNames.add(t);for(let t of e.relevantAttributeNames)this.relevantAttributeNames.add(t)}getRelevantFieldNames(){return this.relevantFieldNames}getRelevantAttributeNames(){return this.relevantAttributeNames}canFieldChangeAffectFileFormatArguments(e,t,r){return this.relevantFieldNames.has(e)?this.dependencyContexts.some(({fileFormat:i,dependencyContextData:s})=>{let o=i.canFieldChangeAffectFileFormatArguments;return o===void 0||o.call(i,e,t,r,s)}):!1}canAttributeDefaultValueChangeAffectFileFormatArguments(e,t,r){return this.relevantAttributeNames.has(e)?this.dependencyContexts.some(({fileFormat:i,dependencyContextData:s})=>{let o=i.canAttributeDefaultValueChangeAffectFileFormatArguments;return o===void 0||o.call(i,e,t,r,s)}):!1}};function WT(n){let e=i=>({assetPath:i.assetPath??"",primPath:i.primPath??"",layerOffset:i.layerOffset??At}),t=Fe(n)??{isExplicit:!0,explicitItems:[n],deletedItems:[],prependedItems:[],appendedItems:[],orderedItems:[]},r=i=>i.map(e);return{isExplicit:t.isExplicit,explicitItems:r(t.explicitItems),deletedItems:r(t.deletedItems),prependedItems:r(t.prependedItems),appendedItems:r(t.appendedItems),orderedItems:r(t.orderedItems)}}var ep=n=>`${n._resolvedAssetPath??n.assetPath}|${n.primPath}|${n.layerOffset.offset}|${n.layerOffset.scale}`;function ny(n,e,t,r,i){let s=c=>{if(!Lt(c))return c;let l=Rn(c,r);for(let u of l.usedVariables)i?.add(u);return typeof l.value=="string"?l.value:c},o=[],a=new Map;for(let c=n.layers.length-1;c>=0;c--){let l=n.layers[c],u=l.layer,d=u.getField(e,t);if(d==null)continue;let p=g=>{if(!g.assetPath)return g;let m=s(g.assetPath);return{...g,assetPath:m,_resolvedAssetPath:u.resolveAsset(m)}},f=g=>(a.set(ep(g),l),g),h=WT(d),y={isExplicit:h.isExplicit,explicitItems:h.explicitItems.map(p).map(f),prependedItems:h.prependedItems.map(p).map(f),appendedItems:h.appendedItems.map(p).map(f),deletedItems:h.deletedItems.map(p),orderedItems:h.orderedItems.map(p)};o=Tt(o,y,{key:ep})}return o.map(c=>{let l=a.get(ep(c));return l?c.assetPath?{...c,layerOffset:Be(l.offset,c.layerOffset),sourceLayer:l.layer}:{...c,sourceLayer:l.layer}:c})}function tp(n,e,t={},r){return ny(n,e,"references",t,r)}function Er(n,e,t={},r){return ny(n,e,"payload",t,r)}function ry(n,e,t){let r=o=>{if(o.startsWith("/"))return o;let a=e.split("/").filter(Boolean);for(let c of o.split("/"))if(!(!c||c==="."))if(c===".."){if(a.length===0)return"";a.pop()}else a.push(c);return`/${a.join("/")}`},i=o=>Array.isArray(o)?o.filter(a=>typeof a=="string").map(r):[],s=[];for(let o=n.layers.length-1;o>=0;o--){let a=n.layers[o].layer.getField(e,t);if(a==null)continue;let c=Fe(a);c&&(s=Tt(s,{...c,explicitItems:i(c.explicitItems),deletedItems:i(c.deletedItems),prependedItems:i(c.prependedItems),appendedItems:i(c.appendedItems),orderedItems:i(c.orderedItems)}))}return s}function np(n,e){return ry(n,e,"inheritPaths")}function rp(n,e){return ry(n,e,"specializes")}function Qc(n,e){let t=[];for(let i=n.layers.length-1;i>=0;i--){let s=n.layers[i].layer.getField(e,"variantSetNames");if(s==null)continue;let o=Fe(s);o&&(t=Tt(t,o))}let r=new Set(t);for(let{layer:i}of n.layers){let s=i.getField(e,"variantSetChildren");for(let o of s??[])r.has(o)||(r.add(o),t.push(o))}return t}function ip(n,e,t){let r=new Set;for(let{layer:i}of n.layers){let s=i.getField(`${e}{${t}=}`,"variantChildren");if(s)for(let o of s)r.add(o)}return r}function iy(n,e,t,r,i,s="/",o){if(!Lt(n))return n;let a=Rn(n,e);for(let c of a.usedVariables)o?.add(c);return a.errors.length>0&&t&&r&&i&&t.push(Hc({rootSite:{...r,path:""},expression:n,expressionError:a.errors.join("; "),context:"variant",sourceLayer:i,sourcePath:s})),a.errors.length===0&&typeof a.value=="string"?a.value:void 0}function sp(n,e,t,r={},i,s,o){for(let{layer:a}of n.layers){let l=a.getField(e,"variantSelection")?.[t]?.[0];if(l===void 0)continue;let u=iy(l,r,i,s,a,e,o);if(u!==void 0)return u}}function sy(n,e,t={}){let r={};for(let{layer:i}of n.layers){let s=i.getField(e,"variantSelection");if(s)for(let[o,a]of Object.entries(s)){if(o in r||a?.[0]===void 0)continue;let c=iy(a[0],t);c!==void 0&&(r[o]=c)}}return r}function op(n,e,t=[]){let r=new Set(t),i=[...t];for(let s=n.layers.length-1;s>=0;s--){let{layer:o}=n.layers[s],a=o.getField(e,"primChildren");if(a)for(let l of a)r.has(l)||(r.add(l),i.push(l));let c=o.getField(e,"primOrder");if(c?.length){let l=pc(i,c);i.splice(0,i.length,...l)}}return i}function Nr(n,e){for(let{layer:t}of n.layers)if(t.hasSpec(e))return!0;return!1}function oy(n){if(!n.inert)return!0;if(n.arcType===6){if(n.parent!==n.getRootNode()||n.origin!==n.parent)return!1}else if(n.arcType===1&&n.origin!==n.parent)return!1;return!0}function ap(n){if(n.arcType===0)return 1;let e=0;if(n.inert){if(!oy(n))return 0;e|=16}let t=n.hasTransitiveDirectDependency(),r=n.hasTransitiveAncestralDependency();return t?e|=r?4:2:r&&(e|=8),(e&16)===0&&(e|=32),e}function cp(n){let e=[];return n===0&&e.push("none"),n===1&&e.push("root"),n&2&&e.push("purely-direct"),n&4&&e.push("partly-direct"),n&8&&e.push("ancestral"),n&16&&e.push("virtual"),n&32&&e.push("non-virtual"),e.sort().join(", ")}var KT={0:"root",1:"inherit",2:"variant",3:"relocate",4:"reference",5:"payload",6:"specialize"};function ds(n){return n?"TRUE":"FALSE"}function qT(n){let e=n.replaceAll("\\","/");return e.slice(e.lastIndexOf("/")+1)}function QT(n){let e=[],t=n.getTimeOffset();(t.offset!==0||t.scale!==1)&&e.push(`SdfLayerOffset(offset = ${t.offset}; scale = ${t.scale})`);for(let[r,i]of n.getSourceToTargetMap())e.push(`${r} -> ${i}`);return e.join(`
`)}function ay(n){return QT(n).replaceAll(`
`,`
        `)}function cy(n,e=!0,t=!0){if(!n.isValid())return"";let r=[],i=a=>{if(!(a.elided||a.culled&&!a.hasSpecs)){r.push(a);for(let c of a.children)i(c)}};i(n.rootNode);let s=new Map(r.map((a,c)=>[a,c])),o=a=>{let c=a.parent,l=`Node ${s.get(a)??0}:
`;l+=`    Parent node:              ${c?s.get(c):"NONE"}
`,l+=`    Type:                     ${KT[a.arcType]}
`,l+=`    DependencyType:           ${cp(ap(a))}
`,l+=`    Source path:              <${a.path.pathString}>
`,l+=`    Source layer stack:       ${Ic(a.layerStack.identifier)}
`,l+=`    Target path:              <${c?c.path.pathString:"NONE"}>
`,l+=`    Target layer stack:       ${c?Ic(c.layerStack.identifier):"NONE"}
`,a.origin!==c&&(l+=`    Origin node:              ${a.origin?s.get(a.origin):0}
`,l+=`    Sibling # at origin:      ${a.siblingNumAtOrigin}
`),t&&(l+=`    Map to parent:
        ${ay(a.mapToParent)}
`,l+=`    Map to root:
        ${ay(a.mapToRoot)}
`),l+=`    Namespace depth:          ${a.namespaceDepth}
`,l+=`    Depth below introduction: ${a.getDepthBelowIntroduction()}
`,l+=`    Is due to ancestor:       ${ds(a.isDueToAncestor())}
`,l+=`    Permission:               ${a.permission}
`,l+=`    Is restricted:            ${ds(a.isRestricted)}
`,l+=`    Is inert:                 ${ds(a.isInert)}
`,l+=`    Contribute specs:         ${ds(a.canContributeSpecs())}
`;let u=a.getSpecContributionRestrictedDepth()||(a.isInert?a.namespaceDepth:0);if(l+=`        Restricted at depth:  ${u}
`,l+=`    Has specs:                ${ds(a.hasSpecs)}
`,l+=`    Has symmetry:             ${ds(a.hasSymmetry)}
`,a.hasSpecs&&a.canContributeSpecs()){l+=`    Prim stack:
`;for(let{layer:d}of a.layerStack.layers)d.hasSpec(R(a.path))&&(l+=`      <${a.path.pathString}> ${qT(d.filePath)} - @${d.filePath}@
`)}for(let d of a.children)s.has(d)&&(l+=o(d));return l+=`
`,l};return`${o(n.rootNode)}
`}function ps(n){return n.hasTransitiveDirectDependency()&&!n.inert&&!n.culled&&Nr(n.layerStack,R(n.path))}function*XT(n){yield[n,!1];function*e(t){if(t.culled)return;let r=ps(t);yield[t,r];for(let i of t.children)yield*e(i)}for(let t of n.children)yield*e(t)}function fs(n){let e=!1;for(let[,t]of XT(n))if(t){e=!0;break}if(!e)return!1;for(let t of ct(n))if(!(t.inert||t.culled))for(let{layer:r}of t.layerStack.layers){let i=r.getField(R(t.path),"instanceable");if(i!==void 0)return i===!0}return!1}function ly(n){let e=(t,r)=>{if(!t.culled&&!(!r&&ps(t))){t.inert=!0;for(let i of t.children)e(i,!1)}};e(n,!0)}function uy(n){return typeof n=="object"&&n!==null&&typeof n.composeFieldsForFileFormatArguments=="function"}function Co(n){for(let e=n;e!==null;e=e.previousFrame)if(e.skipDuplicateNodes)return!0;return!1}function It(n){return Ze(n.identifier)}function tr(n){let e=n;for(;e.parent!==null;)e=e.parent;return e}function up(n,e){return e.isAbsoluteRootPath()?!0:n.pathString===e.pathString||n.hasPrefix(e)}function dp(n,e,t){return e.isAbsoluteRootPath()&&t.isAbsoluteRootPath()?n:n.replacePrefix(e,t)}function lp(n,e){return`${n}::${e.pathString}`}function YT(n){return lp(It(n.layerStack),n.path)}var Xc=class extends Set{constructor(t){super();this.outputs=t}sitesByGraph=new Map;registerSubtree(t,r=t){let i=this.sitesByGraph.get(t);i||(i=new Map,this.sitesByGraph.set(t,i));let s=YT(r),o=i.get(s);o||(o=new Set,i.set(s,o)),o.add(r);for(let a of r.children)this.registerSubtree(t,a)}hasSite(t,r,i){return(this.sitesByGraph.get(t)?.get(lp(r,i))?.size??0)>0}hasContributingSite(t,r,i){return[...this.sitesByGraph.get(t)?.get(lp(r,i))??[]].some(s=>!s.inert&&!s.culled&&!s.elided)}rejectDuplicateArc(t,r,i,s){let o=i,a=t,c=s;for(;a!==null;){let l=tr(a);if(this.hasContributingSite(l,r,o))return!0;if(c===null)break;o=dp(c.requestedPath,l.path,o),a=c.parentNode,c=c.previousFrame}return!1}};var Ln=class n{primIndex=new Ro;allErrors=[];dynamicFileFormatDependency=new pi;expressionVariablesDependency=new Io;culledDependencies=[];payloadState=n.PayloadState.NoPayload;setPayloadState(e){this.payloadState===n.PayloadState.NoPayload&&(this.payloadState=e)}};function dy(n,e){return`${n.id}:${e}`}function JT(n){return n===7||n===6||n===14||n===15||n===16||n===9||n===10||n===11}function py(n,e){for(let t=e.parent;t!==null;t=t.parent)if(t===n)return!0;return!1}function eA(n,e,t){if(n.type!==e.type)return n.type-e.type;if(n.node===e.node)return 0;if(n.type===7){if(py(n.node,e.node))return 1;if(py(e.node,n.node))return-1}let r=t(n.node,e.node);return r!==0?r:n.node.id-e.node.id}var fp=class n{tasks=[];done=new Set;cmp;root;processed=0;static MAX_TASKS=2e6;constructor(e,t){this.root=e,this.cmp=t}add(e,t){let r=dy(e,t);return this.done.has(r)&&!JT(t)||this.tasks.some(i=>i.node===e&&i.type===t)?!1:(this.tasks.push({type:t,node:e}),!0)}addTasksForNode(e){!e.inert&&!e.culled&&(this.add(e,0),this.add(e,2),this.add(e,3),this.add(e,17),this.add(e,12),this.add(e,4),this.add(e,5),this.add(e,14),this.add(e,9)),this.add(e,1),this.armPostStructuralTasks()}armPostStructuralTasks(){this.add(this.root,6)}addTasksForSubtree(e){this.addTasksForNode(e);for(let t of e.children)this.addTasksForSubtree(t)}retryVariantTasks(){for(let e of this.tasks)e.type===16?this.add(e.node,14):e.type===11&&this.add(e.node,9)}armVariantsForGraph(e){this.add(e,14),this.add(e,9);for(let t of e.children)this.armVariantsForGraph(t)}pop(){if(this.tasks.length===0)return null;if(++this.processed>n.MAX_TASKS)throw new Error("PcpTaskQueue exceeded task cap \u2014 a task is being re-issued (non-terminating build).");let e=0;for(let r=1;r<this.tasks.length;r++)eA(this.tasks[r],this.tasks[e],this.cmp)<0&&(e=r);let[t]=this.tasks.splice(e,1);return this.done.add(dy(t.node,t.type)),t}},ms=V.absoluteRootPath;function tA(n){let e=n;for(;!e.isEmpty();){if(e.isPrimVariantSelectionPath())return e.getVariantSelection();e=e.getParentPath()}return null}var nA=new Set([0,2,3,4,5]);function fy(n,e,t,r=null){let i=t,s=n,o=r;for(;s!==null;){for(let c=s;c!==null;c=c.parent)if(It(c.layerStack)===e&&(up(c.path,i)||up(i,c.path)))return!0;if(o===null)break;let a=tr(s).path;i=dp(o.requestedPath,a,i),s=o.parentNode,o=o.previousFrame}return!1}function Mn(n){return xe(n.layerStack.identifier,n.path.pathString)}function hy(n,e,t,r,i){let s=[],o=n,a=e;for(;o!==null;){let c=o.arcType!==0?o.arcType:a!==null?a.arcType:o.arcType;s.push({site:xe(o.layerStack.identifier,o.path.pathString),arcType:c}),o.parent!==null?o=o.parent:a!==null?(o=a.parentNode,a=a.previousFrame):o=null}return s.reverse(),s.push({site:xe(r.identifier,i.pathString),arcType:t}),Gg(s)}function pp(n){for(let e of ct(n))if(!(e.inert||!e.layerStack.hasRelocates)&&e.layerStack.incrementalRelocatesSourceToTarget.has(e.path.pathString))return!0;return!1}function rA(n){for(let e of ct(n))if(!e.inert&&e.layerStack.hasRelocates&&e.layerStack.incrementalRelocatesSourceToTarget.has(e.path.pathString))return e}function iA(n){return n.layerStack.hasRelocates&&n.layerStack.incrementalRelocatesSourceToTarget.has(n.path.pathString)}function hs(n){let e=n.getParentPath();return e.isEmpty()?ms:e}function sA(n){return n.name}function Te(n){return n.stripAllVariantSelections().pathElementCount}function my(n,e,t){let r=t.stripAllVariantSelections(),i=e.layerStack.getExpressionForRelocatesAtPath(r.pathString);return i.isNull()?n:i.evaluate().compose(n)}function oA(n,e){if(n.arcType!==2)return e;let t=_t(n),r=t.stripAllVariantSelections();return e.replacePrefix(r,t)}function aA(n,e,t){let r=e.stripAllVariantSelections();for(let i of ct(n)){if(i.arcType!==2)continue;let s=_t(i),o=tA(s);if(!o||o[0]!==t)continue;let a=i===n?r:Yd(n,r,i);if(!a.isEmpty()&&s.stripAllVariantSelections().pathString===a.stripAllVariantSelections().pathString)return o[1]}}function cA(n,e,t,r,i,s){let o=e.stripAllVariantSelections();for(let a of ct(n)){let c=a===n?o:Yd(n,o,a);if(c.isEmpty())continue;c=c.stripAllVariantSelections();let l=new Set,u=sp(a.layerStack,R(oA(a,c)),t,a.expressionVars,r,i,l);if(s.expressionVariablesDependency.addDependencies(a.layerStack,l),u!==void 0)return u}}function gy(n,e,t,r,i,s){let[o,a]=qc(n,e);if(o.isEmpty())return;let c=aA(a,o,t);return c!==void 0?c:cA(a,o,t,r,i,s)}var Do=class n{constructor(e,t,r,i,s){this.payloadIncluded=r;this.payloadInclusionSource=i;this.traceContext=s;this.rootLayerStack=e,this.opener=t,this.layerStackRegistry.set(Ze(e.identifier),e)}opener;rootLayerStack;layerStackRegistry=new Map;static async create(e,t,r,i=()=>!0,s="includeSet",o={current:void 0}){let a=await Kd(e,t,r,o);return new n(a,t,i,s,o)}getLayerStack(){return this.rootLayerStack}variantFallbacks={};setVariantFallbacks(e){this.variantFallbacks=e,this.treeCache.clear(),this.treeErrors.clear()}invalidateBuildState(){this.treeCache.clear(),this.treeErrors.clear()}getVariantFallbacks(){return this.variantFallbacks}async layerStackFor(e){let t=Ze({rootLayer:e}),r=this.layerStackRegistry.get(t);if(r)return r;let i=await Kd(e,this.opener,void 0,this.traceContext);return this.layerStackRegistry.set(t,i),i}async buildPrimIndex(e,t=this.traceContext.current){return as(this.traceContext,"usd-ts:PcpPrimIndexer.buildPrimIndex",async r=>(cs(r,"primPath",e),this._buildPrimIndex(e)),t)}async _buildPrimIndex(e){let t=V.fromString(e),r=new Ln,s=(await this.buildNodeTree(this.rootLayerStack,t,new Xc(r))).clone(null);Xd(s);let o=a=>{if(a.culled&&!a.isRootNode()){let c=V.emptyPath;if(a.arcType===3){let l=a.parent;for(;l?.arcType===3;)l=l.parent;c=l?.path??V.emptyPath}r.culledDependencies.push({arcType:a.arcType,layerStack:a.layerStack,sitePath:a.path,unrelocatedSitePath:c,mapToRoot:a.mapToRoot})}for(let c of a.children)o(c)};if(o(s),pp(s)){s.inert=!0;for(let a of s.children)us(a)}return r.primIndex=new Ro(s,e,r.allErrors),r}treeCache=new Map;treeErrors=new Map;refSourceLayers=new WeakMap;async buildNodeTree(e,t,r,i=null){let s=r.outputs,o=`${It(e)}::${t.pathString}`;if(i===null){let h=this.treeCache.get(o);if(h)return s.allErrors.push(...this.treeErrors.get(o)??[]),h}if(r.has(o))return new Gn({arcType:0,layerStack:e,path:t,mapToParent:ne.identity(),mapToRoot:ne.identity(),parent:null});r.add(o);let a=s.allErrors.length,c;if(t.isAbsoluteRootPath()||t.isPrimVariantSelectionPath())c=new Gn({arcType:0,layerStack:e,path:t,mapToParent:ne.identity(),mapToRoot:ne.identity(),parent:null});else{let h=s.allErrors.length,y=await this.buildNodeTree(e,hs(t),r,i);if(i===null){let m=s.allErrors.splice(h);s.allErrors.push(...m.filter(P=>P.errorType!==0&&P.errorType!==24))}let g=fs(y);c=y.clone(null),g&&ly(c),c.appendChildName(sA(t)),Yg(c)}i!==null&&i.directNodeShouldContributeSpecs===!1&&i.requestedPath.pathString===t.pathString&&(c.inert=!0,c.specContributionRestrictedDepth=Te(t));let l=i!==null&&i.arcType!==3&&iA(c);if(!t.isPrimVariantSelectionPath()&&(l||pp(c))){let h=i!==null?rA(c):void 0;i!==null&&h&&!c.path.containsPrimVariantSelection()&&!h.path.containsPrimVariantSelection()&&s.allErrors.push(zc({rootSite:Mn(tr(i.parentNode)),site:xe(i.parentNode.layerStack.identifier,i.parentNode.path.pathString),targetSite:xe(c.layerStack.identifier,i.requestedPath.pathString),relocationSourceSite:xe(h.layerStack.identifier,h.path.pathString),arcType:i.arcType})),c.inert=!0;for(let y of c.children)us(y);return r.delete(o),i===null&&(this.treeCache.set(o,c),this.treeErrors.set(o,s.allErrors.slice(a))),c}r.registerSubtree(c);let u=new fp(c,(h,y)=>Qd(h,y,c));u.addTasksForSubtree(c);let d=[],p=[],f=u.pop();for(;f!==null;){let h=f.node;if(!h.elided){switch(f.type){case 0:await this.evalRelocations(h,c,r,i,p);break;case 1:this.evalImpliedRelocations(h,u,r);break;case 2:await this.evalRefOrPayload(h,4,d,r,i,c,p);break;case 3:await this.evalRefOrPayload(h,5,d,r,i,c,p,"static");break;case 4:await this.evalClassArc(h,c,1,r,i,p);break;case 5:await this.evalClassArc(h,c,6,r,i,p);break;case 14:if(i===null){let y=this.evalVariants(h,d,r,!1);y.added&&(u.armPostStructuralTasks(),u.armVariantsForGraph(c)),y.unresolved&&u.add(h,15)}break;case 9:if(i===null){let y=await this.evalAncestralVariants(h,c,r,i,p,!1);y.added&&(u.armPostStructuralTasks(),u.armVariantsForGraph(c)),y.unresolved&&u.add(h,10)}break;case 15:i===null&&this.evalVariants(h,d,r,!0).added&&(u.armPostStructuralTasks(),u.armVariantsForGraph(c));break;case 10:i===null&&(await this.evalAncestralVariants(h,c,r,i,p,!0)).added&&(u.armPostStructuralTasks(),u.armVariantsForGraph(c));break;case 17:await this.evalRefOrPayload(h,5,d,r,i,c,p,"dynamic");break;case 12:await this.evalAncestralDynamicPayloads(h,d,r,i,c,p);break;case 6:i===null&&await this.evalImpliedSpecializes(c,c,r,i,u)&&(u.armPostStructuralTasks(),u.armVariantsForGraph(c));break;case 7:await this.evalImpliedClassesAtNode(h,c,r,i,u)&&(u.armPostStructuralTasks(),u.armVariantsForGraph(c));break;case 16:case 11:break;case 18:this.evalUnresolvedPrimPathError(h,c,s);break}for(let y of d)u.addTasksForNode(y),this.armImpliedClassTasks(y,u),i===null&&(y.arcType===4||y.arcType===5)&&u.add(y,18);d.length=0;for(let y of p)if(y.arcType===3&&u.add(y,1),this.armImpliedClassTasks(y,u),i===null)for(let g of ct(y))(g.arcType===4||g.arcType===5)&&u.add(g,18);p.length=0,i===null&&nA.has(f.type)&&u.armVariantsForGraph(c)}f=u.pop()}if(!t.isPrimVariantSelectionPath()&&pp(c)){c.inert=!0;for(let h of c.children)us(h)}return r.delete(o),i===null&&(this.treeCache.set(o,c),this.treeErrors.set(o,s.allErrors.slice(a))),c}async evalImpliedSpecializes(e,t,r,i,s){return this.findSpecializesToPropagateToRoot(e,t,r,i,s)}async findSpecializesToPropagateToRoot(e,t,r,i,s){let o=!1;if(this.isRelocatesPlaceholderImpliedArc(e))return!1;Qt(e.arcType)&&!di(e)&&await this.propagateNodeToRoot(e,t,r,i,s)&&(o=!0);for(let a of[...e.children])await this.findSpecializesToPropagateToRoot(a,t,r,i,s)&&(o=!0);return o}isRelocatesPlaceholderImpliedArc(e){let t=e.parent;return t===null?!1:Kc(e)!==t&&t.arcType===3&&Zg(e,t)}async propagateNodeToRoot(e,t,r,i,s){let o=It(e.layerStack);if(t.children.find(d=>d.arcType===6&&d.path.pathString===e.path.pathString&&It(d.layerStack)===o)||r.rejectDuplicateArc(t,o,e.path,i))return!1;let c=Te(e.path)>1,l=e.mapToRoot,u;if(c){let d={previousFrame:i,requestedPath:e.path,parentNode:t,mapToParent:l,arcType:6,skipDuplicateNodes:!0};u=(await this.buildNodeTree(e.layerStack,e.path,r,d)).clone(t),u.arcType=6,u.mapToParent=l,u.origin=e,u.siblingNumAtOrigin=e.siblingNumAtOrigin,u.namespaceDepth=Te(t.path),u.inert=!1,u.propagatedSpecializes=!0,Dr(u,t.mapToRoot),er(t,u),r.registerSubtree(t,u),this.armImpliedClassTasks(u,s)}else u=new Gn({arcType:6,layerStack:e.layerStack,path:e.path,mapToParent:l,mapToRoot:t.mapToRoot.compose(l),parent:t,origin:e,siblingNumAtOrigin:e.siblingNumAtOrigin,namespaceDepth:Te(t.path),inert:!1}),u.propagatedSpecializes=!0,er(t,u),r.registerSubtree(t,u),await this.evalNodeArcs(u,t,r,i,s),this.armImpliedClassTasks(u,s);return!0}async evalImpliedClassesAtNode(e,t,r,i,s){if(e.parent===null||di(e)||!this.nodeIsInGraph(e,t)||!this.hasClassBasedChild(e))return!1;let o=e.mapToParent.addRootIdentity();return this.evalImpliedClassTree(e.parent,e,o,!0,t,r,i,s)}nodeIsInGraph(e,t){let r=e;for(;r.parent!==null;){if(!r.parent.children.includes(r))return!1;r=r.parent}return r===t}armImpliedClassTasks(e,t){hn(e.arcType)?t.add(ey(e),7):this.hasClassBasedChild(e)&&t.add(e,7)}hasClassBasedChild(e){return(Wc(e)??e).children.some(r=>hn(r.arcType))}async evalImpliedClassTree(e,t,r,i,s,o,a,c){if(e.arcType===3){let d=e.mapToParent.addRootIdentity().compose(r);return c.add(e,7),e.parent===null?!1:await this.evalImpliedClassTree(e.parent,t,d,i,s,o,a,c)}let l=Wc(t)??t,u=!1;for(let d of[...l.children]){if(!hn(d.arcType)||i&&hn(t.arcType)&&Yt(t)===Yt(d))continue;let p=ne.impliedClass(r,d.mapToParent),f=p.mapTargetToSource(e.path),h=e.children.find(y=>!y.propagatedSpecializes&&Kc(y)===d)??null;if(h===null&&!f.isEmpty()&&(h=await this.addClassBasedArc(d.arcType,e,d,p,d.siblingNumAtOrigin,d,s,o,a,c),h!==null&&(u=!0)),h!==null&&this.hasClassBasedChild(d)){let y=Wc(h)??h;await this.evalImpliedClassTree(y,d,r,!1,s,o,a,c)&&(u=!0)}}return u}async addClassBasedArc(e,t,r,i,s,o,a,c,l,u){let d=i.mapTargetToSource(t.path);if(d.isEmpty())return null;let p=It(t.layerStack),f=It(o.layerStack),h=d.pathString===o.path.pathString&&p===f,g=(t.parent===null&&l!==null?l.arcType:t.arcType)===3?t.children.find(x=>x.arcType===e&&x.mapToParent.equals(i)&&Yt(Kc(x)??x)===Yt(r)):t.children.find(x=>x.path.pathString===d.pathString&&It(x.layerStack)===p);if(g)return Qt(e)&&t.parent===null&&l===null?null:g;if(Qt(e)&&(t.parent!==null||l!==null)){let v=Rr(t,{arcType:e,layerStack:t.layerStack,path:d,mapToParent:i,origin:r,siblingNumAtOrigin:s,namespaceDepth:Te(t.path),inert:!0});return c.registerSubtree(a,v),l===null&&!this.isRelocatesPlaceholderImpliedArc(v)&&(await this.propagateNodeToRoot(v,a,c,l,u)||this.armImpliedClassTasks(v,u)),v}let m=d.pathString!==t.path.pathString&&!h;if((m||Co(l))&&c.rejectDuplicateArc(t,p,d,l))return null;let b=m&&!t.inert,S;if(b&&Te(d)>1){let x={previousFrame:l,requestedPath:d,parentNode:t,mapToParent:i,arcType:e,skipDuplicateNodes:!0};S=(await this.buildNodeTree(t.layerStack,d,c,x)).clone(t),S.arcType=e,S.mapToParent=i,S.origin=r,S.siblingNumAtOrigin=s,S.namespaceDepth=Te(t.path),S.inert=!1,Dr(S,t.mapToRoot),er(t,S),c.registerSubtree(a,S)}else S=Rr(t,{arcType:e,layerStack:t.layerStack,path:d,mapToParent:i,origin:r,siblingNumAtOrigin:s,namespaceDepth:Te(t.path),inert:!b}),b||(S.specContributionRestrictedDepth=1),c.registerSubtree(a,S),b&&await this.evalNodeArcs(S,a,c,l,u);return this.armImpliedClassTasks(S,u),S}async evalNodeArcs(e,t,r,i,s){let o=[e],a=[];for(;o.length>0;){let c=o.shift();await this.evalRelocations(c,t,r,i,a),await this.evalRefOrPayload(c,4,o,r,i,t,a),await this.evalRefOrPayload(c,5,o,r,i,t,a),await this.evalClassArc(c,t,1,r,i,a),await this.evalClassArc(c,t,6,r,i,a);for(let l of a)this.armImpliedClassTasks(l,s);a.length=0}}async evalRelocations(e,t,r,i,s){let o=e.layerStack;if(!o.hasRelocates)return;let a=o.incrementalRelocatesTargetToSource.get(e.path.pathString);if(a===void 0||a===e.path.pathString)return;let c=V.fromString(a);for(let p of e.children)p.arcType!==2&&us(p);let l={previousFrame:i,requestedPath:c,parentNode:e,mapToParent:ne.identity(),arcType:3,skipDuplicateNodes:!1,directNodeShouldContributeSpecs:!1},u=(await this.buildNodeTree(o,c,r,l)).clone(e);u.arcType=3,u.mapToParent=ne.identity(),u.origin=e,u.namespaceDepth=Te(e.path),u.inert=!0,Dr(u,e.mapToRoot),er(e,u),r.registerSubtree(t,u),s.push(u);let d=R(c);for(let{layer:p}of o.layers)if(p.hasSpec(d)){let f=i!==null&&i.requestedPath.pathString===e.path.pathString&&Te(e.path)===1?tr(i.parentNode):tr(e);r.outputs.allErrors.push(Hg({rootSite:Mn(f),layer:p,path:a}))}}evalImpliedRelocations(e,t,r){if(e.arcType!==3||e.isDueToAncestor())return;let i=e.parent;if(i===null)return;let s=i.parent;if(s===null)return;let o=i.mapToParent.mapSourceToTarget(e.path);if(o.isEmpty()||s.children.some(c=>c.arcType===3&&c.path.pathString===o.pathString))return;let a=Rr(s,{arcType:3,layerStack:s.layerStack,path:o,mapToParent:ne.identity(),origin:e,namespaceDepth:Te(s.path),inert:!0});r.registerSubtree(tr(s),a),t.addTasksForNode(a)}async evalClassArc(e,t,r,i,s,o){let a=r===1?np(e.layerStack,R(e.path)):rp(e.layerStack,R(e.path));if(a.length!==0)for(let c=0;c<a.length;c++){let l=a[c],u=l.startsWith("/")?V.fromString(l):e.path.appendChild(l);if(!u.isPrimPath()||u.containsPrimVariantSelection()){i.outputs.allErrors.push(Hd({rootSite:Mn(t),site:xe(e.layerStack.identifier,e.path.pathString),primPath:l,sourceLayer:void 0,arcType:r}));continue}if(fy(e,It(e.layerStack),u,s)){i.outputs.allErrors.push(hy(e,s,r,e.layerStack,u));continue}if(e.layerStack.hasRelocates&&e.layerStack.incrementalRelocatesSourceToTarget.has(u.pathString)){t.path.containsPrimVariantSelection()||i.outputs.allErrors.push(zc({rootSite:Mn(t),site:xe(e.layerStack.identifier,e.path.pathString),targetSite:xe(e.layerStack.identifier,u.pathString),relocationSourceSite:xe(e.layerStack.identifier,u.pathString),arcType:r}));continue}let d=ne.create([[ms,ms],[u,e.path.stripAllVariantSelections()]]),p=d.mapTargetToSource(e.path),f=p.isEmpty()?u:p,h=my(d,e,e.path);if(Co(s)&&i.rejectDuplicateArc(e,It(e.layerStack),f,s))continue;if(r===6&&(e.parent!==null||s!==null)){let m=Rr(e,{arcType:6,layerStack:e.layerStack,path:f,mapToParent:h,origin:e,siblingNumAtOrigin:c,namespaceDepth:Te(e.path),inert:!0});i.registerSubtree(t,m);continue}let y={previousFrame:s,requestedPath:f,parentNode:e,arcType:r,mapToParent:h,skipDuplicateNodes:!0},g=(await this.buildNodeTree(e.layerStack,f,i,y)).clone(e);g.arcType=r,g.mapToParent=h,g.origin=e,g.namespaceDepth=Te(e.path),g.siblingNumAtOrigin=c,Dr(g,e.mapToRoot),er(e,g),i.registerSubtree(t,g),o.push(g)}}evalVariants(e,t,r,i){if(e.inert)return{added:!1,unresolved:!1};let s=!1,o=!1,a=e.path.stripAllVariantSelections(),c=Qc(e.layerStack,R(e.path));for(let l=0;l<c.length;l++){let u=c[l],d=gy(e,a,u,r.outputs.allErrors,Mn(tr(e)),r.outputs);if(d===void 0&&i){let h=ip(e.layerStack,R(a),u);d=(this.variantFallbacks[u]??[]).find(y=>h.has(y))}if(d===void 0){o=!0;continue}let p=e.path.appendVariantSelection(u,d);if(e.children.some(h=>h.arcType===2&&h.path.pathString===p.pathString)||!Nr(e.layerStack,R(p)))continue;let f=Rr(e,{arcType:2,layerStack:e.layerStack,path:p,mapToParent:ne.identity(),origin:e,namespaceDepth:Te(e.path),siblingNumAtOrigin:l});r.registerSubtree(tr(e),f),t.push(f),s=!0}return{added:s,unresolved:o}}async evalAncestralVariants(e,t,r,i,s,o){let a=!1,c=!1,l=hs(e.path);for(;!l.isAbsoluteRootPath()&&Te(l)>=1&&!l.containsPrimVariantSelection();){if(e.specContributionRestrictedDepth!==0&&e.specContributionRestrictedDepth<=Te(l)){l=hs(l);continue}let u=Qc(e.layerStack,R(l));for(let d=0;d<u.length;d++){let p=u[d],f=gy(e,l,p,r.outputs.allErrors,Mn(t),r.outputs);if(f===void 0&&o){let S=ip(e.layerStack,R(l),p);f=(this.variantFallbacks[p]??[]).find(x=>S.has(x))}if(f===void 0){c=!0;continue}let h=l.appendVariantSelection(p,f);if(e.path.hasPrefix(h))continue;let y=e.path.replacePrefix(l,h),g=It(e.layerStack);if(r.hasSite(t,g,y)||!Nr(e.layerStack,R(h)))continue;let m=!1;for(let S=e;S?.parent!==null;S=S.parent)if(hn(S.arcType)&&Yt(S)===0&&!S.inert){m=!0;break}if(m||=Co(i),m&&r.rejectDuplicateArc(e,g,y,i))continue;let P={previousFrame:i,requestedPath:y,parentNode:e,mapToParent:ne.identity(),arcType:2,skipDuplicateNodes:m},b=(await this.buildNodeTree(e.layerStack,y,r,P)).clone(e);b.arcType=2,b.mapToParent=ne.identity(),b.origin=e,b.namespaceDepth=Te(l),b.siblingNumAtOrigin=d,Dr(b,e.mapToRoot),er(e,b),r.registerSubtree(t,b),s.push(b),a=!0}l=hs(l)}return{added:a,unresolved:c}}evalUnresolvedPrimPathError(e,t,r){for(let l of ct(e)){let u=Yt(l)===0?l.path:_t(l);if(Nr(l.layerStack,R(u)))return}let i=e.parent,s=_t(e),o=e.mapToParent.mapSourceToTarget(s),a=o.isEmpty()?i?.path??e.path:o,c=xe((i??e).layerStack.identifier,a.pathString);r.allErrors.some(l=>l.errorType===2)||r.allErrors.push(Mg({rootSite:Mn(t),site:c,sourceLayer:this.refSourceLayers.get(e),targetLayer:e.layerStack.identifier.rootLayer,unresolvedPath:s.pathString,arcType:e.arcType}))}async evalRefOrPayload(e,t,r,i,s,o,a,c="static",l=R(e.path)){let u=new Set,d=t===4?tp(e.layerStack,l,e.expressionVars,u):Er(e.layerStack,l,e.expressionVars,u);if(i.outputs.expressionVariablesDependency.addDependencies(e.layerStack,u),d.length===0)return;let p=V.fromString(l.replace(/\/\{/g,"{").replace(/\}\//g,"}")),f=e.mapToRoot.mapSourceToTarget(p),h=(f.isEmpty()?o.path:f).stripAllVariantSelections().pathString;if(t===5&&!this.payloadIncluded(h)){i.outputs.setPayloadState(this.payloadInclusionSource==="predicate"?Ln.PayloadState.ExcludedByPredicate:Ln.PayloadState.ExcludedByIncludeSet);return}t===5&&i.outputs.setPayloadState(this.payloadInclusionSource==="predicate"?Ln.PayloadState.IncludedByPredicate:Ln.PayloadState.IncludedByIncludeSet);let y=ms.pathString;for(let[g,m]of d.entries()){if(t===5&&c==="dynamic"&&!m.assetPath)continue;if(m.primPath){let k=V.fromString(m.primPath);if(!k.isAbsolutePath()||!k.isPrimPath()||k.containsPrimVariantSelection()){i.outputs.allErrors.push(Hd({rootSite:Mn(o),site:xe(e.layerStack.identifier,e.path.pathString),primPath:m.primPath,sourceLayer:m.sourceLayer,arcType:t}));continue}}let P,b,S=m.layerOffset;if(m.assetPath){let k=Mt(m.assetPath),E=Mt(m._resolvedAssetPath??k.assetPath).assetPath,q=yd(E),ae=t===5&&uy(q)?q:void 0;if(t===5&&c==="dynamic"!=(ae!==void 0))continue;let se=ci(E,k.args);if(ae){let U=new Map(k.args),Y=new Set,le=new Set,de=new ko(e,l,Y,le,g,s),j=ae.composeFieldsForFileFormatArguments(k.assetPath,de,U);se=ci(E,U),i.outputs.dynamicFileFormatDependency.addDependencyContext(ae,j,Y,le)}let N=await this.opener(se);if(!N){i.outputs.allErrors.push(Lg({rootSite:Mn(o),site:xe(e.layerStack.identifier,e.path.pathString),targetPath:m.primPath,assetPath:k.assetPath,resolvedAssetPath:E,sourceLayer:m.sourceLayer,arcType:t,messages:""}));continue}P=await this.layerStackFor(N);let X=m.sourceLayer?lA(m.sourceLayer):e.layerStack.timeCodesPerSecond;X!==P.timeCodesPerSecond&&(S={offset:S.offset,scale:S.scale*X/P.timeCodesPerSecond});let ce=N.getField(y,"defaultPrim");b=m.primPath||(ce?`/${ce}`:y)}else if(m.primPath)P=e.layerStack,b=m.primPath;else{let k=e.layerStack.layers.map(E=>E.layer.getField(y,"defaultPrim")).find(E=>E!==void 0);if(!k)continue;P=e.layerStack,b=`/${k}`}let x=V.fromString(b),v=V.fromString(l.replace(/\/\{/g,"{").replace(/}\//g,"}")).stripAllVariantSelections(),T=e.path.stripAllVariantSelections();if(T.pathString!==v.pathString&&T.hasPrefix(v)){let k=T.pathString.slice(v.pathString.length);x=V.fromString(x.isAbsoluteRootPath()?k||"/":`${x.pathString}${k}`)}if(fy(e,It(P),x,s)){i.outputs.allErrors.push(hy(e,s,t,P,x));continue}if(P.hasRelocates&&P.incrementalRelocatesSourceToTarget.has(x.pathString)){o.path.containsPrimVariantSelection()||i.outputs.allErrors.push(zc({rootSite:Mn(o),site:xe(e.layerStack.identifier,e.path.pathString),targetSite:xe(P.identifier,x.pathString),relocationSourceSite:xe(P.identifier,x.pathString),arcType:t}));continue}if(Co(s)&&i.rejectDuplicateArc(e,It(P),x,s))continue;let D=!m.assetPath?[[ms,ms],[x,e.path.stripAllVariantSelections()]]:[[x,e.path.stripAllVariantSelections()]],G=my(ne.create(D,S),e,e.path);if(Te(x)>1){let k={previousFrame:s,requestedPath:x,parentNode:e,arcType:t,mapToParent:G,skipDuplicateNodes:!1},E=(await this.buildNodeTree(P,x,i,k)).clone(e);E.arcType=t,E.mapToParent=G,E.origin=e,m.sourceLayer&&this.refSourceLayers.set(E,m.sourceLayer),E.namespaceDepth=Te(e.path),E.expressionVars=qd(P.ownExpressionVariables,e.expressionVars),Dr(E,e.mapToRoot),er(e,E),i.registerSubtree(o,E),a.push(E);continue}let _=Rr(e,{arcType:t,layerStack:P,path:x,mapToParent:G,origin:e,namespaceDepth:Te(e.path)});i.registerSubtree(o,_),m.sourceLayer&&this.refSourceLayers.set(_,m.sourceLayer),_.expressionVars=qd(P.ownExpressionVariables,e.expressionVars),r.push(_)}}async evalAncestralDynamicPayloads(e,t,r,i,s,o){for(let a=hs(e.path);!a.isAbsoluteRootPath()&&!(!(e.specContributionRestrictedDepth!==0&&e.specContributionRestrictedDepth<=Te(a))&&(await this.evalRefOrPayload(e,5,t,r,i,s,o,"dynamic",R(a)),a.isPrimVariantSelectionPath()));a=hs(a));}};function lA(n){let e=n.getField("/","timeCodesPerSecond");if(typeof e=="number")return e;let t=n.getField("/","framesPerSecond");return typeof t=="number"?t:24}(e=>{let n;(a=>(a.NoPayload="noPayload",a.IncludedByIncludeSet="includedByIncludeSet",a.ExcludedByIncludeSet="excludedByIncludeSet",a.IncludedByPredicate="includedByPredicate",a.ExcludedByPredicate="excludedByPredicate"))(n=e.PayloadState||={})})(Ln||={});var Ro=class{_rootNode;path;localErrors;constructor(e,t="",r=[]){this._rootNode=e,this.path=t,this.localErrors=r}isValid(){return this._rootNode!==void 0}get rootNode(){if(!this._rootNode)throw new Error("Invalid PcpPrimIndex has no root node");return this._rootNode}dumpToString(e=!0,t=!0){return cy(this,e,t)}*getNodeRange(){this._rootNode&&(yield*ct(this._rootNode))}composePrimStack(){let e=[],t=-1;for(let r of this.getNodeRange()){if(t++,r.inert)continue;let i=r.mapToRoot.getTimeOffset();for(let s=0;s<r.layerStack.layers.length;s++){let{layer:o,offset:a}=r.layerStack.layers[s];o.hasSpec(R(r.path))&&e.push({layer:o,path:r.path,arcType:r.arcType,offset:Be(i,a),nodeIndex:t,layerIndex:s})}}return e}composePropertyStack(e,t={}){let r=[],i=-1;for(let c of this.getNodeRange()){if(i++,c.inert)continue;let l=c.path.appendProperty(e),u=R(l),d=c.mapToRoot.getTimeOffset();for(let p=0;p<c.layerStack.layers.length;p++){let{layer:f,offset:h}=c.layerStack.layers[p];f.hasSpec(u)&&r.push({layer:f,path:l,arcType:c.arcType,offset:Be(d,h),nodeIndex:i,layerIndex:p})}}if(!t.validatePropertyTypes)return r;let s=r[0];if(!s)return r;let o=s.layer.getSpecType(R(s.path)),a=[s];for(let c of r.slice(1)){let l=c.layer.getSpecType(R(c.path));if(l===o){a.push(c);continue}this.localErrors.push(Og({rootSite:xe(this.rootNode.layerStack.identifier,this.rootNode.path.appendProperty(e).pathString),definingLayerIdentifier:s.layer.filePath,definingSpecPath:s.path.pathString,definingSpecType:o,conflictingLayerIdentifier:c.layer.filePath,conflictingSpecPath:c.path.pathString,conflictingSpecType:l}))}return a}hasSpecs(){for(let e of this.getNodeRange())if(!e.inert&&Nr(e.layerStack,R(e.path)))return!0;return!1}computePrimChildNames(e){let t=[],r=this._rootNode,i=r!==void 0&&fs(r),s=d=>{if(!(d.culled||d.elided)){for(let p=d.children.length-1;p>=0;p--)s(d.children[p]);!d.inert&&(!i||!d.isRootNode()&&ps(d))&&t.push(d)}};r&&s(r);let o=d=>{let p=d.lastIndexOf("/");return p<=0?"/":d.slice(0,p)},a=d=>d.slice(d.lastIndexOf("/")+1),c=new Set,l=new Set,u=[];for(let d of t){let p=new Map,f=new Set;for(let[g,m]of d.layerStack.incrementalRelocatesSourceToTarget){if(o(g)!==d.path.pathString)continue;let P=a(g);c.add(P),o(m)===d.path.pathString?p.set(P,a(m)):f.add(P)}if(p.size||f.size){let g=[];for(let m of u){let P=p.get(m);P!==void 0?(l.delete(m),l.has(P)||(l.add(P),g.push(P))):f.has(m)?l.delete(m):g.push(m)}u.splice(0,u.length,...g)}let h=[];for(let[g,m]of d.layerStack.incrementalRelocatesTargetToSource)if(o(g)===d.path.pathString&&o(m)!==d.path.pathString){let P=a(g);l.has(P)||h.push(P)}h.sort();for(let g of h)l.add(g),u.push(g);let y=op(d.layerStack,R(d.path),u);u.splice(0,u.length,...y),l.clear();for(let g of u)l.add(g)}for(let d of c)e?.add(d);return u.filter(d=>!c.has(d))}computePrimPropertyNames(){let e=[],t=s=>{if(!s.culled){for(let o=s.children.length-1;o>=0;o--)t(s.children[o]);s.inert||e.push(s)}};this._rootNode&&t(this._rootNode);let r=new Set,i=[];for(let s of e){let o=R(s.path);for(let a=s.layerStack.layers.length-1;a>=0;a--){let c=s.layerStack.layers[a].layer.getField(o,"properties");for(let l of c??[])r.has(l)||(r.add(l),i.push(l))}}return i}};var fi=new WeakMap,Zc=class n{constructor(e,t,r,i,s=new Set,o=()=>!0,a="includeSet",c={current:void 0}){this.indexer=e;this.rootLayer=t;this.opener=r;this.sessionLayer=i;this.includedPayloads=s;this.includePayloadForIndexing=o;this.payloadInclusionSource=a;fi.set(this,c)}variantFallbacks={};primIndexes=new Map;dynamicFileFormatDependencies=new Map;expressionVariablesDependencies=new Map;culledDependencies=new Map;inFlightIndexes=new Map;dependenciesByLayer=new Map;virtualDependenciesByLayer=new Map;sitesByPrimIndex=new Map;generation=0;rebuilding=null;computationObserver;static async create(e,t,r,i){return n._create(e,t,r,i)}static async _create(e,t,r,i,s){let o=new Set,a={current:s},c=i?u=>{let d=i(u);return d?o.add(u):o.delete(u),d}:u=>o.has(u),l=i?"predicate":"includeSet";return new n(await Do.create(e,t,r,c,l,a),e,t,r,o,c,l,a)}getLayerStack(){return this.indexer.getLayerStack()}setComputationObserver(e){this.computationObserver=e}recordComputationEvent(e,t){this.computationObserver?.(e,t)}setVariantFallbacks(e){mA(this.variantFallbacks,e)||(this.variantFallbacks=Py(e),this.generation++,this.clearRetainedPrimIndexes(),this.inFlightIndexes.clear(),this.indexer.setVariantFallbacks(e))}getVariantFallbacks(){return Py(this.variantFallbacks)}findPrimIndex(e){return this.primIndexes.get(e)}hasAnyDynamicFileFormatArgumentFieldDependencies(){for(let e of this.dynamicFileFormatDependencies.values())if(e.getRelevantFieldNames().size>0)return!0;return!1}hasAnyDynamicFileFormatArgumentAttributeDependencies(){for(let e of this.dynamicFileFormatDependencies.values())if(e.getRelevantAttributeNames().size>0)return!0;return!1}isPossibleDynamicFileFormatArgumentField(e){for(let t of this.dynamicFileFormatDependencies.values())if(t.getRelevantFieldNames().has(e))return!0;return!1}isPossibleDynamicFileFormatArgumentAttribute(e){for(let t of this.dynamicFileFormatDependencies.values())if(t.getRelevantAttributeNames().has(e))return!0;return!1}getDynamicFileFormatArgumentDependencyData(e){return new pi(this.dynamicFileFormatDependencies.get(e))}findDynamicFileFormatArgumentDependents(e,t,r,i,s,o){let a=new Set,c=new Set(this.findSiteDependencies(e,t).map(l=>l.indexPath));for(let l of c){let u=this.dynamicFileFormatDependencies.get(l);u&&(i!==void 0&&u.canAttributeDefaultValueChangeAffectFileFormatArguments(i,s,o)||r!==void 0&&u.canFieldChangeAffectFileFormatArguments(r,s,o))&&a.add(l)}return[...a]}forEachPrimIndex(e){for(let t of this.primIndexes.values())e(t)}findPayloadPaths(e="/"){let t=new Set;for(let[r,i]of this.primIndexes)if(Yc(r,e)){for(let s of i.getNodeRange())if(!(s.culled||s.elided)&&Er(s.layerStack,R(s.path),s.expressionVars).length!==0){t.add(r);break}}return[...t].sort()}isPayloadIncluded(e){return this.includedPayloads.has(e)}getIncludedPayloadPaths(){return[...this.includedPayloads].sort()}requestPayloads(e,t,r){let i=new Set(e),s=new Set;for(let o of i)this.includedPayloads.has(o)||(this.includedPayloads.add(o),s.add(o));for(let o of t)i.has(o)||!this.includedPayloads.delete(o)||s.add(o);if(r)for(let o of s)r.didChangeSignificantlyAtPath(o);else this.invalidatePrimIndexes(s,!0)}forEachLayerUsed(e){for(let t of this.dependenciesByLayer.keys())e(t)}getLayersUsedByPrimIndex(e){return[...new Set((this.sitesByPrimIndex.get(e)??[]).filter(r=>!r.virtual).map(r=>r.layer))]}findPrimIndexPathsUsingLayer(e){let t=new Set;for(let r of this.dependenciesByLayer.get(e)?.values()??[])for(let i of r)t.add(i);return[...t].sort()}findSiteDependencies(e,t,r={}){let i=new Map;for(let[s,o]of this.dependenciesByLayer.get(e)??[])if(!(s!==t&&!(r.recurseOnSite&&by(s,t)))){for(let a of o)if(i.set(`${a}\0${s}`,{indexPath:a,sitePath:s}),!!r.recurseOnIndex)for(let c of this.primIndexes.keys())c!==a&&Yc(c,a)&&i.set(`${c}\0${s}`,{indexPath:c,sitePath:s})}if(r.includeVirtual){for(let[s,o]of this.virtualDependenciesByLayer.get(e)??[])if(!(s!==t&&!(r.recurseOnSite&&by(s,t)))){for(let[a,c]of o)if(!i.has(`${a}\0${s}`))for(let l of c)i.set(`${a}\0${s}\0${l}`,{indexPath:a,sitePath:s,rootMappedSitePath:l})}}return[...i.values()].sort((s,o)=>s.indexPath.localeCompare(o.indexPath)||s.sitePath.localeCompare(o.sitePath))}async computePrimIndex(e){return this._computePrimIndex(e)}async computePrimIndexesInParallel(e,t,r){let i=typeof e=="string"?[e]:[...e],s=[];for(;i.length>0;){let o=[...new Set(i)];i=[];let a=await Promise.all(o.map(c=>this.computePrimIndex(c)));for(let c=0;c<a.length;c++){let l=a[c],u=o[c];s.push(...l.localErrors);let d=[...l.getNodeRange()].some(f=>Er(f.layerStack,R(f.path),f.expressionVars).length>0);!this.isPayloadIncluded(u)&&d&&r(u)&&(this.requestPayloads([u],[]),l=await this.computePrimIndex(u),s.push(...l.localErrors));let p=l.computePrimChildNames();t(l,p)&&i.push(...p.map(f=>u==="/"?`/${f}`:`${u}/${f}`))}}return s}async _computePrimIndex(e,t=fi.get(this)?.current){this.recordComputationEvent("primIndexRequest",e),this.rebuilding&&await this.rebuilding;let r=this.primIndexes.get(e);if(r)return r;let i=this.inFlightIndexes.get(e);if(i)return i;let s=this.generation,o=this.indexer;this.recordComputationEvent("primIndexCompute",e);let a=fi.get(this)??{current:void 0},c;return c=as(a,"usd-ts:PcpCache.computePrimIndex",async l=>(cs(l,"primPath",e),o.buildPrimIndex(e,l)),t).then(l=>{let u=l.primIndex;return this.generation===s&&this.indexer===o&&this.retainPrimIndex(e,u,l.dynamicFileFormatDependency,l.expressionVariablesDependency,l.culledDependencies),u}).finally(()=>{this.inFlightIndexes.get(e)===c&&this.inFlightIndexes.delete(e)}),this.inFlightIndexes.set(e,c),c}invalidatePrimIndexes(e,t=!1){let r=[...new Set(e)];if(r.length!==0){++this.generation,this.inFlightIndexes.clear(),this.indexer.invalidateBuildState();for(let i of[...this.primIndexes.keys()])r.some(s=>i===s||t&&Yc(i,s))&&this.removePrimIndexDependencies(i)}}async invalidateAll(e=!1){let t=this.indexer.getLayerStack(),r=e?new Map(this.primIndexes):new Map;++this.generation,this.clearRetainedPrimIndexes(),this.inFlightIndexes.clear();let i;i=Do.create(this.rootLayer,this.opener,this.sessionLayer,this.includePayloadForIndexing,this.payloadInclusionSource,fi.get(this)).then(a=>{this.rebuilding===i&&(a.setVariantFallbacks(this.variantFallbacks),this.indexer=a)}),this.rebuilding=i;try{await i}finally{this.rebuilding===i&&(this.rebuilding=null)}let s=uA(t,this.indexer.getLayerStack());if(!e)return s;let o=new Set(s.namespaceRoots);for(let[a,c]of r){let l=await this.computePrimIndex(a);dA(c,l)||o.add(a)}return Sy(o),{...s,namespaceRoots:[...o].sort()}}retainPrimIndex(e,t,r,i,s){this.removePrimIndexDependencies(e),this.primIndexes.set(e,t),r.isEmpty()||this.dynamicFileFormatDependencies.set(e,r),i.isEmpty()||this.expressionVariablesDependencies.set(e,i),s.length>0&&this.culledDependencies.set(e,s);let o=[],a=new Map,c=(l,u)=>{let d=u||l.culled||l.elided,p=R(l.path),f=d?l.mapToRoot.mapSourceToTarget(l.path).pathString:void 0;for(let{layer:h}of l.layerStack.layers){let y=a.get(h);y||(y=new Map,a.set(h,y));let g=y.get(p);if(d){if(g===!1)continue;g===void 0&&(y.set(p,!0),o.push({layer:h,sitePath:p,virtual:!0}));let m=this.virtualDependenciesByLayer.get(h);m||(m=new Map,this.virtualDependenciesByLayer.set(h,m));let P=m.get(p);P||(P=new Map,m.set(p,P));let b=P.get(e);b||(b=new Set,P.set(e,b)),b.add(f??p)}else{if(g===!1)continue;y.set(p,!1),o.push({layer:h,sitePath:p,virtual:!1});let m=this.dependenciesByLayer.get(h);m||(m=new Map,this.dependenciesByLayer.set(h,m));let P=m.get(p);P||(P=new Set,m.set(p,P)),P.add(e)}}for(let h of l.children)c(h,d)};c(t.rootNode,!1),this.sitesByPrimIndex.set(e,o)}removePrimIndexDependencies(e){for(let{layer:t,sitePath:r,virtual:i}of this.sitesByPrimIndex.get(e)??[])if(i){let s=this.virtualDependenciesByLayer.get(t),o=s?.get(r);o?.delete(e),o?.size===0&&s?.delete(r),s?.size===0&&this.virtualDependenciesByLayer.delete(t)}else{let s=this.dependenciesByLayer.get(t),o=s?.get(r);o?.delete(e),o?.size===0&&s?.delete(r),s?.size===0&&this.dependenciesByLayer.delete(t)}this.sitesByPrimIndex.delete(e),this.dynamicFileFormatDependencies.delete(e),this.expressionVariablesDependencies.delete(e),this.culledDependencies.delete(e),this.primIndexes.delete(e)}clearRetainedPrimIndexes(){this.primIndexes.clear(),this.dynamicFileFormatDependencies.clear(),this.expressionVariablesDependencies.clear(),this.culledDependencies.clear(),this.dependenciesByLayer.clear(),this.virtualDependenciesByLayer.clear(),this.sitesByPrimIndex.clear()}};function hp(n,e,t,r,i){return Zc._create(n,e,t,r,i)}function Jc(n){return fi.get(n)?.current}function mp(n,e){let t=fi.get(n);t&&(t.current=e)}async function Eo(n,e,t){let r=fi.get(n);if(!r)return await t();let i={},s=r.installations??=[];s.length===0&&(r.current?r.base=r.current:delete r.base),s.push({token:i,context:e}),r.current=e;try{return await t()}finally{let o=s.findIndex(a=>a.token===i);o>=0&&s.splice(o,1),r.current=s.at(-1)?.context??r.base,s.length===0&&delete r.base}}function gp(n,e,t){return n._computePrimIndex(e,t)}function uA(n,e){let t=n.layers.map(l=>l.layer),r=e.layers.map(l=>l.layer),i=new Set(t),s=new Set(r),o=[...t.filter(l=>!s.has(l)),...r.filter(l=>!i.has(l))],a=new Set;for(let l of o)for(let u of l.getSpecPaths()){if(u==="/")continue;let d=fA(u);(u.includes(".")||pA(l,u))&&a.add(d)}Sy(a);let c=new Set;if(o.length===0&&!hA(t,r)){let l=new Set;for(let u of[...t,...r])for(let d of u.getSpecPaths())d.includes(".")&&l.add(d);for(let u of l)yy(t,u)!==yy(r,u)&&c.add(u)}return{namespaceRoots:[...a].sort(),changedValuePaths:[...c].sort(),rootLayerStackChanged:o.length>0}}function dA(n,e){let t=[...n.getNodeRange()],r=[...e.getNodeRange()];return t.length===r.length&&t.every((i,s)=>{let o=r[s],a=i.layerStack.layers.map(l=>l.layer),c=o.layerStack.layers.map(l=>l.layer);return i.arcType===o.arcType&&i.path.pathString===o.path.pathString&&a.length===c.length&&a.every((l,u)=>l===c[u])})}function pA(n,e){return n.getField(e,"specifier")!=="over"?!0:n.getFieldNames(e).some(t=>t!=="specifier"&&t!=="primChildren"&&t!=="properties")}function fA(n){let e=n.indexOf(".",n.lastIndexOf("/"));return e<0?n:n.slice(0,e)}function hA(n,e){return n.length===e.length&&n.every((t,r)=>t===e[r])}function yy(n,e){return n.find(t=>t.hasSpec(e))}function Sy(n){let e=[];for(let t of[...n].sort((r,i)=>r.length-i.length||r.localeCompare(i)))e.some(r=>Yc(t,r))||e.push(t);n.clear();for(let t of e)n.add(t)}function Yc(n,e){return n===e||n.startsWith(e==="/"?"/":`${e}/`)}function by(n,e){return n===e||e==="/"||n.startsWith(`${e}/`)||n.startsWith(`${e}.`)||n.startsWith(`${e}{`)}function Py(n){return Object.fromEntries(Object.entries(n).map(([e,t])=>[e,[...t]]))}function mA(n,e){let t=Object.keys(n),r=Object.keys(e);return t.length===r.length&&t.every(i=>{let s=n[i],o=e[i];return o!==void 0&&s?.length===o.length&&s.every((a,c)=>a===o[c])})}function gA(n){let e=[],t=[...ct(n)].some(i=>i.arcType===5),r=i=>{if(i.culled)return;let s=ps(i);if(s&&e.push(i),!(s&&!t))for(let o of i.children)r(o)};for(let i of n.children)r(i);return e}function No(n){if(!fs(n))return null;let e=[];for(let i of gA(n)){let s=i.mapToRoot.getTimeOffset(),o=`${Ze(i.layerStack.identifier)}:${i.path.pathString}`;e.push(`${fn[i.arcType]}|${o}|${s.offset},${s.scale}`)}let t={};for(let i of ct(n)){if(i.inert||i.culled)continue;let s=sy(i.layerStack,R(i.path),i.expressionVars);for(let[o,a]of Object.entries(s))o in t||(t[o]=a)}let r=Object.keys(t).sort().map(i=>`${i}=${t[i]}`);return`Arcs:${e.join(";")}|Variants:${r.join(";")}`}var yA=new Set(["subLayers","subLayerOffsets","owner","sessionOwner","hasOwnedSubLayers","timeCodesPerSecond","expressionVariables","layerRelocates"]),bA=new Set(["defaultPrim","references","payload","inheritPaths","specializes","variantSelection","variantSetNames","variantSetChildren","variantChildren","relocates","instanceable","permission","fallbackPrimTypes"]),PA=new Set(["connectionPaths","targetPaths"]);function yp(n,e){if(e.kind==="specAdded"||e.kind==="specRemoved")return{layer:n,path:e.path,kind:"spec",specAdded:e.kind==="specAdded",specInert:e.inert??!0,specIsProperty:e.specType==="attribute"||e.specType==="relationship"};let t;return e.fieldName==="primChildren"||e.fieldName==="properties"?t="bookkeeping":e.fieldName==="framesPerSecond"?t="layerMetadata":e.fieldName&&yA.has(e.fieldName)?t="layerStack":e.fieldName==="clips"||e.fieldName==="clipSets"?t=e.oldValue===void 0!=(e.newValue===void 0)?"significant":"value":e.fieldName&&bA.has(e.fieldName)?t="significant":e.fieldName&&PA.has(e.fieldName)?t="target":t="value",e.fieldName===void 0?{layer:n,path:e.path,kind:t}:{layer:n,path:e.path,fieldName:e.fieldName,kind:t,oldValue:e.oldValue,newValue:e.newValue}}var gs=class{didChangeSignificantly=new Set;didChangeSpecs=new Set;didChangePrims=new Set;didChangeTargets=new Set;didChangeValues=new Set;didChangeLayerMetadata=new Set;didChangeLayerStackFields=new Set;didChangeLayerStackNamespace=new Set;didChangeLayerStackValues=new Set;didMaybeChangeLayers=!1},nr=class{changes=new gs;assetResolverChanged=!1;didChange(e,t){for(let r of t)this.classify(e,r);this.optimize()}didChangeSignificantly(e,t,r){this.classify(e,{layer:t,path:r,kind:"significant"}),this.optimize()}didChangeSignificantlyAtPath(e){this.changes.didChangeSignificantly.add(e),this.optimize()}didChangeAssetResolver(e){this.assetResolverChanged=!0}getCacheChanges(){return this.optimize(),this.changes}isEmpty(){let e=this.getCacheChanges();return e.didChangeSignificantly.size===0&&e.didChangeSpecs.size===0&&e.didChangePrims.size===0&&e.didChangeTargets.size===0&&e.didChangeValues.size===0&&e.didChangeLayerMetadata.size===0&&!e.didMaybeChangeLayers}async apply(e){let t=this.getCacheChanges();if(this.assetResolverChanged){let i=await e.invalidateAll(!0);i.rootLayerStackChanged&&t.didChangeSignificantly.add("/");for(let s of i.namespaceRoots)t.didChangeSignificantly.add(s);for(let s of i.changedValuePaths)t.didChangeValues.add(s);return}if(t.didMaybeChangeLayers){let i=await e.invalidateAll();for(let s of i.namespaceRoots)t.didChangeLayerStackNamespace.add(s);for(let s of i.changedValuePaths)t.didChangeLayerStackValues.add(s);return}e.invalidatePrimIndexes(t.didChangeSignificantly,!0),e.invalidatePrimIndexes(t.didChangePrims,!1);let r=[];for(let i of t.didChangeSpecs){let s=Vo(i),o=e.findPrimIndex(s);o&&!o.hasSpecs()&&r.push(s)}e.invalidatePrimIndexes(r,!1)}classify(e,t){let r=Vo(t.path);if(t.kind==="bookkeeping")return;if(t.kind==="layerMetadata"){(e.getLayerStack().layers.some(l=>l.layer===t.layer)||e.findPrimIndexPathsUsingLayer(t.layer).length>0)&&this.changes.didChangeLayerMetadata.add(t.path);return}if(t.kind==="layerStack"){(e.getLayerStack().layers.some(l=>l.layer===t.layer)||e.findPrimIndexPathsUsingLayer(t.layer).length>0)&&(this.changes.didMaybeChangeLayers=!0,t.fieldName&&this.changes.didChangeLayerStackFields.add(t.fieldName));return}if(t.kind==="significant"){let c=e.findSiteDependencies(t.layer,r,{recurseOnSite:!0,recurseOnIndex:!0});for(let l of c)this.changes.didChangeSignificantly.add(l.indexPath);return}if(t.kind==="spec"){this.classifySpecChange(e,t);return}let i=t.path.indexOf("."),s=i>=0&&t.fieldName==="default"?t.path.slice(i+1):void 0,o=e.findDynamicFileFormatArgumentDependents(t.layer,r,s===void 0?t.fieldName:void 0,s,t.oldValue,t.newValue);if(o.length>0){for(let c of o)this.changes.didChangeSignificantly.add(c);return}let a=e.findSiteDependencies(t.layer,r);for(let c of a){let l=Ty(t.path,r,c.indexPath);t.kind==="value"?this.changes.didChangeValues.add(l):this.changes.didChangeTargets.add(l)}}classifySpecChange(e,t){let r=t.specAdded===!0,i=Vo(t.path),s=new Set,o=e.findSiteDependencies(t.layer,i,{includeVirtual:!0});for(let a of o)a.rootMappedSitePath!==void 0&&s.add(a.rootMappedSitePath),s.add(a.indexPath);for(let a=xy(i);a!=="/";){let c=e.findSiteDependencies(t.layer,a,{recurseOnSite:!0,includeVirtual:!0});if(c.length>0){for(let l of c){let u=l.sitePath.slice(a.length),d=l.rootMappedSitePath??l.indexPath;if(u.length>0&&!d.endsWith(u))continue;let p=u.length>0?d.slice(0,d.length-u.length):d;s.add(Ty(t.path,a,p))}break}a=xy(a)}e.getLayerStack().layers.some(a=>a.layer===t.layer)&&s.add(i);for(let a of s)this.didChangeSpecsAt(e,a,t,r)}didChangeSpecsAt(e,t,r,i){if(r.specIsProperty===!0)return;if(r.specInert!==!0){this.changes.didChangeSignificantly.add(Vo(t));return}let s=e.findPrimIndex(t);if(s){if(i?xA(s,r.layer,r.path):!0){if(!i&&!s.hasSpecs()){this.changes.didChangeSignificantly.add(t);return}let a=SA(s,r.layer,r.path);if(a){if(No(s.rootNode)!==null&&TA(a,r.layer,r.path,i)){this.changes.didChangeSignificantly.add(t);return}}else if(i){this.changes.didChangePrims.add(t);return}this.changes.didChangeSpecs.add(t);return}if(i){this.changes.didChangeSignificantly.add(t);return}this.changes.didChangeSpecs.add(t);return}if(i){this.changes.didChangeSignificantly.add(t);return}this.changes.didChangeSpecs.add(t)}optimize(){AA(this.changes.didChangeSignificantly);let e=t=>[...this.changes.didChangeSignificantly].some(r=>Ay(t,r));for(let t of[this.changes.didChangeSpecs,this.changes.didChangePrims,this.changes.didChangeTargets,this.changes.didChangeValues])for(let r of t)e(Vo(r))&&t.delete(r)}};function SA(n,e,t){for(let r of n.getNodeRange())if(!(r.inert||r.culled||r.elided)&&r.path.pathString===t&&r.layerStack.layers.some(i=>i.layer===e))return r}function xA(n,e,t){for(let r of n.getNodeRange()){if(r.inert)continue;let i=R(r.path);for(let s of r.layerStack.layers)if(s.layer.hasSpec(i)&&!(s.layer===e&&r.path.pathString===t))return!0}return!1}function TA(n,e,t,r){let i=R(n.path);if(r){for(let s of n.layerStack.layers)if(s.layer.hasSpec(i)&&!(s.layer===e&&n.path.pathString===t))return!1;return!0}return!n.layerStack.layers.some(s=>s.layer.hasSpec(i))}function Vo(n){let e=n.lastIndexOf("/"),t=n.indexOf(".",e);return t<0?n:n.slice(0,t)}function xy(n){if(n==="/")return"/";let e=n.lastIndexOf("/");return e<=0?"/":n.slice(0,e)}function Ty(n,e,t){let r=n.slice(e.length);return t==="/"&&r.startsWith("/")?r:`${t}${r}`}function Ay(n,e){return n===e||n.startsWith(e==="/"?"/":`${e}/`)}function AA(n){let e=[];for(let t of[...n].sort((r,i)=>r.length-i.length||r.localeCompare(i)))e.some(r=>Ay(t,r))||e.push(t);n.clear();for(let t of e)n.add(t)}function wA(n){if(n.assetPaths?.length||!n.templateAssetPath)return n;let e=n.templateAssetPath.match(/(#+)(?=[^#]*$)/);if(!e)return n;let t=Number(n.templateStartTime??0),r=Number(n.templateEndTime??t),i=Number(n.templateStride??1);if(i<=0)return n;let s=e[1].length,o=[],a=[],c=[];for(let l=t,u=0;l<=r;l+=i,u++){let d=Number.isInteger(l)?String(l).padStart(s,"0"):String(l);o.push(n.templateAssetPath.slice(0,e.index)+d+n.templateAssetPath.slice(e.index+s)),a.push([l+Number(n.templateActiveOffset??0),u]),c.push([l,l])}return{...n,assetPaths:o,active:a,times:c}}var bp=new WeakMap;function vy(n){bp.delete(n)}function kA(n){let e=bp.get(n);return e===void 0&&(e=n.getSpecPaths().some(t=>n.getField(t,"clips")!==void 0||n.getField(t,"clipSets")!==void 0),bp.set(n,e)),e}function CA(n){let e=[],t=n;for(;t!==""&&t!=="/"&&(e.push(t),t=t.slice(0,t.lastIndexOf("/"))||"/",t!=="/"););return e}function Pp(n,e){if(e===void 0)return n;if(n===void 0)return e;if(typeof n=="object"&&n!==null&&!Array.isArray(n)&&typeof e=="object"&&e!==null&&!Array.isArray(e)){let t={...n};for(let[r,i]of Object.entries(e))t[r]=Pp(t[r],i);return t}return e}function el(n,e){return!n||e.offset===0&&e.scale===1?n:n.map(([t,r])=>[Ce(e,t),r])}function tl(n){let e=new Map,t=-1;for(let i of n.getNodeRange()){if(t++,i.inert)continue;let s=R(i.path),o=null,a=i.layerStack.layers,c=i.mapToRoot.getTimeOffset(),l=new Map,u=[];for(let d=a.length-1;d>=0;d--){let p=a[d],f=p.layer;if(!kA(f))continue;o??=CA(s);let h=Be(c,p.offset),y=[];for(let g=o.length-1;g>=0;g--){let m=o[g],P=f.getField(m,"clips");if(P){let S=s.slice(m.length);for(let[x,v]of Object.entries(P)){let T={...v};if(T.assetPaths?.length||T.templateAssetPath){let _=l.get(x),k={layer:f,layerStack:i.layerStack,primPath:m,layerIdx:d,nodeIdx:t,tail:S,offset:h};_?_.anchor=k:l.set(x,{def:{},anchor:k})}let w=el(T.active,h);w&&(T.active=w);let D=el(T.times,h);D&&(T.times=D);let G=l.get(x)??{def:{}};G.def=Pp(G.def,T),l.set(x,G),y.push(x)}}let b=f.getField(m,"clipSets");if(y.length>0&&g===0&&(u=Tt(u,{appendedItems:[...new Set(y)].sort()})),b!==void 0){let S=Fe(b);S&&(u=Tt(u,S))}}}for(let[d,p]of l){let f=u.indexOf(d);if(f<0)continue;let h=e.get(d);h||(h={def:{},layerStackOrder:f},e.set(d,h)),!h.anchor&&p.anchor&&(h.anchor=p.anchor,h.layerStackOrder=f),h.def=Pp(p.def,h.def)}}let r=[];for(let[i,s]of e){if(!s.anchor)continue;let o=s.def;if(!o.assetPaths?.length&&o.templateAssetPath){let a=wA(o);if(a!==o){o={...a};let c=el(a.active,s.anchor.offset);c&&(o.active=c);let l=el(a.times,s.anchor.offset);l&&(o.times=l)}}r.push({name:i,def:o,anchorLayer:s.anchor.layer,sourceLayerStack:s.anchor.layerStack,sourcePrimPath:s.anchor.primPath,indexOfLayerWhereAssetPathsFound:s.anchor.layerIdx,tail:s.anchor.tail,position:[s.anchor.nodeIdx,s.anchor.layerIdx],layerStackOrder:s.layerStackOrder,timeOffset:s.anchor.offset})}if(r.length!==0)return r.sort((i,s)=>i.position[0]-s.position[0]||i.sourcePrimPath.localeCompare(s.sourcePrimPath)||i.layerStackOrder-s.layerStackOrder||(i.name<s.name?-1:1)),r}function DA(n,e,t=!1){if(n.length===0)return e;if(n.length===1)return n[0][1]+(e-n[0][0]);if(e<=n[0][0])return n[0][1];if(e>=n[n.length-1][0])return n[n.length-1][1];for(let r=n.length-2;r>=0;r--){let[i,s]=n[r],[o,a]=n[r+1];if(o!==i&&!(t&&e===i&&r>0&&n[r-1][0]===i)&&(e>=i||r===0))return s+(e-i)/(o-i)*(a-s)}return e}function _y(n,e){if(n.length===0)return 0;let t=n[0][1];for(let[r,i]of n)if(r<=e)t=i;else break;return t}function Go(n){return Array.isArray(n)?n:typeof n=="object"&&n!==null?Object.entries(n).map(([e,t])=>[Number(e),t]).sort(([e],[t])=>e-t):[]}function RA(n){return typeof n=="object"&&n!==null&&"value"in n?n.value:n}function Mo(n,e,t,r=!1,i){if(n.interpolateMissingClipValues){let s=hi(n).map(o=>[o,nl(n,o,t,!1,i)]).filter(o=>o[1]!==void 0);if(s.length>0)return Nn(s,e,t,r,i)}return nl(n,e,t,r,i)}function EA(n,e,t,r){if(n.length===0)return e;if(n.length===1)return n[0][0]+e-n[0][1];for(let i=n.length-2;i>=0;i--){let[s,o]=n[i],[a,c]=n[i+1];if(!(a===s||c===o)&&!(r&&t===s&&i>0&&n[i-1][0]===s)&&(t>=s||i===0))return s+(e-o)/(c-o)*(a-s)}return e}function nl(n,e,t,r=!1,i){let s=n.layers[_y(n.active,e)];if(!s)return n.manifestDefault;let o=Go(s.getField(n.attrPath,"timeSamples"));if(o.length===0)return n.manifestDefault;let a=DA(n.times,e,r),c=[...o].sort(([d],[p])=>d-p);if(a>c[c.length-1][0]){let d=hi(n),p=[...d].reverse().find(y=>y<=e),f=d.find(y=>y>e),h=f!==void 0&&n.times.some((y,g)=>g+1<n.times.length&&y[0]===f&&n.times[g+1][0]===f);if(p!==void 0&&f!==void 0&&!h){let y=nl(n,p,t,!1,i),g=nl(n,f,t,!1,i);if(y!==void 0&&g!==void 0)return Nn([[p,y],[f,g]],e,t,r,i)}}let l=c.map(([d,p])=>[d,NA(n,RA(p),EA(n.times,d,e,r),d)]);return Nn(l,a,t,r,i)}function NA(n,e,t,r){return n.valueIsTimeCode?typeof e=="number"?e+t-r:Array.isArray(e)?e.map(i=>typeof i=="number"?i+t-r:i):e:e}function hi(n){let e=new Set,t=n.active.length>0?n.active:[[0,0]];for(let r=0;r<t.length;r++){let i=t[r][0],s=t[r+1]?.[0]??1/0,o=n.layers[t[r][1]];if(!o)continue;let a=Go(o.getField(n.attrPath,"timeSamples")).map(([l])=>l),c=n.manifestBlockedTimes.has(i);if(!(n.interpolateMissingClipValues&&n.manifestDefault===void 0&&(c||a.length===0))){if(e.add(i),n.times.length===0){for(let l of a)i<=l&&l<s&&e.add(l);continue}for(let l of a)for(let u=0;u+1<n.times.length;u++){let[d,p]=n.times[u],[f,h]=n.times[u+1];if(d===f||p===h||l<Math.min(p,h)||l>Math.max(p,h))continue;let y=d+(l-p)/(h-p)*(f-d);i<=y&&y<s&&e.add(y)}for(let[l]of n.times)i<=l&&l<s&&e.add(l)}}return[...e].sort((r,i)=>r-i)}function VA(n,e,t,r){if(!n||r.length===0)return!1;let i=`${e}${t}.`,s=n.getSpecPaths().filter(o=>o.startsWith(i));return s.length===0?!1:s.every(o=>{let a=new Set(Go(n.getField(o,"timeSamples")).filter(([,c])=>c instanceof Q||c===null||c===void 0).map(([c])=>c));return r.every(c=>a.has(c))})}async function rl(n,e){let t=tl(n);if(!t)return;let r=[];for(let{name:i,def:s,anchorLayer:o,tail:a,position:c,timeOffset:l}of t){if(!s.primPath||!s.assetPaths||s.assetPaths.length===0)continue;let u=null;if(s.manifestAssetPath){let h=o.resolveAsset(s.manifestAssetPath);u=h?await e(h):null}let d=s.active??[[Ce(l,0),0]],p=s.times?.length?s.times:l.offset!==0||l.scale!==1?[[l.offset,0],[l.offset+l.scale,1]]:[],f=[];for(let h=0;h<s.assetPaths.length;h++){let y=d.filter(([,m])=>m===h).map(([m])=>m);if(s.interpolateMissingClipValues===!0&&VA(u,s.primPath,a,y)){f.push(null);continue}let g=o.resolveAsset(s.assetPaths[h]);f.push(g?await e(g):null)}r.push({name:i,primPath:s.primPath,active:d,times:p,layers:f,manifest:u,tail:a,position:c,interpolateMissingClipValues:s.interpolateMissingClipValues===!0})}return r.length>0?r:void 0}function GA(n,e){return n.manifest?n.manifest.hasSpec(e):n.layers.some(t=>{let r=t?.getField(e,"timeSamples");return r!=null})}function Sp(n,e){let t=[];for(let r of e){let i=`${r.primPath}${r.tail}.${n}`;if(!GA(r,i))continue;let s=r.manifest?.getField(i,"default"),o=new Set(Go(r.manifest?.getField(i,"timeSamples")).filter(([,a])=>a instanceof Q||a===null||a===void 0).map(([a])=>a));t.push({position:r.position,attrPath:i,active:r.active,times:r.times,layers:r.layers,interpolateMissingClipValues:r.interpolateMissingClipValues,manifestDefault:s,manifestBlockedTimes:o,valueIsTimeCode:["timecode","timecode[]"].includes(String(r.manifest?.getField(i,"typeName")))||r.layers.some(a=>["timecode","timecode[]"].includes(String(a?.getField(i,"typeName"))))})}return t.length>0?t:void 0}function Iy(n,e,t){let r=Sp(n,[e])?.[0];if(!r)return[];let i=hi(r);if(i.length===0)return[];let s=[...i].reverse().find(c=>c<=t)??i[0],o=i.find(c=>c>=t)??i[i.length-1],a=[];for(let c of s===o?[s]:[s,o]){let l=e.layers[_y(e.active,c)],d=Go(l?.getField(r.attrPath,"timeSamples")).length>0?l:e.manifest;!d||!d.hasSpec(r.attrPath)||a.some(p=>p.layer===d)||a.push({layer:d,specPath:r.attrPath,position:e.position})}return a}var MA={none:0,fallback:1,default:2,timeSamples:3,valueClips:4,spline:5},xp=new WeakMap,wy=()=>({source:"none",valueIsBlocked:!1}),mi=n=>xp.get(n)??wy(),il=class{constructor(){xp.set(this,wy())}getSource(){return MA[mi(this).source]}hasAuthoredValueOpinion(){return this.hasAuthoredValue()||this.valueIsBlocked()}hasAuthoredValue(){let e=mi(this);return e.source==="default"||e.source==="timeSamples"||e.source==="valueClips"||e.source==="spline"}getNode(){return mi(this).node}valueIsBlocked(){return mi(this).valueIsBlocked}valueSourceMightBeTimeVarying(){let e=mi(this);return e.source==="timeSamples"||e.source==="valueClips"||e.source==="spline"||this.getNextWeakerInfo()?.valueSourceMightBeTimeVarying()===!0}hasNextWeakerInfo(){return mi(this).nextWeaker!==void 0}getNextWeakerInfo(){let e=mi(this).nextWeaker;return e?Lo(e):void 0}};function Lo(n){let e=new il;return xp.set(e,n),e}var Bt=Object.freeze({model:"model",component:"component",group:"group",assembly:"assembly",subcomponent:"subcomponent"}),sl=class n{static#e;#n=new Map;constructor(){this.#r(Bt.subcomponent,""),this.#r(Bt.model,""),this.#r(Bt.component,Bt.model),this.#r(Bt.group,Bt.model),this.#r(Bt.assembly,Bt.group);for(let e of te.GetInstance().GetAllPlugins()){let t=e.GetMetadata().Kinds;if(!(!t||typeof t!="object"||Array.isArray(t)))for(let[r,i]of Object.entries(t)){if(!i||typeof i!="object"||Array.isArray(i))continue;let s=i.baseKind;this.#r(r,typeof s=="string"?s:"")}}}#r(e,t){!/^[A-Za-z_][A-Za-z0-9_]*$/.test(e)||this.#n.has(e)||this.#n.set(e,t)}static GetInstance(){return this.#e??=new n}static HasKind(e){return this.GetInstance().#n.has(e)}static GetBaseKind(e){return this.GetInstance().#n.get(e)??""}static IsA(e,t){if(e===t)return!0;let r=new Set,i=e;for(;!r.has(i);){if(r.add(i),i=this.GetInstance().#n.get(i)??"",i===t)return!0;if(i==="")return!1}return!1}static GetAllKinds(){return[...this.GetInstance().#n.keys()]}static IsModel(e){return this.IsA(e,Bt.model)}static IsGroup(e){return this.IsA(e,Bt.group)}static IsAssembly(e){return this.IsA(e,Bt.assembly)}static IsComponent(e){return this.IsA(e,Bt.component)}static IsSubComponent(e){return this.IsA(e,Bt.subcomponent)}};function LA(n){return typeof n=="number"?n:n.GetValue()}function OA(n){if(Number.isNaN(n)||n===-1/0)return n;if(n===1/0)return Number.MAX_VALUE;if(n===0)return-Number.MIN_VALUE;let e=new DataView(new ArrayBuffer(8));e.setFloat64(0,n);let t=e.getBigUint64(0);return t+=n>0?-1n:1n,e.setBigUint64(0,t),e.getFloat64(0)}var gi=class n{#e;#n;constructor(e=0,t=!1){this.#e=LA(e),this.#n=t}static PreTime(e){return new n(e,!0)}static EarliestTime(){return new n(-Number.MAX_VALUE)}static Default(){return new n(Number.NaN)}static SafeStep(e=1e6,t=10){return Number.EPSILON*e*t*2}static Test_TimeCodeSequenceRoundTrip(e){return[...e]}IsPreTime(){return this.#n}IsEarliestTime(){return this.IsNumeric()&&this.#e===-Number.MAX_VALUE}IsDefault(){return Number.isNaN(this.#e)}IsNumeric(){return!this.IsDefault()}GetValue(){return this.#e}valueOf(){return this.IsDefault()?-1/0:this.#n?OA(this.#e):this.#e}toString(){return this.IsDefault()?"Usd.TimeCode.Default()":this.#n?this.IsEarliestTime()?"Usd.TimeCode.PreTime(Usd.TimeCode.EarliestTime().GetValue())":`Usd.TimeCode.PreTime(${this.#e.toFixed(1)})`:this.IsEarliestTime()?"Usd.TimeCode.EarliestTime()":this.#e===0?"Usd.TimeCode()":`Usd.TimeCode(${this.#e.toFixed(1)})`}};function Tp(n){return typeof n=="number"?{time:n,isPreTime:!1}:n.IsDefault()?{time:"default",isPreTime:!1}:{time:n.GetValue(),isPreTime:n.IsPreTime()}}var yi=class n{constructor(e=()=>!0,t=!1){this._evaluate=e;this.includeInstanceProxies=t}evaluate(e){if(!e)throw new Error("Cannot evaluate a prim predicate on an invalid prim");return this._evaluate(e)}and(e){let t=Vr(e);return new n(r=>this.evaluate(r)&&t.evaluate(r),this.includeInstanceProxies||t.includeInstanceProxies)}or(e){let t=Vr(e);return new n(r=>this.evaluate(r)||t.evaluate(r),this.includeInstanceProxies||t.includeInstanceProxies)}not(){return new n(e=>!this.evaluate(e),this.includeInstanceProxies)}traverseInstanceProxies(e=!0){return new n(this._evaluate,e)}};function Vr(n){return n instanceof yi?n:new yi(n)}var rr=n=>new yi(n),Ap=rr(n=>n.isActive),ky=rr(n=>n.isLoaded),FA=rr(n=>n.isModel()),BA=rr(n=>n.isGroup()),vp=rr(n=>n.isAbstract),_p=rr(n=>n.isDefined),UA=rr(n=>n.hasClassSpecifier()),$A=rr(n=>n.hasDefiningSpecifier()),zA=rr(n=>n.isInstance()),Oo=new yi,bi=Ap.and(_p).and(ky).and(vp.not());function Ey(n,e){if(e.kind==="multipleApplyAPI"){let t=`${e.identifier}:`;return n.some(r=>r.startsWith(t))}return e.kind==="singleApplyAPI"?n.includes(e.identifier):!1}function Ny(n,e,t){return e.kind!=="multipleApplyAPI"?!1:n.includes(`${e.identifier}:${t}`)}function Pi(n,e,t){if(typeof n!="string"){let s=O.findSchemaInfo(n);return s?O.findSchemaInfosInFamily(s.family,s.version,t):[]}if(e===void 0&&t===void 0)return O.findSchemaInfosInFamily(n);if(e!==void 0)return O.findSchemaInfosInFamily(n,e,t);let r=O.findSchemaInfo(n);if(r)return O.findSchemaInfosInFamily(r.family,r.version,t);let i=O.parseSchemaFamilyAndVersionFromIdentifier(n);return i?O.findSchemaInfosInFamily(i[0],i[1],t):[]}var HA=new Set(["all","greaterThan","greaterThanOrEqual","lessThan","lessThanOrEqual"]);function jA(n){return typeof n=="string"&&HA.has(n)}function Cy(n,e){for(let t of e)if(n.IsA(t.type))return t;return null}function Dy(n,e,t){if(n.length===0)return null;if(t!==void 0&&t==="")throw new Error("Instance name must be non-empty");for(let r of e)if(t===void 0?Ey(n,r):Ny(n,r,t))return r;return null}function ol(n,e){return sl.IsA(n,e)}var Ry=new WeakMap;function al(n){let e=Ry.get(n),t=_g(n);if(e&&e.generation===t&&e.size===n.size)return e.index;let r=new Map([...Nd(n)].map(([o,a])=>[o,[...a]])),i=new Map;for(let o of n.keys()){if(o==="/")continue;let a=o.indexOf(".");if(a>=0){let c=a===0?"/":o.slice(0,a),l=i.get(c);l||i.set(c,l=[]),l.push(o.slice(a+1))}}let s={children:r,attrs:i};return Ry.set(n,{generation:t,size:n.size,index:s}),s}var ir=class n{constructor(e,t,r,i){this._nodes=e;this.path=t;this._stage=i;this._dataPath=r??t}_dataPath;getStage(){if(!this._stage)throw new Error(`Prim <${this.path}>: this handle carries no stage (not fetched via Stage.getPrim)`);return this._stage}_getStage(){return this._stage}get typeName(){return this._nodes.get(this._dataPath)?.fields.typeName??""}get _fields(){return this._nodes.get(this._dataPath)?.fields}_getMetadataValueTypeName(e){return this._stage?._resolvePrimFieldTypeName(this._dataPath,e)}getPrimTypeInfo(){let e=this._nodes.get(this._dataPath)?.fields;if(!e)return rs.getEmptyPrimType();let t=e.typeName??"",r=this._stage?._getAuthoredAppliedSchemas(this._dataPath)??e.apiSchemas,i=Array.isArray(r)?r:[],s=this._nodes.get("/")?.fields.__fallbackPrimTypes,o=t!==""?s?.[t]??"":"";return rs._findOrCreatePrimTypeInfo(t,o,i)}getPrimDefinition(){return this.getPrimTypeInfo().getPrimDefinition()}getAppliedSchemas(){return this.getPrimDefinition().getAppliedAPISchemas()}isA(e,t){let r=typeof e=="string"&&t!==void 0?O.findSchemaInfoInFamily(e,t):O.findSchemaInfo(e);return r?this.getPrimTypeInfo().getSchemaType().IsA(r.type):!1}isInFamily(e,t,r){let i=typeof t=="number"?Pi(e,t,r):Pi(e,void 0,t);return Cy(this.getPrimTypeInfo().getSchemaType(),i)!==null}getVersionIfIsInFamily(e){return Cy(this.getPrimTypeInfo().getSchemaType(),Pi(e))?.version}hasAPI(e,t,r){let i,s;if(typeof e=="string"&&typeof t=="number")i=O.findSchemaInfoInFamily(e,t),s=r;else if(typeof e=="string"){s=typeof t=="string"?t:void 0;let a=e;if(s===void 0){let c=a.indexOf(":");c!==-1&&(s=a.slice(c+1),a=a.slice(0,c))}i=O.findSchemaInfo(a)}else i=O.findSchemaInfo(e),s=typeof t=="string"?t:void 0;if(!i)return!1;let o=this.getAppliedSchemas();return o.length===0?!1:s===void 0?Ey(o,i):Ny(o,i,s)}hasAPIInFamily(e,t,r,i){let s,o;return typeof t=="number"?(s=Pi(e,t,r),o=i):jA(t)?(s=Pi(e,void 0,t),o=r):(s=Pi(e),o=t),Dy(this.getAppliedSchemas(),s,o)!==null}getVersionIfHasAPIInFamily(e,t){return Dy(this.getAppliedSchemas(),Pi(e),t)?.version}get isActive(){for(let e of this._ancestorPaths())if(this._nodes.get(e)?.fields.active===!1)return!1;return!0}get isDefined(){for(let e of this._ancestorPaths()){let t=this._nodes.get(e)?.fields.specifier;if(!/^\/__Prototype_\d+$/.test(e)&&t!=="def"&&t!=="class")return!1}return!0}get isAbstract(){return this._ancestorPaths().some(e=>this._nodes.get(e)?.fields.specifier==="class")}get isLoaded(){return this._stage?._isPrimLoaded(this._dataPath)??!0}hasDefiningSpecifier(){let e=this._nodes.get(this._dataPath)?.fields.specifier;return e==="def"||e==="class"}hasClassSpecifier(){return this._stage?._hasClassSpecifier(this.path)??this._nodes.get(this._dataPath)?.fields.specifier==="class"}getFilteredChildren(e){if(!this._stage)return[];let t=Vr(e),r=t.includeInstanceProxies||this.isInstanceProxy();return this._stage.getAllChildPrimPaths(this.path,{instanceProxies:r}).map(i=>this._stage.getPrim(i)).filter(i=>i!==void 0&&t.evaluate(i))}getChildren(){return this.getFilteredChildren(bi)}getAllChildren(){return this.getFilteredChildren(Oo)}getFilteredDescendants(e){let t=Vr(e),r=[],i=s=>{for(let o of s.getFilteredChildren(t))r.push(o),i(o)};return i(this),r}getDescendants(){return this.getFilteredDescendants(bi)}getAllDescendants(){return this.getFilteredDescendants(Oo)}_ancestorPaths(){let e=[],t=this._dataPath;for(;t!=="/";){e.push(t);let r=t.lastIndexOf("/");t=r<=0?"/":t.slice(0,r)}return e}getMetadata(e){let t=e.startsWith("__")?void 0:this._stage?._resolvePrimMetadata(this._dataPath,e)??this._nodes.get(this._dataPath)?.fields[e],r=this.getPrimDefinition().getMetadataField(e);return t===void 0?r:Ot(t)&&Ot(r)?mo(t,r):t}setMetadata(e,t){return this._stage?(this._stage._setPrimMetadata(this.path,e,t),!0):!1}clearMetadata(e){return this._stage?(this._stage._clearPrimMetadata(this.path,e),!0):!1}getKind(){let e=this.getMetadata("kind");return typeof e=="string"?e:""}setKind(e){return this.setMetadata("kind",e)}isKind(e,t="modelHierarchy"){return t!=="none"&&t!=="KindValidationNone"&&ol(e,"model")&&!this.isModel()?!1:ol(this.getKind(),e)}isModel(){if(!ol(this.getKind(),"model"))return!1;let e=this.path.lastIndexOf("/"),t=e<=0?"/":this.path.slice(0,e);return t==="/"?!0:this._stage?.getPrim(t)?.isGroup()??!1}isGroup(){return this.isModel()&&ol(this.getKind(),"group")}get attrNames(){return[...al(this._nodes).attrs.get(this._dataPath)??[]]}getAttr(e){let t=this._dataPath==="/"?`.${e}`:`${this._dataPath}.${e}`,r={name:e,def:()=>this.getPrimDefinition()};if(this._nodes.get(t))return new Ae(this._nodes,t,r,this._stage,this._dataPath,e,this.path);if(this._nodes.has(this._dataPath))return new Ae(this._nodes,t,r,this._stage,this._dataPath,e,this.path);if(this._stage)return new Ae(this._nodes,t,r,this._stage,this._dataPath,e,this.path)}findAllAttributeConnectionPaths(e={}){if(!this._stage)return[];let t=e.traversalPredicate==="allPrims",r=new Set,i=new Set,s=(l,u)=>l===u||l.startsWith(`${u}/`)||l.startsWith(`${u}.`),o=l=>{let u=l.indexOf(".");return u<0?l:l.slice(0,u)},a=l=>{if(r.has(l))return;let u=this._stage.getPrim(l);if(u){r.add(l);for(let d of u.attrNames){let p=u.getAttr(d);if(!(!p||p.isRelationship)&&!(e.predicate&&!e.predicate(p)))for(let f of p.getConnections())i.add(f),e.recurseOnSources&&!s(f,this.path)&&c(o(f))}}},c=l=>{let u=[l];for(;u.length>0;){let d=u.pop();a(d);let p=t?this._stage.getAllChildPrimPaths(d):this._stage.getChildPrimPaths(d);for(let f=p.length-1;f>=0;--f)u.push(p[f])}};return c(this.path),[...i].sort()}getPropertyNames(){let e=new Set(this.getPrimDefinition().getPropertyNames());for(let o of this.attrNames)e.add(o);if(e.size===0)return[];let t=[...e].sort((o,a)=>ht(o,a)?-1:ht(a,o)?1:0),r=this.getMetadata("propertyOrder");if(!Array.isArray(r)||r.length===0)return t;let i=[],s=new Set;for(let o of r)e.has(o)&&!s.has(o)&&(i.push(o),s.add(o));return[...i,...t.filter(o=>!s.has(o))]}getAllMetadata(){let e=new Set;for(let r of Object.keys(this._fields??{}))r.startsWith("__")||e.add(r);for(let r of this.getPrimDefinition().listMetadataFields())e.add(r);let t={};for(let r of[...e].sort((i,s)=>ht(i,s)?-1:ht(s,i)?1:0)){let i=this.getMetadata(r);i!==void 0&&(t[r]=i)}return t}getAllAuthoredMetadata(){if(this._stage)return this._stage._getAllAuthoredPrimMetadata(this._dataPath);let e={};for(let[t,r]of Object.entries(this._fields??{}))!t.startsWith("__")&&r!==void 0&&(e[t]=r);return e}hasAuthoredMetadata(e){return!e.startsWith("__")&&e in this.getAllAuthoredMetadata()}setTypeName(e){this.getStage()._setPrimTypeName(this.path,e)}attr(e){return this.getAttr(e)}createAttr(e,t){let r=this.attr(e);return t!==void 0&&r.set(t),r}rel(e){return new bo(this.getStage(),this.path,e)}createRel(e,t){let r=this.rel(e);return r.setTargets(t??[]),r}getReferences(){return new is(this.getStage(),this.path,"references")}getPayloads(){return new is(this.getStage(),this.path,"payload")}getSpecializes(){return new Po(this.getStage(),this.path)}async setActive(e){let t=this.getStage();await t._ownAuthoringAsync(async()=>{t.getEditTarget().getLayer().setField(this.path,"active",e),await t._recomposeForEdit()})}addAppliedSchema(e){this.getStage().applyAPI(this.path,e)}_resolveAppliedSchemaArgs(e,t,r,i){let s,o;if(typeof t!="string")s=O.findSchemaInfo(t),o=typeof r=="string"?r:void 0;else if(typeof r=="number")s=O.findSchemaInfoInFamily(t,r),o=i;else{o=r;let a=t;if(o===void 0){let c=a.indexOf(":");c!==-1&&(o=a.slice(c+1),a=a.slice(0,c))}s=O.findSchemaInfo(a)}if(!s)throw new Error(`${e}: Cannot find a valid schema for '${String(t)}'`);return{info:s,instance:o}}_isValidApplyToTarget(e,t){let r=O.getAPISchemaCanOnlyApplyToTypeNames(e.identifier,t);if(r.length===0)return!0;let i=this.getPrimTypeInfo().getSchemaType();if(!i.IsUnknown())for(let s of r){let o=O.getTypeFromSchemaTypeName(s);if(i.IsA(o))return!0}return!1}canApplyAPI(e,t,r){let{info:i,instance:s}=this._resolveAppliedSchemaArgs("CanApplyAPI",e,t,r);if(s===void 0){if(i.kind!=="singleApplyAPI")throw new Error(`CanApplyAPI: Provided schema type ${i.identifier} is not a single-apply API schema.`);return this._isValidApplyToTarget(i,"")}if(i.kind!=="multipleApplyAPI")throw new Error(`CanApplyAPI: Provided schema type ${i.identifier} is not a multiple-apply API schema.`);if(s==="")throw new Error(`CanApplyAPI: for multiple apply API schema ${i.identifier}, a non-empty instance name must be provided.`);return O.isAllowedAPISchemaInstanceName(i.identifier,s)?this._isValidApplyToTarget(i,s):!1}applyAPI(e,t,r){let{info:i,instance:s}=this._resolveAppliedSchemaArgs("ApplyAPI",e,t,r);if(s===void 0){if(i.kind!=="singleApplyAPI")throw new Error(`ApplyAPI: Provided schema type ${i.identifier} is not a single-apply API schema.`);return this.getStage().applyAPI(this.path,i.identifier),!0}if(i.kind!=="multipleApplyAPI")throw new Error(`ApplyAPI: Provided schema type ${i.identifier} is not a multiple-apply API schema.`);if(s==="")throw new Error(`ApplyAPI: for multiple apply API schema ${i.identifier}, a non-empty instance name must be provided.`);return this.getStage().applyAPI(this.path,`${i.identifier}:${s}`),!0}removeAPI(e,t,r){let{info:i,instance:s}=this._resolveAppliedSchemaArgs("RemoveAPI",e,t,r);if(s===void 0){if(i.kind!=="singleApplyAPI")throw new Error(`RemoveAPI: Provided schema type ${i.identifier} is not a single-apply API schema.`);return this.getStage().removeAppliedSchema(this.path,i.identifier),!0}if(i.kind!=="multipleApplyAPI")throw new Error(`RemoveAPI: Provided schema type ${i.identifier} is not a multiple-apply API schema.`);if(s==="")throw new Error(`RemoveAPI: for multiple apply API schema ${i.identifier}, a non-empty instance name must be provided.`);return this.getStage().removeAppliedSchema(this.path,`${i.identifier}:${s}`),!0}isInstance(){return this._nodes.get(this._dataPath)?.fields.__prototypePath!==void 0}getPrototype(){let e=this._nodes.get(this._dataPath)?.fields.__prototypePath;if(!(e===void 0||!this._nodes.has(e)))return new n(this._nodes,e,void 0,this._stage)}isInstanceable(){return this._nodes.get(this._dataPath)?.fields.instanceable===!0}isInstanceProxy(){return this._dataPath!==this.path}getPrimInPrototype(){if(this.isInstanceProxy())return new n(this._nodes,this._dataPath,void 0,this._stage)}isPrototype(){return/^\/__Prototype_\d+$/.test(this.path)}isInPrototype(){return/^\/__Prototype_\d+([/.]|$)/.test(this._dataPath)&&!this.isInstanceProxy()}},Ae=class{constructor(e,t,r,i,s,o,a){this._nodes=e;this._path=t;this._fallbackSource=r;this._queryProvider=i;this._dataPrimPath=s;this._propertyName=o;this._resultPrimPath=a}get node(){return this._nodes.get(this._path)??{fields:{}}}_getStage(){return this._queryProvider}_getPrimPath(){if(this._dataPrimPath!==void 0)return this._dataPrimPath;let e=this._path.indexOf(".");return e<0?this._path:this._path.slice(0,e)}_getName(){if(this._propertyName!==void 0)return this._propertyName;let e=this._path.indexOf(".");return e<0?"":this._path.slice(e+1)}flattenTo(e,t){if(!this._queryProvider)throw new Error(`Cannot flatten invalid property <${this._path}>`);return this._queryProvider._flattenProperty(this,e,t)}getPropertyStack(e="default"){return this._queryProvider?this._queryProvider.getPropertyStack(`${this._getPrimPath()}.${this._getName()}`,e):[]}getPropertyStackWithLayerOffsets(e="default"){return this._queryProvider?this._queryProvider.getPropertyStackWithLayerOffsets(`${this._getPrimPath()}.${this._getName()}`,e):[]}#e(){return this._fallbackSource?.def()?.getAttributeFallbackValue(this._fallbackSource.name)}hasFallbackValue(){return this.#e()!==void 0}getFallbackValue(){return this.#e()}#n(e){if(!(!this._queryProvider||this._dataPrimPath===void 0||this._propertyName===void 0))return this._queryProvider._resolveAttribute(this._dataPrimPath,this._propertyName,e,()=>this.#e())}getValue(){let e=this.#n("default");if(e)return e.valueIsBlocked?void 0:e.value;if("default"in this.node.fields){let t=this.node.fields.default;return t instanceof Q||t instanceof ke?void 0:t}return this.#e()}hasAuthoredValue(){let e=this.#n(void 0);return e?Lo(e).hasAuthoredValue():"default"in this.node.fields||(this.node.timeSamples?.length??0)>0}hasAuthoredValueOpinion(){let e=this.#n(void 0);return e?Lo(e).hasAuthoredValueOpinion():this.hasAuthoredValue()}hasValue(){let e=this.#n(void 0);return e?e.source!=="none"||e.valueIsBlocked:this.getValue()!==void 0}getResolveInfo(e){let t=this.#n(e)??{source:this.getValue()===void 0?"none":"default",value:this.getValue(),valueIsBlocked:!1};return Lo(t)}get typeName(){return this.getField("typeName")??""}get isRelationship(){return this.typeName==="rel"}isCustom(){return!this._queryProvider||this._dataPrimPath===void 0||this._propertyName===void 0?this.node.fields.custom===!0:this._queryProvider._isPropertyCustom(this._dataPrimPath,this._propertyName)}getField(e){return e==="spline"?this.getSpline():this._queryProvider&&this._dataPrimPath!==void 0&&this._propertyName!==void 0?this._queryProvider._resolvePropertyField(this._dataPrimPath,this._propertyName,e):this.node.fields[e]}_getMetadataValueTypeName(e){if(!(!this._queryProvider||this._dataPrimPath===void 0||this._propertyName===void 0))return this._queryProvider._resolvePropertyFieldTypeName(this._dataPrimPath,this._propertyName,e)}setMetadata(e,t){return!this._queryProvider||this._dataPrimPath===void 0||this._propertyName===void 0?!1:(this._queryProvider._setPropertyMetadata(this._dataPrimPath,this._propertyName,e,t),!0)}getConnections(){if(this._queryProvider&&this._dataPrimPath!==void 0&&this._propertyName!==void 0)return this._queryProvider._resolvePropertyPaths(this._dataPrimPath,this._propertyName,"connectionPaths",this._resultPrimPath)??[];let e=this.node.fields.connectionPaths;return typeof e=="string"?[e]:Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}getTargets(){if(this._queryProvider&&this._dataPrimPath!==void 0&&this._propertyName!==void 0)return this._queryProvider._resolvePropertyPaths(this._dataPrimPath,this._propertyName,"targetPaths",this._resultPrimPath)??[];let e=this.node.fields.targetPaths;return typeof e=="string"?[e]:Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}getDefaultValue(){let e=this.#n("default");if(e)return e.valueIsBlocked?void 0:e.value;if("default"in this.node.fields){let t=this.node.fields.default;return t instanceof Q||t instanceof ke?void 0:t}return this.#e()}getDefaultValueResult(){let e=this.#n("default");return e?.source==="default"?{source:"authored",value:e.value}:e?{source:"fallback",value:e.value??null}:"default"in this.node.fields?{source:"authored",value:this.node.fields.default}:{source:"fallback",value:this.#e()??null}}getTimeSampleKeys(){let e=this.#n(void 0);return e?(e.timeSamples??[]).map(([t])=>t).sort((t,r)=>t-r):this.node.clips?.length?hi(this.node.clips[0]):(this.node.timeSamples??[]).map(([t])=>t).sort((t,r)=>t-r)}hasSpline(){return this.#n(void 0)?.source==="spline"}getSpline(){let e=this.#n(void 0);return e?.source==="spline"?Ac(e.spline,e.layerToStageOffset):void 0}getTimeSamplesInInterval(e){let t=e.GetMin(),r=e.GetMax();return this.getTimeSampleKeys().filter(i=>(i>t||i===t&&e.IsMinClosed())&&(i<r||i===r&&e.IsMaxClosed()))}static getUnionedTimeSamples(e){return[...new Set(e.flatMap(t=>t.getTimeSampleKeys()))].sort((t,r)=>t-r)}static getUnionedTimeSamplesInInterval(e,t){return[...new Set(e.flatMap(r=>r.getTimeSamplesInInterval(t)))].sort((r,i)=>r-i)}getBracketingTimeSamples(e){let t=this.getTimeSampleKeys();if(t.length===0)return[];let r=[...t].reverse().find(s=>s<=e)??t[0],i=t.find(s=>s>=e)??t[t.length-1];return[r,i]}getValueAtTime(e,t){let{time:r,isPreTime:i}=Tp(e);if(r==="default")return this.getValue();let s=this.#n(r);if(s){if(s.valueIsBlocked)return;if(s.source==="spline")return Tc(s.spline,r,i,s.layerToStageOffset);if(s.source==="timeSamples"){if(s.valueEvaluator)return s.valueEvaluator(r,i);let l=Nn(s.timeSamples??[],r,t?.interpolation??s.interpolation,i,s.typeName);return l instanceof Q?void 0:l}return s.source==="valueClips"&&i&&s.valueEvaluator?s.valueEvaluator(r,!0):s.value}if(this.node.clips)for(let l of this.node.clips){let u=Mo(l,r,t?.interpolation,!1,this.typeName);if(u!==void 0)return u}let o=this.node.fields.spline;if(o)return Tc(o,r,i);let a=this.node.timeSamples;if(!a||a.length===0)return this.getValue();let c=Nn(a,r,t?.interpolation,i,this.typeName);return c instanceof Q?void 0:c}getStage(){let e=this._getStage();if(!e)throw new Error(`Attribute <${this._path}>: this handle carries no stage`);return e}get primPath(){return this._resultPrimPath??this._getPrimPath()}get name(){return this._getName()}_rejectOpaqueValue(e){if(!(e instanceof Q||e instanceof ke)&&this.typeName==="opaque")throw new Error(`Cannot author opaque-valued attribute <${this.primPath}.${this.name}>`)}set(e){this._rejectOpaqueValue(e),this.getStage()._setAttrDefault(this.primPath,this.name,e)}setTimeSample(e,t){if(t instanceof ke)throw new Error("SdfAnimationBlock can only be authored at the default time");this._rejectOpaqueValue(t),this.getStage()._setAttrTimeSample(this.primPath,this.name,e,t)}connect(e){this.getStage()._setAttrConnections(this.primPath,this.name,[e])}setConnections(e){this.getStage()._setAttrConnections(this.primPath,this.name,e)}addConnection(e,t=Rd){return this.getStage()._addAttrConnection(this.primPath,this.name,e,t),!0}removeConnection(e){return this.getStage()._removeAttrConnection(this.primPath,this.name,e),!0}clearConnections(){return this.getStage()._clearAttrConnections(this.primPath,this.name),!0}hasColorSpace(){return typeof this.getField("colorSpace")=="string"}getColorSpace(){let e=this.getField("colorSpace");return typeof e=="string"?e:""}setColorSpace(e){return this.setMetadata("colorSpace",e)}getMetadata(e){return this.getField(e)}getAllAuthoredMetadata(){let t=this.getStage()._getAllAuthoredPropertyMetadata(this._getPrimPath(),this._getName(),this);return t.custom??=!1,this.isRelationship||(t.typeName??=this.typeName,t.variability??=this.getField("variability")??"varying"),t}getAllMetadata(){let e=this.getAllAuthoredMetadata(),t=this._fallbackSource?.def()?.getPropertyDefinition(this._getName());if(!t?.isValid())return e;let r={};for(let i of t.listMetadataFields()){let s=t.getMetadata(i);s!==void 0&&(r[i]=s)}for(let[i,s]of Object.entries(e)){let o=r[i];r[i]=Ot(s)&&Ot(o)?mo(s,o):s}return r}hasMetadata(e){return this.getMetadata(e)!==void 0}hasAuthoredMetadata(e){return this.getStage()._hasAuthoredPropertyMetadata(this.primPath,this.name,e)}clearMetadata(e){return this.getStage()._clearPropertyField(this.primPath,this.name,e),!0}_clearMetadata(e){this.getStage()._clearPropertyField(this.primPath,this.name,e)}getLimits(e){return new xo(this,e)}getSoftLimits(){return this.getLimits("soft")}getHardLimits(){return this.getLimits("hard")}clear(){return this.getStage()._replaceAttrValueOpinions(this.primPath,this.name),!0}block(){this.getStage()._replaceAttrValueOpinions(this.primPath,this.name,new Q)}blockAnimation(){this.getStage()._replaceAttrValueOpinions(this.primPath,this.name,new ke)}setSpline(e){if(this.typeName!=="double"&&this.typeName!=="float"&&this.typeName!=="half"&&this.typeName!=="timecode")throw new Error(`Spline on attribute '${this.name}' is incompatible with type '${this.typeName}'`);return this.setMetadata("spline",e)}get(){return this.getValue()}};var mn=class n{#e;#n;constructor(e,t){if(this.#e=e,!e)this.#n=ne.identity();else if(t&&"mapToRoot"in t){let r=t,i=r.layerStack.layers.find(s=>s.layer===e)?.offset??At;this.#n=r.mapToRoot.composeOffset(i)}else{let r=t??At;this.#n=ne.create([["/","/"]],r)}}isNull(){return this.#e===void 0}isValid(){return this.#e!==void 0}getLayer(){return this.#e}getMapFunction(){return this.#n}mapToSpecPath(e){return this.#n.mapTargetToSource(V.fromString(e)).pathString}composeOver(e){let t=this.#e??e.#e,r=new n(t);return r.#n=this.#n.compose(e.#n),r}};var Fo=class{constructor(e,t,r){this._stage=e;this._primPath=t;this.name=r}getVariantNames(){return this._stage._variantNames(this._primPath,this.name)}getVariantSelection(){return this._stage._variantSelection(this._primPath,this.name)}async addVariant(e){let t=this._stage.getEditTarget().getLayer(),r=`${this._primPath}{${this.name}=}`,i=t.getField(r,"variantChildren")??[];await this._stage._ownAuthoringAsync(async()=>{i.includes(e)||t.setField(r,"variantChildren",[...i,e]),await this._stage._recomposeForEdit(this._primPath)})}async setVariantSelection(e){let t=this._stage.getEditTarget().getLayer(),r=t.getField(this._primPath,"variantSelection"),i=r&&typeof r=="object"?{...r}:{};e===""?delete i[this.name]:i[this.name]=[e],await this._stage._ownAuthoringAsync(async()=>{t.setField(this._primPath,"variantSelection",i),await this._stage._recomposeForEdit(this._primPath)})}},Bo=class{constructor(e,t){this._stage=e;this._primPath=t}getNames(){return this._stage._variantSetNames(this._primPath)}hasVariantSet(e){return this.getNames().includes(e)}async addVariantSet(e){let t=this._stage.getEditTarget().getLayer(),r=t.getField(this._primPath,"variantSetChildren")??[];return await this._stage._ownAuthoringAsync(async()=>{if(!r.includes(e)){t.setField(this._primPath,"variantSetChildren",[...r,e]);let i=`${this._primPath}{${e}=}`;t.getField(i,"variantChildren")===void 0&&t.setField(i,"variantChildren",[])}await this._stage._recomposeForEdit()}),new Fo(this._stage,this._primPath,e)}getVariantSet(e){return new Fo(this._stage,this._primPath,e)}getAllVariantSelections(){let e={};for(let t of this.getNames()){let r=this._stage._variantSelection(this._primPath,t);r&&(e[t]=r)}return e}};function Ip(n,e){let t={...n};return Object.defineProperties(t,{getPrimResyncType:{enumerable:!1,value(r){if(!n.resyncedPaths.includes(r))return"Invalid";if(!e)return"Other";if(!e.newPath)return r===e.oldPath?"Delete":"Other";if(r!==e.oldPath&&r!==e.newPath)return"Other";let i=e.oldPath.slice(0,e.oldPath.lastIndexOf("/"))||"/",s=e.newPath.slice(0,e.newPath.lastIndexOf("/"))||"/",o=e.oldPath.slice(e.oldPath.lastIndexOf("/")+1),a=e.newPath.slice(e.newPath.lastIndexOf("/")+1),c=r===e.oldPath?"Source":"Destination";return i!==s&&o!==a?`RenameAndReparent${c}`:i!==s?`Reparent${c}`:`Rename${c}`}},getAssociatedPath:{enumerable:!1,value(r){if(e?.newPath){if(r===e.oldPath)return e.newPath;if(r===e.newPath)return e.oldPath}}}}),t}function Vy(n){return JSON.stringify(n.fields)+"\0"+JSON.stringify(n.timeSamples??null)}function Gr(n){let e=n.indexOf(".");return e<0?n:n.slice(0,e)}function wp(n,e){let t=new Set,r=new Set;for(let[o,a]of n){let c=e.get(o);c?Vy(a)!==Vy(c)&&r.add(o):t.add(Gr(o))}for(let o of e.keys())n.has(o)||t.add(Gr(o));let i=[];for(let o of[...t].sort())i.some(a=>o===a||o.startsWith(`${a}/`))||i.push(o);let s=[...r].filter(o=>{let a=Gr(o);return!i.some(c=>a===c||a.startsWith(`${c}/`))});return Ip({resyncedPaths:i,changedInfoOnlyPaths:s})}var Uo={0:"local",1:"inherit",2:"variant",3:"relocate",4:"reference",5:"payload",6:"specialize"};function cl(n){if(n==null)return;let e;if(Array.isArray(n))e=n;else if(typeof n=="object")e=Object.entries(n).map(([t,r])=>[Number(t),r]).sort(([t],[r])=>t-r);else return;if(e.length!==0)return e.map(([t,r])=>{let i=typeof r=="object"&&r!==null&&"value"in r?r.value:r;return[t,i]})}async function kp(n,e){if(!Le.IsEnabled())return e(void 0);let t=xr();return In(t,"usd-ts:Stage.open",r=>(fe(r,"filePath",n),e(r)))}async function ys(n,e,t){return n?In(n,e,t):await t(void 0)}function Gy(n,e,t){return n?qn(n,e,t):t(void 0)}function ll(n,e){return Le.IsEnabled()?qn(xr(),n,e):e(void 0)}async function Cp(n,e){return Le.IsEnabled()?In(xr(),n,e):await e(void 0)}var Dp=new WeakMap,WA=n=>Dp.get(n)?.current,KA=/^\/__Prototype_\d+$/;function $o(n){return KA.test(n)}function bs(n){return/^\/__Prototype_\d+([/.]|$)/.test(n)}var My={instanceToProto:new Map,protoToSource:new Map},qA=(n,e)=>n===e||e==="/"||n.startsWith(`${e}/`),QA=n=>{let e=n.lastIndexOf("/");return e<=0?"/":n.slice(0,e)},ul=(n,e,t)=>n===e||n.startsWith(`${e}/`)?t+n.slice(e.length):n,sr=class{instanceKeyToPrototype=new Map;prototypeToInstanceKey=new Map;prototypeToSource=new Map;prototypeToPrimIndexes=new Map;primIndexToPrototype=new Map;pendingAddedPrimIndexes=new Map;pendingRemovedPrimIndexes=new Map;lastPrototypeIndex=0;registerInstancePrimIndex(e,t){let r=this.pendingAddedPrimIndexes.get(t);r||(r=new Set,this.pendingAddedPrimIndexes.set(t,r)),r.add(e);let i=this.instanceKeyToPrototype.get(t);return i===void 0?r.size===1:this.prototypeToSource.get(i)===e}unregisterInstancePrimIndexesUnder(e){for(let[t,r]of this.primIndexToPrototype){if(!qA(t,e))continue;let i=this.prototypeToInstanceKey.get(r);if(i===void 0)continue;let s=this.pendingRemovedPrimIndexes.get(i);s||(s=new Set,this.pendingRemovedPrimIndexes.set(i,s)),s.add(t)}}processChanges(){return Gy(WA(this),"usd-ts:UsdInstanceCache.processChanges",e=>(e&&(fe(e,"pendingAddedKeys",this.pendingAddedPrimIndexes.size),fe(e,"pendingRemovedKeys",this.pendingRemovedPrimIndexes.size)),this._processChanges()))}_processChanges(){let e={newPrototypePrims:[],newPrototypePrimIndexes:[],changedPrototypePrims:[],changedPrototypePrimIndexes:[],deadPrototypePrims:[]},t=new Set;for(let[i,s]of this.pendingRemovedPrimIndexes){let o=this.pendingAddedPrimIndexes.get(i)??new Set,a=[...s].filter(d=>!o.has(d)),c=this.instanceKeyToPrototype.get(i);if(c===void 0)continue;let l=this.prototypeToPrimIndexes.get(c)??[],u=this.prototypeToSource.get(c);for(let d of a){let p=l.indexOf(d);p>=0&&l.splice(p,1),this.primIndexToPrototype.delete(d)}u!==void 0&&a.includes(u)&&(this.prototypeToSource.delete(c),l.length>0&&(l.sort(),this.prototypeToSource.set(c,l[0]),t.add(c))),this.prototypeToPrimIndexes.set(c,l)}let r=[...this.pendingAddedPrimIndexes.entries()].sort((i,s)=>{let o=[...i[1]][0]??"",a=[...s[1]][0]??"";return a.split("/").length-o.split("/").length||o.localeCompare(a)});for(let[i,s]of r){let o=[...s][0],a=[...s].sort(),c=this.instanceKeyToPrototype.get(i);c===void 0?(c=`/__Prototype_${++this.lastPrototypeIndex}`,this.instanceKeyToPrototype.set(i,c),this.prototypeToInstanceKey.set(c,i),this.prototypeToSource.set(c,o),this.prototypeToPrimIndexes.set(c,[]),e.newPrototypePrims.push(c),e.newPrototypePrimIndexes.push(o)):this.prototypeToSource.has(c)||(this.prototypeToSource.set(c,o),t.add(c));let l=this.prototypeToPrimIndexes.get(c)??[];for(let u of a)this.primIndexToPrototype.set(u,c),l.includes(u)||l.push(u);l.sort(),this.prototypeToPrimIndexes.set(c,l)}for(let i of t){let s=this.prototypeToSource.get(i);s!==void 0&&(e.changedPrototypePrims.push(i),e.changedPrototypePrimIndexes.push(s))}for(let i of this.pendingRemovedPrimIndexes.keys()){let s=this.instanceKeyToPrototype.get(i);s!==void 0&&((this.prototypeToPrimIndexes.get(s)??[]).length>0||(e.deadPrototypePrims.push(s),this.instanceKeyToPrototype.delete(i),this.prototypeToInstanceKey.delete(s),this.prototypeToSource.delete(s),this.prototypeToPrimIndexes.delete(s)))}return this.pendingAddedPrimIndexes.clear(),this.pendingRemovedPrimIndexes.clear(),e}getInstancingInfo(){return{instanceToProto:new Map(this.primIndexToPrototype),protoToSource:new Map(this.prototypeToSource)}}getPrototypeForInstanceablePrimIndexPath(e){return this.primIndexToPrototype.get(e)}getPrimsInPrototypesUsingPrimIndexPath(e){let t=[],r=e;for(;r!=="/";){let i=this._findInstanceAtOrAbove(r);if(!i)break;let[s,o]=i,a=this.prototypeToSource.get(o);if(a===void 0||((r===a||r.startsWith(`${a}/`))&&t.push(ul(e,a,o)),s!==r))break;r=QA(s)}return[...new Set(t)]}isPathDescendantToAnInstance(e){return this._findStrictInstanceAncestor(e)!==void 0}getPathInPrototypeForInstancePath(e){let t=e;if(bs(e)){let i=[...this.prototypeToSource.keys()].filter(s=>e===s||e.startsWith(`${s}/`)).sort((s,o)=>o.length-s.length)[0];if(i===void 0)return;t=ul(e,i,this.prototypeToSource.get(i))}let r=t;for(;r!==void 0;){let i=this._findStrictInstanceAncestor(r);if(!i)break;let[s,o]=i,a=this.prototypeToSource.get(o);if(a===void 0)break;if(s===a)return ul(r,s,o);r=ul(r,s,a)}}getMostAncestralInstancePath(e){return[...this.primIndexToPrototype.keys()].filter(t=>e.startsWith(`${t}/`)).sort((t,r)=>t.length-r.length)[0]}_findInstanceAtOrAbove(e){let t=[...this.primIndexToPrototype.keys()].filter(r=>e===r||e.startsWith(`${r}/`)).sort((r,i)=>i.length-r.length)[0];return t===void 0?void 0:[t,this.primIndexToPrototype.get(t)]}_findStrictInstanceAncestor(e){let t=[...this.primIndexToPrototype.keys()].filter(r=>e.startsWith(`${r}/`)).sort((r,i)=>i.length-r.length)[0];return t===void 0?void 0:[t,this.primIndexToPrototype.get(t)]}};function Ly(n,e){let t=Dp.get(n);t||(t={current:void 0,installations:[]},Dp.set(n,t));let r={};return t.installations.length===0&&(t.current?t.base=t.current:delete t.base),t.installations.push({token:r,context:e}),t.current=e,{holder:t,token:r}}function Oy(n,e){let t=n.installations.findIndex(r=>r.token===e);t>=0&&n.installations.splice(t,1),n.current=n.installations.at(-1)?.context??n.base,n.installations.length===0&&delete n.base}function Fy(n,e,t){let{holder:r,token:i}=Ly(n,e);try{return t()}finally{Oy(r,i)}}async function By(n,e,t){let{holder:r,token:i}=Ly(n,e);try{return await t()}finally{Oy(r,i)}}var zo=(n,e)=>{let t=n<0?n+e:n;return t>=0&&t<e?t:void 0},Uy=(n,e)=>{if(n==="end")return e;let t=n<0?n+e:n;return t>=0&&t<=e?t:void 0},$y=(n,e)=>{if(e!==void 0)return e;let t=n[0];return typeof t=="string"?"":typeof t=="boolean"?!1:0},wt=class n{#e;constructor(e=[]){this.#e=[...e]}IsIdentity(){return this.#e.length===0}GetLiterals(){return this.#e.flatMap(e=>"value"in e?[e.value]:[])}GetMutableLiterals(){return[...this.GetLiterals()]}StreamCustom(e=String){return this.#e.map(t=>{let r=Object.entries(t).filter(([i])=>i!=="kind").map(([i,s])=>`${i}=${i==="value"?e(s):String(s)}`);return`${t.kind}(${r.join(", ")})`}).join("; ")}_serialization(){return this.#e}_transformLiterals(e){return new n(this.#e.map(t=>"value"in t?{...t,value:e(t.value)}:"fill"in t&&t.fill!==void 0?{...t,fill:e(t.fill)}:t))}equals(e){return this.#e.length!==e.#e.length?!1:this.#e.every((t,r)=>{let i=e.#e[r];if(!i||t.kind!==i.kind)return!1;let s=t,o=i,a=Object.keys(s);return a.length===Object.keys(o).length&&a.every(c=>s[c]===o[c])})}ComposeOver(e){if(e instanceof n)return new n([...e.#e,...this.#e]);let t=[...e];for(let r of this.#e)switch(r.kind){case"write":{let i=zo(r.index,t.length);i!==void 0&&(t[i]=r.value);break}case"writeRef":{let i=zo(r.source,t.length),s=zo(r.destination,t.length);i!==void 0&&s!==void 0&&(t[s]=t[i]);break}case"insert":{let i=Uy(r.index,t.length);i!==void 0&&t.splice(i,0,r.value);break}case"insertRef":{let i=zo(r.source,t.length),s=Uy(r.destination,t.length);i!==void 0&&s!==void 0&&t.splice(s,0,t[i]);break}case"erase":{let i=zo(r.index,t.length);i!==void 0&&t.splice(i,1);break}case"minSize":{if(r.size<0||t.length>=r.size)break;let i=$y(t,r.fill);for(;t.length<r.size;)t.push(i);break}case"setSize":{if(r.size<0)break;if(t.length>r.size)t.length=r.size;else{let i=$y(t,r.fill);for(;t.length<r.size;)t.push(i)}break}case"maxSize":r.size>=0&&t.length>r.size&&(t.length=r.size);break}return t}};var kt=n=>z.Define(n),dl={bool:kt("bool"),uchar:kt("uchar"),short:kt("short"),ushort:kt("ushort"),int:kt("int"),uint:kt("uint"),int64:kt("int64"),uint64:kt("uint64"),half:kt("half"),float:kt("float"),double:kt("double"),string:kt("string"),token:kt("token"),dictionary:kt("VtDictionary")},zy=Object.values(dl),Hy=()=>zy.length,Rp=n=>zy.indexOf(n);function Ep(n){let e=n?.GetTypeName();return e==="bool"?!1:e==="string"||e==="token"?"":0}var XA=Object.freeze({ValueTypes:dl,GetNumKnownValueTypes:Hy,GetKnownValueTypeIndex:Rp,Zero:Ep});var pl=class{constructor(e){this.val=e}},fl=class{Hold(e){return new pl(e)}},YA=new fl;var hl=class{},JA=new hl;var ov=new Map([["uchar",[0,255]],["short",[-32768,32767]],["ushort",[0,65535]],["int",[-2147483648,2147483647]],["uint",[0,4294967295]],["int64",[Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER]],["uint64",[0,Number.MAX_SAFE_INTEGER]]]),L3=new Set([...ov.keys(),"half","float","double"]);var Vp=class n{static EndIndex=Number.MIN_SAFE_INTEGER;#e=[];Write(e,t){return this.#e.push({kind:"write",value:e,index:t}),this}WriteRef(e,t){return this.#e.push({kind:"writeRef",source:e,destination:t}),this}Insert(e,t){return this.#e.push({kind:"insert",value:e,index:t===n.EndIndex?"end":t}),this}InsertRef(e,t){return this.#e.push({kind:"insertRef",source:e,destination:t===n.EndIndex?"end":t}),this}Prepend(e){return this.Insert(e,0)}PrependRef(e){return this.InsertRef(e,0)}Append(e){return this.Insert(e,n.EndIndex)}AppendRef(e){return this.InsertRef(e,n.EndIndex)}EraseRef(e){return this.#e.push({kind:"erase",index:e}),this}MinSize(e,t){return this.#e.push({kind:"minSize",size:e,fill:t}),this}SetSize(e,t){return this.#e.push({kind:"setSize",size:e,fill:t}),this}MaxSize(e){return this.#e.push({kind:"maxSize",size:e}),this}static Optimize(e){return new wt(e._serialization())}static GetSerializationData(e){return JSON.stringify(e._serialization())}static CreateFromSerializationData(e){let t=JSON.parse(e);if(!Array.isArray(t))throw new TypeError("invalid VtArrayEdit serialization");return new wt(t)}FinalizeAndReset(){let e=new wt(this.#e);return this.#e=[],e}};var Gp=class n{static EndIndex=Number.MIN_SAFE_INTEGER;static NumOps=10;instructions;constructor(e=[]){this.instructions=e.map(t=>[...t])}static IsValidOp(e){return Number.isInteger(e)&&e>=0&&e<n.NumOps}static GetArity(e){return[0,1,2,3,6,8].includes(e)?2:1}IsEmpty(){return this.instructions.length===0}ForEach(e){for(let[t,r,i]of this.instructions)e(t,r,i)}ForEachValid(e,t,r){this.ForEach((i,s,o)=>{if(!n.IsValidOp(i)||[0,2,6,8].includes(i)&&(s<0||s>=e))return;let a=c=>c===n.EndIndex?t:c!==void 0&&c<0?c+t:c;r(i,a(s),a(o))})}ModifyEach(e){this.instructions.splice(0,this.instructions.length,...this.instructions.map(([t,r,i])=>e(t,r,i)))}};function gl(n,e){return n==="/"?`.${e}`:`${n}.${e}`}var av=()=>({source:"none",valueIsBlocked:!1});function*ml(n,e){let t=-1;for(let r of n.getNodeRange()){if(t++,r.inert)continue;let i=R(r.path.appendProperty(e));for(let s=0;s<r.layerStack.layers.length;s++){let{layer:o,offset:a}=r.layerStack.layers[s];yield{nodeIndex:t,layerIndex:s,node:r,layer:o,specPath:i,layerToStageOffset:Be(r.mapToRoot.getTimeOffset(),a)}}}}function jy(n,e,t,r=[]){let i=!1,s=[],o=[...ml(n,e)].some(u=>u.layer.getField(u.specPath,"typeName")==="pathExpression"),a=(u,d,p)=>{if(!o||typeof u!="string")return u;let f=p.lastIndexOf("."),h=V.fromString(f<0?p:p.slice(0,f)),y=new gt(u).makeAbsolute(h);return d.mapToRoot.mapSourceToTarget(d.path).isEmpty()?new gt(""):y.mapPaths(m=>d.mapToRoot.mapSourceToTarget(m))},c=u=>u instanceof wt||u instanceof gt,l=()=>{for(let m=0;m+1<s.length;m++)s[m].nextWeaker=s[m+1];let u=m=>{let P;for(let b of m)if(P instanceof wt)if(b instanceof wt)P=P.ComposeOver(b);else return Array.isArray(b)?P.ComposeOver(b):P.ComposeOver([]);else if(P instanceof gt)if(b instanceof gt)P=P.composeOver(b);else return P.composeOver(new gt("")).text;else if(b instanceof wt)P=b;else if(b instanceof gt)P=b;else return b;return P instanceof wt?P.ComposeOver([]):P instanceof gt?P.composeOver(new gt("")).text:P},d=[...new Set(s.flatMap(m=>m.source==="timeSamples"?(m.timeSamples??[]).map(([P])=>P):[]))].sort((m,P)=>m-P),p=(m,P)=>{let b=m[0]?.[1];for(let[S,x]of m){if(S>P)break;b=x}return b},f=d.map(m=>[m,u(s.map(P=>P.source==="timeSamples"?p(P.timeSamples??[],m):P.value))]),h=(m,P)=>{for(let b of s){if(b.source!=="timeSamples")continue;let S=b.timeSamples??[],x=p(S,m),v=p(S,P);if(x!==v)return c(x)&&c(v)}return!1},y=(m,P)=>{if(f.length===0)return u(s.map(T=>T.value));if(m<=f[0][0])return f[0][1];if(m>f[f.length-1][0])return f[f.length-1][1];let b=f.findIndex(([T])=>T===m);if(b>=0&&!P)return f[b][1];let S=b>=0?b:1;if(b<0)for(;f[S][0]<m;)S++;let x=f[S-1],v=f[S];return h(x[0],v[0])?x[1]:Nn([x,v],m,void 0,P)},g=s[0];return g.valueEvaluator=y,typeof t=="number"?g.value=y(t,!1):(t==="default"||f.length===0)&&(g.value=y(0,!1)),g};for(let{nodeIndex:u,layerIndex:d,node:p,layer:f,specPath:h,layerToStageOffset:y}of ml(n,e)){if(t!=="default"&&!i){let m=f.getField(h,"timeSamples");if(m!=null){let b=cv(m);if(b.length>0){let S={source:"timeSamples",valueIsBlocked:!1,timeSamples:b.map(([x,v])=>[Ce(y,x),a(lv(v),p,h)]),layer:f,specPath:h,layerToStageOffset:y,node:p};if(s.length>0||S.timeSamples.some(([,x])=>c(x))){if(s.push(S),!S.timeSamples.some(([,x])=>c(x)))return l();continue}return S}}let P=f.getField(h,"spline");if(P!=null)return{source:"spline",spline:P,valueIsBlocked:!1,layer:f,specPath:h,layerToStageOffset:y,node:p}}let g=a(f.getField(h,"default"),p,h);if(g!==void 0){if(g instanceof ke){i=!0;continue}if(g instanceof Q||g===null)return s.length>0?l():{source:"none",valueIsBlocked:!0,layer:f,specPath:h,layerToStageOffset:y,node:p};if(c(g)){let m={source:"default",value:g,valueIsBlocked:!1,layer:f,specPath:h,layerToStageOffset:y,node:p};s.push(m);continue}return s.length>0&&(Array.isArray(g)||g instanceof gt)?(s.push({source:"default",value:g,valueIsBlocked:!1,layer:f,specPath:h,layerToStageOffset:y,node:p}),l()):{source:"default",value:g,valueIsBlocked:!1,layer:f,specPath:h,layerToStageOffset:y,node:p}}if(t!=="default"&&!i)for(let m of r){if(m.position[0]!==u||m.position[1]!==d)continue;let P=m.resolve(t);if(P)return P}}return s.length>0?l():av()}function gn(n,e){return yl(n,e)?.value}function yl(n,e){for(let t of n.getNodeRange()){if(t.inert)continue;let r=R(t.path);for(let{layer:i,offset:s}of t.layerStack.layers){let o=i.getField(r,e);if(o!=null)return{value:o,layer:i,specPath:r,layerToStageOffset:Be(t.mapToRoot.getTimeOffset(),s),node:t}}}}function Wy(n){let e=new Set;for(let a of n.getNodeRange())if(!a.inert)for(let{layer:c}of a.layerStack.layers){let l=c.getField(R(a.path),"properties");if(l)for(let u of l)e.add(u)}let t=[...e].sort(Wr),r=gn(n,"propertyOrder");if(!Array.isArray(r)||r.length===0)return t;let i=new Set(t),s=r.filter((a,c)=>i.has(a)&&r.indexOf(a)===c),o=new Set(s);return[...s,...t.filter(a=>!o.has(a))]}function Ps(n,e,t){return bl(n,e,t)?.value}function Mp(n,e,t){let r=[...n.getNodeRange()];for(let i=r.length-1;i>=0;--i){let s=r[i];if(s.inert)continue;let o=gl(R(s.path),e);for(let a=s.layerStack.layers.length-1;a>=0;--a){let c=s.layerStack.layers[a].layer,l=c.getField(o,t);if(l!=null)return l;if(c.hasSpec(o))return t==="custom"?!1:c.getSpecType(o)==="relationship"?"uniform":"varying"}}}function Ky(n,e){let t=[...n.getNodeRange()];for(let r=t.length-1;r>=0;--r){let i=t[r];if(i.inert)continue;let s=gl(R(i.path),e);for(let o=i.layerStack.layers.length-1;o>=0;--o)if(i.layerStack.layers[o].layer.getField(s,"custom")===!0)return!0}return!1}function bl(n,e,t){for(let r of n.getNodeRange()){if(r.inert)continue;let i=gl(R(r.path),e);for(let{layer:s,offset:o}of r.layerStack.layers){let a=s.getField(i,t);if(a!=null)return{value:a,layer:s,specPath:i,layerToStageOffset:Be(r.mapToRoot.getTimeOffset(),o),node:r}}}}function Pl(n){let e=!1;for(let t of n.getNodeRange()){if(t.inert)continue;let r=R(t.path);for(let{layer:i}of t.layerStack.layers){let s=i.getField(r,"specifier");if(s==="def"||s===0)return"def";if(s==="class"||s===2){let o=!1;for(let a=t;a!==null;a=a.parent)if(_o(a.arcType)&&!a.isDueToAncestor()){o=!0;break}if(!o)return"class";e=!0}}}return e?"class":"over"}function Sl(n,e){let t=[];e:for(let r of n.getNodeRange()){if(r.inert)continue;let i=R(r.path);for(let{layer:s}of r.layerStack.layers){let o=Fe(s.getField(i,e));if(o!==null&&(t.push(o),o.isExplicit))break e}}return es(t)}function qy(n,e,t,r,i=s=>s){let s=[],o=!1;for(let a of[...n.getNodeRange()].reverse()){if(a.inert)continue;let c=gl(R(a.path),e);for(let l=a.layerStack.layers.length-1;l>=0;l--){let{layer:u}=a.layerStack.layers[l],d=u.getField(c,t);if(d==null)continue;let p=Fe(d);if(p===null)continue;let f=(h,y)=>h.flatMap(g=>{let m=V.fromString(g),P=a.mapToRoot.mapSourceToTarget(m);if(P.isEmpty())return[];if(y&&r&&_o(a.arcType)){let b=_t(a);if(!m.hasPrefix(b)){let S=a.mapToRoot.mapSourceToTarget(b);if(!S.isEmpty()&&P.hasPrefix(S))return[]}}return[i(P.pathString)]});s=Tt(s,{isExplicit:p.isExplicit,explicitItems:f(p.explicitItems,!0),prependedItems:f(p.prependedItems,!0),appendedItems:f(p.appendedItems,!0),deletedItems:f(p.deletedItems,!1),orderedItems:f(p.orderedItems,!0)}),o=!0}}return o?s:void 0}function cv(n){return Array.isArray(n)?n:typeof n=="object"&&n!==null?Object.entries(n).map(([e,t])=>[Number(e),t]).sort(([e],[t])=>e-t):[]}function lv(n){return typeof n=="object"&&n!==null&&"value"in n?n.value:n}var ge={All:"all",Only:"only",None:"none"},Si=(n,e)=>n===e||e==="/"||n.startsWith(`${e}/`),Lp=(n,e)=>n[0]<e[0]?-1:n[0]>e[0]?1:0,or=class n{static AllRule=ge.All;static OnlyRule=ge.Only;static NoneRule=ge.None;rules=[];constructor(e=!0){e||this.rules.push(["/",ge.None])}static loadAll(){return new n}static loadNone(){return new n(!1)}clone(){let e=new n;return e.setRules(this.rules),e}getRules(){return this.rules.map(([e,t])=>[e,t])}setRules(e){this.rules=e.map(([t,r])=>[t,r]).sort(Lp)}addRule(e,t){let r=this.rules.findIndex(([i])=>i===e);r>=0?this.rules[r]=[e,t]:this.rules.push([e,t]),this.rules.sort(Lp)}loadWithDescendants(e){this.replaceSubtree(e,ge.All)}loadWithoutDescendants(e){this.replaceSubtree(e,ge.Only)}unload(e){this.replaceSubtree(e,ge.None)}loadAndUnload(e,t,r="withDescendants"){for(let i of t)this.unload(i);for(let i of e)r==="withDescendants"?this.loadWithDescendants(i):this.loadWithoutDescendants(i)}minimize(){let e=[];for(let t of this.rules){let r=ge.All,i=-1;for(let[s,o]of e)s.length>i&&Si(t[0],s)&&(r=o,i=s.length);t[1]!==r&&e.push(t)}this.rules=e}isLoaded(e){return this.getEffectiveRuleForPath(e)!==ge.None}isLoadedWithAllDescendants(e){let t=this.longestPrefix(e);return t&&t[1]!==ge.All?!1:this.rules.filter(([r])=>Si(r,e)).every(([,r])=>r===ge.All)}isLoadedWithNoDescendants(e){return this.rules.find(([r])=>r===e)?.[1]!==ge.Only?!1:!this.rules.some(([r,i])=>r!==e&&Si(r,e)&&i!==ge.None)}getEffectiveRuleForPath(e){let t=this.longestPrefix(e);if(!t||t[1]===ge.All)return ge.All;if(t[0]===e&&t[1]===ge.Only)return ge.Only;let r=this.rules.filter(([i])=>i!==e&&Si(i,e));for(let i=0;i<r.length;){let[s,o]=r[i];if(o===ge.All||o===ge.Only)return ge.Only;for(i++;i<r.length&&Si(r[i][0],s);)i++}return ge.None}equals(e){return JSON.stringify(this.rules)===JSON.stringify(e.rules)}isIncluded(e){return this.isLoaded(e)}include(e){let t=JSON.stringify(this.rules);return this.loadWithDescendants(e),t!==JSON.stringify(this.rules)}exclude(e){let t=JSON.stringify(this.rules);return this.unload(e),t!==JSON.stringify(this.rules)}replaceSubtree(e,t){this.rules=this.rules.filter(([r])=>!Si(r,e)),this.rules.push([e,t]),this.rules.sort(Lp)}longestPrefix(e){let t;for(let r of this.rules)Si(e,r[0])&&(!t||r[0].length>t[0].length)&&(t=r);return t}};var Ti=class n{paths=[];static all(){return new n(["/"])}constructor(e=[]){for(let t of e)this.add(t)}add(e){if(!e.startsWith("/")||e.includes("."))throw new Error(`Population mask paths must be absolute prim paths; got <${e}>`);this.paths.some(t=>xi(e,t))||(this.paths=[...this.paths.filter(t=>!xi(t,e)),e].sort())}getPaths(){return this.paths}isEmpty(){return this.paths.length===0}includes(e){return this.paths.some(t=>xi(e,t)||xi(t,e))}includesSubtree(e){return this.paths.some(t=>xi(e,t))}getIncludedChildNames(e){if(this.includesSubtree(e))return{all:!0,names:[]};let t=e==="/"?"/":`${e}/`,r=new Set;for(let i of this.paths){if(!i.startsWith(t))continue;let s=i.slice(t.length),o=s.indexOf("/");r.add(o<0?s:s.slice(0,o))}return{all:!1,names:[...r].sort()}}equals(e){return this.paths.length===e.paths.length&&this.paths.every((t,r)=>t===e.paths[r])}getUnion(e){let t=new n(this.paths);if(typeof e=="string")t.add(e);else for(let r of e.paths)t.add(r);return t}getIntersection(e){let t=new n;for(let r of this.paths)for(let i of e.paths)xi(r,i)?t.add(r):xi(i,r)&&t.add(i);return t}includesMask(e){return this.getUnion(e).equals(this)}};function xi(n,e){return n===e||e==="/"||n.startsWith(`${e}/`)}function Ss(n,e,t){let r=No(n.rootNode);if(r===null)return null;let i=pv(n),s=e?fv(n.path,e):"",o=t?JSON.stringify(hv(n.path,t).getPaths()):"all";return`${r}\0clips=${i}\0load=${s}\0mask=${o}`}var uv=0,Qy=new WeakMap;function dv(n){let e=Qy.get(n);return e===void 0&&(e=++uv,Qy.set(n,e)),e}function pv(n){let e=tl(n);return e?e.map(t=>`${t.name}|ls${dv(t.sourceLayerStack)}|${t.sourcePrimPath}|li${t.indexOfLayerWhereAssetPathsFound}|${JSON.stringify(t.def)}|${t.timeOffset.offset}:${t.timeOffset.scale}`).join(";"):""}function fv(n,e){let t=e.getEffectiveRuleForPath(n),r=`${n}/`,i=[["/",t]];for(let[o,a]of e.getRules())o!==n&&o.startsWith(r)&&i.push([`/${o.slice(r.length)}`,a]);let s=new or;return s.setRules(i),s.minimize(),JSON.stringify(s.getRules())}function hv(n,e){let t=`${n}/`,r=[];for(let i of e.getPaths())i===n?r.push("/"):i.startsWith(t)&&r.push(`/${i.slice(t.length)}`);return new Ti(r)}function xl(n,e,t,r){return async i=>{if(!i||e.has(i))return null;try{let s=await Ji(i,t,r);return n?.add(s),s}catch{return null}}}var mv=["typeName"];function xs(n,e,t,r,i){i?.recordComputationEvent("materialization",t);let s=gn(n,"active"),o=s===void 0?!0:!!s,a={};a.specifier=Pl(n);let c=gn(n,"typeName");c!==void 0&&(a.typeName=c),s!==void 0&&(a.active=o);let l=gn(n,"instanceable");l!==void 0&&(a.instanceable=!!l);let u=gn(n,"kind");u!==void 0&&(a.kind=u);let d=gn(n,"assetInfo");d!==void 0&&(a.assetInfo=d);let p=gn(n,"clips");p!==void 0&&(a.clips=p);let f=gn(n,"clipSets");f!==void 0&&(a.clipSets=f);let h=gn(n,"propertyOrder");h!==void 0&&(a.propertyOrder=h);let y=gn(n,"sdrMetadata");y!==void 0&&(a.sdrMetadata=y);let g=Sl(n,"apiSchemas");if(g.length>0&&(a.apiSchemas=g),r!==void 0&&(a.__prototypePath=r),e.set(t,{fields:a}),!o)return!1;for(let m of Wy(n)){let P=`${t==="/"?"":t}.${m}`,b={};for(let S of mv){let x=Ps(n,m,S);x!==void 0&&(b[S]=x)}e.set(P,{fields:b})}return!0}function Xy(n,e,t,r){xs(n,e,t,r)}async function Yy(n,e,t,r,i,s){let o=new Set;return await rl(n,async c=>{let l=await r(c);return l&&o.add(l),l}),xs(n,e,t,s,i),o}var Zt=(n,e)=>n==="/"?`/${e}`:`${n}/${e}`;async function gv(n,e=new sr,t=i=>Ss(i),r){return ys(Jc(n),"usd-ts:discoverStageNamespace",i=>(i&&fe(i,"rootPath","/"),yv(n,e,t,r,i)))}async function yv(n,e,t,r,i){let s=new Map,o=new Map;e.unregisterInstancePrimIndexesUnder("/");let a=async u=>{n.recordComputationEvent("namespaceDiscovery",u);let d=await gp(n,u,i),p=d.computePrimChildNames();if(r){let f=r.getIncludedChildNames(u);f.all||(p=p.filter(h=>f.names.includes(h)))}if(s.set(u,p),u!=="/"){let f=t(d);if(f!==null&&(o.set(u,f),!e.registerInstancePrimIndex(u,f)&&!u.startsWith("/Flattened_Prototype_")))return}for(let f of p)await a(Zt(u,f))};await a("/");let c={newPrototypePrims:[],newPrototypePrimIndexes:[],changedPrototypePrims:[],changedPrototypePrimIndexes:[],deadPrototypePrims:[]},l=async()=>{let u=Fy(e,i,()=>e.processChanges());if(c.newPrototypePrims.push(...u.newPrototypePrims),c.newPrototypePrimIndexes.push(...u.newPrototypePrimIndexes),c.changedPrototypePrims.push(...u.changedPrototypePrims),c.changedPrototypePrimIndexes.push(...u.changedPrototypePrimIndexes),c.deadPrototypePrims.push(...u.deadPrototypePrims),u.changedPrototypePrimIndexes.length!==0){for(let d of u.changedPrototypePrimIndexes)await a(d);await l()}};return await l(),{cache:n,childrenByPrim:s,instanceKeys:o,instancing:e.getInstancingInfo(),instanceChanges:c}}async function Zy(n,e,t=i=>Ss(i),r){let i=new Map,s=new Map,o=async a=>{n.recordComputationEvent("namespaceDiscovery",a);let c=await n.computePrimIndex(a),l=c.computePrimChildNames();if(!c.hasSpecs()&&l.length===0)return;if(r&&!r.includesSubtree(a)){let d=r.getIncludedChildNames(a);d.all||(l=l.filter(p=>d.names.includes(p)))}i.set(a,l);let u=t(c);u!==null&&s.set(a,u);for(let d of l)await o(Zt(a,d))};for(let a of e)await o(a);return{cache:n,childrenByPrim:i,instanceKeys:s}}async function Jy(n,e,t,r,i=new Map){let{cache:s,childrenByPrim:o}=n,a=new Map,c=new Map,l=new Map;for(let p of o.keys()){s.recordComputationEvent("usdDependencyResolution",p);let f=s.findPrimIndex(p),h=new Set,g=await rl(f,async m=>{let P=await t(m);return P&&h.add(P),P});g&&c.set(p,g),h.size>0&&l.set(p,h)}let u=p=>{let f=s.findPrimIndex(p);if(!f||!o.has(p))return;let h=r.get(p);if(!(!xs(f,a,p,h,s)||h!==void 0))for(let g of o.get(p)??[])u(Zt(p,g))};for(let p of e)u(p);let d=(p,f)=>{let h=s.findPrimIndex(p);if(!h||h.composePrimStack().length===0)return;let y=r.get(p);if(y!==void 0&&r.set(f,y),!(!xs(h,a,f,y,s)||y!==void 0))for(let m of o.get(p)??[])d(Zt(p,m),Zt(f,m))};for(let[p,f]of i){a.set(p,{fields:{}});for(let h of o.get(f)??[])d(Zt(f,h),Zt(p,h))}return{nodes:a,usdDependenciesByPrim:l,clipSetsByPrim:c}}async function bv(n,e,t=new sr){let r=Jc(n.cache);return ys(r,"usd-ts:materializeStageNodes",i=>(i&&fe(i,"primIndexCount",n.childrenByPrim.size),Pv(n,e,t)))}async function Pv(n,e,t){let{cache:r,childrenByPrim:i}=n,s=new Map,{instanceToProto:o,protoToSource:a}=n.instancing??t.getInstancingInfo(),c=new Map,l=new Map;for(let p of i.keys()){if(p==="/")continue;r.recordComputationEvent("usdDependencyResolution",p);let f=r.findPrimIndex(p)??await r.computePrimIndex(p),h=new Set,g=await rl(f,async m=>{let P=await e(m);return P&&h.add(P),P});g&&c.set(p,g),h.size>0&&l.set(p,h)}s.set("/",{fields:{}});let u=p=>{let f=r.findPrimIndex(p);if(!f)return;let h=o.get(p);if(!(!xs(f,s,p,h,r)||h!==void 0))for(let g of i.get(p)??[])u(Zt(p,g))};for(let p of i.get("/")??[])u(`/${p}`);let d=(p,f)=>{let h=r.findPrimIndex(p);if(!h||h.composePrimStack().length===0)return;let y=o.get(p);if(y!==void 0&&o.set(f,y),!(!xs(h,s,f,y,r)||y!==void 0))for(let m of i.get(p)??[])d(Zt(p,m),Zt(f,m))};for(let[p,f]of a){s.set(p,{fields:{}});for(let h of i.get(f)??[])d(Zt(f,h),Zt(p,h))}return{nodes:s,instancing:{instanceToProto:o,protoToSource:a},usdDependenciesByPrim:l,clipSetsByPrim:c}}async function eb(n,e,t,r,i,s,o,a,c,l,u,d){let f=xl(new Set,e,t,r),h=o??await hp(n,f,i,c,d);return o||mp(h,void 0),oo(r,d,()=>Eo(h,d,async()=>{h.setVariantFallbacks(s);let y=a??new sr,g=await gv(h,y,l,u),{nodes:m,instancing:P,usdDependenciesByPrim:b,clipSetsByPrim:S}=await bv(g,f,y),x=new Map;for(let[T,w]of b)x.set(T,new Set(w));let v=new Set;v.add(n),i&&v.add(i),h.forEachLayerUsed(T=>v.add(T));for(let T of x.values())for(let w of T)v.add(w);return{nodes:m,instancing:P,dependencies:v,usdDependenciesByPrim:x,clipSetsByPrim:S,cache:h}}))}function Sv(){Fu(te.GetInstance().GetAllPlugins())}function Op(n,e){return Sv(),Sr(n,e)}function jo(n,e,t,r){return Wa(n,Op(e,t),r)}function Tl(n){return n==="typeName"||n==="apiSchemas"?"typeInfo":n==="active"||n==="kind"||n==="specifier"||n==="clips"||n==="clipSets"?"recompose":"infoOnly"}function Al(n,e=[]){let t=new Set,r=n.didMaybeChangeLayers&&n.didChangeLayerStackFields.size===1&&n.didChangeLayerStackFields.has("subLayers");if(n.didMaybeChangeLayers&&!r&&t.add("/"),r)for(let h of n.didChangeLayerStackNamespace)t.add(h);for(let h of n.didChangeSignificantly)t.add(h);for(let h of n.didChangePrims)t.add(h);let i=new Set,s=new Set,o=new Set;for(let h of e){if((h.kind==="specAdded"||h.kind==="specRemoved")&&h.path.includes(".")){o.add(h.path);continue}if(h.path.includes(".")||h.kind!=="field"||h.fieldName===void 0)continue;let y=Tl(h.fieldName);y==="typeInfo"?s.add(h.path):y==="recompose"&&i.add(h.path)}for(let h of i)t.add(h);for(let h of s)t.add(h);for(let h of o)t.add(h);let a=nb(t),c=new Set;for(let h of n.didChangeSignificantly)c.add(h);for(let h of n.didChangeSpecs)c.add(tb(h));for(let h of n.didChangePrims)c.add(h);for(let h of i)c.add(h);let l=nb(c),u=h=>n.didMaybeChangeLayers&&!r||l.some(y=>Fp(h,y)),d=h=>a.some(y=>Fp(h,y)),p=[...new Set([...n.didChangeSpecs,...n.didChangeValues,...n.didChangeTargets,...n.didChangeLayerMetadata,...n.didChangeLayerStackValues,...r?["/"]:[]])].filter(h=>!d(h)).sort(),f=[...new Set([...n.didChangeValues,...n.didChangeTargets,...o,...s].filter(h=>!u(h)).map(tb))].sort();return{populationSubtreeRoots:l,propertyRematerializations:f,stageMetadataChanges:[...n.didChangeLayerMetadata].sort(),layerStackChanges:[...n.didChangeLayerStackFields].sort(),prototypeActions:[],fullPopulationRequired:n.didMaybeChangeLayers,noticeResyncPaths:a,noticeInfoOnlyPaths:p}}function tb(n){let e=n.lastIndexOf("/"),t=n.indexOf(".",e);return t<0?n:n.slice(0,t)}function Fp(n,e){return n===e||e==="/"||n.startsWith(`${e}/`)||n.startsWith(`${e}.`)}function nb(n){let e=[];for(let t of[...n].sort((r,i)=>r.length-i.length||r.localeCompare(i)))e.some(r=>Fp(t,r))||e.push(t);return e.sort()}var xv=new WeakMap;function rb(n,e){xv.get(n)?.(e)}function Av(n,e,t){return n===e?t:n.startsWith(`${e}/`)||n.startsWith(`${e}.`)?t+n.slice(e.length):n}var On={Local:0,Inherit:1,Variant:2,Relocate:3,Reference:4,Payload:5,Specialize:6},vv={0:On.Local,1:On.Inherit,2:On.Variant,3:On.Relocate,4:On.Reference,5:On.Payload,6:On.Specialize};function ib(n,e){return n.layer.getField(n.sourcePath,e)}async function sb(n,e,t,r,i,s={},o,a,c,l,u){return ys(u,"usd-ts:composeScene",async d=>{let{nodes:p,instancing:f,dependencies:h,usdDependenciesByPrim:y,clipSetsByPrim:g,cache:m}=await eb(n,e,t,r,i,s,o,a,P=>c?.isIncluded(P)??!0,P=>Ss(P,c,l),l,d);return{nodes:p,instancing:f,dependencies:h,usdDependenciesByPrim:y,clipSetsByPrim:g,cache:m}})}var ob=null;function _v(){let n={};for(let e of te.GetInstance().GetAllPlugins()){let t=e.GetMetadata().UsdVariantFallbacks;if(t!==void 0&&!(typeof t!="object"||t===null||Array.isArray(t)))for(let[r,i]of Object.entries(t)){if(!Array.isArray(i))continue;let s=i.filter(o=>typeof o=="string");s.length>0&&(n[r]=s)}}return n}var ab=n=>Object.fromEntries(Object.entries(n).map(([e,t])=>[e,[...t]]));function Iv(n){let e=new Set,t=n;for(;t&&!e.has(t);){if(e.add(t),Qt(t.arcType))return!0;t=t.origin===t?null:t.origin}return!1}var Ts=class n{_population;_primLoadFlags=new Map;_instanceCache;_loadRules;get nodes(){return this._population.nodes}_editTarget;_editTargetContext;rootLayerPath;_initialStartTimeCode;_initialEndTimeCode;_initialTimeCodesPerSecond;_initialFramesPerSecond;_interpolationType=Vd;constructor(e,t=null,r="",i,s=new sr,o=new or(!0)){this._population=new Sc(e),this._instanceCache=s,this._loadRules=o,this._editTarget=t,this._editTargetContext=t?new mn(t):null,this.rootLayerPath=r,this._initialStartTimeCode=i?.start,this._initialEndTimeCode=i?.end,this._initialTimeCodesPerSecond=i?.tps,this._initialFramesPerSecond=i?.fps,this._composeAndCacheLoadFlags()}_populationMask;getPopulationMask(){return this._populationMask??Ti.all()}async setPopulationMask(e){this._populationMask=e;let t=this._pcpCache;if(t){let i=new nr;i.didChangeSignificantlyAtPath("/"),await i.apply(t)}let r={populationSubtreeRoots:["/"],propertyRematerializations:[],stageMetadataChanges:[],layerStackChanges:[],prototypeActions:[],fullPopulationRequired:!0,noticeResyncPaths:["/"],noticeInfoOnlyPaths:[]};await this._recompose(!1,r)}_numericLayerMetadata(e,t){let r=e?.getField("/",t);return typeof r=="number"?r:void 0}_numericRootMetadata(e){return this._numericLayerMetadata(this._rootLayer??this._editTarget,e)}_numericSessionMetadata(e){return this._numericLayerMetadata(this._sessionLayer,e)}get startTimeCode(){return this._rootLayer??this._editTarget?this._numericSessionMetadata("startTimeCode")??this._numericRootMetadata("startTimeCode"):this._initialStartTimeCode}get endTimeCode(){return this._rootLayer??this._editTarget?this._numericSessionMetadata("endTimeCode")??this._numericRootMetadata("endTimeCode"):this._initialEndTimeCode}get timeCodesPerSecond(){return this._rootLayer??this._editTarget?this._numericSessionMetadata("timeCodesPerSecond")??this._numericRootMetadata("timeCodesPerSecond")??this._numericSessionMetadata("framesPerSecond")??this._numericRootMetadata("framesPerSecond")??24:this._initialTimeCodesPerSecond??this._initialFramesPerSecond??24}getFramesPerSecond(){return this._rootLayer??this._editTarget?this._numericSessionMetadata("framesPerSecond")??this._numericRootMetadata("framesPerSecond")??24:this._initialFramesPerSecond??24}setInterpolationType(e){if(this._interpolationType===e)return;this._interpolationType=e;let t=this._withNamespaceEditMethods({resyncedPaths:["/"],changedInfoOnlyPaths:[]});for(let r of this._changeListeners)r(t)}getInterpolationType(){return this._interpolationType}hasAuthoredTimeRange(){let e=t=>this._numericLayerMetadata(t,"startTimeCode")!==void 0&&this._numericLayerMetadata(t,"endTimeCode")!==void 0;return e(this._sessionLayer)||e(this._rootLayer??this._editTarget)}static getGlobalVariantFallbacks(){return ab(ob??=_v())}static setGlobalVariantFallbacks(e){ob=ab(e)}_variantFallbacks=n.getGlobalVariantFallbacks();static async open(e,t){return kp(e,r=>n._open(e,t,r))}static async openMasked(e,t,r){let i=typeof e=="string"?e:e.filePath;return kp(i,s=>n._open(e,r,s,t))}static async _open(e,t,r,i){let s=Vt(),o=t?.resolverContext,a=o??new Pe,c=typeof e=="string"?await oo(a,r,()=>Ji(e,s,a)):e,l=o||typeof e!="string"?void 0:await s.resolve(e,a),u=o??s.createDefaultContextForAsset(l?.toString()||c.filePath),d=t?.sessionLayerPath?await oo(u,r,()=>Ji(t.sessionLayerPath,s,u)):Oe.createAnonymous("anon:session"),p=n.getGlobalVariantFallbacks(),f=new Set,h=new sr,y=new or(t?.loadPayloads!==!1),{nodes:g,instancing:m,dependencies:P,usdDependenciesByPrim:b,clipSetsByPrim:S,cache:x}=await sb(c,f,s,u,d,p,void 0,h,y,i,r),v=w=>{let D=c.getField("/",w);return typeof D=="number"?D:void 0},T=new n(g,c,c.filePath,{start:v("startTimeCode"),end:v("endTimeCode"),tps:v("timeCodesPerSecond"),fps:v("framesPerSecond")},h,y);return i&&(T._populationMask=i),T._rootLayer=c,T._sessionLayer=d,T._variantFallbacks=p,T._instancing=m,T._resolver=s,T._resolverContext=u,T._usedLayers=P,T._usdDependenciesByPrim=b,T._clipSetsByPrim=S,T._pcpCache=x,T._muted=f,T._composeAndCacheLoadFlags(),T._refreshFallbackPrimTypes(T.nodes),T._subscribeRegistryLayers(),T._subscribeResolverChanges(),T}_rootLayer=null;_muted=new Set;_resolver;_resolverContext;get _arResolver(){return this._resolver}get _arResolverContext(){return this._resolverContext}_usedLayers=new Set;_mutedLayerPropertyPaths=new Map;_usdDependenciesByPrim=new Map;_clipSetsByPrim=new Map;_pcpCache=null;_canonicalLayerId(e){return this._rootLayer?.resolveAsset(e)||e}getMutedLayers(){return[...this._muted]}isLayerMuted(e){return this._muted.has(this._canonicalLayerId(e))}async muteLayer(e){await this.muteAndUnmuteLayers([e],[])}async unmuteLayer(e){await this.muteAndUnmuteLayers([],[e])}async load(e="/",t="withDescendants"){if(!this._isValidLoadPath(e))throw new Error(`Cannot load unknown prim <${e}>`);await this.loadAndUnload([e],[],t)}async unload(e="/"){await this.loadAndUnload([],[e])}async loadAndUnload(e,t,r="withDescendants"){let i=[...new Set(e)],s=[...new Set(t)];for(let d of i)if(!this._isValidLoadPath(d))throw new Error(`Cannot load unknown prim <${d}>`);if(s.length===0&&i.every(d=>r==="withDescendants"?this._loadRules.isLoadedWithAllDescendants(d):this._loadRules.isLoadedWithNoDescendants(d))||i.length===0&&s.every(d=>this._loadRules.getEffectiveRuleForPath(d)===or.NoneRule))return;let o=new Set(i),a=new Set(s),c=this._loadRules.clone();if(this._loadRules.loadAndUnload(o,a,r),this._loadRules.equals(c))return;for(let d of[...o]){let p=d;for(;;){let f=p.lastIndexOf("/");if(f<0)break;let h=f===0?"/":p.slice(0,f);if(this.getPrim(h)?.isLoaded){d!==p&&o.add(p);break}if(h==="/")break;p=h}}let l=[],u=[...o,...a].map(d=>this._instanceCache.getMostAncestralInstancePath(d)??d);for(let d of u.sort((p,f)=>p.length-f.length||p.localeCompare(f)))l.some(p=>d===p||p==="/"||d.startsWith(`${p}/`))||l.push(d);await this._applyPayloadLoadRules(l)}getLoadSet(){return[...this._pcpCache?.getIncludedPayloadPaths()??[]].filter(e=>this.nodes.has(e))}findLoadable(e="/"){return[...this._pcpCache?.findPayloadPaths(e)??[]]}_isPrimLoaded(e){return this._primLoadFlags.get(e)?.loaded??!1}_composeAndCacheLoadFlags(e=["/"]){if(e.length===0)return;let t=(o,a)=>o==="/"||a===o||a.startsWith(`${o}/`),r=[...new Set(e)].filter(o=>!e.some(a=>a!==o&&t(a,o)));for(let o of this._primLoadFlags.keys())r.some(a=>t(a,o))&&this._primLoadFlags.delete(o);let i=al(this.nodes).children,s=o=>{let a=this.nodes.get(o);if(!a)return;let c=o.lastIndexOf("/"),l=c<=0?"/":o.slice(0,c);if(o==="/"||$o(o))this._primLoadFlags.set(o,{active:!0,hasPayload:!1,loaded:!0});else{this._primLoadFlags.has(l)||s(l);let u=this._primLoadFlags.get(l),d=a.fields.active!==!1&&(u?.active??!0),p=this._getPrimQuerySource(o),f=p!==void 0&&[...p.index.getNodeRange()].some(y=>!y.culled&&!y.elided&&Er(y.layerStack,R(y.path),y.expressionVars).length>0),h=d&&(f?this._pcpCache.isPayloadIncluded(p.sourcePrimPath):u?.loaded??!0);this._primLoadFlags.set(o,{active:d,hasPayload:f,loaded:h})}};for(let o of r){let a=[o];for(;a.length>0;){let c=a.pop();if(s(c),this.nodes.has(c))for(let l of i.get(c)??[])a.push(l)}}}_hasClassSpecifier(e){let t=e;for(let[o,a]of this._instancing.protoToSource)if(e===o||e.startsWith(`${o}/`)){t=a+e.slice(o.length);break}let r=this._pcpCache?.findPrimIndex(t);if(!r)return this.nodes.get(e)?.fields.specifier==="class";let i=[...r.getNodeRange()],s=!1;for(let o of r.composePrimStack()){let a=o.layer.getField(R(o.path),"specifier");if(a==="def"||a===0)return!1;if(a!=="class"&&a!==2)continue;let c=i[o.nodeIndex]??null,l=!1;for(;c;){if(c.arcType===1&&!c.isDueToAncestor){l=!0;break}c=c.parent}if(!l)return!0;s=!0}return s}getLoadRules(){return this._loadRules.clone()}async setLoadRules(e){if(this._loadRules.equals(e))return;this._loadRules.setRules(e.getRules());let t=this._pcpCache;if(!t)return;let r=new nr;r.didChangeSignificantlyAtPath("/"),await r.apply(t);let i={populationSubtreeRoots:["/"],propertyRematerializations:[],stageMetadataChanges:[],layerStackChanges:[],prototypeActions:[],fullPopulationRequired:!0,noticeResyncPaths:["/"],noticeInfoOnlyPaths:[]};await this._recompose(!1,i)}async _applyPayloadLoadRules(e){let t=this._pcpCache;if(!t||e.length===0)return;let r=new nr,i=t.getIncludedPayloadPaths().filter(o=>e.some(a=>o===a||a==="/"||o.startsWith(`${a}/`)));t.requestPayloads([],i,r);for(let o of e)r.didChangeSignificantlyAtPath(o);await r.apply(t);let s={populationSubtreeRoots:[...e],propertyRematerializations:[],stageMetadataChanges:[],layerStackChanges:[],prototypeActions:[],fullPopulationRequired:!1,noticeResyncPaths:[...e],noticeInfoOnlyPaths:[]};await this._recomposeSubtrees(s)||await this._recompose(!1,s)}_isValidLoadPath(e){if(e==="/"||this.getPrim(e))return!0;let t=e;for(;t.includes("/");){if(t=t.slice(0,t.lastIndexOf("/"))||"/",t==="/")return!1;if(this.getPrim(t))return!0}return!1}async muteAndUnmuteLayers(e,t){let r=e.map(c=>this._canonicalLayerId(c)),i=t.map(c=>this._canonicalLayerId(c));if(this._rootLayer&&r.includes(this.rootLayerPath))throw new Error(`Cannot mute the stage's root layer: ${this.rootLayerPath}`);let s=new Set;for(let c of this._usedLayers){let l=this._canonicalLayerId(c.filePath);r.includes(l)&&(s.add(c),this._mutedLayerPropertyPaths.set(l,this._propertyPathsAffectedByLayers(new Set([c]))))}let o=this._propertyPathsAffectedByLayers(s);for(let c of i){let l=this._mutedLayerPropertyPaths.get(c);if(l)for(let u of l)o.add(u)}let a=!1;for(let c of i)this._muted.delete(c)&&(a=!0);for(let c of r)this._muted.has(c)||(this._muted.add(c),a=!0);if(a){for(let c of o)this._pendingChanges.add(c);await this._recompose();for(let c of i)this._muted.has(c)||this._mutedLayerPropertyPaths.delete(c)}}_propertyPathsAffectedByLayers(e){let t=new Set,r=this._pcpCache;if(!r)return t;let i=new Set(r.getLayerStack().layers.map(s=>s.layer));for(let s of e)for(let o of s.getSpecPaths()){let a=o.indexOf("["),c=a<0?o:o.slice(0,a);if(!c.includes("."))continue;let l=Gr(c),u=c.slice(l.length);for(let d of r.findSiteDependencies(s,l))t.add(d.indexPath==="/"&&u.startsWith("/")?u:`${d.indexPath}${u}`);i.has(s)&&t.add(c)}return t}async _recompose(e=!0,t){return Cp("usd-ts:Stage.recompose",r=>this._recomposeImpl(e,t,r))}async _recomposeInTraceContext(e,t,r){return ys(r,"usd-ts:Stage.recompose",i=>this._recomposeImpl(e,t,i))}async _recomposeImpl(e,t,r){let i=this._rootLayer??this._editTarget;if(!i)return;let s=new Map(this.nodes);e&&this._pcpCache&&await this._pcpCache.invalidateAll();let{nodes:o,instancing:a,dependencies:c,usdDependenciesByPrim:l,clipSetsByPrim:u,cache:d}=await sb(i,this._muted,this._resolver,this._resolverContext,this._sessionLayer??void 0,this._variantFallbacks,this._pcpCache??void 0,this._instanceCache,this._loadRules,this._populationMask,r);this._population.replaceAll(o),this._instancing=a,this._usedLayers=c,this._usdDependenciesByPrim=l,this._clipSetsByPrim=u,this._pcpCache=d,this._composeAndCacheLoadFlags(),this._subscribeRegistryLayers();let p=this._refreshFallbackPrimTypes(this.nodes),f=this._pendingResyncs,h=this._pendingChanges;if(this._pendingResyncs=new Set,this._pendingChanges=new Set,t){this._emitChangePlanNotice(this._mergeAuthoredNoticePaths(t,[...f],[...h]));return}if(this._changeListeners.size>0){let y=wp(s,this.nodes),g=new Set([...y.resyncedPaths,...f]);p&&g.add("/");let m=(S,x)=>x===S||x.startsWith(S==="/"?"/":`${S}/`),P=[];for(let S of[...g].sort())P.some(x=>m(x,S))||P.push(S);let b=[...new Set([...y.changedInfoOnlyPaths,...h])].filter(S=>!P.some(x=>m(x,Gr(S))));if(P.length>0||b.length>0){let S=this._withNamespaceEditMethods({resyncedPaths:P,changedInfoOnlyPaths:b});for(let x of this._changeListeners)x(S)}}}async _recomposeSubtrees(e){let t=this._rootLayer??this._editTarget,r=this._pcpCache;if(!t||!r||e.populationSubtreeRoots.includes("/"))return!1;let i=[...new Set(e.populationSubtreeRoots.map(b=>this._instanceCache.getMostAncestralInstancePath(b)??b))];for(let b of i)this._instanceCache.unregisterInstancePrimIndexesUnder(b);let s=await Zy(r,i,b=>Ss(b,this._loadRules,this._populationMask),this._populationMask),o=new Set;for(let[b,S]of s.instanceKeys)this._instanceCache.registerInstancePrimIndex(b,S)&&o.add(b);let a=this._instanceCache.processChanges(),c=this._instanceCache.getInstancingInfo(),l=new Map;for(let b=0;b<a.newPrototypePrims.length;b++)l.set(a.newPrototypePrims[b],a.newPrototypePrimIndexes[b]);for(let b=0;b<a.changedPrototypePrims.length;b++){let S=a.changedPrototypePrimIndexes[b];s.childrenByPrim.has(S)&&l.set(a.changedPrototypePrims[b],S)}for(let b of o){let S=this._instanceCache.getPrototypeForInstanceablePrimIndexPath(b);S!==void 0&&l.set(S,b)}let u=xl(void 0,this._muted,this._resolver,this._resolverContext),{nodes:d,usdDependenciesByPrim:p,clipSetsByPrim:f}=await Jy(s,i,u,c.instanceToProto,l),h=[...a.newPrototypePrims,...l.keys(),...a.deadPrototypePrims],y=[...new Set([...i,...h])],g=b=>y.some(S=>b===S||S==="/"||b.startsWith(`${S}/`));this._population.replaceSubtrees(d,y);for(let b of[...this._usdDependenciesByPrim.keys()])g(b)&&this._usdDependenciesByPrim.delete(b);for(let[b,S]of p)this._usdDependenciesByPrim.set(b,new Set(S));for(let b of[...this._clipSetsByPrim.keys()])g(b)&&this._clipSetsByPrim.delete(b);for(let[b,S]of f)this._clipSetsByPrim.set(b,S);this._instancing=c,this._composeAndCacheLoadFlags(y),this._rebuildUsedLayersFromRetainedDependencies(),this._refreshFallbackPrimTypes(this.nodes);let m=[...this._pendingResyncs],P=[...this._pendingChanges];return this._pendingResyncs=new Set,this._pendingChanges=new Set,this._emitChangePlanNotice(this._mergeAuthoredNoticePaths(e,m,P),[...a.newPrototypePrims,...a.deadPrototypePrims]),!0}_emitChangePlanNotice(e,t=[]){let r=this._resolvedAssetPathsResyncPending;if(this._resolvedAssetPathsResyncPending=!1,this._changeListeners.size===0)return;let i=c=>{let l=[];for(let u of c){let d=u.indexOf(".",u.lastIndexOf("/")),p=d<0?u:u.slice(0,d);if(!this._instanceCache.isPathDescendantToAnInstance(p)){l.push(u);continue}for(let f of this._instanceCache.getPrimsInPrototypesUsingPrimIndexPath(p))l.push(f+u.slice(p.length))}return l},s=[];for(let c of[...new Set([...i(e.noticeResyncPaths),...t])].sort((l,u)=>l.length-u.length||l.localeCompare(u)))s.some(l=>c===l||l==="/"||c.startsWith(`${l}/`)||c.startsWith(`${l}.`))||s.push(c);s.sort();let o=[...new Set(i(e.noticeInfoOnlyPaths))].filter(c=>!s.some(l=>c===l||l==="/"||c.startsWith(`${l}/`)||c.startsWith(`${l}.`))).sort();if(s.length===0&&o.length===0&&!r)return;let a=this._withNamespaceEditMethods({resyncedPaths:s,changedInfoOnlyPaths:[...o],...r?{resolvedAssetPathsResyncedPaths:s.includes("/")?[]:["/"]}:{}});for(let c of this._changeListeners)c(a)}_mergeAuthoredNoticePaths(e,t,r){let i=e.noticeResyncPaths.filter(s=>!t.some(o=>o!==s&&(o.startsWith(`${s}/`)||o.startsWith(`${s}.`))));return{...e,noticeResyncPaths:[...i,...t],noticeInfoOnlyPaths:[...e.noticeInfoOnlyPaths,...r]}}_populatedPathsForPrimIndexPath(e){return this._instanceCache.isPathDescendantToAnInstance(e)?this._instanceCache.getPrimsInPrototypesUsingPrimIndexPath(e):[e]}_fallbackPrimTypesJson="null";_refreshFallbackPrimTypes(e){let r=(this._rootLayer??this._editTarget)?.getField("/","fallbackPrimTypes"),i=JSON.stringify(r??null),s=i!==this._fallbackPrimTypesJson;this._fallbackPrimTypesJson=i;let o={};if(r!==null&&typeof r=="object"&&!Array.isArray(r)){for(let[c,l]of Object.entries(r))if(O.getConcreteTypeFromSchemaTypeName(c).IsUnknown()&&Array.isArray(l)){for(let u of l)if(typeof u=="string"&&!O.getConcreteTypeFromSchemaTypeName(u).IsUnknown()){o[c]=u;break}}}let a=e.get("/");return a&&(Object.keys(o).length>0?a.fields.__fallbackPrimTypes=o:delete a.fields.__fallbackPrimTypes),s}_changeListeners=new Set;_pendingChanges=new Set;_pendingResyncs=new Set;_pendingNamespaceEdit;_expectNamespaceEdit(e,t){this._pendingNamespaceEdit={oldPath:e,newPath:t}}_withNamespaceEditMethods(e){let t=this._pendingNamespaceEdit;return this._pendingNamespaceEdit=void 0,Ip(e,t)}onObjectsChanged(e){return this._changeListeners.add(e),()=>{this._changeListeners.delete(e)}}getVariantSets(e){return new Bo(this,e)}get _composedNodes(){return this.nodes}_sortedSpecsFor(e){if(this._pcpCache){let t=this._pcpCache.findPrimIndex(e);if(t)return t.composePrimStack().map(i=>({layer:i.layer,sourcePath:R(i.path),arc:[vv[i.arcType]??On.Local],offset:{offset:i.offset.offset,scale:i.offset.scale}}));let r=[];for(let i of this.getLayerStack(!0))i.getFieldNames(e).length>0&&r.push({layer:i,sourcePath:e,arc:[On.Local],offset:{offset:0,scale:1}});return r}return[]}_variantSetNames(e){let t=[];for(let r of this._sortedSpecsFor(e)){let i=ib(r,"variantSetChildren");if(Array.isArray(i))for(let s of i)t.includes(s)||t.push(s)}return t}_variantNames(e,t){let r=[];for(let i of this._sortedSpecsFor(e)){let s=`${i.sourcePath==="/"?"":i.sourcePath}{${t}=}`,o=i.layer.getField(s,"variantChildren");if(Array.isArray(o))for(let a of o)r.includes(a)||r.push(a)}return r}_variantSelection(e,t){let r=this._pcpCache?.findPrimIndex(e);if(r){for(let i of r.getNodeRange())if(i.arcType===2){let[s,o]=i.path.getVariantSelection();if(s===t)return o}return""}for(let i of this._sortedSpecsFor(e)){let o=ib(i,"variantSelection")?.[t];if(o!==void 0)return Array.isArray(o)?o[0]??"":o}return""}_batchDepth=0;_batchDirty=!1;async changeBlock(e){this._batchDepth+=1;try{return await e()}finally{this._batchDepth-=1,this._batchDepth===0&&this._batchDirty&&(this._batchDirty=!1,await this._recompose())}}async _recomposeForEdit(e){if(e&&this._pendingResyncs.add(e),this._batchDepth>0){this._batchDirty=!0;return}await this._recompose()}_layerSubscriptions=new Map;_suppressLayerNotices=0;_changesPending=!1;_changeFlush=null;_pendingLayerChanges=new Map;_resolverChangePending=!1;_resolvedAssetPathsResyncPending=!1;_subscribeResolverChanges(){let e=new WeakRef(this);Oi(t=>{let r=e.deref();!r||!t.affectsContext(r._resolverContext)||(r._resolverChangePending=!0,r._resolvedAssetPathsResyncPending=!0,r._scheduleRecompose())})}_subscribeRegistryLayers(){let e=new Set;this._rootLayer?e.add(this._rootLayer):this._editTarget&&e.add(this._editTarget),this._sessionLayer&&e.add(this._sessionLayer);for(let t of this._usedLayers)e.add(t);for(let[t,r]of this._layerSubscriptions)e.has(t)||(r(),this._layerSubscriptions.delete(t));for(let t of e)this._layerSubscriptions.has(t)||this._layerSubscriptions.set(t,t._registerDidChangeListener(r=>{this._onLayerDidChange(t,r)}))}_onLayerDidChange(e,t){if((t.fieldName==="clips"||t.fieldName==="clipSets")&&vy(e),this._suppressLayerNotices>0)return;let r=this._pendingLayerChanges.get(e);r?r.push(t):this._pendingLayerChanges.set(e,[t]),this._scheduleRecompose()}_scheduleRecompose(){if(this._changesPending=!0,this._changeFlush)return;let e=Promise.resolve().then(()=>Cp("usd-ts:Stage.processChanges",t=>{let r=()=>this._drainLayerChanges(t);if(!t)return r();let i=()=>By(this._instanceCache,t,r);return this._pcpCache?Eo(this._pcpCache,t,i):i()}));this._changeFlush=e,e.then(()=>this._finishChangeFlush(e),()=>this._finishChangeFlush(e))}_finishChangeFlush(e){this._changeFlush===e&&(this._changeFlush=null,this._changesPending&&this._scheduleRecompose())}async _drainLayerChanges(e){for(;this._changesPending;){this._changesPending=!1;let t=this._pendingLayerChanges;this._pendingLayerChanges=new Map,this._resolverChangePending&&(this._resolverChangePending=!1,await this._processResolverChange(e)),t.size>0&&await this._processLayerChanges(t,e)}}async _processResolverChange(e){let t=this._pcpCache;if(!t)return;let r=new nr;r.didChangeAssetResolver(t),await r.apply(t);let i=Al(r.getCacheChanges());if(i.populationSubtreeRoots.length>0){if(await this._recomposeSubtrees(i))return;await this._recomposeInTraceContext(!1,i,e);return}this._emitChangePlanNotice(i)}async _processLayerChanges(e,t){let r=this._pcpCache;if(!r&&e.size>0){let d=new gs,p=[];for(let[h,y]of e)for(let g of y)g.fieldName==="primChildren"||g.fieldName==="properties"||(p.push({path:g.path,kind:g.kind,...g.fieldName===void 0?{}:{fieldName:g.fieldName},layer:h,specPath:g.path}),(g.kind==="field"||g.kind==="timeSample")&&(g.fieldName==="connectionPaths"||g.fieldName==="targetPaths"?d.didChangeTargets.add(g.path):d.didChangeValues.add(g.path)));let f=Al(d,p);await this._recomposeInTraceContext(!0,f,t);return}if(!r||e.size===0){await this._recomposeInTraceContext(!0,void 0,t);return}let i=new nr,s=this._mapUsdLayerChanges(r,e);for(let[d,p]of e)i.didChange(r,p.map(f=>yp(d,f)));for(let d of s)d.kind==="field"&&d.fieldName==="active"&&i.didChangeSignificantlyAtPath(d.path);if(i.isEmpty()&&s.length===0){await this._recomposeInTraceContext(!0,void 0,t);return}let o=i.getCacheChanges();await i.apply(r);let a=Al(o,s);if(a.fullPopulationRequired||a.prototypeActions.length>0){await this._recomposeInTraceContext(!1,a,t);return}if(a.populationSubtreeRoots.length>0){if(await this._recomposeSubtrees(a))return;await this._recomposeInTraceContext(!1,void 0,t);return}let c=a.propertyRematerializations.filter(d=>a.noticeResyncPaths.some(p=>p.includes(".")&&Gr(p)===d)||a.noticeInfoOnlyPaths.includes(d));if(c.length>0){let d=xl(void 0,this._muted,this._resolver,this._resolverContext),p=new Map,f=[];for(let h of c){let y=r.findPrimIndex(h);if(y)for(let g of this._populatedPathsForPrimIndexPath(h))f.push(g),await Yy(y,p,g,d,r,this._instancing.instanceToProto.get(h))}this._population.replacePrims(p,f),this._composeAndCacheLoadFlags(f)}let l=[...this._pendingResyncs],u=[...this._pendingChanges];this._pendingResyncs=new Set,this._pendingChanges=new Set,this._emitChangePlanNotice(this._mergeAuthoredNoticePaths(a,l,u))}_mapUsdLayerChanges(e,t){let r=[];for(let[i,s]of t){let o=new Set,a=new Set(s.filter(l=>l.kind==="specAdded"&&l.inert).map(l=>l.path)),c=e.getLayerStack().layers.some(l=>l.layer===i);for(let l of s){if(l.fieldName==="specifier"&&l.oldValue===void 0&&l.newValue==="over"&&a.has(l.path))continue;let u=Gr(l.path),d=new Set;for(let p of e.findSiteDependencies(i,u)){let f=l.path.slice(u.length);d.add(p.indexPath==="/"&&f.startsWith("/")?f:`${p.indexPath}${f}`)}c&&d.add(l.path);for(let p of d){let f=`${l.kind}\0${p}\0${l.fieldName??""}`;o.has(f)||(o.add(f),r.push({path:p,kind:l.kind,...l.fieldName===void 0?{}:{fieldName:l.fieldName},layer:i,specPath:l.path}))}}}return r}_rebuildUsedLayersFromRetainedDependencies(){let e=new Set;this._rootLayer?e.add(this._rootLayer):this._editTarget&&e.add(this._editTarget),this._sessionLayer&&e.add(this._sessionLayer),this._pcpCache?.forEachLayerUsed(t=>e.add(t));for(let t of this._usdDependenciesByPrim.values())for(let r of t)e.add(r);this._usedLayers=e,this._subscribeRegistryLayers()}async flushChanges(){for(;this._changesPending||this._changeFlush;)this._changeFlush||this._scheduleRecompose(),await this._changeFlush}async _interim_flushChanges(){await this.flushChanges()}_ownAuthoring(e){if(this._pcpCache)return e();this._suppressLayerNotices+=1;try{return e()}finally{this._suppressLayerNotices-=1}}async _ownAuthoringAsync(e){this._suppressLayerNotices+=1;try{return await e()}finally{this._suppressLayerNotices-=1}}getSubLayerPaths(){let e=this._rootLayer?.getField("/","subLayers");return Array.isArray(e)?[...e]:[]}getSubLayerOffsets(){let e=this._rootLayer?.getField("/","subLayerOffsets");return Array.isArray(e)?[...e]:[]}_instancing=My;getPrimStack(e){let t=new Set(["specifier","primChildren","properties","form","fields"]),r=(i,s)=>Object.fromEntries(i.getFieldNames(s).filter(o=>!t.has(o)).map(o=>[o,i.getField(s,o)]));if(this._pcpCache){let i=this._getPrimQuerySource(e)?.index;return i?i.composePrimStack().map(s=>({layerIdentifier:s.layer.filePath,specPath:s.path.pathString,arc:Uo[s.arcType]??"local",offset:{offset:s.offset.offset,scale:s.offset.scale},metadata:r(s.layer,s.path.pathString)})):[]}return this._sortedSpecsFor(e).map(i=>({layerIdentifier:i.layer.filePath,specPath:i.sourcePath,arc:Uo[i.arc[0]??0]??"local",offset:{offset:i.offset.offset,scale:i.offset.scale},metadata:r(i.layer,i.sourcePath)}))}getPropertyStack(e,t="default"){return this.getPropertyStackWithLayerOffsets(e,t).map(({offset:r,...i})=>i)}getPropertyStackWithLayerOffsets(e,t="default"){return ll("usd-ts:Stage.getPropertyStack",r=>{r&&(fe(r,"propertyPath",e),fe(r,"time",t));let i=this._getPropertyStackWithLayerOffsets(e,t);return r&&fe(r,"specCount",i.length),i})}_getPropertyStackWithLayerOffsets(e,t){let r=e.indexOf(".");if(r<=0)return[];let i=e.slice(0,r),s=e.slice(r+1);if(this._pcpCache){let o=this._getPrimQuerySource(i);if(!o)return[];let{index:a,sourcePrimPath:c}=o,l=a.composePropertyStack(s),u=new Map;for(let f of l)u.set(`${f.nodeIndex}:${f.layerIndex}`,f);let d=new Map;if(typeof t=="number")for(let f of this._clipSetsByPrim.get(c)??[]){let h=Iy(s,f,t);if(h.length===0)continue;let y=`${f.position[0]}:${f.position[1]}`;d.set(y,[...d.get(y)??[],...h])}let p=[];for(let{nodeIndex:f,layerIndex:h,node:y,layerToStageOffset:g}of ml(a,s)){let m=u.get(`${f}:${h}`);m&&p.push({layerIdentifier:m.layer.filePath,specPath:m.path.pathString,arc:Uo[m.arcType]??"local",offset:{offset:m.offset.offset,scale:m.offset.scale},value:m.layer.getField(m.path.pathString,"default"),timeSamples:cl(m.layer.getField(m.path.pathString,"timeSamples"))});for(let P of d.get(`${f}:${h}`)??[]){let b=P.layer;p.push({layerIdentifier:P.layer.filePath,specPath:P.specPath,arc:Uo[y.arcType]??"local",offset:{offset:g.offset,scale:g.scale},value:b.getField(P.specPath,"default"),timeSamples:cl(b.getField(P.specPath,"timeSamples"))})}}return p}return[]}getPrimIndex(e){return this._pcpCache?.findPrimIndex(e)}_getPrimQuerySource(e){let t=this._instanceCache.getPathInPrototypeForInstancePath(e);t!==void 0&&(e=t);for(let[i,s]of this._instancing.protoToSource)if(e===i||e.startsWith(`${i}/`)){let o=s+e.slice(i.length),a=this._pcpCache?.findPrimIndex(o);return a?{index:a,sourcePrimPath:o,sourceRootPath:s,dataRootPath:i}:void 0}let r=this._pcpCache?.findPrimIndex(e);return r?{index:r,sourcePrimPath:e,sourceRootPath:e,dataRootPath:e}:void 0}_resolveAttribute(e,t,r,i){return ll("usd-ts:Stage.resolveAttributeValue",s=>{let o=`${e==="/"?"":e}.${t}`;s&&(fe(s,"propertyPath",o),fe(s,"time",r??"resolveInfo"));let a=this._resolveAttributeImpl(e,t,r,i);return s&&(fe(s,"source",a.source),fe(s,"valueIsBlocked",a.valueIsBlocked)),a})}_resolveAttributeImpl(e,t,r,i){let s=`${e==="/"?"":e}.${t}`;rb(this,{kind:"valueResolution",path:s});let o=this.nodes.get(s),a=o?.fields.typeName,c=(m,P=a)=>({...m,...P!==void 0?{typeName:P}:{},interpolation:this._interpolationType}),l=this._getPrimQuerySource(e);if(!l){let m=o;if(r!=="default"&&m?.timeSamples?.length)return c({source:"timeSamples",timeSamples:m.timeSamples,valueIsBlocked:!1});if(r!=="default"){let b=m?.fields.spline;if(b)return c({source:"spline",spline:b,valueIsBlocked:!1})}if(m&&"default"in m.fields){let b=m.fields.default;if(b instanceof Q||b===null){let S=i();return c(S===void 0?{source:"none",valueIsBlocked:!0}:{source:"fallback",value:S,valueIsBlocked:!0})}return c(b instanceof ke?{source:"none",valueIsBlocked:!1}:{source:"default",value:b,valueIsBlocked:!1})}let P=i();return c(P===void 0?{source:"none",valueIsBlocked:!1}:{source:"fallback",value:P,valueIsBlocked:!1})}let{index:u,sourcePrimPath:d}=l,p=this._clipSetsByPrim.get(d),f=p?Sp(t,p):void 0,h=Ps(u,t,"typeName"),y=jy(u,t,r,f?.map(m=>({position:m.position,resolve:P=>{let b=hi(m),S=P===void 0?void 0:Mo(m,P,this._interpolationType,!1,h);if(!(S===void 0&&b.length===0))return{source:"valueClips",value:S,valueIsBlocked:!1,valueEvaluator:(x,v)=>Mo(m,x,this._interpolationType,v,h),node:[...u.getNodeRange()][m.position[0]],timeSamples:b.map(x=>[x,void 0])}}}))??[]);if(y.source!=="none")return this._transformAttributeValue(u,t,y);let g=i();return c(g===void 0?y:{source:"fallback",value:g,valueIsBlocked:y.valueIsBlocked},h)}_transformAttributeValue(e,t,r){let i=Ps(e,t,"typeName"),s=a=>{if(i==="asset"||i==="asset[]"){let c=l=>{if(typeof l!="string"||!Lt(l))return l;let u="";if(r.node){let p=Rn(l,r.node.expressionVars);typeof p.value=="string"&&(u=p.value)}let d=u||l;return new Pt({authoredPath:l,evaluatedPath:u,resolvedPath:r.layer?.resolveAsset(d)??""})};return Array.isArray(a)?a.map(c):c(a)}if((i==="timecode"||i==="timecode[]")&&r.layerToStageOffset){if(typeof a=="number")return Ce(r.layerToStageOffset,a);if(Array.isArray(a))return a.map(c=>typeof c=="number"?Ce(r.layerToStageOffset,c):c)}return a},o={...r,...typeof i=="string"?{typeName:i}:{},interpolation:this._interpolationType};return r.value!==void 0&&(o.value=s(r.value)),r.valueEvaluator&&(o.valueEvaluator=(a,c)=>s(r.valueEvaluator(a,c))),r.timeSamples&&(o.timeSamples=r.timeSamples.map(([a,c])=>[a,s(c)])),o}_resolvePropertyField(e,t,r){let i=this._getPrimQuerySource(e);if(i){if(r==="custom")return this.getPrim(e)?.getPrimDefinition().getPropertyDefinition(t)?.isValid()?!1:Mp(i.index,t,r);if(r==="variability")return Mp(i.index,t,r);if(r==="typeName"){let c=i.index.composePropertyStack(t)[0],l=c?R(c.path):void 0;if(c&&l&&(c.layer.getSpecType(l)==="relationship"||c.layer.getField(l,"targetPaths")!==void 0))return"rel"}let s=bl(i.index,t,r);if(!s)return;let o=Ps(i.index,t,"typeName");if(r!=="default"&&r!=="timeSamples"){let c=o==="rel"?"relationship":"attribute";return jo(s.value,r,c,l=>Ce(s.layerToStageOffset,l))}let a=c=>{if((o==="timecode"||o==="timecode[]")&&s.layerToStageOffset){if(typeof c=="number")return Ce(s.layerToStageOffset,c);if(Array.isArray(c))return c.map(l=>typeof l=="number"?Ce(s.layerToStageOffset,l):l)}return c};return r==="default"?a(s.value):Object.fromEntries((cl(s.value)??[]).map(([c,l])=>[Ce(s.layerToStageOffset,c),a(l)]))}return this.nodes.get(`${e}.${t}`)?.fields[r]}_isPropertyCustom(e,t){if(this.getPrim(e)?.getPrimDefinition().getPropertyDefinition(t)?.isValid())return!1;let i=this._getPrimQuerySource(e);return i?Ky(i.index,t):this.nodes.get(`${e}.${t}`)?.fields.custom===!0}_resolvePropertyFieldTypeName(e,t,r){let i=this._getPrimQuerySource(e);if(!i)return;let s=bl(i.index,t,r);return s?.layer._getFieldValueTypeName(s.specPath,r)}_resolvePrimMetadata(e,t){let r=this._getPrimQuerySource(e);if(!r)return this.nodes.get(e)?.fields[t];if(t==="specifier")return Pl(r.index);let i=yl(r.index,t);if(i)return jo(i.value,t,"prim",s=>Ce(i.layerToStageOffset,s))}_resolvePrimFieldTypeName(e,t){let r=this._getPrimQuerySource(e);if(!r)return;let i=yl(r.index,t);return i?.layer._getFieldValueTypeName(i.specPath,t)}_resolvePropertyPaths(e,t,r,i=e){let s=this._getPrimQuerySource(e);if(s){let a=e.slice(s.dataRootPath.length),c=a&&i.endsWith(a)?i.slice(0,-a.length):i,l=d=>d===s.sourceRootPath||d.startsWith(`${s.sourceRootPath}/`)||d.startsWith(`${s.sourceRootPath}.`)?c+d.slice(s.sourceRootPath.length):d,u=qy(s.index,t,r,this._pcpCache??void 0,l);if(u!==void 0)return u}let o=this.nodes.get(`${e}.${t}`)?.fields[r];return typeof o=="string"?[o]:Array.isArray(o)?o.filter(a=>typeof a=="string"):void 0}_flattenProperty(e,t,r){let i=e._getPrimPath(),s=e._getName();if(!s)throw new Error("Cannot flatten invalid property");let o,a,c=s;if(t instanceof ir?(o=t.getStage(),a=t.path,r!==void 0&&(c=r)):t instanceof Ae&&(o=t.getStage(),a=t.primPath,c=t.name),!o||!a||!o.getPrim(a))throw new Error(`Cannot flatten property <${i}.${s}> to invalid destination`);let l=e.isRelationship,u=`${a}.${c}`,d=o.get(u);if(d&&d.typeName&&d.isRelationship!==l)throw new Error(`Cannot flatten <${i}.${s}> to <${u}>: properties have different types`);let p=e.typeName;if(!l&&!p)throw new Error(`Cannot flatten attribute <${i}.${s}> with unknown type`);let f=this._getFlattenPropertyMetadata(i,s,e),h=l?e.getTargets():[],y=l?[]:e.getConnections(),g=l?void 0:e.getResolveInfo("default"),m=l?void 0:e.getValue(),P=l?void 0:e.getResolveInfo(),b=P?.getSource()===5?e.getSpline():void 0,S=P?.valueSourceMightBeTimeVarying()&&!b?e.getTimeSampleKeys().map(T=>{let w=e.getResolveInfo(T);return[T,w.valueIsBlocked()?new Q:e.getValueAtTime(T)]}):[],x=T=>Av(T,i,a);if(o===this&&i===a&&s===c||o._clearPropertySpecForFlatten(a,c),o.declareProperty(a,c,l?"rel":p),l)o._setRelTargets(a,c,h.map(x));else{let T=o._primHandle(a).attr(c);T.clear(),g?.valueIsBlocked()?o._setAttrDefault(a,c,new Q):(g?.getSource()===2||g?.getSource()===1)&&o._setAttrDefault(a,c,m),b&&T.setSpline(b);for(let[w,D]of S)T.setTimeSample(w,D);T.setConnections(y.map(x))}for(let[T,w]of Object.entries(f))o._setPropertyMetadata(a,c,T,w);return o.get(u)}_clearPropertySpecForFlatten(e,t){if(!this._editTarget)throw new Error("Stage is read-only");let r=`${e}.${t}`,i=this._mapEditSpecPath(r);this._ownAuthoring(()=>this._editTarget._deleteSpec(i)),this.nodes.delete(r)}_getFlattenPropertyMetadata(e,t,r){let i=new Set,s=this._getPrimQuerySource(e);if(s)for(let c of s.index.getNodeRange()){if(c.inert)continue;let l=R(c.path),u=`${l==="/"?"":l}.${t}`;for(let{layer:d}of c.layerStack.layers)for(let p of d.getFieldNames(u))i.add(p)}else for(let c of Object.keys(this.nodes.get(`${e}.${t}`)?.fields??{}))i.add(c);let o=new Set(["default","timeSamples","spline","typeName","connectionPaths","targetPaths"]),a={};for(let c of i){if(o.has(c)||c.startsWith("__"))continue;let l=r.getField(c);l!==void 0&&(a[c]=l)}return a}_getAllAuthoredPropertyMetadata(e,t,r){return this._getFlattenPropertyMetadata(e,t,r)}_getFlattenPrimMetadata(e){let t=new Set,r="unknown",i=$o(e)?void 0:this._getPrimQuerySource(e);if(i)for(let o of i.index.getNodeRange()){if(o.inert)continue;let a=R(o.path);for(let{layer:c}of o.layerStack.layers){r==="unknown"&&(r=c.getSpecType(a));for(let l of c.getFieldNames(a))t.add(l)}}else for(let o of Object.keys(this.nodes.get(e)?.fields??{}))t.add(o);r==="prim"&&t.add("specifier");let s={};for(let o of t){if(o.startsWith("__"))continue;let a=this._resolvePrimMetadata(e,o);a!==void 0&&(s[o]=a)}return s}_getAllAuthoredPrimMetadata(e){return this._getFlattenPrimMetadata(e)}_getAuthoredAppliedSchemas(e){let t=this._getPrimQuerySource(e);return t?Sl(t.index,"apiSchemas"):void 0}getSpecializeArcTargets(e){let t=this._pcpCache?.findPrimIndex(e);if(!t)return[];let r=[];for(let i of t.getNodeRange()){if(!Qt(i.arcType)||i.parent!==t.rootNode||i.mapToParent.mapSourceToTarget(V.absoluteRootPath).isEmpty())continue;let s=null,o=new Set;for(let c=i.origin;c&&!o.has(c);c=c.origin===c?null:c.origin)if(o.add(c),c.arcType===4){s=c;break}let a=(s??t.rootNode).mapToRoot.mapSourceToTarget(i.path);r.push(a.isEmpty()?i.path.pathString:a.pathString)}return r}isStrongestConnectionFromSpecializes(e){let t=e.indexOf(".");if(t<=0)return!1;let r=e.slice(0,t),i=e.slice(t+1),s=this._pcpCache?.findPrimIndex(r);if(!s)return!1;for(let o of s.getNodeRange()){if(o.inert)continue;let a=R(o.path.appendProperty(i));for(let{layer:c}of o.layerStack.layers){let l=c.getField(a,"connectionPaths");if(Array.isArray(l)&&l.length>0)return Iv(o)}}return!1}async setSubLayerPaths(e,t){if(!this._rootLayer)throw new Error("Stage has no root layer (in-memory authoring stage)");this._rootLayer.setField("/","subLayers",[...e]),t&&this._rootLayer.setField("/","subLayerOffsets",[...t]),await this.flushChanges()}async insertSubLayer(e,t=0){let r=this.getSubLayerPaths(),i=Math.max(0,Math.min(t,r.length));r.splice(i,0,e),await this.setSubLayerPaths(r)}async removeSubLayer(e){let t=this.getSubLayerPaths();e<0||e>=t.length||(t.splice(e,1),await this.setSubLayerPaths(t))}static createNew(){let e=Oe.createAnonymous(),t=new Map;t.set("/",{fields:{}});let r=new n(t,e);return r._refreshFallbackPrimTypes(r.nodes),r._subscribeRegistryLayers(),r}getEditTarget(){return this._editTargetContext??new mn}getEditTargetForLocalLayer(e){let t=this._pcpCache?.getLayerStack().layers;if(typeof e=="number"){let i=t?.[e];if(!i)throw new Error(`Local layer index ${e} is out of range`);return new mn(i.layer,i.offset)}let r=t?.find(i=>i.layer===e);if(r)return new mn(e,r.offset);if(this.getLayerStack(!0).includes(e))return new mn(e);throw new Error("Layer is not in the stage local layer stack")}getRootLayer(){if(!this._rootLayer&&this._editTarget)return this._editTarget;if(!this._rootLayer)throw new Error("Stage has no root layer");return this._rootLayer}_sessionLayer=null;getSessionLayer(){if(!this._sessionLayer)throw new Error("Stage has no session layer (in-memory authoring stage)");return this._sessionLayer}hasSessionLayer(){return this._sessionLayer!==null}getUsedLayers(){if(this._usedLayers.size>0)return[...this._usedLayers];let e=[];return this._rootLayer?e.push(this._rootLayer):this._editTarget&&e.push(this._editTarget),this._sessionLayer&&!e.includes(this._sessionLayer)&&e.push(this._sessionLayer),e}getLayerStack(e=!0){let t=[],r=i=>{i&&!t.includes(i)&&t.push(i)};if(!this._rootLayer)return r(this._editTarget),t;if(this._pcpCache){for(let{layer:i}of this._pcpCache.getLayerStack().layers){let s=i;!e&&s===this._sessionLayer||r(s)}return t}return e&&r(this._sessionLayer),r(this._rootLayer),t}setEditTarget(e){let t=e instanceof mn?e:new mn(e),r=t.getLayer();if(!r)throw new Error("setEditTarget: invalid edit target");if(t.getMapFunction().isIdentity()&&r!==this._editTarget&&!this.getLayerStack(!0).includes(r))throw new Error("setEditTarget: layer is not in the stage's local layer stack");this._editTarget=r,this._editTargetContext=t}_notifyAuthored(e,t=[]){if(this._composeAndCacheLoadFlags(t.filter(i=>!i.includes("."))),this._pcpCache){for(let i of e)this._pendingChanges.add(i);for(let i of t)this._pendingResyncs.add(i);return}if(this._changeListeners.size===0||e.length===0&&t.length===0)return;let r=this._withNamespaceEditMethods({resyncedPaths:t,changedInfoOnlyPaths:e});for(let i of this._changeListeners)i(r)}_ensureEditSpec(e){if(!this._editTarget)throw new Error("Stage is read-only");let t=this._mapEditSpecPath(e);if(this._editTarget.getField(t,"specifier")!==void 0)return;let r=t.split("/").filter(Boolean),i=r.map((s,o)=>"/"+r.slice(0,o+1).join("/")).filter(s=>this._editTarget.getField(s,"specifier")===void 0);this._ownAuthoring(()=>{for(let s of i)this._editTarget.definePrimSpec(s,void 0,"over")})}_mapEditSpecPath(e){let t=this._editTargetContext?.mapToSpecPath(e)??e;if(!t)throw new Error(`Cannot map <${e}> to the current edit target`);return t}_mapEditTime(e){let t=this._editTargetContext?.getMapFunction().getTimeOffset();if(!t)return e;let r=_r(t);if(!r)throw new Error("Current edit target has a non-invertible time offset");return Ce(r,e)}_mapEditValue(e,t){return t==="timecode"&&typeof e=="number"?this._mapEditTime(e):t==="timecode[]"&&Array.isArray(e)?e.map(r=>typeof r=="number"?this._mapEditTime(r):r):e}_mapEditProperty(e,t){let r=this._mapEditSpecPath(`${e}.${t}`),i=r.lastIndexOf(".");if(i<0)throw new Error(`Edit target did not map a property path for <${e}.${t}>`);return{primPath:r.slice(0,i),propertyName:r.slice(i+1),propertyPath:r}}_reflattenPrim(e,t=!1){if(this._pcpCache){let r=this._pcpCache.findPrimIndex(e);return this._scheduleRecompose(),r?(t||Xy(r,this.nodes,e,this._instancing.instanceToProto.get(e)),!0):!1}return!1}_validateAuthoringTarget(e){let t=e.split(".")[0];if(bs(t))throw new Error(`Cannot author to <${e}>: prototype prims are read-only`);let r=t;for(;r.lastIndexOf("/")>0;)if(r=r.slice(0,r.lastIndexOf("/")),this.nodes.get(r)?.fields.__prototypePath!==void 0)throw new Error(`Cannot author to <${e}>: descendants of instance <${r}> are instance proxies and read-only`)}definePrim(e,t){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);let r=this.nodes.get(e),i=r?.fields.specifier;if(r&&(i==="def"||i==="class")&&(!t||r.fields.typeName===t))return this._primHandle(e);let s=this._mapEditSpecPath(e);if(this._ownAuthoring(()=>this._editTarget.definePrimSpec(s,t)),this._ensureEditSpec(e),!this._reflattenPrim(e)){let o=e.split("/").filter(Boolean);for(let c=0;c<o.length-1;c++){let l="/"+o.slice(0,c+1).join("/");this.nodes.has(l)||this.nodes.set(l,{fields:{specifier:"def"}})}let a=this.nodes.get(e)??{fields:{}};a.fields.specifier="def",t&&(a.fields.typeName=t),this.nodes.set(e,a)}return this._notifyAuthored([],[e]),this._primHandle(e)}has(e){return this.nodes.has(e)}getPrim(e){if(this.nodes.has(e))return new ir(this.nodes,e,void 0,this);let t=this._resolveInstanceProxy(e);if(t!==void 0)return new ir(this.nodes,e,t,this)}_primHandle(e){return new ir(this.nodes,e,void 0,this)}_resolveInstanceProxy(e){let t=e;for(;;){let r=t.lastIndexOf("/");if(r<=0)return;t=t.slice(0,r);let i=this.nodes.get(t);if(!i)continue;let s=i.fields.__prototypePath;if(s===void 0)return;let o=s+e.slice(t.length);return this.nodes.has(o)?o:this._resolveInstanceProxy(o)}}getPrototypes(){let e=[];for(let t of this._instancing.protoToSource.keys())this.nodes.has(t)&&e.push(new ir(this.nodes,t,void 0,this));return e}getInstances(e){let t=[];for(let[r,i]of this.nodes)i.fields.__prototypePath===e&&t.push(r);return t.sort()}get(e){let t=this.nodes.get(e),r=e.indexOf("."),i=r>0?{name:e.slice(r+1),def:()=>this.getPrim(e.slice(0,r))?.getPrimDefinition()}:void 0;if(t)return new Ae(this.nodes,e,i,this,r>0?e.slice(0,r):void 0,r>0?e.slice(r+1):void 0);if(r>0&&this.nodes.has(e.slice(0,r))){let s=e.slice(r+1);if(this.getPrim(e.slice(0,r))?.getPrimDefinition()?.getPropertyNames().includes(s))return new Ae(this.nodes,e,i,this,e.slice(0,r),s)}}traverse(e=bi){let t=this,r=Vr(e);return(function*(){let i=[...t.getAllChildPrimPaths("/")].reverse();for(;i.length>0;){let s=i.pop(),o=t.getPrim(s);if(!o||!r.evaluate(o))continue;yield s;let a=t.getAllChildPrimPaths(s,{instanceProxies:r.includeInstanceProxies});for(let c=a.length-1;c>=0;c--)i.push(a[c])}})()}traverseAll(){let e=this;return(function*(){let t=[...e.getAllChildPrimPaths("/")].reverse();for(;t.length>0;){let r=t.pop();yield r;let i=e.getAllChildPrimPaths(r);for(let s=i.length-1;s>=0;s--)t.push(i[s])}})()}getChildPrimPaths(e,t){return this._getChildPrimPaths(e,t,!1)}getAllChildPrimPaths(e,t){return this._getChildPrimPaths(e,t,!0)}_getChildPrimPaths(e,t,r){let i=this.nodes.get(e),s=i===void 0&&t?.instanceProxies?this._resolveInstanceProxy(e):void 0,o=i?.fields.__prototypePath??s;if(o!==void 0||s!==void 0){if(!t?.instanceProxies)return[];let l=o!==void 0&&i!==void 0?o:s;return this._getChildPrimPaths(l,t,r).map(u=>e+u.slice(l.length))}let a=al(this.nodes).children.get(e);if(!a)return[];let c=r?[...a]:a.filter(l=>{let u=this.getPrim(l);return u!==void 0&&u.isActive&&u.isDefined&&u.isLoaded&&!u.isAbstract});return e==="/"?c.filter(l=>!bs(l)):c}flatten(){return ll("usd-ts:Stage.flatten",e=>(e&&fe(e,"stageNodeCount",this.nodes.size),this._flatten()))}_flatten(){let e=Oe.createAnonymous("anon:flattened"),t=this._rootLayer??this._editTarget;if(t)for(let c of["defaultPrim","upAxis","metersPerUnit","startTimeCode","endTimeCode","timeCodesPerSecond","framesPerSecond"]){let l=t.getField("/",c);l!==void 0&&e.setField("/",c,l)}let r=c=>c.replace(/^\/__Prototype_(\d+)/,"/Flattened_Prototype_$1"),i=new Map,s=[];for(let c of this.nodes.keys()){if(c==="/")continue;let l=c.indexOf(".");if(l<0)s.push(c);else{let u=c.slice(0,l);(i.get(u)??i.set(u,[]).get(u)).push(c.slice(l+1))}}let o=new Set(s);s.length=0;let a=c=>{if(o.delete(c)){s.push(c);for(let l of this.getAllChildPrimPaths(c))a(l)}};for(let c of this.getPrototypes())a(c.path);for(let c of this.getAllChildPrimPaths("/"))a(c);for(let c of o)s.push(c);for(let c of s){let l=this.nodes.get(c),u=r(c),d=l.fields.specifier;e.definePrimSpec(u,l.fields.typeName,$o(c)?"over":d==="class"||d==="over"?d:"def");let p=new Set(["specifier","typeName","primChildren","properties","primOrder","inheritPaths","specializes","references","payload","apiSchemas","variantSetChildren","variantSetNames","variantSelection","relocates","clips","clipSets"]),f=this._getFlattenPrimMetadata(c);for(let[g,m]of Object.entries(f))g.startsWith("__")||p.has(g)||m===void 0||e.setField(u,g,m);let h=l.fields.apiSchemas;h!==void 0&&h.length>0&&e.setField(u,"apiSchemas",{isExplicit:!0,explicitItems:[...h],prependedItems:[],appendedItems:[],deletedItems:[]});let y=l.fields.__prototypePath;if(y!==void 0){let g={assetPath:"",primPath:r(y),layerOffset:{offset:0,scale:1}},m={isExplicit:!1,explicitItems:[],prependedItems:[],deletedItems:[],appendedItems:[g]};Object.defineProperty(m,"_sdfAddedItems",{value:m.appendedItems,configurable:!0,enumerable:!1,writable:!0}),e.setField(u,"references",m)}for(let g of i.get(c)??[]){let m=this.getPrim(c)?.getAttr(g);if(!m)continue;if(m.isRelationship){let S=m.getTargets().map(r);e.setRelTargets(u,g,S)}else{m.typeName&&e.declareProperty(u,g,m.typeName);let S=m.getConnections();S.length>0&&e.setAttrConnections(u,g,S.map(r));let x=m.getTimeSampleKeys();for(let T of x){let w=m.getValueAtTime(T);w!==void 0&&e.setAttrTimeSample(u,g,T,w)}let v=m.getValue();v!==void 0&&e.setAttrDefault(u,g,v)}let P=new Set(["specifier","typeName","default","timeSamples","targetPaths","connectionPaths"]),b=this._getFlattenPropertyMetadata(c,g,m);for(let[S,x]of Object.entries(b))S.startsWith("__")||P.has(S)||x===void 0||e.setField(`${u}.${g}`,S,x)}}return e}exportToUsda(){if(!this._editTarget)throw new Error("Stage has no edit target");return this._editTarget.toUsda()}exportToUsdc(){if(!this._editTarget)throw new Error("Stage has no edit target");return this._editTarget.toUsdc()}async save(){return this.getRootLayer().save()}async reload(){let e=this.getUsedLayers().filter(t=>!t.filePath.startsWith("anon:"));for(let t of e)await t.reload();await this._recomposeForEdit("/")}async export(e){return this.flatten().export(e)}setMetadata(e,t){return this.getRootLayer().setField("/",e,t),!0}getMetadata(e){return this.getRootLayer().getField("/",e)}hasMetadata(e){return this.getRootLayer().getField("/",e)!==void 0}clearMetadata(e){return this.getRootLayer().eraseField("/",e),!0}writeFallbackPrimTypes(){let e=O.getInstance().getFallbackPrimTypes();if(Object.keys(e).length===0)return;let t=this.getMetadata("fallbackPrimTypes"),r=Ot(t)?{...e,...t}:{...e};this._suppressLayerNotices+=1;try{this.setMetadata("fallbackPrimTypes",r)}finally{this._suppressLayerNotices-=1}if(this._fallbackPrimTypesJson=JSON.stringify(r),this._changeListeners.size>0){let i=this._withNamespaceEditMethods({resyncedPaths:[],changedInfoOnlyPaths:["/"]});for(let s of this._changeListeners)s(i)}}setDefaultPrim(e){let t=e.path.split("/").filter(Boolean)[0];if(!t||e.path!==`/${t}`)throw new Error(`setDefaultPrim: defaultPrim must be a root-level prim, got <${e.path}>`);this.getRootLayer().setField("/","defaultPrim",t)}getDefaultPrim(){let e=this.getRootLayer().getField("/","defaultPrim");if(!(typeof e!="string"||e.length===0))return this.getPrim(`/${e}`)}hasDefaultPrim(){let e=this.getRootLayer().getField("/","defaultPrim");return typeof e=="string"&&e.length>0}clearDefaultPrim(){this.getRootLayer().eraseField("/","defaultPrim")}_setPropertyMetadata(e,t,r,i){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);let s=`${e}.${t}`,o=this._mapEditSpecPath(s),a=this.get(s)?.typeName,c=a==="rel"?"relationship":"attribute",l=r==="default"?this._mapEditValue(i,a):Op(r,c)===void 0?i:jo(i,r,c,u=>this._mapEditTime(u));if(this._ownAuthoring(()=>this._editTarget.setField(o,r,l)),this._ensureEditSpec(e),!this._reflattenPrim(e,!0)){let u=this.nodes.get(s)??{fields:{}};u.fields[r]=i,this.nodes.set(s,u)}this._notifyAuthored([s])}_hasAuthoredPropertyMetadata(e,t,r){if(!this._editTarget)return!1;let i=this._mapEditSpecPath(`${e}.${t}`);return this._editTarget.getField(i,r)!==void 0}_clearPropertyField(e,t,r){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);let i=`${e}.${t}`,s=this._mapEditSpecPath(i);if(this._ownAuthoring(()=>this._editTarget.eraseField(s,r)),this._ensureEditSpec(e),!this._reflattenPrim(e,!0)){let o=this.nodes.get(i);o&&delete o.fields[r]}this._notifyAuthored([i])}_replaceAttrValueOpinions(e,t,r){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);let i=`${e}.${t}`,s=this.get(i)?.typeName,o=this._mapEditProperty(e,t);if(this._ownAuthoring(()=>{this._editTarget.eraseField(o.propertyPath,"default"),this._editTarget.eraseField(o.propertyPath,"timeSamples"),this._editTarget.eraseField(o.propertyPath,"spline"),r!==void 0&&(s&&s!=="rel"&&this._editTarget.getField(o.propertyPath,"typeName")===void 0&&this._editTarget.setField(o.propertyPath,"typeName",s),this._editTarget.setAttrDefault(o.primPath,o.propertyName,this._mapEditValue(r,s)))}),this._ensureEditSpec(e),!this._reflattenPrim(e,!0)){let a=this.nodes.get(i)??{fields:{}};delete a.fields.default,delete a.fields.spline,delete a.timeSamples,s&&(a.fields.typeName=s),r!==void 0&&(a.fields.default=r),this.nodes.set(i,a)}this._notifyAuthored([i])}_setAttrDefault(e,t,r){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);let i=`${e}.${t}`,s=this.get(i)?.typeName,o=this._mapEditProperty(e,t);if(this._ownAuthoring(()=>{s&&s!=="rel"&&this._editTarget.getField(o.propertyPath,"typeName")===void 0&&this._editTarget.setField(o.propertyPath,"typeName",s),this._editTarget.setAttrDefault(o.primPath,o.propertyName,this._mapEditValue(r,s))}),this._ensureEditSpec(e),!this._reflattenPrim(e,!0)){let a=this.nodes.get(i)??{fields:{}};a.fields.default=r,this.nodes.set(i,a)}this._notifyAuthored([i])}_setAttrConnections(e,t,r){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);for(let l of r)this._validateConnectionTarget(l);let i=this._mapEditProperty(e,t),s=r.map(l=>this._mapEditSpecPath(l));this._ownAuthoring(()=>this._editTarget.setAttrConnections(i.primPath,i.propertyName,s));let o=`${e}.${t}`;this._ensureEditSpec(e);let a=this._reflattenPrim(e,!0),c=this.nodes.get(o)??{fields:{}};a||(c.fields.connectionPaths=r),this.nodes.set(o,c),this._notifyAuthored([o])}_editAttrConnectionList(e,t,r){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);let i=this._mapEditProperty(e,t);this._ownAuthoring(()=>{let o=Fe(this._editTarget.getField(i.propertyPath,"connectionPaths"))??{isExplicit:!1,explicitItems:[],deletedItems:[],prependedItems:[],appendedItems:[],orderedItems:[]},a=r(o);a===void 0?this._editTarget.eraseField(i.propertyPath,"connectionPaths"):this._editTarget.setField(i.propertyPath,"connectionPaths",a)}),this._ensureEditSpec(e),this._reflattenPrim(e,!0);let s=`${e}.${t}`;this.nodes.has(s)||this.nodes.set(s,{fields:{}}),this._notifyAuthored([s])}_addAttrConnection(e,t,r,i){this._validateConnectionTarget(r);let s=this._mapEditSpecPath(r);this._editAttrConnectionList(e,t,o=>{let a=[...o.explicitItems],c=[...o.prependedItems],l=[...o.appendedItems],u=o.deletedItems.filter(h=>h!==s),d=h=>{let y=h.indexOf(s);y>=0&&h.splice(y,1)};d(a),d(c),d(l);let p=i==="frontOfPrependList"||i==="frontOfAppendList",f=o.isExplicit?a:i==="frontOfPrependList"||i==="backOfPrependList"?c:l;return p?f.unshift(s):f.push(s),{isExplicit:o.isExplicit,explicitItems:a,deletedItems:u,prependedItems:c,appendedItems:l,orderedItems:[...o.orderedItems]}})}_removeAttrConnection(e,t,r){this._validateConnectionTarget(r);let i=this._mapEditSpecPath(r);this._editAttrConnectionList(e,t,s=>s.isExplicit?{...s,explicitItems:s.explicitItems.filter(o=>o!==i)}:{...s,prependedItems:s.prependedItems.filter(o=>o!==i),appendedItems:s.appendedItems.filter(o=>o!==i),deletedItems:[...s.deletedItems.filter(o=>o!==i),i]})}_clearAttrConnections(e,t){this._editAttrConnectionList(e,t,()=>{})}_validateConnectionTarget(e){if(bs(e))throw new Error(`Cannot author connection to prototype object <${e}>`)}declareProperty(e,t,r){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);let i=this._mapEditProperty(e,t);this._ownAuthoring(()=>this._editTarget.declareProperty(i.primPath,i.propertyName,r));let s=`${e}.${t}`,o=this.nodes.get(s)??{fields:{}};o.fields.typeName=r,this.nodes.set(s,o)}setPropertyField(e,t,r){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);let i=this._mapEditSpecPath(e);this._ownAuthoring(()=>this._editTarget.setField(i,t,r));let s=this.nodes.get(e)??{fields:{}};s.fields[t]=r,this.nodes.set(e,s)}applyAPI(e,t){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);let r=this._mapEditSpecPath(e);this._ownAuthoring(()=>{let i=this._editTarget.getField(r,"apiSchemas");if(i?.isExplicit){if(i.explicitItems.includes(t))return;this._editTarget.setField(r,"apiSchemas",{...i,explicitItems:[...i.explicitItems,t]});return}let s=i?[...i.prependedItems]:[],o=i?[...i.appendedItems]:[];if(s.includes(t)||o.includes(t))return;let a=i?{...i,prependedItems:[...s,t]}:{isExplicit:!1,explicitItems:[],prependedItems:[t],appendedItems:[],deletedItems:[]};this._editTarget.setField(r,"apiSchemas",a)}),this._ensureEditSpec(e),this._reflattenPrim(e)||this._recomposeAuthoredApiSchemasDirect(e),this._notifyAuthored([],[e])}getAppliedSchemas(e){return this.getPrim(e)?.getAppliedSchemas()??[]}removeAppliedSchema(e,t){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);let r=this._mapEditSpecPath(e);this._ownAuthoring(()=>{let i=this._editTarget.getField(r,"apiSchemas")??{isExplicit:!1,explicitItems:[],prependedItems:[],appendedItems:[],deletedItems:[]},s=i.isExplicit?{...i,explicitItems:i.explicitItems.filter(o=>o!==t)}:{...i,prependedItems:i.prependedItems.filter(o=>o!==t),appendedItems:i.appendedItems.filter(o=>o!==t),deletedItems:i.deletedItems.includes(t)?[...i.deletedItems]:[...i.deletedItems,t]};this._editTarget.setField(r,"apiSchemas",s)}),this._ensureEditSpec(e),this._reflattenPrim(e)||this._recomposeAuthoredApiSchemasDirect(e),this._notifyAuthored([],[e])}_recomposeAuthoredApiSchemasDirect(e){let t=[];for(let s of this.getLayerStack(!0)){let o=Fe(s.getField(e,"apiSchemas"));if(o!==null&&(t.push(o),o.isExplicit))break}let r=es(t),i=this.nodes.get(e)??{fields:{}};r.length>0?i.fields.apiSchemas=r:delete i.fields.apiSchemas,this.nodes.set(e,i)}_setPrimTypeName(e,t){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);let r=this._mapEditSpecPath(e);if(this._ownAuthoring(()=>this._editTarget.setField(r,"typeName",t)),this._ensureEditSpec(e),!this._reflattenPrim(e)){let i=this.nodes.get(e)??{fields:{}};t!==""?i.fields.typeName=t:delete i.fields.typeName,this.nodes.set(e,i)}this._notifyAuthored([],[e])}_setPrimMetadata(e,t,r){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);let i=this._mapEditSpecPath(e),s=jo(r,t,"prim",o=>this._mapEditTime(o));if(this._ownAuthoring(()=>this._editTarget.setField(i,t,s)),this._ensureEditSpec(e),!this._reflattenPrim(e)){let o=this.nodes.get(e)??{fields:{}};o.fields[t]=r,this.nodes.set(e,o)}Tl(t)==="infoOnly"?this._notifyAuthored([e]):this._notifyAuthored([],[e])}_clearPrimMetadata(e,t){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);let r=this._mapEditSpecPath(e);if(this._ownAuthoring(()=>this._editTarget.eraseField(r,t)),this._ensureEditSpec(e),!this._reflattenPrim(e)){let i=this.nodes.get(e);i&&delete i.fields[t]}Tl(t)==="infoOnly"?this._notifyAuthored([e]):this._notifyAuthored([],[e])}_setRelTargets(e,t,r){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);let i=this._mapEditProperty(e,t),s=r.map(c=>this._mapEditSpecPath(c));this._ownAuthoring(()=>this._editTarget.setRelTargets(i.primPath,i.propertyName,s));let o=`${e}.${t}`;if(this._ensureEditSpec(e),!this._reflattenPrim(e,!0)||!this.nodes.has(o)){let c=this.nodes.get(o)??{fields:{}};c.fields.typeName="rel",c.fields.targetPaths=r,this.nodes.set(o,c)}this._notifyAuthored([o])}_setAttrTimeSample(e,t,r,i){if(!this._editTarget)throw new Error("Stage is read-only");this._validateAuthoringTarget(e);let s=`${e}.${t}`,o=this.get(s)?.typeName,a=this._mapEditProperty(e,t);if(this._ownAuthoring(()=>this._editTarget.setAttrTimeSample(a.primPath,a.propertyName,this._mapEditTime(r),this._mapEditValue(i,o))),this._ensureEditSpec(e),!this._reflattenPrim(e,!0)){let c=this.nodes.get(s)??{fields:{}},l=(c.timeSamples??[]).filter(([u])=>u!==r);l.push([r,i]),l.sort(([u],[d])=>u-d),c.timeSamples=l,this.nodes.set(s,c)}this._notifyAuthored([s])}};var ve=class{_prim;_stage;_hasPrim;constructor(e,t){this._prim=e,this._stage=t,this._hasPrim=e!==void 0}get path(){return this._hasPrim?this._prim.path:""}get prim(){return this._prim}get stage(){return this._stage}isConcrete(){return this._schemaKind()==="concreteTyped"}isTyped(){let e=this._schemaKind();return e==="abstractTyped"||e==="concreteTyped"}isAppliedAPISchema(){let e=this._schemaKind();return e==="singleApplyAPI"||e==="multipleApplyAPI"}isValid(){return this._hasPrim&&this._stage.has(this._prim.path)}_schemaKind(){let e=this.constructor;return e.typeName?O.findSchemaInfo(e.typeName)?.kind??"invalid":"invalid"}_attr(e,t){if(!this._hasPrim)throw new Error("Cannot access an attribute on an invalid schema");return this._stage.declareProperty(this._prim.path,e,t),this._prim.attr(e)}_rel(e){if(!this._hasPrim)throw new Error("Cannot access a relationship on an invalid schema");return this._prim.rel(e)}};var ye=class extends ve{static typeName="APISchemaBase";static getSchemaAttributeNames(e=!0){return[]}};var Se=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];function L(n,e){let t=new Array(16);for(let r=0;r<4;r++)for(let i=0;i<4;i++)t[r*4+i]=n[r*4+0]*e[i]+n[r*4+1]*e[4+i]+n[r*4+2]*e[8+i]+n[r*4+3]*e[12+i];return t}function Ai(n,e,t){return[1,0,0,0,0,1,0,0,0,0,1,0,n,e,t,1]}function Mr(n,e,t){return[n,0,0,0,0,e,0,0,0,0,t,0,0,0,0,1]}function Je(n){let e=n*Math.PI/180,t=Math.cos(e),r=Math.sin(e);return[1,0,0,0,0,t,r,0,0,-r,t,0,0,0,0,1]}function et(n){let e=n*Math.PI/180,t=Math.cos(e),r=Math.sin(e);return[t,0,-r,0,0,1,0,0,r,0,t,0,0,0,0,1]}function tt(n){let e=n*Math.PI/180,t=Math.cos(e),r=Math.sin(e);return[t,r,0,0,-r,t,0,0,0,0,1,0,0,0,0,1]}function yn(n,e,t,r){let i=e+e,s=t+t,o=r+r,a=e*i,c=e*s,l=e*o,u=t*s,d=t*o,p=r*o,f=n*i,h=n*s,y=n*o;return[1-(u+p),c+y,l-h,0,c-y,1-(a+p),d+f,0,l+h,d-f,1-(a+u),0,0,0,0,1]}var Bp=34028234663852886e22;function De(n,e=0){let t=n[0],r=n[1],i=n[4],s=n[5],o=n[8],a=n[9],c=n[12],l=n[13],u=t*s-i*r,d=t*a-o*r,p=t*l-c*r,f=i*a-o*s,h=i*l-c*s,y=o*l-c*a,g=n[2],m=n[3],P=n[6],b=n[7],S=n[10],x=n[11],v=n[14],T=n[15],w=g*f-P*d+S*u,D=P*p-v*u-g*h,G=g*y-S*p+v*d,_=S*h-v*f-P*y,k=b*d-x*u-m*f,E=m*h-b*p+T*u,q=x*p-T*d-m*y,ae=b*y-x*h+T*f;u=g*b-P*m,d=g*x-S*m,p=g*T-v*m,f=P*x-S*b,h=P*T-v*b,y=S*T-v*x;let se=s*d-a*u-r*f,N=r*h-s*p+l*u,X=a*p-l*d-r*y,ce=s*y-a*h+l*f,U=t*f-i*d+o*u,Y=i*p-c*u-t*h,le=t*y-o*p+c*d,de=o*h-c*f-i*y,j=c*se+o*N+i*X+t*ce;if(Math.abs(j)>e){let H=1/j;return[ce*H,X*H,N*H,se*H,de*H,le*H,Y*H,U*H,ae*H,q*H,E*H,k*H,_*H,G*H,D*H,w*H]}return[Bp,0,0,0,0,Bp,0,0,0,0,Bp,0,0,0,0,1]}function Jt(n,e,t,r){return[e*n[0]+t*n[4]+r*n[8]+n[12],e*n[1]+t*n[5]+r*n[9]+n[13],e*n[2]+t*n[6]+r*n[10]+n[14]]}var cb=new Float32Array(1),wv=new Uint32Array(cb.buffer);function Fn(n){cb[0]=n;let e=wv[0],t=e>>>16&32768,r=e>>>23&255,i=e&8388607,s;if(r===255)s=t|31744|(i===0?0:512);else{let l=r-127;if(l>15)s=t|31744;else if(l<-14)if(l<-25)s=t;else{let u=i|8388608,d=-l-1,p=u>>>d,f=u&(1<<d)-1,h=1<<d-1;(f>h||f===h&&p&1)&&p++,s=t|p}else{let u=i>>>13,d=i&8191;(d>4096||d===4096&&u&1)&&u++,s=t|l+15<<10|u}}let o=s>>>10&31,a=s&1023,c=o===31?a?NaN:1/0:o===0?a*2**-24:(1+a/1024)*2**(o-15);return t?-c:c}function vi(n){return n instanceof Z?n.data:n}var Z=class{_data;constructor(e,t){if(this._data=new Array(e).fill(0),t.length!==0){if(t.length===1){let r=t[0];if(typeof r=="number"){for(let s=0;s<e;s++)this._data[s]=r;return}let i=vi(r);if(i.length!==e)throw new TypeError(`GfVec: expected ${e} components, got ${i.length}`);for(let s=0;s<e;s++)this._data[s]=i[s];return}if(t.length!==e)throw new TypeError(`GfVec: expected ${e} arguments, got ${t.length}`);for(let r=0;r<e;r++){let i=t[r];if(typeof i!="number")throw new TypeError("GfVec: explicit constructor takes numbers");this._data[r]=i}}}_round(e){return this.scalarKind==="f"?Math.fround(e):this.scalarKind==="h"?Fn(e):this.scalarKind==="i"?Math.trunc(e):e}_sameType(e){let t=this.constructor,r=new t;for(let i=0;i<this.dimension;i++)r._data[i]=r._round(e[i]);return r}get data(){return this._data}get(e){if(e<0&&(e+=this.dimension),e<0||e>=this.dimension)throw new RangeError(`GfVec index ${e} out of range`);return this._data[e]}setComponent(e,t){if(e<0&&(e+=this.dimension),e<0||e>=this.dimension)throw new RangeError(`GfVec index ${e} out of range`);return this._data[e]=this._round(t),this}Set(...e){if(e.length!==this.dimension)throw new TypeError(`Set: expected ${this.dimension} values, got ${e.length}`);for(let t=0;t<this.dimension;t++)this._data[t]=this._round(e[t]);return this}equals(e){let t=vi(e);if(t.length!==this.dimension)return!1;for(let r=0;r<this.dimension;r++)if(this._data[r]!==t[r])return!1;return!0}Add(e){let t=vi(e);return this._sameType(this._data.map((r,i)=>r+t[i]))}Subtract(e){let t=vi(e);return this._sameType(this._data.map((r,i)=>r-t[i]))}GetScaled(e){return this._sameType(this._data.map(t=>t*e))}GetDivided(e){return this.scalarKind==="i"?this._sameType(this._data.map(t=>t/e)):this.GetScaled(1/e)}GetNegated(){return this._sameType(this._data.map(e=>-e))}AddInPlace(e){let t=vi(e);for(let r=0;r<this.dimension;r++)this._data[r]=this._round(this._data[r]+t[r]);return this}SubtractInPlace(e){let t=vi(e);for(let r=0;r<this.dimension;r++)this._data[r]=this._round(this._data[r]-t[r]);return this}ScaleInPlace(e){for(let t=0;t<this.dimension;t++)this._data[t]=this._round(this._data[t]*e);return this}DivideInPlace(e){if(this.scalarKind==="i"){for(let t=0;t<this.dimension;t++)this._data[t]=this._round(this._data[t]/e);return this}return this.ScaleInPlace(1/e)}Dot(e){let t=vi(e),r=0;for(let i=0;i<this.dimension;i++)r+=this._data[i]*t[i];return this._round(r)}GetDot(e){return this.Dot(e)}GetProjection(e){return e.GetScaled(this.Dot(e))}GetComplement(e){return this.Subtract(this.GetProjection(e))}GetLengthSq(){return this.Dot(this)}GetLength(){return this._round(Math.sqrt(this.GetLengthSq()))}Normalize(e=1e-10){let t=this.GetLength();return this.DivideInPlace(t>e?t:e),t}GetNormalized(e=1e-10){let t=this._sameType(this._data);return t.Normalize(e),t}toString(){return`(${this._data.join(", ")})`}repr(){return`Gf.${this.constructor.name}(${this._data.join(", ")})`}hash(){return`${this.constructor.name}:${this._data.join(",")}`}static XAxis(){return this.Axis(0)}static YAxis(){return this.Axis(1)}static Axis(e){let t=new this;return e<t.dimension&&t.setComponent(e,1),t}},F=class extends Z{dimension=2;scalarKind="d";constructor(...e){super(2,e)}},cr=class extends Z{dimension=2;scalarKind="f";constructor(...e){super(2,e);for(let t=0;t<2;t++)this._data[t]=Math.fround(this._data[t])}};var Wo=class extends Z{dimension=3;static ZAxis(){return this.Axis(2)}Cross(e){let t=this._data,r=e.data;return this._sameType([t[1]*r[2]-t[2]*r[1],t[2]*r[0]-t[0]*r[2],t[0]*r[1]-t[1]*r[0]])}GetCross(e){return this.Cross(e)}static OrthogonalizeBasis(e,t,r,i,s=1e-6){let o,a,c;if(i?(e.Normalize(),t.Normalize(),r.Normalize(),o=e.clone(),a=t.clone(),c=r.clone()):(o=e.clone(),a=t.clone(),c=r.clone(),o.Normalize(),a.Normalize(),c.Normalize()),Up(o,a,s)||Up(o,c,s)||Up(a,c,s))return!1;let l=20,u=0;for(;u<l;++u){let d=e.clone(),p=t.clone(),f=r.clone();d=d.Subtract(a.GetScaled(a.Dot(d))),d=d.Subtract(c.GetScaled(c.Dot(d))),p=p.Subtract(o.GetScaled(o.Dot(p))),p=p.Subtract(c.GetScaled(c.Dot(p))),f=f.Subtract(o.GetScaled(o.Dot(f))),f=f.Subtract(a.GetScaled(a.Dot(f)));let h=e.Add(d).GetScaled(.5),y=t.Add(p).GetScaled(.5),g=r.Add(f).GetScaled(.5);i&&(h.Normalize(),y.Normalize(),g.Normalize());let m=e.Subtract(h),P=t.Subtract(y),b=r.Subtract(g);if(m.Dot(m)+P.Dot(P)+b.Dot(b)<s*s)break;e.copyFrom(h),t.copyFrom(y),r.copyFrom(g),o=e.clone(),a=t.clone(),c=r.clone(),i||(o.Normalize(),a.Normalize(),c.Normalize())}return u<l}BuildOrthonormalFrame(e=1e-10){let t=this.GetLength();if(t===0)return[this._sameType([0,0,0]),this._sameType([0,0,0])];let r=this.GetDivided(t),i=this._sameType([1,0,0]).Cross(r);i.GetLengthSq()<1e-4*1e-4&&(i=this._sameType([0,1,0]).Cross(r)),i.Normalize();let s=r.Cross(i);if(t<e){let o=t/e;return i=i.GetScaled(o),[i,s.GetScaled(o)]}return[i,s]}copyFrom(e){for(let t=0;t<this.dimension;t++)this._data[t]=this._round(e.get(t));return this}clone(){return this._sameType(this._data)}},I=class extends Wo{scalarKind="d";constructor(...e){super(3,e)}},Ne=class extends Wo{scalarKind="f";constructor(...e){super(3,e);for(let t=0;t<3;t++)this._data[t]=Math.fround(this._data[t])}},Ut=class extends Wo{scalarKind="h";constructor(...e){super(3,e);for(let t=0;t<3;t++)this._data[t]=Fn(this._data[t])}};var Re=class extends Z{dimension=4;scalarKind="d";constructor(...e){super(4,e)}static ZAxis(){return this.Axis(2)}static WAxis(){return this.Axis(3)}},en=class extends Z{dimension=4;scalarKind="f";constructor(...e){super(4,e);for(let t=0;t<4;t++)this._data[t]=Math.fround(this._data[t])}static ZAxis(){return this.Axis(2)}static WAxis(){return this.Axis(3)}};function Ko(n,e){let t=n.constructor,r=new t(n);for(let i=0;i<r.dimension;i++)r.setComponent(i,n.get(i)*e.get(i));return r}function lb(n,e){if(n instanceof Z)return n.data;if(!Array.isArray(n))throw new TypeError(`GfDot: ${e} is not a vector`);for(let t of n)if(typeof t!="number"||Number.isNaN(t))throw new TypeError(`GfDot: ${e} has non-numeric component`);return n}function me(n,e){let t=lb(n,"v1"),r=lb(e,"v2");if(t.length!==r.length)throw new TypeError(`GfDot: dimension mismatch ${t.length} vs ${r.length}`);let i=0;for(let s=0;s<t.length;s++)i+=t[s]*r[s];return i}function Up(n,e,t){let r=n.data,i=e.data,s=0;for(let o=0;o<r.length;o++)s+=(r[o]-i[o])**2;return s<=t*t}function vl(n,e){return n.Cross(e)}var Cv=34028234663852886e22,Dv=1e-10,ub=n=>n>0?1:n<0?-1:0,_l={"2d":F,"2f":cr,"3d":I,"3f":Ne,"4d":Re,"4f":en},qo={d:I,f:Ne};function db(n){return typeof n=="object"&&n!==null&&"axis"in n&&"angle"in n}function zp(n){return Array.isArray(n)&&n.length===4&&n.every(e=>typeof e=="number")}var Il=class n{_m=[];_round(e){return this.scalarKind==="f"?Math.fround(e):e}_alloc(){this._m=new Array(this.dimension*this.dimension).fill(0)}_idx(e,t){return e*this.dimension+t}_wrap(e){return e<0?e+this.dimension:e}_new(){return new this.constructor}_fromFlat(e){let t=this._new();for(let r=0;r<this._m.length;r++)t._m[r]=t._round(e[r]);return t}_constructCommon(e){let t=this.dimension;if(e.length===0){this.SetIdentity();return}if(e.length===1){let r=e[0];if(typeof r=="number"){this.SetDiagonal(r);return}if(r instanceof n){for(let i=0;i<t;i++)for(let s=0;s<t;s++)this._m[this._idx(i,s)]=this._round(r.GetElement(i,s));return}if(r instanceof Z){this.SetDiagonal(r);return}throw new TypeError("GfMatrix: unsupported single constructor argument")}if(e.length===t*t){this.Set(...e);return}throw new TypeError(`GfMatrix: expected 0, 1, or ${t*t} arguments, got ${e.length}`)}GetElement(e,t){return this._m[this._idx(this._wrap(e),this._wrap(t))]}SetElement(e,t,r){return this._m[this._idx(this._wrap(e),this._wrap(t))]=this._round(r),this}GetRow(e){let t=this._wrap(e),r=this.dimension,i=[];for(let s=0;s<r;s++)i.push(this._m[this._idx(t,s)]);return new _l[`${r}${this.scalarKind}`](...i)}SetRow(e,t){let r=this._wrap(e),i=this.dimension,s=t instanceof Z?t.data:t;for(let o=0;o<i;o++)this._m[this._idx(r,o)]=this._round(s[o]);return this}GetColumn(e){let t=this._wrap(e),r=this.dimension,i=[];for(let s=0;s<r;s++)i.push(this._m[this._idx(s,t)]);return new _l[`${r}${this.scalarKind}`](...i)}SetColumn(e,t){let r=this._wrap(e),i=this.dimension,s=t instanceof Z?t.data:t;for(let o=0;o<i;o++)this._m[this._idx(o,r)]=this._round(s[o]);return this}GetArray(){return this._m}Set(...e){let t=this.dimension*this.dimension;if(e.length!==t)throw new TypeError(`Set: expected ${t} values, got ${e.length}`);for(let r=0;r<t;r++)this._m[r]=this._round(e[r]);return this}SetIdentity(){return this.SetDiagonal(1)}SetZero(){return this.SetDiagonal(0)}SetDiagonal(e){let t=this.dimension,r=typeof e=="number"?null:e instanceof Z?e.data:e;for(let i=0;i<t;i++)for(let s=0;s<t;s++)this._m[this._idx(i,s)]=i===s?this._round(r?r[i]:e):0;return this}GetTranspose(){let e=this.dimension,t=this._new();for(let r=0;r<e;r++)for(let i=0;i<e;i++)t._m[t._idx(i,r)]=this._m[this._idx(r,i)];return t}equals(e){if(e.dimension!==this.dimension)return!1;for(let t=0;t<this._m.length;t++)if(this._m[t]!==e._m[t])return!1;return!0}GetMultiply(e){let t=this.dimension,r=new Array(t*t).fill(0);for(let i=0;i<t;i++)for(let s=0;s<t;s++){let o=0;for(let a=0;a<t;a++)o+=this._m[this._idx(i,a)]*e._m[e._idx(a,s)];r[this._idx(i,s)]=o}return this._fromFlat(r)}MultiplyInPlace(e){let t=this.GetMultiply(e);return this._m=t._m,this}GetScalarMultiply(e){return this._fromFlat(this._m.map(t=>t*e))}ScalarMultiplyInPlace(e){for(let t=0;t<this._m.length;t++)this._m[t]=this._round(this._m[t]*e);return this}GetAdd(e){return this._fromFlat(this._m.map((t,r)=>t+e._m[r]))}AddInPlace(e){for(let t=0;t<this._m.length;t++)this._m[t]=this._round(this._m[t]+e._m[t]);return this}GetSubtract(e){return this._fromFlat(this._m.map((t,r)=>t-e._m[r]))}SubtractInPlace(e){for(let t=0;t<this._m.length;t++)this._m[t]=this._round(this._m[t]-e._m[t]);return this}GetNegated(){return this._fromFlat(this._m.map(e=>-e))}GetDivide(e){return this.GetMultiply(e.GetInverse())}MultMatrixVec(e){let t=this.dimension,r=e instanceof Z?e.data:e,i=[];for(let s=0;s<t;s++){let o=0;for(let a=0;a<t;a++)o+=r[a]*this._m[this._idx(s,a)];i.push(o)}return new _l[`${t}${this.scalarKind}`](...i)}MultVecMatrix(e){let t=this.dimension,r=e instanceof Z?e.data:e,i=[];for(let s=0;s<t;s++){let o=0;for(let a=0;a<t;a++)o+=r[a]*this._m[this._idx(a,s)];i.push(o)}return new _l[`${t}${this.scalarKind}`](...i)}Contains(e){return this._m.includes(e)}hash(){return`${this.dimension}:${this._m.join(",")}`}toString(){let e=this.dimension,t=[];for(let r=0;r<e;r++){let i=[];for(let s=0;s<e;s++)i.push(this._m[this._idx(r,s)]);t.push(`(${i.join(", ")})`)}return`( ${t.join(", ")} )`}repr(){return`Gf.${this.constructor.name}(${this._m.join(", ")})`}};var As=class extends Il{dimension=3;_construct(e){if(e.length===1){let t=e[0];if(db(t)){this.SetRotate(t);return}if(zp(t)){this.SetRotate(t);return}}this._constructCommon(e)}GetDeterminant(){let e=this._m;return e[0]*e[4]*e[8]+e[1]*e[5]*e[6]+e[2]*e[3]*e[7]-e[0]*e[5]*e[7]-e[1]*e[3]*e[8]-e[2]*e[4]*e[6]}GetInverse(e=0){let t=this._m,r=t[0],i=t[1],s=t[2],o=t[3],a=t[4],c=t[5],l=t[6],u=t[7],d=t[8],p=-(s*a*l)+i*c*l+s*o*u-r*c*u-i*o*d+r*a*d,f=this._new();if(Math.abs(p)>e){let h=1/p;f._m[0]=f._round((-(c*u)+a*d)*h),f._m[1]=f._round((s*u-i*d)*h),f._m[2]=f._round((-(s*a)+i*c)*h),f._m[3]=f._round((c*l-o*d)*h),f._m[4]=f._round((-(s*l)+r*d)*h),f._m[5]=f._round((s*o-r*c)*h),f._m[6]=f._round((-(a*l)+o*u)*h),f._m[7]=f._round((i*l-r*u)*h),f._m[8]=f._round((-(i*o)+r*a)*h)}else f.SetScale(Cv);return f}SetScale(e){let t=this._m;if(typeof e=="number")t[0]=this._round(e),t[1]=0,t[2]=0,t[3]=0,t[4]=this._round(e),t[5]=0,t[6]=0,t[7]=0,t[8]=this._round(e);else{let r=e instanceof Z?e.data:e;t[0]=this._round(r[0]),t[1]=0,t[2]=0,t[3]=0,t[4]=this._round(r[1]),t[5]=0,t[6]=0,t[7]=0,t[8]=this._round(r[2])}return this}_setRotateFromQuat(e,t,r,i){let s=this._m;s[0]=this._round(1-2*(r*r+i*i)),s[1]=this._round(2*(t*r+i*e)),s[2]=this._round(2*(i*t-r*e)),s[3]=this._round(2*(t*r-i*e)),s[4]=this._round(1-2*(i*i+t*t)),s[5]=this._round(2*(r*i+t*e)),s[6]=this._round(2*(i*t+r*e)),s[7]=this._round(2*(r*i-t*e)),s[8]=this._round(1-2*(r*r+t*t))}SetRotate(e){let t=zp(e)?e:wl(e);return this._setRotateFromQuat(t[0],t[1],t[2],t[3]),this}ExtractRotation(){return Yo(this._embed4())}ExtractRotationQuaternion(){return Lr(this._embed4())}_embed4(){let e=this._m;return[e[0],e[1],e[2],0,e[3],e[4],e[5],0,e[6],e[7],e[8],0,0,0,0,1]}GetHandedness(){return ub(this.GetDeterminant())}IsRightHanded(){return this.GetHandedness()===1}IsLeftHanded(){return this.GetHandedness()===-1}Orthonormalize(){return pb(this._m,this._round.bind(this)),this}GetOrthonormalized(){let e=this._fromFlat(this._m);return e.Orthonormalize(),e}},Qo=class extends As{scalarKind="d";constructor(...e){super(),this._alloc(),this._construct(e)}},Xo=class extends As{scalarKind="f";constructor(...e){super(),this._alloc(),this._construct(e)}},Hp=class extends Il{dimension=4;_construct(e){if(e.length===2){let[t,r]=e;if(db(t)||t instanceof As){this.SetTransform(t,r);return}}this._constructCommon(e)}GetDeterminant3(){return this._det3(0,1,2,0,1,2)}_det3(e,t,r,i,s,o){let a=(c,l)=>this._m[this._idx(c,l)];return a(e,i)*a(t,s)*a(r,o)+a(e,s)*a(t,o)*a(r,i)+a(e,o)*a(t,i)*a(r,s)-a(e,i)*a(t,o)*a(r,s)-a(e,s)*a(t,i)*a(r,o)-a(e,o)*a(t,s)*a(r,i)}GetDeterminant(){let e=(t,r)=>this._m[this._idx(t,r)];return-e(0,3)*this._det3(1,2,3,0,1,2)+e(1,3)*this._det3(0,2,3,0,1,2)-e(2,3)*this._det3(0,1,3,0,1,2)+e(3,3)*this._det3(0,1,2,0,1,2)}GetInverse(e=0){return this._fromFlat(De(this._m,e))}GetRow3(e){let t=this._wrap(e);return new qo[this.scalarKind](this._m[this._idx(t,0)],this._m[this._idx(t,1)],this._m[this._idx(t,2)])}SetRow3(e,t){let r=this._wrap(e),i=t instanceof Z?t.data:t;return this._m[this._idx(r,0)]=this._round(i[0]),this._m[this._idx(r,1)]=this._round(i[1]),this._m[this._idx(r,2)]=this._round(i[2]),this}SetScale(e){let t=this._m;if(t.fill(0),typeof e=="number")t[0]=this._round(e),t[5]=this._round(e),t[10]=this._round(e);else{let r=e instanceof Z?e.data:e;t[0]=this._round(r[0]),t[5]=this._round(r[1]),t[10]=this._round(r[2])}return t[15]=1,this}SetTranslate(e){let t=e instanceof Z?e.data:e;return this.SetIdentity(),this._m[12]=this._round(t[0]),this._m[13]=this._round(t[1]),this._m[14]=this._round(t[2]),this}SetTranslateOnly(e){let t=e instanceof Z?e.data:e;return this._m[12]=this._round(t[0]),this._m[13]=this._round(t[1]),this._m[14]=this._round(t[2]),this._m[15]=1,this}ExtractTranslation(){return new qo[this.scalarKind](this._m[12],this._m[13],this._m[14])}_setRotateFromQuat(e,t,r,i){let s=this._m;s[0]=this._round(1-2*(r*r+i*i)),s[1]=this._round(2*(t*r+i*e)),s[2]=this._round(2*(i*t-r*e)),s[4]=this._round(2*(t*r-i*e)),s[5]=this._round(1-2*(i*i+t*t)),s[6]=this._round(2*(r*i+t*e)),s[8]=this._round(2*(i*t+r*e)),s[9]=this._round(2*(r*i-t*e)),s[10]=this._round(1-2*(r*r+t*t))}SetRotateOnly(e){if(e instanceof As){let r=this._m;for(let i=0;i<3;i++)for(let s=0;s<3;s++)r[this._idx(i,s)]=this._round(e.GetElement(i,s));return this}let t=zp(e)?e:wl(e);return this._setRotateFromQuat(t[0],t[1],t[2],t[3]),this}SetRotate(e){this.SetRotateOnly(e);let t=this._m;return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}SetTransform(e,t){return this.SetRotate(e),this.SetTranslateOnly(t)}ExtractRotation(){return Yo(this._m)}ExtractRotationQuat(){return Lr(this._m)}ExtractRotationMatrix(){let e=this._m,t=this.scalarKind==="f"?Xo:Qo;return new t(e[0],e[1],e[2],e[4],e[5],e[6],e[8],e[9],e[10])}SetLookAt(e,t,r){let i=$p(e),s=$p(t),o=$p(r),a=jp(i,s,o);for(let c=0;c<16;c++)this._m[c]=this._round(a[c]);return this}GetHandedness(){return ub(this.GetDeterminant3())}IsRightHanded(){return this.GetHandedness()===1}IsLeftHanded(){return this.GetHandedness()===-1}Orthonormalize(){pb(this._m,this._round.bind(this),4);let e=this._m;return e[15]!==1&&Math.abs(e[15])>Dv&&(e[12]=this._round(e[12]/e[15]),e[13]=this._round(e[13]/e[15]),e[14]=this._round(e[14]/e[15]),e[15]=1),this}GetOrthonormalized(){let e=this._fromFlat(this._m);return e.Orthonormalize(),e}Factor(e){let t=e??(this.scalarKind==="f"?1e-5:1e-10),r=kl(this._m,t);return{success:r.nonSingular,scaleOrientation:this._fromFlat(r.rotation),scale:new qo[this.scalarKind](r.scale[0],r.scale[1],r.scale[2]),rotation:this._fromFlat(r.shear),translation:new qo[this.scalarKind](r.translation[0],r.translation[1],r.translation[2]),projection:this._fromFlat(r.perspective)}}RemoveScaleShear(){let e=this.Factor();if(!e.success)return this._fromFlat(this._m);let t=e.rotation.Orthonormalize(),r=this._new().SetTranslate(e.translation);return t.GetMultiply(r)}Transform(e){let t=e.data,r=this._comp(t,0)+this._m[12],i=this._comp(t,1)+this._m[13],s=this._comp(t,2)+this._m[14],o=this._comp(t,3)+this._m[15];return this._mkVec3(e,r/o,i/o,s/o)}TransformDir(e){let t=e.data;return this._mkVec3(e,this._comp(t,0),this._comp(t,1),this._comp(t,2))}TransformAffine(e){let t=e.data;return this._mkVec3(e,this._comp(t,0)+this._m[12],this._comp(t,1)+this._m[13],this._comp(t,2)+this._m[14])}_comp(e,t){return e[0]*this._m[this._idx(0,t)]+e[1]*this._m[this._idx(1,t)]+e[2]*this._m[this._idx(2,t)]}_mkVec3(e,t,r,i){let s=this.scalarKind==="f"&&e.scalarKind==="f"?"f":"d";return new qo[s](t,r,i)}},J=class extends Hp{scalarKind="d";constructor(...e){super(),this._alloc(),this._construct(e)}};function pb(n,e,t=3){let r=(c,l)=>c*t+l,i=new I(n[r(0,0)],n[r(0,1)],n[r(0,2)]),s=new I(n[r(1,0)],n[r(1,1)],n[r(1,2)]),o=new I(n[r(2,0)],n[r(2,1)],n[r(2,2)]);I.OrthogonalizeBasis(i,s,o,!0);let a=[i,s,o];for(let c=0;c<3;c++)for(let l=0;l<3;l++)n[r(c,l)]=e(a[c].get(l))}function $p(n){let e=n instanceof Z?n.data:n;return[e[0],e[1],e[2]]}function vs(n){return n*(180/Math.PI)}function _i(n){return n*(Math.PI/180)}function Cl(n){return n instanceof Z?me(n,n):n*n}var Rl=1e-10,Ev=1e-6,Nv=n=>n*Math.PI/180,Vv=n=>n/Math.PI*180,fb=(n,e,t)=>n<e?e:n>t?t:n,lt=(n,e)=>n[0]*e[0]+n[1]*e[1]+n[2]*e[2],Kp=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]],Dl=(n,e)=>[n[0]+e[0],n[1]+e[1],n[2]+e[2]],tn=(n,e)=>[n[0]-e[0],n[1]-e[1],n[2]-e[2]],bn=(n,e)=>[n[0]*e,n[1]*e,n[2]*e],Qp=n=>lt(n,n),Xp=n=>Math.sqrt(Qp(n));function nt(n,e=Rl){let t=Xp(n),r=t>e?t:e;return[n[0]/r,n[1]/r,n[2]/r]}var Wp=(n,e,t)=>Qp(tn(n,e))<=t*t,Gv=n=>n[0],Mv=n=>[n[1],n[2],n[3]];function Lv(n,e=Rl){let t=Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]+n[3]*n[3]);return t<e?[1,0,0,0]:[n[0]/t,n[1]/t,n[2]/t,n[3]/t]}function hb(n,e){let t=[n[0],n[1],n[2]];return Math.abs(lt(t,t)-1)>1e-10&&(t=nt(t)),{axis:t,angle:e}}var _s=()=>({axis:[1,0,0],angle:0});function wl(n){let e=Nv(n.angle)/2,t=Math.sin(e),r=Math.cos(e),i=bn(n.axis,t);return Lv([r,i[0],i[1],i[2]])}function mb(n){let e=Mv(n),t=Xp(e);if(t>Rl){let r=Math.acos(fb(Gv(n),-1,1));return hb([e[0]/t,e[1]/t,e[2]/t],2*Vv(r))}return _s()}var Is=n=>({axis:[n.axis[0],n.axis[1],n.axis[2]],angle:-n.angle});var El=(n,e)=>n.axis[0]===e.axis[0]&&n.axis[1]===e.axis[1]&&n.axis[2]===e.axis[2]&&n.angle===e.angle;var Zo=n=>`Gf.Rotation(Gf.Vec3d(${n.axis[0]}, ${n.axis[1]}, ${n.axis[2]}), ${n.angle})`;function qp(n){return[n[0],n[4],n[8],n[12],n[1],n[5],n[9],n[13],n[2],n[6],n[10],n[14],n[3],n[7],n[11],n[15]]}function gb(n){let e=(t,r)=>n[t*4+r];return e(0,0)*e(1,1)*e(2,2)+e(0,1)*e(1,2)*e(2,0)+e(0,2)*e(1,0)*e(2,1)-e(0,0)*e(1,2)*e(2,1)-e(0,1)*e(1,0)*e(2,2)-e(0,2)*e(1,1)*e(2,0)}function Lr(n){let e=(s,o)=>n[s*4+o],t;e(0,0)>e(1,1)?t=e(0,0)>e(2,2)?0:2:t=e(1,1)>e(2,2)?1:2;let r=[0,0,0],i;if(e(0,0)+e(1,1)+e(2,2)>e(t,t))i=.5*Math.sqrt(e(0,0)+e(1,1)+e(2,2)+e(3,3)),r[0]=(e(1,2)-e(2,1))/(4*i),r[1]=(e(2,0)-e(0,2))/(4*i),r[2]=(e(0,1)-e(1,0))/(4*i);else{let s=(t+1)%3,o=(t+2)%3,a=.5*Math.sqrt(e(t,t)-e(s,s)-e(o,o)+e(3,3));r[t]=a,r[s]=(e(t,s)+e(s,t))/(4*a),r[o]=(e(o,t)+e(t,o))/(4*a),i=(e(s,o)-e(o,s))/(4*a)}return[fb(i,-1,1),r[0],r[1],r[2]]}var Yo=n=>mb(Lr(n));function jp(n,e,t){let r=nt(tn(e,n)),i=nt(Kp(r,t)),s=Kp(i,r);return[i[0],s[0],-r[0],0,i[1],s[1],-r[1],0,i[2],s[2],-r[2],0,-lt(i,n),-lt(s,n),lt(r,n),1]}function yb(n,e,t,r,i=Ev){let s=[...n],o=[...e],a=[...t];r&&(s=nt(s),o=nt(o),a=nt(a));let c=nt(s),l=nt(o),u=nt(a);if(Wp(c,l,i)||Wp(c,u,i)||Wp(l,u,i))return{tx:s,ty:o,tz:a,converged:!1};let d=20,p=0;for(;p<d;++p){let f=[...s],h=[...o],y=[...a];f=tn(f,bn(l,lt(l,f))),f=tn(f,bn(u,lt(u,f))),h=tn(h,bn(c,lt(c,h))),h=tn(h,bn(u,lt(u,h))),y=tn(y,bn(c,lt(c,y))),y=tn(y,bn(l,lt(l,y)));let g=bn(Dl(s,f),.5),m=bn(Dl(o,h),.5),P=bn(Dl(a,y),.5);r&&(g=nt(g),m=nt(m),P=nt(P));let b=tn(s,g),S=tn(o,m),x=tn(a,P);if(lt(b,b)+lt(S,S)+lt(x,x)<i*i)break;s=g,o=m,a=P,c=s,l=o,u=a,r||(c=nt(c),l=nt(l),u=nt(u))}return{tx:s,ty:o,tz:a,converged:p<d}}function Jo(n){let e=[n[0],n[1],n[2]],t=[n[4],n[5],n[6]],r=[n[8],n[9],n[10]],{tx:i,ty:s,tz:o}=yb(e,t,r,!0),a=[i[0],i[1],i[2],n[3],s[0],s[1],s[2],n[7],o[0],o[1],o[2],n[11],n[12],n[13],n[14],n[15]];return a[15]!==1&&Math.abs(a[15])>Rl&&(a[12]/=a[15],a[13]/=a[15],a[14]/=a[15],a[15]=1),a}function Ov(n){let e=[n[0],n[1],n[2],n[4],n[5],n[6],n[8],n[9],n[10]],t=[e[0],e[4],e[8]],r=[[1,0,0],[0,1,0],[0,0,1]],i=[t[0],t[1],t[2]],s=[0,0,0],o=(c,l)=>e[c*3+l],a=(c,l,u)=>{e[c*3+l]=u};for(let c=0;c<50;c++){let l=0;for(let d=0;d<2;d++)for(let p=d+1;p<3;p++)l+=Math.abs(o(d,p));if(l===0)break;let u=c<3?.2*l/9:0;for(let d=0;d<3;d++)for(let p=d+1;p<3;p++){let f=100*Math.abs(o(d,p));if(c>3&&Math.abs(t[d])+f===Math.abs(t[d])&&Math.abs(t[p])+f===Math.abs(t[p]))a(d,p,0);else if(Math.abs(o(d,p))>u){let h=t[p]-t[d],y;if(Math.abs(h)+f===Math.abs(h))y=o(d,p)/h;else{let b=.5*h/o(d,p);y=1/(Math.abs(b)+Math.sqrt(1+b*b)),b<0&&(y=-y)}let g=1/Math.sqrt(1+y*y),m=y*g,P=m/(1+g);h=y*o(d,p),s[d]-=h,s[p]+=h,t[d]-=h,t[p]+=h,a(d,p,0);for(let b=0;b<d;b++){let S=o(b,d),x=o(b,p);a(b,d,S-m*(x+S*P)),a(b,p,x+m*(S-x*P))}for(let b=d+1;b<p;b++){let S=o(d,b),x=o(b,p);a(d,b,S-m*(x+S*P)),a(b,p,x+m*(S-x*P))}for(let b=p+1;b<3;b++){let S=o(d,b),x=o(p,b);a(d,b,S-m*(x+S*P)),a(p,b,x+m*(S-x*P))}for(let b=0;b<3;b++){let S=r[b][d],x=r[b][p];r[b][d]=S-m*(x+S*P),r[b][p]=x+m*(S-x*P)}}}for(let d=0;d<3;d++)i[d]+=s[d],t[d]=i[d],s[d]=0}return{eigenvalues:t,eigenvectors:r}}function kl(n,e=1e-10){let t=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],r=[n[0],n[1],n[2],0,n[4],n[5],n[6],0,n[8],n[9],n[10],0,0,0,0,1],i=[n[12],n[13],n[14]],s=gb(r),o=s<0?-1:1,a=!(s*o<e),c=L(r,qp(r)),{eigenvalues:l,eigenvectors:u}=Ov(c),d=[u[0][0],u[0][1],u[0][2],0,u[1][0],u[1][1],u[1][2],0,u[2][0],u[2][1],u[2][2],0,0,0,0,1],p=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],f=[0,0,0];for(let y=0;y<3;y++)f[y]=l[y]<e?o*e:o*Math.sqrt(l[y]),p[y*4+y]=1/f[y];let h=L(L(L(d,p),qp(d)),r);return{rotation:d,scale:f,shear:h,translation:i,perspective:t,nonSingular:a}}function Fv(n){let d=1/(n[0]*(n[4]*n[8]-n[7]*n[5])-n[3]*(n[1]*n[8]-n[7]*n[2])+n[6]*(n[1]*n[5]-n[4]*n[2])),p=new Array(9);return p[0]=(n[4]*n[8]-n[7]*n[5])*d,p[3]=(n[6]*n[5]-n[3]*n[8])*d,p[6]=(n[3]*n[7]-n[6]*n[4])*d,p[1]=(n[7]*n[2]-n[1]*n[8])*d,p[4]=(n[0]*n[8]-n[6]*n[2])*d,p[7]=(n[6]*n[1]-n[0]*n[7])*d,p[2]=(n[1]*n[5]-n[4]*n[2])*d,p[5]=(n[3]*n[2]-n[0]*n[5])*d,p[8]=(n[0]*n[4]-n[3]*n[1])*d,p}function Bv(n){if(n.rgbToXYZ[8]!==0)return;let e=n.linearBias,t=n.gamma;if(t===1?(n.K0=1e9,n.phi=1):e<=0?(n.K0=0,n.phi=1):(n.K0=e/(t-1),n.phi=e/Math.exp(Math.log(t*e/(t+t*e-1-e))*t)/(t-1)),n.whitePoint.x===0)return;let r=[n.redPrimary.x,n.redPrimary.y,1-n.redPrimary.x-n.redPrimary.y],i=[n.greenPrimary.x,n.greenPrimary.y,1-n.greenPrimary.x-n.greenPrimary.y],s=[n.bluePrimary.x,n.bluePrimary.y,1-n.bluePrimary.x-n.bluePrimary.y],o=[n.whitePoint.x,n.whitePoint.y,1-n.whitePoint.x-n.whitePoint.y],a=new Array(9);a[0]=r[0],a[1]=i[0],a[2]=s[0],a[3]=r[1],a[4]=i[1],a[5]=s[1],a[6]=r[2],a[7]=i[2],a[8]=s[2];let c=[o[0]/o[1],o[1]/o[1],o[2]/o[1]],l=Fv(a),u=[l[0]*c[0]+l[1]*c[1]+l[2]*c[2],l[3]*c[0]+l[4]*c[1]+l[5]*c[2],l[6]*c[0]+l[7]*c[1]+l[8]*c[2]];a[0]*=u[0],a[1]*=u[1],a[2]*=u[2],a[3]*=u[0],a[4]*=u[1],a[5]*=u[2],a[6]*=u[0],a[7]*=u[1],a[8]*=u[2],n.rgbToXYZ=a}var Ct={x:.3127,y:.329},Uv=[{descriptiveName:"ACEScg",shortName:"lin_ap1_scene",redPrimary:{x:.71319588766205,y:.29268891446333},greenPrimary:{x:.15950855654178,y:.83878851615096},bluePrimary:{x:.12867299528535,y:.043895571160528},whitePoint:Ct,gamma:1,linearBias:0},{descriptiveName:"ACES2065-1",shortName:"lin_ap0_scene",redPrimary:{x:.73485524337371,y:.26422532524554},greenPrimary:{x:-.0061709124786224,y:1.0113149590212864},bluePrimary:{x:.015967559255041,y:-.064235503128551},whitePoint:Ct,gamma:1,linearBias:0},{descriptiveName:"Linear Rec.709 (sRGB)",shortName:"lin_rec709_scene",redPrimary:{x:.64,y:.33},greenPrimary:{x:.3,y:.6},bluePrimary:{x:.15,y:.06},whitePoint:Ct,gamma:1,linearBias:0},{descriptiveName:"Linear P3-D65",shortName:"lin_p3d65_scene",redPrimary:{x:.68,y:.32},greenPrimary:{x:.265,y:.69},bluePrimary:{x:.15,y:.06},whitePoint:Ct,gamma:1,linearBias:0},{descriptiveName:"Linear Rec.2020",shortName:"lin_rec2020_scene",redPrimary:{x:.708,y:.292},greenPrimary:{x:.17,y:.797},bluePrimary:{x:.131,y:.046},whitePoint:Ct,gamma:1,linearBias:0},{descriptiveName:"Linear AdobeRGB",shortName:"lin_adobergb_scene",redPrimary:{x:.64,y:.33},greenPrimary:{x:.21,y:.71},bluePrimary:{x:.15,y:.06},whitePoint:Ct,gamma:1,linearBias:0},{descriptiveName:"CIE XYZ-D65 - Scene-referred",shortName:"lin_ciexyzd65_scene",redPrimary:{x:1,y:0},greenPrimary:{x:0,y:1},bluePrimary:{x:0,y:0},whitePoint:Ct,gamma:1,linearBias:0},{descriptiveName:"sRGB Encoded Rec.709 (sRGB)",shortName:"srgb_rec709_scene",redPrimary:{x:.64,y:.33},greenPrimary:{x:.3,y:.6},bluePrimary:{x:.15,y:.06},whitePoint:Ct,gamma:2.4,linearBias:.055},{descriptiveName:"Gamma 2.2 Encoded Rec.709",shortName:"g22_rec709_scene",redPrimary:{x:.64,y:.33},greenPrimary:{x:.3,y:.6},bluePrimary:{x:.15,y:.06},whitePoint:Ct,gamma:2.2,linearBias:0},{descriptiveName:"Gamma 1.8 Encoded Rec.709",shortName:"g18_rec709_scene",redPrimary:{x:.64,y:.33},greenPrimary:{x:.3,y:.6},bluePrimary:{x:.15,y:.06},whitePoint:Ct,gamma:1.8,linearBias:0},{descriptiveName:"sRGB Encoded AP1",shortName:"srgb_ap1_scene",redPrimary:{x:.71319588766205,y:.29268891446333},greenPrimary:{x:.15950855654178,y:.83878851615096},bluePrimary:{x:.12867299528535,y:.043895571160528},whitePoint:Ct,gamma:2.4,linearBias:.055},{descriptiveName:"Gamma 2.2 Encoded AP1",shortName:"g22_ap1_scene",redPrimary:{x:.71319588766205,y:.29268891446333},greenPrimary:{x:.15950855654178,y:.83878851615096},bluePrimary:{x:.12867299528535,y:.043895571160528},whitePoint:Ct,gamma:2.2,linearBias:0},{descriptiveName:"sRGB Encoded P3-D65",shortName:"srgb_p3d65_scene",redPrimary:{x:.68,y:.32},greenPrimary:{x:.265,y:.69},bluePrimary:{x:.15,y:.06},whitePoint:Ct,gamma:2.4,linearBias:.055},{descriptiveName:"Gamma 2.2 Encoded AdobeRGB",shortName:"g22_adobergb_scene",redPrimary:{x:.64,y:.33},greenPrimary:{x:.21,y:.71},bluePrimary:{x:.15,y:.06},whitePoint:Ct,gamma:2.2,linearBias:0},{descriptiveName:"Data",shortName:"data",redPrimary:{x:1,y:0},greenPrimary:{x:0,y:1},bluePrimary:{x:0,y:0},whitePoint:{x:1/3,y:1/3},gamma:1,linearBias:0,identityMatrix:!0},{descriptiveName:"Identity",shortName:"identity",redPrimary:{x:1,y:0},greenPrimary:{x:0,y:1},bluePrimary:{x:0,y:0},whitePoint:{x:1/3,y:1/3},gamma:1,linearBias:0,identityMatrix:!0},{descriptiveName:"Raw",shortName:"raw",redPrimary:{x:1,y:0},greenPrimary:{x:0,y:1},bluePrimary:{x:0,y:0},whitePoint:{x:1/3,y:1/3},gamma:1,linearBias:0,identityMatrix:!0},{descriptiveName:"Unknown",shortName:"unknown",redPrimary:{x:1,y:0},greenPrimary:{x:0,y:1},bluePrimary:{x:0,y:0},whitePoint:{x:1/3,y:1/3},gamma:1,linearBias:0,identityMatrix:!0}];function $v(n){let e={descriptiveName:n.descriptiveName,shortName:n.shortName,redPrimary:{...n.redPrimary},greenPrimary:{...n.greenPrimary},bluePrimary:{...n.bluePrimary},whitePoint:{...n.whitePoint},gamma:n.gamma,linearBias:n.linearBias,K0:0,phi:0,rgbToXYZ:n.identityMatrix?[1,0,0,0,1,0,0,0,1]:[0,0,0,0,0,0,0,0,0]};return Bv(e),e}var Yp=new Map;for(let n of Uv){let e=$v(n);Yp.set(n.shortName,e),Yp.has(n.descriptiveName)||Yp.set(n.descriptiveName,e)}var Zp=Fs({LinearAP1:"lin_ap1_scene",LinearAP0:"lin_ap0_scene",LinearRec709:"lin_rec709_scene",LinearP3D65:"lin_p3d65_scene",LinearRec2020:"lin_rec2020_scene",LinearAdobeRGB:"lin_adobergb_scene",LinearCIEXYZD65:"lin_ciexyzd65_scene",SRGBRec709:"srgb_rec709_scene",G22Rec709:"g22_rec709_scene",G18Rec709:"g18_rec709_scene",SRGBAP1:"srgb_ap1_scene",G22AP1:"g22_ap1_scene",SRGBP3D65:"srgb_p3d65_scene",G22AdobeRGB:"g22_adobergb_scene",Identity:"identity",Data:"data",Raw:"raw",Unknown:"unknown",CIEXYZ:"lin_ciexyzd65_scene",LinearDisplayP3:"lin_p3d65_scene"});var Or=class{_real;_imaginary;constructor(e,t){this._real=e,this._imaginary=t}GetReal(){return this._real}SetReal(e){this._real=this._round(e)}GetImaginary(){return this._imaginary}SetImaginary(e){let t=e instanceof Z?e.data:e;this._imaginary=this._makeVec(t[0],t[1],t[2])}_GetLengthSquared(){return this._round(this._real*this._real+this._imaginary.Dot(this._imaginary))}GetLength(){return this._round(Math.sqrt(this._GetLengthSquared()))}GetNormalized(e=1e-10){let t=this._create(this._real,this._cloneVec());return t.Normalize(e),t}Normalize(e=1e-10){let t=this.GetLength();return t<e?(this._real=this._round(1),this._imaginary=this._makeVec(0,0,0)):this.DivideInPlace(t),t}GetInverse(){let e=this._GetLengthSquared();return this._create(this._real,this._imaginary.GetNegated()).GetDivided(e)}equals(e){return this._real===e._real&&this._imaginary.equals(e._imaginary)}MultiplyInPlace(e){let t=this._real,r=e._real,i=this._imaginary,s=e._imaginary,o=t*r-i.Dot(s),a=i.data,c=s.data,l=this._makeVec(t*c[0]+r*a[0]+(a[1]*c[2]-a[2]*c[1]),t*c[1]+r*a[1]+(a[2]*c[0]-a[0]*c[2]),t*c[2]+r*a[2]+(a[0]*c[1]-a[1]*c[0]));return this._real=this._round(o),this._imaginary=l,this}GetMultiply(e){return this._create(this._real,this._cloneVec()).MultiplyInPlace(e)}ScaleInPlace(e){return this._real=this._round(this._real*e),this._imaginary=this._makeVec(this._imaginary.get(0)*e,this._imaginary.get(1)*e,this._imaginary.get(2)*e),this}GetScaled(e){return this._create(this._real,this._cloneVec()).ScaleInPlace(e)}DivideInPlace(e){return this._real=this._round(this._real/e),this._imaginary=this._makeVec(this._imaginary.get(0)/e,this._imaginary.get(1)/e,this._imaginary.get(2)/e),this}GetDivided(e){return this._create(this._real,this._cloneVec()).DivideInPlace(e)}AddInPlace(e){return this._real=this._round(this._real+e._real),this._imaginary=this._makeVec(this._imaginary.get(0)+e._imaginary.get(0),this._imaginary.get(1)+e._imaginary.get(1),this._imaginary.get(2)+e._imaginary.get(2)),this}Add(e){return this._create(this._real,this._cloneVec()).AddInPlace(e)}SubtractInPlace(e){return this._real=this._round(this._real-e._real),this._imaginary=this._makeVec(this._imaginary.get(0)-e._imaginary.get(0),this._imaginary.get(1)-e._imaginary.get(1),this._imaginary.get(2)-e._imaginary.get(2)),this}Subtract(e){return this._create(this._real,this._cloneVec()).SubtractInPlace(e)}toString(){return`(${this._real} + ${this._imaginary.toString()})`}hash(){return`${this.constructor.name}:${this._real};${this._imaginary.data.join(",")}`}_cloneVec(){let e=this._imaginary.data;return this._makeVec(e[0],e[1],e[2])}},ea=class n extends Or{constructor(e,t){if(e===void 0){super(0,new I(0,0,0));return}if(e instanceof Or){super(e.GetReal(),new I(e.GetImaginary()));return}if(t===void 0){super(e,new I(0,0,0));return}let r=t instanceof Z?t.data:t;super(e,new I(r[0],r[1],r[2]))}_round(e){return e}_makeVec(e,t,r){return new I(e,t,r)}_create(e,t){let r=new n;return r._real=e,r._imaginary=t,r}GetImaginary(){return this._imaginary}static GetZero(){return new n(0,new I(0,0,0))}static GetIdentity(){return new n(1,new I(0,0,0))}},ta=class extends Or{GetConjugate(){return this._create(this._real,this._imaginary.GetNegated())}GetNegated(){return this._create(-this._real,this._imaginary.GetNegated())}Transform(e){let t=this._imaginary.Dot(this._imaginary),r=this._real*this._real,i=this._imaginary,s=i.Dot(e),o=i.data,a=e.data,c=this._makeVec(o[1]*a[2]-o[2]*a[1],o[2]*a[0]-o[0]*a[2],o[0]*a[1]-o[1]*a[0]),l=r+t,u=c.data;return this._makeVec((2*s*o[0]+(r-t)*a[0]+2*this._real*u[0])/l,(2*s*o[1]+(r-t)*a[1]+2*this._real*u[1])/l,(2*s*o[2]+(r-t)*a[2]+2*this._real*u[2])/l)}toString(){let e=this._imaginary.data;return`(${this._real}, ${e[0]}, ${e[1]}, ${e[2]})`}},Ue=class n extends ta{constructor(e,t,r,i){if(e===void 0){super(0,new I(0,0,0));return}if(e instanceof Or){super(e.GetReal(),new I(e.GetImaginary()));return}if(t===void 0){super(e,new I(0,0,0));return}if(typeof t=="number"){super(e,new I(t,r,i));return}let s=t instanceof Z?t.data:t;super(e,new I(s[0],s[1],s[2]))}_round(e){return e}_makeVec(e,t,r){return new I(e,t,r)}_create(e,t){let r=new n;return r._real=e,r._imaginary=t,r}GetImaginary(){return this._imaginary}static GetZero(){return new n(0)}static GetIdentity(){return new n(1)}},na=class n extends ta{constructor(e,t,r,i){if(e===void 0){super(0,new Ne(0,0,0));return}if(e instanceof Or){super(Math.fround(e.GetReal()),new Ne(e.GetImaginary()));return}if(t===void 0){super(Math.fround(e),new Ne(0,0,0));return}if(typeof t=="number"){super(Math.fround(e),new Ne(t,r,i));return}let s=t instanceof Z?t.data:t;super(Math.fround(e),new Ne(s[0],s[1],s[2]))}_round(e){return Math.fround(e)}_makeVec(e,t,r){return new Ne(e,t,r)}_create(e,t){let r=new n;return r._real=Math.fround(e),r._imaginary=t,r}GetImaginary(){return this._imaginary}static GetZero(){return new n(0)}static GetIdentity(){return new n(1)}},ra=class n extends ta{constructor(e,t,r,i){if(e===void 0){super(0,new Ut(0,0,0));return}if(e instanceof Or){super(Fn(e.GetReal()),new Ut(e.GetImaginary()));return}if(t===void 0){super(Fn(e),new Ut(0,0,0));return}if(typeof t=="number"){super(Fn(e),new Ut(t,r,i));return}let s=t instanceof Z?t.data:t;super(Fn(e),new Ut(s[0],s[1],s[2]))}_round(e){return Fn(e)}_makeVec(e,t,r){return new Ut(e,t,r)}_create(e,t){let r=new n;return r._real=Fn(e),r._imaginary=new Ut(t),r}GetImaginary(){return this._imaginary}static GetZero(){return new n(0)}static GetIdentity(){return new n(1)}};function lr(n,e){return n.GetImaginary().Dot(e.GetImaginary())+n.GetReal()*e.GetReal()}function bb(n){return n instanceof Ue||n instanceof na||n instanceof ra||n instanceof ea}function zv(n){return n instanceof I||n instanceof Ne||n instanceof Ut?n.data:n}var ef=class n{_real;_dual;constructor(e,t){if(e===void 0){this._real=this._zeroQuat(),this._dual=this._zeroQuat();return}if(e instanceof n){this._real=this._convertQuat(e.GetReal()),this._dual=this._convertQuat(e.GetDual());return}if(bb(e)){if(this._real=this._convertQuat(e),t===void 0){this._dual=this._zeroQuat();return}if(bb(t)){this._dual=this._convertQuat(t);return}this._dual=this._zeroQuat(),this.SetTranslation(t);return}this._real=this._quatFromReal(e),this._dual=this._zeroQuat()}GetReal(){return this._real}GetDual(){return this._dual}SetReal(e){this._real=this._convertQuat(e)}SetDual(e){this._dual=this._convertQuat(e)}SetTranslation(e){let t=zv(e),r=this._makeVec3(.5*t[0],.5*t[1],.5*t[2]),i=this._quatFromParts(0,r);this._dual=i.GetMultiply(this._real)}GetTranslation(){let e=this._dual.GetReal(),t=this._real.GetReal(),r=this._dual.GetImaginary().data,i=this._real.GetImaginary().data;return this._makeVec3(-2*(e*i[0]-t*r[0]+(r[1]*i[2]-r[2]*i[1])),-2*(e*i[1]-t*r[1]+(r[2]*i[0]-r[0]*i[2])),-2*(e*i[2]-t*r[2]+(r[0]*i[1]-r[1]*i[0])))}GetLength(){let e=this._real.GetLength();return e===0?[0,0]:[e,lr(this._real,this._dual)/e]}GetNormalized(e=1e-10){let t=this._create(this._convertQuat(this._real),this._convertQuat(this._dual));return t.Normalize(e),t}Normalize(e=1e-10){let t=this.GetLength(),r=t[0];if(r<e)this._real=this._identityQuat(),this._dual=this._zeroQuat();else{let i=1/r;this._real=this._real.GetScaled(i),this._dual=this._dual.GetScaled(i);let s=lr(this._real,this._dual);this._dual=this._dual.Subtract(this._real.GetScaled(s))}return t}GetConjugate(){return this._create(this._real.GetConjugate(),this._dual.GetConjugate())}GetInverse(){let e=lr(this._real,this._real);if(e<=0)return this._create(this._identityQuat(),this._zeroQuat());let t=1/e,r=this.GetConjugate().GetScaled(t),i=r.GetReal(),s=r.GetDual().Subtract(r.GetReal().GetScaled(2*t*lr(this._real,this._dual)));return this._create(i,s)}equals(e){return this._real.equals(e._real)&&this._dual.equals(e._dual)}GetMultiply(e){let t=this._real.GetMultiply(e._real),r=this._real.GetMultiply(e._dual).Add(this._dual.GetMultiply(e._real));return this._create(t,r)}GetScaled(e){return this._create(this._real.GetScaled(e),this._dual.GetScaled(e))}GetDivided(e){return this.GetScaled(1/e)}Add(e){return this._create(this._real.Add(e._real),this._dual.Add(e._dual))}Subtract(e){return this._create(this._real.Subtract(e._real),this._dual.Subtract(e._dual))}Transform(e){let t=e instanceof I||e instanceof Ne?e:this._makeVec3(e[0],e[1],e[2]),r=this._real.Transform(t).data,i=this.GetTranslation().data;return this._makeVec3(r[0]+i[0],r[1]+i[1],r[2]+i[2])}toString(){return`(${this._real.toString()}, ${this._dual.toString()})`}hash(){return`${this.constructor.name}:${this._real.hash()};${this._dual.hash()}`}},ws=class n extends ef{constructor(e,t){super(e,t)}_quatFromReal(e){return new Ue(e)}_quatFromParts(e,t){return new Ue(e,t)}_convertQuat(e){return new Ue(e)}_zeroQuat(){return Ue.GetZero()}_identityQuat(){return Ue.GetIdentity()}_makeVec3(e,t,r){return new I(e,t,r)}_create(e,t){return new n(e,t)}GetReal(){return this._real}GetDual(){return this._dual}GetTranslation(){return super.GetTranslation()}Transform(e){return super.Transform(e)}static GetZero(){return new n(Ue.GetZero(),Ue.GetZero())}static GetIdentity(){return new n(Ue.GetIdentity(),Ue.GetZero())}};var Nl=34028234663852886e22;function Vl(n){return n*n}var Gl=class n{static dimension=1;dimension=1;_min=0;_max=0;_make(e,t){return new this.constructor(e,t)}_initFromArgs(e){if(e.length===0){this.SetEmpty();return}if(e.length===1){let t=e[0];if(t instanceof n){this._min=this._round(t.GetMin()),this._max=this._round(t.GetMax());return}throw new TypeError("GfRange1: single-argument ctor expects another range")}this._min=this._round(e[0]),this._max=this._round(e[1])}SetEmpty(){this._min=Nl,this._max=-Nl}GetMin(){return this._min}GetMax(){return this._max}SetMin(e){this._min=this._round(e)}SetMax(e){this._max=this._round(e)}GetSize(){return this._max-this._min}GetMidpoint(){return .5*this._min+.5*this._max}IsEmpty(){return this._min>this._max}ExtendBy(e){return this.UnionWith(e)}Contains(e){return e instanceof n?this.Contains(e._min)&&this.Contains(e._max):e>=this._min&&e<=this._max}IsOutside(e){return e._max<this._min||e._min>this._max}static GetUnion(e,t){return e._make(Math.min(e._min,t._min),Math.max(e._max,t._max))}UnionWith(e){if(e instanceof n)e._min<this._min&&(this._min=e._min),e._max>this._max&&(this._max=e._max);else{let t=this._round(e);t<this._min&&(this._min=t),t>this._max&&(this._max=t)}return this}static GetIntersection(e,t){return e._make(Math.max(e._min,t._min),Math.min(e._max,t._max))}IntersectWith(e){return e._min>this._min&&(this._min=e._min),e._max<this._max&&(this._max=e._max),this}GetDistanceSquared(e){let t=0;return e<this._min?t+=Vl(this._min-e):e>this._max&&(t+=Vl(e-this._max)),t}GetSum(e){return this._make(this._min+e._min,this._max+e._max)}GetDifference(e){return this._make(this._min-e._max,this._max-e._min)}GetMultiplied(e){return e>0?this._make(this._min*e,this._max*e):this._make(this._max*e,this._min*e)}GetDivided(e){return this.GetMultiplied(1/e)}AddInPlace(e){return this._min=this._round(this._min+e._min),this._max=this._round(this._max+e._max),this}SubtractInPlace(e){return this._min=this._round(this._min-e._max),this._max=this._round(this._max-e._min),this}MultiplyInPlace(e){if(e>0)this._min=this._round(this._min*e),this._max=this._round(this._max*e);else{let t=this._min;this._min=this._round(this._max*e),this._max=this._round(t*e)}return this}DivideInPlace(e){return this.MultiplyInPlace(1/e)}equals(e){return this._min===this._round(e.GetMin())&&this._max===this._round(e.GetMax())}hash(){return`${this._min};${this._max}`}toString(){return`[${this._min}...${this._max}]`}repr(){return`Gf.${this.constructor.name}(${this._min}, ${this._max})`}},nn=class extends Gl{constructor(...e){super(),this._initFromArgs(e)}_round(e){return e}},$t=class extends Gl{constructor(...e){super(),this._initFromArgs(e)}_round(e){return Math.fround(e)}},Ml=class n{_min;_max;get dimension(){return this._min.dimension}_vec(e){return new this._VecCtor(e)}_make(e,t){return new this.constructor(e,t)}_initFromArgs(e){if(e.length===0){this.SetEmpty();return}if(e.length===1){let t=e[0];if(t instanceof n){this._min=this._vec(t.GetMin()),this._max=this._vec(t.GetMax());return}throw new TypeError("GfRange: single-argument ctor expects another range")}this._min=this._vec(e[0]),this._max=this._vec(e[1])}_componentwise(e,t,r){let i=e.data,s=t.data;return this._vec(i.map((o,a)=>r(o,s[a])))}SetEmpty(){this._min=new this._VecCtor(Nl),this._max=new this._VecCtor(-Nl)}GetMin(){return this._min}GetMax(){return this._max}SetMin(e){this._min=this._vec(e)}SetMax(e){this._max=this._vec(e)}GetSize(){return this._max.Subtract(this._min)}GetMidpoint(){return this._min.GetScaled(.5).Add(this._max.GetScaled(.5))}IsEmpty(){let e=this._min.data,t=this._max.data;for(let r=0;r<e.length;r++)if(e[r]>t[r])return!0;return!1}ExtendBy(e){return this.UnionWith(e)}Contains(e){if(e instanceof n)return this.Contains(e._min)&&this.Contains(e._max);let t=e.data,r=this._min.data,i=this._max.data;for(let s=0;s<t.length;s++)if(!(t[s]>=r[s]&&t[s]<=i[s]))return!1;return!0}IsOutside(e){let t=e._min.data,r=e._max.data,i=this._min.data,s=this._max.data;for(let o=0;o<i.length;o++)if(r[o]<i[o]||t[o]>s[o])return!0;return!1}static GetUnion(e,t){let r=e._componentwise(e._min,t._min,Math.min),i=e._componentwise(e._max,t._max,Math.max);return e._make(r,i)}UnionWith(e){return e instanceof n?(this._min=this._componentwise(this._min,e._min,Math.min),this._max=this._componentwise(this._max,e._max,Math.max)):(this._min=this._componentwise(this._min,e,Math.min),this._max=this._componentwise(this._max,e,Math.max)),this}static GetIntersection(e,t){let r=e._componentwise(e._min,t._min,Math.max),i=e._componentwise(e._max,t._max,Math.min);return e._make(r,i)}IntersectWith(e){return this._min=this._componentwise(this._min,e._min,Math.max),this._max=this._componentwise(this._max,e._max,Math.min),this}GetDistanceSquared(e){let t=0,r=e.data,i=this._min.data,s=this._max.data;for(let o=0;o<r.length;o++)r[o]<i[o]?t+=Vl(i[o]-r[o]):r[o]>s[o]&&(t+=Vl(r[o]-s[o]));return t}GetSum(e){return this._make(this._min.Add(e._min),this._max.Add(e._max))}GetDifference(e){return this._make(this._min.Subtract(e._max),this._max.Subtract(e._min))}GetMultiplied(e){return e>0?this._make(this._min.GetScaled(e),this._max.GetScaled(e)):this._make(this._max.GetScaled(e),this._min.GetScaled(e))}GetDivided(e){return this.GetMultiplied(1/e)}AddInPlace(e){return this._min=this._min.Add(e._min),this._max=this._max.Add(e._max),this}SubtractInPlace(e){return this._min=this._min.Subtract(e._max),this._max=this._max.Subtract(e._min),this}MultiplyInPlace(e){if(e>0)this._min=this._min.GetScaled(e),this._max=this._max.GetScaled(e);else{let t=this._min;this._min=this._max.GetScaled(e),this._max=t.GetScaled(e)}return this}DivideInPlace(e){return this.MultiplyInPlace(1/e)}equals(e){return this._min.equals(this._vec(e.GetMin()))&&this._max.equals(this._vec(e.GetMax()))}hash(){return`${this._min.data.join(",")};${this._max.data.join(",")}`}toString(){return`[${this._min.toString()}...${this._max.toString()}]`}repr(){return`Gf.${this.constructor.name}(${this._min.repr()}, ${this._max.repr()})`}},tf=class extends Ml{GetCorner(e){if(e<0||e>3)throw new Error(`Invalid corner ${e} > 3.`);let t=this._min.data,r=this._max.data;return this._vec([(e&1?r:t)[0],(e&2?r:t)[1]])}GetQuadrant(e){if(e<0||e>3)throw new Error(`Invalid quadrant ${e} > 3.`);let t=this.GetCorner(e).data,r=this._min.Add(this._max).GetScaled(.5).data;return this._make(this._vec([Math.min(t[0],r[0]),Math.min(t[1],r[1])]),this._vec([Math.max(t[0],r[0]),Math.max(t[1],r[1])]))}},ut=class n extends tf{constructor(...e){super(),this._initFromArgs(e)}get _VecCtor(){return F}static get unitSquare(){return new n(new F(0,0),new F(1,1))}};var nf=class extends Ml{GetCorner(e){if(e<0||e>7)throw new Error(`Invalid corner ${e} > 7.`);let t=this._min.data,r=this._max.data;return this._vec([(e&1?r:t)[0],(e&2?r:t)[1],(e&4?r:t)[2]])}GetOctant(e){if(e<0||e>7)throw new Error(`Invalid octant ${e} > 7.`);let t=this.GetCorner(e).data,r=this._min.Add(this._max).GetScaled(.5).data;return this._make(this._vec([Math.min(t[0],r[0]),Math.min(t[1],r[1]),Math.min(t[2],r[2])]),this._vec([Math.max(t[0],r[0]),Math.max(t[1],r[1]),Math.max(t[2],r[2])]))}},$e=class n extends nf{constructor(...e){super(),this._initFromArgs(e)}get _VecCtor(){return I}static get unitCube(){return new n(new I(0,0,0),new I(1,1,1))}};var Pb=1e-13,Fr=class n{_box;_matrix;_inverse;_isDegenerate;_hasZeroAreaPrimitives;constructor(e,t){if(this._box=new $e,this._matrix=new J,this._inverse=new J,this._isDegenerate=!1,this._hasZeroAreaPrimitives=!1,e===void 0){this._matrix.SetIdentity(),this._inverse.SetIdentity();return}if(e instanceof n){this._box=new $e(e._box),this._matrix=new J(e._matrix),this._inverse=new J(e._inverse),this._isDegenerate=e._isDegenerate,this._hasZeroAreaPrimitives=e._hasZeroAreaPrimitives;return}this._box=new $e(e),t===void 0?(this._matrix.SetIdentity(),this._inverse.SetIdentity()):this._SetMatrices(t)}Set(e,t){return this._box=new $e(e),this._SetMatrices(t),this}SetMatrix(e){return this._SetMatrices(e),this}SetRange(e){return this._box=new $e(e),this}GetRange(){return this._box}GetBox(){return this.GetRange()}GetMatrix(){return this._matrix}GetInverseMatrix(){return this._inverse}SetHasZeroAreaPrimitives(e){return this._hasZeroAreaPrimitives=e,this}HasZeroAreaPrimitives(){return this._hasZeroAreaPrimitives}GetVolume(){if(this._box.IsEmpty())return 0;let e=this._box.GetSize().data;return Math.abs(this._matrix.GetDeterminant3()*e[0]*e[1]*e[2])}Transform(e){return this._SetMatrices(this._matrix.GetMultiply(e)),this}ComputeAlignedRange(){if(this._box.IsEmpty())return new $e(this._box);let e=this._matrix,t=[e.GetElement(3,0),e.GetElement(3,1),e.GetElement(3,2)],r=[t[0],t[1],t[2]],i=[t[0],t[1],t[2]],s=this._box.GetMin().data,o=this._box.GetMax().data;for(let a=0;a<3;a++)for(let c=0;c<3;c++){let l=e.GetElement(c,a),u=s[c]*l,d=o[c]*l;u<d?(r[a]+=u,i[a]+=d):(r[a]+=d,i[a]+=u)}return new $e(new I(...r),new I(...i))}ComputeAlignedBox(){return this.ComputeAlignedRange()}ComputeCentroid(){let e=this.GetRange().GetMax(),t=this.GetRange().GetMin(),r=e.Add(t).GetScaled(.5);return this.GetMatrix().Transform(r)}static Combine(e,t){let r;if(e.GetRange().IsEmpty())r=new n(t);else if(t.GetRange().IsEmpty())r=new n(e);else if(e._isDegenerate)t._isDegenerate?r=new n($e.GetUnion(e.ComputeAlignedRange(),t.ComputeAlignedRange())):r=n._CombineInOrder(t,e);else if(t._isDegenerate)r=n._CombineInOrder(e,t);else{let i=n._CombineInOrder(e,t),s=n._CombineInOrder(t,e),o=i.GetVolume(),a=s.GetVolume(),c=Math.max(1e-10,1e-6*Math.abs(Math.max(o,a)));r=Math.abs(o-a)<=c||o<a?i:s}return r.SetHasZeroAreaPrimitives(e.HasZeroAreaPrimitives()||t.HasZeroAreaPrimitives()),r}static _CombineInOrder(e,t){let r=new n;r._box=new $e(t._box),r._matrix=t._matrix.GetMultiply(e._inverse),r._inverse=e._matrix.GetMultiply(t._inverse);let i=r.ComputeAlignedRange(),s=new n(e);return s._box.UnionWith(i),s}_SetMatrices(e){this._isDegenerate=!1,this._matrix=new J(e);let t=e.GetDeterminant();this._inverse=e.GetInverse(Pb),Math.abs(t)<=Pb&&(this._isDegenerate=!0,this._inverse.SetIdentity())}equals(e){return this._box.equals(e._box)&&this._matrix.equals(e._matrix)}hash(){return`${this._box.hash()}|${this._matrix.hash()}`}toString(){return`[(${this._box.toString()}) (${this._matrix.toString()}) ${this._hasZeroAreaPrimitives?"true":"false"}]`}repr(){return`Gf.BBox3d(${this._box.repr()}, ${this._matrix.repr()})`}};var Ee=class{_normal;_distance;constructor(e,t,r){if(this._normal=new I(0,0,0),this._distance=0,e!==void 0){if(e instanceof Re){this.SetFromEquation(e);return}if(r!==void 0){this.SetFromPoints(e,t,r);return}if(typeof t=="number"){this.Set(e,t);return}this.SetFromNormalAndPoint(e,t)}}Set(e,t){return this._normal=e.GetNormalized(),this._distance=t,this}SetFromNormalAndPoint(e,t){return this._normal=e.GetNormalized(),this._distance=me(this._normal,t),this}SetFromPoints(e,t,r){return this._normal=t.Subtract(e).Cross(r.Subtract(e)).GetNormalized(),this._distance=me(this._normal,e),this}SetFromEquation(e){let t=new I(e.get(0),e.get(1),e.get(2));this._distance=-e.get(3);let r=t.Normalize();return r!==0&&(this._distance/=r),this._normal=t,this}GetNormal(){return this._normal}GetDistanceFromOrigin(){return this._distance}get normal(){return this._normal}get distanceFromOrigin(){return this._distance}GetEquation(){return new Re(this._normal.get(0),this._normal.get(1),this._normal.get(2),-this._distance)}equals(e){return this._normal.equals(e._normal)&&this._distance===e._distance}GetDistance(e){return me(e,this._normal)-this._distance}Project(e){return e.Subtract(this._normal.GetScaled(this.GetDistance(e)))}Transform(e){let r=e.GetInverse().GetTranspose().MultVecMatrix(this.GetEquation());return this.SetFromEquation(r),this}Reorient(e){return this.GetDistance(e)<0&&(this._normal=this._normal.GetNegated(),this._distance=-this._distance),this}IntersectsPositiveHalfSpace(e){if(e instanceof $e){let t=e;if(t.IsEmpty())return!1;let r=0,i=t.GetMin().data,s=t.GetMax().data,o=this._normal.data;for(let a=0;a<3;a++){let c=o[a]>=0?s[a]:i[a];r+=o[a]*c}return r>=this._distance}return this.GetDistance(e)>=0}toString(){return`[${this._normal.toString()} ${this._distance}]`}repr(){return`Gf.Plane(${this._normal.repr()}, ${this._distance})`}};var ks=class{_p0;_dir;constructor(e,t){this._p0=new I,this._dir=new I,e!==void 0&&t!==void 0&&this.Set(e,t)}Set(e,t){return this._p0=new I(e),this._dir=new I(t),this._dir.Normalize()}GetPoint(e){return this._p0.Add(this._dir.GetScaled(e))}GetDirection(){return this._dir}SetDirection(e){this.Set(this.GetPoint(0),e)}GetP0(){return this._p0}FindClosestPoint(e){let r=e.Subtract(this._p0).Dot(this._dir);return{point:this.GetPoint(r),t:r}}equals(e){return this._p0.equals(e._p0)&&this._dir.equals(e._dir)}toString(){return`(point:${this.GetPoint(0).toString()} direction:${this._dir.toString()})`}};var Br=1e-10,rf=1e-6,ia=n=>Math.abs(n),Ii=n=>n*n,Kv=n=>Math.sqrt(n),qv=(n,e)=>e<0||Object.is(e,-0)?-n:n,sf=(n,e,t)=>ia(n-e)<t,ur=class n{_startPoint;_direction;constructor(e,t){this._startPoint=new I,this._direction=new I,e!==void 0&&t!==void 0&&this.SetPointAndDirection(e,t)}SetPointAndDirection(e,t){this._startPoint=new I(e),this._direction=new I(t)}SetEnds(e,t){this._startPoint=new I(e),this._direction=t.Subtract(e)}GetStartPoint(){return this._startPoint}GetDirection(){return this._direction}get startPoint(){return this._startPoint}set startPoint(e){this._startPoint=new I(e)}get direction(){return this._direction}set direction(e){this._direction=new I(e)}GetPoint(e){return this._startPoint.Add(this._direction.GetScaled(e))}Transform(e){return this._startPoint=e.Transform(this._startPoint),this._direction=e.TransformDir(this._direction),this}FindClosestPoint(e){let t=new ks,r=t.Set(this._startPoint,this._direction),s=t.FindClosestPoint(e).t;return s<0&&(s=0),{point:t.GetPoint(s),rayDistance:s/r}}equals(e){return this._startPoint.equals(e._startPoint)&&this._direction.equals(e._direction)}toString(){return`[${this._startPoint.toString()} >> ${this._direction.toString()}]`}Intersect(e,t,r,i){if(e instanceof Ee)return this._intersectPlane(e);if(e instanceof $e)return this._intersectRange(e);if(e instanceof Fr)return this._intersectBBox(e);if(t instanceof I){if(r instanceof I)return this._intersectTriangle(e,t,r,i);let s=r;return i!==void 0?this._intersectCone(e,t,s,i):this._intersectCylinder(e,t,s)}return this._intersectSphere(e,t)}_intersectTriangle(e,t,r,i){let s={hit:!1,distance:0,barycentricCoords:new I(0,0,0),frontFacing:!1},o=i===void 0?1/0:i,a=new Ee(e,t,r),c=this._intersectPlane(a);if(!c.hit)return s;let l=c.distance,u=c.frontFacing;if(l>o)return s;let d=a.GetNormal().data,p=ia(d[0]),f=ia(d[1]),h=ia(d[2]),y,g;p>f&&p>h?(y=1,g=2):f>h?(y=2,g=0):(y=0,g=1);let m=this._startPoint.data,P=this._direction.data,b=e.data,S=t.data,x=r.data,v=m[y]+l*P[y],T=m[g]+l*P[g],w=new F(v-b[y],T-b[g]).data,D=new F(S[y]-b[y],S[g]-b[g]).data,G=new F(x[y]-b[y],x[g]-b[g]).data,_=(w[1]*D[0]-w[0]*D[1])/(G[1]*D[0]-G[0]*D[1]);if(_<0&&_>-Br&&(_=0),_<0||_>1)return s;let k=-1;D[1]<-Br||D[1]>Br?k=(w[1]-_*G[1])/D[1]:k=(w[0]-_*G[0])/D[0],k<0&&k>-Br&&(k=0);let E=Math.fround(1-(k+_));return E<0&&E>-Br&&(E=0),k<0||E<0?s:{hit:!0,distance:l,barycentricCoords:new I(E,k,_),frontFacing:u}}_intersectPlane(e){let t={hit:!1,distance:0,frontFacing:!1},r=me(this._direction,e.GetNormal());if(r<Br&&r>-Br)return t;let i=e.GetNormal().GetScaled(e.GetDistanceFromOrigin()),s=me(i.Subtract(this._startPoint),e.GetNormal())/r;return s<0?t:{hit:!0,distance:s,frontFacing:r<0}}_intersectRange(e){let t={hit:!1,enterDistance:0,exitDistance:0};if(e.IsEmpty())return t;let r=Number.MAX_VALUE,i=-r,s=r,o=this._direction.data,a=this._startPoint.data,c=e.GetMin().data,l=e.GetMax().data;for(let u=0;u<3;u++){let d=o[u];if(ia(d)<Br){if(a[u]<c[u]||a[u]>l[u])return t;continue}d=1/d;let p=d*(c[u]-a[u]),f=d*(l[u]-a[u]);if(p>f){let h=p;p=f,f=h}p>i&&(i=p),f<s&&(s=f)}return i>s||s<0?t:{hit:!0,enterDistance:i,exitDistance:s}}_intersectBBox(e){let t=new n(this._startPoint,this._direction);return t.Transform(e.GetInverseMatrix()),t._intersectRange(e.GetRange())}_intersectSphere(e,t){let r=this._startPoint,i=r.Add(this._direction),s=r.data,o=i.data,a=e.data,c=s[0],l=s[1],u=s[2],d=o[0],p=o[1],f=o[2],h=a[0],y=a[1],g=a[2],m=(d-c)*(d-c)+(p-l)*(p-l)+(f-u)*(f-u),P=2*((d-c)*(c-h)+(p-l)*(l-y)+(f-u)*(u-g)),b=h*h+y*y+g*g+c*c+l*l+u*u-2*(h*c+y*l+g*u)-t*t;return this._solveQuadratic(m,P,b)}_intersectCylinder(e,t,r){let i=t.GetNormalized(),s=this._startPoint.Subtract(e),o=this._direction.Subtract(i.GetScaled(me(this._direction,i))),a=s.Subtract(i.GetScaled(me(s,i))),c=me(o,o),l=2*me(o,a),u=me(a,a)-Ii(r);return this._solveQuadratic(c,l,u)}_intersectCone(e,t,r,i){let s=t.GetNormalized(),o=e.Add(s.GetScaled(i)),a=this._startPoint.Subtract(o),c=this._direction.Subtract(s.GetScaled(me(this._direction,s))),l=a.Subtract(s.GetScaled(me(a,s))),u=me(this._direction,s),d=me(a,s),p=Ii(i)/(Ii(i)+Ii(r)),f=1-p,h=p*me(c,c)-f*Ii(u),y=2*(p*me(c,l)-f*u*d),g=p*me(l,l)-f*Ii(d),m=this._solveQuadratic(h,y,g);if(!m.hit)return{hit:!1,enterDistance:0,exitDistance:0};let P=m.enterDistance,b=m.exitDistance,S=me(s,this.GetPoint(P).Subtract(o))<=0,x=me(s,this.GetPoint(b).Subtract(o))<=0;return!S&&!x?{hit:!1,enterDistance:0,exitDistance:0}:(S?x||(b=P):P=b,{hit:!0,enterDistance:P,exitDistance:b})}_solveQuadratic(e,t,r){let i={hit:!1,enterDistance:0,exitDistance:0};if(sf(e,0,rf)){if(sf(t,0,rf))return i;let l=-r/t;return l<0?i:{hit:!0,enterDistance:l,exitDistance:l}}let s=Ii(t)-4*e*r;if(sf(s,0,rf)){let l=-t/(2*e);return l<0?i:{hit:!0,enterDistance:l,exitDistance:l}}if(s<0)return i;let o=-.5*(t+qv(1,t)*Kv(s)),a=o/e,c=r/o;if(a>c){let l=a;a=c,c=l}return c>=0?{hit:!0,enterDistance:a,exitDistance:c}:i}};var dr=class n{static Orthographic=0;static Perspective=1;_position;_rotation;_window;_nearFar;_viewDistance;_projectionType;_planes=null;constructor(e,t,r,i,s,o=5){if(e===void 0){this._position=new I(0,0,0),this._rotation=_s(),this._window=new ut(new F(-1,-1),new F(1,1)),this._nearFar=new nn(1,10),this._viewDistance=5,this._projectionType=n.Perspective;return}if(e instanceof n){this._position=new I(e._position),this._rotation={axis:[...e._rotation.axis],angle:e._rotation.angle},this._window=new ut(e._window),this._nearFar=new nn(e._nearFar),this._viewDistance=e._viewDistance,this._projectionType=e._projectionType;return}if(e instanceof J){this._window=new ut(t),this._nearFar=new nn(r),this._projectionType=i,this._viewDistance=s??5,this._position=new I(0,0,0),this._rotation=_s(),this.SetPositionAndRotationFromMatrix(e);return}this._position=new I(e),this._rotation={axis:[...t.axis],angle:t.angle},this._window=new ut(r),this._nearFar=new nn(i),this._projectionType=s,this._viewDistance=o}equals(e){return!(!this._position.equals(e._position)||!El(this._rotation,e._rotation)||!this._window.equals(e._window)||!this._nearFar.equals(e._nearFar)||this._viewDistance!==e._viewDistance||this._projectionType!==e._projectionType)}hash(){return[this._position.hash(),this._rotation.axis.join(",")+";"+this._rotation.angle,this._window.hash(),this._nearFar.hash(),this._viewDistance,this._projectionType].join("|")}toString(){let e=this._projectionType===n.Perspective?"perspective":"orthographic";return`[${this._position.toString()} ${Zo(this._rotation)} ${this._window.toString()} ${this._nearFar.toString()} ${this._viewDistance} ${e}]`}repr(){return`Gf.Frustum(${this._position.repr()}, ${Zo(this._rotation)}, ${this._window.repr()}, ${this._nearFar.repr()}, Gf.Frustum.${this._projectionType===n.Perspective?"Perspective":"Orthographic"}, ${this._viewDistance})`}SetPosition(e){this._position=new I(e),this._DirtyFrustumPlanes()}GetPosition(){return this._position}get position(){return this._position}set position(e){this.SetPosition(e)}SetRotation(e){this._rotation={axis:[...e.axis],angle:e.angle},this._DirtyFrustumPlanes()}GetRotation(){return this._rotation}get rotation(){return this._rotation}set rotation(e){this.SetRotation(e)}SetPositionAndRotationFromMatrix(e){let t=new J(e);t.IsRightHanded()||(t=new J(new Re(-1,1,1,1)).GetMultiply(t)),t.Orthonormalize(),this.SetRotation(t.ExtractRotation()),this.SetPosition(t.ExtractTranslation())}SetWindow(e){this._window=new ut(e),this._DirtyFrustumPlanes()}GetWindow(){return this._window}get window(){return this._window}set window(e){this.SetWindow(e)}static GetReferencePlaneDepth(){return 1}SetNearFar(e){this._nearFar=new nn(e),this._DirtyFrustumPlanes()}GetNearFar(){return this._nearFar}get nearFar(){return this._nearFar}set nearFar(e){this.SetNearFar(e)}SetViewDistance(e){this._viewDistance=e}GetViewDistance(){return this._viewDistance}get viewDistance(){return this._viewDistance}set viewDistance(e){this._viewDistance=e}SetProjectionType(e){this._projectionType=e,this._DirtyFrustumPlanes()}GetProjectionType(){return this._projectionType}get projectionType(){return this._projectionType}set projectionType(e){this.SetProjectionType(e)}SetPerspective(e,t,r,i,s){typeof t=="boolean"?this._setPerspective(e,t,r,i,s):this._setPerspective(e,!0,t,r,i)}_setPerspective(e,t,r,i,s){this._projectionType=n.Perspective;let o=1,a=1,c=r;c===0&&(c=1),t?(o=Math.tan(_i(e/2))*n.GetReferencePlaneDepth(),a=o*c):(a=Math.tan(_i(e/2))*n.GetReferencePlaneDepth(),o=a/c),this._window.SetMin(new F(-a,-o)),this._window.SetMax(new F(a,o)),this._nearFar.SetMin(i),this._nearFar.SetMax(s),this._DirtyFrustumPlanes()}GetPerspective(e){if(this._projectionType!==n.Perspective)return null;let t=this._window.GetSize().data,r;e?r=2*vs(Math.atan(t[1]/(2*n.GetReferencePlaneDepth()))):r=2*vs(Math.atan(t[0]/(2*n.GetReferencePlaneDepth())));let i=t[0]/t[1],s=this._nearFar.GetMin(),o=this._nearFar.GetMax();return[r,i,s,o]}GetFOV(e=!1){let t=0;if(this.GetProjectionType()===n.Perspective){let r=this.GetPerspective(e);r&&(t=r[0])}return t}SetOrthographic(e,t,r,i,s,o){this._projectionType=n.Orthographic,this._window.SetMin(new F(e,r)),this._window.SetMax(new F(t,i)),this._nearFar.SetMin(s),this._nearFar.SetMax(o),this._DirtyFrustumPlanes()}GetOrthographic(){if(this._projectionType!==n.Orthographic)return null;let e=this._window.GetMin().data,t=this._window.GetMax().data;return[e[0],t[0],e[1],t[1],this._nearFar.GetMin(),this._nearFar.GetMax()]}FitToSphere(e,t,r=0){if(this._projectionType===n.Orthographic)this._viewDistance=t+r,this._window=new ut(new F(-t,-t),new F(t,t));else{let i=this.ComputeAspectRatio()>1?1:0,s=this._window.GetMin().data[i],o=this._window.GetMax().data[i],a;s>0?a=o:o<0||-s>o?a=s:a=o,a<0?a=-a:a===0&&(a=1),this._viewDistance=t*(1/a)*Math.sqrt(Cl(a)+Cl(this._nearFar.GetMin()))}this._nearFar.SetMin(this._viewDistance-(t+r)),this._nearFar.SetMax(this._nearFar.GetMin()+2*(t+r)),this._position=e.Subtract(this.ComputeViewDirection().GetScaled(this._viewDistance)),this._DirtyFrustumPlanes()}Transform(e){let t=new n;t._projectionType=this._projectionType,t._position=e.Transform(this._position);let r=this.ComputeViewDirection(),i=this.ComputeUpVector(),s=e.TransformDir(r),o=e.TransformDir(i),a=s.Normalize();o.Normalize();let c=vl(s,o);c.Normalize();let l=new J;l.SetIdentity(),l.SetRow3(0,c),l.SetRow3(1,o),l.SetRow3(2,s.GetNegated()),t._rotation=l.ExtractRotation(),t._nearFar=this._nearFar.GetMultiplied(a),t._viewDistance=this._viewDistance*a;let u=this._window.GetMin().data,d=this._window.GetMax().data,p=this._position.Add(this._rotateDir(this._rotation,new I(u[0],u[1],-1))),f=this._position.Add(this._rotateDir(this._rotation,new I(d[0],d[1],-1)));p=e.Transform(p),f=e.Transform(f),p=p.Subtract(t._position),f=f.Subtract(t._position),p=this._rotateDir(Is(t._rotation),p),f=this._rotateDir(Is(t._rotation),f),this._projectionType===n.Perspective&&(p=p.GetScaled(1/a),f=f.GetScaled(1/a));let h=p.data,y=f.data;t._window.SetMin(new F(h[0],h[1])),t._window.SetMax(new F(y[0],y[1]));let g=t._window.GetMin().data.slice(),m=t._window.GetMax().data.slice();if(g[0]>m[0]){let P=g[0];g[0]=m[0],m[0]=P}if(g[1]>m[1]){let P=g[1];g[1]=m[1],m[1]=P}return t._window.SetMin(new F(g[0],g[1])),t._window.SetMax(new F(m[0],m[1])),this._copyFrom(t),this}ComputeViewDirection(){return this._rotateDir(this._rotation,new I(0,0,-1))}ComputeUpVector(){return this._rotateDir(this._rotation,new I(0,1,0))}ComputeViewFrame(){let e=this.ComputeUpVector(),t=this.ComputeViewDirection();return{side:vl(t,e),up:e,view:t}}ComputeLookAtPoint(){return this._position.Add(this.ComputeViewDirection().GetScaled(this._viewDistance))}ComputeViewMatrix(){let e=new J().SetTranslate(this._position.GetNegated()),t=new J().SetRotate(Is(this._rotation));return e.GetMultiply(t)}ComputeViewInverse(){return this.ComputeViewMatrix().GetInverse()}ComputeProjectionMatrix(){let e=new J;e.SetIdentity();let t=this._window.GetMin().data[0],r=this._window.GetMax().data[0],i=this._window.GetMin().data[1],s=this._window.GetMax().data[1],o=this._nearFar.GetMin(),a=this._nearFar.GetMax(),c=r-t,l=s-i,u=a-o;return this._projectionType===n.Orthographic?(e.SetElement(0,0,2/c),e.SetElement(1,1,2/l),e.SetElement(2,2,-2/u),e.SetElement(3,0,-(r+t)/c),e.SetElement(3,1,-(s+i)/l),e.SetElement(3,2,-(a+o)/u)):(e.SetElement(0,0,2/c),e.SetElement(1,1,2/l),e.SetElement(2,2,-(a+o)/u),e.SetElement(2,0,(r+t)/c),e.SetElement(2,1,(s+i)/l),e.SetElement(3,2,-2*o*a/u),e.SetElement(2,3,-1),e.SetElement(3,3,0)),e}ComputeAspectRatio(){let e=this._window.GetSize().data,t=0;return e[1]!==0&&(t=Math.abs(e[0]/e[1])),t}ComputeCorners(){let e=this._window.GetMin().data,t=this._window.GetMax().data,r=this._nearFar.GetMin(),i=this._nearFar.GetMax(),s=[];this._projectionType===n.Perspective?(s.push(new I(r*e[0],r*e[1],-r)),s.push(new I(r*t[0],r*e[1],-r)),s.push(new I(r*e[0],r*t[1],-r)),s.push(new I(r*t[0],r*t[1],-r)),s.push(new I(i*e[0],i*e[1],-i)),s.push(new I(i*t[0],i*e[1],-i)),s.push(new I(i*e[0],i*t[1],-i)),s.push(new I(i*t[0],i*t[1],-i))):(s.push(new I(e[0],e[1],-r)),s.push(new I(t[0],e[1],-r)),s.push(new I(e[0],t[1],-r)),s.push(new I(t[0],t[1],-r)),s.push(new I(e[0],e[1],-i)),s.push(new I(t[0],e[1],-i)),s.push(new I(e[0],t[1],-i)),s.push(new I(t[0],t[1],-i)));let o=this.ComputeViewInverse();for(let a=0;a<8;a++)s[a]=o.Transform(s[a]);return s}ComputeCornersAtDistance(e){let t=this._window.GetMin().data,r=this._window.GetMax().data,i=[];this._projectionType===n.Perspective?(i.push(new I(e*t[0],e*t[1],-e)),i.push(new I(e*r[0],e*t[1],-e)),i.push(new I(e*t[0],e*r[1],-e)),i.push(new I(e*r[0],e*r[1],-e))):(i.push(new I(t[0],t[1],-e)),i.push(new I(r[0],t[1],-e)),i.push(new I(t[0],r[1],-e)),i.push(new I(r[0],r[1],-e)));let s=this.ComputeViewInverse();for(let o=0;o<4;o++)i[o]=s.Transform(i[o]);return i}ComputeNarrowedFrustum(e,t){if(e instanceof I){let s=this.ComputeViewMatrix().Transform(e).data;if(s[2]>=0)return new n(this);let o=new F(s[0],s[1]);return this._projectionType===n.Perspective&&(o=o.GetScaled(1/-s[2])),this._ComputeNarrowedFrustumSub(o,t)}let r=xb(e,this._window);return this._ComputeNarrowedFrustumSub(r,t)}_ComputeNarrowedFrustumSub(e,t){let r=new n(this),i=Ko(t,this._window.GetSize()).GetScaled(.5),s=e.Subtract(i).data.slice(),o=e.Add(i).data.slice(),a=this._window.GetMin().data,c=this._window.GetMax().data;return s[0]<a[0]&&(s[0]=a[0]),s[1]<a[1]&&(s[1]=a[1]),o[0]>c[0]&&(o[0]=c[0]),o[1]>c[1]&&(o[1]=c[1]),r.SetWindow(new ut(new F(s[0],s[1]),new F(o[0],o[1]))),r}ComputeRay(e){if(e instanceof I){let o=this.ComputeViewMatrix().Transform(e),a,c;if(this._projectionType===n.Perspective)a=new I(0,0,0),c=o.GetNormalized();else{let p=o.data;a=new I(p[0],p[1],0),c=new I(0,0,-1)}let l=this.ComputeViewInverse(),u=l.Transform(a),d=l.TransformDir(c);return new ur(u,d)}let t=Sb(this._projectionType,this._window,e,this._nearFar.GetMin()),r=this.ComputeViewInverse(),i=r.Transform(t.GetStartPoint()),s=r.TransformDir(t.GetDirection());return new ur(i,s)}ComputePickRay(e){if(e instanceof I){let r=this.ComputeViewMatrix().Transform(e),i,s;if(this._projectionType===n.Perspective)i=new I(0,0,0),s=r.GetNormalized();else{let o=r.data;i=new I(o[0],o[1],0),s=new I(0,0,-1)}return this._ComputePickRayOffsetToNearPlane(i,s)}let t=Sb(this._projectionType,this._window,e,this._nearFar.GetMin());return this._ComputePickRayOffsetToNearPlane(t.GetStartPoint(),t.GetDirection())}_ComputePickRayOffsetToNearPlane(e,t){let r=e.Add(t.GetScaled(this._nearFar.GetMin())),i=this.ComputeViewInverse(),s=i.Transform(r),o=i.TransformDir(t);return new ur(s,o)}Intersects(e,t,r){return e instanceof Fr?this._intersectsBBox(e):t===void 0?this._intersectsPoint(e):r===void 0?this._intersectsSegment(e,t):this._intersectsTriangle(e,t,r)}ComputePlanes(){return this._CalculateFrustumPlanes(),this._planes.map(e=>new Ee(e.GetNormal(),e.GetDistanceFromOrigin()))}_intersectsBBox(e){if(e.GetBox().IsEmpty())return!1;this._CalculateFrustumPlanes();let t=e.GetRange(),r=e.GetInverseMatrix();for(let i of this._planes){let s=new Ee(i.GetNormal(),i.GetDistanceFromOrigin());if(s.Transform(r),!s.IntersectsPositiveHalfSpace(t))return!1}return!0}_intersectsPoint(e){this._CalculateFrustumPlanes();for(let t of this._planes)if(!t.IntersectsPositiveHalfSpace(e))return!1;return!0}_intersectsSegment(e,t){this._CalculateFrustumPlanes();let r=this._planes;return this._segmentIntersects(e,sa(r,e),t,sa(r,t))}_intersectsTriangle(e,t,r){this._CalculateFrustumPlanes();let i=this._planes,s=sa(i,e),o=sa(i,t),a=sa(i,r);if(((s|o|a)&63)!==63)return!1;if(s===63||o===63||a===63||this._segmentIntersects(e,s,t,o)||this._segmentIntersects(t,o,r,a)||this._segmentIntersects(r,a,e,s))return!0;let c=4,l=16,u=32;s&l&&o&l&&a&l&&s&u&&o&u&&a&u&&(c=1);for(let d=0;d<c;d++){let p=d===0?new F(-1,-1):d===1?new F(-1,1):d===2?new F(1,1):new F(1,-1);if(this.ComputePickRay(p).Intersect(e,t,r).hit)return!0}return!1}_segmentIntersects(e,t,r,i){if(((t|i)&63)!==63)return!1;if(t===63||i===63)return!0;let s=0,o=1,a=r.Subtract(e),c=this._planes;for(let l=0;l<c.length;l++){let u=c[l],d=1<<l,p=t&d,f=i&d;if(p===f)continue;let h=-u.GetDistance(e)/u.GetNormal().Dot(a);if(p?h<o&&(o=h):h>s&&(s=h),s>o)return!1}return!0}static IntersectsViewVolume(e,t){let r=e.GetRange().GetMin().data,i=e.GetRange().GetMax().data,s=[new Re(r[0],r[1],r[2],1),new Re(r[0],r[1],i[2],1),new Re(r[0],i[1],r[2],1),new Re(r[0],i[1],i[2],1),new Re(i[0],r[1],r[2],1),new Re(i[0],r[1],i[2],1),new Re(i[0],i[1],r[2],1),new Re(i[0],i[1],i[2],1)],o=e.GetMatrix().GetMultiply(t),a=0;for(let c=0;c<8;c++){let l=o.MultVecMatrix(s[c]).data,u=0;u=u<<1|(l[0]<l[3]?1:0),u=u<<1|(l[0]>-l[3]?1:0),u=u<<1|(l[1]<l[3]?1:0),u=u<<1|(l[1]>-l[3]?1:0),u=u<<1|(l[2]<l[3]?1:0),u=u<<1|(l[2]>-l[3]?1:0),a|=u}return a===63}_DirtyFrustumPlanes(){this._planes=null}_copyFrom(e){this._position=e._position,this._rotation=e._rotation,this._window=e._window,this._nearFar=e._nearFar,this._viewDistance=e._viewDistance,this._projectionType=e._projectionType,this._planes=null}_rotateDir(e,t){return new J().SetRotate(e).TransformDir(t)}_CalculateFrustumPlanes(){if(this._planes)return;let e=new Array(6),t=this._window.GetMin().data,r=this._window.GetMax().data,i=this._nearFar.GetMin(),s=this._nearFar.GetMax(),o=this.ComputeViewInverse();if(this._projectionType===n.Perspective){let a=new I(0,0,0),c=new I(i*t[0],i*t[1],-i),l=new I(i*r[0],i*t[1],-i),u=new I(i*t[0],i*r[1],-i),d=new I(i*r[0],i*r[1],-i);a=o.Transform(a),c=o.Transform(c),l=o.Transform(l),u=o.Transform(u),d=o.Transform(d),e[0]=new Ee(a,c,u),e[1]=new Ee(a,d,l),e[2]=new Ee(a,l,c),e[3]=new Ee(a,u,d),e[4]=new Ee(l,c,u)}else{let a=new I(t[0],t[1],-i),c=new I(r[0],t[1],-i),l=new I(t[0],r[1],-i),u=new I(r[0],r[1],-i);a=o.Transform(a),c=o.Transform(c),l=o.Transform(l),u=o.Transform(u);let d=o.TransformDir(new I(0,0,-1));e[0]=new Ee(l.Add(d),l,a),e[1]=new Ee(c.Add(d),c,u),e[2]=new Ee(a.Add(d),a,c),e[3]=new Ee(u.Add(d),u,l),e[4]=new Ee(c,a,l)}e[5]=new Ee(e[4].GetNormal().GetNegated(),-(e[4].GetDistanceFromOrigin()+(s-i))),this._planes=e}};function xb(n,e){let t=new F(1,1).Add(n).GetScaled(.5);return e.GetMin().Add(Ko(t,e.GetSize()))}function Sb(n,e,t,r){let i=xb(t,e).data,s,o;return n===dr.Perspective?(s=new I(0,0,0),o=new I(i[0],i[1],-1).GetNormalized()):(s=new I(i[0],i[1],-r),o=new I(0,0,-1)),new ur(s,o)}function sa(n,e){return(n[0].IntersectsPositiveHalfSpace(e)?1:0)<<0|(n[1].IntersectsPositiveHalfSpace(e)?1:0)<<1|(n[2].IntersectsPositiveHalfSpace(e)?1:0)<<2|(n[3].IntersectsPositiveHalfSpace(e)?1:0)<<3|(n[4].IntersectsPositiveHalfSpace(e)?1:0)<<4|(n[5].IntersectsPositiveHalfSpace(e)?1:0)<<5}var K=Math.fround;var Cs=class n{static Perspective=0;static Orthographic=1;static FOVHorizontal=0;static FOVVertical=1;static APERTURE_UNIT=.1;static FOCAL_LENGTH_UNIT=.1;static DEFAULT_HORIZONTAL_APERTURE=.825*2.54/n.APERTURE_UNIT;static DEFAULT_VERTICAL_APERTURE=.602*2.54/n.APERTURE_UNIT;_transform;_projection;_horizontalAperture;_verticalAperture;_horizontalApertureOffset;_verticalApertureOffset;_focalLength;_clippingRange;_clippingPlanes;_fStop;_focusDistance;constructor(e,t=n.Perspective,r=n.DEFAULT_HORIZONTAL_APERTURE,i=n.DEFAULT_VERTICAL_APERTURE,s=0,o=0,a=50,c=new $t(1,1e6),l=[],u=0,d=0){if(e instanceof n){this._transform=new J(e._transform),this._projection=e._projection,this._horizontalAperture=e._horizontalAperture,this._verticalAperture=e._verticalAperture,this._horizontalApertureOffset=e._horizontalApertureOffset,this._verticalApertureOffset=e._verticalApertureOffset,this._focalLength=e._focalLength,this._clippingRange=new $t(e._clippingRange),this._clippingPlanes=e._clippingPlanes.map(p=>new en(p)),this._fStop=e._fStop,this._focusDistance=e._focusDistance;return}this._transform=e!==void 0?new J(e):new J(1),this._projection=t,this._horizontalAperture=K(r),this._verticalAperture=K(i),this._horizontalApertureOffset=K(s),this._verticalApertureOffset=K(o),this._focalLength=K(a),this._clippingRange=new $t(c),this._clippingPlanes=l.map(p=>new en(p)),this._fStop=K(u),this._focusDistance=K(d)}SetTransform(e){this._transform=new J(e)}SetProjection(e){this._projection=e}SetFocalLength(e){this._focalLength=K(e)}SetHorizontalAperture(e){this._horizontalAperture=K(e)}SetVerticalAperture(e){this._verticalAperture=K(e)}SetHorizontalApertureOffset(e){this._horizontalApertureOffset=K(e)}SetVerticalApertureOffset(e){this._verticalApertureOffset=K(e)}SetClippingRange(e){this._clippingRange=new $t(e)}SetClippingPlanes(e){this._clippingPlanes=e.map(t=>new en(t))}SetFStop(e){this._fStop=K(e)}SetFocusDistance(e){this._focusDistance=K(e)}SetPerspectiveFromAspectRatioAndFieldOfView(e,t,r,i=n.DEFAULT_HORIZONTAL_APERTURE){this._projection=n.Perspective,this._horizontalAperture=K(i),this._verticalAperture=K(i/(e!==0?e:1));let s=r===n.FOVHorizontal?this._horizontalAperture:this._verticalAperture,o=K(Math.tan(.5*_i(t)));if(o===0){this._focalLength=50;return}this._focalLength=K(s*n.APERTURE_UNIT/(2*o)/n.FOCAL_LENGTH_UNIT)}SetOrthographicFromAspectRatioAndSize(e,t,r){this._projection=n.Orthographic,this._focalLength=50,r===n.FOVHorizontal?(this._horizontalAperture=K(t/n.APERTURE_UNIT),e>0?this._verticalAperture=K(this._horizontalAperture/e):this._verticalAperture=this._horizontalAperture):(this._verticalAperture=K(t/n.APERTURE_UNIT),this._horizontalAperture=K(this._verticalAperture*e))}SetFromViewAndProjectionMatrix(e,t,r=50){this._transform=e.GetInverse(),this._focalLength=K(r);let i=(s,o)=>t.GetElement(s,o);if(i(2,3)<-.5){this._projection=n.Perspective;let s=K(2*r*(n.FOCAL_LENGTH_UNIT/n.APERTURE_UNIT));this._horizontalAperture=K(s/i(0,0)),this._verticalAperture=K(s/i(1,1)),this._horizontalApertureOffset=K(.5*this._horizontalAperture*i(2,0)),this._verticalApertureOffset=K(.5*this._verticalAperture*i(2,1)),this._clippingRange=new $t(i(3,2)/(i(2,2)-1),i(3,2)/(i(2,2)+1))}else{this._projection=n.Orthographic,this._horizontalAperture=K(2/n.APERTURE_UNIT/i(0,0)),this._verticalAperture=K(2/n.APERTURE_UNIT/i(1,1)),this._horizontalApertureOffset=K(-.5*this._horizontalAperture*i(3,0)),this._verticalApertureOffset=K(-.5*this._verticalAperture*i(3,1));let s=1/i(2,2),o=s*i(3,2);this._clippingRange=new $t(o+s,o-s)}}GetTransform(){return new J(this._transform)}GetProjection(){return this._projection}GetHorizontalAperture(){return this._horizontalAperture}GetVerticalAperture(){return this._verticalAperture}GetHorizontalApertureOffset(){return this._horizontalApertureOffset}GetVerticalApertureOffset(){return this._verticalApertureOffset}GetAspectRatio(){return this._verticalAperture===0?0:K(this._horizontalAperture/this._verticalAperture)}GetFocalLength(){return this._focalLength}GetFieldOfView(e){let t=e===n.FOVHorizontal?this._horizontalAperture:this._verticalAperture,r=2*Math.atan(t*n.APERTURE_UNIT/(2*this._focalLength*n.FOCAL_LENGTH_UNIT));return K(vs(r))}GetClippingRange(){return new $t(this._clippingRange)}GetClippingPlanes(){return this._clippingPlanes.map(e=>new en(e))}GetFStop(){return this._fStop}GetFocusDistance(){return this._focusDistance}GetFrustum(){let e=this._horizontalAperture/2,t=this._verticalAperture/2,r=new ut(new F(-e,-t),new F(e,t)),i=new F(this._horizontalApertureOffset,this._verticalApertureOffset);r.AddInPlace(new ut(i,i)),r.MultiplyInPlace(n.APERTURE_UNIT),this._projection!==n.Orthographic&&this._focalLength!==0&&r.DivideInPlace(this._focalLength*n.FOCAL_LENGTH_UNIT);let s=new nn(this._clippingRange.GetMin(),this._clippingRange.GetMax()),o=this._projection===n.Orthographic?dr.Orthographic:dr.Perspective;return new dr(this._transform,r,s,o)}equals(e){return this._transform.equals(e._transform)&&this._projection===e._projection&&this._horizontalAperture===e._horizontalAperture&&this._verticalAperture===e._verticalAperture&&this._horizontalApertureOffset===e._horizontalApertureOffset&&this._verticalApertureOffset===e._verticalApertureOffset&&this._focalLength===e._focalLength&&this._clippingRange.equals(e._clippingRange)&&this._clippingPlanesEqual(e._clippingPlanes)&&this._fStop===e._fStop&&this._focusDistance===e._focusDistance}_clippingPlanesEqual(e){if(this._clippingPlanes.length!==e.length)return!1;for(let t=0;t<e.length;t++)if(!this._clippingPlanes[t].equals(e[t]))return!1;return!0}repr(){let e=this._transform.GetArray().join(", "),t=this._projection===n.Perspective?"Gf.Camera.Perspective":"Gf.Camera.Orthographic",r="["+this._clippingPlanes.map(i=>`new Gf.Vec4f(${i.data.join(", ")})`).join(", ")+"]";return`new Gf.Camera(new Gf.Matrix4d(${e}), ${t}, ${this._horizontalAperture}, ${this._verticalAperture}, ${this._horizontalApertureOffset}, ${this._verticalApertureOffset}, ${this._focalLength}, new Gf.Range1f(${this._clippingRange.GetMin()}, ${this._clippingRange.GetMax()}), ${r}, ${this._fStop}, ${this._focusDistance})`}get transform(){return this._transform}set transform(e){this.SetTransform(e)}get projection(){return this._projection}set projection(e){this.SetProjection(e)}get horizontalAperture(){return this._horizontalAperture}set horizontalAperture(e){this.SetHorizontalAperture(e)}get verticalAperture(){return this._verticalAperture}set verticalAperture(e){this.SetVerticalAperture(e)}get horizontalApertureOffset(){return this._horizontalApertureOffset}set horizontalApertureOffset(e){this.SetHorizontalApertureOffset(e)}get verticalApertureOffset(){return this._verticalApertureOffset}set verticalApertureOffset(e){this.SetVerticalApertureOffset(e)}get focalLength(){return this._focalLength}set focalLength(e){this.SetFocalLength(e)}get clippingRange(){return this._clippingRange}set clippingRange(e){this.SetClippingRange(e)}get clippingPlanes(){return this._clippingPlanes}set clippingPlanes(e){this.SetClippingPlanes(e)}get fStop(){return this._fStop}set fStop(e){this.SetFStop(e)}get focusDistance(){return this._focusDistance}set focusDistance(e){this.SetFocusDistance(e)}get aspectRatio(){return this.GetAspectRatio()}get horizontalFieldOfView(){return this.GetFieldOfView(n.FOVHorizontal)}get verticalFieldOfView(){return this.GetFieldOfView(n.FOVVertical)}get frustum(){return this.GetFrustum()}};var Ll={None:"none",NegativeOverflow:"negative-overflow",PositiveOverflow:"positive-overflow",NaN:"nan"},Zv=Ll.NegativeOverflow,Jv=Ll.PositiveOverflow;function n_(n){let e=[],t=n;for(;t&&(e.push(t),t!=="/");){let r=t.lastIndexOf("/");t=r<=0?"/":t.slice(0,r)}return e}var pr=class n{constructor(e,t){this._ruleMap=e;this._expressionMatch=t}getAsPathExpansionRuleMap(){return new Map(this._ruleMap)}equals(e){if(!this.usesPathExpansionRuleMap()||!e.usesPathExpansionRuleMap())return!1;let t=e.getAsPathExpansionRuleMap();return this._ruleMap.size===t.size&&[...this._ruleMap].every(([r,i])=>t.get(r)===i)}hash(){return JSON.stringify([...this._ruleMap].sort(([e],[t])=>e.localeCompare(t)))}hasExcludes(){return[...this._ruleMap.values()].includes("exclude")}usesPathExpansionRuleMap(){return this._expressionMatch===void 0}static compute(e,t){let r=`collection:${t}:`,i=e.getAttr(`${r}expansionRule`)?.getValue(),s=i==="explicitOnly"||i==="expandPrimsAndProperties"?i:"expandPrims",o=new Map;for(let a of e.getAttr(`${r}includes`)?.getTargets()??[])o.set(a,s);e.getAttr(`${r}includeRoot`)?.getValue()===!0&&o.set("/",s);for(let a of e.getAttr(`${r}excludes`)?.getTargets()??[])o.set(a,"exclude");return new n(o)}isPathIncluded(e){if(!e.startsWith("/"))throw new Error(`IsPathIncluded: path <${e}> is not absolute`);if(this._expressionMatch)return this._expressionMatch(e);for(let t of n_(e.includes(".")?e.slice(0,e.indexOf(".")):e)){let r=this._ruleMap.get(t);if(r!==void 0){if(r==="exclude")return!1;if(r==="expandPrimsAndProperties")return!0;if(e.includes(".")&&r==="expandPrims")return!1;if(r!=="explicitOnly"||t===e)return!0}}return!1}};var Tb=["expansionRule","includeRoot","membershipExpression","mode"],r_=["collection","excludes",...Tb,"includes"],wi=class n extends ye{constructor(t,r,i,s=!1){super(t,r);this._name=i;this._includeRootFallback=s}static typeName="CollectionAPI";getName(){return this._name}_property(t){return t?`collection:${this._name}:${t}`:`collection:${this._name}`}_attrFor(t,r){return this._attr(this._property(t),r)}_createAttr(t,r,i){let s=this._attrFor(t,r);return i!==void 0&&s.set(i),s}static getSchemaAttributeNames(t=!0,r){let i=r??"__INSTANCE_NAME__";return[...Tb.map(s=>`collection:${i}:${s}`),`collection:${i}`]}static get(t,r){if("getStage"in t)return new n(t,t.getStage(),r);let i=".collection:",s=r.lastIndexOf(i),o=s<0?r:r.slice(0,s),a=s<0?"":r.slice(s+i.length);return new n(t.has(o)?t._primHandle(o):void 0,t,a)}static getAll(t){let r=`${n.typeName}:`;return t.getAppliedSchemas().filter(i=>i.startsWith(r)).map(i=>new n(t,t.getStage(),i.slice(r.length)))}static getCollection(t,r){return"getStage"in t,n.get(t,r)}static getNamedCollectionPath(t,r){return`${t.path}.collection:${r}`}static getAllCollections(t){return n.getAll(t)}static isSchemaPropertyBaseName(t){return t===""||r_.filter(r=>r!=="collection").includes(t)}static isCollectionAPIPath(t){return t.includes(".collection:")}static canContainPropertyName(t){return t==="collection"||t.startsWith("collection:")}static canApply(t,r){return t.canApplyAPI(n.typeName,r)}static apply(t,r){return t.applyAPI(n.typeName,r),new n(t,t.getStage(),r)}isValid(){return super.isValid()&&this.prim.hasAPI(n.typeName,this._name)}getCollectionPath(){return n.getNamedCollectionPath(this.prim,this._name)}getExpansionRuleAttr(){return this._attrFor("expansionRule","uniform token")}createExpansionRuleAttr(t){return this._createAttr("expansionRule","uniform token",t)}getIncludeRootAttr(){return this._attrFor("includeRoot","uniform bool")}createIncludeRootAttr(t){return this._createAttr("includeRoot","uniform bool",t)}getMembershipExpressionAttr(){return this._attrFor("membershipExpression","uniform pathExpression")}createMembershipExpressionAttr(t){return this._createAttr("membershipExpression","uniform pathExpression",t)}getModeAttr(){return this._attrFor("mode","uniform token")}createModeAttr(t){return this._createAttr("mode","uniform token",t)}getCollectionAttr(){return this._attr(this._property(),"uniform opaque")}createCollectionAttr(t){let r=this.getCollectionAttr();return t!==void 0&&r.set(t),r}getIncludesRel(){return this._rel(this._property("includes"))}createIncludesRel(){return this.getIncludesRel()}getExcludesRel(){return this._rel(this._property("excludes"))}createExcludesRel(){return this.getExcludesRel()}_expansionRule(){let t=this.getExpansionRuleAttr().get();return t==="explicitOnly"||t==="expandPrimsAndProperties"?t:"expandPrims"}_includeRoot(){let t=this.getIncludeRootAttr();return t.hasAuthoredValue()?t.get()===!0:this._includeRootFallback}_computeRuleMap(t){let r=`${this.prim.path}:${this._name}`;if(t.has(r))return new Map;t.add(r);let i=new Map,s=this._expansionRule();for(let o of this.getIncludesRel().getTargets())if(n.isCollectionAPIPath(o)){let a=n.get(this.stage,o);for(let[c,l]of a._computeRuleMap(t))i.set(c,l)}else i.set(o,s);this._includeRoot()&&i.set("/",s);for(let o of this.getExcludesRel().getTargets())i.set(o,"exclude");return t.delete(r),i}computeMembershipQuery(){if(this.isInExpressionMode()){let t=this._resolveMembershipExpression(new Set);return new pr(new Map,t?r=>t.Match(V.fromString(r),()=>je.MakeVarying(!0)).GetValue():()=>!1)}return new pr(this._computeRuleMap(new Set))}static computeMembershipQuery(t){return t.computeMembershipQuery()}computeIncludedPaths(){return n.computeIncludedPaths(this.computeMembershipQuery(),this.stage)}computeIncludedObjects(){return this.computeIncludedPaths()}static computeIncludedPaths(t,r){let i=[];for(let s of r.traverse()){t.isPathIncluded(s)&&i.push(s);for(let o of r.getPrim(s)?.attrNames??[]){let a=`${s}.${o}`;t.isPathIncluded(a)&&i.push(a)}}return i}static computeIncludedObjects(t,r){return n.computeIncludedPaths(t,r)}includePath(t){return this.computeMembershipQuery().isPathIncluded(t)?!0:t==="/"?(this.createIncludeRootAttr(!0),!0):(this.getExcludesRel().setTargets(this.getExcludesRel().getTargets().filter(r=>r!==t)),this.getIncludesRel().addTarget(t),!0)}excludePath(t){return t==="/"?(this.createIncludeRootAttr(!1),!0):(this.getIncludesRel().setTargets(this.getIncludesRel().getTargets().filter(r=>r!==t)),this.getExcludesRel().addTarget(t),!0)}hasNoIncludedPaths(){let t=this.getMembershipExpressionAttr().get();return this.getIncludesRel().getTargets().length===0&&!this._includeRoot()&&(t==null||t==="")}isInRelationshipsMode(){let t=this.getModeAttr().get();return t==="relationship"?!0:t==="expression"?!1:this._includeRoot()||this.getIncludesRel().getTargets().length>0||this.getExcludesRel().getTargets().length>0}isInExpressionMode(){return!this.isInRelationshipsMode()}_resolveMembershipExpression(t){let r=`${this.prim.path}:${this._name}`;if(t.has(r))return wn.Nothing();let i=this.getMembershipExpressionAttr().get(),s=i instanceof wn?i:typeof i=="string"?new wn(i):void 0;if(!s)return;t.add(r);let o=s.resolveReferences(a=>{let c=a.path.isEmpty()?this.prim.path:a.path.pathString;return n.get(this.stage,`${c}.collection:${a.name}`)._resolveMembershipExpression(t)??wn.Nothing()});return t.delete(r),o}resolveCompleteMembershipExpression(){return this._resolveMembershipExpression(new Set)?.getText()}validate(){let t=this.getExpansionRuleAttr().get();return(t===void 0||t==="explicitOnly"||t==="expandPrims"||t==="expandPrimsAndProperties")&&!this._containsCycle(new Set,new Set)}_containsCycle(t,r){let i=`${this.prim.path}:${this._name}`;if(r.has(i))return!0;if(t.has(i))return!1;t.add(i),r.add(i);for(let s of this.getIncludesRel().getTargets())if(n.isCollectionAPIPath(s)&&n.get(this.stage,s)._containsCycle(t,r))return!0;return r.delete(i),!1}resetCollection(){return this.getIncludesRel().setTargets([]),this.getExcludesRel().setTargets([]),this.getMembershipExpressionAttr().clear(),!0}blockCollection(){return this.getIncludesRel().setTargets([]),this.getExcludesRel().setTargets([]),this.getMembershipExpressionAttr().set(null),!0}};var wW=O.makeMultipleApplyNameTemplate("","");var Ab={Plugins:[{Info:{SdfMetadata:{constraintTargetIdentifier:{appliesTo:["attributes"],default:"",documentation:"Unique identifier within a model's namespace for an matrix-valued attribute representing a constraint target",type:"token"},elementSize:{appliesTo:["attributes"],default:1,displayGroup:"Primvars",documentation:"The number of values in a primvar's value array that must be aggregated for each element on the primitive.",type:"int"},inactiveIds:{appliesTo:["prims"],type:"int64listop"},interpolation:{appliesTo:["attributes"],default:"constant",displayGroup:"Primvars",documentation:"How a primvar interpolates across a primitive; equivalent to RenderMan's 'class specifier'",type:"token"},metersPerUnit:{appliesTo:["layers"],default:.01,displayGroup:"Stage",type:"double"},unauthoredValuesIndex:{appliesTo:["attributes"],default:-1,displayGroup:"Primvars",documentation:"The index that represents unauthored values in the indices array of an indexed primvar.",type:"int"},upAxis:{appliesTo:["layers"],default:"Y",displayGroup:"Stage",type:"token"}},Types:{UsdGeomBackPlateAPI:{alias:{UsdSchemaBase:"BackPlateAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"BackPlateAPI",schemaKind:"multipleApplyAPI"},UsdGeomBasisCurves:{alias:{UsdSchemaBase:"BasisCurves"},autoGenerated:!0,bases:["UsdGeomCurves"],schemaIdentifier:"BasisCurves",schemaKind:"concreteTyped"},UsdGeomBoundable:{alias:{UsdSchemaBase:"Boundable"},autoGenerated:!0,bases:["UsdGeomXformable"],schemaIdentifier:"Boundable",schemaKind:"abstractTyped"},UsdGeomCamera:{alias:{UsdSchemaBase:"Camera"},autoGenerated:!0,bases:["UsdGeomXformable"],schemaIdentifier:"Camera",schemaKind:"concreteTyped"},UsdGeomCapsule:{alias:{UsdSchemaBase:"Capsule"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Capsule",schemaKind:"concreteTyped"},UsdGeomCapsule_1:{alias:{UsdSchemaBase:"Capsule_1"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Capsule_1",schemaKind:"concreteTyped"},UsdGeomCone:{alias:{UsdSchemaBase:"Cone"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Cone",schemaKind:"concreteTyped"},UsdGeomCube:{alias:{UsdSchemaBase:"Cube"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Cube",schemaKind:"concreteTyped"},UsdGeomCurves:{alias:{UsdSchemaBase:"Curves"},autoGenerated:!0,bases:["UsdGeomPointBased"],implementsComputeExtent:!0,schemaIdentifier:"Curves",schemaKind:"abstractTyped"},UsdGeomCylinder:{alias:{UsdSchemaBase:"Cylinder"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Cylinder",schemaKind:"concreteTyped"},UsdGeomCylinder_1:{alias:{UsdSchemaBase:"Cylinder_1"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Cylinder_1",schemaKind:"concreteTyped"},UsdGeomGprim:{alias:{UsdSchemaBase:"Gprim"},autoGenerated:!0,bases:["UsdGeomBoundable"],schemaIdentifier:"Gprim",schemaKind:"abstractTyped"},UsdGeomHermiteCurves:{alias:{UsdSchemaBase:"HermiteCurves"},autoGenerated:!0,bases:["UsdGeomCurves"],schemaIdentifier:"HermiteCurves",schemaKind:"concreteTyped"},UsdGeomImageable:{alias:{UsdSchemaBase:"Imageable"},autoGenerated:!0,bases:["UsdTyped"],schemaIdentifier:"Imageable",schemaKind:"abstractTyped"},UsdGeomMesh:{alias:{UsdSchemaBase:"Mesh"},autoGenerated:!0,bases:["UsdGeomPointBased"],schemaIdentifier:"Mesh",schemaKind:"concreteTyped"},UsdGeomModelAPI:{alias:{UsdSchemaBase:"GeomModelAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"GeomModelAPI",schemaKind:"singleApplyAPI"},UsdGeomMotionAPI:{alias:{UsdSchemaBase:"MotionAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"MotionAPI",schemaKind:"singleApplyAPI"},UsdGeomNurbsCurves:{alias:{UsdSchemaBase:"NurbsCurves"},autoGenerated:!0,bases:["UsdGeomCurves"],schemaIdentifier:"NurbsCurves",schemaKind:"concreteTyped"},UsdGeomNurbsPatch:{alias:{UsdSchemaBase:"NurbsPatch"},autoGenerated:!0,bases:["UsdGeomPointBased"],schemaIdentifier:"NurbsPatch",schemaKind:"concreteTyped"},UsdGeomPlane:{alias:{UsdSchemaBase:"Plane"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Plane",schemaKind:"concreteTyped"},UsdGeomPointBased:{alias:{UsdSchemaBase:"PointBased"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"PointBased",schemaKind:"abstractTyped"},UsdGeomPointInstancer:{alias:{UsdSchemaBase:"PointInstancer"},autoGenerated:!0,bases:["UsdGeomBoundable"],implementsComputeExtent:!0,schemaIdentifier:"PointInstancer",schemaKind:"concreteTyped"},UsdGeomPoints:{alias:{UsdSchemaBase:"Points"},autoGenerated:!0,bases:["UsdGeomPointBased"],implementsComputeExtent:!0,schemaIdentifier:"Points",schemaKind:"concreteTyped"},UsdGeomPrimvarsAPI:{alias:{UsdSchemaBase:"PrimvarsAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"PrimvarsAPI",schemaKind:"nonAppliedAPI"},UsdGeomScope:{alias:{UsdSchemaBase:"Scope"},autoGenerated:!0,bases:["UsdGeomImageable"],schemaIdentifier:"Scope",schemaKind:"concreteTyped"},UsdGeomSphere:{alias:{UsdSchemaBase:"Sphere"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Sphere",schemaKind:"concreteTyped"},UsdGeomSubset:{alias:{UsdSchemaBase:"GeomSubset"},autoGenerated:!0,bases:["UsdTyped"],schemaIdentifier:"GeomSubset",schemaKind:"concreteTyped"},UsdGeomTetMesh:{alias:{UsdSchemaBase:"TetMesh"},autoGenerated:!0,bases:["UsdGeomPointBased"],schemaIdentifier:"TetMesh",schemaKind:"concreteTyped"},UsdGeomVisibilityAPI:{alias:{UsdSchemaBase:"VisibilityAPI"},apiSchemaCanOnlyApplyTo:["Imageable"],autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"VisibilityAPI",schemaKind:"singleApplyAPI"},UsdGeomXform:{alias:{UsdSchemaBase:"Xform"},autoGenerated:!0,bases:["UsdGeomXformable"],schemaIdentifier:"Xform",schemaKind:"concreteTyped"},UsdGeomXformCommonAPI:{alias:{UsdSchemaBase:"XformCommonAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"XformCommonAPI",schemaKind:"nonAppliedAPI"},UsdGeomXformable:{alias:{UsdSchemaBase:"Xformable"},autoGenerated:!0,bases:["UsdGeomImageable"],schemaIdentifier:"Xformable",schemaKind:"abstractTyped"}}},LibraryPath:"@PLUG_INFO_LIBRARY_PATH@",Name:"usdGeom",ResourcePath:"@PLUG_INFO_RESOURCE_PATH@",Root:"@PLUG_INFO_ROOT@",Type:"library"}]},vb=`#usda 1.0
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

`;te.GetInstance().RegisterPlugins(Ab,{usdGeom:{"generatedSchema.usda":vb}});function C(n,e,t){let r=n.getAttr(e);if(r)return t!==void 0?r.getValueAtTime(t):r.getValue()}function oa(n,e,t){let r=n.getAttr(e);if(!(!r||!r.hasAuthoredValue()))return t!==void 0?r.getValueAtTime(t):r.getValue()}function rt(n){if(n==null)return null;if(n instanceof Float32Array)return n;if(Array.isArray(n)&&n.length>0){if(Array.isArray(n[0])){let e=[];for(let t of n)for(let r of t)e.push(r);return new Float32Array(e)}return new Float32Array(n.map(Number))}return null}function fr(n){return n==null?null:n instanceof Int32Array?n:Array.isArray(n)?new Int32Array(n.map(Number)):null}function Ol(n){if(!Array.isArray(n)||n.length<2)return null;let e=Array.isArray(n[0])?n[0]:[Number(n[0]),0,0],t=Array.isArray(n[1])?n[1]:[Number(n[1]),0,0];return[[Math.fround(Number(e[0]??0)),Math.fround(Number(e[1]??0)),Math.fround(Number(e[2]??0))],[Math.fround(Number(t[0]??0)),Math.fround(Number(t[1]??0)),Math.fround(Number(t[2]??0))]]}function ee(n,e){return typeof n=="number"?n:e}function re(n,e){return typeof n=="string"?n:e}function ki(n,e){return typeof n=="boolean"?n:e}function Pn(n){return Array.isArray(n)&&n.length>=3?[Number(n[0]),Number(n[1]),Number(n[2])]:[0,0,0]}function Bn(n){return typeof n=="number"?n:Array.isArray(n)&&typeof n[0]=="number"?n[0]:0}function Ur(n){if(Array.isArray(n)&&n.length>=4){let e=Number(n[0]),t=Number(n[1]),r=Number(n[2]),i=Number(n[3]);return[e,t,r,i]}return[1,0,0,0]}function Fl(n){if(Array.isArray(n)&&n.length===4&&Array.isArray(n[0])){let e=[];for(let t of n)for(let r of t)e.push(Number(r));return e}return Array.isArray(n)&&n.length===16?n.map(Number):null}var _b=["default","render","proxy","guide"];function of(n){if(n==="/"||!n.startsWith("/"))return null;let e=n.lastIndexOf("/");return e===0?"/":n.slice(0,e)}var ze=class n extends ve{getVisibilityAttr(){return this._attr("visibility","token")}getPurposeAttr(){return this._attr("purpose","uniform token")}makeInvisible(){this.getVisibilityAttr().set("invisible")}makeVisible(){n.getVisibility(this._prim)==="invisible"&&this.getVisibilityAttr().set("inherited");let e=!1,t=r=>{let i=of(r);if(!i)return;t(i);let s=this._stage.getPrim(i);if(!s?.isA("Imageable"))return;let o=new n(this._stage._primHandle(i),this._stage);if(n.getVisibility(s)==="invisible"&&(o.getVisibilityAttr().set("inherited"),e=!0),!!e)for(let a of this._stage.getAllChildPrimPaths(i)){if(a===r)continue;this._stage.getPrim(a)?.isA("Imageable")&&new n(this._stage._primHandle(a),this._stage).getVisibilityAttr().set("invisible")}};t(this._prim.path)}static getVisibility(e,t){return re(C(e,"visibility",t),"inherited")}static getPurpose(e){return re(C(e,"purpose"),"default")}static computeVisibility(e,t,r){let i=t;for(;i&&i!=="/";){let s=e.getPrim(i);if(s&&n.getVisibility(s,r)==="invisible")return"invisible";i=of(i)}return"inherited"}static computePurpose(e,t){let r=t;for(;r&&r!=="/";){let i=e.getPrim(r),s=i?oa(i,"purpose"):void 0;if(typeof s=="string"&&_b.includes(s))return s;r=of(r)}return"default"}};var dt=class extends ze{addTranslateOp(e){return this._addOp(e?`xformOp:translate:${e}`:"xformOp:translate","double3")}addTranslateXOp(e){return this._addOp(e?`xformOp:translateX:${e}`:"xformOp:translateX","double")}addTranslateYOp(e){return this._addOp(e?`xformOp:translateY:${e}`:"xformOp:translateY","double")}addTranslateZOp(e){return this._addOp(e?`xformOp:translateZ:${e}`:"xformOp:translateZ","double")}addScaleOp(e){return this._addOp(e?`xformOp:scale:${e}`:"xformOp:scale","float3")}addScaleXOp(e){return this._addOp(e?`xformOp:scaleX:${e}`:"xformOp:scaleX","float")}addScaleYOp(e){return this._addOp(e?`xformOp:scaleY:${e}`:"xformOp:scaleY","float")}addScaleZOp(e){return this._addOp(e?`xformOp:scaleZ:${e}`:"xformOp:scaleZ","float")}addRotateXYZOp(e){return this._addOp(e?`xformOp:rotateXYZ:${e}`:"xformOp:rotateXYZ","float3")}addRotateXZYOp(e){return this._addOp(e?`xformOp:rotateXZY:${e}`:"xformOp:rotateXZY","float3")}addRotateYXZOp(e){return this._addOp(e?`xformOp:rotateYXZ:${e}`:"xformOp:rotateYXZ","float3")}addRotateYZXOp(e){return this._addOp(e?`xformOp:rotateYZX:${e}`:"xformOp:rotateYZX","float3")}addRotateZXYOp(e){return this._addOp(e?`xformOp:rotateZXY:${e}`:"xformOp:rotateZXY","float3")}addRotateZYXOp(e){return this._addOp(e?`xformOp:rotateZYX:${e}`:"xformOp:rotateZYX","float3")}addRotateXOp(e){return this._addOp(e?`xformOp:rotateX:${e}`:"xformOp:rotateX","float")}addRotateYOp(e){return this._addOp(e?`xformOp:rotateY:${e}`:"xformOp:rotateY","float")}addRotateZOp(e){return this._addOp(e?`xformOp:rotateZ:${e}`:"xformOp:rotateZ","float")}addOrientOp(e){return this._addOp(e?`xformOp:orient:${e}`:"xformOp:orient","quatf")}addTransformOp(e){return this._addOp(e?`xformOp:transform:${e}`:"xformOp:transform","matrix4d")}_addOp(e,t){let r=this._attr(e,t);return this._appendXformOp(e),r}_appendXformOp(e){let t=this._stage.getEditTarget().getLayer(),r=`${this._prim.path}.xformOpOrder`;t.setField(r,"typeName","uniform token[]");let i=t.getField(r,"default")??[];i.includes(e)||this._prim.attr("xformOpOrder").set([...i,e])}};function o_(n,e,t){switch(n){case"translate":{let[r,i,s]=Pn(e);return Ai(t?-r:r,t?-i:i,t?-s:s)}case"translateX":return Ai(Bn(e)*(t?-1:1),0,0);case"translateY":return Ai(0,Bn(e)*(t?-1:1),0);case"translateZ":return Ai(0,0,Bn(e)*(t?-1:1));case"scale":{let[r,i,s]=Pn(e);return t?Mr(1/r,1/i,1/s):Mr(r,i,s)}case"scaleX":{let r=Bn(e);return Mr(t?1/r:r,1,1)}case"scaleY":{let r=Bn(e);return Mr(1,t?1/r:r,1)}case"scaleZ":{let r=Bn(e);return Mr(1,1,t?1/r:r)}case"rotateX":return Je(Bn(e)*(t?-1:1));case"rotateY":return et(Bn(e)*(t?-1:1));case"rotateZ":return tt(Bn(e)*(t?-1:1));case"rotateXYZ":{let[r,i,s]=Pn(e);return t?L(tt(-s),L(et(-i),Je(-r))):L(Je(r),L(et(i),tt(s)))}case"rotateXZY":{let[r,i,s]=Pn(e);return t?L(et(-i),L(tt(-s),Je(-r))):L(Je(r),L(tt(s),et(i)))}case"rotateYXZ":{let[r,i,s]=Pn(e);return t?L(tt(-s),L(Je(-r),et(-i))):L(et(i),L(Je(r),tt(s)))}case"rotateYZX":{let[r,i,s]=Pn(e);return t?L(Je(-r),L(tt(-s),et(-i))):L(et(i),L(tt(s),Je(r)))}case"rotateZXY":{let[r,i,s]=Pn(e);return t?L(et(-i),L(Je(-r),tt(-s))):L(tt(s),L(Je(r),et(i)))}case"rotateZYX":{let[r,i,s]=Pn(e);return t?L(Je(-r),L(et(-i),tt(-s))):L(tt(s),L(et(i),Je(r)))}case"orient":{let[r,i,s,o]=Ur(e);return t?yn(r,-i,-s,-o):yn(r,i,s,o)}case"transform":{let r=Fl(e),i=r||[...Se];return t?De(i):i}default:return[...Se]}}function Ds(n,e){let t=C(n,"xformOpOrder",e),r=Array.isArray(t)?t:[],i=[...Se],s=!1;for(let o=r.length-1;o>=0;o--){let a=r[o];if(a==="!resetXformStack!"){s=!0;break}let c=a.startsWith("!invert!"),l=c?a.slice(8):a,u=l.split(":")[1]??"",d=C(n,l,e);if(d===void 0)continue;let p=o_(u,d,c);i=L(i,p)}return{matrix:i,resetsXformStack:s}}var wb=new Map;function Bl(n,e){wb.set(n,e)}function a_(n,e){let[t,r]=n,s=[[t[0],t[1],t[2]],[t[0],t[1],r[2]],[t[0],r[1],t[2]],[t[0],r[1],r[2]],[r[0],t[1],t[2]],[r[0],t[1],r[2]],[r[0],r[1],t[2]],[r[0],r[1],r[2]]].map(o=>Jt(e,o[0],o[1],o[2]));return[[Math.min(...s.map(o=>o[0])),Math.min(...s.map(o=>o[1])),Math.min(...s.map(o=>o[2]))],[Math.max(...s.map(o=>o[0])),Math.max(...s.map(o=>o[1])),Math.max(...s.map(o=>o[2]))]]}function Ib(n){return[n[0].map(Math.fround),n[1].map(Math.fround)]}function Rs(n,e,t){let r=[n,n,n];return r[t==="X"?0:t==="Y"?1:2]=e,[[-r[0],-r[1],-r[2]],[r[0],r[1],r[2]]]}var Un=class n extends dt{getExtentAttr(){return this._attr("extent","float3[]")}static getExtent(e,t){return Ol(oa(e,"extent",t))}static computeExtentFromPlugins(e,t,r){let i=wb.get(e.typeName);if(i){let a=i(e,t,r);return a?Ib(a):null}let s=re(C(e,"axis"),"Z"),o;switch(e.typeName){case"Sphere":{let a=ee(C(e,"radius",t),1);o=Rs(a,a,"Z");break}case"Cube":{let a=ee(C(e,"size",t),2)/2;o=Rs(a,a,"Z");break}case"Cone":case"Cylinder":{let a=ee(C(e,"radius",t),1),c=ee(C(e,"height",t),2)/2;o=Rs(a,c,s);break}case"Capsule":{let a=ee(C(e,"radius",t),.5),c=ee(C(e,"height",t),1)/2;o=Rs(a,c+a,s);break}case"Cylinder_1":{let a=Math.max(ee(C(e,"radiusTop",t),1),ee(C(e,"radiusBottom",t),1)),c=ee(C(e,"height",t),2)/2;o=Rs(a,c,s);break}case"Capsule_1":{let a=ee(C(e,"radiusTop",t),.5),c=ee(C(e,"radiusBottom",t),.5),l=ee(C(e,"height",t),1)/2,u=Math.max(a,c);o=Rs(u,l+u,s);break}case"BasisCurves":case"HermiteCurves":case"NurbsCurves":{let a=rt(C(e,"points",t));if(!a)return null;o=n._pointExtent(a);let c=rt(C(e,"widths",t)),l=0;if(c)for(let d of c)l=Math.max(l,d);let u=l*.5;o=[[o[0][0]-u,o[0][1]-u,o[0][2]-u],[o[1][0]+u,o[1][1]+u,o[1][2]+u]];break}case"Points":{let a=rt(C(e,"points",t));if(!a)return null;let c=rt(C(e,"widths",t));if(!c){o=n._pointExtent(a);break}if(a.length!==c.length*3)return null;let l=Number.POSITIVE_INFINITY,u=Number.POSITIVE_INFINITY,d=Number.POSITIVE_INFINITY,p=Number.NEGATIVE_INFINITY,f=Number.NEGATIVE_INFINITY,h=Number.NEGATIVE_INFINITY;for(let y=0;y<c.length;y++){let g=c[y]*.5,m=y*3;l=Math.min(l,a[m]-g),u=Math.min(u,a[m+1]-g),d=Math.min(d,a[m+2]-g),p=Math.max(p,a[m]+g),f=Math.max(f,a[m+1]+g),h=Math.max(h,a[m+2]+g)}o=[[l,u,d],[p,f,h]];break}case"Mesh":case"NurbsPatch":case"TetMesh":{let a=rt(C(e,"points",t));if(!a)return null;o=n._pointExtent(a);break}default:return null}return Ib(r?a_(o,r):o)}static _pointExtent(e){let t=Number.POSITIVE_INFINITY,r=Number.POSITIVE_INFINITY,i=Number.POSITIVE_INFINITY,s=Number.NEGATIVE_INFINITY,o=Number.NEGATIVE_INFINITY,a=Number.NEGATIVE_INFINITY;for(let c=0;c+2<e.length;c+=3)t=Math.min(t,e[c]),r=Math.min(r,e[c+1]),i=Math.min(i,e[c+2]),s=Math.max(s,e[c]),o=Math.max(o,e[c+1]),a=Math.max(a,e[c+2]);return[[t,r,i],[s,o,a]]}static computeExtent(e,t){return n.getExtent(e,t)??n.computeExtentFromPlugins(e,t)}};var pt=class extends Un{getDisplayColorAttr(){return this._attr("primvars:displayColor","color3f[]")}getDisplayOpacityAttr(){return this._attr("primvars:displayOpacity","float[]")}getDoubleSidedAttr(){return this._attr("doubleSided","uniform bool")}getOrientationAttr(){return this._attr("orientation","uniform token")}static getDisplayColor(e,t){return rt(C(e,"primvars:displayColor",t))}static getDisplayOpacity(e,t){return rt(C(e,"primvars:displayOpacity",t))}static getDoubleSided(e){return ki(C(e,"doubleSided"),!1)}static getOrientation(e){return re(C(e,"orientation"),"rightHanded")}};var c_={projection:"perspective",horizontalAperture:Cs.DEFAULT_HORIZONTAL_APERTURE,verticalAperture:Cs.DEFAULT_VERTICAL_APERTURE,horizontalApertureOffset:0,verticalApertureOffset:0,focalLength:50,clippingRange:[1,1e6],fStop:0,focusDistance:0};var kb=new J().SetIdentity();kb.SetElement(2,2,.5);kb.SetElement(3,2,.5);var rn=class n extends ve{static typeName="GeomSubset";static define(e,t){let r=e.definePrim(t,n.typeName);return new n(r,e)}static createGeomSubset(e,t,r,i,s,o=""){let a=n.define(e,`${t}/${r}`);return a.getElementTypeAttr().set(i),a.getIndicesAttr().set(s),o&&a.getFamilyNameAttr().set(o),a}getElementTypeAttr(){return this._attr("elementType","uniform token")}getIndicesAttr(){return this._attr("indices","int[]")}getFamilyNameAttr(){return this._attr("familyName","uniform token")}static familyTypeAttrName(e){return`subsetFamily:${e}:familyType`}static is(e){return e.typeName===n.typeName}static getElementType(e){return re(C(e,"elementType"),"face")}static getIndices(e,t){return fr(C(e,"indices",t))??new Int32Array}static getFamilyName(e){return re(C(e,"familyName"),"")}static getAllGeomSubsets(e,t,r){let i=[];for(let s of e.getChildPrimPaths(t)){let o=e.getPrim(s);!o||!n.is(o)||r&&n.getElementType(o)!==r||i.push(o)}return i}static getGeomSubsets(e,t,r="",i=""){let s=[];for(let o of e.getChildPrimPaths(t)){let a=e.getPrim(o);!a||!n.is(a)||r&&n.getElementType(a)!==r||i&&n.getFamilyName(a)!==i||s.push(a)}return s}static setFamilyType(e,t,r,i){new n(e.definePrim(t),e)._attr(n.familyTypeAttrName(r),"uniform token").set(i)}static getFamilyType(e,t,r){let i=e.getPrim(t);if(!i)return"unrestricted";let s=C(i,n.familyTypeAttrName(r));return typeof s=="string"&&s?s:"unrestricted"}static getElementCount(e,t,r,i){if(r==="face"){let s=e.getPrim(t);if(!s)return 0;let o=fr(C(s,"faceVertexCounts",i));return o?o.length:0}return 0}static validateFamily(e,t,r,i){let s=n.getGeomSubsets(e,t,"",i),o=n.getFamilyType(e,t,i);for(let c of s){let l=n.getElementType(c);if(l!==r)return{valid:!1,reason:`GeomSubset at path <${c.path}> has elementType '${l}', which does not match '${r}'.`}}let a=n.getElementCount(e,t,r);return a===0?{valid:!1,reason:`Unable to determine element count for geom <${t}>.`}:n.validateSubsets(s,a,o)}static validateSubsets(e,t,r){if(r==="unrestricted")return{valid:!0,reason:""};let i=new Set;for(let s of e)for(let o of n.getIndices(s)){if(o<0||o>=t)return{valid:!1,reason:`index ${o} is out of range [0, ${t})`};if(i.has(o))return{valid:!1,reason:`index ${o} appears in multiple subsets`};i.add(o)}return r==="partition"&&i.size!==t?{valid:!1,reason:`partition covers ${i.size} of ${t} elements`}:{valid:!0,reason:""}}};function Cb(n){if(n==="/"||!n.startsWith("/"))return null;let e=n.lastIndexOf("/");return e===0?"/":n.slice(0,e)}var hr=class{constructor(e,t){this._stage=e;this._time=t}_cache=new Map;get time(){return this._time}setTime(e){e!==this._time&&(this._time=e,this._cache.clear())}clear(){this._cache.clear()}getLocalTransformation(e){let t=this._stage.getPrim(e);return t?Ds(t,this._time):{matrix:[...Se],resetsXformStack:!1}}getLocalToWorldTransform(e){let t=this._cache.get(e);if(t)return t;let{matrix:r,resetsXformStack:i}=this.getLocalTransformation(e),s,o=Cb(e);return i||!o||o==="/"?s=r:s=L(r,this.getLocalToWorldTransform(o)),this._cache.set(e,s),s}getParentToWorldTransform(e){let t=Cb(e);return!t||t==="/"?[...Se]:this.getLocalToWorldTransform(t)}};var sn=class n extends Un{static typeName="PointInstancer";static define(e,t){let r=e.definePrim(t,n.typeName);return new n(r,e)}static is(e){return e.typeName===n.typeName}getProtoIndicesAttr(){return this._attr("protoIndices","int[]")}getIdsAttr(){return this._attr("ids","int64[]")}getPositionsAttr(){return this._attr("positions","point3f[]")}getOrientationsAttr(){return this._attr("orientations","quath[]")}getOrientationsfAttr(){return this._attr("orientationsf","quatf[]")}getScalesAttr(){return this._attr("scales","float3[]")}getVelocitiesAttr(){return this._attr("velocities","vector3f[]")}getAccelerationsAttr(){return this._attr("accelerations","vector3f[]")}getAngularVelocitiesAttr(){return this._attr("angularVelocities","vector3f[]")}getInvisibleIdsAttr(){return this._attr("invisibleIds","int64[]")}createPrototypesRel(){return this.prim.createRel("prototypes",[])}static getProtoIndices(e,t){let r=C(e,"protoIndices",t);return Array.isArray(r)?r.map(Number):[]}static getPositions(e,t){let r=C(e,"positions",t);return Array.isArray(r)?r:[]}static getOrientations(e,t){let r=C(e,"orientations",t);return Array.isArray(r)?r.map(i=>Ur(i)):[]}static getScales(e,t){let r=C(e,"scales",t);return Array.isArray(r)?r:[]}static getVelocities(e,t){let r=C(e,"velocities",t);return Array.isArray(r)?r:[]}static getAccelerations(e,t){let r=C(e,"accelerations",t);return Array.isArray(r)?r:[]}static getInvisibleIds(e,t){let r=C(e,"invisibleIds",t);return Array.isArray(r)?r.map(Number):[]}static getIds(e,t){let r=C(e,"ids",t);return Array.isArray(r)?r.map(Number):[]}static getPrototypes(e){return e.getAttr("prototypes")?.getTargets()??[]}static computeMask(e,t){let r=n.getIds(e,t),i=r.length>0?r.length:n.getProtoIndices(e,t).length,s=new Set(n.getInvisibleIds(e,t)),o=new Array(i);for(let a=0;a<i;a++){let c=r.length>0?r[a]:a;o[a]=!s.has(c)}return o}static computeInstanceTransforms(e,t={}){let{time:r,includeProtoXform:i=!1,stage:s,applyMask:o=!0}=t,a=n.getProtoIndices(e,r),c=n.getPositions(e,r),l=n.getOrientations(e,r),u=n.getScales(e,r),d=o?n.computeMask(e,r):null,p=a.length;if(c.length!==p)return{xforms:[],protoIndices:[]};if(l.length>0&&l.length!==p)return{xforms:[],protoIndices:[]};if(u.length>0&&u.length!==p)return{xforms:[],protoIndices:[]};let f=null;i&&s&&(f=n.getPrototypes(e).map(m=>{let P=s.getPrim(m);return P?Ds(P,r).matrix:[...Se]}));let h=[],y=[];for(let g=0;g<p;g++){if(d&&!d[g])continue;let m=[...Se],P=u[g];P&&(m[0]=P[0]??1,m[5]=P[1]??1,m[10]=P[2]??1);let b=l[g];if(b){let v=yn(b[0],b[1],b[2],b[3]);m=P?L(m,v):v}let S=c[g];m[12]=S[0]??0,m[13]=S[1]??0,m[14]=S[2]??0;let x=a[g];f&&(m=L(f[x]??[...Se],m)),h.push(m),y.push(x)}return{xforms:h,protoIndices:y}}};function cf(n){let e=n.getMetadata("upAxis");return e==="Y"||e==="Z"?e:"Y"}function lf(n){let e=n.getMetadata("metersPerUnit");return typeof e=="number"?e:1}var Db={Plugins:[{Info:{SdfMetadata:{bindMaterialAs:{appliesTo:["relationships"],displayGroup:"Shading",documentation:"Metadata authored on collection-based material binding relationship to indicate the strength of the binding relative to bindings authored on descendant prims.",type:"token"},connectability:{appliesTo:["attributes"],default:"full",displayGroup:"Shading",documentation:`Metadata authored on UsdShadeInput's to specify what they can be connected to. Can be either "full" or "interfaceOnly". "full" implies that  the input can be connected to any other input or output.  "interfaceOnly" implies that the input can only connect to a NodeGraph Input (which represents an interface override, not a render-time dataflow connection), or another Input whose connectability is also "interfaceOnly".`,type:"token"},outputName:{appliesTo:["relationships"],displayGroup:"deprecated",type:"token"},renderType:{appliesTo:["properties"],displayGroup:"Rendering",type:"token"},sdrMetadata:{appliesTo:["prims","attributes"],displayGroup:"Shading",type:"dictionary"}},Types:{UsdShadeConnectableAPI:{alias:{UsdSchemaBase:"ConnectableAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ConnectableAPI",schemaKind:"nonAppliedAPI"},UsdShadeCoordSysAPI:{alias:{UsdSchemaBase:"CoordSysAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"CoordSysAPI",schemaKind:"multipleApplyAPI"},UsdShadeMaterial:{alias:{UsdSchemaBase:"Material"},autoGenerated:!0,bases:["UsdShadeNodeGraph"],providesUsdShadeConnectableAPIBehavior:!0,schemaIdentifier:"Material",schemaKind:"concreteTyped"},UsdShadeMaterialBindingAPI:{alias:{UsdSchemaBase:"MaterialBindingAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"MaterialBindingAPI",schemaKind:"singleApplyAPI"},UsdShadeNodeDefAPI:{alias:{UsdSchemaBase:"NodeDefAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"NodeDefAPI",schemaKind:"singleApplyAPI"},UsdShadeNodeGraph:{alias:{UsdSchemaBase:"NodeGraph"},autoGenerated:!0,bases:["UsdTyped"],providesUsdShadeConnectableAPIBehavior:!0,schemaIdentifier:"NodeGraph",schemaKind:"concreteTyped"},UsdShadeShader:{alias:{UsdSchemaBase:"Shader"},autoGenerated:!0,bases:["UsdTyped"],providesUsdShadeConnectableAPIBehavior:!0,schemaIdentifier:"Shader",schemaKind:"concreteTyped"},UsdShadeShaderDefParserPlugin:{bases:["SdrParserPlugin"],displayName:"USD-based shader definition parser plugin"}}},LibraryPath:"@PLUG_INFO_LIBRARY_PATH@",Name:"usdShade",ResourcePath:"@PLUG_INFO_RESOURCE_PATH@",Root:"@PLUG_INFO_ROOT@",Type:"library"}]},Rb=`#usda 1.0
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

`;te.GetInstance().RegisterPlugins(Db,{usdShade:{"generatedSchema.usda":Rb}});var b_={isContainer:!1,requiresEncapsulation:!0,nodeType:"basic",outputsAreConnectable:!1},P_={isContainer:!0,requiresEncapsulation:!0,nodeType:"basic",outputsAreConnectable:!0},S_={isContainer:!0,requiresEncapsulation:!0,nodeType:"derivedContainer",outputsAreConnectable:!0};function Ul(n){switch(n?.typeName){case"Shader":return b_;case"NodeGraph":return P_;case"Material":return S_;default:return null}}function Ci(n){let e=n.lastIndexOf("/");return e<=0?"/":n.slice(0,e)}function $l(n,e){return Ul(n.getPrim(e))?.isContainer??!1}function zl(n,e){let t=n.get(e)?.getField("connectability");return typeof t=="string"&&t.length>0?t:"full"}function Sn(n){let e=n.lastIndexOf(".");if(e<=0)return null;let t=n.slice(0,e),r=n.slice(e+1);return r.startsWith("outputs:")?{primPath:t,name:r.slice(8),sourceType:"output"}:r.startsWith("inputs:")?{primPath:t,name:r.slice(7),sourceType:"input"}:{primPath:t,name:r,sourceType:"output"}}function Di(n){let e=n.sourceType==="input"?"inputs:":"outputs:";return`${n.primPath}.${e}${n.name}`}function Hl(n){return Sn(typeof n=="string"?n:n.fullPath)}function Eb(n,e,t){return $l(n,t)?Ci(e)!==t?{canConnect:!1,reason:`Encapsulation check failed - input source prim '${t}' is not the closest ancestor container of '${e}'.`}:{canConnect:!0}:{canConnect:!1,reason:`Encapsulation check failed - prim '${t}' owning the input source is not a container.`}}function x_(n,e,t,r){return r==="derivedContainer"?$l(n,e)?Ci(t)!==e?{canConnect:!1,reason:`Encapsulation check failed - output source's prim '${t}' is not an immediate descendent of the input's prim '${e}'.`}:{canConnect:!0}:{canConnect:!1,reason:`Encapsulation check failed - prim '${e}' owning the input is not a container.`}:$l(n,Ci(e))?Ci(e)!==Ci(t)?{canConnect:!1,reason:`Encapsulation check failed - input's prim '${e}' and source's prim '${t}' are not contained by the same container prim.`}:{canConnect:!0}:{canConnect:!1,reason:`Encapsulation check failed - immediate ancestor '${Ci(e)}' of the input's prim is not a container.`}}function uf(n,e,t){let r=Sn(e);if(!r)return{canConnect:!1,reason:`Invalid input: ${e}`};let i=r.primPath,s=Ul(n.getPrim(i));if(!s)return{canConnect:!1,reason:`Prim '${i}' owning the input is not connectable.`};let o=t.primPath,a=n.getPrim(o);if(!a)return{canConnect:!1,reason:`Invalid source: ${Di(t)}`};if(!Ul(a))return{canConnect:!1,reason:`Prim '${o}' owning the source is not connectable.`};let l=s.requiresEncapsulation,u=zl(n,e);return u==="full"?t.sourceType==="input"?l?Eb(n,i,o):{canConnect:!0}:l?x_(n,i,o,s.nodeType):{canConnect:!0}:u==="interfaceOnly"?t.sourceType==="input"?zl(n,Di(t))==="interfaceOnly"?l?Eb(n,i,o):{canConnect:!0}:{canConnect:!1,reason:"Input connectability is 'interfaceOnly' and source does not have 'interfaceOnly' connectability."}:{canConnect:!1,reason:"Input connectability is 'interfaceOnly' but source is not an input."}:{canConnect:!1,reason:"Input connectability is unspecified."}}function df(n,e,t){let r=Sn(e);if(!r)return{canConnect:!1,reason:`Invalid output: ${e}`};let i=r.primPath,s=Ul(n.getPrim(i));if(!s)return{canConnect:!1,reason:`Prim '${i}' owning the output is not connectable.`};if(!s.outputsAreConnectable)return{canConnect:!1,reason:`Outputs of prim '${i}' are not connectable.`};let o=t.primPath;if(!n.getPrim(o))return{canConnect:!1,reason:`Invalid source: ${Di(t)}`};let a=s.requiresEncapsulation;return t.sourceType==="input"?s.nodeType==="derivedContainer"?{canConnect:!1,reason:`Encapsulation check failed - passthrough usage is not allowed for output prim '${i}'.`}:o!==i?{canConnect:!1,reason:`Encapsulation check failed - output '${e}' and input source '${Di(t)}' must be encapsulated by the same container prim.`}:{canConnect:!0}:a&&Ci(o)!==i?{canConnect:!1,reason:`Encapsulation check failed - prim owning the output '${e}' is not an immediate descendent of the prim owning the source '${Di(t)}'.`}:{canConnect:!0}}var aa=class{constructor(e,t){this._prim=e;this.name=t}get attrName(){return`inputs:${this.name}`}get fullPath(){return`${this._prim.path}.${this.attrName}`}get attr(){return this._prim.attr(this.attrName)}set(e){this.attr.set(e)}get(){return this.attr.get()}setConnectability(e){this._prim.getStage().setPropertyField(this.fullPath,"connectability",e)}getConnectability(){return zl(this._prim.getStage(),this.fullPath)}canConnect(e){let t=Hl(e);return t?uf(this._prim.getStage(),this.fullPath,t):{canConnect:!1,reason:"Invalid source."}}connectToSource(e){let t=Hl(e);return!t||!uf(this._prim.getStage(),this.fullPath,t).canConnect?!1:(this.attr.connect(Di(t)),!0)}disconnectSource(){this.attr.setConnections([])}getConnectedSource(){let e=this.attr.getConnections();return e.length>0?Sn(e[0]):null}hasConnectedSource(){return this.getConnectedSource()!==null}getValueProducingAttributes(e=!1){return pf(this._prim.getStage(),this.fullPath,e)}},ca=class{constructor(e,t){this._prim=e;this.name=t}get attrName(){return`outputs:${this.name}`}get fullPath(){return`${this._prim.path}.${this.attrName}`}get attr(){return this._prim.attr(this.attrName)}canConnect(e){let t=Hl(e);return t?df(this._prim.getStage(),this.fullPath,t):{canConnect:!1,reason:"Invalid source."}}connectToSource(e){let t=Hl(e);return!t||!df(this._prim.getStage(),this.fullPath,t).canConnect?!1:(this.attr.connect(Di(t)),!0)}getConnectedSource(){let e=this.attr.getConnections();return e.length>0?Sn(e[0]):null}getValueProducingAttributes(e=!1){return pf(this._prim.getStage(),this.fullPath,e)}},$n=class extends ve{createInput(e,t){return this._attr(`inputs:${e}`,t),new aa(this._prim,e)}createOutput(e,t="token"){return this._attr(`outputs:${e}`,t),new ca(this._prim,e)}getInput(e){return new aa(this._prim,e)}getOutput(e){return new ca(this._prim,e)}};function $r(n){return n.attrNames.filter(e=>e.startsWith("inputs:")).map(e=>e.slice(7)).sort()}function la(n){return n.attrNames.filter(e=>e.startsWith("outputs:")).map(e=>e.slice(8)).sort()}function jl(n,e,t=32){let r=e,i=null;for(let s=0;s<t;s++){let a=n.get(r)?.getConnections()??[];if(a.length===0)return i;let c=Sn(a[0]);if(!c)return i;i=c,r=a[0]}return i}function pf(n,e,t=!1){let r=(i,s)=>{if(s.has(i))return[];let o=n.get(i);if(!o)return[];let a=o.getConnections();if(a.length>0){s.add(i);let u=a.flatMap(d=>r(d,s));return s.delete(i),u}let c=Sn(i);if(!c)return[];if(t&&(c.sourceType!=="output"||n.getPrim(c.primPath)?.typeName!=="Shader"))return[];if(c.sourceType==="input"&&o.getValue()===void 0)return[];let l=i.lastIndexOf(".");return[n._primHandle(i.slice(0,l)).attr(i.slice(l+1))]};return r(e,new Set)}var xn=class n extends $n{static typeName="Shader";static define(e,t){let r=e.definePrim(t,n.typeName);return new n(r,e)}getIdAttr(){return this._attr("info:id","uniform token")}getImplementationSourceAttr(){return this._attr("info:implementationSource","uniform token")}setShaderId(e){this.getIdAttr().set(e)}getShaderId(){let e=this.getIdAttr().get();return typeof e=="string"?e:void 0}setSourceAsset(e,t="universal"){this._attr(`info:${t}:sourceAsset`,"uniform asset").set(e),this.getImplementationSourceAttr().set("sourceAsset")}getSourceAsset(e="universal"){let t=this._stage.getPrim(this.path);return n.getSourceAsset(t,e)??(e==="universal"?void 0:n.getSourceAsset(t,"universal")??void 0)}setSourceCode(e,t="universal"){this._attr(`info:${t}:sourceCode`,"uniform string").set(e),this.getImplementationSourceAttr().set("sourceCode")}getSourceCode(e="universal"){let t=r=>{let i=this._stage.getPrim(this.path)?.getAttr(`info:${r}:sourceCode`)?.getValue();return typeof i=="string"?i:void 0};return t(e)??(e==="universal"?void 0:t("universal"))}setSourceAssetSubIdentifier(e,t="universal"){this._attr(`info:${t}:sourceAsset:subIdentifier`,"uniform token").set(e),this.getImplementationSourceAttr().set("sourceAsset")}getSourceAssetSubIdentifier(e="universal"){let t=r=>{let i=this._stage.getPrim(this.path)?.getAttr(`info:${r}:sourceAsset:subIdentifier`)?.getValue();return typeof i=="string"?i:void 0};return t(e)??(e==="universal"?void 0:t("universal"))}getImplementationSource(){return n.getImplementationSource(this._stage.getPrim(this.path))}static is(e){return e.typeName===n.typeName}static getImplementationSource(e){let t=e.getAttr("info:implementationSource")?.getValue();return typeof t=="string"&&t.length>0?t:"id"}static getSourceAsset(e,t){let r=e.getAttr(`info:${t}:sourceAsset`)?.getValue();return typeof r=="string"?r:r&&typeof r=="object"&&typeof r.path=="string"?r.path:null}static getShaderId(e){let t=e.getAttr("info:id")?.getValue();return typeof t=="string"?t:""}static getInputValue(e,t,r){let i=e.getAttr(`inputs:${t}`);if(i)return r!==void 0?i.getValueAtTime(r):i.getValue()}};function T_(n){return n==="Shader"||n==="NodeGraph"||n==="Material"}function Nb(n){return n==="NodeGraph"||n==="Material"}var ua=class n extends $n{static typeName="NodeGraph";static define(e,t){let r=e.definePrim(t,n.typeName);return new n(r,e)}static is(e){return e.typeName===n.typeName}static _descendants(e,t){let r=[],i=s=>{for(let o of e.getChildPrimPaths(s))r.push(o),i(o)};return i(t),r}static _computeNonTransitive(e,t){let r=new Map,i=e.getPrim(t);if(i)for(let s of $r(i))r.set(s,[]);for(let s of n._descendants(e,t)){let o=e.getPrim(s);if(!(!o||!T_(o.typeName)))for(let a of $r(o)){let c=e.get(`${s}.inputs:${a}`)?.getConnections()??[];for(let l of c){let u=Sn(l);if(u&&u.sourceType==="input"&&u.primPath===t){let d=r.get(u.name);d&&d.push({primPath:s,name:a})}}}}return r}static _recursiveNodeGraphConsumers(e,t,r){for(let i of t.values())for(let s of i){let o=e.getPrim(s.primPath);if(o&&Nb(o.typeName)&&!r.has(s.primPath)){let a=n._computeNonTransitive(e,s.primPath);r.set(s.primPath,a),n._recursiveNodeGraphConsumers(e,a,r)}}}static _resolveConsumers(e,t,r,i){let s=e.getPrim(t.primPath);if(!s||!Nb(s.typeName)){i.push(t);return}let o=r.get(t.primPath);if(!o){i.push(t);return}let a=o.get(t.name);if(a===void 0){i.push(t);return}if(a.length===0)i.push(t);else for(let c of a)n._resolveConsumers(e,c,r,i)}computeInterfaceInputConsumersMap(e=!1){let t=n._computeNonTransitive(this._stage,this.path);if(!e)return t;let r=new Map;if(n._recursiveNodeGraphConsumers(this._stage,t,r),r.size===0)return t;let i=new Map;for(let[s,o]of t){let a=[];for(let c of o)n._resolveConsumers(this._stage,c,r,a);i.set(s,a)}return i}};var Ri=class n extends ua{static typeName="Material";static define(e,t){let r=e.definePrim(t,n.typeName);return new n(r,e)}createSurfaceOutput(){return this.createOutput("surface","token")}createDisplacementOutput(){return this.createOutput("displacement","token")}createVolumeOutput(){return this.createOutput("volume","token")}getSurfaceOutput(){return this.getOutput("surface")}static is(e){return e.typeName===n.typeName}static computeSurfaceSource(e,t){return jl(e,`${t}.outputs:surface`)}static computeDisplacementSource(e,t){return jl(e,`${t}.outputs:displacement`)}async setBaseMaterialPath(e){let t=this._prim.getSpecializes();if(!e){await t.clearSpecializes();return}await t.setSpecializes([e])}async setBaseMaterial(e){await this.setBaseMaterialPath(e.path)}async clearBaseMaterial(){await this.setBaseMaterialPath("")}getBaseMaterialPath(){let e=this._stage.getSpecializeArcTargets(this.path);for(let t of e){let r=this._stage.getPrim(t);if(r&&n.is(r))return t}if(e.length===0)for(let t of this._prim.getSpecializes().getSpecializes()){let r=this._stage.getPrim(t);if(r&&n.is(r))return t}return null}getBaseMaterial(){let e=this.getBaseMaterialPath();return e?new n(this._stage._primHandle(e),this._stage):null}hasBaseMaterial(){return this.getBaseMaterialPath()!==null}};var da="material:binding",zn="";var Ob="MaterialBindingAPI",Vb="material:binding:collection",Ns="materialBind";function Gb(n){if(n==="/"||!n.startsWith("/"))return null;let e=n.lastIndexOf("/");return e===0?"/":n.slice(0,e)}function Mb(n){return n===zn?da:`${da}:${n}`}function Lb(n){return n===zn?Vb:`${Vb}:${n}`}function ff(n){return n.startsWith("/")&&!n.includes(".")}var Ei=class n extends ve{static apply(e){return e.addAppliedSchema(Ob),new n(e,e.getStage())}bind(e,t="weakerThanDescendants",r=zn){let i=typeof e=="string"?e:e.path,s=Mb(r);this._rel(s).setTargets([i]),t!=="weakerThanDescendants"&&this._stage.setPropertyField(`${this._prim.path}.${s}`,"bindMaterialAs",t)}bindCollection(e,t,r,i="weakerThanDescendants",s=zn){let o=typeof r=="string"?r:r.path,a=`${Lb(s)}:${e}`;this._rel(a).setTargets([t,o]),i!=="weakerThanDescendants"&&this._stage.setPropertyField(`${this._prim.path}.${a}`,"bindMaterialAs",i)}unbind(){this._rel(da).setTargets([])}createMaterialBindSubset(e,t,r="face"){let i=this._prim.path,s=rn.createGeomSubset(this._stage,i,e,r,t,Ns);return rn.getFamilyType(this._stage,i,Ns)==="unrestricted"&&this.setMaterialBindSubsetsFamilyType("nonOverlapping"),s}getMaterialBindSubsets(){return rn.getGeomSubsets(this._stage,this._prim.path,"",Ns)}getMaterialBindSubsetsFamilyType(){return rn.getFamilyType(this._stage,this._prim.path,Ns)}setMaterialBindSubsetsFamilyType(e){return e==="unrestricted"?!1:(rn.setFamilyType(this._stage,this._prim.path,Ns,e),!0)}static getDirectBinding(e){let r=e.getAttr(da)?.getTargets()??[];return r.length>0?r[0]:null}static getBindingStrength(e,t){return e.get(t)?.getField("bindMaterialAs")==="strongerThanDescendants"?"strongerThanDescendants":"weakerThanDescendants"}static _directBindingForPurpose(e,t){let r=Mb(t),i=e.getAttr(r)?.getTargets()??[];return i.length===1&&ff(i[0])?{relName:r,materialPath:i[0]}:null}static _collectionBindingsForPurpose(e,t){let r=Lb(t),i=[];for(let s of e.attrNames){if(s===r||!s.startsWith(`${r}:`)||t===zn&&s.slice(r.length+1).includes(":"))continue;let o=e.getAttr(s)?.getTargets()??[];if(o.length!==2)continue;let a=ff(o[0]),c=ff(o[1]);if(a===c)continue;let l=a?o[0]:o[1],u=a?o[1]:o[0];i.push({relName:s,collectionPath:u,materialPath:l})}return i}static computeBoundMaterial(e,t,r=zn){let i=r===zn?[zn]:[r,zn];for(let s of i){let o=n._computeForPurpose(e,t,s);if(o)return o}return null}static _computeForPurpose(e,t,r){let i=new Map,s=null,o=null,a=!1,c=t;for(;c&&c!=="/";){let u=e.getPrim(c);if(!u){c=Gb(c);continue}let d=n._directBindingForPurpose(u,r);if(d){let f=`${c}.${d.relName}`,h=n.getBindingStrength(e,f);(!a||h==="strongerThanDescendants")&&(a=!0,s={materialPath:d.materialPath,bindingRelPath:f},o=c)}let p=n._collectionBindingsForPurpose(u,r);for(let f of p){let h=f.collectionPath.indexOf(".");if(h<0)continue;let y=f.collectionPath.slice(0,h),g=f.collectionPath.slice(h+1),m=/^collection:([^:]+)/.exec(g);if(!m)continue;let P=m[1],b=e.getPrim(y);if(!b)continue;let S=i.get(f.collectionPath);if(S||(S=pr.compute(b,P),i.set(f.collectionPath,S)),S.isPathIncluded(t)){let x=`${c}.${f.relName}`,v=n.getBindingStrength(e,x);if(!a||o===c||v==="strongerThanDescendants"){a=!0,s={materialPath:f.materialPath,bindingRelPath:x},o=c;break}}}c=Gb(c)}if(!a||!s)return null;let l=e.getPrim(s.materialPath);return!l||!Ri.is(l)?null:s}};var pa=class{constructor(e,t,r){this.keys=e;this.values=t;this.nodes=r}getKeys(){return[...this.keys]}getValues(){return this.values.map(e=>[...e])}getStringifiedValues(){return this.values.map(e=>e.map(t=>t==null?"":String(t)))}getShaderNodesByValues(){return this.nodes.map(e=>[...e])}getAllShaderNodes(){return this.nodes.flat()}},Wl=(n,e)=>n==null&&e==null?!0:Object.is(n,e),fa=class{constructor(e){this.runner=e}selectKeys=[];include=[];exclude=[];custom=[];selectDistinct(e){for(let t of typeof e=="string"?[e]:e)this.selectKeys.includes(t)||this.selectKeys.push(t);return this}nodeValueIs(e,t){return this.include.push(r=>Wl(r.getDataForKey(e),t)),this}nodeValueIsIn(e,t){return this.include.push(r=>t.some(i=>Wl(r.getDataForKey(e),i))),this}nodeHasValueFor(e){return this.include.push(t=>t.getDataForKey(e)!==void 0),this}nodeValueIsNot(e,t){return this.exclude.push(r=>Wl(r.getDataForKey(e),t)),this}nodeValueIsNotIn(e,t){return this.exclude.push(r=>t.some(i=>Wl(r.getDataForKey(e),i))),this}nodeHasNoValueFor(e){return this.exclude.push(t=>t.getDataForKey(e)!==void 0),this}customFilter(e){return this.custom.push(e),this}run(){if(!this.runner)throw new Error("query has no registry");return this.runner(this)}};function Fb(n,e){let t=e.filter(i=>n.include.every(s=>s(i))&&!n.exclude.some(s=>s(i))&&n.custom.every(s=>{let o=s(i);if(typeof o!="boolean")throw new TypeError("SdrShaderNodeQuery custom filters must return a boolean");return o}));if(!n.selectKeys.length)return new pa([],[],t.map(i=>[i]));let r=new Map;for(let i of t){let s=n.selectKeys.map(c=>i.getDataForKey(c)),o=JSON.stringify(s),a=r.get(o);a?a.nodes.push(i):r.set(o,{values:s,nodes:[i]})}return new pa([...n.selectKeys],[...r.values()].map(i=>i.values),[...r.values()].map(i=>i.nodes))}var hf=class n{static instance=new n;static getInstance(){return this.instance}results=[];nodes=new Map;parsers=new Map;searchUris=new Set;clear(){this.results.length=0,this.nodes.clear(),this.parsers.clear(),this.searchUris.clear()}setExtraDiscoveryPlugins(e){for(let t of e){for(let r of t.getSearchURIs?.()??[])this.searchUris.add(r);for(let r of t.discoverShaderNodes())this.addDiscoveryResult(r)}}setExtraParserPlugins(e){for(let[t,r]of Array.isArray(e)?e:Object.entries(e))this.parsers.set(t,r)}addDiscoveryResult(e){this.results.some(t=>t.identifier===e.identifier&&t.sourceType===e.sourceType)||this.results.push(e)}getSearchURIs(){return[...this.searchUris]}getShaderNodeIdentifiers(e="",t="defaultOnly"){return this.results.filter(r=>(!e||r.function===e)&&(t==="allVersions"||r.version.isDefault)).map(r=>r.identifier)}getShaderNodeNames(e=""){return[...new Set(this.results.filter(t=>!e||t.function===e).map(t=>t.name))]}getAllShaderNodeSourceTypes(){return[...new Set(this.results.map(e=>e.sourceType))].sort()}getShaderNodeByIdentifier(e){return this._nodesFor(t=>t.identifier===e)[0]}getShaderNodeByIdentifierAndType(e,t){return this._nodesFor(r=>r.identifier===e&&r.sourceType===t)[0]}getShaderNodeByName(e,t="defaultOnly"){return this._nodesFor(r=>r.name===e&&(t==="allVersions"||r.version.isDefault))[0]}getShaderNodesByIdentifier(e){return this._nodesFor(t=>t.identifier===e)}getShaderNodesByName(e,t="defaultOnly"){return this._nodesFor(r=>r.name===e&&(t==="allVersions"||r.version.isDefault))}getShaderNodesByFunction(e="",t="defaultOnly"){return this._nodesFor(r=>(!e||r.function===e)&&(t==="allVersions"||r.version.isDefault))}getShaderNodeByNameAndType(e,t,r="defaultOnly"){return this._nodesFor(i=>i.name===e&&i.sourceType===t&&(r==="allVersions"||i.version.isDefault))[0]}getAllShaderNodes(){return this._nodesFor(()=>!0)}createQuery(){return new fa(e=>this.runQuery(e))}runQuery(e){return Fb(e,this.getAllShaderNodes())}_nodesFor(e){let t=[];for(let r of this.results.filter(e)){let i=`${r.identifier}\0${r.sourceType}`,s=this.nodes.get(i);if(!s){let o=this.parsers.get(r.sourceType)??this.parsers.get(r.discoveryType);if(!o)continue;s=o.parseShaderNode(r),this.nodes.set(i,s)}t.push(s)}return t}};var Bb={Plugins:[{Info:{Types:{UsdLuxBoundableLightBase:{alias:{UsdSchemaBase:"BoundableLightBase"},autoGenerated:!0,bases:["UsdGeomBoundable"],schemaIdentifier:"BoundableLightBase",schemaKind:"abstractTyped"},UsdLuxCylinderLight:{alias:{UsdSchemaBase:"CylinderLight"},autoGenerated:!0,bases:["UsdLuxBoundableLightBase"],implementsComputeExtent:!0,schemaIdentifier:"CylinderLight",schemaKind:"concreteTyped"},UsdLuxDiskLight:{alias:{UsdSchemaBase:"DiskLight"},autoGenerated:!0,bases:["UsdLuxBoundableLightBase"],implementsComputeExtent:!0,schemaIdentifier:"DiskLight",schemaKind:"concreteTyped"},UsdLuxDistantLight:{alias:{UsdSchemaBase:"DistantLight"},autoGenerated:!0,bases:["UsdLuxNonboundableLightBase"],schemaIdentifier:"DistantLight",schemaKind:"concreteTyped"},UsdLuxDomeLight:{alias:{UsdSchemaBase:"DomeLight"},autoGenerated:!0,bases:["UsdLuxNonboundableLightBase"],schemaIdentifier:"DomeLight",schemaKind:"concreteTyped"},UsdLuxDomeLight_1:{alias:{UsdSchemaBase:"DomeLight_1"},autoGenerated:!0,bases:["UsdLuxNonboundableLightBase"],schemaIdentifier:"DomeLight_1",schemaKind:"concreteTyped"},UsdLuxGeometryLight:{alias:{UsdSchemaBase:"GeometryLight"},autoGenerated:!0,bases:["UsdLuxNonboundableLightBase"],schemaIdentifier:"GeometryLight",schemaKind:"concreteTyped"},UsdLuxLightAPI:{alias:{UsdSchemaBase:"LightAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],providesUsdShadeConnectableAPIBehavior:!0,schemaIdentifier:"LightAPI",schemaKind:"singleApplyAPI"},UsdLuxLightFilter:{alias:{UsdSchemaBase:"LightFilter"},autoGenerated:!0,bases:["UsdGeomXformable"],providesUsdShadeConnectableAPIBehavior:!0,schemaIdentifier:"LightFilter",schemaKind:"concreteTyped"},UsdLuxLightListAPI:{alias:{UsdSchemaBase:"LightListAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"LightListAPI",schemaKind:"singleApplyAPI"},UsdLuxListAPI:{alias:{UsdSchemaBase:"ListAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ListAPI",schemaKind:"singleApplyAPI"},UsdLuxMeshLightAPI:{alias:{UsdSchemaBase:"MeshLightAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"MeshLightAPI",schemaKind:"singleApplyAPI"},UsdLuxNonboundableLightBase:{alias:{UsdSchemaBase:"NonboundableLightBase"},autoGenerated:!0,bases:["UsdGeomXformable"],schemaIdentifier:"NonboundableLightBase",schemaKind:"abstractTyped"},UsdLuxPluginLight:{alias:{UsdSchemaBase:"PluginLight"},autoGenerated:!0,bases:["UsdGeomXformable"],schemaIdentifier:"PluginLight",schemaKind:"concreteTyped"},UsdLuxPluginLightFilter:{alias:{UsdSchemaBase:"PluginLightFilter"},autoGenerated:!0,bases:["UsdLuxLightFilter"],schemaIdentifier:"PluginLightFilter",schemaKind:"concreteTyped"},UsdLuxPortalLight:{alias:{UsdSchemaBase:"PortalLight"},autoGenerated:!0,bases:["UsdLuxBoundableLightBase"],implementsComputeExtent:!0,schemaIdentifier:"PortalLight",schemaKind:"concreteTyped"},UsdLuxRectLight:{alias:{UsdSchemaBase:"RectLight"},autoGenerated:!0,bases:["UsdLuxBoundableLightBase"],implementsComputeExtent:!0,schemaIdentifier:"RectLight",schemaKind:"concreteTyped"},UsdLuxShadowAPI:{alias:{UsdSchemaBase:"ShadowAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ShadowAPI",schemaKind:"singleApplyAPI"},UsdLuxShapingAPI:{alias:{UsdSchemaBase:"ShapingAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ShapingAPI",schemaKind:"singleApplyAPI"},UsdLuxSphereLight:{alias:{UsdSchemaBase:"SphereLight"},autoGenerated:!0,bases:["UsdLuxBoundableLightBase"],implementsComputeExtent:!0,schemaIdentifier:"SphereLight",schemaKind:"concreteTyped"},UsdLuxVolumeLightAPI:{alias:{UsdSchemaBase:"VolumeLightAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"VolumeLightAPI",schemaKind:"singleApplyAPI"},UsdLux_DiscoveryPlugin:{bases:["SdrDiscoveryPlugin"]},UsdLux_LightDefParserPlugin:{bases:["SdrParserPlugin"]}}},LibraryPath:"@PLUG_INFO_LIBRARY_PATH@",Name:"usdLux",ResourcePath:"@PLUG_INFO_RESOURCE_PATH@",Root:"@PLUG_INFO_ROOT@",Type:"library"}]},Ub=`#usda 1.0
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

`;te.GetInstance().RegisterPlugins(Bb,{usdLux:{"generatedSchema.usda":Ub}});var ha=[[1,.02749,0],[1,.02749,0],[1,.149664,0],[1,.256644,.008095],[1,.372033,.06745],[1,.476725,.153601],[1,.570376,.259196],[1,.65348,.377155],[1,.726878,.501606],[1,.791543,.62805],[1,.848462,.753228],[1,.898581,.874905],[1,.942771,.991642],[.906947,.890456,1],[.828247,.841838,1],[.765791,.801896,1],[.715255,.768579,1],[.673683,.740423,1],[.638992,.716359,1],[.609681,.695588,1],[.609681,.695588,1],[.609681,.695588,1]],it=[[-.5,1.5,-1.5,.5],[1,-2.5,2,-.5],[-.5,0,.5,0],[0,1,0,0]];function k_(n,e,t){return n*.2126+e*.7152+t*.0722}function mf(n){let e=ha.length,t=Math.min(Math.max((n-1e3)/9e3,0),1),r=e-4,i=t*r,s=Math.min(Math.floor(i),r-1),o=i-s,a=[];for(let l=0;l<3;l++){let u=ha[s][l],d=ha[s+1][l],p=ha[s+2][l],f=ha[s+3][l],h=it[0][0]*u+it[0][1]*d+it[0][2]*p+it[0][3]*f,y=it[1][0]*u+it[1][1]*d+it[1][2]*p+it[1][3]*f,g=it[2][0]*u+it[2][1]*d+it[2][2]*p+it[2][3]*f,m=it[3][0]*u+it[3][1]*d+it[3][2]*p+it[3][3]*f;a.push(((h*o+y)*o+g)*o+m)}let c=k_(a[0],a[1],a[2])||1;return[Math.max(a[0]/c,0),Math.max(a[1]/c,0),Math.max(a[2]/c,0)]}function C_(n,e){return Array.isArray(n)&&n.length>=3?[Number(n[0]),Number(n[1]),Number(n[2])]:e}function Hn(n,e){return e!==void 0&&n.set(e),n}var mr=class n extends dt{static typeName="LightAPI";static get(e,t){return new n(e.has(t)?e._primHandle(t):void 0,e)}static canApply(e){return e.canApplyAPI(n.typeName)}static apply(e){return e.applyAPI(n.typeName),new n(e,e.getStage())}getIntensityAttr(){return this._attr("inputs:intensity","float")}getExposureAttr(){return this._attr("inputs:exposure","float")}getColorAttr(){return this._attr("inputs:color","color3f")}getEnableColorTemperatureAttr(){return this._attr("inputs:enableColorTemperature","bool")}getColorTemperatureAttr(){return this._attr("inputs:colorTemperature","float")}getNormalizeAttr(){return this._attr("inputs:normalize","bool")}getDiffuseAttr(){return this._attr("inputs:diffuse","float")}getSpecularAttr(){return this._attr("inputs:specular","float")}getFiltersRel(){return this._rel("light:filters")}createFiltersRel(){return this._rel("light:filters")}getShaderIdAttr(){return this._attr("light:shaderId","uniform token")}getMaterialSyncModeAttr(){return this._attr("light:materialSyncMode","uniform token")}createIntensityAttr(e){return Hn(this.getIntensityAttr(),e)}createExposureAttr(e){return Hn(this.getExposureAttr(),e)}createColorAttr(e){return Hn(this.getColorAttr(),e)}createEnableColorTemperatureAttr(e){return Hn(this.getEnableColorTemperatureAttr(),e)}createColorTemperatureAttr(e){return Hn(this.getColorTemperatureAttr(),e)}createNormalizeAttr(e){return Hn(this.getNormalizeAttr(),e)}createDiffuseAttr(e){return Hn(this.getDiffuseAttr(),e)}createSpecularAttr(e){return Hn(this.getSpecularAttr(),e)}createShaderIdAttr(e){return Hn(this.getShaderIdAttr(),e)}createMaterialSyncModeAttr(e){return Hn(this.getMaterialSyncModeAttr(),e)}static getSchemaAttributeNames(){return["light:shaderId","light:materialSyncMode","inputs:intensity","inputs:exposure","inputs:diffuse","inputs:specular","inputs:normalize","inputs:color","inputs:enableColorTemperature","inputs:colorTemperature"]}connectableAPI(){return new $n(this._prim,this._stage)}createInput(e,t){return this.connectableAPI().createInput(e,t)}getInput(e){return this.connectableAPI().getInput(e)}getInputs(){return $r(this._stage.getPrim(this.path)).map(e=>this.getInput(e))}createOutput(e,t){return this.connectableAPI().createOutput(e,t)}getOutput(e){return this.connectableAPI().getOutput(e)}getOutputs(){return la(this._stage.getPrim(this.path)).map(e=>this.getOutput(e))}getShaderIdAttrForRenderContext(e){return this._attr(e?`${e}:light:shaderId`:"light:shaderId","uniform token")}getShaderId(e=[]){for(let r of e){let i=this.getShaderIdAttrForRenderContext(r).get();if(typeof i=="string"&&i)return i}let t=this.getShaderIdAttr().get();return typeof t=="string"?t:""}getLightLinkCollectionAPI(){return new wi(this._prim,this._stage,"lightLink",!0)}getShadowLinkCollectionAPI(){return new wi(this._prim,this._stage,"shadowLink",!0)}static INTENSITY_FALLBACK={DistantLight:5e4};static getIntensity(e,t){let r=n.INTENSITY_FALLBACK[e.typeName]??1;return ee(C(e,"inputs:intensity",t),r)}static getExposure(e,t){return ee(C(e,"inputs:exposure",t),0)}static getColor(e,t){return C_(C(e,"inputs:color",t),[1,1,1])}static getEnableColorTemperature(e){return ki(C(e,"inputs:enableColorTemperature"),!1)}static getColorTemperature(e,t){return ee(C(e,"inputs:colorTemperature",t),6500)}static computeBaseEmission(e,t){let r=n.getColor(e,t);if(n.getEnableColorTemperature(e)){let s=mf(n.getColorTemperature(e,t));r=[r[0]*s[0],r[1]*s[1],r[2]*s[2]]}let i=n.getIntensity(e,t)*Math.pow(2,n.getExposure(e,t));return{color:r,intensity:i}}};var R_=Object.freeze({angular:"angular",automatic:"automatic",collectionFilterLinkIncludeRoot:"collection:filterLink:includeRoot",collectionLightLinkIncludeRoot:"collection:lightLink:includeRoot",collectionShadowLinkIncludeRoot:"collection:shadowLink:includeRoot",consumeAndContinue:"consumeAndContinue",consumeAndHalt:"consumeAndHalt",cubeMapVerticalCross:"cubeMapVerticalCross",filterLink:"filterLink",geometry:"geometry",guideRadius:"guideRadius",ignore:"ignore",independent:"independent",inputsAngle:"inputs:angle",inputsColor:"inputs:color",inputsColorTemperature:"inputs:colorTemperature",inputsDiffuse:"inputs:diffuse",inputsEnableColorTemperature:"inputs:enableColorTemperature",inputsExposure:"inputs:exposure",inputsHeight:"inputs:height",inputsIntensity:"inputs:intensity",inputsLength:"inputs:length",inputsNormalize:"inputs:normalize",inputsRadius:"inputs:radius",inputsShadowColor:"inputs:shadow:color",inputsShadowDistance:"inputs:shadow:distance",inputsShadowEnable:"inputs:shadow:enable",inputsShadowFalloff:"inputs:shadow:falloff",inputsShadowFalloffGamma:"inputs:shadow:falloffGamma",inputsShapingConeAngle:"inputs:shaping:cone:angle",inputsShapingConeSoftness:"inputs:shaping:cone:softness",inputsShapingFocus:"inputs:shaping:focus",inputsShapingFocusTint:"inputs:shaping:focusTint",inputsShapingIesAngleScale:"inputs:shaping:ies:angleScale",inputsShapingIesFile:"inputs:shaping:ies:file",inputsShapingIesNormalize:"inputs:shaping:ies:normalize",inputsSpecular:"inputs:specular",inputsTextureFile:"inputs:texture:file",inputsTextureFormat:"inputs:texture:format",inputsWidth:"inputs:width",latlong:"latlong",lightFilters:"light:filters",lightFilterShaderId:"lightFilter:shaderId",lightLink:"lightLink",lightList:"lightList",lightListCacheBehavior:"lightList:cacheBehavior",lightMaterialSyncMode:"light:materialSyncMode",lightShaderId:"light:shaderId",materialGlowTintsLight:"materialGlowTintsLight",MeshLight:"MeshLight",mirroredBall:"mirroredBall",noMaterialResponse:"noMaterialResponse",orientToStageUpAxis:"orientToStageUpAxis",poleAxis:"poleAxis",portals:"portals",scene:"scene",shadowLink:"shadowLink",treatAsLine:"treatAsLine",treatAsPoint:"treatAsPoint",VolumeLight:"VolumeLight",Y:"Y",Z:"Z",BoundableLightBase:"BoundableLightBase",CylinderLight:"CylinderLight",DiskLight:"DiskLight",DistantLight:"DistantLight",DomeLight:"DomeLight",DomeLight_1:"DomeLight_1",GeometryLight:"GeometryLight",LightAPI:"LightAPI",LightFilter:"LightFilter",LightListAPI:"LightListAPI",ListAPI:"ListAPI",MeshLightAPI:"MeshLightAPI",NonboundableLightBase:"NonboundableLightBase",PluginLight:"PluginLight",PluginLightFilter:"PluginLightFilter",PortalLight:"PortalLight",RectLight:"RectLight",ShadowAPI:"ShadowAPI",ShapingAPI:"ShapingAPI",SphereLight:"SphereLight",VolumeLightAPI:"VolumeLightAPI"});var $b={Plugins:[{Info:{Types:{UsdVolField3DAsset:{alias:{UsdSchemaBase:"Field3DAsset"},autoGenerated:!0,bases:["UsdVolFieldAsset"],schemaIdentifier:"Field3DAsset",schemaKind:"concreteTyped"},UsdVolFieldAsset:{alias:{UsdSchemaBase:"FieldAsset"},autoGenerated:!0,bases:["UsdVolVolumeFieldAsset"],schemaIdentifier:"FieldAsset",schemaKind:"abstractTyped"},UsdVolFieldBase:{alias:{UsdSchemaBase:"FieldBase"},autoGenerated:!0,bases:["UsdVolVolumeFieldBase"],schemaIdentifier:"FieldBase",schemaKind:"abstractTyped"},UsdVolOpenVDBAsset:{alias:{UsdSchemaBase:"OpenVDBAsset"},autoGenerated:!0,bases:["UsdVolFieldAsset"],schemaIdentifier:"OpenVDBAsset",schemaKind:"concreteTyped"},UsdVolParticleField:{alias:{UsdSchemaBase:"ParticleField"},autoGenerated:!0,bases:["UsdGeomGprim"],schemaIdentifier:"ParticleField",schemaKind:"concreteTyped"},UsdVolParticleField3DGaussianSplat:{alias:{UsdSchemaBase:"ParticleField3DGaussianSplat"},autoGenerated:!0,bases:["UsdVolParticleField"],schemaIdentifier:"ParticleField3DGaussianSplat",schemaKind:"concreteTyped"},UsdVolParticleFieldKernelBaseAPI:{alias:{UsdSchemaBase:"ParticleFieldKernelBaseAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ParticleFieldKernelBaseAPI",schemaKind:"singleApplyAPI"},UsdVolParticleFieldKernelConstantSurfletAPI:{alias:{UsdSchemaBase:"ParticleFieldKernelConstantSurfletAPI"},apiSchemaCanOnlyApplyTo:["ParticleField"],autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ParticleFieldKernelConstantSurfletAPI",schemaKind:"singleApplyAPI"},UsdVolParticleFieldKernelGaussianEllipsoidAPI:{alias:{UsdSchemaBase:"ParticleFieldKernelGaussianEllipsoidAPI"},apiSchemaCanOnlyApplyTo:["ParticleField"],autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ParticleFieldKernelGaussianEllipsoidAPI",schemaKind:"singleApplyAPI"},UsdVolParticleFieldKernelGaussianSurfletAPI:{alias:{UsdSchemaBase:"ParticleFieldKernelGaussianSurfletAPI"},apiSchemaCanOnlyApplyTo:["ParticleField"],autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ParticleFieldKernelGaussianSurfletAPI",schemaKind:"singleApplyAPI"},UsdVolParticleFieldOpacityAttributeAPI:{alias:{UsdSchemaBase:"ParticleFieldOpacityAttributeAPI"},apiSchemaCanOnlyApplyTo:["ParticleField"],autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ParticleFieldOpacityAttributeAPI",schemaKind:"singleApplyAPI"},UsdVolParticleFieldOrientationAttributeAPI:{alias:{UsdSchemaBase:"ParticleFieldOrientationAttributeAPI"},apiSchemaCanOnlyApplyTo:["ParticleField"],autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ParticleFieldOrientationAttributeAPI",schemaKind:"singleApplyAPI"},UsdVolParticleFieldPositionAttributeAPI:{alias:{UsdSchemaBase:"ParticleFieldPositionAttributeAPI"},apiSchemaCanOnlyApplyTo:["ParticleField"],autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ParticleFieldPositionAttributeAPI",schemaKind:"singleApplyAPI"},UsdVolParticleFieldPositionBaseAPI:{alias:{UsdSchemaBase:"ParticleFieldPositionBaseAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ParticleFieldPositionBaseAPI",schemaKind:"singleApplyAPI"},UsdVolParticleFieldRadianceBaseAPI:{alias:{UsdSchemaBase:"ParticleFieldRadianceBaseAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ParticleFieldRadianceBaseAPI",schemaKind:"singleApplyAPI"},UsdVolParticleFieldScaleAttributeAPI:{alias:{UsdSchemaBase:"ParticleFieldScaleAttributeAPI"},apiSchemaCanOnlyApplyTo:["ParticleField"],autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ParticleFieldScaleAttributeAPI",schemaKind:"singleApplyAPI"},UsdVolParticleFieldSphericalHarmonicsAttributeAPI:{alias:{UsdSchemaBase:"ParticleFieldSphericalHarmonicsAttributeAPI"},apiSchemaCanOnlyApplyTo:["ParticleField"],autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ParticleFieldSphericalHarmonicsAttributeAPI",schemaKind:"singleApplyAPI"},UsdVolVolume:{alias:{UsdSchemaBase:"Volume"},autoGenerated:!0,bases:["UsdGeomGprim"],schemaIdentifier:"Volume",schemaKind:"concreteTyped"},UsdVolVolumeFieldAsset:{alias:{UsdSchemaBase:"VolumeFieldAsset"},autoGenerated:!0,bases:["UsdVolFieldBase"],schemaIdentifier:"VolumeFieldAsset",schemaKind:"abstractTyped"},UsdVolVolumeFieldBase:{alias:{UsdSchemaBase:"VolumeFieldBase"},autoGenerated:!0,bases:["UsdGeomXformable"],schemaIdentifier:"VolumeFieldBase",schemaKind:"abstractTyped"}}},LibraryPath:"@PLUG_INFO_LIBRARY_PATH@",Name:"usdVol",ResourcePath:"@PLUG_INFO_RESOURCE_PATH@",Root:"@PLUG_INFO_ROOT@",Type:"library"}]},zb=`#usda 1.0
(
    "WARNING: THIS FILE IS GENERATED BY usdGenSchema.  DO NOT EDIT."
)

class Volume "Volume" (
    customData = {
        string userDocBrief = """A renderable volume containing one or more
volumetric data fields, used to represent a volume effect such as smoke or fire."""
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

class "VolumeFieldBase" (
    customData = {
        string userDocBrief = "The base schema class for volume field primitives."
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

class "FieldBase" (
    customData = {
        string userDocBrief = """This schema is deprecated and VolumeFieldBase 
should be used instead."""
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

class "VolumeFieldAsset" (
    customData = {
        string userDocBrief = """The base schema class for volume field 
primitives defined by an external file."""
    }
)
{
    token fieldDataType (
        customData = {
            string userDocBrief = """Token used to indicate the data type of an
individual field"""
        }
    )
    int fieldIndex (
        customData = {
            string userDocBrief = """Optional attribute that stores an index used 
to disambiguate between fields with the same name."""
        }
    )
    token fieldName (
        customData = {
            string userDocBrief = """Name of an individual field within the file 
specified by the filePath attribute."""
        }
    )
    asset filePath (
        customData = {
            string userDocBrief = "An asset path attribute that points to a file on disk."
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
    token vectorDataRoleHint = "None" (
        allowedTokens = ["None", "Point", "Normal", "Vector", "Color"]
        customData = {
            string userDocBrief = """Optional token used to indicate the role of 
a vector valued field."""
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

class "FieldAsset" (
    customData = {
        string userDocBrief = """This schema is deprecated and VolumeFieldAsset 
should be used instead."""
    }
)
{
    token fieldDataType (
        customData = {
            string userDocBrief = """Token used to indicate the data type of an
individual field"""
        }
    )
    int fieldIndex (
        customData = {
            string userDocBrief = """Optional attribute that stores an index used 
to disambiguate between fields with the same name."""
        }
    )
    token fieldName (
        customData = {
            string userDocBrief = """Name of an individual field within the file 
specified by the filePath attribute."""
        }
    )
    asset filePath (
        customData = {
            string userDocBrief = "An asset path attribute that points to a file on disk."
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
    token vectorDataRoleHint = "None" (
        allowedTokens = ["None", "Point", "Normal", "Vector", "Color"]
        customData = {
            string userDocBrief = """Optional token used to indicate the role of 
a vector valued field."""
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

class Field3DAsset "Field3DAsset" (
    customData = {
        string userDocBrief = "Field3D field primitive."
    }
)
{
    token fieldDataType (
        allowedTokens = ["half", "float", "double", "half3", "float3", "double3"]
        customData = {
            string userDocBrief = """Token used to indicate the data type of an
individual field."""
        }
    )
    int fieldIndex (
        customData = {
            string userDocBrief = """Optional attribute that stores an index used 
to disambiguate between fields with the same name."""
        }
    )
    token fieldName (
        customData = {
            string userDocBrief = """Name of an individual field within the file 
specified by the filePath attribute."""
        }
    )
    token fieldPurpose (
        customData = {
            string userDocBrief = """Optional token used to indicate the purpose or 
grouping of an individual field."""
        }
    )
    asset filePath (
        customData = {
            string userDocBrief = "An asset path attribute that points to a file on disk."
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
    token vectorDataRoleHint = "None" (
        allowedTokens = ["None", "Point", "Normal", "Vector", "Color"]
        customData = {
            string userDocBrief = """Optional token used to indicate the role of 
a vector valued field."""
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

class OpenVDBAsset "OpenVDBAsset" (
    customData = {
        string userDocBrief = "OpenVDB field primitive."
    }
)
{
    token fieldClass (
        allowedTokens = ["levelSet", "fogVolume", "staggered", "unknown"]
        customData = {
            string userDocBrief = """Optional token used to indicate the class of
an individual grid."""
        }
    )
    token fieldDataType (
        allowedTokens = ["half", "float", "double", "int", "uint", "int64", "half2", "float2", "double2", "int2", "half3", "float3", "double3", "int3", "matrix3d", "matrix4d", "quatd", "bool", "mask", "string"]
        customData = {
            string userDocBrief = """Token used to indicate the data type of an
individual field."""
        }
    )
    int fieldIndex (
        customData = {
            string userDocBrief = """Optional attribute that stores an index used 
to disambiguate between fields with the same name."""
        }
    )
    token fieldName (
        customData = {
            string userDocBrief = """Name of an individual field within the file 
specified by the filePath attribute."""
        }
    )
    asset filePath (
        customData = {
            string userDocBrief = "An asset path attribute that points to a file on disk."
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
    token vectorDataRoleHint = "None" (
        allowedTokens = ["None", "Point", "Normal", "Vector", "Color"]
        customData = {
            string userDocBrief = """Optional token used to indicate the role of 
a vector valued field."""
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

class ParticleField "ParticleField" (
    customData = {
        string userDocBrief = """The base schema to describe different types
of concrete ParticleField implementations, such as 3D Gaussian Splats."""
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

class "ParticleFieldPositionBaseAPI" (
    customData = {
        string userDocBrief = "A base schema for ParticleField position data."
    }
)
{
}

class "ParticleFieldPositionAttributeAPI" (
    apiSchemas = ["ParticleFieldPositionBaseAPI"]
    customData = {
        string userDocBrief = """A ParticleField related applied schema that 
provides attributes to define the positions of particles."""
    }
)
{
    point3f[] positions (
        customData = {
            string userDocBrief = """Defines the position for each particle in
local space."""
        }
    )
    point3h[] positionsh (
        customData = {
            string userDocBrief = """Defines the position for each particle in
local space."""
        }
    )
}

class "ParticleFieldOrientationAttributeAPI" (
    customData = {
        string userDocBrief = """A ParticleField related applied schema that 
provides attributes to define the orientation of particles."""
    }
)
{
    quatf[] orientations (
        customData = {
            string userDocBrief = """Defines the quaternion orientation for each 
particle."""
        }
    )
    quath[] orientationsh (
        customData = {
            string userDocBrief = """Defines the quaternion orientation for each 
particle."""
        }
    )
}

class "ParticleFieldScaleAttributeAPI" (
    customData = {
        string userDocBrief = """A ParticleField related applied schema that 
provides attributes to define the linear scale factor applied to particles."""
    }
)
{
    float3[] scales (
        customData = {
            string userDocBrief = """Affine linear scale factor applied to the 
kernel that is instantiated at each particle."""
        }
    )
    half3[] scalesh (
        customData = {
            string userDocBrief = """Affine linear scale factor applied to the 
kernel that is instantiated at each particle."""
        }
    )
}

class "ParticleFieldOpacityAttributeAPI" (
    customData = {
        string userDocBrief = """A ParticleField related applied schema that 
provides attributes to define the opacity of the particles."""
    }
)
{
    float[] opacities (
        customData = {
            string userDocBrief = "Defines the opacity for each particle."
        }
    )
    half[] opacitiesh (
        customData = {
            string userDocBrief = "Defines the opacity for each particle."
        }
    )
}

class "ParticleFieldKernelBaseAPI" (
    customData = {
        string userDocBrief = """A base schema for ParticleField kernel spatial
basis function data."""
    }
)
{
}

class "ParticleFieldKernelGaussianEllipsoidAPI" (
    apiSchemas = ["ParticleFieldKernelBaseAPI"]
    customData = {
        string userDocBrief = """Defines the Gaussian ellipsoid kernel for a 
ParticleField."""
    }
)
{
}

class "ParticleFieldKernelGaussianSurfletAPI" (
    apiSchemas = ["ParticleFieldKernelBaseAPI"]
    customData = {
        string userDocBrief = """Defines the Gaussian surflet kernel for a 
ParticleField."""
    }
)
{
}

class "ParticleFieldKernelConstantSurfletAPI" (
    apiSchemas = ["ParticleFieldKernelBaseAPI"]
    customData = {
        string userDocBrief = """Defines the constant surflet kernel for a 
ParticleField."""
    }
)
{
}

class "ParticleFieldRadianceBaseAPI" (
    customData = {
        string userDocBrief = """A base schema for ParticleField radiance 
definition data."""
    }
)
{
}

class "ParticleFieldSphericalHarmonicsAttributeAPI" (
    apiSchemas = ["ParticleFieldRadianceBaseAPI"]
    customData = {
        string userDocBrief = """Defines the spherical harmonics attributes for 
a ParticleField."""
    }
)
{
    float3[] radiance:sphericalHarmonicsCoefficients (
        customData = {
            string userDocBrief = """An array of spherical harmonics 
coefficients."""
        }
    )
    half3[] radiance:sphericalHarmonicsCoefficientsh (
        customData = {
            string userDocBrief = """An array of spherical harmonics 
coefficients."""
        }
    )
    uniform int radiance:sphericalHarmonicsDegree = 3 (
        customData = {
            string userDocBrief = """The highest degree of the spherical 
harmonics."""
        }
    )
}

class ParticleField3DGaussianSplat "ParticleField3DGaussianSplat" (
    apiSchemas = ["ParticleFieldPositionAttributeAPI", "ParticleFieldOrientationAttributeAPI", "ParticleFieldScaleAttributeAPI", "ParticleFieldOpacityAttributeAPI", "ParticleFieldKernelGaussianEllipsoidAPI", "ParticleFieldSphericalHarmonicsAttributeAPI"]
    customData = {
        string userDocBrief = """A ParticleField that represents a 3D 
Gaussian splat."""
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
    uniform token projectionModeHint = "perspective" (
        allowedTokens = ["perspective", "tangential"]
        customData = {
            string userDocBrief = """A renderer hint on how to project 
the Gaussian to achieve a perspective correct view."""
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
    uniform token sortingModeHint = "zDepth" (
        allowedTokens = ["zDepth", "cameraDistance", "rayHitDistance"]
        customData = {
            string userDocBrief = """A renderer hint on how to sort 
the Gaussian while drawing."""
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

`;te.GetInstance().RegisterPlugins($b,{usdVol:{"generatedSchema.usda":zb}});var gf="field:";function yf(n){return n.startsWith("/")&&!n.includes(".")&&!n.includes("{")}function Hb(n){return n.startsWith("/")&&n.indexOf(".")>0&&!n.includes("{")}function E_(n){let e=n.indexOf(".");return[n.slice(0,e),n.slice(e+1)]}var Ni=class n extends pt{static typeName="Volume";static define(e,t){return new n(e.definePrim(t,n.typeName),e)}static get(e,t){let r=e.getPrim(t);return!r||r.typeName!==n.typeName?null:new n(e._primHandle(t),e)}static is(e){return e.typeName===n.typeName}static _makeNamespaced(e){return e.startsWith(gf)?e:gf+e}_getForwardedTargets(e,t,r,i,s){let a=this._stage.getPrim(e)?.getAttr(t);if(!(!a||!a.isRelationship))for(let c of a.getTargets()){if(Hb(c)){let[l,u]=E_(c),p=this._stage.getPrim(l)?.getAttr(u);if(p&&p.isRelationship){let f=`${l}.${u}`;r.has(f)||(r.add(f),this._getForwardedTargets(l,u,r,i,s));continue}}s.has(c)||(s.add(c),i.push(c))}}getFieldPaths(){let e=new Map,t=this._stage.getPrim(this.path);if(!t)return e;let r=t.attrNames.filter(i=>i.startsWith(gf)).sort();for(let i of r){let s=t.getAttr(i);if(!s||!s.isRelationship)continue;let o=[];if(this._getForwardedTargets(this.path,i,new Set([`${this.path}.${i}`]),o,new Set),o.length===1&&yf(o[0])){let a=i.slice(i.lastIndexOf(":")+1);e.set(a,o[0])}}return e}hasFieldRelationship(e){let r=this._stage.getPrim(this.path)?.getAttr(n._makeNamespaced(e));return r!==void 0&&r.isRelationship}getFieldPath(e){let t=n._makeNamespaced(e),i=this._stage.getPrim(this.path)?.getAttr(t);if(!i||!i.isRelationship)return"";let s=[];return this._getForwardedTargets(this.path,t,new Set([`${this.path}.${t}`]),s,new Set),s.length===1&&yf(s[0])?s[0]:""}createFieldRelationship(e,t){if(!yf(t)&&!Hb(t))return!1;let r=n._makeNamespaced(e);return this._prim.createRel(r,[t]),this._stage.setPropertyField(`${this.path}.${r}`,"custom",!0),!0}blockFieldRelationship(e){return this.hasFieldRelationship(e)?(this._prim.rel(n._makeNamespaced(e)).setTargets([]),!0):!1}};var Kl=class extends dt{},ql=class extends Kl{},Ql=class extends ql{getFilePathAttr(){return this._attr("filePath","asset")}getFieldNameAttr(){return this._attr("fieldName","token")}getFieldIndexAttr(){return this._attr("fieldIndex","int")}getFieldDataTypeAttr(){return this._attr("fieldDataType","token")}getVectorDataRoleHintAttr(){return this._attr("vectorDataRoleHint","token")}static getFilePath(e,t){let r=C(e,"filePath",t);return typeof r=="string"?r:""}static getFieldName(e){return re(C(e,"fieldName"),"")}static getFieldIndex(e){return ee(C(e,"fieldIndex"),0)}static getFieldDataType(e){return re(C(e,"fieldDataType"),"")}static getVectorDataRoleHint(e){return re(C(e,"vectorDataRoleHint"),"None")}},Xl=class extends Ql{};var jn=class n extends Xl{static typeName="OpenVDBAsset";static define(e,t){return new n(e.definePrim(t,n.typeName),e)}static is(e){return e.typeName===n.typeName}getFieldClassAttr(){return this._attr("fieldClass","token")}static getFieldClass(e){return re(C(e,"fieldClass"),"")}};var $_=Fs({field:"field",filePath:"filePath",fieldName:"fieldName",fieldIndex:"fieldIndex",fieldDataType:"fieldDataType",vectorDataRoleHint:"vectorDataRoleHint",fieldPurpose:"fieldPurpose",fieldClass:"fieldClass",positions:"positions",positionsh:"positionsh",orientations:"orientations",orientationsh:"orientationsh",scales:"scales",scalesh:"scalesh",opacities:"opacities",opacitiesh:"opacitiesh",projectionModeHint:"projectionModeHint",sortingModeHint:"sortingModeHint",radianceSphericalHarmonicsDegree:"radiance:sphericalHarmonicsDegree",radianceSphericalHarmonicsCoefficients:"radiance:sphericalHarmonicsCoefficients",radianceSphericalHarmonicsCoefficientsh:"radiance:sphericalHarmonicsCoefficientsh",none:"None",point:"Point",normal:"Normal",vector:"Vector",color:"Color",levelSet:"levelSet",fogVolume:"fogVolume",staggered:"staggered",unknown:"unknown",perspective:"perspective",tangential:"tangential",zDepth:"zDepth",cameraDistance:"cameraDistance",rayHitDistance:"rayHitDistance",ParticleField:"ParticleField",ParticleField3DGaussianSplat:"ParticleField3DGaussianSplat"});function Yl(n,e){let t=a=>{let c=n.getAttr(a);return e===void 0?c?.getValue():c?.getValueAtTime(e)},r=t("inputs:width")??1,i=t("inputs:height")??1,s=t("inputs:normalize")??!1;if(typeof r!="number"||typeof i!="number"||!Number.isFinite(r)||!Number.isFinite(i)||r<=0||i<=0||typeof s!="boolean")throw Error("RectLight requires positive finite width/height and boolean normalize");let o=[];for(let a of["inputs:texture:file","inputs:shaping:cone:angle","inputs:shaping:cone:softness","inputs:shaping:focus","inputs:shaping:ies:file","inputs:diffuse","inputs:specular"]){let c=t(a);c!==void 0&&c!==""&&!((a==="inputs:diffuse"||a==="inputs:specular")&&c===1)&&o.push(a)}n.rel("light:filters").getTargets().length&&o.push("light:filters");for(let a of["lightLink","shadowLink"])(t(`collection:${a}:includeRoot`)===!1||n.rel(`collection:${a}:includes`).getTargets().length||n.rel(`collection:${a}:excludes`).getTargets().length)&&o.push(`collection:${a}`);for(let a of["intensity","exposure","color","width","height","normalize"])n.getAttr(`inputs:${a}`)?.getConnections().length&&o.push(`connected inputs:${a}`);return{width:r,height:i,normalize:s,unsupported:o}}function jb(n,e=16,t=24){let r=[],i=[];for(let c=0;c<=e;c++){let l=c/e*Math.PI,u=Math.sin(l),d=Math.cos(l);for(let p=0;p<=t;p++){let f=p/t*2*Math.PI,h=u*Math.cos(f),y=u*Math.sin(f),g=d;i.push([h,y,g]),r.push([h*n,y*n,g*n])}}let s=[],o=[],a=t+1;for(let c=0;c<e;c++)for(let l=0;l<t;l++){let u=c*a+l,d=u+a;s.push(4),o.push(u,d,d+1,u+1)}return{points:r,normals:i,faceVertexCounts:s,faceVertexIndices:o}}function B(n,e,t){let r=n?.getAttr(e);return t===void 0?r?.getValue():r?.getValueAtTime(t)}function ie(n,e){n.push(e)}function Sf(n){if(typeof n=="string")return n;if(n&&typeof n=="object"){let e=n;if(typeof e.path=="string")return e.path;if(typeof e.assetPath=="string")return e.assetPath}}function Wb(n,e){return Array.isArray(n)&&n.length>=2&&n.slice(0,2).every(Number.isFinite)?[Number(n[0]),Number(n[1])]:e}var z_=new Set(["black","clamp","repeat","mirror","useMetadata"]);function H_(n,e,t,r,i,s){let o=e.getAttr(`inputs:${t}`)?.getConnections()[0];if(!o)return;let a=o.lastIndexOf("."),c=a>0?o.slice(0,a):o,l=a>0?o.slice(a+1).replace(/^outputs:/,""):"rgb",u=n.getPrim(c);if(!u||xn.getShaderId(u)!=="UsdUVTexture"){ie(i,{severity:"warning",code:"UNSUPPORTED_MATERIAL",path:r,typeName:"Mesh",message:`Surface input ${t} is not connected to UsdUVTexture at ${r}`});return}let d=Sf(B(u,"inputs:file",s));if(!d){ie(i,{severity:"error",code:"INVALID_MATERIAL",path:r,typeName:"Mesh",message:`UsdUVTexture has no valid file asset at ${c}`});return}let p="st",f=[1,1],h=[0,0],y=u.getAttr("inputs:st")?.getConnections()[0];for(let b=0;y&&b<4;b++){let S=y.slice(0,y.lastIndexOf(".")),x=n.getPrim(S),v=x?xn.getShaderId(x):"";if(x&&v==="UsdTransform2d"){f=Wb(B(x,"inputs:scale",s),f),h=Wb(B(x,"inputs:translation",s),h);let T=B(x,"inputs:rotation",s);typeof T=="number"&&T!==0&&ie(i,{severity:"warning",code:"UNSUPPORTED_MATERIAL",path:r,typeName:"Mesh",message:`UsdTransform2d rotation is unsupported at ${S}`}),y=x.getAttr("inputs:in")?.getConnections()[0]}else if(x&&v==="UsdPrimvarReader_float2"){let T=B(x,"inputs:varname",s);typeof T=="string"&&T.length>0&&(p=T);break}else break}let g=b=>{let S=B(u,`inputs:${b}`,s);return typeof S=="string"&&z_.has(S)?S:"useMetadata"},m=B(u,"inputs:sourceColorSpace",s);p!=="st"&&ie(i,{severity:"warning",code:"UNSUPPORTED_MATERIAL",path:r,typeName:"Mesh",message:`Texture uses unsupported UV primvar "${p}" at ${c}`});let P=n.getPropertyStack(`${c}.inputs:file`)[0]?.layerIdentifier??n.rootLayerPath;return{assetPath:d,resolvedPath:Nt(P,d),sourceColorSpace:m==="sRGB"||m==="raw"?m:"auto",wrapS:g("wrapS"),wrapT:g("wrapT"),sourceOutput:l,uvPrimvar:p,uvScale:f,uvTranslation:h}}function Tf(n,e,t){let r=Ei.computeBoundMaterial(n,e),i=r?n.getPrim(r.materialPath)?.getAttr("outputs:volume")?.getConnections():void 0;if(i?.length!==1||!r||!i[0].endsWith(".outputs:volume"))return;let s=i[0].slice(0,i[0].lastIndexOf(".")),o=n.getPrim(s);if(!o||xn.getShaderId(o)!=="RuntimeFogVolume")return;let a=B(o,"inputs:extinction",t),c=B(o,"inputs:albedo",t);if(!(typeof a!="number"||!Number.isFinite(a)||a<0||!Array.isArray(c)||c.length!==3||c.some(l=>typeof l!="number"||!Number.isFinite(l)||l<0||l>1)))return{materialPath:r.materialPath,shaderPath:s,model:"RuntimeFogVolume",extinction:a,albedo:[...c]}}function j_(n,e,t,r){let i=Ei.computeBoundMaterial(n,e);if(!i){(n.getPrim(e)?.getAttr("material:binding")?.getTargets()??[]).length>0&&ie(t,{severity:"warning",code:"UNSUPPORTED_MATERIAL",path:e,typeName:"Mesh",message:`Material binding could not be resolved at ${e}`});return}let s=Ri.computeSurfaceSource(n,i.materialPath);if(!s){ie(t,{severity:"warning",code:"UNSUPPORTED_MATERIAL",path:e,typeName:"Mesh",message:`Bound material has no supported surface output at ${e}`});return}let o=n.getPrim(s.primPath),a=o?xn.getShaderId(o):void 0;if(!o||a!=="UsdPreviewSurface"){ie(t,{severity:"warning",code:"UNSUPPORTED_MATERIAL",path:e,typeName:"Mesh",message:`Unsupported surface shader "${a??"missing"}" at ${s.primPath}`});return}let c=B(o,"inputs:diffuseColor",r),l=B(o,"inputs:roughness",r),u=B(o,"inputs:metallic",r),d=B(o,"inputs:opacity",r),p=B(o,"inputs:emissiveColor",r),f=B(o,"inputs:ior",r),h=p===void 0||Array.isArray(p)&&p.length===3&&p.every(Number.isFinite),y=f===void 0||Number.isFinite(f)&&f>0,g=["diffuseColor","roughness","metallic","opacity","normal"].map(v=>[v,H_(n,o,v,e,t,r)]).filter(v=>v[1]!==void 0),m=Object.fromEntries(g),P=Array.isArray(c)&&c.length>=3&&c.slice(0,3).every(Number.isFinite),b=l===void 0||Number.isFinite(l),S=u===void 0||Number.isFinite(u),x=d===void 0||Number.isFinite(d);return(!P&&c!==void 0||!b||!S||!x||!h||!y)&&ie(t,{severity:"error",code:"INVALID_MATERIAL",path:e,typeName:"Mesh",message:`UsdPreviewSurface has non-finite or malformed inputs at ${s.primPath}`}),{diffuseColor:P?[...c]:[.18,.18,.18],emissiveColor:h&&p?[...p]:[0,0,0],ior:y&&f!==void 0?f:1.5,...b&&l!==void 0?{roughness:l}:{},...S&&u!==void 0?{metallic:u}:{},...x&&d!==void 0?{opacity:d}:{},...g.length>0?{textures:m}:{}}}function W_(n,e,t,r){let i=B(n.getPrim(e),"primvars:displayColor",r);if(!(!i||i.length===0)){if(!Array.isArray(i[0])||i[0].length<3||!i[0].slice(0,3).every(Number.isFinite)){ie(t,{severity:"error",code:"INVALID_MATERIAL",path:e,typeName:"Mesh",message:`Malformed primvars:displayColor at ${e}`});return}return{diffuseColor:[...i[0]]}}}function Zl(n,e,t,r){return j_(n,e,t,r)??W_(n,e,t,r)}function K_(n,e){return n.getPrim(e)?.getAttr("doubleSided")?.getValue()}var xf=class extends Error{diagnostics;constructor(e){super(`USD bake failed with ${e.length} diagnostic${e.length===1?"":"s"}`),this.name="BakeError",this.diagnostics=e}},q_=new Set(["","Xform","Scope","Material","Shader","NodeGraph","GeomSubset","OpenVDBAsset"]);function Pf(n){return Array.isArray(n)?n.map(e=>Array.isArray(e)?[...e]:[]).filter(e=>e.length>=3):[]}function Wn(n){return Array.isArray(n)||ArrayBuffer.isView(n)?Array.from(n,Number):[]}function Q_(n,e,t,r,i,s,o){let a=B(n,"primvars:st",o);if(a===void 0)return;let c=Array.isArray(a)?a.filter(Array.isArray).map(g=>[...g]):[],l=new Set(["constant","uniform","varying","vertex","faceVarying"]),u=n.getAttr("primvars:st")?.getField("interpolation"),d=B(n,"primvars:st:interpolation",o),p=typeof u=="string"&&l.has(u)?u:typeof d=="string"&&l.has(d)?d:"vertex",f=Wn(B(n,"primvars:st:indices",o)),h=p==="constant"?1:p==="uniform"?r:p==="faceVarying"?i:t;if(c.length===0||c.some(g=>g.length<2||!ma(g.slice(0,2)))||f.length>0&&(f.length!==h||f.some(g=>!Number.isInteger(g)||g<0||g>=c.length))||f.length===0&&c.length!==h){ie(s,{severity:"error",code:"INVALID_UVS",path:e,typeName:"Mesh",message:`primvars:st has invalid values, indices, or interpolation cardinality at ${e}`});return}return{name:"st",values:c,...f.length>0?{indices:f}:{},interpolation:p}}function ma(n){return n.every(Number.isFinite)}function Vs(n,e,t){return typeof n=="string"&&e.includes(n)?n:t}function X_(n,e,t,r,i){let s=[],o=new Set;for(let a of rn.getGeomSubsets(n,e,"face","materialBind")){let c=Array.from(rn.getIndices(a,i)),l=c.some(d=>!Number.isInteger(d)||d<0||d>=t||o.has(d)),u=Zl(n,a.path,r,i);if(l||!u){ie(r,{severity:"error",code:"INVALID_MATERIAL_SUBSET",path:a.path,typeName:"GeomSubset",message:`Material subset has invalid, overlapping, or unbound faces at ${a.path}`});continue}c.forEach(d=>o.add(d)),s.push({path:a.path,faceIndices:c,material:u})}return s}function Kb(n,e){return n===e||n.startsWith(`${e}/`)}function Y_(n,e,t,r="vertex"){let{points:i,faceVertexCounts:s,faceVertexIndices:o,normals:a}=e,c=i.length===0||s.length===0||s.some(d=>!Number.isInteger(d)||d<3)||s.reduce((d,p)=>d+p,0)!==o.length||o.some(d=>!Number.isInteger(d)||d<0||d>=i.length);c&&ie(t,{severity:"error",code:"INVALID_MESH_TOPOLOGY",path:n,typeName:"Mesh",message:`Invalid face topology or point indices at ${n}`});let l=i.some(d=>d.length<3||!ma(d.slice(0,3)));l&&ie(t,{severity:"error",code:"INVALID_MESH_VALUE",path:n,typeName:"Mesh",message:`Mesh contains malformed or non-finite points at ${n}`});let u=r==="constant"?1:r==="uniform"?s.length:r==="faceVarying"?o.length:i.length;return a&&(a.some(d=>d.length<3||!ma(d.slice(0,3)))||a.length!==u)&&(ie(t,{severity:"error",code:"INVALID_NORMALS",path:n,typeName:"Mesh",message:`Normals must be finite and have vertex or face-varying cardinality at ${n}`}),delete e.normals),!c&&!l}function Jl(n,e={}){let t=e.root??"/",r=e.time,i=e.unsupported??"diagnostic",s=new hr(n,r),o=[],a=[],c=[],l=[],u=[],d=[...n.traverse()].filter(m=>!m.slice(m.lastIndexOf("/")+1).includes(".")).sort();for(let m of d){if(t!=="/"&&!(m===t||m.startsWith(`${t}/`)))continue;let P=n.getPrim(m);if(!P)continue;if(P.typeName==="Volume"){let U=Ni.get(n,m),Y=U?.getFieldPaths(),le=Y?.get("density"),de=le?n.getPrim(le):void 0,j=de?Sf(B(de,"filePath",r)):void 0,H=de?jn.getFieldName(de):"",Dt=de?jn.getFieldIndex(de):0,Ke=[...s.getLocalToWorldTransform(m)],Ve=le?[...s.getLocalToWorldTransform(le)]:[],Rt=Tf(n,m,r);if(Y?.size!==1||!le||de?.typeName!=="OpenVDBAsset"||!j||!H||!Rt||![...Ke,...Ve].every(Number.isFinite))ie(u,{severity:"warning",code:"UNSUPPORTED_VOLUME",path:m,typeName:P.typeName,message:"Volume requires one valid density OpenVDBAsset, finite transforms and explicit RuntimeFogVolume material"});else{let W=n.getPropertyStack(`${le}.filePath`)[0]?.layerIdentifier??n.rootLayerPath;l.push({path:m,worldMatrix:Ke,visible:ze.computeVisibility(n,m,r)!=="invisible",material:Rt,density:{path:le,assetPath:j,resolvedPath:Nt(W,j),fieldName:H,fieldIndex:Dt,worldMatrix:Ve}})}continue}if(P.typeName==="DistantLight"||P.typeName==="DomeLight"||P.typeName==="RectLight"){let{color:U,intensity:Y}=mr.computeBaseEmission(P,r),le=[...s.getLocalToWorldTransform(m)];if(![...U,Y,...le].every(Number.isFinite))ie(u,{severity:"error",code:"INVALID_LIGHT",path:m,typeName:P.typeName,message:`Light emission or transform contains non-finite values at ${m}`});else{let de={path:m,color:[...U],intensity:Y,worldMatrix:le,visible:ze.computeVisibility(n,m,r)!=="invisible"};if(P.typeName==="RectLight")try{if(Y<0||U.some(H=>H<0))throw new Error("RectLight emission must be nonnegative");let j=Yl(P,r);j.unsupported.length&&ie(u,{severity:"warning",code:"UNSUPPORTED_LIGHT_FEATURE",path:m,typeName:P.typeName,message:`RectLight profile does not evaluate ${j.unsupported.join(", ")}`}),a.push({...de,type:"rect",...j})}catch(j){ie(u,{severity:"error",code:"INVALID_LIGHT",path:m,typeName:P.typeName,message:String(j)})}else if(P.typeName==="DistantLight")a.push({...de,type:"distant"});else{let j=new Set(["automatic","latlong","mirroredBall","angular","cubeMapVerticalCross"]),H=B(P,"inputs:texture:format",r),Dt=typeof H=="string"&&j.has(H)?H:"automatic",Ke=Sf(B(P,"inputs:texture:file",r)),Ve;if(Ke){let Rt=n.getPropertyStack(`${m}.inputs:texture:file`)[0]?.layerIdentifier??n.rootLayerPath;Ve={assetPath:Ke,resolvedPath:Nt(Rt,Ke)},ie(u,{severity:e.unsupported==="error"?"error":"warning",code:"UNSUPPORTED_DOME_TEXTURE",path:m,typeName:P.typeName,message:`Textured DomeLight IBL is unsupported at ${m}; textureless emission remains available`})}a.push({...de,type:"dome",textureFormat:Dt,...Ve?{textureAsset:Ve}:{}})}}continue}if(P.typeName==="PointInstancer"){let U=sn.getPrototypes(P),Y=sn.getProtoIndices(P,r),le=sn.getPositions(P,r);if(U.length===0&&Y.length===0&&le.length===0)continue;let de=sn.getOrientations(P,r),j=sn.getScales(P,r),H=["velocities","accelerations","angularVelocities"].some(Ge=>Wn(B(P,Ge,r)).length>0),Dt=sn.computeInstanceTransforms(P,{time:r,applyMask:!0,includeProtoXform:!0,stage:n}),Ke=Y.find(Ge=>!Number.isInteger(Ge)||Ge<0||Ge>=U.length),Ve=U.length===0?"(no targets)":U.find(Ge=>!n.getPrim(Ge)),Rt=U.find(Ge=>n.getPrim(Ge)!==void 0&&!d.some(_e=>Kb(_e,Ge)&&n.getPrim(_e)?.typeName==="Mesh")),W=le.length!==Y.length||de.length>0&&de.length!==Y.length||j.length>0&&j.length!==Y.length;if(H&&ie(u,{severity:"warning",code:"POINT_INSTANCER_UNSUPPORTED_MOTION",path:m,typeName:P.typeName,message:`Velocity-based PointInstancer motion is unsupported at ${m}`}),Ve!==void 0?ie(u,{severity:"error",code:"POINT_INSTANCER_MISSING_PROTOTYPE",path:m,typeName:P.typeName,message:`PointInstancer has a missing prototype target (${Ve})`}):Rt!==void 0?ie(u,{severity:"error",code:"POINT_INSTANCER_UNSUPPORTED_PROTOTYPE",path:m,typeName:P.typeName,message:`PointInstancer prototype subtree contains no Mesh (${Rt})`}):W?ie(u,{severity:"error",code:"POINT_INSTANCER_INCONSISTENT_ARRAYS",path:m,typeName:P.typeName,message:`PointInstancer arrays have inconsistent lengths at ${m}`}):Ke!==void 0&&ie(u,{severity:"error",code:"POINT_INSTANCER_INVALID_INDEX",path:m,typeName:P.typeName,message:`PointInstancer has invalid prototype index (${Ke}) at ${m}`}),!(Ve!==void 0||Rt!==void 0||W||Ke!==void 0)){let Ge=s.getLocalToWorldTransform(m),_e=Dt.xforms.map(Os=>[...L(Os,Ge)]);_e.some(Os=>!ma(Os))?ie(u,{severity:"error",code:"INVALID_TRANSFORM",path:m,typeName:P.typeName,message:`PointInstancer produced a non-finite transform at ${m}`}):c.push({path:m,prototypes:[...U],protoIndices:[...Dt.protoIndices],instanceWorldMatrices:_e,visible:ze.computeVisibility(n,m,r)!=="invisible"})}continue}let b,S="none",x="rightHanded",v=[],T="edgeAndCorner",w="cornersPlus1",D="catmullClark",G=[],_=[],k=[],E=[],q=[],ae;if(P.typeName==="Mesh"){let U=Pf(B(P,"primvars:normals",r)),Y=U.length>0?U:Pf(B(P,"normals",r));b={points:Pf(B(P,"points",r)),faceVertexCounts:Wn(B(P,"faceVertexCounts",r)),faceVertexIndices:Wn(B(P,"faceVertexIndices",r)),...Y.length>0?{normals:Y}:{}};let le=Q_(P,m,b.points.length,b.faceVertexCounts.length,b.faceVertexIndices.length,u,r);le&&(b.uvs=le);let j=P.getAttr(U.length>0?"primvars:normals":"normals")?.getField("interpolation"),H=Y.length===b.points.length?"vertex":Y.length===b.faceVertexIndices.length?"faceVarying":Y.length===b.faceVertexCounts.length?"uniform":Y.length===1?"constant":"vertex";ae=Vs(j,["constant","uniform","varying","vertex","faceVarying"],H),S=Vs(B(P,"subdivisionScheme"),["catmullClark","none","loop","bilinear"],"catmullClark"),x=Vs(B(P,"orientation"),["rightHanded","leftHanded"],"rightHanded"),v=Wn(B(P,"holeIndices",r)),T=Vs(B(P,"interpolateBoundary"),["none","edgeOnly","edgeAndCorner"],"edgeAndCorner"),w=Vs(B(P,"faceVaryingLinearInterpolation"),["none","cornersOnly","cornersPlus1","cornersPlus2","boundaries","all"],"cornersPlus1"),D=Vs(B(P,"triangleSubdivisionRule"),["catmullClark","smooth"],"catmullClark"),G=Wn(B(P,"creaseIndices",r)),_=Wn(B(P,"creaseLengths",r)),k=Wn(B(P,"creaseSharpnesses",r)),E=Wn(B(P,"cornerIndices",r)),q=Wn(B(P,"cornerSharpnesses",r));let Dt=b.faceVertexCounts.length,Ke=_.reduce((W,jr)=>W+Math.max(0,jr-1),0),Ve=_.some(W=>!Number.isInteger(W)||W<2)||_.reduce((W,jr)=>W+jr,0)!==G.length||G.some(W=>!Number.isInteger(W)||W<0||W>=b.points.length)||![0,_.length,Ke].includes(k.length)||k.some(W=>!Number.isFinite(W)||W<0)||E.length!==q.length||E.some(W=>!Number.isInteger(W)||W<0||W>=b.points.length)||q.some(W=>!Number.isFinite(W)||W<0),Rt=S==="loop"&&b.faceVertexCounts.some(W=>W!==3);(v.some(W=>!Number.isInteger(W)||W<0||W>=Dt)||Ve||Rt)&&(ie(u,{severity:"error",code:"INVALID_MESH_TOPOLOGY",path:m,typeName:"Mesh",message:`Mesh has invalid holes, subdivision tags, or Loop faces at ${m}`}),b=void 0),b&&!Y_(m,b,u,ae)&&(b=void 0)}else if(P.typeName==="Sphere"){let U=B(P,"radius",r)??1;!Number.isFinite(U)||U<=0?ie(u,{severity:"error",code:"INVALID_MESH_VALUE",path:m,typeName:P.typeName,message:`Sphere radius must be finite and positive at ${m}`}):b=jb(U)}if(!b){P.typeName!=="Mesh"&&P.typeName!=="Sphere"&&!q_.has(P.typeName)&&u.push({severity:e.unsupported==="error"?"error":"warning",code:"UNSUPPORTED_PRIM_TYPE",path:m,typeName:P.typeName,message:`Unsupported USD prim type "${P.typeName}" at ${m}`});continue}let se=[...s.getLocalToWorldTransform(m)];if(!ma(se)){ie(u,{severity:"error",code:"INVALID_TRANSFORM",path:m,typeName:P.typeName,message:`Prim has a non-finite world transform at ${m}`});continue}let N=Zl(n,m,u,r),X=P.typeName==="Mesh"?X_(n,m,b.faceVertexCounts.length,u,r):[],ce=K_(n,m);o.push({path:m,sourceType:P.typeName,...b,...N?{material:N}:{},...X.length>0?{materialSubsets:X}:{},...ae?{normalsInterpolation:ae}:{},subdivisionScheme:S,orientation:x,holeIndices:v,interpolateBoundary:T,faceVaryingLinearInterpolation:w,triangleSubdivisionRule:D,creaseIndices:G,creaseLengths:_,creaseSharpnesses:k,cornerIndices:E,cornerSharpnesses:q,...ce!==void 0?{doubleSided:ce}:{},worldMatrix:se,visible:ze.computeVisibility(n,m,r)!=="invisible"})}let f=[...new Set(c.flatMap(m=>m.prototypes))].sort().map(m=>{let P=De(s.getLocalToWorldTransform(m));return{path:m,components:o.filter(b=>Kb(b.path,m)).map(b=>({meshPath:b.path,prototypeRelativeMatrix:[...L(b.worldMatrix,P)],visible:b.visible}))}}),h=new Set(f.filter(m=>m.components.length===0).map(m=>m.path));for(let m of c)for(let P of m.prototypes)h.has(P)&&ie(u,{severity:"error",code:"POINT_INSTANCER_UNSUPPORTED_PROTOTYPE",path:m.path,typeName:"PointInstancer",message:`PointInstancer prototype has no valid baked meshes (${P})`});let y=c.filter(m=>m.prototypes.every(P=>!h.has(P))),g=f.filter(m=>!h.has(m.path));if(e.unsupported==="error")for(let m of u)m.code.includes("UNSUPPORTED")&&(m.severity="error");if(u.sort((m,P)=>m.path.localeCompare(P.path)||m.code.localeCompare(P.code)||m.message.localeCompare(P.message)),e.unsupported==="error"&&u.some(m=>m.severity==="error"))throw new xf(u);return{compilation:{root:t,...r!==void 0?{time:r}:{},unsupported:i},stage:{upAxis:cf(n),metersPerUnit:lf(n),timeCodesPerSecond:n.timeCodesPerSecond,...n.startTimeCode!==void 0?{startTimeCode:n.startTimeCode}:{},...n.endTimeCode!==void 0?{endTimeCode:n.endTimeCode}:{}},meshes:o,lights:a,prototypes:g,pointInstancers:y,...l.length?{volumes:l}:{},diagnostics:u}}var Z_=["inputs:width","inputs:height","inputs:normalize","inputs:intensity","inputs:color","inputs:exposure","inputs:colorTemperature","inputs:enableColorTemperature"],J_=["protoIndices","ids","positions","orientations","scales","invisibleIds"];function ga(n,e,t){let r=n.getPrim(e)?.getAttr(t);return!!r&&r.getTimeSampleKeys().length>0}function eI(n,e){let t=n.getPrim(e)?.getAttr("xformOpOrder")?.getValue();return t?t.some(r=>!r.startsWith("!")&&ga(n,e,r)):!1}function tI(n,e,t){let r=n.getPrim(e)?.getAttr("primvars:displayColor")?.getValueAtTime(t);if(!Array.isArray(r)||!Array.isArray(r[0]))return;let i=r[0].slice(0,3);if(!(i.length<3||!i.every(s=>typeof s=="number"&&Number.isFinite(s))))return i}function nI(n,e,t){let r=n.getPrim(e)?.getAttr("primvars:displayOpacity")?.getValueAtTime(t),i=Array.isArray(r)?r[0]:r;return typeof i=="number"&&Number.isFinite(i)?i:void 0}function Af(n,e,t={}){return t.discovery?Qb(n,e,[],t,t.discovery.getMembership(n)):qb(n,e,n.traverse(),t)}function qb(n,e,t,r={}){return Qb(n,e,t,r)}function Qb(n,e,t,r,i){let s=new Set(r.forceDynamic??[]),o=new Set(r.forceMaterial??[]),a=(_,k)=>_===k||_.startsWith(`${k}/`),c=[...i?.xform??[]],l=[...i?.visibility??[]],u=[...i?.displayColor??[]],d=[...i?.displayOpacity??[]];if(i)for(let _ of s)i.paths.has(_)&&(c.push(_),l.push(_),u.push(_),d.push(_));let p=(_,k)=>i&&r.discovery?r.discovery.hasTimeSamples(n,_,k):ga(n,_,k);for(let _ of t){if(_.slice(_.lastIndexOf("/")+1).includes("."))continue;let k=s.has(_);(k||eI(n,_))&&c.push(_),(k||ga(n,_,"visibility"))&&l.push(_),(k||ga(n,_,"primvars:displayColor"))&&u.push(_),(k||ga(n,_,"primvars:displayOpacity"))&&d.push(_)}let f=new Set,h=new Set,y=new Set,g=new Set,m=new Set;for(let _ of e.meshes)c.some(k=>a(_.path,k))&&f.add(_.path),l.some(k=>a(_.path,k))&&h.add(_.path),u.includes(_.path)&&y.add(_.path),d.includes(_.path)&&g.add(_.path),o.has(_.path)&&m.add(_.path);let P=[...new Set([...f,...h,...y,...g,...m])],b=e.lights.filter(_=>s.has(_.path)||Z_.some(k=>p(_.path,k))||c.some(k=>a(_.path,k))||l.some(k=>a(_.path,k))).map(_=>_.path),S=new Map(e.lights.map(_=>[_.path,_])),x=e.pointInstancers.filter(_=>s.has(_.path)||J_.some(k=>p(_.path,k))||c.some(k=>a(_.path,k)||_.prototypes.some(E=>a(E,k)||a(k,E)))||l.some(k=>a(_.path,k)||_.prototypes.some(E=>a(E,k)||a(k,E)))),v=x.map(_=>_.path),T=new Map(x.map(_=>[_.path,_])),w=new Map(e.prototypes.map(_=>[_.path,_])),D=(e.volumes??[]).filter(_=>s.has(_.path)||l.some(k=>a(_.path,k))||c.some(k=>a(_.path,k)||a(_.density.path,k))||p(_.density.path,"filePath")||p(_.material.shaderPath,"inputs:extinction")||p(_.material.shaderPath,"inputs:albedo")),G=new hr(n);return{meshPaths:P,lightPaths:b,pointInstancerPaths:v,...D.length?{volumePaths:D.map(_=>_.path)}:{},sample(_){G.setTime(_),s.size>0&&G.clear();let k=P.map(N=>{let X=y.has(N)?tI(n,N,_):void 0,ce=g.has(N)?nI(n,N,_):void 0,U=m.has(N)?Zl(n,N,[],_):void 0;return{path:N,...f.has(N)?{worldMatrix:G.getLocalToWorldTransform(N)}:{},...h.has(N)?{visible:ze.computeVisibility(n,N,_)!=="invisible"}:{},...X?{displayColor:X}:{},...ce!==void 0?{displayOpacity:ce}:{},...U?{material:U}:{}}}),E=b.map(N=>{let{color:X,intensity:ce}=mr.computeBaseEmission(n.getPrim(N),_);return{path:N,type:S.get(N).type,color:X,intensity:ce,...S.get(N).type==="rect"?Yl(n.getPrim(N),_):{},worldMatrix:G.getLocalToWorldTransform(N),visible:ze.computeVisibility(n,N,_)!=="invisible"}}),q=[],ae=[];for(let N of v){let X=n.getPrim(N),ce=T.get(N);if(!X){ae.push({path:N,code:"INVALID_POINT_INSTANCER",message:`PointInstancer no longer exists at ${N}`});continue}let U=sn.computeInstanceTransforms(X,{time:_,applyMask:!0,includeProtoXform:!0,stage:n});if(U.protoIndices.length!==ce.protoIndices.length||U.protoIndices.some((j,H)=>j!==ce.protoIndices[H])){ae.push({path:N,code:"POINT_INSTANCER_TOPOLOGY_CHANGED",message:`PointInstancer instance count, mask, or prototype assignment changed at ${N}`});continue}let le=G.getLocalToWorldTransform(N),de=ce.prototypes.flatMap((j,H)=>{let Dt=w.get(j);if(!Dt)return[];let Ke=De(G.getLocalToWorldTransform(j));return Dt.components.map(Ve=>({prototypeIndex:H,meshPath:Ve.meshPath,prototypeRelativeMatrix:[...L(G.getLocalToWorldTransform(Ve.meshPath),Ke)],visible:ze.computeVisibility(n,Ve.meshPath,_)!=="invisible"}))});q.push({path:N,protoIndices:[...U.protoIndices],instanceWorldMatrices:U.xforms.map(j=>[...L(j,le)]),prototypeComponents:de,visible:ze.computeVisibility(n,N,_)!=="invisible"})}let se=[];for(let N of D){let X=n.getPrim(N.density.path),ce=(U,Y)=>JSON.stringify(U)===JSON.stringify(Y);!X||Ni.get(n,N.path)?.getFieldPath("density")!==N.density.path||!ce(G.getLocalToWorldTransform(N.path),N.worldMatrix)||!ce(G.getLocalToWorldTransform(N.density.path),N.density.worldMatrix)||jn.getFilePath(X,_)!==N.density.assetPath||jn.getFieldName(X)!==N.density.fieldName||jn.getFieldIndex(X)!==N.density.fieldIndex||!ce(Tf(n,N.path,_),N.material)?ae.push({path:N.path,code:"GRAPH_REBAKE_REQUIRED",message:"Static volume field, transform or material changed; prepare a fresh volume and renderer"}):se.push({path:N.path,visible:ze.computeVisibility(n,N.path,_)!=="invisible"})}return{meshes:k,lights:E,pointInstancers:q,...se.length?{volumes:se}:{},rebakeReasons:ae}}}}var Xb={Plugins:[{Info:{SdfMetadata:{weight:{appliesTo:["attributes"],default:0,displayGroup:"BlendShape",documentation:"The weight value at which an inbeteen shape is applied.",type:"float"}},Types:{UsdSkelAnimation:{alias:{UsdSchemaBase:"SkelAnimation"},autoGenerated:!0,bases:["UsdTyped"],schemaIdentifier:"SkelAnimation",schemaKind:"concreteTyped"},UsdSkelBindingAPI:{alias:{UsdSchemaBase:"SkelBindingAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"SkelBindingAPI",schemaKind:"singleApplyAPI"},UsdSkelBlendShape:{alias:{UsdSchemaBase:"BlendShape"},autoGenerated:!0,bases:["UsdTyped"],schemaIdentifier:"BlendShape",schemaKind:"concreteTyped"},UsdSkelRoot:{alias:{UsdSchemaBase:"SkelRoot"},autoGenerated:!0,bases:["UsdGeomBoundable"],implementsComputeExtent:!0,schemaIdentifier:"SkelRoot",schemaKind:"concreteTyped"},UsdSkelSkeleton:{alias:{UsdSchemaBase:"Skeleton"},autoGenerated:!0,bases:["UsdGeomBoundable"],implementsComputeExtent:!0,schemaIdentifier:"Skeleton",schemaKind:"concreteTyped"}}},LibraryPath:"@PLUG_INFO_LIBRARY_PATH@",Name:"usdSkel",ResourcePath:"@PLUG_INFO_RESOURCE_PATH@",Root:"@PLUG_INFO_ROOT@",Type:"library"}]},Yb=`#usda 1.0
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

`;te.GetInstance().RegisterPlugins(Xb,{usdSkel:{"generatedSchema.usda":Yb}});function rI(n){let e=[],t=n;for(;;){let r=t.lastIndexOf("/");if(r<=0){r===0&&t.length>1&&e.push("/");break}t=t.slice(0,r),e.push(t)}return e}function Zb(n){let e=new Map;for(let r=0;r<n.length;r++)e.set(n[r],r);let t=new Int32Array(n.length).fill(-1);for(let r=0;r<n.length;r++)for(let i of rI(n[r])){let s=e.get(i);if(s!==void 0){t[r]=s;break}}return t}var ya=class{_parentIndices;constructor(e){e instanceof Int32Array?this._parentIndices=e:e.length>0&&typeof e[0]=="number"?this._parentIndices=new Int32Array(e):this._parentIndices=Zb(e)}get size(){return this._parentIndices.length}getNumJoints(){return this.size}getParentIndices(){return this._parentIndices}getParent(e){return this._parentIndices[e]??-1}isRoot(e){return this.getParent(e)<0}validate(){for(let e=0;e<this.size;e++){let t=this._parentIndices[e];if(t>=0&&t>=e)return t===e?{valid:!1,reason:`Joint ${e} has itself as its parent.`}:{valid:!1,reason:`Joint ${e} has mis-ordered parent ${t}. Joints are expected to be ordered with parent joints always coming before children.`}}return{valid:!0}}};var zr=class{_targetSize;_offset=0;_flags=0;_indexMap=new Int32Array(0);_mappedCount=0;constructor(e,t){if(typeof e=="number"){this._targetSize=e,this._flags=7;return}let r=e,i=t??[];if(this._targetSize=i.length,r.length===0||i.length===0){this._flags=0;return}let s=i.indexOf(r[0]);if(s>=0&&s+r.length<=i.length){let l=!0;for(let u=0;u<r.length;u++)if(r[u]!==i[s+u]){l=!1;break}if(l){this._offset=s,this._flags=3,s===0&&r.length===i.length&&(this._flags|=4);return}}let o=new Map;for(let l=0;l<i.length;l++)o.set(i[l],l);this._indexMap=new Int32Array(r.length);let a=new Set,c=0;for(let l=0;l<r.length;l++){let u=o.get(r[l]);u!==void 0?(this._indexMap[l]=u,a.add(u),c++):this._indexMap[l]=-1}if(this._mappedCount=c,c===0){this._flags=0,this._indexMap=new Int32Array(0);return}this._flags=8,c===r.length&&(this._flags|=2),a.size===i.length&&(this._flags|=4)}get size(){return this._targetSize}isIdentity(){return(this._flags&1)!==0&&(this._flags&4)!==0&&this._offset===0}isSparse(){return(this._flags&4)===0}isNull(){return this._flags===0}remap(e,t,r=1,i){if(r<=0)throw new Error(`invalid elementSize ${r}`);let s=new Array(this._targetSize*r);for(let o=0;o<s.length;o++){let a=t?.[o];s[o]=a!==void 0?a:i}if(this.isNull())return s;if((this._flags&1)!==0){let o=Math.min(e.length,(this._targetSize-this._offset)*r);for(let a=0;a<o;a++)s[this._offset*r+a]=e[a];return s}for(let o=0;o<this._indexMap.length;o++){let a=this._indexMap[o];if(!(a<0))for(let c=0;c<r;c++){let l=e[o*r+c];l!==void 0&&(s[a*r+c]=l)}}return s}};function ba(n,e,t){let i=[...yn(e[0],e[1],e[2],e[3])];for(let s=0;s<3;s++)i[0+s]=i[0+s]*(t[0]??1),i[4+s]=i[4+s]*(t[1]??1),i[8+s]=i[8+s]*(t[2]??1);return i[12]=n[0]??0,i[13]=n[1]??0,i[14]=n[2]??0,i}function eu(n,e,t){if(e.length!==n.size)throw new Error(`Size of jointLocalXforms [${e.length}] != number of joints [${n.size}]`);let r=new Array(n.size);for(let i=0;i<n.size;i++){let s=n.getParent(i);if(s>=0){if(s>=i)throw new Error(`Joint ${i} has mis-ordered parent ${s}.`);r[i]=L(e[i],r[s])}else r[i]=t?L(e[i],t):e[i]}return r}function Pa(n,e){if(e<0)return!1;let t=[...n];n.length=0;for(let r=0;r<e;r++)n.push(...t);return!0}function tu(n,e,t,r,i,s){let o=Math.floor(s.length/3),a=new Float32Array(o*3),c=t.length===i&&o*i!==i;for(let l=0;l<o;l++){let[u,d,p]=Jt(n,s[l*3],s[l*3+1],s[l*3+2]),f=0,h=0,y=0;for(let g=0;g<i;g++){let m=c?g:l*i+g,P=t[m];if(P<0||P>=e.length)throw new Error(`Out of range joint index ${P} at index ${m} (num joints = ${e.length}).`);let b=r[m];if(b===0)continue;let[S,x,v]=Jt(e[P],u,d,p);f+=S*b,h+=x*b,y+=v*b}a[l*3]=f,a[l*3+1]=h,a[l*3+2]=y}return a}function iI(n){let e=Jo(n),t=Lr(e),r=new ws(new Ue(t[0],t[1],t[2],t[3]),[n[12],n[13],n[14]]),i=[...e];i[12]=n[12],i[13]=n[13],i[14]=n[14];let s=L(n,De(i)),o=[0,1,2,4,5,6,8,9,10].some(a=>Math.abs(s[a]-(a===0||a===5||a===10?1:0))>1e-6);return{dualQuat:r,scale:s,hasScale:o}}function vf(n,e,t,r,i,s){let o=Math.floor(s.length/3),a=new Float32Array(o*3),c=t.length===i&&o>1;if(t.length!==r.length||!c&&t.length!==o*i)throw new Error("Joint influence array size does not match points");let l=e.map(iI),u=l.some(d=>d.hasScale);for(let d=0;d<o;d++){let p=Jt(n,s[d*3],s[d*3+1],s[d*3+2]),f=-1,h=-1/0;for(let b=0;b<i;b++){let S=c?b:d*i+b,x=t[S];if(x<0||x>=l.length)throw new Error(`Out of range joint index ${x} at index ${S}`);let v=r[S];v>h&&(h=v,f=x)}let y=l[f].dualQuat.GetReal(),g=ws.GetZero(),m=[0,0,0];for(let b=0;b<i;b++){let S=c?b:d*i+b,x=l[t[S]],v=r[S];if(v!==0){if(u){let T=Jt(x.scale,p[0],p[1],p[2]);m[0]+=T[0]*v,m[1]+=T[1]*v,m[2]+=T[2]*v}lr(x.dualQuat.GetReal(),y)<0&&(v=-v),g=g.Add(x.dualQuat.GetScaled(v))}}g.Normalize();let P=g.Transform(u?m:p).data;a[d*3]=P[0],a[d*3+1]=P[1],a[d*3+2]=P[2]}return a}function Jb(n,e,t,r){let i=De(n),s=e*i[0]+t*i[1]+r*i[2],o=e*i[4]+t*i[5]+r*i[6],a=e*i[8]+t*i[9]+r*i[10],c=Math.hypot(s,o,a);return c>0?[s/c,o/c,a/c]:[0,0,0]}function eP(n){let e=De(n);return[e[0],e[4],e[8],0,e[1],e[5],e[9],0,e[2],e[6],e[10],0,0,0,0,1]}function tP(n,e){return[e[0]*n[0]+e[1]*n[4]+e[2]*n[8],e[0]*n[1]+e[1]*n[5]+e[2]*n[9],e[0]*n[2]+e[1]*n[6]+e[2]*n[10]]}function _f(n,e,t,r,i,s,o){let a=eP(n),c=e.map(f=>{let h=eP(f),y=Jo(h),g=Lr(y),m=L(h,De(y)),P=[0,1,2,4,5,6,8,9,10].some(b=>Math.abs(m[b]-(b===0||b===5||b===10?1:0))>1e-6);return{quat:new Ue(g[0],g[1],g[2],g[3]),scale:m,hasScale:P}}),l=c.some(f=>f.hasScale),u=Math.floor(s.length/3),d=t.length===i,p=new Float32Array(u*3);for(let f=0;f<u;f++){let h=o?o[f]:f,y=tP(a,[s[f*3],s[f*3+1],s[f*3+2]]),g=-1,m=-1/0;for(let T=0;T<i;T++){let w=d?T:h*i+T,D=r[w];D>m&&(m=D,g=t[w])}let P=c[g].quat,b=Ue.GetZero(),S=[0,0,0];for(let T=0;T<i;T++){let w=d?T:h*i+T,D=c[t[w]],G=r[w];if(G!==0){if(l){let _=tP(D.scale,y);S[0]+=_[0]*G,S[1]+=_[1]*G,S[2]+=_[2]*G}lr(D.quat,P)<0&&(G=-G),b=b.Add(D.quat.GetScaled(G))}}b.Normalize();let x=b.Transform(new I(...l?S:y)).data,v=Math.hypot(x[0],x[1],x[2]);v>0&&(p[f*3]=x[0]/v,p[f*3+1]=x[1]/v,p[f*3+2]=x[2]/v)}return p}function Sa(n,e,t,r,i,s,o){let a=Math.floor(s.length/3),c=new Float32Array(a*3),l=t.length===i;for(let u=0;u<a;u++){let d=o?o[u]:u,p=Jb(n,s[u*3],s[u*3+1],s[u*3+2]),f=0,h=0,y=0;for(let m=0;m<i;m++){let P=l?m:d*i+m,b=t[P];if(b<0||b>=e.length)throw new Error(`Out of range joint index ${b} at index ${P}`);let S=Jb(e[b],...p),x=r[P];f+=S[0]*x,h+=S[1]*x,y+=S[2]*x}let g=Math.hypot(f,h,y);g>0&&(f/=g,h/=g,y/=g),c[u*3]=f,c[u*3+1]=h,c[u*3+2]=y}return c}function If(n,e,t,r){if(Math.abs(n)<=1e-6)return!0;let i=Math.floor(r.length/3);if(t.length===0){if(e.length!==i)return!1;for(let s=0;s<i;s++){let o=e[s];r[s*3]=(r[s*3]??0)+o[0]*n,r[s*3+1]=(r[s*3+1]??0)+o[1]*n,r[s*3+2]=(r[s*3+2]??0)+o[2]*n}return!0}if(e.length!==t.length)return!1;for(let s=0;s<t.length;s++){let o=t[s];if(o<0||o>=i)return!1;let a=e[s];r[o*3]=(r[o*3]??0)+a[0]*n,r[o*3+1]=(r[o*3+1]??0)+a[1]*n,r[o*3+2]=(r[o*3+2]??0)+a[2]*n}return!0}function Ta(n,e,t){let r=C(n,e,t);return Array.isArray(r)?r.filter(i=>typeof i=="string"):[]}function nu(n,e,t){let r=C(n,e,t);return Array.isArray(r)?r.map(Number):[]}function Gs(n,e,t){let r=C(n,e,t);return Array.isArray(r)?r:[]}function nP(n,e,t){let r=C(n,e,t);return Array.isArray(r)?r.map(i=>Array.isArray(i[0])?i.flat():i):[]}var Hr=class n extends Un{static typeName="Skeleton";static define(e,t){return new n(e.definePrim(t,n.typeName),e)}static is(e){return e.typeName===n.typeName}getJointsAttr(){return this._attr("joints","uniform token[]")}getJointNamesAttr(){return this._attr("jointNames","uniform token[]")}getBindTransformsAttr(){return this._attr("bindTransforms","uniform matrix4d[]")}getRestTransformsAttr(){return this._attr("restTransforms","uniform matrix4d[]")}static getJoints(e){return Ta(e,"joints")}static getBindTransforms(e){return nP(e,"bindTransforms")}static getRestTransforms(e){return nP(e,"restTransforms")}},ft=class n extends dt{static typeName="SkelAnimation";static define(e,t){return new n(e.definePrim(t,n.typeName),e)}static is(e){return e.typeName===n.typeName}getJointsAttr(){return this._attr("joints","uniform token[]")}getTranslationsAttr(){return this._attr("translations","float3[]")}getRotationsAttr(){return this._attr("rotations","quatf[]")}getScalesAttr(){return this._attr("scales","half3[]")}getBlendShapesAttr(){return this._attr("blendShapes","uniform token[]")}getBlendShapeWeightsAttr(){return this._attr("blendShapeWeights","float[]")}static getJoints(e){return Ta(e,"joints")}static getTranslations(e,t){return Gs(e,"translations",t)}static getRotations(e,t){let r=C(e,"rotations",t);return Array.isArray(r)?r.map(i=>Ur(i)):[]}static getScales(e,t){return Gs(e,"scales",t)}static getBlendShapes(e){return Ta(e,"blendShapes")}static getBlendShapeWeights(e,t){return nu(e,"blendShapeWeights",t)}},be=class n extends ve{static apply(e,t){let r=e.definePrim(t);return r.applyAPI("SkelBindingAPI"),new n(r,e)}createSkeletonRel(e){return this.prim.createRel("skel:skeleton",[e])}createAnimationSourceRel(e){return this.prim.createRel("skel:animationSource",[e])}getJointIndicesAttr(){return this._attr("primvars:skel:jointIndices","int[]")}getJointWeightsAttr(){return this._attr("primvars:skel:jointWeights","float[]")}getGeomBindTransformAttr(){return this._attr("primvars:skel:geomBindTransform","matrix4d")}getJointsAttr(){return this._attr("skel:joints","uniform token[]")}getSkinningMethodAttr(){return this._attr("primvars:skel:skinningMethod","token")}getBlendShapesAttr(){return this._attr("skel:blendShapes","uniform token[]")}getBlendShapeTargetsRel(){return this._rel("skel:blendShapeTargets")}createJointIndicesPrimvar(e=!0,t=1){let r=this.getJointIndicesAttr();return r.setMetadata("interpolation",e?"constant":"vertex"),r.setMetadata("elementSize",t),r}createJointWeightsPrimvar(e=!0,t=1){let r=this.getJointWeightsAttr();return r.setMetadata("interpolation",e?"constant":"vertex"),r.setMetadata("elementSize",t),r}setRigidJointInfluence(e,t=1){return this.createJointIndicesPrimvar(!0,1).set([e]),this.createJointWeightsPrimvar(!0,1).set([t]),!0}static getSkeletonTarget(e){return e.getAttr("skel:skeleton")?.getTargets()[0]}static getAnimationSourceTarget(e){return e.getAttr("skel:animationSource")?.getTargets()[0]}static getJointIndices(e,t){return nu(e,"primvars:skel:jointIndices",t)}static getJointWeights(e,t){return nu(e,"primvars:skel:jointWeights",t)}static getNumInfluencesPerPoint(e){let t=e.getAttr("primvars:skel:jointIndices")?.getField("elementSize");return typeof t=="number"&&t>0?t:1}static getSkinningMethod(e){let t=e.path;for(;t!=="/";){let r=e.getStage().getPrim(t);if(r){let s=r.getAttr("primvars:skel:skinningMethod");if(s?.hasAuthoredValue())return s.getValue()==="dualQuaternion"?"dualQuaternion":"classicLinear"}let i=t.lastIndexOf("/");t=i<=0?"/":t.slice(0,i)}return"classicLinear"}static getBlendShapeOrder(e){return Ta(e,"skel:blendShapes")}static getBlendShapeTargets(e){return e.getAttr("skel:blendShapeTargets")?.getTargets()??[]}static getGeomBindTransform(e,t){let r=C(e,"primvars:skel:geomBindTransform",t);if(!Array.isArray(r))return;let i=Array.isArray(r[0])?r.flat():r;return i.length===16?i:void 0}static getJointOrder(e){let t=Ta(e,"skel:joints");return t.length>0?t:void 0}},xa="inbetweens:",wf=":normalOffsets",Vi=class{constructor(e,t){this.prim=e;this.name=t}get attrName(){return this.name}getAttr(){return this.prim.getAttr(this.attrName)}static isInbetween(e){return e.startsWith(xa)&&!e.endsWith(wf)}getWeight(){let e=this.prim.getAttr(this.attrName)?.getField("weight");return typeof e=="number"?e:void 0}hasAuthoredWeight(){return typeof this.prim.getAttr(this.attrName)?.getField("weight")=="number"}setWeight(e){return this.getAttr().setMetadata("weight",e),!0}getOffsets(){return Gs(this.prim,this.attrName)}setOffsets(e){return this.getAttr().set(e),!0}getNormalOffsets(){return Gs(this.prim,`${this.attrName}${wf}`)}createNormalOffsetsAttr(e){let t=`${this.attrName}${wf}`;this.prim.getStage().declareProperty(this.prim.path,t,"vector3f[]");let r=this.prim.attr(t);return e!==void 0&&r.set(e),r}setNormalOffsets(e){return this.createNormalOffsetsAttr().set(e),!0}},gr=class n extends ve{static typeName="BlendShape";static define(e,t){return new n(e.definePrim(t,n.typeName),e)}static is(e){return e.typeName===n.typeName}getOffsetsAttr(){return this._attr("offsets","uniform vector3f[]")}getNormalOffsetsAttr(){return this._attr("normalOffsets","uniform vector3f[]")}getPointIndicesAttr(){return this._attr("pointIndices","uniform int[]")}static getOffsets(e){return Gs(e,"offsets")}static getNormalOffsets(e){return Gs(e,"normalOffsets")}static getPointIndices(e){return nu(e,"pointIndices")}createInbetween(e){let t=e.startsWith(xa)?e:`${xa}${e}`;return this.stage.declareProperty(this.path,t,"uniform point3f[]"),new Vi(this.prim,t)}getInbetween(e){let t=e.startsWith(xa)?e:`${xa}${e}`;return this.prim.getAttr(t)?new Vi(this.prim,t):void 0}hasInbetween(e){return this.getInbetween(e)!==void 0}static getInbetweens(e){return e.attrNames.filter(Vi.isInbetween).map(t=>new Vi(e,t))}};var rP=1e-6;function ru(n,e,t=rP){return Math.abs(n-e)<=t}function kf(n){return n.inbetweenIndex>=0}function iu(n){return n.weight===0}var Aa=class{_prim;_subShapes=[];_blendShapes=[];_inbetweens=[];_primaryOffsets=[];_primaryNormalOffsets=[];_pointIndices=[];constructor(e){if(Array.isArray(e)){this._prim=void 0,this._initFromResolved(e);return}let{prim:t,stage:r}=e,s=(t.getAttr("skel:blendShapeTargets")?.getTargets()??[]).map(o=>{let a=r.getPrim(o);if(!a||!gr.is(a))return{offsets:[],inactive:!0};if(!a.isActive)return{offsets:[],inactive:!0};let c=[];for(let l of gr.getInbetweens(a)){let u=l.getWeight();u!==void 0&&c.push({weight:u,offsets:l.getOffsets(),normalOffsets:l.getNormalOffsets()})}return{offsets:gr.getOffsets(a),pointIndices:gr.getPointIndices(a),normalOffsets:gr.getNormalOffsets(a),inbetweens:c}});this._prim=t,this._initFromResolved(s)}_initFromResolved(e){for(let t=0;t<e.length;t++){let r=e[t],i={prim:void 0,firstSubShape:this._subShapes.length,numSubShapes:0};if(this._primaryOffsets[t]=r.offsets??[],this._primaryNormalOffsets[t]=r.normalOffsets??[],this._pointIndices[t]=r.pointIndices??[],r.inactive){this._blendShapes[t]=i;continue}this._subShapes.push({blendShapeIndex:t,inbetweenIndex:-1,weight:1}),this._subShapes.push({blendShapeIndex:t,inbetweenIndex:-1,weight:0});for(let c of r.inbetweens??[]){let l=c.weight;if(ru(l,0)||ru(l,1))continue;let u=this._inbetweens.length;this._subShapes.push({blendShapeIndex:t,inbetweenIndex:u,weight:l}),this._inbetweens.push(c)}i.numSubShapes=this._subShapes.length-i.firstSubShape;let s=i.firstSubShape,o=s+i.numSubShapes,a=this._subShapes.slice(s,o).sort((c,l)=>c.weight-l.weight);for(let c=0;c<a.length;c++)this._subShapes[s+c]=a[c];this._blendShapes[t]=i}}isValid(){return this._prim!==void 0}getPrim(){return this._prim}getNumBlendShapes(){return this._blendShapes.length}getNumSubShapes(){return this._subShapes.length}getBlendShapeIndex(e){return e<this._subShapes.length?this._subShapes[e].blendShapeIndex:0}getInbetween(e){let t=this._subShapes[e];if(t&&kf(t))return this._inbetweens[t.inbetweenIndex]}computeBlendShapePointIndices(){return this._blendShapes.map((e,t)=>this._pointIndices[t]??[])}computeSubShapePointOffsets(){return this._subShapes.map(e=>kf(e)?this._inbetweens[e.inbetweenIndex].offsets:iu(e)?[]:this._primaryOffsets[e.blendShapeIndex]??[])}computeSubShapeNormalOffsets(){return this._subShapes.map(e=>kf(e)?this._inbetweens[e.inbetweenIndex].normalOffsets??[]:iu(e)?[]:this._primaryNormalOffsets[e.blendShapeIndex]??[])}computeSubShapeWeights(e){if(e.length!==this._blendShapes.length)return null;let t=[],r=[],i=[];for(let s=0;s<e.length;s++){let o=this._blendShapes[s];if(o.numSubShapes<3){if(o.numSubShapes!==2)continue;t.push(e[s]),r.push(s),i.push(o.firstSubShape+1);continue}let a=e[s],c=o.firstSubShape,l=c+o.numSubShapes,u=l;for(let g=c;g<l;g++)if(a<this._subShapes[g].weight){u=g;break}let d,p;u!==l?u>c?(d=u-1,p=u):(d=c,p=c+1):(d=l-2,p=l-1);let f=this._subShapes[d],h=this._subShapes[p],y=h.weight-f.weight;if(y>rP){let g=(a-f.weight)/y;!iu(f)&&!ru(g,1)&&(t.push(1-g),r.push(s),i.push(d)),!iu(h)&&!ru(g,0)&&(t.push(g),r.push(s),i.push(p))}}return{subShapeWeights:t,blendShapeIndices:r,subShapeIndices:i}}computeFlattenedSubShapeWeights(e){let t=this.computeSubShapeWeights(e);if(!t)return null;let r=new Array(this._subShapes.length).fill(0);for(let i=0;i<t.subShapeWeights.length;i++){let s=t.subShapeIndices[i];s<r.length&&(r[s]=t.subShapeWeights[i])}return r}computeDeformedPoints(e,t,r,i,s,o){if(t.length!==e.length||r.length!==e.length)return!1;for(let a=0;a<e.length;a++){let c=t[a];if(c>=i.length)return!1;let l=r[a];if(l>=s.length)return!1;let u=s[l];if(u.length!==0&&!If(e[a],u,i[c],o))return!1}return!0}computeDeformedNormals(e,t,r,i,s,o){if(!this.computeDeformedPoints(e,t,r,i,s,o))return!1;for(let a=0;a+2<o.length;a+=3){let c=o[a],l=o[a+1],u=o[a+2],d=Math.hypot(c,l,u);d>0&&(o[a]=c/d,o[a+1]=l/d,o[a+2]=u/d)}return!0}};var su=class{constructor(e){this.prim=e}getJointOrder(){return ft.getJoints(this.prim)}getBlendShapeOrder(){return ft.getBlendShapes(this.prim)}jointTransformsMightBeTimeVarying(){return["translations","rotations","scales"].some(e=>(this.prim.getAttr(e)?.getTimeSampleKeys().length??0)>0)}getJointTransformTimeSamples(){let e=new Set;for(let t of["translations","rotations","scales"])for(let r of this.prim.getAttr(t)?.getTimeSampleKeys()??[])e.add(r);return[...e].sort((t,r)=>t-r)}computeJointLocalTransforms(e){let t=ft.getTranslations(this.prim,e),r=ft.getRotations(this.prim,e),i=ft.getScales(this.prim,e);return r.length===0||t.length>0&&t.length!==r.length||i.length>0&&i.length!==r.length?[]:r.map((s,o)=>ba(t[o]??[0,0,0],s,i[o]??[1,1,1]))}computeBlendShapeWeights(e){return ft.getBlendShapeWeights(this.prim,e)}},Ms=class{prim;topology;joints;_restTransforms;_inverseBindTransforms;_animPrim;_animMapper;_animQuery;constructor(e,t){if(this.prim=e,this.joints=Hr.getJoints(e),this.topology=new ya(this.joints),this._restTransforms=Hr.getRestTransforms(e),this._inverseBindTransforms=Hr.getBindTransforms(e).map(r=>De(r)),this._animPrim=t,this._animQuery=t?new su(t):void 0,t){let r=ft.getJoints(t);this._animMapper=r.length>0?new zr(r,this.joints):new zr(this.joints.length)}}get numJoints(){return this.topology.size}getAnimQuery(){return this._animQuery}hasBindPose(){return this._inverseBindTransforms.length===this.numJoints}hasRestPose(){return this._restTransforms.length===this.numJoints}computeJointLocalTransforms(e,t=!1){let r=this.hasRestPose()?this._restTransforms:new Array(this.numJoints).fill([...Se]);if(t||!this._animPrim||!this._animMapper)return[...r];let i=ft.getTranslations(this._animPrim,e),s=ft.getRotations(this._animPrim,e),o=ft.getScales(this._animPrim,e);if(s.length===0)return[...r];let a=new Array(s.length);for(let c=0;c<s.length;c++)a[c]=ba(i[c]??[0,0,0],s[c],o[c]??[1,1,1]);return this._animMapper.remap(a,r,1,[...Se])}computeJointSkelTransforms(e,t=!1){return eu(this.topology,this.computeJointLocalTransforms(e,t))}computeJointRestRelativeTransforms(e){return this.computeJointLocalTransforms(e).map((r,i)=>L(r,De(this._restTransforms[i])))}computeJointWorldTransforms(e,t){return this.computeJointSkelTransforms(t).map(r=>L(r,e))}computeSkinningTransforms(e){if(!this.hasBindPose())throw new Error("Skeleton has no (or mismatched) bindTransforms");return this.computeJointSkelTransforms(e).map((r,i)=>L(this._inverseBindTransforms[i],r))}},va=class{prim;numInfluencesPerPoint;geomBindTransform;_jointIndices;_jointWeights;_jointMapper;skinningMethod;_interpolation;constructor(e,t){this.prim=e,this._jointIndices=be.getJointIndices(e),this._jointWeights=be.getJointWeights(e),this.numInfluencesPerPoint=be.getNumInfluencesPerPoint(e),this.geomBindTransform=be.getGeomBindTransform(e)??[...Se],this.skinningMethod=be.getSkinningMethod(e),this._interpolation=String(e.getAttr("primvars:skel:jointIndices")?.getField("interpolation")??"constant");let r=be.getJointOrder(e);this._jointMapper=r?new zr(t,r):null}hasInfluences(){let e=this.prim.getAttr("primvars:skel:jointIndices"),t=this.prim.getAttr("primvars:skel:jointWeights"),r=String(e?.getField("interpolation")??"constant"),i=String(t?.getField("interpolation")??"constant"),s=Number(e?.getField("elementSize")??1),o=Number(t?.getField("elementSize")??1);return this._jointIndices.length>0&&this._jointIndices.length===this._jointWeights.length&&r===i&&["constant","vertex"].includes(r)&&s>0&&s===o}hasJointInfluences(){return this.hasInfluences()}isRigidlyDeformed(){return this._interpolation==="constant"}getNumInfluencesPerComponent(){return this.numInfluencesPerPoint}getSkinningMethod(){return this.skinningMethod}computeJointInfluences(){if(!(!this.hasInfluences()||this._jointIndices.length%this.numInfluencesPerPoint!==0))return[[...this._jointIndices],[...this._jointWeights]]}computeVaryingJointInfluences(e){let t=this.computeJointInfluences();if(!t)return;let[r,i]=t;if(this.isRigidlyDeformed()&&(Pa(r,e),Pa(i,e)),r.length===e*this.numInfluencesPerPoint)return[r,i]}getInfluences(){return{jointIndices:this._jointIndices,jointWeights:this._jointWeights,numInfluencesPerPoint:this.numInfluencesPerPoint}}remapSkinningXforms(e){return this._jointMapper?this._jointMapper.remap(e,null,1,[...Se]):e}computeSkinnedPoints(e,t){return(this.skinningMethod==="dualQuaternion"?vf:tu)(this.geomBindTransform,this.remapSkinningXforms(e),this._jointIndices,this._jointWeights,this.numInfluencesPerPoint,t)}computeSkinnedNormals(e,t,r){return(this.skinningMethod==="dualQuaternion"?_f:Sa)(this.geomBindTransform,this.remapSkinningXforms(e),this._jointIndices,this._jointWeights,this.numInfluencesPerPoint,t,r)}computeExtentsPadding(e){if(e.length===0)return 0;let t=this.prim.getAttr("extent"),r=t?.getTimeSampleKeys()??[],i=r.length>0?t?.getValueAtTime(r[0]):t?.getValue();if(!Array.isArray(i)||i.length!==2||!Array.isArray(i[0])||!Array.isArray(i[1]))return 0;let s=[[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY],[Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY]];for(let d of e)ou(s,[d[12],d[13],d[14]]);let o=i[0],a=i[1],c=[];for(let d of[Number(o[0]),Number(a[0])])for(let p of[Number(o[1]),Number(a[1])])for(let f of[Number(o[2]),Number(a[2])])c.push(d,p,f);let l=[[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY],[Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY]];ou(l,c,this.geomBindTransform);let u=0;for(let d=0;d<3;d++)u=Math.max(u,s[0][d]-l[0][d],l[1][d]-s[1][d]);return u}getBlendShapeOrder(){return be.getBlendShapeOrder(this.prim)}hasBlendShapes(){return this.getBlendShapeOrder().length>0&&be.getBlendShapeTargets(this.prim).length>0}getBlendShapeMapper(e){return new zr(e,this.getBlendShapeOrder())}getBlendShapeQuery(){return new Aa({prim:this.prim,stage:this.prim.getStage()})}};function Df(n,e){let t=new Map,r=(i,s,o)=>{let a=n.getPrim(i);if(!a)return;let c=be.getSkeletonTarget(a)??s,l=be.getAnimationSourceTarget(a)??o;if(c&&(be.getJointIndices(a).length>0||be.getBlendShapeTargets(a).length>0)){let u=t.get(c)??{skinnedPrimPaths:[]};u.animationPath=u.animationPath??l,u.skinnedPrimPaths.push(i),t.set(c,u)}for(let u of n.getChildPrimPaths(i))r(u,c,l)};return r(e),[...t.entries()].map(([i,s])=>{let o=s.animationPath;if(!o){let a=n.getPrim(i);a&&(o=be.getAnimationSourceTarget(a))}return{skeletonPath:i,animationPath:o,skinnedPrimPaths:s.skinnedPrimPaths}})}function ou(n,e,t){for(let r=0;r+2<e.length;r+=3){let i=t?Jt(t,e[r],e[r+1],e[r+2]):[e[r],e[r+1],e[r+2]];for(let s=0;s<3;s++)n[0][s]=Math.min(n[0][s],i[s]),n[1][s]=Math.max(n[1][s],i[s])}}var sI=(n,e,t)=>{let r=n.getStage(),i=[[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY],[Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY]],s=!1;for(let o of Df(r,n.path)){let a=r.getPrim(o.skeletonPath);if(!a)continue;let c=o.animationPath??be.getAnimationSourceTarget(a),l=c?r.getPrim(c):void 0,u=new Ms(a,l);if(!u.hasBindPose())continue;let d=u.computeJointSkelTransforms(e),p=u.computeJointSkelTransforms(e,!0),f=d.flatMap(g=>[g[12],g[13],g[14]]),h=0,y=!1;for(let g of o.skinnedPrimPaths){let m=r.getPrim(g);if(!m)continue;let P=new va(m,u.joints);P.hasInfluences()&&(h=Math.max(h,P.computeExtentsPadding(p)),s=!0,y=!0)}if(y){let g=[];for(let m=0;m<f.length;m+=3){let P=f[m],b=f[m+1],S=f[m+2];g.push(P-h,b-h,S-h,P+h,b+h,S+h)}ou(i,g,t)}}return s?i:null},oI=(n,e,t)=>{let r=be.getAnimationSourceTarget(n),i=r?n.getStage().getPrim(r):void 0,s=new Ms(n,i),o=[[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY],[Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY]],a=s.computeJointSkelTransforms(e).flatMap(c=>[c[12],c[13],c[14]]);return a.length===0?null:(ou(o,a,t),o)};Bl("SkelRoot",sI);Bl("Skeleton",oI);var zt={DeformPointsWithSkinning:1,DeformNormalsWithSkinning:2,DeformXformWithSkinning:4,DeformPointsWithBlendShapes:8,DeformNormalsWithBlendShapes:16,DeformWithSkinning:7,DeformWithBlendShapes:24,DeformAll:31,ModifiesPoints:9,ModifiesNormals:18,ModifiesXform:4},au=class{static DeformPointsWithSkinning=zt.DeformPointsWithSkinning;static DeformNormalsWithSkinning=zt.DeformNormalsWithSkinning;static DeformXformWithSkinning=zt.DeformXformWithSkinning;static DeformPointsWithBlendShapes=zt.DeformPointsWithBlendShapes;static DeformNormalsWithBlendShapes=zt.DeformNormalsWithBlendShapes;static DeformWithSkinning=zt.DeformWithSkinning;static DeformWithBlendShapes=zt.DeformWithBlendShapes;static DeformAll=zt.DeformAll;static ModifiesPoints=zt.ModifiesPoints;static ModifiesNormals=zt.ModifiesNormals;static ModifiesXform=zt.ModifiesXform;deformationFlags=zt.DeformAll;saveLayers=!0;memoryLimit=0;updateExtents=!0;updateExtentHints=!0};var _a=class{constructor(e=[]){this._values=e}Get(e){if(!Number.isInteger(e)||e<0||e>=this._values.length)throw new RangeError(`ExecUsdCacheView: extraction index ${e} is not evaluated`);return this._values[e]}};var Ia=class{constructor(e,t,r,i){this._systemIdentity=e;this.valueKeys=t;this.valueCallback=r;this.timeCallback=i}_computedIndices=new Set;IsValid(){return this.valueKeys.length>0&&this.valueKeys.every(e=>!e.IsExpired())}};var Rf=new WeakMap;function Ef(n,e){let t=n.getPrim(e);return t!==void 0&&t.isActive&&t.isLoaded&&t.isDefined&&!t.isAbstract}function iP(n){let e=n.indexOf(".");return e<0?n:n.slice(0,e)}var Ls=class n{constructor(e){this._stage=e;this._populateConnectionTables(),e.onObjectsChanged(t=>this._didObjectsChanged(t))}_outgoing=new Map;_incoming=new Map;_listeners=new Set;static RegisterStage(e,t){let r=Rf.get(e);return r||(r=new n(e),Rf.set(e,r)),t&&r._listeners.add(t),r}Unregister(e){this._listeners.delete(e)}static GetStageData(e){let t=Rf.get(e);if(!t)throw new Error("EsfUsdStageData.GetStageData: stage is not registered");return t}static GetOutgoingConnections(e,t){let r=typeof t=="string"?t:t.pathString;return n.GetStageData(e)._getOutgoingConnections(r).map(V.fromString)}static GetIncomingConnections(e,t){let r=typeof t=="string"?t:t.pathString;return[...n.GetStageData(e)._incoming.get(r)??[]].sort().map(V.fromString)}_getOutgoingConnections(e){return this._outgoing.get(e)??[]}_attributesBelow(e){let t=this._stage.getPrim(e),r=t?[e,...t.getAllDescendants().map(s=>s.path)]:[],i=[];for(let s of r){if(!Ef(this._stage,s))continue;let o=this._stage.getPrim(s);if(o)for(let a of o.attrNames){let c=o.getAttr(a);c&&!c.isRelationship&&i.push(c)}}return i}_populateConnectionTables(){for(let e of this._stage.traverse()){let t=this._stage.getPrim(e);if(t)for(let r of t.attrNames){let i=t.getAttr(r);i&&!i.isRelationship&&this._replaceConnections(`${e}.${r}`,i.getConnections(),new Set)}}}_replaceConnections(e,t,r){let i=this._outgoing.get(e)??[],s=new Set(i),o=new Set(t);for(let a of s){if(o.has(a))continue;let c=this._incoming.get(a);c?.delete(e),c?.size===0&&this._incoming.delete(a),r.add(a)}for(let a of o){if(s.has(a))continue;let c=this._incoming.get(a);c||this._incoming.set(a,c=new Set),c.add(e),r.add(a)}t.length===0?this._outgoing.delete(e):this._outgoing.set(e,[...t])}_updateForResync(e,t){if(e.includes(".")){let i=this._stage.get(e);this._replaceConnections(e,i&&!i.isRelationship&&Ef(this._stage,iP(e))?i.getConnections():[],t);return}let r=new Set;if(Ef(this._stage,e))for(let i of this._attributesBelow(e)){let s=`${i.primPath}.${i.name}`;r.add(s),this._replaceConnections(s,i.getConnections(),t)}for(let i of[...this._outgoing.keys()]){let s=iP(i);(s===e||s.startsWith(`${e}/`))&&!r.has(i)&&this._replaceConnections(i,[],t)}}_didObjectsChanged(e){let t=new Set;for(let r of e.resyncedPaths)this._updateForResync(r,t);for(let r of e.resolvedAssetPathsResyncedPaths??[])this._updateForResync(r,t);for(let r of e.changedInfoOnlyPaths){if(!r.includes("."))continue;let i=this._stage.get(r);this._replaceConnections(r,i&&!i.isRelationship?i.getConnections():[],t)}for(let r of this._listeners)r._DidObjectsChanged(e,t)}};var on=class{provider;computation;constructor(e,t="computeValue"){this.provider=e,this.computation=t}IsExpired(){return this.provider instanceof Ae?this.provider._getStage()===void 0||this.provider.getStage().get(`${this.provider.primPath}.${this.provider.name}`)===void 0:this.provider._getStage()===void 0||this.provider.getStage().getPrim(this.provider.path)===void 0}GetPath(){return this.provider instanceof Ae?`${this.provider.primPath}.${this.provider.name}`:this.provider.path}};function Vf(n){return n instanceof Ae?`${n.primPath}.${n.name}`:n.path}function sP(n){return n instanceof Ae?n.getStage().getPrim(n.primPath):n}function Nf(n){return`${Vf(n.provider)}\0${n.computation}`}function yI(n,e){if(n===e)return!0;if(e.includes("."))return!1;let t=e.includes(".")?e.slice(0,e.indexOf(".")):e,r=n.includes(".")?n.slice(0,n.indexOf(".")):n;return r===t||r.startsWith(`${t}/`)}var wa=class{constructor(e){this._stage=e;this._stageData=Ls.RegisterStage(e,this)}_identity={};_cache=new Map;_requests=new Set;_stageData;_time=gi.Default();ChangeTime(e){if(!Object.is(this._time.GetValue(),e.GetValue())||this._time.IsDefault()!==e.IsDefault()){this._time=e,this._cache.clear();for(let r of this._requests){let i=[...r._computedIndices];r._computedIndices.clear(),i.length>0&&r.timeCallback?.(i)}}}BuildRequest(e,t,r){let i=new Ia(this._identity,[...e],t,r);return this._requests.add(i),i}PrepareRequest(e){this._validateRequest(e);for(let t of e.valueKeys)this._definitionFor(t)}Compute(e){return this._compute(e,new Map)}ComputeWithOverrides(e,t){return this._compute(e,new Map(t.map(r=>[Nf(r.valueKey),r.overrideValue])))}_InvalidateAll(){this._cache.clear();for(let e of this._requests)e._computedIndices.clear()}_DidObjectsChanged(e,t){let r=[...e.resyncedPaths,...e.changedInfoOnlyPaths,...e.resolvedAssetPathsResyncedPaths??[],...t],i=new Set;for(let[s,o]of this._cache)[...o.dependencies].some(a=>r.some(c=>yI(a,c)))&&(this._cache.delete(s),i.add(s));for(let s of this._requests){let o=[];s.valueKeys.forEach((a,c)=>{s._computedIndices.has(c)&&i.has(Nf(a))&&(o.push(c),s._computedIndices.delete(c))}),o.length>0&&s.valueCallback?.(o)}}_compute(e,t){this._validateRequest(e);let r=t.size===0?this._cache:new Map([...this._cache].filter(([,o])=>![...o.computations].some(a=>t.has(a)))),i={overrides:t,cache:r},s=e.valueKeys.map((o,a)=>{let c=this._evaluate(o,i,new Set);return e._computedIndices.add(a),c.value});return new _a(s)}_validateRequest(e){if(e._systemIdentity!==this._identity)throw new Error("ExecUsdRequest belongs to a different ExecUsdSystem");if(!e.IsValid())throw new Error("ExecUsdRequest is expired")}_schemas(e){let t=sP(e);return[t.typeName,...t.getAppliedSchemas()].filter(Boolean)}_definitions(e){return this._schemas(e).flatMap(t=>[...Tu(t)])}_definitionFor(e,t){if(e.computation===Et.computeValue||e.computation===Et.computeResolvedValue||e.computation===Et.computePath)return;let r=e.provider instanceof Ae,i=this._definitions(e.provider).find(s=>!s.dispatched&&s.providerKind===(r?"attribute":"prim")&&s.computationName===e.computation&&(!r||s.attributeName===e.provider.name));if(i)return i;if(t&&t.providerKind===(r?"attribute":"prim")&&t.computationName===e.computation)return t;throw new Error(`No computation '${e.computation}' for <${Vf(e.provider)}>`)}_evaluate(e,t,r,i){let s=Nf(e);if(t.overrides.has(s))return{value:t.overrides.get(s),dependencies:new Set,computations:new Set([s])};let o=t.cache.get(s);if(o&&!i)return{value:o.value,dependencies:new Set(o.dependencies),computations:new Set(o.computations)};if(r.has(s))throw new Error(`Exec computation cycle detected at ${s}`);r.add(s);try{let a=this._evaluateUncached(e,t,r,i);return a.computations.add(s),i||t.cache.set(s,{value:a.value,dependencies:new Set(a.dependencies),computations:new Set(a.computations)}),a}finally{r.delete(s)}}_evaluateUncached(e,t,r,i){let s=e.provider,o=Vf(s);if(e.computation===Et.computePath)return{value:o,computations:new Set,dependencies:new Set([o])};if(e.computation===Et.computeResolvedValue){if(!(s instanceof Ae))throw new Error("computeResolvedValue requires an attribute provider");let f=this._time.IsDefault()?"default":this._time.GetValue();return{value:f==="default"?s.getValue():s.getValueAtTime(f),computations:new Set,dependencies:new Set([o])}}if(e.computation===Et.computeValue){if(!(s instanceof Ae))throw new Error("computeValue requires an attribute provider");let f=s.getConnections();if(f.length===1){let h=this._stage.get(f[0]);if(h&&!h.isRelationship&&h.typeName===s.typeName){let y=this._evaluate(new on(h,Et.computeValue),t,r);return y.dependencies.add(o),y}}return this._evaluate(new on(s,Et.computeResolvedValue),t,r)}let a=this._definitionFor(e,i);if(!a?.callback)throw new Error(`Computation '${e.computation}' has no callback`);let c=new Map,l=new Set([o]),u=new Set;for(let f of a.inputs){let h=this._evaluateInput(s,f,t,r,a);c.set(f.inputName,h.map(y=>y.value));for(let y of h){for(let g of y.computations)u.add(g);for(let g of y.dependencies)l.add(g)}}let d=new zs(c),p=a.callback(d);return{value:d._GetCallbackResult(p),dependencies:l,computations:u}}_evaluateInput(e,t,r,i,s){let o=sP(e),a=(c,l,u)=>c?[this._evaluate(c instanceof Ae?new on(c,l):new on(c,l),r,i,u)]:[];switch(t.source){case"selfComputation":return a(e,t.computation);case"primComputation":return a(o,t.computation);case"primAttributeValue":return a(o.getAttr(t.attributeName),Et.computeValue);case"primAttributeComputation":return a(o.getAttr(t.attributeName),t.computation);case"relationshipTargetedObjects":{let c=`${o.path}.${t.relationshipName}`,l=this._stage.get(c)?.getTargets()??[],u=t.fallsBackToDispatched?this._definitions(e).find(p=>p.dispatched&&p.computationName===t.computation):void 0,d=[];for(let p of l){let f=p.includes(".")?this._stage.get(p):this._stage.getPrim(p);d.push(...a(f,t.computation,u))}if(d.length===0)return[{value:void 0,computations:new Set,dependencies:new Set([c,...l])}].slice(0,0);for(let p of d){p.dependencies.add(c);for(let f of l)p.dependencies.add(f)}return d}}}};function oP(n){let e=new wa(n),t=[],r=[],i=[],s=[],o;for(let l of n.traverse()){let u=n.getPrim(l);if(!u)continue;let d=u.getAttr("exec:timeInput")?.getValue();d&&i.push(u.getAttr(d));let p=u.getAttr("exec:displaySetting")?.getValue();p&&s.push(u.getAttr(p));let f=u.getAttr("exec:readout")?.getValue();f&&(o=new on(u,f));for(let h of u.getPropertyNames()){if(!h.startsWith("exec:binding:"))continue;let y=h.slice(13),g=n.get(l+"."+h)?.getTargets()??[],m=u.getAttr("exec:computation:"+y)?.getValue();if(g.length!==1||!m)throw Error("Invalid execution binding");r.push(new on(n.getPrim(g[0]),m)),t.push(u.getAttr(y))}}let a=r.length;r.push(o);let c=e.BuildRequest(r);return{bindingCount:t.length,async evaluate(l,u){if(!Number.isFinite(l))throw Error("Invalid time");for(let h of s)h.getValue()!==u&&h.set(u);await n.flushChanges(),e.ChangeTime(new gi(l));let d=e.ComputeWithOverrides(c,i.map(h=>({valueKey:new on(h,Et.computeValue),overrideValue:l}))),p=t.map((h,y)=>d.Get(y)),f=d.Get(a);return t.forEach((h,y)=>{JSON.stringify(h.getValue())!==JSON.stringify(p[y])&&h.set(p[y])}),await n.flushChanges(),{text:f,values:p}}}}async function aP(n,e="/World/NixieClock"){let t=new URL(n).origin;class r extends ln{async resolve(l){return new pe(new URL(l,n).href)}async openAsset(l){let u=new URL(l.toString(),n);if(u.origin!==t)throw Error("External asset");let d=await fetch(u,{redirect:"error"});if(!d.ok)throw Error("Asset "+d.status);return new An(new Uint8Array(await d.arrayBuffer()))}}let i=await Ts.open(n,{resolverContext:qi(new r)});i.setEditTarget(i.getSessionLayer());let s=oP(i);await s.evaluate(45296,!1);let o=Jl(i,{root:e}),a=Af(i,o,{forceDynamic:o.meshes.map(c=>c.path),forceMaterial:o.meshes.map(c=>c.path)});return{graph:o,bindingCount:s.bindingCount,async evaluate(c,l,u=1.1){return i.getPrim(e+"/Behavior").getAttr("nixie:intensity").set(u),{...await s.evaluate(c,l),sample:a.sample(c)}}}}var cu,cP=Promise.resolve();self.onmessage=({data:n})=>{cP=cP.then(async()=>{try{if(n.type==="open")cu=await aP(n.url),self.postMessage({id:n.id,graph:cu.graph,bindingCount:cu.bindingCount});else if(n.type==="evaluate"){let e=await cu.evaluate(n.seconds,n.setting,n.intensity);self.postMessage({id:n.id,...e})}else throw Error("Unknown message")}catch(e){self.postMessage({id:n.id,error:String(e)})}})};
