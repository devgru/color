var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('scripts', function () {
  browserify({
    debug: true,
    entries: './app/main.js'
  })
    .transform(babelify, {presets: ["react", "es2015"]})
    .bundle()
    .pipe(source('app/main.js'))
    .pipe(gulp.dest('./public/'));
});

gulp.task('default', ['scripts']);

