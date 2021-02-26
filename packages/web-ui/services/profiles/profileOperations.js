import constants from '../../constants'

export const makeProfileOperations = ({ requestClient }) => {
  const baseUrl = `${constants.api.ULR}/profiles`

  const createNew = (profileData) => {
    try {
      const { body: { profile } } = await requestClient.post({
        url: baseUrl,
        body: profileData
      })
      return profile
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const getBySlug = (slug) => {
    try {
      const url = `${baseUrl}/public/${slug}`
      const { body: { profile } } = await requestClient.get({ url })
      return profile
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const getById = (id) => {
    try {
      const url = `${baseUrl}/${id}`
      const { body: { profile } } = await requestClient.get({ url })
      return profile
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const updateOne = (id, data) => {
    try {
      const url = `${baseUrl}/${id}`
      const { body: { profile } } = await requestClient.put({ url, body: data })
      return profile
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const deleteOne = (id) => {
    try {
      const url = `${baseUrl}/${id}`
      await requestClient.remove({ url })
      return null
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const addJob = (profileId, jobData) => {
    try {
      const url = `${baseUrl}/jobs`
      const data = { profileId, job: jobData }
      const { body: { job } } = await requestClient.post({ url, body: data })
      return job
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const updateJob = (id, jobData) => {
    try {
      const url = `${baseUrl}/jobs/${id}`
      const { body: { job } } = await requestClient.post({ url, body: jobData })
      return job
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const removeJob = (id) => {
    try {
      const url = `${baseUrl}/jobs/${id}`
      await requestClient.post({ url })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const addProject = (profileId, projectData) => {
    try {
      const url = `${baseUrl}/projects`
      const data = { profileId, project: projectData }
      const { body: { project } } = await requestClient.post({ url, body: data })
      return project
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const updateProject = (id, projectData) => {
    try {
      const url = `${baseUrl}/projects/${id}`
      const { body: { project } } = await requestClient.post({ url, body: projectData })
      return project
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const removeProject = (id) => {
    try {
      const url = `${baseUrl}/projects/${id}`
      await requestClient.post({ url })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const addEducation = (profileId, educationData) => {
    try {
      const url = `${baseUrl}/educations`
      const data = { profileId, education: educationData }
      const { body: { education } } = await requestClient.post({ url, body: data })
      return education
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const updateEducation = (id, educationData) => {
    try {
      const url = `${baseUrl}/educations/${id}`
      const { body: { education } } = await requestClient.post({ url, body: educationData })
      return education
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const removeEducation = (id) => {
    try {
      const url = `${baseUrl}/educations/${id}`
      await requestClient.post({ url })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return {
    createNew,
    getBySlug,
    getById,
    updateOne,
    deleteOne,
    jobs: () => ({
      addJob,
      updateJob,
      removeJob,
    }),
    projects: () =>({
      addProject,
      updateProject,
      removeProject,
    }),
    educations: () =>({
      addEducation,
      updateEducation,
      removeEducation,
    }),
  }
}
