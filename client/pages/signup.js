// @flow

import React from 'react'
import styled, { css } from 'react-emotion'
import Validator from 'validatorjs'
import _ from 'lodash'
import Head from 'next/head'

import { create } from '@shared/validations/user'
import auth from '@app/auth'
import styles from '@app/styles/utilities'
import { withStore } from '@app/context/store'

import InputGroup from '@app/components/Input/InputGroup'
import Main from '@app/layouts/main'
import AnimatedDualOverlay from '@app/components/Overlay/AnimatedDualOverlay'

import type { IRootStore } from '@root/types'

type Props = {
  store: IRootStore,
}

type State = {
  isAuthenticated: boolean,
  user: {
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    password: string,
  },
  errors: { [string]: Array<string> | null },
  processing: { [string]: boolean },
  eraseProcessing: { [string]: boolean },
}

class Signup extends React.Component<Props, State> {
  onFirstNameBlur: Function
  onLastNameBlur: Function
  onEmailBlur: Function
  onPasswordBlur: Function
  onUsernameBlur: Function

  onFirstNameChange: Function
  onLastNameChange: Function
  onEmailChange: Function
  onPasswordChange: Function
  onUsernameChange: Function

  eraseErrorsDebounced: Function

  state = {
    isAuthenticated: false,
    user: {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
    },
    errors: {},
    processing: {},
    eraseProcessing: {},
  }

  constructor(props) {
    super()

    this.onFirstNameBlur = this.onInputBlur.bind(this, 'first_name')
    this.onLastNameBlur = this.onInputBlur.bind(this, 'last_name')
    this.onPasswordBlur = this.onInputBlur.bind(this, 'password')

    this.onFirstNameChange = this.onInputChange.bind(this, 'first_name')
    this.onLastNameChange = this.onInputChange.bind(this, 'last_name')
    this.onEmailChange = this.onInputChange.bind(this, 'email')
    this.onPasswordChange = this.onInputChange.bind(this, 'password')

    this.onEmailBlur = this.onInputBlur.bind(this, 'email')
    this.onEmailChange = this.onAsyncValidatedInputChange.bind(this, 'email')
    this.onUsernameBlur = this.onInputBlur.bind(this, 'username')
    this.onUsernameChange = this.onAsyncValidatedInputChange.bind(this, 'username')
    this.eraseErrorsDebounced = _.debounce(this.eraseErrors, 1000, { maxWait: 2000 })
  }

  process = (name, value) => {
    if (this.state.processing[name]) {
      return
    }

    this.setState({
      processing: {
        ...this.state.processing,
        [name]: true,
      },
    }, () => {
      this.getValidationsFor({ [name]: value }, name)
        .then(({ errors }) => {
          // console.log('getvalid', errors);
          if (errors[name] == null || errors[name].length === 0) {
            this.setState({
              errors: {
                ...this.state.errors,
                [name]: null,
              },
            })
          } else {
            this.setState({
              errors: {
                ...this.state.errors,
                [name]: errors[name],
              },
            })
          }
        })
        .finally(() => {
          this.setState({
            processing: {
              ...this.state.processing,
              [name]: false,
            },
          })
        })
    })
  }

  eraseErrors = (name, value) => {
    if (this.state.eraseProcessing[name]) {
      return
    }

    this.setState({
      eraseProcessing: {
        ...this.state.eraseProcessing,
        [name]: true,
      },
    }, () => {
      this.getValidationsFor({ [name]: value }, name)
        .then(({ errors }) => {
          if (errors[name] == null || errors[name].length === 0) {
            this.setState({
              errors: {
                ...this.state.errors,
                [name]: null,
              },
            })
          }
        })
        .finally(() => {
          this.setState({
            eraseProcessing: {
              ...this.state.eraseProcessing,
              [name]: false,
            },
          })
        })
    })
  }

  async getValidationsFor(data: {}, name, timeout=2000): Promise<{
      errors: { [string]: string[] },
      isValid: boolean,
    }> {
    return new Promise((resolve, reject) => {
      const rules = { [name]: create.rules[name] }
      const validator = new Validator(data, rules, create.messages)

      setTimeout(() => reject(new Error('Timeout exceeded')), timeout)

      validator.checkAsync(() => {
        resolve({
          isValid: true,
          errors: {},
        })
      }, () => {
        resolve({
          isValid: false,
          errors: validator.errors.all(),
        })
      })
    })
  }

  processAsyncValidation = _.debounce(function (name, value) {
    this.process(name, value)
  }, 2000)

  onAsyncValidatedInputChange(name, e) {
    const value = e.target.value

    console.log(name, value)

    this.setState({
      user: {
        ...this.state.user,
        [name]: value,
      },
    }, () => {
      this.processAsyncValidation(name, value)
    })
  }

  onInputChange(name, e) {
    const value = e.target.value

    this.setState({
      user: {
        ...this.state.user,
        [name]: value,
      },
    }, () => {
      this.eraseErrors(name, this.state.user[name])
    })
  }

  onInputBlur(name, e) {
    this.setState({
      user: {
        ...this.state.user,
        [name]: e.target.value,
      },
    }, () => {
      this.process(name, this.state.user[name])
    })
  }

  onSubmit = async (e) => {
    e.preventDefault()

    const response =
      this.props.store.auth.createUser(this.state.user)

    if (response.errors) {
      this.setState({ errors: response.errors })
    }
  }

  render() {
    const { isAuthenticated, errors } = this.state

    return (
      <Main>
        <div>
          <Head>
            <title key="title">Sign up</title>
          </Head>
          <AnimatedDualOverlay
            showing={!isAuthenticated}
            first={
              <form>
                <LoginInner>
                  <styles.spacing.Padding top="6" bottom="6">
                    <Title>Create an account</Title>
                  </styles.spacing.Padding>
                  <styles.spacing.Padding bottom="5">
                    <styles.grid.AutoFlexGrid>
                      <styles.spacing.Padding right="2">
                        <InputGroup
                          label="First Name"
                          inputProps={{
                            placeholder: 'Enter your first name',
                            onBlur: this.onFirstNameBlur,
                            onChange: this.onFirstNameChange,
                          }}
                          errors={errors.first_name}
                        />
                      </styles.spacing.Padding>
                      <InputGroup
                        label="Last Name"
                        inputProps={{
                          placeholder: 'Last Name',
                          onBlur: this.onLastNameBlur,
                          onChange: this.onLastNameChange,
                        }}
                        errors={errors.last_name}
                      />
                    </styles.grid.AutoFlexGrid>
                  </styles.spacing.Padding>
                  <styles.spacing.Padding bottom="5">
                    <InputGroup
                      label="User Name"
                      inputProps={{
                        placeholder: 'User Name',
                        onBlur: this.onUsernameBlur,
                        onChange: this.onUsernameChange,
                      }}
                      icon={
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 48C141.6 48 48 141.6 48 256s93.6 208 208 208 208-93.6 208-208S370.4 48 256 48zm0 62.4c34.3 0 62.4 28.1 62.4 62.4s-28.1 62.4-62.4 62.4-62.4-28.1-62.4-62.4 28.1-62.4 62.4-62.4zm0 300.4c-52 0-97.8-27-124.8-66.6 1-41.6 83.2-64.5 124.8-64.5s123.8 22.9 124.8 64.5c-27 39.5-72.8 66.6-124.8 66.6z"/></svg>
                      }
                      errors={errors.username}
                    />
                  </styles.spacing.Padding>
                  <styles.spacing.Padding bottom="5">
                    <InputGroup
                      label="Email"
                      inputProps={{
                        placeholder: 'Email',
                        onBlur: this.onEmailBlur,
                        onChange: this.onEmailChange,
                      }}
                      icon={
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M460.6 147.3L353 256.9c-.8.8-.8 2 0 2.8l75.3 80.2c5.1 5.1 5.1 13.3 0 18.4-2.5 2.5-5.9 3.8-9.2 3.8s-6.7-1.3-9.2-3.8l-75-79.9c-.8-.8-2.1-.8-2.9 0L313.7 297c-15.3 15.5-35.6 24.1-57.4 24.2-22.1.1-43.1-9.2-58.6-24.9l-17.6-17.9c-.8-.8-2.1-.8-2.9 0l-75 79.9c-2.5 2.5-5.9 3.8-9.2 3.8s-6.7-1.3-9.2-3.8c-5.1-5.1-5.1-13.3 0-18.4l75.3-80.2c.7-.8.7-2 0-2.8L51.4 147.3c-1.3-1.3-3.4-.4-3.4 1.4V368c0 17.6 14.4 32 32 32h352c17.6 0 32-14.4 32-32V148.7c0-1.8-2.2-2.6-3.4-1.4z"/><path d="M256 295.1c14.8 0 28.7-5.8 39.1-16.4L452 119c-5.5-4.4-12.3-7-19.8-7H79.9c-7.5 0-14.4 2.6-19.8 7L217 278.7c10.3 10.5 24.2 16.4 39 16.4z"/></svg>
                      }
                      errors={errors.email}
                    />
                  </styles.spacing.Padding>
                  <styles.spacing.Padding bottom="5">
                    <InputGroup
                      label="Password"
                      inputProps={{
                        placeholder: 'Password',
                        onBlur: this.onPasswordBlur,
                        onChange: this.onPasswordChange,
                      }}
                      icon={
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M376 186h-20v-40c0-55-45-100-100-100S156 91 156 146v40h-20c-22.002 0-40 17.998-40 40v200c0 22.002 17.998 40 40 40h240c22.002 0 40-17.998 40-40V226c0-22.002-17.998-40-40-40zM256 368c-22.002 0-40-17.998-40-40s17.998-40 40-40 40 17.998 40 40-17.998 40-40 40zm62.002-182H193.998v-40c0-34.004 28.003-62.002 62.002-62.002 34.004 0 62.002 27.998 62.002 62.002v40z"/></svg>
                      }
                      errors={errors.password}
                    />
                  </styles.spacing.Padding>
                  <styles.spacing.Padding bottom="8">
                    <Submit type="submit" onClick={this.onSubmit}>Create Account</Submit>
                  </styles.spacing.Padding>
                </LoginInner>
              </form>
            }
            second={
              <styles.spacing.Padding y="6">
                <Title light style={{ textAlign: 'center' }}>Track and schedule your meetings, reservations, and more!</Title>
              </styles.spacing.Padding>
            }
          >
          </AnimatedDualOverlay>
        </div>
      </Main>
    )
  }
}

const blue1 = '#373bff'

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

export default withStore(Signup)
