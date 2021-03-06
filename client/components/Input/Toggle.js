// @flow

import React from 'react'
import styled, { css } from 'react-emotion'

import type { Theme } from '@app/styles/variables'

type Props = {
  inputProps?: Object,
  checked?: boolean,
  onChange?: Function,
  className?: string,
}

type State = {
  isChecked: boolean,
}

export default class Checkbox extends React.PureComponent<Props, State> {
  constructor({ checked=false }: { checked: boolean }) {
    super()

    this.state = {
      isChecked: checked,
    }
  }

  onChange = () => {
    this.props.onChange && this.props.onChange(this.state.isChecked)
  }

  onIndiciatorClick = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    }, () => this.onChange())
  }

  setChecked = (isChecked: boolean) => {
    this.setState({ isChecked })
  }

  render() {
    const { inputProps, className } = this.props

    return (
      <Container className={className}>
        <Input
          {...inputProps}
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.onChange}
        />
        <IndicatorContainer onClick={this.onIndiciatorClick}>
          <Indicator checked={this.state.isChecked} />
        </IndicatorContainer>
      </Container>
    )
  }
}

const Container = styled('span')`
  display: inline-block;
`

const indicatorSize = 14
const indicatorContainerBorderWidth = 2
const indicatorContainerWidth = (indicatorSize * 2) + (indicatorContainerBorderWidth * 2)

const Indicator = styled('span')`
  background-color: white;
  border-radius: 100%;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);
  cursor: pointer;
  display: block;
  height: ${indicatorSize}px;
  position: relative;
  transition-duration: 210ms;
  transition-property: transform;
  width: ${indicatorSize}px;

  ${(props: { checked: boolean, theme: Theme }) => css`
    ${props.checked && css`
      transform: translate(${indicatorSize}px, 0);
    `}
  `}
`

const IndicatorContainer = styled('div')`
  background-color: #e9e9e9;
  border-radius: 1000px;
  box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  display: block;
  padding: ${indicatorContainerBorderWidth}px;
  transition: background-color 210ms;
  width: ${indicatorContainerWidth}px;
`

const Input = styled('input')`
  z-index: -1;
  position: absolute;

  &:checked + * {
    border-color: #008fff;
    background-color: #008fff;

    &:after {
      opacity: 1;
    }
  }
`
