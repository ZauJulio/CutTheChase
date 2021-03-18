import { Router } from "express";
import multer from "multer";

import uploadConfig from './config/upload';
import EventsController from "./controllers/EventsController";
import UsersController from "./controllers/UsersController";

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/events", EventsController.index);
routes.get("/events/:id", EventsController.show);
routes.post("/events", upload.array('images'), EventsController.create);

routes.get("/users", UsersController.index);
routes.get("/users/:id", UsersController.get);
routes.post("/users", upload.array('images'), UsersController.create);

export default routes;
