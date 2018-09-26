// @flow

import React from 'react'
import styled from 'react-emotion'

import styles from '@app/styles/utilities'

import type { OverviewItem } from '@root/types'

type Props = {
  items: OverviewItem[]
}

export default class Overview extends React.PureComponent<Props> {
  render() {
    const { items=[] } = this.props

    return (
      <Panel>
        <Container>
          {items.map((section, index) => (
            <React.Fragment key={index}>
              <Media>
                <styles.spacing.Padding right="4">
                  {section.icon}
                </styles.spacing.Padding>
                <div>
                  <Title>{section.title}</Title>
                  <Amount>{section.amount}</Amount>
                  <Time>{section.timeframe}</Time>
                </div>
              </Media>
              {index === items.length ? null : <Divider />}
            </React.Fragment>
          ))}
        </Container>
      </Panel>
    )
  }
}

const Divider = styled('div')`
  background-color: #f0f5f8;
  height: 50px;
  width: 1px;
`

const Panel = styled('div')`
  background-color: white;
  border: 1px solid #ccd7e0;
  border-radius: 7px;
  padding: 20px;
`

const Container = styled('div')`
  align-items: center;
  display: flex;
  justify-content: space-between;
`

const Amount = styled('span')`
  color: #303c48;
  font-size: 22px;
  font-weight: 600;
`

const Time = styled('span')`
  color: #b3b8bc;
  display: inline-block;
  font-size: 13px;
  padding-left: 10px;
`

const Title = styled('div')`
  color: #303c48;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.5;
  margin-bottom: 3px;
`

const Media = styled('div')`
  align-items: center;
  display: flex;
`
