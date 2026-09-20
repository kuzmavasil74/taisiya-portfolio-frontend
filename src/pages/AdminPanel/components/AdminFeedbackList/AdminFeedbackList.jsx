import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../AdminBookingList/AdminBookingList.module.css'
import API_URL from '../../../../utills/config.js'

const AdminFeedbackList = () => {
  const { t } = useTranslation()

  const [feedback, setFeedback] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [showConfirm, setShowConfirm] = useState(false)
  const [feedbackToDelete, setFeedbackToDelete] = useState(null)
  const [fadeOut, setFadeOut] = useState(false)

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

  const closeModal = () => {
    setFadeOut(true)
    setTimeout(() => {
      setShowConfirm(false)
      setFeedbackToDelete(null)
      setFadeOut(false)
    }, 200)
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
                onClick={() => {
                  setFeedbackToDelete(f)
                  setShowConfirm(true)
                }}
              >
                {t('adminFeedback.delete')}
              </button>
            </li>
          ))}
        </ul>
      )}

      {showConfirm && feedbackToDelete && (
        <div
          className={`${styles.confirmModal} ${fadeOut ? styles.fadeOut : ''}`}
          onClick={closeModal}
        >
          <div
            className={styles.confirmContent}
            onClick={(e) => e.stopPropagation()}
          >
            <p className={styles.modalText}>
              {t('adminFeedback.confirmDelete', { name: feedbackToDelete.name })}
            </p>
            <div className={styles.confirmBtns}>
              <button
                className={styles.confirmBtn}
                onClick={() => {
                  handleDelete(feedbackToDelete._id)
                  closeModal()
                }}
              >
                {t('bookings.confirm')}
              </button>
              <button className={styles.cancelBtn} onClick={closeModal}>
                {t('bookings.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminFeedbackList
