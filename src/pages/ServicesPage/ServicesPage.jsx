import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ServicesPage.module.css'

function ServicesPage() {
  const { t } = useTranslation()

  const services = [
    { title: 'haircuts', description: 'description', features: 'features' },
    { title: 'menHaircuts', description: 'description', features: 'features' },
    { title: 'keratin', description: 'description', features: 'features' },
    { title: 'hotBotox', description: 'description', features: 'features' },
    {
      title: 'coldRestoration',
      description: 'description',
      features: 'features',
    },
    { title: 'coldBotox', description: 'description', features: 'features' },
    { title: 'polishing', description: 'description', features: 'features' },
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
