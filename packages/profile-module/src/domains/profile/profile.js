const { MongoConnection } = require('@cvfy/mongodb-connection-module')
const { constants: { entities } } = require('@cvfy/common-module')
const mognoose = require('mongoose')

const profileOwnerTypes = Object.values(entities.profile.ownerTypes)

/**
 * Schema
 */
const ProfileSchema = new mognoose.Schema({
  owner: { type: String, required: true },
  ownerType: { type: String, enum: profileOwnerTypes, default: entities.profile.ownerTypes.PEROSN },
  fullName: { type: String, required: true, trim: true },
  description: { type: String },
  contact: {
    email: { type: String, trim: true, lower: true },
    phoneNumber: { type: String, trim: true },
    optionalLink: { type: String, trim: true },
  },
  socialLinks: { type: Array, default: [] },
  jobs: { type: [String], default: [] },
  projects: { type: [String], default: [] },
  education: { type: [String], default: [] },
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

module.exports = MongoConnection().model('profiles', ProfileSchema)
