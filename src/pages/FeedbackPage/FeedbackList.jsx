import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import FeedbackItem from './FeedbackItem'
import FeedbackForm from './FeedbackForm.jsx'
import API_URL from '../../utills/config.js'
import styles from './FeedbackList.module.css'

const FeedbackList = () => {
  const { t } = useTranslation()
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const isLoggedIn = Boolean(localStorage.getItem('token'))

  const fetchFeedbacks = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/feedback`)
      setFeedbacks(data)
    } catch (err) {
      setError(t('feedback.error'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('feedback.title')}</h1>

      {isLoggedIn && (
        <FeedbackForm onSubmitted={fetchFeedbacks} />
      )}

      {loading ? (
        <p className={styles.loading}>{t('loading')}</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : feedbacks.length === 0 ? (
        <p className={styles.loading}>{t('feedback.empty')}</p>
      ) : (
        <div className={styles.list}>
          {feedbacks.map((feedback) => (
            <FeedbackItem key={feedback._id} feedback={feedback} />
          ))}
        </div>
      )}
    </div>
  )
}

export default FeedbackList
