// @flow

// eslint-disable-next-line no-unused-vars
import { action, observable, autorun } from 'mobx'

import axios from 'axios'
import auth from '@app/auth'
import client from '@app/client'

import type {
  User,
  Overview,
  Message,
  RootStoreState,
  AuthStoreState,
  MeetingStoreState,
  UsersStoreState,
  UsersMessagesStoreState,
  UsersMessagesOverviewStoreState,
} from '@root/types'

type SignupCredentials = {
  username: string,
  first_name: string,
  last_name: string,
  password: string,
  email: string,
}

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

class NestedStore {
  root: RootStore

  constructor(root: RootStore) {
    this.root = root
  }

  // NOTE: Deletes the root store or else we got "Circular JSON" error
  toJSON() {
    const obj = Object.assign({}, this)

    delete obj.root

    return obj
  }
}

export class UsersStore extends NestedStore {
  user: ?User

  @observable user = null

  static getInitialState(): UsersStoreState {
    return {
      user: null,
    }
  }

  constructor(root: RootStore, { user }: { user: ?User }) {
    super(root)
    this.user = user
  }

  @action setUser(user: ?User) {
    this.user = user

    if (this.user) {
      // $FlowFixMe
      this.user.profileImage = require(`@app/images/profiles/${user.username}.jpg`)
    }
  }

  @action async getUser(): Promise<?User> {
    const { token, authUser } = await this.root.auth.getUser()

    if (!token || !authUser) {
      return null
    }

    return axios
      .get(`/api/users/${authUser.userId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          this.setUser(res.data)
        }

        return res
      })
      .catch(err => {
        console.log('UsersStore', err)

        return err
      })
  }
}

export class UsersMessagesOverviewStore extends NestedStore {
  overview: Overview

  @observable overview = {
    sent: 0,
    received: 0,
  }

  static getInitialState(): UsersMessagesOverviewStoreState {
    return {
      overview: {
        sent: 0,
        received: 0,
      },
    }
  }

  constructor(root: RootStore, { overview }: { overview: Overview }) {
    super(root)
    this.overview = overview
  }

  @action setOverview(overview: Overview) {
    this.overview = {
      sent: Number(overview.sent),
      received: Number(overview.received),
    }
  }

  @action async getOverview() {
    const { token, authUser } = await this.root.auth.getUser()

    if (token && authUser) {
      return axios
        .get(`/api/users/${authUser.userId}/messages/overview`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            this.setOverview(res.data)
          }

          return res
        })
        .catch(err => {
          console.log('UserMessagesOverviewStore', err)

          return err
        })
    }

    return null
  }
}

export class UsersMessagesStore extends NestedStore {
  messages: Message[]

  @observable messages = []

  static getInitialState(): UsersMessagesStoreState {
    return {
      messages: [],
    }
  }

  constructor(root: RootStore, { messages=[] }: { messages: Message[] }) {
    super(root)
    this.messages = messages
  }

  @action setMessages(messages: Message[]) {
    this.messages = messages
  }

  @action async getMessages() {
    const { token, authUser } = await this.root.auth.getUser()

    if (token && authUser) {
      return axios
        .get(`/api/users/${authUser.userId}/messages`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            this.setMessages(res.data)
          }

          return res
        })
        .catch(err => {
          console.log('UserMessages', err)
          return err
        })
    }

    return null
  }
}

export class AuthStore extends NestedStore {
  isLoggedIn: boolean
  token: ?string
  isFetching: boolean

  @observable IsLoggedIn = false
  @observable token = null
  @observable isFetching = false

  static getInitialState(): AuthStoreState {
    return {
      isLoggedIn: false,
      token: null,
      isFetching: false,
    }
  }

  constructor(
    root: RootStore,
    {
      isLoggedIn,
      token,
      isFetching,
    }: AuthStoreState
  ) {
    super(root)
    this.isLoggedIn = isLoggedIn
    this.token = token
    this.isFetching = isFetching
  }

  @action async getUser(): Promise<{ token: ?string, authUser: ?{ userId: string } }> {
    return auth.passport.getJWT()
      .then(async (token) => ({
        token: token,
        authUser: await client.passport.verifyJWT(token),
      }))
      .catch(() => ({ token: null, authUser: null }))
  }

  @action async isAuthenticated(): Promise<boolean> {
    return auth.passport.getJWT()
      .then((token) => auth.passport.verifyJWT(token))
      .catch(() => false)
  }

  @action createUser(user: SignupCredentials) {
    return axios.post('/api/users', user)
      .then((res) => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  @action async logout() {
    return auth.passport.logout()
  }

  @action login({
    identifier,
    password,
    strategy,
  }: {
      identifier: string,
      password: string,
      strategy: string,
    }) {
    return auth.authenticate({
      identifier,
      password,
      strategy,
    })
  }
}

export class MeetingStore extends NestedStore {
  @observable isSidebarShowing = false

  static getInitialState(): MeetingStoreState {
    return {
      isSidebarShowing: false,
    }
  }

  constructor(root: RootStore, { isSidebarShowing }: MeetingStoreState) {
    super(root)
    this.isSidebarShowing = isSidebarShowing
  }

  @action showSidebar() {
    this.isSidebarShowing = true
  }

  @action hideSidebar() {
    this.isSidebarShowing = false
  }
}

export default function createStore(initialState: any) {
  return new RootStore(initialState)
}
