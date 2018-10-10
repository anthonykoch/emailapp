// @flow

import axios from 'axios'
import feathers from '@feathersjs/feathers'
import auth from '@feathersjs/authentication-client'
import rest from '@feathersjs/rest-client'
// import LocalForage from 'localforage'

if (typeof window !== 'undefined') {
  window.axios = axios
}

export const app = feathers()
export const client = rest()

app.configure(auth({
  path: '/api/authentication',
  // storage: LocalForage, // FIXME: This errors out when uncommented
}))

app.configure(client.axios(axios))

export default app
