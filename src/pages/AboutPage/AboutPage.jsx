import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './AboutPage.module.css'

function AboutPage() {
  const { t } = useTranslation()

  return (
    <section className={styles.about}>
      <div className={styles.photoSection}>
        <img
          src="/images/photoSection.jpg"
          alt={t('about.photoAlt')}
          className={styles.photo}
        />
      </div>
      <div className={styles.infoSection}>
        <h2 className={styles.heading}>{t('about.heading')}</h2>
        <p className={styles.biography}>{t('about.biography')}</p>
        <p className={styles.philosophy}>
          <strong>{t('about.philosophyTitle')}</strong> {t('about.philosophy')}
        </p>
        <div className={styles.certificates}>
          <h3>{t('about.certificatesTitle')}</h3>
          <ul>
            <li>{t('about.certificate1')}</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default AboutPage
