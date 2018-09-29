// @flow

import React, { type ComponentType, type ElementConfig } from 'react'

import type { IRootStore } from '@root/types'

const StoreContext = React.createContext()

// Flow doesn't support typing with decorators, so rip the dream. This shouldn't
// actually be used and is only here for reference, use withStore instead.
export const provide = (Component: ComponentType<>) => {
  return function decorator() {
    const StoreConsumer = (...args) => {
      return (
        <StoreContext.Consumer>
          {/* $FlowFixMe */}
          {(store: IRootStore) => <Component store={store} />}
        </StoreContext.Consumer>
      )
    }

    return <StoreConsumer />
  }
}

// FFS IT FINALLY WORKS. Inject a prop without have to declare it when instantiating a component
// https://flow.org/en/docs/react/hoc/#toc-supporting-defaultprops-with-react-elementconfig
export function withStore<Props: {} & {
  store: IRootStore }, TComponent: ComponentType<Props>>(
  Component: TComponent
): ComponentType<ElementConfig<TComponent>> {
  const WithStore = (props) => (
    //  $FlowFixMe
    <StoreContext.Consumer>
      {/* $FlowFixMe */}
      {(store: IRootStore) => <Component {...props} store={store} />}
    </StoreContext.Consumer>
  )

  return WithStore
}


export default StoreContext
