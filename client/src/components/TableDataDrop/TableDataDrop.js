import React, { useState } from 'react';
import axios from 'axios';

import './TableDataDrop.css';

const TableDataDrop = props => {
  const [tableInfo, setTableInfo] = useState('0');
  const [options, setOptions] = useState({
    Name: true,
    Chips: true,
    Nationality: true,
    Earnings: true,
    Largest: true,
    Buyin: true
  })
  

  const toggleCheckbox = e => {
    setOptions({
      ...options,
      [e.target.name]: !options[e.target.name]
    })
  }

  const handleChange = e => {
    setTableInfo(e.target.value)
  }

  const handleSubmit = () => {
    axios.post('http://localhost:5000/api/table', {tableInfo, options})
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return (
    <div className="data-drop">
      <textarea 
        className="raw-data"
        placeholder="Paste Table Draw Here..."
        value={tableInfo}
        onChange={handleChange}
      />
      <div className="options">
        <input onClick={toggleCheckbox} type="checkbox" name="Name" defaultChecked/>Name
        <input onClick={toggleCheckbox} type="checkbox" name="Chips" defaultChecked/>Chip Count
        <input onClick={toggleCheckbox} type="checkbox" name="Nationality" defaultChecked/>Nationality
        <input onClick={toggleCheckbox} type="checkbox" name="Earnings" defaultChecked/>Total Live Earnings
        <input onClick={toggleCheckbox} type="checkbox" name="Largest" defaultChecked/>Largest Cash
        <input onClick={toggleCheckbox} type="checkbox" name="Buyin" defaultChecked/>Average Buyin
      </div>
      <button
        className='submit-btn'
        onClick={handleSubmit}
      >
        Get My Table Draw
      </button>
    </div>
  )
}

export default TableDataDrop;