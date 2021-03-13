const webpack = require('webpack');

module.exports = {
  entry: './web/pages/index.tsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          'file-loader',
          'svg-transform-loader',
        ]
      },
    ],
  },
};