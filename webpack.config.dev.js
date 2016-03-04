"use strict";

var path = require("path");
var assetsPath = path.resolve("assets");
var srcPath = path.resolve("src");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var autoprefixer = require("autoprefixer");
var webpack = require("webpack");

module.exports = {
  debug: true,
  devtool: "#cheap-module-eval-source-map",
  resolve: {
    // for big apps, resolve the top level directories
    alias: {
      "assets": assetsPath
    },
    root: srcPath,
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx", ".styl"]
  },
  entry: [
    "eventsource-polyfill", // necessary for hot reloading with IE
    "webpack-hot-middleware/client",
    // "./src/index",
    path.resolve(srcPath, "index")
  ],
  output: {
    path: path.resolve("dist"),
    filename: "[name].js",
    pathInfo: true
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: srcPath,
      loader: "babel"
    }, {
      test: /\.css$/,
      include: [
        path.resolve(assetsPath, "css"),
        path.resolve("node_modules")
      ],
      loaders: [
        "style",
        "css",
        "postcss"
      ]
    }, {
      test: /\.styl$/,
      include: path.resolve(assetsPath, "styles"),
      loaders: [
        "style",
        "css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]",
        "postcss",
        "stylus"
      ]
    }, {
      test: /\.json$/,
      include: assetsPath,
      loader: "json"
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      include: assetsPath,
      loader: "file"
    }]
  },
  postcss: [autoprefixer],
  // webpack plugins
  plugins: [
    new HtmlWebpackPlugin({
      favicon: path.resolve(assetsPath, "images/favicon.png"),
      template: path.resolve(assetsPath, "index.html")
    }),
    new webpack.DefinePlugin({
      "__DEV__": true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProgressPlugin(function(percentage, message) {
      process.stderr.write(message + "\r");
    }),
    new webpack.ProvidePlugin({
      "$": "jquery",
      "jQuery": "jquery",
      "window.jQuery": "jquery",
      "fetch": "isomorphic-fetch"
    })
  ]
}
