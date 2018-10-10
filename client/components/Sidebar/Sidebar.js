// @flow

import React from 'react'
import styled, { css } from 'react-emotion'

import { Link } from '@app/routes'
import { withActiveClass } from '@app/core/util'

import type { Theme } from '@app/styles/variables'
import type { User, SidebarLink as TSidebarLink } from '@root/types'

type Props = {
  user: User,
  links: TSidebarLink[],
}

export default class Sidebar extends React.PureComponent<Props> {
  renderLink(link: TSidebarLink) {
    return (
      <Link
        route={link.route}
        href={link.href}
        key={link.id}
        passHref
      >
        <SidebarLink>
          <SidebarLinkIcon>{link.icon}</SidebarLinkIcon>
          <SidebarLinkContent>{link.children}</SidebarLinkContent>
        </SidebarLink>
      </Link>
    )
  }

  render() {
    const { user } = this.props

    // Just to make things simple right now...
    // $FlowFixMe

    return (
      <SidebarContainer>
        <SidebarPanel>
          <SidebarGreeting>
            <div>
              <img className={sidebarWelcomeAvatar} src={user.profileImage} alt="" />
            </div>
            <div>
              <SidebarWelcome>Welcome {this.props.user.firstName}</SidebarWelcome>
              <SidebarRole>{this.props.user.role}</SidebarRole>
            </div>
          </SidebarGreeting>
          {this.props.links.map((link) => this.renderLink(link))}
          <Logout>
            <svg className={iconLogoutClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M380.4 111.7c-3.3-2.8-7.5-4.3-11.8-4.3-5.3 0-10.4 2.3-13.8 6.4-3.2 3.7-4.7 8.4-4.3 13.3.4 4.8 2.7 9.3 6.4 12.4 34.8 29.5 54.8 72.3 54.8 117.4 0 85.4-69.8 154.8-155.6 154.8s-155.6-69.5-155.6-154.8c0-45.2 20-88 54.8-117.4 3.7-3.1 6-7.5 6.4-12.4.4-4.8-1.1-9.6-4.3-13.3-3.5-4-8.5-6.4-13.8-6.4-4.3 0-8.5 1.5-11.8 4.3C88.7 148.1 64 201 64 256.8 64 362.2 150.1 448 256 448s192-85.8 192-191.2c0-55.8-24.7-108.7-67.6-145.1z"/><path d="M256.9 274.5c10.2 0 18.5-8.3 18.5-18.5V82.5c0-10.2-8.3-18.5-18.5-18.5s-18.5 8.3-18.5 18.5V256c0 10.2 8.3 18.5 18.5 18.5z"/></svg>
            <Link route="/logout" passHref>
              <LogoutText>Logout</LogoutText>
            </Link>
          </Logout>
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

const SidebarLink = withActiveClass(styled('a')`
  border-left: 2px solid transparent;
  display: block;
  font-size: 14px;
  padding: 14px 20px;
  text-decoration: none;

  &:link,
  &:visited {
    ${(props: { theme: Theme }) => css`
      color: ${props.theme.sidebarLinkForeground}
    `}
  }

  ${props => css`
    ${props.isActiveRoute && css`
      background-color: #f4faff;
      border-left-color: #008fff;
    `}
  `}
`)

const SidebarLinkIcon = styled('span')`
  margin-right: 30px;
`

const SidebarLinkContent = styled('span')``

const SidebarContainer = styled('div')`
  height: 100%;
`

const SidebarPanel = styled('div')`
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.08);
  border-radius: 3px;
  background-color: white;
  height: 100%;
`

const Logout = styled('div')`
  align-items: center;
  display: flex;
  text-align: center;
  justify-content: center;
  width: 100%;
`

const LogoutText = styled('a')`
  color: #37434e;
  font-size: 14px;
  padding: 20px 0 20px 6px;
  text-decoration: none;
`

const iconLogoutClass = css`
  width: 17px;
`
