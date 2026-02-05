import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './BookingsTable.module.css'
import API_URL from '../../../utills/config.js'
const BookingsTable = () => {
  const { t, i18n } = useTranslation()

  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterService, setFilterService] = useState('')
  const [filterDate, setFilterDate] = useState('')
  const [sortField, setSortField] = useState('date')
  const [sortOrder, setSortOrder] = useState('asc')
  const [editBooking, setEditBooking] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    duration: '',
    name: '',
    phone: '',
  })

  const getStatusClass = (status) => {
    if (status === 'pending') return 'pending'
    if (status === 'confirmed') return 'confirmed'
    if (status === 'canceled') return 'canceled'
    return ''
  }

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`${API_URL}/bookings`)
        const data = await res.json()
        setBookings(data)
      } catch (err) {
        message.error(err.message)
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
      await fetch(`${API_URL}/bookings/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
      )
    } catch (err) {
      message.error(err.message)
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
      const res = await fetch(`${API_URL}/bookings/${editBooking._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const updated = await res.json()
      setBookings((prev) =>
        prev.map((b) => (b._id === updated._id ? updated : b))
      )
      setModalOpen(false)
      setEditBooking(null)
    } catch (err) {
      message.error(err.message)
    }
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setEditBooking(null)
  }

  if (loading) return <p>{t('loading')}</p>
  if (bookings.length === 0) return <p>{t('noBookings')}</p>

  return (
    <div className={styles.container}>
      {/* Мова */}
      <div style={{ marginBottom: '16px' }}>
        <button onClick={() => i18n.changeLanguage('ua')}>UA</button>
        <button
          onClick={() => i18n.changeLanguage('en')}
          style={{ marginLeft: '8px' }}
        >
          EN
        </button>
      </div>

      {/* Фільтри */}
      <div className={styles.filters}>
        <label>
          {t('filterService')}:
          <select
            value={filterService}
            onChange={(e) => setFilterService(e.target.value)}
          >
            <option value="">{t('all')}</option>
            <option value="Haircut">{t('haircut')}</option>
            <option value="Coloring">{t('coloring')}</option>
          </select>
        </label>
        <label>
          {t('filterDate')}:
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </label>
        <label>
          {t('sortBy')}:
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="date">{t('date')}</option>
            <option value="service">{t('service')}</option>
          </select>
        </label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">{t('asc')}</option>
          <option value="desc">{t('desc')}</option>
        </select>
      </div>

      {/* Таблиця */}
      <table>
        <thead>
          <tr>
            <th>{t('service')}</th>
            <th>{t('date')}</th>
            <th>{t('duration')}</th>
            <th>{t('name')}</th>
            <th>{t('phone')}</th>
            <th>{t('status')}</th>
            <th>{t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          {sortedBookings.map((b) => (
            <tr key={b._id}>
              <td>{b.service}</td>
              <td>{new Date(b.date).toLocaleString()}</td>
              <td>{b.duration || '-'}</td>
              <td>{b.name}</td>
              <td>{b.phone}</td>
              <td
                className={`${styles.status} ${
                  styles[getStatusClass(b.status)]
                }`}
              >
                {b.status}
              </td>
              <td>
                <button
                  onClick={() => handleStatusChange(b._id, 'confirmed')}
                  disabled={b.status === 'confirmed'}
                >
                  {t('confirm')}
                </button>
                <button
                  onClick={() => handleStatusChange(b._id, 'canceled')}
                  disabled={b.status === 'canceled'}
                  style={{ marginLeft: '8px' }}
                >
                  {t('cancel')}
                </button>
                <button
                  onClick={() => handleEdit(b)}
                  style={{ marginLeft: '8px' }}
                >
                  {t('edit')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Модальне вікно */}
      {modalOpen && (
        <div className={styles.confirmModal}>
          <div className={styles.confirmContent}>
            <h3>{t('editBooking')}</h3>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                marginTop: '12px',
              }}
            >
              <input
                type="text"
                name="service"
                value={formData.service}
                onChange={handleFormChange}
                placeholder={t('service')}
              />
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
                placeholder={t('duration')}
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder={t('name')}
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                placeholder={t('phone')}
              />
            </div>
            <div className={styles.confirmBtns}>
              <button className={styles.confirmBtn} onClick={handleSave}>
                {t('save')}
              </button>
              <button className={styles.cancelBtn} onClick={handleCloseModal}>
                {t('cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookingsTable
