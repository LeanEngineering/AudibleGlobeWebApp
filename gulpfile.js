"use strict";

var through = require("through2");
var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var react = require("gulp-react");
var mocha = require("gulp-mocha");

// Load plugins
var $ = require("gulp-load-plugins")();

// Styles
gulp.task("styles", function ()
{
    return gulp.src("app/styles/main.scss")
        .pipe($.rubySass(
        {
            style: "expanded",
            precision: 10,
            loadPath: ["app/bower_components"]
        }))
        .pipe($.autoprefixer("last 1 version"))
        .pipe(gulp.dest("dist/styles"))
        .pipe($.size())
        .pipe($.connect.reload());
});

// Scripts
gulp.task("scripts", function ()
{
    return browserify({ entries: "./app/scripts/components/app.js", transform: [ "reactify" ] })
           .bundle()
           .pipe(source("app.js"))
           .pipe(gulp.dest("dist/scripts"))
           .pipe($.connect.reload());
});

gulp.task("jade", function ()
{
    return gulp.src("app/template/*.jade")
        .pipe($.jade({ pretty: true }))
        .pipe(gulp.dest("dist"))
        .pipe($.connect.reload());
});

// HTML
gulp.task("html", function ()
{
    return gulp.src("app/*.html")
        .pipe($.useref())
        .pipe(gulp.dest("dist"))
        .pipe($.size())
        .pipe($.connect.reload());
});

// Images
gulp.task("images", function ()
{
    return gulp.src("app/images/**/*")
        .pipe($.cache($.imagemin(
        {
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest("dist/images"))
        .pipe($.size())
        .pipe($.connect.reload());
});

// Clean
gulp.task("clean", function ()
{
    return gulp.src(["dist/styles", "dist/scripts", "dist/images", "dist/test"], {read: false})
               .pipe($.clean());
});

// Bundle
gulp.task("bundle", ["styles", "scripts" , "bower"], function()
{
    return gulp.src("./app/*.html")
               .pipe($.useref.assets())
               .pipe($.useref.restore())
               .pipe($.useref())
               .pipe(gulp.dest("dist"));
});

// Build
gulp.task("build", ["html", "bundle", "images"]);

// Default task
gulp.task("default", ["clean"], function ()
{
    gulp.start("build");
});

// Connect
gulp.task("connect", $.connect.server(
{
    root: ["dist"],
    port: 9000,
    livereload: true
}));

// Bower helper
gulp.task("bower", [ "node_modules" ], function()
{
    gulp.src("app/bower_components/**/*.js", {base: "app/bower_components"})
        .pipe(gulp.dest("dist/bower_components/"));

    gulp.src("app/bower_components/**/assets/**/*.*", {base: "app/bower_components" })
        .pipe(gulp.dest("dist/bower_components"));
});

gulp.task("node_modules", function()
{
    gulp.src("node_modules/leaflet/dist/*.*", {base:"node_modules"})
        .pipe(gulp.dest("dist/node_modules/"));

    gulp.src("node_modules/leaflet/dist/images/*.*", {base: "node_modules"})
        .pipe(gulp.dest("dist/node_modules"));
});

gulp.task("json", function()
{
    gulp.src("app/scripts/json/**/*.json", {base: "app/scripts"})
        .pipe(gulp.dest("dist/scripts/"));
});

var path = require("path");

var CustomMocha = function()
{
    return through.obj(function(file, encoding, done)
    {
        browserify({ entries: file.path, transform: [ "reactify" ] })
               .bundle()
               .pipe(source(path.basename(file.path)))
               .pipe(gulp.dest("dist/test"))
               .pipe(mocha());

        return done();
    });
}

gulp.task("test", function()
{
    gulp.src("./test/**/*.spec.js")
        .pipe(CustomMocha());
});

// Watch
gulp.task("watch", ["html", "bundle", "images", "connect"], function ()
{
    // Watch .json files
    gulp.watch("app/scripts/**/*.json", ["json"]);

    // Watch .html files
    gulp.watch("app/*.html", ["html"]);
    
    // Watch .scss files
    gulp.watch("app/styles/**/*.scss", ["styles"]);

    // Watch .jade files
    gulp.watch("app/template/**/*.jade", ["jade", "html"]);

    // Watch .js files
    gulp.watch("app/scripts/**/*.js", ["scripts"]);

    // Watch image files
    gulp.watch("app/images/**/*", ["images"]);
});
