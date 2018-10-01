// @flow

/* eslint-disable no-unused-vars */

import hooks from '@server/services/messages/messages.hooks'

import type { KnexDB, IDBService } from '@root/types'

const table = 'messages'

export class Service implements IDBService {
  db: KnexDB

  static route = '/api/messages'

  constructor({ db }: { db: KnexDB }) {
    this.db = db
  }

  async find(params: {}) {
    return []
  }

  async get(id: string | number, params?: ?{}) {
    return {
      id: String(id),
    }
    // return this.db.table(table).where('id', id)
  }

  async create(data: any[] | any, params: {}) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)))
    }

    return data
  }

  async update(id: string, data: any, params: {}) {
    return data
  }

  async patch(id: string, data: any, params: {}) {
    return data
  }

  async remove(id: string, params: {}) {
    return { id }
  }
}

export default function (options: { db: KnexDB }) {
  return new Service(options)
}
