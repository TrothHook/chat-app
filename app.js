const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

// serving the static files
app.use(express.static(path.join(__dirname, 'public')));

// logger
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// parse json data
app.use(express.json());

// parse form data
app.use(express.urlencoded({ extended: false }));

module.exports = app;
