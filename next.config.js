'use strict';

const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {

    config.resolve.alias['@'] = path.join(__dirname, 'client')

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
              // publicPath: '/_next/static/images/',
              // outputPath: `${isServer ? '../' : ''}static/images/`,
              name: 'images/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     // { loader: MiniCssExtractPlugin.loader },
      //     'to-string-loader',
      //     'css-loader',
      //     'postcss-loader',
      //   ],
      // },
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
      // new MiniCssExtractPlugin({
      //   filename: '[name].[hash:8 ].css',
      //   chunkFilename: '[id].[hash:8].css',
      // }),
    ]

    return config
  },
}
