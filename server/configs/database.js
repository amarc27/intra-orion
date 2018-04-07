'use strict';

const mongoose = require('mongoose');
const dbName = 'intra-orion';
const mongUri = process.env.MONGODB_URI || `mongodb://localhost/${dbName}`;

// connect to the database
mongoose.connect(mongUri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {  
  console.log(`Connected to ${mongUri}`);
});