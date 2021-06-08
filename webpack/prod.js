// Webpack Production config

const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const common = require('./common');

const cleanWebpackPlugin = new CleanWebpackPlugin();
const miniCssExtractPlugin = new MiniCssExtractPlugin({});
const optimizeCSSAssetsPlugin = new OptimizeCSSAssetsPlugin();

const uglifyJSPlugin = new UglifyJSPlugin({
  sourceMap: true,
  uglifyOptions: {
    compress: {
      inline: false,
    },
  },
});

module.exports = merge(common(), {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  devtool: 'source-map',
  optimization: {
    // minimizer: [uglifyJSPlugin],
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        defaults: false,
        commons: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
        },
      },
    },
  },
  plugins: [cleanWebpackPlugin, optimizeCSSAssetsPlugin, miniCssExtractPlugin],
});
