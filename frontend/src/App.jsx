import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Navbar from './components/navbar.jsx'
import Calendrier from './pages/Calendrier.jsx'
import Profile from './pages/profile.jsx'
import Footer from './components/footer.jsx'
import NoPage from './pages/404.jsx'

function App() {
  return (
    <BrowserRouter>
      <Navbar /> 
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/calendrier' element={<Calendrier />} />
        <Route path='*' element={<NoPage />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
