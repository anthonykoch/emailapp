// @flow

import React from 'react'
import styled, { css } from 'react-emotion'

import styles from '@app/styles/utilities'
import Button from '@app/components/Button/Button'
import IconCamera from '@app/components/Icon/IconCamera'
import UsersList from '@app/components/UsersList/UsersList'
import LiveCallInfo from './Information'

import type { Theme } from '@app/styles/variables'
import type { User } from '@root/types'

type Props = {}

// TODO: Do a cool animation with the you're invited button

const users: User[] = [
  {
    id: 1,
    firstName: '',
    lastName: '',
    role: 'meme',
    shortName: 'A',
  },
  {
    id: 2,
    firstName: '',
    lastName: '',
    role: 'meme',
    shortName: 'K',
  },
  {
    id: 3,
    firstName: '',
    lastName: '',
    role: 'meme',
    shortName: 'D',
  },
  {
    id: 4,
    firstName: '',
    lastName: '',
    role: 'meme',
    shortName: 'V',
  },
  {
    id: 5,
    firstName: '',
    lastName: '',
    role: 'meme',
    shortName: 'B',
  },
]

export default class LiveCallNotification extends React.PureComponent<Props> {
  render() {
    return (
      <Background>
        <div className={containerClass}>
          <LiveCallInfo></LiveCallInfo>
          <UsersList users={users} />
          <ButtonGroup>
            <Button type="ghost-light">You{`'`}re invited</Button>
            <Button
              type="light"
              icon={
                <styles.spacing.Padding right="2" inline className={styles.display.block}>
                  <IconCamera className={iconCameraClass} />
                </styles.spacing.Padding>
              }
            >
              Join Now
            </Button>
          </ButtonGroup>
        </div>
      </Background>
    )
  }
}

const Background = styled('div')`
  border-radius: 2px;
  padding: 20px;

  ${(props: { theme: Theme }) => css`
    background-image: ${props.theme.liveCallNotificationGradient};
  `}
`

const ButtonGroup = styled('div')`
  display: flex;
  flex-basis: auto;
  width: 360px;
  justify-content: space-between;
`

const containerClass = css`
  align-items: center;
  display: flex;
  justify-content: space-between;
`

const iconCameraClass = css`
  display: block;
  fill: #b6b6b6;
  width: 20px;
`
