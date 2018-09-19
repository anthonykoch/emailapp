const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

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
