"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var del = require("del");
var svgmin = require("gulp-svgmin");
var run = require("run-sequence");
var cssnext = require('cssnext');
var precss = require('precss');

gulp.task("style", function() {
  gulp.src("css/style.css")
    .pipe(plumber())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 2 versions"
      ]}),
      mqpacker({
      sort: true
      }),
      cssnext,
      precss
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("serve", function() {
  server.init({
    server: "build/"
  });

  gulp.watch("css/**/*.css", ["style"]);
  gulp.watch("*.html", ["html:update"]);
});

gulp.task("images", function() {
  return gulp.src("build/img/**/*.{png,jpg,gif}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true})
  ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("symbols", function() {
  return gulp.src("build/img/**/*.svg")
    .pipe(svgmin())
    .pipe(gulp.dest("build/img"));
});

gulp.task("build", function(fn) {
  run(
    "clean",
    "copy",
    "style",
    "images",
    "symbols",
    fn
  );
});

gulp.task("copy", function() {
  return gulp.src([
      "fonts/**/*.{woff,woff2}",
      "img/**",
      "js/**",
      "*.html"
    ], {
      base: "."
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("html:copy", function() {
  return gulp.src("*.html")
    .pipe(gulp.dest("build"));
});

gulp.task("html:update", ["html:copy"], function(done) {
  server.reload();
  done();
});
