// @flow

import React from 'react'
import { css } from 'react-emotion'

// $FlowFixMe
import profileImage from '@app/images/profile-image.jpg'

type Props = {
  user: {
    firstName: string,
    lastName: string,
  }
}

export default class UserProfilePreview extends React.PureComponent<Props> {
  render() {
    return (
      <div className={containerClass}>
        <img className={avatarClass} src={profileImage} />
        <div className={usernameClass}>{this.props.user.firstName} {this.props.user.lastName}</div>
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
  ${'' /* border: 1px solid rgba(0, 120, 0, 0.2); */}
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
