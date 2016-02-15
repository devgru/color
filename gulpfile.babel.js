import gulp from 'gulp';
import babelify from 'babelify';
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import mocha from 'gulp-mocha';
import watch from 'gulp-watch';
import istanbul from 'gulp-istanbul';
const isparta = require('isparta');

import { assign } from 'lodash';

var browserifyOpts = {
  debug: true,
  entries: './app/main.js'
};
var opts = assign({}, watchify.args, browserifyOpts);
var buildTask = browserify(browserifyOpts);

gulp.task('build+test+watch', buildTestWatch);
gulp.task('build+test', buildTest);
gulp.task('test', runTests);

gulp.task('default', ['build+test+watch']);

function buildTest() {
  runTests();
  buildMain();
}

function buildTestWatch() {
  var opts = assign({}, watchify.args, browserifyOpts);
  buildTask = watchify(browserify(opts));
  buildTask.on('update', buildTest);

  buildTest();
  watch('./test/**/*.js', buildTest);
}

function buildMain() {
  buildTask
    .transform(babelify, {presets: ["react", "es2015"]})
    .bundle()
    .pipe(source('./app/main.js'))
    .pipe(gulp.dest('./public/'));
}

function runTests() {
  gulp.src('./app/**/*.js')
    .pipe(istanbul({
      instrumenter: isparta.Instrumenter,
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire())
    .on('finish', () => {
      gulp.src('./test/**/*.js', {read: false})
        .pipe(mocha({
          reporter: 'nyan',
          require: ['jsdom'] // Prepare environement for React/JSX testing
        }))
        .pipe(istanbul.writeReports());
    });
}
