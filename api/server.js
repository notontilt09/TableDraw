const express = require('express'); 
const helmet = require('helmet');
const cors = require('cors');
const scraper = require('./scraper');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.status(200).json('running');
})

server.post('/api/table', async (req, res) => {
  const { tableInfo, selectedOptions } = req.body;

  console.log('info\n', tableInfo);
  // const playerArray = tableInfo.trim().split('\n');
  for (player of tableInfo) {
    const name = player.name;
    await scraper.findPlayer(name);
  }
  console.log('options\n', selectedOptions);
  res.status(200).json({tableInfo, selectedOptions});
})

module.exports = server;