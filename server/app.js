import compress from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import logger from '@/logger'

import feathers from '@feathersjs/feathers'
import configuration from '@feathersjs/configuration'
import express from '@feathersjs/express'
import socketio from '@feathersjs/socketio'

import services from '@/services'
import appHooks from '@/app.hooks'
import channels from '@/channels'

// NOTE: Import this after services so we can obtain a list of services
import middleware from '@/middleware'

import knex from '@/knex'

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
app.use(express.errorHandler({ logger }))

app.hooks(appHooks)

export default app
