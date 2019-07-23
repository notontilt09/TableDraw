import React, { useState } from 'react';
import './App.css';

import Table from './components/Table/Table';
import TableData from './components/TableDataDrop/TableDataDrop';
import Nav from './components/Nav/Nav';

const App = () => {
  const [results, setResults] = useState([])

  return (
    <div className="App">
      <Nav/>
      <TableData setResults={setResults}/>
      <Table results={results} />
    </div>
  );
}

export default App;
