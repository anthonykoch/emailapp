// @flow

import React from 'react'
// import styled, { css } from 'react-emotion'
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
class DashboardOverview extends React.Component<Props> {
  render() {
    const {
      users: { user },
    } = this.props.store

    return (
      <Page
        user={
          // $FlowFixMe This can technically never be null at this point
          user
        }
        middle={
          <div>
            <Head>
              <title>Overview</title>
            </Head>
            <DetailsSidebarContainer />
            <styles.spacing.Margin bottom="4">
              <Heading level="1">
                Overview
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
          </div>
        }
        right={null}
      >
      </Page>
    )
  }
}

const Export = withAuth(withStore(DashboardOverview))

async function getInitialProps({ req, services, store }: NextInitialArgs): Promise<InitialProps> {
  if (process.env.SERVER) {
    const userId = String(req.user.id)

    const [overview, user] = await Promise.all([
      services.usersMessagesOverview.find({ route: { userid: userId } }),
      services.users.get(userId),
    ])

    store.usersMessagesOverview.setOverview(overview)
    store.users.setUser(user)

  } else {
    await Promise.all([
      store.usersMessagesOverview.getOverview(),
      store.users.getUser(),
    ])
  }

  return {}
}

// $FlowFixMe
Export.getInitialProps = getInitialProps

export default Export
