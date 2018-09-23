
import React from 'react'

import { css } from 'react-emotion'

const WideSearch = () => {
  const wideSearchClass = css``

  const inputClass = css`
    background-color: hotpink;
  `

  const actionClass = css``

  // ({ theme }) => theme.wideSearchInputBackgroundColor
  return (
    <div className={wideSearchClass}>
      <div className={inputClass}></div>
      <div className={actionClass}></div>
    </div>
  )
}

const DashboardHeader = (props) => (

  <div>
    <div className="DashboardHeader">
      <div className="DashboardHeader-container">
        <div className="DashboardHeader-logo">
        </div>
        <WideSearch />
        <div className="SetAlert">
        </div>
        <div className="Profile">
          <div className="Profile-avatar"></div>
          <div className="Profile-name"></div>
          <div className="Profile-action"></div>
        </div>
      </div>
    </div>
  </div>
)

export default DashboardHeader
