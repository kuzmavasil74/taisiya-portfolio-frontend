import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ContactFormPage.module.css'

const ContactFormPage = () => {
  const { t } = useTranslation()

  return (
    <div>
      <div className={styles.schedule}>
        <h3 className={styles['schedule-title']}>
          {t('contactForm.openingHours')}
        </h3>
        <p className={styles['schedule-text']}>
          {t('contactForm.schedule.mondayToFriday')}
        </p>
        <p className={styles['schedule-text']}>
          {t('contactForm.schedule.saturday')}
        </p>
        <p className={styles['schedule-text']}>
          {t('contactForm.schedule.sunday')}
        </p>
      </div>
      <div className={styles.map}>
        <h3 className={styles['map-title']}>{t('contactForm.findUs')}</h3>
        <iframe
          className={styles['map-iframe']}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2515.200395678013!2d14.342980476478619!3d50.05067217151871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b95e8d3b5eb2f%3A0x4f4cec4ee3b40e7f!2sV%20H%C5%AFrk%C3%A1ch%202583%2F6%2C%20158%2000%20Praha%205!5e1!3m2!1suk!2scz!4v1726651814034!5m2!1suk!2scz"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  )
}

export default ContactFormPage
