const path = require('path')

module.exports = () => {
  return {
    plugins: [
      require('postcss-import')({
        path: ['client/styles'],
      }),
      require('postcss-advanced-variables')({}),
      require('postcss-url')({
        maxSize: 10000,
        url: 'inline',
        basePath: path.join(__dirname, 'client/images'),
      }),
      require('postcss-nested')(),
      // THINKME: Do we really need this? styled-jsx autoprefixes already
      // require('autoprefixer')(),
      require('cssnano')({
        preset: 'default',
      })
    ],
  }
}
