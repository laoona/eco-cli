/**
 * @author: laoono
 * @date:  2019-08-06
 * @time: 14:40
 * @contact: laoono.com
 * @description: #
 */

const etpl = require('etpl');

const engine = new etpl.Engine({
  commandOpen: '{%',
  commandClose: '%}'
});

module.exports = {
  render: function(template, data) {
    const renderer = engine.compile(template);

    return renderer(data);
  }
}