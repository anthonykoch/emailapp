'use strict';

const path = require('path')

// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {

    config.resolve.alias['@'] = path.join(__dirname, 'client')

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
              limit: 10,
              fallback: 'file-loader',
              publicPath: '/_next/static/images/',
              outputPath: `${isServer ? '../' : ''}static/images/`,
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          defaultLoaders.babel,
          {
            loader: require('styled-jsx/webpack').loader,
            options: {
              type: 'global',
            }
          }
        ],
      },
    ]

    config.plugins = [
      ...config.plugins,
      // { loader: MiniCssExtractPlugin.loader },
      // new MiniCssExtractPlugin({
      //   filename: '[name].[hash:8 ].css',
      //   chunkFilename: '[id].[hash:8].css',
      // }),
    ]

    return config
  },
}
