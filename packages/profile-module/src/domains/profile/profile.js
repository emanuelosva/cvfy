const { MongoConnection } = require('@cvfy/mongodb-connection-module')
const { constants: { entities } } = require('@cvfy/common-module')
const mongoose = require('mongoose')

const profileOwnerTypes = Object.values(entities.profile.ownerTypes)
const profileTemplateTypes = Object.values(entities.profile.templateNames)

const SocialLinkSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, lower: true },
  link: { type: String, required: true, trim: true, lower: true },
}, {
  _id: false,
})

/**
 * Schema
 */
const ProfileSchema = new mongoose.Schema({
  slug: { type: String, required: true },
  owner: { type: String, required: true },
  ownerType: { type: String, enum: profileOwnerTypes, default: entities.profile.ownerTypes.PEROSN },
  profesionalProfile: { type: String, default: '' },
  template: { type: String, enum: profileTemplateTypes, required: true },
  fullName: { type: String, required: true, trim: true },
  description: { type: String },
  contact: {
    email: { type: String, trim: true, lower: true, default: '' },
    phoneNumber: { type: String, trim: true, default: '' },
    optionalLink: { type: String, trim: true, default: '' },
  },
  socialLinks: { type: [SocialLinkSchema], default: [] },
  projects: { type: [{ type: String, ref: 'projects' }], default: [] },
  jobs: { type: [{ type: String, ref: 'jobs' }], default: [] },
  educations: { type: [{ type: String, ref: 'educations' }], default: [] },
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
    transform: function(doc, ret) {
      delete ret._id
    },
  },
})

/**
 * Index
 */
ProfileSchema.index({ owner: 1 })
ProfileSchema.index({ owner: 1, type: 1 })
ProfileSchema.index({ slug: 1 })
ProfileSchema.index({ slug: 1, type: 1 })

module.exports = MongoConnection.model('profiles', ProfileSchema)
