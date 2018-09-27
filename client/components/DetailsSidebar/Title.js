// @flow

import styled, { css } from 'react-emotion'

import type { Theme } from '@app/styles/variables'

export default styled('span')`
  display: inline-block;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.5;

  ${(props: { theme: Theme }) => css`
    color: ${props.theme.colorTextForeground};
  `}
`
