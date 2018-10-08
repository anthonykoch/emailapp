// @flow

import _ from 'lodash'

export default (items: string[]) => (context: any) => {
  console.log(context)

  for (const path of items) {
    _.set(context, path, undefined)
  }

  return context
}
