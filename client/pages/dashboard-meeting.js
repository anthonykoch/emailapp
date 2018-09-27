// @flow

import React from 'react'
import { observer } from 'mobx-react'
import styled, { css } from 'react-emotion'

import StoreContext from '@app/context/store'
import Page from '@app/layouts/dashboard'
import Heading from '@app/components/Heading/Heading'
import MeetingsOverview from '@app/components/Overview/Meetings'
import MeetingCard from '@app/components/MeetingCard/MeetingCard'
import DetailsSidebarContainer from '@app/components/DetailsSidebar/DetailsSidebarContainer'

import styles from '@app/styles/utilities'

import type { User } from '@root/types'
import type { Theme } from '@app/styles/variables'

type Props = {
  user: User,
  theme: Theme,
}

export default
@observer
class DashboardMessages extends React.Component<Props> {
  render() {
    return (
      <Page
        middle={
          <div>
            <DetailsSidebarContainer defaultOpen={true} />
            <styles.spacing.Margin bottom="4">
              <Heading level="1" theme={this.props.theme}>
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

const Header = styled('header')`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
`
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
