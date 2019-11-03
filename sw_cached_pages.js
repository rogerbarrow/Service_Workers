const cacheName = "v1";

const cachedAssets = [
  "index.html",
  "/css/style.css",
  "/css/mobile.css",
  "/css/widescreen.css",
  "/js/main.js"
];
//Call Install  Event
self.addEventListener("install", e => {
  e.waitUntil(
    caches
    .open(cacheName)
    .then(cache => {
      cache.addAll(cachedAssets);
    })
    .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});