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
const babel = require('gulp-babel');
const replace = require('gulp-replace-path');
const path = require('path');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');

function fixedWinPath (pathName) {
  pathName = pathName || '';
  pathName = pathName.replace(/\.\\/g, './');
  pathName = pathName.replace(/\.{2}\\/g, '../');

  return pathName;
};

const babelConf = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
        targets: {
          browsers: [
            'last 3 versions',
            'Android >= 4.1',
            'ios >= 8'
          ],
        },
        // include: [/^transform-.*$/]
      }
    ]
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        helpers: false,
        absoluteRuntime: false,
      }
    ]
  ]
};

module.exports = function(env) {
  return gulp.src(['src/**/*.js'])
    .pipe(gulpif(env === 'prod', babel(babelConf)))
    .pipe(cached('#javascript'))
    .on('error', function (error) {
      console.log(error);
    })
    .pipe(gulpif(env === 'prod', replace(new RegExp('@babel/runtime/regenerator', 'g'), function (match, __absolutePath__) {
      let __path = path.relative(path.dirname(__absolutePath__), process.cwd() + '/src/libs');
      __path = fixedWinPath(__path);

      return path.join(__path + '/runtime.js');
    })))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(debug({title: 'javascript'}))
    .pipe(gulp.dest('dist'));
}
