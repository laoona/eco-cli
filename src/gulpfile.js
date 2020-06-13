/**
 * @author: laoono
 * @date:  2019-07-26
 * @time: 10:43
 * @contact: laoono.com
 * @description: #
 */
const gulp = require('gulp');
const watch = require('gulp-watch');
const {parallel, series, watch: gulpWatch} = gulp;
const {log} = require('./lib');
const del = require('del');
const run = require('./main/run');

const gulpJavascript = require('./gulp/gulp_javascript');
const gulpWxss = require('./gulp/gulp_wxss');
const gulpClone = require('./gulp/gulp_clone');
const gulpImage = require('./gulp/gulp_image');
const gulpJson = require('./gulp/gulp_json');
const gulpWxml = require('./gulp/gulp_wxml');
const gulpClean = require('./gulp/gulp_clean');

module.exports = function (env = 'dev', command = 'run', opts = {}) {
  const date = new Date();

  /* 编译JS文件 */
  gulp.task('build:js', () => gulpJavascript(env));

  /* 编译Wxss文件 */
  gulp.task('build:wxss', () => gulpWxss());

  /* 编译图片文件 */
  gulp.task('build:image', () => gulpImage(env, opts.tinypng));

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
    await del(['./dist/**', '!./dist/project.config.json', '!./dist/sitemap.json']);
  });

  // 清理样式引用的图片
  gulp.task('clean:image', () => gulpClean(env, command, date));

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
    'clean', 'config', 'clone',  'build:image', 'build:wxss', 'build:js', 'build:wxml',
  ];

  if (command === 'run') {
    tasks.push('watch');

    // 删除目录 同步到dist
    const watcher = gulpWatch(['src/**/*']);

    watcher.on('unlinkDir', function(path) {
      const disPath = path.replace(/^src\//gi, 'dist/');

      del(disPath);
      log.warn(`已删除：${disPath}`);
    });

    // 删除文件时，同步到dist
    watcher.on('unlink', function(path) {
      const disPath = path.replace(/^src\//gi, 'dist/');

      del(disPath);
      log.warn(`已删除：${disPath}`);
    });
  }

  if (command === 'build') {
    tasks.push('clean:image');
  }

// 默认任务
  const build = series.apply(this, tasks);

  return build();
};
