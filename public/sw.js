// Self-unregistering Service Worker that deletes all caches and unregisters itself
self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => self.registration.unregister())
  );
  self.clients.claim();
});

// Pure pass-through fetch: never cache or intercept
self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
