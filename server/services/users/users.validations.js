// @flow

import RequestError from '@feathersjs/errors'

import { Validator } from '@server/hooks/validate'

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
  rules = {
    username: 'required|min:2|max:80|alpha_num|alpha_dash',
    first_name: 'required|min:1|max:80',
    last_name: 'required|min:1|max:80',
    email: 'required|email|unique_email',
    password: 'required|min:8|max:128|stripped',
  }

  messages = {
    'required.email': 'A valid email is required',
    'email.email': 'A valid email is required',
    'email_available.email': 'This username is already taken',

    'required.first_name': 'Your first name can not be empty',
    'max.first_name': 'Come on, is your name really longer than 80 characters?',

    'required.last_name': 'Your last name can not be empty',
    'max.last_name': 'Really, your last name is longer than 80 characters!??!1/1',

    'required.password': 'You\'ve got to have a password! AAHHHHHHH',
    'min.password': 'Your password must be at least 8 characters',
    'max.password': 'Your password must be no more than 128 characters',
    'stripped.password': 'The password can not begin or end with whitespace',
  }

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
