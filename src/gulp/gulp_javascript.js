/**
 * @author: laoono
 * @date:  2019-08-08
 * @time: 14:21
 * @contact: laoono.com
 * @description: #
 */

const gulp = require('gulp');
const debug = require('gulp-debug');
const cached = require('gulp-cached');

module.exports = function() {
  return gulp.src(['src/**/*.js'])
    .pipe(cached('#javascript'))
    .pipe(debug({title: 'javascript'}))
    .pipe(gulp.dest('dist'));
}