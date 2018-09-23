// Update with your config settings.

require('./register')

const { postgres: development } = require('./server/config/development')
const { postgres: production } = require('./server/config/production')

module.exports = {
  development: {
    ...development,
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     user: 'username',
  //     password: 'password',
  //     database: 'my_db',
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations',
  //   },
  // },

  production: {
    ...production,
  },
}
