// Safe PWA Service Worker - Non-blocking, transparent pass-through
self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

// No fetch interception: always fetch live from network
self.addEventListener("fetch", () => {
  // Pass-through to browser default network handler
});
