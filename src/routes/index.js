import { Router } from 'express';

const route = new Router();

route.get('/', (req, res) => res.json('welcome to my-tools backend'));

export default route;
