/* eslint-disable @typescript-eslint/no-require-imports -- Offline UI event verification. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),Module=require('node:module'),ts=require('typescript');
const original=Module._load;let states=[],index=0;
Module._load=function(name,parent,isMain){if(name==='react'){const real=original.call(this,name,parent,isMain);return {...real,useState:()=>[states[index++],()=>{}],useEffect:()=>{},useRef:()=>({current:null})};}if(name==='next/navigation')return {useRouter:()=>({refresh(){}})};if(name.startsWith('@/'))name=path.resolve(__dirname,'../src',name.slice(2)+'.ts');return original.call(this,name,parent,isMain)};
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(mod,file)=>mod._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText,file);
const Demo=require('../src/components/DemoSession.tsx').default,Access=require('../src/components/RequestAccess.tsx').default;
function nodes(el){if(!el||typeof el!=='object')return [];return [el,...[el.props?.children].flat(Infinity).flatMap(nodes)];}
function renderDemo(busy=false){index=0;states=[[], '', 'new',busy,'',false,true,false];return nodes(Demo());}
let submitted=0,prevented=0;const input=renderDemo().find(e=>e.props?.id==='chat-input');
const key=(shift=false,composing=false)=>({key:'Enter',shiftKey:shift,nativeEvent:{isComposing:composing},preventDefault(){prevented++;},currentTarget:{form:{requestSubmit(){submitted++;}}}});
input.props.onKeyDown(key());assert.equal(submitted,1);assert.equal(prevented,1);
input.props.onKeyDown(key(true));input.props.onKeyDown(key(false,true));assert.equal(submitted,1);assert.equal(prevented,1);
renderDemo(true).find(e=>e.props?.id==='chat-input').props.onKeyDown(key());assert.equal(submitted,1);
index=0;states=['error','Delivery unavailable',{body:'saved request',href:'mailto:nathnael.eb@outlook.com?body=saved'},false];const fallback=nodes(Access());assert.ok(fallback.some(e=>e.type==='a'&&e.props.href?.startsWith('mailto:nathnael.eb@outlook.com')));assert.ok(fallback.some(e=>e.type==='input'&&e.props.name==='email'));assert.ok(fallback.some(e=>e.type==='p'&&e.props.children==='Your request has not been delivered. Your details are still in the form.'));
console.log('PASS UI handlers: Enter submits, Shift+Enter and IME preserve typing, busy prevents submission, failed access preserves fields and exposes truthful email fallback.');
