import { Router } from 'express';
export const routes = Router();

import { userController } from './controllers/UserController';
import { surveysController } from './controllers/SurveyController';

routes.post('/users', userController.create);
routes.post('/surveys', surveysController.create);
routes.get('/surveys', surveysController.show);
