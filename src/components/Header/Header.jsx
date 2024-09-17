import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    console.log(`Menu is ${!isMenuOpen ? 'open' : 'closed'}`)
  }
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <img src="/images/logo.svg" alt="taisiya_style_logo" width="80px" />
        </Link>
      </div>
      <button className={styles.menuButton} onClick={toggleMenu}>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </button>
      <nav className={`${styles.nav} ${isMenuOpen ? styles.active : ''}`}>
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/gallery">Gallery</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
