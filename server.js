//Requires
const express = require('express');
const mongoose = require('mongoose');

//Initialize Express
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('./public/'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Requiring our models for syncing
// const db = require('./models');
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/yahoo';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

//=====================================================================
// Routes.
//=====================================================================

require('./routes/apiRoute')(app);
require('./routes/htmlRoute')(app);

//Start the server to begin listening
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
