const db = require('../config/connection');
const cleanDB = require('./cleanDb');
const { Champion } = require('../models');

const championData = require('./champions.json');

db.once('open', async () => {
  await cleanDB('Champion', 'champions');

  await Champion.insertMany(championData);

  console.log('Champions seeded!');
  process.exit(0);

});

// I need to add The description along with the name. 
