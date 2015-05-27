module.exports = {
  entry: './example',
  devServer: { contentBase: './example' },
  module: {
    loaders: [{ test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: 'babel' }]
  }
}
