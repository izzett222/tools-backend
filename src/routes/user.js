import { Router } from 'express';
import UserController from '../controllers/user';
import { signupSchema, loginSchema } from '../middlewares/validation/user';
import validate from '../middlewares/validation/validate';

const route = new Router();

route.post('/signup', validate(signupSchema), UserController.create);
route.post('/login', validate(loginSchema), UserController.login);

export default route;
