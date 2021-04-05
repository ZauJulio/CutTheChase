import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import env from "../../../utils/env";
import axios from "axios";

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        name: { label: "name", type: "text" },
        email: { label: "email", type: "text" },
        password: { label: "senha", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const user = await axios.post(
            `${process.env.CREDENTIALS_AUTH_URL}/login`,
            {
              name: credentials.name,
              email: credentials.email,
              password: credentials.password,
            },

            { headers: { accept: "*/*", "Content-Type": "application/json" } }
          );

          user.data.sessionType = "credentials";

          if (user) {
            return { status: "success", data: user.data };
          }
        } catch (e) {
          const errorMessage = e.response.data.message;
          throw new Error(errorMessage + "&email=" + credentials.email);
        }
      },
    }),
    Providers.Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.Facebook({
      clientId: env.FACEBOOK_CLIENT_ID,
      clientSecret: env.FACEBOOK_CLIENT_SECRET,
    }),
    Providers.Discord({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    Providers.Twitter({
      clientId: env.TWITTER_CLIENT_ID,
      clientSecret: env.TWITTER_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session(session, token) {
      if (!sessionType === "credentials") {
        const userProfile = await axios.post(
          `${process.env.CREDENTIALS_AUTH_URL}/loginExternal`,
          {
            id: token.id,
            email: token.email,
          },

          { headers: { accept: "*/*", "Content-Type": "application/json" } }
        );

        console.log(token, userProfile);
      }
      session.accessToken = token.accessToken;
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
  secret: process.env.SECRET,
  session: {
    jwt: true,
  },
  pages: {
    signIn: "/auth/signin",
  },
  debug: false,
});
