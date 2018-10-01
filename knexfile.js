// Update with your config settings.

require('./register')
require('./server/bootstrap')

// A bit hacky, bit I couldn't figure out another way
const config = (nodeEnv) => {
  const NODE_ENV = process.env.NODE_ENV

  process.env.NODE_ENV = nodeEnv

  const env = require('config')

  delete require.cache[require.resolve('config')]

  process.env.NODE_ENV = NODE_ENV

  return env
}

const { postgres: development } = config('development')
const { postgres: production } = config('production')

module.exports = {
  development,
  production,
}
