import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function SearchEmployee() {
  const [searchType, setSearchType] = useState('EmpId')
  const [searchValue, setSearchValue] = useState('')
  const [result, setResult] = useState(null)
  const [message, setMessage] = useState('')

  const handleTypeChange = e => {
    setSearchType(e.target.value)
    setSearchValue('')
    setResult(null)
    setMessage('')
  }

  const handleValueChange = e => {
    setSearchValue(e.target.value)
  }

  // const handleSearch = async e => {
  //   e.preventDefault()
  //   if (!searchValue.trim()) {
  //     setMessage('Please enter a value.')
  //     setResult(null)
  //     return
  //   }
  //   try {
  //     const payload = { [searchType]: searchValue }
  //     const res = await axios.get('/api/employees/filter', payload)
  //     if (res.data && (Array.isArray(res.data) ? res.data.length : Object.keys(res.data).length)) {
  //       setResult(res.data)
  //       setMessage('')
  //     } else {
  //       setResult(null)
  //       setMessage(res.data.message || 'No employees found.')
  //     }
  //   } catch (err) {
  //     setResult(null)
  //     setMessage(err.response?.data?.message || 'Error searching employee.')
  //   }
  // }
const handleSearch = async e => {
  e.preventDefault()
  if (!searchValue.trim()) {
    setMessage('Please enter a value.')
    setResult(null)
    return
  }
  try {
    // Build query string
    const params = new URLSearchParams({ [searchType]: searchValue }).toString()
    const res = await axios.get(`/api/employees/filter?${params}`)
    if (res.data && (Array.isArray(res.data) ? res.data.length : Object.keys(res.data).length)) {
      setResult(res.data)
      setMessage('')
    } else {
      setResult(null)
      setMessage(res.data.message || 'No employees found.')
    }
  } catch (err) {
    setResult(null)
    setMessage(err.response?.data?.message || 'Error searching employee.')
  }
}

  return (
    <div className="container">
      <h2>Search Employee</h2>
      <form onSubmit={handleSearch}>
        <label>
          Search by:&nbsp;
          <select value={searchType} onChange={handleTypeChange}>
            <option value="EmpId">EmpId</option>
            <option value="city">City</option>
            <option value="department">Department</option>
          </select>
        </label>
        <input
          name="searchValue"
          placeholder={`Enter ${searchType}`}
          value={searchValue}
          onChange={handleValueChange}
        />
        <button type="submit">Search</button>
      </form>
      {message && <p>{message}</p>}
      {result && (
        Array.isArray(result) ? (
          <table>
            <thead>
              <tr>
                <th>EmpId</th><th>Name</th><th>City</th><th>Department</th>
              </tr>
            </thead>
            <tbody>
              {result.map(emp => (
                <tr key={emp.EmpId}>
                  <td>{emp.EmpId}</td>
                  <td>{emp.name}</td>
                  <td>{emp.city}</td>
                  <td>{emp.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table>
            <thead>
              <tr>
                <th>EmpId</th><th>Name</th><th>City</th><th>Department</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{result.EmpId}</td>
                <td>{result.name}</td>
                <td>{result.city}</td>
                <td>{result.department}</td>
              </tr>
            </tbody>
          </table>
        )
      )}
      <br />
      <Link to="/">← Back to Home</Link>
    </div>
  )
}