"use strict";

var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var poststylus = require("poststylus");
var autoprefixer = require("autoprefixer");
var srcPath = path.join(__dirname, "src");
require('es6-promise').polyfill();

module.exports = {
  resolve: {
    alias: {
      // "react": "react-lite",
      // "react-dom": "react-lite"
    },
    root: srcPath,
    extensions: ["", ".js", ".jsx", ".styl"],
    modulesDirectories: ["node_modules", "src"]
  },
  entry: {
    commons: [
      "jquery",
      "moment",
      "react",
      "react-dom",
      "react-redux",
      "react-router",
      "react-router-redux",
      "redux",
      "redux-thunk"
    ],
    index: path.join(srcPath, "index.js")
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name]-[hash].js",
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, include: srcPath, loader: "babel" },
      { test: /\.css$/, exclude: /\.useable\.css$/, loader: ExtractTextPlugin.extract("style", "css!postcss") },
      { test: /\.styl$/, loader: ExtractTextPlugin.extract("style", "css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!stylus") },
      { test: /\.json$/, loader: "json" },

      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
      },

      { test: /fbsdk/, loader: "exports?FB!script" },
      { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
      { test: /\.ttf$/, loader: "url?limit=10000" },
      { test: /\.eot$/, loader: "file?prefix=font/" },
    ]
  },
  // misc plugins
  stylus: {
    use: [
      poststylus([
        "autoprefixer"
      ])
    ]
  },
  postcss: [autoprefixer],
  // webpack plugins
  plugins: [
    new ExtractTextPlugin(
      "[name]-[hash].css",
      { allChunks: true }
    ),
    new HtmlWebpackPlugin({
      favicon: path.join(srcPath, "assets/images/favicon.png"),
      hash: true,
      template: path.join(srcPath, "assets/index.html")
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
      "__DEV__": false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]), // saves ~100k from build
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      filename: "commons.js"
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}
