import Knex from 'knex'
import { knexSnakeCaseMappers } from 'objection'

const knex = Knex({
  client: 'postgres',

  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'objection',
    database: 'objection_test',
  },

  // Merge `postProcessResponse` and `wrapIdentifier` mappers.
  // If your columns are UPPER_SNAKE_CASE you can use
  // knexSnakeCaseMappers({ upperCase: true })
  ...knexSnakeCaseMappers(),
})

export default knex
