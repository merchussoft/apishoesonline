const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { getNumberEnv } = require('./App/config/Config');


const app = express();



app.set('port', getNumberEnv('PORT'));


app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(require('./App/Routes/uploads-route'));


module.exports = app;