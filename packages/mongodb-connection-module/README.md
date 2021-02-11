# `@cvfy/mongodb-connection-module`

> Description: This module provides an interface to connect to mongo db across all modules.

## Usage

```js

/** As mongoose interface */
const { MongoConnection } = require('@cvfy/mongodb-connection-module')
const { Schema } = require('mongoose')

const UserSchema = new Schema({
  name: String,
  email: String
})

module.exports = MongoConnection().model('users', UserSchema)

/** As connection interface */
const { MongoConnection } = require('@cvfy/mongodb-connection-module')

const getOneById = ({ MongoClient, collection }) => async (id) => {
  const db = (await MongoConnection()).db
  const col = db.collection(collection)

  return col.findOne({ _id: id })
}

```
