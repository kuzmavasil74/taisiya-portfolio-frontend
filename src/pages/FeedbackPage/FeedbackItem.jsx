import styles from './FeedbackItem.module.css'

const FeedbackItem = ({ feedback }) => {
  const { name, rating, text } = feedback

  return (
    <div className={styles.card}>
      <h3 className={styles.name}>{name}</h3>
      <div className={styles.stars}>
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={index}
            className={index < rating ? styles.starFilled : styles.starEmpty}
          >
            ★
          </span>
        ))}
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  )
}

export default FeedbackItem
