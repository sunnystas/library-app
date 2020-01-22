"use strict";

class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.status = statusCode;
        this.message = message;
    }
};

const handleError = (err, res) => {
    let { status, message } = err;
    if (!status) {
        status = 500;
    }
    return res.status(status).json({
        status: status,
        message: message
    });
};

module.exports = {
    ErrorHandler,
    handleError
};

