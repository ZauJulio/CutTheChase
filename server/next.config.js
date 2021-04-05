const path = require('path')

module.exports = {
  env: {
    MONGODB_SECRET: process.env.MONGODB_SECRET,
    ENV_ENC_SECRET: process.env.ENV_ENC_SECRET,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}