import EventsController from "../../../controllers/Events";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function list(req: NextApiRequest, res:NextApiResponse) {
  if (req.method === 'GET') {
    try {
      EventsController.index(req, res)
    } catch (err) {
      res.status(err).json({});
      res.end()
    }
  } else {
    res.status(405);
    res.end();
  }
}


