module.exports = () => {
  return {
    plugins: [
      require('autoprefixer')(),
      require('cssnano')({
        preset: 'default',
      }),
    ],
  }
}
