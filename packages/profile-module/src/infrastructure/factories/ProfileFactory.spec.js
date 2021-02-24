const ProfileFactory = require('./ProfileFactory')

describe('ProfileFactory', () => {
  describe('CreatePrpfile', () => {
    test('it should return the created profile', async () => {
      // Arrange
      const profileDTO = { name: 'Steven', contact: {} }
      const newProfile = { id: '602689d5148808021bbd653d', ...profileDTO }
      const dependencies = {
        ProfileModel: {
          create: jest.fn(() => Promise.resolve(newProfile)),
        },
      }

      // Act
      const profileFactory = new ProfileFactory(dependencies)
      const expectedProfile = await profileFactory.createProfile(profileDTO)

      // Asserts
      expect(expectedProfile).toStrictEqual(newProfile)
      expect(dependencies.ProfileModel.create).toHaveBeenCalledWith(profileDTO)
    })
  })
  describe('FindById', () => {
    test('it should call properly the profile model methods: findById and populate the related elements', async () => {
      // Arrange
      const id = '602689d5148808021bbd653d'
      const dependencies = {
        ProfileModel: {
          findById: jest.fn().mockReturnThis(),
          populate: jest.fn().mockReturnThis(),
        },
      }

      // Act
      const profileFactory = new ProfileFactory(dependencies)
      await profileFactory.findById(id)

      // Asserts
      expect(dependencies.ProfileModel.findById).toHaveBeenCalledWith(id)
      expect(dependencies.ProfileModel.populate).toHaveBeenCalledWith('projects')
      expect(dependencies.ProfileModel.populate).toHaveBeenCalledWith('jobs')
      expect(dependencies.ProfileModel.populate).toHaveBeenCalledWith('educations')
    })
  })
  describe('UpdateProfile', () => {
    test('it should return updated profile that matches the id', async () => {
      // Arrange
      const id = '602689d5148808021bbd653d'
      const profileDTO = { name: 'Strange', contact: { email: 'newEmail@test.com' } }
      const updatedProfile = { id, ...profileDTO }
      const dependencies = {
        ProfileModel: {
          findByIdAndUpdate: jest.fn(() => Promise.resolve(updatedProfile)),
        },
      }

      // Act
      const profileFactory = new ProfileFactory(dependencies)
      const expectedProfile = await profileFactory.updateProfile(id, profileDTO)

      // Asserts
      expect(expectedProfile).toStrictEqual(updatedProfile)
      expect(dependencies.ProfileModel.findByIdAndUpdate).toHaveBeenCalledWith(id, profileDTO, { new: true })
    })
  })
  describe('AddRelated', () => {
    test('it should return the created job and add its id to the profile', async () => {
      // Arrange
      const profileId = '602689d5148808021bbd653d'
      const job = { position: 'super-hero' }
      const newJob = { id: '602689d5148808021bbd653d', ...job }
      const profile = { _id: profileId, jobs: [] }
      const dependencies = {
        ProfileModel: {
          findById: jest.fn(() => Promise.resolve(profile)),
          updateOne: jest.fn(() => Promise.resolve({})),
        },
        JobsModel: {
          create: jest.fn(() => Promise.resolve(newJob)),
        },
      }

      // Act
      const profileFactory = new ProfileFactory(dependencies)
      const expectedJob = await profileFactory.addRelated({ related: 'jobs', profileId, relatedDTO: job })

      // Asserts
      expect(expectedJob).toStrictEqual(newJob)
      expect(dependencies.ProfileModel.findById).toHaveBeenCalledWith(profileId)
      expect(dependencies.JobsModel.create).toHaveBeenCalledWith({ ...job, profile: profileId })
      expect(dependencies.ProfileModel.updateOne).toHaveBeenCalledWith({ _id: profileId }, { $addToSet: { jobs: newJob.id } })
    })
    test('it should return the created project and add its id to the profile', async () => {
      // Arrange
      const profileId = '602689d5148808021bbd653d'
      const project = { title: 'infinity-wars' }
      const newProject = { id: '602689d5148808021bbd653d', ...project }
      const profile = { _id: profileId, projects: [] }
      const dependencies = {
        ProfileModel: {
          findById: jest.fn(() => Promise.resolve(profile)),
          updateOne: jest.fn(() => Promise.resolve({})),
        },
        ProjectsModel: {
          create: jest.fn(() => Promise.resolve(newProject)),
        },
      }

      // Act
      const profileFactory = new ProfileFactory(dependencies)
      const expectedProject = await profileFactory.addRelated({ related: 'projects', profileId, relatedDTO: project })

      // Asserts
      expect(expectedProject).toStrictEqual(newProject)
      expect(dependencies.ProfileModel.findById).toHaveBeenCalledWith(profileId)
      expect(dependencies.ProjectsModel.create).toHaveBeenCalledWith({ ...project, profile: profileId })
      expect(dependencies.ProfileModel.updateOne).toHaveBeenCalledWith({ _id: profileId }, { $addToSet: { projects: newProject.id } })
    })
    test('it should return the created education and add its id to the profile', async () => {
      // Arrange
      const profileId = '602689d5148808021bbd653d'
      const education = { title: 'infinity-wars' }
      const newEducation = { id: '602689d5148808021bbd653d', ...education }
      const profile = { _id: profileId, educations: [] }
      const dependencies = {
        ProfileModel: {
          findById: jest.fn(() => Promise.resolve(profile)),
          updateOne: jest.fn(() => Promise.resolve({})),
        },
        EducationsModel: {
          create: jest.fn(() => Promise.resolve(newEducation)),
        },
      }

      // Act
      const profileFactory = new ProfileFactory(dependencies)
      const expectedEducation = await profileFactory.addRelated({ related: 'educations', profileId, relatedDTO: education })

      // Asserts
      expect(expectedEducation).toStrictEqual(newEducation)
      expect(dependencies.ProfileModel.findById).toHaveBeenCalledWith(profileId)
      expect(dependencies.EducationsModel.create).toHaveBeenCalledWith({ ...education, profile: profileId })
      expect(dependencies.ProfileModel.updateOne).toHaveBeenCalledWith({ _id: profileId }, { $addToSet: { educations: newEducation.id } })
    })
    test('it should be rejected if the profile does not exists', async () => {
      // Arrange
      const profileId = 'no-exists-id'
      const dependencies = {
        ProfileModel: {
          findById: jest.fn(() => Promise.resolve(null)),
        },
      }

      // Act
      const profileFactory = new ProfileFactory(dependencies)

      // Asserts
      await expect(profileFactory.addRelated({ related: 'educations', profileId, relatedDTO: {} })).rejects.toThrow()
      expect(dependencies.ProfileModel.findById).toHaveBeenCalledWith(profileId)
    })
  })
  describe('UpdateRelated', () => {
    test('it should return the updated profile related member', async () => {
      // Arrange
      const related = 'projects'
      const relatedId = '602689d5144408021bbd653a'
      const relatedDTO = { title: 'new-title' }
      const updatedProject = { id: relatedId, ...relatedDTO }
      const dependencies = {
        ProjectsModel: {
          findByIdAndUpdate: jest.fn(() => Promise.resolve(updatedProject)),
        },
      }

      // Act
      const profileFactory = new ProfileFactory(dependencies)
      const expectedProject = await profileFactory.updateRelated({ related, relatedDTO, relatedId })

      // Asserts
      expect(expectedProject).toStrictEqual(updatedProject)
      expect(dependencies.ProjectsModel.findByIdAndUpdate).toHaveBeenCalledWith(relatedId, relatedDTO, { new: true })
    })
    test('it should be rejected if the profile related member does not exists', async () => {
      // Arrange
      const related = 'projects'
      const relatedId = 'no-exists-id'
      const dependencies = {
        ProjectsModel: {
          findByIdAndUpdate: jest.fn(() => Promise.resolve(null)),
        },
      }

      // Act
      const profileFactory = new ProfileFactory(dependencies)

      // Asserts
      await expect(profileFactory.updateRelated({ related, relatedDTO: {}, relatedId })).rejects.toThrow()
      expect(dependencies.ProjectsModel.findByIdAndUpdate).toHaveBeenCalledWith(relatedId, {}, { new: true })
    })
  })
  describe('RemoveRelated', () => {
    test('it should call the remove method of related profile member and removes its id from the profile', async () => {
      // Arrange
      const relatedId = '602689d5144408021bbd653a'
      const profileId = '602689d5145408021bbd653b'
      const job = { id: relatedId, profile: profileId, title: 'Some', remove: jest.fn() }
      const dependencies = {
        ProfileModel: {
          updateOne: jest.fn(() => Promise.resolve({})),
        },
        JobsModel: {
          findOneAndDelete: jest.fn(() => Promise.resolve(job)),
        },
      }

      // Act
      const profileFactory = new ProfileFactory(dependencies)
      await profileFactory.removeRelated({ related: 'jobs', relatedId })

      // Asserts
      expect(dependencies.JobsModel.findOneAndDelete).toHaveBeenCalledWith({ _id: relatedId })
      expect(dependencies.ProfileModel.updateOne).toHaveBeenCalledWith({ _id: job.profile }, { $pull: { jobs: relatedId } })
    })
    test('it should be rejected if the profile does not exists', async () => {
      // Arrange
      const relatedId = '602689d5144408021bbd653a'
      const dependencies = {
        EducationsModel: {
          findOneAndDelete: jest.fn(() => Promise.resolve(null)),
        },
      }

      // Act
      const profileFactory = new ProfileFactory(dependencies)

      // Asserts
      await expect(profileFactory.removeRelated({ related: 'educations', relatedId })).rejects.toThrow()
      expect(dependencies.EducationsModel.findOneAndDelete).toHaveBeenCalledWith({ _id: relatedId })
    })
  })
})
