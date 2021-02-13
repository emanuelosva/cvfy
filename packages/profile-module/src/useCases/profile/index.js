const profileUseCases = require('./profile')
const jobsUseCases = require('./jobs')
const projectsUseCases = require('./projects')
const educationsUseCases = require('./educations')

module.exports = {
  ...profileUseCases,
  ...jobsUseCases,
  ...projectsUseCases,
  ...educationsUseCases,
}
