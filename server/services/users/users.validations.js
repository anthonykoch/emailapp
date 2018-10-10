// @flow

import RequestError from '@feathersjs/errors'

import { Validator } from '@server/hooks/validate'
import { create } from '@app/validations/user'

import type { IValidator, ValidationResult } from '@root/types'

export class Find extends Validator implements IValidator {
  rules = {
    first_name: 'string',
    last_name: 'string',
    email: 'string',
    password: 'string',
  }

  messages = {}

  pick(context: any) {
    return context.params.query
  }
}

export class Create extends Validator implements IValidator {
  rules = create.rules
  messages = create.messages

  pick(context: any) {
    return context.data
  }
}

export class Get extends Validator implements IValidator {
  rules = {
    id: 'numeric',
  }

  messages = {}

  pick(context: any) {
    return {
      id: context.id,
    }
  }

  check({ errors, isValid }: ValidationResult) {
    if (!isValid) {
      return new RequestError.BadRequest({
        message: `Invalid params ${Object.keys(errors).map(key => `'${key}'`).join(', ')}`,
      })
    }
  }
}
