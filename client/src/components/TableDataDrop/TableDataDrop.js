import React from 'react';

import './TableDataDrop.css';

const TableDataDrop = props => {

  // TODO: write function here to send axios request with table draw info to backend
  const handleData = () => {
    console.log('test');
  }

  return (
    <div className="data-drop">
      <textarea 
        className="raw-data"
        placeholder="Paste Table Draw Here..." 
      />
      <button
        className='submit-btn'
        onClick={handleData}
      >
        Get My Table Draw
      </button>
    </div>
  )
}

export default TableDataDrop;