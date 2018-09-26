// @flow

import React from 'react'
import styled from 'react-emotion'

import Overview from './Overview'
// import styles from '@app/styles/utilities'

type Props = {
  overall: {
    amount: number,
  },
  sent: {
    amount: number,
  },
  received: {
    amount: number,
  },
  sort?: Function,
}

export default class Messages extends React.PureComponent<Props> {
  render() {
    const { overall, sent, received } = this.props

    let items = [
      {
        title: 'Overall Messages',
        amount: overall.amount,
        timeframe: 'This Month',
        icon: <IconBackground />,
      },
      {
        title: 'Sent Messages',
        amount: sent.amount,
        timeframe: 'This Month',
        icon: <IconBackground />,
      },
      {
        title: 'Received Messages',
        amount: received.amount,
        timeframe: 'This Month',
        icon: <IconBackground />,
      },
    ]

    if (this.props.sort) {
      items = [...this.props.sort(items)]
    }

    return (
      <Overview items={items} />
    )
  }
}

const IconBackground = styled('div')`
  background-color: #f1f9ff;
  border: 1px solid #ddefff;
  border-radius: 50%;
  height: 82px;
  width: 82px;
`
