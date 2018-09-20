const next = require('next')
const { useStaticRendering } = require('mobx-react')


const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: './client' })
const handle = app.getRequestHandler()

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
