// @flow

// eslint-disable-next-line no-unused-vars
import { action, observable, autorun } from 'mobx'

import type { IMeetingStore, IRootStore } from '@root/types'

let store = null

export class RootStore implements IRootStore {
  // eslint-disable-next-line
  meeting: IMeetingStore
  isServer: boolean
  lastUpdate: number

  constructor(isServer: boolean, lastUpdate: number) {
    this.meeting = new MeetingStore()
    this.isServer = isServer
    this.lastUpdate = lastUpdate
  }
}

export class MeetingStore implements IMeetingStore {
  // root: RootStore;

  @observable isSidebarShowing = true

  // constructor(root: RootStore) {
  //   this.root = root
  // }

  showSidebar() {
    this.isSidebarShowing = true
  }

  hideSidebar() {
    this.isSidebarShowing = false
  }
}

export function initializeStore(isServer: boolean, lastUpdate: number=Date.now()) {
  if (isServer) {
    return new RootStore(isServer, lastUpdate)
  } else {
    if (store === null) {
      store = new RootStore(isServer, lastUpdate)
    }

    return store
  }
}
