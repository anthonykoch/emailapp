const path = require('path')

require('module-alias/register')

// NOTE: This file needs ot be imported before '@feathers/configuration'
// for it to work properly. Setting it with cross-env doesn't seem to work
// https://docs.feathersjs.com/api/configuration.html#changing-the-location-of-the-configuration-directory
process.env['NODE_CONFIG_DIR'] = path.join(__dirname, 'config/')
