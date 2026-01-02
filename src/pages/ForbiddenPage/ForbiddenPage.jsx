import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ForbiddenPage.module.css'

const ForbiddenPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>403 - Forbidden</h1>
      <p className={styles.text}>
        You do not have permission to access this page.
      </p>
      <Link to="/" className={styles.link}>
        Go back to Home
      </Link>
    </div>
  )
}

export default ForbiddenPage
