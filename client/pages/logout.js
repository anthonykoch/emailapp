// @flow

import React from 'react'
import Head from 'next/head'

import Main from '@app/layouts/main'
import { Router } from '@app/routes'
import withStore from '@app/hocs/store'

import type { IRootStore } from '@root/types'

type Props = {
  store: IRootStore,
  redirectUrl: string,
}

type State = {
  isAuthenticated: boolean,
  username: string,
  password: string,
  error: string,
}

class Logout extends React.Component<Props, State> {
  async componentDidMount() {
    await this.props.store.auth.logout()
    Router.pushRoute('/login')
  }

  render() {
    return (
      <Main>
        <Head>
          <title>Logout</title>
        </Head>
      </Main>
    )
  }
}

export default withStore(Logout)
