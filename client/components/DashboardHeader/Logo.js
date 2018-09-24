// @flow

import React from 'react'
import styled, { css } from 'react-emotion'
import type { Theme } from '@app/styles/variables'

export default class Logo extends React.PureComponent<{}> {
  render() {
    return (
      <LogoText>
        BOARDASH
      </LogoText>
    )
  }
}

const LogoText = styled('div')`
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 3px;

  ${(props: { theme: Theme }) => css`
    color: ${props.theme.logoForeground}
  `}
`
