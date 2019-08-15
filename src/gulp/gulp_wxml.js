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
const htmlmin = require('gulp-htmlmin');
const gulpif = require('gulp-if');

const minConf = {
  collapseWhitespace: true,
  keepClosingSlash: true,
  conservativeCollapse: true,
  includeAutoGeneratedTags: false,
  customAttrSurround: [
    [/\{\{.*\//, /\}\}/],
    [/\{%.+/, /%\}/]
  ],
  ignoreCustomFragments: [/{{.*?}}/]
};

module.exports = function(env) {
  return gulp.src(['src/**/*.wxml'])
    .pipe(cached('#wxml'))
    .pipe(gulpif(env === 'prod', htmlmin(minConf)))
    .on('error', (error) => {
      console.log(error);
    })
    .pipe(debug({title: 'wxml'}))
    .pipe(gulp.dest('dist'));
}