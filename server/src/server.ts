import express from 'express';
import 'express-async-errors';
import path from 'path';
import cors from 'cors';

import routes from "./routes/routes";
import users from "./routes/api/v1/users";
import events from "./routes/api/v1/events";

import errorHandler from './errors/handler';

const app = express();

app.use(cors());
app.use(express.json());

////////
app.use('/', routes);
app.use('/v1/users', users);
app.use('/v1/events', events, express.static(path.join(__dirname, '..', 'uploads')));

app.use(errorHandler)

app.listen(3333);
