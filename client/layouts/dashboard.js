// @flow

import React from 'react'
import styled, { css } from 'react-emotion'

import Main from '@app/layouts/main'
import DashboardHeader from '@app/components/DashboardHeader/DashboardHeader'
import Sidebar from '@app/components/Sidebar/Sidebar'

import type { Theme } from '@app/styles/variables'
import type { User, SidebarLink } from '@root/types'

const sidebarLinks: SidebarLink[] = [
  {
    id: 1,
    children: 'Overview',
    route: 'dashboard-overview',
    icon: '',
  },
  {
    id: 2,
    children: 'Reservation',
    route: 'dashboard-reservation',
    icon: '',
  },
  {
    id: 3,
    children: 'Meeting',
    route: 'dashboard-meeting',
    icon: '',
  },
  {
    id: 4,
    children: 'Customers',
    route: 'dashboard-customers',
    icon: '',
  },
  {
    id: 5,
    children: 'Ticket',
    route: 'dashboard-ticket',
    icon: '',
  },
  {
    id: 6,
    children: 'Message',
    route: 'dashboard-messages',
    icon: '',
  },
  {
    id: 7,
    children: 'Profile',
    route: 'dashboard-profile',
    icon: '',
  },
]

type Props = {
  user: User,
  left?: any,
  middle?: any,
}

export default class DashboardLayout extends React.Component<Props> {
  render() {
    const { user } = this.props

    return (
      <Main>
        <Wrapper>
          <DashboardHeader user={user}></DashboardHeader>
          <Container>
            <LeftColumn>
              {this.props.left || <Sidebar links={sidebarLinks} user={user} />}
            </LeftColumn>
            <MiddleColumn>
              {this.props.middle}
            </MiddleColumn>
          </Container>
        </Wrapper>
      </Main>
    )
  }
}

const leftColumnWidth = 300
const gutter = 30

const Container = styled('div')`
  align-items: flex-start;
  display: flex;
  flex: 1;
  padding-top: 40px;
`

const LeftColumn = styled('div')`
  flex-basis: auto;
  padding-left: ${gutter}px;
  min-width: ${leftColumnWidth}px;
`

const MiddleColumn = styled('div')`
  flex-basis: auto;
  padding-left: ${gutter}px;
  padding-right: ${gutter}px;
  width: calc(100% - ${leftColumnWidth}px);
`

// FIXME: Not sure if there should be a third column
// const RightColumn = styled('div')`
//   flex-basis: auto;
//   max-width: ${rightColumnWidth}px;
//   width: ${rightColumnWidth}px;
//   padding-right: ${gutter}px;
//   width: 100%;
// `

const Wrapper = styled('div')`
  min-height: 100vh;

  ${(props: { theme: Theme }) => css`
    background-color: ${props.theme.bodyBackgroundColor};
  `}
`
