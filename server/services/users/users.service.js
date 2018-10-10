// @flow

import _ from 'lodash'
import RequestError from '@feathersjs/errors'

import hooks from '@server/services/users/users.hooks'
import { fillable, searchable } from '@server/services/users/users.guards'

import type Knex$QueryBuilderFn from 'knex'
import type {
  KnexDB,
  IDBService,
  SingleCreateResponse,
  User,
} from '@root/types'

export class Service implements IDBService {
  db: KnexDB
  table: string
  fillable: string[]
  returnable: string[]

  static route = '/api/users'
  static table = 'users'

  constructor({ db }: { db: KnexDB }) {
    this.db = db
    this.table = Service.table
  }

  async get(id: string): Promise<?User> {
    if (!Number.isFinite(+id)) {
      return null
    }

    return this.db(this.table)
      .select({
        id: 'id',
        firstName: 'first_name',
        lastName: 'last_name',
        // 'profile_image as profileImage',
        shortname: 'shortname',
        username: 'username',
      })
      .where('id', id)
      .first()
      .then((user: ?User) => user === undefined ? null : user)
      .catch(() => {
        throw new RequestError.GeneralError('Service Unavailable')
      })
  }

  async create(data: mixed, params: {}): Promise<SingleCreateResponse> {
    const _data =
      typeof data === 'object' && data != null
        ? data
        : {}

    return this.db(this.table)
      .insert(_.pick(_data, fillable))
      .returning('*')
      .catch(() => {
        throw new RequestError.GeneralError('Service unavailable')
      })
  }

  async find(params: { query: {} }): Promise<[]> {
    const query = _.pick(params.query, searchable)

    if (Object.keys(query).length === 0) {
      return []
    }

    const q = this.db(this.table)
      .where((builder: Knex$QueryBuilderFn<any>) => {
        if (query.hasOwnProperty('email')) {
          builder.where('email', 'ilike', query.email)
        }

        if (query.hasOwnProperty('first_name')) {
          builder.where('first_name', 'ilike', query.first_name)
        }

        if (query.hasOwnProperty('last_name')) {
          builder.where('last_name', 'ilike', query.last_name)
        }

        if (query.hasOwnProperty('username')) {
          builder.where('username', 'ilike', query.username)
        }
      })

    return q.catch(() => {
      throw new RequestError.GeneralError('Service Unavailable')
    })
  }
}

export const route = Service.route

export default (app: any) => {
  const options = {
    db: app.get('knex'),
    name: 'users',
  }

  // Initialize our service with any options it requires
  app.use(route, new Service(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service(route)

  service.hooks(hooks)
}
