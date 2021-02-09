# `@cvfy/mongodb-connection-module`

> Description: This module provides an interface to connect to mongo db across all modules.

## Usage

```js

/** As mongoose interface */
const { MongoDbClient } = require('@cvfy/mongodb-connection-module')
const { Schema } = require('mongoose')

const UserSchema = new Schema({
  name: String,
  email: String
})

module.exports = MongoDbClient.model('users', UserSchema)

/** As connection interface */
const { MongoDbClient } = require('@cvfy/mongodb-connection-module')

const getOneById = ({ MongoClient, collection }) => async (id) => {
  const db = (await MongoDbClient).db
  const col = db.collection(collection)

  return col.findOne({ _id: id })
}

```
