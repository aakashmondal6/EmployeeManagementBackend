import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function ViewEmployees() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token) {
      navigate('/login');
      return;
    }
    axios.get('/api/employees/getAllEmployees', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setEmployees(res.data)
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('token')
          alert('Failed to get all employees details. Please login again.');
          navigate('/dashboard');
        } else {
          setMessage('Error fetching employees.');
        }
      });
  }, [navigate]);

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
      {/* <Link to="/">← Back to Home</Link> */}
      <Link to="/Dashboard">← Back to Dashboard</Link>
    </div>
  )
}