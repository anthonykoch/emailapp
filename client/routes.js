import createRoutes from 'next-routes'

const routes =
  createRoutes()
    .add('home', '/', 'index')
    .add('dashboard-messages', '/dashboard/messages', 'dashboard-messages')

export const Link = routes.Link
export const Router = routes.Router

export default routes
