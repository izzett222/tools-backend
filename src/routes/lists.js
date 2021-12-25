import { Router } from 'express';
import ListsController from '../controllers/lists';
import access from '../middlewares/access';

const routes = new Router();

routes.post('/new', access, ListsController.create);
routes.get('/', access, ListsController.getAllLists);

export default routes;
