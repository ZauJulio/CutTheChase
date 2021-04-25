import EventsController from "../../../controllers/EventsController";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function get(req: NextApiRequest, res:NextApiResponse) {
  if (req.method === 'GET') {
    try {
      EventsController.get(req, res)
    } catch (err) {
      res.status(err).json({});
      res.end()
    }
  } else {
    res.status(405);
    res.end();
  }
}


