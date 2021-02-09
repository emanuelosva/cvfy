class BusinessError extends Error {
  constructor(moduleName, message, status = 500, data = {}) {
    super(message)
    this.moduleName = moduleName
    this.status = status
    this.data = data

    Error.captureStackTrace(this, this.constructor)
  }

  toString() {
    return `[@cvfy_${this.moduleName}] -> Error: ${this.message} - status: ${this.status}`
  }
}

class BuildError {
  /**
   * Return a class that acts as Factory of
   * bussines error instace.
   * @param {string} moduleName - Module name
   */
  constructor(moduleName) {
    this.moduleName = moduleName
  }

  throwError(message, status = 500, data = {}) {
    throw new BusinessError(this.moduleName, message, status, data)
  }

  getError(message, status = 500, data = {}) {
    return new BusinessError(this.moduleName, message, status, data)
  }
}

module.exports.BusinessError = BusinessError
module.exports = BuildError
