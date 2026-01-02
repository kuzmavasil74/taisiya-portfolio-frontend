import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Dashboard.module.css'

const Dashboard = () => {
  const { t } = useTranslation()
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('dashboard.title')}</h1>
      <p className={styles.text}>
        {t('dashboard.welcome')}, {user.name}
      </p>
      <p className={styles.text}>
        {t('dashboard.role')}: {t(`dashboard.role-names.${user.role}`)}
      </p>
    </div>
  )
}

export default Dashboard
