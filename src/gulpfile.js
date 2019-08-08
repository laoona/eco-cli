/**
 * @author: laoono
 * @date:  2019-07-26
 * @time: 10:43
 * @contact: laoono.com
 * @description: #
 */
const gulp = require('gulp');
const watch = require('gulp-watch');
const {parallel, series} = gulp;
const {log} = require('./lib');
const del = require('del');

const gulpJavascript = require('./gulp/gulp_javascript');
const gulpWxss = require('./gulp/gulp_wxss');
const gulpClone = require('./gulp/gulp_clone');
const gulpImage = require('./gulp/gulp_image');
const gulpJson = require('./gulp/gulp_json');

/* 编译JS文件 */
gulp.task('build:js', () => gulpJavascript());

/* 编译Wxss文件 */
gulp.task('build:wxss', () => gulpWxss());

/* 编译图片文件 */
gulp.task('build:image', () => gulpImage());

/* 编译配置文件 */
gulp.task('build:json', () => gulpJson());


// 复制文件
gulp.task('clone', () => gulpClone());

// 监测文件变化
gulp.task('watch', () => {
  log.info('监听中...');
  watch(['src/**/*.js'], parallel('build:js'));
  watch(['src/**/*.wxss', 'src/**/*.scss'], parallel('build:wxss'));
  watch(['src/**/*.png', 'src/**/*.jpg', 'src/**/*.jpeg', 'src/**/*.gif'], parallel('build:image'));
  watch(['src/**/*.json'], parallel('build:json'));
});

gulp.task('clean', async() => {
  await del(['./dist/']);
});

// 默认任务
const build = series('clean', 'clone', 'build:wxss', 'watch');

module.exports = build;
