/**
 * @author: laoono
 * @date:  2019-08-06
 * @time: 13:48
 * @contact: laoono.com
 * @description: #
 */

const path = require('path');
const fs = require('fs');

const {mkdirsSync, log} = require('../lib');
const boilerplate = require('../boilerplate');

module.exports = function (opts) {
  const fileName = opts.name;
  const baseDir = process.cwd();
  const dir = path.join(baseDir, fileName);
  const pageName = path.basename(dir);

  const files = boilerplate.component(pageName, {
    name: pageName
  });

  // 检查是否可以覆盖
  if (fs.existsSync(dir)) {
      log.warn('存在同名组件 => ', dir);
      return;
  }

  const res = mkdirsSync(dir);
  if (!res) {
    log.error('失败');
  }

  files.forEach(function (file) {
    file.save(dir);
    log.info('generate file success:', log.chalk.green(path.join(pageName, file.path)));
  });
}