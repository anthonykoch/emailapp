// @flow

import React, { type ComponentType, type ElementConfig } from 'react'
import { observer } from 'mobx-react'

import { withStore } from '@app/context/store'
import { Router } from '@app/routes'

import type { IRootStore } from '@root/types'

type AuthProps = {
  store: IRootStore,
  loading: any,
  children: any,
}

type State = {
  isAuthenticated: boolean,
}

const Authentication =
  withStore(observer(
    class Authentication extends React.Component<AuthProps, State> {
      state = {
        isAuthenticated: false,
      }

      async componentDidMount() {
        const { store } = this.props

        store.auth.isAuthenticated()
          .then((isAuthenticated) => {
            if (isAuthenticated) {
              this.setState({
                isAuthenticated,
              })
            } else {
              Router.pushRoute('/login')
            }
          }).catch(err => {
            console.log(err)
          })
      }

      render() {
        return this.state.isAuthenticated
          ? this.props.children
          : this.props.loading || null
      }
    }
  ))

function withAuth<Props: {} & {
  store: IRootStore }, TComponent: ComponentType<Props>>(
  Component: TComponent,
  loading: any,
): ComponentType<ElementConfig<TComponent>> {
  const WithAuth = (props) => (
    <Authentication loading={loading}>
      <Component {...props} />
    </Authentication>
  )

  return WithAuth
}

export default withAuth
