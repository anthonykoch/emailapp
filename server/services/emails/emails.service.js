// Initializes the `emails` service on path `/emails`
import createService from '@/services/emails/emails.class.js'
import hooks from '@/services/emails/emails.hooks'

export const route = '/api/emails'

export default function (app) {
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
