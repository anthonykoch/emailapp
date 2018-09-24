// @flow

import React from 'react'
import { css } from 'react-emotion'

import WideSearch from '@app/components/WideSearch/WideSearch'
import UserProfilePreview from '@app/components/UserProfilePreview/UserProfilePreview'
import Logo from './Logo'
import SetAlert from './SetAlert'

import * as styles from '@app/styles/utilities/size'

// import type { Theme } from '@app/styles/variables'

type Props = {
  user: {
    // TODO: Figure out how to declare global types with flow
    firstName: string,
    lastName: string,
  }
}

export default class DashboardHeader extends React.PureComponent<Props> {
  render() {
    return (
      <div class={dashboardHeaderPanelClass}>
        <div className={styles.siteMaxWidth}>
          <div className={dashboardHeaderContainerClass}>
            <div
              className={logoContainerClass}
            >
              <Logo />
            </div>
            <WideSearch
              className={wideSearchClass}
            />
            <div
              className={dashboardRightClass}
            >
              <div>
                <SetAlert />
              </div>
              <UserProfilePreview
                user={this.props.user}
                className={css`

                `}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const dashboardRightClass = css`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex: 1;
  padding: 0 20px;
`

const logoContainerClass = css`
  width: 300px;
  padding: 0 20px;
  text-align: center;
`

const wideSearchClass = css`
  width: 690px;
  max-width: 100%;
`

const dashboardHeaderPanelClass = css`
  background-color: white;
  box-shadow: 0 2px 6px -1px rgba(0, 0, 0, 0.08);
  padding: 20px 0;
`
const dashboardHeaderContainerClass = css`
  align-items: center;
  display: flex;
`
