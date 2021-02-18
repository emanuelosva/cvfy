const { MongoConnection } = require('@cvfy/mongodb-connection-module')
const { constants: { entities } } = require('@cvfy/common-module')
const mongoose = require('mongoose')

const profileOwnerTypes = Object.values(entities.profile.ownerTypes)

const profileTemplateTypes = Object.values(entities.profile.templateNames)

const SocialLinkSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, lower: true },
  link: { type: String, required: true, trim: true, lower: true },
})

/**
 * Schema
 */
const ProfileSchema = new mongoose.Schema({
  slug: { type: String, required: true },
  owner: { type: String, required: true },
  ownerType: { type: String, enum: profileOwnerTypes, default: entities.profile.ownerTypes.PEROSN },
  template: { type: String, enum: profileTemplateTypes, required: true },
  fullName: { type: String, required: true, trim: true },
  description: { type: String },
  contact: {
    email: { type: String, trim: true, lower: true },
    phoneNumber: { type: String, trim: true },
    optionalLink: { type: String, trim: true },
  },
  socialLinks: { type: [SocialLinkSchema], default: [] },
  jobs: { type: [String], default: [] },
  projects: { type: [String], default: [] },
  educations: { type: [String], default: [] },
  skills: { type: [String], default: [] },
  isPublic: { type: Boolean, default: false },
}, {
  id: true,
  timestamps: true,
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
    versionKey: false,
  },
})

/**
 * Indexes
 */
ProfileSchema.index({ owner: 1 })
ProfileSchema.index({ owner: 1, type: 1 })
ProfileSchema.index({ slug: 1 })
ProfileSchema.index({ slug: 1, type: 1 })

module.exports = MongoConnection().model('profiles', ProfileSchema)
