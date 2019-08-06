/**
 * @author: laoono
 * @date:  2019-08-06
 * @time: 14:46
 * @contact: laoono.com
 * @description: #
 */

const render = require('../lib/render');
const File = require('../lib/File');
const fs = require('fs');
const path = require('path');

module.exports = {
  page: function (fileName, data = {}) {
    const tpl = {
      'page/page.js': `${fileName}.js`,
      'page/page.json': `${fileName}.json`,
      'page/page.wxml': `${fileName}.wxml`,
      'page/page.wxss': `${fileName}.wxss`,
    }

    let res = [];

    Object.keys(tpl).forEach(function (tplPath) {
      const _tplPath = path.join(__dirname, './', tplPath);

      const content = render.render(fs.readFileSync(_tplPath, 'utf-8'), data);

      res.push(new File(tpl[tplPath], content));
    });

    return res;
  }
}