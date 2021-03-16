import 'reflect-metadata';

import dotenv from 'dotenv';
dotenv.config({
  path: process.env.NODE_ENV == 'development' ? '.env.development' : '.env'
});

import createConnection from './database/';
createConnection();

import express from 'express';
import { routes } from './routes';

const app = express();
app.use(express.json());
app.use(routes);

export { app };