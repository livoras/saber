var gulp = require('gulp')
var browserify = require('gulp-browserify');
var mocha = require('gulp-mocha')

gulp.task('browserify', function() {
  gulp.src(['src/**/*.js', 'test/**/*.Spec.js'])
      .pipe(browserify({
        debug : !gulp.env.production
      }))
      .pipe(gulp.dest('./bin'))
})

gulp.task('mocha', function() {
  gulp.src('bin/**/*.Spec.js')
      .pipe(mocha())
})


gulp.task('default', ['browserify', 'mocha'], function() {
  gulp.watch(['src/**/*.js', 'test/**/*.Spec.js'], ['browserify', 'mocha'])
})
