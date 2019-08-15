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
const tinypng = require('gulp-tinypng-nokey-plus');
const imagemin = require('gulp-imagemin');
const gulpif = require('gulp-if');

const imageminConf = {
  optimizationLevel: 6,
  progressive: true,
  interlaced: true
};

module.exports = function(env, useTinypng) {
  const compress =  useTinypng ? tinypng : imagemin;

  return gulp.src(['src/**/*.png', 'src/**/*.jpg', 'src/**/*.jpeg', 'src/**/*.gif'])
    .pipe(cached('#image'))
    .pipe(gulpif(env === 'prod', compress(imageminConf)))
    .pipe(debug({title: 'image'}))
    .pipe(gulp.dest('dist'));
}