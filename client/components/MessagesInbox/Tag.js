// @flow

import React from 'react'
import styled from 'react-emotion'

type Props = {
  children: any,
}

export default class Tag extends React.PureComponent<Props> {
  render() {
    return (
      <Panel>
        {this.props.children}
      </Panel>
    )
  }
}

const Panel = styled('div')`
  background-color: #f5f5f5;
  border-radius: 3px;
  padding: 3px 9px;
  font-size: 11px;
`
