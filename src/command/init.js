/**
 * @author: laoono
 * @date:  2019-08-07
 * @time: 10:11
 * @contact: laoono.com
 * @description: #
 */

const inquirer = require('inquirer');
const fs = require('fs');
const promptList = [];
const init = require('../main/init');
const templates = require('../templates');

const askProjectName = function (conf = {}, prompts) {
  if (typeof conf.projectName !== 'string') {
    prompts.push({
      type: 'input',
      name: 'projectName',
      message: '请输入项目名称！',
      validate (input) {
        if (!input.trim()) {
          return '项目名不能为空！'
        }
        if (fs.existsSync(input)) {
          return '当前目录已经存在同名项目，请换一个项目名！'
        }
        return true
      }
    })
  } else if (fs.existsSync(conf.projectName)) {
    prompts.push({
      type: 'input',
      name: 'projectName',
      message: '当前目录已经存在同名项目，请换一个项目名！',
      validate (input) {
        if (!input.trim()) {
          return '项目名不能为空！'
        }
        if (fs.existsSync(input)) {
          return '项目名依然重复！'
        }
        return true
      }
    })
  }
}

const askTemplate =  function (conf, prompts, list = []) {
  const choices = [...list.map(({desc: name, name: value}) => ({ name, value}))]

  if (typeof conf.template !== 'string') {
    prompts.push({
      type: 'list',
      name: 'template',
      message: '请选择模板',
      choices
    })
  }
}

module.exports = function () {

  const config = {};

  askProjectName(config, promptList)
  askTemplate(config, promptList, templates)

  inquirer
    .prompt(promptList)
    .then(answers => {
      return init(answers);
    }).catch(() => {
      console.log('err');
  });
};