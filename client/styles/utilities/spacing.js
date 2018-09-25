// @flow

import React, { type ComponentType } from 'react'
import styled, { css } from 'react-emotion'

import type { Theme, SpacingLevel } from '@app/styles/variables'

export type Directional = {
  top?: SpacingLevel,
  right?: SpacingLevel,
  bottom?: SpacingLevel,
  left?: SpacingLevel,
  x?: SpacingLevel,
  y?: SpacingLevel,
}

export type Spacer = 'margin' | 'padding'

export const mxauto = css`
  margin-left: auto;
  margin-right: auto;
`

// TODO: Breakpointify this bisquit
export const createSpacer = (
  spacer: Spacer,
  tag: 'div' | 'span'
): ComponentType<Directional> => {
  return styled(tag)`
    ${(props: { theme: Theme } & Directional) => css`
      ${props.y ? css`
        ${spacer}-top: ${props.theme.spacing[props.y]};
        ${spacer}-bottom: ${props.theme.spacing[props.y]};
      ` : ''}

      ${props.x ? css`
        ${spacer}-left: ${props.theme.spacing[props.x]};
        ${spacer}-right: ${props.theme.spacing[props.x]};
      ` : ''}

      ${spacer}-top: ${props.top ? props.theme.spacing[props.top] : ''};
      ${spacer}-right: ${props.right ? props.theme.spacing[props.right] : ''};
      ${spacer}-bottom: ${props.bottom ? props.theme.spacing[props.bottom] : ''};
      ${spacer}-left: ${props.left ? props.theme.spacing[props.left] : ''};
    `}
  `
}

export const MarginBlock = createSpacer('margin', 'div')
export const MarginInline = createSpacer('margin', 'span')

export const PaddingBlock = createSpacer('padding', 'div')
export const PaddingInline = createSpacer('padding', 'span')

/**
 * A helper for spacing
 *
 * The number supplied in the direction prop is a multiplier of the base spacing
 *
 * Passing a single directional property (top, left, right, bottom) with
 * x or y will override the values in x and y.
 *
 * @example
 *  <Margin left={1} />
 */
export const Margin = (props: { inline?: boolean } & Directional) => {
  return props.inline ? <MarginInline {...props} /> : <MarginBlock {...props} />
}

export const Padding = (props: { inline?: boolean } & Directional) => {
  return props.inline ? <PaddingInline {...props} /> : <PaddingBlock {...props} />
}
