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

module.exports = function(configPath, env) {

  const configJs = path.join(configPath, `./config/${env}.js`);

  if (!fs.existsSync(configJs)) {
    log.error('没有找到配置文件', configJs);
    process.exit();
    return null;
  }

  const code = fs.readFileSync(configJs, 'utf-8');
  const configFileName = 'config';
  const config = vmjs(code, configJs);

  const srcConfig = path.join(configPath, `./src/${configFileName}.js`);

  const content = `module.exports = ${JSON.stringify(config)}`;

  new File(srcConfig, content).save();
};
