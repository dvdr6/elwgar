import {test, after} from 'node:test';
import assert from 'node:assert/strict';
process.env.PORT = '0';
delete process.env.SUPABASE_URL;
delete process.env.NEXT_PUBLIC_SUPABASE_URL;
delete process.env.SUPABASE_SERVICE_ROLE_KEY;
const {server} = await import('../server.js');
if (!server.listening) await new Promise(resolve=>server.once('listening', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
after(()=>new Promise(resolve=>server.close(resolve)));
const post = (route, body)=>fetch(base+route,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
test('static HTML, CSS, JavaScript and font assets are served', async()=>{
  for (const file of ['/', '/styles.css','/app.js','/translations.js','/brand/logo.svg','/fonts/archivo-latin-wght-normal.woff2']) assert.equal((await fetch(base+file)).status,200);
  const html=await (await fetch(base)).text();
  for(const id of ['start','uslugi','portfolio','studio','kontakt']) assert.ok(html.includes(`id="${id}"`));
  assert.ok(!html.includes('_next/'));
});
test('private files are never served',async()=>{
  for(const file of ['/server.js','/.env','/package.json','/../package.json']) assert.equal((await fetch(base+file)).status,404);
});
test('contact validates and supports the original demo response',async()=>{
  assert.equal((await post('/api/contact',{})).status,422);
  const valid={name:'Test',email:'test@example.com',message:'Test message',lang:'en'};
  assert.deepEqual(await (await post('/api/contact',valid)).json(),{ok:true,demo:true});
  assert.deepEqual(await (await post('/api/contact',{company:'bot'})).json(),{ok:true,demo:false});
});
test('visits require explicit consent',async()=>{
  assert.equal((await post('/api/visit',{consent:false})).status,403);
  assert.equal((await post('/api/visit',{consent:'true'})).status,403);
  assert.deepEqual(await (await post('/api/visit',{consent:true,lang:'en'})).json(),{ok:true,demo:true});
});
test('API rejects invalid JSON and incorrect methods',async()=>{
  assert.equal((await fetch(base+'/api/contact',{method:'POST',body:'no'})).status,400);
  assert.equal((await fetch(base+'/api/contact')).status,405);
});
