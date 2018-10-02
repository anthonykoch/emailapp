// @flow

import _ from 'lodash'
import Validator from 'validatorjs'

import hooks from '@server/services/users/users.hooks'

import type { KnexDB, IDBService, StatusResponse } from '@root/types'

export const userCreateRules = {
  first_name: 'required|min:1|max:80',
  last_name: 'required|min:1|max:80',
  email: 'required|email|unique_email',
  password: 'required|min:8|max:128|stripped',
}

export const userCreateErrorMessages = {
  'required.email': 'A valid email is required',
  'email.email': 'A valid email is required',
  'email_available.email': 'This username is already taken',

  'required.first_name': 'Your first name can not be empty',
  'max.first_name': 'Come on, is your name really longer than 80 characters?',

  'required.last_name': 'Really, your last name is longer than 80 characters!??!1/1',
  'max.last_name': 'Really, your last name is longer than 80 characters!??!1/1',

  'required.password': 'You\'ve got to have a password! AAHHHHHHH',
  'min.password': 'Your password must be at least 8 characters',
  'max.password': 'Your password must be no more than 128 characters',
  'stripped.password': 'The password can not begin or end with whitespace',
}

export const fillable = ['first_name', 'last_name', 'email', 'password']
export const returnable = ['first_name', 'last_name', 'email']

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

  async get(id: string): Promise<({ data: any } | { message: string }) & StatusResponse> {
    if (!Number.isFinite(+id)) {
      return {
        status: 404,
        message: 'Resource not found',
      }
    }

    return this.db(this.table)
      .select()
      .where('id', id)
      .then((user: any) => {
        if (user != null) {
          return {
            status: 200,
            data: user,
          }
        }

        return {
          status: 404,
          message: 'Resource not available',
        }
      })
  }

  async create(_data: Object, params: {}): Promise<({
    errors: {
      errors: {},
      errorCount: number,
    },
  } | {
    data: {},
  }) & StatusResponse> {
    const data = Object(_data)

    const validation =
      await new Promise((resolve) => {
        const validator = new Validator(data, userCreateRules, userCreateErrorMessages)

        validator.checkAsync(() => resolve({
          errors: {},
          errorCount: 0,
        }), () => resolve({
          errors: validator.errors.all(),
          errorCount: validator.errorCount | 0,
        }))
      })

    if (validation.errorCount > 0) {
      return {
        status: 400,
        errors: validation,
      }
    }

    // NOTE: Prevents mass assignment
    return this.db(this.table)
      .insert(_.pick(Object(data), fillable))
      .returning(returnable)
      .then((entity: {}) => {
        return {
          status: 201,
          data: entity,
        }
      })
  }

  async find(params: any) {
    console.log(params)

    // _.pickBy(params, (value, key) => {
    //   return typeof value === 'number' || typeof value === 'string'
    // })

    if (params.username) {
      this.db(this.table).where('username', {

      })
    }
  }
}

export const route = Service.route

export default (app: any) => {
  const db = app.get('knex')

  Validator.register('stripped', (value, req, attribute) => {
    return (
      typeof value === 'string' && !/^\s/.test(value) && !/\s$/.test(value)
    )
  })

  // TODO: Make a folder for validators and do app.set('validator', Validator)
  Validator.registerAsync('unique_email', async function (email, attribute, req, passes) {
    // do your database/api checks here etc
    // then call the `passes` method where appropriate:
    if (req && (email == null || email.trim() === '')) {
      throw new Error('unique_email requires the "required" attribute for validation')
    }

    try {
      const user =
        await db('users').where('email', 'ilike', email).first().timeout(3000)

      console.log('User', user)

      if (user) {
        passes(false, 'Email has already been taken')
      } else {
        passes()
      }
    } catch (err) {
      // FIXME: what to do here ?????
      return passes(false, 'Service unavailable')
    }
  })

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
