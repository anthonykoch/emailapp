/* eslint-disable no-unused-vars */

// import Emails from '@/models/emails'
import hooks from '@/services/emails/emails.hooks'

const table = 'emails'

export class Service {
  constructor({ db }) {
    this.db = db
  }

  async find(params) {
    return []
  }

  async get(id, params) {
    return this.db.table(table).where('id', id)
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)))
    }

    return data
  }

  async update(id, data, params) {
    return data
  }

  async patch(id, data, params) {
    return data
  }

  async remove(id, params) {
    return { id }
  }
}

export default function (options) {
  return new Service(options)
}

