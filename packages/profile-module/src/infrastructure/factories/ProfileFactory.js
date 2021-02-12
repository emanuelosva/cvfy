const { ProfileErrors } = require('../../errors')

class ProfileFactory {
  constructor({ ProfileModel, JobsModel, ProjectsModel, EducationsModel }) {
    this._profile = ProfileModel
    this._jobs = JobsModel
    this._projects = ProjectsModel
    this._educations = EducationsModel
  }

  async createProfile(profileDTO) {
    try {
      const profile = await this._profile.create(profileDTO)
      return profile
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async findById(id) {
    try {
      const profile = await this._profile.findById(id)
        .populate('projects')
        .populate('jobs')
        .populate('education')

      return profile
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async updateProfile(id, profileUpdateDTO) {
    try {
      const profile = this._profile.findByIdAndUpdate(
        id,
        { ...profileUpdateDTO },
        { new: true },
      )
      return profile
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async addRelated({ related, profileId, relatedDTO }) {
    try {
      const profile = await this._profile.findById(profileId)
      if (!profile) ProfileErrors.throw(ProfileErrors.types.PROFILE_NOT_EXISTS)

      const relatedEntitie = await this[`_${related}`].create(relatedDTO)

      profile[related].push(relatedEntitie.id)
      await profile.save()

      return relatedEntitie
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async updateRelated({ related, relatedId, relatedDTO }) {
    try {
      const relatedEntitie = await this[`_${related}`].findByIdAndUpdate(
        relatedId,
        { ...relatedDTO },
        { new: true },
      )
      if (!relatedEntitie) ProfileErrors.throw(ProfileErrors.types.relatedNotExists(related))

      return relatedEntitie
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async removeRelated({ related, profileId, relatedId }) {
    try {
      const profile = await this._profile.findById(profileId)
      if (!profile) ProfileErrors.throw(ProfileErrors.types.PROFILE_NOT_EXISTS)

      const relatedEntitie = await this[`_${related}`].findByIdAndRemove(relatedId)
      if (!relatedEntitie) ProfileErrors.throw(ProfileErrors.types.relatedNotExists(related))

      const index = profile[related].indexOf(relatedEntitie.id)
      if (index === -1) return null

      profile[related].splice(index, 1)
      await profile.save()
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

module.exports = ProfileFactory
