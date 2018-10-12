// @flow

import React from 'react'

export const AutoFlexGrid = (props: { children: any }) => {
  const children =
    React.Children.toArray(props.children).filter(item => item != null)

  const width = `${(1 / children.length) * 100}%`

  return (
    <div style={{ 'display': 'flex' }}>
      {children.map((child, index) => {
        return (
          <div key={index} style={{ width, flexBasis: 'auto' }}>
            {child}
          </div>
        )
      })}
    </div>
  )
}
