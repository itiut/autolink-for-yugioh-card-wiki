module.exports = {
  entry: './src/main.js',
  output: {
    path: './dist',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json' },
    ],
  },
};
