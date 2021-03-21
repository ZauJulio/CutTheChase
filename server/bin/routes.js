"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var upload_1 = __importDefault(require("./config/upload"));
var UsersController_1 = __importDefault(require("./controllers/UsersController"));
var routes = express_1.Router();
var upload = multer_1.default(upload_1.default);
// Lists
routes.get("/events", UsersController_1.default.index);
// Single by id
routes.get("/event", UsersController_1.default.get);
// Add
routes.post("/eventCreate", upload.array("images"), UsersController_1.default.create);
// Update by id
// routes.post("/eventUpdate", upload.array("images"), UsersController.update);
// Delete by id
routes.post("/eventDelete", UsersController_1.default.delete);
// Lists
routes.get("/users", UsersController_1.default.index);
// Single by email
routes.get("/user", UsersController_1.default.get);
// Single by email and password
routes.get("/login", UsersController_1.default.login);
// Add
routes.post("/userCreate", UsersController_1.default.create);
// Update by email
// routes.post("/userUpdate", UsersController.update);
// Delete by email
routes.post("/userDelete", UsersController_1.default.delete);
exports.default = routes;
