const { nanoid } = require('nanoid')
const {
  Profile: {
    profile: ProfileModel,
    projects: ProjectsModel,
    jobs: JobsModel,
    educations: EducationsModel,
  },
} = require('./domains')
const { factories } = require('./infrastructure')
const { profileUseCases } = require('./useCases')

const ProfileFactory = new factories.ProfileFactory({
  ProfileModel,
  ProjectsModel,
  JobsModel,
  EducationsModel,
})

module.exports = {
  /** Self profile methods */
  createOneProfile: profileUseCases.makeCreateNewProfile({ ProfileFactory, idGenerator: nanoid }),
  findById: profileUseCases.makeFindProfileById({ ProfileFactory }),
  findBySlug: profileUseCases.makeFindProfileBySlug({ ProfileFactory }),
  updateOne: profileUseCases.makeUpdateProfile({ ProfileFactory }),
  publishProfile: profileUseCases.makePublishProfile({ ProfileFactory }),
  updateOwnerOfProfile: profileUseCases.makeUpdateOwnerOfProfile({ ProfileFactory }),

  /** Job methods */
  addJob: profileUseCases.makeAddProfileJob({ ProfileFactory }),
  updateJob: profileUseCases.makeUpdateProfileJob({ ProfileFactory }),
  removeJob: profileUseCases.makeRemoveProfileJob({ ProfileFactory }),

  /** Project methods */
  addProject: profileUseCases.makeAddProfileProject({ ProfileFactory }),
  updateProject: profileUseCases.makeUpdateProfileProject({ ProfileFactory }),
  removeProject: profileUseCases.makeRemoveProfileProject({ ProfileFactory }),

  /** Education methods */
  addEducation: profileUseCases.makeAddProfileEducation({ ProfileFactory }),
  updateEducation: profileUseCases.makeUpdateProfileEducation({ ProfileFactory }),
  removeEducation: profileUseCases.makeRemoveProfileEducation({ ProfileFactory }),
}
