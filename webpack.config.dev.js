"use strict";

var path = require("path");
var srcPath = path.resolve("src");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var autoprefixer = require("autoprefixer");
var webpack = require("webpack");

module.exports = {
  debug: true,
  devtool: "#source-map",
  devServer: {
    // contentBase technically not needed...
    // b/c everything is served from mem
    contentBase: path.resolve("dist"),
    historyApiFallback: true,
    hot: true,
    inline: true,
    proxy: { "/api/*": "http://localhost:5000" },
    stats: { chunks: false }
  },
  resolve: {
    root: srcPath
  },
  entry: [
    "babel-polyfill",
    path.resolve(srcPath, "index"),
    "webpack-hot-middleware/client"
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve("dist"),
    pathinfo: true,
    publicPath: "/"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: srcPath,
      loader: "babel"
    }, {
      test: /\.css$/,
      include: path.resolve(srcPath, "assets/css"),
      loaders: [
        "style",
        "css",
        "postcss"
      ]
    }, {
      test: /\.styl$/,
      include: path.resolve(srcPath, "assets/styles"),
      loaders: [
        "style?sourceMap",
        "css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]",
        "postcss",
        "stylus?sourceMap"
      ]
    }, {
      test: /\.json$/,
      include: path.resolve(srcPath, "assets"),
      loader: "json"
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      include: path.resolve(srcPath, "assets"),
      loader: "file"
    }]
  },
  postcss: [autoprefixer],
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.ejs",
      favicon: path.resolve(srcPath, "assets/images/favicon.png"),
      template: path.resolve(srcPath, "assets/template.dev.ejs")
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
      "fetch": "isomorphic-fetch"
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
};
