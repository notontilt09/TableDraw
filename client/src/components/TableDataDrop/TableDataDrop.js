import React, { useState, useReducer } from 'react';
import axios from 'axios';

import './TableDataDrop.css';

function reducer(state, action) {
  switch(action.type) {
    case 'Name':
      return {...state, Name: !state.Name}
  }
}

const TableDataDrop = props => {
  // tableInfo hook.  User will copy paste table draw from pokernews here
  const [tableInfo, setTableInfo] = useState('0');

  // options for how much data to grab, toggled by checkboxes in render
  const [options, setOptions] = useState({
    name: true,
    chips: true,
    nationality: true,
    earnings: true,
    largest: true,
    buyin: true
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
    const selectedOptions = {}
    const keys = Object.keys(options);
    
    for (const key of keys) {
      if (options[key]) {
        selectedOptions[key] = true
      }
    }

    axios.post('http://localhost:5000/api/table', {tableInfo, selectedOptions})
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
            <input onClick={toggleCheckbox} type="checkbox" name="name" defaultChecked/><span>Name</span>
          </div>
          <div className="right-option">
            <input onClick={toggleCheckbox} type="checkbox" name="chips" defaultChecked/><span>Chip Count</span>
          </div>
        </div>
        <div className="sub-options">
          <div className="left-option">
            <input onClick={toggleCheckbox} type="checkbox" name="nationality" defaultChecked/><span>Nationality</span>
          </div>
          <div className="right-option">
            <input onClick={toggleCheckbox} type="checkbox" name="earnings" defaultChecked/><span>Earnings</span>
          </div>
        </div>
        <div className="sub-options">
          <div className="left-option">
            <input onClick={toggleCheckbox} type="checkbox" name="largest" defaultChecked/><span>Largest Cash</span>
          </div>
          <div className="right-option">
            <input onClick={toggleCheckbox} type="checkbox" name="buyin" defaultChecked/><span>Average Buyin</span>
          </div>
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