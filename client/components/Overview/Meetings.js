// @flow

import React from 'react'
import styled from 'react-emotion'

import Overview from './Overview'

type Props = {
  completed: {
    amount: number,
    timeframe: string,
  },
  rescheduled: {
    amount: number,
    timeframe: string,
  },
  canceled: {
    amount: number,
    timeframe: string,
  },
  sort?: Function,
}

export default class MeetingOverview extends React.PureComponent<Props> {
  render() {
    const { completed, rescheduled, canceled } = this.props

    let items = [
      {
        title: 'Number of meeting',
        amount: completed.amount,
        timeframe: completed.timeframe,
        icon: <IconBackground />,
      },
      {
        title: 'Rescheduled Meeting',
        amount: rescheduled.amount,
        timeframe: rescheduled.timeframe,
        icon: <IconBackground />,
      },
      {
        title: 'Canceled Messages',
        amount: canceled.amount,
        timeframe: canceled.timeframe,
        icon: <IconBackground />,
      }
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
  background-color: #f6f6f6;
  border-radius: 50%;
  height: 70px;
  width: 70px;
`
