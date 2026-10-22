import React from 'react'
import styles from './AdminPanel.module.css'
import BackButton from '../../components/BackButton/BackButton.jsx'
import { Outlet } from 'react-router-dom'
import AdminPanelSidebar from './components/AdminPanelSidebar/AdminPanelSidebar'

const AdminPanel = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <AdminPanelSidebar />
      </aside>
      <main className={styles.adminPanelContent}>
        <BackButton fallback="/" />
        <Outlet />
      </main>
    </div>
  )
}
export default AdminPanel
