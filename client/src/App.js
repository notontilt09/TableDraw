import React from 'react';
import './App.css';

import Table from './components/Table';
import TableData from './components/TableDataDrop';
import Nav from './components/Nav';

function App() {
  return (
    <div className="App">
      <Nav/>
      <TableData/>
      <Table/>
    </div>
  );
}

export default App;
