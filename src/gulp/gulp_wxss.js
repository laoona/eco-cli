/**
 * @author: laoono
 * @date:  2019-08-08
 * @time: 14:36
 * @contact: laoono.com
 * @description: #
 */

const gulp = require('gulp');
const debug = require('gulp-debug');
const cached = require('gulp-cached');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const base64 = require('gulp-base64');

module.exports = function() {
  return gulp.src(['src/**/*.wxss', 'src/**/*.scss'])
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(cached('#wxss'))
    .pipe(rename({
      extname: ".wxss"
    }))
    .pipe(gulp.dest('dist'))
    .pipe(base64({
      extensions: ['png', 'jpg', 'jpeg', 'svg', /\?base64$/i],
      exclude:    [/^http(s):\/\//,],
      maxImageSize: 0
    }))
    .pipe(debug({title: 'wxss'}))
    .pipe(gulp.dest('dist'));
}