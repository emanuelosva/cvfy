const logger = require('../logger')
const { toBusinessError } = require('@cvfy/common-module')

const makeAddProfileEducation = ({ ProfileFactory }) => async (profileId, educationDTO) => {
  try {
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
