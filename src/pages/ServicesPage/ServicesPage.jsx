import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ServicesPage.module.css'
import useServices from '../../utills/useServices.js'

function ServicesPage() {
  const { t } = useTranslation()
  const { services } = useServices()

  return (
    <section className={styles.services}>
      <div className={styles.serviceCategory}>
        <h2 className={styles.heading}>{t('services.heading')}</h2>

        {services.map((service) => (
          <div className={styles.category} key={service.key}>
            <h3 className={styles.subheading}>
              {t(`bookingForm.${service.key}`)}
              {service.isPackage && (
                <span className={styles.packageBadge}>
                  {t('bookingForm.packageBadge')}
                </span>
              )}
            </h3>
            <p className={styles.features}>
              <strong>{t('services.duration')}</strong>{' '}
              {t('bookingForm.durationMinutes', { count: service.duration })}
            </p>
            <p className={styles.features}>
              <strong>{t('services.price')}</strong> {service.price} CZK
            </p>
          </div>
        ))}
        <div className={styles.booking}>
          <h3 className={styles.subheading}>{t('services.booking.title')}</h3>
          <a href="/booking" className={styles.bookButton}>
            {t('services.booking.button')}
          </a>
        </div>
      </div>
    </section>
  )
}

export default ServicesPage
