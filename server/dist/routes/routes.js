"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var path_1 = __importDefault(require("path"));
var routes = express_1.Router();
var homePath = path_1.default.join(__dirname, '..', 'public', "index.html");
var v1 = path_1.default.join(__dirname, '..', 'public', "api", "v1.html");
routes.get("/", function (request, response) {
    response.sendFile(homePath);
});
routes.get("/v1", function (request, response) {
    response.sendFile(v1);
});
exports.default = routes;
