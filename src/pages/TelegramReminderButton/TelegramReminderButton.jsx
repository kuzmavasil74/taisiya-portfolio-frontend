import styles from './TelegramReminderButton.module.css'
const TELEGRAM_BOT_USERNAME = 'TaisiStyleBot'

function TelegramReminderButton({ bookingId }) {
  if (!bookingId) {
    return null
  }

  const telegramLink = `https://t.me/${TELEGRAM_BOT_USERNAME}?start=${bookingId}`

  return (
    <a
      href={telegramLink}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.telegramReminderButton}
    >
      🔔 Отримувати нагадування в Telegram
    </a>
  )
}
export default TelegramReminderButton
