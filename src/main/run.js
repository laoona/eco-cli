/**
 * @author: laoono
 * @date:  2019-08-08
 * @time: 19:15
 * @contact: laoono.com
 * @description: #
 */

const File = require('../lib/File')
const fs = require('fs');
const {log} = require('../lib');
const path = require('path');
const vmjs = require('./vm');
const merge = require('lodash/merge');

module.exports = function(configPath, env) {

  const configJs = path.join(configPath, `./config/${env}.js`); // 区分环境的配置文件
  const defaultConfigJs = path.join(configPath, './config/default.js'); // 默认的配置文件

  if (!fs.existsSync(defaultConfigJs)) {
    log.error('没有找到配置文件', defaultConfigJs);
    process.exit();
    return null;
  }

  // 配置文件名称
  const configFileName = 'config';

  // 根据读取的默认配置文件内容转化成javascript对象
  const defaultConfig = vmjs(fs.readFileSync(defaultConfigJs, 'utf-8'), defaultConfigJs);

  // 如果存在区分环境的配置文件，取出文件内容转成javascript对象
  const config = fs.existsSync(configJs)
  ? vmjs(fs.readFileSync(configJs, 'utf-8'), configJs)
  : {};

  const srcConfig = path.join(configPath, `./src/${configFileName}.js`);

  // 合并配置文件代码内容
  // 环境配置文件会覆盖默认配置文件的同名配置
  const content = `module.exports = ${JSON.stringify(merge({}, defaultConfig, config))}`;

  new File(srcConfig, content).save();
};
