const express = require('express'); 
const helmet = require('helmet');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/api/table', async (req, res) => {
  const raw_data = req.body;
  // testing out passing data from front end to server...
  console.log(raw_data);
})

module.exports = server;