
// @flow

import React from 'react'
import styled, { css } from 'react-emotion'
import Action from './Action'
import type { MainTheme } from '@app/styles/main-theme'

type Props = {}

export default class WideSearch extends React.PureComponent<Props> {
  render() {
    return (
      <div className={wideSearchClass}>
        <Input type="text" />
        <Action></Action>
      </div>
    )
  }
}

const Input = styled('input')`
  ${(props: { theme: MainTheme }) => css`
    background-color: ${props.theme.wideSearchInputBackgroundColor}
  `}
`

const wideSearchClass = css`
  display: flex;
`
