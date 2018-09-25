// @flow

import React from 'react'
import styled, { css } from 'react-emotion'

import type { Theme } from '@app/styles/variables'

type Props = {
  children: any,
  active?: boolean,
  last?: boolean,
  first?: boolean,
  onToggle?: Function,
}

type State = {
  isActive: boolean,
}

export default class FilterAction extends React.Component<Props, State> {
  state = {
    isActive: false,
  }

  onClick = () => {
    this.setState({
      isActive: !this.state.isActive,
    }, () => {
      this.props.onToggle && this.props.onToggle(this.state.isActive)
    })
  }

  render() {
    return (
      <Filter
        active={this.props.active}
        last={this.props.last}
        first={this.props.first}
        onClick={this.onClick}
      >
        {this.props.children}
      </Filter>
    )
  }
}

const Filter = styled('button')`
  border: 0;
  border-style: solid;
  border-color: #cacaca;
  border-bottom-width: 1px;
  border-left-width: 1px;
  border-top-width: 1px;
  background-color: transparent;
  cursor: pointer;
  transition-duration: 250ms;
  transition-property: background-color, border-color;
  font-size: 12px;
  outline: 0;
  padding: 10px 26px;

  ${(props: {
    theme: Theme,
  } & Props) => css`
    background-color: ${props.theme.filterActionBackground};

    ${props.last && css`
      border-top-right-radius: 2.5px;
      border-bottom-right-radius: 2.5px;
      border-right-width: 1px;
    `}

    ${props.first && css`
      border-top-left-radius: 2.5px;
      border-bottom-left-radius: 2.5px;
    `}

    ${props.active && css`
      background-color: ${props.theme.filterActionBackgroundActive};
      box-shadow: 0 5px 18px -1px rgba(0,0,0,0.16);
      border-color: ${props.theme.filterActionBorderColorActive};
      color: white;
    `}
  `}

  &:only-child {
    border-width: 1px;
    border-radius: 2.5px;
  }
`
