"use strict";

var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var postcss = require("postcss");
var poststylus = require("poststylus");
var rucksack = require("rucksack-css");
var cssnext = require("postcss-cssnext");
var lost = require("lost");
// var autoprefixer = require("autoprefixer");
var srcPath = path.join(__dirname, "src");
var inDevMode = process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "development";


module.exports = {
  target: "web",
  cache: true,
  entry: {
    common: [
      "moment",
      "history",
      "react",
      "react-dom",
      "react-addons-update",
      "react-modal",
      "react-router",
      "react-redux",
      "redux",
      "redux-devtools",
      "redux-devtools-dock-monitor",
      "redux-devtools-log-monitor",
      "redux-simple-router",
      "redux-thunk",
      "scroll-behavior"
    ],
    index: path.join(srcPath, "index.js")
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js",
    pathInfo: inDevMode
  },
  module: {
    loaders: [
      // required for .js and .jsx
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "stage-0", "react"] // TODO: don"t need stage-0?
        }
      },

      // required for .css
      { test: /\.css$/, exclude: /\.useable\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader") },
      // { test: /\.css$/, exclude: /\.useable\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader") },

      // required to for .styl
      // { test: /\.styl$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!stylus-loader") },
      { test: /\.styl$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!stylus-loader") },

      // required for bootstrap icons
      //   url-loader uses DataUrls
      //   file-loader emits files
      { test: /\.(woff|woff2)$/, loader: "url-loader?prefix=font/&limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf$/, loader: "file-loader?prefix=font/" },
      { test: /\.eot$/, loader: "file-loader?prefix=font/" },
      { test: /\.svg$/, loader: "file-loader?prefix=font/" },

      // requierd for .txt
      { test: /\.txt$/, loader: "raw-loader"},

      // required for .json
      { test: /\.json$/, loader: "json-loader" },

      // required for .png
      { test: /\.png$/, loader: "url-loader?limit=100000" },

      // required for .jpg
      { test: /\.jpg$/, loader: "file-loader" },

      // eslint-loader
      // { test: /\.(js|jsx)$/, exclude: /(node_modules)/, loader: "eslint-loader" },
    ]
  },
  resolve: {
    // alias: {
      // Unfortunately, this breaks the react-modal.
      // "react": true ? "react" : "react-lite",
      // "react-dom": true ? "react-dom" : "react-lite",

      // Bind version of jquery
      // jquery: "jquery-2.1.4",

      // Bind version of jquery-ui
      // "jquery-ui": "jquery-ui-1.10.5",

      // jquery-ui doesn"t contain a index file
      // bind module to the complete module
      // "jquery-ui-1.10.5$": "jquery-ui-1.10.5/ui/jquery-ui.js"
    // },
    root: srcPath,
    extensions: ["", ".js", ".jsx", ".styl", ".jpg", ".JPG", ".jpeg", ".JPEG", ".png", ".PNG"],
    modulesDirectories: ["node_modules", "src"]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("common", "common.js"),
    new HtmlWebpackPlugin({
      inject: "body",
      // favicon: path.join(srcPath, "assets/images/favicon.png"),
      hash: inDevMode,
      template: path.join(srcPath, "assets/index.html")
    }),
    new ExtractTextPlugin(
      "[name].css",
      { allChunks: true }
    ),
    new webpack.NoErrorsPlugin(),
    // new webpack.ProvidePlugin({
    //     $: "jquery",
    //     jQuery: "jquery",
    //     "window.jQuery": "jquery"
    // }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(inDevMode ? "development" : "production")
      },
      "IN_DEV_MODE": inDevMode
    })
  ],

  // Random crap plugin stuff
  stylus: {
    use: [
      require("nib")(),
      poststylus([
        // autoprefixer({ browsers: ["last 2 versions"] }),
        cssnext(),
        "rucksack-css"
      ])
    ],
    import: ["~nib/lib/nib/index.styl"]
  },
  postcss: [
    // autoprefixer({ browsers: ["last 2 versions"] }),
    cssnext,
    lost,
    rucksack
  ],

  debug: inDevMode,
  devtool: inDevMode ? "source-map" : "cheap-module-source-map",
  devServer: {
    // contentBase: path.join(__dirname, publicPath),
    contentBase: "./dist",
    historyApiFallback: true
  },
  // some janky fix for "request" npm package
  node: {
    net: "empty",
    tls: "empty"
  }
};

