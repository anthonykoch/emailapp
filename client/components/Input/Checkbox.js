// @flow

import React from 'react'

import styled, { css } from 'react-emotion'

type Props = {
  checked?: boolean,
  defaultChecked: boolean,
  onChange?: Function,
}

type State = {
  isChecked: boolean,
}

export default class Checkbox extends React.PureComponent<Props, State> {
  state = {
    isChecked: false,
  }

  onChange = () => {
    this.props.onChange && this.props.onChange(this.state.isChecked)
  }

  onIndiciatorClick = () => {
    console.log(this.state);

    this.setState({
      isChecked: !this.state.isChecked,
    }, () => this.onChange())
  }

  setChecked = (isChecked: boolean) => {
    this.setState({ isChecked })
  }

  render() {
    const { defaultChecked } = this.props

    return (
      <Container>
        <Input
          type="checkbox"
          checked={this.state.isChecked}
          defaultChecked={defaultChecked}
          onChange={this.onChange}
        />
        <Indicator onClick={this.onIndiciatorClick} />
      </Container>
    )
  }
}

const isIndicatorChecked = css`
  border-color: #008fff;
  background-color: #008fff;
`

const Container = styled('span')`
  display: inline-block;
`

const Indicator = styled('span')`
  background-color: transparent;
  border: 2px solid rgba(0,0,0,0.2);
  border-radius: 3px;
  display: block;
  height: 16px;
  position: relative;
  transition-duration: 250ms;
  transition-property: border-color, background-color;
  width: 16px;

  &:after {
    background-color: white;
    content: '';
    display: block;
    border-radius: 50%;
    height: 3px;
    left: 50%;
    transition: opacity 300ms;
    opacity: 0;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 3px;
  }
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

const RealInput = styled('input')`
  visiblity: hidden;
`
