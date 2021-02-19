const { MongoConnection } = require('@cvfy/mongodb-connection-module')
const mongoose = require('mongoose')
const randToken = require('rand-token')

/**
 * Schema
 */
const RefreshTokenSchema = new mongoose.Schema({
  owner: { type: String, required: true },
  refreshToken: { type: String },
  scope: { type: String, required: true },
  isValid: { type: Boolean, default: true },
}, {
  timestamps: true,
  id: true,
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
    versionKey: false,
  },
})

/**
 * Index
 */
RefreshTokenSchema.index({ owner: 1 })
RefreshTokenSchema.index({ refreshToken: 1 })

/**
 * Hooks
 */
RefreshTokenSchema.pre('save', function(next) {
  try {
    if (!this.refreshToken) {
      this.refreshToken = randToken.uid(64)
    }
    next()
  } catch (error) {
    next(error)
  }
})

module.exports = MongoConnection.model('refresh_tokens', RefreshTokenSchema)
