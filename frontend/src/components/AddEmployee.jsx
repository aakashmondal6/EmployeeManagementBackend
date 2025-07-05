import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function AddEmployee() {
  const [form, setForm] = useState({ EmpId: '', name: '', city: '', department: '' })
  const [message, setMessage] = useState('')

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/employees/AddEmployee', form)
      setMessage(res.data.message || 'Employee added successfully!')
      setForm({ EmpId: '', name: '', city: '', department: '' })
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error adding employee.')
    }
  }

  return (
    <div className="container">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <input name="EmpId" placeholder="EmpId" value={form.EmpId} onChange={handleChange} required />
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
        <input name="department" placeholder="Department" value={form.department} onChange={handleChange} required />
        <button type="submit">Add</button>
      </form>
      {message && <p>{message}</p>}
      <br />
      <Link to="/">← Back to Home</Link>
    </div>
  )
}