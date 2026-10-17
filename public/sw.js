// Bump this version whenever an image under /assets/images is replaced with a
// new file of the same name, so returning visitors download the new one.
const CACHE_NAME = 'ao-magazine-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/assets/images/hero-abm.webp'
];

// Install Event
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      // Cache each file separately so one missing file doesn't cancel the rest
      Promise.allSettled(ASSETS_TO_CACHE.map((url) => cache.add(url)))
    )
  );
  self.skipWaiting();
});

// Activate Event: remove caches from older versions
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Fetch Event
self.addEventListener('fetch', (e) => {
  const { request } = e;
  const url = new URL(request.url);

  // Leave to the browser: non-GET requests, other sites (Google Maps, CDNs, Firebase)
  // and API calls, which must always return fresh listings
  if (request.method !== 'GET' || url.origin !== self.location.origin || url.pathname.startsWith('/api/')) return;

  // Images and the build's hashed JS/CSS files never change under the same name:
  // serve them from cache with no background re-download
  if (url.pathname.startsWith('/assets/')) {
    e.respondWith(cacheFirst(request));
    return;
  }

  // Pages, scripts and everything else: always try the network so new deploys show up,
  // and fall back to the cached copy when offline
  e.respondWith(networkFirst(request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok && response.type === 'basic') {
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
  }
  return response;
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok && response.type === 'basic') {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    const cached = await caches.match(request);
    if (cached) return cached;
    if (request.mode === 'navigate') {
      const shell = await caches.match('/');
      if (shell) return shell;
    }
    throw err;
  }
}
