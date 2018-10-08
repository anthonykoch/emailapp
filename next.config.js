const path = require('path')

const withCSS = require('@zeit/next-css')
const webpack = require('webpack')

// eslint-disable-next-line no-unused-vars
const IS_PRODUCTION = process.env.NODE_ENV === 'production'


console.log('env:', JSON.stringify({
  IS_PRODUCTION,
}, null, '  '))

module.exports = {
  distDir: '../build/client/.next',

  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    const aliases = require(path.join(__dirname, './.alias.js'))

    Object.assign(config.resolve.alias, aliases)

    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.(jpe?g|png|svg|gif|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              fallback: 'file-loader',
              publicPath: '/_next/static/images/',
              outputPath: `${isServer ? '../' : ''}static/images/`,
              name: '[name].[ext]',
            },
          },
        ],
      },
    ]

    config.plugins = [
      ...config.plugins,
      new webpack.IgnorePlugin(/@(root|server)/),
      new webpack.DefinePlugin({
        'process.env': {
          SERVER: JSON.stringify(isServer),
        },
      }),
    ]

    return config
  },
}

module.exports = withCSS(module.exports)
