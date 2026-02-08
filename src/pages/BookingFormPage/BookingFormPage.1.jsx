import React, { useState, useEffect } from 'react'
import styles from './BookingFormPage.module.css'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import bookingFormSchema from '../../validation/bookingFormSchema/bookingFormSchema.jsx'
import DatePicker from 'react-datepicker'
import API_URL from '../../utills/config.js'
import TelegramReminderButton from '../TelegramReminderButton/TelegramReminderButton.jsx'
import { SLOT_INTERVAL } from './BookingFormPage.jsx'

export function BookingFormPage() {
  const { t } = useTranslation()

  const services = [
    { title: 'haircuts', duration: 60 },
    { title: 'menHaircuts', duration: 30 },
    { title: 'keratin', duration: 90 },
    { title: 'hotBotox', duration: 60 },
    { title: 'coldRestoration', duration: 90 },
    { title: 'coldBotox', duration: 60 },
    { title: 'polishing', duration: 30 },
  ]

  const [selectedService, setSelectedService] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [availableSlots, setAvailableSlots] = useState([])
  const [selectedSlots, setSelectedSlots] = useState([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitMessage, setSubmitMessage] = useState('')
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [errors, setErrors] = useState({})
  const [bookingId, setBookingId] = useState(null)

  // Завантаження слотів
  useEffect(() => {
    if (selectedDate) {
      setLoadingSlots(true)
      const dateStr = selectedDate.toISOString().split('T')[0] // форматуємо в YYYY-MM-DD
      axios
        .get(`${API_URL}/bookings/available-slots`, {
          params: { date: dateStr },
        })
        .then((res) => setAvailableSlots(res.data))
        .catch((err) => alert(err.message))
        .finally(() => setLoadingSlots(false))
    } else setAvailableSlots([])
  }, [selectedDate])

  // Тоггл вибору слота
  const toggleSlot = (time) => {
    if (selectedSlots.includes(time)) {
      setSelectedSlots(selectedSlots.filter((t) => t !== time))
    } else {
      setSelectedSlots([...selectedSlots, time])
    }
  }

  // Функція для блокування минулих днів та вихідних
  const isDateSelectable = (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0) // обнуляємо час

    const d = new Date(date)
    d.setHours(0, 0, 0, 0)

    const day = d.getDay()
    if (d < today) return false // минулі дні
    if (day === 0 || day === 6) return false // неділя або субота
    return true
  }

  // Функція для групування суміжних слотів
  const getSelectedBlocks = (slots) => {
    if (!slots.length) return []

    const sorted = [...slots].sort()
    const blocks = []
    let block = [sorted[0]]

    for (let i = 1; i < sorted.length; i++) {
      const [prevHour, prevMin] = block[block.length - 1].split(':').map(Number)
      const [currHour, currMin] = sorted[i].split(':').map(Number)

      const prevTime = prevHour * 60 + prevMin
      const currTime = currHour * 60 + currMin

      if (currTime - prevTime === SLOT_INTERVAL) {
        block.push(sorted[i])
      } else {
        blocks.push([...block])
        block = [sorted[i]]
      }
    }

    blocks.push(block)
    return blocks
  }

  const selectedBlocks = getSelectedBlocks(selectedSlots)

  // Валідація поля
  const validateField = async (field, value) => {
    const formValues = {
      name,
      phone,
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

    if (!selectedService || !selectedDate || selectedSlots.length === 0) {
      setSubmitMessage('Please select service, date, and slots.')
      return
    }

    const formValues = {
      name,
      phone,
      service: selectedService.title,
      date: selectedDate,
    }

    // Фронт-валидація
    try {
      await bookingFormSchema.validate(formValues, { abortEarly: false })
      setErrors({})
    } catch (err) {
      const newErrors = {}
      err.inner.forEach((e) => {
        newErrors[e.path] = e.message
      })
      setErrors(newErrors)
      return
    }

    // Обчислюємо початок та тривалість одного блоку
    const sortedSlots = selectedSlots.sort()
    const firstSlot = sortedSlots[0]
    const duration = sortedSlots.length * SLOT_INTERVAL
    const bookingDate = `${
      selectedDate.toISOString().split('T')[0]
    }T${firstSlot}:00`

    try {
      const response = await axios.post(`${API_URL}/bookings`, {
        service: selectedService.title,
        date: bookingDate,
        duration,
        name,
        phone,
      })

      // Зберігаємо bookingId
      setBookingId(response.data._id) // переконайся, що бекенд повертає bookingId
      setSubmitMessage('Booking confirmed!')

      // Очистка форми
      setSelectedService(null)
      setSelectedDate(null)
      setSelectedSlots([])
      setName('')
      setPhone('')
      setAvailableSlots([])
    } catch (error) {
      alert(error.message)
      setSubmitMessage(error.response?.data?.message || 'Booking failed.')
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
              {t(`bookingTable.${service.title}`)} ({service.duration} min)
            </button>
          ))}
        </div>
      </div>

      {/* Вибір дати */}
      <div className={styles.section}>
        <h3>Select Date</h3>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          filterDate={isDateSelectable}
          placeholderText="Select a date"
          dateFormat="yyyy-MM-dd"
        />
      </div>

      {/* Вибір слотів */}
      {selectedDate && (
        <div className={styles.section}>
          <h3>Select Slots</h3>
          {loadingSlots ? (
            <p>Loading...</p>
          ) : (
            <div className={styles.buttonContainer}>
              {availableSlots.map((slot) => {
                const isInBlock = selectedBlocks.some((block) =>
                  block.includes(slot.time)
                )
                return (
                  <button
                    key={slot.time}
                    disabled={!slot.available}
                    className={`${slot.available ? styles.free : styles.busy} ${
                      isInBlock ? styles.selectedBlock : ''
                    }`}
                    onClick={() => toggleSlot(slot.time)}
                  >
                    {slot.time}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Форма контакту */}
      {selectedSlots.length > 0 && (
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

      {bookingId && <TelegramReminderButton bookingId={bookingId} />}
    </div>
  )
}
