const { MongoConnection } = require('@cvfy/mongodb-connection-module')
const mognoose = require('mongoose')

/**
 * Schema
 */
const EducationSchema = new mognoose.Schema({
  profile: { type: String, required: true },
  title: { type: String, required: true, trim: true },
  school: { type: String, required: true, trim: true },
  certificateCode: { type: String, default: '' },
  startTime: { type: Date, default: null },
  endTime: { type: Date, default: null },
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
EducationSchema.index({ profile: 1 })

module.exports = MongoConnection.model('educations', EducationSchema)
