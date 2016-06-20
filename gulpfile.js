'use strict';

var gulp = require('gulp'),
    bb   = require('bitballoon');

gulp.task('build', [], function() {
  // Your build task
});

gulp.task('deploy', ['build'], function() {
  bb.deploy({
    access_token: "a35f74d49983f40f49bcc1134923dc31a652d10d78acfc1012ec2986539119b2",
    site_id: "http://veterinarian-bear-35244.bitballoon.com/",
    dir: "./"
  }, function(err, deploy) {
    if (err) { throw(err) }
  });
});
