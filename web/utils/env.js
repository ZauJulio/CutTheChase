let secureEnv = require("secure-env");

export const enc_env = secureEnv({
  secret: process.env.ENV_SECRET,
});
