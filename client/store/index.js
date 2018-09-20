// eslint-disable-next-line no-unused-vars
import { action, observable } from 'mobx'

let store = null

class RootStore {

}

export function initializeStore(isServer, lastUpdate = Date.now()) {
  if (isServer) {
    return new RootStore(isServer, lastUpdate)
  } else {
    if (store === null) {
      store = new RootStore(isServer, lastUpdate)
    }

    return store
  }
}
