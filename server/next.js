import next from 'next'
import { useStaticRendering } from 'mobx-react'

import routes from '@client/routes'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: './client' })
const handle = routes.getRequestHandler(app)

useStaticRendering(true)

const feathersServices = [
  // /users
]

const isFeathersService = (path) =>
  feathersServices.some((item) =>
    path.indexOf(item) > -1
  )

module.exports = {
  app,
  handle,
  isFeathersService,
}
