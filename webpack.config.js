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
      { test: /\.html$/, loader: 'html' },
      { test: /\.js$/, loader: 'strict' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.test\.js$/, loader: 'webpack-espower' },
      { test: /\.vue$/, loader: 'vue' },
    ],
  },
  resolve: {
    alias: {
      'encoding-japanese$': 'encoding-japanese/encoding.min.js',
      vue$: 'vue/dist/vue.runtime.min.js',
    },
  },
};
