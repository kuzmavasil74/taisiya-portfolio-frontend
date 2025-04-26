import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Footer.module.css'
import { Link } from 'react-router-dom'

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
            {t('footer.instagram')}
          </a>
          <a
            className={styles['social-media-link']}
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
          >
            {t('footer.facebook')}
          </a>
        </div>
        <div className={styles['contact-info']}>
          <p className={styles['contact-info-item']}>
            {t('footer.phone')}{' '}
            <a className={styles['contact-info-link']} href="tel:123456789">
              +420 608 039 692
            </a>
          </p>
          <p className={styles['contact-info-item']}>
            {t('footer.email')}{' '}
            <a
              className={styles['contact-info-link']}
              href="mailto:taisiyastyle@example.com"
            >
              taisiyastyle@example.com
            </a>
          </p>
          <p className={styles['contact-info-item']}>
            <Link className={styles['contact-info-link']} to="/privacy-policy">
              {t('footer.privacy-policy')}{' '}
            </Link>
          </p>
          <p className={styles['contact-info-item']}>
            <Link
              className={styles['contact-info-link']}
              to="/terms-and-conditions"
            >
              {t('footer.terms-and-conditions')}{' '}
            </Link>
          </p>
        </div>
      </div>
      <p className={styles['copyright']}>{t('footer.copyright')}</p>
    </footer>
  )
}

export default Footer
