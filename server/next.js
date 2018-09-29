// @flow

import next from 'next'
import { useStaticRendering } from 'mobx-react'

import routes from '@app/routes'

export const dev = process.env.NODE_ENV !== 'production'
export const app = next({ dev, dir: './client' })
export const handle = routes.getRequestHandler(app)

useStaticRendering(true)

