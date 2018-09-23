
import { handle } from '@/next'
import { routes } from '@/services'

export default function (options={}) {
  return function next(req, res, next) {
    const isFeathersService =
      routes.some(route => req.originalUrl.startsWith(route))

    if (isFeathersService) {
      // Let feathers handle it
      return next()
    } else {
      // Let nextjs handle it
      return handle(req, res)
    }
  }
}
