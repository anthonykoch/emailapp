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

// https://dribbble.com/shots/3903437-Dashboard-message/attachments/888558
// https://dribbble.com/shots/3781660-Dashboard-Meeting/attachments/851963

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
                <MiddleColumn>
                  <Meme></Meme>
                </MiddleColumn>
                <RightColumn>
                  <IdkWhatThisIs></IdkWhatThisIs>
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

const Meme = styled('div')`
  height: 50px;
  background-color: red;
`

const IdkWhatThisIs = styled('div')`
  border-radius: 50%;
  border-bottom: 0;
  bottom: 30px;
  box-shadow: 0 25px 50px -4px rgba(0, 0, 0, 0.25);
  height: 54px;
  position: fixed;
  right: 30px;
  width: 54px;

  &:before {
    color: white;
    content: '+';
    font-size: 28px;
    display: block;
    line-height: 1;
    position: absolute;
    left: 50%;
    top: 48%;
    transform: translate(-50%, -50%);
  }

  ${(props: { theme: Theme }) => css`
    background-color: ${props.theme.color7}
  `}

`

const Container = styled('div')`
  display: flex;
  flex: 1;
  padding-top: 40px;
`

const LeftColumn = styled('div')`
  flex-basis: auto;
  padding-left: 30px;
  padding-right: 30px;
  width: 340px;
`

const MiddleColumn = styled('div')`
  flex: 1;
`

const RightColumn = styled('div')`
  flex-basis: auto;
  max-width: 104px;
  padding-left: 30px;
  padding-right: 30px;
  width: 100%;
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
