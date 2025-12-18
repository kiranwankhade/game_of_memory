import { useState } from 'react'
import './App.css'

import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'

function App() {

  return (
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
        </Routes>
  )
}

export default App
