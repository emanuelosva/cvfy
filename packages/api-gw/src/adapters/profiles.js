const { profilesService } = require('@cvfy/profile-module')
const { ApiError } = require('../errors')
const { httpStatus } = require('../utils')

async function createOneProfile(request, replay) {
  const { body: profileDTO, user } = request
  const temporalOwnerValue = request.headers['x-forwarded-for']

  const owner = user?.id ? user.id : temporalOwnerValue
  const profile = await profilesService.createOne({ ...profileDTO, owner })
  replay.code(httpStatus.created).send({ profile })
}

async function findOneById(request, replay) {
  const { params: { id } } = request

  const profile = await profilesService.findById(id)
  if (!profile) ApiError.throw(`profile with id: ${id} not found`, httpStatus.notFound)

  replay.code(httpStatus.ok).send({ profile })
}

async function findOneBySlug(request, replay) {
  const { params: { slug } } = request

  const profile = await profilesService.findBySlug(slug)
  if (!profile) ApiError.throw(`profile with slug: ${slug} not found`, httpStatus.notFound)

  replay.code(httpStatus.ok).send({ profile })
}

async function updateOne(request, replay) {
  const { params: { id }, body: profileDTO } = request

  const profile = await profilesService.updateOne(id, profileDTO)
  replay.code(httpStatus.ok).send({ profile })
}

async function makePublic(request, replay) {
  const { user, params: { id } } = request

  const profile = await profilesService.makePublic({ id, owner: user.id })
  replay.code(httpStatus.ok).send({ profile })
}

async function updateOwner(request, replay) {
  const { params: { id }, user } = request

  const actualProfile = await profilesService.findById(id)
  if (!actualProfile) ApiError.throw(`profile with id: ${id} not found`, httpStatus.notFound)

  const temporalOwnerValue = request.headers['x-forwarded-for']
  if (actualProfile.owner !== temporalOwnerValue) ApiError.throw(ApiError.types.FORBIDDEN)

  const profile = await profilesService.updateOwner({ id, owner: user.id })
  replay.code(httpStatus.ok).send({ profile })
}

async function addJobToProfile(request, replay) {
  const { body: { profileId, job: jobDTO } } = request

  const job = await profilesService.jobs().addOneToProfile(profileId, jobDTO)
  replay.code(httpStatus.created).send({ job })
}

async function updateJobProfile(request, replay) {
  const { params: { id }, body: jobDTO } = request

  const job = await profilesService.jobs().updateOne(id, jobDTO)
  replay.code(httpStatus.ok).send({ job })
}

async function removeJob(request, replay) {
  const { params: { id } } = request

  await profilesService.jobs().removeOne(id)
  replay.code(httpStatus.ok).send({ success: true })
}

async function addProjectToProfile(request, replay) {
  const { body: { profileId, project: projectDTO } } = request

  const project = await profilesService.projects().addOneToProfile(profileId, projectDTO)
  replay.code(httpStatus.created).send({ project })
}

async function updateProjectProfile(request, replay) {
  const { params: { id }, body: projectDTO } = request

  const project = await profilesService.projects().updateOne(id, projectDTO)
  replay.code(httpStatus.ok).send({ project })
}

async function removeProject(request, replay) {
  const { params: { id } } = request

  await profilesService.projects().removeOne(id)
  replay.code(httpStatus.ok).send({ success: true })
}

async function addEducationToProfile(request, replay) {
  const { body: { profileId, education: educationDTO } } = request

  const education = await profilesService.educations().addOneToProfile(profileId, educationDTO)
  replay.code(httpStatus.created).send({ education })
}

async function updateEducationProfile(request, replay) {
  const { params: { id }, body: educationDTO } = request

  const education = await profilesService.educations().updateOne(id, educationDTO)
  replay.code(httpStatus.ok).send({ education })
}

async function removeEducation(request, replay) {
  const { params: { id } } = request

  await profilesService.educations().removeOne(id)
  replay.code(httpStatus.ok).send({ success: true })
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
