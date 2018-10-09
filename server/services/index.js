// @flow

import userMessages from '@server/services/users/messages.service'
import userMessagesOverview from '@server/services/users/messages-overview.service'
import authentication from '@server/services/authentication/authentication.service'
import users from '@server/services/users/users.service'

export default function (app: any) {
  app.configure(authentication) // NOTE: Authentication needs to be first
  app.configure(userMessagesOverview)
  app.configure(userMessages)
  app.configure(users)
}
