import React, { useEffect, useState } from 'react'
import styles from './AdminPanel.module.css'
import { useTranslation } from 'react-i18next'

const AdminPanel = () => {
  const { t } = useTranslation()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!token) throw new Error('No token')
        const res = await fetch('http://localhost:2000/bookings/all', {
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
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }
    fetchBookings()
  }, [token])
  const today = new Date()
  const upcomingBookings = bookings
    .filter((b) => new Date(b.date) >= today)
    .sort((a, b) => {
      return new Date(a.date) - new Date(b.date)
    })
  console.log(upcomingBookings)
  const archive = bookings
    .filter((b) => new Date(b.date) < today)
    .sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:2000/bookings/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Failed to delete booking')
      }
      setBookings(bookings.filter((b) => b._id !== id))
    } catch (error) {
      alert(error.message)
    }
  }

  if (loading) {
    return (
      <ul className={styles.list}>
        {[1, 2, 3].map((i) => (
          <li key={i} className={styles.card + ' ' + styles.skeleton}>
            <p className={styles.skeletonText}></p>
            <p className={styles.skeletonText}></p>
            <p className={styles.skeletonText}></p>
          </li>
        ))}
      </ul>
    )
  }
  if (error)
    return (
      <p>
        {t('admin-panel.error')}: {error}
      </p>
    )

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('admin-panel.upcomingBookings')}</h2>
      {upcomingBookings.length === 0 ? (
        <p>{t('admin-panel.noBookings')}</p>
      ) : (
        <ul className={styles.list}>
          {upcomingBookings.map((b) => (
            <li key={b._id} className={styles.card}>
              <div className={styles.profileNamesRov}>
                <p className={styles.profileName}>
                  {t('admin-panel.profile-name')}:{b.userId.name}
                </p>
                <p className={styles.customerName}>
                  {t('admin-panel.customer-name')}:{b.name}
                </p>
              </div>
              <p>{new Date(b.date).toLocaleString()}</p>
              <p>{b.service}</p>
              <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(b._id)}
              >
                {t('admin-panel.delete')}
              </button>
            </li>
          ))}
        </ul>
      )}

      <h2 className={styles.title}>{t('admin-panel.archiveBookings')}</h2>
      {archive.length === 0 ? (
        <p>{t('admin-panel.noBookings')}</p>
      ) : (
        <ul className={styles.list}>
          {archive.map((b) => (
            <li key={b._id} className={styles.card + ' ' + styles.archiveCard}>
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

export default AdminPanel
