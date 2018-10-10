// @flow

import createRoutes from 'next-routes'

export const DASHBOARD_MESSAGES = '/dashboard/messages'
export const DASHBOARD_MEETING = '/dashboard/meeting'
export const DASHBOARD_OVERVIEW = '/dashboard/overview'
export const LOGIN = '/login'
export const LOGOUT = '/logout'

export const defs = [
  {
    name: 'home',
    pattern: '/',
    page: 'index',
  },
  {
    name: 'dashboard-messages',
    page: 'dashboard-messages',
    pattern: DASHBOARD_MESSAGES,
  },
  {
    name: 'dashboard-meeting',
    page: 'dashboard-meeting',
    pattern: DASHBOARD_MEETING,
  },
  {
    name: 'dashboard-overview',
    page: 'dashboard-overview',
    pattern: DASHBOARD_OVERVIEW,
  },
  {
    name: 'login',
    page: 'login',
    pattern: LOGIN,
  },
  {
    name: 'logout',
    page: 'logout',
    pattern: LOGOUT,
  },
]

const routes = createRoutes()

for (const def of defs) {
  routes.add(def)
}

export const Link = routes.Link
export const Router = routes.Router

export default routes
