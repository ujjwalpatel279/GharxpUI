// Webpack Dev Config

const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./common.js');

module.exports = () => {
  return merge(common(), {
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.(s*)css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        },
      ],
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 8000,
      historyApiFallback: true,
    },
  });
};
