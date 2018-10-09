// @flow

import React from 'react'
import { observer } from 'mobx-react'

import auth from '@app/auth'
import { withStore } from '@app/context/store'

import type { IRootStore } from '@root/types'

type Props = {
  store: IRootStore,
}

type State = {
  isLoading: boolean,
}

class Authentication extends React.Component<Props, State> {
  constructor(props: Props) {
    super()

    this.state = {
      isLoading: false,
    }
  }

  componentDidMount() {
    auth.authenticate({
      strategy: 'jwt',
      accessToken: auth.passport.getJWT(),
    })
  }

  render() {
    // const { store } = this.props

    return (
      <div>

      </div>
    )
  }
}

export default withStore(observer(Authentication))
