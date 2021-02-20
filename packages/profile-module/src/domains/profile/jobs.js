const { MongoConnection } = require('@cvfy/mongodb-connection-module')
const mognoose = require('mongoose')

/**
 * Schema
 */
const JobSchema = new mognoose.Schema({
  profile: { type: String, required: true },
  company: { type: String, required: true, trim: true },
  position: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
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
    transform: function(doc, ret) {
      delete ret._id
    },
  },
})

/**
 * Indexes
 */
JobSchema.index({ profile: 1 })

module.exports = MongoConnection.model('jobs', JobSchema)
