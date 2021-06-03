import Router from 'express';
import UserController from '../controllers/users.controllers';

const routes = Router();

routes.post('/signup', UserController.signup);
routes.post('/signin', UserController.signin);
routes.patch('/forgot', UserController.forgotPassword);

export default routes;
