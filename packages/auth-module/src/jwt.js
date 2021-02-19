const jwt = require('jsonwebtoken')
const config = require('./config')
const { AuthErrors } = require('./errors')

class JWT {
  static sign(payload, expiresIn = '2 hours') {
    return new Promise((resolve) => {
      const token = jwt.sign(payload, config.SECRET, {
        expiresIn,
        algorithm: config.ALGORITHM,
      })
      return resolve(token)
    })
  }

  static verifyAndGetPayload(token) {
    return new Promise((resolve, reject) => {
      try {
        const payload = jwt.verify(token, config.SECRET, {
          algorithms: [config.ALGORITHM],
        })
        return resolve(payload)
      } catch (error) {
        try {
          if (error instanceof jwt.TokenExpiredError) {
            AuthErrors.throw(AuthErrors.types.TOKEN_EXPIRED)
          }
        } catch (error) {
          return reject(error)
        }
        return reject(error)
      }
    })
  }
}

module.exports = JWT
