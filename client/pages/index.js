// @flow

import React from 'react'
import { observer } from 'mobx-react'

import Page from '@app/layouts/main'
import StoreContext from '@app/context/store'
import 'normalize.css'

type Props = {

}

@observer
class Index extends React.Component<Props> {
  render() {
    return (
      <Page>
        <StoreContext.Consumer>
          {({ store }) => (
            <div>

            </div>
          )}
        </StoreContext.Consumer>
      </Page>
    )
  }
}

export default Index
