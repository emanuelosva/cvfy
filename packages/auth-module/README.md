# `@cvfy/auth-module`

> Description: Authentication module

## Usage

```js
const authModule = require('@cvfy/auth-module')

await authModule.verifyToken(token)
await authModule.createToken({ email, scope })
await authModule.createRefreshToken({ userId })
await authModule.getNewToken({ userId, refreshToken })
await authModule.clearAllTokensFor({ userId })
await authModule.invalidateRefreshToken({ refreshToken })
```
