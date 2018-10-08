// @flow

import React from 'react'
import styled, { css, cx } from 'react-emotion'

import Page from '@app/layouts/dashboard'
import Heading from '@app/components/Heading/Heading'
import Filters from '@app/components/Filters/Filters'
import LiveCallNotification from '@app/components/LiveCallNotification/LiveCallNotification'
import MessagesOverview from '@app/components/Overview/Messages'
import MessagesInbox from '@app/components/MessagesInbox/MessagesInbox'

import styles from '@app/styles/utilities'

import type { User } from '@root/types'
import type { Theme, Message, NextInitialArgs } from '@app/styles/variables'

type Props = {
  theme: Theme,
  liveCallNotification: boolean,
}

type InitialProps = {
  messages: ?Message[],
  user: ?{
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    shortName: string,
    role: string,
  },
}

// https://dribbble.com/shots/3903437-Dashboard-message/attachments/888558
// https://dribbble.com/shots/3781660-Dashboard-Meeting/attachments/851963
// if (process.env.SERVER) {
//   const { route: UsersServiceRoute } = require('../../server/services/users/users.service')
// }

export default class DashboardMessages extends React.Component<Props & InitialProps> {
  allFilter: any;
  filters: any;

  static async getInitialProps({ req, app }: NextInitialArgs): Promise<InitialProps> {
    if (process.env.SERVER) {
      const db = app.get('knex')

      const promises = [
        db('messages')
          .select(db.raw(`
            (SELECT count(messages.sender_id) FROM messages WHERE messages.sender_id = ${req.user.id}) AS sent,
            (SELECT count(*)
            FROM message_recipients
            WHERE message_recipients.recipient_id = ${req.user.id}) AS received
          `))
          .first(),
        db('messages')
          .select(db.raw(`
            messages.id as id,
            messages.content as message,
            json_build_object(
              'firstName', users.first_name,
              'lastName', users.last_name,
              'shortname', users.shortname
            ) as from,
            messages.read as read
          `))
          .join('message_recipients', {
            'messages.id': 'message_recipients.message_id',
          })
          .join('users', {
            'users.id': 'messages.sender_id',
          })
          .where('message_recipients.recipient_id', req.user.id),
        app.service('/api/users').get(req.user.id),
      ]

      const [{ sent, received }, messages, user] = await Promise.all(promises)

      // console.log({ messages })
      // console.log({ user })
      // console.log({ overview })

      return {
        overview: {
          sent: Number(sent),
          received: Number(received),
        },
        user,
        messages,
      }
    }

    // return {
    //   overview,
    //   user,
    //   messages,
    // }
  }

  constructor() {
    super()

    this.allFilter = [
      {
        children: 'All',
        active: true,
        toggle: this.onFilterChange,
      },
    ]

    this.filters = [
      {
        children: 'Unread',
        first: true,
        // TODO: onToggle() {}
      },
      {
        children: 'Important',
        last: true,
      },
    ]
  }

  onFilterChange = () => {

  }

  render() {
    const { liveCallNotification, messages, overview } = this.props

    console.log(overview);


    return (
      <Page
        middle={
          <div>
            <styles.spacing.Margin bottom="3">
              <Header>
                <Heading level="1" theme={this.props.theme}>
                  Messages
                </Heading>
                <div className={cx(styles.display.flex)}>
                  <styles.spacing.Margin right="2">
                    <Filters items={this.allFilter}></Filters>
                  </styles.spacing.Margin>
                  <Filters items={this.filters}></Filters>
                </div>
              </Header>
            </styles.spacing.Margin>

            {liveCallNotification && (<styles.spacing.Margin bottom="4">
              <LiveCallNotification />
            </styles.spacing.Margin>)}

            <styles.spacing.Margin bottom="4">
              <MessagesOverview
                overall={{ amount: overview.sent + overview.received }}
                sent={{ amount: overview.sent }}
                received={{ amount: overview.received }}
              />
            </styles.spacing.Margin>

            <styles.spacing.Margin bottom="4">
              <MessagesInbox messages={messages == null ? [] : messages} />
            </styles.spacing.Margin>
          </div>
        }
        right={
          <IdkWhatThisIs></IdkWhatThisIs>
        }
      >
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
    background-color: ${props.theme.filterActionBackgroundActive};
  `}
`
