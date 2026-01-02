import { Navigate } from 'react-router-dom'

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  if (!token) return <Navigate to="/admin" replace />
  if (!user || user.role !== 'admin')
    return <Navigate to="/forbidden" replace />

  return children
}

export default AdminRoute
