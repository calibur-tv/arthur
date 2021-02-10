const { name } = require('./package.json')
const baseConf = require('../../project.conf')

module.exports = baseConf({
  name,
  port: 7101
})
