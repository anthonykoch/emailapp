// @flow

import createRoutes from 'next-routes'

export const DASHBOARD_MESSAGES = '/dashboard/messages'
export const DASHBOARD_MEETING = '/dashboard/meeting'
export const LOGIN = '/login'

export const defs = [
  {
    name: 'home',
    pattern: '/',
    page: 'index',
  },
  {
    name: 'dashboard-messages',
    pattern: DASHBOARD_MESSAGES,
    page: 'dashboard-messages',
  },
  {
    name: 'dashboard-meeting',
    pattern: DASHBOARD_MEETING,
    page: 'dashboard-meeting',
  },
  {
    name: 'login',
    pattern: LOGIN,
    page: 'login',
  },
]

const routes = createRoutes()

for (const def of defs) {
  routes.add(def)
}

export const Link = routes.Link
export const Router = routes.Router

export default routes
