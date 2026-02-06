import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './i18n.js'

import AboutPage from './pages/AboutPage/AboutPage.jsx'
import ContactFormPage from './pages/ContactFormPage/ContactFormPage.jsx'
import GalleryPage from './pages/GalleryPage/GalleryPage.jsx'
import MainPage from './pages/MainPage/MainPage.jsx'
import ServicesPage from './pages/ServicesPage/ServicesPage.jsx'
import Footer from './components/Footer/Footer.jsx'
import Header from './components/Header/Header.jsx'
import BookingFormPage from './pages/BookingFormPage/BookingFormPage.jsx'
import { useTranslation } from 'react-i18next'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy.jsx'
import Terms_and_Conditions from './pages/Terms_and_Conditions/Terms_and_Conditions.jsx'
import PricesList from './pages/PricesListPage/PricesList.jsx'
import FeedbackList from './pages/FeedbackPage/FeedbackList.jsx'
import LoginPage from './pages/LoginPage/LoginPage'
import Dashboard from './pages/Dashboard/Dashboard'
import AdminPanel from './pages/AdminPanel/AdminPanel'
import PrivateRoute from './pages/PrivateRoute/PrivateRoute'
import AdminRoute from './pages/AdminRoute/AdminRoute'
import ForbiddenPage from './pages/ForbiddenPage/ForbiddenPage.jsx'
import DashboardBookingList from './pages/Dashboard/components/DashboardBookingList/DashboardBookingList.jsx'
import DashboardProfile from './pages/Dashboard/components/DashboardProfile/DashboardProfile.jsx'
import AdminUsersList from './pages/AdminPanel/components/AdminUsersList/AdminUsersList.jsx'
import AdminBookingList from './pages/AdminPanel/components/AdminBookingList/AdminBookingList.jsx'
import AdminStats from './pages/AdminPanel/components/AdminStats/AdminStats.jsx'
import BookingTable from './pages/AdminPanel/components/BookingsTable/BookingsTable.jsx'
import { useEffect } from 'react'
import API_URL from './utills/config.js'
function App() {
  const { i18 } = useTranslation()

  const changeLanguage = (lang) => {
    i18.changeLanguage(lang)
  }

  return (
    <Router>
      <Header changeLanguage={changeLanguage} />
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactFormPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/booking" element={<BookingFormPage />} />
          <Route path="/prices" element={<PricesList />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/feedback" element={<FeedbackList />} />
          <Route
            path="/terms-and-conditions"
            element={<Terms_and_Conditions />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route index element={<DashboardProfile />} />
            <Route path="profile" element={<DashboardProfile />} />
            <Route path="bookings" element={<DashboardBookingList />} />
          </Route>
          <Route
            path="/admin-panel"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          >
            <Route index element={<AdminUsersList />} />
            <Route path="users" element={<AdminUsersList />}>
              <Route path=":userId" element={<AdminBookingList />} />
            </Route>
            <Route path="bookings" element={<AdminBookingList />} />
            <Route path="statistics" element={<AdminStats />} />
            <Route path="table" element={<BookingTable />} />
          </Route>
          <Route path="/forbidden" element={<ForbiddenPage />} />
          <Route path="*" element={<MainPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default App
