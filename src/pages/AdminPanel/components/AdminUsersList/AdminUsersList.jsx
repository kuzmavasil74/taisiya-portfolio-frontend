import React, { useState, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import styles from './AdminUsersList.module.css'
import API_URL from '../../../../utills/config.js'

const AdminUsersList = () => {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const token = localStorage.getItem('token')

  // 🔹 Отримати юзерів з бекенду
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${API_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.message || 'Failed to fetch users')
        }

        const data = await res.json()
        // переконаємось, що data - масив
        const usersArray = Array.isArray(data) ? data : []
        setUsers(usersArray)
        // console.log(usersArray)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [token])

  // 🔹 Фільтруємо юзерів по пошуку (ім'я + email)
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className={styles.layout}>
      {/* Лівий сайдбар з пошуком */}
      <aside className={styles.usersList}>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />

        {loading && <p>Loading users...</p>}
        {error && <p className={styles.error}>{error}</p>}

        {!loading &&
          !error &&
          filteredUsers.map((user) => (
            <NavLink
              key={user._id}
              to={user._id}
              className={({ isActive }) =>
                isActive ? styles.activeUser : styles.user
              }
            >
              {user.name} ({user.bookingsCount || 0})
            </NavLink>
          ))}

        {!loading && !error && filteredUsers.length === 0 && (
          <p className={styles.noUsers}>No users found</p>
        )}
      </aside>

      {/* Праве вікно для контенту конкретного користувача */}
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminUsersList
