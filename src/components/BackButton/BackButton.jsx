import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaArrowLeft } from 'react-icons/fa'
import styles from './BackButton.module.css'

// Повертає на попередню сторінку історії. Якщо користувач відкрив сторінку
// напряму (за посиланням чи QR-кодом) і історії немає — веде на `fallback`.
const BackButton = ({ fallback = '/' }) => {
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

  return (
    <button type="button" className={styles.backButton} onClick={handleClick}>
      <FaArrowLeft aria-hidden="true" />
      <span>{t('common.back')}</span>
    </button>
  )
}

export default BackButton
