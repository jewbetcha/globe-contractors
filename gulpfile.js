'use strict';

// Not actually using this anymore, but will keep anyway

var gulp   = require('gulp'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload   = require('gulp-livereload'),
    compass      = require('gulp-compass'),
    imagemin     = require('gulp-imagemin'),
    path         = require('path');

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


gulp.task('compass', function() {
  gulp.src('assets/sass/*.scss')
    .pipe(compass({
      config_file: 'assets/config.rb',
      css: 'assets/css',
      sass: 'assets/sass'
    }));
});

gulp.task('imagemin', function() {
  return gulp.src('./images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('./images'));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('assets/sass/*.scss', ['compass']);
});
