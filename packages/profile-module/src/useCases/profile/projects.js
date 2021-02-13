const logger = require('../../logger')
const { ProfileErrors } = require('../../errors')
const { toBusinessError, validators } = require('@cvfy/common-module')

const makeAddProfileProject = ({ ProfileFactory }) => async (profileId, projectDTO) => {
  try {
    if (!validators.isMongoId(profileId)) ProfileErrors.throw(ProfileErrors.types.INVALID_ID, 400)

    logger.info(`Adding new project to profile: ${profileId}`)

    const addedProject = await ProfileFactory.addRelated({ related: 'projects', profileId, relatedDTO: projectDTO })
    return addedProject
  } catch (error) {
    logger.error(`Error on add project to profile: ${error.message}`)
    return Promise.resolve(toBusinessError(error))
  }
}

const makeUpdateProfileProject = ({ ProfileFactory }) => async (projectId, projectDTO) => {
  try {
    if (!validators.isMongoId(projectId)) ProfileErrors.throw(ProfileErrors.types.INVALID_ID, 400)

    logger.info(`Updating project : ${projectId}`)

    const updatedJob = await ProfileFactory.updateRelated({ related: 'projects', relatedId: projectId, relatedDTO: projectDTO })
    return updatedJob
  } catch (error) {
    logger.error(`Error on update project: ${error.message}`)
    return Promise.resolve(toBusinessError(error))
  }
}

const makeRemoveProfileProject = ({ ProfileFactory }) => async (profileId, projectId) => {
  try {
    if (!validators.isMongoId(projectId)) ProfileErrors.throw(ProfileErrors.types.INVALID_ID, 400)

    logger.info(`Removing project : ${projectId}`)

    await ProfileFactory.removeRelated({ related: 'projects', profileId, relatedId: projectId })
  } catch (error) {
    logger.error(`Error on remove project: ${error.message}`)
    return Promise.resolve(toBusinessError(error))
  }
}

module.exports = {
  makeAddProfileProject,
  makeUpdateProfileProject,
  makeRemoveProfileProject,
}
