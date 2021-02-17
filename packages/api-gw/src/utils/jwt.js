const jwt = require('jsonwebtoken')
const config = require('../config')

class JWT {
  static sign(payload, expiresIn = '2 hours') {
    return new Promise((resolve) => {
      const token = jwt.sign(payload, config.security.SECRET, {
        expiresIn,
        algorithm: 'HS256',
      })
      return resolve(token)
    })
  }

  static async decode(token) {
    return new Promise((resolve, reject) => {
      try {
        const payload = jwt.verify(token, config.security.SECRET, {
          algorithms: ['HS256'],
        })
        return resolve(payload)
      } catch (error) {
        return reject(error)
      }
    })
  }
}

module.exports = JWT
