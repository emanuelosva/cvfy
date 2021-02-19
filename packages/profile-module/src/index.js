const { nanoid } = require('nanoid')
const { ProfileErrors } = require('./errors')
const { factories } = require('./infrastructure')
const { makeProfileServices } = require('./useCases')
const {
  Profile: {
    profile: ProfileModel,
    projects: ProjectsModel,
    jobs: JobsModel,
    educations: EducationsModel,
  },
} = require('./domains')

const ProfileFactory = new factories.ProfileFactory({
  ProfileModel,
  ProjectsModel,
  JobsModel,
  EducationsModel,
})

module.exports = {
  profilesService: {
    ...makeProfileServices.makeProfilesUseCases({ ProfileFactory, idGenerator: nanoid }),
    projects: () => makeProfileServices.makeProjectsUseCases({ ProfileFactory }),
    jobs: () => makeProfileServices.makeJobsUseCases({ ProfileFactory }),
    educations: () => makeProfileServices.makeEducationsUseCases({ ProfileFactory }),
  },
  ProfileErrors,
}
