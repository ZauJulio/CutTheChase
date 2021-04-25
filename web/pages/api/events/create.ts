import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import api from "../../../services/api";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  let token = null;

  if (session) token = session.accessToken;
  else res.status(401).end();

  const formData = req.body;
  
  api
    .CTC({
      method: "post",
      url: "/events/create",
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": `multipart/form-data; charset=utf-8;`,
      },
    })
    .then(function (response) {
      console.log(response);
      res.status(200).end();
    })
    .catch(function (response) {
      console.log(response);
      res.status(500).end();
    });
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: Infinity,
    },
  },
};
