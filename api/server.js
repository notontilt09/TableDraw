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

  const players = [];
  for (player of tableInfo) {
    const name = player.name;
    const chips = player.chips;
    if (name) {
      const result = await scraper.getPlayerInfo(name, chips, selectedOptions);
      players.push(result);
    }
  }
  // console.log('options\n', selectedOptions);
  console.log('done looping');
  res.status(200).json({ players });
})

module.exports = server;