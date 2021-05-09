const { profilesService } = require('@cvfy/profile-module')
const {
  ProfileType,
  ProjectType,
  JobType,
  EducationType,
  ProfileCreateInputType,
  ProjectCreateInputType,
  EducationCreateInputType,
  JobCreateInputType,
  ProfileUpdateInputType,
  ProjectUpdateInputType,
  EducationUpdateInputType,
  JobUpdateInputType,
} = require('./types')
const {
  NonNullableIDType,
  VoidType,
} = require('../../commonTypes')
const { Auth } = require('../../middleware')

module.exports = {
  CreateProfile: {
    type: ProfileType,
    args: {
      data: { type: ProfileCreateInputType },
    },
    resolve: async (_, { data }, ctx) => {
      Auth.isAuthenticated(ctx)
      const profile = await profilesService.createOne(data)
      return profile
    },
  },
  UpdateProfile: {
    type: ProfileType,
    args: {
      id: { type: NonNullableIDType },
      data: { type: ProfileUpdateInputType },
    },
    resolve: async (_, { id, data }, ctx) => {
      Auth.isAuthenticated(ctx)
      const profile = await profilesService.updateOne(id, data)
      return profile
    },
  },
  PublishProfile: {
    type: ProfileType,
    args: {
      id: { type: NonNullableIDType },
    },
    resolve: async (_, { id }, ctx) => {
      Auth.isAuthenticated(ctx)
      const { user: { id: owner } } = ctx
      const profile = await profilesService.makePublic({ id, owner })
      return profile
    },
  },
  AddProjectToPtofile: {
    type: ProjectType,
    args: {
      profileId: { type: NonNullableIDType },
      data: { type: ProjectCreateInputType },
    },
    resolve: async (_, { profileId, data }, ctx) => {
      Auth.isAuthenticated(ctx)
      const project = await profilesService.projects().addOneToProfile(profileId, data)
      return project
    },
  },
  UpdateProject: {
    type: ProjectType,
    args: {
      id: { type: NonNullableIDType },
      data: { type: ProjectUpdateInputType },
    },
    resolve: async (_, { id, data }, ctx) => {
      Auth.isAuthenticated(ctx)
      const project = await profilesService.projects().updateOne(id, data)
      return project
    },
  },
  DeleteProject: {
    type: VoidType,
    args: {
      id: { type: NonNullableIDType },
    },
    resolve: async (_, { id }, ctx) => {
      Auth.isAuthenticated(ctx)
      await profilesService.projects().removeOne(id)
      return null
    },
  },
  AddJobToPtofile: {
    type: JobType,
    args: {
      profileId: { type: NonNullableIDType },
      data: { type: JobCreateInputType },
    },
    resolve: async (_, { profileId, data }, ctx) => {
      Auth.isAuthenticated(ctx)
      const job = await profilesService.jobs().addOneToProfile(profileId, data)
      return job
    },
  },
  UpdateJob: {
    type: JobType,
    args: {
      id: { type: NonNullableIDType },
      data: { type: JobUpdateInputType },
    },
    resolve: async (_, { id, data }, ctx) => {
      Auth.isAuthenticated(ctx)
      const project = await profilesService.jobs().updateOne(id, data)
      return project
    },
  },
  DeleteJob: {
    type: VoidType,
    args: {
      id: { type: NonNullableIDType },
    },
    resolve: async (_, { id }, ctx) => {
      Auth.isAuthenticated(ctx)
      await profilesService.jobs().removeOne(id)
      return null
    },
  },
  AddEducationToPtofile: {
    type: EducationType,
    args: {
      profileId: { type: NonNullableIDType },
      data: { type: EducationCreateInputType },
    },
    resolve: async (_, { profileId, data }, ctx) => {
      Auth.isAuthenticated(ctx)
      const education = await profilesService.educations().addOneToProfile(profileId, data)
      return education
    },
  },
  UpdateEducation: {
    type: EducationType,
    args: {
      id: { type: NonNullableIDType },
      data: { type: EducationUpdateInputType },
    },
    resolve: async (_, { id, data }, ctx) => {
      Auth.isAuthenticated(ctx)
      const educations = await profilesService.educations().updateOne(id, data)
      return educations
    },
  },
  DeleteEducation: {
    type: VoidType,
    args: {
      id: { type: NonNullableIDType },
    },
    resolve: async (_, { id }, ctx) => {
      Auth.isAuthenticated(ctx)
      await profilesService.educations().removeOne(id)
      return null
    },
  },
}
