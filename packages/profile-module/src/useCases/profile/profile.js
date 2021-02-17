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

    const profile = await ProfileFactory.createProfile({ slug, ...profileDTO, isPublic: false })
    return profile
  } catch (error) {
    logger.error(`Error on create new profile: ${error.message}`)
    return Promise.reject(toBusinessError(error))
  }
}

const makeFindProfileById = ({ ProfileFactory }) => async (id) => {
  try {
    if (!validators.isMongoId(id)) ProfileErrors.throw(ProfileErrors.types.INVALID_ID, 400)

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
    if (!validators.isMongoId(id)) ProfileErrors.throw(ProfileErrors.types.INVALID_ID, 400)

    logger.info(`Updating profile by id: ${id}`)

    delete profileUpdateDTO.isPublic
    delete profileUpdateDTO.owner

    const updatedProfile = await ProfileFactory.updateProfile(id, profileUpdateDTO)
    if (updatedProfile) return updatedProfile

    ProfileErrors.throw(ProfileErrors.types.PROFILE_NOT_EXISTS, 404)
  } catch (error) {
    logger.error(`Error on update profile: ${error.message}`)
    return Promise.reject(toBusinessError(error))
  }
}

const makePublishProfile = ({ ProfileFactory }) => async ({ id, owner }) => {
  try {
    if (!validators.isMongoId(id)) ProfileErrors.throw(ProfileErrors.types.INVALID_ID, 400)

    logger.info(`Publishing profile with id: ${id}`)

    const profile = await ProfileFactory.findById(id)
    if (!profile) ProfileErrors.throw(ProfileErrors.types.PROFILE_NOT_EXISTS, 404)
    if (profile.owner !== owner) ProfileErrors.throw(ProfileErrors.types.ONLY_OWNER_CAN_PERFOMR_IT, 404)

    profile.isPublic = true
    await profile.save()

    return profile
  } catch (error) {
    logger.error(`Error on update profile: ${error.message}`)
    return Promise.reject(toBusinessError(error))
  }
}

const makeUpdateOwnerOfProfile = ({ ProfileFactory }) => async ({ id, owner }) => {
  try {
    if (!validators.isMongoId(id)) ProfileErrors.throw(ProfileErrors.types.INVALID_ID, 400)

    logger.info(`Updating profile owner with id: ${id}`)

    const updatedProfile = await ProfileFactory.updateProfile(id, { owner })
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
  makePublishProfile,
  makeUpdateOwnerOfProfile,
}
