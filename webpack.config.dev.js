"use strict";

var path = require("path");
var assetsPath = path.resolve("src/assets");
var srcPath = path.resolve("src");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var autoprefixer = require("autoprefixer");
var webpack = require("webpack");

module.exports = {
  debug: true,
  devtool: "#source-map",
  devServer: {
    contentBase: "dist",
    historyApiFallback: true,
    hot: true,
    proxy: {
      "/api/*": "http://localhost:5000"
    },
    stats: {
      chunks: false
    }
  },
  resolve: {
    // for big apps, resolve the top level directories
    // alias: {
    //   "assets": assetsPath
    // },
    root: srcPath
  },
  entry: [
    "webpack-dev-server/client?http://localhost:8080/",
    "webpack/hot/dev-server",
    path.resolve(srcPath, "index")
  ],
  output: {
    filename: "[name].js",
    path: path.resolve("dist"),
    pathInfo: true,
    publicPath: ""
  },
  module: {
    loaders: [{
      test: /\.js$/,
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
  plugins: [
    new HtmlWebpackPlugin({
      favicon: path.resolve(assetsPath, "images/favicon.png"),
      template: path.resolve(assetsPath, "index.html")
    }),
    new webpack.DefinePlugin({
      "__DEV__": true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProgressPlugin(function(percentage, message) {
      process.stderr.write(message + "\r");
    }),
    new webpack.ProvidePlugin({
      "fetch": "isomorphic-fetch"
    })
  ]
}
