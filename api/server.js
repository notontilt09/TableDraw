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
  for (player of tableInfo) {
    const name = player.name;
    const chips = player.chips;
    if (name) {
      await scraper.getPlayerInfo(name, chips, selectedOptions);
    }
  }
  // console.log('options\n', selectedOptions);
  console.log('done looping');
  res.status(200).json({tableInfo, selectedOptions});
})

module.exports = server;