import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)
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
      <nav className={`${styles.nav} ${isMenuOpen ? styles.active : ''}`}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link className={styles.navItemLink} to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className={styles.navItemLink} to="/services">
              Services
            </Link>
          </li>
          <li>
            <Link className={styles.navItemLink} to="/contact">
              Contact
            </Link>
          </li>
          <li>
            <Link className={styles.navItemLink} to="/gallery">
              Gallery
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
