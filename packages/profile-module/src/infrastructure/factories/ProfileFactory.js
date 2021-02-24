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
        .populate('educations')

      return profile
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async findBySlug(slug, { populate = true, addActive = true } = {}) {
    try {
      const query = this._profile.findOne({ slug, ...(addActive && { active: true }) })
      if (populate) {
        query.populate('projects').populate('jobs').populate('educations')
      }

      const profile = await query.exec()

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

      const relatedEntitie = await this[`_${related}`].create({ ...relatedDTO, profile: profileId })

      await this._profile.updateOne({ _id: profileId }, { $addToSet: { [related]: relatedEntitie.id } })

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
      if (!relatedEntitie) ProfileErrors.throw(ProfileErrors.types.relatedNotExists(related), 404)

      return relatedEntitie
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async removeRelated({ related, relatedId }) {
    try {
      const relatedEntitie = await this[`_${related}`].findOneAndDelete({ _id: relatedId })
      if (!relatedEntitie) ProfileErrors.throw(ProfileErrors.types.relatedNotExists(related), 404)

      await this._profile.updateOne({ _id: relatedEntitie.profile }, { $pull: { [related]: relatedId } })
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

module.exports = ProfileFactory
