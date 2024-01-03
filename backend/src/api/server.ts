import express, { Application, NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';

import { dev } from '../config';
import { connectDB } from '../config/db';

import authRouter from '../routers/authRoute';
import productsRouter from '../routers/productsRoute';
import usersRouter from '../routers/usersRoute';
import ordersRouter from '../routers/ordersRoute';
import categoriesRouter from '../routers/categoriesRoute';

import myLogger from '../middlewares/logger';
import { apiErrorHandler } from '../middlewares/errorHandler';
import ApiError from '../errors/ApiError';

const app: Application = express();
const port: number = dev.app.port;

app.use('/public', express.static('public'));
app.use(myLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:3000', // add frontend vercel link here
  credentials: true
}));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error =  new ApiError(404, "Route not found");
  next(error);
});

app.listen(port, async () => {
  console.log(`The server is running at http://localhost:${port}`);
  connectDB();
});

app.use(apiErrorHandler);