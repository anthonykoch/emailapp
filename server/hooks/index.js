// @flow

export const status = () => (context: any) => {
  if (Number.isFinite(context.result?.status)) {
    context.statusCode = context.result.status
  }
}

