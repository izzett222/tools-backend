import { Router } from 'express';
import ToolsController from '../controllers/tools';
import access from '../middlewares/access';

const routes = new Router();
routes.post('/add', access, ToolsController.create);
routes.get('/', access, ToolsController.getAllTools);

export default routes;
