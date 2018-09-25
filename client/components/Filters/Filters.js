
// @flow

import React from 'react'

import { css } from 'react-emotion'
import FilterAction from './FilterAction'

type Props = {
  items: [{
    children: any,
    active?: boolean,
    first?: boolean,
    last?: boolean,
    onToggle?: Function,
  }],
}

export default class Filters extends React.PureComponent<Props> {
  render() {
    return (
      <div className={filtersClass}>
        {this.props.items.map((item, index) => (
          <FilterAction
            active={item.active}
            last={item.last}
            first={item.first}
            onToggle={item.onToggle}
            key={index}
          >
            {item.children}
          </FilterAction>
        ))}
      </div>
    )
  }
}

const filtersClass = css`
  display: flex;
`
