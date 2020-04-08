//Requires
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
