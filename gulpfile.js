'use strict';

var gulp   = require('gulp'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload   = require('gulp-livereload'),
    compass      = require('gulp-compass'),
    imagemin     = require('gulp-imagemin'),
    path         = require('path'),
    sass         = require('gulp-sass'),
    refresh      = require('gulp-refresh'),
    st           = require('st'),
    http         = require('http'),
    server       = require('gulp-server-livereload');

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

gulp.task('prefix', function() {
  gulp.src('assets/css/styles.css')
      .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('assets/css/'))
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

gulp.task('sass', function () {
  gulp.src('assets/sass/*.scss')
   .pipe(sass({
    outputStyle: 'compact',
    errLogToConsole: true		             
  }))
  .pipe(autoprefixer({
     browsers: ['last 3 versions'],
     cascade: false           
  }))
  .pipe(gulp.dest('assets/css/'))
  .pipe(livereload());
});

gulp.task('watch', ['webserver'], function() {
 gulp.watch('assets/sass/*.scss', ['sass']);
});

gulp.task('server', function(done) {
  http.createServer(
    st({ path: __dirname, index: 'index.html', cache: false  })
  ).listen(8080, done);
});

gulp.task('webserver', function() {
  gulp.src('./')
   .pipe(server({
       livereload: true,
       directoryListing: true,
       open: true		        
  }));
});
