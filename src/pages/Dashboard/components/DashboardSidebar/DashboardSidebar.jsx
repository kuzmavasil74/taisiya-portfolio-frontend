import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './DashboardSidebar.module.css'

const DashboardSidebar = () => {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="profile"
        className={({ isActive }) => (isActive ? styles.active : '')}
      >
        Profile
      </NavLink>
      <NavLink
        to="bookings"
        className={({ isActive }) => (isActive ? styles.active : '')}
      >
        Bookings
      </NavLink>
    </nav>
  )
}

export default DashboardSidebar
