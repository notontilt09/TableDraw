const express = require('express'); 
const helmet = require('helmet');
const cors = require('cors');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.status(200).json('running');
})

server.post('/api/table', async (req, res) => {
  const { tableInfo, options} = req.body;
  // testing out passing data from front end to server...
  console.log(tableInfo);
  console.log(options);
  res.status(200).json({tableInfo, options});
})

module.exports = server;