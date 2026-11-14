/* eslint-disable @typescript-eslint/no-require-imports -- Offline UI event verification. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),Module=require('node:module'),ts=require('typescript');
const original=Module._load;let states=[],index=0;
Module._load=function(name,parent,isMain){if(name==='react'){const real=original.call(this,name,parent,isMain);return {...real,useState:()=>{const slot=index++;return [states[slot],value=>{states[slot]=typeof value==='function'?value(states[slot]):value;}]},useEffect:()=>{},useRef:()=>({current:null})};}if(name==='next/navigation')return {useRouter:()=>({refresh(){}})};if(name.startsWith('@/'))name=path.resolve(__dirname,'../src',name.slice(2)+'.ts');return original.call(this,name,parent,isMain)};
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
index=0;states=['idle','',null,false];const projectForm=nodes(Access({variant:'project'}));assert.ok(projectForm.some(e=>e.type==='button'&&e.props.children==='Send project enquiry'));assert.ok(projectForm.some(e=>e.type==='option'&&e.props.children==='Data & analytics'));assert.ok(!projectForm.some(e=>e.type==='option'&&e.props.children==='Financial institution'));
console.log('PASS project form: consulting interests and project enquiry action appear alongside the existing financial access variant.');

const Navbar=require('../src/components/Navbar.tsx').default;
const menuNodes=()=>{index=0;return nodes(Navbar());};
states=[false,false];let menu=menuNodes();const navWrapper=()=>menu.find(e=>e.props?.className==='offerings-navigation');
navWrapper().props.onPointerEnter({pointerType:'mouse'});menu=menuNodes();assert.equal(menu.find(e=>e.props?.className==='offerings-trigger').props['aria-expanded'],true);
const panel=menu.find(e=>e.props?.id==='desktop-offerings');const destinations=nodes(panel).filter(e=>e.props?.href).map(e=>e.props.href);assert.deepEqual(destinations,['/services/data-analytics','/services/ai-automation','/services/digital-it','/services/strategy-transformation','/financial-services']);
navWrapper().props.onKeyDown({key:'Escape',preventDefault(){},stopPropagation(){}});menu=menuNodes();assert.equal(menu.some(e=>e.props?.id==='desktop-offerings'),false);
global.requestAnimationFrame=fn=>fn();menu.find(e=>e.props?.className==='offerings-trigger').props.onKeyDown({key:'ArrowDown',preventDefault(){}});menu=menuNodes();assert.ok(menu.some(e=>e.props?.id==='desktop-offerings'));
navWrapper().props.onBlur({currentTarget:{contains:()=>false},relatedTarget:null});menu=menuNodes();assert.ok(!menu.some(e=>e.props?.id==='desktop-offerings'));
menu.find(e=>e.props?.className==='menu-toggle').props.onClick();menu=menuNodes();assert.ok(menu.some(e=>e.props?.id==='mobile-nav'));menu.find(e=>e.props?.className==='mobile-offerings-trigger').props.onClick();menu=menuNodes();assert.equal(nodes(menu.find(e=>e.props?.id==='mobile-offerings')).filter(e=>e.props?.href).length,5);
index=0;states=['idle','',null,false];assert.equal(nodes(Access({variant:'project',defaultInterest:'Digital & IT solutions'})).find(e=>e.type==='select').props.defaultValue,'Digital & IT solutions');
console.log('PASS navigation: hover and keyboard disclosure, Escape and focus exit, all offering destinations, mobile expansion, and service-specific enquiry selection.');
