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
  try {
    for (player of tableInfo) {
      const name = player.name;
      const chips = player.chips;
      if (name) {
        const result = await scraper.getPlayerInfo(name, chips, selectedOptions);
        players.push(result);
      }
    }
    console.log('done looping');
    res.status(200).json({ players });
  } catch (error) {
    console.log('error grabbing info');
    res.status(500).json({ success: false, message: 'Error retreiving player data.  Please check spelling of player names and try again.' });
  }
  // console.log('options\n', selectedOptions);
})

module.exports = server;