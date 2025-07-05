import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function ViewEmployees() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    axios.get('/api/employees/getAllEmployees')
      .then(res => {
        setEmployees(res.data)
        setLoading(false)
      })
      .catch(() => {
        setMessage('Error fetching employees.')
        setLoading(false)
      })
  }, [])

  return (
    <div className="container">
      <h2>All Employees</h2>
      {loading ? (
        <p>Loading...</p>
      ) : employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>EmpId</th><th>Name</th><th>City</th><th>Department</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.EmpId}>
                <td>{emp.EmpId}</td>
                <td>{emp.name}</td>
                <td>{emp.city}</td>
                <td>{emp.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {message && <p>{message}</p>}
      <br />
      <Link to="/">← Back to Home</Link>
    </div>
  )
}