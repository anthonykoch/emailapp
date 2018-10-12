// @flow

import React from 'react'
import styled, { css } from 'react-emotion'
import Head from 'next/head'

import { Router, Link } from '@app/routes'
import styles from '@app/styles/utilities'
import withStore from '@app/hocs/store'

import InputGroup from '@app/components/Input/InputGroup'
import Main from '@app/layouts/main'
import AnimatedDualOverlay from '@app/components/Overlay/AnimatedDualOverlay'

import type { IRootStore } from '@root/types'

type InitialProps = {}

type Props = {
  redirectUrl: string,
  store: IRootStore,
} & InitialProps

type State = {
  isAuthenticated: boolean,
  username: string,
  password: string,
  error: string,
}

class Login extends React.Component<Props, State> {
  onPasswordChange: Function
  onUsernameChange: Function

  state = {
    isAuthenticated: false,
    username: '',
    password: '',
    error: '',
  }

  constructor() {
    super()

    this.onPasswordChange = this.onInputChange.bind(this, 'password')
    this.onUsernameChange = this.onInputChange.bind(this, 'username')
  }

  async componentDidMount() {
    if (await this.props.store.auth.isAuthenticated()) {
      if (Router.query.redirect) {
        return Router.pushRoute(Router.query.redirect)
      }

      return Router.pushRoute('/dashboard/overview')
    }

    this.setState({
      isAuthenticated: false,
    })
  }

  onSubmit = async (e) => {
    e.preventDefault()

    this.props.store.auth.login({
      strategy: 'local',
      identifier: this.state.username,
      password: this.state.password,
    })
      .then(res => {
        if (res.status === 400) {
          return this.setState({
            error: 'Incorrect username or password',
          })
        } else if (res.accessToken) {
          if (Router.query.redirect) {
            Router.pushRoute(Router.query.redirect)
          } else {
            Router.pushRoute('/dashboard/overview')
          }
        } else {
          this.setState({ error: 'There was an while processing your request' })
        }
      })
      .catch((err) => {
        console.log(err)

        this.setState({
          error: 'Error 500 - Service Unavailable',
        })
      })
  }

  onInputChange(name, e) {
    this.setState({ [name]: e.target.value })
  }

  render() {
    const { error, isAuthenticated } = this.state

    return (
      <Main>
        <Head>
          <title key="title">Login</title>
        </Head>
        <AnimatedDualOverlay
          showing={!isAuthenticated}
          first={
            <form>
              <LoginInner>
                <styles.spacing.Margin y="6">
                  <Title>Sign in</Title>
                </styles.spacing.Margin>
                {error && (
                  <styles.spacing.Margin y="6">
                    <Error>{error}</Error>
                  </styles.spacing.Margin>
                )}
                <styles.spacing.Margin bottom="5">
                  <InputGroup
                    size="large"
                    label="User Name"
                    inputProps={{
                      placeholder: 'User Name',
                      onChange: this.onUsernameChange,
                    }}
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 48C141.6 48 48 141.6 48 256s93.6 208 208 208 208-93.6 208-208S370.4 48 256 48zm0 62.4c34.3 0 62.4 28.1 62.4 62.4s-28.1 62.4-62.4 62.4-62.4-28.1-62.4-62.4 28.1-62.4 62.4-62.4zm0 300.4c-52 0-97.8-27-124.8-66.6 1-41.6 83.2-64.5 124.8-64.5s123.8 22.9 124.8 64.5c-27 39.5-72.8 66.6-124.8 66.6z"/></svg>
                    }
                  />
                </styles.spacing.Margin>
                <styles.spacing.Margin bottom="3">
                  <InputGroup
                    size="large"
                    label="Password"
                    inputProps={{
                      placeholder: 'Password',
                      onChange: this.onPasswordChange,
                    }}
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M376 186h-20v-40c0-55-45-100-100-100S156 91 156 146v40h-20c-22.002 0-40 17.998-40 40v200c0 22.002 17.998 40 40 40h240c22.002 0 40-17.998 40-40V226c0-22.002-17.998-40-40-40zM256 368c-22.002 0-40-17.998-40-40s17.998-40 40-40 40 17.998 40 40-17.998 40-40 40zm62.002-182H193.998v-40c0-34.004 28.003-62.002 62.002-62.002 34.004 0 62.002 27.998 62.002 62.002v40z"/></svg>
                    }
                  />
                </styles.spacing.Margin>
                <styles.spacing.Margin bottom="8">
                  <p>
                    <Link route="reset-password" passHref>
                      <ForgotPasswordLink>Forgot password?</ForgotPasswordLink>
                    </Link>
                  </p>
                </styles.spacing.Margin>
                <styles.spacing.Margin bottom="8">
                  <Submit type="submit" onClick={this.onSubmit}>Sign in</Submit>
                </styles.spacing.Margin>
                <styles.spacing.Margin bottom="2">
                  <p>
                    Don&apos;t have an account?{' '}
                    <Link route="signup" passHref><SignUpLink>Sign up</SignUpLink></Link>
                  </p>
                </styles.spacing.Margin>
              </LoginInner>
            </form>
          }
          second={
            <styles.spacing.Margin y="6">
              <Title light style={{ textAlign: 'center' }}>Track and schedule your meetings</Title>
            </styles.spacing.Margin>
          }
        >
        </AnimatedDualOverlay>
      </Main>
    )
  }
}


const blue1 = '#373bff'
// const blue2 = '#b8b8cd'
// const inputBorderColor = blue2
// const inputBorderColorActive = blue1

const SignUpLink = styled('a')`
  color: ${blue1};
  text-decoration: none;
`

const ForgotPasswordLink = styled('a')`
  color: #555;
  text-decoration: underline;
`

const LoginInner = styled('div')`
  padding-left: 80px;
  padding-right: 80px;
  margin-right: auto;
`

const Title = styled('h1')`
  color: #040405;
  font-weight: 600;
  font-size: 48px;
  line-height: 1.2;
  margin: 0;
  padding: 0;

  ${(props: { light: boolean }) => css`
    ${props.light && css`
      color: white;
    `}
  `}
`

const Submit = styled('button')`
  ${styles.reset.button}
  background-color: ${blue1};
  border-radius: 4px;
  font-weight: 600;
  letter-spacing: 1px;
  display: block;
  font-size: 13px;
  color: white;
  text-transform: uppercase;
  padding: 24px 20px;
  width: 100%;
`

const Error = styled('p')`
  color: red
`

export default withStore(Login)
