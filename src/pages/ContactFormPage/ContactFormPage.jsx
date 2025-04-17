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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2514.287993138893!2d14.434902800000001!3d50.0680788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b950a10d99569%3A0xeaae86165e23bfc!2sMOTIF%20BEAUTY%20STUDIO!5e1!3m2!1suk!2sua!4v1744863617182!5m2!1suk!2sua"
          width="800"
          height="600"
          style={{ border: 0 }}
          allowfullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  )
}

export default ContactFormPage
