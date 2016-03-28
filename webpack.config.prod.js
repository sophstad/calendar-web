"use strict";

var path = require("path");
var srcPath = path.resolve("src");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var autoprefixer = require("autoprefixer");
var webpack = require("webpack");

module.exports = {
  resolve: {
    alias: {
      "react": "react-lite",
      "react-dom": "react-lite"
    },
    root: srcPath
  },
  entry: {
    vendor: [
      "babel-polyfill",
      "isomorphic-fetch",
      "moment",
      "react-lite",
      "react-redux",
      "react-router",
      "react-router-redux",
      "redux",
      "redux-actions",
      "redux-promise",
      "redux-thunk",
      "reselect"
    ],
    index: path.resolve(srcPath, "index")
  },
  output: {
    path: path.resolve("dist"),
    publicPath: "/",
    filename: "js/[name]-[hash].bundle.js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: srcPath,
      loader: "babel"
    }, {
      test: /\.css$/,
      include: path.resolve(srcPath, "assets/css"),
      loader: ExtractTextPlugin.extract(
        "style",
        "css!postcss"
      )
    }, {
      test: /\.styl$/,
      include: path.resolve(srcPath, "assets/styles"),
      loader: ExtractTextPlugin.extract(
        "style",
        "css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!stylus"
      )
    }, {
      test: /\.json$/,
      include: path.resolve(srcPath, "assets"),
      loader: "json"
    }, {
      test: /.*\.(gif|png|jpe?g|svg)$/i,
      include: path.resolve(srcPath, "assets"),
      loaders: [
        "file?hash=sha512&digest=hex&name=images/[hash].[ext]",
        "image-webpack?"
        + JSON.stringify({
          progressive: true,
          optimizationLevel: 7,
          interlaced: false,
          pngquant: {
            quality: "65-90",
            speed: 2,
            verbose: true
          }
        })
      ]
    }]
  },
  postcss: [autoprefixer],
  plugins: [
    new ExtractTextPlugin(
      "css/[name]-[hash].css",
      { allChunks: true }
    ),
    new HtmlWebpackPlugin({
      filename: "index.ejs",
      favicon: path.resolve(srcPath, "assets/images/favicon.png"),
      template: path.resolve(srcPath, "assets/template.prod.ejs")
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
      "__DEV__": false
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]), // saves ~100k from build
    new webpack.ProgressPlugin(function(percentage, message) {
      process.stderr.write(message + "\r");
    }),
    new webpack.ProvidePlugin({
      "fetch": "isomorphic-fetch"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "js/[name]-[hash].js"
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true,
        warnings: false
      }
    })
  ]
};
