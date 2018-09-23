import App, { Container } from 'next/app'
import React from 'react'
import withMobxStore from '@app/store/with-mobx'
import StoreContext from '@app/context/store'

class MyApp extends App {
  render() {
    const { Component, pageProps, mobxStore: store } = this.props
    const provisions = {
      store,
    }

    return (
      <Container>
        <StoreContext.Provider value={provisions}>
          <Component {...pageProps} />
        </StoreContext.Provider>
      </Container>
    )
  }
}

export default withMobxStore(MyApp)
