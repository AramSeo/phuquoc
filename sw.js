var CACHE='pq-v7';
var PRECACHE=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
var RUNTIME_HOSTS=['unpkg.com','html2canvas.hertzen.com','www.gstatic.com','fonts.googleapis.com','fonts.gstatic.com'];

self.addEventListener('install',function(e){
  e.waitUntil(
    caches.open(CACHE)
      .then(function(c){return c.addAll(PRECACHE)})
      .then(function(){return self.skipWaiting()})
      .catch(function(){})
  );
});

self.addEventListener('activate',function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)}));
    }).then(function(){return self.clients.claim()})
  );
});

function isRuntimeCacheable(url){
  if(url.origin===self.location.origin) return true;
  for(var i=0;i<RUNTIME_HOSTS.length;i++){
    if(url.host.indexOf(RUNTIME_HOSTS[i])!==-1) return true;
  }
  return false;
}

self.addEventListener('fetch',function(e){
  var req=e.request;
  if(req.method!=='GET') return;
  var url;
  try{ url=new URL(req.url); }catch(_){ return }
  if(url.protocol!=='http:'&&url.protocol!=='https:') return;
  // Skip Firebase Realtime DB / analytics — always network
  if(url.host.indexOf('firebaseio.com')!==-1||url.host.indexOf('firebasedatabase.app')!==-1||url.host.indexOf('google-analytics.com')!==-1) return;
  if(!isRuntimeCacheable(url)) return;

  // Stale-while-revalidate
  e.respondWith(
    caches.open(CACHE).then(function(cache){
      return cache.match(req).then(function(cached){
        var network=fetch(req).then(function(res){
          if(res&&res.status===200&&(res.type==='basic'||res.type==='cors')){
            cache.put(req,res.clone()).catch(function(){});
          }
          return res;
        }).catch(function(){return cached});
        return cached||network;
      });
    })
  );
});

self.addEventListener('message',function(e){
  if(e.data&&e.data.type==='SKIP_WAITING') self.skipWaiting();
});
