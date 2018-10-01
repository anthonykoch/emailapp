// @flow

import _ from 'lodash'

import hooks from '@server/services/users/users.hooks'

import type { KnexDB, IDBService } from '@root/types'

export class Service implements IDBService {
  db: KnexDB
  table: string

  static route = '/api/users'
  static table = 'users'

  constructor({ db }: { db: KnexDB }) {
    this.db = db
    this.table = Service.table
  }

  async get(id: string) {
    return this.db(this.table).where('id', id)
  }

  async create(data: any[] | any, params: {}) {
    let items = data

    if (!Array.isArray(data)) {
      items = [data]
    }

    const sanitized = items.map(item => _.pick(item, ['email', 'password', 'first_name', 'last_name']))

    return this.db(this.table).insert(sanitized)
  }
}

export const route = Service.route

export default (app: any) => {
  // const Model = createModel(app)
  // const paginate = app.get('paginate')

  const options = {
    db: app.get('knex'),
    name: 'users',
    // Model,
    // paginate
  }

  // Initialize our service with any options it requires
  app.use(route, new Service(options))

  // (req, res, next) => {
  //   console.log(res.data);

  //   next()
  // }

  // Get our initialized service so that we can register hooks and filters
  const service = app.service(route)

  service.hooks(hooks)
}
