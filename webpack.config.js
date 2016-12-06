module.exports = {
  entry: {
    main: './src/main.js',
    options: './src/options.js',
  },
  output: {
    filename: '[name].js',
    path: './dist/js',
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json' },
    ],
  },
};
