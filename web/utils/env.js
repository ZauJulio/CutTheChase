let secureEnv = require("secure-env");
global.env = secureEnv({ secret: process.env.ENV_ENC_SECRET });

export default global.env;
