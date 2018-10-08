const path = require('path')

module.exports = {
  '@root':   path.join(__dirname, './'),
  '@server': path.join(__dirname, 'server'),
  '@shared': path.join(__dirname, 'shared'),
  '@app':    path.join(__dirname, 'client'),
}
