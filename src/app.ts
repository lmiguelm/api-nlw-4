import 'reflect-metadata';

import dotenv from 'dotenv';
dotenv.config();

import createConnection from './database/';
createConnection();

import express from 'express';
import 'express-async-errors';
import { routes } from './routes';
import { MiddlewareError } from './middlewares/MiddlewareErrors';

export const app = express();
app.use(express.json());
app.use(routes);
app.use(MiddlewareError);