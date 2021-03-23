"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var upload_1 = __importDefault(require("../../../config/upload"));
var EventsController_1 = __importDefault(require("../../../controllers/EventsController"));
var events = express_1.Router();
var upload = multer_1.default(upload_1.default);
events.get("/list", EventsController_1.default.index);
events.get("/event", EventsController_1.default.get);
events.post("/create", upload.array("images"), EventsController_1.default.create);
// events.post("/update", upload.array("images"), EventsController.update);
events.post("/delete", EventsController_1.default.delete);
exports.default = events;
