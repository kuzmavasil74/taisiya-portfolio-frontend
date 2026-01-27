import React, { useEffect, useState } from 'react'
import AdminStatsCharts from './AdminStatsCharts/AdminStatsCharts.jsx'
import styles from './AdminStats.module.css'
import { useTranslation } from 'react-i18next'
import API_URL from '../../../../utills/config.js'

const AdminStats = () => {
  const { t } = useTranslation()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')
        const res = await fetch(`${API_URL}/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.message || t('error.fetchStats'))
        }

        const data = await res.json()
        setStats(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [t])

  if (loading) return <p className={styles.loading}>{t('loading')}</p>
  if (error) return <p className={styles.error}>{error}</p>

  return (
    <div className={styles.container}>
      <div className={styles.cards}>
        <div className={styles.card}>
          <h3>{t('stats.totalUsers')}</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className={styles.card}>
          <h3>{t('stats.newUsersToday')}</h3>
          <p>{stats.newUsersToday}</p>
        </div>
        <div className={styles.card}>
          <h3>{t('stats.totalBookings')}</h3>
          <p>{stats.totalBookings}</p>
        </div>
        <div className={styles.card}>
          <h3>{t('stats.revenueToday')}</h3>
          <p>${stats.revenue.today}</p>
        </div>
      </div>

      <div className={styles.section}>
        <h3>{t('stats.bookingsStatus')}</h3>
        <div className={styles.status}>
          {Object.entries(stats.bookingsStatus).map(([key, value]) => (
            <div key={key} className={styles.statusCard}>
              <span>{t(`bookingsStatus.${key}`)}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h3>{t('stats.topServices')}</h3>
        <ul>
          {stats.topServices.map((service) => (
            <li key={service._id}>
              {service._id} ({service.count})
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h3>{t('stats.bookingsLast7Days')}</h3>
        <ul>
          {stats.bookingsPerDay.map((b) => (
            <li key={b._id}>
              {b._id}: {b.count}
            </li>
          ))}
        </ul>
      </div>

      <AdminStatsCharts stats={stats} />
    </div>
  )
}

export default AdminStats
