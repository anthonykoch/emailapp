// @flow

import Head from 'next/head'

type Props = {
  title?: string
}

const Main = ({ children, title }: Props) => {
  return (
    <Head>
      <meta charset="utf-8" />
      <meta content="width=device-width,initial-scale=1" name="viewport" />
      <meta content="A fake email app" name="description" />
      <meta content="IE=edge" http-equiv="X-UA-Compatible" />
      <title>{title}</title>
    </Head>
    {children}
  )
}

export default Main
