import React, { useState, useEffect } from 'react'
import styles from './DashboardBookingList.module.css'
import { useTranslation } from 'react-i18next'
import apiFetch from '../../../../utills/api.js'
import ConfirmModal from '../../../../components/ConfirmModal/ConfirmModal.jsx'

const DashboardBookingList = () => {
  const { t } = useTranslation()
  const token = localStorage.getItem('token')

  const [tab, setTab] = useState('upcoming') // 'upcoming' | 'archive'
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [bookingToCancel, setBookingToCancel] = useState(null)
  const [canceling, setCanceling] = useState(false)

  // 🔹 FETCH BOOKINGS
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!token) throw new Error('No token')

        const res = await apiFetch('/bookings/all')

        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.message || t('bookings.fetchError'))
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
  }, [token, t])

  // 🔹 Фільтруємо бронювання
  const upcomingBookings = bookings.filter(
    (b) => new Date(b.date) >= new Date() && b.status !== 'canceled'
  )
  const archiveBookings = bookings.filter(
    (b) => new Date(b.date) < new Date() || b.status === 'canceled'
  )
  const displayedBookings =
    tab === 'upcoming' ? upcomingBookings : archiveBookings

  const handleCancel = async (id) => {
    setCanceling(true)
    try {
      const res = await apiFetch(`/bookings/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error(t('bookings.deleteError'))

      setBookings((prev) => prev.filter((b) => b._id !== id))
    } catch (err) {
      setError(err.message)
    } finally {
      setCanceling(false)
      setBookingToCancel(null)
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('dashboard.bookingsTitle')}</h2>

      {/* 🔹 Tabs */}
      <div className={styles.tabs}>
        <button
          className={tab === 'upcoming' ? styles.activeTab : ''}
          onClick={() => setTab('upcoming')}
        >
          {t('bookings.upcoming')}
        </button>
        <button
          className={tab === 'archive' ? styles.activeTab : ''}
          onClick={() => setTab('archive')}
        >
          {t('bookings.archive')}
        </button>
      </div>

      {/* 🔹 Content */}
      {loading ? (
        <p>{t('bookings.loading')}</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : displayedBookings.length === 0 ? (
        <p>{t('bookings.empty')}</p>
      ) : (
        <ul className={styles.list}>
          {displayedBookings.map((b) => (
            <li key={b._id} className={styles.card}>
              <p>
                <strong>{b.name}</strong>
              </p>
              <p>{new Date(b.date).toLocaleString()}</p>
              <p>{b.service}</p>
              {tab === 'upcoming' && (
                <button
                  className={styles.cancelBtn}
                  onClick={() => setBookingToCancel(b)}
                >
                  {t('bookings.cancelBooking')}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* 🔹 Confirm Modal */}
      {bookingToCancel && (
        <ConfirmModal
          message={t('bookings.confirmCancel', {
            service: bookingToCancel.service,
          })}
          confirmLabel={t('bookings.confirm')}
          cancelLabel={t('bookings.cancel')}
          confirmDisabled={canceling}
          onConfirm={() => handleCancel(bookingToCancel._id)}
          onCancel={() => !canceling && setBookingToCancel(null)}
        />
      )}
    </div>
  )
}

export default DashboardBookingList
