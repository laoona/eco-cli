/**
 * @author: laoono
 * @date:  2019-08-08
 * @time: 14:33
 * @contact: laoono.com
 * @description: #
 */

const gulp = require('gulp');
const debug = require('gulp-debug');
const cached = require('gulp-cached');

module.exports = function() {
  return gulp.src(['src/**/*.png', 'src/**/*.jpg', 'src/**/*.jpeg', 'src/**/*.gif'])
    .pipe(cached('#image'))
    .pipe(debug({title: 'image'}))
    .pipe(gulp.dest('dist'));
}