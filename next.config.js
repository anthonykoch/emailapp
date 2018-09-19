module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {

    config.module.rules.push({
      include: /\.(css|sass)$/,
      use: [
        'style-loader',
        { loader: 'css-loader', options: { importLoaders: 1 } },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              require('autoprefixer')(),
              require('cssnano')({
                preset: 'default',
              }),
            ],
          },
        },
        'sass-loader?precision=8',
      ],
    })

    return config
  },
}
