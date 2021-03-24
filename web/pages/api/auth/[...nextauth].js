// import NextAuth from "next-auth";
// import Providers from "next-auth/providers";
import env from "../../../utils/env";

// export default NextAuth({
//   providers: [
//     Providers.Email({
//       server: env.EMAIL_SERVER,
//       from: env.EMAIL_FROM,
//     }),
//     Providers.Google({
//       clientId: env.GOOGLE_CLIENT_ID,
//       clientSecret: env.GOOGLE_CLIENT_SECRET,
//     }),
//     Providers.Instagram({
//       clientId: env.INSTAGRAM_CLIENT_ID,
//       clientSecret: env.INSTAGRAM_CLIENT_SECRET,
//     }),
//     Providers.Facebook({
//       clientId: env.FACEBOOK_CLIENT_ID,
//       clientSecret: env.FACEBOOK_CLIENT_SECRET,
//     }),
//     Providers.Discord({
//       clientId: env.DISCORD_CLIENT_ID,
//       clientSecret: env.DISCORD_CLIENT_SECRET,
//     }),
//     Providers.Credentials({
//       name: "Email",
//       credentials: {
//         username: {
//           label: "Email",
//           type: "text",
//           placeholder: "user@emgail.com",
//         },
//         password: { label: "Senha", type: "password" },
//       },
//       async authorize(credentials) {
//         const user = (credentials) => {
//           // You need to provide your own logic here that takes the credentials
//           // submitted and returns either a object representing a user or value
//           // that is false/null if the credentials are invalid.
//           // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
//           console.log(credentials);
//           return null;
//         };
//         if (user) {
//           return user;
//         } else {
//           return null;
//         }
//       },
//     }),
//   ],
//   // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
//   // https://next-auth.js.org/configuration/databases
//   //
//   // Notes:
//   // * You must to install an appropriate node_module for your database
//   // * The Email provider requires a database (OAuth providers do not)
//   database: env.DATABASE_URL,

//   // The secret should be set to a reasonably long random string.
//   // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
//   // a separate secret is defined explicitly for encrypting the JWT.
//   secret: env.SECRET,

//   session: {
//     // Use JSON Web Tokens for session instead of database sessions.
//     // This option can be used with or without a database for users/accounts.
//     // Note: `jwt` is automatically set to `true` if no database is specified.
//     jwt: true,

//     // Seconds - How long until an idle session expires and is no longer valid.
//     // maxAge: 30 * 24 * 60 * 60, // 30 days

//     // Seconds - Throttle how frequently to write to database to extend a session.
//     // Use it to limit write operations. Set to 0 to always update the database.
//     // Note: This option is ignored if using JSON Web Tokens
//     // updateAge: 24 * 60 * 60, // 24 hours
//   },

//   // JSON Web tokens are only used for sessions if the `jwt: true` session
//   // option is set - or by default if no database is specified.
//   // https://next-auth.js.org/configuration/options#jwt
//   jwt: {
//     // A secret to use for key generation (you should set this explicitly)
//     // secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
//     // Set to true to use encryption (default: false)
//     // encryption: true,
//     // You can define your own encode/decode functions for signing and encryption
//     // if you want to override the default behaviour.
//     // encode: async ({ secret, token, maxAge }) => {},
//     // decode: async ({ secret, token, maxAge }) => {},
//   },

//   // You can define custom pages to override the built-in ones. These will be regular Next.js pages
//   // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
//   // The routes shown here are the default URLs that will be used when a custom
//   // pages is not specified for that route.
//   // https://next-auth.js.org/configuration/pages
//   pages: {
//     signIn: '/auth/signin',
//     signOut: '/auth/signout',
//     error: '/auth/error', // Error code passed in query string as ?error=
//     verifyRequest: '/auth/verify-request', // (used for check email message)
//     newUser: null // If set, new users will be directed here on first sign in
//   },
//   // Callbacks are asynchronous functions you can use to control what happens
//   // when an action is performed.
//   // https://next-auth.js.org/configuration/callbacks
//   callbacks: {
//     // async signIn(user, account, profile) { return true },
//     // async redirect(url, baseUrl) { return baseUrl },
//     // async session(session, user) { return session },
//     // async jwt(token, user, account, profile, isNewUser) { return token }
//   },

//   // Events are useful for logging
//   // https://next-auth.js.org/configuration/events
//   events: {},

//   // Enable debug messages in the console if you are having problems
//   debug: false,
// });

import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    Providers.Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.Instagram({
      clientId: env.INSTAGRAM_CLIENT_ID,
      clientSecret: env.INSTAGRAM_CLIENT_SECRET,
    }),
    Providers.Facebook({
      clientId: env.FACEBOOK_CLIENT_ID,
      clientSecret: env.FACEBOOK_CLIENT_SECRET,
    }),
    Providers.Discord({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: "null" // If set, new users will be directed here on first sign in
  }
};

export default (req, res) => NextAuth(req, res, options);
