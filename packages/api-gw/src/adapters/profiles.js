const profiles = require('@cvfy/profile-module')
const { ApiError } = require('../errors')
const { httpStatus } = require('../utils')

async function createOneProfile(request, replay) {
  const { body: profileDTO, user } = request
  const temporalOwnerValue = request.headers['x-forwarded-for']

  const owner = user?.id ? user.id : temporalOwnerValue
  const profile = await profiles.createOneProfile({ ...profileDTO, owner })
  replay.code(httpStatus.created).send({ profile })
}

async function findOneById(request, replay) {
  const { params: { id } } = request

  const profile = await profiles.findById(id)
  if (!profile) ApiError.throw(`profile with id: ${id} not found`, httpStatus.notFound)

  replay.code(httpStatus.ok).send({ profile })
}

async function findOneBySlug(request, replay) {
  const { params: { slug } } = request

  const profile = await profiles.findBySlug(slug)
  if (!profile) ApiError.throw(`profile with slug: ${slug} not found`, httpStatus.notFound)

  replay.code(httpStatus.ok).send({ profile })
}

async function updateOne(request, replay) {
  const { params: { id }, body: profileDTO } = request

  const profile = await profiles.updateOne(id, profileDTO)
  replay.code(httpStatus.ok).send({ profile })
}

async function makePublic(request, replay) {
  const { user, params: { id } } = request
  const temporalOwnerValue = request.headers['x-forwarded-for']

  const actualProfile = await profiles.findById(id)
  if (!actualProfile) ApiError.throw(`profile with id: ${id} not found`, httpStatus.notFound)
  if (actualProfile.owner !== temporalOwnerValue) ApiError.throw(ApiError.types.FORBIDDEN)

  const profile = await profiles.publishProfile({ id, owner: user.id })
  replay.code(httpStatus.ok).send({ profile })
}

async function updateOwner(request, replay) {
  const { params: { id }, user } = request

  const profile = await profiles.updateOwnerOfProfile({ id, owner: user.id })
  replay.code(httpStatus.ok).send({ profile })
}

async function addJobToProfile(request, replay) {
  const { body: { profileId, job: jobDTO } } = request

  const job = await profiles.addJob(profileId, jobDTO)
  replay.code(httpStatus.created).send({ job })
}

async function updateJobProfile(request, replay) {
  const { params: { id }, body: jobDTO } = request

  const job = await profiles.updateJob(id, jobDTO)
  replay.code(httpStatus.ok).send({ job })
}

async function removeJob(request, replay) {
  const { params: { id } } = request

  await profiles.removeJob(id)
  replay.code(httpStatus.noContent).send({})
}

async function addProjectToProfile(request, replay) {
  const { body: { profileId, project: projectDTO } } = request

  const project = await profiles.addProject(profileId, projectDTO)
  replay.code(httpStatus.created).send({ project })
}

async function updateProjectProfile(request, replay) {
  const { params: { id }, body: projectDTO } = request

  const project = await profiles.updateProject(id, projectDTO)
  replay.code(httpStatus.ok).send({ project })
}

async function removeProject(request, replay) {
  const { params: { id } } = request

  await profiles.removeProject(id)
  replay.code(httpStatus.noContent).send({})
}

async function addEducationToProfile(request, replay) {
  const { body: { profileId, education: educationDTO } } = request

  const education = await profiles.addEducation(profileId, educationDTO)
  replay.code(httpStatus.created).send({ education })
}

async function updateEducationProfile(request, replay) {
  const { params: { id }, body: educationDTO } = request

  const education = await profiles.updateEducation(id, educationDTO)
  replay.code(httpStatus.ok).send({ education })
}

async function removeEducation(request, replay) {
  const { params: { id } } = request

  await profiles.removeEducation(id)
  replay.code(httpStatus.noContent).send({})
}

module.exports = {
  createOneProfile,
  findOneById,
  findOneBySlug,
  updateOne,
  makePublic,
  updateOwner,
  addJobToProfile,
  updateJobProfile,
  removeJob,
  addProjectToProfile,
  updateProjectProfile,
  removeProject,
  addEducationToProfile,
  updateEducationProfile,
  removeEducation,
}
