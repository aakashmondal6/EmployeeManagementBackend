import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'

import AddEmployee from './components/AddEmployee'
import DeleteEmployee from './components/DeleteEmployee'
import SearchEmployee from './components/SearchEmployee'
import ViewEmployees from './components/ViewEmployee'

function Home() {
  const navigate = useNavigate()
  return (
    <div className="container">
      <h1>Employee Management</h1>
      <div className="menu">
        <button onClick={() => navigate('/search')}>Search Employee</button>
        <button onClick={() => navigate('/add')}>Add Employee</button>
        <button onClick={() => navigate('/delete')}>Delete Employee</button>
        <button onClick={() => navigate('/view')}>View All Employees</button>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchEmployee />} />
        <Route path="/add" element={<AddEmployee />} />
        <Route path="/delete" element={<DeleteEmployee />} />
        <Route path="/view" element={<ViewEmployees />} />
      </Routes>
    </Router>
  )
}