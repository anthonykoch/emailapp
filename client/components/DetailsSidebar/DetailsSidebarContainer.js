// @flow

import React from 'react'
import { observer } from 'mobx-react'

import DetailsSidebar from '@app/components/DetailsSidebar/DetailsSidebar'

import { withStore } from '@app/context/store'

import type { IRootStore } from '@root/types'

type Props = {
  defaultOpen?: boolean,
  store: IRootStore,
}

type State = {
  isOpen: boolean,
}

export default withStore(observer(
  class DetailsSidebarContainer extends React.Component<Props, State> {
    constructor(props: Props) {
      super()

      this.state = {
        isOpen: props.defaultOpen == null ? false : props.defaultOpen,
      }
    }

    show = () => {
      this.props.store.meeting.showSidebar()
    }

    hide = () => {
      this.props.store.meeting.hideSidebar()
    }

    render() {
      const { store } = this.props

      return (
        <DetailsSidebar
          open={store.meeting.isSidebarShowing}
          onRequestClose={this.hide}
        />
      )
    }
  })
)
