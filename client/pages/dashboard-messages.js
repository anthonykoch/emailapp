// @flow

import React from 'react'
import { observer } from 'mobx-react'
// import styled, { css } from 'react-emotion'

import Page from '@app/layouts/dashboard'
import StoreContext from '@app/context/store'

import type { User } from '@root/types'
// import type { Theme } from '@app/styles/variables'

type Props = {
  user: User,
}

// https://dribbble.com/shots/3903437-Dashboard-message/attachments/888558
// https://dribbble.com/shots/3781660-Dashboard-Meeting/attachments/851963

@observer
class Index extends React.Component<Props> {
  render() {
    return (
      <Page>
        <StoreContext.Consumer>
          {({ store }) => (
            <div>
              hey!
            </div>
          )}
        </StoreContext.Consumer>
      </Page>
    )
  }
}

export default Index
