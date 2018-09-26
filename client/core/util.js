// @flow

import React from 'react'
import { withRouter } from 'next/router'

import routes from '@app/routes'

type Props = {
  children?: any,
  activeClassName?: string,
  className?: string,
  to?: string,
  href?: string,
  params?: {},
  exact?: boolean,
  pass?: {},
}

export const stripEndSlash = (pathname: string) => pathname.replace(/\/+$/, '')

/**
 * The first child of this class must be a <a></a> and not a styled('a') component
 */
export const withActiveClass = (Component: any) => {
  const ActiveRoute = withRouter((props: Props) => {
    const {
      exact=false,
      to,
      children,
      ...rest
    } = props

    // $FlowFixMe
    const { router } = props // eslint-disable-line

    const activePath =
      exact
        ? router.asPath
        : stripEndSlash(router.asPath)

    let isActiveRoute = false

    if (props.href != null) {
      // It's active when the href passes equals the active pathname
      isActiveRoute = activePath === (exact ? props.href : stripEndSlash(props.href))
    } else if (to != null) {
      // TODO: This should really match against params as well, but for now we'll
      //       just check against pathnames

      const route = routes.findByName(to)

      isActiveRoute = route && route.pattern === activePath
    }

    // console.log(activePath, router.asPath, { isActiveRoute })

    // console.log(to, isActiveRoute);

    return (
      <Component isActiveRoute={isActiveRoute} {...rest}>{children}</Component>
    )
  })

  return ActiveRoute
}
