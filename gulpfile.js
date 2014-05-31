var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var gutil = require('gulp-util');

function bundle(bundler) {

  return bundler.bundle({debug: true})
      .on('error', function(err) {gutil.log(err), gutil.beep()})
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./scripts'));
};


gulp.task('dev', function() {

  var bundler = watchify('./scripts/index.js');

  bundler.on('log', function(msg) {gutil.log(msg)});

   bundler.on('update', function() {
      return bundle(bundler);
    });

   return bundle(bundler);

});