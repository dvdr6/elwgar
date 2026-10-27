/* Optional zero-dependency JavaScript server: static files + original form/visit APIs. */
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT || 3000);
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const trim = (value, max) => typeof value === 'string' ? value.trim().slice(0, max) : '';
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.woff2':'font/woff2'};
function json(res, code, data) {res.writeHead(code, {'Content-Type':'application/json'});res.end(JSON.stringify(data));}
async function insert(table, data) {
  if (!supabaseUrl || !serviceKey) return {ok:true, demo:true};
  const response = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/${table}`, {
    method:'POST', headers:{apikey:serviceKey, Authorization:`Bearer ${serviceKey}`, 'Content-Type':'application/json', Prefer:'return=minimal'}, body:JSON.stringify(data), signal:AbortSignal.timeout(15000)
  });
  if (!response.ok) throw new Error('Database insert failed');
  return {ok:true, demo:false};
}
export const server = createServer(async (req, res) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' https: data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'");
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://local').pathname);
    if (pathname.startsWith('/api/')) {
      if (!['/api/contact','/api/visit'].includes(pathname)) return json(res,404,{ok:false,error:'not_found'});
      if (req.method !== 'POST') {res.setHeader('Allow','POST'); return json(res,405,{ok:false,error:'method_not_allowed'});}
      let raw = '';
      for await (const chunk of req) {
        raw += chunk;
        if (Buffer.byteLength(raw) > 32768) return json(res,413,{ok:false,error:'too_large'});
      }
      let body;
      try {body = JSON.parse(raw);} catch {return json(res,400,{ok:false,error:'invalid_json'});}
      if (!body || typeof body !== 'object') return json(res,400,{ok:false,error:'invalid_json'});
      const lang = body.lang === 'en' ? 'en' : 'pl';
      if (pathname === '/api/contact') {
        if (trim(body.company,200)) return json(res,200,{ok:true,demo:false});
        const name=trim(body.name,120),email=trim(body.email,200),message=trim(body.message,4000);
        if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 3) return json(res,422,{ok:false,error:'invalid_fields'});
        return json(res,200,await insert('contact_messages',{name,email,message,lang}));
      }
      if (body.consent !== true) return json(res,403,{ok:false,error:'consent_required'});
      const forwarded=req.headers['x-forwarded-for'] || req.headers['x-vercel-forwarded-for'];
      return json(res,200,await insert('visits',{
        ip:trim(forwarded?.split(',')[0] || req.headers['x-real-ip'] || req.socket.remoteAddress,45),
        country:trim(req.headers['x-vercel-ip-country'] || req.headers['cf-ipcountry'],2),
        lang,path:trim(body.path,200) || '/',user_agent:trim(req.headers['user-agent'],300)
      }));
    }
    if (!['GET','HEAD'].includes(req.method)) return json(res,405,{ok:false,error:'method_not_allowed'});
    // Explicit public allowlist: never expose server code, environment files or dependencies.
    const name = pathname === '/' ? 'index.html' : pathname.slice(1);
    if (!['index.html','styles.css','app.js','translations.js','icon.svg'].includes(name) && !/^(brand|fonts)\/[\w.-]+\.(svg|woff2)$/.test(name)) return json(res,404,{ok:false,error:'not_found'});
    const data = await readFile(path.join(root,name));
    res.writeHead(200,{'Content-Type':types[path.extname(name)] || 'application/octet-stream'});
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch (error) {
    if (error.code === 'ENOENT') return json(res,404,{ok:false,error:'not_found'});
    console.error(error.message);
    json(res,500,{ok:false,error:'server_error'});
  }
});
server.listen(port,'0.0.0.0',() => console.log(`ELWGAR available on port ${port}`));
