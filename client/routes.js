// @flow

import createRoutes from 'next-routes'

const routes =
  createRoutes()
    .add('home', '/', 'index')
    .add('dashboard-messages', '/dashboard/messages', 'dashboard-messages')
    .add('dashboard-meeting', '/dashboard/meeting', 'dashboard-meeting')

export const Link = routes.Link
export const Router = routes.Router

export default routes
