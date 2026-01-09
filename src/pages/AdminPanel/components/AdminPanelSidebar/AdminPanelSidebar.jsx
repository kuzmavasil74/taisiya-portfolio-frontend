import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './AdminPanelSidebar.module.css'
const AdminPanelSidebar = () => {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="users"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Users
      </NavLink>
      <NavLink
        to="bookings"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Bookings
      </NavLink>
      <NavLink
        to="statistics"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Statistics
      </NavLink>
    </nav>
  )
}
export default AdminPanelSidebar
