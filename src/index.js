import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/styles.css'
import App from './App.jsx'
import reportWebVitals from './reportWebVitals'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
reportWebVitals()
serviceWorkerRegistration.register()
