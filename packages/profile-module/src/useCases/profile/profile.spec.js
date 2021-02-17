const {
  makeCreateNewProfile,
  makeFindProfileById,
  makeFindProfileBySlug,
  makeUpdateProfile,
} = require('./profile')

describe('ProfileUseCases', () => {
  describe('CreateNewProfile', () => {
    test('it should return the created profile', async () => {
      // Arrange
      const profileDTO = { fullName: 'Stan Lee' }
      const slug = 'stan-lee'
      const id = '6027e6e08412bc359bebd307'
      const newProfile = { id, slug, ...profileDTO }
      const dependencies = {
        ProfileFactory: {
          findBySlug: jest.fn(() => Promise.resolve(null)),
          createProfile: jest.fn(() => Promise.resolve(newProfile)),
        },
      }

      // Act
      const createNewProfile = makeCreateNewProfile(dependencies)
      const expectedProfile = await createNewProfile(profileDTO)

      // Asserts
      expect(expectedProfile).toStrictEqual(newProfile)
      expect(dependencies.ProfileFactory.findBySlug).toHaveBeenCalled()
      expect(dependencies.ProfileFactory.createProfile).toHaveBeenCalledWith({ slug, ...profileDTO, isPublic: false })
    })
    test('it should return the created profile with id added to slug if slug exists', async () => {
      // Arrange
      const profileDTO = { fullName: 'Stan Lee' }
      const id = '6027e6e08412bc359bebd307'
      const extraSlugId = 'some-id'
      const slug = `stan-lee-${extraSlugId}`
      const newProfile = { id, slug, ...profileDTO }
      const dependencies = {
        ProfileFactory: {
          findBySlug: jest.fn(() => Promise.resolve({})),
          createProfile: jest.fn(() => Promise.resolve(newProfile)),
        },
        idGenerator: jest.fn(() => extraSlugId),
      }

      // Act
      const createNewProfile = makeCreateNewProfile(dependencies)
      const expectedProfile = await createNewProfile(profileDTO)

      // Asserts
      expect(expectedProfile).toStrictEqual(newProfile)
      expect(dependencies.ProfileFactory.findBySlug).toHaveBeenCalled()
      expect(dependencies.ProfileFactory.createProfile).toHaveBeenCalledWith({ slug, ...profileDTO, isPublic: false })
    })
  })
  describe('FindProfileById', () => {
    test('it should return the finded profile', async () => {
      // Arrange
      const id = '6027e6e08412bc359bebd307'
      const profile = { id, slug: 'steven-strange' }
      const dependencies = {
        ProfileFactory: {
          findById: jest.fn(() => Promise.resolve(profile)),
        },
      }

      // Act
      const findProfileById = makeFindProfileById(dependencies)
      const expectedProfile = await findProfileById(id)

      // Asserts
      expect(expectedProfile).toStrictEqual(profile)
      expect(dependencies.ProfileFactory.findById).toHaveBeenCalledWith(id)
    })
    test('it should be rejected if id is invalid', async () => {
      // Arrange
      const id = 'invalid-mongo-id'
      const profile = { id, slug: 'steven-strange' }
      const dependencies = {
        ProfileFactory: {
          findById: jest.fn(() => Promise.resolve(profile)),
        },
      }

      // Act
      const findProfileById = makeFindProfileById(dependencies)

      // Asserts
      await expect(findProfileById(id)).rejects.toThrow()
      expect(dependencies.ProfileFactory.findById).not.toHaveBeenCalled()
    })
  })
  describe('FindProfileBySlug', () => {
    test('it should return the finded profile', async () => {
      // Arrange
      const slug = 'steven-strange'
      const profile = { slug }
      const dependencies = {
        ProfileFactory: {
          findBySlug: jest.fn(() => Promise.resolve(profile)),
        },
      }

      // Act
      const findProfileBySlug = makeFindProfileBySlug(dependencies)
      const expectedProfile = await findProfileBySlug(slug)

      // Asserts
      expect(expectedProfile).toStrictEqual(profile)
      expect(dependencies.ProfileFactory.findBySlug).toHaveBeenCalledWith(slug)
    })
  })
  describe('UpdateProfile', () => {
    test('it should return the updated profile', async () => {
      // Arrange
      const id = '6027e6e08412bc359bebd307'
      const updateDTO = { slug: 'newSlug' }
      const profile = { slug: 'steven-strange', id, ...updateDTO }
      const dependencies = {
        ProfileFactory: {
          updateProfile: jest.fn(() => Promise.resolve(profile)),
        },
      }

      // Act
      const updateProfile = makeUpdateProfile(dependencies)
      const expectedProfile = await updateProfile(id, updateDTO)

      // Asserts
      expect(expectedProfile).toStrictEqual(profile)
      expect(dependencies.ProfileFactory.updateProfile).toHaveBeenCalledWith(id, updateDTO)
    })
    test('it should be rejected if the profile does not exists', async () => {
      // Arrange
      const id = '6027e6e08412bc359bebd307'
      const updateDTO = { slug: 'newSlug' }
      const dependencies = {
        ProfileFactory: {
          updateProfile: jest.fn(() => Promise.resolve(null)),
        },
      }

      // Act
      const updateProfile = makeUpdateProfile(dependencies)

      // Asserts
      await expect(updateProfile(id, updateDTO)).rejects.toThrow()
      expect(dependencies.ProfileFactory.updateProfile).toHaveBeenCalledWith(id, updateDTO)
    })
  })
  describe('AddRelated', () => {
    test.todo('it should return the added education')
  })
  describe('UpdateRelated', () => {
    test.todo('it should return the updated job')
  })
  describe('RemoveRelated', () => {
    test.todo('it should call the remove factory method with project model')
  })
})
