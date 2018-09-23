// @flow

import React from 'react'
import Head from 'next/head'
import { injectGlobal } from 'react-emotion'
import { ThemeProvider } from 'emotion-theming'
import * as vars from '@/styles/variables'

import 'normalize.css'

type Props = {
  title?: string,
  children: any
}

injectGlobal`
*,
*:before,
*:after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  font-family: ${vars.font1};
  font-size: 1rem;
  line-height: 1.7;
  min-height: 100vh
}
`

const theme = Object.assign({}, vars)

const Main = ({ children, title }: Props) => {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta content="width=device-width,initial-scale=1" name="viewport" />
        <meta content="A fake email app" name="description" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <link href="https://fonts.googleapis.com/css?family=Nunito:300,400,400i,600,700" rel="stylesheet" />
        <title>{title}</title>
      </Head>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </div>
  )
}

export default Main
