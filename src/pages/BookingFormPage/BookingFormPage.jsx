import React, { useState, useEffect } from 'react'
import styles from './BookingFormPage.module.css'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import API_URL from '../../utills/config.js'
import TelegramReminderButton from '../TelegramReminderButton/TelegramReminderButton.jsx'

const SLOT_INTERVAL = 30

function BookingFormPage() {
  const { t } = useTranslation()

  const services = [
    { title: 'womenHaircuts', duration: 60 },
    { title: 'menHaircuts', duration: 30 },
    { title: 'rootColoring', duration: 90 },
    { title: 'fullColoring', duration: 120 },
    { title: 'toning', duration: 60 },
    { title: 'balayage', duration: 150 },
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
  const [bookingId, setBookingId] = useState(null)

  /* === Load slots === */
  useEffect(() => {
    if (!selectedDate) {
      setAvailableSlots([])
      setSelectedSlots([])
      return
    }

    const dateStr = selectedDate.toISOString().split('T')[0]
    setLoadingSlots(true)

    axios
      .get(`${API_URL}/bookings/available-slots`, {
        params: { date: dateStr },
      })
      .then((res) => {
        setAvailableSlots(res.data)
        setSelectedSlots([])
      })
      .catch((err) => alert(err.message))
      .finally(() => setLoadingSlots(false))
  }, [selectedDate])

  /* === Slot toggle === */
  const toggleSlot = (time, isBusy) => {
    if (isBusy) return

    setSelectedSlots((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    )
  }

  /* === Group contiguous slots === */
  const getSelectedBlocks = (slots) => {
    if (!slots.length) return []

    const sorted = [...slots].sort()
    const blocks = []
    let current = [sorted[0]]

    for (let i = 1; i < sorted.length; i++) {
      const [ph, pm] = current.at(-1).split(':').map(Number)
      const [ch, cm] = sorted[i].split(':').map(Number)

      if (ch * 60 + cm - (ph * 60 + pm) === SLOT_INTERVAL) {
        current.push(sorted[i])
      } else {
        blocks.push(current)
        current = [sorted[i]]
      }
    }

    blocks.push(current)
    return blocks
  }

  const selectedBlocks = getSelectedBlocks(selectedSlots)

  /* === Disable past and weekend dates === */
  const isDateSelectable = (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const d = new Date(date)
    d.setHours(0, 0, 0, 0)

    const day = d.getDay()
    if (d < today) return false
    if (day === 0 || day === 2 || day === 4 || day === 6) return false
    return true
  }

  /* === Submit === */
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedService || !selectedDate || !selectedSlots.length) return

    const sortedSlots = [...selectedSlots].sort()
    const bookingDate = `${selectedDate.toISOString().split('T')[0]}T${
      sortedSlots[0]
    }:00`

    try {
      const res = await axios.post(`${API_URL}/bookings`, {
        service: selectedService.title,
        date: bookingDate,
        duration: selectedSlots.length * SLOT_INTERVAL,
        name,
        phone,
      })

      setBookingId(res.data._id)
      setSubmitMessage('Booking confirmed!')
      setSelectedService(null)
      setSelectedDate(null)
      setSelectedSlots([])
      setAvailableSlots([])
      setName('')
      setPhone('')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('bookingForm.title')}</h2>

      {/* === Services === */}
      <div className={styles.section}>
        <h3>Select Service</h3>
        <div className={styles.buttonContainer}>
          {services.map((service) => (
            <button
              key={service.title}
              type="button"
              onClick={() => setSelectedService(service)}
              className={[
                styles.button,
                selectedService?.title === service.title && styles.selected,
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {t(`bookingTable.${service.title}`)} ({service.duration} min)
            </button>
          ))}
        </div>
      </div>

      {/* === Date === */}
      <div className={styles.section}>
        <h3>Select Date</h3>
        <DatePicker
          selected={selectedDate}
          onChange={setSelectedDate}
          dateFormat="yyyy-MM-dd"
          filterDate={isDateSelectable} // 🔒 блокування минулих та вихідних
          placeholderText="Select a date"
        />
      </div>

      {/* === Slots === */}
      {selectedDate && (
        <div className={styles.section}>
          <h3>Select Time</h3>

          {loadingSlots ? (
            <p>{t('bookingForm.loading')}</p>
          ) : (
            <div className={styles.buttonContainer}>
              {availableSlots.map((slot) => {
                const isBusy = !slot.available
                const isSelected = selectedSlots.includes(slot.time)
                const isInBlock = selectedBlocks.some((b) =>
                  b.includes(slot.time)
                )

                return (
                  <button
                    key={slot.time}
                    type="button"
                    disabled={isBusy}
                    onClick={() => toggleSlot(slot.time, isBusy)}
                    className={[
                      styles.button,
                      isBusy && styles.busy,
                      isSelected && styles.selectedSlot,
                      isInBlock && styles.selectedBlock,
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {slot.time}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* === Contact === */}
      {selectedSlots.length > 0 && (
        <form className={styles.section} onSubmit={handleSubmit}>
          <h3>Contact</h3>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            required
          />

          <button type="submit">Book</button>
        </form>
      )}

      {submitMessage && <p className={styles.submitMessage}>{submitMessage}</p>}
      {bookingId && <TelegramReminderButton bookingId={bookingId} />}
    </div>
  )
}

export default BookingFormPage
