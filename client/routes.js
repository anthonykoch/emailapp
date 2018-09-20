import routes from 'next-routes'

export default routes()
  .add('home', '/', 'index')
  .add('dashboard-messages', '/dashboard/messages', 'dashboard-messages')
