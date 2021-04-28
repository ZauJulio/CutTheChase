import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

import NextAuth, { NextAuthOptions, User } from "next-auth";
import Providers from "next-auth/providers";

import axios, { AxiosResponse } from "axios";

import { enc_env } from "../../../utils/env";

const authorize = async (credentials) => {
  let user: AxiosResponse<User>;
  const { name, email, password } = credentials;

  try {
    user =
      name === ""
        ? await axios.get(`${process.env.CTC_AUTH_URL}/login`, {
            params: { email, password },
          })
        : await axios.post(`${process.env.CTC_AUTH_URL}/signin`, {
            name,
            email,
            password,
          });

    return user ? user.data : null;
  } catch (error) {
    console.log(error);
    throw new Error(Object.assign(error, email));
  }
};

const externalAuthorize = async (providerAccountId: string) => {
  try {
    const session = await axios.get(
      `${process.env.CTC_AUTH_URL}/externalLogin`,
      {
        params: { providerAccountId },
      }
    );

    return session.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const options: NextAuthOptions = {
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        name: { label: "name", type: "text" },
        email: { label: "email", type: "text" },
        password: { label: "senha", type: "password" },
      },
      authorize: authorize,
    }),
    Providers.Google({
      clientId: enc_env.GOOGLE_CLIENT_ID,
      clientSecret: enc_env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.Facebook({
      clientId: enc_env.FACEBOOK_CLIENT_ID,
      clientSecret: enc_env.FACEBOOK_CLIENT_SECRET,
    }),
    Providers.Discord({
      clientId: enc_env.DISCORD_CLIENT_ID,
      clientSecret: enc_env.DISCORD_CLIENT_SECRET,
    }),
    Providers.Twitter({
      clientId: enc_env.TWITTER_CLIENT_ID,
      clientSecret: enc_env.TWITTER_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    redirect: async (url, baseUrl) => {
      return baseUrl;
    },
    jwt: async (token, user, account: any) => {
      // The Oauth access token comes from Account,
      // while the access token for credentials comes
      // from User
      if (!token.accessToken) {
        if (user && user.accessToken) {
          token.accessToken = user.accessToken;
          token.refreshToken = user.refreshToken;
          token.accessTokenExpires = user.accessTokenExpires;
        } else if (account && account.accessToken) {
          const idToken = jwt.decode(account.idToken);
          const providerAccountId = idToken.sub;
          const session: any = await externalAuthorize(providerAccountId);

          token.accessToken = session.accessToken;
          token.refreshToken = session.refreshToken;
          token.accessTokenExpires = session.accessTokenExpires;
        }
      }

      return token;
    },
    session: async (session: any, userOrToken: any) => {
      if (userOrToken) {
        session.accessToken = userOrToken.accessToken;
        session.refreshToken = userOrToken.refreshToken;
        session.accessTokenExpires = userOrToken.accessTokenExpires;
      }

      return session;
    },
  },
  database: {
    type: "mongodb",
    useNewUrlParser: true,
    url: process.env.MONGODB_URL,
    ssl: true,
    useUnifiedTopology: true,
    authSource: "admin",
  },
  secret: process.env.AUTH_SECRET,
  session: {
    jwt: true,
    maxAge: Number(process.env.EXPIRATION_TIME_SEC),
  },
  pages: {
    signIn: "/auth/signin",
  },
  debug: false,
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
