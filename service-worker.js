// service-worker.js
const CACHE_NAME = 'hello-world-cache-v1';
const urlsToCache = [
    '/',
    '/index.php',
    '/style/style.css',
    '192x192.png',
    '512x512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response; // Use cached resource
                }
                return fetch(event.request); // Fetch from the network
            })
    );
});
