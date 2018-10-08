// @flow

import feathers from '@feathersjs/feathers'
import auth from '@feathersjs/authentication-client'
import LocalForage from 'localforage'
import rest from '@feathersjs/rest-client'
import axios from 'axios'

if (typeof window !== 'undefined') {
  window.axios = axios
}

export const app = feathers()
export const restClient = rest()

app.configure(auth({
  path: '/api/authentication',
  // storage: LocalForage, // FIXME: This errors out when uncommented
}))

app.configure(restClient.axios(axios))

export default app
