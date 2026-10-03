"""Read-only/live fictional MCP contract checks. No OpenAI or ChatGPT E2E claim."""
import json, urllib.request, pathlib
endpoint='https://cadon-demo.fly.dev/mcp'
headers={'Content-Type':'application/json','Accept':'application/json, text/event-stream'}
counter=0
def rpc(method,params=None):
 global counter
 counter+=1
 payload={'jsonrpc':'2.0','id':counter,'method':method,'params':params or {}}
 with urllib.request.urlopen(urllib.request.Request(endpoint,data=json.dumps(payload).encode(),headers=headers),timeout=35) as r:
  if r.headers.get('mcp-session-id'):headers['mcp-session-id']=r.headers['mcp-session-id']
  raw=r.read().decode()
 if raw.startswith('event:') or raw.startswith('data:'):raw='\n'.join(line[5:].lstrip() for line in raw.splitlines() if line.startswith('data:'))
 return json.loads(raw)
def call(name,args):
 root=rpc('tools/call',{'name':name,'arguments':args})
 result=root.get('result',{})
 if result.get('structuredContent'):return result['structuredContent']
 for c in result.get('content',[]):
  if c.get('type')=='text':
   try:return json.loads(c['text'])
   except ValueError:pass
 return result or root
init=rpc('initialize',{'protocolVersion':'2025-03-26','capabilities':{},'clientInfo':{'name':'cadon-contract-check','version':'1.0'}})
with urllib.request.urlopen(urllib.request.Request(endpoint,data=json.dumps({'jsonrpc':'2.0','method':'notifications/initialized'}).encode(),headers=headers),timeout=20) as r:r.read()
tools=rpc('tools/list')['result'];pathlib.Path('docs/mcp-schema.json').write_text(json.dumps(tools,indent=2)+'\n')
resources=rpc('resources/list')['result'];pathlib.Path('docs/mcp-resources.json').write_text(json.dumps(resources,indent=2)+'\n')
ui=rpc('resources/read',{'uri':'ui://cadon/offer-cards-v0.46.html'})
report={'date':'2026-10-03','server':init['result']['serverInfo'],'tools':len(tools['tools']),'ui_resource_read':bool(ui.get('result',{}).get('contents')),'scenarios':[]}
queries=[('car_25000','I need €25,000 to finance a car.'),('renovation','I need €20,000 to renovate my home.'),('savings','I want to open a savings account.'),('car_30000','I need €30,000 for a car.'),('car_update','I need €30,000 for a car. Actually make it €22,000.'),('unsupported','Book concert tickets for me.')]
for label,query in queries:
 result=call('prepare_cadon_context',{'query':query,'market':'BE'})
 report['scenarios'].append({'test':label,'scenario':result.get('scenario'),'ready_for_cards':result.get('ready_for_cards'),'question':result.get('question'),'next_tool':result.get('next_tool'),'safe_context':result.get('safe_context')})
 print(label,json.dumps(report['scenarios'][-1]))
ready=call('prepare_cadon_context',{'query':'I want financing of €25,000 for a new car in Belgium. Show all providers, no preference.','market':'BE'})
report['full_car_context']={'scenario':ready.get('scenario'),'ready_for_cards':ready.get('ready_for_cards')}
if ready.get('ready_for_cards'):
 args=ready.get('next_tool_args',{})
 # MCP schema budget is numeric, while preflight next_tool_args declares string values.
 if 'budget_eur' in args:args['budget_eur']=float(args['budget_eur'])
 offers=call(ready['next_tool'],args)
 report['offer_cards']={'count':len(offers.get('offers',[])),'launch_links_present':all(o.get('demo_url') and o.get('launch_id') for o in offers.get('offers',[]))}
report['explicit_context_checks']={}
for label,args in [('car_25000',{'query':'I need a €25,000 new-car loan in Belgium. No preferred provider; show all offers.','scenario':'car_loan','market':'BE'}),('car_22000_current_recap',{'query':'I need a new-car loan in Belgium, €22,000. No preferred provider; show all offers.','scenario':'car_loan','budget_eur':22000,'market':'BE'}),('savings_explicit_scenario',{'query':'I want a savings account for emergency savings, flexible access, in Belgium. No preferred provider.','scenario':'savings_account','market':'BE'})]:
 result=call('prepare_cadon_context',args)
 entry={k:result.get(k) for k in ['scenario','ready_for_cards','question','next_tool']}
 if result.get('ready_for_cards'):
  args=result.get('next_tool_args',{})
  if 'budget_eur' in args:args['budget_eur']=float(args['budget_eur'])
  offers=call(result['next_tool'],args);entry['offer_count']=len(offers.get('offers',[]))
  safe={k:offers.get(k) for k in ['scenario','product_name','market']}
  safe['offers']=[{k:v for k,v in offer.items() if k in ['bank_id','bank_name','rate','highlight','metrics']} for offer in offers.get('offers',[])]
  pathlib.Path('docs/mcp-offer-fixture.json').write_text(json.dumps({'_fixture_notice':'Sanitized fictional MCP provider response for offline tests only; session links and tokens removed.','output':safe},indent=2)+'\n')
 report['explicit_context_checks'][label]=entry
launch=call('get_cadon_demo_link',{'scenario':'car_loan','market':'BE'})
report['launch_created']=bool(launch.get('demo_url') and launch.get('launch_id'))
if launch.get('launch_id'):
 result=call('get_demo_result',{'launch_id':launch['launch_id'],'wait_seconds':0})
 report['unopened_launch_result']={k:v for k,v in result.items() if k in ('status','state','reason','signal')}
invalid=call('get_demo_result',{'launch_id':'nonexistent-cadon-validation','wait_seconds':0})
report['invalid_launch_result']={k:v for k,v in invalid.items() if k in ('status','state','reason','isError','error')}
pathlib.Path('docs/mcp-validation.json').write_text(json.dumps(report,indent=2)+'\n')
print('summary',json.dumps({k:v for k,v in report.items() if k!='scenarios'}))
try:urllib.request.urlopen(urllib.request.Request(endpoint,method='DELETE',headers=headers),timeout=10).read()
except Exception:pass
