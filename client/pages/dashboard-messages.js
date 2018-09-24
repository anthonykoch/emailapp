// @flow

import React from 'react'
import { observer } from 'mobx-react'
import styled, { css } from 'react-emotion'

import Page from '@app/layouts/main'
import StoreContext from '@app/context/store'
import DashboardHeader from '@app/components/DashboardHeader/DashboardHeader'
import Sidebar from '@app/components/Sidebar/Sidebar'

import type { Theme } from '@app/styles/variables'

type Props = {}

type User = {
  firstName: string,
  lastName: string,
}

const user: User = {
  role: 'Super Admin',
  firstName: 'Essie',
  lastName: 'Howell',
}

const sidebarLinks = [
  {
    id: 1,
    children: 'Overview',
    to: { route: 'overview' },
  },
  {
    id: 2,
    children: 'Reservation',
    to: { route: 'dashboard-reservation' },
  },
  {
    id: 3,
    children: 'Meeting',
    to: { route: 'dashboard-meeting' },
  },
  {
    id: 4,
    children: 'Customers',
    to: { route: 'dashboard-customers' },
  },
  {
    id: 5,
    children: 'Ticket',
    to: { route: 'dashboard-ticket' },
  },
  {
    id: 6,
    children: 'Message',
    to: { route: 'dashboard-messages' },
  },
  {
    id: 7,
    children: 'Profile',
    to: { route: 'dashboard-profile' },
  },
]

@observer
class Index extends React.Component<Props> {
  render() {
    return (
      <Page>
        <StoreContext.Consumer>
          {({ store }) => (
            <Wrapper>
              <DashboardHeader user={user}></DashboardHeader>

              <Container>
                <LeftColumn>
                  <Sidebar links={sidebarLinks} user={user} />
                </LeftColumn>
                <RightColumn>

                </RightColumn>
              </Container>
            </Wrapper>
          )}
        </StoreContext.Consumer>
      </Page>
    )
  }
}

// const MakeBlah = () => {
//   return (

//   )
// }

const Container = styled('div')`
  display: flex;
  flex: 1;
  padding-top: 40px;
`

const LeftColumn = styled('div')`
  flex-basis: auto;
  width: 300px;
`

const RightColumn = styled('div')`
  flex: 1;
`

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  ${(props: { theme: Theme }) => css`
    background-color: ${props.theme.bodyBackgroundColor};
  `}
`

export default Index
