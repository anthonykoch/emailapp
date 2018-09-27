// @flow

import React from 'react'
import styled, { css } from 'react-emotion'

import styles from '@app/styles/utilities'

import type { Theme } from '@app/styles/variables'
import type { User } from '@root/types'

type Subtheme = {
  dark?: boolean,
}

type Props = {
  users: User[],
  maxAvatars?: number,
  subtheme?: Subtheme,
}

const MAX_AVATARS = 4

export default class UserList extends React.PureComponent<Props> {
  render() {
    const { maxAvatars=MAX_AVATARS, users, subtheme={} } = this.props
    const remainder = users.length - maxAvatars

    return (
      <UserAvatarList>
        {users.slice(0, maxAvatars).map((user, index) => (
          <UserAvatar
            key={user.id}
            className={index === 0 ? firstUserAvatarClass : ''}
            style={{
              position: 'relative',
              zIndex: users.length - index,
            }}
            subtheme={subtheme}
          >
            {user.shortName}
          </UserAvatar>
        ))}
        <styles.spacing.Margin left="3">
          {users.length > maxAvatars && (
            <UserAvatarRemainder
              subtheme={subtheme}
            >
              +{remainder} more
            </UserAvatarRemainder>)
          }
        </styles.spacing.Margin>
      </UserAvatarList>
    )
  }
}

const UserAvatarList = styled('div')`
  align-items: center;
  display: inline-flex;
  padding-left: 10px;
`

const UserAvatar = styled('div')`
  background-color: #ff765b;
  border-radius: 50%;
  border-color: rgba(255, 255, 255, 0.6);
  border-style: solid;
  border-width: 2px;
  color: white;
  font-size: 12px;
  font-weight: 600;
  margin-left: -10px;
  height: 32px;
  text-align: center;
  line-height: 28px;
  width: 32px;

  ${(props: { theme: Theme, subtheme: Subtheme }) => css`
    ${props.subtheme.dark && css`
      background-color: #cccccc;
      border-color: rgba(255, 255, 255, 0.9);
    `}
  `}
`

const UserAvatarRemainder = styled('div')`
  color: white;
  font-size: 11px;
  font-weight: 600;


  ${(props: { theme: Theme, subtheme: Subtheme }) => css`
    ${props.subtheme.dark && css`
      color: ${props.theme.colorTextForeground};
    `}
  `}
`

const firstUserAvatarClass = css`
  border-color: white;
`
