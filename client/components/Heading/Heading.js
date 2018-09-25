// @flow

import { type ComponentType } from 'react'
import styled, { css } from 'react-emotion'

import type { Theme } from '@app/styles/variables'

const types = {
  '1': {
    'font-size': '28px',
  },
}

type HeadingLevel = 1 | '1'

type Props = {
  theme: Theme,
  level: HeadingLevel,
}

const Heading: ComponentType<Props> = styled('h2')`
  font-weight: 400;
  padding: 0;
  margin: 0;

  ${(props: Props) => css`
    color: ${props.theme.colorTextForeground};
    ${css(types[props.level])}
  `}
`
export default Heading
