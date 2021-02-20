const { MongoConnection } = require('@cvfy/mongodb-connection-module')
const mognoose = require('mongoose')

/**
 * Schema
 */
const ProjectSchema = new mognoose.Schema({
  title: { type: String, required: true },
  position: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  link: { type: String, default: '', trime: true },
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
ProjectSchema.index({ profile: 1 })

module.exports = MongoConnection.model('projects', ProjectSchema)
