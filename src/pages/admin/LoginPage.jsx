import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Базова валідація
    if (!email) {
      setError('Enter email')
      return
    }
    if (!email.includes('@')) {
      setError('Enter valid email')
      return
    }
    if (!password) {
      setError('Enter password')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('http://localhost:2000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.token) {
        // Зберігаємо токен, якщо сервер повертає
        localStorage.setItem('token', data.token)
        navigate('/dashboard') // редірект після успішного логіну
      } else {
        setError(data.message || 'Invalid email or password')
      }
    } catch (err) {
      setError('Server is not available. Try later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div style={{ color: 'red' }}>{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </>
  )
}

export default LoginPage
