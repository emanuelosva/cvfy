const { toBusinessError, validators } = require('@cvfy/common-module')
const logger = require('../../logger')
const { ProfileErrors } = require('../../errors')

const makeProfileJobsService = ({ ProfileFactory }) => {
  const addOneToProfile = async (profileId, jobDTO) => {
    try {
      if (!validators.isMongoId(profileId)) ProfileErrors.throw(ProfileErrors.types.INVALID_ID, 400)

      logger.info(`Adding new job to profile: ${profileId}`)

      const addedJob = await ProfileFactory.addRelated({ related: 'jobs', profileId, relatedDTO: jobDTO })
      return addedJob
    } catch (error) {
      logger.error(`Error on add job to profile: ${error.message}`)
      return Promise.reject(toBusinessError(error))
    }
  }

  const updateOne = async (jobId, jobDTO) => {
    try {
      if (!validators.isMongoId(jobId)) ProfileErrors.throw(ProfileErrors.types.INVALID_ID, 400)

      logger.info(`Updating job : ${jobId}`)

      const updatedJob = await ProfileFactory.updateRelated({ related: 'jobs', relatedId: jobId, relatedDTO: jobDTO })
      return updatedJob
    } catch (error) {
      logger.error(`Error on update job: ${error.message}`)
      return Promise.reject(toBusinessError(error))
    }
  }

  const removeOne = async (jobId) => {
    try {
      if (!validators.isMongoId(jobId)) ProfileErrors.throw(ProfileErrors.types.INVALID_ID, 400)

      logger.info(`Removing job : ${jobId}`)

      await ProfileFactory.removeRelated({ related: 'jobs', relatedId: jobId })
    } catch (error) {
      logger.error(`Error on remove job: ${error.message}`)
      return Promise.reject(toBusinessError(error))
    }
  }

  return Object.freeze({
    addOneToProfile,
    updateOne,
    removeOne,
  })
}

module.exports = makeProfileJobsService
