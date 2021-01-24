const { checkUser } = require('../middlewares/authCheck');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const express = require('express');
const app = express();

//routes handlers
const home = require('../routes/home');
const smoothies = require('../routes/smoothies');
const auth = require('../routes/auth');

//middelwares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(cookieParser());

//view engine
app.set('view engine', 'ejs');

//routes
app.get('*', checkUser);
app.use('/', home);
app.use('/smoothies', smoothies);
app.use('/auth', auth);

module.exports = app;