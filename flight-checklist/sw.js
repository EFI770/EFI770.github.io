const CACHE='flight-checklist-cache-v6';
const FILES=['./','./index.html','./manifest.json','./icon.svg?v=6'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('flight-checklist-cache-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET') return;
 const url=new URL(e.request.url);
 if(url.origin!==location.origin) return;
 const isPage=e.request.mode==='navigate'||url.pathname.endsWith('/index.html')||url.pathname.endsWith('/flight-checklist/');
 if(isPage){
  e.respondWith(fetch(e.request,{cache:'no-cache'}).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put('./index.html',copy));}return response;}).catch(()=>caches.match('./index.html')));
  return;
 }
 e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}return response;})));
});