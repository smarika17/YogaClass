import { Routes, Route } from 'react-router'
import './App.css'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


import Home from './pages/Home'
import Register from './pages/Register'
import Admin from './pages/Admin'
import Payment from './pages/Payment'

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </>
  )
}

export default App
