import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './Dashboard.module.css'
import BackButton from '../../components/BackButton/BackButton.jsx'

import DashboardSidebar from './components/DashboardSidebar/DashboardSidebar.jsx'

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <DashboardSidebar />
      </aside>

      <main className={styles.dashboardContent}>
        <BackButton fallback="/" />
        <Outlet />
      </main>
    </div>
  )
}

export default Dashboard
