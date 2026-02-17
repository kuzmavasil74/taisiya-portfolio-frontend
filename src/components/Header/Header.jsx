import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import { useTranslation } from 'react-i18next'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  const isAuth = !!token
  const isAdmin = user?.role === 'admin'

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsMenuOpen(false)
    }
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isMenuOpen])

  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
  }
  const navPage = [
    'about',
    'services',
    'contact',
    'gallery',
    'prices',
    'feedback',
  ]

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <img
            className={styles.logoImg}
            src="/images/logo.svg"
            alt="taisiya_style_logo"
            width="80px"
          />
        </Link>
      </div>
      <div className={styles.mobileLanguageSwitch}>
        <button
          onClick={() => changeLanguage('en')}
          aria-label="Switch to English"
          className={styles.languageButton}
        >
          <img
            src="/images/flags/en.jpg"
            alt="English"
            className={styles.flagIcon}
          />
        </button>
        <button
          onClick={() => changeLanguage('uk')}
          aria-label="Switch to Ukrainian"
          className={styles.languageButton}
        >
          <img
            src="/images/flags/uk.jpg"
            alt="Ukrainian"
            className={styles.flagIcon}
          />
        </button>
        <button
          onClick={() => changeLanguage('cs')}
          aria-label="Switch to Czech"
          className={styles.languageButton}
        >
          <img
            src="/images/flags/cs.jpg"
            alt="Czech"
            className={styles.flagIcon}
          />
        </button>
      </div>
      <button
        className={styles.menuButton}
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-controls="navigation"
        aria-label={
          isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
        }
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </button>
      <nav
        id="navigation"
        className={`${styles.nav} ${isMenuOpen ? styles.active : ''}`}
        ref={menuRef}
      >
        <ul className={styles.navList}>
          {navPage.map((page) => (
            <li key={page} className={styles.navItem}>
              <Link
                className={`${styles.navItemLink} ${
                  location.pathname === `/${page}` ? styles.active : ''
                }`}
                to={`/${page}`}
                onClick={handleNavClick}
              >
                {t(`nav.${page}`)}
              </Link>
            </li>
          ))}

          {!isAuth && (
            <li className={styles.navItem}>
              <Link
                className={`${styles.navItemLink} ${
                  location.pathname === '/login' ? styles.active : ''
                }`}
                to="/login"
                onClick={handleNavClick}
              >
                {t('nav.login')}
              </Link>
            </li>
          )}

          {isAuth && !isAdmin && (
            <li className={styles.navItem}>
              <Link
                className={`${styles.navItemLink} ${
                  location.pathname === '/dashboard' ? styles.active : ''
                }`}
                to="/dashboard"
                onClick={handleNavClick}
              >
                {t('nav.dashboard')}
              </Link>
            </li>
          )}

          {isAdmin && (
            <li className={styles.navItem}>
              <Link
                className={`${styles.navItemLink} ${
                  location.pathname === '/admin-panel' ? styles.active : ''
                }`}
                to="/admin-panel"
                onClick={handleNavClick}
              >
                {t('nav.admin')}
              </Link>
            </li>
          )}

          {isAuth && (
            <li className={styles.navItem}>
              <button
                className={styles.logoutButton}
                onClick={() => {
                  localStorage.clear()
                  handleNavClick()
                  navigate('/')
                }}
              >
                {t('nav.logout')}
              </button>
            </li>
          )}
        </ul>

        <div className={styles.languageSwitch}>
          <button
            onClick={() => changeLanguage('en')}
            aria-label="Switch to English"
            className={styles.languageButton}
          >
            <img
              src="/images/flags/en.jpg"
              alt="English"
              className={styles.flagIcon}
            />
          </button>
          <button
            onClick={() => changeLanguage('uk')}
            aria-label="Switch to Ukrainian"
            className={styles.languageButton}
          >
            <img
              src="/images/flags/uk.jpg"
              alt="Ukrainian"
              className={styles.flagIcon}
            />
          </button>
          <button
            onClick={() => changeLanguage('cs')}
            aria-label="Switch to Czech"
            className={styles.languageButton}
          >
            <img
              src="/images/flags/cs.jpg"
              alt="Czech"
              className={styles.flagIcon}
            />
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header
