// @flow

import RequestError from '@feathersjs/errors'

import type { ValidationResult, IValidator } from '@root/types'

export class Validator {
  check({ errors, isValid }: ValidationResult) {
    if (!isValid) {
      return new RequestError.BadRequest({
        errors,
      })
    }
  }
}

// Runs validations against whatever is picked from the context object
export const validate = function (Verifier: Class<IValidator> | IValidator) {
  return async (context: any) => {
    const verifier =
      typeof Verifier === 'function'
        ? new Verifier()
        : Verifier
    const Validator = context.app.get('validator')
    const validator =
      new Validator(await verifier.pick(context), verifier.rules, verifier.messages)

    const error =
      await new Promise((resolve, reject) => {
        validator.checkAsync(() => resolve({
          errors: {},
          count: 0,
          isValid: true,
        }), () => reject(new Error('Invalid data')))
      })
        .catch(() => ({
          errors: validator.errors.all(),
          count: validator.errorCount,
          isValid: false,
        }))
        .then((validation: ValidationResult) => verifier.check({ ...validation, context }))

    if (error != null) {
      throw error
    }

    if (validator.errorCount > 0) {
      throw new RequestError.BadRequest({
        message: 'Invalid request',
      })
    }
  }
}
