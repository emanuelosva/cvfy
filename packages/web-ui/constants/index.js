const isProduction = process.env.NODE_ENV === 'production'

export default {
  api: {
    ULR: isProduction ? 'https://cvfy.vercel.app/api' : 'http://localhost:3030'
  },
  auth: {
    REFRESH_TOKEN: 'refreshToken',
    ACCESS_TOKEN: 'accessToken',
  }
}
