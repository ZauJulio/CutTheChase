"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UsersController_1 = __importDefault(require("../../../controllers/UsersController"));
var users = express_1.Router();
users.get("/list", UsersController_1.default.index);
users.get("/user", UsersController_1.default.get);
users.get("/login", UsersController_1.default.login);
users.post("/create", UsersController_1.default.create);
// users.post("/update", UsersController.update);
users.post("/delete", UsersController_1.default.delete);
exports.default = users;
