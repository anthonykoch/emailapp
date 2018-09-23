import knex from 'knex'
import { Model } from 'objection'

export default function (app) {
  const { client, connection } = app.get('postgres')

  const db = knex({
    client,
    connection,
  })

  Model.knex(db)
  app.set('knex', db)
};
