import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../config/upload";
import EventsController from "../../../controllers/EventsController";

const events = Router();
const upload = multer(uploadConfig);

events.get("/list", EventsController.index);
events.get("/event", EventsController.get);
events.post("/create", upload.array("images"), EventsController.create);
// events.post("/update", upload.array("images"), EventsController.update);
events.post("/delete", EventsController.delete);

export default events;
