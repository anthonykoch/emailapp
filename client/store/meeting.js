// @flow

// eslint-disable-next-line no-unused-vars
import { action, observable, autorun } from 'mobx'

import NestedStore from '@app/store/nested-store'

import type { RootStore } from '@app/store'
import type { MeetingStoreState } from '@root/types'

export default class MeetingStore extends NestedStore {
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
