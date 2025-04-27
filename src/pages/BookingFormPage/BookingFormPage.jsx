import React from 'react'
import styles from './BookingFormPage.module.css'
import { useTranslation } from 'react-i18next'

function BookingFormPage() {
  const { t } = useTranslation()
  const services = [
    { key: 'haircuts', link: 'https://calendly.com/kuzmavasil-v/30min' },
    { key: 'maleHaircuts', link: 'https://calendly.com/kuzmavasil-v/30min' },
    { key: 'keratin', link: 'https://calendly.com/kuzmavasil-v/new-meeting' },
    {
      key: 'hotBotox',
      link: 'https://calendly.com/kuzmavasil-v/new-meeting-1',
    },
    {
      key: 'coldRestoration',
      link: 'https://calendly.com/kuzmavasil-v/new-meeting-1',
    },
    {
      key: 'coldBotox',
      link: 'https://calendly.com/kuzmavasil-v/new-meeting-1',
    },
    { key: 'polishing', link: 'https://calendly.com/kuzmavasil-v/30min' },
  ]
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('bookingForm.title')}</h2>
      <div className={styles.buttonContainer}>
        {services.map((service) => (
          <button
            key={service.key}
            className={styles.button}
            onClick={() => (window.location.href = service.link)}
          >
            {t(`bookingForm.${service.key}`)}
          </button>
        ))}
      </div>
    </div>
  )
}

export default BookingFormPage
