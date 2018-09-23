/* eslint-disable no-console */

import './bootstrap'

import logger from '@/logger'
import app from '@/app'
import { app as nextApp } from '@/next'

const port = app.get('port')

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
)

nextApp.prepare().then(() => {
  const server = app.listen(port)

  process.on('unhandledRejection', (reason, p) =>
    logger.error('Unhandled Rejection at: Promise ', p, reason)
  )

  server.on('listening', () =>
    logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
  )
})
