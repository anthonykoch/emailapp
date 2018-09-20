// eslint-disable-next-line no-unused-vars
import next from '@/middleware/next'

export default function (app) {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.
  app.get('*', next())
}
