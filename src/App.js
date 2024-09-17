import { Router, Switch } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Router>
      <Switch>
        <Router path="/" exact component={Main} />
        <Router path="/about" components={About} />
        <Router path="/services" component={Services} />
        <Router path="/contact" component={ContactForm} />
        <Router path="/gallery" component={Gallery} />
      </Switch>
    </Router>
  )
}

export default App
