import nextConnect from "next-connect";
import multer from "multer";
import cors from "cors";

import uploadConfig from "../../../config/upload";
import EventsController from "../../../controllers/Events";

const upload = multer(uploadConfig);

const api = nextConnect({
  onError(error, req, res: any) {
    res.status(501).json(error.message);
  },
  onNoMatch(req, res: any) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

api.use(upload.array("images"));
api.use(cors());

api.post((req: any, res: any) => {
  EventsController.create(req, res);
});

export const config = { api: { bodyParser: false } };

export default api;
