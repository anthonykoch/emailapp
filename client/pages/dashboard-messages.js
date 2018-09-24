// @flow

import React from 'react'
import { observer } from 'mobx-react'
import styled, { css } from 'react-emotion'

import Page from '@app/layouts/main'
import DashboardHeader from '@app/components/DashboardHeader/DashboardHeader'
import StoreContext from '@app/context/store'

import type { Theme } from '@app/styles/variables'

type Props = {}

type User = {
  firstName: string,
  lastName: string,
}
const user: User = {
  firstName: 'Essie',
  lastName: 'Howell',
}

@observer
class Index extends React.Component<Props> {
  render() {
    return (
      <Page>
        <StoreContext.Consumer>
          {({ store }) => (
            <BackgroundColor>
              <DashboardHeader user={user}></DashboardHeader>
            </BackgroundColor>
          )}
        </StoreContext.Consumer>
      </Page>
    )
  }
}

const BackgroundColor = styled('div')`
  ${(props: { theme: Theme }) => css`
    background-color: ${props.theme.bodyBackgroundColor};
    min-height: 100vh;
  `}
`

export default Index
