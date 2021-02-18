module.exports = {
  entities: {
    users: {
      enumTypes: {
        ADMIN: 'admin',
        USER: 'user',
      },
    },
    statistics: {
      enumKind: {
        PROFILE_VIEWS: 'profile_views',
      },
    },
    profile: {
      ownerTypes: {
        PEROSN: 'person',
      },
      templateNames: {
        CLASSIC: 'classic',
        MINIMAL: 'minimal',
        MODERN: 'modern',
      },
    },
  },
  enviroment: {
    ALLOWED_ENVIRONMENTS: ['test', 'development', 'stagin', 'production'],
    TEST: 'test',
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
  },
}
