import React from 'react'
import BookingForm from '../../components/BookingForm/BookingForm'
import styles from './BookingFormPage.module.css'
import { useTranslation } from 'react-i18next'
function BookingFormPage() {
  const { t } = useTranslation()
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('bookingForm.title')}</h2>
      <BookingForm />
    </div>
  )
}

export default BookingFormPage
