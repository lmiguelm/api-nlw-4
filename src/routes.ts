import { Router } from 'express';
export const routes = Router();

import { userController } from './controllers/UserController';

routes.post('/users', userController.create);
