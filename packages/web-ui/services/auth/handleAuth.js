import { AuthErrors } from '@cvfy/auth-module'
import constants from '../../constants'

export const makeHandleAuthError = ({ requestClient }) => async ({
  url,
  method,
  body,
  headers,
  originalError
}) => {
  if (!isExpirationTokenError(originalError) || !window) return Promise.reject(originalError)
  try {
    const refreshToken = localStorage.getItem('refreshToken')
    const refreshUrl = `${constants.api.ULR}/auth/new-token`
    const { body: { accessToken } } = await requestClient.post(refreshUrl, { refreshToken })

    localStorage.setItem('accessToken', accessToken)

    headers.authorization = `Bearer ${accessToken}`
    const { status, body: data } = await requestClient[method]({ url, body, headers })
    return { status, body: data }
  } catch (error) {
    if (isInvalidRefreshTokenError(error)) return Promise.reject(error)
    return Promise.reject(originalError)
  }
}

const isExpirationTokenError = (error) => (
  error.message === AuthErrors.types.TOKEN_EXPIRED ||
  error.body.message === AuthErrors.types.TOKEN_EXPIRED
)

const isInvalidRefreshTokenError = (error) => (
  originalError.message === AuthErrors.types.INVALID_REFRESH_TOKEN ||
  originalError.body.message === AuthErrors.types.INVALID_REFRESH_TOKEN
)
