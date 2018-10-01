// @flow

import messages, { route as messagesRoute } from '@server/services/messages/messages.service'
import authentication, { route as authenticationRoute } from '@server/services/authentication/authentication.service'
import users, { route as usersRoute } from '@server/services/users/users.service'

export const routes = [
  authenticationRoute,
  messagesRoute,
  usersRoute,
]

export default function (app: any) {
  app.configure(authentication) // NOTE: Authentication needs to be first
  app.configure(messages)
  app.configure(users)
}
