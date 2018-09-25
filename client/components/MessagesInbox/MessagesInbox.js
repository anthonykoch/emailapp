// @flow

import React from 'react'
import styled from 'react-emotion'

import Message from './Message'

import type { Message as TMessage } from '@root/types'

type Props = {
  messages: TMessage[],
}

export default class MessagesInbox extends React.PureComponent<Props> {
  render() {
    return (
      <Panel>
        {this.props.messages.map((message: TMessage) => (
          <Message message={message} key={message.id} />
        ))}
      </Panel>
    )
  }
}

const Panel = styled('div')`
  box-shadow: 0 11px 50px -2px rgba(0, 0, 0, 0.1);
`
