// @flow

import React from 'react'
import styled, { css } from 'react-emotion'

import Toggle from '@app/components/Input/Toggle'
import Time from './Time'
import Title from './Title'
import { SectionHeader } from './Section'

import styles from '@app/styles/utilities'

// $FlowFixMe
import profileImage from '@app/images/shrewd.png'

import type { Theme } from '@app/styles/variables'

type Props = {
}

export default class InviteNotification extends React.Component<Props> {
  render() {
    return (
      <div>
        <SectionHeader>
          <div><Avatar src={profileImage} alt="avatar"/></div>
          <Time>9:43 PM</Time>
        </SectionHeader>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <styles.spacing.Padding right="2">
            <Title>{`Mike invited you to "Over it"`}</Title>
          </styles.spacing.Padding>
          <ToggleWrapper>
            <Toggle />
            <LabelText>Going</LabelText>
          </ToggleWrapper>
        </div>
      </div>
    )
  }
}

const ToggleWrapper = styled('div')`
  display: flex;
  align-items: center;
`

const LabelText = styled('span')`
  font-size: 11px;
  display: inline-block;
  margin-left: 7px;

  ${(props: { theme: Theme }) => css`
    color: ${props.theme.color1};
  `}
`

const Avatar = styled('img')`
  display: block;
  border-radius: 50%;
  height: 36px;
  width: 36px;
`
