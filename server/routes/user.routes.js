import Router from 'express';
import UserController from '../controllers/users.controllers';

const routes = Router();

routes.post('/user', UserController.signup);

export default routes;
