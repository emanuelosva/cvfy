const Joi = require('joi')
const { constants: { inputs, profiles } } = require('../../../../utils')

const idSchema = Joi.string().regex(inputs.MONGO_ID_REGEX).message('invalid id')

const idInParamsValidator = {
  params: Joi.object({
    id: idSchema.required(),
  }),
}

const slugInParamsValidator = {
  params: Joi.object({
    slug: Joi.string().min(2).max(inputs.MAX_GENERAL_STRING_LENGTH).required(),
  }),
}

const updateProfile = {
  params: Joi.object({
    id: idSchema.required(),
  }),
  body: Joi.object({
    template: Joi.string().valid(...Object.values(profiles.templateNames)),
    fullName: Joi.string().min(2).max(inputs.MAX_GENERAL_STRING_LENGTH),
    description: Joi.string().max(500),
    contact: Joi.object({
      email: Joi.string().email().max(inputs.MAX_GENERAL_STRING_LENGTH),
      phoneNumber: Joi.string().regex(inputs.PHONE_NUMBER_REGEX),
      optionalLink: Joi.string().uri(),
    }),
    socialLinks: Joi.array().optional().items(
      Joi.object({
        name: Joi.string().min(1).max(inputs.MAX_GENERAL_STRING_LENGTH).required(),
        link: Joi.string().uri().max(inputs.MAX_GENERAL_STRING_LENGTH).required(),
      }),
    ),
    skills: Joi.array().optional().items(
      Joi.string().min(1).max(inputs.MAX_GENERAL_STRING_LENGTH),
    ),
  }),
}

const createProfile = {
  body: Joi.object({
    template: Joi.string().valid(...Object.values(profiles.templateNames)).required(),
    fullName: Joi.string().min(2).max(inputs.MAX_GENERAL_STRING_LENGTH).required(),
    description: Joi.string().max(500),
    contact: Joi.object({
      email: Joi.string().email().max(inputs.MAX_GENERAL_STRING_LENGTH),
      phoneNumber: Joi.string().regex(inputs.PHONE_NUMBER_REGEX),
      optionalLink: Joi.string().uri(),
    }),
    socialLinks: Joi.array().optional().items(
      Joi.object({
        name: Joi.string().min(1).max(inputs.MAX_GENERAL_STRING_LENGTH).required(),
        link: Joi.string().uri().max(inputs.MAX_GENERAL_STRING_LENGTH).required(),
      }),
    ),
    skills: Joi.array().optional().items(
      Joi.string().min(1).max(inputs.MAX_GENERAL_STRING_LENGTH),
    ),
  }),
}

const updateProject = {
  params: Joi.object({
    id: idSchema.required(),
  }),
  body: Joi.object({
    title: Joi.string().min(1).max(inputs.MAX_GENERAL_STRING_LENGTH),
    position: Joi.string().min(1).max(inputs.MAX_GENERAL_STRING_LENGTH),
    description: Joi.string().min(1).max(500),
    link: Joi.string().uri().max(inputs.MAX_GENERAL_STRING_LENGTH),
    startTime: Joi.date(),
    endTime: Joi.date(),
  }),
}

const addProject = {
  body: Joi.object({
    profileId: Joi.string().regex(inputs.MONGO_ID_REGEX).message('invalid id').required(),
    project: Joi.object({
      title: Joi.string().min(1).max(inputs.MAX_GENERAL_STRING_LENGTH).required(),
      position: Joi.string().min(1).max(inputs.MAX_GENERAL_STRING_LENGTH).required(),
      description: Joi.string().min(1).max(500),
      link: Joi.string().uri().max(inputs.MAX_GENERAL_STRING_LENGTH),
      startTime: Joi.date(),
      endTime: Joi.date(),
    }),
  }),
}

const updateJob = {
  params: Joi.object({
    id: idSchema.required(),
  }),
  body: Joi.object({
    company: Joi.string().min(1).max(inputs.MAX_GENERAL_STRING_LENGTH),
    position: Joi.string().min(1).max(inputs.MAX_GENERAL_STRING_LENGTH),
    description: Joi.string().min(1).max(500),
    startTime: Joi.date(),
    endTime: Joi.date(),
  }),
}

const addJob = {
  body: Joi.object({
    profileId: Joi.string().regex(inputs.MONGO_ID_REGEX).message('invalid id').required(),
    job: Joi.object({
      company: Joi.string().min(1).max(inputs.MAX_GENERAL_STRING_LENGTH).required(),
      position: Joi.string().min(1).max(inputs.MAX_GENERAL_STRING_LENGTH).required(),
      description: Joi.string().min(1).max(500),
      startTime: Joi.date(),
      endTime: Joi.date(),
    }),
  }),
}

const updateEducation = {
  params: Joi.object({
    id: idSchema.required(),
  }),
  body: Joi.object({
    title: Joi.string().min(1).max(inputs.MAX_GENERAL_STRING_LENGTH),
    school: Joi.string().min(1).max(inputs.MAX_GENERAL_STRING_LENGTH),
    certificateCode: Joi.string().min(1).max(500),
    startTime: Joi.date(),
    endTime: Joi.date(),
  }),
}

const addEducation = {
  body: Joi.object({
    profileId: Joi.string().regex(inputs.MONGO_ID_REGEX).message('invalid id').required(),
    education: Joi.object({
      title: Joi.string().min(1).max(inputs.MAX_GENERAL_STRING_LENGTH).required(),
      school: Joi.string().min(1).max(inputs.MAX_GENERAL_STRING_LENGTH).required(),
      certificateCode: Joi.string().min(1).max(500),
      startTime: Joi.date(),
      endTime: Joi.date(),
    }),
  }),
}

module.exports = {
  slugInParamsValidator,
  idInParamsValidator,
  createProfile,
  updateProfile,
  addProject,
  updateProject,
  addJob,
  updateJob,
  addEducation,
  updateEducation,
}
