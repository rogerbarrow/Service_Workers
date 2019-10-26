const cacheName = 'v1';

const cachedAssets = [
  'index.html',
  '/css/style.css',
  '/css/mobile.css',
  '/css/widescreen.css',
  '/js/main.js'
];

//Call Install  Event
self.addEventListener('install', e => {
  console.log('Service Worker: Installed');

  e.waitUntil(
    caches
    .open(cacheName)
    .then(cache => {
      console.log('Service worker:Caching files ');
      cache.addAll(cachedAssets);
    })
    .then(() => self.skipWaiting())
  );
});

//Call Activate Event
self.addEventListener('activate', (e) => {
  console.log('Service Worker: activated');

  //Remove Unwanted Caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service worker: Clearing old cache');
            return caches.delete(cache);
          }
        })
      )
    })
  );
});

//Call Fetch event
self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching');
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request)));
});