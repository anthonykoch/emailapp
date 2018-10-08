// @flow

import Validator from 'validatorjs'

import api from '@app/api'

export default (app: any) => {
  Validator.register('stripped', (value, req, attribute) => {
    return (
      typeof value === 'string' && !/^\s/.test(value) && !/\s$/.test(value)
    )
  })

  if (process.env.SERVER) {
    const db = app.get('knex')

    if (db == null) {
      throw new Error('Validator configuration must go after db configuration')
    }

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

        if (user) {
          passes(false)
        } else {
          passes()
        }
      } catch (err) {
        // FIXME: what to do here ?????
        return passes(false, 'Service unavailable')
      }
    })

    app.set('validator', Validator)
  } else {
    Validator.registerAsync('unique_email', async (value, attribute, req, passes) => {
      const response = await api.service('/api/users').create({
        email: value,
      })

      console.log(response.errors)

      // TODO: The response should return an error count
      if (response.errors.email != null) {
        passes(false, response.errors.email[0])
      } else {
        passes()
      }
    })
  }
}
