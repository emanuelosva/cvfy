const { Types: { ObjectId } } = require('mongoose')

module.exports = {
  isMongoId: (id) => ObjectId.isValid(id),
}
