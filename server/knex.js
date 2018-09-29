// @flow

import knex from 'knex'
import { Model } from 'objection'

export default function (app: any) {
  const { client, connection } = app.get('postgres')

  // $FlowFixMe
  const db = knex({
    client,
    connection,
  })

  Model.knex(db)
  app.set('knex', db)
};
