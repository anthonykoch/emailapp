// @flow

import React from 'react'
import styled from 'react-emotion'

import styles from '@app/styles/utilities'

type Props = {}

export default class LiveCallInfo extends React.PureComponent<Props> {
  render() {
    return (
      <div>
        <LiveCallContainer>
          <div>
            <LiveCallAvatar src="" alt="" />
          </div>
          <div>
            <LiveCallTitle>
              Sales Presentation
              <styles.spacing.Margin x="2" className={styles.display.inlineBlock}>
                -
              </styles.spacing.Margin>
              Live Group Call
            </LiveCallTitle>
            <LiveCallEmail>adams_ka@gmail.com</LiveCallEmail>
            <LiveCallTime>Started 3 min ago</LiveCallTime>
          </div>
        </LiveCallContainer>
      </div>
    )
  }
}

const LiveCallContainer = styled('div')`
  align-items: center;
  display: flex;
`

const LiveCallTitle = styled('h2')`
  color: rgba(255, 255, 255, 0.9);
  font-size: 15px;
  font-weight: bold;
  line-height: 17px;
  margin-bottom: 7px;
`

const LiveCallEmail = styled('div')`
  color: white;
  font-size: 13px;
  line-height: 13px;
  margin-bottom: 5px;
`

const LiveCallTime = styled('div')`
  color: rgba(255, 255, 255, 0.6);
  font-size: 11px;
`

const LiveCallAvatar = styled('img')`
  border: 4px solid #ffa9bf;
  border-radius: 50%;
  display: block;
  height: 66px;
  margin-right: 10px;
  width: 66px;
`
