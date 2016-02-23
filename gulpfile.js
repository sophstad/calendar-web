"use strict";

var express = require("express");
var gitSubtree = require('gulp-gh-pages');
var gulp = require("gulp");
var gutil = require("gulp-util");
var httpProxy = require("http-proxy");
var webpack = require("webpack");
var webpackStream = require("webpack-stream");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var webpackConfig = process.env.NODE_ENV === "production" ?
  require("./webpack.config.prod")
: require("./webpack.config.dev");


// The development server (the recommended option for development)
gulp.task("default", ["webpack-dev-server"]);

// Production build
gulp.task("build", ["webpack:build"]);

/*
 * Build. One and done.
 */
gulp.task("webpack:build", function() {
  return gulp.src("src/index.js")
    .pipe(webpackStream(webpackConfig, null, function(err, stats) {
      if (err) throw new gutil.PluginError("webpack:build", err);
      gutil.log("[webpack:build]", stats.toString({
        // output options
        colors: true,
        chunkModules: true
      }));
      // callback();
    }))
    .pipe(gulp.dest("dist/"));
});

/*
 * A customized webpack-dev-server setup.
 * Integrates hot-module-reloading and proxying.
 */
gulp.task("webpack-dev-server", function(callback) {
  var app = express();
  var apiProxy = httpProxy.createProxyServer();
  var compiler = webpack(webpackConfig);

  // Start a webpack-dev-server
  app.use(webpackDevMiddleware(compiler, {
    // server and middleware options
    open: true,
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      chunkModules: true
    }
  }));

  // Enables HMR
  app.use(webpackHotMiddleware(compiler));

  // Proxy api requests
  app.all("/api/*", function(req, res) {
    apiProxy.web(req, res, { target: {
      host: "localhost",
      port: 5000
    }});
  });

  app.listen(8080, "localhost", function(err) {
    if (err) throw new gutil.PluginError("webpack-dev-server", err);
    // Server listening
    gutil.log("[webpack-dev-server]", "http://localhost:8080");

    // keep the server alive or continue?
    // callback();
    console.log("Listening at http://localhost:8080");
    console.log("Compiling ... please wait for \"bundle is VALID\"");
  });
});

/*
 * Deployment.
 */
gulp.task("deploy", function() {
  return gulp.src('./dist/**/*')
    .pipe(gitSubtree({
      branch: "production"
    }));
});
