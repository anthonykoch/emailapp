// @flow

import React, { type Node } from 'react'
import styled, { cx, css } from 'react-emotion'

import styles from '@app/styles/utilities'

// import type { Theme } from '@app/styles/variables'

type Props = {
  children: any,
  type: 'ghost-light' | 'light',
  icon?: ?Node,
  className?: string,
}

export default class Button extends React.PureComponent<Props> {
  render() {
    const { type } = this.props

    return (
      <Action className={cx(this.props.className, {
        [isGhostLightClass]: type === 'ghost-light',
        [isLightClass]: type === 'light',
      })}>
        {this.props.icon
          ? (
            <Container>
              <span>{this.props.icon}</span>
              <span>{this.props.children}</span>
            </Container>
          )
          : this.props.children}
      </Action>
    )
  }
}

const Action = styled('button')`
${styles.reset.button}
font-size: 14px;
user-select: none;
`

// NOTE: We don't set the button to display flex because of a
//       bug with `display: flex` on button element
const Container = styled('span')`
  display: flex;
  align-items: center;
`

const isLightClass = css`
  background-color: white;
  border-radius: 3px;
  color: #4d4d4d;
  font-size: 12px;
  font-weight: 600;
  padding: 7px 26px;
`

const isGhostLightClass = css`
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 3px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 11px;
  font-weight: 600;
  padding: 10px 26px;
`
