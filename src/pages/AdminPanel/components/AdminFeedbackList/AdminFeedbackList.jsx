import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../AdminBookingList/AdminBookingList.module.css'
import API_URL from '../../../../utills/config.js'
import ConfirmModal from '../../../../components/ConfirmModal/ConfirmModal.jsx'

const AdminFeedbackList = () => {
  const { t } = useTranslation()

  const [feedback, setFeedback] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [feedbackToDelete, setFeedbackToDelete] = useState(null)

  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(`${API_URL}/feedback`)
        if (!res.ok) throw new Error(t('feedback.error'))

        const data = await res.json()
        setFeedback(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchFeedback()
  }, [t])

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/feedback/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) throw new Error(t('adminFeedback.deleteError'))

      setFeedback((prev) => prev.filter((f) => f._id !== id))
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className={styles.container}>
      {loading ? (
        <p>{t('bookings.loading')}</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : feedback.length === 0 ? (
        <p>{t('feedback.empty')}</p>
      ) : (
        <ul className={styles.list}>
          {feedback.map((f) => (
            <li key={f._id} className={styles.card}>
              <p className={styles.cardText}>
                <strong>{f.name}</strong>
              </p>
              <p className={styles.cardText}>{'★'.repeat(f.rating)}{'☆'.repeat(5 - f.rating)}</p>
              <p className={styles.cardText}>{f.text}</p>
              <p className={styles.cardText}>
                {new Date(f.createdAt).toLocaleString()}
              </p>

              <button
                className={styles.deleteBtn}
                onClick={() => setFeedbackToDelete(f)}
              >
                {t('adminFeedback.delete')}
              </button>
            </li>
          ))}
        </ul>
      )}

      {feedbackToDelete && (
        <ConfirmModal
          message={t('adminFeedback.confirmDelete', {
            name: feedbackToDelete.name,
          })}
          confirmLabel={t('bookings.confirm')}
          cancelLabel={t('bookings.cancel')}
          onConfirm={() => {
            handleDelete(feedbackToDelete._id)
            setFeedbackToDelete(null)
          }}
          onCancel={() => setFeedbackToDelete(null)}
        />
      )}
    </div>
  )
}

export default AdminFeedbackList
