const logger = require('../../logger')
const { ProfileErrors } = require('../../errors')
const { toBusinessError, validators } = require('@cvfy/common-module')

const makeAddProfileEducation = ({ ProfileFactory }) => async (profileId, educationDTO) => {
  try {
    if (!validators.isMongoId(profileId)) ProfileErrors.throw(ProfileErrors.types.INVALID_ID, 400)

    logger.info(`Adding new education to profile: ${profileId}`)

    const addedEducation = await ProfileFactory.addRelated({ related: 'educations', profileId, relatedDTO: educationDTO })
    return addedEducation
  } catch (error) {
    logger.error(`Error on add education to profile: ${error.message}`)
    return Promise.resolve(toBusinessError(error))
  }
}

const makeUpdateProfileEducation = ({ ProfileFactory }) => async (educationId, educationDTO) => {
  try {
    if (!validators.isMongoId(educationId)) ProfileErrors.throw(ProfileErrors.types.INVALID_ID, 400)

    logger.info(`Updating education : ${educationId}`)

    const updatedJob = await ProfileFactory.updateRelated({ related: 'educations', relatedId: educationId, relatedDTO: educationDTO })
    return updatedJob
  } catch (error) {
    logger.error(`Error on update education: ${error.message}`)
    return Promise.resolve(toBusinessError(error))
  }
}

const makeRemoveProfileEducation = ({ ProfileFactory }) => async (profileId, educationId) => {
  try {
    if (!validators.isMongoId(educationId)) ProfileErrors.throw(ProfileErrors.types.INVALID_ID, 400)

    logger.info(`Removing education : ${educationId}`)

    await ProfileFactory.removeRelated({ related: 'educations', profileId, relatedId: educationId })
  } catch (error) {
    logger.error(`Error on remove education: ${error.message}`)
    return Promise.resolve(toBusinessError(error))
  }
}

module.exports = {
  makeAddProfileEducation,
  makeUpdateProfileEducation,
  makeRemoveProfileEducation,
}
