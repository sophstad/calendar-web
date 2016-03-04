"use strict";

var path = require("path");
var assetsPath = path.resolve("assets");
var srcPath = path.resolve("src");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var autoprefixer = require("autoprefixer");
var webpack = require("webpack");

module.exports = {
  resolve: {
    alias: {
      "react": "react-lite",
      "react-dom": "react-lite",
      "assets": assetsPath
    },
    root: srcPath,
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx", ".styl"]
  },
  entry: {
    "commons": [
      "babel-polyfill",
      "isomorphic-fetch",
      "jquery",
      "moment",
      "react-lite",
      "react-redux",
      "react-router",
      "react-router-redux",
      "redux",
      "redux-actions",
      "redux-promise",
      "redux-thunk"
    ],
    "index": path.resolve(srcPath, "index")
  },
  output: {
    path: path.resolve("dist"),
    publicPath: "/assets/",
    filename: "[name]-[hash].js",
    chunkFilename: "[id].js"
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
      loader: ExtractTextPlugin.extract(
        "style",
        "css",
        "postcss"
      )
    }, {
      test: /\.styl$/,
      include: path.resolve(assetsPath, "styles"),
      loader: ExtractTextPlugin.extract(
        "style",
        "css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!stylus"
      )
    }, {
      test: /\.json$/,
      include: assetsPath,
      loader: "json"
    }, {
      test: /.*\.(gif|png|jpe?g|svg)$/i,
      include: assetsPath,
      loaders: [
        "file?hash=sha512&digest=hex&name=[hash].[ext]",
        "image-webpack?" + JSON.stringify({
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
  // webpack plugins
  plugins: [
    new ExtractTextPlugin(
      "css/[name]-[hash].css",
      { allChunks: true }
    ),
    new HtmlWebpackPlugin({
      favicon: path.resolve(assetsPath, "images/favicon.png"),
      hash: true,
      template: path.resolve(assetsPath, "index.html")
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
      "__DEV__": false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]), // saves ~100k from build
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      "$": "jquery",
      "jQuery": "jquery",
      "window.jQuery": "jquery",
      "fetch": "isomorphic-fetch"
    }),
    new webpack.ProgressPlugin(function(percentage, message) {
      process.stderr.write(message + "\r");
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      filename: "[name]-[hash].js"
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
}
