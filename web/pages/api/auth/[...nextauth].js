import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import env from "../../../utils/env";

const options = {
  providers: [
    Providers.Credentials({
      name: "Email",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "user@emgail.com",
        },
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
      clientSecret: env.TWITTER_CLIENT_SECRET
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: null // If set, new users will be directed here on first sign in
  }
};

export default (req, res) => NextAuth(req, res, options);
