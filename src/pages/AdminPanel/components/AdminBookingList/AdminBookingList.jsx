import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './AdminBookingList.module.css'
import API_URL from '../../../../utills/config.js'
import ConfirmModal from '../../../../components/ConfirmModal/ConfirmModal.jsx'

const AdminBookingList = () => {
  const { t } = useTranslation()

  const [tab, setTab] = useState('upcoming') // 'upcoming' | 'archive'
  const [bookings, setBookings] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [bookingToDelete, setBookingToDelete] = useState(null)

  const token = localStorage.getItem('token')
  const { userId } = useParams()

  // 🔹 RESET при зміні юзера
  useEffect(() => {
    setTab('upcoming')
    setPage(1)
  }, [userId])

  // 🔹 FETCH bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true)
        setError(null)

        const url = userId
          ? `${API_URL}/bookings?userId=${userId}&status=${tab}&page=${page}&limit=6`
          : `${API_URL}/bookings?status=${tab}&page=${page}&limit=6`

        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.message || t('bookings.fetchError'))
        }

        const data = await res.json()
        setBookings(data.data)
        setTotalPages(data.totalPages)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (token) fetchBookings()
  }, [tab, page, token, userId, t])

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/bookings/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) throw new Error(t('bookings.deleteError'))

      setBookings((prev) => prev.filter((b) => b._id !== id))
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className={styles.container}>
      {/* 🔹 Tabs */}
      <div className={styles.tabs}>
        <button
          className={tab === 'upcoming' ? styles.activeTab : ''}
          onClick={() => {
            setTab('upcoming')
            setPage(1)
          }}
        >
          {t('bookings.upcoming')}
        </button>
        <button
          className={tab === 'archive' ? styles.activeTab : ''}
          onClick={() => {
            setTab('archive')
            setPage(1)
          }}
        >
          {t('bookings.archive')}
        </button>
      </div>

      {/* 🔹 Content */}
      {loading ? (
        <p>{t('bookings.loading')}</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : bookings.length === 0 ? (
        <p>{t('bookings.empty')}</p>
      ) : (
        <ul className={styles.list}>
          {bookings.map((b) => (
            <li key={b._id} className={styles.card}>
              <p className={styles.cardText}>
                <strong>{b.name}</strong>
              </p>
              <p className={styles.cardText}>
                {new Date(b.date).toLocaleString()}
              </p>
              <p className={styles.cardText}>{b.service}</p>

              {tab === 'upcoming' && (
                <button
                  className={styles.deleteBtn}
                  onClick={() => setBookingToDelete(b)}
                >
                  {t('bookings.delete')}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* 🔹 Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
            {t('bookings.prev')}
          </button>
          <span>
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
          >
            {t('bookings.next')}
          </button>
        </div>
      )}

      {/* 🔹 Confirm Modal */}
      {bookingToDelete && (
        <ConfirmModal
          message={t('bookings.confirmDelete', { name: bookingToDelete.name })}
          confirmLabel={t('bookings.confirm')}
          cancelLabel={t('bookings.cancel')}
          onConfirm={() => {
            handleDelete(bookingToDelete._id)
            setBookingToDelete(null)
          }}
          onCancel={() => setBookingToDelete(null)}
        />
      )}
    </div>
  )
}

export default AdminBookingList
