import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaArrowLeft } from 'react-icons/fa'
import styles from './BackButton.module.css'

// Повертає на попередню сторінку історії. Якщо користувач відкрив сторінку
// напряму (за посиланням чи QR-кодом) і історії немає — веде на `fallback`.
// standalone — кнопка в окремому рядку над сторінкою (для сторінок без власної
// «картки», де її нікуди вставити всередину).
const BackButton = ({ fallback = '/', standalone = false }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleClick = () => {
    const hasHistory = window.history.state && window.history.state.idx > 0
    if (hasHistory) {
      navigate(-1)
    } else {
      navigate(fallback)
    }
  }

  const button = (
    <button type="button" className={styles.backButton} onClick={handleClick}>
      <FaArrowLeft aria-hidden="true" />
      <span>{t('common.back')}</span>
    </button>
  )

  return standalone ? <div className={styles.pageRow}>{button}</div> : button
}

export default BackButton
