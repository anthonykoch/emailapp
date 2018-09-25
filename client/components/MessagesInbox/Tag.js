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
  padding: 4px 9px;
  font-size: 12px;
`
