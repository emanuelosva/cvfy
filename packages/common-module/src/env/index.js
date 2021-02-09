const constants = require('../constants')

const makeGetEnviroment = ({ BusinessError }) => () => {
  const env = process.env.NODE_ENV
  if (!env) BusinessError.throwError('Any environment provided')

  let enviromentPrefix = ''
  switch (env) {
    case constants.enviroment.PRODUCTION:
      break
    case constants.enviroment.DEVELOPMENT:
      enviromentPrefix = 'DEVELOPMENT_'
      break
    case constants.enviroment.TEST:
      enviromentPrefix = 'TEST_'
      break
    default:
      BusinessError.throwError(`Enviroment: ${env} not supperted.`)
      process.exit(1)
  }

  return enviromentPrefix
}

module.exports = makeGetEnviroment
