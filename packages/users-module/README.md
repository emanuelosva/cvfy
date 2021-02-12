# `@cvfy/users-module`

> Description: Operations about users:
> - CRUD for users.

## Usage

```js
const Users = require('@cvfy/users-module');

await Users.createOneUser(data)
await Users.findById('mongo-id')
await Users.findByEmail('stan@marvel.com')
await Users.updateOne('mongo-id', { name: 'newName' })
```
