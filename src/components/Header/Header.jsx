import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Header.module.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const location = useLocation()
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
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <img
            className="logo-img"
            src="/images/logo.svg"
            alt="taisiya_style_logo"
            width="80px"
          />
        </Link>
      </div>
      <button className={styles.menuButton} onClick={toggleMenu}>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </button>
      <nav
        className={`${styles.nav} ${isMenuOpen ? styles.active : ''}`}
        ref={menuRef}
      >
        <ul className={styles.navList}>
          {['about', 'services', 'contact', 'gallery'].map((page) => (
            <li key={page} className={styles.navItem}>
              <Link
                className={`${styles.navItemLink} ${
                  location.pathname === `/${page}` ? styles.active : ''
                }`}
                to={`/${page}`}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
