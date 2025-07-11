import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import AddEmployee from './components/AddEmployee'
import DeleteEmployee from './components/DeleteEmployee'
import SearchEmployee from './components/SearchEmployee'
import ViewEmployees from './components/ViewEmployee'
import axios from 'axios'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'


// Add this before ReactDOM.createRoot...
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
function Home() {
  const navigate = useNavigate()
  return (
    <div className="container">
      <h1>Employee Management</h1>
      <div className="menu">
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/register')}>Register</button>
      </div>
    </div>
  )
}

// This is the main App component that sets up the routes for the application.
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/search" element={
          <ProtectedRoute><SearchEmployee /></ProtectedRoute>
        } />
        <Route path="/add" element={
          <ProtectedRoute><AddEmployee /></ProtectedRoute>
        } />
        <Route path="/delete" element={
          <ProtectedRoute><DeleteEmployee /></ProtectedRoute>
        } />
        <Route path="/view" element={
          <ProtectedRoute><ViewEmployees /></ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}