// @flow

import React from 'react'
import { css } from 'react-emotion'

import WideSearch from '@app/components/WideSearch/WideSearch'
import UserProfilePreview from '@app/components/UserProfilePreview/UserProfilePreview'

type Props = {
  user: {}
}

export default class DashboardHeader extends React.PureComponent<Props> {
  render() {
    return (
      <div>
        <div className={dashboardHeaderContainerClass}>
          <div className="DashboardHeader-logo">
          </div>
          <WideSearch />
          <div className="SetAlert">
          </div>
          <UserProfilePreview user={this.props.user} />
        </div>
      </div>
    )
  }
}

const dashboardHeaderContainerClass = css`
  display: flex;
`
