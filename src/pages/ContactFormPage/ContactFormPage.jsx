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
          {t('contactForm.schedule.utery')}
        </p>
        <p className={styles['schedule-text']}>
          {t('contactForm.schedule.ctvrtek')}
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
        <p className={styles['map-adress']}>
          {t('contactForm.schedule.adress')}
        </p>
        <iframe
          className={styles['map-iframe']}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2273.943148448992!2d14.393318776158454!3d50.07342857152258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b9455616e0c21%3A0x88662a71de907c77!2sKmochova%208%2C%20150%2000%20Praha%205-Sm%C3%ADchov!5e1!3m2!1suk!2scz!4v1771588623865!5m2!1suk!2scz"
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
