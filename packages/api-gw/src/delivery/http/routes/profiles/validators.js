const Joi = require('joi')
const { constants: { inputs } } = require('../../../../utils')

const idInParamsValidator = {
  params: {
    id: Joi.string().regex(inputs.MONGO_ID_REGEX).message('invalid id').required(),
  },
}

const slugInParamsValidator = {
  params: {
    slug: Joi.string().min(2).max(inputs.MAX_GENERAL_STRING_LENGTH).required(),
  },
}

const updateProfile = {
  ...idInParamsValidator,
  body: Joi.object({
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
  body: {
    ...updateProfile.body,
    owner: Joi.string().max(inputs.MAX_GENERAL_STRING_LENGTH).required(),
    fullName: Joi.string().min(2).max(inputs.MAX_GENERAL_STRING_LENGTH).required(),
  },
}

const updateProject = {
  ...idInParamsValidator,
  body: {
    profileId: Joi.string().regex(inputs.MONGO_ID_REGEX).message('invalid id').required(),
    project: Joi.object({
      title: Joi.string().min(1).max(inputs.MAX_GENERAL_STRING_LENGTH),
      position: Joi.string().min(1).max(inputs.MAX_GENERAL_STRING_LENGTH),
      description: Joi.string().min(1).max(500),
      link: Joi.string().uri().max(inputs.MAX_GENERAL_STRING_LENGTH),
      startTime: Joi.date(),
      endTimeTime: Joi.date(),
    }),
  },
}

const addProject = {
  ...updateProject,
  body: {
    ...updateProject.body,
    project: {
      ...updateProject.body.project,
      title: Joi.string().min(1).max(inputs.MAX_GENERAL_STRING_LENGTH).required(),
      position: Joi.string().min(1).max(inputs.MAX_GENERAL_STRING_LENGTH).required(),
      description: Joi.string().min(1).max(500).required(),
      link: Joi.string().uri().max(inputs.MAX_GENERAL_STRING_LENGTH).required(),
    },
  },
}

const updateJob = {
  ...idInParamsValidator,
  body: {
    profileId: Joi.string().regex(inputs.MONGO_ID_REGEX).message('invalid id').required(),
    job: Joi.object({
      company: Joi.string().min(1).max(inputs.MAX_GENERAL_STRING_LENGTH),
      position: Joi.string().min(1).max(inputs.MAX_GENERAL_STRING_LENGTH),
      description: Joi.string().min(1).max(500),
      startTime: Joi.date(),
      endTimeTime: Joi.date(),
    }),
  },
}

const addJob = {
  ...updateJob,
  body: {
    ...updateJob.body,
    job: {
      ...updateJob.body.job,
      company: Joi.string().min(1).max(inputs.MAX_GENERAL_STRING_LENGTH).required(),
      position: Joi.string().min(1).max(inputs.MAX_GENERAL_STRING_LENGTH).required(),
      description: Joi.string().min(1).max(500).required(),
    },
  },
}

const updateEducation = {
  ...idInParamsValidator,
  body: {
    profileId: Joi.string().regex(inputs.MONGO_ID_REGEX).message('invalid id').required(),
    education: Joi.object({
      title: Joi.string().min(1).max(inputs.MAX_GENERAL_STRING_LENGTH),
      school: Joi.string().min(1).max(inputs.MAX_GENERAL_STRING_LENGTH),
      certificateCode: Joi.string().min(1).max(500),
      startTime: Joi.date(),
      endTimeTime: Joi.date(),
    }),
  },
}

const addEducation = {
  ...updateEducation,
  body: {
    ...updateEducation.body,
    education: {
      ...updateEducation.body.education,
      title: Joi.string().min(1).max(inputs.MAX_GENERAL_STRING_LENGTH).required(),
      school: Joi.string().min(1).max(inputs.MAX_GENERAL_STRING_LENGTH).required(),
    },
  },
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
