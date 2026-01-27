import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './LoginPage.module.css'

const LoginPage = () => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      setError(t('loginPage.enterEmail'))
      return
    }
    if (!email.includes('@')) {
      setError(t('loginPage.enterValidEmail'))
      return
    }
    if (!password) {
      setError(t('loginPage.enterPassword'))
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        'http://taisiya-portfolio-backend.onrender.com/auth/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }
      )

      const data = await response.json()

      if (response.ok && data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))

        if (data.user.role === 'admin') {
          navigate('/admin-panel')
        } else {
          navigate('/dashboard')
        }
      } else {
        setError(data.message || t('loginPage.invalidEmailOrPassword'))
      }
    } catch (err) {
      setError(t('loginPage.serverUnavailable'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>{t('loginPage.login')}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder={t('loginPage.email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder={t('loginPage.password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        {error && <div className={styles.error}>{error}</div>}
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? t('loginPage.loading') : t('loginPage.login')}
        </button>
      </form>
    </div>
  )
}

export default LoginPage
