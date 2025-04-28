import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import FeedbackItem from './FeedbackItem'
import styles from './FeedbackList.module.css'

const FeedbackList = () => {
  const { t } = useTranslation()
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fakeFeedbacks = [
    {
      name: 'Анна',
      rating: 5,
      text: 'Дуже задоволена якістю обслуговування!',
    },
    {
      name: 'Олег',
      rating: 4,
      text: 'Гарна атмосфера і професіоналізм!',
    },
    {
      name: 'Марія',
      rating: 5,
      text: 'Відмінна стрижка, обов’язково прийду ще!',
    },
  ]
  // useEffect(() => {
  //   const fetchFeedbacks = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         'https://your-backend-api.com/feedbacks'
  //       )
  //       setFeedbacks(data)
  //     } catch (err) {
  //       setError(t('feedback.error'))
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchFeedbacks()
  // }, [t]) // if you have a backend
  useEffect(() => {
    setFeedbacks(fakeFeedbacks)
    setLoading(false)
  }, []) // if you haven't a backend

  if (loading) return <p className={styles.loading}>{t('loading')}</p>
  if (error) return <p className={styles.error}>{error}</p>

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('feedback.title')}</h1>
      <div className={styles.list}>
        {feedbacks.map((feedback, index) => (
          <FeedbackItem
            key={feedback._id || feedback.name}
            feedback={feedback}
          /> // if you haven't a backend
          // <FeedbackItem key={feedback._id} feedback={feedback} /> // if you have a backend
        ))}
      </div>
    </div>
  )
}

export default FeedbackList
