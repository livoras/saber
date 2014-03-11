var gulp = require('gulp')
var browserify = require('gulp-browserify');
var mocha = require('gulp-mocha')

gulp.task('browserify', function() {
  return gulp.src(['src/**/*.js', 'test/**/*.Spec.js'])
      .pipe(browserify({
        debug : !gulp.env.production
      }))
      .pipe(gulp.dest('./bin'))
})

gulp.task('test', ['browserify'], function() {
  gulp
    .src('bin/**/*.Spec.js')
    .pipe(mocha({'reporter': 'spec'}))
    .on('error', function() {
      console.log('Test failed.')
    })
})

gulp.task('default', ['test'], function() {
  gulp.watch(['src/**/*.js', 'test/**/*.Spec.js'], ['test'])
})
