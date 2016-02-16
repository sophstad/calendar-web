"use strict";

var path = require("path");
var gulp = require("gulp");
var gutil = require("gulp-util");
var browserSync = require("browser-sync").create();
var webpack = require("webpack");
var webpackStream = require("webpack-stream");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var webpackConfig = process.env.NODE_ENV === "production" ?
  require("./webpack.config.prod")
: require("./webpack.config.dev");


// The development server (the recommended option for development)
gulp.task("default", ["browser-sync"]);

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
 * Wraps the webpack-dev-server in browser-sync.
 * Standard webpack-dev-server doesn't HMR for css-modules.
 * This task watches for any .css changes and notifies the server.
 */
gulp.task("browser-sync", function() {
  var compiler = webpack(webpackConfig);

  browserSync.init({
    ui: false,
    ghostMode: false,
    online: false,
    open: false,
    notify: false,
    host: "localhost",
    port: "8080",
    xip: false,
    server: {
      baseDir: webpackConfig.devServer.contentBase,
      middleware: [
        webpackDevMiddleware(compiler, {
          // server and middleware options
          publicPath: webpackConfig.output.publicPath,
          stats: {
            colors: true
          }
        }),
        webpackHotMiddleware(compiler)
      ]
    },
    files: [
      "./dist/*.css"
    ]
  }, function (err, bs) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    // Server listening
    gutil.log("[webpack-dev-server]", "http://localhost:8080");

    // keep the server alive or continue?
    // callback();
    console.log("Listening at http://localhost:8080");
    console.log("Compiling ... Wait for 'bundle is VALID'");
  });
});
