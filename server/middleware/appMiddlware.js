const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const override = require('method-override');
const config = require('../config/config');
// setup global middleware here

module.exports = function (app) {
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(express.static(config.static));
    app.use(cors());
    app.use(override());
};
