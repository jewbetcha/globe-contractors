'use strict';

// Not actually using this anymore, but will keep anyway

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    bb   = require('bitballoon'),
    livereload = require('gulp-livereload'),
    compass = require('gulp-compass'),
    path = require('path');

gulp.task('build', [], function() {
  return gulp.src('./assets/css/*.css')
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(gulp.dest('./assets/css/'));
    //.pipe(rename('styles.min.css'));
});

gulp.task('deploy', function() {
  bb.deploy({
    access_token: "a35f74d49983f40f49bcc1134923dc31a652d10d78acfc1012ec2986539119b2",
    site_id: "http://veterinarian-bear-35244.bitballoon.com/",
    dir: "./"
  }, function(err, deploy) {
    if (err) { throw(err) }
  });
});

gulp.task('compass', function() {
  gulp.src('assets/sass/*.scss')
    .pipe(compass({
      config_file: 'assets/config.rb',
      css: 'assets/css',
      sass: 'assets/sass'
    }));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('assets/sass/*.scss', ['compass']);
});