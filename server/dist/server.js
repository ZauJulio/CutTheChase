"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var path_1 = __importDefault(require("path"));
var cors_1 = __importDefault(require("cors"));
var routes_1 = __importDefault(require("./routes/routes"));
var users_1 = __importDefault(require("./routes/api/v1/users"));
var events_1 = __importDefault(require("./routes/api/v1/events"));
var handler_1 = __importDefault(require("./errors/handler"));
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
////////
app.use('/', routes_1.default);
app.use('/v1/users', users_1.default);
app.use('/v1/events', events_1.default, express_1.default.static(path_1.default.join(__dirname, '..', 'uploads')));
app.use(handler_1.default);
app.listen(3333);
module.exports = app;
