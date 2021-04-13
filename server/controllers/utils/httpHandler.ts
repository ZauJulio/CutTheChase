import { NextApiRequest, NextApiResponse } from "next";

export default {
  Ok(data: any, res: NextApiResponse) {
    res.status(200).json(data);
    res.end();
  },
  
  NotFound(res: NextApiResponse) {
    res.status(404).end();
  },
  
  ServerError(err: any, res: NextApiResponse) {
    console.log(err);

    res.status(500).json(err);
    res.end();
  },

  Forbidden(res: NextApiResponse) {
    res.status(403).end();
  },

  Unauthorized(res: NextApiResponse) {
    res.status(401).end();
  },
  
  MethodNotAllowed(req: NextApiRequest, res: NextApiResponse, method: string) {
    if (req.method !== method) {
      res.status(405).end();
      return true;
    } else return false;
  },

  ProfileNotFound(res: NextApiResponse, userData: String) {
    res.status(404).json({
      error: `UserAppProfileNotFound: ${userData}`,
      resolve: "Try delete account or Contact Support",
    });
    res.end();
  },
};
