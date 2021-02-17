const {
  constants: {
    entities,
    enviroment,
  },
} = require('@cvfy/common-module')

module.exports = {
  enviroment,
  users: entities.users,
  profiles: entities.profile,
  statistics: entities.statistics,
  inputs: {
    MAX_GENERAL_STRING_LENGTH: 120,
    MONGO_ID_REGEX: /^[0-9a-fA-F]{24}$/,
    PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,120}$/,
    PHONE_NUMBER_REGEX: /^\+[0-9]{1,3}\.[0-9]{4,14}(?:x.+)?$/,
  },
}
