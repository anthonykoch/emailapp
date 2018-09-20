
import { handle, isFeathersService } from '@/next'

export default function (options = {}) {
  return function next(req, res, next) {
    if (isFeathersService(req.originalUrl)) {
      return next()
    } else {
      return handle(req, res)
    }
  }
}
