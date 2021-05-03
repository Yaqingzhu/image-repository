const express = require('express');

app.use(express.urlencoded({ extended: true }));

const app = express();
const port = process.env.API_PORT || 11234; // Port for the API