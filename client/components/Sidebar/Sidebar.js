// @flow

import React from 'react'
import styled, { css } from 'react-emotion'
import { Link } from '@app/routes'

// $FlowFixMe
import profileImage from '@app/images/profile-image.jpg'

import type { Theme } from '@app/styles/variables'

type sidebarLink = {
  children: any,
  to: {},
  icon: any,
}

type Props = {
  user: {
    firstName: string,
    role: string,
  },
  links: sidebarLink[],
}

export default class Sidebar extends React.PureComponent<Props> {
  renderLink(link: sidebarLink) {
    return (
      <Link
        {...link.to}
        key={link.id}
      >
        <SidebarLink>
          <SidebarLinkIcon>{link.icon}</SidebarLinkIcon>
          <SidebarLinkContent>{link.children}</SidebarLinkContent>
        </SidebarLink>
      </Link>
    )
  }

  render() {
    return (
      <SidebarContainer>
        <SidebarPanel>
          <SidebarGreeting>
            <div>
              <img className={sidebarWelcomeAvatar} src={profileImage} alt="" />
            </div>
            <div>
              <SidebarWelcome>Welcome {this.props.user.firstName}</SidebarWelcome>
              <SidebarRole>{this.props.user.role}</SidebarRole>
            </div>
          </SidebarGreeting>
          {this.props.links.map((link) => this.renderLink(link))}
        </SidebarPanel>
      </SidebarContainer>
    )
  }
}

const sidebarWelcomeAvatar = css`
  border-radius: 6px;
  display: block;
  height: 33px;
  margin-right: 20px;
  width: 33px;
`

const SidebarWelcome = styled('div')`
  font-size: 14px;

  ${props => css`
    color: ${props.color6}
  `}
`

const SidebarRole = styled('div')`
  color: #bbb;
  font-size: 11px;
`

const SidebarGreeting = styled('div')`
  align-items: center;
  display: flex;
  padding: 20px;
  width: 100%;

  ${(props: { theme: Theme }) => css`
    border-bottom: 1px solid ${props.theme.colorGrayscale2}
  `}
`

const SidebarLink = styled('span')`
  display: block;
  font-size: 14px;
  padding: 20px 20px;
  text-decoration: none;

  &:link,
  &:visited {
    ${(props: { theme: Theme }) => css`
      color: ${props.theme.sidebarLinkForeground}
    `}
  }
`

const SidebarLinkIcon = styled('span')`
  margin-right: 30px;
`

const SidebarLinkContent = styled('span')`

`

const SidebarContainer = styled('div')`
  height: 100%;
`

const SidebarPanel = styled('div')`
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.08);
  border-radius: 3px;
  background-color: white;
  height: 100%;
`


