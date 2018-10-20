// @flow

// eslint-disable-next-line no-unused-vars
import { action, observable, autorun } from 'mobx'

import axios from 'axios'

import NestedStore from './nested-store'

import type { RootStore } from './index'
import type {
  Message,
  UsersMessagesStoreState,
} from '@root/types'

export default class UsersMessagesStore extends NestedStore {
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
