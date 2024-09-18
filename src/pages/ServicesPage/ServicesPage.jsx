import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ServicesPage.module.css'

function ServicesPage() {
  const { t } = useTranslation()

  return (
    <section className={styles.services}>
      <div className={styles.serviceCategory}>
        <h2 className={styles.heading}>{t('services.heading')}</h2>

        <div className={styles.category}>
          <h3 className={styles.subheading}>{t('services.haircuts.title')}</h3>
          <p className={styles.description}>
            {t('services.haircuts.description')}
          </p>
          <p className={styles.features}>
            <strong>{t('services.features')}</strong>{' '}
            {t('services.haircuts.features')}
          </p>
          <p className={styles.price}>{t('services.haircuts.price')}</p>
        </div>

        <div className={styles.category}>
          <h3 className={styles.subheading}>{t('services.coloring.title')}</h3>
          <p className={styles.description}>
            {t('services.coloring.description')}
          </p>
          <p className={styles.features}>
            <strong>{t('services.features')}</strong>{' '}
            {t('services.coloring.features')}
          </p>
          <p className={styles.price}>{t('services.coloring.price')}</p>
        </div>

        <div className={styles.category}>
          <h3 className={styles.subheading}>{t('services.styling.title')}</h3>
          <p className={styles.description}>
            {t('services.styling.description')}
          </p>
          <p className={styles.features}>
            <strong>{t('services.features')}</strong>{' '}
            {t('services.styling.features')}
          </p>
          <p className={styles.price}>{t('services.styling.price')}</p>
        </div>

        <div className={styles.category}>
          <h3 className={styles.subheading}>{t('services.hairCare.title')}</h3>
          <p className={styles.description}>
            {t('services.hairCare.description')}
          </p>
          <p className={styles.features}>
            <strong>{t('services.features')}</strong>{' '}
            {t('services.hairCare.features')}
          </p>
          <p className={styles.price}>{t('services.hairCare.price')}</p>
        </div>

        <div className={styles.specialOffers}>
          <h3 className={styles.subheading}>
            {t('services.specialOffers.title')}
          </h3>
          <p>
            <strong>{t('services.promotions')}</strong>{' '}
            {t('services.specialOffers.description')}
          </p>
        </div>

        <div className={styles.booking}>
          <h3 className={styles.subheading}>{t('services.booking.title')}</h3>
          <a href="#book" className={styles.bookButton}>
            {t('services.booking.button')}
          </a>
        </div>
      </div>
    </section>
  )
}

export default ServicesPage
