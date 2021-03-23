import { Request, Response } from "express";
import { Router } from "express";
import path from "path";

const routes = Router();
const homePath = path.join(__dirname, '..', 'public', "index.html")

const v1 = path.join(__dirname, '..', 'public', "api", "v1.html")

routes.get("/", function (request: Request, response: Response) {
  response.sendFile(homePath);
});

routes.get("/v1", function (request: Request, response: Response) {
  response.sendFile(v1);
});

export default routes;
