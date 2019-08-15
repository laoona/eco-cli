/**
 * @author: laoono
 * @date:  2019-08-15
 * @time: 17:18
 * @contact: laoono.com
 * @description: #
 */

const gulp = require('gulp');
const debug = require('gulp-debug');
const clean = require('gulp-clean');

module.exports = function () {
  return gulp.src(['dist/**/_*.png', 'dist/**/_*.jpg', 'dist/**/_*.jpeg', 'dist/**/_*.gif'])
    .pipe(debug({title: 'image'}))
    .pipe(clean({force: true, read: false}));
};
