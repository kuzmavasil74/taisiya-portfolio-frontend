import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ServicesPage.module.css'

function ServicesPage() {
  const { t } = useTranslation()

  const services = [
    {
      title: 'womenHaircuts',
      description: 'description',
      features: 'features',
      duration: 'duration',
    },
    {
      title: 'menHaircuts',
      description: 'description',
      features: 'features',
      duration: 'duration',
    },
    {
      title: 'rootColoring',
      description: 'description',
      features: 'features',
      duration: 'duration',
    },
    {
      title: 'fullColoring',
      description: 'description',
      features: 'features',
      duration: 'duration',
    },
    {
      title: 'toning',
      description: 'description',
      features: 'features',
      duration: 'duration',
    },
    {
      title: 'balayage',
      description: 'description',
      features: 'features',
      duration: 'duration',
    },
    {
      title: 'polishing',
      description: 'description',
      features: 'features',
      duration: 'duration',
    },
  ]

  return (
    <section className={styles.services}>
      <div className={styles.serviceCategory}>
        <h2 className={styles.heading}>{t('services.heading')}</h2>

        {services.map((service) => (
          <div className={styles.category} key={service.title}>
            <h3 className={styles.subheading}>
              {t(`services.${service.title}.title`)}
            </h3>
            <p className={styles.description}>
              {t(`services.${service.title}.${service.description}`)}
            </p>
            <p className={styles.features}>
              <strong>{t('services.features')}</strong>{' '}
              {t(`services.${service.title}.${service.features}`)}
            </p>
            <p className={styles.features}>
              <strong>{t('services.duration')}</strong>{' '}
              {t(`services.${service.title}.${service.duration}`)}
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
