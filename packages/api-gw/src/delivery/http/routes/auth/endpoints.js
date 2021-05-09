const { auth } = require('../../adapters')
const authValidators = require('./validators')
const { auth: authMiddleware } = require('../../middleware')

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
  {
    method: 'POST',
    url: '/new-token',
    schema: { ...authValidators.newToken },
    handler: auth.refreshAccessToken,
  },
  {
    method: 'POST',
    url: '/invalidate-token',
    schema: { ...authValidators.invalidateToken },
    handler: auth.invalidateRefreshToken,
  },
  {
    method: 'POST',
    url: '/clear-all-tokens',
    preValidation: [authMiddleware.isAuthenticated],
    handler: auth.clearAllTokens,
  },
]
