// @flow

import React from 'react'
import styled, { css } from 'react-emotion'
import { Transition } from 'react-transition-group'

import styles from '@app/styles/utilities'
import InviteNotification from './InviteNotification'
import { SectionPanel } from './Section'
import Vote from './Vote'
import IconClose from '@app/components/Icon/IconClose'

import type { Theme } from '@app/styles/variables'

type Props = {
  open: boolean,
  onRequestClose?: Function,
}

const SidebarTransition = (props) => {
  const { in: inProp, children, ...rest } = props
  const duration = 300

  const defaultStyle = {
    transitionProperty: 'opacity transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'ease-in-out',
    opacity: 0,
  }

  const transitionStyles = {
    entering: {
      opacity: 0,
      transform: 'translate(100%, 0)',
    },
    entered: {
      opacity: 1,
      transform: 'translate(0%, 0)',
    },
  }

  return (
    <Transition
      in={inProp}
      timeout={{ enter: 0, exit: duration }}
      {...rest}
    >
      {(state) => (
        <Dimension style={{ ...defaultStyle, ...transitionStyles[state] }}>
          {children}
        </Dimension>
      )}
    </Transition>
  )
}

export default class DetailsSidebar extends React.PureComponent<Props> {
  onButtonCloseClick = () => {
    this.props.onRequestClose && this.props.onRequestClose()
  }

  render() {
    const { open } = this.props

    return (
      <SidebarTransition
        in={open}
        unmountOnExit
      >
        <Panel>
          <Header>
            <HeaderTitle>Details</HeaderTitle>
            <CloseButton onClick={this.onButtonCloseClick}>
              <CloseIcon></CloseIcon>
            </CloseButton>
          </Header>
          <SectionPanel>
            <InviteNotification></InviteNotification>
          </SectionPanel>
          <SectionPanel>
            <Vote open={true} options={undefined}></Vote>
          </SectionPanel>
        </Panel>
      </SidebarTransition>
    )
  }
}


const Header = styled('div')`
  align-items: center;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  text-align: right;
`

const CloseButton = styled('button')`
  ${styles.reset.button}
  align-items: center;
  background-color: #e9e9e9;
  cursor: pointer;
  display: flex;
  height: 45px;
  justify-content: center;
  transition: background-color 300ms;
  width: 45px;

  &:hover,
  &:active,
  &:focus {
    background-color: #ff6d6d;

    svg {
      fill: #e9e9e9;
    }
  }
`

const HeaderTitle = styled('h2')`
  font-size: 15px;
  font-weight: 600;

  ${(props: { theme: Theme }) => css`
    color: ${props.theme.colorTextForeground};
  `}
`

const CloseIcon = styled(IconClose)`
  fill: #444;
  width: 20px;
  transition: fill 300ms;
`

const Dimension = styled('div')`
  position: fixed;
  top: 0;
  right: 0;
  width: 310px;
  height: 100vh;
`

const Panel = styled('div')`
  background-color: white;
  box-shadow: 0 6px 30px -4px rgba(0, 0, 0, 0.2);
  height: 100%;
  width: 100%;
`
