"use strict";

var path = require("path");
var express = require("express");
var gulp = require("gulp");
var gutil = require("gulp-util");
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

/**
 * Build. One and done.
 */
gulp.task("webpack:build", function() {
  return gulp.src("src/index.js")
    .pipe(webpackStream(webpackConfig, null, function(err, stats) {
      if (err) throw new gutil.PluginError("webpack:build", err);
      gutil.log("[webpack:build]", stats.toString({
        colors: true
      }));
      // callback();
    }))
    .pipe(gulp.dest("dist/"));
});


/**
 * A customized webpack-dev-server setup.
 * Integrates hot-module-reloading.
 */
gulp.task("webpack-dev-server", function(callback) {
  var app = express();
  // Start a webpack-dev-server
  var compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    // server and middleware options
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true
    }
  }));

  app.use(webpackHotMiddleware(compiler));

  // app.get("*", function(req, res) {
  //   res.sendFile(path.join(__dirname, "index.html"));
  // });

  app.listen(8080, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    // Server listening
    gutil.log("[webpack-dev-server]", "http://localhost:8080");

    // keep the server alive or continue?
    // callback();
    console.log("Listening at http://localhost:8080");
    console.log("Compiling ... Wait for 'bundle is VALID'");
  });
});

