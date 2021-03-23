import EventsController from "../../../controllers/EventsController";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function create(req: NextApiRequest, res:NextApiResponse) {
  if (req.method === 'POST') {
    try {
      EventsController.create(req, res)
    } catch (err) {
      res.status(err).json({});
      res.end()
    }
  } else {
    res.status(405);
    res.end();
  }
}


