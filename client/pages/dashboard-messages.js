// @flow

import React from 'react'
import { observer } from 'mobx-react'
import styled, { css, cx } from 'react-emotion'

import StoreContext from '@app/context/store'
import Page from '@app/layouts/dashboard'
import Heading from '@app/components/Heading/Heading'
import Filters from '@app/components/Filters/Filters'

import styles from '@app/styles/utilities'

import type { User } from '@root/types'
import type { Theme } from '@app/styles/variables'


type Props = {
  user: User,
  theme: Theme,
}

// https://dribbble.com/shots/3903437-Dashboard-message/attachments/888558
// https://dribbble.com/shots/3781660-Dashboard-Meeting/attachments/851963

@observer
class Index extends React.Component<Props> {
  allFilter: any;
  filters: any;

  constructor() {
    super()

    this.allFilter = [
      {
        children: 'All',
        active: true,
        toggle: this.onFilterChange,
      },
    ]

    this.filters = [
      {
        children: 'Unread',
        first: true,
        // TODO: onToggle() {}
      },
      {
        children: 'Important',
        last: true,
        // on
      },
    ]
  }

  onFilterChange = () => {

  }

  render() {
    return (
      <Page
        middle={
          <div>
            <Header>
              <Heading level="1" theme={this.props.theme}>
                Messages
              </Heading>

              <div className={cx(styles.display.flex)}>
                <styles.spacing.Margin right="2">
                  <Filters items={this.allFilter}></Filters>
                </styles.spacing.Margin>
                <Filters items={this.filters}></Filters>
              </div>
            </Header>
          </div>
        }
        right={
          <IdkWhatThisIs></IdkWhatThisIs>
        }
      >
        <StoreContext.Consumer>
          {({ store }) => (
            <div>
              hey!
            </div>
          )}
        </StoreContext.Consumer>
      </Page>
    )
  }
}

const Header = styled('header')`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const IdkWhatThisIs = styled('div')`
  border-radius: 50%;
  border-bottom: 0;
  bottom: 30px;
  box-shadow: 0 25px 50px -4px rgba(0, 0, 0, 0.25);
  height: 54px;
  position: fixed;
  right: 30px;
  width: 54px;

  &:before {
    color: white;
    content: '+';
    font-size: 28px;
    display: block;
    line-height: 1;
    position: absolute;
    left: 50%;
    top: 48%;
    transform: translate(-50%, -50%);
  }

  ${(props: { theme: Theme }) => css`
    background-color: ${props.theme.filterActionBackgroundActive};
  `}
`

export default Index
