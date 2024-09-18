import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import About from '../About/About.jsx'
import ContactForm from '../ContactForm/ContactForm.jsx'
import Gallery from '../Gallery/Gallery.jsx'
import Main from '../Main/Main.jsx'
import Services from '../Services/Services.jsx'
import Footer from '../Footer/Footer.jsx'
import Header from '../Header/Header.jsx'

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default App
