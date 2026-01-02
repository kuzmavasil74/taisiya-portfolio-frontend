import React from 'react'
import { Navigate } from 'react-router-dom'
import styles from './PrivateRoute.module.css'

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  if (!token) {
    return <Navigate to="/admin" replace />
  }

  if (role && user.role !== role) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>403 - Forbidden</h1>
        <p className={styles.text}>
          You do not have permission to access this page.
        </p>
      </div>
    )
  }

  return children
}

export default PrivateRoute
