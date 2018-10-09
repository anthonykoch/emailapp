// @flow

import hooks from '@server/services/users/messages.hooks'

import type { KnexDB, IDBService } from '@root/types'

export const route = '/api/users/:userid/messages'

export class Service implements IDBService {
  db: KnexDB

  static route = route

  constructor({ db }: { db: KnexDB }) {
    this.db = db
  }

  async find(params: {
    route: {
      userid: string,
    }
  }) {
    return this.db('messages')
      .select(this.db.raw(`
        messages.id as id,
        messages.content as message,
        json_build_object(
          'firstName', users.first_name,
          'lastName', users.last_name,
          'shortname', users.shortname
        ) as from,
        messages.read as read
      `))
      // $FlowFixMe
      .join('message_recipients', {
        'messages.id': 'message_recipients.message_id',
      })
      .join('users', {
        'users.id': 'messages.sender_id',
      })
      .where('message_recipients.recipient_id', params.route.userid)
  }

  // async get(id: string | number, params?: ?{}) {
  //   return {
  //     id: String(id),
  //   }
  // }

  // async create(data: any[] | any, params: {}) {
  //   if (Array.isArray(data)) {
  //     return Promise.all(data.map(current => this.create(current, params)))
  //   }

  //   return data
  // }

  // async update(id: string, data: any, params: {}) {
  //   return data
  // }

  // async patch(id: string, data: any, params: {}) {
  //   return data
  // }

  // async remove(id: string, params: {}) {
  //   return { id }
  // }
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
