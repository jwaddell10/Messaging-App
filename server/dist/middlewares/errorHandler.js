"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
const errorHandler = (err, req, res, next) => {
    if (err instanceof HttpException) {
        res.status(err.status).json({
            status: 'error',
            message: err.message
        });
    }
    else {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    }
};
exports.default = errorHandler;
