const {
  makeCreateNewProfile,
  makeFindProfileById,
  makeFindProfileBySlug,
  makeUpdateProfile,
} = require('./profile')

describe('ProfileUseCases', () => {
  describe('CreateNewProfile', () => {
    test.todo('it should return the created profile')
    test.todo('it should return the created profile with id added to slug if slug exists')
  })
  describe('FindProfileById', () => {
    test.todo('it should return the finded profile')
    test.todo('it should be rejected if id is invalid')
  })
  describe('FindProfileBySlug', () => {
    test.todo('it shoul return the finded profile')
  })
  describe('UpdateProfile', () => {
    test.todo('it should return the updated profile')
    test.todo('it should be rejected if the profile does not exists')
  })
})
