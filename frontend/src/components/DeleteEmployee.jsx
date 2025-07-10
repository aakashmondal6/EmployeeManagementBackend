import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function DeleteEmployee() {
  const [EmpId, setEmpId] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleDelete = async e => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if (!token) {
      setMessage('Unauthorized: Please login.')
      navigate('/login')
      return
    }
    try {
      const res = await axios.delete(`/api/employees/deleteEmployee?EmpId=${EmpId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setMessage(res.data.message || 'Employee deleted successfully!')
      setEmpId('')
    } catch (err) {
      if (err.response?.status === 401 ) {
        localStorage.removeItem('token')
        navigate('/dashboard')
      } 
      else if (err.response?.status === 403)
      {
          alert('Forbidden: You do not have permission to delete this employee.')
          localStorage.removeItem('token')
          navigate('/dashboard')

      } else {
        setMessage(err.response?.data?.message || 'Error deleting employee.')
      }
    }
  }

  return (
    <div className="container">
      <h2>Delete Employee</h2>
      <form onSubmit={handleDelete}>
        <input
          type="text"
          placeholder="EmpId"
          value={EmpId}
          onChange={e => setEmpId(e.target.value)}
          required
        />
        <button type="submit">Delete</button>
      </form>
      {message && <p>{message}</p>}
      <br />
      {/* <Link to="/">← Back to Home</Link> */}
      <Link to="/Dashboard">← Back to Dashboard</Link>
      
    </div>
  )
}