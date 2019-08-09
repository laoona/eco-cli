/**
 * @author: laoono
 * @date:  2019-08-09
 * @time: 10:40
 * @contact: laoono.com
 * @description: #
 */

const {NodeVM} = require('vm2');

module.exports = function(code = '', relativePath = './') {

  const vm = new NodeVM({
    require: {
      external: true,
    }
  });

  let res;

  try {
    res = vm.run(code, relativePath);
  } catch (e) {
    console.log(e);
    res = {};
  }

  return res;
};
