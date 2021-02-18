const makeUserService = require('./users')

describe('USER - uses cases', () => {
  describe('CreateUser', () => {
    test('it should return the created user if email is available', async () => {
      // Arrange
      const user = { email: 'stan@marvel.com', name: 'Stan' }
      const newUser = { id: '6025a7c81405f26e3579e426', ...user }
      const dependencies = {
        UsersModel: {
          findOne: jest.fn(() => Promise.resolve(null)),
          create: jest.fn(() => Promise.resolve(newUser)),
        },
      }

      // Act
      const usersService = makeUserService(dependencies)
      const expectedUser = await usersService.createOne(user)

      // Asserts
      expect(expectedUser).toStrictEqual(newUser)
      expect(dependencies.UsersModel.findOne).toHaveBeenCalledWith({ email: user.email })
      expect(dependencies.UsersModel.create).toHaveBeenCalledWith(user)
    })
    test('it should be rejected if email exists', async () => {
      // Arrange
      const user = { email: 'stan@marvel.com', name: 'Stan' }
      const dependencies = {
        UsersModel: {
          findOne: jest.fn(() => Promise.resolve(user)),
          create: jest.fn(() => Promise.resolve()),
        },
      }

      // Act
      const usersService = makeUserService(dependencies)

      // Asserts
      await expect(usersService.createOne(user)).rejects.toThrow()
      expect(dependencies.UsersModel.findOne).toHaveBeenCalledWith({ email: user.email })
      expect(dependencies.UsersModel.create).not.toHaveBeenCalled()
    })
  })
  describe('FindUserByEmail', () => {
    test('it should return the user if email matches with one record', async () => {
      // Arrange
      const user = { email: 'stan@marvel.com', name: 'Stan' }
      const dependencies = {
        UsersModel: {
          findOne: jest.fn(() => Promise.resolve(user)),
        },
      }

      // Act
      const usersService = makeUserService(dependencies)
      const expectedUser = await usersService.findByEmail(user.email)

      // Asserts
      expect(expectedUser).toStrictEqual(user)
      expect(dependencies.UsersModel.findOne).toHaveBeenCalledWith({ email: user.email })
    })
  })
  describe('FindUserById', () => {
    test('it should return the user if id matches with one record', async () => {
      // Arrange
      const user = { id: '6025a7c81405f26e3579e426' }
      const dependencies = {
        UsersModel: {
          findById: jest.fn(() => Promise.resolve(user)),
        },
      }

      // Act
      const usersService = makeUserService(dependencies)
      const expectedUser = await usersService.findById(user.id)

      // Asserts
      expect(expectedUser).toStrictEqual(user)
      expect(dependencies.UsersModel.findById).toHaveBeenCalledWith(user.id)
    })
  })
  describe('UpdateUser', () => {
    test('it should return the updated user if id matches with one record', async () => {
      // Arrange
      const id = '6025a7c81405f26e3579e426'
      const userDTO = { name: 'Peter', email: 'spider@man.com' }
      const updatedUser = { id, ...userDTO }
      const dependencies = {
        UsersModel: {
          findByIdAndUpdate: jest.fn(() => Promise.resolve(updatedUser)),
        },
      }

      // Act
      const usersService = makeUserService(dependencies)
      const expectedUser = await usersService.updateOne(id, userDTO)

      // Asserts
      expect(expectedUser).toStrictEqual(updatedUser)
      expect(dependencies.UsersModel.findByIdAndUpdate).toHaveBeenCalledWith(id, { ...userDTO }, { new: true })
    })
    test('it should be rejected if user not found', async () => {
      // Arrange
      const id = '6025a7c81405f26e3579e426'
      const userDTO = { name: 'Peter', email: 'spider@man.com' }
      const dependencies = {
        UsersModel: {
          findByIdAndUpdate: jest.fn(() => Promise.resolve(null)),
        },
      }

      // Act
      const usersService = makeUserService(dependencies)

      // Asserts
      await expect(usersService.updateOne(id, userDTO)).rejects.toThrow()
      expect(dependencies.UsersModel.findByIdAndUpdate).toHaveBeenCalledWith(id, { ...userDTO }, { new: true })
    })
    test('it should be rejected if invalid id is passed', async () => {
      // Arrange
      const id = 'invalid-id'
      const userDTO = { name: 'Peter', email: 'spider@man.com' }
      const dependencies = {
        UsersModel: {
          findByIdAndUpdate: jest.fn(() => Promise.resolve(null)),
        },
      }

      // Act
      const usersService = makeUserService(dependencies)

      // Asserts
      await expect(usersService.updateOne(id, userDTO)).rejects.toThrow()
      expect(dependencies.UsersModel.findByIdAndUpdate).not.toHaveBeenCalled()
    })
  })
})
