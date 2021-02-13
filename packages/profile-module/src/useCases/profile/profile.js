const logger = require('../../logger')
const { ProfileErrors } = require('../../errors')
const {
  toBusinessError,
  slugify,
  validators,
} = require('@cvfy/common-module')

const makeCreateNewProfile = ({ ProfileFactory, idGenerator }) => async (profileDTO) => {
  try {
    let slug = slugify(profileDTO.fullName)
    const slugExists = await ProfileFactory.findBySlug(slug, { populate: false })
    if (slugExists) slug += `-${idGenerator(10)}`

    logger.info(`Creating a new profile with slug: ${slug}`)

    const profile = await ProfileFactory.createProfile({ slug, ...profileDTO })
    return profile
  } catch (error) {
    logger.error(`Error on create new profile: ${error.message}`)
    return Promise.reject(toBusinessError(error))
  }
}

const makeFindProfileById = ({ ProfileFactory }) => async (id) => {
  try {
    if (!validators.isMongoId(id)) ProfileErrors.throw(ProfileErrors.types.INVALID_ID)

    logger.info(`Searching profile with id: ${id}`)

    const profile = await ProfileFactory.findById(id)
    return profile
  } catch (error) {
    logger.error(`Error on search profile by id: ${error.message}`)
    return Promise.reject(toBusinessError(error))
  }
}

const makeFindProfileBySlug = ({ ProfileFactory }) => async (slug) => {
  try {
    logger.info('Searching profile by slug')

    const profile = await ProfileFactory.findBySlug(slug)
    return profile
  } catch (error) {
    logger.error(`Error on search profile by slug: ${error.message}`)
    return Promise.reject(toBusinessError(error))
  }
}

const makeUpdateProfile = ({ ProfileFactory }) => async (id, profileUpdateDTO) => {
  try {
    if (!validators.isMongoId(id)) ProfileErrors.throw(ProfileErrors.types.INVALID_ID)

    logger.info(`Updating profile by id: ${id}`)

    const updatedProfile = await ProfileFactory.updateProfile(id, profileUpdateDTO)
    if (updatedProfile) return updatedProfile

    ProfileErrors.throw(ProfileErrors.types.PROFILE_NOT_EXISTS, 404)
  } catch (error) {
    logger.error(`Error on update profile: ${error.message}`)
    return Promise.reject(toBusinessError(error))
  }
}

module.exports = {
  makeCreateNewProfile,
  makeFindProfileById,
  makeFindProfileBySlug,
  makeUpdateProfile,
}
