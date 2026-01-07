import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './DashboardProfile.module.css'
const DashboardProfile = () => {
  const { t } = useTranslation()
  const user = JSON.parse(localStorage.getItem('user'))

  if (!user) return <p>{t('dashboard.profile.notFound')}</p>

  return (
    <div className={styles.profile}>
      <h2 className={styles.title}>{t('dashboard.profile.title')}</h2>

      <div className={styles.row}>
        <span className={styles.label}>{t('dashboard.profile.name')}:</span>
        <span>{user.name}</span>
      </div>

      <div className={styles.row}>
        <span className={styles.label}>{t('dashboard.profile.email')}:</span>
        <span>{user.email}</span>
      </div>

      <div className={styles.row}>
        <span className={styles.label}>{t('dashboard.profile.role')}:</span>
        <span>{t(`dashboard.role-names.${user.role}`)}</span>
      </div>
    </div>
  )
}

export default DashboardProfile
