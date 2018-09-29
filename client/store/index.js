// @flow

// eslint-disable-next-line no-unused-vars
import { action, observable, autorun } from 'mobx'

import type { IMeetingStore, IRootStore } from '@root/types'

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

  @observable isSidebarShowing = false

  // constructor(root: RootStore) {
  //   this.root = root
  // }

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
