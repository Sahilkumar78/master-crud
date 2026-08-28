import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import {Routes, Route} from "react-router-dom"
import Appointment from './pages/Appointment'
import Doctor from './pages/Doctor'
import Patient from './pages/Patient'
import Home from './pages/Home'
function App() {


  return (
     <>
     
     <h1 className='bg-red-400 text-center p-2 text-2xl ' >Vedanta hospital management</h1>
      <Navbar />
      <Routes >
        <Route path='/' element={<Home />}/>
       <Route  path='/appointment' element={<Appointment />}/>
       <Route path='/doctors' element={<Doctor/>} />
       <Route path='/patient' element={<Patient />}/>

      </Routes>
     </>
  )
}

export default App
