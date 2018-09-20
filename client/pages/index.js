// @flow

import { observer } from 'mobx-react'

import Page from '@/layouts/main'
import StoreContext from '@/context/store'

@observer
class Index extends React.Component {
  render() {
    return (
      <Page>
        <StoreContext.Consumer>
          {({ store }) => (
            <div>
              <img src={require('@/images/plane.svg')} alt="plane!" />
            </div>
          )}
        </StoreContext.Consumer>
      </Page>
    )
  }
}

export default Index
