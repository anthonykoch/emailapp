// @flow

import RequestError from '@feathersjs/errors'

import hooks from '@server/services/users/messages.hooks'

import type { KnexDB, IDBService } from '@root/types'

export const route = '/api/users/:userid/messages/overview'

export class Service implements IDBService {
  db: KnexDB

  static route = route

  constructor({ db }: { db: KnexDB }) {
    this.db = db
  }

  async find(params: { route: { userid: string } }) {
    return this.db('messages')
      .select(this.db.raw(`
        (
          SELECT count(*)
          FROM messages
          WHERE messages.sender_id = ?
        ) AS sent,
        (
          SELECT count(*)
          FROM message_recipients
          WHERE message_recipients.recipient_id = ?
        ) AS received
      `, [params.route.userid, params.route.userid]))
      .first()
      .catch(() => {
        throw new RequestError.GeneralError('Service unavailable')
      })
  }
}

export default function (app: any) {
  const paginate = app.get('paginate')

  const options = {
    paginate,
    db: app.get('knex'),
  }

  // Initialize our service with any options it requires
  app.use(route, new Service(options))

  // Get our initialized service so that we can register hooks
  const service = app.service(route)

  service.hooks(hooks)
}
