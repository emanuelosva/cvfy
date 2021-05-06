const { profiles } = require('../../../../adapters')
const profileValidators = require('./validators')
const { auth } = require('../../middleware')

module.exports = [
  {
    method: 'POST',
    url: '/',
    preValidation: [auth.isAuthenticated],
    schema: { ...profileValidators.createProfile },
    handler: profiles.createOneProfile,
  },
  {
    method: 'GET',
    url: '/:id',
    schema: { ...profileValidators.idInParamsValidator },
    handler: profiles.findOneById,
  },
  {
    method: 'PUT',
    url: '/:id',
    schema: { ...profileValidators.updateProfile },
    handler: profiles.updateOne,
  },
  {
    method: 'PUT',
    url: '/:id/change-owner',
    schema: { ...profileValidators.idInParamsValidator },
    preValidation: [auth.isAuthenticated],
    handler: profiles.updateOwner,
  },
  {
    method: 'POST',
    url: '/:id/publish',
    schema: { ...profileValidators.idInParamsValidator },
    preValidation: [auth.isAuthenticated],
    handler: profiles.makePublic,
  },
  {
    method: 'GET',
    url: '/public/:slug',
    schema: { ...profileValidators.slugInParamsValidator },
    handler: profiles.findOneBySlug,
  },
  {
    method: 'POST',
    url: '/projects',
    schema: { ...profileValidators.addProject },
    handler: profiles.addProjectToProfile,
  },
  {
    method: 'PUT',
    url: '/projects/:id',
    schema: { ...profileValidators.updateProject },
    handler: profiles.updateProjectProfile,
  },
  {
    method: 'DELETE',
    url: '/projects/:id',
    schema: { ...profileValidators.idInParamsValidator },
    handler: profiles.removeProject,
  },
  {
    method: 'POST',
    url: '/jobs',
    schema: { ...profileValidators.addJob },
    handler: profiles.addJobToProfile,
  },
  {
    method: 'PUT',
    url: '/jobs/:id',
    schema: { ...profileValidators.updateJob },
    handler: profiles.updateJobProfile,
  },
  {
    method: 'DELETE',
    url: '/jobs/:id',
    schema: { ...profileValidators.idInParamsValidator },
    handler: profiles.removeJob,
  },
  {
    method: 'POST',
    url: '/educations',
    schema: { ...profileValidators.addEducation },
    handler: profiles.addEducationToProfile,
  },
  {
    method: 'PUT',
    url: '/educations/:id',
    schema: { ...profileValidators.updateEducation },
    handler: profiles.updateEducationProfile,
  },
  {
    method: 'DELETE',
    url: '/educations/:id',
    schema: { ...profileValidators.idInParamsValidator },
    handler: profiles.removeEducation,
  },
]
