// @flow

// eslint-disable-next-line no-unused-vars
import { action, observable, autorun } from 'mobx'

import type { RootStoreState } from '@root/types'

import AuthStore from '@store/auth'
import MeetingStore from '@store/meeting'
import UsersStore from '@store/users'
import UsersMessagesStore from '@store/users-messages'
import UsersMessagesOverviewStore from '@store/users-messages-overview'

export class RootStore {
  // eslint-disable-next-line
  auth: AuthStore // eslint-disable-line no-use-before-define
  meeting: MeetingStore // eslint-disable-line no-use-before-define
  usersMessages: UsersMessagesStore // eslint-disable-line no-use-before-define
  usersMessagesOverview: UsersMessagesOverviewStore // eslint-disable-line no-use-before-define
  users: UsersStore // eslint-disable-line no-use-before-define
  isServer: boolean
  lastUpdate: number

  constructor(initialState: RootStoreState) {
    const {
      isServer,
      auth=AuthStore.getInitialState(),
      meeting=MeetingStore.getInitialState(),
      users=UsersStore.getInitialState(),
      usersMessages=UsersMessagesStore.getInitialState(),
      usersMessagesOverview=UsersMessagesOverviewStore.getInitialState(),
    } = initialState

    this.auth = new AuthStore(this, auth)
    this.meeting = new MeetingStore(this, meeting)
    this.usersMessages = new UsersMessagesStore(this, usersMessages)
    this.usersMessagesOverview = new UsersMessagesOverviewStore(this, usersMessagesOverview)
    this.users = new UsersStore(this, users)
    this.isServer = isServer
    this.lastUpdate = Date.now()
  }
}

export default function createStore(initialState: any) {
  return new RootStore(initialState)
}
