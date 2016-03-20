/* eslint-disable no-console */
var express = require("express");
var webpack = require("webpack");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var config = require("../webpack/config.dev");
// var apiProxy = httpProxy.createProxyServer();
// var history = require('connect-history-api-fallback');

var app = express();
var port = 8080;

var compiler = webpack(config);

// /* 1. Proxy api requests */
// app.all("/api/*", function(req, res) {
//   apiProxy.web(req, res, { target: {
//     host: "localhost",
//     port: 5000
//   }});
// });

// /* 2. History API Fallback */
// app.use(history());

/* 3. Webpack compilation */
app.use(webpackDevMiddleware(compiler, {
  // server and middleware options
  publicPath: config.output.publicPath,
  stats: {
    // output options
    chunks: false,
    colors: true
  }
}));

/* 4. Hot Module Replacement */
app.use(webpackHotMiddleware(compiler));


app.listen(port, error => error ?
    console.error(error)
  : console.info(`==> 🌎  Listening on port ${ port }. Open up http://localhost:${ port }/ in your browser.`)
)
