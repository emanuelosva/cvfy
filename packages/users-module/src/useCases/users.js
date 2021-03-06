const { toBusinessError, validators } = require('@cvfy/common-module')
const { UsersErrors } = require('../errors')
const logger = require('../logger')

const makeUserService = ({ UsersModel }) => {
  const createOne = async (userDTO) => {
    try {
      const emailExists = await UsersModel.findOne({ email: userDTO.email })
      if (emailExists) UsersErrors.throw(UsersErrors.types.EMAIL_EXISTS, 409)

      logger.info(`Creating new user with email: ${userDTO.email}`)

      const user = await UsersModel.create(userDTO)
      return user
    } catch (error) {
      logger.error(`Error on create new user: ${error.message}`)
      return Promise.reject(toBusinessError(error))
    }
  }

  const findByEmail = async (email) => {
    try {
      logger.info(`Searching user by email: ${email}`)

      const user = await UsersModel.findOne({ email })
      return user
    } catch (error) {
      logger.error(`Error on find user by email: ${error.message}`)
      return Promise.reject(toBusinessError(error))
    }
  }

  const findById = async (id) => {
    try {
      if (!validators.isMongoId(id)) {
        logger.error('the provided id is invalid')
        UsersErrors.throw(UsersErrors.types.INVALID_ID, 400)
      }

      logger.info(`Searching user by id: ${id}`)

      const user = await UsersModel.findById(id)
      return user
    } catch (error) {
      logger.error(`Error on create find user by id: ${error.message}`)
      return Promise.reject(toBusinessError(error))
    }
  }

  const updateOne = async (id, userUpdateDTO) => {
    try {
      if (!validators.isMongoId(id)) {
        logger.error('the provided id is invalid')
        UsersErrors.throw(UsersErrors.types.INVALID_ID, 400)
      }

      logger.info(`Updating user for id: ${id}`)

      const user = await UsersModel.findByIdAndUpdate(
        id,
        { ...userUpdateDTO },
        { new: true },
      )
      if (user) return user

      UsersErrors.throw(UsersErrors.types.USER_NOT_FOUND, 404)
    } catch (error) {
      logger.error(`Error on update user: ${error.message}`)
      return Promise.reject(toBusinessError(error))
    }
  }

  return Object.freeze({
    createOne,
    findByEmail,
    findById,
    updateOne,
  })
}

module.exports = makeUserService
