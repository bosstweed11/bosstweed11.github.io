var Ar=Object.defineProperty;var o=(r,e)=>Ar(r,"name",{value:e,configurable:!0});import{U as N,ab as Pr,ac as xr,y as Ir,A as _r,ad as ei,O as He,ae as Sr,af as Tr,d as wr,ag as Br,Y as et,$ as kr,B as Cr,C as Xe,a5 as ti,a7 as Nr,ah as Mr,a8 as Or,ai as ii,aj as ri,ak as ot,al as Ui,r as Er,am as Rr,k as ct,Z as Vi,v as Ur,L as Vr,an as Gr}from"./stage-BUyo3d3L.js";import{T as ft,l as gt,P as V,w as Be,G as K,x as z,H as O,J as Ct,K as Ut,Q as Lr,M as Nt,r as Fr,X as $r,y as Hr,d as Xr,o as Kr,p as zr,m as Yr,q as qr,Y as Zr,Z as jr}from"./prefetchedAssets-BN6lbr_h.js";import{d as E,b as ve,f as tt,g as x,V as ke,I as Z,Q as Wr,J as Qr,k as Jr,p as P,R as Ne,S as Ke,L as es,T as ts,U as is,o as M,m as Vt,w,x as Gt,C as Gi,z as Li,n as Fi,W as rs,N as ss,E as ns,X as as,A as os,B as cs,Y as us,e as ls,Z as ds,_ as ps}from"./value-Bf9vjx7C.js";const ut=34028234663852886e22;function lt(r){return r*r}o(lt,"GfSqr");class Ae{static{o(this,"GfRange1Base")}static dimension=1;dimension=1;_min=0;_max=0;_make(e,t){return new this.constructor(e,t)}_initFromArgs(e){if(e.length===0){this.setEmpty();return}if(e.length===1){const t=e[0];if(t instanceof Ae){this._min=this._round(t.getMin()),this._max=this._round(t.getMax());return}throw new TypeError("GfRange1: single-argument ctor expects another range")}this._min=this._round(e[0]),this._max=this._round(e[1])}setEmpty(){this._min=ut,this._max=-ut}getMin(){return this._min}getMax(){return this._max}setMin(e){this._min=this._round(e)}setMax(e){this._max=this._round(e)}getSize(){return this._max-this._min}getMidpoint(){return .5*this._min+.5*this._max}IsEmpty(){return this._min>this._max}extendBy(e){return this.unionWith(e)}contains(e){return e instanceof Ae?this.contains(e._min)&&this.contains(e._max):e>=this._min&&e<=this._max}isOutside(e){return e._max<this._min||e._min>this._max}static getUnion(e,t){return e._make(Math.min(e._min,t._min),Math.max(e._max,t._max))}unionWith(e){if(e instanceof Ae)e._min<this._min&&(this._min=e._min),e._max>this._max&&(this._max=e._max);else{const t=this._round(e);t<this._min&&(this._min=t),t>this._max&&(this._max=t)}return this}static getIntersection(e,t){return e._make(Math.max(e._min,t._min),Math.min(e._max,t._max))}intersectWith(e){return e._min>this._min&&(this._min=e._min),e._max<this._max&&(this._max=e._max),this}getDistanceSquared(e){let t=0;return e<this._min?t+=lt(this._min-e):e>this._max&&(t+=lt(e-this._max)),t}getSum(e){return this._make(this._min+e._min,this._max+e._max)}getDifference(e){return this._make(this._min-e._max,this._max-e._min)}getMultiplied(e){return e>0?this._make(this._min*e,this._max*e):this._make(this._max*e,this._min*e)}getDivided(e){return this.getMultiplied(1/e)}addInPlace(e){return this._min=this._round(this._min+e._min),this._max=this._round(this._max+e._max),this}subtractInPlace(e){return this._min=this._round(this._min-e._max),this._max=this._round(this._max-e._min),this}multiplyInPlace(e){if(e>0)this._min=this._round(this._min*e),this._max=this._round(this._max*e);else{const t=this._min;this._min=this._round(this._max*e),this._max=this._round(t*e)}return this}divideInPlace(e){return this.multiplyInPlace(1/e)}equals(e){return this._min===this._round(e.getMin())&&this._max===this._round(e.getMax())}hash(){return`${this._min};${this._max}`}toString(){return`[${this._min}...${this._max}]`}repr(){return`Gf.${this.constructor.name}(${this._min}, ${this._max})`}}class da extends Ae{static{o(this,"GfRange1d")}constructor(...e){super(),this._initFromArgs(e)}_round(e){return e}}class pa extends Ae{static{o(this,"GfRange1f")}constructor(...e){super(),this._initFromArgs(e)}_round(e){return Math.fround(e)}}class Pe{static{o(this,"GfRangeVecBase")}_min;_max;get dimension(){return this._min.dimension}_vec(e){return new this._vecCtor(e)}_make(e,t){return new this.constructor(e,t)}_initFromArgs(e){if(e.length===0){this.setEmpty();return}if(e.length===1){const t=e[0];if(t instanceof Pe){this._min=this._vec(t.getMin()),this._max=this._vec(t.getMax());return}throw new TypeError("GfRange: single-argument ctor expects another range")}this._min=this._vec(e[0]),this._max=this._vec(e[1])}_componentwise(e,t,i){const s=e.data,n=t.data;return this._vec(s.map((a,u)=>i(a,n[u])))}setEmpty(){this._min=new this._vecCtor(ut),this._max=new this._vecCtor(-ut)}getMin(){return this._min}getMax(){return this._max}setMin(e){this._min=this._vec(e)}setMax(e){this._max=this._vec(e)}getSize(){return this._max.subtract(this._min)}getMidpoint(){return this._min.getScaled(.5).add(this._max.getScaled(.5))}IsEmpty(){const e=this._min.data,t=this._max.data;for(let i=0;i<e.length;i++)if(e[i]>t[i])return!0;return!1}extendBy(e){return this.unionWith(e)}contains(e){if(e instanceof Pe)return this.contains(e._min)&&this.contains(e._max);const t=e.data,i=this._min.data,s=this._max.data;for(let n=0;n<t.length;n++)if(!(t[n]>=i[n]&&t[n]<=s[n]))return!1;return!0}isOutside(e){const t=e._min.data,i=e._max.data,s=this._min.data,n=this._max.data;for(let a=0;a<s.length;a++)if(i[a]<s[a]||t[a]>n[a])return!0;return!1}static getUnion(e,t){const i=e._componentwise(e._min,t._min,Math.min),s=e._componentwise(e._max,t._max,Math.max);return e._make(i,s)}unionWith(e){return e instanceof Pe?(this._min=this._componentwise(this._min,e._min,Math.min),this._max=this._componentwise(this._max,e._max,Math.max)):(this._min=this._componentwise(this._min,e,Math.min),this._max=this._componentwise(this._max,e,Math.max)),this}static getIntersection(e,t){const i=e._componentwise(e._min,t._min,Math.max),s=e._componentwise(e._max,t._max,Math.min);return e._make(i,s)}intersectWith(e){return this._min=this._componentwise(this._min,e._min,Math.max),this._max=this._componentwise(this._max,e._max,Math.min),this}getDistanceSquared(e){let t=0;const i=e.data,s=this._min.data,n=this._max.data;for(let a=0;a<i.length;a++)i[a]<s[a]?t+=lt(s[a]-i[a]):i[a]>n[a]&&(t+=lt(i[a]-n[a]));return t}getSum(e){return this._make(this._min.add(e._min),this._max.add(e._max))}getDifference(e){return this._make(this._min.subtract(e._max),this._max.subtract(e._min))}getMultiplied(e){return e>0?this._make(this._min.getScaled(e),this._max.getScaled(e)):this._make(this._max.getScaled(e),this._min.getScaled(e))}getDivided(e){return this.getMultiplied(1/e)}addInPlace(e){return this._min=this._min.add(e._min),this._max=this._max.add(e._max),this}subtractInPlace(e){return this._min=this._min.subtract(e._max),this._max=this._max.subtract(e._min),this}multiplyInPlace(e){if(e>0)this._min=this._min.getScaled(e),this._max=this._max.getScaled(e);else{const t=this._min;this._min=this._max.getScaled(e),this._max=t.getScaled(e)}return this}divideInPlace(e){return this.multiplyInPlace(1/e)}equals(e){return this._min.equals(this._vec(e.getMin()))&&this._max.equals(this._vec(e.getMax()))}hash(){return`${this._min.data.join(",")};${this._max.data.join(",")}`}toString(){return`[${this._min.toString()}...${this._max.toString()}]`}repr(){return`Gf.${this.constructor.name}(${this._min.repr()}, ${this._max.repr()})`}}class $i extends Pe{static{o(this,"GfRange2Base")}getCorner(e){if(e<0||e>3)throw new Error(`Invalid corner ${e} > 3.`);const t=this._min.data,i=this._max.data;return this._vec([(e&1?i:t)[0],(e&2?i:t)[1]])}getQuadrant(e){if(e<0||e>3)throw new Error(`Invalid quadrant ${e} > 3.`);const t=this.getCorner(e).data,i=this._min.add(this._max).getScaled(.5).data;return this._make(this._vec([Math.min(t[0],i[0]),Math.min(t[1],i[1])]),this._vec([Math.max(t[0],i[0]),Math.max(t[1],i[1])]))}}class Hi extends $i{static{o(this,"GfRange2d")}constructor(...e){super(),this._initFromArgs(e)}get _vecCtor(){return tt}static get unitSquare(){return new Hi(new tt(0,0),new tt(1,1))}}class Xi extends $i{static{o(this,"GfRange2f")}constructor(...e){super(),this._initFromArgs(e)}get _vecCtor(){return ve}static get unitSquare(){return new Xi(new ve(0,0),new ve(1,1))}}class hs extends Pe{static{o(this,"GfRange3Base")}getCorner(e){if(e<0||e>7)throw new Error(`Invalid corner ${e} > 7.`);const t=this._min.data,i=this._max.data;return this._vec([(e&1?i:t)[0],(e&2?i:t)[1],(e&4?i:t)[2]])}getOctant(e){if(e<0||e>7)throw new Error(`Invalid octant ${e} > 7.`);const t=this.getCorner(e).data,i=this._min.add(this._max).getScaled(.5).data;return this._make(this._vec([Math.min(t[0],i[0]),Math.min(t[1],i[1]),Math.min(t[2],i[2])]),this._vec([Math.max(t[0],i[0]),Math.max(t[1],i[1]),Math.max(t[2],i[2])]))}}class k extends hs{static{o(this,"GfRange3d")}constructor(...e){super(),this._initFromArgs(e)}get _vecCtor(){return E}static get unitCube(){return new k(new E(0,0,0),new E(1,1,1))}}const si=1e-13;class b{static{o(this,"GfBBox3d")}_box;_matrix;_inverse;_isDegenerate;_hasZeroAreaPrimitives;constructor(e,t){if(this._box=new k,this._matrix=new x,this._inverse=new x,this._isDegenerate=!1,this._hasZeroAreaPrimitives=!1,e===void 0){this._matrix.setIdentity(),this._inverse.setIdentity();return}if(e instanceof b){this._box=new k(e._box),this._matrix=new x(e._matrix),this._inverse=new x(e._inverse),this._isDegenerate=e._isDegenerate,this._hasZeroAreaPrimitives=e._hasZeroAreaPrimitives;return}this._box=new k(e),t===void 0?(this._matrix.setIdentity(),this._inverse.setIdentity()):this._setMatrices(t)}Set(e,t){return this._box=new k(e),this._setMatrices(t),this}setMatrix(e){return this._setMatrices(e),this}setRange(e){return this._box=new k(e),this}getRange(){return new k(this._box)}_getRangeConstRef(){return this._box}_getMatrixConstRef(){return this._matrix}_getInverseMatrixConstRef(){return this._inverse}getBox(){return this.getRange()}getMatrix(){return new x(this._matrix)}getInverseMatrix(){return new x(this._inverse)}setHasZeroAreaPrimitives(e){return this._hasZeroAreaPrimitives=e,this}hasZeroAreaPrimitives(){return this._hasZeroAreaPrimitives}getVolume(){if(this._box.IsEmpty())return 0;const e=this._box.getSize().data;return Math.abs(this._matrix.getDeterminant3()*e[0]*e[1]*e[2])}Transform(e){return this._setMatrices(this._matrix.getMultiply(e)),this}ComputeAlignedRange(){if(this._box.IsEmpty())return new k(this._box);const e=this._matrix,t=[e.getElement(3,0),e.getElement(3,1),e.getElement(3,2)],i=[t[0],t[1],t[2]],s=[t[0],t[1],t[2]],n=this._box.getMin().data,a=this._box.getMax().data;for(let u=0;u<3;u++)for(let c=0;c<3;c++){const l=e.getElement(c,u),p=n[c]*l,h=a[c]*l;p<h?(i[u]+=p,s[u]+=h):(i[u]+=h,s[u]+=p)}return new k(new E(...i),new E(...s))}computeAlignedBox(){return this.ComputeAlignedRange()}computeCentroid(){const e=this.getRange().getMax(),t=this.getRange().getMin(),i=e.add(t).getScaled(.5);return this.getMatrix().Transform(i)}static combine(e,t){let i;if(e.getRange().IsEmpty())i=new b(t);else if(t.getRange().IsEmpty())i=new b(e);else if(e._isDegenerate)t._isDegenerate?i=new b(k.getUnion(e.ComputeAlignedRange(),t.ComputeAlignedRange())):i=b._combineInOrder(t,e);else if(t._isDegenerate)i=b._combineInOrder(e,t);else{const s=b._combineInOrder(e,t),n=b._combineInOrder(t,e),a=s.getVolume(),u=n.getVolume(),c=Math.max(1e-10,1e-6*Math.abs(Math.max(a,u)));i=Math.abs(a-u)<=c||a<u?s:n}return i.setHasZeroAreaPrimitives(e.hasZeroAreaPrimitives()||t.hasZeroAreaPrimitives()),i}static _combineInOrder(e,t){const i=new b;i._box=new k(t._box),i._matrix=t._matrix.getMultiply(e._inverse),i._inverse=e._matrix.getMultiply(t._inverse);const s=i.ComputeAlignedRange(),n=new b(e);return n._box.unionWith(s),n}_setMatrices(e){this._isDegenerate=!1,this._matrix=new x(e);const t=e.getDeterminant();this._inverse=e.getInverse(si),Math.abs(t)<=si&&(this._isDegenerate=!0,this._inverse.setIdentity())}equals(e){return this._box.equals(e._box)&&this._matrix.equals(e._matrix)}hash(){return`${this._box.hash()}|${this._matrix.hash()}`}toString(){return`[(${this._box.toString()}) (${this._matrix.toString()}) ${this._hasZeroAreaPrimitives?"true":"false"}]`}repr(){return`Gf.BBox3d(${this._box.repr()}, ${this._matrix.repr()})`}}class Ki{static{o(this,"SchemaBase")}_prim;_stage;_hasPrim;constructor(e,t){this._prim=e,this._stage=t??e?.getStage(),this._hasPrim=e!==void 0}static getSchemaAttributeNames(e=!0){return[]}get path(){return this._hasPrim?this._prim.path:""}get prim(){return this._prim}get stage(){return this._stage}isConcrete(){return this._schemaKind()==="concreteTyped"}isTyped(){const e=this._schemaKind();return e==="abstractTyped"||e==="concreteTyped"}isAppliedAPISchema(){const e=this._schemaKind();return e==="singleApplyAPI"||e==="multipleApplyAPI"}isValid(){return this._hasPrim&&this._prim.isValid()}_schemaKind(){const e=this.constructor;return e.typeName?N.findSchemaInfo(e.typeName)?.kind??"invalid":"invalid"}_attr(e,t){if(!this._hasPrim)throw new Error("Cannot access an attribute on an invalid schema");return this._prim.attr(e)}_declareAttr(e,t){if(!this._hasPrim)throw new Error("Cannot access an attribute on an invalid schema");return this._stage.declareProperty(this._prim.path,e,t),this._prim.attr(e)}_createAttr(e,t,i,s,n,a){if(a&&!i){const c=this._prim.getAttr(e);if(n===void 0||!c.hasAuthoredValue()&&Pr(c.get(),xr(n,t)))return c}const u=this._prim.createAttribute(e,t,i,s);return u.isValid()&&n!==void 0&&u.set(n),u}_rel(e){if(!this._hasPrim)throw new Error("Cannot access a relationship on an invalid schema");return this._prim.rel(e)}}class Le extends Ki{static{o(this,"Typed")}static typeName="Typed";static get(e,t){return new Le(e.getPrim(t),e)}static getSchemaAttributeNames(e=!0){return e?[]:[]}isValid(){return super.isValid()&&this.prim.isA(Le.typeName)}}class $e extends Ki{static{o(this,"APISchemaBase")}static typeName="APISchemaBase";static getSchemaAttributeNames(e=!0){return e?[]:[]}}const B=Object.freeze({apiSchemas:"apiSchemas",automatic:"automatic",clips:"clips",clipSets:"clipSets",collection:"collection",collection_MultipleApplyTemplate_:"collection:__INSTANCE_NAME__",collection_MultipleApplyTemplate_Excludes:"collection:__INSTANCE_NAME__:excludes",collection_MultipleApplyTemplate_ExpansionRule:"collection:__INSTANCE_NAME__:expansionRule",collection_MultipleApplyTemplate_IncludeRoot:"collection:__INSTANCE_NAME__:includeRoot",collection_MultipleApplyTemplate_Includes:"collection:__INSTANCE_NAME__:includes",collection_MultipleApplyTemplate_MembershipExpression:"collection:__INSTANCE_NAME__:membershipExpression",collection_MultipleApplyTemplate_Mode:"collection:__INSTANCE_NAME__:mode",colorSpaceDefinition:"colorSpaceDefinition",colorSpaceDefinition_MultipleApplyTemplate_BlueChroma:"colorSpaceDefinition:__INSTANCE_NAME__:blueChroma",colorSpaceDefinition_MultipleApplyTemplate_Gamma:"colorSpaceDefinition:__INSTANCE_NAME__:gamma",colorSpaceDefinition_MultipleApplyTemplate_GreenChroma:"colorSpaceDefinition:__INSTANCE_NAME__:greenChroma",colorSpaceDefinition_MultipleApplyTemplate_LinearBias:"colorSpaceDefinition:__INSTANCE_NAME__:linearBias",colorSpaceDefinition_MultipleApplyTemplate_Name:"colorSpaceDefinition:__INSTANCE_NAME__:name",colorSpaceDefinition_MultipleApplyTemplate_RedChroma:"colorSpaceDefinition:__INSTANCE_NAME__:redChroma",colorSpaceDefinition_MultipleApplyTemplate_WhitePoint:"colorSpaceDefinition:__INSTANCE_NAME__:whitePoint",colorSpaceName:"colorSpace:name",custom:"custom",exclude:"exclude",expandPrims:"expandPrims",expandPrimsAndProperties:"expandPrimsAndProperties",explicitOnly:"explicitOnly",expression:"expression",fallbackPrimTypes:"fallbackPrimTypes",relationship:"relationship",APISchemaBase:"APISchemaBase",ClipsAPI:"ClipsAPI",CollectionAPI:"CollectionAPI",ColorSpaceAPI:"ColorSpaceAPI",ColorSpaceDefinitionAPI:"ColorSpaceDefinitionAPI",ModelAPI:"ModelAPI",Typed:"Typed"});function ms(r){const e=[];let t=r;for(;t&&(e.push(t),t!=="/");){const i=t.lastIndexOf("/");t=i<=0?"/":t.slice(0,i)}return e}o(ms,"ancestorsInclusive");class dt{static{o(this,"CollectionMembershipQuery")}constructor(e,t,i){this._ruleMap=e,this._expressionMatch=t,this._expressionStage=i}_hasExpression(){return this._expressionStage!==void 0}_getExpressionStage(){return this._expressionStage}getAsPathExpansionRuleMap(){return new Map(this._ruleMap)}equals(e){if(!this.usesPathExpansionRuleMap()||!e.usesPathExpansionRuleMap())return!1;const t=e.getAsPathExpansionRuleMap();return this._ruleMap.size===t.size&&[...this._ruleMap].every(([i,s])=>t.get(i)===s)}hash(){return JSON.stringify([...this._ruleMap].sort(([e],[t])=>e.localeCompare(t)))}hasExcludes(){return[...this._ruleMap.values()].includes("exclude")}usesPathExpansionRuleMap(){return this._expressionMatch===void 0}static compute(e,t){const i=`collection:${t}:`,s=e.getAttr(`${i}expansionRule`)?.getValue(),n=s==="explicitOnly"||s==="expandPrimsAndProperties"?s:"expandPrims",a=new Map;for(const u of e.getAttr(`${i}includes`)?.getTargets()??[])a.set(u,n);e.getAttr(`${i}includeRoot`)?.getValue()===!0&&a.set("/",n);for(const u of e.getAttr(`${i}excludes`)?.getTargets()??[])a.set(u,"exclude");return new dt(a)}isPathIncluded(e){if(!e.startsWith("/"))throw new Error(`IsPathIncluded: path <${e}> is not absolute`);if(this._expressionMatch)return this._expressionMatch(e);for(const t of ms(e.includes(".")?e.slice(0,e.indexOf(".")):e)){const i=this._ruleMap.get(t);if(i!==void 0){if(i==="exclude")return!1;if(i==="expandPrimsAndProperties")return!0;if(e.includes(".")&&i==="expandPrims")return!1;if(i!=="explicitOnly"||t===e)return!0}}return!1}}function L(r,e){return N.makeMultipleApplyNameInstance(e,r)}o(L,"_namespacedPropertyName");class _ extends $e{static{o(this,"CollectionAPI")}static typeName="CollectionAPI";_name;constructor(e,t,i=""){super(e,t),this._name=i}getName(){return this._name}static get(e,t){if(!("getPrim"in e))return new _(e,e.getStage(),t);const i=_.isCollectionAPIPath(t);return i===void 0?new _(void 0,e):new _(e.getPrim(t.slice(0,t.indexOf("."))),e,i)}static getAll(e){const t="CollectionAPI:";return e.getAppliedSchemas().filter(i=>i.startsWith(t)).map(i=>new _(e,e.getStage(),i.slice(t.length)))}static isSchemaPropertyBaseName(e){return[N.getMultipleApplyNameTemplateBaseName(B.collection_MultipleApplyTemplate_ExpansionRule),N.getMultipleApplyNameTemplateBaseName(B.collection_MultipleApplyTemplate_IncludeRoot),N.getMultipleApplyNameTemplateBaseName(B.collection_MultipleApplyTemplate_MembershipExpression),N.getMultipleApplyNameTemplateBaseName(B.collection_MultipleApplyTemplate_Mode),N.getMultipleApplyNameTemplateBaseName(B.collection_MultipleApplyTemplate_),N.getMultipleApplyNameTemplateBaseName(B.collection_MultipleApplyTemplate_Includes),N.getMultipleApplyNameTemplateBaseName(B.collection_MultipleApplyTemplate_Excludes)].includes(e)}static isCollectionAPIPath(e){const t=e.lastIndexOf(".");if(t<0||e.slice(t+1).includes("["))return;const i=e.slice(t+1),s=i.split(":");if(!_.isSchemaPropertyBaseName(s[s.length-1])&&s.length>=2&&s[0]==="collection")return i.slice(11)}isValid(){return super.isValid()&&this._name!==""&&this.prim.hasAPI(_.typeName,this._name)}static canApply(e,t){return e.canApplyAPI(_.typeName,t)}static apply(e,t){return e.applyAPI(_.typeName,t)?new _(e,e.getStage(),t):new _(void 0,e.getStage())}static getSchemaAttributeNames(e=!0,t=""){const i=e?["collection:__INSTANCE_NAME__:expansionRule","collection:__INSTANCE_NAME__:includeRoot","collection:__INSTANCE_NAME__:membershipExpression","collection:__INSTANCE_NAME__:mode","collection:__INSTANCE_NAME__"]:["collection:__INSTANCE_NAME__:expansionRule","collection:__INSTANCE_NAME__:includeRoot","collection:__INSTANCE_NAME__:membershipExpression","collection:__INSTANCE_NAME__:mode","collection:__INSTANCE_NAME__"];return t===""?i:i.map(s=>N.makeMultipleApplyNameInstance(s,t))}getExpansionRuleAttr(){return this.prim.getAttr(L(this._name,B.collection_MultipleApplyTemplate_ExpansionRule))}createExpansionRuleAttr(e,t=!1){return this._createAttr(L(this._name,B.collection_MultipleApplyTemplate_ExpansionRule),"token",!1,"uniform",e,t)}getIncludeRootAttr(){return this.prim.getAttr(L(this._name,B.collection_MultipleApplyTemplate_IncludeRoot))}createIncludeRootAttr(e,t=!1){return this._createAttr(L(this._name,B.collection_MultipleApplyTemplate_IncludeRoot),"bool",!1,"uniform",e,t)}getMembershipExpressionAttr(){return this.prim.getAttr(L(this._name,B.collection_MultipleApplyTemplate_MembershipExpression))}createMembershipExpressionAttr(e,t=!1){return this._createAttr(L(this._name,B.collection_MultipleApplyTemplate_MembershipExpression),"pathExpression",!1,"uniform",e,t)}getModeAttr(){return this.prim.getAttr(L(this._name,B.collection_MultipleApplyTemplate_Mode))}createModeAttr(e,t=!1){return this._createAttr(L(this._name,B.collection_MultipleApplyTemplate_Mode),"token",!1,"uniform",e,t)}getCollectionAttr(){return this.prim.getAttr(L(this._name,B.collection_MultipleApplyTemplate_))}createCollectionAttr(e,t=!1){return this._createAttr(L(this._name,B.collection_MultipleApplyTemplate_),"opaque",!1,"uniform",e,t)}getIncludesRel(){return this.prim.rel(L(this._name,B.collection_MultipleApplyTemplate_Includes))}createIncludesRel(){return this.prim.createRelationship(L(this._name,B.collection_MultipleApplyTemplate_Includes),!1)}getExcludesRel(){return this.prim.rel(L(this._name,B.collection_MultipleApplyTemplate_Excludes))}createExcludesRel(){return this.prim.createRelationship(L(this._name,B.collection_MultipleApplyTemplate_Excludes),!1)}static getCollection(e,t){return"getStage"in e,_.get(e,t)}static getNamedCollectionPath(e,t){return`${e.path}.collection:${t}`}static getAllCollections(e){return _.getAll(e)}static canContainPropertyName(e){return e==="collection"||e.startsWith("collection:")}getCollectionPath(){return _.getNamedCollectionPath(this.prim,this._name)}_expansionRule(){const e=this.getExpansionRuleAttr().get();return e==="explicitOnly"||e==="expandPrimsAndProperties"?e:"expandPrims"}_includeRoot(){const e=this.getIncludeRootAttr();return e.hasAuthoredValue(),e.get()===!0}_computeRuleMap(e){const t=`${this.prim.path}:${this._name}`;if(e.has(t))return new Map;e.add(t);const i=new Map,s=this._expansionRule();for(const n of this.getIncludesRel().getTargets())if(_.isCollectionAPIPath(n)){const a=_.get(this.stage,n);for(const[u,c]of a._computeRuleMap(e))i.set(u,c)}else i.set(n,s);this._includeRoot()&&i.set("/",s);for(const n of this.getExcludesRel().getTargets())i.set(n,"exclude");return e.delete(t),i}computeMembershipQuery(){if(this.isInExpressionMode()){const e=this._resolveMembershipExpression(new Set);return new dt(new Map,e?t=>e.match(Ir.fromString(t),()=>_r.makeVarying(!0)).GetValue():()=>!1,e?this.stage:void 0)}return new dt(this._computeRuleMap(new Set))}static computeMembershipQuery(e){return e.computeMembershipQuery()}computeIncludedPaths(){return _.computeIncludedPaths(this.computeMembershipQuery(),this.stage)}computeIncludedObjects(){return this.computeIncludedPaths()}static computeIncludedPaths(e,t,i=ei){const s=[];if(!e.usesPathExpansionRuleMap()&&e._hasExpression()&&e._getExpressionStage()!==t)throw new ft(`Stage mismatch - collection from stage '${ni(e._getExpressionStage())}' cannot match objects on stage '${ni(t)}'`,gt.CodingError);for(const n of t.traverse(i)){e.isPathIncluded(n)&&s.push(n);for(const a of t.getPrim(n)?.attrNames??[]){const u=`${n}.${a}`;e.isPathIncluded(u)&&s.push(u)}}return s}static computeIncludedObjects(e,t,i=ei){return _.computeIncludedPaths(e,t,i)}includePath(e){return this.computeMembershipQuery().isPathIncluded(e)?!0:e==="/"?(this.createIncludeRootAttr(!0),!0):(this.getExcludesRel().setTargets(this.getExcludesRel().getTargets().filter(t=>t!==e)),this.getIncludesRel().addTarget(e),!0)}excludePath(e){return e==="/"?(this.createIncludeRootAttr(!1),!0):(this.getIncludesRel().setTargets(this.getIncludesRel().getTargets().filter(t=>t!==e)),this.getExcludesRel().addTarget(e),!0)}hasNoIncludedPaths(){const e=this.getMembershipExpressionAttr().get();return this.getIncludesRel().getTargets().length===0&&!this._includeRoot()&&(e==null||e==="")}isInRelationshipsMode(){const e=this.getModeAttr().get();return e==="relationship"?!0:e==="expression"?!1:this._includeRoot()||this.getIncludesRel().getTargets().length>0||this.getExcludesRel().getTargets().length>0}isInExpressionMode(){return!this.isInRelationshipsMode()}_resolveMembershipExpression(e){const t=`${this.prim.path}:${this._name}`;if(e.has(t))return He.Nothing();const i=this.getMembershipExpressionAttr().get(),s=i instanceof He?i:typeof i=="string"?new He(i):void 0;if(!s)return;e.add(t);const n=s.resolveReferences(a=>{const u=a.path.isEmpty()?this.prim.path:a.path.pathString;return _.get(this.stage,`${u}.collection:${a.name}`)._resolveMembershipExpression(e)??He.Nothing()});return e.delete(t),n}resolveCompleteMembershipExpression(){return this._resolveMembershipExpression(new Set)?.getText()}validate(){const e=this.getExpansionRuleAttr().get();return(e===void 0||e==="explicitOnly"||e==="expandPrims"||e==="expandPrimsAndProperties")&&!this._containsCycle(new Set,new Set)}_containsCycle(e,t){const i=`${this.prim.path}:${this._name}`;if(t.has(i))return!0;if(e.has(i))return!1;e.add(i),t.add(i);for(const s of this.getIncludesRel().getTargets())if(_.isCollectionAPIPath(s)&&_.get(this.stage,s)._containsCycle(e,t))return!0;return t.delete(i),!1}resetCollection(){return this.getIncludesRel().setTargets([]),this.getExcludesRel().setTargets([]),this.getMembershipExpressionAttr().clear(),!0}blockCollection(){return this.getIncludesRel().setTargets([]),this.getExcludesRel().setTargets([]),this.getMembershipExpressionAttr().set(null),!0}}function ni(r){const e=r.getSessionLayer();return`stage with rootLayer @${r.getRootLayer().identifier}@`+(e?`, sessionLayer @${e.identifier}@`:"")}o(ni,"usdDescribeStage");const fs={Plugins:[{Info:{SdfMetadata:{constraintTargetIdentifier:{appliesTo:["attributes"],default:"",documentation:"Unique identifier within a model's namespace for an matrix-valued attribute representing a constraint target",type:"token"},elementSize:{appliesTo:["attributes"],default:1,displayGroup:"Primvars",documentation:"The number of values in a primvar's value array that must be aggregated for each element on the primitive.",type:"int"},inactiveIds:{appliesTo:["prims"],type:"int64listop"},interpolation:{appliesTo:["attributes"],default:"constant",displayGroup:"Primvars",documentation:"How a primvar interpolates across a primitive; equivalent to RenderMan's 'class specifier'",type:"token"},metersPerUnit:{appliesTo:["layers"],default:.01,displayGroup:"Stage",type:"double"},unauthoredValuesIndex:{appliesTo:["attributes"],default:-1,displayGroup:"Primvars",documentation:"The index that represents unauthored values in the indices array of an indexed primvar.",type:"int"},upAxis:{appliesTo:["layers"],default:"Y",displayGroup:"Stage",type:"token"}},Types:{UsdGeomBackPlateAPI:{alias:{UsdSchemaBase:"BackPlateAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"BackPlateAPI",schemaKind:"multipleApplyAPI"},UsdGeomBasisCurves:{alias:{UsdSchemaBase:"BasisCurves"},autoGenerated:!0,bases:["UsdGeomCurves"],schemaIdentifier:"BasisCurves",schemaKind:"concreteTyped"},UsdGeomBoundable:{alias:{UsdSchemaBase:"Boundable"},autoGenerated:!0,bases:["UsdGeomXformable"],schemaIdentifier:"Boundable",schemaKind:"abstractTyped"},UsdGeomCamera:{alias:{UsdSchemaBase:"Camera"},autoGenerated:!0,bases:["UsdGeomXformable"],schemaIdentifier:"Camera",schemaKind:"concreteTyped"},UsdGeomCapsule:{alias:{UsdSchemaBase:"Capsule"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Capsule",schemaKind:"concreteTyped"},UsdGeomCapsule_1:{alias:{UsdSchemaBase:"Capsule_1"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Capsule_1",schemaKind:"concreteTyped"},UsdGeomCone:{alias:{UsdSchemaBase:"Cone"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Cone",schemaKind:"concreteTyped"},UsdGeomCube:{alias:{UsdSchemaBase:"Cube"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Cube",schemaKind:"concreteTyped"},UsdGeomCurves:{alias:{UsdSchemaBase:"Curves"},autoGenerated:!0,bases:["UsdGeomPointBased"],implementsComputeExtent:!0,schemaIdentifier:"Curves",schemaKind:"abstractTyped"},UsdGeomCylinder:{alias:{UsdSchemaBase:"Cylinder"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Cylinder",schemaKind:"concreteTyped"},UsdGeomCylinder_1:{alias:{UsdSchemaBase:"Cylinder_1"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Cylinder_1",schemaKind:"concreteTyped"},UsdGeomGprim:{alias:{UsdSchemaBase:"Gprim"},autoGenerated:!0,bases:["UsdGeomBoundable"],schemaIdentifier:"Gprim",schemaKind:"abstractTyped"},UsdGeomHermiteCurves:{alias:{UsdSchemaBase:"HermiteCurves"},autoGenerated:!0,bases:["UsdGeomCurves"],schemaIdentifier:"HermiteCurves",schemaKind:"concreteTyped"},UsdGeomImageable:{alias:{UsdSchemaBase:"Imageable"},autoGenerated:!0,bases:["UsdTyped"],schemaIdentifier:"Imageable",schemaKind:"abstractTyped"},UsdGeomMesh:{alias:{UsdSchemaBase:"Mesh"},autoGenerated:!0,bases:["UsdGeomPointBased"],schemaIdentifier:"Mesh",schemaKind:"concreteTyped"},UsdGeomModelAPI:{alias:{UsdSchemaBase:"GeomModelAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"GeomModelAPI",schemaKind:"singleApplyAPI"},UsdGeomMotionAPI:{alias:{UsdSchemaBase:"MotionAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"MotionAPI",schemaKind:"singleApplyAPI"},UsdGeomNurbsCurves:{alias:{UsdSchemaBase:"NurbsCurves"},autoGenerated:!0,bases:["UsdGeomCurves"],schemaIdentifier:"NurbsCurves",schemaKind:"concreteTyped"},UsdGeomNurbsPatch:{alias:{UsdSchemaBase:"NurbsPatch"},autoGenerated:!0,bases:["UsdGeomPointBased"],schemaIdentifier:"NurbsPatch",schemaKind:"concreteTyped"},UsdGeomPlane:{alias:{UsdSchemaBase:"Plane"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Plane",schemaKind:"concreteTyped"},UsdGeomPointBased:{alias:{UsdSchemaBase:"PointBased"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"PointBased",schemaKind:"abstractTyped"},UsdGeomPointInstancer:{alias:{UsdSchemaBase:"PointInstancer"},autoGenerated:!0,bases:["UsdGeomBoundable"],implementsComputeExtent:!0,schemaIdentifier:"PointInstancer",schemaKind:"concreteTyped"},UsdGeomPoints:{alias:{UsdSchemaBase:"Points"},autoGenerated:!0,bases:["UsdGeomPointBased"],implementsComputeExtent:!0,schemaIdentifier:"Points",schemaKind:"concreteTyped"},UsdGeomPrimvarsAPI:{alias:{UsdSchemaBase:"PrimvarsAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"PrimvarsAPI",schemaKind:"nonAppliedAPI"},UsdGeomScope:{alias:{UsdSchemaBase:"Scope"},autoGenerated:!0,bases:["UsdGeomImageable"],schemaIdentifier:"Scope",schemaKind:"concreteTyped"},UsdGeomSphere:{alias:{UsdSchemaBase:"Sphere"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Sphere",schemaKind:"concreteTyped"},UsdGeomSubset:{alias:{UsdSchemaBase:"GeomSubset"},autoGenerated:!0,bases:["UsdTyped"],schemaIdentifier:"GeomSubset",schemaKind:"concreteTyped"},UsdGeomTetMesh:{alias:{UsdSchemaBase:"TetMesh"},autoGenerated:!0,bases:["UsdGeomPointBased"],schemaIdentifier:"TetMesh",schemaKind:"concreteTyped"},UsdGeomVisibilityAPI:{alias:{UsdSchemaBase:"VisibilityAPI"},apiSchemaCanOnlyApplyTo:["Imageable"],autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"VisibilityAPI",schemaKind:"singleApplyAPI"},UsdGeomXform:{alias:{UsdSchemaBase:"Xform"},autoGenerated:!0,bases:["UsdGeomXformable"],schemaIdentifier:"Xform",schemaKind:"concreteTyped"},UsdGeomXformCommonAPI:{alias:{UsdSchemaBase:"XformCommonAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"XformCommonAPI",schemaKind:"nonAppliedAPI"},UsdGeomXformable:{alias:{UsdSchemaBase:"Xformable"},autoGenerated:!0,bases:["UsdGeomImageable"],schemaIdentifier:"Xformable",schemaKind:"abstractTyped"}}},LibraryPath:"@PLUG_INFO_LIBRARY_PATH@",Name:"usdGeom",ResourcePath:"@PLUG_INFO_RESOURCE_PATH@",Root:"@PLUG_INFO_ROOT@",Type:"library"}]},gs=`#usda 1.0
(
    "WARNING: THIS FILE IS GENERATED BY usdGenSchema.  DO NOT EDIT."
)

class "Imageable" (
    customData = {
        string userDocBrief = """Base class for all prims that can be rendered 
or displayed in a 3D scene."""
    }
)
{
    rel proxyPrim (
        customData = {
            string userDocBrief = """Links a render prim to its proxy 
representation."""
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Classifies geometry into categories 
that describe why a prim may be rendered. Used for selective inclusion in 
traversals of prims on a stage, such as rendering or bounding-box computation 
traversals."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = """Controls whether the prim and its subtree 
should be rendered."""
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
        string userDocBrief = """Base class to endow a prim with a configurable 
affine transformation (e.g. translate, rotate, scale, etc.)."""
    }
)
{
    rel proxyPrim (
        customData = {
            string userDocBrief = """Links a render prim to its proxy 
representation."""
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Classifies geometry into categories 
that describe why a prim may be rendered. Used for selective inclusion in 
traversals of prims on a stage, such as rendering or bounding-box computation 
traversals."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = """Controls whether the prim and its subtree 
should be rendered."""
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation 
operations in the order they should be applied."""
        }
    )
}

class Scope "Scope" (
    customData = {
        string userDocBrief = """Base class for all prims that can be rendered 
or displayed in a 3D scene."""
    }
)
{
    rel proxyPrim (
        customData = {
            string userDocBrief = """Links a render prim to its proxy 
representation."""
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Classifies geometry into categories 
that describe why a prim may be rendered. Used for selective inclusion in 
traversals of prims on a stage, such as rendering or bounding-box computation 
traversals."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = """Controls whether the prim and its subtree 
should be rendered."""
        }
    )
}

class Xform "Xform" (
    customData = {
        string userDocBrief = """Base class to endow a prim with a configurable 
affine transformation (e.g. translate, rotate, scale, etc.)."""
    }
)
{
    rel proxyPrim (
        customData = {
            string userDocBrief = """Links a render prim to its proxy 
representation."""
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Classifies geometry into categories 
that describe why a prim may be rendered. Used for selective inclusion in 
traversals of prims on a stage, such as rendering or bounding-box computation 
traversals."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = """Controls whether the prim and its subtree 
should be rendered."""
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation 
operations in the order they should be applied."""
        }
    )
}

class "Boundable" (
    customData = {
        string userDocBrief = """Base class for prims that can have 
rectilinear, local-space extents calculated and cached."""
    }
)
{
    float3[] extent (
        customData = {
            string userDocBrief = """Specifies the bounding box of the prim in 
local space."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = """Links a render prim to its proxy 
representation."""
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Classifies geometry into categories 
that describe why a prim may be rendered. Used for selective inclusion in 
traversals of prims on a stage, such as rendering or bounding-box computation 
traversals."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = """Controls whether the prim and its subtree 
should be rendered."""
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation 
operations in the order they should be applied."""
        }
    )
}

class "Gprim" (
    customData = {
        string userDocBrief = """Base schema for all geometric primitives that 
directly define renderable shapes."""
    }
)
{
    uniform bool doubleSided = 0 (
        customData = {
            string userDocBrief = """Controls whether the surface should be 
rendered from both sides."""
        }
    )
    float3[] extent (
        customData = {
            string userDocBrief = """Specifies the bounding box of the prim in 
local space."""
        }
    )
    uniform token orientation = "rightHanded" (
        allowedTokens = ["rightHanded", "leftHanded"]
        customData = {
            string userDocBrief = """Specifies the winding order for surface 
normal computation."""
        }
    )
    color3f[] primvars:displayColor (
        customData = {
            string userDocBrief = """Specifies a color for display and modeling 
purposes. Consumed by shaders that specifically look for a displayColor primvar."""
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies 
opacity independently."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = """Links a render prim to its proxy 
representation."""
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Classifies geometry into categories 
that describe why a prim may be rendered. Used for selective inclusion in 
traversals of prims on a stage, such as rendering or bounding-box computation 
traversals."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = """Controls whether the prim and its subtree 
should be rendered."""
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation 
operations in the order they should be applied."""
        }
    )
}

class Cube "Cube" (
    customData = {
        string userDocBrief = """Base schema for all geometric primitives that 
directly define renderable shapes."""
    }
)
{
    uniform bool doubleSided = 0 (
        customData = {
            string userDocBrief = """Controls whether the surface should be 
rendered from both sides."""
        }
    )
    float3[] extent = [(-1, -1, -1), (1, 1, 1)] (
        customData = {
            string userDocBrief = """Specifies the bounding box of the prim in 
local space."""
        }
    )
    uniform token orientation = "rightHanded" (
        allowedTokens = ["rightHanded", "leftHanded"]
        customData = {
            string userDocBrief = """Specifies the winding order for surface 
normal computation."""
        }
    )
    color3f[] primvars:displayColor (
        customData = {
            string userDocBrief = """Specifies a color for display and modeling 
purposes. Consumed by shaders that specifically look for a displayColor primvar."""
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies 
opacity independently."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = """Links a render prim to its proxy 
representation."""
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Classifies geometry into categories 
that describe why a prim may be rendered. Used for selective inclusion in 
traversals of prims on a stage, such as rendering or bounding-box computation 
traversals."""
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
            string userDocBrief = """Controls whether the prim and its subtree 
should be rendered."""
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation 
operations in the order they should be applied."""
        }
    )
}

class Sphere "Sphere" (
    customData = {
        string userDocBrief = "A spherical primitive centered at the origin."
    }
)
{
    uniform bool doubleSided = 0 (
        customData = {
            string userDocBrief = """Controls whether the surface should be 
rendered from both sides."""
        }
    )
    float3[] extent = [(-1, -1, -1), (1, 1, 1)] (
        customData = {
            string userDocBrief = """Specifies the bounding box of the prim in 
local space."""
        }
    )
    uniform token orientation = "rightHanded" (
        allowedTokens = ["rightHanded", "leftHanded"]
        customData = {
            string userDocBrief = """Specifies the winding order for surface 
normal computation."""
        }
    )
    color3f[] primvars:displayColor (
        customData = {
            string userDocBrief = """Specifies a color for display and modeling 
purposes. Consumed by shaders that specifically look for a displayColor primvar."""
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies 
opacity independently."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = """Links a render prim to its proxy 
representation."""
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Classifies geometry into categories 
that describe why a prim may be rendered. Used for selective inclusion in 
traversals of prims on a stage, such as rendering or bounding-box computation 
traversals."""
        }
    )
    double radius = 1 (
        customData = {
            string userDocBrief = "Specifies the radius of the sphere."
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = """Controls whether the prim and its subtree 
should be rendered."""
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation 
operations in the order they should be applied."""
        }
    )
}

class Cylinder "Cylinder" (
    customData = {
        string userDocBrief = """Base schema for all geometric primitives that 
directly define renderable shapes."""
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
            string userDocBrief = """Controls whether the surface should be 
rendered from both sides."""
        }
    )
    float3[] extent = [(-1, -1, -1), (1, 1, 1)] (
        customData = {
            string userDocBrief = """Specifies the bounding box of the prim in 
local space."""
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
            string userDocBrief = """Specifies the winding order for surface 
normal computation."""
        }
    )
    color3f[] primvars:displayColor (
        customData = {
            string userDocBrief = """Specifies a color for display and modeling 
purposes. Consumed by shaders that specifically look for a displayColor primvar."""
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies 
opacity independently."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = """Links a render prim to its proxy 
representation."""
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Classifies geometry into categories 
that describe why a prim may be rendered. Used for selective inclusion in 
traversals of prims on a stage, such as rendering or bounding-box computation 
traversals."""
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
            string userDocBrief = """Controls whether the prim and its subtree 
should be rendered."""
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation 
operations in the order they should be applied."""
        }
    )
}

class Capsule "Capsule" (
    customData = {
        string userDocBrief = """Base schema for all geometric primitives that 
directly define renderable shapes."""
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
            string userDocBrief = """Controls whether the surface should be 
rendered from both sides."""
        }
    )
    float3[] extent = [(-0.5, -0.5, -1), (0.5, 0.5, 1)] (
        customData = {
            string userDocBrief = """Specifies the bounding box of the prim in 
local space."""
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
            string userDocBrief = """Specifies the winding order for surface 
normal computation."""
        }
    )
    color3f[] primvars:displayColor (
        customData = {
            string userDocBrief = """Specifies a color for display and modeling 
purposes. Consumed by shaders that specifically look for a displayColor primvar."""
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies 
opacity independently."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = """Links a render prim to its proxy 
representation."""
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Classifies geometry into categories 
that describe why a prim may be rendered. Used for selective inclusion in 
traversals of prims on a stage, such as rendering or bounding-box computation 
traversals."""
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
            string userDocBrief = """Controls whether the prim and its subtree 
should be rendered."""
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation 
operations in the order they should be applied."""
        }
    )
}

class Cone "Cone" (
    customData = {
        string userDocBrief = """Base schema for all geometric primitives that 
directly define renderable shapes."""
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
            string userDocBrief = """Controls whether the surface should be 
rendered from both sides."""
        }
    )
    float3[] extent = [(-1, -1, -1), (1, 1, 1)] (
        customData = {
            string userDocBrief = """Specifies the bounding box of the prim in 
local space."""
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
            string userDocBrief = """Specifies the winding order for surface 
normal computation."""
        }
    )
    color3f[] primvars:displayColor (
        customData = {
            string userDocBrief = """Specifies a color for display and modeling 
purposes. Consumed by shaders that specifically look for a displayColor primvar."""
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies 
opacity independently."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = """Links a render prim to its proxy 
representation."""
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Classifies geometry into categories 
that describe why a prim may be rendered. Used for selective inclusion in 
traversals of prims on a stage, such as rendering or bounding-box computation 
traversals."""
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
            string userDocBrief = """Controls whether the prim and its subtree 
should be rendered."""
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation 
operations in the order they should be applied."""
        }
    )
}

class Cylinder_1 "Cylinder_1" (
    customData = {
        string userDocBrief = """Base schema for all geometric primitives that 
directly define renderable shapes."""
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
            string userDocBrief = """Controls whether the surface should be 
rendered from both sides."""
        }
    )
    float3[] extent = [(-1, -1, -1), (1, 1, 1)] (
        customData = {
            string userDocBrief = """Specifies the bounding box of the prim in 
local space."""
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
            string userDocBrief = """Specifies the winding order for surface 
normal computation."""
        }
    )
    color3f[] primvars:displayColor (
        customData = {
            string userDocBrief = """Specifies a color for display and modeling 
purposes. Consumed by shaders that specifically look for a displayColor primvar."""
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies 
opacity independently."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = """Links a render prim to its proxy 
representation."""
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Classifies geometry into categories 
that describe why a prim may be rendered. Used for selective inclusion in 
traversals of prims on a stage, such as rendering or bounding-box computation 
traversals."""
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
            string userDocBrief = """Controls whether the prim and its subtree 
should be rendered."""
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation 
operations in the order they should be applied."""
        }
    )
}

class Capsule_1 "Capsule_1" (
    customData = {
        string userDocBrief = """Base schema for all geometric primitives that 
directly define renderable shapes."""
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
            string userDocBrief = """Controls whether the surface should be 
rendered from both sides."""
        }
    )
    float3[] extent = [(-0.5, -0.5, -1), (0.5, 0.5, 1)] (
        customData = {
            string userDocBrief = """Specifies the bounding box of the prim in 
local space."""
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
            string userDocBrief = """Specifies the winding order for surface 
normal computation."""
        }
    )
    color3f[] primvars:displayColor (
        customData = {
            string userDocBrief = """Specifies a color for display and modeling 
purposes. Consumed by shaders that specifically look for a displayColor primvar."""
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies 
opacity independently."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = """Links a render prim to its proxy 
representation."""
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Classifies geometry into categories 
that describe why a prim may be rendered. Used for selective inclusion in 
traversals of prims on a stage, such as rendering or bounding-box computation 
traversals."""
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
            string userDocBrief = """Controls whether the prim and its subtree 
should be rendered."""
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation 
operations in the order they should be applied."""
        }
    )
}

class Plane "Plane" (
    customData = {
        string userDocBrief = """Base schema for all geometric primitives that 
directly define renderable shapes."""
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
            string userDocBrief = """Controls whether the surface should be 
rendered from both sides."""
        }
    )
    float3[] extent = [(-1, -1, 0), (1, 1, 0)] (
        customData = {
            string userDocBrief = """Specifies the bounding box of the prim in 
local space."""
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
            string userDocBrief = """Specifies the winding order for surface 
normal computation."""
        }
    )
    color3f[] primvars:displayColor (
        customData = {
            string userDocBrief = """Specifies a color for display and modeling 
purposes. Consumed by shaders that specifically look for a displayColor primvar."""
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies 
opacity independently."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = """Links a render prim to its proxy 
representation."""
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Classifies geometry into categories 
that describe why a prim may be rendered. Used for selective inclusion in 
traversals of prims on a stage, such as rendering or bounding-box computation 
traversals."""
        }
    )
    token visibility = "inherited" (
        allowedTokens = ["inherited", "invisible"]
        customData = {
            string userDocBrief = """Controls whether the prim and its subtree 
should be rendered."""
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
            string userDocBrief = """Encodes the sequence of transformation 
operations in the order they should be applied."""
        }
    )
}

class "PointBased" (
    customData = {
        string userDocBrief = """Base schema for all geometric primitives that 
directly define renderable shapes."""
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
            string userDocBrief = """Controls whether the surface should be 
rendered from both sides."""
        }
    )
    float3[] extent (
        customData = {
            string userDocBrief = """Specifies the bounding box of the prim in 
local space."""
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
            string userDocBrief = """Specifies the winding order for surface 
normal computation."""
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
            string userDocBrief = """Specifies a color for display and modeling 
purposes. Consumed by shaders that specifically look for a displayColor primvar."""
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies 
opacity independently."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = """Links a render prim to its proxy 
representation."""
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Classifies geometry into categories 
that describe why a prim may be rendered. Used for selective inclusion in 
traversals of prims on a stage, such as rendering or bounding-box computation 
traversals."""
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
            string userDocBrief = """Controls whether the prim and its subtree 
should be rendered."""
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation 
operations in the order they should be applied."""
        }
    )
}

class Mesh "Mesh" (
    customData = {
        string userDocBrief = """Base schema for all geometric primitives that 
directly define renderable shapes."""
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
            string userDocBrief = """Controls whether the surface should be 
rendered from both sides."""
        }
    )
    float3[] extent (
        customData = {
            string userDocBrief = """Specifies the bounding box of the prim in 
local space."""
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
            string userDocBrief = """Specifies the winding order for surface 
normal computation."""
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
            string userDocBrief = """Specifies a color for display and modeling 
purposes. Consumed by shaders that specifically look for a displayColor primvar."""
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies 
opacity independently."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = """Links a render prim to its proxy 
representation."""
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Classifies geometry into categories 
that describe why a prim may be rendered. Used for selective inclusion in 
traversals of prims on a stage, such as rendering or bounding-box computation 
traversals."""
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
            string userDocBrief = """Controls whether the prim and its subtree 
should be rendered."""
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation 
operations in the order they should be applied."""
        }
    )
}

class TetMesh "TetMesh" (
    customData = {
        string userDocBrief = """Base schema for all geometric primitives that 
directly define renderable shapes."""
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
            string userDocBrief = """Controls whether the surface should be 
rendered from both sides."""
        }
    )
    float3[] extent (
        customData = {
            string userDocBrief = """Specifies the bounding box of the prim in 
local space."""
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
            string userDocBrief = """Specifies the winding order for surface 
normal computation."""
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
            string userDocBrief = """Specifies a color for display and modeling 
purposes. Consumed by shaders that specifically look for a displayColor primvar."""
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies 
opacity independently."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = """Links a render prim to its proxy 
representation."""
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Classifies geometry into categories 
that describe why a prim may be rendered. Used for selective inclusion in 
traversals of prims on a stage, such as rendering or bounding-box computation 
traversals."""
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
            string userDocBrief = """Controls whether the prim and its subtree 
should be rendered."""
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation 
operations in the order they should be applied."""
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
        string userDocBrief = """Base schema for all geometric primitives that 
directly define renderable shapes."""
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
            string userDocBrief = """Controls whether the surface should be 
rendered from both sides."""
        }
    )
    float3[] extent (
        customData = {
            string userDocBrief = """Specifies the bounding box of the prim in 
local space."""
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
            string userDocBrief = """Specifies the winding order for surface 
normal computation."""
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
            string userDocBrief = """Specifies a color for display and modeling 
purposes. Consumed by shaders that specifically look for a displayColor primvar."""
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies 
opacity independently."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = """Links a render prim to its proxy 
representation."""
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Classifies geometry into categories 
that describe why a prim may be rendered. Used for selective inclusion in 
traversals of prims on a stage, such as rendering or bounding-box computation 
traversals."""
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
            string userDocBrief = """Controls whether the prim and its subtree 
should be rendered."""
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
            string userDocBrief = """Encodes the sequence of transformation 
operations in the order they should be applied."""
        }
    )
}

class "Curves" (
    customData = {
        string userDocBrief = """Base schema for all geometric primitives that 
directly define renderable shapes."""
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
            string userDocBrief = """Controls whether the surface should be 
rendered from both sides."""
        }
    )
    float3[] extent (
        customData = {
            string userDocBrief = """Specifies the bounding box of the prim in 
local space."""
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
            string userDocBrief = """Specifies the winding order for surface 
normal computation."""
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
            string userDocBrief = """Specifies a color for display and modeling 
purposes. Consumed by shaders that specifically look for a displayColor primvar."""
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies 
opacity independently."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = """Links a render prim to its proxy 
representation."""
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Classifies geometry into categories 
that describe why a prim may be rendered. Used for selective inclusion in 
traversals of prims on a stage, such as rendering or bounding-box computation 
traversals."""
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
            string userDocBrief = """Controls whether the prim and its subtree 
should be rendered."""
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
            string userDocBrief = """Encodes the sequence of transformation 
operations in the order they should be applied."""
        }
    )
}

class BasisCurves "BasisCurves" (
    customData = {
        string userDocBrief = """Base schema for all geometric primitives that 
directly define renderable shapes."""
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
            string userDocBrief = """Controls whether the surface should be 
rendered from both sides."""
        }
    )
    float3[] extent (
        customData = {
            string userDocBrief = """Specifies the bounding box of the prim in 
local space."""
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
            string userDocBrief = """Specifies the winding order for surface 
normal computation."""
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
            string userDocBrief = """Specifies a color for display and modeling 
purposes. Consumed by shaders that specifically look for a displayColor primvar."""
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies 
opacity independently."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = """Links a render prim to its proxy 
representation."""
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Classifies geometry into categories 
that describe why a prim may be rendered. Used for selective inclusion in 
traversals of prims on a stage, such as rendering or bounding-box computation 
traversals."""
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
            string userDocBrief = """Controls whether the prim and its subtree 
should be rendered."""
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
            string userDocBrief = """Encodes the sequence of transformation 
operations in the order they should be applied."""
        }
    )
}

class NurbsCurves "NurbsCurves" (
    customData = {
        string userDocBrief = """Base schema for all geometric primitives that 
directly define renderable shapes."""
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
            string userDocBrief = """Controls whether the surface should be 
rendered from both sides."""
        }
    )
    float3[] extent (
        customData = {
            string userDocBrief = """Specifies the bounding box of the prim in 
local space."""
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
            string userDocBrief = """Specifies the winding order for surface 
normal computation."""
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
            string userDocBrief = """Specifies a color for display and modeling 
purposes. Consumed by shaders that specifically look for a displayColor primvar."""
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies 
opacity independently."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = """Links a render prim to its proxy 
representation."""
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Classifies geometry into categories 
that describe why a prim may be rendered. Used for selective inclusion in 
traversals of prims on a stage, such as rendering or bounding-box computation 
traversals."""
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
            string userDocBrief = """Controls whether the prim and its subtree 
should be rendered."""
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
            string userDocBrief = """Encodes the sequence of transformation 
operations in the order they should be applied."""
        }
    )
}

class Points "Points" (
    customData = {
        string userDocBrief = """Base schema for all geometric primitives that 
directly define renderable shapes."""
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
            string userDocBrief = """Controls whether the surface should be 
rendered from both sides."""
        }
    )
    float3[] extent (
        customData = {
            string userDocBrief = """Specifies the bounding box of the prim in 
local space."""
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
            string userDocBrief = """Specifies the winding order for surface 
normal computation."""
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
            string userDocBrief = """Specifies a color for display and modeling 
purposes. Consumed by shaders that specifically look for a displayColor primvar."""
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies 
opacity independently."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = """Links a render prim to its proxy 
representation."""
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Classifies geometry into categories 
that describe why a prim may be rendered. Used for selective inclusion in 
traversals of prims on a stage, such as rendering or bounding-box computation 
traversals."""
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
            string userDocBrief = """Controls whether the prim and its subtree 
should be rendered."""
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
            string userDocBrief = """Encodes the sequence of transformation 
operations in the order they should be applied."""
        }
    )
}

class PointInstancer "PointInstancer" (
    customData = {
        string userDocBrief = """Base class for prims that can have 
rectilinear, local-space extents calculated and cached."""
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
            string userDocBrief = """Specifies the bounding box of the prim in 
local space."""
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
            string userDocBrief = """Links a render prim to its proxy 
representation."""
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Classifies geometry into categories 
that describe why a prim may be rendered. Used for selective inclusion in 
traversals of prims on a stage, such as rendering or bounding-box computation 
traversals."""
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
            string userDocBrief = """Controls whether the prim and its subtree 
should be rendered."""
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation 
operations in the order they should be applied."""
        }
    )
}

class Camera "Camera" (
    customData = {
        string userDocBrief = """Base class to endow a prim with a configurable 
affine transformation (e.g. translate, rotate, scale, etc.)."""
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
            string userDocBrief = """Links a render prim to its proxy 
representation."""
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Classifies geometry into categories 
that describe why a prim may be rendered. Used for selective inclusion in 
traversals of prims on a stage, such as rendering or bounding-box computation 
traversals."""
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
            string userDocBrief = """Controls whether the prim and its subtree 
should be rendered."""
        }
    )
    uniform token[] xformOpOrder (
        customData = {
            string userDocBrief = """Encodes the sequence of transformation 
operations in the order they should be applied."""
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
        string userDocBrief = """Base schema for all geometric primitives that 
directly define renderable shapes."""
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
            string userDocBrief = """Controls whether the surface should be 
rendered from both sides."""
        }
    )
    float3[] extent (
        customData = {
            string userDocBrief = """Specifies the bounding box of the prim in 
local space."""
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
            string userDocBrief = """Specifies the winding order for surface 
normal computation."""
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
            string userDocBrief = """Specifies a color for display and modeling 
purposes. Consumed by shaders that specifically look for a displayColor primvar."""
        }
    )
    float[] primvars:displayOpacity (
        customData = {
            string userDocBrief = """Companion to displayColor that specifies 
opacity independently."""
        }
    )
    rel proxyPrim (
        customData = {
            string userDocBrief = """Links a render prim to its proxy 
representation."""
        }
    )
    uniform token purpose = "default" (
        allowedTokens = ["default", "render", "proxy", "guide"]
        customData = {
            string userDocBrief = """Classifies geometry into categories 
that describe why a prim may be rendered. Used for selective inclusion in 
traversals of prims on a stage, such as rendering or bounding-box computation 
traversals."""
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
            string userDocBrief = """Controls whether the prim and its subtree 
should be rendered."""
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
            string userDocBrief = """Encodes the sequence of transformation 
operations in the order they should be applied."""
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
    float3 backPlate:__INSTANCE_NAME__:luma:offset = (0, 0, 0)
    float3 backPlate:__INSTANCE_NAME__:luma:power = (1, 1, 1)
    float3 backPlate:__INSTANCE_NAME__:luma:slope = (1, 1, 1)
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

`;V.GetInstance().RegisterPlugins(fs,{usdGeom:{"generatedSchema.usda":gs}});const y=Object.freeze({accelerations:"accelerations",all:"all",angularVelocities:"angularVelocities",axis:"axis",backPlate:"backPlate",backPlate_MultipleApplyTemplate_AlphaImage:"backPlate:__INSTANCE_NAME__:alpha:image",backPlate_MultipleApplyTemplate_DepthCameraSpaceOffset:"backPlate:__INSTANCE_NAME__:depth:cameraSpaceOffset",backPlate_MultipleApplyTemplate_DepthImage:"backPlate:__INSTANCE_NAME__:depth:image",backPlate_MultipleApplyTemplate_DepthMinOffset:"backPlate:__INSTANCE_NAME__:depth:minOffset",backPlate_MultipleApplyTemplate_DepthNormalizingFactor:"backPlate:__INSTANCE_NAME__:depth:normalizingFactor",backPlate_MultipleApplyTemplate_Image:"backPlate:__INSTANCE_NAME__:image",backPlate_MultipleApplyTemplate_LumaOffset:"backPlate:__INSTANCE_NAME__:luma:offset",backPlate_MultipleApplyTemplate_LumaPower:"backPlate:__INSTANCE_NAME__:luma:power",backPlate_MultipleApplyTemplate_LumaSlope:"backPlate:__INSTANCE_NAME__:luma:slope",backPlate_MultipleApplyTemplate_PlateVisibility:"backPlate:__INSTANCE_NAME__:plateVisibility",backPlate_MultipleApplyTemplate_RotateXYZTweak:"backPlate:__INSTANCE_NAME__:rotateXYZ:tweak",backPlate_MultipleApplyTemplate_ScaleTweak:"backPlate:__INSTANCE_NAME__:scale:tweak",backPlate_MultipleApplyTemplate_TranslateTweak:"backPlate:__INSTANCE_NAME__:translate:tweak",basis:"basis",bezier:"bezier",bilinear:"bilinear",boundaries:"boundaries",bounds:"bounds",box:"box",bspline:"bspline",cards:"cards",catmullClark:"catmullClark",catmullRom:"catmullRom",clippingPlanes:"clippingPlanes",clippingRange:"clippingRange",closed:"closed",constant:"constant",cornerIndices:"cornerIndices",cornerSharpnesses:"cornerSharpnesses",cornersOnly:"cornersOnly",cornersPlus1:"cornersPlus1",cornersPlus2:"cornersPlus2",creaseIndices:"creaseIndices",creaseLengths:"creaseLengths",creaseSharpnesses:"creaseSharpnesses",cross:"cross",cubic:"cubic",curveVertexCounts:"curveVertexCounts",default_:"default",doubleSided:"doubleSided",edge:"edge",edgeAndCorner:"edgeAndCorner",edgeOnly:"edgeOnly",elementSize:"elementSize",elementType:"elementType",exposure:"exposure",exposureFStop:"exposure:fStop",exposureIso:"exposure:iso",exposureResponsivity:"exposure:responsivity",exposureTime:"exposure:time",extent:"extent",extentsHint:"extentsHint",face:"face",faceVarying:"faceVarying",faceVaryingLinearInterpolation:"faceVaryingLinearInterpolation",faceVertexCounts:"faceVertexCounts",faceVertexIndices:"faceVertexIndices",familyName:"familyName",focalLength:"focalLength",focusDistance:"focusDistance",fromTexture:"fromTexture",fStop:"fStop",full:"full",guide:"guide",guideVisibility:"guideVisibility",height:"height",hermite:"hermite",holeIndices:"holeIndices",horizontalAperture:"horizontalAperture",horizontalApertureOffset:"horizontalApertureOffset",ids:"ids",inactiveIds:"inactiveIds",indices:"indices",inherited:"inherited",interpolateBoundary:"interpolateBoundary",interpolation:"interpolation",invisible:"invisible",invisibleIds:"invisibleIds",knots:"knots",left:"left",leftHanded:"leftHanded",length:"length",linear:"linear",loop:"loop",metersPerUnit:"metersPerUnit",modelApplyDrawMode:"model:applyDrawMode",modelCardGeometry:"model:cardGeometry",modelCardTextureXNeg:"model:cardTextureXNeg",modelCardTextureXPos:"model:cardTextureXPos",modelCardTextureYNeg:"model:cardTextureYNeg",modelCardTextureYPos:"model:cardTextureYPos",modelCardTextureZNeg:"model:cardTextureZNeg",modelCardTextureZPos:"model:cardTextureZPos",modelCardVisibility:"model:cardVisibility",modelDrawMode:"model:drawMode",modelDrawModeColor:"model:drawModeColor",mono:"mono",motionBlurScale:"motion:blurScale",motionNonlinearSampleCount:"motion:nonlinearSampleCount",motionVelocityScale:"motion:velocityScale",mute:"mute",none:"none",nonOverlapping:"nonOverlapping",nonperiodic:"nonperiodic",normals:"normals",open:"open",order:"order",orientation:"orientation",orientations:"orientations",orientationsf:"orientationsf",origin:"origin",orthographic:"orthographic",partition:"partition",periodic:"periodic",perspective:"perspective",pinned:"pinned",pivot:"pivot",point:"point",points:"points",pointWeights:"pointWeights",positions:"positions",power:"power",primvarsDisplayColor:"primvars:displayColor",primvarsDisplayOpacity:"primvars:displayOpacity",projection:"projection",protoIndices:"protoIndices",prototypes:"prototypes",proxy:"proxy",proxyPrim:"proxyPrim",proxyVisibility:"proxyVisibility",purpose:"purpose",radius:"radius",radiusBottom:"radiusBottom",radiusTop:"radiusTop",ranges:"ranges",render:"render",renderVisibility:"renderVisibility",right:"right",rightHanded:"rightHanded",scales:"scales",segment:"segment",shutterClose:"shutter:close",shutterOpen:"shutter:open",simple:"simple",size:"size",smooth:"smooth",solo:"solo",stereoRole:"stereoRole",subdivisionScheme:"subdivisionScheme",surfaceFaceVertexIndices:"surfaceFaceVertexIndices",tangents:"tangents",tetrahedron:"tetrahedron",tetVertexIndices:"tetVertexIndices",triangleSubdivisionRule:"triangleSubdivisionRule",trimCurveCounts:"trimCurve:counts",trimCurveKnots:"trimCurve:knots",trimCurveOrders:"trimCurve:orders",trimCurvePoints:"trimCurve:points",trimCurveRanges:"trimCurve:ranges",trimCurveVertexCounts:"trimCurve:vertexCounts",type:"type",uForm:"uForm",uKnots:"uKnots",unauthoredValuesIndex:"unauthoredValuesIndex",uniform:"uniform",unrestricted:"unrestricted",uOrder:"uOrder",upAxis:"upAxis",uRange:"uRange",uVertexCount:"uVertexCount",varying:"varying",velocities:"velocities",vertex:"vertex",verticalAperture:"verticalAperture",verticalApertureOffset:"verticalApertureOffset",vForm:"vForm",visibility:"visibility",visible:"visible",vKnots:"vKnots",vOrder:"vOrder",vRange:"vRange",vVertexCount:"vVertexCount",width:"width",widths:"widths",wrap:"wrap",x:"X",xformOpOrder:"xformOpOrder",y:"Y",z:"Z",BackPlateAPI:"BackPlateAPI",BasisCurves:"BasisCurves",Boundable:"Boundable",Camera:"Camera",Capsule:"Capsule",Capsule_1:"Capsule_1",Cone:"Cone",Cube:"Cube",Curves:"Curves",Cylinder:"Cylinder",Cylinder_1:"Cylinder_1",GeomModelAPI:"GeomModelAPI",GeomSubset:"GeomSubset",Gprim:"Gprim",HermiteCurves:"HermiteCurves",Imageable:"Imageable",Mesh:"Mesh",MotionAPI:"MotionAPI",NurbsCurves:"NurbsCurves",NurbsPatch:"NurbsPatch",Plane:"Plane",PointBased:"PointBased",PointInstancer:"PointInstancer",Points:"Points",PrimvarsAPI:"PrimvarsAPI",Scope:"Scope",Sphere:"Sphere",TetMesh:"TetMesh",VisibilityAPI:"VisibilityAPI",Xform:"Xform",Xformable:"Xformable",XformCommonAPI:"XformCommonAPI"});class se extends $e{static{o(this,"VisibilityAPI")}static typeName="VisibilityAPI";static get(e,t){return new se(e.getPrim(t),e)}isValid(){return super.isValid()&&this.prim.hasAPI(se.typeName)}static canApply(e){return e.canApplyAPI(se.typeName)}static apply(e){return e.applyAPI(se.typeName)?new se(e,e.getStage()):new se(void 0,e.getStage())}static getSchemaAttributeNames(e=!0){return e?["guideVisibility","proxyVisibility","renderVisibility"]:["guideVisibility","proxyVisibility","renderVisibility"]}getGuideVisibilityAttr(){return this.prim.getAttr(y.guideVisibility)}createGuideVisibilityAttr(e,t=!1){return this._createAttr(y.guideVisibility,"token",!1,"uniform",e,t)}getProxyVisibilityAttr(){return this.prim.getAttr(y.proxyVisibility)}createProxyVisibilityAttr(e,t=!1){return this._createAttr(y.proxyVisibility,"token",!1,"uniform",e,t)}getRenderVisibilityAttr(){return this.prim.getAttr(y.renderVisibility)}createRenderVisibilityAttr(e,t=!1){return this._createAttr(y.renderVisibility,"token",!1,"uniform",e,t)}getPurposeVisibilityAttr(e){if(e==="guide")return this._prim.getAttr("guideVisibility");if(e==="proxy")return this._prim.getAttr("proxyVisibility");if(e==="render")return this._prim.getAttr("renderVisibility");Be.GetInstance().postError(new ft(`Unexpected purpose '${e}' getting purpose visibility attribute for <${this.path}>.`,gt.CodingError))}}function U(r){return r instanceof ke||Sr(r)?Tr(r):r}o(U,"plain");function S(r,e,t){const i=r.getAttr(e);if(i)return t!==void 0?i.getValueAtTime(t):i.getValue()}o(S,"attrVal");function ys(r,e,t){const i=r.getAttr(e);if(!(!i||!i.hasAuthoredValue()))return t!==void 0?i.getValueAtTime(t):i.getValue()}o(ys,"authoredAttrVal");function be(r){if(r==null)return null;if(r instanceof Float32Array)return r;if(r instanceof ke){const e=r.cdata();if(e instanceof Float32Array||e instanceof Float64Array||e instanceof Int32Array)return r.size>0?new Float32Array(e):null;r=U(r)}if(Array.isArray(r)&&r.length>0){if(Array.isArray(r[0])){const e=[];for(const t of r)for(const i of t)e.push(i);return new Float32Array(e)}return new Float32Array(r.map(Number))}return null}o(be,"toFloat32");function ha(r){if(r==null)return null;if(r instanceof Int32Array)return r;if(r instanceof ke){const e=r.cdata();if(e instanceof Int32Array)return e.slice();r=U(r)}return Array.isArray(r)?new Int32Array(r.map(Number)):null}o(ha,"toInt32");function bs(r){if(r=U(r),!Array.isArray(r)||r.length<2)return null;const e=Array.isArray(r[0])?r[0]:[Number(r[0]),0,0],t=Array.isArray(r[1])?r[1]:[Number(r[1]),0,0];return[[Math.fround(Number(e[0]??0)),Math.fround(Number(e[1]??0)),Math.fround(Number(e[2]??0))],[Math.fround(Number(t[0]??0)),Math.fround(Number(t[1]??0)),Math.fround(Number(t[2]??0))]]}o(bs,"toExtent");function ma(r,e){return typeof r=="number"?r:e}o(ma,"asNumber");function yt(r){return r instanceof ke?r.toArray().filter(e=>typeof e=="string"):Array.isArray(r)?r.filter(e=>typeof e=="string"):[]}o(yt,"asTokens");function Lt(r,e){return typeof r=="string"?r:e}o(Lt,"asToken");function fa(r,e){return typeof r=="boolean"?r:e}o(fa,"asBool");function ae(r){return r=U(r),Array.isArray(r)&&r.length>=3?[Number(r[0]),Number(r[1]),Number(r[2])]:[0,0,0]}o(ae,"asVec3");function te(r){return typeof r=="number"?r:(r=U(r),Array.isArray(r)&&typeof r[0]=="number"?r[0]:0)}o(te,"asScalar");function zi(r){if(r=U(r),Array.isArray(r)&&r.length>=4){const e=Number(r[0]),t=Number(r[1]),i=Number(r[2]),s=Number(r[3]);return[e,t,i,s]}return[1,0,0,0]}o(zi,"asQuat");function Ds(r){if(r=U(r),Array.isArray(r)&&r.length===4&&Array.isArray(r[0])){const e=[];for(const t of r)for(const i of t)e.push(Number(i));return e}return Array.isArray(r)&&r.length===16?r.map(Number):null}o(Ds,"asMatrix4Flat");class R extends Le{static{o(this,"Imageable")}static typeName="Imageable";static get(e,t){return new R(e.getPrim(t),e)}isValid(){return super.isValid()&&this.prim.isA(R.typeName)}static getSchemaAttributeNames(e=!0){return e?["visibility","purpose"]:["visibility","purpose"]}getVisibilityAttr(){return this.prim.getAttr(y.visibility)}createVisibilityAttr(e,t=!1){return this._createAttr(y.visibility,"token",!1,"varying",e,t)}getPurposeAttr(){return this.prim.getAttr(y.purpose)}createPurposeAttr(e,t=!1){return this._createAttr(y.purpose,"token",!1,"uniform",e,t)}getProxyPrimRel(){return this.prim.rel(y.proxyPrim)}createProxyPrimRel(){return this.prim.createRelationship(y.proxyPrim,!1)}_createVisibilityAttrForEdit(){return this._declareAttr("visibility","token")}getPurposeVisibilityAttr(e){return R.getPurposeVisibilityAttr(this._prim,e)}static getPurposeVisibilityAttr(e,t){if(t==="default")return e.getAttr("visibility");if(e.hasAPI(se.typeName))return new se(e,e.getStage()).getPurposeVisibilityAttr(t)}computeEffectiveVisibility(e,t){return R.computeEffectiveVisibility(this._stage,this.path,e,t)}static computeEffectiveVisibility(e,t,i,s){if(R.computeVisibility(e,t,s)==="invisible")return"invisible";if(i==="default")return"visible";let n=t;for(;n;){const a=e.getPrim(n),u=a?.isA("Imageable")?R.getPurposeVisibilityAttr(a,i):void 0;if(u?.hasAuthoredValue()){const c=ci(u,s);if(c!==void 0)return c}n=Ve(n)}return i==="guide"?"invisible":i==="proxy"||i==="render"?"inherited":(Be.GetInstance().postError(new ft(`Unexpected purpose '${i}' computing purpose visibility for <${t}>.`,gt.CodingError)),"invisible")}makeInvisible(){this._declareAttr("visibility","token").set("invisible")}makeVisible(){const e=[];R.getVisibility(this._prim)==="invisible"&&e.push([this,"inherited"]);let t=!1;const i=o(s=>{const n=Ve(s);if(!n)return;i(n);const a=this._stage.getPrim(n);if(!a?.isA("Imageable"))return;const u=new R(this._stage._primHandle(n),this._stage);if(R.getVisibility(a)==="invisible"&&(e.push([u,"inherited"]),t=!0),!!t)for(const c of this._stage.getAllChildPrimPaths(n)){if(c===s)continue;this._stage.getPrim(c)?.isA("Imageable")&&e.push([new R(this._stage._primHandle(c),this._stage),"invisible"])}},"visitAncestors");i(this._prim.path),wr(()=>{for(const[s,n]of e)s._createVisibilityAttrForEdit().set(n)})}computeWorldBound(e,...t){return this._bboxCacheFor(e,t).computeWorldBound(this._prim)}computeLocalBound(e,...t){return this._bboxCacheFor(e,t).computeLocalBound(this._prim)}computeUntransformedBound(e,...t){return this._bboxCacheFor(e,t).computeUntransformedBound(this._prim)}_bboxCacheFor(e,t){const i=Ps(t);if(i.length===0)throw new Error(`Must include at least one purpose when computing bounds for prim at path <${this.path}>.  See UsdGeomImageable::GetPurposeAttr().`);if(!Mt)throw new Error("UsdGeomBBoxCache is not loaded");return new Mt(e,i)}static getOrderedPurposeTokens(){return vs}static computePurposeInfo(e,t){const i=Yi(e);if(i)return{purpose:i,isInheritable:!0};if(t)return t.isInheritable?{...t}:{purpose:oi(e),isInheritable:!1};const s=xs(e);return s?{purpose:s,isInheritable:!0}:{purpose:oi(e),isInheritable:!1}}static getVisibility(e,t){const i=e.getAttr("visibility");return(i?ci(i,t):void 0)??"inherited"}static getPurpose(e){return Lt(S(e,"purpose"),"default")}static computeVisibility(e,t,i){let s=t;for(;s&&s!=="/";){const n=e.getPrim(s);if(n?.isA("Imageable")&&R.getVisibility(n,i)==="invisible")return"invisible";s=Ve(s)}return"inherited"}static computePurpose(e,t){const i=e.getPrim(t);return i?R.computePurposeInfo(i).purpose:"default"}}const vs=["default","render","proxy","guide"];function ai(r){return r.isInheritable?r.purpose:""}o(ai,"getInheritablePurpose");let Mt;function As(r){Mt=r}o(As,"_registerBBoxCache");function Ps(r){return r.filter(e=>!!e)}o(Ps,"makePurposeVector");function Yi(r){if(r.isA("Imageable")){const e=r.getAttr("purpose");if(e?.hasAuthoredValue())return Lt(e.getValue(),"")}return""}o(Yi,"computeAuthoredPurpose");function oi(r){return r.isA("Imageable")?Lt(S(r,"purpose"),"default"):"default"}o(oi,"computeFallbackPurpose");function xs(r){const e=r.getStage();let t=Ve(r.path);for(;t;){const i=e.getPrim(t);if(!i)break;const s=Yi(i);if(s)return s;t=Ve(t)}return""}o(xs,"computeInheritableAncestorPurpose");function Ve(r){if(r==="/"||!r.startsWith("/"))return null;const e=r.lastIndexOf("/");return e===0?"/":r.slice(0,e)}o(Ve,"parentPath$3");function ci(r,e){const t=Br(r.getResolveInfo(e??"default")),i=t.layer&&t.specPath?t.layer.getField(t.specPath,"typeName"):t.typeName,s=typeof i=="string"?i.replace(/^(?:uniform|varying)\s+/,""):i;if(t.source!=="fallback"&&s!=="token")return;const n=e===void 0?r.getValue():r.getValueAtTime(e);return typeof n=="string"?n:void 0}o(ci,"tokenValue");const qi="xformOp:",Is="!invert!xformOp:",Pt="!invert!",Zi=["","translateX","translateY","translateZ","translate","scaleX","scaleY","scaleZ","scale","rotateX","rotateY","rotateZ","rotateXYZ","rotateXZY","rotateYXZ","rotateYZX","rotateZXY","rotateZYX","orient","transform"],_s=["Double","Float","Half"];function it(r){return r.startsWith(qi)}o(it,"isNamespaced");function Ss(r){return it(r)?r:qi+r}o(Ss,"makeNamespaced");function Ts(r){return r.startsWith(Is)}o(Ts,"isInverseOpName");class d{static{o(this,"XformOp")}static TypeInvalid=0;static TypeTranslateX=1;static TypeTranslateY=2;static TypeTranslateZ=3;static TypeTranslate=4;static TypeScaleX=5;static TypeScaleY=6;static TypeScaleZ=7;static TypeScale=8;static TypeRotateX=9;static TypeRotateY=10;static TypeRotateZ=11;static TypeRotateXYZ=12;static TypeRotateXZY=13;static TypeRotateYXZ=14;static TypeRotateYZX=15;static TypeRotateZXY=16;static TypeRotateZYX=17;static TypeOrient=18;static TypeTransform=19;static PrecisionDouble=0;static PrecisionFloat=1;static PrecisionHalf=2;#e;#t;#i;#r;constructor(e,t=!1){if(this.#e=e,this.#i=d.TypeInvalid,this.#r=t,!e?.isValid())return;const i=e.name;it(i)?this.#i=d.getOpTypeEnum(e.splitName()[1]??""):K(`Invalid xform op: <${e.getPath()}>.`)}static _fromValidAttribute(e,t){const i=new d(void 0,t);return i.#e=e,i.#s(),i}static _fromAttributeQuery(e,t){const i=new d(void 0,t);return i.#e=e.getAttribute(),i.#t=e,i.#s(),i}static _create(e,t,i,s="",n=!1){const a=new d(void 0,n);a.#i=t;const u=d.getValueTypeName(t,i);if(!u)return K(`Invalid xform-op: incompatible combination of opType (${ws[t]}) and precision (${_s[i]}).`),a;const c=d.getOpName(t,s,!1);return a.#e=e.createAttribute(c,u,!1),a}#s(){const e=this.getName(),t=e.indexOf(":");if(t<0){K(`Invalid xform op: <${this.getAttr().getPath()}>.`);return}const i=e.indexOf(":",t+1),s=e.slice(t+1,i<0?void 0:i);this.#i=ui(s),this.#i===d.TypeInvalid&&K(`Invalid xform opType token '${s}'.`)}static isXformOp(e){return typeof e=="string"?it(e):e?.isValid()?it(e.name):!1}static _getXformOpAttr(e,t){const i=Ts(t);return{attr:e.getAttr(i?t.slice(Pt.length):t),isInverseOp:i}}static getPrecisionFromValueTypeName(e){switch(e){case"matrix4d":case"double3":case"double":case"quatd":return d.PrecisionDouble;case"float3":case"float":case"quatf":return d.PrecisionFloat;case"half3":case"half":case"quath":return d.PrecisionHalf}return K(`Invalid typeName '${e}' specified.`),d.PrecisionDouble}static getOpTypeToken(e){return Zi[e]??""}static getOpTypeEnum(e){const t=ui(e);return t===d.TypeInvalid&&e!==""&&K(`Invalid xform opType token '${e}'.`),t}static getValueTypeName(e,t){switch(e){case d.TypeTransform:return t!==d.PrecisionDouble&&K("Matrix transformations can only be encoded in double precision. Overriding precision to double."),"matrix4d";case d.TypeTranslate:case d.TypeScale:case d.TypeRotateXYZ:case d.TypeRotateXZY:case d.TypeRotateYXZ:case d.TypeRotateYZX:case d.TypeRotateZXY:case d.TypeRotateZYX:return t===d.PrecisionFloat?"float3":t===d.PrecisionHalf?"half3":"double3";case d.TypeTranslateX:case d.TypeTranslateY:case d.TypeTranslateZ:case d.TypeScaleX:case d.TypeScaleY:case d.TypeScaleZ:case d.TypeRotateX:case d.TypeRotateY:case d.TypeRotateZ:return t===d.PrecisionFloat?"float":t===d.PrecisionHalf?"half":"double";case d.TypeOrient:return t===d.PrecisionFloat?"quatf":t===d.PrecisionHalf?"quath":"quatd";default:return""}}static getOpName(e,t="",i=!1){let s=Ss(d.getOpTypeToken(e));return t&&(s=`${s}:${t}`),i&&(s=Pt+s),s}static getOpTransform(e,t,i=!1){return new x(...$t(d.getOpTypeToken(e),t,i))}getOpType(){return this.#i}getPrecision(){return d.getPrecisionFromValueTypeName(this.getTypeName())}isInverseOp(){return this.#r}hasSuffix(e){return this.getName().endsWith(e)}getOpName(){return this.#r?Pt+this.getName():this.getName()}getOpTransform(e){const t=this.get(e);return t===void 0?new x(1):d.getOpTransform(this.#i,t,this.#r)}mightBeTimeVarying(){return this.#t?this.#t.valueMightBeTimeVarying():this.#e?.valueMightBeTimeVarying()??!1}getAttr(){return this.#e}isDefined(){return d.isXformOp(this.#e)}equals(e){const t=this.#e,i=e.#e;return!t?.isValid()||!i?.isValid()?!t?.isValid()&&!i?.isValid():t.getPath()===i.getPath()&&t.getStage()===i.getStage()}getName(){return this.getAttr().name}getBaseName(){return this.getAttr().getBaseName()}getNamespace(){return this.getAttr().getNamespace()}splitName(){return this.getAttr().splitName()}getTypeName(){return this.getAttr().typeName}get(e){return this.#t?this.#t.get(e??"default"):this.#e?.get(e)}set(e,t){if(this.#r)return K(`Cannot set a value on the inverse xformOp '${this.getOpName()}'. Please set value on the paired non-inverse xformOp instead.`),!1;const i=this.#e;return i?.isValid()?(i.set(e,t),!0):!1}getTimeSamples(){return this.#t?this.#t.getTimeSamples():this.#e?.getTimeSampleKeys()??[]}getTimeSamplesInInterval(e){return this.#t?this.#t.getTimeSamplesInInterval(e):this.#e?.getTimeSamplesInInterval(e)??[]}getNumTimeSamples(){return this.#t?this.#t.getNumTimeSamples():this.#e?.getTimeSampleKeys().length??0}_getAttributeQuery(){return this.#t}}const ws=["TypeInvalid","TypeTranslateX","TypeTranslateY","TypeTranslateZ","TypeTranslate","TypeScaleX","TypeScaleY","TypeScaleZ","TypeScale","TypeRotateX","TypeRotateY","TypeRotateZ","TypeRotateXYZ","TypeRotateXZY","TypeRotateYXZ","TypeRotateYZX","TypeRotateZXY","TypeRotateZYX","TypeOrient","TypeTransform"];function ui(r){const e=Zi.indexOf(r);return e<0?d.TypeInvalid:e}o(ui,"getOpTypeEnumFromString");function $(r){return Ft([1,0,0],r)}o($,"makeRotateX");function H(r){return Ft([0,1,0],r)}o(H,"makeRotateY");function X(r){return Ft([0,0,1],r)}o(X,"makeRotateZ");function Ft(r,e){return[...new x(1).setRotate(es(r,e)).GetArray()]}o(Ft,"axisRotation");function $t(r,e,t){switch(r){case"translate":{const[i,s,n]=ae(e);return Ke(t?-i:i,t?-s:s,t?-n:n)}case"translateX":return Ke(te(e)*(t?-1:1),0,0);case"translateY":return Ke(0,te(e)*(t?-1:1),0);case"translateZ":return Ke(0,0,te(e)*(t?-1:1));case"scale":{const[i,s,n]=ae(e);return t?Ne(1/i,1/s,1/n):Ne(i,s,n)}case"scaleX":{const i=te(e);return Ne(t?1/i:i,1,1)}case"scaleY":{const i=te(e);return Ne(1,t?1/i:i,1)}case"scaleZ":{const i=te(e);return Ne(1,1,t?1/i:i)}case"rotateX":return $(te(e)*(t?-1:1));case"rotateY":return H(te(e)*(t?-1:1));case"rotateZ":return X(te(e)*(t?-1:1));case"rotateXYZ":{const[i,s,n]=ae(e);return t?P(P(X(-n),H(-s)),$(-i)):P(P($(i),H(s)),X(n))}case"rotateXZY":{const[i,s,n]=ae(e);return t?P(P(H(-s),X(-n)),$(-i)):P(P($(i),X(n)),H(s))}case"rotateYXZ":{const[i,s,n]=ae(e);return t?P(P(X(-n),$(-i)),H(-s)):P(P(H(s),$(i)),X(n))}case"rotateYZX":{const[i,s,n]=ae(e);return t?P(P($(-i),X(-n)),H(-s)):P(P(H(s),X(n)),$(i))}case"rotateZXY":{const[i,s,n]=ae(e);return t?P(P(H(-s),$(-i)),X(-n)):P(P(X(n),$(i)),H(s))}case"rotateZYX":{const[i,s,n]=ae(e);return t?P(P($(-i),H(-s)),X(-n)):P(P(X(n),H(s)),$(i))}case"orient":{let i=Qr(zi(e));return t&&(i=Jr(i)),[...new x(1).setRotate(i).GetArray()]}case"transform":{const i=Ds(e),s=i||[...Z];if(!t)return s;const n=new x(...s).getDeterminant();return Math.abs(n)<=1e-9&&K(`Cannot invert singular transform op with value ${new x(...s)}.`),Wr(s)}default:return[...Z]}}o($t,"opMatrix");class pe extends R{static{o(this,"Xformable")}static typeName="Xformable";static get(e,t){return new pe(e.getPrim(t),e)}isValid(){return super.isValid()&&this.prim.isA(pe.typeName)}static getSchemaAttributeNames(e=!0){return e?["visibility","purpose","xformOpOrder"]:["xformOpOrder"]}getXformOpOrderAttr(){return this.prim.getAttr(y.xformOpOrder)}createXformOpOrderAttr(e,t=!1){return this._createAttr(y.xformOpOrder,"token[]",!1,"uniform",e,t)}_getXformOpOrderValue(){const e=this.getXformOpOrderAttr();if(e.isValid())return yt(e.get())}addXformOp(e,t=d.PrecisionDouble,i="",s=!1){const n=this._getXformOpOrderValue()??[],a=d.getOpName(e,i,s);if(n.includes(a))return K(`The xformOp '${a}' already exists in xformOpOrder [${n.join(", ")}].`),new d;const u=d.getOpName(e,i);let c;const l=this.prim.getAttr(u);if(l?.isValid()?(d.getPrecisionFromValueTypeName(l.typeName)!==t&&K(`XformOp <${l.getPath()}> has typeName '${l.typeName}' which does not match the requested precision '${li[t]}'. Proceeding to use existing typeName / precision.`),c=new d(l,s)):c=d._create(this.prim,e,t,i,s),c.isDefined())n.push(c.getOpName()),this.createXformOpOrderAttr().set(n);else return K(`Unable to add xform op of type ${d.getOpTypeToken(e)} and precision ${li[t]} on prim at path <${this.path}>. opSuffix=${i}, isInverseOp=${s?1:0}`),new d;return c}getXformOp(e,t="",i=!1){const s=this._getXformOpOrderValue()??[],n=d.getOpName(e,t,i);if(!s.includes(n))return new d;const a=this.prim.getAttr(d.getOpName(e,t));return new d(a,i)}addTranslateXOp(e=d.PrecisionDouble,t="",i=!1){return this.addXformOp(d.TypeTranslateX,e,t,i)}getTranslateXOp(e="",t=!1){return this.getXformOp(d.TypeTranslateX,e,t)}addTranslateYOp(e=d.PrecisionDouble,t="",i=!1){return this.addXformOp(d.TypeTranslateY,e,t,i)}getTranslateYOp(e="",t=!1){return this.getXformOp(d.TypeTranslateY,e,t)}addTranslateZOp(e=d.PrecisionDouble,t="",i=!1){return this.addXformOp(d.TypeTranslateZ,e,t,i)}getTranslateZOp(e="",t=!1){return this.getXformOp(d.TypeTranslateZ,e,t)}addTranslateOp(e=d.PrecisionDouble,t="",i=!1){return this.addXformOp(d.TypeTranslate,e,t,i)}getTranslateOp(e="",t=!1){return this.getXformOp(d.TypeTranslate,e,t)}addScaleXOp(e=d.PrecisionFloat,t="",i=!1){return this.addXformOp(d.TypeScaleX,e,t,i)}getScaleXOp(e="",t=!1){return this.getXformOp(d.TypeScaleX,e,t)}addScaleYOp(e=d.PrecisionFloat,t="",i=!1){return this.addXformOp(d.TypeScaleY,e,t,i)}getScaleYOp(e="",t=!1){return this.getXformOp(d.TypeScaleY,e,t)}addScaleZOp(e=d.PrecisionFloat,t="",i=!1){return this.addXformOp(d.TypeScaleZ,e,t,i)}getScaleZOp(e="",t=!1){return this.getXformOp(d.TypeScaleZ,e,t)}addScaleOp(e=d.PrecisionFloat,t="",i=!1){return this.addXformOp(d.TypeScale,e,t,i)}getScaleOp(e="",t=!1){return this.getXformOp(d.TypeScale,e,t)}addRotateXOp(e=d.PrecisionFloat,t="",i=!1){return this.addXformOp(d.TypeRotateX,e,t,i)}getRotateXOp(e="",t=!1){return this.getXformOp(d.TypeRotateX,e,t)}addRotateYOp(e=d.PrecisionFloat,t="",i=!1){return this.addXformOp(d.TypeRotateY,e,t,i)}getRotateYOp(e="",t=!1){return this.getXformOp(d.TypeRotateY,e,t)}addRotateZOp(e=d.PrecisionFloat,t="",i=!1){return this.addXformOp(d.TypeRotateZ,e,t,i)}getRotateZOp(e="",t=!1){return this.getXformOp(d.TypeRotateZ,e,t)}addRotateXYZOp(e=d.PrecisionFloat,t="",i=!1){return this.addXformOp(d.TypeRotateXYZ,e,t,i)}getRotateXYZOp(e="",t=!1){return this.getXformOp(d.TypeRotateXYZ,e,t)}addRotateXZYOp(e=d.PrecisionFloat,t="",i=!1){return this.addXformOp(d.TypeRotateXZY,e,t,i)}getRotateXZYOp(e="",t=!1){return this.getXformOp(d.TypeRotateXZY,e,t)}addRotateYXZOp(e=d.PrecisionFloat,t="",i=!1){return this.addXformOp(d.TypeRotateYXZ,e,t,i)}getRotateYXZOp(e="",t=!1){return this.getXformOp(d.TypeRotateYXZ,e,t)}addRotateYZXOp(e=d.PrecisionFloat,t="",i=!1){return this.addXformOp(d.TypeRotateYZX,e,t,i)}getRotateYZXOp(e="",t=!1){return this.getXformOp(d.TypeRotateYZX,e,t)}addRotateZXYOp(e=d.PrecisionFloat,t="",i=!1){return this.addXformOp(d.TypeRotateZXY,e,t,i)}getRotateZXYOp(e="",t=!1){return this.getXformOp(d.TypeRotateZXY,e,t)}addRotateZYXOp(e=d.PrecisionFloat,t="",i=!1){return this.addXformOp(d.TypeRotateZYX,e,t,i)}getRotateZYXOp(e="",t=!1){return this.getXformOp(d.TypeRotateZYX,e,t)}addOrientOp(e=d.PrecisionFloat,t="",i=!1){return this.addXformOp(d.TypeOrient,e,t,i)}getOrientOp(e="",t=!1){return this.getXformOp(d.TypeOrient,e,t)}addTransformOp(e=d.PrecisionDouble,t="",i=!1){return this.addXformOp(d.TypeTransform,e,t,i)}getTransformOp(e="",t=!1){return this.getXformOp(d.TypeTransform,e,t)}setResetXformStack(e){const t=this._getXformOpOrderValue()??[];if(e)return t.includes(oe)||this.createXformOpOrderAttr().set([oe,...t]),!0;const i=t.lastIndexOf(oe);return i>=0&&this.createXformOpOrderAttr().set(t.slice(i+1)),!0}getResetXformStack(){const e=this._getXformOpOrderValue();return e!==void 0&&e.includes(oe)}setXformOpOrder(e,t=!1){const i=t?[oe]:[];for(const s of e)if(s.getAttr().primPath===this.path)i.push(s.getOpName());else return K(`XformOp attribute <${s.getAttr().getPath()}> does not belong to schema prim <${this.path}>.`),!1;return this.createXformOpOrderAttr().set(i),!0}clearXformOpOrder(){return this.setXformOpOrder([])}makeMatrixXform(){return this.clearXformOpOrder(),this.getOrderedXformOps().length>0?(z(`Could not clear xformOpOrder for <${this.path}>`),new d):this.addTransformOp()}getOrderedXformOps(e){return this._getOrderedXformOps(e,!1)}_getOrderedXformOps(e,t){const i=[];e&&(e.value=!1);const s=this._getXformOpOrderValue();if(s===void 0||s.length===0)return i;const n=this.prim;for(const a of s){if(a===oe){e&&(e.value=!0),i.length=0;continue}const{attr:u,isInverseOp:c}=d._getXformOpAttr(n,a);u.isValid()?i.push(t?d._fromAttributeQuery(new et(u),c):d._fromValidAttribute(u,c)):z(`Unable to get attribute associated with the xformOp '${a}', on the prim at path <${this.path}>. Skipping xformOp in the computation of the local transformation at prim.`)}return i}transformMightBeTimeVarying(e){return e!==void 0?e.some(t=>t.mightBeTimeVarying()):Ht(this.prim)}static getTimeSamples(e){return pe.getTimeSamplesInInterval(e,kr.getFullInterval())}getTimeSamples(){return pe.getTimeSamples(this.getOrderedXformOps())}static getTimeSamplesInInterval(e,t){return e.length===1?e[0].getTimeSamplesInInterval(t):Cr.getUnionedTimeSamplesInInterval(e.map(i=>i.getAttr()),t)}getTimeSamplesInInterval(e){return pe.getTimeSamplesInInterval(this.getOrderedXformOps(),e)}getLocalTransformation(e,t){let i=new x(1);t&&(t.value=!1);const s=this._getXformOpOrderValue();if(s===void 0||s.length===0)return i;for(let n=s.length-1;n>=0;n--){const a=s[n];if(n>0&&ks(a,s[n-1])){n--;continue}if(a===oe){t&&(t.value=!0);break}const{attr:u,isInverseOp:c}=d._getXformOpAttr(this.prim,a);if(u.isValid()){const l=new d(u,c);l.isDefined()&&(i=i.getMultiply(l.getOpTransform(e)))}else z(`Unable to get attribute associated with the xformOp '${a}', on the prim at path <${this.path}>. Skipping xformOp in the computation of the local transformation at prim.`)}return i}static getLocalTransformation(e,t){let i=new x(1);for(let s=e.length-1;s>=0;s--){const n=e[s];if(s>0&&Bs(n,e[s-1])){s--;continue}i=i.getMultiply(n.getOpTransform(t))}return i}static isTransformationAffectedByAttrNamed(e){return e===y.xformOpOrder||d.isXformOp(e)}}const li=["Double","Float","Half"];function Bs(r,e){return r.equals(e)&&r.isInverseOp()!==e.isInverseOp()}o(Bs,"areInverseXformOps");function ks(r,e){return pt+r===e||pt+e===r}o(ks,"areInverseXformOpNames");function Cs(r){return r.valueMightBeTimeVarying()}o(Cs,"valueMightBeTimeVarying");function Ht(r){const e=yt(S(r,"xformOpOrder"));for(let t=e.length-1;t>=0;t--){const i=e[t];if(i==="!resetXformStack!")return!1;const s=i.startsWith("!invert!")?i.slice(8):i,n=r.getAttr(s);if(n&&Cs(n))return!0}return!1}o(Ht,"transformMightBeTimeVarying");const oe="!resetXformStack!",pt="!invert!";class ji{static{o(this,"XformQuery")}#e;#t;constructor(e){const t=[];let i=!1;const s=e?yt(S(e,"xformOpOrder")):[];for(const n of s){if(n===oe){i=!0,t.length=0;continue}const a=n.startsWith(pt),u=a?n.slice(pt.length):n,c=e.getAttr(u);if(!c)continue;const l=new et(c);t.push({name:u,isInverse:a,attr:c,query:l,opType:u.split(":")[1]??""})}this.#e=t,this.#t=i}getLocalTransformation(e){let t=[...Z];for(let i=this.#e.length-1;i>=0;i--){const s=this.#e[i],n=e===void 0?s.attr.getValue():s.query.get(e);n!==void 0&&(t=P(t,$t(s.opType,n,s.isInverse)))}return t}getResetXformStack(){return this.#t}transformMightHaveEffect(){if(this.#t)return!0;if(this.#e.length===0)return!1;const[e,t]=this.#e;return!(this.#e.length===2&&e.opType===t.opType&&e.isInverse!==t.isInverse&&e.name===t.name)}hasNonEmptyXformOpOrder(){return this.#e.length>0}transformMightBeTimeVarying(){return this.transformMightHaveEffect()&&this.#e.some(e=>e.query.valueMightBeTimeVarying())}getTimeSamples(){return et.getUnionedTimeSamples(this.#e.map(e=>e.query))}getTimeSamplesInInterval(e){return et.getUnionedTimeSamplesInInterval(this.#e.map(t=>t.query),e)}isAttributeIncludedInLocalTransform(e){return this.#e.some(t=>t.name===e)}}function Ns(r,e){const t=S(r,"xformOpOrder",e),i=yt(t);let s=[...Z],n=!1;for(let a=i.length-1;a>=0;a--){const u=i[a];if(u==="!resetXformStack!"){n=!0;break}const c=u.startsWith("!invert!"),l=c?u.slice(8):u,p=l.split(":")[1]??"",h=S(r,l,e);if(h===void 0)continue;const m=$t(p,h,c);s=P(s,m)}return{matrix:s,resetsXformStack:n}}o(Ns,"evaluateXformOps");class Y extends pe{static{o(this,"Boundable")}static typeName="Boundable";static get(e,t){return new Y(e.getPrim(t),e)}isValid(){return super.isValid()&&this.prim.isA(Y.typeName)}static getSchemaAttributeNames(e=!0){return e?["visibility","purpose","xformOpOrder","extent"]:["extent"]}getExtentAttr(){return this.prim.getAttr(y.extent)}createExtentAttr(e,t=!1){return this._createAttr(y.extent,"float3[]",!1,"varying",e,t)}static getExtent(e,t){return bs(ys(e,"extent",t))}static computeExtentFromPlugins(e,t,i){const s=Wi.get(e.typeName);if(s){const c=s(e,t,i);return c?di(c):null}const n=o((c,l)=>{const p=S(e,c,l);return typeof p=="number"?p:void 0},"num"),a=o(c=>{const l=S(e,"axis",c);return l==="X"||l==="Y"||l==="Z"?l:void 0},"axisAt");let u;switch(e.typeName){case"Sphere":{const c=n("radius",t);if(c===void 0)return null;u=ze(c,c,"Z");break}case"Plane":{const c=n("width"),l=n("length"),p=a();if(c===void 0||l===void 0||p===void 0)return null;const h=Math.fround(c*.5),m=Math.fround(l*.5),g=p==="X"?[0,m,h]:p==="Y"?[h,0,m]:[h,m,0];u=[[-g[0],-g[1],-g[2]],g];break}case"Cube":{const c=n("size",t);if(c===void 0)return null;u=[[c*-.5,c*-.5,c*-.5],[c*.5,c*.5,c*.5]];break}case"Cone":case"Cylinder":{const c=n("height",t),l=n("radius",t),p=a(t);if(c===void 0||l===void 0||p===void 0)return null;u=ze(l,c*.5,p);break}case"Capsule":{const c=n("height",t),l=n("radius",t),p=a(t);if(c===void 0||l===void 0||p===void 0)return null;u=ze(l,Math.fround(c*.5+l),p);break}case"Cylinder_1":{const c=n("height",t),l=n("radiusTop",t),p=n("radiusBottom",t),h=a(t);if(c===void 0||l===void 0||p===void 0||h===void 0)return null;u=ze(Math.max(l,p),c*.5,h);break}case"Capsule_1":{const c=n("height",t),l=n("radiusTop",t),p=n("radiusBottom",t),h=a(t);if(c===void 0||l===void 0||p===void 0||h===void 0||(u=Os(c,l,p,h),!u))return null;break}case"BasisCurves":case"HermiteCurves":case"NurbsCurves":{const c=be(S(e,"points",t));if(!c)return null;u=Y._pointExtent(c);const l=be(S(e,"widths",t));let p=0;if(l)for(const m of l)p=Math.max(p,m);const h=p*.5;u=[[u[0][0]-h,u[0][1]-h,u[0][2]-h],[u[1][0]+h,u[1][1]+h,u[1][2]+h]];break}case"Points":{const c=be(S(e,"points",t));if(!c)return null;const l=be(S(e,"widths",t));if(!l){u=Y._pointExtent(c);break}if(c.length!==l.length*3)return null;let p=Number.POSITIVE_INFINITY,h=Number.POSITIVE_INFINITY,m=Number.POSITIVE_INFINITY,g=Number.NEGATIVE_INFINITY,D=Number.NEGATIVE_INFINITY,A=Number.NEGATIVE_INFINITY;for(let v=0;v<l.length;v++){const I=l[v]*.5,C=v*3;p=Math.min(p,c[C]-I),h=Math.min(h,c[C+1]-I),m=Math.min(m,c[C+2]-I),g=Math.max(g,c[C]+I),D=Math.max(D,c[C+1]+I),A=Math.max(A,c[C+2]+I)}u=[[p,h,m],[g,D,A]];break}case"Mesh":case"NurbsPatch":case"TetMesh":{const c=S(e,"points",t);if(c===void 0)return null;u=Y._pointExtent(be(c)??new Float32Array(0));break}default:return null}return di(i?Ms(u,i):u)}static _pointExtent(e){let t=ye,i=ye,s=ye,n=-ye,a=-ye,u=-ye;for(let c=0;c+2<e.length;c+=3)t=Math.min(t,e[c]),i=Math.min(i,e[c+1]),s=Math.min(s,e[c+2]),n=Math.max(n,e[c]),a=Math.max(a,e[c+1]),u=Math.max(u,e[c+2]);return[[t,i,s],[n,a,u]]}static computeExtent(e,t){return Y.getExtent(e,t)??Y.computeExtentFromPlugins(e,t)}}const ye=34028234663852886e22,Wi=new Map;function Ce(r,e){Wi.set(r,e)}o(Ce,"registerComputeExtentFunction");function Ms(r,e){const[t,i]=r,n=[[t[0],t[1],t[2]],[t[0],t[1],i[2]],[t[0],i[1],t[2]],[t[0],i[1],i[2]],[i[0],t[1],t[2]],[i[0],t[1],i[2]],[i[0],i[1],t[2]],[i[0],i[1],i[2]]].map(a=>ts(e,a[0],a[1],a[2]));return[[Math.min(...n.map(a=>a[0])),Math.min(...n.map(a=>a[1])),Math.min(...n.map(a=>a[2]))],[Math.max(...n.map(a=>a[0])),Math.max(...n.map(a=>a[1])),Math.max(...n.map(a=>a[2]))]]}o(Ms,"transformExtent");function di(r){return[r[0].map(Math.fround),r[1].map(Math.fround)]}o(di,"floatExtent");function ze(r,e,t){const i=[r,r,r];return i[t==="X"?0:t==="Y"?1:2]=e,[[-i[0],-i[1],-i[2]],[i[0],i[1],i[2]]]}o(ze,"axialExtent");function Os(r,e,t,i){if(r<0||e<0||t<0)return null;const s=.5*r,n=r>0?(t-e)/r:0,a=n*e,u=n*t,c=Math.sqrt(n*n+1),l=e*c,p=s-a,h=t*c,m=-s-u,g=p+l,D=m-h,A=Math.max(l,h),v=i==="X"?0:i==="Y"?1:2,I=[-A,-A,-A],C=[A,A,A];return I[v]=D,C[v]=g,[I,C]}o(Os,"capsule1Extent");function Es(r){if(r==="/"||!r.startsWith("/"))return null;const e=r.lastIndexOf("/");return e===0?"/":r.slice(0,e)}o(Es,"parentPath$2");const Rs=new ji;class xt{static{o(this,"XformCache")}_cache=new Map;_stage;_time;constructor(e,t){typeof e=="object"?(this._stage=e,this._time=t):(this._stage=void 0,this._time=e)}get time(){return this._time}getTime(){return this._time}setTime(e){if(e!==this._time){for(const t of this._cache.values())for(const i of t.values())i.ctmIsValid=!1;this._time=e}}clear(){this._cache.clear()}swap(e){const t=this._cache;this._cache=e._cache,e._cache=t;const i=this._time;this._time=e._time,e._time=i}getLocalTransformation(e){const t=this._entry(this._resolve(e));return!t||!t.xformable?{matrix:[...Z],resetsXformStack:!1}:{matrix:t.query.getLocalTransformation(this._time),resetsXformStack:t.query.getResetXformStack()}}getLocalToWorldTransform(e){return[...this._getCtm(this._resolve(e))]}getParentToWorldTransform(e){return[...this._getCtm(this._parent(this._resolve(e)))]}transformMightBeTimeVarying(e){const t=this._entry(this._resolve(e));return t?(t.mightBeTimeVarying??=t.xformable&&Ht(t.prim),t.mightBeTimeVarying):!0}getResetXformStack(e){return this._entry(this._resolve(e))?.query.getResetXformStack()??!1}computeRelativeTransform(e,t){let i=[...Z],s=!1;const n=this._resolve(t);for(let a=this._resolve(e);a&&!(n&&a.path===n.path&&a.getStage()===n.getStage());a=this._parent(a)){const u=this.getLocalTransformation(a);if(i=P(i,u.matrix),s=u.resetsXformStack,s)break}return{matrix:i,resetXformStack:s}}_resolve(e){return typeof e!="string"?e.isValid()?e:void 0:this._stage?.getPrim(e)}_parent(e){if(!e)return;const t=Es(e.path);return t===null?void 0:e.getStage().getPrim(t)}_entry(e){if(!e)return;const t=e.getStage();let i=this._cache.get(t);i||(i=new Map,this._cache.set(t,i));let s=i.get(e.path);if(!s){const n=e.isA("Xformable");s={prim:e,xformable:n,query:n?new ji(e):Rs,mightBeTimeVarying:void 0,ctm:[...Z],ctmIsValid:!1},i.set(e.path,s)}return s}_getCtm(e){const t=this._entry(e);if(!e||!t)return Z;if(t.ctmIsValid)return t.ctm;const i=t.query.getLocalTransformation(this._time);return t.ctm=t.query.getResetXformStack()?i:P(i,this._getCtm(this._parent(e))),t.ctmIsValid=!0,t.ctm}}function It(r){if(r!==void 0)return typeof r=="number"?r:r.isDefault()?void 0:r.GetValue()}o(It,"toTime");function Ye(r){return new x(...r)}o(Ye,"toGfMatrix");function De(r){if(r==="/"||!r.startsWith("/"))return null;const e=r.lastIndexOf("/");return e===0?"/":r.slice(0,e)}o(De,"parentPath$1");const _t=Nr.and(Mr).and(Or.not());function rt(r){const e=new Map;for(const[t,i]of r)e.set(t,new b(i));return e}o(rt,"copyBBoxes");function Me(r,e=""){return{prim:r,instanceInheritablePurpose:e}}o(Me,"primContext");function Oe(r){return`${r.instanceInheritablePurpose}\0${r.prim.path}`}o(Oe,"contextKey");class Xt{static{o(this,"Entry")}bboxes=new Map;purposeInfo={purpose:"",isInheritable:!1};isComplete=!1;isVarying=!1;isIncluded=!1;clone(){const e=new Xt;return e.bboxes=rt(this.bboxes),e.purposeInfo={...this.purposeInfo},e.isComplete=this.isComplete,e.isVarying=this.isVarying,e.isIncluded=this.isIncluded,e}}function qe(r,e){if(!e)return!1;const t=r===void 0?1.000001:r+1e-6;let i=e.getBracketingTimeSamples(t);if(i.length===0)return!1;let[s,n]=i;return s!==n||(i=e.getBracketingTimeSamples(s+1e-6),[s,n]=i,s!==n)||(i=e.getBracketingTimeSamples(s-1e-6),[s,n]=i,s!==n)}o(qe,"isVaryingImpl");function Qi(r){const e=r.getKind();return e?ii.isA(e,ri.component)||ii.isA(e,ri.subcomponent):!1}o(Qi,"isComponentOrSubComponent");function Us(r){const e=r.getStage();let t=r.path;for(;t;){const i=e.getPrim(t);if(!i)break;if(Qi(i))return i;t=De(t)}return e.getPrim("/")}o(Us,"getNearestComponent");function pi(r,e){for(;e&&!r.has(e);)r.add(e),e=De(e)}o(pi,"addPathAndAncestors");class bt{static{o(this,"BBoxCache")}_time;_baseTime=null;_includedPurposes;_useExtentsHint;_ignoreVisibility;_ctmCaches=new Map;_bboxCache=new Map;constructor(e,t=[],i=!1,s=!1){if(e instanceof bt){const n=e;this._time=n._time,this._baseTime=n._baseTime,this._includedPurposes=[...n._includedPurposes],this._useExtentsHint=n._useExtentsHint,this._ignoreVisibility=n._ignoreVisibility;for(const a of n._ctmCaches.keys())this._ctmCaches.set(a,new xt(a,n._time));for(const[a,u]of n._bboxCache){const c=new Map;for(const[l,p]of u)c.set(l,p.clone());this._bboxCache.set(a,c)}return}this._time=It(e),this._includedPurposes=[...t],this._useExtentsHint=i,this._ignoreVisibility=s}computeWorldBound(e){this._verifyPrim(e);const t=this._resolve(e);if(!t)return new b;const i=this._getCombinedBBoxForIncludedPurposes(t);return i.Transform(this._ctm(e)),i}computeRelativeBound(e,t){this._verifyPrim(e);const i=this._resolve(e);if(!i)return new b;const s=this._getCombinedBBoxForIncludedPurposes(i),n=this._ctm(e),a=this._ctm(t);return s.Transform(n.getMultiply(a.getInverse())),s}computeLocalBound(e){this._verifyPrim(e);const t=this._resolve(e);if(!t)return new b;const i=this._getCombinedBBoxForIncludedPurposes(t);return i.Transform(this._localTransformation(e)),i}computeUntransformedBound(e,t,i){if(t!==void 0)return this._computeBoundWithOverridesHelper(e,t,void 0,i??new Map);this._verifyPrim(e);const s=this._resolve(e);return s?this._getCombinedBBoxForIncludedPurposes(s):new b}computeWorldBoundWithOverrides(e,t,i,s){return this._computeBoundWithOverridesHelper(e,t,i,s)}computePointInstanceWorldBounds(e,t){return this._computePointInstanceBoundsHelper(e,t,this._ctm(e.prim))}computePointInstanceWorldBound(e,t){return this.computePointInstanceWorldBounds(e,[t])?.[0]??new b}computePointInstanceRelativeBounds(e,t,i){const s=this._ctm(e.prim),a=this._ctm(i).getInverse().getMultiply(s);return this._computePointInstanceBoundsHelper(e,t,a)}computePointInstanceRelativeBound(e,t,i){return this.computePointInstanceRelativeBounds(e,[t],i)?.[0]??new b}computePointInstanceLocalBounds(e,t){return this._computePointInstanceBoundsHelper(e,t,this._localTransformation(e.prim))}computePointInstanceLocalBound(e,t){return this.computePointInstanceLocalBounds(e,[t])?.[0]??new b}computePointInstanceUntransformedBounds(e,t){return this._computePointInstanceBoundsHelper(e,t,new x(1))}computePointInstanceUntransformedBound(e,t){return this.computePointInstanceUntransformedBounds(e,[t])?.[0]??new b}clear(){for(const e of this._ctmCaches.values())e.clear();this._bboxCache.clear()}setIncludedPurposes(e){this._includedPurposes=[...e]}getIncludedPurposes(){return[...this._includedPurposes]}getUseExtentsHint(){return this._useExtentsHint}getIgnoreVisibility(){return this._ignoreVisibility}setTime(e){const t=It(e);if(t===this._time)return;const i=this._time===void 0||t===void 0;for(const s of this._bboxCache.values())for(const n of s.values())(i||n.isVarying)&&(n.isComplete=!1,n.bboxes.clear());this._time=t;for(const s of this._ctmCaches.values())s.setTime(t)}getTime(){return this._time===void 0?Xe.Default():new Xe(this._time)}setBaseTime(e){this._baseTime=It(e)}getBaseTime(){return this._baseTime===null?this.getTime():this._baseTime===void 0?Xe.Default():new Xe(this._baseTime)}clearBaseTime(){this._baseTime=null}hasBaseTime(){return this._baseTime!==null}_verifyPrim(e){if(!e||!e.isValid())throw new Error(`Invalid prim: ${e?`<${e.path}>`:"null prim"}`)}_xformCache(e){let t=this._ctmCaches.get(e);return t||(t=new xt(e,this._time),this._ctmCaches.set(e,t)),t.setTime(this._time),t}_ctm(e){return Ye(this._xformCache(e.getStage()).getLocalToWorldTransform(e.path))}_localTransformation(e){return Ye(this._xformCache(e.getStage()).getLocalTransformation(e.path).matrix)}_entries(e){let t=this._bboxCache.get(e);return t||(t=new Map,this._bboxCache.set(e,t)),t}_findEntry(e){return this._bboxCache.get(e.prim.getStage())?.get(Oe(e))}_insertEntry(e){const t=this._entries(e.prim.getStage()),i=Oe(e);let s=t.get(i);return s||(s=new Xt,t.set(i,s)),s}_computeBoundWithOverridesHelper(e,t,i,s){this._verifyPrim(e);const n=new Set(t),a=new Set;for(const h of n)pi(a,De(h));const u=new Set;for(const h of s.keys())pi(u,De(h));const c=e.getStage();let l=new b;const p=ti.fromPrim(e)[Symbol.iterator]();for(let h=p.next();!h.done;h=p.next()){const m=h.value,g=m.path;if(n.has(g)){p.pruneChildren();continue}if(a.has(g)||u.has(g))continue;let D=g,A;for(;D&&D!==e.path;){if(s.has(D)){A=D;break}D=De(D)}let v;A===void 0?(v=this.computeRelativeBound(m,e),i&&v.Transform(i)):(v=this.computeRelativeBound(m,c.getPrim(A)),v.Transform(s.get(A))),l=b.combine(l,v),p.pruneChildren()}return l}_computePointInstanceBoundsHelper(e,t,i){const s=e.prim,n=s.getStage(),a=this._time;if(S(s,"protoIndices",a)===void 0){z(`${s.path} -- no prototype indices`);return}const c=T.getProtoIndices(s,a),l=T.getPrototypes(s);if(l.length===0){z(`${s.path} -- no prototypes`);return}for(const m of c)if(m<0||m>=l.length){z(`${s.path} -- invalid prototype index: ${m}. Should be in [0, ${l.length})`);return}const{xforms:p}=T.computeInstanceTransforms(s,{time:a,includeProtoXform:!0,stage:n,applyMask:!1});if(p.length!==c.length){z(`${s.path} -- could not compute instance transforms`);return}const h=[];for(const m of t){const g=c[m],D=n.getPrim(l[g]),A=this.computeUntransformedBound(D);A.Transform(Ye(p[m]).getMultiply(i)),h.push(A)}return h}_getCombinedBBoxForIncludedPurposes(e){let t=new b;for(const i of this._includedPurposes){const s=e.get(i);s&&!s.getRange().IsEmpty()&&(t=b.combine(t,s))}return t}_shouldIncludePrim(e){return e.isA("Typed")?!(!e.isA("Imageable")||!this._ignoreVisibility&&S(e,"visibility",this._time)==="invisible"):!0}_computePurposeInfo(e,t,i){if(e.purposeInfo.purpose)return;const s=t.prim;if(s.isPrototype()){e.purposeInfo=t.instanceInheritablePurpose?{purpose:t.instanceInheritablePurpose,isInheritable:!0}:{purpose:"default",isInheritable:!1};return}const n=De(s.path);if(n&&n!=="/"){const a=s.getStage().getPrim(n);if(a){const u=Me(a,t.instanceInheritablePurpose),c=this._findEntry(u);if(c){if(i){this._computePurposeInfo(c,u,!0),e.purposeInfo=R.computePurposeInfo(s,c.purposeInfo);return}if(c.purposeInfo.purpose){e.purposeInfo=R.computePurposeInfo(s,c.purposeInfo);return}}}}e.purposeInfo=R.computePurposeInfo(s)}_useExtentsHintForPrim(e){return this._useExtentsHint&&e.isModel()&&e.path!=="/"}_getExtentsHint(e){const t=S(e,"extentsHint",this._time);if(t==null)return;const i=be(t)??new Float32Array(0),s=[];for(let n=0;n+2<i.length;n+=3)s.push(new E(i[n],i[n+1],i[n+2]));return s}_shouldPruneChildren(e,t){if(t.isComplete||e.isA("Boundable"))return!0;if(!this._useExtentsHintForPrim(e))return!1;const i=this._getExtentsHint(e);return i!==void 0&&i.length>=2}_findOrCreateEntriesForPrim(e,t){const i=this._insertEntry(e);if(i.isComplete)return i;i.isIncluded=this._shouldIncludePrim(e.prim);const s=new Set,n=ti.fromPrim(e.prim,_t)[Symbol.iterator]();for(let a=n.next();!a.done;a=n.next()){const u=a.value,c=Me(u,e.instanceInheritablePurpose),l=this._insertEntry(c);if(this._shouldPruneChildren(u,l))n.pruneChildren();else if(u.isInstance()){const p=u.getPrototype();this._computePurposeInfo(l,c,!0);const h=Me(p,ai(l.purposeInfo)),m=Oe(h);s.has(m)||(s.add(m),t.push(h)),n.pruneChildren()}}return i}_resolvePrototypes(e){const t=new Map,i=o(n=>{const a=Oe(n);if(t.has(a))return;const u={context:n,numDependencies:0,dependentPrototypes:[]};t.set(a,u);const c=[];this._findOrCreateEntriesForPrim(n,c),u.numDependencies=c.length;for(const l of c)i(l),t.get(Oe(l)).dependentPrototypes.push(a)},"populate");for(const n of e)i(n);const s=[];for(const[n,a]of t)a.numDependencies===0&&s.push(n);for(;s.length>0;){const n=t.get(s.shift());this._resolvePrim(n.context,new x(1));for(const a of n.dependentPrototypes){const u=t.get(a);--u.numDependencies===0&&s.push(a)}}}_resolve(e){const t=[],i=Me(e);let s=this._findOrCreateEntriesForPrim(i,t);if(s.isComplete)return s.bboxes.size>0?rt(s.bboxes):void 0;t.length>0&&this._resolvePrototypes(t);const n=Us(e),a=Ye(new xt(n.getStage()).getLocalToWorldTransform(n.path)).getInverse();if(this._resolvePrim(i,a),s=this._findEntry(i),!!s)return s.bboxes.size>0?rt(s.bboxes):void 0}_getBBoxFromExtentsHint(e,t){const i=this._getExtentsHint(e);if(!i)return!1;const s=R.getOrderedPurposeTokens();for(let n=0;n<s.length;++n){const a=n*2;if(a+2>i.length)break;t.set(s[n],new b(new k(i[a],i[a+1])))}return!0}_resolvePrim(e,t){const i=this._findEntry(e);if(!i)return;const s=i.bboxes;if(i.isComplete)return;const n=e.prim;if(this._computePurposeInfo(i,e,!1),this._useExtentsHintForPrim(n)){const u=n.getAttr("extentsHint");if(u&&this._getBBoxFromExtentsHint(n,s)){i.isComplete=!0,i.isVarying=qe(this._time,u),i.isIncluded=this._shouldIncludePrim(n);return}}if(!i.isVarying){const u=!this._ignoreVisibility&&n.isA("Imageable")?n.getAttr("visibility"):void 0,c=n.isA("Boundable")?n.getAttr("extent"):void 0;i.isVarying=n.isA("Xformable")&&Ht(n)||qe(this._time,c)||qe(this._time,u)}if(n.isA("Boundable")){const u=Y.computeExtent(n,this._time);if(u){const c=i.purposeInfo.purpose,l=s.get(c)??new b;s.set(c,l),l.setRange(new k(new E(...u[0]),new E(...u[1])))}}else{let u=!1,c=new x(1);const l=Qi(n)?this._ctm(n).getInverse():t,p=[];let h,m;const g=n.isInstance();g?(h=n.getPrototype().getFilteredChildren(_t),m=ai(i.purposeInfo)):(h=n.getFilteredChildren(_t),m=e.instanceInheritablePurpose);for(const D of h){const A=Me(D,m),v=this._findEntry(A);if(v){if(v.isComplete||(v.isIncluded=this._shouldIncludePrim(D)),!this._ignoreVisibility&&!v.isIncluded){D.isA("Imageable")&&(i.isVarying||=qe(this._time,D.getAttr("visibility")));continue}p.push(A)}}if(!g)for(const D of p)this._resolvePrim(D,l);for(const D of p){const A=D.prim,v=this._findEntry(D);if(v?.isComplete&&(i.isVarying||=v.isVarying,v.bboxes.size>0)){if(!u){c=this._ctm(n).getMultiply(l);for(const[W,ee]of s)ee.setMatrix(c),s.set(W,new b(ee.ComputeAlignedRange()));u=!0}const I=rt(v.bboxes),C=g?this._localTransformation(A).getMultiply(c):this._ctm(A).getMultiply(l);for(const[W,ee]of I){ee.Transform(C);const ge=s.get(W)??new b;s.set(W,ge),ge.setRange(new k(ge.getRange()).unionWith(ee.ComputeAlignedRange()))}}}if(u){const D=c.getInverse();for(const A of s.values())A.setMatrix(D)}}i.isComplete=!0}}As(bt);class T extends Y{static{o(this,"PointInstancer")}static typeName="PointInstancer";static get(e,t){return new T(e.getPrim(t),e)}static define(e,t){return new T(e.definePrim(t,"PointInstancer"),e)}isValid(){return super.isValid()&&this.prim.isA(T.typeName)}static getSchemaAttributeNames(e=!0){return e?["visibility","purpose","xformOpOrder","extent","protoIndices","ids","positions","orientations","orientationsf","scales","velocities","accelerations","angularVelocities","invisibleIds"]:["protoIndices","ids","positions","orientations","orientationsf","scales","velocities","accelerations","angularVelocities","invisibleIds"]}getProtoIndicesAttr(){return this.prim.getAttr(y.protoIndices)}createProtoIndicesAttr(e,t=!1){return this._createAttr(y.protoIndices,"int[]",!1,"varying",e,t)}getIdsAttr(){return this.prim.getAttr(y.ids)}createIdsAttr(e,t=!1){return this._createAttr(y.ids,"int64[]",!1,"varying",e,t)}getPositionsAttr(){return this.prim.getAttr(y.positions)}createPositionsAttr(e,t=!1){return this._createAttr(y.positions,"point3f[]",!1,"varying",e,t)}getOrientationsAttr(){return this.prim.getAttr(y.orientations)}createOrientationsAttr(e,t=!1){return this._createAttr(y.orientations,"quath[]",!1,"varying",e,t)}getOrientationsfAttr(){return this.prim.getAttr(y.orientationsf)}createOrientationsfAttr(e,t=!1){return this._createAttr(y.orientationsf,"quatf[]",!1,"varying",e,t)}getScalesAttr(){return this.prim.getAttr(y.scales)}createScalesAttr(e,t=!1){return this._createAttr(y.scales,"float3[]",!1,"varying",e,t)}getVelocitiesAttr(){return this.prim.getAttr(y.velocities)}createVelocitiesAttr(e,t=!1){return this._createAttr(y.velocities,"vector3f[]",!1,"varying",e,t)}getAccelerationsAttr(){return this.prim.getAttr(y.accelerations)}createAccelerationsAttr(e,t=!1){return this._createAttr(y.accelerations,"vector3f[]",!1,"varying",e,t)}getAngularVelocitiesAttr(){return this.prim.getAttr(y.angularVelocities)}createAngularVelocitiesAttr(e,t=!1){return this._createAttr(y.angularVelocities,"vector3f[]",!1,"varying",e,t)}getInvisibleIdsAttr(){return this.prim.getAttr(y.invisibleIds)}createInvisibleIdsAttr(e,t=!1){return this._createAttr(y.invisibleIds,"int64[]",!1,"varying",e,t)}getPrototypesRel(){return this.prim.rel(y.prototypes)}createPrototypesRel(){return this.prim.createRelationship(y.prototypes,!1)}static is(e){return e.typeName===T.typeName}activateId(e){return this.activateIds([e])}activateIds(e){return hi(e,"deleted",this.prim,"inactiveIds")}activateAllIds(){return this.prim.setMetadata("inactiveIds",ot.createExplicit([]).toValue())}deactivateId(e){return this.deactivateIds([e])}deactivateIds(e){return hi(e,"appended",this.prim,"inactiveIds")}visId(e,t){return this.visIds([e],t)}visIds(e,t){const i=this._getInvisibleIds(t);if(i===void 0)return!0;const s=new Set(i);let n=0;for(const u of e)s.delete(u)&&n++;const a=n?[...s].sort((u,c)=>u-c):i;return St(this.createInvisibleIdsAttr(),a,t)}visAllIds(e){return this.getInvisibleIdsAttr().hasAuthoredValue()?St(this.createInvisibleIdsAttr(),[],e):!0}invisId(e,t){return this.invisIds([e],t)}invisIds(e,t){const i=this._getInvisibleIds(t);if(i===void 0)return!0;const s=new Set(i);for(const n of e)s.has(n)||i.push(n);return St(this.createInvisibleIdsAttr(),i,t)}_getInvisibleIds(e){const t=this.getInvisibleIdsAttr(),i=U(e===void 0?t.getValue():t.getValueAtTime(e));return Array.isArray(i)?i.map(Number):void 0}computeInstanceTransformsAtTime(e,t,i="IncludeProtoXform",s="ApplyMask"){const{xforms:n}=T.computeInstanceTransforms(this.prim,{time:e,stage:this.stage,includeProtoXform:i==="IncludeProtoXform",applyMask:s==="ApplyMask"});return n.map(a=>new x(...a))}getInstanceCount(e){const t=this.getProtoIndicesAttr(),i=U(e===void 0?t.getValue():t.getValueAtTime(e));return Array.isArray(i)?i.length:0}computeExtentAtTime(e,t,i){const s=Ji(this.prim,e,i);return s&&[s[0].map(Math.fround),s[1].map(Math.fround)]}static getProtoIndices(e,t){const i=U(S(e,"protoIndices",t));return Array.isArray(i)?i.map(Number):[]}static getPositions(e,t){const i=U(S(e,"positions",t));return Array.isArray(i)?i:[]}static getOrientations(e,t){const i=U(S(e,"orientations",t));return Array.isArray(i)?i.map(s=>zi(s)):[]}static getScales(e,t){const i=U(S(e,"scales",t));return Array.isArray(i)?i:[]}static getVelocities(e,t){const i=U(S(e,"velocities",t));return Array.isArray(i)?i:[]}static getAccelerations(e,t){const i=U(S(e,"accelerations",t));return Array.isArray(i)?i:[]}static getInvisibleIds(e,t){const i=U(S(e,"invisibleIds",t));return Array.isArray(i)?i.map(Number):[]}static getIds(e,t){const i=U(S(e,"ids",t));return Array.isArray(i)?i.map(Number):[]}static getPrototypes(e){return e.getAttr("prototypes")?.getTargets()??[]}static computeMask(e,t){const i=T.getIds(e,t),s=i.length>0?i.length:T.getProtoIndices(e,t).length,n=new Set(T.getInvisibleIds(e,t)),a=Ui(e.getMetadata("inactiveIds"));for(const c of a?.explicitItems??[])n.add(Number(c));const u=new Array(s);for(let c=0;c<s;c++){const l=i.length>0?i[c]:c;u[c]=!n.has(l)}return u}static computeInstanceTransforms(e,t={}){const{time:i,includeProtoXform:s=!1,stage:n,applyMask:a=!0}=t,u=T.getProtoIndices(e,i),c=T.getPositions(e,i),l=T.getOrientations(e,i),p=T.getScales(e,i),h=a?T.computeMask(e,i):null,m=u.length;if(c.length!==m)return{xforms:[],protoIndices:[]};if(l.length>0&&l.length!==m)return{xforms:[],protoIndices:[]};if(p.length>0&&p.length!==m)return{xforms:[],protoIndices:[]};let g=null;s&&n&&(g=T.getPrototypes(e).map(I=>{const C=n.getPrim(I);return C?Ns(C,i).matrix:[...Z]}));const D=[],A=[];for(let v=0;v<m;v++){if(h&&!h[v])continue;let I=[...Z];const C=p[v];C&&(I[0]=C[0]??1,I[5]=C[1]??1,I[10]=C[2]??1);const W=l[v];if(W){const Jt=is(W[0],W[1],W[2],W[3]);I=C?P(I,Jt):Jt}const ee=c[v];I[12]=ee[0]??0,I[13]=ee[1]??0,I[14]=ee[2]??0;const ge=u[v];g&&(I=P(g[ge]??[...Z],I)),D.push(I),A.push(ge)}return{xforms:D,protoIndices:A}}}function Vs(r){return r.isExplicit?ot.createExplicit(r.explicitItems):ot.create(r.prependedItems,r.appendedItems,r.deletedItems)}o(Vs,"toListOp");function Gs(r){if(r.isExplicit)return r;const e=Rr([],r).sort((t,i)=>t-i);return{isExplicit:!1,explicitItems:[],deletedItems:[...r.deletedItems],prependedItems:e,appendedItems:[]}}o(Gs,"canonicalizeListOp");function hi(r,e,t,i){const n=t.getStage().getEditTarget(),a=n.getLayer();let u={isExplicit:!1,explicitItems:[],deletedItems:[],prependedItems:[],appendedItems:[]};if(a){const h=Ui(a.getField(n.mapToSpecPath(t.path),i));h&&(u={isExplicit:h.isExplicit,explicitItems:h.explicitItems.map(Number),deletedItems:h.deletedItems.map(Number),prependedItems:h.prependedItems.map(Number),appendedItems:h.appendedItems.map(Number)})}const c=new ot;c.setItems(r,e);const l=c.toValue();u=Gs(u);const p=Er(l,u);return t.setMetadata(i,Vs(p).toValue())}o(hi,"setOrMergeOverOp");function St(r,e,t){return t===void 0?r.set(e):r.setTimeSample(t,e),!0}o(St,"setAt");function Ji(r,e,t){if(S(r,"protoIndices",e)===void 0)return z(`${r.path} -- no prototype indices`),null;const s=T.getProtoIndices(r,e),n=T.computeMask(r,e);if(n.length&&n.length!==s.length)return z(`${r.path} -- mask.size() [${n.length}] != protoIndices.size() [${s.length}]`),null;const a=T.getPrototypes(r);if(!a.length)return z(`${r.path} -- no prototypes`),null;for(const m of s)if(m<0||m>=a.length)return z(`${r.path} -- invalid prototype index: ${m}. Should be in [0, ${a.length})`),null;const u=r.getStage(),{xforms:c}=T.computeInstanceTransforms(r,{time:e,stage:u,includeProtoXform:!0,applyMask:!1});if(c.length!==s.length)return z(`${r.path} -- could not compute instance transforms`),null;const l=new bt(e,["default","proxy","render"]),p=a.map(m=>{const g=u.getPrim(m);return g?l.computeUntransformedBound(g):new b}),h=new k;for(let m=0;m<s.length;m++){if(n.length&&!n[m])continue;const g=new b(p[s[m]]),D=new x(...c[m]);if(g.Transform(D),t){const A=new x(...t);g.Transform(A)}h.unionWith(g.ComputeAlignedRange())}return[[...h.getMin().data],[...h.getMax().data]]}o(Ji,"computePointInstancerExtent");Ce(T.typeName,Ji);const Ls={Plugins:[{Info:{SdfMetadata:{bindMaterialAs:{appliesTo:["relationships"],displayGroup:"Shading",documentation:"Metadata authored on collection-based material binding relationship to indicate the strength of the binding relative to bindings authored on descendant prims.",type:"token"},connectability:{appliesTo:["attributes"],default:"full",displayGroup:"Shading",documentation:`Metadata authored on UsdShadeInput's to specify what they can be connected to. Can be either "full" or "interfaceOnly". "full" implies that  the input can be connected to any other input or output.  "interfaceOnly" implies that the input can only connect to a NodeGraph Input (which represents an interface override, not a render-time dataflow connection), or another Input whose connectability is also "interfaceOnly".`,type:"token"},outputName:{appliesTo:["relationships"],displayGroup:"deprecated",type:"token"},renderType:{appliesTo:["properties"],displayGroup:"Rendering",type:"token"},sdrMetadata:{appliesTo:["prims","attributes"],displayGroup:"Shading",type:"dictionary"}},Types:{UsdShadeConnectableAPI:{alias:{UsdSchemaBase:"ConnectableAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ConnectableAPI",schemaKind:"nonAppliedAPI"},UsdShadeCoordSysAPI:{alias:{UsdSchemaBase:"CoordSysAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"CoordSysAPI",schemaKind:"multipleApplyAPI"},UsdShadeMaterial:{alias:{UsdSchemaBase:"Material"},autoGenerated:!0,bases:["UsdShadeNodeGraph"],providesUsdShadeConnectableAPIBehavior:!0,schemaIdentifier:"Material",schemaKind:"concreteTyped"},UsdShadeMaterialBindingAPI:{alias:{UsdSchemaBase:"MaterialBindingAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"MaterialBindingAPI",schemaKind:"singleApplyAPI"},UsdShadeNodeDefAPI:{alias:{UsdSchemaBase:"NodeDefAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"NodeDefAPI",schemaKind:"singleApplyAPI"},UsdShadeNodeGraph:{alias:{UsdSchemaBase:"NodeGraph"},autoGenerated:!0,bases:["UsdTyped"],providesUsdShadeConnectableAPIBehavior:!0,schemaIdentifier:"NodeGraph",schemaKind:"concreteTyped"},UsdShadeShader:{alias:{UsdSchemaBase:"Shader"},autoGenerated:!0,bases:["UsdTyped"],providesUsdShadeConnectableAPIBehavior:!0,schemaIdentifier:"Shader",schemaKind:"concreteTyped"},UsdShadeShaderDefParserPlugin:{bases:["SdrParserPlugin"],displayName:"USD-based shader definition parser plugin"}}},LibraryPath:"@PLUG_INFO_LIBRARY_PATH@",Name:"usdShade",ResourcePath:"@PLUG_INFO_RESOURCE_PATH@",Root:"@PLUG_INFO_ROOT@",Type:"library"}]},Fs=`#usda 1.0
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

`;V.GetInstance().RegisterPlugins(Ls,{usdShade:{"generatedSchema.usda":Fs}});var Ot=(r=>(r[r.BasicNodes=0]="BasicNodes",r[r.DerivedContainerNodes=1]="DerivedContainerNodes",r))(Ot||{});function de(r){const e=r.lastIndexOf("/");return e<=0?"/":r.slice(0,e)}o(de,"parentPath");function st(r){return`${r.sourceType==="input"?"inputs":"outputs"}:${r.name}`}o(st,"sourceAttrName");function Ee(r){return`${r.primPath}.${st(r)}`}o(Ee,"sourcePath");function mi(r){const e=r.lastIndexOf(".");return[r.slice(0,e),r.slice(e+1)]}o(mi,"splitProperty");function Ze(r,e,t){return r.getPrim(e)?.getAttr(t)?.isValid()??!1}o(Ze,"attributeIsValid");function fi(r,e){const t=r.get(e)?.getField("connectability");return typeof t=="string"&&t.length>0?t:"full"}o(fi,"connectabilityOf");function Tt(r,e){const t=r.getPrim(e);return t?me(t)?.isContainer()??!1:!1}o(Tt,"primIsContainer");class Kt{static{o(this,"ConnectableAPIBehavior")}#e;#t;constructor(e=!1,t=!0){this.#e=e,this.#t=t}canConnectInputToSource(e,t,i){return this._canConnectInputToSource(e,t,i)}canConnectOutputToSource(e,t,i){return this._canConnectOutputToSource(e,t,i)}isContainer(){return this.#e}requiresEncapsulation(){return this.#t}_canConnectInputToSource(e,t,i,s=0){const[n,a]=mi(t);if(!a.startsWith("inputs:")||!Ze(e,n,a))return{canConnect:!1,reason:`Invalid input: ${t}`};if(!Ze(e,i.primPath,st(i)))return{canConnect:!1,reason:`Invalid source: ${Ee(i)}`};const u=i.primPath,c=e.getPrim(n)?.typeName??"",l=o(()=>Tt(e,u)?de(n)!==u?{canConnect:!1,reason:`Encapsulation check failed - input source prim '${u}' is not the closest ancestor container of the NodeGraph '${n}' owning the input attribute '${a}'.`}:{canConnect:!0}:{canConnect:!1,reason:`Encapsulation check failed - prim '${u}' owning the input source '${st(i)}' is not a container.`},"encapsulationCheckForInputSources"),p=o(()=>s===1?Tt(e,n)?de(u)!==n?{canConnect:!1,reason:`Encapsulation check failed - For input's prim type '${c}', Output source's prim '${u}' is not an immediate descendent of the input's prim '${n}'.`}:{canConnect:!0}:{canConnect:!1,reason:`Encapsulation check failed - For input's prim type '${c}', prim owning the input '${t}' is not a container.`}:Tt(e,de(n))?de(n)!==de(u)?{canConnect:!1,reason:`Encapsulation check failed - For input's prim type '${c}', Input's prim '${n}' and source's prim '${u}' are not contained by the same container prim.`}:{canConnect:!0}:{canConnect:!1,reason:`Encapsulation check failed - For input's prim type '${c}', Immediate ancestor '${de(u)}' for the prim owning the output source '${Ee(i)}' is not a container.`},"encapsulationCheckForOutputSources"),h=fi(e,t),m=this.requiresEncapsulation();return h==="full"?i.sourceType==="input"?m?l():{canConnect:!0}:m?p():{canConnect:!0}:h==="interfaceOnly"?i.sourceType==="input"?fi(e,Ee(i))==="interfaceOnly"?m?l():{canConnect:!0}:{canConnect:!1,reason:"Input connectability is 'interfaceOnly' and source does not have 'interfaceOnly' connectability."}:{canConnect:!1,reason:"Input connectability is 'interfaceOnly' but source is not an input"}:{canConnect:!1,reason:"Input connectability is unspecified"}}_canConnectOutputToSource(e,t,i,s=0){const[n,a]=mi(t);if(!a.startsWith("outputs:")||!Ze(e,n,a))return{canConnect:!1,reason:"Invalid output"};if(!Ze(e,i.primPath,st(i)))return{canConnect:!1,reason:"Invalid source"};const u=i.primPath,c=this.requiresEncapsulation();return i.sourceType==="input"?s===1?{canConnect:!1,reason:`Encapsulation check failed - passthrough usage is not allowed for output prim '${n}' of type '${e.getPrim(n)?.typeName??""}'.`}:u!==n?{canConnect:!1,reason:`Encapsulation check failed - output '${t}' and input source '${Ee(i)}' must be encapsulated by the same container prim`}:{canConnect:!0}:c&&de(u)!==n?{canConnect:!1,reason:`Encapsulation check failed - prim owning the output '${t}' is not an immediate descendent  of the prim owning the output source '${Ee(i)}'.`}:{canConnect:!0}}}function er(r,e=[]){return[r,...e].join(";")}o(er,"primTypeIdKey");function Dt(r){return er(N.getSchemaTypeName(r))}o(Dt,"typeKey");const J=new Map;let gi=!1;function $s(){gi||(gi=!0,V.GetInstance().addDidRegisterPluginsListener(()=>{for(const[r,e]of J)e||J.delete(r)}))}o($s,"subscribeToPluginRegistration");function Ge(r,e){if(J.has(r)){if(J.get(r)===e)return;throw new Error(`A different UsdShade Connectable behavior already registered for primTypeId comprised of '${r}' type and apischemas.`)}J.set(r,e)}o(Ge,"registerBehaviorForPrimTypeId");function Et(r){return J.get(Dt(r))}o(Et,"findBehaviorForType");function tr(r){const e=V.GetInstance().getMetadataForType(r),t=o((s,n)=>typeof e[s]=="boolean"?e[s]:n,"bool"),i=new Kt(t("isUsdShadeContainer",!1),t("requiresUsdShadeEncapsulation",!0));return Ge(Dt(r),i),i}o(tr,"registerPlugConfiguredBehaviorForType");function ir(r){if(!r.isA(O.findByName("UsdTyped"))&&!r.isA(O.findByName("UsdAPISchemaBase")))return!1;const e=V.GetInstance();if(e.getMetadataForType(r).providesUsdShadeConnectableAPIBehavior!==!0)return!1;const t=e.getPluginForType(r);if(!t)throw new Error(`Could not find plugin for '${r.getTypeName()}'`);return t.Load()}o(ir,"loadPluginDefiningBehaviorForType");function yi(r){const e=N.getAPITypeFromSchemaTypeName(r);if(N.getSchemaKind(e)==="singleApplyAPI"&&ir(e))return Et(e)??tr(e)}o(yi,"findBehaviorForApiSchema");function rr(r,e,t,i){$s();const s=er(r,e);if(J.has(s))return J.get(s);let n=t;if((!n||n.isUnknown())&&(n=N.getTypeFromSchemaTypeName(r),n.isUnknown()&&e.length===0))return null;let a=null,u=!1;if(!n.isUnknown()){const l=n.getAllAncestorTypes();let p=0;for(;p<l.length;++p){const h=l[p],m=Et(h);if(m!==void 0){a=m,u=!0;break}if(ir(h)){a=Et(h)??tr(h),u=!0;break}}if(u)for(let h=0;h<p;++h){const m=Dt(l[h]);J.has(m)||J.set(m,a)}if(a){for(const h of e){const m=yi(h);if(m){a=m,Ge(s,a);break}}return a}}let c=[];if(!N.isAbstract(n))if(i)c=i.getAppliedSchemas();else{const l=N.getInstance(),p=N.getSchemaTypeName(n);c=(N.isConcrete(n)?l.findConcretePrimDefinition(p):l.findAppliedAPIPrimDefinition(p))?.getAppliedAPISchemas()??[]}for(const l of c){const p=yi(l);if(p)return Ge(s,p),p}return u||Ge(s,null),null}o(rr,"getBehaviorForPrimTypeId");function sr(r,e){if(!e||r.isUnknown())throw new Error(`Invalid behavior registration for prim type '${r.getTypeName()}'`);Ge(Dt(r),e)}o(sr,"registerConnectableAPIBehavior");function me(r){const e=r.getPrimTypeInfo();return rr(e.getTypeName(),e.getAppliedAPISchemas(),e.getSchemaType(),r)}o(me,"getConnectableAPIBehavior");function Hs(r){return rr(N.getSchemaTypeName(r),[],r,void 0)!==null}o(Hs,"hasConnectableAPIBehaviorForType");class F extends $e{static{o(this,"ConnectableAPI")}static typeName="ConnectableAPI";static get(e,t){return new F(e.getPrim(t),e)}static getSchemaAttributeNames(e=!0){return e?[]:[]}isValid(){return super.isValid()&&me(this._prim)!==null}static hasConnectableAPI(e){return Hs(e)}isContainer(){return me(this._prim)?.isContainer()??!1}requiresEncapsulation(){return me(this._prim)?.requiresEncapsulation()??!1}createInput(e,t){return this._declareAttr(`inputs:${e}`,t),new wt(this._prim,e)}createOutput(e,t="token"){return this._declareAttr(`outputs:${e}`,t),new Bt(this._prim,e)}getInput(e){return new wt(this._prim,e)}getOutput(e){return new Bt(this._prim,e)}getInputs(e=!0){return bi(this._prim,"inputs:",e).map(t=>new wt(this._prim,t))}getOutputs(e=!0){return bi(this._prim,"outputs:",e).map(t=>new Bt(this._prim,t))}}function bi(r,e,t){return t?zt(r,e):r.getPropertyNames(i=>i.startsWith(e)).filter(i=>r.getAttr(i)?.isValid()).map(i=>i.slice(e.length))}o(bi,"attributeNamesInNamespace");function zt(r,e){return r.getAuthoredPropertyNames(t=>t.startsWith(e)).filter(t=>r.getAttr(t)?.isValid()).map(t=>t.slice(e.length))}o(zt,"authoredAttributeNamesInNamespace");function ga(r){return zt(r,"inputs:")}o(ga,"getInputNames");function ya(r){return zt(r,"outputs:")}o(ya,"getOutputNames");function nr(r,e,t=!1){const i=o((s,n)=>{if(n.has(s))return[];const a=r.get(s);if(!a||!ue(s))return[];const u=new Set(n).add(s),c=[];for(const l of a.getConnections()){const p=ue(l);!p||!r.get(l)||(Xs(r,p.primPath)?c.push(...i(l,u)):p.sourceType==="output"&&c.push(r._primHandle(p.primPath).attr(`outputs:${p.name}`)))}return!c.length&&!t&&a.hasAuthoredValue()&&c.push(r._primHandle(a.primPath).attr(a.name)),c},"visit");return i(e,new Set)}o(nr,"getValueProducingAttributes");function Xs(r,e){const t=r.getPrim(e);return t?me(t)?.isContainer()??!1:!1}o(Xs,"isContainer");function Ks(r,e){const t=r.get(e)?.getField("connectability");return typeof t=="string"&&t.length>0?t:"full"}o(Ks,"getConnectability");function ue(r){const e=r.lastIndexOf(".");if(e<=0)return null;const t=r.slice(0,e),i=r.slice(e+1);return i.startsWith("outputs:")?{primPath:t,name:i.slice(8),sourceType:"output"}:i.startsWith("inputs:")?{primPath:t,name:i.slice(7),sourceType:"input"}:{primPath:t,name:i,sourceType:"output"}}o(ue,"parseSourcePath");function zs(r){const e=r.sourceType==="input"?"inputs:":"outputs:";return`${r.primPath}.${e}${r.name}`}o(zs,"sourceFullPath");class Yt{static{o(this,"ConnectionSourceInfo")}constructor(e,t,i,s=""){this.source=e,this.sourceName=t,this.sourceType=i,this.typeName=s}isValid(){return this.sourceType!=="invalid"&&this.sourceName!==""&&(this.source.prim?.isValid()??!1)}equals(e){return this.sourceName===e.sourceName&&this.sourceType===e.sourceType&&this.source.path===e.source.path}}function ht(r){return typeof r=="string"?ue(r):r instanceof Yt?!r.isValid()||r.sourceType==="invalid"?null:{primPath:r.source.path,name:r.sourceName,sourceType:r.sourceType}:ue(r.fullPath)}o(ht,"resolveSource");function ar(r){return r instanceof Yt?r.typeName:typeof r=="string"?"":r.attr.isValid()?r.attr.typeName:""}o(ar,"sourceTypeName");function or(r,e){const t=[],i=[];for(const s of e.isValid()?e.getConnections():[]){const n=s.lastIndexOf("."),a=n>0?r.getPrim(s.slice(0,n)):void 0,u=s.slice(n+1),c=a?.getAttr(u);if(!a||!c?.isValid()||c.isRelationship){i.push(s);continue}const l=u.startsWith("inputs:")?"input":u.startsWith("outputs:")?"output":null;if(!l){i.push(s);continue}const p=u.slice(l==="input"?7:8);t.push(new Yt(new F(a),p,l,c.typeName))}return[t,i]}o(or,"getConnectedSourcesOf");function Ys(r,e,t){const i=ue(e);if(!i)return{canConnect:!1,reason:`Invalid input: ${e}`};const s=r.getPrim(i.primPath),n=s?me(s):null;return n?n.canConnectInputToSource(r,e,t):{canConnect:!1,reason:`Prim '${i.primPath}' owning the input is not connectable.`}}o(Ys,"canConnectInputToSource");function qs(r,e,t){const i=ue(e);if(!i)return{canConnect:!1,reason:`Invalid output: ${e}`};const s=r.getPrim(i.primPath),n=s?me(s):null;return n?n.canConnectOutputToSource(r,e,t):{canConnect:!1,reason:`Prim '${i.primPath}' owning the output is not connectable.`}}o(qs,"canConnectOutputToSource");function cr(r,e,t,i=""){const s=r.getPrim(t.primPath);if(!s||!t.name)return!1;const n=`${t.sourceType==="input"?"inputs":"outputs"}:${t.name}`;return s.getAttr(n)?.isValid()||r.declareProperty(t.primPath,n,i||e.typeName),e.setConnections([zs(t)]),!0}o(cr,"authorConnection");class wt{static{o(this,"ShadeInput")}constructor(e,t){this._prim=e,this.name=t}get attrName(){return`inputs:${this.name}`}get fullPath(){return`${this._prim.path}.${this.attrName}`}get attr(){return this._prim.attr(this.attrName)}set(e){this.attr.set(e)}get(){return this.attr.get()}getAttr(){return this.attr}getPrim(){return this._prim}getBaseName(){return this.name}getTypeName(){return this.attr.typeName}getFullName(){return this.attrName}setRenderType(e){return this.attr.setMetadata("renderType",e)}getRenderType(){const e=this.attr.getMetadata("renderType");return typeof e=="string"?e:""}hasRenderType(){return this.attr.hasMetadata("renderType")}setDocumentation(e){return this.attr.isValid()?this.attr.setMetadata("documentation",e):!1}getDocumentation(){const e=this.attr.isValid()?this.attr.getMetadata("documentation"):void 0;return typeof e=="string"?e:""}setDisplayGroup(e){return this.attr.isValid()?this.attr.setDisplayGroup(e):!1}getDisplayGroup(){const e=this.attr.isValid()?this.attr.getMetadata("displayGroup"):void 0;return typeof e=="string"?e:""}setConnectability(e){this._prim.getStage().setPropertyField(this.fullPath,"connectability",e)}getConnectability(){return Ks(this._prim.getStage(),this.fullPath)}getSdrMetadata(){const e=this.attr.getMetadata("sdrMetadata"),t={};if(e&&typeof e=="object")for(const[i,s]of Object.entries(e))t[i]=String(s);return t}setSdrMetadata(e){for(const[t,i]of Object.entries(e))this.setSdrMetadataByKey(t,i)}setSdrMetadataByKey(e,t){const i=this._prim.getStage().getEditTarget(),s=i.getLayer()?.getField(i.mapToSpecPath(this.fullPath),"sdrMetadata"),n=s&&typeof s=="object"?{...s}:{};n[e]=t,this.attr.setMetadata("sdrMetadata",n)}hasSdrMetadataByKey(e){const t=this.attr.getMetadata("sdrMetadata");return!!t&&typeof t=="object"&&e in t}getSdrMetadataByKey(e){let t=this.attr.getMetadata("sdrMetadata");for(const i of e.split(":").filter(Boolean)){if(!t||typeof t!="object")return"";t=t[i]}return t==null?"":String(t)}canConnect(e){const t=ht(e);return t?Ys(this._prim.getStage(),this.fullPath,t):{canConnect:!1,reason:"Invalid source."}}connectToSource(e){const t=ht(e);return!(!t||!cr(this._prim.getStage(),this.attr,t,ar(e)))}disconnectSource(e){return e?this.attr.removeConnection(e.getPath()):(this.attr.setConnections([]),!0)}clearSources(){return this.attr.clearConnections()}clearSource(){return this.clearSources()}getConnectedSources(){return or(this._prim.getStage(),this.attr)}getConnectedSource(){const e=this.attr.getConnections();return e.length>0?ue(e[0]):null}hasConnectedSource(){return this.getConnectedSources()[0].length>0}getValueProducingAttributes(e=!1){return nr(this._prim.getStage(),this.fullPath,e)}}class Bt{static{o(this,"ShadeOutput")}constructor(e,t){this._prim=e,this.name=t}get attrName(){return`outputs:${this.name}`}get fullPath(){return`${this._prim.path}.${this.attrName}`}get attr(){return this._prim.attr(this.attrName)}canConnect(e){const t=ht(e);return t?qs(this._prim.getStage(),this.fullPath,t):{canConnect:!1,reason:"Invalid source."}}connectToSource(e){const t=ht(e);return!(!t||!cr(this._prim.getStage(),this.attr,t,ar(e)))}getAttr(){return this.attr}getPrim(){return this._prim}getBaseName(){return this.name}getTypeName(){return this.attr.typeName}getFullName(){return this.attrName}disconnectSource(e){return e?this.attr.removeConnection(e.getPath()):(this.attr.setConnections([]),!0)}clearSources(){return this.attr.clearConnections()}getConnectedSources(){return or(this._prim.getStage(),this.attr)}hasConnectedSource(){return this.getConnectedSources()[0].length>0}getConnectedSource(){const e=this.attr.getConnections();return e.length>0?ue(e[0]):null}getValueProducingAttributes(e=!1){return nr(this._prim.getStage(),this.fullPath,e)}}const je=Object.freeze({allPurpose:"",bindMaterialAs:"bindMaterialAs",coordSys:"coordSys",coordSys_MultipleApplyTemplate_Binding:"coordSys:__INSTANCE_NAME__:binding",displacement:"displacement",fallbackStrength:"fallbackStrength",full:"full",id:"id",infoId:"info:id",infoImplementationSource:"info:implementationSource",inputs:"inputs:",interfaceOnly:"interfaceOnly",materialBind:"materialBind",materialBinding:"material:binding",materialBindingCollection:"material:binding:collection",materialVariant:"materialVariant",outputs:"outputs:",outputsDisplacement:"outputs:displacement",outputsSurface:"outputs:surface",outputsVolume:"outputs:volume",preview:"preview",sdrMetadata:"sdrMetadata",sourceAsset:"sourceAsset",sourceCode:"sourceCode",strongerThanDescendants:"strongerThanDescendants",subIdentifier:"subIdentifier",surface:"surface",universalRenderContext:"",universalSourceType:"",volume:"volume",weakerThanDescendants:"weakerThanDescendants",ConnectableAPI:"ConnectableAPI",CoordSysAPI:"CoordSysAPI",Material:"Material",MaterialBindingAPI:"MaterialBindingAPI",NodeDefAPI:"NodeDefAPI",NodeGraph:"NodeGraph",Shader:"Shader"});class ce extends $e{static{o(this,"NodeDefAPI")}static typeName="NodeDefAPI";static get(e,t){return new ce(e.getPrim(t),e)}isValid(){return super.isValid()&&this.prim.hasAPI(ce.typeName)}static canApply(e){return e.canApplyAPI(ce.typeName)}static apply(e){return e.applyAPI(ce.typeName)?new ce(e,e.getStage()):new ce(void 0,e.getStage())}static getSchemaAttributeNames(e=!0){return e?["info:implementationSource","info:id"]:["info:implementationSource","info:id"]}getImplementationSourceAttr(){return this.prim.getAttr(je.infoImplementationSource)}createImplementationSourceAttr(e,t=!1){return this._createAttr(je.infoImplementationSource,"token",!1,"uniform",e,t)}getIdAttr(){return this.prim.getAttr(je.infoId)}createIdAttr(e,t=!1){return this._createAttr(je.infoId,"token",!1,"uniform",e,t)}setShaderId(e){return this.createImplementationSourceAttr("id",!0),this.getIdAttr().set(e),!0}getShaderId(){if(this.getImplementationSource()!=="id")return;const e=this.getIdAttr().get();return typeof e=="string"?e:void 0}setSourceAsset(e,t=""){return this.createImplementationSourceAttr("sourceAsset"),this._createAttr(ie("sourceAsset",t),"asset",!1,"uniform",e,!1),!0}getSourceAsset(e=""){return this.#e("sourceAsset","sourceAsset",e,t=>i=>qt(t.getAttr(ie("sourceAsset",i))?.getValue())??void 0)}setSourceCode(e,t=""){return this.createImplementationSourceAttr("sourceCode"),this._createAttr(ie("sourceCode",t),"string",!1,"uniform",e,!1),!0}getSourceCode(e=""){return this.#e("sourceCode","sourceCode",e,t=>i=>{const s=t.getAttr(ie("sourceCode",i))?.getValue();return typeof s=="string"?s:void 0})}setSourceAssetSubIdentifier(e,t=""){return this.createImplementationSourceAttr("sourceAsset"),this._createAttr(ie("sourceAsset:subIdentifier",t),"token",!1,"uniform",e,!1),!0}getSourceAssetSubIdentifier(e=""){return this.#e("sourceAsset","sourceAsset:subIdentifier",e,t=>i=>{const s=t.getAttr(ie("sourceAsset:subIdentifier",i))?.getValue();return typeof s=="string"?s:void 0})}#e(e,t,i,s){if(this.getImplementationSource()!==e)return;const n=this._stage.getPrim(this.path);if(!n)return;const a=s(n);if(n.getAttr(ie(t,i))?.isValid())return a(i);if(i!==""&&n.getAttr(ie(t,""))?.isValid())return a("")}getSourceTypes(){const e=this.getImplementationSource();if(e!=="sourceAsset"&&e!=="sourceCode")return[];const t=[];for(const i of this._prim.getPropertiesInNamespace("info")){const s=i.name;if(!s.endsWith(e))continue;const n=s.split(":").filter(Boolean);n.length===3&&t.push(n[1])}return t}getImplementationSource(){return ur(this._prim)}}function ur(r){const e=r.getAttr("info:implementationSource")?.getValue();return e==="id"||e==="sourceAsset"||e==="sourceCode"?e:(e!=null&&console.warn(`Found invalid info:implementationSource value '${String(e)}' on shader at path <${r.path}>. Falling back to 'id'.`),"id")}o(ur,"nodeDefImplementationSource");function qt(r){return r instanceof ct?r.getAssetPath():typeof r=="string"?r:r&&typeof r=="object"&&typeof r.path=="string"?r.path:null}o(qt,"assetPathValue");function ie(r,e){return e?`info:${e}:${r}`:`info:${r}`}o(ie,"sourceProperty");class ne extends Le{static{o(this,"Shader")}static typeName="Shader";static get(e,t){return new ne(e.getPrim(t),e)}static define(e,t){return new ne(e.definePrim(t,"Shader"),e)}isValid(){return super.isValid()&&this.prim.isA(ne.typeName)}static getSchemaAttributeNames(e=!0){return e?[]:[]}connectableAPI(){return new F(this._prim,this._stage)}createOutput(e,t="token"){return this.connectableAPI().createOutput(e,t)}getOutput(e){return this.connectableAPI().getOutput(e)}getOutputs(e=!0){return this.connectableAPI().getOutputs(e)}createInput(e,t){return this.connectableAPI().createInput(e,t)}getInput(e){return this.connectableAPI().getInput(e)}getInputs(e=!0){return this.connectableAPI().getInputs(e)}#e(){return new ce(this._prim,this._stage)}getIdAttr(){return this.#e().getIdAttr()}getImplementationSourceAttr(){return this.#e().getImplementationSourceAttr()}createIdAttr(e,t=!1){return this.#e().createIdAttr(e,t)}createImplementationSourceAttr(e,t=!1){return this.#e().createImplementationSourceAttr(e,t)}setShaderId(e){return this.#e().setShaderId(e)}getShaderId(){return this.#e().getShaderId()}setSourceAsset(e,t=""){return this.#e().setSourceAsset(e,t)}getSourceAsset(e=""){return this.#e().getSourceAsset(e)}setSourceCode(e,t=""){return this.#e().setSourceCode(e,t)}getSourceCode(e=""){return this.#e().getSourceCode(e)}setSourceAssetSubIdentifier(e,t=""){return this.#e().setSourceAssetSubIdentifier(e,t)}getSourceAssetSubIdentifier(e=""){return this.#e().getSourceAssetSubIdentifier(e)}getSourceTypes(){return this.#e().getSourceTypes()}getImplementationSource(){return this.#e().getImplementationSource()}getSdrMetadata(){const e=this._prim.getMetadata("sdrMetadata"),t={};if(e&&typeof e=="object")for(const[i,s]of Object.entries(e))t[i]=String(s);return t}getSdrMetadataByKey(e){const t=this._prim.getMetadataByDictKey("sdrMetadata",e);return t==null?"":String(t)}setSdrMetadata(e){for(const[t,i]of Object.entries(e))this.setSdrMetadataByKey(t,i)}setSdrMetadataByKey(e,t){this._prim.setMetadataByDictKey("sdrMetadata",e,t)}hasSdrMetadata(){return this._prim.getMetadata("sdrMetadata")!==void 0}hasSdrMetadataByKey(e){return this._prim.getMetadataByDictKey("sdrMetadata",e)!==void 0}clearSdrMetadata(){this._prim.clearMetadata("sdrMetadata")}clearSdrMetadataByKey(e){this._prim.clearMetadataByDictKey("sdrMetadata",e)}static is(e){return e.typeName===ne.typeName}static getImplementationSource(e){return ur(e)}static getSourceAsset(e,t){return qt(e.getAttr(ie("sourceAsset",t))?.getValue())}static getShaderId(e){const t=e.getAttr("info:id")?.getValue();return typeof t=="string"?t:""}static getInputValue(e,t,i){const s=e.getAttr(`inputs:${t}`);if(s)return i!==void 0?s.getValueAtTime(i):s.getValue()}}class Zs extends Kt{static{o(this,"ShaderConnectableAPIBehavior")}canConnectOutputToSource(e,t,i){return{canConnect:!1}}}sr(O.findByName("UsdShadeShader"),new Zs);class q{static{o(this,"SdrVersion")}major;minor;isDefault;constructor(e=0,t=0,i=!1){const s=typeof e=="string"?js(e):[e,t],[n,a]=s,u=n>=0&&a>=0&&(n!==0||a!==0);this.major=u?n:0,this.minor=u?a:0,this.isDefault=i}getAsDefault(){return new q(this.major,this.minor,!0)}isValid(){return this.major!==0||this.minor!==0}equals(e){return this.compare(e)===0}compare(e){return this.major===e.major?this.minor-e.minor:this.major-e.major}getString(){return this.isValid()?`${this.major}${this.minor?`.${this.minor}`:""}`:"<invalid version>"}getStringSuffix(){return this.isDefault?"":this.isValid()?`_${this.getString()}`:""}toString(){return this.getString()}}function js(r){const e=/^(\d+)(?:\.(\d+))?$/.exec(r);return e?[Number(e[1]),Number(e[2]??0)]:[0,0]}o(js,"parseVersion");const G={Role:"role",IsDynamicArray:"isDynamicArray",TupleSize:"tupleSize",Connectable:"connectable",IsAssetIdentifier:"__SDR__isAssetIdentifier",ImplementationName:"__SDR__implementationName",SdrUsdDefinitionType:"sdrUsdDefinitionType",DefaultInput:"__SDR__defaultinput"};function Ws(r){const e={};for(const[t,i]of Object.entries(r))switch(t){case G.IsDynamicArray:case G.Connectable:case G.IsAssetIdentifier:case G.DefaultInput:{const s=i.toLowerCase();e[t]=s==="0"||s==="false"||s==="f"?"0":"1";break}case G.TupleSize:{const s=Number.parseInt(i,10);e[t]=String(Number.isNaN(s)?0:s);break}default:e[t]=i}return e}o(Ws,"encodeLegacyPropertyMetadata");const xe=o((r,e)=>r[e]==="1","isTrueItem"),Qs={int:"int",string:"string",float:"float",color:"color3f",color4:"color4f",point:"point3f",normal:"normal3f",vector:"vector3f",matrix:"matrix4d"};class j{static{o(this,"SdrSdfTypeIndicator")}constructor(e="",t="",i=!0){this._sdfType=e,this._sdrType=t,this._hasSdfTypeMapping=i}getSdrType(){return this._sdrType}hasSdfType(){return this._hasSdfTypeMapping}getSdfType(){return this._sdfType}}function Js(r){const e=r[G.SdrUsdDefinitionType]??"";if(!e)return"";const t=Vi(e);return t?t.name:(Be.GetInstance().postWarning(`Invalid SdfValueTypeName or alias provided for sdrUsdDefinitionType metadata: ${e}`),"")}o(Js,"getSdrUsdDefinitionType");const Zt=o((r,e)=>r>0||xe(e,G.IsDynamicArray),"isArrayProperty");function lr(r,e){const t=Qs[r];return t!==void 0?new j(e?`${t}[]`:t,r):new j("token",r,!1)}o(lr,"getTypeIndicatorFromDefaultMapping");function en(r,e,t){const i=Zt(e,t);return xe(t,G.IsAssetIdentifier)?new j(i?"string[]":"string",r):r==="terminal"?new j("token",r,!1):r==="struct"?new j("string",r):r==="vstruct"?new j(i?"float[]":"float",r):lr(r,i)}o(en,"getTypeAsSdfTypeEncoding0");function tn(r,e,t){const i=Js(t);if(i)return new j(i,r);const s=Zt(e,t);return xe(t,G.IsAssetIdentifier)?new j(s?"asset[]":"asset",r):r==="terminal"||r==="struct"||r==="vstruct"?new j(s?"token[]":"token",r):(r==="int"||r==="float")&&e>=2&&e<=4?new j(`${r}${e}`,r):lr(r,s)}o(tn,"getTypeAsSdfTypeEncoding1");const rn=1;function sn(r,e,t,i){switch(i){case 0:return en(r,e,t);case 1:return tn(r,e,t);default:return new j("token",r,!1)}}o(sn,"getTypeAsSdfTypeForEncoding");function nn(r,e,t){const i=t[G.Role]==="none"?"none":"";if(r&&i==="none"){if(r==="color"||r==="point"||r==="normal"||r==="vector")return["float",3];if(r==="color4")return["float",4]}return[r,e]}o(nn,"convertSdrPropertyTypeAndArraySize");class an{static{o(this,"SdrShaderProperty")}constructor(e,t,i,s,n=0,a={},u="",c){this._name=e,this._defaultValue=i,this._isOutput=s,this._sourceCode=u,this._options=c,this._metadata=Ws(a);const[l,p]=nn(t.toLowerCase(),n,this._metadata);this._type=l,this._arraySize=p}_type;_arraySize;_metadata;_usdEncodingVersion=rn;getName(){return this._name}getType(){return this._type}isOutput(){return this._isOutput}getArraySize(){return this._arraySize}isArray(){return Zt(this._arraySize,this._metadata)}isDynamicArray(){return xe(this._metadata,G.IsDynamicArray)}getDefaultValue(){return this._defaultValue}getMetadata(){return{...this._metadata}}getMetadataByKey(e){return this._metadata[e]}isAssetIdentifier(){return xe(this._metadata,G.IsAssetIdentifier)}isDefaultInput(){return xe(this._metadata,G.DefaultInput)}isConnectable(){return this._isOutput||this._metadata[G.Connectable]!=="0"}getTypeAsSdfType(){return this.getTypeAsSdfTypeIndicator().getSdfType()}getTypeAsSdfTypeIndicator(){return sn(this._type,this._arraySize,this._metadata,this._usdEncodingVersion)}_setUsdEncodingVersion(e){this._usdEncodingVersion=e}_convertToVStruct(){this._type="vstruct"}getOptions(){return this._options?this._options.map(([e,t])=>[e,t]):(this._metadata.options??"").split("|").filter(Boolean).map(e=>{const t=e.indexOf("=");return t<0?[e,""]:[e.slice(0,t),e.slice(t+1)]})}getHelp(){return this._metadata.help??""}getLabel(){return this._metadata.label??""}getPage(){return this._metadata.page??""}getImplementationName(){return this._metadata[G.ImplementationName]??this._name}isVStructMember(){return"vstructMemberName"in this._metadata}isVStruct(){return this.getType()==="vstruct"}getVStructMemberOf(){return this._metadata.vstructMemberOf??""}getVStructMemberName(){return this._metadata.vstructMemberName??""}getShownIf(){return this._metadata.shownIf??cn(this._metadata)}}function on(r){const e=Number.parseInt(r,10);return Number.isNaN(e)?(Be.GetInstance().postWarning(`_LegacyStringToSdrUsdEncodingVersion: unable to parse int from given string '${r}', setting -1`),-1):e}o(on,"sdrUsdEncodingVersionFromLegacy");function cn(r){const e=o(t=>{const i=r[`${t}Op`];if(i==="and"||i==="or"){const c=e(r[`${t}Left`]??""),l=e(r[`${t}Right`]??"");return c&&l?`${c} ${i==="and"?"&&":"||"} ${l}`:""}const n=i?{greaterThanOrEqualTo:">=",greaterThan:">",lessThanOrEqualTo:"<=",lessThan:"<",equalTo:"==",notEqualTo:"!="}[i]:void 0,a=r[`${t}Path`]?.split("/").filter(Boolean).at(-1),u=r[`${t}Value`];return n&&a!==void 0&&u!==void 0?`${a} ${n} ${u}`:""},"operation");return e("conditionalVis")}o(cn,"shownIfFromConditional");class vt{static{o(this,"SdrShaderNode")}constructor(e,t,i,s,n,a,u,c,l=[],p={},h=""){this._identifier=e,this._version=t,this._name=i,this._function=s,this._context=n,this._sourceType=a,this._definitionURI=u,this._implementationURI=c,this._metadata=p,this._sourceCode=h;for(const m of l)(m.isOutput()?this._outputs:this._inputs).set(m.getName(),m);this._postProcessProperties(),this._initializePrimvars()}_inputs=new Map;_outputs=new Map;_usdEncodingVersion=-1;_postProcessProperties(){const t=this._metadata.sdrUsdEncodingVersion!==void 0?on(this._metadata.sdrUsdEncodingVersion):-1;this._usdEncodingVersion=t;const i=this.getAllVstructNames();for(const s of[...this._inputs.values(),...this._outputs.values()])t!==-1&&s._setUsdEncodingVersion(t),i.includes(s.getName())&&s._convertToVStruct()}_primvars=[];_primvarNamingProperties=[];_initializePrimvars(){const e=this._metadata.primvars,t=e?e.split("|"):[];for(const i of t)if(i.startsWith("$")){const s=i.replace(/^\$+/,""),n=this.getShaderInput(s);n&&n.getType()==="string"&&this._primvarNamingProperties.push(s)}else this._primvars.push(i)}getInfoString(){return`${this._identifier} (context: '${this._context}', version: '${this._version.getString()}', function: '${this._function}'); definition URI: '${this._definitionURI}'; implementation URI: '${this._implementationURI}'`}getLabel(){return this._metadata.label??""}getCategory(){return this._metadata.category??""}getDepartments(){const e=this._metadata.departments;return e?e.split("|"):[]}getPrimvars(){return[...this._primvars]}getAdditionalPrimvarProperties(){return[...this._primvarNamingProperties]}getAllVstructNames(){const e=new Set,t=o(i=>i.getMetadataByKey("tag")==="vstruct","hasVstructMetadata");for(const i of[this._inputs,this._outputs])for(const[s,n]of i){if(t(n)){e.add(s);continue}if(!n.isVStructMember())continue;const a=n.getVStructMemberOf();i.has(a)&&e.add(a)}return[...e]}isValid(){return this._inputs.size+this._outputs.size>0}getIdentifier(){return this._identifier}getShaderVersion(){return this._version}getName(){return this._name}getImplementationName(){return this._metadata.__SDR__implementationName??this._name}getFunction(){return this._function}getContext(){return this._context}getShadingSystem(){return this._sourceType}getSourceCode(){return this._sourceCode}getSourceType(){return this._sourceType}getResolvedDefinitionURI(){return this._definitionURI}getResolvedImplementationURI(){return this._implementationURI}getShaderInputNames(){return[...this._inputs.keys()]}getShaderOutputNames(){return[...this._outputs.keys()]}getShaderInput(e){return this._inputs.get(e)}getShaderOutput(e){return this._outputs.get(e)}getRole(){return this._metadata.role??this._name}getHelp(){return this._metadata.help??""}getAssetIdentifierInputNames(){return this.getShaderInputNames().filter(e=>this._inputs.get(e).isAssetIdentifier())}getDefaultInput(){return[...this._inputs.values()].find(e=>e.isDefaultInput())}getPages(){return[...new Set([...this._inputs.values(),...this._outputs.values()].map(e=>e.getPage()))]}getPropertyNamesForPage(e){return[...this._inputs.values(),...this._outputs.values()].filter(t=>t.getPage()===e).map(t=>t.getName())}getMetadata(){return{...this._metadata,sdrUsdEncodingVersion:String(this._usdEncodingVersion),domain:this._metadata.domain??"rendering"}}getDataForKey(e){const t={identifier:this._identifier,version:this._version,name:this._name,function:this._function,context:this._context,sourceType:this._sourceType,definitionURI:this._definitionURI,implementationURI:this._implementationURI};return e in t?t[e]:this._metadata[e]}}function un(r){const e=r.split("_").filter(Boolean);if(!e.length)return null;const t=e[0];if(e.length===1)return{function:r,name:r,version:new q};if(e.length===2)return/^\d+$/.test(e[1])?{function:t,name:t,version:new q(Number(e[1]))}:{function:t,name:r,version:new q};const i=/^\d+$/.test(e.at(-1)),s=/^\d+$/.test(e.at(-2));return s&&!i?null:s?{function:t,name:e.slice(0,-2).join("_"),version:new q(Number(e.at(-2)),Number(e.at(-1)))}:i?{function:t,name:e.slice(0,-1).join("_"),version:new q(Number(e.at(-1)))}:{function:t,name:r,version:new q}}o(un,"splitShaderIdentifier");class Di{static{o(this,"SdrShaderNodeQueryResult")}constructor(e,t,i){this.keys=e,this.values=t,this.nodes=i}getKeys(){return[...this.keys]}getValues(){return this.values.map(e=>[...e])}getStringifiedValues(){return this.values.map(e=>e.map(t=>t==null?"":String(t)))}getShaderNodesByValues(){return this.values.length===0?[]:this.nodes.map(e=>[...e])}getAllShaderNodes(){const e=o((t,i)=>t.getIdentifier()<i.getIdentifier()||t.getShadingSystem()<i.getShadingSystem(),"less");return this.nodes.flat().sort((t,i)=>e(t,i)?-1:e(i,t)?1:0)}}let dr;function ln(r){dr=r}o(ln,"_setDefaultQueryRunner");const We=o((r,e)=>r==null&&e==null?!0:Object.is(r,e),"valuesEqual");class dn{static{o(this,"SdrShaderNodeQuery")}constructor(e){this.runner=e}selectKeys=[];include=[];exclude=[];custom=[];selectDistinct(e){for(const t of typeof e=="string"?[e]:e)this.selectKeys.includes(t)||this.selectKeys.push(t);return this}nodeValueIs(e,t){return this.include.push(i=>We(i.getDataForKey(e),t)),this}nodeValueIsIn(e,t){return this.include.push(i=>t.some(s=>We(i.getDataForKey(e),s))),this}nodeHasValueFor(e){return this.include.push(t=>t.getDataForKey(e)!==void 0),this}nodeValueIsNot(e,t){return this.exclude.push(i=>We(i.getDataForKey(e),t)),this}nodeValueIsNotIn(e,t){return this.exclude.push(i=>t.some(s=>We(i.getDataForKey(e),s))),this}nodeHasNoValueFor(e){return this.exclude.push(t=>t.getDataForKey(e)!==void 0),this}customFilter(e){return this.custom.push(e),this}run(){const e=this.runner??dr;if(!e)throw new Error("query has no registry");return e(this)}}function pn(r,e){const t=e.filter(s=>r.include.every(n=>n(s))&&!r.exclude.some(n=>n(s))&&r.custom.every(n=>{const a=n(s);if(typeof a!="boolean")throw new TypeError("SdrShaderNodeQuery custom filters must return a boolean");return a}));if(!r.selectKeys.length)return new Di([],[],[t]);const i=new Map;for(const s of t){const n=r.selectKeys.map(c=>s.getDataForKey(c)),a=JSON.stringify(n),u=i.get(a);u?u.nodes.push(s):i.set(a,{values:n,nodes:[s]})}return new Di([...r.selectKeys],[...i.values()].map(s=>s.values),[...i.values()].map(s=>s.nodes))}o(pn,"runNodeQuery");const vi=O.declare("SdfAssetPath");function hn(r){switch(r){case"bool":return w.bool;case"int":return w.int;case"float":return w.float;case"double":return w.double;case"string":return w.string;case"token":return w.token;case"asset":return O.declare("SdfAssetPath");case"float2":case"texCoord2f":return w.GfVec2f;case"float3":case"color3f":case"normal3f":case"point3f":case"vector3f":return w.GfVec3f;case"float4":case"color4f":return w.GfVec4f;case"int2":return w.GfVec2i;case"int3":return w.GfVec3i;case"int4":return w.GfVec4i;case"matrix4d":return w.GfMatrix4d}}o(hn,"_TfTypeForSdfTypeName");function mn(r,e){const t=e.getArraySize();if(e.getType()!=="float"||t===0||!r.isArrayValued())return r;const i=[...r.Get()];if(i.length!==t)return r;switch(t){case 2:return M.create(new ve(i[0],i[1]),w.GfVec2f);case 3:return M.create(new Gt(i[0],i[1],i[2]),w.GfVec3f);case 4:return M.create(new Vt(i[0],i[1],i[2],i[3]),w.GfVec4f)}return r}o(mn,"_ConformSdrDefaultValue");function pr(r){const e=r.getDefaultValue();if(e instanceof M)return e;if(e==null)return M.getEmpty();const t=hn(r.getMetadataByKey("sdrUsdDefinitionType")??"");if(!t)return M.getEmpty();const i=typeof e=="object"&&e instanceof String?String(e):e;return M.create(i,t)}o(pr,"_ParsedDefaultValue");function ba(r){const e=pr(r);return e.IsEmpty()?e:mn(e,r)}o(ba,"SdrShaderPropertyGetDefaultValue");const fn={asset:"SdfAssetPath",timecode:"SdfTimeCode",pathExpression:"SdfPathExpression",opaque:"SdfOpaqueValue"};function hr(r){const e=Vi(r);if(!e)return;const t=e.scalarType??e,i=fn[t.type]??t.type;return O.declare(e.isArray?`${i}[]`:i)}o(hr,"sdfValueTypeNameGetType");const gn={GfVec2d:o(()=>new tt(0),"GfVec2d"),GfVec2f:o(()=>new ve(0),"GfVec2f"),GfVec2h:o(()=>new ps(0),"GfVec2h"),GfVec2i:o(()=>new Fi(0),"GfVec2i"),GfVec3d:o(()=>new E(0),"GfVec3d"),GfVec3f:o(()=>new Gt(0),"GfVec3f"),GfVec3h:o(()=>new ds(0),"GfVec3h"),GfVec3i:o(()=>new Li(0),"GfVec3i"),GfVec4d:o(()=>new ls(0),"GfVec4d"),GfVec4f:o(()=>new Vt(0),"GfVec4f"),GfVec4h:o(()=>new us(0),"GfVec4h"),GfVec4i:o(()=>new Gi(0),"GfVec4i"),GfMatrix2d:o(()=>new cs(1),"GfMatrix2d"),GfMatrix3d:o(()=>new os(1),"GfMatrix3d"),GfMatrix4d:o(()=>new x(1),"GfMatrix4d"),GfQuatd:o(()=>new as(1),"GfQuatd"),GfQuatf:o(()=>new ns(1),"GfQuatf"),GfQuath:o(()=>new ss(1),"GfQuath"),SdfAssetPath:o(()=>new ct(""),"SdfAssetPath")};function yn(r){if(!r)return M.getEmpty();const e=r.getTypeName();if(e.endsWith("[]"))return M.createArray(new ke([],O.declare(e.slice(0,-2))));const t=gn[e];return t?M.create(t(),r):e==="string"||e==="token"?M.create("",r):M.create(rs(r),r)}o(yn,"_SdfValueTypeNameGetDefaultValue");function Qe(r,e){return r.IsHolding(e)?r.Get():void 0}o(Qe,"_GetValue");function bn(r){const e=pr(r);if(e.IsEmpty())return e;const t=hr(r.getTypeAsSdfType());if(e.getType()===t)return e;if(t&&r.getMetadataByKey("sdrUsdDefinitionType")!==void 0){const a=e.castToTypeid(t);if(!a.IsEmpty())return a}const i=r.getType(),s=r.getArraySize(),n=r.isArray();if(i==="string"&&r.isAssetIdentifier()){if(n){const u=Qe(e,O.declare("string[]"))??[];return M.createArray(new ke([...u].map(c=>new ct(c)),vi))}const a=Qe(e,w.string)??"";return M.create(new ct(a),vi)}else if(i==="float"&&n){const a=[...Qe(e,O.declare("float[]"))??[]];if(a.length!==s)return e;switch(s){case 2:return M.create(new ve(a[0],a[1]),w.GfVec2f);case 3:return M.create(new Gt(a[0],a[1],a[2]),w.GfVec3f);case 4:return M.create(new Vt(a[0],a[1],a[2],a[3]),w.GfVec4f)}}else if(i==="int"&&n){const a=[...Qe(e,O.declare("int[]"))??[]];if(a.length!==s)return e;switch(s){case 2:return M.create(new Fi(a[0],a[1]),w.GfVec2i);case 3:return M.create(new Li(a[0],a[1],a[2]),w.GfVec3i);case 4:return M.create(new Gi(a[0],a[1],a[2],a[3]),w.GfVec4i)}}return yn(t)}o(bn,"SdrShaderPropertyGetDefaultValueAsSdfType");function Ai(r){return r.getShadingSystem?.()??r.getSourceType?.()??""}o(Ai,"parserShadingSystem");const nt=O.define("SdrDiscoveryPlugin"),at=O.define("SdrParserPlugin");function Dn(r,e){const t=O.define(r,[nt]);return t.setFactory({new:o(()=>new e,"new")}),Fe++,t}o(Dn,"SdrRegisterDiscoveryPlugin");function mr(r,e){const t=O.define(r,[at]);return t.setFactory({new:o(()=>new e,"new")}),Fe++,t}o(mr,"SdrRegisterParserPlugin");const vn=new Ut("PXR_SDR_SKIP_DISCOVERY_PLUGIN_DISCOVERY",!1,"The auto-discovery of discovery plugins in sdr can be skipped. This is used mostly for testing purposes."),An=new Ut("PXR_SDR_SKIP_PARSER_PLUGIN_DISCOVERY",!1,"The auto-discovery of parser plugins in sdr can be skipped. This is used mostly for testing purposes."),Pn=new Ut("PXR_SDR_DISABLE_PLUGINS","","Comma separated list of Sdr plugins to disable.  Note that disabling plugins may cause shaders in your scenes to malfunction.");let Fe=0;V.GetInstance().addDidRegisterPluginsListener(()=>{Fe++});function Pi(){return new Set(String(Ct(Pn)).split(",").filter(r=>r!==""))}o(Pi,"_disabledPlugins");function xi(r,e){const t=V.GetInstance();return[...new Set(V.getAllDerivedTypes(r))].filter(i=>!e.has(i)).filter(i=>{const s=t.getPluginForType(i);return(!s||s.isLoaded())&&i.getFactory()!==void 0}).sort(fr)}o(xi,"_instantiableTypes");function fr(r,e){return r.getTypeName()<e.getTypeName()?-1:r.getTypeName()>e.getTypeName()?1:0}o(fr,"_byTypeName");const Ii=new WeakMap;function Re(r){Be.GetInstance().postError(new ft(r,gt.CodingError))}o(Re,"_postCodingError");class jt{static{o(this,"SdrRegistry")}static instance;static getInstance(){return this.instance??=new jt}_results=[];_resultsByIdentifier=new Map;_resultsByName=new Map;_resultKeys=new Set;nodes=new Map;_parsers=new Map;_searchUris=new Set;get results(){return this._FindAndInstantiatePlugins(),this._results}get parsers(){return this._FindAndInstantiatePlugins(),this._parsers}get searchUris(){return this._FindAndInstantiatePlugins(),this._searchUris}instantiatedPluginTypes=new Set;pluginTypesGeneration=-1;constructor(){}_FindAndInstantiatePlugins(){this.pluginTypesGeneration!==Fe&&(this.pluginTypesGeneration=Fe,this._FindAndInstantiateParserPlugins(),this._RunDiscoveryPlugins(this._FindAndInstantiateDiscoveryPlugins()))}_FindAndInstantiateDiscoveryPlugins(){if(Ct(vn))return[];const e=Pi(),t=[];for(const i of xi(nt,this.instantiatedPluginTypes)){if(this.instantiatedPluginTypes.add(i),e.has(i.getTypeName()))continue;const s=i.getFactory();s&&t.push(s.new())}return t}_FindAndInstantiateParserPlugins(){if(Ct(An))return;const e=xi(at,this.instantiatedPluginTypes);for(const t of e)this.instantiatedPluginTypes.add(t);this._InstantiateParserPlugins(e)}_InstantiateParserPlugins(e){const t=Pi(),i=[...e].sort(fr);for(const s of i){if(t.has(s.getTypeName()))continue;const n=s.getFactory();if(!n){Re("Failed verification: ' pluginFactory '");continue}const a=n.new();Ii.set(a,s);for(const u of a.getDiscoveryTypes?.()??[]){const c=this._parsers.get(u);if(c){Re(`Plugin type ${s.getTypeName()} claims discovery type '${u}' but that's already claimed by type ${Ii.get(c)?.getTypeName()??""}`);continue}this._parsers.set(u,a)}}}_RunDiscoveryPlugins(e){for(const t of e){for(const i of t.getSearchURIs?.()??[])this.searchUris.add(i);for(const i of t.discoverShaderNodes())this.addDiscoveryResult(i)}}setExtraDiscoveryPlugins(e){if(this._FindAndInstantiatePlugins(),!e.every(s=>s instanceof O)){this._RunDiscoveryPlugins(e);return}const t=new Set;for(const s of e){if(!s.isA(nt)){Re(`Failed verification: ' type.IsA(discoveryPluginType) ' -- Type ${s.getTypeName()} is not a ${nt.getTypeName()}`);return}t.add(s)}const i=[];for(const s of t){const n=s.getFactory();n?i.push(n.new()):Re("Failed verification: ' pluginFactory '")}this._RunDiscoveryPlugins(i)}setExtraParserPlugins(e){if(this._FindAndInstantiatePlugins(),Array.isArray(e)&&e.length>0&&e.every(i=>i instanceof O)){const i=new Set;for(const s of e){if(!s.isA(at)){Re(`Failed verification: ' type.IsA(parserPluginType) ' -- Type ${s.getTypeName()} is not a ${at.getTypeName()}`);return}i.add(s)}this._InstantiateParserPlugins(i);return}const t=Array.isArray(e)?e:Object.entries(e);for(const[i,s]of t)this._parsers.set(i,s)}addDiscoveryResult(e){const t=this.results,i=`${e.identifier}\0${e.sourceType}`;if(this._resultKeys.has(i))return;this._resultKeys.add(i),t.push(e);let s=this._resultsByIdentifier.get(e.identifier);s||this._resultsByIdentifier.set(e.identifier,s=[]),s.push(e);let n=this._resultsByName.get(e.name);n||this._resultsByName.set(e.name,n=[]),n.push(e)}getSearchURIs(){return[...this.searchUris]}getShaderNodeIdentifiers(e="",t="defaultOnly"){return this.results.filter(i=>(!e||i.function===e)&&(t==="allVersions"||i.version.isDefault)).map(i=>i.identifier).filter((i,s,n)=>n.indexOf(i)===s).sort()}getShaderNodeNames(e=""){return[...new Set(this.results.filter(t=>!e||t.function===e).map(t=>t.name))].sort()}getAllShaderNodeSourceTypes(){return[...new Set(this.results.map(e=>e.sourceType))].sort()}getShaderNodeByIdentifier(e,t=[]){if(t.length){for(const i of t){const s=this.getShaderNodeByIdentifierAndSystem(e,i);if(s)return s}return}return this._firstNodeFor(i=>i.identifier===e,this._identified(e))}getShaderNodeByIdentifierAndSystem(e,t){return this.getShaderNodeByIdentifierAndType(e,t)}getShaderNodeByIdentifierAndType(e,t){return this._firstNodeFor(i=>i.sourceType===t,this._identified(e))}getShaderNodeByName(e,t=[],i="defaultOnly"){if(typeof t=="string"&&(i=t,t=[]),t.length){for(const s of t){const n=this.getShaderNodeByNameAndType(e,s,i);if(n)return n}return}return this._firstNodeFor(s=>i==="allVersions"||s.version.isDefault,this._named(e))}getShaderNodeByNameAndSystem(e,t,i="defaultOnly"){return this.getShaderNodeByNameAndType(e,t,i)}getAllShaderNodeShadingSystems(){return this.getAllShaderNodeSourceTypes()}getShaderNodesByIdentifier(e){return this._nodesFor(()=>!0,this._identified(e))}getShaderNodesByName(e,t="defaultOnly"){return this._nodesFor(i=>t==="allVersions"||i.version.isDefault,this._named(e))}getShaderNodesByFunction(e="",t="defaultOnly"){return this._nodesFor(i=>(!e||i.function===e)&&(t==="allVersions"||i.version.isDefault))}getShaderNodesByFamily(e="",t="defaultOnly"){return this.getShaderNodesByFunction(e,t)}getShaderNodeFromAsset(e,t={},i="",s=""){const n=e.getResolvedPath()===""?e.getAssetPath():e.getResolvedPath(),a=In(n),u=this.parsers.get(a);if(!u)return;const c=_n(e,t,i,s),l=s!==""?s:Ai(u),p=this.getShaderNodeByIdentifierAndSystem(c,s);if(p)return p;const h={identifier:c,version:new q,name:n.slice(n.lastIndexOf("/")+1),function:"",discoveryType:a,sourceType:l,uri:e.getAssetPath(),resolvedUri:n,sourceCode:"",metadata:t,blindData:"",subIdentifier:i},m=u.parseShaderNode(h);if(!(!m||!Si(m,h)))return this.addDiscoveryResult(h),this.nodes.set(`${h.identifier}\0${h.sourceType}`,m),m}getShaderNodeByNameAndType(e,t,i="defaultOnly"){return this._firstNodeFor(s=>s.sourceType===t&&(i==="allVersions"||s.version.isDefault),this._named(e))}getAllShaderNodes(){return this._nodesFor(()=>!0)}getShaderNodeFromSourceCode(e,t,i={}){let s;for(const p of this.parsers.values())Ai(p)===t&&(s=p);if(!s)return;let n=Lr(e);for(const[p,h]of Object.entries(i))n=Nt(n,p,h);const a=n.toString(),u=this.getShaderNodeByIdentifierAndType(a,t);if(u)return u;const c={identifier:a,version:new q,name:a,function:"",discoveryType:t,sourceType:t,uri:"",resolvedUri:"",sourceCode:e,metadata:i},l=s.parseShaderNode(c);if(!(!l||l.isValid()&&(l.getIdentifier()!==a||l.getName()!==a||!l.getShaderVersion().equals(c.version)||l.getFunction()!==""||l.getShadingSystem()!==t)))return this.addDiscoveryResult(c),this.nodes.set(`${a}\0${t}`,l),l}createQuery(){return new dn(e=>this.runQuery(e))}runQuery(e){return pn(e,this.getAllShaderNodes())}_firstNodeFor(e,t=this.results){for(const i of t){if(!e(i))continue;const s=this._findOrParseNode(i);if(s)return s}}_nodesFor(e,t=this.results){const i=[];for(const s of t){if(!e(s))continue;const n=this._findOrParseNode(s);n&&i.push(n)}return i}_identified(e){return this._FindAndInstantiatePlugins(),this._resultsByIdentifier.get(e)??[]}_named(e){return this._FindAndInstantiatePlugins(),this._resultsByName.get(e)??[]}_findOrParseNode(e){const t=`${e.identifier}\0${e.sourceType}`,i=this.nodes.get(t);if(i)return i;const s=this.parsers.get(e.discoveryType);if(!s)return;const n=s.parseShaderNode(e);if(n&&Si(n,e)){for(const a of n.getShaderInputNames())_i(n,n.getShaderInput(a));for(const a of n.getShaderOutputNames())_i(n,n.getShaderOutput(a));return this.nodes.set(t,n),n}}}function xn(r,e,t){const i=bn(e),s=e.getTypeAsSdfType();if(!i.IsEmpty()){const n=hr(s);if(i.getType()!==n)return t&&(t.value=`Default value type does not match specified type for property.
Node identifier: ${r.getIdentifier()}
Shading system: ${r.getShadingSystem()}
Property name: ${e.getName()}.
Type from SdfType: ${n?.getTypeName()??""}.
Type from default value: ${i.getTypeName()}.
`),!1}return!0}o(xn,"SdrRegistry_ValidateProperty");function _i(r,e){const t={value:""};return xn(r,e,t)||Be.GetInstance().postWarning(t.value),!0}o(_i,"validateProperty");function Si(r,e){return!(r.isValid()&&(r.getIdentifier()!==e.identifier||r.getName()!==e.name||!r.getShaderVersion().equals(e.version)||r.getFunction()!==e.function||r.getShadingSystem()!==e.sourceType))}o(Si,"validNode");function In(r){const e=r.slice(r.lastIndexOf("/")+1),t=e.lastIndexOf(".");return t<0?"":e.slice(t+1)}o(In,"extensionOf$1");function _n(r,e,t,i){let s=Nt(r.getAssetPath(),r.getResolvedPath());for(const n of Object.keys(e).sort())s=Nt(s,n,e[n]);return`${s}<${t}><${i}>`}o(_n,"identifierForAsset");ln(r=>jt.getInstance().runQuery(r));function Ti(r,e){return e==null?e:r==="bool"&&typeof e=="boolean"?e?1:0:r==="bool[]"&&Array.isArray(e)?e.map(t=>typeof t=="boolean"?t?1:0:t):e}o(Ti,"conformDefaultValue");function Sn(r){return r!=null&&typeof r=="object"&&typeof r.length=="number"?r.length:0}o(Sn,"arraySizeOf");function Tn(r){return(r.renderType??"").startsWith("terminal")}o(Tn,"isPropertyATerminal");function gr(r,e,t,i){const s=o(()=>i?Sn(t):0,"size");if(Tn(e))return{type:"Terminal",arraySize:s(),defaultValue:t};switch(r){case"int":case"int[]":case"bool":case"bool[]":return t=Ti(r,t),{type:"Int",arraySize:s(),defaultValue:t};case"int2":case"int2[]":return{type:"Int",arraySize:2,defaultValue:t};case"int3":case"int3[]":return{type:"Int",arraySize:3,defaultValue:t};case"int4":case"int4[]":return{type:"Int",arraySize:4,defaultValue:t};case"string":case"token":case"asset":case"string[]":case"token[]":case"asset[]":return t=Ti(r,t),{type:"String",arraySize:s(),defaultValue:t};case"float":case"float[]":return{type:"Float",arraySize:s(),defaultValue:t};case"float2":case"float2[]":return{type:"Float",arraySize:2,defaultValue:t};case"float3":case"float3[]":return{type:"Float",arraySize:3,defaultValue:t};case"float4":case"float4[]":return{type:"Float",arraySize:4,defaultValue:t};case"color3f":case"color3f[]":return{type:"Color",arraySize:s(),defaultValue:t};case"color4f":case"color4f[]":return{type:"Color4",arraySize:s(),defaultValue:t};case"point3f":case"point3f[]":return{type:"Point",arraySize:s(),defaultValue:t};case"vector3f":case"vector3f[]":return{type:"Vector",arraySize:s(),defaultValue:t};case"normal3f":case"normal3f[]":return{type:"Normal",arraySize:s(),defaultValue:t};case"matrix4d":case"matrix4d[]":return{type:"Matrix",arraySize:s(),defaultValue:t};default:return console.error(`Shader property has unsupported type '${r}'`),{type:"Unknown",arraySize:0,defaultValue:t}}}o(gr,"shaderPropertyTypeAndArraySize");function wn(r){return(r===""?[]:r.split("|")).map(e=>{const t=e.indexOf(":");return t<0?[e,""]:[e.slice(0,t),e.slice(t+1)]})}o(wn,"optionVecVal");function yr(r){return r.getRootLayer().filePath}o(yr,"_shaderDefRootLayerPath");function Bn(r){const e=r.slice(r.lastIndexOf("/")+1),t=e.lastIndexOf(".");return t<0?"":e.slice(t+1)}o(Bn,"extensionOf");function br(r,e){const t=Fr(yr(r),e);return!$r()||Hr(t)?t:""}o(br,"_shaderDefResolveSourceAsset");function Je(r){const e=r.getMetadata("sdrMetadata"),t={};if(e&&typeof e=="object")for(const[i,s]of Object.entries(e))t[i]=String(s);return t}o(Je,"sdrMetadataOf");function wi(r,e,t,i){const s=r.getAttr(),n=s.typeName,a={...i};(n==="asset"||n==="asset[]")&&(a.__SDR__isAssetIdentifier="1");let u=[];if(i.options!==void 0&&(u=wn(i.options)),u.length===0){const m=s.getMetadata("allowedTokens");if(Array.isArray(m))for(const g of m)u.push([String(g),""])}a.sdrUsdDefinitionType=n;const c=n.endsWith("[]"),{type:l,arraySize:p,defaultValue:h}=gr(n,i,t,c);return new an(r.getBaseName(),l,h,e,p,a,"",u)}o(wi,"createSdrShaderProperty");function Bi(r,e){if(r instanceof F)return new F(r.prim,r.stage);const t=r.getPrim(e);return t?new F(t):void 0}o(Bi,"connectableOf");const At={getDiscoveryResults(r,e,t){const i=r instanceof ne?r:new ne(r.getPrim(e),r),s=r instanceof ne?e:t,n=[];if(!i.prim||i.getImplementationSource()!=="sourceAsset")return n;const a=i.prim,u=a.path.slice(a.path.lastIndexOf("/")+1),c=un(u);if(!c)return n;const l=a.getAuthoredPropertyNames(h=>h.startsWith("info:")&&h.endsWith(":sourceAsset")),p=Bn(s);for(const h of l){const m=a.getAttr(h);if(!m?.isValid()||m.isRelationship)continue;const g=qt(m.getValue());if(!g)continue;const D=h.split(":");if(D.length!==3)continue;if(br(a.getStage(),g)){const v=D[1];n.push({identifier:u,version:c.version.getAsDefault(),name:c.name,function:c.function,discoveryType:p,sourceType:v,uri:s,resolvedUri:s})}else console.warn(`Unable to resolve info:sourceAsset <${m.getPath()}> with value @${g}@.`)}return n},getPrimvarNamesMetadataString(r,e,t){const i=typeof r=="string"?r:r.primvars??"",s=i?[i]:[],n=Bi(e,t);for(const a of n?.getInputs(!1)??[])Je(a.getAttr()).primvarProperty!==void 0&&(gr(a.getTypeName(),Je(a.getAttr()),void 0,!1).type!=="String"&&console.warn(`Shader input <${a.getAttr().getPath()}> is tagged as a primvarProperty, but isn't string-valued.`),s.push(`$${a.getBaseName()}`));return s.join("|")},getProperties(r,e){const t=[],i=Bi(r,e);if(!i)return t;for(const s of i.getInputs(!1)){const n=s.getAttr().getValue(),a=Je(s.getAttr());a.defaultInput!==void 0&&(a.__SDR__defaultinput="1",delete a.defaultInput),a.connectable=s.getConnectability()==="interfaceOnly"?"0":"1",a.implementationName!==void 0&&(a.__SDR__implementationName=a.implementationName,delete a.implementationName),t.push(wi(s,!1,n,a))}for(const s of i.getOutputs(!1)){const n=Je(s.getAttr());n.implementationName!==void 0&&(n.__SDR__implementationName=n.implementationName,delete n.implementationName),t.push(wi(s,!0,void 0,n))}return t}};function Ue(r){return new vt(r.identifier,r.version,r.name,r.function,"unknown discovery type","unknown shading system",r.resolvedUri,r.resolvedUri,[])}o(Ue,"invalidShaderNode");function kn(r,e){const t={...e.metadata??{}};for(const[s,n]of Object.entries(r.getSdrMetadata()))s in t||(t[s]=n);const i=At.getPrimvarNamesMetadataString(t,r.connectableAPI());return i&&(t.primvars=i),t.context=e.discoveryType,t}o(kn,"sdrMetadataFor");class mt{static{o(this,"ShaderDefParserPlugin")}constructor(e){this.stage=e,e&&mt._stagesByUri.set(yr(e),e)}static _stagesByUri=new Map;getDiscoveryTypes(){return["usda","usdc","usd"]}getShadingSystem(){return""}parseShaderNode(e,t){const i=t??e,s=i.resolvedUri,n=t?e:mt._stagesByUri.get(s)??this.stage;if(!n)return Ue(i);let a;for(const h of[i.identifier,i.subIdentifier??""])if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(h)&&(a=n.getPrim(`/${h}`),a))break;if(!a)return Ue(i);const u=new ne(a,n);if(!u.isValid())return Ue(i);const c=u.getSourceAsset(i.sourceType);if(c===void 0)return Ue(i);const l=br(n,c);if(!l)return console.error(`Unable to resolve path @${c}@ in shader definition file '${s}'`),Ue(i);const p=kn(u,i);return new vt(i.identifier,i.version,i.name,i.function,p.context??"",i.sourceType,s,l,At.getProperties(u.connectableAPI()),p,i.sourceCode??"")}}mr("UsdShadeShaderDefParserPlugin",mt);const Dr="<UDIM>",Wt=1001,Qt=1100,Cn=4;function we(r){for(const e of[Dr]){const t=r.indexOf(e);if(t>=0)return[r.slice(0,t),r.slice(t+e.length)]}return["",""]}o(we,"splitUdimPattern");async function ki(r,e,t){const i=[],[s,n]=we(r);if(!s&&!n)return i;const a=qr();for(let u=Wt;u<=Qt;u++){const c=String(u);let l=s+c+n;if(e&&(l=e.resolveAsset(l)),l=(await a.resolve(l)).toString(),l&&(i.push([l,c]),t))break}return i}o(ki,"resolveUdimPaths");function Nn(r,e,t){const i=[],[s,n]=we(r);if(!s&&!n)return i;for(let a=Wt;a<=Qt;a++){const u=String(a);let c=s+u+n;if(e&&(c=e.resolveAsset(c)),c=Yr(c).toString(),c){i.push([c,u]);break}}return i}o(Nn,"resolveUdimPathsSync");function Ci(r,e){if(e.length===0)return"";let t="",i=e[0][0];Xr(i)&&([t,i]=Kr(i));const s=we(r)[1];if(!i.endsWith(s))return console.warn(`Resolution of first udim tile gave ambigious result. First tile for '${r}' is '${i}'.`),"";const n=i.length-s.length-Cn;return i=i.slice(0,n)+Dr+s,t?zr([t,i]):i}o(Ci,"udimPathFromFirstTile");Zr((r,e,t)=>{const[i,s]=we(r);if(!(!i&&!s))return(async()=>{for(let n=Wt;n<=Qt;n++){let a=i+String(n)+s;if(e&&(a=e(a)),(await jr(a,t)).toString())break}})()});const Da={isUdimIdentifier(r){const[e,t]=we(r);return!(!e&&!t)},resolveUdimTilePaths(r,e){return ki(r,e,!1)},async resolveUdimPath(r,e){return Ci(r,await ki(r,e,!0))},resolveUdimPathSync(r,e){return Ci(r,Nn(r,e))},replaceUdimPattern(r,e){const[t,i]=we(r);return!t&&!i?r:t+e+i}},Mn={Plugins:[{Info:{SdfMetadata:{weight:{appliesTo:["attributes"],default:0,displayGroup:"BlendShape",documentation:"The weight value at which an inbeteen shape is applied.",type:"float"}},Types:{UsdSkelAnimation:{alias:{UsdSchemaBase:"SkelAnimation"},autoGenerated:!0,bases:["UsdTyped"],schemaIdentifier:"SkelAnimation",schemaKind:"concreteTyped"},UsdSkelBindingAPI:{alias:{UsdSchemaBase:"SkelBindingAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"SkelBindingAPI",schemaKind:"singleApplyAPI"},UsdSkelBlendShape:{alias:{UsdSchemaBase:"BlendShape"},autoGenerated:!0,bases:["UsdTyped"],schemaIdentifier:"BlendShape",schemaKind:"concreteTyped"},UsdSkelRoot:{alias:{UsdSchemaBase:"SkelRoot"},autoGenerated:!0,bases:["UsdGeomBoundable"],implementsComputeExtent:!0,schemaIdentifier:"SkelRoot",schemaKind:"concreteTyped"},UsdSkelSkeleton:{alias:{UsdSchemaBase:"Skeleton"},autoGenerated:!0,bases:["UsdGeomBoundable"],implementsComputeExtent:!0,schemaIdentifier:"Skeleton",schemaKind:"concreteTyped"}}},LibraryPath:"@PLUG_INFO_LIBRARY_PATH@",Name:"usdSkel",ResourcePath:"@PLUG_INFO_RESOURCE_PATH@",Root:"@PLUG_INFO_ROOT@",Type:"library"}]},On=`#usda 1.0
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

`;V.GetInstance().RegisterPlugins(Mn,{usdSkel:{"generatedSchema.usda":On}});const En={Plugins:[{Info:{Types:{UsdLuxBoundableLightBase:{alias:{UsdSchemaBase:"BoundableLightBase"},autoGenerated:!0,bases:["UsdGeomBoundable"],schemaIdentifier:"BoundableLightBase",schemaKind:"abstractTyped"},UsdLuxCylinderLight:{alias:{UsdSchemaBase:"CylinderLight"},autoGenerated:!0,bases:["UsdLuxBoundableLightBase"],implementsComputeExtent:!0,schemaIdentifier:"CylinderLight",schemaKind:"concreteTyped"},UsdLuxDiskLight:{alias:{UsdSchemaBase:"DiskLight"},autoGenerated:!0,bases:["UsdLuxBoundableLightBase"],implementsComputeExtent:!0,schemaIdentifier:"DiskLight",schemaKind:"concreteTyped"},UsdLuxDistantLight:{alias:{UsdSchemaBase:"DistantLight"},autoGenerated:!0,bases:["UsdLuxNonboundableLightBase"],schemaIdentifier:"DistantLight",schemaKind:"concreteTyped"},UsdLuxDomeLight:{alias:{UsdSchemaBase:"DomeLight"},autoGenerated:!0,bases:["UsdLuxNonboundableLightBase"],schemaIdentifier:"DomeLight",schemaKind:"concreteTyped"},UsdLuxDomeLight_1:{alias:{UsdSchemaBase:"DomeLight_1"},autoGenerated:!0,bases:["UsdLuxNonboundableLightBase"],schemaIdentifier:"DomeLight_1",schemaKind:"concreteTyped"},UsdLuxGeometryLight:{alias:{UsdSchemaBase:"GeometryLight"},autoGenerated:!0,bases:["UsdLuxNonboundableLightBase"],schemaIdentifier:"GeometryLight",schemaKind:"concreteTyped"},UsdLuxLightAPI:{alias:{UsdSchemaBase:"LightAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],providesUsdShadeConnectableAPIBehavior:!0,schemaIdentifier:"LightAPI",schemaKind:"singleApplyAPI"},UsdLuxLightFilter:{alias:{UsdSchemaBase:"LightFilter"},autoGenerated:!0,bases:["UsdGeomXformable"],providesUsdShadeConnectableAPIBehavior:!0,schemaIdentifier:"LightFilter",schemaKind:"concreteTyped"},UsdLuxLightListAPI:{alias:{UsdSchemaBase:"LightListAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"LightListAPI",schemaKind:"singleApplyAPI"},UsdLuxListAPI:{alias:{UsdSchemaBase:"ListAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ListAPI",schemaKind:"singleApplyAPI"},UsdLuxMeshLightAPI:{alias:{UsdSchemaBase:"MeshLightAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"MeshLightAPI",schemaKind:"singleApplyAPI"},UsdLuxNonboundableLightBase:{alias:{UsdSchemaBase:"NonboundableLightBase"},autoGenerated:!0,bases:["UsdGeomXformable"],schemaIdentifier:"NonboundableLightBase",schemaKind:"abstractTyped"},UsdLuxPluginLight:{alias:{UsdSchemaBase:"PluginLight"},autoGenerated:!0,bases:["UsdGeomXformable"],schemaIdentifier:"PluginLight",schemaKind:"concreteTyped"},UsdLuxPluginLightFilter:{alias:{UsdSchemaBase:"PluginLightFilter"},autoGenerated:!0,bases:["UsdLuxLightFilter"],schemaIdentifier:"PluginLightFilter",schemaKind:"concreteTyped"},UsdLuxPortalLight:{alias:{UsdSchemaBase:"PortalLight"},autoGenerated:!0,bases:["UsdLuxBoundableLightBase"],implementsComputeExtent:!0,schemaIdentifier:"PortalLight",schemaKind:"concreteTyped"},UsdLuxRectLight:{alias:{UsdSchemaBase:"RectLight"},autoGenerated:!0,bases:["UsdLuxBoundableLightBase"],implementsComputeExtent:!0,schemaIdentifier:"RectLight",schemaKind:"concreteTyped"},UsdLuxShadowAPI:{alias:{UsdSchemaBase:"ShadowAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ShadowAPI",schemaKind:"singleApplyAPI"},UsdLuxShapingAPI:{alias:{UsdSchemaBase:"ShapingAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ShapingAPI",schemaKind:"singleApplyAPI"},UsdLuxSphereLight:{alias:{UsdSchemaBase:"SphereLight"},autoGenerated:!0,bases:["UsdLuxBoundableLightBase"],implementsComputeExtent:!0,schemaIdentifier:"SphereLight",schemaKind:"concreteTyped"},UsdLuxVolumeLightAPI:{alias:{UsdSchemaBase:"VolumeLightAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"VolumeLightAPI",schemaKind:"singleApplyAPI"},UsdLux_DiscoveryPlugin:{bases:["SdrDiscoveryPlugin"]},UsdLux_LightDefParserPlugin:{bases:["SdrParserPlugin"]}}},LibraryPath:"@PLUG_INFO_LIBRARY_PATH@",Name:"usdLux",ResourcePath:"@PLUG_INFO_RESOURCE_PATH@",Root:"@PLUG_INFO_ROOT@",Type:"library"}]},vr=`#usda 1.0
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

`;V.GetInstance().RegisterPlugins(En,{usdLux:{"generatedSchema.usda":vr}});const f=Object.freeze({angular:"angular",automatic:"automatic",collectionFilterLinkIncludeRoot:"collection:filterLink:includeRoot",collectionLightLinkIncludeRoot:"collection:lightLink:includeRoot",collectionShadowLinkIncludeRoot:"collection:shadowLink:includeRoot",consumeAndContinue:"consumeAndContinue",consumeAndHalt:"consumeAndHalt",cubeMapVerticalCross:"cubeMapVerticalCross",filterLink:"filterLink",geometry:"geometry",guideRadius:"guideRadius",ignore:"ignore",independent:"independent",inputsAngle:"inputs:angle",inputsColor:"inputs:color",inputsColorTemperature:"inputs:colorTemperature",inputsDiffuse:"inputs:diffuse",inputsEnableColorTemperature:"inputs:enableColorTemperature",inputsExposure:"inputs:exposure",inputsHeight:"inputs:height",inputsIntensity:"inputs:intensity",inputsLength:"inputs:length",inputsNormalize:"inputs:normalize",inputsRadius:"inputs:radius",inputsShadowColor:"inputs:shadow:color",inputsShadowDistance:"inputs:shadow:distance",inputsShadowEnable:"inputs:shadow:enable",inputsShadowFalloff:"inputs:shadow:falloff",inputsShadowFalloffGamma:"inputs:shadow:falloffGamma",inputsShapingConeAngle:"inputs:shaping:cone:angle",inputsShapingConeSoftness:"inputs:shaping:cone:softness",inputsShapingFocus:"inputs:shaping:focus",inputsShapingFocusTint:"inputs:shaping:focusTint",inputsShapingIesAngleScale:"inputs:shaping:ies:angleScale",inputsShapingIesFile:"inputs:shaping:ies:file",inputsShapingIesNormalize:"inputs:shaping:ies:normalize",inputsSpecular:"inputs:specular",inputsTextureFile:"inputs:texture:file",inputsTextureFormat:"inputs:texture:format",inputsWidth:"inputs:width",latlong:"latlong",lightFilters:"light:filters",lightFilterShaderId:"lightFilter:shaderId",lightLink:"lightLink",lightList:"lightList",lightListCacheBehavior:"lightList:cacheBehavior",lightMaterialSyncMode:"light:materialSyncMode",lightShaderId:"light:shaderId",materialGlowTintsLight:"materialGlowTintsLight",MeshLight:"MeshLight",mirroredBall:"mirroredBall",noMaterialResponse:"noMaterialResponse",orientToStageUpAxis:"orientToStageUpAxis",poleAxis:"poleAxis",portals:"portals",scene:"scene",shadowLink:"shadowLink",treatAsLine:"treatAsLine",treatAsPoint:"treatAsPoint",VolumeLight:"VolumeLight",Y:"Y",Z:"Z",BoundableLightBase:"BoundableLightBase",CylinderLight:"CylinderLight",DiskLight:"DiskLight",DistantLight:"DistantLight",DomeLight:"DomeLight",DomeLight_1:"DomeLight_1",GeometryLight:"GeometryLight",LightAPI:"LightAPI",LightFilter:"LightFilter",LightListAPI:"LightListAPI",ListAPI:"ListAPI",MeshLightAPI:"MeshLightAPI",NonboundableLightBase:"NonboundableLightBase",PluginLight:"PluginLight",PluginLightFilter:"PluginLightFilter",PortalLight:"PortalLight",RectLight:"RectLight",ShadowAPI:"ShadowAPI",ShapingAPI:"ShapingAPI",SphereLight:"SphereLight",VolumeLightAPI:"VolumeLightAPI"});class re extends $e{static{o(this,"LightAPI")}static typeName="LightAPI";static get(e,t){return new re(e.getPrim(t),e)}isValid(){return super.isValid()&&this.prim.hasAPI(re.typeName)}static canApply(e){return e.canApplyAPI(re.typeName)}static apply(e){return e.applyAPI(re.typeName)?new re(e,e.getStage()):new re(void 0,e.getStage())}static getSchemaAttributeNames(e=!0){return e?["light:shaderId","light:materialSyncMode","inputs:intensity","inputs:exposure","inputs:diffuse","inputs:specular","inputs:normalize","inputs:color","inputs:enableColorTemperature","inputs:colorTemperature"]:["light:shaderId","light:materialSyncMode","inputs:intensity","inputs:exposure","inputs:diffuse","inputs:specular","inputs:normalize","inputs:color","inputs:enableColorTemperature","inputs:colorTemperature"]}getShaderIdAttr(){return this.prim.getAttr(f.lightShaderId)}createShaderIdAttr(e,t=!1){return this._createAttr(f.lightShaderId,"token",!1,"uniform",e,t)}getMaterialSyncModeAttr(){return this.prim.getAttr(f.lightMaterialSyncMode)}createMaterialSyncModeAttr(e,t=!1){return this._createAttr(f.lightMaterialSyncMode,"token",!1,"uniform",e,t)}getIntensityAttr(){return this.prim.getAttr(f.inputsIntensity)}createIntensityAttr(e,t=!1){return this._createAttr(f.inputsIntensity,"float",!1,"varying",e,t)}getExposureAttr(){return this.prim.getAttr(f.inputsExposure)}createExposureAttr(e,t=!1){return this._createAttr(f.inputsExposure,"float",!1,"varying",e,t)}getDiffuseAttr(){return this.prim.getAttr(f.inputsDiffuse)}createDiffuseAttr(e,t=!1){return this._createAttr(f.inputsDiffuse,"float",!1,"varying",e,t)}getSpecularAttr(){return this.prim.getAttr(f.inputsSpecular)}createSpecularAttr(e,t=!1){return this._createAttr(f.inputsSpecular,"float",!1,"varying",e,t)}getNormalizeAttr(){return this.prim.getAttr(f.inputsNormalize)}createNormalizeAttr(e,t=!1){return this._createAttr(f.inputsNormalize,"bool",!1,"varying",e,t)}getColorAttr(){return this.prim.getAttr(f.inputsColor)}createColorAttr(e,t=!1){return this._createAttr(f.inputsColor,"color3f",!1,"varying",e,t)}getEnableColorTemperatureAttr(){return this.prim.getAttr(f.inputsEnableColorTemperature)}createEnableColorTemperatureAttr(e,t=!1){return this._createAttr(f.inputsEnableColorTemperature,"bool",!1,"varying",e,t)}getColorTemperatureAttr(){return this.prim.getAttr(f.inputsColorTemperature)}createColorTemperatureAttr(e,t=!1){return this._createAttr(f.inputsColorTemperature,"float",!1,"varying",e,t)}getFiltersRel(){return this.prim.rel(f.lightFilters)}createFiltersRel(){return this.prim.createRelationship(f.lightFilters,!1)}static fromConnectableAPI(e){return new re(e.prim,e.stage)}connectableAPI(){return new F(this.prim,this.stage)}createOutput(e,t){return new F(this.prim,this.stage).createOutput(e,t)}getOutput(e){return new F(this.prim,this.stage).getOutput(e)}getOutputs(e=!0){return new F(this.prim,this.stage).getOutputs(e)}createInput(e,t){return new F(this.prim,this.stage).createInput(e,t)}getInput(e){return new F(this.prim,this.stage).getInput(e)}getInputs(e=!0){return new F(this.prim,this.stage).getInputs(e)}getLightLinkCollectionAPI(){return new _(this.prim,this.stage,f.lightLink)}getShadowLinkCollectionAPI(){return new _(this.prim,this.stage,f.shadowLink)}getShaderIdAttrForRenderContext(e){return this.prim.getAttr(Ni(e))}createShaderIdAttrForRenderContext(e,t,i=!1){return this._createAttr(Ni(e),"token",!1,"uniform",t,i)}getShaderId(e){for(const i of e){const s=this.getShaderIdAttrForRenderContext(i);if(s.isValid()){const n=s.getValue();if(typeof n=="string"&&n!=="")return n}}const t=this.getShaderIdAttr()?.getValue();return typeof t=="string"?t:""}}function Ni(r){return r===""?f.lightShaderId:`${r}:${f.lightShaderId}`}o(Ni,"_GetShaderIdAttrName");class Rn extends Kt{static{o(this,"LightAPIConnectableAPIBehavior")}constructor(){super(!0,!1)}canConnectInputToSource(e,t,i){return this._canConnectInputToSource(e,t,i,Ot.DerivedContainerNodes)}canConnectOutputToSource(e,t,i){return this._canConnectOutputToSource(e,t,i,Ot.DerivedContainerNodes)}}sr(O.findByName("UsdLuxLightAPI"),new Rn);class le extends Y{static{o(this,"BoundableLightBase")}static typeName="BoundableLightBase";static get(e,t){return new le(e.getPrim(t),e)}isValid(){return super.isValid()&&this.prim.isA(le.typeName)}static getSchemaAttributeNames(e=!0){return e?["visibility","purpose","xformOpOrder","extent"]:[]}lightAPI(){return new re(this.prim,this.stage)}getShaderIdAttr(){return this.lightAPI().getShaderIdAttr()}createShaderIdAttr(e,t=!1){return this.lightAPI().createShaderIdAttr(e,t)}getMaterialSyncModeAttr(){return this.lightAPI().getMaterialSyncModeAttr()}createMaterialSyncModeAttr(e,t=!1){return this.lightAPI().createMaterialSyncModeAttr(e,t)}getIntensityAttr(){return this.lightAPI().getIntensityAttr()}createIntensityAttr(e,t=!1){return this.lightAPI().createIntensityAttr(e,t)}getExposureAttr(){return this.lightAPI().getExposureAttr()}createExposureAttr(e,t=!1){return this.lightAPI().createExposureAttr(e,t)}getDiffuseAttr(){return this.lightAPI().getDiffuseAttr()}createDiffuseAttr(e,t=!1){return this.lightAPI().createDiffuseAttr(e,t)}getSpecularAttr(){return this.lightAPI().getSpecularAttr()}createSpecularAttr(e,t=!1){return this.lightAPI().createSpecularAttr(e,t)}getNormalizeAttr(){return this.lightAPI().getNormalizeAttr()}createNormalizeAttr(e,t=!1){return this.lightAPI().createNormalizeAttr(e,t)}getColorAttr(){return this.lightAPI().getColorAttr()}createColorAttr(e,t=!1){return this.lightAPI().createColorAttr(e,t)}getEnableColorTemperatureAttr(){return this.lightAPI().getEnableColorTemperatureAttr()}createEnableColorTemperatureAttr(e,t=!1){return this.lightAPI().createEnableColorTemperatureAttr(e,t)}getColorTemperatureAttr(){return this.lightAPI().getColorTemperatureAttr()}createColorTemperatureAttr(e,t=!1){return this.lightAPI().createColorTemperatureAttr(e,t)}getFiltersRel(){return this.lightAPI().getFiltersRel()}createFiltersRel(){return this.lightAPI().createFiltersRel()}}class Ie extends le{static{o(this,"CylinderLight")}static typeName="CylinderLight";static get(e,t){return new Ie(e.getPrim(t),e)}static define(e,t){return new Ie(e.definePrim(t,"CylinderLight"),e)}isValid(){return super.isValid()&&this.prim.isA(Ie.typeName)}static getSchemaAttributeNames(e=!0){return e?["visibility","purpose","xformOpOrder","extent","inputs:length","inputs:radius","treatAsLine"]:["inputs:length","inputs:radius","treatAsLine"]}getLengthAttr(){return this.prim.getAttr(f.inputsLength)}createLengthAttr(e,t=!1){return this._createAttr(f.inputsLength,"float",!1,"varying",e,t)}getRadiusAttr(){return this.prim.getAttr(f.inputsRadius)}createRadiusAttr(e,t=!1){return this._createAttr(f.inputsRadius,"float",!1,"varying",e,t)}getTreatAsLineAttr(){return this.prim.getAttr(f.treatAsLine)}createTreatAsLineAttr(e,t=!1){return this._createAttr(f.treatAsLine,"bool",!1,"varying",e,t)}}function Un(r,e){const t=[Math.fround(e*.5),r,r];return[[-t[0],-t[1],-t[2]],t]}o(Un,"_ComputeLocalExtent$4");function Vn(r,e,t){const i=new Ie(r),s=Mi(i.getRadiusAttr(),e);if(s===void 0)return null;const n=Mi(i.getLengthAttr(),e);if(n===void 0)return null;const a=Un(s,n);if(t){const c=new b(new k(new E(...a[0]),new E(...a[1])),new x(...t)).ComputeAlignedRange();return[[...c.getMin().data],[...c.getMax().data]]}return a}o(Vn,"_ComputeExtent$4");function Mi(r,e){const t=e===void 0?r?.getValue():r?.getValueAtTime(e);return typeof t=="number"?Math.fround(t):void 0}o(Mi,"_GetFloat$4");Ce(Ie.typeName,Vn);class _e extends le{static{o(this,"DiskLight")}static typeName="DiskLight";static get(e,t){return new _e(e.getPrim(t),e)}static define(e,t){return new _e(e.definePrim(t,"DiskLight"),e)}isValid(){return super.isValid()&&this.prim.isA(_e.typeName)}static getSchemaAttributeNames(e=!0){return e?["visibility","purpose","xformOpOrder","extent","inputs:radius"]:["inputs:radius"]}getRadiusAttr(){return this.prim.getAttr(f.inputsRadius)}createRadiusAttr(e,t=!1){return this._createAttr(f.inputsRadius,"float",!1,"varying",e,t)}}function Gn(r){const e=[r,r,0];return[[-e[0],-e[1],-e[2]],e]}o(Gn,"_ComputeLocalExtent$3");function Ln(r,e,t){const i=new _e(r),s=Fn(i.getRadiusAttr(),e);if(s===void 0)return null;const n=Gn(s);if(t){const u=new b(new k(new E(...n[0]),new E(...n[1])),new x(...t)).ComputeAlignedRange();return[[...u.getMin().data],[...u.getMax().data]]}return n}o(Ln,"_ComputeExtent$3");function Fn(r,e){const t=e===void 0?r?.getValue():r?.getValueAtTime(e);return typeof t=="number"?Math.fround(t):void 0}o(Fn,"_GetFloat$3");Ce(_e.typeName,Ln);class Se extends le{static{o(this,"PortalLight")}static typeName="PortalLight";static get(e,t){return new Se(e.getPrim(t),e)}static define(e,t){return new Se(e.definePrim(t,"PortalLight"),e)}isValid(){return super.isValid()&&this.prim.isA(Se.typeName)}static getSchemaAttributeNames(e=!0){return e?["visibility","purpose","xformOpOrder","extent","inputs:width","inputs:height"]:["inputs:width","inputs:height"]}getWidthAttr(){return this.prim.getAttr(f.inputsWidth)}createWidthAttr(e,t=!1){return this._createAttr(f.inputsWidth,"float",!1,"varying",e,t)}getHeightAttr(){return this.prim.getAttr(f.inputsHeight)}createHeightAttr(e,t=!1){return this._createAttr(f.inputsHeight,"float",!1,"varying",e,t)}}function $n(r,e){const t=[Math.fround(r*.5),Math.fround(e*.5),0];return[[-t[0],-t[1],-t[2]],t]}o($n,"_ComputeLocalExtent$2");function Hn(r,e,t){const i=new Se(r),s=Oi(i.getWidthAttr(),e);if(s===void 0)return null;const n=Oi(i.getHeightAttr(),e);if(n===void 0)return null;const a=$n(s,n);if(t){const c=new b(new k(new E(...a[0]),new E(...a[1])),new x(...t)).ComputeAlignedRange();return[[...c.getMin().data],[...c.getMax().data]]}return a}o(Hn,"_ComputeExtent$2");function Oi(r,e){const t=e===void 0?r?.getValue():r?.getValueAtTime(e);return typeof t=="number"?Math.fround(t):void 0}o(Oi,"_GetFloat$2");Ce(Se.typeName,Hn);class Te extends le{static{o(this,"RectLight")}static typeName="RectLight";static get(e,t){return new Te(e.getPrim(t),e)}static define(e,t){return new Te(e.definePrim(t,"RectLight"),e)}isValid(){return super.isValid()&&this.prim.isA(Te.typeName)}static getSchemaAttributeNames(e=!0){return e?["visibility","purpose","xformOpOrder","extent","inputs:width","inputs:height","inputs:texture:file"]:["inputs:width","inputs:height","inputs:texture:file"]}getWidthAttr(){return this.prim.getAttr(f.inputsWidth)}createWidthAttr(e,t=!1){return this._createAttr(f.inputsWidth,"float",!1,"varying",e,t)}getHeightAttr(){return this.prim.getAttr(f.inputsHeight)}createHeightAttr(e,t=!1){return this._createAttr(f.inputsHeight,"float",!1,"varying",e,t)}getTextureFileAttr(){return this.prim.getAttr(f.inputsTextureFile)}createTextureFileAttr(e,t=!1){return this._createAttr(f.inputsTextureFile,"asset",!1,"varying",e,t)}}function Xn(r,e){const t=[Math.fround(r*.5),Math.fround(e*.5),0];return[[-t[0],-t[1],-t[2]],t]}o(Xn,"_ComputeLocalExtent$1");function Kn(r,e,t){const i=new Te(r),s=Ei(i.getWidthAttr(),e);if(s===void 0)return null;const n=Ei(i.getHeightAttr(),e);if(n===void 0)return null;const a=Xn(s,n);if(t){const c=new b(new k(new E(...a[0]),new E(...a[1])),new x(...t)).ComputeAlignedRange();return[[...c.getMin().data],[...c.getMax().data]]}return a}o(Kn,"_ComputeExtent$1");function Ei(r,e){const t=e===void 0?r?.getValue():r?.getValueAtTime(e);return typeof t=="number"?Math.fround(t):void 0}o(Ei,"_GetFloat$1");Ce(Te.typeName,Kn);class he extends le{static{o(this,"SphereLight")}static typeName="SphereLight";static get(e,t){return new he(e.getPrim(t),e)}static define(e,t){return new he(e.definePrim(t,"SphereLight"),e)}isValid(){return super.isValid()&&this.prim.isA(he.typeName)}static getSchemaAttributeNames(e=!0){return e?["visibility","purpose","xformOpOrder","extent","inputs:radius","treatAsPoint"]:["inputs:radius","treatAsPoint"]}getRadiusAttr(){return this.prim.getAttr(f.inputsRadius)}createRadiusAttr(e,t=!1){return this._createAttr(f.inputsRadius,"float",!1,"varying",e,t)}getTreatAsPointAttr(){return this.prim.getAttr(f.treatAsPoint)}createTreatAsPointAttr(e,t=!1){return this._createAttr(f.treatAsPoint,"bool",!1,"varying",e,t)}static is(e){return e.isA(he.typeName)}}function zn(r){const e=[r,r,r];return[[-e[0],-e[1],-e[2]],e]}o(zn,"_ComputeLocalExtent");function Yn(r,e,t){const i=new he(r),s=qn(i.getRadiusAttr(),e);if(s===void 0)return null;const n=zn(s);if(t){const u=new b(new k(new E(...n[0]),new E(...n[1])),new x(...t)).ComputeAlignedRange();return[[...u.getMin().data],[...u.getMax().data]]}return n}o(Yn,"_ComputeExtent");function qn(r,e){const t=e===void 0?r?.getValue():r?.getValueAtTime(e);return typeof t=="number"?Math.fround(t):void 0}o(qn,"_GetFloat");Ce(he.typeName,Yn);const Q={shadingSystem:"USD",discoveryType:"usd-schema-gen",MeshLight:"MeshLight",MeshLightAPI:"MeshLightAPI",LightAPI:"LightAPI",ShadowAPI:"ShadowAPI",ShapingAPI:"ShapingAPI",VolumeLight:"VolumeLight",VolumeLightAPI:"VolumeLightAPI"};function Zn(r,e,t){const i={...t};i.help=`Fallback shader node generated from the USD ${r.getPrim(e)?.typeName??""} schema`;const s=At.getPrimvarNamesMetadataString(i.primvars??"",r,e);return s!==""&&(i.primvars=s),i.subdomain="lighting",i.context="light",i}o(Zn,"_GetSdrMetadata");function jn(){const r=Vr.createAnonymous("generatedSchema.usda");return r.importFromString(vr)?r:void 0}o(jn,"_GetGeneratedSchema");function Wn(r,e,t,i){const s=r.getPrimAtPath(`/${e}`);if(!s)return!1;for(const n of s.getProperties())if(!Gr(r,n.getPath(),t,`${i}.${n.getPath().name}`))return!1;return!0}o(Wn,"_CopyPropertiesFromSchema");class fe{static{o(this,"UsdLux_LightDefParserPlugin")}static _getShadingSystem(){return Q.shadingSystem}static _getDiscoveryType(){return Q.discoveryType}static _getShaderIdToAPITypeNameMap(){return Ri}parseShaderNode(e){const i=Ri.get(e.identifier)??e.identifier,s=jn();if(!s)return kt(e);const n=Ur.createNew(),a=n.getRootLayer(),u=`/${i}`;n.definePrim(u);const c=[Q.LightAPI,i,Q.ShadowAPI,Q.ShapingAPI];for(const p of c)if(!Wn(s,p,a,u))return kt(e);if(!n.getPrim(u))return kt(e);const l=Zn(n,u,e.metadata??{});return new vt(e.identifier,e.version,e.name,e.function,l.context,Q.shadingSystem,"","",At.getProperties(n,u),l,e.sourceCode??"")}getDiscoveryTypes(){return[fe._getDiscoveryType()]}getShadingSystem(){return fe._getShadingSystem()}}const Ri=new Map([[Q.MeshLight,Q.MeshLightAPI],[Q.VolumeLight,Q.VolumeLightAPI]]);function kt(r){return new vt(r.identifier,r.version,r.name,r.function,"unknown discovery type","unknown shading system",r.resolvedUri,r.resolvedUri)}o(kt,"_GetInvalidShaderNode");mr("UsdLux_LightDefParserPlugin",fe);class Qn{static{o(this,"UsdLux_DiscoveryPlugin")}getSearchURIs(){return[]}discoverShaderNodes(){const e=[],t=O.findByName("UsdLuxBoundableLightBase"),i=O.findByName("UsdLuxNonboundableLightBase"),s=new Set;for(const c of V.getAllDerivedTypes(t))s.add(c);for(const c of V.getAllDerivedTypes(i))s.add(c);const n=fe._getShaderIdToAPITypeNameMap(),a=[],u=V.GetInstance().GetPluginWithName("usdLux");for(const c of s){if(!u?.declaresType(c))continue;const l=N.getConcreteSchemaTypeName(c);l!==""&&a.push(l)}for(const c of n.keys())a.push(c);for(const c of a)e.push({identifier:c,version:new q().getAsDefault(),name:c,function:"",discoveryType:fe._getDiscoveryType(),sourceType:fe._getShadingSystem(),uri:"",resolvedUri:""});return e}}Dn("UsdLux_DiscoveryPlugin",Qn);const Jn={Plugins:[{Info:{Types:{UsdVolField3DAsset:{alias:{UsdSchemaBase:"Field3DAsset"},autoGenerated:!0,bases:["UsdVolFieldAsset"],schemaIdentifier:"Field3DAsset",schemaKind:"concreteTyped"},UsdVolFieldAsset:{alias:{UsdSchemaBase:"FieldAsset"},autoGenerated:!0,bases:["UsdVolVolumeFieldAsset"],schemaIdentifier:"FieldAsset",schemaKind:"abstractTyped"},UsdVolFieldBase:{alias:{UsdSchemaBase:"FieldBase"},autoGenerated:!0,bases:["UsdVolVolumeFieldBase"],schemaIdentifier:"FieldBase",schemaKind:"abstractTyped"},UsdVolOpenVDBAsset:{alias:{UsdSchemaBase:"OpenVDBAsset"},autoGenerated:!0,bases:["UsdVolFieldAsset"],schemaIdentifier:"OpenVDBAsset",schemaKind:"concreteTyped"},UsdVolParticleField:{alias:{UsdSchemaBase:"ParticleField"},autoGenerated:!0,bases:["UsdGeomGprim"],schemaIdentifier:"ParticleField",schemaKind:"concreteTyped"},UsdVolParticleField3DGaussianSplat:{alias:{UsdSchemaBase:"ParticleField3DGaussianSplat"},autoGenerated:!0,bases:["UsdVolParticleField"],schemaIdentifier:"ParticleField3DGaussianSplat",schemaKind:"concreteTyped"},UsdVolParticleFieldKernelBaseAPI:{alias:{UsdSchemaBase:"ParticleFieldKernelBaseAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ParticleFieldKernelBaseAPI",schemaKind:"singleApplyAPI"},UsdVolParticleFieldKernelConstantSurfletAPI:{alias:{UsdSchemaBase:"ParticleFieldKernelConstantSurfletAPI"},apiSchemaCanOnlyApplyTo:["ParticleField"],autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ParticleFieldKernelConstantSurfletAPI",schemaKind:"singleApplyAPI"},UsdVolParticleFieldKernelGaussianEllipsoidAPI:{alias:{UsdSchemaBase:"ParticleFieldKernelGaussianEllipsoidAPI"},apiSchemaCanOnlyApplyTo:["ParticleField"],autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ParticleFieldKernelGaussianEllipsoidAPI",schemaKind:"singleApplyAPI"},UsdVolParticleFieldKernelGaussianSurfletAPI:{alias:{UsdSchemaBase:"ParticleFieldKernelGaussianSurfletAPI"},apiSchemaCanOnlyApplyTo:["ParticleField"],autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ParticleFieldKernelGaussianSurfletAPI",schemaKind:"singleApplyAPI"},UsdVolParticleFieldOpacityAttributeAPI:{alias:{UsdSchemaBase:"ParticleFieldOpacityAttributeAPI"},apiSchemaCanOnlyApplyTo:["ParticleField"],autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ParticleFieldOpacityAttributeAPI",schemaKind:"singleApplyAPI"},UsdVolParticleFieldOrientationAttributeAPI:{alias:{UsdSchemaBase:"ParticleFieldOrientationAttributeAPI"},apiSchemaCanOnlyApplyTo:["ParticleField"],autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ParticleFieldOrientationAttributeAPI",schemaKind:"singleApplyAPI"},UsdVolParticleFieldPositionAttributeAPI:{alias:{UsdSchemaBase:"ParticleFieldPositionAttributeAPI"},apiSchemaCanOnlyApplyTo:["ParticleField"],autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ParticleFieldPositionAttributeAPI",schemaKind:"singleApplyAPI"},UsdVolParticleFieldPositionBaseAPI:{alias:{UsdSchemaBase:"ParticleFieldPositionBaseAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ParticleFieldPositionBaseAPI",schemaKind:"singleApplyAPI"},UsdVolParticleFieldRadianceBaseAPI:{alias:{UsdSchemaBase:"ParticleFieldRadianceBaseAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ParticleFieldRadianceBaseAPI",schemaKind:"singleApplyAPI"},UsdVolParticleFieldScaleAttributeAPI:{alias:{UsdSchemaBase:"ParticleFieldScaleAttributeAPI"},apiSchemaCanOnlyApplyTo:["ParticleField"],autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ParticleFieldScaleAttributeAPI",schemaKind:"singleApplyAPI"},UsdVolParticleFieldSphericalHarmonicsAttributeAPI:{alias:{UsdSchemaBase:"ParticleFieldSphericalHarmonicsAttributeAPI"},apiSchemaCanOnlyApplyTo:["ParticleField"],autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ParticleFieldSphericalHarmonicsAttributeAPI",schemaKind:"singleApplyAPI"},UsdVolVolume:{alias:{UsdSchemaBase:"Volume"},autoGenerated:!0,bases:["UsdGeomGprim"],schemaIdentifier:"Volume",schemaKind:"concreteTyped"},UsdVolVolumeFieldAsset:{alias:{UsdSchemaBase:"VolumeFieldAsset"},autoGenerated:!0,bases:["UsdVolFieldBase"],schemaIdentifier:"VolumeFieldAsset",schemaKind:"abstractTyped"},UsdVolVolumeFieldBase:{alias:{UsdSchemaBase:"VolumeFieldBase"},autoGenerated:!0,bases:["UsdGeomXformable"],schemaIdentifier:"VolumeFieldBase",schemaKind:"abstractTyped"}}},LibraryPath:"@PLUG_INFO_LIBRARY_PATH@",Name:"usdVol",ResourcePath:"@PLUG_INFO_RESOURCE_PATH@",Root:"@PLUG_INFO_ROOT@",Type:"library"}]},ea=`#usda 1.0
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

`;V.GetInstance().RegisterPlugins(Jn,{usdVol:{"generatedSchema.usda":ea}});const ta={Plugins:[{Info:{SdfMetadata:{renderSettingsPrimPath:{appliesTo:"layers",default:"",type:"string"}},Types:{UsdRenderPass:{alias:{UsdSchemaBase:"RenderPass"},autoGenerated:!0,bases:["UsdTyped"],schemaIdentifier:"RenderPass",schemaKind:"concreteTyped"},UsdRenderProduct:{alias:{UsdSchemaBase:"RenderProduct"},autoGenerated:!0,bases:["UsdRenderSettingsBase"],schemaIdentifier:"RenderProduct",schemaKind:"concreteTyped"},UsdRenderSettings:{alias:{UsdSchemaBase:"RenderSettings"},autoGenerated:!0,bases:["UsdRenderSettingsBase"],schemaIdentifier:"RenderSettings",schemaKind:"concreteTyped"},UsdRenderSettingsBase:{alias:{UsdSchemaBase:"RenderSettingsBase"},autoGenerated:!0,bases:["UsdTyped"],schemaIdentifier:"RenderSettingsBase",schemaKind:"abstractTyped"},UsdRenderVar:{alias:{UsdSchemaBase:"RenderVar"},autoGenerated:!0,bases:["UsdTyped"],schemaIdentifier:"RenderVar",schemaKind:"concreteTyped"}}},LibraryPath:"@PLUG_INFO_LIBRARY_PATH@",Name:"usdRender",ResourcePath:"@PLUG_INFO_RESOURCE_PATH@",Root:"@PLUG_INFO_ROOT@",Type:"library"}]},ia=`#usda 1.0
(
    "WARNING: THIS FILE IS GENERATED BY usdGenSchema.  DO NOT EDIT."
)

class "RenderSettingsBase" (
    customData = {
        string userDocBrief = """An abstract base class schema that defines
settings common to both RenderSettings and RenderProduct."""
    }
)
{
    uniform token aspectRatioConformPolicy = "expandAperture" (
        allowedTokens = ["expandAperture", "cropAperture", "adjustApertureWidth", "adjustApertureHeight", "adjustPixelAspectRatio"]
        customData = {
            string userDocBrief = """Indicates the policy to use to resolve an 
aspect ratio mismatch between the camera aperture and image aspect ratio
(derived from the resolution and pixelAspectRatio)."""
        }
    )
    rel camera (
        customData = {
            string userDocBrief = """A relationship that specifies the primary 
camera to use for a render. Must target a Camera prim."""
        }
    )
    uniform float4 dataWindowNDC = (0, 0, 1, 1) (
        customData = {
            string userDocBrief = """Specifies the axis-aligned rectangular
region in the adjusted aperture window within which the renderer should produce 
data. Specified as (xmin, ymin, xmax, ymax) in normalized device coordinates, 
where the range 0 to 1 corresponds to the aperture."""
        }
    )
    uniform bool disableDepthOfField = 0 (
        customData = {
            string userDocBrief = """Disable all depth of field by setting 
F-stop of the targeted camera to infinity."""
        }
    )
    uniform bool disableMotionBlur = 0 (
        customData = {
            string userDocBrief = """Disable all motion blur by setting the 
shutter interval of the render camera to [0,0] (take only one sample at the 
current time code)."""
        }
    )
    uniform bool instantaneousShutter = 0 (
        customData = {
            string userDocBrief = "Deprecated, use disableMotionBlur instead."
        }
    )
    uniform float pixelAspectRatio = 1 (
        customData = {
            string userDocBrief = """The aspect ratio (width/height) of the 
image pixels."""
        }
    )
    uniform int2 resolution = (2048, 1080) (
        customData = {
            string userDocBrief = """The image pixel resolution, corresponding 
to the camera's screen window."""
        }
    )
}

class RenderSettings "RenderSettings" (
    customData = {
        string userDocBrief = """All the global settings for a 
single invocation of a rendering of a scene. Includes configuration of what
render products should be produced, and what imageable purposes should be 
rendered."""
    }
)
{
    uniform token aspectRatioConformPolicy = "expandAperture" (
        allowedTokens = ["expandAperture", "cropAperture", "adjustApertureWidth", "adjustApertureHeight", "adjustPixelAspectRatio"]
        customData = {
            string userDocBrief = """Indicates the policy to use to resolve an 
aspect ratio mismatch between the camera aperture and image aspect ratio
(derived from the resolution and pixelAspectRatio)."""
        }
    )
    rel camera (
        customData = {
            string userDocBrief = """A relationship that specifies the primary 
camera to use for a render. Must target a Camera prim."""
        }
    )
    uniform float4 dataWindowNDC = (0, 0, 1, 1) (
        customData = {
            string userDocBrief = """Specifies the axis-aligned rectangular
region in the adjusted aperture window within which the renderer should produce 
data. Specified as (xmin, ymin, xmax, ymax) in normalized device coordinates, 
where the range 0 to 1 corresponds to the aperture."""
        }
    )
    uniform bool disableDepthOfField = 0 (
        customData = {
            string userDocBrief = """Disable all depth of field by setting 
F-stop of the targeted camera to infinity."""
        }
    )
    uniform bool disableMotionBlur = 0 (
        customData = {
            string userDocBrief = """Disable all motion blur by setting the 
shutter interval of the render camera to [0,0] (take only one sample at the 
current time code)."""
        }
    )
    uniform token[] includedPurposes = ["default", "render"] (
        customData = {
            string userDocBrief = """Imageable purpose values (e.g. default,
render, proxy, guide) that should be included in the render. Only imageable 
prims with purpose set to one of the includedPurposes values will be rendered."""
        }
    )
    uniform bool instantaneousShutter = 0 (
        customData = {
            string userDocBrief = "Deprecated, use disableMotionBlur instead."
        }
    )
    uniform token[] materialBindingPurposes = ["full", ""] (
        allowedTokens = ["full", "preview", ""]
        customData = {
            string userDocBrief = """Ordered list of material binding purposes
that will be used in the render."""
        }
    )
    uniform float pixelAspectRatio = 1 (
        customData = {
            string userDocBrief = """The aspect ratio (width/height) of the 
image pixels."""
        }
    )
    rel products (
        customData = {
            string userDocBrief = """Specifies the RenderProducts that a 
render of this scene should produce. If no products are specified, renderers 
are expected to produce a default RGB image."""
        }
    )
    uniform token renderingColorSpace (
        customData = {
            string userDocBrief = """The 'rendering color space' the renderer
should use for internal color calculations. If this is not set, a renderer 
is expected to use its own default color space. Not to be confused with setting
specific 'source' color spaces for scene assets."""
        }
    )
    uniform int2 resolution = (2048, 1080) (
        customData = {
            string userDocBrief = """The image pixel resolution, corresponding 
to the camera's screen window."""
        }
    )
}

class RenderVar "RenderVar" (
    customData = {
        string userDocBrief = """Describes a quantity or 'channel' of computed
data, produced by a renderer. Examples include camera-space depth channels, 
material shader quantities such as color or alpha channels, light path 
expressions (LPEs), and renderer intrinsic quantities such as computation time
per pixel."""
    }
)
{
    uniform token dataType = "color3f" (
        customData = {
            string userDocBrief = """The type of this quantity, as a USD 
attribute type (color3f, float, etc.)."""
        }
    )
    uniform string sourceName = "" (
        customData = {
            string userDocBrief = """The name of the data source that contains 
the computed value(s) for the RenderVar."""
        }
    )
    uniform token sourceType = "raw" (
        allowedTokens = ["raw", "primvar", "lpe", "intrinsic"]
        customData = {
            string userDocBrief = """Describes the type of the quantity
data source."""
        }
    )
}

class RenderProduct "RenderProduct" (
    customData = {
        string userDocBrief = """A single render output artifact,
such as a rendered image or other file-like artifact. Specifies one or more 
RenderVars combined into the output artifact. RenderProduct can also override
some of the configuration specified in a RenderSetting, and has product-specific
configuration attributes, such as the output productName."""
    }
)
{
    uniform token aspectRatioConformPolicy = "expandAperture" (
        allowedTokens = ["expandAperture", "cropAperture", "adjustApertureWidth", "adjustApertureHeight", "adjustPixelAspectRatio"]
        customData = {
            string userDocBrief = """Indicates the policy to use to resolve an 
aspect ratio mismatch between the camera aperture and image aspect ratio
(derived from the resolution and pixelAspectRatio)."""
        }
    )
    rel camera (
        customData = {
            string userDocBrief = """A relationship that specifies the primary 
camera to use for a render. Must target a Camera prim."""
        }
    )
    uniform float4 dataWindowNDC = (0, 0, 1, 1) (
        customData = {
            string userDocBrief = """Specifies the axis-aligned rectangular
region in the adjusted aperture window within which the renderer should produce 
data. Specified as (xmin, ymin, xmax, ymax) in normalized device coordinates, 
where the range 0 to 1 corresponds to the aperture."""
        }
    )
    uniform bool disableDepthOfField = 0 (
        customData = {
            string userDocBrief = """Disable all depth of field by setting 
F-stop of the targeted camera to infinity."""
        }
    )
    uniform bool disableMotionBlur = 0 (
        customData = {
            string userDocBrief = """Disable all motion blur by setting the 
shutter interval of the render camera to [0,0] (take only one sample at the 
current time code)."""
        }
    )
    uniform bool instantaneousShutter = 0 (
        customData = {
            string userDocBrief = "Deprecated, use disableMotionBlur instead."
        }
    )
    rel orderedVars (
        customData = {
            string userDocBrief = """Specifies the RenderVars that should be
used and combined into the final output product. The order is provided to 
the render executable and pipeline tools."""
        }
    )
    uniform float pixelAspectRatio = 1 (
        customData = {
            string userDocBrief = """The aspect ratio (width/height) of the 
image pixels."""
        }
    )
    token productName = "" (
        customData = {
            string userDocBrief = """Specifies the name for the output product.
Used by render executables and pipeline tools to name the product, for 
example, using the productName as the filename (and path) for an output image
artifact."""
        }
    )
    uniform token productType = "raster" (
        allowedTokens = ["raster", "deepRaster"]
        customData = {
            string userDocBrief = """Specifies the type of output to produce. 
Values are output types most renderers should be able to support, such as 
'raster' or 'deepRaster'."""
        }
    )
    uniform int2 resolution = (2048, 1080) (
        customData = {
            string userDocBrief = """The image pixel resolution, corresponding 
to the camera's screen window."""
        }
    )
}

class RenderPass "RenderPass" (
    apiSchemas = ["CollectionAPI:renderVisibility", "CollectionAPI:cameraVisibility", "CollectionAPI:prune", "CollectionAPI:matte"]
    customData = {
        token[] apiSchemaOverridePropertyNames = ["collection:cameraVisibility:includeRoot", "collection:renderVisibility:includeRoot"]
        string userDocBrief = """Represents the renderer and scene 
configuration for a single render pass in a multi-pass rendering workflow. 
For example, a render pipeline might use separate render passes to 
render the foreground and background portions of a scene, and a third pass that 
composites the foreground and background render output into the final frame."""
    }
)
{
    uniform bool collection:cameraVisibility:includeRoot = 1 (
        customData = {
            string userDocBrief = """This property is instantiated in the schema 
to override the fallback value from the CollectionAPI to true."""
        }
    )
    uniform bool collection:renderVisibility:includeRoot = 1 (
        customData = {
            string userDocBrief = """This property is instantiated in the schema 
to override the fallback value from the CollectionAPI to true."""
        }
    )
    uniform string[] command (
        customData = {
            string userDocBrief = """Command to run in order to generate
renders for this pass. Used by render pipelines to send jobs to scheduling
components that will generate renders."""
        }
    )
    uniform asset fileName (
        customData = {
            string userDocBrief = """Asset that contains the render 
configuration prims or other information needed to render this pass."""
        }
    )
    rel inputPasses (
        customData = {
            string userDocBrief = """The RenderPasses that this pass depends on.
For example, this pass might depend on the output from a 'Render Texture' pass,
which gets used as input for this pass."""
        }
    )
    uniform token passType (
        customData = {
            string userDocBrief = """Used to categorize different types of
passes within a render pipeline."""
        }
    )
    rel renderSource (
        customData = {
            string userDocBrief = """Points to render configuration for this
pass. Targets a relationship to a RenderSettings, or if fileName is set, 
points to configuration within that file."""
        }
    )
}

`;V.GetInstance().RegisterPlugins(ta,{usdRender:{"generatedSchema.usda":ia}});const ra={Plugins:[{Info:{Types:{UsdHydraDiscoveryPlugin:{bases:["SdrDiscoveryPlugin"],displayName:"Discovery plugin for deprecated hydra shaders."},UsdHydraGenerativeProceduralAPI:{alias:{UsdSchemaBase:"HydraGenerativeProceduralAPI"},apiSchemaCanOnlyApplyTo:["GenerativeProcedural"],autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"HydraGenerativeProceduralAPI",schemaKind:"singleApplyAPI"},UsdHydraPrimAPI:{alias:{UsdSchemaBase:"HydraPrimAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"HydraPrimAPI",schemaKind:"singleApplyAPI"},UsdHydraRenderPassAPI:{alias:{UsdSchemaBase:"HydraRenderPassAPI"},apiSchemaCanOnlyApplyTo:["RenderPass"],autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"HydraRenderPassAPI",schemaKind:"singleApplyAPI"}}},LibraryPath:"@PLUG_INFO_LIBRARY_PATH@",Name:"usdHydra",ResourcePath:"@PLUG_INFO_RESOURCE_PATH@",Root:"@PLUG_INFO_ROOT@",Type:"library"}]},sa=`#usda 1.0
(
    "WARNING: THIS FILE IS GENERATED BY usdGenSchema.  DO NOT EDIT."
)

class "HydraGenerativeProceduralAPI" (
    customData = {
        string userDocBrief = """This API extends and configures the core UsdProcGenerativeProcedural schema
    defined within usdProc for use with hydra generative procedurals as defined
    within hdGp."""
    }
)
{
    token primvars:hdGp:proceduralType (
        customData = {
            string userDocBrief = """The registered name of a HdGpGenerativeProceduralPlugin to
        be executed."""
        }
    )
    token proceduralSystem = "hydraGenerativeProcedural" (
        customData = {
            string userDocBrief = """This value should correspond to a configured instance of
        HdGpGenerativeProceduralResolvingSceneIndex which will evaluate the
        procedural."""
        }
    )
}

class "HydraRenderPassAPI" (
    customData = {
        string userDocBrief = "Provides Hydra-specific properties for UsdRenderPass."
    }
)
{
    uniform token hydra:rendererName (
        customData = {
            string userDocBrief = """The name of the Hydra renderer to use if the user does
        not otherwise specify one to the application."""
        }
    )
}

class "HydraPrimAPI" (
    customData = {
        string userDocBrief = "Provides Hydra-specific prim settings."
    }
)
{
    uniform bool hydra:expandInstances = 0 (
        customData = {
            string userDocBrief = """This property can be used to de-instance the Hydra scene
        index representation of prims that were otherwise instanceable
        in the USD scenegraph."""
        }
    )
}

`,na={"shaders/empty.glslfx":`-- glslfx version 0.1

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

def Shader "HwPtexTexture_1" (
    sdrMetadata = {
        token role = "texture"
        token isPtex = "1"
    }
)
{
    uniform token info:id = "HwPtexTexture_1"
    uniform token info:implementationSource = "sourceAsset"

    # Add a dummy sourceAsset attribute with sourceType="glslfx", so that 
    # an entry gets created for this deprecated shader in the registry.
    uniform asset info:glslfx:sourceAsset = @./empty.glslfx@

    token inputs:faceIndexPrimvar = "ptexFaceIndex" (
        sdrMetadata = {
            token primvarProperty = "1"
        }
    )

    token inputs:faceOffsetPrimvar = "ptexFaceOffset" (
        sdrMetadata = {
            token primvarProperty = "1"
        }
    )

    asset inputs:file = @@ (
        doc = "Asset path to the file containg the image data."
    )

    float inputs:frame (
        doc = "The frame offset for animated textures."
    )

    float inputs:textureMemory (
        doc = """Amount of memory used to store the texture (in Mb). A value of 
        zero specifies the native resolution."""
    )

    int inputs:faceIndex (
        doc = """The Ptex face index from which to sample. By default, this
        parameter will be bound to the ptexFaceIndex primvar."""
    )

    int inputs:faceOffset (
        doc = """The Ptex face offset to be applied to the face index. By
        default, this parameter will be bound to the ptexFaceOffset primvar."""
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

    float4 outputs:rgba (
        doc = "Outputs all 4 channels (red, green, blue and alpha)."
        sdrMetadata = {
            token swizzle = "xyzw"
        }
    )
}

def Shader "HwUvTexture_1" (
    sdrMetadata = {
        token role = "texture"
        token primvars = "uv"
    }
)
{
    uniform token info:id = "HwUvTexture_1"
    uniform token info:implementationSource = "sourceAsset"

    # Add a dummy sourceAsset attribute with sourceType="glslfx", so that 
    # an entry gets created for this deprecated shader in the registry.
    uniform asset info:glslfx:sourceAsset = @./empty.glslfx@

    asset inputs:file = @@ (
        doc = "Asset path to the file containg the image data."
    )

    float inputs:frame (
        doc = "The frame offset for animated textures."
    )

    float inputs:textureMemory (
        doc = """Amount of memory used to store the texture (in Mb). A value of 
        zero specifies the native resolution."""
    )

    float2 inputs:uv (
        doc = "The uv coordinates at which to sample the texture."
    )

    token inputs:wrapS (
        allowedTokens = ["clamp", "repeat", "mirror", "black"]
        doc = "Specifies the wrap mode for this texture."
    )

    token inputs:wrapT (
        allowedTokens = ["clamp", "repeat", "mirror", "black"]
        doc = "Specifies the wrap mode for this texture."
    )

    token inputs:minFilter (
        allowedTokens = ["nearest", "linear",
                         "linearMipmapLinear", "linearMipmapNearest",
                         "nearestMipmapLinear", "nearestMipmapNearest" ]
        doc = "Specifies the minification filter mode for this texture."
    )
    
    token inputs:magFilter (
        allowedTokens = ["nearest", "linear"]
        doc = "Specifies the magnification filter mode for this texture."
    )

    float4 inputs:fallback = (0.0, 0.0, 0.0, 1.0) (
        doc = """Fallback value to be used when no texture is connected."""
        sdrMetadata = {
            token defaultInput = "1"
        }
    )
}

def Shader "HwFieldReader_1" (
    sdrMetadata = {
        token role = "field"
    }
    doc = """Samples from a usdVol FieldAsset."""
)
{
    uniform asset info:glslfx:sourceAsset = @./empty.glslfx@
    uniform token info:implementationSource = "sourceAsset"
    token inputs:fieldname = "" (
        connectability = "interfaceOnly"
        doc = """Name of the field to be fetched from volume
                 (e.g., FOO if the relationship from the volume to field is called field::FOO)."""
        sdrMetadata = {
            token fieldProperty = "1"
        }
    )
}

def Shader "HwFieldReader_float" ( 
    inherits = </HwFieldReader_1>
)
{
    uniform token info:id = "HwFieldReader_float"
    float inputs:fallback = 0 (
        doc = "Fallback value to be returned when fetch failed."
        sdrMetadata = {
            token defaultInput = "1"
        }
    )
    float outputs:result (
        sdrMetadata = {
            token swizzle = "x"
        }
    )
}

def Shader "HwFieldReader_float2" (
    inherits = </HwFieldReader_1>
)
{
    uniform token info:id = "HwFieldReader_float2"
    float2 inputs:fallback = (0, 0) (
        doc = "Fallback value to be returned when fetch failed."
        sdrMetadata = {
            token defaultInput = "1"
        }
    )
    float2 outputs:result (
        sdrMetadata = {
            token swizzle = "xy"
        }
    )
}

def Shader "HwFieldReader_float3" (
    inherits = </HwFieldReader_1>
)
{
    uniform token info:id = "HwFieldReader_float3"
    float3 inputs:fallback = (0, 0, 0) (
        doc = "Fallback value to be returned when fetch failed."
        sdrMetadata = {
            token defaultInput = "1"
        }
    )
    float3 outputs:result (
        sdrMetadata = {
            token swizzle = "xyz"
        }
    )
}

def Shader "HwPrimvar_1" (
    sdrMetadata = {
        token role = "primvar"
    }
)
{
    uniform token info:id = "HwPrimvar_1"
    uniform token info:implementationSource = "sourceAsset"

    # Add a dummy sourceAsset attribute with sourceType="glslfx", so that 
    # an entry gets created for this deprecated shader in the registry.
    uniform asset info:glslfx:sourceAsset = @./empty.glslfx@

    token inputs:varname = "" (
        sdrMetadata = {
            bool primvarProperty = 1
        }
        doc = """The name of the primvar. Note that on the gprim, this primvar
        must follow the standard UsdGeom primvar declaration.        
        Further note that this name should not contain the UsdGeom primvar
        namespace prefix.
        """
    )
}
`},aa="/usd/usdHydra/resources";V.GetInstance().RegisterPlugins({Plugins:(ra.Plugins??[]).map(r=>({...r,ResourcePath:aa}))},{usdHydra:{"generatedSchema.usda":sa,...na}});const Rt=o((r,e={},...t)=>{const i=Object.assign(document.createElement(r),e);return i.append(...t),i},"el");function va(r){const e=Rt("button",{className:"gear",type:"button",ariaExpanded:"false"},"Settings"),t=Rt("div",{className:"settings",hidden:!0,role:"dialog",ariaLabel:r});return e.addEventListener("click",()=>{t.hidden=!t.hidden,e.ariaExpanded=String(!t.hidden)}),document.addEventListener("click",i=>{!t.hidden&&!t.contains(i.target)&&!e.contains(i.target)&&(t.hidden=!0,e.ariaExpanded="false")}),{gear:e,panel:t}}o(va,"settingsGear");async function Aa(r,e,t="application/octet-stream"){const i=new File([e],r,{type:t});if(matchMedia("(pointer: coarse)").matches&&navigator.canShare?.({files:[i]}))try{await navigator.share({files:[i]});return}catch(n){if(n.name==="AbortError")return}const s=Rt("a",{href:URL.createObjectURL(i),download:r});document.body.append(s),s.click(),s.remove(),setTimeout(()=>URL.revokeObjectURL(s.href),3e4)}o(Aa,"saveFile");const Pa=o(()=>matchMedia("(prefers-reduced-motion: reduce)").matches,"reducedMotion");export{$e as A,Y as B,F as C,sr as D,Kt as E,je as F,k as G,ya as H,nr as I,Ot as J,f as K,re as L,_ as M,mt as N,At as O,Xi as P,jt as Q,ba as R,q as S,Le as T,B as U,Da as V,ji as W,pe as X,wt as Y,Dn as a,mr as b,an as c,vt as d,Rt as e,Aa as f,b as g,Hi as h,da as i,pa as j,y as k,S as l,fa as m,Lt as n,ha as o,bs as p,xt as q,Pa as r,va as s,be as t,ma as u,U as v,d as w,ae as x,ga as y,ue as z};
