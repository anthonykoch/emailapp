// @flow

import React from 'react'
import styled, { css } from 'react-emotion'

type Props = {
  type: 'category' | 'search'
}

export default class Action extends React.PureComponent<Props> {
  renderSearch() {
    return (
      <div>
        <img src="" alt="" />
      </div>
    )
  }
  renderCategorySelector() {
    return (
      <div></div>
    )
  }


  renderContent() {
    switch (this.props.type) {
      case 'category':
        return this.renderCategorySelector()
      case 'search':
        return this.renderSearch()
    }
  }

  render() {
    return (
      <Button>
        {this.renderContent()}
      </Button>
    )
  }
}

const Button = styled.button`
  ${(props) => css`
    background-color: ${props.theme.wideSearchActionBackgroundColor}
  `}
  border: 0;
  outline: 0;
`
