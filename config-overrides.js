const { override, addWebpackPlugin } = require('customize-cra');
const { InjectManifest } = require('workbox-webpack-plugin');
const path = require('path');

module.exports = override(
  addWebpackPlugin(
    new InjectManifest({
      swSrc: path.join(__dirname, 'public/service-worker.js'),
      swDest: 'service-worker.js',
      exclude: [
        /\.map$/,
        /asset-manifest\.json$/,
        /LICENSE/,
        /\.js\.gz$/,
      ],
      maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10MB
    })
  )
);