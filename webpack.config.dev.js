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
    historyApiFallback: true,
    proxy: {
      "/api/*": "http://localhost:5000"
    }
  },
  resolve: {
    // for big apps, resolve the top level directories
    // alias: {
    //   "assets": assetsPath
    // },
    root: srcPath
  },
  entry: path.resolve(srcPath, "index"),
  output: {
    path: path.resolve("dist"),
    filename: "[name].js",
    pathInfo: true
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
    new webpack.ProvidePlugin({
      "fetch": "isomorphic-fetch"
    })
  ]
}
