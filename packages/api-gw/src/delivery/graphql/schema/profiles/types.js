const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} = require('graphql')

/**
 * Project Type
 */
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  description: 'A project is a...',
  fields: {
    id: { type: GraphQLID, description: 'Project Id' },
    profile: { type: GraphQLID, description: 'Id of the related profile' },
    title: { type: GraphQLString, description: 'Project title' },
    position: { type: GraphQLString, description: 'Ocuped position on project' },
    description: { type: GraphQLString, description: 'Project description' },
    link: { type: GraphQLString, description: 'If exists, the public link to project' },
    startTime: { type: GraphQLString, description: 'Date of project start' },
    endTime: { type: GraphQLString, description: 'Date of project end' },
    createdAt: { type: GraphQLString, description: 'Record creation date' },
    updatedAt: { type: GraphQLString, description: 'Date of the record last updated' },
  },
})

const ProjectCreateInputType = new GraphQLInputObjectType({
  name: 'ProjectCreateInput',
  description: 'Data required to create a new Project',
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString), description: 'Project title' },
    position: { type: new GraphQLNonNull(GraphQLString), description: 'Ocuped position at the project' },
    description: { type: GraphQLString, description: 'Project description' },
    link: { type: GraphQLString, description: 'If exists, the public link to project' },
    startTime: { type: new GraphQLNonNull(GraphQLString), description: 'Date of project start' },
    endTime: { type: GraphQLString, description: 'Date of project end' },
  },
})

const ProjectUpdateInputType = new GraphQLInputObjectType({
  name: 'ProjectUpdateInput',
  description: 'Data required to update a Project',
  fields: {
    title: { type: GraphQLString, description: 'Project title' },
    position: { type: GraphQLString, description: 'Ocuped position at the project' },
    description: { type: GraphQLString, description: 'Project description' },
    link: { type: GraphQLString, description: 'If exists, the public link to project' },
    startTime: { type: GraphQLString, description: 'Date of project start' },
    endTime: { type: GraphQLString, description: 'Date of project end' },
  },
})

/**
 * Job Type
 */
const JobType = new GraphQLObjectType({
  name: 'Job',
  description: 'A job is a...',
  fields: {
    id: { type: GraphQLID, description: 'job Id' },
    profile: { type: GraphQLID, description: 'Id of the related profile' },
    company: { type: GraphQLString, description: 'Company in wich the user performed the job' },
    position: { type: GraphQLString, description: 'Ocuped position at job' },
    description: { type: GraphQLString, description: 'Job description' },
    startTime: { type: GraphQLString, description: 'Date of job start' },
    endTime: { type: GraphQLString, description: 'Date of job end' },
    createdAt: { type: GraphQLString, description: 'Record creation date' },
    updatedAt: { type: GraphQLString, description: 'Date of the record last updated' },
  },
})

const JobCreateInputType = new GraphQLInputObjectType({
  name: 'JobCreateInput',
  description: 'Data required to create a new job',
  fields: {
    company: { type: new GraphQLNonNull(GraphQLString), description: 'Job title' },
    position: { type: new GraphQLNonNull(GraphQLString), description: 'Ocuped position at job' },
    description: { type: GraphQLString, description: 'Job description' },
    startTime: { type: new GraphQLNonNull(GraphQLString), description: 'Date of job start' },
    endTime: { type: new GraphQLNonNull(GraphQLString), description: 'Date of job end' },
  },
})

const JobUpdateInputType = new GraphQLInputObjectType({
  name: 'JobUpdateInput',
  description: 'Data required to update a job',
  fields: {
    title: { type: GraphQLString, description: 'job title' },
    position: { type: GraphQLString, description: 'Ocuped position at the job' },
    description: { type: GraphQLString, description: 'job description' },
    link: { type: GraphQLString, description: 'If exists, the public link to job' },
    startTime: { type: GraphQLString, description: 'Date of job start' },
    endTime: { type: GraphQLString, description: 'Date of job end' },
  },
})

/**
 * Education Type
 */
const EducationType = new GraphQLObjectType({
  name: 'Education',
  description: 'A Education is a...',
  fields: {
    id: { type: GraphQLID, description: 'Education Id' },
    profile: { type: GraphQLID, description: 'Id of the related profile' },
    title: { type: GraphQLString, description: 'Education title' },
    school: { type: GraphQLString, description: 'School or School or instituon name' },
    certificateCode: { type: GraphQLString, description: 'If exists, the certification code of studies' },
    startTime: { type: GraphQLString, description: 'Date of Education start' },
    endTime: { type: GraphQLString, description: 'Date of Education end' },
    createdAt: { type: GraphQLString, description: 'Record creation date' },
    updatedAt: { type: GraphQLString, description: 'Date of the record last updated' },
  },
})

const EducationCreateInputType = new GraphQLInputObjectType({
  name: 'EducationCreateInput',
  description: 'Data required to create a new Education',
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString), description: 'Education title' },
    school: { type: new GraphQLNonNull(GraphQLString), description: 'School or School or instituon name' },
    certificateCode: { type: GraphQLString, description: 'If exists, the certification code of studies' },
    startTime: { type: new GraphQLNonNull(GraphQLString), description: 'Date of Education start' },
    endTime: { type: GraphQLString, description: 'Date of Education end' },
  },
})

const EducationUpdateInputType = new GraphQLInputObjectType({
  name: 'EducationUpdateInput',
  description: 'Data required to update a Education',
  fields: {
    title: { type: GraphQLString, description: 'Education title' },
    school: { type: GraphQLString, description: 'School or School or instituon name' },
    certificateCode: { type: GraphQLString, description: 'If exists, the certification code of studies' },
    startTime: { type: GraphQLString, description: 'Date of Education start' },
    endTime: { type: GraphQLString, description: 'Date of Education end' },
  },
})

/**
 * Profile Type
 */
const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  description: 'A Project s is a...',
  fields: {
    id: { type: GraphQLID, description: 'Profile Id' },
    owner: { type: GraphQLID, description: 'Owner Id' },
    slug: { type: GraphQLString, description: 'Profile slug' },
    templateName: { type: GraphQLString, description: 'CV template' },
    fullName: { type: GraphQLString, description: '' },
    profesionalProfile: { type: GraphQLString, description: '' },
    description: { type: GraphQLString, description: '' },
    contact: {
      type: new GraphQLObjectType({
        name: 'ProfileContactType',
        fields: {
          email: { type: GraphQLString, description: '' },
          phoneNumber: { type: GraphQLString, description: '' },
          optionalLink: { type: GraphQLString, description: '' },
        },
      }),
      description: '',
    },
    socialLinks: {
      type: new GraphQLList(new GraphQLObjectType({
        name: 'ProfileSocialLinksType',
        fields: {
          name: { type: GraphQLString, description: '' },
          link: { type: GraphQLString, description: '' },
        },
      })),
      description: '',
    },
    skills: { type: new GraphQLList(GraphQLString), description: '' },
    createdAt: { type: GraphQLString, description: 'Record creation date' },
    updatedAt: { type: GraphQLString, description: 'Date of the record last updated' },
    educations: {
      type: new GraphQLList(EducationType),
      description: '',
    },
    jobs: {
      type: new GraphQLList(JobType),
      description: '',
    },
    projects: {
      type: new GraphQLList(ProjectType),
      description: '',
    },
  },
})

const ProfileContactInputType = new GraphQLInputObjectType({
  name: 'ProfileContactInput',
  fields: {
    email: { type: GraphQLString, description: '' },
    phoneNumber: { type: GraphQLString, description: '' },
    optionalLink: { type: GraphQLString, description: '' },
  },
})

const ProfileSocialLinkInputType = new GraphQLInputObjectType({
  name: 'ProfileSocialLinkInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString), description: '' },
    link: { type: new GraphQLNonNull(GraphQLString), description: '' },
  },
})

const ProfileCreateInputType = new GraphQLInputObjectType({
  name: 'ProfileCreateInput',
  description: 'Data required to create a new Profile',
  fields: {
    templateName: { type: new GraphQLNonNull(GraphQLString), description: 'CV template' },
    fullName: { type: new GraphQLNonNull(GraphQLString), description: '' },
    profesionalProfile: { type: new GraphQLNonNull(GraphQLString), description: '' },
    description: { type: GraphQLString, description: '' },
    contact: { type: ProfileContactInputType, description: '' },
    socialLinks: {
      type: new GraphQLList(ProfileSocialLinkInputType),
      description: '',
    },
    skills: { type: new GraphQLList(GraphQLString), description: '' },
  },
})

const ProfileUpdateInputType = new GraphQLInputObjectType({
  name: 'ProfileUpdateInput',
  description: 'Data required to update a Profile',
  fields: {
    templateName: { type: GraphQLString, description: 'CV template' },
    fullName: { type: GraphQLString, description: '' },
    profesionalProfile: { type: GraphQLString, description: '' },
    description: { type: GraphQLString, description: '' },
    contact: { type: ProfileContactInputType, description: '' },
    socialLinks: {
      type: new GraphQLList(ProfileSocialLinkInputType),
      description: '',
    },
    skills: { type: new GraphQLList(GraphQLString), description: '' },
  },
})

module.exports = {
  ProjectType,
  ProjectCreateInputType,
  ProjectUpdateInputType,
  JobType,
  JobCreateInputType,
  JobUpdateInputType,
  EducationType,
  EducationCreateInputType,
  EducationUpdateInputType,
  ProfileType,
  ProfileCreateInputType,
  ProfileUpdateInputType,
}
