// @flow

import React from 'react'
import styled, { css } from 'react-emotion'

type Props = {
  showing?: boolean,
  first: any,
  second: any,
}

export default class AnimatedDualOverlay extends React.Component<Props> {
  render() {
    const { showing } = this.props

    return (
      <Grid>
        <Column first show={showing}>
          {this.props.first}
        </Column>
        <Column second show={showing}>
          {this.props.second}
        </Column>
      </Grid>
    )
  }
}

const loginWidth = 560

const Grid = styled('div')`
  display: flex;
  height: 100vh;
  left: 0;
  top: 0;
  position: fixed;
  width: 100vw;
`

// background-image: url(https://images.unsplash.com/photo-1515462277126-2dd0c162007a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b9b8ca05b253e33c9009832bca8d68c0&auto=format&fit=crop&w=2735&q=80);
// background-image: url(https://images.unsplash.com/photo-1533693706533-57740e69765d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fbb6a5fd4263ce81a83c67975d66cd60&auto=format&fit=crop&w=2850&q=80);

const Column = styled('div')`
  flex-basis: auto;
  height: 100vh;
  transition: opacity 600ms, transform 1200ms cubic-bezier(0.645, 0.045, 0.355, 1);
  transform: translate3d(0, 0, 0);
  opacity: 1;

  ${(props: { first: boolean, second: boolean, show: boolean }) => css`
    ${!props.show && props.first && css`
      opacity: 0;
    `}

    ${!props.show && props.second && css`
      transform: translate3d(100%, 0, 0);
      opacity: 0;
    `}

    ${props.first && css`
      background-color: #ffffff;
      min-width: ${loginWidth}px;
      width: ${loginWidth}px;
    `}

    ${props.second && css`
      background-color: #efeee7;
      background-image: url(https://images.unsplash.com/photo-1529910173308-89b53ef12f55?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=612d92c8fe51ecfd44faa4d8d4324907&auto=format&fit=crop&w=2869&q=80);
      background-position: center;
      background-size: cover;
      flex: 1;
      position: relative;
      z-index: 1;

      &:before {
        background-image: linear-gradient(to bottom, black, transparent);
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
      }
    `}
  `}
`
