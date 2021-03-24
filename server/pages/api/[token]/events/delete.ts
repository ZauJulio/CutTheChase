import EventsController from "../../../../controllers/EventsController";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function _delete(req: NextApiRequest, res:NextApiResponse) {
  if (req.method === 'POST') {
    try {
      EventsController.delete(req, res)
    } catch (err) {
      res.status(err).json({});
      res.end()
    }
  } else {
    res.status(405);
    res.end();
  }
}


