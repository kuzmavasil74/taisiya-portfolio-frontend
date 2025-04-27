import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import styles from './FeedbackList.module.css'

const FeedbackList = () => {
  const { t } = useTranslation()
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('https://your-backend-api.com/feedbacks')
      setLoading(false)
    } catch (err) {
      setError('Не вдалося завантажити відгуки')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  if (loading) {
    return <p>{t('loading')}</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('feedback.title')}</h1>
      <p className={styles.text}>{t('feedback.text')}</p>

      <div className={styles.feedbackList}>
        {feedbacks.map((feedback, index) => (
          <div className={styles.feedbackCard} key={index}>
            <h3 className={styles.feedbackName}>{feedback.name}</h3>
            <div className={styles.stars}>
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={
                    i < feedback.rating ? styles.filledStar : styles.emptyStar
                  }
                >
                  ★
                </span>
              ))}
            </div>
            <p className={styles.feedbackText}>{feedback.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeedbackList
