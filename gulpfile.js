/*global require:true */
(function () {
  'use strict';

  var build = './';

  var gulp = require('gulp');
  var uglify = require('gulp-uglify');
  var jshint = require('gulp-jshint');
  var concat = require('gulp-concat');

  gulp.task('default', ['min']);

  gulp.task('min', function () {
    gulp.src('jquery.animated.js')
      .pipe(jshint())
      .pipe(concat('jquery.animated.min.js'))
      .pipe(uglify({preserveComments: 'some'}))
      .pipe(gulp.dest(build));
  });

  gulp.task('watch', function () {
    gulp.watch('jquery.animated.js', ['min']);
  });

}());