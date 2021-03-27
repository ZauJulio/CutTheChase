import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { NextApiRequest, NextApiResponse } from "next-auth/_next";

import env from "../../../utils/env";


const options = {
  providers: [
    Providers.Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  site: process.env.NEXTAUTH_URL,
  database: process.env.DATABASE_URL,
  secret: process.env.SECRET,
  session: {
    jwt: true,
  },
  jwt: {},
  pages: {},
  callbacks: {},
  events: {},
  debug: false,
};

export default (req: NextApiRequest, res: NextApiResponse<any>) =>
  NextAuth(req, res, options);
