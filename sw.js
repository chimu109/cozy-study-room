const CACHE='cozy-study-room-v2.2-20261025';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
const IMAGES=['bear','cream','chick','honey','wolf','squirrel','bird','bee'].map(x=>'./'+x+'.webp');
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(async c=>{await c.addAll(FILES);await Promise.all(IMAGES.map(async path=>{try{await c.add(path)}catch(e){/* permit missing optional artwork */}}));}).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('cozy-study-room-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;
if(event.request.mode==='navigate'){event.respondWith(fetch(event.request).then(async response=>{if(response.ok){const c=await caches.open(CACHE);c.put('./index.html',response.clone())}return response}).catch(()=>caches.match('./index.html')));return;}
event.respondWith(fetch(event.request).then(async response=>{if(response.ok){const c=await caches.open(CACHE);c.put(event.request,response.clone())}return response}).catch(()=>caches.match(event.request)));});
