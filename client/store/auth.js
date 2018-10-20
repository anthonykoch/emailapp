// @flow

// eslint-disable-next-line no-unused-vars
import { action, observable, autorun } from 'mobx'

import axios from 'axios'
import auth from '@app/auth'
import client from '@app/client'

import NestedStore from './nested-store'


import type { RootStore } from './index'
import type { AuthStoreState } from '@root/types'

type SignupCredentials = {
  username: string,
  first_name: string,
  last_name: string,
  password: string,
  email: string,
}

export default class AuthStore extends NestedStore {
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
