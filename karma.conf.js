const webpackConfig = require('./webpack.config');
delete webpackConfig.entry;
delete webpackConfig.output;

module.exports = (config) => {
  const configuration = {
    basePath: '',
    frameworks: ['mocha'],
    files: [
      'test/*.test.js',
    ],
    exclude: [],
    preprocessors: {
      'test/*.test.js': ['webpack'],
      'test/fixtures/*.html': ['webpack'],
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only',
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    customLaunchers: {
      ChromeTravisCi: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    },
    singleRun: false,
    concurrency: Infinity,
  };

  if (process.env.TRAVIS) {
    configuration.browsers = ['ChromeTravisCi'];
    configuration.singleRun = true;
  }

  config.set(configuration);
};
