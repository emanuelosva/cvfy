const app = require('../packages/api-gw/src/index')

const serverlessFunc = async (req, res) => {
  await app.ready()
  app.server.emit('request', req, res)
}

module.exports = serverlessFunc
module.exports.default = serverlessFunc
