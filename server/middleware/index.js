// @flow

// eslint-disable-next-line no-unused-vars
import next from '@server/middleware/next'
import * as routes from '@app/routes'

export default function (app: any) {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.

  if (process.env.SERVER) {
    const cookieParser = require('cookie-parser');
    const { authenticate } = require('@feathersjs/authentication').express;

    app.use(routes.DASHBOARD_MEETING, cookieParser(), authenticate('jwt', {
      failureRedirect: `/login?redirect=${routes.DASHBOARD_MEETING}`,
    }))

    app.use(routes.DASHBOARD_MESSAGES, cookieParser(), authenticate('jwt', {
      failureRedirect: `/login?redirect=${routes.DASHBOARD_MESSAGES}`,
    }))
  }

  app.get('*', next({ app }))
}
