
// @flow

import React from 'react'
import styled, { css, cx } from 'react-emotion'
import Action from './Action'
import type { Theme } from '@app/styles/variables'

type Props = {
  className: string,
}

export default class WideSearch extends React.PureComponent<Props> {
  render() {
    return (
      <div className={cx(wideSearchClass, this.props.className)}>
        <label
          htmlFor="application-wide-search"
          className={labelClass}
        >
          <Input
            id="application-wide-search"
            name="application-wide-search"
            type="text"
            placeholder="Memed ma dude"
          />
        </label>
        <Action type="search"></Action>
      </div>
    )
  }
}

const labelClass = css`
  flex: 1;
  width: 100%;
`

const Input = styled('input')`
  border: 0;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  font-size: 14px;
  padding: 12px 22px;
  outline: 0;
  width: 100%;

  ${(props: { theme: Theme }) => css`
    background-color: ${props.theme.wideSearchInputBackgroundColor};
  `}

  &::placeholder {
    color: hsl(210, 8%, 62%);
  }
`

const wideSearchClass = css`
  display: flex;
`
