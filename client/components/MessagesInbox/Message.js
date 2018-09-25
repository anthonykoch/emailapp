// @flow

import React from 'react'
import styled, { css } from 'react-emotion'

import styles from '@app/styles/utilities'
import IconKebabY from '@app/components/Icon/IconKebabY'
import Checkbox from '@app/components/Input/Checkbox'
import Tag from './Tag'

// $FlowFixMe
import profileImage from '@app/images/profile-image.jpg'

// import type { Theme } from '@app/styles/variables'
import type { Message as TMessage } from '@root/types'

type Props = {
  message: TMessage,
}

export default class Message extends React.PureComponent<Props> {
  render() {
    const { message } = this.props

    return (
      <Panel>
        <Container>
          <CheckboxContainer>
            <Checkbox defaultChecked={false} />
          </CheckboxContainer>
          <Avatar>
            <AvatarImage src={profileImage} alt="awd" />
          </Avatar>
          <From>
            {message.from.firstName}{' '}
            {message.from.lastName}
          </From>
          <TagList>
            {message.tags.map((tag, index) => <Tag key={index}>{Tag.name}</Tag>)}
          </TagList>
          <Text className={styles.text.ellipsis}>
            {message.message}
          </Text>
          <More>
            <IconKebabY className={moreIconClass} />
          </More>
        </Container>
      </Panel>
    )
  }
}

const moreIconClass = css`
  fill: #ddd;
  display: inline-block;
  vertical-align: middle;
  width: 28px;
  cursor: pointer;
`

const More = styled('div')`
  padding-left: 30px;
  padding-right: 20px;
`

const Text = styled('div')`
  ${styles.text.overflow}
  color: rgba(0,0,0,0.5);
  font-size: 13px;
  flex: 1;
  width: 100%;
  padding-left: 20px;
`

const Avatar = styled('div')`
  padding-left: 30px;
  padding-right: 30px;
`

const AvatarImage = styled('img')`
  border-radius: 50%;
  display: block;
  height: 40px;
  width: 40px;
`

const TagList = styled('div')`
  display: flex;
  align-items: center;
`

const From = styled('div')`
  font-size: 14px;
  font-weight: 600;
  padding-right: 20px;
  width: 160px;
`

const CheckboxContainer = styled('div')`
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  justify-content: center;
  padding-left: 20px;
`

const Panel = styled('div')`
  background-color: white;
  padding: 16px 0;
  border-bottom: 1px solid #eeeeee;

  &:last-child {
    border-bottom: 0;
  }
`

const Container = styled('div')`
  align-items: center;
  display: flex;
`