"use strict";

var express = require("express");
var gitSubtree = require('gulp-gh-pages');
var gulp = require("gulp");
var gutil = require("gulp-util");
var history = require('connect-history-api-fallback');
var httpProxy = require("http-proxy");
var path = require("path");
var webpack = require("webpack");
var webpackStream = require("webpack-stream");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var webpackConfigProd = require("./webpack.config.prod");
var webpackConfigDev = require("./webpack.config.dev");

/* The development server (the recommended option for development) */
gulp.task("default", ["webpack-dev-server"]);

/* Production build */
gulp.task("build", ["webpack:build"]);

/* Deploy to production branch */
gulp.task("deploy", ["git:deploy"]);

/*
 * Build. One and done.
 */
gulp.task("webpack:build", function() {
  return gulp.src("src/index.js")
    .pipe(webpackStream(webpackConfigProd, null, function(err, stats) {
      if (err) throw new gutil.PluginError("webpack:build", err);
      gutil.log("[webpack:build]", stats.toString({
        // output options
        chunks: false,
        colors: true
      }));
      // callback();
    }))
    .pipe(gulp.dest("dist/"));
});

/*
 * A customized webpack-dev-server setup.
 * Integrates hot-module-reloading and proxying.
 * The order of the middleware is very important!!
 *   1. Proxy api requests
 *   2. Redirect 404s (history api fallback)
 *   3. Argument live webpack bundle to directory
 *   4. Enable hot module replacement
 */
gulp.task("webpack-dev-server", function(callback) {
  var app = express();
  var apiProxy = httpProxy.createProxyServer();
  var compiler = webpack(webpackConfigDev);

  /* 1. Proxy api requests */
  app.all("/api/*", function(req, res) {
    apiProxy.web(req, res, { target: {
      host: "localhost",
      port: 5000
    }});
  });

  /* 2. History API Fallback */
  app.use(history());

  /* 3. Webpack compilation */
  app.use(webpackDevMiddleware(compiler, {
    // server and middleware options
    open: true,
    publicPath: webpackConfigDev.output.publicPath,
    stats: {
      // output options
      chunks: false,
      colors: true
    }
  }));

  /* 4. Hot Module Replacement */
  app.use(webpackHotMiddleware(compiler));

  /*
   * Start a webpack-dev-server
   */
  app.listen(8080, "localhost", function(err) {
    if (err) throw new gutil.PluginError("webpack-dev-server", err);
    // Server listening
    gutil.log("[webpack-dev-server]", "==> 🌎  Listening on port 8080.", "Open up http://localhost:8080/ in your browser.");

    // keep the server alive or continue?
    // callback();
  });
});

/*
 * Deployment.
 */
gulp.task("git:deploy", function() {
  return gulp.src('./dist/**/*')
    .pipe(gitSubtree({
      branch: "build"
    }));
});
