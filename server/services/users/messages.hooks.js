// @flow

import authentication from '@feathersjs/authentication'

import { validate } from '@server/hooks/validate'
import * as validations from '@server/services/users/messages.validations'

const { hooks: { authenticate } } = authentication

export default {
  before: {
    all: [],
    find: [validate(validations.Find), authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [authenticate('jwt')],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')],
  },

  after: {
    all: [],
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
