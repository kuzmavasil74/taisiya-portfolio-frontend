import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <img src="/images/logo.svg" alt="taisiya_style_logo" width="80px" />
        </Link>
      </div>
      <nav>
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
      <div className={styles['social-media']}>
        <a href="https://instagram.com/" target="_blank" rel="noreferrer">
          Instagram
        </a>
        <a href="https://facebook.com/" target="_blank" rel="noreferrer">
          Facebook
        </a>
      </div>
    </header>
  )
}

export default Header
