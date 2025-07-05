import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function DeleteEmployee() {
  const [EmpId, setEmpId] = useState('')
  const [message, setMessage] = useState('')

  const handleDelete = async e => {
    e.preventDefault()
    try {
      const res = await axios.delete(`/api/employees/deleteEmployee?EmpId=${EmpId}`)
      setMessage(res.data.message || 'Employee deleted successfully!')
      setEmpId('')
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error deleting employee.')
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
      <Link to="/">← Back to Home</Link>
    </div>
  )
}