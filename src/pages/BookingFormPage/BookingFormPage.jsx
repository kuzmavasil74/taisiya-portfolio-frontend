import React, { useState, useEffect } from 'react'
import styles from './BookingFormPage.module.css'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import bookingFormSchema from '../../validation/bookingFormSchema/bookingFormSchema.jsx'

function BookingFormPage({ userId }) {
  const { t } = useTranslation()

  // Послуги з тривалістю
  const services = [
    { title: 'haircuts', label: 'Women Haircut', duration: 60 },
    { title: 'menHaircuts', label: 'Men Haircut', duration: 30 },
    { title: 'keratin', label: 'Keratin Straightening', duration: 90 },
    { title: 'hotBotox', label: 'Hot Hair Botox', duration: 60 },
    { title: 'coldRestoration', label: 'Cold Restoration', duration: 90 },
    { title: 'coldBotox', label: 'Cold Botox', duration: 60 },
    { title: 'polishing', label: 'Hair Polishing', duration: 30 },
  ]

  // State
  const [selectedService, setSelectedService] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [availableSlots, setAvailableSlots] = useState([])
  const [selectedTime, setSelectedTime] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [telegram, setTelegram] = useState('')
  const [submitMessage, setSubmitMessage] = useState('')
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [errors, setErrors] = useState({})

  // Завантаження доступних слотів
  useEffect(() => {
    if (selectedService && selectedDate) {
      setLoadingSlots(true)
      axios
        .get('http://localhost:2000/bookings/available-slots', {
          params: { service: selectedService.title, date: selectedDate },
        })
        .then((res) => setAvailableSlots(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoadingSlots(false))
    } else {
      setAvailableSlots([])
    }
  }, [selectedService, selectedDate])

  // Функція валідації окремого поля
  const validateField = async (field, value) => {
    const formValues = {
      name,
      phone,
      telegram,
      service: selectedService?.title,
      date: selectedDate,
    }

    try {
      await bookingFormSchema.validateAt(field, {
        ...formValues,
        [field]: value,
      })
      setErrors((prev) => ({ ...prev, [field]: '' }))
    } catch (err) {
      setErrors((prev) => ({ ...prev, [field]: err.message }))
    }
  }

  // Відправка форми
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedService || !selectedDate || !selectedTime) {
      setSubmitMessage('Please select service, date, and time.')
      return
    }

    const formValues = {
      name,
      phone,
      telegram,
      service: selectedService?.title,
      date: selectedDate,
    }

    // 1️⃣ Валідація фронта
    try {
      await bookingFormSchema.validate(formValues, { abortEarly: false })
      setErrors({})
    } catch (err) {
      const newErrors = {}
      err.inner.forEach((e) => {
        newErrors[e.path] = e.message
      })
      setErrors(newErrors)
      return // не відправляємо axios
    }

    // 2️⃣ Відправка на бекенд
    try {
      await axios.post('http://localhost:2000/bookings', {
        service: selectedService.title,
        date: `${selectedDate}T${selectedTime}:00`,
        duration: selectedService.duration,
        name,
        phone,
        telegram,
      })
      setSubmitMessage('Booking confirmed!')
      // Очистка форми
      setSelectedService(null)
      setSelectedDate('')
      setSelectedTime('')
      setName('')
      setPhone('')
      setTelegram('')
      setAvailableSlots([])
    } catch (error) {
      console.error(error)
      setSubmitMessage(
        error.response?.data?.message || 'Booking failed. Please try again.'
      )
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('bookingForm.title')}</h2>

      {/* Вибір послуги */}
      <div className={styles.section}>
        <h3>Select Service</h3>
        <div className={styles.buttonContainer}>
          {services.map((service) => (
            <button
              key={service.title}
              className={`${styles.button} ${
                selectedService?.title === service.title ? styles.selected : ''
              }`}
              onClick={() => setSelectedService(service)}
            >
              {service.label} ({service.duration} min)
            </button>
          ))}
        </div>
      </div>

      {/* Вибір дати */}
      {selectedService && (
        <div className={styles.section}>
          <h3>Select Date</h3>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            onBlur={(e) => validateField('date', e.target.value)}
          />
          {errors.date && <p className={styles.error}>{errors.date}</p>}
        </div>
      )}

      {/* Вибір часу */}
      {selectedDate && (
        <div className={styles.section}>
          <h3>Select Time</h3>
          {loadingSlots ? (
            <p>Loading available slots...</p>
          ) : availableSlots.length > 0 ? (
            <div className={styles.buttonContainer}>
              {availableSlots.map((slot) => (
                <button
                  key={slot}
                  className={`${styles.button} ${
                    selectedTime === slot ? styles.selected : ''
                  }`}
                  onClick={() => setSelectedTime(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          ) : (
            <p>No available slots for this date.</p>
          )}
        </div>
      )}

      {/* Форма контактів */}
      {selectedTime && (
        <form className={styles.section} onSubmit={handleSubmit}>
          <h3>Contact Information</h3>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            onBlur={(e) => validateField('name', e.target.value)}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}

          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            onBlur={(e) => validateField('phone', e.target.value)}
          />
          {errors.phone && <p className={styles.error}>{errors.phone}</p>}

          <input
            type="text"
            placeholder="Telegram (optional)"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            onBlur={(e) => validateField('telegram', e.target.value)}
          />
          {errors.telegram && <p className={styles.error}>{errors.telegram}</p>}

          <button
            type="submit"
            disabled={
              !name || !phone || Object.values(errors).some((err) => err)
            }
          >
            Book Appointment
          </button>
        </form>
      )}

      {submitMessage && <p className={styles.submitMessage}>{submitMessage}</p>}
    </div>
  )
}

export default BookingFormPage
