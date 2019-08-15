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
const run = require('./main/run');

const gulpJavascript = require('./gulp/gulp_javascript');
const gulpWxss = require('./gulp/gulp_wxss');
const gulpClone = require('./gulp/gulp_clone');
const gulpImage = require('./gulp/gulp_image');
const gulpJson = require('./gulp/gulp_json');
const gulpWxml = require('./gulp/gulp_wxml');

module.exports = function (env = 'dev', command = 'run') {
  /* 编译JS文件 */
  gulp.task('build:js', () => gulpJavascript(env));

  /* 编译Wxss文件 */
  gulp.task('build:wxss', () => gulpWxss());

  /* 编译图片文件 */
  gulp.task('build:image', () => gulpImage());

  /* 编译配置文件 */
  gulp.task('build:json', () => gulpJson());

  /* 编译wxml文件 */
  gulp.task('build:wxml', () => gulpWxml(env));

// 复制文件
  gulp.task('clone', () => gulpClone());

// 配置文件任务
  gulp.task('config', async () => {
    return await run(process.cwd(), env)
  });

// 清理目录
  gulp.task('clean', async () => {
    await del(['./dist/']);
  });

// 监测文件变化
  gulp.task('watch', () => {
    log.info('监听中...');
    watch(['src/**/*.js'], parallel('build:js'));
    watch(['src/**/*.wxss', 'src/**/*.scss'], parallel('build:wxss'));
    watch(['src/**/*.png', 'src/**/*.jpg', 'src/**/*.jpeg', 'src/**/*.gif'], parallel('build:image'));
    watch(['src/**/*.json'], parallel('build:json'));

    watch(['config/**/*.js'], parallel('config'));
    watch(['src/**/*.wxml'], parallel('build:wxml'));
  });

  // task列表
  const tasks = [
    'clean', 'config', 'clone', 'build:wxss', 'build:js', 'build:wxml',
  ];

  if (command === 'run') {
    tasks.push('watch');
  }

// 默认任务
  const build = series.apply(this, tasks);

  return build();
};
