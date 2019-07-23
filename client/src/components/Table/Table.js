import React from 'react';

const Table = props => {
  return (
    <div>
      {props.results.map(result => 
          <div key={result.name}>
            <h1>{result.name}</h1>
            <h3>{result.chips}</h3>
            <h3>{result.nationality}</h3>
            <h3>{result.earnings}</h3>
            <h3>{result.largest}</h3>
            <h3>{result.buyin}</h3>
          </div>
        )
      }
    </div>
  )
}

export default Table;