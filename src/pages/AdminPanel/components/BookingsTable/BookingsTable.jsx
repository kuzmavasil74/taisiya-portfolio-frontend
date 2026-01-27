import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './BookingsTable.module.css'
import  API_URL  from '../../../../utills/config.js'

const BookingsTable = () => {
  const { t } = useTranslation()

  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  // Фільтри та сортування
  const [filterService, setFilterService] = useState('')
  const [filterDate, setFilterDate] = useState('')
  const [sortField, setSortField] = useState('date')
  const [sortOrder, setSortOrder] = useState('asc')

  // Модальне вікно
  const [editBooking, setEditBooking] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    duration: '',
    name: '',
    phone: '',
  })

  // Для відслідковування, який статус змінюється
  const [updatingId, setUpdatingId] = useState(null)

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem('token')
        if (!token) throw new Error('No token found. Please login.')

        const res = await fetch(`${API_URL}/bookings/all`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) throw new Error(`Error ${res.status}`)

        const data = await res.json()
        setBookings(data)
      } catch (err) {
        console.error('Error fetching bookings:', err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  const filteredBookings = bookings.filter((b) => {
    const matchesService = filterService ? b.service === filterService : true
    const matchesDate = filterDate ? b.date.startsWith(filterDate) : true
    return matchesService && matchesDate
  })

  const sortedBookings = filteredBookings.sort((a, b) => {
    let valA = a[sortField]
    let valB = b[sortField]

    if (sortField === 'date') {
      valA = new Date(valA).getTime()
      valB = new Date(valB).getTime()
    }

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  const handleStatusChange = async (id, newStatus) => {
    try {
      setUpdatingId(id)
      const token = localStorage.getItem('token')
      console.log(`${id} ${newStatus}`)
      console.log('token', token)
      const res = await fetch(`${API_URL}/bookings/${id}`, {
        method: 'PUT', // або PATCH
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({ status: newStatus }),
      })

      const data = await res.json()
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: data.status } : b))
      )
    } catch (err) {
      console.error(err)
    } finally {
      setUpdatingId(null)
    }
  }

  const handleEdit = (booking) => {
    setEditBooking(booking)
    setFormData({
      service: booking.service,
      date: booking.date.slice(0, 16),
      duration: booking.duration,
      name: booking.name,
      phone: booking.phone,
    })
    setModalOpen(true)
  }

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API_URL}/bookings/${editBooking._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
      const updated = await res.json()
      setBookings((prev) =>
        prev.map((b) => (b._id === updated._id ? updated : b))
      )
      setModalOpen(false)
      setEditBooking(null)
    } catch (err) {
      console.error(err)
    }
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setEditBooking(null)
  }

  if (loading) return <p>{t('bookingTable.loading')}</p>
  if (bookings.length === 0) return <p>{t('bookingTable.noBookings')}</p>

  return (
    <div className={styles.container}>
      {/* Фільтри */}
      <div className={styles.filters}>
        <label>
          {t('bookingTable.filterByService')}{' '}
          <select
            value={filterService}
            onChange={(e) => setFilterService(e.target.value)}
          >
            <option value="">{t('bookingTable.all')}</option>
            <option value="Haircut">{t('bookingTable.haircut')}</option>
            <option value="menHaircuts">{t('bookingTable.menhaircuts')}</option>
            <option value="keratin">{t('bookingTable.keratin')}</option>
            <option value="hotBotox">{t('bookingTable.hotbotox')}</option>
            <option value="coldRestoration">
              {t('bookingTable.coldrestoration')}
            </option>
            <option value="coldBotox">{t('bookingTable.coldbotox')}</option>
            <option value="polishing">{t('bookingTable.polishing')}</option>
          </select>
        </label>

        <label>
          {t('bookingTable.filterByDate')}{' '}
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </label>

        <label>
          {t('bookingTable.sortBy')}{' '}
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="date">{t('bookingTable.date')}</option>
            <option value="service">{t('bookingTable.service')}</option>
          </select>
        </label>

        <label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">{t('bookingTable.asc')}</option>
            <option value="desc">{t('bookingTable.desc')}</option>
          </select>
        </label>
      </div>

      {/* Таблиця */}
      <table>
        <thead>
          <tr>
            <th>{t('bookingTable.service')}</th>
            <th>{t('bookingTable.date')}</th>
            <th>{t('bookingTable.duration')}</th>
            <th>{t('bookingTable.name')}</th>
            <th>{t('bookingTable.phone')}</th>
            <th>{t('bookingTable.status')}</th>
            <th>{t('bookingTable.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {sortedBookings.map((booking) => (
            <tr key={booking._id}>
              <td>{t(`bookingTable.${booking.service}`) || booking.service}</td>
              <td>{new Date(booking.date).toLocaleString()}</td>
              <td>{booking.duration || '-'}</td>
              <td>{booking.name}</td>
              <td>{booking.phone}</td>
              <td className={`${styles.status} ${styles[booking.status]}`}>
                {t(`bookingTable.${booking.status}`)}
              </td>
              <td>
                <button
                  className={styles.confirmBtn}
                  onClick={() => handleStatusChange(booking._id, 'confirmed')}
                  disabled={
                    booking.status === 'confirmed' || updatingId === booking._id
                  }
                >
                  {t('bookingTable.confirm')}
                </button>
                <button
                  className={styles.cancelBtn}
                  onClick={() => handleStatusChange(booking._id, 'canceled')}
                  disabled={
                    booking.status === 'canceled' || updatingId === booking._id
                  }
                >
                  {t('bookingTable.cancel')}
                </button>
                <button
                  className={styles.editBtn}
                  onClick={() => handleEdit(booking)}
                >
                  {t('bookingTable.edit')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Модальне вікно редагування */}
      {modalOpen && (
        <div className={styles.confirmModal}>
          <div className={styles.confirmContent}>
            <h3>{t('bookingTable.editBooking')}</h3>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                marginTop: 12,
              }}
            >
              <select
                name="service"
                value={formData.service}
                onChange={handleFormChange}
              >
                <option value="Haircut">
                  {t('bookingTable.Haircut')} 60{t('bookingTable.minutes')}
                </option>
                <option value="menHaircuts">
                  {t('bookingTable.menHaircuts')} 30{t('bookingTable.minutes')}
                </option>
                <option value="keratin">
                  {t('bookingTable.keratin')} 90{t('bookingTable.minutes')}
                </option>
                <option value="hotBotox">
                  {t('bookingTable.hotBotox')} 60{t('bookingTable.minutes')}
                </option>
                <option value="coldRestoration">
                  {t('bookingTable.coldRestoration')} 90{' '}
                  {t('bookingTable.minutes')}
                </option>
                <option value="coldBotox">
                  {t('bookingTable.coldBotox')} 60{t('bookingTable.minutes')}
                </option>
                <option value="polishing">
                  {t('bookingTable.polishing')} 30 {t('bookingTable.minutes')}
                </option>
              </select>
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleFormChange}
              />
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleFormChange}
                placeholder={t('bookingTable.duration')}
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder={t('bookingTable.name')}
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                placeholder={t('bookingTable.phone')}
              />
            </div>
            <div className={styles.confirmBtns}>
              <button className={styles.confirmBtn} onClick={handleSave}>
                {t('bookingTable.save')}
              </button>
              <button className={styles.cancelBtn} onClick={handleCloseModal}>
                {t('bookingTable.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookingsTable
