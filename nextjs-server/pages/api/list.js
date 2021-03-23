// import UsersController from "../../../controllers/UsersController";
// import type { NextApiRequest, NextApiResponse } from "next";

// export default async function list(req: NextApiRequest, res:NextApiResponse) {
//   if (req.method === 'GET') {
//     try {
//       UsersController.index(req, res)
//     } catch (err) {
//       res.status(err).json({});
//       res.end()
//     }
//   } else {
//     res.status(405);
//     res.end();
//   }
// }

module.exports = (req, res) => {
  UsersController.index(req, res)
}
