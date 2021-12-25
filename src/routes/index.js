import { Router } from 'express';
import user from './user';
import lists from './lists';
import tools from './tools';

const route = new Router();
route.get('/', async (req, res) => res.json({ message: 'welcome to my-tools backend' }));
route.use('/auth', user);
route.use('/lists', lists);
route.use('/tools', tools);

export default route;
