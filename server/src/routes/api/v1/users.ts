import { Router } from "express";
import UsersController from "../../../controllers/UsersController";

const users = Router();

users.get("/list", UsersController.index);
users.get("/user", UsersController.get);
users.get("/login", UsersController.login);
users.post("/create", UsersController.create);
// users.post("/update", UsersController.update);
users.post("/delete", UsersController.delete);

export default users;
