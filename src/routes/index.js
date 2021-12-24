import { Router } from 'express';
import user from './user';

const route = new Router();
route.get('/', async (req, res) => res.json({ message: 'welcome to my-tools backend' }));
route.use('/auth', user);

export default route;
