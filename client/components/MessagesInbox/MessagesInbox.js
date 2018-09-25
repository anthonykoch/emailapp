// @flow

import React from 'react'
import styled, { css } from 'react-emotion'

import Message from './Message'

import type { Message as TMessage } from '@root/types'
import type { Theme } from '@app/styles/variables'

type Props = {
  messages: TMessage[],
  empty?: any,
}

export default class MessagesInbox extends React.PureComponent<Props> {
  render() {
    const { messages } = this.props

    if (messages.length > 0) {
      return (
        <Panel>
          {messages.map((message: TMessage) => (
            <Message message={message} key={message.id} />
          ))}
        </Panel>
      )
    }

    return this.props.empty || (
      <Empty>
        <div>There are no messages to display.</div>
      </Empty>
    )
  }
}

const Panel = styled('div')`
  background-color: white;
  box-shadow: 0 11px 50px -2px rgba(0, 0, 0, 0.1);
`

const Empty = styled('div')`
  background-color: white;
  border: 1px solid #e1e7ec;
  border-radius: 6px;
  font-size: 15px;
  padding: 20px;
  text-align: center;

  ${(props: { theme: Theme }) => css`
    color: ${props.theme.colorTextForeground};
  `}
`
