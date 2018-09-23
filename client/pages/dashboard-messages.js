// @flow

import React from 'react'
import { observer } from 'mobx-react'

import Page from '@app/layouts/main'
import DashboardHeader from '@app/components/DashboardHeader/DashboardHeader'
import StoreContext from '@app/context/store'

type Props = {}

@observer
class Index extends React.Component<Props> {
  render() {
    return (
      <Page>
        <StoreContext.Consumer>
          {({ store }) => (
            <div>
              <DashboardHeader user={store.user}></DashboardHeader>
            </div>
          )}
        </StoreContext.Consumer>
      </Page>
    )
  }
}

export default Index
