import { useEffect, useState } from 'react'
import axios from 'axios'
import API_URL from './config.js'

// Той самий перелік послуг, що й на бекенді (controllers/bookingController.js),
// використовується як резервний варіант, якщо /bookings/services недоступний.
const FALLBACK_SERVICES = [
  { key: 'womenHaircut', duration: 60, price: 600 },
  { key: 'menHaircut', duration: 30, price: 500 },
  { key: 'menHaircutBeard', duration: 60, price: 600 },
  { key: 'balayage', duration: 180, price: 2800 },
  { key: 'airtouch', duration: 240, price: 3500 },
  { key: 'exitBlack', duration: 240, price: 4000 },
  { key: 'brazilianColoring', duration: 180, price: 3000 },
  { key: 'toning', duration: 60, price: 1000 },
  { key: 'restorationShort', duration: 120, price: 2000 },
  { key: 'restorationMedium', duration: 150, price: 2200 },
  { key: 'restorationLong', duration: 180, price: 2400 },
  { key: 'curlingShort', duration: 120, price: 2100 },
  { key: 'curlingMedium', duration: 150, price: 2200 },
  { key: 'curlingLong', duration: 180, price: 2400 },
]

// Єдине джерело правди для списку послуг (назва/тривалість/ціна) —
// підтягується з бекенду, щоб маркетингові сторінки й форма бронювання
// ніколи не розходились.
const useServices = () => {
  const [services, setServices] = useState(FALLBACK_SERVICES)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    axios
      .get(`${API_URL}/bookings/services`)
      .then((res) => {
        if (!cancelled && Array.isArray(res.data) && res.data.length) {
          setServices(res.data)
        }
      })
      .catch(() => {
        // залишаємось на FALLBACK_SERVICES
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { services, loading }
}

export default useServices
