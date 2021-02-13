const logger = require('../../logger')
const { ProfileErrors } = require('../../errors')
const { toBusinessError, validators } = require('@cvfy/common-module')

const makeAddProfileJob = ({ ProfileFactory }) => async (profileId, jobDTO) => {
  try {
    if (!validators.isMongoId(profileId)) ProfileErrors.throw(ProfileErrors.types.INVALID_ID, 400)

    logger.info(`Adding new job to profile: ${profileId}`)

    const addedJob = await ProfileFactory.addRelated({ related: 'jobs', profileId, relatedDTO: jobDTO })
    return addedJob
  } catch (error) {
    logger.error(`Error on add job to profile: ${error.message}`)
    return Promise.resolve(toBusinessError(error))
  }
}

const makeUpdateProfileJob = ({ ProfileFactory }) => async (jobId, jobDTO) => {
  try {
    if (!validators.isMongoId(jobId)) ProfileErrors.throw(ProfileErrors.types.INVALID_ID, 400)

    logger.info(`Updating job : ${jobId}`)

    const updatedJob = await ProfileFactory.updateRelated({ related: 'jobs', relatedId: jobId, relatedDTO: jobDTO })
    return updatedJob
  } catch (error) {
    logger.error(`Error on update job: ${error.message}`)
    return Promise.resolve(toBusinessError(error))
  }
}

const makeRemoveProfileJob = ({ ProfileFactory }) => async (profileId, jobId) => {
  try {
    if (!validators.isMongoId(profileId)) ProfileErrors.throw(ProfileErrors.types.INVALID_ID, 400)

    logger.info(`Removing job : ${jobId}`)

    await ProfileFactory.removeRelated({ related: 'jobs', profileId, relatedId: jobId })
  } catch (error) {
    logger.error(`Error on remove job: ${error.message}`)
    return Promise.resolve(toBusinessError(error))
  }
}

module.exports = {
  makeAddProfileJob,
  makeUpdateProfileJob,
  makeRemoveProfileJob,
}
