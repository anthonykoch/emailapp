// @flow

import React from 'react'
import { observer } from 'mobx-react'

import MessagesInbox from './MessagesInbox'

// import type { User, Message } from '@root/types'

type Props = {
  userId: number,
}

export default
@observer
class MessagesInboxContainer extends React.Component<Props> {
  render() {
    return (
      <MessagesInbox
        messages={[
          {
            id: 1,
            from: {
              id: 489,
              firstName: 'Joseph',
              lastName: 'Kennedy',
              username: 'lol',
            },
            tags: [{ name: 'User testing' }],
            message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam earum quo architecto at ea nihil nesciunt rerum, amet, minus adipisci, dicta suscipit sit iure, accusantium unde quam ab dolore! Dolorum sunt labore, rerum praesentium alias. Corporis, adipisci labore eaque illum.`,
            read: false,
          },
          {
            id: 2,
            from: {
              id: 304,
              firstName: 'Jeanette',
              lastName: 'Schneider',
              username: 'jeanieinabottle',
            },
            tags: [{ name: 'Design' }],
            message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam earum quo architecto at ea nihil nesciunt rerum, amet, minus adipisci, dicta suscipit sit iure, accusantium unde quam ab dolore! Dolorum sunt labore, rerum praesentium alias. Corporis, adipisci labore eaque illum.`,
            read: false,
          },
        ]}
      />
    )
  }
}
