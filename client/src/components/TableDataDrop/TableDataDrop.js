import React, { useState, useReducer } from 'react';
import axios from 'axios';

import './TableDataDrop.css';

const TableDataDrop = props => {
  const initialTableInfo = [
    {
      seat: 1,
      name: '',
      chips: 0,
    },
    {
      seat: 2,
      name: '',
      chips: 0,
    },
    {
      seat: 3,
      name: '',
      chips: 0,
    },
    {
      seat: 4,
      name: '',
      chips: 0,
    },
    {
      seat: 5,
      name: '',
      chips: 0,
    },
    {
      seat: 6,
      name: '',
      chips: 0,
    },
    {
      seat: 7,
      name: '',
      chips: 0,
    },
    {
      seat: 8,
      name: '',
      chips: 0,
    },
    {
      seat: 9,
      name: '',
      chips: 0,
    },
    {
      seat: 10,
      name: '',
      chips: 0,
    }
  ]
  // tableInfo hook.  User will copy paste table draw from pokernews here
  const [tableInfo, setTableInfo] = useState(initialTableInfo);

  
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
  const handleNameChange = (e, seat) => {
    setTableInfo(tableInfo.map(player => {
      if (player.seat === seat) {
        return {
          ...player,
          name: e.target.value
        }
      } else {
        return player
      }
    } ))
  }

  const handleChipsChange = (e, seat) => {
    setTableInfo(tableInfo.map(player => {
      if (player.seat === seat) {
        return {
          ...player,
          chips: e.target.value
        }
      } else {
        return player
      }
    }))
  }

  const clearInput = () => {
    setTableInfo(initialTableInfo)
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
      <table className='raw-data'>
        <tbody>
        <tr>
          <th>Seat #</th>
          <th>Player Name</th>
          <th>Chips</th>
        </tr>
        {tableInfo.map(player => (
          <tr key={player.seat}>
            <td>{player.seat}</td>
            <td>
              <input 
                type="text" 
                name="name" 
                placeholder={`Player ${player.seat} Name`} 
                value={player.name}
                onChange={(e) => handleNameChange(e, player.seat)}
              />
            </td>
            <td>
              <input 
                type="text" 
                name="chips"
                placeholder={`Player ${player.seat} Chips`} 
                value={player.chips}
                onChange={(e) => handleChipsChange(e, player.seat)}
              />
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      <button className="clear-input" onClick={clearInput}>Clear All</button>
      <div className="options">
        <h3>What data do you want on your opponents?</h3>
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