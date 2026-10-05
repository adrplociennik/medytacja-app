const VERSION="still-v2";
const SHELL=["./","./index.html","./styles.css","./app.js","./manifest.webmanifest","./assets/icon.svg"];

self.addEventListener("install",event=>{
  event.waitUntil(caches.open(VERSION).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()));
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(key=>!key.startsWith(VERSION)).map(key=>caches.delete(key))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch",event=>{
  const req=event.request;
  if(req.method!=="GET")return;
  const url=new URL(req.url);
  if(url.origin!==location.origin)return;

  if(url.pathname.includes("/audio/")){
    event.respondWith(caches.open(VERSION+"-audio").then(async cache=>{
      const cached=await cache.match(req);
      if(cached)return cached;
      const response=await fetch(req);
      if(response.ok)cache.put(req,response.clone());
      return response;
    }));
    return;
  }

  if(req.mode==="navigate"){
    event.respondWith(
      fetch(req).then(response=>{
        const copy=response.clone();
        caches.open(VERSION).then(cache=>cache.put("./index.html",copy));
        return response;
      }).catch(()=>caches.match("./index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(cached=>cached||fetch(req).then(response=>{
      if(response.ok)caches.open(VERSION).then(cache=>cache.put(req,response.clone()));
      return response;
    }))
  );
});
