"use strict";

var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var poststylus = require("poststylus");
var autoprefixer = require("autoprefixer");
var srcPath = path.join(__dirname, "src");

module.exports = {
  debug: true,
  devtool: "#cheap-module-eval-source-map",
  resolve: {
    root: srcPath,
    extensions: ["", ".js", ".jsx", ".styl"],
    modulesDirectories: ["node_modules", "src"]
  },
  entry: [
    "eventsource-polyfill", // necessary for hot reloading with IE
    "webpack-hot-middleware/client",
    path.join(srcPath, "index.js"),
  ],
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
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
      include: path.join(srcPath, "assets/css"),
      loaders: [
        "style",
        "css",
        "postcss"
      ]
    }, {
      test: /\.styl$/,
      include: path.join(srcPath, "assets/styles"),
      loaders: [
        "style",
        "css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]",
        "stylus"
      ]
    }, {
      test: /\.json$/,
      include: path.join(srcPath, "assets"),
      loader: "json"
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      include: path.join(srcPath, "assets/images"),
      loader: "file"
    }]
  },
  // misc plugins
  stylus: {
    use: [
      poststylus(["autoprefixer"])
    ]
  },
  postcss: [autoprefixer],
  // webpack plugins
  plugins: [
    new HtmlWebpackPlugin({
      favicon: path.join(srcPath, "assets/images/favicon.png"),
      hash: true,
      template: path.join(srcPath, "assets/index.html")
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
