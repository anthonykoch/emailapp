// @flow

import React from 'react'
import styled, { css } from 'react-emotion'

import styles from '@app/styles/utilities'

type Props = {}

export default class LiveCallInfo extends React.PureComponent<Props> {
  render() {
    return (
      <Panel>
        <Container>
          <Media>
            <styles.spacing.Padding right="4">
              <IconBackground></IconBackground>
            </styles.spacing.Padding>
            <div>
              <Title>Overral Messages</Title>
              <div>
                <Amount>2389</Amount>
                <Time>This month</Time>
              </div>
            </div>
          </Media>
          <Divider />
          <Media>
            <styles.spacing.Padding right="4">
              <IconBackground></IconBackground>
            </styles.spacing.Padding>
            <div>
              <Title>Sent Messages</Title>
              <div>
                <Amount>1494</Amount>
                <Time>This Month</Time>
              </div>
            </div>
          </Media>
          <Divider />
          <Media className={lastSectionClass}>
            <styles.spacing.Padding right="4">
              <IconBackground></IconBackground>
            </styles.spacing.Padding>
            <div>
              <Title>Received Messages</Title>
              <div>
                <Amount>895</Amount>
                <Time>This month</Time>
              </div>
            </div>
          </Media>
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
  border: 1px solid #e1e7ec;
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
  line-height: 1.5;
  margin-bottom: 3px;
`

const IconBackground = styled('div')`
  background-color: #f1f9ff;
  border: 1px solid #ddefff;
  border-radius: 50%;
  height: 82px;
  width: 82px;
`

const Media = styled('div')`
  align-items: center;
  display: flex;
`

const lastSectionClass = css`
  padding-right: 30px;
`
