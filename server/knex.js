// @flow

import knex from 'knex'

export default function (app: any) {
  const { client, connection } = app.get('postgres')

  // $FlowFixMe
  const db = knex({
    client,
    connection,
  })

  app.set('knex', db)
};
