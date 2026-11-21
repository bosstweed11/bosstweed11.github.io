var tl=Object.defineProperty;var u=(i,e)=>tl(i,"name",{value:e,configurable:!0});import{bl as be,eV as Ce,eg as st,eY as at,f5 as Zi,e$ as ds,ep as Le,g2 as vn,cf as Kn,jE as nl,ew as Vt,jD as qs,jC as js,ih as ue,bh as We,iq as $,aN as pe,aO as de,hM as Y,hq as il,kO as rl,jB as sl,c9 as Ro,fA as Mo,kP as al,kQ as Ie,go as ol,j3 as cl,g1 as No,kR as ll,kS as ul,kT as dl,kU as fl,bd as bn,bf as Sn,kV as Lr,kW as hl,aM as pl,R as Qs,aW as ml,kX as gl,kY as _l,kZ as bl,bg as Ar,aa as Sl,k_ as Gi,k$ as Li,l0 as yl,ed as ct,G as Ys,bk as xl,b1 as vl,l1 as wl,hy as Ks,er as Pl,gQ as Tl,bc as Js,hB as kl,jM as Il,l2 as Cl,b0 as Dl,b4 as Zs}from"./usd-core-DUbHzUpd.js";import{H as W,u as Ai,v as $l,w as Oo,x as Jn,y as Bl,z as Fl,A as El,B as Zt,C as Gl,D as Ll,E as Al,F as Rl,I as Ml,J as ea,K as Nl,L as Ol,M as Re,N as Hl,O as Ul,Q as Vl,R as ri,S as yn,T as oe,V as Ri,W as wn,X as Ho,Y as Wl,Z as ta,_ as Uo,$ as Vo,a0 as zl,a1 as Xl,l as Rr,o as Wo,r as na,s as ql,U as ia,q as Je,a2 as jl}from"./engine-C40nglOx.js";import{k as Ht,l as ra,m as zo,n as Ql,o as Yl,p as K,q as Mi,r as Ni,s as Mr,t as on,u as Wt,v as si,w as I,x as Dn,y as An,z as fs,c as De,A as sa,B as Ue,C as Kl,D as ar,E as or,F as L,G as Nr,I as Or,J as St,K as ai,L as Hr,M as Jl,N as Zl,g as eu}from"./materialXSupport-BkDZ7hf6.js";import{dT as tu,dB as nu,dA as iu,ak as ru,di as cr,h as su,dh as _e,aZ as mt,aP as au,aS as ou,df as te,de as aa,dg as ge,n as oa,bx as Xo,cH as Rn,eu as qt,aX as Ur,cI as Ti,cK as kt,P as Vr,et as D,e as Ye,ev as Wr,aV as en,cJ as cu,ep as qo,bX as lu,b5 as uu,eY as ca,eX as jo,fa as lr,fd as du}from"./rendererPluginHandle-EV085H0E.js";import{h as fu,i as hu}from"./rendererPlugin-BIuqrd4b.js";import{i as J,a as ce,c as Me,d as N,f as rt,B as Ae,H as Oi,q as Zn}from"./dataSourceLocator-S0gcpRfm.js";import{H as Pn,_ as Tn,a as kn,c as ur,b as la}from"./overlayContainerDataSource-iDzxZy-F.js";import{L as zr}from"./material-DLIRBc-M.js";import{d as Qo}from"./filteringSceneIndex-WzcUnj-i.js";import{c as Yo}from"./sceneIndex-COTQ2huT.js";import{b as Xr}from"./types-BOxcKI_4.js";import{c as pu,a as ua,b as mu,f as gu}from"./display-settings-BIprm5CS.js";import"./stageSceneIndexInterface-De7mpybh.js";import"./cardTexturePrefetch-CJggbSpM.js";import"./glslfxPrefetch-Ds56qqmZ.js";class _u{static{u(this,"HgiShaderFunction")}_descriptor;constructor(e){this._descriptor=e.clone()}getDescriptor(){return this._descriptor}}class bu{static{u(this,"HgiShaderSection")}_identifierVar;_attributes;_defaultValue;_arraySize;_blockInstanceIdentifier;constructor(e,t=[],n="",r="",s=""){this._identifierVar=e,this._attributes=t,this._defaultValue=n,this._arraySize=r,this._blockInstanceIdentifier=s}writeType(e){}writeIdentifier(e){e.write(this._identifierVar)}writeDeclaration(e){this.writeType(e),e.write(" "),this.writeIdentifier(e),this.writeArraySize(e),e.write(";")}writeParameter(e){this.writeType(e),e.write(" "),this.writeIdentifier(e)}writeArraySize(e){this._arraySize&&e.write("[",this._arraySize,"]")}writeBlockInstanceIdentifier(e){e.write(this._blockInstanceIdentifier)}getIdentifier(){return this._identifierVar}getAttributes(){return this._attributes}getArraySize(){return this._arraySize}hasBlockInstanceIdentifier(){return this._blockInstanceIdentifier.length>0}_getDefaultValue(){return this._defaultValue}}class pn{static{u(this,"HgiStringStream")}_parts=[];write(...e){for(const t of e)this._parts.push(String(t));return this}str(){return this._parts.join("")}}class Su{static{u(this,"HgiShaderGenerator")}_descriptor;_localGeneratedShaderCode="";constructor(e){this._descriptor=e}Execute(){const e=new pn;this._execute(e),this._descriptor.generatedShaderCodeOut?this._descriptor.generatedShaderCodeOut.value=e.str():this._localGeneratedShaderCode=e.str()}getGeneratedShaderCode(){return this._descriptor.generatedShaderCodeOut?this._descriptor.generatedShaderCodeOut.value:this._localGeneratedShaderCode}_getShaderCodeDeclarations(){return this._descriptor.shaderCodeDeclarations??""}_getShaderCode(){return this._descriptor.shaderCode??""}_getShaderStage(){return this._descriptor.shaderStage}}class vt{static{u(this,"HgiCmds")}_submitted=!1;constructor(){}isSubmitted(){return this._submitted}_submit(e,t){return!1}_setSubmitted(){this._submitted=!0}static s_computeDebugColor=new be(.855,.161,.11,1);static s_graphicsDebugColor=new be(0,.639,.878,1);static s_blitDebugColor=new be(.99607843137,.87450980392,0,1);static s_markerDebugColor=new be(0,0,0,0)}class yu extends vt{static{u(this,"HgiBlitCmds")}constructor(){super()}}class xu extends vt{static{u(this,"HgiGraphicsCmds")}constructor(){super()}}class vu extends vt{static{u(this,"HgiComputeCmds")}constructor(){super()}}class wu{static{u(this,"HgiCapabilities")}_maxUniformBlockSize=0;_maxShaderStorageBlockSize=0;_uniformBufferOffsetAlignment=0;_maxClipDistances=0;_pageSizeAlignment=1;_maxSamplersPerShaderStage=0;_flags=0;constructor(){}isSet(e){return(this._flags&e)!==0}getMaxUniformBlockSize(){return this._maxUniformBlockSize}getMaxShaderStorageBlockSize(){return this._maxShaderStorageBlockSize}getUniformBufferOffsetAlignment(){return this._uniformBufferOffsetAlignment}getMaxClipDistances(){return this._maxClipDistances}getPageSizeAlignment(){return this._pageSizeAlignment}getMaxSamplersPerShaderStage(){return this._maxSamplersPerShaderStage}_setFlag(e,t){t?this._flags|=e:this._flags&=~e}}const Z={MAP_READ:1,COPY_SRC:4,COPY_DST:8,INDEX:16,VERTEX:32,UNIFORM:64,STORAGE:128,INDIRECT:256},dt={COPY_SRC:1,COPY_DST:2,TEXTURE_BINDING:4,STORAGE_BINDING:8,RENDER_ATTACHMENT:16},ft={VERTEX:1,FRAGMENT:2,COMPUTE:4},oi={RED:1,GREEN:2,BLUE:4,ALPHA:8},Pu={READ:1},Tu=["r8unorm","rg8unorm","rgba8unorm","r8snorm","rg8snorm","rgba8snorm","r16float","rg16float",null,"rgba16float","r32float","rg32float",null,"rgba32float","r16sint","rg16sint",null,"rgba16sint","r16uint","rg16uint",null,"rgba16uint","r32sint","rg32sint",null,"rgba32sint","rgba8unorm-srgb","bc6h-rgb-float","bc6h-rgb-ufloat","bc7-rgba-unorm","bc7-rgba-unorm-srgb","bc1-rgba-unorm","bc3-rgba-unorm","depth32float-stencil8",null],ku=["unorm8","unorm8x2","unorm8x4","snorm8","snorm8x2","snorm8x4","float16","float16x2",null,"float16x4","float32","float32x2","float32x3","float32x4","sint16","sint16x2",null,"sint16x4","uint16","uint16x2",null,"uint16x4","sint32","sint32x2","sint32x3","sint32x4","unorm8x4",null,null,null,null,null,null,null,null];class B{static{u(this,"HgiWebGPUConversions")}static getPixelFormat(e,t){return e===W.HgiFormatInvalid?null:t&Ht.HgiTextureUsageBitsDepthTarget?e===W.HgiFormatFloat32UInt8?"depth32float-stencil8":"depth32float":Tu[e]??null}static getVertexFormat(e){return e===W.HgiFormatInvalid?null:ku[e]??null}static getCullMode(e){switch(e){case ra.HgiCullModeFront:return"front";case ra.HgiCullModeBack:return"back";default:return"none"}}static getBlendEquation(e){return["add","subtract","reverse-subtract","min","max"][e]??"add"}static getBlendFactor(e){return["zero","one","src","one-minus-src","dst","one-minus-dst","src-alpha","one-minus-src-alpha","dst-alpha","one-minus-dst-alpha","constant","one-minus-constant","constant","one-minus-constant","src-alpha-saturated","src1","one-minus-src1","src1-alpha","one-minus-src1-alpha"][e]??"zero"}static getWinding(e){return e===zo.HgiWindingClockwise?"ccw":"cw"}static getAttachmentLoadOp(e){return e===Ql.HgiAttachmentLoadOpLoad?"load":"clear"}static getAttachmentStoreOp(e){return e===Yl.HgiAttachmentStoreOpStore?"store":"discard"}static getCompareFunction(e){return["never","less","equal","less-equal","greater","not-equal","greater-equal","always"][e]??"always"}static getStencilOp(e){return["keep","zero","replace","increment-clamp","decrement-clamp","invert","increment-wrap","decrement-wrap"][e]??"keep"}static getTextureDimension(e){switch(e){case K.HgiTextureType1D:case K.HgiTextureType1DArray:return"1d";case K.HgiTextureType3D:return"3d";default:return"2d"}}static getTextureViewDimension(e){switch(e){case K.HgiTextureType1D:return"1d";case K.HgiTextureType3D:return"3d";case K.HgiTextureTypeCubemap:return"cube";case K.HgiTextureType2DArray:return"2d-array";case K.HgiTextureType1DArray:return"2d-array";default:return"2d"}}static getSamplerAddressMode(e){switch(e){case Mi.HgiSamplerAddressModeRepeat:return"repeat";case Mi.HgiSamplerAddressModeMirrorRepeat:return"mirror-repeat";default:return"clamp-to-edge"}}static getMinMagFilter(e){return e===Ni.HgiSamplerFilterLinear?"linear":"nearest"}static getMipFilter(e){return e===Mr.HgiMipFilterLinear?"linear":"nearest"}static getPrimitiveTopology(e){switch(e){case on.HgiPrimitiveTypePointList:return"point-list";case on.HgiPrimitiveTypeLineList:return"line-list";case on.HgiPrimitiveTypeLineStrip:return"line-strip";case on.HgiPrimitiveTypeTriangleList:return"triangle-list";default:return null}}static getVertexStepMode(e){return e===Wt.HgiVertexBufferStepFunctionPerInstance||e===Wt.HgiVertexBufferStepFunctionConstant?"instance":"vertex"}static getColorWriteMask(e){let t=0;return e&si.HgiColorMaskRed&&(t|=oi.RED),e&si.HgiColorMaskGreen&&(t|=oi.GREEN),e&si.HgiColorMaskBlue&&(t|=oi.BLUE),e&si.HgiColorMaskAlpha&&(t|=oi.ALPHA),t}static getShaderStages(e){let t=0;return e&I.HgiShaderStageVertex&&(t|=ft.VERTEX),e&I.HgiShaderStagePostTessellationVertex&&(t|=ft.VERTEX),e&I.HgiShaderStageFragment&&(t|=ft.FRAGMENT),e&I.HgiShaderStageCompute&&(t|=ft.COMPUTE),e&I.HgiShaderStagePostTessellationControl&&(t|=ft.COMPUTE),t}static getBufferUsage(e){let t=Z.COPY_SRC|Z.COPY_DST;return e&Dn.HgiBufferUsageUniform&&(t|=Z.UNIFORM|Z.STORAGE),e&Dn.HgiBufferUsageIndex32&&(t|=Z.INDEX|Z.STORAGE),e&Dn.HgiBufferUsageVertex&&(t|=Z.VERTEX|Z.STORAGE),e&Dn.HgiBufferUsageStorage&&(t|=Z.STORAGE),e&Dn.HgiBufferUsageIndirect&&(t|=Z.INDIRECT),t}static getTextureUsage(e){let t=dt.COPY_SRC|dt.COPY_DST|dt.TEXTURE_BINDING;return e&(Ht.HgiTextureUsageBitsColorTarget|Ht.HgiTextureUsageBitsDepthTarget|Ht.HgiTextureUsageBitsStencilTarget)&&(t|=dt.RENDER_ATTACHMENT),e&Ht.HgiTextureUsageBitsShaderWrite&&(t|=dt.STORAGE_BINDING),t}static hasStencil(e){return e==="depth32float-stencil8"||e==="depth24plus-stencil8"||e==="stencil8"}static isDepthFormat(e){return e.startsWith("depth")||e==="stencil8"}}function w(i){Ce.GetInstance().postError(new st(i,at.CodingError))}u(w,"TF_CODING_ERROR$5");function Iu(i){Ce.GetInstance().postError(new st(i,at.RuntimeError))}u(Iu,"TF_RUNTIME_ERROR");function gt(i,e=""){return i||w(e?`Failed verification: ' ${e} '`:"Failed verification"),!!i}u(gt,"TF_VERIFY$2");function Ne(i){Ce.GetInstance().postWarning(i)}u(Ne,"TF_WARN$4");function Cu(i){i.addEventListener?.("uncapturederror",t=>{const n=t.error;Iu(`HgiWebGPU: ${n?.message??"unknown device error"}`)})}u(Cu,"HgiWebGPUSetupDebug");const Du=240;class $u{static{u(this,"HgiWebGPUPulledAttributePacker")}constructor(e){this._device=e}_ids=new WeakMap;_nextId=1;_packed=new Map;_serial=0;_bytes=0;_copiedBytes=0;beginCmds(){const e=++this._serial;for(const[t,n]of this._packed)e-n.lastUse>Du&&(n.buffer.destroy(),this._bytes-=n.buffer.size,this._packed.delete(t));return e}getByteSize(){return this._bytes}getCopiedBytes(){return this._copiedBytes}pack(e,t,n,r){let s="";for(const c of t){const l=c.getBufferId();if(!l)return null;let d=this._ids.get(l);d===void 0&&this._ids.set(l,d=this._nextId++),s+=`${d}:${l.size},`}let a=this._packed.get(s);if(!a){const c=new Map,l=[];let d=0;for(const p of t){const m=p.getBufferId();c.set(m,d),l.push({source:p,gpuBuffer:m,base:d,bytes:Math.floor(m.size/4)*4,version:-1,copiedBy:0}),d+=Math.ceil(m.size/4)*4}const f=Math.min(this._device.limits.maxStorageBufferBindingSize,this._device.limits.maxBufferSize);if(d>f)return w(`HgiWebGPU: the ${d} bytes of a draw's index and vertex buffers do not fit one storage buffer binding (${f}); the draw is skipped`),null;const h=this._device.createBuffer({label:"HgiWebGPU packed pulled attributes",size:Math.max(d,4),usage:Z.STORAGE|Z.COPY_DST});this._bytes+=h.size,a={buffer:h,bases:c,ranges:l,lastUse:e},this._packed.set(s,a)}a.lastUse=e;let o=null;for(const c of a.ranges){const l=c.source._getWriteVersion();c.version===l&&!(c.copiedBy!==e&&n(c.source))||(c.version=l,c.copiedBy=e,c.bytes!==0&&(o??=r(),o.copyBufferToBuffer(c.gpuBuffer,0,a.buffer,c.base,c.bytes),this._copiedBytes+=c.bytes))}return a}refresh(e,t){let n=null;for(const r of e)for(const s of r.ranges){const a=s.source._getWriteVersion();s.version!==a&&(s.version=a,s.bytes!==0&&(n??=t(),n.copyBufferToBuffer(s.gpuBuffer,0,r.buffer,s.base,s.bytes),this._copiedBytes+=s.bytes))}}destroy(){for(const e of this._packed.values())e.buffer.destroy();this._packed.clear(),this._bytes=0}}var ki=(i=>(i[i.Integer=0]="Integer",i[i.Pow2=1]="Pow2",i[i.FractionalOdd=2]="FractionalOdd",i[i.FractionalEven=3]="FractionalEven",i))(ki||{}),Ko=(i=>(i[i.Point=0]="Point",i[i.Line=1]="Line",i[i.TriangleCW=2]="TriangleCW",i[i.TriangleCCW=3]="TriangleCCW",i))(Ko||{});function Bu(i){return i==="ccw"?2:3}u(Bu,"HgiWebGPUTessellatorOutputPrimitiveForMetalWinding");const Jo=new Float32Array(1);new Uint32Array(Jo.buffer);new Int32Array(Jo.buffer);const Fu=`
struct Params {
  patchCount: u32,
  // Index of the draw's first factor half: the factor buffer's binding
  // offset / 2 + patchStart * halvesPerPatch.
  firstFactorHalf: u32,
  halvesPerPatch: u32,
  // 0: quad, 1: triangle
  domain: u32,
  // D3D11_TESSELLATOR_PARTITIONING: 0 integer, 1 pow2, 2 fractional odd, 3 fractional even
  partitioning: u32,
  // D3D11_TESSELLATOR_OUTPUT_TRIANGLE_CW (1) or _CCW (0)
  outputCW: u32,
  instanceCount: u32,
  // Word offset of the draw's DrawIndexedIndirect arguments in state.
  argsWord: u32,
  pointCapacity: u32,
  indexCapacity: u32,
  pad0: u32,
  pad1: u32,
};

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read> factors: array<u32>;
// Per patch: point count and index count (countEntry), then their
// exclusive prefix sums (scanEntry).
@group(0) @binding(2) var<storage, read_write> counts: array<u32>;
// Per point: patch (from the draw's first patch), u, v (16.16 fixed point).
@group(0) @binding(3) var<storage, read_write> points: array<u32>;
@group(0) @binding(4) var<storage, read_write> indices: array<u32>;
// [0] point cursor, [1] index cursor, [2] points needed, [3] indices needed,
// [4] draws dropped, [5] the draw's first point, [6] its first index,
// [7] whether it fits; then the indirect arguments of each draw.
@group(0) @binding(5) var<storage, read_write> state: array<u32>;

// tessellator.hpp:43-53
const MIN_ODD: f32 = 1.0;
const MAX_ODD: f32 = 63.0;
const MIN_EVEN: f32 = 2.0;
const MAX_EVEN: f32 = 64.0;

// tessellator.cpp:300-308
const FXP_FRACTION_BITS: u32 = 16u;
const FXP_FRACTION_MASK: u32 = 0x0000ffffu;
const FXP_INTEGER_MASK: u32 = 0x7fff0000u;
const FXP_ONE: u32 = 0x10000u;
const FXP_ONE_THIRD: u32 = 0x00005555u;
const FXP_TWO_THIRDS: u32 = 0x0000aaaau;
const FXP_ONE_HALF: u32 = 0x00008000u;

// tessellator.cpp:557-558
const EPSILON: f32 = 0.0000152587890625;
const MIN_ODD_TESSFACTOR_PLUS_HALF_EPSILON: f32 = 1.00000762939453125;

const PARITY_EVEN: u32 = 0u;
const PARITY_ODD: u32 = 1u;
const P_INTEGER: u32 = 0u;
const P_POW2: u32 = 1u;
const P_ODD: u32 = 2u;
const P_EVEN: u32 = 3u;
const DIAG_INSIDE_TO_OUTSIDE: u32 = 0u;
const DIAG_INSIDE_TO_OUTSIDE_EXCEPT_MIDDLE: u32 = 1u;
const DIAG_MIRRORED: u32 = 2u;

// tessellator.cpp:310-331
const s_fixedReciprocal = array<u32, 65>(
  0xffffffffu,
  0x10000u, 0x8000u, 0x5555u, 0x4000u,
  0x3333u, 0x2aabu, 0x2492u, 0x2000u,
  0x1c72u, 0x199au, 0x1746u, 0x1555u,
  0x13b1u, 0x1249u, 0x1111u, 0x1000u,
  0xf0fu, 0xe39u, 0xd79u, 0xccdu,
  0xc31u, 0xba3u, 0xb21u, 0xaabu,
  0xa3du, 0x9d9u, 0x97bu, 0x925u,
  0x8d4u, 0x889u, 0x842u, 0x800u,
  0x7c2u, 0x788u, 0x750u, 0x71cu,
  0x6ebu, 0x6bdu, 0x690u, 0x666u,
  0x63eu, 0x618u, 0x5f4u, 0x5d1u,
  0x5b0u, 0x591u, 0x572u, 0x555u,
  0x539u, 0x51fu, 0x505u, 0x4ecu,
  0x4d5u, 0x4beu, 0x4a8u, 0x492u,
  0x47eu, 0x46au, 0x457u, 0x444u,
  0x432u, 0x421u, 0x410u, 0x400u);

// tessellator.cpp:1915-1931
const finalPointPositionTable = array<i32, 33>(0, 32, 16, 8, 17, 4, 18, 9, 19, 2, 20, 10, 21, 5, 22, 11, 23,
  1, 24, 12, 25, 6, 26, 13, 27, 3, 28, 14, 29, 7, 30, 15, 31);
const loopStartTable = array<i32, 33>(1, 1, 17, 9, 9, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
const loopEndTable = array<i32, 33>(0, 0, 17, 17, 25, 25, 25, 25, 29, 29, 29, 29, 29, 29, 29, 29, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 32);

// TESS_FACTOR_CONTEXT (tessellator.hpp:182-189)
struct Ctx {
  invFloor: u32,
  invCeil: u32,
  fraction: u32,
  numHalfTessFactorPoints: i32,
  splitPointOnFloorHalfTessFactor: i32,
};

// CHWTessellator state (tessellator.hpp:160-178, 318-333).
var<private> m_parity: u32;
var<private> m_originalParity: u32;
var<private> m_partitioning: u32;
var<private> m_originalPartitioning: u32;
var<private> m_NumPoints: i32;
var<private> m_NumIndices: i32;
var<private> m_bUsingPatchedIndices: bool;
var<private> m_bUsingPatchedIndices2: bool;
// INDEX_PATCH_CONTEXT
var<private> ipc_insideDelta: i32;
var<private> ipc_insideBad: i32;
var<private> ipc_insideReplacement: i32;
var<private> ipc_outsidePatchBase: i32;
var<private> ipc_outsideDelta: i32;
var<private> ipc_outsideBad: i32;
var<private> ipc_outsideReplacement: i32;
// INDEX_PATCH_CONTEXT2
var<private> ipc2_baseIndexToInvert: i32;
var<private> ipc2_indexInversionEndPoint: i32;
var<private> ipc2_cornerCaseBadValue: i32;
var<private> ipc2_cornerCaseReplacementValue: i32;
// Output: whether to write, the patch, and its slices of the pools.
var<private> g_write: bool;
var<private> g_patch: u32;
var<private> g_pointBase: u32;
var<private> g_indexBase: u32;

// PROCESSED_TESS_FACTORS_QUAD / _TRI (tessellator.hpp:240-268); the tri
// domain uses entries 0-2 of the outside arrays and entry 0 of the inside.
var<private> pf_outsideTessFactor: array<u32, 4>;
var<private> pf_insideTessFactor: array<u32, 2>;
var<private> pf_outsideParity: array<u32, 4>;
var<private> pf_insideParity: array<u32, 2>;
var<private> pf_outsideCtx: array<Ctx, 4>;
var<private> pf_insideCtx: array<Ctx, 2>;
var<private> pf_bJustDoMinimumTessFactor: bool;
var<private> pf_bPatchCulled: bool;
var<private> pf_numPointsForOutsideEdge: array<i32, 4>;
var<private> pf_numPointsForInsideTessFactor: array<i32, 2>;
var<private> pf_insideEdgePointBaseOffset: i32;

// D3D compliant float math (tessellator.cpp:15-74)
fn isNaN32(a: f32) -> bool {
  let u = bitcast<u32>(a);
  return (u & 0x7f800000u) == 0x7f800000u && (u & 0x007fffffu) != 0u;
}
fn flush32(a: f32) -> f32 {
  let b = bitcast<u32>(a) & 0x7fffffffu;
  if (b < 0x00800000u) { return bitcast<f32>(bitcast<u32>(a) & 0x80000000u); }
  return a;
}
fn fmin32(a: f32, b: f32) -> f32 {
  let _a = flush32(a);
  let _b = flush32(b);
  if (isNaN32(_b)) { return a; }
  if (_a == 0.0 && _b == 0.0) { return select(b, a, (bitcast<u32>(_a) & 0x80000000u) != 0u); }
  return select(b, a, _a < _b);
}
fn fmax32(a: f32, b: f32) -> f32 {
  let _a = flush32(a);
  let _b = flush32(b);
  if (isNaN32(_b)) { return a; }
  if (_a == 0.0 && _b == 0.0) { return select(b, a, (bitcast<u32>(_b) & 0x80000000u) != 0u); }
  return select(b, a, _a >= _b);
}

// floatToIDotF<15, 16, false> (tessellator.cpp:100-298, 337-340)
fn floatToFixed(input: f32) -> u32 {
  let maxPos = i32((127u + 15u) << 23u);
  var output = bitcast<i32>(input);
  let unbiasedExponent = ((output & 0x7f800000) >> 23u) - 127;
  let isNegative = (output & bitcast<i32>(0x80000000u)) != 0;
  if (unbiasedExponent == 128 && (output & 0x007fffff) != 0) {
    output = 0;
  } else if (!isNegative && output >= maxPos) {
    output = -1;
  } else if (isNegative && (output & 0x7fffffff) >= 0) {
    output = 0;
  } else if (unbiasedExponent < -16 - 1) {
    output = 0;
  } else {
    output = (output & 0x007fffff) | 0x00800000;
    let extraBits = 23 - 16 - unbiasedExponent;
    if (extraBits >= 0) {
      let LSB = 1 << u32(extraBits);
      let extraBitsMask = LSB - 1;
      let half = LSB >> 1u;
      if ((output & LSB) != 0 || (output & extraBitsMask) > half) { output += half; }
      output = output >> u32(extraBits);
    } else {
      output = output << u32(-extraBits);
    }
  }
  return bitcast<u32>(output);
}
fn isEven(input: f32) -> bool { return (i32(input) & 1) == 0; }
fn fxpCeil(input: u32) -> u32 {
  if ((input & FXP_FRACTION_MASK) != 0u) { return (input & FXP_INTEGER_MASK) + FXP_ONE; }
  return input;
}
fn fxpFloor(input: u32) -> u32 { return input & FXP_INTEGER_MASK; }
// tessellator.cpp:1648-1655
fn RemoveMSB(val: i32) -> i32 {
  var check: i32;
  if (val <= 0x0000ffff) { check = select(0x00008000, 0x00000080, val <= 0x000000ff); }
  else if (val <= 0x00ffffff) { check = 0x00800000; }
  // (an if, not select(): Safari's Metal translation of select() with
  // INT_MIN is ambiguous)
  else { check = bitcast<i32>(0x80000000u); }
  for (var i = 0; i < 8; i++) {
    if ((val & check) != 0) { return val & ~check; }
    check = bitcast<i32>(bitcast<u32>(check) >> 1u);
  }
  return 0;
}

fn Odd() -> bool { return m_parity == PARITY_ODD; }
fn HWIntegerPartitioning() -> bool { return m_partitioning == P_INTEGER || m_partitioning == P_POW2; }

// Metal's pow2 partitioning rounds each factor up to a power of two
// (CHLSLTessellator::RoundUpTessFactor, tessellator.cpp:2657-2673; see
// tessellator.ts _RoundUpPow2).
fn RoundUpPow2(f: f32) -> f32 {
  if (m_originalPartitioning != P_POW2) { return f; }
  let bits = bitcast<u32>(f);
  if ((bits & 0x007fffffu) != 0u) { return bitcast<f32>((bits & 0x7f800000u) + 0x00800000u); }
  return f;
}

// tessellator.cpp:1580-1588
fn DefinePoint(fxpU: u32, fxpV: u32, pointStorageOffset: i32) {
  if (g_write) {
    let i = (g_pointBase + u32(pointStorageOffset)) * 3u;
    points[i] = g_patch;
    points[i + 1u] = fxpU;
    points[i + 2u] = fxpV;
  }
}
// tessellator.cpp:2077-2115
fn PatchIndexValue(index_in: i32) -> i32 {
  var index = index_in;
  if (m_bUsingPatchedIndices) {
    if (index >= ipc_outsidePatchBase) {
      if (index == ipc_outsideBad) { index = ipc_outsideReplacement; }
      else { index += ipc_outsideDelta; }
    } else {
      if (index == ipc_insideBad) { index = ipc_insideReplacement; }
      else { index += ipc_insideDelta; }
    }
  } else if (m_bUsingPatchedIndices2) {
    if (index >= ipc2_baseIndexToInvert) {
      if (index == ipc2_cornerCaseBadValue) { index = ipc2_cornerCaseReplacementValue; }
      else { index = ipc2_indexInversionEndPoint - index; }
    } else if (index == ipc2_cornerCaseBadValue) {
      index = ipc2_cornerCaseReplacementValue;
    }
  }
  return index;
}
// tessellator.cpp:1593-1600
fn DefineIndex(index: i32, indexStorageOffset: i32) {
  if (g_write) {
    indices[g_indexBase + u32(indexStorageOffset)] = g_pointBase + u32(PatchIndexValue(index));
  }
}
// tessellator.cpp:1605-1620
fn DefineClockwiseTriangle(index0: i32, index1: i32, index2: i32, base: i32) {
  DefineIndex(index0, base);
  if (params.outputCW != 0u) {
    DefineIndex(index1, base + 1);
    DefineIndex(index2, base + 2);
  } else {
    DefineIndex(index2, base + 1);
    DefineIndex(index1, base + 2);
  }
}

// tessellator.cpp:1683-1695
fn NumPointsForTessFactor(fxpTessFactor: u32) -> i32 {
  if (Odd()) {
    return i32((fxpCeil(FXP_ONE_HALF + (fxpTessFactor + 1u) / 2u) * 2u) >> FXP_FRACTION_BITS);
  }
  return i32((fxpCeil((fxpTessFactor + 1u) / 2u) * 2u) >> FXP_FRACTION_BITS) + 1;
}
// tessellator.cpp:1700-1750
fn ComputeTessFactorContext(fxpTessFactor: u32) -> Ctx {
  var ctx: Ctx;
  var fxpHalfTessFactor = (fxpTessFactor + 1u) / 2u;
  if (Odd() || fxpHalfTessFactor == FXP_ONE_HALF) { fxpHalfTessFactor += FXP_ONE_HALF; }
  let fxpFloorHalfTessFactor = fxpFloor(fxpHalfTessFactor);
  let fxpCeilHalfTessFactor = fxpCeil(fxpHalfTessFactor);
  ctx.fraction = fxpHalfTessFactor - fxpFloorHalfTessFactor;
  ctx.numHalfTessFactorPoints = i32(fxpCeilHalfTessFactor >> FXP_FRACTION_BITS);
  if (fxpCeilHalfTessFactor == fxpFloorHalfTessFactor) {
    ctx.splitPointOnFloorHalfTessFactor = ctx.numHalfTessFactorPoints + 1;
  } else if (Odd()) {
    if (fxpFloorHalfTessFactor == FXP_ONE) {
      ctx.splitPointOnFloorHalfTessFactor = 0;
    } else {
      ctx.splitPointOnFloorHalfTessFactor = (RemoveMSB(i32(fxpFloorHalfTessFactor >> FXP_FRACTION_BITS) - 1) << 1u) + 1;
    }
  } else {
    ctx.splitPointOnFloorHalfTessFactor = (RemoveMSB(i32(fxpFloorHalfTessFactor >> FXP_FRACTION_BITS)) << 1u) + 1;
  }
  var numFloorSegments = i32((fxpFloorHalfTessFactor * 2u) >> FXP_FRACTION_BITS);
  var numCeilSegments = i32((fxpCeilHalfTessFactor * 2u) >> FXP_FRACTION_BITS);
  if (Odd()) {
    numFloorSegments -= 1;
    numCeilSegments -= 1;
  }
  ctx.invFloor = s_fixedReciprocal[numFloorSegments];
  ctx.invCeil = s_fixedReciprocal[numCeilSegments];
  return ctx;
}
// tessellator.cpp:1755-1807
fn PlacePointIn1D(ctx: Ctx, point_in: i32) -> u32 {
  var point = point_in;
  var bFlip = false;
  if (point >= ctx.numHalfTessFactorPoints) {
    point = (ctx.numHalfTessFactorPoints << 1u) - point;
    if (Odd()) { point -= 1; }
    bFlip = true;
  }
  if (point == ctx.numHalfTessFactorPoints) { return FXP_ONE_HALF; }
  let indexOnCeilHalfTessFactor = u32(point);
  var indexOnFloorHalfTessFactor = indexOnCeilHalfTessFactor;
  if (point > ctx.splitPointOnFloorHalfTessFactor) { indexOnFloorHalfTessFactor -= 1u; }
  let fxpLocationOnFloorHalfTessFactor = indexOnFloorHalfTessFactor * ctx.invFloor;
  let fxpLocationOnCeilHalfTessFactor = indexOnCeilHalfTessFactor * ctx.invCeil;
  var fxpLocation = fxpLocationOnFloorHalfTessFactor * (FXP_ONE - ctx.fraction) +
                    fxpLocationOnCeilHalfTessFactor * ctx.fraction;
  fxpLocation = (fxpLocation + FXP_ONE_HALF) >> FXP_FRACTION_BITS;
  if (bFlip) { fxpLocation = FXP_ONE - fxpLocation; }
  return fxpLocation;
}

// tessellator.cpp:1812-1894
fn StitchRegular(bTrapezoid: bool, diagonals: u32, baseIndexOffset_in: i32, numInsideEdgePoints: i32,
                 insideEdgePointBaseOffset: i32, outsideEdgePointBaseOffset: i32) {
  var baseIndexOffset = baseIndexOffset_in;
  var insidePoint = insideEdgePointBaseOffset;
  var outsidePoint = outsideEdgePointBaseOffset;
  if (bTrapezoid) {
    DefineClockwiseTriangle(outsidePoint, outsidePoint + 1, insidePoint, baseIndexOffset);
    baseIndexOffset += 3; outsidePoint++;
  }
  var p: i32;
  switch (diagonals) {
    case 0u: { // DIAGONALS_INSIDE_TO_OUTSIDE
      for (p = 0; p < numInsideEdgePoints - 1; p++) {
        DefineClockwiseTriangle(insidePoint, outsidePoint, outsidePoint + 1, baseIndexOffset);
        baseIndexOffset += 3;
        DefineClockwiseTriangle(insidePoint, outsidePoint + 1, insidePoint + 1, baseIndexOffset);
        baseIndexOffset += 3;
        insidePoint++; outsidePoint++;
      }
    }
    case 1u: { // DIAGONALS_INSIDE_TO_OUTSIDE_EXCEPT_MIDDLE
      for (p = 0; p < numInsideEdgePoints / 2 - 1; p++) {
        DefineClockwiseTriangle(outsidePoint, outsidePoint + 1, insidePoint, baseIndexOffset);
        baseIndexOffset += 3;
        DefineClockwiseTriangle(insidePoint, outsidePoint + 1, insidePoint + 1, baseIndexOffset);
        baseIndexOffset += 3;
        insidePoint++; outsidePoint++;
      }
      DefineClockwiseTriangle(outsidePoint, insidePoint + 1, insidePoint, baseIndexOffset);
      baseIndexOffset += 3;
      DefineClockwiseTriangle(outsidePoint, outsidePoint + 1, insidePoint + 1, baseIndexOffset);
      baseIndexOffset += 3;
      insidePoint++; outsidePoint++; p += 2;
      for (; p < numInsideEdgePoints; p++) {
        DefineClockwiseTriangle(outsidePoint, outsidePoint + 1, insidePoint, baseIndexOffset);
        baseIndexOffset += 3;
        DefineClockwiseTriangle(insidePoint, outsidePoint + 1, insidePoint + 1, baseIndexOffset);
        baseIndexOffset += 3;
        insidePoint++; outsidePoint++;
      }
    }
    default: { // DIAGONALS_MIRRORED
      for (p = 0; p < numInsideEdgePoints / 2; p++) {
        DefineClockwiseTriangle(outsidePoint, insidePoint + 1, insidePoint, baseIndexOffset);
        baseIndexOffset += 3;
        DefineClockwiseTriangle(outsidePoint, outsidePoint + 1, insidePoint + 1, baseIndexOffset);
        baseIndexOffset += 3;
        insidePoint++; outsidePoint++;
      }
      for (; p < numInsideEdgePoints - 1; p++) {
        DefineClockwiseTriangle(insidePoint, outsidePoint, outsidePoint + 1, baseIndexOffset);
        baseIndexOffset += 3;
        DefineClockwiseTriangle(insidePoint, outsidePoint + 1, insidePoint + 1, baseIndexOffset);
        baseIndexOffset += 3;
        insidePoint++; outsidePoint++;
      }
    }
  }
  if (bTrapezoid) {
    DefineClockwiseTriangle(outsidePoint, outsidePoint + 1, insidePoint, baseIndexOffset);
    baseIndexOffset += 3;
  }
}

// tessellator.cpp:1899-2072
fn StitchTransition(baseIndexOffset_in: i32,
                    insideEdgePointBaseOffset: i32, insideNumHalfTessFactorPoints_in: i32, insideEdgeTessFactorParity: u32,
                    outsideEdgePointBaseOffset: i32, outsideNumHalfTessFactorPoints_in: i32, outsideTessFactorParity: u32) {
  var baseIndexOffset = baseIndexOffset_in;
  var insideNumHalfTessFactorPoints = insideNumHalfTessFactorPoints_in;
  var outsideNumHalfTessFactorPoints = outsideNumHalfTessFactorPoints_in;
  if (insideEdgeTessFactorParity == PARITY_ODD) { insideNumHalfTessFactorPoints -= 1; }
  if (outsideTessFactorParity == PARITY_ODD) { outsideNumHalfTessFactorPoints -= 1; }
  var outsidePoint = outsideEdgePointBaseOffset;
  var insidePoint = insideEdgePointBaseOffset;
  let iStart = min(loopStartTable[insideNumHalfTessFactorPoints], loopStartTable[outsideNumHalfTessFactorPoints]);
  let iEnd = max(loopEndTable[insideNumHalfTessFactorPoints], loopEndTable[outsideNumHalfTessFactorPoints]);

  if (finalPointPositionTable[0] < outsideNumHalfTessFactorPoints) {
    DefineClockwiseTriangle(outsidePoint, outsidePoint + 1, insidePoint, baseIndexOffset);
    baseIndexOffset += 3; outsidePoint++;
  }
  for (var i = iStart; i <= iEnd; i++) {
    if (finalPointPositionTable[i] < insideNumHalfTessFactorPoints) {
      DefineClockwiseTriangle(insidePoint, outsidePoint, insidePoint + 1, baseIndexOffset);
      baseIndexOffset += 3; insidePoint++;
    }
    if (finalPointPositionTable[i] < outsideNumHalfTessFactorPoints) {
      DefineClockwiseTriangle(outsidePoint, outsidePoint + 1, insidePoint, baseIndexOffset);
      baseIndexOffset += 3; outsidePoint++;
    }
  }
  if (insideEdgeTessFactorParity != outsideTessFactorParity || insideEdgeTessFactorParity == PARITY_ODD) {
    if (insideEdgeTessFactorParity == outsideTessFactorParity) {
      DefineClockwiseTriangle(insidePoint, outsidePoint, insidePoint + 1, baseIndexOffset);
      baseIndexOffset += 3;
      DefineClockwiseTriangle(insidePoint + 1, outsidePoint, outsidePoint + 1, baseIndexOffset);
      baseIndexOffset += 3;
      insidePoint++;
      outsidePoint++;
    } else if (insideEdgeTessFactorParity == PARITY_EVEN) {
      DefineClockwiseTriangle(insidePoint, outsidePoint, outsidePoint + 1, baseIndexOffset);
      baseIndexOffset += 3;
      outsidePoint++;
    } else {
      DefineClockwiseTriangle(insidePoint, outsidePoint, insidePoint + 1, baseIndexOffset);
      baseIndexOffset += 3;
      insidePoint++;
    }
  }
  for (var i = iEnd; i >= iStart; i--) {
    if (finalPointPositionTable[i] < outsideNumHalfTessFactorPoints) {
      DefineClockwiseTriangle(outsidePoint, outsidePoint + 1, insidePoint, baseIndexOffset);
      baseIndexOffset += 3; outsidePoint++;
    }
    if (finalPointPositionTable[i] < insideNumHalfTessFactorPoints) {
      DefineClockwiseTriangle(insidePoint, outsidePoint, insidePoint + 1, baseIndexOffset);
      baseIndexOffset += 3; insidePoint++;
    }
  }
  if (finalPointPositionTable[0] < outsideNumHalfTessFactorPoints) {
    DefineClockwiseTriangle(outsidePoint, outsidePoint + 1, insidePoint, baseIndexOffset);
    baseIndexOffset += 3; outsidePoint++;
  }
}

// The factor clamping bounds (tessellator.cpp:520-541, 1039-1060)
fn LowerBound() -> f32 {
  if (m_originalPartitioning == P_EVEN) { return MIN_EVEN; }
  return MIN_ODD;
}
fn UpperBound() -> f32 {
  if (m_originalPartitioning == P_ODD) { return MAX_ODD; }
  return MAX_EVEN;
}

// tessellator.cpp:504-681
fn QuadProcessTessFactors(f_Ueq0: f32, f_Veq0: f32, f_Ueq1: f32, f_Veq1: f32, f_InsideU: f32, f_InsideV: f32) {
  var tessFactor_Ueq0 = f_Ueq0;
  var tessFactor_Veq0 = f_Veq0;
  var tessFactor_Ueq1 = f_Ueq1;
  var tessFactor_Veq1 = f_Veq1;
  var insideTessFactor_U = f_InsideU;
  var insideTessFactor_V = f_InsideV;
  if (!(tessFactor_Ueq0 > 0.0) || !(tessFactor_Veq0 > 0.0) || !(tessFactor_Ueq1 > 0.0) || !(tessFactor_Veq1 > 0.0)) {
    pf_bPatchCulled = true;
    return;
  }
  pf_bPatchCulled = false;

  var lowerBound = LowerBound();
  let upperBound = UpperBound();
  tessFactor_Ueq0 = fmin32(upperBound, fmax32(lowerBound, tessFactor_Ueq0));
  tessFactor_Veq0 = fmin32(upperBound, fmax32(lowerBound, tessFactor_Veq0));
  tessFactor_Ueq1 = fmin32(upperBound, fmax32(lowerBound, tessFactor_Ueq1));
  tessFactor_Veq1 = fmin32(upperBound, fmax32(lowerBound, tessFactor_Veq1));

  if (HWIntegerPartitioning()) {
    tessFactor_Ueq0 = ceil(tessFactor_Ueq0);
    tessFactor_Veq0 = ceil(tessFactor_Veq0);
    tessFactor_Ueq1 = ceil(tessFactor_Ueq1);
    tessFactor_Veq1 = ceil(tessFactor_Veq1);
  }

  if (m_originalPartitioning == P_ODD) {
    if (tessFactor_Ueq0 > MIN_ODD_TESSFACTOR_PLUS_HALF_EPSILON ||
        tessFactor_Veq0 > MIN_ODD_TESSFACTOR_PLUS_HALF_EPSILON ||
        tessFactor_Ueq1 > MIN_ODD_TESSFACTOR_PLUS_HALF_EPSILON ||
        tessFactor_Veq1 > MIN_ODD_TESSFACTOR_PLUS_HALF_EPSILON ||
        insideTessFactor_U > MIN_ODD_TESSFACTOR_PLUS_HALF_EPSILON ||
        insideTessFactor_V > MIN_ODD_TESSFACTOR_PLUS_HALF_EPSILON) {
      lowerBound = MIN_ODD + EPSILON;
    }
  }

  insideTessFactor_U = fmin32(upperBound, fmax32(lowerBound, insideTessFactor_U));
  insideTessFactor_V = fmin32(upperBound, fmax32(lowerBound, insideTessFactor_V));

  if (HWIntegerPartitioning()) {
    insideTessFactor_U = ceil(insideTessFactor_U);
    insideTessFactor_V = ceil(insideTessFactor_V);
  }

  m_NumPoints = 0;
  m_NumIndices = 0;

  let outsideTessFactor = array<f32, 4>(tessFactor_Ueq0, tessFactor_Veq0, tessFactor_Ueq1, tessFactor_Veq1);
  let insideTessFactor = array<f32, 2>(insideTessFactor_U, insideTessFactor_V);
  if (HWIntegerPartitioning()) {
    for (var edge = 0; edge < 4; edge++) {
      pf_outsideParity[edge] = select(PARITY_ODD, PARITY_EVEN, isEven(outsideTessFactor[edge]));
    }
    for (var axis = 0; axis < 2; axis++) {
      pf_insideParity[axis] = select(PARITY_ODD, PARITY_EVEN, isEven(insideTessFactor[axis]) || insideTessFactor[axis] == 1.0);
    }
  } else {
    for (var edge = 0; edge < 4; edge++) { pf_outsideParity[edge] = m_originalParity; }
    pf_insideParity[0] = m_originalParity;
    pf_insideParity[1] = m_originalParity;
  }

  for (var edge = 0; edge < 4; edge++) { pf_outsideTessFactor[edge] = floatToFixed(outsideTessFactor[edge]); }
  for (var axis = 0; axis < 2; axis++) { pf_insideTessFactor[axis] = floatToFixed(insideTessFactor[axis]); }

  if (HWIntegerPartitioning() || Odd()) {
    if (pf_insideTessFactor[0] == FXP_ONE && pf_insideTessFactor[1] == FXP_ONE &&
        pf_outsideTessFactor[0] == FXP_ONE && pf_outsideTessFactor[1] == FXP_ONE &&
        pf_outsideTessFactor[2] == FXP_ONE && pf_outsideTessFactor[3] == FXP_ONE) {
      pf_bJustDoMinimumTessFactor = true;
      return;
    }
  }
  pf_bJustDoMinimumTessFactor = false;

  for (var edge = 0; edge < 4; edge++) {
    m_parity = pf_outsideParity[edge];
    pf_outsideCtx[edge] = ComputeTessFactorContext(pf_outsideTessFactor[edge]);
  }
  for (var axis = 0; axis < 2; axis++) {
    m_parity = pf_insideParity[axis];
    pf_insideCtx[axis] = ComputeTessFactorContext(pf_insideTessFactor[axis]);
  }

  for (var edge = 0; edge < 4; edge++) {
    m_parity = pf_outsideParity[edge];
    pf_numPointsForOutsideEdge[edge] = NumPointsForTessFactor(pf_outsideTessFactor[edge]);
    m_NumPoints += pf_numPointsForOutsideEdge[edge];
  }
  m_NumPoints -= 4;

  for (var axis = 0; axis < 2; axis++) {
    m_parity = pf_insideParity[axis];
    pf_numPointsForInsideTessFactor[axis] = NumPointsForTessFactor(pf_insideTessFactor[axis]);
    let pointCountMin = select(3, 4, pf_insideParity[axis] == PARITY_ODD);
    pf_numPointsForInsideTessFactor[axis] = max(pointCountMin, pf_numPointsForInsideTessFactor[axis]);
  }

  pf_insideEdgePointBaseOffset = m_NumPoints;
  m_NumPoints += (pf_numPointsForInsideTessFactor[0] - 2) * (pf_numPointsForInsideTessFactor[1] - 2);
}

// tessellator.cpp:686-786
fn QuadGeneratePoints() {
  var pointOffset = 0;
  for (var edge = 0; edge < 4; edge++) {
    let parity = edge & 1;
    let endPoint = pf_numPointsForOutsideEdge[edge] - 1;
    for (var p = 0; p < endPoint; p++) {
      let q = select(endPoint - p, p, edge == 1 || edge == 2);
      m_parity = pf_outsideParity[edge];
      let fxpParam = PlacePointIn1D(pf_outsideCtx[edge], q);
      if (parity != 0) {
        DefinePoint(fxpParam, select(0u, FXP_ONE, edge == 3), pointOffset);
      } else {
        DefinePoint(select(0u, FXP_ONE, edge == 2), fxpParam, pointOffset);
      }
      pointOffset++;
    }
  }

  let minNumPointsForTessFactor = min(pf_numPointsForInsideTessFactor[0], pf_numPointsForInsideTessFactor[1]);
  let numRings = minNumPointsForTessFactor >> 1u;
  for (var ring = 1; ring < numRings; ring++) {
    let startPoint = ring;
    let endPoint = array<i32, 2>(pf_numPointsForInsideTessFactor[0] - 1 - startPoint,
                                 pf_numPointsForInsideTessFactor[1] - 1 - startPoint);
    for (var edge = 0; edge < 4; edge++) {
      let parity0 = edge & 1;
      let parity1 = (edge + 1) & 1;
      let perpendicularAxisPoint = select(endPoint[parity0], startPoint, edge < 2);
      m_parity = pf_insideParity[parity0];
      let fxpPerpParam = PlacePointIn1D(pf_insideCtx[parity0], perpendicularAxisPoint);
      m_parity = pf_insideParity[parity1];
      for (var p = startPoint; p < endPoint[parity1]; p++) {
        let q = select(endPoint[parity1] - (p - startPoint), p, edge == 1 || edge == 2);
        let fxpParam = PlacePointIn1D(pf_insideCtx[parity1], q);
        if (parity1 != 0) {
          DefinePoint(fxpPerpParam, fxpParam, pointOffset);
        } else {
          DefinePoint(fxpParam, fxpPerpParam, pointOffset);
        }
        pointOffset++;
      }
    }
  }
  if (pf_numPointsForInsideTessFactor[0] > pf_numPointsForInsideTessFactor[1] && pf_insideParity[1] == PARITY_EVEN) {
    let startPoint = numRings;
    let endPoint = pf_numPointsForInsideTessFactor[0] - 1 - startPoint;
    m_parity = pf_insideParity[0];
    for (var p = startPoint; p <= endPoint; p++) {
      let fxpParam = PlacePointIn1D(pf_insideCtx[0], p);
      DefinePoint(fxpParam, FXP_ONE_HALF, pointOffset);
      pointOffset++;
    }
  } else if (pf_numPointsForInsideTessFactor[1] >= pf_numPointsForInsideTessFactor[0] && pf_insideParity[0] == PARITY_EVEN) {
    let startPoint = numRings;
    let endPoint = pf_numPointsForInsideTessFactor[1] - 1 - startPoint;
    m_parity = pf_insideParity[1];
    for (var p = endPoint; p >= startPoint; p--) {
      let fxpParam = PlacePointIn1D(pf_insideCtx[1], p);
      DefinePoint(FXP_ONE_HALF, fxpParam, pointOffset);
      pointOffset++;
    }
  }
}

// tessellator.cpp:791-961
fn QuadGenerateConnectivity() {
  let numPointRowsToCenter = array<i32, 2>((pf_numPointsForInsideTessFactor[0] + 1) >> 1u,
                                           (pf_numPointsForInsideTessFactor[1] + 1) >> 1u);
  let numRings = min(numPointRowsToCenter[0], numPointRowsToCenter[1]);
  let degeneratePointRing = array<i32, 2>(
    select(-1, numPointRowsToCenter[1] - 1, pf_insideParity[1] == PARITY_EVEN),
    select(-1, numPointRowsToCenter[0] - 1, pf_insideParity[0] == PARITY_EVEN));

  var outsideCtxNumHalf = array<i32, 4>(pf_outsideCtx[0].numHalfTessFactorPoints, pf_outsideCtx[1].numHalfTessFactorPoints,
                                        pf_outsideCtx[2].numHalfTessFactorPoints, pf_outsideCtx[3].numHalfTessFactorPoints);
  var outsideTessFactorParity = pf_outsideParity;
  var numPointsForOutsideEdge = pf_numPointsForOutsideEdge;

  var insideEdgePointBaseOffset = pf_insideEdgePointBaseOffset;
  var outsideEdgePointBaseOffset = 0;
  for (var ring = 1; ring < numRings; ring++) {
    let numPointsForInsideEdge = array<i32, 2>(pf_numPointsForInsideTessFactor[0] - 2 * ring,
                                               pf_numPointsForInsideTessFactor[1] - 2 * ring);
    let edge0InsidePointBaseOffset = insideEdgePointBaseOffset;
    let edge0OutsidePointBaseOffset = outsideEdgePointBaseOffset;
    for (var edge = 0; edge < 4; edge++) {
      let parity = (edge + 1) & 1;
      let numTriangles = numPointsForInsideEdge[parity] + numPointsForOutsideEdge[edge] - 2;
      var insideBaseOffset: i32;
      var outsideBaseOffset: i32;
      if (edge == 3) {
        if (ring == degeneratePointRing[parity]) {
          ipc2_baseIndexToInvert = insideEdgePointBaseOffset + 1;
          ipc2_cornerCaseBadValue = outsideEdgePointBaseOffset + numPointsForOutsideEdge[edge] - 1;
          ipc2_cornerCaseReplacementValue = edge0OutsidePointBaseOffset;
          ipc2_indexInversionEndPoint = (ipc2_baseIndexToInvert << 1u) - 1;
          insideBaseOffset = ipc2_baseIndexToInvert;
          outsideBaseOffset = outsideEdgePointBaseOffset;
          m_bUsingPatchedIndices2 = true;
        } else {
          ipc_insideDelta = insideEdgePointBaseOffset;
          ipc_insideBad = numPointsForInsideEdge[parity] - 1;
          ipc_insideReplacement = edge0InsidePointBaseOffset;
          ipc_outsidePatchBase = ipc_insideBad + 1;
          ipc_outsideDelta = outsideEdgePointBaseOffset - ipc_outsidePatchBase;
          ipc_outsideBad = ipc_outsidePatchBase + numPointsForOutsideEdge[edge] - 1;
          ipc_outsideReplacement = edge0OutsidePointBaseOffset;
          insideBaseOffset = 0;
          outsideBaseOffset = ipc_outsidePatchBase;
          m_bUsingPatchedIndices = true;
        }
      } else if (edge == 2 && ring == degeneratePointRing[parity]) {
        ipc2_baseIndexToInvert = insideEdgePointBaseOffset;
        ipc2_cornerCaseBadValue = -1;
        ipc2_cornerCaseReplacementValue = -1;
        ipc2_indexInversionEndPoint = ipc2_baseIndexToInvert << 1u;
        insideBaseOffset = ipc2_baseIndexToInvert;
        outsideBaseOffset = outsideEdgePointBaseOffset;
        m_bUsingPatchedIndices2 = true;
      } else {
        insideBaseOffset = insideEdgePointBaseOffset;
        outsideBaseOffset = outsideEdgePointBaseOffset;
      }
      if (ring == 1) {
        StitchTransition(m_NumIndices,
          insideBaseOffset, pf_insideCtx[parity].numHalfTessFactorPoints, pf_insideParity[parity],
          outsideBaseOffset, outsideCtxNumHalf[edge], outsideTessFactorParity[edge]);
      } else {
        StitchRegular(true, DIAG_MIRRORED, m_NumIndices, numPointsForInsideEdge[parity],
          insideBaseOffset, outsideBaseOffset);
      }
      m_bUsingPatchedIndices = false;
      m_bUsingPatchedIndices2 = false;
      m_NumIndices += numTriangles * 3;
      outsideEdgePointBaseOffset += numPointsForOutsideEdge[edge] - 1;
      if (edge == 2 && ring == degeneratePointRing[parity]) {
        insideEdgePointBaseOffset -= numPointsForInsideEdge[parity] - 1;
      } else {
        insideEdgePointBaseOffset += numPointsForInsideEdge[parity] - 1;
      }
      numPointsForOutsideEdge[edge] = numPointsForInsideEdge[parity];
    }
    if (ring == 1) {
      for (var edge = 0; edge < 4; edge++) {
        outsideCtxNumHalf[edge] = pf_insideCtx[edge & 1].numHalfTessFactorPoints;
        outsideTessFactorParity[edge] = pf_insideParity[edge & 1];
      }
    }
  }

  if (pf_numPointsForInsideTessFactor[0] > pf_numPointsForInsideTessFactor[1] && pf_insideParity[1] == PARITY_ODD) {
    m_bUsingPatchedIndices2 = true;
    let stripNumQuads = (((pf_numPointsForInsideTessFactor[0] >> 1u) - (pf_numPointsForInsideTessFactor[1] >> 1u)) << 1u) +
                        select(1, 2, pf_insideParity[0] == PARITY_EVEN);
    ipc2_baseIndexToInvert = outsideEdgePointBaseOffset + stripNumQuads + 2;
    ipc2_cornerCaseBadValue = ipc2_baseIndexToInvert;
    ipc2_cornerCaseReplacementValue = outsideEdgePointBaseOffset;
    ipc2_indexInversionEndPoint = ipc2_baseIndexToInvert + ipc2_baseIndexToInvert + stripNumQuads;
    StitchRegular(false, DIAG_INSIDE_TO_OUTSIDE, m_NumIndices, stripNumQuads + 1,
      ipc2_baseIndexToInvert, outsideEdgePointBaseOffset + 1);
    m_bUsingPatchedIndices2 = false;
    m_NumIndices += stripNumQuads * 6;
  } else if (pf_numPointsForInsideTessFactor[1] >= pf_numPointsForInsideTessFactor[0] && pf_insideParity[0] == PARITY_ODD) {
    m_bUsingPatchedIndices2 = true;
    let stripNumQuads = (((pf_numPointsForInsideTessFactor[1] >> 1u) - (pf_numPointsForInsideTessFactor[0] >> 1u)) << 1u) +
                        select(1, 2, pf_insideParity[1] == PARITY_EVEN);
    ipc2_baseIndexToInvert = outsideEdgePointBaseOffset + stripNumQuads + 1;
    ipc2_cornerCaseBadValue = -1;
    ipc2_indexInversionEndPoint = ipc2_baseIndexToInvert + ipc2_baseIndexToInvert + stripNumQuads;
    let diag = select(DIAG_INSIDE_TO_OUTSIDE_EXCEPT_MIDDLE, DIAG_INSIDE_TO_OUTSIDE, pf_insideParity[1] == PARITY_EVEN);
    StitchRegular(false, diag, m_NumIndices, stripNumQuads + 1,
      ipc2_baseIndexToInvert, outsideEdgePointBaseOffset);
    m_bUsingPatchedIndices2 = false;
    m_NumIndices += stripNumQuads * 6;
  }
}

// tessellator.cpp:446-498
fn TessellateQuadDomain(f0: f32, f1: f32, f2: f32, f3: f32, i0: f32, i1: f32) {
  QuadProcessTessFactors(RoundUpPow2(f0), RoundUpPow2(f1), RoundUpPow2(f2), RoundUpPow2(f3),
                         RoundUpPow2(i0), RoundUpPow2(i1));
  if (pf_bPatchCulled) {
    m_NumPoints = 0;
    m_NumIndices = 0;
    return;
  }
  if (pf_bJustDoMinimumTessFactor) {
    DefinePoint(0u, 0u, 0);
    DefinePoint(FXP_ONE, 0u, 1);
    DefinePoint(FXP_ONE, FXP_ONE, 2);
    DefinePoint(0u, FXP_ONE, 3);
    m_NumPoints = 4;
    DefineClockwiseTriangle(0, 1, 3, 0);
    DefineClockwiseTriangle(1, 2, 3, 3);
    m_NumIndices = 6;
    return;
  }
  QuadGeneratePoints();
  QuadGenerateConnectivity();
}

// tessellator.cpp:1023-1187
fn TriProcessTessFactors(f_Ueq0: f32, f_Veq0: f32, f_Weq0: f32, f_Inside: f32) {
  var tessFactor_Ueq0 = f_Ueq0;
  var tessFactor_Veq0 = f_Veq0;
  var tessFactor_Weq0 = f_Weq0;
  var insideTessFactor = f_Inside;
  if (!(tessFactor_Ueq0 > 0.0) || !(tessFactor_Veq0 > 0.0) || !(tessFactor_Weq0 > 0.0)) {
    pf_bPatchCulled = true;
    return;
  }
  pf_bPatchCulled = false;

  var lowerBound = LowerBound();
  let upperBound = UpperBound();
  tessFactor_Ueq0 = fmin32(upperBound, fmax32(lowerBound, tessFactor_Ueq0));
  tessFactor_Veq0 = fmin32(upperBound, fmax32(lowerBound, tessFactor_Veq0));
  tessFactor_Weq0 = fmin32(upperBound, fmax32(lowerBound, tessFactor_Weq0));

  if (HWIntegerPartitioning()) {
    tessFactor_Ueq0 = ceil(tessFactor_Ueq0);
    tessFactor_Veq0 = ceil(tessFactor_Veq0);
    tessFactor_Weq0 = ceil(tessFactor_Weq0);
  }

  if (m_originalPartitioning == P_ODD) {
    if (tessFactor_Ueq0 > MIN_ODD_TESSFACTOR_PLUS_HALF_EPSILON ||
        tessFactor_Veq0 > MIN_ODD_TESSFACTOR_PLUS_HALF_EPSILON ||
        tessFactor_Weq0 > MIN_ODD_TESSFACTOR_PLUS_HALF_EPSILON) {
      lowerBound = MIN_ODD + EPSILON;
    }
  }

  insideTessFactor = fmin32(upperBound, fmax32(lowerBound, insideTessFactor));
  if (HWIntegerPartitioning()) {
    insideTessFactor = ceil(insideTessFactor);
  }

  m_NumPoints = 0;
  m_NumIndices = 0;

  let outsideTessFactor = array<f32, 3>(tessFactor_Ueq0, tessFactor_Veq0, tessFactor_Weq0);
  if (HWIntegerPartitioning()) {
    for (var edge = 0; edge < 3; edge++) {
      pf_outsideParity[edge] = select(PARITY_ODD, PARITY_EVEN, isEven(outsideTessFactor[edge]));
    }
    pf_insideParity[0] = select(PARITY_ODD, PARITY_EVEN, isEven(insideTessFactor) || insideTessFactor == 1.0);
  } else {
    for (var edge = 0; edge < 3; edge++) { pf_outsideParity[edge] = m_originalParity; }
    pf_insideParity[0] = m_originalParity;
  }

  for (var edge = 0; edge < 3; edge++) { pf_outsideTessFactor[edge] = floatToFixed(outsideTessFactor[edge]); }
  pf_insideTessFactor[0] = floatToFixed(insideTessFactor);

  if (HWIntegerPartitioning() || Odd()) {
    if (pf_insideTessFactor[0] == FXP_ONE && pf_outsideTessFactor[0] == FXP_ONE &&
        pf_outsideTessFactor[1] == FXP_ONE && pf_outsideTessFactor[2] == FXP_ONE) {
      pf_bJustDoMinimumTessFactor = true;
      return;
    }
  }
  pf_bJustDoMinimumTessFactor = false;

  for (var edge = 0; edge < 3; edge++) {
    m_parity = pf_outsideParity[edge];
    pf_outsideCtx[edge] = ComputeTessFactorContext(pf_outsideTessFactor[edge]);
  }
  m_parity = pf_insideParity[0];
  pf_insideCtx[0] = ComputeTessFactorContext(pf_insideTessFactor[0]);

  for (var edge = 0; edge < 3; edge++) {
    m_parity = pf_outsideParity[edge];
    pf_numPointsForOutsideEdge[edge] = NumPointsForTessFactor(pf_outsideTessFactor[edge]);
    m_NumPoints += pf_numPointsForOutsideEdge[edge];
  }
  m_NumPoints -= 3;

  m_parity = pf_insideParity[0];
  pf_numPointsForInsideTessFactor[0] = NumPointsForTessFactor(pf_insideTessFactor[0]);
  let pointCountMin = select(3, 4, Odd());
  pf_numPointsForInsideTessFactor[0] = max(pointCountMin, pf_numPointsForInsideTessFactor[0]);

  pf_insideEdgePointBaseOffset = m_NumPoints;

  let numInteriorRings = (pf_numPointsForInsideTessFactor[0] >> 1u) - 1;
  var numInteriorPoints: i32;
  if (Odd()) {
    numInteriorPoints = 3 * (numInteriorRings * (numInteriorRings + 1) - numInteriorRings);
  } else {
    numInteriorPoints = 3 * (numInteriorRings * (numInteriorRings + 1)) + 1;
  }
  m_NumPoints += numInteriorPoints;
}

// tessellator.cpp:1192-1284
fn TriGeneratePoints() {
  var pointOffset = 0;
  for (var edge = 0; edge < 3; edge++) {
    let parity = edge & 1;
    let endPoint = pf_numPointsForOutsideEdge[edge] - 1;
    for (var p = 0; p < endPoint; p++) {
      let q = select(endPoint - p, p, parity != 0);
      m_parity = pf_outsideParity[edge];
      let fxpParam = PlacePointIn1D(pf_outsideCtx[edge], q);
      if (edge == 0) {
        DefinePoint(0u, fxpParam, pointOffset);
      } else {
        DefinePoint(fxpParam, select(0u, FXP_ONE - fxpParam, edge == 2), pointOffset);
      }
      pointOffset++;
    }
  }

  m_parity = pf_insideParity[0];
  let numRings = pf_numPointsForInsideTessFactor[0] >> 1u;
  for (var ring = 1; ring < numRings; ring++) {
    let startPoint = ring;
    let endPoint = pf_numPointsForInsideTessFactor[0] - 1 - startPoint;
    for (var edge = 0; edge < 3; edge++) {
      let parity = edge & 1;
      var fxpPerpParam = PlacePointIn1D(pf_insideCtx[0], startPoint);
      fxpPerpParam *= FXP_TWO_THIRDS;
      fxpPerpParam = (fxpPerpParam + FXP_ONE_HALF) >> FXP_FRACTION_BITS;
      for (var p = startPoint; p < endPoint; p++) {
        let q = select(endPoint - (p - startPoint), p, parity != 0);
        let fxpParam = PlacePointIn1D(pf_insideCtx[0], q);
        let d = (fxpPerpParam + 1u) / 2u;
        switch (edge) {
          case 0: { DefinePoint(fxpPerpParam, fxpParam - d, pointOffset); }
          case 1: { DefinePoint(fxpParam - d, fxpPerpParam, pointOffset); }
          default: { DefinePoint(fxpParam - d, FXP_ONE - (fxpParam - d) - fxpPerpParam, pointOffset); }
        }
        pointOffset++;
      }
    }
  }
  if (!Odd()) {
    DefinePoint(FXP_ONE_THIRD, FXP_ONE_THIRD, pointOffset);
  }
}

// tessellator.cpp:1289-1377
fn TriGenerateConnectivity() {
  let numRings = (pf_numPointsForInsideTessFactor[0] + 1) >> 1u;
  var outsideCtxNumHalf = array<i32, 3>(pf_outsideCtx[0].numHalfTessFactorPoints, pf_outsideCtx[1].numHalfTessFactorPoints,
                                        pf_outsideCtx[2].numHalfTessFactorPoints);
  var outsideTessFactorParity = array<u32, 3>(pf_outsideParity[0], pf_outsideParity[1], pf_outsideParity[2]);
  var numPointsForOutsideEdge = array<i32, 3>(pf_numPointsForOutsideEdge[0], pf_numPointsForOutsideEdge[1],
                                              pf_numPointsForOutsideEdge[2]);
  var insideEdgePointBaseOffset = pf_insideEdgePointBaseOffset;
  var outsideEdgePointBaseOffset = 0;
  for (var ring = 1; ring < numRings; ring++) {
    let numPointsForInsideEdge = pf_numPointsForInsideTessFactor[0] - 2 * ring;
    let edge0InsidePointBaseOffset = insideEdgePointBaseOffset;
    let edge0OutsidePointBaseOffset = outsideEdgePointBaseOffset;
    for (var edge = 0; edge < 3; edge++) {
      let numTriangles = numPointsForInsideEdge + numPointsForOutsideEdge[edge] - 2;
      var insideBaseOffset: i32;
      var outsideBaseOffset: i32;
      if (edge == 2) {
        ipc_insideDelta = insideEdgePointBaseOffset;
        ipc_insideBad = numPointsForInsideEdge - 1;
        ipc_insideReplacement = edge0InsidePointBaseOffset;
        ipc_outsidePatchBase = ipc_insideBad + 1;
        ipc_outsideDelta = outsideEdgePointBaseOffset - ipc_outsidePatchBase;
        ipc_outsideBad = ipc_outsidePatchBase + numPointsForOutsideEdge[edge] - 1;
        ipc_outsideReplacement = edge0OutsidePointBaseOffset;
        m_bUsingPatchedIndices = true;
        insideBaseOffset = 0;
        outsideBaseOffset = ipc_outsidePatchBase;
      } else {
        insideBaseOffset = insideEdgePointBaseOffset;
        outsideBaseOffset = outsideEdgePointBaseOffset;
      }
      if (ring == 1) {
        StitchTransition(m_NumIndices,
          insideBaseOffset, pf_insideCtx[0].numHalfTessFactorPoints, pf_insideParity[0],
          outsideBaseOffset, outsideCtxNumHalf[edge], outsideTessFactorParity[edge]);
      } else {
        StitchRegular(true, DIAG_MIRRORED, m_NumIndices, numPointsForInsideEdge,
          insideBaseOffset, outsideBaseOffset);
      }
      if (edge == 2) {
        m_bUsingPatchedIndices = false;
      }
      m_NumIndices += numTriangles * 3;
      outsideEdgePointBaseOffset += numPointsForOutsideEdge[edge] - 1;
      insideEdgePointBaseOffset += numPointsForInsideEdge - 1;
      numPointsForOutsideEdge[edge] = numPointsForInsideEdge;
    }
    if (ring == 1) {
      for (var edge = 0; edge < 3; edge++) {
        outsideCtxNumHalf[edge] = pf_insideCtx[0].numHalfTessFactorPoints;
        outsideTessFactorParity[edge] = pf_insideParity[0];
      }
    }
  }
  if (Odd()) {
    DefineClockwiseTriangle(outsideEdgePointBaseOffset, outsideEdgePointBaseOffset + 1,
      outsideEdgePointBaseOffset + 2, m_NumIndices);
    m_NumIndices += 3;
  }
}

// tessellator.cpp:967-1017
fn TessellateTriDomain(f0: f32, f1: f32, f2: f32, inside: f32) {
  TriProcessTessFactors(RoundUpPow2(f0), RoundUpPow2(f1), RoundUpPow2(f2), RoundUpPow2(inside));
  if (pf_bPatchCulled) {
    m_NumPoints = 0;
    m_NumIndices = 0;
    return;
  }
  if (pf_bJustDoMinimumTessFactor) {
    DefinePoint(0u, FXP_ONE, 0);
    DefinePoint(0u, 0u, 1);
    DefinePoint(FXP_ONE, 0u, 2);
    m_NumPoints = 3;
    DefineClockwiseTriangle(0, 1, 2, 0);
    m_NumIndices = 3;
    return;
  }
  TriGeneratePoints();
  TriGenerateConnectivity();
}

// CHWTessellator::Init (tessellator.cpp:411-440) and the patch's factors.
fn Factor(patchIndex: u32, k: u32) -> f32 {
  let h = params.firstFactorHalf + patchIndex * params.halvesPerPatch + k;
  let pair = unpack2x16float(factors[h >> 1u]);
  return select(pair.x, pair.y, (h & 1u) != 0u);
}
fn Tessellate(patchIndex: u32) {
  m_partitioning = params.partitioning;
  m_originalPartitioning = params.partitioning;
  m_parity = PARITY_ODD;
  if (params.partitioning == P_EVEN) { m_parity = PARITY_EVEN; }
  m_originalParity = m_parity;
  m_NumPoints = 0;
  m_NumIndices = 0;
  m_bUsingPatchedIndices = false;
  m_bUsingPatchedIndices2 = false;
  g_patch = patchIndex;
  if (params.domain == 0u) {
    TessellateQuadDomain(Factor(patchIndex, 0u), Factor(patchIndex, 1u), Factor(patchIndex, 2u), Factor(patchIndex, 3u),
                         Factor(patchIndex, 4u), Factor(patchIndex, 5u));
  } else {
    TessellateTriDomain(Factor(patchIndex, 0u), Factor(patchIndex, 1u), Factor(patchIndex, 2u), Factor(patchIndex, 3u));
  }
}

@compute @workgroup_size(64)
fn countEntry(@builtin(global_invocation_id) gid: vec3<u32>) {
  let patchIndex = gid.x;
  if (patchIndex >= params.patchCount) { return; }
  g_write = false;
  Tessellate(patchIndex);
  counts[2u * patchIndex] = u32(m_NumPoints);
  counts[2u * patchIndex + 1u] = u32(m_NumIndices);
}

var<workgroup> wgPoints: array<u32, 256>;
var<workgroup> wgIndices: array<u32, 256>;

@compute @workgroup_size(256)
fn scanEntry(@builtin(local_invocation_index) t: u32) {
  let n = params.patchCount;
  let per = (n + 255u) / 256u;
  let begin = min(t * per, n);
  let end = min(begin + per, n);
  var sp = 0u;
  var si = 0u;
  for (var i = begin; i < end; i++) {
    sp += counts[2u * i];
    si += counts[2u * i + 1u];
  }
  wgPoints[t] = sp;
  wgIndices[t] = si;
  workgroupBarrier();
  for (var off = 1u; off < 256u; off = off << 1u) {
    var ap = 0u;
    var ai = 0u;
    if (t >= off) {
      ap = wgPoints[t - off];
      ai = wgIndices[t - off];
    }
    workgroupBarrier();
    wgPoints[t] += ap;
    wgIndices[t] += ai;
    workgroupBarrier();
  }
  var rp = wgPoints[t] - sp;
  var ri = wgIndices[t] - si;
  for (var i = begin; i < end; i++) {
    let cp = counts[2u * i];
    let ci = counts[2u * i + 1u];
    counts[2u * i] = rp;
    counts[2u * i + 1u] = ri;
    rp += cp;
    ri += ci;
  }
  if (t == 255u) {
    let totalPoints = wgPoints[255];
    let totalIndices = wgIndices[255];
    let pointBase = state[0];
    let indexBase = state[1];
    let fits = totalPoints <= params.pointCapacity - min(pointBase, params.pointCapacity) &&
               totalIndices <= params.indexCapacity - min(indexBase, params.indexCapacity);
    state[2] += totalPoints;
    state[3] += totalIndices;
    state[5] = pointBase;
    state[6] = indexBase;
    state[7] = select(0u, 1u, fits);
    let a = params.argsWord;
    state[a] = select(0u, totalIndices, fits);
    state[a + 1u] = params.instanceCount;
    state[a + 2u] = indexBase;
    state[a + 3u] = 0u;
    state[a + 4u] = 0u;
    if (fits) {
      state[0] = pointBase + totalPoints;
      state[1] = indexBase + totalIndices;
    } else {
      state[4] += 1u;
    }
  }
}

@compute @workgroup_size(64)
fn writeEntry(@builtin(global_invocation_id) gid: vec3<u32>) {
  let patchIndex = gid.x;
  if (patchIndex >= params.patchCount || state[7] == 0u) { return; }
  g_write = true;
  g_pointBase = state[5] + counts[2u * patchIndex];
  g_indexBase = state[6] + counts[2u * patchIndex + 1u];
  Tessellate(patchIndex);
}
`;function Eu(i){return i===zo.HgiWindingCounterClockwise?"ccw":"cw"}u(Eu,"HgiWebGPUMetalTessellationWinding");function Gu(i){switch(i){case Ai.Spacing.FractionalOdd:return ki.FractionalOdd;case Ai.Spacing.FractionalEven:return ki.FractionalEven;default:return ki.Integer}}u(Gu,"HgiWebGPUTessellatorPartitioningForSpacing");function Lu(i){return i==="quad"?[0,0,1,0,1,1,1,1,0,1,0,0]:[1,0,0,1,0,0]}u(Lu,"HgiWebGPUConstantPatchCorners");const He={MAP_READ:1,COPY_SRC:4,COPY_DST:8,INDEX:16,STORAGE:128,INDIRECT:256},Au={READ:1},ci=8,dr=5;class Ru{static{u(this,"HgiWebGPUTessellationFrame")}state;draws=0;capacity=256;constructor(e){this.state=e._createState(this.capacity)}}class Mu{static{u(this,"HgiWebGPUTessellation")}constructor(e){this._device=e,this._module=e.createShaderModule({label:"HgiWebGPU tessellator",code:Fu});const t=u(s=>({type:s}),"storage");this._layout=e.createBindGroupLayout({label:"HgiWebGPU tessellator",entries:[{binding:0,visibility:4,buffer:{type:"uniform",hasDynamicOffset:!0}},{binding:1,visibility:4,buffer:t("read-only-storage")},{binding:2,visibility:4,buffer:t("storage")},{binding:3,visibility:4,buffer:t("storage")},{binding:4,visibility:4,buffer:t("storage")},{binding:5,visibility:4,buffer:t("storage")}]});const n=e.createPipelineLayout({label:"HgiWebGPU tessellator",bindGroupLayouts:[this._layout]}),r=u(s=>e.createComputePipeline({label:`HgiWebGPU tessellator ${s}`,layout:n,compute:{module:this._module,entryPoint:s}}),"make");this._count=r("countEntry"),this._scan=r("scanEntry"),this._write=r("writeEntry"),this._counts=this._createCounts(),this._points=this._createPool("points",this._pointCapacity*12,0),this._indices=this._createPool("indices",this._indexCapacity*4,He.INDEX)}_module;_layout;_count;_scan;_write;_counts;_countsCapacity=4096;_points;_pointCapacity=1<<18;_indices;_indexCapacity=1<<20;_createCounts(){return this._device.createBuffer({label:"HgiWebGPU tessellator counts",size:this._countsCapacity*8,usage:He.STORAGE|He.COPY_SRC})}_createPool(e,t,n){return this._device.createBuffer({label:`HgiWebGPU tessellated ${e}`,size:t,usage:He.STORAGE|He.COPY_SRC|n})}_createState(e){return this._device.createBuffer({label:"HgiWebGPU tessellation state",size:(ci+dr*e)*4,usage:He.STORAGE|He.INDIRECT|He.COPY_SRC|He.COPY_DST})}beginFrame(){return new Ru(this)}encode(e,t){if(t.patchCount===0)return null;if(e.draws===e.capacity){const d=this._createState(e.capacity*2),f=e.state,h=(ci+dr*e.capacity)*4;t.suspend(p=>p.copyBufferToBuffer(f,0,d,0,h)),e.state=d,e.capacity*=2}if(t.patchCount>this._countsCapacity){for(;this._countsCapacity<t.patchCount;)this._countsCapacity*=2;this._counts=this._createCounts()}const n=t.config.domain==="quad"?6:4,r=ci+dr*e.draws++,s=new Uint32Array([t.patchCount,t.factorsByteOffset/2+t.patchStart*n,n,t.config.domain==="quad"?0:1,t.config.partitioning,t.config.outputPrimitive===Ko.TriangleCW?1:0,t.instanceCount,r,this._pointCapacity,this._indexCapacity,0,0]),a=t.allocateParams(new Uint8Array(s.buffer)),o=this._device.createBindGroup({label:"HgiWebGPU tessellator",layout:this._layout,entries:[{binding:0,resource:{buffer:a.buffer,offset:0,size:a.size}},{binding:1,resource:{buffer:t.factors}},{binding:2,resource:{buffer:this._counts}},{binding:3,resource:{buffer:this._points}},{binding:4,resource:{buffer:this._indices}},{binding:5,resource:{buffer:e.state}}]}),c=t.pass(),l=Math.ceil(t.patchCount/64);return c.setBindGroup(0,o,[a.offset]),c.setPipeline(this._count),c.dispatchWorkgroups(l),c.setPipeline(this._scan),c.dispatchWorkgroups(1),c.setPipeline(this._write),c.dispatchWorkgroups(l),{argsBuffer:e.state,argsOffset:r*4,points:this._points,indices:this._indices}}endFrame(e,t){if(e.draws===0)return null;const n=this._device.createBuffer({label:"HgiWebGPU tessellation readback",size:32,usage:He.MAP_READ|He.COPY_DST});return t.copyBufferToBuffer(e.state,0,n,0,32),()=>n.mapAsync(Au.READ).then(()=>{const r=new Uint32Array(n.getMappedRange().slice(0));n.destroy();const[,,s,a,o]=r;if(o){if(Ne(`HgiWebGPU: tessellation needed ${s} points and ${a} indices, more than the pools hold (${this._pointCapacity}, ${this._indexCapacity}); ${o} patch draw(s) were not drawn this frame. The pools grow for the next frame.`),s>this._pointCapacity){for(;this._pointCapacity<s;)this._pointCapacity*=2;this._points=this._createPool("points",this._pointCapacity*12,0)}if(a>this._indexCapacity){for(;this._indexCapacity<a;)this._indexCapacity*=2;this._indices=this._createPool("indices",this._indexCapacity*4,He.INDEX)}}},()=>n.destroy())}static stateHeaderBytes=ci*4}function ht(i,e=0,t){return(ArrayBuffer.isView(i)?new Uint8Array(i.buffer,i.byteOffset,i.byteLength):new Uint8Array(i)).subarray(e,t===void 0?void 0:e+t)}u(ht,"HgiWebGPUBytes");function je(i,e=4){return Math.ceil(i/e)*e}u(je,"HgiWebGPUAlign");class Nu extends $l{static{u(this,"HgiWebGPUBuffer")}_bufferId;_staging=null;_writeVersion=0;constructor(e,t){super(t);const n=je(Math.max(t.byteSize,4)),r=t.initialData;if(this._bufferId=e.createBuffer({label:t.debugName,size:n,usage:B.getBufferUsage(t.usage),mappedAtCreation:!!r}),r){const s=ht(r,0,Math.min(t.byteSize,(ArrayBuffer.isView(r),r.byteLength)));new Uint8Array(this._bufferId.getMappedRange()).set(s),this._bufferId.unmap(),this._staging=new Uint8Array(t.byteSize),this._staging.set(s.subarray(0,t.byteSize))}this._descriptor.initialData=null}_destroy(){this._bufferId?.destroy(),this._bufferId=null}getByteSizeOfResource(){return this._descriptor.byteSize}getRawResource(){return this._bufferId}getBufferId(){return this._bufferId}_getWriteVersion(){return this._writeVersion}_noteWrite(){this._writeVersion++}getCPUStagingAddress(){return this._bufferId?(this._staging??=new Uint8Array(this._descriptor.byteSize),this._staging):null}}const tn=256;function li(i){const e={blockWidth:1,blockHeight:1};return{bytes:Oo(i.format,e),...e}}u(li,"_Block");function ui(i,e){const[t,n,r]=i.dimensions.data,s=i.type===K.HgiTextureType3D;return[Math.max(t>>e,1),Math.max(n>>e,1),s?Math.max(r>>e,1):1]}u(ui,"_MipExtent");class Ou extends yu{static{u(this,"HgiWebGPUBlitCmds")}constructor(e){super(),this._hgi=e}_commandEncoderValue=null;_finished=!1;_pendingGroups=[];_touched=new Set;_readbacks=[];_transient=[];_written=new Set;get _commandEncoder(){if(this._finished)return null;if(!this._commandEncoderValue){this._commandEncoderValue=this._hgi.getPrimaryDevice().createCommandEncoder({label:"HgiWebGPUBlitCmds"});for(const e of this._pendingGroups.splice(0))this._commandEncoderValue.pushDebugGroup(e);this._hgi._blitOpened(this)}return this._commandEncoderValue}_getTouched(){return this._touched}_touch(...e){for(const t of e)t&&this._touched.add(t)}get _device(){return this._hgi.getPrimaryDevice()}_stagingUpload(e){const t=this._device.createBuffer({label:"HgiWebGPUBlitCmds upload",size:je(Math.max(e.byteLength,4)),usage:Z.COPY_SRC,mappedAtCreation:!0});return new Uint8Array(t.getMappedRange()).set(e),t.unmap(),this._transient.push(t),t}pushDebugGroup(e,t=vt.s_blitDebugColor){this._commandEncoderValue?this._commandEncoderValue.pushDebugGroup(e):this._finished||this._pendingGroups.push(e)}popDebugGroup(){this._commandEncoderValue?this._commandEncoderValue.popDebugGroup():this._pendingGroups.pop()}insertDebugMarker(e,t=vt.s_markerDebugColor){this._commandEncoderValue?.insertDebugMarker(e)}copyTextureGpuToCpu(e){const t=e.gpuSourceTexture.Get();if(!gt(t&&t.getTextureId(),"Invalid texture handle"))return;if(e.destinationBufferByteSize===0){Ne("The size of the data to copy was zero (aborted)");return}const n=t.getDescriptor();if(t.getGpuFormat()==="depth32float-stencil8"){Ne("Cannot read back depth stencil on WebGPU.");return}const r=li(n),s=n.layerCount>1,[a,o,c]=e.sourceTexelOffset.data,l=s?0:c,[d,f,h]=ui(n,e.mipLevel),p=d-a,m=f-o,g=Math.max(h-l,1),_=Math.ceil(m/r.blockHeight),b=Math.ceil(p/r.blockWidth)*r.bytes,y=je(b,tn),S=this._device.createBuffer({label:"HgiWebGPUBlitCmds readback",size:y*_*g,usage:Z.MAP_READ|Z.COPY_DST});this._commandEncoder.copyTextureToBuffer({texture:t.getTextureId(),mipLevel:e.mipLevel,origin:{x:a,y:o,z:s?c:l}},{buffer:S,bytesPerRow:y,rowsPerImage:_},{width:p,height:m,depthOrArrayLayers:g});const x=ht(e.cpuDestinationBuffer,e.destinationByteOffset),T=Math.min(e.destinationBufferByteSize,x.byteLength);this._readbacks.push({staging:S,unpack:u(C=>{let U=0;for(let V=0;V<_*g&&U<T;V++){const q=Math.min(b,T-U);x.set(C.subarray(V*y,V*y+q),U),U+=q}},"unpack")})}copyTextureCpuToGpu(e){const t=e.gpuDestinationTexture.Get();if(!t?.getTextureId()||!e.cpuSourceBuffer||e.bufferByteSize===0)return;const n=t.getDescriptor(),r=li(n),s=n.layerCount>1,[a,o,c]=e.destinationTexelOffset.data,[l,d,f]=ui(n,e.mipLevel),h=n.type===K.HgiTextureType2DArray||n.type===K.HgiTextureType1DArray?n.layerCount:1,p=n.type===K.HgiTextureType3D?f:h,m=Math.ceil(d/r.blockHeight),g=Math.floor(e.bufferByteSize/(m*p)),_=je(g,tn),b=ht(e.cpuSourceBuffer,0,e.bufferByteSize),y=new Uint8Array(_*m*p);for(let S=0;S<m*p;S++)y.set(b.subarray(S*g,(S+1)*g),S*_);this._commandEncoder.copyBufferToTexture({buffer:this._stagingUpload(y),bytesPerRow:_,rowsPerImage:m},{texture:t.getTextureId(),mipLevel:e.mipLevel,origin:{x:a,y:o,z:s?0:c}},{width:Math.ceil(l/r.blockWidth)*r.blockWidth,height:m*r.blockHeight,depthOrArrayLayers:p})}copyBufferGpuToGpu(e){const t=e.gpuSourceBuffer.Get();if(!gt(t&&t.getBufferId(),"Invalid source buffer handle"))return;const n=e.gpuDestinationBuffer.Get();if(gt(n&&n.getBufferId(),"Invalid destination buffer handle")){if(e.byteSize===0){Ne("The size of the data to copy was zero (aborted)");return}if((e.sourceByteOffset|e.destinationByteOffset|e.byteSize)%4!==0){w("HgiWebGPU: buffer copies must be 4-byte aligned");return}if(this._written.add(n),this._touch(t.getBufferId(),n.getBufferId()),t===n){const r=this._device.createBuffer({label:"HgiWebGPUBlitCmds self copy",size:e.byteSize,usage:Z.COPY_SRC|Z.COPY_DST});this._transient.push(r);const s=t.getBufferId();this._commandEncoder.copyBufferToBuffer(s,e.sourceByteOffset,r,0,e.byteSize),this._commandEncoder.copyBufferToBuffer(r,0,s,e.destinationByteOffset,e.byteSize);return}this._commandEncoder.copyBufferToBuffer(t.getBufferId(),e.sourceByteOffset,n.getBufferId(),e.destinationByteOffset,e.byteSize)}}copyBufferCpuToGpu(e){if(e.byteSize===0||!e.cpuSourceBuffer||!e.gpuDestinationBuffer.isSet())return;const t=e.gpuDestinationBuffer.Get(),n=t.getBufferId();if(!n)return;this._written.add(t);const r=ht(e.cpuSourceBuffer,e.sourceByteOffset,e.byteSize),s=t.getCPUStagingAddress();s&&!(r.buffer===s.buffer&&e.sourceByteOffset===e.destinationByteOffset)&&s.set(r.subarray(0,Math.max(0,s.byteLength-e.destinationByteOffset)),e.destinationByteOffset);const a=e.destinationByteOffset&-4,o=je(e.destinationByteOffset+e.byteSize),c=ht(e.cpuSourceBuffer,e.sourceByteOffset,e.byteSize);let l=c;if((a!==e.destinationByteOffset||o!==e.destinationByteOffset+e.byteSize)&&(l=new Uint8Array(o-a),s&&l.set(s.subarray(a,Math.min(o,s.byteLength))),l.set(c,e.destinationByteOffset-a),a+l.byteLength>n.size)){w("HgiWebGPU: unaligned buffer copy runs past the buffer");return}if(!this._hgi._pendingBlitWorkUses(n,this)){this._device.queue.writeBuffer(n,a,l.buffer,l.byteOffset,l.byteLength);return}this._touch(n),this._commandEncoder.copyBufferToBuffer(this._stagingUpload(l),0,n,a,l.byteLength)}copyBufferGpuToCpu(e){if(e.byteSize===0||!e.cpuDestinationBuffer||!e.gpuSourceBuffer.isSet())return;const t=e.gpuSourceBuffer.Get().getBufferId();if(!t)return;this._touch(t);const n=e.sourceByteOffset&-4,r=je(e.sourceByteOffset+e.byteSize),s=this._device.createBuffer({label:"HgiWebGPUBlitCmds readback",size:r-n,usage:Z.MAP_READ|Z.COPY_DST});this._commandEncoder.copyBufferToBuffer(t,n,s,0,r-n);const a=ht(e.cpuDestinationBuffer,e.destinationByteOffset,e.byteSize),o=e.sourceByteOffset-n;this._readbacks.push({staging:s,unpack:u(c=>a.set(c.subarray(o,o+e.byteSize)),"unpack")})}copyTextureToBuffer(e){const t=e.gpuSourceTexture.Get(),n=e.gpuDestinationBuffer.Get(),r=n?.getBufferId();if(!t?.getTextureId()||!r){w("HgiWebGPU: CopyTextureToBuffer with an invalid texture or buffer");return}this._written.add(n),this._touch(r);const s=t.getDescriptor(),a=li(s),[o,c,l]=e.sourceTexelOffset.data,[d,f,h]=ui(s,e.mipLevel),p=d-o,m=f-c,g=Math.max(h-l,1),_=Math.ceil(m/a.blockHeight)*g,b=Math.ceil(p/a.blockWidth)*a.bytes,y={width:p,height:m,depthOrArrayLayers:g},S={texture:t.getTextureId(),mipLevel:e.mipLevel,origin:{x:o,y:c,z:l}};if(b%tn===0&&e.destinationByteOffset%4===0){this._commandEncoder.copyTextureToBuffer(S,{buffer:r,offset:e.destinationByteOffset,bytesPerRow:b,rowsPerImage:Math.ceil(m/a.blockHeight)},y);return}if(b%4!==0||e.destinationByteOffset%4!==0){w("HgiWebGPU: CopyTextureToBuffer rows must be 4-byte aligned");return}const x=je(b,tn),T=this._device.createBuffer({label:"HgiWebGPUBlitCmds repack",size:x*_,usage:Z.COPY_SRC|Z.COPY_DST});this._transient.push(T),this._commandEncoder.copyTextureToBuffer(S,{buffer:T,bytesPerRow:x,rowsPerImage:Math.ceil(m/a.blockHeight)},y);for(let C=0;C<_;C++)this._commandEncoder.copyBufferToBuffer(T,C*x,r,e.destinationByteOffset+C*b,b)}copyBufferToTexture(e){const t=e.gpuDestinationTexture.Get(),n=e.gpuSourceBuffer.Get()?.getBufferId();if(!t?.getTextureId()||!n){w("HgiWebGPU: CopyBufferToTexture with an invalid texture or buffer");return}this._touch(n);const r=t.getDescriptor(),s=li(r),[a,o,c]=e.destinationTexelOffset.data,[l,d,f]=ui(r,e.mipLevel),h=l-a,p=d-o,m=Math.max(f-c,1),g=Math.ceil(p/s.blockHeight)*m,_=Math.ceil(h/s.blockWidth)*s.bytes,b={width:h,height:p,depthOrArrayLayers:m},y={texture:t.getTextureId(),mipLevel:e.mipLevel,origin:{x:a,y:o,z:c}};if(_%tn===0&&e.sourceByteOffset%4===0){this._commandEncoder.copyBufferToTexture({buffer:n,offset:e.sourceByteOffset,bytesPerRow:_,rowsPerImage:Math.ceil(p/s.blockHeight)},y,b);return}if(_%4!==0||e.sourceByteOffset%4!==0){w("HgiWebGPU: CopyBufferToTexture rows must be 4-byte aligned");return}const S=je(_,tn),x=this._device.createBuffer({label:"HgiWebGPUBlitCmds repack",size:S*g,usage:Z.COPY_SRC|Z.COPY_DST});this._transient.push(x);for(let T=0;T<g;T++)this._commandEncoder.copyBufferToBuffer(n,e.sourceByteOffset+T*_,x,T*S,_);this._commandEncoder.copyBufferToTexture({buffer:x,bytesPerRow:S,rowsPerImage:Math.ceil(p/s.blockHeight)},y,b)}fillBuffer(e,t){const n=e.Get(),r=n?.getBufferId();if(!n||!r)return;this._written.add(n),this._touch(r);const s=je(n.getDescriptor().byteSize);(t&255)===0?this._commandEncoder.clearBuffer(r,0,s):this._commandEncoder.copyBufferToBuffer(this._stagingUpload(new Uint8Array(s).fill(t&255)),0,r,0,s)}generateMipMaps(e){const t=e.Get();if(!t)return;const n=t.getDescriptor();if(!Hu(n)||n.mipLevels<=1)return;const r=t.getTextureId(),s=t.getGpuFormat();if(!r||!s)return;if(n.type!==K.HgiTextureType2D&&n.type!==K.HgiTextureType2DArray&&n.type!==K.HgiTextureTypeCubemap){w(`HgiWebGPU: GenerateMipMaps supports 2D textures only ('${n.debugName}')`);return}const a=this._hgi._getMipmapPipeline(s);if(!a||!(r.usage&16)){w(`HgiWebGPU: cannot render mipmaps of ${s} ('${n.debugName}')`);return}const o=this._hgi._getMipmapSampler();for(let c=0;c<r.depthOrArrayLayers;c++)for(let l=1;l<r.mipLevelCount;l++){const d=u(p=>r.createView({dimension:"2d",baseMipLevel:p,mipLevelCount:1,baseArrayLayer:c,arrayLayerCount:1}),"view"),f=this._device.createBindGroup({layout:a.getBindGroupLayout(0),entries:[{binding:0,resource:o},{binding:1,resource:d(l-1)}]}),h=this._commandEncoder.beginRenderPass({colorAttachments:[{view:d(l),loadOp:"clear",storeOp:"store"}]});h.setPipeline(a),h.setBindGroup(0,f),h.draw(3),h.end()}}insertMemoryBarrier(e){gt(e===fs.HgiMemoryBarrierAll,"Unknown barrier")}_submit(e,t){if(this._finished)return!1;this._finished=!0;const n=this._device.queue,r=this._transient.splice(0),s=this._readbacks.splice(0);for(const l of this._written)l._noteWrite();this._written.clear();const a=this._commandEncoderValue;if(this._commandEncoderValue=null,!a)return t!==An.HgiSubmitWaitTypeWaitUntilCompleted?!0:(this._hgi._submitNow([]),n.onSubmittedWorkDone().then(()=>!0));const o=a.finish();if(this._hgi._blitClosed(this),t!==An.HgiSubmitWaitTypeWaitUntilCompleted&&s.length===0)return this._hgi._holdSubmit(o,()=>{r.length&&n.onSubmittedWorkDone().then(()=>{for(const l of r)l.destroy()})},this._touched),!0;this._hgi._submitNow([o]);const c=Promise.all(s.map(async l=>{await l.staging.mapAsync(Pu.READ),l.unpack(new Uint8Array(l.staging.getMappedRange())),l.staging.unmap(),l.staging.destroy()})).then(async()=>{await n.onSubmittedWorkDone();for(const l of r)l.destroy();return!0});return t===An.HgiSubmitWaitTypeWaitUntilCompleted||s.length>0?c:!0}}function Hu(i){const e=Jn(i.format);if(e===W.HgiFormatInt16||e===W.HgiFormatUInt16||e===W.HgiFormatInt32)return!1;const[t,n,r]=i.dimensions.data;switch(i.type){case K.HgiTextureType1D:case K.HgiTextureType1DArray:return t>1;case K.HgiTextureType2D:case K.HgiTextureType2DArray:case K.HgiTextureTypeCubemap:return t>1||n>1;case K.HgiTextureType3D:return t>1||n>1||r>1;default:return w("Unsupported HgiTextureType enum value"),!1}}u(Hu,"_HgiTextureCanBeFiltered");class Uu extends wu{static{u(this,"HgiWebGPUCapabilities")}float32Filterable;dualSourceBlending;minUniformBufferOffsetAlignment;minStorageBufferOffsetAlignment;maxComputeWorkgroupsPerDimension;constructor(e){super();const t=e.features,n=e.limits;this._setFlag(De.HgiDeviceCapabilitiesBitsConcurrentDispatch,!0),this._setFlag(De.HgiDeviceCapabilitiesBitsUnifiedMemory,!1),this._setFlag(De.HgiDeviceCapabilitiesBitsBuiltinBarycentrics,!1),this._setFlag(De.HgiDeviceCapabilitiesBitsShaderDoublePrecision,!1),this._setFlag(De.HgiDeviceCapabilitiesBitsShaderDrawParameters,!1),this._setFlag(De.HgiDeviceCapabilitiesBitsMultiDrawIndirect,!1),this._setFlag(De.HgiDeviceCapabilitiesBitsIndirectCommandBuffers,!1),this._setFlag(De.HgiDeviceCapabilitiesBitsConservativeRaster,!1),this._setFlag(De.HgiDeviceCapabilitiesBitsMetalTessellation,!0),this._setFlag(De.HgiDeviceCapabilitiesBitsPrimitiveIdEmulation,!0),this._setFlag(De.HgiDeviceCapabilitiesBitsBasePrimitiveOffset,!0),this._setFlag(De.HgiDeviceCapabilitiesBitsDepthRangeMinusOnetoOne,!1),this._setFlag(De.HgiDeviceCapabilitiesBitsCppShaderPadding,!1),this._setFlag(De.HgiDeviceCapabilitiesBitsSingleSlotResourceArrays,!1),this.float32Filterable=t.has("float32-filterable"),this.dualSourceBlending=t.has("dual-source-blending"),this._maxUniformBlockSize=n.maxUniformBufferBindingSize,this._maxShaderStorageBlockSize=n.maxStorageBufferBindingSize,this._uniformBufferOffsetAlignment=n.minUniformBufferOffsetAlignment,this._maxClipDistances=t.has("clip-distances")?8:0,this._pageSizeAlignment=4,this._maxSamplersPerShaderStage=n.maxSamplersPerShaderStage,this.minUniformBufferOffsetAlignment=n.minUniformBufferOffsetAlignment,this.minStorageBufferOffsetAlignment=n.minStorageBufferOffsetAlignment,this.maxComputeWorkgroupsPerDimension=n.maxComputeWorkgroupsPerDimension}getAPIVersion(){return 1}getShaderVersion(){return 450}}const Mn=0,$t=1,ot=2,Ge=3,qr=1,jr=2,Qr=3,Yr=64,Vu=4;function Wu(i,e=""){const t=Array.from({length:Vu},()=>[]);for(const n of i)for(const r of n){const s=t[r.group];for(const a of r.entries){const o=s.find(c=>c.binding===a.binding);o?a.visibility===0||(o.visibility===0?Object.assign(o,a):(o.visibility|=a.visibility,o.buffer?.type!==a.buffer?.type&&w(`HgiWebGPU: ${e}: binding ${a.binding} of bind group ${r.group} is '${o.buffer?.type}' in one shader function and '${a.buffer?.type}' in another`))):s.push({...a})}}for(const n of t)n.sort((r,s)=>r.binding-s.binding);return t}u(Wu,"HgiWebGPUMergeBindGroupLayoutInfos");function Zo(i,e,t){const n=Wu(e,t),r=zu(n,i.limits);return r.length?{layouts:[],entries:n,exceeded:r}:{layouts:n.map((a,o)=>i.createBindGroupLayout({label:`BindGroupLayout ${t} ${o}`,entries:a})),entries:n}}u(Zo,"HgiWebGPUMakeBindGroupLayouts");function zu(i,e){if(!e)return[];const t=e,n=[[ft.VERTEX,"vertex","Vertex"],[ft.FRAGMENT,"fragment","Fragment"],[ft.COMPUTE,"compute",""]],r=[],s=u((a,o,c,l)=>{c!==void 0&&o>c&&r.push(`${o} ${a} (${l} ${c})`)},"check");for(const[a,o,c]of n){let l=0,d=0,f=0,h=0,p=0;for(const m of i)for(const g of m)g.visibility&a&&(g.buffer?g.buffer.type==="uniform"||g.buffer.type===void 0?d++:l++:g.texture||g.externalTexture?f++:g.sampler?h++:g.storageTexture&&p++);s(`${o} storage buffers`,l,t.maxStorageBuffersPerShaderStage,"maxStorageBuffersPerShaderStage"),c&&s(`${o} storage buffers`,l,t[`maxStorageBuffersIn${c}Stage`],`maxStorageBuffersIn${c}Stage`),s(`${o} uniform buffers`,d,t.maxUniformBuffersPerShaderStage,"maxUniformBuffersPerShaderStage"),s(`${o} sampled textures`,f,t.maxSampledTexturesPerShaderStage,"maxSampledTexturesPerShaderStage"),s(`${o} samplers`,h,t.maxSamplersPerShaderStage,"maxSamplersPerShaderStage"),s(`${o} storage textures`,p,t.maxStorageTexturesPerShaderStage,"maxStorageTexturesPerShaderStage"),c&&s(`${o} storage textures`,p,t[`maxStorageTexturesIn${c}Stage`],`maxStorageTexturesIn${c}Stage`)}return[...new Set(r)]}u(zu,"HgiWebGPUBindingLimitsExceeded");const Ut=128,Kr=12,hs="hgiWebGPUSamplerState";function Xu(i,e){const t=new Float32Array(Kr);let n;switch(i.borderColor){case sa.HgiBorderColorOpaqueBlack:n=[0,0,0,1];break;case sa.HgiBorderColorOpaqueWhite:n=[1,1,1,1];break;default:n=[0,0,0,0]}if(e){const a=u((o,c)=>o===Ue.HgiComponentSwizzleZero?0:o===Ue.HgiComponentSwizzleOne?1:o>=Ue.HgiComponentSwizzleR&&o<=Ue.HgiComponentSwizzleA?n[o-Ue.HgiComponentSwizzleR]:n[c],"swizzle");n=[a(e.r,0),a(e.g,1),a(e.b,2),a(e.a,3)]}t.set(n,0);const r=u(a=>a===Mi.HgiSamplerAddressModeClampToBorderColor?1:0,"border");t.set([r(i.addressModeU),r(i.addressModeV),r(i.addressModeW),0],4);const s=u(a=>a===Ni.HgiSamplerFilterLinear?1:0,"linear");return t.set([s(i.minFilter),s(i.magFilter),0,0],8),t}u(Xu,"HgiWebGPUSamplerStateData");const da=256;function qu(i){const e=Mi.HgiSamplerAddressModeClampToBorderColor;return i.addressModeU===e||i.addressModeV===e||i.addressModeW===e}u(qu,"HgiWebGPUSamplerUsesBorder");function ju(){return`struct HgiWebGPUSamplerState {
  borderColor: vec4<f32>,
  clampToBorder: vec4<f32>,
  linearFilter: vec4<f32>,
};
`}u(ju,"HgiWebGPUSamplerStateStruct");function Qu(i,e){return`@group(${i}) @binding(${Ut}) var<uniform> ${hs}: array<HgiWebGPUSamplerState, ${e}>;
`}u(Qu,"HgiWebGPUSamplerStateDeclaration");function fa(i,e,t,n){const r=n===1?"f32":`vec${n}<f32>`,s=u(d=>n===1?d:`${r}(${d})`,"splat"),a=n===1?`f32(textureDimensions(${e}, 0))`:`${r}(textureDimensions(${e}, 0).${"xyz".slice(0,n)})`,o=n===1?"st.clampToBorder.x":`st.clampToBorder.${"xyz".slice(0,n)}`,c=n===1?"(c < 0.0) || (c >= 1.0)":`(c < ${s("0.0")}) | (c >= ${s("1.0")})`,l=n===1?"(1.0 - f)":Array.from({length:n},(d,f)=>`(1.0 - f.${"xyz"[f]})`).join(" * ");return`fn hgiWebGPUBorder_${i}(s: vec4<f32>, c: ${r}, lod: f32) -> vec4<f32> {
  let st = ${hs}[${t}];
  if (all(st.clampToBorder.xyz == vec3<f32>(0.0))) { return s; }
  let level = floor(clamp(lod, 0.0, f32(textureNumLevels(${e})) - 1.0));
  let linear = select(st.linearFilter.y, st.linearFilter.x, lod > 0.0) > 0.5;
  let n = max(floor(${a} * exp2(-level)), ${s("1.0")});
  let x = floor(c * n * ${da}.0 + 0.5) / ${da}.0 - 0.5;
  let fLinear = clamp(-x, ${s("0.0")}, ${s("1.0")}) + clamp(x - (n - 1.0), ${s("0.0")}, ${s("1.0")});
  let fNearest = select(${s("0.0")}, ${s("1.0")}, ${c});
  let f = min(select(fNearest, fLinear, linear), ${s("1.0")}) * ${o};
  return mix(st.borderColor, s, ${l});
}
`}u(fa,"HgiWebGPUBorderFunction");function ha(i,e,t){const n=t===1?`f32(textureDimensions(${i}, 0))`:`vec${t}<f32>(textureDimensions(${i}, 0).${"xyz".slice(0,t)})`,r=u(s=>t===1?`abs(${s}(${e} * ${n}))`:`length(${s}(${e} * ${n}))`,"len");return`log2(max(max(${r("dpdx")}, ${r("dpdy")}), 1e-8))`}u(ha,"HgiWebGPUImplicitLodExpression");function Yu(i,e,t){const n=qn+t;return`@group(1) @binding(${n}) var hgiWebGPUFootprint_${i}: texture_2d<f32>;
@group(2) @binding(${n}) var hgiWebGPUFootprintSampler_${i}: sampler;
fn hgiWebGPUBorderMix_${i}(s: vec4<f32>, c: vec2<f32>, q: vec4<f32>, lod: f32) -> vec4<f32> {
  if (textureNumLevels(${e}) == 1u) { return hgiWebGPUBorder_${i}(s, c, lod); }
  let st = ${hs}[${t}];
  let wu = select(q.y, q.x, c.x < 0.5) * st.clampToBorder.x;
  let wv = select(q.w, q.z, c.y < 0.5) * st.clampToBorder.y;
  return mix(s, st.borderColor, 1.0 - (1.0 - wu) * (1.0 - wv));
}
`}u(Yu,"HgiWebGPUBorderFootprintFunction");const qn=256,pa=new WeakMap;function ec(i,e,t,n,r=!1){let s=pa.get(i);s||pa.set(i,s=new Map);const a=`${e}x${t}x${n}`;let o=s.get(a);o||(o=Ku(i,a,e,t,n),s.set(a,o));const c=o;if(r)return c.holders=1/0,{view:c.view,release(){}};c.holders++;let l=!1;return{view:c.view,release(){l||(l=!0,--c.holders===0&&s.get(a)===c&&(s.delete(a),c.texture.destroy()))}}}u(ec,"HgiWebGPUAcquireBorderFootprint");function Ku(i,e,t,n,r){const s=i.createTexture({label:`HgiWebGPU border footprint ${e}`,size:{width:t,height:n},format:"rgba8unorm",mipLevelCount:r,usage:6});for(let o=0;o<r;o++){const c=Math.max(t>>o,1),l=Math.max(n>>o,1),d=Math.max(1,Math.floor(c/4)),f=Math.max(1,Math.floor(l/4)),h=new Uint8Array(c*l*4),p=new Map;for(let m=0;m<l;m++){const g=m>=l-f?255:0,_=m<f?255:0,b=(g?1:0)|(_?2:0);let y=p.get(b);if(!y){y=new Uint8Array(c*4);for(let S=0;S<c;S++){const x=S*4;y[x]=S>=c-d?255:0,y[x+1]=S<d?255:0,y[x+2]=g,y[x+3]=_}p.set(b,y)}h.set(y,m*c*4)}i.queue.writeTexture({texture:s,mipLevel:o},h,{bytesPerRow:c*4},{width:c,height:l})}const a=s.createView({label:`HgiWebGPU border footprint ${e}`});return{texture:s,view:a,holders:0}}u(Ku,"_createFootprint");class ps extends Bl{static{u(this,"HgiWebGPUResourceBindings")}_bindGroups=new WeakMap;_depthReads=new WeakMap;_writes=new WeakMap;_samplerState=null;constructor(e){super(e)}_destroy(){this._samplerState?.destroy(),this._samplerState=null}bindResources(e,t,n,r,s){for(const a of[Mn,$t,ot]){const o=n.layouts[a],c=n.entries[a];if(!o||!c||c.length===0)continue;let l=this._bindGroups.get(o);if(l===void 0&&(l=this._createBindGroup(e,a,o,c),this._bindGroups.set(o,l)),l){for(const d of this._depthReads.get(l)??[])r(d);for(const d of this._writes.get(l)??[])s(d);t.setBindGroup(a,l)}}}_createBindGroup(e,t,n,r){const s=this._descriptor,a=[],o=[],c=[];for(const d of r){if(t===ot&&d.binding===Ut){a.push({binding:d.binding,resource:{buffer:this._getSamplerStateBuffer(e)}});continue}if(t!==Mn&&d.binding>=qn){const f=d.binding-qn,h=s.textures.find(S=>S.bindingIndex<=f&&f<S.bindingIndex+Math.max(1,S.textures.length)),p=h?f-h.bindingIndex:0,m=h?.textures[p]?.Get(),g=m?.getSampledViewExtent(),_=h?.samplers[p]?.Get(),b=!!_&&qu(_.getDescriptor()),y=b?_.getBorderFootprintSamplerId():_?.getSamplerId();if(!g||!y)return w(`HgiWebGPU: '${s.debugName}' border footprint ${f} is invalid`),null;a.push({binding:d.binding,resource:t===$t?b?m.getBorderFootprintView(e):ec(e,1,1,1,!0).view:y});continue}if(t===Mn){const f=s.buffers.find(m=>m.bindingIndex===d.binding),h=f?.buffers[0]?.Get(),p=h?.getBufferId();if(!f||!p)return w(`HgiWebGPU: '${s.debugName}' binds no buffer at index ${d.binding}`),null;d.buffer?.type==="storage"&&c.push(h),a.push({binding:d.binding,resource:{buffer:p,offset:f.offsets[0]??0}})}else{const f=s.textures.find(p=>p.bindingIndex===d.binding)??s.textures.find(p=>p.textures.length>1&&d.binding>p.bindingIndex&&d.binding<p.bindingIndex+p.textures.length),h=f?d.binding-f.bindingIndex:0;if(!f)return w(`HgiWebGPU: '${s.debugName}' binds no texture at index ${d.binding}`),null;if(t===$t){const p=f.textures[h]?.Get(),m=!d.storageTexture&&d.texture?.sampleType!=="depth"&&!!p?.isSampledThroughDepthCopy();m&&o.push(p);const g=d.storageTexture?p?.getStorageTextureView():m?p.getShaderReadView(e):p?.getTextureView();if(!g)return w(`HgiWebGPU: '${s.debugName}' texture ${d.binding} is invalid`),null;a.push({binding:d.binding,resource:g})}else{const p=f.samplers[h]?.Get()?.getSamplerId();if(!p)return w(`HgiWebGPU: '${s.debugName}' sampler ${d.binding} is invalid`),null;a.push({binding:d.binding,resource:p})}}}const l=e.createBindGroup({label:`${s.debugName} ${t}`,layout:n,entries:a});return o.length&&this._depthReads.set(l,o),c.length&&this._writes.set(l,c),l}_getSamplerStateBuffer(e){if(this._samplerState)return this._samplerState;const t=this._descriptor.textures,n=Math.max(1,...t.map(a=>a.bindingIndex+Math.max(1,a.textures.length))),r=e.createBuffer({label:`${this._descriptor.debugName} sampler state`,size:n*Kr*4,usage:64,mappedAtCreation:!0}),s=new Float32Array(r.getMappedRange());for(const a of t)a.samplers.forEach((o,c)=>{const l=o?.Get(),d=a.textures[c]?.Get();l&&s.set(Xu(l.getDescriptor(),d?.getDescriptor().componentMapping),(a.bindingIndex+c)*Kr)});return r.unmap(),this._samplerState=r,r}static setConstantValues(e,t,n,r,s){const a=n.layouts[Ge];if(!a||(n.entries[Ge]?.length??0)===0){w("HgiWebGPU: the bound pipeline declares no constant parameters");return}const o=e.allocate(a,r,ht(s,0,r));t.setBindGroup(Ge,o.bindGroup,[o.offset])}}class zt{static{u(this,"HgiWebGPUConstantsAllocator")}constructor(e,t){this._device=e,this._alignment=t}static _chunkSize=64*1024;_chunks=[];_staging=[];_used=[];_offset=zt._chunkSize;_bindGroups=new WeakMap;allocateSlot(e,t){const n=je(Math.max(e,16),16);this._offset+n>zt._chunkSize&&(this._chunks.push(this._device.createBuffer({label:"HgiWebGPU constants",size:zt._chunkSize,usage:72})),this._staging.push(new Uint8Array(zt._chunkSize)),this._used.push(0),this._offset=0);const r=this._chunks.length-1,s=this._chunks[r],a=this._offset;this._offset=je(a+n,this._alignment);const o=Math.min(t.byteLength,n);return this._staging[r].set(o===t.byteLength?t:t.subarray(0,o),a),this._used[r]=a+n,{buffer:s,chunkIndex:r,offset:a,size:n}}flush(){for(let e=0;e<this._chunks.length;e++){const t=this._used[e];t!==0&&(this._device.queue.writeBuffer(this._chunks[e],0,this._staging[e],0,t),this._used[e]=0)}}allocate(e,t,n){const r=this.allocateSlot(t,n),s=r.chunkIndex*131072+r.size;let a=this._bindGroups.get(e);a||(a=new Map,this._bindGroups.set(e,a));let o=a.get(s);return o||(o=this._device.createBindGroup({label:"HgiWebGPU constants",layout:e,entries:[{binding:0,resource:{buffer:r.buffer,offset:0,size:r.size}}]}),a.set(s,o)),{bindGroup:o,offset:r.offset}}destroy(){for(const e of this._chunks)e.destroy();this._chunks.length=0,this._staging.length=0,this._used.length=0,this._bindGroups=new WeakMap}}class Ju extends vu{static{u(this,"HgiWebGPUComputeCmds")}constructor(e,t){super(),this._hgi=e;const n=e.getPrimaryDevice();this._commandEncoder=n.createCommandEncoder({label:"HgiWebGPUComputeCmds"}),this._constants=new zt(n,e.getCapabilities().minUniformBufferOffsetAlignment),this._dispatchMethod=t.dispatchMethod}_commandEncoder;_encoder=null;_pipelineState=null;_skipDispatches=!1;_resourceBindings=null;_resourcesDirty=!1;_constants;_dispatchMethod;_depthReadEncoder=null;_depthReads=new Set;_depthRead=u(e=>{if(this._depthReads.has(e))return;this._depthReads.add(e);const t=this._hgi.getPrimaryDevice();this._depthReadEncoder??=t.createCommandEncoder({label:"HgiWebGPUComputeCmds depth sampling"}),e.encodeShaderRead(t,this._depthReadEncoder)},"_depthRead");_written=new Set;_write=u(e=>{this._written.add(e)},"_write");_createEncoder(){return!this._encoder&&this._commandEncoder&&(this._encoder=this._commandEncoder.beginComputePass({label:"HgiWebGPUComputeCmds"})),this._encoder}bindPipeline(e){const t=this._createEncoder(),n=e.Get(),r=n?.getComputePipelineState();if(n?.exceedsDeviceLimits()){this._pipelineState=null,this._skipDispatches=!0;return}if(this._skipDispatches=!1,!t||!n||!r){w("HgiWebGPU: BindPipeline with an invalid compute pipeline");return}this._pipelineState=n,t.setPipeline(r);const s=n.getBindGroupLayouts();s.layouts.forEach((a,o)=>{s.entries[o].length===0&&t.setBindGroup(o,this._hgi._getEmptyBindGroup(a))}),this._resourcesDirty=!0}bindResources(e){this._resourceBindings=e.Get(),this._resourcesDirty=!0}setConstantValues(e,t,n,r){const s=this._createEncoder(),a=e.Get();!s||!a||a.exceedsDeviceLimits()||ps.setConstantValues(this._constants,s,a.getBindGroupLayouts(),n,r)}Dispatch(e,t){if(e===0||t===0||this._skipDispatches)return;const n=this._createEncoder();if(!n||!this._pipelineState){w("HgiWebGPU: dispatch without a bound pipeline");return}this._resourcesDirty&&this._resourceBindings&&this._resourceBindings.bindResources(this._hgi.getPrimaryDevice(),n,this._pipelineState.getBindGroupLayouts(),this._depthRead,this._write),this._resourcesDirty=!1;const[r,s]=this._pipelineState.getLocalWorkGroupSize();let a=Math.floor((e+(r-1))/r),o=Math.floor((t+(s-1))/s);const c=this._hgi.getCapabilities().maxComputeWorkgroupsPerDimension;a>c&&(Ne(`Max number of work group available from device is ${c}, larger than ${a}`),a=c),o>c&&(Ne(`Max number of work group available from device is ${c}, larger than ${o}`),o=c),n.dispatchWorkgroups(a,o,1)}pushDebugGroup(e,t=vt.s_computeDebugColor){this._createEncoder()?.pushDebugGroup(e)}popDebugGroup(){this._encoder?.popDebugGroup()}insertDebugMarker(e,t=vt.s_markerDebugColor){this._createEncoder()?.insertDebugMarker(e)}insertMemoryBarrier(e){gt(e===fs.HgiMemoryBarrierAll,"Unknown barrier")}getDispatchMethod(){return this._dispatchMethod}_submit(e,t){if(!this._commandEncoder)return!1;this._encoder?.end(),this._encoder=null;const n=this._hgi.getPrimaryDevice().queue;this._depthReadEncoder&&(this._hgi._submitNow([this._depthReadEncoder.finish()]),this._depthReadEncoder=null,this._depthReads.clear()),this._constants.flush(),this._hgi._submitNow([this._commandEncoder.finish()]),this._commandEncoder=null;for(const s of this._written)s._noteWrite();this._written.clear();const r=n.onSubmittedWorkDone().then(()=>(this._constants.destroy(),!0));return t===An.HgiSubmitWaitTypeWaitUntilCompleted?r:!0}}class Zu extends Fl{static{u(this,"HgiWebGPUComputePipeline")}_computePipelineState=null;_bindGroupLayouts={layouts:[],entries:[]};_exceedsDeviceLimits=!1;_localWorkGroupSize=[1,1,1];constructor(e,t){super(t);const n=t.shaderProgram.Get(),r=n?.getComputeFunction()??null;if(!r?.getShaderId()){w(`HgiWebGPU: compute pipeline '${t.debugName}' has no valid compute function`);return}const[s,a,o]=r.getDescriptor().computeDescriptor.localSize.data;s&&a&&o&&this._localWorkGroupSize.splice(0,3,s,a,o);const c=n.getShaderFunctions().map(d=>d.Get()?.getBindGroupLayoutInfo()??[]);this._bindGroupLayouts=Zo(e,c,t.debugName);const l=this._bindGroupLayouts.exceeded;if(l){w(`HgiWebGPU: compute pipeline '${t.debugName}' exceeds the device's binding limits: ${l.join(", ")}; its dispatches are skipped`),this._exceedsDeviceLimits=!0;return}try{this._computePipelineState=e.createComputePipeline({label:t.debugName,layout:e.createPipelineLayout({label:t.debugName,bindGroupLayouts:this._bindGroupLayouts.layouts}),compute:{module:r.getShaderId(),entryPoint:r.getEntryPoint()}})}catch(d){Ne(`Failed to create compute pipeline state, error: ${String(d)}`)}}_destroy(){this._computePipelineState=null,this._bindGroupLayouts={layouts:[],entries:[]}}getComputePipelineState(){return this._computePipelineState}exceedsDeviceLimits(){return this._exceedsDeviceLimits}getBindGroupLayouts(){return this._bindGroupLayouts}getLocalWorkGroupSize(){return this._localWorkGroupSize}}class ed{static{u(this,"HgiWebGPUGarbageCollector")}constructor(e){this._queue=e}_recordingCmds=new Set;_trash=[];_pendingCompletions=0;cmdsCreated(e){this._recordingCmds.add(e)}cmdsSubmitted(e){this._recordingCmds.delete(e);const t=[];this._trash=this._trash.filter(n=>(n.waitFor.delete(e),n.waitFor.size>0?!0:(t.push(n.object),!1))),this._destroyAfterSubmittedWork(t)}trashObject(e){e&&(this._recordingCmds.size>0?this._trash.push({object:e,waitFor:new Set(this._recordingCmds)}):this._destroyAfterSubmittedWork([e]))}getPendingCount(){return this._trash.length+this._pendingCompletions}destroyAll(){for(const e of this._trash)e.object._destroy();this._trash=[],this._recordingCmds.clear()}_destroyAfterSubmittedWork(e){if(e.length===0)return;this._pendingCompletions+=e.length;const t=u(()=>{this._pendingCompletions-=e.length;for(const n of e)n._destroy()},"destroy");this._queue.onSubmittedWorkDone().then(t,t)}}const ma=new WeakMap,td=`
@group(0) @binding(0) var hgiDepthMS: texture_depth_multisampled_2d;

@vertex
fn vs(@builtin(vertex_index) i: u32) -> @builtin(position) vec4<f32> {
  let uv = vec2<f32>(f32((i << 1u) & 2u), f32(i & 2u));
  return vec4<f32>(uv * 2.0 - 1.0, 0.0, 1.0);
}

@fragment
fn fs(@builtin(position) p: vec4<f32>) -> @builtin(frag_depth) f32 {
  return textureLoad(hgiDepthMS, vec2<i32>(p.xy), 0);
}
`;function nd(i,e){let t=ma.get(i);t||ma.set(i,t=new Map);let n=t.get(e);if(!n){const r=i.createShaderModule({label:"HgiWebGPU depth resolve",code:td});n=i.createRenderPipeline({label:"HgiWebGPU depth resolve",layout:"auto",vertex:{module:r,entryPoint:"vs"},fragment:{module:r,entryPoint:"fs",targets:[]},primitive:{topology:"triangle-list"},depthStencil:{format:e,depthWriteEnabled:!0,depthCompare:"always"}}),t.set(e,n)}return n}u(nd,"_Pipeline$1");function id(i,e,t,n){const r=nd(i,n.format),s=i.createBindGroup({layout:r.getBindGroupLayout(0),entries:[{binding:0,resource:t.createView({aspect:"depth-only"})}]}),a=n.format.includes("stencil"),o=e.beginRenderPass({label:"HgiWebGPU depth resolve",colorAttachments:[],depthStencilAttachment:{view:n.createView(),depthLoadOp:"load",depthStoreOp:"store",...a?{stencilLoadOp:"load",stencilStoreOp:"store"}:{}}});o.setPipeline(r),o.setBindGroup(0,s),o.draw(3),o.end()}u(id,"HgiWebGPU_EncodeDepthResolve");class rd extends xu{static{u(this,"HgiWebGPUGraphicsCmds")}_hgi;_descriptor;_commandEncoder;_depthResolve=null;_encoder=null;_pipeline=null;_rasterizationDisabled=!1;_resourceBindings=null;_resourcesDirty=!1;_constants;_renderSize=[0,0];_debugDepth=0;_patch=null;_vertexBindings=new Map;_patchConstants=null;_viewport=[0,0,1,1];_patchBindGroups=new Map;_patchWords=new Uint32Array(0);_patchFloats=new Float32Array(0);_patchAttributeBuffers=[];_patchResources=[];_patchKey=[];_lastPatchKey=[];_lastPatchBindGroup=null;_bufferIds=new WeakMap;_nextBufferId=0;_placeholderStorage=null;_preEncoder=null;_depthReadEncoder=null;_depthReads=new Set;_depthRead=u(e=>{if(this._depthReads.has(e))return;this._depthReads.add(e);const t=this._hgi.getPrimaryDevice();this._depthReadEncoder??=t.createCommandEncoder({label:"HgiWebGPUGraphicsCmds depth sampling"}),e.encodeShaderRead(t,this._depthReadEncoder)},"_depthRead");_prePass=null;_packSerial=null;_packed=new Set;_packEncoder=u(()=>(this._prePass?.end(),this._prePass=null,this._prePassEncoder()),"_packEncoder");_written=new Set;_write=u(e=>{this._written.add(e)},"_write");_tessFrame=null;_tessDraws=new Map;constructor(e,t){super(),this._hgi=e,this._descriptor=t;const n=e.getPrimaryDevice();if(this._commandEncoder=n.createCommandEncoder({label:"HgiWebGPUGraphicsCmds"}),this._constants=new zt(n,e.getCapabilities().minUniformBufferOffsetAlignment),gt(t.colorTextures.length===t.colorAttachmentDescs.length,"desc.colorTextures.size() == desc.colorAttachmentDescs.size()"),t.colorResolveTextures.length>0&&t.colorResolveTextures.length!==t.colorTextures.length){w("color and resolve texture count mismatch.");return}if(t.depthResolveTexture.isSet()&&!t.depthTexture.isSet()){w("DepthResolve texture without depth texture.");return}if(!t.hasAttachments())return;const r=[],s=t.colorResolveTextures.length>0;for(let o=0;o<t.colorAttachmentDescs.length;o++){const c=t.colorAttachmentDescs[o],l=t.colorTextures[o].Get();gt(l.getDescriptor().format===c.format,"colorTexture->GetDescriptor().format == hgiColorAttachment.format");const d=c.clearValue.data,f={view:l.getTextureView(),loadOp:B.getAttachmentLoadOp(c.loadOp),storeOp:B.getAttachmentStoreOp(c.storeOp),clearValue:{r:d[0],g:d[1],b:d[2],a:d[3]}};if(s){const h=t.colorResolveTextures[o].Get();f.resolveTarget=h.getTextureView()}if(r.push(f),o===0){const h=l.getDescriptor().dimensions.data;this._renderSize=[h[0],h[1]]}}let a;if(t.depthTexture.isSet()){const o=t.depthAttachmentDesc,c=t.depthTexture.Get();gt(c.getDescriptor().format===o.format,"depthTexture->GetDescriptor().format == hgiDepthAttachment.format"),a={view:c.getTextureView(),depthLoadOp:B.getAttachmentLoadOp(o.loadOp),depthStoreOp:B.getAttachmentStoreOp(o.storeOp),depthClearValue:o.clearValue.data[0]};const l=c.getGpuFormat();if(l&&B.hasStencil(l)&&(a.stencilLoadOp=B.getAttachmentLoadOp(o.loadOp),a.stencilStoreOp=B.getAttachmentStoreOp(o.storeOp),a.stencilClearValue=o.clearValue.data[1]),t.depthResolveTexture.isSet()){const d=t.depthResolveTexture.Get().getTextureId(),f=c.getTextureId();d&&f&&(this._depthResolve={source:f,target:d})}if(r.length===0){const d=c.getDescriptor().dimensions.data;this._renderSize=[d[0],d[1]]}}this._encoder=this._commandEncoder.beginRenderPass({label:"HgiWebGPUGraphicsCmds",colorAttachments:r,...a?{depthStencilAttachment:a}:{}})}pushDebugGroup(e,t=vt.s_graphicsDebugColor){this._encoder?.pushDebugGroup(e),this._debugDepth++}popDebugGroup(){this._debugDepth!==0&&(this._encoder?.popDebugGroup(),this._debugDepth--)}insertDebugMarker(e,t=vt.s_markerDebugColor){this._encoder?.insertDebugMarker(e)}setViewport(e){const[t,n,r,s]=e.data;this._encoder?.setViewport(t,n,r,s,0,1),this._viewport=[t,n,r,s]}setScissor(e){const[t,n,r,s]=e.data,[a,o]=this._renderSize,c=Math.min(Math.max(t,0),a),l=Math.min(Math.max(n,0),o);this._encoder?.setScissorRect(c,l,Math.max(0,Math.min(t+r,a)-c),Math.max(0,Math.min(n+s,o)-l))}bindPipeline(e){const t=e.Get(),n=t?.getRenderPipelineState(),r=t?.getComputePipelineState();if(this._encoder&&(t?.isRasterizationDisabled()||t?.exceedsDeviceLimits())){this._pipeline=t,this._patch=null,this._patchConstants=null,this._rasterizationDisabled=!0;return}if(this._rasterizationDisabled=!1,!this._encoder||!t||!n&&!r){w("HgiWebGPU: BindPipeline with an invalid pipeline"),this._pipeline=null;return}if(this._pipeline=t,this._patch=t.getPatchEmulation(),this._patchConstants=null,!n){this._resourcesDirty=!0;return}this._encoder.setPipeline(n);const s=t.getDescriptor(),a=s.colorAttachmentDescs[0]?.blendConstantColor.data;a&&this._encoder.setBlendConstant({r:a[0],g:a[1],b:a[2],a:a[3]}),s.depthState.stencilTestEnabled&&this._encoder.setStencilReference(s.depthState.stencilFront.referenceValue);const o=t.getBindGroupLayouts();o.layouts.forEach((c,l)=>{o.entries[l].length===0&&this._encoder.setBindGroup(l,this._hgi._getEmptyBindGroup(c))}),this._resourcesDirty=!0}bindResources(e){this._resourceBindings=e.Get(),this._resourcesDirty=!0}setConstantValues(e,t,n,r,s){const a=e.Get();if(!(!this._encoder||!a||a.isRasterizationDisabled()||a.exceedsDeviceLimits())){if(a.getPatchEmulation()){this._patchConstants=this._constants.allocateSlot(r,ht(s,0,r));return}ps.setConstantValues(this._constants,this._encoder,a.getBindGroupLayouts(),r,s)}}bindVertexBuffers(e){for(const t of e){const n=t.buffer.Get(),r=n?.getBufferId();r&&(this._encoder?.setVertexBuffer(t.index,r,t.byteOffset),this._vertexBindings.set(t.index,{buffer:r,source:n,byteOffset:t.byteOffset}))}}draw(e,t,n,r){if(!this._rasterizationDisabled){if(this._isPulledVertexDraw()){this._drawPatches({patchStart:0,patchCount:e,instanceCount:n,baseInstance:r,baseVertex:t,drawIndex:r,indexBuffer:null});return}if(this._patch){this._drawPatches({patchStart:0,patchCount:Math.floor(e/this._patch.controlPoints),instanceCount:n,baseInstance:r,baseVertex:0,drawIndex:r,indexBuffer:null});return}this._syncResources()&&this._encoder.draw(e,n,t,r)}}drawIndirect(e,t,n,r){if(this._rasterizationDisabled)return;if(this._isPulledVertexDraw()){const a=e.Get()?.getCPUStagingAddress();if(!a)return;const o=new Uint32Array(a.buffer,a.byteOffset,Math.floor(a.byteLength/4));for(let c=0;c<n;c++){const l=(t+c*r)/4;this._drawPatches({patchStart:0,patchCount:o[l]??0,instanceCount:o[l+1]??0,baseVertex:o[l+2]??0,baseInstance:o[l+3]??0,drawIndex:c,indexBuffer:null})}return}if(this._patch){w("HgiWebGPU: DrawIndirect of patches is not supported");return}if(!this._syncResources())return;const s=e.Get()?.getBufferId();if(s)for(let a=0;a<n;a++)this._encoder.drawIndirect(s,t+a*r)}drawIndexed(e,t,n,r,s,a){if(this._rasterizationDisabled)return;const o=e.Get(),c=o?.getBufferId();if(this._patch){this._drawPatches({patchStart:Math.floor(n/4),patchCount:t,instanceCount:s,baseInstance:a,baseVertex:r,drawIndex:a,indexBuffer:c?o:null});return}this._syncResources()&&c&&(this._encoder.setIndexBuffer(c,"uint32",n),this._encoder.drawIndexed(t,s,0,r,a))}drawIndexedIndirect(e,t,n,r,s,a,o){if(this._rasterizationDisabled)return;if(this._isPulledVertexDraw()){const d=ga(e);for(let f=0;f<r;f++){const h=f*s/4;this._drawPatches({patchCount:a[h]??0,instanceCount:a[h+1]??0,patchStart:a[h+2]??0,baseVertex:a[h+3]??0,baseInstance:a[h+4]??0,drawIndex:f,indexBuffer:d})}return}if(this._patch){const d=ga(e);for(let f=0;f<r;f++){const h=f*s/4,p=(o+f*s)/4;this._drawPatches({patchCount:a[h]??0,instanceCount:a[h+1]??0,patchStart:a[h+2]??0,baseInstance:a[h+3]??0,baseVertex:a[p]??0,drawIndex:f,indexBuffer:d})}return}if(!this._syncResources())return;const c=e.Get()?.getBufferId(),l=t.Get()?.getBufferId();if(!(!c||!l)){this._encoder.setIndexBuffer(c,"uint32");for(let d=0;d<r;d++)this._encoder.drawIndexedIndirect(l,n+d*s)}}_drawPatches(e){const t=this._patch;if(t.primitive==="control"){this._dispatchControl(e);return}if(!this._syncResources()||e.patchCount===0||e.instanceCount===0)return;let n=null;if(t.tessellated){const s=this._tessFactorsBinding(Kl.HgiBindResourceTypeTessFactors,null);if(n=s?this._tessDraws.get(this._tessKey(s,e))??null:null,!n){w(`HgiWebGPU: patch draw '${this._pipeline.getDescriptor().debugName}' has per-patch tessellation factors but no post-tessellation control stage ran for it`);return}}const r=this._patchConstantsBindGroup(e,n);if(r){if(this._encoder.setBindGroup(Ge,r.bindGroup,r.offsets),n){this._encoder.setIndexBuffer(n.indices,"uint32"),this._encoder.drawIndexedIndirect(n.argsBuffer,n.argsOffset);return}this._encoder.draw(e.patchCount*t.verticesPerPatch,e.instanceCount,0,e.baseInstance)}}_polygonModeLineFlags(){if(!this._patch?.lines)return 0;const e=this._pipeline.getDescriptor().rasterizationState,t=B.getCullMode(e.cullMode);return(t==="front"?1:t==="back"?2:0)|(B.getWinding(e.winding)==="ccw"?4:0)}_patchConstantsBindGroup(e,t){const n=this._patch,r=this._pipeline.getBindGroupLayouts(),s=r.layouts[Ge],a=r.entries[Ge];if(!s||!a)return null;const o=24+4*n.attributeSlots;this._patchWords.length<o&&(this._patchWords=new Uint32Array(o),this._patchFloats=new Float32Array(this._patchWords.buffer));const c=this._patchWords,l=this._patchFloats;c.fill(0,0,o),c[0]=e.patchStart,c[1]=e.baseInstance,c[2]=e.baseVertex,c[3]=e.indexBuffer?1:0;for(let S=0;S<4;S++)l[4+S]=this._viewport[S];c[8]=e.patchCount,c[9]=t?1:0,c[10]=this._polygonModeLineFlags();for(let S=0;S<12;S++)l[12+S]=n.corners[S]??0;let d=null;if(n.packed){const S=[];e.indexBuffer&&S.push(e.indexBuffer);for(const T of n.attributes){const C=this._vertexBindings.get(T.bindingIndex)?.source;C&&!S.includes(C)&&S.push(C)}const x=this._hgi._getPulledAttributePacker();if(this._packSerial??=x.beginCmds(),d=x.pack(this._packSerial,S,T=>this._written.has(T),this._packEncoder),!d)return null;this._packed.add(d),e.indexBuffer&&(c[11]=d.bases.get(e.indexBuffer.getBufferId())/4)}const f=this._patchAttributeBuffers;f.length=0;for(const S of n.attributes){const x=this._vertexBindings.get(S.bindingIndex);if(!x||x.byteOffset%4!==0)return w(`HgiWebGPU: no 4-byte aligned vertex buffer bound at ${S.bindingIndex} for patch attribute location ${S.location}`),null;const T=S.stride/4;let C=((d?.bases.get(x.buffer)??0)+x.byteOffset+S.offset)/4,U=0,V=0,q=0;switch(S.stepFunction){case Wt.HgiVertexBufferStepFunctionPerDrawCommand:C+=T*e.drawIndex;break;case Wt.HgiVertexBufferStepFunctionConstant:break;case Wt.HgiVertexBufferStepFunctionPerInstance:V=T;break;case Wt.HgiVertexBufferStepFunctionPerPatch:q=T;break;default:C+=T*e.baseVertex,U=T}const we=24+4*S.location;c[we]=C,c[we+1]=(U|(S.packedInt1010102?2147483648:0))>>>0,c[we+2]=V,c[we+3]=q,f[S.location]=x.buffer}const h=this._constants.allocateSlot(o*4,new Uint8Array(c.buffer,0,o*4)),p=this._patchResources;p.length=0;const m=[],g=this._patchKey;g.length=0,g.push(this._bufferId(s));for(const S of a){let x;if(S.binding===0){if(!this._patchConstants)return w("HgiWebGPU: patch draw without constant values"),null;x={buffer:this._patchConstants.buffer,offset:0,size:this._patchConstants.size},m.push(this._patchConstants.offset)}else if(S.binding===qr)x={buffer:h.buffer,offset:0,size:h.size},m.push(h.offset);else if(S.binding===jr)x={buffer:d?.buffer??e.indexBuffer?.getBufferId()??this._PlaceholderStorage()};else if(S.binding===Yr)x={buffer:t?.points??this._PlaceholderStorage()};else{const T=f[S.binding-Qr];if(!T)return w(`HgiWebGPU: nothing to bind at constants binding ${S.binding}`),null;x={buffer:T}}p.push(x),g.push(S.binding,this._bufferId(x.buffer),x.size??-1)}const _=this._lastPatchKey;if(this._lastPatchBindGroup&&_.length===g.length&&g.every((S,x)=>S===_[x]))return{bindGroup:this._lastPatchBindGroup,offsets:m};const b=g.join(",");let y=this._patchBindGroups.get(b);return y||(y=this._hgi.getPrimaryDevice().createBindGroup({label:"HgiWebGPU patch draw",layout:s,entries:a.map((S,x)=>({binding:S.binding,resource:p[x]}))}),this._patchBindGroups.set(b,y)),this._lastPatchKey=g.slice(),this._lastPatchBindGroup=y,{bindGroup:y,offsets:m}}_dispatchControl(e){const t=this._pipeline,n=this._patch,r=t.getComputePipelineState();if(!r||!n.tessellation||e.patchCount===0||e.instanceCount===0)return;const s=this._tessFactorsBinding(null,n.tessFactorsBindIndex);if(!s){w(`HgiWebGPU: '${t.getDescriptor().debugName}' binds no tessellation factor buffer`);return}const a=this._patchConstantsBindGroup(e,null);if(!a)return;const o=this._hgi.getPrimaryDevice(),c=this._PrePass();c.setPipeline(r);const l=t.getBindGroupLayouts();l.layouts.forEach((h,p)=>{l.entries[p].length===0&&c.setBindGroup(p,this._hgi._getEmptyBindGroup(h))}),this._resourceBindings?.bindResources(o,c,l,this._depthRead,this._write),c.setBindGroup(Ge,a.bindGroup,a.offsets),c.dispatchWorkgroups(Math.ceil(e.patchCount/64),e.instanceCount);const d=this._hgi._getTessellation();this._tessFrame??=d.beginFrame();const f=d.encode(this._tessFrame,{pass:u(()=>this._PrePass(),"pass"),suspend:u(h=>{this._prePass?.end(),this._prePass=null,h(this._prePassEncoder())},"suspend"),allocateParams:u(h=>this._constants.allocateSlot(h.byteLength,h),"allocateParams"),factors:s.buffer,factorsByteOffset:s.offset,patchStart:e.patchStart,patchCount:e.patchCount,instanceCount:e.instanceCount,config:n.tessellation});f&&this._tessDraws.set(this._tessKey(s,e),f)}_tessFactorsBinding(e,t){const r=this._resourceBindings?.getDescriptor()?.buffers.find(a=>e!==null?a.resourceType===e:a.bindingIndex===t),s=r?.buffers[0]?.Get()?.getBufferId();return s?{buffer:s,offset:r.offsets[0]??0}:null}_tessKey(e,t){return[this._bufferId(e.buffer),e.offset,t.patchStart,t.patchCount,t.baseVertex,t.baseInstance,t.instanceCount].join(":")}_prePassEncoder(){return this._preEncoder??=this._hgi.getPrimaryDevice().createCommandEncoder({label:"HgiWebGPUGraphicsCmds tessellation"}),this._preEncoder}_PrePass(){return this._prePass??=this._prePassEncoder().beginComputePass({label:"HgiWebGPUGraphicsCmds tessellation"}),this._prePass}_isPulledVertexDraw(){const e=this._patch?.primitive;return e==="vertex"||e==="point"}_bufferId(e){let t=this._bufferIds.get(e);return t===void 0&&(t=this._nextBufferId++,this._bufferIds.set(e,t)),t}_PlaceholderStorage(){return this._placeholderStorage??=this._hgi.getPrimaryDevice().createBuffer({label:"HgiWebGPU placeholder",size:16,usage:128}),this._placeholderStorage}insertMemoryBarrier(e){gt(e===fs.HgiMemoryBarrierAll,"Unknown barrier")}_syncResources(){return!this._encoder||!this._pipeline?(w("HgiWebGPU: draw without a bound pipeline"),!1):(this._resourcesDirty&&this._resourceBindings&&this._resourceBindings.bindResources(this._hgi.getPrimaryDevice(),this._encoder,this._pipeline.getBindGroupLayouts(),this._depthRead,this._write),this._resourcesDirty=!1,!0)}_submit(e,t){if(!this._commandEncoder)return!1;for(;this._debugDepth>0;)this.popDebugGroup();this._encoder?.end(),this._encoder=null,this._depthResolve&&(id(this._hgi.getPrimaryDevice(),this._commandEncoder,this._depthResolve.source,this._depthResolve.target),this._depthResolve=null);const n=this._hgi.getPrimaryDevice().queue;this._depthReadEncoder&&(this._hgi._submitNow([this._depthReadEncoder.finish()]),this._depthReadEncoder=null,this._depthReads.clear());let r=null,s=null;this._packed.size>0&&(this._hgi._getPulledAttributePacker().refresh(this._packed,()=>s??=this._hgi.getPrimaryDevice().createCommandEncoder({label:"HgiWebGPUGraphicsCmds packed attributes"})),this._packed.clear()),s&&this._hgi._submitNow([s.finish()]),this._preEncoder?(this._prePass?.end(),this._prePass=null,this._tessFrame&&(r=this._hgi._getTessellation().endFrame(this._tessFrame,this._preEncoder)),this._constants.flush(),this._hgi._submitNow([this._preEncoder.finish(),this._commandEncoder.finish()]),this._preEncoder=null,this._tessFrame=null,this._tessDraws.clear()):(this._constants.flush(),this._hgi._submitNow([this._commandEncoder.finish()])),r?.();for(const o of this._written)o._noteWrite();this._written.clear(),this._commandEncoder=null;const a=n.onSubmittedWorkDone().then(()=>(this._constants.destroy(),this._placeholderStorage?.destroy(),!0));return t===An.HgiSubmitWaitTypeWaitUntilCompleted?a:!0}}function ga(i){const e=i.Get();return e?.getBufferId()?e:null}u(ga,"_IndexSource");function _a(i){return{compare:B.getCompareFunction(i.compareFn),failOp:B.getStencilOp(i.stencilFailOp),depthFailOp:B.getStencilOp(i.depthFailOp),passOp:B.getStencilOp(i.depthStencilPassOp)}}u(_a,"_CreateStencilDescriptor");const sd=new ds("HGIWEBGPU_FORCE_PACKED_ATTRIBUTES",!1,"HgiWebGPU: pull the attributes of emulated patch and vertex-pulling draws from one packed buffer");class ba extends El{static{u(this,"HgiWebGPUGraphicsPipeline")}_renderPipelineState=null;_bindGroupLayouts={layouts:[],entries:[]};_pipelineLayout=null;_patchEmulation=null;_computePipelineState=null;_rasterizationDisabled=!1;_exceedsDeviceLimits=!1;_pendingDescriptor=null;_device;constructor(e,t,n,r=!1){super(t),this._device=e,this._createRenderPipelineState(e,n,r)}_createVertexDescriptor(){const e=[];for(const t of this._descriptor.vertexBuffers){const n=[];for(const s of t.vertexAttributes){const a=B.getVertexFormat(s.format);if(!a){w(`HgiWebGPU: ${W[s.format]} has no WebGPU vertex format`);continue}n.push({format:a,offset:s.offset,shaderLocation:s.shaderBindLocation})}const r=t.vertexStepFunction===Wt.HgiVertexBufferStepFunctionConstant;for(;e.length<t.bindingIndex;)e.push(null);e[t.bindingIndex]={arrayStride:r?0:t.vertexStride,stepMode:B.getVertexStepMode(t.vertexStepFunction),attributes:n}}return e}_createRenderPipelineState(e,t,n=!1){const r=this._descriptor,s=r.shaderProgram.Get(),a=r.primitiveType===on.HgiPrimitiveTypePatchList,o=a&&r.tessellationState.tessFactorMode===Zt.TessFactorMode.TessControl;let c=(a?o?s?.getPostTessControlFunction():s?.getPostTessVertexFunction():s?.getVertexFunction())??null,l=s?.getFragmentFunction()??null;const d=a?null:c?.getPostTessVertexInfo()?.primitive??null,f=a||d!==null;if(f&&!this._initPatchEmulation(c))return;const h=r.rasterizationState,p=this._patchEmulation;let m=!1;if(h.polygonMode===ar.HgiPolygonModeLine&&p&&(p.primitive==="triangle"||p.primitive==="quad")&&!p.tessellated){const v=c?.getPolygonModeLineVariant()??null,F=l?l.getPolygonModeLineVariant():null,X=v?.getPostTessVertexInfo();if(!v?.isValid()||!X||l&&!F?.isValid()){w(`HgiWebGPU: '${r.debugName}': the HgiPolygonModeLine variants did not compile: ${v?.getCompileErrors()??""} ${F?.getCompileErrors()??""}`);return}c=v,l=F,p.verticesPerPatch=X.verticesPerPatch,p.lines=!0,m=!0}if(p?.tessellated&&(c=c?.getVariant({tessellatedPatches:!0})??null),!c?.getShaderId()){w(`HgiWebGPU: pipeline '${r.debugName}' has no valid vertex function`);return}const g=r.multiSampleState,_=g.alphaToCoverageEnable&&g.alphaToOneEnable&&g.sampleCount>or.HgiSampleCount1&&!!l&&h.rasterizerEnabled;if(_){const v=s.getFragmentFunction().getAlphaToOneVariant(m);if(!v?.isValid()){w(`HgiWebGPU: '${r.debugName}': the alpha-to-one variant did not compile: ${v?.getCompileErrors()??""}`);return}l=v}const b=u(()=>Zo(e,(o?[c]:[c,l]).map(v=>v?.getBindGroupLayoutInfo()??[]),r.debugName),"layoutsOf");if(this._bindGroupLayouts=b(),p&&(this._bindGroupLayouts.exceeded||Zi(sd))){const v=c.getVariant({polygonModeLine:m,tessellatedPatches:p.tessellated,packedAttributes:!0});v?.getShaderId()&&(c=v,p.packed=!0,this._bindGroupLayouts=b())}l&&c!==s?.getVertexFunction()&&c!==s?.getPostTessVertexFunction()&&c.matchInterstageOutputs(l);const y=this._bindGroupLayouts.exceeded;if(y){w(`HgiWebGPU: pipeline '${r.debugName}' exceeds the device's binding limits: ${y.join(", ")}; its draws are skipped`),this._exceedsDeviceLimits=!0;return}if(this._pipelineLayout=e.createPipelineLayout({label:r.debugName,bindGroupLayouts:this._bindGroupLayouts.layouts}),o){try{this._computePipelineState=e.createComputePipeline({label:r.debugName,layout:this._pipelineLayout,compute:{module:c.getShaderId(),entryPoint:c.getEntryPoint()}})}catch(v){Ne(`Failed to created pipeline state, error ${String(v)}`)}return}if(!h.rasterizerEnabled){this._rasterizationDisabled=!0;return}const S=m?"line-list":a||d==="point"?"triangle-list":B.getPrimitiveTopology(r.primitiveType);if(!S){w(`HgiWebGPU: primitive type ${on[r.primitiveType]} is not supported by WebGPU`);return}h.polygonMode!==ar.HgiPolygonModeFill&&!m&&Ne(`HgiWebGPU: polygon mode ${ar[h.polygonMode]} is not supported; '${r.debugName}' fills`),h.depthClampEnabled&&!t.unclippedDepth&&Ne(`HgiWebGPU: depth clamp needs the depth-clip-control feature ('${r.debugName}')`);const x=[],T=new Set(l?.getColorOutputLocations()??[]);for(const[v,F]of r.colorAttachmentDescs.entries()){const X=B.getPixelFormat(F.format,F.usage);if(!X){w(`HgiWebGPU: color attachment ${W[F.format]} has no WebGPU format`);return}const ne={format:X,writeMask:T.has(v)?B.getColorWriteMask(F.colorMask):0};F.blendEnabled&&(ne.blend={color:{srcFactor:B.getBlendFactor(F.srcColorBlendFactor),dstFactor:B.getBlendFactor(F.dstColorBlendFactor),operation:B.getBlendEquation(F.colorBlendOp)},alpha:{srcFactor:B.getBlendFactor(F.srcAlphaBlendFactor),dstFactor:B.getBlendFactor(F.dstAlphaBlendFactor),operation:B.getBlendEquation(F.alphaBlendOp)}}),x.push(ne)}const C=r.depthAttachmentDesc,U=B.getPixelFormat(C.format,C.usage|Ht.HgiTextureUsageBitsDepthTarget);let V;if(C.format!==W.HgiFormatInvalid&&U){const v=r.depthState;V={format:U,depthCompare:v.depthTestEnabled?B.getCompareFunction(v.depthCompareFn):"always",depthWriteEnabled:v.depthTestEnabled&&v.depthWriteEnabled},v.depthBiasEnabled&&(V.depthBias=Math.trunc(v.depthBiasConstantFactor),V.depthBiasSlopeScale=v.depthBiasSlopeFactor),v.stencilTestEnabled&&B.hasStencil(U)&&(V.stencilBack=_a(v.stencilFront),V.stencilFront=_a(v.stencilBack),V.stencilReadMask=v.stencilFront.readMask,V.stencilWriteMask=v.stencilFront.writeMask)}const q=r.multiSampleState.sampleCount,we=!!l?.getShaderId(),ve={label:r.debugName,layout:this._pipelineLayout,vertex:{module:c.getShaderId(),entryPoint:c.getEntryPoint(),buffers:f?[]:this._createVertexDescriptor()},...we?{fragment:{module:l.getShaderId(),entryPoint:l.getEntryPoint(),targets:x}}:{},primitive:{topology:S,...S==="line-strip"?{stripIndexFormat:"uint32"}:{},cullMode:B.getCullMode(h.cullMode),frontFace:B.getWinding(h.winding),...h.depthClampEnabled&&t.unclippedDepth?{unclippedDepth:!0}:{}},...V?{depthStencil:V}:{},multisample:{count:q>or.HgiSampleCount1?q:1,alphaToCoverageEnabled:!_&&r.multiSampleState.alphaToCoverageEnable&&q>or.HgiSampleCount1&&we&&!l.getDescriptor().stageOutputs.some(v=>v.role===L.hdSampleMask)}};if(n&&typeof e.createRenderPipelineAsync=="function"){this._pendingDescriptor=ve,e.createRenderPipelineAsync(ve).then(v=>{this._pendingDescriptor===ve&&(this._pendingDescriptor=null,this._renderPipelineState=v)},()=>{});return}this._createRenderPipelineNow(e,ve)}_createRenderPipelineNow(e,t){try{this._renderPipelineState=e.createRenderPipeline(t)}catch(n){Ne(`Failed to created pipeline state, error ${String(n)}`)}}_isCompilingAhead(){return this._pendingDescriptor!==null}_initPatchEmulation(e){const t=this._descriptor,n=e?.getPostTessVertexInfo()??null;if(!n)return w(`HgiWebGPU: patch pipeline '${t.debugName}' has no post tess vertex function`),!1;const r=t.tessellationState,s=n.primitive==="vertex"||n.primitive==="point";let a=!1;if(!s)switch(r.tessFactorMode){case Zt.TessFactorMode.Constant:break;case Zt.TessFactorMode.TessVertex:a=!0;break;case Zt.TessFactorMode.TessControl:break;default:return w(`HgiWebGPU: tess factor mode ${r.tessFactorMode} of '${t.debugName}' is unknown`),!1}if(!s&&r.patchType===Zt.PatchType.Isoline)return w(`HgiWebGPU: isoline patches of '${t.debugName}' are not supported`),!1;let o=null,c=[];if(!s){const d=r.patchType===Zt.PatchType.Triangle?"tri":"quad",f=Bu(Eu(t.rasterizationState.winding)),p=t.shaderProgram.Get()?.getPostTessVertexFunction();o={domain:d,partitioning:Gu(p?.getDescriptor().tessellationDescriptor.spacing??0),outputPrimitive:f},c=Lu(d)}const l=[];for(const d of n.attributes){let f=!1;for(const h of t.vertexBuffers){const p=h.vertexAttributes.find(x=>x.shaderBindLocation===d.location);if(!p)continue;f=!0;const m=Jn(p.format),g=m===W.HgiFormatFloat32?"f32":m===W.HgiFormatInt32?"i32":null,_=/^(?:vec([234])<(f32|i32|u32)>|(f32|i32|u32))$/.exec(d.wgslType),b=_?.[1]?Number(_[1]):1,y=_?.[2]??_?.[3],S=p.format===W.HgiFormatPackedInt1010102&&(d.wgslType==="vec3<f32>"||d.wgslType==="vec4<f32>");if(!S&&(!g||Gl(p.format)!==b||y==="f32"!=(g==="f32")))return w(`HgiWebGPU: '${t.debugName}' location ${d.location}: format ${W[p.format]} cannot be pulled as ${d.wgslType}`),!1;if(p.offset%4!==0||h.vertexStride%4!==0)return w(`HgiWebGPU: '${t.debugName}' location ${d.location} is not 4-byte aligned`),!1;l.push({location:d.location,bindingIndex:h.bindingIndex,offset:p.offset,stride:h.vertexStride,stepFunction:h.vertexStepFunction,...S?{packedInt1010102:!0}:{}});break}if(!f)return w(`HgiWebGPU: '${t.debugName}' has no vertex attribute for location ${d.location}`),!1}return this._patchEmulation={primitive:n.primitive,verticesPerPatch:n.verticesPerPatch,controlPoints:s?1:r.primitiveIndexSize,attributeSlots:n.attributeSlots,attributes:l,tessellated:a,tessellation:o,corners:c,tessFactorsBindIndex:n.tessFactorsBindIndex,lines:!1,packed:!1},!0}getPatchEmulation(){return this._patchEmulation}_destroy(){this._pendingDescriptor=null,this._renderPipelineState=null,this._computePipelineState=null,this._rasterizationDisabled=!1,this._exceedsDeviceLimits=!1,this._pipelineLayout=null,this._patchEmulation=null,this._bindGroupLayouts={layouts:[],entries:[]}}isRasterizationDisabled(){return this._rasterizationDisabled}exceedsDeviceLimits(){return this._exceedsDeviceLimits}getRenderPipelineState(){const e=this._pendingDescriptor;return e&&(this._pendingDescriptor=null,this._createRenderPipelineNow(this._device,e)),this._renderPipelineState}getComputePipelineState(){return this._computePipelineState}getBindGroupLayouts(){return this._bindGroupLayouts}}class ad extends Ll{static{u(this,"HgiWebGPUSampler")}_samplerId;_device;_smpDesc;_footprintSamplerId=null;constructor(e,t){super(t);const n={label:t.debugName,addressModeU:B.getSamplerAddressMode(t.addressModeU),addressModeV:B.getSamplerAddressMode(t.addressModeV),addressModeW:B.getSamplerAddressMode(t.addressModeW),minFilter:B.getMinMagFilter(t.minFilter),magFilter:B.getMinMagFilter(t.magFilter),mipmapFilter:B.getMipFilter(t.mipFilter)};t.mipFilter===Mr.HgiMipFilterNotMipmapped&&(n.lodMaxClamp=0),t.enableCompare&&(n.compare=B.getCompareFunction(t.compareFunction)),t.minFilter===Ni.HgiSamplerFilterLinear&&t.magFilter===Ni.HgiSamplerFilterLinear&&t.mipFilter===Mr.HgiMipFilterLinear&&(n.maxAnisotropy=Math.max(1,Math.floor(Math.min(16,t.maxAnisotropy,Zi(Al))))),this._samplerId=e.createSampler(n),this._device=e,this._smpDesc=n}getBorderFootprintSamplerId(){return this._samplerId?(this._footprintSamplerId??=this._device.createSampler({...this._smpDesc,label:`${this._smpDesc.label??""} border footprint`,addressModeU:"repeat",addressModeV:"repeat",addressModeW:"repeat"}),this._footprintSamplerId):null}_destroy(){this._samplerId=null,this._footprintSamplerId=null}getRawResource(){return this._samplerId}getSamplerId(){return this._samplerId}}const od={Translate(i){return{declarations:i.declarations,code:i.code,errors:""}}},cd=/@(group|binding)\s*\(\s*(\d+)\s*\)\s*@(group|binding)\s*\(\s*(\d+)\s*\)\s*var\s*(?:<[^>]*>)?\s*([A-Za-z_]\w*)/g;function ld(i){const e=tc(i),t=new Map;for(const n of e.matchAll(cd)){if(n[1]===n[3])continue;const r=n[1]==="group"?n[2]:n[4],s=n[1]==="group"?n[4]:n[2];t.set(`${r}:${s}`,n[5])}return t}u(ld,"HgiWebGPUResourceVariables");function ud(i,e){const t=tc(i),n=new Map,r=/\bfn\s+([A-Za-z_]\w*)\s*\(/g;for(let c=r.exec(t);c;c=r.exec(t)){const l=t.indexOf("{",c.index);if(l<0)break;let d=0,f=l;for(;f<t.length;f++){const h=t[f];if(h==="{")d++;else if(h==="}"&&--d===0)break}n.set(c[1],fd(t.slice(c.index+c[0].length,f+1))),r.lastIndex=f+1}if(!n.has(e))return null;const s=new Set,a=new Set,o=[e];for(;o.length;){const c=o.pop();if(!a.has(c)){a.add(c);for(const l of n.get(c))s.add(l),n.has(l)&&!a.has(l)&&o.push(l)}}return s}u(ud,"HgiWebGPUStaticallyUsedNames");const Sa=u(i=>i>=97&&i<=122||i>=65&&i<=90||i===95||i>=48&&i<=57,"_isWord"),dd=u(i=>i>=97&&i<=122||i>=65&&i<=90||i===95,"_isWordStart");function fd(i){const e=[],t=i.length;let n=0;for(;n<t;){const r=i.charCodeAt(n);if(!Sa(r)){n++;continue}let s=n+1;for(;s<t&&Sa(i.charCodeAt(s));)s++;if(dd(r)){let a=n-1;for(;a>=0&&/\s/.test(i[a]);)a--;a>=0&&i.charCodeAt(a)===46||e.push(i.slice(n,s))}n=s}return e}u(fd,"_identifiers");let ya,fr="";function tc(i){if(!i.includes("/"))return i;if(i===ya)return fr;const e=[];let t=0,n=0;for(;t<i.length;){const r=i.indexOf("/",t);if(r<0)break;t=r;const s=i[t+1];if(s==="/"){for(e.push(i.slice(n,t));t<i.length&&i[t]!==`
`;)t++;n=t}else if(s==="*"){e.push(i.slice(n,t));let a=0;for(;t<i.length;)if(i[t]==="/"&&i[t+1]==="*")a++,t+=2;else if(i[t]==="*"&&i[t+1]==="/"){if(t+=2,--a===0)break}else t++;e.push(" "),n=t}else t++}return e.push(i.slice(n)),ya=i,fr=e.join(""),fr}u(tc,"_stripComments");class Pt extends bu{static{u(this,"HgiWebGPUShaderSection")}constructor(e,t=[],n="",r="",s=""){super(e,t,n,r,s)}writeAttributes(e){for(const t of this.getAttributes())e.write("@",t.identifier),t.index&&e.write("(",t.index,")"),e.write(" ")}writeParameter(e){this.writeIdentifier(e),e.write(": "),this.writeType(e)}visitGlobalIncludes(e){return!1}visitGlobalStructs(e){return!1}visitGlobalMemberDeclarations(e){return!1}visitGlobalFunctionDefinitions(e){return!1}visitEntryPointInputs(e){return!1}visitEntryPointOutputs(e){return!1}visitEntryPointFunctionExecutions(e,t){return!1}visitEntryPointOutputExecutions(e,t){return!1}}class xa extends Pt{static{u(this,"HgiWebGPUMacroShaderSection")}constructor(e,t){super(e),this._macroComment=t}visitGlobalIncludes(e){return e.write("// ",this._macroComment,`
`),this.writeIdentifier(e),!0}}class fe extends Pt{static{u(this,"HgiWebGPUMemberShaderSection")}constructor(e,t,n,r,s,a="",o=""){super(e,[],"",a,o),this._typeName=t,this._interpolation=n,this._sampling=r,this._io=s}getStageIO(){return this._io}writeType(e){const t=this.getArraySize();t?e.write("array<",this._typeName,", ",t,">"):e.write(this._typeName)}writeArraySize(e){}visitGlobalMemberDeclarations(e){return this.hasBlockInstanceIdentifier()||(e.write("var<private> "),this.writeParameter(e),e.write(`;
`)),!0}writeInterpolation(e,t){const n=/(^|<)(i32|u32)>?$/.test(t)||t==="i32"||t==="u32";if(this._interpolation===Nr.HgiInterpolationFlat||n){e.write("@interpolate(flat) ");return}const r=this._interpolation===Nr.HgiInterpolationNoPerspective?"linear":"perspective";this._sampling===Or.HgiSamplingCentroid?e.write("@interpolate(",r,", centroid) "):this._sampling===Or.HgiSamplingSample?e.write("@interpolate(",r,", sample) "):r==="linear"&&e.write("@interpolate(linear) ")}getInterstageLocation(){const e=this._io?/^@location\((\d+)\)$/.exec(this._io.attribute):null;return e?Number(e[1]):null}getInterpolation(){return this._interpolation}getSampling(){return this._sampling}setInterpolation(e,t){return this._interpolation===e&&this._sampling===t?!1:(this._interpolation=e,this._sampling=t,!0)}getIOName(){return this._ioName()}_writeIOMember(e){const t=this._io;e.write("  ",t.attribute," "),t.attribute.startsWith("@location")&&this.writeInterpolation(e,t.ioType),e.write(this._ioName(),": ",t.ioType,`,
`)}_ioName(){const e=new pn;return this.hasBlockInstanceIdentifier()&&(this.writeBlockInstanceIdentifier(e),e.write("_")),this.writeIdentifier(e),e.str()}_scopeName(){const e=new pn;return this.hasBlockInstanceIdentifier()&&(this.writeBlockInstanceIdentifier(e),e.write(".")),this.writeIdentifier(e),e.str()}visitEntryPointInputs(e){return this._io?.direction!=="input"?!1:(this._writeIOMember(e),!0)}visitEntryPointOutputs(e){return this._io?.direction!=="output"?!1:(this._writeIOMember(e),!0)}visitEntryPointFunctionExecutions(e,t){return this._io?.direction!=="input"?!1:(e.write("  ",this._scopeName()," = ",this._typeName,"(",t,".",this._ioName(),`);
`),!0)}visitEntryPointOutputExecutions(e,t){const n=this._io;if(n?.direction!=="output")return!1;if(n.elementwise)return e.write("  for (var hgi_i = 0u; hgi_i < u32(",this.getArraySize(),`); hgi_i++) {
`),e.write("    ",t,".",this._ioName(),"[hgi_i] = ",this._scopeName(),`[hgi_i];
`),e.write(`  }
`),!0;const r=`${n.ioType}(${this._scopeName()})`;return e.write("  ",t,".",this._ioName()," = ",n.outputExpression?n.outputExpression(r):r,`;
`),!0}}class va extends Pt{static{u(this,"HgiWebGPUKeywordShaderSection")}constructor(e,t,n){super(e),this._type=t,this._keyword=n}writeType(e){e.write(this._type)}visitGlobalMemberDeclarations(e){return e.write("// ",this._keyword,` is not available in WebGPU
`),e.write("var<private> "),this.writeParameter(e),e.write(`;
`),!0}}class hd extends Pt{static{u(this,"HgiWebGPUBlockShaderSection")}constructor(e,t,n,r){super(e),this._instanceName=t,this._parameters=n,this._group=r}visitGlobalStructs(e){e.write("struct "),this.writeIdentifier(e),e.write(` {
`);for(const t of this._parameters)e.write("  ",t.name,": ",t.type,`,
`);return e.write(`};
`),!0}visitGlobalMemberDeclarations(e){e.write("@group(",this._group,") @binding(0) var<uniform> ",this._instanceName,": "),this.writeIdentifier(e),e.write(`;
`);for(const t of this._parameters)e.write("var<private> ",t.name,": ",t.type,`;
`);return!0}visitEntryPointFunctionExecutions(e){for(const t of this._parameters)e.write("  ",t.name," = ",this._instanceName,".",t.name,`;
`);return!0}}class wa extends Pt{static{u(this,"HgiWebGPUTextureShaderSection")}constructor(e,t){super(e),this._decl=t}visitGlobalMemberDeclarations(e){return e.write("@group(",this._decl.textureGroup,") @binding(",this._decl.bindIndex,") var textureBind_"),this.writeIdentifier(e),e.write(": ",this._decl.textureType,`;
`),this._decl.samplerType&&(e.write("@group(",this._decl.samplerGroup,") @binding(",this._decl.bindIndex,") var samplerBind_"),this.writeIdentifier(e),e.write(": ",this._decl.samplerType,`;
`)),!0}visitGlobalFunctionDefinitions(e){return e.write(this._decl.functions),!0}}class pd extends Pt{static{u(this,"HgiWebGPUBufferShaderSection")}constructor(e,t,n,r,s){super(e),this._group=t,this._bindIndex=n,this._addressSpace=r,this._type=s}writeType(e){e.write(this._type)}setReadOnly(){this._addressSpace="storage, read"}visitGlobalMemberDeclarations(e){return e.write("@group(",this._group,") @binding(",this._bindIndex,") var<",this._addressSpace,"> "),this.writeParameter(e),e.write(`;
`),!0}}class md extends Pt{static{u(this,"HgiWebGPUInterstageBlockShaderSection")}constructor(e,t,n){super(e,[],"","",t),this._members=n}visitGlobalStructs(e){e.write("struct "),this.writeIdentifier(e),e.write(` {
`);for(const t of this._members)e.write("  ",t.name,": ",t.type,`,
`);return e.write(`};
`),!0}visitGlobalMemberDeclarations(e){return e.write("var<private> "),this.writeBlockInstanceIdentifier(e),e.write(": "),this.writeIdentifier(e),e.write(`;
`),!0}}const Pa=15,di=14;class gd extends Pt{static{u(this,"HgiWebGPUPostTessVertexShaderSection")}constructor(e){super("hgiWebGPU_patchDraw"),this._params=e}getVerticesPerPatch(){const e=this._params.lines?2:1;switch(this._params.patchType){case"triangle":return 3*e;case"quad":return 6*e;case"vertex":case"control":return 1;default:return 6}}callsMain(){return!!this._params.lines}_controlPointIndex(e){return this._params.packed?`hgiWebGPU_pulled[hgiWebGPU_patchDraw.tess.w + ${e}]`:`hgiWebGPU_controlPointIndices[${e}]`}isPacked(){return!!this._params.packed}getPrimitive(){return this._params.patchType}getPulledAttributes(){return this._params.attributes}getAttributeSlots(){return this._params.attributes.reduce((e,t)=>Math.max(e,t.location+1),0)}visitGlobalStructs(e){const t=this.getAttributeSlots();return e.write(`struct HgiWebGPUPatchDraw {
`),e.write(`  // patchStart, baseInstance, baseVertex, indexed
`),e.write(`  header: vec4<u32>,
`),e.write(`  // the viewport (x, y, width, height)
`),e.write(`  viewport: vec4<f32>,
`),e.write(`  // patchCount, tessellated (per-patch factors), HgiPolygonModeLine flags,
`),e.write(`  // the first word of the control point indices in hgiWebGPU_pulled (packed)
`),e.write(`  tess: vec4<u32>,
`),e.write(`  // the (u, v) of the vertices of a patch at constant factors
`),e.write(`  corners: array<vec4<f32>, 3>,
`),t>0&&(e.write(`  // per location: first word, words per control point, per instance, per patch
`),e.write("  attributes: array<vec4<u32>, ",t,`>,
`)),e.write(`};
`),!0}visitGlobalMemberDeclarations(e){const t=this._params;if(e.write("@group(",t.group,") @binding(",t.patchDrawBinding,`) var<uniform> hgiWebGPU_patchDraw: HgiWebGPUPatchDraw;
`),t.packed)e.write("@group(",t.group,") @binding(",t.controlPointIndexBinding,`) var<storage, read> hgiWebGPU_pulled: array<u32>;
`);else{e.write("@group(",t.group,") @binding(",t.controlPointIndexBinding,`) var<storage, read> hgiWebGPU_controlPointIndices: array<u32>;
`);for(const n of t.attributes)e.write("@group(",t.group,") @binding(",t.attributeBindingBase+n.location,") var<storage, read> hgiWebGPU_attribute",n.location,`: array<u32>;
`)}return(t.patchType==="triangle"||t.patchType==="quad")&&t.tessellated&&e.write("@group(",t.group,") @binding(",t.tessPointsBinding,`) var<storage, read> hgiWebGPU_tessPoints: array<u32>;
`),!0}visitGlobalFunctionDefinitions(e){for(const t of this._params.attributes){const n=/^(?:vec([234])<(f32|i32|u32)>|(f32|i32|u32))$/.exec(t.wgslType),r=n?.[1]?Number(n[1]):1,s=n?.[2]??n?.[3]??"f32",a=this._params.packed?"hgiWebGPU_pulled":`hgiWebGPU_attribute${t.location}`,o=Array.from({length:r},(c,l)=>`bitcast<${s}>(${a}[w${l?` + ${l}u`:""}])`);e.write("fn hgiWebGPU_Fetch_",t.name,"(controlPoint: u32, instance: u32, patchIndex: u32) -> ",t.wgslType,` {
`),e.write("  let a = hgiWebGPU_patchDraw.attributes[",t.location,`];
`),e.write(`  let w = a.x + (a.y & 0x7fffffffu) * controlPoint + a.z * instance + a.w * patchIndex;
`),s==="f32"&&(r===3||r===4)&&(e.write(`  if ((a.y & 0x80000000u) != 0u) {
`),e.write("    let p = bitcast<i32>(",a,`[w]);
`),e.write(`    let c = vec4<f32>(f32((p << 22u) >> 22u), f32((p << 12u) >> 22u), f32((p << 2u) >> 22u), f32(p >> 30u));
`),e.write(`    let v = max(c / vec4<f32>(511.0, 511.0, 511.0, 1.0), vec4<f32>(-1.0));
`),e.write("    return ",r===3?"v.xyz":"v",`;
`),e.write(`  }
`)),e.write("  return ",r===1?o[0]:`${t.wgslType}(${o.join(", ")})`,`;
`),e.write(`}
`)}return!0}visitEntryPointInputs(e){return this._params.patchType==="control"?(e.write(`  @builtin(global_invocation_id) hgi_globalId: vec3<u32>,
`),!0):(e.write(`  @builtin(vertex_index) hgi_vertexIndex: u32,
`),this._params.instanceId||e.write(`  @builtin(instance_index) hgi_instanceIndex: u32,
`),!0)}visitEntryPointOutputs(e){const t=this._params.lines;if(t)return e.write("  @location(",t.frontFacingLocation,`) @interpolate(flat) hgi_frontFacing: u32,
`),!0;const n=this._params.point;return n?(e.write("  @location(",n.pointCoordLocation,`) hgi_pointCoord: vec2<f32>,
`),!0):!1}visitEntryPointOutputExecutions(e,t){if(this._params.lines)return e.write("  ",t,`.hgi_frontFacing = select(0u, 1u, hgi_frontFacing);
`),!0;const n=this._params.point;if(!n)return!1;const r=`${t}.${n.position}`;return e.write(`  // Emulated point of gl_PointSize pixels: corner hgi_corner of its square.
`),e.write("  let hgi_pointCorner = array<vec2<f32>, 6>(vec2<f32>(-1.0, -1.0), vec2<f32>(1.0, -1.0), ",`vec2<f32>(1.0, 1.0), vec2<f32>(-1.0, -1.0), vec2<f32>(1.0, 1.0), vec2<f32>(-1.0, 1.0))[hgi_corner];
`),e.write("  let hgi_pointSize = ",n.pointSize??"1.0",`;
`),e.write("  ",r," = vec4<f32>(",r,".xy + hgi_pointCorner * hgi_pointSize / ","hgiWebGPU_patchDraw.viewport.zw * ",r,".w, ",r,`.zw);
`),e.write("  ",t,`.hgi_pointCoord = vec2<f32>(0.5 + 0.5 * hgi_pointCorner.x, 0.5 - 0.5 * hgi_pointCorner.y);
`),!0}visitEntryPointFunctionExecutions(e,t){const n=this._params,r=this.getVerticesPerPatch(),s=n.controlPoints,a=n.patchType==="triangle"||n.patchType==="quad";if(n.patchType==="control")e.write(`  // Post-tessellation control stage: patch x, instance y of the dispatch.
`),e.write("  let hgi_patch = ",t,`.hgi_globalId.x;
`),e.write(`  if (hgi_patch >= hgiWebGPU_patchDraw.tess.x) { return; }
`),e.write("  let hgi_instance = ",t,`.hgi_globalId.y + hgiWebGPU_patchDraw.header.y;
`),n.instanceId&&e.write("  ",n.instanceId,` = hgi_instance;
`);else if(a&&n.lines)e.write(`  // Emulated HgiPolygonModeLine: line vertex of an edge of a triangle of the patch.
`),e.write("  let hgi_patch = ",t,".hgi_vertexIndex / ",r,`u;
`),e.write("  let hgi_line = ",t,".hgi_vertexIndex % ",r,`u;
`),e.write(`  let hgi_triangle = hgi_line / 6u;
`),e.write(`  let hgi_ownCorner = ((hgi_line % 6u + 1u) / 2u) % 3u;
`),e.write(`  var hgi_uv: vec2<f32>;
`),e.write("  let hgi_instance = ",n.instanceId?`u32(${n.instanceId})`:`${t}.hgi_instanceIndex`,`;
`);else if(a){e.write(`  // Emulated post-tessellation vertex.
`),e.write(`  var hgi_patch: u32;
`),e.write(`  var hgi_uv: vec2<f32>;
`),e.write(`  var hgi_firstInstance = 0u;
`),n.tessellated&&(e.write(`  if (hgiWebGPU_patchDraw.tess.y != 0u) {
`),e.write("    let hgi_point = ",t,`.hgi_vertexIndex * 3u;
`),e.write(`    hgi_patch = hgiWebGPU_tessPoints[hgi_point];
`),e.write("    hgi_uv = vec2<f32>(f32(hgiWebGPU_tessPoints[hgi_point + 1u]), ",`f32(hgiWebGPU_tessPoints[hgi_point + 2u])) / 65536.0;
`),e.write(`    hgi_firstInstance = hgiWebGPU_patchDraw.header.y;
`),e.write(`  } else {
`));const c=n.tessellated?"    ":"  ";e.write(c,"hgi_patch = ",t,".hgi_vertexIndex / ",r,`u;
`),e.write(c,"let hgi_c = ",t,".hgi_vertexIndex % ",r,`u;
`),e.write(c,`let hgi_cc = hgiWebGPU_patchDraw.corners[hgi_c / 2u];
`),e.write(c,`hgi_uv = select(hgi_cc.xy, hgi_cc.zw, (hgi_c & 1u) != 0u);
`),n.tessellated&&e.write(`  }
`),n.instanceId&&e.write("  ",n.instanceId," = ",n.instanceId,` + hgi_firstInstance;
`),e.write("  let hgi_instance = ",n.instanceId?`u32(${n.instanceId})`:`${t}.hgi_instanceIndex + hgi_firstInstance`,`;
`)}else e.write(`  // Vertex pulling: the vertex (or point) of the draw.
`),e.write("  let hgi_patch = ",t,".hgi_vertexIndex / ",r,`u;
`),e.write("  let hgi_corner = ",t,".hgi_vertexIndex % ",r,`u;
`),e.write("  let hgi_instance = ",n.instanceId?`u32(${n.instanceId})`:`${t}.hgi_instanceIndex`,`;
`);n.patchId&&e.write("  ",n.patchId.name," = ",n.patchId.type,"(",a||n.patchType==="control"?"hgiWebGPU_patchDraw.header.x + ":"",`hgi_patch);
`);const o=u(c=>{if(!n.positionInPatch)return;const l=n.positionInPatch.type,d=n.patchType==="triangle"?"vec3<f32>(hgi_uv, 1.0 - hgi_uv.x - hgi_uv.y)":a?"vec3<f32>(hgi_uv, 0.0)":"vec3<f32>(0.0)",f=/^vec4/.test(l)?`vec4<f32>(${d}, 0.0)`:/^vec3/.test(l)?d:/^vec2/.test(l)?`${d}.xy`:`${d}.x`;e.write(c,n.positionInPatch.name," = ",f,`;
`)},"writePositionInPatch");if(n.lines||o("  "),n.baseInstance&&e.write("  ",n.baseInstance.name," = ",n.baseInstance.type,`(hgiWebGPU_patchDraw.header.y);
`),n.baseVertex&&e.write("  ",n.baseVertex.name," = ",n.baseVertex.type,`(hgiWebGPU_patchDraw.header.z);
`),n.vertexId&&(e.write(`  var hgi_vertexId = hgiWebGPU_patchDraw.header.x + hgi_patch;
`),e.write(`  if (hgiWebGPU_patchDraw.header.w != 0u) {
`),e.write("    hgi_vertexId = ",this._controlPointIndex("hgi_vertexId"),`;
`),e.write(`  }
`),e.write("  ",n.vertexId.name," = ",n.vertexId.type,`(hgi_vertexId + hgiWebGPU_patchDraw.header.z);
`)),n.attributes.length>0){e.write("  let hgi_firstControlPoint = (hgiWebGPU_patchDraw.header.x + hgi_patch) * ",s,`u;
`),e.write("  for (var i = 0u; i < ",s,`u; i++) {
`),e.write(`    var controlPoint = hgi_firstControlPoint + i;
`),e.write(`    if (hgiWebGPU_patchDraw.header.w != 0u) {
`),e.write("      controlPoint = ",this._controlPointIndex("controlPoint"),`;
`),e.write(`    }
`);for(const c of n.attributes){const l=n.patchType==="vertex"||n.patchType==="point"?c.name:`${c.name}[i]`;e.write("    ",l," = hgiWebGPU_Fetch_",c.name,`(controlPoint, hgi_instance, hgiWebGPU_patchDraw.header.x + hgi_patch);
`)}e.write(`  }
`)}if(a&&n.lines){const c=n.lines.position;e.write(`  var hgi_trianglePositions: array<vec4<f32>, 3>;
`),e.write(`  for (var hgi_k = 1u; hgi_k <= 3u; hgi_k++) {
`),e.write(`    let hgi_corner = (hgi_ownCorner + hgi_k) % 3u;
`),e.write(`    let hgi_c = hgi_triangle * 3u + hgi_corner;
`),e.write(`    let hgi_cc = hgiWebGPU_patchDraw.corners[hgi_c / 2u];
`),e.write(`    hgi_uv = select(hgi_cc.xy, hgi_cc.zw, (hgi_c & 1u) != 0u);
`),o("    "),e.write(`    main();
`),e.write("    hgi_trianglePositions[hgi_corner] = ",c,`;
`),e.write(`  }
`),e.write(`  let hgi_p0 = hgi_trianglePositions[0];
`),e.write(`  let hgi_p1 = hgi_trianglePositions[1];
`),e.write(`  let hgi_p2 = hgi_trianglePositions[2];
`),e.write("  let hgi_orientation = determinant(mat3x3<f32>(vec3<f32>(hgi_p0.x, -hgi_p0.y, hgi_p0.w), ",`vec3<f32>(hgi_p1.x, -hgi_p1.y, hgi_p1.w), vec3<f32>(hgi_p2.x, -hgi_p2.y, hgi_p2.w)));
`),e.write(`  let hgi_flags = hgiWebGPU_patchDraw.tess.z;
`),e.write(`  let hgi_frontFacing = (hgi_orientation > 0.0) == ((hgi_flags & 4u) != 0u);
`),e.write(`  if ((hgi_frontFacing && (hgi_flags & 1u) != 0u) || (!hgi_frontFacing && (hgi_flags & 2u) != 0u)) {
`),e.write("    ",c,` = vec4<f32>(4.0, 4.0, 0.0, 1.0);
`),e.write(`  }
`)}return!0}}const _d=`fn hgi_AlphaToCoverageMask(alpha: f32, fragCoord: vec2<f32>) -> u32 {
  let level = (u32(floor(clamp(alpha, 0.0, 1.0) * 255.0 + 0.5)) + 8u) >> 4u;
  let p = vec2<u32>(fragCoord) & vec2<u32>(1u, 1u);
  var rank = array<u32, 4>(0u, 2u, 3u, 1u);
  var masks = array<u32, 5>(0x0u, 0x1u, 0x9u, 0xBu, 0xFu);
  return masks[(level + 3u - rank[p.x + 2u * p.y]) / 4u];
}
`;class bd extends Pt{static{u(this,"HgiWebGPUAlphaToOneShaderSection")}constructor(e){super("hgi_alphaToOne"),this._io=e}visitGlobalFunctionDefinitions(e){return e.write(_d),!0}visitEntryPointInputs(e){return this._io.fragCoord!==null?!1:(e.write(`  @builtin(position) hgi_alphaToCoverageFragCoord: vec4<f32>,
`),!0)}visitEntryPointOutputs(e){return this._io.sampleMask!==null?!1:(e.write(`  @builtin(sample_mask) hgi_alphaToCoverageMask: u32,
`),!0)}visitEntryPointOutputExecutions(e,t){const n=this._io,r=`${n.inputs}.${n.fragCoord??"hgi_alphaToCoverageFragCoord"}`,s=`hgi_AlphaToCoverageMask(${t}.${n.firstColor}.a, ${r}.xy)`;n.sampleMask!==null?e.write("  ",t,".",n.sampleMask," = ",t,".",n.sampleMask," & ",s,`;
`):e.write("  ",t,".hgi_alphaToCoverageMask = ",s,`;
`);for(const a of n.colors)e.write("  ",t,".",a,`.a = 1.0;
`);return!0}}const Sd=`struct hgi_ivec3 { x: i32, y: i32, z: i32, };
struct hgi_vec3 { x: f32, y: f32, z: f32, };
struct hgi_mat3 { m00: f32, m01: f32, m02: f32,
                  m10: f32, m11: f32, m12: f32,
                  m20: f32, m21: f32, m22: f32, };
`,Ta={float:"f32",int:"i32",uint:"u32",bool:"bool",atomic_int:"atomic<i32>",atomic_uint:"atomic<u32>"},yd={vec:"f32",ivec:"i32",uvec:"u32",bvec:"bool"},xd={[L.hdVertexID]:["vertex_index","u32"],[L.hdInstanceID]:["instance_index","u32"],[L.hdPosition]:["position","vec4<f32>"],[L.hdFragCoord]:["position","vec4<f32>"],[L.hdFrontFacing]:["front_facing","bool"],[L.hdSampleID]:["sample_index","u32"],[L.hdSampleMaskIn]:["sample_mask","u32"],[L.hdGlobalInvocationID]:["global_invocation_id","vec3<u32>"]},vd=new Set([L.hdPointCoord,L.hdClipDistance,L.hdCullDistance,L.hdPrimitiveID,L.hdSamplePosition,L.hdLayer,L.hdViewportIndex,L.hdBaseVertex,L.hdBaseInstance,L.hdPositionInPatch,L.hdPatchID,L.hdBaryCoordNoPersp]),wd={position:["position","vec4<f32>"],[L.hdSampleMask]:["sample_mask","u32"],[L.hdDepthAny]:["frag_depth","f32"],[L.hdDepthGreater]:["frag_depth","f32"],[L.hdDepthLess]:["frag_depth","f32"]},Pd=new Set(["gl_PointSize","gl_ClipDistance","gl_CullDistance"]);function Td(i,e){return`${i}_hgiElement${e}`}u(Td,"HgiWebGPUArrayOfTexturesElementName");class Dt extends Su{static{u(this,"HgiWebGPUShaderGenerator")}constructor(e,t,n={}){super(t),this._hgi=e,this._options=n,this._entryPoint=this._buildShaderStageEntryPoint(t);const r=Dt._getPulledVertexKind(t),s=t.shaderStage===I.HgiShaderStagePostTessellationControl;if(this._postTess=t.shaderStage===I.HgiShaderStagePostTessellationVertex||r||s?{controlPoints:r?1:this._getControlPointsPerPatch(t),attributes:[],patchId:null,positionInPatch:null,baseInstance:null,instanceId:null,pulled:r,control:s,vertexId:null,baseVertex:null,pointSize:null,position:""}:null,s)for(const a of(t.shaderCode??"").matchAll(/\(\s*device\s+half\s*\*\s*\)\s*(\w+)/g))this._tessFactorBuffers.add(a[1]);this.createShaderSection(new xa(this._getHeader(t),"Headers"));for(const a of t.stageGlobalMembers){const o=Dt.getWGSLType(a.type);this.createShaderSection(new fe(a.nameInShader,o,Nr.HgiInterpolationDefault,Or.HgiSamplingDefault,null,a.arraySize)),this._globals.push({name:a.nameInShader,wgslType:a.arraySize?`array<${o}, ${a.arraySize}>`:o,kind:"globalMember"})}this._writeConstantParams(t.constantParams),this._writeBuffers(t.buffers),this._writeTextures(t.textures),this._writeInOuts(t.stageInputs,"in"),this._writeInOutBlocks(t.stageInputBlocks,"in"),this._writeInOuts(t.stageOutputs,"out"),this._writeInOutBlocks(t.stageOutputBlocks,"out"),this._writePostTessVertexEmulation(t),this._options.alphaToOne&&t.shaderStage===I.HgiShaderStageFragment&&this._writeAlphaToOne(),this._options.polygonModeLine&&Math.max(this._inLocationIndex,this._outLocationIndex)>di&&this._errors.push(`HgiWebGPU: interstage location ${di} is needed for the emulated HgiPolygonModeLine and is in use`)}_shaderSections=[];_bindGroupLayoutInfo=[];_writableBuffers=[];_globals=[];_errors=[];_inLocationIndex=0;_usesPrimitiveIndex=!1;_usesClipDistances=!1;_outLocationIndex=0;_colorIndex=0;_colorOutputLocations=[];_codeBeforeEntryPoint="";_postTess;_postTessSection=null;_tessFactorBuffers=new Set;_tessFactorsBindIndex=null;_entryPoint;_writeAlphaToOne(){let e=null,t=null,n=null;const r=[];for(const s of this._shaderSections){if(!(s instanceof fe))continue;const a=s.getStageIO();a&&(a.direction==="input"&&a.attribute==="@builtin(position)"&&(e=s.getIOName()),a.direction==="output"&&(a.attribute==="@builtin(sample_mask)"&&(t=s.getIOName()),a.attribute.startsWith("@location(")&&a.ioType==="vec4<f32>"&&(r.push(s.getIOName()),a.attribute==="@location(0)"&&(n=s.getIOName()))))}if(n===null){this._errors.push("HgiWebGPU: alpha to coverage needs a vec4 color output at location 0");return}this.createShaderSection(new bd({inputs:this._entryPoint.inputsInstanceName,fragCoord:e,sampleMask:t,firstColor:n,colors:r}))}getShaderSections(){return this._shaderSections}createShaderSection(e){return this._shaderSections.push(e),e}getColorOutputLocations(){return this._colorOutputLocations}getBindGroupLayoutInfo(){return this._bindGroupLayoutInfo}getShaderBodyGlobals(){return this._globals}getGeneratorErrors(){return this._errors.join(`
`)}getEntryPointFunctionName(){return this._entryPoint?.functionName??""}getPostTessVertexSection(){return this._postTessSection}static getWGSLType(e){const t=e.trim();if(Ta[t])return Ta[t];if(t==="double")return"f32";let n=/^(vec|ivec|uvec|bvec|dvec)([234])$/.exec(t);return n?`vec${n[2]}<${n[1]==="dvec"?"f32":yd[n[1]]}>`:(n=/^d?mat([234])(?:x([234]))?$/.exec(t),n?`mat${n[1]}x${n[2]??n[1]}<f32>`:t==="hgi_dvec3"?"hgi_vec3":t==="hgi_dmat3"?"hgi_mat3":t)}_buildShaderStageEntryPoint(e){const t=u((n,r,s,a)=>({functionName:a,stageAttribute:s,inputsTypeName:`WGSL${n[0].toUpperCase()}${n[1]}Inputs`,inputsInstanceName:`${n}Input`,outputsTypeName:`WGSL${n[0].toUpperCase()}${n[1]}Outputs`,outputsInstanceName:`${n}Output`,constantsTypeName:"ParamBuffer",constantsInstanceName:`${n}Uniforms`,stage:r}),"make");switch(e.shaderStage){case I.HgiShaderStageVertex:return t("vs","vertex","@vertex","vertexEntryPoint");case I.HgiShaderStageFragment:return t("fs","fragment","@fragment","fragmentEntryPoint");case I.HgiShaderStageCompute:{let[n,r,s]=e.computeDescriptor.localSize.data;return(!n||!r||!s)&&(n=1,r=1,s=1),t("cs","compute",`@compute @workgroup_size(${n}, ${r}, ${s})`,"computeEntryPoint")}case I.HgiShaderStagePostTessellationVertex:return e.tessellationDescriptor.patchType===Ai.PatchType.Isolines?(w("HgiWebGPU: isoline patches are not supported"),this._errors.push("HgiWebGPU: post-tessellation vertex stage: isoline patches are not supported"),null):t("tv","vertex","@vertex","vertexEntryPoint");case I.HgiShaderStagePostTessellationControl:return t("tc","compute","@compute @workgroup_size(64)","computeEntryPoint");default:return w("Unknown shader stage"),this._errors.push(`HgiWebGPU: shader stage ${e.shaderStage} is not supported by WebGPU`),null}}static _getPulledVertexKind(e){return e.shaderStage!==I.HgiShaderStageVertex?null:e.stageOutputs.some(t=>t.role==="point_size")?"point":e.stageInputs.some(t=>t.role===L.hdBaseVertex||t.role===L.hdBaseInstance)?"vertex":null}_getControlPointsPerPatch(e){const t=Number(e.tessellationDescriptor.numVertsPerPatchIn);return!Number.isInteger(t)||t<=0?(w(`HgiWebGPU: invalid numVertsPerPatchIn '${e.tessellationDescriptor.numVertsPerPatchIn}'`),this._errors.push("HgiWebGPU: post-tessellation vertex stage has no control point count"),1):t}_writePostTessVertexEmulation(e){const t=this._postTess;if(!t||!this._entryPoint)return;const n=t.pulled??(t.control?"control":e.tessellationDescriptor.patchType===Ai.PatchType.Triangles?"triangle":"quad");this._postTessSection=this.createShaderSection(new gd({group:Ge,patchDrawBinding:qr,controlPointIndexBinding:jr,attributeBindingBase:Qr,tessPointsBinding:Yr,controlPoints:t.controlPoints,patchType:n,attributes:t.attributes,patchId:t.patchId,positionInPatch:t.positionInPatch,baseInstance:t.baseInstance,instanceId:t.instanceId,vertexId:t.vertexId,baseVertex:t.baseVertex,tessellated:!!this._options.tessellatedPatches,packed:!!this._options.packedAttributes,...this._options.polygonModeLine&&(n==="triangle"||n==="quad")?{lines:{position:t.position,frontFacingLocation:di}}:{},...t.pulled==="point"?{point:{pointSize:t.pointSize,position:t.position,pointCoordLocation:Pa}}:{}}));const r=this._stageVisibility();this._addBindGroupLayoutEntry(Ge,{binding:qr,visibility:r,buffer:{type:"uniform",hasDynamicOffset:!0}}),this._addBindGroupLayoutEntry(Ge,{binding:jr,visibility:r,buffer:{type:"read-only-storage"}});for(const s of this._options.packedAttributes?[]:t.attributes)this._addBindGroupLayoutEntry(Ge,{binding:Qr+s.location,visibility:r,buffer:{type:"read-only-storage"}});(n==="triangle"||n==="quad")&&this._options.tessellatedPatches&&this._addBindGroupLayoutEntry(Ge,{binding:Yr,visibility:r,buffer:{type:"read-only-storage"}})}getTessFactorsBindIndex(){return this._tessFactorsBindIndex}_rewriteTessFactorWrites(e){const t=new Map;let n=e.replace(/device\s+half\s*\*\s*(\w+)\s*=\s*\(\s*device\s+half\s*\*\s*\)\s*(\w+)\s*\+\s*(\w+)\s*\*\s*(\d+)\s*;/g,(s,a,o,c,l)=>(t.set(a,o),`uint ${a} = uint(${c}) * ${l}u;`));for(const[s,a]of t)n=n.replace(new RegExp(`\\b${s}\\s*\\[([^\\]]+)\\]\\s*=\\s*half\\s*\\(([^;]*)\\)\\s*;`,"g"),(o,c,l)=>`hgiWebGPU_SetTessFactor_${a}(${s} + uint(${c.trim()}), ${l.trim()});`);if(/\bdevice\s+half\b|\bhalf\s*\(/.test(n)&&this._errors.push("HgiWebGPU: post-tessellation control stage writes Metal half-float data in a form HgiWebGPU does not translate"),t.size===0)return n;let r=`// HgiWebGPU: Metal's float to half conversion (round to nearest even), as bits.
uint hgiWebGPU_HalfBits(float value) {
    uint x = floatBitsToUint(value);
    uint sign = (x >> 16u) & 0x8000u;
    uint e = (x >> 23u) & 0xffu;
    uint m = x & 0x7fffffu;
    if (e == 0xffu) { return sign | 0x7c00u | (m != 0u ? 0x200u : 0u); }
    int he = int(e) - 112;
    if (he >= 31) { return sign | 0x7c00u; }
    if (he <= 0) {
        if (he < -10) { return sign; }
        m = m | 0x800000u;
        uint shift = uint(14 - he);
        uint hm = m >> shift;
        uint rem = m & ((1u << shift) - 1u);
        uint halfway = 1u << (shift - 1u);
        if (rem > halfway || (rem == halfway && (hm & 1u) != 0u)) { hm = hm + 1u; }
        return sign | hm;
    }
    uint r = sign | (uint(he) << 10u) | (m >> 13u);
    uint rem = m & 0x1fffu;
    if (rem > 0x1000u || (rem == 0x1000u && (r & 1u) != 0u)) { r = r + 1u; }
    return r;
}
`;for(const s of new Set(t.values()))r+=`void hgiWebGPU_SetTessFactor_${s}(uint i, float v) {
    uint w = i >> 1u;
    uint s = (i & 1u) * 16u;
    ${s}[w] = (${s}[w] & ~(0xffffu << s)) | (hgiWebGPU_HalfBits(v) << s);
}
`;return r+n}_getHeader(e){let t="";return e.shaderStage===I.HgiShaderStageFragment&&(t+=`diagnostic(off, derivative_uniformity);
`),t+=Sd,t}_writeConstantParams(e){if(e.length===0||!this._entryPoint)return;const t=e.map(n=>({name:n.nameInShader,type:Dt.getWGSLType(n.type)}));this.createShaderSection(new hd(this._entryPoint.constantsTypeName,this._entryPoint.constantsInstanceName,t,Ge));for(const n of t)this._globals.push({name:n.name,wgslType:n.type,kind:"constantParam"});this._addBindGroupLayoutEntry(Ge,{binding:0,visibility:this._stageVisibility(),buffer:{type:"uniform",hasDynamicOffset:!0}})}_writeTextures(e){let t=0;for(const n of e){if(n.arraySize>0){t=Math.max(t,this._writeArrayOfTextures(n));continue}const r=this._textureDeclaration(n);this.createShaderSection(new wa(n.nameInShader,{textureGroup:$t,samplerGroup:ot,bindIndex:n.bindIndex,textureType:r.textureType,samplerType:r.samplerType,functions:r.functions})),this._globals.push({name:n.nameInShader,wgslType:r.textureType,kind:"texture"}),this._addBindGroupLayoutEntry($t,{binding:n.bindIndex,visibility:this._stageVisibility(),...r.layout}),r.samplerLayout&&this._addBindGroupLayoutEntry(ot,{binding:n.bindIndex,visibility:this._stageVisibility(),sampler:r.samplerLayout}),"footprint"in r&&r.footprint&&this._addBorderFootprintEntries(n.bindIndex,r.samplerLayout),"border"in r&&r.border&&(n.bindIndex>=Ut&&w(`HgiWebGPU: texture bind index ${n.bindIndex} of '${n.nameInShader}' reaches the sampler-state binding ${Ut}`),t=Math.max(t,n.bindIndex+1))}t>0&&(this.createShaderSection(new xa(ju()+Qu(ot,t),"Sampler state")),this._addBindGroupLayoutEntry(ot,{binding:Ut,visibility:this._stageVisibility(),buffer:{type:"uniform"}}))}_addBorderFootprintEntries(e,t){this._addBindGroupLayoutEntry($t,{binding:qn+e,visibility:this._stageVisibility(),texture:{sampleType:"float",viewDimension:"2d",multisampled:!1}}),this._addBindGroupLayoutEntry(ot,{binding:qn+e,visibility:this._stageVisibility(),sampler:t??{type:"filtering"}})}_writeArrayOfTextures(e){const t=e.nameInShader;if(e.writable)return w(`HgiWebGPU: writable array of textures '${t}' is not supported`),this._errors.push(`HgiWebGPU: writable array of textures '${t}' is not supported`),0;let n=0,r=null;const s=[],a=[],o=u(c=>"accessorTypes"in c&&c.accessorTypes?this._arrayOfTexturesAccessors(t,s,c.accessorTypes):"","dispatchFunctions");for(let c=0;c<e.arraySize;c++){const l=Object.assign(new Rl,e,{nameInShader:Td(t,c),bindIndex:e.bindIndex+c,arraySize:0});r=this._textureDeclaration(l),s.push(l.nameInShader),a.push(new wa(l.nameInShader,{textureGroup:$t,samplerGroup:ot,bindIndex:l.bindIndex,textureType:r.textureType,samplerType:r.samplerType,functions:r.functions+(c===e.arraySize-1?o(r):"")})),this._addBindGroupLayoutEntry($t,{binding:l.bindIndex,visibility:this._stageVisibility(),...r.layout}),r.samplerLayout&&this._addBindGroupLayoutEntry(ot,{binding:l.bindIndex,visibility:this._stageVisibility(),sampler:r.samplerLayout}),"footprint"in r&&r.footprint&&this._addBorderFootprintEntries(l.bindIndex,r.samplerLayout),"border"in r&&r.border&&(l.bindIndex>=Ut&&w(`HgiWebGPU: texture bind index ${l.bindIndex} of '${t}' reaches the sampler-state binding ${Ut}`),n=Math.max(n,l.bindIndex+1))}for(const c of a)this.createShaderSection(c);return r&&this._globals.push({name:t,wgslType:r.textureType,kind:"texture"}),n}_arrayOfTexturesAccessors(e,t,n){const r=u((a,o,c,l)=>{let d=`fn ${a}_${e}(index: u32${o}) -> ${l} {
  var result: ${l};
  switch index {
`;return t.forEach((f,h)=>{d+=`    case ${h}u: { result = ${a}_${f}(${c}); }
`}),d+=`    default: {}
  }
  return result;
}
`,d},"dispatch");let s=r("HgiGet",`, uv: ${n.floatCoordType}`,"uv",n.resultType);return s+=r("HgiGetSize","","",n.sizeType),s+=r("HgiTextureLod",`, uv: ${n.floatCoordType}, lod: f32`,"uv, lod",n.resultType),n.texelFetch&&(s+=r("HgiTexelFetch",`, uv: ${n.intCoordType}`,"uv",n.sampledType)),s}_textureDeclaration(e){const t=e.nameInShader,n=`textureBind_${t}`,r=`samplerBind_${t}`,s=e.textureType===St.HgiShaderTextureTypeShadowTexture,a=e.textureType===St.HgiShaderTextureTypeArrayTexture,o=e.textureType===St.HgiShaderTextureTypeCubemapTexture,c=Math.min(Math.max(e.dimensions,1),3);(e.dimensions<1||e.dimensions>3)&&w("Invalid texture dimension");const l=e.format===W.HgiFormatInvalid?W.HgiFormatFloat32:Jn(e.format),d=l===W.HgiFormatUInt16?"u32":l===W.HgiFormatInt16||l===W.HgiFormatInt32?"i32":"f32",f=d==="f32",h=f&&(l!==W.HgiFormatFloat32||this._hgi.isFloat32Filterable()),p=`vec4<${d}>`,m=a?c+1:c,g=s||a||o?c+1:c,_=u((ie,Ke)=>ie===1?Ke:`vec${ie}<${Ke}>`,"vecOf"),b=_(m,"i32"),y=_(g,"i32"),S=_(g,"f32"),x=o?"cube":a?"2d-array":c===1?"1d":c===3?"3d":"2d",T=this._getShaderStage()===I.HgiShaderStageFragment,C=c===1?"uv.x":c===2?"uv.xy":"uv.xyz",U=a?`${C}, i32(uv.${"xyzw"[c]})`:s?C:"uv",V=a?`vec${m}<i32>(vec${c}<i32>(textureDimensions(${n}, 0)), i32(textureNumLayers(${n})))`:m===1?`i32(textureDimensions(${n}, 0))`:`vec${m}<i32>(textureDimensions(${n}, 0))`;let q="";if(e.writable){const ie=B.getPixelFormat(e.format,Ht.HgiTextureUsageBitsShaderWrite);ie||this._errors.push(`HgiWebGPU: writable texture '${t}' has no WebGPU storage format`);const Ke=a||o,Tt=o?"2d-array":x,rr=`texture_storage_${Tt.replace("-","_")}<${ie??"rgba32float"}, write>`,sr=V.replace(/textureDimensions\(([^,()]+), 0\)/g,"textureDimensions($1)");return q+=`fn HgiSet_${t}(uv: ${y}, data: vec4<f32>) {
  textureStore(${n}, ${Ke?`uv.${c===1?"x":"xy"}, uv.${"xyzw"[c]}`:"uv"}, data);
}
`,q+=`fn HgiGetSize_${t}() -> ${b} {
  return ${sr};
}
`,{textureType:rr,samplerType:"",functions:q,layout:{storageTexture:{access:"write-only",format:ie??"rgba32float",viewDimension:Tt}},samplerLayout:null}}const we=s?`texture_depth_${x.replace("-","_")}`:`texture_${x.replace("-","_")}<${d}>`,ve=s?"sampler_comparison":"sampler",v=s?"f32":p;let F,X,ne=!1,Jt=!1;if(s){const ie=`uv.${"xyzw"[a?c+1:c]}`;F=`textureSampleCompareLevel(${n}, ${r}, ${U}, ${ie})`,X=F}else if(f){if(F=T?`textureSample(${n}, ${r}, ${U})`:`textureSampleLevel(${n}, ${r}, ${U}, 0.0)`,X=`textureSampleLevel(${n}, ${r}, ${U}, lod)`,!o){ne=!0;const ie=a?C:"uv";if(c===2&&!a){Jt=!0;const Ke=`hgiWebGPUFootprint_${t}`,Tt=`hgiWebGPUFootprintSampler_${t}`;q+=fa(t,n,e.bindIndex,c),q+=Yu(t,n,e.bindIndex),F=`hgiWebGPUBorderMix_${t}(${F}, uv, `+(T?`textureSample(${Ke}, ${Tt}, uv), ${ha(n,"uv",c)})`:`textureSampleLevel(${Ke}, ${Tt}, uv, 0.0), 0.0)`),X=`hgiWebGPUBorderMix_${t}(${X}, uv, textureSampleLevel(${Ke}, ${Tt}, uv, lod), lod)`}else q+=fa(t,n,e.bindIndex,c),F=`hgiWebGPUBorder_${t}(${F}, ${ie}, ${T?ha(n,ie,c):"0.0"})`,X=`hgiWebGPUBorder_${t}(${X}, ${ie}, lod)`}}else{const ie=`vec${c}<i32>(${C} * vec${c}<f32>(textureDimensions(${n}, 0)))`;F=a?`textureLoad(${n}, ${ie.replace(/^vec1<i32>/,"i32")}, i32(uv.${"xyzw"[c]}), 0)`:`textureLoad(${n}, ${c===1?`i32(uv * f32(textureDimensions(${n}, 0)))`:ie}, 0)`,X=F.replace(/, 0\)$/,", i32(lod))")}if(q+=`fn HgiGet_${t}(uv: ${S}) -> ${v} {
  return ${F};
}
`,q+=`fn HgiGetSize_${t}() -> ${b} {
  return ${V};
}
`,q+=`fn HgiTextureLod_${t}(uv: ${S}, lod: f32) -> ${v} {
  return ${X};
}
`,!s&&!o){const ie=g,Ke=u(Xs=>ie===1?`(u32(${Xs}) & 0xffffu)`:`(vec${ie}<u32>(${Xs}) & vec${ie}<u32>(0xffffu))`,"u"),Tt=a?`vec${ie}<u32>(textureDimensions(${n}, 0).${"xyz".slice(0,c)}, textureNumLayers(${n}))`:`textureDimensions(${n}, 0)`,rr=ie===1?"c >= size":"any(c >= size)",sr=a?`c.${c===1?"x":"xy"}, c.${"xyzw"[c]}, 0`:"c, 0";q+=`fn HgiTexelFetch_${t}(uv: ${y}) -> ${p} {
  let c = ${Ke("uv")};
  let size = ${Tt};
  if (${rr}) { return ${p}(); }
  return textureLoad(${n}, ${sr});
}
`}return{textureType:we,samplerType:ve,functions:q,border:ne,footprint:Jt,accessorTypes:{resultType:v,sizeType:b,floatCoordType:S,intCoordType:y,sampledType:p,texelFetch:!s&&!o},layout:{texture:{sampleType:s?"depth":f?h?"float":"unfilterable-float":d==="u32"?"uint":"sint",viewDimension:x,multisampled:!1}},samplerLayout:{type:s?"comparison":h?"filtering":"non-filtering"}}}_writeBuffers(e){for(const t of e){const n=t.binding===ai.HgiBindingTypeUniformArray,r=t.binding===ai.HgiBindingTypeUniformValue,s=this._tessFactorBuffers.has(t.nameInShader);s&&this._tessFactorsBindIndex===null&&(this._tessFactorsBindIndex=t.bindIndex);const a=s?"u32":Dt.getWGSLType(t.type),c=t.binding===ai.HgiBindingTypeValue||t.binding===ai.HgiBindingTypeUniformValue?a:t.arraySize>0&&!n?`array<${a}, ${t.arraySize}>`:`array<${a}>`,l=t.writable&&!(this._stageVisibility()&ft.VERTEX),d=r?"uniform":l?"storage, read_write":"storage, read",f=t.bindIndex,h=new pd(t.nameInShader,Mn,f,d,c);this.createShaderSection(h),this._globals.push({name:t.nameInShader,wgslType:c,kind:"buffer",readOnly:!l});const p={binding:f,visibility:this._stageVisibility(),buffer:{type:r?"uniform":l?"storage":"read-only-storage"}};this._addBindGroupLayoutEntry(Mn,p),l&&!r&&!c.includes("atomic<")&&this._writableBuffers.push({name:t.nameInShader,section:h,entry:p})}}_declareUnwrittenBuffersReadOnly(e){if(!e)return;const t=new Set(e);for(const{name:n,section:r,entry:s}of this._writableBuffers)t.has(n)||(r.setReadOnly(),s.buffer={...s.buffer,type:"read-only-storage"})}_writeInOuts(e,t){const n=t==="in",r=this._getShaderStage(),s=this._postTess;for(const a of e){const o=a.nameInShader,c=Dt.getWGSLType(a.type),l=n?"stageInput":"stageOutput",d=s&&a.arraySize==="VERTEX_CONTROL_POINTS_PER_PATCH"?String(s.controlPoints):a.arraySize;if(this._globals.push({name:o,wgslType:d?`array<${c}, ${d}>`:c,kind:l}),s?.control&&(!n||a.role===L.hdInstanceID)){n&&(s.instanceId=o),this.createShaderSection(new fe(o,c,a.interpolation,a.sampling,null,d));continue}if(n&&s){const h=u(p=>{s[p]={name:o,type:c},this.createShaderSection(new fe(o,c,a.interpolation,a.sampling,null,d))},"derived");if(a.role===L.hdPatchID){h("patchId");continue}if(a.role===L.hdPositionInPatch){h("positionInPatch");continue}if(a.role===L.hdBaseInstance){h("baseInstance");continue}if(s.pulled&&a.role===L.hdBaseVertex){h("baseVertex");continue}if(s.pulled&&a.role===L.hdVertexID){h("vertexId");continue}if(a.role===L.hdInstanceID&&(s.instanceId=o),!a.role&&a.location!==-1){/^(?:vec[234]<(?:f32|i32|u32)>|f32|i32|u32)$/.test(c)||(w(`HgiWebGPU: control point input '${o}' of type ${a.type} cannot be pulled`),this._errors.push(`HgiWebGPU: control point input '${o}' of type ${a.type} is not supported`)),s.attributes.push({name:o,location:a.location,wgslType:c}),this.createShaderSection(new fe(o,c,a.interpolation,a.sampling,null,s.pulled?d:d||String(s.controlPoints)));continue}}if(n){if(a.role===L.hdFrontFacing&&r===I.HgiShaderStageFragment&&this._options.polygonModeLine){this.createShaderSection(new fe(o,c,a.interpolation,a.sampling,{direction:"input",attribute:`@location(${di})`,ioType:"u32"},a.arraySize));continue}const h=xd[a.role];if(h){this.createShaderSection(new fe(o,c,a.interpolation,a.sampling,{direction:"input",attribute:`@builtin(${h[0]})`,ioType:h[1]},a.arraySize));continue}if(a.role===L.hdPrimitiveID&&r===I.HgiShaderStageFragment&&this._hgi.hasPrimitiveIndex?.()){this._usesPrimitiveIndex=!0,this.createShaderSection(new fe(o,c,a.interpolation,a.sampling,{direction:"input",attribute:"@builtin(primitive_index)",ioType:"u32"},a.arraySize));continue}if(a.role===L.hdPrimitiveID&&r===I.HgiShaderStageFragment){this.createShaderSection(new va(o,c,a.role));continue}if(a.role===L.hdPointCoord&&r===I.HgiShaderStageFragment){this.createShaderSection(new fe(o,c,a.interpolation,a.sampling,{direction:"input",attribute:`@location(${Pa})`,ioType:"vec2<f32>"},a.arraySize));continue}if(vd.has(a.role)){w(`HgiWebGPU: shader keyword ${a.role} ('${o}') is not available in WebGPU`),this.createShaderSection(new va(o,c,a.role));continue}}else{const h=wd[a.role];if(h&&(h[0]!=="position"||r===I.HgiShaderStageVertex||r===I.HgiShaderStagePostTessellationVertex)){s&&h[0]==="position"&&(s.position=o);const p=h[0]==="position"?m=>`vec4<f32>(${m}.x, -${m}.y, ${m}.z, ${m}.w)`:void 0;this.createShaderSection(new fe(o,c,a.interpolation,a.sampling,{direction:"output",attribute:`@builtin(${h[0]})`,ioType:h[1],...p?{outputExpression:p}:{}},a.arraySize));continue}if(s?.pulled==="point"&&a.role==="point_size"){s.pointSize=o,this.createShaderSection(new fe(o,c,a.interpolation,a.sampling,null,a.arraySize));continue}if(a.role==="clip_distance"&&this._hgi.hasClipDistances?.()&&(r===I.HgiShaderStageVertex||r===I.HgiShaderStagePostTessellationVertex)){const p=`array<f32, ${a.arraySize||"1"}>`;this._usesClipDistances=!0,this.createShaderSection(new fe(o,c,a.interpolation,a.sampling,{direction:"output",attribute:"@builtin(clip_distances)",ioType:p,elementwise:!0},a.arraySize));continue}if(Pd.has(o)){o==="gl_PointSize"&&a.role!=="point_size"||Ne(`HgiWebGPU: ${o} is not supported by WebGPU and is not written`),this.createShaderSection(new fe(o,c,a.interpolation,a.sampling,null,a.arraySize));continue}if(a.role==="color"){const p=a.location!==-1?a.location:this._colorIndex++;this._colorOutputLocations.push(p),this.createShaderSection(new fe(o,c,a.interpolation,a.sampling,{direction:"output",attribute:`@location(${p})`,ioType:c},a.arraySize));continue}}if(r===I.HgiShaderStageCompute){w(`HgiWebGPU: compute stage ${t}put '${o}' has no WebGPU role`),this.createShaderSection(new fe(o,c,a.interpolation,a.sampling,null,a.arraySize));continue}let f;a.location!==-1?f=a.location:a.interstageSlot!==-1?f=a.interstageSlot:f=n?this._inLocationIndex++:this._outLocationIndex++,!n&&r===I.HgiShaderStageFragment&&this._colorOutputLocations.push(f),a.arraySize&&w(`HgiWebGPU: arrayed stage ${t}put '${o}' is not supported`),this.createShaderSection(new fe(o,c,a.interpolation,a.sampling,{direction:n?"input":"output",attribute:`@location(${f})`,ioType:c},a.arraySize))}}_writeInOutBlocks(e,t){const n=t==="in";for(const r of e){let s=r.interstageSlot!==-1?r.interstageSlot:n?this._inLocationIndex:this._outLocationIndex;r.arraySize&&(w(`HgiWebGPU: arrayed interstage block '${r.blockName}' is not supported`),this._errors.push(`HgiWebGPU: arrayed interstage block '${r.blockName}' is not supported`));const a=[];for(const o of r.members){const c=Dt.getWGSLType(o.type);a.push({name:o.name,type:c}),this.createShaderSection(new fe(o.name,c,o.interpolation,o.sampling,{direction:n?"input":"output",attribute:`@location(${s++})`,ioType:c},"",r.instanceName)),n?this._inLocationIndex++:this._outLocationIndex++}this.createShaderSection(new md(r.blockName,r.instanceName,a)),this._globals.push({name:r.instanceName,wgslType:r.blockName,kind:"interstageBlock"})}}_stageVisibility(){return B.getShaderStages(this._getShaderStage())}_addBindGroupLayoutEntry(e,t){let n=this._bindGroupLayoutInfo.find(r=>r.group===e);n||(n={group:e,entries:[]},this._bindGroupLayoutInfo.push(n)),n.entries.push(t)}_execute(e){const t=this.getShaderSections(),n=this._postTess&&!this._postTess.pulled?`#define VERTEX_CONTROL_POINTS_PER_PATCH ${this._postTess.controlPoints}
`:"",r=this._hgi.getShaderBodyTranslator().Translate({stage:this._getShaderStage(),declarations:n+this._getShaderCodeDeclarations(),code:this._postTess?.control?this._rewriteTessFactorWrites(this._getShaderCode()):this._getShaderCode(),descriptor:this._descriptor,globals:this._globals});r.errors&&this._errors.push(r.errors),this._declareUnwrittenBuffersReadOnly(r.writtenGlobals),this._usesPrimitiveIndex&&e.write(`enable primitive_index;
`),this._usesClipDistances&&e.write(`enable clip_distances;
`),e.write(`
// //////// Global Includes ////////
`);for(const s of t)s.visitGlobalIncludes(e);e.write(r.declarations),e.write(`
// //////// Global Structs ////////
`);for(const s of t)s.visitGlobalStructs(e);e.write(`
// //////// Global Member Declarations ////////
`);for(const s of t)s.visitGlobalMemberDeclarations(e);e.write(`
// //////// Global Function Definitions ////////
`);for(const s of t)s.visitGlobalFunctionDefinitions(e);e.write(`
`),e.write(r.code),this._entryPoint&&(this._codeBeforeEntryPoint=e.str(),this._writeEntryPoint(e),this._restrictVisibilityToStaticUse(e.str(),this._entryPoint.functionName))}_restrictVisibilityToStaticUse(e,t){const n=ud(e,t);if(!n)return;const r=ld(e);for(const s of this._bindGroupLayoutInfo)for(const a of s.entries){const o=r.get(`${s.group}:${a.binding}`);o!==void 0&&!n.has(o)&&(a.visibility=0)}}getInterstageInputs(){const e=new Map;for(const t of this._shaderSections){if(!(t instanceof fe))continue;const n=t.getInterstageLocation();n===null||t.getStageIO()?.direction!=="input"||e.set(n,{interpolation:t.getInterpolation(),sampling:t.getSampling()})}return e}matchInterstageOutputs(e){if(!this._entryPoint)return null;let t=!1;for(const r of this._shaderSections){if(!(r instanceof fe))continue;const s=r.getInterstageLocation();if(s===null||r.getStageIO()?.direction!=="output")continue;const a=e.get(s);a&&r.setInterpolation(a.interpolation,a.sampling)&&(t=!0)}if(!t)return null;const n=new pn;return n.write(this._codeBeforeEntryPoint),this._writeEntryPoint(n),n.str()}_writeEntryPoint(e){const t=this._entryPoint,n=this.getShaderSections(),r=new pn,s=new pn;for(const c of n)c.visitEntryPointInputs(r);for(const c of n)c.visitEntryPointOutputs(s);const a=r.str().length>0,o=s.str().length>0&&this._getShaderStage()!==I.HgiShaderStageCompute;e.write(`
// //////// Entry Point ////////
`),a&&e.write("struct ",t.inputsTypeName,` {
`,r.str(),`};
`),o&&e.write("struct ",t.outputsTypeName,` {
`,s.str(),`};
`),e.write(t.stageAttribute,`
fn `,t.functionName,"("),a&&e.write(t.inputsInstanceName,": ",t.inputsTypeName),e.write(")"),o&&e.write(" -> ",t.outputsTypeName),e.write(` {
`),e.write(`
// //////// Entry Point Function Executions ////////
`);for(const c of n)c.visitEntryPointFunctionExecutions(e,t.inputsInstanceName);if(this._postTessSection?.callsMain()||e.write(`  main();
`),o){e.write("  var ",t.outputsInstanceName,": ",t.outputsTypeName,`;
`);for(const c of n)c.visitEntryPointOutputExecutions(e,t.outputsInstanceName);e.write("  return ",t.outputsInstanceName,`;
`)}e.write(`}
`)}}class ms extends _u{static{u(this,"HgiWebGPUShaderFunction")}_shaderId=null;_errors="";_generatedCode="";_entryPoint="";_bindGroupLayoutInfo=[];_compilation=null;_postTessVertex=null;_colorOutputLocations=[];_device;_generator=null;_interstageInputs=new Map;_variantSource=null;_variants=new Map;constructor(e,t,n,r={}){if(super(n),this._device=e,n.shaderCode!==null){const s=I.HgiShaderStageFragment|I.HgiShaderStagePostTessellationVertex|I.HgiShaderStagePostTessellationControl|I.HgiShaderStageVertex;if(Object.values(r).every(l=>!l)&&n.shaderStage&s){const l=n.clone();l.generatedShaderCodeOut=null,this._variantSource={device:e,hgi:t,desc:l}}const a=new Dt(t,this._descriptor,r);a.Execute();const o=a.getGeneratedShaderCode();switch(this._generatedCode=o,this._entryPoint=a.getEntryPointFunctionName(),this._errors=a.getGeneratorErrors(),this._errors||this._createModule(o),n.shaderStage){case I.HgiShaderStageVertex:case I.HgiShaderStagePostTessellationVertex:this._generator=a;break;case I.HgiShaderStageFragment:this._interstageInputs=a.getInterstageInputs(),this._colorOutputLocations=a.getColorOutputLocations();break}this._bindGroupLayoutInfo=a.getBindGroupLayoutInfo();const c=a.getPostTessVertexSection();!c&&n.shaderStage!==I.HgiShaderStageFragment&&(this._variantSource=null),c&&(this._postTessVertex={primitive:c.getPrimitive(),verticesPerPatch:c.getVerticesPerPatch(),attributeSlots:c.getAttributeSlots(),attributes:c.getPulledAttributes(),tessFactorsBindIndex:a.getTessFactorsBindIndex()})}this._descriptor.shaderCodeDeclarations=null,this._descriptor.shaderCode=null,this._descriptor.generatedShaderCodeOut=null}_createModule(e){const t=this._descriptor.debugName,n=this._errors;this._shaderId=this._device.createShaderModule({label:t,code:e}),this._compilation=this._shaderId.getCompilationInfo().then(r=>{const s=r.messages.filter(a=>a.type==="error").map(a=>`${t}:${a.lineNum}:${a.linePos}: ${a.message}`);return this._errors=[n,...s].filter(Boolean).join(`
`),this._errors},()=>this._errors)}getInterstageInputs(){return this._interstageInputs}matchInterstageOutputs(e){if(!this._generator||!this._shaderId)return;const t=this._generator.matchInterstageOutputs(e.getInterstageInputs());t!==null&&(this._generatedCode=t,this._createModule(t))}getPolygonModeLineVariant(){return this.getVariant({polygonModeLine:!0})}getVariant(e){const t=Object.entries(e).filter(([,s])=>s).map(([s])=>s).sort();if(t.length===0)return this;if(!this._variantSource)return null;const n=t.join(",");let r=this._variants.get(n);if(!r){const{device:s,hgi:a,desc:o}=this._variantSource;r=new ms(s,a,o,Object.fromEntries(t.map(c=>[c,!0]))),this._variants.set(n,r)}return r}getAlphaToOneVariant(e){return this._descriptor.shaderStage!==I.HgiShaderStageFragment?null:this.getVariant({polygonModeLine:e,alphaToOne:!0})}_destroy(){this._shaderId=null,this._generator=null;for(const e of this._variants.values())e._destroy();this._variants.clear()}isValid(){return this._errors.length===0&&this._shaderId!==null}getCompileErrors(){return this._errors}waitForCompilation(){return this._compilation??Promise.resolve(this._errors)}getByteSizeOfResource(){return 0}getPostTessVertexInfo(){return this._postTessVertex}getRawResource(){return this._shaderId}getShaderId(){return this._shaderId}getEntryPoint(){return this._entryPoint}getColorOutputLocations(){return this._colorOutputLocations}getGeneratedCode(){return this._generatedCode}getBindGroupLayoutInfo(){return this._bindGroupLayoutInfo}}class kd extends Ml{static{u(this,"HgiWebGPUShaderProgram")}_vertexFunction=null;_fragmentFunction=null;_computeFunction=null;_postTessVertexFunction=null;_postTessControlFunction=null;_errors="";constructor(e){super(e);for(const t of e.shaderFunctions){const n=t.Get();switch(n.getDescriptor().shaderStage){case I.HgiShaderStageVertex:this._vertexFunction=n;break;case I.HgiShaderStageFragment:this._fragmentFunction=n;break;case I.HgiShaderStageCompute:this._computeFunction=n;break;case I.HgiShaderStagePostTessellationVertex:this._postTessVertexFunction=n;break;case I.HgiShaderStagePostTessellationControl:this._postTessControlFunction=n;break}}this._fragmentFunction&&(this._vertexFunction?.matchInterstageOutputs(this._fragmentFunction),this._postTessVertexFunction?.matchInterstageOutputs(this._fragmentFunction))}getShaderFunctions(){return this._descriptor.shaderFunctions}isValid(){return!0}getCompileErrors(){return this._errors}getByteSizeOfResource(){let e=0;for(const t of this._descriptor.shaderFunctions)e+=t.Get()?.getByteSizeOfResource()??0;return e}getRawResource(){return 0}getVertexFunction(){return this._vertexFunction}getFragmentFunction(){return this._fragmentFunction}getComputeFunction(){return this._computeFunction}getPostTessVertexFunction(){return this._postTessVertexFunction}getPostTessControlFunction(){return this._postTessControlFunction}}const ka=new WeakMap,Id=`
@group(0) @binding(0) var hgiDepth: texture_depth_2d;
@group(0) @binding(1) var hgiDepthFloat: texture_storage_2d<r32float, write>;

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) id: vec3<u32>) {
  let size = textureDimensions(hgiDepth, 0);
  if (id.x >= size.x || id.y >= size.y) {
    return;
  }
  let d = textureLoad(hgiDepth, vec2<i32>(id.xy), 0);
  textureStore(hgiDepthFloat, vec2<i32>(id.xy), vec4<f32>(d, 0.0, 0.0, 1.0));
}
`;function Cd(i){let e=ka.get(i);if(!e){const t=i.createShaderModule({label:"HgiWebGPU depth sampling",code:Id});e=i.createComputePipeline({label:"HgiWebGPU depth sampling",layout:"auto",compute:{module:t,entryPoint:"main"}}),ka.set(i,e)}return e}u(Cd,"_Pipeline");const Dd="r32float";function $d(i,e,t,n){const r=Cd(i),s=i.createBindGroup({label:"HgiWebGPU depth sampling",layout:r.getBindGroupLayout(0),entries:[{binding:0,resource:t.createView({dimension:"2d",aspect:"depth-only",baseMipLevel:0,mipLevelCount:1,baseArrayLayer:0,arrayLayerCount:1})},{binding:1,resource:n.createView()}]}),a=e.beginComputePass({label:"HgiWebGPU depth sampling"});a.setPipeline(r),a.setBindGroup(0,s),a.dispatchWorkgroups(Math.ceil(n.width/8),Math.ceil(n.height/8),1),a.end()}u($d,"HgiWebGPU_EncodeDepthSampling");const Ia={rgba8unorm:"rgba8unorm-srgb","rgba8unorm-srgb":"rgba8unorm","bc7-rgba-unorm":"bc7-rgba-unorm-srgb","bc7-rgba-unorm-srgb":"bc7-rgba-unorm"},Bd={r8unorm:{format:"rgba8unorm",channels:1,bytes:1,one:[255]},rg8unorm:{format:"rgba8unorm",channels:2,bytes:1,one:[255]},rgba8unorm:{format:"rgba8unorm",channels:4,bytes:1,one:[255]},r8snorm:{format:"rgba8snorm",channels:1,bytes:1,one:[127]},r16float:{format:"rgba16float",channels:1,bytes:2,one:[0,60]},r32float:{format:"rgba32float",channels:1,bytes:4,one:[0,0,128,63]}},Fd=new Set(["r8unorm","rg8unorm","rgba8unorm","rgba8unorm-srgb","r16float","rg16float","rgba16float","r32float","rg32float","rgba32float"]);class hr extends ea{static{u(this,"HgiWebGPUTexture")}_textureId=null;_textureView=null;_viewDesc={};_storageView=null;_depthSampling=null;_depthSamplingView=null;_ownsTexture;_gpuFormat;_borderFootprint=null;_swizzle=null;constructor(e,t,n){if(n){super(t),this._ownsTexture=!1,this._gpuFormat=n.format,this._textureId=n,this._textureView=n.createView({label:t.debugName});return}if("sourceTexture"in t){const f=t.sourceTexture.Get();super(f.getDescriptor()),this._ownsTexture=!1;const h=f.getGpuFormat(),p=B.getPixelFormat(t.format,f.getDescriptor().usage),m=p&&h&&(p===h||Ia[h]===p)?p:h;this._gpuFormat=m,this._textureId=f.getTextureId(),this._textureId&&m&&(this._viewDesc={label:t.debugName,format:m,dimension:B.getTextureViewDimension(f.getDescriptor().type),baseMipLevel:t.sourceFirstMip,mipLevelCount:t.mipLevels,baseArrayLayer:t.sourceFirstLayer,arrayLayerCount:t.layerCount},this._textureView=this._textureId.createView(this._viewDesc)),this._descriptor.debugName=t.debugName,this._descriptor.format=t.format,this._descriptor.layerCount=t.layerCount,this._descriptor.mipLevels=t.mipLevels;return}super(t),this._ownsTexture=!0;let r=B.getPixelFormat(t.format,t.usage);if(!r){this._gpuFormat=null,w(`HgiWebGPU: ${W[t.format]} has no WebGPU texture format (${t.debugName||"UNNAMED"})`);return}const s=t.componentMapping;if(s.r!==Ue.HgiComponentSwizzleR||s.g!==Ue.HgiComponentSwizzleG||s.b!==Ue.HgiComponentSwizzleB||s.a!==Ue.HgiComponentSwizzleA){const f=Bd[r];f?(this._swizzle={...f,mapping:[s.r,s.g,s.b,s.a]},r=f.format):Ne(`HgiWebGPU: texture component swizzle of ${r} is not supported; '${t.debugName||"UNNAMED"}' samples unswizzled`)}this._gpuFormat=r;const[a,o,c]=t.dimensions.data,l=t.type===K.HgiTextureTypeCubemap?6:t.type===K.HgiTextureType3D?Math.max(c,1):Math.max(t.layerCount,1),d=Ia[r];this._textureId=e.createTexture({label:t.debugName,size:{width:Math.max(a,1),height:Math.max(o,1),depthOrArrayLayers:l},format:r,dimension:B.getTextureDimension(t.type),mipLevelCount:Math.max(t.mipLevels,1),sampleCount:t.sampleCount>1?t.sampleCount:1,usage:this._getUsage(t,r),...d?{viewFormats:[d]}:{}}),this._textureView=this._textureId.createView({label:t.debugName,dimension:B.getTextureViewDimension(t.type)}),t.initialData&&t.pixelsByteSize>0&&this._uploadInitialData(e,t,l),this._descriptor.initialData=null}_getUsage(e,t){let n=B.getTextureUsage(e.usage);return e.sampleCount>1&&(n&=-9),e.mipLevels>1&&Fd.has(t)&&(n|=dt.RENDER_ATTACHMENT),n}_uploadInitialData(e,t,n){const r={blockWidth:1,blockHeight:1},s=Oo(t.format,r),a=Nl(t.format,t.dimensions,t.layerCount,t.pixelsByteSize),o=Math.min(a.length,t.mipLevels),c=ht(t.initialData),l=t.type===K.HgiTextureType3D;for(let d=0;d<o;d++){const f=a[d],[h,p,m]=f.dimensions.data,g=Math.ceil(h/r.blockWidth),_=Math.ceil(p/r.blockHeight),b=g*s,y=l?Math.max(m,1):n,S=Math.min(f.byteSizePerLayer*(l?1:n),c.byteLength-f.byteOffset);if(S<=0)break;let x=c.subarray(f.byteOffset,f.byteOffset+S),T=b;this._swizzle&&(x=this._Swizzle(x),T=g*4*this._swizzle.bytes),e.queue.writeTexture({texture:this._textureId,mipLevel:d},x,{offset:0,bytesPerRow:T,rowsPerImage:_},{width:g*r.blockWidth,height:_*r.blockHeight,depthOrArrayLayers:y})}}_Swizzle(e){const{channels:t,bytes:n,one:r,mapping:s}=this._swizzle,a=t*n,o=Math.floor(e.byteLength/a),c=new Uint8Array(o*4*n);for(let l=0;l<4;l++){const d=s[l];let f=null,h=-1;if(d===Ue.HgiComponentSwizzleZero)continue;if(d===Ue.HgiComponentSwizzleOne)f=r;else{const m=d-Ue.HgiComponentSwizzleR;if(m>=t){if(m!==3)continue;f=r}else h=m*n}const p=4*n;if(f){for(let m=0;m<n;m++){const g=f[m]??0;if(g!==0)for(let _=l*n+m;_<c.length;_+=p)c[_]=g}continue}for(let m=0;m<n;m++)for(let g=0,_=h+m,b=l*n+m;g<o;g++,_+=a,b+=p)c[b]=e[_]}return c}_destroy(){this._borderFootprint?.release(),this._borderFootprint=null,this._ownsTexture&&this._textureId?.destroy(),this._depthSampling?.destroy(),this._depthSampling=null,this._depthSamplingView=null,this._textureId=null,this._textureView=null,this._storageView=null}getByteSizeOfResource(){return ea._getByteSizeOfResource(this._descriptor)}getRawResource(){return this._textureId}getTextureId(){return this._textureId}getTextureView(){return this._textureView}getSampledViewExtent(){const e=this._textureId;if(!e)return null;const t=this._viewDesc?.baseMipLevel??0,n=this._viewDesc?.mipLevelCount??e.mipLevelCount-t;return{width:Math.max(e.width>>t,1),height:Math.max(e.height>>t,1),levels:Math.max(Math.min(n,e.mipLevelCount-t),1)}}getBorderFootprintView(e){if(!this._borderFootprint){const t=this.getSampledViewExtent();if(!t)return null;this._borderFootprint=ec(e,t.width,t.height,t.levels)}return this._borderFootprint.view}getStorageTextureView(){return!this._textureId||this._descriptor.type!==K.HgiTextureTypeCubemap?this._textureView:(this._storageView??=this._textureId.createView({...this._viewDesc,dimension:"2d-array"}),this._storageView)}isSampledThroughDepthCopy(){return!!this._gpuFormat&&B.isDepthFormat(this._gpuFormat)&&this._gpuFormat!=="stencil8"}getShaderReadView(e){if(!this.isSampledThroughDepthCopy()||!this._textureId)return this._textureView;if(!this._depthSamplingView){const t=this._textureId;if(t.dimension!=="2d"||t.sampleCount!==1)return w(`HgiWebGPU: depth texture '${this._descriptor.debugName||"UNNAMED"}' is sampled as a float texture; only single-sampled 2d depth textures can be`),null;this._depthSampling=this._createDepthSamplingTexture(e,t),this._depthSamplingView=this._depthSampling.createView({label:this._descriptor.debugName})}return this._depthSamplingView}encodeShaderRead(e,t){!this._textureId||!this._depthSampling||$d(e,t,this._textureId,this._depthSampling)}_createDepthSamplingTexture(e,t){return e.createTexture({label:`${this._descriptor.debugName} (depth sampling)`,size:{width:t.width,height:t.height,depthOrArrayLayers:1},format:Dd,usage:dt.TEXTURE_BINDING|dt.STORAGE_BINDING|dt.COPY_SRC})}getGpuFormat(){return this._gpuFormat}submitLayoutChange(e){return 0}}const Ed=Le({WebGPU:"WebGPU"}),Gd=["float32-filterable","depth-clip-control","texture-compression-bc","rg11b10ufloat-renderable","depth32float-stencil8","primitive-index","clip-distances"],Ld=["maxBufferSize","maxStorageBufferBindingSize","maxStorageBuffersPerShaderStage","maxSampledTexturesPerShaderStage","maxSamplersPerShaderStage","maxUniformBufferBindingSize","maxInterStageShaderVariables"],Ad=["maxStorageBuffersInVertexStage","maxStorageBuffersInFragmentStage","maxStorageTexturesInVertexStage","maxStorageTexturesInFragmentStage"],Rd=`
struct VsOut { @builtin(position) position: vec4<f32>, @location(0) uv: vec2<f32> };
@vertex fn vs(@builtin(vertex_index) i: u32) -> VsOut {
  var corners = array<vec2<f32>, 3>(vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
  let p = corners[i];
  var o: VsOut;
  o.position = vec4<f32>(p, 0.0, 1.0);
  o.uv = p * vec2<f32>(0.5, -0.5) + vec2<f32>(0.5);
  return o;
}
@group(0) @binding(0) var s: sampler;
@group(0) @binding(1) var t: texture_2d<f32>;
@fragment fn fs(i: VsOut) -> @location(0) vec4<f32> { return textureSample(t, s, i.uv); }
`;class jn extends Ol{static{u(this,"HgiWebGPU")}_device;_capabilities;_translator=od;_emptyBindGroups=new WeakMap;_mipmapPipelines=new Map;_mipmapSampler=null;_frameDepth=0;_held=[];_holdSubmit(e,t,n){if(this._held.push({buffer:e,submitted:t}),n)for(const r of n)this._heldTouched.add(r)}_heldTouched=new Set;_openBlits=new Set;_blitOpened(e){this._openBlits.add(e)}_blitClosed(e){this._openBlits.delete(e)}_pendingBlitWorkUses(e,t){if(this._heldTouched.has(e)||t._getTouched().has(e))return!0;for(const n of this._openBlits)if(n._getTouched().has(e))return!0;return!1}_submitNow(e){const t=this._held.splice(0);if(this._heldTouched.clear(),!(t.length===0&&e.length===0)){this._device.queue.submit([...t.map(n=>n.buffer),...e]);for(const n of t)n.submitted()}}_garbageCollector;_destroyed=!1;_tessellation=null;_pulledAttributePacker=null;constructor(e){super(),this._device=e,this._capabilities=new Uu(e),this._garbageCollector=new ed(e.queue),Cu(e)}static async create(e){if(e)return new jn(e);const t=globalThis.navigator?.gpu;if(!t)return null;const n=await t.requestAdapter();if(!n)return null;const r=Gd.filter(c=>n.features.has(c)),s={},a=n.limits;for(const c of Ld){const l=a[c];l!==void 0&&(s[c]=l)}for(const c of Ad){const l=a[c];typeof l=="number"&&(s[c]=l)}const o=await n.requestDevice({requiredFeatures:r,requiredLimits:s});return new jn(o)}IsBackendSupported(){return!this._destroyed&&!!this._device}getPrimaryDevice(){return this._device}getShaderBodyTranslator(){return this._translator}setShaderBodyTranslator(e){this._translator=e}isFloat32Filterable(){return this._capabilities.float32Filterable}hasPrimitiveIndex(){return this._device.features.has("primitive-index")}hasClipDistances(){return this._device.features.has("clip-distances")}createGraphicsCmds(e){const t=new rd(this,e);return this._garbageCollector.cmdsCreated(t),t}createBlitCmds(){const e=new Ou(this);return this._garbageCollector.cmdsCreated(e),e}createComputeCmds(e){const t=new Ju(this,e);return this._garbageCollector.cmdsCreated(t),t}_CreateTexture(e){return new Re(new hr(this._device,e),this.getUniqueId())}wrapExternalTexture(e,t){return new Re(new hr(this._device,t,e),this.getUniqueId())}destroyTexture(e){this._garbageCollector.trashObject(e.Get()),e._reset()}_createTextureView(e){const t=new Re(new hr(this._device,e),this.getUniqueId()),n=new Hl(e);return n.setViewTexture(t),new Re(n,this.getUniqueId())}destroyTextureView(e){const t=e.Get();if(t){const n=t.getViewTexture();this._garbageCollector.trashObject(n.Get()),t.setViewTexture(new Re)}e._reset()}createSampler(e){return new Re(new ad(this._device,e),this.getUniqueId())}destroySampler(e){this._garbageCollector.trashObject(e.Get()),e._reset()}_createBuffer(e){return new Re(new Nu(this._device,e),this.getUniqueId())}destroyBuffer(e){this._garbageCollector.trashObject(e.Get()),e._reset()}CreateShaderFunction(e){return new Re(new ms(this._device,this,e),this.getUniqueId())}destroyShaderFunction(e){this._garbageCollector.trashObject(e.Get()),e._reset()}createShaderProgram(e){return new Re(new kd(e),this.getUniqueId())}destroyShaderProgram(e){e._reset()}_createResourceBindings(e){return new Re(new ps(e),this.getUniqueId())}destroyResourceBindings(e){this._garbageCollector.trashObject(e.Get()),e._reset()}CreateGraphicsPipeline(e){return new Re(new ba(this._device,e,{unclippedDepth:this._device.features.has("depth-clip-control")}),this.getUniqueId())}_createGraphicsPipelineAhead(e){return new Re(new ba(this._device,e,{unclippedDepth:this._device.features.has("depth-clip-control")},!0),this.getUniqueId())}destroyGraphicsPipeline(e){this._garbageCollector.trashObject(e.Get()),e._reset()}CreateComputePipeline(e){return new Re(new Zu(this._device,e),this.getUniqueId())}destroyComputePipeline(e){this._garbageCollector.trashObject(e.Get()),e._reset()}getAPIName(){return Ed.WebGPU}getCapabilities(){return this._capabilities}getIndirectCommandEncoder(){return null}startFrame(){this._frameDepth++}endFrame(){this._frameDepth>0&&this._frameDepth--,this._submitNow([])}garbageCollect(){}_SubmitCmds(e,t){const n=super._SubmitCmds(e,t);return this._garbageCollector.cmdsSubmitted(e),n}getGarbageCollector(){return this._garbageCollector}_destroy(){this._destroyed||(this._destroyed=!0,this._garbageCollector.destroyAll(),this._device.destroy())}_getTessellation(){return this._tessellation??=new Mu(this._device),this._tessellation}_getPulledAttributePacker(){return this._pulledAttributePacker??=new $u(this._device),this._pulledAttributePacker}_getEmptyBindGroup(e){let t=this._emptyBindGroups.get(e);return t||(t=this._device.createBindGroup({label:"HgiWebGPU empty",layout:e,entries:[]}),this._emptyBindGroups.set(e,t)),t}_getMipmapPipeline(e){if(!this._mipmapPipelines.has(e))if(!(!e.startsWith("r32float")&&!e.startsWith("rg32float")&&!e.startsWith("rgba32float")||this._capabilities.float32Filterable))this._mipmapPipelines.set(e,null);else{const n=this._device.createShaderModule({label:"HgiWebGPU mipmaps",code:Rd});this._mipmapPipelines.set(e,this._device.createRenderPipeline({label:`HgiWebGPU mipmaps ${e}`,layout:"auto",vertex:{module:n,entryPoint:"vs"},fragment:{module:n,entryPoint:"fs",targets:[{format:e}]},primitive:{topology:"triangle-list"}}))}return this._mipmapPipelines.get(e)??null}_getMipmapSampler(){return this._mipmapSampler??=this._device.createSampler({minFilter:"linear",magFilter:"linear"}),this._mipmapSampler}}const Ca=vn.define("HgiWebGPU",[Ul()]);Ca.getFactory()||Ca.setFactory(new Vl(()=>jn.create()));const Ii={k:"void"},It={k:"scalar",s:"bool"},Nt={k:"scalar",s:"int"},nc={k:"scalar",s:"uint"},lt={k:"scalar",s:"float"};function Te(i){return{k:"scalar",s:i}}u(Te,"scalar");function O(i,e){return e===1?{k:"scalar",s:i}:{k:"vector",s:i,n:e}}u(O,"vec");function cn(i,e){return{k:"matrix",c:i,r:e}}u(cn,"mat");const Ft={sampler1D:{dim:"1d",sampled:"float"},sampler2D:{dim:"2d",sampled:"float"},sampler3D:{dim:"3d",sampled:"float"},samplerCube:{dim:"cube",sampled:"float"},sampler1DArray:{dim:"1d_array",sampled:"float"},sampler2DArray:{dim:"2d_array",sampled:"float"},samplerCubeArray:{dim:"cube_array",sampled:"float"},sampler2DShadow:{dim:"2d",sampled:"float",shadow:!0},sampler2DArrayShadow:{dim:"2d_array",sampled:"float",shadow:!0},samplerBuffer:{dim:"buffer",sampled:"float"},isampler1D:{dim:"1d",sampled:"int"},isampler2D:{dim:"2d",sampled:"int"},isampler3D:{dim:"3d",sampled:"int"},isamplerBuffer:{dim:"buffer",sampled:"int"},usampler1D:{dim:"1d",sampled:"uint"},usampler2D:{dim:"2d",sampled:"uint"},usampler3D:{dim:"3d",sampled:"uint"},usampler1DArray:{dim:"1d_array",sampled:"uint"},usampler2DArray:{dim:"2d_array",sampled:"uint"},usamplerBuffer:{dim:"buffer",sampled:"uint"},image1D:{dim:"1d",sampled:"float",image:!0},image2D:{dim:"2d",sampled:"float",image:!0},image3D:{dim:"3d",sampled:"float",image:!0},image2DArray:{dim:"2d_array",sampled:"float",image:!0},iimage2D:{dim:"2d",sampled:"int",image:!0},uimage2D:{dim:"2d",sampled:"uint",image:!0}},ic=(()=>{const i={void:Ii,bool:It,int:Nt,uint:nc,float:lt,double:lt,half:lt,atomic_int:{k:"atomic",s:"int"},atomic_uint:{k:"atomic",s:"uint"}};for(const e of[2,3,4]){i[`vec${e}`]=O("float",e),i[`dvec${e}`]=O("float",e),i[`ivec${e}`]=O("int",e),i[`uvec${e}`]=O("uint",e),i[`bvec${e}`]=O("bool",e),i[`mat${e}`]=cn(e,e),i[`dmat${e}`]=cn(e,e);for(const t of[2,3,4])i[`mat${e}x${t}`]=cn(e,t),i[`dmat${e}x${t}`]=cn(e,t)}for(const e of Object.keys(Ft))i[e]={k:"sampler",name:e};return i})();function $n(i){return ic[i]}u($n,"basicType");function Md(i){return i in ic}u(Md,"isBasicTypeName");function he(i,e){if(i.k!==e.k)return!1;switch(i.k){case"void":return!0;case"scalar":return i.s===e.s;case"vector":return i.s===e.s&&i.n===e.n;case"matrix":return i.c===e.c&&i.r===e.r;case"array":return i.size===e.size&&he(i.elem,e.elem);case"struct":return i.name===e.name;case"sampler":return i.name===e.name;case"atomic":return i.s===e.s;case"typeparam":return i.name===e.name}}u(he,"typeEq");function xe(i){if(i.k==="scalar"||i.k==="vector")return i.s;if(i.k==="matrix")return"float";if(i.k==="atomic")return i.s}u(xe,"scalarOf");function jt(i){return i.k==="scalar"?1:i.k==="vector"?i.n:i.k==="matrix"?i.c*i.r:0}u(jt,"componentCount");function pr(i,e){return i.k==="scalar"?Te(e):i.k==="vector"?O(e,i.n):i}u(pr,"withScalar");function k(i){switch(i.k){case"void":return"void";case"scalar":return i.s;case"vector":return`${i.s==="float"?"":i.s[0]}vec${i.n}`;case"matrix":return i.c===i.r?`mat${i.c}`:`mat${i.c}x${i.r}`;case"array":return`${k(i.elem)}[${i.size??""}]`;case"struct":return i.name;case"sampler":return i.name;case"atomic":return`atomic_${i.s}`;case"typeparam":return i.name}}u(k,"glslName");const Et={bool:"bool",int:"i32",uint:"u32",float:"f32"};function Da(i){return Et[i]}u(Da,"wgslScalar");function Jr(i,e=t=>t){switch(i.k){case"void":return"";case"scalar":return Et[i.s];case"vector":return`vec${i.n}<${Et[i.s]}>`;case"matrix":return`mat${i.c}x${i.r}<f32>`;case"array":return i.size===null?`array<${Jr(i.elem,e)}>`:`array<${Jr(i.elem,e)}, ${i.size}>`;case"struct":return e(i.name);case"atomic":return`atomic<${Et[i.s]}>`;case"sampler":return Ft[i.name]?Nd(i.name):i.name;case"typeparam":return i.name}}u(Jr,"wgslName");function Nd(i){const e=Ft[i];if(!e)return i;const t=Et[e.sampled];return e.shadow?e.dim==="2d_array"?"texture_depth_2d_array":"texture_depth_2d":e.image?`texture_storage_${e.dim}<rgba32float, read_write>`:e.dim==="buffer"?`texture_1d<${t}>`:e.dim==="1d_array"?`texture_2d_array<${t}>`:`texture_${e.dim}<${t}>`}u(Nd,"wgslTextureType");function Zr(i){switch(i.k){case"void":return"v";case"scalar":return Et[i.s];case"vector":return`v${i.n}${Et[i.s][0]}`;case"matrix":return`m${i.c}x${i.r}`;case"array":return`a${i.size??"r"}_${Zr(i.elem)}`;case"struct":return i.name;case"sampler":return i.name;case"atomic":return`at${Et[i.s]}`;case"typeparam":return i.name}}u(Zr,"mangleTag");function nn(i,e){if(he(i,e))return!0;const t=i.k==="scalar"||i.k==="vector"?i.s:void 0,n=e.k==="scalar"||e.k==="vector"?e.s:void 0;return t===void 0||n===void 0||i.k!==e.k||i.k==="vector"&&i.n!==e.n?!1:t==="int"?n==="uint"||n==="float":t==="uint"?n==="float":!1}u(nn,"canImplicitlyConvert");function Od(i){return i.k==="scalar"||i.k==="vector"}u(Od,"isScalarOrVector");const G=["float"],In=["float","int","uint"],rc=["float","int"],Cn=["int","uint"],sc={};function P(i,e,t,n,r){(sc[i]??=[]).push(r?{kinds:e,sigs:t,wgsl:n,sizes:r}:{kinds:e,sigs:t,wgsl:n})}u(P,"def");for(const i of["sin","cos","tan","asin","acos","sinh","cosh","tanh","asinh","acosh","atanh","radians","degrees"])P(i,G,["G : G"],`fn:${i}`);P("atan",G,["G : G"],"fn:atan");P("atan",G,["G G : G"],"fn:atan2");for(const i of["exp","log","exp2","log2","sqrt"])P(i,G,["G : G"],`fn:${i}`);P("pow",G,["G G : G"],"fn:pow");P("inversesqrt",G,["G : G"],"fn:inverseSqrt");P("abs",rc,["G : G"],"fn:abs");P("sign",rc,["G : G"],"fn:sign");for(const i of["floor","trunc","ceil","fract"])P(i,G,["G : G"],`fn:${i}`);P("round",G,["G : G"],"fn:round");P("roundEven",G,["G : G"],"fn:round");P("mod",G,["G G : G","G S : G"],"helper:mod");P("min",In,["G G : G","G S : G"],"fn:min");P("max",In,["G G : G","G S : G"],"fn:max");P("clamp",In,["G G G : G","G S S : G"],"fn:clamp");P("mix",G,["G G G : G","G G S : G"],"fn:mix");P("mix",In.concat(["bool"]),["G G Gb : G"],"op:select($0, $1, $2)");P("step",G,["G G : G","S G : G"],"fn:step");P("smoothstep",G,["G G G : G","S S G : G"],"fn:smoothstep");P("isnan",G,["G : Gb"],"helper:isnan");P("isinf",G,["G : Gb"],"helper:isinf");P("floatBitsToInt",G,["G : Gi"],"op:bitcast<$R>($0)");P("floatBitsToUint",G,["G : Gu"],"op:bitcast<$R>($0)");P("intBitsToFloat",["int"],["G : Gf"],"op:bitcast<$R>($0)");P("uintBitsToFloat",["uint"],["G : Gf"],"op:bitcast<$R>($0)");P("fma",G,["G G G : G"],"fn:fma");P("frexp",G,["G Gi : G"],"out:frexp");P("packHalf2x16",G,["v2 : u"],"fn:pack2x16float");P("unpackHalf2x16",G,["u : v2"],"fn:unpack2x16float");P("packUnorm2x16",G,["v2 : u"],"fn:pack2x16unorm");P("packSnorm2x16",G,["v2 : u"],"fn:pack2x16snorm");P("unpackUnorm2x16",G,["u : v2"],"fn:unpack2x16unorm");P("unpackSnorm2x16",G,["u : v2"],"fn:unpack2x16snorm");P("packUnorm4x8",G,["v4 : u"],"fn:pack4x8unorm");P("packSnorm4x8",G,["v4 : u"],"fn:pack4x8snorm");P("unpackUnorm4x8",G,["u : v4"],"fn:unpack4x8unorm");P("unpackSnorm4x8",G,["u : v4"],"fn:unpack4x8snorm");P("length",G,["G : S"],"fn:length");P("distance",G,["G G : S"],"fn:distance");P("dot",G,["G G : S"],"fn:dot");P("cross",G,["v3 v3 : v3"],"fn:cross");P("normalize",G,["V : V"],"fn:normalize");P("normalize",G,["S : S"],"op:sign($0)");P("faceforward",G,["V V V : V"],"fn:faceForward");P("reflect",G,["V V : V"],"fn:reflect");P("refract",G,["V V S : V"],"fn:refract");for(const[i,e]of[["lessThan","<"],["lessThanEqual","<="],["greaterThan",">"],["greaterThanEqual",">="]])P(i,In,["V V : Vb"],`op:($0 ${e} $1)`,[2,3,4]);for(const[i,e]of[["equal","=="],["notEqual","!="]])P(i,In.concat(["bool"]),["V V : Vb"],`op:($0 ${e} $1)`,[2,3,4]);P("any",["bool"],["V : b"],"fn:any",[2,3,4]);P("all",["bool"],["V : b"],"fn:all",[2,3,4]);P("not",["bool"],["V : V"],"op:(!$0)",[2,3,4]);P("bitfieldExtract",Cn,["G i i : G"],"op:extractBits($0, u32($1), u32($2))");P("bitfieldInsert",Cn,["G G i i : G"],"op:insertBits($0, $1, u32($2), u32($3))");P("bitfieldReverse",Cn,["G : G"],"fn:reverseBits");P("bitCount",Cn,["G : Gi"],"op:$RC(countOneBits($0))");P("findLSB",Cn,["G : Gi"],"op:$RC(firstTrailingBit($0))");P("findMSB",Cn,["G : Gi"],"op:$RC(firstLeadingBit($0))");for(const[i,e]of[["dFdx","dpdx"],["dFdy","dpdy"],["fwidth","fwidth"],["dFdxFine","dpdxFine"],["dFdyFine","dpdyFine"],["dFdxCoarse","dpdxCoarse"],["dFdyCoarse","dpdyCoarse"],["fwidthFine","fwidthFine"],["fwidthCoarse","fwidthCoarse"]])P(i,G,["G : G"],`fn:${e}`);function $a(i,e,t){switch(i){case"G":return O(e,t);case"V":return t===1?null:O(e,t);case"S":return Te(e);case"Gb":return O("bool",t);case"Vb":return t===1?null:O("bool",t);case"Gi":return O("int",t);case"Gu":return O("uint",t);case"Gf":return O("float",t);case"f":return Te("float");case"i":return Te("int");case"u":return Te("uint");case"b":return Te("bool");case"v2":return O("float",2);case"v3":return O("float",3);case"v4":return O("float",4)}throw new Error(`bad builtin pattern ${i}`)}u($a,"tok");const Ba=new Map;function Fa(i){const e=Ba.get(i);if(e)return e;const t=sc[i];if(!t)return;const n=[],r=new Set;for(const s of t)for(const a of s.kinds)for(const o of s.sizes??[1,2,3,4])for(const c of s.sigs){const[l,d]=c.split(":").map(m=>m.trim()),f=l.split(/\s+/).filter(Boolean).map(m=>$a(m,a,o)),h=$a(d,a,o);if(h===null||f.some(m=>m===null))continue;const p=JSON.stringify([f,h]);r.has(p)||(r.add(p),n.push({name:i,params:f,ret:h,wgsl:s.wgsl}))}return Ba.set(i,n),n}u(Fa,"builtinOverloads");function Hd(i,e){const t=e[0];if(!t||t.k!=="matrix"){if(i==="outerProduct"&&e.length===2){const[n,r]=e;if(n.k==="vector"&&r.k==="vector")return{name:i,params:[O("float",n.n),O("float",r.n)],ret:cn(r.n,n.n),wgsl:"helper:outerProduct"}}return}switch(i){case"transpose":return e.length===1?{name:i,params:[t],ret:cn(t.r,t.c),wgsl:"fn:transpose"}:void 0;case"determinant":return e.length===1&&t.c===t.r?{name:i,params:[t],ret:Te("float"),wgsl:"fn:determinant"}:void 0;case"inverse":return e.length===1&&t.c===t.r?{name:i,params:[t],ret:t,wgsl:"helper:inverse"}:void 0;case"matrixCompMult":return e.length===2?{name:i,params:[t,t],ret:t,wgsl:"helper:matrixCompMult"}:void 0}}u(Hd,"matrixBuiltin");const Ea=new Set(["transpose","determinant","inverse","matrixCompMult","outerProduct"]),Ud=new Set(["texture","textureLod","textureGrad","texelFetch","textureSize","textureQueryLevels","textureOffset","textureLodOffset","textureProj","textureGather","imageLoad","imageStore","imageSize"]),Vd={atomicAdd:"atomicAdd",atomicMin:"atomicMin",atomicMax:"atomicMax",atomicAnd:"atomicAnd",atomicOr:"atomicOr",atomicXor:"atomicXor",atomicExchange:"atomicExchange",atomicCompSwap:"atomicCompareExchangeWeak"},Wd={barrier:"workgroupBarrier()",memoryBarrier:"storageBarrier()",memoryBarrierBuffer:"storageBarrier()",memoryBarrierShared:"workgroupBarrier()",memoryBarrierImage:"textureBarrier()",groupMemoryBarrier:"workgroupBarrier()"},zd=new Set(["EmitVertex","EndPrimitive","EmitStreamVertex","EndStreamPrimitive"]),Xd=`
alias break case const const_assert continue continuing default diagnostic discard else enable false fn for if let
loop override requires return struct switch true var while
NULL Self abstract active alignas alignof as asm asm_fragment async attribute auto await become binding_array cast
catch class co_await co_return co_yield coherent column_major common compile compile_fragment concept const_cast
consteval constexpr constinit crate debugger decltype delete demote demote_to_helper do dynamic_cast enum explicit
export extends extern external fallthrough filter final finally friend from fxgroup get goto groupshared highp impl
implements import inline instanceof interface layout lowp macro macro_rules match mediump meta mod module move mut
mutable namespace new nil noexcept noinline nointerpolation non_coherent noncoherent noperspective null nullptr of
operator package packoffset partition pass patch pixelfragment precise precision premerge priv protected pub public
readonly ref regardless register reinterpret_cast require resource restrict self set shared sizeof smooth snorm
static static_assert static_cast std subroutine super target template this thread_local throw trait try type
typedef typeid typename typeof union unless unorm unsafe unsized use using varying virtual volatile wgsl where with
writeonly yield
`,qd=`
bool f16 f32 i32 u32 vec2 vec3 vec4 mat2x2 mat2x3 mat2x4 mat3x2 mat3x3 mat3x4 mat4x2 mat4x3 mat4x4 array atomic ptr
sampler sampler_comparison texture_1d texture_2d texture_2d_array texture_3d texture_cube texture_cube_array
texture_multisampled_2d texture_depth_2d texture_depth_2d_array texture_depth_cube texture_depth_cube_array
texture_depth_multisampled_2d texture_storage_1d texture_storage_2d texture_storage_2d_array texture_storage_3d
texture_external vec2i vec3i vec4i vec2u vec3u vec4u vec2f vec3f vec4f vec2h vec3h vec4h mat2x2f mat2x3f mat2x4f
mat3x2f mat3x3f mat3x4f mat4x2f mat4x3f mat4x4f mat2x2h mat2x3h mat2x4h mat3x2h mat3x3h mat3x4h mat4x2h mat4x3h
mat4x4h read write read_write function private workgroup uniform storage handle
bitcast all any select arrayLength abs acos acosh asin asinh atan atanh atan2 ceil clamp cos cosh countLeadingZeros
countOneBits countTrailingZeros cross degrees determinant distance dot dot4U8Packed dot4I8Packed exp exp2
extractBits faceForward firstLeadingBit firstTrailingBit floor fma fract frexp insertBits inverseSqrt ldexp length
log log2 max min mix modf normalize pow quantizeToF16 radians reflect refract reverseBits round saturate sign sin
sinh smoothstep sqrt step tan tanh transpose trunc dpdx dpdxCoarse dpdxFine dpdy dpdyCoarse dpdyFine fwidth
fwidthCoarse fwidthFine textureDimensions textureGather textureGatherCompare textureLoad textureNumLayers
textureNumLevels textureNumSamples textureSample textureSampleBias textureSampleCompare textureSampleCompareLevel
textureSampleGrad textureSampleLevel textureSampleBaseClampToEdge textureStore atomicLoad atomicStore atomicAdd
atomicSub atomicMax atomicMin atomicAnd atomicOr atomicXor atomicExchange atomicCompareExchangeWeak pack4x8snorm
pack4x8unorm pack4xI8 pack4xU8 pack4xI8Clamp pack4xU8Clamp pack2x16snorm pack2x16unorm pack2x16float
unpack4x8snorm unpack4x8unorm unpack4xI8 unpack4xU8 unpack2x16snorm unpack2x16unorm unpack2x16float
storageBarrier textureBarrier workgroupBarrier workgroupUniformLoad subgroupAdd subgroupBallot
`,jd=new Set(Xd.split(/\s+/).filter(Boolean)),Qd=new Set(qd.split(/\s+/).filter(Boolean));function Yd(i){return jd.has(i)||Qd.has(i)}u(Yd,"isWgslReserved");function pt(i){let e=i;return e.startsWith("__")&&(e=`u${e}`),e==="_"&&(e="_u"),Yd(e)&&(e=`${e}_`),e}u(pt,"safeIdentifier");class Ci extends Error{static{u(this,"CheckError")}loc;constructor(e,t){super(e),this.loc=t}}const Kd=["xyzw","rgba","stpq"];function Ga(i,e){return i.k==="scalar"&&e.k==="scalar"&&i.s==="uint"&&e.s==="int"||i.k==="vector"&&e.k==="vector"&&i.n===e.n&&i.s==="uint"&&e.s==="int"}u(Ga,"uintToInt");function ac(i){const e=i.wgsl.slice(7),t=i.params[0];return e==="outerProduct"?`${e}:${jt(t)}x${jt(i.params[1])}`:`${e}:${k(t)}`}u(ac,"helperKey");function Jd(i,e){return new Zd(e).run(i)}u(Jd,"check");class Zd{static{u(this,"Checker")}diagnostics=[];structs=new Map;overloads=new Map;templates=new Map;instantiations=new Map;checked=[];globals=[];globalScope=new Map;scopes=[];currentFn=null;pending=[];undefinedFunctions=new Set;stubs=[];helpers=new Set;usesDerivatives=!1;moduleNames=new Set;options;constructor(e){this.options=e}error(e,t){throw new Ci(e,t)}diag(e,t,n){this.diagnostics.push(n?{severity:e,message:t,loc:n}:{severity:e,message:t})}keepModuleName(e){return this.moduleNames.add(e),e}claimModuleName(e){let t=pt(e),n=1;for(;this.moduleNames.has(t);)t=`${pt(e)}_${n++}`;return this.moduleNames.add(t),t}run(e){for(const n of this.options.externalStructs??[])this.declareExternalStruct(n);for(const n of e.decls)n.kind==="struct"&&this.declareStruct(n);for(const n of e.decls)n.kind==="block"&&this.declareBlock(n);for(const n of this.options.externals??[])this.declareExternal(n);for(const n of this.options.externalFunctions??[])this.declareExternalFunction(n);for(const n of e.decls)n.kind==="function"&&this.declareFunction(n);this.assignFunctionNames();for(const n of e.decls)n.kind==="global"&&this.declareGlobal(n);for(const n of e.decls){if(n.kind!=="function"||!n.body||n.templateParams.length)continue;const r=this.findDefinition(n);this.pending.push({sym:r,decl:n})}for(;this.pending.length;){const n=this.pending.shift();this.checkFunction(n.sym,n.decl),this.drainTemplates()}this.drainTemplates();for(const n of this.overloads.values())for(const r of n)r.used&&!r.defined&&this.stubs.push(r);const t=new Map;for(const[n,r]of this.overloads)for(const s of r)s.wgsl!==n&&t.set(`${n}(${s.params.map(a=>k(a.type)).join(",")})`,s.wgsl);for(const n of this.instantiations.values())t.set(`${n.name}<${[...(n.typeArgs??new Map).values()].map(k).join(",")}>`,n.wgsl);return{structs:this.structs,functions:this.checked,globals:this.globals,diagnostics:this.diagnostics,nameMap:t,undefinedFunctions:this.undefinedFunctions,stubs:this.stubs,helpers:this.helpers,usesDerivatives:this.usesDerivatives}}resolveType(e,t=[],n){let r=n?.get(e.name)??$n(e.name);if(!r){const a=this.structs.get(e.name);a&&(r={k:"struct",name:a.name,fields:a.fields})}r||this.error(`unknown type '${e.name}'`,e.loc);const s=[...t,...e.arraySizes];for(let a=s.length-1;a>=0;a--){const o=s[a];r={k:"array",elem:r,size:o==null?null:this.constInt(o)}}return r}declareExternalStruct(e){const t=e.fields.map(r=>{let s=$n(r.type)??this.structType(r.type);return s||this.error(`unknown type '${r.type}' in interface struct ${e.name}`),r.arraySize!==void 0&&(s={k:"array",elem:s,size:r.arraySize}),{name:r.name,type:s}}),n=e.declare!==!1;this.structs.set(e.name,{name:e.name,wgsl:n?this.claimModuleName(e.name):this.keepModuleName(e.name),fields:t,decl:null,external:!0,emit:n})}structType(e){const t=this.structs.get(e);return t?{k:"struct",name:t.name,fields:t.fields}:void 0}declareStruct(e){if(this.structs.has(e.name)){if(this.structs.get(e.name).external)return;this.error(`struct '${e.name}' redefined`,e.loc)}const t=e.fields.map(r=>({name:r.name,type:this.resolveType(r.type,r.arraySizes)})),n=this.options.providedStructs?.includes(e.name)??!1;this.structs.set(e.name,{name:e.name,wgsl:n?this.keepModuleName(e.name):this.claimModuleName(e.name),fields:t,decl:e,external:!1,emit:!n})}declareBlock(e){const t=e.fields.map(n=>({name:n.name,type:this.resolveType(n.type,n.arraySizes)}));if(e.instance){this.structs.has(e.blockName)||this.structs.set(e.blockName,{name:e.blockName,wgsl:this.claimModuleName(e.blockName),fields:t,decl:null,external:!1,emit:!0});let n={k:"struct",name:e.blockName,fields:t};for(let r=e.arraySizes.length-1;r>=0;r--){const s=e.arraySizes[r];n={k:"array",elem:n,size:s==null?null:this.constInt(s)}}this.addGlobal({name:e.instance,wgsl:this.claimModuleName(e.instance),type:n,storage:"private",isConst:!1},null,null,null,e.loc)}else for(const n of t)this.addGlobal({name:n.name,wgsl:this.claimModuleName(n.name),type:n.type,storage:"private",isConst:!1},null,null,null,e.loc)}declareExternal(e){let t=$n(e.type)??this.structType(e.type);if(t||this.error(`unknown type '${e.type}' for interface symbol ${e.name}`),e.atomic){const a=xe(t);a!=="int"&&a!=="uint"&&this.error(`atomic interface symbol ${e.name} must be int or uint`),t={k:"atomic",s:a}}e.arraySize!==void 0&&(typeof e.arraySize=="string"&&e.arraySize!=="runtime"&&this.error(`unresolved array size '${e.arraySize}' for ${e.name}`),t={k:"array",elem:t,size:e.arraySize==="runtime"?null:e.arraySize});const r=e.declare??e.accessExpr===void 0?this.claimModuleName(e.name):e.accessExpr??this.keepModuleName(e.name),s={name:e.name,wgsl:r,type:t,storage:"external",isConst:!1,space:e.space,readonly:e.space==="uniform"||e.space==="storage"&&e.access!=="read_write"};e.accessExpr!==void 0&&(s.access=e.accessExpr),e.samplerAccessExpr!==void 0&&(s.samplerWgsl=e.samplerAccessExpr),this.addGlobal(s,null,null,e)}addGlobal(e,t,n,r,s){if(this.globalScope.has(e.name)){if(this.globalScope.get(e.name).storage==="external"&&!r){this.diag("warning",`'${e.name}' is declared by the stage interface; the GLSL declaration is ignored`,s);return}this.error(`'${e.name}' redeclared`,s)}this.globalScope.set(e.name,e),this.globals.push({sym:e,decl:t,declarator:n,external:r})}declareGlobal(e){const t=e.qualifiers.includes("const");for(const n of e.declarators){let r=this.resolveType(e.type,n.arraySizes),s=null;n.init&&(this.scopes=[this.globalScope],s=this.checkInitializer(n.init,r),r.k==="array"&&r.size===null&&s.ty?.k==="array"&&(r=s.ty),n.init=s),n.ty=r;const a={name:n.name,wgsl:this.claimModuleName(n.name),type:r,storage:t?"const":"private",isConst:t};if(t&&s){const o=this.tryConstInt(s);o!==void 0&&(a.constValue=o)}n.sym=a,this.addGlobal(a,e,n,null,n.loc)}}paramTypes(e,t){return e.params.map(n=>({name:n.name,type:this.resolveType(n.type,n.arraySizes,t),qualifier:n.qualifier,defaultValue:n.defaultValue}))}declareFunction(e){if(e.templateParams.length){(this.templates.get(e.name)??this.templates.set(e.name,[]).get(e.name)).push(e);return}const t=this.paramTypes(e),n=this.resolveType(e.returnType),r=this.overloads.get(e.name)??[],s=r.find(a=>a.params.length===t.length&&a.params.every((o,c)=>he(o.type,t[c].type)));if(s){if(he(s.returnType,n)||this.error(`'${e.name}' redeclared with a different return type`,e.loc),s.external){e.body&&this.error(`'${e.name}' is defined by the shader generator; the GLSL may not redefine it`,e.loc);return}e.body&&(s.defined&&this.error(`function '${e.name}(${t.map(a=>k(a.type)).join(", ")})' redefined`,e.loc),s.defined=!0,s.decl=e,s.params=t),s.params.forEach((a,o)=>{const c=t[o];!a.defaultValue&&c.defaultValue&&(a.defaultValue=c.defaultValue)});return}r.push({name:e.name,wgsl:e.name,returnType:n,params:t,decl:e,defined:!!e.body,used:!1}),this.overloads.set(e.name,r)}assignFunctionNames(){for(const[e,t]of this.overloads){if(t.some(r=>r.external)){t.length>1&&this.error(`'${e}' is defined by the shader generator and cannot be overloaded`);continue}if(t.length===1){t[0].wgsl=this.claimModuleName(e);continue}const n=[...t].sort((r,s)=>r.params.length-s.params.length);for(const r of n){const s=r.params.length===0?e:`${e}_${r.params.map(a=>Zr(a.type)).join("_")}`;r.wgsl=this.claimModuleName(s)}}}declareExternalFunction(e){const t=u(r=>{const s=$n(r)??this.structType(r);return s||this.error(`unknown type '${r}' in host function ${e.name}`),s},"type"),n=this.overloads.get(e.name)??[];n.push({name:e.name,wgsl:this.keepModuleName(e.name),returnType:t(e.returnType),params:e.params.map((r,s)=>({name:`p${s}`,type:t(r),qualifier:"in",defaultValue:null})),decl:null,defined:!0,used:!1,external:!0}),this.overloads.set(e.name,n)}findDefinition(e){const n=this.overloads.get(e.name).find(r=>r.decl===e);return n||this.error(`internal: no symbol for ${e.name}`,e.loc),n}checkFunction(e,t){this.currentFn=e,this.scopes=[this.globalScope,new Map];const n=[];for(const r of e.params){const s={name:r.name,wgsl:pt(r.name||`_p${n.length}`),type:r.type,storage:r.qualifier==="in"?"param":"refparam",isConst:!1};n.push(s),r.name&&this.top().set(r.name,s)}try{this.checkBlock(t.body,!1),this.checked.push({sym:e,decl:t,params:n})}catch(r){if(r instanceof Ci){const s=`${e.name}(${e.params.map(a=>k(a.type)).join(", ")})`;throw new Ci(`in ${s}: ${r.message}`,r.loc)}throw r}finally{this.currentFn=null}}top(){return this.scopes[this.scopes.length-1]}lookup(e){for(let t=this.scopes.length-1;t>=0;t--){const n=this.scopes[t].get(e);if(n)return n}}push(){this.scopes.push(new Map)}pop(){this.scopes.pop()}checkBlock(e,t=!0){t&&this.push();for(let n=0;n<e.stmts.length;n++)e.stmts[n]=this.checkStmt(e.stmts[n]);t&&this.pop()}checkCond(e){const t=this.rvalue(this.checkExpr(e));return t.ty?.k==="scalar"&&t.ty.s==="bool"||this.error(`condition must be bool, not ${k(t.ty)}`,e.loc),t}checkStmt(e){switch(e.kind){case"block":return this.checkBlock(e),e;case"decl":{const t=e.qualifiers.includes("const");for(const n of e.declarators){let r=this.resolveType(e.type,n.arraySizes);n.init?(n.init=this.checkInitializer(n.init,r),r.k==="array"&&r.size===null&&n.init.ty?.k==="array"&&(r=n.init.ty)):t&&this.error(`const '${n.name}' needs an initializer`,n.loc),n.ty=r;const s={name:n.name,wgsl:pt(n.name),type:r,storage:"local",isConst:t};if(t&&n.init){const a=this.tryConstInt(n.init);a!==void 0&&(s.constValue=a)}n.sym=s,this.top().set(n.name,s)}return e}case"localstruct":return this.declareStruct(e.decl),e;case"expr":return e.expr=this.checkExpr(e.expr),e;case"if":return e.cond=this.checkCond(e.cond),this.push(),e.then=this.checkStmt(e.then),this.pop(),e.else&&(this.push(),e.else=this.checkStmt(e.else),this.pop()),e;case"for":return this.push(),e.init&&(e.init=this.checkStmt(e.init)),e.cond&&(e.cond=this.checkCond(e.cond)),e.update&&(e.update=this.checkExpr(e.update)),this.push(),e.body=this.checkStmt(e.body),this.pop(),this.pop(),e;case"while":return e.cond=this.checkCond(e.cond),this.push(),e.body=this.checkStmt(e.body),this.pop(),e;case"dowhile":return this.push(),e.body=this.checkStmt(e.body),this.pop(),e.cond=this.checkCond(e.cond),e;case"switch":{let t=this.rvalue(this.checkExpr(e.expr));const n=t.ty;n.k==="scalar"&&(n.s==="int"||n.s==="uint")||this.error("switch selector must be int or uint",e.loc),e.expr=t;for(const r of e.cases)r.labels=r.labels.map(s=>s==="default"?s:this.convert(this.rvalue(this.checkExpr(s)),n,s.loc)),this.push(),r.body=r.body.map(s=>this.checkStmt(s)),this.pop();return t=e.expr,e}case"return":{const t=this.currentFn;return e.value?(t.returnType.k==="void"&&this.error("void function returns a value",e.loc),e.value=this.convert(this.rvalue(this.checkExpr(e.value)),t.returnType,e.loc)):t.returnType.k!=="void"&&this.error("non-void function returns no value",e.loc),e}case"discard":return e;default:return e}}checkInitializer(e,t){if(e.kind==="initlist"){if(t.k==="array"){const r=e.items.map(o=>this.checkInitializer(o,t.elem)),s=t.size??r.length;return r.length!==s&&this.error(`initializer has ${r.length} elements, the array ${s}`,e.loc),{kind:"call",callee:k(t.elem),ctorArray:[],args:r,loc:e.loc,ctor:{k:"array",elem:t.elem,size:s},ty:{k:"array",elem:t.elem,size:s}}}if(t.k==="struct"){const r=this.structs.get(t.name);e.items.length!==r.fields.length&&this.error(`initializer for ${t.name} has ${e.items.length} items, the struct ${r.fields.length} fields`,e.loc);const s=e.items.map((a,o)=>this.checkInitializer(a,r.fields[o].type));return{kind:"call",callee:t.name,args:s,loc:e.loc,ctor:t,ty:t}}const n={kind:"call",callee:k(t),args:e.items,loc:e.loc};return this.checkExpr(n)}return this.convert(this.rvalue(this.checkExpr(e)),t,e.loc)}rvalue(e){const t=e.ty;return t.k==="atomic"?{kind:"convert",expr:e,to:Te(t.s),loc:e.loc,ty:Te(t.s)}:e}convert(e,t,n){const r=e.ty;if(he(r,t))return e;if(nn(r,t)||Ga(r,t))return{kind:"convert",expr:e,to:t,loc:e.loc,ty:t};this.error(`cannot convert ${k(r)} to ${k(t)}`,n)}cast(e,t){const n=e.ty;return he(n,t)?e:{kind:"convert",expr:e,to:t,loc:e.loc,ty:t}}checkExpr(e){switch(e.kind){case"literal":return e.ty=e.litType==="bool"?It:e.litType==="float"?lt:e.litType==="uint"?nc:Nt,e;case"ident":return this.checkIdent(e);case"binary":return this.checkBinary(e);case"unary":{e.operand=this.checkExpr(e.operand);const t=e.operand.ty;if(e.op==="++"||e.op==="--")return this.markWritten(e.operand),(!(t.k==="scalar"||t.k==="vector"||t.k==="matrix")||xe(t)==="bool")&&this.error(`'${e.op}' needs a numeric lvalue`,e.loc),e.ty=t,e;e.operand=this.rvalue(e.operand);const n=e.operand.ty;if(e.op==="!")n.k==="scalar"&&n.s==="bool"||this.error("'!' needs a bool",e.loc);else if(e.op==="~"){const r=xe(n);r!=="int"&&r!=="uint"&&this.error("'~' needs an integer",e.loc)}else(xe(n)==="bool"||!(n.k==="scalar"||n.k==="vector"||n.k==="matrix"))&&this.error(`'${e.op}' needs a number`,e.loc);return e.ty=n,e}case"postfix":{e.operand=this.checkExpr(e.operand),this.markWritten(e.operand);const t=e.operand.ty;return(xe(t)==="bool"||!(t.k==="scalar"||t.k==="vector"||t.k==="matrix"))&&this.error(`'${e.op}' needs a numeric lvalue`,e.loc),e.ty=t,e}case"assign":return this.checkAssign(e);case"ternary":{e.cond=this.checkCond(e.cond);let t=this.rvalue(this.checkExpr(e.a)),n=this.rvalue(this.checkExpr(e.b));const r=t.ty,s=n.ty;return he(r,s)||(nn(r,s)?t=this.convert(t,s,e.loc):nn(s,r)?n=this.convert(n,r,e.loc):this.error(`ternary arms differ: ${k(r)} and ${k(s)}`,e.loc)),e.a=t,e.b=n,e.ty=t.ty,e}case"call":return this.checkCall(e);case"index":{e.base=this.checkExpr(e.base),e.index=this.rvalue(this.checkExpr(e.index));const t=e.index.ty;t.k==="scalar"&&(t.s==="int"||t.s==="uint")||this.error("index must be int or uint",e.loc);const n=e.base.ty;return n.k==="array"?e.ty=n.elem:n.k==="vector"?e.ty=Te(n.s):n.k==="matrix"?e.ty=O("float",n.r):this.error(`cannot index ${k(n)}`,e.loc),e}case"member":return this.checkMember(e);case"method":{e.base=this.checkExpr(e.base),(e.name!=="length"||e.args.length)&&this.error(`unknown method '${e.name}'`,e.loc);const t=e.base.ty;return t.k!=="array"&&t.k!=="vector"&&t.k!=="matrix"&&this.error("length() needs an array, vector or matrix",e.loc),e.ty=Nt,e}case"comma":{e.exprs=e.exprs.map(n=>this.checkExpr(n));const t=e.exprs[e.exprs.length-1];return e.exprs[e.exprs.length-1]=this.rvalue(t),e.ty=e.exprs[e.exprs.length-1].ty,e}case"initlist":this.error("initializer list outside a declaration",e.loc);break;case"convert":return e}return e}checkIdent(e){const t=this.lookup(e.name);return t||this.error(`undeclared identifier '${e.name}'`,e.loc),e.sym=t,e.ty=t.type,e}checkMember(e){e.base=this.checkExpr(e.base);const t=e.base.ty;if(t.k==="struct"){const r=this.structs.get(t.name).fields.find(s=>s.name===e.name);return r||this.error(`${t.name} has no member '${e.name}'`,e.loc),e.ty=r.type,e}if(t.k==="vector"||t.k==="scalar"){e.base=this.rvalue(e.base);const n=t.k==="vector"?t.n:1,r=Kd.find(a=>[...e.name].every(o=>a.includes(o)));(!r||e.name.length>4)&&this.error(`bad swizzle '.${e.name}'`,e.loc);const s=[...e.name].map(a=>r.indexOf(a));return s.some(a=>a>=n)&&this.error(`swizzle '.${e.name}' out of range for ${k(t)}`,e.loc),e.swizzle=s,e.ty=O(xe(t),s.length),e}this.error(`'.${e.name}' on ${k(t)}`,e.loc)}markWritten(e){let t=e;for(;t.kind!=="ident";)t.kind==="index"?t=t.base:t.kind==="member"?(t.swizzle&&new Set(t.swizzle).size!==t.swizzle.length&&this.error("swizzle with repeated components is not an lvalue",t.loc),t=t.base):t.kind==="convert"&&t.expr.ty.k==="atomic"?t=t.expr:this.error("expression is not assignable",e.loc);const n=t.sym;n.isConst&&this.error(`cannot assign to const '${n.name}'`,e.loc),n.readonly&&this.error(`cannot assign to read-only '${n.name}'`,e.loc),n.written=!0}checkAssign(e){e.target=this.checkExpr(e.target),this.markWritten(e.target);const t=e.target.ty,n=t.k==="atomic"?Te(t.s):t;let r=this.rvalue(this.checkExpr(e.value));if(e.op==="=")r=this.convert(r,n,e.loc);else{const a={kind:"binary",op:e.op.slice(0,-1),left:{kind:"ident",name:"<lhs>",loc:e.loc,ty:n},right:r,loc:e.loc},o=this.checkBinaryTyped(a,!0);he(o.ty,n)||this.error(`'${e.op}' gives ${k(o.ty)}, not ${k(n)}`,e.loc),r=o.right}return e.value=r,e.ty=n,e}checkBinary(e){return e.left=this.rvalue(this.checkExpr(e.left)),e.right=this.rvalue(this.checkExpr(e.right)),this.checkBinaryTyped(e,!1)}checkBinaryTyped(e,t){const n=e.op;let r=e.left,s=e.right;const a=r.ty,o=s.ty,c=u(()=>this.error(`no operator '${n}' for ${k(a)} and ${k(o)}`,e.loc),"fail");if(n==="&&"||n==="||"||n==="^^")return(!he(a,It)||!he(o,It))&&c(),e.ty=It,e;const l=xe(a),d=xe(o);if(l===void 0||d===void 0){if((n==="=="||n==="!=")&&he(a,o))return e.ty=It,e;c()}if(n==="<<"||n===">>")return(l==="float"||l==="bool"||d==="float"||d==="bool")&&c(),a.k==="scalar"&&o.k==="vector"&&c(),e.ty=a,e;let f=l;if(l!==d){const m=u(_=>_==="int"?0:_==="uint"?1:_==="float"?2:-1,"rank"),g=m(l)>m(d)?l:d;(m(l)<0||m(d)<0)&&c(),f=g,l!==g&&(t&&c(),r=this.convert(r,pr(a,g),e.loc)),d!==g&&(s=this.convert(s,pr(o,g),e.loc))}const h=r.ty,p=s.ty;switch(e.left=r,e.right=s,n){case"==":case"!=":return he(h,p)||c(),e.ty=It,e;case"<":case">":case"<=":case">=":return(h.k!=="scalar"||p.k!=="scalar"||f==="bool")&&c(),e.ty=It,e;case"&":case"|":case"^":case"%":f!=="int"&&f!=="uint"&&c();break;case"+":case"-":case"*":case"/":f==="bool"&&c();break;default:c()}if(h.k==="matrix"||p.k==="matrix"){if(n==="*")return h.k==="matrix"&&p.k==="matrix"?(h.c!==p.r&&c(),e.ty={k:"matrix",c:p.c,r:h.r}):h.k==="matrix"&&p.k==="vector"?(h.c!==p.n&&c(),e.ty=O("float",h.r)):h.k==="vector"&&p.k==="matrix"?(h.n!==p.r&&c(),e.ty=O("float",p.c)):e.ty=h.k==="matrix"?h:p,e;if((n==="+"||n==="-"||n==="/")&&he(h,p))return e.ty=h,n==="/"&&this.helpers.add(`matrixCompDiv:${k(h)}`),e;if(n==="/"&&h.k==="matrix"&&p.k==="scalar")return e.ty=h,e;if((n==="+"||n==="-")&&(h.k==="scalar"||p.k==="scalar"))return e.ty=h.k==="matrix"?h:p,e;c()}return h.k==="vector"&&p.k==="vector"&&h.n!==p.n&&c(),e.ty=h.k==="vector"?h:p,e}checkCall(e){if(e.ctorArray)return this.checkArrayCtor(e);const t=$n(e.callee)??this.structType(e.callee);if(t&&t.k!=="sampler"&&t.k!=="atomic")return this.checkCtor(e,t);const n=e.callee;if(Ud.has(n))return this.checkTextureCall(e);if(n in Vd)return this.checkAtomicCall(e);if(n in Wd)return e.builtin=n,e.ty=Ii,e;if(zd.has(n))return this.diag("warning",`unsupported: ${n}() has no WebGPU equivalent (geometry stage); emitted as a no-op`,e.loc),e.builtin=n,e.ty=Ii,e.args=e.args.map(a=>this.checkExpr(a)),e;const r=this.overloads.get(n),s=this.templates.get(n);return!r&&!s&&(Fa(n)||Ea.has(n))?this.checkBuiltinCall(e):(!r&&!s&&this.error(`call to undeclared function '${n}'`,e.loc),this.checkUserCall(e,r??[],s??[]))}checkArgs(e){e.args=e.args.map(t=>this.checkExpr(t))}checkUserCall(e,t,n){this.checkArgs(e);const r=e.args.map(o=>{const c=o.ty;return c.k==="atomic"?Te(c.s):c});let s=[];for(const o of t){const c=this.matchCost(o.params,r);c<0||(!s.length||c<s[0].cost?s=[{f:o,cost:c}]:c===s[0].cost&&s.push({f:o,cost:c}))}let a;if(s.length>1&&this.error(`ambiguous call to '${e.callee}(${r.map(k).join(", ")})'`,e.loc),s.length===1&&(a=s[0].f),!a&&n.length&&(a=this.instantiate(e,n,r)),!a){const o=t.map(c=>`${c.name}(${c.params.map(l=>k(l.type)).join(", ")})`).join("; ");this.error(`no matching overload for '${e.callee}(${r.map(k).join(", ")})'${o?`; candidates: ${o}`:""}`,e.loc)}a.defined||(this.options.allowUndefinedFunctions?this.undefinedFunctions.add(a.name):this.error(`function '${a.name}(${a.params.map(o=>k(o.type)).join(", ")})' is declared but never defined`,e.loc)),a.used=!0;for(let o=e.args.length;o<a.params.length;o++){const c=a.params[o].defaultValue;c||this.error(`missing argument ${o+1} to '${a.name}'`,e.loc),e.args.push(this.checkExpr(structuredClone(c)))}return e.args=e.args.map((o,c)=>{const l=a.params[c];return l.qualifier!=="in"?(this.markWritten(o),he(o.ty,l.type)||this.error(`argument ${c+1} to '${a.name}' must be ${k(l.type)} for ${l.qualifier}`,o.loc),o):this.convert(this.rvalue(o),l.type,o.loc)}),e.fn=a,e.ty=a.returnType,e}matchCost(e,t){if(t.length>e.length)return-1;for(let r=t.length;r<e.length;r++)if(!e[r].defaultValue)return-1;let n=0;for(let r=0;r<t.length;r++){const s=e[r],a=t[r];if(!he(s.type,a)){if(s.qualifier!=="in")return-1;if(nn(a,s.type))n++;else if(Ga(a,s.type))n+=10;else return-1}}return n}instantiate(e,t,n){for(const r of t){const s=new Map;let a=r.params.length>=n.length;for(let d=0;a&&d<r.params.length;d++){const f=r.params[d],h=n[d];if(!h){f.defaultValue||(a=!1);continue}if(r.templateParams.includes(f.type.name)&&!f.type.arraySizes.length&&!f.arraySizes.length){const p=s.get(f.type.name);p&&!he(p,h)?a=!1:s.set(f.type.name,h)}}if(!a||r.templateParams.some(d=>!s.has(d)))continue;const o=this.paramTypes(r,s);if(this.matchCost(o,n)<0)continue;const c=`${r.name}<${r.templateParams.map(d=>k(s.get(d))).join(",")}>@${r.loc.file}:${r.loc.line}`;let l=this.instantiations.get(c);if(!l){const d=structuredClone(r);d.templateParams=[];const f=this.resolveType(r.returnType,[],s);l={name:r.name,wgsl:this.claimModuleName(`${r.name}_${r.templateParams.map(h=>Zr(s.get(h))).join("_")}`),returnType:f,params:o,decl:d,typeArgs:s,defined:!0,used:!0},this.instantiations.set(c,l),this.pendingTemplate(l,d,s)}return l}}pendingTemplate(e,t,n){const r=this,s=this.resolveType.bind(this),a=u(()=>{const o=r.resolveType;r.resolveType=(c,l=[],d)=>s(c,l,d??n);try{r.checkFunction(e,t)}finally{r.resolveType=o}},"check2");this.templateThunks.push(a)}templateThunks=[];drainTemplates(){for(;this.templateThunks.length;)this.templateThunks.shift()()}checkBuiltinCall(e){this.checkArgs(e),e.args=e.args.map(s=>this.rvalue(s));const t=e.args.map(s=>s.ty);let n;if(Ea.has(e.callee))n=Hd(e.callee,t.map(s=>s.k==="vector"&&s.s!=="float"?pr(s,"float"):s));else{const s=Fa(e.callee);let a=1/0,o=!1;for(const c of s){if(c.params.length!==t.length)continue;let l=0,d=!0;for(let f=0;f<t.length;f++){const h=c.params[f],p=t[f];if(!he(h,p))if(nn(p,h))l++;else{d=!1;break}}d&&(l<a?(a=l,n=c,o=!1):l===a&&(o=!0))}o&&n&&(n=s.filter(l=>l.params.length===t.length&&l.params.every((d,f)=>he(d,t[f])||nn(t[f],d))).find(l=>l.params.every(d=>xe(d)==="float"||xe(d)==="bool"))??n)}n||this.error(`no matching overload for built-in '${e.callee}(${t.map(k).join(", ")})'`,e.loc);const r=n;return e.args=e.args.map((s,a)=>this.convert(s,r.params[a],s.loc)),r.wgsl.startsWith("out:")&&this.markWritten(e.args[e.args.length-1]),e.builtin=r.wgsl,e.ty=r.ret,r.wgsl.startsWith("helper:")&&this.helpers.add(ac(r)),/^fn:(dpd|fwidth)/.test(r.wgsl)&&(this.usesDerivatives=!0),e}checkCtor(e,t){this.checkArgs(e),e.args=e.args.map(s=>this.rvalue(s)),e.ctor=t,e.ty=t;const n=e.args,r=n.map(s=>s.ty);if(t.k==="struct"){const s=this.structs.get(t.name);return n.length!==s.fields.length&&this.error(`${t.name}() takes ${s.fields.length} arguments`,e.loc),e.args=n.map((a,o)=>this.convert(a,s.fields[o].type,a.loc)),e}if(t.k==="scalar"){n.length!==1&&this.error(`${k(t)}() takes one argument`,e.loc);const s=r[0];return!Od(s)&&s.k!=="matrix"&&this.error(`cannot construct ${k(t)} from ${k(s)}`,e.loc),e}if(t.k==="vector"){if(n.length===0)return e;if(n.length===1&&r[0].k==="scalar")return e.args=[this.cast(n[0],Te(t.s))],e;let s=0;return e.args=n.map((a,o)=>{const c=r[o];if(c.k==="scalar")return s+=1,this.cast(a,Te(t.s));if(c.k==="vector")return s+=c.n,this.cast(a,O(t.s,c.n));if(c.k==="matrix")return s+=c.c*c.r,a;this.error(`cannot construct ${k(t)} from ${k(c)}`,e.loc)}),s<t.n&&this.error(`too few components to construct ${k(t)}`,e.loc),n.length>1&&s-jt(r[r.length-1])>=t.n&&this.error(`too many arguments to construct ${k(t)}`,e.loc),e}if(t.k==="matrix"){if(n.length===1&&r[0].k==="matrix")return e;if(e.args=n.map((a,o)=>{const c=r[o];if(c.k==="scalar")return this.cast(a,lt);if(c.k==="vector")return this.cast(a,O("float",c.n));this.error(`cannot construct ${k(t)} from ${k(c)}`,e.loc)}),n.length===1)return this.helpers.add(`matDiag:${k(t)}`),e;const s=r.reduce((a,o)=>a+jt(o),0);return s!==t.c*t.r&&this.error(`${k(t)}() needs ${t.c*t.r} components, got ${s}`,e.loc),e}if(t.k==="array")return e;this.error(`cannot construct ${k(t)}`,e.loc)}checkArrayCtor(e){this.checkArgs(e),e.args=e.args.map(a=>this.rvalue(a));const t=this.resolveType({name:e.callee,arraySizes:[],loc:e.loc}),n=e.ctorArray,r=n[0]?this.constInt(n[0]):e.args.length;n.length!==1&&this.error("only one-dimensional array constructors are supported",e.loc),r!==e.args.length&&this.error(`array constructor has ${e.args.length} elements, not ${r}`,e.loc),e.args=e.args.map(a=>this.convert(a,t,a.loc));const s={k:"array",elem:t,size:r};return e.ctor=s,e.ty=s,e}samplerOf(e){const t=e.ty;return t.k!=="sampler"&&this.error(`expected a sampler, found ${k(t)}`,e.loc),t.name}checkTextureCall(e){this.checkArgs(e);const t=e.args[0];t||this.error(`${e.callee}() needs a sampler`,e.loc);const n=this.samplerOf(t),r=Ft[n];for(let h=1;h<e.args.length;h++)e.args[h]=this.rvalue(e.args[h]);const s=r.dim==="1d"||r.dim==="buffer"?1:r.dim==="2d"||r.dim==="1d_array"?2:3,a=s+(r.dim.endsWith("_array")&&r.dim!=="1d_array",0),o=O(r.sampled,4),c=O("float",r.shadow?a+1:a),l=O("int",a),d=r.dim==="cube"?2:r.dim==="2d_array"||r.dim==="cube_array"?3:s,f=u((h,p)=>{const m=e.args[h];m||this.error(`${e.callee}() needs argument ${h+1}`,e.loc),e.args[h]=this.convert(m,p,m.loc)},"want");switch(e.callee){case"texture":case"textureProj":f(1,e.callee==="textureProj"?O("float",a+1):c),e.args[2]&&f(2,lt),e.ty=r.shadow?lt:o;break;case"textureLod":f(1,c),f(2,lt),e.ty=r.shadow?lt:o;break;case"textureGrad":f(1,c),f(2,O("float",s===3&&r.dim!=="2d_array"?3:2)),f(3,O("float",s===3&&r.dim!=="2d_array"?3:2)),e.ty=o;break;case"textureOffset":case"textureLodOffset":f(1,c),e.ty=o;break;case"textureGather":f(1,c),e.args[2]&&f(2,Nt),e.ty=o;break;case"texelFetch":f(1,l),e.args[2]&&f(2,Nt),e.ty=o;break;case"textureSize":e.args[1]&&f(1,Nt),e.ty=O("int",d);break;case"textureQueryLevels":e.ty=Nt;break;case"imageLoad":f(1,l),e.ty=o;break;case"imageStore":f(1,l),f(2,o),e.ty=Ii;break;case"imageSize":e.ty=O("int",d);break}return e.builtin=e.callee,(e.callee==="texture"||e.callee==="textureProj"||e.callee==="textureOffset")&&(this.usesDerivatives=!0),e}checkAtomicCall(e){this.checkArgs(e);const t=e.args[0];t||this.error(`${e.callee}() needs a memory argument`,e.loc);const n=t.ty;n.k!=="atomic"&&this.error(`${e.callee}() needs an atomic location (declare the buffer element atomic in the stage interface)`,e.loc),this.markWritten(t);const r=Te(n.s);for(let s=1;s<e.args.length;s++)e.args[s]=this.convert(this.rvalue(e.args[s]),r,e.loc);return e.builtin=e.callee,e.ty=r,e}constInt(e){const t=this.tryConstIntRaw(e);return t===void 0&&this.error("array size must be a constant integer expression",e.loc),t}tryConstInt(e){return this.tryConstIntRaw(e)}tryConstIntRaw(e){switch(e.kind){case"literal":return e.litType==="int"||e.litType==="uint"?Number(BigInt.asIntN(64,BigInt(e.text.replace(/[uU]$/,"").replace(/^0(?=[0-7])/,"0o")))):void 0;case"ident":return this.lookup(e.name)?.constValue;case"convert":return xe(e.to)==="float"?void 0:this.tryConstIntRaw(e.expr);case"unary":{const t=this.tryConstIntRaw(e.operand);return t===void 0?void 0:e.op==="-"?-t:e.op==="+"?t:e.op==="~"?~t:void 0}case"binary":{const t=this.tryConstIntRaw(e.left),n=this.tryConstIntRaw(e.right);if(t===void 0||n===void 0)return;switch(e.op){case"+":return t+n;case"-":return t-n;case"*":return t*n;case"/":return n?Math.trunc(t/n):void 0;case"%":return n?t%n:void 0;case"<<":return t<<n;case">>":return t>>n;case"&":return t&n;case"|":return t|n;case"^":return t^n}return}case"call":return(e.callee==="int"||e.callee==="uint")&&e.args.length===1?this.tryConstIntRaw(e.args[0]):void 0;case"method":{const t=e.base.ty;return e.name==="length"&&t?.k==="array"&&t.size!==null?t.size:void 0}}}}const ef={mat2:2,mat3:3,mat4:4};function La(i){if(i==="float")return{w:"f32",n:1};const e=/^vec(\d)$/.exec(i);if(e)return{w:`vec${e[1]}<f32>`,n:Number(e[1])};throw new Error(`helper type ${i}`)}u(La,"vecOrScalar");function Di(i,e){return`glsl_${i}_${e}`}u(Di,"helperName");function tf(i){const[e,t]=i.split(":"),n=Di(e,t);switch(e){case"mod":{const{w:r}=La(t);return`fn ${n}(x: ${r}, y: ${r}) -> ${r} { return x - y * floor(x / y); }`}case"isnan":case"isinf":{const{w:r,n:s}=La(t),a=s===1?"u32":`vec${s}<u32>`,o=s===1?"bool":`vec${s}<bool>`,c=s===1?"0x7f800000u":`${a}(0x7f800000u)`,l=e==="isnan"?`> ${c}`:`== ${c}`;return`fn ${n}(x: ${r}) -> ${o} { return (bitcast<${a}>(x) & ${s===1?"0x7fffffffu":`${a}(0x7fffffffu)`}) ${l}; }`}case"inverse":return nf(n,ef[t]);case"matrixCompMult":case"matrixCompDiv":{const{c:r,r:s}=Aa(t),a=`mat${r}x${s}<f32>`,o=e==="matrixCompMult"?"*":"/",c=Array.from({length:r},(l,d)=>`a[${d}] ${o} b[${d}]`).join(", ");return`fn ${n}(a: ${a}, b: ${a}) -> ${a} { return ${a}(${c}); }`}case"matDiag":{const{c:r,r:s}=Aa(t),a=`mat${r}x${s}<f32>`,o=[];for(let c=0;c<r;c++)for(let l=0;l<s;l++)o.push(c===l?"s":"0.0f");return`fn ${n}(s: f32) -> ${a} { return ${a}(${o.join(", ")}); }`}case"outerProduct":{const[r,s]=t.split("x").map(Number),a=`mat${s}x${r}<f32>`,o=Array.from({length:s},(c,l)=>`c * r[${l}]`).join(", ");return`fn ${n}(c: vec${r}<f32>, r: vec${s}<f32>) -> ${a} { return ${a}(${o}); }`}}throw new Error(`unknown helper ${i}`)}u(tf,"helperSource");function Aa(i){const e=/^mat(\d)(?:x(\d))?$/.exec(i);if(!e)throw new Error(`not a matrix type: ${i}`);return{c:Number(e[1]),r:Number(e[2]??e[1])}}u(Aa,"matDims");function nf(i,e){return e===2?`fn ${i}(m: mat2x2<f32>) -> mat2x2<f32> {
  let d = 1.0f / determinant(m);
  return mat2x2<f32>(m[1][1] * d, -m[0][1] * d, -m[1][0] * d, m[0][0] * d);
}`:e===3?`fn ${i}(m: mat3x3<f32>) -> mat3x3<f32> {
  let c0 = cross(m[1], m[2]);
  let c1 = cross(m[2], m[0]);
  let c2 = cross(m[0], m[1]);
  let d = 1.0f / dot(m[0], c0);
  return transpose(mat3x3<f32>(c0 * d, c1 * d, c2 * d));
}`:`fn ${i}(a: mat4x4<f32>) -> mat4x4<f32> {
  let b00 = a[0][0] * a[1][1] - a[0][1] * a[1][0];
  let b01 = a[0][0] * a[1][2] - a[0][2] * a[1][0];
  let b02 = a[0][0] * a[1][3] - a[0][3] * a[1][0];
  let b03 = a[0][1] * a[1][2] - a[0][2] * a[1][1];
  let b04 = a[0][1] * a[1][3] - a[0][3] * a[1][1];
  let b05 = a[0][2] * a[1][3] - a[0][3] * a[1][2];
  let b06 = a[2][0] * a[3][1] - a[2][1] * a[3][0];
  let b07 = a[2][0] * a[3][2] - a[2][2] * a[3][0];
  let b08 = a[2][0] * a[3][3] - a[2][3] * a[3][0];
  let b09 = a[2][1] * a[3][2] - a[2][2] * a[3][1];
  let b10 = a[2][1] * a[3][3] - a[2][3] * a[3][1];
  let b11 = a[2][2] * a[3][3] - a[2][3] * a[3][2];
  let invdet = 1.0f / (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06);
  return mat4x4<f32>(
    a[1][1] * b11 - a[1][2] * b10 + a[1][3] * b09,
    a[0][2] * b10 - a[0][1] * b11 - a[0][3] * b09,
    a[3][1] * b05 - a[3][2] * b04 + a[3][3] * b03,
    a[2][2] * b04 - a[2][1] * b05 - a[2][3] * b03,
    a[1][2] * b08 - a[1][0] * b11 - a[1][3] * b07,
    a[0][0] * b11 - a[0][2] * b08 + a[0][3] * b07,
    a[3][2] * b02 - a[3][0] * b05 - a[3][3] * b01,
    a[2][0] * b05 - a[2][2] * b02 + a[2][3] * b01,
    a[1][0] * b10 - a[1][1] * b08 + a[1][3] * b06,
    a[0][1] * b08 - a[0][0] * b10 - a[0][3] * b06,
    a[3][0] * b04 - a[3][1] * b02 + a[3][3] * b00,
    a[2][1] * b02 - a[2][0] * b04 - a[2][3] * b00,
    a[1][1] * b07 - a[1][0] * b09 - a[1][2] * b06,
    a[0][0] * b09 - a[0][1] * b07 + a[0][2] * b06,
    a[3][1] * b01 - a[3][0] * b03 - a[3][2] * b00,
    a[2][0] * b03 - a[2][1] * b01 + a[2][2] * b00) * invdet;
}`}u(nf,"inverseSource");class oc extends Error{static{u(this,"EmitError")}loc;constructor(e,t){super(e),this.loc=t}}const Se="xyzw",rf=new Set(["fn:min","fn:max","fn:clamp","fn:step","fn:smoothstep","helper:mod"]);function sf(i,e){return new af(i,e).run()}u(sf,"emit");class af{static{u(this,"Emitter")}checked;options;diagnostics=[];helpers;fn={lines:[],indent:0,tmp:0};pre=[];autoBindings=[];nextBinding;stage;hostShareable=new Set;constructor(e,t){this.checked=e,this.options=t;const n=u(r=>{if(r.k==="array")n(r.elem);else if(r.k==="struct"&&!this.hostShareable.has(r.name)){this.hostShareable.add(r.name);for(const s of r.fields)n(s.type)}},"share");for(const r of e.globals)r.external&&(r.external.space==="storage"||r.external.space==="uniform")&&n(r.sym.type);this.helpers=new Set(e.helpers),this.nextBinding=t.autoBindingStart??0,this.stage=t.stage}error(e,t){throw new oc(e,t)}run(){const e=[];for(const o of this.checked.structs.values())o.emit&&e.push(this.structSource(o));const t=[];for(const o of this.checked.globals){const c=this.globalSource(o,t);c&&e.push(c)}let n=null;const r=[];for(const o of this.checked.functions)r.push(this.functionSource(o));for(const o of this.checked.stubs)r.push(this.stubSource(o));t.length&&(n="hgi_InitGlobals",r.push(`fn ${n}() {
${t.map(o=>`  ${o}`).join(`
`)}
}`));const s=[...this.helpers].sort().map(tf),a=[...e,...s,...r].join(`

`)+`
`;return{directives:["diagnostic(off, derivative_uniformity);"],body:a,initGlobalsFunction:n,diagnostics:this.diagnostics,autoBindings:this.autoBindings}}typeName(e){return e.k==="void"?"":Jr(e,t=>this.checked.structs.get(t)?.wgsl??t)}isHostBoolMember(e,t){if(e.k!=="struct"||!this.hostShareable.has(e.name))return!1;const n=e.fields.find(r=>r.name===t)?.type;return!!n&&xe(n)==="bool"}structSource(e){const t=this.hostShareable.has(e.name),n=e.fields.map(r=>{let s=this.typeName(r.type);return t&&xe(r.type)==="bool"&&(r.type.k==="scalar"?s="u32":r.type.k==="vector"?s=`vec${r.type.n}<u32>`:this.error(`bool array member '${r.name}' of struct ${e.name} in a buffer is not supported`)),`  ${pt(r.name)}: ${s},`});return n.length||n.push("  _hgi_empty: u32,"),`struct ${e.wgsl} {
${n.join(`
`)}
}`}globalSource(e,t){const n=e.sym,r=this.typeName(n.type);if(e.external){const o=e.external;if(o.declare===!1||o.accessExpr!==void 0&&o.declare!==!0)return null;if(o.space==="private")return`var<private> ${n.wgsl}: ${r};`;if(o.space==="workgroup")return`var<workgroup> ${n.wgsl}: ${r};`;const c=o.binding??this.autoBinding(o.name,o.space==="handle"),l=`@group(${c.group}) @binding(${c.binding})`;if(o.space==="uniform")return`${l} var<uniform> ${n.wgsl}: ${r};`;if(o.space==="storage")return`${l} var<storage, ${o.access??"read"}> ${n.wgsl}: ${r};`;const d=n.type.k==="array"?n.type.elem:n.type;d.k!=="sampler"&&this.error(`interface symbol ${n.name} in handle space must have a sampler type`),n.type.k==="array"&&this.error(`arrays of samplers (${n.name}) are not supported by WebGPU`);const f=Ft[d.name],h=[`${l} var ${n.wgsl}: ${this.typeName(d)};`];if(!f?.image){const p=c.samplerBinding??c.binding+1;h.push(`@group(${c.group}) @binding(${p}) var ${n.wgsl}_sampler: ${f?.shadow?"sampler_comparison":"sampler"};`)}return h.join(`
`)}const s=e.declarator;if(n.type.k==="sampler"&&this.error(`global sampler '${n.name}' must come from the stage interface`),!s||!s.init)return`var<private> ${n.wgsl}: ${r};`;if(this.isConstExpr(s.init)){const o=this.exprNoHoist(s.init);return n.storage==="const"?`const ${n.wgsl}: ${r} = ${o};`:`var<private> ${n.wgsl}: ${r} = ${o};`}this.fn={lines:[],indent:0,tmp:0},this.pre=[];const a=this.expr(s.init);for(const o of this.pre)t.push(o);return t.push(`${n.wgsl} = ${a};`),this.pre=[],`var<private> ${n.wgsl}: ${r};`}autoBinding(e,t){const n={group:0,binding:this.nextBinding};return this.nextBinding+=t?2:1,this.autoBindings.push({name:e,...n}),n}isConstExpr(e){switch(e.kind){case"literal":return!0;case"ident":return e.sym?.storage==="const";case"convert":return this.isConstExpr(e.expr)&&e.expr.ty.k!=="atomic";case"unary":return e.op!=="++"&&e.op!=="--"&&this.isConstExpr(e.operand);case"binary":return this.isConstExpr(e.left)&&this.isConstExpr(e.right);case"call":return!!e.ctor&&e.args.every(t=>this.isConstExpr(t))&&!(e.ctor.k==="matrix"&&e.args.length===1);case"member":return this.isConstExpr(e.base);case"index":return this.isConstExpr(e.base)&&this.isConstExpr(e.index);default:return!1}}exprNoHoist(e){this.pre=[];const t=this.expr(e);return this.pre.length&&this.error("internal: constant expression needed statements"),t}paramList(e,t){return e.params.map((n,r)=>{const s=t?.[r],a=s?s.storage==="param"&&this.needsLocalCopy(s)?`${s.wgsl}_in`:s.wgsl:`p${r}`;if(n.qualifier!=="in")return`${a}: ptr<function, ${this.typeName(n.type)}>`;if(n.type.k==="sampler"){const o=Ft[n.type.name];return`${a}: ${this.typeName(n.type)}${o?.image?"":`, ${a}_sampler: ${o?.shadow?"sampler_comparison":"sampler"}`}`}return`${a}: ${this.typeName(n.type)}`}).join(", ")}needsLocalCopy(e){return!!e.written||e.type.k==="array"}functionSource(e){const t=e.sym;this.fn={lines:[],indent:1,tmp:0},this.pre=[];for(const s of e.params)s.storage==="param"&&this.needsLocalCopy(s)&&this.line(`var ${s.wgsl} = ${s.wgsl}_in;`);const n=e.decl.body;for(const s of n.stmts)this.stmt(s);t.returnType.k!=="void"&&!Gn(n)&&this.line(`return ${this.typeName(t.returnType)}();`);const r=t.returnType.k==="void"?"":` -> ${this.typeName(t.returnType)}`;return`fn ${t.wgsl}(${this.paramList(t,e.params)})${r} {
${this.fn.lines.join(`
`)}
}`}stubSource(e){this.diagnostics.push({severity:"warning",message:`stub: '${e.name}(${e.params.map(r=>k(r.type)).join(", ")})' is declared but not defined here; emitted as a stub returning a zero value`,...e.decl?{loc:e.decl.loc}:{}});const t=e.returnType.k==="void"?"":` -> ${this.typeName(e.returnType)}`,n=e.returnType.k==="void"?"":`
  return ${this.typeName(e.returnType)}();
`;return`fn ${e.wgsl}(${this.paramList(e,null)})${t} {${n}}`}line(e){this.fn.lines.push("  ".repeat(this.fn.indent)+e)}flushPre(){for(const e of this.pre)this.line(e);this.pre=[]}newTmp(){return`_hgi_t${this.fn.tmp++}`}captured(e){const t=this.pre;this.pre=[];const n=e(),r=this.pre;return this.pre=t,{pre:r,value:n}}stmt(e){switch(e.kind){case"block":this.line("{"),this.fn.indent++;for(const t of e.stmts)this.stmt(t);this.fn.indent--,this.line("}");return;case"empty":case"localstruct":return;case"decl":for(const t of e.declarators){const n=t.sym,r=this.typeName(n.type);if(t.init){const s=this.expr(t.init);this.flushPre(),n.isConst&&n.type.k!=="array"?this.line(`let ${n.wgsl}: ${r} = ${s};`):this.line(`var ${n.wgsl}: ${r} = ${s};`)}else this.line(`var ${n.wgsl}: ${r};`)}return;case"expr":this.exprStmt(e.expr);return;case"if":{const t=this.expr(e.cond);this.flushPre(),this.line(`if (${t}) {`),this.nested(e.then),e.else&&(this.line("} else {"),this.nested(e.else)),this.line("}");return}case"while":{const t=this.captured(()=>this.expr(e.cond));if(!t.pre.length){this.line(`while (${t.value}) {`),this.nested(e.body),this.line("}");return}this.line("loop {"),this.fn.indent++;for(const n of t.pre)this.line(n);this.line(`if (!(${t.value})) { break; }`),this.stmtInline(e.body),this.fn.indent--,this.line("}");return}case"dowhile":{const t=this.captured(()=>this.expr(e.cond));this.line("loop {"),this.nested(e.body),this.fn.indent++,this.line("continuing {"),this.fn.indent++;for(const n of t.pre)this.line(n);this.line(`break if !(${t.value});`),this.fn.indent--,this.line("}"),this.fn.indent--,this.line("}");return}case"for":this.forStmt(e);return;case"switch":this.switchStmt(e);return;case"break":this.line("break;");return;case"continue":this.line("continue;");return;case"discard":this.line("discard;");return;case"return":if(e.value){const t=this.expr(e.value);this.flushPre(),this.line(`return ${t};`)}else this.line("return;");return}}nested(e){this.fn.indent++,this.stmtInline(e),this.fn.indent--}stmtInline(e){if(e.kind==="block")for(const t of e.stmts)this.stmt(t);else this.stmt(e)}forStmt(e){let t=null,n=[];if(e.init){const o=this.fn.lines,c=this.fn.indent;this.fn.lines=[],this.fn.indent=0,this.stmt(e.init),n=this.fn.lines,this.fn.lines=o,this.fn.indent=c,n.length===1&&!/^[{}]/.test(n[0])&&(t=n[0].replace(/;$/,""))}const r=e.cond?this.captured(()=>this.expr(e.cond)):null,s=e.update?this.capturedStmt(()=>this.exprStmt(e.update)):[],a=s.length<=1&&!(s[0]??"").includes(`
`)&&!/^(var|let|if|loop|\{)/.test(s[0]??"");if((e.init===null||t!==null)&&(!r||!r.pre.length)&&a){const o=(s[0]??"").replace(/;$/,"");this.line(`for (${t??""}; ${r?r.value:""}; ${o}) {`),this.nested(e.body),this.line("}");return}this.line("{"),this.fn.indent++;for(const o of n)this.line(o);if(this.line("loop {"),this.fn.indent++,r){for(const o of r.pre)this.line(o);this.line(`if (!(${r.value})) { break; }`)}if(this.stmtInline(e.body),s.length){this.line("continuing {"),this.fn.indent++;for(const o of s)this.line(o);this.fn.indent--,this.line("}")}this.fn.indent--,this.line("}"),this.fn.indent--,this.line("}")}capturedStmt(e){const t=this.fn.lines,n=this.fn.indent,r=this.pre;this.fn.lines=[],this.fn.indent=0,this.pre=[],e();const s=this.fn.lines;return this.fn.lines=t,this.fn.indent=n,this.pre=r,s}switchStmt(e){const t=this.expr(e.expr);this.flushPre(),this.line(`switch (${t}) {`),this.fn.indent++;const n=e.cases;let r=!1;for(let s=0;s<n.length;s++){const a=n[s],o=[...a.body];let c=s;for(;!$i(o)&&c+1<n.length;)c++,o.push(...n[c].body);o.length&&o[o.length-1].kind==="break"&&o.pop();const l=a.labels.map(d=>d==="default"?"default":this.exprNoHoistKeep(d));a.labels.includes("default")&&(r=!0),this.line(`case ${l.join(", ")}: {`),this.fn.indent++;for(const d of o)this.stmt(d);this.fn.indent--,this.line("}")}r||this.line("default: {}"),this.fn.indent--,this.line("}")}exprNoHoistKeep(e){const t=this.pre;this.pre=[];const n=this.expr(e);return this.pre.length&&this.error("case label must be constant",e.loc),this.pre=t,n}exprStmt(e){switch(e.kind){case"assign":this.assign(e.target,e.op,e.value);return;case"unary":case"postfix":if(e.op==="++"||e.op==="--"){this.increment((e.kind==="unary",e.operand),e.op);return}break;case"comma":for(const t of e.exprs)this.exprStmt(t);return;case"call":{if(e.fn){const n=this.userCall(e,!0);this.flushPre(),n&&this.line(`${n};`);return}const t=this.expr(e);this.flushPre(),e.ty?.k==="void"?t&&this.line(`${t};`):this.line(`_ = ${t};`);return}case"ternary":{const t=this.expr(e.cond);this.flushPre(),this.line(`if (${t}) {`),this.fn.indent++,this.exprStmt(e.a),this.fn.indent--,this.line("} else {"),this.fn.indent++,this.exprStmt(e.b),this.fn.indent--,this.line("}");return}case"convert":this.exprStmt(e.expr);return;case"binary":if((e.op==="&&"||e.op==="||")&&this.hasSideEffects(e.right)){const t=this.expr(e.left);this.flushPre(),this.line(`if (${e.op==="&&"?t:`!(${t})`}) {`),this.fn.indent++,this.exprStmt(e.right),this.fn.indent--,this.line("}");return}break}this.expr(e),this.flushPre()}hasSideEffects(e){switch(e.kind){case"assign":return!0;case"unary":return e.op==="++"||e.op==="--"||this.hasSideEffects(e.operand);case"postfix":return!0;case"call":return e.fn||e.builtin&&(e.builtin in mr||e.builtin==="imageStore")?!0:e.args.some(t=>this.hasSideEffects(t));case"binary":return this.hasSideEffects(e.left)||this.hasSideEffects(e.right);case"ternary":return this.hasSideEffects(e.cond)||this.hasSideEffects(e.a)||this.hasSideEffects(e.b);case"index":return this.hasSideEffects(e.base)||this.hasSideEffects(e.index);case"member":return this.hasSideEffects(e.base);case"method":return this.hasSideEffects(e.base);case"comma":return e.exprs.some(t=>this.hasSideEffects(t));case"convert":return this.hasSideEffects(e.expr);default:return!1}}lvalue(e){switch(e.kind){case"ident":return this.identText(e);case"index":return`${this.lvalue(e.base)}[${this.expr(e.index)}]`;case"member":return e.swizzle?(e.swizzle.length!==1&&this.error("internal: multi-component swizzle lvalue",e.loc),`${this.lvalue(e.base)}.${Se[e.swizzle[0]]}`):(this.isHostBoolMember(e.base.ty,e.name)&&this.error(`writing bool member '${e.name}' of a struct in a buffer is not supported`,e.loc),`${this.lvalue(e.base)}.${pt(e.name)}`);case"convert":if(e.expr.ty.k==="atomic")return this.lvalue(e.expr);break}this.error("expression is not an lvalue",e.loc)}swizzleTarget(e){if(e.kind!=="member"||!e.swizzle)return null;let t=e.swizzle,n=e.base;for(;n.kind==="member"&&n.swizzle;){const r=n.swizzle;t=t.map(s=>r[s]),n=n.base}return t.length===1?null:{base:n,comps:t}}assign(e,t,n){const r=e.ty,s=t==="="?null:t.slice(0,-1);if(e.kind==="convert"||r.k==="atomic"||e.ty&&Oa(e)){const l=this.lvalue(e);let d=this.expr(n);s&&(d=this.binaryText(s,`atomicLoad(&${l})`,d,cf(e),n.ty)),this.flushPre(),this.line(`atomicStore(&${l}, ${d});`);return}const a=this.swizzleTarget(e);if(a){const l=this.lvalue(a.base),d=a.base.ty,f=jt(d);let h=this.expr(n);if(s){const m=`${l}.${a.comps.map(g=>Se[g]).join("")}`;h=this.binaryText(s,m,h,e.ty,n.ty)}if(this.flushPre(),a.comps.length===f&&a.comps.every((m,g)=>m===g)){this.line(`${l} = ${h};`);return}const p=this.newTmp();this.line(`let ${p} = ${h};`),a.comps.forEach((m,g)=>this.line(`${l}.${Se[m]} = ${p}.${Se[g]};`));return}const o=this.lvalue(e);let c=this.expr(n);if(s){const l=e.ty,d=n.ty;if(l.k==="matrix"&&(s==="/"||s!=="*"&&d.k==="scalar")){c=this.binaryText(s,o,c,l,d),this.flushPre(),this.line(`${o} = ${c};`);return}c=this.adjustRight(s,l,d,c),this.flushPre(),this.line(`${o} ${t} ${c};`);return}this.flushPre(),this.line(`${o} = ${c};`)}increment(e,t){const n=e.ty,r=xe(n);if(n.k==="scalar"&&(r==="int"||r==="uint")&&!this.swizzleTarget(e)&&!Oa(e)){const a=this.lvalue(e);this.flushPre(),this.line(`${a}${t};`);return}const s={kind:"literal",text:"1",litType:r==="float"?"float":r==="uint"?"uint":"int",loc:e.loc,ty:{k:"scalar",s:r}};this.assign(e,t==="++"?"+=":"-=",s)}identText(e){const t=e.sym;return t.access!==void 0?t.access:t.storage==="refparam"?`(*${t.wgsl})`:t.wgsl}expr(e){switch(e.kind){case"literal":return fi(e.text,e.litType,e.litType==="bool"?"bool":e.ty.s);case"ident":return this.identText(e);case"convert":return this.convertText(e.expr,e.to);case"binary":return this.binary(e);case"unary":{if(e.op==="++"||e.op==="--")return this.increment(e.operand,e.op),this.expr(e.operand);const t=this.expr(e.operand);return e.op==="+"?t:`(${e.op}${t})`}case"postfix":{const t=this.newTmp(),n=this.expr(e.operand);return this.pre.push(`let ${t} = ${n};`),this.withPreAsLines(()=>this.increment(e.operand,e.op)),t}case"assign":return this.withPreAsLines(()=>this.assign(e.target,e.op,e.value)),this.expr(e.target);case"ternary":return this.ternary(e);case"call":return this.call(e);case"index":return`${this.expr(e.base)}[${this.expr(e.index)}]`;case"member":{const t=this.expr(e.base);if(e.swizzle){const n=e.base.ty;return n.k==="scalar"?e.swizzle.length===1?t:`vec${e.swizzle.length}<${Da(n.s)}>(${t})`:`${t}.${e.swizzle.map(r=>Se[r]).join("")}`}if(this.isHostBoolMember(e.base.ty,e.name)){const n=e.ty;return n.k==="vector"?`(${t}.${pt(e.name)} != vec${n.n}<u32>(0u))`:`(${t}.${pt(e.name)} != 0u)`}return`${t}.${pt(e.name)}`}case"method":{const t=e.base.ty;if(t.k==="array")return t.size!==null?`${t.size}i`:`i32(arrayLength(&${this.lvalue(e.base)}))`;if(t.k==="vector")return`${t.n}i`;if(t.k==="matrix")return`${t.c}i`;this.error("length() on a non-array",e.loc);break}case"comma":{for(let t=0;t<e.exprs.length-1;t++)this.withPreAsLines(()=>this.exprStmt(e.exprs[t]));return this.expr(e.exprs[e.exprs.length-1])}case"initlist":this.error("internal: unlowered initializer list",e.loc)}this.error(`internal: cannot emit ${e.kind}`,e.loc)}withPreAsLines(e){const t=this.capturedStmt(()=>{e(),this.flushPre()});for(const n of t)this.pre.push(n)}convertText(e,t){const n=e.ty;if(n.k==="atomic")return`atomicLoad(&${this.lvalue(e)})`;const r=xe(t);if(e.kind==="literal"&&t.k==="scalar"&&r&&e.litType!=="bool"&&r!=="bool")return fi(e.text,e.litType,r);if(e.kind==="unary"&&e.op==="-"&&e.operand.kind==="literal"&&t.k==="scalar"&&(r==="float"||r==="int")){const o=e.operand;if(o.litType!=="bool")return`(-${fi(o.text,o.litType,r)})`}const s=this.expr(e),a=this.typeName(t);if(t.k==="scalar"){if(n.k==="scalar")return`${a}(${s})`;if(n.k==="vector")return`${a}(${s}.x)`;if(n.k==="matrix")return`${a}(${s}[0][0])`}if(t.k==="vector"){if(n.k==="scalar")return n.s===t.s?`${a}(${s})`:`${a}(${Da(t.s)}(${s}))`;if(n.k==="vector"){if(n.n===t.n)return`${a}(${s})`;const o=Se.slice(0,t.n);return n.s===t.s?`${s}.${o}`:`${a}(${s}.${o})`}}this.error(`cannot convert ${k(n)} to ${k(t)}`,e.loc)}binary(e){const t=e.op;if(t==="&&"||t==="||"){const s=this.expr(e.left),a=this.captured(()=>this.expr(e.right));if(!a.pre.length)return`(${s} ${t} ${a.value})`;const o=this.newTmp();this.pre.push(`var ${o} = ${s};`),this.pre.push(`if (${t==="&&"?o:`!${o}`}) {`);for(const c of a.pre)this.pre.push(`  ${c}`);return this.pre.push(`  ${o} = ${a.value};`),this.pre.push("}"),o}if(t==="^^")return`(${this.expr(e.left)} != ${this.expr(e.right)})`;const n=this.expr(e.left),r=this.expr(e.right);return this.binaryText(t,n,r,e.left.ty,e.right.ty)}adjustRight(e,t,n,r){if(e==="<<"||e===">>"){const s=t.k==="vector"?t.n:1;let o=xe(n)==="uint"?r:n.k==="vector"?`vec${n.n}<u32>(${r})`:/^\d+i$/.test(r)?r.replace(/i$/,"u"):`u32(${r})`;return s>1&&n.k==="scalar"&&(o=`vec${s}<u32>(${o})`),o}return(e==="&"||e==="|"||e==="^")&&t.k==="vector"&&n.k==="scalar"?`${this.typeName(t)}(${r})`:r}binaryText(e,t,n,r,s){if(e==="<<"||e===">>")return`(${t} ${e} ${this.adjustRight(e,r,s,n)})`;if((e==="&"||e==="|"||e==="^")&&r.k==="scalar"&&s.k==="vector")return`(${this.typeName(s)}(${t}) ${e} ${n})`;if((e==="&"||e==="|"||e==="^")&&r.k==="vector"&&s.k==="scalar")return`(${t} ${e} ${this.typeName(r)}(${n}))`;if(e==="=="||e==="!="){if(r.k==="vector")return e==="=="?`all(${t} == ${n})`:`any(${t} != ${n})`;if(r.k==="matrix"){const a=Array.from({length:r.c},(o,c)=>`all(${t}[${c}] == ${n}[${c}])`).join(" && ");return e==="=="?`(${a})`:`!(${a})`}r.k!=="scalar"&&this.error(`'${e}' on ${k(r)} is not supported in WGSL`)}if(r.k==="matrix"||s.k==="matrix"){if(e==="/"&&r.k==="matrix"&&s.k==="scalar")return`(${t} * (1.0f / ${n}))`;if(e==="/"&&r.k==="matrix"&&s.k==="matrix"){const a=`matrixCompDiv:${k(r)}`;return this.helpers.add(a),`${Di("matrixCompDiv",k(r))}(${t}, ${n})`}if((e==="+"||e==="-")&&(r.k==="scalar"||s.k==="scalar")){const a=r.k==="matrix"?r:s,o=r.k==="scalar"?t:n,c=Array.from({length:a.c},()=>`vec${a.r}<f32>(${o})`).join(", "),l=`mat${a.c}x${a.r}<f32>(${c})`;return r.k==="scalar"?`(${l} ${e} ${n})`:`(${t} ${e} ${l})`}}return`(${t} ${e} ${n})`}isPureCheap(e){switch(e.kind){case"literal":case"ident":return!0;case"convert":return e.expr.ty.k!=="atomic"&&this.isPureCheap(e.expr);case"unary":return e.op!=="++"&&e.op!=="--"&&this.isPureCheap(e.operand);case"binary":return this.isPureCheap(e.left)&&this.isPureCheap(e.right);case"member":return this.isPureCheap(e.base);case"index":return this.isPureCheap(e.base)&&this.isPureCheap(e.index);case"ternary":return this.isPureCheap(e.cond)&&this.isPureCheap(e.a)&&this.isPureCheap(e.b);case"call":return e.fn||e.builtin&&Ma.has(e.builtin)?!1:e.args.every(t=>this.isPureCheap(t));default:return!1}}ternary(e){const t=this.expr(e.cond);if(this.isPureCheap(e.a)&&this.isPureCheap(e.b)&&e.ty.k!=="array"&&e.ty.k!=="struct"){const a=this.captured(()=>this.expr(e.a)),o=this.captured(()=>this.expr(e.b));if(!a.pre.length&&!o.pre.length)return`select(${o.value}, ${a.value}, ${t})`}const n=this.newTmp(),r=this.captured(()=>this.expr(e.a)),s=this.captured(()=>this.expr(e.b));this.pre.push(`var ${n}: ${this.typeName(e.ty)};`),this.pre.push(`if (${t}) {`);for(const a of r.pre)this.pre.push(`  ${a}`);this.pre.push(`  ${n} = ${r.value};`),this.pre.push("} else {");for(const a of s.pre)this.pre.push(`  ${a}`);return this.pre.push(`  ${n} = ${s.value};`),this.pre.push("}"),n}call(e){if(e.ctor)return this.ctor(e);if(e.fn)return this.userCall(e,!1);const t=e.builtin;if(Ma.has(t))return this.textureCall(e);if(t in mr)return this.atomicCall(e);if(t in Ra)return Ra[t];if(t==="EmitVertex"||t==="EndPrimitive"||t==="EmitStreamVertex"||t==="EndStreamPrimitive")return"";if(t==="out:frexp")return this.frexpCall(e);const n=e.args.map(s=>this.expr(s)),r=e.ty;if(t.startsWith("fn:")||t.startsWith("helper:")){if(rf.has(t)&&r.k==="vector"&&e.args.forEach((s,a)=>{s.ty.k==="scalar"&&(n[a]=`${this.typeName(r)}(${n[a]})`)}),t.startsWith("helper:")){const s=of(e);this.helpers.add(s);const[a,o]=s.split(":");return`${Di(a,o)}(${n.join(", ")})`}return`${t.slice(3)}(${n.join(", ")})`}if(t.startsWith("op:"))return t.slice(3).replace(/\$(RC|R|\d)/g,(s,a)=>a==="R"||a==="RC"?this.typeName(r):n[Number(a)]);this.error(`internal: unknown built-in form ${t}`,e.loc)}frexpCall(e){const t=this.expr(e.args[0]),n=this.newTmp();this.pre.push(`let ${n} = frexp(${t});`);const r=e.args[1].ty,s={kind:"ident",name:n,loc:e.loc,ty:r,sym:{name:n,wgsl:`${n}.exp`,type:r,storage:"local",isConst:!0}};return this.withPreAsLines(()=>this.assign(e.args[1],"=",s)),`${n}.fract`}ctor(e){const t=e.ctor,n=this.typeName(t);if(t.k==="struct"&&this.hostShareable.has(t.name)&&t.fields.some(r=>xe(r.type)==="bool")&&this.error(`constructing struct ${t.name}, which a buffer holds with bool members, is not supported`,e.loc),t.k==="struct"||t.k==="array")return`${n}(${e.args.map(r=>this.expr(r)).join(", ")})`;if(t.k==="scalar"){const r=e.args[0],s=r.ty;if(he(s,t))return this.expr(r);if(r.kind==="literal"&&r.litType!=="bool"&&t.s!=="bool")return fi(r.text,r.litType,t.s);const a=this.expr(r);return s.k==="vector"?`${n}(${a}.x)`:s.k==="matrix"?`${n}(${a}[0][0])`:`${n}(${a})`}if(t.k==="vector"){if(!e.args.length)return`${n}()`;if(e.args.length===1){const a=e.args[0],o=a.ty,c=this.expr(a);if(o.k==="scalar")return`${n}(${c})`;if(o.k==="vector")return o.n===t.n?c:`${c}.${Se.slice(0,t.n)}`;if(o.k==="matrix"){const l=this.hoist(c,o),d=[];for(let f=0;f<o.c&&d.length<t.n;f++)for(let h=0;h<o.r&&d.length<t.n;h++)d.push(`${l}[${f}][${h}]`);return`${n}(${d.join(", ")})`}}let r=0;const s=[];for(const a of e.args){const o=a.ty,c=t.n-r;if(c<=0)break;const l=this.expr(a),d=jt(o);o.k==="matrix"&&this.error("matrix arguments to vector constructors are not supported",a.loc),d>c?(s.push(c===1?`${l}.x`:`${l}.${Se.slice(0,c)}`),r+=c):(s.push(l),r+=d)}return`${n}(${s.join(", ")})`}if(t.k==="matrix"){if(e.args.length===1){const a=e.args[0],o=a.ty;if(o.k==="scalar"){const c=`matDiag:${k(t)}`;return this.helpers.add(c),`${Di("matDiag",k(t))}(${this.expr(a)})`}if(o.k==="matrix"){if(o.c===t.c&&o.r===t.r)return this.expr(a);const c=this.hoist(this.expr(a),o),l=[];for(let d=0;d<t.c;d++){const f=[];for(let h=0;h<t.r;h++)f.push(d<o.c&&h<o.r?`${c}[${d}][${h}]`:d===h?"1.0f":"0.0f");l.push(`vec${t.r}<f32>(${f.join(", ")})`)}return`${n}(${l.join(", ")})`}}const r=e.args.map(a=>a.ty);if(r.every(a=>a.k==="scalar")||r.length===t.c&&r.every(a=>a.k==="vector"&&a.n===t.r))return`${n}(${e.args.map(a=>this.expr(a)).join(", ")})`;const s=[];return e.args.forEach(a=>{const o=a.ty,c=this.expr(a);if(o.k==="scalar")s.push(c);else{const l=this.hoist(c,o);for(let d=0;d<jt(o);d++)s.push(`${l}.${Se[d]}`)}}),`${n}(${s.join(", ")})`}this.error(`cannot construct ${k(t)}`,e.loc)}hoist(e,t){if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(e))return e;const n=this.newTmp();return this.pre.push(`let ${n}: ${this.typeName(t)} = ${e};`),n}userCall(e,t){const n=e.fn,r=[],s=[],a=new Map;for(const d of e.args){const f=Na(d);f&&a.set(f,(a.get(f)??0)+1)}e.args.forEach((d,f)=>{const h=n.params[f];if(h.qualifier==="in"){if(h.type.k==="sampler"){const _=this.samplerArg(d);r.push(_.sampler?`${_.texture}, ${_.sampler}`:_.texture);return}r.push(this.expr(d));return}const p=Na(d);if(d.kind==="ident"&&p&&a.get(p)===1){if(p.storage==="refparam"){r.push(p.wgsl);return}if(p.storage==="local"||p.storage==="param"&&this.needsLocalCopy(p)){r.push(`&${p.wgsl}`);return}}const m=this.newTmp(),g=this.typeName(h.type);h.qualifier==="inout"?this.pre.push(`var ${m}: ${g} = ${this.expr(d)};`):this.pre.push(`var ${m}: ${g};`),r.push(`&${m}`),s.push({target:d,tmp:m,type:h.type})});const o=`${n.wgsl}(${r.join(", ")})`,c=u(()=>{for(const d of s){const f={kind:"ident",name:d.tmp,loc:e.loc,ty:d.type,sym:{name:d.tmp,wgsl:d.tmp,type:d.type,storage:"local",isConst:!1}};this.withPreAsLines(()=>this.assign(d.target,"=",f))}},"copyOut");if(t)return s.length?(this.pre.push(`${o};`),c(),null):o;if(!s.length)return o;const l=this.newTmp();return this.pre.push(`let ${l} = ${o};`),c(),l}samplerArg(e){e.kind!=="ident"&&this.error("a sampler argument must be a sampler variable (arrays of samplers are not supported by WebGPU)",e.loc);const t=e.sym,n=t.type;n.k!=="sampler"&&this.error("expected a sampler",e.loc);const r=Ft[n.name];return{texture:t.wgsl,sampler:r?.image?null:t.samplerWgsl??`${t.wgsl}_sampler`,name:n.name}}textureCall(e){const t=this.samplerArg(e.args[0]),n=Ft[t.name],r=e.args.slice(1).map(h=>this.expr(h)),s=this.stage==="fragment"||this.stage==="library",a=n.dim.endsWith("_array"),o=n.dim==="1d"||n.dim==="buffer"?1:n.dim==="2d"?2:n.dim==="1d_array"?1:n.dim==="2d_array"?2:3,c=u((h,p)=>{if(!a)return h;const m=this.hoist(h,{k:"vector",s:p?"int":"float",n:o+1}),g=n.dim==="1d_array"?p?`vec2<i32>(${m}.x, 0i)`:`vec2<f32>(${m}.x, 0.5f)`:o===1?`${m}.x`:`${m}.${Se.slice(0,o)}`,_=`${m}.${Se[o]}`;return`${g}, ${p?_:`i32(floor(${_} + 0.5f))`}`},"split"),l=t.texture,d=t.sampler,f=u(h=>h,"sampledRet");switch(e.callee){case"texture":case"textureOffset":{if(n.shadow){const p=this.hoist(r[0],{k:"vector",s:"float",n:o+1+(a?1:0)}),m=a?`${p}.${Se.slice(0,o)}, i32(floor(${p}.${Se[o]} + 0.5f))`:`${p}.${Se.slice(0,o)}`,g=`${p}.${Se[o+(a?1:0)]}`;return s?`textureSampleCompare(${l}, ${d}, ${m}, ${g})`:`textureSampleCompareLevel(${l}, ${d}, ${m}, ${g})`}const h=c(r[0],!1);return r[1]!==void 0&&e.callee==="texture"?s?`textureSampleBias(${l}, ${d}, ${h}, ${r[1]})`:`textureSampleLevel(${l}, ${d}, ${h}, ${r[1]})`:f(s?`textureSample(${l}, ${d}, ${h})`:`textureSampleLevel(${l}, ${d}, ${h}, 0.0f)`)}case"textureProj":{const h=this.hoist(r[0],{k:"vector",s:"float",n:o+1}),p=`(${h}.${Se.slice(0,o)} / ${h}.${Se[o]})`;return s?`textureSample(${l}, ${d}, ${p})`:`textureSampleLevel(${l}, ${d}, ${p}, 0.0f)`}case"textureLod":case"textureLodOffset":return n.shadow&&this.error("textureLod on a shadow sampler is not supported",e.loc),`textureSampleLevel(${l}, ${d}, ${c(r[0],!1)}, ${r[1]})`;case"textureGrad":return`textureSampleGrad(${l}, ${d}, ${c(r[0],!1)}, ${r[1]}, ${r[2]})`;case"textureGather":return`textureGather(${r[1]??"0i"}, ${l}, ${d}, ${c(r[0],!1)})`;case"texelFetch":{const h=c(r[0],!0);return n.dim==="buffer"?`textureLoad(${l}, ${h}, 0i)`:`textureLoad(${l}, ${h}, ${r[1]??"0i"})`}case"textureSize":{const h=e.ty,p=r[0]??"0i";if(a){const m=`textureDimensions(${l}, ${p})`,g=o===1?`i32(${m}.x)`:`vec${o}<i32>(${m})`;return`${this.typeName(h)}(${g}, i32(textureNumLayers(${l})))`}return h.k==="scalar"?`i32(textureDimensions(${l}, ${p}))`:`${this.typeName(h)}(textureDimensions(${l}, ${p}))`}case"textureQueryLevels":return`i32(textureNumLevels(${l}))`;case"imageLoad":return`textureLoad(${l}, ${c(r[0],!0)})`;case"imageStore":return`textureStore(${l}, ${c(r[0],!0)}, ${r[1]})`;case"imageSize":{const h=e.ty;return h.k==="scalar"?`i32(textureDimensions(${l}))`:`${this.typeName(h)}(textureDimensions(${l}))`}}this.error(`unsupported texture function ${e.callee}`,e.loc)}atomicCall(e){const t=e.args[0],n=this.lvalue(t),r=e.args.slice(1).map(a=>this.expr(a)),s=mr[e.builtin];return s==="atomicCompareExchangeWeak"?`${s}(&${n}, ${r[0]}, ${r[1]}).old_value`:`${s}(&${n}, ${r.join(", ")})`}}const mr={atomicAdd:"atomicAdd",atomicMin:"atomicMin",atomicMax:"atomicMax",atomicAnd:"atomicAnd",atomicOr:"atomicOr",atomicXor:"atomicXor",atomicExchange:"atomicExchange",atomicCompSwap:"atomicCompareExchangeWeak"},Ra={barrier:"workgroupBarrier()",memoryBarrier:"storageBarrier()",memoryBarrierBuffer:"storageBarrier()",memoryBarrierShared:"workgroupBarrier()",memoryBarrierImage:"textureBarrier()",groupMemoryBarrier:"workgroupBarrier()"},Ma=new Set(["texture","textureLod","textureGrad","texelFetch","textureSize","textureQueryLevels","textureOffset","textureLodOffset","textureProj","textureGather","imageLoad","imageStore","imageSize"]);function of(i){const e=i.builtin.slice(7),t=i.args.map(n=>n.ty);return e==="mod"?`mod:${k(i.ty)}`:ac({name:i.callee,params:t,ret:i.ty,wgsl:i.builtin})}u(of,"helperKeyForCall");function Na(i){let e=i;for(;;){if(e.kind==="ident")return e.sym??null;if(e.kind==="index")e=e.base;else if(e.kind==="member")e=e.base;else if(e.kind==="convert")e=e.expr;else return null}}u(Na,"rootSymbol");function Oa(i){return i.ty?.k==="atomic"||i.kind==="convert"&&i.expr.ty.k==="atomic"}u(Oa,"isAtomicLvalue");function cf(i){const e=i.kind==="convert"?i.expr.ty:i.ty;return e.k==="atomic"?{k:"scalar",s:e.s}:e}u(cf,"scalarTypeOfAtomic");function $i(i){const e=i[i.length-1];return e?e.kind==="break"||e.kind==="continue"||e.kind==="return"||e.kind==="discard"?!0:e.kind==="block"?$i(e.stmts):e.kind==="if"?!!e.else&&$i([e.then])&&$i([e.else]):!1:!1}u($i,"endsInJump");function Gn(i){switch(i.kind){case"return":return!0;case"block":return i.stmts.some(e=>Gn(e));case"if":return!!i.else&&Gn(i.then)&&Gn(i.else);case"switch":return i.cases.some(e=>e.labels.includes("default"))&&i.cases.every(e=>e.body.some(t=>Gn(t)));case"for":return i.cond===null&&!Nn(i.body);case"while":return i.cond.kind==="literal"&&i.cond.text==="true"&&!Nn(i.body);default:return!1}}u(Gn,"alwaysReturns");function Nn(i){switch(i.kind){case"break":return!0;case"block":return i.stmts.some(Nn);case"if":return Nn(i.then)||!!i.else&&Nn(i.else);default:return!1}}u(Nn,"containsBreak");function fi(i,e,t){if(e==="bool")return t==="bool"?i:t==="float"?i==="true"?"1.0f":"0.0f":`${i==="true"?1:0}${t==="uint"?"u":"i"}`;if(e==="float"){const r=lf(i);return t==="float"?r:t==="bool"?Number(r.replace(/f$/,""))!==0?"true":"false":`${t==="uint"?"u32":"i32"}(${r})`}let n=BigInt(i.replace(/[uU]$/,"").replace(/^0(?=[0-7]+$)/,"0o"));return t==="float"?`${n.toString()}.0f`:t==="bool"?n!==0n?"true":"false":t==="uint"?(n<0n&&(n=BigInt.asUintN(32,n)),`${BigInt.asUintN(32,n).toString()}u`):n>0x7fffffffn?`bitcast<i32>(${BigInt.asUintN(32,n).toString()}u)`:`${n.toString()}i`}u(fi,"literalText");function lf(i){let e=i.replace(/(lf|LF|f|F)$/,"");return e.startsWith(".")&&(e=`0${e}`),e=e.replace(/\.(?=[eE]|$)/,".0"),/[.eE]/.test(e)||(e=`${e}.0`),`${e}f`}u(lf,"floatText");const uf=["<<=",">>=","...","++","--","<<",">>","<=",">=","==","!=","&&","||","^^","+=","-=","*=","/=","%=","&=","|=","^=","##","::","(",")","[","]","{","}",".",",",";",":","?","+","-","*","/","%","<",">","=","!","~","&","|","^","#","\\","@",'"',"'"],es=new Map;for(const i of uf){const e=es.get(i[0])??[];e.push(i),es.set(i[0],e)}function df(i){return i>="a"&&i<="z"||i>="A"&&i<="Z"||i==="_"}u(df,"isIdStart");function ff(i){return i>=97&&i<=122||i>=65&&i<=90||i===95||i>=48&&i<=57}u(ff,"isIdCode");function ln(i){return i>="0"&&i<="9"}u(ln,"isDigit");const hf=/^\/\/\s*line\s+(\d+)\s+"([^"]*)"/;class ts extends Error{static{u(this,"LexError")}loc;constructor(e,t){super(e),this.loc=t}}function mn(i,e="<input>"){const t=[];let n=e,r=1,s=1,a=1,o=0,c=!0,l=!1;const d=i.length;let f=0;const h=u(m=>({file:n,line:r+(a-s),col:m-o+1}),"loc"),p=u(()=>{a++,o=f,c=!0,l=!1},"newline");for(;f<d;){const m=i[f];if(m==="\\"&&(i[f+1]===`
`||i[f+1]==="\r"&&i[f+2]===`
`)){f+=i[f+1]==="\r"?3:2,a++,o=f,l=!0;continue}if(m===`
`){f++,p();continue}if(m===" "||m==="	"||m==="\r"||m==="\f"||m==="\v"){f++,l=!0;continue}if(m==="/"&&i[f+1]==="/"){let b=f;for(;b<d&&i[b]!==`
`;)b++;const y=i.slice(f,b),S=c?hf.exec(y):null;f=b,S?(f<d&&(f++,p()),n=S[2],r=Number(S[1])+1,s=a):l=!0;continue}if(m==="/"&&i[f+1]==="*"){const b=h(f);let y=f+2;for(;y<d&&!(i[y]==="*"&&i[y+1]==="/");)i[y]===`
`&&(a++,o=y+1),y++;if(y>=d)throw new ts("unterminated block comment",b);f=y+2,l=!0;continue}const g=f,_=h(f);if(df(m)){for(;f<d&&ff(i.charCodeAt(f));)f++;t.push({kind:"id",text:i.slice(g,f),loc:_,bol:c,space:l})}else if(ln(m)||m==="."&&ln(i[f+1]??""))f=pf(i,f),t.push({kind:"num",text:i.slice(g,f),loc:_,bol:c,space:l});else{let b;for(const y of es.get(m)??[])if(y.length===1||i.startsWith(y,f)){b=y;break}if(b===void 0)throw new ts(`unexpected character '${m}'`,_);f+=b.length,t.push({kind:"punct",text:b,loc:_,bol:c,space:l})}c=!1,l=!1}return t.push({kind:"eof",text:"",loc:h(f),bol:!0,space:!1}),t}u(mn,"tokenize");function pf(i,e){const t=i.length;if(i[e]==="0"&&(i[e+1]==="x"||i[e+1]==="X")){for(e+=2;e<t&&/[0-9a-fA-F]/.test(i[e]);)e++;return(i[e]==="u"||i[e]==="U")&&e++,e}for(;e<t&&ln(i[e]);)e++;let n=!1;if(i[e]===".")for(n=!0,e++;e<t&&ln(i[e]);)e++;if(i[e]==="e"||i[e]==="E"){const r=e;if(e++,(i[e]==="+"||i[e]==="-")&&e++,ln(i[e]??""))for(n=!0;e<t&&ln(i[e]);)e++;else e=r}return i.startsWith("lf",e)||i.startsWith("LF",e)?e+2:i[e]==="f"||i[e]==="F"||!n&&(i[e]==="u"||i[e]==="U")?e+1:e}u(pf,"scanNumber");function cc(i){return`${i.file}:${i.line}:${i.col}`}u(cc,"formatLoc");class Xe extends Error{static{u(this,"ParseError")}loc;constructor(e,t){super(`${cc(t)}: ${e}`),this.loc=t}}const Ha=new Set(["const","in","out","inout","uniform","buffer","shared","flat","smooth","noperspective","centroid","sample","patch","highp","mediump","lowp","precise","invariant","readonly","writeonly","coherent","volatile","restrict","attribute","varying","static","thread","device","constant","threadgroup"]),mf=new Set(["=","+=","-=","*=","/=","%=","<<=",">>=","&=","^=","|="]),Ua=[["||"],["^^"],["&&"],["|"],["^"],["&"],["==","!="],["<",">","<=",">="],["<<",">>"],["+","-"],["*","/","%"]];function gf(i,e=[]){return new _f(i,e).translationUnit()}u(gf,"parse");class _f{static{u(this,"Parser")}i=0;toks;structNames;templateParams=[];constructor(e,t){this.toks=e,this.structNames=new Set(t)}get t(){return this.toks[this.i]}at(e){return this.toks[this.i+e]??this.toks[this.toks.length-1]}is(e){const t=this.t;return t.text===e&&t.kind!=="eof"}eat(e){return this.is(e)?(this.i++,!0):!1}expect(e){if(!this.is(e))throw new Xe(`expected '${e}', found '${this.t.text||"end of input"}'`,this.t.loc);return this.toks[this.i++]}ident(){const e=this.t;if(e.kind!=="id")throw new Xe(`expected identifier, found '${e.text||"end of input"}'`,e.loc);return this.i++,e}isTypeName(e){return Md(e)||this.structNames.has(e)||this.templateParams.includes(e)}translationUnit(){const e=[];for(;this.t.kind!=="eof";)if(!this.eat(";"))for(const t of this.externalDecl())e.push(t);return{decls:e}}skipLayout(){this.is("layout")&&this.at(1).text==="("&&(this.i++,this.skipBalanced("(",")"))}skipBalanced(e,t){this.expect(e);let n=1;for(;n>0;){if(this.t.kind==="eof")throw new Xe(`unbalanced '${e}'`,this.t.loc);this.t.text===e?n++:this.t.text===t&&n--,this.i++}}qualifiers(){const e=[];for(;;){if(this.skipLayout(),this.t.kind==="id"&&Ha.has(this.t.text)){e.push(this.t.text),this.i++;continue}return e}}externalDecl(){const e=this.t.loc;if(this.is("precision")){for(;!this.eat(";");)this.i++;return[]}let t=[];if(this.is("template"))for(this.i++,this.expect("<");;){if(!(this.eat("typename")||this.eat("class")))throw new Xe("expected typename",this.t.loc);if(t.push(this.ident().text),this.eat(">"))break;this.expect(",")}const n=this.qualifiers();if(n.length&&this.t.kind==="id"&&!this.isTypeName(this.t.text)&&this.at(1).text==="{"){const s=this.ident().text,a=this.structBody();let o=null,c=[];return this.t.kind==="id"&&(o=this.ident().text,c=this.arraySuffix()),this.expect(";"),[{kind:"block",qualifiers:n,blockName:s,fields:a,instance:o,arraySizes:c,loc:e}]}const r=this.templateParams;this.templateParams=t;try{const s=this.typeSpec(),a=[];if(s.struct&&a.push(s.struct),this.eat(";")){if(!s.struct&&!n.length)throw new Xe("declaration declares nothing",e);return a}const o=this.ident();if(this.is("("))return a.push(this.functionRest(s,o,t,e)),a;t=[];const c=this.declaratorsRest(o);return this.expect(";"),a.push({kind:"global",qualifiers:n,type:s.struct?{...s,name:s.struct.name}:s,declarators:c,loc:e}),a}finally{this.templateParams=r}}functionRest(e,t,n,r){this.expect("(");const s=[];if(this.is("void")&&this.at(1).text===")"&&this.i++,this.is(")"))this.expect(")");else for(;s.push(this.param()),!this.eat(")");)this.expect(",");let a=null;return this.is("{")?a=this.block():this.expect(";"),{kind:"function",returnType:e,name:t.text,params:s,body:a,templateParams:n,loc:r}}param(){const e=this.t.loc,t=this.qualifiers();let n="in";t.includes("inout")||t.includes("in")&&t.includes("out")?n="inout":t.includes("out")&&(n="out");const r=this.typeSpec();let s="",a=[];this.t.kind==="id"&&(s=this.ident().text,a=this.arraySuffix());let o=null;return this.eat("=")&&(o=this.assignment()),{type:r,name:s,arraySizes:a,qualifier:n,isConst:t.includes("const"),defaultValue:o,loc:e}}structBody(){this.expect("{");const e=[];for(;!this.eat("}");){this.qualifiers();const t=this.typeSpec();for(;;){const n=this.t.loc,r=this.ident().text,s=this.arraySuffix();if(e.push({type:t,name:r,arraySizes:s,loc:n}),this.eat(";"))break;this.expect(",")}}return e}typeSpec(){const e=this.t.loc;if(this.is("struct")){this.i++;let n="";this.t.kind==="id"&&(n=this.ident().text),n||(n=`_anon_struct_${e.line}_${e.col}`),this.structNames.add(n);const r=this.structBody(),s={kind:"struct",name:n,fields:r,loc:e};return{name:n,arraySizes:this.arraySuffix(),struct:s,loc:e}}const t=this.t;if(t.kind!=="id"||!this.isTypeName(t.text))throw new Xe(`expected a type, found '${t.text||"end of input"}'`,t.loc);return this.i++,{name:t.text,arraySizes:this.arraySuffix(),loc:e}}arraySuffix(){const e=[];for(;this.is("[");){if(this.i++,this.eat("]")){e.push(null);continue}e.push(this.expression()),this.expect("]")}return e}declaratorsRest(e){const t=[];let n=e;for(;;){const r=this.arraySuffix();let s=null;if(this.eat("=")&&(s=this.initializer()),t.push({name:n.text,arraySizes:r,init:s,loc:n.loc}),!this.eat(","))return t;n=this.ident()}}initializer(){if(this.is("{")){const e=this.t.loc;this.i++;const t=[];for(;!this.eat("}");)t.push(this.initializer()),this.is("}")||this.expect(",");return{kind:"initlist",items:t,loc:e}}return this.assignment()}block(){const e=this.expect("{").loc,t=[];for(;!this.eat("}");){if(this.t.kind==="eof")throw new Xe("expected '}'",this.t.loc);t.push(this.statement())}return{kind:"block",stmts:t,loc:e}}isDeclStart(){let e=0;for(;;){const r=this.at(e);if(r.text==="layout"&&this.at(e+1).text==="(")return!0;if(r.kind==="id"&&Ha.has(r.text)){e++;continue}break}if(e>0)return!0;const t=this.at(0);if(t.text==="struct")return!0;if(t.kind!=="id"||!this.isTypeName(t.text))return!1;const n=this.at(1);if(n.kind==="id")return!0;if(n.text==="["){let r=0,s=1;for(;;s++){const a=this.at(s);if(a.kind==="eof")return!1;if(a.text==="[")r++;else if(a.text==="]"&&(r--,r===0&&this.at(s+1).text!=="["))break}return this.at(s+1).kind==="id"}return!1}statement(){const e=this.t,t=e.loc;if(e.text==="{")return this.block();if(e.text===";")return this.i++,{kind:"empty",loc:t};if(e.kind==="id")switch(e.text){case"if":{this.i++,this.expect("(");const r=this.expression();this.expect(")");const s=this.statement(),a=this.eat("else")?this.statement():null;return{kind:"if",cond:r,then:s,else:a,loc:t}}case"for":{this.i++,this.expect("(");let r=null;this.eat(";")||(r=this.isDeclStart()?this.declStatement():{kind:"expr",expr:this.expression(),loc:this.t.loc},r.kind==="expr"&&this.expect(";"));const s=this.is(";")?null:this.expression();this.expect(";");const a=this.is(")")?null:this.expression();this.expect(")");const o=this.statement();return{kind:"for",init:r,cond:s,update:a,body:o,loc:t}}case"while":{this.i++,this.expect("(");const r=this.expression();return this.expect(")"),{kind:"while",cond:r,body:this.statement(),loc:t}}case"do":{this.i++;const r=this.statement();this.expect("while"),this.expect("(");const s=this.expression();return this.expect(")"),this.expect(";"),{kind:"dowhile",body:r,cond:s,loc:t}}case"switch":return this.switchStatement();case"break":case"continue":case"discard":return this.i++,this.expect(";"),{kind:e.text,loc:t};case"return":{this.i++;const r=this.is(";")?null:this.expression();return this.expect(";"),{kind:"return",value:r,loc:t}}}if(this.isDeclStart())return this.declStatement();const n=this.expression();return this.expect(";"),{kind:"expr",expr:n,loc:t}}declStatement(){const e=this.t.loc,t=this.qualifiers(),n=this.typeSpec();if(this.eat(";")){if(n.struct)return{kind:"localstruct",decl:n.struct,loc:e};throw new Xe("declaration declares nothing",e)}const r=this.declaratorsRest(this.ident());return this.expect(";"),n.struct?{kind:"block",stmts:[{kind:"localstruct",decl:n.struct,loc:e},{kind:"decl",qualifiers:t,type:{...n,name:n.struct.name},declarators:r,loc:e}],loc:e}:{kind:"decl",qualifiers:t,type:n,declarators:r,loc:e}}switchStatement(){const e=this.expect("switch").loc;this.expect("(");const t=this.expression();this.expect(")"),this.expect("{");const n=[];let r=null;for(;!this.eat("}");){if(this.is("case")||this.is("default")){const s=this.t.loc;let a;this.eat("default")?a="default":(this.i++,a=this.conditional()),this.expect(":"),r&&r.body.length===0?r.labels.push(a):(r={labels:[a],body:[],loc:s},n.push(r));continue}if(!r)throw new Xe("statement before the first case label",this.t.loc);r.body.push(this.statement())}return{kind:"switch",expr:t,cases:n,loc:e}}expression(){const e=this.assignment();if(!this.is(","))return e;const t=[e];for(;this.eat(",");)t.push(this.assignment());return{kind:"comma",exprs:t,loc:e.loc}}assignment(){const e=this.conditional(),t=this.t.text;if(this.t.kind==="punct"&&mf.has(t)){this.i++;const n=this.assignment();return{kind:"assign",op:t,target:e,value:n,loc:e.loc}}return e}conditional(){const e=this.binary(0);if(this.eat("?")){const t=this.expression();this.expect(":");const n=this.assignment();return{kind:"ternary",cond:e,a:t,b:n,loc:e.loc}}return e}binary(e){if(e>=Ua.length)return this.unary();let t=this.binary(e+1);const n=Ua[e];for(;this.t.kind==="punct"&&n.includes(this.t.text);){const r=this.t.text;this.i++;const s=this.binary(e+1);t={kind:"binary",op:r,left:t,right:s,loc:t.loc}}return t}unary(){const e=this.t;if(e.kind==="punct"&&["+","-","!","~","++","--"].includes(e.text)){this.i++;const t=this.unary();return{kind:"unary",op:e.text,operand:t,loc:e.loc}}return this.postfix()}postfix(){let e=this.primary();for(;;){const t=this.t;if(t.text==="["){this.i++;const n=this.expression();this.expect("]"),e={kind:"index",base:e,index:n,loc:e.loc}}else if(t.text==="."){this.i++;const n=this.ident().text;if(this.is("(")){const r=this.callArgs();e={kind:"method",base:e,name:n,args:r,loc:e.loc}}else e={kind:"member",base:e,name:n,loc:e.loc}}else if(t.text==="++"||t.text==="--")this.i++,e={kind:"postfix",op:t.text,operand:e,loc:e.loc};else return e}}callArgs(){this.expect("(");const e=[];if(this.is("void")&&this.at(1).text===")"&&this.i++,this.eat(")"))return e;for(;;){if(e.push(this.assignment()),this.eat(")"))return e;this.expect(",")}}primary(){const e=this.t,t=e.loc;if(e.text==="("){this.i++;const n=this.expression();return this.expect(")"),n}if(e.kind==="num")return this.i++,{kind:"literal",text:e.text,litType:bf(e.text),loc:t};if(e.kind==="id"){if(e.text==="true"||e.text==="false")return this.i++,{kind:"literal",text:e.text,litType:"bool",loc:t};if(this.i++,this.isTypeName(e.text)&&this.is("[")){const n=this.arraySuffix(),r=this.callArgs();return{kind:"call",callee:e.text,ctorArray:n,args:r,loc:t}}if(this.is("(")){const n=this.callArgs();return{kind:"call",callee:e.text,args:n,loc:t}}return{kind:"ident",name:e.text,loc:t}}throw new Xe(`unexpected '${e.text||"end of input"}'`,t)}}function bf(i){return/^0[xX]/.test(i)?/[uU]$/.test(i)?"uint":"int":/[.eE]/.test(i)||/[fF]$/.test(i)?"float":/[uU]$/.test(i)?"uint":"int"}u(bf,"literalType");const Sf=`// HgiWebGPU GLSL prelude (pxr/imaging/hgiVulkan/shaderGenerator.cpp:19-31, 200-205, 238-250)
#define REF(space,type) inout type
#define FORWARD_DECL(func_decl) func_decl
#define ATOMIC_LOAD(a) (a)
#define ATOMIC_STORE(a, v) (a) = (v)
#define ATOMIC_ADD(a, v) atomicAdd(a, v)
#define ATOMIC_EXCHANGE(a, v) atomicExchange(a, v)
#define ATOMIC_COMP_SWAP(a, expected, desired) atomicCompSwap(a, expected, desired)
#define atomic_int int
#define atomic_uint uint
#define HGI_COMPILER_ATTR_UNROLL
#define HGI_COMPILER_ATTR_DONT_UNROLL
#define HGI_COMPILER_ATTR_FLATTEN
#define HGI_COMPILER_ATTR_DONT_FLATTEN
const int gl_MaxTessGenLevel = 64;
struct hgi_ivec3 { int    x, y, z; };
struct hgi_vec3  { float  x, y, z; };
struct hgi_dvec3 { double x, y, z; };
struct hgi_mat3  { float  m00, m01, m02,
                          m10, m11, m12,
                          m20, m21, m22; };
struct hgi_dmat3 { double m00, m01, m02,
                          m10, m11, m12,
                          m20, m21, m22; };
`;class Va extends Error{static{u(this,"PreprocessError")}loc;constructor(e,t){super(e),this.loc=t}}function yf(i,e="1"){const t=mn(e,"<define>");return t.pop(),{name:i,params:null,variadic:!1,body:t}}u(yf,"defineFromString");function xf(i,e={},t="<input>"){const n=typeof i=="string"?mn(i,t):i;return new vf(e).run(n)}u(xf,"preprocess");class vf{static{u(this,"Preprocessor")}macros=new Map;diagnostics=[];out=[];pending=[];constructor(e){const t=e.defines;if(t){const n=t instanceof Map?[...t.entries()]:Object.entries(t);for(const[r,s]of n)this.macros.set(r,yf(r,s))}for(const n of e.macros??[])this.macros.set(n.name,n)}run(e){const t=[],n=u(()=>t.length===0?!0:t[t.length-1].active,"active");let r=0;const s=e[e.length-1];for(;r<e.length;){const a=e[r];if(a.kind==="eof")break;let o=r+1;for(;o<e.length&&!e[o].bol&&e[o].kind!=="eof";)o++;const c=e.slice(r,o);if(r=o,a.kind==="punct"&&a.text==="#"){this.flush(),this.directive(c,t,n());continue}if(n())for(const l of c)this.pending.push(l)}if(this.flush(),t.length){const a=t[t.length-1];this.diag("error","unterminated #if",a.loc)}return this.out.push(s),{tokens:this.out,defines:this.macros,diagnostics:this.diagnostics}}diag(e,t,n){this.diagnostics.push(n?{severity:e,message:t,loc:n}:{severity:e,message:t})}flush(){if(!this.pending.length)return;const e=this.expand(this.pending,!1);for(const t of e)this.out.push(t);this.pending=[]}directive(e,t,n){const r=e[0],s=e[1];if(!s)return;const a=s.text,o=e.slice(2),c=t[t.length-1];switch(a){case"if":case"ifdef":case"ifndef":{let l=!1;if(n)if(a==="if")l=this.evalCondition(o,s.loc);else{const d=o[0];(!d||d.kind!=="id")&&this.diag("error",`#${a} without a macro name`,s.loc);const f=d?this.macros.has(d.text):!1;l=a==="ifdef"?f:!f}t.push({active:n&&l,taken:n&&l,parentActive:n,sawElse:!1,loc:r.loc});return}case"elif":{if(!c)return this.diag("error","#elif without #if",r.loc);if(c.sawElse&&this.diag("error","#elif after #else",r.loc),!c.parentActive||c.taken)c.active=!1;else{const l=this.evalCondition(o,s.loc);c.active=l,c.taken=l}return}case"else":{if(!c)return this.diag("error","#else without #if",r.loc);c.sawElse&&this.diag("error","duplicate #else",r.loc),c.sawElse=!0,c.active=c.parentActive&&!c.taken,c.taken=!0;return}case"endif":{if(!c)return this.diag("error","#endif without #if",r.loc);t.pop();return}}if(n)switch(a){case"define":this.define(o,s.loc);return;case"undef":{const l=o[0];l&&this.macros.delete(l.text);return}case"error":this.diag("error",`#error ${o.map(l=>l.text).join(" ")}`,r.loc);return;case"warning":this.diag("warning",`#warning ${o.map(l=>l.text).join(" ")}`,r.loc);return;case"pragma":case"version":case"extension":case"line":return;case"include":this.diag("error","#include is not supported",r.loc);return;default:this.diag("error",`unknown directive #${a}`,r.loc)}}define(e,t){const n=e[0];if(!n||n.kind!=="id"){this.diag("error","#define without a macro name",t);return}let r=null,s=!1,a=1;const o=e[1];if(o&&o.text==="("&&!o.space)for(r=[],a=2;;){const l=e[a];if(!l){this.diag("error","unterminated macro parameter list",n.loc);return}if(a++,l.text===")")break;if(l.text!==","){if(l.text==="..."){s=!0;continue}if(l.kind!=="id"){this.diag("error",`bad macro parameter '${l.text}'`,l.loc);return}r.push(l.text)}}const c=e.slice(a);this.macros.set(n.text,{name:n.text,params:r,variadic:s,body:c,loc:n.loc})}expand(e,t){const n=[],r=e.slice().reverse();for(;r.length;){const s=r.pop();if(s.kind!=="id"){n.push(s);continue}if(t&&s.text==="defined"){n.push(s);const m=r.pop();if(!m)continue;if(n.push(m),m.text==="("){const g=r.pop(),_=r.pop();g&&n.push(g),_&&n.push(_)}continue}const a=this.macros.get(s.text);if(!a||s.hide&&s.hide.has(s.text)){n.push(s);continue}const o=new Set(s.hide??[]);if(o.add(a.name),a.params===null){const m=this.substitute(a,[],s,o);for(let g=m.length-1;g>=0;g--)r.push(m[g]);continue}const c=r[r.length-1];if(!c||c.text!=="("){n.push(s);continue}r.pop();const l=[[]];let d=0,f=!1;for(;r.length;){const m=r.pop();if(m.kind==="eof")break;if(m.text==="(")d++;else if(m.text===")"){if(d===0){f=!0;break}d--}else if(m.text===","&&d===0&&!(a.variadic&&l.length>a.params.length)){l.push([]);continue}l[l.length-1].push(m)}if(!f){this.diag("error",`unterminated invocation of macro ${a.name}`,s.loc);break}l.length===1&&l[0].length===0&&a.params.length===0&&!a.variadic&&(l.length=0);const h=a.params.length;(a.variadic?l.length<h:l.length!==h)&&(h===1&&l.length===0||this.diag("error",`macro ${a.name} expects ${h} argument(s), got ${l.length}`,s.loc));const p=this.substitute(a,l,s,o);for(let m=p.length-1;m>=0;m--)r.push(p[m])}return n}substitute(e,t,n,r){const s=e.params??[],a=u(d=>{if(d==="__VA_ARGS__"&&e.variadic){const h=t.slice(s.length),p=[];return h.forEach((m,g)=>{g&&p.push({...n,kind:"punct",text:",",space:!1}),p.push(...m)}),p}const f=s.indexOf(d);return f<0?void 0:t[f]??[]},"argFor"),o=e.body,c=[],l=new Map;for(let d=0;d<o.length;d++){const f=o[d],h=o[d+1],p=c.length>0&&o[d-1]?.text==="##";if(f.text!=="##"){if(f.text==="#"&&h&&h.kind==="id"&&a(h.text)){this.diag("error",`stringizing (#) is not supported (macro ${e.name})`,n.loc),d++;continue}if(f.kind==="id"){const m=a(f.text);if(m){const g=h?.text==="##";let _;if(p||g)_=m;else{let b=l.get(f.text);b||(b=this.expand(m,!1),l.set(f.text,b)),_=b}p&&_.length&&(this.paste(c,_[0],n),_=_.slice(1));for(const b of _)c.push(Wa(b,n,r,b.space));continue}}if(p){this.paste(c,f,n);continue}c.push(Wa(f,n,r,f.space))}}return c.length&&(c[0]={...c[0],space:!0}),c}paste(e,t,n){const r=e.pop(),s=(r?.text??"")+t.text,a=mn(s,n.loc.file);a.pop(),a.length!==1&&this.diag("error",`pasting "${r?.text}" and "${t.text}" does not give a valid token`,n.loc);for(const o of a)e.push({...o,loc:n.loc,bol:!1,space:r?.space??!1})}evalCondition(e,t){const n=this.expand(e,!0),r=[];for(let s=0;s<n.length;s++){const a=n[s];if(a.kind==="id"&&a.text==="defined"){let o=n[s+1];o?.text==="("?(o=n[s+2],s+=3):s+=1;const c=o&&this.macros.has(o.text)?"1":"0";r.push({...a,kind:"num",text:c});continue}if(a.kind==="id"){r.push({...a,kind:"num",text:a.text==="true"?"1":"0"});continue}r.push(a)}try{return new Hi(r).parse()!==0n}catch(s){return this.diag("error",`bad #if expression: ${s.message}`,t),!1}}}function Wa(i,e,t,n){const r=i.hide&&i.hide.size?new Set([...t,...i.hide]):t;return{kind:i.kind,text:i.text,loc:e.loc,bol:!1,space:n,hide:r}}u(Wa,"relocate");class Hi{static{u(this,"IfExprEvaluator")}i=0;toks;constructor(e){this.toks=e}parse(){const e=this.ternary();if(this.i<this.toks.length)throw new Error(`unexpected '${this.toks[this.i].text}'`);return e}peek(){return this.toks[this.i]?.text}eat(e){return this.peek()===e?(this.i++,!0):!1}ternary(){const e=this.binary(0);if(this.eat("?")){const t=this.ternary();if(!this.eat(":"))throw new Error("expected ':'");const n=this.ternary();return e!==0n?t:n}return e}static LEVELS=[["||"],["&&"],["|"],["^"],["&"],["==","!="],["<",">","<=",">="],["<<",">>"],["+","-"],["*","/","%"]];binary(e){if(e>=Hi.LEVELS.length)return this.unary();let t=this.binary(e+1);const n=Hi.LEVELS[e];for(;;){const r=this.peek();if(r===void 0||!n.includes(r))return t;this.i++;const s=this.binary(e+1);t=wf(r,t,s)}}unary(){const e=this.toks[this.i];if(!e)throw new Error("unexpected end of expression");if(e.text==="("){this.i++;const t=this.ternary();if(!this.eat(")"))throw new Error("expected ')'");return t}if(e.text==="!")return this.i++,this.unary()===0n?1n:0n;if(e.text==="-")return this.i++,-this.unary();if(e.text==="+")return this.i++,this.unary();if(e.text==="~")return this.i++,~this.unary();if(e.kind==="num")return this.i++,lc(e.text);throw new Error(`unexpected '${e.text}'`)}}function wf(i,e,t){const n=u(r=>r?1n:0n,"B");switch(i){case"||":return n(e!==0n||t!==0n);case"&&":return n(e!==0n&&t!==0n);case"|":return e|t;case"^":return e^t;case"&":return e&t;case"==":return n(e===t);case"!=":return n(e!==t);case"<":return n(e<t);case">":return n(e>t);case"<=":return n(e<=t);case">=":return n(e>=t);case"<<":return e<<t;case">>":return e>>t;case"+":return e+t;case"-":return e-t;case"*":return e*t;case"/":if(t===0n)throw new Error("division by zero");return e/t;case"%":if(t===0n)throw new Error("division by zero");return e%t}throw new Error(`bad operator ${i}`)}u(wf,"applyBinary");function lc(i){const e=i.replace(/[uU]$/,"");if(/^0[xX]/.test(e))return BigInt(e);if(/^0[0-7]+$/.test(e))return BigInt("0o"+e.slice(1));if(/^\d+$/.test(e))return BigInt(e);throw new Error(`not an integer: ${i}`)}u(lc,"parseIntLiteral");function uc(i,e,t=0){const n=i.get(e);if(!n||n.params!==null||n.body.length!==1||t>8)return;const r=n.body[0];if(r.kind==="num")try{return Number(lc(r.text))}catch{return}return r.kind==="id"?uc(i,r.text,t+1):void 0}u(uc,"macroIntValue");function Pf(i){const e={float:"f32",int:"i32",uint:"u32",bool:"bool",double:"f32"};if(i==="hgi_dvec3")return"hgi_vec3";if(i==="hgi_dmat3")return"hgi_mat3";if(e[i])return e[i];const t=/^(vec|ivec|uvec|bvec|dvec)([234])$/.exec(i);return t?`vec${t[2]}<${{vec:"f32",dvec:"f32",ivec:"i32",uvec:"u32",bvec:"bool"}[t[1]]}>`:i}u(Pf,"_wgslAliasTarget");function dc(i,e,t=0){const n=i.get(e);if(!n||n.params!==null||n.body.length!==1||t>8)return;const r=n.body[0];if(r.kind==="id")return dc(i,r.text,t+1)??r.text}u(dc,"macroTypeName");function Tf(i){const e=[],t=u((n,r)=>(e.push(r?{severity:"error",message:n,loc:r}:{severity:"error",message:n}),{ok:!1,wgsl:"",directives:[],body:"",diagnostics:e,nameMap:new Map,initGlobalsFunction:null,autoBindings:[],stubbedFunctions:[],writtenGlobals:[]}),"fail");try{const n=i.fileName??"<shader>",r=[...i.prelude===!1?[]:mn(Sf,"<hgiWebGPU prelude>").slice(0,-1),...i.declarations?mn(i.declarations,n).slice(0,-1):[],...mn(i.code,n)],s=xf(r,i.defines?{defines:i.defines}:{});for(const g of s.diagnostics)e.push(g);if(s.diagnostics.some(g=>g.severity==="error"))return t("preprocessing failed");const a=new Map,o=new Map,l=(i.globals??[]).map(g=>{const _=dc(s.defines,g.type);return _===void 0?g:(o.set(g.type,_),{...g,type:_})}).map(g=>{if(typeof g.arraySize!="string"||g.arraySize==="runtime")return g;const _=g.arraySize,b=/^\d+$/.test(_)?Number(_):uc(s.defines,_);if(b===void 0)throw new Va(`array size '${_}' of interface symbol ${g.name} is not an integer macro`);return/^\d+$/.test(_)||a.set(_,b),{...g,arraySize:b}}),d=gf(s.tokens),f=Jd(d,{stage:i.stage,externals:l,externalStructs:i.structs??[],externalFunctions:i.functions??[],providedStructs:i.providedStructs??[],allowUndefinedFunctions:i.mode==="section"});for(const g of f.diagnostics)e.push(g);const h=sf(f,{stage:i.stage,...i.autoBindingStart!==void 0?{autoBindingStart:i.autoBindingStart}:{}});for(const g of h.diagnostics)e.push(g);const p=[...a].map(([g,_])=>`const ${g} = ${_};
`).join("")+[...o].map(([g,_])=>`alias ${g} = ${Pf(_)};
`).join("");return h.body=p+h.body,{ok:!0,wgsl:`${h.directives.join(`
`)}

${h.body}`,directives:h.directives,body:h.body,diagnostics:e,nameMap:f.nameMap,initGlobalsFunction:h.initGlobalsFunction,autoBindings:h.autoBindings,stubbedFunctions:f.stubs.map(g=>g.name),writtenGlobals:f.globals.flatMap(g=>g.external&&g.sym.written?[g.external.name]:[])}}catch(n){if(n instanceof ts||n instanceof Va||n instanceof Ci||n instanceof oc)return t(n.message,n.loc);if(n instanceof Xe)return t(n.message.replace(/^[^:]+:\d+:\d+: /,""),n.loc);throw n}}u(Tf,"translateGlslToWgsl");function kf(i){return`${i.loc?`${cc(i.loc)}: `:""}${i.severity}: ${i.message}`}u(kf,"formatDiagnostic");const If=["hgi_ivec3","hgi_vec3","hgi_mat3"];function Cf(i){switch(i){case I.HgiShaderStageVertex:return"vertex";case I.HgiShaderStageFragment:return"fragment";case I.HgiShaderStageCompute:return"compute";case I.HgiShaderStagePostTessellationVertex:return"postTessVertex";case I.HgiShaderStagePostTessellationControl:return"postTessControl";case I.HgiShaderStageTessellationControl:return"tessControl";case I.HgiShaderStageTessellationEval:return"tessEval";case I.HgiShaderStageGeometry:return"geometry"}return"library"}u(Cf,"glslStageFromHgi");const gr={f32:"float",i32:"int",u32:"uint",bool:"bool",f16:"float"},Df={f32:"vec",i32:"ivec",u32:"uvec",bool:"bvec"};function Bi(i){const e=i.replace(/\s+/g,"");let t=/^array<(.+?)(?:,(\w+))?>$/.exec(e);if(t){const n=Bi(t[1]);if(n.arraySize!==void 0)throw new Error(`nested arrays are not supported: ${i}`);const r=t[2];return{...n,arraySize:r===void 0?"runtime":/^\d+$/.test(r)?Number(r):r}}if(t=/^atomic<(i32|u32)>$/.exec(e),t)return{type:gr[t[1]],atomic:!0};if(gr[e])return{type:gr[e]};if(t=/^vec([234])<(f32|i32|u32|bool|f16)>$/.exec(e)??/^vec([234])([fiuh])$/.exec(e),t){const n={f:"f32",i:"i32",u:"u32",h:"f16"}[t[2]]??t[2];return{type:`${Df[n]??"vec"}${t[1]}`}}return t=/^mat([234])x([234])(?:<f(?:32|16)>|f|h)$/.exec(e),t?{type:t[1]===t[2]?`mat${t[1]}`:`mat${t[1]}x${t[2]}`}:{type:e}}u(Bi,"glslTypeFromWgsl");function $f(i){const e=i.nameInShader,t=i.textureType===St.HgiShaderTextureTypeShadowTexture,n=i.textureType===St.HgiShaderTextureTypeArrayTexture,r=i.textureType===St.HgiShaderTextureTypeCubemapTexture,s=Math.min(Math.max(i.dimensions,1),3),a=i.format===W.HgiFormatInvalid?W.HgiFormatFloat32:Jn(i.format),o=a===W.HgiFormatUInt16?"u":a===W.HgiFormatInt16||a===W.HgiFormatInt32?"i":"",c=n?s+1:s,l=t||n||r?s+1:s,d=u((y,S)=>y===1?S==="i"?"int":"float":`${S}vec${y}`,"vecOf"),f=d(c,"i"),h=d(l,"i"),p=d(l,""),m=`${o}vec4`;if(i.writable)return[{name:`HgiSet_${e}`,params:[h,"vec4"],returnType:"void"},{name:`HgiGetSize_${e}`,params:[],returnType:f}];const g=t?"float":m,_=i.arraySize>0?["uint"]:[],b=[{name:`HgiGet_${e}`,params:[..._,p],returnType:g},{name:`HgiGetSize_${e}`,params:[..._],returnType:f},{name:`HgiTextureLod_${e}`,params:[..._,p,"float"],returnType:g}];return!t&&!r&&b.push({name:`HgiTexelFetch_${e}`,params:[..._,h],returnType:m}),b}u($f,"textureAccessorFunctions");function Bf(i){if(i.writable||i.arraySize>0)return null;const e=i.nameInShader,t=i.textureType===St.HgiShaderTextureTypeShadowTexture,n=i.textureType===St.HgiShaderTextureTypeArrayTexture,r=i.textureType===St.HgiShaderTextureTypeCubemapTexture,s=i.format===W.HgiFormatInvalid?W.HgiFormatFloat32:Jn(i.format),a=s===W.HgiFormatUInt16?"u":s===W.HgiFormatInt16||s===W.HgiFormatInt32?"i":"",o=Math.min(Math.max(i.dimensions,1),3),c=`${a}sampler${r?"Cube":`${o}D`}${n?"Array":""}${t?"Shadow":""}`;return{global:{name:e,type:c,space:"handle",declare:!1,accessExpr:`textureBind_${e}`,samplerAccessExpr:`samplerBind_${e}`},define:`#define HgiGetSampler_${e}() ${e}
`}}u(Bf,"textureCombinedSampler");function Ff(i,e){let t="";const n=[],r=[],s=[];for(const a of i)switch(a.kind){case"texture":{const o=e.textures.find(c=>c.nameInShader===a.name);if(o){s.push(...$f(o));const c=Bf(o);c&&(n.push(c.global),t+=c.define)}continue}case"interstageBlock":{const o=[...e.stageInputBlocks,...e.stageOutputBlocks].find(c=>c.instanceName===a.name);o&&!r.some(c=>c.name===o.blockName)&&r.push({name:o.blockName,declare:!1,fields:o.members.map(c=>({name:c.name,type:Bi(c.type).type}))}),n.push({name:a.name,type:a.wgslType,space:"private",declare:!1});continue}case"buffer":{const o=Bi(a.wgslType),c=e.buffers.find(d=>d.nameInShader===a.name),l={name:a.name,type:o.type,space:"storage",access:c?.writable&&!a.readOnly?"read_write":"read",declare:!1};o.arraySize!==void 0&&(l.arraySize=o.arraySize),o.atomic&&(l.atomic=!0),n.push(l);continue}default:{const o=Bi(a.wgslType),c={name:a.name,type:o.type,space:"private",declare:!1};o.arraySize!==void 0&&(c.arraySize=o.arraySize);const l=a.kind==="globalMember"?e.stageGlobalMembers.find(d=>d.nameInShader===a.name):void 0;l?.arraySize&&o.arraySize===void 0&&(c.arraySize=/^\d+$/.test(l.arraySize)?Number(l.arraySize):l.arraySize),n.push(c)}}return{globals:n,structs:r,functions:s,defines:t}}u(Ff,"hostSymbols");const za=new Map,Ef={Translate(i){let e;try{e=Ff(i.globals,i.descriptor)}catch(l){return{declarations:"",code:"",errors:`HgiWebGPU GLSL translation: ${l.message}`}}const t=Cf(i.stage),n=e.defines+i.declarations,r=JSON.stringify([t,n,i.code,e.globals,e.structs,e.functions]),s=za.get(r);if(s)return{...s};const a=Tf({stage:t,declarations:n,code:i.code,globals:e.globals,structs:e.structs,functions:e.functions,providedStructs:If}),o=a.diagnostics.filter(l=>l.severity==="error").map(kf).join(`
`),c={declarations:"",code:a.ok?a.body:"",errors:a.ok?o:o||"HgiWebGPU GLSL translation failed",writtenGlobals:a.writtenGlobals};return za.set(r,c),{...c}}},Bn={discoveryType:"glslfx",shadingSystem:"glslfx"};function Xa(i){let e="Unknown",t=0;const n=u(a=>a.IsHolding($.double),"isDouble"),r=u(a=>a.IsHolding($.float),"isFloat"),s=u(a=>ue.createArray(new Y(a.map(Math.fround),$.float)),"floatArray");if(i.IsHolding(Zl)){const a=i.Get();if(a.length===16)if(n(a[0])){const o=a.map(c=>c.Get());return e="Matrix",{value:ue.create(new pe(...o),$.GfMatrix4d),arraySize:t,sdrType:e}}else if(r(a[0])){const o=a.map(c=>c.Get());return e="Matrix",{value:ue.create(new de(...o),vn.declare("GfMatrix4f")),arraySize:t,sdrType:e}}else return{value:ue.getEmpty(),arraySize:t,sdrType:e};else if(a.length===1){if(n(a[0]))return e="Float",{value:ue.create(Math.fround(a[0].Get()),$.float),arraySize:t,sdrType:e};if(r(a[0]))return e="Float",{value:ue.create(a[0].Get(),$.float),arraySize:t,sdrType:e}}else if(a.length===2||a.length===4){const o=[];for(const c of a)if(n(c)||r(c))o.push(c.Get());else return{value:ue.getEmpty(),arraySize:t,sdrType:e};return e="Float",t=a.length,{value:s(o),arraySize:t,sdrType:e}}else if(a.length===3){const o=[];for(const c of a)if(n(c)||r(c))o.push(c.Get());else return{value:ue.getEmpty(),arraySize:t,sdrType:e};return e="Color",{value:ue.create(new We(o[0],o[1],o[2]),$.GfVec3f),arraySize:t,sdrType:e}}}else{if(n(i))return e="Float",{value:ue.create(Math.fround(i.Get()),$.float),arraySize:t,sdrType:e};if(r(i))return e="Float",{value:ue.create(i.Get(),$.float),arraySize:t,sdrType:e};if(i.IsHolding($.int))return e="Int",{value:ue.create(i.Get(),$.int),arraySize:t,sdrType:e};if(i.IsHolding($.bool))return e="Int",{value:ue.create(i.Get()?1:0,$.int),arraySize:t,sdrType:e}}return{value:i,arraySize:t,sdrType:e}}u(Xa,"ConvertToSdrCompatibleValueAndType");class Gf{static{u(this,"SdrGlslfxParserPlugin")}getDiscoveryTypes(){return[Bn.discoveryType]}getShadingSystem(){return Bn.shadingSystem}parseShaderNode(e){let t;const n=e.identifier;if(e.uri)t=new Hr(e.resolvedUri);else if(e.sourceCode)t=new Hr(new Jl(e.sourceCode));else return Vt(`Invalid SdrShaderNodeDiscoveryResult with identifier ${n}: both uri and sourceCode are empty.`),new qs(n,e.version,e.name,e.function,e.discoveryType,e.sourceType,e.uri,e.resolvedUri);const r={value:""};t.isValid(r)||Vt(`Failed to parse glslfx at URI [${e.uri}] error [${r.value}]`);const s=[];for(const c of t.getParameters()){const{value:l,arraySize:d,sdrType:f}=Xa(c.defaultValue);s.push(new js(c.name,f,l,!1,d,{}))}for(const c of t.getTextures()){let{value:l,arraySize:d,sdrType:f}=Xa(c.defaultValue);l.IsEmpty()&&(f="Color",l=ue.create(new We(0,0,0),$.GfVec3f)),s.push(new js(c.name,f,l,!1,d,{}))}const a={...e.metadata??{}},o=[];a.primvars!==void 0&&o.push(a.primvars);for(const c of t.getAttributes())o.push(c.name);return o.length!==0&&(a.primvars=o.join("|")),a.context=Bn.shadingSystem,new qs(n,e.version,e.name,e.function,Bn.shadingSystem,Bn.shadingSystem,e.resolvedUri,e.resolvedUri,s,a,e.sourceCode??"")}}Kn.GetInstance().RegisterPlugins({Plugins:[{Info:{Types:{SdrGlslfxParserPlugin:{bases:["SdrParserPlugin"],displayName:"Glslfx-based shader definition parser plugin"}}},LibraryPath:"@PLUG_INFO_LIBRARY_PATH@",Name:"sdrGlslfx",ResourcePath:"@PLUG_INFO_RESOURCE_PATH@",Root:"@PLUG_INFO_ROOT@",Type:"library"}]});nl("SdrGlslfxParserPlugin",Gf);const Lf={"shaders/previewSurface.glslfx":`-- glslfx version 0.1

//
// Copyright 2018 Pixar
//
// Licensed under the terms set forth in the LICENSE.txt file available at
// https://openusd.org/license.
//

#import $TOOLS/hdSt/shaders/surfaceHelpers.glslfx

-- configuration
{
    "techniques": {
        "default": {
            "displacementShader": {
                "source": [ "Preview.Displacement" ]
            },
            "surfaceShader": {
                "source": [ "Preview.LightStructures",
                            "SurfaceHelpers.Lighting", 
                            "Preview.Lighting",
                            "Preview.LightIntegration",
                            "SurfaceHelpers.TangentSpace",
                            "Preview.NormalMapping",
                            "Preview.Surface" ]
            }
        }
    }
}


-- glsl Preview.Displacement

vec4
displacementShader(int index, vec4 Peye, vec3 Neye, vec4 patchCoord)
{
    // Calculate scalar displacement.
    float texDisplacement = HdGetScalar_displacement(index);
    return Peye + vec4(Neye*texDisplacement, 0);
}


-- glsl Preview.Surface

vec4
surfaceShader(vec4 Peye, vec3 Neye, vec4 color, vec4 patchCoord)
{
    float clearcoatAmount    = HdGetScalar_clearcoat();
    float clearcoatRoughness = HdGetScalar_clearcoatRoughness();
    vec3 diffuseColor        = HdGet_diffuseColor().xyz;
    vec3 emissiveColor       = HdGet_emissiveColor().xyz;
    float ior                = HdGetScalar_ior();
    float metallic           = HdGetScalar_metallic();
    float occlusion          = HdGetScalar_occlusion();
    float opacity            = HdGetScalar_opacity();
    float opacityThreshold   = HdGetScalar_opacityThreshold();
    float roughness          = HdGetScalar_roughness();
    vec3 specularColor       = HdGet_specularColor().xyz;
    bool useSpecularWorkflow = (HdGetScalar_useSpecularWorkflow() == 1);

    vec3 clearcoatColor      = vec3(1.0);
    float specularAmount     = 1.0;
    const int opacityMode    = HdGet_opacityMode();

#ifdef HD_MATERIAL_TAG_MASKED

    if (opacity < opacityThreshold) {
        discard;
        return vec4(1.0);
    } 
    opacity = 1.0;

#else // !HD_MATERIAL_TAG_MASKED

    // We need to ensure that the opacity is applied correctly to diffuseColor.
    //
    // In general, in the simple cases, if opacity has already been
    // pre-multiplied, we could just use the pre-multiplied diffuseColor.
    //
    // However, if we have diffuseColor coming from a pre-multiplied texture
    // which had biasing applied to it, or which had opacity scale and biasing,
    // we need to take extra steps to ensure the diffuseColor is scaled
    // appropriately.
#ifdef diffuseColor_IS_PREMULTIPLIED
    // We want to undo the pre-multiplication of diffuseColor.  To do this
    // correctly we need to work with the diffuseColor and opacity without any
    // scale or biasing having been applied to either.
    diffuseColor = HdGet_diffuseColor_withoutScaleAndBias();
    const float opacity_withoutScaleAndBias =
        HdGet_opacity_withoutScaleAndBias();
    if (opacity_withoutScaleAndBias > 0) {
        diffuseColor.rgb /= opacity_withoutScaleAndBias;
    }

    // Now we can apply the diffuseColor scale and/or bias to the
    // un-pre-multiplied diffuseColor if present.
    diffuseColor = HdGet_diffuseColor_applyScaleAndBias(diffuseColor);
#endif // diffuseColor_IS_PREMULTIPLIED

    // At this point, diffuseColor has had the pre-multiplication of the
    // original opacity removed if it was present, and any scale or biasing
    // applied to it.  And since the opacity has had its scale and/or biasing
    // applied to it by this point, it can now be applied when appropriate.

    // If opacityMode is "transparent", opacity should only apply to the
    // diffuseColor component.
    if (opacityMode == 1) {
        diffuseColor *= opacity;
    }

#endif // HD_MATERIAL_TAG_MASKED

    // Selection highlighting.
    vec4 colorAndOpacity = vec4(diffuseColor, opacity);
    diffuseColor = ApplyColorOverrides(colorAndOpacity).rgb;

    // Evaluate all lights.
    vec3 c = evaluateLights(
        emissiveColor,
        diffuseColor,
        useSpecularWorkflow,
        ior,
        metallic,
        specularAmount,
        specularColor,
        roughness,
        clearcoatAmount,
        clearcoatColor,
        clearcoatRoughness,
        occlusion,
        Peye,
        perturbFragmentNormal(Peye.xyz, Neye));

    // If opacityMode is "presence", opacity applies to all color components.
    if (opacityMode == 0) {
        c *= opacity;
    }

    return vec4(c, opacity);
}


-- glsl Preview.LightStructures

struct LightingContributions
{
    vec3 diffuse;
    vec3 specular;
};


-- glsl Preview.Lighting

#define EPSILON 0.001


float
SchlickFresnel(float EdotH)
{
    return pow(max(0.0, 1.0 - EdotH), 5.0);
}

float
NormalDistribution(float specularRoughness, float NdotH)
{
    float alpha = specularRoughness * specularRoughness;
    float alpha2 = alpha * alpha;
    float NdotH2 = NdotH * NdotH;
    float DDenom = (NdotH2 * (alpha2 - 1.0)) + 1.0;
    DDenom *= DDenom;
    DDenom *= PI;
    float D = (alpha2 + EPSILON) / DDenom;
    return D;
}

float
Geometric(
        float specularRoughness,
        float NdotL,
        float NdotE,
        float NdotH,
        float EdotH)
{
    float alpha = specularRoughness * specularRoughness;
    float k = alpha * 0.5;
    float G = NdotE / (NdotE * (1.0 - k) + k);
    G *= NdotL / (NdotL * (1.0 - k) + k);
    return G;
}

vec3
evaluateDirectDiffuse()
{
    return vec3(1.0 / PI);
}

vec3
evaluateDirectSpecular(
        vec3 specularColorF0,
        vec3 specularColorF90,
        float specularRoughness,
        float fresnel,
        float NdotL,
        float NdotE,
        float NdotH,
        float EdotH)
{
    vec3 F = mix(specularColorF0, specularColorF90, fresnel);
    float D = NormalDistribution(specularRoughness, NdotH);
    float G = Geometric(specularRoughness, NdotL, NdotE, NdotH, EdotH);
    vec3 RNum = F * G * D;
    float RDenom = 4.0f * NdotL * NdotE + EPSILON;
    return RNum / RDenom;
}

LightingContributions
evaluateLight(
        vec3 diffuseColor,
        bool useSpecularWorkflow,
        float ior,
        float metallic,
        float specularAmount,
        vec3 specularColor,
        float specularRoughness,
        float clearcoatAmount,
        vec3 clearcoatColor,
        float clearcoatRoughness,
        float occlusion,
        float NdotL,
        float NdotE,
        float NdotH,
        float EdotH,
        vec3 lightDiffuseIrradiance,
        vec3 lightSpecularIrradiance)
{
    specularRoughness = max(0.001, specularRoughness);
    clearcoatRoughness = max(0.001, clearcoatRoughness);

    float fresnel = SchlickFresnel(EdotH);

    // Evaluate diffuse
    vec3 d = diffuseColor * evaluateDirectDiffuse();

    // Evaluate specular first lobe
    vec3 s1 = vec3(0.0);
    const float R = (1.0 - ior) / (1.0 + ior);
    if (specularAmount > 0.0) {
        vec3 F0 = specularColor;
        vec3 F90 = vec3(1.0);

        if (!useSpecularWorkflow) {
            vec3 specColor = mix(vec3(1.0), diffuseColor, metallic);
            F0 = mix(R * R * specColor, specColor, metallic);
            F90 = specColor;

            // For metallic workflows, pure metals have no diffuse
            d *= 1.0 - metallic;
        }

        s1 = specularAmount * evaluateDirectSpecular(
             F0,                          // Specular color 0
             F90,                         // Specular color 90
             specularRoughness,           // Roughness
             fresnel,                     // Fresnel
             NdotL, NdotE, NdotH, EdotH); // Dot products needed for lights

        // Adjust the diffuse so glazing angles have less diffuse
        d *= (1.0 - mix(F0, F90, fresnel));
    }

    // Evaluate clearcoat
    vec3 s2 = vec3(0.0);
    if (clearcoatAmount > 0.0) {
        s2 = clearcoatAmount * evaluateDirectSpecular(
             R * R * clearcoatColor,      // Clearcoat color 0
             clearcoatColor,              // Clearcoat color 90
             clearcoatRoughness,          // Roughness
             fresnel,                     // Fresnel
             NdotL, NdotE, NdotH, EdotH); // Dot products needed for lights
    }

    LightingContributions lightingContrib;

    lightingContrib.diffuse =
        occlusion * NdotL * d * lightDiffuseIrradiance;

    lightingContrib.specular =
        occlusion * NdotL * (s1 + s2) * lightSpecularIrradiance;

    return lightingContrib;
}


-- glsl Preview.LightIntegration

mat4 GetDomeLightTransform(mat4 worldToLightTransform)
{
    // transform from view space to light space
    mat4 worldToViewInverse = GetWorldToViewInverseMatrix();
    return worldToLightTransform * worldToViewInverse;
}

LightingContributions
evaluateIndirectLighting(
        vec3 diffuseColor,
        vec3 specularColor,
        vec3 Neye,
        vec3 Reye,
        float NdotE,
        float EdotH,
        float ior,
        float metallic,
        float occlusion,
        float roughness,
        bool useSpecularWorkflow,
        float clearcoatAmount, 
        vec3 clearcoatColor, 
        float clearcoatRoughness,
        mat4 worldToLightTransform)
{
    LightingContributions indirect;
    indirect.diffuse = vec3(0.0);
    indirect.specular = vec3(0.0);

#ifdef HD_HAS_domeLightIrradiance
    vec3 F0 = specularColor;
    vec3 F90 = vec3(1.0);
    vec3 d = diffuseColor;
    const float R = (1.0 - ior) / (1.0 + ior);
    if (!useSpecularWorkflow) {
        vec3 specColor = mix(vec3(1.0), diffuseColor, metallic);
        F0 = mix(R * R * specColor, specColor, metallic);
        F90 = specColor;

        // For metallic workflows, pure metals have no diffuse
        d *= 1.0 - metallic;
    }
    // Adjust the diffuse so glazing angles have less diffuse
    float fresnel = SchlickFresnel(EdotH);
    vec3 F = mix(F0, F90, fresnel);
    d *= (1.0 - F);

    mat4 transformationMatrix = GetDomeLightTransform(worldToLightTransform);

    // Diffuse Component
    vec3 dir = normalize((transformationMatrix * vec4(Neye,0.0)).xyz);
    vec3 diffuse = HdGet_domeLightIrradiance(dir).rgb;

    // Specular Component 
    const float MAX_REFLECTION_LOD = 
        textureQueryLevels(HdGetSampler_domeLightPrefilter());
    float lod = roughness * MAX_REFLECTION_LOD;
    vec3 Rdir = normalize((transformationMatrix * vec4(Reye,0.0)).xyz);
    vec3 prefilter = HdTextureLod_domeLightPrefilter(Rdir, lod).rgb;

    vec2 brdf = HdGet_domeLightBRDF(vec2(NdotE, roughness)).rg;

    vec3 specular = prefilter * (F * brdf.x + brdf.y);

    // Clearcoat Component
    vec3 clearcoat = vec3(0.0);
    if (clearcoatAmount > 0.0) {
        const vec3 clearcoatF = clearcoatAmount * mix(
            R * R * clearcoatColor, // Clearcoat F0
            clearcoatColor,         // Clearcoat F90
            fresnel);
        lod = clearcoatRoughness * MAX_REFLECTION_LOD;
        prefilter = HdTextureLod_domeLightPrefilter(Rdir, lod).rgb;
        brdf = HdGet_domeLightBRDF(vec2(NdotE, clearcoatRoughness)).rg;
        clearcoat = prefilter * (clearcoatF * brdf.x + brdf.y);
    }

    // Indirect Lighting
    indirect.diffuse = (d * diffuse) * occlusion;
    indirect.specular = (specular + clearcoat) * occlusion;

#endif

    return indirect;
}

vec3
evaluateLights(
        vec3 emissiveColor,
        vec3 diffuseColor,
        bool useSpecularWorkflow,
        float ior,
        float metallic,
        float specularAmount,
        vec3 specularColor,
        float specularRoughness,
        float clearcoatAmount,
        vec3 clearcoatColor,
        float clearcoatRoughness,
        float occlusion,
        vec4 Peye,
        vec3 Neye)
{
    vec3 n = Neye;
    vec3 e = normalize(-Peye.xyz);
    float NdotE = max(0.0, dot(n, e));

    vec3 Reye = reflect(-e, n);

    vec3 directLight = vec3(0.0);
    vec3 indirectLight = vec3(0.0);

#if NUM_LIGHTS > 0
    for (int i = 0; i < GetLightCount(); ++i) {
        LightSource light = GetLightSource(i);

        // Calculate necessary vector information for lighting
        vec4 Plight = light.isIndirectLight
                        ? vec4(0,0,0,1)
                        : light.position;
        vec3 l = (Plight.w == 0.0)
                    ? normalize(Plight.xyz)
                    : normalize(Plight - Peye).xyz;
        vec3 h = normalize(e + l);
        float NdotL = max(0.0, dot(n, l));
        float NdotH = max(0.0, dot(n, h));
        float EdotH = max(0.0, dot(e, h));

        // Calculate light intensity
        float atten = lightDistanceAttenuation(Peye, i);
        float spot = lightSpotAttenuation(l, i);

        // Calculate the shadow factor
        float shadow = 1.0;
    #if USE_SHADOWS
        shadow = light.hasShadow ?
            shadowing(/*lightIndex=*/i, Peye) : 1.0;
    #endif

        float intensity = atten * spot * shadow;

        vec3 lightDiffuseIrradiance = intensity * light.diffuse.rgb;
        vec3 lightSpecularIrradiance = intensity * light.specular.rgb;

        LightingContributions lightingContrib = evaluateLight(
            diffuseColor,
            useSpecularWorkflow,
            ior,
            metallic,
            specularAmount,
            specularColor,
            specularRoughness,
            clearcoatAmount,
            clearcoatColor,
            clearcoatRoughness,
            occlusion,
            NdotL,
            NdotE,
            NdotH,
            EdotH,
            lightDiffuseIrradiance,
            lightSpecularIrradiance);

        // calculate the indirect light (DomeLight)
        if (light.isIndirectLight) {

            LightingContributions indirectLightContrib = 
                evaluateIndirectLighting(diffuseColor, specularColor,
                    Neye, Reye, NdotE, EdotH, ior, metallic, occlusion,
                    specularRoughness, useSpecularWorkflow,
                    clearcoatAmount, clearcoatColor, clearcoatRoughness,
                    light.worldToLightTransform);
            indirectLight = (indirectLightContrib.diffuse * light.diffuse.rgb 
                           + indirectLightContrib.specular * light.specular.rgb);
        }
        // all other light sources contribute to the direct lighting
        else {
            directLight += (lightingContrib.diffuse + lightingContrib.specular);
        }
    }
#endif

    return (emissiveColor + directLight + indirectLight);
}


-- glsl Preview.NormalMapping

vec3
perturbFragmentNormal(vec3 P, vec3 N)
{
#ifdef HD_HAS_COORD_normal
    vec3 Nt = normalize(HdGet_normal().xyz);
    vec2 st = HdGetCoord_normal().xy;
    return PerturbNormal(P, N, st, Nt);
#endif
    return N;
}


`,"shaders/primvarReader.glslfx":`-- glslfx version 0.1

//
// Copyright 2018 Pixar
//
// Licensed under the terms set forth in the LICENSE.txt file available at
// https://openusd.org/license.
//

-- configuration
{
    "techniques": {
        "default": {
        }
    }
}

-- This file is intentionally empty. 
`,"shaders/shaderDefs.usda":`#usda 1.0

def Shader "UsdPreviewSurface" (
    doc = "Preview surface specification"
)
{
    uniform token info:id = "UsdPreviewSurface"
    uniform token info:implementationSource = "sourceAsset"

    # XXX: This doesn't resolve if it's defined as a search path.
    # Might require special resolver configuration, to include the resources
    # directory.
    uniform asset info:glslfx:sourceAsset = @./previewSurface.glslfx@

    # Outputs
    token outputs:surface (
        sdrMetadata = {
            string renderType = "terminal surface"
        }
    )
    token outputs:displacement (
        sdrMetadata = {
            string renderType = "terminal displacement"
        }
    )
 
    # Inputs
    color3f inputs:diffuseColor = (0.18, 0.18, 0.18) (
        doc = """Parameter used as diffuseColor when using the specular
                 workflow, when using metallic workflow this is interpreted
                 as albedo."""
    )

    color3f inputs:emissiveColor = (0.0, 0.0, 0.0) (
        doc = """Emissive component."""
    )

    int inputs:useSpecularWorkflow = 0 (
        connectability = "interfaceOnly"
        doc = """This node can fundamentally operate in two modes :
            Specular workflow where you provide a texture/value to the
            "specularColor" input. Or, Metallic workflow where you
            provide a texture/value to the "metallic" input."""
    )
 
    color3f inputs:specularColor = (0.0, 0.0, 0.0) (
        doc = """Used only in the specular workflow.
             Specular color to be used.
             This is the color at 0 incidence. Edge color is assumed white.
             Transition between the two colors according to Schlick fresnel 
             approximation."""
    )
 
    float inputs:metallic = 0.0 (
        doc = """Used only in the metalness workflow.
            1 for metallic surfaces and 0 for non-metallic.
            - If metallic is 1, then both F0 (reflectivity at 0 degree 
            incidence) and edge F90 reflectivity will simply be the Albedo.
            - If metallic is 0, then Albedo is ignored in the calculation of F0
            and F90; F0 is derived from ior via ( (1-ior)/(1+ior) )^2 and F90 is
            white. 
            In between, we interpolate."""
    )
 
    float inputs:roughness = 0.5 (
        doc = """Roughness for the specular lobe. The value ranges from 0 to 1, 
        which goes from a perfectly specular surface at 0.0 to maximum roughness 
        of the specular lobe. This value is usually squared before use with a 
        GGX or Beckmann lobe."""
    )
 
    float inputs:clearcoat = 0.0 (
        doc = """Second specular lobe amount. The color is white."""
    )
 
    float inputs:clearcoatRoughness = 0.01 (
        doc = """Roughness for the second specular lobe."""
    )
 
    float inputs:opacity = 1.0 (
        doc = """Opacity of the material."""
    )
 
    token inputs:opacityMode = "transparent" (
        allowedTokens = ["transparent", "presence"]
        connectability = "interfaceOnly"
        doc = """This is used to determine how materials with opacity less 
        than one are interpreted. When set to "transparent", opacity reduces 
        just the contribution of the diffuse lighting component, while when
        set to "presence", opacity scales the entire lighting response. 
        Note that when opacityThreshold is non-zero, opacityMode is ignored."""
    )

    float inputs:opacityThreshold = 0.0 (
        connectability = "interfaceOnly"
        doc = """Threshold used to determine opacity values that will be
        considered fully transparent. A value of 0.0 indicates that no masking
        is applied to the opacity input, while a value greater than 0.0 indicates
        that rendering of the surface is limited to the areas where the opacity
        is greater or equal to that value. Note that when opacityThreshold is
        greater than zero, the opacity values less than the opacityThreshold will
        not be rendered, and the opacity values greater than or equal to the
        opacityThreshold will be fully visible. This is the behavior regardless 
        of the opacityMode."""
    )

    float inputs:ior = 1.5 (
        doc = """Index of Refraction to be used for translucent objects."""
    )

    normal3f inputs:normal = (0.0, 0.0, 1.0) (
        doc = """Expects normal in tangent space [(-1,-1,-1), (1,1,1)]
            This means your texture reader implementation should provide
            data to this node that is properly scaled and ready
            to be consumed as a tangent space normal.
            If the texture has 8 bits per component, then scale and bias must be
            adjusted to be (2.0, 2.0, 2.0, 1.0) and (-1, -1, -1, 0) respectively
            in order to satisfy tangent space requirements.
            Normal map data is commonly expected to be linearly encoded. 
            However, many image-writing tools automatically set the profile of
            three-channel, 8-bit images to SRGB. To prevent an unwanted
            transformation, the sourceColorSpace must also be set to "raw"."""
    )

    float inputs:displacement = 0.0 (
        doc = """Displacement in the direction of the normal. """
    )

    float inputs:occlusion = 1.0 (
        doc = """Occlusion signal. This provides extra information about the 
        occlusion of different parts of the mesh that this material is applied 
        to.  Occlusion only makes sense as a surface-varying signal, and 
        pathtracers will likely choose to ignore it.  An occlusion value of 0.0 
        means the surface point is fully occluded by other parts of the surface, 
        and a value of 1.0 means the surface point is completely unoccluded by 
        other parts of the surface. """
    )
}

def Shader "UsdUVTexture" (
    doc = """Texture Node Specification represents a node that can be used to 
    read UV textures, including tiled textures such as Mari UDIM's.
     
    Reads from a texture file and outputs one or more values. If the texture has
    8 bits per component, [0, 255] values will first be converted to floating 
    point in the range [0, 1] and then any transformations (bias, scale) 
    indicated  are applied. Otherwise any indicated transformation (bias, 
    scale) is just applied. If a single-channel texture is fed into a 
    UsdUVTexture, the r, g, and b components of the rgb output will repeat the 
    channel's value, while the single 'a' output will be set to 1.0. If a 
    two-channel texture is fed into a UsdUVTexture, the r, g, and b components 
    of the rgb output will repeat the first channel's value, while the single 
    'a' output will be set to the second channel's value. If a three-channel 
    texture is fed into a UsdUVTexture, the r, g, and b components of the rgb 
    outputs will contain the assigned texture channel's value, while the single 
    'a' output will be set to 1.0.
"""
    sdrMetadata = {
        token role = "texture"
    }
)
{
    uniform token info:id = "UsdUVTexture"
    uniform token info:implementationSource = "sourceAsset"
    uniform asset info:glslfx:sourceAsset = @./uvTexture.glslfx@

    asset inputs:file = @@ (
        connectability = "interfaceOnly"
        doc = """Path to the texture this node uses."""
    )

    float2 inputs:st = (0.0, 0.0) (
        doc = """This input provides the texture coordinates. It is usually 
                connected to a (primvar) node that will provide the texture 
                coords."""
    )

    token inputs:wrapS = "useMetadata" (
        allowedTokens = ["black", "clamp", "repeat", "mirror", "useMetadata"]
        connectability = "interfaceOnly"
        doc = """<options> black, clamp, repeat, mirror, useMetadata."""
    )

    token inputs:wrapT = "useMetadata" (
        allowedTokens = ["black", "clamp", "repeat", "mirror", "useMetadata"]
        connectability = "interfaceOnly"
        doc = """<options> black, clamp, repeat, mirror, useMetadata."""
    )

    float4 inputs:fallback = (0.0, 0.0, 0.0, 1.0) (
        doc = """Fallback value to be used when no texture is connected."""
        sdrMetadata = {
            token defaultInput = "1"
        }
    )

    float4 inputs:scale = (1.0, 1.0, 1.0, 1.0) (
        connectability = "interfaceOnly"
        doc = """Scale to be applied to all components of the texture. 
                 value * scale + bias.
                 Please see UsdPreviewSurface.inputs:normal for special 
                 considerations for reading normal maps."""
    )

    float4 inputs:bias = (0.0, 0.0, 0.0, 0.0) (
        connectability = "interfaceOnly"
        doc = """Bias to be applied to all components of the texture. 
                 value * scale + bias).
                 Please see UsdPreviewSurface.inputs:normal for special 
                 considerations for reading normal maps."""
    )

    token inputs:sourceColorSpace = "auto" (
        connectability = "interfaceOnly"
        allowedTokens = ["raw", "sRGB", "auto"]
        doc = """<options> raw, sRGB, auto. Flag indicating the color
                 space in which the source texture is encoded. If set to sRGB,
                 the texture will be read using the sRGB transfer curve, but
                 not filtered against the sRGB gamut. Please see 
                 UsdPreviewSurface.inputs:normal for special considerations for 
                 reading normal maps."""
    )

    float outputs:r ( 
        doc = "Outputs the red channel."
        sdrMetadata = {
            token swizzle = "x"
        }
    )

    float outputs:g (
        doc = "Outputs the green channel."
        sdrMetadata = {
            token swizzle = "y"
        }
    )

    float outputs:b (
        doc = "Outputs the blue channnel."
        sdrMetadata = {
            token swizzle = "z"
        }
    )

    float outputs:a (
        doc = "Outputs the alpha channnel."
        sdrMetadata = {
            token swizzle = "w"
        }
    )

    float3 outputs:rgb (
        doc = "Outputs the red, green and blue channels."
        sdrMetadata = {
            token swizzle = "xyz"
        }
    )
}

class "UsdPrimvarReader" (
    sdrMetadata = {
        token role = "primvar"
    }
)
{
    uniform token info:implementationSource = "sourceAsset"
    uniform asset info:glslfx:sourceAsset = @./primvarReader.glslfx@
    string inputs:varname = "" (
        connectability = "interfaceOnly"
        doc = """Name of the primvar to be fetched from the geometry."""
        sdrMetadata = {
            token primvarProperty = "1"
        }
    )    
}

def Shader "UsdPrimvarReader_float" (
    inherits = </UsdPrimvarReader>
)
{
    uniform token info:id = "UsdPrimvarReader_float"

    float inputs:fallback = 0.0 (
        doc = """Fallback value to be returned when fetch failed."""
        sdrMetadata = {
            token defaultInput = "1"
        }
    )

    float outputs:result
}

def Shader "UsdPrimvarReader_float2" (
    inherits = </UsdPrimvarReader>
)
{
    uniform token info:id = "UsdPrimvarReader_float2"

    float2 inputs:fallback = (0.0, 0.0) (
        doc = """Fallback value to be returned when fetch failed."""
        sdrMetadata = {
            token defaultInput = "1"
        }
    )

    float2 outputs:result
}

def Shader "UsdPrimvarReader_float3" (
    inherits = </UsdPrimvarReader>
)
{
    uniform token info:id = "UsdPrimvarReader_float3"

    float3 inputs:fallback = (0.0, 0.0, 0.0) (
        doc = """Fallback value to be returned when fetch failed."""
        sdrMetadata = {
            token defaultInput = "1"
        }
    )

    float3 outputs:result
}

def Shader "UsdPrimvarReader_float4" (
    inherits = </UsdPrimvarReader>
)
{
    uniform token info:id = "UsdPrimvarReader_float4"

    float4 inputs:fallback = (0.0, 0.0, 0.0, 0.0) (
        doc = """Fallback value to be returned when fetch failed."""
        sdrMetadata = {
            token defaultInput = "1"
        }
    )

    float4 outputs:result
}

def Shader "UsdPrimvarReader_int" (
    inherits = </UsdPrimvarReader>
)
{
    uniform token info:id = "UsdPrimvarReader_int"

    int inputs:fallback = 0 (
        doc = """Fallback value to be returned when fetch failed."""
        sdrMetadata = {
            token defaultInput = "1"
        }
    )

    int outputs:result
}

def Shader "UsdPrimvarReader_string" (
    inherits = </UsdPrimvarReader>
)
{
    uniform token info:id = "UsdPrimvarReader_string"

    string inputs:fallback = "" (
        doc = """Fallback value to be returned when fetch failed."""
        sdrMetadata = {
            token defaultInput = "1"
        }
    )

    string outputs:result
}

def Shader "UsdPrimvarReader_normal" (
    inherits = </UsdPrimvarReader>
)
{
    uniform token info:id = "UsdPrimvarReader_normal"

    normal3f inputs:fallback = (0.0, 0.0, 0.0) (
        doc = """Fallback value to be returned when fetch failed."""
        sdrMetadata = {
            token defaultInput = "1"
        }
    )

    normal3f outputs:result
}

def Shader "UsdPrimvarReader_point" (
    inherits = </UsdPrimvarReader>
)
{
    uniform token info:id = "UsdPrimvarReader_point"

    point3f inputs:fallback = (0.0, 0.0, 0.0) (
        doc = """Fallback value to be returned when fetch failed."""
        sdrMetadata = {
            token defaultInput = "1"
        }
    )

    point3f outputs:result
}

def Shader "UsdPrimvarReader_vector" (
    inherits = </UsdPrimvarReader>
)
{
    uniform token info:id = "UsdPrimvarReader_vector"

    vector3f inputs:fallback = (0.0, 0.0, 0.0) (
        doc = """Fallback value to be returned when fetch failed."""
        sdrMetadata = {
            token defaultInput = "1"
        }
    )

    vector3f outputs:result
}

def Shader "UsdPrimvarReader_matrix" (
    inherits = </UsdPrimvarReader>
)
{
    uniform token info:id = "UsdPrimvarReader_matrix"

    matrix4d inputs:fallback = ( (1, 0, 0, 0), (0, 1, 0, 0), (0, 0, 1, 0), (0, 0, 0, 1) ) (
        doc = """Fallback value to be returned when fetch failed."""
        sdrMetadata = {
            token defaultInput = "1"
        }
    )

    matrix4d outputs:result
}

def Shader "UsdTransform2d" (
    doc = """Transform 2d represents a node that can be used to
    transform 2d data (for instance, texture coordinates).
    The node applies the following transformation :
    in * scale * rotate + translation"""
    sdrMetadata = {
        token role = "math"
    }
)
{
    uniform token info:id = "UsdTransform2d"
    uniform token info:implementationSource = "sourceAsset"
    uniform asset info:glslfx:sourceAsset = @./transform2d.glslfx@
 
    float2 inputs:in = (0.0, 0.0) (
        doc = """This input provides the data. It is usually
                connected to a UsdPrimvarReader_float2 that
                will provide the data."""
    )

    float inputs:rotation = 0.0 (
        connectability = "interfaceOnly"
        doc = """Counter-clockwise rotation in degrees around the origin to be applied
        to all components of the data."""
    )

    float2 inputs:scale = (1.0, 1.0) (
        connectability = "interfaceOnly"
        doc = """Scale around the origin to be applied to all components of the data."""
    )

    float2 inputs:translation = (0.0, 0.0) (
        connectability = "interfaceOnly"
        doc = """Translation to be applied to all components of the data."""
    )

    float2 outputs:result (
        doc = "Outputs transformed float2 values."
    )
}
`,"shaders/transform2d.glslfx":`-- glslfx version 0.1

//
// Copyright 2020 Pixar
//
// Licensed under the terms set forth in the LICENSE.txt file available at
// https://openusd.org/license.
//

-- configuration
{
    "techniques": {
        "default": {
        }
    }
}

-- This file is intentionally empty. 
`,"shaders/uvTexture.glslfx":`-- glslfx version 0.1

//
// Copyright 2018 Pixar
//
// Licensed under the terms set forth in the LICENSE.txt file available at
// https://openusd.org/license.
//

-- configuration
{
    "techniques": {
        "default": {
        }
    }
}

-- This file is intentionally empty. 
`};function Af(){return"/usd/usdShaders/resources"}u(Af,"UsdShaders_GetResourcePath");function Rf(){return{Plugins:[{Info:{Types:{UsdShadersDiscoveryPlugin:{bases:["SdrDiscoveryPlugin"],displayName:"USD-based shader definition discovery plugin."}},ShaderResources:"shaders"},LibraryPath:"@PLUG_INFO_LIBRARY_PATH@",Name:"usdShaders",ResourcePath:Af(),Root:"@PLUG_INFO_ROOT@",Type:"library"}]}}u(Rf,"UsdShaders_PlugInfo");function fc(){Kn.GetInstance().RegisterPlugins(Rf(),{usdShaders:Lf})}u(fc,"UsdShaders_RegisterShaderResources");function qa(i){Ce.GetInstance().postError(new st(i,at.RuntimeError))}u(qa,"RaiseRuntimeError");function Mf(i,e){return i||Ce.GetInstance().postError(new st(`Failed verification: ' ${e} '`,at.CodingError)),!!i}u(Mf,"TF_VERIFY$1");function ns(i=""){fc();const e=Kn.GetInstance().GetPluginWithName("usdShaders"),t=Ro(e,Mo("shaders",i));return Mf(t!=="",`Could not find shader resource: ${i}
`),t}u(ns,"_GetShaderResourcePath");let hc;class Nf{static{u(this,"UsdShadersDiscoveryPlugin")}getSearchURIs(){return[ns()]}discoverShaderNodes(){const e=[],t=ns("shaderDefs.usda");if(!t)return e;const n=hc;if(!n)return qa(`Could not open file '${t}' on a USD stage.`),e;for(const r of n.traverse()){if(r.lastIndexOf("/")!==0)continue;const s=n.getPrim(r);if(!s||s.typeName!=="Shader")continue;const a=al.getDiscoveryResults(n,r,t);e.push(...a),a.length===0&&qa(`Found shader definition <${r}> with no valid discovery results. This is likely because there are no resolvable info:sourceAsset values.`)}return e}}async function Of(){const i=ns("shaderDefs.usda"),e=i?await il.open(i):void 0;e&&new rl(e),hc=e,sl("UsdShadersDiscoveryPlugin",Nf)}u(Of,"UsdShaders_LoadDiscoveryPluginAsync");let ja;function Hf(){return ja??=(async()=>{fc(),await Of()})(),ja}u(Hf,"UsdShaders_RegisterShaderNodesAsync");const Uf="HdStormRendererPlugin",Vf={displayName:"GL",priority:0};function Wf(i){const e=[],t=[];for(const n of i)e.push(n.key),t.push(new nu.Builder().setName(J.new(n.name)).setDefaultValue(J.new(n.defaultValue)).build());return iu.buildRetained(e,t)}u(Wf,"_ToContainerDataSource");class zf extends fu{static{u(this,"HdStormRendererPlugin")}createRenderDelegate(e){return new ri(e)}deleteRenderDelegate(e){}isSupported(e,t){return ri.isSupported(e,t)}getSceneIndexCreateArgs(){return new hu.Builder().setMotionBlurSupport(J.new(!1)).setCameraMotionBlurSupport(J.new(!0)).setLegacyRenderDelegateInfo(J.new(ri.getRenderDelegateInfo())).setRenderSettingDescriptors(Wf(ri.getRenderSettingDescriptorsForPlugin())).build()}}function Xf(){tu.define(Uf,()=>new zf,Vf)}u(Xf,"HdStormRendererPlugin_Register");Xf();const le=Le({skelAnimation:"skelAnimation",joints:"joints",translations:"translations",rotations:"rotations",scales:"scales",blendShapes:"blendShapes",blendShapeWeights:"blendShapeWeights"});class H extends Pn{static{u(this,"UsdSkelImagingAnimationSchema")}constructor(e){super(e)}static getFromParent(e){const t=e?.Get(le.skelAnimation);return new H(t instanceof ce?t:void 0)}getJoints(){return this._getTypedDataSource(le.joints)}getTranslations(){return this._getTypedDataSource(le.translations)}getRotations(){return this._getTypedDataSource(le.rotations)}getScales(){return this._getTypedDataSource(le.scales)}getBlendShapes(){return this._getTypedDataSource(le.blendShapes)}getBlendShapeWeights(){return this._getTypedDataSource(le.blendShapeWeights)}static getSchemaToken(){return le.skelAnimation}static _defaultLocator;static getDefaultLocator(){return H._defaultLocator??=new Me(H.getSchemaToken())}static _jointsLocator;static getJointsLocator(){return H._jointsLocator??=H.getDefaultLocator().append(le.joints)}static _translationsLocator;static getTranslationsLocator(){return H._translationsLocator??=H.getDefaultLocator().append(le.translations)}static _rotationsLocator;static getRotationsLocator(){return H._rotationsLocator??=H.getDefaultLocator().append(le.rotations)}static _scalesLocator;static getScalesLocator(){return H._scalesLocator??=H.getDefaultLocator().append(le.scales)}static _blendShapesLocator;static getBlendShapesLocator(){return H._blendShapesLocator??=H.getDefaultLocator().append(le.blendShapes)}static _blendShapeWeightsLocator;static getBlendShapeWeightsLocator(){return H._blendShapeWeightsLocator??=H.getDefaultLocator().append(le.blendShapeWeights)}static buildRetained(e,t,n,r,s,a){return Tn({[le.joints]:e,[le.translations]:t,[le.rotations]:n,[le.scales]:r,[le.blendShapes]:s,[le.blendShapeWeights]:a})}}(i=>{class e{static{u(this,"Builder")}_joints;_translations;_rotations;_scales;_blendShapes;_blendShapeWeights;setJoints(n){return this._joints=n,this}setTranslations(n){return this._translations=n,this}setRotations(n){return this._rotations=n,this}setScales(n){return this._scales=n,this}setBlendShapes(n){return this._blendShapes=n,this}setBlendShapeWeights(n){return this._blendShapeWeights=n,this}build(){return i.buildRetained(this._joints,this._translations,this._rotations,this._scales,this._blendShapes,this._blendShapeWeights)}}i.Builder=e})(H||(H={}));const qf=["joints","translations","rotations","scales","blendShapes","blendShapeWeights"];function jf(){const i=[];for(const e of qf)i.push(new oe.AttributeMapping(e,new Me(e)));return i}u(jf,"_GetPropertyMappings$3");let Qf;function Qa(){return Qf??=new oe.PropertyMappings(jf(),H.getDefaultLocator())}u(Qa,"_GetMappings$3");class Ui extends yn{static{u(this,"UsdSkelImagingDataSourceAnimationPrim")}constructor(e,t,n){super(e,t,n)}static new(e,t,n){return new Ui(e,t,n)}getNames(){const e=super.getNames();return e.push(H.getSchemaToken()),e}Get(e){return e===H.getSchemaToken()?oe.new(this._getUsdPrim(),this._getSceneIndexPath(),Qa(),this._getStageGlobals()):super.Get(e)}static invalidate(e,t,n,r){const s=oe.invalidate(n,Qa());return s.insert(Ri.invalidate(e,t,n,r)),s}}const tt=Le({points:"points",normals:"normals"}),ke=Le({skeleton:"skeleton",skelAnimation:"skelAnimation",skelBlendShape:"skelBlendShape"}),nt=Le({pointsAggregatorComputation:"skinningPointsInputAggregatorComputation",pointsComputation:"skinningPointsComputation",normalsAggregatorComputation:"skinningNormalsInputAggregatorComputation",normalsComputation:"skinningNormalsComputation"}),wt=Le({restPoints:"restPoints",geomBindXform:"geomBindXform",influences:"influences",numInfluencesPerComponent:"numInfluencesPerComponent",hasConstantInfluences:"hasConstantInfluences",blendShapeOffsets:"blendShapeOffsets",blendShapeOffsetRanges:"blendShapeOffsetRanges",numBlendShapeOffsetRanges:"numBlendShapeOffsetRanges",restNormals:"restNormals",faceVertexIndices:"faceVertexIndices",hasFaceVaryingNormals:"hasFaceVaryingNormals"}),_t=Le({blendShapeWeights:"blendShapeWeights",skinningXforms:"skinningXforms",skinningScaleXforms:"skinningScaleXforms",skinningDualQuats:"skinningDualQuats",skelLocalToCommonSpace:"skelLocalToWorld",commonSpaceToPrimLocal:"primWorldToLocal"}),pc=Le({skelLocalToWorld:"skelLocalToWorld",primWorldToLocal:"primWorldToLocal"}),At=Le({skinnedPoints:"skinnedPoints",skinnedNormals:"skinnedNormals"});class Yf extends wn{static{u(this,"UsdSkelImagingAnimationAdapter")}getImagingSubprims(e){return[""]}getImagingSubprimType(e,t){return t!==""?"":ke.skelAnimation}getImagingSubprimData(e,t,n){if(t==="")return Ui.new(e.path,e,n)}invalidateImagingSubprim(e,t,n,r){return t!==""?new N:Ui.invalidate(e,t,n,r)}}const M=Le({skelBinding:"skelBinding",animationSource:"animationSource",skeleton:"skeleton",joints:"joints",blendShapes:"blendShapes",blendShapeTargets:"blendShapeTargets",hasSkelRoot:"hasSkelRoot",skinningMethodPrimvar:"skel:skinningMethod",geomBindTransformPrimvar:"skel:geomBindTransform",jointIndicesPrimvar:"skel:jointIndices",jointWeightsPrimvar:"skel:jointWeights"});class E extends Pn{static{u(this,"UsdSkelImagingBindingSchema")}constructor(e){super(e)}static getFromParent(e){const t=e?.Get(M.skelBinding);return new E(t instanceof ce?t:void 0)}getAnimationSource(){return this._getTypedDataSource(M.animationSource)}getSkeleton(){return this._getTypedDataSource(M.skeleton)}getJoints(){return this._getTypedDataSource(M.joints)}getBlendShapes(){return this._getTypedDataSource(M.blendShapes)}getBlendShapeTargets(){return this._getTypedDataSource(M.blendShapeTargets)}getHasSkelRoot(){return this._getTypedDataSource(M.hasSkelRoot)}static getSchemaToken(){return M.skelBinding}static _defaultLocator;static getDefaultLocator(){return E._defaultLocator??=new Me(E.getSchemaToken())}static _animationSourceLocator;static getAnimationSourceLocator(){return E._animationSourceLocator??=E.getDefaultLocator().append(M.animationSource)}static _skeletonLocator;static getSkeletonLocator(){return E._skeletonLocator??=E.getDefaultLocator().append(M.skeleton)}static _jointsLocator;static getJointsLocator(){return E._jointsLocator??=E.getDefaultLocator().append(M.joints)}static _blendShapesLocator;static getBlendShapesLocator(){return E._blendShapesLocator??=E.getDefaultLocator().append(M.blendShapes)}static _blendShapeTargetsLocator;static getBlendShapeTargetsLocator(){return E._blendShapeTargetsLocator??=E.getDefaultLocator().append(M.blendShapeTargets)}static _hasSkelRootLocator;static getHasSkelRootLocator(){return E._hasSkelRootLocator??=E.getDefaultLocator().append(M.hasSkelRoot)}static buildRetained(e,t,n,r,s,a){return Tn({[M.animationSource]:e,[M.skeleton]:t,[M.joints]:n,[M.blendShapes]:r,[M.blendShapeTargets]:s,[M.hasSkelRoot]:a})}}(i=>{class e{static{u(this,"Builder")}_animationSource;_skeleton;_joints;_blendShapes;_blendShapeTargets;_hasSkelRoot;setAnimationSource(n){return this._animationSource=n,this}setSkeleton(n){return this._skeleton=n,this}setJoints(n){return this._joints=n,this}setBlendShapes(n){return this._blendShapes=n,this}setBlendShapeTargets(n){return this._blendShapeTargets=n,this}setHasSkelRoot(n){return this._hasSkelRoot=n,this}build(){return i.buildRetained(this._animationSource,this._skeleton,this._joints,this._blendShapes,this._blendShapeTargets,this._hasSkelRoot)}}i.Builder=e})(E||(E={}));const Ya=vn.declare("SdfPath"),Kf="skel:joints",Jf="skel:blendShapes";function Zf(i,e,t,n){const r=new ol(i);if(r.hasAuthoredValue())return Ho(r,e,t,n)}u(Zf,"_AuthoredAttributeDataSourceFactory");function eh(i){return i.getMetadata("targetPaths")!==void 0}u(eh,"_HasAuthoredTargets");function Ka(i,e,t,n){if(!eh(i))return;const r=i.getForwardedTargets();return r.length===0?new J("",Ya):new J(r[0],Ya)}u(Ka,"_PathFromRelationshipDataSourceFactory");function th(){return[new oe.RelationshipMapping(Ie.skelAnimationSource,new Me(M.animationSource),Ka),new oe.RelationshipMapping(Ie.skelSkeleton,new Me(M.skeleton),Ka),new oe.AttributeMapping(Kf,new Me(M.joints),Zf),new oe.AttributeMapping(Jf,new Me(M.blendShapes)),new oe.RelationshipMapping(Ie.skelBlendShapeTargets,new Me(M.blendShapeTargets),oe.getPathArrayFromRelationshipDataSourceFactory())]}u(th,"_GetPropertyMappings$2");let nh;function Ja(){return nh??=new oe.PropertyMappings(th(),E.getDefaultLocator())}u(Ja,"_GetMappings$2");class Vi extends ce{static{u(this,"UsdSkelImagingDataSourceBindingAPI")}constructor(e,t,n){super(),this._sceneIndexPath=e,this._usdPrim=t,this._stageGlobals=n}static new(e,t,n){return new Vi(e,t,n)}getNames(){return[E.getSchemaToken()]}Get(e){if(e===E.getSchemaToken())return oe.new(this._usdPrim,this._sceneIndexPath,Ja(),this._stageGlobals)}static invalidate(e,t,n,r){return oe.invalidate(n,Ja())}}class ih extends Wl{static{u(this,"UsdSkelImagingBindingAPIAdapter")}getImagingSubprimData(e,t,n,r){if(!(t!==""||n!==""))return Vi.new(e.path,e,r)}invalidateImagingSubprim(e,t,n,r,s){return t!==""||n!==""?new N:Vi.invalidate(e,t,r,s)}}const Ze=Le({weight:"weight",offsets:"offsets",normalOffsets:"normalOffsets"});class is extends Pn{static{u(this,"UsdSkelImagingInbetweenShapeSchema")}constructor(e){super(e)}getWeight(){return this._getTypedDataSource(Ze.weight)}getOffsets(){return this._getTypedDataSource(Ze.offsets)}getNormalOffsets(){return this._getTypedDataSource(Ze.normalOffsets)}static buildRetained(e,t,n){return Tn({[Ze.weight]:e,[Ze.offsets]:t,[Ze.normalOffsets]:n})}}(i=>{class e{static{u(this,"Builder")}_weight;_offsets;_normalOffsets;setWeight(n){return this._weight=n,this}setOffsets(n){return this._offsets=n,this}setNormalOffsets(n){return this._normalOffsets=n,this}build(){return i.buildRetained(this._weight,this._offsets,this._normalOffsets)}}i.Builder=e})(is||(is={}));const Pe=Le({skelBlendShape:"skelBlendShape",offsets:"offsets",normalOffsets:"normalOffsets",pointIndices:"pointIndices",inbetweenShapes:"inbetweenShapes"});class rh extends ru{static{u(this,"UsdSkelImagingInbetweenShapeContainerSchema")}constructor(e){super(e,is)}}class re extends Pn{static{u(this,"UsdSkelImagingBlendShapeSchema")}constructor(e){super(e)}static getFromParent(e){const t=e?.Get(Pe.skelBlendShape);return new re(t instanceof ce?t:void 0)}getOffsets(){return this._getTypedDataSource(Pe.offsets)}getNormalOffsets(){return this._getTypedDataSource(Pe.normalOffsets)}getPointIndices(){return this._getTypedDataSource(Pe.pointIndices)}getInbetweenShapes(){return new rh(this._getContainerDataSource(Pe.inbetweenShapes))}static getSchemaToken(){return Pe.skelBlendShape}static _defaultLocator;static getDefaultLocator(){return re._defaultLocator??=new Me(re.getSchemaToken())}static _offsetsLocator;static getOffsetsLocator(){return re._offsetsLocator??=re.getDefaultLocator().append(Pe.offsets)}static _normalOffsetsLocator;static getNormalOffsetsLocator(){return re._normalOffsetsLocator??=re.getDefaultLocator().append(Pe.normalOffsets)}static _pointIndicesLocator;static getPointIndicesLocator(){return re._pointIndicesLocator??=re.getDefaultLocator().append(Pe.pointIndices)}static _inbetweenShapesLocator;static getInbetweenShapesLocator(){return re._inbetweenShapesLocator??=re.getDefaultLocator().append(Pe.inbetweenShapes)}static buildRetained(e,t,n,r){return Tn({[Pe.offsets]:e,[Pe.normalOffsets]:t,[Pe.pointIndices]:n,[Pe.inbetweenShapes]:r})}}(i=>{class e{static{u(this,"Builder")}_offsets;_normalOffsets;_pointIndices;_inbetweenShapes;setOffsets(n){return this._offsets=n,this}setNormalOffsets(n){return this._normalOffsets=n,this}setPointIndices(n){return this._pointIndices=n,this}setInbetweenShapes(n){return this._inbetweenShapes=n,this}build(){return i.buildRetained(this._offsets,this._normalOffsets,this._pointIndices,this._inbetweenShapes)}}i.Builder=e})(re||(re={}));const sh={inbetweens:"inbetweens"},Wi="inbetweens:",mc=":normalOffsets";function gc(i){return i.startsWith(Wi)&&!i.endsWith(mc)}u(gc,"_IsValidInbetweenName");class _c{static{u(this,"_UsdSkelInbetweenShape")}constructor(e){this._attr=e}getWeight(){const e=this._attr.getMetadata("weight");return typeof e=="number"?e:void 0}getAttr(){return this._attr}getNormalOffsetsAttr(){const t=this._attr.getStage().getPrim(this._attr.primPath)?.getAttr(this._attr.name+mc);return t&&!t.isRelationship&&t.isValid()?t:void 0}}function ah(i,e){let t=e.startsWith(Wi)?e:Wi+e;if(gc(t)||(t=""),t==="")return;const n=i.getAttr(t);if(!(!n||n.isRelationship||!n.isValid()))return new _c(n)}u(ah,"_GetInbetween");function oh(i){const e=[];for(const t of i.getAuthoredPropertyNames(n=>n.startsWith(Wi))){const n=i.getAttr(t);n&&!n.isRelationship&&n.isValid()&&gc(t)&&e.push(new _c(n))}return e}u(oh,"_GetAuthoredInbetweens");const ch=["offsets","normalOffsets","pointIndices"];function lh(){const i=[];for(const e of ch)i.push(new oe.AttributeMapping(e,new Me(e)));return i}u(lh,"_GetPropertyMappings$1");let uh;function Za(){return uh??=new oe.PropertyMappings(lh(),re.getDefaultLocator())}u(Za,"_GetMappings$1");class gs extends ce{static{u(this,"_InbetweenShapeSchemaDataSource")}constructor(e,t){super(),this._inbetweenShape=e,this._stageGlobals=t}static new(e,t){return new gs(e,t)}getNames(){return[...Ze.allTokens]}Get(e){if(e===Ze.weight){const t=this._inbetweenShape.getWeight();return t===void 0?void 0:J.new(t)}if(e===Ze.offsets)return ta.new(this._inbetweenShape.getAttr(),this._stageGlobals);if(e===Ze.normalOffsets){const t=this._inbetweenShape.getNormalOffsetsAttr();return t?ta.new(t,this._stageGlobals):void 0}}}class gn extends ce{static{u(this,"_InbetweenShapeContainerSchemaDataSource")}constructor(e,t){super(),this._blendShape=e,this._stageGlobals=t}static new(e,t){return new gn(e,t)}getNames(){const e=[];for(const t of oh(this._blendShape)){const n=gn._getInbetweenName(t.getAttr().name);n!==void 0&&e.push(n)}return e}Get(e){const t=ah(this._blendShape,e);if(t)return gs.new(t,this._stageGlobals)}static invalidate(e){const t=new N;for(const n of e){const r=gn._getInbetweenName(n);r!==void 0&&t.insert(re.getInbetweenShapesLocator().append(r))}return t}static _getInbetweenName(e){const[t,n]=cl.stripPrefixNamespace(e,sh.inbetweens);if(n)return t}}class zi extends yn{static{u(this,"UsdSkelImagingDataSourceBlendShapePrim")}constructor(e,t,n){super(e,t,n)}static new(e,t,n){return new zi(e,t,n)}getNames(){const e=super.getNames();return e.push(re.getSchemaToken()),e}Get(e){return e===re.getSchemaToken()?kn.new(rt.new([Pe.inbetweenShapes],[gn.new(this._getUsdPrim(),this._getStageGlobals())]),oe.new(this._getUsdPrim(),this._getSceneIndexPath(),Za(),this._getStageGlobals())):super.Get(e)}static invalidate(e,t,n,r){const s=Ri.invalidate(e,t,n,r);return s.insert(oe.invalidate(n,Za())),s.insert(gn.invalidate(n)),s}}class dh extends wn{static{u(this,"UsdSkelImagingBlendShapeAdapter")}getImagingSubprims(e){return[""]}getImagingSubprimType(e,t){return t!==""?"":ke.skelBlendShape}getImagingSubprimData(e,t,n){if(t==="")return zi.new(e.path,e,n)}invalidateImagingSubprim(e,t,n,r){return t!==""?new N:zi.invalidate(e,t,n,r)}}let eo;class fh extends wn{static{u(this,"UsdSkelImagingSkelRootAdapter")}getImagingSubprims(e){return[""]}getImagingSubprimType(e,t){return""}getImagingSubprimData(e,t,n){if(t==="")return eo??=rt.new([E.getSchemaToken()],[rt.new([M.hasSkelRoot],[J.new(!0)])]),kn.new(yn.new(e.path,e,n),eo)}invalidateImagingSubprim(e,t,n,r){return t!==""?new N:yn.invalidate(e,t,n,r)}}const $e=Le({skeleton:"skeleton",joints:"joints",jointNames:"jointNames",bindTransforms:"bindTransforms",restTransforms:"restTransforms"});class Q extends Pn{static{u(this,"UsdSkelImagingSkeletonSchema")}constructor(e){super(e)}static getFromParent(e){const t=e?.Get($e.skeleton);return new Q(t instanceof ce?t:void 0)}getJoints(){return this._getTypedDataSource($e.joints)}getJointNames(){return this._getTypedDataSource($e.jointNames)}getBindTransforms(){return this._getTypedDataSource($e.bindTransforms)}getRestTransforms(){return this._getTypedDataSource($e.restTransforms)}static getSchemaToken(){return $e.skeleton}static _defaultLocator;static getDefaultLocator(){return Q._defaultLocator??=new Me(Q.getSchemaToken())}static _jointsLocator;static getJointsLocator(){return Q._jointsLocator??=Q.getDefaultLocator().append($e.joints)}static _jointNamesLocator;static getJointNamesLocator(){return Q._jointNamesLocator??=Q.getDefaultLocator().append($e.jointNames)}static _bindTransformsLocator;static getBindTransformsLocator(){return Q._bindTransformsLocator??=Q.getDefaultLocator().append($e.bindTransforms)}static _restTransformsLocator;static getRestTransformsLocator(){return Q._restTransformsLocator??=Q.getDefaultLocator().append($e.restTransforms)}static buildRetained(e,t,n,r){return Tn({[$e.joints]:e,[$e.jointNames]:t,[$e.bindTransforms]:n,[$e.restTransforms]:r})}}(i=>{class e{static{u(this,"Builder")}_joints;_jointNames;_bindTransforms;_restTransforms;setJoints(n){return this._joints=n,this}setJointNames(n){return this._jointNames=n,this}setBindTransforms(n){return this._bindTransforms=n,this}setRestTransforms(n){return this._restTransforms=n,this}build(){return i.buildRetained(this._joints,this._jointNames,this._bindTransforms,this._restTransforms)}}i.Builder=e})(Q||(Q={}));const hh=["joints","jointNames","bindTransforms","restTransforms"];function ph(){const i=[];for(const e of hh)i.push(new oe.AttributeMapping(e,new Me(e)));return i}u(ph,"_GetPropertyMappings");let mh;function to(){return mh??=new oe.PropertyMappings(ph(),Q.getDefaultLocator())}u(to,"_GetMappings");function gh(i,e){e.includes(i)||e.push(i)}u(gh,"_AddIfNecessary$1");let no;class Xi extends Ri{static{u(this,"UsdSkelImagingDataSourceSkeletonPrim")}constructor(e,t,n){super(e,t,n)}static new(e,t,n){return new Xi(e,t,n)}getNames(){const e=super.getNames();return e.push(Q.getSchemaToken()),gh(cr.getSchemaToken(),e),e}Get(e){if(e===Q.getSchemaToken())return oe.new(this._getUsdPrim(),this._getSceneIndexPath(),to(),this._getStageGlobals());const t=super.Get(e);return e===cr.getSchemaToken()?(no??=new cr.Builder().setPurpose(J.new(su.guide)).build(),kn.overlayedContainerDataSources(t instanceof ce?t:void 0,no)):t}static invalidate(e,t,n,r){const s=oe.invalidate(n,to());return s.insert(Ri.invalidate(e,t,n,r)),s}}class _h extends wn{static{u(this,"UsdSkelImagingSkeletonAdapter")}getImagingSubprims(e){return[""]}getImagingSubprimType(e,t){return t!==""?"":ke.skeleton}getImagingSubprimData(e,t,n){if(t==="")return Xi.new(e.path,e,n)}invalidateImagingSubprim(e,t,n,r){return t!==""?new N:Xi.invalidate(e,t,n,r)}}Uo.registerTypes([{typeName:"UsdSkelImagingSkeletonAdapter",isInternal:!0,primTypeName:"Skeleton",primAdapterFactory:u(()=>new _h,"primAdapterFactory")},{typeName:"UsdSkelImagingSkelRootAdapter",isInternal:!0,primTypeName:"SkelRoot",includeDerivedPrimTypes:!0,primAdapterFactory:u(()=>new fh,"primAdapterFactory")},{typeName:"UsdSkelImagingAnimationAdapter",isInternal:!0,primTypeName:"SkelAnimation",primAdapterFactory:u(()=>new Yf,"primAdapterFactory")},{typeName:"UsdSkelImagingBindingAPIAdapter",isInternal:!0,apiSchemaName:"SkelBindingAPI",apiSchemaAdapterFactory:u(()=>new ih,"apiSchemaAdapterFactory")},{typeName:"UsdSkelImagingBlendShapeAdapter",isInternal:!0,primTypeName:"BlendShape",primAdapterFactory:u(()=>new dh,"primAdapterFactory")}]);class ei{static{u(this,"UsdSkelImagingSharedPtrThunk")}_data;Get(){return this._data!==void 0?this._data:(this._data=this._compute(),this._data)}invalidate(){this._data=void 0}}function er(i,e=0){if(i)return i.getTypedValue(e)}u(er,"UsdSkelImagingGetTypedValue");function ti(i){return i==null?[]:i instanceof ue?i.IsEmpty()?[]:ti(i.UncheckedGet()):i instanceof Y?i.toArray():Array.isArray(i)?i:ArrayBuffer.isView(i)?Array.from(i):[]}u(ti,"_UsdSkelImagingToArray");function R(i,e=0){if(!i)return[];const t=i;return ti(t.getTypedValue?t.getTypedValue(e):i.GetValue(e))}u(R,"_UsdSkelImagingGetArray");const bh={"shaders/skinning.glslfx":`-- glslfx version 0.1

//
// Copyright 2019 Pixar
//
// Licensed under the terms set forth in the LICENSE.txt file available at
// https://openusd.org/license.
//

-- configuration
{
    "techniques": {
        "default": {
            "skinPointsLBSKernel": {
                "source": [ "Compute.LBSHeader",
                            "Compute.SkinPointsLBS" ]
             },
            "skinPointsDQSKernel": {
                "source": [ "Compute.DQSHeader",
                            "Compute.QuaternionUtils",
                            "Compute.SkinPointsDQS" ]
             },
            "skinPointsSimpleKernel": {
                "source": [ "Compute.SkinPointsSimple" ]
             },
             "skinNormalsLBSKernel": {
                "source": [ "Compute.LBSHeader",
                            "Compute.NormalUtils",
                            "Compute.SkinNormalsLBS" ]
             },
             "skinNormalsDQSKernel": {
                "source": [ "Compute.DQSHeader",
                            "Compute.NormalUtils",
                            "Compute.QuaternionUtils",
                            "Compute.SkinNormalsDQS" ]
             }
        }
    }
}

-- glsl Compute.LBSHeader

const float EPS = 1e-5;

-- glsl Compute.DQSHeader

const float EPS = 1e-5;
const float NORM_EPS = 1e-10;

-- glsl Compute.NormalUtils

int GetPointIndex(int index)
{
    if (HdGet_hasFaceVaryingNormals()) {
        return HdGet_faceVertexIndices(index);
    } else {
        return index;
    }
}

-- glsl Compute.QuaternionUtils

vec4 GetPivotQuaternion(int numInfluencesPerComponent, int offset)
{
    vec4 pivotQuat = vec4(0);
    int pivotIdx = -1;
    float maxw = -1;
    for (int i = 0; i < numInfluencesPerComponent; i++) {
        vec2 influence = HdGet_influences(offset + i);
        float jointWeight = influence.y;
        if (pivotIdx < 0 || maxw < jointWeight) {
            int jointIdx = int( influence.x );
            maxw = jointWeight;
            pivotIdx = jointIdx;
        }
    }
    if (pivotIdx >= 0)
        pivotQuat = HdGet_skinningDualQuats(pivotIdx*2);

    return pivotQuat;
}

vec3 TransformByQuaternion(vec4 quat, vec3 vec)
{
    // See GfQuat::Transform() for algorithm

    float r1 = quat.w;
    vec3  i1 = quat.xyz;

    vec3  i2 = vec3(r1 * vec[0] + (i1[1] * vec[2] - i1[2] * vec[1]),
                    r1 * vec[1] + (i1[2] * vec[0] - i1[0] * vec[2]),
                    r1 * vec[2] + (i1[0] * vec[1] - i1[1] * vec[0]));

    return vec3(vec[0] + 2.0 * (i1[1] * i2[2] - i1[2] * i2[1]),
                vec[1] + 2.0 * (i1[2] * i2[0] - i1[0] * i2[2]),
                vec[2] + 2.0 * (i1[0] * i2[1] - i1[1] * i2[0]));
}

vec3 GetDualQuaternionTranslation(vec4 real, vec4 dual)
{
    // See GfDualQuat::GetTranslation() for algorithm

    float scale = -2.0;

    float rw = real.w;
    vec3  ri = real.xyz;

    float dw = dual.w;
    vec3  di = dual.xyz;

    return vec3( (dw*ri[0] - rw*di[0] + di[1]*ri[2] - di[2]*ri[1])*scale,
                 (dw*ri[1] - rw*di[1] + di[2]*ri[0] - di[0]*ri[2])*scale,
                 (dw*ri[2] - rw*di[2] + di[0]*ri[1] - di[1]*ri[0])*scale );
}

-- glsl Compute.SkinPointsLBS

void compute(int index)
{
    vec3 restP = HdGet_restPoints(index);

    // apply blend shapes
    int numBlendShapeOffsetRanges = HdGet_numBlendShapeOffsetRanges();
    if (index < numBlendShapeOffsetRanges) {
        ivec2 blendShapeOffsetRange = HdGet_blendShapeOffsetRanges(index);
        for (int i = blendShapeOffsetRange.x; i < blendShapeOffsetRange.y; ++i) {
            vec4 offset = HdGet_blendShapeOffsets(i);
            int shapeIndex = int(offset.w);
            float weight = HdGet_blendShapeWeights(shapeIndex);
            restP += offset.xyz * weight;
        }
    }

    int numInfluencesPerComponent = HdGet_numInfluencesPerComponent();
    vec3 p;
    if (numInfluencesPerComponent > 0) {
        // model space -> bind space
        mat4 geomBindXform = HdGet_geomBindXform();
        vec4 initP = geomBindXform * vec4(restP, 1);

        p = vec3(0,0,0);

        bool constantPointInfluence = HdGet_hasConstantInfluences();
        int offset = constantPointInfluence? 0 : numInfluencesPerComponent*index;

        for (int i = 0; i < numInfluencesPerComponent; i++) {
            vec2 influence = HdGet_influences(offset + i);
            float jointWeight = influence.y;

            if (jointWeight > EPS) {
                int jointIdx = int( influence.x );
                mat4 skinningXform = HdGet_skinningXforms(jointIdx);

                p += ((skinningXform * initP) * jointWeight).xyz;
            }
        }

        // skel space -> world space -> model space
        // XXX: Casts to mat4 below are necessary because the matrices passed
        // down use doubles and not floats.
        mat4 skelToPrimLocal = mat4( HdGet_primWorldToLocal() ) *
                               mat4( HdGet_skelLocalToWorld() );
        p = (skelToPrimLocal * vec4(p,1)).xyz;
    } else {
        p = restP;
    }

    HdSet_skinnedPoints(index, p);
}


-- glsl Compute.SkinPointsDQS

void compute(int index)
{
    vec3 restP = HdGet_restPoints(index);

    // apply blend shapes
    int numBlendShapeOffsetRanges = HdGet_numBlendShapeOffsetRanges();
    if (index < numBlendShapeOffsetRanges) {
        ivec2 blendShapeOffsetRange = HdGet_blendShapeOffsetRanges(index);
        for (int i = blendShapeOffsetRange.x; i < blendShapeOffsetRange.y; ++i) {
            vec4 offset = HdGet_blendShapeOffsets(i);
            int shapeIndex = int(offset.w);
            float weight = HdGet_blendShapeWeights(shapeIndex);
            restP += offset.xyz * weight;
        }
    }

    int numInfluencesPerComponent = HdGet_numInfluencesPerComponent();
    vec3 p;
    if (numInfluencesPerComponent > 0) {
        // model space -> bind space
        mat4 geomBindXform = HdGet_geomBindXform();
        vec3 initP = (geomBindXform * vec4(restP, 1)).xyz;

#ifdef HD_HAS_skinningScaleXforms
        vec3 scaledP = vec3(0, 0, 0);
#endif

        bool constantPointInfluence = HdGet_hasConstantInfluences();
        int offset = constantPointInfluence ? 0 : numInfluencesPerComponent*index;

        // find the pivot quaternion
        vec4 pivotQuat = GetPivotQuaternion(numInfluencesPerComponent, offset);

        // find the weighted sum dual quaternion
        vec4 weightedSumDQReal = vec4(0);
        vec4 weightedSumDQDual = vec4(0);

        for (int i = 0; i < numInfluencesPerComponent; i++) {
            vec2 influence = HdGet_influences(offset + i);
            float jointWeight = influence.y;

            if (jointWeight > EPS) {
                int jointIdx = int(influence.x);

#ifdef HD_HAS_skinningScaleXforms
                // Apply scale using LBS, if any of the skinning xforms has scales
                mat3 scaleXform = HdGet_skinningScaleXforms(jointIdx);
                scaledP += ((scaleXform * initP) * jointWeight);
#endif

                // Apply rotation & translation using DQS
                vec4 skinningDQReal = HdGet_skinningDualQuats(jointIdx*2);
                vec4 skinningDQDual = HdGet_skinningDualQuats(jointIdx*2+1);
                // Flip the dual quaternion, if necessary, to make it
                // on the same hemisphere as the pivotQuat.
                if (dot(skinningDQReal, pivotQuat) < 0.0)
                   jointWeight = -jointWeight;

                weightedSumDQReal += (skinningDQReal * jointWeight);
                weightedSumDQDual += (skinningDQDual * jointWeight);
            }
        }

        // normalize weightedSumDQ
        float realLength = length(weightedSumDQReal);
        if (realLength < NORM_EPS) {
            weightedSumDQReal = vec4(0, 0, 0, 1);  // identity quaternion
            weightedSumDQDual = vec4(0);           // zero quaternion
        } else {
            float inverseRealLength = 1.0 / realLength;
            // rotation normalization
            weightedSumDQReal *= inverseRealLength;
            weightedSumDQDual *= inverseRealLength;
            // plucker normalization
            weightedSumDQDual -= (dot(weightedSumDQReal, weightedSumDQDual) * weightedSumDQReal);
        }

#ifdef HD_HAS_skinningScaleXforms
        // transform scaledP by weightedSumDQ
        p = TransformByQuaternion(weightedSumDQReal, scaledP)
            + GetDualQuaternionTranslation(weightedSumDQReal, weightedSumDQDual);
#else
        // transform initP by weightedSumDQ
        p = TransformByQuaternion(weightedSumDQReal, initP)
            + GetDualQuaternionTranslation(weightedSumDQReal, weightedSumDQDual);
#endif

        // skel space -> world space -> model space
        // XXX: Casts to mat4 below are necessary because the matrices passed
        // down use doubles and not floats.
        mat4 skelToPrimLocal = mat4(HdGet_primWorldToLocal()) *
                               mat4(HdGet_skelLocalToWorld());
        p = (skelToPrimLocal * vec4(p,1)).xyz;
    } else {
        p = restP;
    }

    HdSet_skinnedPoints(index, p);
}


-- glsl Compute.SkinPointsSimple

void compute(int index)
{
    // This is simple joint-constraint skinning model.

    mat4 geomBindXform = HdGet_geomBindXform();
    int jointIndex = int( HdGet_influences(index).x );
    mat4 skinningXform = HdGet_skinningXforms(jointIndex);
    
    // model space -> bind space -> skel space
    vec4 p = skinningXform * geomBindXform * vec4(HdGet_restPoints(index), 1);
    
    // skel space -> world space -> model space
    // XXX: Casts to mat4 below are necessary because the matrices passed
    // down use doubles and not floats.
    mat4 skelToPrimLocal = mat4( HdGet_primWorldToLocal() ) *
                           mat4( HdGet_skelLocalToWorld() );
    p = skelToPrimLocal * p;

    HdSet_skinnedPoints(index, p.xyz);
}


-- glsl Compute.SkinNormalsLBS

void compute(int index)
{
    vec3 restN = HdGet_restNormals(index);

    int numInfluencesPerComponent = HdGet_numInfluencesPerComponent();
    vec3 n;
    if (numInfluencesPerComponent > 0) {
        // model space -> bind space
        mat4 geomBindXform = HdGet_geomBindXform();
        mat4 geomBindXformInverseTranspose =
            transpose(inverse(geomBindXform));
        vec4 initN = geomBindXformInverseTranspose * vec4(restN, 0);

        n = vec3(0,0,0);

        bool constantPointInfluence = HdGet_hasConstantInfluences();
        int pointIndex = GetPointIndex(index);
        int offset =
            constantPointInfluence ? 0 : numInfluencesPerComponent*pointIndex;

        for (int i = 0; i < numInfluencesPerComponent; i++) {
            vec2 influence = HdGet_influences(offset + i);
            float jointWeight = influence.y;

            if (jointWeight > EPS) {
                int jointIdx = int( influence.x );
                mat4 skinningXform = HdGet_skinningXforms(jointIdx);
                mat4 skinningXformInverseTranspose =
                    transpose(inverse(skinningXform));

                n += (skinningXformInverseTranspose * initN * jointWeight).xyz;
            }
        }

        // skel space -> world space -> model space
        // XXX: Casts to mat4 below are necessary because the matrices passed
        // down use doubles and not floats.
        mat4 skelToPrimLocal = mat4( HdGet_primWorldToLocal() ) *
                               mat4( HdGet_skelLocalToWorld() );
        mat4 skelToPrimLocalInverseTranspose =
            transpose(inverse(skelToPrimLocal));
        n = (skelToPrimLocalInverseTranspose * vec4(n, 0)).xyz;
    } else {
        n = restN;
    }

    HdSet_skinnedNormals(index, n);
}


-- glsl Compute.SkinNormalsDQS

void compute(int index)
{
    // NOTE: skinningXforms and Dual Quats has already been inverted and
    // transposed on the CPU.

    vec3 restN = HdGet_restNormals(index);

    int numInfluencesPerComponent = HdGet_numInfluencesPerComponent();
    vec3 n;
    if (numInfluencesPerComponent > 0) {
        // model space -> bind space
        mat4 geomBindXform = HdGet_geomBindXform();
        mat4 geomBindXformInverseTranspose =
            transpose(inverse(geomBindXform));
        vec3 initN = (geomBindXformInverseTranspose * vec4(restN, 0)).xyz;

#ifdef HD_HAS_skinningScaleXforms
        vec3 scaledN = vec3(0, 0, 0);
#endif

        bool constantPointInfluence = HdGet_hasConstantInfluences();
        int pointIndex = GetPointIndex(index);
        int offset =
            constantPointInfluence ? 0 : numInfluencesPerComponent*pointIndex;

        // find the pivot quaternion
        vec4 pivotQuat = GetPivotQuaternion(numInfluencesPerComponent, offset);

        // find the weighted sum dual quaternion
        vec4 weightedSumDQReal = vec4(0);
        vec4 weightedSumDQDual = vec4(0);

        for (int i = 0; i < numInfluencesPerComponent; i++) {
            vec2 influence = HdGet_influences(offset + i);
            float jointWeight = influence.y;

            if (jointWeight > EPS) {
                int jointIdx = int(influence.x);

#ifdef HD_HAS_skinningScaleXforms
                // Apply scale using LBS, if any of the skinning xforms has
                // scales
                mat3 scaleXform = HdGet_skinningScaleXforms(jointIdx);
                scaledN += ((scaleXform * initN) * jointWeight);
#endif

                // Apply rotation & translation using DQS
                vec4 skinningDQReal = HdGet_skinningDualQuats(jointIdx*2);
                vec4 skinningDQDual = HdGet_skinningDualQuats(jointIdx*2+1);
                // Flip the dual quaternion, if necessary, to make it
                // on the same hemisphere as the pivotQuat.
                if (dot(skinningDQReal, pivotQuat) < 0.0)
                   jointWeight = -jointWeight;

                weightedSumDQReal += (skinningDQReal * jointWeight);
                weightedSumDQDual += (skinningDQDual * jointWeight);
            }
        }

        // normalize weightedSumDQ
        float realLength = length(weightedSumDQReal);
        if (realLength < NORM_EPS) {
            weightedSumDQReal = vec4(0, 0, 0, 1);  // identity quaternion
            weightedSumDQDual = vec4(0);           // zero quaternion
        } else {
            float inverseRealLength = 1.0 / realLength;
            // rotation normalization
            weightedSumDQReal *= inverseRealLength;
            weightedSumDQDual *= inverseRealLength;
            // plucker normalization
            weightedSumDQDual -=
                dot(weightedSumDQReal, weightedSumDQDual) * weightedSumDQReal;
        }

#ifdef HD_HAS_skinningScaleXforms
        // transform scaledN by weightedSumDQ
        n = TransformByQuaternion(weightedSumDQReal, scaledN)
            + GetDualQuaternionTranslation(
                weightedSumDQReal,
                weightedSumDQDual);
#else
        // transform initP by weightedSumDQ
        n = TransformByQuaternion(weightedSumDQReal, initN)
            + GetDualQuaternionTranslation(
                weightedSumDQReal,
                weightedSumDQDual);
#endif

        // skel space -> world space -> model space
        // XXX: Casts to mat4 below are necessary because the matrices passed
        // down use doubles and not floats.
        mat4 skelToPrimLocal = mat4(HdGet_primWorldToLocal()) *
                               mat4(HdGet_skelLocalToWorld());
        mat4 skelToPrimLocalInverseTranspose =
            transpose(inverse(skelToPrimLocal));
        n = (skelToPrimLocalInverseTranspose * vec4(n, 0)).xyz;
    } else {
        n = restN;
    }

    HdSet_skinnedNormals(index, n);
}
`},Sh={Plugins:[{Info:{},LibraryPath:"@PLUG_INFO_LIBRARY_PATH@",Name:"usdSkelImaging",ResourcePath:"/usd/usdSkelImaging/resources",Root:"@PLUG_INFO_ROOT@",Type:"library"}]};function yh(){Kn.GetInstance().RegisterPlugins(Sh,{usdSkelImaging:bh})}u(yh,"UsdSkelImaging_RegisterShaderResources");function xh(){return yh(),Kn.GetInstance().GetPluginWithName("usdSkelImaging")}u(xh,"_ThisPlugin");function vh(i){const e=xh(),t=Ro(e,Mo("shaders",i));return t.length===0&&Ce.GetInstance().postError(new st(`Failed verification: ' !path.empty() ' -- Could not find shader: ${i}
`,at.CodingError)),No(t)}u(vh,"_GetShaderPath");let wh;function Ph(){return wh??=vh("skinning.glslfx")}u(Ph,"UsdSkelImagingPackageSkinningShader");function _s(i){Ce.GetInstance().postWarning(i)}u(_s,"TF_WARN$3");function rs(i){Ce.GetInstance().postError(new st(i,at.CodingError))}u(rs,"TF_CODING_ERROR$4");const hi={skinPointsLBSKernel:"skinPointsLBSKernel",skinPointsDQSKernel:"skinPointsDQSKernel",skinNormalsLBSKernel:"skinNormalsLBSKernel",skinNormalsDQSKernel:"skinNormalsDQSKernel"},Th=new ds("USDSKELIMAGING_FORCE_CPU_COMPUTE",!1,"Use Hydra ExtCPU computations for skinning."),kh=new ds("USDSKELIMAGING_ENABLE_NORMAL_COMPUTATIONS",!1,"Enable skinning computations for authored normals.");function se(i){return i instanceof ue?i.IsEmpty()?void 0:i.UncheckedGet():i}u(se,"_Get");function et(i,e,t){return i instanceof Y?i.getElementType().getTypeName()===e:e==="float"&&i instanceof Float32Array||e==="int"&&i instanceof Int32Array?!0:Array.isArray(i)?i.every(n=>t?n instanceof t:typeof n=="number"):!1}u(et,"_IsHoldingArray");function On(i){return i instanceof Y?i.toArray():ArrayBuffer.isView(i)?Array.from(i):i}u(On,"_Elements");function an(i,e){if(i instanceof Y){const r=i.cdata();if(ArrayBuffer.isView(r))return r}if(ArrayBuffer.isView(i))return i;const t=On(i),n=new Float64Array(t.length*e);for(let r=0;r<t.length;++r){const s=t[r];if(typeof s=="number")n[r]=s;else for(let a=0;a<e;++a)n[r*e+a]=s.data[a]}return n}u(an,"_Scalars");function io(i){return Y._adopt($.GfVec3f,i)}u(io,"_AdoptVec3fArray");function Ih(i){const e=new Array(i.length/3);for(let t=0;t<e.length;++t)e[t]=new We(i[3*t],i[3*t+1],i[3*t+2]);return new Y(e,$.GfVec3f)}u(Ih,"_ToVec3fArray");function Ch(i){const e=new Float32Array(i.length*3);for(let t=0;t<i.length;++t){const n=i[t].data;e[3*t]=n[0],e[3*t+1]=n[1],e[3*t+2]=n[2]}return e}u(Ch,"_ToFlat");function qi(i){return[...i.GetArray()]}u(qi,"_Matrix4Array");function bs(i){const e=i.length/2,t=new Int32Array(e),n=new Float32Array(e);for(let r=0;r<e;++r)t[r]=Math.trunc(i[2*r]),n[r]=i[2*r+1];return{indices:t,weights:n}}u(bs,"_SplitInfluences");function ro(i,e){const t=e.GetArray(),n=t[0],r=t[1],s=t[2],a=t[3],o=t[4],c=t[5],l=t[6],d=t[7],f=t[8],h=t[9],p=t[10],m=t[11],g=t[12],_=t[13],b=t[14],y=t[15];for(let S=0,x=i.length;S<x;S+=3){const T=i[S],C=i[S+1],U=i[S+2],V=T*n+C*o+U*f+g,q=T*r+C*c+U*h+_,we=T*s+C*l+U*p+b,ve=T*a+C*d+U*m+y,v=ve!==0?1/ve:1;i[S]=v*V,i[S+1]=v*q,i[S+2]=v*we}}u(ro,"_TransformPoints");function so(i,e){const t=e.GetArray();for(let n=0;n<i.length/3;++n){const r=i[3*n],s=i[3*n+1],a=i[3*n+2];i[3*n]=r*t[0]+s*t[3]+a*t[6],i[3*n+1]=r*t[1]+s*t[4]+a*t[7],i[3*n+2]=r*t[2]+s*t[5]+a*t[8]}}u(so,"_TransformNormals");function Dh(i,e,t,n){const r=Math.min(e.length/2,n.length/3);for(let s=0;s<r;++s){let a=n[3*s],o=n[3*s+1],c=n[3*s+2];for(let l=e[2*s];l<e[2*s+1];++l){const d=Math.trunc(i[4*l+3]),f=Math.fround(t[d]);a=Math.fround(a+Math.fround(i[4*l]*f)),o=Math.fround(o+Math.fround(i[4*l+1]*f)),c=Math.fround(c+Math.fround(i[4*l+2]*f))}n[3*s]=a,n[3*s+1]=o,n[3*s+2]=c}}u(Dh,"_ApplyPackedBlendShapes");function bc(i,e,t,n){const{indices:r,weights:s}=bs(n),a=ul(i,qi(e),t.map(qi),r,s,"float");return a?new de(...a):void 0}u(bc,"_SkinTransform");function $h(i,e){const t=wt,n=_t,r=pc,s=se(e.getInputValue(t.restPoints)),a=se(e.getInputValue(t.geomBindXform)),o=se(e.getInputValue(t.influences)),c=se(e.getInputValue(t.numInfluencesPerComponent)),l=se(e.getInputValue(t.hasConstantInfluences)),d=se(e.getInputValue(r.primWorldToLocal)),f=se(e.getInputValue(t.blendShapeOffsets)),h=se(e.getInputValue(t.blendShapeOffsetRanges)),p=se(e.getInputValue(n.blendShapeWeights)),m=se(e.getInputValue(n.skinningXforms)),g=se(e.getInputValue(r.skelLocalToWorld));if(!et(s,"GfVec3f",We)||!(a instanceof de)||!et(o,"GfVec2f",bn)||typeof c!="number"||typeof l!="boolean"||!(d instanceof pe)||!et(f,"GfVec4f",be)||!et(h,"GfVec2i",Sn)||!et(p,"float")||!et(m,"GfMatrix4f",de)||!(g instanceof pe)){e.raiseComputationError();return}const _=Float32Array.from(an(s,3));Dh(an(f,4),an(h,2),an(p,1),_);const b=c;if(b<=0){e.setOutputValue(At.skinnedPoints,ue.createArray(io(_)));return}const y=On(m),S=an(o,2);if(l){const x=bc(i,a,y,S);if(x){const T=new pe(x).getMultiply(g).getMultiply(d);ro(_,T)}}else{const{indices:x,weights:T}=bs(S);ll(i,qi(a),y.map(qi),x,T,b,_,"float");const C=g.getMultiply(d);ro(_,C)}e.setOutputValue(At.skinnedPoints,ue.createArray(io(_)))}u($h,"_InvokeSkinningComputationPoints");function pi(i){return i.extractRotationMatrix().getInverse().getTranspose()}u(pi,"_InvTransposeRotation");function Bh(i,e,t,n,r,s,a,o,c,l){if(r){const d=bc(i,e,t,n);if(d){const f=new pe(d).getMultiply(o),h=pi(f);so(l,h)}}else{const d=pi(new pe(e)),f=t.map(g=>[...pi(new pe(g)).GetArray()]),{indices:h,weights:p}=bs(n);c?dl(i,[...d.GetArray()],f,h,p,s,a,l):fl(i,[...d.GetArray()],f,h,p,s,l);const m=pi(o);so(l,m)}}u(Bh,"_DeformNormalsWithSkinning");function Fh(i,e){const t=wt,n=_t,r=pc,s=se(e.getInputValue(t.restNormals)),a=se(e.getInputValue(t.geomBindXform)),o=se(e.getInputValue(t.influences)),c=se(e.getInputValue(t.numInfluencesPerComponent)),l=se(e.getInputValue(t.hasConstantInfluences)),d=se(e.getInputValue(r.primWorldToLocal)),f=se(e.getInputValue(n.skinningXforms)),h=se(e.getInputValue(r.skelLocalToWorld)),p=se(e.getInputValue(t.faceVertexIndices)),m=se(e.getInputValue(t.hasFaceVaryingNormals));if(!et(s,"GfVec3f",We)||!(a instanceof de)||!et(o,"GfVec2f",bn)||typeof c!="number"||typeof l!="boolean"||!(d instanceof pe)||!et(f,"GfMatrix4f",de)||!(h instanceof pe)||!et(p,"int")||typeof m!="boolean"){e.raiseComputationError();return}const g=On(s),_=c;if(_<=0){e.setOutputValue(At.skinnedNormals,ue.createArray(new Y(g,$.GfVec3f)));return}const b=Ch(g),y=h.getMultiply(d);Bh(i,a,On(f),an(o,2),l,_,On(p),y,m,b),e.setOutputValue(At.skinnedNormals,ue.createArray(Ih(b)))}u(Fh,"_InvokeSkinningComputationNormals");function Eh(i,e){const t=e.getOptionalInputValue(wt.restPoints),n=e.getOptionalInputValue(wt.restNormals);if(t===void 0&&n===void 0){rs("No rest points or normals provided"),e.raiseComputationError();return}t!==void 0?$h(i,e):Fh(i,e)}u(Eh,"UsdSkelImagingInvokeExtComputation");class Gh{static{u(this,"_SkinningComputationCpuCallback")}constructor(e){this._skinningMethod=e}compute(e){Eh(this._skinningMethod,e)}}function Lh(i){return J.new(new Gh(i))}u(Lh,"_ExtComputationCpuCallbackDataSource");const ao=new Map;function Ah(i){if(i===Ie.classicLinear||i===Ie.dualQuaternion){let e=ao.get(i);return e||(e=Lh(i),ao.set(i,e)),e}_s(`Unknown skinning method ${i}
`)}u(Ah,"UsdSkelImagingExtComputationCpuCallback");function Rh(i){const e=new Hr(Ph());if(!e.isValid()){rs("Couldn't load UsdImagingGLPackageSkinningShader");return}const t=e.getSource(No(i));if(t.length===0){rs("Failed verification: ' !shaderSource.empty() '"),_s(`Skinning compute shader is missing kernel '${i}'`);return}return J.new(t)}u(Rh,"_LoadSkinningComputeKernel");const _r=new Map;function mi(i){return _r.has(i)||_r.set(i,Rh(i)),_r.get(i)}u(mi,"_CachedKernel");function Mh(i,e){if(!Zi(Th)){if(i===Ie.classicLinear){if(e===tt.points)return mi(hi.skinPointsLBSKernel);if(e===tt.normals)return mi(hi.skinNormalsLBSKernel)}if(i===Ie.dualQuaternion){if(e===tt.points)return mi(hi.skinPointsDQSKernel);if(e===tt.normals)return mi(hi.skinNormalsDQSKernel)}_s(`Unknown skinning method "${i}" or computation type "${e}"
`)}}u(Mh,"UsdSkelImagingExtComputationGlslKernel");function Nh(i,e){return i==="/"?"/"+e:i+"/"+e}u(Nh,"_AppendChild$2");function Oh(){const i=wt,e=[];for(const t of i.allTokens)t!==i.restNormals&&t!==i.faceVertexIndices&&t!==i.hasFaceVaryingNormals&&e.push(t);return e}u(Oh,"_ExtComputationInputNamesForPoints");function Hh(){const i=wt,e=[];for(const t of i.allTokens)t!==i.restPoints&&t!==i.blendShapeOffsets&&t!==i.blendShapeOffsetRanges&&t!==i.numBlendShapeOffsetRanges&&e.push(t);return e}u(Hh,"_ExtComputationInputNamesForNormals");let Uh,Vh;const Sc=u(()=>Uh??=Oh(),"_PointInputNames"),yc=u(()=>Vh??=Hh(),"_NormalInputNames");class Ss extends ce{static{u(this,"_ExtAggregatorComputationInputValuesDataSource")}constructor(e,t){super(),this._resolvedPrimSource=e,this._computationType=t}static new(e,t){return new Ss(e,t)}getNames(){return this._computationType===tt.points?Sc():yc()}Get(e){const t=wt,n=this._resolvedPrimSource;if(e===t.restPoints)return n.getPoints();if(e===t.geomBindXform)return n.getGeomBindTransform();if(e===t.hasConstantInfluences)return n.getHasConstantInfluences();if(e===t.numInfluencesPerComponent)return n.getNumInfluencesPerComponent();if(e===t.influences)return n.getInfluences();if(e===t.blendShapeOffsets)return n.getBlendShapeOffsets();if(e===t.blendShapeOffsetRanges)return n.getBlendShapeOffsetRanges();if(e===t.numBlendShapeOffsetRanges)return n.getNumBlendShapeOffsetRanges();if(e===t.restNormals)return n.getNormals();if(e===t.faceVertexIndices)return n.getFaceVertexIndices();if(e===t.hasFaceVaryingNormals)return n.getHasFaceVaryingNormals()}}function Wh(){const i=_t,e=[];for(const t of i.allTokens)t!==i.skinningScaleXforms&&t!==i.skinningDualQuats&&e.push(t);return e}u(Wh,"_ExtComputationInputNamesForClassicLinear");let zh;class ys extends ce{static{u(this,"_ExtComputationInputValuesDataSource")}constructor(e){super(),this._resolvedPrimSource=e}static new(e){return new ys(e)}getNames(){return this._isDualQuatSkinning()?[..._t.allTokens]:zh??=Wh()}Get(e){const t=_t;if(e===t.commonSpaceToPrimLocal)return this._resolvedPrimSource.getCommonSpaceToPrimLocal();if(e===t.blendShapeWeights)return this._resolvedPrimSource.getBlendShapeWeights();if(e===t.skinningXforms)return this._resolvedPrimSource.getSkinningTransforms();if(e===t.skinningScaleXforms)return this._isDualQuatSkinning()?this._resolvedPrimSource.getSkinningScaleTransforms():void 0;if(e===t.skinningDualQuats)return this._isDualQuatSkinning()?this._resolvedPrimSource.getSkinningDualQuats():void 0;if(e===t.skelLocalToCommonSpace)return this._getResolvedSkeletonSchema().getSkelLocalToCommonSpace()}_getResolvedSkeletonSchema(){return this._resolvedPrimSource.getResolvedSkeletonSchema()}_isDualQuatSkinning(){return this._resolvedPrimSource.getSkinningMethod()===Ie.dualQuaternion}}class xs extends Ae{static{u(this,"_NumElementsDataSource")}constructor(e,t){super(),this._primvars=e,this._primvarName=t}static new(e,t){return new xs(e,t)}getTypedValue(e){const t=this._getPrimvarValue();return t?ti(t.GetValue(e)).length:0}GetContributingSampleTimesForInterval(e,t,n){const r=this._getPrimvarValue();return r?r.GetContributingSampleTimesForInterval(e,t,n):!1}_getPrimvarValue(){return this._primvars.getPrimvar(this._primvarName).getPrimvarValue()}}function oo(i,e){return rt.new([mt.getSchemaToken()],[new mt.Builder().setInputValues(Ss.new(i,e)).build()])}u(oo,"_ExtAggregatorComputationPrimDataSource");function Xh(i,e){const t=e===tt.points?Sc():yc(),n=e===tt.points?nt.pointsAggregatorComputation:nt.normalsAggregatorComputation,r=J.new(Nh(i,n)),s=[];for(const a of t)s.push(new au.Builder().setSourceComputation(r).setSourceComputationOutputName(J.new(a)).build());return rt.new([...t],s)}u(Xh,"_ExtComputationInputComputations");function qh(i){const e=i===tt.points?At.skinnedPoints:At.skinnedNormals;return rt.new([e],[new ou.Builder().setValueType(J.new({type:zr.HdTypeFloatVec3,count:1})).build()])}u(qh,"_ExtComputationOutputs");function co(i,e){const t=e===tt.points?_e.points:_e.normals,n=xs.new(i.getPrimvars(),t);return rt.new([mt.getSchemaToken()],[new mt.Builder().setInputValues(ys.new(i)).setInputComputations(Xh(i.getPrimPath(),e)).setOutputs(qh(e)).setGlslKernel(Mh(i.getSkinningMethod(),e)).setCpuCallback(Ah(i.getSkinningMethod())).setDispatchCount(n).setElementCount(n).build()])}u(co,"_ExtComputationPrimDataSource");function jh(i,e){const t=nt,n=tt;if(e===t.pointsComputation)return co(i,n.points);if(e===t.normalsComputation)return co(i,n.normals);if(e===t.pointsAggregatorComputation)return oo(i,n.points);if(e===t.normalsAggregatorComputation)return oo(i,n.normals)}u(jh,"UsdSkelImagingDataSourceResolvedExtComputationPrim");function bt(i){Ce.GetInstance().postWarning(i)}u(bt,"TF_WARN$2");function lo(i){Ce.GetInstance().postError(new st(i,at.CodingError))}u(lo,"TF_CODING_ERROR$3");function Hn(i,e,t){return Math.abs(i-e)<t}u(Hn,"_GfIsClose");const _n=Math.fround(1e-6);function xc(i,e){return i.getPrim(e)}u(xc,"_GetPrim$1");function vc(i,e){const t=i.data;return new be(t[0],t[1],t[2],e)}u(vc,"_ToVec4f$1");function Qh(i,e,t){for(let n=0;n<i.length;++n)t.push([n,vc(i[n],e)])}u(Qh,"_FillPointIndicesAndOffsetsDense");function Yh(i,e,t,n,r,s){n.length!==t.length&&bt(`Length (${n.length}) of offsets${e===""?"":" for inbetween "}${e} on BlendShape prim ${i} does not match length (${t.length}) of indices.
`);const a=Math.min(n.length,t.length);let o=!1;for(let c=0;c<a;++c){if(t[c]<0){o||(bt(`The indices on BlendShape prim ${i} has negative numbers.
`),o=!0);continue}s.push([t[c],vc(n[c],r)])}return!0}u(Yh,"_FillPointIndicesAndOffsetsSparse");function Kh(i,e,t,n,r,s){t.length===0?Qh(n,r,s):Yh(i,e,t,n,r,s)}u(Kh,"_FillPointIndicesAndOffsets");function Jh(i,e,t,n,r,s){const a=xc(i,t),o=re.getFromParent(a.dataSource);if(!o.isDefined()){bt(`No valid blend shape prim at ${t} which is among the blendShapeTargets of prim ${e}.
`);return}const c=R(o.getPointIndices()),l=[];l.push({weight:0,offsetsDataSource:void 0,inbetweenName:""}),l.push({weight:1,offsetsDataSource:o.getOffsets(),inbetweenName:""});const d=o.getInbetweenShapes();for(const h of d.getNames()){const p=d.Get(h),m=p.getWeight();if(!m){bt(`Inbetween ${h} on BlendShape prim ${t} has no weight.
`);continue}const g=Math.fround(m.getTypedValue(0));if(Hn(g,0,_n)||Hn(g,1,_n)){bt(`BlendShape prim ${t} has inbetween ${h} with invalid weight.
`);continue}l.push({weight:g,offsetsDataSource:p.getOffsets(),inbetweenName:h})}l.sort((h,p)=>h.weight-p.weight);let f=-1/0;for(const h of l){const p=h.weight;if(p===0)r.push({weight:p,subShapeIndex:-1});else{if(Hn(f,p,_n)){bt(`BlendShape prim ${t} has two inbetweens with the same weight ${p.toFixed(6)}.
`);continue}f=p;const m=n.value;r.push({weight:p,subShapeIndex:m}),Kh(t,h.inbetweenName,c,R(h.offsetsDataSource),m,s),n.value++}}}u(Jh,"_ProcessBlendShapePrim");function Zh(i){return new Y(i.map(([,e])=>e),$.GfVec4f)}u(Zh,"_ComputeBlendShapeOffsets");function ep(i){const e=i.length;if(e===0)return new Y([],$.GfVec2i);const t=i[e-1][0]+1,n=[];let r=-1;for(let s=0;s<e;s++)for(;r<i[s][0];)r>=0&&(n[r][1]=s),r++,n[r]=[s,s];return n[r][1]=e,new Y(n.slice(0,t).map(([s,a])=>new Sn(s,a)),$.GfVec2i)}u(ep,"_ComputeBlendShapeOffsetRanges");function tp(i,e){const t={primPath:e,blendShapeOffsets:new Y([],$.GfVec4f),blendShapeOffsetRanges:new Y([],$.GfVec2i),numSubShapes:0,blendShapeNameToWeightsAndSubShapeIndices:new Map},n=xc(i,e),r=E.getFromParent(n.dataSource),s=R(r.getBlendShapes()),a=R(r.getBlendShapeTargets());t.numSubShapes=0,s.length!==a.length&&bt(`Length (${s.length}) of blend shapes and length (${a.length}) of blend shape targets on prim ${e} are not matching.
`);const o=[],c={value:t.numSubShapes};{const l=Math.min(s.length,a.length);for(let d=0;d<l;++d){const f=s[d],h=a[d];let p=t.blendShapeNameToWeightsAndSubShapeIndices.get(f);if(p||(p=[],t.blendShapeNameToWeightsAndSubShapeIndices.set(f,p)),p.length>0){bt(`Duplicate blend shape ${f} on prim ${e}.
`);continue}Jh(i,e,h,c,p,o)}}return t.numSubShapes=c.value,o.sort((l,d)=>l[0]!==d[0]?l[0]-d[0]:l[1].data[3]-d[1].data[3]),t.blendShapeOffsets=Zh(o),t.blendShapeOffsetRanges=ep(o),t}u(tp,"UsdSkelImagingComputeBlendShapeData");function np(i,e,t){const n=new Float32Array(i.numSubShapes);e.length!==t.length&&bt(`Length (${e.length}) of blendShapes and length (${t.length}) of blendShapeWeights do not match on animation for prim ${i.primPath}.
`);const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const a=e[s],o=Math.fround(t[s]),c=i.blendShapeNameToWeightsAndSubShapeIndices.get(a);if(!c)continue;if(c.length<2){lo(`UsdSkelImagingBlendShapeData is supposed to have a weight for 0.0 and 1.0.
`);continue}if(c.length===2){const g=c[1].subShapeIndex;n[g]=o;continue}let l=1;const d=c.length-1;for(;l<d&&!(o<c[l].weight);)++l;const f=c[l],h=c[l-1],p=Math.fround(f.weight-h.weight);if(!(p>_n)){lo(`UsdSkelImagingBlendShapeData is supposed to have unique weights.
`);continue}const m=Math.fround(Math.fround(o-h.weight)/p);{const g=h.subShapeIndex;g>=0&&!Hn(m,1,_n)&&(n[g]=1-m)}{const g=f.subShapeIndex;g>=0&&!Hn(m,0,_n)&&(n[g]=m)}}return n}u(np,"UsdSkelImagingComputeBlendShapeWeights");class Fe extends ce{static{u(this,"UsdSkelImaging_DataSourcePrimvar")}constructor(e,t=te.constant,n=""){super(),this._valueSource=e,this._interpolation=t,this._role=n}static new(e,t=te.constant,n=""){return new Fe(e,t,n)}getNames(){return[te.primvarValue,te.interpolation,te.role]}Get(e){if(e===te.primvarValue)return this._valueSource;if(e===te.interpolation)return aa.buildInterpolationDataSource(this._interpolation);if(e===te.role)return aa.buildRoleDataSource(this._role)}}function ip(i,e){const t={influences:new Y([],$.GfVec2f),hasConstantInfluences:!1,numInfluencesPerComponent:0,jointMapper:new Lr},n=ge.getFromParent(i),r=n.getPrimvar(M.jointIndicesPrimvar),s=er(r.getInterpolation())??"";t.hasConstantInfluences=s===te.constant;const a=R(r.getPrimvarValue());if(a.length===0)return t;const o=n.getPrimvar(M.jointWeightsPrimvar),c=R(o.getPrimvarValue());if(c.length===0)return t;const l=o.getElementSize();l?t.numInfluencesPerComponent=l.getTypedValue(0):t.numInfluencesPerComponent=1;const d=new Array(a.length).fill(void 0).map(()=>[0,0]);hl(a,c,d),t.influences=new Y(d.map(([h,p])=>new bn(h,p)),$.GfVec2f);const f=R(E.getFromParent(i).getJoints());return f.length>0&&(t.jointMapper=new Lr(R(Q.getFromParent(e).getJoints()),f)),t}u(ip,"UsdSkelImagingComputeJointInfluencesData");const j=Le({resolvedSkeleton:"resolvedSkeleton",skelLocalToCommonSpace:"skelLocalToCommonSpace",skinningTransforms:"skinningTransforms",blendShapes:"blendShapes",blendShapeWeights:"blendShapeWeights",blendShapeRanges:"blendShapeRanges"});class A extends Pn{static{u(this,"UsdSkelImagingResolvedSkeletonSchema")}constructor(e){super(e)}static getFromParent(e){const t=e?.Get(j.resolvedSkeleton);return new A(t instanceof ce?t:void 0)}getSkelLocalToCommonSpace(){return this._getTypedDataSource(j.skelLocalToCommonSpace)}getSkinningTransforms(){return this._getTypedDataSource(j.skinningTransforms)}getBlendShapes(){return this._getTypedDataSource(j.blendShapes)}getBlendShapeWeights(){return this._getTypedDataSource(j.blendShapeWeights)}getBlendShapeRanges(){return this._getTypedDataSource(j.blendShapeRanges)}static getSchemaToken(){return j.resolvedSkeleton}static _defaultLocator;static getDefaultLocator(){return A._defaultLocator??=new Me(A.getSchemaToken())}static _skelLocalToCommonSpaceLocator;static getSkelLocalToCommonSpaceLocator(){return A._skelLocalToCommonSpaceLocator??=A.getDefaultLocator().append(j.skelLocalToCommonSpace)}static _skinningTransformsLocator;static getSkinningTransformsLocator(){return A._skinningTransformsLocator??=A.getDefaultLocator().append(j.skinningTransforms)}static _blendShapesLocator;static getBlendShapesLocator(){return A._blendShapesLocator??=A.getDefaultLocator().append(j.blendShapes)}static _blendShapeWeightsLocator;static getBlendShapeWeightsLocator(){return A._blendShapeWeightsLocator??=A.getDefaultLocator().append(j.blendShapeWeights)}static _blendShapeRangesLocator;static getBlendShapeRangesLocator(){return A._blendShapeRangesLocator??=A.getDefaultLocator().append(j.blendShapeRanges)}static buildRetained(e,t,n,r,s){return Tn({[j.skelLocalToCommonSpace]:e,[j.skinningTransforms]:t,[j.blendShapes]:n,[j.blendShapeWeights]:r,[j.blendShapeRanges]:s})}}(i=>{class e{static{u(this,"Builder")}_skelLocalToCommonSpace;_skinningTransforms;_blendShapes;_blendShapeWeights;_blendShapeRanges;setSkelLocalToCommonSpace(n){return this._skelLocalToCommonSpace=n,this}setSkinningTransforms(n){return this._skinningTransforms=n,this}setBlendShapes(n){return this._blendShapes=n,this}setBlendShapeWeights(n){return this._blendShapeWeights=n,this}setBlendShapeRanges(n){return this._blendShapeRanges=n,this}build(){return i.buildRetained(this._skelLocalToCommonSpace,this._skinningTransforms,this._blendShapes,this._blendShapeWeights,this._blendShapeRanges)}}i.Builder=e})(A||(A={}));class vs extends Ae{static{u(this,"_FirstMatrixDataSource")}constructor(e){super(),this._inputSrc=e}static new(e){return new vs(e)}getTypedValue(e){const t=R(this._inputSrc,e);return t.length===0?new pe(1):t[0]}GetContributingSampleTimesForInterval(e,t,n){return this._inputSrc.GetContributingSampleTimesForInterval(e,t,n)}}class ws extends Ae{static{u(this,"_MatrixProductDataSource")}constructor(e){super(),this._inputSrcs=e}static new(e){return new ws(e)}getTypedValue(e){if(this._inputSrcs.length===0)return new pe(1);let t=this._inputSrcs[0].getTypedValue(e);for(let n=1;n<this._inputSrcs.length;++n)t=t.getMultiply(this._inputSrcs[n].getTypedValue(e));return t}GetContributingSampleTimesForInterval(e,t,n){return Zn(this._inputSrcs,e,t,n)}}function rp(i,e){const t=[];for(;;){const n=Xo.getFromParent(e);if(!n.isDefined())break;const r=R(n.getPrototypeRoots());if(r.length===0)break;const s=r[0],a=E.getFromParent(i.getPrim(s).dataSource).getHasSkelRoot();if(!(a&&a.getTypedValue(0)))break;const o=R(n.getPaths());if(o.length===0)break;const c=o[0];e=i.getPrim(c).dataSource,t.push(c)}return t}u(rp,"_ComputeInstancerPaths");let sp,ap;class ee{static{u(this,"UsdSkelImagingDataSourceXformResolver")}constructor(e,t){this._sceneIndex=e,this._primSource=t,this._instancerPaths=rp(e,t)}_instancerPaths;getPrimLocalToCommonSpace(){const e=ur.getFromParent(this._primSource).getMatrix();if(this._instancerPaths.length===0)return e;const t=[];e&&t.push(e);for(const n of this._instancerPaths){const r=this._sceneIndex.getPrim(n).dataSource,s=ge.getFromParent(r).getPrimvar(oa.instanceTransforms).getPrimvarValue();s instanceof Oi&&t.push(vs.new(s));const a=ur.getFromParent(r).getMatrix();a&&t.push(a)}switch(t.length){case 0:return;case 1:return t[0];default:return ws.new(t)}}getInstanceAnimationSource(){for(const e of this._instancerPaths){const t=ge.getFromParent(this._sceneIndex.getPrim(e).dataSource),n=R(t.getPrimvar(Ie.skelAnimationSource).getPrimvarValue());if(n.length>0)return n}return[]}getInstancerPaths(){return this._instancerPaths}static getInstancedByLocator(){return Xo.getDefaultLocator()}static getXformLocator(){return ur.getDefaultLocator()}static getInstanceXformLocator(){return sp??=ge.getDefaultLocator().append(oa.instanceTransforms)}static getInstanceAnimationSourceLocator(){return ap??=ge.getDefaultLocator().append(Ie.skelAnimationSource)}}const wc=vn.declare("GfMatrix4f"),op=vn.declare("GfMatrix3f");function cp(i){Ce.GetInstance().postWarning(i)}u(cp,"TF_WARN$1");function un(i,e){return i==="/"?"/"+e:i+"/"+e}u(un,"_AppendChild$1");function Qe(i,e){return new J(i,e)}u(Qe,"_ToDataSource$1");class Ps extends Ae{static{u(this,"_MatrixInverseDataSource")}constructor(e){super(),this._inputSrc=e,this._valueAtZero=this._compute(0)}_valueAtZero;static new(e){return new Ps(e)}getTypedValue(e){return e===0?this._valueAtZero:this._compute(e)}GetContributingSampleTimesForInterval(e,t,n){return this._inputSrc?this._inputSrc.GetContributingSampleTimesForInterval(e,t,n):!1}_compute(e){return this._inputSrc?this._inputSrc.getTypedValue(e).getInverse():new pe(1)}}function lp(i,e){const t=i.getPrimvar(M.skinningMethodPrimvar).getPrimvarValue(),n=t instanceof Oi?String(er(t)??""):"";return n===""?Ie.classicLinear:n!==Ie.classicLinear&&n!==Ie.dualQuaternion?(cp(`Unknown skinning method ${n} on prim ${e}. Falling back to classicLinear.
`),Ie.classicLinear):n}u(lp,"_GetSkinningMethod");function up(i,e,t){const n=[_e.points],r=[new en.Builder().setInterpolation(en.buildInterpolationDataSource(te.vertex)).setRole(en.buildRoleDataSource(te.point)).setSourceComputation(J.new(un(i,nt.pointsComputation))).setSourceComputationOutputName(J.new(At.skinnedPoints)).setValueType(J.new({type:zr.HdTypeFloatVec3,count:1})).build()];if(e){const s=t.getPrimvar(_e.normals).getInterpolation(),a=s?s.getTypedValue(0):te.vertex;n.push(_e.normals),r.push(new en.Builder().setInterpolation(en.buildInterpolationDataSource(a)).setRole(en.buildRoleDataSource(te.normal)).setSourceComputation(J.new(un(i,nt.normalsComputation))).setSourceComputationOutputName(J.new(At.skinnedNormals)).setValueType(J.new({type:zr.HdTypeFloatVec3,count:1})).build())}return Ur.buildRetained(n,r)}u(up,"_ExtComputationPrimvars");function dp(){return ge.buildRetained([_e.points,_e.normals],[la.new(),la.new()])}u(dp,"_BlockPointsAndNormalsPrimvars");let fp;class Ts extends ce{static{u(this,"_SkinningPrimvarsDataSource")}constructor(e,t,n){super(),this._resolvedPrimSource=e,this._skeletonPrimSource=t,this._useInstanceOffset=n}static new(e,t,n){return new Ts(e,t,n)}getNames(){return qt.getSkinningInputNames()}Get(e){const t=Fe,n=this._resolvedPrimSource;return e===D.skinningXforms?t.new(n.getSkinningTransforms()):e===D.skinningScaleXforms?t.new(n.getSkinningScaleTransforms()):e===D.skinningDualQuats?t.new(n.getSkinningDualQuats()):e===D.blendShapeWeights?t.new(n.getBlendShapeWeights()):e===D.skelLocalToCommonSpace?t.new(this._getResolvedSkeletonSchema().getSkelLocalToCommonSpace()):e===D.commonSpaceToPrimLocal?t.new(n.getCommonSpaceToPrimLocal()):e===Wr.geomBindTransform?t.new(n.getGeomBindTransform()):e===D.hasConstantInfluences?t.new(n.getHasConstantInfluences()):e===D.numInfluencesPerComponent?t.new(n.getNumInfluencesPerComponent()):e===D.influences?t.new(n.getInfluences()):e===D.blendShapeOffsets?t.new(n.getBlendShapeOffsets()):e===D.blendShapeOffsetRanges?t.new(n.getBlendShapeOffsetRanges()):e===D.numBlendShapeOffsetRanges?t.new(n.getNumBlendShapeOffsetRanges()):e===D.numSkinningMethod?t.new(Qe(this._isDualQuatSkinning()?1:0,$.int)):e===D.numJoints?t.new(Qe(this._getNumJoints(),$.int)):e===D.numBlendShapeWeights?t.new(Qe(this._getNumBlendShapeWeights(),$.int)):n.Get(e)}_getNumJoints(){if(!this._useInstanceOffset)return 0;const e=Q.getFromParent(this._skeletonPrimSource);return e.isDefined()?R(e.getJoints()).length:0}_getNumBlendShapeWeights(){return this._useInstanceOffset?this._resolvedPrimSource.getBlendShapeData().numSubShapes:0}_getResolvedSkeletonSchema(){return this._resolvedPrimSource.getResolvedSkeletonSchema()}_isDualQuatSkinning(){return this._resolvedPrimSource.getSkinningMethod()===Ie.dualQuaternion}}function hp(i,e){e.includes(i)||e.push(i)}u(hp,"_AddIfNecessary");class ks extends Ae{static{u(this,"_SkinningXformsDataSource")}constructor(e,t){super(),this._jointInfluencesData=e,this._skelSkinningXforms=t}static new(e,t){return new ks(e,t)}getTypedValue(e){const t=this._jointInfluencesData.jointMapper.remap(ti(this._skelSkinningXforms.getTypedValue(e)),null,1,new de(1));return new Y(t,wc)}GetContributingSampleTimesForInterval(e,t,n){return this._skelSkinningXforms.GetContributingSampleTimesForInterval(e,t,n)}}let pp=class Pc extends Ae{static{u(this,"_BlendShapeWeightsDataSource")}constructor(e,t,n,r){super(),this._blendShapeData=e,this._blendShapes=t,this._blendShapeWeights=n,this._blendShapeRanges=r}static new(e,t,n,r){return new Pc(e,t,n,r)}getTypedValue(e){const t=R(this._blendShapes,e),n=R(this._blendShapeWeights,e),r=R(this._blendShapeRanges,e),s=this._blendShapeData.numSubShapes,a=new Float32Array(r.length*s);for(let o=0;o<r.length;++o){const c=r[o].data,l=t.slice(c[0],c[0]+c[1]),d=n.slice(c[0],c[0]+c[1]),f=np(this._blendShapeData,l,d);for(let h=0;h<s;++h)a[o*s+h]=f[h]}return new Y(Array.from(a),$.float)}GetContributingSampleTimesForInterval(e,t,n){return this._blendShapeWeights?this._blendShapeWeights.GetContributingSampleTimesForInterval(e,t,n):!1}};function mp(i){const e=i.factor();if(!e.success)return new pl(1);const t=new de(e.rotation),n=e.translation;t.orthonormalize();const r=t.getMultiply(new de(1).setTranslate(n));return i.getMultiply(r.getInverse()).extractRotationMatrix()}u(mp,"_ComputeSkinningScaleXform");function gp(i){return new Y(i.map(mp),op)}u(gp,"_ComputeSkinningScaleXforms");class Is extends Ae{static{u(this,"_SkinningScaleXformsDataSource")}constructor(e){super(),this._skinningXforms=e}static new(e){return new Is(e)}getTypedValue(e){return gp(R(this._skinningXforms,e))}GetContributingSampleTimesForInterval(e,t,n){return this._skinningXforms?this._skinningXforms.GetContributingSampleTimesForInterval(e,t,n):!1}}function _p(i){const e=i.factor();if(!e.success)return Qs.getZero();const t=new de(e.rotation),n=new We(e.translation);t.orthonormalize();const[r,s,a,o]=t.extractRotationMatrix().extractRotationQuaternion(),c=new ml(r,new We(s,a,o));return new Qs(c,n)}u(_p,"_ComputeSkinningDualQuat");function uo(i){const e=i.GetImaginary().data;return new be(e[0],e[1],e[2],i.GetReal())}u(uo,"_ToVec4f");function bp(i){const e=[];for(const t of i){const n=_p(t);e.push(uo(n.GetReal())),e.push(uo(n.getDual()))}return new Y(e,$.GfVec4f)}u(bp,"_ComputeSkinningDualQuats");class Cs extends Ae{static{u(this,"_SkinningDualQuatsDataSource")}constructor(e){super(),this._skinningXforms=e}static new(e){return new Cs(e)}getTypedValue(e){return bp(R(this._skinningXforms,e))}GetContributingSampleTimesForInterval(e,t,n){return this._skinningXforms?this._skinningXforms.GetContributingSampleTimesForInterval(e,t,n):!1}}class Sp extends ei{static{u(this,"_BlendShapeDataCache")}constructor(e,t){super(),this._sceneIndex=e,this._primPath=t}_compute(){return tp(this._sceneIndex,this._primPath)}}class yp extends ei{static{u(this,"_JointInfluencesDataCache")}constructor(e,t){super(),this._primSource=e,this._skeletonPrimSource=t}_compute(){return ip(this._primSource,this._skeletonPrimSource)}}const xp={};function Be(i,e){return xp[i]??=e()}u(Be,"_Static");function ye(i){return mt.getInputValuesLocator().append(i)}u(ye,"_InputValueLocator");let fo;class Un extends ce{static{u(this,"UsdSkelImagingDataSourceResolvedPointsBasedPrim")}constructor(e,t,n,r,s,a,o,c){super(),this._sceneIndex=e,this._primPath=t,this._primSource=n,this._hasSkelRoot=r,this._blendShapeTargetPaths=s,this._skeletonPath=a,this._skeletonPrimSource=o,this._resolvedSkeletonSchema=c,this._primvars=ge.getFromParent(n),this._mesh=Rn.getFromParent(n),this._skinningMethod=lp(this._primvars,t),this._blendShapeDataCache=new Sp(e,t),this._jointInfluencesDataCache=new yp(n,o),this._xformResolver=new ee(e,n)}_primvars;_mesh;_skinningMethod;_blendShapeDataCache;_jointInfluencesDataCache;_xformResolver;static new(e,t,n){if(!n)return;const r=E.getFromParent(n),s=r.getHasSkelRoot(),a=!!(s&&s.getTypedValue(0)),o=r.getSkeleton();if(!o)return;const c=String(o.getTypedValue(0)??"");if(c==="")return;const l=R(r.getBlendShapeTargets()),d=e.getPrim(c).dataSource,f=A.getFromParent(d);return new Un(e,t,n,a,l,c,d,f)}getNames(){const e=[...this._primSource.getNames()];return this._resolvedSkeletonSchema.isDefined()&&(qt.isSkinningDeferred()||hp(Ur.getSchemaToken(),e)),e}Get(e){if(qt.isSkinningDeferred()&&e===ge.getSchemaToken()&&this._primPath!==this._skeletonPath&&this._skeletonPrimSource){const r=R(this._resolvedSkeletonSchema.getBlendShapeRanges(),0).length>1;return Ts.new(this,this._skeletonPrimSource,r)}const t=this._primSource.Get(e);return this.hasExtComputations()?e===Ur.getSchemaToken()?kn.overlayedContainerDataSources(up(this._primPath,this.hasNormalsExtComputations(),this._primvars),t instanceof ce?t:void 0):e===ge.getSchemaToken()?fp??=dp():t:t}getPrimPath(){return this._primPath}getSkeletonPath(){return this._skeletonPath}getBlendShapeTargetPaths(){return this._blendShapeTargetPaths}getInstancerPaths(){return this._xformResolver.getInstancerPaths()}getPrimvars(){return this._primvars}getResolvedSkeletonSchema(){return this._resolvedSkeletonSchema}getSkinningTransforms(){const e=this._resolvedSkeletonSchema.getSkinningTransforms();if(!e)return;const t=this.getJointInfluencesData();return t.jointMapper.isNull()||t.jointMapper.isIdentity()?e:ks.new(t,e)}getSkinningScaleTransforms(){return Is.new(this.getSkinningTransforms())}getSkinningDualQuats(){return Cs.new(this.getSkinningTransforms())}getBlendShapeWeights(){return pp.new(this.getBlendShapeData(),this._resolvedSkeletonSchema.getBlendShapes(),this._resolvedSkeletonSchema.getBlendShapeWeights(),this._resolvedSkeletonSchema.getBlendShapeRanges())}getCommonSpaceToPrimLocal(){return Ps.new(this._xformResolver.getPrimLocalToCommonSpace())}getPoints(){return this.getPrimvars().getPrimvar(_e.points).getPrimvarValue()}getGeomBindTransform(){const e=this.getPrimvars().getPrimvar(M.geomBindTransformPrimvar).getPrimvarValue(),t=e instanceof Oi?e.getTypedValue(0):void 0;return Qe(t instanceof pe||t instanceof de?new de(t):new de(1),wc)}getHasConstantInfluences(){return Qe(this.getJointInfluencesData().hasConstantInfluences,$.bool)}getNumInfluencesPerComponent(){return Qe(this.getJointInfluencesData().numInfluencesPerComponent,$.int)}getInfluences(){return Qe(this.getJointInfluencesData().influences)}getBlendShapeOffsets(){return Qe(this.getBlendShapeData().blendShapeOffsets)}getBlendShapeOffsetRanges(){return Qe(this.getBlendShapeData().blendShapeOffsetRanges)}getNumBlendShapeOffsetRanges(){return Qe(this.getBlendShapeData().blendShapeOffsetRanges.size,$.int)}getNormals(){return this.getPrimvars().getPrimvar(_e.normals).getPrimvarValue()}getFaceVertexIndices(){const e=this.Get(Ti.mesh);if(!(e instanceof ce))return;const n=new Rn(e).GetTopology();if(!n.isDefined())return;const r=n.getContainer().Get(kt.faceVertexIndices);return r instanceof Oi?r:void 0}getHasFaceVaryingNormals(){const t=this.getPrimvars().getPrimvar(_e.normals).getInterpolation();if(!t)return;const r=t.getTypedValue(0)===te.faceVarying;return Qe(r,$.bool)}getBlendShapeData(){return this._blendShapeDataCache.Get()}getJointInfluencesData(){return this._jointInfluencesDataCache.Get()}getSkinningMethod(){return this._skinningMethod}hasExtComputations(){return!qt.isSkinningDeferred()&&this._resolvedSkeletonSchema.isDefined()&&this._primPath!==this._skeletonPath&&this._hasSkelRoot}hasNormalsExtComputations(){if(fo??=Zi(kh),fo&&this.hasExtComputations()){const e=this._mesh.getSubdivisionScheme();if((e?e.getTypedValue(0):Vr.none)===Vr.none)return R(this.getNormals()).length>0}return!1}static getDependendendOnDataSourceLocators(){return Be("dependedOn",()=>new N([E.getDefaultLocator(),ge.getDefaultLocator(),ee.getXformLocator()]))}_processDirtyLocators(e,t,n,r){const s=wt,a=_t,o=ge.getDefaultLocator();if(e.contains(E.getSkeletonLocator())||e.contains(E.getHasSkelRootLocator())||e.contains(E.getBlendShapeTargetsLocator())||e.contains(o)||e.contains(ee.getInstancedByLocator()))return!0;const c=Be("skinningMethod",()=>o.append(M.skinningMethodPrimvar));if(e.contains(c))return!0;if(!this._resolvedSkeletonSchema.isDefined())return!1;this._processDirtySkelBlendShapeLocators(e,t,n,r);const l=Be("jointInfluencesData",()=>new N([o.append(M.jointIndicesPrimvar),o.append(M.jointWeightsPrimvar),E.getJointsLocator()]));e.intersects(l)&&(this._jointInfluencesDataCache.invalidate(),t&&t.add(Be("influencesInputs",()=>new N([ye(s.hasConstantInfluences),ye(s.numInfluencesPerComponent),ye(s.influences)]))),r&&r.push(D.hasConstantInfluences,D.numInfluencesPerComponent,D.influences));const d=Be("pointsPrimvar",()=>o.append(_e.points));if(e.intersects(d)&&(t&&t.add(ye(s.restPoints)),n&&n.add(Be("counts",()=>new N([mt.getDispatchCountLocator(),mt.getElementCountLocator()])))),this.hasNormalsExtComputations()){const h=Be("normalsPrimvar",()=>o.append(_e.normals));e.intersects(h)&&(t&&t.add(ye(s.restNormals)),n&&n.add(Be("counts",()=>new N([mt.getDispatchCountLocator(),mt.getElementCountLocator()]))))}const f=Be("geomBindXformPrimvar",()=>o.append(M.geomBindTransformPrimvar));return e.intersects(f)&&t&&t.add(ye(s.geomBindXform)),e.intersects(ee.getXformLocator())&&(n&&n.add(ye(a.commonSpaceToPrimLocal)),r&&r.push(D.commonSpaceToPrimLocal)),!1}_processDirtySkeletonLocators(e,t,n,r){const s=_t;if(e.contains(A.getDefaultLocator()))return!0;if(!this._resolvedSkeletonSchema.isDefined())return!1;e.intersects(A.getSkelLocalToCommonSpaceLocator())&&(n&&n.add(ye(s.skelLocalToCommonSpace)),r&&r.push(D.skelLocalToCommonSpace)),e.intersects(A.getSkinningTransformsLocator())&&(n&&n.add(Be("skinningXformsInputs",()=>new N([ye(s.skinningXforms),ye(s.skinningScaleXforms),ye(s.skinningDualQuats)]))),r&&(r.push(D.skinningXforms),r.push(D.skinningScaleXforms),r.push(D.skinningDualQuats),r.push(D.numJoints)));const a=Be("blendLocators",()=>new N([A.getBlendShapesLocator(),A.getBlendShapeWeightsLocator(),A.getBlendShapeRangesLocator()]));return e.intersects(a)&&(n&&n.add(ye(s.blendShapeWeights)),r&&(r.push(D.blendShapeWeights),r.push(D.numBlendShapeWeights))),!1}_processDirtySkelBlendShapeLocators(e,t,n,r){const s=wt,a=_t;return this._resolvedSkeletonSchema.isDefined()&&e.intersects(re.getDefaultLocator())&&(this._blendShapeDataCache.invalidate(),t&&t.add(Be("blendShapeInputs",()=>new N([ye(s.blendShapeOffsets),ye(s.blendShapeOffsetRanges),ye(s.numBlendShapeOffsetRanges)]))),n&&n.add(ye(a.blendShapeWeights)),r&&r.push(D.blendShapeOffsets,D.blendShapeOffsetRanges,D.numBlendShapeOffsetRanges,D.blendShapeWeights,D.numBlendShapeWeights)),!1}_processDirtyInstancerLocators(e,t,n){return e.intersects(ee.getInstancedByLocator())?!0:(this._resolvedSkeletonSchema.isDefined()&&(e.intersects(ee.getXformLocator())||e.intersects(ee.getInstanceXformLocator()))&&n&&n.add(ye(_t.commonSpaceToPrimLocal)),!1)}processDirtyLocators(e,t,n){const r=new N,s=new N,a=[],o=this.hasExtComputations(),c=n&&o?r:void 0,l=n&&o?s:void 0,d=n&&!o?a:void 0;let f=!1;if(e===ke.skeleton?f=this._processDirtySkeletonLocators(t,c,l,d):e===ke.skelBlendShape?f=this._processDirtySkelBlendShapeLocators(t,c,l,d):e===Ye.instancer?f=this._processDirtyInstancerLocators(t,c,l):f=this._processDirtyLocators(t,c,l,d),n){const h=this.hasNormalsExtComputations();let p=!1;if(r.IsEmpty()||(n.push({primPath:un(this._primPath,nt.pointsAggregatorComputation),dirtyLocators:r}),h&&n.push({primPath:un(this._primPath,nt.normalsAggregatorComputation),dirtyLocators:r}),p=!0),s.IsEmpty()||(n.push({primPath:un(this._primPath,nt.pointsComputation),dirtyLocators:s}),h&&n.push({primPath:un(this._primPath,nt.normalsComputation),dirtyLocators:s}),p=!0),p){const m=Be("pointsValue",()=>ge.getDefaultLocator().append(_e.points).append(te.primvarValue));if(n.push({primPath:this._primPath,dirtyLocators:new N(m)}),h){const g=Be("normalsValue",()=>ge.getDefaultLocator().append(_e.normals).append(te.primvarValue));n.push({primPath:this._primPath,dirtyLocators:new N(g)})}}if(a.length>0){const m=new N;for(const g of a)m.add(ge.getDefaultLocator().append(g).append(te.primvarValue));n.push({primPath:this._primPath,dirtyLocators:m})}}return f}}function br(i){Ce.GetInstance().postError(new st(i,at.CodingError))}u(br,"TF_CODING_ERROR$2");function ho(i,e){if(i===e)return 0;const t=u(s=>s===47||s===46,"sep");let n=0,r=0;for(;;){for(;n<i.length&&t(i.charCodeAt(n));)n++;for(;r<e.length&&t(e.charCodeAt(r));)r++;const s=n>=i.length,a=r>=e.length;if(s||a)return s===a?0:s?-1:1;let o=n,c=r;for(;o<i.length&&!t(i.charCodeAt(o));)o++;for(;c<e.length&&!t(e.charCodeAt(c));)c++;const l=Math.min(o-n,c-r);for(let d=0;d<l;d++){const f=i.charCodeAt(n+d)-e.charCodeAt(r+d);if(f!==0)return f<0?-1:1}if(o-n!==c-r)return o-n<c-r?-1:1;n=o,r=c}}u(ho,"_ComparePaths");function gi(i,e){return i==="/"?"/"+e:i+"/"+e}u(gi,"_AppendChild");function _i(i){return i===Ye.mesh||i===Ye.basisCurves||i===Ye.points}u(_i,"_IsPointBasedPrim");const vp=new Set;function rn(i,e){return i.get(e)??vp}u(rn,"_Lookup$1");function Ct(i,e,t){i.has(e)||i.set(e,t)}u(Ct,"_Emplace");function Tc(i,e){if(e.has("/"))return!0;for(let t=i;t.length>1;){if(e.has(t))return!0;const n=t.lastIndexOf("/");t=n<=0?"/":t.slice(0,n)}return!1}u(Tc,"_HasPrefixIn");function Sr(i,e,t){for(const[n,r]of i)if(Tc(n,e))for(const s of r)Ct(t,s,!1)}u(Sr,"_PopulateFromDependencies$1");function yr(i,e,t){const n=t.get(i);n&&(n.delete(e),!(n.size>0)&&t.delete(i))}u(yr,"_Remove$1");function xr(i,e,t){let n=i.get(e);n||i.set(e,n=new Set),n.add(t)}u(xr,"_Insert");const po=[];let wp,Pp,Tp;class Ds extends Qo{static{u(this,"UsdSkelImagingPointsResolvingSceneIndex")}_pathToResolvedPrim=new Map;_skelPathToPrimPaths=new Map;_blendShapePathToPrimPaths=new Map;_instancerPathToPrimPaths=new Map;static new(e){return new Ds(e)}constructor(e){super(e);for(const t of new Yo(e))this._addResolvedPrim(t)}getPrim(e){const t=this._getInputSceneIndex().getPrim(e);if(_i(t.primType)){if(!t.dataSource)return t;const n=this._pathToResolvedPrim.get(e);return n?{primType:t.primType,dataSource:kn.new(n,t.dataSource)}:t}if(t.primType!==""||t.dataSource||e==="/")return t;{const n=e.lastIndexOf("/"),r=e.slice(n+1),s=n<=0?"/":e.slice(0,n),a=this._pathToResolvedPrim.get(s);if(!a||!a.hasExtComputations())return t;const o=jh(a,r);if(o)return{primType:Ye.extComputation,dataSource:o}}return t}getChildPrimPaths(e){const t=this._getInputSceneIndex().getChildPrimPaths(e),n=this._pathToResolvedPrim.get(e);if(!n||!n.hasExtComputations())return t;const r=this._getResolvedPrimComputations(e);for(const s of r)t.push(gi(e,s));return t}_processPrimsNeedingRefreshAndSendNotices(e,t,n,r){for(const s of[...e.keys()].sort(ho)){const a=e.get(s),o=this._getResolvedPrimComputations(s),c=o.length>0,l=this._removeResolvedPrim(s),d=this._addResolvedPrim(s),f=this._getResolvedPrimComputations(s),h=f.length>0;if(r&&!a&&(l||d)&&(r.push({primPath:s,dirtyLocators:N.UniversalSet}),h))for(const p of f)r.push({primPath:gi(s,p),dirtyLocators:N.UniversalSet});if(n&&c&&!h)for(const p of o)n.push({primPath:gi(s,p)});if(t&&h&&!c)for(const p of f)t.push({primPath:gi(s,p),primType:Ye.extComputation})}}_getResolvedPrimComputations(e){const t=this._pathToResolvedPrim.get(e);if(!t||!t.hasExtComputations())return po;const n=nt;return t.hasNormalsExtComputations()?wp??=[n.pointsAggregatorComputation,n.pointsComputation,n.normalsAggregatorComputation,n.normalsComputation]:Pp??=[n.pointsAggregatorComputation,n.pointsComputation]}_primsAdded(e,t){const n=new Map;{const c=this._pathToResolvedPrim.size>0,l=this._skelPathToPrimPaths.size>0,d=this._blendShapePathToPrimPaths.size>0,f=this._instancerPathToPrimPaths.size>0;for(const h of t){if((_i(h.primType)||c&&this._pathToResolvedPrim.has(h.primPath))&&n.set(h.primPath,!0),l)for(const p of rn(this._skelPathToPrimPaths,h.primPath))Ct(n,p,!1);if(d)for(const p of rn(this._blendShapePathToPrimPaths,h.primPath))Ct(n,p,!1);if(f)for(const p of rn(this._instancerPathToPrimPaths,h.primPath))Ct(n,p,!1)}}if(n.size===0){this._sendPrimsAdded(t);return}const r=this._isObserved(),s=[],a=[],o=[];this._processPrimsNeedingRefreshAndSendNotices(n,r?s:void 0,r?a:void 0,r?o:void 0),r&&(this._sendPrimsRemoved(a),s.length===0?this._sendPrimsAdded(t):this._sendPrimsAdded([...t,...s]),this._sendPrimsDirtied(o))}_processDirtyLocators(e,t,n,r){const s=this._pathToResolvedPrim.get(e);return s?s.processDirtyLocators(t,n,r):!1}_primsDirtied(e,t){const n=this._isObserved(),r=[],s=n?r:void 0,a=new Map;{const o=this._pathToResolvedPrim.size>0,c=this._skelPathToPrimPaths.size>0,l=this._blendShapePathToPrimPaths.size>0,d=this._instancerPathToPrimPaths.size>0;for(const f of t){if(!o&&!f.dirtyLocators.intersects(E.getSkeletonLocator()))continue;if(f.dirtyLocators.intersects(Un.getDependendendOnDataSourceLocators())&&this._processDirtyLocators(f.primPath,"",f.dirtyLocators,s)&&Ct(a,f.primPath,!1),c&&f.dirtyLocators.intersects(A.getDefaultLocator()))for(const p of rn(this._skelPathToPrimPaths,f.primPath))this._processDirtyLocators(p,ke.skeleton,f.dirtyLocators,s)&&Ct(a,p,!1);if(l&&f.dirtyLocators.intersects(re.getDefaultLocator()))for(const p of rn(this._blendShapePathToPrimPaths,f.primPath))this._processDirtyLocators(p,ke.skelBlendShape,f.dirtyLocators,s)&&Ct(a,p,!1);const h=Tp??=new N([ee.getInstancedByLocator(),ee.getXformLocator(),ee.getInstanceXformLocator()]);if(d&&f.dirtyLocators.intersects(h))for(const p of rn(this._instancerPathToPrimPaths,f.primPath))this._processDirtyLocators(p,Ye.instancer,f.dirtyLocators,s)&&Ct(a,p,!1)}}if(a.size>0){const o=[],c=[];if(this._processPrimsNeedingRefreshAndSendNotices(a,n?o:void 0,n?c:void 0,s),!n)return;this._sendPrimsRemoved(c),this._sendPrimsAdded(o)}n&&(r.length===0?this._sendPrimsDirtied(t):this._sendPrimsDirtied([...t,...r]))}_primsRemoved(e,t){const n=new Set(t.map(h=>h.primPath));if(this._pathToResolvedPrim.size>0)for(const[h,p]of[...this._pathToResolvedPrim])Tc(h,n)&&(this._removeDependenciesForResolvedPrim(h,p),this._pathToResolvedPrim.delete(h));const r=this._skelPathToPrimPaths.size>0,s=this._blendShapePathToPrimPaths.size>0,a=this._instancerPathToPrimPaths.size>0;if(!r&&!s&&!a){this._sendPrimsRemoved(t);return}const o=new Map;if(r&&Sr(this._skelPathToPrimPaths,n,o),s&&Sr(this._blendShapePathToPrimPaths,n,o),a&&Sr(this._instancerPathToPrimPaths,n,o),o.size===0){this._sendPrimsRemoved(t);return}const c=[],l=[],d=[],f=this._isObserved();this._processPrimsNeedingRefreshAndSendNotices(o,f?c:void 0,f?l:void 0,f?d:void 0),f&&(l.length===0?this._sendPrimsRemoved(t):this._sendPrimsRemoved([...t,...l]),this._sendPrimsAdded(c),this._sendPrimsDirtied(d))}_addResolvedPrim(e){const t=this._getInputSceneIndex().getPrim(e);if(!_i(t.primType))return!1;const n=Un.new(this._getInputSceneIndex(),e,t.dataSource);return n?(this._addDependenciesForResolvedPrim(e,n),this._pathToResolvedPrim.set(e,n),!0):!1}_addDependenciesForResolvedPrim(e,t){const n=t.getSkeletonPath();n!==""&&xr(this._skelPathToPrimPaths,n,e);for(const r of t.getBlendShapeTargetPaths())xr(this._blendShapePathToPrimPaths,r,e);if(t.hasExtComputations())for(const r of t.getInstancerPaths())xr(this._instancerPathToPrimPaths,r,e)}_removeResolvedPrim(e){const t=this._pathToResolvedPrim.get(e);return this._pathToResolvedPrim.has(e)?(this._removeDependenciesForResolvedPrim(e,t),this._pathToResolvedPrim.delete(e),!0):!1}_removeDependenciesForResolvedPrim(e,t){if(!t)return;const n=t.getSkeletonPath();n!==""&&yr(n,e,this._skelPathToPrimPaths);for(const r of t.getBlendShapeTargetPaths())yr(r,e,this._blendShapePathToPrimPaths);for(const r of t.getInstancerPaths())yr(r,e,this._instancerPathToPrimPaths)}_refreshResolvedPrimDataSource(e,t){this._pathToResolvedPrim.get(e)||br(`Expected data source for resolved points based prim at ${e}.`);const n=this._getInputSceneIndex().getPrim(e);if(!_i(n.primType)){br(`Expected points based prim at ${e}.`),this._pathToResolvedPrim.delete(e);return}const r=Un.new(this._getInputSceneIndex(),e,n.dataSource);if(!r){br(`Expected resolved points based prim at ${e}.`),this._pathToResolvedPrim.delete(e);return}this._pathToResolvedPrim.set(e,r),t&&(t.value=r.hasExtComputations())}_refreshResolvedPrimDataSources(e,t,n,r){for(const s of[...e].sort(ho)){const a={value:!1};this._refreshResolvedPrimDataSource(s,a),t&&t.push({primPath:s,dirtyLocators:N.UniversalSet}),a.value?(n?.add(s),r?.delete(s)):(n?.delete(s),r?.add(s))}}}function Vn(i){Ce.GetInstance().postError(new st(i,at.CodingError))}u(Vn,"TF_CODING_ERROR$1");function kc(i,e=""){return i||Vn(e?`Failed verification: ' ${e} '`:"Failed verification"),!!i}u(kc,"TF_VERIFY");function Gt(i){Ce.GetInstance().postWarning(i)}u(Gt,"TF_WARN");const Fi=vn.declare("GfMatrix4f");function $s(i){return new Y(i,Fi)}u($s,"_UsdSkelImagingMatrix4fArray");function kp(i){return i.GetArray()}u(kp,"_AsTuple");function Ic(i){for(let e=0;e<16;++e)i[e]=Math.fround(i[e]);return i}u(Ic,"_RoundToFloat");function Ip(i){return new de(i[0],i[1],i[2],i[3],i[4],i[5],i[6],i[7],i[8],i[9],i[10],i[11],i[12],i[13],i[14],i[15])}u(Ip,"_FromFloatTuple");const mo=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];class Cp{static{u(this,"UsdSkelImagingSkelData")}constructor(e,t){this.primPath=e,this.skeletonSchema=t,this.topology=new gl(R(t.getJoints()))}bindTransforms=[];inverseBindTransforms=[];topology}function Dp(i,e){return i.getPrim(e)}u(Dp,"_GetPrim");function $p(i){return i.map(e=>new de(e))}u($p,"_Convert");function Bp(i){return i.map(e=>e.getInverse())}u(Bp,"_Invert");function Fp(i,e){const t=Dp(i,e),n=new Cp(e,Q.getFromParent(t.dataSource));return n.bindTransforms=$p(R(n.skeletonSchema.getBindTransforms())),n.inverseBindTransforms=Bp(n.bindTransforms),n}u(Fp,"UsdSkelImagingComputeSkelData");function Ep(i,e){const t=e.length;if(i.length!==t)return!1;for(let n=0;n<t;++n){const r=i[n].GetArray(),s=e[n],a=new Array(16);for(let o=0;o<4;++o)for(let c=0;c<4;++c){let l=0;for(let d=0;d<4;++d)l+=r[o*4+d]*s[d*4+c];a[o*4+c]=Math.fround(l)}e[n]=a}return!0}u(Ep,"_MultiplyInPlace");function Gp(i,e,t,n,r){const s=u(b=>R(n,b).map(kp),"rest"),a=new Lr(R(e.getJoints()),R(i.skeletonSchema.getJoints()));if(a.isNull())return s(r);const o=R(e.getTranslations(),r),c=R(e.getRotations(),r),l=R(e.getScales(),r),d=new Array(o.length);for(let b=0;b<o.length;++b)d[b]=o[b].data;const f=new Array(c.length);for(let b=0;b<c.length;++b){const y=c[b],S=y.GetImaginary().data;f[b]=[y.GetReal(),S[0],S[1],S[2]]}const h=new Array(l.length);for(let b=0;b<l.length;++b)h[b]=l[b].data;const p=bl(d,f,h);if(!p)return Gt(`Could not compute transforms for skelAnimation ${t}.
`),s(r);const m=p.map(Ic);if(m.length===0)return s(0);if(a.isIdentity())return m;let g;a.isSparse()?g=s(r):g=new Array(i.topology.getNumJoints()).fill(mo);let _;try{_=a.remap(m,g,1,mo)}catch{return Gt(`Could not remap transforms from skelAnimation ${t} for skeleton ${i.primPath}.
`),s(r)}return _}u(Gp,"_ComputeJointLocalTransforms");function Lp(i,e,t){const n=i.size,r=u(()=>Gt(`Could not concat local joint transforms for skeleton ${t}.
`),"warn"),s=u(()=>Array.from({length:n},()=>new Array(16).fill(0)),"empty");if(e.length!==n)return Gt(`Size of jointLocalXforms [${e.length}] != number of joints [${n}]`),r(),s();try{const a=_l(i,e);for(let o=0;o<n;++o)a[o]!==e[o]?Ic(a[o]):a[o]=[...a[o]];return a}catch(a){return Gt(String(a.message??a)),r(),s()}}u(Lp,"_ConcatJointTransforms");function Ap(i,e,t,n,r){const s=i.topology.size,a=new Array(t.length*s);for(let o=0;o<t.length;++o){const c=Lp(i.topology,Gp(i,t[o],n[o]??"",e,r),i.primPath);Ep(i.inverseBindTransforms,c)||Gt(`Length (${i.inverseBindTransforms.length}) of bind transforms does not match number (${s}) of joints for skelAnimation ${n[o]??""}.
`);for(let l=0;l<s;++l){const d=c[l];a[o*s+l]=d?Ip(d):new de(0)}}return $s(a)}u(Ap,"UsdSkelImagingComputeSkinningTransforms");function Rp(i,e){const t=Math.fround(Math.fround(Math.PI)/4);for(let n=0;n<2;++n)if(Math.abs(Sl(i.getRow3(n),e))>t)return n;return 2}u(Rp,"_FindBestAlignedBasis");function Mp(i,e,t,n=0){const r=new We(i.extractTranslation()),s=new We(e.extractTranslation()),a=r.subtract(s),o=[1,0,0],c=[2,2,1],l=Rp(e,new Ar(a.GetNormalized()));let d=new We(e.getRow3(o[l])).GetNormalized(),f=new We(e.getRow3(c[l])).GetNormalized();const h=Math.fround(a.GetLength()*.1);d=d.getScaled(h),f=f.getScaled(h),t[n+0]=r,t[n+1]=s.add(d).add(f),t[n+2]=s.add(d).subtract(f),t[n+3]=s.subtract(d).subtract(f),t[n+4]=s.subtract(d).add(f)}u(Mp,"UsdSkelImagingComputePointsForSingleBone");const Cc=[0,2,1,0,3,2,0,4,3,0,1,4],go=Cc.length,Np=3,Op=4,dn=5;function Hp(i){const e=i.topology.size;let t=0;for(let n=0;n<i.topology.size;++n){const r=i.topology.getParent(n);if(!(r<0)){if(r>=e){Vn("Bad index for parent joint");continue}t++}}return t}u(Hp,"_NumBonesOfSkelData");function Up(i){const e={primPath:i.primPath,numJoints:i.topology.size,boneJointIndices:[],boneMeshPoints:[]};if(e.numJoints!==i.bindTransforms.length)return Gt(`Number of bind transforms does not match number of joints for skeleton ${i.primPath}.`),e;const t=i.topology.size,n=Hp(i);e.boneJointIndices=new Array(dn*n),e.boneMeshPoints=new Array(dn*n);let r=0;for(let s=0;s<i.topology.size;++s){const a=i.topology.getParent(s);if(!(a<0)&&!(a>=t)){for(let o=0;o<dn;++o)e.boneJointIndices[r+o]=o===0?s:a;Mp(new pe(i.bindTransforms[s]),new pe(i.bindTransforms[a]),e.boneMeshPoints,r),r+=dn}}return e}u(Up,"UsdSkelImagingComputeSkelGuideData");function Dc(i){return Math.floor(i.boneMeshPoints.length/dn)}u(Dc,"_NumBones");function Vp(i){return new Array(Op*Dc(i)).fill(Np)}u(Vp,"UsdSkelImagingComputeSkelGuideFaceVertexCounts");function Wp(i){const e=Dc(i),t=new Array(e*go);let n=0;for(let r=0;r<e;++r)for(let s=0;s<go;++s)t[n++]=Cc[s]+r*dn;return t}u(Wp,"UsdSkelImagingComputeSkelGuideFaceVertexIndices");function zp(i,e){const t=ti(e),n=i.boneMeshPoints.length,r=u(()=>new Y([],$.GfVec3f),"empty");if(i.numJoints===0||!kc(i.boneJointIndices.length===n))return r();if(i.numJoints>t.length||t.length%i.numJoints!==0)return Gt(`Number of skinning transforms did not match number of joints for skeleton ${i.primPath}.`),r();const s=new Array(n);for(let a=0;a<n;++a){const o=t[i.boneJointIndices[a]];s[a]=new We(o.transformAffine(i.boneMeshPoints[a]))}return new Y(s,$.GfVec3f)}u(zp,"UsdSkelImagingComputeSkelGuidePoints");function tr(i,e){const t=[];let n=0,r=0;for(;n<i.length&&r<e.length;){const s=i[n],a=e[r];s<a?(t.push(s),++n):a<s?(t.push(a),++r):(t.push(s),++n,++r)}for(;n<i.length;)t.push(i[n++]);for(;r<e.length;)t.push(e[r++]);return t}u(tr,"_Union");function nr(i,e){i.splice(0,i.length,...e)}u(nr,"_Assign");class Bs extends Ae{static{u(this,"_SkinningTransformsDataSource")}constructor(e,t,n,r){super(),this._data=e,this._restTransformsDataSource=t,this._animationSchemas=n,this._animationSources=r,this._valueAtZero=this._compute(0)}_valueAtZero;static new(e,t,n,r){return new Bs(e,t,n,r)}getTypedValue(e){return e===0?this._valueAtZero:this._compute(e)}GetContributingSampleTimesForInterval(e,t,n){const r=[];for(const s of this._animationSchemas)r.push(s.getTranslations()),r.push(s.getRotations()),r.push(s.getScales());return Zn(r,e,t,n)?(n&&nr(n,tr(n,[e,0,t])),!0):!1}_compute(e){return kc(this._data)?Ap(this._data,this._restTransformsDataSource,this._animationSchemas,this._animationSources,e):$s([])}}class Fs extends Ae{static{u(this,"_BlendShapesDataSource")}constructor(e,t){super(),this._animSchemas=e,this._blendShapeRanges=t,this._valueAtZero=this._compute(0)}_valueAtZero;static new(e,t){return new Fs(e,t)}getTypedValue(e){return e===0?this._valueAtZero:this._compute(e)}GetContributingSampleTimesForInterval(e,t,n){const r=this._animSchemas.map(s=>s.getBlendShapes());return Zn(r,e,t,n)?(n&&nr(n,tr(n,[e,0,t])),!0):!1}_compute(e){if(this._animSchemas.length===0)return[];const t=R(this._blendShapeRanges,e),n=t[t.length-1].data,r=n[0]+n[1],s=new Array(r);for(let a=0;a<this._animSchemas.length;++a){const o=R(this._animSchemas[a].getBlendShapes(),e),c=t[a].data;for(let l=0;l<c[1];++l)s[c[0]+l]=o[l]}return s}}class Es extends Ae{static{u(this,"_BlendShapeWeightsDataSource")}constructor(e,t){super(),this._animSchemas=e,this._blendShapeRanges=t,this._valueAtZero=this._compute(0)}_valueAtZero;static new(e,t){return new Es(e,t)}getTypedValue(e){return e===0?this._valueAtZero:this._compute(e)}GetContributingSampleTimesForInterval(e,t,n){const r=this._animSchemas.map(s=>s.getBlendShapeWeights());return Zn(r,e,t,n)?(n&&nr(n,tr(n,[e,0,t])),!0):!1}_compute(e){if(this._animSchemas.length===0)return[];const t=R(this._blendShapeRanges,e),n=t[t.length-1].data,r=n[0]+n[1],s=new Array(r);for(let a=0;a<this._animSchemas.length;++a){const o=R(this._animSchemas[a].getBlendShapeWeights(),e),c=t[a].data;for(let l=0;l<c[1];++l)s[c[0]+l]=o[l]}return s}}class Gs extends Ae{static{u(this,"_BlendShapeRangesDataSource")}constructor(e){super(),this._animSchemas=e,this._valueAtZero=this._compute(0)}_valueAtZero;static new(e){return new Gs(e)}getTypedValue(e){return e===0?this._valueAtZero:this._compute(e)}GetContributingSampleTimesForInterval(e,t,n){const r=this._animSchemas.map(s=>s.getBlendShapeWeights());return Zn(r,e,t,n)?(n&&nr(n,tr(n,[e,0,t])),!0):!1}_compute(e){if(this._animSchemas.length===0)return new Y([],$.GfVec2i);let t=0;const n=[];for(const r of this._animSchemas){const s=R(r.getBlendShapeWeights(),e).length;n.push(new Sn(t,s)),t+=s}return new Y(n,$.GfVec2i)}}class Ls extends ce{static{u(this,"_ResolvedSkeletonSchemaDataSource")}constructor(e){super(),this._resolvedSkeletonSource=e}static new(e){return new Ls(e)}getNames(){return[j.skelLocalToCommonSpace,j.skinningTransforms,j.blendShapes,j.blendShapeWeights,j.blendShapeRanges]}Get(e){if(e===j.skelLocalToCommonSpace)return this._resolvedSkeletonSource.getSkelLocalToCommonSpace();if(e===j.skinningTransforms)return this._resolvedSkeletonSource.getSkinningTransforms();if(e===j.blendShapes)return this._resolvedSkeletonSource.getBlendShapes();if(e===j.blendShapeWeights)return this._resolvedSkeletonSource.getBlendShapeWeights();if(e===j.blendShapeRanges)return this._resolvedSkeletonSource.getBlendShapeRanges()}}class As extends ce{static{u(this,"_MeshTopologySchemaDataSource")}constructor(e){super(),this._resolvedSkeletonSource=e}static new(e){return new As(e)}getNames(){return[kt.faceVertexCounts,kt.faceVertexIndices,kt.orientation]}Get(e){if(e===kt.faceVertexCounts)return new J(Vp(this._getSkelGuideData()),$.int);if(e===kt.faceVertexIndices)return new J(Wp(this._getSkelGuideData()),$.int);if(e===kt.orientation)return cu.buildOrientationDataSource(kt.rightHanded)}_getSkelGuideData(){return this._resolvedSkeletonSource.getSkelGuideData()}}class Rs extends Ae{static{u(this,"_PointsPrimvarValueDataSource")}constructor(e,t){super(),this._data=e,this._skinningTransforms=t}static new(e,t){return new Rs(e,t)}getTypedValue(e){return zp(this._data,er(this._skinningTransforms,e))}GetContributingSampleTimesForInterval(e,t,n){return this._skinningTransforms.GetContributingSampleTimesForInterval(e,t,n)}}function Xp(i,e){return i.map(t=>H.getFromParent(t===""?void 0:e.getPrim(t).dataSource))}u(Xp,"_GetInstanceAnimationSchemas");function qe(i,e){return new J(i,e)}u(qe,"_ToDataSource");class Ms extends ce{static{u(this,"_SkelGuideSkinningPrimvarsDataSource")}constructor(e,t,n){super(),this._data=e,this._skinningTransforms=t,this._useInstanceOffset=n}static new(e,t,n){return new Ms(e,t,n)}getNames(){return[_e.points,D.skinningXforms,D.skelLocalToCommonSpace,D.commonSpaceToPrimLocal,Wr.geomBindTransform,D.hasConstantInfluences,D.numInfluencesPerComponent,D.influences,D.numSkinningMethod,D.numJoints]}Get(e){if(e===_e.points)return Fe.new(qe(new Y(this._data.boneMeshPoints,$.GfVec3f)),te.vertex,te.point);if(e===D.skinningXforms)return Fe.new(this._skinningTransforms);if(e===D.skelLocalToCommonSpace)return Fe.new(qe(new de(1),Fi));if(e===D.commonSpaceToPrimLocal)return Fe.new(qe(new de(1),Fi));if(e===Wr.geomBindTransform)return Fe.new(qe(new de(1),Fi));if(e===D.hasConstantInfluences)return Fe.new(qe(!1,$.bool));if(e===D.numInfluencesPerComponent)return Fe.new(qe(1,$.int));if(e===D.influences){const t=this._data.boneJointIndices.map(n=>new bn(n,1));return Fe.new(qe(new Y(t,$.GfVec2f)))}if(e===D.numSkinningMethod)return Fe.new(qe(0,$.int));if(e===D.numJoints)return Fe.new(qe(this._useInstanceOffset?this._data.numJoints:0,$.int))}}class qp extends ei{static{u(this,"_RestTransformsCache")}constructor(e){super(),this._schema=e}_compute(){const e=R(this._schema.getRestTransforms());return $s(e.map(t=>new de(t)))}}class Ns extends Ae{static{u(this,"_RestTransformsDataSource")}_cache;constructor(e){super(),this._cache=new qp(e)}static new(e){return new Ns(e)}invalidate(){this._cache.invalidate()}getTypedValue(e){return this._cache.Get()}GetContributingSampleTimesForInterval(e,t,n){return!1}}class jp extends ei{static{u(this,"_SkelDataCache")}constructor(e,t){super(),this._sceneIndex=e,this._primPath=t}_compute(){return Fp(this._sceneIndex,this._primPath)}}class Qp extends ei{static{u(this,"_SkelGuideDataCache")}constructor(e){super(),this._resolvedSkeleton=e}_compute(){return Up(this._resolvedSkeleton.getSkelData())}}let Yp,Kp;function bi(){return Kp??=ge.getDefaultLocator().append(_e.points).append(te.primvarValue)}u(bi,"_PointsPrimvarValueLocator");class Wn extends ce{static{u(this,"UsdSkelImagingDataSourceResolvedSkeletonPrim")}constructor(e,t,n){super(),this._primPath=t,this._primSource=n,this._animationSource=er(E.getFromParent(n).getAnimationSource())??"",this._animationSchema=H.getFromParent(this._animationSource===""?void 0:e.getPrim(this._animationSource).dataSource),this._skelDataCache=new jp(e,t),this._skelGuideDataCache=new Qp(this),this._restTransformsDataSource=Ns.new(Q.getFromParent(n)),this._xformResolver=new ee(e,n),this._instanceAnimationSources=this._xformResolver.getInstanceAnimationSource(),this._instanceAnimationSchemas=Xp(this._instanceAnimationSources,e)}_animationSource;_animationSchema;_skelDataCache;_skelGuideDataCache;_restTransformsDataSource;_xformResolver;_instanceAnimationSources;_instanceAnimationSchemas;static new(e,t,n){return new Wn(e,t,n)}getNames(){return[A.getSchemaToken(),Rn.getSchemaToken(),ge.getSchemaToken()]}Get(e){if(e===A.getSchemaToken())return Ls.new(this);if(e===Rn.getSchemaToken())return rt.new([Ti.topology,Ti.subdivisionScheme,Ti.doubleSided],[As.new(this),qe(Vr.none,$.token),qe(!0,$.bool)]);if(e===ge.getSchemaToken()){if(qt.isSkinningDeferred()){const t=this.getAnimationSource().length>1;return Ms.new(this.getSkelGuideData(),this.getSkinningTransforms(),t)}return rt.new([_e.points],[Fe.new(Rs.new(this.getSkelGuideData(),this.getSkinningTransforms()),te.vertex,te.point)])}}_shouldResolveInstanceAnimation(){const e=this.getInstancerPaths();return qt.isSkinningDeferred()&&e.length>0&&this._instanceAnimationSources.length>0}getAnimationSource(){return this._shouldResolveInstanceAnimation()?this._instanceAnimationSources:[this._animationSource]}getAnimationSchema(){return this._shouldResolveInstanceAnimation()?this._instanceAnimationSchemas:[this._animationSchema]}getInstancerPaths(){return this._xformResolver.getInstancerPaths()}getSkelLocalToCommonSpace(){return this._xformResolver.getPrimLocalToCommonSpace()}getSkinningTransforms(){return Bs.new(this._skelDataCache.Get(),this._restTransformsDataSource,this.getAnimationSchema(),this.getAnimationSource())}getBlendShapes(){return Fs.new(this.getAnimationSchema(),this.getBlendShapeRanges())}getBlendShapeWeights(){return Es.new(this.getAnimationSchema(),this.getBlendShapeRanges())}getBlendShapeRanges(){return Gs.new(this.getAnimationSchema())}getSkelData(){return this._skelDataCache.Get()}getSkelGuideData(){return this._skelGuideDataCache.Get()}static getDependendendOnDataSourceLocators(){return Yp??=new N([Q.getDefaultLocator(),E.getAnimationSourceLocator(),ee.getXformLocator()])}_processSkeletonDirtyLocators(e,t){if(e.contains(Q.getDefaultLocator())||e.contains(E.getAnimationSourceLocator())&&!this._shouldResolveInstanceAnimation()||e.contains(ee.getInstancedByLocator()))return!0;const n=new N([Q.getJointsLocator(),Q.getBindTransformsLocator()]);return e.intersects(n)&&(this._skelDataCache.invalidate(),this._skelGuideDataCache.invalidate(),t&&(t.insert(A.getSkinningTransformsLocator()),t.insert(Rn.getTopologyLocator()),t.insert(bi()))),e.contains(Q.getRestTransformsLocator())&&(this._restTransformsDataSource.invalidate(),t&&(t.insert(A.getSkinningTransformsLocator()),t.insert(bi()))),e.intersects(ee.getXformLocator())&&t&&t.insert(A.getSkelLocalToCommonSpaceLocator()),!1}_processSkelAnimationDirtyLocators(e,t){if(e.contains(H.getDefaultLocator())||e.contains(ee.getInstancedByLocator()))return!0;e.contains(H.getJointsLocator())&&(this._skelDataCache.invalidate(),this._skelGuideDataCache.invalidate(),t&&(t.insert(A.getSkinningTransformsLocator()),t.insert(bi())));const n=new N([H.getTranslationsLocator(),H.getRotationsLocator(),H.getScalesLocator()]);return e.intersects(n)&&t&&(t.insert(A.getSkinningTransformsLocator()),t.insert(bi())),e.intersects(H.getBlendShapesLocator())&&t&&(t.insert(A.getBlendShapesLocator()),t.insert(A.getBlendShapeRangesLocator())),e.intersects(H.getBlendShapeWeightsLocator())&&t&&t.insert(A.getBlendShapeWeightsLocator()),!1}_processInstancerDirtyLocators(e,t){return e.intersects(ee.getInstancedByLocator())||e.intersects(ee.getInstanceAnimationSourceLocator())&&this._shouldResolveInstanceAnimation()?!0:((e.intersects(ee.getXformLocator())||e.intersects(ee.getInstanceXformLocator()))&&t&&t.insert(A.getSkelLocalToCommonSpaceLocator()),!1)}processDirtyLocators(e,t,n){const r=new N;let s=!1;return e===ke.skeleton?s=this._processSkeletonDirtyLocators(t,n?r:void 0):e===ke.skelAnimation?s=this._processSkelAnimationDirtyLocators(t,n?r:void 0):e===Ye.instancer&&(s=this._processInstancerDirtyLocators(t,n?r:void 0)),n&&(r.IsEmpty()||n.push({primPath:this._primPath,dirtyLocators:r})),s}}const Jp=new Set;function Si(i,e){return i.get(e)??Jp}u(Si,"_Lookup");function _o(i,e,t){for(const[n,r]of i)if(qo(n,e))for(const s of r)t.add(s)}u(_o,"_PopulateFromDependencies");function bo(i,e,t){const n=t.get(i);n&&(n.delete(e),!(n.size>0)&&t.delete(i))}u(bo,"_Remove");function Fn(i){return[...i].sort((e,t)=>e<t?-1:e>t?1:0)}u(Fn,"_Sorted");let Zp;class Os extends Qo{static{u(this,"UsdSkelImagingSkeletonResolvingSceneIndex")}_pathToResolvedSkeleton=new Map;_skelAnimPathToSkeletonPaths=new Map;_instancerPathToSkeletonPaths=new Map;static new(e){return new Os(e)}constructor(e){super(e);for(const t of new Yo(e))this._addResolvedSkeleton(t)}getPrim(e){const t=this._getInputSceneIndex().getPrim(e);if(t.primType!==ke.skeleton||!t.dataSource)return t;const n=this._pathToResolvedSkeleton.get(e);return n?{primType:Ye.mesh,dataSource:kn.new(n,t.dataSource)}:t}getChildPrimPaths(e){return this._getInputSceneIndex().getChildPrimPaths(e)}_primsAdded(e,t){const n=this._isObserved();let r=this._pathToResolvedSkeleton.size>0;const s=new Set,a=[];{const d=t.length;for(let f=0;f<d;++f){const h=t[f];r&&this._removeResolvedSkeleton(h.primPath),h.primType===ke.skeleton&&this._addResolvedSkeleton(h.primPath)&&(a.push(f),r=!0,s.add(h.primPath))}}const o=[],c=this._skelAnimPathToSkeletonPaths.size>0,l=this._instancerPathToSkeletonPaths.size>0;if(c||l){const d=new Set;for(const f of t){if(c)for(const h of Si(this._skelAnimPathToSkeletonPaths,f.primPath))s.has(h)||d.add(h);if(l)for(const h of Si(this._instancerPathToSkeletonPaths,f.primPath))s.has(h)||d.add(h)}for(const f of Fn(d))n&&o.push({primPath:f,dirtyLocators:N.UniversalSet}),this._refreshResolvedSkeletonDataSource(f)}if(n){if(a.length===0)this._sendPrimsAdded(t);else{const d=t.map(f=>({...f}));for(const f of a)d[f].primType=Ye.mesh;this._sendPrimsAdded(d)}o.length>0&&this._sendPrimsDirtied(o)}}_processDirtyLocators(e,t,n,r){const s=this._pathToResolvedSkeleton.get(e);s&&s.processDirtyLocators(t,n,r)&&(this._removeResolvedSkeleton(e),this._addResolvedSkeleton(e),r&&r.push({primPath:e,dirtyLocators:N.UniversalSet}))}_primsDirtied(e,t){if(this._pathToResolvedSkeleton.size===0){this._sendPrimsDirtied(t);return}const n=this._isObserved(),r=[],s=n?r:void 0;{const a=this._skelAnimPathToSkeletonPaths.size>0,o=this._instancerPathToSkeletonPaths.size>0,c=Zp??=new N([ee.getInstancedByLocator(),ee.getXformLocator(),ee.getInstanceXformLocator(),ee.getInstanceAnimationSourceLocator()]);for(const l of t){if(l.dirtyLocators.intersects(Wn.getDependendendOnDataSourceLocators())&&this._processDirtyLocators(l.primPath,ke.skeleton,l.dirtyLocators,s),a&&l.dirtyLocators.intersects(H.getDefaultLocator())){const d=Fn(Si(this._skelAnimPathToSkeletonPaths,l.primPath));for(const f of d)this._processDirtyLocators(f,ke.skelAnimation,l.dirtyLocators,s)}if(o&&l.dirtyLocators.intersects(c)){const d=Fn(Si(this._instancerPathToSkeletonPaths,l.primPath));for(const f of d)this._processDirtyLocators(f,Ye.instancer,l.dirtyLocators,s)}}}n&&(r.length===0?this._sendPrimsDirtied(t):this._sendPrimsDirtied([...t,...r]))}_primsRemoved(e,t){const n=this._isObserved();if(this._pathToResolvedSkeleton.size===0){this._sendPrimsRemoved(t);return}for(const o of t)for(const c of Fn(this._pathToResolvedSkeleton.keys()))qo(c,o.primPath)&&(this._removeDependenciesForResolvedSkeleton(c,this._pathToResolvedSkeleton.get(c)),this._pathToResolvedSkeleton.delete(c));const r=[],s=this._skelAnimPathToSkeletonPaths.size>0,a=this._instancerPathToSkeletonPaths.size>0;if(s||a){const o=new Set;for(const c of t)s&&_o(this._skelAnimPathToSkeletonPaths,c.primPath,o),a&&_o(this._instancerPathToSkeletonPaths,c.primPath,o);for(const c of Fn(o))this._refreshResolvedSkeletonDataSource(c),n&&r.push({primPath:c,dirtyLocators:N.UniversalSet})}n&&(this._sendPrimsRemoved(t),r.length>0&&this._sendPrimsDirtied(r))}_addResolvedSkeleton(e){const t=this._getInputSceneIndex().getPrim(e);if(!t.dataSource||t.primType!==ke.skeleton)return!1;const n=Wn.new(this._getInputSceneIndex(),e,t.dataSource);return this._addDependenciesForResolvedSkeleton(e,n),this._pathToResolvedSkeleton.set(e,n),!0}_addDependenciesForResolvedSkeleton(e,t){for(const n of t.getAnimationSource())if(n!==""){let r=this._skelAnimPathToSkeletonPaths.get(n);r||this._skelAnimPathToSkeletonPaths.set(n,r=new Set),r.add(e)}for(const n of t.getInstancerPaths()){let r=this._instancerPathToSkeletonPaths.get(n);r||this._instancerPathToSkeletonPaths.set(n,r=new Set),r.add(e)}}_removeResolvedSkeleton(e){const t=this._pathToResolvedSkeleton.get(e);return t?(this._removeDependenciesForResolvedSkeleton(e,t),this._pathToResolvedSkeleton.delete(e),!0):!1}_removeDependenciesForResolvedSkeleton(e,t){if(t){for(const n of t.getAnimationSource())n!==""&&bo(n,e,this._skelAnimPathToSkeletonPaths);for(const n of t.getInstancerPaths())bo(n,e,this._instancerPathToSkeletonPaths)}}_refreshResolvedSkeletonDataSource(e){const t=this._pathToResolvedSkeleton.get(e);t||Vn(`Expected data source for resolved skeleton at ${e}.`),this._removeDependenciesForResolvedSkeleton(e,t);const n=this._getInputSceneIndex().getPrim(e);if(n.primType!==ke.skeleton){Vn(`Expected skeleton prim at ${e}.`),this._pathToResolvedSkeleton.delete(e);return}if(!n.dataSource){Vn(`Expected data source for prim at ${e}.`),this._pathToResolvedSkeleton.delete(e);return}const r=Wn.new(this._getInputSceneIndex(),e,n.dataSource);this._pathToResolvedSkeleton.set(e,r),this._addDependenciesForResolvedSkeleton(e,r)}}class em extends Vo{static{u(this,"UsdSkelImagingResolvingSceneIndexPlugin")}appendSceneIndex(e){let t=e;return t=Os.new(t),t=Ds.new(t),t}FlattenedDataSourceProviders(){return rt.new([E.getSchemaToken()],[lu.Make(uu)])}instanceDataSourceNames(){return[E.getSchemaToken()]}proxyPathTranslationDataSourceNames(){const e=[E.getSchemaToken()];return qt.isSkinningDeferred()?[E.getSchemaToken(),ge.getSchemaToken()]:e}}Vo.define("UsdSkelImagingResolvingSceneIndexPlugin",()=>new em);function $c(i){Ce.GetInstance().postError(new st(i,at.CodingError))}u($c,"TF_CODING_ERROR");function tm(i,e){return[...i,...e]}u(tm,"_ConcatenateAttributeNames");const So=new Map;function ji(i){let e=So.get(i.typeName);return e||(e=tm(yl.getSchemaAttributeNames(!1),i.getSchemaAttributeNames(!1)),So.set(i.typeName,e)),e}u(ji,"_GetStaticUsdAttributeNames");const nm=[];function im(i){return i.isA(Gi.typeName)?ji(Gi):i.isA(Li.typeName)?ji(Li):($c("Unsupported field type."),nm)}u(im,"_GetUsdAttributeNames");class Hs extends ce{static{u(this,"UsdImagingDataSourceFieldAsset")}constructor(e,t,n){super(),this._sceneIndexPath=e,this._usdPrim=t,this._stageGlobals=n}static new(e,t,n){return new Hs(e,t,n)}getNames(){return[...im(this._usdPrim)]}Get(e){const t=this._usdPrim.getAttr(e);if(t&&t.isValid())return Ho(t,this._stageGlobals,this._sceneIndexPath,jo.getDefaultLocator().append(e))}}class xn extends yn{static{u(this,"UsdImagingDataSourceFieldAssetPrim")}constructor(e,t,n){super(e,t,n)}static new(e,t,n){return new xn(e,t,n)}getNames(){const e=super.getNames();return e.push(ca.volumeField),e}Get(e){return e===ca.volumeField?Hs.new(this._getSceneIndexPath(),this._getUsdPrim(),this._getStageGlobals()):super.Get(e)}static invalidate(e,t,n,r){const s=yn.invalidate(e,t,n,r);let a;if(e.isA(Gi.typeName))a=ji(Gi);else if(e.isA(Li.typeName))a=ji(Li);else return $c("Unsupported field type."),s;for(const o of n)if(a.includes(o)){s.insert(jo.getDefaultLocator());break}return s}}const Qi=Object.freeze({field3dAsset:"field3dAsset",openvdbAsset:"openvdbAsset"});class rm extends wn{static{u(this,"UsdImagingOpenVDBAssetAdapter")}getImagingSubprims(e){return[""]}getImagingSubprimType(e,t){return t===""?Qi.openvdbAsset:""}getImagingSubprimData(e,t,n){if(t==="")return xn.new(e.path,e,n)}invalidateImagingSubprim(e,t,n,r){return t===""?xn.invalidate(e,t,n,r):new N}getPrimTypeToken(){return Qi.openvdbAsset}}class sm extends wn{static{u(this,"UsdImagingField3DAssetAdapter")}getImagingSubprims(e){return[""]}getImagingSubprimType(e,t){return t===""?Qi.field3dAsset:""}getImagingSubprimData(e,t,n){if(t==="")return xn.new(e.path,e,n)}invalidateImagingSubprim(e,t,n,r){return t===""?xn.invalidate(e,t,n,r):new N}getPrimTypeToken(){return Qi.field3dAsset}}Uo.registerTypes([{typeName:"UsdImagingOpenVDBAssetAdapter",isInternal:!0,primTypeName:"OpenVDBAsset",primAdapterFactory:u(()=>new rm,"primAdapterFactory")},{typeName:"UsdImagingField3DAssetAdapter",isInternal:!0,primTypeName:"Field3DAsset",primAdapterFactory:u(()=>new sm,"primAdapterFactory")}]);const am=new TextDecoder;class ss{static{u(this,"Stream")}dv;bytes;pos=0;constructor(e){this.bytes=e instanceof Uint8Array?e:new Uint8Array(e),this.dv=new DataView(this.bytes.buffer,this.bytes.byteOffset,this.bytes.byteLength)}eof(){return this.pos>=this.bytes.byteLength}skip(e){this.pos+=e}seek(e){this.pos=e}uint8(){return this.dv.getUint8(this.pos++)}int8(){return this.dv.getInt8(this.pos++)}bool(){return this.uint8()!==0}uint16(){const e=this.dv.getUint16(this.pos,!0);return this.pos+=2,e}int32(){const e=this.dv.getInt32(this.pos,!0);return this.pos+=4,e}uint32(){const e=this.dv.getUint32(this.pos,!0);return this.pos+=4,e}int64(){const e=this.dv.getBigInt64(this.pos,!0);return this.pos+=8,Number(e)}float32(){const e=this.dv.getFloat32(this.pos,!0);return this.pos+=4,e}float64(){const e=this.dv.getFloat64(this.pos,!0);return this.pos+=8,e}vec3d(){return[this.float64(),this.float64(),this.float64()]}coord(){return[this.int32(),this.int32(),this.int32()]}raw(e){const t=this.bytes.subarray(this.pos,this.pos+e);return this.pos+=e,t}string(){const e=this.uint32();return am.decode(this.raw(e))}}class om{static{u(this,"Metadata")}constructor(e,t){this.typeName=e,this.value=t}str(){return typeof this.value=="string"?this.value:typeof this.value=="boolean"?this.value?"true":"false":typeof this.value=="number"?yo(this.value,this.typeName):this.value instanceof Uint8Array?`<${this.value.byteLength} bytes>`:`[${this.value.map(e=>yo(e,this.typeName)).join(", ")}]`}}function yo(i,e){return Number.isInteger(i)?String(i):String(e==="float"||e==="vec3s"||e==="mat4s"?Number(i.toPrecision(6)):i)}u(yo,"formatNumber");function cm(i,e){const t=new ss(e);switch(i){case"string":return new TextDecoder().decode(e);case"bool":return t.bool();case"int32":return t.int32();case"int64":return t.int64();case"float":return t.float32();case"double":return t.float64();case"vec3i":return[t.int32(),t.int32(),t.int32()];case"vec3s":return[t.float32(),t.float32(),t.float32()];case"vec3d":return[t.float64(),t.float64(),t.float64()];case"vec2i":return[t.int32(),t.int32()];case"vec2s":return[t.float32(),t.float32()];case"vec2d":return[t.float64(),t.float64()];case"mat4s":{const n=[];for(let r=0;r<16;++r)n.push(t.float32());return n}case"mat4d":{const n=[];for(let r=0;r<16;++r)n.push(t.float64());return n}default:return e.slice()}}u(cm,"decode");function lm(i){const e=i.string(),t=i.string(),n=i.uint32(),r=i.raw(n);return{name:e,metadata:new om(t,cm(t,r))}}u(lm,"readMetadata");class Bc{static{u(this,"MetaMap")}meta=new Map;readMeta(e){this.meta.clear();const t=e.uint32();for(let n=0;n<t;++n){const{name:r,metadata:s}=lm(e);s.typeName.startsWith("__")||this.meta.set(r,s)}}getMetadata(e){return this.meta.get(e)}metaCount(){return this.meta.size}[Symbol.iterator](){return this.meta[Symbol.iterator]()}}const yi=134217729;function me(i,e,t){const n=yi*i-(yi*i-i),r=i-n,s=yi*e-(yi*e-e),a=e-s,o=i*e,c=r*a-(o-n*s-r*s-n*a),l=o+t,d=l-o,f=o-(l-d)+(t-d);return l+(c+f)}u(me,"fma");const um=new Float32Array(1);new Uint32Array(um.buffer);new TextDecoder;new TextDecoder;const Xt=1e-15,dm=Math.fround(1e-8);function Oe(i,e,t){return!(Math.abs(i-e)>t)}u(Oe,"isApproxEqual");function vr(i,e,t,n){if(!(Math.abs(i-e)>t))return!0;let r;return Math.abs(e)>Math.abs(i)?r=Math.abs((i-e)/e):r=Math.abs((i-e)/i),r<=n}u(vr,"isRelOrApproxEqual");function Yt(i,e,t=1e-7){return vr(i[0],e[0],t,t)&&vr(i[1],e[1],t,t)&&vr(i[2],e[2],t,t)}u(Yt,"vec3Eq");function Ei(i){return Math.sqrt(i[0]*i[0]+i[1]*i[1]+i[2]*i[2])}u(Ei,"vec3Length");function Ve(){return[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}u(Ve,"mat4Identity");function Fc(i){const e=Ve();return e[0]=i[0],e[5]=i[1],e[10]=i[2],e}u(Fc,"mat4Scale");function Ec(i){return[1,0,0,0,0,1,0,0,0,0,1,0,i[0],i[1],i[2],1]}u(Ec,"mat4Translation");function Us(i,e){const t=new Array(16);for(let n=0;n<4;n++){const r=4*n,s=i[r],a=i[r+1],o=i[r+2],c=i[r+3];t[r]=s*e[0]+a*e[4]+o*e[8]+c*e[12],t[r+1]=s*e[1]+a*e[5]+o*e[9]+c*e[13],t[r+2]=s*e[2]+a*e[6]+o*e[10]+c*e[14],t[r+3]=s*e[3]+a*e[7]+o*e[11]+c*e[15]}return t}u(Us,"mat4Mul");function as(i){return[i[0],i[1],i[2],i[4],i[5],i[6],i[8],i[9],i[10]]}u(as,"mat4GetMat3");function fm(i){return[i[12],i[13],i[14]]}u(fm,"mat4GetTranslation");function Gc(i,e){i[12]=e[0],i[13]=e[1],i[14]=e[2]}u(Gc,"mat4SetTranslation");function Yi(i,e,t=1e-8){for(let n=0;n<16;n++)if(!Oe(i[n],e[n],t))return!1;return!0}u(Yi,"mat4Eq");function Vs(i){return i[3]===0&&i[7]===0&&i[11]===0&&i[15]===1}u(Vs,"mat4IsAffine");function xo(i){const e=i.length===16?4:3;let t=0;for(let n=0;n<e;++n)for(let r=0;r<e;++r)n!==r&&(t+=Math.abs(i[n*e+r]));return Oe(t,0,Xt)}u(xo,"isDiagonal");function wr(i,e){return[i[0]*e[0]+i[1]*e[4]+i[2]*e[8]+e[12],i[0]*e[1]+i[1]*e[5]+i[2]*e[9]+e[13],i[0]*e[2]+i[1]*e[6]+i[2]*e[10]+e[14]]}u(wr,"vec3MulMat4");function vo(i,e){const t=e[0]*i[3]+e[1]*i[7]+e[2]*i[11]+i[15];return t!==0?[(e[0]*i[0]+e[1]*i[4]+e[2]*i[8]+i[12])/t,(e[0]*i[1]+e[1]*i[5]+e[2]*i[9]+i[13])/t,(e[0]*i[2]+e[1]*i[6]+e[2]*i[10]+i[14])/t]:[0,0,0]}u(vo,"mat4TransformH");function ze(i,e){return Us(Ec(e),i)}u(ze,"mat4PreTranslate");function Pr(i,e){for(let t=0;t<4;t++)i[t]=i[t]*e[0],i[4+t]=i[4+t]*e[1],i[8+t]=i[8+t]*e[2]}u(Pr,"mat4PreScale");var Ot=(i=>(i[i.X=0]="X",i[i.Y=1]="Y",i[i.Z=2]="Z",i))(Ot||{});function sn(i,e,t){const n=Math.cos(t),r=-Math.sin(t);switch(e){case 0:{const s=n*i[4]-r*i[8],a=n*i[5]-r*i[9],o=n*i[6]-r*i[10],c=n*i[7]-r*i[11];i[8]=r*i[4]+n*i[8],i[9]=r*i[5]+n*i[9],i[10]=r*i[6]+n*i[10],i[11]=r*i[7]+n*i[11],i[4]=s,i[5]=a,i[6]=o,i[7]=c;break}case 1:{const s=n*i[0]+r*i[8],a=n*i[1]+r*i[9],o=n*i[2]+r*i[10],c=n*i[3]+r*i[11];i[8]=-r*i[0]+n*i[8],i[9]=-r*i[1]+n*i[9],i[10]=-r*i[2]+n*i[10],i[11]=-r*i[3]+n*i[11],i[0]=s,i[1]=a,i[2]=o,i[3]=c;break}case 2:{const s=n*i[0]-r*i[4],a=n*i[1]-r*i[5],o=n*i[2]-r*i[6],c=n*i[3]-r*i[7];i[4]=r*i[0]+n*i[4],i[5]=r*i[1]+n*i[5],i[6]=r*i[2]+n*i[6],i[7]=r*i[3]+n*i[7],i[0]=s,i[1]=a,i[2]=o,i[3]=c;break}}}u(sn,"mat4PreRotate");function ir(i,e=0){const t=u((p,m)=>i[p*4+m],"m"),n=t(0,0)*t(1,1),r=t(0,0)*t(1,2),s=t(0,1)*t(1,0),a=t(0,2)*t(1,0),o=t(0,1)*t(2,0),c=t(0,2)*t(2,0);let l=n*t(2,2)-r*t(2,1)-s*t(2,2)+a*t(2,1)+o*t(1,2)-c*t(1,1);if(t(0,3)!==0||t(1,3)!==0||t(2,3)!==0||t(3,3)!==1)throw new Error("Mat4 inverse of a perspective matrix is not ported");const f=l*t(3,3);if(Oe(f,0,e))throw new Error("Inversion of singular 4x4 matrix");if(Oe(l,0,1e-8)){const p=Ve();if(!hm(i,p,e))throw new Error("Inversion of singular 4x4 matrix");return p}l=1/l;const h=new Array(16).fill(0);return h[0]=l*(t(1,1)*t(2,2)-t(1,2)*t(2,1)),h[1]=l*(-t(0,1)*t(2,2)+t(0,2)*t(2,1)),h[2]=l*(t(0,1)*t(1,2)-t(0,2)*t(1,1)),h[4]=l*(-t(1,0)*t(2,2)+t(1,2)*t(2,0)),h[5]=l*(t(0,0)*t(2,2)-c),h[6]=l*(a-r),h[8]=l*(t(1,0)*t(2,1)-t(1,1)*t(2,0)),h[9]=l*(o-t(0,0)*t(2,1)),h[10]=l*(n-s),h[12]=-(t(3,0)*h[0]+t(3,1)*h[4]+t(3,2)*h[8]),h[13]=-(t(3,0)*h[1]+t(3,1)*h[5]+t(3,2)*h[9]),h[14]=-(t(3,0)*h[2]+t(3,1)*h[6]+t(3,2)*h[10]),h[3]=0,h[7]=0,h[11]=0,h[15]=1,h}u(ir,"mat4Inverse");function hm(i,e,t){const n=[...i];for(let s=0;s<16;s++)e[s]=s%5===0?1:0;let r=1;for(let s=0;s<4;++s){let a=s,o=Math.abs(n[s*4+s]);for(let l=s+1;l<4;++l)Math.abs(n[l*4+s])>o&&(a=l,o=Math.abs(n[l*4+s]));if(o===0)return!1;if(a!==s){r=-r;for(let l=0;l<4;++l){let d=n[a*4+l];n[a*4+l]=n[s*4+l],n[s*4+l]=d,d=e[a*4+l],e[a*4+l]=e[s*4+l],e[s*4+l]=d}}const c=n[s*4+s];r*=c;for(let l=0;l<4;++l)n[s*4+l]=n[s*4+l]/c,e[s*4+l]=e[s*4+l]/c;for(let l=s+1;l<4;++l){const d=n[l*4+s];if(d!==0)for(let f=0;f<4;++f)n[l*4+f]=n[l*4+f]-n[s*4+f]*d,e[l*4+f]=e[l*4+f]-e[s*4+f]*d}}for(let s=3;s>0;--s)for(let a=0;a<s;++a){const o=n[a*4+s];if(o!==0)for(let c=0;c<4;++c)e[a*4+c]=e[a*4+c]-e[s*4+c]*o}return r*r>=t*t}u(hm,"mat4Invert");function wo(i){return[i[0],0,0,0,i[1],0,0,0,i[2]]}u(wo,"mat3Scale");function xi(i,e){const t=new Array(9);for(let n=0;n<3;n++){const r=3*n;for(let s=0;s<3;s++)t[r+s]=i[r]*e[s]+i[r+1]*e[3+s]+i[r+2]*e[6+s]}return t}u(xi,"mat3Mul");function pm(i){return[i[4]*i[8]-i[5]*i[7],i[2]*i[7]-i[1]*i[8],i[1]*i[5]-i[2]*i[4],i[5]*i[6]-i[3]*i[8],i[0]*i[8]-i[2]*i[6],i[2]*i[3]-i[0]*i[5],i[3]*i[7]-i[4]*i[6],i[1]*i[6]-i[0]*i[7],i[0]*i[4]-i[1]*i[3]]}u(pm,"mat3Adjoint");function mm(i,e=0){const t=pm(i),n=t[0]*i[0]+t[1]*i[3]+t[2]*i[6];if(Oe(n,0,e))throw new Error("Inversion of singular 3x3 matrix");const r=1/n;return t.map(s=>s*r)}u(mm,"mat3Inverse");function Lc(i){const e=i[4]*i[8]-i[5]*i[7],t=i[5]*i[6]-i[3]*i[8],n=i[3]*i[7]-i[4]*i[6];return i[0]*e+i[1]*t+i[2]*n}u(Lc,"mat3Det");function gm(i,e,t=1e-8){for(let n=0;n<9;n++)if(!Oe(i[n],e[n],t))return!1;return!0}u(gm,"mat3Eq");function Tr(i,e){return[i[0]*e[0]+i[1]*e[3]+i[2]*e[6],i[0]*e[1]+i[1]*e[4]+i[2]*e[7],i[0]*e[2]+i[1]*e[5]+i[2]*e[8]]}u(Tr,"vec3MulMat3");function kr(i,e){const t=Ei(i);if(Oe(t,0,0))throw new Error("Normalizing null 3-vector");const n=[i[0]/t,i[1]/t,i[2]/t],r=Math.cos(e),s=Math.sin(e),a=1-r,o=new Array(9);o[0]=n[0]*n[0]*a+r,o[4]=n[1]*n[1]*a+r,o[8]=n[2]*n[2]*a+r;const c=n[0]*n[1]*a,l=n[2]*s,d=n[0]*n[2]*a,f=n[1]*s,h=n[1]*n[2]*a,p=n[0]*s;return o[1]=c+l,o[3]=c-l,o[2]=d-f,o[6]=d+f,o[5]=h+p,o[7]=h-p,o}u(kr,"mat3RotationAxis");function _m(i,e=1e-8){const t=u((a,o)=>i[a*3+o],"at");let n,r,s;return Oe(t(2,0),1,e)?(r=Math.PI/2,n=.5*Math.atan2(t(1,2),t(1,1)),s=n):Oe(t(2,0),-1,e)?(r=-Math.PI/2,n=.5*Math.atan2(t(1,2),t(1,1)),s=-n):(s=Math.atan2(-t(1,0),t(0,0)),n=Math.atan2(-t(2,1),t(2,2)),r=Math.atan2(t(2,0),Math.sqrt(t(2,1)*t(2,1)+t(2,2)*t(2,2)))),[n,r,s]}u(_m,"eulerAnglesXYZ");function Ac(i){const e=i[0]*i[1]*i[2];if(Math.abs(e)<3*Xt)throw new Error("Non-zero scale values required");const t=[1/i[0],1/i[1],1/i[2]];return[[Math.abs(i[0]),Math.abs(i[1]),Math.abs(i[2])],t,[t[0]*t[0],t[1]*t[1],t[2]*t[2]],[t[0]/2,t[1]/2,t[2]/2]]}u(Ac,"scaleDerived");class yt{static{u(this,"ScaleMap")}constructor(e,t,n,r,s,a){this.type=e,this.scaleValues=t,this.voxelSizeValues=n,this.scaleValuesInverse=r,this.invScaleSqr=s,this.invTwiceScale=a}static read(e,t){return new yt(t,e.vec3d(),e.vec3d(),e.vec3d(),e.vec3d(),e.vec3d())}static create(e,t="ScaleMap"){return new yt(t,[...e],...Ac(e))}isLinear(){return!0}getAffineMap(){return it.fromMat4(Fc(this.scaleValues))}isEqual(e){return e.type===this.type&&e instanceof yt&&Yt(this.scaleValues,e.scaleValues)}applyMap(e){return[e[0]*this.scaleValues[0],e[1]*this.scaleValues[1],e[2]*this.scaleValues[2]]}applyInverseMap(e){return[e[0]*this.scaleValuesInverse[0],e[1]*this.scaleValuesInverse[1],e[2]*this.scaleValuesInverse[2]]}voxelSize(){return[...this.voxelSizeValues]}getAffineMat4(){const[e,t,n]=this.scaleValues;return[e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1]}}class Qt{static{u(this,"ScaleTranslateMap")}constructor(e,t,n){this.type=e,this.translation=t,this.scale=n}static read(e,t){const n=e.vec3d();return new Qt(t,n,yt.read(e,t))}static create(e,t,n="ScaleTranslateMap"){return new Qt(n,[...t],new yt(n,[...e],...Ac(e)))}isLinear(){return!0}getAffineMap(){return it.fromMat4(Us(Fc(this.scale.scaleValues),Ec(this.translation)))}isEqual(e){return e.type===this.type&&e instanceof Qt&&Yt(this.scale.scaleValues,e.scale.scaleValues)&&Yt(this.translation,e.translation)}applyMap(e){const t=this.scale.applyMap(e);return[t[0]+this.translation[0],t[1]+this.translation[1],t[2]+this.translation[2]]}applyInverseMap(e){return this.scale.applyInverseMap([e[0]-this.translation[0],e[1]-this.translation[1],e[2]-this.translation[2]])}voxelSize(){return this.scale.voxelSize()}getAffineMat4(){const e=this.scale.getAffineMat4();return e[12]=this.translation[0],e[13]=this.translation[1],e[14]=this.translation[2],e}}class Ki{static{u(this,"TranslationMap")}constructor(e){this.translation=e}type="TranslationMap";static read(e){return new Ki(e.vec3d())}isLinear(){return!0}getAffineMap(){const e=Ve();return Gc(e,this.translation),it.fromMat4(e)}isEqual(e){return e instanceof Ki&&Yt(this.translation,e.translation)}applyMap(e){return[e[0]+this.translation[0],e[1]+this.translation[1],e[2]+this.translation[2]]}applyInverseMap(e){return[e[0]-this.translation[0],e[1]-this.translation[1],e[2]-this.translation[2]]}voxelSize(){return[1,1,1]}getAffineMat4(){return[1,0,0,0,0,1,0,0,0,0,1,0,...this.translation,1]}}class it{static{u(this,"AffineMap")}constructor(e,t){this.type=e,this.mat4=t,this.inv=bm(t)}inv;upstreamInv=null;static read(e,t){const n=[];for(let r=0;r<16;++r)n.push(e.float64());return new it(t,n)}static fromMat4(e){if(!Vs(e))throw new Error("Tried to initialize an affine transform from a non-affine 4x4 matrix");if(Math.abs(Lc(as(e)))<3*Xt)throw new Error("Tried to initialize an affine transform from a nearly singular matrix");return new it("AffineMap",[...e])}isLinear(){return!0}getAffineMap(){return it.fromMat4(this.mat4)}matrixInverse(){return this.upstreamInv??=ir(this.mat4)}isScale(){return xo(this.mat4)}isScaleTranslate(){return xo(as(this.mat4))}isEqual(e){return e instanceof it&&e.type===this.type&&Yi(this.mat4,e.mat4)&&Yi(this.matrixInverse(),e.matrixInverse())}applyMap(e){const t=this.mat4;return[me(e[0],t[0],me(e[1],t[4],me(e[2],t[8],t[12]))),me(e[0],t[1],me(e[1],t[5],me(e[2],t[9],t[13]))),me(e[0],t[2],me(e[1],t[6],me(e[2],t[10],t[14])))]}applyInverseMap(e){const t=this.inv;return[me(e[0],t[0],me(e[1],t[4],me(e[2],t[8],t[12]))),me(e[0],t[1],me(e[1],t[5],me(e[2],t[9],t[13]))),me(e[0],t[2],me(e[1],t[6],me(e[2],t[10],t[14])))]}voxelSize(){const e=this.applyMap([0,0,0]),t=this.applyMap([1,0,0]),n=this.applyMap([0,1,0]),r=this.applyMap([0,0,1]),s=u(a=>Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]),"len");return[s([t[0]-e[0],t[1]-e[1],t[2]-e[2]]),s([n[0]-e[0],n[1]-e[1],n[2]-e[2]]),s([r[0]-e[0],r[1]-e[1],r[2]-e[2]])]}getAffineMat4(){return[...this.mat4]}}function bm(i){const e=i[0],t=i[1],n=i[2],r=i[4],s=i[5],a=i[6],o=i[8],c=i[9],l=i[10],d=e*(s*l-a*c)-t*(r*l-a*o)+n*(r*c-s*o);if(d===0)throw new Error("AffineMap is singular");const f=1/d,h=[(s*l-a*c)*f,(n*c-t*l)*f,(t*a-n*s)*f,(a*o-r*l)*f,(e*l-n*o)*f,(n*r-e*a)*f,(r*c-s*o)*f,(t*o-e*c)*f,(e*s-t*r)*f],p=i[12],m=i[13],g=i[14];return[h[0],h[1],h[2],0,h[3],h[4],h[5],0,h[6],h[7],h[8],0,-(p*h[0]+m*h[3]+g*h[6]),-(p*h[1]+m*h[4]+g*h[7]),-(p*h[2]+m*h[5]+g*h[8]),1]}u(bm,"invert4x4Affine");function Sm(i){const e=i.mat4;if(i.isScale()){const t=wr([1,1,1],e);return Oe(t[0],t[1],Xt)&&Oe(t[0],t[2],Xt)?yt.create([t[0],t[0],t[0]],"UniformScaleMap"):yt.create(t,"ScaleMap")}else if(i.isScaleTranslate()){const t=wr([0,0,0],e),n=wr([1,1,1],e),r=[n[0]-t[0],n[1]-t[1],n[2]-t[2]];return Oe(r[0],r[1],Xt)&&Oe(r[0],r[2],Xt)?Qt.create([r[0],r[0],r[0]],t,"UniformScaleTranslateMap"):Qt.create(r,t,"ScaleTranslateMap")}return i}u(Sm,"simplify");function ym(i){const e=i.string();switch(e){case"UniformScaleMap":case"ScaleMap":return yt.read(i,e);case"UniformScaleTranslateMap":case"ScaleTranslateMap":return Qt.read(i,e);case"TranslationMap":return Ki.read(i);case"AffineMap":case"UnitaryMap":return it.read(i,e);default:throw new Error(`Map type ${e} is not implemented (NonlinearFrustumMap is a documented gap)`)}}u(ym,"readMap");class Qn{static{u(this,"Transform")}constructor(e){this.baseMap=e}static read(e){return new Qn(ym(e))}static createLinearTransform(e){return new Qn(Sm(it.fromMat4(e)))}mapType(){return this.baseMap.type}isLinear(){return this.baseMap.isLinear()}equals(e){return Yt(this.voxelSize(),e.voxelSize())?this.mapType()===e.mapType()?this.baseMap.isEqual(e.baseMap):this.isLinear()&&e.isLinear()?this.baseMap.getAffineMap().isEqual(e.baseMap.getAffineMap()):this.baseMap.isEqual(e.baseMap):!1}indexToWorld(e){return this.baseMap.applyMap(e)}worldToIndex(e){return this.baseMap.applyInverseMap(e)}voxelSize(){return this.baseMap.voxelSize()}}const Rc=new Float32Array(1),xm=new Uint32Array(Rc.buffer);function vm(i){const e=(i&32768)<<16,t=i>>10&31,n=i&1023;let r;if(t===0)if(n===0)r=e;else{let s=-1,a=n;do++s,a<<=1;while((a&1024)===0);r=e|112-s<<23|(a&1023)<<13}else t===31?r=e|2139095040|n<<13:r=e|t-15+127<<23|n<<13;return xm[0]=r,Rc[0]}u(vm,"halfToFloat");const wm=2,Pm=16,vi=16,Tm=16,km=128,Po=0,Im=1;function Cm(i,e,t,n){let r=0,s=t;const a=t+n;for(;r<i.length&&s<a;){const o=i[r++];let c=o>>4&15;if(c===15){let h;do h=i[r++],c+=h;while(h===255)}if(e.set(i.subarray(r,r+c),s),r+=c,s+=c,r>=i.length)break;const l=i[r]|i[r+1]<<8;r+=2;let d=(o&15)+4;if(d-4===15){let h;do h=i[r++],d+=h;while(h===255)}let f=s-l;for(let h=0;h<d;h++)e[s++]=e[f++]}if(s!==a)throw new Error(`LZ4 block decoded ${s-t} bytes, expected ${n}`)}u(Cm,"lz4DecompressBlock");function To(i,e,t,n,r){const s=Math.floor(e/i),a=e-s*i;for(let o=0;o<i;++o){const c=o*s;for(let l=0;l<s;++l)n[r+l*i+o]=t[c+l]}for(let o=0;o<a;++o)n[r+s*i+o]=t[s*i+o]}u(To,"unshuffle");function Dm(i,e){if(i.length<vi)throw new Error("Blosc chunk shorter than its header");const t=new DataView(i.buffer,i.byteOffset,i.byteLength),n=i[2],r=i[3],s=t.getUint32(4,!0),a=t.getUint32(8,!0);if(s!==e)throw new Error(`Blosc chunk holds ${s} bytes, expected ${e}`);const o=new Uint8Array(s);if(n&wm)return o.set(i.subarray(vi,vi+s)),o;const c=n>>5&7;if(c!==Im&&c!==Po)throw new Error(`Blosc compressor code ${c} not supported (OpenVDB writes LZ4)`);if(c===Po)throw new Error("Blosc blosclz codec not supported (OpenVDB writes LZ4)");const l=(n&1)!==0&&r>1,d=(n&Pm)!==0,f=Math.ceil(s/a),h=s%a,p=[];for(let g=0;g<f;++g)p.push(t.getInt32(vi+4*g,!0));const m=new Uint8Array(a);for(let g=0;g<f;++g){const _=g===f-1&&h>0,b=_?h:a,y=!d&&r<=Tm&&Math.floor(a/r)>=km&&!_?r:1,S=Math.floor(b/y);let x=p[g];for(let T=0;T<y;++T){const C=t.getInt32(x,!0);x+=4,C===S?m.set(i.subarray(x,x+S),T*S):Cm(i.subarray(x,x+C),m,T*S,S),x+=C}l&&y===r||l?To(r,b,m,o,g*a):o.set(m.subarray(0,b),g*a)}return o}u(Dm,"bloscDecompress");const $m=0,Mc=1,Nc=2,Oc=4,Bm=0,Fm=2,Em=3,ko=4,Ir=5,Gm=6;function Lm(i){if(i===$m)return"none";const e=[];return i&Mc&&e.push("zip"),i&Nc&&e.push("active values"),i&Oc&&e.push("blosc"),e.join(" + ")}u(Lm,"compressionToString");async function Am(i,e){const t=new Blob([i]).stream().pipeThrough(new DecompressionStream("deflate")),n=new Uint8Array(await new Response(t).arrayBuffer());if(n.byteLength!==e)throw new Error(`zlib inflate produced ${n.byteLength} bytes, expected ${e}`);return n}u(Am,"inflate");async function Rm(i,e,t){if(t&Oc){const n=i.int64();if(n<=0){if(-n!==e)throw new Error(`expected a ${e}-byte chunk, got ${-n}`);return i.raw(e)}return Dm(i.raw(n),e)}if(t&Mc){const n=i.int64();if(n<=0){if(-n!==e)throw new Error(`expected a ${e}-byte chunk, got ${-n}`);return i.raw(e)}return Am(i.raw(n),e)}return i.raw(e)}u(Rm,"readData");function Mm(i){let e=0;for(let t=0;t<i.length;++t){let n=i[t];n=n-(n>>>1&1431655765),n=(n&858993459)+(n>>>2&858993459),e+=(n+(n>>>4)&252645135)*16843009>>>24}return e}u(Mm,"maskCountOn");function z(i,e){return(i[e>>>5]&1<<(e&31))!==0}u(z,"maskIsOn");function Ln(i,e){const t=i.raw(e>>>3),n=new Uint32Array(e>>>5),r=new DataView(t.buffer,t.byteOffset,t.byteLength);for(let s=0;s<n.length;++s)n[s]=r.getUint32(s<<2,!0);return n}u(Ln,"readMask");function Nm(i,e,t,n){const r=new Float32Array(e*t),s=new DataView(i.buffer,i.byteOffset,i.byteLength);if(n)for(let a=0;a<r.length;++a)r[a]=vm(s.getUint16(a<<1,!0));else for(let a=0;a<r.length;++a)r[a]=s.getFloat32(a<<2,!0);return r}u(Nm,"decodePayload");async function Io(i,e,t,n,r,s,a){const o=(s&Nc)!==0,c=i.int8(),l=new Float32Array(t),d=new Float32Array(t);for(let b=0;b<t;++b)l[b]=Math.fround(r[b]),d[b]=c===Bm?Math.fround(r[b]):-Math.fround(r[b]);if(c===Fm||c===ko||c===Ir){for(let b=0;b<t;++b)d[b]=i.float32();if(c===Ir)for(let b=0;b<t;++b)l[b]=i.float32()}let f=null;(c===Em||c===ko||c===Ir)&&(f=Ln(i,e));const h=o&&c!==Gm?Mm(n):e,p=t*(a?2:4),m=a&&h<1?new Uint8Array(0):await Rm(i,h*p,s),g=Nm(m,h,t,a);if(!o||h===e)return g;const _=new Float32Array(e*t);for(let b=0,y=0;b<e;++b)if(z(n,b)){for(let S=0;S<t;++S)_[b*t+S]=g[y*t+S];++y}else{const S=f!==null&&z(f,b)?l:d;for(let x=0;x<t;++x)_[b*t+x]=S[x]}return _}u(Io,"readCompressedValues");const Ji=4,ae=5,Lt=3,xt=7,Om=12,Bt=512,fn=4096,hn=32768;class Ee{static{u(this,"VdbTree")}constructor(e){this.comps=e,this.background=new Float32Array(e)}background;tiles=new Map;children=new Map;leaves=[];static rootKey(e){return`${e[0]&-4096},${e[1]&-4096},${e[2]&-4096}`}async readTopology(e,t,n){if(e.int32()!==1)throw new Error("multi-buffer trees are no longer supported");for(let o=0;o<this.comps;++o)this.background[o]=e.float32();const s=e.uint32(),a=e.uint32();for(let o=0;o<s;++o){const c=e.coord(),l=new Float32Array(this.comps);for(let f=0;f<this.comps;++f)l[f]=e.float32();const d=e.bool();this.tiles.set(Ee.rootKey(c),{origin:c,tile:{value:l,active:d}})}for(let o=0;o<a;++o){const c=e.coord(),l=await this.readInternalTopology(e,c,ae,t,n);this.children.set(Ee.rootKey(c),{origin:c,child:l})}}async readInternalTopology(e,t,n,r,s){const a=n===ae?hn:fn,o=Ln(e,a),c=Ln(e,a),l=await Io(e,a,this.comps,c,this.background,r,s),d={origin:t,log2dim:n,childMask:o,valueMask:c,values:l,children:new Array(a).fill(null)},f=n===ae?xt:Lt;for(let h=0;h<a;++h){if(!z(o,h))continue;const p=Dr(d,h,f);if(n===ae)d.children[h]=await this.readInternalTopology(e,p,Ji,r,s);else{const m={origin:p,valueMask:Ln(e,Bt),buffer:new Float32Array(Bt*this.comps)};this.leaves.push(m),d.children[h]=m}}return d}async readBuffers(e,t,n){for(const r of this.leaves)r.valueMask=Ln(e,Bt),r.buffer=await Io(e,Bt,this.comps,r.valueMask,this.background,t,n)}getValue(e){const t=this.children.get(Ee.rootKey(e));if(t)return Uc(t.child,e,this.comps);const n=this.tiles.get(Ee.rootKey(e));return n?n.tile.value:this.background}isActive(e){const t=this.children.get(Ee.rootKey(e));if(t)return Vc(t.child,e);const n=this.tiles.get(Ee.rootKey(e));return n?n.tile.active:!1}leafCount(){return this.leaves.length}activeVoxelCount(){let e=0;for(const t of this.leaves)e+=Hm(t.valueMask);for(const{child:t}of this.children.values())e+=Hc(t);for(const{tile:t}of this.tiles.values())t.active&&(e+=4096**3);return e}isValueOn(e){return this.isActive(e)}probeValue(e,t,n=0){const r=Ee.rootKey(e),s=this.children.get(r);if(s)return qc(s.child,e,this.comps,t,n);const a=this.tiles.get(r);return a?(t.set(a.tile.value,n),a.tile.active):(t.set(this.background,n),!1)}setValueOn(e,t){const n=this.rootChildForWrite(e,t,!0);n&&cs(this,n,e,t,!0,null)}setValueOff(e,t){const n=this.rootChildForWrite(e,t,!1);n&&cs(this,n,e,t,!1,null)}rootChildForWrite(e,t,n){const r=Ee.rootKey(e),s=this.children.get(r);if(s)return s.child;const a=this.tiles.get(r);if(!a){if(!n&&zn(this.background,t,this.comps))return null;const d=os(e,ae,this.background,!1,this.comps);return this.children.set(r,{origin:d.origin,child:d}),d}const o=a.tile;if(!(n?!o.active||!zn(o.value,t,this.comps):o.active||!zn(o.value,t,this.comps)))return null;const l=os(e,ae,o.value,o.active,this.comps);return this.tiles.delete(r),this.children.set(r,{origin:l.origin,child:l}),l}setBackground(e){this.background=Float32Array.from(e)}rootEntries(){return[...this.children.values(),...this.tiles.values()].sort((t,n)=>t.origin[0]-n.origin[0]||t.origin[1]-n.origin[1]||t.origin[2]-n.origin[2])}leafNodesInOrder(){const e=[],t=u(n=>{const r=n.log2dim===ae?hn:fn;for(let s=0;s<r;++s){if(!z(n.childMask,s))continue;const a=n.children[s];"log2dim"in a?t(a):e.push(a)}},"visit");for(const n of this.rootEntries())"child"in n&&t(n.child);return e}forEachTile(e){const t=this.comps,n=u(r=>{const s=r.log2dim===ae?xt:Lt,a=r.log2dim===ae?hn:fn;for(let o=0;o<a;++o)if(z(r.childMask,o)){const c=r.children[o];"log2dim"in c&&n(c)}else e(Dr(r,o,s),1<<s,r.values.subarray(o*t,(o+1)*t),z(r.valueMask,o))},"visit");for(const r of this.rootEntries())"child"in r?n(r.child):e(r.origin,4096,r.tile.value,r.tile.active)}copy(){const e=new Ee(this.comps);e.background=Float32Array.from(this.background);const t=u(n=>({origin:[...n.origin],log2dim:n.log2dim,childMask:Uint32Array.from(n.childMask),valueMask:Uint32Array.from(n.valueMask),values:Float32Array.from(n.values),children:n.children.map(r=>{if(!r)return null;if("log2dim"in r)return t(r);const s={origin:[...r.origin],valueMask:Uint32Array.from(r.valueMask),buffer:Float32Array.from(r.buffer)};return e.leaves.push(s),s})}),"copyNode");for(const n of this.rootEntries()){const r=Ee.rootKey(n.origin);"child"in n?e.children.set(r,{origin:[...n.origin],child:t(n.child)}):e.tiles.set(r,{origin:[...n.origin],tile:{value:Float32Array.from(n.tile.value),active:n.tile.active}})}return e}evalActiveVoxelBoundingBox(){const e={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const n of this.leaves)for(let r=0;r<Bt;++r){if(!z(n.valueMask,r))continue;const s=n.origin[0]+(r>>6),a=n.origin[1]+(r>>3&7),o=n.origin[2]+(r&7);Cr(e,s,a,o,s,a,o)}const t=u(n=>{const r=n.log2dim===ae?xt:Lt,s=n.log2dim===ae?hn:fn,a=1<<r;for(let o=0;o<s;++o)if(z(n.childMask,o)){const c=n.children[o];"log2dim"in c&&t(c)}else if(z(n.valueMask,o)){const c=Dr(n,o,r);Cr(e,c[0],c[1],c[2],c[0]+a-1,c[1]+a-1,c[2]+a-1)}},"expandTiles");for(const{child:n}of this.children.values())t(n);for(const{origin:n,tile:r}of this.tiles.values())r.active&&Cr(e,n[0],n[1],n[2],n[0]+4095,n[1]+4095,n[2]+4095);return e}}function Cr(i,e,t,n,r,s,a){e<i.min[0]&&(i.min[0]=e),t<i.min[1]&&(i.min[1]=t),n<i.min[2]&&(i.min[2]=n),r>i.max[0]&&(i.max[0]=r),s>i.max[1]&&(i.max[1]=s),a>i.max[2]&&(i.max[2]=a)}u(Cr,"expand");function Hm(i){let e=0;for(let t=0;t<i.length;++t){let n=i[t];n=n-(n>>>1&1431655765),n=(n&858993459)+(n>>>2&858993459),e+=(n+(n>>>4)&252645135)*16843009>>>24}return e}u(Hm,"popcount");function Hc(i){const e=i.log2dim===ae?xt:Lt,t=i.log2dim===ae?hn:fn;let n=0;for(let r=0;r<t;++r)if(z(i.childMask,r)){const s=i.children[r];"log2dim"in s&&(n+=Hc(s))}else z(i.valueMask,r)&&(n+=(1<<e)**3);return n}u(Hc,"internalActiveTileVoxels");function ni(i,e){return i.log2dim===ae?((e[0]&4095)>>xt<<2*ae|(e[1]&4095)>>xt<<ae|(e[2]&4095)>>xt)>>>0:((e[0]&127)>>Lt<<2*Ji|(e[1]&127)>>Lt<<Ji|(e[2]&127)>>Lt)>>>0}u(ni,"internalCoordToOffset");function Dr(i,e,t){const n=i.log2dim,r=(1<<n)-1,s=e>>2*n<<t,a=(e>>n&r)<<t,o=(e&r)<<t,c=~((1<<t+n)-1);return[(i.origin[0]&c)+s,(i.origin[1]&c)+a,(i.origin[2]&c)+o]}u(Dr,"offsetToGlobalCoord");function Kt(i){return((i[0]&7)<<6|(i[1]&7)<<3|i[2]&7)>>>0}u(Kt,"leafCoordToOffset");function Uc(i,e,t){const n=ni(i,e);if(z(i.childMask,n)){const r=i.children[n];return"log2dim"in r?Uc(r,e,t):r.buffer.subarray(Kt(e)*t,(Kt(e)+1)*t)}return i.values.subarray(n*t,(n+1)*t)}u(Uc,"internalGetValue");function Vc(i,e){const t=ni(i,e);if(z(i.childMask,t)){const n=i.children[t];return"log2dim"in n?Vc(n,e):z(n.valueMask,Kt(e))}return z(i.valueMask,t)}u(Vc,"internalIsActive");function zn(i,e,t){for(let n=0;n<t;++n)if(i[n]!==e[n])return!1;return!0}u(zn,"valuesExactlyEqual");function os(i,e,t,n,r){const s=e===ae?Om:xt,a=e===ae?hn:fn,o=~((1<<s)-1),c=new Float32Array(a*r);for(let d=0;d<a;++d)for(let f=0;f<r;++f)c[d*r+f]=t[f];const l=new Uint32Array(a>>>5);return n&&l.fill(4294967295),{origin:[i[0]&o,i[1]&o,i[2]&o],log2dim:e,childMask:new Uint32Array(a>>>5),valueMask:l,values:c,children:new Array(a).fill(null)}}u(os,"newInternalNode");function Um(i,e,t,n){const r=new Float32Array(Bt*n);if(n===1)r.fill(e[0]);else for(let a=0;a<Bt;++a)for(let o=0;o<n;++o)r[a*n+o]=e[o];const s=new Uint32Array(Bt>>>5);return t&&s.fill(4294967295),{origin:[i[0]&-8,i[1]&-8,i[2]&-8],valueMask:s,buffer:r}}u(Um,"newLeafNode");function Co(i){return Kt(i)}u(Co,"leafOffset");function Wc(i,e){i[e>>>5]=i[e>>>5]|1<<(e&31)}u(Wc,"setMaskOn");function zc(i,e){i[e>>>5]=i[e>>>5]&~(1<<(e&31))}u(zc,"setMaskOff");function cs(i,e,t,n,r,s){const a=i.comps;for(;;){const o=ni(e,t);let c=e.children[o]??null;if(!z(e.childMask,o)){const d=z(e.valueMask,o),f=e.values.subarray(o*a,(o+1)*a);if(!(r?!d||!zn(f,n,a):d||!zn(f,n,a)))return;e.log2dim===ae?c=os(t,Ji,f,d,a):(c=Um(t,f,d,a),i.leaves.push(c)),Wc(e.childMask,o),zc(e.valueMask,o),e.children[o]=c}if("log2dim"in c){s?.insertInternal(c),e=c;continue}const l=c;s?.insertLeaf(l),Xc(l,t,n,r,a);return}}u(cs,"internalSetValue");function Xc(i,e,t,n,r){const s=Kt(e);if(r===1)i.buffer[s]=t[0];else for(let a=0;a<r;++a)i.buffer[s*r+a]=t[a];n?Wc(i.valueMask,s):zc(i.valueMask,s)}u(Xc,"leafSetValue");function qc(i,e,t,n,r,s=null){for(;;){const a=ni(i,e);if(z(i.childMask,a)){const o=i.children[a];if("log2dim"in o){s?.insertInternal(o),i=o;continue}s?.insertLeaf(o);const c=Kt(e);if(t===1)n[r]=o.buffer[c];else for(let l=0;l<t;++l)n[r+l]=o.buffer[c*t+l];return z(o.valueMask,c)}if(t===1)n[r]=i.values[a];else for(let o=0;o<t;++o)n[r+o]=i.values[a*t+o];return z(i.valueMask,a)}}u(qc,"internalProbeValue");function Vm(i,e,t=null){for(;;){const n=ni(i,e);if(!z(i.childMask,n))return z(i.valueMask,n);const r=i.children[n];if("log2dim"in r){t?.insertInternal(r),i=r;continue}return t?.insertLeaf(r),z(r.valueMask,Kt(e))}}u(Vm,"internalIsValueOn");var Ws=(i=>(i[i.Unknown=0]="Unknown",i[i.LevelSet=1]="LevelSet",i[i.FogVolume=2]="FogVolume",i[i.Staggered=3]="Staggered",i))(Ws||{});const Wm={0:"unknown",1:"level set",2:"fog volume",3:"staggered"};class ii extends Bc{static{u(this,"VdbGrid")}constructor(e,t){super(),this.type=e,this.tree=new Ee(t)}tree;transform=null;saveFloatAsHalf=!1;static create(e,t,n,r){const s=new ii(e,t);return n&&s.tree.setBackground(n),r&&(s.transform=r),s}valueType(){const e=/^Tree_([^_]+)_/.exec(this.type);return e?e[1]:this.type}getName(){const e=this.getMetadata("name");return e&&typeof e.value=="string"?e.value:""}getGridClass(){const e=this.getMetadata("class"),t=e&&typeof e.value=="string"?e.value:"";for(const[n,r]of Object.entries(Wm))if(r===t)return Number(n);return 0}voxelSize(){if(!this.transform)throw new Error("grid transform has not been read");return this.transform.voxelSize()}indexToWorld(e){if(!this.transform)throw new Error("grid transform has not been read");return this.transform.indexToWorld(e)}worldToIndex(e){if(!this.transform)throw new Error("grid transform has not been read");return this.transform.worldToIndex(e)}activeVoxelCount(){return this.tree.activeVoxelCount()}evalActiveVoxelBoundingBox(){return this.tree.evalActiveVoxelBoundingBox()}getValue(e){return this.tree.getValue(e)[0]}getVec3(e){const t=this.tree.getValue(e);return[t[0],t[1],t[2]]}isActive(e){return this.tree.isActive(e)}background(){return this.tree.background}}function zm(i){if(i==="Tree_float_5_4_3")return 1;if(i==="Tree_vec3s_5_4_3")return 3;throw new Error(`grid type ${i} is not supported (V2 supports float and vec3s 5-4-3 trees)`)}u(zm,"compsForGridType");const Do="_HalfFloat",$o="";class Yn{static{u(this,"GridDescriptor")}gridName="";uniqueName="";gridType="";saveFloatAsHalf=!1;instanceParentName="";gridPos=0;blockPos=0;endPos=0;static read(e){const t=new Yn;return t.uniqueName=e.string(),t.gridName=Yn.stripSuffix(t.uniqueName),t.gridType=e.string(),t.gridType.endsWith(Do)&&(t.saveFloatAsHalf=!0,t.gridType=t.gridType.slice(0,-Do.length)),t.instanceParentName=e.string(),t.gridPos=e.int64(),t.blockPos=e.int64(),t.endPos=e.int64(),t}isInstance(){return this.instanceParentName.length>0}static stripSuffix(e){const t=e.indexOf($o);return t<0?e:e.slice(0,t)}static nameAsString(e){const t=e.indexOf($o);return t<0?e:`${e.slice(0,t)}[${e.slice(t+1)}]`}}const Xm=1447313952,qm=222;class jm{static{u(this,"File")}stream;header=null;metadata=new Bc;descriptors=[];gridsByUniqueName=new Map;opened=!1;constructor(e){this.stream=new ss(e)}async open(){const e=this.stream;e.seek(0),this.header=Qm(e),this.metadata.readMeta(e);const t=e.int32();if(this.descriptors=[],this.gridsByUniqueName.clear(),this.header.hasGridOffsets){for(let n=0;n<t;++n){const r=Yn.read(e);this.descriptors.push(r),e.seek(r.endPos)}this.opened=!0;return}for(let n=0;n<t;++n){const r=Yn.read(e);this.descriptors.push(r),e.seek(r.gridPos);const s=await Bo(e,r,this.header.fileVersion);this.gridsByUniqueName.set(r.uniqueName,s),e.seek(r.endPos)}for(const n of this.descriptors){if(!n.isInstance())continue;const r=this.gridsByUniqueName.get(n.instanceParentName),s=this.gridsByUniqueName.get(n.uniqueName);if(!r||!s)throw new Error(`missing instance parent "${n.instanceParentName}"`);s.tree=r.tree}this.opened=!0}archiveHeader(){return this.assertOpen(),this.header}getMetadata(){return this.assertOpen(),this.metadata}gridDescriptors(){return this.assertOpen(),this.descriptors}async getGrids(){this.assertOpen();const e=[];for(const t of this.descriptors)e.push(await this.readGridDescriptor(t));return e}hasGrid(e){return this.assertOpen(),this.descriptors.some(t=>t.gridName===e||t.uniqueName===e)}async readGrid(e){this.assertOpen();const t=this.descriptors.find(n=>n.gridName===e||n.uniqueName===e);if(!t)throw new Error(`file has no grid named "${e}"`);return this.readGridDescriptor(t)}async readGridDescriptor(e){const t=this.gridsByUniqueName.get(e.uniqueName);if(t)return t;const n=new ss(this.stream.bytes);n.seek(e.gridPos);const r=await Bo(n,e,this.header.fileVersion);if(e.isInstance()){const s=this.descriptors.find(a=>a.uniqueName===e.instanceParentName);if(!s)throw new Error(`missing instance parent "${e.instanceParentName}"`);r.tree=(await this.readGridDescriptor(s)).tree}return r}assertOpen(){if(!this.opened)throw new Error("file is not open (call await file.open() first)")}}function Qm(i){if(i.int64()!==Xm)throw new Error("not a VDB file");const t=i.uint32();if(t<qm)throw new Error(`VDB file version ${t} < 222 is not supported`);const n=i.uint32(),r=i.uint32(),s=i.bool(),a=new TextDecoder().decode(i.raw(36));return{fileVersion:t,libraryVersion:{major:n,minor:r},hasGridOffsets:s,uuid:a}}u(Qm,"readHeader");async function Bo(i,e,t){const n=i.uint32(),r=new ii(e.gridType,zm(e.gridType));if(r.saveFloatAsHalf=e.saveFloatAsHalf,r.readMeta(i),r.transform=Qn.read(i),!e.isInstance()){if(await r.tree.readTopology(i,n,e.saveFloatAsHalf),i.pos!==e.blockPos)throw new Error(`topology parse ended at byte ${i.pos}, expected ${e.blockPos} (${Lm(n)})`);await r.tree.readBuffers(i,n,e.saveFloatAsHalf)}return r}u(Bo,"readGridBlock");function Ym(i,e){const t=e.min,n=e.max;if(t[0]>n[0]||t[1]>n[1]||t[2]>n[2])return new Float32Array(0);const r=n[0]-t[0]+1,s=n[1]-t[1]+1,a=n[2]-t[2]+1,o=i.comps,c={data:new Float32Array(r*s*a*o),comps:o,min:[t[0],t[1],t[2]],yStride:r,zStride:r*s};return Km(i,t[0],t[1],t[2],n[0],n[1],n[2],c),c.data}u(Ym,"copyToDense");function jc(i,e,t,n,r,s,a,o){const{data:c,comps:l,min:d,yStride:f,zStride:h}=i;for(let p=r;p<=o;++p)for(let m=n;m<=a;++m){const g=t-d[0]+(m-d[1])*f+(p-d[2])*h,_=s-t+1;if(l===1)c.fill(e[0],g,g+_);else for(let b=0;b<_;++b)for(let y=0;y<l;++y)c[(g+b)*l+y]=e[y]}}u(jc,"fill");function Km(i,e,t,n,r,s,a,o){for(let l=e;l<=r;){const d=(l&-4096)+4096-1;for(let f=t;f<=s;){const h=(f&-4096)+4096-1;for(let p=n;p<=a;){const m=(p&-4096)+4096-1,g=Math.min(r,d),_=Math.min(s,h),b=Math.min(a,m),y=Ee.rootKey([l,f,p]),S=i.children.get(y);if(S)Qc(S.child,l,f,p,g,_,b,o);else{const x=i.tiles.get(y);jc(o,x?x.tile.value:i.background,l,f,p,g,_,b)}p=m+1}f=h+1}l=d+1}}u(Km,"rootCopyToDense");function Qc(i,e,t,n,r,s,a,o){const c=i.log2dim,l=c===ae?xt:Lt,d=l+c,f=1<<l,h=(1<<d)-1,p=o.comps;for(let m=e;m<=r;){const g=(m&~(f-1))+f-1;for(let _=t;_<=s;){const b=(_&~(f-1))+f-1;for(let y=n;y<=a;){const S=(y&~(f-1))+f-1,x=Math.min(r,g),T=Math.min(s,b),C=Math.min(a,S),U=(m&h)>>l<<2*c|(_&h)>>l<<c|(y&h)>>l;if(z(i.childMask,U)){const V=i.children[U];"log2dim"in V?Qc(V,m,_,y,x,T,C,o):Jm(V,m,_,y,x,T,C,o)}else jc(o,i.values.subarray(U*p,(U+1)*p),m,_,y,x,T,C);y=S+1}_=b+1}m=g+1}}u(Qc,"internalCopyToDense");function Jm(i,e,t,n,r,s,a,o){const{data:c,comps:l,min:d,yStride:f,zStride:h}=o,p=i.buffer;for(let m=e;m<=r;++m){const g=(m&7)<<6,_=m-d[0];for(let b=t;b<=s;++b){const y=g|(b&7)<<3;let S=_+(b-d[1])*f+(n-d[2])*h;if(l===1)for(let x=n;x<=a;++x,S+=h)c[S]=p[y|x&7];else for(let x=n;x<=a;++x,S+=h){const T=(y|x&7)*l;for(let C=0;C<l;++C)c[S*l+C]=p[T+C]}}}}u(Jm,"leafCopyToDense");class wi{static{u(this,"ValueAccessor")}constructor(e){this.tree=e}leaf=null;lower=null;upper=null;clear(){this.leaf=this.lower=this.upper=null}insertInternal(e){e.log2dim===ae?this.upper=e:this.lower=e}insertLeaf(e){this.leaf=e}cachedLeaf(e){const t=this.leaf;return t&&(e[0]&-8)===t.origin[0]&&(e[1]&-8)===t.origin[1]&&(e[2]&-8)===t.origin[2]?t:null}cachedInternal(e){const t=this.lower;if(t&&(e[0]&-128)===t.origin[0]&&(e[1]&-128)===t.origin[1]&&(e[2]&-128)===t.origin[2])return t;const n=this.upper;return n&&(e[0]&-4096)===n.origin[0]&&(e[1]&-4096)===n.origin[1]&&(e[2]&-4096)===n.origin[2]?n:null}rootChild(e){const t=this.tree.children.get(Ee.rootKey(e));return t?(this.upper=t.child,t.child):null}probeValue(e,t,n=0){const r=this.tree.comps,s=this.cachedLeaf(e);if(s){const o=Co(e);if(r===1)t[n]=s.buffer[o];else for(let c=0;c<r;++c)t[n+c]=s.buffer[o*r+c];return z(s.valueMask,o)}const a=this.cachedInternal(e)??this.rootChild(e);return a?qc(a,e,r,t,n,this):this.tree.probeValue(e,t,n)}isValueOn(e){const t=this.cachedLeaf(e);if(t)return z(t.valueMask,Co(e));const n=this.cachedInternal(e)??this.rootChild(e);return n?Vm(n,e,this):this.tree.isValueOn(e)}setValueOn(e,t){this.setValue(e,t,!0)}setValueOff(e,t){this.setValue(e,t,!1)}setValue(e,t,n){const r=this.cachedLeaf(e);if(r){Xc(r,e,t,n,this.tree.comps);return}let s=this.cachedInternal(e);if(!s){if(s=this.tree.rootChildForWrite(e,t,n),!s)return;this.upper=s}cs(this.tree,s,e,t,n,this)}}const $r=Math.fround,Zm={radius:1};class eg{static{u(this,"BoxSamplerScratch")}constructor(e){this.comps=e,this.data=new Float32Array(8*e)}data;ijk=[0,0,0]}function Yc(i,e,t,n){const r=Math.floor(e[0]),s=Math.floor(e[1]),a=Math.floor(e[2]),o=e[0]-r,c=e[1]-s,l=e[2]-a,d=n.comps,f=n.data,h=n.ijk;let p=!1;h[0]=r,h[1]=s,h[2]=a,p=i.probeValue(h,f,0)||p,h[2]+=1,p=i.probeValue(h,f,1*d)||p,h[1]+=1,p=i.probeValue(h,f,3*d)||p,h[2]-=1,p=i.probeValue(h,f,2*d)||p,h[0]+=1,h[1]-=1,p=i.probeValue(h,f,4*d)||p,h[2]+=1,p=i.probeValue(h,f,5*d)||p,h[1]+=1,p=i.probeValue(h,f,7*d)||p,h[2]-=1,p=i.probeValue(h,f,6*d)||p;for(let m=0;m<d;++m)t[m]=Rt(Rt(Rt(f[m],f[1*d+m],l),Rt(f[2*d+m],f[3*d+m],l),c),Rt(Rt(f[4*d+m],f[5*d+m],l),Rt(f[6*d+m],f[7*d+m],l),c),o);return p}u(Yc,"boxSample");function Rt(i,e,t){return $r(i+$r($r(e-i)*t))}u(Rt,"interpolate");const Mt=Math.fround;function ls(i,e,t){if(t===1)return!(Math.abs(Mt(i[0]-e[0]))>dm);const n=Mt(1e-7);for(let r=0;r<t;++r){const s=i[r],a=e[r];if(!(Math.abs(Mt(s-a))>n))continue;if(!((Math.abs(a)>Math.abs(s)?Math.abs(Mt(Mt(s-a)/a)):Math.abs(Mt(Mt(s-a)/s)))<=n))return!1}return!0}u(ls,"valuesApproxEqual");function tg(i,e){const t=i.comps,n=Float32Array.from(i.background),r=Float32Array.from(e),s=n.map(l=>-l),a=r.map(l=>-l),o=u((l,d)=>{const f=l.subarray(d*t,(d+1)*t);ls(f,n,t)?f.set(r):ls(f,s,t)&&f.set(a)},"set");for(const{tile:l}of i.tiles.values())l.active||o(l.value,0);const c=u(l=>{const d=l.values.length/t;for(let f=0;f<d;++f)if(z(l.childMask,f)){const h=l.children[f];if("log2dim"in h)c(h);else for(let p=0;p<512;++p)z(h.valueMask,p)||o(h.buffer,p)}else z(l.valueMask,f)||o(l.values,f)},"visit");for(const{child:l}of i.children.values())c(l);i.setBackground(r)}u(tg,"changeBackground");const Kc=0,ng=1,ig=2;function rg(i){const e={result:Kc,scale:[0,0,0],rotate:[0,0,0],translate:[0,0,0]};if(!Vs(i))return e;e.translate=fm(i);const t=as(i),n=[Ei(Tr([1,0,0],t)),Ei(Tr([0,1,0],t)),Ei(Tr([0,0,1],t))],r=Yt(n,[n[0],n[0],n[0]]);let s=!1,a=!1,o=Number.MAX_VALUE;for(let c=0;c<8;++c){const l=[c&1?-n[0]:n[0],c&2?-n[1]:n[1],c&4?-n[2]:n[2]],d=xi(t,mm(wo(l)));if(Lc(d)<0)continue;const f=_m(d),h=xi(xi(xi(kr([0,0,1],f[2]),kr([0,1,0],f[1])),kr([1,0,0],f[0])),wo(l));if(gm(t,h)){const p=Math.max(Math.abs(f[0]),Math.max(Math.abs(f[1]),Math.abs(f[2])));if(!(o<p)&&(o=p,e.rotate=f,e.scale=l,s=!Yt(e.rotate,[0,0,0]),a=!0,r||!s))break}}return a&&(e.result=s&&!r?ng:ig),e}u(rg,"decompose");class Pi{static{u(this,"MatrixTransform")}mat;invMat;constructor(e){this.mat=e?[...e]:Ve(),this.invMat=e?ir(e):Ve()}isAffine(){return Vs(this.mat)}transform(e){return vo(this.mat,e)}invTransform(e){return vo(this.invMat,e)}}class sg{static{u(this,"TileSampler")}constructor(e,t,n){this.tileVal=t,this.active=n;const r=Math.abs(-1);this.min=[e.min[0]-r,e.min[1]-r,e.min[2]-r],this.max=[e.max[0]+r,e.max[1]+r,e.max[2]+r],this.empty=this.min[0]>=this.max[0]||this.min[1]>=this.max[1]||this.min[2]>=this.max[2]}min;max;empty;sample(e,t,n,r){return!this.empty&&t[0]>this.min[0]-1e-15&&t[0]<this.max[0]+1e-15&&t[1]>this.min[1]-1e-15&&t[1]<this.max[1]+1e-15&&t[2]>this.min[2]-1e-15&&t[2]<this.max[2]+1e-15?(n.set(this.tileVal),this.active):Yc(e,t,n,r)}}function Fo(i,e,t,n,r){const s=t.tree.comps,a=new eg(s),o=new Float32Array(s),c=u(v=>r?r.sample(t,v,o,a):Yc(t,v,o,a),"sample"),l=[e.min[0],e.min[1],e.min[2]],d=[e.max[0]+1,e.max[1]+1,e.max[2]+1],f=i.transform(l),h=i.transform(d),p=[Math.min(f[0],h[0]),Math.min(f[1],h[1]),Math.min(f[2],h[2])],m=[Math.max(f[0],h[0]),Math.max(f[1],h[1]),Math.max(f[2],h[2])];for(let v=0;v<8;++v){const F=[v&1?d[0]:l[0],v&2?d[1]:l[1],v&4?d[2]:l[2]],X=i.transform(F);for(let ne=0;ne<3;++ne)X[ne]<p[ne]&&(p[ne]=X[ne]),m[ne]<X[ne]&&(m[ne]=X[ne])}const g=Zm.radius,_=[Math.floor(p[0])-g,Math.floor(p[1])-g,Math.floor(p[2])-g],b=[Math.ceil(m[0])+g,Math.ceil(m[1])+g,Math.ceil(m[2])+g],y=u((v,F)=>{F?n.setValueOn(v,o):n.isValueOn(v)||n.setValueOff(v,o)},"write"),S=[0,0,0];if(!i.isAffine()){for(let v=_[0];v<=b[0];++v)for(let F=_[1];F<=b[1];++F)for(let X=_[2];X<=b[2];++X)S[0]=v,S[1]=F,S[2]=X,y(S,c(i.invTransform([v,F,X])));return}const x=i.invTransform([0,0,0]),T=i.invTransform([1,0,0]),C=i.invTransform([0,1,0]),U=i.invTransform([0,0,1]),V=[T[0]-x[0],T[1]-x[1],T[2]-x[2]],q=[C[0]-x[0],C[1]-x[1],C[2]-x[2]],we=[U[0]-x[0],U[1]-x[1],U[2]-x[2]],ve=i.invTransform([_[0],_[1],_[2]]);for(let v=_[0];v<=b[0];++v){const F=[ve[0],ve[1],ve[2]];for(let X=_[1];X<=b[1];++X){const ne=[F[0],F[1],F[2]];for(let Jt=_[2];Jt<=b[2];++Jt)S[0]=v,S[1]=X,S[2]=Jt,y(S,c(ne)),ne[0]+=we[0],ne[1]+=we[1],ne[2]+=we[2];F[0]+=q[0],F[1]+=q[1],F[2]+=q[2]}ve[0]+=V[0],ve[1]+=V[1],ve[2]+=V[2]}}u(Fo,"transformBBox");function En(i,e,t){const n=e.tree,r=t.tree,s=n.comps;if(e.getGridClass()===Ws.LevelSet)throw new Error("resampleToMatch: level-set grids (clip, pruneLevelSet, signedFloodFill) are not ported");{const o=new wi(n),c=new wi(r);n.forEachTile((l,d,f,h)=>{if(!h&&ls(f,r.background,s))return;const p={min:[l[0],l[1],l[2]],max:[l[0]+d-1,l[1]+d-1,l[2]+d-1]},m=new sg(p,Float32Array.from(f),h);Fo(i,p,o,c,m)})}{const o=new wi(n),c=new wi(r);for(const l of n.leafNodesInOrder()){const d=l.origin,f={min:[d[0],d[1],d[2]],max:[d[0]+8,d[1]+8,d[2]+8]};Fo(i,f,o,c,null)}}}u(En,"applyTransform");function Eo(i,e){return ii.create(i.type,i.tree.comps,e)}u(Eo,"createGrid");class ag{static{u(this,"GridTransformer")}pivot=[0,0,0];mipLevels=[0,0,0];transformMat;preScaleTransform=Ve();postScaleTransform=Ve();constructor(e){this.transformMat=[...e];const t=rg(this.transformMat);t.result!==Kc&&this.init(this.pivot,t.scale,t.rotate,t.translate,"rst","zyx")}getTransform(){return[...this.transformMat]}init(e,t,n,r,s,a){if(s.length!==3)throw new Error(`invalid transform order (${s})`);if(a.length!==3)throw new Error(`invalid rotation order (${a})`);this.pivot=[...e];const o=[...t];for(let g=0;g<3;++g){const _=Math.abs(t[g]);_<.5&&(this.mipLevels[g]=Math.trunc(Math.floor(-Math.log(_)/Math.log(2))),o[g]=t[g]*(1<<this.mipLevels[g]))}let c=Ve();const l={pre:Ve(),post:Ve()};let d="post";const f=[-e[0],-e[1],-e[2]];let h=3,p=3,m=3;for(let g=2;g>=0;--g)switch(s[g]){case"r":{h=g,c=ze(c,e),l[d]=ze(l[d],e);let _=3,b=3,y=3;for(let S=2;S>=0;--S)switch(a[S]){case"x":_=S,sn(c,Ot.X,n[0]),sn(l[d],Ot.X,n[0]);break;case"y":b=S,sn(c,Ot.Y,n[1]),sn(l[d],Ot.Y,n[1]);break;case"z":y=S,sn(c,Ot.Z,n[2]),sn(l[d],Ot.Z,n[2]);break}if(_>2||b>2||y>2)throw new Error(`invalid rotation order (${a})`);c=ze(c,f),l[d]=ze(l[d],f);break}case"s":p=g,c=ze(c,e),Pr(c,t),c=ze(c,f),l[d]=ze(l[d],e),Pr(l[d],o),l[d]=ze(l[d],f),d="pre";break;case"t":m=g,c=ze(c,r),l[d]=ze(l[d],r);break}if(m>2||h>2||p>2)throw new Error(`invalid transform order (${s})`);this.transformMat=c,this.preScaleTransform=l.pre,this.postScaleTransform=l.post}transformGrid(e,t){tg(t.tree,e.tree.background);const[n,r,s]=this.mipLevels;if(n===0&&r===0&&s===0){En(new Pi(this.transformMat),e,t);return}let a=!0;const o=Float32Array.from(e.tree.background);let c=Eo(e,o);Yi(this.preScaleTransform,Ve())||(a=!1,En(new Pi(this.preScaleTransform),e,c));const l=[n,r,s];for(;l[0]!==0||l[1]!==0||l[2]!==0;){const d=new Pi;if(Gc(d.mat,this.pivot),Pr(d.mat,[l[0]?.5:1,l[1]?.5:1,l[2]?.5:1]),d.mat=ze(d.mat,[-this.pivot[0],-this.pivot[1],-this.pivot[2]]),d.invMat=ir(d.mat),a)a=!1,En(d,e,c);else{const f=Eo(e,o);En(d,c,f),c=f}for(let f=0;f<3;++f)l[f]=Math.max(l[f]-1,0)}Yi(this.postScaleTransform,Ve())?t.tree=c.tree:En(new Pi(this.postScaleTransform),c,t)}}function Jc(i,e){return i.equals(e)}u(Jc,"transformsEqual");function og(i,e){const t=i.transform,n=e.transform;if(!t||!n)throw new Error("resampleToMatch: both grids need a transform");const r=t.isLinear()&&n.isLinear();if(r&&Jc(t,n))e.tree=i.tree.copy();else if(r){const a=Us(t.baseMap.getAffineMap().mat4,ir(n.baseMap.getAffineMap().mat4));new ag(a).transformGrid(i,e)}else throw new Error("resampleToMatch: non-linear transforms (GridResampler) are not ported")}u(og,"doResampleToMatch");function cg(i,e){if(i.tree.comps!==e.tree.comps)throw new Error("resampleToMatch: grids of different value types");if(i.getGridClass()===Ws.LevelSet){const t=i.transform,n=e.transform;if(t&&n&&Jc(t,n)){e.tree=i.tree.copy();return}throw new Error("resampleToMatch: level-set resampling (doLevelSetRebuild) is not ported")}og(i,e)}u(cg,"resampleToMatchBox");const ut={HIOOPENVDB_DEBUG_TEXTURE:"HIOOPENVDB_DEBUG_TEXTURE"};ct.registerDebugSymbol(ut.HIOOPENVDB_DEBUG_TEXTURE,"HioVDB texture loading");const Br=new Map;function lg(i,e){let t=Br.get(i);if(!t){t=(async()=>{const r=new jm(await wl(i,void 0,e));return await r.open(),r})(),Br.set(i,t);const n=u(()=>{Br.delete(i)},"forget");t.then(n,n)}return t}u(lg,"_OpenFile");const Fr=u(i=>i instanceof Error?i.message:String(i),"_message");function Zc(i){return!(i.min[0]<=i.max[0]&&i.min[1]<=i.max[1]&&i.min[2]<=i.max[2])}u(Zc,"_IsEmpty");function us(i){return Zc(i)?[0,0,0]:[i.max[0]-i.min[0]+1,i.max[1]-i.min[1]+1,i.max[2]-i.min[2]+1]}u(us,"_Dim");function Go(i){const e=us(i);return e[0]*e[1]*e[2]}u(Go,"_Volume");function ug(i){const e=i.transform;if(!e)return new pe(1);const t=e.baseMap.getAffineMat4();return new pe(t[0],t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8],t[9],t[10],t[11],t[12],t[13],t[14],t[15])}u(ug,"_ExtractTransformFromGrid");class zs{static{u(this,"_DenseGridHolder")}constructor(e,t){this._bbox=t,this._data=Ym(e.tree,t)}static new(e,t){return Zc(t)?null:new zs(e,t)}_data;getData(){return new Uint8Array(this._data.buffer,this._data.byteOffset,this._data.byteLength)}getTreeBoundingBox(){return this._bbox}}class Xn{static{u(this,"_GridHolder")}constructor(e){this._grid=e;const t=e.evalActiveVoxelBoundingBox();this._treeBoundingBox={min:[t.min[0],t.min[1],t.min[2]],max:[t.max[0],t.max[1],t.max[2]]}}_treeBoundingBox;static new(e){if(!e)return null;const t=e.valueType();return t==="float"?(ct.msg(ut.HIOOPENVDB_DEBUG_TEXTURE,`[VdbTextureData] Grid is holding floats
`),new Xn(e)):t==="vec3s"?(ct.msg(ut.HIOOPENVDB_DEBUG_TEXTURE,`[VdbTextureData] Grid is holding float vectors
`),new Xn(e)):(Vt("Unsupported OpenVDB grid type"),null)}getTreeBoundingBox(){return this._treeBoundingBox}getGridTransform(){return ug(this._grid)}getMetadata(){return this._grid.valueType()==="vec3s"?[12,Xr.HioFormatFloat32Vec3]:[4,Xr.HioFormatFloat32]}getResampled(e){const t=new ii(this._grid.type,this._grid.tree.comps);return t.transform=Qn.createLinearTransform([...e.GetArray()]),cg(this._grid,t),Xn.new(t)}getDense(){return zs.new(this._grid,this.getTreeBoundingBox())}}async function dg(i,e,t){let n;try{n=await lg(i,t)}catch(s){return Vt(`Could not parse OpenVDB file: ${Fr(s)}`),null}if(!n.hasGrid(e))return Vt(`OpenVDB file ${i} has no grid ${e}`),null;let r;try{r=await n.readGrid(e)}catch(s){return/grid type .* is not supported/.test(Fr(s))?Vt("Unsupported OpenVDB grid type"):Vt(`Could not read OpenVDB grid ${e} from ${i}: ${Fr(s)}`),null}return Xn.new(r)}u(dg,"_LoadGrid");function fg(i){return new vl(new Ar(i.min[0],i.min[1],i.min[2]),new Ar(i.max[0],i.max[1],i.max[2]))}u(fg,"_ToRange3d");function Er(i,e){const t=Math.floor(i/e)|0;return i/Math.max(1,t-2)}u(Er,"_ResamplingAdjustment");class hg extends Xl{static{u(this,"HioOpenVDB_TextureData")}constructor(e,t,n){super(),this._filePath=e,this._gridName=t,this._targetMemory=n}_boundingBox=new Ys;_resizedWidth=0;_resizedHeight=0;_resizedDepth=1;_format=Xr.HioFormatUNorm8Vec3;_denseGrid=null;getBoundingBox(){return this._boundingBox}GetFormat(){return this._format}resizedWidth(){return this._resizedWidth}resizedHeight(){return this._resizedHeight}resizedDepth(){return this._resizedDepth}hasRawBuffer(){return this.getRawBuffer()!==null}getRawBuffer(){return this._denseGrid?this._denseGrid.getData():null}async Read(e){ct.msg(ut.HIOOPENVDB_DEBUG_TEXTURE,`[VdbTextureData] Path: ${this._filePath} GridName: ${this._gridName}
`);let t=await dg(this._filePath,this._gridName,e);if(!t)return!1;let n=t.getGridTransform();const[r,s]=t.getMetadata();this._format=s;const a=t.getTreeBoundingBox(),o=us(a),c=o[0],l=o[1],d=Math.max(1,o[2]),f=Go(a)*r;if(ct.msg(ut.HIOOPENVDB_DEBUG_TEXTURE,`[VdbTextureData] Native dimensions ${c} x ${l} x ${d}
`),f>this._targetMemory&&this._targetMemory>0){const g=Math.cbrt(f/this._targetMemory);ct.msg(ut.HIOOPENVDB_DEBUG_TEXTURE,`[VdbTextureData] Approximate scaling factor ${g.toFixed(6)}
`);const _=Math.min(Er(c,g),Er(l,g),Er(d,g));if(ct.msg(ut.HIOOPENVDB_DEBUG_TEXTURE,`[VdbTextureData] Scaling by factor ${_.toFixed(6)}
`),n=new pe(new xl(_,_,_,1)).getMultiply(n),t=t.getResampled(n),!t)return!1}if(this._denseGrid=t.getDense(),!this._denseGrid)return this._resizedWidth=0,this._resizedHeight=0,this._resizedDepth=1,!1;const h=this._denseGrid.getTreeBoundingBox();this._boundingBox=new Ys(fg(h),n);const p=us(h);this._resizedWidth=p[0],this._resizedHeight=p[1],this._resizedDepth=p[2];const m=Go(h)*r;return ct.msg(ut.HIOOPENVDB_DEBUG_TEXTURE,`[VdbTextureData] Resized dimensions ${this._resizedWidth} x ${this._resizedHeight} x ${this._resizedDepth} (size: ${m}, target: ${this._targetMemory})
`),ct.msg(ut.HIOOPENVDB_DEBUG_TEXTURE,`[VdbTextureData] ${m<=this._targetMemory||this._targetMemory===0?"Target memory was met.":"WARNING: the target memory was EXCEEDED"}`),!0}}zl(["vdb"],(i,e,t,n,r)=>new hg(i,e,r),0);const pg=1/(1<<22),mg=u(i=>i.includes("stencil"),"hasStencil");class gg{static{u(this,"HiddenSurfaceWireframe")}constructor(e){this._device=e,this._uniforms=e.createBuffer({label:"usdview hidden surface wireframe",size:32,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST})}_depth;_pipeline;_pipelineKey="";_uniforms;keepDepth(e){const t=this._depth;(!t||t.width!==e.width||t.height!==e.height||t.format!==e.format||t.sampleCount!==e.sampleCount)&&(t?.destroy(),this._depth=this._device.createTexture({label:"usdview hidden surface depth",size:[e.width,e.height],format:e.format,sampleCount:e.sampleCount,usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT}));const n=this._device.createCommandEncoder({label:"usdview hidden surface depth"});n.copyTextureToTexture({texture:e},{texture:this._depth},[e.width,e.height]),this._device.queue.submit([n.finish()])}_Pipeline(e,t){const n=`${e.format}/${t.format}/${e.sampleCount}`;if(this._pipeline&&this._pipelineKey===n)return this._pipeline;const r=this._device.createShaderModule({label:"usdview hidden surface wireframe",code:`
      struct Params { clearColor: vec4<f32>, offset: f32 }
      @group(0) @binding(0) var wireDepth: texture_depth_multisampled_2d;
      @group(0) @binding(1) var<uniform> params: Params;
      @vertex fn vs(@builtin(vertex_index) i: u32) -> @builtin(position) vec4<f32> {
        let p = array<vec2<f32>, 3>(vec2(-1, -1), vec2(3, -1), vec2(-1, 3));
        return vec4(p[i], 0, 1);
      }
      struct Out { @location(0) color: vec4<f32>, @builtin(frag_depth) depth: f32 }
      // Per sample: the second pass's depth, against the kept depth
      // (depthCompare greater): samples behind the surfaces become the clear color.
      @fragment fn fs(@builtin(position) position: vec4<f32>, @builtin(sample_index) s: u32) -> Out {
        let d = textureLoad(wireDepth, vec2<i32>(position.xy), i32(s));
        return Out(params.clearColor, max(d - params.offset, 0.0));
      }
    `});return this._pipeline=this._device.createRenderPipeline({label:"usdview hidden surface wireframe",layout:"auto",vertex:{module:r,entryPoint:"vs"},fragment:{module:r,entryPoint:"fs",targets:[{format:e.format}]},primitive:{topology:"triangle-list"},depthStencil:{format:t.format,depthWriteEnabled:!1,depthCompare:"greater"},multisample:{count:e.sampleCount}}),this._pipelineKey=n,this._pipeline}composite(e,t,n,r){const s=this._depth;if(!s)return;const a=this._Pipeline(e,s),o="data"in r?r.data:r;this._device.queue.writeBuffer(this._uniforms,0,new Float32Array([o[0],o[1],o[2],o[3],pg,0,0,0]));const c=this._device.createBindGroup({layout:a.getBindGroupLayout(0),entries:[{binding:0,resource:t.createView({aspect:"depth-only"})},{binding:1,resource:{buffer:this._uniforms}}]}),l=this._device.createCommandEncoder({label:"usdview hidden surface wireframe"}),d=l.beginRenderPass({colorAttachments:[{view:e.createView(),resolveTarget:n.createView(),loadOp:"load",storeOp:"store"}],depthStencilAttachment:{view:s.createView(),depthReadOnly:!0,...mg(s.format)?{stencilReadOnly:!0}:{}}});d.setPipeline(a),d.setBindGroup(0,c),d.draw(3),d.end(),this._device.queue.submit([l.finish()])}destroy(){this._depth?.destroy(),this._uniforms.destroy()}}const Lo=u(()=>new be(.01,.01,.01,1),"SCENE_AMBIENT"),_g=u(()=>new be(.1,.1,.1,1),"SPECULAR_DEFAULT"),bg=u(()=>new be(.2,.2,.2,1),"AMBIENT_DEFAULT"),Sg=32;function yg(i,e=!0){const t=[];if(e){const r=new Rr;r.setPosition(new be(i.eye[0],i.eye[1],i.eye[2],1)),r.setTransform(i.view.getInverse()),r.setAmbient(Lo()),t.push(r)}const n=new Wo;return n.setAmbient(bg()),n.setSpecular(_g()),n.setShininess(Sg),{lights:t,material:n,sceneAmbient:Lo()}}u(yg,"frameRecorderLightingState");const el=new Set(["Smooth Shaded","Flat Shaded","WireframeOnSurface","Geom Smooth","Geom Flat"]),Gr={Wireframe:Je.DRAW_WIREFRAME,WireframeOnSurface:Je.DRAW_WIREFRAME_ON_SURFACE,"Smooth Shaded":Je.DRAW_SHADED_SMOOTH,Points:Je.DRAW_POINTS,"Flat Shaded":Je.DRAW_SHADED_FLAT,"Geom Only":Je.DRAW_GEOM_ONLY,"Geom Smooth":Je.DRAW_GEOM_SMOOTH,"Geom Flat":Je.DRAW_GEOM_FLAT,"Hidden Surface Wireframe":Je.DRAW_WIREFRAME};let Ao;function Hg(){return Ao??=(async()=>{jl(),await Hf(),await Cl()})().catch(i=>{throw Ao=void 0,i})}u(Hg,"prepareStorm");function Ug(i){const e=new jn(i);return e.setShaderBodyTranslator(Ef),e}u(Ug,"createHgi");const xg=-1;function vg(i,e,t){const n=[];if(!el.has(i.renderMode))return n;if(i.cameraLightEnabled){const r=new Rr;r.setAmbient(new be(0,0,0,0)),r.setPosition(new be(e.eye[0],e.eye[1],e.eye[2],1)),r.setTransform(e.view.getInverse()),n.push(r)}if(i.domeLightEnabled){const r=new Rr;r.setIsDomeLight(!0),t&&r.setTransform(new pe(1).setRotate({axis:[1,0,0],angle:90})),n.push(r)}return n}u(vg,"usdviewLights");function wg(i){const e=new Wo;if(el.has(i.renderMode)){const t=i.defaultMaterialAmbient,n=i.defaultMaterialSpecular;e.setAmbient(new be(t,t,t,1)),e.setSpecular(new be(n,n,n,1)),e.setShininess(32)}return e}u(wg,"usdviewMaterial");function Pg(i,e){const[t,n,r,s]=i,[a,o]=e,c=new Dl(new bn(t,o-n-s),new bn(t+r,o-n)),d=new Zs(new Sn(0,0),a,o).getIntersection(new Zs(new Sn(t,o-n-s),r,s));return new du(c,d)}u(Pg,"computeCameraFraming");class Vg{static{u(this,"StageViewEngine")}constructor(e,t,n,r,s,a){this._stage=t,this._device=e.getPrimaryDevice(),this._engine=new na({driver:{name:eu.renderDriver,driver:e}}),this._engine.setRendererAov("color"),this._engine.setEnablePresentation(!1),this._root=t.getPrim("/"),this._settings=r,this._params.frame=new Ks(n),this.applySettings(r,!1),this._stageChanged=Pl.Register(Tl.ObjectsChanged,o=>{o.getResyncedPaths().empty()||(this._drawableCount=void 0)},t)}_engine;_params=new ql;_root;_device;_settings;_zUp=!1;_hiddenSurface;_destroyed=!1;lightingSource="usdview";_drawableCount;_stageChanged;SetTime(e){this._params.frame=new Ks(e),this._engine.PrepareBatch(this._root,this._params)}applySettings(e,t){this._settings=e,this._zUp=t;const n=this._params;n.complexity=Math.fround(1+pu[e.complexity].level/10);const r=ua(e);n.showGuides=r.includes("guide"),n.showProxy=r.includes("proxy"),n.showRender=r.includes("render"),n.cullStyle=e.cullBackfaces?ia.CULL_STYLE_BACK_UNLESS_DOUBLE_SIDED:ia.CULL_STYLE_NOTHING,n.gammaCorrectColors=!1,n.enableSampleAlphaToCoverage=!1,n.enableSceneMaterials=e.enableSceneMaterials,n.enableSceneLights=e.sceneLightsEnabled;const[s,a,o,c]=mu[e.background];n.clearColor=new be(s,a,o,c),this._engine.setSelectionColor(new be(...gu[e.highlightColor])),this._engine.setRendererSetting("domeLightCameraVisibility",e.domeLightTexturesVisible)}getRendererPlugins(){return na.getRendererPlugins()}getCurrentRendererId(){return this._engine.getCurrentRendererId()}setSelection(e,t){this._engine.clearSelected();for(const n of e)if(n.path!=="/")if(n.instanceIndices)for(const r of n.instanceIndices)this._engine.addSelected(n.path,r);else this._engine.addSelected(n.path,xg);this._params.highlight=t}Render(e,t,n){if(this._destroyed)throw new Error("The engine was destroyed.");t=Math.max(1,t),n=Math.max(1,n);const r=this._engine;if(r.setRenderBufferSize(new Sn(t,n)),r.setFraming(Pg([0,0,t,n],[t,n])),e.scenePath?(r.setOverrideWindowPolicy(e.fitWindow?lr.CameraUtilFit:lr.CameraUtilMatchVertically),r.setCameraPath(e.scenePath)):(r.setOverrideWindowPolicy(lr.CameraUtilMatchVertically),r.setCameraState(e.view,e.projection)),this.lightingSource==="frameRecorder"){const{lights:a,material:o,sceneAmbient:c}=yg(e);r.setLightingState(a,o,c)}else r.setLightingState(vg(this._settings,e,this._zUp),wg(this._settings),new be(.01,.01,.01,1));const s=this._settings.renderMode;if(s==="Hidden Surface Wireframe"){this._params.drawMode=Je.DRAW_GEOM_ONLY,r.Render(this._root,this._params),this._hiddenSurface??=new gg(this._device),this._hiddenSurface.keepDepth(this._texture("depth",!0)),this._params.drawMode=Gr[s],r.Render(this._root,this._params);const a=this.GetAovTextures();this._hiddenSurface.composite(a.colorMSAA,a.depthMSAA,a.color,this._params.clearColor);return}this._params.drawMode=Gr[s],r.Render(this._root,this._params)}_texture(e,t){return this._engine.getAovRenderBuffer(e)?.getResource(t)?.Get()?.getTextureId()??void 0}GetAovTextures(){const e=this._texture("color",!1),t=this._texture("color",!0),n=this._texture("depth",!0);if(!e||!t||!n)throw new Error("Storm has not allocated its render buffers.");return{color:e,colorMSAA:t,depthMSAA:n}}isConverged(){return this._engine.isConverged()}async pick(e,t,n,r,s){if(this._destroyed)return null;const a=new Js(t/r*2-1,-1*(n/s*2-1)),o=new Js(1/r,1/s),c=e.computeNarrowedFrustum(a,o);this._params.drawMode=Gr[this._settings.renderMode];const l=[];return await this._engine.testIntersection({resolveMode:"resolveNearestToCenter"},c.computeViewMatrix(),c.computeProjectionMatrix(),this._root,this._params,l),l[0]??null}getDrawableCount(){const e=new Set(ua(this._settings)),t=[...e].join();if(this._drawableCount?.key===t)return this._drawableCount.count;const n=new Map;let r=0;for(const s of this._stage.traverse(kl())){const a=this._stage.getPrim(s);if(!a)continue;const o=s.slice(0,s.lastIndexOf("/"))||"/",c=Il.computePurposeInfo(a,n.get(o));n.set(s,c),a.isA("Gprim")&&e.has(c.purpose)&&r++}return this._drawableCount={key:t,count:r},r}destroy(){this._destroyed||(this._destroyed=!0,this._stageChanged.revoke(),this._hiddenSurface?.destroy(),this._engine.destroy())}}export{Vg as StageViewEngine,Ug as createHgi,Hg as prepareStorm};
