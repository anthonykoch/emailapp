// @flow

import React from 'react'
import { observer } from 'mobx-react'

import Page from '@/layouts/main'
import DashboardHeader from '@/components/DashboardHeader'
import StoreContext from '@/context/store'

@observer
class Index extends React.Component {
  render() {
    return (
      <Page>
        <StoreContext.Consumer>
          {({ store }) => (
            <div>
              <DashboardHeader></DashboardHeader>
            </div>
          )}
        </StoreContext.Consumer>
      </Page>
    )
  }
}

export default Index
