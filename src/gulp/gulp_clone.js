/**
 * @author: laoono
 * @date:  2019-08-08
 * @time: 15:55
 * @contact: laoono.com
 * @description: #
 */

const gulp = require('gulp');
const debug = require('gulp-debug');
const filter = require('gulp-filter');

module.exports = function() {
  const f = filter(['src/**/*.*', /*'!src/!**!/!*.scss', '!src/!**!/!*.js', '!src/!**!/!*.wxml'*/],  {restore: true})
  return gulp.src(['src/**/*.*'])
    .pipe(f)
    .pipe(debug({title: 'clone'}))
    .pipe(gulp.dest('dist'));
}
