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
          <Route
            path="/terms-and-conditions"
            element={<Terms_and_Conditions />}
          />
          <Route path="*" element={<MainPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default App
