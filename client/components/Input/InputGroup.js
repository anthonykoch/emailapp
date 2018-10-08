// @flow

import React from 'react'
import styled, { css } from 'react-emotion'

import styles from '@app/styles/utilities'

type InputSize = "large" | "default"

type Props = {
  icon?: any,
  size?: InputSize,
  refs?: {
    input?: Function,
  },
  label: string,
  inputProps?: {},
  labelProps?: {
    name: string,
  },
  errors?: ?Array<string>
}

export default class InputGroup extends React.Component<Props> {
  render() {
    const {
      errors=[],
      label,
      size='default',
      icon,
      labelProps,
      inputProps,
    } = this.props

    return (
      <div>
        <div>
          <styles.spacing.Margin bottom="1">
            <Label
              size={size}
              htmlFor={labelProps?.name}
              {...labelProps}
            >
              {label}
            </Label>
          </styles.spacing.Margin>
          <Control>
            <Input
              type="text" {...inputProps}
              hasIcon={icon != null}
              size={size}
            />
            <ControlIcon>
              {icon}
            </ControlIcon>
          </Control>
        </div>
        <ErrorList>
          {(errors || []).map((error, index) => (<Error key={index}>{error}</Error>))}
        </ErrorList>
      </div>
    )
  }
}


const blue1 = '#373bff'
const blue2 = '#b8b8cd'
const inputBorderColor = blue2

const Label = styled('label')`
  color: #020202;
  font-weight: 600;
  font-size: 14px;

  ${(props: { size: InputSize }) => css`
    ${props.size === 'large' && css`
      font-size: 16px;
    `}
  `}
`

export const ErrorList = styled('ul')`
  list-style-type: none;
`

export const Error = styled('li')`
  color: #ff4646;
  font-size: 12px;
`

const Control = styled('div')`
  position: relative;
`

const ControlIcon = styled('div')`
  & > * {
    fill: ${blue2};
    left: 14px;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    width: 22px;
  }
`

const Input = styled('input')`
  background-color: transparent;
  border: 1px solid ${inputBorderColor};
  border-radius: 4px;
  caret-color: #373bff;
  display: block;
  font-size: 13px;
  font-weight: 600;
  outline: 0;
  padding: 12px 0 12px 20px;
  transition: border-color 170ms;
  width: 100%;

  ${(props: { hasIcon: boolean, size: InputSize }) => css`
    ${props.hasIcon && css`
      padding: 12px 0 12px 48px;
    `}

    ${props.hasIcon && props.size === 'large' && css`
      padding: 20px 0 20px 48px;
    `}

    ${props.size === 'large' && css`
      font-size: 14px;
    `}
  `}

  & + * svg {
    transition: fill 170ms;
  }

  &:active,
  &:focus {
    border-color: ${blue1};

    & + * svg {
      fill: ${blue1};
    }
  }

  &::placeholder {
    color: ${blue2}
  }
`
