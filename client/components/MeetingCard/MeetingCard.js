// @flow

import React from 'react'
import styled, { css } from 'react-emotion'

import styles from '@app/styles/utilities'
import UserListThumbnail from '@app/components/UserListThumbnail/UserListThumbnail'

// $FlowFixMe
import profileImage from '@app/images/shrewd.png'

import type { Theme } from '@app/styles/variables'
import type { User } from '@root/types'

type Props = {
  //
}

const users: User[] =
  Array(6).fill(6)
    .map((_, index) => ({
      id: index,
      firstName: 'Tony',
      lastName: 'Bamboni',
      role: 'Super Admin',
      shortName: 'T',
    }))

export default class MeetingCard extends React.PureComponent<Props> {
  render() {
    return (
      <Panel>
        <Header>
          <div>
            <Avatar src={profileImage} alt="" />
          </div>
          <styles.spacing.Padding left="3">
            <Title>Design Catchup</Title>
            <Subtitle>adellac@josianne.com</Subtitle>
            <Time>10:30 am</Time>
          </styles.spacing.Padding>
        </Header>
        <Divider />
        <Information>
          <InformationGrid>
            <Going>9 Members Going</Going>
            <Pending>2 Pending</Pending>
          </InformationGrid>
          <styles.spacing.Padding bottom="5" top="4">
            <div style={{ textAlign: 'center' }}>
              <UserListThumbnail users={users} subtheme={{ dark: true }} />
            </div>
          </styles.spacing.Padding>
        </Information>
        <Divider />
        <Action>View Details</Action>
      </Panel>
    )
  }
}

const Going = styled('div')`
  font-size: 11px;
  font-weight: 600;

  ${(props: { theme: Theme }) => css`
    color: ${props.theme.color1}
  `}
`

const Pending = styled('div')`
  font-size: 11px;
  font-weight: 600;

  ${(props: { theme: Theme }) => css`
    color: ${props.theme.color2}
  `}`

const Header = styled('div')`
  display: flex;
  padding: 20px 30px;
`

const InformationGrid = styled('div')`
  display: flex;
  justify-content: space-between;
  text-align: center;
`

const Information = styled('div')`
  padding: 20px 30px 0;
`

const Divider = styled('div')`
  border-bottom: 1px solid #e8eff4;
`

const Avatar = styled('img')`
  border-radius: 50%;
  display: block;
  height: 56px;
  width: 56px;
`

const Title = styled('h3')`
  font-size: 13px;
  font-weight: 600;
  line-height: 1.2;
`

const Subtitle = styled('div')`
  color: #aaafb3;
  font-size: 11px;
`

const Time = styled('div')`
  color: #868c94;
  font-size: 13px;
`

const Panel = styled('div')`
  background-color: white;
  border: 1px solid #eeeeee;
  border-radius: 4px;
  box-shadow: 0 4px 40px -16px rgba(0,0,0,0.2);
`

const Action = styled('button')`
  ${styles.reset.button}
  background-color: white;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  color: #787878;
  display: block;
  font-size: 12px;
  font-weight: 600;
  padding-bottom: 18px;
  padding-top: 18px;
  transition-duration: 250ms;
  transition-property: background-color, color;
  text-align: center;
  width: 100%;

  ${(props: { theme: Theme }) => css`
    &:hover,
    &:active {
      color: white;
      background-color: ${props.theme.color1};
    }
  `}
`
