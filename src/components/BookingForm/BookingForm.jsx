import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useTranslation } from 'react-i18next'
import { validationBookingSchema } from '../../utills/validationBookingSchema'
import styles from './BookingForm.module.css'

function BookingForm() {
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        phone: '',
        dateTime: '',
        coments: '',
      }}
      validationSchema={validationBookingSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log('Form values:', values)
        // Тут можеш додати логіку для надсилання даних форми, наприклад, запит до API
        setSubmitting(false)
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.bookingForm}>
          <label htmlFor="name">{t('bookingForm.name')}</label>
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="div" className={styles.error} />

          <label htmlFor="email">{t('bookingForm.email')}</label>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" className={styles.error} />

          <label htmlFor="phone">{t('bookingForm.phone')}</label>
          <Field type="text" name="phone" />
          <ErrorMessage name="phone" component="div" className={styles.error} />

          <label htmlFor="dateTime">{t('bookingForm.dateTime')}</label>
          <Field type="datetime-local" name="dateTime" />
          <ErrorMessage
            name="dateTime"
            component="div"
            className={styles.error}
          />

          <label htmlFor="coments">{t('bookingForm.coments')}</label>
          <Field as="textarea" name="coments" />
          <ErrorMessage
            name="coments"
            component="div"
            className={styles.error}
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? t('bookingForm.submitting')
              : t('bookingForm.submit')}
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default BookingForm
