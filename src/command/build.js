/**
 * @author: laoono
 * @date:  2019-08-08
 * @time: 16:35
 * @contact: laoono.com
 * @description: #
 */
const {log} = require('../lib');
const envType = ['dev', 'test', 'prod'];

module.exports = function (options) {
  const {env} = options;

  if (!envType.includes(env)) {
    log.warn(`输入环境类型错误，目前只支持${JSON.stringify(envType)}`);
    process.exit();
  }

  require('../gulpfile')(env, 'build');
};