const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

const config = {
  entry: {
    idb: './public/js/idb.js',
    index: './public/js/index.js',
    serviceWorker: './public/js/service-worker.js'
  },
  output: {
    path: path.join(__dirname + "/dist"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name(file) {
                return '[path][name].[ext]';
              },
              publicPath(url) {
                return url.replace('../', '/assets/');
              }
            }
          },
          {
            loader: 'image-webpack-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    }),
    new WebpackPwaManifest({
        name: 'budget-tracker',
        short_name: "expenses",
        theme_color: "#ffffff",
        orientation: "portrait",
        start_url: "../index.html",
        description: "budget tracking app that allows you to record expenses online and off.",
        background_color: "#ffffff",
        display: "standalone",
        fingerprints: false,
        inject: false,
      icons: [
        {
          src: path.resolve('public/icons/icon-512x512.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('public', 'icons')
        }
      ]
    })
  ],
  mode: 'development'
};

module.exports = config;
