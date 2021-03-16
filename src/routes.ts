import { Router } from 'express';
export const routes = Router();

import { userController } from './controllers/UserController';
import { surveysController } from './controllers/SurveyController';
import { sendMailController } from './controllers/SendMailController';


routes.post('/users', userController.create);
routes.post('/surveys', surveysController.create);
routes.get('/surveys', surveysController.show);
routes.post('/sendMail', sendMailController.execute);
