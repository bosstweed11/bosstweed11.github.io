var wt=`struct Triangle { a:vec4f,b:vec4f,c:vec4f,color:vec4f,extra:vec4f,n0:vec4f,n1:vec4f,n2:vec4f,emission:vec4f,uv01:vec4f,uv2:vec4f }
struct Node { lo:vec4f,hi:vec4f,leaf:vec4f }
struct Params { p:array<vec4f,32> }
@group(0) @binding(0) var<uniform> u:Params;
@group(0) @binding(1) var<storage,read> tris:array<Triangle>;
@group(0) @binding(2) var<storage,read> nodes:array<Node>;
@group(0) @binding(3) var<storage,read_write> pixels:array<vec4f>;
@group(0) @binding(4) var surfaces:texture_2d_array<f32>;
@group(0) @binding(5) var output:texture_storage_2d<rgba8unorm,write>;
struct Guide { position:vec4f,normal:vec4f,albedo:vec4f }
@group(0) @binding(6) var<storage,read_write> guides:array<Guide>;
@group(0) @binding(7) var<storage,read> emitters:array<vec4f>;
@group(0) @binding(8) var<storage,read> surfaceInfo:array<vec4f>;
@group(0) @binding(9) var<storage,read> visibility:array<f32>;
// Header, top-level BVH nodes, then shared-prototype instance records.
// SHARED_STORAGE_READER
fn instanceValue(index:u32)->vec4f {
 let at=(u32(u.p[8].x)+index)*4u;
 return bitcast<vec4f>(vec4u(sharedStorage[at],sharedStorage[at+1u],sharedStorage[at+2u],sharedStorage[at+3u]));
}
var<private> primaryGuide:Guide;
var<private> seed:u32;
const PI=3.14159265;
fn random()->f32 {seed=seed*1664525u+1013904223u;var x=seed;x=((x>>((x>>28u)+4u))^x)*277803737u;x=(x>>22u)^x;return f32(x)/4294967296.;}
struct Hit { distance:f32,id:i32,uv:vec2f,instance:i32 }
fn intersectNodes(ro:vec3f,rd:vec3f,limit:f32,anyHit:bool,begin:u32,end:u32,instance:i32)->Hit {
 var hit=Hit(limit,-1,vec2f(0.),instance);var ni=begin;
 // Avoid 0*infinity at slab boundaries.
 let inv=sign(rd+vec3f(1e-20))/max(abs(rd),vec3f(1e-20));
 loop {if(ni>=end){break;}let node=nodes[ni];let a=(node.lo.xyz-ro)*inv;let b=(node.hi.xyz-ro)*inv;let lo=min(a,b);let hi=max(a,b);
 if(max(max(lo.x,lo.y),max(lo.z,u.p[5].x*.25))>min(min(hi.x,hi.y),min(hi.z,hit.distance))){ni=u32(node.lo.w);continue;}
 for(var j=0u;j<u32(node.leaf.x);j++){let id=u32(node.hi.w)+j;let t=tris[id];if(visibility[u32(t.extra.x)]<.5){continue;}let p=cross(rd,t.c.xyz);let det=dot(t.b.xyz,p);if(abs(det)<1e-15){continue;}let invdet=1./det;let s=ro-t.a.xyz;let x=dot(s,p)*invdet;if(x<0.||x>1.){continue;}let q=cross(s,t.b.xyz);let y=dot(rd,q)*invdet;if(y<0.||x+y>1.){continue;}let d=dot(t.c.xyz,q)*invdet;if(d>u.p[5].x*.25&&d<hit.distance){hit=Hit(d,i32(id),vec2f(x,y),instance);if(anyHit){return hit;}}}
 ni++;}return hit;
}
fn instanceOffset(index:u32)->u32 {return u32(instanceValue(0u).y)+index*9u;}
fn intersect(ro:vec3f,rd:vec3f,limit:f32,anyHit:bool)->Hit {
 if(u.p[6].w<.5){return intersectNodes(ro,rd,limit,anyHit,0u,arrayLength(&nodes),-1);}
 var hit=Hit(limit,-1,vec2f(0.),-1);var ni=0u;
 let inv=sign(rd+vec3f(1e-20))/max(abs(rd),vec3f(1e-20));
 loop {
  if(ni>=u32(instanceValue(0u).x)){break;}
  let offset=1u+ni*3u;let lower=instanceValue(offset);let upper=instanceValue(offset+1u);let leaf=instanceValue(offset+2u);
  let a=(lower.xyz-ro)*inv;let b=(upper.xyz-ro)*inv;let lo=min(a,b);let hi=max(a,b);
  if(max(max(lo.x,lo.y),max(lo.z,u.p[5].x*.25))>min(min(hi.x,hi.y),min(hi.z,hit.distance))){ni=u32(lower.w);continue;}
  for(var j=0u;j<u32(leaf.x);j++) {
   let index=u32(upper.w)+j;let at=instanceOffset(index);let recordInfo=instanceValue(at+8u);if(recordInfo.z<.5){continue;}
   let inverse=mat4x4f(instanceValue(at+4u),instanceValue(at+5u),instanceValue(at+6u),instanceValue(at+7u));
   // Do not normalize: the local ray parameter must stay in world-ray units.
   let localOrigin=(inverse*vec4f(ro,1.)).xyz;let localDirection=(inverse*vec4f(rd,0.)).xyz;
   let next=intersectNodes(localOrigin,localDirection,hit.distance,anyHit,u32(recordInfo.x),u32(recordInfo.y),i32(index));
   if(next.id>=0){hit=next;if(anyHit){return hit;}}
  }
  ni++;
 }
 return hit;
}
fn worldTriangle(hit:Hit)->Triangle {
 var t=tris[hit.id];if(hit.instance<0){return t;}
 let at=instanceOffset(u32(hit.instance));let matrix=mat4x4f(instanceValue(at),instanceValue(at+1u),instanceValue(at+2u),instanceValue(at+3u));
 let normalMatrix=transpose(mat4x4f(instanceValue(at+4u),instanceValue(at+5u),instanceValue(at+6u),instanceValue(at+7u)));
 t.a=vec4f((matrix*vec4f(t.a.xyz,1.)).xyz,t.a.w);
 t.b=vec4f((matrix*vec4f(t.b.xyz,0.)).xyz,t.b.w);t.c=vec4f((matrix*vec4f(t.c.xyz,0.)).xyz,t.c.w);
 t.n0=vec4f(normalize((normalMatrix*vec4f(t.n0.xyz,0.)).xyz),t.n0.w);
 t.n1=vec4f(normalize((normalMatrix*vec4f(t.n1.xyz,0.)).xyz),t.n1.w);
 t.n2=vec4f(normalize((normalMatrix*vec4f(t.n2.xyz,0.)).xyz),t.n2.w);
 t.extra.x+=instanceValue(at+8u).w*u.p[7].x;
 return t;
}
fn texel(t:Triangle,bary:vec2f)->vec3f {
 if(t.n0.w<1.){return vec3f(1.);}let slot=u32(t.n0.w)-1u;let info=surfaceInfo[slot];
 var uv=t.uv01.xy*(1.-bary.x-bary.y)+t.uv01.zw*bary.x+t.uv2.xy*bary.y;
 if(info.w<0.){uv.y=1.-uv.y;}
 let xy=vec2i(clamp(uv,vec2f(0.),vec2f(.999999))*info.xy);
 let c=textureLoad(surfaces,xy,i32(slot),0).rgb;
 return select(c,select(c/12.92,pow((c+.055)/1.055,vec3f(2.4)),c>vec3f(.04045)),abs(info.w)>1.5);
}
fn emitted(t:Triangle,bary:vec2f)->vec3f {var c=t.emission.rgb;if(t.n0.w>=1.){c+=texel(t,bary)*surfaceInfo[u32(t.n0.w)-1u].z;}return c;}
fn basis(n:vec3f,v:vec3f)->vec3f {let helper=select(vec3f(0.,1.,0.),vec3f(1.,0.,0.),abs(n.y)>.9);let x=normalize(cross(helper,n));return normalize(x*v.x+cross(n,x)*v.y+n*v.z);}
fn fresnel(f0:vec3f,c:f32)->vec3f {return f0+(vec3f(1.)-f0)*pow(1.-clamp(c,0.,1.),5.);}
fn distribution(nh:f32,a:f32)->f32 {let q=nh*nh*(a*a-1.)+1.;return a*a/(PI*q*q);}
fn smith(nv:f32,a:f32)->f32 {return 2.*nv/max(nv+sqrt(a*a+(1.-a*a)*nv*nv),1e-7);}
fn brdf(t:Triangle,albedo:vec3f,n:vec3f,v:vec3f,l:vec3f)->vec3f {
 let nv=max(dot(n,v),0.);let nl=max(dot(n,l),0.);if(nv<=0.||nl<=0.){return vec3f(0.);}
 let h=normalize(v+l);let a=max(.002,t.color.w*t.color.w);let metal=clamp(t.extra.y,0.,1.);let ior=max(1.,t.extra.w);let f0=mix(vec3f(pow((ior-1.)/(ior+1.),2.)),albedo,metal);let f=fresnel(f0,dot(v,h));
 return (vec3f(1.)-f)*albedo*(1.-metal)/PI+f*distribution(max(dot(n,h),0.),a)*smith(nv,a)*smith(nl,a)/max(4.*nv*nl,1e-7);
}
// Thin sheets transmit straight shadow paths with the same Fresnel/opacity
// convention as camera paths. Solid refractive caustics remain outside profile.
// Return deterministic straight-through visibility and crossed thin boundaries.
fn meshShadowPath(origin:vec3f,direction:vec3f,limit:f32)->vec2f {
 if(u.p[9].w==0.){return vec2f(1.,0.);}
 if(u.p[5].y==0.){return vec2f(select(0.,1.,intersect(origin,direction,limit,true).id<0),0.);}
 var ro=origin;var remaining=limit;var transmission=1.;
 for(var layer=0u;layer<8u;layer++){
  let hit=intersect(ro,direction,remaining,false);if(hit.id<0){return vec2f(transmission,f32(layer));}
  let t=worldTriangle(hit);let opacity=clamp(t.extra.z,0.,1.);if(t.n2.w<.5||opacity>=1.){return vec2f(0.);}
  let n=normalize(t.n0.xyz*(1.-hit.uv.x-hit.uv.y)+t.n1.xyz*hit.uv.x+t.n2.xyz*hit.uv.y);let ior=max(1.0001,t.extra.w);let f=fresnel(vec3f(pow((ior-1.)/(ior+1.),2.)),abs(dot(n,direction))).x;
  transmission*=(1.-opacity)*(1.-f);if(transmission<.00001){return vec2f(0.);}
  let step=hit.distance+u.p[5].x;remaining-=step;if(remaining<=0.){return vec2f(transmission,f32(layer+1u));}ro+=direction*step;
 }return vec2f(0.);
}
fn meshShadowTransmission(origin:vec3f,direction:vec3f,limit:f32)->f32{return meshShadowPath(origin,direction,limit).x;}
fn bsdfPdf(t:Triangle,n:vec3f,v:vec3f,l:vec3f)->f32 {
 let nl=dot(n,l);if(nl<=0.||dot(n,v)<=0.){return 0.;}
 let h=normalize(v+l);let probability=mix(.25,1.,clamp(t.extra.y,0.,1.));let a=max(.002,t.color.w*t.color.w);
 return probability*distribution(max(dot(n,h),0.),a)*max(dot(n,h),0.)/max(4.*abs(dot(v,h)),1e-7)+(1.-probability)*nl/PI;
}
fn powerWeight(a:f32,b:f32)->f32 {if(a<=0.){return 0.;}if(b<=0.){return 1.;}let ratio=b/a;return 1./(1.+ratio*ratio);}
// CDF entries retain increasing triangle IDs; use the actual rounded CDF mass.
fn emitterSelection(id:u32)->f32 {
 let count=u32(u.p[19].x);var lo=0u;var hi=count;
 loop {if(lo>=hi){break;}let mid=(lo+hi)/2u;if(u32(emitters[mid].x)<id){lo=mid+1u;}else{hi=mid;}}
 if(lo>=count||u32(emitters[lo].x)!=id){return 0.;}
 var previous=0.;if(lo>0u){previous=emitters[lo-1u].y;}return (emitters[lo].y-previous)/u.p[19].y;
}
fn emitterPdf(t:Triangle,id:u32,origin:vec3f,point:vec3f)->f32 {
 let delta=point-origin;let distanceSquared=dot(delta,delta);let normal=normalize(cross(t.b.xyz,t.c.xyz));let cosine=select(abs(dot(normal,-normalize(delta))),max(dot(normal,-normalize(delta)),0.),t.n1.w>0.);
 if(cosine<=0.||t.emission.w<=0.){return 0.;}return emitterSelection(id)*distanceSquared/(t.emission.w*cosine);
}
// FOG_TRANSPORT
fn shadowTransmission(origin:vec3f,direction:vec3f,limit:f32)->f32 {
 if(u.p[9].w==0.){return 1.;}
 return meshShadowTransmission(origin,direction,limit)*fogTransmittance(origin,direction,limit);
}
fn samplePath(ro0:vec3f,rd0:vec3f)->vec3f {
 var ro=ro0;var rd=rd0;var throughput=vec3f(1.);var radiance=vec3f(0.);var specular=true;var previousPdf=0.;var previousOrigin=ro0;var thinBoundaries=0u;var thinProbability=1.;let useMIS=u.p[19].w>.5&&u.p[9].w>.5;
 for(var bounce=0u;bounce<u32(u.p[4].z);bounce++){
  let hit=intersect(ro,rd,1e8,false);
  let medium=fogTransport(ro,rd,hit.distance);radiance+=throughput*medium.rgb;throughput*=medium.a;
  if(hit.id<0){if(bounce==0u){primaryGuide=Guide(vec4f(0.,0.,0.,-1.),vec4f(0.),vec4f(1.));}radiance+=throughput*u.p[10].rgb;break;}
  let t=worldTriangle(hit);let pos=ro+rd*hit.distance;let gn=normalize(cross(t.b.xyz,t.c.xyz));let entering=dot(gn,rd)<0.;let geometric=select(-gn,gn,entering);
  var n=normalize(t.n0.xyz*(1.-hit.uv.x-hit.uv.y)+t.n1.xyz*hit.uv.x+t.n2.xyz*hit.uv.y);if(dot(n,geometric)<0.){n=-n;}if(dot(n,-rd)<0.){n=geometric;}
  let albedo=clamp(t.color.rgb*texel(t,hit.uv),vec3f(0.),vec3f(.999));
  if(bounce==0u){primaryGuide=Guide(vec4f(pos,select(0.,1.,any(emitted(t,hit.uv)>vec3f(0.)))),vec4f(n,t.extra.x),vec4f(albedo,select(0.,1.,t.extra.z<.999||t.extra.y>.1)));}
  if((specular||useMIS)&&(t.n1.w==0.||entering)&&any(emitted(t,hit.uv)>vec3f(0.))){
   var weight=1.;if(useMIS&&!specular){weight=powerWeight(previousPdf*thinProbability,emitterPdf(t,u32(hit.id),previousOrigin,pos));}
   radiance+=throughput*emitted(t,hit.uv)*weight;
  }
  let eps=u.p[5].x;let origin=pos+geometric*eps;
  // Opacity blends opaque response and a dielectric boundary. Solid glass uses
  // front/back geometric orientation; thin mode is resolved per mesh at preparation.
  if(random()>clamp(t.extra.z,0.,1.)){
   let ior=max(1.0001,t.extra.w);let thin=t.n2.w>.5;let eta=select(ior,1./ior,entering||thin);let ci=clamp(dot(-rd,n),0.,1.);let transmitted=refract(rd,n,eta);let total=!thin&&dot(transmitted,transmitted)<1e-10;
   let fr=fresnel(vec3f(pow((ior-1.)/(ior+1.),2.)),ci).x;
   if(total||random()<fr){rd=reflect(rd,n);ro=origin;specular=true;}else{
    rd=select(transmitted,rd,thin);ro=pos-geometric*eps;
    if(useMIS&&thin&&!specular){thinBoundaries++;thinProbability*=(1.-clamp(t.extra.z,0.,1.))*(1.-fr);if(thinBoundaries>=8u||thinProbability<.00001){specular=true;}}
    else{specular=true;}
   }
   continue;
  }
  let view=-rd;
  // Power-weighted CDF selects emissive triangles; both selection and area PDF explicit.
  let count=u32(u.p[19].x);
  if(count>0u){let pick=random()*u.p[19].y;var lo=0u;var hi=count;loop{if(lo>=hi){break;}let mid=(lo+hi)/2u;if(emitters[mid].y<=pick){lo=mid+1u;}else{hi=mid;}}let chosen=min(lo,count-1u);let entry=emitters[chosen];var previous=0.;if(chosen>0u){previous=emitters[chosen-1u].y;}let selection=(entry.y-previous)/u.p[19].y;let light=tris[u32(entry.x)];let r=sqrt(random());let bary=vec2f(r*(1.-random()),0.);let uv=vec2f(bary.x,r-bary.x);let lp=light.a.xyz+light.b.xyz*uv.x+light.c.xyz*uv.y;let delta=lp-origin;let d2=dot(delta,delta);let ld=normalize(delta);let ln=normalize(cross(light.b.xyz,light.c.xyz));let lc=select(abs(dot(ln,-ld)),max(dot(ln,-ld),0.),light.n1.w>0.);let cosine=max(dot(n,ld),0.)*lc;
   if(cosine>0.){
    let shadow=meshShadowPath(origin,ld,sqrt(d2)-eps*2.);let visibility=shadow.x*select(1.,fogTransmittance(origin,ld,sqrt(d2)-eps*2.),u.p[9].w>.5);
    var weight=1.;if(useMIS&&bounce+1u+u32(shadow.y)<u32(u.p[4].z)&&dot(geometric,ld)>0.){weight=powerWeight(selection*d2/max(light.emission.w*lc,1e-20),bsdfPdf(t,n,view,ld)*shadow.x);}
    radiance+=throughput*brdf(t,albedo,n,view,ld)*emitted(light,uv)*(visibility*cosine*light.emission.w/max(selection*d2,1e-20))*weight;
   }
  }
  for(var k=0u;k<u32(u.p[10].w);k++){let ld=u.p[11u+k*2u].xyz;let cosine=max(dot(n,ld),0.);if(cosine>0.){let visibility=shadowTransmission(origin,ld,1e8);radiance+=throughput*brdf(t,albedo,n,view,ld)*u.p[12u+k*2u].rgb*cosine*visibility;}}
  let probability=mix(.25,1.,clamp(t.extra.y,0.,1.));let a=max(.002,t.color.w*t.color.w);
  if(random()<probability){let r=random();let ct=sqrt((1.-r)/(1.+(a*a-1.)*r));let st=sqrt(max(0.,1.-ct*ct));let phi=2.*PI*random();let h=basis(n,vec3f(st*cos(phi),st*sin(phi),ct));rd=reflect(-view,h);}else{let r=sqrt(random());let phi=2.*PI*random();rd=basis(n,vec3f(r*cos(phi),r*sin(phi),sqrt(1.-r*r)));}
  let nl=max(dot(n,rd),0.);if(nl<=0.||dot(geometric,rd)<=0.){break;}let h=normalize(view+rd);let pdf=bsdfPdf(t,n,view,rd);
  throughput*=brdf(t,albedo,n,view,rd)*nl/max(pdf,1e-7);ro=origin;specular=false;previousPdf=pdf;previousOrigin=origin;thinBoundaries=0u;thinProbability=1.;
 }return radiance;
}
@compute @workgroup_size(8,8) fn main(@builtin(global_invocation_id) gid:vec3u){
 let w=u32(u.p[0].w);let h=u32(u.p[1].w);if(gid.x>=w||gid.y>=h){return;}let i=gid.y*w+gid.x;
 seed=i*747796405u+u32(u.p[4].w)*2891336453u+12345u;
 var c=vec3f(0.);for(var s=0u;s<u32(u.p[4].y);s++){let xy=(vec2f(gid.xy)+vec2f(random(),random()))/vec2f(f32(w),f32(h))*2.-1.;let rd=normalize(u.p[3].xyz+u.p[1].xyz*xy.x*u.p[2].w*f32(w)/f32(h)-u.p[2].xyz*xy.y*u.p[2].w);c+=samplePath(u.p[0].xyz,rd);}c/=u.p[4].y;
 guides[i]=primaryGuide;let history=u.p[4].x;let mean=(pixels[i].rgb*history+c)/(history+1.);pixels[i]=vec4f(mean,1.);
 let exposed=mean*u.p[3].w;let mapped=exposed/(vec3f(1.)+exposed);let srgb=select(mapped*12.92,1.055*pow(mapped,vec3f(1./2.4))-.055,mapped>vec3f(.0031308));textureStore(output,vec2i(gid.xy),vec4f(srgb,1.));
}
`;var Mt=`// Spatial, geometry-guided \xE0-trous filtering. No previous-frame inputs.
// Diffuse radiance is divided by albedo before filtering, then remodulated.
// Surface identity, normals and plane distance prevent crossing object edges.
struct Params { p:array<vec4f,20> }
struct Guide { position:vec4f, normal:vec4f, albedo:vec4f }
@group(0) @binding(0) var<uniform> u:Params;
@group(0) @binding(1) var<storage,read> source:array<vec4f>;
@group(0) @binding(2) var<storage,read_write> destination:array<vec4f>;
@group(0) @binding(3) var<storage,read> guide:array<Guide>;
@group(0) @binding(4) var output:texture_storage_2d<rgba8unorm,write>;
fn luminance(c:vec3f)->f32 {return dot(max(c,vec3f(0.)),vec3f(.2126,.7152,.0722));}
fn filterPixel(gid:vec3u,step:i32) {
  let width=u32(u.p[0].w);let height=u32(u.p[1].w);
  if(gid.x>=width||gid.y>=height){return;}
  let id=gid.y*width+gid.x;let center=guide[id];
  var result=source[id].rgb;
  // Emitters/background retain their sharp current image.
  let robust=u.p[5].z>.5;
  let strength=u.p[5].w;
  let specular=center.albedo.w>.5;
  // Glass/metal radiance is not diffuse light: never divide it by diffuse color.
  // Keep its footprint to two passes (support <= 6 pixels), preserving fine
  // reflections better than the full diffuse footprint. No temporal inputs.
  if(center.position.w==0.&&(!robust||(strength>0.&&(!specular||step<=2)))) {
    let kernel=array<f32,5>(1.,4.,6.,4.,1.);
    var sum=vec3f(0.);var weightSum=0.;
    for(var y=-2;y<=2;y++){for(var x=-2;x<=2;x++){
      let q=vec2i(gid.xy)+vec2i(x,y)*step;
      if(any(q<vec2i(0))||q.x>=i32(width)||q.y>=i32(height)){continue;}
      let index=u32(q.y)*width+u32(q.x);let other=guide[index];
      if(other.position.w!=0.||other.normal.w!=center.normal.w){continue;}
      let normalWeight=pow(max(dot(center.normal.xyz,other.normal.xyz),0.),64.);
      let planeDistance=abs(dot(other.position.xyz-center.position.xyz,center.normal.xyz));
      let planeWeight=exp(-planeDistance*planeDistance/.0001);
      var weight=kernel[x+2]*kernel[y+2]*normalWeight*planeWeight;
      var value=source[index].rgb/max(other.albedo.rgb,vec3f(.01));
      if(robust){
        if(other.albedo.w!=center.albedo.w){continue;}
        if(specular){value=source[index].rgb;}
        // Bounded HDR compression weighting suppresses sparse bright outliers.
        // It is intentionally biased and may soften tiny legitimate highlights;
        // it never modifies transport or the accumulated raw image.
        let l=luminance(source[index].rgb);
        weight/=1.+l*strength;
        // Compressed-radiance edges supplement first-hit geometry, which cannot
        // identify reflected/refracted silhouettes. Broad dark noise still mixes.
        let a=source[index].rgb/(1.+l);
        let cl=luminance(source[id].rgb);
        let b=source[id].rgb/(1.+cl);
        weight/=1.+dot(a-b,a-b)*4.;
      }
      sum+=value*weight;
      weightSum+=weight;
    }}
    let modulation=select(center.albedo.rgb,vec3f(1.),robust&&specular);
    let filteredValue=sum/max(weightSum,.0001)*modulation;
    result=select(filteredValue,mix(source[id].rgb,filteredValue,strength),robust);
  }
  destination[id]=vec4f(result,1.);
  let exposed=result*u.p[3].w;let mapped=exposed/(vec3f(1.)+exposed);
  let srgb=select(mapped*12.92,1.055*pow(mapped,vec3f(1./2.4))-.055,mapped>vec3f(.0031308));
  textureStore(output,vec2i(gid.xy),vec4f(srgb,1.));
}
@compute @workgroup_size(8,8) fn first(@builtin(global_invocation_id) gid:vec3u){filterPixel(gid,1);}
@compute @workgroup_size(8,8) fn second(@builtin(global_invocation_id) gid:vec3u){filterPixel(gid,2);}
@compute @workgroup_size(8,8) fn third(@builtin(global_invocation_id) gid:vec3u){filterPixel(gid,4);}
`;var It=`// Optional display-only HDR glare. It never feeds path throughput, light sampling
// or temporal accumulation. Two separable passes retain the underlying HDR image.
struct Params { p:array<vec4f,20> }
@group(0) @binding(0) var<uniform> u:Params;
@group(0) @binding(1) var<storage,read> source:array<vec4f>;
@group(0) @binding(2) var<storage,read_write> blurred:array<vec4f>;
@group(0) @binding(3) var output:texture_storage_2d<rgba8unorm,write>;
fn bright(c:vec3f)->vec3f{let value=c*u.p[3].w;let luminance=dot(value,vec3f(.2126,.7152,.0722));return value*max(0.,1.-u.p[6].y/max(luminance,1e-6));}
@compute @workgroup_size(8,8) fn horizontal(@builtin(global_invocation_id) gid:vec3u){
 let w=u32(u.p[0].w);let h=u32(u.p[1].w);if(gid.x>=w||gid.y>=h){return;}
 var sum=vec3f(0.);var weights=0.;let sigma=max(1.,u.p[6].z*.5);
 for(var k=-12;k<=12;k++){let weight=exp(-f32(k*k)/(2.*sigma*sigma));let x=u32(clamp(i32(gid.x)+k,0,i32(w)-1));sum+=bright(source[gid.y*w+x].rgb)*weight;weights+=weight;}
 blurred[gid.y*w+gid.x]=vec4f(sum/weights,1.);
}
@compute @workgroup_size(8,8) fn vertical(@builtin(global_invocation_id) gid:vec3u){
 let w=u32(u.p[0].w);let h=u32(u.p[1].w);if(gid.x>=w||gid.y>=h){return;}
 var sum=vec3f(0.);var weights=0.;let sigma=max(1.,u.p[6].z*.5);
 for(var k=-12;k<=12;k++){let weight=exp(-f32(k*k)/(2.*sigma*sigma));let y=u32(clamp(i32(gid.y)+k,0,i32(h)-1));sum+=blurred[y*w+gid.x].rgb*weight;weights+=weight;}
 let exposed=source[gid.y*w+gid.x].rgb*u.p[3].w+sum/weights*u.p[6].x;
 let mapped=exposed/(vec3f(1.)+exposed);let srgb=select(mapped*12.92,1.055*pow(mapped,vec3f(1./2.4))-.055,mapped>vec3f(.0031308));textureStore(output,vec2i(gid.xy),vec4f(srgb,1.));
}
`;var St=`// One sparse float fog density field. Deterministic bounded single scattering;
// no scattering random walk, no separate compositor and no dense grid proxy.
fn fogIndexRay(ro:vec3f,rd:vec3f)->mat2x3f {
 let inverse=mat4x4f(u.p[20],u.p[21],u.p[22],u.p[23]);
 let origin=(inverse*vec4f(ro,1.)).xyz;let direction=(inverse*vec4f(rd,0.)).xyz;
 let inverseGrid=mat4x4f(u.p[28],u.p[29],u.p[30],u.p[31]);
 let indexOrigin=(inverseGrid*vec4f(origin,1.)).xyz;
 let indexDirection=(inverseGrid*vec4f(direction,0.)).xyz;
 return mat2x3f(indexOrigin,indexDirection);
}
fn fogInterval(ray:mat2x3f,limit:f32)->vec2f {
 var near=0.;var far=limit;
 for(var axis=0u;axis<3u;axis++) {
  let origin=ray[0][axis];let direction=ray[1][axis];
  if(abs(direction)<1e-12){if(origin<u.p[24][axis]||origin>u.p[25][axis]){return vec2f(0.);}}
  else {let a=(u.p[24][axis]-origin)/direction;let b=(u.p[25][axis]-origin)/direction;near=max(near,min(a,b));far=min(far,max(a,b));}
 }
 return vec2f(near,max(near,far));
}
fn fogTransmittance(ro:vec3f,rd:vec3f,limit:f32)->f32 {
 if(u.p[27].x<.5||u.p[24].w==0.){return 1.;}
 let ray=fogIndexRay(ro,rd);let span=fogInterval(ray,limit);let length=span.y-span.x;if(length<=0.){return 1.;}
 let count=u32(clamp(ceil(length/u.p[25].w),1.,u.p[27].y));let step=length/f32(count);var opticalDepth=0.;
 for(var i=0u;i<count;i++){let t=span.x+(f32(i)+.5)*step;opticalDepth+=max(0.,pnanovdb_sample_trilinear(ray[0]+ray[1]*t))*step*u.p[24].w;}
 return exp(-opticalDepth);
}
fn fogTransport(ro:vec3f,rd:vec3f,limit:f32)->vec4f {
 if(u.p[27].x<.5||u.p[24].w==0.){return vec4f(0.,0.,0.,1.);}
 let ray=fogIndexRay(ro,rd);let span=fogInterval(ray,limit);let length=span.y-span.x;if(length<=0.){return vec4f(0.,0.,0.,1.);}
 let count=u32(clamp(ceil(length/u.p[25].w),1.,u.p[26].w));let step=length/f32(count);var transmission=1.;var radiance=vec3f(0.);
 for(var i=0u;i<count;i++) {
  let t=span.x+(f32(i)+.5)*step;let density=max(0.,pnanovdb_sample_trilinear(ray[0]+ray[1]*t));if(density<=0.){continue;}
  let segment=exp(-density*step*u.p[24].w);let position=ro+rd*t;var incident=vec3f(0.);
  for(var k=0u;k<u32(u.p[10].w);k++){
   let direction=u.p[11u+k*2u].xyz;
   incident+=u.p[12u+k*2u].rgb*shadowTransmission(position,direction,1e8)/(4.*PI);
  }
  radiance+=transmission*(1.-segment)*u.p[26].rgb*incident;transmission*=segment;
 }
 return vec4f(radiance,transmission);
}
`;var Gt=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];function tt(e){if(e.length!==16||!e.every(Number.isFinite)||e[3]!==0||e[7]!==0||e[11]!==0||e[15]!==1)throw Error("INVALID_INSTANCE_TRANSFORM: finite affine matrix required");let[l,c,f,P,I,_,o,a,T]=[e[0],e[1],e[2],e[4],e[5],e[6],e[8],e[9],e[10]],u=l*(I*T-_*a)-c*(P*T-_*o)+f*(P*a-I*o);if(!Number.isFinite(u)||Math.abs(u)<1e-12)throw Error("INVALID_INSTANCE_TRANSFORM: singular matrix");let m=[(I*T-_*a)/u,(f*a-c*T)/u,(c*_-f*I)/u,0,(_*o-P*T)/u,(l*T-f*o)/u,(f*P-l*_)/u,0,(P*a-I*o)/u,(c*o-l*a)/u,(l*I-c*P)/u,0,0,0,0,1];for(let M=0;M<3;M++)m[12+M]=-(e[12]*m[M]+e[13]*m[4+M]+e[14]*m[8+M]);return m}function Ut(e){let l=[],c=[];function f(I){let _=c.length/12,o=[1/0,1/0,1/0],a=[-1/0,-1/0,-1/0];for(let T of I)for(let u=0;u<3;u++)o[u]=Math.min(o[u],T.bounds[u]),a[u]=Math.max(a[u],T.bounds[u+3]);if(c.push(...o,0,...a,0,0,0,0,0),I.length<=4)c[_*12+7]=l.length,c[_*12+8]=I.length,l.push(...I);else{let T=a.map((M,R)=>M-o[R]),u=T.indexOf(Math.max(...T));I.sort((M,R)=>M.bounds[u]+M.bounds[u+3]-(R.bounds[u]+R.bounds[u+3]));let m=Math.floor(I.length/2);f(I.slice(0,m)),f(I.slice(m))}c[_*12+3]=c.length/12}e.length&&f([...e]);let P=new Float32Array(4+c.length+l.length*36);return P.set([c.length/12,1+c.length/4,l.length,0]),P.set(c,4),l.forEach((I,_)=>{let o=4+c.length+_*36;P.set(I.matrix,o),P.set(I.inverse,o+16),P.set([I.root,I.end,I.visible?1:0,I.identity],o+32)}),{data:P,nodeCount:c.length/12,ordered:l}}function Tt(e,l,c){let f=performance.now(),P=new Map((e.prototypes??[]).map(y=>[y.path,y])),I=[...new Set(e.pointInstancers.flatMap(y=>y.prototypes))],_=new Map(e.meshes.map(y=>[y.path,y])),o=new Set;for(let y of I){let C=P.get(y);if(!C?.components?.length)throw Error("UNSUPPORTED_INSTANCE_PROTOTYPE: "+y);for(let v of C.components)o.add(v.meshPath)}let a=Ne({...e,meshes:e.meshes.filter(y=>!o.has(y.path)),pointInstancers:[]},l,c),T=[a],u=new Map,m={};for(let y of I){let C=P.get(y).components.map(v=>{let k=_.get(v.meshPath);if(!k)throw Error("MISSING_INSTANCE_MESH: "+v.meshPath);if(l.has(v.meshPath))throw Error("UNSUPPORTED_INSTANCE_SURFACE: "+v.meshPath);for(let re of[k.material,...(k.materialSubsets??[]).map(D=>D.material)])if((re?.opacity??1)<1||(re?.emissiveColor??[]).some(D=>D>0))throw Error("UNSUPPORTED_INSTANCE_MATERIAL: opaque non-emissive required");return tt(v.prototypeRelativeMatrix),m[v.meshPath]=v.visible,{...k,worldMatrix:v.prototypeRelativeMatrix,visible:v.visible&&k.visible}});u.set(y,T.length),T.push(Ne({meshes:C,lights:[],pointInstancers:[]},new Map,{...c,retainHidden:!0}))}let M=[null],R=new Map,O=[],r=[],d=0,N=0;for(let y of T){let C=[0];for(let v of y.meshPaths.slice(1))R.has(v)||(R.set(v,M.length),M.push(v)),C.push(R.get(v));O.push({root:N,end:N+y.nodeCount,triangle:d,map:C,group:y}),d+=y.count,N+=y.nodeCount}let H=new Float32Array(Math.max(1,d)*44),ie=new Float32Array(N*12),Pe=new Float32Array(M.length),S=new Uint32Array(M.length),fe=[];for(let y of O){let{group:C,map:v,root:k,triangle:re}=y;H.set(C.triangles.subarray(0,C.count*44),re*44);for(let D=0;D<C.count;D++){let W=(re+D)*44;H[W+16]=v[H[W+16]],S[H[W+16]]++}ie.set(C.nodes,k*12);for(let D=0;D<C.nodeCount;D++)ie[(k+D)*12+3]+=k,ie[(k+D)*12+8]>0&&(ie[(k+D)*12+7]+=re);C.meshPaths.forEach((D,W)=>{W&&(Pe[v[W]]=C.visibility[W])});for(let D=0;D<C.emitterCandidates.length;D+=2)fe.push(re+C.emitterCandidates[D],v[C.emitterCandidates[D+1]])}function A(y,C,v,k){if(!y.group.count)return;let re=tt(C),D=[1/0,1/0,1/0,-1/0,-1/0,-1/0];for(let W=0;W<8;W++){let Me=ft([0,1,2].map(X=>y.group.nodes[(W&1<<X?4:0)+X]),C);for(let X=0;X<3;X++)D[X]=Math.min(D[X],Me[X]-1e-5),D[X+3]=Math.max(D[X+3],Me[X]+1e-5)}r.push({part:y,root:y.root,end:y.end,matrix:C,inverse:re,visible:v,identity:k,bounds:D})}A(O[0],Gt,!0,0);let se=0,be=0,pe=a.count;for(let y of e.pointInstancers){if(y.protoIndices.length!==y.instanceWorldMatrices.length)throw Error("INVALID_INSTANCE_ARRAYS");y.protoIndices.forEach((C,v)=>{if(!Number.isInteger(C)||C<0||C>=y.prototypes.length)throw Error("INVALID_INSTANCE_PROTOTYPE_INDEX");let k=O[u.get(y.prototypes[C])];se++,y.visible&&be++,pe+=k.group.count,A(k,y.instanceWorldMatrices[v],y.visible,se)})}if((se+1)*M.length>=16777216)throw Error("INSTANCE_GUIDE_ID_LIMIT");let n=Ut(r),g={...a,triangles:H,nodes:ie,visibility:Pe,meshPaths:M,meshTriangleCounts:S,prototypeVisibility:m,emitterCandidates:new Uint32Array(fe),count:d,nodeCount:N,instanceData:n.data,instanceCount:se,activeInstanceCount:be,prototypeCount:I.length,prototypeTriangleBytes:(d-a.count)*44*4,expandedTriangleCount:pe,topLevelNodeCount:n.nodeCount,buildMs:performance.now()-f,geometryMs:T.reduce((y,C)=>y+C.geometryMs,0),accelerationMs:T.reduce((y,C)=>y+C.accelerationMs,0)};return g.updateRetained=(y,C,v,k)=>{let re=performance.now(),D=new Set,W={triangles:[],nodes:[],instances:[],changedMeshes:k.size},Me=new Map(y.meshes.map(s=>[s.path,s])),X=[];for(let s=0;s<O.length;s++){let b=O[s],V=new Set(b.group.meshPaths.filter(L=>k.has(L))),Q;if(s===0?Q={...y,meshes:y.meshes.filter(L=>!o.has(L.path)),pointInstancers:[]}:Q={meshes:y.prototypes.find(U=>u.get(U.path)===s).components.map(U=>{let B=Me.get(U.meshPath);if(l.has(U.meshPath))throw Error("UNSUPPORTED_INSTANCE_SURFACE: "+U.meshPath);for(let q of[B.material,...(B.materialSubsets??[]).map(ue=>ue.material)])if((q?.opacity??1)<1||(q?.emissiveColor??[]).some(ue=>ue>0))throw Error("UNSUPPORTED_INSTANCE_MATERIAL: opaque non-emissive required");return tt(U.prototypeRelativeMatrix),m[U.meshPath]=U.visible,{...B,worldMatrix:U.prototypeRelativeMatrix,visible:U.visible&&B.visible}}),lights:[],pointInstancers:[]},V.size){let L=it(b.group,Q,s===0?C:new Map,v,V);if(!L)return null;D.add(b);for(let[U,B]of L.triangles){let q=b.triangle*44+U;H.set(b.group.triangles.subarray(U,U+B),q);for(let ue=q;ue<q+B;ue+=44)H[ue+16]=b.map[H[ue+16]];W.triangles.push([q,B])}for(let[U,B]of L.nodes){let q=b.root*12+U;ie.set(b.group.nodes.subarray(U,U+B),q),ie[q+3]+=b.root,ie[q+8]&&(ie[q+7]+=b.triangle),W.nodes.push([q,B])}}for(let L=0;L<b.group.emitterCandidates.length;L+=2)X.push(b.triangle+b.group.emitterCandidates[L],b.map[b.group.emitterCandidates[L+1]])}g.emitterCandidates=new Uint32Array(X),g.hasThinGlass=a.hasThinGlass;let K=0,ee=new Map,he=0;for(let s of y.pointInstancers){if(s.protoIndices.length!==s.instanceWorldMatrices.length)throw Error("INVALID_INSTANCE_ARRAYS");s.visible&&(he+=s.protoIndices.length);for(let b=0;b<s.protoIndices.length;b++)K++,k.has(s.path)&&ee.set(K,{matrix:s.instanceWorldMatrices[b],visible:s.visible,part:O[u.get(s.prototypes[s.protoIndices[b]])]})}if(K!==se)return null;let le=new Set;if(!n.parents){n.parents=new Int32Array(n.nodeCount).fill(-1),n.leaves=new Uint32Array(n.ordered.length);for(let s=0;s<n.nodeCount;s++){let b=4+s*12,V=n.data[b+8];if(V)for(let Q=0;Q<V;Q++)n.leaves[n.data[b+7]+Q]=s;else n.parents[s+1]=s,n.parents[n.data[4+(s+1)*12+3]]=s}}n.ordered.forEach((s,b)=>{let V=ee.get(s.identity);if(!D.has(s.part)&&!V)return;if(V){if(!V.part)throw Error("INVALID_INSTANCE_PROTOTYPE_INDEX");s.part=V.part,s.matrix=V.matrix,s.inverse=tt(s.matrix),s.visible=V.visible,s.root=s.part.root,s.end=s.part.end}s.bounds.fill(1/0,0,3),s.bounds.fill(-1/0,3);for(let U=0;U<8;U++){let B=ft([0,1,2].map(q=>s.part.group.nodes[(U&1<<q?4:0)+q]),s.matrix);for(let q=0;q<3;q++)s.bounds[q]=Math.min(s.bounds[q],B[q]-1e-5),s.bounds[q+3]=Math.max(s.bounds[q+3],B[q]+1e-5)}let Q=4+n.nodeCount*12+b*36;n.data.set(s.matrix,Q),n.data.set(s.inverse,Q+16),n.data.set([s.root,s.end,s.visible?1:0,s.identity],Q+32),W.instances.push([Q,36]);let L=n.leaves[b];for(;L>=0&&!le.has(L);)le.add(L),L=n.parents[L]});for(let s of[...le].sort((b,V)=>V-b)){let b=4+s*12,V=n.data[b+8],Q=[1/0,1/0,1/0],L=[-1/0,-1/0,-1/0];if(V)for(let U=n.data[b+7];U<n.data[b+7]+V;U++)for(let B=0;B<3;B++)Q[B]=Math.min(Q[B],n.ordered[U].bounds[B]),L[B]=Math.max(L[B],n.ordered[U].bounds[B+3]);else for(let U of[s+1,n.data[4+(s+1)*12+3]])for(let B=0;B<3;B++)Q[B]=Math.min(Q[B],n.data[4+U*12+B]),L[B]=Math.max(L[B],n.data[4+U*12+4+B]);n.data.set(Q,b),n.data.set(L,b+4),W.instances.push([b,12])}return g.activeInstanceCount=he,g.buildMs=performance.now()-re,g.geometryMs=g.buildMs,g.accelerationMs=0,W},g}var Ct=(e,l)=>e.map((c,f)=>c-l[f]),kt=(e,l)=>e.map(c=>c*l),Vt=(e,l)=>e.reduce((c,f,P)=>c+f*l[P],0),je=(e,l)=>[e[1]*l[2]-e[2]*l[1],e[2]*l[0]-e[0]*l[2],e[0]*l[1]-e[1]*l[0]],rt=e=>kt(e,1/(Math.hypot(...e)||1)),ft=(e,l)=>[0,1,2].map(c=>e[0]*l[c]+e[1]*l[4+c]+e[2]*l[8+c]+l[12+c]),Le=44;function Et(e,l,c=!1){let f=new Float64Array(e.length*3),P=l;if(c){let I=l.slice(0,3),_=l.slice(4,7),o=l.slice(8,11),a=je(_,o),T=je(o,I),u=je(I,_),m=Vt(I,a);P=[a[0]/m,a[1]/m,a[2]/m,0,T[0]/m,T[1]/m,T[2]/m,0,u[0]/m,u[1]/m,u[2]/m,0,0,0,0,1]}for(let I=0;I<e.length;I++){let _=e[I],o=I*3,a=_[0]*P[0]+_[1]*P[4]+_[2]*P[8]+P[12],T=_[0]*P[1]+_[1]*P[5]+_[2]*P[9]+P[13],u=_[0]*P[2]+_[1]*P[6]+_[2]*P[10]+P[14];if(c){let m=Math.hypot(a,T,u)||1;a/=m,T/=m,u/=m}f[o]=a,f[o+1]=T,f[o+2]=u}return f}var Pt=(e,l,c,f)=>e==="constant"?0:e==="uniform"?l:e==="faceVarying"?c:f;function Ne(e,l=new Map,c={}){let f=performance.now();if(e.pointInstancers?.length)return Tt(e,l,c);let P=(e.lights??[]).filter(n=>n.type==="rect"&&(n.visible||c.retainHidden)).map(n=>{if(n.normalize||n.unsupported?.length)throw Error("UNSUPPORTED_RECT_PROFILE: normalized/texture/shaping/linking");return{path:n.path,points:[[-n.width/2,-n.height/2,0],[-n.width/2,n.height/2,0],[n.width/2,n.height/2,0],[n.width/2,-n.height/2,0]],faceVertexCounts:[4],faceVertexIndices:[0,1,2,3],worldMatrix:n.worldMatrix,visible:n.visible,rect:!0,material:{diffuseColor:[0,0,0],emissiveColor:n.color.map(g=>g*n.intensity)}}}),I=[...e.meshes,...P],_=0;for(let n of I)if(n.visible||c.retainHidden)for(let g of n.faceVertexCounts)_+=Math.max(0,g-2);let o=new Float32Array(Math.max(1,_)*Le),a=new Float64Array(_*6),T=0,u=!1,m=[];for(let n=0;n<I.length;n++){let g=I[n];if(!g.visible&&!c.retainHidden)continue;let C=(Object.hasOwn(c.meshGlassModes??{},g.path)?c.meshGlassModes[g.path]:c.glassMode)==="thin",v=Et(g.points,g.worldMatrix),k=g.normals?Et(g.normals,g.worldMatrix,!0):null,re=new Set(g.holeIndices??[]),D=new Map;for(let K of g.materialSubsets??[])for(let ee of K.faceIndices)D.has(ee)||D.set(ee,K.material);let W=l.get(g.path),Me=W?.faceIndices?new Set(W.faceIndices):null,X=0;for(let K=0;K<g.faceVertexCounts.length;K++){let ee=g.faceVertexCounts[K],he=D.get(K)??g.material??{},le=he.diffuseColor??[.55,.55,.55],s=he.emissiveColor??[0,0,0],b=W&&(!Me||Me.has(K))?W:null;if(!re.has(K))for(let V=1;V<ee-1;V++){let Q=X,L=X+(g.orientation==="leftHanded"?V+1:V),U=X+(g.orientation==="leftHanded"?V:V+1),B=g.faceVertexIndices[Q],q=g.faceVertexIndices[L],ue=g.faceVertexIndices[U],Oe=B*3,me=q*3,de=ue*3,Ie=v[Oe],ye=v[Oe+1],ne=v[Oe+2],Se=v[me]-Ie,F=v[me+1]-ye,j=v[me+2]-ne,Y=v[de]-Ie,E=v[de+1]-ye,Z=v[de+2]-ne,ce=F*Z-j*E,Ae=j*Y-Se*Z,_e=Se*E-F*Y,Te=Math.hypot(ce,Ae,_e);if(Te<2e-14)continue;ce/=Te,Ae/=Te,_e/=Te,m.push(`${n+1}:${K}:${V}`);let J=T*Le;o[J]=Ie,o[J+1]=ye,o[J+2]=ne,o[J+4]=Se,o[J+5]=F,o[J+6]=j,o[J+8]=Y,o[J+9]=E,o[J+10]=Z,o[J+12]=le[0],o[J+13]=le[1],o[J+14]=le[2],o[J+15]=he.roughness??.5,o[J+16]=n+1,o[J+17]=he.metallic??0,o[J+18]=he.opacity??1,o[J+19]=he.ior??1.5;for(let we=0;we<3;we++){let qe=we===0?Q:we===1?L:U,Ce=we===0?B:we===1?q:ue,We=Pt(g.normalsInterpolation,K,qe,Ce)*3,G=J+20+we*4;o[G]=k?k[We]:ce,o[G+1]=k?k[We+1]:Ae,o[G+2]=k?k[We+2]:_e;let Ge=0,De=0;if(b?.u){let ve=g.points[Ce];Ge=ve[0]*b.u[0]+ve[1]*b.u[1]+ve[2]*b.u[2]+b.u[3],De=ve[0]*b.v[0]+ve[1]*b.v[1]+ve[2]*b.v[2]+b.v[3]}else if(g.uvs){let ve=g.uvs,Fe=Pt(ve.interpolation,K,qe,Ce),Ue=ve.values[ve.indices?.[Fe]??Fe];Ge=Ue?.[0]??0,De=Ue?.[1]??0}o[J+36+we*2]=Ge,o[J+37+we*2]=De}o[J+31]=C?1:0,C&&(he.opacity??1)<1&&(u=!0),o[J+23]=b?b.slot+1:0,o[J+27]=g.rect?1:0,o[J+32]=s[0],o[J+33]=s[1],o[J+34]=s[2],o[J+35]=Te/2;let xe=T*6;a[xe]=Math.min(Ie,v[me],v[de]),a[xe+1]=Math.min(ye,v[me+1],v[de+1]),a[xe+2]=Math.min(ne,v[me+2],v[de+2]),a[xe+3]=Math.max(Ie,v[me],v[de]),a[xe+4]=Math.max(ye,v[me+1],v[de+1]),a[xe+5]=Math.max(ne,v[me+2],v[de+2]),T++}X+=ee}}let M=performance.now(),R=new Uint32Array(T);for(let n=0;n<T;n++)R[n]=n;let O=new Float32Array(Math.max(1,T*2)*12),r=new Float64Array(84),d=new Float64Array(84),N=0,H=0,ie=(n,g,y)=>2*(n*g+g*y+n*y);function Pe(n,g,y){H=Math.max(H,y);let C=N++,v=C*12,k=1/0,re=1/0,D=1/0,W=-1/0,Me=-1/0,X=-1/0;for(let K=n;K<g;K++){let ee=R[K]*6;k=Math.min(k,a[ee]),re=Math.min(re,a[ee+1]),D=Math.min(D,a[ee+2]),W=Math.max(W,a[ee+3]),Me=Math.max(Me,a[ee+4]),X=Math.max(X,a[ee+5])}if(O[v]=k-1e-5,O[v+1]=re-1e-5,O[v+2]=D-1e-5,O[v+4]=W+1e-5,O[v+5]=Me+1e-5,O[v+6]=X+1e-5,g-n<=4)O[v+7]=n,O[v+8]=g-n;else{let K=1/0,ee=-1,he=0;for(let s=0;s<3;s++){let b=1/0,V=-1/0;for(let Y=n;Y<g;Y++){let E=R[Y]*6,Z=(a[E+s]+a[E+s+3])*.5;b=Math.min(b,Z),V=Math.max(V,Z)}if(V-b<1e-10)continue;for(let Y=0;Y<12;Y++){let E=Y*7;r[E]=r[E+1]=r[E+2]=1/0,r[E+3]=r[E+4]=r[E+5]=-1/0,r[E+6]=0}let Q=12/(V-b);for(let Y=n;Y<g;Y++){let E=R[Y]*6,Z=Math.min(11,Math.floor(((a[E+s]+a[E+s+3])*.5-b)*Q))*7;r[Z+6]++;for(let ce=0;ce<3;ce++)r[Z+ce]=Math.min(r[Z+ce],a[E+ce]),r[Z+ce+3]=Math.max(r[Z+ce+3],a[E+ce+3])}let L=1/0,U=1/0,B=1/0,q=-1/0,ue=-1/0,Oe=-1/0,me=0;for(let Y=11;Y>=0;Y--){let E=Y*7;L=Math.min(L,r[E]),U=Math.min(U,r[E+1]),B=Math.min(B,r[E+2]),q=Math.max(q,r[E+3]),ue=Math.max(ue,r[E+4]),Oe=Math.max(Oe,r[E+5]),me+=r[E+6],d[E]=L,d[E+1]=U,d[E+2]=B,d[E+3]=q,d[E+4]=ue,d[E+5]=Oe,d[E+6]=me}let de=1/0,Ie=1/0,ye=1/0,ne=-1/0,Se=-1/0,F=-1/0,j=0;for(let Y=1;Y<12;Y++){let E=(Y-1)*7,Z=Y*7;if(de=Math.min(de,r[E]),Ie=Math.min(Ie,r[E+1]),ye=Math.min(ye,r[E+2]),ne=Math.max(ne,r[E+3]),Se=Math.max(Se,r[E+4]),F=Math.max(F,r[E+5]),j+=r[E+6],!j||!d[Z+6])continue;let ce=j*ie(ne-de,Se-Ie,F-ye)+d[Z+6]*ie(d[Z+3]-d[Z],d[Z+4]-d[Z+1],d[Z+5]-d[Z+2]);ce<K&&(K=ce,ee=s,he=b+(V-b)*Y/12)}}let le=n;if(ee>=0)for(let s=n;s<g;s++){let b=R[s]*6;if((a[b+ee]+a[b+ee+3])*.5<he){let V=R[le];R[le++]=R[s],R[s]=V}}(le===n||le===g)&&(le=n+g>>1),Pe(n,le,y+1),Pe(le,g,y+1)}O[v+3]=N}T?Pe(0,T,0):(N=1,O[3]=1);let S=Array.from(R,n=>m[n]),fe=new Uint32Array(I.length+1),A=new Float32Array(Math.max(1,T)*Le),se=[],be=[],pe=new Float32Array([0,...I.map(n=>n.visible?1:0)]);for(let n=0;n<T;n++){let g=R[n]*Le,y=n*Le;fe[o[g+16]]++;for(let C=0;C<Le;C++)A[y+C]=o[g+C];if(o[g+32]>0||o[g+33]>0||o[g+34]>0||o[g+23]>0){let C=o[g+16];se.push(n,C),pe[C]&&be.push(n)}}return{triangleKeys:S,hasThinGlass:u,meshTriangleCounts:fe,meshPaths:[null,...I.map(n=>n.path)],visibility:pe,emitterCandidates:new Uint32Array(se),triangles:A,nodes:O.slice(0,N*12),emitters:new Float32Array(be.length?be:[0]),emitterCount:be.length,buildMs:performance.now()-f,geometryMs:M-f,accelerationMs:performance.now()-M,count:T,nodeCount:N,depth:H}}function nt(e,l=new Map){let c=new Map;for(let I of l.values())c.set(I.slot+1,Math.max(0,I.emission??1));let f=[],P=0;for(let I=0;I<e.emitterCandidates.length;I+=2){let _=e.emitterCandidates[I],o=e.emitterCandidates[I+1];if(!e.visibility[o])continue;let a=_*Le,T=e.triangles,u=T[a+35]*(Math.max(0,.2126*T[a+32]+.7152*T[a+33]+.0722*T[a+34])+(c.get(T[a+23])??0));if(!(u>0))continue;let m=Math.fround(P);P+=u;let M=Math.fround(P);M<=m||f.push(_,M,u,0)}return{data:new Float32Array(f.length?f:[0,0,0,0]),count:f.length/4,total:Math.fround(P)}}function it(e,l,c,f,P){if(e.updateRetained)return e.updateRetained(l,c,f,P);let I=performance.now(),_=[];for(let u of P){let m=l.meshes.find(N=>N.path===u),M=l.lights?.find(N=>N.path===u),R=e.meshPaths.indexOf(u);if(R<1)continue;let O=Ne({meshes:m?[m]:[],lights:M?[M]:[]},c,{...f,retainHidden:!0});if(O.count!==e.meshTriangleCounts[R])return null;let r=new Map(O.triangleKeys.map((N,H)=>[N.slice(N.indexOf(":")),H]));if(!e.meshIndices){e.meshIndices=e.meshPaths.map(()=>[]);for(let N=0;N<e.count;N++)e.meshIndices[e.triangles[N*44+16]].push(N)}let d=e.meshIndices;for(let N of d[R]){let H=e.triangleKeys[N],ie=r.get(H.slice(H.indexOf(":")));if(ie===void 0)return null;_.push({index:N,from:ie,next:O,id:R})}}let o=new Set,a=[];if(!e.refitIndex){let u=new Int32Array(e.nodeCount).fill(-1),m=new Uint32Array(e.count);for(let M=0;M<e.nodeCount;M++){let R=M*12,O=e.nodes[R+8];if(O)for(let r=0;r<O;r++)m[e.nodes[R+7]+r]=M;else M+1<e.nodes[R+3]&&(u[M+1]=M,u[e.nodes[(M+1)*12+3]]=M)}e.refitIndex={parents:u,leaves:m}}for(let{index:u,from:m,next:M,id:R}of _){e.triangles.set(M.triangles.subarray(m*44,(m+1)*44),u*44),e.triangles[u*44+16]=R,a.push([u*44,44]);let O=e.refitIndex.leaves[u];for(;O>=0&&!o.has(O);)o.add(O),O=e.refitIndex.parents[O]}for(let u of[...o].sort((m,M)=>M-m)){let m=u*12,M=e.nodes[m+8],R=[1/0,1/0,1/0],O=[-1/0,-1/0,-1/0];if(M)for(let r=e.nodes[m+7];r<e.nodes[m+7]+M;r++)for(let d=0;d<3;d++){let N=r*44,H=e.triangles[N+d],ie=H+e.triangles[N+4+d],Pe=H+e.triangles[N+8+d];R[d]=Math.min(R[d],H,ie,Pe),O[d]=Math.max(O[d],H,ie,Pe)}else for(let r of[u+1,e.nodes[(u+1)*12+3]])for(let d=0;d<3;d++)R[d]=Math.min(R[d],e.nodes[r*12+d]),O[d]=Math.max(O[d],e.nodes[r*12+4+d]);for(let r=0;r<3;r++)e.nodes[m+r]=R[r]-(M?1e-5:0),e.nodes[m+4+r]=O[r]+(M?1e-5:0)}let T=[];e.hasThinGlass=!1;for(let u=0;u<e.count;u++){let m=u*44,M=e.triangles;(M[m+32]>0||M[m+33]>0||M[m+34]>0||M[m+23]>0)&&T.push(u,M[m+16]),M[m+31]&&M[m+18]<1&&(e.hasThinGlass=!0)}return e.emitterCandidates=new Uint32Array(T),e.buildMs=performance.now()-I,e.geometryMs=e.buildMs,e.accelerationMs=0,{triangles:a,nodes:[...o].map(u=>[u*12,12]),instances:[],changedMeshes:P.size}}async function at(e,l,c={}){l=structuredClone(l),c=structuredClone(c);let f=c.fog;if(!["light","mis"].includes(c.lightSampling??"light"))throw Error("Invalid lightSampling");if(c.visibilityHistory!==void 0&&!(Number.isInteger(c.visibilityHistory)&&c.visibilityHistory>=0))throw Error("Invalid visibilityHistory");let P=d=>JSON.stringify([d.path,d.worldMatrix,d.density,d.material]);function I(d){let N=d.volumes??[];if(N.length&&(d.stage?.metersPerUnit??1)!==1)throw Error("UNSUPPORTED_VOLUME_UNITS: first fog profile requires metre stage units");if(N.length>1)throw Error("UNSUPPORTED_VOLUME_COUNT: one static fog field");for(let H of N)if(H.visible&&(!f||P(H)!==P(f.descriptor)))throw Error("VOLUME_NOT_PREPARED: prepare matching field before renderer creation")}I(l);let _=f?Math.ceil(f.data.byteLength/16):0;function o(d){let N=d.instanceData??new Float32Array(4);if(!f)return N;let H=new Uint8Array(_*16+N.byteLength);return H.set(f.data),H.set(new Uint8Array(N.buffer,N.byteOffset,N.byteLength),_*16),H}let a=new Map,T=0,u=0,m={sceneBuilds:1,refits:0,bufferAllocations:0,targetAllocations:0,uploadedBytes:0,changedMeshes:0},M=navigator.gpu;if(!M)throw Error("WebGPU unavailable in this Safari");let R=await M.requestAdapter();if(!R)throw Error("No WebGPU adapter");let O=R.features.has("timestamp-query"),r=await R.requestDevice({requiredFeatures:O?["timestamp-query"]:[]});try{let At=function(){let t=[];for(let i of l.meshes){i.subdivisionScheme&&i.subdivisionScheme!=="none"&&t.push("CONTROL_CAGE_SUBDIVISION: "+i.path);for(let z of[i.material,...(i.materialSubsets??[]).map(h=>h.material)])z?.textures&&Object.keys(z.textures).length&&t.push("AUTHORED_TEXTURES_NOT_RESOLVED: "+i.path)}l.lights.filter(i=>i.visible&&i.type==="distant").length>4&&t.push("DISTANT_LIGHT_LIMIT_4");for(let i of l.lights)i.type==="dome"&&i.textureAsset&&t.push("DOME_TEXTURE_NOT_RESOLVED: "+i.path);return[...new Set(t)]},Be=function(){if(G)throw Error("Tracer disposed")},Ee=function(t="explicit",i=0){Ce=Math.min(Ce,i),$e++,Fe=t,Ue.push({generation:$e,reason:t,frame:Ge}),Ue.length>32&&Ue.shift()},Ot=function(){let t=0;for(let i=1;i<S.visibility.length;i++)S.visibility[i]&&(t+=S.meshTriangleCounts[i]);return t},st=function(t,i,z,h=0){let p=z.sort(($,oe)=>$[0]-oe[0]),x=[];for(let[$,oe]of p){let te=x.at(-1);te&&$<=te[0]+te[1]+44?te[1]=Math.max(te[0]+te[1],$+oe)-te[0]:x.push([$,oe])}for(let[$,oe]of x){let te=i.subarray($,$+oe);r.queue.writeBuffer(t,h+$*4,te),m.uploadedBytes+=te.byteLength}},zt=function(){if(!Re&&ze.size){let h=it(S,l,a,c,ze);if(!h)Re=!0;else{st(D,S.triangles,h.triangles),st(W,S.nodes,h.nodes),h.instances.length&&st(g,S.instanceData,h.instances,_*16),m.refits++,m.changedMeshes+=h.changedMeshes;let p=Math.max(1,S.emitterCandidates.length/2)*16;pe.size<p&&(pe.destroy(),be.splice(be.indexOf(pe),1),pe=d(new Float32Array(p/4),A.STORAGE|A.COPY_DST),Je=!0),ke=!0}}if(ze.clear(),Re){let h=Ne(l,a,{...c,retainHidden:!0});for(let p of[D,W,pe,n,g])p.destroy(),be.splice(be.indexOf(p),1);m.sceneBuilds++,S=h,fe=nt(S,a),D=d(S.triangles,A.STORAGE|A.COPY_DST),W=d(S.nodes,A.STORAGE|A.COPY_DST),pe=d(new Float32Array(Math.max(1,S.emitterCandidates.length/2)*4),A.STORAGE|A.COPY_DST),r.queue.writeBuffer(pe,0,fe.data),n=d(S.visibility,A.STORAGE|A.COPY_DST),Re=!1,ke=!1,Je=!0,g=d(o(S),A.STORAGE|A.COPY_DST)}if(ke){let h=new Map([...l.meshes,...l.lights].map(p=>[p.path,p.visible]));S.meshPaths.forEach((p,x)=>S.visibility[x]=h.get(p)&&S.prototypeVisibility?.[p]!==!1?1:0),fe=nt(S,a),S.emitterCount=fe.count,r.queue.writeBuffer(n,0,S.visibility),r.queue.writeBuffer(pe,0,fe.data),ke=!1}let t=1,i=1,z=1;for(let h of a.values())t=Math.max(t,h.source.width),i=Math.max(i,h.source.height),z=Math.max(z,h.slot+1);if(t!==me||i!==de||z!==Ie){ye.destroy(),me=t,de=i,Ie=z,ye=r.createTexture({size:[t,i,z],format:"rgba8unorm",usage:se.TEXTURE_BINDING|se.COPY_DST|se.RENDER_ATTACHMENT});for(let h of a.values())h.dirty=!0;Je=!0,Ee("surface-resize")}},d=function(t,i){m.bufferAllocations++,m.uploadedBytes+=t.byteLength;let z=r.createBuffer({size:t.byteLength,usage:i});return r.queue.writeBuffer(z,0,t),be.push(z),z},N=function(t,i=Math.round(t*9/16)){if(!Number.isInteger(t)||!Number.isInteger(i)||t<1||i<1||t>r.limits.maxTextureDimension2D||i>r.limits.maxTextureDimension2D)throw Error("Invalid render dimensions");let z=r.limits.maxStorageBufferBindingSize??134217728;if(t*i*48>z)throw Error(`Render size ${t}x${i} exceeds the WebGPU storage limit (${Math.floor(z/48)} pixels)`);if(t===F&&i===j&&!Je)return;(t!==F||i!==j)&&(m.targetAllocations++,ne?.destroy(),ne=null,Se=[],Y?.destroy(),E?.destroy(),Ae?.destroy(),_e?.destroy(),Te.forEach(p=>p.destroy()),F=t,j=i,e.width=t,e.height=i,Y=r.createBuffer({size:t*i*16,usage:A.STORAGE|A.COPY_SRC|A.COPY_DST}),Ae=r.createBuffer({size:t*i*16,usage:A.MAP_READ|A.COPY_DST}),E=r.createTexture({size:[t,i],format:"rgba8unorm",usage:se.STORAGE_BINDING|se.TEXTURE_BINDING|se.COPY_SRC}),_e=r.createBuffer({size:t*i*48,usage:A.STORAGE}),Te=[0,1].map(()=>r.createBuffer({size:t*i*16,usage:A.STORAGE|A.COPY_SRC})),J=[0,1,2].map(p=>r.createBindGroup({layout:s,entries:[{binding:0,resource:{buffer:re}},{binding:1,resource:{buffer:p===0?Y:Te[(p-1)%2]}},{binding:2,resource:{buffer:Te[p%2]}},{binding:3,resource:{buffer:_e}},{binding:4,resource:E.createView()}]})),ce=r.createBindGroup({layout:Oe.getBindGroupLayout(0),entries:[{binding:0,resource:E.createView()}]}),Ee("render-targets")),Je=!1,Z=r.createBindGroup({layout:ee.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:re}},{binding:1,resource:{buffer:D}},{binding:2,resource:{buffer:W}},{binding:3,resource:{buffer:Y}},{binding:4,resource:ye.createView({dimension:"2d-array"})},{binding:5,resource:E.createView()},{binding:6,resource:{buffer:_e}},{binding:7,resource:{buffer:pe}},{binding:8,resource:{buffer:y}},{binding:9,resource:{buffer:n}},{binding:10,resource:{buffer:g}}]})},H=[];r.addEventListener("uncapturederror",t=>H.push(t.error.message)),r.lost.then(t=>{t.reason!=="destroyed"&&H.push("Device lost: "+t.message)});let ie=e.getContext("webgpu"),Pe=M.getPreferredCanvasFormat();ie.configure({device:r,format:Pe,alphaMode:"opaque"}),r.pushErrorScope("validation");let S=Ne(l,a,{...c,retainHidden:!0}),fe=nt(S,a),A=globalThis.GPUBufferUsage,se=globalThis.GPUTextureUsage,be=[],pe=d(new Float32Array(Math.max(1,S.emitterCandidates.length/2)*4),A.STORAGE|A.COPY_DST);r.queue.writeBuffer(pe,0,fe.data);let n=d(S.visibility,A.STORAGE|A.COPY_DST),g=d(o(S),A.STORAGE|A.COPY_DST),y=d(new Float32Array(64),A.STORAGE|A.COPY_DST),C=O?r.createQuerySet({type:"timestamp",count:8}):null,v=O?d(new Float32Array(64),A.QUERY_RESOLVE|A.COPY_SRC|A.COPY_DST):null,k=O?r.createBuffer({size:64,usage:A.MAP_READ|A.COPY_DST}):null,re=d(new Float32Array(128),A.UNIFORM|A.COPY_DST),D=d(S.triangles,A.STORAGE|A.COPY_DST),W=d(S.nodes,A.STORAGE|A.COPY_DST),Me=wt.replace("// SHARED_STORAGE_READER",f?f.readerWGSL:"@group(0) @binding(10) var<storage,read> sharedStorage:array<u32>;").replace("// FOG_TRANSPORT",f?St:`fn fogTransmittance(ro:vec3f,rd:vec3f,limit:f32)->f32{return 1.;}
fn fogTransport(ro:vec3f,rd:vec3f,limit:f32)->vec4f{return vec4f(0.,0.,0.,1.);}`),X=r.createShaderModule({code:Me}),K=await X.getCompilationInfo();if(K.messages.some(t=>t.type==="error"))throw Error(K.messages.map(t=>`${t.lineNum}: ${t.message}`).join(`
`));let ee=await r.createComputePipelineAsync({layout:"auto",compute:{module:X,entryPoint:"main"}}),he=r.createShaderModule({code:Mt}),le=await he.getCompilationInfo();if(le.messages.some(t=>t.type==="error"))throw Error(le.messages.map(t=>`${t.lineNum}: ${t.message}`).join(`
`));let s=r.createBindGroupLayout({entries:[{binding:0,visibility:4,buffer:{type:"uniform"}},{binding:1,visibility:4,buffer:{type:"read-only-storage"}},{binding:2,visibility:4,buffer:{type:"storage"}},{binding:3,visibility:4,buffer:{type:"read-only-storage"}},{binding:4,visibility:4,storageTexture:{access:"write-only",format:"rgba8unorm"}}]}),b=r.createPipelineLayout({bindGroupLayouts:[s]}),V=await Promise.all(["first","second","third"].map(t=>r.createComputePipelineAsync({layout:b,compute:{module:he,entryPoint:t}}))),Q=r.createShaderModule({code:It}),L=await Q.getCompilationInfo();if(L.messages.some(t=>t.type==="error"))throw Error(L.messages.map(t=>`${t.lineNum}: ${t.message}`).join(`
`));let U=r.createBindGroupLayout({entries:[{binding:0,visibility:4,buffer:{type:"uniform"}},{binding:1,visibility:4,buffer:{type:"read-only-storage"}},{binding:2,visibility:4,buffer:{type:"storage"}},{binding:3,visibility:4,storageTexture:{access:"write-only",format:"rgba8unorm"}}]}),B=r.createPipelineLayout({bindGroupLayouts:[U]}),q=await Promise.all(["horizontal","vertical"].map(t=>r.createComputePipelineAsync({layout:B,compute:{module:Q,entryPoint:t}}))),ue=r.createShaderModule({code:"@group(0) @binding(0) var t:texture_2d<f32>;struct O{@builtin(position) p:vec4f,@location(0) uv:vec2f} @vertex fn vs(@builtin(vertex_index) i:u32)->O{let p=array<vec2f,3>(vec2f(-1.,-1.),vec2f(3.,-1.),vec2f(-1.,3.));var o:O;o.p=vec4f(p[i],0.,1.);o.uv=p[i]*vec2f(.5,-.5)+.5;return o;} @fragment fn fs(o:O)->@location(0) vec4f{return textureLoad(t,vec2i(clamp(o.uv,vec2f(0.),vec2f(.99999))*vec2f(textureDimensions(t))),0);}"}),Oe=await r.createRenderPipelineAsync({layout:"auto",vertex:{module:ue,entryPoint:"vs"},fragment:{module:ue,entryPoint:"fs",targets:[{format:Pe}]}}),me=1,de=1,Ie=1,ye=r.createTexture({size:[1,1,1],format:"rgba8unorm",usage:se.TEXTURE_BINDING|se.COPY_DST|se.RENDER_ATTACHMENT}),ne=null,Se=[],F=0,j=0,Y,E,Z,ce,Ae,_e,Te=[],J=[],xe=0,we=0,qe=0,Ce=0,We=0,G=!1,Ge=0,De="legacy",ve=0,Fe="created",Ue=[],ze=new Set,Je=!1,Re=!1,ke=!1,He=!1,$e=0,ot="",dt="",pt=await r.popErrorScope();if(pt)throw Error(pt.message);return{get scene(){return S},rendererName:"USD owned WebGPU path tracer",errors:H,adapterInfo:R.info??null,timestamps:O,get diagnostics(){return G?[]:At()},replaceScene(t){Be(),I(t),l=structuredClone(t);for(let i of a.keys())l.meshes.some(z=>z.path===i)||a.delete(i);Re=!0,Ee("scene-replaced")},update(t){if(Be(),t.rebakeReasons?.length)throw Error("REBAKE_REQUIRED");let i=!1,z=!1;for(let h of t.volumes??[]){let p=l.volumes?.find(x=>x.path===h.path);if(p){if(h.visible&&(!f||P(p)!==P(f.descriptor)))throw Error("VOLUME_NOT_PREPARED");p.visible!==h.visible&&(p.visible=h.visible,i=!0)}}for(let h of t.pointInstancers??[]){let p=l.pointInstancers?.find(x=>x.path===h.path);if(p){for(let x of["visible","protoIndices","instanceWorldMatrices"])h[x]!==void 0&&JSON.stringify(h[x])!==JSON.stringify(p[x])&&((x==="protoIndices"||x==="instanceWorldMatrices"&&h[x].length!==p[x].length)&&(z=!0),p[x]=structuredClone(h[x]),i=!0,ze.add(p.path));for(let x of h.prototypeComponents??[]){let oe=l.prototypes?.find(te=>te.path===p.prototypes[x.prototypeIndex])?.components.find(te=>te.meshPath===x.meshPath);if(oe)for(let te of["prototypeRelativeMatrix","visible"])x[te]!==void 0&&JSON.stringify(x[te])!==JSON.stringify(oe[te])&&(oe[te]=structuredClone(x[te]),i=!0,ze.add(x.meshPath))}}}for(let h of t.meshes??[]){let p=l.meshes.find(x=>x.path===h.path);if(p){h.visible!==void 0&&p.visible!==h.visible&&(p.visible=h.visible,i=!0,ke=!0);for(let x of["worldMatrix","material"])h[x]!==void 0&&JSON.stringify(p[x])!==JSON.stringify(h[x])&&(p[x]=structuredClone(h[x]),i=!0,ze.add(p.path));h.displayColor&&JSON.stringify(p.material?.diffuseColor)!==JSON.stringify(h.displayColor)&&(p.material={...p.material,diffuseColor:[...h.displayColor]},i=!0,ze.add(p.path)),h.displayOpacity!==void 0&&p.material?.opacity!==h.displayOpacity&&(p.material={diffuseColor:[.55,.55,.55],...p.material,opacity:h.displayOpacity},i=!0,ze.add(p.path))}}for(let h of t.lights??[]){let p=l.lights.find(x=>x.path===h.path);p&&Object.entries(h).some(([x,$])=>JSON.stringify(p[x])!==JSON.stringify($))&&(Object.entries(h).some(([x,$])=>x!=="visible"&&JSON.stringify(p[x])!==JSON.stringify($))?ze.add(p.path):ke=!0,Object.assign(p,structuredClone(h)),i=!0)}return i&&(Re=Re||z,z||ze.size?Ee("scene-values"):c.visibilityHistory?Ee("visibility-soft",c.visibilityHistory):Ee("visibility")),i},setSurface(t,i,z={}){if(Be(),!l.meshes.some($=>$.path===t))throw Error("Unknown surface mesh: "+t);if(!i||!(i.width>0&&i.height>0))throw Error("Surface must have positive pixel dimensions");if(z.u&&(!z.v||z.u.length!==4||z.v.length!==4))throw Error("Surface mapping requires u and v vec4");if(!["automatic","manual"].includes(z.updateMode??"automatic"))throw Error("Invalid surface updateMode");let h=a.get(t),p=h?.slot;if(p===void 0)for(p=0;[...a.values()].some($=>$.slot===p);)p++;if(p>=16)throw Error("At most 16 dynamic surfaces");let x={source:i,slot:p,colorSpace:"sRGB",flipY:!0,emission:1,updateMode:"automatic",...z,dirty:!0};a.set(t,x),(!h||h.emission!==x.emission)&&(ke=!0),(!h||["u","v","faceIndices"].some($=>JSON.stringify(h[$])!==JSON.stringify(x[$])))&&(Re=!0),Ee("surface-binding")},removeSurface(t){Be(),a.delete(t)&&(Re=!0,Ee("surface-removed"))},invalidateSurface(t){if(Be(),!a.has(t))throw Error("Unknown surface: "+t);a.get(t).dirty=!0,Ee("surface-content:"+t)},reset(){Be(),Ee()},async draw(t,i={}){if(Be(),He)throw Error("FRAME_IN_FLIGHT: await draw before drawing again");if(i={width:e.width||854,height:e.height||480,samples:1,bounces:6,exposure:1,shadows:!0,filter:0,...i},!Number.isInteger(i.samples)||i.samples<1||i.samples>64||!Number.isInteger(i.bounces)||i.bounces<1||i.bounces>32)throw Error("Invalid samples or bounces");if(!["legacy","robust"].includes(i.denoiseMode??"legacy")||!Number.isFinite(i.denoiseStrength??.65)||(i.denoiseStrength??.65)<0||(i.denoiseStrength??.65)>1)throw Error("Invalid denoising mode or strength");let z=performance.now();Ge++,He=!0;try{zt();let h=JSON.stringify(t),p=JSON.stringify([i.samples,i.bounces,i.exposure,i.shadows]);if((h!==ot||p!==dt)&&(Ee(h!==ot?"camera":"transport-settings"),ot=h,dt=p),G)throw Error("Tracer disposed");N(i.width,i.height);let x=Math.max(0,Math.min(2,i.halo??0));x>0&&!ne&&(ne=r.createBuffer({size:F*j*16,usage:A.STORAGE}),Se=[0,1,2,3].map(w=>r.createBindGroup({layout:U,entries:[{binding:0,resource:{buffer:re}},{binding:1,resource:{buffer:w===0?Y:Te[(w-1)%2]}},{binding:2,resource:{buffer:ne}},{binding:3,resource:E.createView()}]}))),!x&&ne&&(ne.destroy(),ne=null,Se=[]);let $=performance.now(),oe=new Float32Array(64);for(let w of a.values()){let{source:ge,slot:Ye}=w;i.copySurfaces!==!1&&(w.updateMode!=="manual"||w.dirty?(w.updateMode==="manual"&&w.dirty&&Ce>0&&Ee("surface-upload"),r.queue.copyExternalImageToTexture({source:ge},{texture:ye,origin:[0,0,Ye]},[ge.width,ge.height]),w.dirty=!1,T++):u++),oe.set([ge.width,ge.height,w.emission,(w.colorSpace==="sRGB"?2:1)*(w.flipY?-1:1)],Ye*4)}r.queue.writeBuffer(y,0,oe);let te=l.lights.filter(w=>w.visible&&w.type==="distant").slice(0,4),ht=[0,0,0];l.lights.filter(w=>w.visible&&w.type==="dome").forEach(w=>w.color.forEach((ge,Ye)=>ht[Ye]+=ge*w.intensity));let mt=performance.now(),lt=rt(Ct(t.target,t.position)),gt=rt(je(lt,t.up??[0,1,0])),_t=je(gt,lt),yt=new Float32Array(128),ae=(w,ge)=>yt.set(ge,w*4);ae(0,[...t.position,F]),ae(1,[...gt,j]),ae(2,[..._t,Math.tan(t.fov*Math.PI/360)]),ae(3,[...lt,i.exposure]),i.reset&&Ee("draw-reset");let vt=$e;if(ae(4,[Ce,i.samples,i.bounces,i.seed??We++]),De=i.denoiseMode??"legacy",ve=i.denoiseStrength??.65,ae(5,[c.rayEpsilon??1e-4,S.hasThinGlass?1:0,De==="robust"?1:0,ve]),ae(6,[x,Math.max(0,i.haloThreshold??1),Math.max(2,Math.min(12,i.haloRadius??8)),S.instanceData?1:0]),ae(7,[S.meshPaths.length,0,0,0]),ae(8,[_,0,0,0]),f){for(let w=0;w<4;w++)ae(20+w,f.inverseWorld.slice(w*4,w*4+4)),ae(28+w,f.inverseGrid.slice(w*4,w*4+4));ae(24,[...f.minimum,f.extinction]),ae(25,[...f.maximum,f.stepSize]),ae(26,[...f.albedo,f.maxSteps]),ae(27,[l.volumes?.some(w=>w.path===f.path&&w.visible)?1:0,f.shadowSteps,0,0])}ae(9,[0,0,0,i.shadows?1:0]),ae(10,[...ht,te.length]),te.forEach((w,ge)=>{ae(11+ge*2,[...rt(w.worldMatrix.slice(8,11)),0]),ae(12+ge*2,[...w.color.map(Ye=>Ye*w.intensity),0])}),ae(19,[fe.count,fe.total,0,c.lightSampling==="mis"?1:0]);let Xe=O&&(i.profile===!0||Ge%30===0),Ke=(w,ge)=>Xe?{timestampWrites:{querySet:C,beginningOfPassWriteIndex:w,endOfPassWriteIndex:ge}}:{};r.queue.writeBuffer(re,0,yt);let Ve=r.createCommandEncoder(),Qe=Ve.beginComputePass(Ke(0,1));Qe.setPipeline(ee),Qe.setBindGroup(0,Z),Qe.dispatchWorkgroups(Math.ceil(F/8),Math.ceil(j/8)),Qe.end(),xe=Math.max(0,Math.min(3,Math.floor(i.filter??0)));let Ze=Ve.beginComputePass(Ke(2,3));for(let w=0;w<xe;w++)Ze.setPipeline(V[w]),Ze.setBindGroup(0,J[w]),Ze.dispatchWorkgroups(Math.ceil(F/8),Math.ceil(j/8));if(Ze.end(),x>0||Xe){let w=Ve.beginComputePass(Ke(6,7));if(x>0)for(let ge of q)w.setPipeline(ge),w.setBindGroup(0,Se[xe]),w.dispatchWorkgroups(Math.ceil(F/8),Math.ceil(j/8));w.end()}let et=Ve.beginRenderPass({...Ke(4,5),colorAttachments:[{view:ie.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:0,a:1}}]});et.setPipeline(Oe),et.setBindGroup(0,ce),et.draw(3),et.end(),Xe&&(Ve.resolveQuerySet(C,0,8,v,0),Ve.copyBufferToBuffer(v,0,k,0,64)),r.queue.submit([Ve.finish()]);let ut=performance.now();await r.queue.onSubmittedWorkDone();let ct=performance.now();if(G)return{cancelled:!0};let bt=vt!==$e;bt||Ce++;let xt=null;if(Xe){await k.mapAsync(globalThis.GPUMapMode.READ);let w=new BigUint64Array(k.getMappedRange());xt={trace:Number(w[1]-w[0])/1e6,filter:xe?Number(w[3]-w[2])/1e6:0,present:Number(w[5]-w[4])/1e6,glare:x>0?Number(w[7]-w[6])/1e6:0},k.unmap()}return{stale:bt,generation:vt,preparationCpuMs:$-z,frameWallMs:performance.now()-z,denoiseMode:De,denoiseStrength:ve,resetReason:Fe,copyCpuMs:mt-$,encodeCpuMs:ut-mt,queueWaitMs:ct-ut,gpuMs:xt,timestampReadbackMs:performance.now()-ct,submitMs:ut-$,completionMs:ct-$,history:Ce,spp:Ce*i.samples,filter:xe,halo:x,width:F,height:j}}finally{He=!1}},async read(t=!1){if(Be(),He||!F)throw Error("Await a completed frame before read");let i=r.createCommandEncoder();i.copyBufferToBuffer(t&&xe?Te[(xe-1)%2]:Y,0,Ae,0,F*j*16),r.queue.submit([i.finish()]),await Ae.mapAsync(globalThis.GPUMapMode.READ);let z=new Float32Array(Ae.getMappedRange().slice(0));return Ae.unmap(),z},async snapshot(){if(G||!F||He)throw Error("Await a completed frame before capture");let t=Math.ceil(F*4/256)*256,i=r.createBuffer({size:t*j,usage:A.COPY_DST|A.MAP_READ});we=t*j,qe=Math.max(qe,we);try{let z=r.createCommandEncoder();z.copyTextureToBuffer({texture:E},{buffer:i,bytesPerRow:t},[F,j]),r.queue.submit([z.finish()]),await i.mapAsync(globalThis.GPUMapMode.READ);let h=new Uint8Array(i.getMappedRange()),p=new Uint8ClampedArray(F*j*4);for(let oe=0;oe<j;oe++)p.set(h.subarray(oe*t,oe*t+F*4),oe*F*4);let x=document.createElement("canvas");x.width=F,x.height=j,x.getContext("2d").putImageData(new ImageData(p,F,j),0,0);let $=x.toDataURL();return x.width=x.height=1,$}finally{i.destroy(),we=0}},inspect(){let t={disposed:G,width:F,height:j,history:Ce,triangleBytes:G?0:S.triangles.byteLength,bvhBytes:G?0:S.nodes.byteLength,areaLightBytes:G?0:Math.max(1,S.emitterCandidates.length/2)*16,emitterCount:fe.count,emitterWeight:fe.total,visibilityBytes:G?0:S.visibility.byteLength,timestampBytes:G||!O?0:320,timestampQueryCount:G||!O?0:8,uniformBytes:G?0:320,accumulationBytes:G?0:F*j*16,readbackBytes:G?0:F*j*16,outputBytes:G?0:F*j*4,captureBytes:G?0:we,capturePeakByteCount:qe,guideBytes:G?0:F*j*48,filterBytes:G?0:F*j*32,haloBytes:G||!ne?0:F*j*16,surfaceTextureBytes:G?0:me*de*Ie*4,surfaceInfoBytes:G?0:256,surfaceCount:G?0:a.size,generation:$e,busy:He,triangles:S.count,bvhBuildMs:S.buildMs,geometryMs:S.geometryMs,accelerationMs:S.accelerationMs,driverAndPipelineBytes:null,canvasAndCompositorBytes:null,totalProcessMemory:null};t.uniformBytes=G?0:512,t.instanceBytes=G?0:S.instanceData?.byteLength??16,t.volumeBytes=G?0:_*16;let i=Object.entries(t).reduce((z,[h,p])=>z+(h.endsWith("Bytes")&&typeof p=="number"?p:0),0);return t.instancing={composedInstances:G?0:S.instanceCount??0,activeInstances:G?0:S.activeInstanceCount??0,prototypes:G?0:S.prototypeCount??0,prototypeTriangleBytes:G?0:S.prototypeTriangleBytes??0,expandedTriangleCount:G?0:S.expandedTriangleCount??S.count,topLevelNodes:G?0:S.topLevelNodeCount??0},t.surfaceUploads={copies:T,reused:u,pending:[...a.values()].filter(z=>z.dirty).length},t.lightSampling=c.lightSampling??"light",t.fog=f?{path:f.path,visible:!G&&!!l.volumes?.some(z=>z.path===f.path&&z.visible),...f.metadata,extinction:f.extinction,albedo:f.albedo,stepSize:f.stepSize,maxSteps:f.maxSteps,shadowSteps:f.shadowSteps,scope:"static float fog; distant-light single scattering; bounded midpoint integration"}:null,{...t,construction:{...m},knownGpuAllocationBytes:i,activeTriangles:G?0:Ot(),residentTriangles:G?0:S.count,denoiseMode:De,denoiseStrength:ve,lastResetReason:Fe,resetEvents:Ue.map(z=>({...z}))}},dispose(){G||(G=!0,be.forEach(t=>t.destroy()),Y?.destroy(),E?.destroy(),ye.destroy(),a.clear(),ne?.destroy(),ne=null,Se=[],Ae?.destroy(),_e?.destroy(),Te.forEach(t=>t.destroy()),k?.destroy(),C?.destroy(),ie.unconfigure(),r.destroy(),f&&(f.data=new Uint8Array(0)),l={meshes:[],lights:[],pointInstancers:[]},fe={data:new Float32Array(0),count:0,total:0},S={...S,updateRetained:void 0,refitIndex:void 0,meshIndices:void 0,triangleKeys:[],triangles:new Float32Array(0),nodes:new Float32Array(0),instanceData:new Float32Array(0),prototypeVisibility:{},emitters:new Float32Array(0),emitterCandidates:new Uint32Array(0),visibility:new Float32Array(0),meshPaths:[],meshTriangleCounts:new Uint32Array(0)})}}}catch(d){r.destroy();try{e.getContext("webgpu")?.unconfigure()}catch{}throw d}}async function ai(e,l,c,f={}){let P=new Map(c.meshes.map(a=>[a.path,a])),I=new Map(c.lights.map(a=>[a.path,a])),_={...l,meshes:l.meshes.map(a=>({...a,...P.get(a.path)})),lights:l.lights.map(a=>({...a,...I.get(a.path)}))},o=await at(e,_,{glassMode:"thin",rayEpsilon:1e-5,...f});try{return{applySample:a=>o.update(a),draw:(a,T)=>o.draw(a,T),reset:()=>o.reset(),inspect:()=>({...o.inspect(),rendererName:o.rendererName,glassMode:"thin",errors:[...o.errors],diagnostics:[...o.diagnostics]}),snapshot:()=>o.snapshot(),dispose:()=>o.dispose()}}catch(a){throw o.dispose(),a}}export{ai as createNixieRenderer,at as createPathTracer,Ne as preparePathTracingScene};
