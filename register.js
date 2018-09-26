require('@babel/register')()

const path = require('path')

const { argv } = require('yargs')

require('module-alias/register')

// Requires any files set with the -f flag, e.g. `node ./register.js -f ./index.js`
// will require and allow ./index.js to use ES6 imports
const files =
  [...Array.isArray(argv.f) ? argv.f : [argv.f]]
    .filter(item => item != null)
    .map(item => String(item))

files.forEach((filename) =>
  require(
    path.isAbsolute(filename) ? filename : `./${filename}`
  )
)
