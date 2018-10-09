// @flow

// eslint-disable-next-line no-unused-vars
import { action, observable, autorun } from 'mobx'

import auth from '@app/auth'

export class RootStore {
  // eslint-disable-next-line
  auth: AuthStore // eslint-disable-line no-use-before-define
  meeting: MeetingStore // eslint-disable-line no-use-before-define
  userMessages: UserMessages // eslint-disable-line no-use-before-define
  isServer: boolean
  lastUpdate: number

  constructor(isServer: boolean, lastUpdate: number) {
    this.auth = new AuthStore(this)
    this.meeting = new MeetingStore(this)
    this.userMessages = new UserMessages(this)
    this.isServer = isServer
    this.lastUpdate = lastUpdate
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

export class UserMessages extends NestedStore {
  getUserMessages() {
    // const { userId } =
    //   await api.passport
    //     .getJWT()
    //     .then((token) => api.passport.verifyJWT(token))

    // await api.getUsersMessages()
    //   .then((awd) => {
    //     console.log({awd})
    //   })
  }
}

type SignupCredentials = {
  username: string,
  first_name: string,
  last_name: string,
  password: string,
  email: string,
}

export class AuthStore extends NestedStore {
  isAuthenticated: boolean
  token: null | string
  isFetching: boolean
  error: null | {
    message: string
  }

  @observable isAuthenticated = false
  @observable token = null
  @observable isFetching = false
  @observable error = null

  @action createUser(user: SignupCredentials) {
    return axios.post('/api/users', user)
      .then((res) => {
        console.log(res);

      })
      .catch(err => {
        console.log(err);

      })
  }

  @action async logout() {
    return auth.logout()
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

  @action showSidebar() {
    this.isSidebarShowing = true
  }

  @action hideSidebar() {
    this.isSidebarShowing = false
  }
}

export default function createStore({
  isServer,
  lastUpdate=Date.now(),
}: {
  isServer: boolean,
  lastUpdate?: number,
}) {
  return new RootStore(isServer, lastUpdate)
}
