import { ErrorRequestHandler } from 'express';

class HttpException extends Error {
    status: number;
    message: string;
  
    constructor(status: number, message: string) {
      super(message);
      this.status = status;
      this.message = message;
    }
  }

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HttpException) {
    res.status(err.status).json({
      status: 'error',
      message: err.message
    });
  } else {
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

export default errorHandler;