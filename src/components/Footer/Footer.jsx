import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Footer.module.css'
import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebook } from 'react-icons/fa'
import { MdEmail, MdPhone } from 'react-icons/md'

function Footer() {
  const { t } = useTranslation()

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
            <FaInstagram />
          </a>
          <a
            className={styles['social-media-link']}
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebook />
          </a>
          <a className={styles['social-media-link']} href="tel:+420608039692">
            <MdPhone />
          </a>
          <a
            className={styles['social-media-link']}
            href="mailto:taisiyastyle@example.com"
          >
            <MdEmail />
          </a>
        </div>

        <div className={styles['policy-links']}>
          <Link className={styles['contact-info-link']} to="/privacy-policy">
            {t('footer.privacy-policy')}
          </Link>
          <Link
            className={styles['contact-info-link']}
            to="/terms-and-conditions"
          >
            {t('footer.terms-and-conditions')}
          </Link>
        </div>
      </div>

      <p className={styles['copyright']}>{t('footer.copyright')}</p>
    </footer>
  )
}

export default Footer
