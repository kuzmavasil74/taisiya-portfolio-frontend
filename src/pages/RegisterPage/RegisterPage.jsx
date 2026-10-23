import React, { useState } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import API_URL from '../../utills/config.js'
import BackButton from '../../components/BackButton/BackButton.jsx'

const RegisterPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [referralCode, setReferralCode] = useState(
    searchParams.get('ref') || ''
  )
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !email || !password) {
      setError(t('registerPage.fillAllFields'))
      return
    }
    if (password.length < 6) {
      setError(t('registerPage.passwordMinLength'))
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          referralCode: referralCode || undefined,
          marketingConsent,
        }),
      })

      const data = await res.json()

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        navigate('/dashboard')
      } else {
        setError(data.message || t('registerPage.registrationError'))
      }
    } catch (err) {
      setError(t('registerPage.serverUnavailable'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: '0 1rem' }}>
      <BackButton />
      <h2>{t('registerPage.title')}</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
      >
        <label htmlFor="name" className="sr-only">
          {t('registerPage.name')}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          placeholder={t('registerPage.name')}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="username" className="sr-only">
          {t('registerPage.email')}
        </label>
        <input
          type="email"
          id="username"
          name="username"
          autoComplete="username"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck="false"
          placeholder={t('registerPage.email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className="sr-only">
          {t('registerPage.password')}
        </label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="new-password"
          placeholder={t('registerPage.password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="referralCode" className="sr-only">
          {t('registerPage.referralCode')}
        </label>
        <input
          type="text"
          id="referralCode"
          name="referralCode"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck="false"
          placeholder={t('registerPage.referralCode')}
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
        />
        <label style={{ display: 'flex', gap: 8, fontSize: 13, alignItems: 'flex-start' }}>
          <input
            type="checkbox"
            checked={marketingConsent}
            onChange={(e) => setMarketingConsent(e.target.checked)}
            style={{ marginTop: 3 }}
          />
          <span>{t('registerPage.marketingConsent')}</span>
        </label>
        {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? t('registerPage.loading') : t('registerPage.submit')}
        </button>
      </form>
      <p style={{ marginTop: 16, fontSize: 14 }}>
        {t('registerPage.haveAccount')} <Link to="/login">{t('registerPage.loginLink')}</Link>
      </p>
    </div>
  )
}

export default RegisterPage
