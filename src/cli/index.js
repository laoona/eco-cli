/**
 * @author: laoono
 * @date:  2019-07-24
 * @time: 17:28
 * @contact: laoono.com
 * @description: #
 */

const program = require('commander');
let cmdValue;

program
  .version(require('../../package').version);

program
  .usage('<command> [options]');

program
  .command('init')
  .description('初始化一个新项目')
  .action(function(cmd) {
    cmdValue = cmd;
    require('../command/init')();
  });

program
  .command('run')
  .description('开始运行项目')
  .action(function(cmd) {
    cmdValue = cmd;
    require('../command/run')();
  });

program
  .command('add <name>')
  .option('-p, --page', '新增一个小程序页面')
  .option('-c, --component', '新增一个小程序组件')
  .description('新增一个小程序页面或组件')
  .action(function(name, options = {}) {
    cmdValue = options;

    const {page, component} = options;

    if (page) {
      return require('../command/add_page')({name});
    }
    if (component) {
      return require('../command/add_component')({name});
    }

    require('../command/add_page')({name});
  });

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}

if (typeof cmdValue === 'undefined') {
  console.error('no command given!');
  process.exit(1);
}

