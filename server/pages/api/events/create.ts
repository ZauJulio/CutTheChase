import nextConnect from "next-connect";
import multer from "multer";

import uploadConfig from "../../../config/upload";

const upload = multer(uploadConfig);

const api = nextConnect({
  onError(error, req, res: any) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res: any) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

api.use(upload.array("images"));

api.post((req: any, res) => {
  console.log(req.body, req.files);

  res.status(200).json({ data: "success" });
});

export default api;

export const config = {
  api: {
    bodyParser: false,
  },
};
