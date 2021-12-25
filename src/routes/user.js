import { Router } from 'express';
import UserController from '../controllers/user';
import access from '../middlewares/access';
import { signupSchema, loginSchema } from '../middlewares/validation/user';
import validate from '../middlewares/validation/validate';

const route = new Router();

route.post('/signup', validate(signupSchema), UserController.create);
route.post('/login', validate(loginSchema), UserController.login);
route.get('/user', access, UserController.getUser);

export default route;
