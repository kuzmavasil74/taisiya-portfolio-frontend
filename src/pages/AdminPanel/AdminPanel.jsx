import React from 'react'
import styles from './AdminPanel.module.css'
import { useTranslation } from 'react-i18next'

const AdminPanel = () => {
  const { t } = useTranslation()
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('adminPanel.title')}</h1>
      <p className={styles.description}>{t('adminPanel.description')}</p>
    </div>
  )
}

export default AdminPanel
