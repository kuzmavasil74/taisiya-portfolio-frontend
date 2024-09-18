import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import AboutPage from './pages/AboutPage/AboutPage.jsx'
import ContactFormPage from './pages/ContactFormPage/ContactFormPage.jsx'
import GalleryPage from './pages/GalleryPage/GalleryPage.jsx'
import MainPage from './pages/MainPage/MainPage.jsx'
import ServicesPage from './pages/ServicesPage/ServicesPage.jsx'
import Footer from './components/Footer/Footer.jsx'
import Header from './components/Header/Header.jsx'

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactFormPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default App
