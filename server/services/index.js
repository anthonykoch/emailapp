// @flow
// eslint-disable-next-line no-unused-vars

import messages, { route as messagesRoute } from '@server/services/messages/messages.service'

export const routes = [
  messagesRoute,
]

export default function (app: any) {
  app.configure(messages)
}
