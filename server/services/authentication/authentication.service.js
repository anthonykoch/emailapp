// @flow

import authentication from '@feathersjs/authentication'
import jwt from '@feathersjs/authentication-jwt'
import local, { Verifier } from '@feathersjs/authentication-local'
// import oauth2 from '@feathersjs/authentication-oauth2'
// import GoogleStrategy from 'passport-google-oauth20'
// import GithubStrategy from 'passport-github'

import { Service as UsersService } from '@server/services/users/users.service'

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

class AuthVerifier extends Verifier {
  verify(req, username, password, done) {
    done({ message: 'lol' })
  }
}

export default (app: any) => {
  const config = app.get('authentication')

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
