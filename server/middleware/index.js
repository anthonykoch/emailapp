// @flow

// eslint-disable-next-line no-unused-vars
import next from '@server/middleware/next'

export default function (app: any) {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.
  app.get('*', next({ app }))
}
