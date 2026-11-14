/* Built route and access verification; local credentials, no external model or email calls. */
/* eslint-disable @typescript-eslint/no-require-imports */
const {spawn}=require('node:child_process');
const assert=require('node:assert/strict');
const port=3011,origin=`http://127.0.0.1:${port}`;
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port',String(port)],{env:{...process.env,CADON_DEMO_ACCESS_CODE:'local-verification-only',CADON_DEMO_SESSION_SECRET:'local-verification-secret-000000000000000000',OPENAI_API_KEY:''},stdio:['ignore','pipe','pipe']});
let started=false;
server.stdout.on('data',async data=>{
 if(started||!data.toString().includes('Ready'))return;started=true;
 try{
  const cache=new Map();
  const read=async path=>{if(!cache.has(path)){const response=await fetch(origin+path);assert.equal(response.status,200,path);cache.set(path,await response.text());}return cache.get(path);};
  const home=await read('/');assert.match(home,/<h1>Data, AI &amp; IT/);assert.ok(home.includes('Send project enquiry'));assert.ok(home.includes('Core Offerings'));
  const pages=['/','/financial-services','/services/data-analytics','/services/ai-automation','/services/digital-it','/services/strategy-transformation','/privacy','/demo/chatgpt'];
  const interests={'/services/data-analytics':'Data &amp; analytics','/services/ai-automation':'AI &amp; automation','/services/digital-it':'Digital &amp; IT solutions','/services/strategy-transformation':'Strategy &amp; transformation'};
  for(const path of pages){
   const html=await read(path);assert.ok(html.includes('site-header company-header'),'Shared header: '+path);
   const canonical=`https://www.cadon.io${path==='/'?'':path}`;if(path!=='/demo/chatgpt')assert.ok(html.includes(`rel="canonical" href="${canonical}"`),'Canonical: '+path);
   if(interests[path])assert.ok(html.includes(`selected="">${interests[path]}</option>`),'Service selection: '+path);
   for(const heading of html.matchAll(/<h[123][^>]*>(.*?)<\/h[123]>/g)){const text=heading[1].replace(/<[^>]*>/g,'').trim();assert.ok(!text.endsWith('.'),'Trailing heading full stop: '+text);}
   for(const match of html.matchAll(/<a[^>]*href="([^"]+)"/g)){
    const href=match[1];if(!href.startsWith('/')&&!href.startsWith('#'))continue;
    const url=new URL(href,origin+path);const target=await read(url.pathname+url.search);
    if(url.hash)assert.ok(target.includes('id="'+url.hash.slice(1)+'"'),'Missing section: '+url);
   }
  }
  assert.equal((await fetch(origin+'/services/unknown-offering')).status,404);
  const sitemap=await read('/sitemap.xml');for(const path of pages.filter(p=>p.startsWith('/services/')||p==='/financial-services'))assert.ok(sitemap.includes(path),'Sitemap: '+path);
  for(const asset of ['/opengraph-image','/financial-services/opengraph-image','/fonts/dm-sans-latin.woff2','/images/cadon-mcp-session.png'])assert.equal((await fetch(origin+asset)).status,200,asset);
  const gate=await read('/demo');assert.ok(gate.includes('Access code'));assert.ok(gate.includes('site-header company-header'));
  const post=(route,body,cookie)=>fetch(origin+route,{method:'POST',headers:{origin,'content-type':'application/json',...(cookie?{cookie}:{})},body:JSON.stringify(body)});
  assert.equal((await post('/api/demo-chat',{message:'hello'})).status,401);assert.equal((await post('/api/demo-access',{code:'incorrect'})).status,401);
  const login=await post('/api/demo-access',{code:'local-verification-only'});assert.equal(login.status,200);const cookie=login.headers.get('set-cookie').split(';')[0];
  const chat=await fetch(origin+'/demo',{headers:{cookie}});assert.match(await chat.text(),/Ask CADON to perform a financial-service task/);
  const missing=await post('/api/demo-chat',{message:'I need a car loan'},cookie);assert.equal(missing.status,503);assert.match((await missing.json()).error,/OPENAI_API_KEY/);
  console.log('PASS HTTP: all five offering pages, shared navigation, heading punctuation, canonical metadata, service enquiry defaults, internal links and fragments, sitemap, unknown-route 404, social images, demo access and authenticated rendering.');
 }catch(error){console.error(error);process.exitCode=1;}finally{server.kill();}
});
server.stderr.on('data',data=>process.stderr.write(data));
setTimeout(()=>{if(!started){console.error('Server did not start');process.exitCode=1;server.kill();}},15000).unref();
