// Webpack Common Config

const webpack = require('webpack');
//const dotenv = require('dotenv');
const Dotenv = require('dotenv-webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlWebPackPlugin = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: './index.html',
  minify: {
    collapseWhitespace: true,
  },
});

module.exports = () => {
  // const envKeys = Object.keys(env).reduce((prev, next) => {
  //   prev[`process.env.${next}`] = JSON.stringify(env[next]);
  //   return prev;
  // }, {});

  const env = new Dotenv({
    systemvars: true,
    defaults: true,
    expand: true
  });
  return {
    entry: {
      app: path.join(__dirname, '../src', 'index.tsx'),
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/',
    },
    target: 'web',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: '/node_modules/',
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader'],
        },
      ],
    },
    plugins: [htmlWebPackPlugin, env], //new webpack.DefinePlugin(envKeys)],
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        sassHelpers: path.resolve(__dirname, '../src/styles/01-helpers/helpers.scss'),
      },
    },
  };
};
