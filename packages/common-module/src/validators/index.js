const { Types: { ObjectId } } = require('mongoose')

module.exports = {
  isMongoId: (id) => {
    try {
      ObjectId(id)
    } catch (error) {
      throw new Error('invalid id')
    }
  },
}
