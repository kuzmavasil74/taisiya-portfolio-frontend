const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://taisiya-portfolio-backend.onrender.com'
    : 'http://localhost:4000'

export default API_URL
