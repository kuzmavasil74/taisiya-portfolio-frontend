import React, { useState, useEffect } from 'react'
import styles from './DashboardBookingList.module.css'
import { useTranslation } from 'react-i18next'

const DashboardBookingList = () => {
  const { t } = useTranslation()
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bookings') || '[]')
    setBookings(stored)
  }, [])

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('dashboard.bookingsTitle')}</h2>
      {bookings.length === 0 ? (
        <p>{t('dashboard.noBookings')}</p>
      ) : (
        <ul className={styles.list}>
          {bookings.map((b, i) => (
            <li key={i}>
              {b.name} — {b.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DashboardBookingList
