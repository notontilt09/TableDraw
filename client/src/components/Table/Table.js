import React from 'react';

const Table = props => {
  return (
    <div>
      {props.results.map(result => 
          <div key={result.name}>
            {!result.notes &&
              <>
                <h1>{result.name}</h1>
                <h3>Seat: {result.seat}</h3>
                <h3>Chips: {result.chips}</h3>
                <h3>Country: {result.nationality}</h3>
                <h3>Total Live Earnings: {result.earnings}</h3>
                <h3>Largest Cash: {result.largest}</h3>
                <h3>Average Buy In: {`$${result.buyin}`}</h3>
              </>
            }
            {result.notes &&
              <>
                <h1>{result.name}</h1>
                <h3>{result.notes}</h3>
              </>
            }
          </div>
        )
      }
    </div>
  )
}

export default Table;