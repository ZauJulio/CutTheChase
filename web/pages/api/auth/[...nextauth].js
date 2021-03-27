import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import env from "../../../utils/env";

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        firstName: { label: "firstName", type: "text" },
        lastName: { label: "lastName", type: "text" },
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const user = (credentials) => {
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid.
          // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          console.log(credentials);
          return null;
        };
        if (user) {
          return user;
        } else {
          return null;
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
  database: global.env.DATABASE_URL,
  secret: global.env.SECRET,
  session: {
    jwt: true,
  },
  jwt: {},
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {},
  events: {},
  debug: false,
});
