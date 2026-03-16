const CACHE_NAME = 'presensi-farm-v5'; // Ubah ke v selanjutnya agar browser tahu ada update
const urlsToCache = [
  './',
  'index.html',
  'manifest.json',
  'icon/icon-192.png',
  'icon/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Membuka cache dan menyimpan icon baru...');
      return cache.addAll(urlsToCache);
    })
  );
});

// Menghapus cache lama agar tidak memenuhi memori HP
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Menghapus cache lama:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
