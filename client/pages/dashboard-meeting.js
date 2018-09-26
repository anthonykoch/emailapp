// @flow

import React from 'react'
import { observer } from 'mobx-react'
import styled, { css, cx } from 'react-emotion'

import StoreContext from '@app/context/store'
import Page from '@app/layouts/dashboard'
import Heading from '@app/components/Heading/Heading'
import Filters from '@app/components/Filters/Filters'
import LiveCallNotification from '@app/components/LiveCallNotification/LiveCallNotification'
import MessagesOverview from '@app/components/MessagesOverview/MessagesOverview'
import MessagesInboxContainer from '@app/components/MessagesInbox/MessagesInboxContainer'

import styles from '@app/styles/utilities'

import type { User } from '@root/types'
import type { Theme } from '@app/styles/variables'

type Props = {
  user: User,
  theme: Theme,
}

const user: User = {
  id: 902,
  firstName: 'Essie',
  lastName: 'Howell',
  username: 'Essieness',
  shortName: 'H',
  role: 'Super Admin',
}

export default
@observer
class DashboardMessages extends React.Component<Props> {
  render() {
    return (
      <Page
        middle={
          <div>
            <styles.spacing.Margin bottom="4">
              <MessagesInboxContainer userId={user.id} />
            </styles.spacing.Margin>
          </div>

        }
        right={
          <IdkWhatThisIs></IdkWhatThisIs>
        }
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
