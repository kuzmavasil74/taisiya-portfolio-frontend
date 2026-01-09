import React from 'react'
import styles from './AdminPanel.module.css'
import { Outlet } from 'react-router-dom'
import AdminPanelSidebar from './components/AdminPanelSidebar/AdminPanelSidebar'

const AdminPanel = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <AdminPanelSidebar />
      </aside>
      <main className={styles.adminPanelContent}>
        <Outlet />
      </main>
    </div>
  )
}
export default AdminPanel
