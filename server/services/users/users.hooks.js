// @flow

import authentication from '@feathersjs/authentication'
import local from '@feathersjs/authentication-local'

import { status } from '@server/hooks'

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
    // find: [authenticate('jwt')],
    // get: [authenticate('jwt')],
    // create: [hashPassword()],
    // update: [hashPassword(), authenticate('jwt')],
    // patch: [hashPassword(), authenticate('jwt')],
    // remove: [authenticate('jwt')],
  },

  after: {
    all: [
      status(),
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      // protect('password'),
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
