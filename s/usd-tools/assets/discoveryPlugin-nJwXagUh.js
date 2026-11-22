var Ot=Object.defineProperty;var u=(s,e)=>Ot(s,"name",{value:e,configurable:!0});import{e as H,f as et,_ as Rt,g as Ie,A as Vt,U as be,h as tt,i as Ut,j as Gt,k as Xt,R as it,T as rt,S as Ft}from"./stage-_T2MNvlO.js";import{c as Ze,u as $e,P as ae,t as xt,n as V,o as U,s as He}from"./prefetchedAssets-DskgvvEM.js";import{f as N,p as Le,h as Oe,G as A,c as Ne,I as X,D as Ht,E as Yt,l as Zt,F as _,H as me,J as De,K as $t,L as qt,M as zt}from"./value-BAthVjp4.js";import{A as qe,T as Kt,C as Q,r as Wt,a as jt,e as st,S as Qt,f as vt,h as _t,i as Jt,j as ei}from"./udimUtils-CzKjF3ry.js";import{ax as ti,E as ii,y as xe,aS as ri,aT as si,ad as oi,aU as ai,s as Be,ar as At,aa as ni,ab as li,L as ci,ah as ui}from"./layerTree-Z5kjLz09.js";const Pe=34028234663852886e22;function Se(s){return s*s}u(Se,"GfSqr");class ne{static{u(this,"GfRange1Base")}static dimension=1;dimension=1;_min=0;_max=0;_make(e,t){return new this.constructor(e,t)}_initFromArgs(e){if(e.length===0){this.setEmpty();return}if(e.length===1){const t=e[0];if(t instanceof ne){this._min=this._round(t.getMin()),this._max=this._round(t.getMax());return}throw new TypeError("GfRange1: single-argument ctor expects another range")}this._min=this._round(e[0]),this._max=this._round(e[1])}setEmpty(){this._min=Pe,this._max=-Pe}getMin(){return this._min}getMax(){return this._max}setMin(e){this._min=this._round(e)}setMax(e){this._max=this._round(e)}getSize(){return this._max-this._min}getMidpoint(){return .5*this._min+.5*this._max}IsEmpty(){return this._min>this._max}extendBy(e){return this.unionWith(e)}contains(e){return e instanceof ne?this.contains(e._min)&&this.contains(e._max):e>=this._min&&e<=this._max}isOutside(e){return e._max<this._min||e._min>this._max}static getUnion(e,t){return e._make(Math.min(e._min,t._min),Math.max(e._max,t._max))}unionWith(e){if(e instanceof ne)e._min<this._min&&(this._min=e._min),e._max>this._max&&(this._max=e._max);else{const t=this._round(e);t<this._min&&(this._min=t),t>this._max&&(this._max=t)}return this}static getIntersection(e,t){return e._make(Math.max(e._min,t._min),Math.min(e._max,t._max))}intersectWith(e){return e._min>this._min&&(this._min=e._min),e._max<this._max&&(this._max=e._max),this}getDistanceSquared(e){let t=0;return e<this._min?t+=Se(this._min-e):e>this._max&&(t+=Se(e-this._max)),t}getSum(e){return this._make(this._min+e._min,this._max+e._max)}getDifference(e){return this._make(this._min-e._max,this._max-e._min)}getMultiplied(e){return e>0?this._make(this._min*e,this._max*e):this._make(this._max*e,this._min*e)}getDivided(e){return this.getMultiplied(1/e)}addInPlace(e){return this._min=this._round(this._min+e._min),this._max=this._round(this._max+e._max),this}subtractInPlace(e){return this._min=this._round(this._min-e._max),this._max=this._round(this._max-e._min),this}multiplyInPlace(e){if(e>0)this._min=this._round(this._min*e),this._max=this._round(this._max*e);else{const t=this._min;this._min=this._round(this._max*e),this._max=this._round(t*e)}return this}divideInPlace(e){return this.multiplyInPlace(1/e)}equals(e){return this._min===this._round(e.getMin())&&this._max===this._round(e.getMax())}hash(){return`${this._min};${this._max}`}toString(){return`[${this._min}...${this._max}]`}repr(){return`Gf.${this.constructor.name}(${this._min}, ${this._max})`}}class ur extends ne{static{u(this,"GfRange1d")}constructor(...e){super(),this._initFromArgs(e)}_round(e){return e}}class dr extends ne{static{u(this,"GfRange1f")}constructor(...e){super(),this._initFromArgs(e)}_round(e){return Math.fround(e)}}class le{static{u(this,"GfRangeVecBase")}_min;_max;get dimension(){return this._min.dimension}_vec(e){return new this._vecCtor(e)}_make(e,t){return new this.constructor(e,t)}_initFromArgs(e){if(e.length===0){this.setEmpty();return}if(e.length===1){const t=e[0];if(t instanceof le){this._min=this._vec(t.getMin()),this._max=this._vec(t.getMax());return}throw new TypeError("GfRange: single-argument ctor expects another range")}this._min=this._vec(e[0]),this._max=this._vec(e[1])}_componentwise(e,t,i){const r=e.data,o=t.data;return this._vec(r.map((a,l)=>i(a,o[l])))}setEmpty(){this._min=new this._vecCtor(Pe),this._max=new this._vecCtor(-Pe)}getMin(){return this._min}getMax(){return this._max}setMin(e){this._min=this._vec(e)}setMax(e){this._max=this._vec(e)}getSize(){return this._max.subtract(this._min)}getMidpoint(){return this._min.getScaled(.5).add(this._max.getScaled(.5))}IsEmpty(){const e=this._min.data,t=this._max.data;for(let i=0;i<e.length;i++)if(e[i]>t[i])return!0;return!1}extendBy(e){return this.unionWith(e)}contains(e){if(e instanceof le)return this.contains(e._min)&&this.contains(e._max);const t=e.data,i=this._min.data,r=this._max.data;for(let o=0;o<t.length;o++)if(!(t[o]>=i[o]&&t[o]<=r[o]))return!1;return!0}isOutside(e){const t=e._min.data,i=e._max.data,r=this._min.data,o=this._max.data;for(let a=0;a<r.length;a++)if(i[a]<r[a]||t[a]>o[a])return!0;return!1}static getUnion(e,t){const i=e._componentwise(e._min,t._min,Math.min),r=e._componentwise(e._max,t._max,Math.max);return e._make(i,r)}unionWith(e){return e instanceof le?(this._min=this._componentwise(this._min,e._min,Math.min),this._max=this._componentwise(this._max,e._max,Math.max)):(this._min=this._componentwise(this._min,e,Math.min),this._max=this._componentwise(this._max,e,Math.max)),this}static getIntersection(e,t){const i=e._componentwise(e._min,t._min,Math.max),r=e._componentwise(e._max,t._max,Math.min);return e._make(i,r)}intersectWith(e){return this._min=this._componentwise(this._min,e._min,Math.max),this._max=this._componentwise(this._max,e._max,Math.min),this}getDistanceSquared(e){let t=0;const i=e.data,r=this._min.data,o=this._max.data;for(let a=0;a<i.length;a++)i[a]<r[a]?t+=Se(r[a]-i[a]):i[a]>o[a]&&(t+=Se(i[a]-o[a]));return t}getSum(e){return this._make(this._min.add(e._min),this._max.add(e._max))}getDifference(e){return this._make(this._min.subtract(e._max),this._max.subtract(e._min))}getMultiplied(e){return e>0?this._make(this._min.getScaled(e),this._max.getScaled(e)):this._make(this._max.getScaled(e),this._min.getScaled(e))}getDivided(e){return this.getMultiplied(1/e)}addInPlace(e){return this._min=this._min.add(e._min),this._max=this._max.add(e._max),this}subtractInPlace(e){return this._min=this._min.subtract(e._max),this._max=this._max.subtract(e._min),this}multiplyInPlace(e){if(e>0)this._min=this._min.getScaled(e),this._max=this._max.getScaled(e);else{const t=this._min;this._min=this._max.getScaled(e),this._max=t.getScaled(e)}return this}divideInPlace(e){return this.multiplyInPlace(1/e)}equals(e){return this._min.equals(this._vec(e.getMin()))&&this._max.equals(this._vec(e.getMax()))}hash(){return`${this._min.data.join(",")};${this._max.data.join(",")}`}toString(){return`[${this._min.toString()}...${this._max.toString()}]`}repr(){return`Gf.${this.constructor.name}(${this._min.repr()}, ${this._max.repr()})`}}class It extends le{static{u(this,"GfRange2Base")}getCorner(e){if(e<0||e>3)throw new Error(`Invalid corner ${e} > 3.`);const t=this._min.data,i=this._max.data;return this._vec([(e&1?i:t)[0],(e&2?i:t)[1]])}getQuadrant(e){if(e<0||e>3)throw new Error(`Invalid quadrant ${e} > 3.`);const t=this.getCorner(e).data,i=this._min.add(this._max).getScaled(.5).data;return this._make(this._vec([Math.min(t[0],i[0]),Math.min(t[1],i[1])]),this._vec([Math.max(t[0],i[0]),Math.max(t[1],i[1])]))}}class Tt extends It{static{u(this,"GfRange2d")}constructor(...e){super(),this._initFromArgs(e)}get _vecCtor(){return Oe}static get unitSquare(){return new Tt(new Oe(0,0),new Oe(1,1))}}class wt extends It{static{u(this,"GfRange2f")}constructor(...e){super(),this._initFromArgs(e)}get _vecCtor(){return Le}static get unitSquare(){return new wt(new Le(0,0),new Le(1,1))}}class di extends le{static{u(this,"GfRange3Base")}getCorner(e){if(e<0||e>7)throw new Error(`Invalid corner ${e} > 7.`);const t=this._min.data,i=this._max.data;return this._vec([(e&1?i:t)[0],(e&2?i:t)[1],(e&4?i:t)[2]])}getOctant(e){if(e<0||e>7)throw new Error(`Invalid octant ${e} > 7.`);const t=this.getCorner(e).data,i=this._min.add(this._max).getScaled(.5).data;return this._make(this._vec([Math.min(t[0],i[0]),Math.min(t[1],i[1]),Math.min(t[2],i[2])]),this._vec([Math.max(t[0],i[0]),Math.max(t[1],i[1]),Math.max(t[2],i[2])]))}}class S extends di{static{u(this,"GfRange3d")}constructor(...e){super(),this._initFromArgs(e)}get _vecCtor(){return N}static get unitCube(){return new S(new N(0,0,0),new N(1,1,1))}}const ot=1e-13;class y{static{u(this,"GfBBox3d")}_box;_matrix;_inverse;_isDegenerate;_hasZeroAreaPrimitives;constructor(e,t){if(this._box=new S,this._matrix=new A,this._inverse=new A,this._isDegenerate=!1,this._hasZeroAreaPrimitives=!1,e===void 0){this._matrix.setIdentity(),this._inverse.setIdentity();return}if(e instanceof y){this._box=new S(e._box),this._matrix=new A(e._matrix),this._inverse=new A(e._inverse),this._isDegenerate=e._isDegenerate,this._hasZeroAreaPrimitives=e._hasZeroAreaPrimitives;return}this._box=new S(e),t===void 0?(this._matrix.setIdentity(),this._inverse.setIdentity()):this._setMatrices(t)}Set(e,t){return this._box=new S(e),this._setMatrices(t),this}setMatrix(e){return this._setMatrices(e),this}setRange(e){return this._box=new S(e),this}getRange(){return new S(this._box)}_getRangeConstRef(){return this._box}_getMatrixConstRef(){return this._matrix}_getInverseMatrixConstRef(){return this._inverse}getBox(){return this.getRange()}getMatrix(){return new A(this._matrix)}getInverseMatrix(){return new A(this._inverse)}setHasZeroAreaPrimitives(e){return this._hasZeroAreaPrimitives=e,this}hasZeroAreaPrimitives(){return this._hasZeroAreaPrimitives}getVolume(){if(this._box.IsEmpty())return 0;const e=this._box.getSize().data;return Math.abs(this._matrix.getDeterminant3()*e[0]*e[1]*e[2])}Transform(e){return this._setMatrices(this._matrix.getMultiply(e)),this}ComputeAlignedRange(){if(this._box.IsEmpty())return new S(this._box);const e=this._matrix,t=[e.getElement(3,0),e.getElement(3,1),e.getElement(3,2)],i=[t[0],t[1],t[2]],r=[t[0],t[1],t[2]],o=this._box.getMin().data,a=this._box.getMax().data;for(let l=0;l<3;l++)for(let n=0;n<3;n++){const d=e.getElement(n,l),h=o[n]*d,p=a[n]*d;h<p?(i[l]+=h,r[l]+=p):(i[l]+=p,r[l]+=h)}return new S(new N(...i),new N(...r))}computeAlignedBox(){return this.ComputeAlignedRange()}computeCentroid(){const e=this.getRange().getMax(),t=this.getRange().getMin(),i=e.add(t).getScaled(.5);return this.getMatrix().Transform(i)}static combine(e,t){let i;if(e.getRange().IsEmpty())i=new y(t);else if(t.getRange().IsEmpty())i=new y(e);else if(e._isDegenerate)t._isDegenerate?i=new y(S.getUnion(e.ComputeAlignedRange(),t.ComputeAlignedRange())):i=y._combineInOrder(t,e);else if(t._isDegenerate)i=y._combineInOrder(e,t);else{const r=y._combineInOrder(e,t),o=y._combineInOrder(t,e),a=r.getVolume(),l=o.getVolume(),n=Math.max(1e-10,1e-6*Math.abs(Math.max(a,l)));i=Math.abs(a-l)<=n||a<l?r:o}return i.setHasZeroAreaPrimitives(e.hasZeroAreaPrimitives()||t.hasZeroAreaPrimitives()),i}static _combineInOrder(e,t){const i=new y;i._box=new S(t._box),i._matrix=t._matrix.getMultiply(e._inverse),i._inverse=e._matrix.getMultiply(t._inverse);const r=i.ComputeAlignedRange(),o=new y(e);return o._box.unionWith(r),o}_setMatrices(e){this._isDegenerate=!1,this._matrix=new A(e);const t=e.getDeterminant();this._inverse=e.getInverse(ot),Math.abs(t)<=ot&&(this._isDegenerate=!0,this._inverse.setIdentity())}equals(e){return this._box.equals(e._box)&&this._matrix.equals(e._matrix)}hash(){return`${this._box.hash()}|${this._matrix.hash()}`}toString(){return`[(${this._box.toString()}) (${this._matrix.toString()}) ${this._hasZeroAreaPrimitives?"true":"false"}]`}repr(){return`Gf.BBox3d(${this._box.repr()}, ${this._matrix.repr()})`}}const P=Object.freeze({apiSchemas:"apiSchemas",automatic:"automatic",clips:"clips",clipSets:"clipSets",collection:"collection",collection_MultipleApplyTemplate_:"collection:__INSTANCE_NAME__",collection_MultipleApplyTemplate_Excludes:"collection:__INSTANCE_NAME__:excludes",collection_MultipleApplyTemplate_ExpansionRule:"collection:__INSTANCE_NAME__:expansionRule",collection_MultipleApplyTemplate_IncludeRoot:"collection:__INSTANCE_NAME__:includeRoot",collection_MultipleApplyTemplate_Includes:"collection:__INSTANCE_NAME__:includes",collection_MultipleApplyTemplate_MembershipExpression:"collection:__INSTANCE_NAME__:membershipExpression",collection_MultipleApplyTemplate_Mode:"collection:__INSTANCE_NAME__:mode",colorSpaceDefinition:"colorSpaceDefinition",colorSpaceDefinition_MultipleApplyTemplate_BlueChroma:"colorSpaceDefinition:__INSTANCE_NAME__:blueChroma",colorSpaceDefinition_MultipleApplyTemplate_Gamma:"colorSpaceDefinition:__INSTANCE_NAME__:gamma",colorSpaceDefinition_MultipleApplyTemplate_GreenChroma:"colorSpaceDefinition:__INSTANCE_NAME__:greenChroma",colorSpaceDefinition_MultipleApplyTemplate_LinearBias:"colorSpaceDefinition:__INSTANCE_NAME__:linearBias",colorSpaceDefinition_MultipleApplyTemplate_Name:"colorSpaceDefinition:__INSTANCE_NAME__:name",colorSpaceDefinition_MultipleApplyTemplate_RedChroma:"colorSpaceDefinition:__INSTANCE_NAME__:redChroma",colorSpaceDefinition_MultipleApplyTemplate_WhitePoint:"colorSpaceDefinition:__INSTANCE_NAME__:whitePoint",colorSpaceName:"colorSpace:name",custom:"custom",exclude:"exclude",expandPrims:"expandPrims",expandPrimsAndProperties:"expandPrimsAndProperties",explicitOnly:"explicitOnly",expression:"expression",fallbackPrimTypes:"fallbackPrimTypes",relationship:"relationship",APISchemaBase:"APISchemaBase",ClipsAPI:"ClipsAPI",CollectionAPI:"CollectionAPI",ColorSpaceAPI:"ColorSpaceAPI",ColorSpaceDefinitionAPI:"ColorSpaceDefinitionAPI",ModelAPI:"ModelAPI",Typed:"Typed"});function pi(s){const e=[];let t=s;for(;t&&(e.push(t),t!=="/");){const i=t.lastIndexOf("/");t=i<=0?"/":t.slice(0,i)}return e}u(pi,"ancestorsInclusive");class ke{static{u(this,"CollectionMembershipQuery")}constructor(e,t,i){this._ruleMap=e,this._expressionMatch=t,this._expressionStage=i}_hasExpression(){return this._expressionStage!==void 0}_getExpressionStage(){return this._expressionStage}getAsPathExpansionRuleMap(){return new Map(this._ruleMap)}equals(e){if(!this.usesPathExpansionRuleMap()||!e.usesPathExpansionRuleMap())return!1;const t=e.getAsPathExpansionRuleMap();return this._ruleMap.size===t.size&&[...this._ruleMap].every(([i,r])=>t.get(i)===r)}hash(){return JSON.stringify([...this._ruleMap].sort(([e],[t])=>e.localeCompare(t)))}hasExcludes(){return[...this._ruleMap.values()].includes("exclude")}usesPathExpansionRuleMap(){return this._expressionMatch===void 0}static compute(e,t){const i=`collection:${t}:`,r=e.getAttr(`${i}expansionRule`)?.getValue(),o=r==="explicitOnly"||r==="expandPrimsAndProperties"?r:"expandPrims",a=new Map;for(const l of e.getAttr(`${i}includes`)?.getTargets()??[])a.set(l,o);e.getAttr(`${i}includeRoot`)?.getValue()===!0&&a.set("/",o);for(const l of e.getAttr(`${i}excludes`)?.getTargets()??[])a.set(l,"exclude");return new ke(a)}isPathIncluded(e){if(!e.startsWith("/"))throw new Error(`IsPathIncluded: path <${e}> is not absolute`);if(this._expressionMatch)return this._expressionMatch(e);for(const t of pi(e.includes(".")?e.slice(0,e.indexOf(".")):e)){const i=this._ruleMap.get(t);if(i!==void 0){if(i==="exclude")return!1;if(i==="expandPrimsAndProperties")return!0;if(e.includes(".")&&i==="expandPrims")return!1;if(i!=="explicitOnly"||t===e)return!0}}return!1}}function E(s,e){return H.makeMultipleApplyNameInstance(e,s)}u(E,"_namespacedPropertyName");class T extends qe{static{u(this,"CollectionAPI")}static typeName="CollectionAPI";_name;constructor(e,t,i=""){super(e,t),this._name=i}getName(){return this._name}static get(e,t){if(!("getPrim"in e))return new T(e,e.getStage(),t);const i=T.isCollectionAPIPath(t);return i===void 0?new T(void 0,e):new T(e.getPrim(t.slice(0,t.indexOf("."))),e,i)}static getAll(e){const t="CollectionAPI:";return e.getAppliedSchemas().filter(i=>i.startsWith(t)).map(i=>new T(e,e.getStage(),i.slice(t.length)))}static isSchemaPropertyBaseName(e){return[H.getMultipleApplyNameTemplateBaseName(P.collection_MultipleApplyTemplate_ExpansionRule),H.getMultipleApplyNameTemplateBaseName(P.collection_MultipleApplyTemplate_IncludeRoot),H.getMultipleApplyNameTemplateBaseName(P.collection_MultipleApplyTemplate_MembershipExpression),H.getMultipleApplyNameTemplateBaseName(P.collection_MultipleApplyTemplate_Mode),H.getMultipleApplyNameTemplateBaseName(P.collection_MultipleApplyTemplate_),H.getMultipleApplyNameTemplateBaseName(P.collection_MultipleApplyTemplate_Includes),H.getMultipleApplyNameTemplateBaseName(P.collection_MultipleApplyTemplate_Excludes)].includes(e)}static isCollectionAPIPath(e){const t=e.lastIndexOf(".");if(t<0||e.slice(t+1).includes("["))return;const i=e.slice(t+1),r=i.split(":");if(!T.isSchemaPropertyBaseName(r[r.length-1])&&r.length>=2&&r[0]==="collection")return i.slice(11)}isValid(){return super.isValid()&&this._name!==""&&this.prim.hasAPI(T.typeName,this._name)}static canApply(e,t){return e.canApplyAPI(T.typeName,t)}static apply(e,t){return e.applyAPI(T.typeName,t)?new T(e,e.getStage(),t):new T(void 0,e.getStage())}static getSchemaAttributeNames(e=!0,t=""){const i=e?["collection:__INSTANCE_NAME__:expansionRule","collection:__INSTANCE_NAME__:includeRoot","collection:__INSTANCE_NAME__:membershipExpression","collection:__INSTANCE_NAME__:mode","collection:__INSTANCE_NAME__"]:["collection:__INSTANCE_NAME__:expansionRule","collection:__INSTANCE_NAME__:includeRoot","collection:__INSTANCE_NAME__:membershipExpression","collection:__INSTANCE_NAME__:mode","collection:__INSTANCE_NAME__"];return t===""?i:i.map(r=>H.makeMultipleApplyNameInstance(r,t))}getExpansionRuleAttr(){return this.prim.getAttr(E(this._name,P.collection_MultipleApplyTemplate_ExpansionRule))}createExpansionRuleAttr(e,t=!1){return this._createAttr(E(this._name,P.collection_MultipleApplyTemplate_ExpansionRule),"token",!1,"uniform",e,t)}getIncludeRootAttr(){return this.prim.getAttr(E(this._name,P.collection_MultipleApplyTemplate_IncludeRoot))}createIncludeRootAttr(e,t=!1){return this._createAttr(E(this._name,P.collection_MultipleApplyTemplate_IncludeRoot),"bool",!1,"uniform",e,t)}getMembershipExpressionAttr(){return this.prim.getAttr(E(this._name,P.collection_MultipleApplyTemplate_MembershipExpression))}createMembershipExpressionAttr(e,t=!1){return this._createAttr(E(this._name,P.collection_MultipleApplyTemplate_MembershipExpression),"pathExpression",!1,"uniform",e,t)}getModeAttr(){return this.prim.getAttr(E(this._name,P.collection_MultipleApplyTemplate_Mode))}createModeAttr(e,t=!1){return this._createAttr(E(this._name,P.collection_MultipleApplyTemplate_Mode),"token",!1,"uniform",e,t)}getCollectionAttr(){return this.prim.getAttr(E(this._name,P.collection_MultipleApplyTemplate_))}createCollectionAttr(e,t=!1){return this._createAttr(E(this._name,P.collection_MultipleApplyTemplate_),"opaque",!1,"uniform",e,t)}getIncludesRel(){return this.prim.rel(E(this._name,P.collection_MultipleApplyTemplate_Includes))}createIncludesRel(){return this.prim.createRelationship(E(this._name,P.collection_MultipleApplyTemplate_Includes),!1)}getExcludesRel(){return this.prim.rel(E(this._name,P.collection_MultipleApplyTemplate_Excludes))}createExcludesRel(){return this.prim.createRelationship(E(this._name,P.collection_MultipleApplyTemplate_Excludes),!1)}static getCollection(e,t){return"getStage"in e,T.get(e,t)}static getNamedCollectionPath(e,t){return`${e.path}.collection:${t}`}static getAllCollections(e){return T.getAll(e)}static canContainPropertyName(e){return e==="collection"||e.startsWith("collection:")}getCollectionPath(){return T.getNamedCollectionPath(this.prim,this._name)}_expansionRule(){const e=this.getExpansionRuleAttr().get();return e==="explicitOnly"||e==="expandPrimsAndProperties"?e:"expandPrims"}_includeRoot(){const e=this.getIncludeRootAttr();return e.hasAuthoredValue(),e.get()===!0}_computeRuleMap(e){const t=`${this.prim.path}:${this._name}`;if(e.has(t))return new Map;e.add(t);const i=new Map,r=this._expansionRule();for(const o of this.getIncludesRel().getTargets())if(T.isCollectionAPIPath(o)){const a=T.get(this.stage,o);for(const[l,n]of a._computeRuleMap(e))i.set(l,n)}else i.set(o,r);this._includeRoot()&&i.set("/",r);for(const o of this.getExcludesRel().getTargets())i.set(o,"exclude");return e.delete(t),i}computeMembershipQuery(){if(this.isInExpressionMode()){const e=this._resolveMembershipExpression(new Set);return new ke(new Map,e?t=>e.match(ti.fromString(t),()=>ii.makeVarying(!0)).GetValue():()=>!1,e?this.stage:void 0)}return new ke(this._computeRuleMap(new Set))}static computeMembershipQuery(e){return e.computeMembershipQuery()}computeIncludedPaths(){return T.computeIncludedPaths(this.computeMembershipQuery(),this.stage)}computeIncludedObjects(){return this.computeIncludedPaths()}static computeIncludedPaths(e,t,i=et){const r=[];if(!e.usesPathExpansionRuleMap()&&e._hasExpression()&&e._getExpressionStage()!==t)throw new Ze(`Stage mismatch - collection from stage '${at(e._getExpressionStage())}' cannot match objects on stage '${at(t)}'`,$e.CodingError);for(const o of t.traverse(i)){e.isPathIncluded(o)&&r.push(o);for(const a of t.getPrim(o)?.attrNames??[]){const l=`${o}.${a}`;e.isPathIncluded(l)&&r.push(l)}}return r}static computeIncludedObjects(e,t,i=et){return T.computeIncludedPaths(e,t,i)}includePath(e){return this.computeMembershipQuery().isPathIncluded(e)?!0:e==="/"?(this.createIncludeRootAttr(!0),!0):(this.getExcludesRel().setTargets(this.getExcludesRel().getTargets().filter(t=>t!==e)),this.getIncludesRel().addTarget(e),!0)}excludePath(e){return e==="/"?(this.createIncludeRootAttr(!1),!0):(this.getIncludesRel().setTargets(this.getIncludesRel().getTargets().filter(t=>t!==e)),this.getExcludesRel().addTarget(e),!0)}hasNoIncludedPaths(){const e=this.getMembershipExpressionAttr().get();return this.getIncludesRel().getTargets().length===0&&!this._includeRoot()&&(e==null||e==="")}isInRelationshipsMode(){const e=this.getModeAttr().get();return e==="relationship"?!0:e==="expression"?!1:this._includeRoot()||this.getIncludesRel().getTargets().length>0||this.getExcludesRel().getTargets().length>0}isInExpressionMode(){return!this.isInRelationshipsMode()}_resolveMembershipExpression(e){const t=`${this.prim.path}:${this._name}`;if(e.has(t))return xe.Nothing();const i=this.getMembershipExpressionAttr().get(),r=i instanceof xe?i:typeof i=="string"?new xe(i):void 0;if(!r)return;e.add(t);const o=r.resolveReferences(a=>{const l=a.path.isEmpty()?this.prim.path:a.path.pathString;return T.get(this.stage,`${l}.collection:${a.name}`)._resolveMembershipExpression(e)??xe.Nothing()});return e.delete(t),o}resolveCompleteMembershipExpression(){return this._resolveMembershipExpression(new Set)?.getText()}validate(){const e=this.getExpansionRuleAttr().get();return(e===void 0||e==="explicitOnly"||e==="expandPrims"||e==="expandPrimsAndProperties")&&!this._containsCycle(new Set,new Set)}_containsCycle(e,t){const i=`${this.prim.path}:${this._name}`;if(t.has(i))return!0;if(e.has(i))return!1;e.add(i),t.add(i);for(const r of this.getIncludesRel().getTargets())if(T.isCollectionAPIPath(r)&&T.get(this.stage,r)._containsCycle(e,t))return!0;return t.delete(i),!1}resetCollection(){return this.getIncludesRel().setTargets([]),this.getExcludesRel().setTargets([]),this.getMembershipExpressionAttr().clear(),!0}blockCollection(){return this.getIncludesRel().setTargets([]),this.getExcludesRel().setTargets([]),this.getMembershipExpressionAttr().set(null),!0}}function at(s){const e=s.getSessionLayer();return`stage with rootLayer @${s.getRootLayer().identifier}@`+(e?`, sessionLayer @${e.identifier}@`:"")}u(at,"usdDescribeStage");const hi={Plugins:[{Info:{SdfMetadata:{constraintTargetIdentifier:{appliesTo:["attributes"],default:"",documentation:"Unique identifier within a model's namespace for an matrix-valued attribute representing a constraint target",type:"token"},elementSize:{appliesTo:["attributes"],default:1,displayGroup:"Primvars",documentation:"The number of values in a primvar's value array that must be aggregated for each element on the primitive.",type:"int"},inactiveIds:{appliesTo:["prims"],type:"int64listop"},interpolation:{appliesTo:["attributes"],default:"constant",displayGroup:"Primvars",documentation:"How a primvar interpolates across a primitive; equivalent to RenderMan's 'class specifier'",type:"token"},metersPerUnit:{appliesTo:["layers"],default:.01,displayGroup:"Stage",type:"double"},unauthoredValuesIndex:{appliesTo:["attributes"],default:-1,displayGroup:"Primvars",documentation:"The index that represents unauthored values in the indices array of an indexed primvar.",type:"int"},upAxis:{appliesTo:["layers"],default:"Y",displayGroup:"Stage",type:"token"}},Types:{UsdGeomBackPlateAPI:{alias:{UsdSchemaBase:"BackPlateAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"BackPlateAPI",schemaKind:"multipleApplyAPI"},UsdGeomBasisCurves:{alias:{UsdSchemaBase:"BasisCurves"},autoGenerated:!0,bases:["UsdGeomCurves"],schemaIdentifier:"BasisCurves",schemaKind:"concreteTyped"},UsdGeomBoundable:{alias:{UsdSchemaBase:"Boundable"},autoGenerated:!0,bases:["UsdGeomXformable"],schemaIdentifier:"Boundable",schemaKind:"abstractTyped"},UsdGeomCamera:{alias:{UsdSchemaBase:"Camera"},autoGenerated:!0,bases:["UsdGeomXformable"],schemaIdentifier:"Camera",schemaKind:"concreteTyped"},UsdGeomCapsule:{alias:{UsdSchemaBase:"Capsule"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Capsule",schemaKind:"concreteTyped"},UsdGeomCapsule_1:{alias:{UsdSchemaBase:"Capsule_1"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Capsule_1",schemaKind:"concreteTyped"},UsdGeomCone:{alias:{UsdSchemaBase:"Cone"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Cone",schemaKind:"concreteTyped"},UsdGeomCube:{alias:{UsdSchemaBase:"Cube"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Cube",schemaKind:"concreteTyped"},UsdGeomCurves:{alias:{UsdSchemaBase:"Curves"},autoGenerated:!0,bases:["UsdGeomPointBased"],implementsComputeExtent:!0,schemaIdentifier:"Curves",schemaKind:"abstractTyped"},UsdGeomCylinder:{alias:{UsdSchemaBase:"Cylinder"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Cylinder",schemaKind:"concreteTyped"},UsdGeomCylinder_1:{alias:{UsdSchemaBase:"Cylinder_1"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Cylinder_1",schemaKind:"concreteTyped"},UsdGeomGprim:{alias:{UsdSchemaBase:"Gprim"},autoGenerated:!0,bases:["UsdGeomBoundable"],schemaIdentifier:"Gprim",schemaKind:"abstractTyped"},UsdGeomHermiteCurves:{alias:{UsdSchemaBase:"HermiteCurves"},autoGenerated:!0,bases:["UsdGeomCurves"],schemaIdentifier:"HermiteCurves",schemaKind:"concreteTyped"},UsdGeomImageable:{alias:{UsdSchemaBase:"Imageable"},autoGenerated:!0,bases:["UsdTyped"],schemaIdentifier:"Imageable",schemaKind:"abstractTyped"},UsdGeomMesh:{alias:{UsdSchemaBase:"Mesh"},autoGenerated:!0,bases:["UsdGeomPointBased"],schemaIdentifier:"Mesh",schemaKind:"concreteTyped"},UsdGeomModelAPI:{alias:{UsdSchemaBase:"GeomModelAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"GeomModelAPI",schemaKind:"singleApplyAPI"},UsdGeomMotionAPI:{alias:{UsdSchemaBase:"MotionAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"MotionAPI",schemaKind:"singleApplyAPI"},UsdGeomNurbsCurves:{alias:{UsdSchemaBase:"NurbsCurves"},autoGenerated:!0,bases:["UsdGeomCurves"],schemaIdentifier:"NurbsCurves",schemaKind:"concreteTyped"},UsdGeomNurbsPatch:{alias:{UsdSchemaBase:"NurbsPatch"},autoGenerated:!0,bases:["UsdGeomPointBased"],schemaIdentifier:"NurbsPatch",schemaKind:"concreteTyped"},UsdGeomPlane:{alias:{UsdSchemaBase:"Plane"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Plane",schemaKind:"concreteTyped"},UsdGeomPointBased:{alias:{UsdSchemaBase:"PointBased"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"PointBased",schemaKind:"abstractTyped"},UsdGeomPointInstancer:{alias:{UsdSchemaBase:"PointInstancer"},autoGenerated:!0,bases:["UsdGeomBoundable"],implementsComputeExtent:!0,schemaIdentifier:"PointInstancer",schemaKind:"concreteTyped"},UsdGeomPoints:{alias:{UsdSchemaBase:"Points"},autoGenerated:!0,bases:["UsdGeomPointBased"],implementsComputeExtent:!0,schemaIdentifier:"Points",schemaKind:"concreteTyped"},UsdGeomPrimvarsAPI:{alias:{UsdSchemaBase:"PrimvarsAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"PrimvarsAPI",schemaKind:"nonAppliedAPI"},UsdGeomScope:{alias:{UsdSchemaBase:"Scope"},autoGenerated:!0,bases:["UsdGeomImageable"],schemaIdentifier:"Scope",schemaKind:"concreteTyped"},UsdGeomSphere:{alias:{UsdSchemaBase:"Sphere"},autoGenerated:!0,bases:["UsdGeomGprim"],implementsComputeExtent:!0,schemaIdentifier:"Sphere",schemaKind:"concreteTyped"},UsdGeomSubset:{alias:{UsdSchemaBase:"GeomSubset"},autoGenerated:!0,bases:["UsdTyped"],schemaIdentifier:"GeomSubset",schemaKind:"concreteTyped"},UsdGeomTetMesh:{alias:{UsdSchemaBase:"TetMesh"},autoGenerated:!0,bases:["UsdGeomPointBased"],schemaIdentifier:"TetMesh",schemaKind:"concreteTyped"},UsdGeomVisibilityAPI:{alias:{UsdSchemaBase:"VisibilityAPI"},apiSchemaCanOnlyApplyTo:["Imageable"],autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"VisibilityAPI",schemaKind:"singleApplyAPI"},UsdGeomXform:{alias:{UsdSchemaBase:"Xform"},autoGenerated:!0,bases:["UsdGeomXformable"],schemaIdentifier:"Xform",schemaKind:"concreteTyped"},UsdGeomXformCommonAPI:{alias:{UsdSchemaBase:"XformCommonAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"XformCommonAPI",schemaKind:"nonAppliedAPI"},UsdGeomXformable:{alias:{UsdSchemaBase:"Xformable"},autoGenerated:!0,bases:["UsdGeomImageable"],schemaIdentifier:"Xformable",schemaKind:"abstractTyped"}}},LibraryPath:"@PLUG_INFO_LIBRARY_PATH@",Name:"usdGeom",ResourcePath:"@PLUG_INFO_RESOURCE_PATH@",Root:"@PLUG_INFO_ROOT@",Type:"library"}]},mi=`#usda 1.0
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

`;ae.GetInstance().RegisterPlugins(hi,{usdGeom:{"generatedSchema.usda":mi}});const g=Object.freeze({accelerations:"accelerations",all:"all",angularVelocities:"angularVelocities",axis:"axis",backPlate:"backPlate",backPlate_MultipleApplyTemplate_AlphaImage:"backPlate:__INSTANCE_NAME__:alpha:image",backPlate_MultipleApplyTemplate_DepthCameraSpaceOffset:"backPlate:__INSTANCE_NAME__:depth:cameraSpaceOffset",backPlate_MultipleApplyTemplate_DepthImage:"backPlate:__INSTANCE_NAME__:depth:image",backPlate_MultipleApplyTemplate_DepthMinOffset:"backPlate:__INSTANCE_NAME__:depth:minOffset",backPlate_MultipleApplyTemplate_DepthNormalizingFactor:"backPlate:__INSTANCE_NAME__:depth:normalizingFactor",backPlate_MultipleApplyTemplate_Image:"backPlate:__INSTANCE_NAME__:image",backPlate_MultipleApplyTemplate_LumaOffset:"backPlate:__INSTANCE_NAME__:luma:offset",backPlate_MultipleApplyTemplate_LumaPower:"backPlate:__INSTANCE_NAME__:luma:power",backPlate_MultipleApplyTemplate_LumaSlope:"backPlate:__INSTANCE_NAME__:luma:slope",backPlate_MultipleApplyTemplate_PlateVisibility:"backPlate:__INSTANCE_NAME__:plateVisibility",backPlate_MultipleApplyTemplate_RotateXYZTweak:"backPlate:__INSTANCE_NAME__:rotateXYZ:tweak",backPlate_MultipleApplyTemplate_ScaleTweak:"backPlate:__INSTANCE_NAME__:scale:tweak",backPlate_MultipleApplyTemplate_TranslateTweak:"backPlate:__INSTANCE_NAME__:translate:tweak",basis:"basis",bezier:"bezier",bilinear:"bilinear",boundaries:"boundaries",bounds:"bounds",box:"box",bspline:"bspline",cards:"cards",catmullClark:"catmullClark",catmullRom:"catmullRom",clippingPlanes:"clippingPlanes",clippingRange:"clippingRange",closed:"closed",constant:"constant",cornerIndices:"cornerIndices",cornerSharpnesses:"cornerSharpnesses",cornersOnly:"cornersOnly",cornersPlus1:"cornersPlus1",cornersPlus2:"cornersPlus2",creaseIndices:"creaseIndices",creaseLengths:"creaseLengths",creaseSharpnesses:"creaseSharpnesses",cross:"cross",cubic:"cubic",curveVertexCounts:"curveVertexCounts",default_:"default",doubleSided:"doubleSided",edge:"edge",edgeAndCorner:"edgeAndCorner",edgeOnly:"edgeOnly",elementSize:"elementSize",elementType:"elementType",exposure:"exposure",exposureFStop:"exposure:fStop",exposureIso:"exposure:iso",exposureResponsivity:"exposure:responsivity",exposureTime:"exposure:time",extent:"extent",extentsHint:"extentsHint",face:"face",faceVarying:"faceVarying",faceVaryingLinearInterpolation:"faceVaryingLinearInterpolation",faceVertexCounts:"faceVertexCounts",faceVertexIndices:"faceVertexIndices",familyName:"familyName",focalLength:"focalLength",focusDistance:"focusDistance",fromTexture:"fromTexture",fStop:"fStop",full:"full",guide:"guide",guideVisibility:"guideVisibility",height:"height",hermite:"hermite",holeIndices:"holeIndices",horizontalAperture:"horizontalAperture",horizontalApertureOffset:"horizontalApertureOffset",ids:"ids",inactiveIds:"inactiveIds",indices:"indices",inherited:"inherited",interpolateBoundary:"interpolateBoundary",interpolation:"interpolation",invisible:"invisible",invisibleIds:"invisibleIds",knots:"knots",left:"left",leftHanded:"leftHanded",length:"length",linear:"linear",loop:"loop",metersPerUnit:"metersPerUnit",modelApplyDrawMode:"model:applyDrawMode",modelCardGeometry:"model:cardGeometry",modelCardTextureXNeg:"model:cardTextureXNeg",modelCardTextureXPos:"model:cardTextureXPos",modelCardTextureYNeg:"model:cardTextureYNeg",modelCardTextureYPos:"model:cardTextureYPos",modelCardTextureZNeg:"model:cardTextureZNeg",modelCardTextureZPos:"model:cardTextureZPos",modelCardVisibility:"model:cardVisibility",modelDrawMode:"model:drawMode",modelDrawModeColor:"model:drawModeColor",mono:"mono",motionBlurScale:"motion:blurScale",motionNonlinearSampleCount:"motion:nonlinearSampleCount",motionVelocityScale:"motion:velocityScale",mute:"mute",none:"none",nonOverlapping:"nonOverlapping",nonperiodic:"nonperiodic",normals:"normals",open:"open",order:"order",orientation:"orientation",orientations:"orientations",orientationsf:"orientationsf",origin:"origin",orthographic:"orthographic",partition:"partition",periodic:"periodic",perspective:"perspective",pinned:"pinned",pivot:"pivot",point:"point",points:"points",pointWeights:"pointWeights",positions:"positions",power:"power",primvarsDisplayColor:"primvars:displayColor",primvarsDisplayOpacity:"primvars:displayOpacity",projection:"projection",protoIndices:"protoIndices",prototypes:"prototypes",proxy:"proxy",proxyPrim:"proxyPrim",proxyVisibility:"proxyVisibility",purpose:"purpose",radius:"radius",radiusBottom:"radiusBottom",radiusTop:"radiusTop",ranges:"ranges",render:"render",renderVisibility:"renderVisibility",right:"right",rightHanded:"rightHanded",scales:"scales",segment:"segment",shutterClose:"shutter:close",shutterOpen:"shutter:open",simple:"simple",size:"size",smooth:"smooth",solo:"solo",stereoRole:"stereoRole",subdivisionScheme:"subdivisionScheme",surfaceFaceVertexIndices:"surfaceFaceVertexIndices",tangents:"tangents",tetrahedron:"tetrahedron",tetVertexIndices:"tetVertexIndices",triangleSubdivisionRule:"triangleSubdivisionRule",trimCurveCounts:"trimCurve:counts",trimCurveKnots:"trimCurve:knots",trimCurveOrders:"trimCurve:orders",trimCurvePoints:"trimCurve:points",trimCurveRanges:"trimCurve:ranges",trimCurveVertexCounts:"trimCurve:vertexCounts",type:"type",uForm:"uForm",uKnots:"uKnots",unauthoredValuesIndex:"unauthoredValuesIndex",uniform:"uniform",unrestricted:"unrestricted",uOrder:"uOrder",upAxis:"upAxis",uRange:"uRange",uVertexCount:"uVertexCount",varying:"varying",velocities:"velocities",vertex:"vertex",verticalAperture:"verticalAperture",verticalApertureOffset:"verticalApertureOffset",vForm:"vForm",visibility:"visibility",visible:"visible",vKnots:"vKnots",vOrder:"vOrder",vRange:"vRange",vVertexCount:"vVertexCount",width:"width",widths:"widths",wrap:"wrap",x:"X",xformOpOrder:"xformOpOrder",y:"Y",z:"Z",BackPlateAPI:"BackPlateAPI",BasisCurves:"BasisCurves",Boundable:"Boundable",Camera:"Camera",Capsule:"Capsule",Capsule_1:"Capsule_1",Cone:"Cone",Cube:"Cube",Curves:"Curves",Cylinder:"Cylinder",Cylinder_1:"Cylinder_1",GeomModelAPI:"GeomModelAPI",GeomSubset:"GeomSubset",Gprim:"Gprim",HermiteCurves:"HermiteCurves",Imageable:"Imageable",Mesh:"Mesh",MotionAPI:"MotionAPI",NurbsCurves:"NurbsCurves",NurbsPatch:"NurbsPatch",Plane:"Plane",PointBased:"PointBased",PointInstancer:"PointInstancer",Points:"Points",PrimvarsAPI:"PrimvarsAPI",Scope:"Scope",Sphere:"Sphere",TetMesh:"TetMesh",VisibilityAPI:"VisibilityAPI",Xform:"Xform",Xformable:"Xformable",XformCommonAPI:"XformCommonAPI"});class z extends qe{static{u(this,"VisibilityAPI")}static typeName="VisibilityAPI";static get(e,t){return new z(e.getPrim(t),e)}isValid(){return super.isValid()&&this.prim.hasAPI(z.typeName)}static canApply(e){return e.canApplyAPI(z.typeName)}static apply(e){return e.applyAPI(z.typeName)?new z(e,e.getStage()):new z(void 0,e.getStage())}static getSchemaAttributeNames(e=!0){return e?["guideVisibility","proxyVisibility","renderVisibility"]:["guideVisibility","proxyVisibility","renderVisibility"]}getGuideVisibilityAttr(){return this.prim.getAttr(g.guideVisibility)}createGuideVisibilityAttr(e,t=!1){return this._createAttr(g.guideVisibility,"token",!1,"uniform",e,t)}getProxyVisibilityAttr(){return this.prim.getAttr(g.proxyVisibility)}createProxyVisibilityAttr(e,t=!1){return this._createAttr(g.proxyVisibility,"token",!1,"uniform",e,t)}getRenderVisibilityAttr(){return this.prim.getAttr(g.renderVisibility)}createRenderVisibilityAttr(e,t=!1){return this._createAttr(g.renderVisibility,"token",!1,"uniform",e,t)}getPurposeVisibilityAttr(e){if(e==="guide")return this._prim.getAttr("guideVisibility");if(e==="proxy")return this._prim.getAttr("proxyVisibility");if(e==="render")return this._prim.getAttr("renderVisibility");xt.GetInstance().postError(new Ze(`Unexpected purpose '${e}' getting purpose visibility attribute for <${this.path}>.`,$e.CodingError))}}function M(s){return s instanceof Ne||ri(s)?si(s):s}u(M,"plain");function w(s,e,t){const i=s.getAttr(e);if(i)return t!==void 0?i.getValueAtTime(t):i.getValue()}u(w,"attrVal");function fi(s,e,t){const i=s.getAttr(e);if(!(!i||!i.hasAuthoredValue()))return t!==void 0?i.getValueAtTime(t):i.getValue()}u(fi,"authoredAttrVal");function se(s){if(s==null)return null;if(s instanceof Float32Array)return s;if(s instanceof Ne){const e=s.cdata();if(e instanceof Float32Array||e instanceof Float64Array||e instanceof Int32Array)return s.size>0?new Float32Array(e):null;s=M(s)}if(Array.isArray(s)&&s.length>0){if(Array.isArray(s[0])){const e=[];for(const t of s)for(const i of t)e.push(i);return new Float32Array(e)}return new Float32Array(s.map(Number))}return null}u(se,"toFloat32");function pr(s){if(s==null)return null;if(s instanceof Int32Array)return s;if(s instanceof Ne){const e=s.cdata();if(e instanceof Int32Array)return e.slice();s=M(s)}return Array.isArray(s)?new Int32Array(s.map(Number)):null}u(pr,"toInt32");function gi(s){if(s=M(s),!Array.isArray(s)||s.length<2)return null;const e=Array.isArray(s[0])?s[0]:[Number(s[0]),0,0],t=Array.isArray(s[1])?s[1]:[Number(s[1]),0,0];return[[Math.fround(Number(e[0]??0)),Math.fround(Number(e[1]??0)),Math.fround(Number(e[2]??0))],[Math.fround(Number(t[0]??0)),Math.fround(Number(t[1]??0)),Math.fround(Number(t[2]??0))]]}u(gi,"toExtent");function hr(s,e){return typeof s=="number"?s:e}u(hr,"asNumber");function Me(s){return s instanceof Ne?s.toArray().filter(e=>typeof e=="string"):Array.isArray(s)?s.filter(e=>typeof e=="string"):[]}u(Me,"asTokens");function ze(s,e){return typeof s=="string"?s:e}u(ze,"asToken");function mr(s,e){return typeof s=="boolean"?s:e}u(mr,"asBool");function K(s){return s=M(s),Array.isArray(s)&&s.length>=3?[Number(s[0]),Number(s[1]),Number(s[2])]:[0,0,0]}u(K,"asVec3");function $(s){return typeof s=="number"?s:(s=M(s),Array.isArray(s)&&typeof s[0]=="number"?s[0]:0)}u($,"asScalar");function Bt(s){if(s=M(s),Array.isArray(s)&&s.length>=4){const e=Number(s[0]),t=Number(s[1]),i=Number(s[2]),r=Number(s[3]);return[e,t,i,r]}return[1,0,0,0]}u(Bt,"asQuat");function yi(s){if(s=M(s),Array.isArray(s)&&s.length===4&&Array.isArray(s[0])){const e=[];for(const t of s)for(const i of t)e.push(Number(i));return e}return Array.isArray(s)&&s.length===16?s.map(Number):null}u(yi,"asMatrix4Flat");class C extends Kt{static{u(this,"Imageable")}static typeName="Imageable";static get(e,t){return new C(e.getPrim(t),e)}isValid(){return super.isValid()&&this.prim.isA(C.typeName)}static getSchemaAttributeNames(e=!0){return e?["visibility","purpose"]:["visibility","purpose"]}getVisibilityAttr(){return this.prim.getAttr(g.visibility)}createVisibilityAttr(e,t=!1){return this._createAttr(g.visibility,"token",!1,"varying",e,t)}getPurposeAttr(){return this.prim.getAttr(g.purpose)}createPurposeAttr(e,t=!1){return this._createAttr(g.purpose,"token",!1,"uniform",e,t)}getProxyPrimRel(){return this.prim.rel(g.proxyPrim)}createProxyPrimRel(){return this.prim.createRelationship(g.proxyPrim,!1)}_createVisibilityAttrForEdit(){return this._declareAttr("visibility","token")}getPurposeVisibilityAttr(e){return C.getPurposeVisibilityAttr(this._prim,e)}static getPurposeVisibilityAttr(e,t){if(t==="default")return e.getAttr("visibility");if(e.hasAPI(z.typeName))return new z(e,e.getStage()).getPurposeVisibilityAttr(t)}computeEffectiveVisibility(e,t){return C.computeEffectiveVisibility(this._stage,this.path,e,t)}static computeEffectiveVisibility(e,t,i,r){if(C.computeVisibility(e,t,r)==="invisible")return"invisible";if(i==="default")return"visible";let o=t;for(;o;){const a=e.getPrim(o),l=a?.isA("Imageable")?C.getPurposeVisibilityAttr(a,i):void 0;if(l?.hasAuthoredValue()){const n=ct(l,r);if(n!==void 0)return n}o=ye(o)}return i==="guide"?"invisible":i==="proxy"||i==="render"?"inherited":(xt.GetInstance().postError(new Ze(`Unexpected purpose '${i}' computing purpose visibility for <${t}>.`,$e.CodingError)),"invisible")}makeInvisible(){this._declareAttr("visibility","token").set("invisible")}makeVisible(){const e=[];C.getVisibility(this._prim)==="invisible"&&e.push([this,"inherited"]);let t=!1;const i=u(r=>{const o=ye(r);if(!o)return;i(o);const a=this._stage.getPrim(o);if(!a?.isA("Imageable"))return;const l=new C(this._stage._primHandle(o),this._stage);if(C.getVisibility(a)==="invisible"&&(e.push([l,"inherited"]),t=!0),!!t)for(const n of this._stage.getAllChildPrimPaths(o)){if(n===r)continue;this._stage.getPrim(n)?.isA("Imageable")&&e.push([new C(this._stage._primHandle(n),this._stage),"invisible"])}},"visitAncestors");i(this._prim.path),oi(()=>{for(const[r,o]of e)r._createVisibilityAttrForEdit().set(o)})}computeWorldBound(e,...t){return this._bboxCacheFor(e,t).computeWorldBound(this._prim)}computeLocalBound(e,...t){return this._bboxCacheFor(e,t).computeLocalBound(this._prim)}computeUntransformedBound(e,...t){return this._bboxCacheFor(e,t).computeUntransformedBound(this._prim)}_bboxCacheFor(e,t){const i=xi(t);if(i.length===0)throw new Error(`Must include at least one purpose when computing bounds for prim at path <${this.path}>.  See UsdGeomImageable::GetPurposeAttr().`);if(!Ye)throw new Error("UsdGeomBBoxCache is not loaded");return new Ye(e,i)}static getOrderedPurposeTokens(){return bi}static computePurposeInfo(e,t){const i=Pt(e);if(i)return{purpose:i,isInheritable:!0};if(t)return t.isInheritable?{...t}:{purpose:lt(e),isInheritable:!1};const r=vi(e);return r?{purpose:r,isInheritable:!0}:{purpose:lt(e),isInheritable:!1}}static getVisibility(e,t){const i=e.getAttr("visibility");return(i?ct(i,t):void 0)??"inherited"}static getPurpose(e){return ze(w(e,"purpose"),"default")}static computeVisibility(e,t,i){let r=t;for(;r&&r!=="/";){const o=e.getPrim(r);if(o?.isA("Imageable")&&C.getVisibility(o,i)==="invisible")return"invisible";r=ye(r)}return"inherited"}static computePurpose(e,t){const i=e.getPrim(t);return i?C.computePurposeInfo(i).purpose:"default"}}const bi=["default","render","proxy","guide"];function nt(s){return s.isInheritable?s.purpose:""}u(nt,"getInheritablePurpose");let Ye;function Di(s){Ye=s}u(Di,"_registerBBoxCache");function xi(s){return s.filter(e=>!!e)}u(xi,"makePurposeVector");function Pt(s){if(s.isA("Imageable")){const e=s.getAttr("purpose");if(e?.hasAuthoredValue())return ze(e.getValue(),"")}return""}u(Pt,"computeAuthoredPurpose");function lt(s){return s.isA("Imageable")?ze(w(s,"purpose"),"default"):"default"}u(lt,"computeFallbackPurpose");function vi(s){const e=s.getStage();let t=ye(s.path);for(;t;){const i=e.getPrim(t);if(!i)break;const r=Pt(i);if(r)return r;t=ye(t)}return""}u(vi,"computeInheritableAncestorPurpose");function ye(s){if(s==="/"||!s.startsWith("/"))return null;const e=s.lastIndexOf("/");return e===0?"/":s.slice(0,e)}u(ye,"parentPath$2");function ct(s,e){const t=Rt(s.getResolveInfo(e??"default")),i=t.layer&&t.specPath?t.layer.getField(t.specPath,"typeName"):t.typeName,r=typeof i=="string"?i.replace(/^(?:uniform|varying)\s+/,""):i;if(t.source!=="fallback"&&r!=="token")return;const o=e===void 0?s.getValue():s.getValueAtTime(e);return typeof o=="string"?o:void 0}u(ct,"tokenValue");const St="xformOp:",_i="!invert!xformOp:",Re="!invert!",kt=["","translateX","translateY","translateZ","translate","scaleX","scaleY","scaleZ","scale","rotateX","rotateY","rotateZ","rotateXYZ","rotateXZY","rotateYXZ","rotateYZX","rotateZXY","rotateZYX","orient","transform"],Ai=["Double","Float","Half"];function Te(s){return s.startsWith(St)}u(Te,"isNamespaced");function Ii(s){return Te(s)?s:St+s}u(Ii,"makeNamespaced");function Ti(s){return s.startsWith(_i)}u(Ti,"isInverseOpName");class c{static{u(this,"XformOp")}static TypeInvalid=0;static TypeTranslateX=1;static TypeTranslateY=2;static TypeTranslateZ=3;static TypeTranslate=4;static TypeScaleX=5;static TypeScaleY=6;static TypeScaleZ=7;static TypeScale=8;static TypeRotateX=9;static TypeRotateY=10;static TypeRotateZ=11;static TypeRotateXYZ=12;static TypeRotateXZY=13;static TypeRotateYXZ=14;static TypeRotateYZX=15;static TypeRotateZXY=16;static TypeRotateZYX=17;static TypeOrient=18;static TypeTransform=19;static PrecisionDouble=0;static PrecisionFloat=1;static PrecisionHalf=2;#e;#t;#i;#r;constructor(e,t=!1){if(this.#e=e,this.#i=c.TypeInvalid,this.#r=t,!e?.isValid())return;const i=e.name;Te(i)?this.#i=c.getOpTypeEnum(e.splitName()[1]??""):V(`Invalid xform op: <${e.getPath()}>.`)}static _fromValidAttribute(e,t){const i=new c(void 0,t);return i.#e=e,i.#s(),i}static _fromAttributeQuery(e,t){const i=new c(void 0,t);return i.#e=e.getAttribute(),i.#t=e,i.#s(),i}static _create(e,t,i,r="",o=!1){const a=new c(void 0,o);a.#i=t;const l=c.getValueTypeName(t,i);if(!l)return V(`Invalid xform-op: incompatible combination of opType (${wi[t]}) and precision (${Ai[i]}).`),a;const n=c.getOpName(t,r,!1);return a.#e=e.createAttribute(n,l,!1),a}#s(){const e=this.getName(),t=e.indexOf(":");if(t<0){V(`Invalid xform op: <${this.getAttr().getPath()}>.`);return}const i=e.indexOf(":",t+1),r=e.slice(t+1,i<0?void 0:i);this.#i=ut(r),this.#i===c.TypeInvalid&&V(`Invalid xform opType token '${r}'.`)}static isXformOp(e){return typeof e=="string"?Te(e):e?.isValid()?Te(e.name):!1}static _getXformOpAttr(e,t){const i=Ti(t);return{attr:e.getAttr(i?t.slice(Re.length):t),isInverseOp:i}}static getPrecisionFromValueTypeName(e){switch(e){case"matrix4d":case"double3":case"double":case"quatd":return c.PrecisionDouble;case"float3":case"float":case"quatf":return c.PrecisionFloat;case"half3":case"half":case"quath":return c.PrecisionHalf}return V(`Invalid typeName '${e}' specified.`),c.PrecisionDouble}static getOpTypeToken(e){return kt[e]??""}static getOpTypeEnum(e){const t=ut(e);return t===c.TypeInvalid&&e!==""&&V(`Invalid xform opType token '${e}'.`),t}static getValueTypeName(e,t){switch(e){case c.TypeTransform:return t!==c.PrecisionDouble&&V("Matrix transformations can only be encoded in double precision. Overriding precision to double."),"matrix4d";case c.TypeTranslate:case c.TypeScale:case c.TypeRotateXYZ:case c.TypeRotateXZY:case c.TypeRotateYXZ:case c.TypeRotateYZX:case c.TypeRotateZXY:case c.TypeRotateZYX:return t===c.PrecisionFloat?"float3":t===c.PrecisionHalf?"half3":"double3";case c.TypeTranslateX:case c.TypeTranslateY:case c.TypeTranslateZ:case c.TypeScaleX:case c.TypeScaleY:case c.TypeScaleZ:case c.TypeRotateX:case c.TypeRotateY:case c.TypeRotateZ:return t===c.PrecisionFloat?"float":t===c.PrecisionHalf?"half":"double";case c.TypeOrient:return t===c.PrecisionFloat?"quatf":t===c.PrecisionHalf?"quath":"quatd";default:return""}}static getOpName(e,t="",i=!1){let r=Ii(c.getOpTypeToken(e));return t&&(r=`${r}:${t}`),i&&(r=Re+r),r}static getOpTransform(e,t,i=!1){return new A(...We(c.getOpTypeToken(e),t,i))}getOpType(){return this.#i}getPrecision(){return c.getPrecisionFromValueTypeName(this.getTypeName())}isInverseOp(){return this.#r}hasSuffix(e){return this.getName().endsWith(e)}getOpName(){return this.#r?Re+this.getName():this.getName()}getOpTransform(e){const t=this.get(e);return t===void 0?new A(1):c.getOpTransform(this.#i,t,this.#r)}mightBeTimeVarying(){return this.#t?this.#t.valueMightBeTimeVarying():this.#e?.valueMightBeTimeVarying()??!1}getAttr(){return this.#e}isDefined(){return c.isXformOp(this.#e)}equals(e){const t=this.#e,i=e.#e;return!t?.isValid()||!i?.isValid()?!t?.isValid()&&!i?.isValid():t.getPath()===i.getPath()&&t.getStage()===i.getStage()}getName(){return this.getAttr().name}getBaseName(){return this.getAttr().getBaseName()}getNamespace(){return this.getAttr().getNamespace()}splitName(){return this.getAttr().splitName()}getTypeName(){return this.getAttr().typeName}get(e){return this.#t?this.#t.get(e??"default"):this.#e?.get(e)}set(e,t){if(this.#r)return V(`Cannot set a value on the inverse xformOp '${this.getOpName()}'. Please set value on the paired non-inverse xformOp instead.`),!1;const i=this.#e;return i?.isValid()?(i.set(e,t),!0):!1}getTimeSamples(){return this.#t?this.#t.getTimeSamples():this.#e?.getTimeSampleKeys()??[]}getTimeSamplesInInterval(e){return this.#t?this.#t.getTimeSamplesInInterval(e):this.#e?.getTimeSamplesInInterval(e)??[]}getNumTimeSamples(){return this.#t?this.#t.getNumTimeSamples():this.#e?.getTimeSampleKeys().length??0}_getAttributeQuery(){return this.#t}}const wi=["TypeInvalid","TypeTranslateX","TypeTranslateY","TypeTranslateZ","TypeTranslate","TypeScaleX","TypeScaleY","TypeScaleZ","TypeScale","TypeRotateX","TypeRotateY","TypeRotateZ","TypeRotateXYZ","TypeRotateXZY","TypeRotateYXZ","TypeRotateYZX","TypeRotateZXY","TypeRotateZYX","TypeOrient","TypeTransform"];function ut(s){const e=kt.indexOf(s);return e<0?c.TypeInvalid:e}u(ut,"getOpTypeEnumFromString");function L(s){return Ke([1,0,0],s)}u(L,"makeRotateX");function O(s){return Ke([0,1,0],s)}u(O,"makeRotateY");function R(s){return Ke([0,0,1],s)}u(R,"makeRotateZ");function Ke(s,e){return[...new A(1).setRotate($t(s,e)).GetArray()]}u(Ke,"axisRotation");function We(s,e,t){switch(s){case"translate":{const[i,r,o]=K(e);return De(t?-i:i,t?-r:r,t?-o:o)}case"translateX":return De($(e)*(t?-1:1),0,0);case"translateY":return De(0,$(e)*(t?-1:1),0);case"translateZ":return De(0,0,$(e)*(t?-1:1));case"scale":{const[i,r,o]=K(e);return t?me(1/i,1/r,1/o):me(i,r,o)}case"scaleX":{const i=$(e);return me(t?1/i:i,1,1)}case"scaleY":{const i=$(e);return me(1,t?1/i:i,1)}case"scaleZ":{const i=$(e);return me(1,1,t?1/i:i)}case"rotateX":return L($(e)*(t?-1:1));case"rotateY":return O($(e)*(t?-1:1));case"rotateZ":return R($(e)*(t?-1:1));case"rotateXYZ":{const[i,r,o]=K(e);return t?_(_(R(-o),O(-r)),L(-i)):_(_(L(i),O(r)),R(o))}case"rotateXZY":{const[i,r,o]=K(e);return t?_(_(O(-r),R(-o)),L(-i)):_(_(L(i),R(o)),O(r))}case"rotateYXZ":{const[i,r,o]=K(e);return t?_(_(R(-o),L(-i)),O(-r)):_(_(O(r),L(i)),R(o))}case"rotateYZX":{const[i,r,o]=K(e);return t?_(_(L(-i),R(-o)),O(-r)):_(_(O(r),R(o)),L(i))}case"rotateZXY":{const[i,r,o]=K(e);return t?_(_(O(-r),L(-i)),R(-o)):_(_(R(o),L(i)),O(r))}case"rotateZYX":{const[i,r,o]=K(e);return t?_(_(L(-i),O(-r)),R(-o)):_(_(R(o),O(r)),L(i))}case"orient":{let i=Yt(Bt(e));return t&&(i=Zt(i)),[...new A(1).setRotate(i).GetArray()]}case"transform":{const i=yi(e),r=i||[...X];if(!t)return r;const o=new A(...r).getDeterminant();return Math.abs(o)<=1e-9&&V(`Cannot invert singular transform op with value ${new A(...r)}.`),Ht(r)}default:return[...X]}}u(We,"opMatrix");class J extends C{static{u(this,"Xformable")}static typeName="Xformable";static get(e,t){return new J(e.getPrim(t),e)}isValid(){return super.isValid()&&this.prim.isA(J.typeName)}static getSchemaAttributeNames(e=!0){return e?["visibility","purpose","xformOpOrder"]:["xformOpOrder"]}getXformOpOrderAttr(){return this.prim.getAttr(g.xformOpOrder)}createXformOpOrderAttr(e,t=!1){return this._createAttr(g.xformOpOrder,"token[]",!1,"uniform",e,t)}_getXformOpOrderValue(){const e=this.getXformOpOrderAttr();if(e.isValid())return Me(e.get())}addXformOp(e,t=c.PrecisionDouble,i="",r=!1){const o=this._getXformOpOrderValue()??[],a=c.getOpName(e,i,r);if(o.includes(a))return V(`The xformOp '${a}' already exists in xformOpOrder [${o.join(", ")}].`),new c;const l=c.getOpName(e,i);let n;const d=this.prim.getAttr(l);if(d?.isValid()?(c.getPrecisionFromValueTypeName(d.typeName)!==t&&V(`XformOp <${d.getPath()}> has typeName '${d.typeName}' which does not match the requested precision '${dt[t]}'. Proceeding to use existing typeName / precision.`),n=new c(d,r)):n=c._create(this.prim,e,t,i,r),n.isDefined())o.push(n.getOpName()),this.createXformOpOrderAttr().set(o);else return V(`Unable to add xform op of type ${c.getOpTypeToken(e)} and precision ${dt[t]} on prim at path <${this.path}>. opSuffix=${i}, isInverseOp=${r?1:0}`),new c;return n}getXformOp(e,t="",i=!1){const r=this._getXformOpOrderValue()??[],o=c.getOpName(e,t,i);if(!r.includes(o))return new c;const a=this.prim.getAttr(c.getOpName(e,t));return new c(a,i)}addTranslateXOp(e=c.PrecisionDouble,t="",i=!1){return this.addXformOp(c.TypeTranslateX,e,t,i)}getTranslateXOp(e="",t=!1){return this.getXformOp(c.TypeTranslateX,e,t)}addTranslateYOp(e=c.PrecisionDouble,t="",i=!1){return this.addXformOp(c.TypeTranslateY,e,t,i)}getTranslateYOp(e="",t=!1){return this.getXformOp(c.TypeTranslateY,e,t)}addTranslateZOp(e=c.PrecisionDouble,t="",i=!1){return this.addXformOp(c.TypeTranslateZ,e,t,i)}getTranslateZOp(e="",t=!1){return this.getXformOp(c.TypeTranslateZ,e,t)}addTranslateOp(e=c.PrecisionDouble,t="",i=!1){return this.addXformOp(c.TypeTranslate,e,t,i)}getTranslateOp(e="",t=!1){return this.getXformOp(c.TypeTranslate,e,t)}addScaleXOp(e=c.PrecisionFloat,t="",i=!1){return this.addXformOp(c.TypeScaleX,e,t,i)}getScaleXOp(e="",t=!1){return this.getXformOp(c.TypeScaleX,e,t)}addScaleYOp(e=c.PrecisionFloat,t="",i=!1){return this.addXformOp(c.TypeScaleY,e,t,i)}getScaleYOp(e="",t=!1){return this.getXformOp(c.TypeScaleY,e,t)}addScaleZOp(e=c.PrecisionFloat,t="",i=!1){return this.addXformOp(c.TypeScaleZ,e,t,i)}getScaleZOp(e="",t=!1){return this.getXformOp(c.TypeScaleZ,e,t)}addScaleOp(e=c.PrecisionFloat,t="",i=!1){return this.addXformOp(c.TypeScale,e,t,i)}getScaleOp(e="",t=!1){return this.getXformOp(c.TypeScale,e,t)}addRotateXOp(e=c.PrecisionFloat,t="",i=!1){return this.addXformOp(c.TypeRotateX,e,t,i)}getRotateXOp(e="",t=!1){return this.getXformOp(c.TypeRotateX,e,t)}addRotateYOp(e=c.PrecisionFloat,t="",i=!1){return this.addXformOp(c.TypeRotateY,e,t,i)}getRotateYOp(e="",t=!1){return this.getXformOp(c.TypeRotateY,e,t)}addRotateZOp(e=c.PrecisionFloat,t="",i=!1){return this.addXformOp(c.TypeRotateZ,e,t,i)}getRotateZOp(e="",t=!1){return this.getXformOp(c.TypeRotateZ,e,t)}addRotateXYZOp(e=c.PrecisionFloat,t="",i=!1){return this.addXformOp(c.TypeRotateXYZ,e,t,i)}getRotateXYZOp(e="",t=!1){return this.getXformOp(c.TypeRotateXYZ,e,t)}addRotateXZYOp(e=c.PrecisionFloat,t="",i=!1){return this.addXformOp(c.TypeRotateXZY,e,t,i)}getRotateXZYOp(e="",t=!1){return this.getXformOp(c.TypeRotateXZY,e,t)}addRotateYXZOp(e=c.PrecisionFloat,t="",i=!1){return this.addXformOp(c.TypeRotateYXZ,e,t,i)}getRotateYXZOp(e="",t=!1){return this.getXformOp(c.TypeRotateYXZ,e,t)}addRotateYZXOp(e=c.PrecisionFloat,t="",i=!1){return this.addXformOp(c.TypeRotateYZX,e,t,i)}getRotateYZXOp(e="",t=!1){return this.getXformOp(c.TypeRotateYZX,e,t)}addRotateZXYOp(e=c.PrecisionFloat,t="",i=!1){return this.addXformOp(c.TypeRotateZXY,e,t,i)}getRotateZXYOp(e="",t=!1){return this.getXformOp(c.TypeRotateZXY,e,t)}addRotateZYXOp(e=c.PrecisionFloat,t="",i=!1){return this.addXformOp(c.TypeRotateZYX,e,t,i)}getRotateZYXOp(e="",t=!1){return this.getXformOp(c.TypeRotateZYX,e,t)}addOrientOp(e=c.PrecisionFloat,t="",i=!1){return this.addXformOp(c.TypeOrient,e,t,i)}getOrientOp(e="",t=!1){return this.getXformOp(c.TypeOrient,e,t)}addTransformOp(e=c.PrecisionDouble,t="",i=!1){return this.addXformOp(c.TypeTransform,e,t,i)}getTransformOp(e="",t=!1){return this.getXformOp(c.TypeTransform,e,t)}setResetXformStack(e){const t=this._getXformOpOrderValue()??[];if(e)return t.includes(W)||this.createXformOpOrderAttr().set([W,...t]),!0;const i=t.lastIndexOf(W);return i>=0&&this.createXformOpOrderAttr().set(t.slice(i+1)),!0}getResetXformStack(){const e=this._getXformOpOrderValue();return e!==void 0&&e.includes(W)}setXformOpOrder(e,t=!1){const i=t?[W]:[];for(const r of e)if(r.getAttr().primPath===this.path)i.push(r.getOpName());else return V(`XformOp attribute <${r.getAttr().getPath()}> does not belong to schema prim <${this.path}>.`),!1;return this.createXformOpOrderAttr().set(i),!0}clearXformOpOrder(){return this.setXformOpOrder([])}makeMatrixXform(){return this.clearXformOpOrder(),this.getOrderedXformOps().length>0?(U(`Could not clear xformOpOrder for <${this.path}>`),new c):this.addTransformOp()}getOrderedXformOps(e){return this._getOrderedXformOps(e,!1)}_getOrderedXformOps(e,t){const i=[];e&&(e.value=!1);const r=this._getXformOpOrderValue();if(r===void 0||r.length===0)return i;const o=this.prim;for(const a of r){if(a===W){e&&(e.value=!0),i.length=0;continue}const{attr:l,isInverseOp:n}=c._getXformOpAttr(o,a);l.isValid()?i.push(t?c._fromAttributeQuery(new Ie(l),n):c._fromValidAttribute(l,n)):U(`Unable to get attribute associated with the xformOp '${a}', on the prim at path <${this.path}>. Skipping xformOp in the computation of the local transformation at prim.`)}return i}transformMightBeTimeVarying(e){return e!==void 0?e.some(t=>t.mightBeTimeVarying()):je(this.prim)}static getTimeSamples(e){return J.getTimeSamplesInInterval(e,ai.getFullInterval())}getTimeSamples(){return J.getTimeSamples(this.getOrderedXformOps())}static getTimeSamplesInInterval(e,t){return e.length===1?e[0].getTimeSamplesInInterval(t):Vt.getUnionedTimeSamplesInInterval(e.map(i=>i.getAttr()),t)}getTimeSamplesInInterval(e){return J.getTimeSamplesInInterval(this.getOrderedXformOps(),e)}getLocalTransformation(e,t){let i=new A(1);t&&(t.value=!1);const r=this._getXformOpOrderValue();if(r===void 0||r.length===0)return i;for(let o=r.length-1;o>=0;o--){const a=r[o];if(o>0&&Pi(a,r[o-1])){o--;continue}if(a===W){t&&(t.value=!0);break}const{attr:l,isInverseOp:n}=c._getXformOpAttr(this.prim,a);if(l.isValid()){const d=new c(l,n);d.isDefined()&&(i=i.getMultiply(d.getOpTransform(e)))}else U(`Unable to get attribute associated with the xformOp '${a}', on the prim at path <${this.path}>. Skipping xformOp in the computation of the local transformation at prim.`)}return i}static getLocalTransformation(e,t){let i=new A(1);for(let r=e.length-1;r>=0;r--){const o=e[r];if(r>0&&Bi(o,e[r-1])){r--;continue}i=i.getMultiply(o.getOpTransform(t))}return i}static isTransformationAffectedByAttrNamed(e){return e===g.xformOpOrder||c.isXformOp(e)}}const dt=["Double","Float","Half"];function Bi(s,e){return s.equals(e)&&s.isInverseOp()!==e.isInverseOp()}u(Bi,"areInverseXformOps");function Pi(s,e){return Ce+s===e||Ce+e===s}u(Pi,"areInverseXformOpNames");function Si(s){return s.valueMightBeTimeVarying()}u(Si,"valueMightBeTimeVarying");function je(s){const e=Me(w(s,"xformOpOrder"));for(let t=e.length-1;t>=0;t--){const i=e[t];if(i==="!resetXformStack!")return!1;const r=i.startsWith("!invert!")?i.slice(8):i,o=s.getAttr(r);if(o&&Si(o))return!0}return!1}u(je,"transformMightBeTimeVarying");const W="!resetXformStack!",Ce="!invert!";class Ct{static{u(this,"XformQuery")}#e;#t;constructor(e){const t=[];let i=!1;const r=e?Me(w(e,"xformOpOrder")):[];for(const o of r){if(o===W){i=!0,t.length=0;continue}const a=o.startsWith(Ce),l=a?o.slice(Ce.length):o,n=e.getAttr(l);if(!n)continue;const d=new Ie(n);t.push({name:l,isInverse:a,attr:n,query:d,opType:l.split(":")[1]??""})}this.#e=t,this.#t=i}getLocalTransformation(e){let t=[...X];for(let i=this.#e.length-1;i>=0;i--){const r=this.#e[i],o=e===void 0?r.attr.getValue():r.query.get(e);o!==void 0&&(t=_(t,We(r.opType,o,r.isInverse)))}return t}getResetXformStack(){return this.#t}transformMightHaveEffect(){if(this.#t)return!0;if(this.#e.length===0)return!1;const[e,t]=this.#e;return!(this.#e.length===2&&e.opType===t.opType&&e.isInverse!==t.isInverse&&e.name===t.name)}hasNonEmptyXformOpOrder(){return this.#e.length>0}transformMightBeTimeVarying(){return this.transformMightHaveEffect()&&this.#e.some(e=>e.query.valueMightBeTimeVarying())}getTimeSamples(){return Ie.getUnionedTimeSamples(this.#e.map(e=>e.query))}getTimeSamplesInInterval(e){return Ie.getUnionedTimeSamplesInInterval(this.#e.map(t=>t.query),e)}isAttributeIncludedInLocalTransform(e){return this.#e.some(t=>t.name===e)}}function ki(s,e){const t=w(s,"xformOpOrder",e),i=Me(t);let r=[...X],o=!1;for(let a=i.length-1;a>=0;a--){const l=i[a];if(l==="!resetXformStack!"){o=!0;break}const n=l.startsWith("!invert!"),d=n?l.slice(8):l,h=d.split(":")[1]??"",p=w(s,d,e);if(p===void 0)continue;const m=We(h,p,n);r=_(r,m)}return{matrix:r,resetsXformStack:o}}u(ki,"evaluateXformOps");class G extends J{static{u(this,"Boundable")}static typeName="Boundable";static get(e,t){return new G(e.getPrim(t),e)}isValid(){return super.isValid()&&this.prim.isA(G.typeName)}static getSchemaAttributeNames(e=!0){return e?["visibility","purpose","xformOpOrder","extent"]:["extent"]}getExtentAttr(){return this.prim.getAttr(g.extent)}createExtentAttr(e,t=!1){return this._createAttr(g.extent,"float3[]",!1,"varying",e,t)}static getExtent(e,t){return gi(fi(e,"extent",t))}static computeExtentFromPlugins(e,t,i){const r=Nt.get(e.typeName);if(r){const n=r(e,t,i);return n?pt(n):null}const o=u((n,d)=>{const h=w(e,n,d);return typeof h=="number"?h:void 0},"num"),a=u(n=>{const d=w(e,"axis",n);return d==="X"||d==="Y"||d==="Z"?d:void 0},"axisAt");let l;switch(e.typeName){case"Sphere":{const n=o("radius",t);if(n===void 0)return null;l=ve(n,n,"Z");break}case"Plane":{const n=o("width"),d=o("length"),h=a();if(n===void 0||d===void 0||h===void 0)return null;const p=Math.fround(n*.5),m=Math.fround(d*.5),b=h==="X"?[0,m,p]:h==="Y"?[p,0,m]:[p,m,0];l=[[-b[0],-b[1],-b[2]],b];break}case"Cube":{const n=o("size",t);if(n===void 0)return null;l=[[n*-.5,n*-.5,n*-.5],[n*.5,n*.5,n*.5]];break}case"Cone":case"Cylinder":{const n=o("height",t),d=o("radius",t),h=a(t);if(n===void 0||d===void 0||h===void 0)return null;l=ve(d,n*.5,h);break}case"Capsule":{const n=o("height",t),d=o("radius",t),h=a(t);if(n===void 0||d===void 0||h===void 0)return null;l=ve(d,Math.fround(n*.5+d),h);break}case"Cylinder_1":{const n=o("height",t),d=o("radiusTop",t),h=o("radiusBottom",t),p=a(t);if(n===void 0||d===void 0||h===void 0||p===void 0)return null;l=ve(Math.max(d,h),n*.5,p);break}case"Capsule_1":{const n=o("height",t),d=o("radiusTop",t),h=o("radiusBottom",t),p=a(t);if(n===void 0||d===void 0||h===void 0||p===void 0||(l=Ni(n,d,h,p),!l))return null;break}case"BasisCurves":case"HermiteCurves":case"NurbsCurves":{const n=se(w(e,"points",t));if(!n)return null;l=G._pointExtent(n);const d=se(w(e,"widths",t));let h=0;if(d)for(const m of d)h=Math.max(h,m);const p=h*.5;l=[[l[0][0]-p,l[0][1]-p,l[0][2]-p],[l[1][0]+p,l[1][1]+p,l[1][2]+p]];break}case"Points":{const n=se(w(e,"points",t));if(!n)return null;const d=se(w(e,"widths",t));if(!d){l=G._pointExtent(n);break}if(n.length!==d.length*3)return null;let h=Number.POSITIVE_INFINITY,p=Number.POSITIVE_INFINITY,m=Number.POSITIVE_INFINITY,b=Number.NEGATIVE_INFINITY,x=Number.NEGATIVE_INFINITY,v=Number.NEGATIVE_INFINITY;for(let D=0;D<d.length;D++){const I=d[D]*.5,k=D*3;h=Math.min(h,n[k]-I),p=Math.min(p,n[k+1]-I),m=Math.min(m,n[k+2]-I),b=Math.max(b,n[k]+I),x=Math.max(x,n[k+1]+I),v=Math.max(v,n[k+2]+I)}l=[[h,p,m],[b,x,v]];break}case"Mesh":case"NurbsPatch":case"TetMesh":{const n=w(e,"points",t);if(n===void 0)return null;l=G._pointExtent(se(n)??new Float32Array(0));break}default:return null}return pt(i?Ci(l,i):l)}static _pointExtent(e){let t=re,i=re,r=re,o=-re,a=-re,l=-re;for(let n=0;n+2<e.length;n+=3)t=Math.min(t,e[n]),i=Math.min(i,e[n+1]),r=Math.min(r,e[n+2]),o=Math.max(o,e[n]),a=Math.max(a,e[n+1]),l=Math.max(l,e[n+2]);return[[t,i,r],[o,a,l]]}static computeExtent(e,t){return G.getExtent(e,t)??G.computeExtentFromPlugins(e,t)}}const re=34028234663852886e22,Nt=new Map;function he(s,e){Nt.set(s,e)}u(he,"registerComputeExtentFunction");function Ci(s,e){const[t,i]=s,o=[[t[0],t[1],t[2]],[t[0],t[1],i[2]],[t[0],i[1],t[2]],[t[0],i[1],i[2]],[i[0],t[1],t[2]],[i[0],t[1],i[2]],[i[0],i[1],t[2]],[i[0],i[1],i[2]]].map(a=>qt(e,a[0],a[1],a[2]));return[[Math.min(...o.map(a=>a[0])),Math.min(...o.map(a=>a[1])),Math.min(...o.map(a=>a[2]))],[Math.max(...o.map(a=>a[0])),Math.max(...o.map(a=>a[1])),Math.max(...o.map(a=>a[2]))]]}u(Ci,"transformExtent");function pt(s){return[s[0].map(Math.fround),s[1].map(Math.fround)]}u(pt,"floatExtent");function ve(s,e,t){const i=[s,s,s];return i[t==="X"?0:t==="Y"?1:2]=e,[[-i[0],-i[1],-i[2]],[i[0],i[1],i[2]]]}u(ve,"axialExtent");function Ni(s,e,t,i){if(s<0||e<0||t<0)return null;const r=.5*s,o=s>0?(t-e)/s:0,a=o*e,l=o*t,n=Math.sqrt(o*o+1),d=e*n,h=r-a,p=t*n,m=-r-l,b=h+d,x=m-p,v=Math.max(d,p),D=i==="X"?0:i==="Y"?1:2,I=[-v,-v,-v],k=[v,v,v];return I[D]=x,k[D]=b,[I,k]}u(Ni,"capsule1Extent");function Mi(s){if(s==="/"||!s.startsWith("/"))return null;const e=s.lastIndexOf("/");return e===0?"/":s.slice(0,e)}u(Mi,"parentPath$1");const Ei=new Ct;class Ve{static{u(this,"XformCache")}_cache=new Map;_stage;_time;constructor(e,t){typeof e=="object"?(this._stage=e,this._time=t):(this._stage=void 0,this._time=e)}get time(){return this._time}getTime(){return this._time}setTime(e){if(e!==this._time){for(const t of this._cache.values())for(const i of t.values())i.ctmIsValid=!1;this._time=e}}clear(){this._cache.clear()}swap(e){const t=this._cache;this._cache=e._cache,e._cache=t;const i=this._time;this._time=e._time,e._time=i}getLocalTransformation(e){const t=this._entry(this._resolve(e));return!t||!t.xformable?{matrix:[...X],resetsXformStack:!1}:{matrix:t.query.getLocalTransformation(this._time),resetsXformStack:t.query.getResetXformStack()}}getLocalToWorldTransform(e){return[...this._getCtm(this._resolve(e))]}getParentToWorldTransform(e){return[...this._getCtm(this._parent(this._resolve(e)))]}transformMightBeTimeVarying(e){const t=this._entry(this._resolve(e));return t?(t.mightBeTimeVarying??=t.xformable&&je(t.prim),t.mightBeTimeVarying):!0}getResetXformStack(e){return this._entry(this._resolve(e))?.query.getResetXformStack()??!1}computeRelativeTransform(e,t){let i=[...X],r=!1;const o=this._resolve(t);for(let a=this._resolve(e);a&&!(o&&a.path===o.path&&a.getStage()===o.getStage());a=this._parent(a)){const l=this.getLocalTransformation(a);if(i=_(i,l.matrix),r=l.resetsXformStack,r)break}return{matrix:i,resetXformStack:r}}_resolve(e){return typeof e!="string"?e.isValid()?e:void 0:this._stage?.getPrim(e)}_parent(e){if(!e)return;const t=Mi(e.path);return t===null?void 0:e.getStage().getPrim(t)}_entry(e){if(!e)return;const t=e.getStage();let i=this._cache.get(t);i||(i=new Map,this._cache.set(t,i));let r=i.get(e.path);if(!r){const o=e.isA("Xformable");r={prim:e,xformable:o,query:o?new Ct(e):Ei,mightBeTimeVarying:void 0,ctm:[...X],ctmIsValid:!1},i.set(e.path,r)}return r}_getCtm(e){const t=this._entry(e);if(!e||!t)return X;if(t.ctmIsValid)return t.ctm;const i=t.query.getLocalTransformation(this._time);return t.ctm=t.query.getResetXformStack()?i:_(i,this._getCtm(this._parent(e))),t.ctmIsValid=!0,t.ctm}}function Ue(s){if(s!==void 0)return typeof s=="number"?s:s.isDefault()?void 0:s.GetValue()}u(Ue,"toTime");function _e(s){return new A(...s)}u(_e,"toGfMatrix");function oe(s){if(s==="/"||!s.startsWith("/"))return null;const e=s.lastIndexOf("/");return e===0?"/":s.slice(0,e)}u(oe,"parentPath");const Ge=Ut.and(Gt).and(Xt.not());function we(s){const e=new Map;for(const[t,i]of s)e.set(t,new y(i));return e}u(we,"copyBBoxes");function fe(s,e=""){return{prim:s,instanceInheritablePurpose:e}}u(fe,"primContext");function ge(s){return`${s.instanceInheritablePurpose}\0${s.prim.path}`}u(ge,"contextKey");class Qe{static{u(this,"Entry")}bboxes=new Map;purposeInfo={purpose:"",isInheritable:!1};isComplete=!1;isVarying=!1;isIncluded=!1;clone(){const e=new Qe;return e.bboxes=we(this.bboxes),e.purposeInfo={...this.purposeInfo},e.isComplete=this.isComplete,e.isVarying=this.isVarying,e.isIncluded=this.isIncluded,e}}function Ae(s,e){if(!e)return!1;const t=s===void 0?1.000001:s+1e-6;let i=e.getBracketingTimeSamples(t);if(i.length===0)return!1;let[r,o]=i;return r!==o||(i=e.getBracketingTimeSamples(r+1e-6),[r,o]=i,r!==o)||(i=e.getBracketingTimeSamples(r-1e-6),[r,o]=i,r!==o)}u(Ae,"isVaryingImpl");function Mt(s){const e=s.getKind();return e?it.isA(e,rt.component)||it.isA(e,rt.subcomponent):!1}u(Mt,"isComponentOrSubComponent");function Li(s){const e=s.getStage();let t=s.path;for(;t;){const i=e.getPrim(t);if(!i)break;if(Mt(i))return i;t=oe(t)}return e.getPrim("/")}u(Li,"getNearestComponent");function ht(s,e){for(;e&&!s.has(e);)s.add(e),e=oe(e)}u(ht,"addPathAndAncestors");class Ee{static{u(this,"BBoxCache")}_time;_baseTime=null;_includedPurposes;_useExtentsHint;_ignoreVisibility;_ctmCaches=new Map;_bboxCache=new Map;constructor(e,t=[],i=!1,r=!1){if(e instanceof Ee){const o=e;this._time=o._time,this._baseTime=o._baseTime,this._includedPurposes=[...o._includedPurposes],this._useExtentsHint=o._useExtentsHint,this._ignoreVisibility=o._ignoreVisibility;for(const a of o._ctmCaches.keys())this._ctmCaches.set(a,new Ve(a,o._time));for(const[a,l]of o._bboxCache){const n=new Map;for(const[d,h]of l)n.set(d,h.clone());this._bboxCache.set(a,n)}return}this._time=Ue(e),this._includedPurposes=[...t],this._useExtentsHint=i,this._ignoreVisibility=r}computeWorldBound(e){this._verifyPrim(e);const t=this._resolve(e);if(!t)return new y;const i=this._getCombinedBBoxForIncludedPurposes(t);return i.Transform(this._ctm(e)),i}computeRelativeBound(e,t){this._verifyPrim(e);const i=this._resolve(e);if(!i)return new y;const r=this._getCombinedBBoxForIncludedPurposes(i),o=this._ctm(e),a=this._ctm(t);return r.Transform(o.getMultiply(a.getInverse())),r}computeLocalBound(e){this._verifyPrim(e);const t=this._resolve(e);if(!t)return new y;const i=this._getCombinedBBoxForIncludedPurposes(t);return i.Transform(this._localTransformation(e)),i}computeUntransformedBound(e,t,i){if(t!==void 0)return this._computeBoundWithOverridesHelper(e,t,void 0,i??new Map);this._verifyPrim(e);const r=this._resolve(e);return r?this._getCombinedBBoxForIncludedPurposes(r):new y}computeWorldBoundWithOverrides(e,t,i,r){return this._computeBoundWithOverridesHelper(e,t,i,r)}computePointInstanceWorldBounds(e,t){return this._computePointInstanceBoundsHelper(e,t,this._ctm(e.prim))}computePointInstanceWorldBound(e,t){return this.computePointInstanceWorldBounds(e,[t])?.[0]??new y}computePointInstanceRelativeBounds(e,t,i){const r=this._ctm(e.prim),a=this._ctm(i).getInverse().getMultiply(r);return this._computePointInstanceBoundsHelper(e,t,a)}computePointInstanceRelativeBound(e,t,i){return this.computePointInstanceRelativeBounds(e,[t],i)?.[0]??new y}computePointInstanceLocalBounds(e,t){return this._computePointInstanceBoundsHelper(e,t,this._localTransformation(e.prim))}computePointInstanceLocalBound(e,t){return this.computePointInstanceLocalBounds(e,[t])?.[0]??new y}computePointInstanceUntransformedBounds(e,t){return this._computePointInstanceBoundsHelper(e,t,new A(1))}computePointInstanceUntransformedBound(e,t){return this.computePointInstanceUntransformedBounds(e,[t])?.[0]??new y}clear(){for(const e of this._ctmCaches.values())e.clear();this._bboxCache.clear()}setIncludedPurposes(e){this._includedPurposes=[...e]}getIncludedPurposes(){return[...this._includedPurposes]}getUseExtentsHint(){return this._useExtentsHint}getIgnoreVisibility(){return this._ignoreVisibility}setTime(e){const t=Ue(e);if(t===this._time)return;const i=this._time===void 0||t===void 0;for(const r of this._bboxCache.values())for(const o of r.values())(i||o.isVarying)&&(o.isComplete=!1,o.bboxes.clear());this._time=t;for(const r of this._ctmCaches.values())r.setTime(t)}getTime(){return this._time===void 0?be.Default():new be(this._time)}setBaseTime(e){this._baseTime=Ue(e)}getBaseTime(){return this._baseTime===null?this.getTime():this._baseTime===void 0?be.Default():new be(this._baseTime)}clearBaseTime(){this._baseTime=null}hasBaseTime(){return this._baseTime!==null}_verifyPrim(e){if(!e||!e.isValid())throw new Error(`Invalid prim: ${e?`<${e.path}>`:"null prim"}`)}_xformCache(e){let t=this._ctmCaches.get(e);return t||(t=new Ve(e,this._time),this._ctmCaches.set(e,t)),t.setTime(this._time),t}_ctm(e){return _e(this._xformCache(e.getStage()).getLocalToWorldTransform(e.path))}_localTransformation(e){return _e(this._xformCache(e.getStage()).getLocalTransformation(e.path).matrix)}_entries(e){let t=this._bboxCache.get(e);return t||(t=new Map,this._bboxCache.set(e,t)),t}_findEntry(e){return this._bboxCache.get(e.prim.getStage())?.get(ge(e))}_insertEntry(e){const t=this._entries(e.prim.getStage()),i=ge(e);let r=t.get(i);return r||(r=new Qe,t.set(i,r)),r}_computeBoundWithOverridesHelper(e,t,i,r){this._verifyPrim(e);const o=new Set(t),a=new Set;for(const p of o)ht(a,oe(p));const l=new Set;for(const p of r.keys())ht(l,oe(p));const n=e.getStage();let d=new y;const h=tt.fromPrim(e)[Symbol.iterator]();for(let p=h.next();!p.done;p=h.next()){const m=p.value,b=m.path;if(o.has(b)){h.pruneChildren();continue}if(a.has(b)||l.has(b))continue;let x=b,v;for(;x&&x!==e.path;){if(r.has(x)){v=x;break}x=oe(x)}let D;v===void 0?(D=this.computeRelativeBound(m,e),i&&D.Transform(i)):(D=this.computeRelativeBound(m,n.getPrim(v)),D.Transform(r.get(v))),d=y.combine(d,D),h.pruneChildren()}return d}_computePointInstanceBoundsHelper(e,t,i){const r=e.prim,o=r.getStage(),a=this._time;if(w(r,"protoIndices",a)===void 0){U(`${r.path} -- no prototype indices`);return}const n=B.getProtoIndices(r,a),d=B.getPrototypes(r);if(d.length===0){U(`${r.path} -- no prototypes`);return}for(const m of n)if(m<0||m>=d.length){U(`${r.path} -- invalid prototype index: ${m}. Should be in [0, ${d.length})`);return}const{xforms:h}=B.computeInstanceTransforms(r,{time:a,includeProtoXform:!0,stage:o,applyMask:!1});if(h.length!==n.length){U(`${r.path} -- could not compute instance transforms`);return}const p=[];for(const m of t){const b=n[m],x=o.getPrim(d[b]),v=this.computeUntransformedBound(x);v.Transform(_e(h[m]).getMultiply(i)),p.push(v)}return p}_getCombinedBBoxForIncludedPurposes(e){let t=new y;for(const i of this._includedPurposes){const r=e.get(i);r&&!r.getRange().IsEmpty()&&(t=y.combine(t,r))}return t}_shouldIncludePrim(e){return e.isA("Typed")?!(!e.isA("Imageable")||!this._ignoreVisibility&&w(e,"visibility",this._time)==="invisible"):!0}_computePurposeInfo(e,t,i){if(e.purposeInfo.purpose)return;const r=t.prim;if(r.isPrototype()){e.purposeInfo=t.instanceInheritablePurpose?{purpose:t.instanceInheritablePurpose,isInheritable:!0}:{purpose:"default",isInheritable:!1};return}const o=oe(r.path);if(o&&o!=="/"){const a=r.getStage().getPrim(o);if(a){const l=fe(a,t.instanceInheritablePurpose),n=this._findEntry(l);if(n){if(i){this._computePurposeInfo(n,l,!0),e.purposeInfo=C.computePurposeInfo(r,n.purposeInfo);return}if(n.purposeInfo.purpose){e.purposeInfo=C.computePurposeInfo(r,n.purposeInfo);return}}}}e.purposeInfo=C.computePurposeInfo(r)}_useExtentsHintForPrim(e){return this._useExtentsHint&&e.isModel()&&e.path!=="/"}_getExtentsHint(e){const t=w(e,"extentsHint",this._time);if(t==null)return;const i=se(t)??new Float32Array(0),r=[];for(let o=0;o+2<i.length;o+=3)r.push(new N(i[o],i[o+1],i[o+2]));return r}_shouldPruneChildren(e,t){if(t.isComplete||e.isA("Boundable"))return!0;if(!this._useExtentsHintForPrim(e))return!1;const i=this._getExtentsHint(e);return i!==void 0&&i.length>=2}_findOrCreateEntriesForPrim(e,t){const i=this._insertEntry(e);if(i.isComplete)return i;i.isIncluded=this._shouldIncludePrim(e.prim);const r=new Set,o=tt.fromPrim(e.prim,Ge)[Symbol.iterator]();for(let a=o.next();!a.done;a=o.next()){const l=a.value,n=fe(l,e.instanceInheritablePurpose),d=this._insertEntry(n);if(this._shouldPruneChildren(l,d))o.pruneChildren();else if(l.isInstance()){const h=l.getPrototype();this._computePurposeInfo(d,n,!0);const p=fe(h,nt(d.purposeInfo)),m=ge(p);r.has(m)||(r.add(m),t.push(p)),o.pruneChildren()}}return i}_resolvePrototypes(e){const t=new Map,i=u(o=>{const a=ge(o);if(t.has(a))return;const l={context:o,numDependencies:0,dependentPrototypes:[]};t.set(a,l);const n=[];this._findOrCreateEntriesForPrim(o,n),l.numDependencies=n.length;for(const d of n)i(d),t.get(ge(d)).dependentPrototypes.push(a)},"populate");for(const o of e)i(o);const r=[];for(const[o,a]of t)a.numDependencies===0&&r.push(o);for(;r.length>0;){const o=t.get(r.shift());this._resolvePrim(o.context,new A(1));for(const a of o.dependentPrototypes){const l=t.get(a);--l.numDependencies===0&&r.push(a)}}}_resolve(e){const t=[],i=fe(e);let r=this._findOrCreateEntriesForPrim(i,t);if(r.isComplete)return r.bboxes.size>0?we(r.bboxes):void 0;t.length>0&&this._resolvePrototypes(t);const o=Li(e),a=_e(new Ve(o.getStage()).getLocalToWorldTransform(o.path)).getInverse();if(this._resolvePrim(i,a),r=this._findEntry(i),!!r)return r.bboxes.size>0?we(r.bboxes):void 0}_getBBoxFromExtentsHint(e,t){const i=this._getExtentsHint(e);if(!i)return!1;const r=C.getOrderedPurposeTokens();for(let o=0;o<r.length;++o){const a=o*2;if(a+2>i.length)break;t.set(r[o],new y(new S(i[a],i[a+1])))}return!0}_resolvePrim(e,t){const i=this._findEntry(e);if(!i)return;const r=i.bboxes;if(i.isComplete)return;const o=e.prim;if(this._computePurposeInfo(i,e,!1),this._useExtentsHintForPrim(o)){const l=o.getAttr("extentsHint");if(l&&this._getBBoxFromExtentsHint(o,r)){i.isComplete=!0,i.isVarying=Ae(this._time,l),i.isIncluded=this._shouldIncludePrim(o);return}}if(!i.isVarying){const l=!this._ignoreVisibility&&o.isA("Imageable")?o.getAttr("visibility"):void 0,n=o.isA("Boundable")?o.getAttr("extent"):void 0;i.isVarying=o.isA("Xformable")&&je(o)||Ae(this._time,n)||Ae(this._time,l)}if(o.isA("Boundable")){const l=G.computeExtent(o,this._time);if(l){const n=i.purposeInfo.purpose,d=r.get(n)??new y;r.set(n,d),d.setRange(new S(new N(...l[0]),new N(...l[1])))}}else{let l=!1,n=new A(1);const d=Mt(o)?this._ctm(o).getInverse():t,h=[];let p,m;const b=o.isInstance();b?(p=o.getPrototype().getFilteredChildren(Ge),m=nt(i.purposeInfo)):(p=o.getFilteredChildren(Ge),m=e.instanceInheritablePurpose);for(const x of p){const v=fe(x,m),D=this._findEntry(v);if(D){if(D.isComplete||(D.isIncluded=this._shouldIncludePrim(x)),!this._ignoreVisibility&&!D.isIncluded){x.isA("Imageable")&&(i.isVarying||=Ae(this._time,x.getAttr("visibility")));continue}h.push(v)}}if(!b)for(const x of h)this._resolvePrim(x,d);for(const x of h){const v=x.prim,D=this._findEntry(x);if(D?.isComplete&&(i.isVarying||=D.isVarying,D.bboxes.size>0)){if(!l){n=this._ctm(o).getMultiply(d);for(const[F,Z]of r)Z.setMatrix(n),r.set(F,new y(Z.ComputeAlignedRange()));l=!0}const I=we(D.bboxes),k=b?this._localTransformation(v).getMultiply(n):this._ctm(v).getMultiply(d);for(const[F,Z]of I){Z.Transform(k);const ie=r.get(F)??new y;r.set(F,ie),ie.setRange(new S(ie.getRange()).unionWith(Z.ComputeAlignedRange()))}}}if(l){const x=n.getInverse();for(const v of r.values())v.setMatrix(x)}}i.isComplete=!0}}Di(Ee);class B extends G{static{u(this,"PointInstancer")}static typeName="PointInstancer";static get(e,t){return new B(e.getPrim(t),e)}static define(e,t){return new B(e.definePrim(t,"PointInstancer"),e)}isValid(){return super.isValid()&&this.prim.isA(B.typeName)}static getSchemaAttributeNames(e=!0){return e?["visibility","purpose","xformOpOrder","extent","protoIndices","ids","positions","orientations","orientationsf","scales","velocities","accelerations","angularVelocities","invisibleIds"]:["protoIndices","ids","positions","orientations","orientationsf","scales","velocities","accelerations","angularVelocities","invisibleIds"]}getProtoIndicesAttr(){return this.prim.getAttr(g.protoIndices)}createProtoIndicesAttr(e,t=!1){return this._createAttr(g.protoIndices,"int[]",!1,"varying",e,t)}getIdsAttr(){return this.prim.getAttr(g.ids)}createIdsAttr(e,t=!1){return this._createAttr(g.ids,"int64[]",!1,"varying",e,t)}getPositionsAttr(){return this.prim.getAttr(g.positions)}createPositionsAttr(e,t=!1){return this._createAttr(g.positions,"point3f[]",!1,"varying",e,t)}getOrientationsAttr(){return this.prim.getAttr(g.orientations)}createOrientationsAttr(e,t=!1){return this._createAttr(g.orientations,"quath[]",!1,"varying",e,t)}getOrientationsfAttr(){return this.prim.getAttr(g.orientationsf)}createOrientationsfAttr(e,t=!1){return this._createAttr(g.orientationsf,"quatf[]",!1,"varying",e,t)}getScalesAttr(){return this.prim.getAttr(g.scales)}createScalesAttr(e,t=!1){return this._createAttr(g.scales,"float3[]",!1,"varying",e,t)}getVelocitiesAttr(){return this.prim.getAttr(g.velocities)}createVelocitiesAttr(e,t=!1){return this._createAttr(g.velocities,"vector3f[]",!1,"varying",e,t)}getAccelerationsAttr(){return this.prim.getAttr(g.accelerations)}createAccelerationsAttr(e,t=!1){return this._createAttr(g.accelerations,"vector3f[]",!1,"varying",e,t)}getAngularVelocitiesAttr(){return this.prim.getAttr(g.angularVelocities)}createAngularVelocitiesAttr(e,t=!1){return this._createAttr(g.angularVelocities,"vector3f[]",!1,"varying",e,t)}getInvisibleIdsAttr(){return this.prim.getAttr(g.invisibleIds)}createInvisibleIdsAttr(e,t=!1){return this._createAttr(g.invisibleIds,"int64[]",!1,"varying",e,t)}getPrototypesRel(){return this.prim.rel(g.prototypes)}createPrototypesRel(){return this.prim.createRelationship(g.prototypes,!1)}static is(e){return e.typeName===B.typeName}activateId(e){return this.activateIds([e])}activateIds(e){return mt(e,"deleted",this.prim,"inactiveIds")}activateAllIds(){return this.prim.setMetadata("inactiveIds",Be.createExplicit([]).toValue())}deactivateId(e){return this.deactivateIds([e])}deactivateIds(e){return mt(e,"appended",this.prim,"inactiveIds")}visId(e,t){return this.visIds([e],t)}visIds(e,t){const i=this._getInvisibleIds(t);if(i===void 0)return!0;const r=new Set(i);let o=0;for(const l of e)r.delete(l)&&o++;const a=o?[...r].sort((l,n)=>l-n):i;return Xe(this.createInvisibleIdsAttr(),a,t)}visAllIds(e){return this.getInvisibleIdsAttr().hasAuthoredValue()?Xe(this.createInvisibleIdsAttr(),[],e):!0}invisId(e,t){return this.invisIds([e],t)}invisIds(e,t){const i=this._getInvisibleIds(t);if(i===void 0)return!0;const r=new Set(i);for(const o of e)r.has(o)||i.push(o);return Xe(this.createInvisibleIdsAttr(),i,t)}_getInvisibleIds(e){const t=this.getInvisibleIdsAttr(),i=M(e===void 0?t.getValue():t.getValueAtTime(e));return Array.isArray(i)?i.map(Number):void 0}computeInstanceTransformsAtTime(e,t,i="IncludeProtoXform",r="ApplyMask"){const{xforms:o}=B.computeInstanceTransforms(this.prim,{time:e,stage:this.stage,includeProtoXform:i==="IncludeProtoXform",applyMask:r==="ApplyMask"});return o.map(a=>new A(...a))}getInstanceCount(e){const t=this.getProtoIndicesAttr(),i=M(e===void 0?t.getValue():t.getValueAtTime(e));return Array.isArray(i)?i.length:0}computeExtentAtTime(e,t,i){const r=Et(this.prim,e,i);return r&&[r[0].map(Math.fround),r[1].map(Math.fround)]}static getProtoIndices(e,t){const i=M(w(e,"protoIndices",t));return Array.isArray(i)?i.map(Number):[]}static getPositions(e,t){const i=M(w(e,"positions",t));return Array.isArray(i)?i:[]}static getOrientations(e,t){const i=M(w(e,"orientations",t));return Array.isArray(i)?i.map(r=>Bt(r)):[]}static getScales(e,t){const i=M(w(e,"scales",t));return Array.isArray(i)?i:[]}static getVelocities(e,t){const i=M(w(e,"velocities",t));return Array.isArray(i)?i:[]}static getAccelerations(e,t){const i=M(w(e,"accelerations",t));return Array.isArray(i)?i:[]}static getInvisibleIds(e,t){const i=M(w(e,"invisibleIds",t));return Array.isArray(i)?i.map(Number):[]}static getIds(e,t){const i=M(w(e,"ids",t));return Array.isArray(i)?i.map(Number):[]}static getPrototypes(e){return e.getAttr("prototypes")?.getTargets()??[]}static computeMask(e,t){const i=B.getIds(e,t),r=i.length>0?i.length:B.getProtoIndices(e,t).length,o=new Set(B.getInvisibleIds(e,t)),a=At(e.getMetadata("inactiveIds"));for(const n of a?.explicitItems??[])o.add(Number(n));const l=new Array(r);for(let n=0;n<r;n++){const d=i.length>0?i[n]:n;l[n]=!o.has(d)}return l}static computeInstanceTransforms(e,t={}){const{time:i,includeProtoXform:r=!1,stage:o,applyMask:a=!0}=t,l=B.getProtoIndices(e,i),n=B.getPositions(e,i),d=B.getOrientations(e,i),h=B.getScales(e,i),p=a?B.computeMask(e,i):null,m=l.length;if(n.length!==m)return{xforms:[],protoIndices:[]};if(d.length>0&&d.length!==m)return{xforms:[],protoIndices:[]};if(h.length>0&&h.length!==m)return{xforms:[],protoIndices:[]};let b=null;r&&o&&(b=B.getPrototypes(e).map(I=>{const k=o.getPrim(I);return k?ki(k,i).matrix:[...X]}));const x=[],v=[];for(let D=0;D<m;D++){if(p&&!p[D])continue;let I=[...X];const k=h[D];k&&(I[0]=k[0]??1,I[5]=k[1]??1,I[10]=k[2]??1);const F=d[D];if(F){const Je=zt(F[0],F[1],F[2],F[3]);I=k?_(I,Je):Je}const Z=n[D];I[12]=Z[0]??0,I[13]=Z[1]??0,I[14]=Z[2]??0;const ie=l[D];b&&(I=_(b[ie]??[...X],I)),x.push(I),v.push(ie)}return{xforms:x,protoIndices:v}}}function Oi(s){return s.isExplicit?Be.createExplicit(s.explicitItems):Be.create(s.prependedItems,s.appendedItems,s.deletedItems)}u(Oi,"toListOp");function Ri(s){if(s.isExplicit)return s;const e=li([],s).sort((t,i)=>t-i);return{isExplicit:!1,explicitItems:[],deletedItems:[...s.deletedItems],prependedItems:e,appendedItems:[]}}u(Ri,"canonicalizeListOp");function mt(s,e,t,i){const o=t.getStage().getEditTarget(),a=o.getLayer();let l={isExplicit:!1,explicitItems:[],deletedItems:[],prependedItems:[],appendedItems:[]};if(a){const p=At(a.getField(o.mapToSpecPath(t.path),i));p&&(l={isExplicit:p.isExplicit,explicitItems:p.explicitItems.map(Number),deletedItems:p.deletedItems.map(Number),prependedItems:p.prependedItems.map(Number),appendedItems:p.appendedItems.map(Number)})}const n=new Be;n.setItems(s,e);const d=n.toValue();l=Ri(l);const h=ni(d,l);return t.setMetadata(i,Oi(h).toValue())}u(mt,"setOrMergeOverOp");function Xe(s,e,t){return t===void 0?s.set(e):s.setTimeSample(t,e),!0}u(Xe,"setAt");function Et(s,e,t){if(w(s,"protoIndices",e)===void 0)return U(`${s.path} -- no prototype indices`),null;const r=B.getProtoIndices(s,e),o=B.computeMask(s,e);if(o.length&&o.length!==r.length)return U(`${s.path} -- mask.size() [${o.length}] != protoIndices.size() [${r.length}]`),null;const a=B.getPrototypes(s);if(!a.length)return U(`${s.path} -- no prototypes`),null;for(const m of r)if(m<0||m>=a.length)return U(`${s.path} -- invalid prototype index: ${m}. Should be in [0, ${a.length})`),null;const l=s.getStage(),{xforms:n}=B.computeInstanceTransforms(s,{time:e,stage:l,includeProtoXform:!0,applyMask:!1});if(n.length!==r.length)return U(`${s.path} -- could not compute instance transforms`),null;const d=new Ee(e,["default","proxy","render"]),h=a.map(m=>{const b=l.getPrim(m);return b?d.computeUntransformedBound(b):new y}),p=new S;for(let m=0;m<r.length;m++){if(o.length&&!o[m])continue;const b=new y(h[r[m]]),x=new A(...n[m]);if(b.Transform(x),t){const v=new A(...t);b.Transform(v)}p.unionWith(b.ComputeAlignedRange())}return[[...p.getMin().data],[...p.getMax().data]]}u(Et,"computePointInstancerExtent");he(B.typeName,Et);const Vi={Plugins:[{Info:{SdfMetadata:{weight:{appliesTo:["attributes"],default:0,displayGroup:"BlendShape",documentation:"The weight value at which an inbeteen shape is applied.",type:"float"}},Types:{UsdSkelAnimation:{alias:{UsdSchemaBase:"SkelAnimation"},autoGenerated:!0,bases:["UsdTyped"],schemaIdentifier:"SkelAnimation",schemaKind:"concreteTyped"},UsdSkelBindingAPI:{alias:{UsdSchemaBase:"SkelBindingAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"SkelBindingAPI",schemaKind:"singleApplyAPI"},UsdSkelBlendShape:{alias:{UsdSchemaBase:"BlendShape"},autoGenerated:!0,bases:["UsdTyped"],schemaIdentifier:"BlendShape",schemaKind:"concreteTyped"},UsdSkelRoot:{alias:{UsdSchemaBase:"SkelRoot"},autoGenerated:!0,bases:["UsdGeomBoundable"],implementsComputeExtent:!0,schemaIdentifier:"SkelRoot",schemaKind:"concreteTyped"},UsdSkelSkeleton:{alias:{UsdSchemaBase:"Skeleton"},autoGenerated:!0,bases:["UsdGeomBoundable"],implementsComputeExtent:!0,schemaIdentifier:"Skeleton",schemaKind:"concreteTyped"}}},LibraryPath:"@PLUG_INFO_LIBRARY_PATH@",Name:"usdSkel",ResourcePath:"@PLUG_INFO_RESOURCE_PATH@",Root:"@PLUG_INFO_ROOT@",Type:"library"}]},Ui=`#usda 1.0
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

`;ae.GetInstance().RegisterPlugins(Vi,{usdSkel:{"generatedSchema.usda":Ui}});const Gi={Plugins:[{Info:{Types:{UsdLuxBoundableLightBase:{alias:{UsdSchemaBase:"BoundableLightBase"},autoGenerated:!0,bases:["UsdGeomBoundable"],schemaIdentifier:"BoundableLightBase",schemaKind:"abstractTyped"},UsdLuxCylinderLight:{alias:{UsdSchemaBase:"CylinderLight"},autoGenerated:!0,bases:["UsdLuxBoundableLightBase"],implementsComputeExtent:!0,schemaIdentifier:"CylinderLight",schemaKind:"concreteTyped"},UsdLuxDiskLight:{alias:{UsdSchemaBase:"DiskLight"},autoGenerated:!0,bases:["UsdLuxBoundableLightBase"],implementsComputeExtent:!0,schemaIdentifier:"DiskLight",schemaKind:"concreteTyped"},UsdLuxDistantLight:{alias:{UsdSchemaBase:"DistantLight"},autoGenerated:!0,bases:["UsdLuxNonboundableLightBase"],schemaIdentifier:"DistantLight",schemaKind:"concreteTyped"},UsdLuxDomeLight:{alias:{UsdSchemaBase:"DomeLight"},autoGenerated:!0,bases:["UsdLuxNonboundableLightBase"],schemaIdentifier:"DomeLight",schemaKind:"concreteTyped"},UsdLuxDomeLight_1:{alias:{UsdSchemaBase:"DomeLight_1"},autoGenerated:!0,bases:["UsdLuxNonboundableLightBase"],schemaIdentifier:"DomeLight_1",schemaKind:"concreteTyped"},UsdLuxGeometryLight:{alias:{UsdSchemaBase:"GeometryLight"},autoGenerated:!0,bases:["UsdLuxNonboundableLightBase"],schemaIdentifier:"GeometryLight",schemaKind:"concreteTyped"},UsdLuxLightAPI:{alias:{UsdSchemaBase:"LightAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],providesUsdShadeConnectableAPIBehavior:!0,schemaIdentifier:"LightAPI",schemaKind:"singleApplyAPI"},UsdLuxLightFilter:{alias:{UsdSchemaBase:"LightFilter"},autoGenerated:!0,bases:["UsdGeomXformable"],providesUsdShadeConnectableAPIBehavior:!0,schemaIdentifier:"LightFilter",schemaKind:"concreteTyped"},UsdLuxLightListAPI:{alias:{UsdSchemaBase:"LightListAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"LightListAPI",schemaKind:"singleApplyAPI"},UsdLuxListAPI:{alias:{UsdSchemaBase:"ListAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ListAPI",schemaKind:"singleApplyAPI"},UsdLuxMeshLightAPI:{alias:{UsdSchemaBase:"MeshLightAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"MeshLightAPI",schemaKind:"singleApplyAPI"},UsdLuxNonboundableLightBase:{alias:{UsdSchemaBase:"NonboundableLightBase"},autoGenerated:!0,bases:["UsdGeomXformable"],schemaIdentifier:"NonboundableLightBase",schemaKind:"abstractTyped"},UsdLuxPluginLight:{alias:{UsdSchemaBase:"PluginLight"},autoGenerated:!0,bases:["UsdGeomXformable"],schemaIdentifier:"PluginLight",schemaKind:"concreteTyped"},UsdLuxPluginLightFilter:{alias:{UsdSchemaBase:"PluginLightFilter"},autoGenerated:!0,bases:["UsdLuxLightFilter"],schemaIdentifier:"PluginLightFilter",schemaKind:"concreteTyped"},UsdLuxPortalLight:{alias:{UsdSchemaBase:"PortalLight"},autoGenerated:!0,bases:["UsdLuxBoundableLightBase"],implementsComputeExtent:!0,schemaIdentifier:"PortalLight",schemaKind:"concreteTyped"},UsdLuxRectLight:{alias:{UsdSchemaBase:"RectLight"},autoGenerated:!0,bases:["UsdLuxBoundableLightBase"],implementsComputeExtent:!0,schemaIdentifier:"RectLight",schemaKind:"concreteTyped"},UsdLuxShadowAPI:{alias:{UsdSchemaBase:"ShadowAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ShadowAPI",schemaKind:"singleApplyAPI"},UsdLuxShapingAPI:{alias:{UsdSchemaBase:"ShapingAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"ShapingAPI",schemaKind:"singleApplyAPI"},UsdLuxSphereLight:{alias:{UsdSchemaBase:"SphereLight"},autoGenerated:!0,bases:["UsdLuxBoundableLightBase"],implementsComputeExtent:!0,schemaIdentifier:"SphereLight",schemaKind:"concreteTyped"},UsdLuxVolumeLightAPI:{alias:{UsdSchemaBase:"VolumeLightAPI"},autoGenerated:!0,bases:["UsdAPISchemaBase"],schemaIdentifier:"VolumeLightAPI",schemaKind:"singleApplyAPI"},UsdLux_DiscoveryPlugin:{bases:["SdrDiscoveryPlugin"]},UsdLux_LightDefParserPlugin:{bases:["SdrParserPlugin"]}}},LibraryPath:"@PLUG_INFO_LIBRARY_PATH@",Name:"usdLux",ResourcePath:"@PLUG_INFO_RESOURCE_PATH@",Root:"@PLUG_INFO_ROOT@",Type:"library"}]},Lt=`#usda 1.0
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

`;ae.GetInstance().RegisterPlugins(Gi,{usdLux:{"generatedSchema.usda":Lt}});const f=Object.freeze({angular:"angular",automatic:"automatic",collectionFilterLinkIncludeRoot:"collection:filterLink:includeRoot",collectionLightLinkIncludeRoot:"collection:lightLink:includeRoot",collectionShadowLinkIncludeRoot:"collection:shadowLink:includeRoot",consumeAndContinue:"consumeAndContinue",consumeAndHalt:"consumeAndHalt",cubeMapVerticalCross:"cubeMapVerticalCross",filterLink:"filterLink",geometry:"geometry",guideRadius:"guideRadius",ignore:"ignore",independent:"independent",inputsAngle:"inputs:angle",inputsColor:"inputs:color",inputsColorTemperature:"inputs:colorTemperature",inputsDiffuse:"inputs:diffuse",inputsEnableColorTemperature:"inputs:enableColorTemperature",inputsExposure:"inputs:exposure",inputsHeight:"inputs:height",inputsIntensity:"inputs:intensity",inputsLength:"inputs:length",inputsNormalize:"inputs:normalize",inputsRadius:"inputs:radius",inputsShadowColor:"inputs:shadow:color",inputsShadowDistance:"inputs:shadow:distance",inputsShadowEnable:"inputs:shadow:enable",inputsShadowFalloff:"inputs:shadow:falloff",inputsShadowFalloffGamma:"inputs:shadow:falloffGamma",inputsShapingConeAngle:"inputs:shaping:cone:angle",inputsShapingConeSoftness:"inputs:shaping:cone:softness",inputsShapingFocus:"inputs:shaping:focus",inputsShapingFocusTint:"inputs:shaping:focusTint",inputsShapingIesAngleScale:"inputs:shaping:ies:angleScale",inputsShapingIesFile:"inputs:shaping:ies:file",inputsShapingIesNormalize:"inputs:shaping:ies:normalize",inputsSpecular:"inputs:specular",inputsTextureFile:"inputs:texture:file",inputsTextureFormat:"inputs:texture:format",inputsWidth:"inputs:width",latlong:"latlong",lightFilters:"light:filters",lightFilterShaderId:"lightFilter:shaderId",lightLink:"lightLink",lightList:"lightList",lightListCacheBehavior:"lightList:cacheBehavior",lightMaterialSyncMode:"light:materialSyncMode",lightShaderId:"light:shaderId",materialGlowTintsLight:"materialGlowTintsLight",MeshLight:"MeshLight",mirroredBall:"mirroredBall",noMaterialResponse:"noMaterialResponse",orientToStageUpAxis:"orientToStageUpAxis",poleAxis:"poleAxis",portals:"portals",scene:"scene",shadowLink:"shadowLink",treatAsLine:"treatAsLine",treatAsPoint:"treatAsPoint",VolumeLight:"VolumeLight",Y:"Y",Z:"Z",BoundableLightBase:"BoundableLightBase",CylinderLight:"CylinderLight",DiskLight:"DiskLight",DistantLight:"DistantLight",DomeLight:"DomeLight",DomeLight_1:"DomeLight_1",GeometryLight:"GeometryLight",LightAPI:"LightAPI",LightFilter:"LightFilter",LightListAPI:"LightListAPI",ListAPI:"ListAPI",MeshLightAPI:"MeshLightAPI",NonboundableLightBase:"NonboundableLightBase",PluginLight:"PluginLight",PluginLightFilter:"PluginLightFilter",PortalLight:"PortalLight",RectLight:"RectLight",ShadowAPI:"ShadowAPI",ShapingAPI:"ShapingAPI",SphereLight:"SphereLight",VolumeLightAPI:"VolumeLightAPI"});class q extends qe{static{u(this,"LightAPI")}static typeName="LightAPI";static get(e,t){return new q(e.getPrim(t),e)}isValid(){return super.isValid()&&this.prim.hasAPI(q.typeName)}static canApply(e){return e.canApplyAPI(q.typeName)}static apply(e){return e.applyAPI(q.typeName)?new q(e,e.getStage()):new q(void 0,e.getStage())}static getSchemaAttributeNames(e=!0){return e?["light:shaderId","light:materialSyncMode","inputs:intensity","inputs:exposure","inputs:diffuse","inputs:specular","inputs:normalize","inputs:color","inputs:enableColorTemperature","inputs:colorTemperature"]:["light:shaderId","light:materialSyncMode","inputs:intensity","inputs:exposure","inputs:diffuse","inputs:specular","inputs:normalize","inputs:color","inputs:enableColorTemperature","inputs:colorTemperature"]}getShaderIdAttr(){return this.prim.getAttr(f.lightShaderId)}createShaderIdAttr(e,t=!1){return this._createAttr(f.lightShaderId,"token",!1,"uniform",e,t)}getMaterialSyncModeAttr(){return this.prim.getAttr(f.lightMaterialSyncMode)}createMaterialSyncModeAttr(e,t=!1){return this._createAttr(f.lightMaterialSyncMode,"token",!1,"uniform",e,t)}getIntensityAttr(){return this.prim.getAttr(f.inputsIntensity)}createIntensityAttr(e,t=!1){return this._createAttr(f.inputsIntensity,"float",!1,"varying",e,t)}getExposureAttr(){return this.prim.getAttr(f.inputsExposure)}createExposureAttr(e,t=!1){return this._createAttr(f.inputsExposure,"float",!1,"varying",e,t)}getDiffuseAttr(){return this.prim.getAttr(f.inputsDiffuse)}createDiffuseAttr(e,t=!1){return this._createAttr(f.inputsDiffuse,"float",!1,"varying",e,t)}getSpecularAttr(){return this.prim.getAttr(f.inputsSpecular)}createSpecularAttr(e,t=!1){return this._createAttr(f.inputsSpecular,"float",!1,"varying",e,t)}getNormalizeAttr(){return this.prim.getAttr(f.inputsNormalize)}createNormalizeAttr(e,t=!1){return this._createAttr(f.inputsNormalize,"bool",!1,"varying",e,t)}getColorAttr(){return this.prim.getAttr(f.inputsColor)}createColorAttr(e,t=!1){return this._createAttr(f.inputsColor,"color3f",!1,"varying",e,t)}getEnableColorTemperatureAttr(){return this.prim.getAttr(f.inputsEnableColorTemperature)}createEnableColorTemperatureAttr(e,t=!1){return this._createAttr(f.inputsEnableColorTemperature,"bool",!1,"varying",e,t)}getColorTemperatureAttr(){return this.prim.getAttr(f.inputsColorTemperature)}createColorTemperatureAttr(e,t=!1){return this._createAttr(f.inputsColorTemperature,"float",!1,"varying",e,t)}getFiltersRel(){return this.prim.rel(f.lightFilters)}createFiltersRel(){return this.prim.createRelationship(f.lightFilters,!1)}static fromConnectableAPI(e){return new q(e.prim,e.stage)}connectableAPI(){return new Q(this.prim,this.stage)}createOutput(e,t){return new Q(this.prim,this.stage).createOutput(e,t)}getOutput(e){return new Q(this.prim,this.stage).getOutput(e)}getOutputs(e=!0){return new Q(this.prim,this.stage).getOutputs(e)}createInput(e,t){return new Q(this.prim,this.stage).createInput(e,t)}getInput(e){return new Q(this.prim,this.stage).getInput(e)}getInputs(e=!0){return new Q(this.prim,this.stage).getInputs(e)}getLightLinkCollectionAPI(){return new T(this.prim,this.stage,f.lightLink)}getShadowLinkCollectionAPI(){return new T(this.prim,this.stage,f.shadowLink)}getShaderIdAttrForRenderContext(e){return this.prim.getAttr(ft(e))}createShaderIdAttrForRenderContext(e,t,i=!1){return this._createAttr(ft(e),"token",!1,"uniform",t,i)}getShaderId(e){for(const i of e){const r=this.getShaderIdAttrForRenderContext(i);if(r.isValid()){const o=r.getValue();if(typeof o=="string"&&o!=="")return o}}const t=this.getShaderIdAttr()?.getValue();return typeof t=="string"?t:""}}function ft(s){return s===""?f.lightShaderId:`${s}:${f.lightShaderId}`}u(ft,"_GetShaderIdAttrName");class Xi extends jt{static{u(this,"LightAPIConnectableAPIBehavior")}constructor(){super(!0,!1)}canConnectInputToSource(e,t,i){return this._canConnectInputToSource(e,t,i,st.DerivedContainerNodes)}canConnectOutputToSource(e,t,i){return this._canConnectOutputToSource(e,t,i,st.DerivedContainerNodes)}}Wt(He.findByName("UsdLuxLightAPI"),new Xi);class j extends G{static{u(this,"BoundableLightBase")}static typeName="BoundableLightBase";static get(e,t){return new j(e.getPrim(t),e)}isValid(){return super.isValid()&&this.prim.isA(j.typeName)}static getSchemaAttributeNames(e=!0){return e?["visibility","purpose","xformOpOrder","extent"]:[]}lightAPI(){return new q(this.prim,this.stage)}getShaderIdAttr(){return this.lightAPI().getShaderIdAttr()}createShaderIdAttr(e,t=!1){return this.lightAPI().createShaderIdAttr(e,t)}getMaterialSyncModeAttr(){return this.lightAPI().getMaterialSyncModeAttr()}createMaterialSyncModeAttr(e,t=!1){return this.lightAPI().createMaterialSyncModeAttr(e,t)}getIntensityAttr(){return this.lightAPI().getIntensityAttr()}createIntensityAttr(e,t=!1){return this.lightAPI().createIntensityAttr(e,t)}getExposureAttr(){return this.lightAPI().getExposureAttr()}createExposureAttr(e,t=!1){return this.lightAPI().createExposureAttr(e,t)}getDiffuseAttr(){return this.lightAPI().getDiffuseAttr()}createDiffuseAttr(e,t=!1){return this.lightAPI().createDiffuseAttr(e,t)}getSpecularAttr(){return this.lightAPI().getSpecularAttr()}createSpecularAttr(e,t=!1){return this.lightAPI().createSpecularAttr(e,t)}getNormalizeAttr(){return this.lightAPI().getNormalizeAttr()}createNormalizeAttr(e,t=!1){return this.lightAPI().createNormalizeAttr(e,t)}getColorAttr(){return this.lightAPI().getColorAttr()}createColorAttr(e,t=!1){return this.lightAPI().createColorAttr(e,t)}getEnableColorTemperatureAttr(){return this.lightAPI().getEnableColorTemperatureAttr()}createEnableColorTemperatureAttr(e,t=!1){return this.lightAPI().createEnableColorTemperatureAttr(e,t)}getColorTemperatureAttr(){return this.lightAPI().getColorTemperatureAttr()}createColorTemperatureAttr(e,t=!1){return this.lightAPI().createColorTemperatureAttr(e,t)}getFiltersRel(){return this.lightAPI().getFiltersRel()}createFiltersRel(){return this.lightAPI().createFiltersRel()}}class ce extends j{static{u(this,"CylinderLight")}static typeName="CylinderLight";static get(e,t){return new ce(e.getPrim(t),e)}static define(e,t){return new ce(e.definePrim(t,"CylinderLight"),e)}isValid(){return super.isValid()&&this.prim.isA(ce.typeName)}static getSchemaAttributeNames(e=!0){return e?["visibility","purpose","xformOpOrder","extent","inputs:length","inputs:radius","treatAsLine"]:["inputs:length","inputs:radius","treatAsLine"]}getLengthAttr(){return this.prim.getAttr(f.inputsLength)}createLengthAttr(e,t=!1){return this._createAttr(f.inputsLength,"float",!1,"varying",e,t)}getRadiusAttr(){return this.prim.getAttr(f.inputsRadius)}createRadiusAttr(e,t=!1){return this._createAttr(f.inputsRadius,"float",!1,"varying",e,t)}getTreatAsLineAttr(){return this.prim.getAttr(f.treatAsLine)}createTreatAsLineAttr(e,t=!1){return this._createAttr(f.treatAsLine,"bool",!1,"varying",e,t)}}function Fi(s,e){const t=[Math.fround(e*.5),s,s];return[[-t[0],-t[1],-t[2]],t]}u(Fi,"_ComputeLocalExtent$4");function Hi(s,e,t){const i=new ce(s),r=gt(i.getRadiusAttr(),e);if(r===void 0)return null;const o=gt(i.getLengthAttr(),e);if(o===void 0)return null;const a=Fi(r,o);if(t){const n=new y(new S(new N(...a[0]),new N(...a[1])),new A(...t)).ComputeAlignedRange();return[[...n.getMin().data],[...n.getMax().data]]}return a}u(Hi,"_ComputeExtent$4");function gt(s,e){const t=e===void 0?s?.getValue():s?.getValueAtTime(e);return typeof t=="number"?Math.fround(t):void 0}u(gt,"_GetFloat$4");he(ce.typeName,Hi);class ue extends j{static{u(this,"DiskLight")}static typeName="DiskLight";static get(e,t){return new ue(e.getPrim(t),e)}static define(e,t){return new ue(e.definePrim(t,"DiskLight"),e)}isValid(){return super.isValid()&&this.prim.isA(ue.typeName)}static getSchemaAttributeNames(e=!0){return e?["visibility","purpose","xformOpOrder","extent","inputs:radius"]:["inputs:radius"]}getRadiusAttr(){return this.prim.getAttr(f.inputsRadius)}createRadiusAttr(e,t=!1){return this._createAttr(f.inputsRadius,"float",!1,"varying",e,t)}}function Yi(s){const e=[s,s,0];return[[-e[0],-e[1],-e[2]],e]}u(Yi,"_ComputeLocalExtent$3");function Zi(s,e,t){const i=new ue(s),r=$i(i.getRadiusAttr(),e);if(r===void 0)return null;const o=Yi(r);if(t){const l=new y(new S(new N(...o[0]),new N(...o[1])),new A(...t)).ComputeAlignedRange();return[[...l.getMin().data],[...l.getMax().data]]}return o}u(Zi,"_ComputeExtent$3");function $i(s,e){const t=e===void 0?s?.getValue():s?.getValueAtTime(e);return typeof t=="number"?Math.fround(t):void 0}u($i,"_GetFloat$3");he(ue.typeName,Zi);class de extends j{static{u(this,"PortalLight")}static typeName="PortalLight";static get(e,t){return new de(e.getPrim(t),e)}static define(e,t){return new de(e.definePrim(t,"PortalLight"),e)}isValid(){return super.isValid()&&this.prim.isA(de.typeName)}static getSchemaAttributeNames(e=!0){return e?["visibility","purpose","xformOpOrder","extent","inputs:width","inputs:height"]:["inputs:width","inputs:height"]}getWidthAttr(){return this.prim.getAttr(f.inputsWidth)}createWidthAttr(e,t=!1){return this._createAttr(f.inputsWidth,"float",!1,"varying",e,t)}getHeightAttr(){return this.prim.getAttr(f.inputsHeight)}createHeightAttr(e,t=!1){return this._createAttr(f.inputsHeight,"float",!1,"varying",e,t)}}function qi(s,e){const t=[Math.fround(s*.5),Math.fround(e*.5),0];return[[-t[0],-t[1],-t[2]],t]}u(qi,"_ComputeLocalExtent$2");function zi(s,e,t){const i=new de(s),r=yt(i.getWidthAttr(),e);if(r===void 0)return null;const o=yt(i.getHeightAttr(),e);if(o===void 0)return null;const a=qi(r,o);if(t){const n=new y(new S(new N(...a[0]),new N(...a[1])),new A(...t)).ComputeAlignedRange();return[[...n.getMin().data],[...n.getMax().data]]}return a}u(zi,"_ComputeExtent$2");function yt(s,e){const t=e===void 0?s?.getValue():s?.getValueAtTime(e);return typeof t=="number"?Math.fround(t):void 0}u(yt,"_GetFloat$2");he(de.typeName,zi);class pe extends j{static{u(this,"RectLight")}static typeName="RectLight";static get(e,t){return new pe(e.getPrim(t),e)}static define(e,t){return new pe(e.definePrim(t,"RectLight"),e)}isValid(){return super.isValid()&&this.prim.isA(pe.typeName)}static getSchemaAttributeNames(e=!0){return e?["visibility","purpose","xformOpOrder","extent","inputs:width","inputs:height","inputs:texture:file"]:["inputs:width","inputs:height","inputs:texture:file"]}getWidthAttr(){return this.prim.getAttr(f.inputsWidth)}createWidthAttr(e,t=!1){return this._createAttr(f.inputsWidth,"float",!1,"varying",e,t)}getHeightAttr(){return this.prim.getAttr(f.inputsHeight)}createHeightAttr(e,t=!1){return this._createAttr(f.inputsHeight,"float",!1,"varying",e,t)}getTextureFileAttr(){return this.prim.getAttr(f.inputsTextureFile)}createTextureFileAttr(e,t=!1){return this._createAttr(f.inputsTextureFile,"asset",!1,"varying",e,t)}}function Ki(s,e){const t=[Math.fround(s*.5),Math.fround(e*.5),0];return[[-t[0],-t[1],-t[2]],t]}u(Ki,"_ComputeLocalExtent$1");function Wi(s,e,t){const i=new pe(s),r=bt(i.getWidthAttr(),e);if(r===void 0)return null;const o=bt(i.getHeightAttr(),e);if(o===void 0)return null;const a=Ki(r,o);if(t){const n=new y(new S(new N(...a[0]),new N(...a[1])),new A(...t)).ComputeAlignedRange();return[[...n.getMin().data],[...n.getMax().data]]}return a}u(Wi,"_ComputeExtent$1");function bt(s,e){const t=e===void 0?s?.getValue():s?.getValueAtTime(e);return typeof t=="number"?Math.fround(t):void 0}u(bt,"_GetFloat$1");he(pe.typeName,Wi);class ee extends j{static{u(this,"SphereLight")}static typeName="SphereLight";static get(e,t){return new ee(e.getPrim(t),e)}static define(e,t){return new ee(e.definePrim(t,"SphereLight"),e)}isValid(){return super.isValid()&&this.prim.isA(ee.typeName)}static getSchemaAttributeNames(e=!0){return e?["visibility","purpose","xformOpOrder","extent","inputs:radius","treatAsPoint"]:["inputs:radius","treatAsPoint"]}getRadiusAttr(){return this.prim.getAttr(f.inputsRadius)}createRadiusAttr(e,t=!1){return this._createAttr(f.inputsRadius,"float",!1,"varying",e,t)}getTreatAsPointAttr(){return this.prim.getAttr(f.treatAsPoint)}createTreatAsPointAttr(e,t=!1){return this._createAttr(f.treatAsPoint,"bool",!1,"varying",e,t)}static is(e){return e.isA(ee.typeName)}}function ji(s){const e=[s,s,s];return[[-e[0],-e[1],-e[2]],e]}u(ji,"_ComputeLocalExtent");function Qi(s,e,t){const i=new ee(s),r=Ji(i.getRadiusAttr(),e);if(r===void 0)return null;const o=ji(r);if(t){const l=new y(new S(new N(...o[0]),new N(...o[1])),new A(...t)).ComputeAlignedRange();return[[...l.getMin().data],[...l.getMax().data]]}return o}u(Qi,"_ComputeExtent");function Ji(s,e){const t=e===void 0?s?.getValue():s?.getValueAtTime(e);return typeof t=="number"?Math.fround(t):void 0}u(Ji,"_GetFloat");he(ee.typeName,Qi);const Y={shadingSystem:"USD",discoveryType:"usd-schema-gen",MeshLight:"MeshLight",MeshLightAPI:"MeshLightAPI",LightAPI:"LightAPI",ShadowAPI:"ShadowAPI",ShapingAPI:"ShapingAPI",VolumeLight:"VolumeLight",VolumeLightAPI:"VolumeLightAPI"};function er(s,e,t){const i={...t};i.help=`Fallback shader node generated from the USD ${s.getPrim(e)?.typeName??""} schema`;const r=_t.getPrimvarNamesMetadataString(i.primvars??"",s,e);return r!==""&&(i.primvars=r),i.subdomain="lighting",i.context="light",i}u(er,"_GetSdrMetadata");function tr(){const s=ci.createAnonymous("generatedSchema.usda");return s.importFromString(Lt)?s:void 0}u(tr,"_GetGeneratedSchema");function ir(s,e,t,i){const r=s.getPrimAtPath(`/${e}`);if(!r)return!1;for(const o of r.getProperties())if(!ui(s,o.getPath(),t,`${i}.${o.getPath().name}`))return!1;return!0}u(ir,"_CopyPropertiesFromSchema");class te{static{u(this,"UsdLux_LightDefParserPlugin")}static _getShadingSystem(){return Y.shadingSystem}static _getDiscoveryType(){return Y.discoveryType}static _getShaderIdToAPITypeNameMap(){return Dt}parseShaderNode(e){const i=Dt.get(e.identifier)??e.identifier,r=tr();if(!r)return Fe(e);const o=Ft.createNew(),a=o.getRootLayer(),l=`/${i}`;o.definePrim(l);const n=[Y.LightAPI,i,Y.ShadowAPI,Y.ShapingAPI];for(const h of n)if(!ir(r,h,a,l))return Fe(e);if(!o.getPrim(l))return Fe(e);const d=er(o,l,e.metadata??{});return new vt(e.identifier,e.version,e.name,e.function,d.context,Y.shadingSystem,"","",_t.getProperties(o,l),d,e.sourceCode??"")}getDiscoveryTypes(){return[te._getDiscoveryType()]}getShadingSystem(){return te._getShadingSystem()}}const Dt=new Map([[Y.MeshLight,Y.MeshLightAPI],[Y.VolumeLight,Y.VolumeLightAPI]]);function Fe(s){return new vt(s.identifier,s.version,s.name,s.function,"unknown discovery type","unknown shading system",s.resolvedUri,s.resolvedUri)}u(Fe,"_GetInvalidShaderNode");Qt("UsdLux_LightDefParserPlugin",te);class rr{static{u(this,"UsdLux_DiscoveryPlugin")}getSearchURIs(){return[]}discoverShaderNodes(){const e=[],t=He.findByName("UsdLuxBoundableLightBase"),i=He.findByName("UsdLuxNonboundableLightBase"),r=new Set;for(const n of ae.getAllDerivedTypes(t))r.add(n);for(const n of ae.getAllDerivedTypes(i))r.add(n);const o=te._getShaderIdToAPITypeNameMap(),a=[],l=ae.GetInstance().GetPluginWithName("usdLux");for(const n of r){if(!l?.declaresType(n))continue;const d=H.getConcreteSchemaTypeName(n);d!==""&&a.push(d)}for(const n of o.keys())a.push(n);for(const n of a)e.push({identifier:n,version:new ei().getAsDefault(),name:n,function:"",discoveryType:te._getDiscoveryType(),sourceType:te._getShadingSystem(),uri:"",resolvedUri:""});return e}}Jt("UsdLux_DiscoveryPlugin",rr);export{G as B,ke as C,S as G,C as I,q as L,g as U,Ve as X,y as a,Tt as b,ur as c,w as d,mr as e,ze as f,pr as g,hr as h,T as i,dr as j,P as k,gi as l,J as m,c as n,K as o,M as p,f as q,wt as r,Ct as s,se as t};
