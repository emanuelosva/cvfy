const logger = require('../../logger')
const { toBusinessError } = require('@cvfy/common-module')

const makeAddProfileProject = ({ ProfileFactory }) => async (profileId, projectDTO) => {
  try {
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
