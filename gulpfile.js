import gulp from "gulp";
import imagemin from "gulp-imagemin";
import gulpSass from "gulp-sass";
import htmlmin from "gulp-html-minifier";
import { deleteSync } from "del";
import runSequence from "gulp4-run-sequence";
import htmlLint from "gulp-html-lint";
import shell from "gulp-shell";
import uglify from "gulp-uglify";
import autoPrefixer from "gulp-autoprefixer";

import dartSass from "sass";
const sass = gulpSass(dartSass);

// Package everything up for prod
gulp.task("build", function (done) {
  // First get rid of all the old stuff
  deleteSync(["./build/*"]);

  // Then run all the things
  runSequence("sass", "imagemin", "copy", "html");
  done();
});

// Shipit command
gulp.task("shipit", shell.task(["shipit production deploy"]));

// Deploy!
gulp.task("deploy", function () {
  // First build, then shipit
  runSequence("build", "shipit");
});

// Copy built assets to the build folder
gulp.task("copy", function () {
  return gulp
    .src("./assets/**/*", { base: "./assets" })
    .pipe(gulp.dest("./build/assets/"));
});

// Minify HTML files
gulp.task("html", function () {
  return gulp
    .src(["**/*.html", "!node_modules/**/*"], { base: "./" })
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(gulp.dest("./build/"));
});

// Lint HTML
gulp.task("lint", function () {
  return gulp
    .src("./**/*.html")
    .pipe(htmlLint())
    .pipe(htmlLint.format())
    .pipe(htmlLint.failOnError());
});

// Prefix task by itself
gulp.task("prefix", function () {
  gulp
    .src("assets/css/styles.css")
    .pipe(
      autoPrefixer({
        cascade: false,
      })
    )
    .pipe(gulp.dest("assets/css/"));
});

// Minify images and move to build folder
gulp.task("imagemin", function () {
  return gulp
    .src("./images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("./build/images/"));
});

// Compile styles
gulp.task("sass", function () {
  return gulp
    .src("assets/sass/*.scss")
    .pipe(
      sass({
        outputStyle: "compressed",
        errLogToConsole: true,
      })
    )
    .pipe(
      autoPrefixer({
        cascade: false,
      })
    )
    .pipe(gulp.dest("assets/css/"));
});

// Just using to compress single files
gulp.task("compress", function () {
  return gulp
    .src("./assets/js/main.js")
    .pipe(uglify())
    .pipe(gulp.dest("./assets/js/"));
});

gulp.task("watch", function () {
  //livereload.listen();
  gulp.watch("assets/sass/*.scss", ["sass"]);
});

// Not using these server tasks anymore
// gulp.task('server', function(done) {
//     http.createServer(
//         st({ path: __dirname, index: 'index.html', cache: false })
//     ).listen(8080, done);
// });

// gulp.task('webserver', function() {
//     gulp.src('./')
//         .pipe(server({
//             livereload: true,
//             directoryListing: true,
//             open: true
//         }));
// });
