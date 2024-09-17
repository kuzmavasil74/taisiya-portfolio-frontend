import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import About from '../About/About.jsx'
import ContactForm from '../ContactForm/Contact.jsx'
import Gallery from '../Gallery/Gallery.jsx'
import Main from '../Main/Main.jsx'
import Services from '../Services/Services.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  )
}

export default App
