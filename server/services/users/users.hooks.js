// @flow

import authentication from '@feathersjs/authentication'
import local from '@feathersjs/authentication-local'

import * as validations from '@server/services/users/users.validations'
import { validate } from '@server/hooks/validate'
// import remove from '@server/hooks/remove'

const { hooks: { authenticate } } = authentication

const {
  hooks: {
    hashPassword,
    protect,
  },
} = local

export default {
  before: {
    all: [],
    find: [validate(validations.Find), authenticate('jwt')],
    get: [authenticate('jwt'), validate(validations.Get)],
    create: [validate(validations.Create), hashPassword()],
    update: [hashPassword(), authenticate('jwt')],
    patch: [hashPassword(), authenticate('jwt')],
    remove: [authenticate('jwt')],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password'),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
}
