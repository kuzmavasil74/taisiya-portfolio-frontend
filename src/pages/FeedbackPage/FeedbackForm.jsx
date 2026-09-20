import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import apiFetch from '../../utills/api.js'
import styles from './FeedbackForm.module.css'

const FeedbackForm = ({ onSubmitted }) => {
  const { t } = useTranslation()
  const [rating, setRating] = useState(5)
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim()) return

    setSubmitting(true)
    setMessage('')
    try {
      const res = await apiFetch('/feedback', {
        method: 'POST',
        body: JSON.stringify({ rating, text: text.trim() }),
      })
      if (!res.ok) throw new Error()

      setText('')
      setRating(5)
      setMessage(t('feedback.thankYou'))
      onSubmitted?.()
    } catch {
      setMessage(t('feedback.submitError'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.heading}>{t('feedback.leaveTitle')}</h3>
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            type="button"
            key={value}
            className={value <= rating ? styles.starFilled : styles.starEmpty}
            onClick={() => setRating(value)}
            aria-label={`${value}`}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        className={styles.textarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t('feedback.placeholder')}
        maxLength={1000}
        rows={3}
      />
      {message && <p className={styles.message}>{message}</p>}
      <button className={styles.submitBtn} type="submit" disabled={submitting}>
        {submitting ? t('feedback.sending') : t('feedback.submit')}
      </button>
    </form>
  )
}

export default FeedbackForm
