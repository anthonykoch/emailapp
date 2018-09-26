// @flow

import createRoutes from 'next-routes'

const defs = [
  {
    name: 'home',
    pattern: '/',
    page: 'index',
  },
  {
    name: 'dashboard-messages',
    pattern: '/dashboard/messages',
    page: 'dashboard-messages',
  },
  {
    name: 'dashboard-meeting',
    pattern: '/dashboard/meeting',
    page: 'dashboard-meeting',
  },
]

const routes = createRoutes()

for (const def of defs) {
  routes.add(def)
}

export const Link = routes.Link
export const Router = routes.Router

export default routes
