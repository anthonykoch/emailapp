// @flow

import React from 'react'
// import { observer } from 'mobx'
import styled, { css } from 'react-emotion'
import Head from 'next/head'

import Main from '@app/layouts/main'

import auth from '@app/auth'
import { Router } from '@app/routes'
import styles from '@app/styles/utilities'

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

const validations = {
  username: {
    rules: {

    },
    messages: {},
  },
  password: {
    rules: {},
    messages: {},
  },
}

export default class Login extends React.Component<Props, State> {
  static async getInitialProps({ store }) {
    if (process.env.SERVER) {

    } else {
      console.log(await store.auth.logout())
      Router.pushRoute('/login')
    }

    return {}
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
