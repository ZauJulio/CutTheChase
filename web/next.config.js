const path = require("path");
const withImages = require("next-images");

let secureEnv = require("secure-env");

const enc_env = secureEnv({
  secret: process.env.ENV_SECRET,
});

process.env = {
  ...process.env,
  ...enc_env,
};

module.exports = withImages({
  env: {
    CTC_URL: process.env.CTC_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    MAPBOX_SECRET: process.env.MAPBOX_SECRET,
    CREDENTIALS_AUTH_URL: process.env.CREDENTIALS_AUTH_URL,
  },
  sassOptions: {
    includePaths: [
      path.join(__dirname, "styles"),
      path.join(__dirname, "assets"),
    ],
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
});
