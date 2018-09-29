// @flow

import compress from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import logger from '@server/logger'

import feathers from '@feathersjs/feathers'
import configuration from '@feathersjs/configuration'
import express from '@feathersjs/express'
import socketio from '@feathersjs/socketio'

import { Service as MessagesService } from '@server/services/messages/messages.class'

import services from '@server/services'
import appHooks from '@server/app.hooks'
import channels from '@server/channels'

// NOTE: Import this after services so we can obtain a list of services
import middleware from '@server/middleware'

import knex from '@server/knex'

import type { Services } from '@root/types'

const app = express(feathers())

// Load app configuration
app.configure(configuration(__dirname))
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet())
app.use(cors())
app.use(compress())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Set up Plugins and providers
app.configure(express.rest())
app.configure(socketio())

app.configure(knex)

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware)
// Set up our services (see `services/index.js`)
app.configure(services)
// Set up event channels (see channels.js)
app.configure(channels)

// Configure a middleware for 404s and the error handler
app.use(express.notFound())
app.use(express.errorHandler({
  logger,
  // TODO: Customize 404 and 500 for these
  // html: {
  //   404: 'path/to/notFound.html',
  //   500: 'there/will/be/robots.html'
  // },
}))

app.hooks(appHooks)

// Expose anything we want to use in getInitialProps()
const __NEXT__: { services: Services } = {
  services: {
    messages: app.service(MessagesService.route),
  },
}

app.__NEXT__ = __NEXT__

export default app
