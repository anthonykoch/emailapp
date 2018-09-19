// @flow

import Head from 'next/head'
import normalize from 'normalize.css'

type Props = {
  title?: string,
  children: any
}

const Main = ({ children, title }: Props) => {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta content="width=device-width,initial-scale=1" name="viewport" />
        <meta content="A fake email app" name="description" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700|Nunito+Sans:300,400,400i,600,700" rel="stylesheet" />

        <title>{title}</title>
      </Head>
      <style jsx global>{normalize}</style>
      <style jsx global>{`

        @import 'variables';

        *,
        *:before,
        *:after {
          box-sizing: border-box;
          padding: 0;
          margin: 0;
        }
        button {
          color: #999;
          display: inline-block;
          font-size: 1em;
        }

        body {
          font-family: $app-font-family-1;
          font-size: 1rem;
          line-height: 1.7;
          min-height: 100vh
        }
      `}</style>
      {children}
    </div>
  )
}

export default Main
