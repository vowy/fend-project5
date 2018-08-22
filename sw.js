var cacheName = 'v3';
var cachedPages = [
  '/./',
  'index.html',
  'restaurant.html',
  'restaurant.html?id=1',
  'restaurant.html?id=2',
  'restaurant.html?id=3',
  'restaurant.html?id=4',
  'restaurant.html?id=5',
  'restaurant.html?id=6',
  'restaurant.html?id=7',
  'restaurant.html?id=8',
  'restaurant.html?id=9',
  'restaurant.html?id=10',
  '/css/styles.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg'
];

self.addEventListener('install', (e) => {
  event.waitUntil(
    caches.open(cacheName)
    .then(function(cache) {
      return cache.addAll(cachedPages);
    })
  );
});


self.addEventListener('activate', (e) => {
  console.log('Service Worker Activated');
  e.waitUntil(
    caches.keys().then(cacheName => {
      return Promise.all(
        cacheName.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          };
        })
      )
    })
  )
});

self.addEventListener ('fetch', (e) => {
 e.respondWith(
   fetch(e.request).catch(
    () => caches.match(e.request)
 ));
});
