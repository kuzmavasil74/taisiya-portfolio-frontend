import API_URL from './config.js'

const apiFetch = async (path, options = {}) => {
  const token = localStorage.getItem('token')

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  if (res.status === 401) {
    localStorage.clear()
    window.location.href = '/login'
    return
  }

  return res
}

export default apiFetch
