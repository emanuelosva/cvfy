const { profilesService } = require('@cvfy/profile-module')
const { nanoid } = require('nanoid')
const { ApiError } = require('../errors')
const { httpStatus } = require('../utils')

async function createOneProfile(request, reply) {
  const { body: profileDTO, headers } = request

  const owner = headers['x-user-key'] || nanoid()
  const profile = await profilesService.createOne({ ...profileDTO, owner })

  if (!headers['x-user-key']) reply.header('x-user-key', owner)
  reply.code(httpStatus.created).send({ profile })
}

async function findOneById(request, reply) {
  const { params: { id } } = request

  const profile = await profilesService.findById(id)
  if (!profile) ApiError.throw(`profile with id: ${id} not found`, httpStatus.notFound)

  reply.code(httpStatus.ok).send({ profile })
}

async function findOneBySlug(request, reply) {
  const { params: { slug } } = request

  const profile = await profilesService.findBySlug(slug)
  if (!profile) ApiError.throw(`profile with slug: ${slug} not found`, httpStatus.notFound)

  reply.code(httpStatus.ok).send({ profile })
}

async function updateOne(request, reply) {
  const { params: { id }, body: profileDTO } = request

  const profile = await profilesService.updateOne(id, profileDTO)
  reply.code(httpStatus.ok).send({ profile })
}

async function makePublic(request, reply) {
  const { user, params: { id } } = request

  const profile = await profilesService.makePublic({ id, owner: user.id })
  reply.code(httpStatus.ok).send({ profile })
}

async function updateOwner(request, reply) {
  const { params: { id }, user } = request

  const actualProfile = await profilesService.findById(id)
  if (!actualProfile) ApiError.throw(`profile with id: ${id} not found`, httpStatus.notFound)

  const temporalOwnerValue = request.headers['x-forwarded-for']
  if (actualProfile.owner !== temporalOwnerValue) ApiError.throw(ApiError.types.FORBIDDEN)

  const profile = await profilesService.updateOwner({ id, owner: user.id })
  reply.code(httpStatus.ok).send({ profile })
}

async function addJobToProfile(request, reply) {
  const { body: { profileId, job: jobDTO } } = request

  const job = await profilesService.jobs().addOneToProfile(profileId, jobDTO)
  reply.code(httpStatus.created).send({ job })
}

async function updateJobProfile(request, reply) {
  const { params: { id }, body: jobDTO } = request

  const job = await profilesService.jobs().updateOne(id, jobDTO)
  reply.code(httpStatus.ok).send({ job })
}

async function removeJob(request, reply) {
  const { params: { id } } = request

  await profilesService.jobs().removeOne(id)
  reply.code(httpStatus.ok).send({ success: true })
}

async function addProjectToProfile(request, reply) {
  const { body: { profileId, project: projectDTO } } = request

  const project = await profilesService.projects().addOneToProfile(profileId, projectDTO)
  reply.code(httpStatus.created).send({ project })
}

async function updateProjectProfile(request, reply) {
  const { params: { id }, body: projectDTO } = request

  const project = await profilesService.projects().updateOne(id, projectDTO)
  reply.code(httpStatus.ok).send({ project })
}

async function removeProject(request, reply) {
  const { params: { id } } = request

  await profilesService.projects().removeOne(id)
  reply.code(httpStatus.ok).send({ success: true })
}

async function addEducationToProfile(request, reply) {
  const { body: { profileId, education: educationDTO } } = request

  const education = await profilesService.educations().addOneToProfile(profileId, educationDTO)
  reply.code(httpStatus.created).send({ education })
}

async function updateEducationProfile(request, reply) {
  const { params: { id }, body: educationDTO } = request

  const education = await profilesService.educations().updateOne(id, educationDTO)
  reply.code(httpStatus.ok).send({ education })
}

async function removeEducation(request, reply) {
  const { params: { id } } = request

  await profilesService.educations().removeOne(id)
  reply.code(httpStatus.ok).send({ success: true })
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
