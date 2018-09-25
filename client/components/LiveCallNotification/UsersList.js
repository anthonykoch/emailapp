// @flow

import React from 'react'
import styled, { css } from 'react-emotion'

import styles from '@app/styles/utilities'

import type { User } from '@root/types'

type Props = {
  users: User[],
  maxAvatars?: number,
}

const MAX_AVATARS = 4

export default class UsersList extends React.PureComponent<Props> {
  render() {
    const { maxAvatars=MAX_AVATARS, users } = this.props
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
          >
            {user.shortName}
          </UserAvatar>
        ))}
        <styles.spacing.Margin left="3">
          {users.length > maxAvatars && <UserAvatarRemainder>+{remainder} more</UserAvatarRemainder>}
        </styles.spacing.Margin>
      </UserAvatarList>
    )
  }
}

const UserAvatarList = styled('div')`
  align-items: center;
  display: flex;
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
`

const UserAvatarRemainder = styled('div')`
  color: white;
  font-size: 11px;
  font-weight: 600;
`

const firstUserAvatarClass = css`
  border-color: white;
`
