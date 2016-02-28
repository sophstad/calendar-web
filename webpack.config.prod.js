"use strict";

var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var poststylus = require("poststylus");
var autoprefixer = require("autoprefixer");
var srcPath = path.join(__dirname, "src");

module.exports = {
  resolve: {
    alias: {
      "react": "react-lite",
      "react-dom": "react-lite"
    },
    root: srcPath,
    extensions: ["", ".js", ".jsx", ".styl"],
    modulesDirectories: ["node_modules", "src"]
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
    "index": path.join(srcPath, "index.js")
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "",
    filename: "js/[name]-[hash].js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: srcPath,
      loader: "babel"
    }, {
      test: /\.css$/,
      include: path.join(srcPath, "assets/css"),
      loader: ExtractTextPlugin.extract(
        "style",
        "css!postcss"
      )
    }, {
      test: /\.styl$/,
      include: path.join(srcPath, "assets/styles"),
      loader: ExtractTextPlugin.extract(
        "style",
        "css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!stylus"
      )
    }, {
      test: /\.json$/,
      include: path.join(srcPath, "assets"),
      loader: "json"
    }, {
      test: /.*\.(gif|png|jpe?g|svg)$/i,
      include: path.join(srcPath, "assets/images"),
      loaders: [
        "file?hash=sha512&digest=hex&name=[hash].[ext]",
        "image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: \"65-90\", speed: 2, verbose: true}}"
      ]
    }]
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
      "css/[name]-[hash].css",
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
      "$": "jquery",
      "jQuery": "jquery",
      "window.jQuery": "jquery",
      "fetch": "isomorphic-fetch"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      filename: "js/[name]-[hash].js"
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ]
}
