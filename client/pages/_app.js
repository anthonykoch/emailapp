// @flow

import React from 'react'
import App, { Container } from 'next/app'

import StoreContext from '@app/context/store'
import createStore from '@app/store'

import type { IRootStore } from '@root/types'

const isServer = typeof window === 'undefined'
const __NEXT_MOBX_STORE__ = '__NEXT_MOBX_STORE__'

// Adapted from
// https://github.com/zeit/next.js/blob/master/examples/with-mobx/lib/with-mobx-store.js

function getStore(initialState: {
  isServer: boolean,
  lastUpdate?: number,
}): IRootStore {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return createStore(initialState)
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_MOBX_STORE__]) {
    window[__NEXT_MOBX_STORE__] = createStore(initialState)
  }

  return window[__NEXT_MOBX_STORE__]
}

// $FlowFixMe
if (module.hot) {
  // Reload the page when the store changes
  module.hot.accept(['@app/store/index'], function () {
    window.location.reload()
  })
}

export default class AppWithMobx extends App {
  static async getInitialProps(appContext: any) {
    // Get or Create the store with `undefined` as initialState
    // This allows you to set a custom default initialState
    const store = getStore({ isServer })

    // Provide the store to getInitialProps of pages
    appContext.ctx.store = store
    appContext.ctx.isServer = isServer

    let appProps = {}

    if (typeof App.getInitialProps === 'function') {
      // eslint-disable-next-line no-useless-call
      appProps = await App.getInitialProps.call(App, appContext)
    }

    return {
      ...appProps,
      initialState: store,
    }
  }

  constructor(props: { store: IRootStore }) {
    super(props)

    this.store = getStore(this.props.initialState)
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <StoreContext.Provider value={this.store}>
          <Component {...pageProps} />
        </StoreContext.Provider>
      </Container>
    )
  }
}
