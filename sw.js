// service-worker.js

const CACHE_NAME = 'cache-pokeapi';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js'
  // Agrega aquí todos los archivos de tu aplicación que deseas cachear
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
