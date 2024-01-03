import { NextFunction, Request, Response } from 'express';
import fs from 'fs';

const myLogger = (req: Request, res: Response, next: NextFunction) => {
  const filePath = './src/logs/requests.txt';
  const currentDate = new Date();
  const date = currentDate.toLocaleDateString();
  const time = currentDate.toLocaleTimeString();

  const message = `Method: ${req.method}, Path: ${req.path}, Date: ${date}, Time: ${time}\n`;

  fs.appendFile(filePath, message, (err) => {
    if (err) {
      return next(new Error('FAILED TO LOG'));
    }
    next();
  })
};

export default myLogger;