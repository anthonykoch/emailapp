// @flow

import RequestError from '@feathersjs/errors'

import { Validator } from '@server/hooks/validate'

import type { IValidator, ValidationResult } from '@root/types'

export class Find extends Validator implements IValidator {
  rules = {
    userid: 'numeric',
    limit: 'numeric',
    offset: 'numeric',
  }

  messages = {}

  pick(context: any) {
    console.log(context.params);

    return {
      userid: context.params.route.userid,
      limit: context.params.query?.limit,
      offset: context.params.query?.offset,
    }
  }

  check({ errors, isValid }: ValidationResult) {
    if (!isValid) {
      if (errors.userid) {
        return new RequestError.BadRequest({
          message: 'Invalid <userid>',
        })
      } else {
        return new RequestError.BadRequest({
          message: `Invalid params ${Object.keys(errors).map(key => `'${key}'`).join(', ')}`,
        })
      }
    }
  }
}
