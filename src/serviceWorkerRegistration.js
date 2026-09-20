const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(/^127(?:\.\d{1,3}){3}$/)
)

export function register() {
  if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) {
    return
  }

  // Реєструємо лише на HTTPS (або localhost для тестів).
  if (window.location.protocol !== 'https:' && !isLocalhost) {
    return
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .catch((error) => {
        console.error('Service worker registration failed:', error)
      })
  })
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => registration.unregister())
      .catch(() => {})
  }
}
