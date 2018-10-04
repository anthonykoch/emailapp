// @flow

import authentication from '@feathersjs/authentication'
import jwt from '@feathersjs/authentication-jwt'
import local from '@feathersjs/authentication-local'

// $FlowFixMe
import bcrypt from 'bcryptjs'

import { Service as UsersService } from '@server/services/users/users.service'

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

  class AuthVerifier {
    verify(req, identifier, password, done) {
      app.service(UsersService.route).find({ query: { username: identifier } })
        .then(({ data: [user] }) => {
          console.log(user);

          if (user == null) {
            return done(null, false, { message: 'Invalid login' })
          }

          console.log(password, user.password)

          return bcrypt.compare(password, user.password)
            .then((result) => {
              console.log(result)

              result
                ? done(null, user, { userId: user.id })
                : done(null, false, { message: 'Invalid login' })
            })
            .catch(err => done(err))
        })
        .catch(err => done(err))
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
