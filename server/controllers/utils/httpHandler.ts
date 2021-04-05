import { NextApiRequest, NextApiResponse } from "next";

export function httpOk(data: any, res: NextApiResponse) {
  res.status(200).json(data);
  res.end();
}

export function httpNotFound(res: NextApiResponse) {
  res.status(404).end();
}

export function httpServerError(err: any, res: NextApiResponse) {
  res.status(500).json(err);
  res.end();
}

export function httpMethodNotAllowed(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).end();
    return true;
  } else return false;
}
