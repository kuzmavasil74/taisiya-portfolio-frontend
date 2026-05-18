import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import API_URL from '../../utills/config.js'

const RegisterPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !email || !password) {
      setError('Заповніть всі поля')
      return
    }
    if (password.length < 6) {
      setError('Пароль мінімум 6 символів')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        navigate('/dashboard')
      } else {
        setError(data.message || 'Помилка реєстрації')
      }
    } catch (err) {
      setError('Сервер недоступний')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: '0 1rem' }}>
      <h2>Реєстрація</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
      >
        <input
          type="text"
          placeholder="Ім'я"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль (мін. 6 символів)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Завантаження...' : 'Зареєструватися'}
        </button>
      </form>
      <p style={{ marginTop: 16, fontSize: 14 }}>
        Вже є акаунт? <Link to="/login">Увійти</Link>
      </p>
    </div>
  )
}

export default RegisterPage
