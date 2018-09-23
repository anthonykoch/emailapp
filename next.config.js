const path = require('path')
const withCSS = require('@zeit/next-css')

// import MiniCssExtractPlugin from 'mini-css-extract-plugin'

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    config.resolve.alias['@app'] = path.join(__dirname, 'client')

    // eslint-disable-next-line no-unused-vars
    const IS_PRODUCTION = process.env.NODE_ENV === 'production'

    console.log('env:', process.env.NODE_ENV)

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

    return config
  },
}

module.exports = withCSS(module.exports)
