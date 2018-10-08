// @flow

import { handle } from '@server/next'

import type { $Request, $Response, NextFunction } from 'express'

export default function ({ app }: { app: any }) {
  return function next(req: $Request, res: $Response, next: NextFunction) {
    if (req.originalUrl.startsWith('/api')) {
      // Let feathers handle it
      return next()
    } else {
      // $FlowFixMe
      req.__NEXT__ = app.__NEXT__

      // Let nextjs handle it
      return handle(req, res)
    }
  }
}
