// @flow
// eslint-disable-next-line no-unused-vars

import emails, { route as emailsRoute } from '@server/services/emails/emails.service'

export const routes = [
  emailsRoute,
]

export default function (app: any) {
  app.configure(emails)
}
