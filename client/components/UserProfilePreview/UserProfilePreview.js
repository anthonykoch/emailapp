import React from 'react'

export default class UserProfilePreview extends React.PureComponent {
  render() {
    return (
      <div className="Profile">
        <div className="Profile-avatar"></div>
        <div className="Profile-name"></div>
        <div className="Profile-action"></div>
      </div>
    )
  }
}
