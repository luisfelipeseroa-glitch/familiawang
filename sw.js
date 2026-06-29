const CACHE = "familia-wang-v1";
const ARQUIVOS = ["./index.html", "./manifest.json"];

self.addEventListener("install", (evento) => {
  evento.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ARQUIVOS))
  );
});

self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches.keys().then((chaves) =>
      Promise.all(chaves.filter((c) => c !== CACHE).map((c) => caches.delete(c)))
    )
  );
});

self.addEventListener("fetch", (evento) => {
  // Não cacheia chamadas à API de jogos nem ao Apps Script: elas precisam ser sempre atuais
  if (evento.request.url.includes("script.google.com") || evento.request.url.includes("githubusercontent.com")) {
    return;
  }
  evento.respondWith(
    caches.match(evento.request).then((resposta) => resposta || fetch(evento.request))
  );
});
