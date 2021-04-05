const path = require("path");
const withImages = require("next-images");

module.exports = withImages({
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
    MAPBOX_SECRET: process.env.MAPBOX_SECRET,
    CREDENTIALS_AUTH_URL: process.env.CREDENTIALS_AUTH_URL,
  },
  ignoreTypes: ["svg"],
  webpack(config, options) {
    return config;
  },
  async headers() {
    return [
      {
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
