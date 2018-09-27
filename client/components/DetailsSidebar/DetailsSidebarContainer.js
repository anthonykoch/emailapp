// @flow

import React from 'react'

import DetailsSidebar from '@app/components/DetailsSidebar/DetailsSidebar'

// import { users } from '@app/data'

type Props = {
  defaultOpen: boolean,
}

type State = {
  isOpen: boolean,
}

export default class DetailsSidebarContainer extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super()

    this.state = {
      isOpen: props.defaultOpen,
    }
  }

  show = () => {
    this.setState({ isOpen: true })
  }

  hide = () => {
    this.setState({ isOpen: false })
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    return (
      <DetailsSidebar
        open={this.state.isOpen}
        onRequestClose={this.hide}
      />
    )
  }
}
