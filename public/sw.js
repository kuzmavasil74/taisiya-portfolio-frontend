/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'taisiya-style-v1'
const APP_SHELL = ['/', '/manifest.json', '/icons/icon-192x192.png']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event

  // Ніколи не чіпаємо запити на інший origin (бекенд API) чи не-GET запити —
  // авторизація/бронювання завжди мають йти напряму в мережу.
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) {
    return
  }

  // Навігація (SPA-роути): мережа спочатку, кеш — як офлайн-запасний варіант.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('/'))
    )
    return
  }

  // Статичні асети (JS/CSS/зображення/шрифти): кеш спочатку, мережа — запасний
  // варіант, з фоновим оновленням кешу.
  event.respondWith(
    caches.match(request).then((cached) => {
      const fetchPromise = fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
          }
          return response
        })
        .catch(() => cached)

      return cached || fetchPromise
    })
  )
})
