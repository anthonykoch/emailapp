module.exports = () => {
  return {
    plugins: [
      require('postcss-nested')(),
      require('autoprefixer')(),
      require('cssnano')({
        preset: 'default',
      })
    ],
  }
}
