import React, { useState } from 'react';
import axios from 'axios';

import './TableDataDrop.css';

const TableDataDrop = props => {
  // tableInfo hook.  User will copy paste table draw from pokernews here
  const [tableInfo, setTableInfo] = useState('0');

  // options for how much data to grab, toggled by checkboxes in render
  const [options, setOptions] = useState({
    Name: true,
    Chips: true,
    Nationality: true,
    Earnings: true,
    Largest: true,
    Buyin: true
  })
  
  // function to toggle options state called by checkbox inputs
  const toggleCheckbox = e => {
    setOptions({
      ...options,
      [e.target.name]: !options[e.target.name]
    })
  }

  // function to update tableInfo state after raw data pasted in
  const handleChange = e => {
    setTableInfo(e.target.value)
  }

  // function to send post request to backend with tableInfo and options
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
        <h3>What data do you want on your opponents?</h3>
        {/* fix other 2 lines to be like this one */} 
        <div className="sub-options">
          <div className="left-option">
            <input onClick={toggleCheckbox} type="checkbox" name="Name" defaultChecked/>Name
          </div>
          <div className="right-option">
            <input onClick={toggleCheckbox} type="checkbox" name="Chips" defaultChecked/><span>Chip Count</span>
          </div>
        </div>
        <div className="sub-options">
          <input onClick={toggleCheckbox} type="checkbox" name="Nationality" defaultChecked/>Nationality
          <input onClick={toggleCheckbox} type="checkbox" name="Earnings" defaultChecked/>Total Live Earnings
        </div>
        <div className="sub-options">
          <input onClick={toggleCheckbox} type="checkbox" name="Largest" defaultChecked/>Largest Cash
          <input onClick={toggleCheckbox} type="checkbox" name="Buyin" defaultChecked/>Average Buyin
        </div>
      </div>
      <button
        className='submit-btn'
        onClick={handleSubmit}
      >
        Get My Opponent's Info!
      </button>
    </div>
  )
}

export default TableDataDrop;