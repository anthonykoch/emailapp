// @flow

import React from 'react'

import styled, { css } from 'react-emotion'

import styles from '@app/styles/utilities'
import Checkbox from '@app/components/Input/Checkbox'
import Time from './Time'
import Title from './Title'
import { SectionHeader } from './Section'

import { voteResults } from '@app/data'

// $FlowFixMe
import profileImage from '@app/images/shrewd.png'

import type { Theme } from '@app/styles/variables'
import type { VoteOptionResult } from '@root/types'

type Props = {
  open: boolean,
  options: VoteOptionResult[],
}

export default class InviteNotification extends React.Component<Props> {
  render() {
    const { options=voteResults } = this.props

    return (
      <div>
        <SectionHeader>
          <div>
            <Avatar src={profileImage} alt="avatar"/>
          </div>
          <Time>9:43 PM</Time>
        </SectionHeader>
        <styles.spacing.Padding right="2" bottom="2">
          <Title>
            <VoteTitle>Mike started vote on:</VoteTitle>
            <VoteName>Game to play!?!/!1</VoteName>
          </Title>
        </styles.spacing.Padding>
        <VoteList>
          {options.map((option) => (
            <VoteListItem key={option.id}>
              <VoteCheckbox checked={false}/>
              <div>{option.title}</div>
            </VoteListItem>
          ))}
        </VoteList>
      </div>
    )
  }
}

const Avatar = styled('img')`
  display: block;
  border-radius: 50%;
  height: 36px;
  width: 36px;
`

const VoteName = styled('span')`
  display: inline-block;

  ${(props: { theme: Theme }) => css`
    color: ${props.theme.colorTextForeground};
  `}
`

const VoteList = styled('ul')`
  list-style-type: none;
`

const VoteListItem = styled('li')`
  align-items: flex-start;
  display: flex;
  font-size: 13px;
  margin-bottom: 4px;

  ${(props: { theme: Theme }) => css`
    color: ${props.theme.colorTextForeground};
  `}
`

const VoteCheckbox = styled(Checkbox)`
  padding-right: 10px;
  margin-top: 4px;
  line-height: 0;
`

const VoteTitle = styled('div')`
  color: #aaaaaa;
`
