// @flow

const path = require('path')

module.exports = {
  host: 'localhost',
  port: 4000,
  public: './public',
  paginate: {
    default: 10,
    max: 50,
  },
  postgres: {
    client: 'pg',
    connection: 'postgres://postgres:password@db:5432/app',
    seeds: {
      directory: path.join(__dirname, '../database/seeds'),
    },
    migrations: {
      directory: path.join(__dirname, '../database/migrations'),
    },
  },
}
