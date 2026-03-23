

import './styles/App.css'
import { BrowserRouter } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Router } from './router'

function App() {
  

  return (
    <BrowserRouter>
      <Navbar />
      <Router />
      <Footer />
    </BrowserRouter>
  )
}

export default App
