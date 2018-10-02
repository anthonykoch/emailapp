// @flow

import authentication from '@feathersjs/authentication'
import jwt from '@feathersjs/authentication-jwt'
import local, { Verifier } from '@feathersjs/authentication-local'
import Debug from 'debug'

import { Service as UsersService } from '@server/services/users/users.service'

const debug = Debug('app')

// import oauth2 from '@feathersjs/authentication-oauth2'
// import GoogleStrategy from 'passport-google-oauth20'
// import GithubStrategy from 'passport-github'


// app.configure(oauth2(Object.assign({
//   name: 'google',
//   Strategy: GoogleStrategy,
// }, config.google)))

// app.configure(oauth2(Object.assign({
//   name: 'github',
//   Strategy: GithubStrategy,
// }, config.github)))

export const route = '/api/authentication'

// https://github.com/feathersjs/feathers/blob/master/packages/authentication-local/lib/verifier.js
// https://docs.feathersjs.com/api/authentication/local.html#verifier

export default (app: any) => {
  const config = app.get('authentication')

  class AuthVerifier extends Verifier {
    verify(req, username, password, done) {
      this.service.find({ username })
        .then(response => {
          const results = response.data || response
          if (!results.length) {
            debug(`User with username '${username}' did not exist`)
          }

          return this._normalizeResult(response)
        })
        .then(entity => this._comparePassword(entity, password))
        .then(entity => {
          const id = entity[this.service.id]
          const payload = { [`${this.options.entity}Id`]: id }
          done(null, entity, payload)
        })
        .catch(error => error ? done(error) : done(null, error, { message: 'Invalid login' }))
    }
  }

  app.configure(authentication({
    ...config,
    path: route,
    service: UsersService.route,
  }))

  app.configure(jwt())

  app.configure(local({
    Verifier: AuthVerifier,
  }))

  app.service(route).hooks({
    before: {
      create: [
        authentication.hooks.authenticate(config.strategies),
      ],
      remove: [
        authentication.hooks.authenticate('jwt'),
      ],
    },
  })
}
