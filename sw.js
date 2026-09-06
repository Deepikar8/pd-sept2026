/* Network-first service worker: always fetch fresh, fall back to cache offline. */
const CACHE = "pd2026-v3";
const ASSETS = ["./", "./index.html", "./style.css", "./app.js", "./data.js"];
const IMAGES = ["melaka-stadthuys", "ola-mutiara", "seremban-market", "ulu-bendul", "gunung-angsi",
  "cape-rachado-lighthouse", "cape-rachado-beach", "milky-way", "teluk-pelanduk-jetty", "sushi-bento", "yong-peng"]
  .map(n => "./img/" + n + ".jpg");

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c =>
    c.addAll(ASSETS).then(() => Promise.all(IMAGES.map(u => c.add(u).catch(() => {}))))
  ).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).then(res => {
      if (res && (res.ok || res.type === "opaque")) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      }
      return res;
    }).catch(() =>
      caches.match(e.request).then(hit => hit || (e.request.mode === "navigate" ? caches.match("./index.html") : Response.error()))
    )
  );
});
