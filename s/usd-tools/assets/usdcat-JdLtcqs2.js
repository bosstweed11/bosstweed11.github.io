var O=Object.defineProperty;var u=(t,e)=>O(t,"name",{value:e,configurable:!0});import{av as g,o as M,L as p,aw as A,ax as L}from"./layerTree-Z5kjLz09.js";import{S,a as R}from"./stage-_T2MNvlO.js";import{_ as E,a as T,A as P,T as q,b as v,c as C,d as U,e as I,f as b}from"./prefetchedAssets-DskgvvEM.js";import{U as _,a as W}from"./authoring-CpHaIJNG.js";import"./value-BAthVjp4.js";const h={ValidationError:105,RequiredError:106,ExtrasError:109,ArgumentMismatch:114},N="Write usd file(s) either as text to stdout or to a specified output file.",D=`${N}
Usage: usdcat [OPTIONS] inputFiles...

Positionals:
  inputFiles ...              A list of input files

Options:
  -h,--help                   Print this help message and exit
  -o,--out file               Write a single input file to this output file instead of stdout.
  --usdFormat usda|usdc       Use this underlying file format for output files
                              with the extension 'usd'.
  -l,--loadOnly               Attempt to load the specified input files and report 'OK'
                              or 'ERR' for each one.
  -f,--flatten                Compose stages with the input files as root layers
                              and write their flattened content.
  --flattenLayerStack         Flatten the layer stack with the given root layer, and
                              write out the results.
  --skipSourceFileComment     If --flatten is specified, skip adding a comment regarding the
                              source of the flattened layer.
  --mask PRIMPATH[,PRIMPATH...]
                              Limit stage population to these prims, their descendants and
                              ancestors. Requires --flatten.
  --layerMetadata             Load only layer metadata in the USD file.
`;function G(t,e){const n={inputFiles:[],output:"",usdFormat:"",mask:"",loadOnly:!1,flatten:!1,flattenLayerStack:!1,skipSourceFileComment:!1,layerMetadata:!1},l={"-l":"loadOnly","--loadOnly":"loadOnly","-f":"flatten","--flatten":"flatten","--flattenLayerStack":"flattenLayerStack","--skipSourceFileComment":"skipSourceFileComment","--layerMetadata":"layerMetadata"},x={"-o":"output","--out":"output","--usdFormat":"usdFormat","--mask":"mask"},a=u((i,o)=>(e.stderr(`${i}
Run with --help for more information.
`),{exitCode:o}),"fail"),s=[];let d=!1;for(let i=0;i<t.length;++i){const o=t[i];if(d||!o.startsWith("-")||o==="-"){n.inputFiles.push(o);continue}if(o==="--"){d=!0;continue}if(o==="-h"||o==="--help")return e.stdout(D),{exitCode:0};const r=o.startsWith("--")?o.indexOf("="):-1,f=r<0?o:o.slice(0,r),y=l[f];if(y!==void 0&&r<0){n[y]=!0;continue}const F=x[f];if(F===void 0){s.push(o);continue}let c;if(r>=0?c=o.slice(r+1):i+1<t.length&&(c=t[++i]),c===void 0)return a(`Argument ${f} requires an argument`,h.ArgumentMismatch);if(F==="usdFormat"){const k=["usda","usdc"].find($=>$===c.toLowerCase());if(k===void 0)return a(`--usdFormat: ${c} not in {usda,usdc}`,h.ValidationError);c=k}n[F]=c}return s.length>0?a(`${s.length>1?"The following arguments were not expected: ":"The following argument was not expected: "}${s.join(" ")}`,h.ExtrasError):n.inputFiles.length===0?a("inputFiles is required",h.RequiredError):{args:n}}u(G,"parseArgs");function m(t,e='"'){return e+t.replace(/\\/g,"\\\\").replaceAll(e,`\\${e}`)+e}u(m,"quoted");function w(t){return t.getErrors().map(e=>e.getCommentary())}u(w,"commentaries");async function B(t,e){if(!E(t))return;const n=`${t}.quarantine`;try{await I(t,n)}catch(l){e.stderr(`Failed to rename possibly corrupt output file from ${t} to ${n} : ${l instanceof Error?l.message:String(l)}
`);return}e.stderr(`Possibly corrupt output file renamed to ${n}
`)}u(B,"quarantine");async function H(t,e){if(t.output!==""){if(E(t.output)&&!T(t.output))return e.stderr(`error: no write permission for existing output file ${m(t.output,"'")}
`),1;if(t.inputFiles.length!==1)return e.stderr(`error: must supply exactly one input file when writing to an output file.
`),1;const a=g(t.output);if(t.usdFormat!==""&&a!=="usd")return e.stderr(`error: use of --usdFormat requires output file end with '.usd' extension.
`),1;if(!M.findByExtension(a))return e.stderr(`error: unknown output file extension.
`),1}else if(t.usdFormat!==""&&t.usdFormat!=="usda")return e.stderr(`error: --usdFormat must be unspecified or 'usda' if writing to stdout; specify an output file with -o/--out to write other formats.
`),1;if(t.mask!==""&&!t.flatten)return e.stderr(`error: --mask requires --flatten
`),1;if(t.layerMetadata&&(t.flatten||t.flattenLayerStack))return e.stderr(`error: --layerMetadata cannot be used together with ${t.flatten?"--flatten":"--flattenLayerStack"}
`),1;let n=0;const l=new Map;t.usdFormat!==""&&l.set("format",t.usdFormat);const x=P();for(const a of t.inputFiles){const s=new q;try{const d=x.createDefaultContextForAsset(a);await new v(d).run(async()=>{let i,o;try{if(t.flatten){const r=await p.findOrOpen(a);if(r)if(t.mask==="")o=await S.open(r,{resolverContext:d});else{const f=new R;for(const y of A(t.mask,", "))f.add(L.fromString(y).toString());o=await S.openMasked(r,f,{resolverContext:d})}}else if(t.flattenLayerStack){const r=await p.findOrOpen(a);r&&(o=await S.open(r,{resolverContext:d,loadPayloads:!1})),o&&(i=_(o))}else if(t.layerMetadata){const r=await p.openAsAnonymous(a,!0);i=p.createAnonymous(".usda"),W(r,i)}else i=await p.findOrOpen(a)}catch(r){s.capture(()=>{throw r instanceof C?r:new C(r instanceof Error?r.message:String(r))})}if(!i&&!o&&s.isClean()&&U("Could not open layer"),s.isClean()){if(t.loadOnly){e.stdout(`OK  ${a}
`);return}}else{if(t.loadOnly){e.stdout(`ERR ${a}
`);for(const r of w(s))e.stdout(`	${r}
`)}else{e.stderr(`Failed to open ${m(a)} - `);for(const r of w(s))e.stderr(`${r}
`)}s.clear(),n=1;return}if(t.output!==""){try{i?await i.export(t.output,l):await o.export(t.output,!t.skipSourceFileComment,l)}catch(r){s.capture(()=>{throw r})}if(!s.isClean()){n=1,e.stderr(`Error exporting ${m(a)} to ${m(t.output)} - `);for(const r of w(s))e.stderr(`${r}
`);await B(t.output,e)}}else{let r="";if(s.capture(()=>{r=i?i.exportToString():o.exportToString()}),s.isClean())e.stdout(r);else{n=1,e.stderr(`Error writing ${m(a)} to stdout - `);for(const f of w(s))e.stderr(`${f}
`)}}})}finally{s.dispose()}}return n}u(H,"usdCat");const K={stdout:u(t=>{process.stdout.write(t)},"stdout"),stderr:u(t=>{process.stderr.write(t)},"stderr")};async function V(t,e=K){const n=G(t,e);return"exitCode"in n?n.exitCode:H(n.args,e)}u(V,"usdcat");await b(import.meta.url)&&(process.exitCode=await V(process.argv.slice(2)));export{V as usdcat};
