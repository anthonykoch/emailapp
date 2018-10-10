// @flow

import React from 'react'
import styled, { css } from 'react-emotion'
import Head from 'next/head'
import { observer } from 'mobx-react'

import Page from '@app/layouts/dashboard'
import Heading from '@app/components/Heading/Heading'
import MeetingsOverview from '@app/components/Overview/Meetings'
import MeetingCard from '@app/components/MeetingCard/MeetingCard'
import DetailsSidebarContainer from '@app/components/DetailsSidebar/DetailsSidebarContainer'

import withStore from '@app/hocs/store'
import withAuth from '@app/hocs/authentication'
import styles from '@app/styles/utilities'

import { type User, type IRootStore, type NextInitialArgs } from '@root/types'
import type { Theme } from '@app/styles/variables'

type InitialProps = {}

type Props = {
  user: User,
  theme: Theme,
  store: IRootStore,
} & InitialProps

@observer
class DashboardMeeting extends React.Component<Props> {
  render() {
    const {
      users: { user },
    } = this.props.store

    return (
      <Page
        user={
          // $FlowFixMe
          user
        }
        middle={
          <div>
            <Head>
              <title>Meetings</title>
            </Head>
            <DetailsSidebarContainer />
            <styles.spacing.Margin bottom="4">
              <Heading level="1">
                Meetings
              </Heading>
            </styles.spacing.Margin>
            <styles.spacing.Margin bottom="6">
              <MeetingsOverview
                completed={{
                  amount: 36,
                  timeframe: 'This Month',
                }}
                rescheduled={{
                  amount: 14,
                  timeframe: 'This Month',
                }}
                canceled={{
                  amount: 20,
                  timeframe: 'This Month',
                }}
              />
            </styles.spacing.Margin>
            <styles.spacing.Margin bottom="4">
              <Subheading>Today - 8 Meeting</Subheading>
            </styles.spacing.Margin>
            <styles.spacing.Margin bottom="4">
              <MeetingCardWrapper>
                <MeetingCard

                />
              </MeetingCardWrapper>
            </styles.spacing.Margin>
          </div>
        }
        right={null}
      >
      </Page>
    )
  }
}

const Subheading = styled('div')`
  font-size: 15px;
  font-weight: 600;
  ${(props: { theme: Theme }) => css`
    color: ${props.theme.colorTextForeground};
  `}
`

const MeetingCardWrapper = styled('div')`
  max-width: 260px;
`

const Export = withAuth(withStore(DashboardMeeting))

async function getInitialProps({ req, services, store }: NextInitialArgs): Promise<InitialProps> {
  if (process.env.SERVER) {
    const userId = String(req.user.id)

    const [user] = await Promise.all([
      services.users.get(userId),
      // services.usersMeetingsOverview.find({ route: { userid: userId } }),
    ])

    // store.usersMeetingsOverview.setOverview(overview)
    store.users.setUser(user)
  } else {
    // store.usersMeetingOverview.getOverview()
    await Promise.all([
      store.users.getUser(),
    ])
  }

  return {}
}

// $FlowFixMe
Export.getInitialProps = getInitialProps

export default Export
