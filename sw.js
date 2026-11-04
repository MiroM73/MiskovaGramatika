// Keeps a copy of the app on the phone so it opens instantly and works offline.
// Files are served from the phone's copy first; a fresh copy is fetched in the
// background, so an updated index.html shows up the next time the app is opened.
// A new version (version.js) gets its own cache, filled with fresh files from the server.
importScripts("version.js");
const CACHE = "gramatika-" + self.APP_VERSION;
const FILES = [
  "./",
  "index.html",
  "app.js",
  "version.js",
  "fonts.css",
  "fonts/baloo2-latin.woff2",
  "fonts/baloo2-latin-ext.woff2",
  "fonts/nunito-latin.woff2",
  "fonts/nunito-latin-ext.woff2",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/maskable-192.png",
  "icons/maskable-512.png",
  "icons/apple-touch-icon.png",
  "icons/favicon-32.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE)
    .then(c => c.addAll(FILES.map(f => new Request(f, { cache: "reload" }))))
    .then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;
  // The app's update check must always reach the server
  if (url.searchParams.has("check")) return;
  e.respondWith(caches.open(CACHE).then(async cache => {
    const key = e.request.mode === "navigate" ? "./" : e.request;
    const cached = await cache.match(key, { ignoreSearch: true });
    const fresh = fetch(e.request)
      .then(res => { if (res.ok) cache.put(key, res.clone()); return res; })
      .catch(() => cached);
    if (cached) { e.waitUntil(fresh); return cached; }
    return fresh;
  }));
});
