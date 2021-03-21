import { Request, Response } from "express";

import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/upload";
import EventsController from "./controllers/EventsController";
import UsersController from "./controllers/UsersController";

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/", function (request: Request, response: Response) {
  response.sendFile(__dirname + "/public/index.html");
});

// Lists
routes.get("/events", UsersController.index);
// Single by id
routes.get("/event", UsersController.get);
// Add
routes.post("/eventCreate", upload.array("images"), UsersController.create);
// Update by id
// routes.post("/eventUpdate", upload.array("images"), UsersController.update);
// Delete by id
routes.post("/eventDelete", UsersController.delete);

// Lists
routes.get("/users", UsersController.index);
// Single by email
routes.get("/user", UsersController.get);
// Single by email and password
routes.get("/login", UsersController.login);
// Add
routes.post("/userCreate", UsersController.create);
// Update by email
// routes.post("/userUpdate", UsersController.update);
// Delete by email
routes.post("/userDelete", UsersController.delete);

export default routes;
