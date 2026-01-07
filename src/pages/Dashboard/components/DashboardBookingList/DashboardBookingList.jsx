import React, { useState, useEffect } from 'react'
import styles from './DashboardBookingList.module.css'
import { useTranslation } from 'react-i18next'

const DashboardBookingList = () => {
  const { t } = useTranslation()

  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const token = localStorage.getItem('token')

  // 🔹 FETCH BOOKINGS
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!token) throw new Error('No token')

        const res = await fetch('http://localhost:2000/bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.message || 'Failed to fetch bookings')
        }

        const data = await res.json()
        setBookings(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [token])

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('dashboard.bookingsTitle')}</h2>

      {loading ? (
        <ul className={styles.list}>
          {[1, 2, 3, 4].map((i) => (
            <li key={i} className={styles.skeletonCard}>
              <div className={styles.skeletonTitle}></div>
              <div className={styles.skeletonText}></div>
              <div className={styles.skeletonText}></div>
              <div className={styles.skeletonButton}></div>
            </li>
          ))}
        </ul>
      ) : bookings.length === 0 ? (
        <p>{t('dashboard.noBookings')}</p>
      ) : (
        <ul className={styles.list}>
          {bookings.map((b) => (
            <li key={b._id} className={styles.card}>
              <p>
                <strong>{b.name}</strong>
              </p>
              <p>{new Date(b.date).toLocaleString()}</p>
              <p>{b.service}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DashboardBookingList
