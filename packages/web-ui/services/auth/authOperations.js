import constants from '../../constants'

export const makeAuthOperations = ({ requestClient }) => {
  const baseUrl = `${constants.api.ULR}/auth`

  const login = ({ email, password }) => {
    const url = `${baseUrl}/login`
    try {
      const { body } = await requestClient.post({ url, body: { email, password } })
      
      localStorage.setItem(constants.auth.ACCESS_TOKEN, body.accessToken)
      localStorage.setItem(constants.auth.REFRESH_TOKEN, body.refreshToken)

      return bady.user
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const signup = (userData) => {
    const url = `${baseUrl}/signup`
    try {
      const { body } = await requestClient.post({ url, body: userData })
      
      localStorage.setItem(constants.auth.ACCESS_TOKEN, body.accessToken)
      localStorage.setItem(constants.auth.REFRESH_TOKEN, body.refreshToken)

      return bady.user
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return {
    login,
    signup,
  }
}
