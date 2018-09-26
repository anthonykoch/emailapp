// @flow

import React from 'react'
import styled, { css } from 'react-emotion'
import { Link } from '@app/routes'

import type { Theme } from '@app/styles/variables'

export default class Logo extends React.PureComponent<{}> {
  render() {
    return (
      <Link href="/" passHref>
        <LogoLink>BOARDASH</LogoLink>
      </Link>
    )
  }
}

const LogoLink = styled('div')`
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 3px;
  text-decoration: none;

  ${(props: { theme: Theme }) => css`
    &:link,
    &:visited {
      color: ${props.theme.logoForeground}
    }
  `}
`
