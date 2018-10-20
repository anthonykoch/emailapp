// @flow

// eslint-disable-next-line no-unused-vars
import { action, observable, autorun } from 'mobx'
import axios from 'axios'

import NestedStore from './nested-store'

import type { RootStore } from './'
import type {
  Overview,
  UsersMessagesOverviewStoreState,
} from '@root/types'

export default class UsersMessagesOverviewStore extends NestedStore {
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
