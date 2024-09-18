import React from 'react'
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles['footer-content']}>
        <div className={styles['social-media']}>
          <a
            className={styles['social-media-link']}
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a
            className={styles['social-media-link']}
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
        </div>
        <div className={styles['contact-info']}>
          <p className={styles['contact-info-item']}>
            Phone:{' '}
            <a className={styles['contact-info-link']} href="tel:123456789">
              123 456 789
            </a>
          </p>
          <p className={styles['contact-info-item']}>
            Email:{' '}
            <a
              className={styles['contact-info-link']}
              href="mailto:taisiyastyle@example.com"
            >
              taisiyastyle@example.com
            </a>
          </p>
        </div>
      </div>
      <p className={styles['copyright']}>
        &copy; 2024 TaisiyaStyle. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
