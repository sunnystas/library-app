"use strict";

require("dotenv-safe").config({ allowEmptyValues: true });
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const winston = require("./helpers/Winston");
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const { handleError } = require('./helpers/error');
const Router = require("./routers/InitRouter")();

app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(logger("dev", { stream: winston.stream }))
    .use(express.static(path.join(__dirname, process.env.SERVER_PUBLIC_PATH)))
    .use(cors())
    .use('/', Router)
    .use(function(req, res, next) {
        next(createError(404));
    })
    .use(async (err, req, res, next) => {
        winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        handleError(err, res);
    });
app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

module.exports = app;
