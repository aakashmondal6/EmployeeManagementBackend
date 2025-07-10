import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()
  return (
    <div className="container">
      <h1>Employee Dashboard</h1>
      <div className="menu">
        <button onClick={() => navigate('/search')}>Search Employee</button>
        <button onClick={() => navigate('/add')}>Add Employee</button>
        <button onClick={() => navigate('/delete')}>Delete Employee</button>
        <button onClick={() => navigate('/view')}>View All Employees</button>
        <button onClick={() => {
          localStorage.removeItem('token')
          localStorage.removeItem('role')
          navigate('/')
        }}>Logout</button>
      </div>
    </div>
  )
}