// Nome do Cache (Mude o número da versão 'v4' sempre que alterar o código do site)
const CACHE_NAME = 'portfolio-lucena-v4';

// Arquivos que serão salvos na memória do celular
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// 1. Instalação do Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto com sucesso');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Ativação e limpeza de caches antigos (Sua nova lógica)
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME]; // Lista de caches que queremos manter

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Se o cache atual não estiver na lista (ou seja, é uma versão antiga), delete-o
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deletando cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 3. Interceptação de requisições
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna do cache se encontrar, senão busca na rede
        return response || fetch(event.request);
      })
  );
});
