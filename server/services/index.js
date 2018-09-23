// eslint-disable-next-line no-unused-vars

import emails, { route as emailsRoute } from '@/services/emails/emails.service'

export const routes = [
  emailsRoute,
]

export default function (app) {
  app.configure(emails)
}
