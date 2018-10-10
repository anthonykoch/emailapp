// @flow

import React from 'react'
import { css } from 'react-emotion'

import type { User } from '@root/types'

type Props = {
  user: User,
}

export default class UserProfilePreview extends React.PureComponent<Props> {
  render() {
    const { user } = this.props

    return (
      <div className={containerClass}>
        <img className={avatarClass} src={user.profileImage} />
        <div className={usernameClass}>{user.firstName} {user.lastName}</div>
        <div className={actionClass}></div>
      </div>
    )
  }
}

const containerClass = css`
  align-items: center;
  display: flex;
`

const avatarClass = css`
  border-radius: 50%;
  margin-right: 14px;
  height: 40px;
  width: 40px;
`

const usernameClass = css`
  color: #6d7482;
  font-size: 14px;
  margin-right: 14px;
`

const actionClass = css`
  border-radius: 50%;
  border: 1px solid #aaa;
  height: 23px;
  position: relative;
  width: 23px;

  &:before {
    content: '+';
    font-size: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
  }
`
