const assetsToCache = [
  // Fichiers statiques
  './',
  'index.html',
  'manifest.json',
  'sw.js',
  'icon-192.png',
  'icon-512.png'
];

// Ajout dynamique des images
const imageContext = require.context('../img/', true, /\.(webp|png|jpg|svg)$/);
imageContext.keys().forEach(image => {
  assetsToCache.push(`img/${image.split('/').pop()}`);
});

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('bombardiro-cache').then(cache => cache.addAll(assetsToCache))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});
