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
  devServer: {
    colors: true,
    contentBase: "./dist",
    historyApiFallback: true,
    hot: true,
    inline: true,
    outputPath: path.join(__dirname, './dist')
  },
  resolve: {
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
      "redux-devtools",
      "redux-devtools-dock-monitor",
      "redux-devtools-log-monitor",
      "redux-thunk",
      "redbox-react"
    ],
    index: [
      "eventsource-polyfill", // necessary for hot reloading with IE
      "webpack-hot-middleware/client",
      path.join(srcPath, "index.js"),
    ]
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js",
    pathInfo: true
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, include: srcPath, loader: "babel" },
      { test: /\.css$/, loader: "style!css!postcss" },
      { test: /\.styl$/, loaders: ["style?sourceMap", "css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!stylus"] },
      { test: /\.json$/, loader: "json" },
      { test: /\.png$/, loader: "url" },
      { test: /\.jpg$/, loader: "file" }
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
    new HtmlWebpackPlugin({
      favicon: path.join(srcPath, "assets/images/favicon.png"),
      hash: true,
      template: path.join(srcPath, "assets/index.html")
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
      "__DEV__": true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      filename: "commons.js"
    })
  ]
}
