// @flow

import createService, { Service } from '@server/services/messages/messages.class.js'
import hooks from '@server/services/messages/messages.hooks'

export const route = Service.route

export default function (app: any) {
  const paginate = app.get('paginate')

  const options = {
    paginate,
    db: app.get('knex'),
  }

  // Initialize our service with any options it requires
  app.use(route, createService(options))

  // Get our initialized service so that we can register hooks
  const service = app.service(route)

  service.hooks(hooks)
}
