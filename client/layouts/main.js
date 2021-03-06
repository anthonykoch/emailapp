// @flow

import React from 'react'
import Head from 'next/head'
import { injectGlobal } from 'react-emotion'
import { ThemeProvider } from 'emotion-theming'
import theme from '@app/styles/main-theme'

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
  font-family: ${theme.font1};
  font-size: 1rem;
  line-height: 1.7;
  min-height: 100vh;
  text-rendering: geometricPrecision;
  width: 100%;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`

export default function Main({ children, title }: Props) {
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
        <div>
          {children}
        </div>
      </ThemeProvider>
    </div>
  )
}
