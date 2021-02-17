const { auth } = require('../../../../adapters')
const authValidators = require('./validators')

module.exports = [
  {
    method: 'POST',
    url: '/login',
    schema: { ...authValidators.login },
    handler: auth.login,
  },
  {
    method: 'POST',
    url: '/signup',
    schema: { ...authValidators.signup },
    handler: auth.signup,
  },
]
