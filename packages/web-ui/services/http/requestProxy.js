import constants from '../../constants'

export const requestProxy = ({ httpClient }) => {
  const getToken = () => {
    if (window) return localStorage.getItem(constants.auth.ACCESS_TOKEN)
    return null
  }

  const setHeaders = (headers, withAuth) => {
    return {
      ...headers,
      ...(withAuth && { authorization: `Bearer ${getToken()}` } ),
      'Content-Type': 'application/json',
    }
  }

  const get = async ({ url, headers = {}, withAuth = false }) => {
    try {
      const { data, status } = await httpClient.get(url, { headers: setHeaders(headers, withAuth) })
      return { body: data, status }
    } catch (error) {
      return handleError(error)
    }
  }

  const post = async ({ url, body, headers = {}, withAuth = false }) => {
    try {
      const { data, status } = await httpClient.post(url, body, { headers: setHeaders(headers, withAuth) })
      return { body: data, status }
    } catch (error) {
      return handleError(error)
    }
  }

  const put = async ({ url, body, headers = {}, withAuth = false }) => {
    try {
      const { data, status } = await httpClient.put(url, body, { headers: setHeaders(headers, withAuth) })
      return { body: data, status }
    } catch (error) {
      return handleError(error)
    }
  }

  const remove = async ({ url, headers = {}, withAuth = false }) => {
    try {
      const { data, status } = await httpClient.delete(url, { headers: setHeaders(headers, withAuth) })
      return { body: data, status }
    } catch (error) {
      return handleError(error)
    }
  }

  const handleError = (error) => {
    let status = error.status || error.statusCode || 500
    let errorBody = { message: error.message }
    if (axios.isAxiosError(error)) {
      status = error.response.status || error.code || 500
      errorBody.body = error.response?.data || {}
    }
    return Promise.reject({ status, error: errorBody })
  }

  return {
    get,
    post,
    put,
    remove,
  }
}
