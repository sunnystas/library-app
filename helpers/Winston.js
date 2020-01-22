"use strict";

const winston = require('winston');
const appRoot = require('app-root-path');

const options = {
    file: {
        level: 'error',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        humanReadableUnhandledException: true,
        json: false,
        maxsize: 104857600, // 10MB
        maxFiles: 5,
        colorize: true
    },
    console: {
        level: "debug",
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

const logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
    write: function(message, encoding) {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.info(message);
    },
};

module.exports = logger;
