// @flow

// eslint-disable-next-line no-unused-vars
import { action, observable, autorun } from 'mobx'
import axios from 'axios'

import NestedStore from '@app/store/nested-store'

import type { RootStore } from '@app/store'

import type {
  User,
  UsersStoreState,
} from '@root/types'

export default class UsersStore extends NestedStore {
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
