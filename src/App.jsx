import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

const App = () => {

  const [user] = useAuthState(auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={!user ? <Signup /> : <Navigate to="/dashboard" />}/>
        <Route path='/login' element={!user ? <Login /> : <Navigate to="/dashboard" />}/>
        <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to="/" />}/>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App