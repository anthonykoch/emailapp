// @flow

import type { RootStore } from './index'

export default class NestedStore {
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
