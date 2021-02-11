const { MongoConnection } = require('@cvfy/mongodb-connection-module')
const { constants: { entities } } = require('@cvfy/common-module')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userTypes = Object.keys(entities.users.enumTypes)

/**
 * Schema
 */
const UserSchema = new mongoose.Schema({
  email: { type: String, default: true, trim: true, lower: true },
  name: { type: String, required: true, trim: true, lower: true },
  lastname: { type: String, required: true, trim: true, lower: true },
  password: { type: String, select: false },
  isActive: { type: Boolean, default: true },
  type: { type: String, enum: userTypes, default: entities.users.enumTypes.USER },
}, {
  id: true,
  timestamps: true,
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.password
      delete ret._id
      delete ret.__v
    },
  },
})

/**
 * Indexes
 */
UserSchema.index({ email: 1 })
UserSchema.index({ email: 1, type: 1 })
UserSchema.index({ _id: 1, type: 1 })

/**
 * Middlewares
 */
UserSchema.pre('save', async function(next) {
  try {
    if (this.isModified('password')) {
      const saltRounds = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(this.password, saltRounds)
      this.password = hash
    }
    next()
  } catch (error) {
    next(error)
  }
})

module.exports = MongoConnection().model('users', UserSchema)
