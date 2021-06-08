const Autoprefixer = require('autoprefixer');
const PostCssCustomProperties = require('postcss-custom-properties');
const PostCssVr = require('postcss-vr');
const PostCssFocus = require('postcss-focus');
const PostCssPxToRem = require('postcss-pxtorem');

module.exports = {
  plugins: [
    Autoprefixer({ browserlist: ['&gt; 1%'] }),
    PostCssCustomProperties,
    PostCssVr,
    PostCssFocus,
    PostCssPxToRem({ propList: ['*'] }),
  ],
};
