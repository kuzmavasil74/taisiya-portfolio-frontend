import React, { useState, useEffect } from 'react'
import styles from './BookingFormPage.module.css'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import API_URL from '../../utills/config.js'
import useServices from '../../utills/useServices.js'
import TelegramReminderButton from '../TelegramReminderButton/TelegramReminderButton.jsx'

const SLOT_INTERVAL = 30
const REPEAT_WEEK_OPTIONS = [1, 2, 4]
const REPEAT_COUNT_OPTIONS = [2, 3, 4, 6, 8]

const generateGroupId = () =>
  (window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`).toString()

function BookingFormPage() {
  const { t } = useTranslation()
  const { services: serviceList } = useServices()
  const services = serviceList.map((s) => ({
    title: s.key,
    duration: s.duration,
    isPackage: s.isPackage,
  }))

  const [selectedService, setSelectedService] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [availableSlots, setAvailableSlots] = useState([])
  const [selectedSlots, setSelectedSlots] = useState([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitMessage, setSubmitMessage] = useState('')
  const [slotError, setSlotError] = useState('')
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [bookingId, setBookingId] = useState(null)
  const [repeatEnabled, setRepeatEnabled] = useState(false)
  const [repeatWeeks, setRepeatWeeks] = useState(REPEAT_WEEK_OPTIONS[0])
  const [repeatCount, setRepeatCount] = useState(REPEAT_COUNT_OPTIONS[0])
  const [submitting, setSubmitting] = useState(false)
  const [waitlistJoined, setWaitlistJoined] = useState(false)
  const [waitlistSubmitting, setWaitlistSubmitting] = useState(false)

  /* === Reset slot selection when the service changes === */
  useEffect(() => {
    setSelectedSlots([])
    setSlotError('')
  }, [selectedService])

  /* === Load slots === */
  useEffect(() => {
    setWaitlistJoined(false)
    if (!selectedDate) {
      setAvailableSlots([])
      setSelectedSlots([])
      return
    }

    const year = selectedDate.getFullYear()
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
    const day = String(selectedDate.getDate()).padStart(2, '0')

    const dateStr = `${year}-${month}-${day}`
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

  // === Datepicker ===
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
  const getDayClassName = (date) => {
    const day = date.getDay()
    if (day === 0 || day === 2 || day === 4 || day === 6) {
      return styles.disabledDay
    }
    return ''
  } // End

  /* === Availability check (for the "join waitlist" fallback) === */
  const requiredSlots = selectedService
    ? selectedService.duration / SLOT_INTERVAL
    : 0

  const getUsableSlotTimes = () => {
    const MINUTES_AHEAD = 5
    const now = new Date()
    const minAvailableTime = new Date(now.getTime() + MINUTES_AHEAD * 60000)

    return availableSlots
      .filter((slot) => {
        if (!slot.available) return false
        const [hour, minute] = slot.time.split(':').map(Number)
        const slotDate = new Date(selectedDate)
        slotDate.setHours(hour, minute, 0, 0)
        return slotDate.getTime() >= minAvailableTime.getTime()
      })
      .map((slot) => slot.time)
  }

  const hasContiguousBlock = (times, count) => {
    if (!count) return false
    const sorted = [...times].sort()
    let run = 0
    let prev = null
    for (const time of sorted) {
      if (prev === null) {
        run = 1
      } else {
        const [ph, pm] = prev.split(':').map(Number)
        const [ch, cm] = time.split(':').map(Number)
        run = ch * 60 + cm - (ph * 60 + pm) === SLOT_INTERVAL ? run + 1 : 1
      }
      if (run >= count) return true
      prev = time
    }
    return false
  }

  const noAvailability =
    selectedService &&
    selectedDate &&
    !loadingSlots &&
    availableSlots.length > 0 &&
    !hasContiguousBlock(getUsableSlotTimes(), requiredSlots)

  /* === Join waitlist === */
  const handleJoinWaitlist = async () => {
    if (!name || !phone) return
    setWaitlistSubmitting(true)
    try {
      await axios.post(`${API_URL}/bookings/waitlist`, {
        service: selectedService.title,
        date: selectedDate.toISOString(),
        name,
        phone,
      })
      setWaitlistJoined(true)
    } catch (err) {
      alert(err.message)
    } finally {
      setWaitlistSubmitting(false)
    }
  }

  /* === Submit === */
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedService || !selectedDate || !selectedSlots.length) return

    if (
      selectedBlocks.length !== 1 ||
      selectedBlocks[0].length !== requiredSlots
    ) {
      setSlotError(
        t('bookingForm.selectContiguousSlots', { count: requiredSlots })
      )
      return
    }
    setSlotError('')

    const sortedSlots = [...selectedSlots].sort()
    const [hour, minute] = sortedSlots[0].split(':').map(Number)
    const firstBookingDate = new Date(selectedDate)
    firstBookingDate.setHours(hour, minute, 0, 0)

    const occurrenceDates = [firstBookingDate]
    if (repeatEnabled) {
      for (let i = 1; i < repeatCount; i++) {
        const next = new Date(firstBookingDate)
        next.setDate(next.getDate() + i * repeatWeeks * 7)
        occurrenceDates.push(next)
      }
    }

    const recurringGroupId =
      repeatEnabled && occurrenceDates.length > 1 ? generateGroupId() : null

    setSubmitting(true)
    let successCount = 0
    let firstBookingId = null

    for (const occurrenceDate of occurrenceDates) {
      try {
        const res = await axios.post(`${API_URL}/bookings`, {
          service: selectedService.title,
          date: occurrenceDate.toISOString(),
          duration: selectedSlots.length * SLOT_INTERVAL,
          name,
          phone,
          recurringGroupId,
        })
        successCount++
        if (!firstBookingId) firstBookingId = res.data._id
      } catch (err) {
        // продовжуємо намагатись забронювати решту дат серії
      }
    }
    setSubmitting(false)

    if (successCount === 0) {
      alert(t('bookingForm.allFailed'))
      return
    }

    setBookingId(firstBookingId)
    const seriesMessage = t('bookingForm.confirmedSeries', {
      success: successCount,
      total: occurrenceDates.length,
    })
    const message =
      occurrenceDates.length > 1 ? seriesMessage : t('bookingForm.confirmed')
    setSubmitMessage(message)
    setSelectedService(null)
    setSelectedDate(null)
    setSelectedSlots([])
    setAvailableSlots([])
    setName('')
    setPhone('')
    setRepeatEnabled(false)
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('bookingForm.title')}</h2>

      {/* === Services === */}
      <div className={styles.section}>
        <h3>{t('bookingForm.selectService')}</h3>
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
              {t(`bookingForm.${service.title}`)} ({service.duration} min)
              {service.isPackage && (
                <span className={styles.packageBadge}>
                  {t('bookingForm.packageBadge')}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* === Date === */}
      <div className={styles.section}>
        <h3>{t('bookingForm.selectDate')}</h3>
        <DatePicker
          selected={selectedDate}
          onChange={setSelectedDate}
          dateFormat="yyyy-MM-dd"
          calendarStartDay={1}
          dayClassName={getDayClassName} // 🔒 блокування минулих та вихідних
          filterDate={isDateSelectable} // 🔒 блокування минулих та вихідних
          popperPlacement="bottom-end"
          placeholderText={t('bookingForm.selectDatePlaceholder')}
        />
      </div>

      {/* === Slots === */}
      {selectedDate && (
        <div className={styles.section}>
          <h3>
            {t('bookingForm.selectTime', {
              count: selectedService
                ? selectedService.duration / SLOT_INTERVAL
                : 0,
            })}
          </h3>

          {loadingSlots ? (
            <div className={styles.loadingBox}>
              <div className={styles.spinner}></div>
              <p className={styles.loadingText}>{t('bookingForm.loading')}</p>
            </div>
          ) : noAvailability ? (
            <div className={styles.waitlistBox}>
              <p>{t('bookingForm.noAvailability')}</p>
              {waitlistJoined ? (
                <p className={styles.submitMessage}>
                  {t('bookingForm.waitlistJoined')}
                </p>
              ) : (
                <>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('bookingForm.name')}
                  />
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t('bookingForm.phone')}
                  />
                  <button
                    type="button"
                    disabled={!name || !phone || waitlistSubmitting}
                    onClick={handleJoinWaitlist}
                  >
                    {waitlistSubmitting
                      ? t('bookingForm.loading')
                      : t('bookingForm.joinWaitlist')}
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className={styles.buttonContainer}>
              {availableSlots.map((slot) => {
                const [hour, minute] = slot.time.split(':').map(Number)
                const slotDate = new Date(selectedDate)
                slotDate.setHours(hour, minute, 0, 0)

                const isBusy = !slot.available

                const MINUTES_AHEAD = 5
                const now = new Date()
                const minAvailableTime = new Date(
                  now.getTime() + MINUTES_AHEAD * 60000
                )
                const isPassed = slotDate.getTime() < minAvailableTime.getTime()

                const isDisabled = isBusy || isPassed
                const isSelected = selectedSlots.includes(slot.time)
                const isInBlock = selectedBlocks.some((b) =>
                  b.includes(slot.time)
                )

                return (
                  <button
                    key={slot.time}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => toggleSlot(slot.time, isDisabled)}
                    className={[
                      styles.button,
                      isDisabled && styles.busy,
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
          <h3>{t('bookingForm.contact')}</h3>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('bookingForm.name')}
            required
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t('bookingForm.phone')}
            required
          />

          <label className={styles.repeatLabel}>
            <input
              type="checkbox"
              checked={repeatEnabled}
              onChange={(e) => setRepeatEnabled(e.target.checked)}
            />
            {t('bookingForm.repeat')}
          </label>

          {repeatEnabled && (
            <div className={styles.repeatOptions}>
              <select
                value={repeatWeeks}
                onChange={(e) => setRepeatWeeks(Number(e.target.value))}
              >
                {REPEAT_WEEK_OPTIONS.map((w) => (
                  <option key={w} value={w}>
                    {t('bookingForm.everyNWeeks', { count: w })}
                  </option>
                ))}
              </select>
              <select
                value={repeatCount}
                onChange={(e) => setRepeatCount(Number(e.target.value))}
              >
                {REPEAT_COUNT_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {t('bookingForm.nTimes', { count: c })}
                  </option>
                ))}
              </select>
            </div>
          )}

          {slotError && <p className={styles.submitMessage}>{slotError}</p>}

          <button type="submit" disabled={submitting}>
            {submitting ? t('bookingForm.loading') : t('bookingForm.book')}
          </button>
        </form>
      )}

      {submitMessage && <p className={styles.submitMessage}>{submitMessage}</p>}
      {bookingId && <TelegramReminderButton bookingId={bookingId} />}
    </div>
  )
}

export default BookingFormPage
